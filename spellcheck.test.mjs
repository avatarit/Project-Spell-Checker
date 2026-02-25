import assert from "node:assert";
import test from "node:test";
import words from "./words.json" with { type: "json" };
import { buildDictionary, findMisspellings } from "./spellcheck.mjs";

test("findMisspellings handles punctuation, hyphen, and proper nouns", () => {
  const dictionary = buildDictionary(words);
  const userDictionary = new Set();

  const text = 'make a cake, please red-orange fire I love Glasgow feisty-cat';
  const mistakes = findMisspellings(text, dictionary, userDictionary);

  assert.deepStrictEqual(mistakes, ["feisty"]);
});