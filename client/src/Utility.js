const path = require('path');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const Chance = require('chance');
const moment = require('moment');

const chance = new Chance();

const apiSuccessResponse = (data) => ({
  data,
  success: true,
  errors: [],
});

const apiErrorResponse = (arrayOfString) => ({
  data: null,
  success: false,
  errors: arrayOfString,
});

const randomizeResponseWithErrors = (res, response) => {
  const num = chance.integer({ min: 0, max: 3 });

  if (num === 0) {
    res.jsonp(apiErrorResponse(['200 Api Error']));

    return;
  }

  if (num === 1) {
    res.status(500).send();

    return;
  }

  if (num === 3) {
    res.status(401).send();

    return;
  }

  res.jsonp(response);
};

const readTextFile = async (filePath) => {
  return readFileAsync(path.normalize(filePath), { encoding: 'utf8' });
};

const readJsonFile = async (filePath) => {
  const jsonData = await readTextFile(filePath);

  return JSON.parse(jsonData);
};

const getMomentTimes = (start, end) => {
  const startTime = moment(start).utc();
  const endTime = moment(end).utc();
  const duration = moment.duration(endTime.diff(startTime));
  return [startTime, endTime, duration];
};

module.exports = {
  apiErrorResponse,
  apiSuccessResponse,
  chance,
  getMomentTimes,
  randomizeResponseWithErrors,
  readJsonFile,
  readTextFile,
};
