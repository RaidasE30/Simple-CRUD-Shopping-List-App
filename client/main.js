import ApiService from './api-service.js';
import TableComponent from './components/concrete/table-component.js';
import ContainerComponent from './components/wrappers/container-component.js';
import HeaderComponent from './components/concrete/header-component.js';
import ModalButtonComponent from './components/concrete/modal-button-component.js';
import ModalCreateFormComponent from './components/concrete/modal-create-form-component.js';
import ModalEditFormComponent from './components/concrete/modal-edit-form-component.js';

const rootHtmlElement = document.querySelector('#root');

let groceriesTableComponent;
let modalEditForm;


const onCreateGroceries = async ({ name, amount }) => {
    try {
        await ApiService.createListItem({ name, amount });
        const groceries = await ApiService.getGroceries();
        groceriesTableComponent.renderContent(groceries);
        modalEditForm.registerGroceries(groceries);
    } catch (error) {
        throw (error);
    }
}

const onUpdateGroceries = async ({id, name, amount}) => {
    try {
        await ApiService.editListItem({id, name, amount});
        const groceries = await ApiService.getGroceries();
        groceriesTableComponent.renderContent(groceries);
        modalEditForm.registerGroceries(groceries);
    } catch (error) {
        throw (error);
    }
}

const onDeleteGrocery = async ({id}) => {
    try {
        await ApiService.deleteListItem({id});
        const groceries = await ApiService.getGroceries();
        groceriesTableComponent.renderContent(groceries);
        modalEditForm.registerGroceries(groceries);
    } catch (error) {
        throw (error);
    }
}


ApiService.getGroceries()
    .then((groceries) => {
        const headerComponent = new HeaderComponent({
            text: 'Shopping List',
            className: 'text-center my-4 fw-normal'
        });
        const modalButton = new ModalButtonComponent();
        const modalCreateForm = new ModalCreateFormComponent({ onSubmit: onCreateGroceries });

        modalEditForm = new ModalEditFormComponent(
            groceries,
            {
                onUpdate: onUpdateGroceries,
                onDelete: onDeleteGrocery
            });

        groceriesTableComponent = new TableComponent({ groceries }, { onDelete: onDeleteGrocery });
        const container = new ContainerComponent({
            children: [
                headerComponent.htmlElement,
                modalButton.htmlElement,
                modalCreateForm.htmlElement,
                modalEditForm.htmlElement,
                groceriesTableComponent.htmlElement
            ]
        });

        rootHtmlElement.append(container.htmlElement);
    });