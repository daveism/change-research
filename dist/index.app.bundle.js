/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d32f0d62d8f2c628dd39";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content-blocks/block-study-aggreement.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-aggreement.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-agreement-all\" class=\"h-auto w-100\">\n\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"study-agreement-title\" class=\"step-title w-100 d-flex mt-3\">Study Participation Agreement</div>\n\n  <div id=\"study-agreement\" class=\"step-directions w-100 d-flex mt-1\">\n    <div class=\"h-100\">\n      <div id=\"study-agreement-directions\" class=\"step-directions\">\n        Thank you for taking part in this study. By using the following website,\n        you agree to participate in a study about how people use web-presented maps.\n        We will collect information about your interactions with this site but not any\n        personally identifiable information. The only people with access to the study\n        data are the researchers. However, the data will be summarized, shared, and\n        disseminated in talks, blogs, and possibly research journals. There is no\n        cost to you to participate in this research study, and you will not be\n        compensated. There are no known risks in the following tasks.\n        <br /><br />\n        By agreeing to this, you have acknowledged that you have read the\n        contents of this consent, are an adult over 18 years of age, and\n        you are giving consent to participate in this study.\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-5\">Do you want to participate?</div>\n\n  <span class=\"mt-3 h-auto d-flex\">\n    <button id=\"aggree-button\" type=\"button\" class=\"btn btn-light btn-aggreement w-20 align-self-end mr-3\" >\n      <i class=\"fas fa-check\"></i>\n      Yes\n    </button>\n    <button id=\"diaggree-button\" type=\"button\" class=\"btn btn-xlight btn-aggreement w-20 align-self-end\" >\n      <i class=\"fas fa-times-circle\"></i>\n      No\n    </button>\n  </span>\n\n  <!-- <div id=\"aggree-disaggre-wrapper\" class=\"mt-3\">\n    <div id=\"study-agreement-sub\" class=\"step-directions align-self-center pb-4 py-2\">Do you want to participate?</div>\n    <button id=\"aggree-button\" type=\"button\" class=\"btn btn-light btn-aggreement w-20 align-self-end mr-3\" >\n      <i class=\"fas fa-check\"></i>\n      Yes\n    </button>\n    <button id=\"diaggree-button\" type=\"button\" class=\"btn btn-xlight btn-aggreement w-20 align-self-end\" >\n      <i class=\"fas fa-times-circle\"></i>\n      No\n    </button>\n  </div> -->\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-completed.html":
/*!*******************************************************!*\
  !*** ./src/content-blocks/block-study-completed.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-end\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100\">Whats Changed?</div>\n  <div id=\"step1-directions\" class=\"step-directions w-100\">\n    Thanks for participating!\n  </div>\n\n  <!-- <div id=\"map-holder-end\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-end\" class=\"row h-100 justify-content-center\">\n      <div id='compare-end-wrapper'>\n        <div id=\"map-c-enda\" class=\"my-3 mx-3\"></div>\n        <div id=\"map-c-endb\" class=\"my-3 mx-3\"></div>\n      </div>\n    </div>\n  </div>\n   -->\n  <div id=\"map-holder-end\" class=\"start-map w-100 d-flex mt-3\">\n\n      <div class=\"row w-100 ml-3\">\n        <div class=\"col-12 px-0 w-100\" >\n\n      <div class=\"row w-100\">\n        <div class=\"col-12 col-md-12 px-0 py-1 w-100\" >\n          Your answer\n        </div>\n        <div id=\"map-enda\" class=\"col-12 col-md-6 px-0 map-enda endmap\"></div>\n      </div>\n\n      <div class=\"row mt-4 w-100\">\n        <div class=\"col-12 px-0 py-1 w-100\" >\n          Our answer\n        </div>\n        <div id=\"map-endb\" class=\"col-12 col-md-6 px-0 map-endb endmap\"></div>\n      </div>\n\n    </div>\n  </div>\n\n  </div>\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-dissaggree.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-dissaggree.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-dissaggree\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Thanks anyway!</div>\n\n  <div id=\"study-dissaggree-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Thank you for considering being a participant. If you change your\n    mind you can always review the&nbsp;<a href=\"\" > aggrement </a>&nbsp;again!\n  </div>\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-1.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-1.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-0\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    The map below contains two images that are different. The two images\n    will turn on and off at a regular interval. Click on any box where you\n    believe the two images are different. The boxes you click on will change\n    orange and will become your answers when you click submit. Clicking on an\n    orange box will remove it from your selection.\n  </div>\n\n  <div id=\"map-holder-1\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-1\" class=\"row h-100 justify-content-center\">\n      <div id=\"map-1\" class=\"my-3 mx-3\"></div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-3\">\n    <button id=\"submit-button-to-sus-0\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-2.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-2.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-1\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    The two maps below contain images that are different. Click on any boxes where\n    you believe the two images are different. The boxes you click on will change\n    orange and will become your answers when you click submit. Clicking on an\n    orange box will remove it from your selection.\n  </div>\n\n  <div id=\"map-holder-2\" class=\"start-map w-100 d-flex ml-3 mt-3\">\n    <div id=\"map-inner-holder-2\" class=\"row h-100 justify-content-center\">\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2a\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2a\"></div>\n      </div>\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2b\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2b\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-3\">\n    <button id=\"submit-button-to-sus-1\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-3.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-3.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-2\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    The map below contains two images that are different. Drag the vertical bar side-to-side\n    to reveal the images. Click on any box where you believe the two images are different. The\n    boxes you click on will change orange and will become your answers when you click\n    submit. Clicking on an orange box will remove it from your selection.\n  </div>\n\n  <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n      <div id='compare-wrapper'>\n        <div id=\"map-3a\" class=\"mx-3\"></div>\n        <div id=\"map-3b\" class=\"mx-3\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit you selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-3\">\n    <button id=\"submit-button-to-sus-2\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-sus.html":
/*!*************************************************!*\
  !*** ./src/content-blocks/block-study-sus.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-sus\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 3 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Review the map and the animation of the two images. Then click on any\n    box where you believe change occurred. 1 indicates you strongly disagree\n    and 5 indicates you strongly aggree.\n  </div>\n\n  <div class=\"pl-1 pt-3 pb-3\">\n    &nbsp;\n  </div>\n\n  <!-- <div class=\"row w-100 p-3 m-3\">\n\n    <div class=\"sus-describer-lead col-6\">\n      &nbsp\n    </div>\n\n    <div class=\"sus-describer-agree text-left col-3\">\n        Strongly disagree\n    </div>\n\n    <div class=\"sus-describer-disagree text-right col-3\">\n        Strongly agree\n    </div>\n\n  </div> -->\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        1.&nbsp;&nbsp;I think that I would like to use this site frequently\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-1\" class=\"btn-group btn-sus mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q1-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q1-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q1-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q1-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q1-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        2.&nbsp;&nbsp;I found the site unnecessarily complex\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-2\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q2-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q2-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q2-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q2-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q2-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        3.&nbsp;&nbsp;I thought the site was easy to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-3\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q3-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q3-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q3-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q3-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q3-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        4.&nbsp;&nbsp;I think that I would need the support of a technical person to be able to use this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-4\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q4-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q4-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q4-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q4-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q4-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        5.&nbsp;&nbsp;I found the various functions in this site were well integrated\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-5\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q5-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q5-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q5-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q5-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q5-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        6.&nbsp;&nbsp;I thought there was too much inconsistency in this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-6\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q6-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q6-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q6-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q6-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q6-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        7.&nbsp;&nbsp;I would imagine that most people would learn to use this site very quickly\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-7\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q7-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-replace-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-replace-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-replace-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-replace-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        8.&nbsp;&nbsp;I found the site very cumbersome to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-8\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q8-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q8-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q8-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q8-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q8-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        9.&nbsp;&nbsp;I felt very confident using the site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-9\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q9-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q9-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q9-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q9-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q9-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        10.&nbsp;&nbsp;I needed to learn a lot of things before I could get going with this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-10\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q10-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q10-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q10-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q10-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q10-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-100 d-flex mt-4\">\n    <div class=\"pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-7\">\n      &nbsp;\n    </div>\n    <div class=\"pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-5\">\n      <button id=\"submit-button-to-end\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n        Submit and finish\n      </button>\n    </div>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/scripts/handlers.js":
/*!*********************************!*\
  !*** ./src/scripts/handlers.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Handlers = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _recordStudyData = __webpack_require__(/*! ./record-study-data */ "./src/scripts/record-study-data.js");

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

var _utility = __webpack_require__(/*! ./utility */ "./src/scripts/utility.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var recordStudyData = new _recordStudyData.RecordStudyData();
var store = new _store.Store({});
var utility = new _utility.Utility();

var Handlers = exports.Handlers = function () {
  function Handlers() {
    _classCallCheck(this, Handlers);

    this.displayNoneClass = 'd-none';
    this.selectedClass = 'selected';

    // study aggreement
    this.studyAggreementElementsAdd = ['study-progress-map-'];
    this.studyAggreementElementsRemove = ['block-study-aggreement-holder'];

    // study disaggreement
    this.studyDisaggreementElementsAdd = ['study-dissaggree'];
    this.studyDisaggreementElementsRemove = ['block-study-aggreement-holder'];

    // study questions map change
    this.studyQuestionElementsAdd = ['study-progress-sus', 'block-study-sus-holder'];
    this.studyQuestion = store.getStateItem('study-question');
    this.studyQuestionElementsRemove = ['study-progress-map-' + this.studyQuestion, 'map-action-holder'];

    // SUS scores
    this.studySUSElementsAdd = ['study-progress-end', 'block-study-completed-holder'];
    this.studySUSElementsRemove = ['study-progress-sus', 'block-study-sus-holder'];
    this.susStorageKeys = ['sus-question-1', 'sus-question-2', 'sus-question-3', 'sus-question-4', 'sus-question-5', 'sus-question-6', 'sus-question-7', 'sus-question-8', 'sus-question-9', 'sus-question-10'];
  }

  // adds handler for submitting change data on map
  //
  // @param elementID - HTML element ID
  // @return null


  _createClass(Handlers, [{
    key: 'addHandlerSubmitChangeClick',
    value: function addHandlerSubmitChangeClick(elementID) {
      var _this = this;

      var element = document.getElementById(elementID);

      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          // add elements to UI
          _this.studyQuestionElementsAdd.forEach(function (elementUIID) {
            document.getElementById(elementUIID).classList.remove(_this.displayNoneClass);
          });

          //  remove elements from UI
          _this.studyQuestionElementsRemove.forEach(function (elementUIID) {
            // only add display none class if the class does not exsist
            // ensure that duplicate classes are not added
            if (!document.getElementById(elementUIID).classList.contains(_this.displayNoneClass)) {
              document.getElementById(elementUIID).classList.add(_this.displayNoneClass);
            }
          });

          var gridName = 'grid-box-';
          var gridIterations = 42;
          utility.setAPIForGroup(gridName, gridIterations);
        });
      }
    }

    // adds handler for submitting sus score
    //
    // @param elementID - HTML element ID
    // @return null

  }, {
    key: 'addHandlerSubmitSUSClick',
    value: function addHandlerSubmitSUSClick(elementID) {
      var _this2 = this;

      var element = document.getElementById(elementID);
      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          // add elements to UI
          _this2.studySUSElementsAdd.forEach(function (elementUIID) {
            document.getElementById(elementUIID).classList.remove(_this2.displayNoneClass);
          });

          //  remove elements from UI
          _this2.studySUSElementsRemove.forEach(function (elementUIID) {
            // only add display none class if the class does not exsist
            // ensure that duplicate classes are not added
            if (!document.getElementById(elementUIID).classList.contains(_this2.displayNoneClass)) {
              document.getElementById(elementUIID).classList.add(_this2.displayNoneClass);
            }
          });

          var susValueArray = [];
          _this2.susStorageKeys.forEach(function (key) {
            var questionAnswer = store.getStateItem(key);
            susValueArray.push({ key: key, questionAnswer: questionAnswer });
          });
          var datestamp = new Date().toISOString();
          utility.triggerEvent('sus-clicked', 'sus-clicked');

          store.setStateItem('susanswers', susValueArray);
          store.setStateItem('susanswers-time', datestamp);

          Handlers.recordAggreed();
        });
      }

      return null;
    }
  }, {
    key: 'addHandlerAgreeClick',


    // adds handler for aggreeing to do study
    //
    // @param null
    // @return null
    value: function addHandlerAgreeClick(elementID) {
      var _this3 = this;

      var element = document.getElementById(elementID);
      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          var studyVersion = store.getStateItem('study-question');
          var agreementTimeStamp = new Date().toISOString();

          // add elements to UI
          _this3.studyAggreementElementsAdd.forEach(function (elementUIID) {
            document.getElementById('' + elementUIID + studyVersion).classList.remove(_this3.displayNoneClass);
          });

          //  remove elements from UI
          _this3.studyAggreementElementsRemove.forEach(function (elementUIID) {
            // only add display none class if the class does not exsist
            // ensure that duplicate classes are not added
            if (!document.getElementById(elementUIID).classList.contains(_this3.displayNoneClass)) {
              document.getElementById(elementUIID).classList.add(_this3.displayNoneClass);
            }
          });

          utility.triggerEvent('aggree-clicked', 'handleAgreeClick');
          store.setStateItem('study-agreement', true);
          store.setStateItem('study-agreement-time', agreementTimeStamp);
        });
      }
      return null;
    }

    // adds handler for DISaggreeing to do study
    //
    // @param null
    // @return null

  }, {
    key: 'addHandlerDisagreeClick',
    value: function addHandlerDisagreeClick(elementID) {
      var _this4 = this;

      var element = document.getElementById(elementID);
      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          var agreementTimeStamp = new Date().toISOString();
          // add elements to UI
          _this4.studyDisaggreementElementsAdd.forEach(function (elementUIID) {
            document.getElementById(elementUIID).classList.remove(_this4.displayNoneClass);
          });

          //  remove elements from UI
          _this4.studyDisaggreementElementsRemove.forEach(function (elementUIID) {
            // only add display none class if the class does not exsist
            // ensure that duplicate classes are not added
            if (!document.getElementById(elementUIID).classList.contains(_this4.displayNoneClass)) {
              document.getElementById(elementUIID).classList.add(_this4.displayNoneClass);
            }
          });

          utility.triggerEvent('disaggree-clicked', 'handleAgreeClick');
          store.setStateItem('study-agreement', false);
          store.setStateItem('study-agreement-time', agreementTimeStamp);

          Handlers.recordDisaggreed();
        });
      }
      return null;
    }

    // adds handler for individual sus score questions to local storage
    //
    // @param elementID - HTML element ID
    // @return null

  }, {
    key: 'addHandlerSUSQuestionClick',
    value: function addHandlerSUSQuestionClick(elementID) {
      var _this5 = this;

      var element = document.getElementById(elementID);
      this.selectedClass = 'selected';

      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          // get parent element which is button group
          var parentBtnGroup = document.getElementById(e.target.id).parentElement;
          Handlers.toggleButtonGroupButttonsOff(parentBtnGroup, _this5.selectedClass);

          var questionText = parentBtnGroup.id.replace('btn-group-sus-', 'sus-question-');
          store.setStateItem(questionText, Number(e.target.innerText));

          // add sus question answer to selected to class
          if (!document.getElementById(e.target.id).classList.contains(_this5.selectedClass)) {
            document.getElementById(e.target.id).classList.add(_this5.selectedClass);
          }
        });
      }
      return null;
    }

    // removes the selected class "unslects" all the buttons
    //  in a button group
    //
    // @param btnGroup - HTML element
    // @return null

  }], [{
    key: 'recordDisaggreed',
    value: function recordDisaggreed() {
      var uuidRec = store.getStateItem('uuid');
      var studyStartedRec = store.getStateItem('study started');
      var studyStartedTimeRec = store.getStateItem('study started time');
      var studyAgreementRec = store.getStateItem('study-agreement');
      var studyAgreementTimeRec = store.getStateItem('study-agreement-time');
      var campaignRec = store.getStateItem('campaign');
      var mobileRec = store.getStateItem('mobile');
      var mapVersionRec = store.getStateItem('map-version');
      var studyQuestionRec = store.getStateItem('study-question');
      var susanswersRec = store.getStateItem('susanswers');
      var gridanswersRec = store.getStateItem('gridanswers');
      var gridcorrectRec = store.getStateItem('squareGridGeoJSON');

      var gridcorrectRecProps = [];

      gridcorrectRec.features.forEach(function (val) {
        gridcorrectRecProps.push({
          key: 'grid-box-' + val.properties.id,
          value: val.properties.v
        });
      });

      var jsonData = {
        uuid: uuidRec,
        study_started: studyStartedRec,
        study_started_time: studyStartedTimeRec,
        study_agreement: studyAgreementRec,
        study_agreement_time: studyAgreementTimeRec,
        campaign: JSON.stringify(campaignRec),
        mobile: JSON.stringify(mobileRec),
        map_version: mapVersionRec,
        grid_correct: JSON.stringify(gridcorrectRecProps),
        grid_answers: JSON.stringify(gridanswersRec),
        gridanswers_time: '',
        study_question: studyQuestionRec,
        sus_answers: JSON.stringify(susanswersRec),
        susanswers_time: ''
      };

      recordStudyData.setEventAll(jsonData);
    }
  }, {
    key: 'recordAggreed',
    value: function recordAggreed() {
      var uuidRec = store.getStateItem('uuid');
      var studyStartedRec = store.getStateItem('study started');
      var studyStartedTimeRec = store.getStateItem('study started time');
      var studyAgreementRec = store.getStateItem('study-agreement');
      var studyAgreementTimeRec = store.getStateItem('study-agreement-time');
      var campaignRec = store.getStateItem('campaign');
      var mobileRec = store.getStateItem('mobile');
      var mapVersionRec = store.getStateItem('map-version');
      var studyQuestionRec = store.getStateItem('study-question');
      var susanswersRec = store.getStateItem('susanswers');
      var susanswersDateRec = store.getStateItem('susanswers-time');
      var gridanswersRec = store.getStateItem('gridanswers');
      var gridanswersDateRec = store.getStateItem('gridanswers-time');
      var gridcorrectRec = store.getStateItem('squareGridGeoJSON');

      var gridcorrectRecProps = [];

      gridcorrectRec.features.forEach(function (val) {
        gridcorrectRecProps.push({
          key: 'grid-box-' + val.properties.id,
          value: val.properties.v
        });
      });

      var jsonData = {
        uuid: uuidRec,
        study_started: studyStartedRec,
        study_started_time: studyStartedTimeRec,
        study_agreement: studyAgreementRec,
        study_agreement_time: studyAgreementTimeRec,
        campaign: JSON.stringify(campaignRec),
        mobile: JSON.stringify(mobileRec),
        map_version: mapVersionRec,
        grid_correct: JSON.stringify(gridcorrectRecProps),
        grid_answers: JSON.stringify(gridanswersRec),
        gridanswers_time: gridanswersDateRec,
        study_question: studyQuestionRec,
        sus_answers: JSON.stringify(susanswersRec),
        susanswers_time: susanswersDateRec
      };

      recordStudyData.setEventAll(jsonData);
    }
  }, {
    key: 'toggleButtonGroupButttonsOff',
    value: function toggleButtonGroupButttonsOff(btnGroup, selectedClass) {
      var children = btnGroup.childNodes;
      // make sure children is valiud object
      if (!utility.checkValidObject(children)) {
        return false;
      }
      // make sure there are childeren buttons
      if (children.length > 0) {
        var childrenArray = [].concat(_toConsumableArray(children));
        childrenArray.forEach(function (childItem) {
          if (childItem.classList) {
            childItem.classList.remove(selectedClass);
          }
        });
      }
      return null;
    }
  }]);

  return Handlers;
}();

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fontawesomeSvgCore = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");

var _freeSolidSvgIcons = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");

var _freeRegularSvgIcons = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.es.js");

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

var _mapConfig = __webpack_require__(/*! ./map-config */ "./src/scripts/map-config.js");

var _utility = __webpack_require__(/*! ./utility */ "./src/scripts/utility.js");

var _handlers = __webpack_require__(/*! ./handlers */ "./src/scripts/handlers.js");

var _blockStudyAggreement = __webpack_require__(/*! ../content-blocks/block-study-aggreement.html */ "./src/content-blocks/block-study-aggreement.html");

var _blockStudyAggreement2 = _interopRequireDefault(_blockStudyAggreement);

var _blockStudyDissaggree = __webpack_require__(/*! ../content-blocks/block-study-dissaggree.html */ "./src/content-blocks/block-study-dissaggree.html");

var _blockStudyDissaggree2 = _interopRequireDefault(_blockStudyDissaggree);

var _blockStudyQuestion = __webpack_require__(/*! ../content-blocks/block-study-question-1.html */ "./src/content-blocks/block-study-question-1.html");

var _blockStudyQuestion2 = _interopRequireDefault(_blockStudyQuestion);

var _blockStudyQuestion3 = __webpack_require__(/*! ../content-blocks/block-study-question-2.html */ "./src/content-blocks/block-study-question-2.html");

var _blockStudyQuestion4 = _interopRequireDefault(_blockStudyQuestion3);

var _blockStudyQuestion5 = __webpack_require__(/*! ../content-blocks/block-study-question-3.html */ "./src/content-blocks/block-study-question-3.html");

var _blockStudyQuestion6 = _interopRequireDefault(_blockStudyQuestion5);

var _blockStudySus = __webpack_require__(/*! ../content-blocks/block-study-sus.html */ "./src/content-blocks/block-study-sus.html");

var _blockStudySus2 = _interopRequireDefault(_blockStudySus);

var _blockStudyCompleted = __webpack_require__(/*! ../content-blocks/block-study-completed.html */ "./src/content-blocks/block-study-completed.html");

var _blockStudyCompleted2 = _interopRequireDefault(_blockStudyCompleted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dependencies
// TODOS
// Back to grid button when on sus? maybe or use navgo to create page
// play pause on animation - maybe
var store = new _store.Store({});

// study constraints number of questions starts with 0
var studyMinOne = 0;
var studyMaxOne = 2;
var studyVersion = Math.floor(Math.random() * (studyMaxOne - studyMinOne + 1) + studyMinOne);
store.setStateItem('study-question', studyVersion);

// study constraints number of questions starts with 0
var mapMinOne = 0;
var mapMaxOne = 2;
var mapVersion = Math.floor(Math.random() * (mapMaxOne - mapMinOne + 1) + mapMinOne);
store.setStateItem('map-version', mapVersion);

var utility = new _utility.Utility();
var handlers = new _handlers.Handlers();
var mapBoxConfig = new _mapConfig.MapBoxConfig();

if (!utility.checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', utility.uuid().toString());
}

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas, _freeRegularSvgIcons.far);
_fontawesomeSvgCore.dom.watch();

// load only the block needed
utility.loadHTMLBlock('block-study-aggreement-holder', _blockStudyAggreement2.default);
utility.loadHTMLBlock('block-study-dissaggree-holder', _blockStudyDissaggree2.default);
utility.loadHTMLBlock('block-study-sus-holder', _blockStudySus2.default);
utility.loadHTMLBlock('block-study-completed-holder', _blockStudyCompleted2.default);

var map1 = void 0;
var map2a = void 0;
var map2b = void 0;
var map3Arr = void 0;
var mapdef = void 0;

switch (studyVersion) {
  case 0:
    // animate
    utility.loadHTMLBlock('block-study-question-1-holder', _blockStudyQuestion2.default);
    map1 = mapBoxConfig.makeAnimateMap('map-1', 0);
    break;
  case 1:
    // side by side
    utility.loadHTMLBlock('block-study-question-2-holder', _blockStudyQuestion4.default);
    map2a = mapBoxConfig.makeMap('map-2a', 0);
    map2b = mapBoxConfig.makeMap('map-2b', 1);
    mapBoxConfig.syncMaps(map2a, map2b);
    break;
  case 2:
    // slider
    utility.loadHTMLBlock('block-study-question-3-holder', _blockStudyQuestion6.default);
    map3Arr = mapBoxConfig.makeCompareMap('map-3a', 'map-3b', 'compare-wrapper');
    mapBoxConfig.syncMaps(map3Arr[0], map3Arr[1]);
    break;
  default:
    // animate
    utility.loadHTMLBlock('block-study-question-1-holder', _blockStudyQuestion2.default);
    mapdef = mapBoxConfig.makeAnimateMap('map-1', 0);
    break;
}

// create all the mapbox map objects
// const mapEndArr = mapBoxConfig.makeCompareMap('map-c-enda',
//  'map-c-endb', 'compare-end-wrapper', true, false);
//
var mapEnda = mapBoxConfig.makeMap('map-enda', 0, false, false);
var mapEndb = mapBoxConfig.makeMap('map-endb', 1, true, false);
// mapBoxConfig.syncMaps(mapEndArr[0], mapEndArr[1]);

// sync maps
mapBoxConfig.syncMaps(mapEnda, mapEndb);

// // TODO only deal with map for study question
// // only load html block needed map objects will have generic names also
function resizeAllMaps() {
  switch (studyVersion) {
    case 0:
      // animate
      map1.resize();
      break;
    case 1:
      // side by side
      map2a.resize();
      map2b.resize();
      break;
    case 2:
      // slider
      map3Arr[0].resize();
      map3Arr[1].resize();
      break;
    default:
      // animate
      mapdef.resize();
      break;
  }
  // mapEndArr[0].resize();
  // mapEndArr[1].resize();
  mapEnda.resize();
  mapEndb.resize();
}

document.addEventListener('aggree-clicked', function () {
  resizeAllMaps();
});

document.addEventListener('sus-clicked', function () {
  mapEnda.setZoom(5);
  mapEnda.setZoom(5);
  resizeAllMaps();
  // mapEndArr[0].setZoom(11);
  // mapEndArr[1].setZoom(11);
});

document.addEventListener('disaggree-clicked', function () {
  resizeAllMaps();
});

var urlString = window.location.href;
var url = new URL(urlString);
var campaign = url.searchParams.get('campaign');

// ga event action, category, label
var datestamp = new Date().toISOString();
store.setStateItem('study started', true);
store.setStateItem('study started time', datestamp);
store.setStateItem('campaign', campaign);
store.setStateItem('mobile', utility.isMobileDevice());

// all the Aggreement change elements possible
var aggrementChangeElements = ['aggree-button'];

// elements to add to UI after clicking on aggree to
// particpate in study
aggrementChangeElements.forEach(function (elementUIID) {
  handlers.addHandlerAgreeClick(elementUIID);
});

// all the Disaggreement change elements possible
var disaggrementChangeElements = ['diaggree-button'];

// elements to add to UI after clicking on aggree to
// particpate in study
disaggrementChangeElements.forEach(function (elementUIID) {
  handlers.addHandlerDisagreeClick(elementUIID);
});

// all the submit change elements possible
var submitChangeElements = ['submit-button-to-sus-0', 'submit-button-to-sus-1', 'submit-button-to-sus-2'];

