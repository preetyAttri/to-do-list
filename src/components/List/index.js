import React, {useEffect, useRef, useState, useCallback} from 'react';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from 'react-redux';

import ListItem from './listItem';
import {
    actionForGetTaskList,
    actionForCreateTask,
} from '../../redux-saga/action';

/* 
    main list component
*/
const ListComponent = () => {
    const [text, setText] = useState();
    let textInput = useRef(null);
    const listData = useSelector((state) => state.taskList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionForGetTaskList());
    }, [dispatch]);

    const addTask = useCallback(() => {
        if (text?.trim()) {
            dispatch(actionForCreateTask(text));
            textInput.current.value = "";
        } else{
            // eslint-disable-next-line no-undef
            alert("Cannot add empty string")
        }
    }, [text, dispatch])
    return (
        <div className="listContainer">
            <TextField
                className="listContainerHeader"
                id="input-with-icon-textfield"
                placeholder="Add to list..."
                required
                inputRef={textInput}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AddOutlinedIcon 
                            onClick={addTask}  
                            style={{ color: '#EB5757', cursor: 'pointer' }}
                        />
                    </InputAdornment>
                )
                }}
                onChange={(event) => setText(event.target.value)}
                onKeyPress={(event) => {
                    if (event.charCode === 13) {
                        addTask();
                    }
                }}
            />
            {listData.map((listItem) => {
                return (
                    <ListItem listItem={listItem} key={listItem.id} />
                )
            })}
        </div>
    )
}

export default ListComponent;