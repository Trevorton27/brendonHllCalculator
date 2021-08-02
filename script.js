let Calculator = {
  numberFirst: null,
  operatorFirst: null,
  numberSecond: null,
  operatorSecond: null,
  numberMemory: null
}

// https://ultimatecourses.com/blog/ditch-the-array-foreach-call-nodelist-hack
// Dynamic (could be used again if other buttons are added via JavaScript)
// Compatible with all browsers
// Doesn't extend existing DOM functionality
// Doesn't blend arrays and NodeLists
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

var myNodeList = document.querySelectorAll('button');
forEach(myNodeList, function (index, value) {
    // "index" on the above line defines the number of times to loop
    // "value" on the above line defines what attribute to extract using the (call) function 
    document.getElementById(value.id).addEventListener('click', Main)
});

function Main(event) {
  event.preventDefault()
  performOperation(this)
  renderDisplay();
} 
renderDisplay()

function performOperation (element) {
  if (Calculator.numberFirst == null && element.className == "Number") {
    Calculator.numberFirst = element.value
  } else if (element.className == "Number") {
    if (!((Calculator.numberFirst.split(".").length >= 2) == true && element.id == ".")) {
      Calculator.numberFirst += element.value
    } 
  } else if (element.className == "Operator") {
    if (Calculator.numberFirst == null && Calculator.operatorFirst != null && Calculator.numberSecond != null) {
      Calculator.operatorFirst = element.id
    } else if (!(Calculator.numberFirst == null && Calculator.numberSecond == null)) {
        Calculator.operatorSecond = Calculator.operatorFirst
        if (Calculator.numberFirst != null && Calculator.numberSecond != null && Calculator.operatorSecond != null) {
          calculateNewNumber(Calculator.operatorSecond);
        } else {Calculator.numberSecond = Calculator.numberFirst}
          Calculator.numberFirst = null;
          Calculator.operatorFirst = element.id
      }
  } else if (element.className == "Function") {
    if (element.id == "Submit") {
      performSubmit();
    } else if (element.id == "ClearCurrent") {
      performClear(false);
    } else if (element.id == "ClearAll") {
      performClear(true);
    } else if (element.id == "MPlus") {
      performSubmit();
      Calculator.numberMemory = Calculator.numberFirst
      performClear(false);
      document.getElementById("Memory").textContent = `Memory = ${Calculator.numberMemory}`;
    } else if (element.id == "MMinus"){
      Calculator.numberMemory = null
      document.getElementById("Memory").textContent = ""
    } else if (element.id == "Negative") {
      Calculator.numberFirst = (Number(Calculator.numberFirst) * -1).toString()
    } else if (element.id == "MR"){
      Calculator.numberFirst == null ? Calculator.numberFirst = Calculator.numberMemory : Calculator.numberSecond = Calculator.numberMemory
      if (Calculator.operatorFirst == null && Calculator.numberFirst != null && Calculator.numberMemory != null) {
        performClear(false);
        Calculator.numberFirst = Calculator.numberMemory
        document.getElementById("Total").textContent = Calculator.numberMemory
      }
    }
  }
}

function renderDisplay() {
  if (Calculator.numberFirst == null && Calculator.numberSecond == null && Calculator.operatorFirst == null && Calculator.operatorSecond == null) {
    document.getElementById('Total').textContent = "0"
  } else {
    var displayElement1 = Calculator.numberSecond == null ? Calculator.numberFirst : Calculator.numberSecond;
    var displayElement2 = Calculator.numberSecond == null ? "" : Calculator.operatorFirst;
    var displayElement3;
    if (Calculator.numberFirst != null && Calculator.numberSecond == null) {
      displayElement3 = "";
    } else { Calculator.numberFirst == null ? displayElement3 = "" : 
    Calculator.numberFirst >= 0 ? displayElement3 = Calculator.numberFirst : displayElement3 = `(${Calculator.numberFirst})`; 
  }
    document.getElementById('Total').textContent = `${displayElement1}${displayElement2}${displayElement3}`;
  }
}

function calculateNewNumber(operator) {
  switch (operator) {
    case "+":
      Calculator.numberSecond = Number(Calculator.numberSecond) + Number(Calculator.numberFirst);
      break;
    case "-":
      Calculator.numberSecond = Number(Calculator.numberSecond) - Number(Calculator.numberFirst);
      break;
    case "*":
      Calculator.numberSecond = Number(Calculator.numberSecond) * Number(Calculator.numberFirst);
      break;
    case "/":
      Calculator.numberSecond = Number(Calculator.numberSecond) / Number(Calculator.numberFirst);
      break;
  }
}

function performClear (isClearAll) {
  if (isClearAll) {
    Calculator.numberMemory = null;
    document.getElementById("Memory").textContent = ""
  } 
  Calculator.numberFirst = null;
  Calculator.operatorFirst = null;
  Calculator.numberSecond = null;
  Calculator.operatorSecond = null;
}

function performSubmit () {
  calculateNewNumber(Calculator.operatorFirst);
  Calculator.numberSecond == null ? Calculator.numberFirst : Calculator.numberFirst = Calculator.numberSecond
  Calculator.operatorSecond = null;
  Calculator.operatorFirst = null;
  Calculator.numberSecond = null;
}