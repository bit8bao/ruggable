import environment, { Environment } from './base';

const baseApi = 'http://localhost:1234';
const env = environment(baseApi);

const mockEnv: Environment = {
  ...env,
  api: {
    ...env.api,
    error200: `${baseApi}/api/error-200`,
    error500: `${baseApi}/api/error-500`,
  },
  isProduction: false,
  isDevelopment: true,
};

export default mockEnv;
