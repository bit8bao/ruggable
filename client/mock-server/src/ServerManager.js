const jsonServer = require('json-server');

class ServerManager {
  _port = process.env.PORT || 1234;
  _server = jsonServer.create();

  constructor(config = {}) {
    // Set default middlewares (logger, static, cors and no-cache)
    this._server.use(jsonServer.defaults());

    // To handle POST, PUT and PATCH you need to use a body-parser
    this._server.use(jsonServer.bodyParser);

    // Http Interceptor
    this._server.use((req, res, next) => {
      //   if (req.method === 'POST') {
      //     req.body.createdAt = Date.now();
      //   }

      // delay response for real world experience
      setTimeout(next, config.delay || 0);
    });
  }

  get(endpoint, callback) {
    this._server.get(endpoint, callback);
  }

  post(endpoint, callback) {
    this._server.post(endpoint, callback);
  }

  start() {
    this._server.listen(this._port, () => {
      console.log(`JSON Server is running on ${this._port}`);
    });
  }
}

exports.ServerManager = ServerManager;
