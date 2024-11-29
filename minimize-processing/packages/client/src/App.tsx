import { useCallback, useState } from "react";
import "./App.css";

function useFibonacci() {
  const [isCaluclating, setIsCalculating] = useState(false);
  const [resultData, setResultData] = useState<{
    result: number;
    duration: number;
  }>();

  const calculate = useCallback(
    (number: number) => {
      async function doCalculate(number: number) {
        setIsCalculating(true);
        const start = Date.now();
        try {
          const response = await fetch(`/api/${number}`);
          const { result } = (await response.json()) as { result: number };
          setResultData({ duration: Date.now() - start, result });
        } finally {
          setIsCalculating(false);
        }
      }
      void doCalculate(number);
    },
    [setIsCalculating, setResultData]
  );

  return {
    calculate,
    isCaluclating,
    resultData,
  };
}

function App() {
  const [number, setNumber] = useState<number>(0);
  const { calculate, isCaluclating, resultData } = useFibonacci();

  return (
    <>
      <h1>Calculate fibonacci</h1>
      <div className="card">
        <button onClick={() => calculate(number)}>Cacluate</button>
        <p>
          <input
            defaultValue={number}
            onBlur={(e) => setNumber(parseInt(e.target.value))}
          />
        </p>
        <p>Result: {resultData?.result}</p>
        <p>Duration: {resultData?.duration}</p>
      </div>
      {isCaluclating && <span className="loader"></span>}
    </>
  );
}

export default App;
