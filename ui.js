function evaluateExpression(isSilent = true) {
  const expression = document.getElementById("expression").value;
  const lastText = document.getElementById("result").innerText;
  const errorMessage = document.getElementById("error-message");

  // extractVaues will convert an expression such as (2+3)+2 to [[2, "+", "3"], "+", 2]
  // this will allow us to understand human written expression in a way that we can evaluate it easier
  const values = extractValues(
    expression,
    lastText.length ? parseFloat(lastText) : 0
  );

  try {
    // evalExpression will take the array of values and evaluate the expression
    const answer = evalExpression(values);

    // If evalExpression doesn't throw an error, we can hide the error message
    errorMessage.style.display = "none";
    if (!isSilent) {
      document.getElementById("result").innerText = answer;
    }
    return answer;
  } catch (error) {
    // If evalExpression throws an error, we can show the error message
    errorMessage.style.display = "block";
  }
}
