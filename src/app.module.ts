import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BullModule } from "@nestjs/bull";
import { UsersModule } from "./users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),

    BullModule.registerQueue({
      name: "emailSending",
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
