
function visualizeMerge(numbers, i, j) {

    lostNumber = numbers[i];
    numbers[i] = numbers[j];

    while (i < j) {

        if (j == i + 1) {

            numbers[j] = lostNumber;


        } else {

            numbers[j] = numbers[j - 1];

        }
        j--;
    }

}



numbers = [3, 1];


visualizeMerge(numbers, 0, 1);

console.log(numbers);