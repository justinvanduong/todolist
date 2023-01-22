import * as React from 'react';
import styled from 'styled-components';

function App() {
  const [nextId, setNextId] = React.useState(
    parseInt(localStorage.getItem("nextId")) || 0
  );
  const [inputItem, setInputItem] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [quantInputItem, setQuantInputItem] = React.useState('');
  const [counter, setCounter] = React.useState(0);
  const [reccurCounter, setReccurCounter] = React.useState(0);
  const [list, setList] = React.useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [archivedList, setArchivedList] = React.useState(
    JSON.parse(localStorage.getItem("archivedList")) || []
  );
  const [radioValue, setRadioValue] = React.useState("Standard");
  localStorage.setItem("list", JSON.stringify(list));
  localStorage.setItem("archivedList", JSON.stringify(archivedList));
  localStorage.setItem("nextId", nextId);


  const handleAddSubmit = (event) => {
    switch (radioValue) {
      case 'Standard':
        setList([...list, { id: nextId, value: inputItem, priority: priority }])
        setNextId(nextId + 1)
        setInputItem('')
        setPriority('')
        event.preventDefault();
        break;
      case 'Quantitative':
        setList([...list,
        {
          id: nextId,
          value: inputItem,
          quantity: quantInputItem,
          counter: 0,
          priority: priority,
        }])
        setNextId(nextId + 1)
        setInputItem('')
        setQuantInputItem('')
        setPriority('')
        event.preventDefault();
        break;
      case 'Recurring':
        setList([...list,
        {
          id: nextId,
          value: inputItem,
          reccurCount: 0,
          recurring: true,
          priority: priority
        }])
        setNextId(nextId + 1)
        setInputItem('')
        setPriority('')
        event.preventDefault();
        break;
    }
  };

  const handleInputChange = (event) => {
    setInputItem(event.target.value)
  };

  const handleQuantChange = (event) => {
    if (isNaN(event.target.value)) {
      setQuantInputItem('')
      alert("Please enter a numeric value");
    } else {

      setQuantInputItem(parseInt(event.target.value))
    }
  };

  const handlePriorityChange = (event) => {
    if (isNaN(event.target.value)) {
      setPriority(0)
      alert("Please enter a numeric value");
    } else {
      setPriority(parseInt(event.target.value))
    }
  };

  const handleArchiveItem = (item) => {
    let filteredList = list.filter((items) => items.id !== item.id)
    setList(filteredList);
    if (!item.recurring) {
      setArchivedList([...archivedList,
      {
        id: item.id,
        value: item.value,
        quantity: item.quantity,
        priority: item.priority
      }])
    }
  }

  const handleReccurArchive = (item) => {
    item.reccurCount += 1;
    if (item.reccurCount === 1) {
      setArchivedList([...archivedList,
      {
        id: item.id + 1,
        value: item.value,
        priority: item.priority,
        reccurCount: item.reccurCount,
      }])
      setNextId(nextId + 1);
    } else {
      let archivedCopy = [...archivedList];
      archivedCopy.map((currentItem) => {
        console.log(currentItem)
        console.log(item)
        if (currentItem.id - 1 === item.id) {
          currentItem.reccurCount += 1;
        }
      })
      setArchivedList(archivedCopy)
    }
  }

  const handleUndoItem = (item) => {
    if (item.reccurCount > 1) {
      let archivedCopy = [...archivedList];
      archivedCopy.map((currentItem) => {
        console.log(currentItem)
        console.log(item)
        if (currentItem.id === item.id) {
          currentItem.reccurCount -= 1;
        }
      })
      setArchivedList(archivedCopy)
    } else {
      let filteredList = archivedList.filter((items) => items.id !== item.id)
      setArchivedList(filteredList);
      let listCopy = [...list,
      {
        id: item.id,
        value: item.value,
        quantity: item.quantity,
        priority: item.priority,
        counter: 0,
        reccurCount: 0
      }]
      listCopy.sort((a, b) => b.priority - a.priority);
      setList(listCopy)
    }
  }

  const handleDeleteItem = (item) => {
    if (item.reccurCount) {
      let filteredReccur = list.filter((items) => items.id !== item.id - 1)
      setList(filteredReccur)
    }
    let filteredList = archivedList.filter((items) => items.id !== item.id)
    setArchivedList(filteredList);
  }

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <div>
      <h1>TO DO LIST</h1>
      <FormContainer>
        <AddForm
          addItem={inputItem}
          quantValue={quantInputItem}
          priority={priority}
          onAddSubmit={handleAddSubmit}
          onPriorityChange={handlePriorityChange}
          onInputChange={handleInputChange}
          onQuantChange={handleQuantChange}
          onRadioChange={handleRadioChange}
          inputType={radioValue}
        />
      </FormContainer>
      <ListContainer>
        <List
          list={list}
          onArchiveItem={handleArchiveItem}
          setCounter={setCounter}
          setReccurCounter={setReccurCounter}
          setList={setList}
          counter={counter}
          reccurCounter={reccurCounter}
          archived={false}
          onReccurArchive={handleReccurArchive}
        />
      </ListContainer>
      <hr />
      <ArchivedListContainer>
        <h2>Archive</h2>
        <List
          list={archivedList}
          onUndoItem={handleUndoItem}
          onDeleteItem={handleDeleteItem}
          archived={true}
          setCounter={setCounter}
          reccurCounter={reccurCounter}
          setReccurCounter={setReccurCounter}
        />
      </ArchivedListContainer>
    </div>
  )
}

