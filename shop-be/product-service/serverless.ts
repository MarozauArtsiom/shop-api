require('dotenv').config();
import type { AWS } from '@serverless/typescript';
import * as functions from '@functions/index'

const serverlessConfiguration: AWS = {
  service: 'shop-info-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      CONNECTION_STRING: process.env.CONNECTION_STRING,
      NODE_ENV: process.env.NODE_ENV,
    },
  },
  // import the function via paths
  functions: { ...functions },

  package: { excludeDevDependencies: true, individually: false },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      external: [
        'pg',
        'pg-hstore',
      ],
      packager: 'npm',
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
