import { Injectable, NestMiddleware } from "@nestjs/common"
import { IncomingMessage, ServerResponse } from "node:http"
import * as morgan from "morgan"

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  use(
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>,
    next: () => void
  ) {
    morgan(
      "<ADDRESS> :remote-addr <DATE> [:date[clf]] <STATUS> :status <METHOD> :method <URL> :url <HEADERS> :headers <BODY> :body <END> :response-time ms"
    )(request, response, next)

    morgan.token("headers", request => JSON.stringify(request.headers))
    morgan.token("body", request => JSON.stringify(request["body"]))
  }
}
