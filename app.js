var inputs = document.querySelectorAll("input");
var buttons = document.querySelectorAll("button");
var payment = document.querySelector("#payment");
var error1 = document.querySelector("#error1");
var error2 = document.querySelector("#error2");
var error3 = document.querySelector("#error3");
var table = document.querySelector("table");
var nochange = document.querySelector("#nooutput");
var results = document.querySelectorAll(".value");
var changeText=document.querySelector('h5');
var denominations = [1, 5, 10, 20, 100, 500, 2000];

buttons[0].addEventListener("click", () => {
  if (Number(inputs[0].value) > 0) {
    payment.style.display = "flex";
    buttons[1].style.display = "block";
    error1.style.display = "none";
    buttons[0].style.display="none";
  } else {
    error1.style.display = "block";
  }
});

buttons[1].addEventListener("click", () => {
  var bill = inputs[0].value;
  var payment = inputs[1].value;
  clearNotes(results);

  if (Number(bill) > 0 && Number(payment > 0)) {
    if (Number(payment) >= Number(bill)) {
      table.style.display = "block";
      changeText.style.display="block";
      error2.style.display = "none";
      error3.style.display = "none";
      calculateNotes(bill, payment);
    } else {
      table.style.display = "none";
      changeText.style.display="none";
      error3.style.display = "block";
      error2.style.display = "none";
    }
  } else {
    error2.style.display = "block";
    error3.style.display = "none";
    table.style.display = "none";
    changeText.style.display="none";
  }
});

function calculateNotes(bill, payment) {
  var changeMoney = payment - bill;
  if (changeMoney === 0) {
    nochange.style.display = "block";
    table.style.display = "none";
    return;
  }
  for (var i = denominations.length - 1; i >= 0; i--) {
    changeMoney = compare(changeMoney, denominations[i], i);
  }
}

function compare(remainAmt, denom, index) {
  if (remainAmt >= denom) {
    var noOfNotes = Math.floor(remainAmt / denom);
    remainAmt = remainAmt - denom * noOfNotes;
    results[index].textContent = noOfNotes;
  }
  return remainAmt;
}

function clearNotes(results){
    for(var item of results){
        item.textContent='';
    }
}
