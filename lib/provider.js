'use babel';

import suggestions from '../data/completions';

class Provider {
  constructor() {
    this.selector = '.source.curry';
    this.suggestionPriority = 2;
  }

  getSuggestions({prefix}) {
    if (prefix.length >= 2) {
      return this.getMatchingSuggestions(prefix);
    }
  }

  getMatchingSuggestions(prefix) {
    let prefixLower = prefix.toLowerCase();
    let matchingSuggestions = suggestions.filter((suggestion) => {
      let textLower = suggestion.name.toLowerCase();
      return textLower.startsWith(prefixLower);
    });

    return matchingSuggestions.map(this.inflateSuggestion);
  }

  inflateSuggestion(suggestion) {
    return {
      text: suggestion.name,
      description: suggestion.description,
      type: suggestion.type,
      rightLabel: suggestion.module
    };
  }
}

export default new Provider();