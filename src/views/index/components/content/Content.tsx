import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import { TabData } from '../../Index';
import Card from 'antd-mobile/lib/card';
import 'antd-mobile/lib/card/style/css';
import styles from './Content.module.scss';

interface IProps extends TabData {
    visible: boolean;
}

const Content: React.FC<IProps> = (props) => {
    const style = {
        display: props.visible ? 'block' : 'none'
    };

    const cardHeaderStyle = {
        width: '30px',
        height: '30px',
        borderRadius: '4px'
    };

    const formatDate = useCallback((dateStr: string) => {
        return dayjs(dateStr).format('YYYY-MM-DD HH:mm:ss');
    }, []);

    return (
        <div className={ styles.content } style={ style }>
            <div>
                {
                    props.dataList.map(item => (
                        <Card full key={ item.id }>
                            <Card.Header
                                title={ item.tab }
                                thumb={ item.author.avatar_url }
                                thumbStyle={ cardHeaderStyle }
                                extra={ formatDate(item.last_reply_at) }
                            />
                            <Card.Body>
                                <div>{ item.title }</div>
                            </Card.Body>
                            <Card.Footer content={ `${ item.reply_count } / ${ item.visit_count }` }/>
                        </Card>
                    ))
                }
            </div>
            { props.isLoadEnd ? null : <p className={ styles.loading }>加载中...</p> }
        </div>
    );
};

export default Content;
