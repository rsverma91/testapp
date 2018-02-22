import React, { Component } from 'react';


class AddNew extends Component {
    constructor() {
        super();
        this.state = {
            isShowAddItemBlock: false
        };
    }
    showAddItemBlock() {
        this.setState({
            isShowAddItemBlock: true
        })
    }
    discardItem() {
        this.setState({
            isShowAddItemBlock: false
        })
    }
    addItem() {
        let taskName = this.refs.task_text.value;
        if (!taskName) {
            return;
        }
        let pushData = this.props.data ? JSON.parse(this.props.data) : [];
        pushData.push({
            taskName
        });
        localStorage.setItem(this.props.tId, JSON.stringify(pushData));
        this.setState({
            isShowAddItemBlock: false
        })
        this.props.addItemClick(this.props.tId, pushData);
    }
    render() {
        return (
            this.state.isShowAddItemBlock ?
                (<div className="add-item-block">
                    <textarea type="text" ref="task_text" />
                    <button className="add-item" onClick={this.addItem.bind(this)}>ADD</button>
                    <button className="discard-item" onClick={this.discardItem.bind(this)}>X</button>
                </div>) :
                (<a className="add-new" onClick={this.showAddItemBlock.bind(this)}>Add a Card</a>)
        );
    }
}

export default AddNew;
