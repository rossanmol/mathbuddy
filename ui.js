function evaluateExpression(isSilent = true) {
  const lastText = document.getElementById("result").value;
  const errorMessage = document.getElementById("calculator-error");

  // extractVaues will convert an expression such as (2+3)+2 to [[2, "+", "3"], "+", 2]
  // this will allow us to understand human written expression in a way that we can evaluate it easier
  const values = extractValues(
    lastText,
    lastText.length ? parseFloat(lastText) : 0
  );

  try {
    if (operators.includes(values[values.length - 1])) {
      throw new Error("Invalid expression");
    }
    // evalExpression will take the array of values and evaluate the expression
    const answer = evalExpression(values);

    // If evalExpression doesn't throw an error, we can hide the error message
    errorMessage.style.display = "none";
    if (!isSilent) {
      document.getElementById("result").value = answer;
    }
    return answer;
  } catch (error) {
    // If evalExpression throws an error, we can show the error message
    errorMessage.style.display = "block";
  }
}

async function generateRandomNumber() {
  const x = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain"
  );

  const text = await x.text();
  document.getElementById("result").value = text;
}

function addToScreen(value) {
  const currentValue = document.getElementById("result").value;
  if (currentValue === "0") {
    result.value = value;
    evaluateExpression();
    return;
  }

  result.value += value;
  evaluateExpression();
}

function clearScreen() {
  document.getElementById("result").value = "0";
  evaluateExpression();
}

function addFunction(fnName) {
  const value = prompt(`Give me a number for ${fnName}`);
  const number = parseFloat(value);

  if (isNaN(number)) {
    return;
  }

  addToScreen(`${fnName}(${number})`);
}
