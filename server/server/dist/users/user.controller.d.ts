import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    getUser(req: any): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: {
            todos: {
                id: number;
                createdAt: Date;
                title: string;
                description: string | null;
                status: import(".prisma/client").$Enums.Status;
                visibility: import(".prisma/client").$Enums.Visibility;
                dueDate: Date | null;
                userId: number;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        };
    }>;
    create(dto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    } | {
        msg: string;
    }>;
    Login(loginDto: LoginDto): Promise<{
        message: string;
        access_token?: undefined;
        user?: undefined;
    } | {
        message: string;
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        };
    }>;
    updateUser(dto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    } | {
        message: string;
    }>;
    DeleteUser(dto: CreateUserDto): Promise<{
        message: string;
    }>;
    UserLogout(res: Response): Promise<Response<any, Record<string, any>>>;
}
