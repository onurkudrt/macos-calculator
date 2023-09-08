/*
 * ONUR KUDRET
 * MacOS Widget Scripts
 * 
*/

const screenText = document.getElementById("screen-text");
const buttons = document.getElementsByClassName('btn');
const operationScreen = document.getElementById("operation-screen");

let operations = [];
let operationIndex = 0, numberIndex = 0;
let numbers = [];

window.onload = function initialization()
{
    for(let i=0;i<buttons.length;i+=1)
        buttons[i].addEventListener("click",buttonClick);
}

const buttonClick = (key)=>{
    switch(key.target.className)
    {
        case 'btn numbers' :
            numberButtons(key.target.id);
            break;
        case 'btn operation-2' :
            op_2_buttons(key.target.id);
            break;
        case 'btn operation-1' :
            op_1_buttons(key.target.id);
            break;
    }
};

const numberButtons = (id)=>
{
    editTextScreen(id[id.length-1],1);
};

const op_1_buttons = (id)=>{
    switch(id)
    {
        case 'buttonCLEAR':
            resetScreen();
            break;
        case 'buttonSIGN':
            editTextScreen(changeSign(screenText.innerHTML),0);
            break;
        case 'buttonPER':
            editOperationScreen('%');
            break;
    }
}; 

const op_2_buttons = (id)=>{
    switch(id)
    {
        case 'buttonDIV':
            editOperationScreen('÷');
            break;
        case 'buttonMUL':
            editOperationScreen('x');
            break;
        case 'buttonSUB':
            editOperationScreen('-');
            break;
        case 'buttonPLUS':
            editOperationScreen('+');
            break;
        case 'buttonEQ':
            editOperationScreen('=');
            let result = priorityCalculator();
            writeResultToOperationScreen(result);
            editTextScreen(result,0);
            break;
    }
};

const editTextScreen = (data,mode)=>{
        screenText.innerHTML =  mode == 1 ? checkFirstData(screenText.innerHTML,data) : data;
};

const writeResultToOperationScreen = (data)=>{
    operationScreen.innerHTML += ' ' + data;
};


const checkFirstData = (existData, newData)=>{
    const firstData = existData[0];
    return !(firstData>0 && firstData<10) ? newData : existData+newData;
}

const changeSign = (data)=>{
    if(!(data[0] > 0 && data[0] <10))
        return data;
    let result = data[0] === '-' ? data.slice(1,data.length) : '-' + data;
    numbers[numberIndex] = result;
    return result;
};

const editOperationScreen = (data)=>{
    if(!(screenText.innerHTML[0] > 0 && screenText.innerHTML[0] < 10))
    {
        operationScreen.innerHTML = operationScreen.innerHTML.slice(0,operationScreen.innerHTML.length-2) +data + ' ';
        operations[operationIndex++] = data;
    }
    else
    {
        operationScreen.innerHTML += screenText.innerHTML + ' ' + data + ' ';
        numbers[numberIndex++] = parseFloat(screenText.innerHTML);
        console.log(parseFloat(screenText.innerHTML));
        operations[operationIndex++] = data;
    }
        
    editTextScreen(data,0);
}

const write = ()=>{
    let i;
    let temp = "";
    for(i = 0;i<(numbers.length<operations.length ? numbers.length : operations.length);i++)
        {
            temp+= numbers[i] + operations[i];
        }
        console.log(temp);
};

const priorityCalculator = ()=>{
    let result;
    for(let i = 0;i<operationIndex;i+=1)
        if(operations[i] === '÷' || operations[i] === 'x')
        {
            result = operationSensor(operations[i],numbers[i],numbers[i+1]);
            numbers[i] = result;
            arrayShifter(operations,i);
            arrayShifter(numbers,i+1);
            operationIndex-=1;
            numberIndex-=1;
        }
    for(let i = 0; i<operationIndex;i+=1)
    {
        result = operationSensor(operations[i],numbers[i],numbers[i+1]);
        numbers[i] = result;
        arrayShifter(operations,i);
        arrayShifter(numbers,i+1);
        operationIndex-=1;
        numberIndex-=1;
    }
    return numbers[0];
};

const operationSensor =  (data, operation1, operation2)=>{
        switch(data)
        {
            case '+':
                return operation1+operation2;
            case '-':
                return operation1-operation2;
            case 'x':
                return operation1*operation2;
            case '÷':
                return operation1/operation2;
        }
};

const arrayShifter = (array, index)=>{
    for(let i=index; i<array.length;i++)
    {
            array[i] = array[i+1];
    }
    array.pop();
};

const resetScreen = ()=>{
    operationScreen.innerHTML = '';
    screenText.innerHTML = 0;
    numbers.length = 0;
    operations.length = 0;
    operationIndex = 0;
    numberIndex = 0;
}