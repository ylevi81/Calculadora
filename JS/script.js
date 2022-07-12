const previousOperationText = document.querySelector("#previousOperation");
const currentOperationText = document.querySelector("#currentOperation");
const button = document.querySelectorAll("#buttonsContainer button");

class Calculator {
    constructor(previousOperationText,currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "" ;
    }
    //add digit to calculator screen
    addDigit(digit){
    //checar por ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
        return;
    }

    this.currentOperation = digit
    this.updateScreen()
    }

    //Process all calculator operations
    processOperation(operation){  
    // Check iff current is empty
    if (this.currentOperationText.innerText === "" && operation !== "C"){
        //Change operation
        if (this.previousOperationText.innerText !== ""){
            this.changeOperation(operation);
        }
        return;
    }

    // Get current and previous value
    let operationValue 
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;


    switch(operation){
        case "+":
            operationValue = previous + current
            this.updateScreen(operationValue,operation, current, previous)     
            break;
        case "-":
            operationValue = previous - current
            this.updateScreen(operationValue,operation, current, previous)     
            break;
        case "/":
            operationValue = previous / current
            this.updateScreen(operationValue,operation, current, previous)     
            break;
        case "*":
            operationValue = previous * current
            this.updateScreen(operationValue,operation, current, previous)     
            break;
        case "DEL":
            this.processDelOperator()     
            break;
        case "CE":
            this.processClearCurrentOperator()     
            break;
        case "C":
            this.processClearOperator()     
            break;
        case "=":
            this.processEqualOperator()     
            break;
        default:
            return;        
    }
    }
    //Cange values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    ) {
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check if value is zero if it is just add current value
            if(previous===0) {
                operationValue = current
            }
            ///Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }
    //Change math operation
    changeOperation(operation){

        const mathOperations = ["+", "-", "/", "*"]
        if (!mathOperations.includes(operation)){
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Erase current operations
    processClearCurrentOperator(){
        this.currentOperationText.innerText = ""
    }

    // Cler all operations 
    processClearOperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Process an operation
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation)
    }
}

const calc = new Calculator (previousOperationText, currentOperationText)

button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >=0 || value === "."){
            calc.addDigit(value)
        }
        else {
            calc.processOperation(value);
        }
    })
});