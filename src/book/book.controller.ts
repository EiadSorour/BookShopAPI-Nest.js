import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "./book.model";
import { AddBookDto } from "./dto/addBookDto";
import { UpdateBookDto } from "./dto/updateBookDto";
import { HttpStatusMessage } from "../utils/HttpStatusMessage";
import { AppError } from "../utils/AppError";
import { AuthGuard } from "src/guards/authentication.guard";
import { RolesGuard } from "src/guards/authorization.guard";

@Controller("/api/book")
export class BookController{

    constructor(private readonly bookService:BookService){}

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async getAllBooks(){
        const books:Book[] = await this.bookService.getAllBooks();
        return {status:HttpStatusMessage.SUCCESS , data:{books}};
    }
    
    @Post()
    @HttpCode(201)
    @UseGuards(RolesGuard)
    async addBook(@Body() addBookDto:AddBookDto){
        await this.bookService.addBook(addBookDto);
        return {status:HttpStatusMessage.SUCCESS , data:{message:"Created Successfully"}};
    }
    
    @Get("/:id")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async getBook(@Param("id") id:string){
        const book:Book = await this.bookService.getBook(id);
        if(!book){
            AppError("This book doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status:HttpStatusMessage.SUCCESS , data:{book}};
    }

    @Patch("/:id")
    @HttpCode(200)
    @UseGuards(RolesGuard)
    async updateBook(@Param("id") id:string , @Body() updateBookDto:UpdateBookDto){
        const updatedBook:Book = await this.bookService.updateBook(id,updateBookDto);
        if(!updatedBook){
            AppError("This book doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status:HttpStatusMessage.SUCCESS , data:{book:updatedBook}};
    }

    @Delete("/:id")
    @HttpCode(200)
    @UseGuards(RolesGuard)
    async deleteBook(@Param("id") id:string){
        const deletedBooks = await this.bookService.deleteBook(id);
        if(deletedBooks === 0){
            AppError("This book doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status:HttpStatusMessage.SUCCESS , data:{message:"Deleted Successfully"}};
    }
}