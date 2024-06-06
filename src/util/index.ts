// 统一返回结构：成功
export function formatSuccess(data = null) {
  return {
    code: 1000,
    msg: 'OK',
    data,
  };
}

/**
 * 统一返回结构：失败
 */
export function formatError({ code = 10002, msg = '服务器错误', data = null }) {
  return { code, msg, data };
}

/**
 * 统一返回结构：分页
 */
export function formatPage({ pageNum = 1, pageSize = 10, data = [] }) {
  return formatSuccess({
    pageNum,
    pageSize,
    list: data[0],
    total: data[1],
    totalPage: Math.ceil(data[1] / pageSize),
  });
}

// 格式化数据
// 数据库等返回的数据有大量冗余的属性
export const formatData = (data: any) => JSON.parse(JSON.stringify(data));

