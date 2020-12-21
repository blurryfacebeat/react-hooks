import React, { useState, useCallback } from 'react'
import './App.scss';
import ItemsList from './ItemsList';

export default function App() {
  const [colored, setColored] = useState(false);
  const [count, setCount] = useState(1);

  const styles = {
    color: colored ? 'darkred' : 'black'
  };

  // Чтобы не вы вызывалось, когда меняем цвет. useCallback полностью возращает обернутый объект
  const generateItemsFromAPI = useCallback(() => {
    // Создаем массив нужной длинны, заполненный элементами с текстом
    return new Array(count).fill('').map((_, idx) => `Элемент ${idx + 1}`)
  }, [count]);

  return (
    <div className="container">
      <h1 style={ styles }>Количество элементов: { count }</h1>
      <button onClick={ () => setCount(prev => prev + 1) } className={'btn btn-success'}>Добавить</button>
      <button onClick={ () => setColored(prev => !prev) } className={'btn btn-warning'}>Изменить</button>

      <ItemsList getItems={generateItemsFromAPI} />
    </div>
  );
}