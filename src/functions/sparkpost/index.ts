import schema from './schema';
import { handlerPath } from 'libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'sparkpost',
        request: {
          schema: {
            'application/json': schema
          }
        }
      },
    },
    {
      http: {
        method: 'get',
        path: 'sparkpost/{name}',
        request: {
          parameters: {
            paths: {
              name: true
            }
          }
        }
      },
    }
  ]
}
