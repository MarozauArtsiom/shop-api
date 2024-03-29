import { handlerPath } from '@libs/handler-resolver';

const isProd = process.env.NODE_ENV === 'prod';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: isProd ? 30 : 60 * 10,
  events: [
    {
      http: {
        method: 'GET',
        path: '/product/{id}',
      },
    },
  ],
};
