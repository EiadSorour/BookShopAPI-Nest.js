import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./order.model";
import { UserModule } from "../User/user.module";
import { BookModule } from "../book/book.module";
import { User } from "../User/user.model";
import { Book } from "../book/book.model";
import { UserService } from "../User/user.service";
import { BookService } from "../book/book.service";

@Module({
    imports: [SequelizeModule.forFeature([Order,User,Book]) , UserModule, BookModule],
    controllers: [OrderController],
    providers: [OrderService , UserService, BookService],
    exports: []
})
export class OrderModule{}