import React from "react";

class Item extends React.Component {
    render() {
        return (
            <li>
                <p>{this.props.title}</p>
                <button onClick={this.props.deleteItem.bind(this, this.props.id)}>Delete</button>
            </li>
        )
    }
}

export default Item;