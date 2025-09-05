import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Train } from './train.entity';
import { Repository } from 'typeorm';
import { CreateTrainDto } from './dtos/create-train.dto';

@Injectable()
export class TrainsService {
    constructor(@InjectRepository(Train) private repo: Repository<Train>) {}
    
      // отримати всі потяги конкретного юзера
      async findAllTrains(userId: number): Promise<Train[]> {
        return await this.repo.find({
          where: { user: { id: userId } },
        });
      }
    
      // знайти конкретний потяг юзера
      async findTrainById(id: number, userId: number): Promise<Train> {
        const train = await this.repo.findOne({
          where: { id, user: { id: userId } },
        });
    
        if (!train) {
          throw new NotFoundException('Train not found');
        }
        return train;
      }
    
      // створити потяг для юзера
      async create(trainDto: CreateTrainDto, userId: number): Promise<Train> {
        const newTrain = this.repo.create({
          ...trainDto,
          user: { id: userId }, // прив’язка до юзера
        });
    
        try {
          return await this.repo.save(newTrain);
        } catch (err) {
          throw new BadRequestException('Cannot create train');
        }
      }
    
      // оновити потяг юзера
      async update(id: number, attrs: Partial<Train>, userId: number): Promise<Train> {
        const train = await this.findTrainById(id, userId); // перевірка приналежності
    
        Object.assign(train, attrs);
        return this.repo.save(train);
      }
    
      // видалити потяг юзера
      async delete(id: number, userId: number) {
        const result = await this.repo.delete({ id, user: { id: userId } });
    
        if (result.affected === 0) {
          throw new NotFoundException('Train not found');
        }
        return { message: 'Train deleted successfully' };
      }
    }

