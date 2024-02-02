import { Table , Column , Model, BelongsToMany } from "sequelize-typescript";
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

    @BelongsToMany(()=>User , { through: {model: ()=>Order,  unique: false } })
    users: User[]
}