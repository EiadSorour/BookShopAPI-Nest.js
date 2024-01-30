import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Next, Param, Patch, Post, Res } from "@nestjs/common";
import { ClientService } from "./client.service";
import { AddClientDto } from "./dto/addClientDto";
import { UpdateClientDto } from "./dto/updateClientDto";
import { NextFunction, Response } from "express";
import { Client } from "./client.model";

@Controller("api/client")
export class ClientController{

    constructor(private readonly clientService: ClientService){}

    @Get() 
    @HttpCode(200)
    async getAllClients(@Res() res:Response){
        const clients:Client[] = await this.clientService.findAllClients();
        return res.json({status: HttpStatus.OK , data:{clients}});
    }

    @Post()
    @HttpCode(201)
    async addClient(@Body() addClientDto:AddClientDto, @Res() res:Response){
        await this.clientService.addClient(addClientDto);
        return res.json({status: HttpStatus.CREATED , data:{message:"Created Successfully"}});
    }

    @Get("/:id")
    @HttpCode(200)
    async getClient( @Param("id") id:string , @Res() res:Response, @Next() next:NextFunction ){
        const client:Client = await this.clientService.getClient(id);
        return res.json({status: HttpStatus.OK , data:{client}});
    }

    @Patch("/:id")
    @HttpCode(200)
    async updateClient(@Param("id") id:string , @Body() updateClientDto:UpdateClientDto, @Res() res:Response){
        const updatedClient:Client = await this.clientService.updateClient(id , updateClientDto);
        return res.json({status: HttpStatus.OK , data:{updatedClient}});
    }

    @Delete("/:id")
    @HttpCode(200)
    async deleteClient(@Param("id") id:string , @Res() res:Response){
        await this.clientService.deleteClient(id);
        return res.json({status: HttpStatus.CREATED , data:{message:"Deleted Successfully"}});
    }

}