function mergesort(numbers, low, high) {


    if (low < high) {

        let middle = low + Math.floor((high - low) / 2);
        mergesort(numbers, low, middle);
        mergesort(numbers, middle + 1, high);

        merge(numbers, low, middle, high);

    }

}

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

numbers = [5, 12, 23, 24, 1, 2, 3, 18];

merge(numbers, 0, 3, numbers.length - 1);

console.log(numbers);