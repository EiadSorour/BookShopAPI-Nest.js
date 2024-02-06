import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../User/user.model";
import { Book } from "../book/book.model";
import { OrderDto } from "./dto/orderDto";
import { UserService } from "../User/user.service";
import { BookService } from "../book/book.service";
import { Order } from "./order.model";
import { InjectModel } from "@nestjs/sequelize";
import { HttpStatusMessage } from "../utils/HttpStatusMessage";
import { AppError } from "../utils/AppError";

@Injectable()
export class OrderService{

    constructor(
        private readonly userService:UserService,
        private readonly bookService:BookService,
        @InjectModel(Order) private orderModel: typeof Order
    ){}

    async getAllOrdersOfClient(username:string): Promise<Order[]>{
        const orders:Order[] = await this.orderModel.findAll({where: {username:username}});
        return orders;
    }
    
    async buyBook(orderDto:OrderDto): Promise<string>{

        const user:User = await this.userService.getUser(String(orderDto.username));
        const book:Book = await this.bookService.getBook(String(orderDto.bookID));

        if(!user){
            AppError("This user doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }else if(!book){
            AppError("This book doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }else if(orderDto.quantity > book.quantity_in_stock){
            AppError("Not enough copies of this book in stock" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }else if((orderDto.quantity*book.price) > user.money_owned){
            AppError("User doesn't have enough money" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        
        try{
            user.money_owned -= book.price*orderDto.quantity;
            book.quantity_in_stock -= orderDto.quantity;
            user.total_books_bought = Number(user.total_books_bought) + orderDto.quantity;

            const order:OrderDto = new OrderDto();
            order.quantity = orderDto.quantity;
            order.username = user.username; 
            order.bookID = book.id;

            await this.orderModel.create(order as any);
            
            await this.userService.updateUser(user.dataValues.username , user.dataValues);
            await this.bookService.updateBook(book.dataValues.id , book.dataValues);

            return `User '${user.username}' bought ${orderDto.quantity} copies of book '${book.title}' `;
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

}