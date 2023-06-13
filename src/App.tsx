import { useEffect, useState } from 'react';
import './App.css';

function App() {

	const [count, setCount] = useState<number | string>(0);
	const [countMax, setCountMax] = useState<number>(0);
	const [countStart, setCountStart] = useState<number>(0);

	let settingCount = { countMax, countStart }

	// useEffect(() => {
	// 	let countValue = localStorage.getItem('count')
	// 	if (countValue) {
	// 		let newCount = JSON.parse(countValue)
	// 		setCount(newCount)
	// 	}
	// }, [])

	useEffect(() => {
		localStorage.setItem('count', JSON.stringify(count));
	}, [count]);

	const incCounter = () => {
		setCount(+count + 1)
	}

	const resetCounter = () => {
		setCount(0)
	}

	const setSettingCounter = () => {
		localStorage.setItem('setting', JSON.stringify(settingCount))

	}

	let setDisabled = false
	let incDisabled = false
	let resetDisabled = false

	useEffect(() => {
		let getSettingCount = localStorage.getItem('setting')
		if (getSettingCount) {
			let newSetting = JSON.parse(getSettingCount)
			setDisabled = (countStart >= countMax) || ((countMax === +newSetting.countMax) && (countStart === +newSetting.countStart))
			incDisabled = (countStart >= countMax) || !setDisabled
			resetDisabled = (countStart >= countMax) || !setDisabled
		}
	}, [countStart, countMax])



	return (
		<div className="App">

			<div className="left">

				<div className="item-top">
					<div className="item">
						<span>max value</span>
						<input type="number" value={countMax} onChange={(e) => setCountMax(parseInt(e.currentTarget.value))} />
					</div>
					<div className="item">
						<span>start value</span>
						<input type="number" value={countStart} onChange={(e) => setCountStart(parseInt(e.currentTarget.value))} />
					</div>
				</div>

				<div className="item-bottom">
					<button disabled={setDisabled} onClick={setSettingCounter}>set</button>
				</div>

			</div>

			<div className="right">

				<div className="item-top">
					<div className="item">
						<div className="count">{count}</div>
					</div>
				</div>

				<div className="item-bottom">
					<button disabled={incDisabled} onClick={incCounter}>inc</button>
					<button disabled={resetDisabled} onClick={resetCounter}>reset</button>
				</div>

			</div>

		</div>
	);
}

export default App;
