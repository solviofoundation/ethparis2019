import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import '../styles/Resource.scss'

export class Resource extends Component {
    render() {
        const { data, setResource } = this.props

        let duration

        if (data.length > 60) {
            duration = Math.floor(data.length / 60) + ' hours'
        } else {
            duration = data.length + ' min'
        }

        const quality = data.quality / 20

        return (
            <div className="resource">
                <div className="titleAndTopic">
                    <span className="title">{data.title}</span>
                    <span ref="description" className="topic">{data.topic}</span>
                </div>
                <div className="right">
                    <div className="durationAndQuality">
                        <div className="duration">
                            <img src="https://image.flaticon.com/icons/svg/59/59252.svg" className="icon"/> {duration}
                        </div>
                        <div className="quality">
                            <img src="https://image.flaticon.com/icons/svg/118/118669.svg" className="icon"/> {quality}
                        </div>
                    </div>
                    <div className="buttons">
                        <Link to="/resource/addReview">
                            <button className="btn btn-review" onClick={data => setResource({data})}>Review</button>
                        </Link>
                        <a href={data.url} target="_blank">
                            <button className="btn btn-open">Open</button>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
