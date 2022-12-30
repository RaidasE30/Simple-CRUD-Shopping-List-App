class ModalEditFormComponent {
    htmlElement;
    initialValues;

    constructor(groceries, {onUpdate}) {

        this.htmlElement = document.createElement('form');
        this.htmlElement.className = 'modal fade';
        this.htmlElement.setAttribute('data-bs-backdrop', 'static');
        this.htmlElement.setAttribute('data-bs-keyboard', 'false');
        this.htmlElement.setAttribute('tabindex', '-1');
        this.htmlElement.setAttribute('id', 'edit-modal');
        this.htmlElement.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Edit Shopping List Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="item-id" class="col-form-label d-none">ID:</label>
                            <input type="text" class="form-control d-none" id="item-id" name="id">
                        </div>
                        <div class="mb-3">
                            <label for="item-name" class="col-form-label">Item:</label>
                            <input type="text" class="form-control" id="item-name" name="name">
                        </div>
                    <div class="mb-3">
                        <label for="item-amount" class="col-form-label">Amount:</label>
                        <input type="text" class="form-control" id="item-amount" name="amount">
                    </div>
                </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
          
       </div>
        </div>
            `;

        this.registerGroceries(groceries);

        this.htmlElement.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const id = formData.get('id');
            const name = formData.get('name');
            const amount = formData.get('amount');

            const initialValues = this.initialValues[id];
            const closeButton = this.htmlElement.querySelector('.btn-close');

            if (name !== initialValues.name || amount !== initialValues.amount) {
                if (name && amount) {
                    try {
                        await onUpdate({id, name, amount});
                        closeButton.click();
                    } catch (error) {
                        throw error;
                    }
                }
            } else {
                closeButton.click();
            }
        });
    }

    registerGroceries(groceries){
        this.initialValues = {};
        groceries.forEach((grocery) => {
            this.initialValues[grocery.id] = {
                name: grocery.name,
                amount: grocery.amount
            };
        });
    }
}

export default ModalEditFormComponent;