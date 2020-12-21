import React, { useState, useEffect } from 'react'
import './App.scss';

function App() {
  const [type, setType] = useState('users');
  const [data, setData] = useState([]);
  const [pos, setPos] = useState({
    x: 0,
    y: 0
  });

  // Если используем его таким образом, то он будет вызываться каждый раз, когда происходит рендер компонента
  // useEffect(() => {
  //   console.log('Render');
  // });

  // В [] указываем то, от чего должен зависить useEffect
  // То есть, будем вызывать этот callback, только если state type изменился
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json => setData(json))

      // Будем чистить каждый раз, когда зайдем в этот эффект
      return () => {
        console.log('Clean Type');
      }
  }, [type]);

  // Выносим в отдельную функцию, чтобы потом удалить слушателя
  const mouseMoveHandler = event => {
    setPos({
      x: event.clientX,
      y: event.clientY
    });
  };

  // Эмуляция момента, когда компонент полностью зарандерился и готов к работе
  useEffect(() => {
    console.log('ComponentDidMount');

    // Добавляем в этот момент прослушивание
    window.addEventListener('mousemove', mouseMoveHandler);

    // Очищаем слушателя, когда закончится действие эффекта
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    }
  }, []);

  return (
    <div className="container">
      <h1>Ресурс: { type }</h1>

      <button onClick={ () => setType('users') } className="btn btn-success">Пользователи</button>
      <button onClick={ () => setType('todos') } className="btn btn-danger">Todos</button>
      <button onClick={ () => setType('posts') } className="btn btn-warning">Посты</button>

      {/* <pre>{ JSON.stringify(data, null, 2) }</pre> */}
      <pre>{ JSON.stringify(pos, null, 2) }</pre>
    </div>
  );
}

export default App;