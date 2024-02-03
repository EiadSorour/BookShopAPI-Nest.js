import { IsNumber, IsOptional, IsString } from "class-validator";

export class OrderDto{
    
    @IsOptional()
    @IsNumber()
    quantity: number;
    
    @IsString()
    username: string;
    
    @IsNumber()
    bookID: number;
}