const AddForm = ({ addItem, onAddSubmit, priority, onRadioChange, inputType, onInputChange, onQuantChange, onPriorityChange, quantValue }) => (
  <form onSubmit={onAddSubmit}>
    <div className='radioGroup'>
      <input
        type="radio"
        defaultChecked
        label="Standard"
        value="Standard"
        onChange={onRadioChange}
        name="radioType"
      />Standard
      <input
        type="radio"
        label="Quantitative"
        value="Quantitative"
        onChange={onRadioChange}
        name="radioType"
      />Quantitative
      <input
        type="radio"
        label="Recurring"
        value="Recurring"
        onChange={onRadioChange}
        name="radioType"
      />Recurring
    </div>
    <div className='inputs'>
      {inputType === "Standard" &&
        <ItemType
          value={addItem}
          placeholder="What do you need to get done?"
          onInputChange={onInputChange}
          type="standard"
        />
      }
      {inputType === "Quantitative" &&
        <ItemType
          value={addItem}
          onInputChange={onInputChange}
          quantValue={quantValue}
          quantPlaceholder="How many?"
          placeholder="Of what?"
          onQuantChange={onQuantChange}
          type="quantitative"
        />
      }
      {inputType === "Recurring" &&
        <ItemType
          value={addItem}
          placeholder="What do you need to get done?"
          onInputChange={onInputChange}
          type="recurring"
        />
      }
      <input value={priority} placeholder="Priority" onChange={onPriorityChange}>
      </input>
      <button type="submit" disabled={!addItem}>
        Submit
      </button>
    </div>
  </form>
);


const ItemType = ({
  value,
  quantValue,
  onInputChange,
  onQuantChange,
  placeholder,
  quantPlaceholder,
  type }) => (
  <>
    {
      type === "quantitative" &&
      <input value={quantValue} onChange={onQuantChange} placeholder={quantPlaceholder} />
    }
    <input value={value} defaultChecked placeholder={placeholder} onChange={onInputChange} />
  </>
);


const List = ({
  list,
  onArchiveItem,
  onReccurArchive,
  onUndoItem,
  onDeleteItem,
  archived,
  setCounter,
  setReccurCounter,
  setList,
  counter,
  reccurCounter }) => (
  <ul>
    {list.sort((a, b) => b.priority - a.priority).map((item) => (
      <Item
        key={item.id}
        list={list}
        item={item}
        counter={counter}
        reccurCounter={reccurCounter}
        onArchiveItem={onArchiveItem}
        onReccurArchive={onReccurArchive}
        onUndoItem={onUndoItem}
        onDeleteItem={onDeleteItem}
        setCounter={setCounter}
        setReccurCounter={setReccurCounter}
        setList={setList}
        archived={archived}
      />
    ))}
  </ul>
);

const Item = ({
  item,
  onArchiveItem,
  onReccurArchive,
  onUndoItem,
  onDeleteItem,
  archived,
  setCounter,
  list }) => {
  const handleCounterChange = (e) => {
    setCounter(e.target.value)
    list.map((currentItem) => {
      if (currentItem.id === item.id) {
        currentItem.counter = e.target.value
      }
    })
  }

  const handleReccur = () => {
    list.map((currentItem) => {
      if (currentItem.id === item.id) {
        onReccurArchive(item)
      }
    })
  }

  return (
    <li>
      <span>
        {!item.recurring && item.quantity >= 0 && item.counter}
        {!archived && item.quantity && (<p>{item.value}</p>)}
        {!archived && item.quantity && <input type="range" min="0" max={item.quantity} value={item.counter} onInput={handleCounterChange}></input>}
        {!archived && !item.quantity && <p>{item.value}</p>}
        {archived && item.quantity && (<p>{item.quantity} {item.value}</p>)}
        {archived && !item.quantity && (<p>{item.value}</p>)}
        {archived && item.reccurCount && <p> x {item.reccurCount}</p>}
      </span>
      <span>
        {item.recurring && <button onClick={handleReccur} >Reccur</button>}
        {item.quantity === parseInt(item.counter) && !archived && <button onClick={() => onArchiveItem(item)}>
          Completed!
        </button>
        }
        {!item.quantity && !archived && <button onClick={() => onArchiveItem(item)}>
          Completed!
        </button>
        }
        {((archived && item.reccurCount > 1) || archived && !item.reccurCount) && <button onClick={() => onUndoItem(item)}>
          Undo
        </button>
        }
        {archived && <button onClick={() => onDeleteItem(item)}>
          Delete
        </button>
        }
      </span>
    </li>
  )
}


const ListContainer = styled.div`
  border: 5px solid black;
  margin: auto;
  text-align: center;
  li{
    display: flex;
    justify-content: space-between;
    height: 100%;
    border: 1px solid rgba(0,0,0,0.3)
  }
  span{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 50%;
    button{
      width: auto;
      height: 100%;
    }
    text-align: center;
  }
`;

const ArchivedListContainer = styled.div`
  border: 5px solid black;
  margin: auto;
  text-align: center;
  li{
    display: flex;
    justify-content: space-between;
    height: 100%;
    border: 1px solid rgba(0,0,0,0.3)
  }
  span{
    display: block;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    margin: auto;
    button{
      width: 100%;
      height: auto;
    }

    text-align: center;
  }
`;

const FormContainer = styled.div`
  border: 5px solid black;
  .radioGroup{
    display:flex;
    justify-content: space-evenly;
    width: 100%;
  }
  .inputs{
   display : flex;
   flex-direction: column;
   input{
    text-align: center;
   }
  }
`;

export default App
