import { useRef, useState } from "react";
import './App.css'

function UseRef() {
    const [count, setCount] = useState(60)
    const [isBtnStartClick, setIsBtnStartClick] = useState(false);

    const timerId = useRef()

    const handleStart = () => {
        timerId.current = setInterval(() => {
            setCount(prev => prev - 1)
        }, 1000)
        setIsBtnStartClick(true);
    }
    const handleStop = () => {
        clearInterval(timerId.current)
        setIsBtnStartClick(false);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={handleStart} disabled={isBtnStartClick}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>    
    )
}

export default UseRef


