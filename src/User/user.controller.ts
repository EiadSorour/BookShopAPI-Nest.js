import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch,UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/updateUserDto";
import { User } from "./user.model";
import { HttpStatusMessage } from "../utils/HttpStatusMessage";
import { AppError } from "../utils/AppError";
import { RolesGuard } from "src/guards/authorization.guard";

@UseGuards(RolesGuard)
@Controller("api/user")
export class UserController{

    constructor(private readonly userService: UserService){}

    @Get()
    @HttpCode(200)
    async getAllUsers(){
        const users:User[] = await this.userService.findAllUsers();
        return {status: HttpStatusMessage.SUCCESS , data:{users}};
    }

    @Get("/:username")
    @HttpCode(200)
    async getUser( @Param("username") username:string){
        const user:User = await this.userService.getUser(username);
        if(!user){
            return AppError("This user doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{user}};
    }

    @Patch("/:username")
    @HttpCode(200)
    async updateUser(@Param("username") username:string , @Body() updateUserDto:UpdateUserDto){
        const updatedUser:User = await this.userService.updateUser(username , updateUserDto);
        if(!updatedUser){
            return AppError("This user doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{updatedUser}};
    }

    @Delete("/:username")
    @HttpCode(200)
    async deleteUser(@Param("username") username:string){
        const deletedUsers:number = await this.userService.deleteUser(username);
        if(deletedUsers === 0){
            return AppError("This user doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{message:"Deleted Successfully"}};
    }

}