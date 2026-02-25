import { getDictionarySize } from "./common.mjs";
import words from "./words.json" with { type: "json" };
import { buildDictionary, findMisspellings } from "./spellcheck.mjs";

const wordSize = document.getElementById("dictSize");
const textInput = document.getElementById("textInput");
const resultsDiv = document.getElementById("results");
const checkBtn = document.getElementById("checkBtn");

const dictionary = buildDictionary(words);
const userDictionary = new Set();

window.onload = function () {
  wordSize.textContent = getDictionarySize();
};

textInput.addEventListener("input", () => {
  resultsDiv.innerHTML = "";
});

checkBtn.addEventListener("click", () => {
  const mistakes = findMisspellings(textInput.value, dictionary, userDictionary);
  showResults(mistakes);
});

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

      const again = findMisspellings(textInput.value, dictionary, userDictionary);
      showResults(again);
    });

    li.appendChild(span);
    li.appendChild(addBtn);
    ul.appendChild(li);
  }

  resultsDiv.appendChild(message);
  resultsDiv.appendChild(ul);
}