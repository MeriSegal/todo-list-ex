import React from 'react';
import InputBox from './InputBox';
import TodoModel from '../data-model/TodoModel';
import {InputGroup} from 'react-bootstrap'


class ListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: []
        }

    }   


    updateList = (event) =>{
        if (event.keyCode === 13){  
            this.state.list.push(new TodoModel(event.target.value, true))         
            this.setState({
                list: this.state.list
            }); 
        }       
    }

   

    render() {

        const todoList = this.state.list.map((todo, index) =>
            <div key={index} >
                <InputGroup className="mb-3 input-group">
                    <InputGroup.Prepend>
                    <InputGroup.Checkbox aria-label="Checkbox" value={false} onClick="" checked={this.value} />
                    </InputGroup.Prepend> 
                    <h3 >{todo.text}</h3>
                   
                </InputGroup>
                <h1></h1>
            </div>
            );

        return (
            <div>
                <InputBox update={this.updateList}/>
                {todoList}
            </div>
        );
    }
}

export default ListView;