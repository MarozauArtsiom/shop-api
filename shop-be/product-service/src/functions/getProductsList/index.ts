import { handlerPath } from '@libs/handler-resolver';

const isProd = process.env.NODE_ENV === 'production';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: isProd ? 30 : 60 * 10,
  events: [
    {
      http: {
        path: 'product/available',
        method: 'GET',
      },
    },
  ],
};
