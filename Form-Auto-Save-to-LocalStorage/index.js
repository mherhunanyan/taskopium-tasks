const input = document.querySelector(".input");

window.addEventListener("load", () => {
  const savedValue = localStorage.getItem("inputValue");
  if (savedValue) {
    input.value = savedValue;
  }
});


function onInput(event) {
  localStorage.setItem("inputValue", event.value);
}

