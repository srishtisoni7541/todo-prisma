export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: Role;
}
export declare class LoginDto {
    email: string;
    password: string;
}
