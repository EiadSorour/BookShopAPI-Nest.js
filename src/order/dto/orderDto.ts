import { IsNumber, IsOptional, IsString } from "class-validator";

export class OrderDto{
    
    @IsString()
    @IsOptional()
    username: string;
    
    @IsNumber()
    quantity: number;
    
    @IsNumber()
    bookID: number;
}