// Operation functions

function add(a, b) {
  let c = a + b;
  return c;
}
function subtract(a, b) {
  let c = a - b;
  return c;
}
function multiply(a, b) {
  let c = a * b;
  return c;
}
function divide(a, b) {
  let c = b == 0 ? "Error /0" : a / b;
  return c;
}

function operate(op, x, y) {
  switch (op) {
    case "+":
      z =  add(x, y);
      return z;
      break;
    case "-":
      z = subtract(x, y);
      return z;
      break;
    case "*":
      z = multiply(x, y);
      return z;
      break;
    case "/":
      z = divide(x, y);
      return z;
      break;
    case "=":
      z = x;
      return z;
  }
}


// Calculator Main Functions

let clearVal = 0;
let displayVal = 0;
let screen = document.querySelector(".display");
screen.textContent = displayVal;

let curVal = "";
let prevVal = "";
let curOp = "";
let prevOp = "";


function enterNumber(e) {
  let input
  if (e.type == "click") {
    input = e.target.firstChild.textContent;
  } else if (e.type == "keydown"){
    input = e.key;
  }
  console.log("inputNum: " + input);
  displayVal = clearVal == 1 ? 0 : displayVal;
  displayVal = displayVal.toString();
  if (displayVal.length < 13 || displayVal.length < 14 && displayVal.indexOf(".") != -1) {
    displayVal = input == "." && displayVal.indexOf(".") != -1 ? displayVal : displayVal += input;
    displayVal = input == "." || input == "0" && displayVal.indexOf(".") != -1 ? displayVal : parseFloat(displayVal);
    clearVal = 0;
  }
  screen.textContent = displayVal;
}


function enterOperator(e) {
  let input;
  if (e.type == "click") {
    input = e.target.firstChild.textContent;
  } else if (e.type == "keydown"){
    input = e.key == "Enter" ? "=": e.key;
  }
  console.log("inputOp: " + input);
  displayVal = parseFloat(displayVal);
  if (curOp == "" && input == "=") {
  } else if (curOp == "") {
    curOp = input;
    curVal = displayVal;
  } else if (curOp != "" && input == "=") {
    prevOp = curOp;
    prevVal = curVal;
    curVal = displayVal;
    let answer = operate(prevOp, prevVal, curVal);
    console.log(prevVal + prevOp + curVal + "=" + answer);
    curVal = answer;
    curOp = ""
    prevVal = ""
    prevOp = ""
    displayVal = curVal
  } else if (curOp != "") {
    prevOp = curOp;
    prevVal = curVal;
    curOp = input;
    curVal = displayVal;
    let answer = operate(prevOp, prevVal, curVal);
    console.log(prevVal + prevOp + curVal + "=" + answer);
    curVal = answer;
    displayVal = curVal
  }
  clearVal = 1;
  displayVal = displayVal.toString();
  if (displayVal.indexOf(".") == -1 && displayVal.indexOf("e") == -1 && displayVal.length > 13) {
    displayVal = parseFloat(displayVal);
    displayVal = displayVal.toExponential(8);
  } else if (displayVal.indexOf(".") != -1 && displayVal.indexOf("e") != -1 && displayVal.length > 14) {
    displayVal = parseFloat(displayVal);
    displayVal = displayVal.toExponential(8);
  } else if (displayVal.indexOf(".") != -1 && displayVal.indexOf("e") == -1 && displayVal.length > 14) {
    let last = displayVal.slice(13, 14);
    last = parseInt(last);
    let over = displayVal.slice(14, 15);
    over = parseInt(over)
    last = over > 4 ? last + 1 : last;
    displayVal = displayVal.slice(0, 13) + last;
  }
  screen.textContent = displayVal;
}


function signSwap() {
  displayVal = displayVal.toString();
  displayVal = displayVal.indexOf("-") == -1 ? "-" + displayVal : displayVal.slice(1);
//  displayVal = parseFloat(displayVal);
  screen.textContent = displayVal;
}


function clearAll() {
  displayVal = 0;
  screen.textContent = displayVal;
  curVal = "";
  prevVal = "";
  curOp = "";
  prevOp = "";
  clearVal = 0;
}


function clearEntry() {
  displayVal = 0;
  screen.textContent = displayVal;
}


function backSpace() {
  displayVal = displayVal.toString();
  displayVal = displayVal.length > 1 ? displayVal.slice(0, displayVal.length -1) : 0;
  screen.textContent = displayVal;
}



// Calculator Event Listeners

let keyNum = document.querySelectorAll(".numKey");
keyNum.forEach((div) => {
  div.addEventListener("click", enterNumber);
});

let keyOp = document.querySelectorAll(".opKey");
keyOp.forEach((div) => {
  div.addEventListener("click", enterOperator);
});

let keySign = document.querySelector(".sign");
keySign.addEventListener("click", signSwap);

let keyClearAll = document.querySelector(".clearAll");
keyClearAll.addEventListener("click", clearAll);

let keyClearEntry = document.querySelector(".clearEntry");
keyClearEntry.addEventListener("click", clearEntry);

let keyDel = document.querySelector(".backSpace");
keyDel.addEventListener("click", backSpace);



// Keyboard Support

function keyPressed(e) {
  let nums = ["48", "49", "50", "51", "52", "53", "54", "55", "56", "57",
   "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "110", "188", "190"];
  let ops = ["106", "107", "109", "111", "173", "191"];
  let key;
  if (`${e.keyCode}` == 8) {
    backSpace();
    key = document.querySelector(".backSpace");
  } else if (`${e.keyCode}` == 46) {
    clearEntry();
    key = document.querySelector(".clearEntry");
  } else if (nums.indexOf(`${e.keyCode}`) != -1) {
    enterNumber(e);
    if (`${e.keyCode}` == 110 || `${e.keyCode}` == 188 || `${e.keyCode}` == 190) {
      key = document.querySelector(".dot");
    }
    for (let i = 0; i < 10; i++) {
      if (`${e.keyCode}` == i + 48 || `${e.keyCode}` == i + 96) {
        key = document.querySelector(`.num${i}`);
      }
    }
  } else if (ops.indexOf(`${e.keyCode}`) != -1) {
    enterOperator(e);
    if (`${e.keyCode}` == 109 || `${e.keyCode}` == 173) {
      key = document.querySelector(".minus");
    } else if (`${e.keyCode}` == 107) {
      key = document.querySelector(".plus");
    } else if (`${e.keyCode}` == 106) {
      key = document.querySelector(".multiply");
    } else if (`${e.keyCode}` == 111 || `${e.keyCode}` == 191) {
      key = document.querySelector(".divide");
    }
  } else if (`${e.keyCode}` == 13 || `${e.keyCode}` == 61) {
    enterOperator(e);
    key = document.querySelector(".enter");
  }
  key.classList.add("clicked");
}

function keyLoose(e) {
  console.log(e);
  let key = document.querySelectorAll("button");
  key.forEach((button) => {
    button.classList.remove("clicked");
  });
}


window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyLoose)




// end
