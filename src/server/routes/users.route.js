/**
 * In charge to validate the request.
 * @module routes/users
 */

import { Router } from 'express';
import validate from 'express-validation';

import { getUsersMails, postTest } from '../controllers/users.controller';
import { validation } from '../../config/templates';

const router = new Router();

/**
 * A basic get route.
 * @function mailer/users/get
 * @return success : { JSON }: HTTP/1.1 200 OK - { "sucess": true }
 */
router.route('/get')
  .get(getUsersMails);

/**
 * The users post route. It send email in function of the req body config.
 * It will be validate by express-validation.
 * The config of each route can be find in @see {@link module:config/templates/users }
 * @function /mailer/users/post
 * @param req.body a basic post route with a sample controller.
 * @return success : { JSON }: HTTP/1.1 200 OK - { "sucess": true }
 *
 *        failure: { Object }: HTTP/1.1 BAD_REQUEST - "${key}" is required
 */
router.route('/post')
  .post(validate(validation), postTest);

export default router;
