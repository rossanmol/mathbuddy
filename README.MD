## MathBuddy

Hey! I have created this project that allows a user to use simple operations in calculator.
Project available via: https://mathbuddy-pied.vercel.app/

### Features:

- Responsive, available on most devices
- Supports addition, subtraction, division and multiplication
- Can add numbers, but also the results of sin(x), tan(x), cos(x).
- A button which generates a number from 1 to 100, just in case you are not creative ;)
- Deep operations such as (2+3) / 3 or even (2 + (3 _ 5) / 3 _ (2 - 3)) work!
- Validation for whatever is entered.
- History of last 5 operations.
- Recursive operations.
- Zero dependencies!

### Known Limitations:

- sin(x), tan(x), cos(x) supports numbers only within input, therefore something like sin(2 + 5), will not work.
- History of operations clears on refresh, this could be improved by using local/session storage.

### How to use

This application, is a static implementation and does not require a server to run.
To run the application just open `index.html` file, or navigate to https://mathbuddy-pied.vercel.app/

- Input a mathematical expression using the on-screen buttons or your keyboard.
- The expression will be validated on every keypress.
- If the expression is valid, the result will be displayed immediately.
- If the expression is invalid, an error message will be shown.
- The last 5 expressions and their results will be displayed in history.

### Assumptions

Please refer to the ASSUMPTIONS.md file for a list of assumptions made during the implementation of this project.
