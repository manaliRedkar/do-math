import React from 'react';
import { Icon } from 'semantic-ui-react';

export default class Collapsible extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = { open: props.defaultOpen }
    }


    render()
    {
        const openable = !this.props.children || this.props.children.type != React.Fragment || !!this.props.children.props.children;
        return (
            <div className={"collapsible "+ (this.props.highlightAll && openable ? "highlight-all": "no-highlight")}>
                <div className={"collapse-item openable-" + openable} onClick={() => this.setState({ open: !this.state.open })}>
                    {this.props.title}
                    {openable ? <Icon className={"caret caret-" + (this.state.open ? "open" : "closed")} name="angle down" /> : <React.Fragment/>}
                </div>
                {openable ? <div className={this.state.open ? "collapsible-contents" : "hidden"}>{this.props.children}</div> : <React.Fragment />}
            </div>
        );
    }
}