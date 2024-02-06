import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards } from "@nestjs/common";
import { OrderDto } from "./dto/orderDto";
import { OrderService } from "./order.service";
import { HttpStatusMessage } from "../utils/HttpStatusMessage";
import { AuthGuard } from "src/guards/authentication.guard";
import { Request } from "express";

@Controller("/api/order")
export class OrderController{

    constructor(
        private readonly orderService:OrderService,
        
    ){}
    
    @Get("/purchased")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async getAllOrdersOfClient(@Req() request:any){
        const username:string = request.payload.username;
        const orders = await this.orderService.getAllOrdersOfClient(username);
        return {status: HttpStatusMessage.SUCCESS , data:{orders}};
    }

    @Post()
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async buyBook(@Body() orderDto: OrderDto , @Req() request: any){
        orderDto = {
            ...orderDto,
            username: request.payload.username
        }
        const message = await this.orderService.buyBook(orderDto);
        return {status: HttpStatusMessage.SUCCESS , data:{message}};
    }

}
