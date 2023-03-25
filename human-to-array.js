// sum is required in case of expressions like "+2"
// where users assums that the expression is evaluated from the last result
function parseTerms(terms, sum = 0) {
  const values = [];

  for (let i = 0; i < terms.length; i++) {
    const term = terms[i];

    if (term === "(") {
      const closingIndex = findClosingParenthesis(terms, i);
      const subExpression = terms.slice(i + 1, closingIndex);
      const parsedSubExpression = parseTerms(subExpression);
      values.push(parsedSubExpression);
      i = closingIndex;
    } else {
      values.push(term);
    }
  }

  if (operators.includes(values[0])) {
    values.unshift(sum);
  }
  return values;
}

// this accouns for the possibility of having inner paranthesis
function findClosingParenthesis(terms, openIndex) {
  let count = 1;
  for (let i = openIndex + 1; i < terms.length; i++) {
    if (terms[i] === "(") {
      count++;
    } else if (terms[i] === ")") {
      count--;
    }

    if (count === 0) {
      return i;
    }
  }
  throw new Error("No matching closing parenthesis found");
}

function extractValues(expression, sum = 0) {
  // regex, that diferentiates operators, parantheis, and values such as: 5, 20.5, sin(5), cos(3)
  // it has a fault, where it will accept a value such as abc(20)
  // I thought that's fine, however it is an improvement point
  const termRegex = /(\d+(\.\d+)?|[+\-*/()]|[a-z]+\([^)]+\))/gi;
  const terms = [...expression.matchAll(termRegex)].map((term) => term[0]);
  console.log(terms);
  return parseTerms(terms, sum);
}
