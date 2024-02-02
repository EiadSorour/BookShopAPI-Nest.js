import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ClientService } from "./client.service";
import { AddClientDto } from "./dto/addClientDto";
import { UpdateClientDto } from "./dto/updateClientDto";
import { Client } from "./client.model";
import { HttpStatusMessage } from "../utils/HttpStatusMessage";
import { AppError } from "../utils/AppError";

@Controller("api/client")
export class ClientController{

    constructor(private readonly clientService: ClientService){}

    @Get() 
    @HttpCode(200)
    async getAllClients(){
        const clients:Client[] = await this.clientService.findAllClients();
        return {status: HttpStatusMessage.SUCCESS , data:{clients}};
    }

    @Post()
    @HttpCode(201)
    async addClient(@Body() addClientDto:AddClientDto){
        await this.clientService.addClient(addClientDto);
        return {status: HttpStatusMessage.SUCCESS , data:{message:"Created Successfully"}};
    }

    @Get("/:id")
    @HttpCode(200)
    async getClient( @Param("id") id:string){
        const client:Client = await this.clientService.getClient(id);
        if(!client){
            return AppError("This client doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{client}};
    }

    @Patch("/:id")
    @HttpCode(200)
    async updateClient(@Param("id") id:string , @Body() updateClientDto:UpdateClientDto){
        const updatedClient:Client = await this.clientService.updateClient(id , updateClientDto);
        if(!updatedClient){
            return AppError("This client doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{updatedClient}};
    }

    @Delete("/:id")
    @HttpCode(200)
    async deleteClient(@Param("id") id:string){
        const deletedClients:number = await this.clientService.deleteClient(id);
        if(deletedClients === 0){
            return AppError("This client doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{message:"Deleted Successfully"}};
    }

}