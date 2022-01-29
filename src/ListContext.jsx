import React from "react";
import ApiUtils from "./ApiUtils";
import Item from "./Item";

const testItem = {
    title: "Test Item",
}

class ListContext extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);

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

    async addItem() {
        let item = await this.apiUtils.addItem(testItem);
        this.setState({
            items: [...this.state.items, item]
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.items.map((item, index) => {
                        return (
                            <Item key={index} title={item.title} />
                        )
                    })}
                </ul>
                <button onClick={this.addItem}>Add an Item</button>
            </div>
        )
    }
}

export default ListContext;