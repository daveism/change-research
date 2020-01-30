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
/******/ 	var hotCurrentHash = "0c011730ac65e6e2b7a2";
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

module.exports = "<div id=\"study-dissaggree\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Thanks anyway!</div>\n\n  <div id=\"study-dissaggree-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    <span>\n      Thank you for considering being a participant. If you change yourmind you can\n      always review the <a href=\"\">aggrement</a> again!\n    </span>\n  </div>\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-1.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-1.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-0\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    The map below contains two images that are different. The two images\n    will turn on and off at a regular interval. Click on any box where you\n    believe the two images are different. The boxes you click on will change\n    orange and will become your answers when you click submit. Clicking on an\n    orange box will remove it from your selection.\n  </div>\n\n  <div id=\"map-holder-1\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-1\" class=\"row h-100 justify-content-center\">\n      <div id=\"map-1\" class=\"my-3 mx-3\"></div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-0\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-2.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-2.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-1\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    The two maps below contain images that are different. Click on any boxes where\n    you believe the two images are different. The boxes you click on will change\n    orange and will become your answers when you click submit. Clicking on an\n    orange box will remove it from your selection.\n  </div>\n\n  <div id=\"map-holder-2\" class=\"start-map w-100 d-flex ml-3 mt-3\">\n    <div id=\"map-inner-holder-2\" class=\"row h-100 justify-content-center\">\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2a\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2a\"></div>\n      </div>\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2b\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2b\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-1\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-3.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-3.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-2\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    The map below contains two images that are different. Drag the vertical bar side-to-side\n    to reveal the images. Click on any box where you believe the two images are different. The\n    boxes you click on will change orange and will become your answers when you click\n    submit. Clicking on an orange box will remove it from your selection.\n  </div>\n\n  <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n      <div id='compare-wrapper'>\n        <div id=\"map-3a\" class=\"mx-3\"></div>\n        <div id=\"map-3b\" class=\"mx-3\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit you selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-2\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-sus.html":
/*!*************************************************!*\
  !*** ./src/content-blocks/block-study-sus.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-sus\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 3 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Rank each question from 1 to 5 based on how much you agree or disaggre\n    with the statement.  1 indicates you strongly disagree. 5 indicates\n    you strongly aggree.\n  </div>\n\n  <div class=\"pl-1 pt-3 pb-3\">\n    &nbsp;\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        1.&nbsp;&nbsp;I think that I would like to use this site frequently\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-1\" class=\"btn-group btn-sus mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q1-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q1-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q1-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q1-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q1-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        2.&nbsp;&nbsp;I found the site unnecessarily complex\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-2\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q2-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q2-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q2-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q2-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q2-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        3.&nbsp;&nbsp;I thought the site was easy to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-3\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q3-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q3-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q3-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q3-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q3-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        4.&nbsp;&nbsp;I think that I would need the support of a technical person to be able to use this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-4\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q4-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q4-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q4-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q4-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q4-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        5.&nbsp;&nbsp;I found the various functions in this site were well integrated\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-5\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q5-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q5-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q5-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q5-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q5-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        6.&nbsp;&nbsp;I thought there was too much inconsistency in this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-6\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q6-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q6-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q6-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q6-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q6-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        7.&nbsp;&nbsp;I would imagine that most people would learn to use this site very quickly\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-7\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q7-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q7-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q7-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q7-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q7-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        8.&nbsp;&nbsp;I found the site very cumbersome to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-8\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q8-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q8-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q8-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q8-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q8-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        9.&nbsp;&nbsp;I felt very confident using the site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-9\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q9-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q9-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q9-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q9-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q9-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        10.&nbsp;&nbsp;I needed to learn a lot of things before I could get going with this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-10\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q10-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q10-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q10-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q10-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q10-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-100 d-flex mt-4\">\n    <div class=\"pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-7\">\n      &nbsp;\n    </div>\n    <div class=\"pb-4 pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-5\">\n      <button id=\"submit-button-to-end\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and finish.\">\n        Submit and finish\n      </button>\n    </div>\n  </div>\n\n</div>\n";

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
          history.pushState({ page: 2 }, '#sus-questions', '#sus-questions'); // eslint-disable-line
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

          store.setStateItem('susanswers-submited', true);
          store.setStateItem('susanswers', susValueArray);
          store.setStateItem('susanswers-time', datestamp);
          store.setStateItem('study-completed', true);
          Handlers.recordAggreed();
          history.pushState({ page: 3 }, '#study-completed', '#study-completed'); // eslint-disable-line

          // temp get rid of state items
          // REMOVE FOR RELEASE
          var storage = window['localStorage']; // eslint-disable-line
          storage.removeItem('state');
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
          history.pushState({ page: 1 }, '#map', '#map'); // eslint-disable-line
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
          history.pushState({ page: 1 }, '#disaggree', '#disaggree'); // eslint-disable-line
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
      var susanswersSubmitedRec = store.getStateItem('susanswers-submited');
      var gridSubmitedRec = store.getStateItem('grid-submited');
      var susanswersRec = store.getStateItem('susanswers');
      var gridanswersRec = store.getStateItem('gridanswers');
      var gridcorrectRec = store.getStateItem('squareGridGeoJSON');
      var studyCompletedRec = store.getStateItem('study-completed');

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
        susanswers_submited: susanswersSubmitedRec,
        grid_submited: gridSubmitedRec,
        study_agreement_time: studyAgreementTimeRec,
        campaign: JSON.stringify(campaignRec),
        mobile: JSON.stringify(mobileRec),
        map_version: mapVersionRec,
        grid_correct: JSON.stringify(gridcorrectRecProps),
        grid_answers: JSON.stringify(gridanswersRec),
        gridanswers_time: '',
        study_question: studyQuestionRec,
        sus_answers: JSON.stringify(susanswersRec),
        susanswers_time: '',
        study_completed: studyCompletedRec
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
      var susanswersSubmitedRec = store.getStateItem('susanswers-submited');
      var gridSubmitedRec = store.getStateItem('grid-submited');
      var susanswersRec = store.getStateItem('susanswers');
      var susanswersDateRec = store.getStateItem('susanswers-time');
      var gridanswersRec = store.getStateItem('gridanswers');
      var gridanswersDateRec = store.getStateItem('gridanswers-time');
      var gridcorrectRec = store.getStateItem('squareGridGeoJSON');
      var studyCompletedRec = store.getStateItem('study-completed');

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
        susanswers_submited: susanswersSubmitedRec,
        grid_submited: gridSubmitedRec,
        study_agreement_time: studyAgreementTimeRec,
        campaign: JSON.stringify(campaignRec),
        mobile: JSON.stringify(mobileRec),
        map_version: mapVersionRec,
        grid_correct: JSON.stringify(gridcorrectRecProps),
        grid_answers: JSON.stringify(gridanswersRec),
        gridanswers_time: gridanswersDateRec,
        study_question: studyQuestionRec,
        sus_answers: JSON.stringify(susanswersRec),
        susanswers_time: susanswersDateRec,
        study_completed: studyCompletedRec
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
// play pause on animation - maybe
var store = new _store.Store({});
var utility = new _utility.Utility();

var URLPath = window.location.hash;

// study constraints number of questions starts with 0
var studyVersion = 0; // default study version
if (utility.checkValidObject(store.getStateItem('study-question'))) {
  studyVersion = store.getStateItem('study-question');
} else {
  var studyMinOne = 0;
  var studyMaxOne = 2;
  studyVersion = Math.floor(Math.random() * (studyMaxOne - studyMinOne + 1) + studyMinOne);
  store.setStateItem('study-question', studyVersion);
}

// study constraints number of questions starts with 0
var mapVersion = 0; // default study version
if (utility.checkValidObject(store.getStateItem('map-version'))) {
  mapVersion = store.getStateItem('map-version');
} else {
  var mapMinOne = 0;
  var mapMaxOne = 2;
  mapVersion = Math.floor(Math.random() * (mapMaxOne - mapMinOne + 1) + mapMinOne);
  store.setStateItem('map-version', mapVersion);
}

if (!utility.checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', utility.uuid().toString());
}

if (!utility.checkValidObject(store.getStateItem('study-completed'))) {
  store.setStateItem('study-completed', false);
}

if (!utility.checkValidObject(store.getStateItem('susanswers-submited'))) {
  store.setStateItem('susanswers-submited', false);
}

if (!utility.checkValidObject(store.getStateItem('grid-submited'))) {
  store.setStateItem('grid-submited', false);
}

if (!utility.checkValidObject(store.getStateItem('study-agreement'))) {
  store.setStateItem('study-agreement', false);
}

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas, _freeRegularSvgIcons.far);
_fontawesomeSvgCore.dom.watch();

var mapBoxConfig = new _mapConfig.MapBoxConfig();
var handlers = new _handlers.Handlers();

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
utility.setDomStateForGroup(susName, susIterations);

// add grid box state items
var gridIterations = 42;
var gridName = 'grid-box-';
utility.setStateForGroup(gridName, gridIterations);

// check study session state for completetion
var isStudycompleted = store.getStateItem('study-completed');
var studyCompleted = false;
if (typeof isStudycompleted === 'boolean') {
  studyCompleted = isStudycompleted;
} else {
  studyCompleted = false;
}

// check study session state for aggreeing to study
var StudyAgrreement = store.getStateItem('study-agreement');
var studyAgrreed = false;
if (typeof StudyAgrreement === 'boolean') {
  studyAgrreed = StudyAgrreement;
} else {
  studyAgrreed = false;
}

// check study session state for submitting study
var gridSubmitedState = store.getStateItem('grid-submited');
var gridSubmited = false;
if (typeof gridSubmitedState === 'boolean') {
  gridSubmited = gridSubmitedState;
} else {
  gridSubmited = false;
}

// check study session state for submitting sus questions
var susSubmitedState = store.getStateItem('susanswers-submited');
var susSubmited = false; // eslint-disable-line
if (typeof gridSubmitedState === 'boolean') {
  susSubmited = susSubmitedState;
} else {
  susSubmited = false;
}

// submit buttons
var aggrementElement = document.getElementById('aggree-button');
var diaggreeElement = document.getElementById('diaggree-button'); // eslint-disable-line
var gridSubmitElement = document.getElementById('submit-button-to-sus-' + studyVersion);
var completedSubmitElement = document.getElementById('submit-button-to-end');

if (studyAgrreed) {
  switch (URLPath) {
    case '#':
      if (studyAgrreed) {
        if (aggrementElement) {
          aggrementElement.click();
        }
      }
      break;
    case '#map':
      if (studyAgrreed) {
        if (aggrementElement) {
          aggrementElement.click();
        }
      }
      break;
    case '#sus-questions':
      if (gridSubmited) {
        if (gridSubmitElement) {
          gridSubmitElement.click();
        }
      }
      break;
    default:
      if (studyAgrreed) {
        if (aggrementElement) {
          aggrementElement.click();
        }
      }
      break;
  }
}

window.addEventListener('hashchange', function (event) {
  window.location.reload();
});

// hide study
if (studyCompleted) {
  if (completedSubmitElement) {
    completedSubmitElement.click();
  }
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
        if (utility.checkValidObject(store.getStateItem('squareGridGeoJSON'))) {
          this.squareGridGeoJSON = store.getStateItem('squareGridGeoJSON');
        } else {
          this.squareGridGeoJSON = _squareGridGeojson2.default;
          store.setStateItem('squareGridGeoJSON', _squareGridGeojson2.default);
        }
        break;
      case 1:
        // hstn
        if (utility.checkValidObject(store.getStateItem('squareGridGeoJSON'))) {
          this.squareGridGeoJSON = store.getStateItem('squareGridGeoJSON');
        } else {
          this.squareGridGeoJSON = _squareGridGeojsonSecond2.default;
          store.setStateItem('squareGridGeoJSON', _squareGridGeojsonSecond2.default);
        }
        break;
      case 2:
        // lv
        if (utility.checkValidObject(store.getStateItem('squareGridGeoJSON'))) {
          this.squareGridGeoJSON = store.getStateItem('squareGridGeoJSON');
        } else {
          this.squareGridGeoJSON = _squareGridGeojsonThird2.default;
          store.setStateItem('squareGridGeoJSON', _squareGridGeojsonThird2.default);
        }
        break;
      default:
        // avl
        if (utility.checkValidObject(store.getStateItem('squareGridGeoJSON'))) {
          this.squareGridGeoJSON = store.getStateItem('squareGridGeoJSON');
        } else {
          this.squareGridGeoJSON = _squareGridGeojson2.default;
          store.setStateItem('squareGridGeoJSON', _squareGridGeojson2.default);
        }
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
        style: this.darkMapStyle,
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
        style: this.darkMapStyle,
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
        style: this.darkMapStyle,
        center: this.defaultMapCenter,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true,
        maxBounds: mapSetup[0].maxbounds
      });

      var afterMap = new this.mapboxgl.Map({
        container: mapAfterContainer,
        style: this.darkMapStyle,
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

    // iterates x number of iterations and sets
    //    sus questions top state
    //
    // @param eventName - string event name for a listner to listen too
    // @param detail - object details for event
    // @return null

  }, {
    key: 'setDomStateForGroup',
    value: function setDomStateForGroup(statetext, iterations) {
      var value = store.getStateItem('' + statetext + iterations, 0);
      var btnPrefix = 'btn-sus-q' + iterations + '-';
      var aggrementElement = document.getElementById('' + btnPrefix + value);
      if (aggrementElement) {
        aggrementElement.classList.add('selected');
      }
      if (iterations > 0) {
        var nextIteration = iterations - 1;
        this.setDomStateForGroup(statetext, nextIteration);
      }
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
      if (!this.checkValidObject(store.getStateItem('' + statetext + iterations))) {
        store.setStateItem('' + statetext + iterations, 0);
      }
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
      store.setStateItem('grid-submited', true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0yLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWFwLWNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yZWNvcmQtc3R1ZHktZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbInJlY29yZFN0dWR5RGF0YSIsIlJlY29yZFN0dWR5RGF0YSIsInN0b3JlIiwiU3RvcmUiLCJ1dGlsaXR5IiwiVXRpbGl0eSIsIkhhbmRsZXJzIiwiZGlzcGxheU5vbmVDbGFzcyIsInNlbGVjdGVkQ2xhc3MiLCJzdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCIsInN0dWR5QWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlIiwic3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNBZGQiLCJzdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSIsInN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZCIsInN0dWR5UXVlc3Rpb24iLCJnZXRTdGF0ZUl0ZW0iLCJzdHVkeVF1ZXN0aW9uRWxlbWVudHNSZW1vdmUiLCJzdHVkeVNVU0VsZW1lbnRzQWRkIiwic3R1ZHlTVVNFbGVtZW50c1JlbW92ZSIsInN1c1N0b3JhZ2VLZXlzIiwiZWxlbWVudElEIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZvckVhY2giLCJlbGVtZW50VUlJRCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImNvbnRhaW5zIiwiYWRkIiwiZ3JpZE5hbWUiLCJncmlkSXRlcmF0aW9ucyIsInNldEFQSUZvckdyb3VwIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInBhZ2UiLCJzdXNWYWx1ZUFycmF5Iiwia2V5IiwicXVlc3Rpb25BbnN3ZXIiLCJwdXNoIiwiZGF0ZXN0YW1wIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidHJpZ2dlckV2ZW50Iiwic2V0U3RhdGVJdGVtIiwicmVjb3JkQWdncmVlZCIsInN0b3JhZ2UiLCJ3aW5kb3ciLCJyZW1vdmVJdGVtIiwic3R1ZHlWZXJzaW9uIiwiYWdyZWVtZW50VGltZVN0YW1wIiwicmVjb3JkRGlzYWdncmVlZCIsInBhcmVudEJ0bkdyb3VwIiwidGFyZ2V0IiwiaWQiLCJwYXJlbnRFbGVtZW50IiwidG9nZ2xlQnV0dG9uR3JvdXBCdXR0dG9uc09mZiIsInF1ZXN0aW9uVGV4dCIsInJlcGxhY2UiLCJOdW1iZXIiLCJpbm5lclRleHQiLCJ1dWlkUmVjIiwic3R1ZHlTdGFydGVkUmVjIiwic3R1ZHlTdGFydGVkVGltZVJlYyIsInN0dWR5QWdyZWVtZW50UmVjIiwic3R1ZHlBZ3JlZW1lbnRUaW1lUmVjIiwiY2FtcGFpZ25SZWMiLCJtb2JpbGVSZWMiLCJtYXBWZXJzaW9uUmVjIiwic3R1ZHlRdWVzdGlvblJlYyIsInN1c2Fuc3dlcnNTdWJtaXRlZFJlYyIsImdyaWRTdWJtaXRlZFJlYyIsInN1c2Fuc3dlcnNSZWMiLCJncmlkYW5zd2Vyc1JlYyIsImdyaWRjb3JyZWN0UmVjIiwic3R1ZHlDb21wbGV0ZWRSZWMiLCJncmlkY29ycmVjdFJlY1Byb3BzIiwiZmVhdHVyZXMiLCJ2YWwiLCJwcm9wZXJ0aWVzIiwidmFsdWUiLCJ2IiwianNvbkRhdGEiLCJ1dWlkIiwic3R1ZHlfc3RhcnRlZCIsInN0dWR5X3N0YXJ0ZWRfdGltZSIsInN0dWR5X2FncmVlbWVudCIsInN1c2Fuc3dlcnNfc3VibWl0ZWQiLCJncmlkX3N1Ym1pdGVkIiwic3R1ZHlfYWdyZWVtZW50X3RpbWUiLCJjYW1wYWlnbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJtb2JpbGUiLCJtYXBfdmVyc2lvbiIsImdyaWRfY29ycmVjdCIsImdyaWRfYW5zd2VycyIsImdyaWRhbnN3ZXJzX3RpbWUiLCJzdHVkeV9xdWVzdGlvbiIsInN1c19hbnN3ZXJzIiwic3VzYW5zd2Vyc190aW1lIiwic3R1ZHlfY29tcGxldGVkIiwic2V0RXZlbnRBbGwiLCJzdXNhbnN3ZXJzRGF0ZVJlYyIsImdyaWRhbnN3ZXJzRGF0ZVJlYyIsImJ0bkdyb3VwIiwiY2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwiY2hlY2tWYWxpZE9iamVjdCIsImxlbmd0aCIsImNoaWxkcmVuQXJyYXkiLCJjaGlsZEl0ZW0iLCJVUkxQYXRoIiwibG9jYXRpb24iLCJoYXNoIiwic3R1ZHlNaW5PbmUiLCJzdHVkeU1heE9uZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1hcFZlcnNpb24iLCJtYXBNaW5PbmUiLCJtYXBNYXhPbmUiLCJ0b1N0cmluZyIsImxpYnJhcnkiLCJmYXMiLCJmYXIiLCJkb20iLCJ3YXRjaCIsIm1hcEJveENvbmZpZyIsIk1hcEJveENvbmZpZyIsImhhbmRsZXJzIiwibG9hZEhUTUxCbG9jayIsImJsb2NrU3R1ZHlBZ2dyZWVtZW50IiwiYmxvY2tTdHVkeURpc3NhZ2dyZWUiLCJibG9ja1N0dWR5U1VTIiwiYmxvY2tTdHVkeUNvbXBsZXRlZCIsIm1hcDEiLCJtYXAyYSIsIm1hcDJiIiwibWFwM0FyciIsIm1hcGRlZiIsImJsb2NrU3R1ZHlRdWVzdGlvbjEiLCJtYWtlQW5pbWF0ZU1hcCIsImJsb2NrU3R1ZHlRdWVzdGlvbjIiLCJtYWtlTWFwIiwic3luY01hcHMiLCJibG9ja1N0dWR5UXVlc3Rpb24zIiwibWFrZUNvbXBhcmVNYXAiLCJtYXBFbmRhIiwibWFwRW5kYiIsInJlc2l6ZUFsbE1hcHMiLCJyZXNpemUiLCJzZXRab29tIiwidXJsU3RyaW5nIiwiaHJlZiIsInVybCIsIlVSTCIsInNlYXJjaFBhcmFtcyIsImdldCIsImlzTW9iaWxlRGV2aWNlIiwiYWdncmVtZW50Q2hhbmdlRWxlbWVudHMiLCJhZGRIYW5kbGVyQWdyZWVDbGljayIsImRpc2FnZ3JlbWVudENoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlckRpc2FncmVlQ2xpY2siLCJzdWJtaXRDaGFuZ2VFbGVtZW50cyIsImFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayIsInN1c0NoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlclN1Ym1pdFNVU0NsaWNrIiwiY3VycmVudFNxdWFyZUdyaWRHZW9KU09OIiwiZ2V0U291cmNlIiwic2V0RGF0YSIsInN1c0J0bkdyb3VwRWxlbWVudHMiLCJhZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayIsInN1c05hbWUiLCJzdXNJdGVyYXRpb25zIiwic2V0U3RhdGVGb3JHcm91cCIsInNldERvbVN0YXRlRm9yR3JvdXAiLCJpc1N0dWR5Y29tcGxldGVkIiwic3R1ZHlDb21wbGV0ZWQiLCJTdHVkeUFncnJlZW1lbnQiLCJzdHVkeUFncnJlZWQiLCJncmlkU3VibWl0ZWRTdGF0ZSIsImdyaWRTdWJtaXRlZCIsInN1c1N1Ym1pdGVkU3RhdGUiLCJzdXNTdWJtaXRlZCIsImFnZ3JlbWVudEVsZW1lbnQiLCJkaWFnZ3JlZUVsZW1lbnQiLCJncmlkU3VibWl0RWxlbWVudCIsImNvbXBsZXRlZFN1Ym1pdEVsZW1lbnQiLCJjbGljayIsImV2ZW50IiwicmVsb2FkIiwic3luY01vdmUiLCJyZXF1aXJlIiwic3F1YXJlR3JpZEdlb0pTT04iLCJTcXVhcmVHcmlkR2VvSlNPTk9uZSIsIlNxdWFyZUdyaWRHZW9KU09OU2Vjb25kIiwiU3F1YXJlR3JpZEdlb0pTT05UaGlyZCIsImRlZmF1bHRNYXBTdHlsZSIsImRlZmF1bHRNYXBDZW50ZXIiLCJkZWZhdWx0TWF4Qm91bmRzIiwiZGVmYXVsdE1hcFpvb20iLCJkZWZhdWx0TWFwQ29udGFpbmVyIiwiZGFya01hcFN0eWxlIiwibGlnaHRNYXBTdHlsZSIsIm1hcGJveGdsIiwiTWFwYm94Q29tcGFyZSIsImFjY2Vzc1Rva2VuIiwicXVpZXQiLCJtYXAyIiwiZGVmYXVsdEdyZXlCb3giLCJzZWxlY3RlZEJveCIsIm1hcENoYW5nZUxheWVycyIsImxheWVycyIsIm1pbnpvb20iLCJtYXh6b29tIiwic2NoZW1lIiwidGlsZVNpemUiLCJib3VuZHMiLCJtYXhib3VuZHMiLCJtYXBDaGFuZ2VMYXllcnNPbmUiLCJtYXBDb250YWluZXIiLCJtYXBJbmRleCIsImVuZCIsImVuYWJsZWNsaWNrIiwibWFwU2V0dXAiLCJtYXAiLCJNYXAiLCJjb250YWluZXIiLCJzdHlsZSIsInpvb20iLCJzaG93Wm9vbSIsInRvdWNoRW5hYmxlZCIsImtleWJpbmRpbmdzIiwibWF4Qm91bmRzIiwib24iLCJmaXRNeUJvdW5kcyIsImFkZExheWVyIiwibWFrZVRNU0xheWVyIiwibWFrZUdyaWRPdXRMaW5lTGF5ZXIiLCJtYWtlR3JpZENvcnJlY3RMYXllciIsIm1ha2VHcmlkTGF5ZXIiLCJhZGRHcmlkQ2xpY2siLCJzZXRUaW1lb3V0Iiwib25sb2FkIiwiYWRkQ29udHJvbCIsIk5hdmlnYXRpb25Db250cm9sIiwic2hvd0NvbXBhc3MiLCJjZW50ZXIiLCJpbmRleENvdW50IiwiaW5kZXgiLCJzZXRJbnRlcnZhbCIsInNldExheW91dFByb3BlcnR5IiwibWFwQmVmb3JlQ29udGFpbmVyIiwibWFwQWZ0ZXJDb250YWluZXIiLCJtYXBDb21wYXJlV3JhcHBlcklEIiwiYmVmb3JlTWFwIiwiYWZ0ZXJNYXAiLCJjb21wYXJlIiwic2V0U2xpZGVyIiwibWFwQ2hhbmdlIiwidHlwZSIsInNvdXJjZSIsInRpbGVzIiwicGFpbnQiLCJkYXRhIiwibGF5b3V0IiwiZ2V0Q2FudmFzIiwiY3Vyc29yIiwiZmVhdHVyZSIsIm5ld0ZlYXR1cmUiLCJ0b2dnbGVTZWxlY3RlZEZlYXR1cmUiLCJzZWxlY3RlZEZlYXR1cmVzIiwibWFrZVNlbGVjdGVkRmVhdHVyZUdlb0pTT04iLCJuZXdTcXVhcmVHcmlkR2VvSlNPTiIsInVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyIsInN0b3JlU3F1YXJlR3JpZCIsInN0b3JlU2VsZWN0ZWRGZWF0dXJlIiwiTmV3U3F1YXJlR3JpZEdlb0pTT04iLCJmaXRCb3VuZHMiLCJwYWRkaW5nIiwic2VsZWN0ZWQiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiY3VycmVudEZlYXR1cmVJZHMiLCJjb25jYXQiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImRhdGFwaSIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJkYXRlIiwianNvbmRhdGEiLCJkYXRhQVBJVVJMIiwic2VhcmNoIiwiVVJMU2VhcmNoUGFyYW1zIiwiZmV0Y2giLCJTVEFURV9LRVkiLCJzdG9yYWdlQXZhaWxhYmxlIiwibG9jYWxTdG9yYWdlIiwic3RhdGUiLCJjaGVja1N0YXRlRXhpc3RzIiwiZ2V0U3RhdGUiLCJzdG9yZU9iaiIsIm5ld1N0YXRlT2JqIiwic2V0U3RhdGUiLCJwYXJzZSIsImdldEl0ZW0iLCJjaGVja0l0ZW0iLCJzZXRJdGVtIiwiQm9vbGVhbiIsIml0ZW0iLCJzdGF0ZVN0ciIsImdldFN0YXRlQXNTdHJpbmciLCJpbmRleE9mIiwieCIsIkRPTUV4Y2VwdGlvbiIsImNvZGUiLCJuYW1lIiwiY2hlY2siLCJvYmoiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJrZXlzIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiYSIsInRlc3QiLCJzdWJzdHIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ2ZW5kb3IiLCJvcGVyYSIsInBsYWNlSG9sZGVyRWxlbWVudElEIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiaW5uZXJIVE1MIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50Iiwic3RhdGV0ZXh0IiwiaXRlcmF0aW9ucyIsImJ0blByZWZpeCIsIm5leHRJdGVyYXRpb24iLCJ2YWx1ZUFycmF5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0FHLGlCQUFXdlQsSUFBWCxDQUFnQixFQUFFRixRQUFGLEVBQU8yQyxZQUFQLEVBQWhCO0FBQ0EsVUFBSTJRLGFBQWEsQ0FBakIsRUFBb0I7QUFDbEIsWUFBTUUsZ0JBQWdCRixhQUFhLENBQW5DO0FBQ0EsYUFBSzNULGNBQUwsQ0FBb0IwVCxTQUFwQixFQUErQkcsYUFBL0IsRUFBOENDLFVBQTlDO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRDtBQUNBO0FBQ0EsVUFBTXRULFlBQVksSUFBSUMsSUFBSixHQUFXQyxXQUFYLEVBQWxCO0FBQ0ExQyxZQUFNNEMsWUFBTixDQUFtQixlQUFuQixFQUFvQyxJQUFwQztBQUNBNUMsWUFBTTRDLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0NrVCxVQUFsQztBQUNBOVYsWUFBTTRDLFlBQU4sQ0FBbUIsa0JBQW5CLEVBQXVDSixTQUF2QztBQUNBLGFBQU8sSUFBUDtBQUNEIiwiZmlsZSI6ImluZGV4LmFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjBjMDExNzMwYWM2NWU2ZTJiN2EyXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJpbmRleFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvcnN+aW5kZXhcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50LWFsbFxcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMFxcXCI+XFxuXFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnQtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdHVkeSBQYXJ0aWNpcGF0aW9uIEFncmVlbWVudDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50XFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaC0xMDBcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIFRoYW5rIHlvdSBmb3IgdGFraW5nIHBhcnQgaW4gdGhpcyBzdHVkeS4gQnkgdXNpbmcgdGhlIGZvbGxvd2luZyB3ZWJzaXRlLFxcbiAgICAgICAgeW91IGFncmVlIHRvIHBhcnRpY2lwYXRlIGluIGEgc3R1ZHkgYWJvdXQgaG93IHBlb3BsZSB1c2Ugd2ViLXByZXNlbnRlZCBtYXBzLlxcbiAgICAgICAgV2Ugd2lsbCBjb2xsZWN0IGluZm9ybWF0aW9uIGFib3V0IHlvdXIgaW50ZXJhY3Rpb25zIHdpdGggdGhpcyBzaXRlIGJ1dCBub3QgYW55XFxuICAgICAgICBwZXJzb25hbGx5IGlkZW50aWZpYWJsZSBpbmZvcm1hdGlvbi4gVGhlIG9ubHkgcGVvcGxlIHdpdGggYWNjZXNzIHRvIHRoZSBzdHVkeVxcbiAgICAgICAgZGF0YSBhcmUgdGhlIHJlc2VhcmNoZXJzLiBIb3dldmVyLCB0aGUgZGF0YSB3aWxsIGJlIHN1bW1hcml6ZWQsIHNoYXJlZCwgYW5kXFxuICAgICAgICBkaXNzZW1pbmF0ZWQgaW4gdGFsa3MsIGJsb2dzLCBhbmQgcG9zc2libHkgcmVzZWFyY2ggam91cm5hbHMuIFRoZXJlIGlzIG5vXFxuICAgICAgICBjb3N0IHRvIHlvdSB0byBwYXJ0aWNpcGF0ZSBpbiB0aGlzIHJlc2VhcmNoIHN0dWR5LCBhbmQgeW91IHdpbGwgbm90IGJlXFxuICAgICAgICBjb21wZW5zYXRlZC4gVGhlcmUgYXJlIG5vIGtub3duIHJpc2tzIGluIHRoZSBmb2xsb3dpbmcgdGFza3MuXFxuICAgICAgICA8YnIgLz48YnIgLz5cXG4gICAgICAgIEJ5IGFncmVlaW5nIHRvIHRoaXMsIHlvdSBoYXZlIGFja25vd2xlZGdlZCB0aGF0IHlvdSBoYXZlIHJlYWQgdGhlXFxuICAgICAgICBjb250ZW50cyBvZiB0aGlzIGNvbnNlbnQsIGFyZSBhbiBhZHVsdCBvdmVyIDE4IHllYXJzIG9mIGFnZSwgYW5kXFxuICAgICAgICB5b3UgYXJlIGdpdmluZyBjb25zZW50IHRvIHBhcnRpY2lwYXRlIGluIHRoaXMgc3R1ZHkuXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTVcXFwiPkRvIHlvdSB3YW50IHRvIHBhcnRpY2lwYXRlPzwvZGl2PlxcblxcbiAgPHNwYW4gY2xhc3M9XFxcIm10LTMgaC1hdXRvIGQtZmxleFxcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcImFnZ3JlZS1idXR0b25cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZCBtci0zXFxcIiA+XFxuICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS1jaGVja1xcXCI+PC9pPlxcbiAgICAgIFllc1xcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiBpZD1cXFwiZGlhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXhsaWdodCBidG4tYWdncmVlbWVudCB3LTIwIGFsaWduLXNlbGYtZW5kXFxcIiA+XFxuICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS10aW1lcy1jaXJjbGVcXFwiPjwvaT5cXG4gICAgICBOb1xcbiAgICA8L2J1dHRvbj5cXG4gIDwvc3Bhbj5cXG5cXG4gIDwhLS0gPGRpdiBpZD1cXFwiYWdncmVlLWRpc2FnZ3JlLXdyYXBwZXJcXFwiIGNsYXNzPVxcXCJtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50LXN1YlxcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyBhbGlnbi1zZWxmLWNlbnRlciBwYi00IHB5LTJcXFwiPkRvIHlvdSB3YW50IHRvIHBhcnRpY2lwYXRlPzwvZGl2PlxcbiAgICA8YnV0dG9uIGlkPVxcXCJhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmQgbXItM1xcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtY2hlY2tcXFwiPjwvaT5cXG4gICAgICBZZXNcXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b24gaWQ9XFxcImRpYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi14bGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZFxcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtdGltZXMtY2lyY2xlXFxcIj48L2k+XFxuICAgICAgTm9cXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj4gLS0+XFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLWVuZFxcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDBcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwXFxcIj5cXG4gICAgVGhhbmtzIGZvciBwYXJ0aWNpcGF0aW5nIVxcbiAgPC9kaXY+XFxuXFxuICA8IS0tIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItZW5kXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci1lbmRcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBpZD0nY29tcGFyZS1lbmQtd3JhcHBlcic+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtYy1lbmRhXFxcIiBjbGFzcz1cXFwibXktMyBteC0zXFxcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1jLWVuZGJcXFwiIGNsYXNzPVxcXCJteS0zIG14LTNcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgIC0tPlxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci1lbmRcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMCBtbC0zXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBweC0wIHctMTAwXFxcIiA+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHctMTAwXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtbWQtMTIgcHgtMCBweS0xIHctMTAwXFxcIiA+XFxuICAgICAgICAgIFlvdXIgYW5zd2VyXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1lbmRhXFxcIiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IHB4LTAgbWFwLWVuZGEgZW5kbWFwXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgbXQtNCB3LTEwMFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgcHgtMCBweS0xIHctMTAwXFxcIiA+XFxuICAgICAgICAgIE91ciBhbnN3ZXJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLWVuZGJcXFwiIGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTYgcHgtMCBtYXAtZW5kYiBlbmRtYXBcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LWRpc3NhZ2dyZWVcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+VGhhbmtzIGFueXdheSE8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0dWR5LWRpc3NhZ2dyZWUtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIDxzcGFuPlxcbiAgICAgIFRoYW5rIHlvdSBmb3IgY29uc2lkZXJpbmcgYmVpbmcgYSBwYXJ0aWNpcGFudC4gSWYgeW91IGNoYW5nZSB5b3VybWluZCB5b3UgY2FuXFxuICAgICAgYWx3YXlzIHJldmlldyB0aGUgPGEgaHJlZj1cXFwiXFxcIj5hZ2dyZW1lbnQ8L2E+IGFnYWluIVxcbiAgICA8L3NwYW4+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtbWFwLTBcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAxIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBUaGUgbWFwIGJlbG93IGNvbnRhaW5zIHR3byBpbWFnZXMgdGhhdCBhcmUgZGlmZmVyZW50LiBUaGUgdHdvIGltYWdlc1xcbiAgICB3aWxsIHR1cm4gb24gYW5kIG9mZiBhdCBhIHJlZ3VsYXIgaW50ZXJ2YWwuIENsaWNrIG9uIGFueSBib3ggd2hlcmUgeW91XFxuICAgIGJlbGlldmUgdGhlIHR3byBpbWFnZXMgYXJlIGRpZmZlcmVudC4gVGhlIGJveGVzIHlvdSBjbGljayBvbiB3aWxsIGNoYW5nZVxcbiAgICBvcmFuZ2UgYW5kIHdpbGwgYmVjb21lIHlvdXIgYW5zd2VycyB3aGVuIHlvdSBjbGljayBzdWJtaXQuIENsaWNraW5nIG9uIGFuXFxuICAgIG9yYW5nZSBib3ggd2lsbCByZW1vdmUgaXQgZnJvbSB5b3VyIHNlbGVjdGlvbi5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci0xXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci0xXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcIm1hcC0xXFxcIiBjbGFzcz1cXFwibXktMyBteC0zXFxcIj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAyIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBTdWJtaXQgdGhlIHNlbGVjdGVkIGJveGVzIChpbiBvcmFuZ2UpIGFzIHlvdXIgYW5zd2VyIHRvIGFyZWFzIHRoYXQgaGF2ZSBjaGFuZ2VkLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTBcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiU3VibWl0IGFuZCBnbyB0byBzdXJ2ZXkuXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtbWFwLTFcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAxIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBUaGUgdHdvIG1hcHMgYmVsb3cgY29udGFpbiBpbWFnZXMgdGhhdCBhcmUgZGlmZmVyZW50LiBDbGljayBvbiBhbnkgYm94ZXMgd2hlcmVcXG4gICAgeW91IGJlbGlldmUgdGhlIHR3byBpbWFnZXMgYXJlIGRpZmZlcmVudC4gVGhlIGJveGVzIHlvdSBjbGljayBvbiB3aWxsIGNoYW5nZVxcbiAgICBvcmFuZ2UgYW5kIHdpbGwgYmVjb21lIHlvdXIgYW5zd2VycyB3aGVuIHlvdSBjbGljayBzdWJtaXQuIENsaWNraW5nIG9uIGFuXFxuICAgIG9yYW5nZSBib3ggd2lsbCByZW1vdmUgaXQgZnJvbSB5b3VyIHNlbGVjdGlvbi5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci0yXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtbC0zIG10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTJcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IGR1YWxtYXBzIGQtZmxleFxcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtMmFcXFwiIGNsYXNzPVxcXCJteS0zIG14LTAgbXgtc20tMCBteC1tZC0zIG1hcC0yYVxcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IGR1YWxtYXBzIGQtZmxleFxcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtMmJcXFwiIGNsYXNzPVxcXCJteS0zIG14LTAgbXgtc20tMCBteC1tZC0zIG1hcC0yYlxcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMiBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgU3VibWl0IHRoZSBzZWxlY3RlZCBib3hlcyAoaW4gb3JhbmdlKSBhcyB5b3VyIGFuc3dlciB0byBhcmVhcyB0aGF0IGhhdmUgY2hhbmdlZC5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IG10LTNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLXN1cy0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgU3VibWl0XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLW1hcC0yXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMSBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgVGhlIG1hcCBiZWxvdyBjb250YWlucyB0d28gaW1hZ2VzIHRoYXQgYXJlIGRpZmZlcmVudC4gRHJhZyB0aGUgdmVydGljYWwgYmFyIHNpZGUtdG8tc2lkZVxcbiAgICB0byByZXZlYWwgdGhlIGltYWdlcy4gQ2xpY2sgb24gYW55IGJveCB3aGVyZSB5b3UgYmVsaWV2ZSB0aGUgdHdvIGltYWdlcyBhcmUgZGlmZmVyZW50LiBUaGVcXG4gICAgYm94ZXMgeW91IGNsaWNrIG9uIHdpbGwgY2hhbmdlIG9yYW5nZSBhbmQgd2lsbCBiZWNvbWUgeW91ciBhbnN3ZXJzIHdoZW4geW91IGNsaWNrXFxuICAgIHN1Ym1pdC4gQ2xpY2tpbmcgb24gYW4gb3JhbmdlIGJveCB3aWxsIHJlbW92ZSBpdCBmcm9tIHlvdXIgc2VsZWN0aW9uLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLTNcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTNcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlciBjb21wYXJlXFxcIj5cXG4gICAgICA8ZGl2IGlkPSdjb21wYXJlLXdyYXBwZXInPlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLTNhXFxcIiBjbGFzcz1cXFwibXgtM1xcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtM2JcXFwiIGNsYXNzPVxcXCJteC0zXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAyIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBTdWJtaXQgeW91IHNlbGVjdGVkIGJveGVzIChpbiBvcmFuZ2UpIGFzIHlvdXIgYW5zd2VyIHRvIGFyZWFzIHRoYXQgaGF2ZSBjaGFuZ2VkLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiU3VibWl0IGFuZCBnbyB0byBzdXJ2ZXkuXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3Mtc3VzXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMyBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgUmFuayBlYWNoIHF1ZXN0aW9uIGZyb20gMSB0byA1IGJhc2VkIG9uIGhvdyBtdWNoIHlvdSBhZ3JlZSBvciBkaXNhZ2dyZVxcbiAgICB3aXRoIHRoZSBzdGF0ZW1lbnQuICAxIGluZGljYXRlcyB5b3Ugc3Ryb25nbHkgZGlzYWdyZWUuIDUgaW5kaWNhdGVzXFxuICAgIHlvdSBzdHJvbmdseSBhZ2dyZWUuXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInBsLTEgcHQtMyBwYi0zXFxcIj5cXG4gICAgJm5ic3A7XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1vZGRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMS4mbmJzcDsmbmJzcDtJIHRoaW5rIHRoYXQgSSB3b3VsZCBsaWtlIHRvIHVzZSB0aGlzIHNpdGUgZnJlcXVlbnRseVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0xXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIGJ0bi1zdXMgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMi4mbmJzcDsmbmJzcDtJIGZvdW5kIHRoZSBzaXRlIHVubmVjZXNzYXJpbHkgY29tcGxleFxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0yXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDMuJm5ic3A7Jm5ic3A7SSB0aG91Z2h0IHRoZSBzaXRlIHdhcyBlYXN5IHRvIHVzZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0zXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA0LiZuYnNwOyZuYnNwO0kgdGhpbmsgdGhhdCBJIHdvdWxkIG5lZWQgdGhlIHN1cHBvcnQgb2YgYSB0ZWNobmljYWwgcGVyc29uIHRvIGJlIGFibGUgdG8gdXNlIHRoaXMgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy00XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDUuJm5ic3A7Jm5ic3A7SSBmb3VuZCB0aGUgdmFyaW91cyBmdW5jdGlvbnMgaW4gdGhpcyBzaXRlIHdlcmUgd2VsbCBpbnRlZ3JhdGVkXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwYi0yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTVcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDYuJm5ic3A7Jm5ic3A7SSB0aG91Z2h0IHRoZXJlIHdhcyB0b28gbXVjaCBpbmNvbnNpc3RlbmN5IGluIHRoaXMgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy02XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDcuJm5ic3A7Jm5ic3A7SSB3b3VsZCBpbWFnaW5lIHRoYXQgbW9zdCBwZW9wbGUgd291bGQgbGVhcm4gdG8gdXNlIHRoaXMgc2l0ZSB2ZXJ5IHF1aWNrbHlcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtN1xcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE3LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTctMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNy0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE3LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTctNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgOC4mbmJzcDsmbmJzcDtJIGZvdW5kIHRoZSBzaXRlIHZlcnkgY3VtYmVyc29tZSB0byB1c2VcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtOFxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA5LiZuYnNwOyZuYnNwO0kgZmVsdCB2ZXJ5IGNvbmZpZGVudCB1c2luZyB0aGUgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy05XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICAxMC4mbmJzcDsmbmJzcDtJIG5lZWRlZCB0byBsZWFybiBhIGxvdCBvZiB0aGluZ3MgYmVmb3JlIEkgY291bGQgZ2V0IGdvaW5nIHdpdGggdGhpcyBzaXRlXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwYi0yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTEwXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMCBkLWZsZXggbXQtNFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcInB0LXNtLTIgcHQtbWQtMCBjb2wtMTIgY29sLXNtLTEyIGNvbC1tZC03XFxcIj5cXG4gICAgICAmbmJzcDtcXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLTQgcHQtc20tMiBwdC1tZC0wIGNvbC0xMiBjb2wtc20tMTIgY29sLW1kLTVcXFwiPlxcbiAgICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tZW5kXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZmluaXNoLlxcXCI+XFxuICAgICAgICBTdWJtaXQgYW5kIGZpbmlzaFxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbjwvZGl2PlxcblwiOyIsImltcG9ydCB7IFJlY29yZFN0dWR5RGF0YSB9IGZyb20gJy4vcmVjb3JkLXN0dWR5LWRhdGEnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IFV0aWxpdHkgfSBmcm9tICcuL3V0aWxpdHknO1xuXG5jb25zdCByZWNvcmRTdHVkeURhdGEgPSBuZXcgUmVjb3JkU3R1ZHlEYXRhKCk7XG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuZXhwb3J0IGNsYXNzIEhhbmRsZXJzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kaXNwbGF5Tm9uZUNsYXNzID0gJ2Qtbm9uZSc7XG4gICAgdGhpcy5zZWxlY3RlZENsYXNzID0gJ3NlbGVjdGVkJztcblxuICAgIC8vIHN0dWR5IGFnZ3JlZW1lbnRcbiAgICB0aGlzLnN0dWR5QWdncmVlbWVudEVsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1tYXAtJ107XG4gICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSA9IFsnYmxvY2stc3R1ZHktYWdncmVlbWVudC1ob2xkZXInXTtcblxuICAgIC8vIHN0dWR5IGRpc2FnZ3JlZW1lbnRcbiAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzQWRkID0gWydzdHVkeS1kaXNzYWdncmVlJ107XG4gICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSA9IFsnYmxvY2stc3R1ZHktYWdncmVlbWVudC1ob2xkZXInXTtcblxuICAgIC8vIHN0dWR5IHF1ZXN0aW9ucyBtYXAgY2hhbmdlXG4gICAgdGhpcy5zdHVkeVF1ZXN0aW9uRWxlbWVudHNBZGQgPSBbJ3N0dWR5LXByb2dyZXNzLXN1cycsICdibG9jay1zdHVkeS1zdXMtaG9sZGVyJ107XG4gICAgdGhpcy5zdHVkeVF1ZXN0aW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzUmVtb3ZlID0gW2BzdHVkeS1wcm9ncmVzcy1tYXAtJHt0aGlzLnN0dWR5UXVlc3Rpb259YCwgJ21hcC1hY3Rpb24taG9sZGVyJ107XG5cbiAgICAvLyBTVVMgc2NvcmVzXG4gICAgdGhpcy5zdHVkeVNVU0VsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1lbmQnLCAnYmxvY2stc3R1ZHktY29tcGxldGVkLWhvbGRlciddO1xuICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c1JlbW92ZSA9IFsnc3R1ZHktcHJvZ3Jlc3Mtc3VzJywgJ2Jsb2NrLXN0dWR5LXN1cy1ob2xkZXInXTtcbiAgICB0aGlzLnN1c1N0b3JhZ2VLZXlzID0gWydzdXMtcXVlc3Rpb24tMScsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTInLFxuICAgICAgJ3N1cy1xdWVzdGlvbi0zJyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNCcsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTUnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi02JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNycsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTgnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi05JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tMTAnXTtcbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3Igc3VibWl0dGluZyBjaGFuZ2UgZGF0YSBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIGVsZW1lbnRJRCAtIEhUTUwgZWxlbWVudCBJRFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlclN1Ym1pdENoYW5nZUNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuXG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gYWRkIGVsZW1lbnRzIHRvIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBncmlkTmFtZSA9ICdncmlkLWJveC0nO1xuICAgICAgICBjb25zdCBncmlkSXRlcmF0aW9ucyA9IDQyO1xuICAgICAgICB1dGlsaXR5LnNldEFQSUZvckdyb3VwKGdyaWROYW1lLCBncmlkSXRlcmF0aW9ucyk7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgcGFnZTogMiB9LCAnI3N1cy1xdWVzdGlvbnMnLCAnI3N1cy1xdWVzdGlvbnMnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBzdWJtaXR0aW5nIHN1cyBzY29yZVxuICAvL1xuICAvLyBAcGFyYW0gZWxlbWVudElEIC0gSFRNTCBlbGVtZW50IElEXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyU3VibWl0U1VTQ2xpY2soZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gYWRkIGVsZW1lbnRzIHRvIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5U1VTRWxlbWVudHNSZW1vdmUuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGFkZCBkaXNwbGF5IG5vbmUgY2xhc3MgaWYgdGhlIGNsYXNzIGRvZXMgbm90IGV4c2lzdFxuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGR1cGxpY2F0ZSBjbGFzc2VzIGFyZSBub3QgYWRkZWRcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5kaXNwbGF5Tm9uZUNsYXNzKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5hZGQodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN1c1ZhbHVlQXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5zdXNTdG9yYWdlS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkFuc3dlciA9IHN0b3JlLmdldFN0YXRlSXRlbShrZXkpO1xuICAgICAgICAgIHN1c1ZhbHVlQXJyYXkucHVzaCh7IGtleSwgcXVlc3Rpb25BbnN3ZXIgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkYXRlc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIHV0aWxpdHkudHJpZ2dlckV2ZW50KCdzdXMtY2xpY2tlZCcsICdzdXMtY2xpY2tlZCcpO1xuXG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy1zdWJtaXRlZCcsIHRydWUpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMnLCBzdXNWYWx1ZUFycmF5KTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXRpbWUnLCBkYXRlc3RhbXApO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWNvbXBsZXRlZCcsIHRydWUpO1xuICAgICAgICBIYW5kbGVycy5yZWNvcmRBZ2dyZWVkKCk7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgcGFnZTogMyB9LCAnI3N0dWR5LWNvbXBsZXRlZCcsICcjc3R1ZHktY29tcGxldGVkJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgICAvLyB0ZW1wIGdldCByaWQgb2Ygc3RhdGUgaXRlbXNcbiAgICAgICAgLy8gUkVNT1ZFIEZPUiBSRUxFQVNFXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB3aW5kb3dbJ2xvY2FsU3RvcmFnZSddOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSgnc3RhdGUnKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RhdGljIHJlY29yZERpc2FnZ3JlZWQoKSB7XG4gICAgY29uc3QgdXVpZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpO1xuICAgIGNvbnN0IHN0dWR5U3RhcnRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCcpO1xuICAgIGNvbnN0IHN0dWR5U3RhcnRlZFRpbWVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQgdGltZScpO1xuICAgIGNvbnN0IHN0dWR5QWdyZWVtZW50UmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnKTtcbiAgICBjb25zdCBzdHVkeUFncmVlbWVudFRpbWVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudC10aW1lJyk7XG4gICAgY29uc3QgY2FtcGFpZ25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2NhbXBhaWduJyk7XG4gICAgY29uc3QgbW9iaWxlUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtb2JpbGUnKTtcbiAgICBjb25zdCBtYXBWZXJzaW9uUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IHN0dWR5UXVlc3Rpb25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJyk7XG4gICAgY29uc3Qgc3VzYW5zd2Vyc1N1Ym1pdGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXN1Ym1pdGVkJyk7XG4gICAgY29uc3QgZ3JpZFN1Ym1pdGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdncmlkLXN1Ym1pdGVkJyk7XG4gICAgY29uc3Qgc3VzYW5zd2Vyc1JlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2VycycpO1xuICAgIGNvbnN0IGdyaWRhbnN3ZXJzUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdncmlkYW5zd2VycycpO1xuICAgIGNvbnN0IGdyaWRjb3JyZWN0UmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgIGNvbnN0IHN0dWR5Q29tcGxldGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1jb21wbGV0ZWQnKTtcblxuICAgIGNvbnN0IGdyaWRjb3JyZWN0UmVjUHJvcHMgPSBbXTtcblxuICAgIGdyaWRjb3JyZWN0UmVjLmZlYXR1cmVzLmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgZ3JpZGNvcnJlY3RSZWNQcm9wcy5wdXNoKHtcbiAgICAgICAga2V5OiBgZ3JpZC1ib3gtJHt2YWwucHJvcGVydGllcy5pZH1gLFxuICAgICAgICB2YWx1ZTogdmFsLnByb3BlcnRpZXMudlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBqc29uRGF0YSA9IHtcbiAgICAgIHV1aWQ6IHV1aWRSZWMsXG4gICAgICBzdHVkeV9zdGFydGVkOiBzdHVkeVN0YXJ0ZWRSZWMsXG4gICAgICBzdHVkeV9zdGFydGVkX3RpbWU6IHN0dWR5U3RhcnRlZFRpbWVSZWMsXG4gICAgICBzdHVkeV9hZ3JlZW1lbnQ6IHN0dWR5QWdyZWVtZW50UmVjLFxuICAgICAgc3VzYW5zd2Vyc19zdWJtaXRlZDogc3VzYW5zd2Vyc1N1Ym1pdGVkUmVjLFxuICAgICAgZ3JpZF9zdWJtaXRlZDogZ3JpZFN1Ym1pdGVkUmVjLFxuICAgICAgc3R1ZHlfYWdyZWVtZW50X3RpbWU6IHN0dWR5QWdyZWVtZW50VGltZVJlYyxcbiAgICAgIGNhbXBhaWduOiBKU09OLnN0cmluZ2lmeShjYW1wYWlnblJlYyksXG4gICAgICBtb2JpbGU6IEpTT04uc3RyaW5naWZ5KG1vYmlsZVJlYyksXG4gICAgICBtYXBfdmVyc2lvbjogbWFwVmVyc2lvblJlYyxcbiAgICAgIGdyaWRfY29ycmVjdDogSlNPTi5zdHJpbmdpZnkoZ3JpZGNvcnJlY3RSZWNQcm9wcyksXG4gICAgICBncmlkX2Fuc3dlcnM6IEpTT04uc3RyaW5naWZ5KGdyaWRhbnN3ZXJzUmVjKSxcbiAgICAgIGdyaWRhbnN3ZXJzX3RpbWU6ICcnLFxuICAgICAgc3R1ZHlfcXVlc3Rpb246IHN0dWR5UXVlc3Rpb25SZWMsXG4gICAgICBzdXNfYW5zd2VyczogSlNPTi5zdHJpbmdpZnkoc3VzYW5zd2Vyc1JlYyksXG4gICAgICBzdXNhbnN3ZXJzX3RpbWU6ICcnLFxuICAgICAgc3R1ZHlfY29tcGxldGVkOiBzdHVkeUNvbXBsZXRlZFJlY1xuICAgIH07XG5cbiAgICByZWNvcmRTdHVkeURhdGEuc2V0RXZlbnRBbGwoanNvbkRhdGEpO1xuICB9XG5cbiAgc3RhdGljIHJlY29yZEFnZ3JlZWQoKSB7XG4gICAgY29uc3QgdXVpZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpO1xuICAgIGNvbnN0IHN0dWR5U3RhcnRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCcpO1xuICAgIGNvbnN0IHN0dWR5U3RhcnRlZFRpbWVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQgdGltZScpO1xuICAgIGNvbnN0IHN0dWR5QWdyZWVtZW50UmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnKTtcbiAgICBjb25zdCBzdHVkeUFncmVlbWVudFRpbWVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudC10aW1lJyk7XG4gICAgY29uc3QgY2FtcGFpZ25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2NhbXBhaWduJyk7XG4gICAgY29uc3QgbW9iaWxlUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtb2JpbGUnKTtcbiAgICBjb25zdCBtYXBWZXJzaW9uUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IHN0dWR5UXVlc3Rpb25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJyk7XG4gICAgY29uc3Qgc3VzYW5zd2Vyc1N1Ym1pdGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXN1Ym1pdGVkJyk7XG4gICAgY29uc3QgZ3JpZFN1Ym1pdGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdncmlkLXN1Ym1pdGVkJyk7XG4gICAgY29uc3Qgc3VzYW5zd2Vyc1JlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2VycycpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNEYXRlUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXRpbWUnKTtcbiAgICBjb25zdCBncmlkYW5zd2Vyc1JlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMnKTtcbiAgICBjb25zdCBncmlkYW5zd2Vyc0RhdGVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzLXRpbWUnKTtcbiAgICBjb25zdCBncmlkY29ycmVjdFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICBjb25zdCBzdHVkeUNvbXBsZXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJyk7XG5cbiAgICBjb25zdCBncmlkY29ycmVjdFJlY1Byb3BzID0gW107XG5cbiAgICBncmlkY29ycmVjdFJlYy5mZWF0dXJlcy5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgIGdyaWRjb3JyZWN0UmVjUHJvcHMucHVzaCh7XG4gICAgICAgIGtleTogYGdyaWQtYm94LSR7dmFsLnByb3BlcnRpZXMuaWR9YCxcbiAgICAgICAgdmFsdWU6IHZhbC5wcm9wZXJ0aWVzLnZcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkRhdGEgPSB7XG4gICAgICB1dWlkOiB1dWlkUmVjLFxuICAgICAgc3R1ZHlfc3RhcnRlZDogc3R1ZHlTdGFydGVkUmVjLFxuICAgICAgc3R1ZHlfc3RhcnRlZF90aW1lOiBzdHVkeVN0YXJ0ZWRUaW1lUmVjLFxuICAgICAgc3R1ZHlfYWdyZWVtZW50OiBzdHVkeUFncmVlbWVudFJlYyxcbiAgICAgIHN1c2Fuc3dlcnNfc3VibWl0ZWQ6IHN1c2Fuc3dlcnNTdWJtaXRlZFJlYyxcbiAgICAgIGdyaWRfc3VibWl0ZWQ6IGdyaWRTdWJtaXRlZFJlYyxcbiAgICAgIHN0dWR5X2FncmVlbWVudF90aW1lOiBzdHVkeUFncmVlbWVudFRpbWVSZWMsXG4gICAgICBjYW1wYWlnbjogSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25SZWMpLFxuICAgICAgbW9iaWxlOiBKU09OLnN0cmluZ2lmeShtb2JpbGVSZWMpLFxuICAgICAgbWFwX3ZlcnNpb246IG1hcFZlcnNpb25SZWMsXG4gICAgICBncmlkX2NvcnJlY3Q6IEpTT04uc3RyaW5naWZ5KGdyaWRjb3JyZWN0UmVjUHJvcHMpLFxuICAgICAgZ3JpZF9hbnN3ZXJzOiBKU09OLnN0cmluZ2lmeShncmlkYW5zd2Vyc1JlYyksXG4gICAgICBncmlkYW5zd2Vyc190aW1lOiBncmlkYW5zd2Vyc0RhdGVSZWMsXG4gICAgICBzdHVkeV9xdWVzdGlvbjogc3R1ZHlRdWVzdGlvblJlYyxcbiAgICAgIHN1c19hbnN3ZXJzOiBKU09OLnN0cmluZ2lmeShzdXNhbnN3ZXJzUmVjKSxcbiAgICAgIHN1c2Fuc3dlcnNfdGltZTogc3VzYW5zd2Vyc0RhdGVSZWMsXG4gICAgICBzdHVkeV9jb21wbGV0ZWQ6IHN0dWR5Q29tcGxldGVkUmVjXG4gICAgfTtcblxuICAgIHJlY29yZFN0dWR5RGF0YS5zZXRFdmVudEFsbChqc29uRGF0YSk7XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIGFnZ3JlZWluZyB0byBkbyBzdHVkeVxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlckFncmVlQ2xpY2soZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3Qgc3R1ZHlWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgICAgICBjb25zdCBhZ3JlZW1lbnRUaW1lU3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgICAgLy8gYWRkIGVsZW1lbnRzIHRvIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlBZ2dyZWVtZW50RWxlbWVudHNBZGQuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtlbGVtZW50VUlJRH0ke3N0dWR5VmVyc2lvbn1gKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5QWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlsaXR5LnRyaWdnZXJFdmVudCgnYWdncmVlLWNsaWNrZWQnLCAnaGFuZGxlQWdyZWVDbGljaycpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIHRydWUpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudC10aW1lJywgYWdyZWVtZW50VGltZVN0YW1wKTtcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoeyBwYWdlOiAxIH0sICcjbWFwJywgJyNtYXAnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBESVNhZ2dyZWVpbmcgdG8gZG8gc3R1ZHlcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJEaXNhZ3JlZUNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGFncmVlbWVudFRpbWVTdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgLy8gYWRkIGVsZW1lbnRzIHRvIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNBZGQuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyAgcmVtb3ZlIGVsZW1lbnRzIGZyb20gVUlcbiAgICAgICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbGl0eS50cmlnZ2VyRXZlbnQoJ2Rpc2FnZ3JlZS1jbGlja2VkJywgJ2hhbmRsZUFncmVlQ2xpY2snKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCBmYWxzZSk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50LXRpbWUnLCBhZ3JlZW1lbnRUaW1lU3RhbXApO1xuICAgICAgICBIYW5kbGVycy5yZWNvcmREaXNhZ2dyZWVkKCk7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgcGFnZTogMSB9LCAnI2Rpc2FnZ3JlZScsICcjZGlzYWdncmVlJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3IgaW5kaXZpZHVhbCBzdXMgc2NvcmUgcXVlc3Rpb25zIHRvIGxvY2FsIHN0b3JhZ2VcbiAgLy9cbiAgLy8gQHBhcmFtIGVsZW1lbnRJRCAtIEhUTUwgZWxlbWVudCBJRFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlclNVU1F1ZXN0aW9uQ2xpY2soZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgdGhpcy5zZWxlY3RlZENsYXNzID0gJ3NlbGVjdGVkJztcblxuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGdldCBwYXJlbnQgZWxlbWVudCB3aGljaCBpcyBidXR0b24gZ3JvdXBcbiAgICAgICAgY29uc3QgcGFyZW50QnRuR3JvdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkucGFyZW50RWxlbWVudDtcbiAgICAgICAgSGFuZGxlcnMudG9nZ2xlQnV0dG9uR3JvdXBCdXR0dG9uc09mZihwYXJlbnRCdG5Hcm91cCwgdGhpcy5zZWxlY3RlZENsYXNzKTtcblxuICAgICAgICBjb25zdCBxdWVzdGlvblRleHQgPSBwYXJlbnRCdG5Hcm91cC5pZC5yZXBsYWNlKCdidG4tZ3JvdXAtc3VzLScsICdzdXMtcXVlc3Rpb24tJyk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShxdWVzdGlvblRleHQsIE51bWJlcihlLnRhcmdldC5pbm5lclRleHQpKTtcblxuICAgICAgICAvLyBhZGQgc3VzIHF1ZXN0aW9uIGFuc3dlciB0byBzZWxlY3RlZCB0byBjbGFzc1xuICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUudGFyZ2V0LmlkKS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5zZWxlY3RlZENsYXNzKSkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUudGFyZ2V0LmlkKS5jbGFzc0xpc3QuYWRkKHRoaXMuc2VsZWN0ZWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHJlbW92ZXMgdGhlIHNlbGVjdGVkIGNsYXNzIFwidW5zbGVjdHNcIiBhbGwgdGhlIGJ1dHRvbnNcbiAgLy8gIGluIGEgYnV0dG9uIGdyb3VwXG4gIC8vXG4gIC8vIEBwYXJhbSBidG5Hcm91cCAtIEhUTUwgZWxlbWVudFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc3RhdGljIHRvZ2dsZUJ1dHRvbkdyb3VwQnV0dHRvbnNPZmYoYnRuR3JvdXAsIHNlbGVjdGVkQ2xhc3MpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGJ0bkdyb3VwLmNoaWxkTm9kZXM7XG4gICAgLy8gbWFrZSBzdXJlIGNoaWxkcmVuIGlzIHZhbGl1ZCBvYmplY3RcbiAgICBpZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChjaGlsZHJlbikpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgLy8gbWFrZSBzdXJlIHRoZXJlIGFyZSBjaGlsZGVyZW4gYnV0dG9uc1xuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbkFycmF5ID0gWy4uLmNoaWxkcmVuXTtcbiAgICAgIGNoaWxkcmVuQXJyYXkuZm9yRWFjaCgoY2hpbGRJdGVtKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZEl0ZW0uY2xhc3NMaXN0KSB7XG4gICAgICAgICAgY2hpbGRJdGVtLmNsYXNzTGlzdC5yZW1vdmUoc2VsZWN0ZWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiLy8gaW1wb3J0IGRlcGVuZGVuY2llc1xuLy8gVE9ET1Ncbi8vIHBsYXkgcGF1c2Ugb24gYW5pbWF0aW9uIC0gbWF5YmVcbmltcG9ydCB7IGxpYnJhcnksIGRvbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFyIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtcmVndWxhci1zdmctaWNvbnMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IE1hcEJveENvbmZpZyB9IGZyb20gJy4vbWFwLWNvbmZpZyc7XG5pbXBvcnQgeyBVdGlsaXR5IH0gZnJvbSAnLi91dGlsaXR5JztcbmltcG9ydCB7IEhhbmRsZXJzIH0gZnJvbSAnLi9oYW5kbGVycyc7XG5cbmltcG9ydCBibG9ja1N0dWR5QWdncmVlbWVudCBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1hZ2dyZWVtZW50Lmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlEaXNzYWdncmVlIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVF1ZXN0aW9uMSBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0xLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlRdWVzdGlvbjIgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMi5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5UXVlc3Rpb24zIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVNVUyBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1zdXMuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeUNvbXBsZXRlZCBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1jb21wbGV0ZWQuaHRtbCc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcbmNvbnN0IHV0aWxpdHkgPSBuZXcgVXRpbGl0eSgpO1xuXG5jb25zdCBVUkxQYXRoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbi8vIHN0dWR5IGNvbnN0cmFpbnRzIG51bWJlciBvZiBxdWVzdGlvbnMgc3RhcnRzIHdpdGggMFxubGV0IHN0dWR5VmVyc2lvbiA9IDA7IC8vIGRlZmF1bHQgc3R1ZHkgdmVyc2lvblxuaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJykpKSB7XG4gIHN0dWR5VmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbn0gZWxzZSB7XG4gIGNvbnN0IHN0dWR5TWluT25lID0gMDtcbiAgY29uc3Qgc3R1ZHlNYXhPbmUgPSAyO1xuICBzdHVkeVZlcnNpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoc3R1ZHlNYXhPbmUgLSBzdHVkeU1pbk9uZSArIDEpICsgc3R1ZHlNaW5PbmUpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJywgc3R1ZHlWZXJzaW9uKTtcbn1cblxuLy8gc3R1ZHkgY29uc3RyYWludHMgbnVtYmVyIG9mIHF1ZXN0aW9ucyBzdGFydHMgd2l0aCAwXG5sZXQgbWFwVmVyc2lvbiA9IDA7IC8vIGRlZmF1bHQgc3R1ZHkgdmVyc2lvblxuaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJykpKSB7XG4gIG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG59IGVsc2Uge1xuICBjb25zdCBtYXBNaW5PbmUgPSAwO1xuICBjb25zdCBtYXBNYXhPbmUgPSAyO1xuICBtYXBWZXJzaW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1hcE1heE9uZSAtIG1hcE1pbk9uZSArIDEpICsgbWFwTWluT25lKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicsIG1hcFZlcnNpb24pO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCd1dWlkJywgdXRpbGl0eS51dWlkKCkudG9TdHJpbmcoKSk7XG59XG5cbmlmICghdXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtc3VibWl0ZWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXN1Ym1pdGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWQtc3VibWl0ZWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkLXN1Ym1pdGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpKSkge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIGZhbHNlKTtcbn1cblxuLy8gS2lja3Mgb2ZmIHRoZSBwcm9jZXNzIG9mIGZpbmRpbmcgPGk+IHRhZ3MgYW5kIHJlcGxhY2luZyB3aXRoIDxzdmc+XG4vLyBhZGRlcyBzdXBwb3J0IGZvciBmb250YXdlc29tZVxubGlicmFyeS5hZGQoZmFzLCBmYXIpO1xuZG9tLndhdGNoKCk7XG5cbmNvbnN0IG1hcEJveENvbmZpZyA9IG5ldyBNYXBCb3hDb25maWcoKTtcbmNvbnN0IGhhbmRsZXJzID0gbmV3IEhhbmRsZXJzKCk7XG5cbi8vIGxvYWQgb25seSB0aGUgYmxvY2sgbmVlZGVkXG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQtaG9sZGVyJywgYmxvY2tTdHVkeUFnZ3JlZW1lbnQpO1xudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1kaXNzYWdncmVlLWhvbGRlcicsIGJsb2NrU3R1ZHlEaXNzYWdncmVlKTtcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktc3VzLWhvbGRlcicsIGJsb2NrU3R1ZHlTVVMpO1xudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1jb21wbGV0ZWQtaG9sZGVyJywgYmxvY2tTdHVkeUNvbXBsZXRlZCk7XG5cbmxldCBtYXAxO1xubGV0IG1hcDJhO1xubGV0IG1hcDJiO1xubGV0IG1hcDNBcnI7XG5sZXQgbWFwZGVmO1xuXG5zd2l0Y2ggKHN0dWR5VmVyc2lvbikge1xuICBjYXNlIDA6IC8vIGFuaW1hdGVcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTEtaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMSk7XG4gICAgbWFwMSA9IG1hcEJveENvbmZpZy5tYWtlQW5pbWF0ZU1hcCgnbWFwLTEnLCAwKTtcbiAgICBicmVhaztcbiAgY2FzZSAxOiAvLyBzaWRlIGJ5IHNpZGVcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTItaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMik7XG4gICAgbWFwMmEgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLTJhJywgMCk7XG4gICAgbWFwMmIgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLTJiJywgMSk7XG4gICAgbWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcDJhLCBtYXAyYik7XG4gICAgYnJlYWs7XG4gIGNhc2UgMjogLy8gc2xpZGVyXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0zLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjMpO1xuICAgIG1hcDNBcnIgPSBtYXBCb3hDb25maWcubWFrZUNvbXBhcmVNYXAoJ21hcC0zYScsICdtYXAtM2InLCAnY29tcGFyZS13cmFwcGVyJyk7XG4gICAgbWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcDNBcnJbMF0sIG1hcDNBcnJbMV0pO1xuICAgIGJyZWFrO1xuICBkZWZhdWx0OiAvLyBhbmltYXRlXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0xLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjEpO1xuICAgIG1hcGRlZiA9IG1hcEJveENvbmZpZy5tYWtlQW5pbWF0ZU1hcCgnbWFwLTEnLCAwKTtcbiAgICBicmVhaztcbn1cblxuLy8gY3JlYXRlIGFsbCB0aGUgbWFwYm94IG1hcCBvYmplY3RzXG4vLyBjb25zdCBtYXBFbmRBcnIgPSBtYXBCb3hDb25maWcubWFrZUNvbXBhcmVNYXAoJ21hcC1jLWVuZGEnLFxuLy8gICdtYXAtYy1lbmRiJywgJ2NvbXBhcmUtZW5kLXdyYXBwZXInLCB0cnVlLCBmYWxzZSk7XG4vL1xuY29uc3QgbWFwRW5kYSA9IG1hcEJveENvbmZpZy5tYWtlTWFwKCdtYXAtZW5kYScsIDAsIGZhbHNlLCBmYWxzZSk7XG5jb25zdCBtYXBFbmRiID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC1lbmRiJywgMSwgdHJ1ZSwgZmFsc2UpO1xuLy8gbWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcEVuZEFyclswXSwgbWFwRW5kQXJyWzFdKTtcblxuLy8gc3luYyBtYXBzXG5tYXBCb3hDb25maWcuc3luY01hcHMobWFwRW5kYSwgbWFwRW5kYik7XG5cbi8vIC8vIFRPRE8gb25seSBkZWFsIHdpdGggbWFwIGZvciBzdHVkeSBxdWVzdGlvblxuLy8gLy8gb25seSBsb2FkIGh0bWwgYmxvY2sgbmVlZGVkIG1hcCBvYmplY3RzIHdpbGwgaGF2ZSBnZW5lcmljIG5hbWVzIGFsc29cbmZ1bmN0aW9uIHJlc2l6ZUFsbE1hcHMoKSB7XG4gIHN3aXRjaCAoc3R1ZHlWZXJzaW9uKSB7XG4gICAgY2FzZSAwOiAvLyBhbmltYXRlXG4gICAgICBtYXAxLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOiAvLyBzaWRlIGJ5IHNpZGVcbiAgICAgIG1hcDJhLnJlc2l6ZSgpO1xuICAgICAgbWFwMmIucmVzaXplKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6IC8vIHNsaWRlclxuICAgICAgbWFwM0FyclswXS5yZXNpemUoKTtcbiAgICAgIG1hcDNBcnJbMV0ucmVzaXplKCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiAvLyBhbmltYXRlXG4gICAgICBtYXBkZWYucmVzaXplKCk7XG4gICAgICBicmVhaztcbiAgfVxuICAvLyBtYXBFbmRBcnJbMF0ucmVzaXplKCk7XG4gIC8vIG1hcEVuZEFyclsxXS5yZXNpemUoKTtcbiAgbWFwRW5kYS5yZXNpemUoKTtcbiAgbWFwRW5kYi5yZXNpemUoKTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdncmVlLWNsaWNrZWQnLCAoKSA9PiB7XG4gIHJlc2l6ZUFsbE1hcHMoKTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzdXMtY2xpY2tlZCcsICgpID0+IHtcbiAgbWFwRW5kYS5zZXRab29tKDUpO1xuICBtYXBFbmRhLnNldFpvb20oNSk7XG4gIHJlc2l6ZUFsbE1hcHMoKTtcbiAgLy8gbWFwRW5kQXJyWzBdLnNldFpvb20oMTEpO1xuICAvLyBtYXBFbmRBcnJbMV0uc2V0Wm9vbSgxMSk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGlzYWdncmVlLWNsaWNrZWQnLCAoKSA9PiB7XG4gIHJlc2l6ZUFsbE1hcHMoKTtcbn0pO1xuXG5jb25zdCB1cmxTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbmNvbnN0IHVybCA9IG5ldyBVUkwodXJsU3RyaW5nKTtcbmNvbnN0IGNhbXBhaWduID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ2NhbXBhaWduJyk7XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5jb25zdCBkYXRlc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQnLCB0cnVlKTtcbnN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCB0aW1lJywgZGF0ZXN0YW1wKTtcbnN0b3JlLnNldFN0YXRlSXRlbSgnY2FtcGFpZ24nLCBjYW1wYWlnbik7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ21vYmlsZScsIHV0aWxpdHkuaXNNb2JpbGVEZXZpY2UoKSk7XG5cbi8vIGFsbCB0aGUgQWdncmVlbWVudCBjaGFuZ2UgZWxlbWVudHMgcG9zc2libGVcbmNvbnN0IGFnZ3JlbWVudENoYW5nZUVsZW1lbnRzID0gWydhZ2dyZWUtYnV0dG9uJ107XG5cbi8vIGVsZW1lbnRzIHRvIGFkZCB0byBVSSBhZnRlciBjbGlja2luZyBvbiBhZ2dyZWUgdG9cbi8vIHBhcnRpY3BhdGUgaW4gc3R1ZHlcbmFnZ3JlbWVudENoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJBZ3JlZUNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBhbGwgdGhlIERpc2FnZ3JlZW1lbnQgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBkaXNhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cyA9IFsnZGlhZ2dyZWUtYnV0dG9uJ107XG5cbi8vIGVsZW1lbnRzIHRvIGFkZCB0byBVSSBhZnRlciBjbGlja2luZyBvbiBhZ2dyZWUgdG9cbi8vIHBhcnRpY3BhdGUgaW4gc3R1ZHlcbmRpc2FnZ3JlbWVudENoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJEaXNhZ3JlZUNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBhbGwgdGhlIHN1Ym1pdCBjaGFuZ2UgZWxlbWVudHMgcG9zc2libGVcbmNvbnN0IHN1Ym1pdENoYW5nZUVsZW1lbnRzID0gWydzdWJtaXQtYnV0dG9uLXRvLXN1cy0wJywgJ3N1Ym1pdC1idXR0b24tdG8tc3VzLTEnLCAnc3VibWl0LWJ1dHRvbi10by1zdXMtMiddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gc3VibWl0IGNoYW5nZVxuLy8gZnJvbSBvbmUgb2YgdGhyZWUgbWFwIHF1ZXN0aW9uc1xuc3VibWl0Q2hhbmdlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgaGFuZGxlcnMuYWRkSGFuZGxlclN1Ym1pdENoYW5nZUNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBhbGwgdGhlIFNVUyBjaGFuZ2UgZWxlbWVudHMgcG9zc2libGVcbmNvbnN0IHN1c0NoYW5nZUVsZW1lbnRzID0gWydzdWJtaXQtYnV0dG9uLXRvLWVuZCddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gc3VibWl0IGNoYW5nZVxuLy8gZnJvbSBvbmUgb2YgdGhyZWUgbWFwIHF1ZXN0aW9uc1xuc3VzQ2hhbmdlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgaGFuZGxlcnMuYWRkSGFuZGxlclN1Ym1pdFNVU0NsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBvbmx5IHVwZGF0ZXMgb25lIG1hcCBob3cgZG8gZ2V0IGV2ZXJ5IG1hcFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ3JpZC11cGRhdGUnLCAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgc3dpdGNoIChzdHVkeVZlcnNpb24pIHtcbiAgICBjYXNlIDA6IC8vIGFuaW1hdGVcbiAgICAgIG1hcDEuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTogLy8gc2lkZSBieSBzaWRlXG4gICAgICBtYXAyYS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgICAgbWFwMmIuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjogLy8gc2xpZGVyXG4gICAgICBtYXAzQXJyWzBdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBtYXAzQXJyWzFdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiAvLyBhbmltYXRlXG4gICAgICBtYXBkZWYuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIC8vIG1hcEVuZEFyclswXS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAvLyBtYXBFbmRBcnJbMV0uZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgbWFwRW5kYS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICBtYXBFbmRiLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG59KTtcblxuY29uc3Qgc3VzQnRuR3JvdXBFbGVtZW50cyA9IFsnYnRuLWdyb3VwLXN1cy0xJyxcbiAgJ2J0bi1ncm91cC1zdXMtMicsXG4gICdidG4tZ3JvdXAtc3VzLTMnLFxuICAnYnRuLWdyb3VwLXN1cy00JyxcbiAgJ2J0bi1ncm91cC1zdXMtNScsXG4gICdidG4tZ3JvdXAtc3VzLTYnLFxuICAnYnRuLWdyb3VwLXN1cy03JyxcbiAgJ2J0bi1ncm91cC1zdXMtOCcsXG4gICdidG4tZ3JvdXAtc3VzLTknLFxuICAnYnRuLWdyb3VwLXN1cy0xMCddO1xuXG5zdXNCdG5Hcm91cEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIC8vIGFkZCBxdWVzdGlvbiBoYW5kbGVyXG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTVVNRdWVzdGlvbkNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBzdXMgcXVlc3Rpb24gc3RhdGUgaXRlbXNcbmNvbnN0IHN1c05hbWUgPSAnc3VzLXF1ZXN0aW9uLSc7XG5jb25zdCBzdXNJdGVyYXRpb25zID0gMTA7XG51dGlsaXR5LnNldFN0YXRlRm9yR3JvdXAoc3VzTmFtZSwgc3VzSXRlcmF0aW9ucyk7XG51dGlsaXR5LnNldERvbVN0YXRlRm9yR3JvdXAoc3VzTmFtZSwgc3VzSXRlcmF0aW9ucyk7XG5cbi8vIGFkZCBncmlkIGJveCBzdGF0ZSBpdGVtc1xuY29uc3QgZ3JpZEl0ZXJhdGlvbnMgPSA0MjtcbmNvbnN0IGdyaWROYW1lID0gJ2dyaWQtYm94LSc7XG51dGlsaXR5LnNldFN0YXRlRm9yR3JvdXAoZ3JpZE5hbWUsIGdyaWRJdGVyYXRpb25zKTtcblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBpc1N0dWR5Y29tcGxldGVkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1jb21wbGV0ZWQnKTtcbmxldCBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBpc1N0dWR5Y29tcGxldGVkID09PSAnYm9vbGVhbicpIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBpc1N0dWR5Y29tcGxldGVkO1xufSBlbHNlIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBmYWxzZTtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgYWdncmVlaW5nIHRvIHN0dWR5XG5jb25zdCBTdHVkeUFncnJlZW1lbnQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xubGV0IHN0dWR5QWdycmVlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBTdHVkeUFncnJlZW1lbnQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUFncnJlZWQgPSBTdHVkeUFncnJlZW1lbnQ7XG59IGVsc2Uge1xuICBzdHVkeUFncnJlZWQgPSBmYWxzZTtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3Igc3VibWl0dGluZyBzdHVkeVxuY29uc3QgZ3JpZFN1Ym1pdGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWQtc3VibWl0ZWQnKTtcbmxldCBncmlkU3VibWl0ZWQgPSBmYWxzZTtcbmlmICh0eXBlb2YgZ3JpZFN1Ym1pdGVkU3RhdGUgPT09ICdib29sZWFuJykge1xuICBncmlkU3VibWl0ZWQgPSBncmlkU3VibWl0ZWRTdGF0ZTtcbn0gZWxzZSB7XG4gIGdyaWRTdWJtaXRlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBzdWJtaXR0aW5nIHN1cyBxdWVzdGlvbnNcbmNvbnN0IHN1c1N1Ym1pdGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtc3VibWl0ZWQnKTtcbmxldCBzdXNTdWJtaXRlZCA9IGZhbHNlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5pZiAodHlwZW9mIGdyaWRTdWJtaXRlZFN0YXRlID09PSAnYm9vbGVhbicpIHtcbiAgc3VzU3VibWl0ZWQgPSBzdXNTdWJtaXRlZFN0YXRlO1xufSBlbHNlIHtcbiAgc3VzU3VibWl0ZWQgPSBmYWxzZTtcbn1cblxuLy8gc3VibWl0IGJ1dHRvbnNcbmNvbnN0IGFnZ3JlbWVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdncmVlLWJ1dHRvbicpO1xuY29uc3QgZGlhZ2dyZWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWdncmVlLWJ1dHRvbicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5jb25zdCBncmlkU3VibWl0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzdWJtaXQtYnV0dG9uLXRvLXN1cy0ke3N0dWR5VmVyc2lvbn1gKTtcbmNvbnN0IGNvbXBsZXRlZFN1Ym1pdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbi10by1lbmQnKTtcblxuaWYgKHN0dWR5QWdycmVlZCkge1xuICBzd2l0Y2ggKFVSTFBhdGgpIHtcbiAgICBjYXNlICcjJzpcbiAgICAgIGlmIChzdHVkeUFncnJlZWQpIHtcbiAgICAgICAgaWYgKGFnZ3JlbWVudEVsZW1lbnQpIHtcbiAgICAgICAgICBhZ2dyZW1lbnRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJyNtYXAnOlxuICAgICAgaWYgKHN0dWR5QWdycmVlZCkge1xuICAgICAgICBpZiAoYWdncmVtZW50RWxlbWVudCkge1xuICAgICAgICAgIGFnZ3JlbWVudEVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnI3N1cy1xdWVzdGlvbnMnOlxuICAgICAgaWYgKGdyaWRTdWJtaXRlZCkge1xuICAgICAgICBpZiAoZ3JpZFN1Ym1pdEVsZW1lbnQpIHtcbiAgICAgICAgICBncmlkU3VibWl0RWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHN0dWR5QWdycmVlZCkge1xuICAgICAgICBpZiAoYWdncmVtZW50RWxlbWVudCkge1xuICAgICAgICAgIGFnZ3JlbWVudEVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufSk7XG5cbi8vIGhpZGUgc3R1ZHlcbmlmIChzdHVkeUNvbXBsZXRlZCkge1xuICBpZiAoY29tcGxldGVkU3VibWl0RWxlbWVudCkge1xuICAgIGNvbXBsZXRlZFN1Ym1pdEVsZW1lbnQuY2xpY2soKTtcbiAgfVxufVxuIiwiaW1wb3J0IG1hcGJveGdsIGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgTWFwYm94Q29tcGFyZSBmcm9tICdtYXBib3gtZ2wtY29tcGFyZSc7XG5pbXBvcnQgeyBwb2x5Z29uLCBmZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuLy8gaW1wb3J0IGNlbnRlciBmcm9tICdAdHVyZi9jZW50ZXInO1xuaW1wb3J0IHsgVXRpbGl0eSB9IGZyb20gJy4vdXRpbGl0eSc7XG4vLyBpbXBvcnQgc3F1YXJlR3JpZCBmcm9tICdAdHVyZi9zcXVhcmUtZ3JpZCc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IFNxdWFyZUdyaWRHZW9KU09OT25lIGZyb20gJy4vc3F1YXJlLWdyaWQtZ2VvanNvbi5qc29uJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTlNlY29uZCBmcm9tICcuL3NxdWFyZS1ncmlkLWdlb2pzb24tc2Vjb25kLmpzb24nO1xuaW1wb3J0IFNxdWFyZUdyaWRHZW9KU09OVGhpcmQgZnJvbSAnLi9zcXVhcmUtZ3JpZC1nZW9qc29uLXRoaXJkLmpzb24nO1xuXG5jb25zdCBzeW5jTW92ZSA9IHJlcXVpcmUoJ0BtYXBib3gvbWFwYm94LWdsLXN5bmMtbW92ZScpO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuZXhwb3J0IGNsYXNzIE1hcEJveENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBzd2l0Y2ggKHRoaXMubWFwVmVyc2lvbikge1xuICAgICAgY2FzZSAwOiAvLyBhdmxcbiAgICAgICAgaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJykpKSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gU3F1YXJlR3JpZEdlb0pTT05PbmU7XG4gICAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIFNxdWFyZUdyaWRHZW9KU09OT25lKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTogLy8gaHN0blxuICAgICAgICBpZiAodXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKSkpIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBTcXVhcmVHcmlkR2VvSlNPTlNlY29uZDtcbiAgICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOiAvLyBsdlxuICAgICAgICBpZiAodXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKSkpIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkO1xuICAgICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nLCBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IC8vIGF2bFxuICAgICAgICBpZiAodXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKSkpIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBTcXVhcmVHcmlkR2VvSlNPTk9uZTtcbiAgICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05PbmUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuZGVmYXVsdE1hcFN0eWxlID0gJ21hcGJveDovL3N0eWxlcy9tYXBib3gvc3RyZWV0cy12MTEnO1xuICAgIHRoaXMuZGVmYXVsdE1hcENlbnRlciA9IFstODIuNTcwLCAzNS41NjBdOyAvLyBzdGFydGluZyBwb3NpdGlvbiBbbG5nLCBsYXRdXG4gICAgdGhpcy5kZWZhdWx0TWF4Qm91bmRzID0gWy04Mi43MDIsIDM1LjQ2MywgLTgyLjQ0MiwgMzUuNjU3XTtcbiAgICB0aGlzLmRlZmF1bHRNYXBab29tID0gNTsgLy8gc3RhcnRpbmcgem9vbVxuICAgIHRoaXMuZGVmYXVsdE1hcENvbnRhaW5lciA9ICdtYXAnO1xuICAgIHRoaXMuZGFya01hcFN0eWxlID0gJ21hcGJveDovL3N0eWxlcy9tYXBib3gvZGFyay12MTAnO1xuICAgIHRoaXMubGlnaHRNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L2xpZ2h0LXYxMCc7XG4gICAgdGhpcy5tYXBib3hnbCA9IG1hcGJveGdsO1xuICAgIHRoaXMuTWFwYm94Q29tcGFyZSA9IE1hcGJveENvbXBhcmU7XG4gICAgdGhpcy5tYXBib3hnbC5hY2Nlc3NUb2tlbiA9ICdway5leUoxSWpvaVpHRjJaV2x6YlNJc0ltRWlPaUpDZGpVeFQwRnpJbjAuVjlvSWtfd1VjNHVadTdVQmJsUjhtdyc7XG4gICAgdGhpcy5xdWlldCA9IHRydWU7XG4gICAgdGhpcy5tYXAxID0gbnVsbDtcbiAgICB0aGlzLm1hcDIgPSBudWxsO1xuICAgIHRoaXMuZGVmYXVsdEdyZXlCb3ggPSAnIzU1NTU1NSc7XG4gICAgdGhpcy5zZWxlY3RlZEJveCA9ICcjRkJCMDNCJztcbiAgICB0aGlzLm1hcENoYW5nZUxheWVycyA9IHtcbiAgICAgIGxheWVyczogW1xuICAgICAgICBbIC8vIGF2bCAwXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2lrbm93XzEve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBbLTgyLjY0NywgMzUuNTA3LCAtODIuNDk4LCAzNS42MTJdLFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBbLTgyLjcwMiwgMzUuNDQyLCAtODIuNDYyLCAzNS42NTddXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvaWtub3dfMi97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IFstODIuNjQ3LCAzNS41MDcsIC04Mi40OTgsIDM1LjYxMl0sXG4gICAgICAgICAgICBtYXhib3VuZHM6IFstODIuNzAyLCAzNS40NDIsIC04Mi40NjIsIDM1LjY1N11cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFsgLy8gaHN0biAxXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2xhbmRjb3Zlcl8xL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICAgICAgbWF4em9vbTogMTQsXG4gICAgICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgICAgIGJvdW5kczogWy05NS45NDAsIDI5LjY3MSwgLTk1Ljc5MSwgMjkuNzc1XSxcbiAgICAgICAgICAgIG1heGJvdW5kczogWy05NS45OTIsIDI5LjYyNSwgLTk1LjczOSwgMjkuODIwXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2xhbmRjb3Zlcl8yL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICAgICAgbWF4em9vbTogMTQsXG4gICAgICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgICAgIGJvdW5kczogWy05NS45NDAsIDI5LjY3MSwgLTk1Ljc5MSwgMjkuNzc1XSxcbiAgICAgICAgICAgIG1heGJvdW5kczogWy05NS45OTIsIDI5LjYyNSwgLTk1LjczOSwgMjkuODIwXVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgWyAvLyBsdiAyXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL25haXBfMS97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IFstMTE0Ljg5OSwgMzYuMDc5NSwgLTExNC43NTAsIDM2LjE4M10sXG4gICAgICAgICAgICBtYXhib3VuZHM6IFstMTE0Ljk1NSwgMzYuMDM0LCAtMTE0LjY5NCwgMzYuMjI4XVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL25haXBfMi97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IFstMTE0Ljg5OSwgMzYuMDc5NSwgLTExNC43NTAsIDM2LjE4M10sXG4gICAgICAgICAgICBtYXhib3VuZHM6IFstMTE0Ljk1NSwgMzYuMDM0LCAtMTE0LjY5NCwgMzYuMjI4XVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgXVxuICAgIH07XG5cbiAgICB0aGlzLm1hcENoYW5nZUxheWVyc09uZSA9IFtcbiAgICAgICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvbmxjZC0yMDE2LTMwL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL25sY2QtMjAwMS0zMC97en0ve3h9L3t5fS5wbmcnXG4gICAgXTtcbiAgfVxuXG4gIC8vIFNldHMgYW4gaW5kaXZpZHVhbCBtYXBib3ggbWFwIHRlc3RcbiAgLy9cbiAgLy8gQHBhcmFtIG1hcENvbnRhaW5lciAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIG5ldyBtYXBib3ggbWFwIG9iamVjdFxuICBtYWtlTWFwKG1hcENvbnRhaW5lciA9IHRoaXMuZGVmYXVsdE1hcENvbnRhaW5lciwgbWFwSW5kZXggPSAwLCBlbmQgPSBmYWxzZSwgZW5hYmxlY2xpY2sgPSB0cnVlKSB7XG4gICAgY29uc3QgbWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBtYXBTZXR1cCA9IHRoaXMubWFwQ2hhbmdlTGF5ZXJzLmxheWVyc1ttYXBWZXJzaW9uXTtcbiAgICBjb25zdCBtYXAgPSBuZXcgdGhpcy5tYXBib3hnbC5NYXAoe1xuICAgICAgY29udGFpbmVyOiBtYXBDb250YWluZXIsXG4gICAgICBzdHlsZTogdGhpcy5kYXJrTWFwU3R5bGUsXG4gICAgICB6b29tOiB0aGlzLmRlZmF1bHRNYXBab29tLFxuICAgICAgc2hvd1pvb206IHRydWUsXG4gICAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgICBrZXliaW5kaW5nczogdHJ1ZSxcbiAgICAgIG1heEJvdW5kczogbWFwU2V0dXBbbWFwSW5kZXhdLm1heGJvdW5kc1xuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMobWFwKTtcbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgbWFwSW5kZXgpKTtcbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZENvcnJlY3RMYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkTGF5ZXIoKSk7XG4gICAgICB9XG4gICAgICBpZiAoZW5hYmxlY2xpY2spIHtcbiAgICAgICAgdGhpcy5hZGRHcmlkQ2xpY2sobWFwKTtcbiAgICAgIH1cbiAgICAgIG1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG1hcC5yZXNpemUoKTsgfSwgMTApO1xuICAgIH0pO1xuXG4gICAgd2luZG93Lm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBtYXAuc2V0Wm9vbSh0aGlzLmRlZmF1bHRNYXBab29tKTtcbiAgICAgIG1hcC5yZXNpemUoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBtYXAucmVzaXplKCk7IH0sIDEwKTtcbiAgICB9O1xuICAgIG1hcC5hZGRDb250cm9sKG5ldyBtYXBib3hnbC5OYXZpZ2F0aW9uQ29udHJvbCh7IHNob3dDb21wYXNzOiBmYWxzZSB9KSwgJ3RvcC1sZWZ0Jyk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIC8vIFNldHMgdXAgYW5pbWF0ZWQgbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBtYXBDb250YWluZXIgLSBzdHJpbmdcbiAgLy8gQHJldHVybiBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZUFuaW1hdGVNYXAobWFwQ29udGFpbmVyID0gdGhpcy5kZWZhdWx0TWFwQ29udGFpbmVyKSB7XG4gICAgY29uc3QgbWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBtYXBTZXR1cCA9IHRoaXMubWFwQ2hhbmdlTGF5ZXJzLmxheWVyc1ttYXBWZXJzaW9uXTtcblxuICAgIGNvbnN0IG1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcENvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgICBtYXhCb3VuZHM6IG1hcFNldHVwWzBdLm1heGJvdW5kc1xuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMobWFwKTtcbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgMCkpO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAxKSk7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZE91dExpbmVMYXllcigpKTtcbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkTGF5ZXIoKSk7XG4gICAgICB0aGlzLmFkZEdyaWRDbGljayhtYXApO1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuXG4gICAgICBjb25zdCBpbmRleENvdW50ID0gMjtcbiAgICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaW5kZXggPSAoaW5kZXggKyAxKSAlIGluZGV4Q291bnQ7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMSkge1xuICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0xJywgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0wJywgJ3Zpc2liaWxpdHknLCAnbm9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0wJywgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0xJywgJ3Zpc2liaWxpdHknLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgbWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBtYXAucmVzaXplKCk7XG4gICAgfTtcbiAgICAvLyBBZGQgem9vbSBhbmQgcm90YXRpb24gY29udHJvbHMgdG8gdGhlIG1hcC5cbiAgICBtYXAuYWRkQ29udHJvbChuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woeyBzaG93Q29tcGFzczogZmFsc2UgfSksICd0b3AtbGVmdCcpO1xuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICAvLyBtYWtlQ29tcGFyZU1hcCBTZXRzIGFuIGNvbXBhcmluZyBtYXAgXCJzd2lwaW5nXCIgbWFwYm94IG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbWFwQ29udGFpbmVyIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYXJyYXkgb2YgbWFwcyBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZUNvbXBhcmVNYXAobWFwQmVmb3JlQ29udGFpbmVyLCBtYXBBZnRlckNvbnRhaW5lciwgbWFwQ29tcGFyZVdyYXBwZXJJRCxcbiAgICBlbmQgPSBmYWxzZSwgZW5hYmxlY2xpY2sgPSB0cnVlKSB7XG4gICAgY29uc3QgbWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBtYXBTZXR1cCA9IHRoaXMubWFwQ2hhbmdlTGF5ZXJzLmxheWVyc1ttYXBWZXJzaW9uXTtcblxuICAgIGNvbnN0IGJlZm9yZU1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcEJlZm9yZUNvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgICBtYXhCb3VuZHM6IG1hcFNldHVwWzBdLm1heGJvdW5kc1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWZ0ZXJNYXAgPSBuZXcgdGhpcy5tYXBib3hnbC5NYXAoe1xuICAgICAgY29udGFpbmVyOiBtYXBBZnRlckNvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgICBtYXhCb3VuZHM6IG1hcFNldHVwWzFdLm1heGJvdW5kc1xuICAgIH0pO1xuICAgIGNvbnN0IGNvbXBhcmUgPSBuZXcgdGhpcy5NYXBib3hDb21wYXJlKGJlZm9yZU1hcCwgYWZ0ZXJNYXAsIGAjJHttYXBDb21wYXJlV3JhcHBlcklEfWApO1xuXG4gICAgYmVmb3JlTWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMoYmVmb3JlTWFwKTtcbiAgICAgIGJlZm9yZU1hcC5hZGRMYXllcih0aGlzLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgMSkpOyAvLyBuZWVkcyB1cGRhdGVcbiAgICAgIGJlZm9yZU1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgYmVmb3JlTWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRMYXllcigpKTtcbiAgICAgIGlmIChlbmFibGVjbGljaykge1xuICAgICAgICB0aGlzLmFkZEdyaWRDbGljayhiZWZvcmVNYXApO1xuICAgICAgfVxuICAgICAgYmVmb3JlTWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBiZWZvcmVNYXAucmVzaXplKCk7XG4gICAgICBjb21wYXJlLnNldFNsaWRlcigxNTApO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJNYXAub24oJ2xvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5maXRNeUJvdW5kcyhhZnRlck1hcCk7XG4gICAgICBhZnRlck1hcC5hZGRMYXllcih0aGlzLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgMCkpOyAvLyBuZWVkcyB1cGRhdGVcbiAgICAgIGFmdGVyTWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIGFmdGVyTWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRDb3JyZWN0TGF5ZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZnRlck1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkTGF5ZXIoKSk7XG4gICAgICB9XG4gICAgICBpZiAoZW5hYmxlY2xpY2spIHtcbiAgICAgICAgdGhpcy5hZGRHcmlkQ2xpY2soYWZ0ZXJNYXApO1xuICAgICAgfVxuICAgICAgYWZ0ZXJNYXAuc2V0Wm9vbSh0aGlzLmRlZmF1bHRNYXBab29tKTtcbiAgICAgIGFmdGVyTWFwLnJlc2l6ZSgpO1xuICAgICAgY29tcGFyZS5zZXRTbGlkZXIoMTUwKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgYWZ0ZXJNYXAucmVzaXplKCk7XG4gICAgICBiZWZvcmVNYXAucmVzaXplKCk7XG4gICAgICBjb21wYXJlLnNldFNsaWRlcigxNTApO1xuICAgIH07XG4gICAgLy8gQWRkIHpvb20gYW5kIHJvdGF0aW9uIGNvbnRyb2xzIHRvIHRoZSBtYXAuXG4gICAgYmVmb3JlTWFwLmFkZENvbnRyb2wobmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKHsgc2hvd0NvbXBhc3M6IGZhbHNlIH0pLCAndG9wLWxlZnQnKTtcbiAgICBhZnRlck1hcC5hZGRDb250cm9sKG5ldyBtYXBib3hnbC5OYXZpZ2F0aW9uQ29udHJvbCh7IHNob3dDb21wYXNzOiBmYWxzZSB9KSwgJ3RvcC1sZWZ0Jyk7XG4gICAgcmV0dXJuIFtiZWZvcmVNYXAsIGFmdGVyTWFwXTtcbiAgfVxuXG4gIC8vIHN5bmNzIHR3byBtYXBzIHpvb20gYW5kIHBhblxuICAvLyBtb2RpZmVkIGZyb20gaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LmpzL2V4YW1wbGUvdjEuMC4wL3N5bmMtbGF5ZXItbW92ZW1lbnQvXG4gIC8vXG4gIC8vIEBwYXJhbSBtYXAxID0gZmlyc3QgbWFwYm94IG1hcCBvYmplY3RcbiAgLy8gQHBhcmFtIG1hcDIgID0gc2Vjb25kIG1hcGJveCBtYXAgb2JqZWN0XG4gIC8vIEByZXR1cm4gbnVsbFxuICBzeW5jTWFwcyhtYXAxLCBtYXAyKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBzeW5jTW92ZShtYXAxLCBtYXAyKTtcbiAgfVxuXG4gIG1ha2VUTVNMYXllcihtYXBDaGFuZ2UsIG1hcEluZGV4KSB7XG4gICAgLy8gc3R1ZHkgY29uc3RyYWludHMgbnVtYmVyIG9mIHF1ZXN0aW9ucyBzdGFydHMgd2l0aCAwXG4gICAgY29uc3QgbWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBtYXBTZXR1cCA9IHRoaXMubWFwQ2hhbmdlTGF5ZXJzLmxheWVyc1ttYXBWZXJzaW9uXTtcblxuICAgIHJldHVybiB7XG4gICAgICBpZDogYG1hcC1jaGFuZ2UtJHttYXBJbmRleH1gLFxuICAgICAgdHlwZTogJ3Jhc3RlcicsXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZTogJ3Jhc3RlcicsXG4gICAgICAgIHRpbGVzOiBbbWFwU2V0dXBbbWFwSW5kZXhdLnVybF0sXG4gICAgICAgIG1pbnpvb206IG1hcFNldHVwW21hcEluZGV4XS5taW56b29tLFxuICAgICAgICBtYXh6b29tOiBtYXBTZXR1cFttYXBJbmRleF0ubWF4em9vbSxcbiAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgYm91bmRzOiBtYXBTZXR1cFttYXBJbmRleF0uYm91bmRzLFxuICAgICAgICBtYXhCb3VuZHM6IG1hcFNldHVwW21hcEluZGV4XS5tYXhib3VuZHNcbiAgICAgIH0sXG4gICAgICBwYWludDoge1xuICAgICAgICAncmFzdGVyLWZhZGUtZHVyYXRpb24nOiAwXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIG1ha2VzIGNoYW5nZSBncmlkIGxheWVyIG9uIG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgbWFrZUdyaWRMYXllcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdjaGFuZ2UtZ3JpZCcsXG4gICAgICB0eXBlOiAnZmlsbCcsXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICBkYXRhOiB0aGlzLnNxdWFyZUdyaWRHZW9KU09OXG4gICAgICB9LFxuICAgICAgbGF5b3V0OiB7fSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdmaWxsLWNvbG9yJzogW1xuICAgICAgICAgICdtYXRjaCcsXG4gICAgICAgICAgWydnZXQnLCAnc2VsZWN0ZWQnXSxcbiAgICAgICAgICAxLCB0aGlzLnNlbGVjdGVkQm94LFxuICAgICAgICAgIC8qIG90aGVyICovIHRoaXMuZGVmYXVsdEdyZXlCb3hcbiAgICAgICAgXSxcbiAgICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuNVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBtYWtlcyBjaGFuZ2UgZ3JpZCBsYXllciB3aGF0IGNvcnJlY3Qgb24gbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBtYWtlR3JpZENvcnJlY3RMYXllcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdjaGFuZ2UtZ3JpZCcsXG4gICAgICB0eXBlOiAnZmlsbCcsXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICBkYXRhOiB0aGlzLnNxdWFyZUdyaWRHZW9KU09OXG4gICAgICB9LFxuICAgICAgbGF5b3V0OiB7fSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdmaWxsLWNvbG9yJzogW1xuICAgICAgICAgICdtYXRjaCcsXG4gICAgICAgICAgWydnZXQnLCAndiddLFxuICAgICAgICAgIDEsIHRoaXMuc2VsZWN0ZWRCb3gsXG4gICAgICAgICAgLyogb3RoZXIgKi8gdGhpcy5kZWZhdWx0R3JleUJveFxuICAgICAgICBdLFxuICAgICAgICAnZmlsbC1vcGFjaXR5JzogMC41XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIG1ha2VzIGNoYW5nZSBncmlkIGxheWVyIG9uIG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgbWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnY2hhbmdlLWdyaWQtb3V0bGluZScsXG4gICAgICB0eXBlOiAnbGluZScsXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICBkYXRhOiB0aGlzLnNxdWFyZUdyaWRHZW9KU09OXG4gICAgICB9LFxuICAgICAgbGF5b3V0OiB7XG4gICAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnLFxuICAgICAgICAnbGluZS1jYXAnOiAncm91bmQnXG4gICAgICB9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2xpbmUtY29sb3InOiB0aGlzLmRlZmF1bHRHcmV5Qm94LFxuICAgICAgICAnbGluZS13aWR0aCc6IDRcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gYWRkcyBjbGljayBvZiBncmlkIGJveCB0byBjYXB0dXJlIHdoaWNoIGdyaWQgdGhlIHVzZXJcbiAgLy8gdGhpbmtzIGNoYW5nZSBoYXBwZW5kIGluIG9yZ2luYWwgZnJvbTpcbiAgLy8gaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2V4YW1wbGUvcG9seWdvbi1wb3B1cC1vbi1jbGljay9cbiAgLy9cbiAgLy8gQHBhcmFtIG1hcCA9IG1hcGJveCBtYXAgb2JqZWN0IHRvIHVwZGF0ZSB6b29tIGFuZCBjZW50ZXIgdG9cbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEdyaWRDbGljayhtYXApIHtcbiAgICAvLyBjb25zdCBtYWtlR3JpZExheWVyID0gdGhpcy5tYWtlR3JpZExheWVyKCk7XG4gICAgLy8gV2hlbiBhIGNsaWNrIGV2ZW50IG9jY3VycyBvbiBhIGZlYXR1cmUgaW4gdGhlIHN0YXRlcyBsYXllciwgb3BlbiBhIHBvcHVwIGF0IHRoZVxuICAgIC8vIGxvY2F0aW9uIG9mIHRoZSBjbGljaywgd2l0aCBkZXNjcmlwdGlvbiBIVE1MIGZyb20gaXRzIHByb3BlcnRpZXMuXG4gICAgbWFwLm9uKCdtb3VzZWVudGVyJywgJ2NoYW5nZS1ncmlkJywgKGUpID0+IHtcbiAgICAgIG1hcC5nZXRDYW52YXMoKS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9KTtcblxuICAgIG1hcC5vbignbW91c2VsZWF2ZScsICdjaGFuZ2UtZ3JpZCcsIChlKSA9PiB7XG4gICAgICBtYXAuZ2V0Q2FudmFzKCkuc3R5bGUuY3Vyc29yID0gJyc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9KTtcblxuICAgIG1hcC5vbignY2xpY2snLCAnY2hhbmdlLWdyaWQnLCAoZSkgPT4ge1xuICAgICAgY29uc3QgZmVhdHVyZSA9IGUuZmVhdHVyZXNbMF07XG4gICAgICBjb25zdCBpZCA9IE51bWJlcihmZWF0dXJlLnByb3BlcnRpZXMuaWQpO1xuXG4gICAgICAvLyB1ZHBhdGVzIHNlbGVjdGVkIGdlb2pzb24gcHJvcGVyaXRlcy5zZWxlY3RlZCAwIG9yIDEgZGVwZW5lZGluZ1xuICAgICAgLy8gaWYgdXNlciBzZWxlY3RlZCBwb2x5Z29uXG4gICAgICBjb25zdCBuZXdGZWF0dXJlID0gTWFwQm94Q29uZmlnLnRvZ2dsZVNlbGVjdGVkRmVhdHVyZShmZWF0dXJlKTtcblxuICAgICAgLy8gY3JlYXRlIGEgbmV3IGZlYXR1cmUgY29sbGVjdGlvbiBmcm9tIHNlbGVjdGVkIGZlYXR1cmVcbiAgICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZXMgPSBNYXBCb3hDb25maWcubWFrZVNlbGVjdGVkRmVhdHVyZUdlb0pTT04obmV3RmVhdHVyZSk7XG5cbiAgICAgIC8vIHVwZGF0ZXMgc3F1YXJlR3JpZEdlb0pTT04gd2l0aCBuZXcgZ2VvanNvblxuICAgICAgY29uc3QgbmV3U3F1YXJlR3JpZEdlb0pTT04gPSBNYXBCb3hDb25maWcudXBkYXRlU3F1YXJlR3JpZFdpdGhTZWxlY3RlZEZlYXR1cmVzKHNlbGVjdGVkRmVhdHVyZXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgIC8vIHN0b3JlIG5ldyBzcXVhcmUgZ3JpZCB3aXRoIHNsZWN0ZWQgYm94ZXNcbiAgICAgIHRoaXMuc3RvcmVTcXVhcmVHcmlkKG5ld1NxdWFyZUdyaWRHZW9KU09OKTtcblxuICAgICAgLy8gdXBkYXRlIHN0YXRlIHdpdGggc2VsZWN0ZWQgZmVhdHVyZVxuICAgICAgTWFwQm94Q29uZmlnLnN0b3JlU2VsZWN0ZWRGZWF0dXJlKGlkKTtcblxuICAgICAgLy8gdGlnZ2VyIGV2ZW50IHNvIGFsbCBkYXRhIHNvdXJjZXMgdXBkYXRlXG4gICAgICB1dGlsaXR5LnRyaWdnZXJFdmVudCgnZ3JpZC11cGRhdGUnLCBpZCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyB0b2dnbGVzIHZhbHVlIHRoZSBwcm9wZXJ0aWVzIChhdHRyaWJ1dGUpIHNlbGVjdGVkXG4gIC8vICAgIHdoZW4gYSB1c2VyIGNsaWNrcyB0aGUgZ3JpZCBib3ggPiAwIHdoZW4gc2VsZWN0ZWRcbiAgLy8gICAgMCB3aGVuIHNlbGVjdGVcbiAgLy9cbiAgLy8gQHBhcmFtIGZlYXR1cmUgPSBnZW9qc29uIGZlYXR1cmUgKHBvcGVydGllcyBhbmQgZ2VvbSlcbiAgLy8gQHJldHVybiBmZWF0dXJlID0gZ2VvanNvbiBmZWF0dXJlXG4gIHN0YXRpYyB0b2dnbGVTZWxlY3RlZEZlYXR1cmUoZmVhdHVyZSkge1xuICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMuc2VsZWN0ZWQgPT09IDApIHtcbiAgICAgIGZlYXR1cmUucHJvcGVydGllcy5zZWxlY3RlZCA9IDE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLnNlbGVjdGVkID0gMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cbiAgICByZXR1cm4gZmVhdHVyZTtcbiAgfVxuXG4gIC8vIHNldHMgdGhlIHNlbGVjdGVkIGZlYXR1cmUgaW4gc3RhdGUgPiAwIHdoZW4gc2VsZWN0ZWRcbiAgLy8gICAgMCB3aGVuIHNlbGVjdGVcbiAgLy9cbiAgLy8gQHBhcmFtIGlkID0gbnVtYmVyIHdoaWNoIHJlcHJlc2VudHMgdGhlIGZlYXR1cmUgaWRcbiAgLy8gQHJldHVybiBudWxsXG4gIHN0YXRpYyBzdG9yZVNlbGVjdGVkRmVhdHVyZShpZCkge1xuICAgIGNvbnN0IGdyaWROYW1lID0gJ2dyaWQtYm94LSc7XG4gICAgLy8gemVybyBvdXQgXCJ0b2dnbGUgb2ZmXCIgaWYgZ3JpZCBpZCBleGlzdHMgc3RhdGUgaXRlbVxuICAgIGlmIChzdG9yZS5nZXRTdGF0ZUl0ZW0oYCR7Z3JpZE5hbWV9JHtpZH1gKSA+IDApIHtcbiAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShgJHtncmlkTmFtZX0ke2lkfWAsIDApO1xuICAgIC8vIGFkZCBcInRvZ2dsZSBvblwiIGlmICBzdGF0ZSBpdGVtID4gMCBvciBub3Qgc2VsZWN0ZWRcbiAgICB9IGVsc2Uge1xuICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKGAke2dyaWROYW1lfSR7aWR9YCwgTnVtYmVyKGlkKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gbWFrZXMgdGhlIHNlbGVjdGVkIGZlYXR1cmUgYSBuZXcgZmVhdHVyZSBjb2xsZWN0aW9uXG4gIC8vXG4gIC8vIEBwYXJhbSBmZWF0dXJlID0gZ2VvanNvbiBmZWF0dXJlIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24gKGZyb20gdHVyZi5qcylcbiAgc3RhdGljIG1ha2VTZWxlY3RlZEZlYXR1cmVHZW9KU09OKGZlYXR1cmUpIHtcbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oW3BvbHlnb24oZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcywgZmVhdHVyZS5wcm9wZXJ0aWVzKV0pO1xuICB9XG5cbiAgLy8gdXBkYXRlcyB0aGUgU3F1YXJlR3JpZEdlb0pTT04gYWZ0ZXIgbWVyZ2luZyBhbmQgcmVjb25jaWxpbmdcbiAgLy8gICAgd2l0aCB0aGUgc2VsZWN0ZWQgZmVhdXR1cmVzXG4gIC8vXG4gIC8vIEBwYXJhbSBzZWxlY3RlZEZlYXR1cmVzID0gZ2VvanNvbiBmZWF0dXJlY29sbGVjdG9uIHJlcHJlc2VudGluZyB0aGUgc2VsZWN0ZWRcbiAgLy8gICAgICAgIGZlYXR1cmVzIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24gKGZyb20gdHVyZi5qcylcbiAgc3RhdGljIHVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyhzZWxlY3RlZEZlYXR1cmVzKSB7XG4gICAgY29uc3QgY3VycmVudFNxdWFyZUdyaWRHZW9KU09OID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgIGNvbnN0IGN1cnJlbnRGZWF0dXJlSWRzID0gc2VsZWN0ZWRGZWF0dXJlcy5mZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiBmZWF0dXJlLnByb3BlcnRpZXMuaWQpO1xuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihzZWxlY3RlZEZlYXR1cmVzLmZlYXR1cmVzLmNvbmNhdChjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04uZmVhdHVyZXMuZmlsdGVyKGZlYXR1cmUgPT4gIWN1cnJlbnRGZWF0dXJlSWRzLmluY2x1ZGVzKGZlYXR1cmUucHJvcGVydGllcy5pZCkpKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIC8vIHVwZGF0ZXMgc3RhdGUgd2l0aCB0aGUgbmV3IHZlcnNpb24gb2YgU3F1YXJlR3JpZEdlb0pTT05cbiAgLy8gICAgY29udGFpbnMgc2VsZWN0ZWQgZmVhdHVyZXMgYWxzbyAoaWYgYW55IHNlbGVjdGVkKVxuICAvL1xuICAvLyBAcGFyYW0gTmV3U3F1YXJlR3JpZEdlb0pTT04gPSBnZW9qc29uIGZlYXR1cmVjb2xsZWN0b24gcmVwcmVzZW50aW5nXG4gIC8vICAgICAgICAgICAgICAgIHRoZSBuZXcgZmVhdHVyZXMgKHBvcGVydGllcyBhbmQgZ2VvbSlcbiAgLy8gQHJldHVybiBudWxsXG4gIHN0b3JlU3F1YXJlR3JpZChOZXdTcXVhcmVHcmlkR2VvSlNPTikge1xuICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBOZXdTcXVhcmVHcmlkR2VvSlNPTjtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgTmV3U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZml0TXlCb3VuZHMobWFwKSB7XG4gICAgY29uc3QgbWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBtYXBTZXR1cCA9IHRoaXMubWFwQ2hhbmdlTGF5ZXJzLmxheWVyc1ttYXBWZXJzaW9uXTtcbiAgICBjb25zdCBib3VuZHMgPSBtYXBTZXR1cFswXS5tYXhib3VuZHM7XG4gICAgbWFwLmZpdEJvdW5kcyhib3VuZHMsIHsgcGFkZGluZzogMTAwIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCBkYXRhcGkgPSAnaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4UlA5UFZDU0o3WW80X1hZdHFrenVTcEhmMGNPQW4xbm9GS2pkcW5mZkJmUzJaRXp3L2V4ZWMnO1xuXG5leHBvcnQgY2xhc3MgUmVjb3JkU3R1ZHlEYXRhIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mb28gPSB7fTtcbiAgICB0aGlzLmRhdGFwaSA9IGRhdGFwaTtcbiAgfVxuXG4gIHNldEV2ZW50KGFjdGlvbiA9ICcnLCBjYXRlZ29yeSA9ICcnLCBsYWJlbCA9ICcnLCB2YWx1ZSA9IDApIHtcbiAgICAvLyBnZXQgdmFycmlhYmxlcyBmb3JcbiAgICB0aGlzLnV1aWQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKS50b1N0cmluZygpO1xuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICB0aGlzLmRhdGEgPSBsYWJlbDtcbiAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG5cbiAgICAvLyBzdHVkeSB0byBKU09OXG4gICAgY29uc3QganNvbmRhdGEgPSB7XG4gICAgICB1dWlkOiB0aGlzLnV1aWQsXG4gICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeSxcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgIGRhdGU6IHRoaXMuZGF0ZVxuICAgIH07XG5cbiAgICBjb25zdCBkYXRhQVBJVVJMID0gbmV3IFVSTCh0aGlzLmRhdGFwaSk7XG4gICAgZGF0YUFQSVVSTC5zZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGpzb25kYXRhKTtcbiAgICBmZXRjaChkYXRhQVBJVVJMKTtcbiAgfVxuXG4gIHNldEV2ZW50QWxsKGpzb25kYXRhID0ge30pIHtcbiAgICBjb25zdCBkYXRhQVBJVVJMID0gbmV3IFVSTCh0aGlzLmRhdGFwaSk7XG4gICAgZGF0YUFQSVVSTC5zZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGpzb25kYXRhKTtcbiAgICBmZXRjaChkYXRhQVBJVVJMKTtcbiAgfVxufVxuIiwiLy8gaW1wb3J0IHsgU3RvcmFnZUFQSSB9IGZyb20gJy4vbG9jYWxTdG9yYWdlQVBJJztcblxuLyoqXG4qIFRoaXMgY29tcG9uZW50IGlzIGludGVuZGVkIHRvIGhhbmRsZSB0aGUgc3RvcmFnZSBhbmQgcmV0cmlldmFsIG9mIHRoZSBzdGF0ZSBvZlxuKiBBcyBvZiB0aGlzIHdyaXRpbmcgaXQgaXMgdXNpbmcgbG9jYWxTdG9yYWdlIHRvIGRvIHRoaXMuXG4qIFVzZXMgc2ltcGxlIGNsYXNzIGluc3RhbmNlIG1ldGhvZHMgd2l0aCB0aGUgc2hvcnQtaGFuZCBtZXRob2QgZGVjbGFyYXRpb25cbiogcGF0dGVybi5cbipcbiogVG8gbm90ZTogVGhlcmUgaXMgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIFN0b3JlIGFuZCB0aGUgU3RhdGUuIEFzIG9mIDBhMzEwNmVcbiogdGhlIFN0b3JlIGlzIGEgU3RyaW5nIHNhdmVkIHRvIHRoZSBicm93c2VycyBsb2NhbFN0b3JhZ2UgYW5kIGlzIGEgc2VyaWFsaXplZFxuKiB2ZXJzaW9uIG9mIHRoZSBTdGF0ZS4gVGhlIFN0YXRlIGlzIGFuIE9iamVjdCB3aGljaCBpcyBpbnRlcmFjdGVkIHdpdGggYnlcbiogcGFyc2luZyB0aGUgU3RhdGUgc3RyaW5nIGZyb20gdGhlIFN0b3JlLCBtb2RpZnlpbmcgdGhlIHJlc3VsdHMgb2YgdGhlIHBhcnNlLFxuKiBhbmQgcmUtc2VyaWFsaXppbmcgaXQgYmFjayB0byB0aGUgU3RvcmUuXG4qL1xuY29uc3QgU1RBVEVfS0VZID0gJ3N0YXRlJztcblxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgLy8gLi5hbmQgYW4gKG9wdGlvbmFsKSBjdXN0b20gY2xhc3MgY29uc3RydWN0b3IuIElmIG9uZSBpc1xuICAvLyBub3Qgc3VwcGxpZWQsIGEgZGVmYXVsdCBjb25zdHJ1Y3RvciBpcyB1c2VkIGluc3RlYWQ6XG4gIC8vIGNvbnN0cnVjdG9yKCkgeyB9XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAvLyB0aGlzLnN0b3JlID0gbmV3IFN0b3JhZ2VBUEkoKTtcbiAgICBpZiAoU3RvcmUuc3RvcmFnZUF2YWlsYWJsZSgpKSB7XG4gICAgICB0aGlzLnN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgaWYgKHRoaXMuY2hlY2tTdGF0ZUV4aXN0cykge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgU1RBVEVfS0VZIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0cyBhIGtleS92YWx1ZSBwYWlyIHRvIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHBhcmFtIHZhbHVlIHwgc3RyaW5nXG4gIHNldFN0YXRlSXRlbShrZXkgPSAnJywgdmFsdWUgPSAnJykge1xuICAgIGNvbnN0IHN0b3JlT2JqID0geyBba2V5XTogdmFsdWUgfTtcbiAgICBjb25zdCBuZXdTdGF0ZU9iaiA9IHsgLi4udGhpcy5nZXRTdGF0ZSgpLCAuLi5zdG9yZU9iaiB9O1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGVPYmopO1xuICAgIHJldHVybiBuZXdTdGF0ZU9iajtcbiAgfVxuXG4gIC8vIERlbGV0ZSBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy8gIS8vIFdBUk5JTkc6IG9ubHkgZG9lcyBhIHNoYWxsb3cgZGVsZXRlXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZGVsZXRlU3RhdGVJdGVtKGtleSA9ICcnKSB7XG4gICAgY29uc3Qgc3RvcmVPYmogPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgZGVsZXRlIHN0b3JlT2JqW2tleV07XG4gICAgdGhpcy5zZXRTdGF0ZShzdG9yZU9iaik7XG4gICAgcmV0dXJuIHN0b3JlT2JqO1xuICB9XG5cbiAgLy8gR2V0cyB0aGUgZW50aXJlIHN0YXRlIG9iamVjdFxuICAvL1xuICAvLyBAcmV0dXJuIG9iamVjdFxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgPyBKU09OLnBhcnNlKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKSA6IHt9O1xuICB9XG5cbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRJdGVtKGtleSA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKFNUQVRFX0tFWSk7XG4gIH1cblxuICAvLyBHZXRzIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldFN0YXRlSXRlbShrZXkgPSAnJykge1xuICAgIHJldHVybiB0aGlzLmNoZWNrSXRlbShrZXkpID8gdGhpcy5nZXRTdGF0ZSgpW2tleV0gOiB7fTtcbiAgfVxuXG4gIC8vIFNldHMgYSBuZXcgc3RhdGUgb2JqZWN0IHN0YXRlXG4gIC8vXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZSh2YWx1ZSA9IHt9KSB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oU1RBVEVfS0VZLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSA/IEpTT04ucGFyc2UodGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpIDoge307XG4gIH1cblxuICAvLyBDaGVja3MgaWYgdGhlIHN0YXRlIGV4aXN0cyBpbiB0aGUgc3RvcmFnZSBwcm92aWRlclxuICBjaGVja1N0YXRlRXhpc3RzKCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKTtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIHN0YXRlIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgLy9cbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0U3RhdGVBc1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJdGVtKFNUQVRFX0tFWSk7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbiBpdGVtIGhhcyBiZWVuIHNhdmVkIHRvIHRoZSBzdG9yZVxuICAvLyB1bnVzZWQgYXMgb2YgMGEzMTA2ZVxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgaXNTdGF0ZUl0ZW1FeGlzdChpdGVtKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpKSB7XG4gICAgICBjb25zdCBzdGF0ZVN0ciA9IHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpO1xuICAgICAgaWYgKHN0YXRlU3RyLmluZGV4T2YoaXRlbSkgPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgY2hlY2tJdGVtKGl0ZW0pIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgJiYgdGhpcy5nZXRTdGF0ZUFzU3RyaW5nKCkuaW5kZXhPZihpdGVtKSA+IDA7XG4gIH1cblxuICAvLyBDaGVjayBpZiBsb2NhbFN0b3JhZ2UgYXZhaWxhYmxlLlxuICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJfU3RvcmFnZV9BUEkvVXNpbmdfdGhlX1dlYl9TdG9yYWdlX0FQSVxuICAvL1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgc3RhdGljIHN0b3JhZ2VBdmFpbGFibGUoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdsb2NhbFN0b3JhZ2UnO1xuICAgIGxldCBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgY29uc3QgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgIHN0b3JhZ2UubGVuZ3RoICE9PSAwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuXG5leHBvcnQgY2xhc3MgVXRpbGl0eSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9vID0ge307XG4gICAgdGhpcy5jaGVjayA9IGZhbHNlO1xuICB9XG5cbiAgLy8gY2hlY2tzIGlzIEphdmFzY3JpcHQgb2JqZWN0IGlzIGEgdmFsaWQgb2JqZWN0XG4gIC8vXG4gIC8vIEBwYXJhbSBvYmogLSBvYmplY3RcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGNoZWNrVmFsaWRPYmplY3Qob2JqKSB7XG4gICAgdGhpcy5vYmogPSBvYmo7XG4gICAgaWYgKHRoaXMub2JqID09PSB1bmRlZmluZWQgfHwgdGhpcy5vYmogPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ3N0cmluZycgJiYgdGhpcy5vYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBjcmVhdGVzIGEgdXVpZFxuICAvL1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICB1dWlkKCkge1xuICAgIHRoaXMuY3J5cHRvID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoNCkpLmpvaW4oJy0nKTtcbiAgICByZXR1cm4gdGhpcy5jcnlwdG87XG4gIH1cblxuICAvLyBjaGVja3MgaWYgY3VycmVudCBkZXZpY2UgaXMgYSBtb2JpbGVcbiAgLy9cbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGlzTW9iaWxlRGV2aWNlKCkge1xuICAgIHRoaXMuY2hlY2sgPSBmYWxzZTtcbiAgICAoZnVuY3Rpb24oYSl7aWYoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWlub3xhbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsay9pLnRlc3QoYSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCw0KSkpIHJldHVybiB0cnVlO30pKG5hdmlnYXRvci51c2VyQWdlbnR8fG5hdmlnYXRvci52ZW5kb3J8fHdpbmRvdy5vcGVyYSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gdGhpcy5jaGVjaztcbiAgfVxuXG4gIC8vIGNoZWNrcyBodG1sIGFzIGEgdGVtcGxhdGUvYmxvY2tcbiAgLy9cbiAgLy8gQHBhcmFtIHBsYWNlSG9sZGVyRWxlbWVudElEIC0gSFRNTCBlbGVtZW50IElEIHRoYXQgd2lsbCBob2xkIHRoZSB0ZW1wbGF0ZVxuICAvLyBAcGFyYW0gdGVtcGxhdGUgLSBIVE1MIGNvbnRlbnRcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGxvYWRIVE1MQmxvY2socGxhY2VIb2xkZXJFbGVtZW50SUQsIHRlbXBsYXRlKSB7XG4gICAgY29uc3QgY29tcG9uZW50RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYWNlSG9sZGVyRWxlbWVudElEKTtcblxuICAgIC8vIG1ha2Ugc3VyZSB0ZW1wbGF0ZSBleHNpc3RzXG4gICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICBpZiAoY29tcG9uZW50RWxlbSAhPSBudWxsKSB7XG4gICAgICAgIGNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnaG1sLWJsb2NrLWxvYWRlZCcsIHBsYWNlSG9sZGVyRWxlbWVudElEKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCd1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2htbC1ibG9jay11bmxvYWRlZCcsIHBsYWNlSG9sZGVyRWxlbWVudElEKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTG9hZCB0ZW1wbGF0ZSBpbnRvIHBsYWNlaG9sZGVyIGVsZW1lbnRcbiAgICAgICAgY29tcG9uZW50RWxlbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyB0cmlnZ2VycyBhIGRvbSBldmVudFxuICAvL1xuICAvLyBAcGFyYW0gZXZlbnROYW1lIC0gc3RyaW5nIGV2ZW50IG5hbWUgZm9yIGEgbGlzdG5lciB0byBsaXN0ZW4gdG9vXG4gIC8vIEBwYXJhbSBkZXRhaWwgLSBvYmplY3QgZGV0YWlscyBmb3IgZXZlbnRcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIHRyaWdnZXJFdmVudChldmVudE5hbWUsIGRldGFpbCkge1xuICAgIHRoaXMuZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgeyBkZXRhaWwgfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aGlzLmV2ZW50KTtcbiAgfVxuXG4gIC8vIGl0ZXJhdGVzIHggbnVtYmVyIG9mIGl0ZXJhdGlvbnMgYW5kIHNldHNcbiAgLy8gICAgc3VzIHF1ZXN0aW9ucyB0b3Agc3RhdGVcbiAgLy9cbiAgLy8gQHBhcmFtIGV2ZW50TmFtZSAtIHN0cmluZyBldmVudCBuYW1lIGZvciBhIGxpc3RuZXIgdG8gbGlzdGVuIHRvb1xuICAvLyBAcGFyYW0gZGV0YWlsIC0gb2JqZWN0IGRldGFpbHMgZm9yIGV2ZW50XG4gIC8vIEByZXR1cm4gbnVsbFxuICBzZXREb21TdGF0ZUZvckdyb3VwKHN0YXRldGV4dCwgaXRlcmF0aW9ucykge1xuICAgIGNvbnN0IHZhbHVlID0gc3RvcmUuZ2V0U3RhdGVJdGVtKGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YCwgMCk7XG4gICAgY29uc3QgYnRuUHJlZml4ID0gYGJ0bi1zdXMtcSR7aXRlcmF0aW9uc30tYDtcbiAgICBjb25zdCBhZ2dyZW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7YnRuUHJlZml4fSR7dmFsdWV9YCk7XG4gICAgaWYgKGFnZ3JlbWVudEVsZW1lbnQpIHtcbiAgICAgIGFnZ3JlbWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGlvbnMgPiAwKSB7XG4gICAgICBjb25zdCBuZXh0SXRlcmF0aW9uID0gaXRlcmF0aW9ucyAtIDE7XG4gICAgICB0aGlzLnNldERvbVN0YXRlRm9yR3JvdXAoc3RhdGV0ZXh0LCBuZXh0SXRlcmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvLyBpdGVyYXRlcyB4IG51bWJlciBvZiBpdGVyYXRpb25zIGFuZCB3cml0ZXMgYVxuICAvLyBhIGRlZmF1bHQgemVybyB2YWx1ZSBzdGF0ZSBrZXlcbiAgLy9cbiAgLy8gQHBhcmFtIGV2ZW50TmFtZSAtIHN0cmluZyBldmVudCBuYW1lIGZvciBhIGxpc3RuZXIgdG8gbGlzdGVuIHRvb1xuICAvLyBAcGFyYW0gZGV0YWlsIC0gb2JqZWN0IGRldGFpbHMgZm9yIGV2ZW50XG4gIC8vIEByZXR1cm4gbnVsbFxuICBzZXRTdGF0ZUZvckdyb3VwKHN0YXRldGV4dCwgaXRlcmF0aW9ucykge1xuICAgIGlmICghdGhpcy5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbShgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWApKSkge1xuICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YCwgMCk7XG4gICAgfVxuICAgIGlmIChpdGVyYXRpb25zID4gMCkge1xuICAgICAgY29uc3QgbmV4dEl0ZXJhdGlvbiA9IGl0ZXJhdGlvbnMgLSAxO1xuICAgICAgdGhpcy5zZXRTdGF0ZUZvckdyb3VwKHN0YXRldGV4dCwgbmV4dEl0ZXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLy8gaXRlcmF0ZXMgeCBudW1iZXIgb2YgaXRlcmF0aW9ucyBhbmQgd3JpdGVzIHRvIHRoZSBBUElcbiAgLy9cbiAgLy8gQHBhcmFtIGV2ZW50TmFtZSAtIHN0cmluZyBldmVudCBuYW1lIGZvciBhIGxpc3RuZXIgdG8gbGlzdGVuIHRvb1xuICAvLyBAcGFyYW0gZGV0YWlsIC0gb2JqZWN0IGRldGFpbHMgZm9yIGV2ZW50XG4gIC8vIEByZXR1cm4gbnVsbFxuICBzZXRBUElGb3JHcm91cChzdGF0ZXRleHQsIGl0ZXJhdGlvbnMsIHZhbHVlQXJyYXkgPSBbXSkge1xuICAgIGNvbnN0IGtleSA9IGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YDtcbiAgICBjb25zdCB2YWx1ZSA9IHN0b3JlLmdldFN0YXRlSXRlbShgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWApO1xuICAgIC8vIGNhcHR1cmUgaW4gYXJyYXkgc28gd2UgY2FuIHdyaXRlIGNvbXBsdGVkIGFycmF5IHRvIGFwaVxuICAgIHZhbHVlQXJyYXkucHVzaCh7IGtleSwgdmFsdWUgfSk7XG4gICAgaWYgKGl0ZXJhdGlvbnMgPiAwKSB7XG4gICAgICBjb25zdCBuZXh0SXRlcmF0aW9uID0gaXRlcmF0aW9ucyAtIDE7XG4gICAgICB0aGlzLnNldEFQSUZvckdyb3VwKHN0YXRldGV4dCwgbmV4dEl0ZXJhdGlvbiwgdmFsdWVBcnJheSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gd3JpdGUgY29tcGx0ZWQgYXJyYXkgdG8gYXBpXG4gICAgLy8gcmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50KCdkYXRhJywgJ2dyaWRhbnN3ZXJzJywgSlNPTi5zdHJpbmdpZnkodmFsdWVBcnJheSkpO1xuICAgIGNvbnN0IGRhdGVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2dyaWQtc3VibWl0ZWQnLCB0cnVlKTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzJywgdmFsdWVBcnJheSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkYW5zd2Vycy10aW1lJywgZGF0ZXN0YW1wKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==