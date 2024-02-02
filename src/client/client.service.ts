import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AddClientDto } from "./dto/addClientDto";
import { UpdateClientDto } from "./dto/updateClientDto";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./client.model";

@Injectable()
export class ClientService{
    constructor(@InjectModel(Client) private clientModel: typeof Client){}
    
    async findAllClients(): Promise<Client[]>{
        try{
            return await this.clientModel.findAll();
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async getClient(clientID:string): Promise<Client>{
        try{
            return await this.clientModel.findOne({where: {id:clientID}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

    async addClient(addClientDto: AddClientDto): Promise<void>{
        try{
            await this.clientModel.create(addClientDto as any);
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

    async updateClient(clientID: string , updateClientDto: UpdateClientDto): Promise<Client>{
        try{
            if(Object.keys(updateClientDto).length === 0){
                return await this.getClient(clientID);
            }
            return (await this.clientModel.update(updateClientDto , {where: {id:clientID}, returning:true}))[1][0];
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

    async deleteClient(clientID:string): Promise<number>{
        try{
            return await this.clientModel.destroy({where: {id:clientID}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }
}