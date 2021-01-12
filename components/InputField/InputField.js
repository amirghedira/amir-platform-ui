import React from 'react'
import classes from './InputField.module.css'
import TextareaAutosize from 'react-autosize-textarea';

const InputField = (props) => {
    if (props.editable)
        return (
            <TextareaAutosize
                className={classes.inputField}
                type={props.type}
                defaultValue={props.value}
                placeholder={props.placeholder}
                id={props.id}
            />
        )
    else {
        let DisplayComponent = null;
        if (props.type === "text")
            DisplayComponent = <p className={classes.itemsValue}>{props.value}</p>
        else
            DisplayComponent = <pre style={{ whiteSpace: 'pre-line' }} className={classes.itemsValue}>{props.value}</pre>
        return (
            DisplayComponent
        )
    }

}

export default InputField