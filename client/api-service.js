const URL = 'http://localhost:5000';
const ENDPOINT = '/groceries';

const requestHeaders = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

const ApiService = {
    async getGroceries() {
        try {
            const response = await fetch(`${URL}${ENDPOINT}`);

            return await response.json();
        } catch (error) {
            throw (error);
        }
    },

    async createListItem( itemData ) {
        try {
            const response = await fetch(`${URL}${ENDPOINT}`, {
                ...requestHeaders,
                method: 'POST',
                body: JSON.stringify(itemData)
            });

            if (response.status === 404) {
                throw new Error('Error: Item cannot be created');
            }

            return await response.json();
        } catch (error) {
            throw (error);
        }
    },

    async editListItem ( itemData ) {
        try {
            const response = await fetch(`${URL}${ENDPOINT}/${itemData.id}`, {
                ...requestHeaders,
                method: 'PATCH',
                body: JSON.stringify(itemData)
            });

            if (response.status === 404) {
                throw new Error('Error: Item does not exist');
            }

            return await response.json();
        } catch (error) {
            throw (error);
        }
    },

    async deleteListItem ( itemData ) {
        try {
            const response = await fetch(`${URL}${ENDPOINT}/${itemData.id}`, {
                ...requestHeaders,
                method: 'Delete',
                body: JSON.stringify(itemData)
            });

            if (response.status === 404) {
                throw new Error('Error: Item does not exist');
            }

            return await response.json();
        } catch (error) {
            throw (error);
        }
    }
};

export default ApiService;