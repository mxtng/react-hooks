import React, { useState } from 'react';
import './App.css';

const fruitbasket = [
  {
    id: 1,
    name: 'Apple',
  },
  {
    id: 2,
    name: 'Orange',
  },
  {
    id: 3,
    name: 'Lemon',
  },
  {
    id: 4,
    name: 'Mango',
  },
];

const App = () => {
  console.log('Component Render: App');

  const [fruits, setFruits] = useState(fruitbasket);
  const [searchTerm, setSearchTerm] = useState('');

  const handleText = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (!searchTerm) {
      return;
    }

    setFruits(
      fruits.filter((fruit) =>
        fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const callbackHandle = React.useCallback(
    (name) => {
      if (!name) return;
      setFruits(fruits.filter((item) => item.name !== name));
    },
    [fruits]
  );

  return (
    <div>
      <h1>Fruit List</h1>
      <h3>
        <input
          id='searchTerm'
          type='text'
          value={searchTerm}
          onChange={handleText}
        />
        <button className='btn' onClick={handleSearch}>
          Search
        </button>
      </h3>
      <hr />
      <List list={fruits} removeItem={callbackHandle} />
    </div>
  );
};

const List = React.memo(({ list, removeItem }) => {
  console.log('Component Render: List');
  return list.map(({ id, ...item }) => (
    <Item key={id} {...item} removeItem={removeItem} />
  ));
});

const Item = React.memo(({ name, removeItem }) => {
  console.log('Component Render: Item');
  return (
    <div className='item'>
      {name}
      <button className='btn' onClick={() => removeItem(name)}>
        Remove
      </button>
    </div>
  );
});

export default App;
