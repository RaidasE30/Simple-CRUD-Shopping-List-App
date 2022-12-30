class ModalCreateFormComponent {
    htmlElement;

    constructor({onSubmit}) {
        this.htmlElement = document.createElement('form');
        this.htmlElement.className = 'modal fade';
        this.htmlElement.setAttribute('data-bs-backdrop', 'static');
        this.htmlElement.setAttribute('data-bs-keyboard', 'false');
        this.htmlElement.setAttribute('tabindex', '-1');
        this.htmlElement.setAttribute('id', 'create-modal')
        this.htmlElement.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">New Shopping List Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div class="modal-body">
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
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
          
       </div>
        </div>
            `;

        this.htmlElement.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const name = formData.get('name');
            const amount = formData.get('amount');

            if (name && amount) {
                try {
                    await onSubmit({name, amount});
                    const nameInput = document.querySelector('#create-modal input[name="name"]');
                    const amountInput = document.querySelector('#create-modal input[name="amount"]');
                    nameInput.value = '';
                    amountInput.value = '';
                    const closeButton = this.htmlElement.querySelector('.btn-close');
                    closeButton.click();
                } catch (error) {
                    throw error;
                }}
        });
    }
}

export default ModalCreateFormComponent;