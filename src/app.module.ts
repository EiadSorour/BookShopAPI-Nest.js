import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModule } from './client/client.module';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    SequelizeModule.forRoot({
      username: process.env.DIALECT,
      dialect: process.env.DIALECT as any,
      host: process.env.HOST as any,
      port: process.env.PORT as any,
      password: process.env.PASSWORD as any,
      database: process.env.DATABASE as any,
      autoLoadModels: true,
      synchronize: true 
    }),
    ClientModule,
    BookModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}