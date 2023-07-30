import React, { useEffect, useState } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";



const App = () => {
  const [expenses, setExpenses] = useState([]);

  const getExpenses = async () => {
    try{
      const response = await fetch('https://react-http-925d0-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json')
      
      if (!response.ok){
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      const transformedData = []

      for (const key in data){
        transformedData.push({
          id:key,
          amount:data[key].amount,
          title:data[key].title,
          date:new Date(data[key].date)
        })
      }

      setExpenses(transformedData)
      console.log(transformedData,"trans")
    }
    catch (err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getExpenses()
  },[])

  const addExpenseHandler = async (expense) => {
    try{
      const response = await fetch(
        "https://react-http-925d0-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok){
        throw new Error('Something Went wrong')
      }

      const data = await response.json()

      console.log(data)

    }
    catch (err){
      console.log(err)
    }

    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });

  };

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
