import React from "react";
import ApiUtils from "./ApiUtils";
import Item from "./Item";
import ItemForm from "./ItemForm";
import ItemModel from "./ItemModel";
import Modal from "./Modal";
import ItemUpdateForm from "./ItemUpdateForm";
import {parsePriority} from './helper';

class ListContext extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.handleCreateInputChange = this.handleCreateInputChange.bind(this);
        this.handleUpdateInputChange = this.handleUpdateInputChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            items: [],
            createdItem: {
                title: "",
                description: "",
                priority: "low"
            },
            updatedItem: {
                title: "",
                description: "",
            },
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
                createdItem: {
                    ...this.state.createdItem,
                    title: event.target.value
                }
            })
        } else if (event.target.name === "description") {
            this.setState({
                createdItem: {
                    ...this.state.createdItem,
                    description: event.target.value
                }
            })
        } else if (event.target.name === "priority") {
            this.setState({
                createdItem: {
                    ...this.state.createdItem,
                    priority: event.target.value
                }
            })
        }
    }

    handleUpdateInputChange(event) {
        if (event.target.name === "title") {
            this.setState({
                updatedItem: {
                    ...this.state.updatedItem,
                    title: event.target.value
                }
            })
        } else if (event.target.name === "description") {
            this.setState({
                updatedItem: {
                    ...this.state.updatedItem,
                    description: event.target.value
                }
            })
        }
    }

    async addItem(event) {
        event.preventDefault();
        let createdItem = {...this.state.createdItem};
        createdItem.priority = parsePriority(createdItem.priority);
        let item = await this.apiUtils.addItem(createdItem); 
        this.setState({
            items: [...this.state.items, item]
        })
    }

    async updateItem(event) {
        event.preventDefault();
        let newItems = [...this.state.items];
        let index = newItems.findIndex((item) => item.id === this.state.updatedItem.id);
        let item = await this.apiUtils.updateItem(this.state.updatedItem);
        newItems[index] = item;
        this.setState({
            items: newItems,
        });
        this.toggleModal();
    }

    async toggleCompleted(id, _) {
        let index = this.state.items.findIndex((item) => item.id === id);
        let newItems = [...this.state.items];
        newItems[index].completed = !newItems[index].completed;
        await this.apiUtils.updateItem(newItems[index]);
        this.setState({
            items: newItems
        })
    }

    async deleteItem(id, _) {
        await this.apiUtils.deleteItem(id);
        this.setState({
            items: this.state.items.filter((item) => item.id !== id)
        })
    }

    openUpdateModal(id, _) {
        let index = this.state.items.findIndex((item) => item.id === id);
        this.setState({
            updatedItem: this.state.items[index],
        });
        this.toggleModal();
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
                            <Item key={item.id} id={item.id} title={item.title} description={item.description} completed={item.completed} toggleCompleted={this.toggleCompleted} deleteItem={this.deleteItem} openUpdateModal={this.openUpdateModal}/>
                        )
                    })}
                </ul>
                <ItemForm item={this.state.createdItem} addItem={this.addItem} handleInputChange={this.handleCreateInputChange}/>
                <Modal show={this.state.showModal} toggle={this.toggleModal}>
                    <ItemUpdateForm item={this.state.updatedItem} handleInputChange={this.handleUpdateInputChange} updateItem={this.updateItem}/>
                </Modal>
            </div>
        )
    }
}

export default ListContext;