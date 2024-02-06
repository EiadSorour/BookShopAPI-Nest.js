import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService:JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const token = request.headers.authorization.split(" ")[1]
        try{
            this.jwtService.verify(token);
        }catch(error){
            throw new UnauthorizedException(error.message);
        }

        request.payload = this.jwtService.verify(token);
        return true;
    }
}