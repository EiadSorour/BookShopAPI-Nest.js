import { Injectable } from "@nestjs/common";
import { AddClientDto } from "./dto/addClientDto";
import { UpdateClientDto } from "./dto/updateClientDto";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./client.model";

@Injectable()
export class ClientService{
    constructor(@InjectModel(Client) private clientModel: typeof Client){}
    
    async findAllClients(): Promise<Client[]>{
        return await this.clientModel.findAll();
    }

    async getClient(clientID:string): Promise<Client>{
        return await this.clientModel.findOne({where: {id:clientID}});
    }

    async addClient(addClientDto: AddClientDto): Promise<void>{
        await this.clientModel.create(addClientDto as any);
    }

    async updateClient(clientID: string , updateClientDto: UpdateClientDto): Promise<Client>{
        return (await this.clientModel.update(updateClientDto , {where: {id:clientID}, returning:true}))[1][0];
    }

    async deleteClient(clientID:string): Promise<void>{
        await this.clientModel.destroy({where: {id:clientID}});
    }
}