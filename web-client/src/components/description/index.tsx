import React from 'react';
import styles from './Description.module.css';

type DescriptionProps = {
    text: string;
}

const Description = (props: DescriptionProps) => {
    const { text } = props;
    return (
        <span className={styles.description}>{text}</span>
    )
}

export default Description;