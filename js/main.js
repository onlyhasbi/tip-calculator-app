const buttonTip = document.querySelectorAll(".btn-tip");

const bill = document.querySelector(".bill__input");
const customTip = document.querySelector(".custom-tip");
const numberOfPeople = document.querySelector(".people__input");

const amountResult = document.querySelector(".amount__result");
const totalResult = document.querySelector(".total__result");

const buttonReset = document.querySelector(".btn-reset");

function isTipButtonSelected() {
  var isSelected = false;

  for (let item = 0; item < buttonTip.length; item++) {
    if (buttonTip[item].classList.contains("selected")) {
      return (isSelected = true);
    }
  }
  return isSelected;
}

function isCustomTipFill() {
  return !!customTip.value;
}

function tipValueList(value) {
  if (value === "5%") return 0.05;
  if (value === "10%") return 0.1;
  if (value === "15%") return 0.15;
  if (value === "25%") return 0.25;
  if (value === "50%") return 0.5;
}

function getSelectedTipValue() {
  for (let item = 0; item < buttonTip.length; item++) {
    if (buttonTip[item].classList.contains("selected")) {
      return tipValueList(buttonTip[item].textContent);
    }
  }
}

function getCustomTipValue() {
  var tipValue = 0;
  if (customTip.value != "") tipValue = customTip.value;

  if (tipValue > 0) return tipValue / 100;
  return 0;
}

function calcTipAmount() {
  var billValue = 0;
  if (!!bill.value) billValue = bill.value;

  var tip = 0;
  if (isCustomTipFill()) {
    tip = getCustomTipValue().toFixed(2);
  }

  if (isTipButtonSelected()) {
    tip = getSelectedTipValue();
  }

  if (isCustomTipFill() && isTipButtonSelected()) {
    tip = getCustomTipValue();
  }

  var peopleValue = 0;
  if (!!numberOfPeople.value) peopleValue = numberOfPeople.value;

  var tipAmountResult = 0;
  if (billValue && tip && peopleValue) {
    tipAmountResult = (billValue / peopleValue) * tip;
    tipAmountResult = Math.floor(tipAmountResult * 100) / 100;
  }

  return tipAmountResult.toFixed(2);
}

function calcTotalAmount() {
  var totalAmountResult = 0;
  if (calcTipAmount() > 0) {
    var totalAmountResult = bill.value / calcTipAmount();
    totalAmountResult = Math.floor(totalAmountResult * 100) / 100;
    return totalAmountResult.toFixed(2);
  }
  return totalAmountResult.toFixed(2);
}

function fireChange() {
  amountResult.textContent = "$" + calcTipAmount();
  totalResult.textContent = "$" + calcTotalAmount();

  if (calcTipAmount() > 0 && calcTotalAmount() > 0) {
    buttonReset.classList.add("btn-active");
  } else {
    buttonReset.classList.remove("btn-active");
  }
}

const clearSelected = () => {
  buttonTip.forEach((item) => {
    item.classList.remove("selected");
  });
};

buttonTip.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedExist = e.currentTarget.classList.contains("selected");
    if (selectedExist) {
      e.currentTarget.classList.remove("selected");
    }

    if (!selectedExist) {
      clearSelected();
      e.currentTarget.classList.add("selected");
    }

    fireChange();
  });
});

bill.addEventListener("input", () => fireChange());
customTip.addEventListener("input", () => fireChange());
numberOfPeople.addEventListener("input", (e) => {
  var peopleValue = e.currentTarget.value > 0;
  var labelInfo = document.querySelector(".people__info");

  if (!peopleValue) {
    labelInfo.style.visibility = "visible";
    numberOfPeople.style.outline = "1px solid #e67f70";
  } else {
    labelInfo.style.visibility = "hidden";
    numberOfPeople.style.outline = "0";
  }

  fireChange();
});

buttonReset.addEventListener("click", () => {
  bill.value = "";
  customTip.value = "";
  numberOfPeople.value = "";
  clearSelected();
  amountResult.textContent = "$0.00";
  totalResult.textContent = "$0.00";
  buttonReset.classList.remove("btn-active");
  bill.focus();
});
