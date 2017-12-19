/**
 * Contains the mailer configuration.
 * @module config/nodemailer
 */

import nodemailer from 'nodemailer';
import mockTransport from 'nodemailer-mock-transport';

import { env } from './env';

const transport = env === 'test' ? mockTransport() : {
  service: 'Gmail',
  auth: {
    user: process.env.LOGIN_MAIL || 'test.mailer.benj@gmail.com',
    pass: process.env.PASS_MAIL || 'Fake1234#',
  }
};

/**
 * Exports the config.
 * @name export
 * @property { Object } transport mockTransport in test's environment else, we
 * have the others properties.
 * @property { String } [transport.service] The service to use.
 * @property { Object } [transport.auth] mockTransport in test's environment.
 * @property { String } [transport.auth.user] The mailer login.
 * @property { String } [transport.auth.pass] The mailer password.
 * @property { Object } transporter nodemailer.createTransport.
 */
export default {
  transport,
  transporter: nodemailer.createTransport(transport)
};
