import React, { Component } from 'react';
import './App.css';

import TaskComponent from './components/Task.component.jsx';
import AddNewComponent from './components/AddNew.component.jsx';


class App extends Component {
  constructor() {
    super();

    localStorage.getItem('todoData') ? localStorage.getItem('todoData') : localStorage.setItem('todoData', '[]');
    localStorage.getItem('wipData') ? localStorage.getItem('wipData') : localStorage.setItem('wipData', '[]');
    localStorage.getItem('doneData') ? localStorage.getItem('doneData') : localStorage.setItem('doneData', '[]');
    this.state = {
      todoData: localStorage.getItem('todoData'),
      wipData: localStorage.getItem('wipData'),
      doneData: localStorage.getItem('doneData')
    }
    // this.state.todoData ? null : localStorage.setItem('todoData', '[]')
    // this.state.wipData ? null : localStorage.setItem('wipData', '[]')
    // this.state.doneData ? null : localStorage.setItem('doneData', '[]')
  }
  componentWillUpdate() {
  }
  addItemClick(tId, pushData) {
    this.setState({
      [tId]: JSON.stringify(pushData)
    });
  }
  updateList(fromTask, toTask, fromTaskIndex) {
    console.log(fromTask, toTask, fromTaskIndex);
    let fromData = JSON.parse(this.state[fromTask] || '[]');
    if (!fromData || !fromData.length) {
      return;
    }
    let toData = JSON.parse(this.state[toTask] || '[]');
    toData.push(fromData[fromTaskIndex]);
    fromData = fromData.filter(function (item, index) {
      return index !== fromTaskIndex
    });
    localStorage.setItem(fromTask, JSON.stringify(fromData));
    localStorage.setItem(toTask, JSON.stringify(toData));
    // this.setState({
    //   [fromTask]: JSON.stringify(fromData),
    //   [toTask]: JSON.stringify(toData)
    // })
  }
  updateData(titleTxt, descTxt, tId, editIndex) {
    let data = JSON.parse(this.state[tId]);
    data[editIndex].taskName = titleTxt;
    data[editIndex].taskDesc = descTxt;
    localStorage.setItem(tId, JSON.stringify(data));
    this.setState({
      [tId]: JSON.stringify(data)
    })
  }
  removeData(tId, editIndex) {
    let itemData = JSON.parse(this.state[tId]);
    itemData = itemData.filter(function (item, index) {
      return index !== editIndex
    });
    localStorage.setItem(tId, JSON.stringify(itemData));
    this.setState({
      [tId]: JSON.stringify(itemData)
    })
  }
  updateState() {
    this.setState({
      todoData: localStorage.getItem('todoData'),
      wipData: localStorage.getItem('wipData'),
      doneData: localStorage.getItem('doneData')
    })
  }
  render() {
    return (
      <div className="App">
        <header>hello world</header>
        <div className="content">

          <section className="todo">
            <label className="sec-title">Todo</label>
            <TaskComponent
              data={this.state.todoData}
              tId="todoData"
              updateList={this.updateList.bind(this)}
              updateData={this.updateData.bind(this)}
              removeData={this.removeData.bind(this)}
              updateState={this.updateState.bind(this)}
            />
            <AddNewComponent addItemClick={this.addItemClick.bind(this)} data={this.state.todoData} tId="todoData" />
          </section>

          <section className="wip">
            <label className="sec-title">Work in progress</label>
            <TaskComponent
              data={this.state.wipData}
              tId="wipData"
              updateList={this.updateList.bind(this)}
              updateData={this.updateData.bind(this)}
              removeData={this.removeData.bind(this)}
              updateState={this.updateState.bind(this)}
            />
            <AddNewComponent addItemClick={this.addItemClick.bind(this)} data={this.state.wipData} tId="wipData" />
          </section>

          <section className="done">
            <label className="sec-title">Done</label>
            <TaskComponent
              data={this.state.doneData}
              tId="doneData"
              updateList={this.updateList.bind(this)}
              updateData={this.updateData.bind(this)}
              removeData={this.removeData.bind(this)}
              updateState={this.updateState.bind(this)}
            />
            <AddNewComponent addItemClick={this.addItemClick.bind(this)} data={this.state.doneData} tId="doneData" />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
