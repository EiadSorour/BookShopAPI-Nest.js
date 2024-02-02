import { Table , Column , Model, BelongsToMany } from "sequelize-typescript";
import { Book } from "src/book/book.model";
import { Order } from "src/order/order.model";

@Table
export class User extends Model{
    
    @Column({allowNull: false})
    first_name: string;

    @Column({allowNull: false})
    last_name: string;

    @Column({allowNull: false})
    money_owned: number;

    @Column({allowNull: false})
    role: string
    
    @Column({defaultValue: 0})
    total_books_bought: number

    @BelongsToMany(()=>Book , { through: {model: ()=>Order,  unique: false } })
    books: Book[]
}