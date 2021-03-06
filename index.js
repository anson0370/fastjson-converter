function parse(jsonString) {
  const jsonObj = JSON.parse(jsonString);

  if (!isObj(jsonObj) && !isArray(jsonObj)) {
    return jsonObj;
  }

  const refTragets = {};
  const currentPath = '$';

  visitJsonObj(jsonObj, null, null, refTragets, currentPath);
  return jsonObj;
}

function visitJsonObj(jsonObj, parentObj, selfPath, refTargets, currentPath) {
  const refPath = getRefPathIfRef(jsonObj);
  // 如果是 ref 对象，则从 refTargets 中找到对象并替换掉
  if (refPath != null) {
    const refTarget = refTargets[resolveRelativeRefPath(refPath, currentPath)];
    // 这个 $.null 似乎是个 fastjson 的 bug ，先无视掉
    if (refTarget == null && !refPath.startsWith('$.null')) {
      throw new Error('Can not find object for ref: ${refPath}');
    }
    parentObj[selfPath] = refTarget;
    return;
  }
  refTargets[currentPath] = jsonObj;
  if (isObj(jsonObj)) {
    Object.keys(jsonObj).forEach(objKey => {
      const nextCurrentPath = `${currentPath}.${objKey}`;
      const nextObj = jsonObj[objKey];
      visitJsonObj(nextObj, jsonObj, objKey, refTargets, nextCurrentPath);
    });
    return;
  }
  if (isArray(jsonObj)) {
    jsonObj.forEach((nextObj, arrayIndex) => {
      const nextCurrentPath = `${currentPath}[${arrayIndex}]`
      visitJsonObj(nextObj, jsonObj, arrayIndex, refTargets, nextCurrentPath);
    });
    return;
  }
  return;
}

function isObj(obj) {
  return !isArray(obj) && typeof obj === 'object' && obj != null;
}

function isArray(obj) {
  return Array.isArray(obj);
}

function getRefPathIfRef(obj) {
  if (!isObj(obj)) {
    return null;
  }
  if (obj['$ref'] != null) {
    return obj['$ref'];
  }
}

function resolveRelativeRefPath(refPath, currentPath) {
  if (refPath === '..') {
    return getParentPath(getParentPath(currentPath));
  }
  return refPath;
}

function getParentPath(path) {
  return path.substring(0, path.lastIndexOf(path.endsWith(']') ? '[' : '.'));
}

module.exports = { parse }
