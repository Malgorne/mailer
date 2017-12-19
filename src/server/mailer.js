/**
 * The file in charge to build and send emails
 * @module mailer
 */

import fs from 'fs-extra';
import pug from 'pug';
import { filter, trimEnd, get } from 'lodash';

import { transporter } from '../config/nodemailer';
import configTemplates from '../config/templates';

const TEMPLATES = fs.readdirSync(`${__dirname}/templates/`);

/**
 * Function to send mails.
 * @param {String} to Destination's mail.
 * @param {String} subject Mail's subject.
 * @param {String} attachments Mail's attachments (like img).
 * @param {String} html Mail's content.
 * @return {Function} Returns success or failure.
 */
const _send = (to, subject, attachments, html) => transporter.sendMail({
  to,
  subject,
  html,
  attachments
}, (err, res) => {
  if (err) throw new Error(err);
  return console.log('Mail send - res', res || 'OK'); // if test's env, res is empty
});

/**
 * Build templates.
 * @param {String} template Selected template's name.
 * @param {String} userName User's name.
 * @param {String} content A content wich can content anything.
 * @param {String} lng User's language, like 'FR'.
 * @param {String} userMail User's email.
 * @return {Function} Returns a call to function in charge to send the mail.
 */
const _handler = (template, userName, content, lng, userMail) => {
  const html = pug.renderFile(`${__dirname}/templates/${template}`,
    { userName, content, lng });
  // Builder le title, subject etc avant de _send
  const attachments = get(configTemplates, trimEnd(template, '.pug')).attachments;
  return _send(userMail, template.split('.')[1], attachments, html);
};


/**
 * Select the right template to build.
 * @function default
 * @param {String} emailType Template's name.
 * @param {String} userMail User's email.
 * @param {String} userName User's name.
 * @param {String} subject Mail subject.
 * @param {String} content A content wich can content anything.
 * @param {String} lng User's language.
 * @return {Function} Returns resolve.
 */
export default (emailType, userMail, userName, subject, content, lng) => new Promise((resolve) => {
  const template = filter(TEMPLATES, tplChecked => trimEnd(tplChecked, '.pug') === emailType)[0];
  _handler(template, userName, content, lng, userMail);
  return resolve();
});
