import React from 'react';
import styles from './Header.module.scss'
import Button from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';

export const Header = () => {
    return (
        <div className={ styles.header }>
            Header
            <Button type="primary">primary</Button>
        </div>
    )
}
