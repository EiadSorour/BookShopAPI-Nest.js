import { IsString, IsNumber} from "class-validator";

export class AddBookDto{
    @IsString()
    title: string;

    @IsNumber()
    price: number;
    
    @IsNumber()
    quantity_in_stock: number;
}