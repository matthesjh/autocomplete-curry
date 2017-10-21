'use babel';

import completions from '../data/completions';

class CurryProvider {
  constructor() {
    this.scopeSelector = '.source.curry';
    this.disableForScopeSelector = '.source.curry .comment';

    this.suggestionPriority = 2;
    this.filterSuggestions = true;

    this.acpTypes = new Map([['types', 'type'], ['constructors', 'tag'], ['functions', 'function']]);
  }

  getSuggestions() {
    const suggestions = [];

    for (const module of completions) {
      for (const [key, type] of this.acpTypes) {
        const createSugg = this.createSuggestion.bind(null, module.name, type);

        const matches = module[key].map(createSugg);

        suggestions.push(...matches);
      }
    }

    return suggestions;
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

export default new CurryProvider();