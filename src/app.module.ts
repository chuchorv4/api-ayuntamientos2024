import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { PagesModule } from "./modules/pages/pages.module"
import { DomainsModule } from "./modules/domains/domains.module"
import { MongooseModule } from "@nestjs/mongoose"
import { EntriesModule } from "./modules/entries/entries.module"
import { SubCategoriesModule } from "./modules/sub-categories/sub-categories.module"
import { CategoriesModule } from "./modules/categories/categories.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MorganMiddleware } from "./middlewares/morgan.middleware"
import { ContactsModule } from "./modules/contacts/contacts.module"
import { UploadsModule } from "./modules/uploads/uploads.module"
import { TypesModule } from "./modules/types/types.module"
import { OriginsModule } from "./modules/origins/origins.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get<string>("MONGODB_USER")
        const pass = configService.get<string>("MONGODB_PASS")
        const host = configService.get<string>("MONGODB_HOST")
        const port = configService.get<string>("MONGODB_PORT")
        const database = configService.get<string>("MONGODB_DB")
        return {
          uri: `mongodb://${user}:${pass}@${host}:${port}/${database}`,
        }
      },
      inject: [ConfigService],
    }),
    PagesModule,
    DomainsModule,
    EntriesModule,
    SubCategoriesModule,
    CategoriesModule,
    ContactsModule,
    UploadsModule,
    TypesModule,
    OriginsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes("*") // Apply to all routes
  }
}
