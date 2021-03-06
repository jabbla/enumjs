import * as _ from './utils';
import Value from './Value';
import methods from './methods';

class Enum {
  constructor(src, option) {
    const enums = this.formatEnums(src, option);

    this.map = this.createEnumMap(enums, option);
    this.list = this.createEnumList(enums, option);

    _.setUnenumerable(this.map, 'length', this.list.length);

    this.mixin(methods);

    return this;
  }

  mixin(methods) {
    for(let key in methods) {
      _.setUnenumerable(this.map, key, _.partialApply(methods[key], this));
    }
  }

  formatEnums(src, option) {
    if(_.isString(src)) {
      return this.formatEnumString(src, option);
    } else if(_.isArray(src)) {
      return this.formatEnumArray(src, option);
    }
    return [];
  }

  formatEnumString(str, option) {
    var spliter = /\s|,|;|:/;
    var list = str.split(spliter)
      .filter(key => key)
      .map((key) => ({
        key
      }));
    return this.formatEnumArray(list, option);
  }

  formatEnumArray(arr, option) {
    var startIndex = option.startIndex || 0;
    var keyName = option.customKeyName || 'key';
    return arr.map((item, index) => {
      if (_.isString(item)) {
        return {
          key: item,
          value: startIndex + index
        };
      } else if (_.isObject(item)) {
        item.value = item.value === undefined ? (index + startIndex) : item.value;
        return item;
      }
    }).filter(item => item && item[keyName]);
  }

  createEnumMap(arr, option) {
    var customKeyName = option.customKeyName;
    return arr.reduce((dest, item) => {
      return this.createEnum(dest, item, customKeyName);
    }, {});
  }

  createEnumList(arr, option) {
    var keyName = option.customKeyName || 'key';
    return arr.filter(item => item && item[keyName]).map(item => item[keyName]);
  }

  createEnum(host, option, customKeyName) {
    var keyName = customKeyName || 'key';
    var key = option[keyName];

    if(typeof key === 'undefined'){
      throw new Error('Enum\'s origin array item should have key and key value');
    }

    key = key.trim();

    _.setUnwritable(host, key, new Value(option, keyName));
    return host;
  }
}

export default Enum;
