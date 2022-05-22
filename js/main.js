const bill = document.querySelector(".bill__input");
const buttonTip = document.querySelectorAll(".btn-tip");
const customTip = document.querySelector(".custom-tip");
const numberOfPeople = document.querySelector(".people__input");
const amountResult = document.querySelector(".amount__result");
const totalResult = document.querySelector(".total__result");
const buttonReset = document.querySelector(".btn-reset");

let values = {
  bill: 0,
  tip: 0,
  people: 1,
};

const calc = () => {
  console.log(values);

  if (values.bill) {
    const tipPeople = values.bill / (values.people || 1);
    const tipAmount = tipPeople * values.tip;
    const totalAmount = tipPeople + tipAmount;
    amountResult.textContent = `$${tipAmount.toFixed(2)}`;
    totalResult.textContent = `$${totalAmount.toFixed(2)}`;
  } else {
    amountResult.textContent = `$0.00`;
    totalResult.textContent = `$0.00`;
  }
};

const setError = (data, flag) => {
  const classForm = data.concat("-form-control");
  const form = document.querySelector(`.${classForm}`);
  const message = document.querySelector(".message");

  if (flag) {
    form.classList.add("error");
    message.style.visibility = "visible";
  } else {
    form.classList.remove("error");
    message.style.visibility = "hidden";
  }
};

const setInput = (e, data) => {
  if (e.currentTarget.value === "0" && data === "people") {
    setError(data, true);
    return;
  }

  setError(data, false);

  if (data === "tip") {
    removeSelectedTip();
    values[data] = +e.currentTarget.value / 100;
  } else {
    values[data] = +e.currentTarget.value;
  }

  calc();
};

const removeSelectedTip = () => {
  const selected = document.querySelector(".selected");
  if (selected) selected.classList.remove("selected");
};

const reset = () => {
  removeSelectedTip();
  bill.value = "";
  customTip.value = "";
  numberOfPeople.value = "";
  values.bill = 0;
  values.tip = 0;
  values.people = 0;
  calc();
  bill.focus();
};

buttonReset.addEventListener("click", reset);
buttonTip.forEach((item) => {
  item.addEventListener("click", (e) => {
    const target = e.currentTarget;
    const currentSelected = document.querySelector(".selected");
    const isSelected = target.classList.contains("selected");
    customTip.value = "";

    if (isSelected) {
      target.classList.remove("selected");
      values.tip = 0;
      calc();
      return;
    } else {
      if (!!currentSelected) currentSelected.classList.remove("selected");
      target.classList.add("selected");
    }

    var tip = target.textContent;
    tip = tip.replace("%", "");
    values.tip = +tip / 100;
    calc();
  });
});

bill.addEventListener("input", (e) => setInput(e, "bill"));
customTip.addEventListener("input", (e) => setInput(e, "tip"));
numberOfPeople.addEventListener("input", (e) => setInput(e, "people"));
