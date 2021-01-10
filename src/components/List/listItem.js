import React, {useState, useRef, useCallback, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    isMobile,
  } from "react-device-detect";
import {
    actionForUpdateTask,
    actionForDeleteTask,
    actionForChangeTaskStatus
} from '../../redux-saga/action';

/*
    List Item Component
*/

const ListItem = ({
    listItem
}) => {
    const [text, setText] = useState(listItem.description);
    const loading = useSelector((state) => state.loading);
    const [loader, setLoader] = useState()
    const dispatch = useDispatch()
    const inputRef = useRef(null);
    useEffect(() => {
        !loading && setLoader(false)
    }, [loading])

    const onKeyPress = useCallback((event) => {
        if (event.charCode === 13 && text.trim()) {
            setLoader(true);
            dispatch(actionForUpdateTask({id: listItem.id, value: text}));
            inputRef.current.blur();
        } else if(event.charCode === 13) {
            // eslint-disable-next-line no-undef
            alert("Cannot add empty string")
        }
    }, [dispatch, listItem, text])
    return (
        <div className="d-flex list" style={{position: 'relative'}}>
            {loader && <CircularProgress size={15} color="secondary" />}
            <div className="d-flex">
                <Checkbox
                    checked={!!listItem.completed_at}
                    onChange={() => {
                        setLoader(true);
                        dispatch(actionForChangeTaskStatus({id: listItem.id, status: listItem.completed_at ? 'uncompleted' : 'completed'}))
                    }}
                    name={`checked${listItem.id}`}
                />
                <Input 
                    value={text} 
                    disableUnderline
                    inputRef={inputRef}
                    onChange={(event) => setText(event.target.value)}
                    style={{ color: listItem.completed_at ? 'grey' : 'black', textDecoration: listItem.completed_at ? 'line-through' : 'none'}}
                    onKeyPress={onKeyPress}
                />
            </div>
            <DeleteIcon className={isMobile ? "showDelete" : "delete"} onClick={() => {
                setLoader(true);
                dispatch(actionForDeleteTask({id: listItem.id}))
            }} />
        </div>
        )
}

export default ListItem