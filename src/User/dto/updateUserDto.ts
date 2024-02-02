import { IsString, IsNumber, IsOptional , IsEnum} from "class-validator";

export class UpdateUserDto{
    @IsString()
    @IsOptional()
    username: string;
    
    @IsString()
    @IsOptional()
    password: string;

    @IsNumber()
    @IsOptional()
    money_owned: number;
    
    @IsNumber()
    @IsOptional()
    total_books_bought: number

    @IsString()
    @IsOptional()
    @IsEnum({client:"client" , admin:"admin"})
    role: string
}