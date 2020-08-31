import React from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';

addStyles();
export default class Mathspace extends React.Component{

    constructor(props)
    {
        super(props);

        this.state = {
            latex: '',
        }
    }

    render()
    {
        return(
            <React.Fragment>
                <EditableMathField
                    latex={this.state.latex} // latex value for the input field
                    onChange={(mathField) => this.setState({ latex: mathField.latex() })}
                />
                <input type="hidden" name={this.props.name} value={this.state.latex} />
            </React.Fragment>
        );
    }
}