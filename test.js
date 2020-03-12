


function quicksort(numbers,low,high){

    
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


        let partitionIndex = partition(numbers,low,high);
       

        quicksort(numbers,low,partitionIndex-1);
        quicksort(numbers,partitionIndex + 1,high);


    }

    return numbers;

}



numbers = [10,30,80,90,40,50,70,23,123,43,23,123,43,1,1,1];
y = quicksort(numbers,0,numbers.length-1);
console.log(y);
