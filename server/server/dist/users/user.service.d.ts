import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class UserService {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    getUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    createUser(dto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    } | {
        msg: string;
    }>;
    LoginUser(loginDto: LoginDto): Promise<{
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
    UpdateUser(dto: CreateUserDto): Promise<{
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
    GetUser(email: string): Promise<{
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
}
