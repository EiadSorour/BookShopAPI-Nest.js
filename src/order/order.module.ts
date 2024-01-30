import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./order.model";
import { ClientModule } from "src/client/client.module";
import { BookModule } from "src/book/book.module";
import { Client } from "src/client/client.model";
import { Book } from "src/book/book.model";
import { ClientService } from "src/client/client.service";
import { BookService } from "src/book/book.service";

@Module({
    imports: [SequelizeModule.forFeature([Order,Client,Book]) , ClientModule, BookModule],
    controllers: [OrderController],
    providers: [OrderService , ClientService, BookService],
    exports: []
})
export class OrderModule{}