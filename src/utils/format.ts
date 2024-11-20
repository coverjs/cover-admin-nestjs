/**
 * 处理树形结构
 * @param data
 * @param id
 * @param parentId
 * @param children
 * @returns
 */
export const handleTree = (data: any[], id?: string, parentId?: string, children?: string) => {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  const childrenListMap = {};
  const nodeIds = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree as any[];
};

/**
 * 递归过滤指定值
 * @param data
 * @param targetValue
 * @returns
 */
export const filterValue = (data, targetValue = null) => {
  if (Array.isArray(data)) {
    return data.map((item) => filterValue(item, targetValue)).filter((item) => item !== targetValue);
  } else if (typeof data === 'object' && data !== null && !(data instanceof Date)) {
    const result = {};
    for (const key in data) {
      const value = data[key];
      const filteredValue = filterValue(value, targetValue);
      if (filteredValue !== targetValue) {
        result[key] = filteredValue;
      }
    }
    return result;
  }
  return data;
};
