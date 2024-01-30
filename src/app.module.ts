import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModule } from './client/client.module';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'eiad1422003',
      database: 'bookshop',
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