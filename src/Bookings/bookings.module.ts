import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './bookings.model';
import { User } from 'src/User/user.model';
import { Book } from 'src/book/book.model';
import { BookingController } from './bookings.controller';
import { BookingService } from './bookings.service';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/User/user.service';
import { UserModule } from 'src/User/user.module';
import { BookModule } from 'src/book/book.module';

@Module({
    imports: [SequelizeModule.forFeature([Booking,User,Book]) , UserModule, BookModule],
    controllers: [BookingController],
    providers: [BookingService, UserService, BookService],
    exports: []
})
export class BookingsModule {}