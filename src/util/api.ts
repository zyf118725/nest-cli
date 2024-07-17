import { post, get } from './request';

export const productlist = (params = {}) => get('/productlist');
