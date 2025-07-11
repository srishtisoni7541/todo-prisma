import { PrismaService } from 'server/src/prisma/prisma.service';
import { CreateTodoDto } from './dto/todo.dto';
export declare class TodoServices {
    private prisma;
    constructor(prisma: PrismaService);
    getTodos(): any;
    CreateTodo(todoDto: CreateTodoDto, userId: number): Promise<{
        message: string;
        msg?: undefined;
        createdTodo?: undefined;
    } | {
        msg: string;
        createdTodo: any;
        message?: undefined;
    }>;
    UpdateTodo(todoDto: CreateTodoDto, userId: number): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: any;
    }>;
    DeleteTodoById(todoId: number, userId: number): Promise<{
        message: string;
    }>;
}
