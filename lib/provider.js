'use babel';

import completions from '../data/completions';

class Provider {
  constructor() {
    this.selector = '.source.curry';
    this.disableForSelector = '.source.curry .comment';
    this.suggestionPriority = 2;

    this.acpTypes = new Map([['types', 'type'], ['constructors', 'tag'], ['functions', 'function']]);
  }

  getSuggestions({prefix}) {
    if (prefix.length >= 2) {
      return this.getMatchingSuggestions(prefix);
    }
  }

  getMatchingSuggestions(prefix) {
    const prefixLower = prefix.toLowerCase();
    const suggestions = [];

    for (const module of completions) {
      for (const [key, type] of this.acpTypes) {
        const createSugg = this.createSuggestion.bind(null, module.name, type);

        const matches = module[key].filter(suggestion => {
          return suggestion.name.toLowerCase().startsWith(prefixLower);
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