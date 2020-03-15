
function merge(list, low, middle, high) {

    // console.log(`Inside merge middle = ${middle}`);
    let leftIndex = low;
    let rightIndex = middle + 1;
    count = 0;
    let result = [];

    while (count < high - low) {


        console.log(`left = ${list[leftIndex]} right = ${list[rightIndex]}`);

        if (list[leftIndex] < list[rightIndex]) {
            console.log("mpika1");


            result.push(list[leftIndex]);
            leftIndex++;

            if (leftIndex === middle) {

                console.log("mpika11");
                for (let i = rightIndex; i <= high; i++)
                    result.push(list[i]);
                break;
            }


        } else if (list[rightIndex] < list[leftIndex]) {
            console.log("mpika2");
            result.push(list[rightIndex]);
            rightIndex++;

            if (rightIndex > high) {
                console.log("mpika22");
                for (let i = leftIndex; i < middle; i++)
                    result.push(list[i]);
                break;
            }

        }
        count += 1;
    }

    if (low != high) {
        count2 = 0;
        for (let i = low; i <= high; i++) {

            console.log("mpika loop");
            console.log(`list[${i}] = ${list[i]} result[${count2}] = ${result[count2]}`);
            list[i] = result[count2];
            count2 += 1;

        }
    }

    console.log(`Result = ${result}`)
    console.log(`List = ${list}`);

}


function mergesort(numbers, low, high) {
    // console.log(`low = ${low} high = ${high}`);

    if (high > low) {
        middle = low + Math.floor((high + low) / 2);
        mergesort(numbers, low, middle);
        mergesort(numbers, middle + 1, high)

        console.log("**********");
        console.log(numbers.slice(low, high + 1));

        console.log(`low = ${low} middle = ${middle} high = ${high}`);
        console.log(`Πράξη ${low + Math.floor((high + low) / 2)}`);


        merge(numbers, low, middle, high);
    }



}

// let numbers = [12, 1, 22, 5];
let numbers = [12, 13, 3, 34, 14, 2, 8, 5];

mergesort(numbers, 0, numbers.length - 1);

console.log(numbers);

