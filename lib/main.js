'use babel';

import curryProvider from './curry-provider';

export default {
  getProvider() {
    return curryProvider;
  }
};