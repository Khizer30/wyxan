import { BrowseModule } from "@modules/browse/browse.module";
import { PersonModule } from "@modules/person/person.module";
import { SiteModule } from "@modules/site/site.module";
import { VisitModule } from "@modules/visit/visit.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 100 }]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", "../../.env"]
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        forRoutes: ["*path"],
        pinoHttp: {
          level: configService.get<string>("LOG_LEVEL", "info"),
          transport: {
            targets: [{ target: "pino-pretty", options: { singleLine: true, colorize: true } }]
          },
          redact: ["req.headers.authorization", "req.headers.cookie"],
          autoLogging: true
        }
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>("DATABASE_URL")
      })
    }),
    ScheduleModule.forRoot({}),
    PersonModule,
    SiteModule,
    VisitModule,
    BrowseModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
