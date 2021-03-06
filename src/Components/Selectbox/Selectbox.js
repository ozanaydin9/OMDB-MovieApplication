import React from 'react'
import styles from './Selectbox.module.css'

export const Selectbox = ( props ) => {

    return <>
        <select onChange={props.onChange} className={styles.select}>
            {props.optionList.map(item => (
                <option key={item.name} style={styles.option} value={item.value}>
                    {item.name}
                </option>
            ))}
        </select>
    </>
};
