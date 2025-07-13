import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class UserService {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    getUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        createdAt: Date;
    }[]>;
    createUser(dto: CreateUserDto): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
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
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
        };
    }>;
    UpdateUser(dto: CreateUserDto): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
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
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
        };
    }>;
}
