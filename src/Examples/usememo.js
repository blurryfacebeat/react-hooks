import React, { useState, useMemo, useEffect } from 'react'
import './App.scss';

// Вызываем задержку, чтобы сделать симуляцию сложной, долгой функции, рендер будет долгим
function complexCompute(num) {
  let i = 0;
  while (i < 1000000000) i++;
  return num * 2;
}

function App() {
  const [number, setNumber] = useState(42);
  // Цвет тоже будет долго меняться, из-за complexCompute, так как мы заходим в нее при каждом рендере
  const [colored, setColored] = useState(false);

  // Сохраняем объект на некст рендер, чтобы не было проблемы ниже
  const styles = useMemo(() => ({color: colored ? 'darkred' : 'black'}), [colored]);

  // Если number не изменилась, нет смысла вызывать функцию еще раз (теперь цвет меняется сразу)
  const computed = useMemo(() => {
    return complexCompute(number);
  }, [number]);

  // При нажатии на убавить, например, эффект тоже задействуется, как фиксить - выше =>
  // Все дело в том, что styles - ссылка на объект, а она меняется каждый раз
  useEffect(() => {
    console.log('Styles Changed');
  }, [styles]);

  return (
    <div className="container">
      <h1 style={ styles }>Вычисляемое свойство: { computed }</h1>
      <button onClick={ () => setNumber(prev => prev + 1) } className={'btn btn-success'}>Добавить</button>
      <button onClick={ () => setNumber(prev => prev - 1) } className={'btn btn-danger'}>Убавить</button>
      <button onClick={ () => setColored(prev => !prev) } className={'btn btn-warning'}>Изменить</button>
    </div>
  );
}

export default App;