const prodHost = 'http://a.itying.com.prod';
const testHost = 'http://a.itying.com.test'; // 测试
const devHost = 'http://a.itying.com/api'; // 开发
//              'http://a.itying.com/api/productlist

const getHostUrl = (urlInfo) => {
  let url = '';
  // let appEnv = process.env.REACT_APP_ENV;
  const appEnv = 'development';
  // console.log('appEnv: ', appEnv);
  if (appEnv == 'development') {
    url = devHost + urlInfo;
  } else if (appEnv == 'test') {
    url = testHost + urlInfo;
  } else {
    // 正式服的链接
    url = prodHost + urlInfo;
  }
  console.log('url: ', url);
  return url;
};

export default getHostUrl;
