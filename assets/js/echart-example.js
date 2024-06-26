"use strict";
var docReady = function (e) {
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", e)
      : setTimeout(e, 1);
  },
  resize = function (e) {
    return window.addEventListener("resize", e);
  },
  isIterableArray = function (e) {
    return Array.isArray(e) && !!e.length;
  },
  camelize = function (e) {
    e = e.replace(/[-_\s.]+(.)?/g, function (e, t) {
      return t ? t.toUpperCase() : "";
    });
    return "".concat(e.substr(0, 1).toLowerCase()).concat(e.substr(1));
  },
  getData = function (t, o) {
    try {
      return JSON.parse(t.dataset[camelize(o)]);
    } catch (e) {
      return t.dataset[camelize(o)];
    }
  },
  hexToRgb = function (e) {
    (e = 0 === e.indexOf("#") ? e.substring(1) : e),
      (e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, o, r) {
          return t + t + o + o + r + r;
        })
      ));
    return e
      ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
      : null;
  },
  rgbaColor = function () {
    var e =
        0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#fff",
      t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0.5;
    return "rgba(".concat(hexToRgb(e), ", ").concat(t, ")");
  },
  getColor = function (e) {
    var t =
      1 < arguments.length && void 0 !== arguments[1]
        ? arguments[1]
        : document.documentElement;
    return getComputedStyle(t)
      .getPropertyValue("--brainwaveio-".concat(e))
      .trim();
  },
  getColors = function (e) {
    return {
      primary: getColor("primary", e),
      secondary: getColor("secondary", e),
      success: getColor("success", e),
      info: getColor("info", e),
      warning: getColor("warning", e),
      danger: getColor("danger", e),
      light: getColor("light", e),
      dark: getColor("dark", e),
      white: getColor("white", e),
      black: getColor("black", e),
      emphasis: getColor("emphasis-color", e),
    };
  },
  getSubtleColors = function (e) {
    return {
      primary: getColor("primary-bg-subtle", e),
      secondary: getColor("secondary-bg-subtle", e),
      success: getColor("success-bg-subtle", e),
      info: getColor("info-bg-subtle", e),
      warning: getColor("warning-bg-subtle", e),
      danger: getColor("danger-bg-subtle", e),
      light: getColor("light-bg-subtle", e),
      dark: getColor("dark-bg-subtle", e),
    };
  },
  getGrays = function (e) {
    return {
      100: getColor("gray-100", e),
      200: getColor("gray-200", e),
      300: getColor("gray-300", e),
      400: getColor("gray-400", e),
      500: getColor("gray-500", e),
      600: getColor("gray-600", e),
      700: getColor("gray-700", e),
      800: getColor("gray-800", e),
      900: getColor("gray-900", e),
      1e3: getColor("gray-1000", e),
      1100: getColor("gray-1100", e),
    };
  },
  hasClass = function (e, t) {
    return e.classList.value.includes(t);
  },
  addClass = function (e, t) {
    e.classList.add(t);
  },
  removeClass = function (e, t) {
    e.classList.remove(t);
  },
  getOffset = function (e) {
    var e = e.getBoundingClientRect(),
      t = window.pageXOffset || document.documentElement.scrollLeft,
      o = window.pageYOffset || document.documentElement.scrollTop;
    return { top: e.top + o, left: e.left + t };
  };
function isScrolledIntoView(e) {
  var e = e.getBoundingClientRect(),
    t = window.innerHeight || document.documentElement.clientHeight,
    o = window.innerWidth || document.documentElement.clientWidth,
    t = e.top <= t && 0 <= e.top + e.height,
    o = e.left <= o && 0 <= e.left + e.width;
  return t && o;
}
var breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1540 },
  getBreakpoint = function (e) {
    var t,
      e = e && e.classList.value;
    return (t = e
      ? breakpoints[
          e
            .split(" ")
            .filter(function (e) {
              return e.includes("navbar-expand-");
            })
            .pop()
            .split("-")
            .pop()
        ]
      : t);
  },
  getSystemTheme = function () {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  },
  setCookie = function (e, t, o) {
    var r = new Date();
    r.setTime(r.getTime() + o),
      (document.cookie = ""
        .concat(e, "=")
        .concat(t, ";expires=")
        .concat(r.toUTCString()));
  },
  getCookie = function (e) {
    e = document.cookie.match("(^|;) ?".concat(e, "=([^;]*)(;|$)"));
    return e && e[2];
  },
  settings = {
    tinymce: { theme: "oxide" },
    chart: { borderColor: "rgba(55, 111, 147,0.8)" },
  },
  getItemFromStore = function (t, o) {
    var r =
      2 < arguments.length && void 0 !== arguments[2]
        ? arguments[2]
        : localStorage;
    try {
      return JSON.parse(r.getItem(t)) || o;
    } catch (e) {
      return r.getItem(t) || o;
    }
  },
  setItemToStore = function (e, t) {
    return (
      2 < arguments.length && void 0 !== arguments[2]
        ? arguments[2]
        : localStorage
    ).setItem(e, t);
  },
  getStoreSpace = function () {
    var e =
      0 < arguments.length && void 0 !== arguments[0]
        ? arguments[0]
        : localStorage;
    return parseFloat(
      (escape(encodeURIComponent(JSON.stringify(e))).length / 1048576).toFixed(
        2
      )
    );
  },
  getDates = function (o, e) {
    var r =
      2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 864e5;
    return Array.from({ length: 1 + (e - o) / r }, function (e, t) {
      return new Date(o.valueOf() + r * t);
    });
  },
  getPastDates = function (e) {
    var t;
    switch (e) {
      case "week":
        t = 7;
        break;
      case "month":
        t = 30;
        break;
      case "year":
        t = 365;
        break;
      default:
        t = e;
    }
    var o = new Date(),
      r = o,
      o = new Date(new Date().setDate(o.getDate() - (t - 1)));
    return getDates(o, r);
  },
  getRandomNumber = function (e, t) {
    return Math.floor(Math.random() * (t - e) + e);
  },
  utils = {
    docReady: docReady,
    breakpoints: breakpoints,
    resize: resize,
    isIterableArray: isIterableArray,
    camelize: camelize,
    getData: getData,
    hasClass: hasClass,
    addClass: addClass,
    hexToRgb: hexToRgb,
    rgbaColor: rgbaColor,
    getColor: getColor,
    getColors: getColors,
    getSubtleColors: getSubtleColors,
    getGrays: getGrays,
    getOffset: getOffset,
    isScrolledIntoView: isScrolledIntoView,
    getBreakpoint: getBreakpoint,
    setCookie: setCookie,
    getCookie: getCookie,
    settings: settings,
    getItemFromStore: getItemFromStore,
    setItemToStore: setItemToStore,
    getStoreSpace: getStoreSpace,
    getDates: getDates,
    getPastDates: getPastDates,
    getRandomNumber: getRandomNumber,
    removeClass: removeClass,
    getSystemTheme: getSystemTheme,
  };
