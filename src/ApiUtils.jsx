class ApiUtils {
    constructor() {
        this.endpoint = "http://localhost:8000/api";
        this.defaultHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    async getItems() {
        try {
            let response = await fetch(this.endpoint + "/items", {
                headers: this.defaultHeaders,
            });
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

    async addItem(itemBody) {
        try {
            let response = await fetch(this.endpoint + "/items", {
                method: 'POST',
                headers: this.defaultHeaders,
                body: JSON.stringify(itemBody)
            });
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

    async deleteItem(itemId) {
        try {
            await fetch (`${this.endpoint}/items/${itemId}`, {
                method: 'DELETE',
                headers: this.defaultHeaders
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export default ApiUtils;