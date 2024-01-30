import { Injectable } from "@nestjs/common";
import { Client } from "src/client/client.model";
import { Book } from "src/book/book.model";
import { OrderDto } from "./dto/orderDto";
import { ClientService } from "src/client/client.service";
import { BookService } from "src/book/book.service";
import { Order } from "./order.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class OrderService{

    constructor(
        private readonly clientService:ClientService,
        private readonly bookService:BookService,
        @InjectModel(Order) private orderModel: typeof Order
    ){}
    
    async buyBook(quantity:number , orderDto:OrderDto): Promise<string>{

        const client:Client = await this.clientService.getClient(orderDto.clientID);
        const book:Book = await this.bookService.getBook(orderDto.bookID);

        client.money_owned -= book.price*quantity;
        book.quantity_in_stock -= quantity;
        client.total_books_bought = Number(client.total_books_bought) +quantity;

        const order:OrderDto = new OrderDto();
        order.quantity = quantity,
        order.clientID = client.id,
        order.bookID = book.id

        await this.orderModel.create(order as any);

        await this.clientService.updateClient(client.dataValues.id , client.dataValues);
        await this.bookService.updateBook(book.dataValues.id , book.dataValues);

        return `Client ${client.first_name} ${client.last_name} bought ${quantity} copies of book ${book.title}`;
    }

}