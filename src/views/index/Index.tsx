import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router';
import styles from './Index.module.scss';
import Tabs from 'antd-mobile/lib/tabs';
import 'antd-mobile/lib/tabs/style/css';
import Content from './components/content/Content';
import { Topic } from '../../types';
import { getTopics } from '../../api';
import { useEndReached } from '../../useUtil';

interface TabKey {
    [key: string]: string
}

const TabKey: TabKey = {
    'all': 'all',
    'good': 'good',
    'share': 'share',
    'ask': 'ask',
    'job': 'job'
};

export type TabData = {
    title: React.ReactNode;
    key: string;
    scrollTop: number;
    dataList: Topic[];
    isLoading: boolean;
    isLoadEnd: boolean;
    page: number;
};

const useQuery = (): URLSearchParams => {
    return new URLSearchParams(useLocation().search);
};

const initialState: TabData[] = [
    { title: '全部', key: 'all', scrollTop: 0, dataList: [], isLoading: false, isLoadEnd: false, page: 1 },
    { title: '精华', key: 'good', scrollTop: 0, dataList: [], isLoading: false, isLoadEnd: false, page: 1 },
    { title: '分享', key: 'share', scrollTop: 0, dataList: [], isLoading: false, isLoadEnd: false, page: 1 },
    { title: '问答', key: 'ask', scrollTop: 0, dataList: [], isLoading: false, isLoadEnd: false, page: 1 },
    { title: '招聘', key: 'job', scrollTop: 0, dataList: [], isLoading: false, isLoadEnd: false, page: 1 }
];

const Index: React.FC = () => {
    const history = useHistory();
    const query: URLSearchParams = useQuery();
    let key: string = query.get('tab') || 'all';
    const [tabs, setTabs] = useState(initialState);
    useEndReached(() => {
        getData(key);
    });

    const limit = 10;

    const initialPage = TabKey[key];

    const getData = async (key: string, canRequest: boolean = true) => {
        const currentTab = tabs.find(tab => tab.key === key);
        if (currentTab) {
            const { isLoading, isLoadEnd, page } = currentTab;
            if (isLoading || isLoadEnd) return;
            if (!canRequest && (isLoadEnd || page !== 1)) return;
            currentTab.isLoading = true;
            try {
                const res = await getTopics({ page, limit, tab: key });
                const data = res.data.data;
                currentTab.dataList = currentTab.dataList.concat(data);
                if (data.length < limit) currentTab.isLoadEnd = true;
                currentTab.page += 1;
            } catch (err) {
                console.error(err);
            } finally {
                currentTab.isLoading = false;
            }
            setTabs([...tabs]);
        }
    };

    const onChange = useCallback((tab: any) => {
        const currentTab = tabs.find(c => c.key === key);
        if (currentTab) currentTab.scrollTop = document.scrollingElement!.scrollTop;
        history.replace(`/?tab=${tab.key}`);
        // eslint-disable-next-line
    }, [key]);

    useEffect(() => {
        getData(key, false);
        const nextTab = tabs.find(c => c.key === key);
        if (nextTab) document.scrollingElement!.scrollTop = nextTab.scrollTop;
        // eslint-disable-next-line
    }, [key]);

    const TabsMemo = useMemo(() => {
        return (
            <Tabs tabs={ tabs }
                  initialPage={ initialPage }
                  onChange={ onChange }
            />
        );
        // eslint-disable-next-line
    }, [initialPage]);

    return (
        <div className={ styles.index }>
            { TabsMemo }
            <div className={ styles.wrapper }>
                {
                    tabs.map(tab => (
                        <Content key={ tab.key } visible={ tab.key === key } { ...tab } />
                    ))
                }
            </div>
        </div>
    );
};

export default Index;
