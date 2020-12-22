const msgError = d.querySelector(".error-msg");
const btnError = d.querySelector(".e");
const btnSuccess = d.querySelector(".s");
const msgSuccess = d.querySelector(".success-msg");

d.addEventListener("click", (e) => {
  const t = e.target;
  if (t === btnError) {
    msgError.classList.add("move");
  }
  if (t === btnSuccess) {
    msgSuccess.classList.add("move");
  }
});
