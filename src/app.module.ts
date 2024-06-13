import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { UsersModule } from "./modules/users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailProvider } from "./providers/email/email.provider";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get("QUEUE_HOST"),
          port: configService.get("QUEUE_PORT"),
        },
      }),
      inject: [ConfigService],
    }),

    BullBoardModule.forRoot({
      route: "/queues",
      adapter: ExpressAdapter,
    }),

    EmailProvider, // enables email sending in nestjs using nodemailer

    UsersModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      include: [UsersModule],
    }),
  ],
})
export class AppModule {}
