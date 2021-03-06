import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import * as statfunctions from '../staticfunctions'
import sha256 from 'js-sha256'

import "../styles/Dropdown.css"

export class Dropdown extends Component {


  renderDropdownElements(results){
    console.log("results")

    console.log(results)
    var title_query = this.props.query

    const isUrl = statfunctions.validURL(title_query)
    const isUrlNonExistent = (results == "empty")
    if(results !== "" && isUrl){
      if(isUrlNonExistent) {
        const link = "/resource/"+btoa(this.props.query)+"/addResource"
        return (
          <Link to={link}>
            <label className="option">
              <span className="dropdown-title animated fadeIn">
              <span className="label-bordered">
              <i class="far fa-file"></i> Add Resource</span>
               {" " + title_query}</span>
            </label>
          </Link>
        )
      } else {
        const link = "/resource/"+sha256(this.props.query)+"/reviews"
        return (
          <Link to={link}>
            <label className="option">
              <span className="dropdown-title animated fadeIn">
              <span className="label-bordered">
              <i class="fas fa-pen-square"></i> Inspect Resource</span>
               {" " + results.title}</span>
            </label>
          </Link>
        )
      }
    } else if(results.topics !== undefined){
      const isTopicNonExistent = results.topics.length == 0
      if(isTopicNonExistent) {
        const link = "/resource/tp_"+title_query+"/addResource"
        return (
          <Link to={link}>
            <label className="option">
              <span className="dropdown-title animated fadeIn">
                <span className="label-bordered">
                  <i class="fas fa-plus"></i> Add Topic</span>
                 {" " + title_query.charAt(0).toUpperCase() + title_query.slice(1)}</span>
            </label>
          </Link>)
      }
    }
  }

  renderDropdownResources(results){
     var title_query = this.props.query
     const resultsMerged = [].concat((results.topics !== undefined) ? results.topics.map(el => ({...el, type:"topic"})) : [], (results.resources !== undefined) ? results.resources.map(el => ({...el, type:"resource"})) : [])
     return resultsMerged.map(result => {
       //result.title.charAt(0).toUpperCase() + result.title.slice(1)
       const title = result.title
       var title_split = title.toLowerCase().split(this.props.query.toLowerCase())
       if(title_split[0]) {
         title_split[0] = title_split[0].charAt(0).toUpperCase() + title_split[0].slice(1)
       } else {
         title_query = title_query.charAt(0).toUpperCase() + title_query.slice(1)
       }
       console.log(result)
       const link = (result.type == "topic") ? "/path/"+result.id : "/resource/"+result.id+"/reviews"
       const faicon = (result.type == "topic") ? "fab fa-leanpub" : "fas fa-pen-square"
       return (
         <Link to={link}>
           <label className="option">
           <span className="dropdown-title animated fadeIn">
           <span className="label-bordered">
             <i class={faicon}></i> {(result.type == "topic") ? "Learn" : "Inspect Resource" }
             </span>
           &nbsp;{title_split[0]}<span style={{fontWeight:"bold"}}>{title_query}</span>{title_split[1]}
           </span>
         </label>
         </Link>
       )
     })
  }

  render() {
    const query = this.props.query || ""
    const results = this.props.results || ""

    return (
      <div id="Dropdown">

        <div className="aoyue-select animated zoomIn">
          {this.renderDropdownElements(results)}
          {this.renderDropdownResources(results)}
        </div>

      </div>
    );
  }
}
