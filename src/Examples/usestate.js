import React, { useState } from 'react'
import './App.scss';

// Если мы получаем начальнео состояние не как значение, а хотим его вычислить
// При каждом изменении стейта, функция будет вызываться каждый раз, это плохо влияет на производительность
function computeInitialCounter() {
  console.log('Some calculations');
  return Math.trunc(Math.random() * 20);
}

function App() {
  // useState нельзя использовать в if()

  // Как параметр - передаем начальное состояние элемента
  // useState возвращает кортеж, где arr[0] - state, который мы должны помещать в шаблон, а arr[1] - функция, изменяющая этот state
  // Поэтому запись в виде массива - мастхев
  // const [counter, setCounter] = useState(0);

  // const [counter, setCounter] = useState(computeInitialCounter());
  // Оптимизация верхней строчки, чтобы она не вызывалась каждый раз
  const [counter, setCounter] = useState(() => {
    return computeInitialCounter();
  });

  // Пример работы с объектами
  const [state, setState] = useState({
    title: 'Счетчик',
    date: Date.now()
  });

  function increment() {
    // setCounter(counter + 1);
    // useState - асинхронаая, поэтому, если мы вызовем setCounter 2 раза, он сработает один раз, и прибавится только 1
    // setCounter(counter + 1);

    // Но через callback-функцию, мы обращаемся к предыдущему состоянию state'a, а не к самому state'y, поэтому теперь счетчик увеличится на 2
    setCounter(prevCounter => {
      return prevCounter + 1;
    });
    // setCounter(prev => prev + 1);
  }

  function decrement() {
    setCounter(counter - 1);
  }

  function updateTitle() {
    // правильная работа с объектом в функции, чтобы он не переписался: на основе предыдущего состояния, возвращаем все поля старого объекта и меняем нужные
    setState(prev => {
      return {
        ...prev,
        title: 'Новое название'
      };
    });
  }

  return (
    <div className="container">
      <h1>Счетчик: { counter }</h1>
      <button className="btn btn-success" onClick={ increment }>Добавить</button>
      <button className="btn btn-danger" onClick={ decrement }>Убрать</button>
      <button className="btn btn-default" onClick={ updateTitle }>Изменить название</button>

      {/* Выводим JSON в виде текста */}
      <pre>{ JSON.stringify(state, 2) }</pre>
    </div>
  );
}

export default App;