import { IsString, IsNumber, IsDateString, IsOptional, } from "class-validator";

export class AddBookingDto{
    @IsNumber()
    bookID: number;

    @IsOptional()
    @IsString()
    username: string

    @IsDateString()
    fromDate: string;
    
    @IsDateString()
    toDate: string
}