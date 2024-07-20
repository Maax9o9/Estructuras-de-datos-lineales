class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    toArray() {
        const array = [];
        let current = this.head;
        while (current !== null) {
            array.push(current.data);
            current = current.next;
        }
        return array;
    }

    bubbleSort() {
        let swapped;
        let current;
        let end = null;
        do {
            swapped = false;
            current = this.head;
            while (current.next !== end) {
                if (current.data.business > current.next.data.business) {
                    [current.data, current.next.data] = [current.next.data, current.data];
                    swapped = true;
                }
                current = current.next;
            }
            end = current; 
        } while (swapped);
    }
    
    


    mergeSort() {
        if (!this.head || !this.head.next) {
            return;
        }

        let numIterations = 0;
        let sublistSize = 1;
        let current = this.head;

        const split = (head, size) => {
            let current = head;
            for (let i = 1; current && i < size; i++) {
                current = current.next;
            }

            if (!current) {
                return null;
            }

            let second = current.next;
            current.next = null;
            return second;
        };

        const merge = (l1, l2) => {
            let dummyHead = new Node(null);
            let current = dummyHead;

            while (l1 && l2) {
                numIterations++;
                if (l1.data.business <= l2.data.business) {
                    current.next = l1;
                    l1 = l1.next;
                } else {
                    current.next = l2;
                    l2 = l2.next;
                }
                current = current.next;
            }

            current.next = l1 ? l1 : l2;

            return dummyHead.next;
        };

        while (true) {
            let current = this.head;
            let dummyHead = new Node(null);
            let tail = dummyHead;
            let remaining = false;

            while (current) {
                let left = current;
                let right = split(left, sublistSize);
                current = split(right, sublistSize);
                tail.next = merge(left, right);

                while (tail.next) {
                    tail = tail.next;
                }

                if (current) {
                    remaining = true;
                }
            }

            if (!remaining) {
                break;
            }

            sublistSize *= 2;
            this.head = dummyHead.next;
        }

        console.log("Número de iteraciones en mergeSort (LinkedList):", numIterations);
    }

    radixSort() {
        let numIterations = 0;
        let max = this.getMax();
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 36) {
            numIterations++;
            this.countingSort(exp);
        }
        console.log("Número de iteraciones en radixSort (LinkedList):", numIterations);
    }

    getMax() {
        let numIterations = 0;
        let max = 0;
        let current = this.head;
        while (current !== null) {
            numIterations++;
            if (current.data && current.data.business) {
                let num = parseInt(current.data.business, 36);
                if (num > max) {
                    max = num;
                }
            }
            current = current.next;
        }
        console.log("Número de iteraciones en getMax (LinkedList):", numIterations);
        return max;
    }

    countingSort(exp) {
        let numIterations = 0;
        let output = new Array(this.size()).fill(null);
        let count = new Array(36).fill(0);

        let current = this.head;
        while (current !== null) {
            numIterations++;
            if (current.data && current.data.business) {
                let num = parseInt(current.data.business, 36);
                let digit = Math.floor(num / exp) % 36;
                count[digit]++;
            }
            current = current.next;
        }

        for (let i = 1; i < 36; i++) {
            numIterations++;
            count[i] += count[i - 1];
        }

        current = this.head;
        while (current !== null) {
            numIterations++;
            if (current.data && current.data.business) {
                let num = parseInt(current.data.business, 36);
                let digit = Math.floor(num / exp) % 36;
                output[count[digit] - 1] = current.data;
                count[digit]--;
            }
            current = current.next;
        }

        current = this.head;
        let i = 0;
        while (current !== null) {
            current.data = output[i];
            i++;
            current = current.next;
        }

        console.log("Número de iteraciones en countingSort (LinkedList):", numIterations);
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            count++;
            current = current.next;
        }
        return count;
    }
}
