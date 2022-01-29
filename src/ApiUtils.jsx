class ApiUtils {
    constructor() {
        this.endpoint = "http://localhost:8000/api";
        this.defaultHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    async getItems() {
        let response = await fetch(this.endpoint + "/items", {
            headers: this.defaultHeaders,
        });
        return response.json();
    }

    async addItem(itemBody) {
        let response = await fetch(this.endpoint + "/items", {
            method: 'POST',
            headers: this.defaultHeaders,
            body: JSON.stringify(itemBody)
        });
        return response.json();
    }
}

export default ApiUtils;