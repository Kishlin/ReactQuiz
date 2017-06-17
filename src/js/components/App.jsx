import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Question from './quiz/Question.jsx';
import Scorebox from './quiz/Scorebox.jsx';
import Results from './quiz/Results.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count:     10,
			questions: [],
			current:   0,
			score:     0
		}

		this.nextQuestion = this.nextQuestion.bind(this);
		this.getQuestions = this.getQuestions.bind(this);
	}

	nextQuestion(correct) {
		const current = this.state.current + 1;
		const score = correct ? this.state.score + 1 : this.state.score;
		this.setState({
			current: current,
			score:   score
		});
	}

	getQuestions() {
		var request = new Request('https://opentdb.com/api.php?type=multiple&amount=' + this.state.count);

		fetch(request)
		.then(function(response) {
			if(response.ok) {
				let questions = [];

				response
				.json()
				.then(function(data) {
					this.setState({questions: data.results})
				}.bind(this));
			} else {
				alert('Questions couldn\' be loaded.');
			}
		}.bind(this));
	}

	componentDidMount() {
		this.getQuestions();
	}

	render() {
		if(!this.state.questions.length) {
			return (<p>Questions are loading...</p>);
		} 

		if(this.state.questions.length > this.state.current) {
			let question = this.state.questions[this.state.current];
			return ( 
				<div>
					<Question {...this.state} question={question} nextQuestion={this.nextQuestion} /> 
					<Scorebox {...this.state} />
				</div>
				);
		}

		return <Results {...this.state} />;
	}
}

export default App