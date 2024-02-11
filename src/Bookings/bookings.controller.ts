import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { BookingService } from "./bookings.service";
import { Booking } from "./bookings.model";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";
import { AddBookingDto } from "./dto/addBookingDto";
import { AuthGuard } from "src/guards/authentication.guard";
import { RolesGuard } from "src/guards/authorization.guard";
import { AppError } from "src/utils/AppError";

@Controller("/api/bookings")
export class BookingController{

    constructor(private readonly bookingsService: BookingService){}

    @UseGuards(RolesGuard)
    @Get()
    @HttpCode(200)
    async findAllBookings(){
        const bookings:Booking[] = await this.bookingsService.findAllBookings();
        return {status: HttpStatusMessage.SUCCESS , data:{bookings}};
    }

    @UseGuards(AuthGuard)
    @Post()
    @HttpCode(201)
    async addBooking(@Body() addBookingDto: AddBookingDto, @Req() request: any){
        addBookingDto.username = request.payload.username;
        const message = await this.bookingsService.addBooking(addBookingDto);
        return {status: HttpStatusMessage.SUCCESS , data:{message}}
    }

    @UseGuards(RolesGuard)
    @Delete("/:bookingID")
    @HttpCode(200)
    async deleteBooking(@Param("bookingID") bookingID:number){
        const deletedBookings:number = await this.bookingsService.deleteBooking(bookingID);
        if(deletedBookings === 0){
            return AppError("This booking doesn't exist" , HttpStatusMessage.FAIL , HttpStatus.BAD_REQUEST);
        }
        return {status: HttpStatusMessage.SUCCESS , data:{message:"Deleted Successfully"}};
    }
}
