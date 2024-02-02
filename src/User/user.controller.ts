import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { AddUserDto } from "./dto/addUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";
import { User } from "./user.model";
import { HttpStatusMessage } from "../utils/HttpStatusMessage";
import { AppError } from "../utils/AppError";

@Controller("api/user")
export class UserController{

    constructor(private readonly userService: UserService){}

    @Get() 
    @HttpCode(200)
    async getAllUsers(){
        const users:User[] = await this.userService.findAllUsers();
        return {status: HttpStatusMessage.SUCCESS , data:{users}};
    }

    @Post()
    @HttpCode(201)
    async addUser(@Body() addUserDto:AddUserDto){
        await this.userService.addUser(addUserDto);
        return {status: HttpStatusMessage.SUCCESS , data:{message:"Created Successfully"}};
    }

    @Get("/:id")
    @HttpCode(200)
    async getUser( @Param("id") id:string){
        const user:User = await this.userService.getUser(id);
        if(!user){
            return AppError("This user doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{user}};
    }

    @Patch("/:id")
    @HttpCode(200)
    async updateUser(@Param("id") id:string , @Body() updateUserDto:UpdateUserDto){
        const updatedUser:User = await this.userService.updateUser(id , updateUserDto);
        if(!updatedUser){
            return AppError("This user doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{updatedUser}};
    }

    @Delete("/:id")
    @HttpCode(200)
    async deleteUser(@Param("id") id:string){
        const deletedUsers:number = await this.userService.deleteUser(id);
        if(deletedUsers === 0){
            return AppError("This user doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{message:"Deleted Successfully"}};
    }

}