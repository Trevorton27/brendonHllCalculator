let display = document.getElementById('total')
let categoryPreviousInput = ''
let categoryCurrentInput = ''
let operatorCurrent = ''
let operatorPrevious = null
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
          operatorCurrent = "Multiply";
          break;
        case "/":
          categoryCurrentInput = "Operator";
          operatorCurrent = "Divide";
          break;
        case "+":
          categoryCurrentInput = "Operator";
          operatorCurrent = "Add";
          break;
        case "-":
          categoryCurrentInput = "Operator";
          operatorCurrent = "Subtract";
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
  console.log(`1 Current = ${numberCurrent}`)
  console.log(`1 Previous = ${numberPrevious}`)
  console.log(`1 Operator = ${operatorCurrent}`)
  if (categoryPreviousInput == "" && categoryCurrentInput == "Number") {
    numberCurrent += (elementID)
    categoryPreviousInput = "Number"
    console.log(`2-N Current = ${numberCurrent}`)
    console.log(`2-N Previous = ${numberPrevious}`)
    console.log(`2-N Operator = ${operatorCurrent}`)

  } else if (categoryPreviousInput == "Number" && categoryCurrentInput == "Number") {
    numberCurrent += (elementID)
    console.log(`2NN Current = ${numberCurrent}`)
    console.log(`2NN Previous = ${numberPrevious}`)
    console.log(`2NN Operator = ${operatorCurrent}`)

  } else if (categoryPreviousInput == "Operator" && categoryCurrentInput == "Number") {
    categoryPreviousInput = "Number"
    numberCurrent = elementID
    console.log(`2ON Current = ${numberCurrent}`)
    console.log(`2ON Previous = ${numberPrevious}`)
    console.log(`2ON Operator = ${operatorCurrent}`)
    
  
  } else if (categoryPreviousInput == "Function" && categoryCurrentInput == "Number") {
    console.log(`2FN Current = ${numberCurrent}`)
    console.log(`2FN Previous = ${numberPrevious}`)
    console.log(`2FN Operator = ${operatorCurrent}`)

  } else if (categoryPreviousInput == "" && categoryCurrentInput == "Operator") {
    categoryPreviousInput = "Operator"
    console.log(`2-O Current = ${numberCurrent}`)
    console.log(`2-O Previous = ${numberPrevious}`)
    console.log(`2-O Operator = ${operatorCurrent}`)

  } else if (categoryPreviousInput == "Number" && categoryCurrentInput == "Operator") {
    categoryPreviousInput = "Operator"
    console.log(`Operator1: ${operatorPrevious} : ${operatorCurrent}`)
    switch (operatorPrevious) {
      case "Multiply":
        console.log("M")
        operatorPrevious = operatorCurrent
        numberCurrent = Number(numberPrevious) * Number(numberCurrent);
        break;
      case "Divide":
        console.log("D")
        operatorPrevious = operatorCurrent
        numberCurrent =  Number(numberPrevious) / Number(numberCurrent);
        break;
      case "Subtract":
        console.log("S")
        operatorPrevious = operatorCurrent
        numberCurrent = Number(numberPrevious) - Number(numberCurrent);
        break;
      case "Add":
        console.log("A")
        operatorPrevious = operatorCurrent
        numberCurrent = Number(numberPrevious) + Number(numberCurrent);
        break;
    }
    operatorPrevious == null ? operatorPrevious = operatorCurrent : operatorPrevious
    console.log(`Operator2: ${operatorPrevious} : ${operatorCurrent}`)
    display.textContent = numberCurrent
    numberPrevious = numberCurrent
    numberCurrent = []
    console.log(`2NO Current = ${numberCurrent}`)
    console.log(`2NO Previous = ${numberPrevious}`)
    console.log(`2NO Operator = ${operatorCurrent}`)
    
  } else if (categoryPreviousInput == "Operator" && categoryCurrentInput == "Operator") {
    display.textContent = numberPrevious
    console.log(`2OO Current = ${numberCurrent}`)
    console.log(`2OO Previous = ${numberPrevious}`)
    console.log(`2OO Operator = ${operatorCurrent}`)
    
  } else if (categoryPreviousInput == "Function" && categoryCurrentInput == "Operator") {
    console.log(`2FO Current = ${numberCurrent}`)
    console.log(`2FO Previous = ${numberPrevious}`)
    console.log(`2FO Operator = ${operatorCurrent}`)
    
  } else if (categoryPreviousInput == "" && categoryCurrentInput == "Function") {
    categoryPreviousInput = "Function"
    console.log(`2-F Current = ${numberCurrent}`)
    console.log(`2-F Previous = ${numberPrevious}`)
    console.log(`2-F Operator = ${operatorCurrent}`)

  } else if (categoryPreviousInput == "Number" && categoryCurrentInput == "Function") {
    categoryPreviousInput = "Function"
    console.log(`2NF Current = ${numberCurrent}`)
    console.log(`2NF Previous = ${numberPrevious}`)
    console.log(`2NF Operator = ${operatorCurrent}`)
    
  } else if (categoryPreviousInput == "Operator" && categoryCurrentInput == "Function") {
    categoryPreviousInput = "Function"
    console.log(`2OF Current = ${numberCurrent}`)
    console.log(`2OF Previous = ${numberPrevious}`)
    console.log(`2OF Operator = ${operatorCurrent}`)
    
  } else if (categoryPreviousInput == "Function" && categoryCurrentInput == "Function") {
    console.log(`2FF Current = ${numberCurrent}`)
    console.log(`2FF Previous = ${numberPrevious}`)
    console.log(`2FF Operator = ${operatorCurrent}`)
  }

  
  console.log(`3 Current = ${numberCurrent}`)
  console.log(`3 Previous = ${numberPrevious}`)
  console.log(`3 Operator = ${operatorCurrent}`)

  display.textContent += document.getElementById(elementID).textContent
}

function renderDisplay() {

}

function clearDisplay() {
  display.textContent = ""
}