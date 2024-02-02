import { Table , Column , Model, BelongsToMany } from "sequelize-typescript";
import { Client } from "src/client/client.model";
import { Order } from "src/order/order.model";

@Table
export class Book extends Model{
    
    @Column({allowNull: false})
    title: string;

    @Column({allowNull: false})
    price: number;

    @Column({allowNull: false})
    quantity_in_stock: number;

    @BelongsToMany(()=>Client , { through: {model: ()=>Order,  unique: false } })
    clients: Client[]
}