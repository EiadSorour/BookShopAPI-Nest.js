import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/updateUserDto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { RegisterUserDto } from "../auth/dto/registerUserDto";

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

    async addUser(registerUserDto:RegisterUserDto): Promise<void>{
        try{
            await this.userModel.create(registerUserDto as any);
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async getUser(username:string): Promise<User>{
        try{
            return await this.userModel.findOne({where: { username: username } });
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

    async updateUser(username: string , updateUserDto: UpdateUserDto): Promise<User>{
        try{
            if(Object.keys(updateUserDto).length === 0){
                return await this.getUser(username);
            }
            return (await this.userModel.update(updateUserDto , {where: { username: username }  , returning:true}))[1][0];
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }

    async deleteUser(username:string): Promise<number>{
        try{
            return await this.userModel.destroy({where: { username: username } });
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE); 
        }
    }
}