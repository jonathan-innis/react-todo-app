import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ListItem.css';
import React from "react";

class ListItem extends React.Component {
    render() {
        return (
            <li>
                <input type="checkbox" checked={this.props.completed} onChange={this.props.toggleCompleted.bind(this, this.props.id)}/>
                <div>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                </div>
                <div className="list-icons">
                    <FontAwesomeIcon icon={faTrashAlt} onClick={this.props.deleteItem.bind(this, this.props.id)}/>
                    <FontAwesomeIcon icon={faEdit} onClick={this.props.openUpdateModal.bind(this, this.props.id)}/>
                </div>
            </li>
        )
    }
}

export default ListItem;