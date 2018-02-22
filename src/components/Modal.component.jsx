import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = { isModalOpen: false };
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            isModalOpen: newProps.isOpen
        });
    }
    render() {
        if (this.state.isModalOpen === false) {
            return null;
        }

        let modalStyle = {
            width: '300px',
            height: '300px',
            transform: 'translate(-50%, -50%)'
        };

        if (this.props.width && this.props.height) {
            modalStyle.width = this.props.width + 'px'
            modalStyle.height = this.props.height + 'px'
            modalStyle.marginLeft = '-' + (+this.props.width / 2) + 'px'
            modalStyle.marginTop = '-' + ((+this.props.height - 50) / 2) + 'px'
            modalStyle.transform = null
        }

        return (
            <div className={"modal fade-in"}>
                <div className={"modal-frame"} style={modalStyle}>
                    <div className="modal-cont">
                        {this.props.children}
                    </div>
                    <i className="icon-cross-round icon" onClick={this.hide.bind(this)}></i>
                </div>
                <div className={"bg-color"} onClick={this.props.closeOnBgClk && this.hide.bind(this)} />
            </div>
        )
    }
    show() {
        this.setState({
            isModalOpen: true
        });
    }
    hide() {
        if (!!this.props.onModalClose) {
            this.props.onModalClose();
        } else {
            this.setState({
                isModalOpen: false
            });
        }
    }
}

export default Modal;