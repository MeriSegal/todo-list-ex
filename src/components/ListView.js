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
            this.state.list.push(new TodoModel(this.state.id ,event.target.value, false))         
            this.setState({
                list: this.state.list,
                count: this.state.count+=1,
                id: this.state.id+=1,
            }); 
        }       
    }

    complete = (id, isDone) =>{
       
        this.state.list.find(todo => todo.id === id).isCompleted =  isDone ? false:true
        this.setState({               
            list: this.state.list,
            count: isDone ? this.state.count+=1:this.state.count-=1
        });
    }
   

    render() {

        const todoList = this.state.list.map((todo, index) =>
            <div key={index} >
                <InputGroup className="mb-3 input-group">
                    <InputGroup.Prepend>
                    <InputGroup.Checkbox aria-label="Checkbox" value={todo.isCompleted} onClick={()=>this.complete(todo.id,todo.isCompleted)} checked={this.value} />
                    </InputGroup.Prepend> 
                    <h3 className={todo.isCompleted? "done": ""}>{todo.text} </h3>
                    
                </InputGroup>
                <h1></h1>
            </div>
            );

        return (
            <div>
                <InputBox update={this.updateList}/>
                {todoList}
                <h3>{this.state.count} tasks left</h3>
            </div>
        );
    }
}

export default ListView;