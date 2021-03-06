# enumjs

[![Build Status](https://travis-ci.org/elcarim5efil/enumjs.svg?branch=master)](https://travis-ci.org/elcarim5efil/enumjs)
[![Coverage Status](https://coveralls.io/repos/github/elcarim5efil/enumjs/badge.svg)](https://coveralls.io/github/elcarim5efil/enumjs)

A Enum class library in javascript.

# quick start

## define with string or string array

```javascript
var OS = new Enum('LINUX,WINDOWS');              // LINUX: 0, WINDOWS: 1
var MOBILE = new Enum(['ANDROID', 'IOS']);       // ANDROID: 0, IOS: 1

OS.LINUX.equals(0);           // true
+MOBILE.IOS === 1;            // true
```

The simplest way to create an Enum is using a string, in which you can change the seperators `,` with `;` or `\s`. Or you can use an array to store your keys, which is recommanded.


## define with object array

```javascript
var PETS = new Enum([
    { key: 'DOG', name: 'DingDong', value: 100 },
    { key: 'CAT', name: 'Lily', value: 200 },
    { key: 'LIZARD', name: 'Keith', value: 300 },
]);     // DOG: 100, CAT: 200, LIZARD: 300

PETS.DOG.getName();               // DingDong
PETS.find(300).getName();        // Keith
```

In some cases, you might connect your enum keys to some other info, so you can just create your enum with an Object array, storing your relative infomation with your enum keys.

You can name the custom property whatever you want, but you can only access the propery via the `get` method, just like the javabean style, instead you cannot modify the property after defination.

# usage

## compare

The value of the Enum class is not a Number type, it cannot be compare to a number with `===` directly. Instead, method `equals` or `eq` is recommanded, or you can convert it to Number type explicitly.

```javascript
var ENUMS = new ('A,B');

ENUMS.A == 0;           // true, not recommanded
ENUMS.A === 0;          // false
+ENUMS.A === 0;         // true
ENUMS.getValue() === 0; // true
ENUMS.v() === 0;        // true
ENUMS.A.equals(0);      // true
ENUMS.A.eq(0);          // true
```

## get

The enum item can be accessed by it's value. An Enum item can

```javascript
var GREETING = new ([
    { key: 'ENGLISH', greeting: 'Hello', value: 100 },
    { key: 'DEUTSCH', greeting: 'Guten tag', value: 200 },
    { key: 'CHINESE', greeting: '你好', value: 300 },
]);

GREETING.find(300);                         // GREETING.CHINESE
GREETING.find(300).getGreeting();           // 你好
GREETING.CHINESE.getGreeting();                // 你好
GREETING.find(function(item){
    return item.k() === 'CHINESE';
    // return item.k() === 'CHINESE';
}).getGreeting();                               // 你好
```

## forEach

```javascript
GREETING.forEach(function(item, key){
    console.log(key, item.v());
    // ENGLISH 100
    // DEUTSCH 200
    // CHINESE 300
});
```

## map

```javascript
var arr = GREETING.map(function(item, key){
    return key;
});
// [ 'ENGLISH', 'DEUTSCH', 'CHINESE' ]
```

## filter

```javascript
var TYPE = new Enum('A,B,C');
var arr = TYPE.filter(function(item, key){
    return item.v() > 0;
});
// [TYPE.B, TYPE.C]
```

## keys

```javascript
var TYPE = new Enum('A,B,C');
var keys = TYPE.keys();
// ['A', 'B', 'C']
```

## values

```javascript
var TYPE = new Enum('A,B,C');
var keys = TYPE.values();
// [0, 1, 2]
```

## pick

```javascript
var FRUIT = new Enum([
  {
    key: 'GRAPE',
    name: 'grape',
    color: 'purple'
  }
]);

var grape = FRUIT.GRAPE.pick(['name', 'color'])
// { name: 'grape', color: 'purple' }
```

## pickAs

```javascript
var FRUIT = new Enum([
  {
    key: 'GRAPE',
    name: 'grape',
    color: 'purple'
  }
]);

var grape = FRUIT.GRAPE.pickAs({
  name: 'fruit',
  color: 'colour'
});
// { fruit: 'grape', colour: 'purple' }
```
