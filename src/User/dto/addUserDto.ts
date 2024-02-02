import { IsString, IsNumber } from "class-validator";

export class AddUserDto{
    @IsString()
    username: string;

    @IsString()
    password: string;
    
    @IsNumber()
    money_owned: number

    @IsString()
    role: string
}