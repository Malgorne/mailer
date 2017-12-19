/**
 * Configuration's file. It imports & returns all templates' config.
 * @module config/templates
 */

import { assign } from 'lodash';

import usersConfig from './users';

export default assign({}, usersConfig);
