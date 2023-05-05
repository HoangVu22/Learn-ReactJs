import "./App.css";
import { useState } from "react";
import UseEffect from "./UseEffect";
import UseRef from "./UseRef";
import UseMemo from "./UseMemo";
import UseReducer from "./UseReducer";
import UseReducer_recap from "./UseReducer_recap";

const gifts = ["CPU 19", "Ram 32G", "RGB keyboard"];

const courses = [
  {
    id: 1,
    name: "HTML, CSS"
  },
  {
    id: 2,
    name: "Javascipt"
  },
  {
    id: 3,
    name: " ReactJS"
  }
];

function App() {
  // Ex0:
  const [counter, setCounter] = useState(1)
  const handleIncrease = () => {
    setCounter(counter+1)
  }

  // Ex1: Random gift
  const [gift, setGift] = useState("");
  const randomGift = () => {
    const index = Math.floor(Math.random() * gifts.length);
    setGift(gifts[index]);
  };

  // Ex2: two way binding with input type 'text'
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleRegister = () => {
    //Call API
    console.log({ name, email });
  };

  // Ex3: two way binding with input type 'radio'
  const [checkedforRadio, setCheckedforRadio] = useState(1); // for input radio

  const handleSubmitRadio = () => {
    //Call API
    console.log({ ids: checkedforRadio });
  };

  // Ex4: two way binding with input type 'checkbox'
  const [checkedforCheckbox, setCheckedforCheckbox] = useState([]); // for input checkbox

  const handleSubmitCheckbox = () => {
    //Call API
    console.log({ ids: checkedforCheckbox });
  };

  const handleCheckbox = (id) => {
    setCheckedforCheckbox((prev) => {
      const isChecked = checkedforCheckbox.includes(id);
      if (isChecked) {
        return checkedforCheckbox.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Ex5: Todo List
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs")) ?? [];
    
    return storageJobs;
  });

  const handleSubmit = () => {
    setJobs((prev) => {
      const newJobs = [...prev, job];

      // Save to local storage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);

      return newJobs;
    });
    setJob("");
  };

  // ------------------------------- UseEffect ----------------------------------

  const [show, setShow] = useState(false)

  // ------------------------------- UseRef ----------------------------------
  

  return (
    <div className="App">
      {/* ---------------------------- useState -----------------------------*/}
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Increase</button>
      <br />
      <br />

      {/* EX1: */}
      <div className="EX1">
        <h3>Random Gift</h3>
        <h4>{gift || "no reward yet"}</h4>
        <button onClick={randomGift}>Get gift</button>
      </div>
      <br />
      <br />

      {/* EX2: */}
      <div className="EX2">
        <h2>Submit name, email</h2>
        <div>
          <label name="name"> Name </label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div>
          <label name="email"> Email </label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <button onClick={handleRegister}>Register</button>
      </div>
      <br />
      <br />

      {/* EX3: */}
      <div className="EX3">
        <h2>Input radio</h2>
        {courses.map((course, index) => (
          <div key={course.id}>
            <input
              type="radio"
              checked={checkedforRadio === course.id}
              onChange={() => setCheckedforRadio(course.id)}
            />
            {course.name}
          </div>
        ))}
        <button onClick={handleSubmitRadio}>Submit</button>
      </div>
      <br />
      <br />

      {/* EX4: */}
      <div className="EX4">
        <h2>Input checkbox</h2>
        {courses.map((course, index) => (
          <div key={course.id}>
            <input
              type="checkbox"
              checked={checkedforCheckbox.includes(course.id)}
              onChange={() => handleCheckbox(course.id)}
            />
            {course.name}
          </div>
        ))}
        <button onClick={handleSubmitCheckbox}>Submit</button>
      </div>
      <br />
      <br />

      {/* EX5: */}
      <div>
        <h2>Todo List</h2>
        <input value={job} onChange={(e) => setJob(e.target.value)} />
        <button onClick={handleSubmit}>Add</button>

        <ul>
          {jobs.map((job, index) => (
            <li key={index}>{job}</li>
          ))}
        </ul>
      </div>

      {/* ---------------------------- useEffect -----------------------------*/}
      <div>
        <h1>Sử dụng useEffect</h1>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <UseEffect/>}
      </div>

      {/* ---------------------------- useRef -----------------------------*/}
      <div>
        <h1>Sử dụng useRef</h1>
        <UseRef/>
      </div>

      {/* ---------------------------- useMemo -----------------------------*/}
      <div>
        <h1>Sử dụng useMemo</h1>
        <UseMemo/>
      </div>

      {/* ---------------------------- useReducer -----------------------------*/}
      <div>
        <h1>Sử dụng useReducer</h1>
        <UseReducer />
        <UseReducer_recap/>
      </div>
    </div>
  );
}

export default App;

