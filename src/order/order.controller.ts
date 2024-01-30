import { Body, Controller, HttpCode, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { OrderDto } from "./dto/orderDto";
import { OrderService } from "./order.service";
import { Response } from "express";

@Controller("/api/buy")
export class OrderController{

    constructor(
        private readonly orderService:OrderService,
        
    ){}
    
    @Post("/:quantity")
    @HttpCode(200)
    async buyBook(@Param("quantity") quantity:number , @Body() orderDto: OrderDto , @Res() res:Response){
        const message = await this.orderService.buyBook(Number(quantity), orderDto);
        return res.json({status: HttpStatus.OK , data:{message}})
    }

}
