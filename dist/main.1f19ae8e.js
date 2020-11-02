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
})({"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/normalize.css/normalize.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"main.js":[function(require,module,exports) {
"use strict";

require("normalize.css");

// Declatations
var imgContent = document.querySelectorAll(".img-content-hover");
var reserveButton = document.querySelector(".reserve-button");
var aboutPopup = document.querySelector(".content-popup");
var closeAboutPopup = document.querySelector(".close-about-popup");
var filmsList = document.querySelector(".filmslist");
var popupsContainer = document.querySelector(".popups-container");
var films;
var filmsPopups;
var closePupups;
var filmsPopupsContent;
var filmsReserveButtons; // Films request

var baseURL = "https://sampleapis.com/movies/api/classic";

var filmImageTemplate = function filmImageTemplate(film) {
  return "\n              <div class=\"film\">\n                <img class=\"film-image\" src=\"".concat(film.posterURL, "\" alt=\"").concat(film.title, " poster\" />\n              </div>\n");
};

var filmPopupsTemplate = function filmPopupsTemplate(film) {
  return "\n                <div class=\"film-popup\">\n                  <div class=\"film-popup-content\">\n                    <div class=\"close-pupups\">\n                    &#8592; Fermer\n                    </div>\n                    <div class=\"left\">\n                      <img class=\"popup-film-image\" src=\"".concat(film.posterURL, "\" alt=\"").concat(film.posterURL, " poster\" />\n                    </div>\n                    <div class=\"right\">\n                      <h3 class=\"film-title\">").concat(film.title, "</h3>\n                      <p class=\"description\">\n                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,\n                      reiciendis nulla! Hic nemo repudiandae ullam architecto ratione\n                      numquam distinctio a, suscipit quam eius modi voluptate cumque\n                      iste cupiditate ex dolor.\n                      </p>\n                      <button class=\"film-reserve-button\">Reserver</button>\n                    </div>\n                  </div>\n                </div>\n");
};

var filmReservationTemplate = function filmReservationTemplate(film) {
  return "\n  <div class=\"film-content-reserve\">\n    <h3>Je reserve ma place !</h3>\n    <select name=\"\" id=\"\">\n      <option value=\"\">Date 1</option>\n      <option value=\"\">Date 2</option>\n      <option value=\"\">Date 3</option>\n    </select>\n  </div>\n";
};

fetch(baseURL).then(function (resp) {
  return resp.json();
}).then(function (data) {
  handleFilms(data);
});

var handleFilms = function handleFilms(data) {
  // Get only 12
  for (var i = 9; i < 21; i++) {
    // Start at 9 because of some missing API images between 1 and 9
    filmsList.innerHTML += filmImageTemplate(data[i]);
    popupsContainer.innerHTML += filmPopupsTemplate(data[i]);
  }

  films = document.querySelectorAll(".film");
  filmsPopups = document.querySelectorAll(".film-popup");
  filmsPopupsContent = document.querySelectorAll(".film-popup-content");
  closePupups = document.querySelectorAll(".close-pupups");
  filmsReserveButtons = document.querySelectorAll(".film-reserve-button");
  films.forEach(function (film, index) {
    film.addEventListener("click", function () {
      filmsPopups[index].classList.add("active");
      setTimeout(function () {
        filmsPopups[index].style.opacity = 1;
        filmsPopupsContent[index].classList.add("active");
      }, 100);
    });
  }); //filmsReserveButtons.forEach("click", () => {});

  filmsPopups.forEach(function (sideOfPopup, index) {
    sideOfPopup.addEventListener("click", function (event) {
      console.log(event.target);

      if (event.target.classList.contains("film-popup")) {
        filmsPopupsContent[index].classList.remove("active");
        setTimeout(function () {
          filmsPopups[index].style.opacity = 0;
        }, 20);
        setTimeout(function () {
          filmsPopups[index].classList.remove("active");
        }, 400);
      }
    });
  });
  closePupups.forEach(function (closeButton, index) {
    closeButton.addEventListener("click", function () {
      filmsPopupsContent[index].classList.remove("active");
      setTimeout(function () {
        filmsPopups[index].style.opacity = 0;
      }, 20);
      setTimeout(function () {
        filmsPopups[index].classList.remove("active");
      }, 400);
    });
  });
}; // Hover effect for images


var showImgContent = function showImgContent(event) {
  var x;
  var y;

  for (var i = 0; i < imgContent.length; i++) {
    x = event.pageX;
    y = event.pageY;
    imgContent[i].style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, 0)");
  }
};

document.addEventListener("mousemove", showImgContent); // Popup navigation animation

var handleReserveButton = function handleReserveButton(event) {
  event.preventDefault();
  aboutPopup.classList.add("active");
};

var handleClosingPopup = function handleClosingPopup(event) {
  event.preventDefault();
  aboutPopup.classList.remove("active");
};

reserveButton.addEventListener("click", handleReserveButton);
closeAboutPopup.addEventListener("click", handleClosingPopup);
},{"normalize.css":"node_modules/normalize.css/normalize.css"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62651" + '/');

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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map