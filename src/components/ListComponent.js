import React, {useEffect, useRef} from 'react';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListItem from './ListItem';
import {
    actionForGetTaskList,
    actionForCreateTask,
} from '../redux-saga/action';

/* 
    main list component
*/
const ListComponent = ({
    getTaskList, 
    listData,
    createTask,
    loading
}) => {
    let textInput = useRef(null);

    useEffect(() => {
        getTaskList();
    }, [getTaskList]);
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
                    if (event.code == "Enter" && event.target.value.trim()) {
                        createTask(event.target.value);
                        textInput.current.value = "";
                    } else if(event.code == "Enter") {
                        // eslint-disable-next-line no-undef
                        alert("Cannot add empty string")
                    }
                }}
            />
            <>
                {listData.map((listItem) => {
                    return (
                      <ListItem listItem={listItem} key={listItem.id} />
                    )
                })}
                
            </>
            {loading && <CircularProgress  color="secondary" />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        listData: state.taskList,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => ({
    getTaskList: data => dispatch(actionForGetTaskList(data)),
    createTask: data => dispatch(actionForCreateTask(data)),
})

const wrapper = connect(mapStateToProps, mapDispatchToProps)(ListComponent)
export default wrapper