const state = {
  value: bill.value,
};

bill.addEventListener("keydown", function (e) {
  const target = e.target;
  state.selectionStart = target.selectionStart;
  state.selectionEnd = target.selectionEnd;
});

bill.addEventListener("input", function (e) {
  const target = e.target;

  //    or ^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$

  if (/^[\d]{3}*\.[\d]$/.test(target.value)) {
    state.value = target.value;
  } else {
    // Users enter the not supported characters
    // Restore the value and selection
    target.value = state.value;
    target.setSelectionRange(state.selectionStart, state.selectionEnd);
  }
});
