import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService:JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const token = request.headers.authorization.split(" ")[1]
        try{
            const user = this.jwtService.verify(token);
            if(user.role === "admin"){
                return true;
            }else{
                throw new Error("Must be an admin");
            }
        }catch(error){
            throw new UnauthorizedException(error.message);
        }
    }
}