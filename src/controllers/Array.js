export function bubbleSortArray(array) {
    let n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (array[i].business > array[i + 1].business) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
        n--; 
    } while (swapped);
    return array;
}

export function mergeSort(array) {
    let numIterations = 0;
    array = array.filter(item => item && item.business); 
    function merge(left, right) {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            numIterations++;
            if (left[leftIndex].business < right[rightIndex].business) {
                resultArray.push(left[leftIndex]);
                leftIndex++;
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return resultArray
                .concat(left.slice(leftIndex))
                .concat(right.slice(rightIndex));
    }

    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(
        mergeSort(left), mergeSort(right)
    );
}

function getMax(array) {
    let numIterations = 0;
    let max = 0;
    array.forEach(item => {
        numIterations++;
        if (item && item.business) {
            let num = parseInt(item.business, 36);
            if (num > max) {
                max = num;
            }
        }
    });
    console.log("Número de iteraciones en getMax:", numIterations);
    return max;
}

function countingSort(array, exp) {
    let numIterations = 0;
    let output = new Array(array.length);
    let count = new Array(36).fill(0);

    array.forEach(item => {
        if (item && item.business) {
            numIterations++;
            let num = parseInt(item.business, 36);
            let digit = Math.floor(num / exp) % 36;
            count[digit]++;
        }
    });

    for (let i = 1; i < 36; i++) {
        numIterations++;
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] && array[i].business) {
            numIterations++;
            let num = parseInt(array[i].business, 36);
            let digit = Math.floor(num / exp) % 36;
            output[count[digit] - 1] = array[i];
            count[digit]--;
        }
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
    }

    console.log("Número de iteraciones en countingSort:", numIterations);
}

export function radixSort(array) {
    array = array.filter(item => item && item.business); 
    let numIterations = 0;
    let max = getMax(array);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 36) {
        numIterations++;
        countingSort(array, exp);
    }
    console.log("Número de iteraciones en radixSort:", numIterations);
    return array;
}

