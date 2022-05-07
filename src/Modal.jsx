import React from "react";
import "./Modal.css";

class Modal extends React.Component {
    render() {
        if (this.props.show) {
            return(
                <div className="modal-wrapper">
                    <div className="modal-container">
                    <div>
                        {this.props.children}
                    </div>
                    <button onClick={this.props.toggle}>Close</button>
                    </div>
                </div>
            )
        }
        return null;
    }
}

export default Modal;