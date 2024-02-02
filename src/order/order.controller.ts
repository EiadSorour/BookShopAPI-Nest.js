import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { OrderDto } from "./dto/orderDto";
import { OrderService } from "./order.service";
import { HttpStatusMessage } from "../utils/HttpStatusMessage";

@Controller("/api/buy")
export class OrderController{

    constructor(
        private readonly orderService:OrderService,
        
    ){}
    
    @Post("/:quantity")
    @HttpCode(200)
    async buyBook(@Param("quantity") quantity:number , @Body() orderDto: OrderDto){
        const message = await this.orderService.buyBook(Number(quantity), orderDto);
        return {status: HttpStatusMessage.SUCCESS , data:{message}};
    }

}