// elements to add to UI after clicking on submit change
// from one of three map questions
submitChangeElements.forEach(function (elementUIID) {
  handlers.addHandlerSubmitChangeClick(elementUIID);
});

// all the SUS change elements possible
var susChangeElements = ['submit-button-to-end'];

// elements to add to UI after clicking on submit change
// from one of three map questions
susChangeElements.forEach(function (elementUIID) {
  handlers.addHandlerSubmitSUSClick(elementUIID);
});

// only updates one map how do get every map
document.addEventListener('grid-update', function () {
  var currentSquareGridGeoJSON = store.getStateItem('squareGridGeoJSON');
  switch (studyVersion) {
    case 0:
      // animate
      map1.getSource('change-grid').setData(currentSquareGridGeoJSON);
      break;
    case 1:
      // side by side
      map2a.getSource('change-grid').setData(currentSquareGridGeoJSON);
      map2b.getSource('change-grid').setData(currentSquareGridGeoJSON);
      break;
    case 2:
      // slider
      map3Arr[0].getSource('change-grid').setData(currentSquareGridGeoJSON);
      map3Arr[1].getSource('change-grid').setData(currentSquareGridGeoJSON);
      break;
    default:
      // animate
      mapdef.getSource('change-grid').setData(currentSquareGridGeoJSON);
      break;
  }
  // mapEndArr[0].getSource('change-grid').setData(currentSquareGridGeoJSON);
  // mapEndArr[1].getSource('change-grid').setData(currentSquareGridGeoJSON);
  mapEnda.getSource('change-grid').setData(currentSquareGridGeoJSON);
  mapEndb.getSource('change-grid').setData(currentSquareGridGeoJSON);
});

var susBtnGroupElements = ['btn-group-sus-1', 'btn-group-sus-2', 'btn-group-sus-3', 'btn-group-sus-4', 'btn-group-sus-5', 'btn-group-sus-6', 'btn-group-sus-7', 'btn-group-sus-8', 'btn-group-sus-9', 'btn-group-sus-10'];

susBtnGroupElements.forEach(function (elementUIID) {
  // add question handler
  handlers.addHandlerSUSQuestionClick(elementUIID);
});

// sus question state items
var susName = 'sus-question-';
var susIterations = 10;
utility.setStateForGroup(susName, susIterations);

// add grid box state items
var gridIterations = 42;
var gridName = 'grid-box-';
utility.setStateForGroup(gridName, gridIterations);

// check study session state for completetion
var isStudycompleted = store.getStateItem('studycompleted');
var studyCompleted = false;
if (typeof isStudycompleted === 'boolean') {
  studyCompleted = isStudycompleted;
} else {
  studyCompleted = false;
}

// check study session state for completetion
var StudyAgrreement = store.getStateItem('study-agreement');
var studyAgrreed = false;
if (typeof StudyAgrreement === 'boolean') {
  studyAgrreed = StudyAgrreement;
} else {
  studyAgrreed = false;
}

// already agreed
if (studyAgrreed) {}
// handleAgreeClick();


// hide study
if (studyCompleted) {
  //
  store.setStateItem('studycompleted', true);
} else {
  store.setStateItem('studycompleted', false);
}

/***/ }),

/***/ "./src/scripts/map-config.js":
/*!***********************************!*\
  !*** ./src/scripts/map-config.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapBoxConfig = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import center from '@turf/center';

// import squareGrid from '@turf/square-grid';


var _mapboxGl = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _mapboxGlCompare = __webpack_require__(/*! mapbox-gl-compare */ "./node_modules/mapbox-gl-compare/index.js");

var _mapboxGlCompare2 = _interopRequireDefault(_mapboxGlCompare);

var _helpers = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/index.js");

var _utility = __webpack_require__(/*! ./utility */ "./src/scripts/utility.js");

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

var _squareGridGeojson = __webpack_require__(/*! ./square-grid-geojson.json */ "./src/scripts/square-grid-geojson.json");

var _squareGridGeojson2 = _interopRequireDefault(_squareGridGeojson);

var _squareGridGeojsonSecond = __webpack_require__(/*! ./square-grid-geojson-second.json */ "./src/scripts/square-grid-geojson-second.json");

var _squareGridGeojsonSecond2 = _interopRequireDefault(_squareGridGeojsonSecond);

var _squareGridGeojsonThird = __webpack_require__(/*! ./square-grid-geojson-third.json */ "./src/scripts/square-grid-geojson-third.json");

var _squareGridGeojsonThird2 = _interopRequireDefault(_squareGridGeojsonThird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var syncMove = __webpack_require__(/*! @mapbox/mapbox-gl-sync-move */ "./node_modules/@mapbox/mapbox-gl-sync-move/index.js");

var store = new _store.Store({});
var utility = new _utility.Utility();

var MapBoxConfig = exports.MapBoxConfig = function () {
  function MapBoxConfig() {
    _classCallCheck(this, MapBoxConfig);

    this.mapVersion = store.getStateItem('map-version');
    switch (this.mapVersion) {
      case 0:
        // avl
        this.squareGridGeoJSON = _squareGridGeojson2.default;
        store.setStateItem('squareGridGeoJSON', _squareGridGeojson2.default);
        break;
      case 1:
        // hstn
        this.squareGridGeoJSON = _squareGridGeojsonSecond2.default;
        store.setStateItem('squareGridGeoJSON', _squareGridGeojsonSecond2.default);
        break;
      case 2:
        // lv
        this.squareGridGeoJSON = _squareGridGeojsonThird2.default;
        store.setStateItem('squareGridGeoJSON', _squareGridGeojsonThird2.default);
        break;
      default:
        // avl
        this.squareGridGeoJSON = _squareGridGeojson2.default;
        store.setStateItem('squareGridGeoJSON', _squareGridGeojson2.default);
        break;
    }

    this.defaultMapStyle = 'mapbox://styles/mapbox/streets-v11';
    this.defaultMapCenter = [-82.570, 35.560]; // starting position [lng, lat]
    this.defaultMaxBounds = [-82.702, 35.463, -82.442, 35.657];
    this.defaultMapZoom = 5; // starting zoom
    this.defaultMapContainer = 'map';
    this.darkMapStyle = 'mapbox://styles/mapbox/dark-v10';
    this.lightMapStyle = 'mapbox://styles/mapbox/light-v10';
    this.mapboxgl = _mapboxGl2.default;
    this.MapboxCompare = _mapboxGlCompare2.default;
    this.mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';
    this.quiet = true;
    this.map1 = null;
    this.map2 = null;
    this.defaultGreyBox = '#555555';
    this.selectedBox = '#FBB03B';
    this.mapChangeLayers = {
      layers: [[// avl 0
      {
        url: 'https://daveism.github.io/change-research/dist/maps/iknow_1/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: [-82.647, 35.507, -82.498, 35.612],
        maxbounds: [-82.702, 35.442, -82.462, 35.657]
      }, {
        url: 'https://daveism.github.io/change-research/dist/maps/iknow_2/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: [-82.647, 35.507, -82.498, 35.612],
        maxbounds: [-82.702, 35.442, -82.462, 35.657]
      }], [// hstn 1
      {
        url: 'https://daveism.github.io/change-research/dist/maps/landcover_1/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: [-95.940, 29.671, -95.791, 29.775],
        maxbounds: [-95.992, 29.625, -95.739, 29.820]
      }, {
        url: 'https://daveism.github.io/change-research/dist/maps/landcover_2/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: [-95.940, 29.671, -95.791, 29.775],
        maxbounds: [-95.992, 29.625, -95.739, 29.820]
      }], [// lv 2
      {
        url: 'https://daveism.github.io/change-research/dist/maps/naip_1/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: [-114.899, 36.0795, -114.750, 36.183],
        maxbounds: [-114.955, 36.034, -114.694, 36.228]
      }, {
        url: 'https://daveism.github.io/change-research/dist/maps/naip_2/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: [-114.899, 36.0795, -114.750, 36.183],
        maxbounds: [-114.955, 36.034, -114.694, 36.228]
      }]]
    };

    this.mapChangeLayersOne = ['https://daveism.github.io/change-research/dist/maps/nlcd-2016-30/{z}/{x}/{y}.png', 'https://daveism.github.io/change-research/dist/maps/nlcd-2001-30/{z}/{x}/{y}.png'];
  }

  // Sets an individual mapbox map test
  //
  // @param mapContainer - string
  // @return new mapbox map object


  _createClass(MapBoxConfig, [{
    key: 'makeMap',
    value: function makeMap() {
      var mapContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultMapContainer;
      var mapIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var _this = this;

      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var enableclick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var mapVersion = store.getStateItem('map-version');
      var mapSetup = this.mapChangeLayers.layers[mapVersion];
      var map = new this.mapboxgl.Map({
        container: mapContainer,
        style: this.lightMapStyle,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true,
        maxBounds: mapSetup[mapIndex].maxbounds
      });

      map.on('load', function (e) {
        _this.fitMyBounds(map);
        map.addLayer(_this.makeTMSLayer(_this.mapChangeLayersOne, mapIndex));
        map.addLayer(_this.makeGridOutLineLayer());
        if (end) {
          map.addLayer(_this.makeGridCorrectLayer());
        } else {
          map.addLayer(_this.makeGridLayer());
        }
        if (enableclick) {
          _this.addGridClick(map);
        }
        map.setZoom(_this.defaultMapZoom);
        map.resize();
        setTimeout(function () {
          map.resize();
        }, 10);
      });

      window.onload = function (e) {
        map.setZoom(_this.defaultMapZoom);
        map.resize();
        setTimeout(function () {
          map.resize();
        }, 10);
      };
      map.addControl(new _mapboxGl2.default.NavigationControl({ showCompass: false }), 'top-left');
      return map;
    }

    // Sets up animated map
    //
    // @param mapContainer - string
    // @return new mapbox map object

  }, {
    key: 'makeAnimateMap',
    value: function makeAnimateMap() {
      var _this2 = this;

      var mapContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultMapContainer;

      var mapVersion = store.getStateItem('map-version');
      var mapSetup = this.mapChangeLayers.layers[mapVersion];

      var map = new this.mapboxgl.Map({
        container: mapContainer,
        style: this.lightMapStyle,
        center: this.defaultMapCenter,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true,
        maxBounds: mapSetup[0].maxbounds
      });

      map.on('load', function (e) {
        _this2.fitMyBounds(map);
        map.addLayer(_this2.makeTMSLayer(_this2.mapChangeLayersOne, 0));
        map.addLayer(_this2.makeTMSLayer(_this2.mapChangeLayersOne, 1));
        map.addLayer(_this2.makeGridOutLineLayer());
        map.addLayer(_this2.makeGridLayer());
        _this2.addGridClick(map);
        map.resize();

        var indexCount = 2;
        var index = 0;

        setInterval(function () {
          index = (index + 1) % indexCount;
          if (index === 1) {
            map.setLayoutProperty('map-change-1', 'visibility', 'visible');
            map.setLayoutProperty('map-change-0', 'visibility', 'none');
          } else {
            map.setLayoutProperty('map-change-0', 'visibility', 'visible');
            map.setLayoutProperty('map-change-1', 'visibility', 'none');
          }
        }, 1000);
      });

      window.onload = function (e) {
        map.setZoom(_this2.defaultMapZoom);
        map.resize();
      };
      // Add zoom and rotation controls to the map.
      map.addControl(new _mapboxGl2.default.NavigationControl({ showCompass: false }), 'top-left');
      return map;
    }

    // makeCompareMap Sets an comparing map "swiping" mapbox map
    //
    // @param mapContainer - string
    // @return array of maps new mapbox map object

  }, {
    key: 'makeCompareMap',
    value: function makeCompareMap(mapBeforeContainer, mapAfterContainer, mapCompareWrapperID) {
      var _this3 = this;

      var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var enableclick = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      var mapVersion = store.getStateItem('map-version');
      var mapSetup = this.mapChangeLayers.layers[mapVersion];

      var beforeMap = new this.mapboxgl.Map({
        container: mapBeforeContainer,
        style: this.lightMapStyle,
        center: this.defaultMapCenter,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true,
        maxBounds: mapSetup[0].maxbounds
      });

      var afterMap = new this.mapboxgl.Map({
        container: mapAfterContainer,
        style: this.lightMapStyle,
        center: this.defaultMapCenter,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true,
        maxBounds: mapSetup[1].maxbounds
      });
      var compare = new this.MapboxCompare(beforeMap, afterMap, '#' + mapCompareWrapperID);

      beforeMap.on('load', function (e) {
        _this3.fitMyBounds(beforeMap);
        beforeMap.addLayer(_this3.makeTMSLayer(_this3.mapChangeLayersOne, 1)); // needs update
        beforeMap.addLayer(_this3.makeGridOutLineLayer());
        beforeMap.addLayer(_this3.makeGridLayer());
        if (enableclick) {
          _this3.addGridClick(beforeMap);
        }
        beforeMap.setZoom(_this3.defaultMapZoom);
        beforeMap.resize();
        compare.setSlider(150);
      });

      afterMap.on('load', function (e) {
        _this3.fitMyBounds(afterMap);
        afterMap.addLayer(_this3.makeTMSLayer(_this3.mapChangeLayersOne, 0)); // needs update
        afterMap.addLayer(_this3.makeGridOutLineLayer());
        if (end) {
          afterMap.addLayer(_this3.makeGridCorrectLayer());
        } else {
          afterMap.addLayer(_this3.makeGridLayer());
        }
        if (enableclick) {
          _this3.addGridClick(afterMap);
        }
        afterMap.setZoom(_this3.defaultMapZoom);
        afterMap.resize();
        compare.setSlider(150);
      });

      window.onload = function (e) {
        afterMap.resize();
        beforeMap.resize();
        compare.setSlider(150);
      };
      // Add zoom and rotation controls to the map.
      beforeMap.addControl(new _mapboxGl2.default.NavigationControl({ showCompass: false }), 'top-left');
      afterMap.addControl(new _mapboxGl2.default.NavigationControl({ showCompass: false }), 'top-left');
      return [beforeMap, afterMap];
    }

    // syncs two maps zoom and pan
    // modifed from https://docs.mapbox.com/mapbox.js/example/v1.0.0/sync-layer-movement/
    //
    // @param map1 = first mapbox map object
    // @param map2  = second mapbox map object
    // @return null

  }, {
    key: 'syncMaps',
    value: function syncMaps(map1, map2) {
      // eslint-disable-line
      syncMove(map1, map2);
    }
  }, {
    key: 'makeTMSLayer',
    value: function makeTMSLayer(mapChange, mapIndex) {
      // study constraints number of questions starts with 0
      var mapVersion = store.getStateItem('map-version');
      var mapSetup = this.mapChangeLayers.layers[mapVersion];

      return {
        id: 'map-change-' + mapIndex,
        type: 'raster',
        source: {
          type: 'raster',
          tiles: [mapSetup[mapIndex].url],
          minzoom: mapSetup[mapIndex].minzoom,
          maxzoom: mapSetup[mapIndex].maxzoom,
          scheme: 'tms',
          tileSize: 256,
          bounds: mapSetup[mapIndex].bounds,
          maxBounds: mapSetup[mapIndex].maxbounds
        },
        paint: {
          'raster-fade-duration': 0
        }
      };
    }

    // makes change grid layer on map
    //
    // @param null
    // @return null

  }, {
    key: 'makeGridLayer',
    value: function makeGridLayer() {
      return {
        id: 'change-grid',
        type: 'fill',
        source: {
          type: 'geojson',
          data: this.squareGridGeoJSON
        },
        layout: {},
        paint: {
          'fill-color': ['match', ['get', 'selected'], 1, this.selectedBox,
          /* other */this.defaultGreyBox],
          'fill-opacity': 0.5
        }
      };
    }

    // makes change grid layer what correct on map
    //
    // @param null
    // @return null

  }, {
    key: 'makeGridCorrectLayer',
    value: function makeGridCorrectLayer() {
      return {
        id: 'change-grid',
        type: 'fill',
        source: {
          type: 'geojson',
          data: this.squareGridGeoJSON
        },
        layout: {},
        paint: {
          'fill-color': ['match', ['get', 'v'], 1, this.selectedBox,
          /* other */this.defaultGreyBox],
          'fill-opacity': 0.5
        }
      };
    }

    // makes change grid layer on map
    //
    // @param null
    // @return null

  }, {
    key: 'makeGridOutLineLayer',
    value: function makeGridOutLineLayer() {
      return {
        id: 'change-grid-outline',
        type: 'line',
        source: {
          type: 'geojson',
          data: this.squareGridGeoJSON
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': this.defaultGreyBox,
          'line-width': 4
        }
      };
    }

    // adds click of grid box to capture which grid the user
    // thinks change happend in orginal from:
    // https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
    //
    // @param map = mapbox map object to update zoom and center to
    // @return null

  }, {
    key: 'addGridClick',
    value: function addGridClick(map) {
      var _this4 = this;

      // const makeGridLayer = this.makeGridLayer();
      // When a click event occurs on a feature in the states layer, open a popup at the
      // location of the click, with description HTML from its properties.
      map.on('mouseenter', 'change-grid', function (e) {
        map.getCanvas().style.cursor = 'pointer'; // eslint-disable-line
      });

      map.on('mouseleave', 'change-grid', function (e) {
        map.getCanvas().style.cursor = ''; // eslint-disable-line
      });

      map.on('click', 'change-grid', function (e) {
        var feature = e.features[0];
        var id = Number(feature.properties.id);

        // udpates selected geojson properites.selected 0 or 1 depeneding
        // if user selected polygon
        var newFeature = MapBoxConfig.toggleSelectedFeature(feature);

        // create a new feature collection from selected feature
        var selectedFeatures = MapBoxConfig.makeSelectedFeatureGeoJSON(newFeature);

        // updates squareGridGeoJSON with new geojson
        var newSquareGridGeoJSON = MapBoxConfig.updateSquareGridWithSelectedFeatures(selectedFeatures); // eslint-disable-line

        // store new square grid with slected boxes
        _this4.storeSquareGrid(newSquareGridGeoJSON);

        // update state with selected feature
        MapBoxConfig.storeSelectedFeature(id);

        // tigger event so all data sources update
        utility.triggerEvent('grid-update', id);
      });
    }

    // toggles value the properties (attribute) selected
    //    when a user clicks the grid box > 0 when selected
    //    0 when selecte
    //
    // @param feature = geojson feature (poperties and geom)
    // @return feature = geojson feature

  }, {
    key: 'storeSquareGrid',


    // updates state with the new version of SquareGridGeoJSON
    //    contains selected features also (if any selected)
    //
    // @param NewSquareGridGeoJSON = geojson featurecollecton representing
    //                the new features (poperties and geom)
    // @return null
    value: function storeSquareGrid(NewSquareGridGeoJSON) {
      this.squareGridGeoJSON = NewSquareGridGeoJSON;
      store.setStateItem('squareGridGeoJSON', NewSquareGridGeoJSON);
      return null;
    }
  }, {
    key: 'fitMyBounds',
    value: function fitMyBounds(map) {
      var mapVersion = store.getStateItem('map-version');
      var mapSetup = this.mapChangeLayers.layers[mapVersion];
      var bounds = mapSetup[0].maxbounds;
      map.fitBounds(bounds, { padding: 100 });
    }
  }], [{
    key: 'toggleSelectedFeature',
    value: function toggleSelectedFeature(feature) {
      if (feature.properties.selected === 0) {
        feature.properties.selected = 1; // eslint-disable-line
      } else {
        feature.properties.selected = 0; // eslint-disable-line
      }
      return feature;
    }

    // sets the selected feature in state > 0 when selected
    //    0 when selecte
    //
    // @param id = number which represents the feature id
    // @return null

  }, {
    key: 'storeSelectedFeature',
    value: function storeSelectedFeature(id) {
      var gridName = 'grid-box-';
      // zero out "toggle off" if grid id exists state item
      if (store.getStateItem('' + gridName + id) > 0) {
        store.setStateItem('' + gridName + id, 0);
        // add "toggle on" if  state item > 0 or not selected
      } else {
        store.setStateItem('' + gridName + id, Number(id));
      }
      return null;
    }

    // makes the selected feature a new feature collection
    //
    // @param feature = geojson feature (poperties and geom)
    // @return featureCollection (from turf.js)

  }, {
    key: 'makeSelectedFeatureGeoJSON',
    value: function makeSelectedFeatureGeoJSON(feature) {
      return (0, _helpers.featureCollection)([(0, _helpers.polygon)(feature.geometry.coordinates, feature.properties)]);
    }

    // updates the SquareGridGeoJSON after merging and reconciling
    //    with the selected feautures
    //
    // @param selectedFeatures = geojson featurecollecton representing the selected
    //        features (poperties and geom)
    // @return featureCollection (from turf.js)

  }, {
    key: 'updateSquareGridWithSelectedFeatures',
    value: function updateSquareGridWithSelectedFeatures(selectedFeatures) {
      var currentSquareGridGeoJSON = store.getStateItem('squareGridGeoJSON');
      var currentFeatureIds = selectedFeatures.features.map(function (feature) {
        return feature.properties.id;
      });
      return (0, _helpers.featureCollection)(selectedFeatures.features.concat(currentSquareGridGeoJSON.features.filter(function (feature) {
        return !currentFeatureIds.includes(feature.properties.id);
      }))); // eslint-disable-line
    }
  }]);

  return MapBoxConfig;
}();

/***/ }),

/***/ "./src/scripts/record-study-data.js":
/*!******************************************!*\
  !*** ./src/scripts/record-study-data.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordStudyData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = new _store.Store({});
var datapi = 'https://script.google.com/macros/s/AKfycbxRP9PVCSJ7Yo4_XYtqkzuSpHf0cOAn1noFKjdqnffBfS2ZEzw/exec';

var RecordStudyData = exports.RecordStudyData = function () {
  function RecordStudyData() {
    _classCallCheck(this, RecordStudyData);

    this.foo = {};
    this.datapi = datapi;
  }

  _createClass(RecordStudyData, [{
    key: 'setEvent',
    value: function setEvent() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      // get varriables for
      this.uuid = store.getStateItem('uuid').toString();
      this.date = new Date().toISOString();
      this.data = label;
      this.category = category;

      // study to JSON
      var jsondata = {
        uuid: this.uuid,
        category: this.category,
        data: this.data,
        date: this.date
      };

      var dataAPIURL = new URL(this.datapi);
      dataAPIURL.search = new URLSearchParams(jsondata);
      fetch(dataAPIURL);
    }
  }, {
    key: 'setEventAll',
    value: function setEventAll() {
      var jsondata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var dataAPIURL = new URL(this.datapi);
      dataAPIURL.search = new URLSearchParams(jsondata);
      fetch(dataAPIURL);
    }
  }]);

  return RecordStudyData;
}();

/***/ }),

/***/ "./src/scripts/square-grid-geojson-second.json":
/*!*****************************************************!*\
  !*** ./src/scripts/square-grid-geojson-second.json ***!
  \*****************************************************/
