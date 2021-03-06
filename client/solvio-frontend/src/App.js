import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// Visual elements
import { Panel } from './containers/Panel'
import { HeaderView } from './components/header-views'
import { SearchView } from './containers/SearchView'
import { Dropdown } from './components/Dropdown'
import { FooterView  } from './components/FooterView'
import { AddReview } from './components/AddReview'
import { AddResource} from './components/AddResource'
import { Path } from './components/Path'
import { Reviews } from './components/Reviews'
import { Topic } from './components/Topic'
import { MoreInfo } from './components/MoreInfo'
import { Profile } from './components/Profile'
import axios from 'axios'
import * as API from './apifunctions';

// Css
import './styles/styles.scss'

import { defaultPaths, defaultResources, defaultResource, defaultTopics } from './defaults'


class App extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			learningPaths: defaultPaths,
			pathIndex: 0,
			query: "",
			results: "",
			// for topic
			resources: defaultResources,
			// For resource
			resource: defaultResource,
			// For profile
			topicsLearned: defaultTopics
		}

		this.setResource = this.setResource.bind(this)
	}

	async updateQuery(query){
		if(query !== undefined){
			this.setState({ query })
			const results = await API.searchRequest(query)
			this.setState({ results })
		}
	}



	decPathIndex() {
		if (this.state.pathIndex !== 0) {
			this.setState({pathIndex: this.state.pathIndex - 1})
		}
	}

	incPathIndex() {
		if (this.state.pathIndex !== this.state.learningPaths.length - 1) {
			this.setState({pathIndex: this.state.pathIndex + 1})
		}
	}

	setResource(resource) {
		this.setState({ resource })
	}

	// Render the main application element
	render( ) {
		console.log(this.state)
		return (
			<div className = "flexify">
				<Router>
					<div>
						<header>
						  <Panel />
							<HeaderView
								id="header"
								title="Solvio Learn"
							/>
						</header>
						<div className="container">
							<Route path="/" exact render={props => <SearchView onPress={() => console.log("Enter pressed")} results={this.state.results} updateQuery={(query) => this.updateQuery(query)} />} />
							<Route path="/resource/:id/addReview" render={({match, history}) => (
								<AddReview
									id={this.state.resource.id}
									location={match}
									history={history}
									resourceID={this.state.resource.id}
									submitReview={this.submitReview}
								/>
							)} />
							<Route path="/resource/:id/reviews" render={({match}) => (
								<Reviews
									location={match}
								/>
							)} />
							<Route path="/topic/:id" render={({match}) => (
								<Topic
									location={match}
									setResource={this.setResource}
									resources={this.state.resources}
								/>
							)} />
							<Route path="/path/:id" render={({match}) => (
								<Path
									setResource={this.setResource}
									location={match}
									/*path={this.state.learningPaths[this.state.pathIndex]}
									decPathIndex={this.decPathIndex.bind(this)}
									incPathIndex={this.incPathIndex.bind(this)}*/
								/>
							)} />
							<Route path="/resource/:id/addResource" render={({match, history}) => (
								<AddResource
								location={match}
								history={history}
								/>
							)} />

							<Route path="/profile" render={() => (
								<Profile
									topicsLearned={this.state.topicsLearned}
									results={this.state.results}
									updateQuery={(query) => this.updateQuery(query)}
								/>
							)}/>

							<Route path="/about" render={() => (
								<MoreInfo />
							)}/>
						</div>
					</div>
				</Router>

				{/* <MainView>
					<Search updateQuery={(query) => this.updateQuery(query)}/>
					<Dropdown />
				</MainView> */}

				<FooterView />
			</div>
		)
	}
}

export default App
