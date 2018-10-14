'use babel';

import completions from '../data/completions';

class CurryProvider {
  constructor() {
    this.scopeSelector = '.source.curry';
    this.disableForScopeSelector = '.source.curry .comment';

    this.suggestionPriority = 2;
    this.filterSuggestions = true;
  }

  createSuggestion(type, label, suggestion) {
    return {
      text: suggestion.name,
      description: suggestion.description,
      descriptionMoreURL: suggestion.docUrl,
      type: type,
      leftLabel: label,
      rightLabel: suggestion.typeSig
    };
  }

  getSuggestions({prefix}) {
    if (!prefix) {
      return null;
    }

    const suggestions = [];

    for (const pkg of completions) {
      for (const module of pkg.modules) {
        suggestions.push(this.createSuggestion('import', pkg.name, module));

        const funcSugg = this.createSuggestion.bind(null, 'function', module.name);
        suggestions.push(...module.functions.map(funcSugg));

        for (const cls of module.typeClasses) {
          suggestions.push(this.createSuggestion('class', module.name, cls));
          suggestions.push(...cls.functions.map(funcSugg));
        }

        const constrSugg = this.createSuggestion.bind(null, 'tag', module.name);

        for (const tys of module.types) {
          suggestions.push(this.createSuggestion('type', module.name, tys));
          suggestions.push(...tys.constructors.map(constrSugg));
        }
      }
    }

    return suggestions;
  }
}

export default new CurryProvider();