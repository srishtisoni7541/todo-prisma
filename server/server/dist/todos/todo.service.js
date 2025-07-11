"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoServices = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TodoServices = class TodoServices {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getTodos() {
        return this.prisma.todo.findMany();
    }
    async CreateTodo(todoDto, userId) {
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
        }
        catch (error) {
            console.error('CreateTodo Error:', error);
            throw new Error('Something went wrong while creating the todo.');
        }
    }
    async UpdateTodo(todoDto, userId) {
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
        }
        catch (error) {
            console.error('UpdateTodo Error:', error);
            throw new Error('Something went wrong while updating the todo.');
        }
    }
    async DeleteTodoById(todoId, userId) {
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
        }
        catch (error) {
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
};
exports.TodoServices = TodoServices;
exports.TodoServices = TodoServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TodoServices);
//# sourceMappingURL=todo.service.js.map