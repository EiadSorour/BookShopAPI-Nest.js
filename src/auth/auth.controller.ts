import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { LoginUserDto } from "./dto/loginUserDto";
import { RegisterUserDto } from "./dto/registerUserDto";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";
import { AuthService } from "./auth.service";

@Controller("/api/user")
export class AuthController{

    constructor(private authService:AuthService){}

    @Post("/login")
    @HttpCode(200)
    async login(@Body() loginUserDto:LoginUserDto){
        const token = await this.authService.login(loginUserDto);
        return {status: HttpStatusMessage.SUCCESS , data:{token}};
    }

    @Post("/register")
    @HttpCode(201)
    async register(@Body() registerUserDto:RegisterUserDto){
        const token = await this.authService.register(registerUserDto);
        return {status: HttpStatusMessage.SUCCESS , data:{token}};
    }

}