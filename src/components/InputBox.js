
import React from 'react';


class InputBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputText: ""
        }

    }   

    updateText = (event) =>{
        this.setState({
            inputText: event.target.value
        });
    }

    resetText = (event) =>{
        if (event.keyCode === 13){ 
            this.setState({
                inputText: ""
            });
        }
    }
    

    render() {
        return (
            <div className="form-group">
              <br/>
              <h2>Todos</h2>
              <br/>
              <input type="text" className="form-control" placeholder="What's next?" onKeyDown={this.props.update} onKeyUp={this.resetText} onChange={this.updateText} value={this.state.inputText}/>
            </div>
        );
    }
}

export default InputBox;