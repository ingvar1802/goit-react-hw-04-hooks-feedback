import { useEffect, useState } from 'react';
import Section from './components/Section/Section';
import Statistics from './components/Statistics/Statistics';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOPtions';
import Notification from './components/Notification/Notification';


export default function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [total, setTotal] = useState(0);
	const [positive, setPositive] = useState('');

	const handleClick = event => {
    const { name } = event.target;

    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        break;
    }
	};
	
	useEffect(() => {
		setTotal(good + neutral + bad);
	}, [good, neutral, bad]);

	useEffect(() => {
		setPositive(`${((good / total) * 100).toFixed(2)}`);
	}, [good, total]);

	return (
		<>
			<Section title="Please leave feedback">
				<FeedbackOptions onLeaveFeedback={handleClick} />
			</Section>

			{total === 0 ? (
				<Notification message="No feedback given" />
			) : (
					<Section title="Statistics">
						<Statistics
							good={good}
							neutral={neutral}
							bad={bad}
							total={total}
							positivePercentage={positive}
						/>
					</Section>
				)}
		</>
	);
}

// export default class App extends Component {
// 	state = {
// 		good: 0,
// 		neutral: 0,
// 		bad: 0
// 	};

// 	countTotalFeedback = () => {
// 		const { good, neutral, bad } = this.state;
// 		const result = good + neutral + bad;
// 		return result;
// 	};

// 	countPositiveFeedbackPercentage = () => {
// 		const result = this.countTotalFeedback();
// 		const { good } = this.state;
// 		const percentage = (good * 100) / result;
// 		return Math.round(percentage);
// 	};

// 	onLeaveFeedback = (e) => {
// 		const name = e.target.name;
// 		this.setState((prevState) => ({
// 			[name]: prevState[name] + 1
// 		}));
// 	};
// 	render() {
// 		const { good, neutral, bad } = this.state;
// 		const total = this.countTotalFeedback();
// 		const positivePercentage = this.countPositiveFeedbackPercentage();

// 		const objKey = Object.keys(this.state);
// 		return (
			// <>
			// 	<Section title="Please leave feedback">
			// 		<FeedbackOptions options={objKey} onLeaveFeedback={this.onLeaveFeedback} />
			// 	</Section>

			// 	{total === 0 ? (
			// 		<Notification message="No feedback given" />
			// 	) : (
			// 		<Section title="Statistics">
			// 			<Statistics
			// 				good={good}
			// 				neutral={neutral}
			// 				bad={bad}
			// 				total={total}
			// 				positivePercentage={positivePercentage}
			// 			/>
			// 		</Section>
			// 	)}
			// </>
// 		);
// 	}
// }