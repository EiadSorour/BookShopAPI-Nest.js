import { IsNumber, IsOptional } from "class-validator";

export class OrderDto{
    
    @IsOptional()
    @IsNumber()
    quantity: number; 
    
    @IsNumber()
    clientID: number;
    
    @IsNumber()
    bookID: number;
}