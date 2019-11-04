import axios, { AxiosResponse } from 'axios';
import { TopicWrapper } from '../types';

axios.defaults.baseURL = 'https://www.vue-js.com';

// export interface GetTopicsParams {
//     page: number;
//     tab: string;
//     limit: number;
// }

export const getTopics = (params: unknown): Promise<AxiosResponse<TopicWrapper>> => {
    return axios.get('/api/v1/topics', { params });
};