/*! exports provided: type, name, features, default */
/***/ (function(module) {

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.9297282558553,29.77495644902612],[-95.91906092865867,29.77495644902612],[-95.91906092865867,29.766272554037492],[-95.91906092865867,29.757588659048864],[-95.9297282558553,29.757588659048864],[-95.94039558305192,29.757588659048864],[-95.94039558305192,29.766272554037492],[-95.94039558305192,29.77495644902612],[-95.9297282558553,29.77495644902612]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.9297282558553,29.757588659048864],[-95.91906092865867,29.757588659048864],[-95.91906092865867,29.748904764060235],[-95.91906092865867,29.740220869071607],[-95.9297282558553,29.740220869071607],[-95.94039558305192,29.740220869071607],[-95.94039558305192,29.748904764060235],[-95.94039558305192,29.757588659048864],[-95.9297282558553,29.757588659048864]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.722853079094342],[-95.94039558305192,29.731536974082978],[-95.94039558305192,29.740220869071607],[-95.9297282558553,29.740220869071607],[-95.91906092865867,29.740220869071607],[-95.91906092865867,29.731536974082978],[-95.91906092865867,29.722853079094342],[-95.9297282558553,29.722853079094342],[-95.94039558305192,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.705485289117092],[-95.94039558305192,29.71416918410572],[-95.94039558305192,29.722853079094342],[-95.9297282558553,29.722853079094342],[-95.91906092865867,29.722853079094342],[-95.91906092865867,29.71416918410572],[-95.91906092865867,29.705485289117092],[-95.9297282558553,29.705485289117092],[-95.94039558305192,29.705485289117092]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.688117499139835],[-95.94039558305192,29.696801394128464],[-95.94039558305192,29.705485289117092],[-95.9297282558553,29.705485289117092],[-95.91906092865867,29.705485289117092],[-95.91906092865867,29.696801394128464],[-95.91906092865867,29.688117499139835],[-95.9297282558553,29.688117499139835],[-95.94039558305192,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.67074970916258],[-95.94039558305192,29.679433604151207],[-95.94039558305192,29.688117499139835],[-95.9297282558553,29.688117499139835],[-95.91906092865867,29.688117499139835],[-95.91906092865867,29.679433604151207],[-95.91906092865867,29.67074970916258],[-95.9297282558553,29.67074970916258],[-95.94039558305192,29.67074970916258]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.91906092865867,29.757588659048864],[-95.91906092865867,29.766272554037492],[-95.91906092865867,29.77495644902612],[-95.90839360146204,29.77495644902612],[-95.89772627426541,29.77495644902612],[-95.89772627426541,29.766272554037492],[-95.89772627426541,29.757588659048864],[-95.90839360146204,29.757588659048864],[-95.91906092865867,29.757588659048864]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.88705894706878,29.77495644902612],[-95.87639161987215,29.77495644902612],[-95.87639161987215,29.766272554037492],[-95.87639161987215,29.757588659048864],[-95.88705894706878,29.757588659048864],[-95.89772627426541,29.757588659048864],[-95.89772627426541,29.766272554037492],[-95.89772627426541,29.77495644902612],[-95.88705894706878,29.77495644902612]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.757588659048864],[-95.87639161987215,29.766272554037492],[-95.87639161987215,29.77495644902612],[-95.86572429267552,29.77495644902612],[-95.8550569654789,29.77495644902612],[-95.8550569654789,29.766272554037492],[-95.8550569654789,29.757588659048864],[-95.86572429267552,29.757588659048864],[-95.87639161987215,29.757588659048864]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.757588659048864],[-95.8550569654789,29.766272554037492],[-95.8550569654789,29.77495644902612],[-95.84438963828227,29.77495644902612],[-95.83372231108564,29.77495644902612],[-95.83372231108564,29.766272554037492],[-95.83372231108564,29.757588659048864],[-95.84438963828227,29.757588659048864],[-95.8550569654789,29.757588659048864]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.82305498388901,29.77495644902612],[-95.81238765669238,29.77495644902612],[-95.81238765669238,29.766272554037492],[-95.81238765669238,29.757588659048864],[-95.82305498388901,29.757588659048864],[-95.83372231108564,29.757588659048864],[-95.83372231108564,29.766272554037492],[-95.83372231108564,29.77495644902612],[-95.82305498388901,29.77495644902612]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.81238765669238,29.757588659048864],[-95.81238765669238,29.766272554037492],[-95.81238765669238,29.77495644902612],[-95.80172032949575,29.77495644902612],[-95.79105300229912,29.77495644902612],[-95.79105300229912,29.766272554037492],[-95.79105300229912,29.757588659048864],[-95.80172032949575,29.757588659048864],[-95.81238765669238,29.757588659048864]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.81238765669238,29.740220869071607],[-95.81238765669238,29.748904764060235],[-95.81238765669238,29.757588659048864],[-95.80172032949575,29.757588659048864],[-95.79105300229912,29.757588659048864],[-95.79105300229912,29.748904764060235],[-95.79105300229912,29.740220869071607],[-95.80172032949575,29.740220869071607],[-95.81238765669238,29.740220869071607]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.740220869071607],[-95.79105300229912,29.740220869071607],[-95.79105300229912,29.731536974082978],[-95.79105300229912,29.722853079094342],[-95.80172032949575,29.722853079094342],[-95.81238765669238,29.722853079094342],[-95.81238765669238,29.731536974082978],[-95.81238765669238,29.740220869071607],[-95.80172032949575,29.740220869071607]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.722853079094342],[-95.79105300229912,29.722853079094342],[-95.79105300229912,29.71416918410572],[-95.79105300229912,29.705485289117092],[-95.80172032949575,29.705485289117092],[-95.81238765669238,29.705485289117092],[-95.81238765669238,29.71416918410572],[-95.81238765669238,29.722853079094342],[-95.80172032949575,29.722853079094342]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.705485289117092],[-95.79105300229912,29.705485289117092],[-95.79105300229912,29.696801394128464],[-95.79105300229912,29.688117499139835],[-95.80172032949575,29.688117499139835],[-95.81238765669238,29.688117499139835],[-95.81238765669238,29.696801394128464],[-95.81238765669238,29.705485289117092],[-95.80172032949575,29.705485289117092]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.688117499139835],[-95.79105300229912,29.688117499139835],[-95.79105300229912,29.679433604151207],[-95.79105300229912,29.67074970916258],[-95.80172032949575,29.67074970916258],[-95.81238765669238,29.67074970916258],[-95.81238765669238,29.679433604151207],[-95.81238765669238,29.688117499139835],[-95.80172032949575,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.90839360146204,29.688117499139835],[-95.89772627426541,29.688117499139835],[-95.89772627426541,29.679433604151207],[-95.89772627426541,29.67074970916258],[-95.90839360146204,29.67074970916258],[-95.91906092865867,29.67074970916258],[-95.91906092865867,29.679433604151207],[-95.91906092865867,29.688117499139835],[-95.90839360146204,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.67074970916258],[-95.89772627426541,29.679433604151207],[-95.89772627426541,29.688117499139835],[-95.88705894706878,29.688117499139835],[-95.87639161987215,29.688117499139835],[-95.87639161987215,29.679433604151207],[-95.87639161987215,29.67074970916258],[-95.88705894706878,29.67074970916258],[-95.89772627426541,29.67074970916258]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.67074970916258],[-95.87639161987215,29.679433604151207],[-95.87639161987215,29.688117499139835],[-95.86572429267552,29.688117499139835],[-95.8550569654789,29.688117499139835],[-95.8550569654789,29.679433604151207],[-95.8550569654789,29.67074970916258],[-95.86572429267552,29.67074970916258],[-95.87639161987215,29.67074970916258]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.84438963828227,29.688117499139835],[-95.83372231108564,29.688117499139835],[-95.83372231108564,29.679433604151207],[-95.83372231108564,29.67074970916258],[-95.84438963828227,29.67074970916258],[-95.8550569654789,29.67074970916258],[-95.8550569654789,29.679433604151207],[-95.8550569654789,29.688117499139835],[-95.84438963828227,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.67074970916258],[-95.83372231108564,29.679433604151207],[-95.83372231108564,29.688117499139835],[-95.82305498388901,29.688117499139835],[-95.81238765669238,29.688117499139835],[-95.81238765669238,29.679433604151207],[-95.81238765669238,29.67074970916258],[-95.82305498388901,29.67074970916258],[-95.83372231108564,29.67074970916258]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.91906092865867,29.740220869071607],[-95.91906092865867,29.748904764060235],[-95.91906092865867,29.757588659048864],[-95.90839360146204,29.757588659048864],[-95.89772627426541,29.757588659048864],[-95.89772627426541,29.748904764060235],[-95.89772627426541,29.740220869071607],[-95.90839360146204,29.740220869071607],[-95.91906092865867,29.740220869071607]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.688117499139835],[-95.83372231108564,29.696801394128464],[-95.83372231108564,29.705485289117092],[-95.82305498388901,29.705485289117092],[-95.81238765669238,29.705485289117092],[-95.81238765669238,29.696801394128464],[-95.81238765669238,29.688117499139835],[-95.82305498388901,29.688117499139835],[-95.83372231108564,29.688117499139835]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.748904764060235],[-95.83372231108564,29.757588659048864],[-95.82305498388901,29.757588659048864],[-95.81238765669238,29.757588659048864],[-95.81238765669238,29.748904764060235],[-95.81238765669238,29.740220869071607],[-95.82305498388901,29.740220869071607],[-95.83372231108564,29.740220869071607],[-95.83372231108564,29.748904764060235]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.90839360146204,29.705485289117092],[-95.89772627426541,29.705485289117092],[-95.89772627426541,29.696801394128464],[-95.89772627426541,29.688117499139835],[-95.90839360146204,29.688117499139835],[-95.91906092865867,29.688117499139835],[-95.91906092865867,29.696801394128464],[-95.91906092865867,29.705485289117092],[-95.90839360146204,29.705485289117092]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.91906092865867,29.722853079094342],[-95.91906092865867,29.731536974082978],[-95.91906092865867,29.740220869071607],[-95.90839360146204,29.740220869071607],[-95.89772627426541,29.740220869071607],[-95.89772627426541,29.731536974082978],[-95.89772627426541,29.722853079094342],[-95.90839360146204,29.722853079094342],[-95.91906092865867,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.90839360146204,29.722853079094342],[-95.89772627426541,29.722853079094342],[-95.89772627426541,29.71416918410572],[-95.89772627426541,29.705485289117092],[-95.90839360146204,29.705485289117092],[-95.91906092865867,29.705485289117092],[-95.91906092865867,29.71416918410572],[-95.91906092865867,29.722853079094342],[-95.90839360146204,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.71416918410572],[-95.83372231108564,29.722853079094342],[-95.82305498388901,29.722853079094342],[-95.81238765669238,29.722853079094342],[-95.81238765669238,29.71416918410572],[-95.81238765669238,29.705485289117092],[-95.82305498388901,29.705485289117092],[-95.83372231108564,29.705485289117092],[-95.83372231108564,29.71416918410572]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.82305498388901,29.740220869071607],[-95.81238765669238,29.740220869071607],[-95.81238765669238,29.731536974082978],[-95.81238765669238,29.722853079094342],[-95.82305498388901,29.722853079094342],[-95.83372231108564,29.722853079094342],[-95.83372231108564,29.731536974082978],[-95.83372231108564,29.740220869071607],[-95.82305498388901,29.740220869071607]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.740220869071607],[-95.8550569654789,29.748904764060235],[-95.8550569654789,29.757588659048864],[-95.84438963828227,29.757588659048864],[-95.83372231108564,29.757588659048864],[-95.83372231108564,29.748904764060235],[-95.83372231108564,29.740220869071607],[-95.84438963828227,29.740220869071607],[-95.8550569654789,29.740220869071607]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.740220869071607],[-95.87639161987215,29.748904764060235],[-95.87639161987215,29.757588659048864],[-95.86572429267552,29.757588659048864],[-95.8550569654789,29.757588659048864],[-95.8550569654789,29.748904764060235],[-95.8550569654789,29.740220869071607],[-95.86572429267552,29.740220869071607],[-95.87639161987215,29.740220869071607]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.748904764060235],[-95.89772627426541,29.757588659048864],[-95.88705894706878,29.757588659048864],[-95.87639161987215,29.757588659048864],[-95.87639161987215,29.748904764060235],[-95.87639161987215,29.740220869071607],[-95.88705894706878,29.740220869071607],[-95.89772627426541,29.740220869071607],[-95.89772627426541,29.748904764060235]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.722853079094342],[-95.89772627426541,29.731536974082978],[-95.89772627426541,29.740220869071607],[-95.88705894706878,29.740220869071607],[-95.87639161987215,29.740220869071607],[-95.87639161987215,29.731536974082978],[-95.87639161987215,29.722853079094342],[-95.88705894706878,29.722853079094342],[-95.89772627426541,29.722853079094342]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.86572429267552,29.740220869071607],[-95.8550569654789,29.740220869071607],[-95.8550569654789,29.731536974082978],[-95.8550569654789,29.722853079094342],[-95.86572429267552,29.722853079094342],[-95.87639161987215,29.722853079094342],[-95.87639161987215,29.731536974082978],[-95.87639161987215,29.740220869071607],[-95.86572429267552,29.740220869071607]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.722853079094342],[-95.8550569654789,29.731536974082978],[-95.8550569654789,29.740220869071607],[-95.84438963828227,29.740220869071607],[-95.83372231108564,29.740220869071607],[-95.83372231108564,29.731536974082978],[-95.83372231108564,29.722853079094342],[-95.84438963828227,29.722853079094342],[-95.8550569654789,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.705485289117092],[-95.89772627426541,29.71416918410572],[-95.89772627426541,29.722853079094342],[-95.88705894706878,29.722853079094342],[-95.87639161987215,29.722853079094342],[-95.87639161987215,29.71416918410572],[-95.87639161987215,29.705485289117092],[-95.88705894706878,29.705485289117092],[-95.89772627426541,29.705485289117092]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.86572429267552,29.722853079094342],[-95.8550569654789,29.722853079094342],[-95.8550569654789,29.71416918410572],[-95.8550569654789,29.705485289117092],[-95.86572429267552,29.705485289117092],[-95.87639161987215,29.705485289117092],[-95.87639161987215,29.71416918410572],[-95.87639161987215,29.722853079094342],[-95.86572429267552,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.705485289117092],[-95.8550569654789,29.71416918410572],[-95.8550569654789,29.722853079094342],[-95.84438963828227,29.722853079094342],[-95.83372231108564,29.722853079094342],[-95.83372231108564,29.71416918410572],[-95.83372231108564,29.705485289117092],[-95.84438963828227,29.705485289117092],[-95.8550569654789,29.705485289117092]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.688117499139835],[-95.8550569654789,29.696801394128464],[-95.8550569654789,29.705485289117092],[-95.84438963828227,29.705485289117092],[-95.83372231108564,29.705485289117092],[-95.83372231108564,29.696801394128464],[-95.83372231108564,29.688117499139835],[-95.84438963828227,29.688117499139835],[-95.8550569654789,29.688117499139835]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.688117499139835],[-95.87639161987215,29.696801394128464],[-95.87639161987215,29.705485289117092],[-95.86572429267552,29.705485289117092],[-95.8550569654789,29.705485289117092],[-95.8550569654789,29.696801394128464],[-95.8550569654789,29.688117499139835],[-95.86572429267552,29.688117499139835],[-95.87639161987215,29.688117499139835]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.688117499139835],[-95.89772627426541,29.696801394128464],[-95.89772627426541,29.705485289117092],[-95.88705894706878,29.705485289117092],[-95.87639161987215,29.705485289117092],[-95.87639161987215,29.696801394128464],[-95.87639161987215,29.688117499139835],[-95.88705894706878,29.688117499139835],[-95.89772627426541,29.688117499139835]]]}}]};

/***/ }),

/***/ "./src/scripts/square-grid-geojson-third.json":
/*!****************************************************!*\
  !*** ./src/scripts/square-grid-geojson-third.json ***!
  \****************************************************/
/*! exports provided: type, name, features, default */
/***/ (function(module) {

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.88923346904315,36.18378058869747],[-114.87856614184652,36.18378058869747],[-114.87856614184652,36.175096693708845],[-114.87856614184652,36.166412798720216],[-114.88923346904315,36.166412798720216],[-114.89990079623978,36.166412798720216],[-114.89990079623978,36.175096693708845],[-114.89990079623978,36.18378058869747],[-114.88923346904315,36.18378058869747]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.88923346904315,36.166412798720216],[-114.87856614184652,36.166412798720216],[-114.87856614184652,36.15772890373159],[-114.87856614184652,36.14904500874296],[-114.88923346904315,36.14904500874296],[-114.89990079623978,36.14904500874296],[-114.89990079623978,36.15772890373159],[-114.89990079623978,36.166412798720216],[-114.88923346904315,36.166412798720216]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.131677218765695],[-114.89990079623978,36.14036111375433],[-114.89990079623978,36.14904500874296],[-114.88923346904315,36.14904500874296],[-114.87856614184652,36.14904500874296],[-114.87856614184652,36.14036111375433],[-114.87856614184652,36.131677218765695],[-114.88923346904315,36.131677218765695],[-114.89990079623978,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.114309428788445],[-114.89990079623978,36.122993323777074],[-114.89990079623978,36.131677218765695],[-114.88923346904315,36.131677218765695],[-114.87856614184652,36.131677218765695],[-114.87856614184652,36.122993323777074],[-114.87856614184652,36.114309428788445],[-114.88923346904315,36.114309428788445],[-114.89990079623978,36.114309428788445]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.09694163881119],[-114.89990079623978,36.10562553379982],[-114.89990079623978,36.114309428788445],[-114.88923346904315,36.114309428788445],[-114.87856614184652,36.114309428788445],[-114.87856614184652,36.10562553379982],[-114.87856614184652,36.09694163881119],[-114.88923346904315,36.09694163881119],[-114.89990079623978,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.07957384883393],[-114.89990079623978,36.08825774382256],[-114.89990079623978,36.09694163881119],[-114.88923346904315,36.09694163881119],[-114.87856614184652,36.09694163881119],[-114.87856614184652,36.08825774382256],[-114.87856614184652,36.07957384883393],[-114.88923346904315,36.07957384883393],[-114.89990079623978,36.07957384883393]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.87856614184652,36.166412798720216],[-114.87856614184652,36.175096693708845],[-114.87856614184652,36.18378058869747],[-114.86789881464989,36.18378058869747],[-114.85723148745326,36.18378058869747],[-114.85723148745326,36.175096693708845],[-114.85723148745326,36.166412798720216],[-114.86789881464989,36.166412798720216],[-114.87856614184652,36.166412798720216]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.84656416025663,36.18378058869747],[-114.83589683306,36.18378058869747],[-114.83589683306,36.175096693708845],[-114.83589683306,36.166412798720216],[-114.84656416025663,36.166412798720216],[-114.85723148745326,36.166412798720216],[-114.85723148745326,36.175096693708845],[-114.85723148745326,36.18378058869747],[-114.84656416025663,36.18378058869747]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.166412798720216],[-114.83589683306,36.175096693708845],[-114.83589683306,36.18378058869747],[-114.82522950586338,36.18378058869747],[-114.81456217866675,36.18378058869747],[-114.81456217866675,36.175096693708845],[-114.81456217866675,36.166412798720216],[-114.82522950586338,36.166412798720216],[-114.83589683306,36.166412798720216]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.166412798720216],[-114.81456217866675,36.175096693708845],[-114.81456217866675,36.18378058869747],[-114.80389485147012,36.18378058869747],[-114.79322752427349,36.18378058869747],[-114.79322752427349,36.175096693708845],[-114.79322752427349,36.166412798720216],[-114.80389485147012,36.166412798720216],[-114.81456217866675,36.166412798720216]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.78256019707686,36.18378058869747],[-114.77189286988023,36.18378058869747],[-114.77189286988023,36.175096693708845],[-114.77189286988023,36.166412798720216],[-114.78256019707686,36.166412798720216],[-114.79322752427349,36.166412798720216],[-114.79322752427349,36.175096693708845],[-114.79322752427349,36.18378058869747],[-114.78256019707686,36.18378058869747]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.77189286988023,36.166412798720216],[-114.77189286988023,36.175096693708845],[-114.77189286988023,36.18378058869747],[-114.7612255426836,36.18378058869747],[-114.75055821548698,36.18378058869747],[-114.75055821548698,36.175096693708845],[-114.75055821548698,36.166412798720216],[-114.7612255426836,36.166412798720216],[-114.77189286988023,36.166412798720216]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.77189286988023,36.14904500874296],[-114.77189286988023,36.15772890373159],[-114.77189286988023,36.166412798720216],[-114.7612255426836,36.166412798720216],[-114.75055821548698,36.166412798720216],[-114.75055821548698,36.15772890373159],[-114.75055821548698,36.14904500874296],[-114.7612255426836,36.14904500874296],[-114.77189286988023,36.14904500874296]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.14904500874296],[-114.75055821548698,36.14904500874296],[-114.75055821548698,36.14036111375433],[-114.75055821548698,36.131677218765695],[-114.7612255426836,36.131677218765695],[-114.77189286988023,36.131677218765695],[-114.77189286988023,36.14036111375433],[-114.77189286988023,36.14904500874296],[-114.7612255426836,36.14904500874296]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.131677218765695],[-114.75055821548698,36.131677218765695],[-114.75055821548698,36.122993323777074],[-114.75055821548698,36.114309428788445],[-114.7612255426836,36.114309428788445],[-114.77189286988023,36.114309428788445],[-114.77189286988023,36.122993323777074],[-114.77189286988023,36.131677218765695],[-114.7612255426836,36.131677218765695]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.114309428788445],[-114.75055821548698,36.114309428788445],[-114.75055821548698,36.10562553379982],[-114.75055821548698,36.09694163881119],[-114.7612255426836,36.09694163881119],[-114.77189286988023,36.09694163881119],[-114.77189286988023,36.10562553379982],[-114.77189286988023,36.114309428788445],[-114.7612255426836,36.114309428788445]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.09694163881119],[-114.75055821548698,36.09694163881119],[-114.75055821548698,36.08825774382256],[-114.75055821548698,36.07957384883393],[-114.7612255426836,36.07957384883393],[-114.77189286988023,36.07957384883393],[-114.77189286988023,36.08825774382256],[-114.77189286988023,36.09694163881119],[-114.7612255426836,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.86789881464989,36.09694163881119],[-114.85723148745326,36.09694163881119],[-114.85723148745326,36.08825774382256],[-114.85723148745326,36.07957384883393],[-114.86789881464989,36.07957384883393],[-114.87856614184652,36.07957384883393],[-114.87856614184652,36.08825774382256],[-114.87856614184652,36.09694163881119],[-114.86789881464989,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.07957384883393],[-114.85723148745326,36.08825774382256],[-114.85723148745326,36.09694163881119],[-114.84656416025663,36.09694163881119],[-114.83589683306,36.09694163881119],[-114.83589683306,36.08825774382256],[-114.83589683306,36.07957384883393],[-114.84656416025663,36.07957384883393],[-114.85723148745326,36.07957384883393]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.07957384883393],[-114.83589683306,36.08825774382256],[-114.83589683306,36.09694163881119],[-114.82522950586338,36.09694163881119],[-114.81456217866675,36.09694163881119],[-114.81456217866675,36.08825774382256],[-114.81456217866675,36.07957384883393],[-114.82522950586338,36.07957384883393],[-114.83589683306,36.07957384883393]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.80389485147012,36.09694163881119],[-114.79322752427349,36.09694163881119],[-114.79322752427349,36.08825774382256],[-114.79322752427349,36.07957384883393],[-114.80389485147012,36.07957384883393],[-114.81456217866675,36.07957384883393],[-114.81456217866675,36.08825774382256],[-114.81456217866675,36.09694163881119],[-114.80389485147012,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.07957384883393],[-114.79322752427349,36.08825774382256],[-114.79322752427349,36.09694163881119],[-114.78256019707686,36.09694163881119],[-114.77189286988023,36.09694163881119],[-114.77189286988023,36.08825774382256],[-114.77189286988023,36.07957384883393],[-114.78256019707686,36.07957384883393],[-114.79322752427349,36.07957384883393]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.87856614184652,36.14904500874296],[-114.87856614184652,36.15772890373159],[-114.87856614184652,36.166412798720216],[-114.86789881464989,36.166412798720216],[-114.85723148745326,36.166412798720216],[-114.85723148745326,36.15772890373159],[-114.85723148745326,36.14904500874296],[-114.86789881464989,36.14904500874296],[-114.87856614184652,36.14904500874296]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.09694163881119],[-114.79322752427349,36.10562553379982],[-114.79322752427349,36.114309428788445],[-114.78256019707686,36.114309428788445],[-114.77189286988023,36.114309428788445],[-114.77189286988023,36.10562553379982],[-114.77189286988023,36.09694163881119],[-114.78256019707686,36.09694163881119],[-114.79322752427349,36.09694163881119]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.15772890373159],[-114.79322752427349,36.166412798720216],[-114.78256019707686,36.166412798720216],[-114.77189286988023,36.166412798720216],[-114.77189286988023,36.15772890373159],[-114.77189286988023,36.14904500874296],[-114.78256019707686,36.14904500874296],[-114.79322752427349,36.14904500874296],[-114.79322752427349,36.15772890373159]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.86789881464989,36.114309428788445],[-114.85723148745326,36.114309428788445],[-114.85723148745326,36.10562553379982],[-114.85723148745326,36.09694163881119],[-114.86789881464989,36.09694163881119],[-114.87856614184652,36.09694163881119],[-114.87856614184652,36.10562553379982],[-114.87856614184652,36.114309428788445],[-114.86789881464989,36.114309428788445]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.87856614184652,36.131677218765695],[-114.87856614184652,36.14036111375433],[-114.87856614184652,36.14904500874296],[-114.86789881464989,36.14904500874296],[-114.85723148745326,36.14904500874296],[-114.85723148745326,36.14036111375433],[-114.85723148745326,36.131677218765695],[-114.86789881464989,36.131677218765695],[-114.87856614184652,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.86789881464989,36.131677218765695],[-114.85723148745326,36.131677218765695],[-114.85723148745326,36.122993323777074],[-114.85723148745326,36.114309428788445],[-114.86789881464989,36.114309428788445],[-114.87856614184652,36.114309428788445],[-114.87856614184652,36.122993323777074],[-114.87856614184652,36.131677218765695],[-114.86789881464989,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.122993323777074],[-114.79322752427349,36.131677218765695],[-114.78256019707686,36.131677218765695],[-114.77189286988023,36.131677218765695],[-114.77189286988023,36.122993323777074],[-114.77189286988023,36.114309428788445],[-114.78256019707686,36.114309428788445],[-114.79322752427349,36.114309428788445],[-114.79322752427349,36.122993323777074]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.78256019707686,36.14904500874296],[-114.77189286988023,36.14904500874296],[-114.77189286988023,36.14036111375433],[-114.77189286988023,36.131677218765695],[-114.78256019707686,36.131677218765695],[-114.79322752427349,36.131677218765695],[-114.79322752427349,36.14036111375433],[-114.79322752427349,36.14904500874296],[-114.78256019707686,36.14904500874296]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.14904500874296],[-114.81456217866675,36.15772890373159],[-114.81456217866675,36.166412798720216],[-114.80389485147012,36.166412798720216],[-114.79322752427349,36.166412798720216],[-114.79322752427349,36.15772890373159],[-114.79322752427349,36.14904500874296],[-114.80389485147012,36.14904500874296],[-114.81456217866675,36.14904500874296]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.14904500874296],[-114.83589683306,36.15772890373159],[-114.83589683306,36.166412798720216],[-114.82522950586338,36.166412798720216],[-114.81456217866675,36.166412798720216],[-114.81456217866675,36.15772890373159],[-114.81456217866675,36.14904500874296],[-114.82522950586338,36.14904500874296],[-114.83589683306,36.14904500874296]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.15772890373159],[-114.85723148745326,36.166412798720216],[-114.84656416025663,36.166412798720216],[-114.83589683306,36.166412798720216],[-114.83589683306,36.15772890373159],[-114.83589683306,36.14904500874296],[-114.84656416025663,36.14904500874296],[-114.85723148745326,36.14904500874296],[-114.85723148745326,36.15772890373159]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.131677218765695],[-114.85723148745326,36.14036111375433],[-114.85723148745326,36.14904500874296],[-114.84656416025663,36.14904500874296],[-114.83589683306,36.14904500874296],[-114.83589683306,36.14036111375433],[-114.83589683306,36.131677218765695],[-114.84656416025663,36.131677218765695],[-114.85723148745326,36.131677218765695]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.82522950586338,36.14904500874296],[-114.81456217866675,36.14904500874296],[-114.81456217866675,36.14036111375433],[-114.81456217866675,36.131677218765695],[-114.82522950586338,36.131677218765695],[-114.83589683306,36.131677218765695],[-114.83589683306,36.14036111375433],[-114.83589683306,36.14904500874296],[-114.82522950586338,36.14904500874296]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.131677218765695],[-114.81456217866675,36.14036111375433],[-114.81456217866675,36.14904500874296],[-114.80389485147012,36.14904500874296],[-114.79322752427349,36.14904500874296],[-114.79322752427349,36.14036111375433],[-114.79322752427349,36.131677218765695],[-114.80389485147012,36.131677218765695],[-114.81456217866675,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.114309428788445],[-114.85723148745326,36.122993323777074],[-114.85723148745326,36.131677218765695],[-114.84656416025663,36.131677218765695],[-114.83589683306,36.131677218765695],[-114.83589683306,36.122993323777074],[-114.83589683306,36.114309428788445],[-114.84656416025663,36.114309428788445],[-114.85723148745326,36.114309428788445]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.82522950586338,36.131677218765695],[-114.81456217866675,36.131677218765695],[-114.81456217866675,36.122993323777074],[-114.81456217866675,36.114309428788445],[-114.82522950586338,36.114309428788445],[-114.83589683306,36.114309428788445],[-114.83589683306,36.122993323777074],[-114.83589683306,36.131677218765695],[-114.82522950586338,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.114309428788445],[-114.81456217866675,36.122993323777074],[-114.81456217866675,36.131677218765695],[-114.80389485147012,36.131677218765695],[-114.79322752427349,36.131677218765695],[-114.79322752427349,36.122993323777074],[-114.79322752427349,36.114309428788445],[-114.80389485147012,36.114309428788445],[-114.81456217866675,36.114309428788445]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.09694163881119],[-114.81456217866675,36.10562553379982],[-114.81456217866675,36.114309428788445],[-114.80389485147012,36.114309428788445],[-114.79322752427349,36.114309428788445],[-114.79322752427349,36.10562553379982],[-114.79322752427349,36.09694163881119],[-114.80389485147012,36.09694163881119],[-114.81456217866675,36.09694163881119]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.09694163881119],[-114.83589683306,36.10562553379982],[-114.83589683306,36.114309428788445],[-114.82522950586338,36.114309428788445],[-114.81456217866675,36.114309428788445],[-114.81456217866675,36.10562553379982],[-114.81456217866675,36.09694163881119],[-114.82522950586338,36.09694163881119],[-114.83589683306,36.09694163881119]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.09694163881119],[-114.85723148745326,36.10562553379982],[-114.85723148745326,36.114309428788445],[-114.84656416025663,36.114309428788445],[-114.83589683306,36.114309428788445],[-114.83589683306,36.10562553379982],[-114.83589683306,36.09694163881119],[-114.84656416025663,36.09694163881119],[-114.85723148745326,36.09694163881119]]]}}]};

