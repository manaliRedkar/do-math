import React from 'react';
import { Icon } from 'semantic-ui-react';

export default class ReorderableList extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state ={list:[]}
        this.key =0;
        this.remove = this.remove.bind(this);
        this.getDragProps = this.getDragProps.bind(this);
     }


     remove(key) {
        this.setState({ list: this.state.list.filter(props => props.key != key) })
     }

     getDragProps(key, idx) {
        return {
            onDragStart: () => this.setState({ currentDrag: key }),
            onDrop:() =>  this.setState({ currentDrag: -1 }),
            onDragOver:()=> {
                if (key == this.state.currentDrag)
                    return;
                let list = this.state.list.filter(props => props.key != this.state.currentDrag);
                list.splice(idx, 0, { key: this.state.currentDrag });
                this.setState({ list: list })
            }
        }
    }
  
    render()
    {
        return(
            <div className={"reorderable-list " + (this.props.containerClass || '')}>
                {this.state.list.map((entryProps,idx) => (
                    this.props.withIcons ?
                    (
                        <div className="row-entry" key={entryProps.key}>
                            <div className="icon-container" draggable {...this.getDragProps(entryProps.key, idx)}>
                                <Icon name = "move"/>
                            </div>
                            <this.props.ListComponent {...entryProps} />
                            <div className="icon-container" onClick={() => this.remove(entryProps.key)}> 
                                <Icon name = "trash"/>
                            </div>
                        </div> 
                    )
                    :
                    (
                        <this.props.ListComponent {...entryProps} 
                            dragProps={this.getDragProps(entryProps.key, idx)} 
                            removeProps={() => this.remove(entryProps.key)} 
                        />
                    )
                ))}
                {this.props.fixed ? <React.Fragment/> : <button id="add" onClick = {() => this.setState({ list: this.state.list.concat({ key: this.key++ })})}>ADD </button>}
            </div>
        )
    }
}

/*
<div draggable onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver}>Drag me</div>
<div draggable onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver}>Drag me</div>
<div draggable onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver}>Drag me</div>
<div draggable onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver}>Drag me</div>

state ={
    currentDrag:-1
}

onDragStart(key) {
    
}

onDrop() {
    this.setState({ currentDrag: -1 });
}

onDragOver(idx, draggedOverKey) {
    if (draggedOverKey == this.state.currentDrag)
        return;
    let schema = this.state.schema.filter(props => props.key != key);
    schema.splice(idx, 0, { key: this.state.currentDrag });
}



/*this.state.schema = [
    {
        fieldName: "name",
        dataType: "String",
        key: 0
    },
    {
        fieldName: "numBeds",
        dataType: "Integer",
        key: 1
    },
    {
        fieldName: "numPats",
        dataType: "Integer",
        key: 2
    }
]

/*const Schema = {
    "name": "String",
    "numBeds": "integer",
    "numPats": "integer"
}

let result = []

for (const key in Schema) {
    const val = Schema[key];
    result.push(<Entry fieldName={key} datatype={val} />)
}

result = Object.entries(Schema).map((fieldName, datatype, key) => <Entry fieldName datatype key />)

[
    <Entry fieldName="Name" datatype= "String"/>,
    <Entry fieldName="numPats" datatype= "Integer"/>,
    <Entry fieldName="numBeds" datatype= "Integer"/>
]*/