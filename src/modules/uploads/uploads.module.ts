import { Module } from "@nestjs/common"
import { MulterModule } from "@nestjs/platform-express"
import { UploadsService } from "./uploads.service"
import { UploadsController } from "./uploads.controller"
import { diskStorage } from "multer"
import path from "node:path"
import fs from "node:fs"

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (request, _file, callback) => {
          const uploadDirectory = `./public/uploads/${request?.body?._id ?? "temp"}`
          fs.mkdirSync(uploadDirectory, { recursive: true })
          // eslint-disable-next-line unicorn/no-null
          callback(null, uploadDirectory)
        },
        filename: (_request, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9)
          callback(
            // eslint-disable-next-line unicorn/no-null
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
          )
        },
      }),
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
