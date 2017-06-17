import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Results extends Component {
	render() {
			let message = '';
			const percent = (this.props.score / this.props.questions.length * 100);
			if(percent >= 80) {
				message = 'Awesome job!';
			} else if(percent >= 60) {
				message = 'You did ok.';
			} else {
				message = 'You did horrible!';
			}

		return (
			<div className="well">
				<h4>You got {this.props.score} out of {this.props.questions.length} correct answers.</h4>
				<h1>{percent}% - {message}</h1>
				<hr />
				<a href='/ReactQuiz/'>Try again</a>
			</div>
		);
	}
}

export default Results