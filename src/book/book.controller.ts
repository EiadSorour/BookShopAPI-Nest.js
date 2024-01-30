import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "./book.model";
import { Response } from "express";
import { AddBookDto } from "./dto/addBookDto";
import { UpdateBookDto } from "./dto/updateBookDto";

@Controller("/api/book")
export class BookController{

    constructor(private readonly bookService:BookService){}

    @Get()
    @HttpCode(200)
    async getAllBooks(@Res() res:Response){
        const books:Book[] = await this.bookService.getAllBooks();
        return res.json({status:HttpStatus.OK , data:{books}});
    }

    @Post()
    @HttpCode(201)
    async addBook(@Body() addBookDto:AddBookDto , @Res() res:Response){
        await this.bookService.addBook(addBookDto);
        return res.json({status:HttpStatus.CREATED , data:{message:"Created Successfully"}});
    }

    @Get("/:id")
    @HttpCode(200)
    async getBook(@Param("id") id:string , @Res() res:Response){
        const book:Book = await this.bookService.getBook(id);
        return res.json({status:HttpStatus.OK , data:{book}});
    }

    @Patch("/:id")
    @HttpCode(200)
    async updateBook(@Param("id") id:string , @Body() updateBookDto:UpdateBookDto, @Res() res:Response){
        const updatedBook:Book = await this.bookService.updateBook(id,updateBookDto);
        return res.json({status:HttpStatus.OK , data:{book:updatedBook}});
    }

    @Delete("/:id")
    @HttpCode(200)
    async deleteBook(@Param("id") id:string, @Res() res:Response){
        await this.bookService.deleteBook(id);
        return res.json({status:HttpStatus.OK , data:{message:"Deleted Successfully"}});
    }
}