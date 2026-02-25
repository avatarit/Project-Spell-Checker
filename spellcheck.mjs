export function buildDictionary(wordsArray) {
    const dictionary = new Set();
    for (let i = 0; i < wordsArray.length; i++) {
      dictionary.add(wordsArray[i].toLowerCase());
    }
    return dictionary;
  }
  
  export function stripPunctuationEdges(word) {
    return word
      .replace(/^[,.?!":;]+/, "")
      .replace(/[,.?!":;]+$/, "");
  }
  
  export function splitIntoWords(text) {
    if (!text) return [];
  
    const result = [];
    const parts = text.split(/\s+/);
  
    for (let word of parts) {
      const pieces = word.split("-");
  
      for (let piece of pieces) {
        const cleaned = stripPunctuationEdges(piece);
        if (cleaned) {
          result.push(cleaned);
        }
      }
    }
  
    return result;
  }
  
  export function findMisspellings(text, dictionary, userDictionary) {
    const list = splitIntoWords(text);
    const mistakes = [];
  
    for (let i = 0; i < list.length; i++) {
      const word = list[i];
  
      if (/^[A-Z]/.test(word)) {
        continue;
      }
  
      const lower = word.toLowerCase();
  
      if (!dictionary.has(lower) && !userDictionary.has(lower)) {
        if (!mistakes.includes(lower)) {
          mistakes.push(lower);
        }
      }
    }
  
    return mistakes;
  }