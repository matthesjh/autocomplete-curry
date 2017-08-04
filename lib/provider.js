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
    const prefixLower = prefix.toLowerCase();
    const matchingSuggestions = suggestions.filter((suggestion) => {
      const nameLower = suggestion.name.toLowerCase();
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