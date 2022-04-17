"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
require('./database');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _path = require('path');
var _ErrorsApp = require('./erros/ErrorsApp'); var _ErrorsApp2 = _interopRequireDefault(_ErrorsApp);
//import swaggerUi from 'swagger-ui-express';
//import swaggerFile from './swagger.json';
_dotenv2.default.config();

const app = _express2.default.call(void 0, );

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads')));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(_cors2.default.call(void 0, ));
app.use(_routes2.default);

app.use((error, request, response, _next) => {
  if (error instanceof _ErrorsApp2.default) {
    return response.status(error.status).json({
      status: 'error',
      message: error.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal error',
  });
});

const port = 3333;
app.listen(process.env.PORT || 3333, () => {
  console.log(`\nEscutando  na porta ${port}`);
});
