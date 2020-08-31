import React from 'react';
import { Icon } from 'semantic-ui-react';
import Anytext from './Anytext.jsx';
const { dialog } = {};//window.require('electron');
console.log(window.require('electron'))

export default class PathChooser extends React.Component{
    constructor(props)
    {
        super(props);
        this.pickFile = this.pickFile.bind(this);
    }

    pickFile()
    {
        var filepath = dialog.showOpenDialogSync({ properties: [ 'openDirectory'] });
        if (filepath)
            this.refs.inputref.setState({ value: filepath[0] })
    }

    render()
    {
        return (
            <div className="path-chooser">
                <Anytext ref="inputref" name={this.props.name} />
                <div className="icon-container">
                    <Icon onClick={this.pickFile} name="folder" />
                </div>
            </div>
        );
    }
}