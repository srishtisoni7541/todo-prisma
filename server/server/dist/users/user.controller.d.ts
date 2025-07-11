import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        createdAt: Date;
    }[]>;
    create(dto: CreateUserDto): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
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
        access_token: any;
        user: {
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
        };
    }>;
    updateUser(dto: CreateUserDto): Promise<{
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
}
