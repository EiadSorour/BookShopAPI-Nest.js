import { Table , Column , Model, BelongsToMany } from "sequelize-typescript";
import { Booking } from "src/Bookings/bookings.model";
import { Book } from "src/book/book.model";
import { Order } from "src/order/order.model";

@Table
export class User extends Model{

    @Column({allowNull: false , unique:true, primaryKey:true})
    username: string;

    @Column({allowNull: false})
    password: string;

    @Column({allowNull: false})  
    money_owned: number;

    @Column({allowNull: false})
    role: string
    
    @Column({defaultValue: 0})
    total_books_bought: number

    @BelongsToMany(()=>Book , { through: {model: ()=>Order,  unique: false } })
    boughtBooks: Book[]

    @BelongsToMany(()=>Book , { through: {model: ()=>Booking,  unique: false } })
    bookedBooks: Book[]
}