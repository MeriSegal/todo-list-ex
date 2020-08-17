import React from 'react';
import InputBox from './InputBox';
import TodoModel from '../data-model/TodoModel';
import {InputGroup} from 'react-bootstrap'


class ListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {           
            list: [],
            count: 0,
            id: 0
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
            console.log("alert");
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
   

    render() {
 
        const todoList = this.state.list.map((todo, index) =>
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
                <div>
                    <h3>{this.state.count} tasks left</h3>
                    
                </div>               
            </div>
        );
    }
}

export default ListView;