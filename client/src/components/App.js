import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// For  components to call Action creator
import { connect } from 'react-redux';
import * as actions from '../actions/index';

// Importing components
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container-fluid">
						<Header />
						<div className="container">
							<Route exact path="/" component={Landing} />
							<Route
								exact
								path="/surveys"
								component={Dashboard}
							/>
							<Route path="/surveys/new" component={SurveyNew} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

// Passing Action Creators to App component as props
export default connect(null, actions)(App);
