'use babel';

import completions from '../data/completions';

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
    const tcfTypes = {types: 'type', constructors: 'tag', functions: 'function'};
    const prefixLower = prefix.toLowerCase();

    const suggestions = [];

    for (const module of completions) {
      for (const sel in tcfTypes) {
        const createSugg = this.createSuggestion.bind(null, module.name, tcfTypes[sel]);

        const matches = module[sel].filter(suggestion => {
          const nameLower = suggestion.name.toLowerCase();
          return nameLower.startsWith(prefixLower);
        }).map(createSugg);

        suggestions.push(...matches);
      }
    }

    return suggestions.sort((x, y) => x.text.toLowerCase() >= y.text.toLowerCase() ? 1 : -1);
  }

  createSuggestion(module, type, suggestion) {
    return {
      text: suggestion.name,
      description: suggestion.description,
      type: type,
      leftLabel: module,
      rightLabel: suggestion.typeSig
    };
  }
}

export default new Provider();