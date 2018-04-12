'use strict';

module.exports = {
  name: 'ember-textcomplete',

  included: function(app) {
    this._super.included(app);
    app.import('node_modules/textcomplete/lib/index.js',{using: [
      { transformation: 'cjs', as: 'textcomplete' }
    ]}
);
  }
};
