const { apiErrorResponse } = require('./src/Utility');
const { ServerManager } = require('./src/ServerManager');


/*
 * Base api to quickly change the api version
 */
const baseApi = '/api';
const serverManager = new ServerManager({ delay: 250 });

//--------------------------------------------------------------------------------
// Errors (for testing)
//--------------------------------------------------------------------------------
/*
 * API: 200 error
 * Example: /api/error-200
 */
serverManager.get(`${baseApi}/error-200`, async (req, res) => {
  res.jsonp(apiErrorResponse(['Unauthorized', 'error message 1', 'error message 2']));
});

/*
 * API: 500 error
 * Example: /api/error-500
 */
serverManager.get(`${baseApi}/error-500`, async (req, res) => {
  res.status(500).send();
});

/*
 * Start Server - must be called last
 */
serverManager.start();
