let display = document.getElementById('total')
let categoryPreviousInput = ''
let categoryCurrentInput = ''
let operatorStorage = ''
let operatorCount = 0
let numberPrevious = []
let numberCurrent = []
let numberMemory = 0

const numberButtons = document.getElementsByTagName('button').length

for (let i = 0; i < numberButtons; i++) {
  if (!(isNaN(Number(document.getElementsByTagName('button')[i].textContent)))) {
    document.getElementsByTagName('button')[i].addEventListener('click', () =>{
      categoryCurrentInput = 'Number'
      clickedIcon(document.getElementsByTagName('button')[i].id)
    })
  } else {
    document.getElementsByTagName('button')[i].addEventListener('click', () => {
      switch (document.getElementsByTagName('button')[i].textContent) {
        case "*":
          categoryCurrentInput = "Operator";
          operatorStorage = "Multiply";
          break;
        case "/":
          categoryCurrentInput = "Operator";
          operatorStorage = "Divide";
          break;
        case "+":
          categoryCurrentInput = "Operator";
          operatorStorage = "Add";
          break;
        case "-":
          categoryCurrentInput = "Operator";
          operatorStorage = "Subtract";
          break;
        case "Submit":
          categoryCurrentInput = "Function";
          break;
        case ".":
          categoryCurrentInput = "Number";
          break;
        case "Clear":
          categoryCurrentInput = "Function";
        default:
          break;
      }
      clickedIcon(document.getElementsByTagName('button')[i].id)
    })
  }
}

function clickedIcon(elementID) {
  if (categoryPreviousInput == "" && categoryCurrentInput == "Number") {
    numberCurrent += (elementID)
    categoryPreviousInput = "Number"

  } else if (categoryPreviousInput == "Number" && categoryCurrentInput == "Number") {
    numberCurrent += (elementID)

  } else if (categoryPreviousInput == "Operator" && categoryCurrentInput == "Number") {
    categoryPreviousInput = "Number"
    console.log('operator => number')
    console.log(operatorCount)
    numberCurrent = elementID
    if (operatorCount == 0) {
      //First Operator
      console.log("First")
      operatorCount += 1
      // display.textContent = []

      } else {
        //Second Operator
        console.log("Second")
        switch (operatorStorage) {
          case "Multiply":
            console.log(operatorStorage);
            break;
          case "Divide":
            console.log(operatorStorage);
            break;
          case "Add":
            // numberCurrent = numberCurrent + numberPrevious
            console.log(operatorStorage);
            break;
          case "Subtract":
            console.log(operatorStorage);
            break;
        }
      }
    
  
  } else if (categoryPreviousInput == "Function" && categoryCurrentInput == "Number") {

  } else if (categoryPreviousInput == "" && categoryCurrentInput == "Operator") {
    categoryPreviousInput = "Operator"

  } else if (categoryPreviousInput == "Number" && categoryCurrentInput == "Operator") {
    categoryPreviousInput = "Operator"
    
    
    
    numberCurrent = Number(numberCurrent) + Number(numberPrevious)
    display.textContent = numberCurrent
    numberPrevious = numberCurrent
    numberCurrent = []
    
  } else if (categoryPreviousInput == "Operator" && categoryCurrentInput == "Operator") {
    display.textContent = numberPrevious
    
  } else if (categoryPreviousInput == "Function" && categoryCurrentInput == "Operator") {
    
  } else if (categoryPreviousInput == "" && categoryCurrentInput == "Function") {
    categoryPreviousInput = "Function"

  } else if (categoryPreviousInput == "Number" && categoryCurrentInput == "Function") {
    categoryPreviousInput = "Function"
    
  } else if (categoryPreviousInput == "Operator" && categoryCurrentInput == "Function") {
    categoryPreviousInput = "Function"
    
  } else if (categoryPreviousInput == "Function" && categoryCurrentInput == "Function") {
    
  }

  
  console.log(`Current = ${numberCurrent}`)
  console.log(`Previous = ${numberPrevious}`)
  console.log(`Operator = ${operatorStorage}`)

  display.textContent += document.getElementById(elementID).textContent
}

function renderDisplay() {

}

function clearDisplay() {
  display.textContent = ""
}