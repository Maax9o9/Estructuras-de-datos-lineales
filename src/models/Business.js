class Business {
    constructor(data) {
        this.business = data.business || '';
        this.name = data.name || '';
        this.address = data.address || '';
        this.city = data.city || '';
        this.state = data.state || '';
        this.postal_code = data.postal_code || '';
        this.latitude = data.latitude || 0;
        this.longitude = data.longitude || 0;
        this.stars = data.stars || 0;
        this.review_count = data.review_count || 0;
        this.is_open = data.is_open || 0;
        this.attributes = data.attributes || {};
        this.categories = data.categories || '';
        this.hours = data.hours || {};
    }

    static measureSortTime(sortFunction, data) {
        let startTime = performance.now();
        sortFunction(data);
        let endTime = performance.now();
        return (endTime - startTime) / 1000;
    }
}

export { Business };
