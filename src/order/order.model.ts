import { Table , Column , Model, ForeignKey } from "sequelize-typescript";
import { Book } from "src/book/book.model";
import { Client } from "src/client/client.model";

@Table
export class Order extends Model{
    @Column({allowNull: false})
    quantity: number;

    @ForeignKey(()=>Book)
    @Column
    bookID: number;

    @ForeignKey(()=>Client)
    @Column
    clientID: number;
}

