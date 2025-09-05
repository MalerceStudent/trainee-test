import { IsNumber, IsString } from "class-validator";

export class CreateTrainDto {
    @IsString()
    number: string;
    
    @IsString()
    name: string;
    
    @IsString()
    from: string;
    
    @IsString()
    to: string;
    
    @IsString()
    departure: string;
    
    @IsString()
    arrival: string;
}