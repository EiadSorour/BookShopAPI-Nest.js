import { HttpStatus, Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/loginUserDto";
import { RegisterUserDto } from "./dto/registerUserDto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../User/user.service";
import { AppError } from "src/utils/AppError";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    constructor(private userService:UserService , private jwtService:JwtService){}

    async login(loginUserDto: LoginUserDto): Promise<string>{
        const user = await this.userService.getUser(loginUserDto.username);
        if(!user){
            AppError("This user doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }

        const verified:boolean = await bcrypt.compare(loginUserDto.password , user.password);
        if(verified){
            const payload = {username: user.username , role: user.role , money_owned: user.money_owned}
            return await this.jwtService.signAsync(payload)
        }else{
            AppError("Wrong password" , HttpStatusMessage.FAIL , HttpStatus.UNAUTHORIZED);
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<string>{
        registerUserDto.password = await bcrypt.hash(registerUserDto.password , 10);
        await this.userService.addUser(registerUserDto);
        const payload = {username: registerUserDto.username , role: registerUserDto.role , money_owned: registerUserDto.money_owned};
        return await this.jwtService.signAsync(payload); 
    }
}