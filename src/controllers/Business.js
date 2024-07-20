class Business {
    constructor(data) {
        this.business = data.business || ''; 
    }

    static measureSortTime(sortFunction, data) {
        let startTime = performance.now();
        sortFunction(data);
        let endTime = performance.now();
        return (endTime - startTime) / 1000;
    }
}

export { Business };