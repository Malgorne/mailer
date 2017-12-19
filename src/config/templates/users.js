/**
 * Contains the config of the users's templates.
 * @module config/templates/users
 */
import path from 'path';
import Joi from 'joi';

import { concat } from 'lodash';

/**
 * Path to the img folder
 */
const IMG_PATH = '../../server/templates/img/';

/**
 * The common attachments like img in the layout.
 */
const commonAttachments = [{
  path: path.join(__dirname, `${IMG_PATH}users.banniere.jpg`),
  cid: 'users.banniere'
}, {
  path: path.join(__dirname, `${IMG_PATH}users.footer.png`),
  cid: 'users.footer'
}];

/**
 * All the templates config.
 * @name export
 * @property { Object }  users is about templates and contains attachements
 * or related filenames.
 * @property { Object }  users.deleteAccount Contains the template's particular config.
 * @property { Object }  users.editMail Contains the template's particular config.
 * @property { Object }  users.editPassword Contains the template's particular config.
 * @property { Object }  users.forgetPassword Contains the template's particular config.
 * @property { Object }  users.register Contains the template's particular config.
 * @property { Object }  validation is about the request validation and contains the
 * required & optional params.
 * @property { String }  validation.body.emailType Type of email to send.
 * @property { String }  validation.body.mail The user's email.
 * @property { String }  validation.body.name The user's name.
 * @property { String }  validation.body.subject The mail subject.
 * @property { Object }  validation.body.content A flexible content.
 * @property { Object }  [validation.body.content.link] A link to validate user's action.
 * @property { String }  [validation.body.content.link.path] The link's path.
 * @property { String }  [validation.body.content.link.title] The link's title.
 * @property { String }  validation.body.lng The user's language.
 */
export default {
  users: {
    deleteAccount: {
      attachments: concat(commonAttachments)
    },
    editMail: {
      attachments: concat(commonAttachments)
    },
    editPassword: {
      attachments: concat(commonAttachments)
    },
    forgetPassword: {
      attachments: concat(commonAttachments)
    },
    register: {
      attachments: concat(commonAttachments)
    }
  },
  validation: {
    body: {
      emailType: Joi.string().required(),
      mail: Joi.string().email().required(),
      name: Joi.string().required(),
      subject: Joi.string().required(),
      content: Joi.object().keys({
        link: {
          path: Joi.string(),
          title: Joi.string()
        }
      }).required(),
      lng: Joi.string().required()
    }
  }
};
