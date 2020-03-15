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



// Φτιάξε το start-stop
// Φτιάξε το animation στον quicksort
// Γράψε καλύτερα την swapbars + βρες τα κατάλληλα delays


const printField = document.querySelector(".visualization-field");
const slider = document.querySelector(".slider");
const startBtn = document.querySelector(".btn-start");
const algorithmButtons = document.querySelectorAll(".btn");


let isAlgorithmRunning = false;
let printQueueOrder = 0;
let numbers;


function printArray(printNumbers) {

  printField.innerHTML = " ";
  let count = 0;
  printNumbers.forEach((element, index) => {

    let barHeight = "height:" + element + "%";
    printField.innerHTML += '<div class="vertical-bar"  style = "' + barHeight + '"></div>';
    count++;

  }
  );
}



function swapBars(numbers, i, j, printQueueOrder) {

  setTimeout(() => {

    const verticalBars = document.querySelectorAll(".vertical-bar");

    for (let k = 0; k < numbers.length; k++) {

      verticalBars[k].style.borderColor = "black";

    }

    temp = verticalBars[i].style.height;

    verticalBars[i].style.borderColor = "red";
    verticalBars[i].style.height = verticalBars[j].style.height;

    verticalBars[j].style.borderColor = "red";
    verticalBars[j].style.height = temp;
  }, 100 * printQueueOrder);
}


function bubbleSort(numbers) {

  for (let i = 0; i < numbers.length - 1; i++) {

    for (let j = 0; j < numbers.length - 1; j++) {

      if (!isAlgorithmRunning) {
        return;
      }
      else if (numbers[j] > numbers[j + 1]) {
        let temp = numbers[j];
        numbers[j] = numbers[j + 1];
        numbers[j + 1] = temp;
        printQueueOrder += 1;
        swapBars([...numbers], j, j + 1, printQueueOrder);

      }
    }
  }
}

function quicksort(numbers, low, high) {

  function swapNumbers(numbers, i, j) {
    temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }

  function partition(numbers, low, high) {
    let i = low - 1;

    for (j = low; j < high; j++) {

      if (numbers[j] <= numbers[high]) {

        i = i + 1;
        if (i != j) {
          printQueueOrder += 1;
          swapBars([...numbers], i, j, printQueueOrder);
          swapNumbers(numbers, i, j);

        }
      }
    }

    printQueueOrder += 1;
    swapBars([...numbers], i + 1, high, printQueueOrder);
    swapNumbers(numbers, i + 1, high);
    return i + 1;
  }

  if (low < high) {


    let partitionIndex = partition(numbers, low, high);


    quicksort(numbers, low, partitionIndex - 1);
    quicksort(numbers, partitionIndex + 1, high);
  }
}


function mergesort(numbers, low, high) {


  function merge(numbers, low, middle, high) {

    let helper = [];
    for (let x = 0; x <= high; x++) helper.push(0);

    for (let i = low; i <= high; i++) {

      helper[i] = numbers[i];

    }

    let i = low;
    let j = middle + 1;
    let k = low;

    while (i <= middle && j <= high) {

      if (helper[i] <= helper[j]) {
        numbers[k] = helper[i];
        i++

      } else {

        numbers[k] = helper[j];
        j++;
      }
      k++;
    }

    while (i <= middle) {

      numbers[k] = helper[i];
      k++;
      i++;
    }




  }





  if (low < high) {

    let middle = low + Math.floor((high - low) / 2);
    mergesort(numbers, low, middle);
    mergesort(numbers, middle + 1, high);

    merge(numbers, low, middle, high);

  }

}








slider.addEventListener("change", () => {

  numbers = [];
  numberOfArrays = document.querySelector("#points").value;

  for (let i = 0; i < numberOfArrays; i++) {
    randomNumber = Math.random() * 90;
    numbers.push(Math.floor(randomNumber));
  }

  let visualizationFieldWidth = 8 * numberOfArrays;
  printField.style.width = "" + visualizationFieldWidth + "px";

  printArray(numbers);

});


algorithmButtons.forEach((button) => {

  button.addEventListener("click", () => {

    for (let i = 0; i < algorithmButtons.length; i++) {

      algorithmButtons[i].classList.remove("active");

    }

    button.classList.add("active");

  });


});




startBtn.addEventListener("click", () => {

  console.log(isAlgorithmRunning);


  if (!isAlgorithmRunning) {
    isAlgorithmRunning = true;
    startBtn.innerHTML = "Stop";
    startBtn.classList.add("active");
    printQueueOrder = 0;  //We need the printQueueOrder value in order to set the right timeouts for the animation.


    //The algorithms run in real time and the results are printed using
    //setTimeouts through the swapBars().
    if (algorithmButtons[0].classList.contains("active")) {


      /****************************/
      bubbleSort(numbers);
      /****************************/


    }
    else if (algorithmButtons[1].classList.contains("active")) {


      /*******************************/
      quicksort(numbers, 0, numbers.length - 1);
      /*******************************/



    }
    else if (algorithmButtons[2].classList.contains("active")) {


      /*******************************/
      mergesort(numbers, 0, numbers.length - 1);
      console.log(numbers, printQueueOrder);
      /*******************************/



    }



    setTimeout(() => {
      printArray(numbers)
      startBtn.innerHTML = "Start";
      isAlgorithmRunning = false;
      startBtn.classList.remove("active");
    }, 100 * (printQueueOrder + 1));

  }
  else if (isAlgorithmRunning) {

    //Clear all timeouts to stop printing the next steps of the algorithm.
    var id = window.setTimeout(function () { }, 0);
    while (id--) {
      window.clearTimeout(id);
    }


    //The current state of the visualatiotion field gives its values to the
    //numbers array because the algorithms have run in real time and the 
    //numbers list is now sorted.
    const verticalBars = document.querySelectorAll(".vertical-bar");
    verticalBars.forEach((element, index) => {

      elementHeight = element.style.height
      elementHeight = elementHeight.replace('%', '')
      numbers[index] = parseInt(elementHeight);

    });
    printArray(numbers);



    isAlgorithmRunning = false;
    startBtn.innerHTML = "Start";
    startBtn.classList.remove("active");

  }

});
