import { Business } from './Business.js';
import { bubbleSortArray, mergeSort, radixSort } from './Array.js';
import { LinkedList } from './LinkedList.js';

document.addEventListener("DOMContentLoaded", function() {
    const resultsContainer = document.getElementById('results');
    if (resultsContainer) {
        console.log('Contenedor de resultados encontrado.');
    } else {
        console.error('Contenedor de resultados no encontrado.');
    }
    loadDataset();
});

let businesses = [];
let linkedList = new LinkedList();

function loadDataset() {
    fetch('models/bussines.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos del archivo JSON:', data);

            if (!Array.isArray(data)) {
                throw new Error('El archivo JSON no contiene un array');
            }

            businesses = data
                .filter(item => item && item.business)
                .slice(0, 50000) // Limitar a 10000 elementos
                .map(item => new Business(item));

            console.log("Datos después de cargar y filtrar:", businesses);

            linkedList = new LinkedList();
            businesses.forEach(business => {
                if (business && business.business) {
                    linkedList.append(business);
                } else {
                    console.error('El objeto business es inválido y no se agregará a la LinkedList:', business);
                }
            });

            displayBusinesses(businesses);
        })
        .catch(error => {
            console.error('Error al cargar el dataset:', error);
        });
}



function displayBusinesses(businesses) {
    const container = document.getElementById('results');
    if (!container) {
        console.error('El contenedor para los resultados no se encontró.');
        return;
    }

    container.innerHTML = '';

    businesses.forEach(business => {
        if (business && business.business) {
            const div = document.createElement('div');
            div.textContent = business.business;
            container.appendChild(div);
        } else {
            console.error('El objeto business es undefined o no tiene la propiedad business:', business);
        }
    });
}

function displaySortTime(sortName, time, dataType) {
    const timingResultsDiv = document.getElementById('timingResults');
    if (timingResultsDiv) {
        const div = document.createElement('div');
        div.textContent = `${sortName} tomó ${time.toFixed(4)} segundos para ordenar los datos de tipo ${dataType}`;
        timingResultsDiv.appendChild(div);
    } else {
        console.error('El contenedor para los tiempos de ordenación no se encontró.');
    }
}

document.getElementById('sortBubble').addEventListener('click', function() {
    console.log("Antes de bubbleSort para array:", businesses);
    let dataCopy = [...businesses].filter(business => business != null && business.business);
    let startTimeArray = performance.now();
    let sortedArray = bubbleSortArray(dataCopy);
    let endTimeArray = performance.now();
    let timeArray = (endTimeArray - startTimeArray) / 1000;

    console.log("Después de bubbleSort para array:", sortedArray);
    displayBusinesses(sortedArray);
    displaySortTime('Bubble Sort', timeArray, 'Array');

    console.log("Antes de bubbleSort para LinkedList:", linkedList.toArray());
    let startTimeLinkedList = performance.now();
    linkedList.bubbleSort();
    let endTimeLinkedList = performance.now();
    let timeLinkedList = (endTimeLinkedList - startTimeLinkedList) / 1000;
    console.log("Después de bubbleSort para LinkedList:", linkedList.toArray());
    displaySortTime('Bubble Sort', timeLinkedList, 'LinkedList');
});

document.getElementById('sortMerge').addEventListener('click', function() {
    console.log("Antes de mergeSort para array:", businesses);
    let dataCopy = [...businesses].filter(business => business != null && business.business);
    let startTimeArray = performance.now();
    let sortedArray = mergeSort(dataCopy);
    let endTimeArray = performance.now();
    let timeArray = (endTimeArray - startTimeArray) / 1000;

    console.log("Después de mergeSort para array:", sortedArray);
    displayBusinesses(sortedArray);
    displaySortTime('Merge Sort', timeArray, 'Array');

    console.log("Antes de mergeSort para LinkedList:", linkedList.toArray());
    let startTimeLinkedList = performance.now();
    linkedList.mergeSort();
    let endTimeLinkedList = performance.now();
    let timeLinkedList = (endTimeLinkedList - startTimeLinkedList) / 1000;
    console.log("Después de mergeSort para LinkedList:", linkedList.toArray());
    displaySortTime('Merge Sort', timeLinkedList, 'LinkedList');
});




document.getElementById('sortRadix').addEventListener('click', function() {
    // Ordenar el Array
    console.log("Antes de radixSort para array:", businesses);
    let dataCopy = [...businesses].filter(business => business && business.business); 
    let startTimeArray = performance.now();
    let radixSortedArray = radixSort(dataCopy);
    let endTimeArray = performance.now();
    let timeArray = (endTimeArray - startTimeArray) / 1000;
    console.log("Después de radixSort para array:", radixSortedArray);
    displayBusinesses(radixSortedArray);
    displaySortTime('Radix Sort', timeArray, 'Array');

    // Ordenar la LinkedList
    console.log("Antes de radixSort para LinkedList:", linkedList.toArray());
    let startTimeLinkedList = performance.now();
    linkedList.radixSort();
    let endTimeLinkedList = performance.now();
    let timeLinkedList = (endTimeLinkedList - startTimeLinkedList) / 1000;
    console.log("Después de radixSort para LinkedList:", linkedList.toArray());
    displaySortTime('Radix Sort', timeLinkedList, 'LinkedList');
});