/***/ }),

/***/ "./src/scripts/square-grid-geojson.json":
/*!**********************************************!*\
  !*** ./src/scripts/square-grid-geojson.json ***!
  \**********************************************/
/*! exports provided: type, name, features, default */
/***/ (function(module) {

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.63683762677812,35.61210336993178],[-82.62617029958149,35.61210336993178],[-82.62617029958149,35.60341947494315],[-82.62617029958149,35.59473557995452],[-82.63683762677812,35.59473557995452],[-82.64750495397475,35.59473557995452],[-82.64750495397475,35.60341947494315],[-82.64750495397475,35.61210336993178],[-82.63683762677812,35.61210336993178]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.63683762677812,35.59473557995452],[-82.62617029958149,35.59473557995452],[-82.62617029958149,35.586051684965895],[-82.62617029958149,35.57736778997727],[-82.63683762677812,35.57736778997727],[-82.64750495397475,35.57736778997727],[-82.64750495397475,35.586051684965895],[-82.64750495397475,35.59473557995452],[-82.63683762677812,35.59473557995452]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.56],[-82.64750495397475,35.56868389498864],[-82.64750495397475,35.57736778997727],[-82.63683762677812,35.57736778997727],[-82.62617029958149,35.57736778997727],[-82.62617029958149,35.56868389498864],[-82.62617029958149,35.56],[-82.63683762677812,35.56],[-82.64750495397475,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.54263221002275],[-82.64750495397475,35.55131610501138],[-82.64750495397475,35.56],[-82.63683762677812,35.56],[-82.62617029958149,35.56],[-82.62617029958149,35.55131610501138],[-82.62617029958149,35.54263221002275],[-82.63683762677812,35.54263221002275],[-82.64750495397475,35.54263221002275]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.525264420045495],[-82.64750495397475,35.533948315034124],[-82.64750495397475,35.54263221002275],[-82.63683762677812,35.54263221002275],[-82.62617029958149,35.54263221002275],[-82.62617029958149,35.533948315034124],[-82.62617029958149,35.525264420045495],[-82.63683762677812,35.525264420045495],[-82.64750495397475,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.50789663006824],[-82.64750495397475,35.51658052505687],[-82.64750495397475,35.525264420045495],[-82.63683762677812,35.525264420045495],[-82.62617029958149,35.525264420045495],[-82.62617029958149,35.51658052505687],[-82.62617029958149,35.50789663006824],[-82.63683762677812,35.50789663006824],[-82.64750495397475,35.50789663006824]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.59473557995452],[-82.62617029958149,35.60341947494315],[-82.62617029958149,35.61210336993178],[-82.61550297238486,35.61210336993178],[-82.60483564518823,35.61210336993178],[-82.60483564518823,35.60341947494315],[-82.60483564518823,35.59473557995452],[-82.61550297238486,35.59473557995452],[-82.62617029958149,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.5941683179916,35.61210336993178],[-82.58350099079497,35.61210336993178],[-82.58350099079497,35.60341947494315],[-82.58350099079497,35.59473557995452],[-82.5941683179916,35.59473557995452],[-82.60483564518823,35.59473557995452],[-82.60483564518823,35.60341947494315],[-82.60483564518823,35.61210336993178],[-82.5941683179916,35.61210336993178]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.59473557995452],[-82.58350099079497,35.60341947494315],[-82.58350099079497,35.61210336993178],[-82.57283366359835,35.61210336993178],[-82.56216633640172,35.61210336993178],[-82.56216633640172,35.60341947494315],[-82.56216633640172,35.59473557995452],[-82.57283366359835,35.59473557995452],[-82.58350099079497,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.59473557995452],[-82.56216633640172,35.60341947494315],[-82.56216633640172,35.61210336993178],[-82.55149900920509,35.61210336993178],[-82.54083168200846,35.61210336993178],[-82.54083168200846,35.60341947494315],[-82.54083168200846,35.59473557995452],[-82.55149900920509,35.59473557995452],[-82.56216633640172,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.53016435481183,35.61210336993178],[-82.5194970276152,35.61210336993178],[-82.5194970276152,35.60341947494315],[-82.5194970276152,35.59473557995452],[-82.53016435481183,35.59473557995452],[-82.54083168200846,35.59473557995452],[-82.54083168200846,35.60341947494315],[-82.54083168200846,35.61210336993178],[-82.53016435481183,35.61210336993178]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.5194970276152,35.59473557995452],[-82.5194970276152,35.60341947494315],[-82.5194970276152,35.61210336993178],[-82.50882970041857,35.61210336993178],[-82.49816237322194,35.61210336993178],[-82.49816237322194,35.60341947494315],[-82.49816237322194,35.59473557995452],[-82.50882970041857,35.59473557995452],[-82.5194970276152,35.59473557995452]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.5194970276152,35.57736778997727],[-82.5194970276152,35.586051684965895],[-82.5194970276152,35.59473557995452],[-82.50882970041857,35.59473557995452],[-82.49816237322194,35.59473557995452],[-82.49816237322194,35.586051684965895],[-82.49816237322194,35.57736778997727],[-82.50882970041857,35.57736778997727],[-82.5194970276152,35.57736778997727]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.57736778997727],[-82.49816237322194,35.57736778997727],[-82.49816237322194,35.56868389498864],[-82.49816237322194,35.56],[-82.50882970041857,35.56],[-82.5194970276152,35.56],[-82.5194970276152,35.56868389498864],[-82.5194970276152,35.57736778997727],[-82.50882970041857,35.57736778997727]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.56],[-82.49816237322194,35.56],[-82.49816237322194,35.55131610501138],[-82.49816237322194,35.54263221002275],[-82.50882970041857,35.54263221002275],[-82.5194970276152,35.54263221002275],[-82.5194970276152,35.55131610501138],[-82.5194970276152,35.56],[-82.50882970041857,35.56]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.54263221002275],[-82.49816237322194,35.54263221002275],[-82.49816237322194,35.533948315034124],[-82.49816237322194,35.525264420045495],[-82.50882970041857,35.525264420045495],[-82.5194970276152,35.525264420045495],[-82.5194970276152,35.533948315034124],[-82.5194970276152,35.54263221002275],[-82.50882970041857,35.54263221002275]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.525264420045495],[-82.49816237322194,35.525264420045495],[-82.49816237322194,35.51658052505687],[-82.49816237322194,35.50789663006824],[-82.50882970041857,35.50789663006824],[-82.5194970276152,35.50789663006824],[-82.5194970276152,35.51658052505687],[-82.5194970276152,35.525264420045495],[-82.50882970041857,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.525264420045495],[-82.60483564518823,35.525264420045495],[-82.60483564518823,35.51658052505687],[-82.60483564518823,35.50789663006824],[-82.61550297238486,35.50789663006824],[-82.62617029958149,35.50789663006824],[-82.62617029958149,35.51658052505687],[-82.62617029958149,35.525264420045495],[-82.61550297238486,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.50789663006824],[-82.60483564518823,35.51658052505687],[-82.60483564518823,35.525264420045495],[-82.5941683179916,35.525264420045495],[-82.58350099079497,35.525264420045495],[-82.58350099079497,35.51658052505687],[-82.58350099079497,35.50789663006824],[-82.5941683179916,35.50789663006824],[-82.60483564518823,35.50789663006824]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.50789663006824],[-82.58350099079497,35.51658052505687],[-82.58350099079497,35.525264420045495],[-82.57283366359835,35.525264420045495],[-82.56216633640172,35.525264420045495],[-82.56216633640172,35.51658052505687],[-82.56216633640172,35.50789663006824],[-82.57283366359835,35.50789663006824],[-82.58350099079497,35.50789663006824]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.55149900920509,35.525264420045495],[-82.54083168200846,35.525264420045495],[-82.54083168200846,35.51658052505687],[-82.54083168200846,35.50789663006824],[-82.55149900920509,35.50789663006824],[-82.56216633640172,35.50789663006824],[-82.56216633640172,35.51658052505687],[-82.56216633640172,35.525264420045495],[-82.55149900920509,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.50789663006824],[-82.54083168200846,35.51658052505687],[-82.54083168200846,35.525264420045495],[-82.53016435481183,35.525264420045495],[-82.5194970276152,35.525264420045495],[-82.5194970276152,35.51658052505687],[-82.5194970276152,35.50789663006824],[-82.53016435481183,35.50789663006824],[-82.54083168200846,35.50789663006824]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.57736778997727],[-82.62617029958149,35.586051684965895],[-82.62617029958149,35.59473557995452],[-82.61550297238486,35.59473557995452],[-82.60483564518823,35.59473557995452],[-82.60483564518823,35.586051684965895],[-82.60483564518823,35.57736778997727],[-82.61550297238486,35.57736778997727],[-82.62617029958149,35.57736778997727]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.525264420045495],[-82.54083168200846,35.533948315034124],[-82.54083168200846,35.54263221002275],[-82.53016435481183,35.54263221002275],[-82.5194970276152,35.54263221002275],[-82.5194970276152,35.533948315034124],[-82.5194970276152,35.525264420045495],[-82.53016435481183,35.525264420045495],[-82.54083168200846,35.525264420045495]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.586051684965895],[-82.54083168200846,35.59473557995452],[-82.53016435481183,35.59473557995452],[-82.5194970276152,35.59473557995452],[-82.5194970276152,35.586051684965895],[-82.5194970276152,35.57736778997727],[-82.53016435481183,35.57736778997727],[-82.54083168200846,35.57736778997727],[-82.54083168200846,35.586051684965895]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.54263221002275],[-82.60483564518823,35.54263221002275],[-82.60483564518823,35.533948315034124],[-82.60483564518823,35.525264420045495],[-82.61550297238486,35.525264420045495],[-82.62617029958149,35.525264420045495],[-82.62617029958149,35.533948315034124],[-82.62617029958149,35.54263221002275],[-82.61550297238486,35.54263221002275]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.56],[-82.62617029958149,35.56868389498864],[-82.62617029958149,35.57736778997727],[-82.61550297238486,35.57736778997727],[-82.60483564518823,35.57736778997727],[-82.60483564518823,35.56868389498864],[-82.60483564518823,35.56],[-82.61550297238486,35.56],[-82.62617029958149,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.56],[-82.60483564518823,35.56],[-82.60483564518823,35.55131610501138],[-82.60483564518823,35.54263221002275],[-82.61550297238486,35.54263221002275],[-82.62617029958149,35.54263221002275],[-82.62617029958149,35.55131610501138],[-82.62617029958149,35.56],[-82.61550297238486,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.55131610501138],[-82.54083168200846,35.56],[-82.53016435481183,35.56],[-82.5194970276152,35.56],[-82.5194970276152,35.55131610501138],[-82.5194970276152,35.54263221002275],[-82.53016435481183,35.54263221002275],[-82.54083168200846,35.54263221002275],[-82.54083168200846,35.55131610501138]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.53016435481183,35.57736778997727],[-82.5194970276152,35.57736778997727],[-82.5194970276152,35.56868389498864],[-82.5194970276152,35.56],[-82.53016435481183,35.56],[-82.54083168200846,35.56],[-82.54083168200846,35.56868389498864],[-82.54083168200846,35.57736778997727],[-82.53016435481183,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.57736778997727],[-82.56216633640172,35.586051684965895],[-82.56216633640172,35.59473557995452],[-82.55149900920509,35.59473557995452],[-82.54083168200846,35.59473557995452],[-82.54083168200846,35.586051684965895],[-82.54083168200846,35.57736778997727],[-82.55149900920509,35.57736778997727],[-82.56216633640172,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.57736778997727],[-82.58350099079497,35.586051684965895],[-82.58350099079497,35.59473557995452],[-82.57283366359835,35.59473557995452],[-82.56216633640172,35.59473557995452],[-82.56216633640172,35.586051684965895],[-82.56216633640172,35.57736778997727],[-82.57283366359835,35.57736778997727],[-82.58350099079497,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.586051684965895],[-82.60483564518823,35.59473557995452],[-82.5941683179916,35.59473557995452],[-82.58350099079497,35.59473557995452],[-82.58350099079497,35.586051684965895],[-82.58350099079497,35.57736778997727],[-82.5941683179916,35.57736778997727],[-82.60483564518823,35.57736778997727],[-82.60483564518823,35.586051684965895]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.56],[-82.60483564518823,35.56868389498864],[-82.60483564518823,35.57736778997727],[-82.5941683179916,35.57736778997727],[-82.58350099079497,35.57736778997727],[-82.58350099079497,35.56868389498864],[-82.58350099079497,35.56],[-82.5941683179916,35.56],[-82.60483564518823,35.56]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.57283366359835,35.57736778997727],[-82.56216633640172,35.57736778997727],[-82.56216633640172,35.56868389498864],[-82.56216633640172,35.56],[-82.57283366359835,35.56],[-82.58350099079497,35.56],[-82.58350099079497,35.56868389498864],[-82.58350099079497,35.57736778997727],[-82.57283366359835,35.57736778997727]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.56],[-82.56216633640172,35.56868389498864],[-82.56216633640172,35.57736778997727],[-82.55149900920509,35.57736778997727],[-82.54083168200846,35.57736778997727],[-82.54083168200846,35.56868389498864],[-82.54083168200846,35.56],[-82.55149900920509,35.56],[-82.56216633640172,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.54263221002275],[-82.60483564518823,35.55131610501138],[-82.60483564518823,35.56],[-82.5941683179916,35.56],[-82.58350099079497,35.56],[-82.58350099079497,35.55131610501138],[-82.58350099079497,35.54263221002275],[-82.5941683179916,35.54263221002275],[-82.60483564518823,35.54263221002275]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.57283366359835,35.56],[-82.56216633640172,35.56],[-82.56216633640172,35.55131610501138],[-82.56216633640172,35.54263221002275],[-82.57283366359835,35.54263221002275],[-82.58350099079497,35.54263221002275],[-82.58350099079497,35.55131610501138],[-82.58350099079497,35.56],[-82.57283366359835,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.54263221002275],[-82.56216633640172,35.55131610501138],[-82.56216633640172,35.56],[-82.55149900920509,35.56],[-82.54083168200846,35.56],[-82.54083168200846,35.55131610501138],[-82.54083168200846,35.54263221002275],[-82.55149900920509,35.54263221002275],[-82.56216633640172,35.54263221002275]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.525264420045495],[-82.56216633640172,35.533948315034124],[-82.56216633640172,35.54263221002275],[-82.55149900920509,35.54263221002275],[-82.54083168200846,35.54263221002275],[-82.54083168200846,35.533948315034124],[-82.54083168200846,35.525264420045495],[-82.55149900920509,35.525264420045495],[-82.56216633640172,35.525264420045495]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.525264420045495],[-82.58350099079497,35.533948315034124],[-82.58350099079497,35.54263221002275],[-82.57283366359835,35.54263221002275],[-82.56216633640172,35.54263221002275],[-82.56216633640172,35.533948315034124],[-82.56216633640172,35.525264420045495],[-82.57283366359835,35.525264420045495],[-82.58350099079497,35.525264420045495]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.525264420045495],[-82.60483564518823,35.533948315034124],[-82.60483564518823,35.54263221002275],[-82.5941683179916,35.54263221002275],[-82.58350099079497,35.54263221002275],[-82.58350099079497,35.533948315034124],[-82.58350099079497,35.525264420045495],[-82.5941683179916,35.525264420045495],[-82.60483564518823,35.525264420045495]]]}}]};

/***/ }),

/***/ "./src/scripts/store.js":
/*!******************************!*\
  !*** ./src/scripts/store.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import { StorageAPI } from './localStorageAPI';

/**
* This component is intended to handle the storage and retrieval of the state of
* As of this writing it is using localStorage to do this.
* Uses simple class instance methods with the short-hand method declaration
* pattern.
*
* To note: There is a difference between the Store and the State. As of 0a3106e
* the Store is a String saved to the browsers localStorage and is a serialized
* version of the State. The State is an Object which is interacted with by
* parsing the State string from the Store, modifying the results of the parse,
* and re-serializing it back to the Store.
*/
var STATE_KEY = 'state';

var Store = exports.Store = function () {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  function Store() {
    _classCallCheck(this, Store);

    // this.state = state;
    // this.store = new StorageAPI();
    if (Store.storageAvailable()) {
      this.storage = window.localStorage;
      this.state = {};
      if (this.checkStateExists) {
        this.state = this.getState();
      } else {
        this.state = { STATE_KEY: STATE_KEY };
      }
    }
  }

  // Sets a key/value pair to the storage provider, primarily used later in the composed functions
  //
  // @param key | string
  // @param value | string


  _createClass(Store, [{
    key: 'setStateItem',
    value: function setStateItem() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var storeObj = _defineProperty({}, key, value);
      var newStateObj = _extends({}, this.getState(), storeObj);
      this.setState(newStateObj);
      return newStateObj;
    }

    // Delete an item from the storage provider, primarily used later in the composed functions
    // !// WARNING: only does a shallow delete
    // @param key | string
    // @return string

  }, {
    key: 'deleteStateItem',
    value: function deleteStateItem() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var storeObj = this.getState();
      delete storeObj[key];
      this.setState(storeObj);
      return storeObj;
    }

    // Gets the entire state object
    //
    // @return object

  }, {
    key: 'getState',
    value: function getState() {
      return this.checkStateExists() ? JSON.parse(this.getItem(STATE_KEY)) : {};
    }

    // Gets an item from the storage provider, primarily used later in the composed functions
    //
    // @param key | string
    // @return string

  }, {
    key: 'getItem',
    value: function getItem() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.storage.getItem(STATE_KEY);
    }

    // Gets an item from the storage provider, primarily used later in the composed functions
    //
    // @param key | string
    // @return string

  }, {
    key: 'getStateItem',
    value: function getStateItem() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.checkItem(key) ? this.getState()[key] : {};
    }

    // Sets a new state object state
    //
    // @param value | string

  }, {
    key: 'setState',
    value: function setState() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.storage.setItem(STATE_KEY, JSON.stringify(value));
      return this.checkStateExists() ? JSON.parse(this.getItem(STATE_KEY)) : {};
    }

    // Checks if the state exists in the storage provider

  }, {
    key: 'checkStateExists',
    value: function checkStateExists() {
      return Boolean(this.getItem(STATE_KEY));
    }

    // Gets the state from the storage provider
    //
    // @return string

  }, {
    key: 'getStateAsString',
    value: function getStateAsString() {
      return this.getItem(STATE_KEY);
    }

    // Check if an item has been saved to the store
    // unused as of 0a3106e
    //
    // @param item - string
    // @return boolean

  }, {
    key: 'isStateItemExist',
    value: function isStateItemExist(item) {
      if (this.checkStateExists()) {
        var stateStr = this.getStateAsString();
        if (stateStr.indexOf(item) > 0) {
          return true;
        }
      }
      return false;
    }

    //
    // @param item - string
    // @return boolean

  }, {
    key: 'checkItem',
    value: function checkItem(item) {
      return this.checkStateExists() && this.getStateAsString().indexOf(item) > 0;
    }

    // Check if localStorage available.
    // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    //
    // @return boolean

  }], [{
    key: 'storageAvailable',
    value: function storageAvailable() {
      var type = 'localStorage';
      var storage = void 0;
      try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch (e) {
        return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
      }
    }
  }]);

  return Store;
}();

/***/ }),

/***/ "./src/scripts/utility.js":
/*!********************************!*\
  !*** ./src/scripts/utility.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utility = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = new _store.Store({});

var Utility = exports.Utility = function () {
  function Utility() {
    _classCallCheck(this, Utility);

    this.foo = {};
    this.check = false;
  }

  // checks is Javascript object is a valid object
  //
  // @param obj - object
  // @return boolean


  _createClass(Utility, [{
    key: 'checkValidObject',
    value: function checkValidObject(obj) {
      this.obj = obj;
      if (this.obj === undefined || this.obj === null) {
        return false;
      }
      if (_typeof(this.obj) === 'object' && Object.keys(obj).length === 0) {
        return false;
      }
      if (typeof this.obj === 'string' && this.obj.length === 0) {
        return false;
      }

      return true;
    }

    // creates a uuid
    //
    // @return string

  }, {
    key: 'uuid',
    value: function uuid() {
      this.crypto = crypto.getRandomValues(new Uint32Array(4)).join('-');
      return this.crypto;
    }

    // checks if current device is a mobile
    //
    // @return boolean

  }, {
    key: 'isMobileDevice',
    value: function isMobileDevice() {
      this.check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) return true;
      })(navigator.userAgent || navigator.vendor || window.opera); // eslint-disable-line
      return this.check;
    }

    // checks html as a template/block
    //
    // @param placeHolderElementID - HTML element ID that will hold the template
    // @param template - HTML content
    // @return boolean

  }, {
    key: 'loadHTMLBlock',
    value: function loadHTMLBlock(placeHolderElementID, template) {
      var _this = this;

      var componentElem = document.getElementById(placeHolderElementID);

      // make sure template exsists
      if (template) {
        if (componentElem != null) {
          componentElem.addEventListener('load', function () {
            _this.triggerEvent('hml-block-loaded', placeHolderElementID);
          });

          componentElem.addEventListener('unload', function () {
            _this.triggerEvent('hml-block-unloaded', placeHolderElementID);
          });

          // Load template into placeholder element
          componentElem.innerHTML = template;
        }
      }
    }

    // triggers a dom event
    //
    // @param eventName - string event name for a listner to listen too
    // @param detail - object details for event
    // @return boolean

  }, {
    key: 'triggerEvent',
    value: function triggerEvent(eventName, detail) {
      this.event = new window.CustomEvent(eventName, { detail: detail });
      document.dispatchEvent(this.event);
    }

    // iterates x number of iterations and writes a
    // a default zero value state key
    //
    // @param eventName - string event name for a listner to listen too
    // @param detail - object details for event
    // @return null

  }, {
    key: 'setStateForGroup',
    value: function setStateForGroup(statetext, iterations) {
      // if (!this.checkValidObject(store.getStateItem(`${statetext}${iterations}`))) {
      store.setStateItem('' + statetext + iterations, 0);
      // }
      if (iterations > 0) {
        var nextIteration = iterations - 1;
        this.setStateForGroup(statetext, nextIteration);
      }
    }

    // iterates x number of iterations and writes to the API
    //
    // @param eventName - string event name for a listner to listen too
    // @param detail - object details for event
    // @return null

  }, {
    key: 'setAPIForGroup',
    value: function setAPIForGroup(statetext, iterations) {
      var valueArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var key = '' + statetext + iterations;
      var value = store.getStateItem('' + statetext + iterations);
      // if (!this.checkValidObject(store.getStateItem(`${statetext}${iterations}`))) {
      store.setStateItem('' + statetext + iterations, 0);
      // }
      // capture in array so we can write complted array to api
      valueArray.push({ key: key, value: value });
      if (iterations > 0) {
        var nextIteration = iterations - 1;
        this.setAPIForGroup(statetext, nextIteration, valueArray);
        return null;
      }
      // write complted array to api
      // recordStudyData.setEvent('data', 'gridanswers', JSON.stringify(valueArray));
      var datestamp = new Date().toISOString();
      store.setStateItem('gridanswers', valueArray);
      store.setStateItem('gridanswers-time', datestamp);
      return null;
    }
  }]);

  return Utility;
}();

/***/ }),

/***/ 0:
/*!***************************************************!*\
  !*** multi babel-polyfill ./src/scripts/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */"./node_modules/babel-polyfill/lib/index.js");
