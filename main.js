// /*********************Modal Code**********************/

// const crossBtn = document.querySelector(".cross");
// const modal = document.querySelector(".modal");

// crossBtn.addEventListener("click", () => {
//   modal.classList.add("disable");

//   setTimeout(() => {
//     modal.style.visibility = "hidden";
//   }, 500);
// });

// /*****************************************************/



const printField = document.querySelector(".visualization-field");
const slider = document.querySelector(".slider");
const startBtn = document.querySelector(".btn-start");

function bubbleSort(numbers){

  for(let i=0; i<numbers.length-1; i++){
    for(let j=0; j<numbers.length-1; j++){
      
      printArray(numbers);
      if(numbers[j]>numbers[j+1]){
        let temp = numbers[j];
        numbers[j] = numbers[j+1];
        numbers[j+1] = temp;
      }



    }


  }

  console.log(numbers);

}


function printArray(numbers) {
  
  printField.innerHTML = " ";

  numbers.forEach(element => {

    let barHeight = "height:" + element + "%";
    printField.innerHTML +=
      '<div class="vertical-bar" style = "' + barHeight + '"></div>';



  });
}

let numbers;

slider.addEventListener("change", () => {

  numbers = [];
  numberOfArrays = document.querySelector("#points").value;

  for (let i = 0; i < numberOfArrays; i++) {
    randomNumber = Math.random() * 90;
    numbers.push(Math.floor(randomNumber));
  }

  let visualizationFieldWidth = 8 * numberOfArrays;
  printField.style.width ="" + visualizationFieldWidth + "px";

  printArray(numbers);
});



startBtn.addEventListener("click",()=>{

  bubbleSort(numbers);

});
