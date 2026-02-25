# Testing Spell Checker Project

## Running the project

To verify the project on a fresh machine:

1. Install dependencies  
   npm install

2. Run unit tests  
   npm test

All tests pass successfully.

---

## Accessibility (Lighthouse)

I tested accessibility using Chrome DevTools Lighthouse in Snapshot mode.

Steps:

1. Open DevTools → Lighthouse  
2. Select Accessibility only  
3. Run in Snapshot mode  

I tested the following views:

- Initial page load  
- After spell check with no errors  
- After spell check with misspellings and Add buttons visible  

Result: Lighthouse accessibility score is 100% for all views.

Accessibility measures implemented:

- Proper label associated with the textarea  
- Buttons use `type="button"`  
- Results container uses `aria-live="polite"` to announce updates  
- Clear visible text for all interactive elements  
- Semantic HTML structure (h1, label, button)

---

## Manual verification against rubric

### Text input is present

I implemented a textarea in `index.html` that allows the user to enter multiple sentences.  
I manually verified in the browser that text can be typed and edited.

---

### Spell check trigger exists

I added a "Check spelling" button.  
Clicking the button calls the spell checking logic.

I verified that each click runs a fresh spell check.

---

### Every word is checked against the Basic English dictionary

I implemented `findMisspellings()` which:

- splits text into words  
- removes allowed punctuation from edges  
- splits hyphenated words  
- normalises to lowercase  
- checks membership using a Set  

Manual verification:

- `he go to the island` → no errors  
- `hello world` → both words detected  

Unit tests also verify misspelling detection.

---

### Misspelled words are clearly displayed

When misspellings are detected:

- a message appears under the textarea  
- each word is highlighted  
- each word appears only once  

Manual test:

- `hello hello world` → shows `hello` and `world` once each.

---

### Users can add words to the dictionary

I implemented an in-memory custom dictionary (`userDictionary`).

For each misspelled word:

- an "Add to dictionary" button is shown  
- clicking the button adds the word  
- spell check re-runs immediately  

Manual verification:

1. Type `hello world`  
2. Click Add next to `hello` → only `world` remains  
3. Click Add next to `world` → no errors remain  

Reloading the page resets the custom dictionary (as required).

---

### Warning clears when the user changes the text

I added an `input` event listener on the textarea that clears the results.

Manual verification:

1. Run spell check  
2. Modify the text  
3. Results disappear immediately  

---

### Punctuation handling

I implemented `stripPunctuationEdges()` to remove only leading and trailing punctuation defined in the spec:

`, . ? ! " : ;`

Manual verification:

- `make a cake, please` → cake not flagged  
- `make a cakez, please` → cakez flagged  

Unit tests also cover punctuation behaviour.

---

### Hyphenated words handling

In `splitIntoWords()` I split tokens on `-` and check each part separately.

Manual verification:

- `red-orange fire` → no errors  
- `feisty-cat` → only `feisty` flagged  
- `he like egg-nog` → `like` and `nog` flagged  

---

### Capitalised words treated as correct

In `findMisspellings()` I skip words that begin with a capital letter.

Manual verification:

- `I love Glasgow` → no errors  
- lowercase misspellings are still detected  

---

## Unit tests

Unit tests are implemented and run using:

npm test

The tests cover non-trivial behaviour including:

- misspelling detection  
- punctuation handling  
- hyphen splitting  
- capitalised word rule  

All tests pass successfully.