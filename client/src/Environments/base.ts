/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 */
export default function baseEnv(baseApi: string) {
  return {
    intervals: {
    },
    graphql: {
      default: `${baseApi}`,
    },
    api: {
      navigationAll: `${baseApi}/api/navigation/get-navigation-tree`,
      // Development specific only used in mock.ts
      defaut: '', // only used for mock api to test status errors
      error200: '', // only used for mock api to test status errors
      error500: '', // only used for mock api to test status errors
    },
    token: {
      auth: process.env.REACT_APP_AUTH_TOKEN,
    },
    isProduction: true,
    isDevelopment: false,
    isTesting: false,
  };
}

export type Environment = ReturnType<typeof baseEnv>;
