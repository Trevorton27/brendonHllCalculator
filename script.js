const Calculator = {
  numberFirst: null,
  operatorFirst: null,
  numberSecond: null,
  operatorSecond: null,
  numberMemory: null
};

function Main(event) {
  event.preventDefault();
  populateCalculatorVariables(this);
  renderDisplay();
}

function returnDomValues(array, callback, scope) {
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
}

const myNodeList = document.querySelectorAll('button');

returnDomValues(myNodeList, function (index, value) {
  document.getElementById(value.id).addEventListener('click', Main);
});

renderDisplay();

function populateCalculatorVariables(element) {
  if (
    (Calculator.numberFirst == null || Calculator.operatorFirst == 'Submit') &&
    element.className == 'Number'
  ) {
    Calculator.numberFirst = element.value;
  } else if (
    element.className == 'Number' &&
    typeof Calculator.numberFirst == 'string'
  ) {
    if (
      !(
        Calculator.numberFirst.split('.').length >= 2 == true &&
        element.id == '.'
      )
    ) {
      Calculator.numberFirst += element.value;
    }
  } else if (element.className == 'Operator') {
    if (
      Calculator.numberFirst == null &&
      Calculator.operatorFirst != null &&
      Calculator.numberSecond != null
    ) {
      Calculator.operatorFirst = element.id;
    } else if (
      !(Calculator.numberFirst == null && Calculator.numberSecond == null)
    ) {
      Calculator.operatorSecond = Calculator.operatorFirst;
      if (
        Calculator.numberFirst != null &&
        Calculator.numberSecond != null &&
        Calculator.operatorSecond != null
      ) {
        runCalculation(Calculator.operatorSecond);
      } else {
        Calculator.numberSecond = Calculator.numberFirst;
      }
      Calculator.numberFirst = null;
      Calculator.operatorFirst = element.id;
    }
  } else if (element.className == 'Function') {
    if (element.id == 'Submit') {
      performSubmit();
      Calculator.operatorFirst = 'Submit';
    } else if (element.id == 'ClearCurrent') {
      performClear(false);
    } else if (element.id == 'ClearAll') {
      performClear(true);
    } else if (element.id == 'MPlus') {
      performSubmit();
      Calculator.numberMemory = Calculator.numberFirst;
      performClear(false);
      document.getElementById(
        'Memory'
      ).textContent = `${Calculator.numberMemory} = Memory`;
    } else if (element.id == 'MMinus') {
      Calculator.numberMemory = null;
      document.getElementById('Memory').textContent = '';
    } else if (element.id == 'Negative') {
      Calculator.numberFirst = (Number(Calculator.numberFirst) * -1).toString();
    } else if (element.id == 'MR') {
      Calculator.numberFirst == null
        ? (Calculator.numberFirst = Calculator.numberMemory)
        : (Calculator.numberSecond = Calculator.numberMemory);
      if (
        (Calculator.operatorFirst == null ||
          Calculator.operatorFirst == 'Submit') &&
        Calculator.numberFirst != null &&
        Calculator.numberMemory != null
      ) {
        performClear(false);
        Calculator.numberFirst = Calculator.numberMemory;
        document.getElementById('Total').textContent = Calculator.numberMemory;
      }
    }
  }
}

function renderDisplay() {
  if (
    Calculator.numberFirst == null &&
    Calculator.numberSecond == null &&
    Calculator.operatorFirst == null &&
    Calculator.operatorSecond == null
  ) {
    document.getElementById('Total').textContent = '0';
  } else {
    const displayElement1 =
      Calculator.numberSecond == null
        ? Calculator.numberFirst
        : Calculator.numberSecond;
    const displayElement2 =
      Calculator.numberSecond == null ? '' : Calculator.operatorFirst;
    let displayElement3;
    if (Calculator.numberFirst != null && Calculator.numberSecond == null) {
      displayElement3 = '';
    } else {
      Calculator.numberFirst == null
        ? (displayElement3 = '')
        : Calculator.numberFirst >= 0
        ? (displayElement3 = Calculator.numberFirst)
        : (displayElement3 = `(${Calculator.numberFirst})`);
    }
    document.getElementById(
      'Total'
    ).textContent = `${displayElement1}${displayElement2}${displayElement3}`;
  }
}

function trimDecimalPlace(calculation) {
  console.log('calculation: ', typeof calculation);
  if (calculation.isInteger()) {
    return calculation;
  } else {
    return calculation.toFixed(4);
  }
}

function runCalculation(operator) {
  switch (operator) {
    case '+':
      Calculator.numberSecond = trimDecimalPlace(
        Number(Calculator.numberSecond) + Number(Calculator.numberFirst)
      );
      break;
    case '-':
      Calculator.numberSecond = trimDecimalPlace(
        Number(Calculator.numberSecond) - Number(Calculator.numberFirst)
      );
      break;
    case '*':
      Calculator.numberSecond = trimDecimalPlace(
        Number(Calculator.numberSecond) * Number(Calculator.numberFirst)
      );
      break;
    case '/':
      Calculator.numberSecond = trimDecimalPlace(
        Number(Calculator.numberSecond) / Number(Calculator.numberFirst)
      );
      break;
  }
}

function performClear(isClearAll) {
  if (isClearAll) {
    Calculator.numberMemory = null;
    document.getElementById('Memory').textContent = '';
  }
  Calculator.numberFirst = null;
  Calculator.operatorFirst = null;
  Calculator.numberSecond = null;
  Calculator.operatorSecond = null;
}

function performSubmit() {
  runCalculation(Calculator.operatorFirst);
  Calculator.numberSecond == null
    ? Calculator.numberFirst
    : (Calculator.numberFirst = Calculator.numberSecond);
  Calculator.operatorSecond = null;
  Calculator.operatorFirst = null;
  Calculator.numberSecond = null;
}
