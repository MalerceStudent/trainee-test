import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService
    ) {}
    
    async signUp(body: RegisterUserDto) {
        const { email, password } = body;

        const existingUser = await this.repo.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('Email already in use');
        }

        const salt = randomBytes(8).toString("hex");
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + "." + hash.toString("hex");
        
        const user = this.repo.create({ email, password: result });
        const savedUser = await this.repo.save(user);

        // Повертаємо JWT токен
        const token = this.jwtService.sign({ id: savedUser.id, email: savedUser.email });
        return { user: { id: savedUser.id, email: savedUser.email }, token };
    }

    async signIn(body: LoginUserDto) {
        const { email, password } = body;

        const existingUser = await this.repo.findOne({ where: { email } });
        if (!existingUser) {
            throw new NotFoundException('User with this email not found');
        }

        const [salt, storedHash] = existingUser.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString("hex")) {
            throw new BadRequestException("Bad password");
        }

        // Повертаємо JWT токен
        const token = this.jwtService.sign({ id: existingUser.id, email: existingUser.email });
        return { user: { id: existingUser.id, email: existingUser.email }, token };
    }

    async findAllUsers() {
        return this.repo.find();
    }
}
