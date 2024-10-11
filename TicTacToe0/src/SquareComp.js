import {useState} from 'react'

export default ({cellValue, handleOnClick}) => {
    return <button className="square" onClick={handleOnClick}>{cellValue}</button>;
}