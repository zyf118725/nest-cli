import { post, get } from './request';

const ityHost = () => process.env.ITY_SERVE;

export const productlist = (params = {}) => get(`${ityHost()}/api/productlist`, params);
