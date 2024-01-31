import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateClientDto{
    
    @IsString()
    @IsOptional()
    first_name: string;
    
    @IsString()
    @IsOptional()
    last_name: string;

    @IsNumber()
    @IsOptional()
    money_owned: number;
    
    @IsNumber()
    @IsOptional()
    total_books_bought: number
}