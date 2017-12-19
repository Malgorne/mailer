import { Router } from 'express';

import users from './users.route';

export default () => {
  const router = new Router();
  router.use('/users', users);

  return router;
};
