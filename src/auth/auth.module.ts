import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/User/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports:[
        ConfigModule.forRoot(),
        JwtModule.register({
        global: true,
        secret: process.env.JWT_SECERET,
        signOptions: {expiresIn: "60s"}
    }),UserModule],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[]
})
export class AuthModule{}