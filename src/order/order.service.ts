import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Client } from "../client/client.model";
import { Book } from "../book/book.model";
import { OrderDto } from "./dto/orderDto";
import { ClientService } from "../client/client.service";
import { BookService } from "../book/book.service";
import { Order } from "./order.model";
import { InjectModel } from "@nestjs/sequelize";
import { HttpStatusMessage } from "../utils/HttpStatusMessage";
import { AppError } from "../utils/AppError";

@Injectable()
export class OrderService{

    constructor(
        private readonly clientService:ClientService,
        private readonly bookService:BookService,
        @InjectModel(Order) private orderModel: typeof Order
    ){}
    
    async buyBook(quantity:number , orderDto:OrderDto): Promise<string>{

        const client:Client = await this.clientService.getClient(String(orderDto.clientID));
        const book:Book = await this.bookService.getBook(String(orderDto.bookID));

        if(!client){
            AppError("This client doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }else if(!book){
            AppError("This book doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }else if(quantity > book.quantity_in_stock){
            AppError("Not enough copies of this book in stock" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }else if((quantity*book.price) > client.money_owned){
            AppError("Client doesn't have enough money" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        
        try{
            client.money_owned -= book.price*quantity;
            book.quantity_in_stock -= quantity;
            client.total_books_bought = Number(client.total_books_bought) +quantity;

            const order:OrderDto = new OrderDto();
            order.quantity = quantity;
            order.clientID = client.id;
            order.bookID = book.id;

            await this.orderModel.create(order as any);
            
            await this.clientService.updateClient(client.dataValues.id , client.dataValues);
            await this.bookService.updateBook(book.dataValues.id , book.dataValues);

            return `Client '${client.first_name} ${client.last_name}' bought ${quantity} copies of book '${book.title}' `;
        }catch(error){
            console.log("i am here");
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

}