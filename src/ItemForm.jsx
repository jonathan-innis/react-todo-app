import React from "react";

class ItemForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.addItem}>
                <input type="text" name="title" placeholder="Title" value={this.props.item.title} onChange={this.props.handleInputChange}/>
                <input type="text" name="description" placeholder="Description" value={this.props.item.description} onChange={this.props.handleInputChange}/>
                <select name="priority" value={this.props.item.priority} onChange={this.props.handleInputChange}>
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input type="date" name="dueAt" value={this.props.item.dueAt} onChange={this.props.handleInputChange}/>
                <input type="submit" value="Add Item"/>
            </form>
        )
    }
}

export default ItemForm;