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
})({"script.js":[function(require,module,exports) {
"use strict";

var account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2,
  // %
  pin: 1111,
  movementsDates: ["2019-11-18T21:31:17.178Z", "2019-12-23T07:42:02.383Z", "2020-01-28T09:15:04.904Z", "2020-04-01T10:17:24.185Z", "2020-05-08T14:11:59.604Z", "2020-07-26T17:01:17.194Z", "2020-07-28T23:36:17.929Z", "2020-08-01T10:51:36.790Z"],
  currency: "EUR",
  locale: "pt-PT" // de-DE
};

var account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: ["2019-11-01T13:15:33.035Z", "2019-11-30T09:48:16.867Z", "2019-12-25T06:04:23.907Z", "2020-01-25T14:18:46.235Z", "2020-02-05T16:33:06.386Z", "2020-04-10T14:43:26.374Z", "2020-06-25T18:49:59.371Z", "2020-07-26T12:01:20.894Z"],
  currency: "USD",
  locale: "en-US"
};
var accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
var labelWelcome = document.querySelector(".welcome");
var labelDate = document.querySelector(".date");
var labelBalance = document.querySelector(".balance__value");
var labelSumIn = document.querySelector(".summary__value--in");
var labelSumOut = document.querySelector(".summary__value--out");
var labelSumInterest = document.querySelector(".summary__value--interest");
var labelTimer = document.querySelector(".timer");
var containerApp = document.querySelector(".app");
var containerMovements = document.querySelector(".movements");
var btnLogin = document.querySelector(".login__btn");
var btnTransfer = document.querySelector(".form__btn--transfer");
var btnLoan = document.querySelector(".form__btn--loan");
var btnClose = document.querySelector(".form__btn--close");
var btnSort = document.querySelector(".btn--sort");
var inputLoginUsername = document.querySelector(".login__input--user");
var inputLoginPin = document.querySelector(".login__input--pin");
var inputTransferTo = document.querySelector(".form__input--to");
var inputTransferAmount = document.querySelector(".form__input--amount");
var inputLoanAmount = document.querySelector(".form__input--loan-amount");
var inputCloseUsername = document.querySelector(".form__input--user");
var inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

var formatMovementDate = function formatMovementDate(date, locale) {
  var calcDaysPassed = function calcDaysPassed(date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };
  var daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return "".concat(daysPassed, " days ago");
  return new Intl.DateTimeFormat(locale).format(date);
};
var formatCur = function formatCur(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(value);
};
var displayMovements = function displayMovements(acc) {
  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  containerMovements.innerHTML = "";
  var movs = sort ? acc.movements.slice().sort(function (a, b) {
    return a - b;
  }) : acc.movements;
  movs.forEach(function (mov, i) {
    var type = mov > 0 ? "deposit" : "withdrawal";
    var date = new Date(acc.movementsDates[i]);
    var displayDate = formatMovementDate(date, acc.locale);
    var formattedMov = formatCur(mov, acc.locale, acc.currency);
    var html = "\n      <div class=\"movements__row\">\n        <div class=\"movements__type movements__type--".concat(type, "\">").concat(i + 1, " ").concat(type, "</div>\n        <div class=\"movements__date\">").concat(displayDate, "</div>\n        <div class=\"movements__value\">").concat(formattedMov, "</div>\n      </div>\n    ");
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
var calcDisplayBalance = function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
var calcDisplaySummary = function calcDisplaySummary(acc) {
  var incomes = acc.movements.filter(function (mov) {
    return mov > 0;
  }).reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  var out = acc.movements.filter(function (mov) {
    return mov < 0;
  }).reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
  var interest = acc.movements.filter(function (mov) {
    return mov > 0;
  }).map(function (deposit) {
    return deposit * acc.interestRate / 100;
  }).filter(function (int, i, arr) {
    // console.log(arr);
    return int >= 1;
  }).reduce(function (acc, int) {
    return acc + int;
  }, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};
var createUsernames = function createUsernames(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(" ").map(function (name) {
      return name[0];
    }).join("");
  });
};
createUsernames(accounts);
var updateUI = function updateUI(acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
var startLogOutTimer = function startLogOutTimer() {
  var tick = function tick() {
    var min = String(Math.trunc(time / 60)).padStart(2, 0);
    var sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = "".concat(min, ":").concat(sec);

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  var time = 120;

  // Call the timer every second
  tick();
  var timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
var currentAccount, timer;

// LOGIN

btnLogin.addEventListener("click", function (e) {
  var _currentAccount;
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });
  console.log(currentAccount);
  if (((_currentAccount = currentAccount) === null || _currentAccount === void 0 ? void 0 : _currentAccount.pin) === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = "Welcome back, ".concat(currentAccount.owner.split(" ")[0]);
    containerApp.style.opacity = 100;

    // Create current date and time
    var now = new Date();
    var options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric"
      // weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  var amount = +inputTransferAmount.value;
  var receiverAcc = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });
  inputTransferAmount.value = inputTransferTo.value = "";
  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && (receiverAcc === null || receiverAcc === void 0 ? void 0 : receiverAcc.username) !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  var amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(function (mov) {
    return mov >= amount * 0.1;
  })) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
    var index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});
var sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34039" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map