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

    findByBusiness(businessId) {
        let current = this.head;
        while (current !== null) {
            if (current.data.business === businessId) {
                return current.data;
            }
            current = current.next;
        }
        return null;
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
    
        // Repetir mientras haya intercambios
        do {
            swapped = false;
            current = this.head;
    
            // Iterar sobre la lista hasta el nodo `end`
            while (current.next !== end) {
                // Verificar si ambos nodos tienen datos válidos y la propiedad `business`
                if (current.data && current.next.data &&
                    current.data.business && current.next.data.business) {
    
                    // Comparar y realizar intercambio si es necesario
                    if (current.data.business > current.next.data.business) {
                        // Intercambiar los datos de los nodos
                        const temp = current.data;
                        current.data = current.next.data;
                        current.next.data = temp;
                        swapped = true;
                    }
                } else {
                    // Registrar advertencia si algún dato es inválido
                    console.warn('Uno de los objetos a comparar es inválido:', current.data, current.next.data);
                }
                // Avanzar al siguiente nodo
                current = current.next;
            }
    
            // Actualizar `end` a la última posición comparada
            end = current;
        } while (swapped); // Repetir mientras haya intercambios
    
        console.log('Bubble Sort finalizado.');
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
                if (l1.data && l2.data) {
                    if (l1.data.business <= l2.data.business) {
                        current.next = l1;
                        l1 = l1.next;
                    } else {
                        current.next = l2;
                        l2 = l2.next;
                    }
                    current = current.next;
                } else {
                    // Manejo de datos nulos
                    if (!l1.data) {
                        current.next = l2;
                        break;
                    }
                    if (!l2.data) {
                        current.next = l1;
                        break;
                    }
                }
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
        const max = this.getMax();
        let exp = 1; // El exponente inicial para la posición del dígito
    
        // Recorre todas las posiciones de dígitos (en base 36)
        while (Math.floor(max / exp) > 0) {
            numIterations++;
            this.countingSort(exp);
            exp *= 36; // Para manejar la base 36
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
                const num = parseInt(current.data.business, 36);
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
        const size = this.size(); // Tamaño de la lista enlazada
        let output = new Array(size).fill(null);
        let count = new Array(36).fill(0);
        
        // Cuenta la frecuencia de cada dígito en la base 36
        let current = this.head;
        while (current !== null) {
            numIterations++;
            if (current.data && current.data.business) {
                const num = parseInt(current.data.business, 36);
                const digit = Math.floor(num / exp) % 36;
                count[digit]++;
            }
            current = current.next;
        }
        
        // Acumula las frecuencias
        for (let i = 1; i < 36; i++) {
            numIterations++;
            count[i] += count[i - 1];
        }
        
        // Ordena los elementos basados en el dígito actual
        current = this.head;
        while (current !== null) {
            numIterations++;
            if (current.data && current.data.business) {
                const num = parseInt(current.data.business, 36);
                const digit = Math.floor(num / exp) % 36;
                output[count[digit] - 1] = current.data;
                count[digit]--;
            }
            current = current.next;
        }
        
        // Copia los elementos ordenados de nuevo a la lista enlazada
        current = this.head;
        let i = 0;
        while (current !== null) {
            if (i < size) { // Verifica el límite para evitar errores
                current.data = output[i];
                i++;
            }
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

    searchById(id) {
        let current = this.head;
        while (current !== null) {
            if (current.data && current.data.business === id) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }
}
