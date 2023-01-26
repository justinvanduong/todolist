import React from "react";
import Item from "../src/Item"
import styled from "styled-components";

export default function ListArchive({
    list,
    archived,
    setList,
    archivedList,
    setArchivedList}) {

    const onUndoItem = (item) => {
        if (item.reccurCount > 1) {
            let archivedCopy = [...archivedList];
            archivedCopy.map((currentItem) => {
                if (currentItem.id === item.id) {
                    currentItem.reccurCount -= 1;
                }
            })
            setArchivedList(archivedCopy)
        } else {
            let filteredList = archivedList.filter((listItems) => listItems.id !== item.id)
            setArchivedList(filteredList);
            setList([...list,
            { ...item }])
            list.sort((a, b) => b.priority - a.priority);
        }
    }

    const onDeleteItem = (item) => {
        if (item.reccurCount) {
            let filteredReccur = list.filter((items) => items.id !== item.id - 1)
            setList(filteredReccur)
        }
        let filteredList = archivedList.filter((items) => items.id !== item.id)
        setArchivedList(filteredList);
    }

    return (
        <ArchivedListContainer>
            <h2>Archive</h2>
            <ul>
                {archivedList.sort((a, b) => b.priority - a.priority).map((item) => (
                    <Item
                        key={item.id}
                        list={list}
                        archivedList={archivedList}
                        onDeleteItem={onDeleteItem}
                        onUndoItem={onUndoItem}
                        item={item}
                        setList={setList}
                        setArchivedList={setArchivedList}
                        archived={archived}
                    />
                ))}
            </ul>
        </ArchivedListContainer>
    );
}


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