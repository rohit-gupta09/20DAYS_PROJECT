const calculatorDisplay=document.querySelector('h1');
const inputBtn=document.querySelectorAll('button');
const clearBtn=document.getElementById('clear-btn');

let firstvalue=0;
let opertorValue='';
let awaitingNextalue=false; 

function sendNumberValue(number){
    // Replace cuurent display value if first value is entered 

    if(awaitingNextalue){
        calculatorDisplay.textContent=number;
        awaitingNextalue=false; 
    }
    else{
        // if cuurent value is 0, replace it , if not add numbr
        const displayValue=calculatorDisplay.textContent;
        calculatorDisplay.textContent=displayValue === '0'? number : displayValue+number;
    }
}

function addDecimal(){
    //if opertor pressed , don.t add decimal
    if(awaitingNextalue) return;
    // if no decimal,add one 
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`;
    }
}

// calculate first and second value depending on opertor 
const calculate={
    '/':(firstNumber,secondNumber) => firstNumber / secondNumber,

    '*':(firstNumber,secondNumber) => firstNumber * secondNumber,

    '+':(firstNumber,secondNumber) => firstNumber + secondNumber,

    '-':(firstNumber,secondNumber) => firstNumber - secondNumber,

    '=':(firstNumber,secondNumber) => secondNumber,
};

function useOperator(operator){
    const currentValue=Number(calculatorDisplay.textContent);
    //prevent multiple operator
    if(opertorValue && awaitingNextalue) {
        opertorValue=operator;
        return;
    }
    //Assign first value if no value
    if(!firstvalue){
        firstvalue=currentValue;
    }
    else{
        // console.log(firstvalue, opertorValue, currentValue);
        const calculation=calculate[opertorValue](firstvalue,currentValue);
        // console.log(calculation);
        calculatorDisplay.textContent=calculation;
        firstvalue=calculation;
        
    }
    //Ready for next value, store operator
    awaitingNextalue=true;
    opertorValue=operator;
    // console.log("firstvalue ",firstvalue);
    // console.log("opertorValue ",opertorValue);

}

// Ad Event Listeners for numbers , operaotrs and decimal button

inputBtn.forEach((inputBtn)=>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value));
    }
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value));
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal());
    }
    
});

// resrt diplay
function resetAll(){
    firstvalue=0;
    opertorValue='';
    awaitingNextalue=false; 
    calculatorDisplay.textContent='0';
}

// Event Listener Clear button

clearBtn.addEventListener('click',resetAll)