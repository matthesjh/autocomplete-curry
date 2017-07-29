'use babel';

class Provider {
  constructor() {
    this.selector = '.source.curry';
  }

  getSuggestions(options) {
    return [];
  }
}

export default new Provider();