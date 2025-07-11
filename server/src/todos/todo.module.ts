import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoServices } from "./todo.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[AuthModule],
    controllers:[TodoController],
    providers:[TodoServices],
})
export class TodoModule{};