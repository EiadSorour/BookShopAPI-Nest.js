import {HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Booking } from "./bookings.model";
import { InjectModel } from "@nestjs/sequelize";
import { AddBookingDto } from "./dto/addBookingDto";
import { UserService } from "src/User/user.service";
import { BookService } from "src/book/book.service";
import { ConfigService } from "@nestjs/config";
import { User } from "src/User/user.model";
import { Book } from "src/book/book.model";
import { AppError } from "src/utils/AppError";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";
import sequelize from "sequelize";

@Injectable()
export class BookingService{

    constructor(
        private readonly configService: ConfigService,
        private readonly userService:UserService,
        private readonly bookService:BookService,
        @InjectModel(Booking) private bookingModel: typeof Booking){}

    async findAllBookings(){
        try{
            return await this.bookingModel.findAll();
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async addBooking(addBookingDto: AddBookingDto){
        
        const user:User = await this.userService.getUser(String(addBookingDto.username));
        const book:Book = await this.bookService.getBook(String(addBookingDto.bookID));

        if(!book){
            return AppError("This book doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        
        const fromDate = new Date(addBookingDto.fromDate);
        const toDate = new Date(addBookingDto.toDate);
        const differenceInTime = toDate.getTime() - fromDate.getTime();
        const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
        const bookingCost = differenceInDays*Number(this.configService.get("COST_PER_DAY"));
        
        if(user.money_owned < bookingCost){
            return AppError("Client doesn't have enough money" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST)
        }

        try{
            const freeBooksThatTime = await this.bookingModel.findAndCountAll({where: {bookID: book.dataValues.id , toDate: {[sequelize.Op.lte]: addBookingDto.fromDate} }});
            if(book.available === true || freeBooksThatTime.count > 1){
                book.quantity_in_stock -= 1;
                if(book.quantity_in_stock === 0){
                    book.available = false;
                }
                user.money_owned -= bookingCost;
                
                await this.bookingModel.create(addBookingDto as any);
                await this.userService.updateUser(user.dataValues.username , user.dataValues);
                await this.bookService.updateBook(book.dataValues.id , book.dataValues);

                return `User '${user.username}' booked '${book.title}' for ${differenceInDays} days `;
            }else{
                return `There is no free copies of book ${book.title} from ${addBookingDto.fromDate} to ${addBookingDto.fromDate}`
            }
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async deleteBooking(bookingID:number): Promise<number>{
        try{
            const booking:Booking = await this.bookingModel.findOne( { where: {bookingID:bookingID} } );
            if(!booking){
                return 0;
            }
            const book:Book = await this.bookService.getBook(String(booking.bookID));
            console.log(book);
            const user:User = await this.userService.getUser(String(booking.username));
            const fromDate = new Date(booking.fromDate);
            const toDate = new Date(booking.toDate);
            const differenceInTime = toDate.getTime() - fromDate.getTime();
            const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
            const bookingCost = differenceInDays*Number(this.configService.get("COST_PER_DAY"));
            
            
            
            book.quantity_in_stock += 1;
            if(book.quantity_in_stock >= 1){
                book.available = true;
            }
            user.money_owned += bookingCost;

            await this.bookService.updateBook(String(book.dataValues.id) , book.dataValues);
            await this.userService.updateUser(String(user.dataValues.username) , user.dataValues);
            return await this.bookingModel.destroy({where: { bookingID: bookingID } });
        }catch(error){
            throw new HttpException(error.message , HttpStatus.NOT_ACCEPTABLE);
        }
    }
    
}