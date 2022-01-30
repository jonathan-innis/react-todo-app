import React from "react";

class ItemForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.addItem}>
                <input type="text" name="title" placeholder="Title" value={this.props.title} onChange={this.props.handleInputChange}/>
                <input type="text" name="description" placeholder="Description" value={this.props.description} onChange={this.props.handleInputChange}/>
                <input type="submit" value="Add Item"/>
            </form>
        )
    }
}

export default ItemForm;