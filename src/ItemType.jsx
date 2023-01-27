import React from 'react';

export default function ItemType({
    value,
    quantValue,
    onInputChange,
    onQuantChange,
    placeholder,
    quantPlaceholder,
    type }) {
    return (
        <>
            {
                type === "quantitative" &&
                <input type="number" value={quantValue} onChange={onQuantChange} placeholder={quantPlaceholder} />
            }
            <input value={value} defaultChecked placeholder={placeholder} onChange={onInputChange} />
        </>
    );
}