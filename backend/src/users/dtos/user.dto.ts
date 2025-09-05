import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
    
    password: string;
}