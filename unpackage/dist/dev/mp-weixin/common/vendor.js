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
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val2, key) => hasOwnProperty$1.call(val2, key);
const isArray = Array.isArray;
const isMap = (val2) => toTypeString(val2) === "[object Map]";
const isSet = (val2) => toTypeString(val2) === "[object Set]";
const isFunction = (val2) => typeof val2 === "function";
const isString = (val2) => typeof val2 === "string";
const isSymbol = (val2) => typeof val2 === "symbol";
const isObject = (val2) => val2 !== null && typeof val2 === "object";
const isPromise = (val2) => {
  return (isObject(val2) || isFunction(val2)) && isFunction(val2.then) && isFunction(val2.catch);
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
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
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
  } else if (isString(value2) || isObject(value2)) {
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
  } else if (isObject(value2)) {
    for (const name in value2) {
      if (value2[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val2) => {
  return isString(val2) ? val2 : val2 == null ? "" : isArray(val2) || isObject(val2) && (val2.toString === objectToString || !isFunction(val2.toString)) ? JSON.stringify(val2, replacer, 2) : String(val2);
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
      [`Set(${val2.size})`]: [...val2.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val2)) {
    return stringifySymbol(val2);
  } else if (isObject(val2) && !isArray(val2) && !isPlainObject(val2)) {
    return String(val2);
  }
  return val2;
};
const stringifySymbol = (v, i2 = "") => {
  var _a;
  return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i2})` : v;
};
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
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
      let i2, l;
      for (i2 = 0, l = this.effects.length; i2 < l; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l = this.cleanups.length; i2 < l; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l = this.scopes.length; i2 < l; i2++) {
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
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
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
      for (let i2 = 0, l = this.length; i2 < l; i2++) {
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
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
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
    if (isObject(res)) {
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
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
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
    const hadKey = hasOwn(target, key);
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
const getProto = (v) => Reflect.getPrototypeOf(v);
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
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
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
  if (!isObject(target)) {
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
const toReactive = (value2) => isObject(value2) ? reactive(value2) : value2;
const toReadonly = (value2) => isObject(value2) ? readonly(value2) : value2;
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
  set _dirty(v) {
    this.effect.dirty = v;
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
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
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
      (a, b) => getId(a) - getId(b)
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
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
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
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
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
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
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
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i2) => hasChanged(v, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
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
  if (!isObject(value2) || value2["__v_skip"]) {
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
    value2.forEach((v) => {
      traverse(v, depth, currentDepth, seen);
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
    if (rootProps != null && !isObject(rootProps)) {
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
      set config(v) {
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
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
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
      } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
        accessCache[key] = 2;
        return data2[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
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
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data2 !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data2, key)) {
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
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
      data2[key] = value2;
      return true;
    } else if (hasOwn(instance.props, key)) {
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
    return !!accessCache[key] || data2 !== EMPTY_OBJ && hasOwn(data2, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
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
    if (!isObject(data2)) {
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
        set: (v) => c2.value = v
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
    if (isObject(opt)) {
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
        set: (v) => injected.value = v
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
  } else if (isObject(raw)) {
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
  if (isObject(base)) {
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
          if (hasOwn(attrs, key)) {
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
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
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
        if (!rawProps || !hasOwn(rawProps, key) && true) {
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
      if (options && hasOwn(options, camelKey = camelize(key))) {
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
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue$1(options, props, key, value2, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
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
    if (isObject(comp)) {
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
    if (!isObject(raw)) {
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
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
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
function isSameType(a, b) {
  return getType$1(a) === getType$1(b);
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
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
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
    valid = isObject(value2);
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
  setInSSRSetupState = (v) => {
    isInSSRComponentSetup = v;
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
  } else if (isObject(setupResult)) {
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
function setResult(result, k, v) {
  result[k] = v;
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
        if (hasOwn(src, name)) {
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
          templateRef.v.forEach((v) => {
            setTemplateRef(templateRef, v, setupState);
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
  if (isObject(value2)) {
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
        if (hasOwn(setupState, r2)) {
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
      const { next, bu, u } = instance;
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
      if (u) {
        queuePostRenderEffect(u);
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
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
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
    for (let i2 = 0, l = source.length; i2 < l; i2++) {
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
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l = keys.length; i2 < l; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const o = (value2, key) => vOn(value2, key);
const f = (source, renderItem) => vFor(source, renderItem);
const s = (value2) => stringifyStyle(value2);
const e = (target, ...sources) => extend(target, ...sources);
const n = (value2) => normalizeClass(value2);
const t = (val2) => toDisplayString(val2);
const p = (props) => renderProps(props);
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
    const errMsg = validateProp(key, data2[key], protocol[key], !hasOwn(data2, key));
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
    valid = isObject(value2);
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
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
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
        if (hasOwn(argsOption, key)) {
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
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
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
    const hasProtocol = hasOwn(protocols2, methodName);
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
  return function addDeviceId(_, toRes) {
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
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
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
        properties: value2.map((v, i2) => formatArrayElement(v, i2, depth + 1))
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
        entries: Array.from(value2).map((v) => formatSetEntry(v, depth + 1))
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
        entries: Array.from(value2.entries()).map((v) => formatMapEntry(v, depth + 1))
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
  const hosts = "100.125.70.70,192.168.184.1,192.168.237.1,127.0.0.1";
  const port = "8090";
  const id = "mp-weixin_MJDahZ";
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
    if (hasOwn(vueOptions, name)) {
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
    if (hasOwn(mpInstance, mock)) {
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
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
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
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
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
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
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
    set(v) {
      locale.value = v;
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
function initData(_) {
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
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, isPageInProject, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject(item.options)) {
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
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
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
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
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
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
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
    for (var r in e2)
      t2[r] = e2[r];
  }(exports, function(t2) {
    var e2 = {};
    function r(i2) {
      if (e2[i2])
        return e2[i2].exports;
      var s2 = e2[i2] = { i: i2, l: false, exports: {} };
      return t2[i2].call(s2.exports, s2, s2.exports, r), s2.l = true, s2.exports;
    }
    return r.m = t2, r.c = e2, r.d = function(t3, e3, i2) {
      r.o(t3, e3) || Object.defineProperty(t3, e3, { enumerable: true, get: i2 });
    }, r.r = function(t3) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t3, "__esModule", { value: true });
    }, r.t = function(t3, e3) {
      if (1 & e3 && (t3 = r(t3)), 8 & e3)
        return t3;
      if (4 & e3 && "object" == typeof t3 && t3 && t3.__esModule)
        return t3;
      var i2 = /* @__PURE__ */ Object.create(null);
      if (r.r(i2), Object.defineProperty(i2, "default", { enumerable: true, value: t3 }), 2 & e3 && "string" != typeof t3)
        for (var s2 in t3)
          r.d(i2, s2, (function(e4) {
            return t3[e4];
          }).bind(null, s2));
      return i2;
    }, r.n = function(t3) {
      var e3 = t3 && t3.__esModule ? function() {
        return t3.default;
      } : function() {
        return t3;
      };
      return r.d(e3, "a", e3), e3;
    }, r.o = function(t3, e3) {
      return Object.prototype.hasOwnProperty.call(t3, e3);
    }, r.p = "", r(r.s = 1);
  }([function(t2, e2, r) {
    function i2(t3, e3) {
      for (var r2 = 0; r2 < e3.length; r2++) {
        var i3 = e3[r2];
        i3.enumerable = i3.enumerable || false, i3.configurable = true, "value" in i3 && (i3.writable = true), Object.defineProperty(t3, i3.key, i3);
      }
    }
    function s2(t3, e3, r2) {
      return e3 in t3 ? Object.defineProperty(t3, e3, { value: r2, enumerable: true, configurable: true, writable: true }) : t3[e3] = r2, t3;
    }
    r.d(e2, "c", function() {
      return _;
    }), r.d(e2, "b", function() {
      return x;
    }), r.d(e2, "a", function() {
      return P;
    });
    var a = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap(), o2 = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
    function p2(t3) {
      if ("function" == typeof this["on".concat(t3)]) {
        for (var e3 = arguments.length, r2 = new Array(e3 > 1 ? e3 - 1 : 0), i3 = 1; i3 < e3; i3++)
          r2[i3 - 1] = arguments[i3];
        this["on".concat(t3)].apply(this, r2);
      }
    }
    function f2(t3) {
      this.readyState = t3, p2.call(this, "readystatechange");
    }
    var m = function() {
      function t3() {
        !function(t4, e4) {
          if (!(t4 instanceof e4))
            throw new TypeError("Cannot call a class as a function");
        }(this, t3), s2(this, "onabort", null), s2(this, "onerror", null), s2(this, "onload", null), s2(this, "onloadstart", null), s2(this, "onprogress", null), s2(this, "ontimeout", null), s2(this, "onloadend", null), s2(this, "onreadystatechange", null), s2(this, "readyState", 0), s2(this, "response", null), s2(this, "responseText", null), s2(this, "responseType", ""), s2(this, "responseXML", null), s2(this, "status", 0), s2(this, "statusText", ""), s2(this, "upload", {}), s2(this, "withCredentials", false), o2.set(this, { "content-type": "application/x-www-form-urlencoded" }), h.set(this, {});
      }
      var e3, r2;
      return e3 = t3, (r2 = [{ key: "abort", value: function() {
        var t4 = l.get(this);
        t4 && t4.abort();
      } }, { key: "getAllResponseHeaders", value: function() {
        var t4 = h.get(this);
        return Object.keys(t4).map(function(e4) {
          return "".concat(e4, ": ").concat(t4[e4]);
        }).join("\n");
      } }, { key: "getResponseHeader", value: function(t4) {
        return h.get(this)[t4];
      } }, { key: "open", value: function(e4, r3) {
        n2.set(this, e4), a.set(this, r3), f2.call(this, t3.OPENED);
      } }, { key: "overrideMimeType", value: function() {
      } }, { key: "send", value: function() {
        var e4 = this, r3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (this.readyState !== t3.OPENED)
          throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
        wx$1.request({ data: r3, url: a.get(this), method: n2.get(this), header: o2.get(this), success: function(r4) {
          var i3 = r4.data, s3 = r4.statusCode, a2 = r4.header;
          if ("string" != typeof i3 && !(i3 instanceof ArrayBuffer))
            try {
              i3 = JSON.stringify(i3);
            } catch (t4) {
            }
          if (e4.status = s3, h.set(e4, a2), p2.call(e4, "loadstart"), f2.call(e4, t3.HEADERS_RECEIVED), f2.call(e4, t3.LOADING), e4.response = i3, i3 instanceof ArrayBuffer) {
            e4.responseText = "";
            for (var n3 = new Uint8Array(i3), o3 = n3.byteLength, l2 = 0; l2 < o3; l2++)
              e4.responseText += String.fromCharCode(n3[l2]);
          } else
            e4.responseText = i3;
          f2.call(e4, t3.DONE), p2.call(e4, "load"), p2.call(e4, "loadend");
        }, fail: function(t4) {
          var r4 = t4.errMsg;
          -1 !== r4.indexOf("abort") ? p2.call(e4, "abort") : p2.call(e4, "error", r4), p2.call(e4, "loadend");
        } });
      } }, { key: "setRequestHeader", value: function(t4, e4) {
        var r3 = o2.get(this);
        r3[t4] = e4, o2.set(this, r3);
      } }]) && i2(e3.prototype, r2), t3;
    }();
    function c() {
    }
    function d() {
      index.__f__("error", "at node_modules/lottie-miniprogram/miniprogram_dist/index.js:1", "小程序由于不支持动态创建 canvas 的能力，故 lottie 中有关图片处理的操作无法支持，请保持图片的原始宽高与 JSON 描述的一致，避免需要对图片处理");
    }
    function u(t3) {
      return "canvas" === t3 ? (index.__f__("warn", "at node_modules/lottie-miniprogram/miniprogram_dist/index.js:1", "发现 Lottie 动态创建 canvas 组件，但小程序不支持动态创建组件，接下来可能会出现异常"), { getContext: function() {
        return { fillRect: c, createImage: d, drawImage: d };
      } }) : "img" === t3 ? function(t4) {
        if (void 0 === t4.createImage)
          return {};
        var e3 = t4.createImage();
        return e3.addEventListener = e3.addEventListener || function(t5, r2) {
          "load" === t5 ? e3.onload = function() {
            setTimeout(r2, 0);
          } : "error" === t5 && (e3.onerror = r2);
        }, e3;
      }(this) : void 0;
    }
    function y(t3, e3) {
      return function(r2) {
        return e3.call(t3, Array.from(r2));
      };
    }
    function g(t3, e3) {
      return function() {
        return e3.call(t3);
      };
    }
    function v(t3, e3, r2) {
      var i3 = t3[e3];
      t3[e3] = r2(t3, i3);
    }
    s2(m, "UNSEND", 0), s2(m, "OPENED", 1), s2(m, "HEADERS_RECEIVED", 2), s2(m, "LOADING", 3), s2(m, "DONE", 4);
    var b = wx$1.getSystemInfoSync(), P = { requestAnimationFrame: function(t3) {
      setTimeout(function() {
        "function" == typeof t3 && t3(Date.now());
      }, 16);
    } };
    P.window = { devicePixelRatio: b.pixelRatio }, P.document = P.window.document = { body: {}, createElement: u }, P.navigator = P.window.navigator = { userAgent: "" }, XMLHttpRequest = m;
    var _ = function(t3) {
      var e3 = P.window, r2 = P.document;
      P._requestAnimationFrame = e3.requestAnimationFrame, P._cancelAnimationFrame = e3.cancelAnimationFrame, e3.requestAnimationFrame = function(e4) {
        var r3 = false;
        setTimeout(function() {
          r3 || (r3 = true, "function" == typeof e4 && e4(Date.now()));
        }, 100), t3.requestAnimationFrame(function(t4) {
          r3 || (r3 = true, "function" == typeof e4 && e4(t4));
        });
      }, e3.cancelAnimationFrame = t3.cancelAnimationFrame.bind(t3), P._body = r2.body, P._createElement = r2.createElement, r2.body = {}, r2.createElement = u.bind(t3);
      var i3 = t3.getContext("2d");
      i3.canvas || (i3.canvas = t3), v(i3, "setLineDash", y), v(i3, "fill", g);
    }, x = function() {
      var t3 = P.window, e3 = P.document;
      t3.requestAnimationFrame = P._requestAnimationFrame, t3.cancelAnimationFrame = P._cancelAnimationFrame, e3.body = P._body, e3.createElement = P._createElement;
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
        var e2 = window.lottie.loadAnimation(t2), r = e2.destroy.bind(e2);
        return e2.destroy = (function() {
          Object(_adapter__WEBPACK_IMPORTED_MODULE_0__.b)(), e2.renderer && !e2.renderer.destroyed && (e2.renderer.renderConfig.clearCanvas = false), r();
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
          var t2, e2 = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"], r = e2.length;
          for (t2 = 0; t2 < r; t2 += 1)
            BMMath[e2[t2]] = Math[e2[t2]];
        }(), BMMath.random = Math.random, BMMath.abs = function(t2) {
          if ("object" === _typeof(t2) && t2.length) {
            var e2, r = createSizedArray(t2.length), i2 = t2.length;
            for (e2 = 0; e2 < i2; e2 += 1)
              r[e2] = Math.abs(t2[e2]);
            return r;
          }
          return Math.abs(t2);
        };
        var defaultCurveSegments = 150, degToRads = Math.PI / 180, roundCorner = 0.5519;
        function BMEnterFrameEvent(t2, e2, r, i2) {
          this.type = t2, this.currentTime = e2, this.totalTime = r, this.direction = i2 < 0 ? -1 : 1;
        }
        function BMCompleteEvent(t2, e2) {
          this.type = t2, this.direction = e2 < 0 ? -1 : 1;
        }
        function BMCompleteLoopEvent(t2, e2, r, i2) {
          this.type = t2, this.currentLoop = r, this.totalLoops = e2, this.direction = i2 < 0 ? -1 : 1;
        }
        function BMSegmentStartEvent(t2, e2, r) {
          this.type = t2, this.firstFrame = e2, this.totalFrames = r;
        }
        function BMDestroyEvent(t2, e2) {
          this.type = t2, this.target = e2;
        }
        var createElementID = (_count = 0, function() {
          return "__lottie_element_" + ++_count;
        }), _count;
        function HSVtoRGB(t2, e2, r) {
          var i2, s2, a, n2, o2, h, l, p2;
          switch (h = r * (1 - e2), l = r * (1 - (o2 = 6 * t2 - (n2 = Math.floor(6 * t2))) * e2), p2 = r * (1 - (1 - o2) * e2), n2 % 6) {
            case 0:
              i2 = r, s2 = p2, a = h;
              break;
            case 1:
              i2 = l, s2 = r, a = h;
              break;
            case 2:
              i2 = h, s2 = r, a = p2;
              break;
            case 3:
              i2 = h, s2 = l, a = r;
              break;
            case 4:
              i2 = p2, s2 = h, a = r;
              break;
            case 5:
              i2 = r, s2 = h, a = l;
          }
          return [i2, s2, a];
        }
        function RGBtoHSV(t2, e2, r) {
          var i2, s2 = Math.max(t2, e2, r), a = Math.min(t2, e2, r), n2 = s2 - a, o2 = 0 === s2 ? 0 : n2 / s2, h = s2 / 255;
          switch (s2) {
            case a:
              i2 = 0;
              break;
            case t2:
              i2 = e2 - r + n2 * (e2 < r ? 6 : 0), i2 /= 6 * n2;
              break;
            case e2:
              i2 = r - t2 + 2 * n2, i2 /= 6 * n2;
              break;
            case r:
              i2 = t2 - e2 + 4 * n2, i2 /= 6 * n2;
          }
          return [i2, o2, h];
        }
        function addSaturationToRGB(t2, e2) {
          var r = RGBtoHSV(255 * t2[0], 255 * t2[1], 255 * t2[2]);
          return r[1] += e2, r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2]);
        }
        function addBrightnessToRGB(t2, e2) {
          var r = RGBtoHSV(255 * t2[0], 255 * t2[1], 255 * t2[2]);
          return r[2] += e2, r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2]);
        }
        function addHueToRGB(t2, e2) {
          var r = RGBtoHSV(255 * t2[0], 255 * t2[1], 255 * t2[2]);
          return r[0] += e2 / 360, r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2]);
        }
        (function() {
          var t2, e2, r = [];
          for (t2 = 0; t2 < 256; t2 += 1)
            e2 = t2.toString(16), r[t2] = 1 == e2.length ? "0" + e2 : e2;
          return function(t3, e3, i2) {
            return t3 < 0 && (t3 = 0), e3 < 0 && (e3 = 0), i2 < 0 && (i2 = 0), "#" + r[t3] + r[e3] + r[i2];
          };
        })();
        function BaseEvent() {
        }
        BaseEvent.prototype = { triggerEvent: function(t2, e2) {
          if (this._cbs[t2])
            for (var r = this._cbs[t2].length, i2 = 0; i2 < r; i2++)
              this._cbs[t2][i2](e2);
        }, addEventListener: function(t2, e2) {
          return this._cbs[t2] || (this._cbs[t2] = []), this._cbs[t2].push(e2), (function() {
            this.removeEventListener(t2, e2);
          }).bind(this);
        }, removeEventListener: function(t2, e2) {
          if (e2) {
            if (this._cbs[t2]) {
              for (var r = 0, i2 = this._cbs[t2].length; r < i2; )
                this._cbs[t2][r] === e2 && (this._cbs[t2].splice(r, 1), r -= 1, i2 -= 1), r += 1;
              this._cbs[t2].length || (this._cbs[t2] = null);
            }
          } else
            this._cbs[t2] = null;
        } };
        var createTypedArray = "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function(t2, e2) {
          return "float32" === t2 ? new Float32Array(e2) : "int16" === t2 ? new Int16Array(e2) : "uint8c" === t2 ? new Uint8ClampedArray(e2) : void 0;
        } : function(t2, e2) {
          var r, i2 = 0, s2 = [];
          switch (t2) {
            case "int16":
            case "uint8c":
              r = 1;
              break;
            default:
              r = 1.1;
          }
          for (i2 = 0; i2 < e2; i2 += 1)
            s2.push(r);
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
          var t2 = Math.cos, e2 = Math.sin, r = Math.tan, i2 = Math.round;
          function s2() {
            return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
          }
          function a(r2) {
            if (0 === r2)
              return this;
            var i3 = t2(r2), s3 = e2(r2);
            return this._t(i3, -s3, 0, 0, s3, i3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }
          function n2(r2) {
            if (0 === r2)
              return this;
            var i3 = t2(r2), s3 = e2(r2);
            return this._t(1, 0, 0, 0, 0, i3, -s3, 0, 0, s3, i3, 0, 0, 0, 0, 1);
          }
          function o2(r2) {
            if (0 === r2)
              return this;
            var i3 = t2(r2), s3 = e2(r2);
            return this._t(i3, 0, s3, 0, 0, 1, 0, 0, -s3, 0, i3, 0, 0, 0, 0, 1);
          }
          function h(r2) {
            if (0 === r2)
              return this;
            var i3 = t2(r2), s3 = e2(r2);
            return this._t(i3, -s3, 0, 0, s3, i3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }
          function l(t3, e3) {
            return this._t(1, e3, t3, 1, 0, 0);
          }
          function p2(t3, e3) {
            return this.shear(r(t3), r(e3));
          }
          function f2(i3, s3) {
            var a2 = t2(s3), n3 = e2(s3);
            return this._t(a2, n3, 0, 0, -n3, a2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(i3), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a2, -n3, 0, 0, n3, a2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }
          function m(t3, e3, r2) {
            return r2 || 0 === r2 || (r2 = 1), 1 === t3 && 1 === e3 && 1 === r2 ? this : this._t(t3, 0, 0, 0, 0, e3, 0, 0, 0, 0, r2, 0, 0, 0, 0, 1);
          }
          function c(t3, e3, r2, i3, s3, a2, n3, o3, h2, l2, p3, f3, m2, c2, d2, u2) {
            return this.props[0] = t3, this.props[1] = e3, this.props[2] = r2, this.props[3] = i3, this.props[4] = s3, this.props[5] = a2, this.props[6] = n3, this.props[7] = o3, this.props[8] = h2, this.props[9] = l2, this.props[10] = p3, this.props[11] = f3, this.props[12] = m2, this.props[13] = c2, this.props[14] = d2, this.props[15] = u2, this;
          }
          function d(t3, e3, r2) {
            return r2 = r2 || 0, 0 !== t3 || 0 !== e3 || 0 !== r2 ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t3, e3, r2, 1) : this;
          }
          function u(t3, e3, r2, i3, s3, a2, n3, o3, h2, l2, p3, f3, m2, c2, d2, u2) {
            var y2 = this.props;
            if (1 === t3 && 0 === e3 && 0 === r2 && 0 === i3 && 0 === s3 && 1 === a2 && 0 === n3 && 0 === o3 && 0 === h2 && 0 === l2 && 1 === p3 && 0 === f3)
              return y2[12] = y2[12] * t3 + y2[15] * m2, y2[13] = y2[13] * a2 + y2[15] * c2, y2[14] = y2[14] * p3 + y2[15] * d2, y2[15] = y2[15] * u2, this._identityCalculated = false, this;
            var g2 = y2[0], v2 = y2[1], b2 = y2[2], P2 = y2[3], _2 = y2[4], x2 = y2[5], S2 = y2[6], E3 = y2[7], T2 = y2[8], C2 = y2[9], A2 = y2[10], k2 = y2[11], D2 = y2[12], M2 = y2[13], I2 = y2[14], w = y2[15];
            return y2[0] = g2 * t3 + v2 * s3 + b2 * h2 + P2 * m2, y2[1] = g2 * e3 + v2 * a2 + b2 * l2 + P2 * c2, y2[2] = g2 * r2 + v2 * n3 + b2 * p3 + P2 * d2, y2[3] = g2 * i3 + v2 * o3 + b2 * f3 + P2 * u2, y2[4] = _2 * t3 + x2 * s3 + S2 * h2 + E3 * m2, y2[5] = _2 * e3 + x2 * a2 + S2 * l2 + E3 * c2, y2[6] = _2 * r2 + x2 * n3 + S2 * p3 + E3 * d2, y2[7] = _2 * i3 + x2 * o3 + S2 * f3 + E3 * u2, y2[8] = T2 * t3 + C2 * s3 + A2 * h2 + k2 * m2, y2[9] = T2 * e3 + C2 * a2 + A2 * l2 + k2 * c2, y2[10] = T2 * r2 + C2 * n3 + A2 * p3 + k2 * d2, y2[11] = T2 * i3 + C2 * o3 + A2 * f3 + k2 * u2, y2[12] = D2 * t3 + M2 * s3 + I2 * h2 + w * m2, y2[13] = D2 * e3 + M2 * a2 + I2 * l2 + w * c2, y2[14] = D2 * r2 + M2 * n3 + I2 * p3 + w * d2, y2[15] = D2 * i3 + M2 * o3 + I2 * f3 + w * u2, this._identityCalculated = false, this;
          }
          function y() {
            return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = true), this._identity;
          }
          function g(t3) {
            for (var e3 = 0; e3 < 16; ) {
              if (t3.props[e3] !== this.props[e3])
                return false;
              e3 += 1;
            }
            return true;
          }
          function v(t3) {
            var e3;
            for (e3 = 0; e3 < 16; e3 += 1)
              t3.props[e3] = this.props[e3];
          }
          function b(t3) {
            var e3;
            for (e3 = 0; e3 < 16; e3 += 1)
              this.props[e3] = t3[e3];
          }
          function P(t3, e3, r2) {
            return { x: t3 * this.props[0] + e3 * this.props[4] + r2 * this.props[8] + this.props[12], y: t3 * this.props[1] + e3 * this.props[5] + r2 * this.props[9] + this.props[13], z: t3 * this.props[2] + e3 * this.props[6] + r2 * this.props[10] + this.props[14] };
          }
          function _(t3, e3, r2) {
            return t3 * this.props[0] + e3 * this.props[4] + r2 * this.props[8] + this.props[12];
          }
          function x(t3, e3, r2) {
            return t3 * this.props[1] + e3 * this.props[5] + r2 * this.props[9] + this.props[13];
          }
          function S(t3, e3, r2) {
            return t3 * this.props[2] + e3 * this.props[6] + r2 * this.props[10] + this.props[14];
          }
          function E2(t3) {
            var e3 = this.props[0] * this.props[5] - this.props[1] * this.props[4], r2 = this.props[5] / e3, i3 = -this.props[1] / e3, s3 = -this.props[4] / e3, a2 = this.props[0] / e3, n3 = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e3, o3 = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e3;
            return [t3[0] * r2 + t3[1] * s3 + n3, t3[0] * i3 + t3[1] * a2 + o3, 0];
          }
          function T(t3) {
            var e3, r2 = t3.length, i3 = [];
            for (e3 = 0; e3 < r2; e3 += 1)
              i3[e3] = E2(t3[e3]);
            return i3;
          }
          function C(t3, e3, r2) {
            var i3 = createTypedArray("float32", 6);
            if (this.isIdentity())
              i3[0] = t3[0], i3[1] = t3[1], i3[2] = e3[0], i3[3] = e3[1], i3[4] = r2[0], i3[5] = r2[1];
            else {
              var s3 = this.props[0], a2 = this.props[1], n3 = this.props[4], o3 = this.props[5], h2 = this.props[12], l2 = this.props[13];
              i3[0] = t3[0] * s3 + t3[1] * n3 + h2, i3[1] = t3[0] * a2 + t3[1] * o3 + l2, i3[2] = e3[0] * s3 + e3[1] * n3 + h2, i3[3] = e3[0] * a2 + e3[1] * o3 + l2, i3[4] = r2[0] * s3 + r2[1] * n3 + h2, i3[5] = r2[0] * a2 + r2[1] * o3 + l2;
            }
            return i3;
          }
          function A(t3, e3, r2) {
            return this.isIdentity() ? [t3, e3, r2] : [t3 * this.props[0] + e3 * this.props[4] + r2 * this.props[8] + this.props[12], t3 * this.props[1] + e3 * this.props[5] + r2 * this.props[9] + this.props[13], t3 * this.props[2] + e3 * this.props[6] + r2 * this.props[10] + this.props[14]];
          }
          function k(t3, e3) {
            if (this.isIdentity())
              return t3 + "," + e3;
            var r2 = this.props;
            return Math.round(100 * (t3 * r2[0] + e3 * r2[4] + r2[12])) / 100 + "," + Math.round(100 * (t3 * r2[1] + e3 * r2[5] + r2[13])) / 100;
          }
          function D() {
            for (var t3 = 0, e3 = this.props, r2 = "matrix3d("; t3 < 16; )
              r2 += i2(1e4 * e3[t3]) / 1e4, r2 += 15 === t3 ? ")" : ",", t3 += 1;
            return r2;
          }
          function M(t3) {
            return t3 < 1e-6 && t3 > 0 || t3 > -1e-6 && t3 < 0 ? i2(1e4 * t3) / 1e4 : t3;
          }
          function I() {
            var t3 = this.props;
            return "matrix(" + M(t3[0]) + "," + M(t3[1]) + "," + M(t3[4]) + "," + M(t3[5]) + "," + M(t3[12]) + "," + M(t3[13]) + ")";
          }
          return function() {
            this.reset = s2, this.rotate = a, this.rotateX = n2, this.rotateY = o2, this.rotateZ = h, this.skew = p2, this.skewFromAxis = f2, this.shear = l, this.scale = m, this.setTransform = c, this.translate = d, this.transform = u, this.applyToPoint = P, this.applyToX = _, this.applyToY = x, this.applyToZ = S, this.applyToPointArray = A, this.applyToTriplePoints = C, this.applyToPointStringified = k, this.toCSS = D, this.to2dCSS = I, this.clone = v, this.cloneFromProps = b, this.equals = g, this.inversePoints = T, this.inversePoint = E2, this._t = this.transform, this.isIdentity = y, this._identity = true, this._identityCalculated = false, this.props = createTypedArray("float32", 16), this.reset();
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
          var r = this, i2 = e2.pow(256, 6), s2 = e2.pow(2, 52), a = 2 * s2;
          function n2(t3) {
            var e3, r2 = t3.length, i3 = this, s3 = 0, a2 = i3.i = i3.j = 0, n3 = i3.S = [];
            for (r2 || (t3 = [r2++]); s3 < 256; )
              n3[s3] = s3++;
            for (s3 = 0; s3 < 256; s3++)
              n3[s3] = n3[a2 = 255 & a2 + t3[s3 % r2] + (e3 = n3[s3])], n3[a2] = e3;
            i3.g = function(t4) {
              for (var e4, r3 = 0, s4 = i3.i, a3 = i3.j, n4 = i3.S; t4--; )
                e4 = n4[s4 = 255 & s4 + 1], r3 = 256 * r3 + n4[255 & (n4[s4] = n4[a3 = 255 & a3 + e4]) + (n4[a3] = e4)];
              return i3.i = s4, i3.j = a3, r3;
            };
          }
          function o2(t3, e3) {
            return e3.i = t3.i, e3.j = t3.j, e3.S = t3.S.slice(), e3;
          }
          function h(t3, e3) {
            for (var r2, i3 = t3 + "", s3 = 0; s3 < i3.length; )
              e3[255 & s3] = 255 & (r2 ^= 19 * e3[255 & s3]) + i3.charCodeAt(s3++);
            return l(e3);
          }
          function l(t3) {
            return String.fromCharCode.apply(0, t3);
          }
          e2.seedrandom = function(p2, f2, m) {
            var c = [], d = h(function t3(e3, r2) {
              var i3, s3 = [], a2 = _typeof(e3);
              if (r2 && "object" == a2)
                for (i3 in e3)
                  try {
                    s3.push(t3(e3[i3], r2 - 1));
                  } catch (t4) {
                  }
              return s3.length ? s3 : "string" == a2 ? e3 : e3 + "\0";
            }((f2 = true === f2 ? { entropy: true } : f2 || {}).entropy ? [p2, l(t2)] : null === p2 ? function() {
              try {
                var e3 = new Uint8Array(256);
                return (r.crypto || r.msCrypto).getRandomValues(e3), l(e3);
              } catch (e4) {
                var i3 = r.navigator, s3 = i3 && i3.plugins;
                return [+/* @__PURE__ */ new Date(), r, s3, r.screen, l(t2)];
              }
            }() : p2, 3), c), u = new n2(c), y = function() {
              for (var t3 = u.g(6), e3 = i2, r2 = 0; t3 < s2; )
                t3 = 256 * (t3 + r2), e3 *= 256, r2 = u.g(1);
              for (; t3 >= a; )
                t3 /= 2, e3 /= 2, r2 >>>= 1;
              return (t3 + r2) / e3;
            };
            return y.int32 = function() {
              return 0 | u.g(4);
            }, y.quick = function() {
              return u.g(4) / 4294967296;
            }, y.double = y, h(l(u.S), t2), (f2.pass || m || function(t3, r2, i3, s3) {
              return s3 && (s3.S && o2(s3, u), t3.state = function() {
                return o2(u, {});
              }), i3 ? (e2.random = t3, r2) : t3;
            })(y, d, "global" in f2 ? f2.global : this == e2, f2.state);
          }, h(e2.random(), t2);
        }([], BMMath);
        var BezierFactory = function() {
          var t2 = { getBezierEasing: function(t3, r2, i3, s3, a2) {
            var n3 = a2 || ("bez_" + t3 + "_" + r2 + "_" + i3 + "_" + s3).replace(/\./g, "p");
            if (e2[n3])
              return e2[n3];
            var o3 = new h([t3, r2, i3, s3]);
            return e2[n3] = o3, o3;
          } }, e2 = {};
          var r = "function" == typeof Float32Array;
          function i2(t3, e3) {
            return 1 - 3 * e3 + 3 * t3;
          }
          function s2(t3, e3) {
            return 3 * e3 - 6 * t3;
          }
          function a(t3) {
            return 3 * t3;
          }
          function n2(t3, e3, r2) {
            return ((i2(e3, r2) * t3 + s2(e3, r2)) * t3 + a(e3)) * t3;
          }
          function o2(t3, e3, r2) {
            return 3 * i2(e3, r2) * t3 * t3 + 2 * s2(e3, r2) * t3 + a(e3);
          }
          function h(t3) {
            this._p = t3, this._mSampleValues = r ? new Float32Array(11) : new Array(11), this._precomputed = false, this.get = this.get.bind(this);
          }
          return h.prototype = { get: function(t3) {
            var e3 = this._p[0], r2 = this._p[1], i3 = this._p[2], s3 = this._p[3];
            return this._precomputed || this._precompute(), e3 === r2 && i3 === s3 ? t3 : 0 === t3 ? 0 : 1 === t3 ? 1 : n2(this._getTForX(t3), r2, s3);
          }, _precompute: function() {
            var t3 = this._p[0], e3 = this._p[1], r2 = this._p[2], i3 = this._p[3];
            this._precomputed = true, t3 === e3 && r2 === i3 || this._calcSampleValues();
          }, _calcSampleValues: function() {
            for (var t3 = this._p[0], e3 = this._p[2], r2 = 0; r2 < 11; ++r2)
              this._mSampleValues[r2] = n2(0.1 * r2, t3, e3);
          }, _getTForX: function(t3) {
            for (var e3 = this._p[0], r2 = this._p[2], i3 = this._mSampleValues, s3 = 0, a2 = 1; 10 !== a2 && i3[a2] <= t3; ++a2)
              s3 += 0.1;
            var h2 = s3 + 0.1 * ((t3 - i3[--a2]) / (i3[a2 + 1] - i3[a2])), l = o2(h2, e3, r2);
            return l >= 1e-3 ? function(t4, e4, r3, i4) {
              for (var s4 = 0; s4 < 4; ++s4) {
                var a3 = o2(e4, r3, i4);
                if (0 === a3)
                  return e4;
                e4 -= (n2(e4, r3, i4) - t4) / a3;
              }
              return e4;
            }(t3, h2, e3, r2) : 0 === l ? h2 : function(t4, e4, r3, i4, s4) {
              var a3, o3, h3 = 0;
              do {
                (a3 = n2(o3 = e4 + (r3 - e4) / 2, i4, s4) - t4) > 0 ? r3 = o3 : e4 = o3;
              } while (Math.abs(a3) > 1e-7 && ++h3 < 10);
              return o3;
            }(t3, s3, s3 + 0.1, e3, r2);
          } }, t2;
        }();
        function extendPrototype(t2, e2) {
          var r, i2, s2 = t2.length;
          for (r = 0; r < s2; r += 1)
            for (var a in i2 = t2[r].prototype)
              i2.hasOwnProperty(a) && (e2.prototype[a] = i2[a]);
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
          function t2(t3, e3, r2, i3, s3, a2) {
            var n3 = t3 * i3 + e3 * s3 + r2 * a2 - s3 * i3 - a2 * t3 - r2 * e3;
            return n3 > -1e-3 && n3 < 1e-3;
          }
          var e2 = function(t3, e3, r2, i3) {
            var s3, a2, n3, o3, h, l, p2 = defaultCurveSegments, f2 = 0, m = [], c = [], d = bezier_length_pool.newElement();
            for (n3 = r2.length, s3 = 0; s3 < p2; s3 += 1) {
              for (h = s3 / (p2 - 1), l = 0, a2 = 0; a2 < n3; a2 += 1)
                o3 = bm_pow(1 - h, 3) * t3[a2] + 3 * bm_pow(1 - h, 2) * h * r2[a2] + 3 * (1 - h) * bm_pow(h, 2) * i3[a2] + bm_pow(h, 3) * e3[a2], m[a2] = o3, null !== c[a2] && (l += bm_pow(m[a2] - c[a2], 2)), c[a2] = m[a2];
              l && (f2 += l = bm_sqrt(l)), d.percents[s3] = h, d.lengths[s3] = f2;
            }
            return d.addedLength = f2, d;
          };
          function r(t3) {
            this.segmentLength = 0, this.points = new Array(t3);
          }
          function i2(t3, e3) {
            this.partialLength = t3, this.point = e3;
          }
          var s2, a = (s2 = {}, function(e3, a2, n3, o3) {
            var h = (e3[0] + "_" + e3[1] + "_" + a2[0] + "_" + a2[1] + "_" + n3[0] + "_" + n3[1] + "_" + o3[0] + "_" + o3[1]).replace(/\./g, "p");
            if (!s2[h]) {
              var l, p2, f2, m, c, d, u, y = defaultCurveSegments, g = 0, v = null;
              2 === e3.length && (e3[0] != a2[0] || e3[1] != a2[1]) && t2(e3[0], e3[1], a2[0], a2[1], e3[0] + n3[0], e3[1] + n3[1]) && t2(e3[0], e3[1], a2[0], a2[1], a2[0] + o3[0], a2[1] + o3[1]) && (y = 2);
              var b = new r(y);
              for (f2 = n3.length, l = 0; l < y; l += 1) {
                for (u = createSizedArray(f2), c = l / (y - 1), d = 0, p2 = 0; p2 < f2; p2 += 1)
                  m = bm_pow(1 - c, 3) * e3[p2] + 3 * bm_pow(1 - c, 2) * c * (e3[p2] + n3[p2]) + 3 * (1 - c) * bm_pow(c, 2) * (a2[p2] + o3[p2]) + bm_pow(c, 3) * a2[p2], u[p2] = m, null !== v && (d += bm_pow(u[p2] - v[p2], 2));
                g += d = bm_sqrt(d), b.points[l] = new i2(d, u), v = u;
              }
              b.segmentLength = g, s2[h] = b;
            }
            return s2[h];
          });
          function n2(t3, e3) {
            var r2 = e3.percents, i3 = e3.lengths, s3 = r2.length, a2 = bm_floor((s3 - 1) * t3), n3 = t3 * e3.addedLength, o3 = 0;
            if (a2 === s3 - 1 || 0 === a2 || n3 === i3[a2])
              return r2[a2];
            for (var h = i3[a2] > n3 ? -1 : 1, l = true; l; )
              if (i3[a2] <= n3 && i3[a2 + 1] > n3 ? (o3 = (n3 - i3[a2]) / (i3[a2 + 1] - i3[a2]), l = false) : a2 += h, a2 < 0 || a2 >= s3 - 1) {
                if (a2 === s3 - 1)
                  return r2[a2];
                l = false;
              }
            return r2[a2] + (r2[a2 + 1] - r2[a2]) * o3;
          }
          var o2 = createTypedArray("float32", 8);
          return { getSegmentsLength: function(t3) {
            var r2, i3 = segments_length_pool.newElement(), s3 = t3.c, a2 = t3.v, n3 = t3.o, o3 = t3.i, h = t3._length, l = i3.lengths, p2 = 0;
            for (r2 = 0; r2 < h - 1; r2 += 1)
              l[r2] = e2(a2[r2], a2[r2 + 1], n3[r2], o3[r2 + 1]), p2 += l[r2].addedLength;
            return s3 && h && (l[r2] = e2(a2[r2], a2[0], n3[r2], o3[0]), p2 += l[r2].addedLength), i3.totalLength = p2, i3;
          }, getNewSegment: function(t3, e3, r2, i3, s3, a2, h) {
            var l, p2 = n2(s3 = s3 < 0 ? 0 : s3 > 1 ? 1 : s3, h), f2 = n2(a2 = a2 > 1 ? 1 : a2, h), m = t3.length, c = 1 - p2, d = 1 - f2, u = c * c * c, y = p2 * c * c * 3, g = p2 * p2 * c * 3, v = p2 * p2 * p2, b = c * c * d, P = p2 * c * d + c * p2 * d + c * c * f2, _ = p2 * p2 * d + c * p2 * f2 + p2 * c * f2, x = p2 * p2 * f2, S = c * d * d, E2 = p2 * d * d + c * f2 * d + c * d * f2, T = p2 * f2 * d + c * f2 * f2 + p2 * d * f2, C = p2 * f2 * f2, A = d * d * d, k = f2 * d * d + d * f2 * d + d * d * f2, D = f2 * f2 * d + d * f2 * f2 + f2 * d * f2, M = f2 * f2 * f2;
            for (l = 0; l < m; l += 1)
              o2[4 * l] = Math.round(1e3 * (u * t3[l] + y * r2[l] + g * i3[l] + v * e3[l])) / 1e3, o2[4 * l + 1] = Math.round(1e3 * (b * t3[l] + P * r2[l] + _ * i3[l] + x * e3[l])) / 1e3, o2[4 * l + 2] = Math.round(1e3 * (S * t3[l] + E2 * r2[l] + T * i3[l] + C * e3[l])) / 1e3, o2[4 * l + 3] = Math.round(1e3 * (A * t3[l] + k * r2[l] + D * i3[l] + M * e3[l])) / 1e3;
            return o2;
          }, getPointInSegment: function(t3, e3, r2, i3, s3, a2) {
            var o3 = n2(s3, a2), h = 1 - o3;
            return [Math.round(1e3 * (h * h * h * t3[0] + (o3 * h * h + h * o3 * h + h * h * o3) * r2[0] + (o3 * o3 * h + h * o3 * o3 + o3 * h * o3) * i3[0] + o3 * o3 * o3 * e3[0])) / 1e3, Math.round(1e3 * (h * h * h * t3[1] + (o3 * h * h + h * o3 * h + h * h * o3) * r2[1] + (o3 * o3 * h + h * o3 * o3 + o3 * h * o3) * i3[1] + o3 * o3 * o3 * e3[1])) / 1e3];
          }, buildBezierData: a, pointOnLine2D: t2, pointOnLine3D: function(e3, r2, i3, s3, a2, n3, o3, h, l) {
            if (0 === i3 && 0 === n3 && 0 === l)
              return t2(e3, r2, s3, a2, o3, h);
            var p2, f2 = Math.sqrt(Math.pow(s3 - e3, 2) + Math.pow(a2 - r2, 2) + Math.pow(n3 - i3, 2)), m = Math.sqrt(Math.pow(o3 - e3, 2) + Math.pow(h - r2, 2) + Math.pow(l - i3, 2)), c = Math.sqrt(Math.pow(o3 - s3, 2) + Math.pow(h - a2, 2) + Math.pow(l - n3, 2));
            return (p2 = f2 > m ? f2 > c ? f2 - m - c : c - m - f2 : c > m ? c - m - f2 : m - f2 - c) > -1e-4 && p2 < 1e-4;
          } };
        }
        !function() {
          for (var t2 = 0, e2 = ["ms", "moz", "webkit", "o"], r = 0; r < e2.length && !window.requestAnimationFrame; ++r)
            window.requestAnimationFrame = window[e2[r] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e2[r] + "CancelAnimationFrame"] || window[e2[r] + "CancelRequestAnimationFrame"];
          window.requestAnimationFrame || (window.requestAnimationFrame = function(e3, r2) {
            var i2 = (/* @__PURE__ */ new Date()).getTime(), s2 = Math.max(0, 16 - (i2 - t2)), a = setTimeout(function() {
              e3(i2 + s2);
            }, s2);
            return t2 = i2 + s2, a;
          }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t3) {
            clearTimeout(t3);
          });
        }();
        var bez = bezFunction();
        function dataFunctionManager() {
          function t2(t3, e3) {
            for (var r2 = 0, i3 = e3.length; r2 < i3; ) {
              if (e3[r2].id === t3)
                return e3[r2].layers.__used ? JSON.parse(JSON.stringify(e3[r2].layers)) : (e3[r2].layers.__used = true, e3[r2].layers);
              r2 += 1;
            }
          }
          function e2(t3) {
            var i3, s3, a2;
            for (i3 = t3.length - 1; i3 >= 0; i3 -= 1)
              if ("sh" == t3[i3].ty) {
                if (t3[i3].ks.k.i)
                  r(t3[i3].ks.k);
                else
                  for (a2 = t3[i3].ks.k.length, s3 = 0; s3 < a2; s3 += 1)
                    t3[i3].ks.k[s3].s && r(t3[i3].ks.k[s3].s[0]), t3[i3].ks.k[s3].e && r(t3[i3].ks.k[s3].e[0]);
              } else
                "gr" == t3[i3].ty && e2(t3[i3].it);
          }
          function r(t3) {
            var e3, r2 = t3.i.length;
            for (e3 = 0; e3 < r2; e3 += 1)
              t3.i[e3][0] += t3.v[e3][0], t3.i[e3][1] += t3.v[e3][1], t3.o[e3][0] += t3.v[e3][0], t3.o[e3][1] += t3.v[e3][1];
          }
          function i2(t3, e3) {
            var r2 = e3 ? e3.split(".") : [100, 100, 100];
            return t3[0] > r2[0] || !(r2[0] > t3[0]) && (t3[1] > r2[1] || !(r2[1] > t3[1]) && (t3[2] > r2[2] || !(r2[2] > t3[2]) && void 0));
          }
          var s2, a = /* @__PURE__ */ function() {
            var t3 = [4, 4, 14];
            function e3(t4) {
              var e4, r2, i3, s3 = t4.length;
              for (e4 = 0; e4 < s3; e4 += 1)
                5 === t4[e4].ty && (r2 = t4[e4], i3 = void 0, i3 = r2.t.d, r2.t.d = { k: [{ s: i3, t: 0 }] });
            }
            return function(r2) {
              if (i2(t3, r2.v) && (e3(r2.layers), r2.assets)) {
                var s3, a2 = r2.assets.length;
                for (s3 = 0; s3 < a2; s3 += 1)
                  r2.assets[s3].layers && e3(r2.assets[s3].layers);
              }
            };
          }(), n2 = (s2 = [4, 7, 99], function(t3) {
            if (t3.chars && !i2(s2, t3.v)) {
              var e3, a2, n3, o3, h2, l2 = t3.chars.length;
              for (e3 = 0; e3 < l2; e3 += 1)
                if (t3.chars[e3].data && t3.chars[e3].data.shapes)
                  for (n3 = (h2 = t3.chars[e3].data.shapes[0].it).length, a2 = 0; a2 < n3; a2 += 1)
                    (o3 = h2[a2].ks.k).__converted || (r(h2[a2].ks.k), o3.__converted = true);
            }
          }), o2 = /* @__PURE__ */ function() {
            var t3 = [4, 1, 9];
            function e3(t4) {
              var r3, i3, s3, a2 = t4.length;
              for (r3 = 0; r3 < a2; r3 += 1)
                if ("gr" === t4[r3].ty)
                  e3(t4[r3].it);
                else if ("fl" === t4[r3].ty || "st" === t4[r3].ty)
                  if (t4[r3].c.k && t4[r3].c.k[0].i)
                    for (s3 = t4[r3].c.k.length, i3 = 0; i3 < s3; i3 += 1)
                      t4[r3].c.k[i3].s && (t4[r3].c.k[i3].s[0] /= 255, t4[r3].c.k[i3].s[1] /= 255, t4[r3].c.k[i3].s[2] /= 255, t4[r3].c.k[i3].s[3] /= 255), t4[r3].c.k[i3].e && (t4[r3].c.k[i3].e[0] /= 255, t4[r3].c.k[i3].e[1] /= 255, t4[r3].c.k[i3].e[2] /= 255, t4[r3].c.k[i3].e[3] /= 255);
                  else
                    t4[r3].c.k[0] /= 255, t4[r3].c.k[1] /= 255, t4[r3].c.k[2] /= 255, t4[r3].c.k[3] /= 255;
            }
            function r2(t4) {
              var r3, i3 = t4.length;
              for (r3 = 0; r3 < i3; r3 += 1)
                4 === t4[r3].ty && e3(t4[r3].shapes);
            }
            return function(e4) {
              if (i2(t3, e4.v) && (r2(e4.layers), e4.assets)) {
                var s3, a2 = e4.assets.length;
                for (s3 = 0; s3 < a2; s3 += 1)
                  e4.assets[s3].layers && r2(e4.assets[s3].layers);
              }
            };
          }(), h = /* @__PURE__ */ function() {
            var t3 = [4, 4, 18];
            function e3(t4) {
              var r3, i3, s3;
              for (r3 = t4.length - 1; r3 >= 0; r3 -= 1)
                if ("sh" == t4[r3].ty) {
                  if (t4[r3].ks.k.i)
                    t4[r3].ks.k.c = t4[r3].closed;
                  else
                    for (s3 = t4[r3].ks.k.length, i3 = 0; i3 < s3; i3 += 1)
                      t4[r3].ks.k[i3].s && (t4[r3].ks.k[i3].s[0].c = t4[r3].closed), t4[r3].ks.k[i3].e && (t4[r3].ks.k[i3].e[0].c = t4[r3].closed);
                } else
                  "gr" == t4[r3].ty && e3(t4[r3].it);
            }
            function r2(t4) {
              var r3, i3, s3, a2, n3, o3, h2 = t4.length;
              for (i3 = 0; i3 < h2; i3 += 1) {
                if ((r3 = t4[i3]).hasMask) {
                  var l2 = r3.masksProperties;
                  for (a2 = l2.length, s3 = 0; s3 < a2; s3 += 1)
                    if (l2[s3].pt.k.i)
                      l2[s3].pt.k.c = l2[s3].cl;
                    else
                      for (o3 = l2[s3].pt.k.length, n3 = 0; n3 < o3; n3 += 1)
                        l2[s3].pt.k[n3].s && (l2[s3].pt.k[n3].s[0].c = l2[s3].cl), l2[s3].pt.k[n3].e && (l2[s3].pt.k[n3].e[0].c = l2[s3].cl);
                }
                4 === r3.ty && e3(r3.shapes);
              }
            }
            return function(e4) {
              if (i2(t3, e4.v) && (r2(e4.layers), e4.assets)) {
                var s3, a2 = e4.assets.length;
                for (s3 = 0; s3 < a2; s3 += 1)
                  e4.assets[s3].layers && r2(e4.assets[s3].layers);
              }
            };
          }();
          function l(t3, e3) {
            0 !== t3.t.a.length || "m" in t3.t.p || (t3.singleShape = true);
          }
          var p2 = { completeData: function(i3, s3) {
            i3.__complete || (o2(i3), a(i3), n2(i3), h(i3), function i4(s4, a2, n3) {
              var o3, h2, p3, f2, m, c, d = s4.length;
              for (h2 = 0; h2 < d; h2 += 1)
                if ("ks" in (o3 = s4[h2]) && !o3.completed) {
                  if (o3.completed = true, o3.tt && (s4[h2 - 1].td = o3.tt), o3.hasMask) {
                    var u = o3.masksProperties;
                    for (f2 = u.length, p3 = 0; p3 < f2; p3 += 1)
                      if (u[p3].pt.k.i)
                        r(u[p3].pt.k);
                      else
                        for (c = u[p3].pt.k.length, m = 0; m < c; m += 1)
                          u[p3].pt.k[m].s && r(u[p3].pt.k[m].s[0]), u[p3].pt.k[m].e && r(u[p3].pt.k[m].e[0]);
                  }
                  0 === o3.ty ? (o3.layers = t2(o3.refId, a2), i4(o3.layers, a2)) : 4 === o3.ty ? e2(o3.shapes) : 5 == o3.ty && l(o3);
                }
            }(i3.layers, i3.assets), i3.__complete = true);
          } };
          return p2;
        }
        var dataManager = dataFunctionManager(), FontManager = function() {
          var t2 = { w: 0, size: 0, shapes: [] }, e2 = [];
          function r(t3, e3) {
            var r2 = createTag("span");
            r2.style.fontFamily = e3;
            var i3 = createTag("span");
            i3.innerHTML = "giItT1WQy@!-/#", r2.style.position = "absolute", r2.style.left = "-10000px", r2.style.top = "-10000px", r2.style.fontSize = "300px", r2.style.fontVariant = "normal", r2.style.fontStyle = "normal", r2.style.fontWeight = "normal", r2.style.letterSpacing = "0", r2.appendChild(i3), document.body.appendChild(r2);
            var s3 = i3.offsetWidth;
            return i3.style.fontFamily = t3 + ", " + e3, { node: i3, w: s3, parent: r2 };
          }
          function i2(t3, e3) {
            var r2 = createNS("text");
            return r2.style.fontSize = "100px", r2.setAttribute("font-family", e3.fFamily), r2.setAttribute("font-style", e3.fStyle), r2.setAttribute("font-weight", e3.fWeight), r2.textContent = "1", e3.fClass ? (r2.style.fontFamily = "inherit", r2.setAttribute("class", e3.fClass)) : r2.style.fontFamily = e3.fFamily, t3.appendChild(r2), createTag("canvas").getContext("2d").font = e3.fWeight + " " + e3.fStyle + " 100px " + e3.fFamily, r2;
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
              var e3, r2, i3, s3 = t3.length, a = this.chars.length;
              for (e3 = 0; e3 < s3; e3 += 1) {
                for (r2 = 0, i3 = false; r2 < a; )
                  this.chars[r2].style === t3[e3].style && this.chars[r2].fFamily === t3[e3].fFamily && this.chars[r2].ch === t3[e3].ch && (i3 = true), r2 += 1;
                i3 || (this.chars.push(t3[e3]), a += 1);
              }
            }
          }, s2.prototype.addFonts = function(t3, e3) {
            if (t3) {
              if (this.chars)
                return this.isLoaded = true, void (this.fonts = t3.list);
              var s3, a = t3.list, n2 = a.length, o2 = n2;
              for (s3 = 0; s3 < n2; s3 += 1) {
                var h, l, p2 = true;
                if (a[s3].loaded = false, a[s3].monoCase = r(a[s3].fFamily, "monospace"), a[s3].sansCase = r(a[s3].fFamily, "sans-serif"), a[s3].fPath) {
                  if ("p" === a[s3].fOrigin || 3 === a[s3].origin) {
                    if ((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + a[s3].fFamily + '"], style[f-origin="3"][f-family="' + a[s3].fFamily + '"]')).length > 0 && (p2 = false), p2) {
                      var f2 = createTag("style");
                      f2.setAttribute("f-forigin", a[s3].fOrigin), f2.setAttribute("f-origin", a[s3].origin), f2.setAttribute("f-family", a[s3].fFamily), f2.type = "text/css", f2.innerHTML = "@font-face {font-family: " + a[s3].fFamily + "; font-style: normal; src: url('" + a[s3].fPath + "');}", e3.appendChild(f2);
                    }
                  } else if ("g" === a[s3].fOrigin || 1 === a[s3].origin) {
                    for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l = 0; l < h.length; l++)
                      -1 !== h[l].href.indexOf(a[s3].fPath) && (p2 = false);
                    if (p2) {
                      var m = createTag("link");
                      m.setAttribute("f-forigin", a[s3].fOrigin), m.setAttribute("f-origin", a[s3].origin), m.type = "text/css", m.rel = "stylesheet", m.href = a[s3].fPath, document.body.appendChild(m);
                    }
                  } else if ("t" === a[s3].fOrigin || 2 === a[s3].origin) {
                    for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l = 0; l < h.length; l++)
                      a[s3].fPath === h[l].src && (p2 = false);
                    if (p2) {
                      var c = createTag("link");
                      c.setAttribute("f-forigin", a[s3].fOrigin), c.setAttribute("f-origin", a[s3].origin), c.setAttribute("rel", "stylesheet"), c.setAttribute("href", a[s3].fPath), e3.appendChild(c);
                    }
                  }
                } else
                  a[s3].loaded = true, o2 -= 1;
                a[s3].helper = i2(e3, a[s3]), a[s3].cache = {}, this.fonts.push(a[s3]);
              }
              0 === o2 ? this.isLoaded = true : setTimeout(this.checkLoadedFonts.bind(this), 100);
            } else
              this.isLoaded = true;
          }, s2.prototype.getCharData = function(e3, r2, i3) {
            for (var s3 = 0, a = this.chars.length; s3 < a; ) {
              if (this.chars[s3].ch === e3 && this.chars[s3].style === r2 && this.chars[s3].fFamily === i3)
                return this.chars[s3];
              s3 += 1;
            }
            return ("string" == typeof e3 && 13 !== e3.charCodeAt(0) || !e3) && console && console.warn && index.__f__("warn", "at node_modules/lottie-miniprogram/miniprogram_dist/index.js:9", "Missing character from exported characters list: ", e3, r2, i3), t2;
          }, s2.prototype.getFontByName = function(t3) {
            for (var e3 = 0, r2 = this.fonts.length; e3 < r2; ) {
              if (this.fonts[e3].fName === t3)
                return this.fonts[e3];
              e3 += 1;
            }
            return this.fonts[0];
          }, s2.prototype.measureText = function(t3, e3, r2) {
            var i3 = this.getFontByName(e3), s3 = t3.charCodeAt(0);
            if (!i3.cache[s3 + 1]) {
              var a = i3.helper;
              if (" " === t3) {
                a.textContent = "|" + t3 + "|";
                var n2 = a.getComputedTextLength();
                a.textContent = "||";
                var o2 = a.getComputedTextLength();
                i3.cache[s3 + 1] = (n2 - o2) / 100;
              } else
                a.textContent = t3, i3.cache[s3 + 1] = a.getComputedTextLength() / 100;
            }
            return i3.cache[s3 + 1] * r2;
          }, s2.prototype.checkLoadedFonts = function() {
            var t3, e3, r2, i3 = this.fonts.length, s3 = i3;
            for (t3 = 0; t3 < i3; t3 += 1)
              this.fonts[t3].loaded ? s3 -= 1 : "n" === this.fonts[t3].fOrigin || 0 === this.fonts[t3].origin ? this.fonts[t3].loaded = true : (e3 = this.fonts[t3].monoCase.node, r2 = this.fonts[t3].monoCase.w, e3.offsetWidth !== r2 ? (s3 -= 1, this.fonts[t3].loaded = true) : (e3 = this.fonts[t3].sansCase.node, r2 = this.fonts[t3].sansCase.w, e3.offsetWidth !== r2 && (s3 -= 1, this.fonts[t3].loaded = true)), this.fonts[t3].loaded && (this.fonts[t3].sansCase.parent.parentNode.removeChild(this.fonts[t3].sansCase.parent), this.fonts[t3].monoCase.parent.parentNode.removeChild(this.fonts[t3].monoCase.parent)));
            0 !== s3 && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout((function() {
              this.isLoaded = true;
            }).bind(this), 0);
          }, s2.prototype.loaded = function() {
            return this.isLoaded;
          }, s2;
        }(), PropertyFactory = /* @__PURE__ */ function() {
          var t2 = initialDefaultFrame, e2 = Math.abs;
          function r(t3, e3) {
            var r2, s3 = this.offsetTime;
            "multidimensional" === this.propType && (r2 = createTypedArray("float32", this.pv.length));
            for (var a2, n3, o3, h2, l2, p3, f3, m, c = e3.lastIndex, d = c, u = this.keyframes.length - 1, y = true; y; ) {
              if (a2 = this.keyframes[d], n3 = this.keyframes[d + 1], d === u - 1 && t3 >= n3.t - s3) {
                a2.h && (a2 = n3), c = 0;
                break;
              }
              if (n3.t - s3 > t3) {
                c = d;
                break;
              }
              d < u - 1 ? d += 1 : (c = 0, y = false);
            }
            var g, v = n3.t - s3, b = a2.t - s3;
            if (a2.to) {
              a2.bezierData || (a2.bezierData = bez.buildBezierData(a2.s, n3.s || a2.e, a2.to, a2.ti));
              var P = a2.bezierData;
              if (t3 >= v || t3 < b) {
                var _ = t3 >= v ? P.points.length - 1 : 0;
                for (h2 = P.points[_].point.length, o3 = 0; o3 < h2; o3 += 1)
                  r2[o3] = P.points[_].point[o3];
              } else {
                a2.__fnct ? m = a2.__fnct : (m = BezierFactory.getBezierEasing(a2.o.x, a2.o.y, a2.i.x, a2.i.y, a2.n).get, a2.__fnct = m), l2 = m((t3 - b) / (v - b));
                var x, S = P.segmentLength * l2, E2 = e3.lastFrame < t3 && e3._lastKeyframeIndex === d ? e3._lastAddedLength : 0;
                for (f3 = e3.lastFrame < t3 && e3._lastKeyframeIndex === d ? e3._lastPoint : 0, y = true, p3 = P.points.length; y; ) {
                  if (E2 += P.points[f3].partialLength, 0 === S || 0 === l2 || f3 === P.points.length - 1) {
                    for (h2 = P.points[f3].point.length, o3 = 0; o3 < h2; o3 += 1)
                      r2[o3] = P.points[f3].point[o3];
                    break;
                  }
                  if (S >= E2 && S < E2 + P.points[f3 + 1].partialLength) {
                    for (x = (S - E2) / P.points[f3 + 1].partialLength, h2 = P.points[f3].point.length, o3 = 0; o3 < h2; o3 += 1)
                      r2[o3] = P.points[f3].point[o3] + (P.points[f3 + 1].point[o3] - P.points[f3].point[o3]) * x;
                    break;
                  }
                  f3 < p3 - 1 ? f3 += 1 : y = false;
                }
                e3._lastPoint = f3, e3._lastAddedLength = E2 - P.points[f3].partialLength, e3._lastKeyframeIndex = d;
              }
            } else {
              var T, C, A, k, D;
              if (u = a2.s.length, g = n3.s || a2.e, this.sh && 1 !== a2.h)
                if (t3 >= v)
                  r2[0] = g[0], r2[1] = g[1], r2[2] = g[2];
                else if (t3 <= b)
                  r2[0] = a2.s[0], r2[1] = a2.s[1], r2[2] = a2.s[2];
                else {
                  !function(t4, e4) {
                    var r3 = e4[0], i3 = e4[1], s4 = e4[2], a3 = e4[3], n4 = Math.atan2(2 * i3 * a3 - 2 * r3 * s4, 1 - 2 * i3 * i3 - 2 * s4 * s4), o4 = Math.asin(2 * r3 * i3 + 2 * s4 * a3), h3 = Math.atan2(2 * r3 * a3 - 2 * i3 * s4, 1 - 2 * r3 * r3 - 2 * s4 * s4);
                    t4[0] = n4 / degToRads, t4[1] = o4 / degToRads, t4[2] = h3 / degToRads;
                  }(r2, function(t4, e4, r3) {
                    var i3, s4, a3, n4, o4, h3 = [], l3 = t4[0], p4 = t4[1], f4 = t4[2], m2 = t4[3], c2 = e4[0], d2 = e4[1], u2 = e4[2], y2 = e4[3];
                    (s4 = l3 * c2 + p4 * d2 + f4 * u2 + m2 * y2) < 0 && (s4 = -s4, c2 = -c2, d2 = -d2, u2 = -u2, y2 = -y2);
                    1 - s4 > 1e-6 ? (i3 = Math.acos(s4), a3 = Math.sin(i3), n4 = Math.sin((1 - r3) * i3) / a3, o4 = Math.sin(r3 * i3) / a3) : (n4 = 1 - r3, o4 = r3);
                    return h3[0] = n4 * l3 + o4 * c2, h3[1] = n4 * p4 + o4 * d2, h3[2] = n4 * f4 + o4 * u2, h3[3] = n4 * m2 + o4 * y2, h3;
                  }(i2(a2.s), i2(g), (t3 - b) / (v - b)));
                }
              else
                for (d = 0; d < u; d += 1)
                  1 !== a2.h && (t3 >= v ? l2 = 1 : t3 < b ? l2 = 0 : (a2.o.x.constructor === Array ? (a2.__fnct || (a2.__fnct = []), a2.__fnct[d] ? m = a2.__fnct[d] : (T = void 0 === a2.o.x[d] ? a2.o.x[0] : a2.o.x[d], C = void 0 === a2.o.y[d] ? a2.o.y[0] : a2.o.y[d], A = void 0 === a2.i.x[d] ? a2.i.x[0] : a2.i.x[d], k = void 0 === a2.i.y[d] ? a2.i.y[0] : a2.i.y[d], m = BezierFactory.getBezierEasing(T, C, A, k).get, a2.__fnct[d] = m)) : a2.__fnct ? m = a2.__fnct : (T = a2.o.x, C = a2.o.y, A = a2.i.x, k = a2.i.y, m = BezierFactory.getBezierEasing(T, C, A, k).get, a2.__fnct = m), l2 = m((t3 - b) / (v - b)))), g = n3.s || a2.e, D = 1 === a2.h ? a2.s[d] : a2.s[d] + (g[d] - a2.s[d]) * l2, 1 === u ? r2 = D : r2[d] = D;
            }
            return e3.lastIndex = c, r2;
          }
          function i2(t3) {
            var e3 = t3[0] * degToRads, r2 = t3[1] * degToRads, i3 = t3[2] * degToRads, s3 = Math.cos(e3 / 2), a2 = Math.cos(r2 / 2), n3 = Math.cos(i3 / 2), o3 = Math.sin(e3 / 2), h2 = Math.sin(r2 / 2), l2 = Math.sin(i3 / 2);
            return [o3 * h2 * n3 + s3 * a2 * l2, o3 * a2 * n3 + s3 * h2 * l2, s3 * h2 * n3 - o3 * a2 * l2, s3 * a2 * n3 - o3 * h2 * l2];
          }
          function s2() {
            var e3 = this.comp.renderedFrame - this.offsetTime, r2 = this.keyframes[0].t - this.offsetTime, i3 = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
            if (!(e3 === this._caching.lastFrame || this._caching.lastFrame !== t2 && (this._caching.lastFrame >= i3 && e3 >= i3 || this._caching.lastFrame < r2 && e3 < r2))) {
              this._caching.lastFrame >= e3 && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
              var s3 = this.interpolateValue(e3, this._caching);
              this.pv = s3;
            }
            return this._caching.lastFrame = e3, this.pv;
          }
          function a(t3) {
            var r2;
            if ("unidimensional" === this.propType)
              r2 = t3 * this.mult, e2(this.v - r2) > 1e-5 && (this.v = r2, this._mdf = true);
            else
              for (var i3 = 0, s3 = this.v.length; i3 < s3; )
                r2 = t3[i3] * this.mult, e2(this.v[i3] - r2) > 1e-5 && (this.v[i3] = r2, this._mdf = true), i3 += 1;
          }
          function n2() {
            if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
              if (this.lock)
                this.setVValue(this.pv);
              else {
                this.lock = true, this._mdf = this._isFirstFrame;
                var t3, e3 = this.effectsSequence.length, r2 = this.kf ? this.pv : this.data.k;
                for (t3 = 0; t3 < e3; t3 += 1)
                  r2 = this.effectsSequence[t3](r2);
                this.setVValue(r2), this._isFirstFrame = false, this.lock = false, this.frameId = this.elem.globalData.frameId;
              }
          }
          function o2(t3) {
            this.effectsSequence.push(t3), this.container.addDynamicProperty(this);
          }
          function h(t3, e3, r2, i3) {
            this.propType = "unidimensional", this.mult = r2 || 1, this.data = e3, this.v = r2 ? e3.k * r2 : e3.k, this.pv = e3.k, this._mdf = false, this.elem = t3, this.container = i3, this.comp = t3.comp, this.k = false, this.kf = false, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = true, this.getValue = n2, this.setVValue = a, this.addEffect = o2;
          }
          function l(t3, e3, r2, i3) {
            this.propType = "multidimensional", this.mult = r2 || 1, this.data = e3, this._mdf = false, this.elem = t3, this.container = i3, this.comp = t3.comp, this.k = false, this.kf = false, this.frameId = -1;
            var s3, h2 = e3.k.length;
            this.v = createTypedArray("float32", h2), this.pv = createTypedArray("float32", h2);
            createTypedArray("float32", h2);
            for (this.vel = createTypedArray("float32", h2), s3 = 0; s3 < h2; s3 += 1)
              this.v[s3] = e3.k[s3] * this.mult, this.pv[s3] = e3.k[s3];
            this._isFirstFrame = true, this.effectsSequence = [], this.getValue = n2, this.setVValue = a, this.addEffect = o2;
          }
          function p2(e3, i3, h2, l2) {
            this.propType = "unidimensional", this.keyframes = i3.k, this.offsetTime = e3.data.st, this.frameId = -1, this._caching = { lastFrame: t2, lastIndex: 0, value: 0, _lastKeyframeIndex: -1 }, this.k = true, this.kf = true, this.data = i3, this.mult = h2 || 1, this.elem = e3, this.container = l2, this.comp = e3.comp, this.v = t2, this.pv = t2, this._isFirstFrame = true, this.getValue = n2, this.setVValue = a, this.interpolateValue = r, this.effectsSequence = [s2.bind(this)], this.addEffect = o2;
          }
          function f2(e3, i3, h2, l2) {
            this.propType = "multidimensional";
            var p3, f3, m, c, d, u = i3.k.length;
            for (p3 = 0; p3 < u - 1; p3 += 1)
              i3.k[p3].to && i3.k[p3].s && i3.k[p3].e && (f3 = i3.k[p3].s, m = i3.k[p3].e, c = i3.k[p3].to, d = i3.k[p3].ti, (2 === f3.length && (f3[0] !== m[0] || f3[1] !== m[1]) && bez.pointOnLine2D(f3[0], f3[1], m[0], m[1], f3[0] + c[0], f3[1] + c[1]) && bez.pointOnLine2D(f3[0], f3[1], m[0], m[1], m[0] + d[0], m[1] + d[1]) || 3 === f3.length && (f3[0] !== m[0] || f3[1] !== m[1] || f3[2] !== m[2]) && bez.pointOnLine3D(f3[0], f3[1], f3[2], m[0], m[1], m[2], f3[0] + c[0], f3[1] + c[1], f3[2] + c[2]) && bez.pointOnLine3D(f3[0], f3[1], f3[2], m[0], m[1], m[2], m[0] + d[0], m[1] + d[1], m[2] + d[2])) && (i3.k[p3].to = null, i3.k[p3].ti = null), f3[0] === m[0] && f3[1] === m[1] && 0 === c[0] && 0 === c[1] && 0 === d[0] && 0 === d[1] && (2 === f3.length || f3[2] === m[2] && 0 === c[2] && 0 === d[2]) && (i3.k[p3].to = null, i3.k[p3].ti = null));
            this.effectsSequence = [s2.bind(this)], this.keyframes = i3.k, this.offsetTime = e3.data.st, this.k = true, this.kf = true, this._isFirstFrame = true, this.mult = h2 || 1, this.elem = e3, this.container = l2, this.comp = e3.comp, this.getValue = n2, this.setVValue = a, this.interpolateValue = r, this.frameId = -1;
            var y = i3.k[0].s.length;
            for (this.v = createTypedArray("float32", y), this.pv = createTypedArray("float32", y), p3 = 0; p3 < y; p3 += 1)
              this.v[p3] = t2, this.pv[p3] = t2;
            this._caching = { lastFrame: t2, lastIndex: 0, value: createTypedArray("float32", y) }, this.addEffect = o2;
          }
          return { getProp: function(t3, e3, r2, i3, s3) {
            var a2;
            if (e3.k.length)
              if ("number" == typeof e3.k[0])
                a2 = new l(t3, e3, i3, s3);
              else
                switch (r2) {
                  case 0:
                    a2 = new p2(t3, e3, i3, s3);
                    break;
                  case 1:
                    a2 = new f2(t3, e3, i3, s3);
                }
            else
              a2 = new h(t3, e3, i3, s3);
            return a2.effectsSequence.length && s3.addDynamicProperty(a2), a2;
          } };
        }(), TransformPropertyFactory = function() {
          function t2(t3, e2, r) {
            if (this.elem = t3, this.frameId = -1, this.propType = "transform", this.data = e2, this.v = new Matrix(), this.pre = new Matrix(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t3), e2.p && e2.p.s ? (this.px = PropertyFactory.getProp(t3, e2.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t3, e2.p.y, 0, 0, this), e2.p.z && (this.pz = PropertyFactory.getProp(t3, e2.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t3, e2.p || { k: [0, 0, 0] }, 1, 0, this), e2.rx) {
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
                  var e2, r, i2 = this.elem.globalData.frameRate;
                  if (this.p && this.p.keyframes && this.p.getValueAtTime)
                    this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e2 = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / i2, 0), r = this.p.getValueAtTime(this.p.keyframes[0].t / i2, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e2 = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / i2, 0), r = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.01) / i2, 0)) : (e2 = this.p.pv, r = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / i2, this.p.offsetTime));
                  else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                    e2 = [], r = [];
                    var s2 = this.px, a = this.py;
                    s2._caching.lastFrame + s2.offsetTime <= s2.keyframes[0].t ? (e2[0] = s2.getValueAtTime((s2.keyframes[0].t + 0.01) / i2, 0), e2[1] = a.getValueAtTime((a.keyframes[0].t + 0.01) / i2, 0), r[0] = s2.getValueAtTime(s2.keyframes[0].t / i2, 0), r[1] = a.getValueAtTime(a.keyframes[0].t / i2, 0)) : s2._caching.lastFrame + s2.offsetTime >= s2.keyframes[s2.keyframes.length - 1].t ? (e2[0] = s2.getValueAtTime(s2.keyframes[s2.keyframes.length - 1].t / i2, 0), e2[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / i2, 0), r[0] = s2.getValueAtTime((s2.keyframes[s2.keyframes.length - 1].t - 0.01) / i2, 0), r[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - 0.01) / i2, 0)) : (e2 = [s2.pv, a.pv], r[0] = s2.getValueAtTime((s2._caching.lastFrame + s2.offsetTime - 0.01) / i2, s2.offsetTime), r[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - 0.01) / i2, a.offsetTime));
                  }
                  this.v.rotate(-Math.atan2(e2[1] - r[1], e2[0] - r[0]));
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
          }, t2.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, { getTransformProperty: function(e2, r, i2) {
            return new t2(e2, r, i2);
          } };
        }();
        function ShapePath() {
          this.c = false, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength);
        }
        ShapePath.prototype.setPathData = function(t2, e2) {
          this.c = t2, this.setLength(e2);
          for (var r = 0; r < e2; )
            this.v[r] = point_pool.newElement(), this.o[r] = point_pool.newElement(), this.i[r] = point_pool.newElement(), r += 1;
        }, ShapePath.prototype.setLength = function(t2) {
          for (; this._maxLength < t2; )
            this.doubleArrayLength();
          this._length = t2;
        }, ShapePath.prototype.doubleArrayLength = function() {
          this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2;
        }, ShapePath.prototype.setXYAt = function(t2, e2, r, i2, s2) {
          var a;
          switch (this._length = Math.max(this._length, i2 + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
            case "v":
              a = this.v;
              break;
            case "i":
              a = this.i;
              break;
            case "o":
              a = this.o;
          }
          (!a[i2] || a[i2] && !s2) && (a[i2] = point_pool.newElement()), a[i2][0] = t2, a[i2][1] = e2;
        }, ShapePath.prototype.setTripleAt = function(t2, e2, r, i2, s2, a, n2, o2) {
          this.setXYAt(t2, e2, "v", n2, o2), this.setXYAt(r, i2, "o", n2, o2), this.setXYAt(s2, a, "i", n2, o2);
        }, ShapePath.prototype.reverse = function() {
          var t2 = new ShapePath();
          t2.setPathData(this.c, this._length);
          var e2 = this.v, r = this.o, i2 = this.i, s2 = 0;
          this.c && (t2.setTripleAt(e2[0][0], e2[0][1], i2[0][0], i2[0][1], r[0][0], r[0][1], 0, false), s2 = 1);
          var a, n2 = this._length - 1, o2 = this._length;
          for (a = s2; a < o2; a += 1)
            t2.setTripleAt(e2[n2][0], e2[n2][1], i2[n2][0], i2[n2][1], r[n2][0], r[n2][1], a, false), n2 -= 1;
          return t2;
        };
        var ShapePropertyFactory = function() {
          function t2(t3, e3, r2) {
            var i3, s3, a2, n3, o3, h2, l2, p3, f3, m = r2.lastIndex, c = this.keyframes;
            if (t3 < c[0].t - this.offsetTime)
              i3 = c[0].s[0], a2 = true, m = 0;
            else if (t3 >= c[c.length - 1].t - this.offsetTime)
              i3 = c[c.length - 1].s ? c[c.length - 1].s[0] : c[c.length - 2].e[0], a2 = true;
            else {
              for (var d, u, y = m, g = c.length - 1, v = true; v && (d = c[y], !((u = c[y + 1]).t - this.offsetTime > t3)); )
                y < g - 1 ? y += 1 : v = false;
              if (m = y, !(a2 = 1 === d.h)) {
                if (t3 >= u.t - this.offsetTime)
                  p3 = 1;
                else if (t3 < d.t - this.offsetTime)
                  p3 = 0;
                else {
                  var b;
                  d.__fnct ? b = d.__fnct : (b = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = b), p3 = b((t3 - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)));
                }
                s3 = u.s ? u.s[0] : d.e[0];
              }
              i3 = d.s[0];
            }
            for (h2 = e3._length, l2 = i3.i[0].length, r2.lastIndex = m, n3 = 0; n3 < h2; n3 += 1)
              for (o3 = 0; o3 < l2; o3 += 1)
                f3 = a2 ? i3.i[n3][o3] : i3.i[n3][o3] + (s3.i[n3][o3] - i3.i[n3][o3]) * p3, e3.i[n3][o3] = f3, f3 = a2 ? i3.o[n3][o3] : i3.o[n3][o3] + (s3.o[n3][o3] - i3.o[n3][o3]) * p3, e3.o[n3][o3] = f3, f3 = a2 ? i3.v[n3][o3] : i3.v[n3][o3] + (s3.v[n3][o3] - i3.v[n3][o3]) * p3, e3.v[n3][o3] = f3;
          }
          function e2() {
            var t3 = this.comp.renderedFrame - this.offsetTime, e3 = this.keyframes[0].t - this.offsetTime, r2 = this.keyframes[this.keyframes.length - 1].t - this.offsetTime, i3 = this._caching.lastFrame;
            return -999999 !== i3 && (i3 < e3 && t3 < e3 || i3 > r2 && t3 > r2) || (this._caching.lastIndex = i3 < t3 ? this._caching.lastIndex : 0, this.interpolateShape(t3, this.pv, this._caching)), this._caching.lastFrame = t3, this.pv;
          }
          function r() {
            this.paths = this.localShapeCollection;
          }
          function i2(t3) {
            (function(t4, e3) {
              if (t4._length !== e3._length || t4.c !== e3.c)
                return false;
              var r2, i3 = t4._length;
              for (r2 = 0; r2 < i3; r2 += 1)
                if (t4.v[r2][0] !== e3.v[r2][0] || t4.v[r2][1] !== e3.v[r2][1] || t4.o[r2][0] !== e3.o[r2][0] || t4.o[r2][1] !== e3.o[r2][1] || t4.i[r2][0] !== e3.i[r2][0] || t4.i[r2][1] !== e3.i[r2][1])
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
                  var t3, e3 = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k, r2 = this.effectsSequence.length;
                  for (t3 = 0; t3 < r2; t3 += 1)
                    e3 = this.effectsSequence[t3](e3);
                  this.setVValue(e3), this.lock = false, this.frameId = this.elem.globalData.frameId;
                }
              else
                this._mdf = false;
          }
          function a(t3, e3, i3) {
            this.propType = "shape", this.comp = t3.comp, this.container = t3, this.elem = t3, this.data = e3, this.k = false, this.kf = false, this._mdf = false;
            var s3 = 3 === i3 ? e3.pt.k : e3.ks.k;
            this.v = shape_pool.clone(s3), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = r, this.effectsSequence = [];
          }
          function n2(t3) {
            this.effectsSequence.push(t3), this.container.addDynamicProperty(this);
          }
          function o2(t3, i3, s3) {
            this.propType = "shape", this.comp = t3.comp, this.elem = t3, this.container = t3, this.offsetTime = t3.data.st, this.keyframes = 3 === s3 ? i3.pt.k : i3.ks.k, this.k = true, this.kf = true;
            var a2 = this.keyframes[0].s[0].i.length;
            this.keyframes[0].s[0].i[0].length;
            this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, a2), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = -999999, this.reset = r, this._caching = { lastFrame: -999999, lastIndex: 0 }, this.effectsSequence = [e2.bind(this)];
          }
          a.prototype.interpolateShape = t2, a.prototype.getValue = s2, a.prototype.setVValue = i2, a.prototype.addEffect = n2, o2.prototype.getValue = s2, o2.prototype.interpolateShape = t2, o2.prototype.setVValue = i2, o2.prototype.addEffect = n2;
          var h = function() {
            var t3 = roundCorner;
            function e3(t4, e4) {
              this.v = shape_pool.newElement(), this.v.setPathData(true, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e4.d, this.elem = t4, this.comp = t4.comp, this.frameId = -1, this.initDynamicPropertyContainer(t4), this.p = PropertyFactory.getProp(t4, e4.p, 1, 0, this), this.s = PropertyFactory.getProp(t4, e4.s, 1, 0, this), this.dynamicProperties.length ? this.k = true : (this.k = false, this.convertEllToPath());
            }
            return e3.prototype = { reset: r, getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
            }, convertEllToPath: function() {
              var e4 = this.p.v[0], r2 = this.p.v[1], i3 = this.s.v[0] / 2, s3 = this.s.v[1] / 2, a2 = 3 !== this.d, n3 = this.v;
              n3.v[0][0] = e4, n3.v[0][1] = r2 - s3, n3.v[1][0] = a2 ? e4 + i3 : e4 - i3, n3.v[1][1] = r2, n3.v[2][0] = e4, n3.v[2][1] = r2 + s3, n3.v[3][0] = a2 ? e4 - i3 : e4 + i3, n3.v[3][1] = r2, n3.i[0][0] = a2 ? e4 - i3 * t3 : e4 + i3 * t3, n3.i[0][1] = r2 - s3, n3.i[1][0] = a2 ? e4 + i3 : e4 - i3, n3.i[1][1] = r2 - s3 * t3, n3.i[2][0] = a2 ? e4 + i3 * t3 : e4 - i3 * t3, n3.i[2][1] = r2 + s3, n3.i[3][0] = a2 ? e4 - i3 : e4 + i3, n3.i[3][1] = r2 + s3 * t3, n3.o[0][0] = a2 ? e4 + i3 * t3 : e4 - i3 * t3, n3.o[0][1] = r2 - s3, n3.o[1][0] = a2 ? e4 + i3 : e4 - i3, n3.o[1][1] = r2 + s3 * t3, n3.o[2][0] = a2 ? e4 - i3 * t3 : e4 + i3 * t3, n3.o[2][1] = r2 + s3, n3.o[3][0] = a2 ? e4 - i3 : e4 + i3, n3.o[3][1] = r2 - s3 * t3;
            } }, extendPrototype([DynamicPropertyContainer], e3), e3;
          }(), l = function() {
            function t3(t4, e3) {
              this.v = shape_pool.newElement(), this.v.setPathData(true, 0), this.elem = t4, this.comp = t4.comp, this.data = e3, this.frameId = -1, this.d = e3.d, this.initDynamicPropertyContainer(t4), 1 === e3.sy ? (this.ir = PropertyFactory.getProp(t4, e3.ir, 0, 0, this), this.is = PropertyFactory.getProp(t4, e3.is, 0, 0.01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t4, e3.pt, 0, 0, this), this.p = PropertyFactory.getProp(t4, e3.p, 1, 0, this), this.r = PropertyFactory.getProp(t4, e3.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t4, e3.or, 0, 0, this), this.os = PropertyFactory.getProp(t4, e3.os, 0, 0.01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = true : (this.k = false, this.convertToPath());
            }
            return t3.prototype = { reset: r, getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
            }, convertStarToPath: function() {
              var t4, e3, r2, i3, s3 = 2 * Math.floor(this.pt.v), a2 = 2 * Math.PI / s3, n3 = true, o3 = this.or.v, h2 = this.ir.v, l2 = this.os.v, p3 = this.is.v, f3 = 2 * Math.PI * o3 / (2 * s3), m = 2 * Math.PI * h2 / (2 * s3), c = -Math.PI / 2;
              c += this.r.v;
              var d = 3 === this.data.d ? -1 : 1;
              for (this.v._length = 0, t4 = 0; t4 < s3; t4 += 1) {
                r2 = n3 ? l2 : p3, i3 = n3 ? f3 : m;
                var u = (e3 = n3 ? o3 : h2) * Math.cos(c), y = e3 * Math.sin(c), g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y), v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * i3 * r2 * d, y - v * i3 * r2 * d, u + g * i3 * r2 * d, y + v * i3 * r2 * d, t4, true), n3 = !n3, c += a2 * d;
              }
            }, convertPolygonToPath: function() {
              var t4, e3 = Math.floor(this.pt.v), r2 = 2 * Math.PI / e3, i3 = this.or.v, s3 = this.os.v, a2 = 2 * Math.PI * i3 / (4 * e3), n3 = -Math.PI / 2, o3 = 3 === this.data.d ? -1 : 1;
              for (n3 += this.r.v, this.v._length = 0, t4 = 0; t4 < e3; t4 += 1) {
                var h2 = i3 * Math.cos(n3), l2 = i3 * Math.sin(n3), p3 = 0 === h2 && 0 === l2 ? 0 : l2 / Math.sqrt(h2 * h2 + l2 * l2), f3 = 0 === h2 && 0 === l2 ? 0 : -h2 / Math.sqrt(h2 * h2 + l2 * l2);
                h2 += +this.p.v[0], l2 += +this.p.v[1], this.v.setTripleAt(h2, l2, h2 - p3 * a2 * s3 * o3, l2 - f3 * a2 * s3 * o3, h2 + p3 * a2 * s3 * o3, l2 + f3 * a2 * s3 * o3, t4, true), n3 += r2 * o3;
              }
              this.paths.length = 0, this.paths[0] = this.v;
            } }, extendPrototype([DynamicPropertyContainer], t3), t3;
          }(), p2 = function() {
            function t3(t4, e3) {
              this.v = shape_pool.newElement(), this.v.c = true, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t4, this.comp = t4.comp, this.frameId = -1, this.d = e3.d, this.initDynamicPropertyContainer(t4), this.p = PropertyFactory.getProp(t4, e3.p, 1, 0, this), this.s = PropertyFactory.getProp(t4, e3.s, 1, 0, this), this.r = PropertyFactory.getProp(t4, e3.r, 0, 0, this), this.dynamicProperties.length ? this.k = true : (this.k = false, this.convertRectToPath());
            }
            return t3.prototype = { convertRectToPath: function() {
              var t4 = this.p.v[0], e3 = this.p.v[1], r2 = this.s.v[0] / 2, i3 = this.s.v[1] / 2, s3 = bm_min(r2, i3, this.r.v), a2 = s3 * (1 - roundCorner);
              this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t4 + r2, e3 - i3 + s3, t4 + r2, e3 - i3 + s3, t4 + r2, e3 - i3 + a2, 0, true), this.v.setTripleAt(t4 + r2, e3 + i3 - s3, t4 + r2, e3 + i3 - a2, t4 + r2, e3 + i3 - s3, 1, true), 0 !== s3 ? (this.v.setTripleAt(t4 + r2 - s3, e3 + i3, t4 + r2 - s3, e3 + i3, t4 + r2 - a2, e3 + i3, 2, true), this.v.setTripleAt(t4 - r2 + s3, e3 + i3, t4 - r2 + a2, e3 + i3, t4 - r2 + s3, e3 + i3, 3, true), this.v.setTripleAt(t4 - r2, e3 + i3 - s3, t4 - r2, e3 + i3 - s3, t4 - r2, e3 + i3 - a2, 4, true), this.v.setTripleAt(t4 - r2, e3 - i3 + s3, t4 - r2, e3 - i3 + a2, t4 - r2, e3 - i3 + s3, 5, true), this.v.setTripleAt(t4 - r2 + s3, e3 - i3, t4 - r2 + s3, e3 - i3, t4 - r2 + a2, e3 - i3, 6, true), this.v.setTripleAt(t4 + r2 - s3, e3 - i3, t4 + r2 - a2, e3 - i3, t4 + r2 - s3, e3 - i3, 7, true)) : (this.v.setTripleAt(t4 - r2, e3 + i3, t4 - r2 + a2, e3 + i3, t4 - r2, e3 + i3, 2), this.v.setTripleAt(t4 - r2, e3 - i3, t4 - r2, e3 - i3 + a2, t4 - r2, e3 - i3, 3))) : (this.v.setTripleAt(t4 + r2, e3 - i3 + s3, t4 + r2, e3 - i3 + a2, t4 + r2, e3 - i3 + s3, 0, true), 0 !== s3 ? (this.v.setTripleAt(t4 + r2 - s3, e3 - i3, t4 + r2 - s3, e3 - i3, t4 + r2 - a2, e3 - i3, 1, true), this.v.setTripleAt(t4 - r2 + s3, e3 - i3, t4 - r2 + a2, e3 - i3, t4 - r2 + s3, e3 - i3, 2, true), this.v.setTripleAt(t4 - r2, e3 - i3 + s3, t4 - r2, e3 - i3 + s3, t4 - r2, e3 - i3 + a2, 3, true), this.v.setTripleAt(t4 - r2, e3 + i3 - s3, t4 - r2, e3 + i3 - a2, t4 - r2, e3 + i3 - s3, 4, true), this.v.setTripleAt(t4 - r2 + s3, e3 + i3, t4 - r2 + s3, e3 + i3, t4 - r2 + a2, e3 + i3, 5, true), this.v.setTripleAt(t4 + r2 - s3, e3 + i3, t4 + r2 - a2, e3 + i3, t4 + r2 - s3, e3 + i3, 6, true), this.v.setTripleAt(t4 + r2, e3 + i3 - s3, t4 + r2, e3 + i3 - s3, t4 + r2, e3 + i3 - a2, 7, true)) : (this.v.setTripleAt(t4 - r2, e3 - i3, t4 - r2 + a2, e3 - i3, t4 - r2, e3 - i3, 1, true), this.v.setTripleAt(t4 - r2, e3 + i3, t4 - r2, e3 + i3 - a2, t4 - r2, e3 + i3, 2, true), this.v.setTripleAt(t4 + r2, e3 + i3, t4 + r2 - a2, e3 + i3, t4 + r2, e3 + i3, 3, true)));
            }, getValue: function(t4) {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
            }, reset: r }, extendPrototype([DynamicPropertyContainer], t3), t3;
          }();
          var f2 = { getShapeProp: function(t3, e3, r2) {
            var i3;
            return 3 === r2 || 4 === r2 ? i3 = (3 === r2 ? e3.pt : e3.ks).k.length ? new o2(t3, e3, r2) : new a(t3, e3, r2) : 5 === r2 ? i3 = new p2(t3, e3) : 6 === r2 ? i3 = new h(t3, e3) : 7 === r2 && (i3 = new l(t3, e3)), i3.k && t3.addDynamicProperty(i3), i3;
          }, getConstructorFunction: function() {
            return a;
          }, getKeyframedConstructorFunction: function() {
            return o2;
          } };
          return f2;
        }(), ShapeModifiers = function() {
          var t2 = {}, e2 = {};
          return t2.registerModifier = function(t3, r) {
            e2[t3] || (e2[t3] = r);
          }, t2.getModifier = function(t3, r, i2) {
            return new e2[t3](r, i2);
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
        function DashProperty(t2, e2, r, i2) {
          this.elem = t2, this.frameId = -1, this.dataProps = createSizedArray(e2.length), this.renderer = r, this.k = false, this.dashStr = "", this.dashArray = createTypedArray("float32", e2.length ? e2.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i2);
          var s2, a, n2 = e2.length || 0;
          for (s2 = 0; s2 < n2; s2 += 1)
            a = PropertyFactory.getProp(t2, e2[s2].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s2] = { n: e2[s2].n, p: a };
          this.k || this.getValue(true), this._isAnimated = this.k;
        }
        function GradientProperty(t2, e2, r) {
          this.data = e2, this.c = createTypedArray("uint8c", 4 * e2.p);
          var i2 = e2.k.k[0].s ? e2.k.k[0].s.length - 4 * e2.p : e2.k.k.length - 4 * e2.p;
          this.o = createTypedArray("float32", i2), this._cmdf = false, this._omdf = false, this._collapsable = this.checkCollapsable(), this._hasOpacity = i2, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t2, e2.k, 1, null, this), this.k = this.prop.k, this.getValue(true);
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
        }, TrimModifier.prototype.calculateShapeEdges = function(t2, e2, r, i2, s2) {
          var a = [];
          e2 <= 1 ? a.push({ s: t2, e: e2 }) : t2 >= 1 ? a.push({ s: t2 - 1, e: e2 - 1 }) : (a.push({ s: t2, e: 1 }), a.push({ s: 0, e: e2 - 1 }));
          var n2, o2, h = [], l = a.length;
          for (n2 = 0; n2 < l; n2 += 1) {
            var p2, f2;
            if ((o2 = a[n2]).e * s2 < i2 || o2.s * s2 > i2 + r)
              ;
            else
              p2 = o2.s * s2 <= i2 ? 0 : (o2.s * s2 - i2) / r, f2 = o2.e * s2 >= i2 + r ? 1 : (o2.e * s2 - i2) / r, h.push([p2, f2]);
          }
          return h.length || h.push([0, 0]), h;
        }, TrimModifier.prototype.releasePathsData = function(t2) {
          var e2, r = t2.length;
          for (e2 = 0; e2 < r; e2 += 1)
            segments_length_pool.release(t2[e2]);
          return t2.length = 0, t2;
        }, TrimModifier.prototype.processShapes = function(t2) {
          var e2, r, i2;
          if (this._mdf || t2) {
            var s2 = this.o.v % 360 / 360;
            if (s2 < 0 && (s2 += 1), (e2 = (this.s.v > 1 ? 1 : this.s.v < 0 ? 0 : this.s.v) + s2) > (r = (this.e.v > 1 ? 1 : this.e.v < 0 ? 0 : this.e.v) + s2)) {
              var a = e2;
              e2 = r, r = a;
            }
            e2 = 1e-4 * Math.round(1e4 * e2), r = 1e-4 * Math.round(1e4 * r), this.sValue = e2, this.eValue = r;
          } else
            e2 = this.sValue, r = this.eValue;
          var n2, o2, h, l, p2, f2, m = this.shapes.length, c = 0;
          if (r === e2)
            for (n2 = 0; n2 < m; n2 += 1)
              this.shapes[n2].localShapeCollection.releaseShapes(), this.shapes[n2].shape._mdf = true, this.shapes[n2].shape.paths = this.shapes[n2].localShapeCollection;
          else if (1 === r && 0 === e2 || 0 === r && 1 === e2) {
            if (this._mdf)
              for (n2 = 0; n2 < m; n2 += 1)
                this.shapes[n2].pathsData.length = 0, this.shapes[n2].shape._mdf = true;
          } else {
            var d, u, y = [];
            for (n2 = 0; n2 < m; n2 += 1)
              if ((d = this.shapes[n2]).shape._mdf || this._mdf || t2 || 2 === this.m) {
                if (h = (i2 = d.shape.paths)._length, f2 = 0, !d.shape._mdf && d.pathsData.length)
                  f2 = d.totalShapeLength;
                else {
                  for (l = this.releasePathsData(d.pathsData), o2 = 0; o2 < h; o2 += 1)
                    p2 = bez.getSegmentsLength(i2.shapes[o2]), l.push(p2), f2 += p2.totalLength;
                  d.totalShapeLength = f2, d.pathsData = l;
                }
                c += f2, d.shape._mdf = true;
              } else
                d.shape.paths = d.localShapeCollection;
            var g, v = e2, b = r, P = 0;
            for (n2 = m - 1; n2 >= 0; n2 -= 1)
              if ((d = this.shapes[n2]).shape._mdf) {
                for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && m > 1 ? (g = this.calculateShapeEdges(e2, r, d.totalShapeLength, P, c), P += d.totalShapeLength) : g = [[v, b]], h = g.length, o2 = 0; o2 < h; o2 += 1) {
                  v = g[o2][0], b = g[o2][1], y.length = 0, b <= 1 ? y.push({ s: d.totalShapeLength * v, e: d.totalShapeLength * b }) : v >= 1 ? y.push({ s: d.totalShapeLength * (v - 1), e: d.totalShapeLength * (b - 1) }) : (y.push({ s: d.totalShapeLength * v, e: d.totalShapeLength }), y.push({ s: 0, e: d.totalShapeLength * (b - 1) }));
                  var _ = this.addShapes(d, y[0]);
                  if (y[0].s !== y[0].e) {
                    if (y.length > 1)
                      if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                        var x = _.pop();
                        this.addPaths(_, u), _ = this.addShapes(d, y[1], x);
                      } else
                        this.addPaths(_, u), _ = this.addShapes(d, y[1]);
                    this.addPaths(_, u);
                  }
                }
                d.shape.paths = u;
              }
          }
        }, TrimModifier.prototype.addPaths = function(t2, e2) {
          var r, i2 = t2.length;
          for (r = 0; r < i2; r += 1)
            e2.addShape(t2[r]);
        }, TrimModifier.prototype.addSegment = function(t2, e2, r, i2, s2, a, n2) {
          s2.setXYAt(e2[0], e2[1], "o", a), s2.setXYAt(r[0], r[1], "i", a + 1), n2 && s2.setXYAt(t2[0], t2[1], "v", a), s2.setXYAt(i2[0], i2[1], "v", a + 1);
        }, TrimModifier.prototype.addSegmentFromArray = function(t2, e2, r, i2) {
          e2.setXYAt(t2[1], t2[5], "o", r), e2.setXYAt(t2[2], t2[6], "i", r + 1), i2 && e2.setXYAt(t2[0], t2[4], "v", r), e2.setXYAt(t2[3], t2[7], "v", r + 1);
        }, TrimModifier.prototype.addShapes = function(t2, e2, r) {
          var i2, s2, a, n2, o2, h, l, p2, f2 = t2.pathsData, m = t2.shape.paths.shapes, c = t2.shape.paths._length, d = 0, u = [], y = true;
          for (r ? (o2 = r._length, p2 = r._length) : (r = shape_pool.newElement(), o2 = 0, p2 = 0), u.push(r), i2 = 0; i2 < c; i2 += 1) {
            for (h = f2[i2].lengths, r.c = m[i2].c, a = m[i2].c ? h.length : h.length + 1, s2 = 1; s2 < a; s2 += 1)
              if (d + (n2 = h[s2 - 1]).addedLength < e2.s)
                d += n2.addedLength, r.c = false;
              else {
                if (d > e2.e) {
                  r.c = false;
                  break;
                }
                e2.s <= d && e2.e >= d + n2.addedLength ? (this.addSegment(m[i2].v[s2 - 1], m[i2].o[s2 - 1], m[i2].i[s2], m[i2].v[s2], r, o2, y), y = false) : (l = bez.getNewSegment(m[i2].v[s2 - 1], m[i2].v[s2], m[i2].o[s2 - 1], m[i2].i[s2], (e2.s - d) / n2.addedLength, (e2.e - d) / n2.addedLength, h[s2 - 1]), this.addSegmentFromArray(l, r, o2, y), y = false, r.c = false), d += n2.addedLength, o2 += 1;
              }
            if (m[i2].c && h.length) {
              if (n2 = h[s2 - 1], d <= e2.e) {
                var g = h[s2 - 1].addedLength;
                e2.s <= d && e2.e >= d + g ? (this.addSegment(m[i2].v[s2 - 1], m[i2].o[s2 - 1], m[i2].i[0], m[i2].v[0], r, o2, y), y = false) : (l = bez.getNewSegment(m[i2].v[s2 - 1], m[i2].v[0], m[i2].o[s2 - 1], m[i2].i[0], (e2.s - d) / g, (e2.e - d) / g, h[s2 - 1]), this.addSegmentFromArray(l, r, o2, y), y = false, r.c = false);
              } else
                r.c = false;
              d += n2.addedLength, o2 += 1;
            }
            if (r._length && (r.setXYAt(r.v[p2][0], r.v[p2][1], "i", p2), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), d > e2.e)
              break;
            i2 < c - 1 && (r = shape_pool.newElement(), y = true, u.push(r), o2 = 0);
          }
          return u;
        }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function(t2, e2) {
          this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t2, e2.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
        }, RoundCornersModifier.prototype.processPath = function(t2, e2) {
          var r = shape_pool.newElement();
          r.c = t2.c;
          var i2, s2, a, n2, o2, h, l, p2, f2, m, c, d, u, y = t2._length, g = 0;
          for (i2 = 0; i2 < y; i2 += 1)
            s2 = t2.v[i2], n2 = t2.o[i2], a = t2.i[i2], s2[0] === n2[0] && s2[1] === n2[1] && s2[0] === a[0] && s2[1] === a[1] ? 0 !== i2 && i2 !== y - 1 || t2.c ? (o2 = 0 === i2 ? t2.v[y - 1] : t2.v[i2 - 1], l = (h = Math.sqrt(Math.pow(s2[0] - o2[0], 2) + Math.pow(s2[1] - o2[1], 2))) ? Math.min(h / 2, e2) / h : 0, p2 = d = s2[0] + (o2[0] - s2[0]) * l, f2 = u = s2[1] - (s2[1] - o2[1]) * l, m = p2 - (p2 - s2[0]) * roundCorner, c = f2 - (f2 - s2[1]) * roundCorner, r.setTripleAt(p2, f2, m, c, d, u, g), g += 1, o2 = i2 === y - 1 ? t2.v[0] : t2.v[i2 + 1], l = (h = Math.sqrt(Math.pow(s2[0] - o2[0], 2) + Math.pow(s2[1] - o2[1], 2))) ? Math.min(h / 2, e2) / h : 0, p2 = m = s2[0] + (o2[0] - s2[0]) * l, f2 = c = s2[1] + (o2[1] - s2[1]) * l, d = p2 - (p2 - s2[0]) * roundCorner, u = f2 - (f2 - s2[1]) * roundCorner, r.setTripleAt(p2, f2, m, c, d, u, g), g += 1) : (r.setTripleAt(s2[0], s2[1], n2[0], n2[1], a[0], a[1], g), g += 1) : (r.setTripleAt(t2.v[i2][0], t2.v[i2][1], t2.o[i2][0], t2.o[i2][1], t2.i[i2][0], t2.i[i2][1], g), g += 1);
          return r;
        }, RoundCornersModifier.prototype.processShapes = function(t2) {
          var e2, r, i2, s2, a, n2, o2 = this.shapes.length, h = this.rd.v;
          if (0 !== h)
            for (r = 0; r < o2; r += 1) {
              if ((a = this.shapes[r]).shape.paths, n2 = a.localShapeCollection, a.shape._mdf || this._mdf || t2)
                for (n2.releaseShapes(), a.shape._mdf = true, e2 = a.shape.paths.shapes, s2 = a.shape.paths._length, i2 = 0; i2 < s2; i2 += 1)
                  n2.addShape(this.processPath(e2[i2], h));
              a.shape.paths = a.localShapeCollection;
            }
          this.dynamicProperties.length || (this._mdf = false);
        }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function(t2, e2) {
          this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t2, e2.c, 0, null, this), this.o = PropertyFactory.getProp(t2, e2.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t2, e2.tr, this), this.so = PropertyFactory.getProp(t2, e2.tr.so, 0, 0.01, this), this.eo = PropertyFactory.getProp(t2, e2.tr.eo, 0, 0.01, this), this.data = e2, this.dynamicProperties.length || this.getValue(true), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix(), this.rMatrix = new Matrix(), this.sMatrix = new Matrix(), this.tMatrix = new Matrix(), this.matrix = new Matrix();
        }, RepeaterModifier.prototype.applyTransforms = function(t2, e2, r, i2, s2, a) {
          var n2 = a ? -1 : 1, o2 = i2.s.v[0] + (1 - i2.s.v[0]) * (1 - s2), h = i2.s.v[1] + (1 - i2.s.v[1]) * (1 - s2);
          t2.translate(i2.p.v[0] * n2 * s2, i2.p.v[1] * n2 * s2, i2.p.v[2]), e2.translate(-i2.a.v[0], -i2.a.v[1], i2.a.v[2]), e2.rotate(-i2.r.v * n2 * s2), e2.translate(i2.a.v[0], i2.a.v[1], i2.a.v[2]), r.translate(-i2.a.v[0], -i2.a.v[1], i2.a.v[2]), r.scale(a ? 1 / o2 : o2, a ? 1 / h : h), r.translate(i2.a.v[0], i2.a.v[1], i2.a.v[2]);
        }, RepeaterModifier.prototype.init = function(t2, e2, r, i2) {
          this.elem = t2, this.arr = e2, this.pos = r, this.elemsData = i2, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t2), this.initModifierProperties(t2, e2[r]);
          for (; r > 0; )
            r -= 1, this._elements.unshift(e2[r]);
          this.dynamicProperties.length ? this.k = true : this.getValue(true);
        }, RepeaterModifier.prototype.resetElements = function(t2) {
          var e2, r = t2.length;
          for (e2 = 0; e2 < r; e2 += 1)
            t2[e2]._processed = false, "gr" === t2[e2].ty && this.resetElements(t2[e2].it);
        }, RepeaterModifier.prototype.cloneElements = function(t2) {
          t2.length;
          var e2 = JSON.parse(JSON.stringify(t2));
          return this.resetElements(e2), e2;
        }, RepeaterModifier.prototype.changeGroupRender = function(t2, e2) {
          var r, i2 = t2.length;
          for (r = 0; r < i2; r += 1)
            t2[r]._render = e2, "gr" === t2[r].ty && this.changeGroupRender(t2[r].it, e2);
        }, RepeaterModifier.prototype.processShapes = function(t2) {
          var e2, r, i2, s2, a;
          if (this._mdf || t2) {
            var n2, o2 = Math.ceil(this.c.v);
            if (this._groups.length < o2) {
              for (; this._groups.length < o2; ) {
                var h = { it: this.cloneElements(this._elements), ty: "gr" };
                h.it.push({ a: { a: 0, ix: 1, k: [0, 0] }, nm: "Transform", o: { a: 0, ix: 7, k: 100 }, p: { a: 0, ix: 2, k: [0, 0] }, r: { a: 1, ix: 6, k: [{ s: 0, e: 0, t: 0 }, { s: 0, e: 0, t: 1 }] }, s: { a: 0, ix: 3, k: [100, 100] }, sa: { a: 0, ix: 5, k: 0 }, sk: { a: 0, ix: 4, k: 0 }, ty: "tr" }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1;
              }
              this.elem.reloadShapes();
            }
            for (a = 0, i2 = 0; i2 <= this._groups.length - 1; i2 += 1)
              n2 = a < o2, this._groups[i2]._render = n2, this.changeGroupRender(this._groups[i2].it, n2), a += 1;
            this._currentCopies = o2;
            var l = this.o.v, p2 = l % 1, f2 = l > 0 ? Math.floor(l) : Math.ceil(l), m = (this.tr.v.props, this.pMatrix.props), c = this.rMatrix.props, d = this.sMatrix.props;
            this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
            var u, y, g = 0;
            if (l > 0) {
              for (; g < f2; )
                this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false), g += 1;
              p2 && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p2, false), g += p2);
            } else if (l < 0) {
              for (; g > f2; )
                this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, true), g -= 1;
              p2 && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p2, true), g -= p2);
            }
            for (i2 = 1 === this.data.m ? 0 : this._currentCopies - 1, s2 = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a; ) {
              if (y = (r = (e2 = this.elemsData[i2].it)[e2.length - 1].transform.mProps.v.props).length, e2[e2.length - 1].transform.mProps._mdf = true, e2[e2.length - 1].transform.op._mdf = true, e2[e2.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i2 / (this._currentCopies - 1)), 0 !== g) {
                for ((0 !== i2 && 1 === s2 || i2 !== this._currentCopies - 1 && -1 === s2) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]), u = 0; u < y; u += 1)
                  r[u] = this.matrix.props[u];
                this.matrix.reset();
              } else
                for (this.matrix.reset(), u = 0; u < y; u += 1)
                  r[u] = this.matrix.props[u];
              g += 1, a -= 1, i2 += s2;
            }
          } else
            for (a = this._currentCopies, i2 = 0, s2 = 1; a; )
              r = (e2 = this.elemsData[i2].it)[e2.length - 1].transform.mProps.v.props, e2[e2.length - 1].transform.mProps._mdf = false, e2[e2.length - 1].transform.op._mdf = false, a -= 1, i2 += s2;
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
            var e2 = 0, r = this.dataProps.length;
            for ("svg" === this.renderer && (this.dashStr = ""), e2 = 0; e2 < r; e2 += 1)
              "o" != this.dataProps[e2].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e2].p.v : this.dashArray[e2] = this.dataProps[e2].p.v : this.dashoffset[0] = this.dataProps[e2].p.v;
          }
        }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function(t2, e2) {
          for (var r = 0, i2 = this.o.length / 2; r < i2; ) {
            if (Math.abs(t2[4 * r] - t2[4 * e2 + 2 * r]) > 0.01)
              return false;
            r += 1;
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
            var e2, r, i2, s2 = 4 * this.data.p;
            for (e2 = 0; e2 < s2; e2 += 1)
              r = e2 % 4 == 0 ? 100 : 255, i2 = Math.round(this.prop.v[e2] * r), this.c[e2] !== i2 && (this.c[e2] = i2, this._cmdf = !t2);
            if (this.o.length)
              for (s2 = this.prop.v.length, e2 = 4 * this.data.p; e2 < s2; e2 += 1)
                r = e2 % 2 == 0 ? 100 : 1, i2 = e2 % 2 == 0 ? Math.round(100 * this.prop.v[e2]) : this.prop.v[e2], this.o[e2 - 4 * this.data.p] !== i2 && (this.o[e2 - 4 * this.data.p] = i2, this._omdf = !t2);
            this._mdf = !t2;
          }
        }, extendPrototype([DynamicPropertyContainer], GradientProperty);
        var buildShapeString = function(t2, e2, r, i2) {
          if (0 === e2)
            return "";
          var s2, a = t2.o, n2 = t2.i, o2 = t2.v, h = " M" + i2.applyToPointStringified(o2[0][0], o2[0][1]);
          for (s2 = 1; s2 < e2; s2 += 1)
            h += " C" + i2.applyToPointStringified(a[s2 - 1][0], a[s2 - 1][1]) + " " + i2.applyToPointStringified(n2[s2][0], n2[s2][1]) + " " + i2.applyToPointStringified(o2[s2][0], o2[s2][1]);
          return r && e2 && (h += " C" + i2.applyToPointStringified(a[s2 - 1][0], a[s2 - 1][1]) + " " + i2.applyToPointStringified(n2[0][0], n2[0][1]) + " " + i2.applyToPointStringified(o2[0][0], o2[0][1]), h += "z"), h;
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
          function r(e3) {
            var r2 = function(t3, e4, r3) {
              var i4 = "";
              if (t3.e)
                i4 = t3.p;
              else if (e4) {
                var s4 = t3.p;
                -1 !== s4.indexOf("images/") && (s4 = s4.split("/")[1]), i4 = e4 + s4;
              } else
                i4 = r3, i4 += t3.u ? t3.u : "", i4 += t3.p;
              return i4;
            }(e3, this.assetsPath, this.path), i3 = createTag("img");
            i3.crossOrigin = "anonymous", i3.addEventListener("load", this._imageLoaded.bind(this), false), i3.addEventListener("error", (function() {
              s3.img = t2, this._imageLoaded();
            }).bind(this), false), i3.src = r2;
            var s3 = { img: i3, assetData: e3 };
            return s3;
          }
          function i2(t3, e3) {
            this.imagesLoadedCb = e3;
            var r2, i3 = t3.length;
            for (r2 = 0; r2 < i3; r2 += 1)
              t3[r2].layers || (this.totalImages += 1, this.images.push(this._createImageData(t3[r2])));
          }
          function s2(t3) {
            this.path = t3 || "";
          }
          function a(t3) {
            this.assetsPath = t3 || "";
          }
          function n2(t3) {
            for (var e3 = 0, r2 = this.images.length; e3 < r2; ) {
              if (this.images[e3].assetData === t3)
                return this.images[e3].img;
              e3 += 1;
            }
          }
          function o2() {
            this.imagesLoadedCb = null, this.images.length = 0;
          }
          function h() {
            return this.totalImages === this.loadedAssets;
          }
          return function() {
            this.loadAssets = i2, this.setAssetsPath = a, this.setPath = s2, this.loaded = h, this.destroy = o2, this.getImage = n2, this._createImageData = r, this._imageLoaded = e2, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = [];
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
          return { load: function(e2, r, i2) {
            var s2, a = new XMLHttpRequest();
            a.open("GET", e2, true);
            try {
              a.responseType = "json";
            } catch (t3) {
            }
            a.send(), a.onreadystatechange = function() {
              if (4 == a.readyState)
                if (200 == a.status)
                  s2 = t2(a), r(s2);
                else
                  try {
                    s2 = t2(a), r(s2);
                  } catch (t3) {
                    i2 && i2(t3);
                  }
            };
          } };
        }();
        function TextAnimatorProperty(t2, e2, r) {
          this._isFirstFrame = true, this._hasMaskedPath = false, this._frameId = -1, this._textData = t2, this._renderType = e2, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = { alignment: {} }, this.renderedLetters = [], this.lettersChangedFlag = false, this.initDynamicPropertyContainer(r);
        }
        function TextAnimatorDataProperty(t2, e2, r) {
          var i2 = { propType: false }, s2 = PropertyFactory.getProp, a = e2.a;
          this.a = { r: a.r ? s2(t2, a.r, 0, degToRads, r) : i2, rx: a.rx ? s2(t2, a.rx, 0, degToRads, r) : i2, ry: a.ry ? s2(t2, a.ry, 0, degToRads, r) : i2, sk: a.sk ? s2(t2, a.sk, 0, degToRads, r) : i2, sa: a.sa ? s2(t2, a.sa, 0, degToRads, r) : i2, s: a.s ? s2(t2, a.s, 1, 0.01, r) : i2, a: a.a ? s2(t2, a.a, 1, 0, r) : i2, o: a.o ? s2(t2, a.o, 0, 0.01, r) : i2, p: a.p ? s2(t2, a.p, 1, 0, r) : i2, sw: a.sw ? s2(t2, a.sw, 0, 0, r) : i2, sc: a.sc ? s2(t2, a.sc, 1, 0, r) : i2, fc: a.fc ? s2(t2, a.fc, 1, 0, r) : i2, fh: a.fh ? s2(t2, a.fh, 0, 0, r) : i2, fs: a.fs ? s2(t2, a.fs, 0, 0.01, r) : i2, fb: a.fb ? s2(t2, a.fb, 0, 0.01, r) : i2, t: a.t ? s2(t2, a.t, 0, 0, r) : i2 }, this.s = TextSelectorProp.getTextSelectorProp(t2, e2.s, r), this.s.t = e2.s.t;
        }
        function LetterProps(t2, e2, r, i2, s2, a) {
          this.o = t2, this.sw = e2, this.sc = r, this.fc = i2, this.m = s2, this.p = a, this._mdf = { o: true, sw: !!e2, sc: !!r, fc: !!i2, m: true, p: true };
        }
        function TextProperty(t2, e2) {
          this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = false, this._isFirstFrame = true, this._mdf = false, this.data = e2, this.elem = t2, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = false, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = { ascent: 0, boxWidth: this.defaultBoxWidth, f: "", fStyle: "", fWeight: "", fc: "", j: "", justifyOffset: "", l: [], lh: 0, lineWidths: [], ls: "", of: "", s: "", sc: "", sw: 0, t: 0, tr: 0, sz: 0, ps: null, fillColorAnim: false, strokeColorAnim: false, strokeWidthAnim: false, yOffset: 0, finalSize: 0, finalText: [], finalLineHeight: 0, __complete: false }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData);
        }
        TextAnimatorProperty.prototype.searchProperties = function() {
          var t2, e2, r = this._textData.a.length, i2 = PropertyFactory.getProp;
          for (t2 = 0; t2 < r; t2 += 1)
            e2 = this._textData.a[t2], this._animatorsData[t2] = new TextAnimatorDataProperty(this._elem, e2, this);
          this._textData.p && "m" in this._textData.p ? (this._pathData = { f: i2(this._elem, this._textData.p.f, 0, 0, this), l: i2(this._elem, this._textData.p.l, 0, 0, this), r: this._textData.p.r, m: this._elem.maskManager.getMaskProperty(this._textData.p.m) }, this._hasMaskedPath = true) : this._hasMaskedPath = false, this._moreOptions.alignment = i2(this._elem, this._textData.m.a, 1, 0, this);
        }, TextAnimatorProperty.prototype.getMeasures = function(t2, e2) {
          if (this.lettersChangedFlag = e2, this._mdf || this._isFirstFrame || e2 || this._hasMaskedPath && this._pathData.m._mdf) {
            this._isFirstFrame = false;
            var r, i2, s2, a, n2, o2, h, l, p2, f2, m, c, d, u, y, g, v, b, P, _ = this._moreOptions.alignment.v, x = this._animatorsData, S = this._textData, E2 = this.mHelper, T = this._renderType, C = this.renderedLetters.length, A = (this.data, t2.l);
            if (this._hasMaskedPath) {
              if (P = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
                var k, D = P.v;
                for (this._pathData.r && (D = D.reverse()), n2 = { tLength: 0, segments: [] }, a = D._length - 1, g = 0, s2 = 0; s2 < a; s2 += 1)
                  k = bez.buildBezierData(D.v[s2], D.v[s2 + 1], [D.o[s2][0] - D.v[s2][0], D.o[s2][1] - D.v[s2][1]], [D.i[s2 + 1][0] - D.v[s2 + 1][0], D.i[s2 + 1][1] - D.v[s2 + 1][1]]), n2.tLength += k.segmentLength, n2.segments.push(k), g += k.segmentLength;
                s2 = a, P.v.c && (k = bez.buildBezierData(D.v[s2], D.v[0], [D.o[s2][0] - D.v[s2][0], D.o[s2][1] - D.v[s2][1]], [D.i[0][0] - D.v[0][0], D.i[0][1] - D.v[0][1]]), n2.tLength += k.segmentLength, n2.segments.push(k), g += k.segmentLength), this._pathData.pi = n2;
              }
              if (n2 = this._pathData.pi, o2 = this._pathData.f.v, m = 0, f2 = 1, l = 0, p2 = true, u = n2.segments, o2 < 0 && P.v.c)
                for (n2.tLength < Math.abs(o2) && (o2 = -Math.abs(o2) % n2.tLength), f2 = (d = u[m = u.length - 1].points).length - 1; o2 < 0; )
                  o2 += d[f2].partialLength, (f2 -= 1) < 0 && (f2 = (d = u[m -= 1].points).length - 1);
              c = (d = u[m].points)[f2 - 1], y = (h = d[f2]).partialLength;
            }
            a = A.length, r = 0, i2 = 0;
            var M, I, w, F, R = 1.2 * t2.finalSize * 0.714, V = true;
            w = x.length;
            var L, O, z, B, N, G, j, q, H, W, Y, X, K, $ = -1, J = o2, U = m, Z = f2, Q = -1, tt2 = "", et = this.defaultPropsArray;
            if (2 === t2.j || 1 === t2.j) {
              var rt = 0, it = 0, st = 2 === t2.j ? -0.5 : -1, at = 0, nt = true;
              for (s2 = 0; s2 < a; s2 += 1)
                if (A[s2].n) {
                  for (rt && (rt += it); at < s2; )
                    A[at].animatorJustifyOffset = rt, at += 1;
                  rt = 0, nt = true;
                } else {
                  for (I = 0; I < w; I += 1)
                    (M = x[I].a).t.propType && (nt && 2 === t2.j && (it += M.t.v * st), (L = x[I].s.getMult(A[s2].anIndexes[I], S.a[I].s.totalChars)).length ? rt += M.t.v * L[0] * st : rt += M.t.v * L * st);
                  nt = false;
                }
              for (rt && (rt += it); at < s2; )
                A[at].animatorJustifyOffset = rt, at += 1;
            }
            for (s2 = 0; s2 < a; s2 += 1) {
              if (E2.reset(), N = 1, A[s2].n)
                r = 0, i2 += t2.yOffset, i2 += V ? 1 : 0, o2 = J, V = false, this._hasMaskedPath && (f2 = Z, c = (d = u[m = U].points)[f2 - 1], y = (h = d[f2]).partialLength, l = 0), K = W = X = tt2 = "", et = this.defaultPropsArray;
              else {
                if (this._hasMaskedPath) {
                  if (Q !== A[s2].line) {
                    switch (t2.j) {
                      case 1:
                        o2 += g - t2.lineWidths[A[s2].line];
                        break;
                      case 2:
                        o2 += (g - t2.lineWidths[A[s2].line]) / 2;
                    }
                    Q = A[s2].line;
                  }
                  $ !== A[s2].ind && (A[$] && (o2 += A[$].extra), o2 += A[s2].an / 2, $ = A[s2].ind), o2 += _[0] * A[s2].an / 200;
                  var ot = 0;
                  for (I = 0; I < w; I += 1)
                    (M = x[I].a).p.propType && ((L = x[I].s.getMult(A[s2].anIndexes[I], S.a[I].s.totalChars)).length ? ot += M.p.v[0] * L[0] : ot += M.p.v[0] * L), M.a.propType && ((L = x[I].s.getMult(A[s2].anIndexes[I], S.a[I].s.totalChars)).length ? ot += M.a.v[0] * L[0] : ot += M.a.v[0] * L);
                  for (p2 = true; p2; )
                    l + y >= o2 + ot || !d ? (v = (o2 + ot - l) / h.partialLength, z = c.point[0] + (h.point[0] - c.point[0]) * v, B = c.point[1] + (h.point[1] - c.point[1]) * v, E2.translate(-_[0] * A[s2].an / 200, -_[1] * R / 100), p2 = false) : d && (l += h.partialLength, (f2 += 1) >= d.length && (f2 = 0, u[m += 1] ? d = u[m].points : P.v.c ? (f2 = 0, d = u[m = 0].points) : (l -= h.partialLength, d = null)), d && (c = h, y = (h = d[f2]).partialLength));
                  O = A[s2].an / 2 - A[s2].add, E2.translate(-O, 0, 0);
                } else
                  O = A[s2].an / 2 - A[s2].add, E2.translate(-O, 0, 0), E2.translate(-_[0] * A[s2].an / 200, -_[1] * R / 100, 0);
                for (A[s2].l / 2, I = 0; I < w; I += 1)
                  (M = x[I].a).t.propType && (L = x[I].s.getMult(A[s2].anIndexes[I], S.a[I].s.totalChars), 0 === r && 0 === t2.j || (this._hasMaskedPath ? L.length ? o2 += M.t.v * L[0] : o2 += M.t.v * L : L.length ? r += M.t.v * L[0] : r += M.t.v * L));
                for (A[s2].l / 2, t2.strokeWidthAnim && (j = t2.sw || 0), t2.strokeColorAnim && (G = t2.sc ? [t2.sc[0], t2.sc[1], t2.sc[2]] : [0, 0, 0]), t2.fillColorAnim && t2.fc && (q = [t2.fc[0], t2.fc[1], t2.fc[2]]), I = 0; I < w; I += 1)
                  (M = x[I].a).a.propType && ((L = x[I].s.getMult(A[s2].anIndexes[I], S.a[I].s.totalChars)).length ? E2.translate(-M.a.v[0] * L[0], -M.a.v[1] * L[1], M.a.v[2] * L[2]) : E2.translate(-M.a.v[0] * L, -M.a.v[1] * L, M.a.v[2] * L));
                for (I = 0; I < w; I += 1)
                  (M = x[I].a).s.propType && ((L = x[I].s.getMult(A[s2].anIndexes[I], S.a[I].s.totalChars)).length ? E2.scale(1 + (M.s.v[0] - 1) * L[0], 1 + (M.s.v[1] - 1) * L[1], 1) : E2.scale(1 + (M.s.v[0] - 1) * L, 1 + (M.s.v[1] - 1) * L, 1));
                for (I = 0; I < w; I += 1) {
                  if (M = x[I].a, L = x[I].s.getMult(A[s2].anIndexes[I], S.a[I].s.totalChars), M.sk.propType && (L.length ? E2.skewFromAxis(-M.sk.v * L[0], M.sa.v * L[1]) : E2.skewFromAxis(-M.sk.v * L, M.sa.v * L)), M.r.propType && (L.length ? E2.rotateZ(-M.r.v * L[2]) : E2.rotateZ(-M.r.v * L)), M.ry.propType && (L.length ? E2.rotateY(M.ry.v * L[1]) : E2.rotateY(M.ry.v * L)), M.rx.propType && (L.length ? E2.rotateX(M.rx.v * L[0]) : E2.rotateX(M.rx.v * L)), M.o.propType && (L.length ? N += (M.o.v * L[0] - N) * L[0] : N += (M.o.v * L - N) * L), t2.strokeWidthAnim && M.sw.propType && (L.length ? j += M.sw.v * L[0] : j += M.sw.v * L), t2.strokeColorAnim && M.sc.propType)
                    for (H = 0; H < 3; H += 1)
                      L.length ? G[H] = G[H] + (M.sc.v[H] - G[H]) * L[0] : G[H] = G[H] + (M.sc.v[H] - G[H]) * L;
                  if (t2.fillColorAnim && t2.fc) {
                    if (M.fc.propType)
                      for (H = 0; H < 3; H += 1)
                        L.length ? q[H] = q[H] + (M.fc.v[H] - q[H]) * L[0] : q[H] = q[H] + (M.fc.v[H] - q[H]) * L;
                    M.fh.propType && (q = L.length ? addHueToRGB(q, M.fh.v * L[0]) : addHueToRGB(q, M.fh.v * L)), M.fs.propType && (q = L.length ? addSaturationToRGB(q, M.fs.v * L[0]) : addSaturationToRGB(q, M.fs.v * L)), M.fb.propType && (q = L.length ? addBrightnessToRGB(q, M.fb.v * L[0]) : addBrightnessToRGB(q, M.fb.v * L));
                  }
                }
                for (I = 0; I < w; I += 1)
                  (M = x[I].a).p.propType && (L = x[I].s.getMult(A[s2].anIndexes[I], S.a[I].s.totalChars), this._hasMaskedPath ? L.length ? E2.translate(0, M.p.v[1] * L[0], -M.p.v[2] * L[1]) : E2.translate(0, M.p.v[1] * L, -M.p.v[2] * L) : L.length ? E2.translate(M.p.v[0] * L[0], M.p.v[1] * L[1], -M.p.v[2] * L[2]) : E2.translate(M.p.v[0] * L, M.p.v[1] * L, -M.p.v[2] * L));
                if (t2.strokeWidthAnim && (W = j < 0 ? 0 : j), t2.strokeColorAnim && (Y = "rgb(" + Math.round(255 * G[0]) + "," + Math.round(255 * G[1]) + "," + Math.round(255 * G[2]) + ")"), t2.fillColorAnim && t2.fc && (X = "rgb(" + Math.round(255 * q[0]) + "," + Math.round(255 * q[1]) + "," + Math.round(255 * q[2]) + ")"), this._hasMaskedPath) {
                  if (E2.translate(0, -t2.ls), E2.translate(0, _[1] * R / 100 + i2, 0), S.p.p) {
                    b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
                    var ht = 180 * Math.atan(b) / Math.PI;
                    h.point[0] < c.point[0] && (ht += 180), E2.rotate(-ht * Math.PI / 180);
                  }
                  E2.translate(z, B, 0), o2 -= _[0] * A[s2].an / 200, A[s2 + 1] && $ !== A[s2 + 1].ind && (o2 += A[s2].an / 2, o2 += t2.tr / 1e3 * t2.finalSize);
                } else {
                  switch (E2.translate(r, i2, 0), t2.ps && E2.translate(t2.ps[0], t2.ps[1] + t2.ascent, 0), t2.j) {
                    case 1:
                      E2.translate(A[s2].animatorJustifyOffset + t2.justifyOffset + (t2.boxWidth - t2.lineWidths[A[s2].line]), 0, 0);
                      break;
                    case 2:
                      E2.translate(A[s2].animatorJustifyOffset + t2.justifyOffset + (t2.boxWidth - t2.lineWidths[A[s2].line]) / 2, 0, 0);
                  }
                  E2.translate(0, -t2.ls), E2.translate(O, 0, 0), E2.translate(_[0] * A[s2].an / 200, _[1] * R / 100, 0), r += A[s2].l + t2.tr / 1e3 * t2.finalSize;
                }
                "html" === T ? tt2 = E2.toCSS() : "svg" === T ? tt2 = E2.to2dCSS() : et = [E2.props[0], E2.props[1], E2.props[2], E2.props[3], E2.props[4], E2.props[5], E2.props[6], E2.props[7], E2.props[8], E2.props[9], E2.props[10], E2.props[11], E2.props[12], E2.props[13], E2.props[14], E2.props[15]], K = N;
              }
              C <= s2 ? (F = new LetterProps(K, W, Y, X, tt2, et), this.renderedLetters.push(F), C += 1, this.lettersChangedFlag = true) : (F = this.renderedLetters[s2], this.lettersChangedFlag = F.update(K, W, Y, X, tt2, et) || this.lettersChangedFlag);
            }
          }
        }, TextAnimatorProperty.prototype.getValue = function() {
          this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
        }, TextAnimatorProperty.prototype.mHelper = new Matrix(), TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function(t2, e2, r, i2, s2, a) {
          this._mdf.o = false, this._mdf.sw = false, this._mdf.sc = false, this._mdf.fc = false, this._mdf.m = false, this._mdf.p = false;
          var n2 = false;
          return this.o !== t2 && (this.o = t2, this._mdf.o = true, n2 = true), this.sw !== e2 && (this.sw = e2, this._mdf.sw = true, n2 = true), this.sc !== r && (this.sc = r, this._mdf.sc = true, n2 = true), this.fc !== i2 && (this.fc = i2, this._mdf.fc = true, n2 = true), this.m !== s2 && (this.m = s2, this._mdf.m = true, n2 = true), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, this._mdf.p = true, n2 = true), n2;
        }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function(t2, e2) {
          for (var r in e2)
            e2.hasOwnProperty(r) && (t2[r] = e2[r]);
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
            var e2 = this.currentData, r = this.keysIndex;
            if (this.lock)
              this.setCurrentData(this.currentData);
            else {
              this.lock = true, this._mdf = false;
              var i2, s2 = this.effectsSequence.length, a = t2 || this.data.d.k[this.keysIndex].s;
              for (i2 = 0; i2 < s2; i2 += 1)
                a = r !== this.keysIndex ? this.effectsSequence[i2](a, a.t) : this.effectsSequence[i2](this.currentData, a.t);
              e2 !== a && this.setCurrentData(a), this.pv = this.v = this.currentData, this.lock = false, this.frameId = this.elem.globalData.frameId;
            }
          }
        }, TextProperty.prototype.getKeyframeValue = function() {
          for (var t2 = this.data.d.k, e2 = this.elem.comp.renderedFrame, r = 0, i2 = t2.length; r <= i2 - 1 && (t2[r].s, !(r === i2 - 1 || t2[r + 1].t > e2)); )
            r += 1;
          return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s;
        }, TextProperty.prototype.buildFinalText = function(t2) {
          for (var e2, r = FontManager.getCombinedCharacterCodes(), i2 = [], s2 = 0, a = t2.length; s2 < a; )
            e2 = t2.charCodeAt(s2), -1 !== r.indexOf(e2) ? i2[i2.length - 1] += t2.charAt(s2) : e2 >= 55296 && e2 <= 56319 && (e2 = t2.charCodeAt(s2 + 1)) >= 56320 && e2 <= 57343 ? (i2.push(t2.substr(s2, 2)), ++s2) : i2.push(t2.charAt(s2)), s2 += 1;
          return i2;
        }, TextProperty.prototype.completeTextData = function(t2) {
          t2.__complete = true;
          var e2, r, i2, s2, a, n2, o2, h = this.elem.globalData.fontManager, l = this.data, p2 = [], f2 = 0, m = l.m.g, c = 0, d = 0, u = 0, y = [], g = 0, v = 0, b = h.getFontByName(t2.f), P = 0, _ = b.fStyle ? b.fStyle.split(" ") : [], x = "normal", S = "normal";
          for (r = _.length, e2 = 0; e2 < r; e2 += 1)
            switch (_[e2].toLowerCase()) {
              case "italic":
                S = "italic";
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
          t2.fWeight = b.fWeight || x, t2.fStyle = S, t2.finalSize = t2.s, t2.finalText = this.buildFinalText(t2.t), r = t2.finalText.length, t2.finalLineHeight = t2.lh;
          var E2, T = t2.tr / 1e3 * t2.finalSize;
          if (t2.sz)
            for (var C, A, k = true, D = t2.sz[0], M = t2.sz[1]; k; ) {
              C = 0, g = 0, r = (A = this.buildFinalText(t2.t)).length, T = t2.tr / 1e3 * t2.finalSize;
              var I = -1;
              for (e2 = 0; e2 < r; e2 += 1)
                E2 = A[e2].charCodeAt(0), i2 = false, " " === A[e2] ? I = e2 : 13 !== E2 && 3 !== E2 || (g = 0, i2 = true, C += t2.finalLineHeight || 1.2 * t2.finalSize), h.chars ? (o2 = h.getCharData(A[e2], b.fStyle, b.fFamily), P = i2 ? 0 : o2.w * t2.finalSize / 100) : P = h.measureText(A[e2], t2.f, t2.finalSize), g + P > D && " " !== A[e2] ? (-1 === I ? r += 1 : e2 = I, C += t2.finalLineHeight || 1.2 * t2.finalSize, A.splice(e2, I === e2 ? 1 : 0, "\r"), I = -1, g = 0) : (g += P, g += T);
              C += b.ascent * t2.finalSize / 100, this.canResize && t2.finalSize > this.minimumFontSize && M < C ? (t2.finalSize -= 1, t2.finalLineHeight = t2.finalSize * t2.lh / t2.s) : (t2.finalText = A, r = t2.finalText.length, k = false);
            }
          g = -T, P = 0;
          var w, F = 0;
          for (e2 = 0; e2 < r; e2 += 1)
            if (i2 = false, E2 = (w = t2.finalText[e2]).charCodeAt(0), " " === w ? s2 = " " : 13 === E2 || 3 === E2 ? (F = 0, y.push(g), v = g > v ? g : v, g = -2 * T, s2 = "", i2 = true, u += 1) : s2 = t2.finalText[e2], h.chars ? (o2 = h.getCharData(w, b.fStyle, h.getFontByName(t2.f).fFamily), P = i2 ? 0 : o2.w * t2.finalSize / 100) : P = h.measureText(s2, t2.f, t2.finalSize), " " === w ? F += P + T : (g += P + T + F, F = 0), p2.push({ l: P, an: P, add: c, n: i2, anIndexes: [], val: s2, line: u, animatorJustifyOffset: 0 }), 2 == m) {
              if (c += P, "" === s2 || " " === s2 || e2 === r - 1) {
                for ("" !== s2 && " " !== s2 || (c -= P); d <= e2; )
                  p2[d].an = c, p2[d].ind = f2, p2[d].extra = P, d += 1;
                f2 += 1, c = 0;
              }
            } else if (3 == m) {
              if (c += P, "" === s2 || e2 === r - 1) {
                for ("" === s2 && (c -= P); d <= e2; )
                  p2[d].an = c, p2[d].ind = f2, p2[d].extra = P, d += 1;
                c = 0, f2 += 1;
              }
            } else
              p2[f2].ind = f2, p2[f2].extra = 0, f2 += 1;
          if (t2.l = p2, v = g > v ? g : v, y.push(g), t2.sz)
            t2.boxWidth = t2.sz[0], t2.justifyOffset = 0;
          else
            switch (t2.boxWidth = v, t2.j) {
              case 1:
                t2.justifyOffset = -t2.boxWidth;
                break;
              case 2:
                t2.justifyOffset = -t2.boxWidth / 2;
                break;
              default:
                t2.justifyOffset = 0;
            }
          t2.lineWidths = y;
          var R, V, L = l.a;
          n2 = L.length;
          var O, z, B = [];
          for (a = 0; a < n2; a += 1) {
            for ((R = L[a]).a.sc && (t2.strokeColorAnim = true), R.a.sw && (t2.strokeWidthAnim = true), (R.a.fc || R.a.fh || R.a.fs || R.a.fb) && (t2.fillColorAnim = true), z = 0, O = R.s.b, e2 = 0; e2 < r; e2 += 1)
              (V = p2[e2]).anIndexes[a] = z, (1 == O && "" !== V.val || 2 == O && "" !== V.val && " " !== V.val || 3 == O && (V.n || " " == V.val || e2 == r - 1) || 4 == O && (V.n || e2 == r - 1)) && (1 === R.s.rn && B.push(z), z += 1);
            l.a[a].s.totalChars = z;
            var N, G = -1;
            if (1 === R.s.rn)
              for (e2 = 0; e2 < r; e2 += 1)
                G != (V = p2[e2]).anIndexes[a] && (G = V.anIndexes[a], N = B.splice(Math.floor(Math.random() * B.length), 1)[0]), V.anIndexes[a] = N;
          }
          t2.yOffset = t2.finalLineHeight || 1.2 * t2.finalSize, t2.ls = t2.ls || 0, t2.ascent = b.ascent * t2.finalSize / 100;
        }, TextProperty.prototype.updateDocumentData = function(t2, e2) {
          e2 = void 0 === e2 ? this.keysIndex : e2;
          var r = this.copyData({}, this.data.d.k[e2].s);
          r = this.copyData(r, t2), this.data.d.k[e2].s = r, this.recalculate(e2), this.elem.addDynamicProperty(this);
        }, TextProperty.prototype.recalculate = function(t2) {
          var e2 = this.data.d.k[t2].s;
          e2.__complete = false, this.keysIndex = 0, this._isFirstFrame = true, this.getValue(e2);
        }, TextProperty.prototype.canResizeFont = function(t2) {
          this.canResize = t2, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
        }, TextProperty.prototype.setMinimumFontSize = function(t2) {
          this.minimumFontSize = Math.floor(t2) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
        };
        var TextSelectorProp = function() {
          var t2 = Math.max, e2 = Math.min, r = Math.floor;
          function i2(t3, e3) {
            this._currentTextLength = -1, this.k = false, this.data = e3, this.elem = t3, this.comp = t3.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t3), this.s = PropertyFactory.getProp(t3, e3.s || { k: 0 }, 0, 0, this), this.e = "e" in e3 ? PropertyFactory.getProp(t3, e3.e, 0, 0, this) : { v: 100 }, this.o = PropertyFactory.getProp(t3, e3.o || { k: 0 }, 0, 0, this), this.xe = PropertyFactory.getProp(t3, e3.xe || { k: 0 }, 0, 0, this), this.ne = PropertyFactory.getProp(t3, e3.ne || { k: 0 }, 0, 0, this), this.a = PropertyFactory.getProp(t3, e3.a, 0, 0.01, this), this.dynamicProperties.length || this.getValue();
          }
          return i2.prototype = { getMult: function(i3) {
            this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
            var s2 = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get, a = 0, n2 = this.finalS, o2 = this.finalE, h = this.data.sh;
            if (2 == h)
              a = s2(a = o2 === n2 ? i3 >= o2 ? 1 : 0 : t2(0, e2(0.5 / (o2 - n2) + (i3 - n2) / (o2 - n2), 1)));
            else if (3 == h)
              a = s2(a = o2 === n2 ? i3 >= o2 ? 0 : 1 : 1 - t2(0, e2(0.5 / (o2 - n2) + (i3 - n2) / (o2 - n2), 1)));
            else if (4 == h)
              o2 === n2 ? a = 0 : (a = t2(0, e2(0.5 / (o2 - n2) + (i3 - n2) / (o2 - n2), 1))) < 0.5 ? a *= 2 : a = 1 - 2 * (a - 0.5), a = s2(a);
            else if (5 == h) {
              if (o2 === n2)
                a = 0;
              else {
                var l = o2 - n2, p2 = -l / 2 + (i3 = e2(t2(0, i3 + 0.5 - n2), o2 - n2)), f2 = l / 2;
                a = Math.sqrt(1 - p2 * p2 / (f2 * f2));
              }
              a = s2(a);
            } else
              6 == h ? (o2 === n2 ? a = 0 : (i3 = e2(t2(0, i3 + 0.5 - n2), o2 - n2), a = (1 + Math.cos(Math.PI + 2 * Math.PI * i3 / (o2 - n2))) / 2), a = s2(a)) : (i3 >= r(n2) && (a = i3 - n2 < 0 ? 1 - (n2 - i3) : t2(0, e2(o2 - i3, 1))), a = s2(a));
            return a * this.a.v;
          }, getValue: function(t3) {
            this.iterateDynamicProperties(), this._mdf = t3 || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t3 && 2 === this.data.r && (this.e.v = this._currentTextLength);
            var e3 = 2 === this.data.r ? 1 : 100 / this.data.totalChars, r2 = this.o.v / e3, i3 = this.s.v / e3 + r2, s2 = this.e.v / e3 + r2;
            if (i3 > s2) {
              var a = i3;
              i3 = s2, s2 = a;
            }
            this.finalS = i3, this.finalE = s2;
          } }, extendPrototype([DynamicPropertyContainer], i2), { getTextSelectorProp: function(t3, e3, r2) {
            return new i2(t3, e3);
          } };
        }(), pool_factory = function(t2, e2, r, i2) {
          var s2 = 0, a = t2, n2 = createSizedArray(a);
          function o2() {
            return s2 ? n2[s2 -= 1] : e2();
          }
          return { newElement: o2, release: function(t3) {
            s2 === a && (n2 = pooling.double(n2), a *= 2), r && r(t3), n2[s2] = t3, s2 += 1;
          } };
        }, pooling = { double: function(t2) {
          return t2.concat(createSizedArray(t2.length));
        } }, point_pool = pool_factory(8, function() {
          return createTypedArray("float32", 2);
        }), shape_pool = (factory = pool_factory(4, function() {
          return new ShapePath();
        }, function(t2) {
          var e2, r = t2._length;
          for (e2 = 0; e2 < r; e2 += 1)
            point_pool.release(t2.v[e2]), point_pool.release(t2.i[e2]), point_pool.release(t2.o[e2]), t2.v[e2] = null, t2.i[e2] = null, t2.o[e2] = null;
          t2._length = 0, t2.c = false;
        }), factory.clone = function(t2) {
          var e2, r = factory.newElement(), i2 = void 0 === t2._length ? t2.v.length : t2._length;
          for (r.setLength(i2), r.c = t2.c, e2 = 0; e2 < i2; e2 += 1)
            r.setTripleAt(t2.v[e2][0], t2.v[e2][1], t2.o[e2][0], t2.o[e2][1], t2.i[e2][0], t2.i[e2][1], e2);
          return r;
        }, factory), factory, shapeCollection_pool = function() {
          var t2 = { newShapeCollection: function() {
            var t3;
            t3 = e2 ? i2[e2 -= 1] : new ShapeCollection();
            return t3;
          }, release: function(t3) {
            var s2, a = t3._length;
            for (s2 = 0; s2 < a; s2 += 1)
              shape_pool.release(t3.shapes[s2]);
            t3._length = 0, e2 === r && (i2 = pooling.double(i2), r *= 2);
            i2[e2] = t3, e2 += 1;
          } }, e2 = 0, r = 4, i2 = createSizedArray(r);
          return t2;
        }(), segments_length_pool = pool_factory(8, function() {
          return { lengths: [], totalLength: 0 };
        }, function(t2) {
          var e2, r = t2.lengths.length;
          for (e2 = 0; e2 < r; e2 += 1)
            bezier_length_pool.release(t2.lengths[e2]);
          t2.lengths.length = 0;
        }), bezier_length_pool = pool_factory(8, function() {
          return { addedLength: 0, percents: createTypedArray("float32", defaultCurveSegments), lengths: createTypedArray("float32", defaultCurveSegments) };
        });
        function BaseRenderer() {
        }
        function SVGRenderer(t2, e2) {
          this.animationItem = t2, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
          var r = "";
          if (e2 && e2.title) {
            var i2 = createNS("title"), s2 = createElementID();
            i2.setAttribute("id", s2), i2.textContent = e2.title, this.svgElement.appendChild(i2), r += s2;
          }
          if (e2 && e2.description) {
            var a = createNS("desc"), n2 = createElementID();
            a.setAttribute("id", n2), a.textContent = e2.description, this.svgElement.appendChild(a), r += " " + n2;
          }
          r && this.svgElement.setAttribute("aria-labelledby", r);
          var o2 = createNS("defs");
          this.svgElement.appendChild(o2);
          var h = createNS("g");
          this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = { preserveAspectRatio: e2 && e2.preserveAspectRatio || "xMidYMid meet", imagePreserveAspectRatio: e2 && e2.imagePreserveAspectRatio || "xMidYMid slice", progressiveLoad: e2 && e2.progressiveLoad || false, hideOnTransparent: !e2 || false !== e2.hideOnTransparent, viewBoxOnly: e2 && e2.viewBoxOnly || false, viewBoxSize: e2 && e2.viewBoxSize || false, className: e2 && e2.className || "" }, this.globalData = { _mdf: false, frameNum: -1, defs: o2, renderConfig: this.renderConfig }, this.elements = [], this.pendingElements = [], this.destroyed = false, this.rendererType = "svg";
        }
        function CanvasRenderer(t2, e2) {
          this.animationItem = t2, this.renderConfig = { clearCanvas: !e2 || void 0 === e2.clearCanvas || e2.clearCanvas, context: e2 && e2.context || null, progressiveLoad: e2 && e2.progressiveLoad || false, preserveAspectRatio: e2 && e2.preserveAspectRatio || "xMidYMid meet", imagePreserveAspectRatio: e2 && e2.imagePreserveAspectRatio || "xMidYMid slice", className: e2 && e2.className || "" }, this.renderConfig.dpr = e2 && e2.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e2 && e2.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = { frameNum: -1, _mdf: false, renderConfig: this.renderConfig, currentGlobalAlpha: -1 }, this.contextData = new CVContextData(), this.elements = [], this.pendingElements = [], this.transformMat = new Matrix(), this.completeLayers = false, this.rendererType = "canvas";
        }
        function MaskElement(t2, e2, r) {
          this.data = t2, this.element = e2, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
          var i2, s2 = this.globalData.defs, a = this.masksProperties ? this.masksProperties.length : 0;
          this.viewData = createSizedArray(a), this.solidPath = "";
          var n2, o2, h, l, p2, f2, m, c = this.masksProperties, d = 0, u = [], y = createElementID(), g = "clipPath", v = "clip-path";
          for (i2 = 0; i2 < a; i2++)
            if (("a" !== c[i2].mode && "n" !== c[i2].mode || c[i2].inv || 100 !== c[i2].o.k || c[i2].o.x) && (g = "mask", v = "mask"), "s" != c[i2].mode && "i" != c[i2].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), n2 = createNS("path"), "n" != c[i2].mode) {
              var b;
              if (d += 1, n2.setAttribute("fill", "s" === c[i2].mode ? "#000000" : "#ffffff"), n2.setAttribute("clip-rule", "nonzero"), 0 !== c[i2].x.k ? (g = "mask", v = "mask", m = PropertyFactory.getProp(this.element, c[i2].x, 0, null, this.element), b = createElementID(), (p2 = createNS("filter")).setAttribute("id", b), (f2 = createNS("feMorphology")).setAttribute("operator", "erode"), f2.setAttribute("in", "SourceGraphic"), f2.setAttribute("radius", "0"), p2.appendChild(f2), s2.appendChild(p2), n2.setAttribute("stroke", "s" === c[i2].mode ? "#000000" : "#ffffff")) : (f2 = null, m = null), this.storedData[i2] = { elem: n2, x: m, expan: f2, lastPath: "", lastOperator: "", filterId: b, lastRadius: 0 }, "i" == c[i2].mode) {
                h = u.length;
                var P = createNS("g");
                for (o2 = 0; o2 < h; o2 += 1)
                  P.appendChild(u[o2]);
                var _ = createNS("mask");
                _.setAttribute("mask-type", "alpha"), _.setAttribute("id", y + "_" + d), _.appendChild(n2), s2.appendChild(_), P.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + d + ")"), u.length = 0, u.push(P);
              } else
                u.push(n2);
              c[i2].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i2] = { elem: n2, lastPath: "", op: PropertyFactory.getProp(this.element, c[i2].o, 0, 0.01, this.element), prop: ShapePropertyFactory.getShapeProp(this.element, c[i2], 3), invRect: l }, this.viewData[i2].prop.k || this.drawPath(c[i2], this.viewData[i2].prop.v, this.viewData[i2]);
            } else
              this.viewData[i2] = { op: PropertyFactory.getProp(this.element, c[i2].o, 0, 0.01, this.element), prop: ShapePropertyFactory.getShapeProp(this.element, c[i2], 3), elem: n2, lastPath: "" }, s2.appendChild(n2);
          for (this.maskElement = createNS(g), a = u.length, i2 = 0; i2 < a; i2 += 1)
            this.maskElement.appendChild(u[i2]);
          d > 0 && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"), s2.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
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
        function SVGShapeData(t2, e2, r) {
          this.caches = [], this.styles = [], this.transformers = t2, this.lStr = "", this.sh = r, this.lvl = e2, this._isAnimated = !!r.k;
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
        function CVShapeData(t2, e2, r, i2) {
          this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
          var s2 = 4;
          "rc" == e2.ty ? s2 = 5 : "el" == e2.ty ? s2 = 6 : "sr" == e2.ty && (s2 = 7), this.sh = ShapePropertyFactory.getShapeProp(t2, e2, s2, t2);
          var a, n2, o2 = r.length;
          for (a = 0; a < o2; a += 1)
            r[a].closed || (n2 = { transforms: i2.addTransformSequence(r[a].transforms), trNodes: [] }, this.styledShapes.push(n2), r[a].elements.push(n2));
        }
        function BaseElement() {
        }
        function NullElement(t2, e2, r) {
          this.initFrame(), this.initBaseData(t2, e2, r), this.initFrame(), this.initTransform(t2, e2, r), this.initHierarchy();
        }
        function SVGBaseElement() {
        }
        function IShapeElement() {
        }
        function ITextElement() {
        }
        function ICompElement() {
        }
        function IImageElement(t2, e2, r) {
          this.assetData = e2.getAssetData(t2.refId), this.initElement(t2, e2, r), this.sourceRect = { top: 0, left: 0, width: this.assetData.w, height: this.assetData.h };
        }
        function ISolidElement(t2, e2, r) {
          this.initElement(t2, e2, r);
        }
        function SVGShapeElement(t2, e2, r) {
          this.shapes = [], this.shapesData = t2.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t2, e2, r), this.prevViewData = [];
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
        function CVImageElement(t2, e2, r) {
          this.assetData = e2.getAssetData(t2.refId), this.img = e2.imageLoader.getImage(this.assetData), this.initElement(t2, e2, r);
        }
        function CVCompElement(t2, e2, r) {
          this.completeLayers = false, this.layers = t2.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t2, e2, r), this.tm = t2.tm ? PropertyFactory.getProp(this, t2.tm, 0, e2.frameRate, this) : { _placeholder: true };
        }
        function CVMaskElement(t2, e2) {
          this.data = t2, this.element = e2, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
          var r, i2 = this.masksProperties.length, s2 = false;
          for (r = 0; r < i2; r++)
            "n" !== this.masksProperties[r].mode && (s2 = true), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
          this.hasMasks = s2, s2 && this.element.addRenderableComponent(this);
        }
        function CVShapeElement(t2, e2, r) {
          this.shapes = [], this.shapesData = t2.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager(), this.initElement(t2, e2, r);
        }
        function CVSolidElement(t2, e2, r) {
          this.initElement(t2, e2, r);
        }
        function CVTextElement(t2, e2, r) {
          this.textSpans = [], this.yOffset = 0, this.fillColorAnim = false, this.strokeColorAnim = false, this.strokeWidthAnim = false, this.stroke = false, this.fill = false, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = { fill: "rgba(0,0,0,0)", stroke: "rgba(0,0,0,0)", sWidth: 0, fValue: "" }, this.initElement(t2, e2, r);
        }
        function CVEffects() {
        }
        BaseRenderer.prototype.checkLayers = function(t2) {
          var e2, r, i2 = this.layers.length;
          for (this.completeLayers = true, e2 = i2 - 1; e2 >= 0; e2--)
            this.elements[e2] || (r = this.layers[e2]).ip - r.st <= t2 - this.layers[e2].st && r.op - r.st > t2 - this.layers[e2].st && this.buildItem(e2), this.completeLayers = !!this.elements[e2] && this.completeLayers;
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
          var e2, r, i2 = t2.length, s2 = this.layers.length;
          for (e2 = 0; e2 < i2; e2 += 1)
            for (r = 0; r < s2; ) {
              if (this.layers[r].id == t2[e2].id) {
                this.layers[r] = t2[e2];
                break;
              }
              r += 1;
            }
        }, BaseRenderer.prototype.setProjectInterface = function(t2) {
          this.globalData.projectInterface = t2;
        }, BaseRenderer.prototype.initItems = function() {
          this.globalData.progressiveLoad || this.buildAllItems();
        }, BaseRenderer.prototype.buildElementParenting = function(t2, e2, r) {
          for (var i2 = this.elements, s2 = this.layers, a = 0, n2 = s2.length; a < n2; )
            s2[a].ind == e2 && (i2[a] && true !== i2[a] ? (r.push(i2[a]), i2[a].setAsParent(), void 0 !== s2[a].parent ? this.buildElementParenting(t2, s2[a].parent, r) : t2.setHierarchy(r)) : (this.buildItem(a), this.addPendingElement(t2))), a += 1;
        }, BaseRenderer.prototype.addPendingElement = function(t2) {
          this.pendingElements.push(t2);
        }, BaseRenderer.prototype.searchExtraCompositions = function(t2) {
          var e2, r = t2.length;
          for (e2 = 0; e2 < r; e2 += 1)
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
          var r = createNS("clipPath"), i2 = createNS("rect");
          i2.setAttribute("width", t2.w), i2.setAttribute("height", t2.h), i2.setAttribute("x", 0), i2.setAttribute("y", 0);
          var s2 = createElementID();
          r.setAttribute("id", s2), r.appendChild(i2), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s2 + ")"), e2.appendChild(r), this.layers = t2.layers, this.elements = createSizedArray(t2.layers.length);
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
            var r = this.createItem(this.layers[t2]);
            e2[t2] = r, expressionsPlugin && (0 === this.layers[t2].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t2), this.layers[t2].tt && (this.elements[t2 - 1] && true !== this.elements[t2 - 1] ? r.setMatte(e2[t2 - 1].layerId) : (this.buildItem(t2 - 1), this.addPendingElement(r)));
          }
        }, SVGRenderer.prototype.checkPendingElements = function() {
          for (; this.pendingElements.length; ) {
            var t2 = this.pendingElements.pop();
            if (t2.checkParenting(), t2.data.tt)
              for (var e2 = 0, r = this.elements.length; e2 < r; ) {
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
            var e2, r = this.layers.length;
            for (this.completeLayers || this.checkLayers(t2), e2 = r - 1; e2 >= 0; e2--)
              (this.completeLayers || this.elements[e2]) && this.elements[e2].prepareFrame(t2 - this.layers[e2].st);
            if (this.globalData._mdf)
              for (e2 = 0; e2 < r; e2 += 1)
                (this.completeLayers || this.elements[e2]) && this.elements[e2].renderFrame();
          }
        }, SVGRenderer.prototype.appendElementInPos = function(t2, e2) {
          var r = t2.getBaseElement();
          if (r) {
            for (var i2, s2 = 0; s2 < e2; )
              this.elements[s2] && true !== this.elements[s2] && this.elements[s2].getBaseElement() && (i2 = this.elements[s2].getBaseElement()), s2 += 1;
            i2 ? this.layerElement.insertBefore(r, i2) : this.layerElement.appendChild(r);
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
              var r = this.contextData.cTr.props;
              this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]);
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
            var r, i2 = this.contextData.saved[this.contextData.cArrPos];
            for (r = 0; r < 16; r += 1)
              i2[r] = e2[r];
            this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1;
          } else
            this.canvasContext.save();
        }, CanvasRenderer.prototype.restore = function(t2) {
          if (this.renderConfig.clearCanvas) {
            t2 && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
            var e2, r = this.contextData.saved[this.contextData.cArrPos], i2 = this.contextData.cTr.props;
            for (e2 = 0; e2 < 16; e2 += 1)
              i2[e2] = r[e2];
            this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), r = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = r, this.globalData.currentGlobalAlpha !== r && (this.canvasContext.globalAlpha = r, this.globalData.currentGlobalAlpha = r);
          } else
            this.canvasContext.restore();
        }, CanvasRenderer.prototype.configAnimation = function(t2) {
          this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className)) : this.canvasContext = this.renderConfig.context, this.data = t2, this.layers = t2.layers, this.transformCanvas = { w: t2.w, h: t2.h, sx: 0, sy: 0, tx: 0, ty: 0 }, this.setupGlobalData(t2, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = false, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t2.layers.length), this.updateContainerSize();
        }, CanvasRenderer.prototype.updateContainerSize = function() {
          var t2, e2, r, i2;
          if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t2 = this.animationItem.wrapper.offsetWidth, e2 = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t2 * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e2 * this.renderConfig.dpr)) : (t2 = this.canvasContext.canvas.width * this.renderConfig.dpr, e2 = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
            var s2 = this.renderConfig.preserveAspectRatio.split(" "), a = s2[1] || "meet", n2 = s2[0] || "xMidYMid", o2 = n2.substr(0, 4), h = n2.substr(4);
            r = t2 / e2, (i2 = this.transformCanvas.w / this.transformCanvas.h) > r && "meet" === a || i2 < r && "slice" === a ? (this.transformCanvas.sx = t2 / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t2 / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e2 / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e2 / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o2 && (i2 < r && "meet" === a || i2 > r && "slice" === a) ? (t2 - this.transformCanvas.w * (e2 / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o2 && (i2 < r && "meet" === a || i2 > r && "slice" === a) ? (t2 - this.transformCanvas.w * (e2 / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (i2 > r && "meet" === a || i2 < r && "slice" === a) ? (e2 - this.transformCanvas.h * (t2 / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (i2 > r && "meet" === a || i2 < r && "slice" === a) ? (e2 - this.transformCanvas.h * (t2 / this.transformCanvas.w)) * this.renderConfig.dpr : 0;
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
            var r, i2 = this.layers.length;
            for (this.completeLayers || this.checkLayers(t2), r = 0; r < i2; r++)
              (this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t2 - this.layers[r].st);
            if (this.globalData._mdf) {
              for (true === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i2 - 1; r >= 0; r -= 1)
                (this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
              true !== this.renderConfig.clearCanvas && this.restore();
            }
          }
        }, CanvasRenderer.prototype.buildItem = function(t2) {
          var e2 = this.elements;
          if (!e2[t2] && 99 != this.layers[t2].ty) {
            var r = this.createItem(this.layers[t2], this, this.globalData);
            e2[t2] = r, r.initExpressions();
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
          var e2, r = this.element.finalTransform.mat, i2 = this.masksProperties.length;
          for (e2 = 0; e2 < i2; e2++)
            if ((this.viewData[e2].prop._mdf || t2) && this.drawPath(this.masksProperties[e2], this.viewData[e2].prop.v, this.viewData[e2]), (this.viewData[e2].op._mdf || t2) && this.viewData[e2].elem.setAttribute("fill-opacity", this.viewData[e2].op.v), "n" !== this.masksProperties[e2].mode && (this.viewData[e2].invRect && (this.element.finalTransform.mProp._mdf || t2) && (this.viewData[e2].invRect.setAttribute("x", -r.props[12]), this.viewData[e2].invRect.setAttribute("y", -r.props[13])), this.storedData[e2].x && (this.storedData[e2].x._mdf || t2))) {
              var s2 = this.storedData[e2].expan;
              this.storedData[e2].x.v < 0 ? ("erode" !== this.storedData[e2].lastOperator && (this.storedData[e2].lastOperator = "erode", this.storedData[e2].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e2].filterId + ")")), s2.setAttribute("radius", -this.storedData[e2].x.v)) : ("dilate" !== this.storedData[e2].lastOperator && (this.storedData[e2].lastOperator = "dilate", this.storedData[e2].elem.setAttribute("filter", null)), this.storedData[e2].elem.setAttribute("stroke-width", 2 * this.storedData[e2].x.v));
            }
        }, MaskElement.prototype.getMaskelement = function() {
          return this.maskElement;
        }, MaskElement.prototype.createLayerSolidPath = function() {
          var t2 = "M0,0 ";
          return t2 += " h" + this.globalData.compSize.w, t2 += " v" + this.globalData.compSize.h, t2 += " h-" + this.globalData.compSize.w, t2 += " v-" + this.globalData.compSize.h + " ";
        }, MaskElement.prototype.drawPath = function(t2, e2, r) {
          var i2, s2, a = " M" + e2.v[0][0] + "," + e2.v[0][1];
          for (s2 = e2._length, i2 = 1; i2 < s2; i2 += 1)
            a += " C" + e2.o[i2 - 1][0] + "," + e2.o[i2 - 1][1] + " " + e2.i[i2][0] + "," + e2.i[i2][1] + " " + e2.v[i2][0] + "," + e2.v[i2][1];
          if (e2.c && s2 > 1 && (a += " C" + e2.o[i2 - 1][0] + "," + e2.o[i2 - 1][1] + " " + e2.i[0][0] + "," + e2.i[0][1] + " " + e2.v[0][0] + "," + e2.v[0][1]), r.lastPath !== a) {
            var n2 = "";
            r.elem && (e2.c && (n2 = t2.inv ? this.solidPath + a : a), r.elem.setAttribute("d", n2)), r.lastPath = a;
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
          var r, i2 = this.dynamicProperties.length;
          for (r = 0; r < i2; r += 1)
            (e2 || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = true, this._mdf = true));
        }, addDynamicProperty: function(t2) {
          -1 === this.dynamicProperties.indexOf(t2) && this.dynamicProperties.push(t2);
        } }, TransformElement.prototype = { initTransform: function() {
          this.finalTransform = { mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : { o: 0 }, _matMdf: false, _opMdf: false, mat: new Matrix() }, this.data.ao && (this.finalTransform.mProp.autoOriented = true), this.data.ty;
        }, renderTransform: function() {
          if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
            var t2, e2 = this.finalTransform.mat, r = 0, i2 = this.hierarchy.length;
            if (!this.finalTransform._matMdf)
              for (; r < i2; ) {
                if (this.hierarchy[r].finalTransform.mProp._mdf) {
                  this.finalTransform._matMdf = true;
                  break;
                }
                r += 1;
              }
            if (this.finalTransform._matMdf)
              for (t2 = this.finalTransform.mProp.v.props, e2.cloneFromProps(t2), r = 0; r < i2; r += 1)
                t2 = this.hierarchy[r].finalTransform.mProp.v.props, e2.transform(t2[0], t2[1], t2[2], t2[3], t2[4], t2[5], t2[6], t2[7], t2[8], t2[9], t2[10], t2[11], t2[12], t2[13], t2[14], t2[15]);
          }
        }, globalToLocal: function(t2) {
          var e2 = [];
          e2.push(this.finalTransform);
          for (var r = true, i2 = this.comp; r; )
            i2.finalTransform ? (i2.data.hasMask && e2.splice(0, 0, i2.finalTransform), i2 = i2.comp) : r = false;
          var s2, a, n2 = e2.length;
          for (s2 = 0; s2 < n2; s2 += 1)
            a = e2[s2].mat.applyToPointArray(0, 0, 0), t2 = [t2[0] - a[0], t2[1] - a[1], 0];
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
        } }, extendPrototype([RenderableElement, createProxyFunction({ initElement: function(t2, e2, r) {
          this.initFrame(), this.initBaseData(t2, e2, r), this.initTransform(t2, e2, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
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
          var e2, r = t2.length, i2 = "_";
          for (e2 = 0; e2 < r; e2 += 1)
            i2 += t2[e2].transform.key + "_";
          var s2 = this.sequences[i2];
          return s2 || (s2 = { transforms: [].concat(t2), finalTransform: new Matrix(), _mdf: false }, this.sequences[i2] = s2, this.sequenceList.push(s2)), s2;
        }, processSequence: function(t2, e2) {
          for (var r, i2 = 0, s2 = t2.transforms.length, a = e2; i2 < s2 && !e2; ) {
            if (t2.transforms[i2].transform.mProps._mdf) {
              a = true;
              break;
            }
            i2 += 1;
          }
          if (a)
            for (t2.finalTransform.reset(), i2 = s2 - 1; i2 >= 0; i2 -= 1)
              r = t2.transforms[i2].transform.mProps.v.props, t2.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
          t2._mdf = a;
        }, processSequences: function(t2) {
          var e2, r = this.sequenceList.length;
          for (e2 = 0; e2 < r; e2 += 1)
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
        }, initBaseData: function(t2, e2, r) {
          this.globalData = e2, this.comp = r, this.data = t2, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
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
          var t2, e2, r, i2 = null;
          if (this.data.td) {
            if (3 == this.data.td || 1 == this.data.td) {
              var s2 = createNS("mask");
              s2.setAttribute("id", this.layerId), s2.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s2.appendChild(this.layerElement), i2 = s2, this.globalData.defs.appendChild(s2), featureSupport.maskType || 1 != this.data.td || (s2.setAttribute("mask-type", "luminance"), t2 = createElementID(), e2 = filtersFactory.createFilter(t2), this.globalData.defs.appendChild(e2), e2.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS("g")).appendChild(this.layerElement), i2 = r, s2.appendChild(r), r.setAttribute("filter", "url(" + locationHref + "#" + t2 + ")"));
            } else if (2 == this.data.td) {
              var a = createNS("mask");
              a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
              var n2 = createNS("g");
              a.appendChild(n2), t2 = createElementID(), e2 = filtersFactory.createFilter(t2);
              var o2 = createNS("feComponentTransfer");
              o2.setAttribute("in", "SourceGraphic"), e2.appendChild(o2);
              var h = createNS("feFuncA");
              h.setAttribute("type", "table"), h.setAttribute("tableValues", "1.0 0.0"), o2.appendChild(h), this.globalData.defs.appendChild(e2);
              var l = createNS("rect");
              l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), n2.setAttribute("filter", "url(" + locationHref + "#" + t2 + ")"), n2.appendChild(l), n2.appendChild(this.layerElement), i2 = n2, featureSupport.maskType || (a.setAttribute("mask-type", "luminance"), e2.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r = createNS("g"), n2.appendChild(l), r.appendChild(this.layerElement), i2 = r, n2.appendChild(r)), this.globalData.defs.appendChild(a);
            }
          } else
            this.data.tt ? (this.matteElement.appendChild(this.layerElement), i2 = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
          if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
            var p2 = createNS("clipPath"), f2 = createNS("path");
            f2.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
            var m = createElementID();
            if (p2.setAttribute("id", m), p2.appendChild(f2), this.globalData.defs.appendChild(p2), this.checkMasks()) {
              var c = createNS("g");
              c.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")"), c.appendChild(this.layerElement), this.transformedElement = c, i2 ? i2.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
            } else
              this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")");
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
          var e2, r = this.shapeModifiers.length;
          for (e2 = 0; e2 < r; e2 += 1)
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
          for (var e2 = this.processedElements, r = 0, i2 = e2.length; r < i2; ) {
            if (e2[r].elem === t2)
              return e2[r].pos;
            r += 1;
          }
          return 0;
        }, addProcessedElement: function(t2, e2) {
          for (var r = this.processedElements, i2 = r.length; i2; )
            if (r[i2 -= 1].elem === t2)
              return void (r[i2].pos = e2);
          r.push(new ProcessedElement(t2, e2));
        }, prepareFrame: function(t2) {
          this.prepareRenderableFrame(t2), this.prepareProperties(t2, this.isInRange);
        } }, ITextElement.prototype.initElement = function(t2, e2, r) {
          this.lettersChangedFlag = true, this.initFrame(), this.initBaseData(t2, e2, r), this.textProperty = new TextProperty(this, t2.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t2.t, this.renderType, this), this.initTransform(t2, e2, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
        }, ITextElement.prototype.prepareFrame = function(t2) {
          this._mdf = false, this.prepareRenderableFrame(t2), this.prepareProperties(t2, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = false, this.textProperty._mdf = false);
        }, ITextElement.prototype.createPathShape = function(t2, e2) {
          var r, i2, s2 = e2.length, a = "";
          for (r = 0; r < s2; r += 1)
            i2 = e2[r].ks.k, a += buildShapeString(i2, i2.i.length, true, t2);
          return a;
        }, ITextElement.prototype.updateDocumentData = function(t2, e2) {
          this.textProperty.updateDocumentData(t2, e2);
        }, ITextElement.prototype.canResizeFont = function(t2) {
          this.textProperty.canResizeFont(t2);
        }, ITextElement.prototype.setMinimumFontSize = function(t2) {
          this.textProperty.setMinimumFontSize(t2);
        }, ITextElement.prototype.applyTextPropertiesToMatrix = function(t2, e2, r, i2, s2) {
          switch (t2.ps && e2.translate(t2.ps[0], t2.ps[1] + t2.ascent, 0), e2.translate(0, -t2.ls, 0), t2.j) {
            case 1:
              e2.translate(t2.justifyOffset + (t2.boxWidth - t2.lineWidths[r]), 0, 0);
              break;
            case 2:
              e2.translate(t2.justifyOffset + (t2.boxWidth - t2.lineWidths[r]) / 2, 0, 0);
          }
          e2.translate(i2, s2, 0);
        }, ITextElement.prototype.buildColor = function(t2) {
          return "rgb(" + Math.round(255 * t2[0]) + "," + Math.round(255 * t2[1]) + "," + Math.round(255 * t2[2]) + ")";
        }, ITextElement.prototype.emptyProp = new LetterProps(), ITextElement.prototype.destroy = function() {
        }, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function(t2, e2, r) {
          this.initFrame(), this.initBaseData(t2, e2, r), this.initTransform(t2, e2, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e2.progressiveLoad || this.buildAllItems(), this.hide();
        }, ICompElement.prototype.prepareFrame = function(t2) {
          if (this._mdf = false, this.prepareRenderableFrame(t2), this.prepareProperties(t2, this.isInRange), this.isInRange || this.data.xt) {
            if (this.tm._placeholder)
              this.renderedFrame = t2 / this.data.sr;
            else {
              var e2 = this.tm.v;
              e2 === this.data.op && (e2 = this.data.op - 1), this.renderedFrame = e2;
            }
            var r, i2 = this.elements.length;
            for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i2 - 1; r >= 0; r -= 1)
              (this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = true));
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
          var t2, e2, r, i2, s2 = this.shapes.length, a = this.stylesList.length, n2 = [], o2 = false;
          for (r = 0; r < a; r += 1) {
            for (i2 = this.stylesList[r], o2 = false, n2.length = 0, t2 = 0; t2 < s2; t2 += 1)
              -1 !== (e2 = this.shapes[t2]).styles.indexOf(i2) && (n2.push(e2), o2 = e2._isAnimated || o2);
            n2.length > 1 && o2 && this.setShapesAsAnimated(n2);
          }
        }, SVGShapeElement.prototype.setShapesAsAnimated = function(t2) {
          var e2, r = t2.length;
          for (e2 = 0; e2 < r; e2 += 1)
            t2[e2].setAsAnimated();
        }, SVGShapeElement.prototype.createStyleElement = function(t2, e2) {
          var r, i2 = new SVGStyleData(t2, e2), s2 = i2.pElem;
          if ("st" === t2.ty)
            r = new SVGStrokeStyleData(this, t2, i2);
          else if ("fl" === t2.ty)
            r = new SVGFillStyleData(this, t2, i2);
          else if ("gf" === t2.ty || "gs" === t2.ty) {
            r = new ("gf" === t2.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t2, i2), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s2.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"));
          }
          return "st" !== t2.ty && "gs" !== t2.ty || (s2.setAttribute("stroke-linecap", this.lcEnum[t2.lc] || "round"), s2.setAttribute("stroke-linejoin", this.ljEnum[t2.lj] || "round"), s2.setAttribute("fill-opacity", "0"), 1 === t2.lj && s2.setAttribute("stroke-miterlimit", t2.ml)), 2 === t2.r && s2.setAttribute("fill-rule", "evenodd"), t2.ln && s2.setAttribute("id", t2.ln), t2.cl && s2.setAttribute("class", t2.cl), t2.bm && (s2.style["mix-blend-mode"] = getBlendMode(t2.bm)), this.stylesList.push(i2), this.addToAnimatedContents(t2, r), r;
        }, SVGShapeElement.prototype.createGroupElement = function(t2) {
          var e2 = new ShapeGroupData();
          return t2.ln && e2.gr.setAttribute("id", t2.ln), t2.cl && e2.gr.setAttribute("class", t2.cl), t2.bm && (e2.gr.style["mix-blend-mode"] = getBlendMode(t2.bm)), e2;
        }, SVGShapeElement.prototype.createTransformElement = function(t2, e2) {
          var r = TransformPropertyFactory.getTransformProperty(this, t2, this), i2 = new SVGTransformData(r, r.o, e2);
          return this.addToAnimatedContents(t2, i2), i2;
        }, SVGShapeElement.prototype.createShapeElement = function(t2, e2, r) {
          var i2 = 4;
          "rc" === t2.ty ? i2 = 5 : "el" === t2.ty ? i2 = 6 : "sr" === t2.ty && (i2 = 7);
          var s2 = new SVGShapeData(e2, r, ShapePropertyFactory.getShapeProp(this, t2, i2, this));
          return this.shapes.push(s2), this.addShapeToModifiers(s2), this.addToAnimatedContents(t2, s2), s2;
        }, SVGShapeElement.prototype.addToAnimatedContents = function(t2, e2) {
          for (var r = 0, i2 = this.animatedContents.length; r < i2; ) {
            if (this.animatedContents[r].element === e2)
              return;
            r += 1;
          }
          this.animatedContents.push({ fn: SVGElementsRenderer.createRenderFunction(t2), element: e2, data: t2 });
        }, SVGShapeElement.prototype.setElementStyles = function(t2) {
          var e2, r = t2.styles, i2 = this.stylesList.length;
          for (e2 = 0; e2 < i2; e2 += 1)
            this.stylesList[e2].closed || r.push(this.stylesList[e2]);
        }, SVGShapeElement.prototype.reloadShapes = function() {
          this._isFirstFrame = true;
          var t2, e2 = this.itemsData.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.prevViewData[t2] = this.itemsData[t2];
          for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true), this.filterUniqueShapes(), e2 = this.dynamicProperties.length, t2 = 0; t2 < e2; t2 += 1)
            this.dynamicProperties[t2].getValue();
          this.renderModifiers();
        }, SVGShapeElement.prototype.searchShapes = function(t2, e2, r, i2, s2, a, n2) {
          var o2, h, l, p2, f2, m, c = [].concat(a), d = t2.length - 1, u = [], y = [];
          for (o2 = d; o2 >= 0; o2 -= 1) {
            if ((m = this.searchProcessedElement(t2[o2])) ? e2[o2] = r[m - 1] : t2[o2]._render = n2, "fl" == t2[o2].ty || "st" == t2[o2].ty || "gf" == t2[o2].ty || "gs" == t2[o2].ty)
              m ? e2[o2].style.closed = false : e2[o2] = this.createStyleElement(t2[o2], s2), t2[o2]._render && i2.appendChild(e2[o2].style.pElem), u.push(e2[o2].style);
            else if ("gr" == t2[o2].ty) {
              if (m)
                for (l = e2[o2].it.length, h = 0; h < l; h += 1)
                  e2[o2].prevViewData[h] = e2[o2].it[h];
              else
                e2[o2] = this.createGroupElement(t2[o2]);
              this.searchShapes(t2[o2].it, e2[o2].it, e2[o2].prevViewData, e2[o2].gr, s2 + 1, c, n2), t2[o2]._render && i2.appendChild(e2[o2].gr);
            } else
              "tr" == t2[o2].ty ? (m || (e2[o2] = this.createTransformElement(t2[o2], i2)), p2 = e2[o2].transform, c.push(p2)) : "sh" == t2[o2].ty || "rc" == t2[o2].ty || "el" == t2[o2].ty || "sr" == t2[o2].ty ? (m || (e2[o2] = this.createShapeElement(t2[o2], c, s2)), this.setElementStyles(e2[o2])) : "tm" == t2[o2].ty || "rd" == t2[o2].ty || "ms" == t2[o2].ty ? (m ? (f2 = e2[o2]).closed = false : ((f2 = ShapeModifiers.getModifier(t2[o2].ty)).init(this, t2[o2]), e2[o2] = f2, this.shapeModifiers.push(f2)), y.push(f2)) : "rp" == t2[o2].ty && (m ? (f2 = e2[o2]).closed = true : (f2 = ShapeModifiers.getModifier(t2[o2].ty), e2[o2] = f2, f2.init(this, t2, o2, e2), this.shapeModifiers.push(f2), n2 = false), y.push(f2));
            this.addProcessedElement(t2[o2], o2 + 1);
          }
          for (d = u.length, o2 = 0; o2 < d; o2 += 1)
            u[o2].closed = true;
          for (d = y.length, o2 = 0; o2 < d; o2 += 1)
            y[o2].closed = true;
        }, SVGShapeElement.prototype.renderInnerContent = function() {
          this.renderModifiers();
          var t2, e2 = this.stylesList.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.stylesList[t2].reset();
          for (this.renderShape(), t2 = 0; t2 < e2; t2 += 1)
            (this.stylesList[t2]._mdf || this._isFirstFrame) && (this.stylesList[t2].msElem && (this.stylesList[t2].msElem.setAttribute("d", this.stylesList[t2].d), this.stylesList[t2].d = "M0 0" + this.stylesList[t2].d), this.stylesList[t2].pElem.setAttribute("d", this.stylesList[t2].d || "M0 0"));
        }, SVGShapeElement.prototype.renderShape = function() {
          var t2, e2, r = this.animatedContents.length;
          for (t2 = 0; t2 < r; t2 += 1)
            e2 = this.animatedContents[t2], (this._isFirstFrame || e2.element._isAnimated) && true !== e2.data && e2.fn(e2.data, e2.element, this._isFirstFrame);
        }, SVGShapeElement.prototype.destroy = function() {
          this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
        }, CVContextData.prototype.duplicate = function() {
          var t2 = 2 * this._length, e2 = this.savedOp;
          this.savedOp = createTypedArray("float32", t2), this.savedOp.set(e2);
          var r = 0;
          for (r = this._length; r < t2; r += 1)
            this.saved[r] = createTypedArray("float32", 16);
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
            var e2, r, i2 = t2.getContext("2d"), s2 = this.img.width, a = this.img.height, n2 = s2 / a, o2 = this.assetData.w / this.assetData.h, h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
            n2 > o2 && "xMidYMid slice" === h || n2 < o2 && "xMidYMid slice" !== h ? e2 = (r = a) * o2 : r = (e2 = s2) / o2, i2.drawImage(this.img, (s2 - e2) / 2, (a - r) / 2, e2, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t2;
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
            var t2, e2, r, i2, s2 = this.element.finalTransform.mat, a = this.element.canvasContext, n2 = this.masksProperties.length;
            for (a.beginPath(), t2 = 0; t2 < n2; t2++)
              if ("n" !== this.masksProperties[t2].mode) {
                this.masksProperties[t2].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compSize.w, 0), a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a.lineTo(0, this.element.globalData.compSize.h), a.lineTo(0, 0)), i2 = this.viewData[t2].v, e2 = s2.applyToPointArray(i2.v[0][0], i2.v[0][1], 0), a.moveTo(e2[0], e2[1]);
                var o2, h = i2._length;
                for (o2 = 1; o2 < h; o2++)
                  r = s2.applyToTriplePoints(i2.o[o2 - 1], i2.i[o2], i2.v[o2]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
                r = s2.applyToTriplePoints(i2.o[o2 - 1], i2.i[0], i2.v[0]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
              }
            this.element.globalData.renderer.save(true), a.clip();
          }
        }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function() {
          this.element = null;
        }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = { opacity: 1, _opMdf: false }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function() {
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, true, []);
        }, CVShapeElement.prototype.createStyleElement = function(t2, e2) {
          var r = { data: t2, type: t2.ty, preTransforms: this.transformsManager.addTransformSequence(e2), transforms: [], elements: [], closed: true === t2.hd }, i2 = {};
          if ("fl" == t2.ty || "st" == t2.ty ? (i2.c = PropertyFactory.getProp(this, t2.c, 1, 255, this), i2.c.k || (r.co = "rgb(" + bm_floor(i2.c.v[0]) + "," + bm_floor(i2.c.v[1]) + "," + bm_floor(i2.c.v[2]) + ")")) : "gf" !== t2.ty && "gs" !== t2.ty || (i2.s = PropertyFactory.getProp(this, t2.s, 1, null, this), i2.e = PropertyFactory.getProp(this, t2.e, 1, null, this), i2.h = PropertyFactory.getProp(this, t2.h || { k: 0 }, 0, 0.01, this), i2.a = PropertyFactory.getProp(this, t2.a || { k: 0 }, 0, degToRads, this), i2.g = new GradientProperty(this, t2.g, this)), i2.o = PropertyFactory.getProp(this, t2.o, 0, 0.01, this), "st" == t2.ty || "gs" == t2.ty) {
            if (r.lc = this.lcEnum[t2.lc] || "round", r.lj = this.ljEnum[t2.lj] || "round", 1 == t2.lj && (r.ml = t2.ml), i2.w = PropertyFactory.getProp(this, t2.w, 0, null, this), i2.w.k || (r.wi = i2.w.v), t2.d) {
              var s2 = new DashProperty(this, t2.d, "canvas", this);
              i2.d = s2, i2.d.k || (r.da = i2.d.dashArray, r.do = i2.d.dashoffset[0]);
            }
          } else
            r.r = 2 === t2.r ? "evenodd" : "nonzero";
          return this.stylesList.push(r), i2.style = r, i2;
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
          var e2, r = this.stylesList.length;
          for (e2 = 0; e2 < r; e2 += 1)
            this.stylesList[e2].closed || this.stylesList[e2].transforms.push(t2);
        }, CVShapeElement.prototype.removeTransformFromStyleList = function() {
          var t2, e2 = this.stylesList.length;
          for (t2 = 0; t2 < e2; t2 += 1)
            this.stylesList[t2].closed || this.stylesList[t2].transforms.pop();
        }, CVShapeElement.prototype.closeStyles = function(t2) {
          var e2, r = t2.length;
          for (e2 = 0; e2 < r; e2 += 1)
            t2[e2].closed = true;
        }, CVShapeElement.prototype.searchShapes = function(t2, e2, r, i2, s2) {
          var a, n2, o2, h, l, p2, f2 = t2.length - 1, m = [], c = [], d = [].concat(s2);
          for (a = f2; a >= 0; a -= 1) {
            if ((h = this.searchProcessedElement(t2[a])) ? e2[a] = r[h - 1] : t2[a]._shouldRender = i2, "fl" == t2[a].ty || "st" == t2[a].ty || "gf" == t2[a].ty || "gs" == t2[a].ty)
              h ? e2[a].style.closed = false : e2[a] = this.createStyleElement(t2[a], d), m.push(e2[a].style);
            else if ("gr" == t2[a].ty) {
              if (h)
                for (o2 = e2[a].it.length, n2 = 0; n2 < o2; n2 += 1)
                  e2[a].prevViewData[n2] = e2[a].it[n2];
              else
                e2[a] = this.createGroupElement(t2[a]);
              this.searchShapes(t2[a].it, e2[a].it, e2[a].prevViewData, i2, d);
            } else
              "tr" == t2[a].ty ? (h || (p2 = this.createTransformElement(t2[a]), e2[a] = p2), d.push(e2[a]), this.addTransformToStyleList(e2[a])) : "sh" == t2[a].ty || "rc" == t2[a].ty || "el" == t2[a].ty || "sr" == t2[a].ty ? h || (e2[a] = this.createShapeElement(t2[a])) : "tm" == t2[a].ty || "rd" == t2[a].ty ? (h ? (l = e2[a]).closed = false : ((l = ShapeModifiers.getModifier(t2[a].ty)).init(this, t2[a]), e2[a] = l, this.shapeModifiers.push(l)), c.push(l)) : "rp" == t2[a].ty && (h ? (l = e2[a]).closed = true : (l = ShapeModifiers.getModifier(t2[a].ty), e2[a] = l, l.init(this, t2, a, e2), this.shapeModifiers.push(l), i2 = false), c.push(l));
            this.addProcessedElement(t2[a], a + 1);
          }
          for (this.removeTransformFromStyleList(), this.closeStyles(m), f2 = c.length, a = 0; a < f2; a += 1)
            c[a].closed = true;
        }, CVShapeElement.prototype.renderInnerContent = function() {
          this.transformHelper.opacity = 1, this.transformHelper._opMdf = false, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, true);
        }, CVShapeElement.prototype.renderShapeTransform = function(t2, e2) {
          (t2._opMdf || e2.op._mdf || this._isFirstFrame) && (e2.opacity = t2.opacity, e2.opacity *= e2.op.v, e2._opMdf = true);
        }, CVShapeElement.prototype.drawLayer = function() {
          var t2, e2, r, i2, s2, a, n2, o2, h, l = this.stylesList.length, p2 = this.globalData.renderer, f2 = this.globalData.canvasContext;
          for (t2 = 0; t2 < l; t2 += 1)
            if (("st" !== (o2 = (h = this.stylesList[t2]).type) && "gs" !== o2 || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
              for (p2.save(), a = h.elements, "st" === o2 || "gs" === o2 ? (f2.strokeStyle = "st" === o2 ? h.co : h.grd, f2.lineWidth = h.wi, f2.lineCap = h.lc, f2.lineJoin = h.lj, f2.miterLimit = h.ml || 0) : f2.fillStyle = "fl" === o2 ? h.co : h.grd, p2.ctxOpacity(h.coOp), "st" !== o2 && "gs" !== o2 && f2.beginPath(), p2.ctxTransform(h.preTransforms.finalTransform.props), r = a.length, e2 = 0; e2 < r; e2 += 1) {
                for ("st" !== o2 && "gs" !== o2 || (f2.beginPath(), h.da && (f2.setLineDash(h.da), f2.lineDashOffset = h.do)), s2 = (n2 = a[e2].trNodes).length, i2 = 0; i2 < s2; i2 += 1)
                  "m" == n2[i2].t ? f2.moveTo(n2[i2].p[0], n2[i2].p[1]) : "c" == n2[i2].t ? f2.bezierCurveTo(n2[i2].pts[0], n2[i2].pts[1], n2[i2].pts[2], n2[i2].pts[3], n2[i2].pts[4], n2[i2].pts[5]) : f2.closePath();
                "st" !== o2 && "gs" !== o2 || (f2.stroke(), h.da && f2.setLineDash(this.dashResetter));
              }
              "st" !== o2 && "gs" !== o2 && f2.fill(h.r), p2.restore();
            }
        }, CVShapeElement.prototype.renderShape = function(t2, e2, r, i2) {
          var s2, a;
          for (a = t2, s2 = e2.length - 1; s2 >= 0; s2 -= 1)
            "tr" == e2[s2].ty ? (a = r[s2].transform, this.renderShapeTransform(t2, a)) : "sh" == e2[s2].ty || "el" == e2[s2].ty || "rc" == e2[s2].ty || "sr" == e2[s2].ty ? this.renderPath(e2[s2], r[s2]) : "fl" == e2[s2].ty ? this.renderFill(e2[s2], r[s2], a) : "st" == e2[s2].ty ? this.renderStroke(e2[s2], r[s2], a) : "gf" == e2[s2].ty || "gs" == e2[s2].ty ? this.renderGradientFill(e2[s2], r[s2], a) : "gr" == e2[s2].ty ? this.renderShape(a, e2[s2].it, r[s2].it) : e2[s2].ty;
          i2 && this.drawLayer();
        }, CVShapeElement.prototype.renderStyledShape = function(t2, e2) {
          if (this._isFirstFrame || e2._mdf || t2.transforms._mdf) {
            var r, i2, s2, a = t2.trNodes, n2 = e2.paths, o2 = n2._length;
            a.length = 0;
            var h = t2.transforms.finalTransform;
            for (s2 = 0; s2 < o2; s2 += 1) {
              var l = n2.shapes[s2];
              if (l && l.v) {
                for (i2 = l._length, r = 1; r < i2; r += 1)
                  1 === r && a.push({ t: "m", p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0) }), a.push({ t: "c", pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r]) });
                1 === i2 && a.push({ t: "m", p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0) }), l.c && i2 && (a.push({ t: "c", pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0]) }), a.push({ t: "z" }));
              }
            }
            t2.trNodes = a;
          }
        }, CVShapeElement.prototype.renderPath = function(t2, e2) {
          if (true !== t2.hd && t2._shouldRender) {
            var r, i2 = e2.styledShapes.length;
            for (r = 0; r < i2; r += 1)
              this.renderStyledShape(e2.styledShapes[r], e2.sh);
          }
        }, CVShapeElement.prototype.renderFill = function(t2, e2, r) {
          var i2 = e2.style;
          (e2.c._mdf || this._isFirstFrame) && (i2.co = "rgb(" + bm_floor(e2.c.v[0]) + "," + bm_floor(e2.c.v[1]) + "," + bm_floor(e2.c.v[2]) + ")"), (e2.o._mdf || r._opMdf || this._isFirstFrame) && (i2.coOp = e2.o.v * r.opacity);
        }, CVShapeElement.prototype.renderGradientFill = function(t2, e2, r) {
          var i2 = e2.style;
          if (!i2.grd || e2.g._mdf || e2.s._mdf || e2.e._mdf || 1 !== t2.t && (e2.h._mdf || e2.a._mdf)) {
            var s2 = this.globalData.canvasContext, a = e2.s.v, n2 = e2.e.v;
            if (1 === t2.t)
              m = s2.createLinearGradient(a[0], a[1], n2[0], n2[1]);
            else
              var o2 = Math.sqrt(Math.pow(a[0] - n2[0], 2) + Math.pow(a[1] - n2[1], 2)), h = Math.atan2(n2[1] - a[1], n2[0] - a[0]), l = o2 * (e2.h.v >= 1 ? 0.99 : e2.h.v <= -1 ? -0.99 : e2.h.v), p2 = Math.cos(h + e2.a.v) * l + a[0], f2 = Math.sin(h + e2.a.v) * l + a[1], m = s2.createRadialGradient(p2, f2, 0, a[0], a[1], o2);
            var c, d = t2.g.p, u = e2.g.c, y = 1;
            for (c = 0; c < d; c += 1)
              e2.g._hasOpacity && e2.g._collapsable && (y = e2.g.o[2 * c + 1]), m.addColorStop(u[4 * c] / 100, "rgba(" + u[4 * c + 1] + "," + u[4 * c + 2] + "," + u[4 * c + 3] + "," + y + ")");
            i2.grd = m;
          }
          i2.coOp = e2.o.v * r.opacity;
        }, CVShapeElement.prototype.renderStroke = function(t2, e2, r) {
          var i2 = e2.style, s2 = e2.d;
          s2 && (s2._mdf || this._isFirstFrame) && (i2.da = s2.dashArray, i2.do = s2.dashoffset[0]), (e2.c._mdf || this._isFirstFrame) && (i2.co = "rgb(" + bm_floor(e2.c.v[0]) + "," + bm_floor(e2.c.v[1]) + "," + bm_floor(e2.c.v[2]) + ")"), (e2.o._mdf || r._opMdf || this._isFirstFrame) && (i2.coOp = e2.o.v * r.opacity), (e2.w._mdf || this._isFirstFrame) && (i2.wi = e2.w.v);
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
          var r = false;
          t2.sc && (r = true, this.values.stroke = this.buildColor(t2.sc), this.values.sWidth = t2.sw);
          var i2, s2, a = this.globalData.fontManager.getFontByName(t2.f), n2 = t2.l, o2 = this.mHelper;
          this.stroke = r, this.values.fValue = t2.finalSize + "px " + this.globalData.fontManager.getFontByName(t2.f).fFamily, s2 = t2.finalText.length;
          var h, l, p2, f2, m, c, d, u, y, g, v = this.data.singleShape, b = t2.tr / 1e3 * t2.finalSize, P = 0, _ = 0, x = true, S = 0;
          for (i2 = 0; i2 < s2; i2 += 1) {
            for (l = (h = this.globalData.fontManager.getCharData(t2.finalText[i2], a.fStyle, this.globalData.fontManager.getFontByName(t2.f).fFamily)) && h.data || {}, o2.reset(), v && n2[i2].n && (P = -b, _ += t2.yOffset, _ += x ? 1 : 0, x = false), d = (m = l.shapes ? l.shapes[0].it : []).length, o2.scale(t2.finalSize / 100, t2.finalSize / 100), v && this.applyTextPropertiesToMatrix(t2, o2, n2[i2].line, P, _), y = createSizedArray(d), c = 0; c < d; c += 1) {
              for (f2 = m[c].ks.k.i.length, u = m[c].ks.k, g = [], p2 = 1; p2 < f2; p2 += 1)
                1 == p2 && g.push(o2.applyToX(u.v[0][0], u.v[0][1], 0), o2.applyToY(u.v[0][0], u.v[0][1], 0)), g.push(o2.applyToX(u.o[p2 - 1][0], u.o[p2 - 1][1], 0), o2.applyToY(u.o[p2 - 1][0], u.o[p2 - 1][1], 0), o2.applyToX(u.i[p2][0], u.i[p2][1], 0), o2.applyToY(u.i[p2][0], u.i[p2][1], 0), o2.applyToX(u.v[p2][0], u.v[p2][1], 0), o2.applyToY(u.v[p2][0], u.v[p2][1], 0));
              g.push(o2.applyToX(u.o[p2 - 1][0], u.o[p2 - 1][1], 0), o2.applyToY(u.o[p2 - 1][0], u.o[p2 - 1][1], 0), o2.applyToX(u.i[0][0], u.i[0][1], 0), o2.applyToY(u.i[0][0], u.i[0][1], 0), o2.applyToX(u.v[0][0], u.v[0][1], 0), o2.applyToY(u.v[0][0], u.v[0][1], 0)), y[c] = g;
            }
            v && (P += n2[i2].l, P += b), this.textSpans[S] ? this.textSpans[S].elem = y : this.textSpans[S] = { elem: y }, S += 1;
          }
        }, CVTextElement.prototype.renderInnerContent = function() {
          var t2, e2, r, i2, s2, a, n2 = this.canvasContext;
          this.finalTransform.mat.props;
          n2.font = this.values.fValue, n2.lineCap = "butt", n2.lineJoin = "miter", n2.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
          var o2, h = this.textAnimator.renderedLetters, l = this.textProperty.currentData.l;
          e2 = l.length;
          var p2, f2, m = null, c = null, d = null;
          for (t2 = 0; t2 < e2; t2 += 1)
            if (!l[t2].n) {
              if ((o2 = h[t2]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o2.p), this.globalData.renderer.ctxOpacity(o2.o)), this.fill) {
                for (o2 && o2.fc ? m !== o2.fc && (m = o2.fc, n2.fillStyle = o2.fc) : m !== this.values.fill && (m = this.values.fill, n2.fillStyle = this.values.fill), i2 = (p2 = this.textSpans[t2].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i2; r += 1)
                  for (a = (f2 = p2[r]).length, this.globalData.canvasContext.moveTo(f2[0], f2[1]), s2 = 2; s2 < a; s2 += 6)
                    this.globalData.canvasContext.bezierCurveTo(f2[s2], f2[s2 + 1], f2[s2 + 2], f2[s2 + 3], f2[s2 + 4], f2[s2 + 5]);
                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill();
              }
              if (this.stroke) {
                for (o2 && o2.sw ? d !== o2.sw && (d = o2.sw, n2.lineWidth = o2.sw) : d !== this.values.sWidth && (d = this.values.sWidth, n2.lineWidth = this.values.sWidth), o2 && o2.sc ? c !== o2.sc && (c = o2.sc, n2.strokeStyle = o2.sc) : c !== this.values.stroke && (c = this.values.stroke, n2.strokeStyle = this.values.stroke), i2 = (p2 = this.textSpans[t2].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i2; r += 1)
                  for (a = (f2 = p2[r]).length, this.globalData.canvasContext.moveTo(f2[0], f2[1]), s2 = 2; s2 < a; s2 += 6)
                    this.globalData.canvasContext.bezierCurveTo(f2[s2], f2[s2 + 1], f2[s2 + 2], f2[s2 + 3], f2[s2 + 4], f2[s2 + 5]);
                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke();
              }
              o2 && this.globalData.renderer.restore();
            }
        }, CVEffects.prototype.renderFrame = function() {
        };
        var animationManager = function() {
          var t2 = {}, e2 = [], r = 0, i2 = 0, s2 = 0, a = true, n2 = false;
          function o2(t3) {
            for (var r2 = 0, s3 = t3.target; r2 < i2; )
              e2[r2].animation === s3 && (e2.splice(r2, 1), r2 -= 1, i2 -= 1, s3.isPaused || p2()), r2 += 1;
          }
          function h(t3, r2) {
            if (!t3)
              return null;
            for (var s3 = 0; s3 < i2; ) {
              if (e2[s3].elem == t3 && null !== e2[s3].elem)
                return e2[s3].animation;
              s3 += 1;
            }
            var a2 = new AnimationItem();
            return f2(a2, t3), a2.setData(t3, r2), a2;
          }
          function l() {
            s2 += 1, d();
          }
          function p2() {
            s2 -= 1;
          }
          function f2(t3, r2) {
            t3.addEventListener("destroy", o2), t3.addEventListener("_active", l), t3.addEventListener("_idle", p2), e2.push({ elem: r2, animation: t3 }), i2 += 1;
          }
          function m(t3) {
            var o3, h2 = t3 - r;
            for (o3 = 0; o3 < i2; o3 += 1)
              e2[o3].animation.advanceTime(h2);
            r = t3, s2 && !n2 ? window.requestAnimationFrame(m) : a = true;
          }
          function c(t3) {
            r = t3, window.requestAnimationFrame(m);
          }
          function d() {
            !n2 && s2 && a && (window.requestAnimationFrame(c), a = false);
          }
          return t2.registerAnimation = h, t2.loadAnimation = function(t3) {
            var e3 = new AnimationItem();
            return f2(e3, null), e3.setParams(t3), e3;
          }, t2.setSpeed = function(t3, r2) {
            var s3;
            for (s3 = 0; s3 < i2; s3 += 1)
              e2[s3].animation.setSpeed(t3, r2);
          }, t2.setDirection = function(t3, r2) {
            var s3;
            for (s3 = 0; s3 < i2; s3 += 1)
              e2[s3].animation.setDirection(t3, r2);
          }, t2.play = function(t3) {
            var r2;
            for (r2 = 0; r2 < i2; r2 += 1)
              e2[r2].animation.play(t3);
          }, t2.pause = function(t3) {
            var r2;
            for (r2 = 0; r2 < i2; r2 += 1)
              e2[r2].animation.pause(t3);
          }, t2.stop = function(t3) {
            var r2;
            for (r2 = 0; r2 < i2; r2 += 1)
              e2[r2].animation.stop(t3);
          }, t2.togglePause = function(t3) {
            var r2;
            for (r2 = 0; r2 < i2; r2 += 1)
              e2[r2].animation.togglePause(t3);
          }, t2.searchAnimations = function(t3, e3, r2) {
            var i3, s3 = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))), a2 = s3.length;
            for (i3 = 0; i3 < a2; i3 += 1)
              r2 && s3[i3].setAttribute("data-bm-type", r2), h(s3[i3], t3);
            if (e3 && 0 === a2) {
              r2 || (r2 = "svg");
              var n3 = document.getElementsByTagName("body")[0];
              n3.innerHTML = "";
              var o3 = createTag("div");
              o3.style.width = "100%", o3.style.height = "100%", o3.setAttribute("data-bm-type", r2), n3.appendChild(o3), h(o3, t3);
            }
          }, t2.resize = function() {
            var t3;
            for (t3 = 0; t3 < i2; t3 += 1)
              e2[t3].animation.resize();
          }, t2.goToAndStop = function(t3, r2, s3) {
            var a2;
            for (a2 = 0; a2 < i2; a2 += 1)
              e2[a2].animation.goToAndStop(t3, r2, s3);
          }, t2.destroy = function(t3) {
            var r2;
            for (r2 = i2 - 1; r2 >= 0; r2 -= 1)
              e2[r2].animation.destroy(t3);
          }, t2.freeze = function() {
            n2 = true;
          }, t2.unfreeze = function() {
            n2 = false, d();
          }, t2.getRegisteredAnimations = function() {
            var t3, r2 = e2.length, i3 = [];
            for (t3 = 0; t3 < r2; t3 += 1)
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
          var r = { wrapper: t2, animationData: e2 ? "object" === _typeof(e2) ? e2 : JSON.parse(e2) : null }, i2 = t2.attributes;
          r.path = i2.getNamedItem("data-animation-path") ? i2.getNamedItem("data-animation-path").value : i2.getNamedItem("data-bm-path") ? i2.getNamedItem("data-bm-path").value : i2.getNamedItem("bm-path") ? i2.getNamedItem("bm-path").value : "", r.animType = i2.getNamedItem("data-anim-type") ? i2.getNamedItem("data-anim-type").value : i2.getNamedItem("data-bm-type") ? i2.getNamedItem("data-bm-type").value : i2.getNamedItem("bm-type") ? i2.getNamedItem("bm-type").value : i2.getNamedItem("data-bm-renderer") ? i2.getNamedItem("data-bm-renderer").value : i2.getNamedItem("bm-renderer") ? i2.getNamedItem("bm-renderer").value : "canvas";
          var s2 = i2.getNamedItem("data-anim-loop") ? i2.getNamedItem("data-anim-loop").value : i2.getNamedItem("data-bm-loop") ? i2.getNamedItem("data-bm-loop").value : i2.getNamedItem("bm-loop") ? i2.getNamedItem("bm-loop").value : "";
          "" === s2 || (r.loop = "false" !== s2 && ("true" === s2 || parseInt(s2)));
          var a = i2.getNamedItem("data-anim-autoplay") ? i2.getNamedItem("data-anim-autoplay").value : i2.getNamedItem("data-bm-autoplay") ? i2.getNamedItem("data-bm-autoplay").value : !i2.getNamedItem("bm-autoplay") || i2.getNamedItem("bm-autoplay").value;
          r.autoplay = "false" !== a, r.name = i2.getNamedItem("data-name") ? i2.getNamedItem("data-name").value : i2.getNamedItem("data-bm-name") ? i2.getNamedItem("data-bm-name").value : i2.getNamedItem("bm-name") ? i2.getNamedItem("bm-name").value : "", "false" === (i2.getNamedItem("data-anim-prerender") ? i2.getNamedItem("data-anim-prerender").value : i2.getNamedItem("data-bm-prerender") ? i2.getNamedItem("data-bm-prerender").value : i2.getNamedItem("bm-prerender") ? i2.getNamedItem("bm-prerender").value : "") && (r.prerender = false), this.setParams(r);
        }, AnimationItem.prototype.includeLayers = function(t2) {
          t2.op > this.animationData.op && (this.animationData.op = t2.op, this.totalFrames = Math.floor(t2.op - this.animationData.ip));
          var e2, r, i2 = this.animationData.layers, s2 = i2.length, a = t2.layers, n2 = a.length;
          for (r = 0; r < n2; r += 1)
            for (e2 = 0; e2 < s2; ) {
              if (i2[e2].id == a[r].id) {
                i2[e2] = a[r];
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
          var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
          this.segmentPos += 1, assetLoader.load(r, this.includeLayers.bind(this), (function() {
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
        }, AnimationItem.prototype.goToAndStop = function(t2, e2, r) {
          r && this.name != r || (e2 ? this.setCurrentRawFrameValue(t2) : this.setCurrentRawFrameValue(t2 * this.frameModifier), this.pause());
        }, AnimationItem.prototype.goToAndPlay = function(t2, e2, r) {
          this.goToAndStop(t2, e2, r), this.play();
        }, AnimationItem.prototype.advanceTime = function(t2) {
          if (true !== this.isPaused && false !== this.isLoaded) {
            var e2 = this.currentRawFrame + t2 * this.frameModifier, r = false;
            e2 >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e2 >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e2 % this.totalFrames) || (this.setCurrentRawFrameValue(e2 % this.totalFrames), this._completedLoop = true, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e2) : this.checkSegments(e2 > this.totalFrames ? e2 % this.totalFrames : 0) || (r = true, e2 = this.totalFrames - 1) : e2 < 0 ? this.checkSegments(e2 % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && true !== this.loop ? (r = true, e2 = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e2 % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = true)) : this.setCurrentRawFrameValue(e2), r && (this.setCurrentRawFrameValue(e2), this.pause(), this.trigger("complete"));
          }
        }, AnimationItem.prototype.adjustSegment = function(t2, e2) {
          this.playCount = 0, t2[1] < t2[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t2[0] - t2[1], this.firstFrame = t2[1], this.setCurrentRawFrameValue(this.totalFrames - 1e-3 - e2)) : t2[1] > t2[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t2[1] - t2[0], this.firstFrame = t2[0], this.setCurrentRawFrameValue(1e-3 + e2)), this.trigger("segmentStart");
        }, AnimationItem.prototype.setSegment = function(t2, e2) {
          var r = -1;
          this.isPaused && (this.currentRawFrame + this.firstFrame < t2 ? r = t2 : this.currentRawFrame + this.firstFrame > e2 && (r = e2 - t2)), this.firstFrame = t2, this.timeCompleted = this.totalFrames = e2 - t2, -1 !== r && this.goToAndStop(r, true);
        }, AnimationItem.prototype.playSegments = function(t2, e2) {
          if (e2 && (this.segments.length = 0), "object" === _typeof(t2[0])) {
            var r, i2 = t2.length;
            for (r = 0; r < i2; r += 1)
              this.segments.push(t2[r]);
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
            var r = t2.p;
            -1 !== r.indexOf("images/") && (r = r.split("/")[1]), e2 = this.assetsPath + r;
          } else
            e2 = this.path, e2 += t2.u ? t2.u : "", e2 += t2.p;
          return e2;
        }, AnimationItem.prototype.getAssetData = function(t2) {
          for (var e2 = 0, r = this.assets.length; e2 < r; ) {
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
            var e2 = 0, r = [];
            t3.renderer.compInterface = CompExpressionInterface(t3.renderer), t3.renderer.globalData.projectInterface.registerComposition(t3.renderer), t3.renderer.globalData.pushExpression = function() {
              e2 += 1;
            }, t3.renderer.globalData.popExpression = function() {
              0 === (e2 -= 1) && function() {
                var t4, e3 = r.length;
                for (t4 = 0; t4 < e3; t4 += 1)
                  r[t4].release();
                r.length = 0;
              }();
            }, t3.renderer.globalData.registerExpressionProperty = function(t4) {
              -1 === r.indexOf(t4) && r.push(t4);
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
              var r, i2, s2 = this.pv.length ? this.pv.length : 1, a = createTypedArray("float32", s2);
              var n2 = Math.floor(5 * time);
              for (r = 0, i2 = 0; r < n2; ) {
                for (i2 = 0; i2 < s2; i2 += 1)
                  a[i2] += -e2 + 2 * e2 * BMMath.random();
                r += 1;
              }
              var o2 = 5 * time, h = o2 - Math.floor(o2), l = createTypedArray("float32", s2);
              if (s2 > 1) {
                for (i2 = 0; i2 < s2; i2 += 1)
                  l[i2] = this.pv[i2] + a[i2] + (-e2 + 2 * e2 * BMMath.random()) * h;
                return l;
              }
              return this.pv + a[0] + (-e2 + 2 * e2 * BMMath.random()) * h;
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
        }(), expressionHelpers = { searchExpressions: function(t2, e2, r) {
          e2.x && (r.k = true, r.x = true, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t2, e2, r).bind(r)));
        }, getSpeedAtTime: function(t2) {
          var e2 = this.getValueAtTime(t2), r = this.getValueAtTime(t2 + -0.01), i2 = 0;
          if (e2.length) {
            var s2;
            for (s2 = 0; s2 < e2.length; s2 += 1)
              i2 += Math.pow(r[s2] - e2[s2], 2);
            i2 = 100 * Math.sqrt(i2);
          } else
            i2 = 0;
          return i2;
        }, getVelocityAtTime: function(t2) {
          if (void 0 !== this.vel)
            return this.vel;
          var e2, r, i2 = this.getValueAtTime(t2), s2 = this.getValueAtTime(t2 + -1e-3);
          if (i2.length)
            for (e2 = createTypedArray("float32", i2.length), r = 0; r < i2.length; r += 1)
              e2[r] = (s2[r] - i2[r]) / -1e-3;
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
          function t2(t3, e3, r2) {
            if (!this.k || !this.keyframes)
              return this.pv;
            t3 = t3 ? t3.toLowerCase() : "";
            var i3, s3, a2, n3, o3, h2 = this.comp.renderedFrame, l2 = this.keyframes, p3 = l2[l2.length - 1].t;
            if (h2 <= p3)
              return this.pv;
            if (r2 ? s3 = p3 - (i3 = e3 ? Math.abs(p3 - elem.comp.globalData.frameRate * e3) : Math.max(0, p3 - this.elem.data.ip)) : ((!e3 || e3 > l2.length - 1) && (e3 = l2.length - 1), i3 = p3 - (s3 = l2[l2.length - 1 - e3].t)), "pingpong" === t3) {
              if (Math.floor((h2 - s3) / i3) % 2 != 0)
                return this.getValueAtTime((i3 - (h2 - s3) % i3 + s3) / this.comp.globalData.frameRate, 0);
            } else {
              if ("offset" === t3) {
                var f2 = this.getValueAtTime(s3 / this.comp.globalData.frameRate, 0), m = this.getValueAtTime(p3 / this.comp.globalData.frameRate, 0), c = this.getValueAtTime(((h2 - s3) % i3 + s3) / this.comp.globalData.frameRate, 0), d = Math.floor((h2 - s3) / i3);
                if (this.pv.length) {
                  for (n3 = (o3 = new Array(f2.length)).length, a2 = 0; a2 < n3; a2 += 1)
                    o3[a2] = (m[a2] - f2[a2]) * d + c[a2];
                  return o3;
                }
                return (m - f2) * d + c;
              }
              if ("continue" === t3) {
                var u = this.getValueAtTime(p3 / this.comp.globalData.frameRate, 0), y = this.getValueAtTime((p3 - 1e-3) / this.comp.globalData.frameRate, 0);
                if (this.pv.length) {
                  for (n3 = (o3 = new Array(u.length)).length, a2 = 0; a2 < n3; a2 += 1)
                    o3[a2] = u[a2] + (u[a2] - y[a2]) * ((h2 - p3) / this.comp.globalData.frameRate) / 5e-4;
                  return o3;
                }
                return u + (h2 - p3) / 1e-3 * (u - y);
              }
            }
            return this.getValueAtTime(((h2 - s3) % i3 + s3) / this.comp.globalData.frameRate, 0);
          }
          function e2(t3, e3, r2) {
            if (!this.k)
              return this.pv;
            t3 = t3 ? t3.toLowerCase() : "";
            var i3, s3, a2, n3, o3, h2 = this.comp.renderedFrame, l2 = this.keyframes, p3 = l2[0].t;
            if (h2 >= p3)
              return this.pv;
            if (r2 ? s3 = p3 + (i3 = e3 ? Math.abs(elem.comp.globalData.frameRate * e3) : Math.max(0, this.elem.data.op - p3)) : ((!e3 || e3 > l2.length - 1) && (e3 = l2.length - 1), i3 = (s3 = l2[e3].t) - p3), "pingpong" === t3) {
              if (Math.floor((p3 - h2) / i3) % 2 == 0)
                return this.getValueAtTime(((p3 - h2) % i3 + p3) / this.comp.globalData.frameRate, 0);
            } else {
              if ("offset" === t3) {
                var f2 = this.getValueAtTime(p3 / this.comp.globalData.frameRate, 0), m = this.getValueAtTime(s3 / this.comp.globalData.frameRate, 0), c = this.getValueAtTime((i3 - (p3 - h2) % i3 + p3) / this.comp.globalData.frameRate, 0), d = Math.floor((p3 - h2) / i3) + 1;
                if (this.pv.length) {
                  for (n3 = (o3 = new Array(f2.length)).length, a2 = 0; a2 < n3; a2 += 1)
                    o3[a2] = c[a2] - (m[a2] - f2[a2]) * d;
                  return o3;
                }
                return c - (m - f2) * d;
              }
              if ("continue" === t3) {
                var u = this.getValueAtTime(p3 / this.comp.globalData.frameRate, 0), y = this.getValueAtTime((p3 + 1e-3) / this.comp.globalData.frameRate, 0);
                if (this.pv.length) {
                  for (n3 = (o3 = new Array(u.length)).length, a2 = 0; a2 < n3; a2 += 1)
                    o3[a2] = u[a2] + (u[a2] - y[a2]) * (p3 - h2) / 1e-3;
                  return o3;
                }
                return u + (u - y) * (p3 - h2) / 1e-3;
              }
            }
            return this.getValueAtTime((i3 - (p3 - h2) % i3 + p3) / this.comp.globalData.frameRate, 0);
          }
          function r(t3, e3) {
            if (!this.k)
              return this.pv;
            if (t3 = 0.5 * (t3 || 0.4), (e3 = Math.floor(e3 || 5)) <= 1)
              return this.pv;
            var r2, i3, s3 = this.comp.renderedFrame / this.comp.globalData.frameRate, a2 = s3 - t3, n3 = e3 > 1 ? (s3 + t3 - a2) / (e3 - 1) : 1, o3 = 0, h2 = 0;
            for (r2 = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o3 < e3; ) {
              if (i3 = this.getValueAtTime(a2 + o3 * n3), this.pv.length)
                for (h2 = 0; h2 < this.pv.length; h2 += 1)
                  r2[h2] += i3[h2];
              else
                r2 += i3;
              o3 += 1;
            }
            if (this.pv.length)
              for (h2 = 0; h2 < this.pv.length; h2 += 1)
                r2[h2] /= e3;
            else
              r2 /= e3;
            return r2;
          }
          function i2(t3) {
            index.__f__("warn", "at node_modules/lottie-miniprogram/miniprogram_dist/index.js:9", "Transform at time not supported");
          }
          function s2(t3) {
          }
          var a = TransformPropertyFactory.getTransformProperty;
          TransformPropertyFactory.getTransformProperty = function(t3, e3, r2) {
            var n3 = a(t3, e3, r2);
            return n3.dynamicProperties.length ? n3.getValueAtTime = i2.bind(n3) : n3.getValueAtTime = s2.bind(n3), n3.setGroupProperty = expressionHelpers.setGroupProperty, n3;
          };
          var n2 = PropertyFactory.getProp;
          PropertyFactory.getProp = function(i3, s3, a2, o3, h2) {
            var l2 = n2(i3, s3, a2, o3, h2);
            l2.kf ? l2.getValueAtTime = expressionHelpers.getValueAtTime.bind(l2) : l2.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l2), l2.setGroupProperty = expressionHelpers.setGroupProperty, l2.loopOut = t2, l2.loopIn = e2, l2.smooth = r, l2.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l2), l2.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l2), l2.numKeys = 1 === s3.a ? s3.k.length : 0, l2.propertyIndex = s3.ix;
            var p3 = 0;
            return 0 !== a2 && (p3 = createTypedArray("float32", 1 === s3.a ? s3.k[0].s.length : s3.k.length)), l2._cachingAtTime = { lastFrame: initialDefaultFrame, lastIndex: 0, value: p3 }, expressionHelpers.searchExpressions(i3, s3, l2), l2.k && h2.addDynamicProperty(l2), l2;
          };
          var o2 = ShapePropertyFactory.getConstructorFunction(), h = ShapePropertyFactory.getKeyframedConstructorFunction();
          function l() {
          }
          l.prototype = { vertices: function(t3, e3) {
            this.k && this.getValue();
            var r2 = this.v;
            void 0 !== e3 && (r2 = this.getValueAtTime(e3, 0));
            var i3, s3 = r2._length, a2 = r2[t3], n3 = r2.v, o3 = createSizedArray(s3);
            for (i3 = 0; i3 < s3; i3 += 1)
              o3[i3] = "i" === t3 || "o" === t3 ? [a2[i3][0] - n3[i3][0], a2[i3][1] - n3[i3][1]] : [a2[i3][0], a2[i3][1]];
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
            var r2 = this.v;
            void 0 !== e3 && (r2 = this.getValueAtTime(e3, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r2));
            for (var i3, s3 = this._segmentsLength, a2 = s3.lengths, n3 = s3.totalLength * t3, o3 = 0, h2 = a2.length, l2 = 0; o3 < h2; ) {
              if (l2 + a2[o3].addedLength > n3) {
                var p3 = o3, f2 = r2.c && o3 === h2 - 1 ? 0 : o3 + 1, m = (n3 - l2) / a2[o3].addedLength;
                i3 = bez.getPointInSegment(r2.v[p3], r2.v[f2], r2.o[p3], r2.i[f2], m, a2[o3]);
                break;
              }
              l2 += a2[o3].addedLength, o3 += 1;
            }
            return i3 || (i3 = r2.c ? [r2.v[0][0], r2.v[0][1]] : [r2.v[r2._length - 1][0], r2.v[r2._length - 1][1]]), i3;
          }, vectorOnPath: function(t3, e3, r2) {
            t3 = 1 == t3 ? this.v.c ? 0 : 0.999 : t3;
            var i3 = this.pointOnPath(t3, e3), s3 = this.pointOnPath(t3 + 1e-3, e3), a2 = s3[0] - i3[0], n3 = s3[1] - i3[1], o3 = Math.sqrt(Math.pow(a2, 2) + Math.pow(n3, 2));
            return 0 === o3 ? [0, 0] : "tangent" === r2 ? [a2 / o3, n3 / o3] : [-n3 / o3, a2 / o3];
          }, tangentOnPath: function(t3, e3) {
            return this.vectorOnPath(t3, e3, "tangent");
          }, normalOnPath: function(t3, e3) {
            return this.vectorOnPath(t3, e3, "normal");
          }, setGroupProperty: expressionHelpers.setGroupProperty, getValueAtTime: expressionHelpers.getStaticValueAtTime }, extendPrototype([l], o2), extendPrototype([l], h), h.prototype.getValueAtTime = function(t3) {
            return this._cachingAtTime || (this._cachingAtTime = { shapeValue: shape_pool.clone(this.pv), lastIndex: 0, lastTime: initialDefaultFrame }), t3 *= this.elem.globalData.frameRate, (t3 -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t3 ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t3, this.interpolateShape(t3, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue;
          }, h.prototype.initiateExpression = ExpressionManager.initiateExpression;
          var p2 = ShapePropertyFactory.getShapeProp;
          ShapePropertyFactory.getShapeProp = function(t3, e3, r2, i3, s3) {
            var a2 = p2(t3, e3, r2, i3, s3);
            return a2.propertyIndex = e3.ix, a2.lock = false, 3 === r2 ? expressionHelpers.searchExpressions(t3, e3.pt, a2) : 4 === r2 && expressionHelpers.searchExpressions(t3, e3.ks, a2), a2.k && t3.addDynamicProperty(a2), a2;
          };
        }(), TextProperty.prototype.getExpressionValue = function(t2, e2) {
          var r = this.calculateExpression(e2);
          if (t2.t !== r) {
            var i2 = {};
            return this.copyData(i2, t2), i2.t = r.toString(), i2.__complete = false, i2;
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
          function t2(t3, f2, m) {
            var c, d = [], u = t3 ? t3.length : 0;
            for (c = 0; c < u; c += 1)
              "gr" == t3[c].ty ? d.push(e2(t3[c], f2[c], m)) : "fl" == t3[c].ty ? d.push(r(t3[c], f2[c], m)) : "st" == t3[c].ty ? d.push(i2(t3[c], f2[c], m)) : "tm" == t3[c].ty ? d.push(s2(t3[c], f2[c], m)) : "tr" == t3[c].ty || ("el" == t3[c].ty ? d.push(a(t3[c], f2[c], m)) : "sr" == t3[c].ty ? d.push(n2(t3[c], f2[c], m)) : "sh" == t3[c].ty ? d.push(p2(t3[c], f2[c], m)) : "rc" == t3[c].ty ? d.push(o2(t3[c], f2[c], m)) : "rd" == t3[c].ty ? d.push(h(t3[c], f2[c], m)) : "rp" == t3[c].ty && d.push(l(t3[c], f2[c], m)));
            return d;
          }
          function e2(e3, r2, i3) {
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
            var a2 = function(e4, r3, i4) {
              var s4, a3 = function(t3) {
                for (var e5 = 0, r4 = s4.length; e5 < r4; ) {
                  if (s4[e5]._name === t3 || s4[e5].mn === t3 || s4[e5].propertyIndex === t3 || s4[e5].ix === t3 || s4[e5].ind === t3)
                    return s4[e5];
                  e5 += 1;
                }
                if ("number" == typeof t3)
                  return s4[t3 - 1];
              };
              return a3.propertyGroup = function(t3) {
                return 1 === t3 ? a3 : i4(t3 - 1);
              }, s4 = t2(e4.it, r3.it, a3.propertyGroup), a3.numProperties = s4.length, a3.propertyIndex = e4.cix, a3._name = e4.nm, a3;
            }(e3, r2, s3.propertyGroup), n3 = function(t3, e4, r3) {
              function i4(t4) {
                return 1 == t4 ? s4 : r3(--t4);
              }
              e4.transform.mProps.o.setGroupProperty(i4), e4.transform.mProps.p.setGroupProperty(i4), e4.transform.mProps.a.setGroupProperty(i4), e4.transform.mProps.s.setGroupProperty(i4), e4.transform.mProps.r.setGroupProperty(i4), e4.transform.mProps.sk && (e4.transform.mProps.sk.setGroupProperty(i4), e4.transform.mProps.sa.setGroupProperty(i4));
              function s4(e5) {
                return t3.a.ix === e5 || "Anchor Point" === e5 ? s4.anchorPoint : t3.o.ix === e5 || "Opacity" === e5 ? s4.opacity : t3.p.ix === e5 || "Position" === e5 ? s4.position : t3.r.ix === e5 || "Rotation" === e5 || "ADBE Vector Rotation" === e5 ? s4.rotation : t3.s.ix === e5 || "Scale" === e5 ? s4.scale : t3.sk && t3.sk.ix === e5 || "Skew" === e5 ? s4.skew : t3.sa && t3.sa.ix === e5 || "Skew Axis" === e5 ? s4.skewAxis : void 0;
              }
              return e4.transform.op.setGroupProperty(i4), Object.defineProperties(s4, { opacity: { get: ExpressionPropertyInterface(e4.transform.mProps.o) }, position: { get: ExpressionPropertyInterface(e4.transform.mProps.p) }, anchorPoint: { get: ExpressionPropertyInterface(e4.transform.mProps.a) }, scale: { get: ExpressionPropertyInterface(e4.transform.mProps.s) }, rotation: { get: ExpressionPropertyInterface(e4.transform.mProps.r) }, skew: { get: ExpressionPropertyInterface(e4.transform.mProps.sk) }, skewAxis: { get: ExpressionPropertyInterface(e4.transform.mProps.sa) }, _name: { value: t3.nm } }), s4.ty = "tr", s4.mn = t3.mn, s4.propertyGroup = r3, s4;
            }(e3.it[e3.it.length - 1], r2.it[r2.it.length - 1], s3.propertyGroup);
            return s3.content = a2, s3.transform = n3, Object.defineProperty(s3, "_name", { get: function() {
              return e3.nm;
            } }), s3.numProperties = e3.np, s3.propertyIndex = e3.ix, s3.nm = e3.nm, s3.mn = e3.mn, s3;
          }
          function r(t3, e3, r2) {
            function i3(t4) {
              return "Color" === t4 || "color" === t4 ? i3.color : "Opacity" === t4 || "opacity" === t4 ? i3.opacity : void 0;
            }
            return Object.defineProperties(i3, { color: { get: ExpressionPropertyInterface(e3.c) }, opacity: { get: ExpressionPropertyInterface(e3.o) }, _name: { value: t3.nm }, mn: { value: t3.mn } }), e3.c.setGroupProperty(r2), e3.o.setGroupProperty(r2), i3;
          }
          function i2(t3, e3, r2) {
            function i3(t4) {
              return 1 === t4 ? ob : r2(t4 - 1);
            }
            function s3(t4) {
              return 1 === t4 ? h2 : i3(t4 - 1);
            }
            function a2(r3) {
              Object.defineProperty(h2, t3.d[r3].nm, { get: ExpressionPropertyInterface(e3.d.dataProps[r3].p) });
            }
            var n3, o3 = t3.d ? t3.d.length : 0, h2 = {};
            for (n3 = 0; n3 < o3; n3 += 1)
              a2(n3), e3.d.dataProps[n3].p.setGroupProperty(s3);
            function l2(t4) {
              return "Color" === t4 || "color" === t4 ? l2.color : "Opacity" === t4 || "opacity" === t4 ? l2.opacity : "Stroke Width" === t4 || "stroke width" === t4 ? l2.strokeWidth : void 0;
            }
            return Object.defineProperties(l2, { color: { get: ExpressionPropertyInterface(e3.c) }, opacity: { get: ExpressionPropertyInterface(e3.o) }, strokeWidth: { get: ExpressionPropertyInterface(e3.w) }, dash: { get: function() {
              return h2;
            } }, _name: { value: t3.nm }, mn: { value: t3.mn } }), e3.c.setGroupProperty(i3), e3.o.setGroupProperty(i3), e3.w.setGroupProperty(i3), l2;
          }
          function s2(t3, e3, r2) {
            function i3(t4) {
              return 1 == t4 ? s3 : r2(--t4);
            }
            function s3(e4) {
              return e4 === t3.e.ix || "End" === e4 || "end" === e4 ? s3.end : e4 === t3.s.ix ? s3.start : e4 === t3.o.ix ? s3.offset : void 0;
            }
            return s3.propertyIndex = t3.ix, e3.s.setGroupProperty(i3), e3.e.setGroupProperty(i3), e3.o.setGroupProperty(i3), s3.propertyIndex = t3.ix, s3.propertyGroup = r2, Object.defineProperties(s3, { start: { get: ExpressionPropertyInterface(e3.s) }, end: { get: ExpressionPropertyInterface(e3.e) }, offset: { get: ExpressionPropertyInterface(e3.o) }, _name: { value: t3.nm } }), s3.mn = t3.mn, s3;
          }
          function a(t3, e3, r2) {
            function i3(t4) {
              return 1 == t4 ? a2 : r2(--t4);
            }
            a2.propertyIndex = t3.ix;
            var s3 = "tm" === e3.sh.ty ? e3.sh.prop : e3.sh;
            function a2(e4) {
              return t3.p.ix === e4 ? a2.position : t3.s.ix === e4 ? a2.size : void 0;
            }
            return s3.s.setGroupProperty(i3), s3.p.setGroupProperty(i3), Object.defineProperties(a2, { size: { get: ExpressionPropertyInterface(s3.s) }, position: { get: ExpressionPropertyInterface(s3.p) }, _name: { value: t3.nm } }), a2.mn = t3.mn, a2;
          }
          function n2(t3, e3, r2) {
            function i3(t4) {
              return 1 == t4 ? a2 : r2(--t4);
            }
            var s3 = "tm" === e3.sh.ty ? e3.sh.prop : e3.sh;
            function a2(e4) {
              return t3.p.ix === e4 ? a2.position : t3.r.ix === e4 ? a2.rotation : t3.pt.ix === e4 ? a2.points : t3.or.ix === e4 || "ADBE Vector Star Outer Radius" === e4 ? a2.outerRadius : t3.os.ix === e4 ? a2.outerRoundness : !t3.ir || t3.ir.ix !== e4 && "ADBE Vector Star Inner Radius" !== e4 ? t3.is && t3.is.ix === e4 ? a2.innerRoundness : void 0 : a2.innerRadius;
            }
            return a2.propertyIndex = t3.ix, s3.or.setGroupProperty(i3), s3.os.setGroupProperty(i3), s3.pt.setGroupProperty(i3), s3.p.setGroupProperty(i3), s3.r.setGroupProperty(i3), t3.ir && (s3.ir.setGroupProperty(i3), s3.is.setGroupProperty(i3)), Object.defineProperties(a2, { position: { get: ExpressionPropertyInterface(s3.p) }, rotation: { get: ExpressionPropertyInterface(s3.r) }, points: { get: ExpressionPropertyInterface(s3.pt) }, outerRadius: { get: ExpressionPropertyInterface(s3.or) }, outerRoundness: { get: ExpressionPropertyInterface(s3.os) }, innerRadius: { get: ExpressionPropertyInterface(s3.ir) }, innerRoundness: { get: ExpressionPropertyInterface(s3.is) }, _name: { value: t3.nm } }), a2.mn = t3.mn, a2;
          }
          function o2(t3, e3, r2) {
            function i3(t4) {
              return 1 == t4 ? a2 : r2(--t4);
            }
            var s3 = "tm" === e3.sh.ty ? e3.sh.prop : e3.sh;
            function a2(e4) {
              return t3.p.ix === e4 ? a2.position : t3.r.ix === e4 ? a2.roundness : t3.s.ix === e4 || "Size" === e4 || "ADBE Vector Rect Size" === e4 ? a2.size : void 0;
            }
            return a2.propertyIndex = t3.ix, s3.p.setGroupProperty(i3), s3.s.setGroupProperty(i3), s3.r.setGroupProperty(i3), Object.defineProperties(a2, { position: { get: ExpressionPropertyInterface(s3.p) }, roundness: { get: ExpressionPropertyInterface(s3.r) }, size: { get: ExpressionPropertyInterface(s3.s) }, _name: { value: t3.nm } }), a2.mn = t3.mn, a2;
          }
          function h(t3, e3, r2) {
            var i3 = e3;
            function s3(e4) {
              if (t3.r.ix === e4 || "Round Corners 1" === e4)
                return s3.radius;
            }
            return s3.propertyIndex = t3.ix, i3.rd.setGroupProperty(function(t4) {
              return 1 == t4 ? s3 : r2(--t4);
            }), Object.defineProperties(s3, { radius: { get: ExpressionPropertyInterface(i3.rd) }, _name: { value: t3.nm } }), s3.mn = t3.mn, s3;
          }
          function l(t3, e3, r2) {
            function i3(t4) {
              return 1 == t4 ? a2 : r2(--t4);
            }
            var s3 = e3;
            function a2(e4) {
              return t3.c.ix === e4 || "Copies" === e4 ? a2.copies : t3.o.ix === e4 || "Offset" === e4 ? a2.offset : void 0;
            }
            return a2.propertyIndex = t3.ix, s3.c.setGroupProperty(i3), s3.o.setGroupProperty(i3), Object.defineProperties(a2, { copies: { get: ExpressionPropertyInterface(s3.c) }, offset: { get: ExpressionPropertyInterface(s3.o) }, _name: { value: t3.nm } }), a2.mn = t3.mn, a2;
          }
          function p2(t3, e3, r2) {
            var i3 = e3.sh;
            function s3(t4) {
              if ("Shape" === t4 || "shape" === t4 || "Path" === t4 || "path" === t4 || "ADBE Vector Shape" === t4 || 2 === t4)
                return s3.path;
            }
            return i3.setGroupProperty(function(t4) {
              return 1 == t4 ? s3 : r2(--t4);
            }), Object.defineProperties(s3, { path: { get: function() {
              return i3.k && i3.getValue(), i3;
            } }, shape: { get: function() {
              return i3.k && i3.getValue(), i3;
            } }, _name: { value: t3.nm }, ix: { value: t3.ix }, propertyIndex: { value: t3.ix }, mn: { value: t3.mn } }), s3;
          }
          return function(e3, r2, i3) {
            var s3;
            function a2(t3) {
              if ("number" == typeof t3)
                return s3[t3 - 1];
              for (var e4 = 0, r3 = s3.length; e4 < r3; ) {
                if (s3[e4]._name === t3)
                  return s3[e4];
                e4 += 1;
              }
            }
            return a2.propertyGroup = i3, s3 = t2(e3, r2, a2), a2.numProperties = s3.length, a2;
          };
        }(), TextExpressionInterface = function(t2) {
          var e2;
          function r() {
          }
          return Object.defineProperty(r, "sourceText", { get: function() {
            t2.textProperty.getValue();
            var r2 = t2.textProperty.currentData.t;
            return void 0 !== r2 && (t2.textProperty.currentData.t = void 0, (e2 = new String(r2)).value = r2 || new String(r2)), e2;
          } }), r;
        }, LayerExpressionInterface = /* @__PURE__ */ function() {
          function t2(t3, e3) {
            var r2 = new Matrix();
            if (r2.reset(), this._elem.finalTransform.mProp.applyToMatrix(r2), this._elem.hierarchy && this._elem.hierarchy.length) {
              var i3, s2 = this._elem.hierarchy.length;
              for (i3 = 0; i3 < s2; i3 += 1)
                this._elem.hierarchy[i3].finalTransform.mProp.applyToMatrix(r2);
              return r2.applyToPointArray(t3[0], t3[1], t3[2] || 0);
            }
            return r2.applyToPointArray(t3[0], t3[1], t3[2] || 0);
          }
          function e2(t3, e3) {
            var r2 = new Matrix();
            if (r2.reset(), this._elem.finalTransform.mProp.applyToMatrix(r2), this._elem.hierarchy && this._elem.hierarchy.length) {
              var i3, s2 = this._elem.hierarchy.length;
              for (i3 = 0; i3 < s2; i3 += 1)
                this._elem.hierarchy[i3].finalTransform.mProp.applyToMatrix(r2);
              return r2.inversePoint(t3);
            }
            return r2.inversePoint(t3);
          }
          function r(t3) {
            var e3 = new Matrix();
            if (e3.reset(), this._elem.finalTransform.mProp.applyToMatrix(e3), this._elem.hierarchy && this._elem.hierarchy.length) {
              var r2, i3 = this._elem.hierarchy.length;
              for (r2 = 0; r2 < i3; r2 += 1)
                this._elem.hierarchy[r2].finalTransform.mProp.applyToMatrix(e3);
              return e3.inversePoint(t3);
            }
            return e3.inversePoint(t3);
          }
          function i2() {
            return [1, 1, 1, 1];
          }
          return function(s2) {
            var a;
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
                  return a;
                case 4:
                case "ADBE Effect Parade":
                case "effects":
                case "Effects":
                  return n2.effect;
              }
            }
            n2.toWorld = t2, n2.fromWorld = e2, n2.toComp = t2, n2.fromComp = r, n2.sampleImage = i2, n2.sourceRectAtTime = s2.sourceRectAtTime.bind(s2), n2._elem = s2;
            var o2 = getDescriptor(a = TransformExpressionInterface(s2.finalTransform.mProp), "anchorPoint");
            return Object.defineProperties(n2, { hasParent: { get: function() {
              return s2.hierarchy.length;
            } }, parent: { get: function() {
              return s2.hierarchy[0].layerInterface;
            } }, rotation: getDescriptor(a, "rotation"), scale: getDescriptor(a, "scale"), position: getDescriptor(a, "position"), opacity: getDescriptor(a, "opacity"), anchorPoint: o2, anchor_point: o2, transform: { get: function() {
              return a;
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
            for (var r = 0, i2 = t2.layers.length; r < i2; ) {
              if (t2.layers[r].nm === e3 || t2.layers[r].ind === e3)
                return t2.elements[r].layerInterface;
              r += 1;
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
            var r = ExpressionPropertyInterface(t2.p);
          return Object.defineProperty(e2, "position", { get: function() {
            return t2.p ? r() : [t2.px.v, t2.py.v, t2.pz ? t2.pz.v : 0];
          } }), Object.defineProperty(e2, "xPosition", { get: ExpressionPropertyInterface(t2.px) }), Object.defineProperty(e2, "yPosition", { get: ExpressionPropertyInterface(t2.py) }), Object.defineProperty(e2, "zPosition", { get: ExpressionPropertyInterface(t2.pz) }), Object.defineProperty(e2, "anchorPoint", { get: ExpressionPropertyInterface(t2.a) }), Object.defineProperty(e2, "opacity", { get: ExpressionPropertyInterface(t2.o) }), Object.defineProperty(e2, "skew", { get: ExpressionPropertyInterface(t2.sk) }), Object.defineProperty(e2, "skewAxis", { get: ExpressionPropertyInterface(t2.sa) }), Object.defineProperty(e2, "orientation", { get: ExpressionPropertyInterface(t2.or) }), e2;
        }, ProjectInterface = /* @__PURE__ */ function() {
          function t2(t3) {
            this.compositions.push(t3);
          }
          return function() {
            function e2(t3) {
              for (var e3 = 0, r = this.compositions.length; e3 < r; ) {
                if (this.compositions[e3].data && this.compositions[e3].data.nm === t3)
                  return this.compositions[e3].prepareFrame && this.compositions[e3].data.xt && this.compositions[e3].prepareFrame(this.currentFrame), this.compositions[e3].compInterface;
                e3 += 1;
              }
            }
            return e2.compositions = [], e2.currentFrame = 0, e2.registerComposition = t2, e2;
          };
        }(), EffectsExpressionInterface = /* @__PURE__ */ function() {
          function t2(r, i2, s2, a) {
            var n2, o2 = [], h = r.ef.length;
            for (n2 = 0; n2 < h; n2 += 1)
              5 === r.ef[n2].ty ? o2.push(t2(r.ef[n2], i2.effectElements[n2], i2.effectElements[n2].propertyGroup, a)) : o2.push(e2(i2.effectElements[n2], r.ef[n2].ty, a, l));
            function l(t3) {
              return 1 === t3 ? p2 : s2(t3 - 1);
            }
            var p2 = function(t3) {
              for (var e3 = r.ef, i3 = 0, s3 = e3.length; i3 < s3; ) {
                if (t3 === e3[i3].nm || t3 === e3[i3].mn || t3 === e3[i3].ix)
                  return 5 === e3[i3].ty ? o2[i3] : o2[i3]();
                i3 += 1;
              }
              return o2[0]();
            };
            return p2.propertyGroup = l, "ADBE Color Control" === r.mn && Object.defineProperty(p2, "color", { get: function() {
              return o2[0]();
            } }), Object.defineProperty(p2, "numProperties", { get: function() {
              return r.np;
            } }), p2.active = p2.enabled = 0 !== r.en, p2;
          }
          function e2(t3, e3, r, i2) {
            var s2 = ExpressionPropertyInterface(t3.p);
            return t3.p.setGroupProperty && t3.p.setGroupProperty(i2), function() {
              return 10 === e3 ? r.comp.compInterface(t3.p.v) : s2();
            };
          }
          return { createEffectsInterface: function(e3, r) {
            if (e3.effectsManager) {
              var i2, s2 = [], a = e3.data.ef, n2 = e3.effectsManager.effectElements.length;
              for (i2 = 0; i2 < n2; i2 += 1)
                s2.push(t2(a[i2], e3.effectsManager.effectElements[i2], r, e3));
              return function(t3) {
                for (var r2 = e3.data.ef || [], i3 = 0, a2 = r2.length; i3 < a2; ) {
                  if (t3 === r2[i3].nm || t3 === r2[i3].mn || t3 === r2[i3].ix)
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
          return function(e2, r) {
            var i2, s2 = createSizedArray(e2.viewData.length), a = e2.viewData.length;
            for (i2 = 0; i2 < a; i2 += 1)
              s2[i2] = new t2(e2.viewData[i2], e2.masksProperties[i2]);
            return function(t3) {
              for (i2 = 0; i2 < a; ) {
                if (e2.masksProperties[i2].nm === t3)
                  return s2[i2];
                i2 += 1;
              }
            };
          };
        }(), ExpressionPropertyInterface = /* @__PURE__ */ function() {
          var t2 = { pv: 0, v: 0, mult: 1 }, e2 = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };
          function r(t3, e3, r2) {
            Object.defineProperty(t3, "velocity", { get: function() {
              return e3.getVelocityAtTime(e3.comp.currentFrame);
            } }), t3.numKeys = e3.keyframes ? e3.keyframes.length : 0, t3.key = function(i3) {
              if (t3.numKeys) {
                var s2 = "";
                s2 = "s" in e3.keyframes[i3 - 1] ? e3.keyframes[i3 - 1].s : "e" in e3.keyframes[i3 - 2] ? e3.keyframes[i3 - 2].e : e3.keyframes[i3 - 2].s;
                var a = "unidimensional" === r2 ? new Number(s2) : Object.assign({}, s2);
                return a.time = e3.keyframes[i3 - 1].t / e3.elem.comp.globalData.frameRate, a;
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
              var i3 = 1 / e3.mult, s3 = e3.pv * i3, a = new Number(s3);
              return a.value = s3, r(a, e3, "unidimensional"), function() {
                return e3.k && e3.getValue(), s3 = e3.v * i3, a.value !== s3 && ((a = new Number(s3)).value = s3, r(a, e3, "unidimensional")), a;
              };
            }(s2) : function(t3) {
              t3 && "pv" in t3 || (t3 = e2);
              var i3 = 1 / t3.mult, s3 = t3.pv.length, a = createTypedArray("float32", s3), n2 = createTypedArray("float32", s3);
              return a.value = n2, r(a, t3, "multidimensional"), function() {
                t3.k && t3.getValue();
                for (var e3 = 0; e3 < s3; e3 += 1)
                  a[e3] = n2[e3] = t3.v[e3] * i3;
                return a;
              };
            }(s2) : i2;
          };
        }(), TextExpressionSelectorProp, propertyGetTextProp;
        function SliderEffect(t2, e2, r) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r);
        }
        function AngleEffect(t2, e2, r) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r);
        }
        function ColorEffect(t2, e2, r) {
          this.p = PropertyFactory.getProp(e2, t2.v, 1, 0, r);
        }
        function PointEffect(t2, e2, r) {
          this.p = PropertyFactory.getProp(e2, t2.v, 1, 0, r);
        }
        function LayerIndexEffect(t2, e2, r) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r);
        }
        function MaskIndexEffect(t2, e2, r) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r);
        }
        function CheckboxEffect(t2, e2, r) {
          this.p = PropertyFactory.getProp(e2, t2.v, 0, 0, r);
        }
        function NoValueEffect() {
          this.p = {};
        }
        function EffectsManager() {
        }
        function EffectsManager(t2, e2) {
          var r = t2.ef || [];
          this.effectElements = [];
          var i2, s2, a = r.length;
          for (i2 = 0; i2 < a; i2++)
            s2 = new GroupEffect(r[i2], e2), this.effectElements.push(s2);
        }
        function GroupEffect(t2, e2) {
          this.init(t2, e2);
        }
        TextExpressionSelectorProp = /* @__PURE__ */ function() {
          function t2(t3, e2) {
            return this.textIndex = t3 + 1, this.textTotal = e2, this.v = this.getValue() * this.mult, this.v;
          }
          return function(e2, r) {
            this.pv = 1, this.comp = e2.comp, this.elem = e2, this.mult = 0.01, this.propType = "textSelector", this.textTotal = r.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = true, this.x = true, this.getValue = ExpressionManager.initiateExpression.bind(this)(e2, r, this), this.getMult = t2, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty;
          };
        }(), propertyGetTextProp = TextSelectorProp.getTextSelectorProp, TextSelectorProp.getTextSelectorProp = function(t2, e2, r) {
          return 1 === e2.t ? new TextExpressionSelectorProp(t2, e2, r) : propertyGetTextProp(t2, e2, r);
        }, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function(t2, e2) {
          this.data = t2, this.effectElements = [], this.initDynamicPropertyContainer(e2);
          var r, i2, s2 = this.data.ef.length, a = this.data.ef;
          for (r = 0; r < s2; r += 1) {
            switch (i2 = null, a[r].ty) {
              case 0:
                i2 = new SliderEffect(a[r], e2, this);
                break;
              case 1:
                i2 = new AngleEffect(a[r], e2, this);
                break;
              case 2:
                i2 = new ColorEffect(a[r], e2, this);
                break;
              case 3:
                i2 = new PointEffect(a[r], e2, this);
                break;
              case 4:
              case 7:
                i2 = new CheckboxEffect(a[r], e2, this);
                break;
              case 10:
                i2 = new LayerIndexEffect(a[r], e2, this);
                break;
              case 11:
                i2 = new MaskIndexEffect(a[r], e2, this);
                break;
              case 5:
                i2 = new EffectsManager(a[r], e2, this);
                break;
              default:
                i2 = new NoValueEffect(a[r]);
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
const lottie = /* @__PURE__ */ getDefaultExportFromCjs(miniprogram_dist);
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createHook(ON_SHOW);
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
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.defineComponent = defineComponent;
exports.e = e;
exports.f = f;
exports.fontData = fontData;
exports.index = index;
exports.lottie = lottie;
exports.n = n;
exports.o = o;
exports.onMounted = onMounted;
exports.onShow = onShow;
exports.onUnmounted = onUnmounted;
exports.p = p;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.t = t;
exports.unref = unref;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
