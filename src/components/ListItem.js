import React, {useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';

import {
    actionForUpdateTask,
    actionForDeleteTask,
    actionForChangeTaskStatus
} from '../redux-saga/action';

/*
    List Item Component
*/

const ListComponent = ({
    listItem, 
    updateTask,
    deleteTask,
    changeTaskStatus,
}) => {
    const [text, setText] = useState(listItem.description)
    return (
        <div className="d-flex list">
            <div className="d-flex">
                <Checkbox
                    checked={!!listItem.completed_at}
                    onChange={() => {
                        changeTaskStatus({id: listItem.id, status: listItem.completed_at ? 'uncompleted' : 'completed'})
                    }}
                    name={`checked${listItem.id}`}
                />
                <Input 
                    value={text} 
                    disableUnderline
                    onChange={(event) => setText(event.target.value)}
                    style={{ color: listItem.completed_at ? 'grey' : 'black', textDecoration: listItem.completed_at ? 'line-through' : 'auto'}}
                    onKeyPress={(event) => {
                        if (event.code == "Enter" && text.trim()) {
                            updateTask({id: listItem.id, value: text});
                        } else if(event.code == "Enter") {
                            // eslint-disable-next-line no-undef
                            alert("Cannot add empty string")
                        }
                    }}
                />
            </div>
            <DeleteIcon className="delete" onClick={() => {deleteTask({id: listItem.id})}} />
        </div>
        )
}

const mapStateToProps = state => {
    return {
        state
    }
}

const mapDispatchToProps = dispatch => ({
    updateTask: data => dispatch(actionForUpdateTask(data)),
    deleteTask: data => dispatch(actionForDeleteTask(data)),
    changeTaskStatus: data => dispatch(actionForChangeTaskStatus(data)),
})

const listItemWrapper = connect(mapStateToProps, mapDispatchToProps)(ListComponent)
export default listItemWrapper