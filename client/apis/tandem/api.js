const { apiSuccessResponse, readJsonFile, chance } = require('../../src/Utility');

exports.tandemApi = (serverManager, baseApi) => {
  /*
   * /Tandem 1234
   */
  serverManager.get(`${baseApi}/tandem/get-1234`, async (req, res) => {
    const response = await readJsonFile(`${__dirname}/data-1234.json`);

    res.jsonp(response);
  });

  /*
 * /Tandem 4321
 */
  serverManager.get(`${baseApi}/tandem/get-4321`, async (req, res) => {
    const response = await readJsonFile(`${__dirname}/data-4321.json`);

    res.jsonp(response);
  });
};
