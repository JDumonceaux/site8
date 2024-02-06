import './groceryList.css';

import { useState } from 'react';

import { IItem } from './IItem';
import List from './List';

const GroceryList = () => {
  const [items, setItems] = useState<IItem[] | undefined>([
    { id: 1, checked: true, item: 'Item 1' },
    { id: 2, checked: true, item: 'Item 2' },
    { id: 3, checked: false, item: 'Item 3' },
  ]);
  // JSON.parse(localStorage.getItem("shoppinglist"))
  // const [newItem, setNewItem] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [search, setSearch] = useState("");

  const setAndSaveItems = (newItems: IItem[] | undefined) => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  };

  // const addItem = (item: IItem) => {
  //   const id = items.length ? items[items.length - 1].id + 1 : 1;
  //   const myNewItem = { id, checked: false, item };
  //   const listItems = [...items, myNewItem];
  //   // setAndSaveItems(listItems);
  // };

  const handleCheck = (id: number) => {
    const listItems = items?.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setAndSaveItems(listItems);
  };

  const handleDelete = (id: number) => {
    const listItems = items?.filter((item: { id: number }) => item.id !== id);
    setAndSaveItems(listItems);
  };

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   if (!newItem) return;
  //   //addItem(newItem);
  //   setNewItem("");
  // };

  return (
    <div>
      {/* <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} /> */}
      <List
        // items={items?.filter((item) =>
        //   item.item.toLowerCase().includes(search.toLowerCase())
        // )}
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default GroceryList;
