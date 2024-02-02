import { IsString, IsNumber, IsOptional , IsEnum} from "class-validator";

export class UpdateUserDto{
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

    @IsString()
    @IsOptional()
    @IsEnum({client:"client" , admin:"admin"})
    role: string
}