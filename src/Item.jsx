import React from "react";

export default function Item({ item, archived, list, handleReccur, onArchiveItem, onDeleteItem, onUndoItem }) {

    const [counter, setCounter] = React.useState(0);

    const handleCounterChange = (e) => {
        setCounter(e.target.value)
        list.map((currentItem) => {
            if (currentItem.id === item.id) {
                currentItem.counter = e.target.value
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
                {item.recurring && <button onClick={()=>handleReccur(item)} >Reccur</button>}
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