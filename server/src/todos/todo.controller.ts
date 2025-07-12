import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoServices } from './todo.service';
import { CreateTodoDto } from './dto/todo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly Todo: TodoServices) {}

  @Get('/all')
  getTodos(@Req() req) {
    // console.log(' GET /todos/all by user:', req.user);
    return this.Todo.getTodos();
  }

  @Post('/create-todo')
  async createTodo(@Body() todoDto: CreateTodoDto, @Req() req) {
    const user = req.user;

    if (!user || !user.sub) {
      console.error(' User info missing in request!');
      throw new Error('Unauthorized');
    }

    return this.Todo.CreateTodo(todoDto, user.sub);
  }
  @Put('/update-todo')
  async updateTodo(@Body() todoDto: CreateTodoDto, @Req() req) {
    const user = req.user;

    if (!user || !user.sub) {
      console.error(' User info missing in request!');
      throw new Error('Unauthorized');
    }
    return this.Todo.UpdateTodo(todoDto, user.sub);
  }
  @Post('/delete-todo')
  async deleteTodo(@Body('id') todoId: number, @Req() req) {
    const user = req.user;

    if (!user || !user.sub) {
      console.error('User info missing in request!');
      throw new Error('Unauthorized');
    }

    return this.Todo.DeleteTodoById(todoId, user.sub);
  }
  @Get('/public-todo')
  async GetPublicTodo(@Req() req){
    const user = req.user;
   if (!user || !user.sub) {
      console.error(' User info missing in request!');
      throw new Error('Unauthorized');
    }
    return this.Todo.getPublicTodos();

  }
  @Get('/private-todo')
  async GetPrivateTodo(@Req() req){
    const user = req.user;
   if (!user || !user.sub) {
      console.error(' User info missing in request!');
      throw new Error('Unauthorized');
    }
    return this.Todo.getPrivateTodos();

  }
}
