import { Table , Column , Model, BelongsToMany } from "sequelize-typescript";
import { Booking } from "src/Bookings/bookings.model";
import { User } from "src/User/user.model";
import { Order } from "src/order/order.model";

@Table
export class Book extends Model{
    
    @Column({allowNull: false})
    title: string;

    @Column({allowNull: false})
    price: number;

    @Column({allowNull: false})
    quantity_in_stock: number;

    @Column({allowNull: false})
    available: boolean;

    @BelongsToMany(()=>User , { through: {model: ()=>Order,  unique: false } })
    buyingUsers: User[]

    @BelongsToMany(()=>User , { through: {model: ()=>Booking,  unique: false } })
    bookingUsers: User[]
}