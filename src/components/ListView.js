import React from 'react';
import InputBox from './InputBox';
import TodoModel from '../data-model/TodoModel';
import {InputGroup} from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

class ListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {           
            list: [],
            count: 0,
            id: 0,
            select: "all"
        }

    }   


    updateList = (event) =>{
        if (event.keyCode === 13){  
            this.state.list.push(new TodoModel(this.state.id ,event.target.value, false, false))         
            this.setState({
                list: this.state.list,
                count: this.state.count+=1,
                id: this.state.id+=1,
            }); 
        }       
    }

   
    deleteTask = (id, isDone) =>{
        const task = this.state.list.find(todo => todo.id === id)
        if (task.isCompleted =  isDone){            
            this.setState({
                list: this.state.list.filter(todo => todo.id !== id)
            });
        }else{
            confirmAlert({
                title: 'Confirm to delete unfinished task: ',
                message: 'Are you sure you want to delete an unfinished task?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => this.setState({
                        list: this.state.list.filter(todo => todo.id !== id),
                        count: this.state.count-=1
                    })
                  },
                  {
                    label: 'No',
                  }
                ]
              })
        } 
    }
   
    complete = (id, isDone) =>{
       
        this.state.list.find(todo => todo.id === id).isCompleted =  isDone ? false:true
        this.setState({               
            list: this.state.list,
            count: isDone ? this.state.count+=1:this.state.count-=1
        });
    }

    showX = (id, show)=>{
        this.state.list.find(todo => todo.id === id).isShow = show
        this.setState({               
            list: this.state.list,
        });
    }
   
    filterSelect = (selected) =>{
        this.setState({               
            select: this.state.select= selected
        });
    }

    render() {

        const list = this.state.list;

        let filterList = list
        if(this.state.select == "active" ){
            filterList = list.filter(item => (item.isCompleted==false))
        }else if(this.state.select == "completed"){
            filterList = list.filter(item => (item.isCompleted==true))
        }
        const todoList = filterList.map((todo, index) =>
            <div key={index} >
                <InputGroup onMouseOver={()=>this.showX(todo.id,true)} onMouseOut={()=>this.showX(todo.id, false)} className="mb-3 input-group">
                    <InputGroup.Prepend >
                    <InputGroup.Checkbox aria-label="Checkbox" value={todo.isCompleted} onClick={()=>this.complete(todo.id,todo.isCompleted)} checked={todo.isCompleted} />
                    </InputGroup.Prepend> 
                    <h3 className={todo.isCompleted? "done": ""}>{todo.text} </h3>
                    <button style= {{"visibility":  todo.isShow ?  "visible": "hidden" }} type="button" className="close" onClick={()=>this.deleteTask(todo.id,todo.isCompleted)} aria-label="Close"> <span aria-hidden="true" >&times;</span> </button>
                </InputGroup>                
            </div>
            );

        return (
            <div>
                <InputBox update={this.updateList}/>
                {todoList}
                <div className="footer">
                    <h3>{this.state.count} tasks left</h3>
                    <div className="selector">
                        <button type="button" onClick={()=>this.filterSelect("all")}> <h5 className={this.state.select === "all" ? "selected":""}>All</h5> </button>
                        <button type="button" onClick={()=>this.filterSelect("active")}> <h5 className={this.state.select === "active" ? "selected":""} >Active</h5> </button>
                        <button type="button" onClick={()=>this.filterSelect("completed")}> <h5 className={this.state.select === "completed" ? "selected":""}>Completed</h5> </button>
                    </div>
                </div>               
            </div>
        );
    }
}

export default ListView;