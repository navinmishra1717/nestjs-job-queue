import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BullModule } from "@nestjs/bull";
import { UsersModule } from "./users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
// import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

@Module({
  imports: [
    UsersModule,
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),

    BullBoardModule.forRoot({
      route: "/queues",
      adapter: ExpressAdapter,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      include: [UsersModule],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
