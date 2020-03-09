const crossBtn = document.querySelector(".cross");
const modal = document.querySelector(".modal");

crossBtn.addEventListener("click", () => {
  modal.classList.add("disable");

  setTimeout(() => {
    modal.style.visibility = "hidden";
  }, 500);
});

const printField = document.querySelector(".visualization-field");
const slider = document.querySelector(".slider");

function printArray(numbers) {
  printField.innerHTML = " ";

  numbers.forEach(element => {
    let myStyle = "height:" + element + "%";
    printField.innerHTML +=
      '<div class="vertical-bar" style = "' + myStyle + '"></div>';
  });
}

slider.addEventListener("change", () => {
  let numbers = [];

  numberOfArrays = document.querySelector("#points").value;
  console.log(numberOfArrays);

  for (let i = 0; i < numberOfArrays; i++) {
    randomNumber = Math.random() * 90;
    numbers.push(Math.floor(randomNumber));
  }

  printArray(numbers);
});
