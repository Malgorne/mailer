import http from 'http';

import { port, env } from './config/env';
import initApp from './config/express';
import logger from './config/winston';

const launch = () => new Promise((resolve) => {
  const app = initApp();
  const server = http.createServer(app);
  server.listen(port,
    () => logger.info(`Server started on port ${port} (${env})`));
  return resolve(server);
})
  .catch(err => logger.error(`Server Crashed: ${err}`));

// Required to support mocha watch, see: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) launch();
else module.exports = { launch };
