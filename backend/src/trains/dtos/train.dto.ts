import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class TrainDto {
    @Expose()
    id: number;

    @Expose()
    number: string;
    
    @Expose()
    name: string;
    
    @Expose()
    from: string;
    
    @Expose()
    to: string;
    
    @Expose()
    departure: string;
    
    @Expose()
    arrival: string;
}