import React from 'react';
import ItemType from '../src/ItemType';
import styled from 'styled-components';

export default function AddForm({ list, setList, nextId }) {

  const [radioValue, setRadioValue] = React.useState("Standard");
  const [inputItem, setInputItem] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [quantInputItem, setQuantInputItem] = React.useState('');




  const isFormValid = () => {
    return !inputItem || !priority;
  }

  const onInputChange = (event) => {
    setInputItem(event.target.value)
  };

  const onQuantChange = (event) => {
      setQuantInputItem(parseInt(event.target.value))
  };

  const onRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const onPriorityChange = (event) => {
    setPriority(parseInt(event.target.value))
  };


  const onAddSubmit = (event) => {
    console.log("Add Render")
    switch (radioValue) {
      case 'Standard':
        console.log("Standard Render")
        setList([...list, { id: nextId.current++, value: inputItem, priority: priority }])
        setInputItem('')
        setPriority('')
        event.preventDefault();
        break;
      case 'Quantitative':
        setList([...list,
        {
          id: nextId.current++,
          value: inputItem,
          quantity: quantInputItem,
          counter: 0,
          priority: priority,
        }])
        setInputItem('')
        setQuantInputItem('')
        setPriority('')
        event.preventDefault();
        break;
      case 'Recurring':
        setList([...list,
        {
          id: nextId.current++,
          value: inputItem,
          reccurCount: 0,
          recurring: true,
          priority: priority
        }])
        setInputItem('')
        setPriority('')
        event.preventDefault();
        break;
    }
  };

  return (

    <FormContainer>
      <h1>TO DO LIST</h1>
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
          {radioValue === "Standard" &&
            <ItemType
              value={inputItem}
              placeholder="What do you need to get done?"
              onInputChange={onInputChange}
              type="standard"
            />
          }
          {radioValue === "Quantitative" &&
            <ItemType
              value={inputItem}
              onInputChange={onInputChange}
              quantValue={quantInputItem}
              quantPlaceholder="How many?"
              placeholder="Of what?"
              onQuantChange={onQuantChange}
              type="quantitative"
            />
          }
          {radioValue === "Recurring" &&
            <ItemType
              value={inputItem}
              placeholder="What do you need to get done?"
              onInputChange={onInputChange}
              onChange={onInputChange}
              type="recurring"
            />
          }
          <select value={priority} placeholder="Priority" onChange={onPriorityChange}>
            <option>---Set Priority---</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <button type="submit" disabled={isFormValid()}>
            Submit
          </button>
        </div>
      </form>
    </FormContainer>
  )
};



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
   select, input{
    text-align: center;
   }
  }
`;