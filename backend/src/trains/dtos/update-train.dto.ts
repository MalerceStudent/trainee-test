import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTrainDto {
    @IsOptional()
    @IsString()
    number: string;
    
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    from: string;
    
    @IsOptional()
    @IsString()
    to: string;
    
    @IsOptional()
    @IsString()
    departure: string;
    
    @IsOptional()
    @IsString()
    arrival: string;
}