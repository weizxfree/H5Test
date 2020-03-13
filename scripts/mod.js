/**
 * file: mod.js
 * ver: 1.0.3
 * auth: (Markate仅修改部分)suhongtang@baidu.com
 * update: 11:48 2013/7/10
 */

(function(self) {
  var require, define, isArray;
  var head = document.getElementsByTagName('head')[0],
    loadingMap = {},
    factoryMap = {},
    modulesMap = {},
    scriptsMap = {},
    resMap = {},
    pkgMap = {};

  isArray = function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }

  define = function(id, factory) {
    factoryMap[id] = factory;

    var queue = loadingMap[id];
    if (queue) {
      for (var i = queue.length - 1; i >= 0; --i) {
        queue[i]();
      }
      delete loadingMap[id];
    }
  };

  require = function(id) {

    if (isArray(id)) {
      return require.many.apply(this, arguments)
    }

    var mod = modulesMap[id];
    if (mod) {
      return mod.exports;
    }

    //
    // init module
    //
    var factory = factoryMap[id];
    if (!factory) {
      throw Error('Cannot find module `' + id + '`');
    }

    mod = modulesMap[id] = {
      'exports': {}
    };

    //
    // factory: function OR value
    //
    var ret = (typeof factory == 'function') ? factory.apply(mod, [require, mod.exports, mod]) : factory;

    if (ret) {
      mod.exports = ret;
    }
    return mod.exports;
  };

  require.many = function(names, callback) {
    var modules = [];
    names.forEach(function(item) {
      modules.push(require(item));
    });
    callback.apply(window, modules);
  };

  require.resourceMap = function(obj) {
    resMap = obj['res'] || {};
    pkgMap = obj['pkg'] || {};
  };

  self.require = require
  self.define = define

})(this);