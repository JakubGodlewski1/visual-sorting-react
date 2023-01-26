import './App.css';
import {useState} from "react";

function App() {
    const [numbers, setNumbers] = useState([])
    const [current, setCurrent] = useState(0)
    const [speed, setSpeed] = useState(5)
    const [sortingOn, setSortingOn]  = useState(false)

    //slow down the loop iteration
    const slowDown = (time) =>{return new Promise(resolve => setTimeout(resolve, time))}

    const createRandomChart = () => {
        if (!sortingOn) {
            const randomNumbers = []
            for (let i = 0; i < 30; i++) {
                randomNumbers.push(Math.floor(Math.random() * 99 + 1))
            }
            setNumbers(randomNumbers)
        }
    }

    const sortChart = async () => {
        if (!sortingOn){
            setSortingOn(true)
            //create a temporary copy of the numbers array so that it is much easier to update it.
            let temporaryArray = [...numbers]
            if (temporaryArray.length > 0){
                for (let j = 0; j < temporaryArray.length; j++) {
                    for (let i = 0; i < temporaryArray.length - j; i++) {
                        //if number 1 is bigger than nr 2, swap them
                        if (temporaryArray[i+1] && temporaryArray[i] > temporaryArray[i+1]){
                            const temporaryVar = temporaryArray[i+1]
                            temporaryArray[i+1] = temporaryArray[i]
                            temporaryArray[i] = temporaryVar
                            setNumbers(temporaryArray)
                        }
                        //update color of the current element
                        setCurrent((prevState)=>prevState < numbers.length-1-j ? prevState+1 : 0)
                        await slowDown(speed > 5 ? 100/speed : 200/speed)
                    }
                }
            }

            setCurrent(null)
            setSortingOn(false)
        }
    }

  return (
    <div className="App">
        <div className="container">
            <form className="form">
                <span>Speed (1-10)</span>
                <input min={1} max={10} onChange={(e)=>setSpeed(parseInt(e.target.value))} value={speed} type="number"/>
            </form>
            <button onClick={createRandomChart}  className="random">Create random chart</button>
            <button onClick={sortChart} className="sort">Sort the chart</button>
            <div className="chart-container">
                {numbers && numbers.map((number, i)=>{
                    return <div key={i} className={`element ${current===i ? "current" : ""}`} style={{height: `${number*0.9}%`}}></div>
                })}
            </div>
        </div>
    </div>
  );
}

export default App;
