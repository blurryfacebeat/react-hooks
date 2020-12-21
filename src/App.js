import React, { useState, useEffect } from 'react';
import './App.scss';

// Кастомный хук, который будет следить за изменением переменной
function useLogger(value) {
  useEffect(() => {
    console.log('Value Changed', value);
  }, [value])
}

// Оптимизируем работу с input'ами
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = event => {
    setValue(event.target.value);
  }

  const clear = () => setValue('');

  return {
    // bind - нужно, чтобы добавить в input, чтобы он не получал лишних свойств
    bind: {value, onChange}, 
    value,
    clear
  }
}

export default function App() {
  const input = useInput('Денчик');
  const lastName = useInput('Петров');

  useLogger(input.value);

  return (
    <div className="container pt-3">
      <h1>{ input.value } { lastName.value }</h1>
      <hr />
      {/* <input type="text" value={ input.value } onChange={input.onChange} /> */}
      {/* Благодаря тому, что мы создали useInput, можем заюзать spread, так как поля имеют такое же название, как и атрибуты input */}
      <input type="text" {...input.bind} />
      <input type="text" {...lastName.bind} />
      <hr />
      <button className="btn btn-warning" onClick={() => input.clear()}>Очистить</button> 
    </div>
  );
}