import { IsNumber, IsOptional } from "class-validator";

export class OrderDto{
    
    @IsOptional()
    @IsNumber()
    quantity: number; 
    
    @IsNumber()
    userID: number;
    
    @IsNumber()
    bookID: number;
}