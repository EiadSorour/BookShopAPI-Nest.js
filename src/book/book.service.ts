import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "./book.model";
import { AddBookDto } from "./dto/addBookDto";
import { UpdateBookDto } from "./dto/updateBookDto";

@Injectable()
export class BookService{
    constructor(@InjectModel(Book) private bookModel: typeof Book){}

    async getAllBooks(): Promise<Book[]>{
        try{
            return await this.bookModel.findAll();
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async getBook(bookID:string): Promise<Book>{
        try{
            return await this.bookModel.findOne({where: {id:bookID}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async addBook(addBookDto: AddBookDto): Promise<void>{
        try{
            if(addBookDto.quantity_in_stock < 1){
                addBookDto.available = false;
            }else{
                addBookDto.available = true;
            }
            await this.bookModel.create(addBookDto as any);
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async updateBook(bookID:string , updateBookDto:UpdateBookDto): Promise<Book>{
        try{
            if(Object.keys(updateBookDto).length === 0){
                return await this.getBook(bookID);
            }
            return (await this.bookModel.update(updateBookDto , {where:{id:bookID}, returning:true }))[1][0];
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async deleteBook(bookID:string): Promise<number>{
        try{
            return await this.bookModel.destroy({where:{id:bookID}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }
}