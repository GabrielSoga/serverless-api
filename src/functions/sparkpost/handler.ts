import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';

let data: Record<string, unknown> = {};

const sparkpost: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  if (event.httpMethod === "POST") {
    data[event.body.name] = event.body.age;
    console.log(data)
    return formatJSONResponse(200, {
      message: `Operation Successful`,
    });
  }

  if (event.httpMethod === "GET") {
    const pathParameters: string | undefined = event?.pathParameters?.name || ""
    const age = data[pathParameters];
    if (!!age || age === 0) {
      return formatJSONResponse(200, {
        name: pathParameters,
        age
      })
    }

    return formatJSONResponse(404, {
      error: `No entries for ${pathParameters} were found`
    })
  }
}

export const main = middyfy(sparkpost);
