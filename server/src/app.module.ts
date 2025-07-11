import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todos/todo.module';
import { TodoController } from './todos/todo.controller';
import { TodoServices } from './todos/todo.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule,PrismaModule,TodoModule,AuthModule],
  controllers: [AppController,TodoController],
  providers: [AppService,TodoServices],
})
export class AppModule {}
