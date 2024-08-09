import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { DomainsService } from "./domains.service"
import { DomainsController } from "./domains.controller"
import { Domain, DomainSchema } from "./entities/domain.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Domain.name, schema: DomainSchema }]),
  ],
  providers: [DomainsService],
  controllers: [DomainsController],
})
export class DomainsModule {}
