import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "./book.model";
import { AddBookDto } from "./dto/addBookDto";
import { UpdateBookDto } from "./dto/updateBookDto";

@Injectable()
export class BookService{
    constructor(@InjectModel(Book) private bookModel: typeof Book){}

    async getAllBooks(): Promise<Book[]>{
        return await this.bookModel.findAll();
    }

    async getBook(bookID:string): Promise<Book>{
        return await this.bookModel.findOne({where: {id:bookID}});
    }

    async addBook(addBookDto: AddBookDto): Promise<void>{
        await this.bookModel.create(addBookDto as any);
    }

    async updateBook(bookID:string , updateBookDto:UpdateBookDto): Promise<Book>{
        if(Object.keys(updateBookDto).length === 0){
            return await this.getBook(bookID);
        }
        return (await this.bookModel.update(updateBookDto , {where:{id:bookID}, returning:true }))[1][0];
    }

    async deleteBook(bookID:string): Promise<void>{
        await this.bookModel.destroy({where:{id:bookID}});
    }
}