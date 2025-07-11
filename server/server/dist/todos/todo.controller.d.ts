import { TodoServices } from './todo.service';
import { CreateTodoDto } from './dto/todo.dto';
export declare class TodoController {
    private readonly Todo;
    constructor(Todo: TodoServices);
    getTodos(req: any): any;
    createTodo(todoDto: CreateTodoDto, req: any): Promise<{
        message: string;
        msg?: undefined;
        createdTodo?: undefined;
    } | {
        msg: string;
        createdTodo: any;
        message?: undefined;
    }>;
    updateTodo(todoDto: CreateTodoDto, req: any): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: any;
    }>;
    deleteTodo(todoId: number, req: any): Promise<{
        message: string;
    }>;
}
