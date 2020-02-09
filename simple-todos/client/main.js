import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';

Vue.use(VueMeteorTracker);

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.vue';

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});
