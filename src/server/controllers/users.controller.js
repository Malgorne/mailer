/**
 * In charge to bind the data of the requests for the users.route management to
 * the mailer and response success or failure.
 * @module controllers/users
 */

import { OK, INTERNAL_SERVER_ERROR } from 'http-status';

import nodemailer from '../mailer';

/**
 * Sample controller used for a get route.
 * @function getUsersMails
 * @param  { Object } req the request
 * @param  { Object } res the response
 * @return { Void }
 */
export const getUsersMails = (req, res) => res.status(OK).json({ success: true });

/**
 * Bind the body data to the mailer and respond success or failure.
 * @function postTest
 * @param  {Object} req The request wich must contain a param name.
 * @param  {String} req.body.emailType Mail's type, like "users.register".
 * @param  {String} req.body.mail User's mail.
 * @param  {String} req.body.name User's name.
 * @param  {String} req.body.subject Mail's subject.
 * @param  {String} req.body.content A content wich can content anything.
 * @param  {String} req.body.lng User's language.
 * @param  {Object} res The response.
 * @return {Function} Response.
 */
export const postTest = (req, res, next) => {
  const { emailType, mail, name, subject, content, lng } = req.body;
  nodemailer(emailType, mail, name, subject, content, lng, next)
    .then(() => res.status(OK).json({ success: true }))
    .catch(err => res.status(INTERNAL_SERVER_ERROR).json(err));
};
