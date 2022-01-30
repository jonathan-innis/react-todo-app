import React from "react";
import ApiUtils from "./ApiUtils";
import Item from "./Item";
import ItemForm from "./ItemForm";
import ItemModel from "./ItemModel";

class ListContext extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            items: []
        }
        this.apiUtils = new ApiUtils();
    }

    async componentDidMount() {
        let items = await this.apiUtils.getItems();
        this.setState({
            items: items
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async addItem(event) {
        event.preventDefault();
        let item = new ItemModel(this.state.title, this.state.description);
        item = await this.apiUtils.addItem(item);
        this.setState({
            items: [...this.state.items, item]
        })
    }

    async deleteItem(id, _) {
        await this.apiUtils.deleteItem(id);
        this.setState({
            items: this.state.items.filter((item) => item.id !== id)
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.items.map((item) => {
                        return (
                            <Item key={item.id} id={item.id} title={item.title} description={item.description} deleteItem={this.deleteItem}/>
                        )
                    })}
                </ul>
                <ItemForm title={this.state.title} description={this.state.description} addItem={this.addItem} handleInputChange={this.handleInputChange}/>
            </div>
        )
    }
}

export default ListContext;