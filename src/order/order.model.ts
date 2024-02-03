import { Table , Column , Model, ForeignKey } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { User } from "../User/user.model";

@Table
export class Order extends Model{

    @Column({primaryKey:true , autoIncrement: true})
    orderID: number;

    @Column({allowNull: false})
    quantity: number;

    @ForeignKey(()=>Book)
    @Column
    bookID: number;

    @ForeignKey(()=>User) 
    @Column
    username: string;
} 

