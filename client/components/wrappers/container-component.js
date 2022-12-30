class ContainerComponent {
htmlElement;
    constructor({ children }) {
        this.htmlElement = document.createElement('div');
        this.htmlElement.className = 'container-sm d-grid';
        this.htmlElement.append(...children);
    }
}

export default ContainerComponent;