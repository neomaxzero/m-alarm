// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/cumbia/cumbia.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.debug = void 0;
var g = "0.0.11";

var l = "\u{1F3BC} Cumbia:",
    E = t => console.error(`${l}`, t),
    L = t => console.warn(`${l}`, t),
    v = t => console.info(`${l}`, t),
    a = {
  error: E,
  warn: L,
  info: v
};

var A = t => {
  let o = "data-value",
      e = {};
  return t.querySelectorAll(`[${o}]`).forEach(n => {
    let r = n.getAttribute(o) || "default_name",
        i = n.innerHTML;
    n.tagName === "INPUT" && (i = n.value), e[r] = {
      el: n,
      value: i
    };
  }), e;
},
    p = A;

var M = (t, o, e, {
  prevent: s
}) => n => {
  let r = o[e];
  if (s && n.preventDefault(), !r) return a.warn(`Action -->"${e}"<-- not defined in component.`);
  let i = p(t);
  r(i);
},
    c = M;

var H = (t, o) => {
  let e = "data-action";
  t.querySelectorAll(`[${e}]`).forEach(n => {
    let r = n.getAttribute(e) || "default_action_name",
        i = n.getAttribute("type");

    if (r === "submit" || i === "submit") {
      if (t.tagName !== "FORM") return a.error("Trying to handle submit handler outside of form");
      t.addEventListener("submit", c(t, o, r, {
        prevent: !0
      }));
      return;
    }

    if (n.tagName === "INPUT") {
      n.addEventListener("change", c(t, o, r, {
        prevent: !1
      }));
      return;
    }

    n.addEventListener("click", c(t, o, r, {
      prevent: !1
    }));
  });
},
    y = H;

var V = (t, o) => {
  let e = "data-action-key";
  t.querySelectorAll(`[${e}]`).forEach(n => {
    let r = n.getAttribute(e) || "default_action_name";
    n.addEventListener("keyup", c(t, o, r, {
      prevent: !1
    }));
  });
},
    b = V;

var k = (t, o) => {
  let e = p(o);
  t.init && t.init(e);
},
    T = k;

var u = new Map(),
    w = (t, o) => {
  let e = u.get(t) || [];
  e.push(o), u.set(t, e);
},
    F = (t, o) => {
  (u.get(t) || []).forEach(s => {
    s ? s(o) : console.warn("Topic not found");
  });
},
    d = {
  on: w,
  emit: F
};

var I = (t, o, e) => {
  let s = e.trim();
  if (!o.has(s)) return a.warn(`Component -->"${s}"<-- was not found.`);
  let n = o.get(s);
  if (!n) return a.error("Undefined component");
  let r = n({
    el: t,
    on: d.on,
    emit: d.emit
  });
  T(r, t), (r == null ? void 0 : r.actions) && (y(t, r.actions), b(t, r.actions));
},
    C = I;

var f = new Map(),
    m = new Map(),
    h = "data-component",
    $ = ",",
    O = t => {
  document.querySelectorAll(`[${h}]`).forEach(e => {
    if (f.has(e)) return;
    f.set(e, !0), (e.getAttribute(h) || "").split($).forEach(r => C(e, m, r));
  }), (t == null ? void 0 : t.globalInitialisers) && t.globalInitialisers.length && t.globalInitialisers.forEach(e => {
    let s = [...f.keys()];
    e(s);
  });
},
    x = O;

var S = `
    * {
        transition: outline 1s;
    }
        .debugIcon {
            position: fixed;
            top: 10px;
            right: 10px;
            height: 25px;
            cursor: pointer;
            background-image: url("https://github.com/neomaxzero/cumbia/blob/master/assets/logomin.png?raw=true");
            background-size: contain;
            background-repeat: no-repeat;
            padding-left: 25px;
            padding-top: 2px;
            color: #888;
        }

        .signElement {
            outline: 3px solid deeppink;
        }
`,
    P = t => {
  let o = document.createElement("style");
  o.innerHTML = S, document.head.appendChild(o);
  let e = document.createElement("div");
  e.classList.add("debugIcon"), e.innerHTML = "DEBUG", document.body.appendChild(e), e.addEventListener("click", () => {
    t.forEach(s => {
      s.classList.add("signElement"), setTimeout(() => {
        s.classList.remove("signElement");
      }, 3e3);
    });
  });
},
    _ = P;

