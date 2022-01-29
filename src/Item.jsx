import React from "react";

class Item extends React.Component {
    render() {
        return (
            <li>{this.props.title}</li>
        )
    }
}

export default Item;