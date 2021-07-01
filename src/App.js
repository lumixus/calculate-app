import { useState } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState(0);
  const [minResult, setMinResult] = useState(0);
  const [maxResult, setMaxResult] = useState(0);
  const [example, setExample] = useState([]);

  const meals = [
    {
      name : "Chicken Breast",
      type : "g",
      per : 100,
      forDayMinus : 0.25,
      proteinAmount : 22.5

    },
    {
      name : "Medium Egg",
      type : "count",
      per : 1,
      forDayMinus : 0.75,
      proteinAmount : 6.28
    }


  ]




  const formHandler = (e) => {
    e.preventDefault();
    let min = 0;
    let max = 0;
    let current = 0;
    let currentMeals = [];

    min = weight * 1.4;
    max = weight * 2.4;
    min = min.toFixed(2);
    max = max.toFixed(2);

    meals.map(m => {
      current = (max - ( max * m.forDayMinus) )  / (m.proteinAmount);
      current = current * m.per;
      current = current.toFixed(2);

      if(m.type === "count"){
        current = Math.floor(current);
      }


      currentMeals.push({name : m.name, need : current, type : m.type});

    })



    setMinResult(min);
    setMaxResult(max);
    setExample(currentMeals);



  }

  return (
    <div className="App">
      <div className="formWrapper container ">
        <div className="col-md-12">
          <div className="card">
     
            <div className="card-body">
          <h4 className="card-title">Protein Calculate Form</h4>

        <div className="form">
      <form onSubmit={e => formHandler(e)}>
          <div className="form-group mb-4 mt-4">
            <label htmlFor="weight">Your Weight</label>
            <input type="text" name="weight" id="weight" className="form-control" placeholder="Your Weight" onChange={(e) => setWeight(e.target.value)} />
          </div>
          
          <button className="btn btn-primary" type="submit">Calculate</button>


      </form>

      </div>
      {minResult !== 0 && maxResult !== 0 ? <div><h4 className="mt-4">Minimum protein per day : {minResult}g</h4> <h4>Maximum protein per day : {maxResult}g</h4>
      <ul className="list-group mt-4">
      {example ? example.map((e) => <li className="list-group-item">{e.name} , {e.need} {e.type === "g" ? "g" : null}</li>  ) : null }
      </ul>
      </div>   : null}

      </div>
      </div>
          </div>
      </div>
    </div>
  );
}

export default App;
