/**
 * @module tests/users
 * This part checks the users' routes.
 */
import request from 'supertest';
import { OK, NOT_FOUND, BAD_REQUEST } from 'http-status';
import { expect } from 'chai';
import { forEach, omit } from 'lodash';
import { decode } from 'ent';

let app;

/**
 * Set the app.
 * @return { Void }
 */
function setApp(ap) {
  app = ap;
}

/**
 * Launch the test for the test.route.
 * @return { Void } Start the test.
 */
function test() {
  // START GET TESTS
  describe('## GET /mailer/users/get - 200', () =>
    it('should return OK & success: true', () => request(app)
      .get('/mailer/users/get')
      .expect(OK)
      .then(res => expect(res.text).to.equal(JSON.stringify({ success: true })))));

  describe('# GET /mailer/users/404 - 404', () =>
    it('should return error 404', () => request(app)
      .get('/mailer/users/404')
      .expect(NOT_FOUND)));

  /**
   * The templates' list.
   * @type { Array }
   */
  const TEMPLATES = [
    'deleteAccount',
    'editMail',
    'editPassword',
    'forgetPassword',
    'register'
  ];

  /**
   * Build a request.
   * @type { constructor }
   */
  const req = template => ({
    emailType: `users.${template}`,
    mail: 'test@test.com',
    name: 'batman',
    subject: template,
    content: {
      link: {
        path: 'path/of/link',
        title: 'TITLE OF LINK'
      }
    },
    lng: 'FR'
  });

  /**
   * Test a req to /mailer/users/post with the good params.
   * @param { Object } body The req body
   * @param { String } body.emailType The same as the template type
   * @param { String } body.mail User's email
   * @param { String } body.name User's name
   * @param { String } body.subject The mail subject
   * @param { Object } body.content An object wich can content any think.
   * @param { Object } body.lng User's language
   * @return { Void } We expect a OK status and a JSON response like: { success: true }
   */
  const testRightBody = body => it(`Template ${body.subject} should return OK & success: true`,
    () => request(app)
      .post('/mailer/users/post')
      .send(body)
      .expect(OK)
      .then(res => expect(res.text).to.equal(JSON.stringify({ success: true }))));

  // With optional & required params.
  describe('# POST /mailer/users/post with right params - 200', () =>
    forEach(TEMPLATES, tplName => testRightBody(req(tplName))));

  // test a wrong URL
  describe('# POST /mailer/users/post - 404', () =>
    it('should return error 404', () => request(app)
      .post('/mailer/wrong/post')
      .expect(NOT_FOUND)));


  /**
   * Test a req to /mailer/users/post without a required params.
   * For each each body's attribute, we omit a required attribute.
   * @param { Object } body The req body
   * @param { String } body.emailType The same as the template type
   * @param { String } body.mail User's email
   * @param { String } body.name User's name
   * @param { String } body.subject The mail subject
   * @param { Object } body.content An object wich can content any think.
   * @param { Object } body.lng User's language
   * @return { Void } We expect a BAD_REQUEST status and a response like: "${key}" is required
   */
  const testMissingRequiredParam = body => forEach(body, (val, key) =>
    it(`Template ${body.subject} should return error 400 - ${key} is required`, () => request(app)
      .post('/mailer/users/post')
      .send(omit(body, key))
      .expect(BAD_REQUEST)
      .then(res => expect(JSON.parse(decode(res.text)).errors[0].messages[0])
        .to.equal(`"${key}" is required`))));

  // Foreach template we test missing params.
  describe('# POST /mailer/users/post - 400', () =>
    forEach(TEMPLATES, tplName => testMissingRequiredParam(req(tplName))));
}

export default { test, setApp };
