import { TodoServices } from './todo.service';
import { CreateTodoDto } from './dto/todo.dto';
export declare class TodoController {
    private readonly Todo;
    constructor(Todo: TodoServices);
    getTodos(req: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.Status;
        visibility: import(".prisma/client").$Enums.Visibility;
        dueDate: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createTodo(todoDto: CreateTodoDto, req: any): Promise<{
        message: string;
        msg?: undefined;
        createdTodo?: undefined;
    } | {
        msg: string;
        createdTodo: {
            id: number;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.Status;
            visibility: import(".prisma/client").$Enums.Visibility;
            dueDate: Date | null;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        };
        message?: undefined;
    }>;
    updateTodo(todoDto: CreateTodoDto, req: any): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: {
            id: number;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.Status;
            visibility: import(".prisma/client").$Enums.Visibility;
            dueDate: Date | null;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deleteTodo(todoId: number, req: any): Promise<{
        message: string;
    }>;
    GetPublicTodo(req: any): Promise<{
        message: string;
        todos: {
            id: number;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.Status;
            visibility: import(".prisma/client").$Enums.Visibility;
            dueDate: Date | null;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    GetPrivateTodo(req: any): Promise<{
        message: string;
        todos: {
            id: number;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.Status;
            visibility: import(".prisma/client").$Enums.Visibility;
            dueDate: Date | null;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
