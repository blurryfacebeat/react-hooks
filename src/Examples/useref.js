import React, { useState, useEffect, useRef } from 'react'
import './App.scss';

// Плохо, потому что пермененная вне реакта
// let renderCount = 1;

function App() {
  // Считаем, сколько раз рендерили компонент
  // const [renderCount, setRenderCount] = useState(1);

  const [value, setValue] = useState('initial');
  // Если хотим сохранить что-то между рендерами, и не хотим это перерисовывать, то используем useRef
  const renderCount = useRef(1);
  // С помощью useRef можно получать ссылки на DOM-элементы
  const inputRef = useRef(null);
  // Можем получать прошлое состояние state'a
  const prevValue = useRef('');

  // Попадаем в бесконечную петлю рендера, потому что когда меняем стейт таким образом, то говорим повторно, что нужно перерендерить
  useEffect(() => {
    // setRenderCount(prev => prev + 1);
    renderCount.current++;
    console.log(inputRef.current.value);
  });

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  const focus = () => inputRef.current.focus();

  return (
    <div className="container">
      <h1>Количество рендеров: { renderCount.current }</h1>
      <h2>Прошлое состояние: { prevValue.current }</h2>
      {/* При каждом изменении вызывается рендер компонента */}
      <input ref={ inputRef } type="text" onChange={ e => setValue(e.target.value) } value={ value } />
      <button className="btn btn-success" onClick={ focus }>Фокус</button>
    </div>
  );
}

export default App;