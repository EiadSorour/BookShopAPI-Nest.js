import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateBookDto{

    @IsString()
    @IsOptional()
    title: string;
    
    @IsNumber()
    @IsOptional()
    price?: number;
    
    @IsNumber()
    @IsOptional()
    quantity_in_stock?: number;
}