exports.debug = _;

var N = (t, o) => {
  if (!Object.keys(t).length) return a.error("No components passed");
  Object.keys(t).forEach(e => {
    let s = t[e];
    if (!e) return a.error("Component name not defined, please give a name to your component");
    m.has(e) && a.warn(`Name collision detected. ${e} was previously defined`), m.set(e, s);
  }), document.addEventListener("DOMContentLoaded", function () {
    a.info(`Initializing ${g}`), x(o);
  });
};

var ut = N;
exports.default = ut;
},{}],"src/alarm.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cumbia_1 = __importDefault(require("cumbia"));

var alarm = function alarm(_a) {
  var on = _a.on,
      el = _a.el;
  var alarmInterval;
  var switcher = false;

  var init = function init() {
    on("START_TIMER", function () {
      el.classList.add("ring");
    });
    on("RING", function () {
      console.log("reing");
      alarmInterval = setInterval(function () {
        console.log("wott");

        if (switcher) {
          el.classList.add("ring");
          el.classList.remove("ring-2");
        } else {
          el.classList.add("ring-2");
          el.classList.remove("ring");
        }

        switcher = !switcher;
      }, 500);
    });
    on("STOP_TIMER", function () {
      clearInterval(alarmInterval);
      switcher = false;
    });
  };

  return {
    init: init
  };
};

(0, cumbia_1.default)({
  alarm: alarm
}, {
  globalInitialisers: []
});
},{"cumbia":"node_modules/cumbia/cumbia.js"}],"src/alarmConfig.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cumbia_1 = __importDefault(require("cumbia"));

var alarmConfig = function alarmConfig(_a) {
  var emit = _a.emit;

  var emitValue = function emitValue(val) {
    return emit("SET_TIMER", val);
  };

  var actions = {
    set15: function set15() {
      return emitValue(900000);
    },
    set10: function set10() {
      return emitValue(600000);
    },
    set5: function set5() {
      return emitValue(300000);
    },
    set3: function set3() {
      return emitValue(180000);
    },
    set1: function set1() {
      return emitValue(60000);
    }
  };
  return {
    actions: actions
  };
};

(0, cumbia_1.default)({
  alarmConfig: alarmConfig
}, {
  globalInitialisers: []
});
},{"cumbia":"node_modules/cumbia/cumbia.js"}],"src/alarmControl.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cumbia_1 = __importDefault(require("cumbia"));

var alarmControl = function alarmControl(_a) {
  var emit = _a.emit,
      on = _a.on;
  var started = false;
  var mainTimer;

  var init = function init(_a) {
    var qty = _a.qty,
        start = _a.start;
    on("SET_TIMER", function (value) {
      qty.el.value = value;
    });
    on("START_TIMER", function () {
      start.el.textContent = "Stop";
      mainTimer = setTimeout(function () {
        emit("RING");
      }, parseInt(qty.value, 10));
      started = true;
    });
    on("STOP_TIMER", function () {
      start.el.textContent = "Start";
      started = false;
      mainTimer && clearTimeout(mainTimer);
    });
  };

  var actions = {
    start: function start() {
      if (started) {
        emit("STOP_TIMER");
      } else {
        emit("START_TIMER");
      }
    }
  };
  return {
    init: init,
    actions: actions
  };
};

(0, cumbia_1.default)({
  alarmControl: alarmControl
}, {
  globalInitialisers: []
});
},{"cumbia":"node_modules/cumbia/cumbia.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./alarm");

require("./alarmConfig");

require("./alarmControl");
},{"./alarm":"src/alarm.ts","./alarmConfig":"src/alarmConfig.ts","./alarmControl":"src/alarmControl.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63292" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map