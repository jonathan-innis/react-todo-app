import React from "react";

class Modal extends React.Component {
    render() {
        if (this.props.show) {
            return(
                <div>
                    <div>
                        {this.props.children}
                    </div>
                    <button onClick={this.props.toggle}>Close</button>
                </div>
            )
        }
        return null;
    }
}

export default Modal;