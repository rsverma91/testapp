import React, { Component } from 'react';
import ModalComponent from './Modal.component.jsx';

class Task extends Component {
    constructor(props) {
        super();
        this.state = {
            data: props.data,
            isDescTxt: false,
            isTitleTxt: false,
            editData: {},
            editIndex: 0,
            isModal: false
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            data: nextProps.data
        })
    }
    editItem(e) {
        let index = e.target.getAttribute('data-index');
        if (!index) {
            return;
        }
        let itemData = JSON.parse(this.state.data);
        let editData = itemData[Number(index)];
        this.setState({
            isModal: true,
            editData,
            editIndex: Number(index)
        })
    }
    dragStartHandler(e) {
        e.dataTransfer.setData('task', e.currentTarget.id);
        e.dataTransfer.setData('fromTask', e.currentTarget.parentNode.getAttribute('data-tid'));

    }
    dragOverHandler(e) {
        e.preventDefault();
        if (e.type !== 'drop') {
            return;
        }
        var draggedId = e.dataTransfer.getData('task');
        let fromTask = e.dataTransfer.getData('fromTask');;
        if (this.props.tId === fromTask) {
            return;
        }
        // var draggedEl = document.getElementById(draggedId);
        let fromTaskIndex = Number(draggedId.split('_')[1]);
        let toTask = e.currentTarget.getAttribute('data-tid');
        //draggedEl.
        //draggedEl.parentNode.removeChild(draggedEl);
        //e.currentTarget.appendChild(draggedEl);
        this.props.updateList(fromTask, toTask, fromTaskIndex)
    }
    showTitleTxtBx() {
        this.setState({
            isTitleTxt: true
        })
    }
    showDesTxtBx() {
        this.setState({
            isDescTxt: true
        })
    }
    updateData() {
        this.setState({
            isTitleTxt: false,
            isDescTxt: false,
            isModal: false
        });
        // let title = this.refs.titleTxt ? this.refs.titleTxt.value :'';
        // let desc = this.refs.descTxt ? this.refs.descTxt.value : '';
        if (this.refs.titleTxt || this.refs.descTxt) {
            this.props.updateData(this.refs.titleTxt.value, this.refs.descTxt.value, this.props.tId, this.state.editIndex);
        }
    }
    removeData() {
        this.setState({
            isTitleTxt: false,
            isDescTxt: false,
            isModal: false
        });
        this.props.removeData(this.props.tId, this.state.editIndex);
    }
    onDragEnd(ev) {
        ev.preventDefault();
        this.props.updateState();
    }
    render() {
        let data = this.props.data ? JSON.parse(this.props.data) : [];
        let _this = this;
        return (
            <div>
                <ul data-tid={this.props.tId} onDragEnd={this.onDragEnd.bind(this)} onClick={this.editItem.bind(this)} onDragOver={this.dragOverHandler.bind(this)} onDrop={this.dragOverHandler.bind(this)}>
                    {
                        data.map(function (item, index) {
                            return (
                                <li key={index}
                                    id={_this.props.tId + '_' + index}
                                    data-index={index}
                                    className="task"
                                    draggable="true"
                                    onDragStart={_this.dragStartHandler.bind(_this)}>
                                    <div>{item.taskName}</div>
                                    <span>{item.taskDesc}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <ModalComponent isOpen={this.state.isModal} width="600" height="400">
                    <div className="edit-modal-wrap">
                        <div className="modal-title">Edit Item</div>
                        <div className="edit-modal">
                            <div>
                                <label className="title">Title</label>
                                <input ref="titleTxt" type="text" className={this.state.isTitleTxt ? '' : 'hide'} defaultValue={this.state.editData.taskName} />
                                <label title="click to edit" className={this.state.isTitleTxt ? 'info hide' : 'info'} onClick={this.showTitleTxtBx.bind(this)}>{this.state.editData.taskName}</label>
                            </div>
                            <div>
                                <label className="title">Desctription</label>
                                <input ref="descTxt" type="text" className={this.state.isDescTxt ? '' : 'hide'} defaultValue={this.state.editData.taskDesc} />
                                <label title="click to edit" className={this.state.isDescTxt ? 'info hid' : 'info'} onClick={this.showDesTxtBx.bind(this)}>{this.state.editData.taskDesc || 'click to add'}</label>
                            </div>
                            <div className="btn-wrap">
                                <button className="green" onClick={this.updateData.bind(this)}>Done</button>
                                <button className="red" onClick={this.removeData.bind(this)}>Remove Item</button>
                            </div>
                        </div>
                    </div>
                </ModalComponent>
            </div>
        );
    }
}

export default Task;
