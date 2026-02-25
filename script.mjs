// This is a placeholder file which shows how you can access JSON data defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import {getDictionarySize} from "./common.mjs";
import words from "./words.json" with { type: "json" };

const wordSize= document.getElementById("dictSize");
const textInput = document.getElementById("textInput");
const resultsDiv = document.getElementById("results");
const checkBtn = document.getElementById("checkBtn");

const dictionary = new Set();
const userDictionary = new Set();

for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase();
    dictionary.add(w);
  }
  
  window.onload = function () {
    wordSize.textContent = getDictionarySize();
  };
  
  // Clear results when user edits the text
  textInput.addEventListener("input", () => {
    resultsDiv.innerHTML = "";
  });
  
  // Check button
  checkBtn.addEventListener("click", () => {
    const mistakes = findMisspellings(textInput.value);
    showResults(mistakes);
  });
  

  
  function stripPunctuationEdges(word) {
    return word
      .replace(/^[,.?!":;]+/, "")
      .replace(/[,.?!":;]+$/, "");
  }

  function splitIntoWords(text) {
    if (!text) return [];
    const result = [];

    const parts = text.split(/\s+/);
    
  
    for (let word of parts) {
      const pieces = word.split("-");
  
      for (let splittedWord of pieces) {
        const cleaned = stripPunctuationEdges(splittedWord);
        if (cleaned) {
          result.push(cleaned);
        }
      }
    }
  
    return result;
  }



  function findMisspellings(text) {
    const list = splitIntoWords(text);
    const mistakes = [];
  
    for (let i = 0; i < list.length; i++) {
      const word = list[i];
  
      if (/^[A-Z]/.test(word)) {
        continue;      }
  
      const lower = word.toLowerCase();
  
      if (!dictionary.has(lower) && !userDictionary.has(lower)) {
        if (!mistakes.includes(lower)) {
          mistakes.push(lower);
        }
      }
    }
  
    return mistakes;
  }
  
  
  function showResults(mistakes) {
    resultsDiv.innerHTML = "";
  
    if (mistakes.length === 0) return;
  
    const message = document.createElement("p");
    message.textContent = "These words are not in Basic English:";
    message.style.fontWeight = "600";
  
    const ul = document.createElement("ul");
  
    for (let i = 0; i < mistakes.length; i++) {
        const word = mistakes[i];
      
        const li = document.createElement("li");
      
        const span = document.createElement("span");
        span.textContent = word;
        span.style.background = "yellow";
        span.style.display = "inline-block";
        span.style.padding = "2px 6px";
        span.style.borderRadius = "6px";
        span.style.marginRight = "10px";
      
        const addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.textContent = "Add to dictionary";
        addBtn.addEventListener("click", () => {
          userDictionary.add(word);
      
          // re-check immediately
          const again = findMisspellings(textInput.value);
          showResults(again);
        });
      
        li.appendChild(span);
        li.appendChild(addBtn);
        ul.appendChild(li);
      }
  
    resultsDiv.appendChild(message);
    resultsDiv.appendChild(ul);
  }