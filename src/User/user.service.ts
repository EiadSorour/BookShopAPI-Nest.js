import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AddUserDto } from "./dto/addUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";

@Injectable()
export class UserService{
    constructor(@InjectModel(User) private userModel: typeof User){}
    
    async findAllUsers(): Promise<User[]>{
        try{
            return await this.userModel.findAll();
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async getUser(userID:string): Promise<User>{
        try{
            return await this.userModel.findOne({where: {id:userID}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

    async addUser(addUserDto: AddUserDto): Promise<void>{
        try{
            await this.userModel.create(addUserDto as any);
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

    async updateUser(userID: string , updateUserDto: UpdateUserDto): Promise<User>{
        try{
            if(Object.keys(updateUserDto).length === 0){
                return await this.getUser(userID);
            }
            return (await this.userModel.update(updateUserDto , {where: {id:userID}, returning:true}))[1][0];
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

    async deleteUser(userID:string): Promise<number>{
        try{
            return await this.userModel.destroy({where: {id:userID}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }
}