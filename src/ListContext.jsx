import React from "react";
import ApiUtils from "./ApiUtils";
import ListItem from "./ListItem";
import ItemForm from "./ItemForm";
import Modal from "./Modal";
import './ListContext.css';
import ItemUpdateForm from "./ItemUpdateForm";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);

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
            showCreateModal: false,
            showUpdateModal: false,
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

    toggleCreateModal() {
        this.setState((state, ) => ({
            showCreateModal: !state.showCreateModal
        }));
    }

    toggleUpdateModal() {
        this.setState((state, ) => ({
            showUpdateModal: !state.showUpdateModal
        }))
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.items.map((item) => {
                        return (
                            <ListItem key={item.id} id={item.id} title={item.title} description={item.description} completed={item.completed} toggleCompleted={this.toggleCompleted} deleteItem={this.deleteItem} openUpdateModal={this.openUpdateModal}/>
                        )
                    })}
                </ul>
                <Modal show={this.state.showCreateModal} toggle={this.toggleCreateModal}>
                    <ItemForm item={this.state.createdItem} addItem={this.addItem} handleInputChange={this.handleCreateInputChange}/>
                </Modal>
                <Modal show={this.state.showUpdateModal} toggle={this.toggleUpdateModal}>
                    <ItemUpdateForm item={this.state.updatedItem} handleInputChange={this.handleUpdateInputChange} updateItem={this.updateItem}/>
                </Modal>
                <FontAwesomeIcon className="add-item-icon" icon={faPlusCircle} onClick={this.toggleCreateModal}/>
            </div>
        )
    }
}

export default ListContext;