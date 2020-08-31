import React from 'react';

export default class Anytext extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    render()
    {
        return(
            <input type="text" className={this.props.className} name={this.props.name} value={this.state.value} onChange={this.handleChange} />
        );
    }
}