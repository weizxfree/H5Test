// 统一的存储前缀
var PREFIX = "sa:";

/**
* 对本地存贮对象的操作封装
*/

function isLocalStorageSupported() {
    try { 
      var supported = ('localStorage' in window && window.localStorage);
      var name = "__store";
      if (supported) {
        localStorage.setItem(name, "");
        localStorage.removeItem(name);
        return !!supported;
      }
    } catch (err) {
        return false;
    }
}

function Store(key, value) {
    var storage = Store.get();
    if (storage) {
        if ('undefined' === typeof value) {
            return storage.getItem(PREFIX + key);
        } else {
            storage.setItem(PREFIX + key, value);
        }
    }
};

Store.get = function() {
    if (Store.isSupport) {
        var _localStorage = window.localStorage;
        Store.get = function() {
            return _localStorage;
        }
        return _localStorage;
    } else {
        return null;
    }
};


/**
 * 清除本地存贮数据
 * @param {String} prefix 可选，如果包含此参数，则只删除包含此前缀的项，否则清除全部缓存
 */
Store.clear = function(prefix) {
    var storage = Store.get();
    if (storage) {
        if (prefix) {
            for (var key in storage) {
                if (0 === key.indexOf(PREFIX + prefix)) {
                    storage.removeItem(key);
                }
            }
        } else {
            storage.clear();
        }
    }
};

Store.setPrefix = function(prefix) {
    PREFIX = prefix;
}


Store.isSupport = !!isLocalStorageSupported();

module.exports = Store;