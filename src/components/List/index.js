import React, {useEffect, useRef} from 'react';
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
    let textInput = useRef(null);
    const listData = useSelector((state) => state.taskList)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionForGetTaskList());
    }, [dispatch]);
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
                        <AddOutlinedIcon style={{ color: '#EB5757' }}/>
                    </InputAdornment>
                )
                }}
                onKeyPress={(event) => {
                    if (event.charCode === 13 && event.target.value.trim()) {
                        dispatch(actionForCreateTask(event.target.value));
                        textInput.current.value = "";
                    } else if(event.charCode === 13) {
                        // eslint-disable-next-line no-undef
                        alert("Cannot add empty string")
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