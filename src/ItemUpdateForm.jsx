import React from "react"

class ItemUpdateForm extends React.Component {
    render() {
        return(
            <div>
                <form onSubmit={this.props.updateItem}>
                    <input name="title" value={this.props.title} onChange={this.props.handleInputChange}/>
                    <input name="description" value={this.props.description} onChange={this.props.handleInputChange}/>
                    <input type="submit" value="Update Item"/>
                </form>
            </div>
        )
    }
}

export default ItemUpdateForm;