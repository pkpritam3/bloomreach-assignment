import React from 'react';
import styles from './Avatar.module.css';

type AvatarProps = {
  url: string;
  alt: string
}

const Avatar = ({ url, alt }: AvatarProps) => {
  return (
    <img className={styles.avatar} src={url} alt={alt} />
  )
}

export default Avatar;