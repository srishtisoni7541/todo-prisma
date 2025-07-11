import { IsEnum, IsNotEmpty, IsOptional, Matches, MinLength} from "class-validator";

export enum Role{
    USER='USER',
    ADMIN='ADMIN',
}
 export class CreateUserDto{
    @IsNotEmpty({message:'name is required!'})
    name:string;
@Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, { message: 'Email must be a valid Gmail address' })
    email:string;
    @MinLength(8,{message:'password must be atleast 8 character long!'})
    password:string
    @IsEnum(Role,{message:"role must be either user or admin"})
    @IsOptional()
    role?:Role

 }
 export class LoginDto{
    @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/,{message:'email must be a valid email address!'})
    email:string
    @MinLength(8,{message:"password must be atleast  8 character long!"})
    password:string
 }