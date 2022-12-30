class ModalButtonComponent {
    htmlElement;

    constructor () {
        this.htmlElement = document.createElement('button');
        this.htmlElement.setAttribute('type', 'button');
        this.htmlElement.className = 'btn btn-primary text-center';
        this.htmlElement.setAttribute('data-bs-toggle', 'modal');
        this.htmlElement.setAttribute('data-bs-target', '#create-modal');
        this.htmlElement.innerText = 'Add item to shopping list';
    }

}

export default ModalButtonComponent;