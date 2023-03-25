const operators = ["+", "-", "*", "/"];
const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

// simple convertor from user's `sin/cos/tan` to Math.sin/Math.cos/Math.tan :P
const trigFunctions = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
};

// give it two numbers, and an operator, it will give you the result
function applyOperator(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

// Based on Shunting Yard Algorithm https://en.wikipedia.org/wiki/Shunting-yard_algorithm
function evalExpression(tokens) {
  if (tokens.length === 1 && !Array.isArray(tokens[0])) {
    const trigFnValue = parseTrigFunction(tokens[0]);
    if (trigFnValue !== null) {
      return trigFnValue;
    }
    return parseFloat(tokens[0]);
  }

  let minPrecedence = Infinity;
  let minPrecedenceIndex = -1;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (Array.isArray(token)) {
      tokens[i] = evalExpression(token);
    } else if (operators.includes(token) && precedence[token] < minPrecedence) {
      minPrecedence = precedence[token];
      minPrecedenceIndex = i;
    }
  }

  if (minPrecedenceIndex !== -1) {
    const left = tokens.slice(0, minPrecedenceIndex);
    const right = tokens.slice(minPrecedenceIndex + 1);
    const operator = tokens[minPrecedenceIndex];

    return applyOperator(operator, evalExpression(left), evalExpression(right));
  }

  throw new Error(`Unable to evaluate expression: ${tokens}`);
}

function parseTrigFunction(token) {
  if (typeof token !== "string") {
    return null;
  }

  for (const fnName in trigFunctions) {
    if (token.startsWith(fnName + "(") && token.endsWith(")")) {
      const arg = parseFloat(
        token.substring(fnName.length + 1, token.length - 1)
      );
      return trigFunctions[fnName](arg);
    }
  }
  return null;
}
