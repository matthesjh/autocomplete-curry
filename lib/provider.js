'use babel';

import suggestions from '../data/completions';

class Provider {
  constructor() {
    this.selector = '.source.curry';
    this.disableForSelector = '.source.curry .comment';
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
      let nameLower = suggestion.name.toLowerCase();
      return nameLower.startsWith(prefixLower);
    });

    return matchingSuggestions.map(this.createSuggestion);
  }

  createSuggestion(suggestion) {
    return {
      text: suggestion.name,
      description: suggestion.description,
      type: suggestion.type,
      leftLabel: suggestion.module,
      rightLabel: suggestion['type-sig']
    };
  }
}

export default new Provider();