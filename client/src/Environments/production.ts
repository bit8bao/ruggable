import environment, { Environment } from './base';

/*
 * base.ts is the default environment for production.
 * You shouldn't have override anything.
 */

const baseApi = 'https://tandem';
const env = environment(baseApi);

const productionEnv: Environment = {
  ...env,
};

export default productionEnv;
