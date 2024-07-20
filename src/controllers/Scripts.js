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
                .filter(item => item && typeof item === 'object' && 'business' in item) // Filtramos objetos válidos
                .slice(0, 10000) 
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

    updateChart(sortName, time, dataType);
}

let arrayTimes = {
    'Bubble Sort': 0,
    'Merge Sort': 0,
    'Radix Sort': 0
};

let linkedListTimes = {
    'Bubble Sort': 0,
    'Merge Sort': 0,
    'Radix Sort': 0
};

let iterationTimes = {
    'Bubble Sort': { Array: 0, LinkedList: 0 },
    'Merge Sort': { Array: 0, LinkedList: 0 },
    'Radix Sort': { Array: 0, LinkedList: 0 }
};


function updateChart(sortName, time, dataType) {
    if (dataType === 'Array') {
        arrayTimes[sortName] = time;
    } else if (dataType === 'LinkedList') {
        linkedListTimes[sortName] = time;
    }

    arrayChart.data.datasets[0].data = Object.values(arrayTimes);
    linkedListChart.data.datasets[0].data = Object.values(linkedListTimes);

    arrayChart.update();
    linkedListChart.update();
}

const arrayChartCtx = document.getElementById('arrayChart').getContext('2d');
const linkedListChartCtx = document.getElementById('linkedListChart').getContext('2d');

const arrayChart = new Chart(arrayChartCtx, {
    type: 'bar',
    data: {
        labels: ['Bubble Sort', 'Merge Sort', 'Radix Sort'],
        datasets: [{
            label: 'Tiempos de Ordenamiento (Array)',
            data: Object.values(arrayTimes),
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const linkedListChart = new Chart(linkedListChartCtx, {
    type: 'bar',
    data: {
        labels: ['Bubble Sort', 'Merge Sort', 'Radix Sort'],
        datasets: [{
            label: 'Tiempos de Ordenamiento (LinkedList)',
            data: Object.values(linkedListTimes),
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


const iterationChartCtx = document.getElementById('iterationChart').getContext('2d');

const iterationChart = new Chart(iterationChartCtx, {
    type: 'bar',
    data: {
        labels: ['Bubble Sort', 'Merge Sort', 'Radix Sort'],
        datasets: [
            {
                label: 'Tiempos de Iteración (Array)',
                data: Object.values(iterationTimes).map(item => item.Array),
                backgroundColor: ['rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 206, 86, 1)'],
                borderWidth: 1
            },
            {
                label: 'Tiempos de Iteración (LinkedList)',
                data: Object.values(iterationTimes).map(item => item.LinkedList),
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

document.getElementById('sortBubble').addEventListener('click', function() {
    console.log("Antes de bubbleSort para array:", businesses);
    let dataCopy = [...businesses].filter(business => business && business.business); 
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

    iterationTimes['Bubble Sort'].Array = timeArray;
    iterationTimes['Bubble Sort'].LinkedList = timeLinkedList;
    updateIterationChart();
});

document.getElementById('sortMerge').addEventListener('click', function() {
    console.log("Antes de mergeSort para array:", businesses);
    let dataCopy = [...businesses].filter(business => business && business.business); 
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

    iterationTimes['Merge Sort'].Array = timeArray;
    iterationTimes['Merge Sort'].LinkedList = timeLinkedList;
    updateIterationChart();
});

document.getElementById('sortRadix').addEventListener('click', function() {
    console.log("Antes de radixSort para array:", businesses);
    let dataCopy = [...businesses].filter(business => business && business.business);
    let startTimeArray = performance.now();
    let radixSortedArray = radixSort(dataCopy);
    let endTimeArray = performance.now();
    let timeArray = (endTimeArray - startTimeArray) / 1000;
    console.log("Después de radixSort para array:", radixSortedArray);
    displayBusinesses(radixSortedArray);
    displaySortTime('Radix Sort', timeArray, 'Array');

    console.log("Antes de radixSort para LinkedList:", linkedList.toArray());
    let startTimeLinkedList = performance.now();
    linkedList.radixSort();
    let endTimeLinkedList = performance.now();
    let timeLinkedList = (endTimeLinkedList - startTimeLinkedList) / 1000;
    console.log("Después de radixSort para LinkedList:", linkedList.toArray());
    displaySortTime('Radix Sort', timeLinkedList, 'LinkedList');

    iterationTimes['Radix Sort'].Array = timeArray;
    iterationTimes['Radix Sort'].LinkedList = timeLinkedList;
    updateIterationChart();
});

function updateIterationChart() {
    iterationChart.data.datasets[0].data = Object.values(iterationTimes).map(item => item.Array);
    iterationChart.data.datasets[1].data = Object.values(iterationTimes).map(item => item.LinkedList);

    iterationChart.update();
}

document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredBusinesses = businesses.filter(business => business.business.toLowerCase().includes(searchTerm));
    displayBusinesses(filteredBusinesses);
});




