import React, { Fragment } from 'react';
import './App.css';
import Header from './Components/Header.js';
import Footer from './Components/Footer.jsx';
import Anytext from './Components/Anytext.jsx';
import Mathspace from './Components/Mathspace.jsx';
import ReorderableList from './Components/ReorderableList';


import { render } from '@testing-library/react';
import latex from './lib/latex.js';
import PathChooser from './Components/PathChooser';

const fs = window.require('fs');





export default class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {pending:false};

  }
  handleSubmit(e)
  {
    e.persist();
    e.preventDefault();
    if (!this.state.pending && e.nativeEvent.submitter.tagName === "INPUT") {
      this.setState({pending:true});
      latex.save(e.target).then(() => this.setState({pending:false}));
    }
      

  }

  render(){
    return (

      <form className="App" onSubmit = {this.handleSubmit}>
        <Header saveIcon = {this.state.pending}/>
        <div>
          <Anytext name="name" />
          <Anytext name="title" />
          <Anytext name="date"  />
          <Anytext name="fileName" />
          <PathChooser name="directory" />

        </div>
          <ReorderableList  ListComponent= { () => 
            <React.Fragment>
              <Mathspace name="math"/>
              <Anytext name="text" className="Comment"/>
            </React.Fragment>
          } 
          withIcons 
          />

        <input type= "submit" value="Save" />

        <Footer/>
      </form>
    );
  }
 
}

