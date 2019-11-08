import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import TabBar from 'antd-mobile/lib/tab-bar';
import 'antd-mobile/lib/tab-bar/style/css';
import './TabBar.module.scss';

export default () => {
    const history = useHistory();
    const location = useLocation();

    const onPressHandle = (key: string) => {
        if (key === location.pathname) return;
        history.push(key);
        console.log("test")
    };

    const TabBarMemo = useMemo(() => {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                tabBarPosition="bottom"
            >
                <TabBar.Item
                    title="首页"
                    key="index"
                    selected={ location.pathname === '/' }
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                    />
                    }
                    onPress={() => {
                        onPressHandle('/');
                    }}
                />
                <TabBar.Item
                    title="我的"
                    key="mine"
                    selected={ location.pathname === '/mine' }
                    icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                        />
                    }
                    onPress={() => {
                        onPressHandle('/mine');
                    }}
                />
            </TabBar>
        );
        // eslint-disable-next-line
    }, [location.pathname]);

    return TabBarMemo;
};