module.exports = __webpack_require__(/*! /Users/daveism/Github/change-research/src/scripts/index.js */"./src/scripts/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0yLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWFwLWNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yZWNvcmQtc3R1ZHktZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbInJlY29yZFN0dWR5RGF0YSIsIlJlY29yZFN0dWR5RGF0YSIsInN0b3JlIiwiU3RvcmUiLCJ1dGlsaXR5IiwiVXRpbGl0eSIsIkhhbmRsZXJzIiwiZGlzcGxheU5vbmVDbGFzcyIsInNlbGVjdGVkQ2xhc3MiLCJzdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCIsInN0dWR5QWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlIiwic3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNBZGQiLCJzdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSIsInN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZCIsInN0dWR5UXVlc3Rpb24iLCJnZXRTdGF0ZUl0ZW0iLCJzdHVkeVF1ZXN0aW9uRWxlbWVudHNSZW1vdmUiLCJzdHVkeVNVU0VsZW1lbnRzQWRkIiwic3R1ZHlTVVNFbGVtZW50c1JlbW92ZSIsInN1c1N0b3JhZ2VLZXlzIiwiZWxlbWVudElEIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZvckVhY2giLCJlbGVtZW50VUlJRCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImNvbnRhaW5zIiwiYWRkIiwiZ3JpZE5hbWUiLCJncmlkSXRlcmF0aW9ucyIsInNldEFQSUZvckdyb3VwIiwic3VzVmFsdWVBcnJheSIsImtleSIsInF1ZXN0aW9uQW5zd2VyIiwicHVzaCIsImRhdGVzdGFtcCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInRyaWdnZXJFdmVudCIsInNldFN0YXRlSXRlbSIsInJlY29yZEFnZ3JlZWQiLCJzdHVkeVZlcnNpb24iLCJhZ3JlZW1lbnRUaW1lU3RhbXAiLCJyZWNvcmREaXNhZ2dyZWVkIiwicGFyZW50QnRuR3JvdXAiLCJ0YXJnZXQiLCJpZCIsInBhcmVudEVsZW1lbnQiLCJ0b2dnbGVCdXR0b25Hcm91cEJ1dHR0b25zT2ZmIiwicXVlc3Rpb25UZXh0IiwicmVwbGFjZSIsIk51bWJlciIsImlubmVyVGV4dCIsInV1aWRSZWMiLCJzdHVkeVN0YXJ0ZWRSZWMiLCJzdHVkeVN0YXJ0ZWRUaW1lUmVjIiwic3R1ZHlBZ3JlZW1lbnRSZWMiLCJzdHVkeUFncmVlbWVudFRpbWVSZWMiLCJjYW1wYWlnblJlYyIsIm1vYmlsZVJlYyIsIm1hcFZlcnNpb25SZWMiLCJzdHVkeVF1ZXN0aW9uUmVjIiwic3VzYW5zd2Vyc1JlYyIsImdyaWRhbnN3ZXJzUmVjIiwiZ3JpZGNvcnJlY3RSZWMiLCJncmlkY29ycmVjdFJlY1Byb3BzIiwiZmVhdHVyZXMiLCJ2YWwiLCJwcm9wZXJ0aWVzIiwidmFsdWUiLCJ2IiwianNvbkRhdGEiLCJ1dWlkIiwic3R1ZHlfc3RhcnRlZCIsInN0dWR5X3N0YXJ0ZWRfdGltZSIsInN0dWR5X2FncmVlbWVudCIsInN0dWR5X2FncmVlbWVudF90aW1lIiwiY2FtcGFpZ24iLCJKU09OIiwic3RyaW5naWZ5IiwibW9iaWxlIiwibWFwX3ZlcnNpb24iLCJncmlkX2NvcnJlY3QiLCJncmlkX2Fuc3dlcnMiLCJncmlkYW5zd2Vyc190aW1lIiwic3R1ZHlfcXVlc3Rpb24iLCJzdXNfYW5zd2VycyIsInN1c2Fuc3dlcnNfdGltZSIsInNldEV2ZW50QWxsIiwic3VzYW5zd2Vyc0RhdGVSZWMiLCJncmlkYW5zd2Vyc0RhdGVSZWMiLCJidG5Hcm91cCIsImNoaWxkcmVuIiwiY2hpbGROb2RlcyIsImNoZWNrVmFsaWRPYmplY3QiLCJsZW5ndGgiLCJjaGlsZHJlbkFycmF5IiwiY2hpbGRJdGVtIiwic3R1ZHlNaW5PbmUiLCJzdHVkeU1heE9uZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1hcE1pbk9uZSIsIm1hcE1heE9uZSIsIm1hcFZlcnNpb24iLCJoYW5kbGVycyIsIm1hcEJveENvbmZpZyIsIk1hcEJveENvbmZpZyIsInRvU3RyaW5nIiwibGlicmFyeSIsImZhcyIsImZhciIsImRvbSIsIndhdGNoIiwibG9hZEhUTUxCbG9jayIsImJsb2NrU3R1ZHlBZ2dyZWVtZW50IiwiYmxvY2tTdHVkeURpc3NhZ2dyZWUiLCJibG9ja1N0dWR5U1VTIiwiYmxvY2tTdHVkeUNvbXBsZXRlZCIsIm1hcDEiLCJtYXAyYSIsIm1hcDJiIiwibWFwM0FyciIsIm1hcGRlZiIsImJsb2NrU3R1ZHlRdWVzdGlvbjEiLCJtYWtlQW5pbWF0ZU1hcCIsImJsb2NrU3R1ZHlRdWVzdGlvbjIiLCJtYWtlTWFwIiwic3luY01hcHMiLCJibG9ja1N0dWR5UXVlc3Rpb24zIiwibWFrZUNvbXBhcmVNYXAiLCJtYXBFbmRhIiwibWFwRW5kYiIsInJlc2l6ZUFsbE1hcHMiLCJyZXNpemUiLCJzZXRab29tIiwidXJsU3RyaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwidXJsIiwiVVJMIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwiaXNNb2JpbGVEZXZpY2UiLCJhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cyIsImFkZEhhbmRsZXJBZ3JlZUNsaWNrIiwiZGlzYWdncmVtZW50Q2hhbmdlRWxlbWVudHMiLCJhZGRIYW5kbGVyRGlzYWdyZWVDbGljayIsInN1Ym1pdENoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlclN1Ym1pdENoYW5nZUNsaWNrIiwic3VzQ2hhbmdlRWxlbWVudHMiLCJhZGRIYW5kbGVyU3VibWl0U1VTQ2xpY2siLCJjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04iLCJnZXRTb3VyY2UiLCJzZXREYXRhIiwic3VzQnRuR3JvdXBFbGVtZW50cyIsImFkZEhhbmRsZXJTVVNRdWVzdGlvbkNsaWNrIiwic3VzTmFtZSIsInN1c0l0ZXJhdGlvbnMiLCJzZXRTdGF0ZUZvckdyb3VwIiwiaXNTdHVkeWNvbXBsZXRlZCIsInN0dWR5Q29tcGxldGVkIiwiU3R1ZHlBZ3JyZWVtZW50Iiwic3R1ZHlBZ3JyZWVkIiwic3luY01vdmUiLCJyZXF1aXJlIiwic3F1YXJlR3JpZEdlb0pTT04iLCJTcXVhcmVHcmlkR2VvSlNPTk9uZSIsIlNxdWFyZUdyaWRHZW9KU09OU2Vjb25kIiwiU3F1YXJlR3JpZEdlb0pTT05UaGlyZCIsImRlZmF1bHRNYXBTdHlsZSIsImRlZmF1bHRNYXBDZW50ZXIiLCJkZWZhdWx0TWF4Qm91bmRzIiwiZGVmYXVsdE1hcFpvb20iLCJkZWZhdWx0TWFwQ29udGFpbmVyIiwiZGFya01hcFN0eWxlIiwibGlnaHRNYXBTdHlsZSIsIm1hcGJveGdsIiwiTWFwYm94Q29tcGFyZSIsImFjY2Vzc1Rva2VuIiwicXVpZXQiLCJtYXAyIiwiZGVmYXVsdEdyZXlCb3giLCJzZWxlY3RlZEJveCIsIm1hcENoYW5nZUxheWVycyIsImxheWVycyIsIm1pbnpvb20iLCJtYXh6b29tIiwic2NoZW1lIiwidGlsZVNpemUiLCJib3VuZHMiLCJtYXhib3VuZHMiLCJtYXBDaGFuZ2VMYXllcnNPbmUiLCJtYXBDb250YWluZXIiLCJtYXBJbmRleCIsImVuZCIsImVuYWJsZWNsaWNrIiwibWFwU2V0dXAiLCJtYXAiLCJNYXAiLCJjb250YWluZXIiLCJzdHlsZSIsInpvb20iLCJzaG93Wm9vbSIsInRvdWNoRW5hYmxlZCIsImtleWJpbmRpbmdzIiwibWF4Qm91bmRzIiwib24iLCJmaXRNeUJvdW5kcyIsImFkZExheWVyIiwibWFrZVRNU0xheWVyIiwibWFrZUdyaWRPdXRMaW5lTGF5ZXIiLCJtYWtlR3JpZENvcnJlY3RMYXllciIsIm1ha2VHcmlkTGF5ZXIiLCJhZGRHcmlkQ2xpY2siLCJzZXRUaW1lb3V0Iiwib25sb2FkIiwiYWRkQ29udHJvbCIsIk5hdmlnYXRpb25Db250cm9sIiwic2hvd0NvbXBhc3MiLCJjZW50ZXIiLCJpbmRleENvdW50IiwiaW5kZXgiLCJzZXRJbnRlcnZhbCIsInNldExheW91dFByb3BlcnR5IiwibWFwQmVmb3JlQ29udGFpbmVyIiwibWFwQWZ0ZXJDb250YWluZXIiLCJtYXBDb21wYXJlV3JhcHBlcklEIiwiYmVmb3JlTWFwIiwiYWZ0ZXJNYXAiLCJjb21wYXJlIiwic2V0U2xpZGVyIiwibWFwQ2hhbmdlIiwidHlwZSIsInNvdXJjZSIsInRpbGVzIiwicGFpbnQiLCJkYXRhIiwibGF5b3V0IiwiZ2V0Q2FudmFzIiwiY3Vyc29yIiwiZmVhdHVyZSIsIm5ld0ZlYXR1cmUiLCJ0b2dnbGVTZWxlY3RlZEZlYXR1cmUiLCJzZWxlY3RlZEZlYXR1cmVzIiwibWFrZVNlbGVjdGVkRmVhdHVyZUdlb0pTT04iLCJuZXdTcXVhcmVHcmlkR2VvSlNPTiIsInVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyIsInN0b3JlU3F1YXJlR3JpZCIsInN0b3JlU2VsZWN0ZWRGZWF0dXJlIiwiTmV3U3F1YXJlR3JpZEdlb0pTT04iLCJmaXRCb3VuZHMiLCJwYWRkaW5nIiwic2VsZWN0ZWQiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiY3VycmVudEZlYXR1cmVJZHMiLCJjb25jYXQiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImRhdGFwaSIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJkYXRlIiwianNvbmRhdGEiLCJkYXRhQVBJVVJMIiwic2VhcmNoIiwiVVJMU2VhcmNoUGFyYW1zIiwiZmV0Y2giLCJTVEFURV9LRVkiLCJzdG9yYWdlQXZhaWxhYmxlIiwic3RvcmFnZSIsImxvY2FsU3RvcmFnZSIsInN0YXRlIiwiY2hlY2tTdGF0ZUV4aXN0cyIsImdldFN0YXRlIiwic3RvcmVPYmoiLCJuZXdTdGF0ZU9iaiIsInNldFN0YXRlIiwicGFyc2UiLCJnZXRJdGVtIiwiY2hlY2tJdGVtIiwic2V0SXRlbSIsIkJvb2xlYW4iLCJpdGVtIiwic3RhdGVTdHIiLCJnZXRTdGF0ZUFzU3RyaW5nIiwiaW5kZXhPZiIsIngiLCJyZW1vdmVJdGVtIiwiRE9NRXhjZXB0aW9uIiwiY29kZSIsIm5hbWUiLCJjaGVjayIsIm9iaiIsInVuZGVmaW5lZCIsIk9iamVjdCIsImtleXMiLCJjcnlwdG8iLCJnZXRSYW5kb21WYWx1ZXMiLCJVaW50MzJBcnJheSIsImpvaW4iLCJhIiwidGVzdCIsInN1YnN0ciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInZlbmRvciIsIm9wZXJhIiwicGxhY2VIb2xkZXJFbGVtZW50SUQiLCJ0ZW1wbGF0ZSIsImNvbXBvbmVudEVsZW0iLCJpbm5lckhUTUwiLCJldmVudE5hbWUiLCJkZXRhaWwiLCJldmVudCIsIkN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInN0YXRldGV4dCIsIml0ZXJhdGlvbnMiLCJuZXh0SXRlcmF0aW9uIiwidmFsdWVBcnJheSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFBQSxVQUFqQkUsVUFBaUIsdUVBQUosRUFBSTs7QUFDckQsVUFBTXJTLFdBQVNrUyxTQUFULEdBQXFCQyxVQUEzQjtBQUNBLFVBQU05UCxRQUFRdkUsTUFBTWEsWUFBTixNQUFzQnVULFNBQXRCLEdBQWtDQyxVQUFsQyxDQUFkO0FBQ0E7QUFDQXJVLFlBQU15QyxZQUFOLE1BQXNCMlIsU0FBdEIsR0FBa0NDLFVBQWxDLEVBQWdELENBQWhEO0FBQ0E7QUFDQTtBQUNBRSxpQkFBV25TLElBQVgsQ0FBZ0IsRUFBRUYsUUFBRixFQUFPcUMsWUFBUCxFQUFoQjtBQUNBLFVBQUk4UCxhQUFhLENBQWpCLEVBQW9CO0FBQ2xCLFlBQU1DLGdCQUFnQkQsYUFBYSxDQUFuQztBQUNBLGFBQUtyUyxjQUFMLENBQW9Cb1MsU0FBcEIsRUFBK0JFLGFBQS9CLEVBQThDQyxVQUE5QztBQUNBLGVBQU8sSUFBUDtBQUNEO0FBQ0Q7QUFDQTtBQUNBLFVBQU1sUyxZQUFZLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUFsQjtBQUNBdkMsWUFBTXlDLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0M4UixVQUFsQztBQUNBdlUsWUFBTXlDLFlBQU4sQ0FBbUIsa0JBQW5CLEVBQXVDSixTQUF2QztBQUNBLGFBQU8sSUFBUDtBQUNEIiwiZmlsZSI6ImluZGV4LmFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImQzMmYwZDYyZDhmMmM2MjhkZDM5XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJpbmRleFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvcnN+aW5kZXhcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50LWFsbFxcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMFxcXCI+XFxuXFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnQtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdHVkeSBQYXJ0aWNpcGF0aW9uIEFncmVlbWVudDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50XFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaC0xMDBcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIFRoYW5rIHlvdSBmb3IgdGFraW5nIHBhcnQgaW4gdGhpcyBzdHVkeS4gQnkgdXNpbmcgdGhlIGZvbGxvd2luZyB3ZWJzaXRlLFxcbiAgICAgICAgeW91IGFncmVlIHRvIHBhcnRpY2lwYXRlIGluIGEgc3R1ZHkgYWJvdXQgaG93IHBlb3BsZSB1c2Ugd2ViLXByZXNlbnRlZCBtYXBzLlxcbiAgICAgICAgV2Ugd2lsbCBjb2xsZWN0IGluZm9ybWF0aW9uIGFib3V0IHlvdXIgaW50ZXJhY3Rpb25zIHdpdGggdGhpcyBzaXRlIGJ1dCBub3QgYW55XFxuICAgICAgICBwZXJzb25hbGx5IGlkZW50aWZpYWJsZSBpbmZvcm1hdGlvbi4gVGhlIG9ubHkgcGVvcGxlIHdpdGggYWNjZXNzIHRvIHRoZSBzdHVkeVxcbiAgICAgICAgZGF0YSBhcmUgdGhlIHJlc2VhcmNoZXJzLiBIb3dldmVyLCB0aGUgZGF0YSB3aWxsIGJlIHN1bW1hcml6ZWQsIHNoYXJlZCwgYW5kXFxuICAgICAgICBkaXNzZW1pbmF0ZWQgaW4gdGFsa3MsIGJsb2dzLCBhbmQgcG9zc2libHkgcmVzZWFyY2ggam91cm5hbHMuIFRoZXJlIGlzIG5vXFxuICAgICAgICBjb3N0IHRvIHlvdSB0byBwYXJ0aWNpcGF0ZSBpbiB0aGlzIHJlc2VhcmNoIHN0dWR5LCBhbmQgeW91IHdpbGwgbm90IGJlXFxuICAgICAgICBjb21wZW5zYXRlZC4gVGhlcmUgYXJlIG5vIGtub3duIHJpc2tzIGluIHRoZSBmb2xsb3dpbmcgdGFza3MuXFxuICAgICAgICA8YnIgLz48YnIgLz5cXG4gICAgICAgIEJ5IGFncmVlaW5nIHRvIHRoaXMsIHlvdSBoYXZlIGFja25vd2xlZGdlZCB0aGF0IHlvdSBoYXZlIHJlYWQgdGhlXFxuICAgICAgICBjb250ZW50cyBvZiB0aGlzIGNvbnNlbnQsIGFyZSBhbiBhZHVsdCBvdmVyIDE4IHllYXJzIG9mIGFnZSwgYW5kXFxuICAgICAgICB5b3UgYXJlIGdpdmluZyBjb25zZW50IHRvIHBhcnRpY2lwYXRlIGluIHRoaXMgc3R1ZHkuXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTVcXFwiPkRvIHlvdSB3YW50IHRvIHBhcnRpY2lwYXRlPzwvZGl2PlxcblxcbiAgPHNwYW4gY2xhc3M9XFxcIm10LTMgaC1hdXRvIGQtZmxleFxcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcImFnZ3JlZS1idXR0b25cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZCBtci0zXFxcIiA+XFxuICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS1jaGVja1xcXCI+PC9pPlxcbiAgICAgIFllc1xcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiBpZD1cXFwiZGlhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXhsaWdodCBidG4tYWdncmVlbWVudCB3LTIwIGFsaWduLXNlbGYtZW5kXFxcIiA+XFxuICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS10aW1lcy1jaXJjbGVcXFwiPjwvaT5cXG4gICAgICBOb1xcbiAgICA8L2J1dHRvbj5cXG4gIDwvc3Bhbj5cXG5cXG4gIDwhLS0gPGRpdiBpZD1cXFwiYWdncmVlLWRpc2FnZ3JlLXdyYXBwZXJcXFwiIGNsYXNzPVxcXCJtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50LXN1YlxcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyBhbGlnbi1zZWxmLWNlbnRlciBwYi00IHB5LTJcXFwiPkRvIHlvdSB3YW50IHRvIHBhcnRpY2lwYXRlPzwvZGl2PlxcbiAgICA8YnV0dG9uIGlkPVxcXCJhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmQgbXItM1xcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtY2hlY2tcXFwiPjwvaT5cXG4gICAgICBZZXNcXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b24gaWQ9XFxcImRpYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi14bGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZFxcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtdGltZXMtY2lyY2xlXFxcIj48L2k+XFxuICAgICAgTm9cXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj4gLS0+XFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLWVuZFxcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDBcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwXFxcIj5cXG4gICAgVGhhbmtzIGZvciBwYXJ0aWNpcGF0aW5nIVxcbiAgPC9kaXY+XFxuXFxuICA8IS0tIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItZW5kXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci1lbmRcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBpZD0nY29tcGFyZS1lbmQtd3JhcHBlcic+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtYy1lbmRhXFxcIiBjbGFzcz1cXFwibXktMyBteC0zXFxcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1jLWVuZGJcXFwiIGNsYXNzPVxcXCJteS0zIG14LTNcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgIC0tPlxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci1lbmRcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMCBtbC0zXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBweC0wIHctMTAwXFxcIiA+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHctMTAwXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtbWQtMTIgcHgtMCBweS0xIHctMTAwXFxcIiA+XFxuICAgICAgICAgIFlvdXIgYW5zd2VyXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1lbmRhXFxcIiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IHB4LTAgbWFwLWVuZGEgZW5kbWFwXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgbXQtNCB3LTEwMFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgcHgtMCBweS0xIHctMTAwXFxcIiA+XFxuICAgICAgICAgIE91ciBhbnN3ZXJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLWVuZGJcXFwiIGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTYgcHgtMCBtYXAtZW5kYiBlbmRtYXBcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LWRpc3NhZ2dyZWVcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+VGhhbmtzIGFueXdheSE8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0dWR5LWRpc3NhZ2dyZWUtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIFRoYW5rIHlvdSBmb3IgY29uc2lkZXJpbmcgYmVpbmcgYSBwYXJ0aWNpcGFudC4gSWYgeW91IGNoYW5nZSB5b3VyXFxuICAgIG1pbmQgeW91IGNhbiBhbHdheXMgcmV2aWV3IHRoZSZuYnNwOzxhIGhyZWY9XFxcIlxcXCIgPiBhZ2dyZW1lbnQgPC9hPiZuYnNwO2FnYWluIVxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLW1hcC0wXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMSBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgVGhlIG1hcCBiZWxvdyBjb250YWlucyB0d28gaW1hZ2VzIHRoYXQgYXJlIGRpZmZlcmVudC4gVGhlIHR3byBpbWFnZXNcXG4gICAgd2lsbCB0dXJuIG9uIGFuZCBvZmYgYXQgYSByZWd1bGFyIGludGVydmFsLiBDbGljayBvbiBhbnkgYm94IHdoZXJlIHlvdVxcbiAgICBiZWxpZXZlIHRoZSB0d28gaW1hZ2VzIGFyZSBkaWZmZXJlbnQuIFRoZSBib3hlcyB5b3UgY2xpY2sgb24gd2lsbCBjaGFuZ2VcXG4gICAgb3JhbmdlIGFuZCB3aWxsIGJlY29tZSB5b3VyIGFuc3dlcnMgd2hlbiB5b3UgY2xpY2sgc3VibWl0LiBDbGlja2luZyBvbiBhblxcbiAgICBvcmFuZ2UgYm94IHdpbGwgcmVtb3ZlIGl0IGZyb20geW91ciBzZWxlY3Rpb24uXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItMVxcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItMVxcXCIgY2xhc3M9XFxcInJvdyBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJtYXAtMVxcXCIgY2xhc3M9XFxcIm15LTMgbXgtM1xcXCI+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMiBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgU3VibWl0IHRoZSBzZWxlY3RlZCBib3hlcyAoaW4gb3JhbmdlKSBhcyB5b3VyIGFuc3dlciB0byBhcmVhcyB0aGF0IGhhdmUgY2hhbmdlZC5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTBcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiUGxlYXNlIHNlYXJjaCBmb3IgbG9jYXRpb24gYW5kIGRyYXcgYSBjaXJjbGUgZmlyc3QhXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtbWFwLTFcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAxIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBUaGUgdHdvIG1hcHMgYmVsb3cgY29udGFpbiBpbWFnZXMgdGhhdCBhcmUgZGlmZmVyZW50LiBDbGljayBvbiBhbnkgYm94ZXMgd2hlcmVcXG4gICAgeW91IGJlbGlldmUgdGhlIHR3byBpbWFnZXMgYXJlIGRpZmZlcmVudC4gVGhlIGJveGVzIHlvdSBjbGljayBvbiB3aWxsIGNoYW5nZVxcbiAgICBvcmFuZ2UgYW5kIHdpbGwgYmVjb21lIHlvdXIgYW5zd2VycyB3aGVuIHlvdSBjbGljayBzdWJtaXQuIENsaWNraW5nIG9uIGFuXFxuICAgIG9yYW5nZSBib3ggd2lsbCByZW1vdmUgaXQgZnJvbSB5b3VyIHNlbGVjdGlvbi5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci0yXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtbC0zIG10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTJcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IGR1YWxtYXBzIGQtZmxleFxcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtMmFcXFwiIGNsYXNzPVxcXCJteS0zIG14LTAgbXgtc20tMCBteC1tZC0zIG1hcC0yYVxcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IGR1YWxtYXBzIGQtZmxleFxcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtMmJcXFwiIGNsYXNzPVxcXCJteS0zIG14LTAgbXgtc20tMCBteC1tZC0zIG1hcC0yYlxcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMiBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgU3VibWl0IHRoZSBzZWxlY3RlZCBib3hlcyAoaW4gb3JhbmdlKSBhcyB5b3VyIGFuc3dlciB0byBhcmVhcyB0aGF0IGhhdmUgY2hhbmdlZC5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiUGxlYXNlIHNlYXJjaCBmb3IgbG9jYXRpb24gYW5kIGRyYXcgYSBjaXJjbGUgZmlyc3QhXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtbWFwLTJcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAxIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBUaGUgbWFwIGJlbG93IGNvbnRhaW5zIHR3byBpbWFnZXMgdGhhdCBhcmUgZGlmZmVyZW50LiBEcmFnIHRoZSB2ZXJ0aWNhbCBiYXIgc2lkZS10by1zaWRlXFxuICAgIHRvIHJldmVhbCB0aGUgaW1hZ2VzLiBDbGljayBvbiBhbnkgYm94IHdoZXJlIHlvdSBiZWxpZXZlIHRoZSB0d28gaW1hZ2VzIGFyZSBkaWZmZXJlbnQuIFRoZVxcbiAgICBib3hlcyB5b3UgY2xpY2sgb24gd2lsbCBjaGFuZ2Ugb3JhbmdlIGFuZCB3aWxsIGJlY29tZSB5b3VyIGFuc3dlcnMgd2hlbiB5b3UgY2xpY2tcXG4gICAgc3VibWl0LiBDbGlja2luZyBvbiBhbiBvcmFuZ2UgYm94IHdpbGwgcmVtb3ZlIGl0IGZyb20geW91ciBzZWxlY3Rpb24uXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItM1xcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItM1xcXCIgY2xhc3M9XFxcInJvdyBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGNvbXBhcmVcXFwiPlxcbiAgICAgIDxkaXYgaWQ9J2NvbXBhcmUtd3JhcHBlcic+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtM2FcXFwiIGNsYXNzPVxcXCJteC0zXFxcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC0zYlxcXCIgY2xhc3M9XFxcIm14LTNcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDIgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIFN1Ym1pdCB5b3Ugc2VsZWN0ZWQgYm94ZXMgKGluIG9yYW5nZSkgYXMgeW91ciBhbnN3ZXIgdG8gYXJlYXMgdGhhdCBoYXZlIGNoYW5nZWQuXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLXN1cy0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlBsZWFzZSBzZWFyY2ggZm9yIGxvY2F0aW9uIGFuZCBkcmF3IGEgY2lyY2xlIGZpcnN0IVxcXCI+XFxuICAgICAgU3VibWl0XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLXN1c1xcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDMgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIFJldmlldyB0aGUgbWFwIGFuZCB0aGUgYW5pbWF0aW9uIG9mIHRoZSB0d28gaW1hZ2VzLiBUaGVuIGNsaWNrIG9uIGFueVxcbiAgICBib3ggd2hlcmUgeW91IGJlbGlldmUgY2hhbmdlIG9jY3VycmVkLiAxIGluZGljYXRlcyB5b3Ugc3Ryb25nbHkgZGlzYWdyZWVcXG4gICAgYW5kIDUgaW5kaWNhdGVzIHlvdSBzdHJvbmdseSBhZ2dyZWUuXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInBsLTEgcHQtMyBwYi0zXFxcIj5cXG4gICAgJm5ic3A7XFxuICA8L2Rpdj5cXG5cXG4gIDwhLS0gPGRpdiBjbGFzcz1cXFwicm93IHctMTAwIHAtMyBtLTNcXFwiPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWxlYWQgY29sLTZcXFwiPlxcbiAgICAgICZuYnNwXFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWFncmVlIHRleHQtbGVmdCBjb2wtM1xcXCI+XFxuICAgICAgICBTdHJvbmdseSBkaXNhZ3JlZVxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZSB0ZXh0LXJpZ2h0IGNvbC0zXFxcIj5cXG4gICAgICAgIFN0cm9uZ2x5IGFncmVlXFxuICAgIDwvZGl2PlxcblxcbiAgPC9kaXY+IC0tPlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICAxLiZuYnNwOyZuYnNwO0kgdGhpbmsgdGhhdCBJIHdvdWxkIGxpa2UgdG8gdXNlIHRoaXMgc2l0ZSBmcmVxdWVudGx5XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtMVxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBidG4tc3VzIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMi4mbmJzcDsmbmJzcDtJIGZvdW5kIHRoZSBzaXRlIHVubmVjZXNzYXJpbHkgY29tcGxleFxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTJcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICAzLiZuYnNwOyZuYnNwO0kgdGhvdWdodCB0aGUgc2l0ZSB3YXMgZWFzeSB0byB1c2VcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0zXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi0zIHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDQuJm5ic3A7Jm5ic3A7SSB0aGluayB0aGF0IEkgd291bGQgbmVlZCB0aGUgc3VwcG9ydCBvZiBhIHRlY2huaWNhbCBwZXJzb24gdG8gYmUgYWJsZSB0byB1c2UgdGhpcyBzaXRlXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtNFxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwdC0yXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItMyBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDUuJm5ic3A7Jm5ic3A7SSBmb3VuZCB0aGUgdmFyaW91cyBmdW5jdGlvbnMgaW4gdGhpcyBzaXRlIHdlcmUgd2VsbCBpbnRlZ3JhdGVkXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtNVxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwdC0yXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItMyBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA2LiZuYnNwOyZuYnNwO0kgdGhvdWdodCB0aGVyZSB3YXMgdG9vIG11Y2ggaW5jb25zaXN0ZW5jeSBpbiB0aGlzIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy02XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi0zIHN1cy1vZGRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgNy4mbmJzcDsmbmJzcDtJIHdvdWxkIGltYWdpbmUgdGhhdCBtb3N0IHBlb3BsZSB3b3VsZCBsZWFybiB0byB1c2UgdGhpcyBzaXRlIHZlcnkgcXVpY2tseVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTdcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNy0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXJlcGxhY2UtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1yZXBsYWNlLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcmVwbGFjZS00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXJlcGxhY2UtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwdC0yXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItMyBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA4LiZuYnNwOyZuYnNwO0kgZm91bmQgdGhlIHNpdGUgdmVyeSBjdW1iZXJzb21lIHRvIHVzZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLThcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA5LiZuYnNwOyZuYnNwO0kgZmVsdCB2ZXJ5IGNvbmZpZGVudCB1c2luZyB0aGUgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTlcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMTAuJm5ic3A7Jm5ic3A7SSBuZWVkZWQgdG8gbGVhcm4gYSBsb3Qgb2YgdGhpbmdzIGJlZm9yZSBJIGNvdWxkIGdldCBnb2luZyB3aXRoIHRoaXMgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTEwXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctMTAwIGQtZmxleCBtdC00XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwicHQtc20tMiBwdC1tZC0wIGNvbC0xMiBjb2wtc20tMTIgY29sLW1kLTdcXFwiPlxcbiAgICAgICZuYnNwO1xcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwicHQtc20tMiBwdC1tZC0wIGNvbC0xMiBjb2wtc20tMTIgY29sLW1kLTVcXFwiPlxcbiAgICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tZW5kXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlBsZWFzZSBzZWFyY2ggZm9yIGxvY2F0aW9uIGFuZCBkcmF3IGEgY2lyY2xlIGZpcnN0IVxcXCI+XFxuICAgICAgICBTdWJtaXQgYW5kIGZpbmlzaFxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbjwvZGl2PlxcblwiOyIsImltcG9ydCB7IFJlY29yZFN0dWR5RGF0YSB9IGZyb20gJy4vcmVjb3JkLXN0dWR5LWRhdGEnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IFV0aWxpdHkgfSBmcm9tICcuL3V0aWxpdHknO1xuXG5jb25zdCByZWNvcmRTdHVkeURhdGEgPSBuZXcgUmVjb3JkU3R1ZHlEYXRhKCk7XG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuZXhwb3J0IGNsYXNzIEhhbmRsZXJzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kaXNwbGF5Tm9uZUNsYXNzID0gJ2Qtbm9uZSc7XG4gICAgdGhpcy5zZWxlY3RlZENsYXNzID0gJ3NlbGVjdGVkJztcblxuICAgIC8vIHN0dWR5IGFnZ3JlZW1lbnRcbiAgICB0aGlzLnN0dWR5QWdncmVlbWVudEVsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1tYXAtJ107XG4gICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSA9IFsnYmxvY2stc3R1ZHktYWdncmVlbWVudC1ob2xkZXInXTtcblxuICAgIC8vIHN0dWR5IGRpc2FnZ3JlZW1lbnRcbiAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzQWRkID0gWydzdHVkeS1kaXNzYWdncmVlJ107XG4gICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSA9IFsnYmxvY2stc3R1ZHktYWdncmVlbWVudC1ob2xkZXInXTtcblxuICAgIC8vIHN0dWR5IHF1ZXN0aW9ucyBtYXAgY2hhbmdlXG4gICAgdGhpcy5zdHVkeVF1ZXN0aW9uRWxlbWVudHNBZGQgPSBbJ3N0dWR5LXByb2dyZXNzLXN1cycsICdibG9jay1zdHVkeS1zdXMtaG9sZGVyJ107XG4gICAgdGhpcy5zdHVkeVF1ZXN0aW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzUmVtb3ZlID0gW2BzdHVkeS1wcm9ncmVzcy1tYXAtJHt0aGlzLnN0dWR5UXVlc3Rpb259YCwgJ21hcC1hY3Rpb24taG9sZGVyJ107XG5cbiAgICAvLyBTVVMgc2NvcmVzXG4gICAgdGhpcy5zdHVkeVNVU0VsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1lbmQnLCAnYmxvY2stc3R1ZHktY29tcGxldGVkLWhvbGRlciddO1xuICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c1JlbW92ZSA9IFsnc3R1ZHktcHJvZ3Jlc3Mtc3VzJywgJ2Jsb2NrLXN0dWR5LXN1cy1ob2xkZXInXTtcbiAgICB0aGlzLnN1c1N0b3JhZ2VLZXlzID0gWydzdXMtcXVlc3Rpb24tMScsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTInLFxuICAgICAgJ3N1cy1xdWVzdGlvbi0zJyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNCcsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTUnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi02JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNycsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTgnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi05JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tMTAnXTtcbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3Igc3VibWl0dGluZyBjaGFuZ2UgZGF0YSBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIGVsZW1lbnRJRCAtIEhUTUwgZWxlbWVudCBJRFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlclN1Ym1pdENoYW5nZUNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuXG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gYWRkIGVsZW1lbnRzIHRvIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBncmlkTmFtZSA9ICdncmlkLWJveC0nO1xuICAgICAgICBjb25zdCBncmlkSXRlcmF0aW9ucyA9IDQyO1xuICAgICAgICB1dGlsaXR5LnNldEFQSUZvckdyb3VwKGdyaWROYW1lLCBncmlkSXRlcmF0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIHN1Ym1pdHRpbmcgc3VzIHNjb3JlXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTdWJtaXRTVVNDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBhZGQgZWxlbWVudHMgdG8gVUlcbiAgICAgICAgdGhpcy5zdHVkeVNVU0VsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3VzVmFsdWVBcnJheSA9IFtdO1xuICAgICAgICB0aGlzLnN1c1N0b3JhZ2VLZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQW5zd2VyID0gc3RvcmUuZ2V0U3RhdGVJdGVtKGtleSk7XG4gICAgICAgICAgc3VzVmFsdWVBcnJheS5wdXNoKHsga2V5LCBxdWVzdGlvbkFuc3dlciB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGRhdGVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgdXRpbGl0eS50cmlnZ2VyRXZlbnQoJ3N1cy1jbGlja2VkJywgJ3N1cy1jbGlja2VkJyk7XG5cbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzJywgc3VzVmFsdWVBcnJheSk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy10aW1lJywgZGF0ZXN0YW1wKTtcblxuICAgICAgICBIYW5kbGVycy5yZWNvcmRBZ2dyZWVkKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyByZWNvcmREaXNhZ2dyZWVkKCkge1xuICAgIGNvbnN0IHV1aWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkIHRpbWUnKTtcbiAgICBjb25zdCBzdHVkeUFncmVlbWVudFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG4gICAgY29uc3Qgc3R1ZHlBZ3JlZW1lbnRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScpO1xuICAgIGNvbnN0IGNhbXBhaWduUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdjYW1wYWlnbicpO1xuICAgIGNvbnN0IG1vYmlsZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbW9iaWxlJyk7XG4gICAgY29uc3QgbWFwVmVyc2lvblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBzdHVkeVF1ZXN0aW9uUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMnKTtcbiAgICBjb25zdCBncmlkYW5zd2Vyc1JlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMnKTtcbiAgICBjb25zdCBncmlkY29ycmVjdFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcblxuICAgIGNvbnN0IGdyaWRjb3JyZWN0UmVjUHJvcHMgPSBbXTtcblxuICAgIGdyaWRjb3JyZWN0UmVjLmZlYXR1cmVzLmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgZ3JpZGNvcnJlY3RSZWNQcm9wcy5wdXNoKHtcbiAgICAgICAga2V5OiBgZ3JpZC1ib3gtJHt2YWwucHJvcGVydGllcy5pZH1gLFxuICAgICAgICB2YWx1ZTogdmFsLnByb3BlcnRpZXMudlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBqc29uRGF0YSA9IHtcbiAgICAgIHV1aWQ6IHV1aWRSZWMsXG4gICAgICBzdHVkeV9zdGFydGVkOiBzdHVkeVN0YXJ0ZWRSZWMsXG4gICAgICBzdHVkeV9zdGFydGVkX3RpbWU6IHN0dWR5U3RhcnRlZFRpbWVSZWMsXG4gICAgICBzdHVkeV9hZ3JlZW1lbnQ6IHN0dWR5QWdyZWVtZW50UmVjLFxuICAgICAgc3R1ZHlfYWdyZWVtZW50X3RpbWU6IHN0dWR5QWdyZWVtZW50VGltZVJlYyxcbiAgICAgIGNhbXBhaWduOiBKU09OLnN0cmluZ2lmeShjYW1wYWlnblJlYyksXG4gICAgICBtb2JpbGU6IEpTT04uc3RyaW5naWZ5KG1vYmlsZVJlYyksXG4gICAgICBtYXBfdmVyc2lvbjogbWFwVmVyc2lvblJlYyxcbiAgICAgIGdyaWRfY29ycmVjdDogSlNPTi5zdHJpbmdpZnkoZ3JpZGNvcnJlY3RSZWNQcm9wcyksXG4gICAgICBncmlkX2Fuc3dlcnM6IEpTT04uc3RyaW5naWZ5KGdyaWRhbnN3ZXJzUmVjKSxcbiAgICAgIGdyaWRhbnN3ZXJzX3RpbWU6ICcnLFxuICAgICAgc3R1ZHlfcXVlc3Rpb246IHN0dWR5UXVlc3Rpb25SZWMsXG4gICAgICBzdXNfYW5zd2VyczogSlNPTi5zdHJpbmdpZnkoc3VzYW5zd2Vyc1JlYyksXG4gICAgICBzdXNhbnN3ZXJzX3RpbWU6ICcnXG4gICAgfTtcblxuICAgIHJlY29yZFN0dWR5RGF0YS5zZXRFdmVudEFsbChqc29uRGF0YSk7XG4gIH1cblxuICBzdGF0aWMgcmVjb3JkQWdncmVlZCgpIHtcbiAgICBjb25zdCB1dWlkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJyk7XG4gICAgY29uc3Qgc3R1ZHlTdGFydGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkJyk7XG4gICAgY29uc3Qgc3R1ZHlTdGFydGVkVGltZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCB0aW1lJyk7XG4gICAgY29uc3Qgc3R1ZHlBZ3JlZW1lbnRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xuICAgIGNvbnN0IHN0dWR5QWdyZWVtZW50VGltZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50LXRpbWUnKTtcbiAgICBjb25zdCBjYW1wYWlnblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnY2FtcGFpZ24nKTtcbiAgICBjb25zdCBtb2JpbGVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21vYmlsZScpO1xuICAgIGNvbnN0IG1hcFZlcnNpb25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3Qgc3R1ZHlRdWVzdGlvblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICBjb25zdCBzdXNhbnN3ZXJzUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzJyk7XG4gICAgY29uc3Qgc3VzYW5zd2Vyc0RhdGVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtdGltZScpO1xuICAgIGNvbnN0IGdyaWRhbnN3ZXJzUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdncmlkYW5zd2VycycpO1xuICAgIGNvbnN0IGdyaWRhbnN3ZXJzRGF0ZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMtdGltZScpO1xuICAgIGNvbnN0IGdyaWRjb3JyZWN0UmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuXG4gICAgY29uc3QgZ3JpZGNvcnJlY3RSZWNQcm9wcyA9IFtdO1xuXG4gICAgZ3JpZGNvcnJlY3RSZWMuZmVhdHVyZXMuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICBncmlkY29ycmVjdFJlY1Byb3BzLnB1c2goe1xuICAgICAgICBrZXk6IGBncmlkLWJveC0ke3ZhbC5wcm9wZXJ0aWVzLmlkfWAsXG4gICAgICAgIHZhbHVlOiB2YWwucHJvcGVydGllcy52XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGpzb25EYXRhID0ge1xuICAgICAgdXVpZDogdXVpZFJlYyxcbiAgICAgIHN0dWR5X3N0YXJ0ZWQ6IHN0dWR5U3RhcnRlZFJlYyxcbiAgICAgIHN0dWR5X3N0YXJ0ZWRfdGltZTogc3R1ZHlTdGFydGVkVGltZVJlYyxcbiAgICAgIHN0dWR5X2FncmVlbWVudDogc3R1ZHlBZ3JlZW1lbnRSZWMsXG4gICAgICBzdHVkeV9hZ3JlZW1lbnRfdGltZTogc3R1ZHlBZ3JlZW1lbnRUaW1lUmVjLFxuICAgICAgY2FtcGFpZ246IEpTT04uc3RyaW5naWZ5KGNhbXBhaWduUmVjKSxcbiAgICAgIG1vYmlsZTogSlNPTi5zdHJpbmdpZnkobW9iaWxlUmVjKSxcbiAgICAgIG1hcF92ZXJzaW9uOiBtYXBWZXJzaW9uUmVjLFxuICAgICAgZ3JpZF9jb3JyZWN0OiBKU09OLnN0cmluZ2lmeShncmlkY29ycmVjdFJlY1Byb3BzKSxcbiAgICAgIGdyaWRfYW5zd2VyczogSlNPTi5zdHJpbmdpZnkoZ3JpZGFuc3dlcnNSZWMpLFxuICAgICAgZ3JpZGFuc3dlcnNfdGltZTogZ3JpZGFuc3dlcnNEYXRlUmVjLFxuICAgICAgc3R1ZHlfcXVlc3Rpb246IHN0dWR5UXVlc3Rpb25SZWMsXG4gICAgICBzdXNfYW5zd2VyczogSlNPTi5zdHJpbmdpZnkoc3VzYW5zd2Vyc1JlYyksXG4gICAgICBzdXNhbnN3ZXJzX3RpbWU6IHN1c2Fuc3dlcnNEYXRlUmVjXG4gICAgfTtcblxuICAgIHJlY29yZFN0dWR5RGF0YS5zZXRFdmVudEFsbChqc29uRGF0YSk7XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIGFnZ3JlZWluZyB0byBkbyBzdHVkeVxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlckFncmVlQ2xpY2soZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3Qgc3R1ZHlWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgICAgICBjb25zdCBhZ3JlZW1lbnRUaW1lU3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgICAgLy8gYWRkIGVsZW1lbnRzIHRvIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlBZ2dyZWVtZW50RWxlbWVudHNBZGQuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtlbGVtZW50VUlJRH0ke3N0dWR5VmVyc2lvbn1gKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5QWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlsaXR5LnRyaWdnZXJFdmVudCgnYWdncmVlLWNsaWNrZWQnLCAnaGFuZGxlQWdyZWVDbGljaycpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIHRydWUpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudC10aW1lJywgYWdyZWVtZW50VGltZVN0YW1wKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3IgRElTYWdncmVlaW5nIHRvIGRvIHN0dWR5XG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyRGlzYWdyZWVDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBhZ3JlZW1lbnRUaW1lU3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGFkZCBkaXNwbGF5IG5vbmUgY2xhc3MgaWYgdGhlIGNsYXNzIGRvZXMgbm90IGV4c2lzdFxuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGR1cGxpY2F0ZSBjbGFzc2VzIGFyZSBub3QgYWRkZWRcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5kaXNwbGF5Tm9uZUNsYXNzKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5hZGQodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxpdHkudHJpZ2dlckV2ZW50KCdkaXNhZ2dyZWUtY2xpY2tlZCcsICdoYW5kbGVBZ3JlZUNsaWNrJyk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50JywgZmFsc2UpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudC10aW1lJywgYWdyZWVtZW50VGltZVN0YW1wKTtcblxuICAgICAgICBIYW5kbGVycy5yZWNvcmREaXNhZ2dyZWVkKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIGluZGl2aWR1YWwgc3VzIHNjb3JlIHF1ZXN0aW9ucyB0byBsb2NhbCBzdG9yYWdlXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTVVNRdWVzdGlvbkNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIHRoaXMuc2VsZWN0ZWRDbGFzcyA9ICdzZWxlY3RlZCc7XG5cbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBnZXQgcGFyZW50IGVsZW1lbnQgd2hpY2ggaXMgYnV0dG9uIGdyb3VwXG4gICAgICAgIGNvbnN0IHBhcmVudEJ0bkdyb3VwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIEhhbmRsZXJzLnRvZ2dsZUJ1dHRvbkdyb3VwQnV0dHRvbnNPZmYocGFyZW50QnRuR3JvdXAsIHRoaXMuc2VsZWN0ZWRDbGFzcyk7XG5cbiAgICAgICAgY29uc3QgcXVlc3Rpb25UZXh0ID0gcGFyZW50QnRuR3JvdXAuaWQucmVwbGFjZSgnYnRuLWdyb3VwLXN1cy0nLCAnc3VzLXF1ZXN0aW9uLScpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0ocXVlc3Rpb25UZXh0LCBOdW1iZXIoZS50YXJnZXQuaW5uZXJUZXh0KSk7XG5cbiAgICAgICAgLy8gYWRkIHN1cyBxdWVzdGlvbiBhbnN3ZXIgdG8gc2VsZWN0ZWQgdG8gY2xhc3NcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuc2VsZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuY2xhc3NMaXN0LmFkZCh0aGlzLnNlbGVjdGVkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyByZW1vdmVzIHRoZSBzZWxlY3RlZCBjbGFzcyBcInVuc2xlY3RzXCIgYWxsIHRoZSBidXR0b25zXG4gIC8vICBpbiBhIGJ1dHRvbiBncm91cFxuICAvL1xuICAvLyBAcGFyYW0gYnRuR3JvdXAgLSBIVE1MIGVsZW1lbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHN0YXRpYyB0b2dnbGVCdXR0b25Hcm91cEJ1dHR0b25zT2ZmKGJ0bkdyb3VwLCBzZWxlY3RlZENsYXNzKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBidG5Hcm91cC5jaGlsZE5vZGVzO1xuICAgIC8vIG1ha2Ugc3VyZSBjaGlsZHJlbiBpcyB2YWxpdWQgb2JqZWN0XG4gICAgaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3QoY2hpbGRyZW4pKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSBhcmUgY2hpbGRlcmVuIGJ1dHRvbnNcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFsuLi5jaGlsZHJlbl07XG4gICAgICBjaGlsZHJlbkFycmF5LmZvckVhY2goKGNoaWxkSXRlbSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGRJdGVtLmNsYXNzTGlzdCkge1xuICAgICAgICAgIGNoaWxkSXRlbS5jbGFzc0xpc3QucmVtb3ZlKHNlbGVjdGVkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbi8vIFRPRE9TXG4vLyBCYWNrIHRvIGdyaWQgYnV0dG9uIHdoZW4gb24gc3VzPyBtYXliZSBvciB1c2UgbmF2Z28gdG8gY3JlYXRlIHBhZ2Vcbi8vIHBsYXkgcGF1c2Ugb24gYW5pbWF0aW9uIC0gbWF5YmVcbmltcG9ydCB7IGxpYnJhcnksIGRvbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFyIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtcmVndWxhci1zdmctaWNvbnMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IE1hcEJveENvbmZpZyB9IGZyb20gJy4vbWFwLWNvbmZpZyc7XG5pbXBvcnQgeyBVdGlsaXR5IH0gZnJvbSAnLi91dGlsaXR5JztcbmltcG9ydCB7IEhhbmRsZXJzIH0gZnJvbSAnLi9oYW5kbGVycyc7XG5cbmltcG9ydCBibG9ja1N0dWR5QWdncmVlbWVudCBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1hZ2dyZWVtZW50Lmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlEaXNzYWdncmVlIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVF1ZXN0aW9uMSBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0xLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlRdWVzdGlvbjIgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMi5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5UXVlc3Rpb24zIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVNVUyBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1zdXMuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeUNvbXBsZXRlZCBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1jb21wbGV0ZWQuaHRtbCc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcblxuLy8gc3R1ZHkgY29uc3RyYWludHMgbnVtYmVyIG9mIHF1ZXN0aW9ucyBzdGFydHMgd2l0aCAwXG5jb25zdCBzdHVkeU1pbk9uZSA9IDA7XG5jb25zdCBzdHVkeU1heE9uZSA9IDI7XG5jb25zdCBzdHVkeVZlcnNpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoc3R1ZHlNYXhPbmUgLSBzdHVkeU1pbk9uZSArIDEpICsgc3R1ZHlNaW5PbmUpO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicsIHN0dWR5VmVyc2lvbik7XG5cbi8vIHN0dWR5IGNvbnN0cmFpbnRzIG51bWJlciBvZiBxdWVzdGlvbnMgc3RhcnRzIHdpdGggMFxuY29uc3QgbWFwTWluT25lID0gMDtcbmNvbnN0IG1hcE1heE9uZSA9IDI7XG5jb25zdCBtYXBWZXJzaW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1hcE1heE9uZSAtIG1hcE1pbk9uZSArIDEpICsgbWFwTWluT25lKTtcbnN0b3JlLnNldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nLCBtYXBWZXJzaW9uKTtcblxuY29uc3QgdXRpbGl0eSA9IG5ldyBVdGlsaXR5KCk7XG5jb25zdCBoYW5kbGVycyA9IG5ldyBIYW5kbGVycygpO1xuY29uc3QgbWFwQm94Q29uZmlnID0gbmV3IE1hcEJveENvbmZpZygpO1xuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCd1dWlkJywgdXRpbGl0eS51dWlkKCkudG9TdHJpbmcoKSk7XG59XG5cbi8vIEtpY2tzIG9mZiB0aGUgcHJvY2VzcyBvZiBmaW5kaW5nIDxpPiB0YWdzIGFuZCByZXBsYWNpbmcgd2l0aCA8c3ZnPlxuLy8gYWRkZXMgc3VwcG9ydCBmb3IgZm9udGF3ZXNvbWVcbmxpYnJhcnkuYWRkKGZhcywgZmFyKTtcbmRvbS53YXRjaCgpO1xuXG4vLyBsb2FkIG9ubHkgdGhlIGJsb2NrIG5lZWRlZFxudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1hZ2dyZWVtZW50LWhvbGRlcicsIGJsb2NrU3R1ZHlBZ2dyZWVtZW50KTtcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktZGlzc2FnZ3JlZS1ob2xkZXInLCBibG9ja1N0dWR5RGlzc2FnZ3JlZSk7XG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXN1cy1ob2xkZXInLCBibG9ja1N0dWR5U1VTKTtcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktY29tcGxldGVkLWhvbGRlcicsIGJsb2NrU3R1ZHlDb21wbGV0ZWQpO1xuXG5sZXQgbWFwMTtcbmxldCBtYXAyYTtcbmxldCBtYXAyYjtcbmxldCBtYXAzQXJyO1xubGV0IG1hcGRlZjtcblxuc3dpdGNoIChzdHVkeVZlcnNpb24pIHtcbiAgY2FzZSAwOiAvLyBhbmltYXRlXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0xLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjEpO1xuICAgIG1hcDEgPSBtYXBCb3hDb25maWcubWFrZUFuaW1hdGVNYXAoJ21hcC0xJywgMCk7XG4gICAgYnJlYWs7XG4gIGNhc2UgMTogLy8gc2lkZSBieSBzaWRlXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0yLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjIpO1xuICAgIG1hcDJhID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC0yYScsIDApO1xuICAgIG1hcDJiID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC0yYicsIDEpO1xuICAgIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXAyYSwgbWFwMmIpO1xuICAgIGJyZWFrO1xuICBjYXNlIDI6IC8vIHNsaWRlclxuICAgIHV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktcXVlc3Rpb24tMy1ob2xkZXInLCBibG9ja1N0dWR5UXVlc3Rpb24zKTtcbiAgICBtYXAzQXJyID0gbWFwQm94Q29uZmlnLm1ha2VDb21wYXJlTWFwKCdtYXAtM2EnLCAnbWFwLTNiJywgJ2NvbXBhcmUtd3JhcHBlcicpO1xuICAgIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXAzQXJyWzBdLCBtYXAzQXJyWzFdKTtcbiAgICBicmVhaztcbiAgZGVmYXVsdDogLy8gYW5pbWF0ZVxuICAgIHV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktcXVlc3Rpb24tMS1ob2xkZXInLCBibG9ja1N0dWR5UXVlc3Rpb24xKTtcbiAgICBtYXBkZWYgPSBtYXBCb3hDb25maWcubWFrZUFuaW1hdGVNYXAoJ21hcC0xJywgMCk7XG4gICAgYnJlYWs7XG59XG5cbi8vIGNyZWF0ZSBhbGwgdGhlIG1hcGJveCBtYXAgb2JqZWN0c1xuLy8gY29uc3QgbWFwRW5kQXJyID0gbWFwQm94Q29uZmlnLm1ha2VDb21wYXJlTWFwKCdtYXAtYy1lbmRhJyxcbi8vICAnbWFwLWMtZW5kYicsICdjb21wYXJlLWVuZC13cmFwcGVyJywgdHJ1ZSwgZmFsc2UpO1xuLy9cbmNvbnN0IG1hcEVuZGEgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLWVuZGEnLCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgbWFwRW5kYiA9IG1hcEJveENvbmZpZy5tYWtlTWFwKCdtYXAtZW5kYicsIDEsIHRydWUsIGZhbHNlKTtcbi8vIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXBFbmRBcnJbMF0sIG1hcEVuZEFyclsxXSk7XG5cbi8vIHN5bmMgbWFwc1xubWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcEVuZGEsIG1hcEVuZGIpO1xuXG4vLyAvLyBUT0RPIG9ubHkgZGVhbCB3aXRoIG1hcCBmb3Igc3R1ZHkgcXVlc3Rpb25cbi8vIC8vIG9ubHkgbG9hZCBodG1sIGJsb2NrIG5lZWRlZCBtYXAgb2JqZWN0cyB3aWxsIGhhdmUgZ2VuZXJpYyBuYW1lcyBhbHNvXG5mdW5jdGlvbiByZXNpemVBbGxNYXBzKCkge1xuICBzd2l0Y2ggKHN0dWR5VmVyc2lvbikge1xuICAgIGNhc2UgMDogLy8gYW5pbWF0ZVxuICAgICAgbWFwMS5yZXNpemUoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTogLy8gc2lkZSBieSBzaWRlXG4gICAgICBtYXAyYS5yZXNpemUoKTtcbiAgICAgIG1hcDJiLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOiAvLyBzbGlkZXJcbiAgICAgIG1hcDNBcnJbMF0ucmVzaXplKCk7XG4gICAgICBtYXAzQXJyWzFdLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDogLy8gYW5pbWF0ZVxuICAgICAgbWFwZGVmLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgLy8gbWFwRW5kQXJyWzBdLnJlc2l6ZSgpO1xuICAvLyBtYXBFbmRBcnJbMV0ucmVzaXplKCk7XG4gIG1hcEVuZGEucmVzaXplKCk7XG4gIG1hcEVuZGIucmVzaXplKCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnZ3JlZS1jbGlja2VkJywgKCkgPT4ge1xuICByZXNpemVBbGxNYXBzKCk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VzLWNsaWNrZWQnLCAoKSA9PiB7XG4gIG1hcEVuZGEuc2V0Wm9vbSg1KTtcbiAgbWFwRW5kYS5zZXRab29tKDUpO1xuICByZXNpemVBbGxNYXBzKCk7XG4gIC8vIG1hcEVuZEFyclswXS5zZXRab29tKDExKTtcbiAgLy8gbWFwRW5kQXJyWzFdLnNldFpvb20oMTEpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Rpc2FnZ3JlZS1jbGlja2VkJywgKCkgPT4ge1xuICByZXNpemVBbGxNYXBzKCk7XG59KTtcblxuY29uc3QgdXJsU3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5jb25zdCB1cmwgPSBuZXcgVVJMKHVybFN0cmluZyk7XG5jb25zdCBjYW1wYWlnbiA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdjYW1wYWlnbicpO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuY29uc3QgZGF0ZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkJywgdHJ1ZSk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQgdGltZScsIGRhdGVzdGFtcCk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ2NhbXBhaWduJywgY2FtcGFpZ24pO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdtb2JpbGUnLCB1dGlsaXR5LmlzTW9iaWxlRGV2aWNlKCkpO1xuXG4vLyBhbGwgdGhlIEFnZ3JlZW1lbnQgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cyA9IFsnYWdncmVlLWJ1dHRvbiddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gYWdncmVlIHRvXG4vLyBwYXJ0aWNwYXRlIGluIHN0dWR5XG5hZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyQWdyZWVDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gYWxsIHRoZSBEaXNhZ2dyZWVtZW50IGNoYW5nZSBlbGVtZW50cyBwb3NzaWJsZVxuY29uc3QgZGlzYWdncmVtZW50Q2hhbmdlRWxlbWVudHMgPSBbJ2RpYWdncmVlLWJ1dHRvbiddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gYWdncmVlIHRvXG4vLyBwYXJ0aWNwYXRlIGluIHN0dWR5XG5kaXNhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyRGlzYWdyZWVDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gYWxsIHRoZSBzdWJtaXQgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBzdWJtaXRDaGFuZ2VFbGVtZW50cyA9IFsnc3VibWl0LWJ1dHRvbi10by1zdXMtMCcsICdzdWJtaXQtYnV0dG9uLXRvLXN1cy0xJywgJ3N1Ym1pdC1idXR0b24tdG8tc3VzLTInXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIHN1Ym1pdCBjaGFuZ2Vcbi8vIGZyb20gb25lIG9mIHRocmVlIG1hcCBxdWVzdGlvbnNcbnN1Ym1pdENoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gYWxsIHRoZSBTVVMgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBzdXNDaGFuZ2VFbGVtZW50cyA9IFsnc3VibWl0LWJ1dHRvbi10by1lbmQnXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIHN1Ym1pdCBjaGFuZ2Vcbi8vIGZyb20gb25lIG9mIHRocmVlIG1hcCBxdWVzdGlvbnNcbnN1c0NoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTdWJtaXRTVVNDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gb25seSB1cGRhdGVzIG9uZSBtYXAgaG93IGRvIGdldCBldmVyeSBtYXBcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dyaWQtdXBkYXRlJywgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gIHN3aXRjaCAoc3R1ZHlWZXJzaW9uKSB7XG4gICAgY2FzZSAwOiAvLyBhbmltYXRlXG4gICAgICBtYXAxLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6IC8vIHNpZGUgYnkgc2lkZVxuICAgICAgbWFwMmEuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIG1hcDJiLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6IC8vIHNsaWRlclxuICAgICAgbWFwM0FyclswXS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgICAgbWFwM0FyclsxXS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDogLy8gYW5pbWF0ZVxuICAgICAgbWFwZGVmLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgfVxuICAvLyBtYXBFbmRBcnJbMF0uZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgLy8gbWFwRW5kQXJyWzFdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gIG1hcEVuZGEuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgbWFwRW5kYi5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xufSk7XG5cbmNvbnN0IHN1c0J0bkdyb3VwRWxlbWVudHMgPSBbJ2J0bi1ncm91cC1zdXMtMScsXG4gICdidG4tZ3JvdXAtc3VzLTInLFxuICAnYnRuLWdyb3VwLXN1cy0zJyxcbiAgJ2J0bi1ncm91cC1zdXMtNCcsXG4gICdidG4tZ3JvdXAtc3VzLTUnLFxuICAnYnRuLWdyb3VwLXN1cy02JyxcbiAgJ2J0bi1ncm91cC1zdXMtNycsXG4gICdidG4tZ3JvdXAtc3VzLTgnLFxuICAnYnRuLWdyb3VwLXN1cy05JyxcbiAgJ2J0bi1ncm91cC1zdXMtMTAnXTtcblxuc3VzQnRuR3JvdXBFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAvLyBhZGQgcXVlc3Rpb24gaGFuZGxlclxuICBoYW5kbGVycy5hZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gc3VzIHF1ZXN0aW9uIHN0YXRlIGl0ZW1zXG5jb25zdCBzdXNOYW1lID0gJ3N1cy1xdWVzdGlvbi0nO1xuY29uc3Qgc3VzSXRlcmF0aW9ucyA9IDEwO1xudXRpbGl0eS5zZXRTdGF0ZUZvckdyb3VwKHN1c05hbWUsIHN1c0l0ZXJhdGlvbnMpO1xuXG4vLyBhZGQgZ3JpZCBib3ggc3RhdGUgaXRlbXNcbmNvbnN0IGdyaWRJdGVyYXRpb25zID0gNDI7XG5jb25zdCBncmlkTmFtZSA9ICdncmlkLWJveC0nO1xudXRpbGl0eS5zZXRTdGF0ZUZvckdyb3VwKGdyaWROYW1lLCBncmlkSXRlcmF0aW9ucyk7XG5cbi8vIGNoZWNrIHN0dWR5IHNlc3Npb24gc3RhdGUgZm9yIGNvbXBsZXRldGlvblxuY29uc3QgaXNTdHVkeWNvbXBsZXRlZCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHljb21wbGV0ZWQnKTtcbmxldCBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBpc1N0dWR5Y29tcGxldGVkID09PSAnYm9vbGVhbicpIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBpc1N0dWR5Y29tcGxldGVkO1xufSBlbHNlIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBmYWxzZTtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBTdHVkeUFncnJlZW1lbnQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xubGV0IHN0dWR5QWdycmVlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBTdHVkeUFncnJlZW1lbnQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUFncnJlZWQgPSBTdHVkeUFncnJlZW1lbnQ7XG59IGVsc2Uge1xuICBzdHVkeUFncnJlZWQgPSBmYWxzZTtcbn1cblxuLy8gYWxyZWFkeSBhZ3JlZWRcbmlmIChzdHVkeUFncnJlZWQpIHtcbiAgLy8gaGFuZGxlQWdyZWVDbGljaygpO1xufVxuXG4vLyBoaWRlIHN0dWR5XG5pZiAoc3R1ZHlDb21wbGV0ZWQpIHsgLy9cbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIHRydWUpO1xufSBlbHNlIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIGZhbHNlKTtcbn1cbiIsImltcG9ydCBtYXBib3hnbCBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IE1hcGJveENvbXBhcmUgZnJvbSAnbWFwYm94LWdsLWNvbXBhcmUnO1xuaW1wb3J0IHsgcG9seWdvbiwgZmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICdAdHVyZi9oZWxwZXJzJztcbi8vIGltcG9ydCBjZW50ZXIgZnJvbSAnQHR1cmYvY2VudGVyJztcbmltcG9ydCB7IFV0aWxpdHkgfSBmcm9tICcuL3V0aWxpdHknO1xuLy8gaW1wb3J0IHNxdWFyZUdyaWQgZnJvbSAnQHR1cmYvc3F1YXJlLWdyaWQnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTk9uZSBmcm9tICcuL3NxdWFyZS1ncmlkLWdlb2pzb24uanNvbic7XG5pbXBvcnQgU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQgZnJvbSAnLi9zcXVhcmUtZ3JpZC1nZW9qc29uLXNlY29uZC5qc29uJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkIGZyb20gJy4vc3F1YXJlLWdyaWQtZ2VvanNvbi10aGlyZC5qc29uJztcblxuY29uc3Qgc3luY01vdmUgPSByZXF1aXJlKCdAbWFwYm94L21hcGJveC1nbC1zeW5jLW1vdmUnKTtcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgdXRpbGl0eSA9IG5ldyBVdGlsaXR5KCk7XG5cbmV4cG9ydCBjbGFzcyBNYXBCb3hDb25maWcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgc3dpdGNoICh0aGlzLm1hcFZlcnNpb24pIHtcbiAgICAgIGNhc2UgMDogLy8gYXZsXG4gICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBTcXVhcmVHcmlkR2VvSlNPTk9uZTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIFNxdWFyZUdyaWRHZW9KU09OT25lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6IC8vIGhzdG5cbiAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IFNxdWFyZUdyaWRHZW9KU09OU2Vjb25kO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjogLy8gbHZcbiAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IFNxdWFyZUdyaWRHZW9KU09OVGhpcmQ7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nLCBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBhdmxcbiAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IFNxdWFyZUdyaWRHZW9KU09OT25lO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05PbmUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmRlZmF1bHRNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJztcbiAgICB0aGlzLmRlZmF1bHRNYXBDZW50ZXIgPSBbLTgyLjU3MCwgMzUuNTYwXTsgLy8gc3RhcnRpbmcgcG9zaXRpb24gW2xuZywgbGF0XVxuICAgIHRoaXMuZGVmYXVsdE1heEJvdW5kcyA9IFstODIuNzAyLCAzNS40NjMsIC04Mi40NDIsIDM1LjY1N107XG4gICAgdGhpcy5kZWZhdWx0TWFwWm9vbSA9IDU7IC8vIHN0YXJ0aW5nIHpvb21cbiAgICB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIgPSAnbWFwJztcbiAgICB0aGlzLmRhcmtNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L2RhcmstdjEwJztcbiAgICB0aGlzLmxpZ2h0TWFwU3R5bGUgPSAnbWFwYm94Oi8vc3R5bGVzL21hcGJveC9saWdodC12MTAnO1xuICAgIHRoaXMubWFwYm94Z2wgPSBtYXBib3hnbDtcbiAgICB0aGlzLk1hcGJveENvbXBhcmUgPSBNYXBib3hDb21wYXJlO1xuICAgIHRoaXMubWFwYm94Z2wuYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2laR0YyWldsemJTSXNJbUVpT2lKQ2RqVXhUMEZ6SW4wLlY5b0lrX3dVYzR1WnU3VUJibFI4bXcnO1xuICAgIHRoaXMucXVpZXQgPSB0cnVlO1xuICAgIHRoaXMubWFwMSA9IG51bGw7XG4gICAgdGhpcy5tYXAyID0gbnVsbDtcbiAgICB0aGlzLmRlZmF1bHRHcmV5Qm94ID0gJyM1NTU1NTUnO1xuICAgIHRoaXMuc2VsZWN0ZWRCb3ggPSAnI0ZCQjAzQic7XG4gICAgdGhpcy5tYXBDaGFuZ2VMYXllcnMgPSB7XG4gICAgICBsYXllcnM6IFtcbiAgICAgICAgWyAvLyBhdmwgMFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9pa25vd18xL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICAgICAgbWF4em9vbTogMTQsXG4gICAgICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgICAgIGJvdW5kczogWy04Mi42NDcsIDM1LjUwNywgLTgyLjQ5OCwgMzUuNjEyXSxcbiAgICAgICAgICAgIG1heGJvdW5kczogWy04Mi43MDIsIDM1LjQ0MiwgLTgyLjQ2MiwgMzUuNjU3XVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2lrbm93XzIve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBbLTgyLjY0NywgMzUuNTA3LCAtODIuNDk4LCAzNS42MTJdLFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBbLTgyLjcwMiwgMzUuNDQyLCAtODIuNDYyLCAzNS42NTddXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBbIC8vIGhzdG4gMVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9sYW5kY292ZXJfMS97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IFstOTUuOTQwLCAyOS42NzEsIC05NS43OTEsIDI5Ljc3NV0sXG4gICAgICAgICAgICBtYXhib3VuZHM6IFstOTUuOTkyLCAyOS42MjUsIC05NS43MzksIDI5LjgyMF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9sYW5kY292ZXJfMi97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IFstOTUuOTQwLCAyOS42NzEsIC05NS43OTEsIDI5Ljc3NV0sXG4gICAgICAgICAgICBtYXhib3VuZHM6IFstOTUuOTkyLCAyOS42MjUsIC05NS43MzksIDI5LjgyMF1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFsgLy8gbHYgMlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9uYWlwXzEve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBbLTExNC44OTksIDM2LjA3OTUsIC0xMTQuNzUwLCAzNi4xODNdLFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBbLTExNC45NTUsIDM2LjAzNCwgLTExNC42OTQsIDM2LjIyOF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9uYWlwXzIve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBbLTExNC44OTksIDM2LjA3OTUsIC0xMTQuNzUwLCAzNi4xODNdLFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBbLTExNC45NTUsIDM2LjAzNCwgLTExNC42OTQsIDM2LjIyOF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUgPSBbXG4gICAgICAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL25sY2QtMjAxNi0zMC97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9ubGNkLTIwMDEtMzAve3p9L3t4fS97eX0ucG5nJ1xuICAgIF07XG4gIH1cblxuICAvLyBTZXRzIGFuIGluZGl2aWR1YWwgbWFwYm94IG1hcCB0ZXN0XG4gIC8vXG4gIC8vIEBwYXJhbSBtYXBDb250YWluZXIgLSBzdHJpbmdcbiAgLy8gQHJldHVybiBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZU1hcChtYXBDb250YWluZXIgPSB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIsIG1hcEluZGV4ID0gMCwgZW5kID0gZmFsc2UsIGVuYWJsZWNsaWNrID0gdHJ1ZSkge1xuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG4gICAgY29uc3QgbWFwID0gbmV3IHRoaXMubWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogbWFwQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMubGlnaHRNYXBTdHlsZSxcbiAgICAgIHpvb206IHRoaXMuZGVmYXVsdE1hcFpvb20sXG4gICAgICBzaG93Wm9vbTogdHJ1ZSxcbiAgICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgICAgbWF4Qm91bmRzOiBtYXBTZXR1cFttYXBJbmRleF0ubWF4Ym91bmRzXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ2xvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5maXRNeUJvdW5kcyhtYXApO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCBtYXBJbmRleCkpO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkQ29ycmVjdExheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRMYXllcigpKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmFibGVjbGljaykge1xuICAgICAgICB0aGlzLmFkZEdyaWRDbGljayhtYXApO1xuICAgICAgfVxuICAgICAgbWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBtYXAucmVzaXplKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbWFwLnJlc2l6ZSgpOyB9LCAxMCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIG1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG1hcC5yZXNpemUoKTsgfSwgMTApO1xuICAgIH07XG4gICAgbWFwLmFkZENvbnRyb2wobmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKHsgc2hvd0NvbXBhc3M6IGZhbHNlIH0pLCAndG9wLWxlZnQnKTtcbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgLy8gU2V0cyB1cCBhbmltYXRlZCBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG1hcENvbnRhaW5lciAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIG5ldyBtYXBib3ggbWFwIG9iamVjdFxuICBtYWtlQW5pbWF0ZU1hcChtYXBDb250YWluZXIgPSB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIpIHtcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuXG4gICAgY29uc3QgbWFwID0gbmV3IHRoaXMubWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogbWFwQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMubGlnaHRNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgICBtYXhCb3VuZHM6IG1hcFNldHVwWzBdLm1heGJvdW5kc1xuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMobWFwKTtcbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgMCkpO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAxKSk7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZE91dExpbmVMYXllcigpKTtcbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkTGF5ZXIoKSk7XG4gICAgICB0aGlzLmFkZEdyaWRDbGljayhtYXApO1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuXG4gICAgICBjb25zdCBpbmRleENvdW50ID0gMjtcbiAgICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaW5kZXggPSAoaW5kZXggKyAxKSAlIGluZGV4Q291bnQ7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMSkge1xuICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0xJywgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0wJywgJ3Zpc2liaWxpdHknLCAnbm9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0wJywgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0xJywgJ3Zpc2liaWxpdHknLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgbWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBtYXAucmVzaXplKCk7XG4gICAgfTtcbiAgICAvLyBBZGQgem9vbSBhbmQgcm90YXRpb24gY29udHJvbHMgdG8gdGhlIG1hcC5cbiAgICBtYXAuYWRkQ29udHJvbChuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woeyBzaG93Q29tcGFzczogZmFsc2UgfSksICd0b3AtbGVmdCcpO1xuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICAvLyBtYWtlQ29tcGFyZU1hcCBTZXRzIGFuIGNvbXBhcmluZyBtYXAgXCJzd2lwaW5nXCIgbWFwYm94IG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbWFwQ29udGFpbmVyIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYXJyYXkgb2YgbWFwcyBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZUNvbXBhcmVNYXAobWFwQmVmb3JlQ29udGFpbmVyLCBtYXBBZnRlckNvbnRhaW5lciwgbWFwQ29tcGFyZVdyYXBwZXJJRCxcbiAgICBlbmQgPSBmYWxzZSwgZW5hYmxlY2xpY2sgPSB0cnVlKSB7XG4gICAgY29uc3QgbWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBtYXBTZXR1cCA9IHRoaXMubWFwQ2hhbmdlTGF5ZXJzLmxheWVyc1ttYXBWZXJzaW9uXTtcblxuICAgIGNvbnN0IGJlZm9yZU1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcEJlZm9yZUNvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmxpZ2h0TWFwU3R5bGUsXG4gICAgICBjZW50ZXI6IHRoaXMuZGVmYXVsdE1hcENlbnRlcixcbiAgICAgIHpvb206IHRoaXMuZGVmYXVsdE1hcFpvb20sXG4gICAgICBzaG93Wm9vbTogdHJ1ZSxcbiAgICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgICAgbWF4Qm91bmRzOiBtYXBTZXR1cFswXS5tYXhib3VuZHNcbiAgICB9KTtcblxuICAgIGNvbnN0IGFmdGVyTWFwID0gbmV3IHRoaXMubWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogbWFwQWZ0ZXJDb250YWluZXIsXG4gICAgICBzdHlsZTogdGhpcy5saWdodE1hcFN0eWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmRlZmF1bHRNYXBDZW50ZXIsXG4gICAgICB6b29tOiB0aGlzLmRlZmF1bHRNYXBab29tLFxuICAgICAgc2hvd1pvb206IHRydWUsXG4gICAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgICBrZXliaW5kaW5nczogdHJ1ZSxcbiAgICAgIG1heEJvdW5kczogbWFwU2V0dXBbMV0ubWF4Ym91bmRzXG4gICAgfSk7XG4gICAgY29uc3QgY29tcGFyZSA9IG5ldyB0aGlzLk1hcGJveENvbXBhcmUoYmVmb3JlTWFwLCBhZnRlck1hcCwgYCMke21hcENvbXBhcmVXcmFwcGVySUR9YCk7XG5cbiAgICBiZWZvcmVNYXAub24oJ2xvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5maXRNeUJvdW5kcyhiZWZvcmVNYXApO1xuICAgICAgYmVmb3JlTWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAxKSk7IC8vIG5lZWRzIHVwZGF0ZVxuICAgICAgYmVmb3JlTWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBiZWZvcmVNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgaWYgKGVuYWJsZWNsaWNrKSB7XG4gICAgICAgIHRoaXMuYWRkR3JpZENsaWNrKGJlZm9yZU1hcCk7XG4gICAgICB9XG4gICAgICBiZWZvcmVNYXAuc2V0Wm9vbSh0aGlzLmRlZmF1bHRNYXBab29tKTtcbiAgICAgIGJlZm9yZU1hcC5yZXNpemUoKTtcbiAgICAgIGNvbXBhcmUuc2V0U2xpZGVyKDE1MCk7XG4gICAgfSk7XG5cbiAgICBhZnRlck1hcC5vbignbG9hZCcsIChlKSA9PiB7XG4gICAgICB0aGlzLmZpdE15Qm91bmRzKGFmdGVyTWFwKTtcbiAgICAgIGFmdGVyTWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAwKSk7IC8vIG5lZWRzIHVwZGF0ZVxuICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZE91dExpbmVMYXllcigpKTtcbiAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZENvcnJlY3RMYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFmdGVyTWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRMYXllcigpKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmFibGVjbGljaykge1xuICAgICAgICB0aGlzLmFkZEdyaWRDbGljayhhZnRlck1hcCk7XG4gICAgICB9XG4gICAgICBhZnRlck1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgYWZ0ZXJNYXAucmVzaXplKCk7XG4gICAgICBjb21wYXJlLnNldFNsaWRlcigxNTApO1xuICAgIH0pO1xuXG4gICAgd2luZG93Lm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBhZnRlck1hcC5yZXNpemUoKTtcbiAgICAgIGJlZm9yZU1hcC5yZXNpemUoKTtcbiAgICAgIGNvbXBhcmUuc2V0U2xpZGVyKDE1MCk7XG4gICAgfTtcbiAgICAvLyBBZGQgem9vbSBhbmQgcm90YXRpb24gY29udHJvbHMgdG8gdGhlIG1hcC5cbiAgICBiZWZvcmVNYXAuYWRkQ29udHJvbChuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woeyBzaG93Q29tcGFzczogZmFsc2UgfSksICd0b3AtbGVmdCcpO1xuICAgIGFmdGVyTWFwLmFkZENvbnRyb2wobmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKHsgc2hvd0NvbXBhc3M6IGZhbHNlIH0pLCAndG9wLWxlZnQnKTtcbiAgICByZXR1cm4gW2JlZm9yZU1hcCwgYWZ0ZXJNYXBdO1xuICB9XG5cbiAgLy8gc3luY3MgdHdvIG1hcHMgem9vbSBhbmQgcGFuXG4gIC8vIG1vZGlmZWQgZnJvbSBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3guanMvZXhhbXBsZS92MS4wLjAvc3luYy1sYXllci1tb3ZlbWVudC9cbiAgLy9cbiAgLy8gQHBhcmFtIG1hcDEgPSBmaXJzdCBtYXBib3ggbWFwIG9iamVjdFxuICAvLyBAcGFyYW0gbWFwMiAgPSBzZWNvbmQgbWFwYm94IG1hcCBvYmplY3RcbiAgLy8gQHJldHVybiBudWxsXG4gIHN5bmNNYXBzKG1hcDEsIG1hcDIpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHN5bmNNb3ZlKG1hcDEsIG1hcDIpO1xuICB9XG5cbiAgbWFrZVRNU0xheWVyKG1hcENoYW5nZSwgbWFwSW5kZXgpIHtcbiAgICAvLyBzdHVkeSBjb25zdHJhaW50cyBudW1iZXIgb2YgcXVlc3Rpb25zIHN0YXJ0cyB3aXRoIDBcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBgbWFwLWNoYW5nZS0ke21hcEluZGV4fWAsXG4gICAgICB0eXBlOiAncmFzdGVyJyxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiAncmFzdGVyJyxcbiAgICAgICAgdGlsZXM6IFttYXBTZXR1cFttYXBJbmRleF0udXJsXSxcbiAgICAgICAgbWluem9vbTogbWFwU2V0dXBbbWFwSW5kZXhdLm1pbnpvb20sXG4gICAgICAgIG1heHpvb206IG1hcFNldHVwW21hcEluZGV4XS5tYXh6b29tLFxuICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICBib3VuZHM6IG1hcFNldHVwW21hcEluZGV4XS5ib3VuZHMsXG4gICAgICAgIG1heEJvdW5kczogbWFwU2V0dXBbbWFwSW5kZXhdLm1heGJvdW5kc1xuICAgICAgfSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdyYXN0ZXItZmFkZS1kdXJhdGlvbic6IDBcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gbWFrZXMgY2hhbmdlIGdyaWQgbGF5ZXIgb24gbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBtYWtlR3JpZExheWVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ2NoYW5nZS1ncmlkJyxcbiAgICAgIHR5cGU6ICdmaWxsJyxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICAgIGRhdGE6IHRoaXMuc3F1YXJlR3JpZEdlb0pTT05cbiAgICAgIH0sXG4gICAgICBsYXlvdXQ6IHt9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2ZpbGwtY29sb3InOiBbXG4gICAgICAgICAgJ21hdGNoJyxcbiAgICAgICAgICBbJ2dldCcsICdzZWxlY3RlZCddLFxuICAgICAgICAgIDEsIHRoaXMuc2VsZWN0ZWRCb3gsXG4gICAgICAgICAgLyogb3RoZXIgKi8gdGhpcy5kZWZhdWx0R3JleUJveFxuICAgICAgICBdLFxuICAgICAgICAnZmlsbC1vcGFjaXR5JzogMC41XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIG1ha2VzIGNoYW5nZSBncmlkIGxheWVyIHdoYXQgY29ycmVjdCBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIG1ha2VHcmlkQ29ycmVjdExheWVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ2NoYW5nZS1ncmlkJyxcbiAgICAgIHR5cGU6ICdmaWxsJyxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICAgIGRhdGE6IHRoaXMuc3F1YXJlR3JpZEdlb0pTT05cbiAgICAgIH0sXG4gICAgICBsYXlvdXQ6IHt9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2ZpbGwtY29sb3InOiBbXG4gICAgICAgICAgJ21hdGNoJyxcbiAgICAgICAgICBbJ2dldCcsICd2J10sXG4gICAgICAgICAgMSwgdGhpcy5zZWxlY3RlZEJveCxcbiAgICAgICAgICAvKiBvdGhlciAqLyB0aGlzLmRlZmF1bHRHcmV5Qm94XG4gICAgICAgIF0sXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiAwLjVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gbWFrZXMgY2hhbmdlIGdyaWQgbGF5ZXIgb24gbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBtYWtlR3JpZE91dExpbmVMYXllcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdjaGFuZ2UtZ3JpZC1vdXRsaW5lJyxcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICAgIGRhdGE6IHRoaXMuc3F1YXJlR3JpZEdlb0pTT05cbiAgICAgIH0sXG4gICAgICBsYXlvdXQ6IHtcbiAgICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCcsXG4gICAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCdcbiAgICAgIH0sXG4gICAgICBwYWludDoge1xuICAgICAgICAnbGluZS1jb2xvcic6IHRoaXMuZGVmYXVsdEdyZXlCb3gsXG4gICAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBhZGRzIGNsaWNrIG9mIGdyaWQgYm94IHRvIGNhcHR1cmUgd2hpY2ggZ3JpZCB0aGUgdXNlclxuICAvLyB0aGlua3MgY2hhbmdlIGhhcHBlbmQgaW4gb3JnaW5hbCBmcm9tOlxuICAvLyBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvZXhhbXBsZS9wb2x5Z29uLXBvcHVwLW9uLWNsaWNrL1xuICAvL1xuICAvLyBAcGFyYW0gbWFwID0gbWFwYm94IG1hcCBvYmplY3QgdG8gdXBkYXRlIHpvb20gYW5kIGNlbnRlciB0b1xuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkR3JpZENsaWNrKG1hcCkge1xuICAgIC8vIGNvbnN0IG1ha2VHcmlkTGF5ZXIgPSB0aGlzLm1ha2VHcmlkTGF5ZXIoKTtcbiAgICAvLyBXaGVuIGEgY2xpY2sgZXZlbnQgb2NjdXJzIG9uIGEgZmVhdHVyZSBpbiB0aGUgc3RhdGVzIGxheWVyLCBvcGVuIGEgcG9wdXAgYXQgdGhlXG4gICAgLy8gbG9jYXRpb24gb2YgdGhlIGNsaWNrLCB3aXRoIGRlc2NyaXB0aW9uIEhUTUwgZnJvbSBpdHMgcHJvcGVydGllcy5cbiAgICBtYXAub24oJ21vdXNlZW50ZXInLCAnY2hhbmdlLWdyaWQnLCAoZSkgPT4ge1xuICAgICAgbWFwLmdldENhbnZhcygpLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdtb3VzZWxlYXZlJywgJ2NoYW5nZS1ncmlkJywgKGUpID0+IHtcbiAgICAgIG1hcC5nZXRDYW52YXMoKS5zdHlsZS5jdXJzb3IgPSAnJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdjbGljaycsICdjaGFuZ2UtZ3JpZCcsIChlKSA9PiB7XG4gICAgICBjb25zdCBmZWF0dXJlID0gZS5mZWF0dXJlc1swXTtcbiAgICAgIGNvbnN0IGlkID0gTnVtYmVyKGZlYXR1cmUucHJvcGVydGllcy5pZCk7XG5cbiAgICAgIC8vIHVkcGF0ZXMgc2VsZWN0ZWQgZ2VvanNvbiBwcm9wZXJpdGVzLnNlbGVjdGVkIDAgb3IgMSBkZXBlbmVkaW5nXG4gICAgICAvLyBpZiB1c2VyIHNlbGVjdGVkIHBvbHlnb25cbiAgICAgIGNvbnN0IG5ld0ZlYXR1cmUgPSBNYXBCb3hDb25maWcudG9nZ2xlU2VsZWN0ZWRGZWF0dXJlKGZlYXR1cmUpO1xuXG4gICAgICAvLyBjcmVhdGUgYSBuZXcgZmVhdHVyZSBjb2xsZWN0aW9uIGZyb20gc2VsZWN0ZWQgZmVhdHVyZVxuICAgICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlcyA9IE1hcEJveENvbmZpZy5tYWtlU2VsZWN0ZWRGZWF0dXJlR2VvSlNPTihuZXdGZWF0dXJlKTtcblxuICAgICAgLy8gdXBkYXRlcyBzcXVhcmVHcmlkR2VvSlNPTiB3aXRoIG5ldyBnZW9qc29uXG4gICAgICBjb25zdCBuZXdTcXVhcmVHcmlkR2VvSlNPTiA9IE1hcEJveENvbmZpZy51cGRhdGVTcXVhcmVHcmlkV2l0aFNlbGVjdGVkRmVhdHVyZXMoc2VsZWN0ZWRGZWF0dXJlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgLy8gc3RvcmUgbmV3IHNxdWFyZSBncmlkIHdpdGggc2xlY3RlZCBib3hlc1xuICAgICAgdGhpcy5zdG9yZVNxdWFyZUdyaWQobmV3U3F1YXJlR3JpZEdlb0pTT04pO1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGUgd2l0aCBzZWxlY3RlZCBmZWF0dXJlXG4gICAgICBNYXBCb3hDb25maWcuc3RvcmVTZWxlY3RlZEZlYXR1cmUoaWQpO1xuXG4gICAgICAvLyB0aWdnZXIgZXZlbnQgc28gYWxsIGRhdGEgc291cmNlcyB1cGRhdGVcbiAgICAgIHV0aWxpdHkudHJpZ2dlckV2ZW50KCdncmlkLXVwZGF0ZScsIGlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHRvZ2dsZXMgdmFsdWUgdGhlIHByb3BlcnRpZXMgKGF0dHJpYnV0ZSkgc2VsZWN0ZWRcbiAgLy8gICAgd2hlbiBhIHVzZXIgY2xpY2tzIHRoZSBncmlkIGJveCA+IDAgd2hlbiBzZWxlY3RlZFxuICAvLyAgICAwIHdoZW4gc2VsZWN0ZVxuICAvL1xuICAvLyBAcGFyYW0gZmVhdHVyZSA9IGdlb2pzb24gZmVhdHVyZSAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIGZlYXR1cmUgPSBnZW9qc29uIGZlYXR1cmVcbiAgc3RhdGljIHRvZ2dsZVNlbGVjdGVkRmVhdHVyZShmZWF0dXJlKSB7XG4gICAgaWYgKGZlYXR1cmUucHJvcGVydGllcy5zZWxlY3RlZCA9PT0gMCkge1xuICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLnNlbGVjdGVkID0gMTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBmZWF0dXJlLnByb3BlcnRpZXMuc2VsZWN0ZWQgPSAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuICAgIHJldHVybiBmZWF0dXJlO1xuICB9XG5cbiAgLy8gc2V0cyB0aGUgc2VsZWN0ZWQgZmVhdHVyZSBpbiBzdGF0ZSA+IDAgd2hlbiBzZWxlY3RlZFxuICAvLyAgICAwIHdoZW4gc2VsZWN0ZVxuICAvL1xuICAvLyBAcGFyYW0gaWQgPSBudW1iZXIgd2hpY2ggcmVwcmVzZW50cyB0aGUgZmVhdHVyZSBpZFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc3RhdGljIHN0b3JlU2VsZWN0ZWRGZWF0dXJlKGlkKSB7XG4gICAgY29uc3QgZ3JpZE5hbWUgPSAnZ3JpZC1ib3gtJztcbiAgICAvLyB6ZXJvIG91dCBcInRvZ2dsZSBvZmZcIiBpZiBncmlkIGlkIGV4aXN0cyBzdGF0ZSBpdGVtXG4gICAgaWYgKHN0b3JlLmdldFN0YXRlSXRlbShgJHtncmlkTmFtZX0ke2lkfWApID4gMCkge1xuICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKGAke2dyaWROYW1lfSR7aWR9YCwgMCk7XG4gICAgLy8gYWRkIFwidG9nZ2xlIG9uXCIgaWYgIHN0YXRlIGl0ZW0gPiAwIG9yIG5vdCBzZWxlY3RlZFxuICAgIH0gZWxzZSB7XG4gICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYCR7Z3JpZE5hbWV9JHtpZH1gLCBOdW1iZXIoaWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBtYWtlcyB0aGUgc2VsZWN0ZWQgZmVhdHVyZSBhIG5ldyBmZWF0dXJlIGNvbGxlY3Rpb25cbiAgLy9cbiAgLy8gQHBhcmFtIGZlYXR1cmUgPSBnZW9qc29uIGZlYXR1cmUgKHBvcGVydGllcyBhbmQgZ2VvbSlcbiAgLy8gQHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbiAoZnJvbSB0dXJmLmpzKVxuICBzdGF0aWMgbWFrZVNlbGVjdGVkRmVhdHVyZUdlb0pTT04oZmVhdHVyZSkge1xuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihbcG9seWdvbihmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCBmZWF0dXJlLnByb3BlcnRpZXMpXSk7XG4gIH1cblxuICAvLyB1cGRhdGVzIHRoZSBTcXVhcmVHcmlkR2VvSlNPTiBhZnRlciBtZXJnaW5nIGFuZCByZWNvbmNpbGluZ1xuICAvLyAgICB3aXRoIHRoZSBzZWxlY3RlZCBmZWF1dHVyZXNcbiAgLy9cbiAgLy8gQHBhcmFtIHNlbGVjdGVkRmVhdHVyZXMgPSBnZW9qc29uIGZlYXR1cmVjb2xsZWN0b24gcmVwcmVzZW50aW5nIHRoZSBzZWxlY3RlZFxuICAvLyAgICAgICAgZmVhdHVyZXMgKHBvcGVydGllcyBhbmQgZ2VvbSlcbiAgLy8gQHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbiAoZnJvbSB0dXJmLmpzKVxuICBzdGF0aWMgdXBkYXRlU3F1YXJlR3JpZFdpdGhTZWxlY3RlZEZlYXR1cmVzKHNlbGVjdGVkRmVhdHVyZXMpIHtcbiAgICBjb25zdCBjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gICAgY29uc3QgY3VycmVudEZlYXR1cmVJZHMgPSBzZWxlY3RlZEZlYXR1cmVzLmZlYXR1cmVzLm1hcChmZWF0dXJlID0+IGZlYXR1cmUucHJvcGVydGllcy5pZCk7XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKHNlbGVjdGVkRmVhdHVyZXMuZmVhdHVyZXMuY29uY2F0KGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTi5mZWF0dXJlcy5maWx0ZXIoZmVhdHVyZSA9PiAhY3VycmVudEZlYXR1cmVJZHMuaW5jbHVkZXMoZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKSkpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgLy8gdXBkYXRlcyBzdGF0ZSB3aXRoIHRoZSBuZXcgdmVyc2lvbiBvZiBTcXVhcmVHcmlkR2VvSlNPTlxuICAvLyAgICBjb250YWlucyBzZWxlY3RlZCBmZWF0dXJlcyBhbHNvIChpZiBhbnkgc2VsZWN0ZWQpXG4gIC8vXG4gIC8vIEBwYXJhbSBOZXdTcXVhcmVHcmlkR2VvSlNPTiA9IGdlb2pzb24gZmVhdHVyZWNvbGxlY3RvbiByZXByZXNlbnRpbmdcbiAgLy8gICAgICAgICAgICAgICAgdGhlIG5ldyBmZWF0dXJlcyAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIG51bGxcbiAgc3RvcmVTcXVhcmVHcmlkKE5ld1NxdWFyZUdyaWRHZW9KU09OKSB7XG4gICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IE5ld1NxdWFyZUdyaWRHZW9KU09OO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nLCBOZXdTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmaXRNeUJvdW5kcyhtYXApIHtcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuICAgIGNvbnN0IGJvdW5kcyA9IG1hcFNldHVwWzBdLm1heGJvdW5kcztcbiAgICBtYXAuZml0Qm91bmRzKGJvdW5kcywgeyBwYWRkaW5nOiAxMDAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcbmNvbnN0IGRhdGFwaSA9ICdodHRwczovL3NjcmlwdC5nb29nbGUuY29tL21hY3Jvcy9zL0FLZnljYnhSUDlQVkNTSjdZbzRfWFl0cWt6dVNwSGYwY09BbjFub0ZLamRxbmZmQmZTMlpFencvZXhlYyc7XG5cbmV4cG9ydCBjbGFzcyBSZWNvcmRTdHVkeURhdGEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvbyA9IHt9O1xuICAgIHRoaXMuZGF0YXBpID0gZGF0YXBpO1xuICB9XG5cbiAgc2V0RXZlbnQoYWN0aW9uID0gJycsIGNhdGVnb3J5ID0gJycsIGxhYmVsID0gJycsIHZhbHVlID0gMCkge1xuICAgIC8vIGdldCB2YXJyaWFibGVzIGZvclxuICAgIHRoaXMudXVpZCA9IHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIHRoaXMuZGF0YSA9IGxhYmVsO1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcblxuICAgIC8vIHN0dWR5IHRvIEpTT05cbiAgICBjb25zdCBqc29uZGF0YSA9IHtcbiAgICAgIHV1aWQ6IHRoaXMudXVpZCxcbiAgICAgIGNhdGVnb3J5OiB0aGlzLmNhdGVnb3J5LFxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgZGF0ZTogdGhpcy5kYXRlXG4gICAgfTtcblxuICAgIGNvbnN0IGRhdGFBUElVUkwgPSBuZXcgVVJMKHRoaXMuZGF0YXBpKTtcbiAgICBkYXRhQVBJVVJMLnNlYXJjaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoanNvbmRhdGEpO1xuICAgIGZldGNoKGRhdGFBUElVUkwpO1xuICB9XG5cbiAgc2V0RXZlbnRBbGwoanNvbmRhdGEgPSB7fSkge1xuICAgIGNvbnN0IGRhdGFBUElVUkwgPSBuZXcgVVJMKHRoaXMuZGF0YXBpKTtcbiAgICBkYXRhQVBJVVJMLnNlYXJjaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoanNvbmRhdGEpO1xuICAgIGZldGNoKGRhdGFBUElVUkwpO1xuICB9XG59XG4iLCIvLyBpbXBvcnQgeyBTdG9yYWdlQVBJIH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2VBUEknO1xuXG4vKipcbiogVGhpcyBjb21wb25lbnQgaXMgaW50ZW5kZWQgdG8gaGFuZGxlIHRoZSBzdG9yYWdlIGFuZCByZXRyaWV2YWwgb2YgdGhlIHN0YXRlIG9mXG4qIEFzIG9mIHRoaXMgd3JpdGluZyBpdCBpcyB1c2luZyBsb2NhbFN0b3JhZ2UgdG8gZG8gdGhpcy5cbiogVXNlcyBzaW1wbGUgY2xhc3MgaW5zdGFuY2UgbWV0aG9kcyB3aXRoIHRoZSBzaG9ydC1oYW5kIG1ldGhvZCBkZWNsYXJhdGlvblxuKiBwYXR0ZXJuLlxuKlxuKiBUbyBub3RlOiBUaGVyZSBpcyBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgU3RvcmUgYW5kIHRoZSBTdGF0ZS4gQXMgb2YgMGEzMTA2ZVxuKiB0aGUgU3RvcmUgaXMgYSBTdHJpbmcgc2F2ZWQgdG8gdGhlIGJyb3dzZXJzIGxvY2FsU3RvcmFnZSBhbmQgaXMgYSBzZXJpYWxpemVkXG4qIHZlcnNpb24gb2YgdGhlIFN0YXRlLiBUaGUgU3RhdGUgaXMgYW4gT2JqZWN0IHdoaWNoIGlzIGludGVyYWN0ZWQgd2l0aCBieVxuKiBwYXJzaW5nIHRoZSBTdGF0ZSBzdHJpbmcgZnJvbSB0aGUgU3RvcmUsIG1vZGlmeWluZyB0aGUgcmVzdWx0cyBvZiB0aGUgcGFyc2UsXG4qIGFuZCByZS1zZXJpYWxpemluZyBpdCBiYWNrIHRvIHRoZSBTdG9yZS5cbiovXG5jb25zdCBTVEFURV9LRVkgPSAnc3RhdGUnO1xuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAvLyAuLmFuZCBhbiAob3B0aW9uYWwpIGN1c3RvbSBjbGFzcyBjb25zdHJ1Y3Rvci4gSWYgb25lIGlzXG4gIC8vIG5vdCBzdXBwbGllZCwgYSBkZWZhdWx0IGNvbnN0cnVjdG9yIGlzIHVzZWQgaW5zdGVhZDpcbiAgLy8gY29uc3RydWN0b3IoKSB7IH1cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIC8vIHRoaXMuc3RvcmUgPSBuZXcgU3RvcmFnZUFQSSgpO1xuICAgIGlmIChTdG9yZS5zdG9yYWdlQXZhaWxhYmxlKCkpIHtcbiAgICAgIHRoaXMuc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICBpZiAodGhpcy5jaGVja1N0YXRlRXhpc3RzKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0geyBTVEFURV9LRVkgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZXRzIGEga2V5L3ZhbHVlIHBhaXIgdG8gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGVJdGVtKGtleSA9ICcnLCB2YWx1ZSA9ICcnKSB7XG4gICAgY29uc3Qgc3RvcmVPYmogPSB7IFtrZXldOiB2YWx1ZSB9O1xuICAgIGNvbnN0IG5ld1N0YXRlT2JqID0geyAuLi50aGlzLmdldFN0YXRlKCksIC4uLnN0b3JlT2JqIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZU9iaik7XG4gICAgcmV0dXJuIG5ld1N0YXRlT2JqO1xuICB9XG5cbiAgLy8gRGVsZXRlIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvLyAhLy8gV0FSTklORzogb25seSBkb2VzIGEgc2hhbGxvdyBkZWxldGVcbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBkZWxldGVTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICBjb25zdCBzdG9yZU9iaiA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICBkZWxldGUgc3RvcmVPYmpba2V5XTtcbiAgICB0aGlzLnNldFN0YXRlKHN0b3JlT2JqKTtcbiAgICByZXR1cm4gc3RvcmVPYmo7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBlbnRpcmUgc3RhdGUgb2JqZWN0XG4gIC8vXG4gIC8vIEByZXR1cm4gb2JqZWN0XG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSA/IEpTT04ucGFyc2UodGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpIDoge307XG4gIH1cblxuICAvLyBHZXRzIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldEl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oU1RBVEVfS0VZKTtcbiAgfVxuXG4gIC8vIEdldHMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0U3RhdGVJdGVtKGtleSA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tJdGVtKGtleSkgPyB0aGlzLmdldFN0YXRlKClba2V5XSA6IHt9O1xuICB9XG5cbiAgLy8gU2V0cyBhIG5ldyBzdGF0ZSBvYmplY3Qgc3RhdGVcbiAgLy9cbiAgLy8gQHBhcmFtIHZhbHVlIHwgc3RyaW5nXG4gIHNldFN0YXRlKHZhbHVlID0ge30pIHtcbiAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShTVEFURV9LRVksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpID8gSlNPTi5wYXJzZSh0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSkgOiB7fTtcbiAgfVxuXG4gIC8vIENoZWNrcyBpZiB0aGUgc3RhdGUgZXhpc3RzIGluIHRoZSBzdG9yYWdlIHByb3ZpZGVyXG4gIGNoZWNrU3RhdGVFeGlzdHMoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpO1xuICB9XG5cbiAgLy8gR2V0cyB0aGUgc3RhdGUgZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlclxuICAvL1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUFzU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFuIGl0ZW0gaGFzIGJlZW4gc2F2ZWQgdG8gdGhlIHN0b3JlXG4gIC8vIHVudXNlZCBhcyBvZiAwYTMxMDZlXG4gIC8vXG4gIC8vIEBwYXJhbSBpdGVtIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBpc1N0YXRlSXRlbUV4aXN0KGl0ZW0pIHtcbiAgICBpZiAodGhpcy5jaGVja1N0YXRlRXhpc3RzKCkpIHtcbiAgICAgIGNvbnN0IHN0YXRlU3RyID0gdGhpcy5nZXRTdGF0ZUFzU3RyaW5nKCk7XG4gICAgICBpZiAoc3RhdGVTdHIuaW5kZXhPZihpdGVtKSA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vXG4gIC8vIEBwYXJhbSBpdGVtIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBjaGVja0l0ZW0oaXRlbSkge1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSAmJiB0aGlzLmdldFN0YXRlQXNTdHJpbmcoKS5pbmRleE9mKGl0ZW0pID4gMDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGxvY2FsU3RvcmFnZSBhdmFpbGFibGUuXG4gIC8vIFRha2VuIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9TdG9yYWdlX0FQSS9Vc2luZ190aGVfV2ViX1N0b3JhZ2VfQVBJXG4gIC8vXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBzdGF0aWMgc3RvcmFnZUF2YWlsYWJsZSgpIHtcbiAgICBjb25zdCB0eXBlID0gJ2xvY2FsU3RvcmFnZSc7XG4gICAgbGV0IHN0b3JhZ2U7XG4gICAgdHJ5IHtcbiAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICBjb25zdCB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgICAgc3RvcmFnZS5sZW5ndGggIT09IDA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5cbmV4cG9ydCBjbGFzcyBVdGlsaXR5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mb28gPSB7fTtcbiAgICB0aGlzLmNoZWNrID0gZmFsc2U7XG4gIH1cblxuICAvLyBjaGVja3MgaXMgSmF2YXNjcmlwdCBvYmplY3QgaXMgYSB2YWxpZCBvYmplY3RcbiAgLy9cbiAgLy8gQHBhcmFtIG9iaiAtIG9iamVjdFxuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgY2hlY2tWYWxpZE9iamVjdChvYmopIHtcbiAgICB0aGlzLm9iaiA9IG9iajtcbiAgICBpZiAodGhpcy5vYmogPT09IHVuZGVmaW5lZCB8fCB0aGlzLm9iaiA9PT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMub2JqID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMub2JqID09PSAnc3RyaW5nJyAmJiB0aGlzLm9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGNyZWF0ZXMgYSB1dWlkXG4gIC8vXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIHV1aWQoKSB7XG4gICAgdGhpcy5jcnlwdG8gPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSg0KSkuam9pbignLScpO1xuICAgIHJldHVybiB0aGlzLmNyeXB0bztcbiAgfVxuXG4gIC8vIGNoZWNrcyBpZiBjdXJyZW50IGRldmljZSBpcyBhIG1vYmlsZVxuICAvL1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgaXNNb2JpbGVEZXZpY2UoKSB7XG4gICAgdGhpcy5jaGVjayA9IGZhbHNlO1xuICAgIChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSkgcmV0dXJuIHRydWU7fSkobmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8d2luZG93Lm9wZXJhKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHJldHVybiB0aGlzLmNoZWNrO1xuICB9XG5cbiAgLy8gY2hlY2tzIGh0bWwgYXMgYSB0ZW1wbGF0ZS9ibG9ja1xuICAvL1xuICAvLyBAcGFyYW0gcGxhY2VIb2xkZXJFbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSUQgdGhhdCB3aWxsIGhvbGQgdGhlIHRlbXBsYXRlXG4gIC8vIEBwYXJhbSB0ZW1wbGF0ZSAtIEhUTUwgY29udGVudFxuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgbG9hZEhUTUxCbG9jayhwbGFjZUhvbGRlckVsZW1lbnRJRCwgdGVtcGxhdGUpIHtcbiAgICBjb25zdCBjb21wb25lbnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxhY2VIb2xkZXJFbGVtZW50SUQpO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRlbXBsYXRlIGV4c2lzdHNcbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIGlmIChjb21wb25lbnRFbGVtICE9IG51bGwpIHtcbiAgICAgICAgY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdobWwtYmxvY2stbG9hZGVkJywgcGxhY2VIb2xkZXJFbGVtZW50SUQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnaG1sLWJsb2NrLXVubG9hZGVkJywgcGxhY2VIb2xkZXJFbGVtZW50SUQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMb2FkIHRlbXBsYXRlIGludG8gcGxhY2Vob2xkZXIgZWxlbWVudFxuICAgICAgICBjb21wb25lbnRFbGVtLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHRyaWdnZXJzIGEgZG9tIGV2ZW50XG4gIC8vXG4gIC8vIEBwYXJhbSBldmVudE5hbWUgLSBzdHJpbmcgZXZlbnQgbmFtZSBmb3IgYSBsaXN0bmVyIHRvIGxpc3RlbiB0b29cbiAgLy8gQHBhcmFtIGRldGFpbCAtIG9iamVjdCBkZXRhaWxzIGZvciBldmVudFxuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgdHJpZ2dlckV2ZW50KGV2ZW50TmFtZSwgZGV0YWlsKSB7XG4gICAgdGhpcy5ldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7IGRldGFpbCB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnQpO1xuICB9XG5cbiAgLy8gaXRlcmF0ZXMgeCBudW1iZXIgb2YgaXRlcmF0aW9ucyBhbmQgd3JpdGVzIGFcbiAgLy8gYSBkZWZhdWx0IHplcm8gdmFsdWUgc3RhdGUga2V5XG4gIC8vXG4gIC8vIEBwYXJhbSBldmVudE5hbWUgLSBzdHJpbmcgZXZlbnQgbmFtZSBmb3IgYSBsaXN0bmVyIHRvIGxpc3RlbiB0b29cbiAgLy8gQHBhcmFtIGRldGFpbCAtIG9iamVjdCBkZXRhaWxzIGZvciBldmVudFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc2V0U3RhdGVGb3JHcm91cChzdGF0ZXRleHQsIGl0ZXJhdGlvbnMpIHtcbiAgICAvLyBpZiAoIXRoaXMuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gKSkpIHtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gLCAwKTtcbiAgICAvLyB9XG4gICAgaWYgKGl0ZXJhdGlvbnMgPiAwKSB7XG4gICAgICBjb25zdCBuZXh0SXRlcmF0aW9uID0gaXRlcmF0aW9ucyAtIDE7XG4gICAgICB0aGlzLnNldFN0YXRlRm9yR3JvdXAoc3RhdGV0ZXh0LCBuZXh0SXRlcmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvLyBpdGVyYXRlcyB4IG51bWJlciBvZiBpdGVyYXRpb25zIGFuZCB3cml0ZXMgdG8gdGhlIEFQSVxuICAvL1xuICAvLyBAcGFyYW0gZXZlbnROYW1lIC0gc3RyaW5nIGV2ZW50IG5hbWUgZm9yIGEgbGlzdG5lciB0byBsaXN0ZW4gdG9vXG4gIC8vIEBwYXJhbSBkZXRhaWwgLSBvYmplY3QgZGV0YWlscyBmb3IgZXZlbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHNldEFQSUZvckdyb3VwKHN0YXRldGV4dCwgaXRlcmF0aW9ucywgdmFsdWVBcnJheSA9IFtdKSB7XG4gICAgY29uc3Qga2V5ID0gYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gO1xuICAgIGNvbnN0IHZhbHVlID0gc3RvcmUuZ2V0U3RhdGVJdGVtKGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YCk7XG4gICAgLy8gaWYgKCF0aGlzLmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YCkpKSB7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YCwgMCk7XG4gICAgLy8gfVxuICAgIC8vIGNhcHR1cmUgaW4gYXJyYXkgc28gd2UgY2FuIHdyaXRlIGNvbXBsdGVkIGFycmF5IHRvIGFwaVxuICAgIHZhbHVlQXJyYXkucHVzaCh7IGtleSwgdmFsdWUgfSk7XG4gICAgaWYgKGl0ZXJhdGlvbnMgPiAwKSB7XG4gICAgICBjb25zdCBuZXh0SXRlcmF0aW9uID0gaXRlcmF0aW9ucyAtIDE7XG4gICAgICB0aGlzLnNldEFQSUZvckdyb3VwKHN0YXRldGV4dCwgbmV4dEl0ZXJhdGlvbiwgdmFsdWVBcnJheSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gd3JpdGUgY29tcGx0ZWQgYXJyYXkgdG8gYXBpXG4gICAgLy8gcmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50KCdkYXRhJywgJ2dyaWRhbnN3ZXJzJywgSlNPTi5zdHJpbmdpZnkodmFsdWVBcnJheSkpO1xuICAgIGNvbnN0IGRhdGVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzJywgdmFsdWVBcnJheSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkYW5zd2Vycy10aW1lJywgZGF0ZXN0YW1wKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==