import { IsNotEmpty, Matches, MinLength} from "class-validator";

 export class CreateUserDto{
    @IsNotEmpty({message:'name is required!'})
    name:string;
@Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, { message: 'Email must be a valid Gmail address' })
    email:string;
    @MinLength(8,{message:'password must be atleast 8 character long!'})
    password:string
 }