import { IsString, IsNumber, IsEnum } from "class-validator";

export class RegisterUserDto{
    @IsString()
    username: string;

    @IsString()
    password: string;
    
    @IsNumber()
    money_owned: number

    @IsString()
    @IsEnum({client:"client" , admin:"admin"})
    role: string
}