import { Module } from "@nestjs/common";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Client } from "./client.model";

@Module({
    imports: [SequelizeModule.forFeature([Client])],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService]
})
export class ClientModule{}