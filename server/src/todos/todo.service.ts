import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodoServices {
  constructor(private prisma: PrismaService) {}

  getTodos() {
    return this.prisma.todo.findMany();
  }

  async CreateTodo(todoDto: CreateTodoDto, userId: number) {
    try {
      const { title, description } = todoDto;

      const existingTodo = await this.prisma.todo.findFirst({
        where: {
          title,
          userId,
        },
      });

      if (existingTodo) {
        return {
          message: 'You already have a todo with this title!',
        };
      }

      const createdTodo = await this.prisma.todo.create({
        data: {
          title,
          description,
          status: todoDto.status || 'PENDING',
          visibility: todoDto.visibility || 'PUBLIC',
          userId,
        },
      });

      return { msg: 'Todo created successfully!', createdTodo };
    } catch (error) {
      console.error('CreateTodo Error:', error);
      throw new Error('Something went wrong while creating the todo.');
    }
  }

  async UpdateTodo(todoDto: CreateTodoDto, userId: number) {
    try {
      const { title, description, status, visibility } = todoDto;

      const todo = await this.prisma.todo.findFirst({
        where: {
          title,
          userId,
        },
      });

      if (!todo) {
        return {
          message: 'Todo does not exist or you do not have permission!',
        };
      }

      const updatedTodo = await this.prisma.todo.update({
        where: { id: todo.id },
        data: {
          title: title ?? todo.title,
          description: description ?? todo.description,
          status: status ?? todo.status,
          visibility: visibility ?? todo.visibility,
        },
      });

      return {
        message: 'Todo updated successfully!',
        data: updatedTodo,
      };
    } catch (error) {
      console.error('UpdateTodo Error:', error);
      throw new Error('Something went wrong while updating the todo.');
    }
  }

  async DeleteTodoById(todoId: number, userId: number) {
    try {
      const todo = await this.prisma.todo.findUnique({
        where: { id: todoId },
      });

      if (!todo || todo.userId !== userId) {
        return { message: 'Todo not found or unauthorized access!' };
      }

      await this.prisma.todo.delete({
        where: { id: todoId },
      });

      return { message: 'Todo deleted successfully!' };
    } catch (error) {
      console.error('DeleteTodo Error:', error);
      throw new Error('Something went wrong while deleting the todo.');
    }
  }

  async getPublicTodos() {
    const todos = await this.prisma.todo.findMany({
      where: {
        visibility: 'PUBLIC',
      },
    });

    return {
      message: 'Public todos fetched successfully!',
      todos,
    };
  }
  async getPrivateTodos() {
     const todos = await this.prisma.todo.findMany({
       where: {
         visibility: 'PRIVATE',
       },
     });
 
     return {
       message: 'Public todos fetched successfully!',
       todos,
     };
   }
}
