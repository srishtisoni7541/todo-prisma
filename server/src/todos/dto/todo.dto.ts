import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}


export class CreateTodoDto{
    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    description:string;
      @IsEnum(Status, { message: 'Invalid status' })
  @IsOptional()
  status?: Status;

  @IsEnum(Visibility, { message: 'Invalid visibility' })
  @IsOptional()
  visibility?: Visibility;
}
