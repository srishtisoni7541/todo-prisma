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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const auth_service_1 = require("server/src/auth/auth.service");
let UserService = class UserService {
    prisma;
    authService;
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    getUsers() {
        return this.prisma.user.findMany();
    }
    async createUser(dto) {
        const { name, email, password: rawPassword, role } = dto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser)
            return { msg: 'User already exists!' };
        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'USER',
            },
        });
        const { password, ...result } = user;
        return result;
    }
    async LoginUser(loginDto) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return { message: 'Invalid Credentials' };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return { message: 'Invalid Credentials' };
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const token = await this.authService.generateToken(payload);
        const { password: _, ...userData } = user;
        return {
            message: 'Login Successful',
            access_token: token,
            user: userData,
        };
    }
    async UpdateUser(dto) {
        const { name, password: rawPassword } = dto;
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user)
            return { message: 'User not found!' };
        const newPass = await bcrypt.hash(rawPassword, 10);
        const updated = await this.prisma.user.update({
            where: { email: dto.email },
            data: { name, password: newPass },
        });
        const { password, ...data } = updated;
        return data;
    }
    async DeleteUser(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user)
            return { message: 'User not found!' };
        await this.prisma.user.delete({ where: { email: dto.email } });
        return { message: 'User Account Deleted Successfully!' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], UserService);
//# sourceMappingURL=user.service.js.map