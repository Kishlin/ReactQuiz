import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as _ from 'underscore';

class Question extends Component {
	onChange(e) {
		e.target.checked = false;
		const {nextQuestion, question} = this.props;

		const selected = e.target.value;
		const correct = (selected == question.correct_answer);

		nextQuestion(correct);
	}

	shuffle(a) {
	    for (let i = a.length; i; i--) {
	        let j = Math.floor(Math.random() * i);
	        [a[i - 1], a[j]] = [a[j], a[i - 1]];
	    }

	    return a;
	}

	render() {
		const question = this.props.question;

		let answers = question.incorrect_answers.concat(question.correct_answer);
		answers = this.shuffle(answers);
		const buttons = answers.map((answer, index) => (
			<li key={index} className="list-group-item" >
				<input type="radio" onChange={this.onChange.bind(this)} name={index} value={answer} /> {answer}
			</li>
		));

		return (
			<div className="question well">
				<h3>{_.unescape(question.question)}</h3>
				<hr />
				<ul className="list-group">
					<form>
						{buttons}
					</form>
				</ul>
			</div>
		);
	}
}

export default Question