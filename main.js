/*********************Modal Code**********************/

const crossBtn = document.querySelector(".cross");
const modal = document.querySelector(".modal");

crossBtn.addEventListener("click", () => {
  modal.classList.add("disable");

  setTimeout(() => {
    modal.style.visibility = "hidden";
  }, 500);
});

/*****************************************************/




const printField = document.querySelector(".visualization-field");
const slider = document.querySelector(".slider");
const startBtn = document.querySelector(".btn-start");
const algorithmButtons = document.querySelectorAll(".btn");


let isAlgorithmRunning = false;
let printQueueOrder = 0;
let numbers = [];


/******Initialize the unsorted array in the visualization field******/
for (let i = 0; i < 120; i++) {

  let randomNumber = (Math.random() * 90) + 1;
  numbers.push(Math.floor(randomNumber));
}

let visualizationFieldWidth = 8 * 120;
printField.style.width = "" + visualizationFieldWidth + "px";

printArray(numbers);

/********************************************************************/



//This function takes an array of numbers and illustrates it 
//in the visualization field
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


// A fuctions which animates in the visualization Field the swap of two elements.
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
  }, Math.floor(4000 / numbers.length) * printQueueOrder);
}



//A special fuction for the visualization of the mergesort algorithm.
//This function animates a right circular shift in the specific area 
//ranging from i to j.
function visualizeMerge(i, j, printQueueOrder) {


  setTimeout(() => {
    const verticalBars = document.querySelectorAll(".vertical-bar");

    for (let k = 0; k < numbers.length; k++) {

      verticalBars[k].style.borderColor = "black";

    }

    verticalBars[i].style.borderColor = "red";
    verticalBars[j].style.borderColor = "red";


    let temp = verticalBars[i].style.height;

    verticalBars[i].style.height = verticalBars[j].style.height;;

    while (i < j) {

      if (j == i + 1) {

        verticalBars[j].style.height = temp;


      } else {

        verticalBars[j].style.height = verticalBars[j - 1].style.height;

      }

      j--;
    }
  }, Math.floor(4000 / numbers.length) * printQueueOrder);

}

function swapNumbers(numbers, i, j) {
  temp = numbers[i];
  numbers[i] = numbers[j];
  numbers[j] = temp;
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
        printQueueOrder += 1;
        visualizeMerge(k, j, printQueueOrder);
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


function heapsort(numbers, count) {

  function heapify(numbers, count) {

    let start = Math.floor(((count - 1) - 1) / 2)

    while (start >= 0) {

      shiftDown(numbers, start, count - 1);

      start = start - 1;
    }
  }
  function shiftDown(numbers, start, end) {

    let root = start;
    let swap;

    while (2 * root + 1 <= end) {

      child = 2 * root + 1;
      swap = root;


      if (numbers[swap] < numbers[child]) {

        swap = child;
      }

      if (child + 1 <= end && numbers[swap] < numbers[child + 1]) {

        swap = child + 1;
      }

      if (swap === root) return;
      else {

        printQueueOrder += 1;
        swapBars([...numbers], swap, root, printQueueOrder);
        swapNumbers(numbers, root, swap);
        root = swap;
      }
    }
  }


  heapify(numbers, numbers.length);


  end = count - 1;
  while (end > 0) {

    printQueueOrder += 1;
    swapBars([...numbers], end, 0, printQueueOrder);
    swapNumbers(numbers, end, 0);
    end = end - 1;
    shiftDown(numbers, 0, end);
  }
}



slider.addEventListener("input", () => {

  numbers = [];
  numberOfArrays = document.querySelector("#mySlider").value;

  for (let i = 0; i < numberOfArrays; i++) {
    randomNumber = (Math.random() * 90) + 1;
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
    startBtn.style.visibility = "visible";
    button.classList.add("active");


  });


});




startBtn.addEventListener("click", () => {



  if (!isAlgorithmRunning) {
    isAlgorithmRunning = true;
    startBtn.innerHTML = "Stop";
    startBtn.classList.add("active");
    document.querySelector("#mySlider").setAttribute('disabled', true);
    printQueueOrder = 0;  //We need the printQueueOrder value in order to set the right timeouts for the animation.


    //The algorithms run in real time and the results are printed using
    //setTimeouts through the swapBars() or visualizeMerge().
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
      /*******************************/


    }
    else if (algorithmButtons[3].classList.contains("active")) {


      /*******************************/
      heapsort(numbers, numbers.length);
      /*******************************/


    }

    setTimeout(() => {
      printArray(numbers)
      startBtn.innerHTML = "Start";
      document.querySelector("#mySlider").removeAttribute("disabled");
      isAlgorithmRunning = false;
      startBtn.classList.remove("active");
    }, Math.floor(4000 / numbers.length) * (printQueueOrder + 1));

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

    document.querySelector("#mySlider").removeAttribute("disabled");
    isAlgorithmRunning = false;
    startBtn.innerHTML = "Start";
    startBtn.classList.remove("active");

  }

});
