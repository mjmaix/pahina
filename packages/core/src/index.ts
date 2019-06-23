import './setup';

import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';

import * as actions from './actions';
import * as errors from './errors';
import * as models from './models';
import * as validators from './validators';
import * as utils from './utils';

export {
  mutations as gm,
  queries as gq,
  subscriptions as gs,
  actions as coreactions,
  errors as coreErrors,
  models as coreModels,
  validators as coreValidators,
  utils as coreUtils,
};
