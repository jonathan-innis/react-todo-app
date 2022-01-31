import React from "react";
import ApiUtils from "./ApiUtils";
import Item from "./Item";
import ItemForm from "./ItemForm";
import ItemModel from "./ItemModel";
import Modal from "./Modal";
import ItemUpdateForm from "./ItemUpdateForm";

class ListContext extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.handleCreateInputChange = this.handleCreateInputChange.bind(this);
        this.handleUpdateInputChange = this.handleUpdateInputChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            items: [],
            itemToCreateTitle: "",
            itemToCreateDescription: "",
            itemToUpdateID: "",
            itemToUpdateTitle: "",
            itemToUpdateDescription: "",
            showModal: false,
        }
        this.apiUtils = new ApiUtils();
    }

    async componentDidMount() {
        let items = await this.apiUtils.getItems();
        this.setState({
            items: items
        });
    }

    handleCreateInputChange(event) {
        if (event.target.name === "title") {
            this.setState({
                itemToCreateTitle: event.target.value
            })
        } else if (event.target.name === "description") {
            this.setState({
                itemToCreateDescription: event.target.value
            })
        }
    }

    handleUpdateInputChange(event) {
        if (event.target.name === "title") {
            this.setState({
                itemToUpdateTitle: event.target.value
            })
        } else if (event.target.name === "description") {
            this.setState({
                itemToUpdateDescription: event.target.value
            })
        }
        console.log(event.target.name)
    }

    async addItem(event) {
        event.preventDefault();
        let item = new ItemModel(null, this.state.itemToCreateTitle, this.state.itemToCreateDescription);
        item = await this.apiUtils.addItem(item);
        this.setState({
            items: [...this.state.items, item]
        })
    }

    async updateItem(event) {
        event.preventDefault();
        let item = new ItemModel(this.state.itemToUpdateID, this.state.itemToUpdateTitle, this.state.itemToUpdateDescription);
        console.log(item);
        await this.apiUtils.updateItem(item);
        this.setState({
            items: [...this.state.items.filter((i => i.id !== item.id)), item]
        });
        this.toggleModal();
    }

    async deleteItem(id, _) {
        await this.apiUtils.deleteItem(id);
        this.setState({
            items: this.state.items.filter((item) => item.id !== id)
        })
    }

    openUpdateModal(id, _) {
        let item = this.state.items.filter((item) => item.id === id);
        console.log(item[0].title);
        this.setState({
            itemToUpdateID: item[0].id,
            itemToUpdateTitle: item[0].title,
            itemToUpdateDescription: item[0].description,
        });
        console.log(this.state);
        this.toggleModal();
        console.log(this.state);
    }

    toggleModal() {
        this.setState((state, ) => ({
            showModal: !state.showModal
        }))
    }

    render() {
        return (
            <div>
                <h1>Todo List</h1>
                <ul>
                    {this.state.items.map((item) => {
                        return (
                            <Item key={item.id} id={item.id} title={item.title} description={item.description} deleteItem={this.deleteItem} openUpdateModal={this.openUpdateModal}/>
                        )
                    })}
                </ul>
                <ItemForm title={this.state.itemToCreateTitle} description={this.state.itemToCreateDescription} addItem={this.addItem} handleInputChange={this.handleCreateInputChange}/>
                <Modal show={this.state.showModal} toggle={this.toggleModal}>
                    <ItemUpdateForm title={this.state.itemToUpdateTitle} description={this.state.itemToUpdateDescription} handleInputChange={this.handleUpdateInputChange} updateItem={this.updateItem}/>
                </Modal>
            </div>
        )
    }
}

export default ListContext;