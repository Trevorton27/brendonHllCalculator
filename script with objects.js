let display = document.getElementById('total')
let categoryPreviousInput, categoryCurrentInput, operatorCurrent, operatorPrevious, numberPrevious, numberCurrent
setInitalConditions()

function setInitalConditions() {
  categoryPreviousInput = ''
  categoryCurrentInput = ''
  operatorCurrent = ''
  operatorPrevious = null
  numberPrevious = []
  numberCurrent = []
}



const numberButtons = document.getElementsByTagName('button').length

for (let i = 0; i < numberButtons; i++) {
  if (!(isNaN(Number(document.getElementsByTagName('button')[i].textContent)))) {
    document.getElementsByTagName('button')[i].addEventListener('click', () =>{
      categoryCurrentInput = 'Number'
      clickedIconObjects(document.getElementsByTagName('button')[i].id)
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
          operatorCurrent = "Submit"
          break;
        case ".":
          categoryCurrentInput = "Number";
          break;
        case "Clear":
          categoryCurrentInput = "Function";
          operatorCurrent = "Clear"
          setInitalConditions();
          display.textContent = numberCurrent
        default:
          break;
      }
      clickedIconObjects(document.getElementsByTagName('button')[i].id)
    })
  }
}

function clickedIconObjects (elementID) {

}


function clickedIcon(elementID) {
  console.log(`1 Current = ${numberCurrent}`)
  console.log(`1 Previous = ${numberPrevious}`)
  console.log(`1 Operator *C = ${operatorCurrent}`)
  console.log(`1 Operator *P ${operatorPrevious}`)
  if (categoryPreviousInput == "" && categoryCurrentInput == "Number") {
    numberCurrent += (elementID)
    categoryPreviousInput = "Number"
    display.textContent += document.getElementById(elementID).textContent
    console.log("2-N")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
  } else if (categoryPreviousInput == "Number" && categoryCurrentInput == "Number") {
    numberCurrent += (elementID)
    display.textContent += document.getElementById(elementID).textContent
    console.log("2NN")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
  } else if (categoryPreviousInput == "Operator" && categoryCurrentInput == "Number") {
    categoryPreviousInput = "Number"
    numberCurrent = elementID
    display.textContent += document.getElementById(elementID).textContent
    console.log("2ON")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
  } else if (categoryPreviousInput == "Function" && categoryCurrentInput == "Number") {
    categoryPreviousInput = "Number"
    numberCurrent = numberPrevious += elementID
    numberPrevious = []
    display.textContent = numberCurrent

    console.log("2FN")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)

  } else if (categoryPreviousInput == "" && categoryCurrentInput == "Operator") {
    categoryPreviousInput = "Operator"
    //ODD Maybe throw error?
    
    display.textContent += document.getElementById(elementID).textContent
    console.log("2-O")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
  } else if (categoryPreviousInput == "Number" && categoryCurrentInput == "Operator") {
    console.log("2NO")
    console.log(`1Current = ${numberCurrent}`)
    console.log(`1Previous = ${numberPrevious}`)
    console.log(`1Operator *C = ${operatorCurrent}`)
    console.log(`1Operator *P ${operatorPrevious}`)
    categoryPreviousInput = "Operator"
    executeOperations(operatorPrevious)
    operatorPrevious == null ? operatorPrevious = operatorCurrent : operatorPrevious
    display.textContent = numberCurrent
    numberPrevious = numberCurrent
    numberCurrent = []
    display.textContent += document.getElementById(elementID).textContent
    console.log("2NO")
    console.log(`2Current = ${numberCurrent}`)
    console.log(`2Previous = ${numberPrevious}`)
    console.log(`2Operator *C = ${operatorCurrent}`)
    console.log(`2Operator *P ${operatorPrevious}`)
  } else if (categoryPreviousInput == "Operator" && categoryCurrentInput == "Operator") {
    display.textContent = numberPrevious
    executeOperations(operatorCurrent)
    display.textContent += document.getElementById(elementID).textContent
    console.log("2OO")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
  } else if (categoryPreviousInput == "Function" && categoryCurrentInput == "Operator") {
    categoryPreviousInput = "Operator"    
    display.textContent = numberPrevious
    display.textContent += document.getElementById(elementID).textContent
    operatorPrevious = operatorCurrent
    console.log("2FO")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
  

  } else if (categoryPreviousInput == "" && categoryCurrentInput == "Function") {
    categoryPreviousInput = "Function"
    console.log("2-F")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
    

  } else if (categoryPreviousInput == "Number" && categoryCurrentInput == "Function") {
    categoryPreviousInput = "Function"

    
    if (operatorCurrent == "Submit") {
      console.log(`SUBMIT!! Op Prev: ${operatorPrevious}`)
      executeOperations(operatorPrevious)
    } 
    // else if (operatorCurrent == "Clear") {
    //   console.log("CLEAR!!")
    //   setInitalConditions();
    // }

    display.textContent = numberCurrent
    numberPrevious = numberCurrent
    numberCurrent = []
    console.log("2NF")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
    
  } else if (categoryPreviousInput == "Operator" && categoryCurrentInput == "Function") {
    categoryPreviousInput = "Function"
    console.log("2OF")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
    
  } else if (categoryPreviousInput == "Function" && categoryCurrentInput == "Function") {
    console.log("2FF")
    console.log(`Current = ${numberCurrent}`)
    console.log(`Previous = ${numberPrevious}`)
    console.log(`Operator *C = ${operatorCurrent}`)
    console.log(`Operator *P ${operatorPrevious}`)
  }

  
  console.log(`3 Current = ${numberCurrent}`)
  console.log(`3 Previous = ${numberPrevious}`)
  console.log(`3 Operator = ${operatorCurrent}`)

  // display.textContent += document.getElementById(elementID).textContent
}

function renderDisplay() {

}

function clearDisplay() {
  display.textContent = ""
}

function executeOperations (operatorInput) {
  switch (operatorInput) {
    case "Multiply":
      console.log("M")
      categoryCurrentInput == "Function" ? operatorCurrent = operatorPrevious : operatorPrevious = operatorCurrent 
      numberCurrent = Number(numberPrevious) * Number(numberCurrent);
      break;
    case "Divide":
      console.log("D")
      categoryCurrentInput == "Function" ? operatorCurrent = operatorPrevious : operatorPrevious = operatorCurrent
      numberCurrent =  Number(numberPrevious) / Number(numberCurrent);
      break;
    case "Subtract":
      console.log("S")
      categoryCurrentInput == "Function" ? operatorCurrent = operatorPrevious : operatorPrevious = operatorCurrent
      numberCurrent = Number(numberPrevious) - Number(numberCurrent);
      break;
    case "Add":
      console.log("A")
      categoryCurrentInput == "Function" ? operatorCurrent = operatorPrevious : operatorPrevious = operatorCurrent
      numberCurrent = Number(numberPrevious) + Number(numberCurrent);
      break;
  }
}