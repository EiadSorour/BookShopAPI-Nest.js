import { IsString, IsNumber } from "class-validator";

export class AddClientDto{
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;
    
    @IsNumber()
    money_owned: number
}