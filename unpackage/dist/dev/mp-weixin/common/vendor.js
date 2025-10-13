"use strict";
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return expectsLowerCase ? (val2) => set2.has(val2.toLowerCase()) : (val2) => set2.has(val2);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val2, key) => hasOwnProperty$2.call(val2, key);
const isArray = Array.isArray;
const isMap = (val2) => toTypeString(val2) === "[object Map]";
const isSet = (val2) => toTypeString(val2) === "[object Set]";
const isFunction = (val2) => typeof val2 === "function";
const isString = (val2) => typeof val2 === "string";
const isSymbol = (val2) => typeof val2 === "symbol";
const isObject$1 = (val2) => val2 !== null && typeof val2 === "object";
const isPromise = (val2) => {
  return (isObject$1(val2) || isFunction(val2)) && isFunction(val2.then) && isFunction(val2.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value2) => objectToString.call(value2);
const toRawType = (value2) => {
  return toTypeString(value2).slice(8, -1);
};
const isPlainObject = (val2) => toTypeString(val2) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s2 = str ? `on${capitalize(str)}` : ``;
  return s2;
});
const hasChanged = (value2, oldValue) => !Object.is(value2, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value2) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value: value2
  });
};
const looseToNumber = (val2) => {
  const n2 = parseFloat(val2);
  return isNaN(n2) ? val2 : n2;
};
function normalizeStyle(value2) {
  if (isArray(value2)) {
    const res = {};
    for (let i2 = 0; i2 < value2.length; i2++) {
      const item = value2[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value2) || isObject$1(value2)) {
    return value2;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value2) {
  let res = "";
  if (isString(value2)) {
    res = value2;
  } else if (isArray(value2)) {
    for (let i2 = 0; i2 < value2.length; i2++) {
      const normalized = normalizeClass(value2[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value2)) {
    for (const name in value2) {
      if (value2[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val2) => {
  return isString(val2) ? val2 : val2 == null ? "" : isArray(val2) || isObject$1(val2) && (val2.toString === objectToString || !isFunction(val2.toString)) ? JSON.stringify(val2, replacer, 2) : String(val2);
};
const replacer = (_key, val2) => {
  if (val2 && val2.__v_isRef) {
    return replacer(_key, val2.value);
  } else if (isMap(val2)) {
    return {
      [`Map(${val2.size})`]: [...val2.entries()].reduce(
        (entries, [key, val22], i2) => {
          entries[stringifySymbol(key, i2) + " =>"] = val22;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val2)) {
    return {
      [`Set(${val2.size})`]: [...val2.values()].map((v2) => stringifySymbol(v2))
    };
  } else if (isSymbol(val2)) {
    return stringifySymbol(val2);
  } else if (isObject$1(val2) && !isArray(val2) && !isPlainObject(val2)) {
    return String(val2);
  }
  return val2;
};
const stringifySymbol = (v2, i2 = "") => {
  var _a;
  return isSymbol(v2) ? `Symbol(${(_a = v2.description) != null ? _a : i2})` : v2;
};
const isObject = (val2) => val2 !== null && typeof val2 === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile$1(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile$1(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val2, key) => hasOwnProperty$1.call(val2, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages, watcher, formater: formater2 }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater2 || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof index !== "undefined" && index.getLocale) {
    return index.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    const options = [
      messages,
      locale
    ];
    locale = options[0];
    messages = options[1];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages,
    watcher
  });
  let t2 = (key, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t2 = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t2(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t2(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_SHARE_CHAT = "onShareChat";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const VIRTUAL_HOST_STYLE = "virtualHostStyle";
const VIRTUAL_HOST_CLASS = "virtualHostClass";
const VIRTUAL_HOST_HIDDEN = "virtualHostHidden";
const VIRTUAL_HOST_ID = "virtualHostId";
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val2 = obj[key];
    if (typeof val2 === void 0 || val2 === null) {
      val2 = "";
    } else if (isPlainObject(val2)) {
      val2 = JSON.stringify(val2);
    }
    return encodeStr(key) + "=" + encodeStr(val2);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value2, checkType = true) {
  if (checkType && !isFunction(value2)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  return createErrorHandler2(app);
});
const E = function() {
};
E.prototype = {
  _id: 1,
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx,
      _id: this._id
    });
    return this._id++;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data2 = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len2 = evtArr.length;
    for (i2; i2 < len2; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data2);
    }
    return this;
  },
  off: function(name, event) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && event) {
      for (var i2 = evts.length - 1; i2 >= 0; i2--) {
        if (evts[i2].fn === event || evts[i2].fn._ === event || evts[i2]._id === event) {
          evts.splice(i2, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i2 = 0; i2 < this._depsLength; i2++) {
        const dep = this.deps[i2];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v2) {
    this._dirtyLevel = v2 ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i2 = effect2._depsLength; i2 < effect2.deps.length; i2++) {
      cleanupDepEffect(effect2.deps[i2], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key
      }
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value2, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value2) && !isReadonly(value2)) {
        oldValue = toRaw(oldValue);
        value2 = toRaw(value2);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value2)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value2;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value2, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value2);
      } else if (hasChanged(value2, oldValue)) {
        trigger(target, "set", key, value2, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn$1(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value2) => value2;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value2) {
  value2 = toRaw(value2);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value2);
  if (!hadKey) {
    target.add(value2);
    trigger(target, "add", value2, value2);
  }
  return this;
}
function set$1(key, value2) {
  value2 = toRaw(value2);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value2);
  if (!hadKey) {
    trigger(target, "add", key, value2);
  } else if (hasChanged(value2, oldValue)) {
    trigger(target, "set", key, value2, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value2, key) => {
      return callback.call(thisArg, wrap(value2), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value: value2, done } = innerIterator.next();
        return done ? { value: value2, done } : {
          value: isPair ? [wrap(value2[0]), wrap(value2[1])] : wrap(value2),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn$1(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value2) {
  return value2["__v_skip"] || !Object.isExtensible(value2) ? 0 : targetTypeMap(toRawType(value2));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value2) {
  if (isReadonly(value2)) {
    return isReactive(value2["__v_raw"]);
  }
  return !!(value2 && value2["__v_isReactive"]);
}
function isReadonly(value2) {
  return !!(value2 && value2["__v_isReadonly"]);
}
function isShallow(value2) {
  return !!(value2 && value2["__v_isShallow"]);
}
function isProxy(value2) {
  return isReactive(value2) || isReadonly(value2);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value2) {
  if (Object.isExtensible(value2)) {
    def(value2, "__v_skip", true);
  }
  return value2;
}
const toReactive = (value2) => isObject$1(value2) ? reactive(value2) : value2;
const toReadonly = (value2) => isObject$1(value2) ? readonly(value2) : value2;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self = toRaw(this);
    if ((!self._cacheable || self.effect.dirty) && hasChanged(self._value, self._value = self.effect.run())) {
      triggerRefValue(self, 4);
    }
    trackRefValue(self);
    if (self.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self, 2);
    }
    return self._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v2) {
    this.effect.dirty = v2;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value2) {
  return createRef(value2, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value2, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value2 : toRaw(value2);
    this._value = __v_isShallow ? value2 : toReactive(value2);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value2, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value2)) {
      oldValue.value = value2;
      return true;
    } else {
      return Reflect.set(target, key, value2, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a2) => {
          var _a, _b;
          return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value2, raw) {
  if (isString(value2)) {
    value2 = JSON.stringify(value2);
    return raw ? value2 : [`${key}=${value2}`];
  } else if (typeof value2 === "number" || typeof value2 === "boolean" || value2 == null) {
    return raw ? value2 : [`${key}=${value2}`];
  } else if (isRef(value2)) {
    value2 = formatProp(key, toRaw(value2.value), true);
    return raw ? value2 : [`${key}=Ref<`, value2, `>`];
  } else if (isFunction(value2)) {
    return [`${key}=fn${value2.name ? `<${value2.name}>` : ``}`];
  } else {
    value2 = toRaw(value2);
    return raw ? value2 : [`${key}=`, value2];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue$1.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i2 = queue$1.indexOf(job);
  if (i2 > flushIndex) {
    queue$1.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i2 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i2 < queue$1.length; i2++) {
    const cb = queue$1[i2];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue$1.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a2, b2) => getId(a2) - getId(b2)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b2) => {
  const diff2 = getId(a2) - getId(b2);
  if (diff2 === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time2) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time2);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value2, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value2)) {
    cb = value2;
  } else {
    cb = value2.handler;
    options = value2;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value2, depth, currentDepth = 0, seen) {
  if (!isObject$1(value2) || value2["__v_skip"]) {
    return value2;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value2;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value2)) {
    return value2;
  }
  seen.add(value2);
  if (isRef(value2)) {
    traverse(value2.value, depth, currentDepth, seen);
  } else if (isArray(value2)) {
    for (let i2 = 0; i2 < value2.length; i2++) {
      traverse(value2[i2], depth, currentDepth, seen);
    }
  } else if (isSet(value2) || isMap(value2)) {
    value2.forEach((v2) => {
      traverse(v2, depth, currentDepth, seen);
    });
  } else if (isPlainObject(value2)) {
    for (const key in value2) {
      traverse(value2[key], depth, currentDepth, seen);
    }
  }
  return value2;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value2) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value2;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value2) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value2;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value2);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook$1("bm");
const onMounted = createHook$1("m");
const onBeforeUpdate = createHook$1("bu");
const onUpdated = createHook$1("u");
const onBeforeUnmount = createHook$1("bum");
const onUnmounted = createHook$1("um");
const onServerPrefetch = createHook$1("sp");
const onRenderTriggered = createHook$1(
  "rtg"
);
const onRenderTracked = createHook$1(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i2) => i2.__$el || (i2.__$el = {}),
    $data: (i2) => i2.data,
    $props: (i2) => shallowReadonly(i2.props),
    $attrs: (i2) => shallowReadonly(i2.attrs),
    $slots: (i2) => shallowReadonly(i2.slots),
    $refs: (i2) => shallowReadonly(i2.refs),
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => {
      i2.effect.dirty = true;
      queueJob(i2.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data: data2, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data2[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data2 !== EMPTY_OBJ && hasOwn$1(data2, key)) {
        accessCache[key] = 2;
        return data2[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data2 !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$1(data2, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value2) {
    const { data: data2, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value2;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data2 !== EMPTY_OBJ && hasOwn$1(data2, key)) {
      data2[key] = value2;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value: value2
        });
      } else {
        ctx[key] = value2;
      }
    }
    return true;
  },
  has({
    _: { data: data2, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data2 !== EMPTY_OBJ && hasOwn$1(data2, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  function initInjections() {
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
  }
  {
    initInjections();
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data2 = dataOptions.call(publicThis, publicThis);
    if (isPromise(data2)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$1(data2)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data2);
      {
        for (const key in data2) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data2[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  function initProvides() {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    initProvides();
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val2) => publicThis[key] = val2
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v2) => injected.value = v2
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext() && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value2 = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value2 !== attrs[key]) {
              attrs[key] = value2;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue$1(
              options,
              rawCurrentProps,
              camelizedKey,
              value2,
              instance,
              false
            );
          }
        } else {
          if (value2 !== attrs[key]) {
            attrs[key] = value2;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$1(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue$1(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value2 = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value2;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value2;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value2 !== attrs[key]) {
          attrs[key] = value2;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue$1(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn$1(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue$1(options, props, key, value2, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value2 === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value2 = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value2 = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value2 = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value2 = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value2 === "" || value2 === hyphenate(key))) {
        value2 = true;
      }
    }
  }
  return value2;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType$1(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a2, b2) {
  return getType$1(a2) === getType$1(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp$1(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key))
    );
  }
}
function validateProp$1(name, value2, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value2 == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType$1(value2, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage$1(name, value2, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value2, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType$1(value2, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value2;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value2 instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value2);
  } else if (expectedType === "Array") {
    valid = isArray(value2);
  } else if (expectedType === "null") {
    valid = value2 === null;
  } else {
    valid = value2 instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value2, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value2);
  const expectedValue = styleValue$1(value2, expectedType);
  const receivedValue = styleValue$1(value2, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue$1(value2, type) {
  if (type === "String") {
    return `"${value2}"`;
  } else if (type === "Number") {
    return `${Number(value2)}`;
  } else {
    return `${value2}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem2) => type.toLowerCase() === elem2);
}
function isBoolean$1(...args) {
  return args.some((elem2) => elem2.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value2) {
  return value2 ? value2.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent2, suspense) {
  const type = vnode.type;
  const appContext = (parent2 ? parent2.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent: parent2,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent2 ? parent2.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null,
    // fixed by xxxxxx 用于存储uni-app的元素缓存
    $uniElements: /* @__PURE__ */ new Map(),
    $templateUniElementRefs: [],
    $templateUniElementStyles: {},
    $eS: {},
    $eA: {}
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent2 ? parent2.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i2) => {
    currentInstance = i2;
  };
  setInSSRSetupState = (v2) => {
    isInSSRComponentSetup = v2;
  };
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions$1(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i2 = getCurrentInstance();
    if (i2 && i2.appContext.config.warnRecursiveComputed) {
      c2._warnRecursive = true;
    }
  }
  return c2;
};
const version = "3.4.21";
const warn = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v2) {
  result[k] = v2;
}
function hasComponentEffect(instance) {
  return queue$1.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len2 = src.length;
      copy = new Array(len2);
      seen.set(src, copy);
      for (let i2 = 0; i2 < len2; i2++) {
        copy[i2] = clone(src[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn$1(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data2 = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data2[key];
  });
  return ret;
}
function patch(instance, data2, oldData) {
  if (!data2) {
    return;
  }
  data2 = deepCopy(data2);
  data2.$eS = instance.$eS || {};
  data2.$eA = instance.$eA || {};
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data2.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data2);
    const diffData = diff(data2, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(
    options,
    instance,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    $templateUniElementRefs,
    ctx: { $scope, $mpPlatform }
  } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$scope || !$templateRefs && !$templateUniElementRefs) {
    return;
  }
  if (isUnmount) {
    $templateRefs && $templateRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    $templateUniElementRefs && $templateUniElementRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    return;
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    if (refs.length === 0) {
      return [];
    }
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    if ($templateRefs) {
      const refs = doSetByRefs($templateRefs);
      if (refs.length && instance.proxy && instance.proxy.$scope) {
        instance.proxy.$scope.setData({ r1: 1 }, () => {
          doSetByRefs(refs);
        });
      }
    }
  };
  if ($templateUniElementRefs && $templateUniElementRefs.length) {
    nextTick(instance, () => {
      $templateUniElementRefs.forEach((templateRef) => {
        if (isArray(templateRef.v)) {
          templateRef.v.forEach((v2) => {
            setTemplateRef(templateRef, v2, setupState);
          });
        } else {
          setTemplateRef(templateRef, templateRef.v, setupState);
        }
      });
    });
  }
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value2) {
  if (isObject$1(value2)) {
    markRaw(value2);
  }
  return value2;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          if (refValue.$) {
            onBeforeUnmount(() => remove(existing, refValue), refValue.$);
          }
        }
      } else if (_isString) {
        if (hasOwn$1(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data: data2,
    setupState,
    ctx,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance;
  instance.$uniElementIds = /* @__PURE__ */ new Map();
  instance.$templateRefs = [];
  instance.$templateUniElementRefs = [];
  instance.$templateUniElementStyles = {};
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props,
        setupState,
        data2,
        ctx
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter(
      (key) => key !== "class" && key !== "style"
    );
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data: data2 }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data2;
    } else {
      const diffScopedSlotData = diff(
        data2,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance
  );
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u: u2 } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u2) {
        queuePostRenderEffect(u2);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    NOOP,
    () => queueJob(update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  {
    update();
  }
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  {
    const parentInstance = instance.parent;
    if (parentInstance) {
      const $children = parentInstance.ctx.$children;
      const target = getExposeProxy(instance) || instance.proxy;
      const index2 = $children.indexOf(target);
      if (index2 > -1) {
        $children.splice(index2, 1);
      }
    }
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val2) {
  return target[key] = val2;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  const userErrorHandler = app.config.errorHandler;
  return function errorHandler(err, instance, info) {
    if (userErrorHandler) {
      userErrorHandler(err, instance, info);
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    if (appInstance[ON_ERROR]) {
      {
        appInstance.proxy.$callHook(ON_ERROR, err);
      }
    } else {
      logError(err, info, instance ? instance.$.vnode : null, false);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined" && typeof global[method] !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function stringifyStyle(value2) {
  if (isString(value2)) {
    return value2;
  }
  return stringify(normalizeStyle(value2));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function vOn(value2, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq" || ctx.$mpPlatform === "mp-xhs") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value2) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value2;
  } else {
    mpInstance[name] = createInvoker(value2, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (instance && instance.ctx.$getTriggerEventDetail) {
      if (typeof e2.detail === "number") {
        e2.detail = instance.ctx.$getTriggerEventDetail(e2.detail);
      }
    }
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event, instance) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$1(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$1(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn$1(event.detail, "checked") && !hasOwn$1(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value2) {
  if (isArray(value2)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value2.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value2;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
const o$1 = (value2, key) => vOn(value2, key);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value2) => stringifyStyle(value2);
const e$1 = (target, ...sources) => extend(target, ...sources);
const n$1 = (value2) => normalizeClass(value2);
const t$1 = (val2) => toDisplayString(val2);
const p$1 = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
function getLocaleLanguage$1() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data2, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp(key, data2[key], protocol[key], !hasOwn$1(data2, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len2 = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len2; i2++) {
    const opts = protocol[i2];
    const data2 = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data2[opts.name] = args[i2];
    }
    validateProtocol(name, data2, { [opts.name]: opts }, onFail);
  }
}
function validateProp(name, value2, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value2 == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value2, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value2, expectedTypes);
    }
  }
  if (validator) {
    return validator(value2);
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType(value2, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value2;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value2 instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value2);
  } else if (expectedType === "Array") {
    valid = isArray(value2);
  } else {
    {
      valid = value2 instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value2, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value2);
  const expectedValue = styleValue(value2, expectedType);
  const receivedValue = styleValue(value2, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue(value2, type) {
  if (type === "String") {
    return `"${value2}"`;
  } else if (type === "Number") {
    return `${Number(value2)}`;
  } else {
    return `${value2}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem2) => type.toLowerCase() === elem2);
}
function isBoolean(...args) {
  return args.some((elem2) => elem2.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data2) {
    return hook(data2, params) || data2;
  };
}
function queue(hooks, data2, params) {
  let promise = false;
  for (let i2 = 0; i2 < hooks.length; i2++) {
    const hook = hooks[i2];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data2, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data2);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  args[0];
  {
    return;
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  {
    delete errRes.errCode;
  }
  let res = extend({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  const errMsg = formatApiArgs(args);
  if (errMsg) {
    return errMsg;
  }
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    if (typeof globalThis === "undefined" || !globalThis.harmonyChannel) {
      console.error(errMsg.message + "\n" + errMsg.stack);
    }
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  var _a, _b;
  let windowWidth, pixelRatio, platform;
  {
    const windowInfo = ((_a = wx.getWindowInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const deviceInfo = ((_b = wx.getDeviceInfo) === null || _b === void 0 ? void 0 : _b.call(wx)) || wx.getSystemInfoSync();
    windowWidth = windowInfo.windowWidth;
    pixelRatio = windowInfo.pixelRatio;
    platform = deviceInfo.platform;
  }
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
function __f__(type, filename, ...args) {
  if (filename) {
    args.push(filename);
  }
  console[type].apply(console, args);
}
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: [Function, Number]
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
class EventBus {
  constructor() {
    this.$emitter = new E$1();
  }
  on(name, callback) {
    return this.$emitter.on(name, callback);
  }
  once(name, callback) {
    return this.$emitter.once(name, callback);
  }
  off(name, callback) {
    if (!name) {
      this.$emitter.e = {};
      return;
    }
    this.$emitter.off(name, callback);
  }
  emit(name, ...args) {
    this.$emitter.emit(name, ...args);
  }
}
const eventBus = new EventBus();
const $on = defineSyncApi(API_ON, (name, callback) => {
  eventBus.on(name, callback);
  return () => eventBus.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  eventBus.once(name, callback);
  return () => eventBus.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!isArray(name))
    name = name ? [name] : [];
  name.forEach((n2) => {
    eventBus.off(n2, callback);
  });
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  eventBus.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i2 = 0; i2 < onPushMessageCallbacks.length; i2++) {
      const callback = onPushMessageCallbacks[i2];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_2, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|__f__|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|rpx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const TASK_APIS = ["request", "downloadFile", "uploadFile", "connectSocket"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function isTaskApi(name) {
  return TASK_APIS.indexOf(name) !== -1;
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value2) => promise.resolve(onfinally && onfinally()).then(() => value2), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn$1(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$1(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      if (isFunction(argsOption)) {
        argsOption(fromArgs, {});
      }
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    const realKeepReturnValue = keepReturnValue || false;
    return processArgs(methodName, res, returnValue, {}, realKeepReturnValue);
  }
  return function wrapper(methodName, method) {
    const hasProtocol = hasOwn$1(protocols2, methodName);
    if (!hasProtocol && typeof wx[methodName] !== "function") {
      return method;
    }
    const needWrapper = hasProtocol || isFunction(protocols2.returnValue) || isContextApi(methodName) || isTaskApi(methodName);
    const hasMethod = hasProtocol || isFunction(method);
    if (!hasProtocol && !method) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    if (!needWrapper || !hasMethod) {
      return method;
    }
    const protocol = protocols2[methodName];
    return function(arg1, arg2) {
      let options = protocol || {};
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isContextApi(methodName) || isTaskApi(methodName)) {
        if (returnValue && !returnValue.__v_skip) {
          returnValue.__v_skip = true;
        }
      }
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return getLocaleLanguage$1();
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function getOSInfo(system, platform) {
  let osName = "";
  let osVersion = "";
  if (platform && false) {
    osName = platform;
    osVersion = system;
  } else {
    osName = system.split(" ")[0] || platform;
    osVersion = system.split(" ")[1] || "";
  }
  osName = osName.toLocaleLowerCase();
  switch (osName) {
    case "harmony":
    case "ohos":
    case "openharmony":
      osName = "harmonyos";
      break;
    case "iphone os":
      osName = "ios";
      break;
    case "mac":
    case "darwin":
      osName = "macos";
      break;
    case "windows_nt":
      osName = "windows";
      break;
  }
  return {
    osName,
    osVersion
  };
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  const { osName, osVersion } = getOSInfo(system, platform);
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = (language || "").replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__4B36300",
    appName: "SeedProgram",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.66",
    uniCompilerVersion: "4.66",
    uniRuntimeVersion: "4.66",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName,
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0,
    isUniAppX: false
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len2 = urls.length;
    if (!len2) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len2) {
      currentIndex = len2 - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model, system = "", platform = "" } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    const { osName, osVersion } = getOSInfo(system, platform);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = (language || "").replace(/_/g, "-");
    const parameters = {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__4B36300",
      appName: "SeedProgram",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      isUniAppX: false,
      uniPlatform: "mp-weixin",
      uniCompileVersion: "4.66",
      uniCompilerVersion: "4.66",
      uniRuntimeVersion: "4.66"
    };
    extend(toRes, parameters);
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const onError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        wx.$onErrorHandlers = [];
      }
      wx.$onErrorHandlers.push(fromArgs);
    } else {
      injectHook(ON_ERROR, fromArgs, app.$vm.$);
    }
  }
};
const offError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        return;
      }
      const index2 = wx.$onErrorHandlers.findIndex((fn) => fn === fromArgs);
      if (index2 !== -1) {
        wx.$onErrorHandlers.splice(index2, 1);
      }
    } else if (fromArgs.__weh) {
      const onErrors = app.$vm.$[ON_ERROR];
      if (onErrors) {
        const index2 = onErrors.indexOf(fromArgs.__weh);
        if (index2 > -1) {
          onErrors.splice(index2, 1);
        }
      }
    }
  }
};
const onSocketOpen = {
  args() {
    if (wx.__uni_console__) {
      if (wx.__uni_console_warned__) {
        return;
      }
      wx.__uni_console_warned__ = true;
      console.warn(`开发模式下小程序日志回显会使用 socket 连接，为了避免冲突，建议使用 SocketTask 的方式去管理 WebSocket 或手动关闭日志回显功能。[详情](https://uniapp.dcloud.net.cn/tutorial/run/mp-log.html)`);
    }
  }
};
const onSocketMessage = onSocketOpen;
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  rpx2px: upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback,
  __f__
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn$1(target, key)) {
        return target[key];
      }
      if (hasOwn$1(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn$1(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    if (component.$scope) {
      return oldIn.call(this, component.$scope);
    }
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
if (!wx$2.canIUse("getAppBaseInfo")) {
  wx$2.getAppBaseInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.canIUse("getWindowInfo")) {
  wx$2.getWindowInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.canIUse("getDeviceInfo")) {
  wx$2.getDeviceInfo = wx$2.getSystemInfoSync;
}
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  offError,
  onError,
  onSocketMessage,
  onSocketOpen,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function initRuntimeSocket(hosts, port, id) {
  if (hosts == "" || port == "" || id == "")
    return Promise.resolve(null);
  return hosts.split(",").reduce((promise, host2) => {
    return promise.then((socket) => {
      if (socket != null)
        return Promise.resolve(socket);
      return tryConnectSocket(host2, port, id);
    });
  }, Promise.resolve(null));
}
const SOCKET_TIMEOUT = 500;
function tryConnectSocket(host2, port, id) {
  return new Promise((resolve2, reject) => {
    const socket = index.connectSocket({
      url: `ws://${host2}:${port}/${id}`,
      multiple: true,
      // 支付宝小程序 是否开启多实例
      fail() {
        resolve2(null);
      }
    });
    const timer = setTimeout(() => {
      socket.close({
        code: 1006,
        reason: "connect timeout"
      });
      resolve2(null);
    }, SOCKET_TIMEOUT);
    socket.onOpen((e2) => {
      clearTimeout(timer);
      resolve2(socket);
    });
    socket.onClose((e2) => {
      clearTimeout(timer);
      resolve2(null);
    });
    socket.onError((e2) => {
      clearTimeout(timer);
      resolve2(null);
    });
  });
}
const CONSOLE_TYPES = ["log", "warn", "error", "info", "debug"];
const originalConsole = /* @__PURE__ */ CONSOLE_TYPES.reduce((methods, type) => {
  methods[type] = console[type].bind(console);
  return methods;
}, {});
let sendError = null;
const errorQueue = /* @__PURE__ */ new Set();
const errorExtra = {};
function sendErrorMessages(errors) {
  if (sendError == null) {
    errors.forEach((error) => {
      errorQueue.add(error);
    });
    return;
  }
  const data2 = errors.map((err) => {
    if (typeof err === "string") {
      return err;
    }
    const isPromiseRejection = err && "promise" in err && "reason" in err;
    const prefix = isPromiseRejection ? "UnhandledPromiseRejection: " : "";
    if (isPromiseRejection) {
      err = err.reason;
    }
    if (err instanceof Error && err.stack) {
      if (err.message && !err.stack.includes(err.message)) {
        return `${prefix}${err.message}
${err.stack}`;
      }
      return `${prefix}${err.stack}`;
    }
    if (typeof err === "object" && err !== null) {
      try {
        return prefix + JSON.stringify(err);
      } catch (err2) {
        return prefix + String(err2);
      }
    }
    return prefix + String(err);
  }).filter(Boolean);
  if (data2.length > 0) {
    sendError(JSON.stringify(Object.assign({
      type: "error",
      data: data2
    }, errorExtra)));
  }
}
function setSendError(value2, extra = {}) {
  sendError = value2;
  Object.assign(errorExtra, extra);
  if (value2 != null && errorQueue.size > 0) {
    const errors = Array.from(errorQueue);
    errorQueue.clear();
    sendErrorMessages(errors);
  }
}
function initOnError() {
  function onError2(error) {
    try {
      if (typeof PromiseRejectionEvent !== "undefined" && error instanceof PromiseRejectionEvent && error.reason instanceof Error && error.reason.message && error.reason.message.includes(`Cannot create property 'errMsg' on string 'taskId`)) {
        return;
      }
      if (true) {
        originalConsole.error(error);
      }
      sendErrorMessages([error]);
    } catch (err) {
      originalConsole.error(err);
    }
  }
  if (typeof index.onError === "function") {
    index.onError(onError2);
  }
  if (typeof index.onUnhandledRejection === "function") {
    index.onUnhandledRejection(onError2);
  }
  return function offError2() {
    if (typeof index.offError === "function") {
      index.offError(onError2);
    }
    if (typeof index.offUnhandledRejection === "function") {
      index.offUnhandledRejection(onError2);
    }
  };
}
function formatMessage(type, args) {
  try {
    return {
      type,
      args: formatArgs(args)
    };
  } catch (e2) {
  }
  return {
    type,
    args: []
  };
}
function formatArgs(args) {
  return args.map((arg) => formatArg(arg));
}
function formatArg(arg, depth = 0) {
  if (depth >= 7) {
    return {
      type: "object",
      value: "[Maximum depth reached]"
    };
  }
  const type = typeof arg;
  switch (type) {
    case "string":
      return formatString(arg);
    case "number":
      return formatNumber(arg);
    case "boolean":
      return formatBoolean(arg);
    case "object":
      try {
        return formatObject(arg, depth);
      } catch (e2) {
        return {
          type: "object",
          value: {
            properties: []
          }
        };
      }
    case "undefined":
      return formatUndefined();
    case "function":
      return formatFunction(arg);
    case "symbol": {
      return formatSymbol(arg);
    }
    case "bigint":
      return formatBigInt(arg);
  }
}
function formatFunction(value2) {
  return {
    type: "function",
    value: `function ${value2.name}() {}`
  };
}
function formatUndefined() {
  return {
    type: "undefined"
  };
}
function formatBoolean(value2) {
  return {
    type: "boolean",
    value: String(value2)
  };
}
function formatNumber(value2) {
  return {
    type: "number",
    value: String(value2)
  };
}
function formatBigInt(value2) {
  return {
    type: "bigint",
    value: String(value2)
  };
}
function formatString(value2) {
  return {
    type: "string",
    value: value2
  };
}
function formatSymbol(value2) {
  return {
    type: "symbol",
    value: value2.description
  };
}
function formatObject(value2, depth) {
  if (value2 === null) {
    return {
      type: "null"
    };
  }
  {
    if (isComponentPublicInstance(value2)) {
      return formatComponentPublicInstance(value2, depth);
    }
    if (isComponentInternalInstance(value2)) {
      return formatComponentInternalInstance(value2, depth);
    }
    if (isUniElement(value2)) {
      return formatUniElement(value2, depth);
    }
    if (isCSSStyleDeclaration(value2)) {
      return formatCSSStyleDeclaration(value2, depth);
    }
  }
  if (Array.isArray(value2)) {
    return {
      type: "object",
      subType: "array",
      value: {
        properties: value2.map((v2, i2) => formatArrayElement(v2, i2, depth + 1))
      }
    };
  }
  if (value2 instanceof Set) {
    return {
      type: "object",
      subType: "set",
      className: "Set",
      description: `Set(${value2.size})`,
      value: {
        entries: Array.from(value2).map((v2) => formatSetEntry(v2, depth + 1))
      }
    };
  }
  if (value2 instanceof Map) {
    return {
      type: "object",
      subType: "map",
      className: "Map",
      description: `Map(${value2.size})`,
      value: {
        entries: Array.from(value2.entries()).map((v2) => formatMapEntry(v2, depth + 1))
      }
    };
  }
  if (value2 instanceof Promise) {
    return {
      type: "object",
      subType: "promise",
      value: {
        properties: []
      }
    };
  }
  if (value2 instanceof RegExp) {
    return {
      type: "object",
      subType: "regexp",
      value: String(value2),
      className: "Regexp"
    };
  }
  if (value2 instanceof Date) {
    return {
      type: "object",
      subType: "date",
      value: String(value2),
      className: "Date"
    };
  }
  if (value2 instanceof Error) {
    return {
      type: "object",
      subType: "error",
      value: value2.message || String(value2),
      className: value2.name || "Error"
    };
  }
  let className = void 0;
  {
    const constructor = value2.constructor;
    if (constructor) {
      if (constructor.get$UTSMetadata$) {
        className = constructor.get$UTSMetadata$().name;
      }
    }
  }
  let entries = Object.entries(value2);
  if (isHarmonyBuilderParams(value2)) {
    entries = entries.filter(([key]) => key !== "modifier" && key !== "nodeContent");
  }
  return {
    type: "object",
    className,
    value: {
      properties: entries.map((entry) => formatObjectProperty(entry[0], entry[1], depth + 1))
    }
  };
}
function isHarmonyBuilderParams(value2) {
  return value2.modifier && value2.modifier._attribute && value2.nodeContent;
}
function isComponentPublicInstance(value2) {
  return value2.$ && isComponentInternalInstance(value2.$);
}
function isComponentInternalInstance(value2) {
  return value2.type && value2.uid != null && value2.appContext;
}
function formatComponentPublicInstance(value2, depth) {
  return {
    type: "object",
    className: "ComponentPublicInstance",
    value: {
      properties: Object.entries(value2.$.type).map(([name, value22]) => formatObjectProperty(name, value22, depth + 1))
    }
  };
}
function formatComponentInternalInstance(value2, depth) {
  return {
    type: "object",
    className: "ComponentInternalInstance",
    value: {
      properties: Object.entries(value2.type).map(([name, value22]) => formatObjectProperty(name, value22, depth + 1))
    }
  };
}
function isUniElement(value2) {
  return value2.style && value2.tagName != null && value2.nodeName != null;
}
function formatUniElement(value2, depth) {
  return {
    type: "object",
    // 非 x 没有 UniElement 的概念
    // className: 'UniElement',
    value: {
      properties: Object.entries(value2).filter(([name]) => [
        "id",
        "tagName",
        "nodeName",
        "dataset",
        "offsetTop",
        "offsetLeft",
        "style"
      ].includes(name)).map(([name, value22]) => formatObjectProperty(name, value22, depth + 1))
    }
  };
}
function isCSSStyleDeclaration(value2) {
  return typeof value2.getPropertyValue === "function" && typeof value2.setProperty === "function" && value2.$styles;
}
function formatCSSStyleDeclaration(style, depth) {
  return {
    type: "object",
    value: {
      properties: Object.entries(style.$styles).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function formatObjectProperty(name, value2, depth) {
  const result = formatArg(value2, depth);
  result.name = name;
  return result;
}
function formatArrayElement(value2, index2, depth) {
  const result = formatArg(value2, depth);
  result.name = `${index2}`;
  return result;
}
function formatSetEntry(value2, depth) {
  return {
    value: formatArg(value2, depth)
  };
}
function formatMapEntry(value2, depth) {
  return {
    key: formatArg(value2[0], depth),
    value: formatArg(value2[1], depth)
  };
}
let sendConsole = null;
const messageQueue = [];
const messageExtra = {};
const EXCEPTION_BEGIN_MARK = "---BEGIN:EXCEPTION---";
const EXCEPTION_END_MARK = "---END:EXCEPTION---";
function sendConsoleMessages(messages) {
  if (sendConsole == null) {
    messageQueue.push(...messages);
    return;
  }
  sendConsole(JSON.stringify(Object.assign({
    type: "console",
    data: messages
  }, messageExtra)));
}
function setSendConsole(value2, extra = {}) {
  sendConsole = value2;
  Object.assign(messageExtra, extra);
  if (value2 != null && messageQueue.length > 0) {
    const messages = messageQueue.slice();
    messageQueue.length = 0;
    sendConsoleMessages(messages);
  }
}
const atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/;
function rewriteConsole() {
  function wrapConsole(type) {
    return function(...args) {
      const originalArgs = [...args];
      if (originalArgs.length) {
        const maybeAtFile = originalArgs[originalArgs.length - 1];
        if (typeof maybeAtFile === "string" && atFileRegex.test(maybeAtFile)) {
          originalArgs.pop();
        }
      }
      {
        originalConsole[type](...originalArgs);
      }
      if (type === "error" && args.length === 1) {
        const arg = args[0];
        if (typeof arg === "string" && arg.startsWith(EXCEPTION_BEGIN_MARK)) {
          const startIndex = EXCEPTION_BEGIN_MARK.length;
          const endIndex = arg.length - EXCEPTION_END_MARK.length;
          sendErrorMessages([arg.slice(startIndex, endIndex)]);
          return;
        } else if (arg instanceof Error) {
          sendErrorMessages([arg]);
          return;
        }
      }
      sendConsoleMessages([formatMessage(type, args)]);
    };
  }
  if (isConsoleWritable()) {
    CONSOLE_TYPES.forEach((type) => {
      console[type] = wrapConsole(type);
    });
    return function restoreConsole() {
      CONSOLE_TYPES.forEach((type) => {
        console[type] = originalConsole[type];
      });
    };
  } else {
    {
      if (typeof index !== "undefined" && index.__f__) {
        const oldLog = index.__f__;
        if (oldLog) {
          index.__f__ = function(...args) {
            const [type, filename, ...rest] = args;
            oldLog(type, "", ...rest);
            sendConsoleMessages([formatMessage(type, [...rest, filename])]);
          };
          return function restoreConsole() {
            index.__f__ = oldLog;
          };
        }
      }
    }
  }
  return function restoreConsole() {
  };
}
function isConsoleWritable() {
  const value2 = console.log;
  const sym = Symbol();
  try {
    console.log = sym;
  } catch (ex) {
    return false;
  }
  const isWritable = console.log === sym;
  console.log = value2;
  return isWritable;
}
function initRuntimeSocketService() {
  const hosts = "100.125.69.178,192.168.184.1,192.168.237.1,127.0.0.1";
  const port = "8090";
  const id = "mp-weixin_e7rcLe";
  const lazy = typeof swan !== "undefined";
  let restoreError = lazy ? () => {
  } : initOnError();
  let restoreConsole = lazy ? () => {
  } : rewriteConsole();
  return Promise.resolve().then(() => {
    if (lazy) {
      restoreError = initOnError();
      restoreConsole = rewriteConsole();
    }
    return initRuntimeSocket(hosts, port, id).then((socket) => {
      if (!socket) {
        restoreError();
        restoreConsole();
        originalConsole.error(wrapError("开发模式下日志通道建立 socket 连接失败。"));
        {
          originalConsole.error(wrapError("小程序平台，请勾选不校验合法域名配置。"));
        }
        originalConsole.error(wrapError("如果是运行到真机，请确认手机与电脑处于同一网络。"));
        return false;
      }
      {
        initMiniProgramGlobalFlag();
      }
      socket.onClose(() => {
        {
          originalConsole.error(wrapError("开发模式下日志通道 socket 连接关闭，请在 HBuilderX 中重新运行。"));
        }
        restoreError();
        restoreConsole();
      });
      setSendConsole((data2) => {
        socket.send({
          data: data2
        });
      });
      setSendError((data2) => {
        socket.send({
          data: data2
        });
      });
      return true;
    });
  });
}
const ERROR_CHAR = "‌";
function wrapError(error) {
  return `${ERROR_CHAR}${error}${ERROR_CHAR}`;
}
function initMiniProgramGlobalFlag() {
  if (typeof wx$1 !== "undefined") {
    wx$1.__uni_console__ = true;
  } else if (typeof my !== "undefined") {
    my.__uni_console__ = true;
  } else if (typeof tt !== "undefined") {
    tt.__uni_console__ = true;
  } else if (typeof swan !== "undefined") {
    swan.__uni_console__ = true;
  } else if (typeof qq !== "undefined") {
    qq.__uni_console__ = true;
  } else if (typeof ks !== "undefined") {
    ks.__uni_console__ = true;
  } else if (typeof jd !== "undefined") {
    jd.__uni_console__ = true;
  } else if (typeof xhs !== "undefined") {
    xhs.__uni_console__ = true;
  } else if (typeof has !== "undefined") {
    has.__uni_console__ = true;
  } else if (typeof qa !== "undefined") {
    qa.__uni_console__ = true;
  }
}
initRuntimeSocketService();
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val2] of props) {
    target[key] = val2;
  }
  return target;
};
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len2 = ids.length;
  if (len2 === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len2 === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$1(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function getLocaleLanguage() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  {
    Object.defineProperties(ctx, {
      // only id
      [VIRTUAL_HOST_ID]: {
        get() {
          const id = this.$scope.data[VIRTUAL_HOST_ID];
          return id === void 0 ? "" : id;
        }
      }
    });
  }
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$1(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$1(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$1(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope && ctx.$callHook) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const onErrorHandlers = wx.$onErrorHandlers;
  if (onErrorHandlers) {
    onErrorHandlers.forEach((fn) => {
      injectHook(ON_ERROR, fn, internalInstance);
    });
    onErrorHandlers.length = 0;
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$1(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$1(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(getLocaleLanguage());
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    let observerSlots = function(newVal) {
      const $slots = /* @__PURE__ */ Object.create(null);
      newVal && newVal.forEach((slotName) => {
        $slots[slotName] = true;
      });
      this.setData({
        $slots
      });
    };
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: []
    };
    {
      properties.uS.observer = observerSlots;
    }
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties[VIRTUAL_HOST_STYLE] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_CLASS] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_HIDDEN] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_ID] = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value2 = opts.default;
        if (isFunction(value2)) {
          value2 = value2();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value: value2
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(resolvePropValue(properties.uP))) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = resolvePropValue(properties[name]);
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function resolvePropValue(prop) {
  return prop;
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(resolvePropValue(up), this.$vm.$);
    } else if (resolvePropValue(this.properties.uT) === "m") {
      updateMiniProgramComponentProperties(resolvePropValue(up), this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, isPageInProject, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$1(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    isPageInProject: true,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    {
      this.options = query;
    }
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [
      customizeEvent(event),
      ...args
    ]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var miniprogram_dist = {};
(function(exports) {
  !function(t2, e2) {
    for (var r2 in e2)
      t2[r2] = e2[r2];
  }(exports, function(t2) {
    var e2 = {};
    function r2(i2) {
      if (e2[i2])
        return e2[i2].exports;
      var s2 = e2[i2] = { i: i2, l: false, exports: {} };
      return t2[i2].call(s2.exports, s2, s2.exports, r2), s2.l = true, s2.exports;
    }
    return r2.m = t2, r2.c = e2, r2.d = function(t3, e3, i2) {
      r2.o(t3, e3) || Object.defineProperty(t3, e3, { enumerable: true, get: i2 });
    }, r2.r = function(t3) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t3, "__esModule", { value: true });
    }, r2.t = function(t3, e3) {
      if (1 & e3 && (t3 = r2(t3)), 8 & e3)
        return t3;
      if (4 & e3 && "object" == typeof t3 && t3 && t3.__esModule)
        return t3;
      var i2 = /* @__PURE__ */ Object.create(null);
      if (r2.r(i2), Object.defineProperty(i2, "default", { enumerable: true, value: t3 }), 2 & e3 && "string" != typeof t3)
        for (var s2 in t3)
          r2.d(i2, s2, (function(e4) {
            return t3[e4];
          }).bind(null, s2));
      return i2;
    }, r2.n = function(t3) {
      var e3 = t3 && t3.__esModule ? function() {
        return t3.default;
      } : function() {
        return t3;
      };
      return r2.d(e3, "a", e3), e3;
    }, r2.o = function(t3, e3) {
      return Object.prototype.hasOwnProperty.call(t3, e3);
    }, r2.p = "", r2(r2.s = 1);
  }([function(t2, e2, r2) {
    function i2(t3, e3) {
      for (var r3 = 0; r3 < e3.length; r3++) {
        var i3 = e3[r3];
        i3.enumerable = i3.enumerable || false, i3.configurable = true, "value" in i3 && (i3.writable = true), Object.defineProperty(t3, i3.key, i3);
      }
    }
    function s2(t3, e3, r3) {
      return e3 in t3 ? Object.defineProperty(t3, e3, { value: r3, enumerable: true, configurable: true, writable: true }) : t3[e3] = r3, t3;
    }
    r2.d(e2, "c", function() {
      return _2;
    }), r2.d(e2, "b", function() {
      return x;
    }), r2.d(e2, "a", function() {
      return P2;
    });
    var a2 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap(), o2 = /* @__PURE__ */ new WeakMap(), h2 = /* @__PURE__ */ new WeakMap(), l2 = /* @__PURE__ */ new WeakMap();
    function p2(t3) {
      if ("function" == typeof this["on".concat(t3)]) {
        for (var e3 = arguments.length, r3 = new Array(e3 > 1 ? e3 - 1 : 0), i3 = 1; i3 < e3; i3++)
          r3[i3 - 1] = arguments[i3];
        this["on".concat(t3)].apply(this, r3);
      }
    }
    function f2(t3) {
      this.readyState = t3, p2.call(this, "readystatechange");
    }
    var m2 = function() {
      function t3() {
        !function(t4, e4) {
          if (!(t4 instanceof e4))
            throw new TypeError("Cannot call a class as a function");
        }(this, t3), s2(this, "onabort", null), s2(this, "onerror", null), s2(this, "onload", null), s2(this, "onloadstart", null), s2(this, "onprogress", null), s2(this, "ontimeout", null), s2(this, "onloadend", null), s2(this, "onreadystatechange", null), s2(this, "readyState", 0), s2(this, "response", null), s2(this, "responseText", null), s2(this, "responseType", ""), s2(this, "responseXML", null), s2(this, "status", 0), s2(this, "statusText", ""), s2(this, "upload", {}), s2(this, "withCredentials", false), o2.set(this, { "content-type": "application/x-www-form-urlencoded" }), h2.set(this, {});
      }
      var e3, r3;
      return e3 = t3, (r3 = [{ key: "abort", value: function() {
        var t4 = l2.get(this);
        t4 && t4.abort();
      } }, { key: "getAllResponseHeaders", value: function() {
        var t4 = h2.get(this);
        return Object.keys(t4).map(function(e4) {
          return "".concat(e4, ": ").concat(t4[e4]);
        }).join("\n");
      } }, { key: "getResponseHeader", value: function(t4) {
        return h2.get(this)[t4];
      } }, { key: "open", value: function(e4, r4) {
        n2.set(this, e4), a2.set(this, r4), f2.call(this, t3.OPENED);
      } }, { key: "overrideMimeType", value: function() {
      } }, { key: "send", value: function() {
        var e4 = this, r4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (this.readyState !== t3.OPENED)
          throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
        wx$1.request({ data: r4, url: a2.get(this), method: n2.get(this), header: o2.get(this), success: function(r5) {
          var i3 = r5.data, s3 = r5.statusCode, a3 = r5.header;
          if ("string" != typeof i3 && !(i3 instanceof ArrayBuffer))
            try {
              i3 = JSON.stringify(i3);
            } catch (t4) {
            }
          if (e4.status = s3, h2.set(e4, a3), p2.call(e4, "loadstart"), f2.call(e4, t3.HEADERS_RECEIVED), f2.call(e4, t3.LOADING), e4.response = i3, i3 instanceof ArrayBuffer) {
            e4.responseText = "";
            for (var n3 = new Uint8Array(i3), o3 = n3.byteLength, l3 = 0; l3 < o3; l3++)
              e4.responseText += String.fromCharCode(n3[l3]);
          } else
            e4.responseText = i3;
          f2.call(e4, t3.DONE), p2.call(e4, "load"), p2.call(e4, "loadend");
        }, fail: function(t4) {
          var r5 = t4.errMsg;
          -1 !== r5.indexOf("abort") ? p2.call(e4, "abort") : p2.call(e4, "error", r5), p2.call(e4, "loadend");
        } });
      } }, { key: "setRequestHeader", value: function(t4, e4) {
        var r4 = o2.get(this);
        r4[t4] = e4, o2.set(this, r4);
      } }]) && i2(e3.prototype, r3), t3;
    }();
    function c2() {
    }
    function d2() {
      index.__f__("error", "at node_modules/lottie-miniprogram/miniprogram_dist/index.js:1", "小程序由于不支持动态创建 canvas 的能力，故 lottie 中有关图片处理的操作无法支持，请保持图片的原始宽高与 JSON 描述的一致，避免需要对图片处理");
    }
    function u2(t3) {
      return "canvas" === t3 ? (index.__f__("warn", "at node_modules/lottie-miniprogram/miniprogram_dist/index.js:1", "发现 Lottie 动态创建 canvas 组件，但小程序不支持动态创建组件，接下来可能会出现异常"), { getContext: function() {
        return { fillRect: c2, createImage: d2, drawImage: d2 };
      } }) : "img" === t3 ? function(t4) {
        if (void 0 === t4.createImage)
          return {};
        var e3 = t4.createImage();
        return e3.addEventListener = e3.addEventListener || function(t5, r3) {
          "load" === t5 ? e3.onload = function() {
            setTimeout(r3, 0);
          } : "error" === t5 && (e3.onerror = r3);
        }, e3;
      }(this) : void 0;
    }
    function y2(t3, e3) {
      return function(r3) {
        return e3.call(t3, Array.from(r3));
      };
    }
    function g2(t3, e3) {
      return function() {
        return e3.call(t3);
      };
    }
    function v2(t3, e3, r3) {
      var i3 = t3[e3];
      t3[e3] = r3(t3, i3);
    }
    s2(m2, "UNSEND", 0), s2(m2, "OPENED", 1), s2(m2, "HEADERS_RECEIVED", 2), s2(m2, "LOADING", 3), s2(m2, "DONE", 4);
    var b2 = wx$1.getSystemInfoSync(), P2 = { requestAnimationFrame: function(t3) {
      setTimeout(function() {
        "function" == typeof t3 && t3(Date.now());
      }, 16);
    } };
    P2.window = { devicePixelRatio: b2.pixelRatio }, P2.document = P2.window.document = { body: {}, createElement: u2 }, P2.navigator = P2.window.navigator = { userAgent: "" }, XMLHttpRequest = m2;
    var _2 = function(t3) {
      var e3 = P2.window, r3 = P2.document;
      P2._requestAnimationFrame = e3.requestAnimationFrame, P2._cancelAnimationFrame = e3.cancelAnimationFrame, e3.requestAnimationFrame = function(e4) {
        var r4 = false;
        setTimeout(function() {
          r4 || (r4 = true, "function" == typeof e4 && e4(Date.now()));
        }, 100), t3.requestAnimationFrame(function(t4) {
          r4 || (r4 = true, "function" == typeof e4 && e4(t4));
        });
      }, e3.cancelAnimationFrame = t3.cancelAnimationFrame.bind(t3), P2._body = r3.body, P2._createElement = r3.createElement, r3.body = {}, r3.createElement = u2.bind(t3);
      var i3 = t3.getContext("2d");
      i3.canvas || (i3.canvas = t3), v2(i3, "setLineDash", y2), v2(i3, "fill", g2);
    }, x = function() {
      var t3 = P2.window, e3 = P2.document;
      t3.requestAnimationFrame = P2._requestAnimationFrame, t3.cancelAnimationFrame = P2._cancelAnimationFrame, e3.body = P2._body, e3.createElement = P2._createElement;
    };
  }, function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__), (function(module) {
      __webpack_require__.d(__webpack_exports__, "loadAnimation", function() {
        return loadAnimation;
      }), __webpack_require__.d(__webpack_exports__, "freeze", function() {
        return freeze;
      }), __webpack_require__.d(__webpack_exports__, "unfreeze", function() {
        return unfreeze;
      });
      var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
      function _typeof(t2) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
          return typeof t3;
        } : function(t3) {
          return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
        })(t2);
      }
      __webpack_require__.d(__webpack_exports__, "setup", function() {
        return _adapter__WEBPACK_IMPORTED_MODULE_0__.c;
      });
      var window = _adapter__WEBPACK_IMPORTED_MODULE_0__.a.window, document = _adapter__WEBPACK_IMPORTED_MODULE_0__.a.document, navigator = _adapter__WEBPACK_IMPORTED_MODULE_0__.a.navigator;
      function loadAnimation(t2) {
        if (["wrapper", "container"].forEach(function(e3) {
          if (e3 in t2)
            throw new Error("Not support '".concat(e3, "' parameter in miniprogram version of lottie."));
        }), "string" == typeof t2.path && !/^https?\:\/\//.test(t2.path))
          throw new Error("The 'path' is only support http protocol.");
        if (!t2.rendererSettings || !t2.rendererSettings.context)
          throw new Error("Parameter 'rendererSettings.context' should be a CanvasRenderingContext2D.");
        t2.renderer = "canvas";
        var e2 = window.lottie.loadAnimation(t2), r2 = e2.destroy.bind(e2);
        return e2.destroy = (function() {
          Object(_adapter__WEBPACK_IMPORTED_MODULE_0__.b)(), e2.renderer && !e2.renderer.destroyed && (e2.renderer.renderConfig.clearCanvas = false), r2();
        }).bind(e2), e2;
      }
      void 0 !== navigator && function(t2, e2) {
        "object" === _typeof(module) && module.exports ? module.exports = e2(t2) : (t2.lottie = e2(t2), t2.bodymovin = t2.lottie);
      }(window || {}, function(window) {
        var locationHref = "", initialDefaultFrame = -999999, subframeEnabled = true, expressionsPlugin;
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var bm_pow = Math.pow, bm_sqrt = Math.sqrt, bm_floor = Math.floor, bm_min = Math.min, BMMath = {};
        function ProjectInterface() {
          return {};
        }
        !function() {
          var t2, e2 = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"], r2 = e2.length;
          for (t2 = 0; t2 < r2; t2 += 1)
            BMMath[e2[t2]] = Math[e2[t2]];
        }(), BMMath.random = Math.random, BMMath.abs = function(t2) {
          if ("object" === _typeof(t2) && t2.length) {
            var e2, r2 = createSizedArray(t2.length), i2 = t2.length;
            for (e2 = 0; e2 < i2; e2 += 1)
              r2[e2] = Math.abs(t2[e2]);
            return r2;
          }
          return Math.abs(t2);
        };
        var defaultCurveSegments = 150, degToRads = Math.PI / 180, roundCorner = 0.5519;
        function BMEnterFrameEvent(t2, e2, r2, i2) {
          this.type = t2, this.currentTime = e2, this.totalTime = r2, this.direction = i2 < 0 ? -1 : 1;
        }
        function BMCompleteEvent(t2, e2) {
          this.type = t2, this.direction = e2 < 0 ? -1 : 1;
        }
        function BMCompleteLoopEvent(t2, e2, r2, i2) {
          this.type = t2, this.currentLoop = r2, this.totalLoops = e2, this.direction = i2 < 0 ? -1 : 1;
        }
        function BMSegmentStartEvent(t2, e2, r2) {
          this.type = t2, this.firstFrame = e2, this.totalFrames = r2;
        }
        function BMDestroyEvent(t2, e2) {
          this.type = t2, this.target = e2;
        }
        var createElementID = (_count = 0, function() {
          return "__lottie_element_" + ++_count;
        }), _count;
        function HSVtoRGB(t2, e2, r2) {
          var i2, s2, a2, n2, o2, h2, l2, p2;
          switch (h2 = r2 * (1 - e2), l2 = r2 * (1 - (o2 = 6 * t2 - (n2 = Math.floor(6 * t2))) * e2), p2 = r2 * (1 - (1 - o2) * e2), n2 % 6) {
            case 0:
              i2 = r2, s2 = p2, a2 = h2;
              break;
            case 1:
              i2 = l2, s2 = r2, a2 = h2;
              break;
            case 2:
              i2 = h2, s2 = r2, a2 = p2;
              break;
            case 3:
              i2 = h2, s2 = l2, a2 = r2;
              break;
            case 4:
              i2 = p2, s2 = h2, a2 = r2;
              break;
            case 5:
              i2 = r2, s2 = h2, a2 = l2;
          }
          return [i2, s2, a2];
        }
        function RGBtoHSV(t2, e2, r2) {
          var i2, s2 = Math.max(t2, e2, r2), a2 = Math.min(t2, e2, r2), n2 = s2 - a2, o2 = 0 === s2 ? 0 : n2 / s2, h2 = s2 / 255;
          switch (s2) {
            case a2:
              i2 = 0;
              break;
            case t2:
              i2 = e2 - r2 + n2 * (e2 < r2 ? 6 : 0), i2 /= 6 * n2;
              break;
            case e2:
              i2 = r2 - t2 + 2 * n2, i2 /= 6 * n2;
              break;
            case r2:
              i2 = t2 - e2 + 4 * n2, i2 /= 6 * n2;
          }
          return [i2, o2, h2];
        }
        function addSaturationToRGB(t2, e2) {
          var r2 = RGBtoHSV(255 * t2[0], 255 * t2[1], 255 * t2[2]);
          return r2[1] += e2, r2[1] > 1 ? r2[1] = 1 : r2[1] <= 0 && (r2[1] = 0), HSVtoRGB(r2[0], r2[1], r2[2]);
        }
        function addBrightnessToRGB(t2, e2) {
          var r2 = RGBtoHSV(255 * t2[0], 255 * t2[1], 255 * t2[2]);
          return r2[2] += e2, r2[2] > 1 ? r2[2] = 1 : r2[2] < 0 && (r2[2] = 0), HSVtoRGB(r2[0], r2[1], r2[2]);
        }
        function addHueToRGB(t2, e2) {
          var r2 = RGBtoHSV(255 * t2[0], 255 * t2[1], 255 * t2[2]);
          return r2[0] += e2 / 360, r2[0] > 1 ? r2[0] -= 1 : r2[0] < 0 && (r2[0] += 1), HSVtoRGB(r2[0], r2[1], r2[2]);
        }
        (function() {
          var t2, e2, r2 = [];
          for (t2 = 0; t2 < 256; t2 += 1)
            e2 = t2.toString(16), r2[t2] = 1 == e2.length ? "0" + e2 : e2;
          return function(t3, e3, i2) {
            return t3 < 0 && (t3 = 0), e3 < 0 && (e3 = 0), i2 < 0 && (i2 = 0), "#" + r2[t3] + r2[e3] + r2[i2];
          };
        })();
        function BaseEvent() {
        }
        BaseEvent.prototype = { triggerEvent: function(t2, e2) {
          if (this._cbs[t2])
            for (var r2 = this._cbs[t2].length, i2 = 0; i2 < r2; i2++)
              this._cbs[t2][i2](e2);
        }, addEventListener: function(t2, e2) {
          return this._cbs[t2] || (this._cbs[t2] = []), this._cbs[t2].push(e2), (function() {
            this.removeEventListener(t2, e2);
          }).bind(this);
        }, removeEventListener: function(t2, e2) {
          if (e2) {
            if (this._cbs[t2]) {
              for (var r2 = 0, i2 = this._cbs[t2].length; r2 < i2; )
                this._cbs[t2][r2] === e2 && (this._cbs[t2].splice(r2, 1), r2 -= 1, i2 -= 1), r2 += 1;
              this._cbs[t2].length || (this._cbs[t2] = null);
            }
          } else
            this._cbs[t2] = null;
        } };
        var createTypedArray = "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function(t2, e2) {
          return "float32" === t2 ? new Float32Array(e2) : "int16" === t2 ? new Int16Array(e2) : "uint8c" === t2 ? new Uint8ClampedArray(e2) : void 0;
        } : function(t2, e2) {
          var r2, i2 = 0, s2 = [];
          switch (t2) {
            case "int16":
            case "uint8c":
              r2 = 1;
              break;
            default:
              r2 = 1.1;
          }
          for (i2 = 0; i2 < e2; i2 += 1)
            s2.push(r2);
          return s2;
        };
        function createSizedArray(t2) {
          return Array.apply(null, { length: t2 });
        }
        function createTag(t2) {
          return document.createElement(t2);
        }
        function DynamicPropertyContainer() {
        }
        DynamicPropertyContainer.prototype = { addDynamicProperty: function(t2) {
          -1 === this.dynamicProperties.indexOf(t2) && (this.dynamicProperties.push(t2), this.container.addDynamicProperty(this), this._isAnimated = true);
        }, iterateDynamicProperties: function() {
          this._mdf = false;
          var t2, e2 = this.dynamicProperties.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.dynamicProperties[t2].getValue(), this.dynamicProperties[t2]._mdf && (this._mdf = true);
        }, initDynamicPropertyContainer: function(t2) {
          this.container = t2, this.dynamicProperties = [], this._mdf = false, this._isAnimated = false;
        } };
        var getBlendMode = (blendModeEnums = { 0: "source-over", 1: "multiply", 2: "screen", 3: "overlay", 4: "darken", 5: "lighten", 6: "color-dodge", 7: "color-burn", 8: "hard-light", 9: "soft-light", 10: "difference", 11: "exclusion", 12: "hue", 13: "saturation", 14: "color", 15: "luminosity" }, function(t2) {
          return blendModeEnums[t2] || "";
        }), blendModeEnums, Matrix = /* @__PURE__ */ function() {
          var t2 = Math.cos, e2 = Math.sin, r2 = Math.tan, i2 = Math.round;
          function s2() {
            return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
          }
          function a2(r3) {
            if (0 === r3)
              return this;
            var i3 = t2(r3), s3 = e2(r3);
            return this._t(i3, -s3, 0, 0, s3, i3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }
          function n2(r3) {
            if (0 === r3)
              return this;
            var i3 = t2(r3), s3 = e2(r3);
            return this._t(1, 0, 0, 0, 0, i3, -s3, 0, 0, s3, i3, 0, 0, 0, 0, 1);
          }
          function o2(r3) {
            if (0 === r3)
              return this;
            var i3 = t2(r3), s3 = e2(r3);
            return this._t(i3, 0, s3, 0, 0, 1, 0, 0, -s3, 0, i3, 0, 0, 0, 0, 1);
          }
          function h2(r3) {
            if (0 === r3)
              return this;
            var i3 = t2(r3), s3 = e2(r3);
            return this._t(i3, -s3, 0, 0, s3, i3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }
          function l2(t3, e3) {
            return this._t(1, e3, t3, 1, 0, 0);
          }
          function p2(t3, e3) {
            return this.shear(r2(t3), r2(e3));
          }
          function f2(i3, s3) {
            var a3 = t2(s3), n3 = e2(s3);
            return this._t(a3, n3, 0, 0, -n3, a3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r2(i3), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a3, -n3, 0, 0, n3, a3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }
          function m2(t3, e3, r3) {
            return r3 || 0 === r3 || (r3 = 1), 1 === t3 && 1 === e3 && 1 === r3 ? this : this._t(t3, 0, 0, 0, 0, e3, 0, 0, 0, 0, r3, 0, 0, 0, 0, 1);
          }
          function c2(t3, e3, r3, i3, s3, a3, n3, o3, h3, l3, p3, f3, m3, c3, d3, u3) {
            return this.props[0] = t3, this.props[1] = e3, this.props[2] = r3, this.props[3] = i3, this.props[4] = s3, this.props[5] = a3, this.props[6] = n3, this.props[7] = o3, this.props[8] = h3, this.props[9] = l3, this.props[10] = p3, this.props[11] = f3, this.props[12] = m3, this.props[13] = c3, this.props[14] = d3, this.props[15] = u3, this;
          }
          function d2(t3, e3, r3) {
            return r3 = r3 || 0, 0 !== t3 || 0 !== e3 || 0 !== r3 ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t3, e3, r3, 1) : this;
          }
          function u2(t3, e3, r3, i3, s3, a3, n3, o3, h3, l3, p3, f3, m3, c3, d3, u3) {
            var y3 = this.props;
            if (1 === t3 && 0 === e3 && 0 === r3 && 0 === i3 && 0 === s3 && 1 === a3 && 0 === n3 && 0 === o3 && 0 === h3 && 0 === l3 && 1 === p3 && 0 === f3)
              return y3[12] = y3[12] * t3 + y3[15] * m3, y3[13] = y3[13] * a3 + y3[15] * c3, y3[14] = y3[14] * p3 + y3[15] * d3, y3[15] = y3[15] * u3, this._identityCalculated = false, this;
            var g3 = y3[0], v3 = y3[1], b3 = y3[2], P3 = y3[3], _3 = y3[4], x2 = y3[5], S3 = y3[6], E3 = y3[7], T3 = y3[8], C3 = y3[9], A3 = y3[10], k2 = y3[11], D3 = y3[12], M3 = y3[13], I3 = y3[14], w2 = y3[15];
            return y3[0] = g3 * t3 + v3 * s3 + b3 * h3 + P3 * m3, y3[1] = g3 * e3 + v3 * a3 + b3 * l3 + P3 * c3, y3[2] = g3 * r3 + v3 * n3 + b3 * p3 + P3 * d3, y3[3] = g3 * i3 + v3 * o3 + b3 * f3 + P3 * u3, y3[4] = _3 * t3 + x2 * s3 + S3 * h3 + E3 * m3, y3[5] = _3 * e3 + x2 * a3 + S3 * l3 + E3 * c3, y3[6] = _3 * r3 + x2 * n3 + S3 * p3 + E3 * d3, y3[7] = _3 * i3 + x2 * o3 + S3 * f3 + E3 * u3, y3[8] = T3 * t3 + C3 * s3 + A3 * h3 + k2 * m3, y3[9] = T3 * e3 + C3 * a3 + A3 * l3 + k2 * c3, y3[10] = T3 * r3 + C3 * n3 + A3 * p3 + k2 * d3, y3[11] = T3 * i3 + C3 * o3 + A3 * f3 + k2 * u3, y3[12] = D3 * t3 + M3 * s3 + I3 * h3 + w2 * m3, y3[13] = D3 * e3 + M3 * a3 + I3 * l3 + w2 * c3, y3[14] = D3 * r3 + M3 * n3 + I3 * p3 + w2 * d3, y3[15] = D3 * i3 + M3 * o3 + I3 * f3 + w2 * u3, this._identityCalculated = false, this;
          }
          function y2() {
            return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = true), this._identity;
          }
          function g2(t3) {
            for (var e3 = 0; e3 < 16; ) {
              if (t3.props[e3] !== this.props[e3])
                return false;
              e3 += 1;
            }
            return true;
          }
          function v2(t3) {
            var e3;
            for (e3 = 0; e3 < 16; e3 += 1)
              t3.props[e3] = this.props[e3];
          }
          function b2(t3) {
            var e3;
            for (e3 = 0; e3 < 16; e3 += 1)
              this.props[e3] = t3[e3];
          }
          function P2(t3, e3, r3) {
            return { x: t3 * this.props[0] + e3 * this.props[4] + r3 * this.props[8] + this.props[12], y: t3 * this.props[1] + e3 * this.props[5] + r3 * this.props[9] + this.props[13], z: t3 * this.props[2] + e3 * this.props[6] + r3 * this.props[10] + this.props[14] };
          }
          function _2(t3, e3, r3) {
            return t3 * this.props[0] + e3 * this.props[4] + r3 * this.props[8] + this.props[12];
          }
          function x(t3, e3, r3) {
            return t3 * this.props[1] + e3 * this.props[5] + r3 * this.props[9] + this.props[13];
          }
          function S2(t3, e3, r3) {
            return t3 * this.props[2] + e3 * this.props[6] + r3 * this.props[10] + this.props[14];
          }
          function E2(t3) {
            var e3 = this.props[0] * this.props[5] - this.props[1] * this.props[4], r3 = this.props[5] / e3, i3 = -this.props[1] / e3, s3 = -this.props[4] / e3, a3 = this.props[0] / e3, n3 = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e3, o3 = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e3;
            return [t3[0] * r3 + t3[1] * s3 + n3, t3[0] * i3 + t3[1] * a3 + o3, 0];
          }
          function T2(t3) {
            var e3, r3 = t3.length, i3 = [];
            for (e3 = 0; e3 < r3; e3 += 1)
              i3[e3] = E2(t3[e3]);
            return i3;
          }
          function C2(t3, e3, r3) {
            var i3 = createTypedArray("float32", 6);
            if (this.isIdentity())
              i3[0] = t3[0], i3[1] = t3[1], i3[2] = e3[0], i3[3] = e3[1], i3[4] = r3[0], i3[5] = r3[1];
            else {
              var s3 = this.props[0], a3 = this.props[1], n3 = this.props[4], o3 = this.props[5], h3 = this.props[12], l3 = this.props[13];
              i3[0] = t3[0] * s3 + t3[1] * n3 + h3, i3[1] = t3[0] * a3 + t3[1] * o3 + l3, i3[2] = e3[0] * s3 + e3[1] * n3 + h3, i3[3] = e3[0] * a3 + e3[1] * o3 + l3, i3[4] = r3[0] * s3 + r3[1] * n3 + h3, i3[5] = r3[0] * a3 + r3[1] * o3 + l3;
            }
            return i3;
          }
          function A2(t3, e3, r3) {
            return this.isIdentity() ? [t3, e3, r3] : [t3 * this.props[0] + e3 * this.props[4] + r3 * this.props[8] + this.props[12], t3 * this.props[1] + e3 * this.props[5] + r3 * this.props[9] + this.props[13], t3 * this.props[2] + e3 * this.props[6] + r3 * this.props[10] + this.props[14]];
          }
          function k(t3, e3) {
            if (this.isIdentity())
              return t3 + "," + e3;
            var r3 = this.props;
            return Math.round(100 * (t3 * r3[0] + e3 * r3[4] + r3[12])) / 100 + "," + Math.round(100 * (t3 * r3[1] + e3 * r3[5] + r3[13])) / 100;
          }
          function D2() {
            for (var t3 = 0, e3 = this.props, r3 = "matrix3d("; t3 < 16; )
              r3 += i2(1e4 * e3[t3]) / 1e4, r3 += 15 === t3 ? ")" : ",", t3 += 1;
            return r3;
          }
          function M2(t3) {
            return t3 < 1e-6 && t3 > 0 || t3 > -1e-6 && t3 < 0 ? i2(1e4 * t3) / 1e4 : t3;
          }
          function I2() {
            var t3 = this.props;
            return "matrix(" + M2(t3[0]) + "," + M2(t3[1]) + "," + M2(t3[4]) + "," + M2(t3[5]) + "," + M2(t3[12]) + "," + M2(t3[13]) + ")";
          }
          return function() {
            this.reset = s2, this.rotate = a2, this.rotateX = n2, this.rotateY = o2, this.rotateZ = h2, this.skew = p2, this.skewFromAxis = f2, this.shear = l2, this.scale = m2, this.setTransform = c2, this.translate = d2, this.transform = u2, this.applyToPoint = P2, this.applyToX = _2, this.applyToY = x, this.applyToZ = S2, this.applyToPointArray = A2, this.applyToTriplePoints = C2, this.applyToPointStringified = k, this.toCSS = D2, this.to2dCSS = I2, this.clone = v2, this.cloneFromProps = b2, this.equals = g2, this.inversePoints = T2, this.inversePoint = E2, this._t = this.transform, this.isIdentity = y2, this._identity = true, this._identityCalculated = false, this.props = createTypedArray("float32", 16), this.reset();
          };
        }();
        /*!
           Transformation Matrix v2.0
           (c) Epistemex 2014-2015
           www.epistemex.com
           By Ken Fyrstenberg
           Contributions by leeoniya.
           License: MIT, header required.
           */
        !function(t2, e2) {
          var r2 = this, i2 = e2.pow(256, 6), s2 = e2.pow(2, 52), a2 = 2 * s2;
          function n2(t3) {
            var e3, r3 = t3.length, i3 = this, s3 = 0, a3 = i3.i = i3.j = 0, n3 = i3.S = [];
            for (r3 || (t3 = [r3++]); s3 < 256; )
              n3[s3] = s3++;
            for (s3 = 0; s3 < 256; s3++)
              n3[s3] = n3[a3 = 255 & a3 + t3[s3 % r3] + (e3 = n3[s3])], n3[a3] = e3;
            i3.g = function(t4) {
              for (var e4, r4 = 0, s4 = i3.i, a4 = i3.j, n4 = i3.S; t4--; )
                e4 = n4[s4 = 255 & s4 + 1], r4 = 256 * r4 + n4[255 & (n4[s4] = n4[a4 = 255 & a4 + e4]) + (n4[a4] = e4)];
              return i3.i = s4, i3.j = a4, r4;
            };
          }
          function o2(t3, e3) {
            return e3.i = t3.i, e3.j = t3.j, e3.S = t3.S.slice(), e3;
          }
          function h2(t3, e3) {
            for (var r3, i3 = t3 + "", s3 = 0; s3 < i3.length; )
              e3[255 & s3] = 255 & (r3 ^= 19 * e3[255 & s3]) + i3.charCodeAt(s3++);
            return l2(e3);
          }
          function l2(t3) {
            return String.fromCharCode.apply(0, t3);
          }
          e2.seedrandom = function(p2, f2, m2) {
            var c2 = [], d2 = h2(function t3(e3, r3) {
              var i3, s3 = [], a3 = _typeof(e3);
              if (r3 && "object" == a3)
                for (i3 in e3)
                  try {
                    s3.push(t3(e3[i3], r3 - 1));
                  } catch (t4) {
                  }
              return s3.length ? s3 : "string" == a3 ? e3 : e3 + "\0";
            }((f2 = true === f2 ? { entropy: true } : f2 || {}).entropy ? [p2, l2(t2)] : null === p2 ? function() {
              try {
                var e3 = new Uint8Array(256);
                return (r2.crypto || r2.msCrypto).getRandomValues(e3), l2(e3);
              } catch (e4) {
                var i3 = r2.navigator, s3 = i3 && i3.plugins;
                return [+/* @__PURE__ */ new Date(), r2, s3, r2.screen, l2(t2)];
              }
            }() : p2, 3), c2), u2 = new n2(c2), y2 = function() {
              for (var t3 = u2.g(6), e3 = i2, r3 = 0; t3 < s2; )
                t3 = 256 * (t3 + r3), e3 *= 256, r3 = u2.g(1);
              for (; t3 >= a2; )
                t3 /= 2, e3 /= 2, r3 >>>= 1;
              return (t3 + r3) / e3;
            };
            return y2.int32 = function() {
              return 0 | u2.g(4);
            }, y2.quick = function() {
              return u2.g(4) / 4294967296;
            }, y2.double = y2, h2(l2(u2.S), t2), (f2.pass || m2 || function(t3, r3, i3, s3) {
              return s3 && (s3.S && o2(s3, u2), t3.state = function() {
                return o2(u2, {});
              }), i3 ? (e2.random = t3, r3) : t3;
            })(y2, d2, "global" in f2 ? f2.global : this == e2, f2.state);
          }, h2(e2.random(), t2);
        }([], BMMath);
        var BezierFactory = function() {
          var t2 = { getBezierEasing: function(t3, r3, i3, s3, a3) {
            var n3 = a3 || ("bez_" + t3 + "_" + r3 + "_" + i3 + "_" + s3).replace(/\./g, "p");
            if (e2[n3])
              return e2[n3];
            var o3 = new h2([t3, r3, i3, s3]);
            return e2[n3] = o3, o3;
          } }, e2 = {};
          var r2 = "function" == typeof Float32Array;
          function i2(t3, e3) {
            return 1 - 3 * e3 + 3 * t3;
          }
          function s2(t3, e3) {
            return 3 * e3 - 6 * t3;
          }
          function a2(t3) {
            return 3 * t3;
          }
          function n2(t3, e3, r3) {
            return ((i2(e3, r3) * t3 + s2(e3, r3)) * t3 + a2(e3)) * t3;
          }
          function o2(t3, e3, r3) {
            return 3 * i2(e3, r3) * t3 * t3 + 2 * s2(e3, r3) * t3 + a2(e3);
          }
          function h2(t3) {
            this._p = t3, this._mSampleValues = r2 ? new Float32Array(11) : new Array(11), this._precomputed = false, this.get = this.get.bind(this);
          }
          return h2.prototype = { get: function(t3) {
            var e3 = this._p[0], r3 = this._p[1], i3 = this._p[2], s3 = this._p[3];
            return this._precomputed || this._precompute(), e3 === r3 && i3 === s3 ? t3 : 0 === t3 ? 0 : 1 === t3 ? 1 : n2(this._getTForX(t3), r3, s3);
          }, _precompute: function() {
            var t3 = this._p[0], e3 = this._p[1], r3 = this._p[2], i3 = this._p[3];
            this._precomputed = true, t3 === e3 && r3 === i3 || this._calcSampleValues();
          }, _calcSampleValues: function() {
            for (var t3 = this._p[0], e3 = this._p[2], r3 = 0; r3 < 11; ++r3)
              this._mSampleValues[r3] = n2(0.1 * r3, t3, e3);
          }, _getTForX: function(t3) {
            for (var e3 = this._p[0], r3 = this._p[2], i3 = this._mSampleValues, s3 = 0, a3 = 1; 10 !== a3 && i3[a3] <= t3; ++a3)
              s3 += 0.1;
            var h3 = s3 + 0.1 * ((t3 - i3[--a3]) / (i3[a3 + 1] - i3[a3])), l2 = o2(h3, e3, r3);
            return l2 >= 1e-3 ? function(t4, e4, r4, i4) {
              for (var s4 = 0; s4 < 4; ++s4) {
                var a4 = o2(e4, r4, i4);
                if (0 === a4)
                  return e4;
                e4 -= (n2(e4, r4, i4) - t4) / a4;
              }
              return e4;
            }(t3, h3, e3, r3) : 0 === l2 ? h3 : function(t4, e4, r4, i4, s4) {
              var a4, o3, h4 = 0;
              do {
                (a4 = n2(o3 = e4 + (r4 - e4) / 2, i4, s4) - t4) > 0 ? r4 = o3 : e4 = o3;
              } while (Math.abs(a4) > 1e-7 && ++h4 < 10);
              return o3;
            }(t3, s3, s3 + 0.1, e3, r3);
          } }, t2;
        }();
        function extendPrototype(t2, e2) {
          var r2, i2, s2 = t2.length;
          for (r2 = 0; r2 < s2; r2 += 1)
            for (var a2 in i2 = t2[r2].prototype)
              i2.hasOwnProperty(a2) && (e2.prototype[a2] = i2[a2]);
        }
        function getDescriptor(t2, e2) {
          return Object.getOwnPropertyDescriptor(t2, e2);
        }
        function createProxyFunction(t2) {
          function e2() {
          }
          return e2.prototype = t2, e2;
        }
        function bezFunction() {
          function t2(t3, e3, r3, i3, s3, a3) {
            var n3 = t3 * i3 + e3 * s3 + r3 * a3 - s3 * i3 - a3 * t3 - r3 * e3;
            return n3 > -1e-3 && n3 < 1e-3;
          }
          var e2 = function(t3, e3, r3, i3) {
            var s3, a3, n3, o3, h2, l2, p2 = defaultCurveSegments, f2 = 0, m2 = [], c2 = [], d2 = bezier_length_pool.newElement();
            for (n3 = r3.length, s3 = 0; s3 < p2; s3 += 1) {
              for (h2 = s3 / (p2 - 1), l2 = 0, a3 = 0; a3 < n3; a3 += 1)
                o3 = bm_pow(1 - h2, 3) * t3[a3] + 3 * bm_pow(1 - h2, 2) * h2 * r3[a3] + 3 * (1 - h2) * bm_pow(h2, 2) * i3[a3] + bm_pow(h2, 3) * e3[a3], m2[a3] = o3, null !== c2[a3] && (l2 += bm_pow(m2[a3] - c2[a3], 2)), c2[a3] = m2[a3];
              l2 && (f2 += l2 = bm_sqrt(l2)), d2.percents[s3] = h2, d2.lengths[s3] = f2;
            }
            return d2.addedLength = f2, d2;
          };
          function r2(t3) {
            this.segmentLength = 0, this.points = new Array(t3);
          }
          function i2(t3, e3) {
            this.partialLength = t3, this.point = e3;
          }
          var s2, a2 = (s2 = {}, function(e3, a3, n3, o3) {
            var h2 = (e3[0] + "_" + e3[1] + "_" + a3[0] + "_" + a3[1] + "_" + n3[0] + "_" + n3[1] + "_" + o3[0] + "_" + o3[1]).replace(/\./g, "p");
            if (!s2[h2]) {
              var l2, p2, f2, m2, c2, d2, u2, y2 = defaultCurveSegments, g2 = 0, v2 = null;
              2 === e3.length && (e3[0] != a3[0] || e3[1] != a3[1]) && t2(e3[0], e3[1], a3[0], a3[1], e3[0] + n3[0], e3[1] + n3[1]) && t2(e3[0], e3[1], a3[0], a3[1], a3[0] + o3[0], a3[1] + o3[1]) && (y2 = 2);
              var b2 = new r2(y2);
              for (f2 = n3.length, l2 = 0; l2 < y2; l2 += 1) {
                for (u2 = createSizedArray(f2), c2 = l2 / (y2 - 1), d2 = 0, p2 = 0; p2 < f2; p2 += 1)
                  m2 = bm_pow(1 - c2, 3) * e3[p2] + 3 * bm_pow(1 - c2, 2) * c2 * (e3[p2] + n3[p2]) + 3 * (1 - c2) * bm_pow(c2, 2) * (a3[p2] + o3[p2]) + bm_pow(c2, 3) * a3[p2], u2[p2] = m2, null !== v2 && (d2 += bm_pow(u2[p2] - v2[p2], 2));
                g2 += d2 = bm_sqrt(d2), b2.points[l2] = new i2(d2, u2), v2 = u2;
              }
              b2.segmentLength = g2, s2[h2] = b2;
            }
            return s2[h2];
          });
          function n2(t3, e3) {
            var r3 = e3.percents, i3 = e3.lengths, s3 = r3.length, a3 = bm_floor((s3 - 1) * t3), n3 = t3 * e3.addedLength, o3 = 0;
            if (a3 === s3 - 1 || 0 === a3 || n3 === i3[a3])
              return r3[a3];
            for (var h2 = i3[a3] > n3 ? -1 : 1, l2 = true; l2; )
              if (i3[a3] <= n3 && i3[a3 + 1] > n3 ? (o3 = (n3 - i3[a3]) / (i3[a3 + 1] - i3[a3]), l2 = false) : a3 += h2, a3 < 0 || a3 >= s3 - 1) {
                if (a3 === s3 - 1)
                  return r3[a3];
                l2 = false;
              }
            return r3[a3] + (r3[a3 + 1] - r3[a3]) * o3;
          }
          var o2 = createTypedArray("float32", 8);
          return { getSegmentsLength: function(t3) {
            var r3, i3 = segments_length_pool.newElement(), s3 = t3.c, a3 = t3.v, n3 = t3.o, o3 = t3.i, h2 = t3._length, l2 = i3.lengths, p2 = 0;
            for (r3 = 0; r3 < h2 - 1; r3 += 1)
              l2[r3] = e2(a3[r3], a3[r3 + 1], n3[r3], o3[r3 + 1]), p2 += l2[r3].addedLength;
            return s3 && h2 && (l2[r3] = e2(a3[r3], a3[0], n3[r3], o3[0]), p2 += l2[r3].addedLength), i3.totalLength = p2, i3;
          }, getNewSegment: function(t3, e3, r3, i3, s3, a3, h2) {
            var l2, p2 = n2(s3 = s3 < 0 ? 0 : s3 > 1 ? 1 : s3, h2), f2 = n2(a3 = a3 > 1 ? 1 : a3, h2), m2 = t3.length, c2 = 1 - p2, d2 = 1 - f2, u2 = c2 * c2 * c2, y2 = p2 * c2 * c2 * 3, g2 = p2 * p2 * c2 * 3, v2 = p2 * p2 * p2, b2 = c2 * c2 * d2, P2 = p2 * c2 * d2 + c2 * p2 * d2 + c2 * c2 * f2, _2 = p2 * p2 * d2 + c2 * p2 * f2 + p2 * c2 * f2, x = p2 * p2 * f2, S2 = c2 * d2 * d2, E2 = p2 * d2 * d2 + c2 * f2 * d2 + c2 * d2 * f2, T2 = p2 * f2 * d2 + c2 * f2 * f2 + p2 * d2 * f2, C2 = p2 * f2 * f2, A2 = d2 * d2 * d2, k = f2 * d2 * d2 + d2 * f2 * d2 + d2 * d2 * f2, D2 = f2 * f2 * d2 + d2 * f2 * f2 + f2 * d2 * f2, M2 = f2 * f2 * f2;
            for (l2 = 0; l2 < m2; l2 += 1)
              o2[4 * l2] = Math.round(1e3 * (u2 * t3[l2] + y2 * r3[l2] + g2 * i3[l2] + v2 * e3[l2])) / 1e3, o2[4 * l2 + 1] = Math.round(1e3 * (b2 * t3[l2] + P2 * r3[l2] + _2 * i3[l2] + x * e3[l2])) / 1e3, o2[4 * l2 + 2] = Math.round(1e3 * (S2 * t3[l2] + E2 * r3[l2] + T2 * i3[l2] + C2 * e3[l2])) / 1e3, o2[4 * l2 + 3] = Math.round(1e3 * (A2 * t3[l2] + k * r3[l2] + D2 * i3[l2] + M2 * e3[l2])) / 1e3;
            return o2;
          }, getPointInSegment: function(t3, e3, r3, i3, s3, a3) {
            var o3 = n2(s3, a3), h2 = 1 - o3;
            return [Math.round(1e3 * (h2 * h2 * h2 * t3[0] + (o3 * h2 * h2 + h2 * o3 * h2 + h2 * h2 * o3) * r3[0] + (o3 * o3 * h2 + h2 * o3 * o3 + o3 * h2 * o3) * i3[0] + o3 * o3 * o3 * e3[0])) / 1e3, Math.round(1e3 * (h2 * h2 * h2 * t3[1] + (o3 * h2 * h2 + h2 * o3 * h2 + h2 * h2 * o3) * r3[1] + (o3 * o3 * h2 + h2 * o3 * o3 + o3 * h2 * o3) * i3[1] + o3 * o3 * o3 * e3[1])) / 1e3];
          }, buildBezierData: a2, pointOnLine2D: t2, pointOnLine3D: function(e3, r3, i3, s3, a3, n3, o3, h2, l2) {
            if (0 === i3 && 0 === n3 && 0 === l2)
              return t2(e3, r3, s3, a3, o3, h2);
            var p2, f2 = Math.sqrt(Math.pow(s3 - e3, 2) + Math.pow(a3 - r3, 2) + Math.pow(n3 - i3, 2)), m2 = Math.sqrt(Math.pow(o3 - e3, 2) + Math.pow(h2 - r3, 2) + Math.pow(l2 - i3, 2)), c2 = Math.sqrt(Math.pow(o3 - s3, 2) + Math.pow(h2 - a3, 2) + Math.pow(l2 - n3, 2));
            return (p2 = f2 > m2 ? f2 > c2 ? f2 - m2 - c2 : c2 - m2 - f2 : c2 > m2 ? c2 - m2 - f2 : m2 - f2 - c2) > -1e-4 && p2 < 1e-4;
          } };
        }
        !function() {
          for (var t2 = 0, e2 = ["ms", "moz", "webkit", "o"], r2 = 0; r2 < e2.length && !window.requestAnimationFrame; ++r2)
            window.requestAnimationFrame = window[e2[r2] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e2[r2] + "CancelAnimationFrame"] || window[e2[r2] + "CancelRequestAnimationFrame"];
          window.requestAnimationFrame || (window.requestAnimationFrame = function(e3, r3) {
            var i2 = (/* @__PURE__ */ new Date()).getTime(), s2 = Math.max(0, 16 - (i2 - t2)), a2 = setTimeout(function() {
              e3(i2 + s2);
            }, s2);
            return t2 = i2 + s2, a2;
          }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t3) {
            clearTimeout(t3);
          });
        }();
        var bez = bezFunction();
        function dataFunctionManager() {
          function t2(t3, e3) {
            for (var r3 = 0, i3 = e3.length; r3 < i3; ) {
              if (e3[r3].id === t3)
                return e3[r3].layers.__used ? JSON.parse(JSON.stringify(e3[r3].layers)) : (e3[r3].layers.__used = true, e3[r3].layers);
              r3 += 1;
            }
          }
          function e2(t3) {
            var i3, s3, a3;
            for (i3 = t3.length - 1; i3 >= 0; i3 -= 1)
              if ("sh" == t3[i3].ty) {
                if (t3[i3].ks.k.i)
                  r2(t3[i3].ks.k);
                else
                  for (a3 = t3[i3].ks.k.length, s3 = 0; s3 < a3; s3 += 1)
                    t3[i3].ks.k[s3].s && r2(t3[i3].ks.k[s3].s[0]), t3[i3].ks.k[s3].e && r2(t3[i3].ks.k[s3].e[0]);
              } else
                "gr" == t3[i3].ty && e2(t3[i3].it);
          }
          function r2(t3) {
            var e3, r3 = t3.i.length;
            for (e3 = 0; e3 < r3; e3 += 1)
              t3.i[e3][0] += t3.v[e3][0], t3.i[e3][1] += t3.v[e3][1], t3.o[e3][0] += t3.v[e3][0], t3.o[e3][1] += t3.v[e3][1];
          }
          function i2(t3, e3) {
            var r3 = e3 ? e3.split(".") : [100, 100, 100];
            return t3[0] > r3[0] || !(r3[0] > t3[0]) && (t3[1] > r3[1] || !(r3[1] > t3[1]) && (t3[2] > r3[2] || !(r3[2] > t3[2]) && void 0));
          }
          var s2, a2 = /* @__PURE__ */ function() {
            var t3 = [4, 4, 14];
            function e3(t4) {
              var e4, r3, i3, s3 = t4.length;
              for (e4 = 0; e4 < s3; e4 += 1)
                5 === t4[e4].ty && (r3 = t4[e4], i3 = void 0, i3 = r3.t.d, r3.t.d = { k: [{ s: i3, t: 0 }] });
            }
            return function(r3) {
              if (i2(t3, r3.v) && (e3(r3.layers), r3.assets)) {
                var s3, a3 = r3.assets.length;
                for (s3 = 0; s3 < a3; s3 += 1)
                  r3.assets[s3].layers && e3(r3.assets[s3].layers);
              }
            };
          }(), n2 = (s2 = [4, 7, 99], function(t3) {
            if (t3.chars && !i2(s2, t3.v)) {
              var e3, a3, n3, o3, h3, l3 = t3.chars.length;
              for (e3 = 0; e3 < l3; e3 += 1)
                if (t3.chars[e3].data && t3.chars[e3].data.shapes)
                  for (n3 = (h3 = t3.chars[e3].data.shapes[0].it).length, a3 = 0; a3 < n3; a3 += 1)
                    (o3 = h3[a3].ks.k).__converted || (r2(h3[a3].ks.k), o3.__converted = true);
            }
          }), o2 = /* @__PURE__ */ function() {
            var t3 = [4, 1, 9];
            function e3(t4) {
              var r4, i3, s3, a3 = t4.length;
              for (r4 = 0; r4 < a3; r4 += 1)
                if ("gr" === t4[r4].ty)
                  e3(t4[r4].it);
                else if ("fl" === t4[r4].ty || "st" === t4[r4].ty)
                  if (t4[r4].c.k && t4[r4].c.k[0].i)
                    for (s3 = t4[r4].c.k.length, i3 = 0; i3 < s3; i3 += 1)
                      t4[r4].c.k[i3].s && (t4[r4].c.k[i3].s[0] /= 255, t4[r4].c.k[i3].s[1] /= 255, t4[r4].c.k[i3].s[2] /= 255, t4[r4].c.k[i3].s[3] /= 255), t4[r4].c.k[i3].e && (t4[r4].c.k[i3].e[0] /= 255, t4[r4].c.k[i3].e[1] /= 255, t4[r4].c.k[i3].e[2] /= 255, t4[r4].c.k[i3].e[3] /= 255);
                  else
                    t4[r4].c.k[0] /= 255, t4[r4].c.k[1] /= 255, t4[r4].c.k[2] /= 255, t4[r4].c.k[3] /= 255;
            }
            function r3(t4) {
              var r4, i3 = t4.length;
              for (r4 = 0; r4 < i3; r4 += 1)
                4 === t4[r4].ty && e3(t4[r4].shapes);
            }
            return function(e4) {
              if (i2(t3, e4.v) && (r3(e4.layers), e4.assets)) {
                var s3, a3 = e4.assets.length;
                for (s3 = 0; s3 < a3; s3 += 1)
                  e4.assets[s3].layers && r3(e4.assets[s3].layers);
              }
            };
          }(), h2 = /* @__PURE__ */ function() {
            var t3 = [4, 4, 18];
            function e3(t4) {
              var r4, i3, s3;
              for (r4 = t4.length - 1; r4 >= 0; r4 -= 1)
                if ("sh" == t4[r4].ty) {
                  if (t4[r4].ks.k.i)
                    t4[r4].ks.k.c = t4[r4].closed;
                  else
                    for (s3 = t4[r4].ks.k.length, i3 = 0; i3 < s3; i3 += 1)
                      t4[r4].ks.k[i3].s && (t4[r4].ks.k[i3].s[0].c = t4[r4].closed), t4[r4].ks.k[i3].e && (t4[r4].ks.k[i3].e[0].c = t4[r4].closed);
                } else
                  "gr" == t4[r4].ty && e3(t4[r4].it);
            }
            function r3(t4) {
              var r4, i3, s3, a3, n3, o3, h3 = t4.length;
              for (i3 = 0; i3 < h3; i3 += 1) {
                if ((r4 = t4[i3]).hasMask) {
                  var l3 = r4.masksProperties;
                  for (a3 = l3.length, s3 = 0; s3 < a3; s3 += 1)
                    if (l3[s3].pt.k.i)
                      l3[s3].pt.k.c = l3[s3].cl;
                    else
                      for (o3 = l3[s3].pt.k.length, n3 = 0; n3 < o3; n3 += 1)
                        l3[s3].pt.k[n3].s && (l3[s3].pt.k[n3].s[0].c = l3[s3].cl), l3[s3].pt.k[n3].e && (l3[s3].pt.k[n3].e[0].c = l3[s3].cl);
                }
                4 === r4.ty && e3(r4.shapes);
              }
            }
            return function(e4) {
              if (i2(t3, e4.v) && (r3(e4.layers), e4.assets)) {
                var s3, a3 = e4.assets.length;
                for (s3 = 0; s3 < a3; s3 += 1)
                  e4.assets[s3].layers && r3(e4.assets[s3].layers);
              }
            };
          }();
          function l2(t3, e3) {
            0 !== t3.t.a.length || "m" in t3.t.p || (t3.singleShape = true);
          }
          var p2 = { completeData: function(i3, s3) {
            i3.__complete || (o2(i3), a2(i3), n2(i3), h2(i3), function i4(s4, a3, n3) {
              var o3, h3, p3, f2, m2, c2, d2 = s4.length;
              for (h3 = 0; h3 < d2; h3 += 1)
                if ("ks" in (o3 = s4[h3]) && !o3.completed) {
                  if (o3.completed = true, o3.tt && (s4[h3 - 1].td = o3.tt), o3.hasMask) {
                    var u2 = o3.masksProperties;
                    for (f2 = u2.length, p3 = 0; p3 < f2; p3 += 1)
                      if (u2[p3].pt.k.i)
                        r2(u2[p3].pt.k);
                      else
                        for (c2 = u2[p3].pt.k.length, m2 = 0; m2 < c2; m2 += 1)
                          u2[p3].pt.k[m2].s && r2(u2[p3].pt.k[m2].s[0]), u2[p3].pt.k[m2].e && r2(u2[p3].pt.k[m2].e[0]);
                  }
                  0 === o3.ty ? (o3.layers = t2(o3.refId, a3), i4(o3.layers, a3)) : 4 === o3.ty ? e2(o3.shapes) : 5 == o3.ty && l2(o3);
                }
            }(i3.layers, i3.assets), i3.__complete = true);
          } };
          return p2;
        }
        var dataManager = dataFunctionManager(), FontManager = function() {
          var t2 = { w: 0, size: 0, shapes: [] }, e2 = [];
          function r2(t3, e3) {
            var r3 = createTag("span");
            r3.style.fontFamily = e3;
            var i3 = createTag("span");
            i3.innerHTML = "giItT1WQy@!-/#", r3.style.position = "absolute", r3.style.left = "-10000px", r3.style.top = "-10000px", r3.style.fontSize = "300px", r3.style.fontVariant = "normal", r3.style.fontStyle = "normal", r3.style.fontWeight = "normal", r3.style.letterSpacing = "0", r3.appendChild(i3), document.body.appendChild(r3);
            var s3 = i3.offsetWidth;
            return i3.style.fontFamily = t3 + ", " + e3, { node: i3, w: s3, parent: r3 };
          }
          function i2(t3, e3) {
            var r3 = createNS("text");
            return r3.style.fontSize = "100px", r3.setAttribute("font-family", e3.fFamily), r3.setAttribute("font-style", e3.fStyle), r3.setAttribute("font-weight", e3.fWeight), r3.textContent = "1", e3.fClass ? (r3.style.fontFamily = "inherit", r3.setAttribute("class", e3.fClass)) : r3.style.fontFamily = e3.fFamily, t3.appendChild(r3), createTag("canvas").getContext("2d").font = e3.fWeight + " " + e3.fStyle + " 100px " + e3.fFamily, r3;
          }
          e2 = e2.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
          var s2 = function() {
            this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = false, this.initTime = Date.now();
          };
          return s2.getCombinedCharacterCodes = function() {
            return e2;
          }, s2.prototype.addChars = function(t3) {
            if (t3) {
              this.chars || (this.chars = []);
              var e3, r3, i3, s3 = t3.length, a2 = this.chars.length;
              for (e3 = 0; e3 < s3; e3 += 1) {
                for (r3 = 0, i3 = false; r3 < a2; )
                  this.chars[r3].style === t3[e3].style && this.chars[r3].fFamily === t3[e3].fFamily && this.chars[r3].ch === t3[e3].ch && (i3 = true), r3 += 1;
                i3 || (this.chars.push(t3[e3]), a2 += 1);
              }
            }
          }, s2.prototype.addFonts = function(t3, e3) {
            if (t3) {
              if (this.chars)
                return this.isLoaded = true, void (this.fonts = t3.list);
              var s3, a2 = t3.list, n2 = a2.length, o2 = n2;
              for (s3 = 0; s3 < n2; s3 += 1) {
                var h2, l2, p2 = true;
                if (a2[s3].loaded = false, a2[s3].monoCase = r2(a2[s3].fFamily, "monospace"), a2[s3].sansCase = r2(a2[s3].fFamily, "sans-serif"), a2[s3].fPath) {
                  if ("p" === a2[s3].fOrigin || 3 === a2[s3].origin) {
                    if ((h2 = document.querySelectorAll('style[f-forigin="p"][f-family="' + a2[s3].fFamily + '"], style[f-origin="3"][f-family="' + a2[s3].fFamily + '"]')).length > 0 && (p2 = false), p2) {
                      var f2 = createTag("style");
                      f2.setAttribute("f-forigin", a2[s3].fOrigin), f2.setAttribute("f-origin", a2[s3].origin), f2.setAttribute("f-family", a2[s3].fFamily), f2.type = "text/css", f2.innerHTML = "@font-face {font-family: " + a2[s3].fFamily + "; font-style: normal; src: url('" + a2[s3].fPath + "');}", e3.appendChild(f2);
                    }
                  } else if ("g" === a2[s3].fOrigin || 1 === a2[s3].origin) {
                    for (h2 = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l2 = 0; l2 < h2.length; l2++)
                      -1 !== h2[l2].href.indexOf(a2[s3].fPath) && (p2 = false);
                    if (p2) {
                      var m2 = createTag("link");
                      m2.setAttribute("f-forigin", a2[s3].fOrigin), m2.setAttribute("f-origin", a2[s3].origin), m2.type = "text/css", m2.rel = "stylesheet", m2.href = a2[s3].fPath, document.body.appendChild(m2);
                    }
                  } else if ("t" === a2[s3].fOrigin || 2 === a2[s3].origin) {
                    for (h2 = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l2 = 0; l2 < h2.length; l2++)
                      a2[s3].fPath === h2[l2].src && (p2 = false);
                    if (p2) {
                      var c2 = createTag("link");
                      c2.setAttribute("f-forigin", a2[s3].fOrigin), c2.setAttribute("f-origin", a2[s3].origin), c2.setAttribute("rel", "stylesheet"), c2.setAttribute("href", a2[s3].fPath), e3.appendChild(c2);
                    }
                  }
                } else
                  a2[s3].loaded = true, o2 -= 1;
                a2[s3].helper = i2(e3, a2[s3]), a2[s3].cache = {}, this.fonts.push(a2[s3]);
              }
              0 === o2 ? this.isLoaded = true : setTimeout(this.checkLoadedFonts.bind(this), 100);
            } else
              this.isLoaded = true;
          }, s2.prototype.getCharData = function(e3, r3, i3) {
            for (var s3 = 0, a2 = this.chars.length; s3 < a2; ) {
              if (this.chars[s3].ch === e3 && this.chars[s3].style === r3 && this.chars[s3].fFamily === i3)
                return this.chars[s3];
              s3 += 1;
            }
            return ("string" == typeof e3 && 13 !== e3.charCodeAt(0) || !e3) && console && console.warn && index.__f__("warn", "at node_modules/lottie-miniprogram/miniprogram_dist/index.js:9", "Missing character from exported characters list: ", e3, r3, i3), t2;
          }, s2.prototype.getFontByName = function(t3) {
            for (var e3 = 0, r3 = this.fonts.length; e3 < r3; ) {
              if (this.fonts[e3].fName === t3)
                return this.fonts[e3];
              e3 += 1;
            }
            return this.fonts[0];
          }, s2.prototype.measureText = function(t3, e3, r3) {
            var i3 = this.getFontByName(e3), s3 = t3.charCodeAt(0);
            if (!i3.cache[s3 + 1]) {
              var a2 = i3.helper;
              if (" " === t3) {
                a2.textContent = "|" + t3 + "|";
                var n2 = a2.getComputedTextLength();
                a2.textContent = "||";
                var o2 = a2.getComputedTextLength();
                i3.cache[s3 + 1] = (n2 - o2) / 100;
              } else
                a2.textContent = t3, i3.cache[s3 + 1] = a2.getComputedTextLength() / 100;
            }
            return i3.cache[s3 + 1] * r3;
          }, s2.prototype.checkLoadedFonts = function() {
            var t3, e3, r3, i3 = this.fonts.length, s3 = i3;
            for (t3 = 0; t3 < i3; t3 += 1)
              this.fonts[t3].loaded ? s3 -= 1 : "n" === this.fonts[t3].fOrigin || 0 === this.fonts[t3].origin ? this.fonts[t3].loaded = true : (e3 = this.fonts[t3].monoCase.node, r3 = this.fonts[t3].monoCase.w, e3.offsetWidth !== r3 ? (s3 -= 1, this.fonts[t3].loaded = true) : (e3 = this.fonts[t3].sansCase.node, r3 = this.fonts[t3].sansCase.w, e3.offsetWidth !== r3 && (s3 -= 1, this.fonts[t3].loaded = true)), this.fonts[t3].loaded && (this.fonts[t3].sansCase.parent.parentNode.removeChild(this.fonts[t3].sansCase.parent), this.fonts[t3].monoCase.parent.parentNode.removeChild(this.fonts[t3].monoCase.parent)));
            0 !== s3 && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout((function() {
              this.isLoaded = true;
            }).bind(this), 0);
          }, s2.prototype.loaded = function() {
            return this.isLoaded;
          }, s2;
        }(), PropertyFactory = /* @__PURE__ */ function() {
          var t2 = initialDefaultFrame, e2 = Math.abs;
          function r2(t3, e3) {
            var r3, s3 = this.offsetTime;
            "multidimensional" === this.propType && (r3 = createTypedArray("float32", this.pv.length));
            for (var a3, n3, o3, h3, l3, p3, f3, m2, c2 = e3.lastIndex, d2 = c2, u2 = this.keyframes.length - 1, y2 = true; y2; ) {
              if (a3 = this.keyframes[d2], n3 = this.keyframes[d2 + 1], d2 === u2 - 1 && t3 >= n3.t - s3) {
                a3.h && (a3 = n3), c2 = 0;
                break;
              }
              if (n3.t - s3 > t3) {
                c2 = d2;
                break;
              }
              d2 < u2 - 1 ? d2 += 1 : (c2 = 0, y2 = false);
            }
            var g2, v2 = n3.t - s3, b2 = a3.t - s3;
            if (a3.to) {
              a3.bezierData || (a3.bezierData = bez.buildBezierData(a3.s, n3.s || a3.e, a3.to, a3.ti));
              var P2 = a3.bezierData;
              if (t3 >= v2 || t3 < b2) {
                var _2 = t3 >= v2 ? P2.points.length - 1 : 0;
                for (h3 = P2.points[_2].point.length, o3 = 0; o3 < h3; o3 += 1)
                  r3[o3] = P2.points[_2].point[o3];
              } else {
                a3.__fnct ? m2 = a3.__fnct : (m2 = BezierFactory.getBezierEasing(a3.o.x, a3.o.y, a3.i.x, a3.i.y, a3.n).get, a3.__fnct = m2), l3 = m2((t3 - b2) / (v2 - b2));
                var x, S2 = P2.segmentLength * l3, E2 = e3.lastFrame < t3 && e3._lastKeyframeIndex === d2 ? e3._lastAddedLength : 0;
                for (f3 = e3.lastFrame < t3 && e3._lastKeyframeIndex === d2 ? e3._lastPoint : 0, y2 = true, p3 = P2.points.length; y2; ) {
                  if (E2 += P2.points[f3].partialLength, 0 === S2 || 0 === l3 || f3 === P2.points.length - 1) {
                    for (h3 = P2.points[f3].point.length, o3 = 0; o3 < h3; o3 += 1)
                      r3[o3] = P2.points[f3].point[o3];
                    break;
                  }
                  if (S2 >= E2 && S2 < E2 + P2.points[f3 + 1].partialLength) {
                    for (x = (S2 - E2) / P2.points[f3 + 1].partialLength, h3 = P2.points[f3].point.length, o3 = 0; o3 < h3; o3 += 1)
                      r3[o3] = P2.points[f3].point[o3] + (P2.points[f3 + 1].point[o3] - P2.points[f3].point[o3]) * x;
                    break;
                  }
                  f3 < p3 - 1 ? f3 += 1 : y2 = false;
                }
                e3._lastPoint = f3, e3._lastAddedLength = E2 - P2.points[f3].partialLength, e3._lastKeyframeIndex = d2;
              }
            } else {
              var T2, C2, A2, k, D2;
              if (u2 = a3.s.length, g2 = n3.s || a3.e, this.sh && 1 !== a3.h)
                if (t3 >= v2)
                  r3[0] = g2[0], r3[1] = g2[1], r3[2] = g2[2];
                else if (t3 <= b2)
                  r3[0] = a3.s[0], r3[1] = a3.s[1], r3[2] = a3.s[2];
                else {
                  !function(t4, e4) {
                    var r4 = e4[0], i3 = e4[1], s4 = e4[2], a4 = e4[3], n4 = Math.atan2(2 * i3 * a4 - 2 * r4 * s4, 1 - 2 * i3 * i3 - 2 * s4 * s4), o4 = Math.asin(2 * r4 * i3 + 2 * s4 * a4), h4 = Math.atan2(2 * r4 * a4 - 2 * i3 * s4, 1 - 2 * r4 * r4 - 2 * s4 * s4);
                    t4[0] = n4 / degToRads, t4[1] = o4 / degToRads, t4[2] = h4 / degToRads;
                  }(r3, function(t4, e4, r4) {
                    var i3, s4, a4, n4, o4, h4 = [], l4 = t4[0], p4 = t4[1], f4 = t4[2], m3 = t4[3], c3 = e4[0], d3 = e4[1], u3 = e4[2], y3 = e4[3];
                    (s4 = l4 * c3 + p4 * d3 + f4 * u3 + m3 * y3) < 0 && (s4 = -s4, c3 = -c3, d3 = -d3, u3 = -u3, y3 = -y3);
                    1 - s4 > 1e-6 ? (i3 = Math.acos(s4), a4 = Math.sin(i3), n4 = Math.sin((1 - r4) * i3) / a4, o4 = Math.sin(r4 * i3) / a4) : (n4 = 1 - r4, o4 = r4);
                    return h4[0] = n4 * l4 + o4 * c3, h4[1] = n4 * p4 + o4 * d3, h4[2] = n4 * f4 + o4 * u3, h4[3] = n4 * m3 + o4 * y3, h4;
                  }(i2(a3.s), i2(g2), (t3 - b2) / (v2 - b2)));
                }
              else
                for (d2 = 0; d2 < u2; d2 += 1)
                  1 !== a3.h && (t3 >= v2 ? l3 = 1 : t3 < b2 ? l3 = 0 : (a3.o.x.constructor === Array ? (a3.__fnct || (a3.__fnct = []), a3.__fnct[d2] ? m2 = a3.__fnct[d2] : (T2 = void 0 === a3.o.x[d2] ? a3.o.x[0] : a3.o.x[d2], C2 = void 0 === a3.o.y[d2] ? a3.o.y[0] : a3.o.y[d2], A2 = void 0 === a3.i.x[d2] ? a3.i.x[0] : a3.i.x[d2], k = void 0 === a3.i.y[d2] ? a3.i.y[0] : a3.i.y[d2], m2 = BezierFactory.getBezierEasing(T2, C2, A2, k).get, a3.__fnct[d2] = m2)) : a3.__fnct ? m2 = a3.__fnct : (T2 = a3.o.x, C2 = a3.o.y, A2 = a3.i.x, k = a3.i.y, m2 = BezierFactory.getBezierEasing(T2, C2, A2, k).get, a3.__fnct = m2), l3 = m2((t3 - b2) / (v2 - b2)))), g2 = n3.s || a3.e, D2 = 1 === a3.h ? a3.s[d2] : a3.s[d2] + (g2[d2] - a3.s[d2]) * l3, 1 === u2 ? r3 = D2 : r3[d2] = D2;
            }
            return e3.lastIndex = c2, r3;
          }
          function i2(t3) {
            var e3 = t3[0] * degToRads, r3 = t3[1] * degToRads, i3 = t3[2] * degToRads, s3 = Math.cos(e3 / 2), a3 = Math.cos(r3 / 2), n3 = Math.cos(i3 / 2), o3 = Math.sin(e3 / 2), h3 = Math.sin(r3 / 2), l3 = Math.sin(i3 / 2);
            return [o3 * h3 * n3 + s3 * a3 * l3, o3 * a3 * n3 + s3 * h3 * l3, s3 * h3 * n3 - o3 * a3 * l3, s3 * a3 * n3 - o3 * h3 * l3];
          }
          function s2() {
            var e3 = this.comp.renderedFrame - this.offsetTime, r3 = this.keyframes[0].t - this.offsetTime, i3 = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
            if (!(e3 === this._caching.lastFrame || this._caching.lastFrame !== t2 && (this._caching.lastFrame >= i3 && e3 >= i3 || this._caching.lastFrame < r3 && e3 < r3))) {
              this._caching.lastFrame >= e3 && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
              var s3 = this.interpolateValue(e3, this._caching);
              this.pv = s3;
            }
            return this._caching.lastFrame = e3, this.pv;
          }
          function a2(t3) {
            var r3;
            if ("unidimensional" === this.propType)
              r3 = t3 * this.mult, e2(this.v - r3) > 1e-5 && (this.v = r3, this._mdf = true);
            else
              for (var i3 = 0, s3 = this.v.length; i3 < s3; )
                r3 = t3[i3] * this.mult, e2(this.v[i3] - r3) > 1e-5 && (this.v[i3] = r3, this._mdf = true), i3 += 1;
          }
          function n2() {
            if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
              if (this.lock)
                this.setVValue(this.pv);
              else {
                this.lock = true, this._mdf = this._isFirstFrame;
                var t3, e3 = this.effectsSequence.length, r3 = this.kf ? this.pv : this.data.k;
                for (t3 = 0; t3 < e3; t3 += 1)
                  r3 = this.effectsSequence[t3](r3);
                this.setVValue(r3), this._isFirstFrame = false, this.lock = false, this.frameId = this.elem.globalData.frameId;
              }
          }
          function o2(t3) {
            this.effectsSequence.push(t3), this.container.addDynamicProperty(this);
          }
          function h2(t3, e3, r3, i3) {
            this.propType = "unidimensional", this.mult = r3 || 1, this.data = e3, this.v = r3 ? e3.k * r3 : e3.k, this.pv = e3.k, this._mdf = false, this.elem = t3, this.container = i3, this.comp = t3.comp, this.k = false, this.kf = false, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = true, this.getValue = n2, this.setVValue = a2, this.addEffect = o2;
          }
          function l2(t3, e3, r3, i3) {
            this.propType = "multidimensional", this.mult = r3 || 1, this.data = e3, this._mdf = false, this.elem = t3, this.container = i3, this.comp = t3.comp, this.k = false, this.kf = false, this.frameId = -1;
            var s3, h3 = e3.k.length;
            this.v = createTypedArray("float32", h3), this.pv = createTypedArray("float32", h3);
            createTypedArray("float32", h3);
            for (this.vel = createTypedArray("float32", h3), s3 = 0; s3 < h3; s3 += 1)
              this.v[s3] = e3.k[s3] * this.mult, this.pv[s3] = e3.k[s3];
            this._isFirstFrame = true, this.effectsSequence = [], this.getValue = n2, this.setVValue = a2, this.addEffect = o2;
          }
          function p2(e3, i3, h3, l3) {
            this.propType = "unidimensional", this.keyframes = i3.k, this.offsetTime = e3.data.st, this.frameId = -1, this._caching = { lastFrame: t2, lastIndex: 0, value: 0, _lastKeyframeIndex: -1 }, this.k = true, this.kf = true, this.data = i3, this.mult = h3 || 1, this.elem = e3, this.container = l3, this.comp = e3.comp, this.v = t2, this.pv = t2, this._isFirstFrame = true, this.getValue = n2, this.setVValue = a2, this.interpolateValue = r2, this.effectsSequence = [s2.bind(this)], this.addEffect = o2;
          }
          function f2(e3, i3, h3, l3) {
            this.propType = "multidimensional";
            var p3, f3, m2, c2, d2, u2 = i3.k.length;
            for (p3 = 0; p3 < u2 - 1; p3 += 1)
              i3.k[p3].to && i3.k[p3].s && i3.k[p3].e && (f3 = i3.k[p3].s, m2 = i3.k[p3].e, c2 = i3.k[p3].to, d2 = i3.k[p3].ti, (2 === f3.length && (f3[0] !== m2[0] || f3[1] !== m2[1]) && bez.pointOnLine2D(f3[0], f3[1], m2[0], m2[1], f3[0] + c2[0], f3[1] + c2[1]) && bez.pointOnLine2D(f3[0], f3[1], m2[0], m2[1], m2[0] + d2[0], m2[1] + d2[1]) || 3 === f3.length && (f3[0] !== m2[0] || f3[1] !== m2[1] || f3[2] !== m2[2]) && bez.pointOnLine3D(f3[0], f3[1], f3[2], m2[0], m2[1], m2[2], f3[0] + c2[0], f3[1] + c2[1], f3[2] + c2[2]) && bez.pointOnLine3D(f3[0], f3[1], f3[2], m2[0], m2[1], m2[2], m2[0] + d2[0], m2[1] + d2[1], m2[2] + d2[2])) && (i3.k[p3].to = null, i3.k[p3].ti = null), f3[0] === m2[0] && f3[1] === m2[1] && 0 === c2[0] && 0 === c2[1] && 0 === d2[0] && 0 === d2[1] && (2 === f3.length || f3[2] === m2[2] && 0 === c2[2] && 0 === d2[2]) && (i3.k[p3].to = null, i3.k[p3].ti = null));
            this.effectsSequence = [s2.bind(this)], this.keyframes = i3.k, this.offsetTime = e3.data.st, this.k = true, this.kf = true, this._isFirstFrame = true, this.mult = h3 || 1, this.elem = e3, this.container = l3, this.comp = e3.comp, this.getValue = n2, this.setVValue = a2, this.interpolateValue = r2, this.frameId = -1;
            var y2 = i3.k[0].s.length;
            for (this.v = createTypedArray("float32", y2), this.pv = createTypedArray("float32", y2), p3 = 0; p3 < y2; p3 += 1)
              this.v[p3] = t2, this.pv[p3] = t2;
            this._caching = { lastFrame: t2, lastIndex: 0, value: createTypedArray("float32", y2) }, this.addEffect = o2;
          }
          return { getProp: function(t3, e3, r3, i3, s3) {
            var a3;
            if (e3.k.length)
              if ("number" == typeof e3.k[0])
                a3 = new l2(t3, e3, i3, s3);
              else
                switch (r3) {
                  case 0:
                    a3 = new p2(t3, e3, i3, s3);
                    break;
                  case 1:
                    a3 = new f2(t3, e3, i3, s3);
                }
            else
              a3 = new h2(t3, e3, i3, s3);
            return a3.effectsSequence.length && s3.addDynamicProperty(a3), a3;
          } };
        }(), TransformPropertyFactory = function() {
          function t2(t3, e2, r2) {
            if (this.elem = t3, this.frameId = -1, this.propType = "transform", this.data = e2, this.v = new Matrix(), this.pre = new Matrix(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(r2 || t3), e2.p && e2.p.s ? (this.px = PropertyFactory.getProp(t3, e2.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t3, e2.p.y, 0, 0, this), e2.p.z && (this.pz = PropertyFactory.getProp(t3, e2.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t3, e2.p || { k: [0, 0, 0] }, 1, 0, this), e2.rx) {
              if (this.rx = PropertyFactory.getProp(t3, e2.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t3, e2.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t3, e2.rz, 0, degToRads, this), e2.or.k[0].ti) {
                var i2, s2 = e2.or.k.length;
                for (i2 = 0; i2 < s2; i2 += 1)
                  e2.or.k[i2].to = e2.or.k[i2].ti = null;
              }
              this.or = PropertyFactory.getProp(t3, e2.or, 1, degToRads, this), this.or.sh = true;
            } else
              this.r = PropertyFactory.getProp(t3, e2.r || { k: 0 }, 0, degToRads, this);
            e2.sk && (this.sk = PropertyFactory.getProp(t3, e2.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t3, e2.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t3, e2.a || { k: [0, 0, 0] }, 1, 0, this), this.s = PropertyFactory.getProp(t3, e2.s || { k: [100, 100, 100] }, 1, 0.01, this), e2.o ? this.o = PropertyFactory.getProp(t3, e2.o, 0, 0.01, t3) : this.o = { _mdf: false, v: 1 }, this._isDirty = true, this.dynamicProperties.length || this.getValue(true);
          }
          return t2.prototype = { applyToMatrix: function(t3) {
            var e2 = this._mdf;
            this.iterateDynamicProperties(), this._mdf = this._mdf || e2, this.a && t3.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t3.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t3.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t3.rotate(-this.r.v) : t3.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t3.translate(this.px.v, this.py.v, -this.pz.v) : t3.translate(this.px.v, this.py.v, 0) : t3.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
          }, getValue: function(t3) {
            if (this.elem.globalData.frameId !== this.frameId) {
              if (this._isDirty && (this.precalculateMatrix(), this._isDirty = false), this.iterateDynamicProperties(), this._mdf || t3) {
                if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                  var e2, r2, i2 = this.elem.globalData.frameRate;
                  if (this.p && this.p.keyframes && this.p.getValueAtTime)
                    this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e2 = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / i2, 0), r2 = this.p.getValueAtTime(this.p.keyframes[0].t / i2, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e2 = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / i2, 0), r2 = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.01) / i2, 0)) : (e2 = this.p.pv, r2 = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / i2, this.p.offsetTime));
                  else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                    e2 = [], r2 = [];
                    var s2 = this.px, a2 = this.py;
                    s2._caching.lastFrame + s2.offsetTime <= s2.keyframes[0].t ? (e2[0] = s2.getValueAtTime((s2.keyframes[0].t + 0.01) / i2, 0), e2[1] = a2.getValueAtTime((a2.keyframes[0].t + 0.01) / i2, 0), r2[0] = s2.getValueAtTime(s2.keyframes[0].t / i2, 0), r2[1] = a2.getValueAtTime(a2.keyframes[0].t / i2, 0)) : s2._caching.lastFrame + s2.offsetTime >= s2.keyframes[s2.keyframes.length - 1].t ? (e2[0] = s2.getValueAtTime(s2.keyframes[s2.keyframes.length - 1].t / i2, 0), e2[1] = a2.getValueAtTime(a2.keyframes[a2.keyframes.length - 1].t / i2, 0), r2[0] = s2.getValueAtTime((s2.keyframes[s2.keyframes.length - 1].t - 0.01) / i2, 0), r2[1] = a2.getValueAtTime((a2.keyframes[a2.keyframes.length - 1].t - 0.01) / i2, 0)) : (e2 = [s2.pv, a2.pv], r2[0] = s2.getValueAtTime((s2._caching.lastFrame + s2.offsetTime - 0.01) / i2, s2.offsetTime), r2[1] = a2.getValueAtTime((a2._caching.lastFrame + a2.offsetTime - 0.01) / i2, a2.offsetTime));
                  }
                  this.v.rotate(-Math.atan2(e2[1] - r2[1], e2[0] - r2[0]));
                }
                this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
              }
              this.frameId = this.elem.globalData.frameId;
            }
          }, precalculateMatrix: function() {
            if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
              if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
                if (this.sk.effectsSequence.length || this.sa.effectsSequence.length)
                  return;
                this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3;
              }
              if (this.r) {
                if (this.r.effectsSequence.length)
                  return;
                this.pre.rotate(-this.r.v), this.appliedTransformations = 4;
              } else
                this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4);
            }
          }, autoOrient: function() {
          } }, extendPrototype([DynamicPropertyContainer], t2), t2.prototype.addDynamicProperty = function(t3) {
            this._addDynamicProperty(t3), this.elem.addDynamicProperty(t3), this._isDirty = true;
          }, t2.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, { getTransformProperty: function(e2, r2, i2) {
            return new t2(e2, r2, i2);
          } };
        }();
        function ShapePath() {
          this.c = false, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength);
        }
        ShapePath.prototype.setPathData = function(t2, e2) {
          this.c = t2, this.setLength(e2);
          for (var r2 = 0; r2 < e2; )
            this.v[r2] = point_pool.newElement(), this.o[r2] = point_pool.newElement(), this.i[r2] = point_pool.newElement(), r2 += 1;
        }, ShapePath.prototype.setLength = function(t2) {
          for (; this._maxLength < t2; )
            this.doubleArrayLength();
          this._length = t2;
        }, ShapePath.prototype.doubleArrayLength = function() {
          this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2;
        }, ShapePath.prototype.setXYAt = function(t2, e2, r2, i2, s2) {
          var a2;
          switch (this._length = Math.max(this._length, i2 + 1), this._length >= this._maxLength && this.doubleArrayLength(), r2) {
            case "v":
              a2 = this.v;
              break;
            case "i":
              a2 = this.i;
              break;
            case "o":
              a2 = this.o;
          }
          (!a2[i2] || a2[i2] && !s2) && (a2[i2] = point_pool.newElement()), a2[i2][0] = t2, a2[i2][1] = e2;
        }, ShapePath.prototype.setTripleAt = function(t2, e2, r2, i2, s2, a2, n2, o2) {
          this.setXYAt(t2, e2, "v", n2, o2), this.setXYAt(r2, i2, "o", n2, o2), this.setXYAt(s2, a2, "i", n2, o2);
        }, ShapePath.prototype.reverse = function() {
          var t2 = new ShapePath();
          t2.setPathData(this.c, this._length);
          var e2 = this.v, r2 = this.o, i2 = this.i, s2 = 0;
          this.c && (t2.setTripleAt(e2[0][0], e2[0][1], i2[0][0], i2[0][1], r2[0][0], r2[0][1], 0, false), s2 = 1);
          var a2, n2 = this._length - 1, o2 = this._length;
          for (a2 = s2; a2 < o2; a2 += 1)
            t2.setTripleAt(e2[n2][0], e2[n2][1], i2[n2][0], i2[n2][1], r2[n2][0], r2[n2][1], a2, false), n2 -= 1;
          return t2;
        };
        var ShapePropertyFactory = function() {
          function t2(t3, e3, r3) {
            var i3, s3, a3, n3, o3, h3, l3, p3, f3, m2 = r3.lastIndex, c2 = this.keyframes;
            if (t3 < c2[0].t - this.offsetTime)
              i3 = c2[0].s[0], a3 = true, m2 = 0;
            else if (t3 >= c2[c2.length - 1].t - this.offsetTime)
              i3 = c2[c2.length - 1].s ? c2[c2.length - 1].s[0] : c2[c2.length - 2].e[0], a3 = true;
            else {
              for (var d2, u2, y2 = m2, g2 = c2.length - 1, v2 = true; v2 && (d2 = c2[y2], !((u2 = c2[y2 + 1]).t - this.offsetTime > t3)); )
                y2 < g2 - 1 ? y2 += 1 : v2 = false;
              if (m2 = y2, !(a3 = 1 === d2.h)) {
                if (t3 >= u2.t - this.offsetTime)
                  p3 = 1;
                else if (t3 < d2.t - this.offsetTime)
                  p3 = 0;
                else {
                  var b2;
                  d2.__fnct ? b2 = d2.__fnct : (b2 = BezierFactory.getBezierEasing(d2.o.x, d2.o.y, d2.i.x, d2.i.y).get, d2.__fnct = b2), p3 = b2((t3 - (d2.t - this.offsetTime)) / (u2.t - this.offsetTime - (d2.t - this.offsetTime)));
                }
                s3 = u2.s ? u2.s[0] : d2.e[0];
              }
              i3 = d2.s[0];
            }
            for (h3 = e3._length, l3 = i3.i[0].length, r3.lastIndex = m2, n3 = 0; n3 < h3; n3 += 1)
              for (o3 = 0; o3 < l3; o3 += 1)
                f3 = a3 ? i3.i[n3][o3] : i3.i[n3][o3] + (s3.i[n3][o3] - i3.i[n3][o3]) * p3, e3.i[n3][o3] = f3, f3 = a3 ? i3.o[n3][o3] : i3.o[n3][o3] + (s3.o[n3][o3] - i3.o[n3][o3]) * p3, e3.o[n3][o3] = f3, f3 = a3 ? i3.v[n3][o3] : i3.v[n3][o3] + (s3.v[n3][o3] - i3.v[n3][o3]) * p3, e3.v[n3][o3] = f3;
          }
          function e2() {
            var t3 = this.comp.renderedFrame - this.offsetTime, e3 = this.keyframes[0].t - this.offsetTime, r3 = this.keyframes[this.keyframes.length - 1].t - this.offsetTime, i3 = this._caching.lastFrame;
            return -999999 !== i3 && (i3 < e3 && t3 < e3 || i3 > r3 && t3 > r3) || (this._caching.lastIndex = i3 < t3 ? this._caching.lastIndex : 0, this.interpolateShape(t3, this.pv, this._caching)), this._caching.lastFrame = t3, this.pv;
          }
          function r2() {
            this.paths = this.localShapeCollection;
          }
          function i2(t3) {
            (function(t4, e3) {
              if (t4._length !== e3._length || t4.c !== e3.c)
                return false;
              var r3, i3 = t4._length;
              for (r3 = 0; r3 < i3; r3 += 1)
                if (t4.v[r3][0] !== e3.v[r3][0] || t4.v[r3][1] !== e3.v[r3][1] || t4.o[r3][0] !== e3.o[r3][0] || t4.o[r3][1] !== e3.o[r3][1] || t4.i[r3][0] !== e3.i[r3][0] || t4.i[r3][1] !== e3.i[r3][1])
                  return false;
              return true;
            })(this.v, t3) || (this.v = shape_pool.clone(t3), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = true, this.paths = this.localShapeCollection);
          }
          function s2() {
            if (this.elem.globalData.frameId !== this.frameId)
              if (this.effectsSequence.length)
                if (this.lock)
                  this.setVValue(this.pv);
                else {
                  this.lock = true, this._mdf = false;
                  var t3, e3 = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k, r3 = this.effectsSequence.length;
                  for (t3 = 0; t3 < r3; t3 += 1)
                    e3 = this.effectsSequence[t3](e3);
                  this.setVValue(e3), this.lock = false, this.frameId = this.elem.globalData.frameId;
                }
              else
                this._mdf = false;
          }
          function a2(t3, e3, i3) {
            this.propType = "shape", this.comp = t3.comp, this.container = t3, this.elem = t3, this.data = e3, this.k = false, this.kf = false, this._mdf = false;
            var s3 = 3 === i3 ? e3.pt.k : e3.ks.k;
            this.v = shape_pool.clone(s3), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = r2, this.effectsSequence = [];
          }
          function n2(t3) {
            this.effectsSequence.push(t3), this.container.addDynamicProperty(this);
          }
          function o2(t3, i3, s3) {
            this.propType = "shape", this.comp = t3.comp, this.elem = t3, this.container = t3, this.offsetTime = t3.data.st, this.keyframes = 3 === s3 ? i3.pt.k : i3.ks.k, this.k = true, this.kf = true;
            var a3 = this.keyframes[0].s[0].i.length;
            this.keyframes[0].s[0].i[0].length;
            this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, a3), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = -999999, this.reset = r2, this._caching = { lastFrame: -999999, lastIndex: 0 }, this.effectsSequence = [e2.bind(this)];
          }
          a2.prototype.interpolateShape = t2, a2.prototype.getValue = s2, a2.prototype.setVValue = i2, a2.prototype.addEffect = n2, o2.prototype.getValue = s2, o2.prototype.interpolateShape = t2, o2.prototype.setVValue = i2, o2.prototype.addEffect = n2;
          var h2 = function() {
            var t3 = roundCorner;
            function e3(t4, e4) {
              this.v = shape_pool.newElement(), this.v.setPathData(true, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e4.d, this.elem = t4, this.comp = t4.comp, this.frameId = -1, this.initDynamicPropertyContainer(t4), this.p = PropertyFactory.getProp(t4, e4.p, 1, 0, this), this.s = PropertyFactory.getProp(t4, e4.s, 1, 0, this), this.dynamicProperties.length ? this.k = true : (this.k = false, this.convertEllToPath());
            }
            return e3.prototype = { reset: r2, getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
            }, convertEllToPath: function() {
              var e4 = this.p.v[0], r3 = this.p.v[1], i3 = this.s.v[0] / 2, s3 = this.s.v[1] / 2, a3 = 3 !== this.d, n3 = this.v;
              n3.v[0][0] = e4, n3.v[0][1] = r3 - s3, n3.v[1][0] = a3 ? e4 + i3 : e4 - i3, n3.v[1][1] = r3, n3.v[2][0] = e4, n3.v[2][1] = r3 + s3, n3.v[3][0] = a3 ? e4 - i3 : e4 + i3, n3.v[3][1] = r3, n3.i[0][0] = a3 ? e4 - i3 * t3 : e4 + i3 * t3, n3.i[0][1] = r3 - s3, n3.i[1][0] = a3 ? e4 + i3 : e4 - i3, n3.i[1][1] = r3 - s3 * t3, n3.i[2][0] = a3 ? e4 + i3 * t3 : e4 - i3 * t3, n3.i[2][1] = r3 + s3, n3.i[3][0] = a3 ? e4 - i3 : e4 + i3, n3.i[3][1] = r3 + s3 * t3, n3.o[0][0] = a3 ? e4 + i3 * t3 : e4 - i3 * t3, n3.o[0][1] = r3 - s3, n3.o[1][0] = a3 ? e4 + i3 : e4 - i3, n3.o[1][1] = r3 + s3 * t3, n3.o[2][0] = a3 ? e4 - i3 * t3 : e4 + i3 * t3, n3.o[2][1] = r3 + s3, n3.o[3][0] = a3 ? e4 - i3 : e4 + i3, n3.o[3][1] = r3 - s3 * t3;
            } }, extendPrototype([DynamicPropertyContainer], e3), e3;
          }(), l2 = function() {
            function t3(t4, e3) {
              this.v = shape_pool.newElement(), this.v.setPathData(true, 0), this.elem = t4, this.comp = t4.comp, this.data = e3, this.frameId = -1, this.d = e3.d, this.initDynamicPropertyContainer(t4), 1 === e3.sy ? (this.ir = PropertyFactory.getProp(t4, e3.ir, 0, 0, this), this.is = PropertyFactory.getProp(t4, e3.is, 0, 0.01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t4, e3.pt, 0, 0, this), this.p = PropertyFactory.getProp(t4, e3.p, 1, 0, this), this.r = PropertyFactory.getProp(t4, e3.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t4, e3.or, 0, 0, this), this.os = PropertyFactory.getProp(t4, e3.os, 0, 0.01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = true : (this.k = false, this.convertToPath());
            }
            return t3.prototype = { reset: r2, getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
            }, convertStarToPath: function() {
              var t4, e3, r3, i3, s3 = 2 * Math.floor(this.pt.v), a3 = 2 * Math.PI / s3, n3 = true, o3 = this.or.v, h3 = this.ir.v, l3 = this.os.v, p3 = this.is.v, f3 = 2 * Math.PI * o3 / (2 * s3), m2 = 2 * Math.PI * h3 / (2 * s3), c2 = -Math.PI / 2;
              c2 += this.r.v;
              var d2 = 3 === this.data.d ? -1 : 1;
              for (this.v._length = 0, t4 = 0; t4 < s3; t4 += 1) {
                r3 = n3 ? l3 : p3, i3 = n3 ? f3 : m2;
                var u2 = (e3 = n3 ? o3 : h3) * Math.cos(c2), y2 = e3 * Math.sin(c2), g2 = 0 === u2 && 0 === y2 ? 0 : y2 / Math.sqrt(u2 * u2 + y2 * y2), v2 = 0 === u2 && 0 === y2 ? 0 : -u2 / Math.sqrt(u2 * u2 + y2 * y2);
                u2 += +this.p.v[0], y2 += +this.p.v[1], this.v.setTripleAt(u2, y2, u2 - g2 * i3 * r3 * d2, y2 - v2 * i3 * r3 * d2, u2 + g2 * i3 * r3 * d2, y2 + v2 * i3 * r3 * d2, t4, true), n3 = !n3, c2 += a3 * d2;
              }
            }, convertPolygonToPath: function() {
              var t4, e3 = Math.floor(this.pt.v), r3 = 2 * Math.PI / e3, i3 = this.or.v, s3 = this.os.v, a3 = 2 * Math.PI * i3 / (4 * e3), n3 = -Math.PI / 2, o3 = 3 === this.data.d ? -1 : 1;
              for (n3 += this.r.v, this.v._length = 0, t4 = 0; t4 < e3; t4 += 1) {
                var h3 = i3 * Math.cos(n3), l3 = i3 * Math.sin(n3), p3 = 0 === h3 && 0 === l3 ? 0 : l3 / Math.sqrt(h3 * h3 + l3 * l3), f3 = 0 === h3 && 0 === l3 ? 0 : -h3 / Math.sqrt(h3 * h3 + l3 * l3);
                h3 += +this.p.v[0], l3 += +this.p.v[1], this.v.setTripleAt(h3, l3, h3 - p3 * a3 * s3 * o3, l3 - f3 * a3 * s3 * o3, h3 + p3 * a3 * s3 * o3, l3 + f3 * a3 * s3 * o3, t4, true), n3 += r3 * o3;
              }
              this.paths.length = 0, this.paths[0] = this.v;
            } }, extendPrototype([DynamicPropertyContainer], t3), t3;
          }(), p2 = function() {
            function t3(t4, e3) {
              this.v = shape_pool.newElement(), this.v.c = true, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t4, this.comp = t4.comp, this.frameId = -1, this.d = e3.d, this.initDynamicPropertyContainer(t4), this.p = PropertyFactory.getProp(t4, e3.p, 1, 0, this), this.s = PropertyFactory.getProp(t4, e3.s, 1, 0, this), this.r = PropertyFactory.getProp(t4, e3.r, 0, 0, this), this.dynamicProperties.length ? this.k = true : (this.k = false, this.convertRectToPath());
            }
            return t3.prototype = { convertRectToPath: function() {
              var t4 = this.p.v[0], e3 = this.p.v[1], r3 = this.s.v[0] / 2, i3 = this.s.v[1] / 2, s3 = bm_min(r3, i3, this.r.v), a3 = s3 * (1 - roundCorner);
              this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t4 + r3, e3 - i3 + s3, t4 + r3, e3 - i3 + s3, t4 + r3, e3 - i3 + a3, 0, true), this.v.setTripleAt(t4 + r3, e3 + i3 - s3, t4 + r3, e3 + i3 - a3, t4 + r3, e3 + i3 - s3, 1, true), 0 !== s3 ? (this.v.setTripleAt(t4 + r3 - s3, e3 + i3, t4 + r3 - s3, e3 + i3, t4 + r3 - a3, e3 + i3, 2, true), this.v.setTripleAt(t4 - r3 + s3, e3 + i3, t4 - r3 + a3, e3 + i3, t4 - r3 + s3, e3 + i3, 3, true), this.v.setTripleAt(t4 - r3, e3 + i3 - s3, t4 - r3, e3 + i3 - s3, t4 - r3, e3 + i3 - a3, 4, true), this.v.setTripleAt(t4 - r3, e3 - i3 + s3, t4 - r3, e3 - i3 + a3, t4 - r3, e3 - i3 + s3, 5, true), this.v.setTripleAt(t4 - r3 + s3, e3 - i3, t4 - r3 + s3, e3 - i3, t4 - r3 + a3, e3 - i3, 6, true), this.v.setTripleAt(t4 + r3 - s3, e3 - i3, t4 + r3 - a3, e3 - i3, t4 + r3 - s3, e3 - i3, 7, true)) : (this.v.setTripleAt(t4 - r3, e3 + i3, t4 - r3 + a3, e3 + i3, t4 - r3, e3 + i3, 2), this.v.setTripleAt(t4 - r3, e3 - i3, t4 - r3, e3 - i3 + a3, t4 - r3, e3 - i3, 3))) : (this.v.setTripleAt(t4 + r3, e3 - i3 + s3, t4 + r3, e3 - i3 + a3, t4 + r3, e3 - i3 + s3, 0, true), 0 !== s3 ? (this.v.setTripleAt(t4 + r3 - s3, e3 - i3, t4 + r3 - s3, e3 - i3, t4 + r3 - a3, e3 - i3, 1, true), this.v.setTripleAt(t4 - r3 + s3, e3 - i3, t4 - r3 + a3, e3 - i3, t4 - r3 + s3, e3 - i3, 2, true), this.v.setTripleAt(t4 - r3, e3 - i3 + s3, t4 - r3, e3 - i3 + s3, t4 - r3, e3 - i3 + a3, 3, true), this.v.setTripleAt(t4 - r3, e3 + i3 - s3, t4 - r3, e3 + i3 - a3, t4 - r3, e3 + i3 - s3, 4, true), this.v.setTripleAt(t4 - r3 + s3, e3 + i3, t4 - r3 + s3, e3 + i3, t4 - r3 + a3, e3 + i3, 5, true), this.v.setTripleAt(t4 + r3 - s3, e3 + i3, t4 + r3 - a3, e3 + i3, t4 + r3 - s3, e3 + i3, 6, true), this.v.setTripleAt(t4 + r3, e3 + i3 - s3, t4 + r3, e3 + i3 - s3, t4 + r3, e3 + i3 - a3, 7, true)) : (this.v.setTripleAt(t4 - r3, e3 - i3, t4 - r3 + a3, e3 - i3, t4 - r3, e3 - i3, 1, true), this.v.setTripleAt(t4 - r3, e3 + i3, t4 - r3, e3 + i3 - a3, t4 - r3, e3 + i3, 2, true), this.v.setTripleAt(t4 + r3, e3 + i3, t4 + r3 - a3, e3 + i3, t4 + r3, e3 + i3, 3, true)));
            }, getValue: function(t4) {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
            }, reset: r2 }, extendPrototype([DynamicPropertyContainer], t3), t3;
          }();
          var f2 = { getShapeProp: function(t3, e3, r3) {
            var i3;
            return 3 === r3 || 4 === r3 ? i3 = (3 === r3 ? e3.pt : e3.ks).k.length ? new o2(t3, e3, r3) : new a2(t3, e3, r3) : 5 === r3 ? i3 = new p2(t3, e3) : 6 === r3 ? i3 = new h2(t3, e3) : 7 === r3 && (i3 = new l2(t3, e3)), i3.k && t3.addDynamicProperty(i3), i3;
          }, getConstructorFunction: function() {
            return a2;
          }, getKeyframedConstructorFunction: function() {
            return o2;
          } };
          return f2;
        }(), ShapeModifiers = function() {
          var t2 = {}, e2 = {};
          return t2.registerModifier = function(t3, r2) {
            e2[t3] || (e2[t3] = r2);
          }, t2.getModifier = function(t3, r2, i2) {
            return new e2[t3](r2, i2);
          }, t2;
        }();
        function ShapeModifier() {
        }
        function TrimModifier() {
        }
        function RoundCornersModifier() {
        }
        function RepeaterModifier() {
        }
        function ShapeCollection() {
          this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength);
        }
        function DashProperty(t2, e2, r2, i2) {
          this.elem = t2, this.frameId = -1, this.dataProps = createSizedArray(e2.length), this.renderer = r2, this.k = false, this.dashStr = "", this.dashArray = createTypedArray("float32", e2.length ? e2.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i2);
          var s2, a2, n2 = e2.length || 0;
          for (s2 = 0; s2 < n2; s2 += 1)
            a2 = PropertyFactory.getProp(t2, e2[s2].v, 0, 0, this), this.k = a2.k || this.k, this.dataProps[s2] = { n: e2[s2].n, p: a2 };
          this.k || this.getValue(true), this._isAnimated = this.k;
        }
        function GradientProperty(t2, e2, r2) {
          this.data = e2, this.c = createTypedArray("uint8c", 4 * e2.p);
          var i2 = e2.k.k[0].s ? e2.k.k[0].s.length - 4 * e2.p : e2.k.k.length - 4 * e2.p;
          this.o = createTypedArray("float32", i2), this._cmdf = false, this._omdf = false, this._collapsable = this.checkCollapsable(), this._hasOpacity = i2, this.initDynamicPropertyContainer(r2), this.prop = PropertyFactory.getProp(t2, e2.k, 1, null, this), this.k = this.prop.k, this.getValue(true);
        }
        ShapeModifier.prototype.initModifierProperties = function() {
        }, ShapeModifier.prototype.addShapeToModifier = function() {
        }, ShapeModifier.prototype.addShape = function(t2) {
          if (!this.closed) {
            t2.sh.container.addDynamicProperty(t2.sh);
            var e2 = { shape: t2.sh, data: t2, localShapeCollection: shapeCollection_pool.newShapeCollection() };
            this.shapes.push(e2), this.addShapeToModifier(e2), this._isAnimated && t2.setAsAnimated();
          }
        }, ShapeModifier.prototype.init = function(t2, e2) {
          this.shapes = [], this.elem = t2, this.initDynamicPropertyContainer(t2), this.initModifierProperties(t2, e2), this.frameId = initialDefaultFrame, this.closed = false, this.k = false, this.dynamicProperties.length ? this.k = true : this.getValue(true);
        }, ShapeModifier.prototype.processKeys = function() {
          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
        }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function(t2, e2) {
          this.s = PropertyFactory.getProp(t2, e2.s, 0, 0.01, this), this.e = PropertyFactory.getProp(t2, e2.e, 0, 0.01, this), this.o = PropertyFactory.getProp(t2, e2.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e2.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
        }, TrimModifier.prototype.addShapeToModifier = function(t2) {
          t2.pathsData = [];
        }, TrimModifier.prototype.calculateShapeEdges = function(t2, e2, r2, i2, s2) {
          var a2 = [];
          e2 <= 1 ? a2.push({ s: t2, e: e2 }) : t2 >= 1 ? a2.push({ s: t2 - 1, e: e2 - 1 }) : (a2.push({ s: t2, e: 1 }), a2.push({ s: 0, e: e2 - 1 }));
          var n2, o2, h2 = [], l2 = a2.length;
          for (n2 = 0; n2 < l2; n2 += 1) {
            var p2, f2;
            if ((o2 = a2[n2]).e * s2 < i2 || o2.s * s2 > i2 + r2)
              ;
            else
              p2 = o2.s * s2 <= i2 ? 0 : (o2.s * s2 - i2) / r2, f2 = o2.e * s2 >= i2 + r2 ? 1 : (o2.e * s2 - i2) / r2, h2.push([p2, f2]);
          }
          return h2.length || h2.push([0, 0]), h2;
        }, TrimModifier.prototype.releasePathsData = function(t2) {
          var e2, r2 = t2.length;
          for (e2 = 0; e2 < r2; e2 += 1)
            segments_length_pool.release(t2[e2]);
          return t2.length = 0, t2;
        }, TrimModifier.prototype.processShapes = function(t2) {
          var e2, r2, i2;
          if (this._mdf || t2) {
            var s2 = this.o.v % 360 / 360;
            if (s2 < 0 && (s2 += 1), (e2 = (this.s.v > 1 ? 1 : this.s.v < 0 ? 0 : this.s.v) + s2) > (r2 = (this.e.v > 1 ? 1 : this.e.v < 0 ? 0 : this.e.v) + s2)) {
              var a2 = e2;
              e2 = r2, r2 = a2;
            }
            e2 = 1e-4 * Math.round(1e4 * e2), r2 = 1e-4 * Math.round(1e4 * r2), this.sValue = e2, this.eValue = r2;
          } else
            e2 = this.sValue, r2 = this.eValue;
          var n2, o2, h2, l2, p2, f2, m2 = this.shapes.length, c2 = 0;
          if (r2 === e2)
            for (n2 = 0; n2 < m2; n2 += 1)
              this.shapes[n2].localShapeCollection.releaseShapes(), this.shapes[n2].shape._mdf = true, this.shapes[n2].shape.paths = this.shapes[n2].localShapeCollection;
          else if (1 === r2 && 0 === e2 || 0 === r2 && 1 === e2) {
            if (this._mdf)
              for (n2 = 0; n2 < m2; n2 += 1)
                this.shapes[n2].pathsData.length = 0, this.shapes[n2].shape._mdf = true;
          } else {
            var d2, u2, y2 = [];
            for (n2 = 0; n2 < m2; n2 += 1)
              if ((d2 = this.shapes[n2]).shape._mdf || this._mdf || t2 || 2 === this.m) {
                if (h2 = (i2 = d2.shape.paths)._length, f2 = 0, !d2.shape._mdf && d2.pathsData.length)
                  f2 = d2.totalShapeLength;
                else {
                  for (l2 = this.releasePathsData(d2.pathsData), o2 = 0; o2 < h2; o2 += 1)
                    p2 = bez.getSegmentsLength(i2.shapes[o2]), l2.push(p2), f2 += p2.totalLength;
                  d2.totalShapeLength = f2, d2.pathsData = l2;
                }
                c2 += f2, d2.shape._mdf = true;
              } else
                d2.shape.paths = d2.localShapeCollection;
            var g2, v2 = e2, b2 = r2, P2 = 0;
            for (n2 = m2 - 1; n2 >= 0; n2 -= 1)
              if ((d2 = this.shapes[n2]).shape._mdf) {
                for ((u2 = d2.localShapeCollection).releaseShapes(), 2 === this.m && m2 > 1 ? (g2 = this.calculateShapeEdges(e2, r2, d2.totalShapeLength, P2, c2), P2 += d2.totalShapeLength) : g2 = [[v2, b2]], h2 = g2.length, o2 = 0; o2 < h2; o2 += 1) {
                  v2 = g2[o2][0], b2 = g2[o2][1], y2.length = 0, b2 <= 1 ? y2.push({ s: d2.totalShapeLength * v2, e: d2.totalShapeLength * b2 }) : v2 >= 1 ? y2.push({ s: d2.totalShapeLength * (v2 - 1), e: d2.totalShapeLength * (b2 - 1) }) : (y2.push({ s: d2.totalShapeLength * v2, e: d2.totalShapeLength }), y2.push({ s: 0, e: d2.totalShapeLength * (b2 - 1) }));
                  var _2 = this.addShapes(d2, y2[0]);
                  if (y2[0].s !== y2[0].e) {
                    if (y2.length > 1)
                      if (d2.shape.paths.shapes[d2.shape.paths._length - 1].c) {
                        var x = _2.pop();
                        this.addPaths(_2, u2), _2 = this.addShapes(d2, y2[1], x);
                      } else
                        this.addPaths(_2, u2), _2 = this.addShapes(d2, y2[1]);
                    this.addPaths(_2, u2);
                  }
                }
                d2.shape.paths = u2;
              }
          }
        }, TrimModifier.prototype.addPaths = function(t2, e2) {
          var r2, i2 = t2.length;
          for (r2 = 0; r2 < i2; r2 += 1)
            e2.addShape(t2[r2]);
        }, TrimModifier.prototype.addSegment = function(t2, e2, r2, i2, s2, a2, n2) {
          s2.setXYAt(e2[0], e2[1], "o", a2), s2.setXYAt(r2[0], r2[1], "i", a2 + 1), n2 && s2.setXYAt(t2[0], t2[1], "v", a2), s2.setXYAt(i2[0], i2[1], "v", a2 + 1);
        }, TrimModifier.prototype.addSegmentFromArray = function(t2, e2, r2, i2) {
          e2.setXYAt(t2[1], t2[5], "o", r2), e2.setXYAt(t2[2], t2[6], "i", r2 + 1), i2 && e2.setXYAt(t2[0], t2[4], "v", r2), e2.setXYAt(t2[3], t2[7], "v", r2 + 1);
        }, TrimModifier.prototype.addShapes = function(t2, e2, r2) {
          var i2, s2, a2, n2, o2, h2, l2, p2, f2 = t2.pathsData, m2 = t2.shape.paths.shapes, c2 = t2.shape.paths._length, d2 = 0, u2 = [], y2 = true;
          for (r2 ? (o2 = r2._length, p2 = r2._length) : (r2 = shape_pool.newElement(), o2 = 0, p2 = 0), u2.push(r2), i2 = 0; i2 < c2; i2 += 1) {
            for (h2 = f2[i2].lengths, r2.c = m2[i2].c, a2 = m2[i2].c ? h2.length : h2.length + 1, s2 = 1; s2 < a2; s2 += 1)
              if (d2 + (n2 = h2[s2 - 1]).addedLength < e2.s)
                d2 += n2.addedLength, r2.c = false;
              else {
                if (d2 > e2.e) {
                  r2.c = false;
                  break;
                }
                e2.s <= d2 && e2.e >= d2 + n2.addedLength ? (this.addSegment(m2[i2].v[s2 - 1], m2[i2].o[s2 - 1], m2[i2].i[s2], m2[i2].v[s2], r2, o2, y2), y2 = false) : (l2 = bez.getNewSegment(m2[i2].v[s2 - 1], m2[i2].v[s2], m2[i2].o[s2 - 1], m2[i2].i[s2], (e2.s - d2) / n2.addedLength, (e2.e - d2) / n2.addedLength, h2[s2 - 1]), this.addSegmentFromArray(l2, r2, o2, y2), y2 = false, r2.c = false), d2 += n2.addedLength, o2 += 1;
              }
            if (m2[i2].c && h2.length) {
              if (n2 = h2[s2 - 1], d2 <= e2.e) {
                var g2 = h2[s2 - 1].addedLength;
                e2.s <= d2 && e2.e >= d2 + g2 ? (this.addSegment(m2[i2].v[s2 - 1], m2[i2].o[s2 - 1], m2[i2].i[0], m2[i2].v[0], r2, o2, y2), y2 = false) : (l2 = bez.getNewSegment(m2[i2].v[s2 - 1], m2[i2].v[0], m2[i2].o[s2 - 1], m2[i2].i[0], (e2.s - d2) / g2, (e2.e - d2) / g2, h2[s2 - 1]), this.addSegmentFromArray(l2, r2, o2, y2), y2 = false, r2.c = false);
              } else
                r2.c = false;
              d2 += n2.addedLength, o2 += 1;
            }
            if (r2._length && (r2.setXYAt(r2.v[p2][0], r2.v[p2][1], "i", p2), r2.setXYAt(r2.v[r2._length - 1][0], r2.v[r2._length - 1][1], "o", r2._length - 1)), d2 > e2.e)
              break;
            i2 < c2 - 1 && (r2 = shape_pool.newElement(), y2 = true, u2.push(r2), o2 = 0);
          }
          return u2;
        }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function(t2, e2) {
          this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t2, e2.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
        }, RoundCornersModifier.prototype.processPath = function(t2, e2) {
          var r2 = shape_pool.newElement();
          r2.c = t2.c;
          var i2, s2, a2, n2, o2, h2, l2, p2, f2, m2, c2, d2, u2, y2 = t2._length, g2 = 0;
          for (i2 = 0; i2 < y2; i2 += 1)
            s2 = t2.v[i2], n2 = t2.o[i2], a2 = t2.i[i2], s2[0] === n2[0] && s2[1] === n2[1] && s2[0] === a2[0] && s2[1] === a2[1] ? 0 !== i2 && i2 !== y2 - 1 || t2.c ? (o2 = 0 === i2 ? t2.v[y2 - 1] : t2.v[i2 - 1], l2 = (h2 = Math.sqrt(Math.pow(s2[0] - o2[0], 2) + Math.pow(s2[1] - o2[1], 2))) ? Math.min(h2 / 2, e2) / h2 : 0, p2 = d2 = s2[0] + (o2[0] - s2[0]) * l2, f2 = u2 = s2[1] - (s2[1] - o2[1]) * l2, m2 = p2 - (p2 - s2[0]) * roundCorner, c2 = f2 - (f2 - s2[1]) * roundCorner, r2.setTripleAt(p2, f2, m2, c2, d2, u2, g2), g2 += 1, o2 = i2 === y2 - 1 ? t2.v[0] : t2.v[i2 + 1], l2 = (h2 = Math.sqrt(Math.pow(s2[0] - o2[0], 2) + Math.pow(s2[1] - o2[1], 2))) ? Math.min(h2 / 2, e2) / h2 : 0, p2 = m2 = s2[0] + (o2[0] - s2[0]) * l2, f2 = c2 = s2[1] + (o2[1] - s2[1]) * l2, d2 = p2 - (p2 - s2[0]) * roundCorner, u2 = f2 - (f2 - s2[1]) * roundCorner, r2.setTripleAt(p2, f2, m2, c2, d2, u2, g2), g2 += 1) : (r2.setTripleAt(s2[0], s2[1], n2[0], n2[1], a2[0], a2[1], g2), g2 += 1) : (r2.setTripleAt(t2.v[i2][0], t2.v[i2][1], t2.o[i2][0], t2.o[i2][1], t2.i[i2][0], t2.i[i2][1], g2), g2 += 1);
          return r2;
        }, RoundCornersModifier.prototype.processShapes = function(t2) {
          var e2, r2, i2, s2, a2, n2, o2 = this.shapes.length, h2 = this.rd.v;
          if (0 !== h2)
            for (r2 = 0; r2 < o2; r2 += 1) {
              if ((a2 = this.shapes[r2]).shape.paths, n2 = a2.localShapeCollection, a2.shape._mdf || this._mdf || t2)
                for (n2.releaseShapes(), a2.shape._mdf = true, e2 = a2.shape.paths.shapes, s2 = a2.shape.paths._length, i2 = 0; i2 < s2; i2 += 1)
                  n2.addShape(this.processPath(e2[i2], h2));
              a2.shape.paths = a2.localShapeCollection;
            }
          this.dynamicProperties.length || (this._mdf = false);
        }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function(t2, e2) {
          this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t2, e2.c, 0, null, this), this.o = PropertyFactory.getProp(t2, e2.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t2, e2.tr, this), this.so = PropertyFactory.getProp(t2, e2.tr.so, 0, 0.01, this), this.eo = PropertyFactory.getProp(t2, e2.tr.eo, 0, 0.01, this), this.data = e2, this.dynamicProperties.length || this.getValue(true), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix(), this.rMatrix = new Matrix(), this.sMatrix = new Matrix(), this.tMatrix = new Matrix(), this.matrix = new Matrix();
        }, RepeaterModifier.prototype.applyTransforms = function(t2, e2, r2, i2, s2, a2) {
          var n2 = a2 ? -1 : 1, o2 = i2.s.v[0] + (1 - i2.s.v[0]) * (1 - s2), h2 = i2.s.v[1] + (1 - i2.s.v[1]) * (1 - s2);
          t2.translate(i2.p.v[0] * n2 * s2, i2.p.v[1] * n2 * s2, i2.p.v[2]), e2.translate(-i2.a.v[0], -i2.a.v[1], i2.a.v[2]), e2.rotate(-i2.r.v * n2 * s2), e2.translate(i2.a.v[0], i2.a.v[1], i2.a.v[2]), r2.translate(-i2.a.v[0], -i2.a.v[1], i2.a.v[2]), r2.scale(a2 ? 1 / o2 : o2, a2 ? 1 / h2 : h2), r2.translate(i2.a.v[0], i2.a.v[1], i2.a.v[2]);
        }, RepeaterModifier.prototype.init = function(t2, e2, r2, i2) {
          this.elem = t2, this.arr = e2, this.pos = r2, this.elemsData = i2, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t2), this.initModifierProperties(t2, e2[r2]);
          for (; r2 > 0; )
            r2 -= 1, this._elements.unshift(e2[r2]);
          this.dynamicProperties.length ? this.k = true : this.getValue(true);
        }, RepeaterModifier.prototype.resetElements = function(t2) {
          var e2, r2 = t2.length;
          for (e2 = 0; e2 < r2; e2 += 1)
            t2[e2]._processed = false, "gr" === t2[e2].ty && this.resetElements(t2[e2].it);
        }, RepeaterModifier.prototype.cloneElements = function(t2) {
          t2.length;
          var e2 = JSON.parse(JSON.stringify(t2));
          return this.resetElements(e2), e2;
        }, RepeaterModifier.prototype.changeGroupRender = function(t2, e2) {
          var r2, i2 = t2.length;
          for (r2 = 0; r2 < i2; r2 += 1)
            t2[r2]._render = e2, "gr" === t2[r2].ty && this.changeGroupRender(t2[r2].it, e2);
        }, RepeaterModifier.prototype.processShapes = function(t2) {
          var e2, r2, i2, s2, a2;
          if (this._mdf || t2) {
            var n2, o2 = Math.ceil(this.c.v);
            if (this._groups.length < o2) {
              for (; this._groups.length < o2; ) {
                var h2 = { it: this.cloneElements(this._elements), ty: "gr" };
                h2.it.push({ a: { a: 0, ix: 1, k: [0, 0] }, nm: "Transform", o: { a: 0, ix: 7, k: 100 }, p: { a: 0, ix: 2, k: [0, 0] }, r: { a: 1, ix: 6, k: [{ s: 0, e: 0, t: 0 }, { s: 0, e: 0, t: 1 }] }, s: { a: 0, ix: 3, k: [100, 100] }, sa: { a: 0, ix: 5, k: 0 }, sk: { a: 0, ix: 4, k: 0 }, ty: "tr" }), this.arr.splice(0, 0, h2), this._groups.splice(0, 0, h2), this._currentCopies += 1;
              }
              this.elem.reloadShapes();
            }
            for (a2 = 0, i2 = 0; i2 <= this._groups.length - 1; i2 += 1)
              n2 = a2 < o2, this._groups[i2]._render = n2, this.changeGroupRender(this._groups[i2].it, n2), a2 += 1;
            this._currentCopies = o2;
            var l2 = this.o.v, p2 = l2 % 1, f2 = l2 > 0 ? Math.floor(l2) : Math.ceil(l2), m2 = (this.tr.v.props, this.pMatrix.props), c2 = this.rMatrix.props, d2 = this.sMatrix.props;
            this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
            var u2, y2, g2 = 0;
            if (l2 > 0) {
              for (; g2 < f2; )
                this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false), g2 += 1;
              p2 && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p2, false), g2 += p2);
            } else if (l2 < 0) {
              for (; g2 > f2; )
                this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, true), g2 -= 1;
              p2 && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p2, true), g2 -= p2);
            }
            for (i2 = 1 === this.data.m ? 0 : this._currentCopies - 1, s2 = 1 === this.data.m ? 1 : -1, a2 = this._currentCopies; a2; ) {
              if (y2 = (r2 = (e2 = this.elemsData[i2].it)[e2.length - 1].transform.mProps.v.props).length, e2[e2.length - 1].transform.mProps._mdf = true, e2[e2.length - 1].transform.op._mdf = true, e2[e2.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i2 / (this._currentCopies - 1)), 0 !== g2) {
                for ((0 !== i2 && 1 === s2 || i2 !== this._currentCopies - 1 && -1 === s2) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false), this.matrix.transform(c2[0], c2[1], c2[2], c2[3], c2[4], c2[5], c2[6], c2[7], c2[8], c2[9], c2[10], c2[11], c2[12], c2[13], c2[14], c2[15]), this.matrix.transform(d2[0], d2[1], d2[2], d2[3], d2[4], d2[5], d2[6], d2[7], d2[8], d2[9], d2[10], d2[11], d2[12], d2[13], d2[14], d2[15]), this.matrix.transform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5], m2[6], m2[7], m2[8], m2[9], m2[10], m2[11], m2[12], m2[13], m2[14], m2[15]), u2 = 0; u2 < y2; u2 += 1)
                  r2[u2] = this.matrix.props[u2];
                this.matrix.reset();
              } else
                for (this.matrix.reset(), u2 = 0; u2 < y2; u2 += 1)
                  r2[u2] = this.matrix.props[u2];
              g2 += 1, a2 -= 1, i2 += s2;
            }
          } else
            for (a2 = this._currentCopies, i2 = 0, s2 = 1; a2; )
              r2 = (e2 = this.elemsData[i2].it)[e2.length - 1].transform.mProps.v.props, e2[e2.length - 1].transform.mProps._mdf = false, e2[e2.length - 1].transform.op._mdf = false, a2 -= 1, i2 += s2;
        }, RepeaterModifier.prototype.addShape = function() {
        }, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function(t2) {
          this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t2, this._length += 1;
        }, ShapeCollection.prototype.releaseShapes = function() {
          var t2;
          for (t2 = 0; t2 < this._length; t2 += 1)
            shape_pool.release(this.shapes[t2]);
          this._length = 0;
        }, DashProperty.prototype.getValue = function(t2) {
          if ((this.elem.globalData.frameId !== this.frameId || t2) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t2, this._mdf)) {
            var e2 = 0, r2 = this.dataProps.length;
            for ("svg" === this.renderer && (this.dashStr = ""), e2 = 0; e2 < r2; e2 += 1)
              "o" != this.dataProps[e2].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e2].p.v : this.dashArray[e2] = this.dataProps[e2].p.v : this.dashoffset[0] = this.dataProps[e2].p.v;
          }
        }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function(t2, e2) {
          for (var r2 = 0, i2 = this.o.length / 2; r2 < i2; ) {
            if (Math.abs(t2[4 * r2] - t2[4 * e2 + 2 * r2]) > 0.01)
              return false;
            r2 += 1;
          }
          return true;
        }, GradientProperty.prototype.checkCollapsable = function() {
          if (this.o.length / 2 != this.c.length / 4)
            return false;
          if (this.data.k.k[0].s)
            for (var t2 = 0, e2 = this.data.k.k.length; t2 < e2; ) {
              if (!this.comparePoints(this.data.k.k[t2].s, this.data.p))
                return false;
              t2 += 1;
            }
          else if (!this.comparePoints(this.data.k.k, this.data.p))
            return false;
          return true;
        }, GradientProperty.prototype.getValue = function(t2) {
          if (this.prop.getValue(), this._mdf = false, this._cmdf = false, this._omdf = false, this.prop._mdf || t2) {
            var e2, r2, i2, s2 = 4 * this.data.p;
            for (e2 = 0; e2 < s2; e2 += 1)
              r2 = e2 % 4 == 0 ? 100 : 255, i2 = Math.round(this.prop.v[e2] * r2), this.c[e2] !== i2 && (this.c[e2] = i2, this._cmdf = !t2);
            if (this.o.length)
              for (s2 = this.prop.v.length, e2 = 4 * this.data.p; e2 < s2; e2 += 1)
                r2 = e2 % 2 == 0 ? 100 : 1, i2 = e2 % 2 == 0 ? Math.round(100 * this.prop.v[e2]) : this.prop.v[e2], this.o[e2 - 4 * this.data.p] !== i2 && (this.o[e2 - 4 * this.data.p] = i2, this._omdf = !t2);
            this._mdf = !t2;
          }
        }, extendPrototype([DynamicPropertyContainer], GradientProperty);
        var buildShapeString = function(t2, e2, r2, i2) {
          if (0 === e2)
            return "";
          var s2, a2 = t2.o, n2 = t2.i, o2 = t2.v, h2 = " M" + i2.applyToPointStringified(o2[0][0], o2[0][1]);
          for (s2 = 1; s2 < e2; s2 += 1)
            h2 += " C" + i2.applyToPointStringified(a2[s2 - 1][0], a2[s2 - 1][1]) + " " + i2.applyToPointStringified(n2[s2][0], n2[s2][1]) + " " + i2.applyToPointStringified(o2[s2][0], o2[s2][1]);
          return r2 && e2 && (h2 += " C" + i2.applyToPointStringified(a2[s2 - 1][0], a2[s2 - 1][1]) + " " + i2.applyToPointStringified(n2[0][0], n2[0][1]) + " " + i2.applyToPointStringified(o2[0][0], o2[0][1]), h2 += "z"), h2;
        }, ImagePreloader = function() {
          var t2 = function() {
            var t3 = createTag("canvas");
            t3.width = 1, t3.height = 1;
            var e3 = t3.getContext("2d");
            return e3.fillStyle = "rgba(0,0,0,0)", e3.fillRect(0, 0, 1, 1), t3;
          }();
          function e2() {
            this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
          }
          function r2(e3) {
            var r3 = function(t3, e4, r4) {
              var i4 = "";
              if (t3.e)
                i4 = t3.p;
              else if (e4) {
                var s4 = t3.p;
                -1 !== s4.indexOf("images/") && (s4 = s4.split("/")[1]), i4 = e4 + s4;
              } else
                i4 = r4, i4 += t3.u ? t3.u : "", i4 += t3.p;
              return i4;
            }(e3, this.assetsPath, this.path), i3 = createTag("img");
            i3.crossOrigin = "anonymous", i3.addEventListener("load", this._imageLoaded.bind(this), false), i3.addEventListener("error", (function() {
              s3.img = t2, this._imageLoaded();
            }).bind(this), false), i3.src = r3;
            var s3 = { img: i3, assetData: e3 };
            return s3;
          }
          function i2(t3, e3) {
            this.imagesLoadedCb = e3;
            var r3, i3 = t3.length;
            for (r3 = 0; r3 < i3; r3 += 1)
              t3[r3].layers || (this.totalImages += 1, this.images.push(this._createImageData(t3[r3])));
          }
          function s2(t3) {
            this.path = t3 || "";
          }
          function a2(t3) {
            this.assetsPath = t3 || "";
          }
          function n2(t3) {
            for (var e3 = 0, r3 = this.images.length; e3 < r3; ) {
              if (this.images[e3].assetData === t3)
                return this.images[e3].img;
              e3 += 1;
            }
          }
          function o2() {
            this.imagesLoadedCb = null, this.images.length = 0;
          }
          function h2() {
            return this.totalImages === this.loadedAssets;
          }
          return function() {
            this.loadAssets = i2, this.setAssetsPath = a2, this.setPath = s2, this.loaded = h2, this.destroy = o2, this.getImage = n2, this._createImageData = r2, this._imageLoaded = e2, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = [];
          };
        }(), featureSupport = function() {
          var t2 = { maskType: true };
          return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t2.maskType = false), t2;
        }(), filtersFactory = function() {
          var t2 = {};
          return t2.createFilter = function(t3) {
            var e2 = createNS("filter");
            return e2.setAttribute("id", t3), e2.setAttribute("filterUnits", "objectBoundingBox"), e2.setAttribute("x", "0%"), e2.setAttribute("y", "0%"), e2.setAttribute("width", "100%"), e2.setAttribute("height", "100%"), e2;
          }, t2.createAlphaToLuminanceFilter = function() {
            var t3 = createNS("feColorMatrix");
            return t3.setAttribute("type", "matrix"), t3.setAttribute("color-interpolation-filters", "sRGB"), t3.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t3;
          }, t2;
        }(), assetLoader = /* @__PURE__ */ function() {
          function t2(t3) {
            return t3.response && "object" === _typeof(t3.response) ? t3.response : t3.response && "string" == typeof t3.response ? JSON.parse(t3.response) : t3.responseText ? JSON.parse(t3.responseText) : void 0;
          }
          return { load: function(e2, r2, i2) {
            var s2, a2 = new XMLHttpRequest();
            a2.open("GET", e2, true);
            try {
              a2.responseType = "json";
            } catch (t3) {
            }
            a2.send(), a2.onreadystatechange = function() {
              if (4 == a2.readyState)
                if (200 == a2.status)
                  s2 = t2(a2), r2(s2);
                else
                  try {
                    s2 = t2(a2), r2(s2);
                  } catch (t3) {
                    i2 && i2(t3);
                  }
            };
          } };
        }();
        function TextAnimatorProperty(t2, e2, r2) {
          this._isFirstFrame = true, this._hasMaskedPath = false, this._frameId = -1, this._textData = t2, this._renderType = e2, this._elem = r2, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = { alignment: {} }, this.renderedLetters = [], this.lettersChangedFlag = false, this.initDynamicPropertyContainer(r2);
        }
        function TextAnimatorDataProperty(t2, e2, r2) {
          var i2 = { propType: false }, s2 = PropertyFactory.getProp, a2 = e2.a;
          this.a = { r: a2.r ? s2(t2, a2.r, 0, degToRads, r2) : i2, rx: a2.rx ? s2(t2, a2.rx, 0, degToRads, r2) : i2, ry: a2.ry ? s2(t2, a2.ry, 0, degToRads, r2) : i2, sk: a2.sk ? s2(t2, a2.sk, 0, degToRads, r2) : i2, sa: a2.sa ? s2(t2, a2.sa, 0, degToRads, r2) : i2, s: a2.s ? s2(t2, a2.s, 1, 0.01, r2) : i2, a: a2.a ? s2(t2, a2.a, 1, 0, r2) : i2, o: a2.o ? s2(t2, a2.o, 0, 0.01, r2) : i2, p: a2.p ? s2(t2, a2.p, 1, 0, r2) : i2, sw: a2.sw ? s2(t2, a2.sw, 0, 0, r2) : i2, sc: a2.sc ? s2(t2, a2.sc, 1, 0, r2) : i2, fc: a2.fc ? s2(t2, a2.fc, 1, 0, r2) : i2, fh: a2.fh ? s2(t2, a2.fh, 0, 0, r2) : i2, fs: a2.fs ? s2(t2, a2.fs, 0, 0.01, r2) : i2, fb: a2.fb ? s2(t2, a2.fb, 0, 0.01, r2) : i2, t: a2.t ? s2(t2, a2.t, 0, 0, r2) : i2 }, this.s = TextSelectorProp.getTextSelectorProp(t2, e2.s, r2), this.s.t = e2.s.t;
        }
        function LetterProps(t2, e2, r2, i2, s2, a2) {
          this.o = t2, this.sw = e2, this.sc = r2, this.fc = i2, this.m = s2, this.p = a2, this._mdf = { o: true, sw: !!e2, sc: !!r2, fc: !!i2, m: true, p: true };
        }
        function TextProperty(t2, e2) {
          this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = false, this._isFirstFrame = true, this._mdf = false, this.data = e2, this.elem = t2, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = false, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = { ascent: 0, boxWidth: this.defaultBoxWidth, f: "", fStyle: "", fWeight: "", fc: "", j: "", justifyOffset: "", l: [], lh: 0, lineWidths: [], ls: "", of: "", s: "", sc: "", sw: 0, t: 0, tr: 0, sz: 0, ps: null, fillColorAnim: false, strokeColorAnim: false, strokeWidthAnim: false, yOffset: 0, finalSize: 0, finalText: [], finalLineHeight: 0, __complete: false }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData);
        }
        TextAnimatorProperty.prototype.searchProperties = function() {
          var t2, e2, r2 = this._textData.a.length, i2 = PropertyFactory.getProp;
          for (t2 = 0; t2 < r2; t2 += 1)
            e2 = this._textData.a[t2], this._animatorsData[t2] = new TextAnimatorDataProperty(this._elem, e2, this);
          this._textData.p && "m" in this._textData.p ? (this._pathData = { f: i2(this._elem, this._textData.p.f, 0, 0, this), l: i2(this._elem, this._textData.p.l, 0, 0, this), r: this._textData.p.r, m: this._elem.maskManager.getMaskProperty(this._textData.p.m) }, this._hasMaskedPath = true) : this._hasMaskedPath = false, this._moreOptions.alignment = i2(this._elem, this._textData.m.a, 1, 0, this);
        }, TextAnimatorProperty.prototype.getMeasures = function(t2, e2) {
          if (this.lettersChangedFlag = e2, this._mdf || this._isFirstFrame || e2 || this._hasMaskedPath && this._pathData.m._mdf) {
            this._isFirstFrame = false;
            var r2, i2, s2, a2, n2, o2, h2, l2, p2, f2, m2, c2, d2, u2, y2, g2, v2, b2, P2, _2 = this._moreOptions.alignment.v, x = this._animatorsData, S2 = this._textData, E2 = this.mHelper, T2 = this._renderType, C2 = this.renderedLetters.length, A2 = (this.data, t2.l);
            if (this._hasMaskedPath) {
              if (P2 = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
                var k, D2 = P2.v;
                for (this._pathData.r && (D2 = D2.reverse()), n2 = { tLength: 0, segments: [] }, a2 = D2._length - 1, g2 = 0, s2 = 0; s2 < a2; s2 += 1)
                  k = bez.buildBezierData(D2.v[s2], D2.v[s2 + 1], [D2.o[s2][0] - D2.v[s2][0], D2.o[s2][1] - D2.v[s2][1]], [D2.i[s2 + 1][0] - D2.v[s2 + 1][0], D2.i[s2 + 1][1] - D2.v[s2 + 1][1]]), n2.tLength += k.segmentLength, n2.segments.push(k), g2 += k.segmentLength;
                s2 = a2, P2.v.c && (k = bez.buildBezierData(D2.v[s2], D2.v[0], [D2.o[s2][0] - D2.v[s2][0], D2.o[s2][1] - D2.v[s2][1]], [D2.i[0][0] - D2.v[0][0], D2.i[0][1] - D2.v[0][1]]), n2.tLength += k.segmentLength, n2.segments.push(k), g2 += k.segmentLength), this._pathData.pi = n2;
              }
              if (n2 = this._pathData.pi, o2 = this._pathData.f.v, m2 = 0, f2 = 1, l2 = 0, p2 = true, u2 = n2.segments, o2 < 0 && P2.v.c)
                for (n2.tLength < Math.abs(o2) && (o2 = -Math.abs(o2) % n2.tLength), f2 = (d2 = u2[m2 = u2.length - 1].points).length - 1; o2 < 0; )
                  o2 += d2[f2].partialLength, (f2 -= 1) < 0 && (f2 = (d2 = u2[m2 -= 1].points).length - 1);
              c2 = (d2 = u2[m2].points)[f2 - 1], y2 = (h2 = d2[f2]).partialLength;
            }
            a2 = A2.length, r2 = 0, i2 = 0;
            var M2, I2, w2, F2, R2 = 1.2 * t2.finalSize * 0.714, V2 = true;
            w2 = x.length;
            var L2, O2, z2, B2, N2, G2, j2, q2, H2, W2, Y2, X2, K2, $2 = -1, J2 = o2, U = m2, Z2 = f2, Q2 = -1, tt2 = "", et2 = this.defaultPropsArray;
            if (2 === t2.j || 1 === t2.j) {
              var rt2 = 0, it2 = 0, st2 = 2 === t2.j ? -0.5 : -1, at2 = 0, nt2 = true;
              for (s2 = 0; s2 < a2; s2 += 1)
                if (A2[s2].n) {
                  for (rt2 && (rt2 += it2); at2 < s2; )
                    A2[at2].animatorJustifyOffset = rt2, at2 += 1;
                  rt2 = 0, nt2 = true;
                } else {
                  for (I2 = 0; I2 < w2; I2 += 1)
                    (M2 = x[I2].a).t.propType && (nt2 && 2 === t2.j && (it2 += M2.t.v * st2), (L2 = x[I2].s.getMult(A2[s2].anIndexes[I2], S2.a[I2].s.totalChars)).length ? rt2 += M2.t.v * L2[0] * st2 : rt2 += M2.t.v * L2 * st2);
                  nt2 = false;
                }
              for (rt2 && (rt2 += it2); at2 < s2; )
                A2[at2].animatorJustifyOffset = rt2, at2 += 1;
            }
            for (s2 = 0; s2 < a2; s2 += 1) {
              if (E2.reset(), N2 = 1, A2[s2].n)
                r2 = 0, i2 += t2.yOffset, i2 += V2 ? 1 : 0, o2 = J2, V2 = false, this._hasMaskedPath && (f2 = Z2, c2 = (d2 = u2[m2 = U].points)[f2 - 1], y2 = (h2 = d2[f2]).partialLength, l2 = 0), K2 = W2 = X2 = tt2 = "", et2 = this.defaultPropsArray;
              else {
                if (this._hasMaskedPath) {
                  if (Q2 !== A2[s2].line) {
                    switch (t2.j) {
                      case 1:
                        o2 += g2 - t2.lineWidths[A2[s2].line];
                        break;
                      case 2:
                        o2 += (g2 - t2.lineWidths[A2[s2].line]) / 2;
                    }
                    Q2 = A2[s2].line;
                  }
                  $2 !== A2[s2].ind && (A2[$2] && (o2 += A2[$2].extra), o2 += A2[s2].an / 2, $2 = A2[s2].ind), o2 += _2[0] * A2[s2].an / 200;
                  var ot2 = 0;
                  for (I2 = 0; I2 < w2; I2 += 1)
                    (M2 = x[I2].a).p.propType && ((L2 = x[I2].s.getMult(A2[s2].anIndexes[I2], S2.a[I2].s.totalChars)).length ? ot2 += M2.p.v[0] * L2[0] : ot2 += M2.p.v[0] * L2), M2.a.propType && ((L2 = x[I2].s.getMult(A2[s2].anIndexes[I2], S2.a[I2].s.totalChars)).length ? ot2 += M2.a.v[0] * L2[0] : ot2 += M2.a.v[0] * L2);
                  for (p2 = true; p2; )
                    l2 + y2 >= o2 + ot2 || !d2 ? (v2 = (o2 + ot2 - l2) / h2.partialLength, z2 = c2.point[0] + (h2.point[0] - c2.point[0]) * v2, B2 = c2.point[1] + (h2.point[1] - c2.point[1]) * v2, E2.translate(-_2[0] * A2[s2].an / 200, -_2[1] * R2 / 100), p2 = false) : d2 && (l2 += h2.partialLength, (f2 += 1) >= d2.length && (f2 = 0, u2[m2 += 1] ? d2 = u2[m2].points : P2.v.c ? (f2 = 0, d2 = u2[m2 = 0].points) : (l2 -= h2.partialLength, d2 = null)), d2 && (c2 = h2, y2 = (h2 = d2[f2]).partialLength));
                  O2 = A2[s2].an / 2 - A2[s2].add, E2.translate(-O2, 0, 0);
                } else
                  O2 = A2[s2].an / 2 - A2[s2].add, E2.translate(-O2, 0, 0), E2.translate(-_2[0] * A2[s2].an / 200, -_2[1] * R2 / 100, 0);
                for (A2[s2].l / 2, I2 = 0; I2 < w2; I2 += 1)
                  (M2 = x[I2].a).t.propType && (L2 = x[I2].s.getMult(A2[s2].anIndexes[I2], S2.a[I2].s.totalChars), 0 === r2 && 0 === t2.j || (this._hasMaskedPath ? L2.length ? o2 += M2.t.v * L2[0] : o2 += M2.t.v * L2 : L2.length ? r2 += M2.t.v * L2[0] : r2 += M2.t.v * L2));
                for (A2[s2].l / 2, t2.strokeWidthAnim && (j2 = t2.sw || 0), t2.strokeColorAnim && (G2 = t2.sc ? [t2.sc[0], t2.sc[1], t2.sc[2]] : [0, 0, 0]), t2.fillColorAnim && t2.fc && (q2 = [t2.fc[0], t2.fc[1], t2.fc[2]]), I2 = 0; I2 < w2; I2 += 1)
                  (M2 = x[I2].a).a.propType && ((L2 = x[I2].s.getMult(A2[s2].anIndexes[I2], S2.a[I2].s.totalChars)).length ? E2.translate(-M2.a.v[0] * L2[0], -M2.a.v[1] * L2[1], M2.a.v[2] * L2[2]) : E2.translate(-M2.a.v[0] * L2, -M2.a.v[1] * L2, M2.a.v[2] * L2));
                for (I2 = 0; I2 < w2; I2 += 1)
                  (M2 = x[I2].a).s.propType && ((L2 = x[I2].s.getMult(A2[s2].anIndexes[I2], S2.a[I2].s.totalChars)).length ? E2.scale(1 + (M2.s.v[0] - 1) * L2[0], 1 + (M2.s.v[1] - 1) * L2[1], 1) : E2.scale(1 + (M2.s.v[0] - 1) * L2, 1 + (M2.s.v[1] - 1) * L2, 1));
                for (I2 = 0; I2 < w2; I2 += 1) {
                  if (M2 = x[I2].a, L2 = x[I2].s.getMult(A2[s2].anIndexes[I2], S2.a[I2].s.totalChars), M2.sk.propType && (L2.length ? E2.skewFromAxis(-M2.sk.v * L2[0], M2.sa.v * L2[1]) : E2.skewFromAxis(-M2.sk.v * L2, M2.sa.v * L2)), M2.r.propType && (L2.length ? E2.rotateZ(-M2.r.v * L2[2]) : E2.rotateZ(-M2.r.v * L2)), M2.ry.propType && (L2.length ? E2.rotateY(M2.ry.v * L2[1]) : E2.rotateY(M2.ry.v * L2)), M2.rx.propType && (L2.length ? E2.rotateX(M2.rx.v * L2[0]) : E2.rotateX(M2.rx.v * L2)), M2.o.propType && (L2.length ? N2 += (M2.o.v * L2[0] - N2) * L2[0] : N2 += (M2.o.v * L2 - N2) * L2), t2.strokeWidthAnim && M2.sw.propType && (L2.length ? j2 += M2.sw.v * L2[0] : j2 += M2.sw.v * L2), t2.strokeColorAnim && M2.sc.propType)
                    for (H2 = 0; H2 < 3; H2 += 1)
                      L2.length ? G2[H2] = G2[H2] + (M2.sc.v[H2] - G2[H2]) * L2[0] : G2[H2] = G2[H2] + (M2.sc.v[H2] - G2[H2]) * L2;
                  if (t2.fillColorAnim && t2.fc) {
                    if (M2.fc.propType)
                      for (H2 = 0; H2 < 3; H2 += 1)
                        L2.length ? q2[H2] = q2[H2] + (M2.fc.v[H2] - q2[H2]) * L2[0] : q2[H2] = q2[H2] + (M2.fc.v[H2] - q2[H2]) * L2;
                    M2.fh.propType && (q2 = L2.length ? addHueToRGB(q2, M2.fh.v * L2[0]) : addHueToRGB(q2, M2.fh.v * L2)), M2.fs.propType && (q2 = L2.length ? addSaturationToRGB(q2, M2.fs.v * L2[0]) : addSaturationToRGB(q2, M2.fs.v * L2)), M2.fb.propType && (q2 = L2.length ? addBrightnessToRGB(q2, M2.fb.v * L2[0]) : addBrightnessToRGB(q2, M2.fb.v * L2));
                  }
                }
                for (I2 = 0; I2 < w2; I2 += 1)
                  (M2 = x[I2].a).p.propType && (L2 = x[I2].s.getMult(A2[s2].anIndexes[I2], S2.a[I2].s.totalChars), this._hasMaskedPath ? L2.length ? E2.translate(0, M2.p.v[1] * L2[0], -M2.p.v[2] * L2[1]) : E2.translate(0, M2.p.v[1] * L2, -M2.p.v[2] * L2) : L2.length ? E2.translate(M2.p.v[0] * L2[0], M2.p.v[1] * L2[1], -M2.p.v[2] * L2[2]) : E2.translate(M2.p.v[0] * L2, M2.p.v[1] * L2, -M2.p.v[2] * L2));
                if (t2.strokeWidthAnim && (W2 = j2 < 0 ? 0 : j2), t2.strokeColorAnim && (Y2 = "rgb(" + Math.round(255 * G2[0]) + "," + Math.round(255 * G2[1]) + "," + Math.round(255 * G2[2]) + ")"), t2.fillColorAnim && t2.fc && (X2 = "rgb(" + Math.round(255 * q2[0]) + "," + Math.round(255 * q2[1]) + "," + Math.round(255 * q2[2]) + ")"), this._hasMaskedPath) {
                  if (E2.translate(0, -t2.ls), E2.translate(0, _2[1] * R2 / 100 + i2, 0), S2.p.p) {
                    b2 = (h2.point[1] - c2.point[1]) / (h2.point[0] - c2.point[0]);
                    var ht2 = 180 * Math.atan(b2) / Math.PI;
                    h2.point[0] < c2.point[0] && (ht2 += 180), E2.rotate(-ht2 * Math.PI / 180);
                  }
                  E2.translate(z2, B2, 0), o2 -= _2[0] * A2[s2].an / 200, A2[s2 + 1] && $2 !== A2[s2 + 1].ind && (o2 += A2[s2].an / 2, o2 += t2.tr / 1e3 * t2.finalSize);
                } else {
                  switch (E2.translate(r2, i2, 0), t2.ps && E2.translate(t2.ps[0], t2.ps[1] + t2.ascent, 0), t2.j) {
                    case 1:
                      E2.translate(A2[s2].animatorJustifyOffset + t2.justifyOffset + (t2.boxWidth - t2.lineWidths[A2[s2].line]), 0, 0);
                      break;
                    case 2:
                      E2.translate(A2[s2].animatorJustifyOffset + t2.justifyOffset + (t2.boxWidth - t2.lineWidths[A2[s2].line]) / 2, 0, 0);
                  }
                  E2.translate(0, -t2.ls), E2.translate(O2, 0, 0), E2.translate(_2[0] * A2[s2].an / 200, _2[1] * R2 / 100, 0), r2 += A2[s2].l + t2.tr / 1e3 * t2.finalSize;
                }
                "html" === T2 ? tt2 = E2.toCSS() : "svg" === T2 ? tt2 = E2.to2dCSS() : et2 = [E2.props[0], E2.props[1], E2.props[2], E2.props[3], E2.props[4], E2.props[5], E2.props[6], E2.props[7], E2.props[8], E2.props[9], E2.props[10], E2.props[11], E2.props[12], E2.props[13], E2.props[14], E2.props[15]], K2 = N2;
              }
              C2 <= s2 ? (F2 = new LetterProps(K2, W2, Y2, X2, tt2, et2), this.renderedLetters.push(F2), C2 += 1, this.lettersChangedFlag = true) : (F2 = this.renderedLetters[s2], this.lettersChangedFlag = F2.update(K2, W2, Y2, X2, tt2, et2) || this.lettersChangedFlag);
            }
          }
        }, TextAnimatorProperty.prototype.getValue = function() {
          this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
        }, TextAnimatorProperty.prototype.mHelper = new Matrix(), TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function(t2, e2, r2, i2, s2, a2) {
          this._mdf.o = false, this._mdf.sw = false, this._mdf.sc = false, this._mdf.fc = false, this._mdf.m = false, this._mdf.p = false;
          var n2 = false;
          return this.o !== t2 && (this.o = t2, this._mdf.o = true, n2 = true), this.sw !== e2 && (this.sw = e2, this._mdf.sw = true, n2 = true), this.sc !== r2 && (this.sc = r2, this._mdf.sc = true, n2 = true), this.fc !== i2 && (this.fc = i2, this._mdf.fc = true, n2 = true), this.m !== s2 && (this.m = s2, this._mdf.m = true, n2 = true), !a2.length || this.p[0] === a2[0] && this.p[1] === a2[1] && this.p[4] === a2[4] && this.p[5] === a2[5] && this.p[12] === a2[12] && this.p[13] === a2[13] || (this.p = a2, this._mdf.p = true, n2 = true), n2;
        }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function(t2, e2) {
          for (var r2 in e2)
            e2.hasOwnProperty(r2) && (t2[r2] = e2[r2]);
          return t2;
        }, TextProperty.prototype.setCurrentData = function(t2) {
          t2.__complete || this.completeTextData(t2), this.currentData = t2, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = true;
        }, TextProperty.prototype.searchProperty = function() {
          return this.searchKeyframes();
        }, TextProperty.prototype.searchKeyframes = function() {
          return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
        }, TextProperty.prototype.addEffect = function(t2) {
          this.effectsSequence.push(t2), this.elem.addDynamicProperty(this);
        }, TextProperty.prototype.getValue = function(t2) {
          if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t2) {
            this.currentData.t = this.data.d.k[this.keysIndex].s.t;
            var e2 = this.currentData, r2 = this.keysIndex;
            if (this.lock)
              this.setCurrentData(this.currentData);
            else {
              this.lock = true, this._mdf = false;
              var i2, s2 = this.effectsSequence.length, a2 = t2 || this.data.d.k[this.keysIndex].s;
              for (i2 = 0; i2 < s2; i2 += 1)
                a2 = r2 !== this.keysIndex ? this.effectsSequence[i2](a2, a2.t) : this.effectsSequence[i2](this.currentData, a2.t);
              e2 !== a2 && this.setCurrentData(a2), this.pv = this.v = this.currentData, this.lock = false, this.frameId = this.elem.globalData.frameId;
            }
          }
        }, TextProperty.prototype.getKeyframeValue = function() {
          for (var t2 = this.data.d.k, e2 = this.elem.comp.renderedFrame, r2 = 0, i2 = t2.length; r2 <= i2 - 1 && (t2[r2].s, !(r2 === i2 - 1 || t2[r2 + 1].t > e2)); )
            r2 += 1;
          return this.keysIndex !== r2 && (this.keysIndex = r2), this.data.d.k[this.keysIndex].s;
        }, TextProperty.prototype.buildFinalText = function(t2) {
          for (var e2, r2 = FontManager.getCombinedCharacterCodes(), i2 = [], s2 = 0, a2 = t2.length; s2 < a2; )
            e2 = t2.charCodeAt(s2), -1 !== r2.indexOf(e2) ? i2[i2.length - 1] += t2.charAt(s2) : e2 >= 55296 && e2 <= 56319 && (e2 = t2.charCodeAt(s2 + 1)) >= 56320 && e2 <= 57343 ? (i2.push(t2.substr(s2, 2)), ++s2) : i2.push(t2.charAt(s2)), s2 += 1;
          return i2;
        }, TextProperty.prototype.completeTextData = function(t2) {
          t2.__complete = true;
          var e2, r2, i2, s2, a2, n2, o2, h2 = this.elem.globalData.fontManager, l2 = this.data, p2 = [], f2 = 0, m2 = l2.m.g, c2 = 0, d2 = 0, u2 = 0, y2 = [], g2 = 0, v2 = 0, b2 = h2.getFontByName(t2.f), P2 = 0, _2 = b2.fStyle ? b2.fStyle.split(" ") : [], x = "normal", S2 = "normal";
          for (r2 = _2.length, e2 = 0; e2 < r2; e2 += 1)
            switch (_2[e2].toLowerCase()) {
              case "italic":
                S2 = "italic";
                break;
              case "bold":
                x = "700";
                break;
              case "black":
                x = "900";
                break;
              case "medium":
                x = "500";
                break;
              case "regular":
              case "normal":
                x = "400";
                break;
              case "light":
              case "thin":
                x = "200";
            }
          t2.fWeight = b2.fWeight || x, t2.fStyle = S2, t2.finalSize = t2.s, t2.finalText = this.buildFinalText(t2.t), r2 = t2.finalText.length, t2.finalLineHeight = t2.lh;
          var E2, T2 = t2.tr / 1e3 * t2.finalSize;
          if (t2.sz)
            for (var C2, A2, k = true, D2 = t2.sz[0], M2 = t2.sz[1]; k; ) {
              C2 = 0, g2 = 0, r2 = (A2 = this.buildFinalText(t2.t)).length, T2 = t2.tr / 1e3 * t2.finalSize;
              var I2 = -1;
              for (e2 = 0; e2 < r2; e2 += 1)
                E2 = A2[e2].charCodeAt(0), i2 = false, " " === A2[e2] ? I2 = e2 : 13 !== E2 && 3 !== E2 || (g2 = 0, i2 = true, C2 += t2.finalLineHeight || 1.2 * t2.finalSize), h2.chars ? (o2 = h2.getCharData(A2[e2], b2.fStyle, b2.fFamily), P2 = i2 ? 0 : o2.w * t2.finalSize / 100) : P2 = h2.measureText(A2[e2], t2.f, t2.finalSize), g2 + P2 > D2 && " " !== A2[e2] ? (-1 === I2 ? r2 += 1 : e2 = I2, C2 += t2.finalLineHeight || 1.2 * t2.finalSize, A2.splice(e2, I2 === e2 ? 1 : 0, "\r"), I2 = -1, g2 = 0) : (g2 += P2, g2 += T2);
              C2 += b2.ascent * t2.finalSize / 100, this.canResize && t2.finalSize > this.minimumFontSize && M2 < C2 ? (t2.finalSize -= 1, t2.finalLineHeight = t2.finalSize * t2.lh / t2.s) : (t2.finalText = A2, r2 = t2.finalText.length, k = false);
            }
          g2 = -T2, P2 = 0;
          var w2, F2 = 0;
          for (e2 = 0; e2 < r2; e2 += 1)
            if (i2 = false, E2 = (w2 = t2.finalText[e2]).charCodeAt(0), " " === w2 ? s2 = " " : 13 === E2 || 3 === E2 ? (F2 = 0, y2.push(g2), v2 = g2 > v2 ? g2 : v2, g2 = -2 * T2, s2 = "", i2 = true, u2 += 1) : s2 = t2.finalText[e2], h2.chars ? (o2 = h2.getCharData(w2, b2.fStyle, h2.getFontByName(t2.f).fFamily), P2 = i2 ? 0 : o2.w * t2.finalSize / 100) : P2 = h2.measureText(s2, t2.f, t2.finalSize), " " === w2 ? F2 += P2 + T2 : (g2 += P2 + T2 + F2, F2 = 0), p2.push({ l: P2, an: P2, add: c2, n: i2, anIndexes: [], val: s2, line: u2, animatorJustifyOffset: 0 }), 2 == m2) {
              if (c2 += P2, "" === s2 || " " === s2 || e2 === r2 - 1) {
                for ("" !== s2 && " " !== s2 || (c2 -= P2); d2 <= e2; )
                  p2[d2].an = c2, p2[d2].ind = f2, p2[d2].extra = P2, d2 += 1;
                f2 += 1, c2 = 0;
              }
            } else if (3 == m2) {
              if (c2 += P2, "" === s2 || e2 === r2 - 1) {
                for ("" === s2 && (c2 -= P2); d2 <= e2; )
                  p2[d2].an = c2, p2[d2].ind = f2, p2[d2].extra = P2, d2 += 1;
                c2 = 0, f2 += 1;
              }
            } else
              p2[f2].ind = f2, p2[f2].extra = 0, f2 += 1;
          if (t2.l = p2, v2 = g2 > v2 ? g2 : v2, y2.push(g2), t2.sz)
            t2.boxWidth = t2.sz[0], t2.justifyOffset = 0;
          else
            switch (t2.boxWidth = v2, t2.j) {
              case 1:
                t2.justifyOffset = -t2.boxWidth;
                break;
              case 2:
                t2.justifyOffset = -t2.boxWidth / 2;
                break;
              default:
                t2.justifyOffset = 0;
            }
          t2.lineWidths = y2;
          var R2, V2, L2 = l2.a;
          n2 = L2.length;
          var O2, z2, B2 = [];
          for (a2 = 0; a2 < n2; a2 += 1) {
            for ((R2 = L2[a2]).a.sc && (t2.strokeColorAnim = true), R2.a.sw && (t2.strokeWidthAnim = true), (R2.a.fc || R2.a.fh || R2.a.fs || R2.a.fb) && (t2.fillColorAnim = true), z2 = 0, O2 = R2.s.b, e2 = 0; e2 < r2; e2 += 1)
              (V2 = p2[e2]).anIndexes[a2] = z2, (1 == O2 && "" !== V2.val || 2 == O2 && "" !== V2.val && " " !== V2.val || 3 == O2 && (V2.n || " " == V2.val || e2 == r2 - 1) || 4 == O2 && (V2.n || e2 == r2 - 1)) && (1 === R2.s.rn && B2.push(z2), z2 += 1);
            l2.a[a2].s.totalChars = z2;
            var N2, G2 = -1;
            if (1 === R2.s.rn)
              for (e2 = 0; e2 < r2; e2 += 1)
                G2 != (V2 = p2[e2]).anIndexes[a2] && (G2 = V2.anIndexes[a2], N2 = B2.splice(Math.floor(Math.random() * B2.length), 1)[0]), V2.anIndexes[a2] = N2;
          }
          t2.yOffset = t2.finalLineHeight || 1.2 * t2.finalSize, t2.ls = t2.ls || 0, t2.ascent = b2.ascent * t2.finalSize / 100;
        }, TextProperty.prototype.updateDocumentData = function(t2, e2) {
          e2 = void 0 === e2 ? this.keysIndex : e2;
          var r2 = this.copyData({}, this.data.d.k[e2].s);
          r2 = this.copyData(r2, t2), this.data.d.k[e2].s = r2, this.recalculate(e2), this.elem.addDynamicProperty(this);
        }, TextProperty.prototype.recalculate = function(t2) {
          var e2 = this.data.d.k[t2].s;
          e2.__complete = false, this.keysIndex = 0, this._isFirstFrame = true, this.getValue(e2);
        }, TextProperty.prototype.canResizeFont = function(t2) {
          this.canResize = t2, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
        }, TextProperty.prototype.setMinimumFontSize = function(t2) {
          this.minimumFontSize = Math.floor(t2) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
        };
        var TextSelectorProp = function() {
          var t2 = Math.max, e2 = Math.min, r2 = Math.floor;
          function i2(t3, e3) {
            this._currentTextLength = -1, this.k = false, this.data = e3, this.elem = t3, this.comp = t3.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t3), this.s = PropertyFactory.getProp(t3, e3.s || { k: 0 }, 0, 0, this), this.e = "e" in e3 ? PropertyFactory.getProp(t3, e3.e, 0, 0, this) : { v: 100 }, this.o = PropertyFactory.getProp(t3, e3.o || { k: 0 }, 0, 0, this), this.xe = PropertyFactory.getProp(t3, e3.xe || { k: 0 }, 0, 0, this), this.ne = PropertyFactory.getProp(t3, e3.ne || { k: 0 }, 0, 0, this), this.a = PropertyFactory.getProp(t3, e3.a, 0, 0.01, this), this.dynamicProperties.length || this.getValue();
          }
          return i2.prototype = { getMult: function(i3) {
            this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
            var s2 = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get, a2 = 0, n2 = this.finalS, o2 = this.finalE, h2 = this.data.sh;
            if (2 == h2)
              a2 = s2(a2 = o2 === n2 ? i3 >= o2 ? 1 : 0 : t2(0, e2(0.5 / (o2 - n2) + (i3 - n2) / (o2 - n2), 1)));
            else if (3 == h2)
              a2 = s2(a2 = o2 === n2 ? i3 >= o2 ? 0 : 1 : 1 - t2(0, e2(0.5 / (o2 - n2) + (i3 - n2) / (o2 - n2), 1)));
            else if (4 == h2)
              o2 === n2 ? a2 = 0 : (a2 = t2(0, e2(0.5 / (o2 - n2) + (i3 - n2) / (o2 - n2), 1))) < 0.5 ? a2 *= 2 : a2 = 1 - 2 * (a2 - 0.5), a2 = s2(a2);
            else if (5 == h2) {
              if (o2 === n2)
                a2 = 0;
              else {
                var l2 = o2 - n2, p2 = -l2 / 2 + (i3 = e2(t2(0, i3 + 0.5 - n2), o2 - n2)), f2 = l2 / 2;
                a2 = Math.sqrt(1 - p2 * p2 / (f2 * f2));
              }
              a2 = s2(a2);
            } else
              6 == h2 ? (o2 === n2 ? a2 = 0 : (i3 = e2(t2(0, i3 + 0.5 - n2), o2 - n2), a2 = (1 + Math.cos(Math.PI + 2 * Math.PI * i3 / (o2 - n2))) / 2), a2 = s2(a2)) : (i3 >= r2(n2) && (a2 = i3 - n2 < 0 ? 1 - (n2 - i3) : t2(0, e2(o2 - i3, 1))), a2 = s2(a2));
            return a2 * this.a.v;
          }, getValue: function(t3) {
            this.iterateDynamicProperties(), this._mdf = t3 || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t3 && 2 === this.data.r && (this.e.v = this._currentTextLength);
            var e3 = 2 === this.data.r ? 1 : 100 / this.data.totalChars, r3 = this.o.v / e3, i3 = this.s.v / e3 + r3, s2 = this.e.v / e3 + r3;
            if (i3 > s2) {
              var a2 = i3;
              i3 = s2, s2 = a2;
            }
            this.finalS = i3, this.finalE = s2;
          } }, extendPrototype([DynamicPropertyContainer], i2), { getTextSelectorProp: function(t3, e3, r3) {
            return new i2(t3, e3);
          } };
        }(), pool_factory = function(t2, e2, r2, i2) {
          var s2 = 0, a2 = t2, n2 = createSizedArray(a2);
          function o2() {
            return s2 ? n2[s2 -= 1] : e2();
          }
          return { newElement: o2, release: function(t3) {
            s2 === a2 && (n2 = pooling.double(n2), a2 *= 2), r2 && r2(t3), n2[s2] = t3, s2 += 1;
          } };
        }, pooling = { double: function(t2) {
          return t2.concat(createSizedArray(t2.length));
        } }, point_pool = pool_factory(8, function() {
          return createTypedArray("float32", 2);
        }), shape_pool = (factory = pool_factory(4, function() {
          return new ShapePath();
        }, function(t2) {
          var e2, r2 = t2._length;
          for (e2 = 0; e2 < r2; e2 += 1)
            point_pool.release(t2.v[e2]), point_pool.release(t2.i[e2]), point_pool.release(t2.o[e2]), t2.v[e2] = null, t2.i[e2] = null, t2.o[e2] = null;
          t2._length = 0, t2.c = false;
        }), factory.clone = function(t2) {
          var e2, r2 = factory.newElement(), i2 = void 0 === t2._length ? t2.v.length : t2._length;
          for (r2.setLength(i2), r2.c = t2.c, e2 = 0; e2 < i2; e2 += 1)
            r2.setTripleAt(t2.v[e2][0], t2.v[e2][1], t2.o[e2][0], t2.o[e2][1], t2.i[e2][0], t2.i[e2][1], e2);
          return r2;
        }, factory), factory, shapeCollection_pool = function() {
          var t2 = { newShapeCollection: function() {
            var t3;
            t3 = e2 ? i2[e2 -= 1] : new ShapeCollection();
            return t3;
          }, release: function(t3) {
            var s2, a2 = t3._length;
            for (s2 = 0; s2 < a2; s2 += 1)
              shape_pool.release(t3.shapes[s2]);
            t3._length = 0, e2 === r2 && (i2 = pooling.double(i2), r2 *= 2);
            i2[e2] = t3, e2 += 1;
          } }, e2 = 0, r2 = 4, i2 = createSizedArray(r2);
          return t2;
        }(), segments_length_pool = pool_factory(8, function() {
          return { lengths: [], totalLength: 0 };
        }, function(t2) {
          var e2, r2 = t2.lengths.length;
          for (e2 = 0; e2 < r2; e2 += 1)
            bezier_length_pool.release(t2.lengths[e2]);
          t2.lengths.length = 0;
        }), bezier_length_pool = pool_factory(8, function() {
          return { addedLength: 0, percents: createTypedArray("float32", defaultCurveSegments), lengths: createTypedArray("float32", defaultCurveSegments) };
        });
        function BaseRenderer() {
        }
        function SVGRenderer(t2, e2) {
          this.animationItem = t2, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
          var r2 = "";
          if (e2 && e2.title) {
            var i2 = createNS("title"), s2 = createElementID();
            i2.setAttribute("id", s2), i2.textContent = e2.title, this.svgElement.appendChild(i2), r2 += s2;
          }
          if (e2 && e2.description) {
            var a2 = createNS("desc"), n2 = createElementID();
            a2.setAttribute("id", n2), a2.textContent = e2.description, this.svgElement.appendChild(a2), r2 += " " + n2;
          }
          r2 && this.svgElement.setAttribute("aria-labelledby", r2);
          var o2 = createNS("defs");
          this.svgElement.appendChild(o2);
          var h2 = createNS("g");
          this.svgElement.appendChild(h2), this.layerElement = h2, this.renderConfig = { preserveAspectRatio: e2 && e2.preserveAspectRatio || "xMidYMid meet", imagePreserveAspectRatio: e2 && e2.imagePreserveAspectRatio || "xMidYMid slice", progressiveLoad: e2 && e2.progressiveLoad || false, hideOnTransparent: !e2 || false !== e2.hideOnTransparent, viewBoxOnly: e2 && e2.viewBoxOnly || false, viewBoxSize: e2 && e2.viewBoxSize || false, className: e2 && e2.className || "" }, this.globalData = { _mdf: false, frameNum: -1, defs: o2, renderConfig: this.renderConfig }, this.elements = [], this.pendingElements = [], this.destroyed = false, this.rendererType = "svg";
        }
        function CanvasRenderer(t2, e2) {
          this.animationItem = t2, this.renderConfig = { clearCanvas: !e2 || void 0 === e2.clearCanvas || e2.clearCanvas, context: e2 && e2.context || null, progressiveLoad: e2 && e2.progressiveLoad || false, preserveAspectRatio: e2 && e2.preserveAspectRatio || "xMidYMid meet", imagePreserveAspectRatio: e2 && e2.imagePreserveAspectRatio || "xMidYMid slice", className: e2 && e2.className || "" }, this.renderConfig.dpr = e2 && e2.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e2 && e2.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = { frameNum: -1, _mdf: false, renderConfig: this.renderConfig, currentGlobalAlpha: -1 }, this.contextData = new CVContextData(), this.elements = [], this.pendingElements = [], this.transformMat = new Matrix(), this.completeLayers = false, this.rendererType = "canvas";
        }
        function MaskElement(t2, e2, r2) {
          this.data = t2, this.element = e2, this.globalData = r2, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
          var i2, s2 = this.globalData.defs, a2 = this.masksProperties ? this.masksProperties.length : 0;
          this.viewData = createSizedArray(a2), this.solidPath = "";
          var n2, o2, h2, l2, p2, f2, m2, c2 = this.masksProperties, d2 = 0, u2 = [], y2 = createElementID(), g2 = "clipPath", v2 = "clip-path";
          for (i2 = 0; i2 < a2; i2++)
            if (("a" !== c2[i2].mode && "n" !== c2[i2].mode || c2[i2].inv || 100 !== c2[i2].o.k || c2[i2].o.x) && (g2 = "mask", v2 = "mask"), "s" != c2[i2].mode && "i" != c2[i2].mode || 0 !== d2 ? l2 = null : ((l2 = createNS("rect")).setAttribute("fill", "#ffffff"), l2.setAttribute("width", this.element.comp.data.w || 0), l2.setAttribute("height", this.element.comp.data.h || 0), u2.push(l2)), n2 = createNS("path"), "n" != c2[i2].mode) {
              var b2;
              if (d2 += 1, n2.setAttribute("fill", "s" === c2[i2].mode ? "#000000" : "#ffffff"), n2.setAttribute("clip-rule", "nonzero"), 0 !== c2[i2].x.k ? (g2 = "mask", v2 = "mask", m2 = PropertyFactory.getProp(this.element, c2[i2].x, 0, null, this.element), b2 = createElementID(), (p2 = createNS("filter")).setAttribute("id", b2), (f2 = createNS("feMorphology")).setAttribute("operator", "erode"), f2.setAttribute("in", "SourceGraphic"), f2.setAttribute("radius", "0"), p2.appendChild(f2), s2.appendChild(p2), n2.setAttribute("stroke", "s" === c2[i2].mode ? "#000000" : "#ffffff")) : (f2 = null, m2 = null), this.storedData[i2] = { elem: n2, x: m2, expan: f2, lastPath: "", lastOperator: "", filterId: b2, lastRadius: 0 }, "i" == c2[i2].mode) {
                h2 = u2.length;
                var P2 = createNS("g");
                for (o2 = 0; o2 < h2; o2 += 1)
                  P2.appendChild(u2[o2]);
                var _2 = createNS("mask");
                _2.setAttribute("mask-type", "alpha"), _2.setAttribute("id", y2 + "_" + d2), _2.appendChild(n2), s2.appendChild(_2), P2.setAttribute("mask", "url(" + locationHref + "#" + y2 + "_" + d2 + ")"), u2.length = 0, u2.push(P2);
              } else
                u2.push(n2);
              c2[i2].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i2] = { elem: n2, lastPath: "", op: PropertyFactory.getProp(this.element, c2[i2].o, 0, 0.01, this.element), prop: ShapePropertyFactory.getShapeProp(this.element, c2[i2], 3), invRect: l2 }, this.viewData[i2].prop.k || this.drawPath(c2[i2], this.viewData[i2].prop.v, this.viewData[i2]);
            } else
              this.viewData[i2] = { op: PropertyFactory.getProp(this.element, c2[i2].o, 0, 0.01, this.element), prop: ShapePropertyFactory.getShapeProp(this.element, c2[i2], 3), elem: n2, lastPath: "" }, s2.appendChild(n2);
          for (this.maskElement = createNS(g2), a2 = u2.length, i2 = 0; i2 < a2; i2 += 1)
            this.maskElement.appendChild(u2[i2]);
          d2 > 0 && (this.maskElement.setAttribute("id", y2), this.element.maskedElement.setAttribute(v2, "url(" + locationHref + "#" + y2 + ")"), s2.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
        }
        function HierarchyElement() {
        }
        function FrameElement() {
        }
        function TransformElement() {
        }
        function RenderableElement() {
        }
        function RenderableDOMElement() {
        }
        function ProcessedElement(t2, e2) {
          this.elem = t2, this.pos = e2;
        }
        function SVGShapeData(t2, e2, r2) {
          this.caches = [], this.styles = [], this.transformers = t2, this.lStr = "", this.sh = r2, this.lvl = e2, this._isAnimated = !!r2.k;
          for (var i2 = 0, s2 = t2.length; i2 < s2; ) {
            if (t2[i2].mProps.dynamicProperties.length) {
              this._isAnimated = true;
              break;
            }
            i2 += 1;
          }
        }
        function ShapeGroupData() {
          this.it = [], this.prevViewData = [], this.gr = createNS("g");
        }
        function ShapeTransformManager() {
          this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0;
        }
        function CVShapeData(t2, e2, r2, i2) {
          this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
          var s2 = 4;
          "rc" == e2.ty ? s2 = 5 : "el" == e2.ty ? s2 = 6 : "sr" == e2.ty && (s2 = 7), this.sh = ShapePropertyFactory.getShapeProp(t2, e2, s2, t2);
          var a2, n2, o2 = r2.length;
          for (a2 = 0; a2 < o2; a2 += 1)
            r2[a2].closed || (n2 = { transforms: i2.addTransformSequence(r2[a2].transforms), trNodes: [] }, this.styledShapes.push(n2), r2[a2].elements.push(n2));
        }
        function BaseElement() {
        }
        function NullElement(t2, e2, r2) {
          this.initFrame(), this.initBaseData(t2, e2, r2), this.initFrame(), this.initTransform(t2, e2, r2), this.initHierarchy();
        }
        function SVGBaseElement() {
        }
        function IShapeElement() {
        }
        function ITextElement() {
        }
        function ICompElement() {
        }
        function IImageElement(t2, e2, r2) {
          this.assetData = e2.getAssetData(t2.refId), this.initElement(t2, e2, r2), this.sourceRect = { top: 0, left: 0, width: this.assetData.w, height: this.assetData.h };
        }
        function ISolidElement(t2, e2, r2) {
          this.initElement(t2, e2, r2);
        }
        function SVGShapeElement(t2, e2, r2) {
          this.shapes = [], this.shapesData = t2.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t2, e2, r2), this.prevViewData = [];
        }
        function CVContextData() {
          this.saved = [], this.cArrPos = 0, this.cTr = new Matrix(), this.cO = 1;
          var t2;
          for (this.savedOp = createTypedArray("float32", 15), t2 = 0; t2 < 15; t2 += 1)
            this.saved[t2] = createTypedArray("float32", 16);
          this._length = 15;
        }
        function CVBaseElement() {
        }
        function CVImageElement(t2, e2, r2) {
          this.assetData = e2.getAssetData(t2.refId), this.img = e2.imageLoader.getImage(this.assetData), this.initElement(t2, e2, r2);
        }
        function CVCompElement(t2, e2, r2) {
          this.completeLayers = false, this.layers = t2.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t2, e2, r2), this.tm = t2.tm ? PropertyFactory.getProp(this, t2.tm, 0, e2.frameRate, this) : { _placeholder: true };
        }
        function CVMaskElement(t2, e2) {
          this.data = t2, this.element = e2, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
          var r2, i2 = this.masksProperties.length, s2 = false;
          for (r2 = 0; r2 < i2; r2++)
            "n" !== this.masksProperties[r2].mode && (s2 = true), this.viewData[r2] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r2], 3);
          this.hasMasks = s2, s2 && this.element.addRenderableComponent(this);
        }
        function CVShapeElement(t2, e2, r2) {
          this.shapes = [], this.shapesData = t2.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager(), this.initElement(t2, e2, r2);
        }
        function CVSolidElement(t2, e2, r2) {
          this.initElement(t2, e2, r2);
        }
        function CVTextElement(t2, e2, r2) {
          this.textSpans = [], this.yOffset = 0, this.fillColorAnim = false, this.strokeColorAnim = false, this.strokeWidthAnim = false, this.stroke = false, this.fill = false, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = { fill: "rgba(0,0,0,0)", stroke: "rgba(0,0,0,0)", sWidth: 0, fValue: "" }, this.initElement(t2, e2, r2);
        }
        function CVEffects() {
        }
        BaseRenderer.prototype.checkLayers = function(t2) {
          var e2, r2, i2 = this.layers.length;
          for (this.completeLayers = true, e2 = i2 - 1; e2 >= 0; e2--)
            this.elements[e2] || (r2 = this.layers[e2]).ip - r2.st <= t2 - this.layers[e2].st && r2.op - r2.st > t2 - this.layers[e2].st && this.buildItem(e2), this.completeLayers = !!this.elements[e2] && this.completeLayers;
          this.checkPendingElements();
        }, BaseRenderer.prototype.createItem = function(t2) {
          switch (t2.ty) {
            case 2:
              return this.createImage(t2);
            case 0:
              return this.createComp(t2);
            case 1:
              return this.createSolid(t2);
            case 3:
              return this.createNull(t2);
            case 4:
              return this.createShape(t2);
            case 5:
              return this.createText(t2);
            case 13:
              return this.createCamera(t2);
          }
          return this.createNull(t2);
        }, BaseRenderer.prototype.createCamera = function() {
          throw new Error("You're using a 3d camera. Try the html renderer.");
        }, BaseRenderer.prototype.buildAllItems = function() {
          var t2, e2 = this.layers.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.buildItem(t2);
          this.checkPendingElements();
        }, BaseRenderer.prototype.includeLayers = function(t2) {
          this.completeLayers = false;
          var e2, r2, i2 = t2.length, s2 = this.layers.length;
          for (e2 = 0; e2 < i2; e2 += 1)
            for (r2 = 0; r2 < s2; ) {
              if (this.layers[r2].id == t2[e2].id) {
                this.layers[r2] = t2[e2];
                break;
              }
              r2 += 1;
            }
        }, BaseRenderer.prototype.setProjectInterface = function(t2) {
          this.globalData.projectInterface = t2;
        }, BaseRenderer.prototype.initItems = function() {
          this.globalData.progressiveLoad || this.buildAllItems();
        }, BaseRenderer.prototype.buildElementParenting = function(t2, e2, r2) {
          for (var i2 = this.elements, s2 = this.layers, a2 = 0, n2 = s2.length; a2 < n2; )
            s2[a2].ind == e2 && (i2[a2] && true !== i2[a2] ? (r2.push(i2[a2]), i2[a2].setAsParent(), void 0 !== s2[a2].parent ? this.buildElementParenting(t2, s2[a2].parent, r2) : t2.setHierarchy(r2)) : (this.buildItem(a2), this.addPendingElement(t2))), a2 += 1;
        }, BaseRenderer.prototype.addPendingElement = function(t2) {
          this.pendingElements.push(t2);
        }, BaseRenderer.prototype.searchExtraCompositions = function(t2) {
          var e2, r2 = t2.length;
          for (e2 = 0; e2 < r2; e2 += 1)
            if (t2[e2].xt) {
              var i2 = this.createComp(t2[e2]);
              i2.initExpressions(), this.globalData.projectInterface.registerComposition(i2);
            }
        }, BaseRenderer.prototype.setupGlobalData = function(t2, e2) {
          this.globalData.fontManager = new FontManager(), this.globalData.fontManager.addChars(t2.chars), this.globalData.fontManager.addFonts(t2.fonts, e2), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t2.fr, this.globalData.nm = t2.nm, this.globalData.compSize = { w: t2.w, h: t2.h };
        }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function(t2) {
          return new NullElement(t2, this.globalData, this);
        }, SVGRenderer.prototype.createShape = function(t2) {
          return new SVGShapeElement(t2, this.globalData, this);
        }, SVGRenderer.prototype.createText = function(t2) {
          return new SVGTextElement(t2, this.globalData, this);
        }, SVGRenderer.prototype.createImage = function(t2) {
          return new IImageElement(t2, this.globalData, this);
        }, SVGRenderer.prototype.createComp = function(t2) {
          return new SVGCompElement(t2, this.globalData, this);
        }, SVGRenderer.prototype.createSolid = function(t2) {
          return new ISolidElement(t2, this.globalData, this);
        }, SVGRenderer.prototype.configAnimation = function(t2) {
          this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t2.w + " " + t2.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t2.w), this.svgElement.setAttribute("height", t2.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
          var e2 = this.globalData.defs;
          this.setupGlobalData(t2, e2), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t2;
          var r2 = createNS("clipPath"), i2 = createNS("rect");
          i2.setAttribute("width", t2.w), i2.setAttribute("height", t2.h), i2.setAttribute("x", 0), i2.setAttribute("y", 0);
          var s2 = createElementID();
          r2.setAttribute("id", s2), r2.appendChild(i2), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s2 + ")"), e2.appendChild(r2), this.layers = t2.layers, this.elements = createSizedArray(t2.layers.length);
        }, SVGRenderer.prototype.destroy = function() {
          this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
          var t2, e2 = this.layers ? this.layers.length : 0;
          for (t2 = 0; t2 < e2; t2++)
            this.elements[t2] && this.elements[t2].destroy();
          this.elements.length = 0, this.destroyed = true, this.animationItem = null;
        }, SVGRenderer.prototype.updateContainerSize = function() {
        }, SVGRenderer.prototype.buildItem = function(t2) {
          var e2 = this.elements;
          if (!e2[t2] && 99 != this.layers[t2].ty) {
            e2[t2] = true;
            var r2 = this.createItem(this.layers[t2]);
            e2[t2] = r2, expressionsPlugin && (0 === this.layers[t2].ty && this.globalData.projectInterface.registerComposition(r2), r2.initExpressions()), this.appendElementInPos(r2, t2), this.layers[t2].tt && (this.elements[t2 - 1] && true !== this.elements[t2 - 1] ? r2.setMatte(e2[t2 - 1].layerId) : (this.buildItem(t2 - 1), this.addPendingElement(r2)));
          }
        }, SVGRenderer.prototype.checkPendingElements = function() {
          for (; this.pendingElements.length; ) {
            var t2 = this.pendingElements.pop();
            if (t2.checkParenting(), t2.data.tt)
              for (var e2 = 0, r2 = this.elements.length; e2 < r2; ) {
                if (this.elements[e2] === t2) {
                  t2.setMatte(this.elements[e2 - 1].layerId);
                  break;
                }
                e2 += 1;
              }
          }
        }, SVGRenderer.prototype.renderFrame = function(t2) {
          if (this.renderedFrame !== t2 && !this.destroyed) {
            null === t2 ? t2 = this.renderedFrame : this.renderedFrame = t2, this.globalData.frameNum = t2, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t2, this.globalData._mdf = false;
            var e2, r2 = this.layers.length;
            for (this.completeLayers || this.checkLayers(t2), e2 = r2 - 1; e2 >= 0; e2--)
              (this.completeLayers || this.elements[e2]) && this.elements[e2].prepareFrame(t2 - this.layers[e2].st);
            if (this.globalData._mdf)
              for (e2 = 0; e2 < r2; e2 += 1)
                (this.completeLayers || this.elements[e2]) && this.elements[e2].renderFrame();
          }
        }, SVGRenderer.prototype.appendElementInPos = function(t2, e2) {
          var r2 = t2.getBaseElement();
          if (r2) {
            for (var i2, s2 = 0; s2 < e2; )
              this.elements[s2] && true !== this.elements[s2] && this.elements[s2].getBaseElement() && (i2 = this.elements[s2].getBaseElement()), s2 += 1;
            i2 ? this.layerElement.insertBefore(r2, i2) : this.layerElement.appendChild(r2);
          }
        }, SVGRenderer.prototype.hide = function() {
          this.layerElement.style.display = "none";
        }, SVGRenderer.prototype.show = function() {
          this.layerElement.style.display = "block";
        }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function(t2) {
          return new CVShapeElement(t2, this.globalData, this);
        }, CanvasRenderer.prototype.createText = function(t2) {
          return new CVTextElement(t2, this.globalData, this);
        }, CanvasRenderer.prototype.createImage = function(t2) {
          return new CVImageElement(t2, this.globalData, this);
        }, CanvasRenderer.prototype.createComp = function(t2) {
          return new CVCompElement(t2, this.globalData, this);
        }, CanvasRenderer.prototype.createSolid = function(t2) {
          return new CVSolidElement(t2, this.globalData, this);
        }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function(t2) {
          if (1 !== t2[0] || 0 !== t2[1] || 0 !== t2[4] || 1 !== t2[5] || 0 !== t2[12] || 0 !== t2[13])
            if (this.renderConfig.clearCanvas) {
              this.transformMat.cloneFromProps(t2);
              var e2 = this.contextData.cTr.props;
              this.transformMat.transform(e2[0], e2[1], e2[2], e2[3], e2[4], e2[5], e2[6], e2[7], e2[8], e2[9], e2[10], e2[11], e2[12], e2[13], e2[14], e2[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
              var r2 = this.contextData.cTr.props;
              this.canvasContext.setTransform(r2[0], r2[1], r2[4], r2[5], r2[12], r2[13]);
            } else
              this.canvasContext.transform(t2[0], t2[1], t2[4], t2[5], t2[12], t2[13]);
        }, CanvasRenderer.prototype.ctxOpacity = function(t2) {
          if (!this.renderConfig.clearCanvas)
            return this.canvasContext.globalAlpha *= t2 < 0 ? 0 : t2, void (this.globalData.currentGlobalAlpha = this.contextData.cO);
          this.contextData.cO *= t2 < 0 ? 0 : t2, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO);
        }, CanvasRenderer.prototype.reset = function() {
          this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore();
        }, CanvasRenderer.prototype.save = function(t2) {
          if (this.renderConfig.clearCanvas) {
            t2 && this.canvasContext.save();
            var e2 = this.contextData.cTr.props;
            this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
            var r2, i2 = this.contextData.saved[this.contextData.cArrPos];
            for (r2 = 0; r2 < 16; r2 += 1)
              i2[r2] = e2[r2];
            this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1;
          } else
            this.canvasContext.save();
        }, CanvasRenderer.prototype.restore = function(t2) {
          if (this.renderConfig.clearCanvas) {
            t2 && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
            var e2, r2 = this.contextData.saved[this.contextData.cArrPos], i2 = this.contextData.cTr.props;
            for (e2 = 0; e2 < 16; e2 += 1)
              i2[e2] = r2[e2];
            this.canvasContext.setTransform(r2[0], r2[1], r2[4], r2[5], r2[12], r2[13]), r2 = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = r2, this.globalData.currentGlobalAlpha !== r2 && (this.canvasContext.globalAlpha = r2, this.globalData.currentGlobalAlpha = r2);
          } else
            this.canvasContext.restore();
        }, CanvasRenderer.prototype.configAnimation = function(t2) {
          this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className)) : this.canvasContext = this.renderConfig.context, this.data = t2, this.layers = t2.layers, this.transformCanvas = { w: t2.w, h: t2.h, sx: 0, sy: 0, tx: 0, ty: 0 }, this.setupGlobalData(t2, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = false, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t2.layers.length), this.updateContainerSize();
        }, CanvasRenderer.prototype.updateContainerSize = function() {
          var t2, e2, r2, i2;
          if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t2 = this.animationItem.wrapper.offsetWidth, e2 = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t2 * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e2 * this.renderConfig.dpr)) : (t2 = this.canvasContext.canvas.width * this.renderConfig.dpr, e2 = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
            var s2 = this.renderConfig.preserveAspectRatio.split(" "), a2 = s2[1] || "meet", n2 = s2[0] || "xMidYMid", o2 = n2.substr(0, 4), h2 = n2.substr(4);
            r2 = t2 / e2, (i2 = this.transformCanvas.w / this.transformCanvas.h) > r2 && "meet" === a2 || i2 < r2 && "slice" === a2 ? (this.transformCanvas.sx = t2 / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t2 / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e2 / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e2 / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o2 && (i2 < r2 && "meet" === a2 || i2 > r2 && "slice" === a2) ? (t2 - this.transformCanvas.w * (e2 / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o2 && (i2 < r2 && "meet" === a2 || i2 > r2 && "slice" === a2) ? (t2 - this.transformCanvas.w * (e2 / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h2 && (i2 > r2 && "meet" === a2 || i2 < r2 && "slice" === a2) ? (e2 - this.transformCanvas.h * (t2 / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h2 && (i2 > r2 && "meet" === a2 || i2 < r2 && "slice" === a2) ? (e2 - this.transformCanvas.h * (t2 / this.transformCanvas.w)) * this.renderConfig.dpr : 0;
          } else
            "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t2 / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e2 / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
          this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, true);
        }, CanvasRenderer.prototype.destroy = function() {
          var t2;
          for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""), t2 = (this.layers ? this.layers.length : 0) - 1; t2 >= 0; t2 -= 1)
            this.elements[t2] && this.elements[t2].destroy();
          this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = true;
        }, CanvasRenderer.prototype.renderFrame = function(t2, e2) {
          if ((this.renderedFrame !== t2 || true !== this.renderConfig.clearCanvas || e2) && !this.destroyed && -1 !== t2) {
            this.renderedFrame = t2, this.globalData.frameNum = t2 - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e2, this.globalData.projectInterface.currentFrame = t2;
            var r2, i2 = this.layers.length;
            for (this.completeLayers || this.checkLayers(t2), r2 = 0; r2 < i2; r2++)
              (this.completeLayers || this.elements[r2]) && this.elements[r2].prepareFrame(t2 - this.layers[r2].st);
            if (this.globalData._mdf) {
              for (true === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r2 = i2 - 1; r2 >= 0; r2 -= 1)
                (this.completeLayers || this.elements[r2]) && this.elements[r2].renderFrame();
              true !== this.renderConfig.clearCanvas && this.restore();
            }
          }
        }, CanvasRenderer.prototype.buildItem = function(t2) {
          var e2 = this.elements;
          if (!e2[t2] && 99 != this.layers[t2].ty) {
            var r2 = this.createItem(this.layers[t2], this, this.globalData);
            e2[t2] = r2, r2.initExpressions();
          }
        }, CanvasRenderer.prototype.checkPendingElements = function() {
          for (; this.pendingElements.length; ) {
            this.pendingElements.pop().checkParenting();
          }
        }, CanvasRenderer.prototype.hide = function() {
          this.animationItem.container.style.display = "none";
        }, CanvasRenderer.prototype.show = function() {
          this.animationItem.container.style.display = "block";
        }, MaskElement.prototype.getMaskProperty = function(t2) {
          return this.viewData[t2].prop;
        }, MaskElement.prototype.renderFrame = function(t2) {
          var e2, r2 = this.element.finalTransform.mat, i2 = this.masksProperties.length;
          for (e2 = 0; e2 < i2; e2++)
            if ((this.viewData[e2].prop._mdf || t2) && this.drawPath(this.masksProperties[e2], this.viewData[e2].prop.v, this.viewData[e2]), (this.viewData[e2].op._mdf || t2) && this.viewData[e2].elem.setAttribute("fill-opacity", this.viewData[e2].op.v), "n" !== this.masksProperties[e2].mode && (this.viewData[e2].invRect && (this.element.finalTransform.mProp._mdf || t2) && (this.viewData[e2].invRect.setAttribute("x", -r2.props[12]), this.viewData[e2].invRect.setAttribute("y", -r2.props[13])), this.storedData[e2].x && (this.storedData[e2].x._mdf || t2))) {
              var s2 = this.storedData[e2].expan;
              this.storedData[e2].x.v < 0 ? ("erode" !== this.storedData[e2].lastOperator && (this.storedData[e2].lastOperator = "erode", this.storedData[e2].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e2].filterId + ")")), s2.setAttribute("radius", -this.storedData[e2].x.v)) : ("dilate" !== this.storedData[e2].lastOperator && (this.storedData[e2].lastOperator = "dilate", this.storedData[e2].elem.setAttribute("filter", null)), this.storedData[e2].elem.setAttribute("stroke-width", 2 * this.storedData[e2].x.v));
            }
        }, MaskElement.prototype.getMaskelement = function() {
          return this.maskElement;
        }, MaskElement.prototype.createLayerSolidPath = function() {
          var t2 = "M0,0 ";
          return t2 += " h" + this.globalData.compSize.w, t2 += " v" + this.globalData.compSize.h, t2 += " h-" + this.globalData.compSize.w, t2 += " v-" + this.globalData.compSize.h + " ";
        }, MaskElement.prototype.drawPath = function(t2, e2, r2) {
          var i2, s2, a2 = " M" + e2.v[0][0] + "," + e2.v[0][1];
          for (s2 = e2._length, i2 = 1; i2 < s2; i2 += 1)
            a2 += " C" + e2.o[i2 - 1][0] + "," + e2.o[i2 - 1][1] + " " + e2.i[i2][0] + "," + e2.i[i2][1] + " " + e2.v[i2][0] + "," + e2.v[i2][1];
          if (e2.c && s2 > 1 && (a2 += " C" + e2.o[i2 - 1][0] + "," + e2.o[i2 - 1][1] + " " + e2.i[0][0] + "," + e2.i[0][1] + " " + e2.v[0][0] + "," + e2.v[0][1]), r2.lastPath !== a2) {
            var n2 = "";
            r2.elem && (e2.c && (n2 = t2.inv ? this.solidPath + a2 : a2), r2.elem.setAttribute("d", n2)), r2.lastPath = a2;
          }
        }, MaskElement.prototype.destroy = function() {
          this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
        }, HierarchyElement.prototype = { initHierarchy: function() {
          this.hierarchy = [], this._isParent = false, this.checkParenting();
        }, setHierarchy: function(t2) {
          this.hierarchy = t2;
        }, setAsParent: function() {
          this._isParent = true;
        }, checkParenting: function() {
          void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
        } }, FrameElement.prototype = { initFrame: function() {
          this._isFirstFrame = false, this.dynamicProperties = [], this._mdf = false;
        }, prepareProperties: function(t2, e2) {
          var r2, i2 = this.dynamicProperties.length;
          for (r2 = 0; r2 < i2; r2 += 1)
            (e2 || this._isParent && "transform" === this.dynamicProperties[r2].propType) && (this.dynamicProperties[r2].getValue(), this.dynamicProperties[r2]._mdf && (this.globalData._mdf = true, this._mdf = true));
        }, addDynamicProperty: function(t2) {
          -1 === this.dynamicProperties.indexOf(t2) && this.dynamicProperties.push(t2);
        } }, TransformElement.prototype = { initTransform: function() {
          this.finalTransform = { mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : { o: 0 }, _matMdf: false, _opMdf: false, mat: new Matrix() }, this.data.ao && (this.finalTransform.mProp.autoOriented = true), this.data.ty;
        }, renderTransform: function() {
          if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
            var t2, e2 = this.finalTransform.mat, r2 = 0, i2 = this.hierarchy.length;
            if (!this.finalTransform._matMdf)
              for (; r2 < i2; ) {
                if (this.hierarchy[r2].finalTransform.mProp._mdf) {
                  this.finalTransform._matMdf = true;
                  break;
                }
                r2 += 1;
              }
            if (this.finalTransform._matMdf)
              for (t2 = this.finalTransform.mProp.v.props, e2.cloneFromProps(t2), r2 = 0; r2 < i2; r2 += 1)
                t2 = this.hierarchy[r2].finalTransform.mProp.v.props, e2.transform(t2[0], t2[1], t2[2], t2[3], t2[4], t2[5], t2[6], t2[7], t2[8], t2[9], t2[10], t2[11], t2[12], t2[13], t2[14], t2[15]);
          }
        }, globalToLocal: function(t2) {
          var e2 = [];
          e2.push(this.finalTransform);
          for (var r2 = true, i2 = this.comp; r2; )
            i2.finalTransform ? (i2.data.hasMask && e2.splice(0, 0, i2.finalTransform), i2 = i2.comp) : r2 = false;
          var s2, a2, n2 = e2.length;
          for (s2 = 0; s2 < n2; s2 += 1)
            a2 = e2[s2].mat.applyToPointArray(0, 0, 0), t2 = [t2[0] - a2[0], t2[1] - a2[1], 0];
          return t2;
        }, mHelper: new Matrix() }, RenderableElement.prototype = { initRenderable: function() {
          this.isInRange = false, this.hidden = false, this.isTransparent = false, this.renderableComponents = [];
        }, addRenderableComponent: function(t2) {
          -1 === this.renderableComponents.indexOf(t2) && this.renderableComponents.push(t2);
        }, removeRenderableComponent: function(t2) {
          -1 !== this.renderableComponents.indexOf(t2) && this.renderableComponents.splice(this.renderableComponents.indexOf(t2), 1);
        }, prepareRenderableFrame: function(t2) {
          this.checkLayerLimits(t2);
        }, checkTransparency: function() {
          this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = true, this.hide()) : this.isTransparent && (this.isTransparent = false, this.show());
        }, checkLayerLimits: function(t2) {
          this.data.ip - this.data.st <= t2 && this.data.op - this.data.st > t2 ? true !== this.isInRange && (this.globalData._mdf = true, this._mdf = true, this.isInRange = true, this.show()) : false !== this.isInRange && (this.globalData._mdf = true, this.isInRange = false, this.hide());
        }, renderRenderable: function() {
          var t2, e2 = this.renderableComponents.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.renderableComponents[t2].renderFrame(this._isFirstFrame);
        }, sourceRectAtTime: function() {
          return { top: 0, left: 0, width: 100, height: 100 };
        }, getLayerSize: function() {
          return 5 === this.data.ty ? { w: this.data.textData.width, h: this.data.textData.height } : { w: this.data.width, h: this.data.height };
        } }, extendPrototype([RenderableElement, createProxyFunction({ initElement: function(t2, e2, r2) {
          this.initFrame(), this.initBaseData(t2, e2, r2), this.initTransform(t2, e2, r2), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
        }, hide: function() {
          this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = true);
        }, show: function() {
          this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = false, this._isFirstFrame = true);
        }, renderFrame: function() {
          this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = false));
        }, renderInnerContent: function() {
        }, prepareFrame: function(t2) {
          this._mdf = false, this.prepareRenderableFrame(t2), this.prepareProperties(t2, this.isInRange), this.checkTransparency();
        }, destroy: function() {
          this.innerElem = null, this.destroyBaseElement();
        } })], RenderableDOMElement), SVGShapeData.prototype.setAsAnimated = function() {
          this._isAnimated = true;
        }, ShapeTransformManager.prototype = { addTransformSequence: function(t2) {
          var e2, r2 = t2.length, i2 = "_";
          for (e2 = 0; e2 < r2; e2 += 1)
            i2 += t2[e2].transform.key + "_";
          var s2 = this.sequences[i2];
          return s2 || (s2 = { transforms: [].concat(t2), finalTransform: new Matrix(), _mdf: false }, this.sequences[i2] = s2, this.sequenceList.push(s2)), s2;
        }, processSequence: function(t2, e2) {
          for (var r2, i2 = 0, s2 = t2.transforms.length, a2 = e2; i2 < s2 && !e2; ) {
            if (t2.transforms[i2].transform.mProps._mdf) {
              a2 = true;
              break;
            }
            i2 += 1;
          }
          if (a2)
            for (t2.finalTransform.reset(), i2 = s2 - 1; i2 >= 0; i2 -= 1)
              r2 = t2.transforms[i2].transform.mProps.v.props, t2.finalTransform.transform(r2[0], r2[1], r2[2], r2[3], r2[4], r2[5], r2[6], r2[7], r2[8], r2[9], r2[10], r2[11], r2[12], r2[13], r2[14], r2[15]);
          t2._mdf = a2;
        }, processSequences: function(t2) {
          var e2, r2 = this.sequenceList.length;
          for (e2 = 0; e2 < r2; e2 += 1)
            this.processSequence(this.sequenceList[e2], t2);
        }, getNewKey: function() {
          return "_" + this.transform_key_count++;
        } }, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = { checkMasks: function() {
          if (!this.data.hasMask)
            return false;
          for (var t2 = 0, e2 = this.data.masksProperties.length; t2 < e2; ) {
            if ("n" !== this.data.masksProperties[t2].mode && false !== this.data.masksProperties[t2].cl)
              return true;
            t2 += 1;
          }
          return false;
        }, initExpressions: function() {
          this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
          var t2 = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
          this.layerInterface.registerEffectsInterface(t2), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface);
        }, setBlendMode: function() {
          var t2 = getBlendMode(this.data.bm);
          (this.baseElement || this.layerElement).style["mix-blend-mode"] = t2;
        }, initBaseData: function(t2, e2, r2) {
          this.globalData = e2, this.comp = r2, this.data = t2, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
        }, getType: function() {
          return this.type;
        }, sourceRectAtTime: function() {
        } }, NullElement.prototype.prepareFrame = function(t2) {
          this.prepareProperties(t2, true);
        }, NullElement.prototype.renderFrame = function() {
        }, NullElement.prototype.getBaseElement = function() {
          return null;
        }, NullElement.prototype.destroy = function() {
        }, NullElement.prototype.sourceRectAtTime = function() {
        }, NullElement.prototype.hide = function() {
        }, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = { initRendererElement: function() {
          this.layerElement = createNS("g");
        }, createContainerElements: function() {
          this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = false;
          var t2, e2, r2, i2 = null;
          if (this.data.td) {
            if (3 == this.data.td || 1 == this.data.td) {
              var s2 = createNS("mask");
              s2.setAttribute("id", this.layerId), s2.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s2.appendChild(this.layerElement), i2 = s2, this.globalData.defs.appendChild(s2), featureSupport.maskType || 1 != this.data.td || (s2.setAttribute("mask-type", "luminance"), t2 = createElementID(), e2 = filtersFactory.createFilter(t2), this.globalData.defs.appendChild(e2), e2.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r2 = createNS("g")).appendChild(this.layerElement), i2 = r2, s2.appendChild(r2), r2.setAttribute("filter", "url(" + locationHref + "#" + t2 + ")"));
            } else if (2 == this.data.td) {
              var a2 = createNS("mask");
              a2.setAttribute("id", this.layerId), a2.setAttribute("mask-type", "alpha");
              var n2 = createNS("g");
              a2.appendChild(n2), t2 = createElementID(), e2 = filtersFactory.createFilter(t2);
              var o2 = createNS("feComponentTransfer");
              o2.setAttribute("in", "SourceGraphic"), e2.appendChild(o2);
              var h2 = createNS("feFuncA");
              h2.setAttribute("type", "table"), h2.setAttribute("tableValues", "1.0 0.0"), o2.appendChild(h2), this.globalData.defs.appendChild(e2);
              var l2 = createNS("rect");
              l2.setAttribute("width", this.comp.data.w), l2.setAttribute("height", this.comp.data.h), l2.setAttribute("x", "0"), l2.setAttribute("y", "0"), l2.setAttribute("fill", "#ffffff"), l2.setAttribute("opacity", "0"), n2.setAttribute("filter", "url(" + locationHref + "#" + t2 + ")"), n2.appendChild(l2), n2.appendChild(this.layerElement), i2 = n2, featureSupport.maskType || (a2.setAttribute("mask-type", "luminance"), e2.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r2 = createNS("g"), n2.appendChild(l2), r2.appendChild(this.layerElement), i2 = r2, n2.appendChild(r2)), this.globalData.defs.appendChild(a2);
            }
          } else
            this.data.tt ? (this.matteElement.appendChild(this.layerElement), i2 = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
          if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
            var p2 = createNS("clipPath"), f2 = createNS("path");
            f2.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
            var m2 = createElementID();
            if (p2.setAttribute("id", m2), p2.appendChild(f2), this.globalData.defs.appendChild(p2), this.checkMasks()) {
              var c2 = createNS("g");
              c2.setAttribute("clip-path", "url(" + locationHref + "#" + m2 + ")"), c2.appendChild(this.layerElement), this.transformedElement = c2, i2 ? i2.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
            } else
              this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + m2 + ")");
          }
          0 !== this.data.bm && this.setBlendMode();
        }, renderElement: function() {
          this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v);
        }, destroyBaseElement: function() {
          this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
        }, getBaseElement: function() {
          return this.data.hd ? null : this.baseElement;
        }, createRenderableComponents: function() {
          this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this);
        }, setMatte: function(t2) {
          this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t2 + ")");
        } }, IShapeElement.prototype = { addShapeToModifiers: function(t2) {
          var e2, r2 = this.shapeModifiers.length;
          for (e2 = 0; e2 < r2; e2 += 1)
            this.shapeModifiers[e2].addShape(t2);
        }, isShapeInAnimatedModifiers: function(t2) {
          for (var e2 = this.shapeModifiers.length; 0 < e2; )
            if (this.shapeModifiers[0].isAnimatedWithShape(t2))
              return true;
          return false;
        }, renderModifiers: function() {
          if (this.shapeModifiers.length) {
            var t2, e2 = this.shapes.length;
            for (t2 = 0; t2 < e2; t2 += 1)
              this.shapes[t2].sh.reset();
            for (t2 = (e2 = this.shapeModifiers.length) - 1; t2 >= 0; t2 -= 1)
              this.shapeModifiers[t2].processShapes(this._isFirstFrame);
          }
        }, lcEnum: { 1: "butt", 2: "round", 3: "square" }, ljEnum: { 1: "miter", 2: "round", 3: "bevel" }, searchProcessedElement: function(t2) {
          for (var e2 = this.processedElements, r2 = 0, i2 = e2.length; r2 < i2; ) {
            if (e2[r2].elem === t2)
              return e2[r2].pos;
            r2 += 1;
          }
          return 0;
        }, addProcessedElement: function(t2, e2) {
          for (var r2 = this.processedElements, i2 = r2.length; i2; )
            if (r2[i2 -= 1].elem === t2)
              return void (r2[i2].pos = e2);
          r2.push(new ProcessedElement(t2, e2));
        }, prepareFrame: function(t2) {
          this.prepareRenderableFrame(t2), this.prepareProperties(t2, this.isInRange);
        } }, ITextElement.prototype.initElement = function(t2, e2, r2) {
          this.lettersChangedFlag = true, this.initFrame(), this.initBaseData(t2, e2, r2), this.textProperty = new TextProperty(this, t2.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t2.t, this.renderType, this), this.initTransform(t2, e2, r2), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
        }, ITextElement.prototype.prepareFrame = function(t2) {
          this._mdf = false, this.prepareRenderableFrame(t2), this.prepareProperties(t2, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = false, this.textProperty._mdf = false);
        }, ITextElement.prototype.createPathShape = function(t2, e2) {
          var r2, i2, s2 = e2.length, a2 = "";
          for (r2 = 0; r2 < s2; r2 += 1)
            i2 = e2[r2].ks.k, a2 += buildShapeString(i2, i2.i.length, true, t2);
          return a2;
        }, ITextElement.prototype.updateDocumentData = function(t2, e2) {
          this.textProperty.updateDocumentData(t2, e2);
        }, ITextElement.prototype.canResizeFont = function(t2) {
          this.textProperty.canResizeFont(t2);
        }, ITextElement.prototype.setMinimumFontSize = function(t2) {
          this.textProperty.setMinimumFontSize(t2);
        }, ITextElement.prototype.applyTextPropertiesToMatrix = function(t2, e2, r2, i2, s2) {
          switch (t2.ps && e2.translate(t2.ps[0], t2.ps[1] + t2.ascent, 0), e2.translate(0, -t2.ls, 0), t2.j) {
            case 1:
              e2.translate(t2.justifyOffset + (t2.boxWidth - t2.lineWidths[r2]), 0, 0);
              break;
            case 2:
              e2.translate(t2.justifyOffset + (t2.boxWidth - t2.lineWidths[r2]) / 2, 0, 0);
          }
          e2.translate(i2, s2, 0);
        }, ITextElement.prototype.buildColor = function(t2) {
          return "rgb(" + Math.round(255 * t2[0]) + "," + Math.round(255 * t2[1]) + "," + Math.round(255 * t2[2]) + ")";
        }, ITextElement.prototype.emptyProp = new LetterProps(), ITextElement.prototype.destroy = function() {
        }, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function(t2, e2, r2) {
          this.initFrame(), this.initBaseData(t2, e2, r2), this.initTransform(t2, e2, r2), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e2.progressiveLoad || this.buildAllItems(), this.hide();
        }, ICompElement.prototype.prepareFrame = function(t2) {
          if (this._mdf = false, this.prepareRenderableFrame(t2), this.prepareProperties(t2, this.isInRange), this.isInRange || this.data.xt) {
            if (this.tm._placeholder)
              this.renderedFrame = t2 / this.data.sr;
            else {
              var e2 = this.tm.v;
              e2 === this.data.op && (e2 = this.data.op - 1), this.renderedFrame = e2;
            }
            var r2, i2 = this.elements.length;
            for (this.completeLayers || this.checkLayers(this.renderedFrame), r2 = i2 - 1; r2 >= 0; r2 -= 1)
              (this.completeLayers || this.elements[r2]) && (this.elements[r2].prepareFrame(this.renderedFrame - this.layers[r2].st), this.elements[r2]._mdf && (this._mdf = true));
          }
        }, ICompElement.prototype.renderInnerContent = function() {
          var t2, e2 = this.layers.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            (this.completeLayers || this.elements[t2]) && this.elements[t2].renderFrame();
        }, ICompElement.prototype.setElements = function(t2) {
          this.elements = t2;
        }, ICompElement.prototype.getElements = function() {
          return this.elements;
        }, ICompElement.prototype.destroyElements = function() {
          var t2, e2 = this.layers.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.elements[t2] && this.elements[t2].destroy();
        }, ICompElement.prototype.destroy = function() {
          this.destroyElements(), this.destroyBaseElement();
        }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function() {
          var t2 = this.globalData.getAssetsPath(this.assetData);
          this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t2), this.layerElement.appendChild(this.innerElem);
        }, IImageElement.prototype.sourceRectAtTime = function() {
          return this.sourceRect;
        }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function() {
          var t2 = createNS("rect");
          t2.setAttribute("width", this.data.sw), t2.setAttribute("height", this.data.sh), t2.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t2);
        }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function() {
        }, SVGShapeElement.prototype.identityMatrix = new Matrix(), SVGShapeElement.prototype.buildExpressionInterface = function() {
        }, SVGShapeElement.prototype.createContent = function() {
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true), this.filterUniqueShapes();
        }, SVGShapeElement.prototype.filterUniqueShapes = function() {
          var t2, e2, r2, i2, s2 = this.shapes.length, a2 = this.stylesList.length, n2 = [], o2 = false;
          for (r2 = 0; r2 < a2; r2 += 1) {
            for (i2 = this.stylesList[r2], o2 = false, n2.length = 0, t2 = 0; t2 < s2; t2 += 1)
              -1 !== (e2 = this.shapes[t2]).styles.indexOf(i2) && (n2.push(e2), o2 = e2._isAnimated || o2);
            n2.length > 1 && o2 && this.setShapesAsAnimated(n2);
          }
        }, SVGShapeElement.prototype.setShapesAsAnimated = function(t2) {
          var e2, r2 = t2.length;
          for (e2 = 0; e2 < r2; e2 += 1)
            t2[e2].setAsAnimated();
        }, SVGShapeElement.prototype.createStyleElement = function(t2, e2) {
          var r2, i2 = new SVGStyleData(t2, e2), s2 = i2.pElem;
          if ("st" === t2.ty)
            r2 = new SVGStrokeStyleData(this, t2, i2);
          else if ("fl" === t2.ty)
            r2 = new SVGFillStyleData(this, t2, i2);
          else if ("gf" === t2.ty || "gs" === t2.ty) {
            r2 = new ("gf" === t2.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t2, i2), this.globalData.defs.appendChild(r2.gf), r2.maskId && (this.globalData.defs.appendChild(r2.ms), this.globalData.defs.appendChild(r2.of), s2.setAttribute("mask", "url(" + locationHref + "#" + r2.maskId + ")"));
          }
          return "st" !== t2.ty && "gs" !== t2.ty || (s2.setAttribute("stroke-linecap", this.lcEnum[t2.lc] || "round"), s2.setAttribute("stroke-linejoin", this.ljEnum[t2.lj] || "round"), s2.setAttribute("fill-opacity", "0"), 1 === t2.lj && s2.setAttribute("stroke-miterlimit", t2.ml)), 2 === t2.r && s2.setAttribute("fill-rule", "evenodd"), t2.ln && s2.setAttribute("id", t2.ln), t2.cl && s2.setAttribute("class", t2.cl), t2.bm && (s2.style["mix-blend-mode"] = getBlendMode(t2.bm)), this.stylesList.push(i2), this.addToAnimatedContents(t2, r2), r2;
        }, SVGShapeElement.prototype.createGroupElement = function(t2) {
          var e2 = new ShapeGroupData();
          return t2.ln && e2.gr.setAttribute("id", t2.ln), t2.cl && e2.gr.setAttribute("class", t2.cl), t2.bm && (e2.gr.style["mix-blend-mode"] = getBlendMode(t2.bm)), e2;
        }, SVGShapeElement.prototype.createTransformElement = function(t2, e2) {
          var r2 = TransformPropertyFactory.getTransformProperty(this, t2, this), i2 = new SVGTransformData(r2, r2.o, e2);
          return this.addToAnimatedContents(t2, i2), i2;
        }, SVGShapeElement.prototype.createShapeElement = function(t2, e2, r2) {
          var i2 = 4;
          "rc" === t2.ty ? i2 = 5 : "el" === t2.ty ? i2 = 6 : "sr" === t2.ty && (i2 = 7);
          var s2 = new SVGShapeData(e2, r2, ShapePropertyFactory.getShapeProp(this, t2, i2, this));
          return this.shapes.push(s2), this.addShapeToModifiers(s2), this.addToAnimatedContents(t2, s2), s2;
        }, SVGShapeElement.prototype.addToAnimatedContents = function(t2, e2) {
          for (var r2 = 0, i2 = this.animatedContents.length; r2 < i2; ) {
            if (this.animatedContents[r2].element === e2)
              return;
            r2 += 1;
          }
          this.animatedContents.push({ fn: SVGElementsRenderer.createRenderFunction(t2), element: e2, data: t2 });
        }, SVGShapeElement.prototype.setElementStyles = function(t2) {
          var e2, r2 = t2.styles, i2 = this.stylesList.length;
          for (e2 = 0; e2 < i2; e2 += 1)
            this.stylesList[e2].closed || r2.push(this.stylesList[e2]);
        }, SVGShapeElement.prototype.reloadShapes = function() {
          this._isFirstFrame = true;
          var t2, e2 = this.itemsData.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.prevViewData[t2] = this.itemsData[t2];
          for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true), this.filterUniqueShapes(), e2 = this.dynamicProperties.length, t2 = 0; t2 < e2; t2 += 1)
            this.dynamicProperties[t2].getValue();
          this.renderModifiers();
        }, SVGShapeElement.prototype.searchShapes = function(t2, e2, r2, i2, s2, a2, n2) {
          var o2, h2, l2, p2, f2, m2, c2 = [].concat(a2), d2 = t2.length - 1, u2 = [], y2 = [];
          for (o2 = d2; o2 >= 0; o2 -= 1) {
            if ((m2 = this.searchProcessedElement(t2[o2])) ? e2[o2] = r2[m2 - 1] : t2[o2]._render = n2, "fl" == t2[o2].ty || "st" == t2[o2].ty || "gf" == t2[o2].ty || "gs" == t2[o2].ty)
              m2 ? e2[o2].style.closed = false : e2[o2] = this.createStyleElement(t2[o2], s2), t2[o2]._render && i2.appendChild(e2[o2].style.pElem), u2.push(e2[o2].style);
            else if ("gr" == t2[o2].ty) {
              if (m2)
                for (l2 = e2[o2].it.length, h2 = 0; h2 < l2; h2 += 1)
                  e2[o2].prevViewData[h2] = e2[o2].it[h2];
              else
                e2[o2] = this.createGroupElement(t2[o2]);
              this.searchShapes(t2[o2].it, e2[o2].it, e2[o2].prevViewData, e2[o2].gr, s2 + 1, c2, n2), t2[o2]._render && i2.appendChild(e2[o2].gr);
            } else
              "tr" == t2[o2].ty ? (m2 || (e2[o2] = this.createTransformElement(t2[o2], i2)), p2 = e2[o2].transform, c2.push(p2)) : "sh" == t2[o2].ty || "rc" == t2[o2].ty || "el" == t2[o2].ty || "sr" == t2[o2].ty ? (m2 || (e2[o2] = this.createShapeElement(t2[o2], c2, s2)), this.setElementStyles(e2[o2])) : "tm" == t2[o2].ty || "rd" == t2[o2].ty || "ms" == t2[o2].ty ? (m2 ? (f2 = e2[o2]).closed = false : ((f2 = ShapeModifiers.getModifier(t2[o2].ty)).init(this, t2[o2]), e2[o2] = f2, this.shapeModifiers.push(f2)), y2.push(f2)) : "rp" == t2[o2].ty && (m2 ? (f2 = e2[o2]).closed = true : (f2 = ShapeModifiers.getModifier(t2[o2].ty), e2[o2] = f2, f2.init(this, t2, o2, e2), this.shapeModifiers.push(f2), n2 = false), y2.push(f2));
            this.addProcessedElement(t2[o2], o2 + 1);
          }
          for (d2 = u2.length, o2 = 0; o2 < d2; o2 += 1)
            u2[o2].closed = true;
          for (d2 = y2.length, o2 = 0; o2 < d2; o2 += 1)
            y2[o2].closed = true;
        }, SVGShapeElement.prototype.renderInnerContent = function() {
          this.renderModifiers();
          var t2, e2 = this.stylesList.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.stylesList[t2].reset();
          for (this.renderShape(), t2 = 0; t2 < e2; t2 += 1)
            (this.stylesList[t2]._mdf || this._isFirstFrame) && (this.stylesList[t2].msElem && (this.stylesList[t2].msElem.setAttribute("d", this.stylesList[t2].d), this.stylesList[t2].d = "M0 0" + this.stylesList[t2].d), this.stylesList[t2].pElem.setAttribute("d", this.stylesList[t2].d || "M0 0"));
        }, SVGShapeElement.prototype.renderShape = function() {
          var t2, e2, r2 = this.animatedContents.length;
          for (t2 = 0; t2 < r2; t2 += 1)
            e2 = this.animatedContents[t2], (this._isFirstFrame || e2.element._isAnimated) && true !== e2.data && e2.fn(e2.data, e2.element, this._isFirstFrame);
        }, SVGShapeElement.prototype.destroy = function() {
          this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
        }, CVContextData.prototype.duplicate = function() {
          var t2 = 2 * this._length, e2 = this.savedOp;
          this.savedOp = createTypedArray("float32", t2), this.savedOp.set(e2);
          var r2 = 0;
          for (r2 = this._length; r2 < t2; r2 += 1)
            this.saved[r2] = createTypedArray("float32", 16);
          this._length = t2;
        }, CVContextData.prototype.reset = function() {
          this.cArrPos = 0, this.cTr.reset(), this.cO = 1;
        }, CVBaseElement.prototype = { createElements: function() {
        }, initRendererElement: function() {
        }, createContainerElements: function() {
          this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects();
        }, createContent: function() {
        }, setBlendMode: function() {
          var t2 = this.globalData;
          if (t2.blendMode !== this.data.bm) {
            t2.blendMode = this.data.bm;
            var e2 = getBlendMode(this.data.bm);
            t2.canvasContext.globalCompositeOperation = e2;
          }
        }, createRenderableComponents: function() {
          this.maskManager = new CVMaskElement(this.data, this);
        }, hideElement: function() {
          this.hidden || this.isInRange && !this.isTransparent || (this.hidden = true);
        }, showElement: function() {
          this.isInRange && !this.isTransparent && (this.hidden = false, this._isFirstFrame = true, this.maskManager._isFirstFrame = true);
        }, renderFrame: function() {
          this.hidden || this.data.hd || (this.renderTransform(), this.renderRenderable(), this.setBlendMode(), this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(), this.maskManager.hasMasks && this.globalData.renderer.restore(true), this._isFirstFrame && (this._isFirstFrame = false));
        }, destroy: function() {
          this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy();
        }, mHelper: new Matrix() }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function() {
          if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
            var t2 = createTag("canvas");
            t2.width = this.assetData.w, t2.height = this.assetData.h;
            var e2, r2, i2 = t2.getContext("2d"), s2 = this.img.width, a2 = this.img.height, n2 = s2 / a2, o2 = this.assetData.w / this.assetData.h, h2 = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
            n2 > o2 && "xMidYMid slice" === h2 || n2 < o2 && "xMidYMid slice" !== h2 ? e2 = (r2 = a2) * o2 : r2 = (e2 = s2) / o2, i2.drawImage(this.img, (s2 - e2) / 2, (a2 - r2) / 2, e2, r2, 0, 0, this.assetData.w, this.assetData.h), this.img = t2;
          }
        }, CVImageElement.prototype.renderInnerContent = function(t2) {
          this.canvasContext.drawImage(this.img, 0, 0);
        }, CVImageElement.prototype.destroy = function() {
          this.img = null;
        }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function() {
          var t2;
          for (t2 = this.layers.length - 1; t2 >= 0; t2 -= 1)
            (this.completeLayers || this.elements[t2]) && this.elements[t2].renderFrame();
        }, CVCompElement.prototype.destroy = function() {
          var t2;
          for (t2 = this.layers.length - 1; t2 >= 0; t2 -= 1)
            this.elements[t2] && this.elements[t2].destroy();
          this.layers = null, this.elements = null;
        }, CVMaskElement.prototype.renderFrame = function() {
          if (this.hasMasks) {
            var t2, e2, r2, i2, s2 = this.element.finalTransform.mat, a2 = this.element.canvasContext, n2 = this.masksProperties.length;
            for (a2.beginPath(), t2 = 0; t2 < n2; t2++)
              if ("n" !== this.masksProperties[t2].mode) {
                this.masksProperties[t2].inv && (a2.moveTo(0, 0), a2.lineTo(this.element.globalData.compSize.w, 0), a2.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a2.lineTo(0, this.element.globalData.compSize.h), a2.lineTo(0, 0)), i2 = this.viewData[t2].v, e2 = s2.applyToPointArray(i2.v[0][0], i2.v[0][1], 0), a2.moveTo(e2[0], e2[1]);
                var o2, h2 = i2._length;
                for (o2 = 1; o2 < h2; o2++)
                  r2 = s2.applyToTriplePoints(i2.o[o2 - 1], i2.i[o2], i2.v[o2]), a2.bezierCurveTo(r2[0], r2[1], r2[2], r2[3], r2[4], r2[5]);
                r2 = s2.applyToTriplePoints(i2.o[o2 - 1], i2.i[0], i2.v[0]), a2.bezierCurveTo(r2[0], r2[1], r2[2], r2[3], r2[4], r2[5]);
              }
            this.element.globalData.renderer.save(true), a2.clip();
          }
        }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function() {
          this.element = null;
        }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = { opacity: 1, _opMdf: false }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function() {
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, true, []);
        }, CVShapeElement.prototype.createStyleElement = function(t2, e2) {
          var r2 = { data: t2, type: t2.ty, preTransforms: this.transformsManager.addTransformSequence(e2), transforms: [], elements: [], closed: true === t2.hd }, i2 = {};
          if ("fl" == t2.ty || "st" == t2.ty ? (i2.c = PropertyFactory.getProp(this, t2.c, 1, 255, this), i2.c.k || (r2.co = "rgb(" + bm_floor(i2.c.v[0]) + "," + bm_floor(i2.c.v[1]) + "," + bm_floor(i2.c.v[2]) + ")")) : "gf" !== t2.ty && "gs" !== t2.ty || (i2.s = PropertyFactory.getProp(this, t2.s, 1, null, this), i2.e = PropertyFactory.getProp(this, t2.e, 1, null, this), i2.h = PropertyFactory.getProp(this, t2.h || { k: 0 }, 0, 0.01, this), i2.a = PropertyFactory.getProp(this, t2.a || { k: 0 }, 0, degToRads, this), i2.g = new GradientProperty(this, t2.g, this)), i2.o = PropertyFactory.getProp(this, t2.o, 0, 0.01, this), "st" == t2.ty || "gs" == t2.ty) {
            if (r2.lc = this.lcEnum[t2.lc] || "round", r2.lj = this.ljEnum[t2.lj] || "round", 1 == t2.lj && (r2.ml = t2.ml), i2.w = PropertyFactory.getProp(this, t2.w, 0, null, this), i2.w.k || (r2.wi = i2.w.v), t2.d) {
              var s2 = new DashProperty(this, t2.d, "canvas", this);
              i2.d = s2, i2.d.k || (r2.da = i2.d.dashArray, r2.do = i2.d.dashoffset[0]);
            }
          } else
            r2.r = 2 === t2.r ? "evenodd" : "nonzero";
          return this.stylesList.push(r2), i2.style = r2, i2;
        }, CVShapeElement.prototype.createGroupElement = function(t2) {
          return { it: [], prevViewData: [] };
        }, CVShapeElement.prototype.createTransformElement = function(t2) {
          return { transform: { opacity: 1, _opMdf: false, key: this.transformsManager.getNewKey(), op: PropertyFactory.getProp(this, t2.o, 0, 0.01, this), mProps: TransformPropertyFactory.getTransformProperty(this, t2, this) } };
        }, CVShapeElement.prototype.createShapeElement = function(t2) {
          var e2 = new CVShapeData(this, t2, this.stylesList, this.transformsManager);
          return this.shapes.push(e2), this.addShapeToModifiers(e2), e2;
        }, CVShapeElement.prototype.reloadShapes = function() {
          this._isFirstFrame = true;
          var t2, e2 = this.itemsData.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.prevViewData[t2] = this.itemsData[t2];
          for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, true, []), e2 = this.dynamicProperties.length, t2 = 0; t2 < e2; t2 += 1)
            this.dynamicProperties[t2].getValue();
          this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame);
        }, CVShapeElement.prototype.addTransformToStyleList = function(t2) {
          var e2, r2 = this.stylesList.length;
          for (e2 = 0; e2 < r2; e2 += 1)
            this.stylesList[e2].closed || this.stylesList[e2].transforms.push(t2);
        }, CVShapeElement.prototype.removeTransformFromStyleList = function() {
          var t2, e2 = this.stylesList.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.stylesList[t2].closed || this.stylesList[t2].transforms.pop();
        }, CVShapeElement.prototype.closeStyles = function(t2) {
          var e2, r2 = t2.length;
          for (e2 = 0; e2 < r2; e2 += 1)
            t2[e2].closed = true;
        }, CVShapeElement.prototype.searchShapes = function(t2, e2, r2, i2, s2) {
          var a2, n2, o2, h2, l2, p2, f2 = t2.length - 1, m2 = [], c2 = [], d2 = [].concat(s2);
          for (a2 = f2; a2 >= 0; a2 -= 1) {
            if ((h2 = this.searchProcessedElement(t2[a2])) ? e2[a2] = r2[h2 - 1] : t2[a2]._shouldRender = i2, "fl" == t2[a2].ty || "st" == t2[a2].ty || "gf" == t2[a2].ty || "gs" == t2[a2].ty)
              h2 ? e2[a2].style.closed = false : e2[a2] = this.createStyleElement(t2[a2], d2), m2.push(e2[a2].style);
            else if ("gr" == t2[a2].ty) {
              if (h2)
                for (o2 = e2[a2].it.length, n2 = 0; n2 < o2; n2 += 1)
                  e2[a2].prevViewData[n2] = e2[a2].it[n2];
              else
                e2[a2] = this.createGroupElement(t2[a2]);
              this.searchShapes(t2[a2].it, e2[a2].it, e2[a2].prevViewData, i2, d2);
            } else
              "tr" == t2[a2].ty ? (h2 || (p2 = this.createTransformElement(t2[a2]), e2[a2] = p2), d2.push(e2[a2]), this.addTransformToStyleList(e2[a2])) : "sh" == t2[a2].ty || "rc" == t2[a2].ty || "el" == t2[a2].ty || "sr" == t2[a2].ty ? h2 || (e2[a2] = this.createShapeElement(t2[a2])) : "tm" == t2[a2].ty || "rd" == t2[a2].ty ? (h2 ? (l2 = e2[a2]).closed = false : ((l2 = ShapeModifiers.getModifier(t2[a2].ty)).init(this, t2[a2]), e2[a2] = l2, this.shapeModifiers.push(l2)), c2.push(l2)) : "rp" == t2[a2].ty && (h2 ? (l2 = e2[a2]).closed = true : (l2 = ShapeModifiers.getModifier(t2[a2].ty), e2[a2] = l2, l2.init(this, t2, a2, e2), this.shapeModifiers.push(l2), i2 = false), c2.push(l2));
            this.addProcessedElement(t2[a2], a2 + 1);
          }
          for (this.removeTransformFromStyleList(), this.closeStyles(m2), f2 = c2.length, a2 = 0; a2 < f2; a2 += 1)
            c2[a2].closed = true;
        }, CVShapeElement.prototype.renderInnerContent = function() {
          this.transformHelper.opacity = 1, this.transformHelper._opMdf = false, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, true);
        }, CVShapeElement.prototype.renderShapeTransform = function(t2, e2) {
          (t2._opMdf || e2.op._mdf || this._isFirstFrame) && (e2.opacity = t2.opacity, e2.opacity *= e2.op.v, e2._opMdf = true);
        }, CVShapeElement.prototype.drawLayer = function() {
          var t2, e2, r2, i2, s2, a2, n2, o2, h2, l2 = this.stylesList.length, p2 = this.globalData.renderer, f2 = this.globalData.canvasContext;
          for (t2 = 0; t2 < l2; t2 += 1)
            if (("st" !== (o2 = (h2 = this.stylesList[t2]).type) && "gs" !== o2 || 0 !== h2.wi) && h2.data._shouldRender && 0 !== h2.coOp && 0 !== this.globalData.currentGlobalAlpha) {
              for (p2.save(), a2 = h2.elements, "st" === o2 || "gs" === o2 ? (f2.strokeStyle = "st" === o2 ? h2.co : h2.grd, f2.lineWidth = h2.wi, f2.lineCap = h2.lc, f2.lineJoin = h2.lj, f2.miterLimit = h2.ml || 0) : f2.fillStyle = "fl" === o2 ? h2.co : h2.grd, p2.ctxOpacity(h2.coOp), "st" !== o2 && "gs" !== o2 && f2.beginPath(), p2.ctxTransform(h2.preTransforms.finalTransform.props), r2 = a2.length, e2 = 0; e2 < r2; e2 += 1) {
                for ("st" !== o2 && "gs" !== o2 || (f2.beginPath(), h2.da && (f2.setLineDash(h2.da), f2.lineDashOffset = h2.do)), s2 = (n2 = a2[e2].trNodes).length, i2 = 0; i2 < s2; i2 += 1)
                  "m" == n2[i2].t ? f2.moveTo(n2[i2].p[0], n2[i2].p[1]) : "c" == n2[i2].t ? f2.bezierCurveTo(n2[i2].pts[0], n2[i2].pts[1], n2[i2].pts[2], n2[i2].pts[3], n2[i2].pts[4], n2[i2].pts[5]) : f2.closePath();
                "st" !== o2 && "gs" !== o2 || (f2.stroke(), h2.da && f2.setLineDash(this.dashResetter));
              }
              "st" !== o2 && "gs" !== o2 && f2.fill(h2.r), p2.restore();
            }
        }, CVShapeElement.prototype.renderShape = function(t2, e2, r2, i2) {
          var s2, a2;
          for (a2 = t2, s2 = e2.length - 1; s2 >= 0; s2 -= 1)
            "tr" == e2[s2].ty ? (a2 = r2[s2].transform, this.renderShapeTransform(t2, a2)) : "sh" == e2[s2].ty || "el" == e2[s2].ty || "rc" == e2[s2].ty || "sr" == e2[s2].ty ? this.renderPath(e2[s2], r2[s2]) : "fl" == e2[s2].ty ? this.renderFill(e2[s2], r2[s2], a2) : "st" == e2[s2].ty ? this.renderStroke(e2[s2], r2[s2], a2) : "gf" == e2[s2].ty || "gs" == e2[s2].ty ? this.renderGradientFill(e2[s2], r2[s2], a2) : "gr" == e2[s2].ty ? this.renderShape(a2, e2[s2].it, r2[s2].it) : e2[s2].ty;
          i2 && this.drawLayer();
        }, CVShapeElement.prototype.renderStyledShape = function(t2, e2) {
          if (this._isFirstFrame || e2._mdf || t2.transforms._mdf) {
            var r2, i2, s2, a2 = t2.trNodes, n2 = e2.paths, o2 = n2._length;
            a2.length = 0;
            var h2 = t2.transforms.finalTransform;
            for (s2 = 0; s2 < o2; s2 += 1) {
              var l2 = n2.shapes[s2];
              if (l2 && l2.v) {
                for (i2 = l2._length, r2 = 1; r2 < i2; r2 += 1)
                  1 === r2 && a2.push({ t: "m", p: h2.applyToPointArray(l2.v[0][0], l2.v[0][1], 0) }), a2.push({ t: "c", pts: h2.applyToTriplePoints(l2.o[r2 - 1], l2.i[r2], l2.v[r2]) });
                1 === i2 && a2.push({ t: "m", p: h2.applyToPointArray(l2.v[0][0], l2.v[0][1], 0) }), l2.c && i2 && (a2.push({ t: "c", pts: h2.applyToTriplePoints(l2.o[r2 - 1], l2.i[0], l2.v[0]) }), a2.push({ t: "z" }));
              }
            }
            t2.trNodes = a2;
          }
        }, CVShapeElement.prototype.renderPath = function(t2, e2) {
          if (true !== t2.hd && t2._shouldRender) {
            var r2, i2 = e2.styledShapes.length;
            for (r2 = 0; r2 < i2; r2 += 1)
              this.renderStyledShape(e2.styledShapes[r2], e2.sh);
          }
        }, CVShapeElement.prototype.renderFill = function(t2, e2, r2) {
          var i2 = e2.style;
          (e2.c._mdf || this._isFirstFrame) && (i2.co = "rgb(" + bm_floor(e2.c.v[0]) + "," + bm_floor(e2.c.v[1]) + "," + bm_floor(e2.c.v[2]) + ")"), (e2.o._mdf || r2._opMdf || this._isFirstFrame) && (i2.coOp = e2.o.v * r2.opacity);
        }, CVShapeElement.prototype.renderGradientFill = function(t2, e2, r2) {
          var i2 = e2.style;
          if (!i2.grd || e2.g._mdf || e2.s._mdf || e2.e._mdf || 1 !== t2.t && (e2.h._mdf || e2.a._mdf)) {
            var s2 = this.globalData.canvasContext, a2 = e2.s.v, n2 = e2.e.v;
            if (1 === t2.t)
              m2 = s2.createLinearGradient(a2[0], a2[1], n2[0], n2[1]);
            else
              var o2 = Math.sqrt(Math.pow(a2[0] - n2[0], 2) + Math.pow(a2[1] - n2[1], 2)), h2 = Math.atan2(n2[1] - a2[1], n2[0] - a2[0]), l2 = o2 * (e2.h.v >= 1 ? 0.99 : e2.h.v <= -1 ? -0.99 : e2.h.v), p2 = Math.cos(h2 + e2.a.v) * l2 + a2[0], f2 = Math.sin(h2 + e2.a.v) * l2 + a2[1], m2 = s2.createRadialGradient(p2, f2, 0, a2[0], a2[1], o2);
            var c2, d2 = t2.g.p, u2 = e2.g.c, y2 = 1;
            for (c2 = 0; c2 < d2; c2 += 1)
              e2.g._hasOpacity && e2.g._collapsable && (y2 = e2.g.o[2 * c2 + 1]), m2.addColorStop(u2[4 * c2] / 100, "rgba(" + u2[4 * c2 + 1] + "," + u2[4 * c2 + 2] + "," + u2[4 * c2 + 3] + "," + y2 + ")");
            i2.grd = m2;
          }
          i2.coOp = e2.o.v * r2.opacity;
        }, CVShapeElement.prototype.renderStroke = function(t2, e2, r2) {
          var i2 = e2.style, s2 = e2.d;
          s2 && (s2._mdf || this._isFirstFrame) && (i2.da = s2.dashArray, i2.do = s2.dashoffset[0]), (e2.c._mdf || this._isFirstFrame) && (i2.co = "rgb(" + bm_floor(e2.c.v[0]) + "," + bm_floor(e2.c.v[1]) + "," + bm_floor(e2.c.v[2]) + ")"), (e2.o._mdf || r2._opMdf || this._isFirstFrame) && (i2.coOp = e2.o.v * r2.opacity), (e2.w._mdf || this._isFirstFrame) && (i2.wi = e2.w.v);
        }, CVShapeElement.prototype.destroy = function() {
          this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0;
        }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function() {
          var t2 = this.canvasContext;
          t2.fillStyle = this.data.sc, t2.fillRect(0, 0, this.data.sw, this.data.sh);
        }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function() {
          var t2 = this.textProperty.currentData;
          this.renderedLetters = createSizedArray(t2.l ? t2.l.length : 0);
          var e2 = false;
          t2.fc ? (e2 = true, this.values.fill = this.buildColor(t2.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e2;
          var r2 = false;
          t2.sc && (r2 = true, this.values.stroke = this.buildColor(t2.sc), this.values.sWidth = t2.sw);
          var i2, s2, a2 = this.globalData.fontManager.getFontByName(t2.f), n2 = t2.l, o2 = this.mHelper;
          this.stroke = r2, this.values.fValue = t2.finalSize + "px " + this.globalData.fontManager.getFontByName(t2.f).fFamily, s2 = t2.finalText.length;
          var h2, l2, p2, f2, m2, c2, d2, u2, y2, g2, v2 = this.data.singleShape, b2 = t2.tr / 1e3 * t2.finalSize, P2 = 0, _2 = 0, x = true, S2 = 0;
          for (i2 = 0; i2 < s2; i2 += 1) {
            for (l2 = (h2 = this.globalData.fontManager.getCharData(t2.finalText[i2], a2.fStyle, this.globalData.fontManager.getFontByName(t2.f).fFamily)) && h2.data || {}, o2.reset(), v2 && n2[i2].n && (P2 = -b2, _2 += t2.yOffset, _2 += x ? 1 : 0, x = false), d2 = (m2 = l2.shapes ? l2.shapes[0].it : []).length, o2.scale(t2.finalSize / 100, t2.finalSize / 100), v2 && this.applyTextPropertiesToMatrix(t2, o2, n2[i2].line, P2, _2), y2 = createSizedArray(d2), c2 = 0; c2 < d2; c2 += 1) {
              for (f2 = m2[c2].ks.k.i.length, u2 = m2[c2].ks.k, g2 = [], p2 = 1; p2 < f2; p2 += 1)
                1 == p2 && g2.push(o2.applyToX(u2.v[0][0], u2.v[0][1], 0), o2.applyToY(u2.v[0][0], u2.v[0][1], 0)), g2.push(o2.applyToX(u2.o[p2 - 1][0], u2.o[p2 - 1][1], 0), o2.applyToY(u2.o[p2 - 1][0], u2.o[p2 - 1][1], 0), o2.applyToX(u2.i[p2][0], u2.i[p2][1], 0), o2.applyToY(u2.i[p2][0], u2.i[p2][1], 0), o2.applyToX(u2.v[p2][0], u2.v[p2][1], 0), o2.applyToY(u2.v[p2][0], u2.v[p2][1], 0));
              g2.push(o2.applyToX(u2.o[p2 - 1][0], u2.o[p2 - 1][1], 0), o2.applyToY(u2.o[p2 - 1][0], u2.o[p2 - 1][1], 0), o2.applyToX(u2.i[0][0], u2.i[0][1], 0), o2.applyToY(u2.i[0][0], u2.i[0][1], 0), o2.applyToX(u2.v[0][0], u2.v[0][1], 0), o2.applyToY(u2.v[0][0], u2.v[0][1], 0)), y2[c2] = g2;
            }
            v2 && (P2 += n2[i2].l, P2 += b2), this.textSpans[S2] ? this.textSpans[S2].elem = y2 : this.textSpans[S2] = { elem: y2 }, S2 += 1;
          }
        }, CVTextElement.prototype.renderInnerContent = function() {
          var t2, e2, r2, i2, s2, a2, n2 = this.canvasContext;
          this.finalTransform.mat.props;
          n2.font = this.values.fValue, n2.lineCap = "butt", n2.lineJoin = "miter", n2.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
          var o2, h2 = this.textAnimator.renderedLetters, l2 = this.textProperty.currentData.l;
          e2 = l2.length;
          var p2, f2, m2 = null, c2 = null, d2 = null;
          for (t2 = 0; t2 < e2; t2 += 1)
            if (!l2[t2].n) {
              if ((o2 = h2[t2]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o2.p), this.globalData.renderer.ctxOpacity(o2.o)), this.fill) {
                for (o2 && o2.fc ? m2 !== o2.fc && (m2 = o2.fc, n2.fillStyle = o2.fc) : m2 !== this.values.fill && (m2 = this.values.fill, n2.fillStyle = this.values.fill), i2 = (p2 = this.textSpans[t2].elem).length, this.globalData.canvasContext.beginPath(), r2 = 0; r2 < i2; r2 += 1)
                  for (a2 = (f2 = p2[r2]).length, this.globalData.canvasContext.moveTo(f2[0], f2[1]), s2 = 2; s2 < a2; s2 += 6)
                    this.globalData.canvasContext.bezierCurveTo(f2[s2], f2[s2 + 1], f2[s2 + 2], f2[s2 + 3], f2[s2 + 4], f2[s2 + 5]);
                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill();
              }
              if (this.stroke) {
                for (o2 && o2.sw ? d2 !== o2.sw && (d2 = o2.sw, n2.lineWidth = o2.sw) : d2 !== this.values.sWidth && (d2 = this.values.sWidth, n2.lineWidth = this.values.sWidth), o2 && o2.sc ? c2 !== o2.sc && (c2 = o2.sc, n2.strokeStyle = o2.sc) : c2 !== this.values.stroke && (c2 = this.values.stroke, n2.strokeStyle = this.values.stroke), i2 = (p2 = this.textSpans[t2].elem).length, this.globalData.canvasContext.beginPath(), r2 = 0; r2 < i2; r2 += 1)
                  for (a2 = (f2 = p2[r2]).length, this.globalData.canvasContext.moveTo(f2[0], f2[1]), s2 = 2; s2 < a2; s2 += 6)
                    this.globalData.canvasContext.bezierCurveTo(f2[s2], f2[s2 + 1], f2[s2 + 2], f2[s2 + 3], f2[s2 + 4], f2[s2 + 5]);
                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke();
              }
              o2 && this.globalData.renderer.restore();
            }
        }, CVEffects.prototype.renderFrame = function() {
        };
        var animationManager = function() {
          var t2 = {}, e2 = [], r2 = 0, i2 = 0, s2 = 0, a2 = true, n2 = false;
          function o2(t3) {
            for (var r3 = 0, s3 = t3.target; r3 < i2; )
              e2[r3].animation === s3 && (e2.splice(r3, 1), r3 -= 1, i2 -= 1, s3.isPaused || p2()), r3 += 1;
          }
          function h2(t3, r3) {
            if (!t3)
              return null;
            for (var s3 = 0; s3 < i2; ) {
              if (e2[s3].elem == t3 && null !== e2[s3].elem)
                return e2[s3].animation;
              s3 += 1;
            }
            var a3 = new AnimationItem();
            return f2(a3, t3), a3.setData(t3, r3), a3;
          }
          function l2() {
            s2 += 1, d2();
          }
          function p2() {
            s2 -= 1;
          }
          function f2(t3, r3) {
            t3.addEventListener("destroy", o2), t3.addEventListener("_active", l2), t3.addEventListener("_idle", p2), e2.push({ elem: r3, animation: t3 }), i2 += 1;
          }
          function m2(t3) {
            var o3, h3 = t3 - r2;
            for (o3 = 0; o3 < i2; o3 += 1)
              e2[o3].animation.advanceTime(h3);
            r2 = t3, s2 && !n2 ? window.requestAnimationFrame(m2) : a2 = true;
          }
          function c2(t3) {
            r2 = t3, window.requestAnimationFrame(m2);
          }
          function d2() {
            !n2 && s2 && a2 && (window.requestAnimationFrame(c2), a2 = false);
          }
          return t2.registerAnimation = h2, t2.loadAnimation = function(t3) {
            var e3 = new AnimationItem();
            return f2(e3, null), e3.setParams(t3), e3;
          }, t2.setSpeed = function(t3, r3) {
            var s3;
            for (s3 = 0; s3 < i2; s3 += 1)
              e2[s3].animation.setSpeed(t3, r3);
          }, t2.setDirection = function(t3, r3) {
            var s3;
            for (s3 = 0; s3 < i2; s3 += 1)
              e2[s3].animation.setDirection(t3, r3);
          }, t2.play = function(t3) {
            var r3;
            for (r3 = 0; r3 < i2; r3 += 1)
              e2[r3].animation.play(t3);
          }, t2.pause = function(t3) {
            var r3;
            for (r3 = 0; r3 < i2; r3 += 1)
              e2[r3].animation.pause(t3);
          }, t2.stop = function(t3) {
            var r3;
            for (r3 = 0; r3 < i2; r3 += 1)
              e2[r3].animation.stop(t3);
          }, t2.togglePause = function(t3) {
            var r3;
            for (r3 = 0; r3 < i2; r3 += 1)
              e2[r3].animation.togglePause(t3);
          }, t2.searchAnimations = function(t3, e3, r3) {
            var i3, s3 = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))), a3 = s3.length;
            for (i3 = 0; i3 < a3; i3 += 1)
              r3 && s3[i3].setAttribute("data-bm-type", r3), h2(s3[i3], t3);
            if (e3 && 0 === a3) {
              r3 || (r3 = "svg");
              var n3 = document.getElementsByTagName("body")[0];
              n3.innerHTML = "";
              var o3 = createTag("div");
              o3.style.width = "100%", o3.style.height = "100%", o3.setAttribute("data-bm-type", r3), n3.appendChild(o3), h2(o3, t3);
            }
          }, t2.resize = function() {
            var t3;
            for (t3 = 0; t3 < i2; t3 += 1)
              e2[t3].animation.resize();
          }, t2.goToAndStop = function(t3, r3, s3) {
            var a3;
            for (a3 = 0; a3 < i2; a3 += 1)
              e2[a3].animation.goToAndStop(t3, r3, s3);
          }, t2.destroy = function(t3) {
            var r3;
            for (r3 = i2 - 1; r3 >= 0; r3 -= 1)
              e2[r3].animation.destroy(t3);
          }, t2.freeze = function() {
            n2 = true;
          }, t2.unfreeze = function() {
            n2 = false, d2();
          }, t2.getRegisteredAnimations = function() {
            var t3, r3 = e2.length, i3 = [];
            for (t3 = 0; t3 < r3; t3 += 1)
              i3.push(e2[t3].animation);
            return i3;
          }, t2;
        }(), AnimationItem = function() {
          this._cbs = [], this.name = "", this.path = "", this.isLoaded = false, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = true, this.autoplay = false, this.loop = true, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = true, this._completedLoop = false, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader();
        };
        extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function(t2) {
          t2.context && (this.context = t2.context), (t2.wrapper || t2.container) && (this.wrapper = t2.wrapper || t2.container);
          var e2 = t2.animType ? t2.animType : t2.renderer ? t2.renderer : "svg";
          switch (e2) {
            case "canvas":
              this.renderer = new CanvasRenderer(this, t2.rendererSettings);
              break;
            case "svg":
              this.renderer = new SVGRenderer(this, t2.rendererSettings);
              break;
            default:
              this.renderer = new HybridRenderer(this, t2.rendererSettings);
          }
          this.renderer.setProjectInterface(this.projectInterface), this.animType = e2, "" === t2.loop || null === t2.loop || (false === t2.loop ? this.loop = false : true === t2.loop ? this.loop = true : this.loop = parseInt(t2.loop)), this.autoplay = !("autoplay" in t2) || t2.autoplay, this.name = t2.name ? t2.name : "", this.autoloadSegments = !t2.hasOwnProperty("autoloadSegments") || t2.autoloadSegments, this.assetsPath = t2.assetsPath, t2.animationData ? this.configAnimation(t2.animationData) : t2.path && ("json" != t2.path.substr(-4) && ("/" != t2.path.substr(-1, 1) && (t2.path += "/"), t2.path += "data.json"), -1 != t2.path.lastIndexOf("\\") ? this.path = t2.path.substr(0, t2.path.lastIndexOf("\\") + 1) : this.path = t2.path.substr(0, t2.path.lastIndexOf("/") + 1), this.fileName = t2.path.substr(t2.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t2.path, this.configAnimation.bind(this), (function() {
            this.trigger("data_failed");
          }).bind(this)));
        }, AnimationItem.prototype.setData = function(t2, e2) {
          var r2 = { wrapper: t2, animationData: e2 ? "object" === _typeof(e2) ? e2 : JSON.parse(e2) : null }, i2 = t2.attributes;
          r2.path = i2.getNamedItem("data-animation-path") ? i2.getNamedItem("data-animation-path").value : i2.getNamedItem("data-bm-path") ? i2.getNamedItem("data-bm-path").value : i2.getNamedItem("bm-path") ? i2.getNamedItem("bm-path").value : "", r2.animType = i2.getNamedItem("data-anim-type") ? i2.getNamedItem("data-anim-type").value : i2.getNamedItem("data-bm-type") ? i2.getNamedItem("data-bm-type").value : i2.getNamedItem("bm-type") ? i2.getNamedItem("bm-type").value : i2.getNamedItem("data-bm-renderer") ? i2.getNamedItem("data-bm-renderer").value : i2.getNamedItem("bm-renderer") ? i2.getNamedItem("bm-renderer").value : "canvas";
          var s2 = i2.getNamedItem("data-anim-loop") ? i2.getNamedItem("data-anim-loop").value : i2.getNamedItem("data-bm-loop") ? i2.getNamedItem("data-bm-loop").value : i2.getNamedItem("bm-loop") ? i2.getNamedItem("bm-loop").value : "";
          "" === s2 || (r2.loop = "false" !== s2 && ("true" === s2 || parseInt(s2)));
          var a2 = i2.getNamedItem("data-anim-autoplay") ? i2.getNamedItem("data-anim-autoplay").value : i2.getNamedItem("data-bm-autoplay") ? i2.getNamedItem("data-bm-autoplay").value : !i2.getNamedItem("bm-autoplay") || i2.getNamedItem("bm-autoplay").value;
          r2.autoplay = "false" !== a2, r2.name = i2.getNamedItem("data-name") ? i2.getNamedItem("data-name").value : i2.getNamedItem("data-bm-name") ? i2.getNamedItem("data-bm-name").value : i2.getNamedItem("bm-name") ? i2.getNamedItem("bm-name").value : "", "false" === (i2.getNamedItem("data-anim-prerender") ? i2.getNamedItem("data-anim-prerender").value : i2.getNamedItem("data-bm-prerender") ? i2.getNamedItem("data-bm-prerender").value : i2.getNamedItem("bm-prerender") ? i2.getNamedItem("bm-prerender").value : "") && (r2.prerender = false), this.setParams(r2);
        }, AnimationItem.prototype.includeLayers = function(t2) {
          t2.op > this.animationData.op && (this.animationData.op = t2.op, this.totalFrames = Math.floor(t2.op - this.animationData.ip));
          var e2, r2, i2 = this.animationData.layers, s2 = i2.length, a2 = t2.layers, n2 = a2.length;
          for (r2 = 0; r2 < n2; r2 += 1)
            for (e2 = 0; e2 < s2; ) {
              if (i2[e2].id == a2[r2].id) {
                i2[e2] = a2[r2];
                break;
              }
              e2 += 1;
            }
          if ((t2.chars || t2.fonts) && (this.renderer.globalData.fontManager.addChars(t2.chars), this.renderer.globalData.fontManager.addFonts(t2.fonts, this.renderer.globalData.defs)), t2.assets)
            for (s2 = t2.assets.length, e2 = 0; e2 < s2; e2 += 1)
              this.animationData.assets.push(t2.assets[e2]);
          this.animationData.__complete = false, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t2.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment();
        }, AnimationItem.prototype.loadNextSegment = function() {
          var t2 = this.animationData.segments;
          if (!t2 || 0 === t2.length || !this.autoloadSegments)
            return this.trigger("data_ready"), void (this.timeCompleted = this.totalFrames);
          var e2 = t2.shift();
          this.timeCompleted = e2.time * this.frameRate;
          var r2 = this.path + this.fileName + "_" + this.segmentPos + ".json";
          this.segmentPos += 1, assetLoader.load(r2, this.includeLayers.bind(this), (function() {
            this.trigger("data_failed");
          }).bind(this));
        }, AnimationItem.prototype.loadSegments = function() {
          this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
        }, AnimationItem.prototype.imagesLoaded = function() {
          this.trigger("loaded_images"), this.checkLoaded();
        }, AnimationItem.prototype.preloadImages = function() {
          this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
        }, AnimationItem.prototype.configAnimation = function(t2) {
          this.renderer && (this.animationData = t2, this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.renderer.configAnimation(t2), t2.assets || (t2.assets = []), this.renderer.searchExtraCompositions(t2.assets), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded());
        }, AnimationItem.prototype.waitForFontsLoaded = function() {
          this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
        }, AnimationItem.prototype.checkLoaded = function() {
          this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = true, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout((function() {
            this.trigger("DOMLoaded");
          }).bind(this), 0), this.gotoFrame(), this.autoplay && this.play());
        }, AnimationItem.prototype.resize = function() {
          this.renderer.updateContainerSize();
        }, AnimationItem.prototype.setSubframe = function(t2) {
          this.subframeEnabled = !!t2;
        }, AnimationItem.prototype.gotoFrame = function() {
          this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame();
        }, AnimationItem.prototype.renderFrame = function() {
          false !== this.isLoaded && this.renderer.renderFrame(this.currentFrame + this.firstFrame);
        }, AnimationItem.prototype.play = function(t2) {
          t2 && this.name != t2 || true === this.isPaused && (this.isPaused = false, this._idle && (this._idle = false, this.trigger("_active")));
        }, AnimationItem.prototype.pause = function(t2) {
          t2 && this.name != t2 || false === this.isPaused && (this.isPaused = true, this._idle = true, this.trigger("_idle"));
        }, AnimationItem.prototype.togglePause = function(t2) {
          t2 && this.name != t2 || (true === this.isPaused ? this.play() : this.pause());
        }, AnimationItem.prototype.stop = function(t2) {
          t2 && this.name != t2 || (this.pause(), this.playCount = 0, this._completedLoop = false, this.setCurrentRawFrameValue(0));
        }, AnimationItem.prototype.goToAndStop = function(t2, e2, r2) {
          r2 && this.name != r2 || (e2 ? this.setCurrentRawFrameValue(t2) : this.setCurrentRawFrameValue(t2 * this.frameModifier), this.pause());
        }, AnimationItem.prototype.goToAndPlay = function(t2, e2, r2) {
          this.goToAndStop(t2, e2, r2), this.play();
        }, AnimationItem.prototype.advanceTime = function(t2) {
          if (true !== this.isPaused && false !== this.isLoaded) {
            var e2 = this.currentRawFrame + t2 * this.frameModifier, r2 = false;
            e2 >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e2 >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e2 % this.totalFrames) || (this.setCurrentRawFrameValue(e2 % this.totalFrames), this._completedLoop = true, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e2) : this.checkSegments(e2 > this.totalFrames ? e2 % this.totalFrames : 0) || (r2 = true, e2 = this.totalFrames - 1) : e2 < 0 ? this.checkSegments(e2 % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && true !== this.loop ? (r2 = true, e2 = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e2 % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = true)) : this.setCurrentRawFrameValue(e2), r2 && (this.setCurrentRawFrameValue(e2), this.pause(), this.trigger("complete"));
          }
        }, AnimationItem.prototype.adjustSegment = function(t2, e2) {
          this.playCount = 0, t2[1] < t2[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t2[0] - t2[1], this.firstFrame = t2[1], this.setCurrentRawFrameValue(this.totalFrames - 1e-3 - e2)) : t2[1] > t2[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t2[1] - t2[0], this.firstFrame = t2[0], this.setCurrentRawFrameValue(1e-3 + e2)), this.trigger("segmentStart");
        }, AnimationItem.prototype.setSegment = function(t2, e2) {
          var r2 = -1;
          this.isPaused && (this.currentRawFrame + this.firstFrame < t2 ? r2 = t2 : this.currentRawFrame + this.firstFrame > e2 && (r2 = e2 - t2)), this.firstFrame = t2, this.timeCompleted = this.totalFrames = e2 - t2, -1 !== r2 && this.goToAndStop(r2, true);
        }, AnimationItem.prototype.playSegments = function(t2, e2) {
          if (e2 && (this.segments.length = 0), "object" === _typeof(t2[0])) {
            var r2, i2 = t2.length;
            for (r2 = 0; r2 < i2; r2 += 1)
              this.segments.push(t2[r2]);
          } else
            this.segments.push(t2);
          this.segments.length && e2 && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
        }, AnimationItem.prototype.resetSegments = function(t2) {
          this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t2 && this.checkSegments(0);
        }, AnimationItem.prototype.checkSegments = function(t2) {
          return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t2), true);
        }, AnimationItem.prototype.destroy = function(t2) {
          t2 && this.name != t2 || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null);
        }, AnimationItem.prototype.setCurrentRawFrameValue = function(t2) {
          this.currentRawFrame = t2, this.gotoFrame();
        }, AnimationItem.prototype.setSpeed = function(t2) {
          this.playSpeed = t2, this.updaFrameModifier();
        }, AnimationItem.prototype.setDirection = function(t2) {
          this.playDirection = t2 < 0 ? -1 : 1, this.updaFrameModifier();
        }, AnimationItem.prototype.updaFrameModifier = function() {
          this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
        }, AnimationItem.prototype.getPath = function() {
          return this.path;
        }, AnimationItem.prototype.getAssetsPath = function(t2) {
          var e2 = "";
          if (t2.e)
            e2 = t2.p;
          else if (this.assetsPath) {
            var r2 = t2.p;
            -1 !== r2.indexOf("images/") && (r2 = r2.split("/")[1]), e2 = this.assetsPath + r2;
          } else
            e2 = this.path, e2 += t2.u ? t2.u : "", e2 += t2.p;
          return e2;
        }, AnimationItem.prototype.getAssetData = function(t2) {
          for (var e2 = 0, r2 = this.assets.length; e2 < r2; ) {
            if (t2 == this.assets[e2].id)
              return this.assets[e2];
            e2 += 1;
          }
        }, AnimationItem.prototype.hide = function() {
          this.renderer.hide();
        }, AnimationItem.prototype.show = function() {
          this.renderer.show();
        }, AnimationItem.prototype.getDuration = function(t2) {
          return t2 ? this.totalFrames : this.totalFrames / this.frameRate;
        }, AnimationItem.prototype.trigger = function(t2) {
          if (this._cbs && this._cbs[t2])
            switch (t2) {
              case "enterFrame":
                this.triggerEvent(t2, new BMEnterFrameEvent(t2, this.currentFrame, this.totalFrames, this.frameModifier));
                break;
              case "loopComplete":
                this.triggerEvent(t2, new BMCompleteLoopEvent(t2, this.loop, this.playCount, this.frameMult));
                break;
              case "complete":
                this.triggerEvent(t2, new BMCompleteEvent(t2, this.frameMult));
                break;
              case "segmentStart":
                this.triggerEvent(t2, new BMSegmentStartEvent(t2, this.firstFrame, this.totalFrames));
                break;
              case "destroy":
                this.triggerEvent(t2, new BMDestroyEvent(t2, this));
                break;
              default:
                this.triggerEvent(t2);
            }
          "enterFrame" === t2 && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t2, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t2 && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t2, this.loop, this.playCount, this.frameMult)), "complete" === t2 && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t2, this.frameMult)), "segmentStart" === t2 && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t2, this.firstFrame, this.totalFrames)), "destroy" === t2 && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t2, this));
        };
        var Expressions = function() {
          var t2 = {};
          return t2.initExpressions = function(t3) {
            var e2 = 0, r2 = [];
            t3.renderer.compInterface = CompExpressionInterface(t3.renderer), t3.renderer.globalData.projectInterface.registerComposition(t3.renderer), t3.renderer.globalData.pushExpression = function() {
              e2 += 1;
            }, t3.renderer.globalData.popExpression = function() {
              0 === (e2 -= 1) && function() {
                var t4, e3 = r2.length;
                for (t4 = 0; t4 < e3; t4 += 1)
                  r2[t4].release();
                r2.length = 0;
              }();
            }, t3.renderer.globalData.registerExpressionProperty = function(t4) {
              -1 === r2.indexOf(t4) && r2.push(t4);
            };
          }, t2;
        }();
        expressionsPlugin = Expressions;
        var ExpressionManager = function() {
          var ob = {}, Math = BMMath;
          BezierFactory.getBezierEasing(0.333, 0, 0.833, 0.833, "easeIn").get;
          BezierFactory.getBezierEasing(0.167, 0.167, 0.667, 1, "easeOut").get;
          BezierFactory.getBezierEasing(0.33, 0, 0.667, 1, "easeInOut").get;
          function initiateExpression(elem, data, property) {
            var val = data.x, needsVelocity = /velocity(?![\w\d])/.test(val), _needsRandom = -1 !== val.indexOf("random"), elemType = elem.data.ty, transform, content, effect, thisProperty = property;
            thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", { get: function() {
              return thisProperty.v;
            } }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
            elem.data.ip / elem.comp.globalData.frameRate;
            elem.data.op / elem.comp.globalData.frameRate;
            elem.data.sw ? elem.data.sw : 0;
            elem.data.sh ? elem.data.sh : 0;
            elem.data.nm;
            var loopIn, loopOut, fromComp, thisLayer, velocityAtTime, scoped_bm_rt;
            if (data.xf) {
              var i, len = data.xf.length;
              for (i = 0; i < len; i += 1)
                eval("(function(){ return " + data.xf[i] + "}())");
            }
            var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0];
            property.kf ? data.k.length : 0;
            !this.data || true !== this.data.hd;
            (function(t2, e2) {
              var r2, i2, s2 = this.pv.length ? this.pv.length : 1, a2 = createTypedArray("float32", s2);
              var n2 = Math.floor(5 * time);
              for (r2 = 0, i2 = 0; r2 < n2; ) {
                for (i2 = 0; i2 < s2; i2 += 1)
                  a2[i2] += -e2 + 2 * e2 * BMMath.random();
                r2 += 1;
              }
              var o2 = 5 * time, h2 = o2 - Math.floor(o2), l2 = createTypedArray("float32", s2);
              if (s2 > 1) {
                for (i2 = 0; i2 < s2; i2 += 1)
                  l2[i2] = this.pv[i2] + a2[i2] + (-e2 + 2 * e2 * BMMath.random()) * h2;
                return l2;
              }
              return this.pv + a2[0] + (-e2 + 2 * e2 * BMMath.random()) * h2;
            }).bind(this);
            thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loopOut), thisProperty.smooth && thisProperty.smooth.bind(thisProperty), this.getValueAtTime && this.getValueAtTime.bind(this), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
            elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);
            var time, value;
            function seedRandom(t2) {
              BMMath.seedrandom(randSeed + t2);
            }
            elem.data.ind;
            !(!elem.hierarchy || !elem.hierarchy.length);
            var parent, randSeed = Math.floor(1e6 * Math.random());
            elem.globalData;
            function executeExpression(t2) {
              return value = t2, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (this.textIndex, this.textTotal, this.selectorValue), thisLayer || (elem.layerInterface.text, thisLayer = elem.layerInterface, elem.comp.compInterface, thisLayer.toWorld.bind(thisLayer), thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), thisLayer.toComp.bind(thisLayer), thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), transform && transform.anchorPoint), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), !(!elem.hierarchy || !elem.hierarchy.length) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && velocityAtTime(time), expression_function(), this.frameExpressionId = elem.globalData.frameId, "shape" === scoped_bm_rt.propType, scoped_bm_rt);
            }
            return executeExpression;
          }
          return ob.initiateExpression = initiateExpression, ob;
        }(), expressionHelpers = { searchExpressions: function(t2, e2, r2) {
          e2.x && (r2.k = true, r2.x = true, r2.initiateExpression = ExpressionManager.initiateExpression, r2.effectsSequence.push(r2.initiateExpression(t2, e2, r2).bind(r2)));
        }, getSpeedAtTime: function(t2) {
          var e2 = this.getValueAtTime(t2), r2 = this.getValueAtTime(t2 + -0.01), i2 = 0;
          if (e2.length) {
            var s2;
            for (s2 = 0; s2 < e2.length; s2 += 1)
              i2 += Math.pow(r2[s2] - e2[s2], 2);
            i2 = 100 * Math.sqrt(i2);
          } else
            i2 = 0;
          return i2;
        }, getVelocityAtTime: function(t2) {
          if (void 0 !== this.vel)
            return this.vel;
          var e2, r2, i2 = this.getValueAtTime(t2), s2 = this.getValueAtTime(t2 + -1e-3);
          if (i2.length)
            for (e2 = createTypedArray("float32", i2.length), r2 = 0; r2 < i2.length; r2 += 1)
              e2[r2] = (s2[r2] - i2[r2]) / -1e-3;
          else
            e2 = (s2 - i2) / -1e-3;
          return e2;
        }, getValueAtTime: function(t2) {
          return t2 *= this.elem.globalData.frameRate, (t2 -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t2 ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t2, this._cachingAtTime), this._cachingAtTime.lastFrame = t2), this._cachingAtTime.value;
        }, getStaticValueAtTime: function() {
          return this.pv;
        }, setGroupProperty: function(t2) {
          this.propertyGroup = t2;
        } };
        !function() {
          function t2(t3, e3, r3) {
            if (!this.k || !this.keyframes)
              return this.pv;
            t3 = t3 ? t3.toLowerCase() : "";
            var i3, s3, a3, n3, o3, h3 = this.comp.renderedFrame, l3 = this.keyframes, p3 = l3[l3.length - 1].t;
            if (h3 <= p3)
              return this.pv;
            if (r3 ? s3 = p3 - (i3 = e3 ? Math.abs(p3 - elem.comp.globalData.frameRate * e3) : Math.max(0, p3 - this.elem.data.ip)) : ((!e3 || e3 > l3.length - 1) && (e3 = l3.length - 1), i3 = p3 - (s3 = l3[l3.length - 1 - e3].t)), "pingpong" === t3) {
              if (Math.floor((h3 - s3) / i3) % 2 != 0)
                return this.getValueAtTime((i3 - (h3 - s3) % i3 + s3) / this.comp.globalData.frameRate, 0);
            } else {
              if ("offset" === t3) {
                var f2 = this.getValueAtTime(s3 / this.comp.globalData.frameRate, 0), m2 = this.getValueAtTime(p3 / this.comp.globalData.frameRate, 0), c2 = this.getValueAtTime(((h3 - s3) % i3 + s3) / this.comp.globalData.frameRate, 0), d2 = Math.floor((h3 - s3) / i3);
                if (this.pv.length) {
                  for (n3 = (o3 = new Array(f2.length)).length, a3 = 0; a3 < n3; a3 += 1)
                    o3[a3] = (m2[a3] - f2[a3]) * d2 + c2[a3];
                  return o3;
                }
                return (m2 - f2) * d2 + c2;
              }
              if ("continue" === t3) {
                var u2 = this.getValueAtTime(p3 / this.comp.globalData.frameRate, 0), y2 = this.getValueAtTime((p3 - 1e-3) / this.comp.globalData.frameRate, 0);
                if (this.pv.length) {
                  for (n3 = (o3 = new Array(u2.length)).length, a3 = 0; a3 < n3; a3 += 1)
                    o3[a3] = u2[a3] + (u2[a3] - y2[a3]) * ((h3 - p3) / this.comp.globalData.frameRate) / 5e-4;
                  return o3;
                }
                return u2 + (h3 - p3) / 1e-3 * (u2 - y2);
              }
            }
            return this.getValueAtTime(((h3 - s3) % i3 + s3) / this.comp.globalData.frameRate, 0);
          }
          function e2(t3, e3, r3) {
            if (!this.k)
              return this.pv;
            t3 = t3 ? t3.toLowerCase() : "";
            var i3, s3, a3, n3, o3, h3 = this.comp.renderedFrame, l3 = this.keyframes, p3 = l3[0].t;
            if (h3 >= p3)
              return this.pv;
            if (r3 ? s3 = p3 + (i3 = e3 ? Math.abs(elem.comp.globalData.frameRate * e3) : Math.max(0, this.elem.data.op - p3)) : ((!e3 || e3 > l3.length - 1) && (e3 = l3.length - 1), i3 = (s3 = l3[e3].t) - p3), "pingpong" === t3) {
              if (Math.floor((p3 - h3) / i3) % 2 == 0)
                return this.getValueAtTime(((p3 - h3) % i3 + p3) / this.comp.globalData.frameRate, 0);
            } else {
              if ("offset" === t3) {
                var f2 = this.getValueAtTime(p3 / this.comp.globalData.frameRate, 0), m2 = this.getValueAtTime(s3 / this.comp.globalData.frameRate, 0), c2 = this.getValueAtTime((i3 - (p3 - h3) % i3 + p3) / this.comp.globalData.frameRate, 0), d2 = Math.floor((p3 - h3) / i3) + 1;
                if (this.pv.length) {
                  for (n3 = (o3 = new Array(f2.length)).length, a3 = 0; a3 < n3; a3 += 1)
                    o3[a3] = c2[a3] - (m2[a3] - f2[a3]) * d2;
                  return o3;
                }
                return c2 - (m2 - f2) * d2;
              }
              if ("continue" === t3) {
                var u2 = this.getValueAtTime(p3 / this.comp.globalData.frameRate, 0), y2 = this.getValueAtTime((p3 + 1e-3) / this.comp.globalData.frameRate, 0);
                if (this.pv.length) {
                  for (n3 = (o3 = new Array(u2.length)).length, a3 = 0; a3 < n3; a3 += 1)
                    o3[a3] = u2[a3] + (u2[a3] - y2[a3]) * (p3 - h3) / 1e-3;
                  return o3;
                }
                return u2 + (u2 - y2) * (p3 - h3) / 1e-3;
              }
            }
            return this.getValueAtTime((i3 - (p3 - h3) % i3 + p3) / this.comp.globalData.frameRate, 0);
          }
          function r2(t3, e3) {
            if (!this.k)
              return this.pv;
            if (t3 = 0.5 * (t3 || 0.4), (e3 = Math.floor(e3 || 5)) <= 1)
              return this.pv;
            var r3, i3, s3 = this.comp.renderedFrame / this.comp.globalData.frameRate, a3 = s3 - t3, n3 = e3 > 1 ? (s3 + t3 - a3) / (e3 - 1) : 1, o3 = 0, h3 = 0;
            for (r3 = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o3 < e3; ) {
              if (i3 = this.getValueAtTime(a3 + o3 * n3), this.pv.length)
                for (h3 = 0; h3 < this.pv.length; h3 += 1)
                  r3[h3] += i3[h3];
              else
                r3 += i3;
              o3 += 1;
            }
            if (this.pv.length)
              for (h3 = 0; h3 < this.pv.length; h3 += 1)
                r3[h3] /= e3;
            else
              r3 /= e3;
            return r3;
          }
          function i2(t3) {
            index.__f__("warn", "at node_modules/lottie-miniprogram/miniprogram_dist/index.js:9", "Transform at time not supported");
          }
          function s2(t3) {
          }
          var a2 = TransformPropertyFactory.getTransformProperty;
          TransformPropertyFactory.getTransformProperty = function(t3, e3, r3) {
            var n3 = a2(t3, e3, r3);
            return n3.dynamicProperties.length ? n3.getValueAtTime = i2.bind(n3) : n3.getValueAtTime = s2.bind(n3), n3.setGroupProperty = expressionHelpers.setGroupProperty, n3;
          };
          var n2 = PropertyFactory.getProp;
          PropertyFactory.getProp = function(i3, s3, a3, o3, h3) {
            var l3 = n2(i3, s3, a3, o3, h3);
            l3.kf ? l3.getValueAtTime = expressionHelpers.getValueAtTime.bind(l3) : l3.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l3), l3.setGroupProperty = expressionHelpers.setGroupProperty, l3.loopOut = t2, l3.loopIn = e2, l3.smooth = r2, l3.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l3), l3.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l3), l3.numKeys = 1 === s3.a ? s3.k.length : 0, l3.propertyIndex = s3.ix;
            var p3 = 0;
            return 0 !== a3 && (p3 = createTypedArray("float32", 1 === s3.a ? s3.k[0].s.length : s3.k.length)), l3._cachingAtTime = { lastFrame: initialDefaultFrame, lastIndex: 0, value: p3 }, expressionHelpers.searchExpressions(i3, s3, l3), l3.k && h3.addDynamicProperty(l3), l3;
          };
          var o2 = ShapePropertyFactory.getConstructorFunction(), h2 = ShapePropertyFactory.getKeyframedConstructorFunction();
          function l2() {
          }
          l2.prototype = { vertices: function(t3, e3) {
            this.k && this.getValue();
            var r3 = this.v;
            void 0 !== e3 && (r3 = this.getValueAtTime(e3, 0));
            var i3, s3 = r3._length, a3 = r3[t3], n3 = r3.v, o3 = createSizedArray(s3);
            for (i3 = 0; i3 < s3; i3 += 1)
              o3[i3] = "i" === t3 || "o" === t3 ? [a3[i3][0] - n3[i3][0], a3[i3][1] - n3[i3][1]] : [a3[i3][0], a3[i3][1]];
            return o3;
          }, points: function(t3) {
            return this.vertices("v", t3);
          }, inTangents: function(t3) {
            return this.vertices("i", t3);
          }, outTangents: function(t3) {
            return this.vertices("o", t3);
          }, isClosed: function() {
            return this.v.c;
          }, pointOnPath: function(t3, e3) {
            var r3 = this.v;
            void 0 !== e3 && (r3 = this.getValueAtTime(e3, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r3));
            for (var i3, s3 = this._segmentsLength, a3 = s3.lengths, n3 = s3.totalLength * t3, o3 = 0, h3 = a3.length, l3 = 0; o3 < h3; ) {
              if (l3 + a3[o3].addedLength > n3) {
                var p3 = o3, f2 = r3.c && o3 === h3 - 1 ? 0 : o3 + 1, m2 = (n3 - l3) / a3[o3].addedLength;
                i3 = bez.getPointInSegment(r3.v[p3], r3.v[f2], r3.o[p3], r3.i[f2], m2, a3[o3]);
                break;
              }
              l3 += a3[o3].addedLength, o3 += 1;
            }
            return i3 || (i3 = r3.c ? [r3.v[0][0], r3.v[0][1]] : [r3.v[r3._length - 1][0], r3.v[r3._length - 1][1]]), i3;
          }, vectorOnPath: function(t3, e3, r3) {
            t3 = 1 == t3 ? this.v.c ? 0 : 0.999 : t3;
            var i3 = this.pointOnPath(t3, e3), s3 = this.pointOnPath(t3 + 1e-3, e3), a3 = s3[0] - i3[0], n3 = s3[1] - i3[1], o3 = Math.sqrt(Math.pow(a3, 2) + Math.pow(n3, 2));
            return 0 === o3 ? [0, 0] : "tangent" === r3 ? [a3 / o3, n3 / o3] : [-n3 / o3, a3 / o3];
          }, tangentOnPath: function(t3, e3) {
            return this.vectorOnPath(t3, e3, "tangent");
          }, normalOnPath: function(t3, e3) {
            return this.vectorOnPath(t3, e3, "normal");
          }, setGroupProperty: expressionHelpers.setGroupProperty, getValueAtTime: expressionHelpers.getStaticValueAtTime }, extendPrototype([l2], o2), extendPrototype([l2], h2), h2.prototype.getValueAtTime = function(t3) {
            return this._cachingAtTime || (this._cachingAtTime = { shapeValue: shape_pool.clone(this.pv), lastIndex: 0, lastTime: initialDefaultFrame }), t3 *= this.elem.globalData.frameRate, (t3 -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t3 ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t3, this.interpolateShape(t3, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue;
          }, h2.prototype.initiateExpression = ExpressionManager.initiateExpression;
          var p2 = ShapePropertyFactory.getShapeProp;
          ShapePropertyFactory.getShapeProp = function(t3, e3, r3, i3, s3) {
            var a3 = p2(t3, e3, r3, i3, s3);
            return a3.propertyIndex = e3.ix, a3.lock = false, 3 === r3 ? expressionHelpers.searchExpressions(t3, e3.pt, a3) : 4 === r3 && expressionHelpers.searchExpressions(t3, e3.ks, a3), a3.k && t3.addDynamicProperty(a3), a3;
          };
        }(), TextProperty.prototype.getExpressionValue = function(t2, e2) {
          var r2 = this.calculateExpression(e2);
          if (t2.t !== r2) {
            var i2 = {};
            return this.copyData(i2, t2), i2.t = r2.toString(), i2.__complete = false, i2;
          }
          return t2;
        }, TextProperty.prototype.searchProperty = function() {
          var t2 = this.searchKeyframes(), e2 = this.searchExpressions();
          return this.kf = t2 || e2, this.kf;
        }, TextProperty.prototype.searchExpressions = function() {
          if (this.data.d.x)
            return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), true;
        };
        var ShapeExpressionInterface = /* @__PURE__ */ function() {
          function t2(t3, f2, m2) {
            var c2, d2 = [], u2 = t3 ? t3.length : 0;
            for (c2 = 0; c2 < u2; c2 += 1)
              "gr" == t3[c2].ty ? d2.push(e2(t3[c2], f2[c2], m2)) : "fl" == t3[c2].ty ? d2.push(r2(t3[c2], f2[c2], m2)) : "st" == t3[c2].ty ? d2.push(i2(t3[c2], f2[c2], m2)) : "tm" == t3[c2].ty ? d2.push(s2(t3[c2], f2[c2], m2)) : "tr" == t3[c2].ty || ("el" == t3[c2].ty ? d2.push(a2(t3[c2], f2[c2], m2)) : "sr" == t3[c2].ty ? d2.push(n2(t3[c2], f2[c2], m2)) : "sh" == t3[c2].ty ? d2.push(p2(t3[c2], f2[c2], m2)) : "rc" == t3[c2].ty ? d2.push(o2(t3[c2], f2[c2], m2)) : "rd" == t3[c2].ty ? d2.push(h2(t3[c2], f2[c2], m2)) : "rp" == t3[c2].ty && d2.push(l2(t3[c2], f2[c2], m2)));
            return d2;
          }
          function e2(e3, r3, i3) {
            var s3 = function(t3) {
              switch (t3) {
                case "ADBE Vectors Group":
                case "Contents":
                case 2:
                  return s3.content;
                default:
                  return s3.transform;
              }
            };
            s3.propertyGroup = function(t3) {
              return 1 === t3 ? s3 : i3(t3 - 1);
            };
            var a3 = function(e4, r4, i4) {
              var s4, a4 = function(t3) {
                for (var e5 = 0, r5 = s4.length; e5 < r5; ) {
                  if (s4[e5]._name === t3 || s4[e5].mn === t3 || s4[e5].propertyIndex === t3 || s4[e5].ix === t3 || s4[e5].ind === t3)
                    return s4[e5];
                  e5 += 1;
                }
                if ("number" == typeof t3)
                  return s4[t3 - 1];
              };
              return a4.propertyGroup = function(t3) {
                return 1 === t3 ? a4 : i4(t3 - 1);
              }, s4 = t2(e4.it, r4.it, a4.propertyGroup), a4.numProperties = s4.length, a4.propertyIndex = e4.cix, a4._name = e4.nm, a4;
            }(e3, r3, s3.propertyGroup), n3 = function(t3, e4, r4) {
              function i4(t4) {
                return 1 == t4 ? s4 : r4(--t4);
              }
              e4.transform.mProps.o.setGroupProperty(i4), e4.transform.mProps.p.setGroupProperty(i4), e4.transform.mProps.a.setGroupProperty(i4), e4.transform.mProps.s.setGroupProperty(i4), e4.transform.mProps.r.setGroupProperty(i4), e4.transform.mProps.sk && (e4.transform.mProps.sk.setGroupProperty(i4), e4.transform.mProps.sa.setGroupProperty(i4));
              function s4(e5) {
                return t3.a.ix === e5 || "Anchor Point" === e5 ? s4.anchorPoint : t3.o.ix === e5 || "Opacity" === e5 ? s4.opacity : t3.p.ix === e5 || "Position" === e5 ? s4.position : t3.r.ix === e5 || "Rotation" === e5 || "ADBE Vector Rotation" === e5 ? s4.rotation : t3.s.ix === e5 || "Scale" === e5 ? s4.scale : t3.sk && t3.sk.ix === e5 || "Skew" === e5 ? s4.skew : t3.sa && t3.sa.ix === e5 || "Skew Axis" === e5 ? s4.skewAxis : void 0;
              }
              return e4.transform.op.setGroupProperty(i4), Object.defineProperties(s4, { opacity: { get: ExpressionPropertyInterface(e4.transform.mProps.o) }, position: { get: ExpressionPropertyInterface(e4.transform.mProps.p) }, anchorPoint: { get: ExpressionPropertyInterface(e4.transform.mProps.a) }, scale: { get: ExpressionPropertyInterface(e4.transform.mProps.s) }, rotation: { get: ExpressionPropertyInterface(e4.transform.mProps.r) }, skew: { get: ExpressionPropertyInterface(e4.transform.mProps.sk) }, skewAxis: { get: ExpressionPropertyInterface(e4.transform.mProps.sa) }, _name: { value: t3.nm } }), s4.ty = "tr", s4.mn = t3.mn, s4.propertyGroup = r4, s4;
            }(e3.it[e3.it.length - 1], r3.it[r3.it.length - 1], s3.propertyGroup);
            return s3.content = a3, s3.transform = n3, Object.defineProperty(s3, "_name", { get: function() {
              return e3.nm;
            } }), s3.numProperties = e3.np, s3.propertyIndex = e3.ix, s3.nm = e3.nm, s3.mn = e3.mn, s3;
          }
          function r2(t3, e3, r3) {
            function i3(t4) {
              return "Color" === t4 || "color" === t4 ? i3.color : "Opacity" === t4 || "opacity" === t4 ? i3.opacity : void 0;
            }
            return Object.defineProperties(i3, { color: { get: ExpressionPropertyInterface(e3.c) }, opacity: { get: ExpressionPropertyInterface(e3.o) }, _name: { value: t3.nm }, mn: { value: t3.mn } }), e3.c.setGroupProperty(r3), e3.o.setGroupProperty(r3), i3;
          }
          function i2(t3, e3, r3) {
            function i3(t4) {
              return 1 === t4 ? ob : r3(t4 - 1);
            }
            function s3(t4) {
              return 1 === t4 ? h3 : i3(t4 - 1);
            }
            function a3(r4) {
              Object.defineProperty(h3, t3.d[r4].nm, { get: ExpressionPropertyInterface(e3.d.dataProps[r4].p) });
            }
            var n3, o3 = t3.d ? t3.d.length : 0, h3 = {};
            for (n3 = 0; n3 < o3; n3 += 1)
              a3(n3), e3.d.dataProps[n3].p.setGroupProperty(s3);
            function l3(t4) {
              return "Color" === t4 || "color" === t4 ? l3.color : "Opacity" === t4 || "opacity" === t4 ? l3.opacity : "Stroke Width" === t4 || "stroke width" === t4 ? l3.strokeWidth : void 0;
            }
            return Object.defineProperties(l3, { color: { get: ExpressionPropertyInterface(e3.c) }, opacity: { get: ExpressionPropertyInterface(e3.o) }, strokeWidth: { get: ExpressionPropertyInterface(e3.w) }, dash: { get: function() {
              return h3;
            } }, _name: { value: t3.nm }, mn: { value: t3.mn } }), e3.c.setGroupProperty(i3), e3.o.setGroupProperty(i3), e3.w.setGroupProperty(i3), l3;
          }
          function s2(t3, e3, r3) {
            function i3(t4) {
              return 1 == t4 ? s3 : r3(--t4);
            }
            function s3(e4) {
              return e4 === t3.e.ix || "End" === e4 || "end" === e4 ? s3.end : e4 === t3.s.ix ? s3.start : e4 === t3.o.ix ? s3.offset : void 0;
            }
            return s3.propertyIndex = t3.ix, e3.s.setGroupProperty(i3), e3.e.setGroupProperty(i3), e3.o.setGroupProperty(i3), s3.propertyIndex = t3.ix, s3.propertyGroup = r3, Object.defineProperties(s3, { start: { get: ExpressionPropertyInterface(e3.s) }, end: { get: ExpressionPropertyInterface(e3.e) }, offset: { get: ExpressionPropertyInterface(e3.o) }, _name: { value: t3.nm } }), s3.mn = t3.mn, s3;
          }
          function a2(t3, e3, r3) {
            function i3(t4) {
              return 1 == t4 ? a3 : r3(--t4);
            }
            a3.propertyIndex = t3.ix;
            var s3 = "tm" === e3.sh.ty ? e3.sh.prop : e3.sh;
            function a3(e4) {
              return t3.p.ix === e4 ? a3.position : t3.s.ix === e4 ? a3.size : void 0;
            }
            return s3.s.setGroupProperty(i3), s3.p.setGroupProperty(i3), Object.defineProperties(a3, { size: { get: ExpressionPropertyInterface(s3.s) }, position: { get: ExpressionPropertyInterface(s3.p) }, _name: { value: t3.nm } }), a3.mn = t3.mn, a3;
          }
          function n2(t3, e3, r3) {
            function i3(t4) {
              return 1 == t4 ? a3 : r3(--t4);
            }
            var s3 = "tm" === e3.sh.ty ? e3.sh.prop : e3.sh;
            function a3(e4) {
              return t3.p.ix === e4 ? a3.position : t3.r.ix === e4 ? a3.rotation : t3.pt.ix === e4 ? a3.points : t3.or.ix === e4 || "ADBE Vector Star Outer Radius" === e4 ? a3.outerRadius : t3.os.ix === e4 ? a3.outerRoundness : !t3.ir || t3.ir.ix !== e4 && "ADBE Vector Star Inner Radius" !== e4 ? t3.is && t3.is.ix === e4 ? a3.innerRoundness : void 0 : a3.innerRadius;
            }
            return a3.propertyIndex = t3.ix, s3.or.setGroupProperty(i3), s3.os.setGroupProperty(i3), s3.pt.setGroupProperty(i3), s3.p.setGroupProperty(i3), s3.r.setGroupProperty(i3), t3.ir && (s3.ir.setGroupProperty(i3), s3.is.setGroupProperty(i3)), Object.defineProperties(a3, { position: { get: ExpressionPropertyInterface(s3.p) }, rotation: { get: ExpressionPropertyInterface(s3.r) }, points: { get: ExpressionPropertyInterface(s3.pt) }, outerRadius: { get: ExpressionPropertyInterface(s3.or) }, outerRoundness: { get: ExpressionPropertyInterface(s3.os) }, innerRadius: { get: ExpressionPropertyInterface(s3.ir) }, innerRoundness: { get: ExpressionPropertyInterface(s3.is) }, _name: { value: t3.nm } }), a3.mn = t3.mn, a3;
          }
          function o2(t3, e3, r3) {
            function i3(t4) {
              return 1 == t4 ? a3 : r3(--t4);
            }
            var s3 = "tm" === e3.sh.ty ? e3.sh.prop : e3.sh;
            function a3(e4) {
              return t3.p.ix === e4 ? a3.position : t3.r.ix === e4 ? a3.roundness : t3.s.ix === e4 || "Size" === e4 || "ADBE Vector Rect Size" === e4 ? a3.size : void 0;
            }
            return a3.propertyIndex = t3.ix, s3.p.setGroupProperty(i3), s3.s.setGroupProperty(i3), s3.r.setGroupProperty(i3), Object.defineProperties(a3, { position: { get: ExpressionPropertyInterface(s3.p) }, roundness: { get: ExpressionPropertyInterface(s3.r) }, size: { get: ExpressionPropertyInterface(s3.s) }, _name: { value: t3.nm } }), a3.mn = t3.mn, a3;
          }
          function h2(t3, e3, r3) {
            var i3 = e3;
            function s3(e4) {
              if (t3.r.ix === e4 || "Round Corners 1" === e4)
                return s3.radius;
            }
            return s3.propertyIndex = t3.ix, i3.rd.setGroupProperty(function(t4) {
              return 1 == t4 ? s3 : r3(--t4);
            }), Object.defineProperties(s3, { radius: { get: ExpressionPropertyInterface(i3.rd) }, _name: { value: t3.nm } }), s3.mn = t3.mn, s3;
          }
          function l2(t3, e3, r3) {
            function i3(t4) {
              return 1 == t4 ? a3 : r3(--t4);
            }
            var s3 = e3;
            function a3(e4) {
              return t3.c.ix === e4 || "Copies" === e4 ? a3.copies : t3.o.ix === e4 || "Offset" === e4 ? a3.offset : void 0;
            }
            return a3.propertyIndex = t3.ix, s3.c.setGroupProperty(i3), s3.o.setGroupProperty(i3), Object.defineProperties(a3, { copies: { get: ExpressionPropertyInterface(s3.c) }, offset: { get: ExpressionPropertyInterface(s3.o) }, _name: { value: t3.nm } }), a3.mn = t3.mn, a3;
          }
          function p2(t3, e3, r3) {
            var i3 = e3.sh;
            function s3(t4) {
              if ("Shape" === t4 || "shape" === t4 || "Path" === t4 || "path" === t4 || "ADBE Vector Shape" === t4 || 2 === t4)
                return s3.path;
            }
            return i3.setGroupProperty(function(t4) {
              return 1 == t4 ? s3 : r3(--t4);
            }), Object.defineProperties(s3, { path: { get: function() {
              return i3.k && i3.getValue(), i3;
            } }, shape: { get: function() {
              return i3.k && i3.getValue(), i3;
            } }, _name: { value: t3.nm }, ix: { value: t3.ix }, propertyIndex: { value: t3.ix }, mn: { value: t3.mn } }), s3;
          }
          return function(e3, r3, i3) {
            var s3;
            function a3(t3) {
              if ("number" == typeof t3)
                return s3[t3 - 1];
              for (var e4 = 0, r4 = s3.length; e4 < r4; ) {
                if (s3[e4]._name === t3)
                  return s3[e4];
                e4 += 1;
              }
            }
            return a3.propertyGroup = i3, s3 = t2(e3, r3, a3), a3.numProperties = s3.length, a3;
          };
        }(), TextExpressionInterface = function(t2) {
          var e2;
          function r2() {
          }
          return Object.defineProperty(r2, "sourceText", { get: function() {
            t2.textProperty.getValue();
            var r3 = t2.textProperty.currentData.t;
            return void 0 !== r3 && (t2.textProperty.currentData.t = void 0, (e2 = new String(r3)).value = r3 || new String(r3)), e2;
          } }), r2;
        }, LayerExpressionInterface = /* @__PURE__ */ function() {
          function t2(t3, e3) {
            var r3 = new Matrix();
            if (r3.reset(), this._elem.finalTransform.mProp.applyToMatrix(r3), this._elem.hierarchy && this._elem.hierarchy.length) {
              var i3, s2 = this._elem.hierarchy.length;
              for (i3 = 0; i3 < s2; i3 += 1)
                this._elem.hierarchy[i3].finalTransform.mProp.applyToMatrix(r3);
              return r3.applyToPointArray(t3[0], t3[1], t3[2] || 0);
            }
            return r3.applyToPointArray(t3[0], t3[1], t3[2] || 0);
          }
          function e2(t3, e3) {
            var r3 = new Matrix();
            if (r3.reset(), this._elem.finalTransform.mProp.applyToMatrix(r3), this._elem.hierarchy && this._elem.hierarchy.length) {
              var i3, s2 = this._elem.hierarchy.length;
              for (i3 = 0; i3 < s2; i3 += 1)
                this._elem.hierarchy[i3].finalTransform.mProp.applyToMatrix(r3);
              return r3.inversePoint(t3);
            }
            return r3.inversePoint(t3);
          }
          function r2(t3) {
            var e3 = new Matrix();
            if (e3.reset(), this._elem.finalTransform.mProp.applyToMatrix(e3), this._elem.hierarchy && this._elem.hierarchy.length) {
              var r3, i3 = this._elem.hierarchy.length;
              for (r3 = 0; r3 < i3; r3 += 1)
                this._elem.hierarchy[r3].finalTransform.mProp.applyToMatrix(e3);
              return e3.inversePoint(t3);
            }
            return e3.inversePoint(t3);
          }
          function i2() {
            return [1, 1, 1, 1];
          }
          return function(s2) {
            var a2;
            function n2(t3) {
              switch (t3) {
                case "ADBE Root Vectors Group":
                case "Contents":
                case 2:
                  return n2.shapeInterface;
                case 1:
                case 6:
                case "Transform":
                case "transform":
                case "ADBE Transform Group":
                  return a2;
                case 4:
                case "ADBE Effect Parade":
                case "effects":
                case "Effects":
                  return n2.effect;
              }
            }
            n2.toWorld = t2, n2.fromWorld = e2, n2.toComp = t2, n2.fromComp = r2, n2.sampleImage = i2, n2.sourceRectAtTime = s2.sourceRectAtTime.bind(s2), n2._elem = s2;
            var o2 = getDescriptor(a2 = TransformExpressionInterface(s2.finalTransform.mProp), "anchorPoint");
            return Object.defineProperties(n2, { hasParent: { get: function() {
              return s2.hierarchy.length;
            } }, parent: { get: function() {
              return s2.hierarchy[0].layerInterface;
            } }, rotation: getDescriptor(a2, "rotation"), scale: getDescriptor(a2, "scale"), position: getDescriptor(a2, "position"), opacity: getDescriptor(a2, "opacity"), anchorPoint: o2, anchor_point: o2, transform: { get: function() {
              return a2;
            } }, active: { get: function() {
              return s2.isInRange;
            } } }), n2.startTime = s2.data.st, n2.index = s2.data.ind, n2.source = s2.data.refId, n2.height = 0 === s2.data.ty ? s2.data.h : 100, n2.width = 0 === s2.data.ty ? s2.data.w : 100, n2.inPoint = s2.data.ip / s2.comp.globalData.frameRate, n2.outPoint = s2.data.op / s2.comp.globalData.frameRate, n2._name = s2.data.nm, n2.registerMaskInterface = function(t3) {
              n2.mask = new MaskManagerInterface(t3, s2);
            }, n2.registerEffectsInterface = function(t3) {
              n2.effect = t3;
            }, n2;
          };
        }(), CompExpressionInterface = function(t2) {
          function e2(e3) {
            for (var r2 = 0, i2 = t2.layers.length; r2 < i2; ) {
              if (t2.layers[r2].nm === e3 || t2.layers[r2].ind === e3)
                return t2.elements[r2].layerInterface;
              r2 += 1;
            }
            return null;
          }
          return Object.defineProperty(e2, "_name", { value: t2.data.nm }), e2.layer = e2, e2.pixelAspect = 1, e2.height = t2.data.h || t2.globalData.compSize.h, e2.width = t2.data.w || t2.globalData.compSize.w, e2.pixelAspect = 1, e2.frameDuration = 1 / t2.globalData.frameRate, e2.displayStartTime = 0, e2.numLayers = t2.layers.length, e2;
        }, TransformExpressionInterface = function(t2) {
          function e2(t3) {
            switch (t3) {
              case "scale":
              case "Scale":
              case "ADBE Scale":
              case 6:
                return e2.scale;
              case "rotation":
              case "Rotation":
              case "ADBE Rotation":
              case "ADBE Rotate Z":
              case 10:
                return e2.rotation;
              case "ADBE Rotate X":
                return e2.xRotation;
              case "ADBE Rotate Y":
                return e2.yRotation;
              case "position":
              case "Position":
              case "ADBE Position":
              case 2:
                return e2.position;
              case "ADBE Position_0":
                return e2.xPosition;
              case "ADBE Position_1":
                return e2.yPosition;
              case "ADBE Position_2":
                return e2.zPosition;
              case "anchorPoint":
              case "AnchorPoint":
              case "Anchor Point":
              case "ADBE AnchorPoint":
              case 1:
                return e2.anchorPoint;
              case "opacity":
              case "Opacity":
              case 11:
                return e2.opacity;
            }
          }
          if (Object.defineProperty(e2, "rotation", { get: ExpressionPropertyInterface(t2.r || t2.rz) }), Object.defineProperty(e2, "zRotation", { get: ExpressionPropertyInterface(t2.rz || t2.r) }), Object.defineProperty(e2, "xRotation", { get: ExpressionPropertyInterface(t2.rx) }), Object.defineProperty(e2, "yRotation", { get: ExpressionPropertyInterface(t2.ry) }), Object.defineProperty(e2, "scale", { get: ExpressionPropertyInterface(t2.s) }), t2.p)
            var r2 = ExpressionPropertyInterface(t2.p);
          return Object.defineProperty(e2, "position", { get: function() {
            return t2.p ? r2() : [t2.px.v, t2.py.v, t2.pz ? t2.pz.v : 0];
          } }), Object.defineProperty(e2, "xPosition", { get: ExpressionPropertyInterface(t2.px) }), Object.defineProperty(e2, "yPosition", { get: ExpressionPropertyInterface(t2.py) }), Object.defineProperty(e2, "zPosition", { get: ExpressionPropertyInterface(t2.pz) }), Object.defineProperty(e2, "anchorPoint", { get: ExpressionPropertyInterface(t2.a) }), Object.defineProperty(e2, "opacity", { get: ExpressionPropertyInterface(t2.o) }), Object.defineProperty(e2, "skew", { get: ExpressionPropertyInterface(t2.sk) }), Object.defineProperty(e2, "skewAxis", { get: ExpressionPropertyInterface(t2.sa) }), Object.defineProperty(e2, "orientation", { get: ExpressionPropertyInterface(t2.or) }), e2;
        }, ProjectInterface = /* @__PURE__ */ function() {
          function t2(t3) {
            this.compositions.push(t3);
          }
          return function() {
            function e2(t3) {
              for (var e3 = 0, r2 = this.compositions.length; e3 < r2; ) {
                if (this.compositions[e3].data && this.compositions[e3].data.nm === t3)
                  return this.compositions[e3].prepareFrame && this.compositions[e3].data.xt && this.compositions[e3].prepareFrame(this.currentFrame), this.compositions[e3].compInterface;
                e3 += 1;
              }
            }
            return e2.compositions = [], e2.currentFrame = 0, e2.registerComposition = t2, e2;
          };
        }(), EffectsExpressionInterface = /* @__PURE__ */ function() {
          function t2(r2, i2, s2, a2) {
            var n2, o2 = [], h2 = r2.ef.length;
            for (n2 = 0; n2 < h2; n2 += 1)
              5 === r2.ef[n2].ty ? o2.push(t2(r2.ef[n2], i2.effectElements[n2], i2.effectElements[n2].propertyGroup, a2)) : o2.push(e2(i2.effectElements[n2], r2.ef[n2].ty, a2, l2));
            function l2(t3) {
              return 1 === t3 ? p2 : s2(t3 - 1);
            }
            var p2 = function(t3) {
              for (var e3 = r2.ef, i3 = 0, s3 = e3.length; i3 < s3; ) {
                if (t3 === e3[i3].nm || t3 === e3[i3].mn || t3 === e3[i3].ix)
                  return 5 === e3[i3].ty ? o2[i3] : o2[i3]();
                i3 += 1;
              }
              return o2[0]();
            };
            return p2.propertyGroup = l2, "ADBE Color Control" === r2.mn && Object.defineProperty(p2, "color", { get: function() {
              return o2[0]();
            } }), Object.defineProperty(p2, "numProperties", { get: function() {
              return r2.np;
            } }), p2.active = p2.enabled = 0 !== r2.en, p2;
          }
          function e2(t3, e3, r2, i2) {
            var s2 = ExpressionPropertyInterface(t3.p);
            return t3.p.setGroupProperty && t3.p.setGroupProperty(i2), function() {
              return 10 === e3 ? r2.comp.compInterface(t3.p.v) : s2();
            };
          }
          return { createEffectsInterface: function(e3, r2) {
            if (e3.effectsManager) {
              var i2, s2 = [], a2 = e3.data.ef, n2 = e3.effectsManager.effectElements.length;
              for (i2 = 0; i2 < n2; i2 += 1)
                s2.push(t2(a2[i2], e3.effectsManager.effectElements[i2], r2, e3));
              return function(t3) {
                for (var r3 = e3.data.ef || [], i3 = 0, a3 = r3.length; i3 < a3; ) {
                  if (t3 === r3[i3].nm || t3 === r3[i3].mn || t3 === r3[i3].ix)
                    return s2[i3];
                  i3 += 1;
                }
              };
            }
          } };
        }(), MaskManagerInterface = function() {
          function t2(t3, e2) {
            this._mask = t3, this._data = e2;
          }
          Object.defineProperty(t2.prototype, "maskPath", { get: function() {
            return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
          } }), Object.defineProperty(t2.prototype, "maskOpacity", { get: function() {
            return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v;
          } });
          return function(e2, r2) {
            var i2, s2 = createSizedArray(e2.viewData.length), a2 = e2.viewData.length;
            for (i2 = 0; i2 < a2; i2 += 1)
              s2[i2] = new t2(e2.viewData[i2], e2.masksProperties[i2]);
            return function(t3) {
              for (i2 = 0; i2 < a2; ) {
                if (e2.masksProperties[i2].nm === t3)
                  return s2[i2];
                i2 += 1;
              }
            };
          };
        }(), ExpressionPropertyInterface = /* @__PURE__ */ function() {
          var t2 = { pv: 0, v: 0, mult: 1 }, e2 = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };
          function r2(t3, e3, r3) {
            Object.defineProperty(t3, "velocity", { get: function() {
              return e3.getVelocityAtTime(e3.comp.currentFrame);
            } }), t3.numKeys = e3.keyframes ? e3.keyframes.length : 0, t3.key = function(i3) {
              if (t3.numKeys) {
                var s2 = "";
                s2 = "s" in e3.keyframes[i3 - 1] ? e3.keyframes[i3 - 1].s : "e" in e3.keyframes[i3 - 2] ? e3.keyframes[i3 - 2].e : e3.keyframes[i3 - 2].s;
                var a2 = "unidimensional" === r3 ? new Number(s2) : Object.assign({}, s2);
                return a2.time = e3.keyframes[i3 - 1].t / e3.elem.comp.globalData.frameRate, a2;
              }
              return 0;
            }, t3.valueAtTime = e3.getValueAtTime, t3.speedAtTime = e3.getSpeedAtTime, t3.velocityAtTime = e3.getVelocityAtTime, t3.propertyGroup = e3.propertyGroup;
          }
          function i2() {
            return t2;
          }
          return function(s2) {
            return s2 ? "unidimensional" === s2.propType ? function(e3) {
              e3 && "pv" in e3 || (e3 = t2);
              var i3 = 1 / e3.mult, s3 = e3.pv * i3, a2 = new Number(s3);
              return a2.value = s3, r2(a2, e3, "unidimensional"), function() {
                return e3.k && e3.getValue(), s3 = e3.v * i3, a2.value !== s3 && ((a2 = new Number(s3)).value = s3, r2(a2, e3, "unidimensional")), a2;
              };
            }(s2) : function(t3) {
              t3 && "pv" in t3 || (t3 = e2);
              var i3 = 1 / t3.mult, s3 = t3.pv.length, a2 = createTypedArray("float32", s3), n2 = createTypedArray("float32", s3);
              return a2.value = n2, r2(a2, t3, "multidimensional"), function() {
                t3.k && t3.getValue();
                for (var e3 = 0; e3 < s3; e3 += 1)
                  a2[e3] = n2[e3] = t3.v[e3] * i3;
                return a2;
              };
            }(s2) : i2;
          };
        }(), TextExpressionSelectorProp, propertyGetTextProp;
        function SliderEffect(t2, e2, r2) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r2);
        }
        function AngleEffect(t2, e2, r2) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r2);
        }
        function ColorEffect(t2, e2, r2) {
          this.p = PropertyFactory.getProp(e2, t2.v, 1, 0, r2);
        }
        function PointEffect(t2, e2, r2) {
          this.p = PropertyFactory.getProp(e2, t2.v, 1, 0, r2);
        }
        function LayerIndexEffect(t2, e2, r2) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r2);
        }
        function MaskIndexEffect(t2, e2, r2) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r2);
        }
        function CheckboxEffect(t2, e2, r2) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r2);
        }
        function NoValueEffect() {
          this.p = {};
        }
        function EffectsManager() {
        }
        function EffectsManager(t2, e2) {
          var r2 = t2.ef || [];
          this.effectElements = [];
          var i2, s2, a2 = r2.length;
          for (i2 = 0; i2 < a2; i2++)
            s2 = new GroupEffect(r2[i2], e2), this.effectElements.push(s2);
        }
        function GroupEffect(t2, e2) {
          this.init(t2, e2);
        }
        TextExpressionSelectorProp = /* @__PURE__ */ function() {
          function t2(t3, e2) {
            return this.textIndex = t3 + 1, this.textTotal = e2, this.v = this.getValue() * this.mult, this.v;
          }
          return function(e2, r2) {
            this.pv = 1, this.comp = e2.comp, this.elem = e2, this.mult = 0.01, this.propType = "textSelector", this.textTotal = r2.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = true, this.x = true, this.getValue = ExpressionManager.initiateExpression.bind(this)(e2, r2, this), this.getMult = t2, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty;
          };
        }(), propertyGetTextProp = TextSelectorProp.getTextSelectorProp, TextSelectorProp.getTextSelectorProp = function(t2, e2, r2) {
          return 1 === e2.t ? new TextExpressionSelectorProp(t2, e2, r2) : propertyGetTextProp(t2, e2, r2);
        }, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function(t2, e2) {
          this.data = t2, this.effectElements = [], this.initDynamicPropertyContainer(e2);
          var r2, i2, s2 = this.data.ef.length, a2 = this.data.ef;
          for (r2 = 0; r2 < s2; r2 += 1) {
            switch (i2 = null, a2[r2].ty) {
              case 0:
                i2 = new SliderEffect(a2[r2], e2, this);
                break;
              case 1:
                i2 = new AngleEffect(a2[r2], e2, this);
                break;
              case 2:
                i2 = new ColorEffect(a2[r2], e2, this);
                break;
              case 3:
                i2 = new PointEffect(a2[r2], e2, this);
                break;
              case 4:
              case 7:
                i2 = new CheckboxEffect(a2[r2], e2, this);
                break;
              case 10:
                i2 = new LayerIndexEffect(a2[r2], e2, this);
                break;
              case 11:
                i2 = new MaskIndexEffect(a2[r2], e2, this);
                break;
              case 5:
                i2 = new EffectsManager(a2[r2], e2, this);
                break;
              default:
                i2 = new NoValueEffect(a2[r2]);
            }
            i2 && this.effectElements.push(i2);
          }
        };
        var lottiejs = {};
        function setLocationHref(t2) {
          locationHref = t2;
        }
        function searchAnimations() {
          animationManager.searchAnimations();
        }
        function setSubframeRendering(t2) {
          subframeEnabled = t2;
        }
        function loadAnimation(t2) {
          return animationManager.loadAnimation(t2);
        }
        function setQuality(t2) {
          if ("string" == typeof t2)
            switch (t2) {
              case "high":
                defaultCurveSegments = 200;
                break;
              case "medium":
                defaultCurveSegments = 50;
                break;
              case "low":
                defaultCurveSegments = 10;
            }
          else
            !isNaN(t2) && t2 > 1 && (defaultCurveSegments = t2);
        }
        function inBrowser() {
          return void 0 !== navigator;
        }
        function installPlugin(t2, e2) {
          "expressions" === t2 && (expressionsPlugin = e2);
        }
        function getFactory(t2) {
          switch (t2) {
            case "propertyFactory":
              return PropertyFactory;
            case "shapePropertyFactory":
              return ShapePropertyFactory;
            case "matrix":
              return Matrix;
          }
        }
        function checkReady() {
          "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations());
        }
        lottiejs.play = animationManager.play, lottiejs.pause = animationManager.pause, lottiejs.setLocationHref = setLocationHref, lottiejs.togglePause = animationManager.togglePause, lottiejs.setSpeed = animationManager.setSpeed, lottiejs.setDirection = animationManager.setDirection, lottiejs.stop = animationManager.stop, lottiejs.searchAnimations = searchAnimations, lottiejs.registerAnimation = animationManager.registerAnimation, lottiejs.loadAnimation = loadAnimation, lottiejs.setSubframeRendering = setSubframeRendering, lottiejs.resize = animationManager.resize, lottiejs.goToAndStop = animationManager.goToAndStop, lottiejs.destroy = animationManager.destroy, lottiejs.setQuality = setQuality, lottiejs.inBrowser = inBrowser, lottiejs.installPlugin = installPlugin, lottiejs.freeze = animationManager.freeze, lottiejs.unfreeze = animationManager.unfreeze, lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottiejs.__getFactory = getFactory, lottiejs.version = "5.5.7";
        var readyStateCheckInterval = setInterval(checkReady, 100);
        return lottiejs;
      });
      var _window$lottie = window.lottie, freeze = _window$lottie.freeze, unfreeze = _window$lottie.unfreeze;
    }).call(this, __webpack_require__(2)(module));
  }, function(t2, e2) {
    t2.exports = function(t3) {
      if (!t3.webpackPolyfill) {
        var e3 = Object.create(t3);
        e3.children || (e3.children = []), Object.defineProperty(e3, "loaded", { enumerable: true, get: function() {
          return e3.l;
        } }), Object.defineProperty(e3, "id", { enumerable: true, get: function() {
          return e3.i;
        } }), Object.defineProperty(e3, "exports", { enumerable: true }), e3.webpackPolyfill = 1;
      }
      return e3;
    };
  }]));
})(miniprogram_dist);
const Lottie = /* @__PURE__ */ getDefaultExportFromCjs(miniprogram_dist);
const pages = [
  {
    path: "pages/home/home",
    style: {
      navigationBarTitleText: "首页"
    }
  },
  {
    path: "pages/seedManager/seedManager",
    style: {
      navigationBarTitleText: "种子"
    }
  },
  {
    path: "pages/my/my",
    style: {
      navigationBarTitleText: "个人主页"
    }
  },
  {
    path: "pages/login/login",
    style: {
      navigationBarTitleText: ""
    }
  },
  {
    path: "pages/identify/identify",
    style: {
      navigationBarTitleText: "种子"
    }
  },
  {
    path: "pages/phoneLogin/phoneLogin",
    style: {
      navigationBarTitleText: ""
    }
  },
  {
    path: "pages/history/history",
    style: {
      navigationBarTitleText: "历史记录"
    }
  }
];
const tabBar = {
  color: "#000000",
  selectedColor: "#000000",
  backgroundColor: "#ffffff",
  list: [
    {
      text: "首页",
      pagePath: "pages/home/home",
      iconPath: "/static/homeBlank.png",
      selectedIconPath: "/static/homeBlue.png"
    },
    {
      text: "我的",
      pagePath: "pages/my/my",
      iconPath: "/static/myBlank.png",
      selectedIconPath: "/static/myBlue.png"
    }
  ],
  usingComponents: {}
};
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8"
};
const uniIdRouter = {};
const easycom = {
  autoscan: true,
  custom: {}
};
const e = {
  pages,
  tabBar,
  globalStyle,
  uniIdRouter,
  easycom
};
var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
function t(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function n(e2, t2, n2) {
  return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(null == t3 && n2.path);
  } }, n2.exports), n2.exports;
}
var s = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || /* @__PURE__ */ function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c2).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var i3 = 0; i3 < r3; i3++) {
          var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
          t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
        }
      else
        for (i3 = 0; i3 < r3; i3 += 4)
          t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s3 = [], r3 = function(t5) {
        t5 = t5;
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, i3 = 0; i3 < t4; i3 += 4) {
        var a3 = r3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new o2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new o2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(i3));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new o2.init(n4, t4);
    } }, h2 = a2.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u2.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u2.parse(unescape(encodeURIComponent(e4)));
    } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
      this._data = new o2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
      if (c3) {
        for (var h3 = 0; h3 < c3; h3 += i3)
          this._doProcessBlock(s3, h3);
        var l3 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new o2.init(l3, u3);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      l2.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d2.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d2 = s2.algo = {};
    return s2;
  }(Math), n2);
}), r = s, i = (n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c2 = o2.MD5 = i2.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, r3 = e4[s3];
        e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], T2 = e4[t4 + 14], A2 = e4[t4 + 15], P2 = i3[0], C2 = i3[1], x2 = i3[2], O2 = i3[3];
      P2 = u2(P2, C2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, P2, C2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, P2, C2, p2, 17, a2[2]), C2 = u2(C2, x2, O2, P2, f2, 22, a2[3]), P2 = u2(P2, C2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, P2, C2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, P2, C2, y2, 17, a2[6]), C2 = u2(C2, x2, O2, P2, _2, 22, a2[7]), P2 = u2(P2, C2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, P2, C2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, P2, C2, I2, 17, a2[10]), C2 = u2(C2, x2, O2, P2, S2, 22, a2[11]), P2 = u2(P2, C2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, P2, C2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, P2, C2, T2, 17, a2[14]), P2 = h2(P2, C2 = u2(C2, x2, O2, P2, A2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = h2(O2, P2, C2, x2, y2, 9, a2[17]), x2 = h2(x2, O2, P2, C2, S2, 14, a2[18]), C2 = h2(C2, x2, O2, P2, o3, 20, a2[19]), P2 = h2(P2, C2, x2, O2, m2, 5, a2[20]), O2 = h2(O2, P2, C2, x2, I2, 9, a2[21]), x2 = h2(x2, O2, P2, C2, A2, 14, a2[22]), C2 = h2(C2, x2, O2, P2, g2, 20, a2[23]), P2 = h2(P2, C2, x2, O2, v2, 5, a2[24]), O2 = h2(O2, P2, C2, x2, T2, 9, a2[25]), x2 = h2(x2, O2, P2, C2, f2, 14, a2[26]), C2 = h2(C2, x2, O2, P2, w2, 20, a2[27]), P2 = h2(P2, C2, x2, O2, k2, 5, a2[28]), O2 = h2(O2, P2, C2, x2, p2, 9, a2[29]), x2 = h2(x2, O2, P2, C2, _2, 14, a2[30]), P2 = l2(P2, C2 = h2(C2, x2, O2, P2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = l2(O2, P2, C2, x2, w2, 11, a2[33]), x2 = l2(x2, O2, P2, C2, S2, 16, a2[34]), C2 = l2(C2, x2, O2, P2, T2, 23, a2[35]), P2 = l2(P2, C2, x2, O2, c3, 4, a2[36]), O2 = l2(O2, P2, C2, x2, g2, 11, a2[37]), x2 = l2(x2, O2, P2, C2, _2, 16, a2[38]), C2 = l2(C2, x2, O2, P2, I2, 23, a2[39]), P2 = l2(P2, C2, x2, O2, k2, 4, a2[40]), O2 = l2(O2, P2, C2, x2, o3, 11, a2[41]), x2 = l2(x2, O2, P2, C2, f2, 16, a2[42]), C2 = l2(C2, x2, O2, P2, y2, 23, a2[43]), P2 = l2(P2, C2, x2, O2, v2, 4, a2[44]), O2 = l2(O2, P2, C2, x2, b2, 11, a2[45]), x2 = l2(x2, O2, P2, C2, A2, 16, a2[46]), P2 = d2(P2, C2 = l2(C2, x2, O2, P2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, P2, C2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, P2, C2, T2, 15, a2[50]), C2 = d2(C2, x2, O2, P2, m2, 21, a2[51]), P2 = d2(P2, C2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, P2, C2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, P2, C2, I2, 15, a2[54]), C2 = d2(C2, x2, O2, P2, c3, 21, a2[55]), P2 = d2(P2, C2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, P2, C2, x2, A2, 10, a2[57]), x2 = d2(x2, O2, P2, C2, y2, 15, a2[58]), C2 = d2(C2, x2, O2, P2, k2, 21, a2[59]), P2 = d2(P2, C2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, P2, C2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, P2, C2, p2, 15, a2[62]), C2 = d2(C2, x2, O2, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var i3 = e3.floor(s3 / 4294967296), o3 = s3;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var h3 = c3[u3];
        c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function h2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function l2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function d2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, void function() {
    var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
    e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
      e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
      var n3 = e4.blockSize, r2 = 4 * n3;
      t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
      for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
        a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
      i2.sigBytes = o2.sigBytes = r2, this.reset();
    }, reset: function() {
      var e4 = this._hasher;
      e4.reset(), e4.update(this._iKey);
    }, update: function(e4) {
      return this._hasher.update(e4), this;
    }, finalize: function(e4) {
      var t4 = this._hasher, n3 = t4.finalize(e4);
      return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
    } });
  }());
}), n(function(e2, t2) {
  e2.exports = r.HmacMD5;
})), o = n(function(e2, t2) {
  e2.exports = r.enc.Utf8;
}), a = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function() {
    var e3 = n2, t3 = e3.lib.WordArray;
    function s2(e4, n3, s3) {
      for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
        if (o2 % 4) {
          var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
          r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
        }
      return t3.create(r2, i2);
    }
    e3.enc.Base64 = { stringify: function(e4) {
      var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
      e4.clamp();
      for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
        for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
          r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
      var c2 = s3.charAt(64);
      if (c2)
        for (; r2.length % 4; )
          r2.push(c2);
      return r2.join("");
    }, parse: function(e4) {
      var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
      if (!r2) {
        r2 = this._reverseMap = [];
        for (var i2 = 0; i2 < n3.length; i2++)
          r2[n3.charCodeAt(i2)] = i2;
      }
      var o2 = n3.charAt(64);
      if (o2) {
        var a2 = e4.indexOf(o2);
        -1 !== a2 && (t4 = a2);
      }
      return s2(e4, t4, r2);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
  }(), n2.enc.Base64);
});
const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
function f(e2) {
  return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
}
function g(e2) {
  return "object" === f(e2);
}
function m(e2) {
  return "function" == typeof e2;
}
function y(e2) {
  return function() {
    try {
      return e2.apply(e2, arguments);
    } catch (e3) {
      console.error(e3);
    }
  };
}
const _ = "REJECTED", w = "NOT_PENDING";
class v {
  constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
    this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
  }
  get needRetry() {
    if (!this.status)
      return true;
    switch (this.retryRule) {
      case _:
        return this.status === p;
      case w:
        return this.status !== l;
    }
  }
  exec() {
    return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
  }
}
function I(e2) {
  return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
}
const S = true, b = "mp-weixin", T = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), A = b, P = I('{"address":["127.0.0.1","100.125.69.178","192.168.184.1","192.168.237.1"],"servePort":7000,"debugPort":9000,"initialLaunchType":"local","skipFiles":["<node_internals>/**","D:/HBuilderX/HBuilderX/plugins/unicloud/**/*.js"]}'), C = I('[{"provider":"alipay","spaceName":"seed","spaceId":"env-00jxu2c1qfw4","spaceAppId":"2021005195653010","accessKey":"9ks3vg7xVr5S6Znv","secretKey":"yfn9RsBlmYw8Qymv"}]') || [];
let O = "";
try {
  O = "__UNI__4B36300";
} catch (e2) {
}
let L = {};
function R(e2, t2 = {}) {
  var n2, s2;
  return n2 = L, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (L[e2] = t2), L[e2];
}
const N = ["invoke", "success", "fail", "complete"], D = R("_globalUniCloudInterceptor");
function M(e2, t2) {
  D[e2] || (D[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
    N.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s2 = D[e3][t3];
      s2 || (s2 = D[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
    }(e2, n2, t2[n2]);
  });
}
function q(e2, t2) {
  D[e2] || (D[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
    N.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s2 = D[e3][t3];
      if (!s2)
        return;
      const r2 = s2.indexOf(n3);
      r2 > -1 && s2.splice(r2, 1);
    }(e2, n2, t2[n2]);
  }) : delete D[e2];
}
function K(e2, t2) {
  return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function F(e2, t2) {
  return D[e2] && D[e2][t2] || [];
}
function j(e2) {
  M("callObject", e2);
}
const $ = R("_globalUniCloudListener"), B = "response", W = "needLogin", H = "refreshToken", J = "clientdb", z = "cloudfunction", V = "cloudobject";
function G(e2) {
  return $[e2] || ($[e2] = []), $[e2];
}
function Y(e2, t2) {
  const n2 = G(e2);
  n2.includes(t2) || n2.push(t2);
}
function Q(e2, t2) {
  const n2 = G(e2), s2 = n2.indexOf(t2);
  -1 !== s2 && n2.splice(s2, 1);
}
function X(e2, t2) {
  const n2 = G(e2);
  for (let e3 = 0; e3 < n2.length; e3++) {
    (0, n2[e3])(t2);
  }
}
let Z, ee = false;
function te() {
  return Z || (Z = new Promise((e2) => {
    ee && e2(), function t2() {
      if ("function" == typeof getCurrentPages) {
        const t3 = getCurrentPages();
        t3 && t3[0] && (ee = true, e2());
      }
      ee || setTimeout(() => {
        t2();
      }, 30);
    }();
  }), Z);
}
function ne(e2) {
  const t2 = {};
  for (const n2 in e2) {
    const s2 = e2[n2];
    m(s2) && (t2[n2] = y(s2));
  }
  return t2;
}
class se extends Error {
  constructor(e2) {
    super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
  }
  toJson(e2 = 0) {
    if (!(e2 >= 10))
      return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
  }
}
var re = { request: (e2) => index.request(e2), uploadFile: (e2) => index.uploadFile(e2), setStorageSync: (e2, t2) => index.setStorageSync(e2, t2), getStorageSync: (e2) => index.getStorageSync(e2), removeStorageSync: (e2) => index.removeStorageSync(e2), clearStorageSync: () => index.clearStorageSync(), connectSocket: (e2) => index.connectSocket(e2) };
function ie(e2) {
  return e2 && ie(e2.__v_raw) || e2;
}
function oe() {
  return { token: re.getStorageSync("uni_id_token") || re.getStorageSync("uniIdToken"), tokenExpired: re.getStorageSync("uni_id_token_expired") };
}
function ae({ token: e2, tokenExpired: t2 } = {}) {
  e2 && re.setStorageSync("uni_id_token", e2), t2 && re.setStorageSync("uni_id_token_expired", t2);
}
let ce, ue;
function he() {
  return ce || (ce = index.getSystemInfoSync()), ce;
}
function le() {
  let e2, t2;
  try {
    if (index.getLaunchOptionsSync) {
      if (index.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
        return;
      const { scene: n2, channel: s2 } = index.getLaunchOptionsSync();
      e2 = s2, t2 = n2;
    }
  } catch (e3) {
  }
  return { channel: e2, scene: t2 };
}
let de = {};
function pe() {
  const e2 = index.getLocale && index.getLocale() || "en";
  if (ue)
    return { ...de, ...ue, locale: e2, LOCALE: e2 };
  const t2 = he(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
  for (const e3 in t2)
    Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
  return ue = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...le(), ...t2 }, { ...de, ...ue, locale: e2, LOCALE: e2 };
}
var fe = { sign: function(e2, t2) {
  let n2 = "";
  return Object.keys(e2).sort().forEach(function(t3) {
    e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
  }), n2 = n2.slice(1), i(n2, t2).toString();
}, wrappedRequest: function(e2, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e2, { complete(e3) {
      e3 || (e3 = {});
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400) {
        const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
        return s2(new se({ code: n3, message: r3, requestId: t3 }));
      }
      const r2 = e3.data;
      if (r2.error)
        return s2(new se({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
}, toBase64: function(e2) {
  return a.stringify(o.parse(e2));
} };
var ge = class {
  constructor(e2) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = re, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
      if (!e3.result || !e3.result.accessToken)
        throw new se({ code: "AUTH_FAILED", message: "获取accessToken失败" });
      this.setAccessToken(e3.result.accessToken);
    }), retryRule: w });
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e2) {
    this.accessToken = e2;
  }
  requestWrapped(e2) {
    return fe.wrappedRequest(e2, this.adapter.request);
  }
  requestAuth(e2) {
    return this.requestWrapped(e2);
  }
  request(e2, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
      !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e2);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e2);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e2) {
    const t2 = Object.assign({}, e2);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = fe.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = fe.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    return this._getAccessTokenPromiseHub.exec();
  }
  async authorize() {
    await this.getAccessToken();
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request({ ...this.setupRequest(t2), timeout: e2.timeout });
  }
  getOSSUploadOptionsFromPath(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
    if ("string" !== f(t2))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const o2 = i2 && i2.envType || this.config.envType;
    if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
      throw new se({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
    const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
    if (u2 && (_2["x-oss-security-token"] = u2), y2) {
      const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
      _2.callback = fe.toBase64(e3);
    }
    const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
    if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
      return { success: true, filePath: e2, fileID: c2 };
    if ((await this.reportOSSUpload({ id: g2 })).success)
      return { success: true, filePath: e2, fileID: c2 };
    throw new se({ code: "UPLOAD_FAILED", message: "文件上传失败" });
  }
  getTempFileURL({ fileList: e2 } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e2) && 0 !== e2.length || n2(new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
  async getFileInfo({ fileList: e2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
    return { fileList: (await this.request(this.setupRequest(t2))).result };
  }
};
var me = { init(e2) {
  const t2 = new ge(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const ye = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var _e;
!function(e2) {
  e2.local = "local", e2.none = "none", e2.session = "session";
}(_e || (_e = {}));
var we = function() {
}, ve = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
    !function() {
      function t4(t5) {
        for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
          if (!(t5 % s4))
            return false;
        return true;
      }
      function n3(e4) {
        return 4294967296 * (e4 - (0 | e4)) | 0;
      }
      for (var s3 = 2, r3 = 0; r3 < 64; )
        t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
    }();
    var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
      this._hash = new r2.init(a2.slice(0));
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
        if (p2 < 16)
          u2[p2] = 0 | e4[t4 + p2];
        else {
          var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
          u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
        }
        var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
        d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
      }
      n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
  }(Math), n2.SHA256);
}), Ie = ve, Se = n(function(e2, t2) {
  e2.exports = r.HmacSHA256;
});
const be = () => {
  let e2;
  if (!Promise) {
    e2 = () => {
    }, e2.promise = {};
    const t3 = () => {
      throw new se({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
    };
    return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
  }
  const t2 = new Promise((t3, n2) => {
    e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
  });
  return e2.promise = t2, e2;
};
function ke(e2) {
  return void 0 === e2;
}
function Te(e2) {
  return "[object Null]" === Object.prototype.toString.call(e2);
}
function Ae(e2 = "") {
  return e2.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1");
}
function Pe(e2 = 32) {
  const t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n2 = t2.length;
  let s2 = "";
  for (let r2 = 0; r2 < e2; r2++)
    s2 += t2.charAt(Math.floor(Math.random() * n2));
  return s2;
}
var Ce;
function xe(e2) {
  const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
  var n2;
  for (const e3 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e2) {
  e2.WEB = "web", e2.WX_MP = "wx_mp";
}(Ce || (Ce = {}));
const Oe = { adapter: null, runtime: void 0 }, Ee = ["anonymousUuidKey"];
class Le extends we {
  constructor() {
    super(), Oe.adapter.root.tcbObject || (Oe.adapter.root.tcbObject = {});
  }
  setItem(e2, t2) {
    Oe.adapter.root.tcbObject[e2] = t2;
  }
  getItem(e2) {
    return Oe.adapter.root.tcbObject[e2];
  }
  removeItem(e2) {
    delete Oe.adapter.root.tcbObject[e2];
  }
  clear() {
    delete Oe.adapter.root.tcbObject;
  }
}
function Re(e2, t2) {
  switch (e2) {
    case "local":
      return t2.localStorage || new Le();
    case "none":
      return new Le();
    default:
      return t2.sessionStorage || new Le();
  }
}
class Ue {
  constructor(e2) {
    if (!this._storage) {
      this._persistence = Oe.adapter.primaryStorage || e2.persistence, this._storage = Re(this._persistence, Oe.adapter);
      const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = "device_id", a2 = `token_type_${e2.env}`, c2 = `user_info_${e2.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: c2, deviceIdKey: o2, tokenTypeKey: a2 };
    }
  }
  updatePersistence(e2) {
    if (e2 === this._persistence)
      return;
    const t2 = "local" === this._persistence;
    this._persistence = e2;
    const n2 = Re(e2, Oe.adapter);
    for (const e3 in this.keys) {
      const s2 = this.keys[e3];
      if (t2 && Ee.includes(e3))
        continue;
      const r2 = this._storage.getItem(s2);
      ke(r2) || Te(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e2, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e2, r2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e2, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e2);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e2) {
    this._storage.removeItem(e2);
  }
}
const Ne = {}, De = {};
function Me(e2) {
  return Ne[e2];
}
class qe {
  constructor(e2, t2) {
    this.data = t2 || null, this.name = e2;
  }
}
class Ke extends qe {
  constructor(e2, t2) {
    super("error", { error: e2, data: t2 }), this.error = e2;
  }
}
const Fe = new class {
  constructor() {
    this._listeners = {};
  }
  on(e2, t2) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e2, t2, this._listeners), this;
  }
  off(e2, t2) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s2 = n2[e3].indexOf(t3);
        -1 !== s2 && n2[e3].splice(s2, 1);
      }
    }(e2, t2, this._listeners), this;
  }
  fire(e2, t2) {
    if (e2 instanceof Ke)
      return console.error(e2.error), this;
    const n2 = "string" == typeof e2 ? new qe(e2, t2 || {}) : e2;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e2) {
    return this._listeners[e2] && this._listeners[e2].length > 0;
  }
}();
function je(e2, t2) {
  Fe.on(e2, t2);
}
function $e(e2, t2 = {}) {
  Fe.fire(e2, t2);
}
function Be(e2, t2) {
  Fe.off(e2, t2);
}
const We = "loginStateChanged", He = "loginStateExpire", Je = "loginTypeChanged", ze = "anonymousConverted", Ve = "refreshAccessToken";
var Ge;
!function(e2) {
  e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
}(Ge || (Ge = {}));
class Ye {
  constructor() {
    this._fnPromiseMap = /* @__PURE__ */ new Map();
  }
  async run(e2, t2) {
    let n2 = this._fnPromiseMap.get(e2);
    return n2 || (n2 = new Promise(async (n3, s2) => {
      try {
        await this._runIdlePromise();
        const s3 = t2();
        n3(await s3);
      } catch (e3) {
        s2(e3);
      } finally {
        this._fnPromiseMap.delete(e2);
      }
    }), this._fnPromiseMap.set(e2, n2)), n2;
  }
  _runIdlePromise() {
    return Promise.resolve();
  }
}
class Qe {
  constructor(e2) {
    this._singlePromise = new Ye(), this._cache = Me(e2.env), this._baseURL = `https://${e2.env}.ap-shanghai.tcb-api.tencentcloudapi.com`, this._reqClass = new Oe.adapter.reqClass({ timeout: e2.timeout, timeoutMsg: `请求在${e2.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] });
  }
  _getDeviceId() {
    if (this._deviceID)
      return this._deviceID;
    const { deviceIdKey: e2 } = this._cache.keys;
    let t2 = this._cache.getStore(e2);
    return "string" == typeof t2 && t2.length >= 16 && t2.length <= 48 || (t2 = Pe(), this._cache.setStore(e2, t2)), this._deviceID = t2, t2;
  }
  async _request(e2, t2, n2 = {}) {
    const s2 = { "x-request-id": Pe(), "x-device-id": this._getDeviceId() };
    if (n2.withAccessToken) {
      const { tokenTypeKey: e3 } = this._cache.keys, t3 = await this.getAccessToken(), n3 = this._cache.getStore(e3);
      s2.authorization = `${n3} ${t3}`;
    }
    return this._reqClass["get" === n2.method ? "get" : "post"]({ url: `${this._baseURL}${e2}`, data: t2, headers: s2 });
  }
  async _fetchAccessToken() {
    const { loginTypeKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2, tokenTypeKey: s2 } = this._cache.keys, r2 = this._cache.getStore(e2);
    if (r2 && r2 !== Ge.ANONYMOUS)
      throw new se({ code: "INVALID_OPERATION", message: "非匿名登录不支持刷新 access token" });
    const i2 = await this._singlePromise.run("fetchAccessToken", async () => (await this._request("/auth/v1/signin/anonymously", {}, { method: "post" })).data), { access_token: o2, expires_in: a2, token_type: c2 } = i2;
    return this._cache.setStore(s2, c2), this._cache.setStore(t2, o2), this._cache.setStore(n2, Date.now() + 1e3 * a2), o2;
  }
  isAccessTokenExpired(e2, t2) {
    let n2 = true;
    return e2 && t2 && (n2 = t2 < Date.now()), n2;
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
    return this.isAccessTokenExpired(n2, s2) ? this._fetchAccessToken() : n2;
  }
  async refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, loginTypeKey: n2 } = this._cache.keys;
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.setStore(n2, Ge.ANONYMOUS), this.getAccessToken();
  }
  async getUserInfo() {
    return this._singlePromise.run("getUserInfo", async () => (await this._request("/auth/v1/user/me", {}, { withAccessToken: true, method: "get" })).data);
  }
}
const Xe = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Ze = { "X-SDK-Version": "1.3.5" };
function et(e2, t2, n2) {
  const s2 = e2[t2];
  e2[t2] = function(t3) {
    const r2 = {}, i2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: o3 } = n3.call(e2, t3);
      Object.assign(r2, s3), Object.assign(i2, o3);
    });
    const o2 = t3.data;
    return o2 && (() => {
      var e3;
      if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
        t3.data = { ...o2, ...r2 };
      else
        for (const e4 in r2)
          o2.append(e4, r2[e4]);
    })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
  };
}
function tt$1() {
  const e2 = Math.random().toString(16).slice(2);
  return { data: { seqId: e2 }, headers: { ...Ze, "x-seqid": e2 } };
}
class nt {
  constructor(e2 = {}) {
    var t2;
    this.config = e2, this._reqClass = new Oe.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Me(this.config.env), this._localCache = (t2 = this.config.env, De[t2]), this.oauth = new Qe(this.config), et(this._reqClass, "post", [tt$1]), et(this._reqClass, "upload", [tt$1]), et(this._reqClass, "download", [tt$1]);
  }
  async post(e2) {
    return await this._reqClass.post(e2);
  }
  async upload(e2) {
    return await this._reqClass.upload(e2);
  }
  async download(e2) {
    return await this._reqClass.download(e2);
  }
  async refreshAccessToken() {
    let e2, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e2 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t2 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e2;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e2), this._cache.removeStore(t2);
    let i2 = this._cache.getStore(n2);
    if (!i2)
      throw new se({ message: "未登录CloudBase" });
    const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
    if (a2.data.code) {
      const { code: e3 } = a2.data;
      if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
        if (this._cache.getStore(s2) === Ge.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
          const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        $e(He), this._cache.removeStore(n2);
      }
      throw new se({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
    }
    if (a2.data.access_token)
      return $e(Ve), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new se({ message: "refresh token不存在，登录状态异常" });
    let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
  }
  async request(e2, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
    let o2;
    if (-1 === Xe.indexOf(e2) && (this._cache.keys, i2.access_token = await this.oauth.getAccessToken()), "storage.uploadFile" === e2) {
      o2 = new FormData();
      for (let e3 in o2)
        o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", o2 = {};
      for (let e3 in i2)
        void 0 !== i2[e3] && (o2[e3] = i2[e3]);
    }
    let a2 = { headers: { "content-type": r2 } };
    n2 && n2.timeout && (a2.timeout = n2.timeout), n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: h2, search: l2 } = t2;
    let d2 = { env: this.config.env };
    u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
    let p2 = function(e3, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let r3 = "";
      for (let e4 in n3)
        "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
    }(ye, "//tcb-api.tencentcloudapi.com/web", d2);
    l2 && (p2 += l2);
    const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
    if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
      throw new se({ code: "NETWORK_ERROR", message: "network request error" });
    return f2;
  }
  async send(e2, t2 = {}, n2 = {}) {
    const s2 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
    if (("ACCESS_TOKEN_DISABLED" === s2.data.code || "ACCESS_TOKEN_EXPIRED" === s2.data.code) && -1 === Xe.indexOf(e2)) {
      await this.oauth.refreshAccessToken();
      const s3 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
      if (s3.data.code)
        throw new se({ code: s3.data.code, message: Ae(s3.data.message) });
      return s3.data;
    }
    if (s2.data.code)
      throw new se({ code: s2.data.code, message: Ae(s2.data.message) });
    return s2.data;
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
}
const st = {};
function rt(e2) {
  return st[e2];
}
class it {
  constructor(e2) {
    this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env);
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
  setAccessToken(e2, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2);
  }
}
class ot {
  constructor(e2) {
    if (!e2)
      throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._envId = e2, this._cache = Me(this._envId), this._request = rt(this._envId), this.setUserInfo();
  }
  linkWithTicket(e2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "ticket must be string" });
    return this._request.send("auth.linkWithTicket", { ticket: e2 });
  }
  linkWithRedirect(e2) {
    e2.signInWithRedirect();
  }
  updatePassword(e2, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
  }
  updateEmail(e2) {
    return this._request.send("auth.updateEmail", { newEmail: e2 });
  }
  updateUsername(e2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
    return this._request.send("auth.updateUsername", { username: e2 });
  }
  async getLinkedUidList() {
    const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e2;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e2) {
    return this._request.send("auth.setPrimaryUid", { uid: e2 });
  }
  unlink(e2) {
    return this._request.send("auth.unlink", { platform: e2 });
  }
  async update(e2) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const e2 = await this._request.oauth.getUserInfo();
    return this.setLocalUserInfo(e2), e2;
  }
  setUserInfo() {
    const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t2[e3];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2), this.setUserInfo();
  }
}
class at {
  constructor(e2) {
    if (!e2)
      throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._cache = Me(e2);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
    this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new ot(e2);
  }
  get isAnonymousAuth() {
    return this.loginType === Ge.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === Ge.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === Ge.WECHAT || this.loginType === Ge.WECHAT_OPEN || this.loginType === Ge.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class ct extends it {
  async signIn() {
    this._cache.updatePersistence("local"), await this._request.oauth.getAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.ANONYMOUS, persistence: "local" });
    const e2 = new at(this.config.env);
    return await e2.user.refresh(), e2;
  }
  async linkAndRetrieveDataWithTicket(e2) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
    if (i2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), $e(ze, { env: this.config.env }), $e(Je, { loginType: Ge.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
    throw new se({ message: "匿名转化失败" });
  }
  _setAnonymousUUID(e2) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, Ge.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class ut extends it {
  async signIn(e2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "ticket must be a string" });
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new at(this.config.env);
    throw new se({ message: "自定义登录失败" });
  }
}
class ht extends it {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "email must be a string" });
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.EMAIL, persistence: this.config.persistence }), new at(this.config.env);
    throw s2.code ? new se({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new se({ message: "邮箱登录失败" });
  }
  async activate(e2) {
    return this._request.send("auth.activateEndUserMail", { token: e2 });
  }
  async resetPasswordWithToken(e2, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
  }
}
class lt extends it {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
    "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: Ge.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.USERNAME, persistence: this.config.persistence }), new at(this.config.env);
    throw s2.code ? new se({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new se({ message: "用户名密码登录失败" });
  }
}
class dt {
  constructor(e2) {
    this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), je(Je, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e2 = this.hasLoginState();
    return e2 && e2.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new ct(this.config);
  }
  customAuthProvider() {
    return new ut(this.config);
  }
  emailAuthProvider() {
    return new ht(this.config);
  }
  usernameAuthProvider() {
    return new lt(this.config);
  }
  async signInAnonymously() {
    return new ct(this.config).signIn();
  }
  async signInWithEmailAndPassword(e2, t2) {
    return new ht(this.config).signIn(e2, t2);
  }
  signInWithUsernameAndPassword(e2, t2) {
    return new lt(this.config).signIn(e2, t2);
  }
  async linkAndRetrieveDataWithTicket(e2) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new ct(this.config)), je(ze, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
  }
  async signOut() {
    if (this.loginType === Ge.ANONYMOUS)
      throw new se({ message: "匿名用户不支持登出操作" });
    const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
    if (!s2)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), $e(We), $e(Je, { env: this.config.env, loginType: Ge.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e2, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
  }
  async sendPasswordResetEmail(e2) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
  }
  onLoginStateChanged(e2) {
    je(We, () => {
      const t3 = this.hasLoginState();
      e2.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e2.call(this, t2);
  }
  onLoginStateExpired(e2) {
    je(He, e2.bind(this));
  }
  onAccessTokenRefreshed(e2) {
    je(Ve, e2.bind(this));
  }
  onAnonymousConverted(e2) {
    je(ze, e2.bind(this));
  }
  onLoginTypeChanged(e2) {
    je(Je, () => {
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
    return this._request.oauth.isAccessTokenExpired(n2, s2) ? null : new at(this.config.env);
  }
  async isUsernameRegistered(e2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e2) {
    return new ut(this.config).signIn(e2);
  }
  shouldRefreshAccessToken(e2) {
    this._request._shouldRefreshAccessTokenHook = e2.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
  }
  getAuthHeader() {
    const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e2) {
    const { env: t2 } = e2.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e2) {
    const { loginType: t2, persistence: n2, env: s2 } = e2.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const pt = function(e2, t2) {
  t2 = t2 || be();
  const n2 = rt(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
      201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new se({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
    }).catch((e4) => {
      t2(e4);
    });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ft = function(e2, t2) {
  t2 = t2 || be();
  const n2 = rt(this.config.env), { cloudPath: s2 } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    t2(null, e3);
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, gt = function({ fileList: e2 }, t2) {
  if (t2 = t2 || be(), !e2 || !Array.isArray(e2))
    return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
  for (let t3 of e2)
    if (!t3 || "string" != typeof t3)
      return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
  const n2 = { fileid_list: e2 };
  return rt(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, mt = function({ fileList: e2 }, t2) {
  t2 = t2 || be(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
  let n2 = [];
  for (let s3 of e2)
    "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
  const s2 = { file_list: n2 };
  return rt(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, yt = async function({ fileID: e2 }, t2) {
  const n2 = (await mt.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
  if ("SUCCESS" !== n2.code)
    return t2 ? t2(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s2 = rt(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t2)
    return s2.download({ url: r2 });
  t2(await s2.download({ url: r2 }));
}, _t = function({ name: e2, data: t2, query: n2, parse: s2, search: r2, timeout: i2 }, o2) {
  const a2 = o2 || be();
  let c2;
  try {
    c2 = t2 ? JSON.stringify(t2) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e2)
    return Promise.reject(new se({ code: "PARAM_ERROR", message: "函数名不能为空" }));
  const u2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: c2 };
  return rt(this.config.env).send("functions.invokeFunction", u2, { timeout: i2 }).then((e3) => {
    if (e3.code)
      a2(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s2)
        a2(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), a2(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          a2(new se({ message: "response data must be json" }));
        }
    }
    return a2.promise;
  }).catch((e3) => {
    a2(e3);
  }), a2.promise;
}, wt = { timeout: 15e3, persistence: "session" }, vt = {};
class It {
  constructor(e2) {
    this.config = e2 || this.config, this.authObj = void 0;
  }
  init(e2) {
    switch (Oe.adapter || (this.requestClient = new Oe.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...wt, ...e2 }, true) {
      case this.config.timeout > 6e5:
        console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
        break;
      case this.config.timeout < 100:
        console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
    }
    return new It(this.config);
  }
  auth({ persistence: e2 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e2 || Oe.adapter.primaryStorage || wt.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
      const { env: t3 } = e3;
      Ne[t3] = new Ue(e3), De[t3] = new Ue({ ...e3, persistence: "local" });
    }(this.config), n2 = this.config, st[n2.env] = new nt(n2), this.authObj = new dt(this.config), this.authObj;
  }
  on(e2, t2) {
    return je.apply(this, [e2, t2]);
  }
  off(e2, t2) {
    return Be.apply(this, [e2, t2]);
  }
  callFunction(e2, t2) {
    return _t.apply(this, [e2, t2]);
  }
  deleteFile(e2, t2) {
    return gt.apply(this, [e2, t2]);
  }
  getTempFileURL(e2, t2) {
    return mt.apply(this, [e2, t2]);
  }
  downloadFile(e2, t2) {
    return yt.apply(this, [e2, t2]);
  }
  uploadFile(e2, t2) {
    return pt.apply(this, [e2, t2]);
  }
  getUploadMetadata(e2, t2) {
    return ft.apply(this, [e2, t2]);
  }
  registerExtension(e2) {
    vt[e2.name] = e2;
  }
  async invokeExtension(e2, t2) {
    const n2 = vt[e2];
    if (!n2)
      throw new se({ message: `扩展${e2} 必须先注册` });
    return await n2.invoke(t2, this);
  }
  useAdapters(e2) {
    const { adapter: t2, runtime: n2 } = xe(e2) || {};
    t2 && (Oe.adapter = t2), n2 && (Oe.runtime = n2);
  }
}
var St = new It();
function bt(e2, t2, n2) {
  void 0 === n2 && (n2 = {});
  var s2 = /\?/.test(t2), r2 = "";
  for (var i2 in n2)
    "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
  return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
}
class kt {
  get(e2) {
    const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
    return new Promise((e3, i2) => {
      re.request({ url: bt("https:", t2), data: n2, method: "GET", header: s2, timeout: r2, success(t3) {
        e3(t3);
      }, fail(e4) {
        i2(e4);
      } });
    });
  }
  post(e2) {
    const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
    return new Promise((e3, i2) => {
      re.request({ url: bt("https:", t2), data: n2, method: "POST", header: s2, timeout: r2, success(t3) {
        e3(t3);
      }, fail(e4) {
        i2(e4);
      } });
    });
  }
  upload(e2) {
    return new Promise((t2, n2) => {
      const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = re.uploadFile({ url: bt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
      }, fail(e3) {
        n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
        e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const Tt = { setItem(e2, t2) {
  re.setStorageSync(e2, t2);
}, getItem: (e2) => re.getStorageSync(e2), removeItem(e2) {
  re.removeStorageSync(e2);
}, clear() {
  re.clearStorageSync();
} };
var At = { genAdapter: function() {
  return { root: {}, reqClass: kt, localStorage: Tt, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
St.useAdapters(At);
const Pt = St, Ct = Pt.init;
Pt.init = function(e2) {
  e2.env = e2.spaceId;
  const t2 = Ct.call(this, e2);
  t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      var n3;
      t3[e4] = (n3 = t3[e4], function(e5) {
        e5 = e5 || {};
        const { success: t4, fail: s2, complete: r2 } = ne(e5);
        if (!(t4 || s2 || r2))
          return n3.call(this, e5);
        n3.call(this, e5).then((e6) => {
          t4 && t4(e6), r2 && r2(e6);
        }, (e6) => {
          s2 && s2(e6), r2 && r2(e6);
        });
      }).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var xt = Pt;
async function Ot(e2, t2) {
  const n2 = `http://${e2}:${t2}/system/ping`;
  try {
    const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      re.request({ ...s2, success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } });
    }));
    return !(!e3.data || 0 !== e3.data.code);
  } catch (e3) {
    return false;
  }
  var s2;
}
async function Et(e2, t2) {
  let n2;
  for (let s2 = 0; s2 < e2.length; s2++) {
    const r2 = e2[s2];
    if (await Ot(r2, t2)) {
      n2 = r2;
      break;
    }
  }
  return { address: n2, port: t2 };
}
const Lt = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
var Rt = class {
  constructor(e2) {
    if (["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), !e2.endpoint)
      throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
    this.config = Object.assign({}, e2), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = re;
  }
  async request(e2, t2 = true) {
    const n2 = t2;
    return e2 = n2 ? await this.setupLocalRequest(e2) : this.setupRequest(e2), Promise.resolve().then(() => n2 ? this.requestLocal(e2) : fe.wrappedRequest(e2, this.adapter.request));
  }
  requestLocal(e2) {
    return new Promise((t2, n2) => {
      this.adapter.request(Object.assign(e2, { complete(e3) {
        if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
          const t3 = e3.data && e3.data.code || "SYS_ERR", s2 = e3.data && e3.data.message || "request:fail";
          return n2(new se({ code: t3, message: s2 }));
        }
        t2({ success: true, result: e3.data });
      } }));
    });
  }
  setupRequest(e2) {
    const t2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
    n2["x-serverless-sign"] = fe.sign(t2, this.config.clientSecret);
    const s2 = pe();
    n2["x-client-info"] = encodeURIComponent(JSON.stringify(s2));
    const { token: r2 } = oe();
    return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t2, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
  }
  async setupLocalRequest(e2) {
    const t2 = pe(), { token: n2 } = oe(), s2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t2, token: n2 }), { address: r2, servePort: i2 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await Et(r2, i2);
    return { url: `http://${o2}:${i2}/${Lt[e2.method]}`, method: "POST", data: s2, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request(t2, false);
  }
  getUploadFileOptions(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(t2);
  }
  reportUploadFile(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(t2);
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new se({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
    let r2;
    return this.getUploadFileOptions({ cloudPath: t2 }).then((t3) => {
      const { url: i2, formData: o2, name: a2 } = t3.result;
      return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
        const c2 = this.adapter.uploadFile({ url: i2, formData: o2, name: a2, filePath: e2, fileType: n2, success(e3) {
          e3 && e3.statusCode < 400 ? t4(e3) : r3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          r3(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof s2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          s2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }).then(() => this.reportUploadFile({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
    return this.request(t2).then((e3) => {
      if (e3.success)
        return e3.result;
      throw new se({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
    });
  }
  getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
    return this.request(n2).then((e3) => {
      if (e3.success)
        return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
      throw new se({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
    });
  }
};
var Ut = { init(e2) {
  const t2 = new Rt(e2), n2 = { signInAnonymously: function() {
    return Promise.resolve();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} }, Nt = n(function(e2, t2) {
  e2.exports = r.enc.Hex;
});
function Dt() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
    var t2 = 16 * Math.random() | 0;
    return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
  });
}
function Mt(e2 = "", t2 = {}) {
  const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = String(Date.now()), u2 = Dt(), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
    const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = Ie(e3.body).toString(Nt), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = Ie(r3).toString(Nt), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = Se(o3, e3.secretKey).toString(Nt);
    return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
  }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
  return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
}
function qt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {}, timeout: r2 }) {
  return new Promise((i2, o2) => {
    re.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", timeout: r2, complete: (e3 = {}) => {
      const t3 = s2["x-trace-id"] || "";
      if (!e3.statusCode || e3.statusCode >= 400) {
        const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
        return o2(new se({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
      }
      i2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
    } });
  });
}
function Kt(e2, t2) {
  const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Mt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
  return qt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
    const t3 = e3.data || {};
    if (!t3.success)
      throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    return t3.data || {};
  }).catch((e3) => {
    throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
  });
}
function Ft(e2 = "") {
  const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
  if (n2 <= 0)
    throw new se({ code: "INVALID_PARAM", message: "fileID不合法" });
  const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
  return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
}
function jt(e2 = "") {
  return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
}
class $t {
  constructor(e2) {
    this.config = e2;
  }
  signedURL(e2, t2 = {}) {
    const n2 = `/ws/function/${e2}`, s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Dt(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
      return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
    }).filter(Boolean).join("&"), `host:${s2}`].join("\n"), o2 = ["HMAC-SHA256", Ie(i2).toString(Nt)].join("\n"), a2 = Se(o2, this.config.secretKey).toString(Nt), c2 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
    return `${this.config.wsEndpoint}${n2}?${c2}&signature=${a2}`;
  }
}
var Bt = class {
  constructor(e2) {
    if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), e2.endpoint) {
      if ("string" != typeof e2.endpoint)
        throw new Error("endpoint must be string");
      if (!/^https:\/\//.test(e2.endpoint))
        throw new Error("endpoint must start with https://");
      e2.endpoint = e2.endpoint.replace(/\/$/, "");
    }
    this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e2.wsEndpoint || `wss://${e2.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new $t(this.config);
  }
  callFunction(e2) {
    return function(e3, t2) {
      const { name: n2, data: s2, async: r2 = false, timeout: i2 } = e3, o2 = "POST", a2 = { "x-to-function-name": n2 };
      r2 && (a2["x-function-invoke-type"] = "async");
      const { url: c2, headers: u2 } = Mt("/functions/invokeFunction", { functionName: n2, data: s2, method: o2, headers: a2, signHeaderKeys: ["x-to-function-name"], config: t2 });
      return qt({ url: c2, data: s2, method: o2, headers: u2, timeout: i2 }).then((e4) => {
        let t3 = 0;
        if (r2) {
          const n3 = e4.data || {};
          t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
        }
        if (0 !== t3)
          throw new se({ code: t3, message: e4.errMsg, requestId: e4.requestId });
        return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
      }).catch((e4) => {
        throw new se({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
      });
    }(e2, this.config);
  }
  uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
    return new Promise((i2, o2) => {
      const a2 = re.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : o2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        o2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
        r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
    if ("string" !== f(t2))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const r2 = await Kt({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
    return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
  }
  async getTempFileURL({ fileList: e2 }) {
    return new Promise((t2, n2) => {
      (!e2 || e2.length < 0) && t2({ code: "INVALID_PARAM", message: "fileList不能为空数组" }), e2.length > 50 && t2({ code: "INVALID_PARAM", message: "fileList数组长度不能超过50" });
      const s2 = [];
      for (const n3 of e2) {
        let e3;
        "string" !== f(n3) && t2({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
        try {
          e3 = Ft.call(this, n3);
        } catch (t3) {
          console.warn(t3.errCode, t3.errMsg), e3 = n3;
        }
        s2.push({ file_id: e3, expire: 600 });
      }
      Kt({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
        const { file_list: n3 = [] } = e3;
        t2({ fileList: n3.map((e4) => ({ fileID: jt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
      }).catch((e3) => n2(e3));
    });
  }
  async connectWebSocket(e2) {
    const { name: t2, query: n2 } = e2;
    return re.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
    } });
  }
};
var Wt = { init: (e2) => {
  e2.provider = "alipay";
  const t2 = new Bt(e2);
  return t2.auth = function() {
    return { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(true);
    } };
  }, t2;
} };
function Ht({ data: e2 }) {
  let t2;
  t2 = pe();
  const n2 = JSON.parse(JSON.stringify(e2 || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e3 } = oe();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
async function Jt(e2 = {}) {
  await this.__dev__.initLocalNetwork();
  const { localAddress: t2, localPort: n2 } = this.__dev__, s2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${t2}:${n2}/system/check-function`, o2 = `http://${t2}:${n2}/cloudfunctions/${e2.name}`;
  return new Promise((t3, n3) => {
    re.request({ method: "POST", url: i2, data: { name: e2.name, platform: A, provider: s2, spaceId: r2 }, timeout: 3e3, success(e3) {
      t3(e3);
    }, fail() {
      t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
    } });
  }).then(({ data: e3 } = {}) => {
    const { code: t3, message: n3 } = e3 || {};
    return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
  }).then(({ code: t3, message: n3 }) => {
    if (0 !== t3) {
      switch (t3) {
        case "MODULE_ENCRYPTED":
          console.error(`此云函数（${e2.name}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "FUNCTION_ENCRYPTED":
          console.error(`此云函数（${e2.name}）已加密不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "ACTION_ENCRYPTED":
          console.error(n3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
          break;
        case "NETWORK_ERROR":
          console.error(n3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
          break;
        case "SWITCH_TO_CLOUD":
          break;
        default: {
          const e3 = `检测本地调试服务出现错误：${n3}，请检查网络环境或重启客户端再试`;
          throw console.error(e3), new Error(e3);
        }
      }
      return this._callCloudFunction(e2);
    }
    return new Promise((t4, n4) => {
      const r3 = Ht.call(this, { data: e2.data });
      re.request({ method: "POST", url: o2, data: { provider: s2, platform: A, param: r3 }, timeout: e2.timeout, success: ({ statusCode: e3, data: s3 } = {}) => !e3 || e3 >= 400 ? n4(new se({ code: s3.code || "SYS_ERR", message: s3.message || "request:fail" })) : t4({ result: s3 }), fail(e3) {
        n4(new se({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
      } });
    });
  });
}
const zt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
var Vt = /[\\^$.*+?()[\]{}|]/g, Gt = RegExp(Vt.source);
function Yt(e2, t2, n2) {
  return e2.replace(new RegExp((s2 = t2) && Gt.test(s2) ? s2.replace(Vt, "\\$&") : s2, "g"), n2);
  var s2;
}
const Xt = "request", Zt = "response", en = "both";
const Mn = { code: 2e4, message: "System error" }, qn = { code: 20101, message: "Invalid client" };
function jn(e2) {
  const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
  return new se({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || Mn.code, message: r2 || o2, cause: a2 });
}
let Bn;
function Vn({ secretType: e2 } = {}) {
  return e2 === Xt || e2 === Zt || e2 === en;
}
function Gn({ name: e2, data: t2 = {} } = {}) {
  return "app" === A;
}
function Yn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
  const { appId: s2, uniPlatform: r2, osName: i2 } = he();
  let o2 = r2;
  "app" === r2 && (o2 = i2);
  const a2 = function({ provider: e3, spaceId: t3 } = {}) {
    const n3 = T;
    if (!n3)
      return {};
    e3 = /* @__PURE__ */ function(e4) {
      return "tencent" === e4 ? "tcb" : e4;
    }(e3);
    const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
    return s3 && s3.config;
  }({ provider: e2, spaceId: t2 });
  if (!a2 || !a2.accessControl || !a2.accessControl.enable)
    return false;
  const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
  if (0 === u2.length)
    return true;
  const h2 = function(e3, t3) {
    let n3, s3, r3;
    for (let i3 = 0; i3 < e3.length; i3++) {
      const o3 = e3[i3];
      o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
    }
    return n3 || s3 || r3;
  }(u2, n2);
  if (!h2)
    return false;
  if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
    return true;
  throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), jn(qn);
}
function Qn({ functionName: e2, result: t2, logPvd: n2 }) {
  if (this.__dev__.debugLog && t2 && t2.requestId) {
    const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
    console.log(`[${n2}-request]${s2}[/${n2}-request]`);
  }
}
function Xn(e2) {
  const t2 = e2.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = Ht.call(e2, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i2 = Vn(n3), o2 = Gn(n3), a2 = i2 || o2;
    return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
        if (!a3)
          continue;
        let c2 = i3;
        for (let e5 = 1; e5 < a3.length; e5++)
          c2 = Yt(c2, `{$${e5}}`, a3[e5]);
        for (const e5 in t3)
          c2 = Yt(c2, `{${e5}}`, t3[e5]);
        return "replace" === o3 ? c2 : e4 + c2;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: zt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
  };
  e2.callFunction = function(t3) {
    const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
    let o2, a2;
    if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && C ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Jt), o2 = Jt) : o2 = n2, o2 = o2.bind(e2), Gn(t3))
      ;
    else if (function({ name: e3, data: t4 = {} }) {
      return "uni-id-co" === e3 && "secureNetworkHandshakeByWeixin" === t4.method;
    }(t3))
      a2 = o2.call(e2, t3);
    else if (Vn(t3)) {
      a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
    } else if (Yn({ provider: s2, spaceId: r2, functionName: i2 })) {
      a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
    } else
      a2 = o2(t3);
    return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && "undefined" != typeof UTS && (e3.result = UTS.JSON.parse(JSON.stringify(e3.result))), e3));
  };
}
Bn = class {
  constructor() {
    throw jn({ message: `Platform ${A} is not enabled, please check whether secure network module is enabled in your manifest.json` });
  }
};
const Zn = Symbol("CLIENT_DB_INTERNAL");
function es(e2, t2) {
  return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Zn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
    if ("_uniClient" === n2)
      return null;
    if ("symbol" == typeof n2)
      return e3[n2];
    if (n2 in e3 || "string" != typeof n2) {
      const t3 = e3[n2];
      return "function" == typeof t3 ? t3.bind(e3) : t3;
    }
    return t2.get(e3, n2, s2);
  } });
}
function ts(e2) {
  return { on: (t2, n2) => {
    e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
  }, off: (t2, n2) => {
    e2[t2] = e2[t2] || [];
    const s2 = e2[t2].indexOf(n2);
    -1 !== s2 && e2[t2].splice(s2, 1);
  } };
}
const ns = ["db.Geo", "db.command", "command.aggregate"];
function ss(e2, t2) {
  return ns.indexOf(`${e2}.${t2}`) > -1;
}
function rs(e2) {
  switch (f(e2 = ie(e2))) {
    case "array":
      return e2.map((e3) => rs(e3));
    case "object":
      return e2._internalType === Zn || Object.keys(e2).forEach((t2) => {
        e2[t2] = rs(e2[t2]);
      }), e2;
    case "regexp":
      return { $regexp: { source: e2.source, flags: e2.flags } };
    case "date":
      return { $date: e2.toISOString() };
    default:
      return e2;
  }
}
function is(e2) {
  return e2 && e2.content && e2.content.$method;
}
class os {
  constructor(e2, t2, n2) {
    this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e2 = this;
    const t2 = [e2.content];
    for (; e2.prevStage; )
      e2 = e2.prevStage, t2.push(e2.content);
    return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: rs(e3.$param) })) };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  getAction() {
    const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
    return e2 && e2.$param && e2.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
  }
  get isAggregate() {
    let e2 = this;
    for (; e2; ) {
      const t2 = is(e2), n2 = is(e2.prevStage);
      if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isCommand() {
    let e2 = this;
    for (; e2; ) {
      if ("command" === is(e2))
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isAggregateCommand() {
    let e2 = this;
    for (; e2; ) {
      const t2 = is(e2), n2 = is(e2.prevStage);
      if ("aggregate" === t2 && "command" === n2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  getNextStageFn(e2) {
    const t2 = this;
    return function() {
      return as({ $method: e2, $param: rs(Array.from(arguments)) }, t2, t2._database);
    };
  }
  get count() {
    return this.isAggregate ? this.getNextStageFn("count") : function() {
      return this._send("count", Array.from(arguments));
    };
  }
  get remove() {
    return this.isCommand ? this.getNextStageFn("remove") : function() {
      return this._send("remove", Array.from(arguments));
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  get add() {
    return this.isCommand ? this.getNextStageFn("add") : function() {
      return this._send("add", Array.from(arguments));
    };
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  get set() {
    return this.isCommand ? this.getNextStageFn("set") : function() {
      throw new Error("JQL禁止使用set方法");
    };
  }
  _send(e2, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e2, $param: rs(t2) }), S) {
      const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
      t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
    }
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function as(e2, t2, n2) {
  return es(new os(e2, t2, n2), { get(e3, t3) {
    let s2 = "db";
    return e3 && e3.content && (s2 = e3.content.$method), ss(s2, t3) ? as({ $method: t3 }, e3, n2) : function() {
      return as({ $method: t3, $param: rs(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function cs({ path: e2, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
  };
}
function us(e2, t2 = {}) {
  return es(new e2(t2), { get: (e3, t3) => ss("db", t3) ? as({ $method: t3 }, null, e3) : function() {
    return as({ $method: t3, $param: rs(Array.from(arguments)) }, null, e3);
  } });
}
class hs extends class {
  constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
    this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = R("_globalUniCloudDatabaseCallback")), t2 || (this.auth = ts(this._authCallBacks)), this._isJQL = t2, Object.assign(this, ts(this._dbCallBacks)), this.env = es({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = es({}, { get: (e3, t3) => cs({ path: ["Geo"], method: t3 }) }), this.serverDate = cs({ path: [], method: "serverDate" }), this.RegExp = cs({ path: [], method: "RegExp" });
  }
  getCloudEnv(e2) {
    if ("string" != typeof e2 || !e2.trim())
      throw new Error("getCloudEnv参数错误");
    return { $env: e2.replace("$cloudEnv_", "") };
  }
  _callback(e2, t2) {
    const n2 = this._dbCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  _callbackAuth(e2, t2) {
    const n2 = this._authCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  multiSend() {
    const e2 = Array.from(arguments), t2 = e2.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
        throw new Error("multiSend只支持子命令内使用getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
  }
} {
  _parseResult(e2) {
    return this._isJQL ? e2.result : e2;
  }
  _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
    function r2(e3, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const r3 = s2[n3];
          r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
    function a2(e3) {
      return i2._callback("error", [e3]), K(F(o2, "fail"), e3).then(() => K(F(o2, "complete"), e3)).then(() => (r2(null, e3), X(B, { type: J, content: e3 }), Promise.reject(e3)));
    }
    const c2 = K(F(o2, "invoke")), u2 = this._uniClient;
    return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
      if (u3)
        for (let e4 = 0; e4 < u3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console[t4] || console.log;
          let i3 = "[System Info]" + n4;
          s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
        }
      if (t3) {
        return a2(new se({ code: t3, message: n3, requestId: e3.requestId }));
      }
      e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ae({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), X(H, { token: s3, tokenExpired: c3 }));
      const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
      for (let t4 = 0; t4 < h2.length; t4++) {
        const { prop: n4, tips: s4 } = h2[t4];
        if (n4 in e3.result) {
          const t5 = e3.result[n4];
          Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
        }
      }
      return function(e4) {
        return K(F(o2, "success"), e4).then(() => K(F(o2, "complete"), e4)).then(() => {
          r2(e4, null);
          const t4 = i2._parseResult(e4);
          return X(B, { type: J, content: t4 }), Promise.resolve(t4);
        });
      }(e3);
    }, (e3) => {
      /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
      return a2(new se({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
    });
  }
}
const ls = "token无效，跳转登录页面", ds = "token过期，跳转登录页面", ps = { TOKEN_INVALID_TOKEN_EXPIRED: ds, TOKEN_INVALID_INVALID_CLIENTID: ls, TOKEN_INVALID: ls, TOKEN_INVALID_WRONG_TOKEN: ls, TOKEN_INVALID_ANONYMOUS_USER: ls }, fs = { "uni-id-token-expired": ds, "uni-id-check-token-failed": ls, "uni-id-token-not-exist": ls, "uni-id-check-device-feature-failed": ls };
function gs(e2, t2) {
  let n2 = "";
  return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
}
function ms(e2 = [], t2 = "") {
  const n2 = [], s2 = [];
  return e2.forEach((e3) => {
    true === e3.needLogin ? n2.push(gs(t2, e3.path)) : false === e3.needLogin && s2.push(gs(t2, e3.path));
  }), { needLoginPage: n2, notNeedLoginPage: s2 };
}
function ys(e2) {
  return e2.split("?")[0].replace(/^\//, "");
}
function _s() {
  return function(e2) {
    let t2 = e2 && e2.$page && e2.$page.fullPath || "";
    return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
  }(function() {
    const e2 = getCurrentPages();
    return e2[e2.length - 1];
  }());
}
function ws() {
  return ys(_s());
}
function vs(e2 = "", t2 = {}) {
  if (!e2)
    return false;
  if (!(t2 && t2.list && t2.list.length))
    return false;
  const n2 = t2.list, s2 = ys(e2);
  return n2.some((e3) => e3.pagePath === s2);
}
const Is = !!e.uniIdRouter;
const { loginPage: Ss, routerNeedLogin: bs, resToLogin: ks$1, needLoginPage: Ts, notNeedLoginPage: As, loginPageInTabBar: Ps } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
  const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = ms(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
    const t3 = [], n3 = [];
    return e2.forEach((e3) => {
      const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = ms(r3, s3);
      t3.push(...i3), n3.push(...o3);
    }), { needLoginPage: t3, notNeedLoginPage: n3 };
  }(n2);
  return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: vs(i2, r2) };
}();
if (Ts.indexOf(Ss) > -1)
  throw new Error(`Login page [${Ss}] should not be "needLogin", please check your pages.json`);
function Cs(e2) {
  const t2 = ws();
  if ("/" === e2.charAt(0))
    return e2;
  const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
  i2.pop();
  for (let e3 = 0; e3 < r2.length; e3++) {
    const t3 = r2[e3];
    ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
  }
  return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
}
function xs(e2) {
  const t2 = ys(Cs(e2));
  return !(As.indexOf(t2) > -1) && (Ts.indexOf(t2) > -1 || bs.some((t3) => function(e3, t4) {
    return new RegExp(t4).test(e3);
  }(e2, t3)));
}
function Os({ redirect: e2 }) {
  const t2 = ys(e2), n2 = ys(Ss);
  return ws() !== n2 && t2 !== n2;
}
function Es({ api: e2, redirect: t2 } = {}) {
  if (!t2 || !Os({ redirect: t2 }))
    return;
  const n2 = function(e3, t3) {
    return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
  }(Ss, t2);
  Ps ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
  const s2 = { navigateTo: index.navigateTo, redirectTo: index.redirectTo, switchTab: index.switchTab, reLaunch: index.reLaunch };
  setTimeout(() => {
    s2[e2]({ url: n2 });
  }, 0);
}
function Ls({ url: e2 } = {}) {
  const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
    const { token: e3, tokenExpired: t3 } = oe();
    let n3;
    if (e3) {
      if (t3 < Date.now()) {
        const e4 = "uni-id-token-expired";
        n3 = { errCode: e4, errMsg: fs[e4] };
      }
    } else {
      const e4 = "uni-id-check-token-failed";
      n3 = { errCode: e4, errMsg: fs[e4] };
    }
    return n3;
  }();
  if (xs(e2) && n2) {
    n2.uniIdRedirectUrl = e2;
    if (G(W).length > 0)
      return setTimeout(() => {
        X(W, n2);
      }, 0), t2.abortLoginPageJump = true, t2;
    t2.autoToLoginPage = true;
  }
  return t2;
}
function Rs() {
  !function() {
    const e3 = _s(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = Ls({ url: e3 });
    t2 || n2 && Es({ api: "redirectTo", redirect: e3 });
  }();
  const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  for (let t2 = 0; t2 < e2.length; t2++) {
    const n2 = e2[t2];
    index.addInterceptor(n2, { invoke(e3) {
      const { abortLoginPageJump: t3, autoToLoginPage: s2 } = Ls({ url: e3.url });
      return t3 ? e3 : s2 ? (Es({ api: n2, redirect: Cs(e3.url) }), false) : e3;
    } });
  }
}
function Us() {
  this.onResponse((e2) => {
    const { type: t2, content: n2 } = e2;
    let s2 = false;
    switch (t2) {
      case "cloudobject":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in fs;
        }(n2);
        break;
      case "clientdb":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in ps;
        }(n2);
    }
    s2 && function(e3 = {}) {
      const t3 = G(W);
      te().then(() => {
        const n3 = _s();
        if (n3 && Os({ redirect: n3 }))
          return t3.length > 0 ? X(W, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (Ss && Es({ api: "navigateTo", redirect: n3 }));
      });
    }(n2);
  });
}
function Ns(e2) {
  !function(e3) {
    e3.onResponse = function(e4) {
      Y(B, e4);
    }, e3.offResponse = function(e4) {
      Q(B, e4);
    };
  }(e2), function(e3) {
    e3.onNeedLogin = function(e4) {
      Y(W, e4);
    }, e3.offNeedLogin = function(e4) {
      Q(W, e4);
    }, Is && (R("_globalUniCloudStatus").needLoginInit || (R("_globalUniCloudStatus").needLoginInit = true, te().then(() => {
      Rs.call(e3);
    }), ks$1 && Us.call(e3)));
  }(e2), function(e3) {
    e3.onRefreshToken = function(e4) {
      Y(H, e4);
    }, e3.offRefreshToken = function(e4) {
      Q(H, e4);
    };
  }(e2);
}
let Ds;
const Ms = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", qs = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function Ks() {
  const e2 = oe().token || "", t2 = e2.split(".");
  if (!e2 || 3 !== t2.length)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Ds(s2).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
Ds = "function" != typeof atob ? function(e2) {
  if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !qs.test(e2))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e2 += "==".slice(2 - (3 & e2.length));
  for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
    t2 = Ms.indexOf(e2.charAt(i2++)) << 18 | Ms.indexOf(e2.charAt(i2++)) << 12 | (n2 = Ms.indexOf(e2.charAt(i2++))) << 6 | (s2 = Ms.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return r2;
} : atob;
var Fs = n(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function r2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
    return t3.then((e4) => {
      if (s3) {
        const t4 = s3(e4);
        if (void 0 !== t4)
          return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
      }
      return e4;
    }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const i3 = t5.tempFiles, o2 = i3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= o2)
            return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u2 = i3[s5];
          e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
          } }).then((e5) => {
            u2.url = e5.fileID, s5 < o2 && c2();
          }).catch((e5) => {
            u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
          });
        }
      });
    }(e3, t4, 5, r3));
  }
  t2.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return "image" === t3.type ? i2(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
        return new Promise((e5, a2) => {
          index.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
            e5(r2(t5, "image"));
          }, fail(e6) {
            a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
        return new Promise((e5, c2) => {
          index.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
            e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : i2(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, i3) => {
          let o2 = index.chooseFile;
          if ("undefined" != typeof wx$1 && "function" == typeof wx$1.chooseMessageFile && (o2 = wx$1.chooseMessageFile), "function" != typeof o2)
            return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
          o2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(r2(t5));
          }, fail(e6) {
            i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}), js = t(Fs);
const $s = "manual";
function Bs(e2) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e3.push(this[t2]);
      }), e3;
    }, (e3, t2) => {
      if (this.loadtime === $s)
        return;
      let n2 = false;
      const s2 = [];
      for (let r2 = 2; r2 < e3.length; r2++)
        e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
      e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t2) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = i2, t2 && t2(i2);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2;
    t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const r2 = t2.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const i2 = t2.where || this.where;
    i2 && Object.keys(i2).length && (n2 = n2.where(i2));
    const o2 = t2.field || this.field;
    o2 && (n2 = n2.field(o2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
    const h2 = t2.orderby || this.orderby;
    h2 && (n2 = n2.orderBy(h2));
    const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
    return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
  } } };
}
function Ws(e2) {
  return function(t2, n2 = {}) {
    n2 = function(e3, t3 = {}) {
      return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
    }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
    return new Proxy({}, { get(s3, c2) {
      switch (c2) {
        case "toString":
          return "[object UniCloudObject]";
        case "toJSON":
          return {};
      }
      return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await K(F(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await K(F(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e4) {
            throw o3 = e4, await K(F(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await K(F(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...h2) {
        let l2;
        a2 && index.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
        "object" == typeof n2.secretMethods && function(e3, t3) {
          const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let p2 = false;
        try {
          l2 = await e2.callFunction(d2);
        } catch (e3) {
          p2 = true, l2 = { result: new se(e3) };
        }
        const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
        if (a2 && index.hideLoading(), y2 && y2.token && y2.tokenExpired && (ae(y2), X(H, { ...y2 })), g2) {
          let e3 = m2;
          if (p2 && o2) {
            e3 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              index.showToast({ title: e3, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    index.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                      i3(e5);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                if (i2.retry && t3)
                  return s4(...h2);
              }
            }
          const n3 = new se({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
          throw n3.detail = l2.result, X(B, { type: V, content: n3 }), n3;
        }
        return X(B, { type: V, content: l2.result }), l2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
        return { objectName: t2, methodName: c2, params: e3 };
      } });
    } });
  };
}
function Hs(e2) {
  return R("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
}
async function Js({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
  const n2 = Hs(this);
  if (e2 && t2)
    throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");
  if (e2)
    return n2.mpWeixinOpenid = e2, {};
  const s2 = await new Promise((e3, t3) => {
    index.login({ success(t4) {
      e3(t4.code);
    }, fail(e4) {
      t3(new Error(e4.errMsg));
    } });
  }), r2 = this.importObject("uni-id-co", { customUI: true });
  return await r2.secureNetworkHandshakeByWeixin({ code: s2, callLoginByWeixin: t2 }), n2.mpWeixinCode = s2, { code: s2 };
}
async function zs(e2) {
  const t2 = Hs(this);
  return t2.initPromise || (t2.initPromise = Js.call(this, e2).then((e3) => e3).catch((e3) => {
    throw delete t2.initPromise, e3;
  })), t2.initPromise;
}
function Vs(e2) {
  return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
    return zs.call(e2, { openid: t2, callLoginByWeixin: n2 });
  };
}
function Gs(e2) {
  !function(e3) {
    de = e3;
  }(e2);
}
function Ys(e2) {
  const t2 = { getSystemInfo: index.getSystemInfo, getPushClientId: index.getPushClientId };
  return function(n2) {
    return new Promise((s2, r2) => {
      t2[e2]({ ...n2, success(e3) {
        s2(e3);
      }, fail(e3) {
        r2(e3);
      } });
    });
  };
}
class Qs extends class {
  constructor() {
    this._callback = {};
  }
  addListener(e2, t2) {
    this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
  }
  on(e2, t2) {
    return this.addListener(e2, t2);
  }
  removeListener(e2, t2) {
    if (!t2)
      throw new Error('The "listener" argument must be of type function. Received undefined');
    const n2 = this._callback[e2];
    if (!n2)
      return;
    const s2 = function(e3, t3) {
      for (let n3 = e3.length - 1; n3 >= 0; n3--)
        if (e3[n3] === t3)
          return n3;
      return -1;
    }(n2, t2);
    n2.splice(s2, 1);
  }
  off(e2, t2) {
    return this.removeListener(e2, t2);
  }
  removeAllListener(e2) {
    delete this._callback[e2];
  }
  emit(e2, ...t2) {
    const n2 = this._callback[e2];
    if (n2)
      for (let e3 = 0; e3 < n2.length; e3++)
        n2[e3](...t2);
  }
} {
  constructor() {
    super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
  }
  init() {
    return Promise.all([Ys("getSystemInfo")(), Ys("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
      if (!e2)
        throw new Error("Invalid appId, please check the manifest.json file");
      if (!t2)
        throw new Error("Invalid push client id");
      this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
    }, (e2) => {
      throw this.emit("error", e2), this.close(), e2;
    });
  }
  async open() {
    return this.init();
  }
  _isUniCloudSSE(e2) {
    if ("receive" !== e2.type)
      return false;
    const t2 = e2 && e2.data && e2.data.payload;
    return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
  }
  _receivePushMessage(e2) {
    if (!this._isUniCloudSSE(e2))
      return;
    const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
    this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
  }
  _consumMessage() {
    for (; ; ) {
      const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
      if (!e2)
        break;
      this._currentMessageId++, this._parseMessagePayload(e2);
    }
  }
  _parseMessagePayload(e2) {
    const { action: t2, messageId: n2, message: s2 } = e2;
    "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
  }
  _appendMessage({ messageId: e2, message: t2 } = {}) {
    this.emit("message", t2);
  }
  _end({ messageId: e2, message: t2 } = {}) {
    this.emit("end", t2), this.close();
  }
  _initMessageListener() {
    index.onPushMessage(this._uniPushMessageCallback);
  }
  _destroy() {
    index.offPushMessage(this._uniPushMessageCallback);
  }
  toJSON() {
    return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
  }
  close() {
    this._destroy(), this.emit("close");
  }
}
async function Xs(e2) {
  const t2 = e2.__dev__;
  if (!t2.debugInfo)
    return;
  const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await Et(n2, s2);
  if (r2)
    return t2.localAddress = r2, void (t2.localPort = s2);
  const i2 = console["warn"];
  let o2 = "";
  if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === A.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
    throw new Error(o2);
  i2(o2);
}
function Zs(e2) {
  e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e3) => {
      setTimeout(() => {
        e3();
      }, n2);
    });
    const s2 = e2.auth();
    return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
  } }));
}
const er = { tcb: xt, tencent: xt, aliyun: me, private: Ut, dcloud: Ut, alipay: Wt };
let tr = new class {
  init(e2) {
    let t2 = {};
    const n2 = er[e2.provider];
    if (!n2)
      throw new Error("未提供正确的provider参数");
    t2 = n2.init(e2), function(e3) {
      const t3 = {};
      e3.__dev__ = t3, t3.debugLog = "mp-harmony" === A;
      const n3 = P;
      n3 && !n3.code && (t3.debugInfo = n3);
      const s2 = new v({ createPromise: function() {
        return Xs(e3);
      } });
      t3.initLocalNetwork = function() {
        return s2.exec();
      };
    }(t2), Zs(t2), Xn(t2), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t2), function(e3) {
      e3.database = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).database();
        if (this._database)
          return this._database;
        const n3 = us(hs, { uniClient: e3 });
        return this._database = n3, n3;
      }, e3.databaseForJQL = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).databaseForJQL();
        if (this._databaseForJQL)
          return this._databaseForJQL;
        const n3 = us(hs, { uniClient: e3, isJQL: true });
        return this._databaseForJQL = n3, n3;
      };
    }(t2), function(e3) {
      e3.getCurrentUserInfo = Ks, e3.chooseAndUploadFile = js.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
        return Bs(e3);
      } }), e3.SSEChannel = Qs, e3.initSecureNetworkByWeixin = Vs(e3), e3.setCustomClientInfo = Gs, e3.importObject = Ws(e3);
    }(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t2[e3])
        return;
      const n3 = t2[e3];
      t2[e3] = function() {
        return n3.apply(t2, Array.from(arguments));
      }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
        return function(n4) {
          let s2 = false;
          if ("callFunction" === t3) {
            const e5 = n4 && n4.type || c;
            s2 = e5 !== c;
          }
          const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
          n4 = n4 || {};
          const { success: o2, fail: a2, complete: u2 } = ne(n4), h2 = i2.then(() => s2 ? Promise.resolve() : K(F(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : K(F(t3, "success"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (r2 && X(B, { type: z, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : K(F(t3, "fail"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (X(B, { type: z, content: e5 }), Promise.reject(e5))));
          if (!(o2 || a2 || u2))
            return h2;
          h2.then((e5) => {
            o2 && o2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
          }, (e5) => {
            a2 && a2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
          });
        };
      }(t2[e3], e3)).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  const e2 = C;
  let t2 = {};
  if (e2 && 1 === e2.length)
    t2 = e2[0], tr = tr.init(t2), tr._isDefault = true;
  else {
    const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
    let n2;
    n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
      tr[e3] = function() {
        return console.error(n2), Promise.reject(new se({ code: "SYS_ERR", message: n2 }));
      };
    });
  }
  if (Object.assign(tr, { get mixinDatacom() {
    return Bs(tr);
  } }), Ns(tr), tr.addInterceptor = M, tr.removeInterceptor = q, tr.interceptObject = j, "web" === A)
    ;
})();
var nr = tr;
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
const fontData = [
  {
    "font_class": "arrow-down",
    "unicode": ""
  },
  {
    "font_class": "arrow-left",
    "unicode": ""
  },
  {
    "font_class": "arrow-right",
    "unicode": ""
  },
  {
    "font_class": "arrow-up",
    "unicode": ""
  },
  {
    "font_class": "auth",
    "unicode": ""
  },
  {
    "font_class": "auth-filled",
    "unicode": ""
  },
  {
    "font_class": "back",
    "unicode": ""
  },
  {
    "font_class": "bars",
    "unicode": ""
  },
  {
    "font_class": "calendar",
    "unicode": ""
  },
  {
    "font_class": "calendar-filled",
    "unicode": ""
  },
  {
    "font_class": "camera",
    "unicode": ""
  },
  {
    "font_class": "camera-filled",
    "unicode": ""
  },
  {
    "font_class": "cart",
    "unicode": ""
  },
  {
    "font_class": "cart-filled",
    "unicode": ""
  },
  {
    "font_class": "chat",
    "unicode": ""
  },
  {
    "font_class": "chat-filled",
    "unicode": ""
  },
  {
    "font_class": "chatboxes",
    "unicode": ""
  },
  {
    "font_class": "chatboxes-filled",
    "unicode": ""
  },
  {
    "font_class": "chatbubble",
    "unicode": ""
  },
  {
    "font_class": "chatbubble-filled",
    "unicode": ""
  },
  {
    "font_class": "checkbox",
    "unicode": ""
  },
  {
    "font_class": "checkbox-filled",
    "unicode": ""
  },
  {
    "font_class": "checkmarkempty",
    "unicode": ""
  },
  {
    "font_class": "circle",
    "unicode": ""
  },
  {
    "font_class": "circle-filled",
    "unicode": ""
  },
  {
    "font_class": "clear",
    "unicode": ""
  },
  {
    "font_class": "close",
    "unicode": ""
  },
  {
    "font_class": "closeempty",
    "unicode": ""
  },
  {
    "font_class": "cloud-download",
    "unicode": ""
  },
  {
    "font_class": "cloud-download-filled",
    "unicode": ""
  },
  {
    "font_class": "cloud-upload",
    "unicode": ""
  },
  {
    "font_class": "cloud-upload-filled",
    "unicode": ""
  },
  {
    "font_class": "color",
    "unicode": ""
  },
  {
    "font_class": "color-filled",
    "unicode": ""
  },
  {
    "font_class": "compose",
    "unicode": ""
  },
  {
    "font_class": "contact",
    "unicode": ""
  },
  {
    "font_class": "contact-filled",
    "unicode": ""
  },
  {
    "font_class": "down",
    "unicode": ""
  },
  {
    "font_class": "bottom",
    "unicode": ""
  },
  {
    "font_class": "download",
    "unicode": ""
  },
  {
    "font_class": "download-filled",
    "unicode": ""
  },
  {
    "font_class": "email",
    "unicode": ""
  },
  {
    "font_class": "email-filled",
    "unicode": ""
  },
  {
    "font_class": "eye",
    "unicode": ""
  },
  {
    "font_class": "eye-filled",
    "unicode": ""
  },
  {
    "font_class": "eye-slash",
    "unicode": ""
  },
  {
    "font_class": "eye-slash-filled",
    "unicode": ""
  },
  {
    "font_class": "fire",
    "unicode": ""
  },
  {
    "font_class": "fire-filled",
    "unicode": ""
  },
  {
    "font_class": "flag",
    "unicode": ""
  },
  {
    "font_class": "flag-filled",
    "unicode": ""
  },
  {
    "font_class": "folder-add",
    "unicode": ""
  },
  {
    "font_class": "folder-add-filled",
    "unicode": ""
  },
  {
    "font_class": "font",
    "unicode": ""
  },
  {
    "font_class": "forward",
    "unicode": ""
  },
  {
    "font_class": "gear",
    "unicode": ""
  },
  {
    "font_class": "gear-filled",
    "unicode": ""
  },
  {
    "font_class": "gift",
    "unicode": ""
  },
  {
    "font_class": "gift-filled",
    "unicode": ""
  },
  {
    "font_class": "hand-down",
    "unicode": ""
  },
  {
    "font_class": "hand-down-filled",
    "unicode": ""
  },
  {
    "font_class": "hand-up",
    "unicode": ""
  },
  {
    "font_class": "hand-up-filled",
    "unicode": ""
  },
  {
    "font_class": "headphones",
    "unicode": ""
  },
  {
    "font_class": "heart",
    "unicode": ""
  },
  {
    "font_class": "heart-filled",
    "unicode": ""
  },
  {
    "font_class": "help",
    "unicode": ""
  },
  {
    "font_class": "help-filled",
    "unicode": ""
  },
  {
    "font_class": "home",
    "unicode": ""
  },
  {
    "font_class": "home-filled",
    "unicode": ""
  },
  {
    "font_class": "image",
    "unicode": ""
  },
  {
    "font_class": "image-filled",
    "unicode": ""
  },
  {
    "font_class": "images",
    "unicode": ""
  },
  {
    "font_class": "images-filled",
    "unicode": ""
  },
  {
    "font_class": "info",
    "unicode": ""
  },
  {
    "font_class": "info-filled",
    "unicode": ""
  },
  {
    "font_class": "left",
    "unicode": ""
  },
  {
    "font_class": "link",
    "unicode": ""
  },
  {
    "font_class": "list",
    "unicode": ""
  },
  {
    "font_class": "location",
    "unicode": ""
  },
  {
    "font_class": "location-filled",
    "unicode": ""
  },
  {
    "font_class": "locked",
    "unicode": ""
  },
  {
    "font_class": "locked-filled",
    "unicode": ""
  },
  {
    "font_class": "loop",
    "unicode": ""
  },
  {
    "font_class": "mail-open",
    "unicode": ""
  },
  {
    "font_class": "mail-open-filled",
    "unicode": ""
  },
  {
    "font_class": "map",
    "unicode": ""
  },
  {
    "font_class": "map-filled",
    "unicode": ""
  },
  {
    "font_class": "map-pin",
    "unicode": ""
  },
  {
    "font_class": "map-pin-ellipse",
    "unicode": ""
  },
  {
    "font_class": "medal",
    "unicode": ""
  },
  {
    "font_class": "medal-filled",
    "unicode": ""
  },
  {
    "font_class": "mic",
    "unicode": ""
  },
  {
    "font_class": "mic-filled",
    "unicode": ""
  },
  {
    "font_class": "micoff",
    "unicode": ""
  },
  {
    "font_class": "micoff-filled",
    "unicode": ""
  },
  {
    "font_class": "minus",
    "unicode": ""
  },
  {
    "font_class": "minus-filled",
    "unicode": ""
  },
  {
    "font_class": "more",
    "unicode": ""
  },
  {
    "font_class": "more-filled",
    "unicode": ""
  },
  {
    "font_class": "navigate",
    "unicode": ""
  },
  {
    "font_class": "navigate-filled",
    "unicode": ""
  },
  {
    "font_class": "notification",
    "unicode": ""
  },
  {
    "font_class": "notification-filled",
    "unicode": ""
  },
  {
    "font_class": "paperclip",
    "unicode": ""
  },
  {
    "font_class": "paperplane",
    "unicode": ""
  },
  {
    "font_class": "paperplane-filled",
    "unicode": ""
  },
  {
    "font_class": "person",
    "unicode": ""
  },
  {
    "font_class": "person-filled",
    "unicode": ""
  },
  {
    "font_class": "personadd",
    "unicode": ""
  },
  {
    "font_class": "personadd-filled",
    "unicode": ""
  },
  {
    "font_class": "personadd-filled-copy",
    "unicode": ""
  },
  {
    "font_class": "phone",
    "unicode": ""
  },
  {
    "font_class": "phone-filled",
    "unicode": ""
  },
  {
    "font_class": "plus",
    "unicode": ""
  },
  {
    "font_class": "plus-filled",
    "unicode": ""
  },
  {
    "font_class": "plusempty",
    "unicode": ""
  },
  {
    "font_class": "pulldown",
    "unicode": ""
  },
  {
    "font_class": "pyq",
    "unicode": ""
  },
  {
    "font_class": "qq",
    "unicode": ""
  },
  {
    "font_class": "redo",
    "unicode": ""
  },
  {
    "font_class": "redo-filled",
    "unicode": ""
  },
  {
    "font_class": "refresh",
    "unicode": ""
  },
  {
    "font_class": "refresh-filled",
    "unicode": ""
  },
  {
    "font_class": "refreshempty",
    "unicode": ""
  },
  {
    "font_class": "reload",
    "unicode": ""
  },
  {
    "font_class": "right",
    "unicode": ""
  },
  {
    "font_class": "scan",
    "unicode": ""
  },
  {
    "font_class": "search",
    "unicode": ""
  },
  {
    "font_class": "settings",
    "unicode": ""
  },
  {
    "font_class": "settings-filled",
    "unicode": ""
  },
  {
    "font_class": "shop",
    "unicode": ""
  },
  {
    "font_class": "shop-filled",
    "unicode": ""
  },
  {
    "font_class": "smallcircle",
    "unicode": ""
  },
  {
    "font_class": "smallcircle-filled",
    "unicode": ""
  },
  {
    "font_class": "sound",
    "unicode": ""
  },
  {
    "font_class": "sound-filled",
    "unicode": ""
  },
  {
    "font_class": "spinner-cycle",
    "unicode": ""
  },
  {
    "font_class": "staff",
    "unicode": ""
  },
  {
    "font_class": "staff-filled",
    "unicode": ""
  },
  {
    "font_class": "star",
    "unicode": ""
  },
  {
    "font_class": "star-filled",
    "unicode": ""
  },
  {
    "font_class": "starhalf",
    "unicode": ""
  },
  {
    "font_class": "trash",
    "unicode": ""
  },
  {
    "font_class": "trash-filled",
    "unicode": ""
  },
  {
    "font_class": "tune",
    "unicode": ""
  },
  {
    "font_class": "tune-filled",
    "unicode": ""
  },
  {
    "font_class": "undo",
    "unicode": ""
  },
  {
    "font_class": "undo-filled",
    "unicode": ""
  },
  {
    "font_class": "up",
    "unicode": ""
  },
  {
    "font_class": "top",
    "unicode": ""
  },
  {
    "font_class": "upload",
    "unicode": ""
  },
  {
    "font_class": "upload-filled",
    "unicode": ""
  },
  {
    "font_class": "videocam",
    "unicode": ""
  },
  {
    "font_class": "videocam-filled",
    "unicode": ""
  },
  {
    "font_class": "vip",
    "unicode": ""
  },
  {
    "font_class": "vip-filled",
    "unicode": ""
  },
  {
    "font_class": "wallet",
    "unicode": ""
  },
  {
    "font_class": "wallet-filled",
    "unicode": ""
  },
  {
    "font_class": "weibo",
    "unicode": ""
  },
  {
    "font_class": "weixin",
    "unicode": ""
  }
];
exports.Lottie = Lottie;
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.defineComponent = defineComponent;
exports.e = e$1;
exports.f = f$1;
exports.fontData = fontData;
exports.index = index;
exports.initVueI18n = initVueI18n;
exports.n = n$1;
exports.nr = nr;
exports.o = o$1;
exports.onLoad = onLoad;
exports.onMounted = onMounted;
exports.p = p$1;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s$1;
exports.sr = sr;
exports.t = t$1;
exports.unref = unref;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
