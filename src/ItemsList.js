import React, { useState, useEffect } from 'react';

export default function ItemsList({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newItems = getItems();
    setItems(newItems);
    // Будет вызываться, когда будем менять цвет
    console.log('render');
  }, [getItems])

  return (
    <ul>
      { items.map(i => <li key={ i }>{ i }</li>) }
    </ul>
  )
}