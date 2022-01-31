import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

class Item extends React.Component {
    render() {
        return (
            <li>
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <FontAwesomeIcon icon={faTrashAlt} onClick={this.props.deleteItem.bind(this, this.props.id)}/>
                <FontAwesomeIcon icon={faEdit} onClick={this.props.openUpdateModal.bind(this, this.props.id)}/>
            </li>
        )
    }
}

export default Item;