import React from "react";
import Item from "../src/Item"
import styled from "styled-components";

export default function List({
    list,
    archived,
    setList,
    archivedList,
    setArchivedList,
    nextId }) {
    const onArchiveItem = (item) => {
        let filteredList = list.filter((listItems) => listItems.id !== item.id);
        setList(filteredList);
        if (!item.recurring) {
            setArchivedList([...archivedList, { ...item }])
        }
    }
    const handleReccur = (item) => {
        item.reccurCount += 1;
        if (item.reccurCount === 1) {
            nextId.current++;
            setArchivedList([...archivedList,
            {
                id: item.id + 1,
                value: item.value,
                priority: item.priority,
                reccurCount: item.reccurCount,
            }])
            nextId.current++;
        } else {
            let archivedCopy = [...archivedList];
            archivedCopy.map((currentItem) => {
                if (currentItem.id - 1 === item.id) {
                    currentItem.reccurCount += 1;
                }
            })
            setArchivedList(archivedCopy)
        }
    }

    return (
        <ListContainer>
            <ul>
                {list.sort((a, b) => b.priority - a.priority).map((item) => (
                    <Item
                        key={item.id}
                        onArchiveItem={onArchiveItem}
                        handleReccur={handleReccur}
                        list={list}
                        archivedList={archivedList}
                        item={item}
                        setList={setList}
                        setArchivedList={setArchivedList}
                        archived={archived}
                    />
                ))}
            </ul>
        </ListContainer>
    );
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