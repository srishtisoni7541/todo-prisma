import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/todo.dto';
export declare class TodoServices {
    private prisma;
    constructor(prisma: PrismaService);
    getTodos(): import(".prisma/client").Prisma.PrismaPromise<{
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
    CreateTodo(todoDto: CreateTodoDto, userId: number): Promise<{
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
    UpdateTodo(todoDto: CreateTodoDto, userId: number): Promise<{
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
    DeleteTodoById(todoId: number, userId: number): Promise<{
        message: string;
    }>;
    getPublicTodos(): Promise<{
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
    getPrivateTodos(): Promise<{
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
