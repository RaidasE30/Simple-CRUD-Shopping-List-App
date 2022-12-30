class TableComponent {
    htmlElement;
    tbodyHtmlElement;
    onDelete;

    constructor({groceries}, {onDelete}) {
        this.onDelete = onDelete;
        this.htmlElement = document.createElement('table');
        this.htmlElement.className = 'table table-striped shadow-sm';
        this.htmlElement.innerHTML = `
    <thead class="bg-dark text-white">
      <tr>
        <th>Id</th>
        <th>Groceries</th>
        <th>Amount</th>
        <th>Actions</th>    
      </tr>
    </thead>
    <tbody></tbody>`;
        this.tbodyHtmlElement = this.htmlElement.querySelector('tbody');
        this.renderContent(groceries);
    }

    createTableRow = ({id, name, amount}) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${amount}</td>
        <td>
            <button 
                class="btn btn-warning btn-sm" 
                data-bs-toggle="modal" 
                data-bs-target="#edit-modal">✎</button>
            <button 
                class="btn btn-danger btn-sm">🗑</button>
        </td>`;

        const editButton = row.querySelector('.btn-warning');
        editButton.addEventListener('click', () => {
            const rowId = id;
            const rowName = name;
            const rowAmount = amount;
            const idInput = document.querySelector('#edit-modal input[name="id"]');
            const nameInput = document.querySelector('#edit-modal input[name="name"]');
            const amountInput = document.querySelector('#edit-modal input[name="amount"]');
            idInput.value = rowId;
            nameInput.value = rowName;
            amountInput.value = rowAmount;
        });

        const deleteButton = row.querySelector('.btn-danger');
        deleteButton.addEventListener('click', async () => {
            try {
                await this.onDelete({id});
            } catch (error) {
                throw (error);
            }
        });

        return row;
    }

    renderContent = (groceries) => {
        this.tbodyHtmlElement.innerHTML = null;
        const rows = groceries.map(this.createTableRow);
        this.tbodyHtmlElement.append(...rows);
    }
}

export default TableComponent;