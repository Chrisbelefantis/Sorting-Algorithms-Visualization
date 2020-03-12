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
const algorithmButtons = document.querySelectorAll(".btn");


let isAlgorithmRunning = false;
let numbers;


function sleep(milliseconds){
  return new Promise((resolve,reject)=>{
    setTimeout(()=> {resolve();},milliseconds);
  })

}


async function bubbleSort(numbers){

  for(let i=0; i<numbers.length-1; i++){

    for(let j=0; j<numbers.length-1; j++){
       
      if(!isAlgorithmRunning){
        return;
      }
      else if(numbers[j]>numbers[j+1]){
        document.querySelector("#bar"+j+"").style.borderColor = "red";
        document.querySelector("#bar"+(j+1)+"").style.borderColor = "red";
        let temp = numbers[j];
        numbers[j] = numbers[j+1];
        numbers[j+1] = temp;
        await sleep(0)
        printArray(numbers);

      }
    }
  }
  isAlgorithmRunning = false;
  startBtn.innerHTML = "Start";
  startBtn.classList.remove("active");
}


async function quicksort(numbers,low,high){
    
  function swap(numbers,i,j){

      temp = numbers[i];
      numbers[i] = numbers[j];
      numbers[j] = temp;

  }

  function partition(numbers,low,high){

      let i = low-1;      
      
      for(j=low; j<high; j++){

          if(numbers[j]<=numbers[high]){
          
          i = i + 1;
          if(i!=j)
          {     
                  swap(numbers,i,j);
          }
          }
      }

      swap(numbers,i+1,high);
      return i+1;

  }

  if(low<high){

      await sleep(0);
      printArray(numbers);
      let partitionIndex = partition(numbers,low,high);
     

      quicksort(numbers,low,partitionIndex-1);
      quicksort(numbers,partitionIndex + 1,high);
  }

  isAlgorithmRunning = false;
  startBtn.innerHTML = "Start";
  startBtn.classList.remove("active");
  printArray(numbers);

}






function printArray(numbers) {

  console.log(numbers);
  printField.innerHTML = " ";
  let count = 0;
  numbers.forEach((element,index) => {

    let barHeight = "height:" + element + "%";
    printField.innerHTML +=
      '<div class="vertical-bar" id="bar'+count+'" style = "' + barHeight + '"></div>';
    
    count++;


  });
}

slider.addEventListener("input", () => {

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


algorithmButtons.forEach((button)=>{

  button.addEventListener("click",()=>{

    for(let i=0; i<algorithmButtons.length; i++){

      algorithmButtons[i].classList.remove("active");

    }
    
    button.classList.add("active");

  });


});




startBtn.addEventListener("click",()=>{

  if(!isAlgorithmRunning)
  {
    // isAlgorithmRunning = true;
    // startBtn.innerHTML = "Stop";
    // startBtn.classList.add("active");

    if(algorithmButtons[0].classList.contains("active")){
      isAlgorithmRunning = true;
      startBtn.innerHTML = "Stop";
      startBtn.classList.add("active");
      bubbleSort(numbers);
    }
    else if(algorithmButtons[1].classList.contains("active")){

      isAlgorithmRunning = true;
      startBtn.innerHTML = "Stop";
      startBtn.classList.add("active");
      quicksort(numbers,0,numbers.length-1);

    }
 
  }
  else
  {
    isAlgorithmRunning = false;
    startBtn.innerHTML = "Start";
    startBtn.classList.remove("active");
  }

});
