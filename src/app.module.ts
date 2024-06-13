import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { UsersModule } from "./modules/users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
import { ConfigModule } from "@nestjs/config";
// import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

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

    UsersModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      include: [UsersModule],
    }),
  ],
})
export class AppModule {}
