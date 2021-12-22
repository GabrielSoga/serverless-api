import type { AWS } from '@serverless/typescript';

import sparkpost from 'functions/sparkpost';

const serverlessConfiguration: AWS = {
  service: 'serverless-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    ['serverless-offline']: {
      httpPort: 3000,
      host: "0.0.0.0",
      babelOptions: {
        presets: ["env"]
      },
      noPrependStageInUrl: true
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {},
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { sparkpost },
};

module.exports = serverlessConfiguration;
