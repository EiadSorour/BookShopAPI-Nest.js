import { Table , Column , Model, ForeignKey, DataType, DeletedAt} from "sequelize-typescript";
import { Book } from "../book/book.model";
import { User } from "../User/user.model";

@Table
export class Booking extends Model{

    @Column({primaryKey:true , autoIncrement: true})
    bookingID: number;

    @ForeignKey(()=>Book)
    @Column
    bookID: number;

    @ForeignKey(()=>User) 
    @Column
    username: string;

    @Column({allowNull: false , type: DataType.DATE})
    fromDate: any;

    @Column({allowNull: false, type: DataType.DATE})
    toDate: any;

    @DeletedAt
    deletedAt: any;

    paranoid:true;
    timestamps:true;
} 

