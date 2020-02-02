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
/******/ 	var hotCurrentHash = "b6dfd7bae9baf533d194";
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

module.exports = "<div id=\"study-agreement-all\" class=\"h-auto w-100\">\n\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Study Agrreement</div>\n\n  <div id=\"study-agreement-title\" class=\"step-title w-100 d-flex mt-3\">Study Participation Agreement</div>\n\n  <div id=\"study-agreement\" class=\"step-directions w-100 d-flex mt-1\">\n    <div class=\"h-100\">\n      <div id=\"study-agreement-directions\" class=\"step-directions\">\n        Thank you for taking part in this study. By using the following website,\n        you agree to participate in a study about how people use web-presented maps.\n        We will collect information about your interactions with this site but not any\n        personally identifiable information. The only people with access to the study\n        data are the researchers. However, the data will be summarized, shared, and\n        disseminated in talks, blogs, and possibly research journals. There is no\n        cost to you to participate in this research study, and you will not be\n        compensated. There are no known risks in the following tasks.\n        <br /><br />\n        By agreeing to this, you have acknowledged that you have read the\n        contents of this consent, are an adult over 18 years of age, and\n        you are giving consent to participate in this study.\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-5\">Do you want to participate?</div>\n\n  <span class=\"mt-3 h-auto d-flex\">\n    <button id=\"aggree-button\" type=\"button\" class=\"btn btn-light btn-aggreement w-20 align-self-end mr-3\" >\n      <i class=\"fas fa-check\"></i>\n      Yes\n    </button>\n    <button id=\"diaggree-button\" type=\"button\" class=\"btn btn-xlight btn-aggreement w-20 align-self-end\" >\n      <i class=\"fas fa-times-circle\"></i>\n      No\n    </button>\n  </span>\n\n  <!-- <div id=\"aggree-disaggre-wrapper\" class=\"mt-3\">\n    <div id=\"study-agreement-sub\" class=\"step-directions align-self-center pb-4 py-2\">Do you want to participate?</div>\n    <button id=\"aggree-button\" type=\"button\" class=\"btn btn-light btn-aggreement w-20 align-self-end mr-3\" >\n      <i class=\"fas fa-check\"></i>\n      Yes\n    </button>\n    <button id=\"diaggree-button\" type=\"button\" class=\"btn btn-xlight btn-aggreement w-20 align-self-end\" >\n      <i class=\"fas fa-times-circle\"></i>\n      No\n    </button>\n  </div> -->\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-completed.html":
/*!*******************************************************!*\
  !*** ./src/content-blocks/block-study-completed.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-end\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100\">Whats Changed?</div>\n  <div id=\"step1-directions\" class=\"step-directions w-100\">\n    Thanks for participating!\n  </div>\n\n  <div id=\"map-holder-end\" class=\"start-map w-100 d-flex mt-3\">\n    <!-- <div id=\"map-holder-end\" class=\"start-map w-100 d-flex mt-3\">\n      <div id=\"map-inner-holder-end\" class=\"row h-100 justify-content-center\">\n        <div id='compare-end-wrapper'>\n          <div id=\"map-c-enda\" class=\"my-3 mx-3\"></div>\n          <div id=\"map-c-endb\" class=\"my-3 mx-3\"></div>\n        </div>\n      </div>\n    </div>-->\n    <div class=\"row w-100 ml-3\">\n      <div class=\"col-12 col-sm-6 px-0 w-100\" >\n\n        <div class=\"row w-100\">\n          <div class=\"col-12 col-md-12 px-0 py-1 w-100\" >\n            Your answer\n          </div>\n          <div id=\"map-enda\" class=\"col-12 col-md-6 px-0 map-enda endmap\"></div>\n          <!-- <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n            <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n              <div id='compare-end1-wrapper'>\n                <div id=\"map-c-enda\" class=\"mx-3\"></div>\n                <div id=\"map-c-endb\" class=\"mx-3\"></div>\n              </div>\n            </div>\n          </div> -->\n        </div>\n\n      </div>\n      <div class=\"col-12 col-sm-6 px-0 w-100\" >\n\n        <div class=\"row w-100\">\n          <div class=\"col-12 px-0 py-1 ml-0 ml-sm-3 w-100\" >\n            Our answer\n          </div>\n          <!-- <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n            <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n              <div id='compare-end2-wrapper'>\n                <div id=\"map-c-endc\" class=\"mx-3\"></div>\n                <div id=\"map-c-endd\" class=\"mx-3\"></div>\n              </div>\n            </div>\n          </div> -->\n          <div id=\"map-endb\" class=\"col-12 col-md-6 px-0 ml-3 map-endb endmap\"></div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row w-100 my-2\">\n    <div class=\"col-12 col-sm-4 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"completed-play\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-play-circle mr-2\"></i>Play\n        </button>\n      </div>\n    </div>\n    <div class=\"col-12 col-sm-4 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"completed-pause\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-pause-circle mr-2\"></i>Pause\n        </button>\n      </div>\n    </div>\n    <div class=\"col-12 col-sm-4 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"completed-stop\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-stop-circle mr-2\"></i>Stop\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n";

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

module.exports = "<div id=\"study-progress-map-0\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    <ul>\n      <li>The map below contains two images that are different.</li>\n      <li>The two images will turn on and off at a regular intervals.</li>\n      <li>Click on any boxes where you believe the two images are different.</li>\n      <li class=\"for-sat\">Only select areas of <strong>MAJOR</strong> change.</li>\n      <li>The boxes you click on will change orange and will become your answers when you click submit.</li>\n      <li>Clicking on an orange box will remove it from your selection.</li>\n      <li>Zoom or Pan if you need to.</li>\n      <li>Submit your answer.</li>\n    </ul>\n  </div>\n\n  <div id=\"map-holder-1\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-1\" class=\"row h-100 justify-content-center\">\n      <div id=\"map-1\" class=\"my-3 mx-3\"></div>\n    </div>\n  </div>\n\n  <div class=\"row w-100 my-2\">\n    <div class=\"col-12 col-sm-12 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"study-play\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-play-circle mr-2\"></i>Play\n        </button>\n      </div>\n    </div>\n    <div class=\"col-12 col-sm-12 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"study-pause\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-pause-circle mr-2\"></i>Pause\n        </button>\n      </div>\n    </div>\n    <div class=\"col-12 col-sm-12 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"study-stop\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-stop-circle mr-2\"></i>Stop\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-0\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-2.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-2.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-1\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    <ul>\n      <li>The two maps below contain images that are different.</li>\n      <li>Click on any boxes where you believe the two images are different.</li>\n      <li class=\"for-sat\">Only select areas of <strong>MAJOR</strong> change.</li>\n      <li>The boxes you click on will change orange and will become your answers when you click submit.</li>\n      <li>Clicking on an orange box will remove it from your selection.</li>\n      <li>Zoom or Pan if you need to.</li>\n      <li>Submit your answer.</li>\n    </ul>\n  </div>\n\n  <div id=\"map-holder-2\" class=\"start-map w-100 d-flex ml-3 mt-3\">\n    <div id=\"map-inner-holder-2\" class=\"row justify-content-center\">\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2a\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2a\"></div>\n      </div>\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2b\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2b\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-1\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-3.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-3.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-2\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    <ul>\n      <li>The two maps below contain images that are different.</li>\n      <li>Drag the vertical bar side-to-side to reveal the images.</li>\n      <li>Click on any boxes where you believe the two images are different.</li>\n      <li class=\"for-sat\">Only select areas of <strong>MAJOR</strong> change.</li>\n      <li>The boxes you click on will change orange and will become your answers when you click submit.</li>\n      <li>Clicking on an orange box will remove it from your selection.</li>\n      <li>Zoom or Pan if you need to.</li>\n      <li>Submit your answer.</li>\n    </ul>\n  </div>\n\n  <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n      <div id='compare-wrapper'>\n        <div id=\"map-3a\" class=\"mx-3\"></div>\n        <div id=\"map-3b\" class=\"mx-3\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-2\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-sus.html":
/*!*************************************************!*\
  !*** ./src/content-blocks/block-study-sus.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-sus\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 3 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    <ul>\n      <li>Rank each question from 1 to 5 based on how much you agree or disaggre with the statement.</li>\n      <li>1 indicates you strongly disagree.</li>\n      <li>5 indicates you strongly aggree.</li>\n    </ul>    \n  </div>\n\n  <div class=\"pl-1 pt-3 pb-3\">\n    &nbsp;\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        1.&nbsp;&nbsp;I think that I would like to use this site frequently\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-1\" class=\"btn-group btn-sus mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q1-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q1-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q1-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q1-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q1-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        2.&nbsp;&nbsp;I found the site unnecessarily complex\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-2\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q2-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q2-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q2-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q2-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q2-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        3.&nbsp;&nbsp;I thought the site was easy to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-3\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q3-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q3-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q3-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q3-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q3-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        4.&nbsp;&nbsp;I think that I would need the support of a technical person to be able to use this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-4\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q4-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q4-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q4-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q4-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q4-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        5.&nbsp;&nbsp;I found the various functions in this site were well integrated\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-5\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q5-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q5-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q5-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q5-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q5-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        6.&nbsp;&nbsp;I thought there was too much inconsistency in this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-6\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q6-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q6-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q6-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q6-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q6-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        7.&nbsp;&nbsp;I would imagine that most people would learn to use this site very quickly\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-7\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q7-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q7-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q7-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q7-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q7-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        8.&nbsp;&nbsp;I found the site very cumbersome to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-8\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q8-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q8-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q8-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q8-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q8-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        9.&nbsp;&nbsp;I felt very confident using the site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-9\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q9-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q9-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q9-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q9-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q9-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        10.&nbsp;&nbsp;I needed to learn a lot of things before I could get going with this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-10\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q10-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q10-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q10-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q10-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q10-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-100 d-flex mt-4\">\n    <div class=\"pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-7\">\n      &nbsp;\n    </div>\n    <div class=\"pb-4 pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-5\">\n      <button id=\"submit-button-to-end\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and finish.\">\n        Submit and finish\n      </button>\n    </div>\n  </div>\n\n</div>\n";

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

    // completed-play
    // adds handler for playing animation
    //
    // @param page - string page to play completed, map
    // @return null

  }, {
    key: 'addHandlerPlayClick',
    value: function addHandlerPlayClick() {
      var _this2 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'completed';
      var elementID = arguments[1];

      var element = document.getElementById(elementID);
      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          store.setStateItem('map-' + page + '-animation', true);
          store.setStateItem('map-' + page + '-animation-stop', true);
          _this2.animate = true;
        });
      }
    }

    // completed-play
    // adds handler for playing animation
    //
    // @param page - string page to play completed, map
    // @return null

  }, {
    key: 'addHandlerLayersOffClick',
    value: function addHandlerLayersOffClick() {
      var _this3 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'completed';
      var elementID = arguments[1];

      var element = document.getElementById(elementID);
      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          store.setStateItem('map-' + page + '-animation-stop', false);
          _this3.animate = true;
        });
      }
    }

    // completed-play
    // adds handler for pausing animation
    //
    // @param page - string page to play completed, map
    // @return null

  }, {
    key: 'addHandlerPauseClick',
    value: function addHandlerPauseClick() {
      var _this4 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'completed';
      var elementID = arguments[1];

      var element = document.getElementById(elementID);
      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          store.setStateItem('map-' + page + '-animation', false);
          _this4.animate = false;
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
      var _this5 = this;

      var element = document.getElementById(elementID);
      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          // add elements to UI
          _this5.studySUSElementsAdd.forEach(function (elementUIID) {
            document.getElementById(elementUIID).classList.remove(_this5.displayNoneClass);
          });

          //  remove elements from UI
          _this5.studySUSElementsRemove.forEach(function (elementUIID) {
            // only add display none class if the class does not exsist
            // ensure that duplicate classes are not added
            if (!document.getElementById(elementUIID).classList.contains(_this5.displayNoneClass)) {
              document.getElementById(elementUIID).classList.add(_this5.displayNoneClass);
            }
          });

          var susValueArray = [];
          _this5.susStorageKeys.forEach(function (key) {
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
      var _this6 = this;

      var element = document.getElementById(elementID);
      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          var studyVersion = store.getStateItem('study-question');
          var agreementTimeStamp = new Date().toISOString();

          // add elements to UI
          _this6.studyAggreementElementsAdd.forEach(function (elementUIID) {
            document.getElementById('' + elementUIID + studyVersion).classList.remove(_this6.displayNoneClass);
          });

          //  remove elements from UI
          _this6.studyAggreementElementsRemove.forEach(function (elementUIID) {
            // only add display none class if the class does not exsist
            // ensure that duplicate classes are not added
            if (!document.getElementById(elementUIID).classList.contains(_this6.displayNoneClass)) {
              document.getElementById(elementUIID).classList.add(_this6.displayNoneClass);
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
      var _this7 = this;

      var element = document.getElementById(elementID);
      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          var agreementTimeStamp = new Date().toISOString();
          // add elements to UI
          _this7.studyDisaggreementElementsAdd.forEach(function (elementUIID) {
            document.getElementById(elementUIID).classList.remove(_this7.displayNoneClass);
          });

          //  remove elements from UI
          _this7.studyDisaggreementElementsRemove.forEach(function (elementUIID) {
            // only add display none class if the class does not exsist
            // ensure that duplicate classes are not added
            if (!document.getElementById(elementUIID).classList.contains(_this7.displayNoneClass)) {
              document.getElementById(elementUIID).classList.add(_this7.displayNoneClass);
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
      var _this8 = this;

      var element = document.getElementById(elementID);
      this.selectedClass = 'selected';

      // ensure element exsists
      if (element) {
        element.addEventListener('click', function (e) {
          // get parent element which is button group
          var parentBtnGroup = document.getElementById(e.target.id).parentElement;
          Handlers.toggleButtonGroupButttonsOff(parentBtnGroup, _this8.selectedClass);

          var questionText = parentBtnGroup.id.replace('btn-group-sus-', 'sus-question-');
          store.setStateItem(questionText, Number(e.target.innerText));

          // add sus question answer to selected to class
          if (!document.getElementById(e.target.id).classList.contains(_this8.selectedClass)) {
            document.getElementById(e.target.id).classList.add(_this8.selectedClass);
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

if (!utility.checkValidObject(store.getStateItem('map-completed-animation-stop'))) {
  store.setStateItem('map-completed-animation-stop', true);
}

if (!utility.checkValidObject(store.getStateItem('map-study-animation-stop'))) {
  store.setStateItem('map-study-animation-stop', true);
}

if (!utility.checkValidObject(store.getStateItem('map-completed-animation'))) {
  store.setStateItem('map-completed-animation', true);
}

if (!utility.checkValidObject(store.getStateItem('map-study-animation'))) {
  store.setStateItem('map-study-animation', true);
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

// compare maps need to uncomment html too
// const mapEndAArr = mapBoxConfig.makeCompareMap('map-c-enda', 'map-c-endb',
//        'compare-end1-wrapper', false, false);
// const mapEndBArr = mapBoxConfig.makeCompareMap('map-c-endc', 'map-c-endd',
//        'compare-end2-wrapper', true, false);
// mapBoxConfig.syncMaps(mapEndAArr[0], mapEndAArr[1]);
// mapBoxConfig.syncMaps(mapEndBArr[0], mapEndBArr[1]);

var mapEnda = mapBoxConfig.makeAnimateMap('map-enda', 99, false, false, true);
var mapEndb = mapBoxConfig.makeAnimateMap('map-endb', 99, true, false, true);

//  single maps
// const mapEnda = mapBoxConfig.makeMap('map-enda', 99, false, false);
// const mapEndb = mapBoxConfig.makeMap('map-endb',99, true, false);
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
  // mapEndAArr[0].resize();
  // mapEndAArr[1].resize();
  // mapEndBArr[0].resize();
  // mapEndBArr[1].resize();

  mapEnda.resize();
  mapEndb.resize();
}

document.addEventListener('aggree-clicked', function () {
  resizeAllMaps();
});

document.addEventListener('sus-clicked', function () {
  resizeAllMaps();
  mapEnda.setZoom(5);
  mapEnda.setZoom(5);

  // mapEndAArr[0].setZoom(5);;
  // mapEndAArr[1].setZoom(5);;
  // mapEndBArr[0].setZoom(5);;
  // mapEndBArr[1].setZoom(5);;

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

handlers.addHandlerPlayClick('completed', 'completed-play');
handlers.addHandlerPauseClick('completed', 'completed-pause');
handlers.addHandlerLayersOffClick('completed', 'completed-stop');

handlers.addHandlerPlayClick('study', 'study-play');
handlers.addHandlerPauseClick('study', 'study-pause');
handlers.addHandlerLayersOffClick('study', 'study-stop');

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

// remove imagery directions when not imagery
if (mapVersion !== 2) {
  var imageryDirectionsElems = document.querySelectorAll('.for-sat');

  imageryDirectionsElems.forEach(function (elem) {
    elem.setAttribute('style', 'display: none !important');
  });
}

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

var _mapboxGl = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _mapboxGlCompare = __webpack_require__(/*! mapbox-gl-compare */ "./node_modules/mapbox-gl-compare/index.js");

var _mapboxGlCompare2 = _interopRequireDefault(_mapboxGlCompare);

var _helpers = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/index.js");

var _buffer = __webpack_require__(/*! @turf/buffer */ "./node_modules/@turf/buffer/main.es.js");

var _buffer2 = _interopRequireDefault(_buffer);

var _bboxPolygon = __webpack_require__(/*! @turf/bbox-polygon */ "./node_modules/@turf/bbox-polygon/index.js");

var _bboxPolygon2 = _interopRequireDefault(_bboxPolygon);

var _bbox = __webpack_require__(/*! @turf/bbox */ "./node_modules/@turf/bbox/index.js");

var _bbox2 = _interopRequireDefault(_bbox);

var _envelope = __webpack_require__(/*! @turf/envelope */ "./node_modules/@turf/envelope/main.es.js");

var _envelope2 = _interopRequireDefault(_envelope);

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

    // defaults for grid boxes
    var buffDist = 4;
    var buffUnits = { units: 'miles' };
    var ikBox = (0, _bbox2.default)((0, _envelope2.default)(_squareGridGeojson2.default));
    var hstnBox = (0, _bbox2.default)((0, _envelope2.default)(_squareGridGeojsonSecond2.default));
    var lvBox = (0, _bbox2.default)((0, _envelope2.default)(_squareGridGeojsonThird2.default));

    var ikMaxBox = (0, _bbox2.default)((0, _buffer2.default)((0, _bboxPolygon2.default)(ikBox), buffDist, buffUnits));
    var hstnMaxBox = (0, _bbox2.default)((0, _buffer2.default)((0, _bboxPolygon2.default)(hstnBox), buffDist, buffUnits));
    var lvMaxBox = (0, _bbox2.default)((0, _buffer2.default)((0, _bboxPolygon2.default)(lvBox), buffDist, buffUnits));

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
        bounds: ikBox,
        maxbounds: ikMaxBox
      }, {
        url: 'https://daveism.github.io/change-research/dist/maps/iknow_2/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: ikBox,
        maxbounds: ikMaxBox
      }], [// hstn 1
      {
        url: 'https://daveism.github.io/change-research/dist/maps/landcover_1/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: hstnBox,
        maxbounds: hstnMaxBox
      }, {
        url: 'https://daveism.github.io/change-research/dist/maps/landcover_2/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: hstnBox,
        maxbounds: hstnMaxBox
      }], [// lv 2
      {
        url: 'https://daveism.github.io/change-research/dist/maps/lakemead_1/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: lvBox,
        maxbounds: lvMaxBox
      }, {
        url: 'https://daveism.github.io/change-research/dist/maps/lakemead_2/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: lvBox,
        maxbounds: lvMaxBox
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
      var mapIndexBounds = this.defaultMaxBounds;
      if (mapIndex === 99) {
        mapIndexBounds = mapSetup[0].maxbounds;
      } else {
        mapIndexBounds = mapSetup[mapIndex].maxbounds;
      }
      var map = new this.mapboxgl.Map({
        container: mapContainer,
        style: this.darkMapStyle,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true,
        maxBounds: mapIndexBounds
      });

      map.on('load', function (e) {
        _this.fitMyBounds(map);
        if (mapIndex !== 99) {
          map.addLayer(_this.makeTMSLayer(_this.mapChangeLayersOne, mapIndex));
        }
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
      var mapContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultMapContainer;
      var mapIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var _this2 = this;

      var enableclick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var endmaps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

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
        // if (end) {
        map.addLayer(_this2.makeTMSLayer(_this2.mapChangeLayersOne, 0));
        map.addLayer(_this2.makeTMSLayer(_this2.mapChangeLayersOne, 1));
        // }
        map.addLayer(_this2.makeGridOutLineLayer());
        if (end) {
          map.addLayer(_this2.makeGridCorrectLayer());
        } else {
          map.addLayer(_this2.makeGridLayer());
        }
        if (enableclick) {
          _this2.addGridClick(map);
        }
        map.resize();

        var indexCount = 2;
        var index = 0;

        setInterval(function () {
          // see if user paused animation
          if (endmaps) {
            var keepGoing = store.getStateItem('map-completed-animation');
            if (!keepGoing) {
              return null;
            }
            var keepGoingStop = store.getStateItem('map-completed-animation-stop');
            if (!keepGoingStop) {
              map.setLayoutProperty('map-change-1', 'visibility', 'none');
              map.setLayoutProperty('map-change-0', 'visibility', 'none');
              return null;
            }
          } else {
            var _keepGoing = store.getStateItem('map-study-animation');
            if (!_keepGoing) {
              return null;
            }

            var _keepGoingStop = store.getStateItem('map-study-animation-stop');
            if (!_keepGoingStop) {
              map.setLayoutProperty('map-change-1', 'visibility', 'none');
              map.setLayoutProperty('map-change-0', 'visibility', 'none');
              return null;
            }
          }

          index = (index + 1) % indexCount;
          if (index === 1) {
            map.setLayoutProperty('map-change-1', 'visibility', 'visible');
            map.setLayoutProperty('map-change-0', 'visibility', 'none');
          } else {
            map.setLayoutProperty('map-change-0', 'visibility', 'visible');
            map.setLayoutProperty('map-change-1', 'visibility', 'none');
          }
          return null;
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
        if (end) {
          beforeMap.addLayer(_this3.makeGridCorrectLayer());
        } else {
          beforeMap.addLayer(_this3.makeGridLayer());
        }
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

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.9297282558553,29.77495644902612],[-95.91906092865867,29.77495644902612],[-95.91906092865867,29.766272554037492],[-95.91906092865867,29.757588659048864],[-95.9297282558553,29.757588659048864],[-95.94039558305192,29.757588659048864],[-95.94039558305192,29.766272554037492],[-95.94039558305192,29.77495644902612],[-95.9297282558553,29.77495644902612]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.9297282558553,29.757588659048864],[-95.91906092865867,29.757588659048864],[-95.91906092865867,29.748904764060235],[-95.91906092865867,29.740220869071607],[-95.9297282558553,29.740220869071607],[-95.94039558305192,29.740220869071607],[-95.94039558305192,29.748904764060235],[-95.94039558305192,29.757588659048864],[-95.9297282558553,29.757588659048864]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.722853079094342],[-95.94039558305192,29.731536974082978],[-95.94039558305192,29.740220869071607],[-95.9297282558553,29.740220869071607],[-95.91906092865867,29.740220869071607],[-95.91906092865867,29.731536974082978],[-95.91906092865867,29.722853079094342],[-95.9297282558553,29.722853079094342],[-95.94039558305192,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.705485289117092],[-95.94039558305192,29.71416918410572],[-95.94039558305192,29.722853079094342],[-95.9297282558553,29.722853079094342],[-95.91906092865867,29.722853079094342],[-95.91906092865867,29.71416918410572],[-95.91906092865867,29.705485289117092],[-95.9297282558553,29.705485289117092],[-95.94039558305192,29.705485289117092]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.688117499139835],[-95.94039558305192,29.696801394128464],[-95.94039558305192,29.705485289117092],[-95.9297282558553,29.705485289117092],[-95.91906092865867,29.705485289117092],[-95.91906092865867,29.696801394128464],[-95.91906092865867,29.688117499139835],[-95.9297282558553,29.688117499139835],[-95.94039558305192,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.67074970916258],[-95.94039558305192,29.679433604151207],[-95.94039558305192,29.688117499139835],[-95.9297282558553,29.688117499139835],[-95.91906092865867,29.688117499139835],[-95.91906092865867,29.679433604151207],[-95.91906092865867,29.67074970916258],[-95.9297282558553,29.67074970916258],[-95.94039558305192,29.67074970916258]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.91906092865867,29.757588659048864],[-95.91906092865867,29.766272554037492],[-95.91906092865867,29.77495644902612],[-95.90839360146204,29.77495644902612],[-95.89772627426541,29.77495644902612],[-95.89772627426541,29.766272554037492],[-95.89772627426541,29.757588659048864],[-95.90839360146204,29.757588659048864],[-95.91906092865867,29.757588659048864]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.88705894706878,29.77495644902612],[-95.87639161987215,29.77495644902612],[-95.87639161987215,29.766272554037492],[-95.87639161987215,29.757588659048864],[-95.88705894706878,29.757588659048864],[-95.89772627426541,29.757588659048864],[-95.89772627426541,29.766272554037492],[-95.89772627426541,29.77495644902612],[-95.88705894706878,29.77495644902612]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.757588659048864],[-95.87639161987215,29.766272554037492],[-95.87639161987215,29.77495644902612],[-95.86572429267552,29.77495644902612],[-95.8550569654789,29.77495644902612],[-95.8550569654789,29.766272554037492],[-95.8550569654789,29.757588659048864],[-95.86572429267552,29.757588659048864],[-95.87639161987215,29.757588659048864]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.757588659048864],[-95.8550569654789,29.766272554037492],[-95.8550569654789,29.77495644902612],[-95.84438963828227,29.77495644902612],[-95.83372231108564,29.77495644902612],[-95.83372231108564,29.766272554037492],[-95.83372231108564,29.757588659048864],[-95.84438963828227,29.757588659048864],[-95.8550569654789,29.757588659048864]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.82305498388901,29.77495644902612],[-95.81238765669238,29.77495644902612],[-95.81238765669238,29.766272554037492],[-95.81238765669238,29.757588659048864],[-95.82305498388901,29.757588659048864],[-95.83372231108564,29.757588659048864],[-95.83372231108564,29.766272554037492],[-95.83372231108564,29.77495644902612],[-95.82305498388901,29.77495644902612]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.81238765669238,29.757588659048864],[-95.81238765669238,29.766272554037492],[-95.81238765669238,29.77495644902612],[-95.80172032949575,29.77495644902612],[-95.79105300229912,29.77495644902612],[-95.79105300229912,29.766272554037492],[-95.79105300229912,29.757588659048864],[-95.80172032949575,29.757588659048864],[-95.81238765669238,29.757588659048864]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.81238765669238,29.740220869071607],[-95.81238765669238,29.748904764060235],[-95.81238765669238,29.757588659048864],[-95.80172032949575,29.757588659048864],[-95.79105300229912,29.757588659048864],[-95.79105300229912,29.748904764060235],[-95.79105300229912,29.740220869071607],[-95.80172032949575,29.740220869071607],[-95.81238765669238,29.740220869071607]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.740220869071607],[-95.79105300229912,29.740220869071607],[-95.79105300229912,29.731536974082978],[-95.79105300229912,29.722853079094342],[-95.80172032949575,29.722853079094342],[-95.81238765669238,29.722853079094342],[-95.81238765669238,29.731536974082978],[-95.81238765669238,29.740220869071607],[-95.80172032949575,29.740220869071607]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.722853079094342],[-95.79105300229912,29.722853079094342],[-95.79105300229912,29.71416918410572],[-95.79105300229912,29.705485289117092],[-95.80172032949575,29.705485289117092],[-95.81238765669238,29.705485289117092],[-95.81238765669238,29.71416918410572],[-95.81238765669238,29.722853079094342],[-95.80172032949575,29.722853079094342]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.705485289117092],[-95.79105300229912,29.705485289117092],[-95.79105300229912,29.696801394128464],[-95.79105300229912,29.688117499139835],[-95.80172032949575,29.688117499139835],[-95.81238765669238,29.688117499139835],[-95.81238765669238,29.696801394128464],[-95.81238765669238,29.705485289117092],[-95.80172032949575,29.705485289117092]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.688117499139835],[-95.79105300229912,29.688117499139835],[-95.79105300229912,29.679433604151207],[-95.79105300229912,29.67074970916258],[-95.80172032949575,29.67074970916258],[-95.81238765669238,29.67074970916258],[-95.81238765669238,29.679433604151207],[-95.81238765669238,29.688117499139835],[-95.80172032949575,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.90839360146204,29.688117499139835],[-95.89772627426541,29.688117499139835],[-95.89772627426541,29.679433604151207],[-95.89772627426541,29.67074970916258],[-95.90839360146204,29.67074970916258],[-95.91906092865867,29.67074970916258],[-95.91906092865867,29.679433604151207],[-95.91906092865867,29.688117499139835],[-95.90839360146204,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.67074970916258],[-95.89772627426541,29.679433604151207],[-95.89772627426541,29.688117499139835],[-95.88705894706878,29.688117499139835],[-95.87639161987215,29.688117499139835],[-95.87639161987215,29.679433604151207],[-95.87639161987215,29.67074970916258],[-95.88705894706878,29.67074970916258],[-95.89772627426541,29.67074970916258]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.67074970916258],[-95.87639161987215,29.679433604151207],[-95.87639161987215,29.688117499139835],[-95.86572429267552,29.688117499139835],[-95.8550569654789,29.688117499139835],[-95.8550569654789,29.679433604151207],[-95.8550569654789,29.67074970916258],[-95.86572429267552,29.67074970916258],[-95.87639161987215,29.67074970916258]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.84438963828227,29.688117499139835],[-95.83372231108564,29.688117499139835],[-95.83372231108564,29.679433604151207],[-95.83372231108564,29.67074970916258],[-95.84438963828227,29.67074970916258],[-95.8550569654789,29.67074970916258],[-95.8550569654789,29.679433604151207],[-95.8550569654789,29.688117499139835],[-95.84438963828227,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.67074970916258],[-95.83372231108564,29.679433604151207],[-95.83372231108564,29.688117499139835],[-95.82305498388901,29.688117499139835],[-95.81238765669238,29.688117499139835],[-95.81238765669238,29.679433604151207],[-95.81238765669238,29.67074970916258],[-95.82305498388901,29.67074970916258],[-95.83372231108564,29.67074970916258]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.91906092865867,29.740220869071607],[-95.91906092865867,29.748904764060235],[-95.91906092865867,29.757588659048864],[-95.90839360146204,29.757588659048864],[-95.89772627426541,29.757588659048864],[-95.89772627426541,29.748904764060235],[-95.89772627426541,29.740220869071607],[-95.90839360146204,29.740220869071607],[-95.91906092865867,29.740220869071607]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.688117499139835],[-95.83372231108564,29.696801394128464],[-95.83372231108564,29.705485289117092],[-95.82305498388901,29.705485289117092],[-95.81238765669238,29.705485289117092],[-95.81238765669238,29.696801394128464],[-95.81238765669238,29.688117499139835],[-95.82305498388901,29.688117499139835],[-95.83372231108564,29.688117499139835]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.748904764060235],[-95.83372231108564,29.757588659048864],[-95.82305498388901,29.757588659048864],[-95.81238765669238,29.757588659048864],[-95.81238765669238,29.748904764060235],[-95.81238765669238,29.740220869071607],[-95.82305498388901,29.740220869071607],[-95.83372231108564,29.740220869071607],[-95.83372231108564,29.748904764060235]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.90839360146204,29.705485289117092],[-95.89772627426541,29.705485289117092],[-95.89772627426541,29.696801394128464],[-95.89772627426541,29.688117499139835],[-95.90839360146204,29.688117499139835],[-95.91906092865867,29.688117499139835],[-95.91906092865867,29.696801394128464],[-95.91906092865867,29.705485289117092],[-95.90839360146204,29.705485289117092]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.91906092865867,29.722853079094342],[-95.91906092865867,29.731536974082978],[-95.91906092865867,29.740220869071607],[-95.90839360146204,29.740220869071607],[-95.89772627426541,29.740220869071607],[-95.89772627426541,29.731536974082978],[-95.89772627426541,29.722853079094342],[-95.90839360146204,29.722853079094342],[-95.91906092865867,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.90839360146204,29.722853079094342],[-95.89772627426541,29.722853079094342],[-95.89772627426541,29.71416918410572],[-95.89772627426541,29.705485289117092],[-95.90839360146204,29.705485289117092],[-95.91906092865867,29.705485289117092],[-95.91906092865867,29.71416918410572],[-95.91906092865867,29.722853079094342],[-95.90839360146204,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.71416918410572],[-95.83372231108564,29.722853079094342],[-95.82305498388901,29.722853079094342],[-95.81238765669238,29.722853079094342],[-95.81238765669238,29.71416918410572],[-95.81238765669238,29.705485289117092],[-95.82305498388901,29.705485289117092],[-95.83372231108564,29.705485289117092],[-95.83372231108564,29.71416918410572]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.82305498388901,29.740220869071607],[-95.81238765669238,29.740220869071607],[-95.81238765669238,29.731536974082978],[-95.81238765669238,29.722853079094342],[-95.82305498388901,29.722853079094342],[-95.83372231108564,29.722853079094342],[-95.83372231108564,29.731536974082978],[-95.83372231108564,29.740220869071607],[-95.82305498388901,29.740220869071607]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.740220869071607],[-95.8550569654789,29.748904764060235],[-95.8550569654789,29.757588659048864],[-95.84438963828227,29.757588659048864],[-95.83372231108564,29.757588659048864],[-95.83372231108564,29.748904764060235],[-95.83372231108564,29.740220869071607],[-95.84438963828227,29.740220869071607],[-95.8550569654789,29.740220869071607]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.740220869071607],[-95.87639161987215,29.748904764060235],[-95.87639161987215,29.757588659048864],[-95.86572429267552,29.757588659048864],[-95.8550569654789,29.757588659048864],[-95.8550569654789,29.748904764060235],[-95.8550569654789,29.740220869071607],[-95.86572429267552,29.740220869071607],[-95.87639161987215,29.740220869071607]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.748904764060235],[-95.89772627426541,29.757588659048864],[-95.88705894706878,29.757588659048864],[-95.87639161987215,29.757588659048864],[-95.87639161987215,29.748904764060235],[-95.87639161987215,29.740220869071607],[-95.88705894706878,29.740220869071607],[-95.89772627426541,29.740220869071607],[-95.89772627426541,29.748904764060235]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.722853079094342],[-95.89772627426541,29.731536974082978],[-95.89772627426541,29.740220869071607],[-95.88705894706878,29.740220869071607],[-95.87639161987215,29.740220869071607],[-95.87639161987215,29.731536974082978],[-95.87639161987215,29.722853079094342],[-95.88705894706878,29.722853079094342],[-95.89772627426541,29.722853079094342]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.86572429267552,29.740220869071607],[-95.8550569654789,29.740220869071607],[-95.8550569654789,29.731536974082978],[-95.8550569654789,29.722853079094342],[-95.86572429267552,29.722853079094342],[-95.87639161987215,29.722853079094342],[-95.87639161987215,29.731536974082978],[-95.87639161987215,29.740220869071607],[-95.86572429267552,29.740220869071607]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.722853079094342],[-95.8550569654789,29.731536974082978],[-95.8550569654789,29.740220869071607],[-95.84438963828227,29.740220869071607],[-95.83372231108564,29.740220869071607],[-95.83372231108564,29.731536974082978],[-95.83372231108564,29.722853079094342],[-95.84438963828227,29.722853079094342],[-95.8550569654789,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.705485289117092],[-95.89772627426541,29.71416918410572],[-95.89772627426541,29.722853079094342],[-95.88705894706878,29.722853079094342],[-95.87639161987215,29.722853079094342],[-95.87639161987215,29.71416918410572],[-95.87639161987215,29.705485289117092],[-95.88705894706878,29.705485289117092],[-95.89772627426541,29.705485289117092]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.86572429267552,29.722853079094342],[-95.8550569654789,29.722853079094342],[-95.8550569654789,29.71416918410572],[-95.8550569654789,29.705485289117092],[-95.86572429267552,29.705485289117092],[-95.87639161987215,29.705485289117092],[-95.87639161987215,29.71416918410572],[-95.87639161987215,29.722853079094342],[-95.86572429267552,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.705485289117092],[-95.8550569654789,29.71416918410572],[-95.8550569654789,29.722853079094342],[-95.84438963828227,29.722853079094342],[-95.83372231108564,29.722853079094342],[-95.83372231108564,29.71416918410572],[-95.83372231108564,29.705485289117092],[-95.84438963828227,29.705485289117092],[-95.8550569654789,29.705485289117092]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.688117499139835],[-95.8550569654789,29.696801394128464],[-95.8550569654789,29.705485289117092],[-95.84438963828227,29.705485289117092],[-95.83372231108564,29.705485289117092],[-95.83372231108564,29.696801394128464],[-95.83372231108564,29.688117499139835],[-95.84438963828227,29.688117499139835],[-95.8550569654789,29.688117499139835]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.688117499139835],[-95.87639161987215,29.696801394128464],[-95.87639161987215,29.705485289117092],[-95.86572429267552,29.705485289117092],[-95.8550569654789,29.705485289117092],[-95.8550569654789,29.696801394128464],[-95.8550569654789,29.688117499139835],[-95.86572429267552,29.688117499139835],[-95.87639161987215,29.688117499139835]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.688117499139835],[-95.89772627426541,29.696801394128464],[-95.89772627426541,29.705485289117092],[-95.88705894706878,29.705485289117092],[-95.87639161987215,29.705485289117092],[-95.87639161987215,29.696801394128464],[-95.87639161987215,29.688117499139835],[-95.88705894706878,29.688117499139835],[-95.89772627426541,29.688117499139835]]]}}]};

/***/ }),

/***/ "./src/scripts/square-grid-geojson-third.json":
/*!****************************************************!*\
  !*** ./src/scripts/square-grid-geojson-third.json ***!
  \****************************************************/
/*! exports provided: type, name, features, default */
/***/ (function(module) {

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.88923346904315,36.18378058869747],[-114.87856614184652,36.18378058869747],[-114.87856614184652,36.175096693708845],[-114.87856614184652,36.166412798720216],[-114.88923346904315,36.166412798720216],[-114.89990079623978,36.166412798720216],[-114.89990079623978,36.175096693708845],[-114.89990079623978,36.18378058869747],[-114.88923346904315,36.18378058869747]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.88923346904315,36.166412798720216],[-114.87856614184652,36.166412798720216],[-114.87856614184652,36.15772890373159],[-114.87856614184652,36.14904500874296],[-114.88923346904315,36.14904500874296],[-114.89990079623978,36.14904500874296],[-114.89990079623978,36.15772890373159],[-114.89990079623978,36.166412798720216],[-114.88923346904315,36.166412798720216]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.131677218765695],[-114.89990079623978,36.14036111375433],[-114.89990079623978,36.14904500874296],[-114.88923346904315,36.14904500874296],[-114.87856614184652,36.14904500874296],[-114.87856614184652,36.14036111375433],[-114.87856614184652,36.131677218765695],[-114.88923346904315,36.131677218765695],[-114.89990079623978,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.114309428788445],[-114.89990079623978,36.122993323777074],[-114.89990079623978,36.131677218765695],[-114.88923346904315,36.131677218765695],[-114.87856614184652,36.131677218765695],[-114.87856614184652,36.122993323777074],[-114.87856614184652,36.114309428788445],[-114.88923346904315,36.114309428788445],[-114.89990079623978,36.114309428788445]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.09694163881119],[-114.89990079623978,36.10562553379982],[-114.89990079623978,36.114309428788445],[-114.88923346904315,36.114309428788445],[-114.87856614184652,36.114309428788445],[-114.87856614184652,36.10562553379982],[-114.87856614184652,36.09694163881119],[-114.88923346904315,36.09694163881119],[-114.89990079623978,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.07957384883393],[-114.89990079623978,36.08825774382256],[-114.89990079623978,36.09694163881119],[-114.88923346904315,36.09694163881119],[-114.87856614184652,36.09694163881119],[-114.87856614184652,36.08825774382256],[-114.87856614184652,36.07957384883393],[-114.88923346904315,36.07957384883393],[-114.89990079623978,36.07957384883393]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.87856614184652,36.166412798720216],[-114.87856614184652,36.175096693708845],[-114.87856614184652,36.18378058869747],[-114.86789881464989,36.18378058869747],[-114.85723148745326,36.18378058869747],[-114.85723148745326,36.175096693708845],[-114.85723148745326,36.166412798720216],[-114.86789881464989,36.166412798720216],[-114.87856614184652,36.166412798720216]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.84656416025663,36.18378058869747],[-114.83589683306,36.18378058869747],[-114.83589683306,36.175096693708845],[-114.83589683306,36.166412798720216],[-114.84656416025663,36.166412798720216],[-114.85723148745326,36.166412798720216],[-114.85723148745326,36.175096693708845],[-114.85723148745326,36.18378058869747],[-114.84656416025663,36.18378058869747]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.166412798720216],[-114.83589683306,36.175096693708845],[-114.83589683306,36.18378058869747],[-114.82522950586338,36.18378058869747],[-114.81456217866675,36.18378058869747],[-114.81456217866675,36.175096693708845],[-114.81456217866675,36.166412798720216],[-114.82522950586338,36.166412798720216],[-114.83589683306,36.166412798720216]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.166412798720216],[-114.81456217866675,36.175096693708845],[-114.81456217866675,36.18378058869747],[-114.80389485147012,36.18378058869747],[-114.79322752427349,36.18378058869747],[-114.79322752427349,36.175096693708845],[-114.79322752427349,36.166412798720216],[-114.80389485147012,36.166412798720216],[-114.81456217866675,36.166412798720216]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.78256019707686,36.18378058869747],[-114.77189286988023,36.18378058869747],[-114.77189286988023,36.175096693708845],[-114.77189286988023,36.166412798720216],[-114.78256019707686,36.166412798720216],[-114.79322752427349,36.166412798720216],[-114.79322752427349,36.175096693708845],[-114.79322752427349,36.18378058869747],[-114.78256019707686,36.18378058869747]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.77189286988023,36.166412798720216],[-114.77189286988023,36.175096693708845],[-114.77189286988023,36.18378058869747],[-114.7612255426836,36.18378058869747],[-114.75055821548698,36.18378058869747],[-114.75055821548698,36.175096693708845],[-114.75055821548698,36.166412798720216],[-114.7612255426836,36.166412798720216],[-114.77189286988023,36.166412798720216]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.77189286988023,36.14904500874296],[-114.77189286988023,36.15772890373159],[-114.77189286988023,36.166412798720216],[-114.7612255426836,36.166412798720216],[-114.75055821548698,36.166412798720216],[-114.75055821548698,36.15772890373159],[-114.75055821548698,36.14904500874296],[-114.7612255426836,36.14904500874296],[-114.77189286988023,36.14904500874296]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.14904500874296],[-114.75055821548698,36.14904500874296],[-114.75055821548698,36.14036111375433],[-114.75055821548698,36.131677218765695],[-114.7612255426836,36.131677218765695],[-114.77189286988023,36.131677218765695],[-114.77189286988023,36.14036111375433],[-114.77189286988023,36.14904500874296],[-114.7612255426836,36.14904500874296]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.131677218765695],[-114.75055821548698,36.131677218765695],[-114.75055821548698,36.122993323777074],[-114.75055821548698,36.114309428788445],[-114.7612255426836,36.114309428788445],[-114.77189286988023,36.114309428788445],[-114.77189286988023,36.122993323777074],[-114.77189286988023,36.131677218765695],[-114.7612255426836,36.131677218765695]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.114309428788445],[-114.75055821548698,36.114309428788445],[-114.75055821548698,36.10562553379982],[-114.75055821548698,36.09694163881119],[-114.7612255426836,36.09694163881119],[-114.77189286988023,36.09694163881119],[-114.77189286988023,36.10562553379982],[-114.77189286988023,36.114309428788445],[-114.7612255426836,36.114309428788445]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.09694163881119],[-114.75055821548698,36.09694163881119],[-114.75055821548698,36.08825774382256],[-114.75055821548698,36.07957384883393],[-114.7612255426836,36.07957384883393],[-114.77189286988023,36.07957384883393],[-114.77189286988023,36.08825774382256],[-114.77189286988023,36.09694163881119],[-114.7612255426836,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.86789881464989,36.09694163881119],[-114.85723148745326,36.09694163881119],[-114.85723148745326,36.08825774382256],[-114.85723148745326,36.07957384883393],[-114.86789881464989,36.07957384883393],[-114.87856614184652,36.07957384883393],[-114.87856614184652,36.08825774382256],[-114.87856614184652,36.09694163881119],[-114.86789881464989,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.07957384883393],[-114.85723148745326,36.08825774382256],[-114.85723148745326,36.09694163881119],[-114.84656416025663,36.09694163881119],[-114.83589683306,36.09694163881119],[-114.83589683306,36.08825774382256],[-114.83589683306,36.07957384883393],[-114.84656416025663,36.07957384883393],[-114.85723148745326,36.07957384883393]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.07957384883393],[-114.83589683306,36.08825774382256],[-114.83589683306,36.09694163881119],[-114.82522950586338,36.09694163881119],[-114.81456217866675,36.09694163881119],[-114.81456217866675,36.08825774382256],[-114.81456217866675,36.07957384883393],[-114.82522950586338,36.07957384883393],[-114.83589683306,36.07957384883393]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.80389485147012,36.09694163881119],[-114.79322752427349,36.09694163881119],[-114.79322752427349,36.08825774382256],[-114.79322752427349,36.07957384883393],[-114.80389485147012,36.07957384883393],[-114.81456217866675,36.07957384883393],[-114.81456217866675,36.08825774382256],[-114.81456217866675,36.09694163881119],[-114.80389485147012,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.07957384883393],[-114.79322752427349,36.08825774382256],[-114.79322752427349,36.09694163881119],[-114.78256019707686,36.09694163881119],[-114.77189286988023,36.09694163881119],[-114.77189286988023,36.08825774382256],[-114.77189286988023,36.07957384883393],[-114.78256019707686,36.07957384883393],[-114.79322752427349,36.07957384883393]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.87856614184652,36.14904500874296],[-114.87856614184652,36.15772890373159],[-114.87856614184652,36.166412798720216],[-114.86789881464989,36.166412798720216],[-114.85723148745326,36.166412798720216],[-114.85723148745326,36.15772890373159],[-114.85723148745326,36.14904500874296],[-114.86789881464989,36.14904500874296],[-114.87856614184652,36.14904500874296]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.09694163881119],[-114.79322752427349,36.10562553379982],[-114.79322752427349,36.114309428788445],[-114.78256019707686,36.114309428788445],[-114.77189286988023,36.114309428788445],[-114.77189286988023,36.10562553379982],[-114.77189286988023,36.09694163881119],[-114.78256019707686,36.09694163881119],[-114.79322752427349,36.09694163881119]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.15772890373159],[-114.79322752427349,36.166412798720216],[-114.78256019707686,36.166412798720216],[-114.77189286988023,36.166412798720216],[-114.77189286988023,36.15772890373159],[-114.77189286988023,36.14904500874296],[-114.78256019707686,36.14904500874296],[-114.79322752427349,36.14904500874296],[-114.79322752427349,36.15772890373159]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.86789881464989,36.114309428788445],[-114.85723148745326,36.114309428788445],[-114.85723148745326,36.10562553379982],[-114.85723148745326,36.09694163881119],[-114.86789881464989,36.09694163881119],[-114.87856614184652,36.09694163881119],[-114.87856614184652,36.10562553379982],[-114.87856614184652,36.114309428788445],[-114.86789881464989,36.114309428788445]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.87856614184652,36.131677218765695],[-114.87856614184652,36.14036111375433],[-114.87856614184652,36.14904500874296],[-114.86789881464989,36.14904500874296],[-114.85723148745326,36.14904500874296],[-114.85723148745326,36.14036111375433],[-114.85723148745326,36.131677218765695],[-114.86789881464989,36.131677218765695],[-114.87856614184652,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.86789881464989,36.131677218765695],[-114.85723148745326,36.131677218765695],[-114.85723148745326,36.122993323777074],[-114.85723148745326,36.114309428788445],[-114.86789881464989,36.114309428788445],[-114.87856614184652,36.114309428788445],[-114.87856614184652,36.122993323777074],[-114.87856614184652,36.131677218765695],[-114.86789881464989,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.122993323777074],[-114.79322752427349,36.131677218765695],[-114.78256019707686,36.131677218765695],[-114.77189286988023,36.131677218765695],[-114.77189286988023,36.122993323777074],[-114.77189286988023,36.114309428788445],[-114.78256019707686,36.114309428788445],[-114.79322752427349,36.114309428788445],[-114.79322752427349,36.122993323777074]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.78256019707686,36.14904500874296],[-114.77189286988023,36.14904500874296],[-114.77189286988023,36.14036111375433],[-114.77189286988023,36.131677218765695],[-114.78256019707686,36.131677218765695],[-114.79322752427349,36.131677218765695],[-114.79322752427349,36.14036111375433],[-114.79322752427349,36.14904500874296],[-114.78256019707686,36.14904500874296]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.14904500874296],[-114.81456217866675,36.15772890373159],[-114.81456217866675,36.166412798720216],[-114.80389485147012,36.166412798720216],[-114.79322752427349,36.166412798720216],[-114.79322752427349,36.15772890373159],[-114.79322752427349,36.14904500874296],[-114.80389485147012,36.14904500874296],[-114.81456217866675,36.14904500874296]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.14904500874296],[-114.83589683306,36.15772890373159],[-114.83589683306,36.166412798720216],[-114.82522950586338,36.166412798720216],[-114.81456217866675,36.166412798720216],[-114.81456217866675,36.15772890373159],[-114.81456217866675,36.14904500874296],[-114.82522950586338,36.14904500874296],[-114.83589683306,36.14904500874296]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.15772890373159],[-114.85723148745326,36.166412798720216],[-114.84656416025663,36.166412798720216],[-114.83589683306,36.166412798720216],[-114.83589683306,36.15772890373159],[-114.83589683306,36.14904500874296],[-114.84656416025663,36.14904500874296],[-114.85723148745326,36.14904500874296],[-114.85723148745326,36.15772890373159]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.131677218765695],[-114.85723148745326,36.14036111375433],[-114.85723148745326,36.14904500874296],[-114.84656416025663,36.14904500874296],[-114.83589683306,36.14904500874296],[-114.83589683306,36.14036111375433],[-114.83589683306,36.131677218765695],[-114.84656416025663,36.131677218765695],[-114.85723148745326,36.131677218765695]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.82522950586338,36.14904500874296],[-114.81456217866675,36.14904500874296],[-114.81456217866675,36.14036111375433],[-114.81456217866675,36.131677218765695],[-114.82522950586338,36.131677218765695],[-114.83589683306,36.131677218765695],[-114.83589683306,36.14036111375433],[-114.83589683306,36.14904500874296],[-114.82522950586338,36.14904500874296]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.131677218765695],[-114.81456217866675,36.14036111375433],[-114.81456217866675,36.14904500874296],[-114.80389485147012,36.14904500874296],[-114.79322752427349,36.14904500874296],[-114.79322752427349,36.14036111375433],[-114.79322752427349,36.131677218765695],[-114.80389485147012,36.131677218765695],[-114.81456217866675,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.114309428788445],[-114.85723148745326,36.122993323777074],[-114.85723148745326,36.131677218765695],[-114.84656416025663,36.131677218765695],[-114.83589683306,36.131677218765695],[-114.83589683306,36.122993323777074],[-114.83589683306,36.114309428788445],[-114.84656416025663,36.114309428788445],[-114.85723148745326,36.114309428788445]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.82522950586338,36.131677218765695],[-114.81456217866675,36.131677218765695],[-114.81456217866675,36.122993323777074],[-114.81456217866675,36.114309428788445],[-114.82522950586338,36.114309428788445],[-114.83589683306,36.114309428788445],[-114.83589683306,36.122993323777074],[-114.83589683306,36.131677218765695],[-114.82522950586338,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.114309428788445],[-114.81456217866675,36.122993323777074],[-114.81456217866675,36.131677218765695],[-114.80389485147012,36.131677218765695],[-114.79322752427349,36.131677218765695],[-114.79322752427349,36.122993323777074],[-114.79322752427349,36.114309428788445],[-114.80389485147012,36.114309428788445],[-114.81456217866675,36.114309428788445]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.09694163881119],[-114.81456217866675,36.10562553379982],[-114.81456217866675,36.114309428788445],[-114.80389485147012,36.114309428788445],[-114.79322752427349,36.114309428788445],[-114.79322752427349,36.10562553379982],[-114.79322752427349,36.09694163881119],[-114.80389485147012,36.09694163881119],[-114.81456217866675,36.09694163881119]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.09694163881119],[-114.83589683306,36.10562553379982],[-114.83589683306,36.114309428788445],[-114.82522950586338,36.114309428788445],[-114.81456217866675,36.114309428788445],[-114.81456217866675,36.10562553379982],[-114.81456217866675,36.09694163881119],[-114.82522950586338,36.09694163881119],[-114.83589683306,36.09694163881119]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.09694163881119],[-114.85723148745326,36.10562553379982],[-114.85723148745326,36.114309428788445],[-114.84656416025663,36.114309428788445],[-114.83589683306,36.114309428788445],[-114.83589683306,36.10562553379982],[-114.83589683306,36.09694163881119],[-114.84656416025663,36.09694163881119],[-114.85723148745326,36.09694163881119]]]}}]};

/***/ }),

/***/ "./src/scripts/square-grid-geojson.json":
/*!**********************************************!*\
  !*** ./src/scripts/square-grid-geojson.json ***!
  \**********************************************/
/*! exports provided: type, name, features, default */
/***/ (function(module) {

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.63683762677812,35.61210336993178],[-82.62617029958149,35.61210336993178],[-82.62617029958149,35.60341947494315],[-82.62617029958149,35.59473557995452],[-82.63683762677812,35.59473557995452],[-82.64750495397475,35.59473557995452],[-82.64750495397475,35.60341947494315],[-82.64750495397475,35.61210336993178],[-82.63683762677812,35.61210336993178]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.63683762677812,35.59473557995452],[-82.62617029958149,35.59473557995452],[-82.62617029958149,35.586051684965895],[-82.62617029958149,35.57736778997727],[-82.63683762677812,35.57736778997727],[-82.64750495397475,35.57736778997727],[-82.64750495397475,35.586051684965895],[-82.64750495397475,35.59473557995452],[-82.63683762677812,35.59473557995452]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.56],[-82.64750495397475,35.56868389498864],[-82.64750495397475,35.57736778997727],[-82.63683762677812,35.57736778997727],[-82.62617029958149,35.57736778997727],[-82.62617029958149,35.56868389498864],[-82.62617029958149,35.56],[-82.63683762677812,35.56],[-82.64750495397475,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.54263221002275],[-82.64750495397475,35.55131610501138],[-82.64750495397475,35.56],[-82.63683762677812,35.56],[-82.62617029958149,35.56],[-82.62617029958149,35.55131610501138],[-82.62617029958149,35.54263221002275],[-82.63683762677812,35.54263221002275],[-82.64750495397475,35.54263221002275]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.525264420045495],[-82.64750495397475,35.533948315034124],[-82.64750495397475,35.54263221002275],[-82.63683762677812,35.54263221002275],[-82.62617029958149,35.54263221002275],[-82.62617029958149,35.533948315034124],[-82.62617029958149,35.525264420045495],[-82.63683762677812,35.525264420045495],[-82.64750495397475,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.50789663006824],[-82.64750495397475,35.51658052505687],[-82.64750495397475,35.525264420045495],[-82.63683762677812,35.525264420045495],[-82.62617029958149,35.525264420045495],[-82.62617029958149,35.51658052505687],[-82.62617029958149,35.50789663006824],[-82.63683762677812,35.50789663006824],[-82.64750495397475,35.50789663006824]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.59473557995452],[-82.62617029958149,35.60341947494315],[-82.62617029958149,35.61210336993178],[-82.61550297238486,35.61210336993178],[-82.60483564518823,35.61210336993178],[-82.60483564518823,35.60341947494315],[-82.60483564518823,35.59473557995452],[-82.61550297238486,35.59473557995452],[-82.62617029958149,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.5941683179916,35.61210336993178],[-82.58350099079497,35.61210336993178],[-82.58350099079497,35.60341947494315],[-82.58350099079497,35.59473557995452],[-82.5941683179916,35.59473557995452],[-82.60483564518823,35.59473557995452],[-82.60483564518823,35.60341947494315],[-82.60483564518823,35.61210336993178],[-82.5941683179916,35.61210336993178]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.59473557995452],[-82.58350099079497,35.60341947494315],[-82.58350099079497,35.61210336993178],[-82.57283366359835,35.61210336993178],[-82.56216633640172,35.61210336993178],[-82.56216633640172,35.60341947494315],[-82.56216633640172,35.59473557995452],[-82.57283366359835,35.59473557995452],[-82.58350099079497,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.59473557995452],[-82.56216633640172,35.60341947494315],[-82.56216633640172,35.61210336993178],[-82.55149900920509,35.61210336993178],[-82.54083168200846,35.61210336993178],[-82.54083168200846,35.60341947494315],[-82.54083168200846,35.59473557995452],[-82.55149900920509,35.59473557995452],[-82.56216633640172,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.53016435481183,35.61210336993178],[-82.5194970276152,35.61210336993178],[-82.5194970276152,35.60341947494315],[-82.5194970276152,35.59473557995452],[-82.53016435481183,35.59473557995452],[-82.54083168200846,35.59473557995452],[-82.54083168200846,35.60341947494315],[-82.54083168200846,35.61210336993178],[-82.53016435481183,35.61210336993178]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.5194970276152,35.59473557995452],[-82.5194970276152,35.60341947494315],[-82.5194970276152,35.61210336993178],[-82.50882970041857,35.61210336993178],[-82.49816237322194,35.61210336993178],[-82.49816237322194,35.60341947494315],[-82.49816237322194,35.59473557995452],[-82.50882970041857,35.59473557995452],[-82.5194970276152,35.59473557995452]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.5194970276152,35.57736778997727],[-82.5194970276152,35.586051684965895],[-82.5194970276152,35.59473557995452],[-82.50882970041857,35.59473557995452],[-82.49816237322194,35.59473557995452],[-82.49816237322194,35.586051684965895],[-82.49816237322194,35.57736778997727],[-82.50882970041857,35.57736778997727],[-82.5194970276152,35.57736778997727]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.57736778997727],[-82.49816237322194,35.57736778997727],[-82.49816237322194,35.56868389498864],[-82.49816237322194,35.56],[-82.50882970041857,35.56],[-82.5194970276152,35.56],[-82.5194970276152,35.56868389498864],[-82.5194970276152,35.57736778997727],[-82.50882970041857,35.57736778997727]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.56],[-82.49816237322194,35.56],[-82.49816237322194,35.55131610501138],[-82.49816237322194,35.54263221002275],[-82.50882970041857,35.54263221002275],[-82.5194970276152,35.54263221002275],[-82.5194970276152,35.55131610501138],[-82.5194970276152,35.56],[-82.50882970041857,35.56]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.54263221002275],[-82.49816237322194,35.54263221002275],[-82.49816237322194,35.533948315034124],[-82.49816237322194,35.525264420045495],[-82.50882970041857,35.525264420045495],[-82.5194970276152,35.525264420045495],[-82.5194970276152,35.533948315034124],[-82.5194970276152,35.54263221002275],[-82.50882970041857,35.54263221002275]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.525264420045495],[-82.49816237322194,35.525264420045495],[-82.49816237322194,35.51658052505687],[-82.49816237322194,35.50789663006824],[-82.50882970041857,35.50789663006824],[-82.5194970276152,35.50789663006824],[-82.5194970276152,35.51658052505687],[-82.5194970276152,35.525264420045495],[-82.50882970041857,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.525264420045495],[-82.60483564518823,35.525264420045495],[-82.60483564518823,35.51658052505687],[-82.60483564518823,35.50789663006824],[-82.61550297238486,35.50789663006824],[-82.62617029958149,35.50789663006824],[-82.62617029958149,35.51658052505687],[-82.62617029958149,35.525264420045495],[-82.61550297238486,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.50789663006824],[-82.60483564518823,35.51658052505687],[-82.60483564518823,35.525264420045495],[-82.5941683179916,35.525264420045495],[-82.58350099079497,35.525264420045495],[-82.58350099079497,35.51658052505687],[-82.58350099079497,35.50789663006824],[-82.5941683179916,35.50789663006824],[-82.60483564518823,35.50789663006824]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.50789663006824],[-82.58350099079497,35.51658052505687],[-82.58350099079497,35.525264420045495],[-82.57283366359835,35.525264420045495],[-82.56216633640172,35.525264420045495],[-82.56216633640172,35.51658052505687],[-82.56216633640172,35.50789663006824],[-82.57283366359835,35.50789663006824],[-82.58350099079497,35.50789663006824]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.55149900920509,35.525264420045495],[-82.54083168200846,35.525264420045495],[-82.54083168200846,35.51658052505687],[-82.54083168200846,35.50789663006824],[-82.55149900920509,35.50789663006824],[-82.56216633640172,35.50789663006824],[-82.56216633640172,35.51658052505687],[-82.56216633640172,35.525264420045495],[-82.55149900920509,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.50789663006824],[-82.54083168200846,35.51658052505687],[-82.54083168200846,35.525264420045495],[-82.53016435481183,35.525264420045495],[-82.5194970276152,35.525264420045495],[-82.5194970276152,35.51658052505687],[-82.5194970276152,35.50789663006824],[-82.53016435481183,35.50789663006824],[-82.54083168200846,35.50789663006824]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.57736778997727],[-82.62617029958149,35.586051684965895],[-82.62617029958149,35.59473557995452],[-82.61550297238486,35.59473557995452],[-82.60483564518823,35.59473557995452],[-82.60483564518823,35.586051684965895],[-82.60483564518823,35.57736778997727],[-82.61550297238486,35.57736778997727],[-82.62617029958149,35.57736778997727]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.525264420045495],[-82.54083168200846,35.533948315034124],[-82.54083168200846,35.54263221002275],[-82.53016435481183,35.54263221002275],[-82.5194970276152,35.54263221002275],[-82.5194970276152,35.533948315034124],[-82.5194970276152,35.525264420045495],[-82.53016435481183,35.525264420045495],[-82.54083168200846,35.525264420045495]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.586051684965895],[-82.54083168200846,35.59473557995452],[-82.53016435481183,35.59473557995452],[-82.5194970276152,35.59473557995452],[-82.5194970276152,35.586051684965895],[-82.5194970276152,35.57736778997727],[-82.53016435481183,35.57736778997727],[-82.54083168200846,35.57736778997727],[-82.54083168200846,35.586051684965895]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.54263221002275],[-82.60483564518823,35.54263221002275],[-82.60483564518823,35.533948315034124],[-82.60483564518823,35.525264420045495],[-82.61550297238486,35.525264420045495],[-82.62617029958149,35.525264420045495],[-82.62617029958149,35.533948315034124],[-82.62617029958149,35.54263221002275],[-82.61550297238486,35.54263221002275]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.56],[-82.62617029958149,35.56868389498864],[-82.62617029958149,35.57736778997727],[-82.61550297238486,35.57736778997727],[-82.60483564518823,35.57736778997727],[-82.60483564518823,35.56868389498864],[-82.60483564518823,35.56],[-82.61550297238486,35.56],[-82.62617029958149,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.56],[-82.60483564518823,35.56],[-82.60483564518823,35.55131610501138],[-82.60483564518823,35.54263221002275],[-82.61550297238486,35.54263221002275],[-82.62617029958149,35.54263221002275],[-82.62617029958149,35.55131610501138],[-82.62617029958149,35.56],[-82.61550297238486,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.55131610501138],[-82.54083168200846,35.56],[-82.53016435481183,35.56],[-82.5194970276152,35.56],[-82.5194970276152,35.55131610501138],[-82.5194970276152,35.54263221002275],[-82.53016435481183,35.54263221002275],[-82.54083168200846,35.54263221002275],[-82.54083168200846,35.55131610501138]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.53016435481183,35.57736778997727],[-82.5194970276152,35.57736778997727],[-82.5194970276152,35.56868389498864],[-82.5194970276152,35.56],[-82.53016435481183,35.56],[-82.54083168200846,35.56],[-82.54083168200846,35.56868389498864],[-82.54083168200846,35.57736778997727],[-82.53016435481183,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.57736778997727],[-82.56216633640172,35.586051684965895],[-82.56216633640172,35.59473557995452],[-82.55149900920509,35.59473557995452],[-82.54083168200846,35.59473557995452],[-82.54083168200846,35.586051684965895],[-82.54083168200846,35.57736778997727],[-82.55149900920509,35.57736778997727],[-82.56216633640172,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.57736778997727],[-82.58350099079497,35.586051684965895],[-82.58350099079497,35.59473557995452],[-82.57283366359835,35.59473557995452],[-82.56216633640172,35.59473557995452],[-82.56216633640172,35.586051684965895],[-82.56216633640172,35.57736778997727],[-82.57283366359835,35.57736778997727],[-82.58350099079497,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.586051684965895],[-82.60483564518823,35.59473557995452],[-82.5941683179916,35.59473557995452],[-82.58350099079497,35.59473557995452],[-82.58350099079497,35.586051684965895],[-82.58350099079497,35.57736778997727],[-82.5941683179916,35.57736778997727],[-82.60483564518823,35.57736778997727],[-82.60483564518823,35.586051684965895]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.56],[-82.60483564518823,35.56868389498864],[-82.60483564518823,35.57736778997727],[-82.5941683179916,35.57736778997727],[-82.58350099079497,35.57736778997727],[-82.58350099079497,35.56868389498864],[-82.58350099079497,35.56],[-82.5941683179916,35.56],[-82.60483564518823,35.56]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.57283366359835,35.57736778997727],[-82.56216633640172,35.57736778997727],[-82.56216633640172,35.56868389498864],[-82.56216633640172,35.56],[-82.57283366359835,35.56],[-82.58350099079497,35.56],[-82.58350099079497,35.56868389498864],[-82.58350099079497,35.57736778997727],[-82.57283366359835,35.57736778997727]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.56],[-82.56216633640172,35.56868389498864],[-82.56216633640172,35.57736778997727],[-82.55149900920509,35.57736778997727],[-82.54083168200846,35.57736778997727],[-82.54083168200846,35.56868389498864],[-82.54083168200846,35.56],[-82.55149900920509,35.56],[-82.56216633640172,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.54263221002275],[-82.60483564518823,35.55131610501138],[-82.60483564518823,35.56],[-82.5941683179916,35.56],[-82.58350099079497,35.56],[-82.58350099079497,35.55131610501138],[-82.58350099079497,35.54263221002275],[-82.5941683179916,35.54263221002275],[-82.60483564518823,35.54263221002275]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.57283366359835,35.56],[-82.56216633640172,35.56],[-82.56216633640172,35.55131610501138],[-82.56216633640172,35.54263221002275],[-82.57283366359835,35.54263221002275],[-82.58350099079497,35.54263221002275],[-82.58350099079497,35.55131610501138],[-82.58350099079497,35.56],[-82.57283366359835,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.54263221002275],[-82.56216633640172,35.55131610501138],[-82.56216633640172,35.56],[-82.55149900920509,35.56],[-82.54083168200846,35.56],[-82.54083168200846,35.55131610501138],[-82.54083168200846,35.54263221002275],[-82.55149900920509,35.54263221002275],[-82.56216633640172,35.54263221002275]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.525264420045495],[-82.56216633640172,35.533948315034124],[-82.56216633640172,35.54263221002275],[-82.55149900920509,35.54263221002275],[-82.54083168200846,35.54263221002275],[-82.54083168200846,35.533948315034124],[-82.54083168200846,35.525264420045495],[-82.55149900920509,35.525264420045495],[-82.56216633640172,35.525264420045495]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.525264420045495],[-82.58350099079497,35.533948315034124],[-82.58350099079497,35.54263221002275],[-82.57283366359835,35.54263221002275],[-82.56216633640172,35.54263221002275],[-82.56216633640172,35.533948315034124],[-82.56216633640172,35.525264420045495],[-82.57283366359835,35.525264420045495],[-82.58350099079497,35.525264420045495]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.525264420045495],[-82.60483564518823,35.533948315034124],[-82.60483564518823,35.54263221002275],[-82.5941683179916,35.54263221002275],[-82.58350099079497,35.54263221002275],[-82.58350099079497,35.533948315034124],[-82.58350099079497,35.525264420045495],[-82.5941683179916,35.525264420045495],[-82.60483564518823,35.525264420045495]]]}}]};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0yLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWFwLWNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yZWNvcmQtc3R1ZHktZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbInJlY29yZFN0dWR5RGF0YSIsIlJlY29yZFN0dWR5RGF0YSIsInN0b3JlIiwiU3RvcmUiLCJ1dGlsaXR5IiwiVXRpbGl0eSIsIkhhbmRsZXJzIiwiZGlzcGxheU5vbmVDbGFzcyIsInNlbGVjdGVkQ2xhc3MiLCJzdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCIsInN0dWR5QWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlIiwic3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNBZGQiLCJzdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSIsInN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZCIsInN0dWR5UXVlc3Rpb24iLCJnZXRTdGF0ZUl0ZW0iLCJzdHVkeVF1ZXN0aW9uRWxlbWVudHNSZW1vdmUiLCJzdHVkeVNVU0VsZW1lbnRzQWRkIiwic3R1ZHlTVVNFbGVtZW50c1JlbW92ZSIsInN1c1N0b3JhZ2VLZXlzIiwiZWxlbWVudElEIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZvckVhY2giLCJlbGVtZW50VUlJRCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImNvbnRhaW5zIiwiYWRkIiwiZ3JpZE5hbWUiLCJncmlkSXRlcmF0aW9ucyIsInNldEFQSUZvckdyb3VwIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInBhZ2UiLCJzZXRTdGF0ZUl0ZW0iLCJhbmltYXRlIiwic3VzVmFsdWVBcnJheSIsImtleSIsInF1ZXN0aW9uQW5zd2VyIiwicHVzaCIsImRhdGVzdGFtcCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInRyaWdnZXJFdmVudCIsInJlY29yZEFnZ3JlZWQiLCJzdG9yYWdlIiwid2luZG93IiwicmVtb3ZlSXRlbSIsInN0dWR5VmVyc2lvbiIsImFncmVlbWVudFRpbWVTdGFtcCIsInJlY29yZERpc2FnZ3JlZWQiLCJwYXJlbnRCdG5Hcm91cCIsInRhcmdldCIsImlkIiwicGFyZW50RWxlbWVudCIsInRvZ2dsZUJ1dHRvbkdyb3VwQnV0dHRvbnNPZmYiLCJxdWVzdGlvblRleHQiLCJyZXBsYWNlIiwiTnVtYmVyIiwiaW5uZXJUZXh0IiwidXVpZFJlYyIsInN0dWR5U3RhcnRlZFJlYyIsInN0dWR5U3RhcnRlZFRpbWVSZWMiLCJzdHVkeUFncmVlbWVudFJlYyIsInN0dWR5QWdyZWVtZW50VGltZVJlYyIsImNhbXBhaWduUmVjIiwibW9iaWxlUmVjIiwibWFwVmVyc2lvblJlYyIsInN0dWR5UXVlc3Rpb25SZWMiLCJzdXNhbnN3ZXJzU3VibWl0ZWRSZWMiLCJncmlkU3VibWl0ZWRSZWMiLCJzdXNhbnN3ZXJzUmVjIiwiZ3JpZGFuc3dlcnNSZWMiLCJncmlkY29ycmVjdFJlYyIsInN0dWR5Q29tcGxldGVkUmVjIiwiZ3JpZGNvcnJlY3RSZWNQcm9wcyIsImZlYXR1cmVzIiwidmFsIiwicHJvcGVydGllcyIsInZhbHVlIiwidiIsImpzb25EYXRhIiwidXVpZCIsInN0dWR5X3N0YXJ0ZWQiLCJzdHVkeV9zdGFydGVkX3RpbWUiLCJzdHVkeV9hZ3JlZW1lbnQiLCJzdXNhbnN3ZXJzX3N1Ym1pdGVkIiwiZ3JpZF9zdWJtaXRlZCIsInN0dWR5X2FncmVlbWVudF90aW1lIiwiY2FtcGFpZ24iLCJKU09OIiwic3RyaW5naWZ5IiwibW9iaWxlIiwibWFwX3ZlcnNpb24iLCJncmlkX2NvcnJlY3QiLCJncmlkX2Fuc3dlcnMiLCJncmlkYW5zd2Vyc190aW1lIiwic3R1ZHlfcXVlc3Rpb24iLCJzdXNfYW5zd2VycyIsInN1c2Fuc3dlcnNfdGltZSIsInN0dWR5X2NvbXBsZXRlZCIsInNldEV2ZW50QWxsIiwic3VzYW5zd2Vyc0RhdGVSZWMiLCJncmlkYW5zd2Vyc0RhdGVSZWMiLCJidG5Hcm91cCIsImNoaWxkcmVuIiwiY2hpbGROb2RlcyIsImNoZWNrVmFsaWRPYmplY3QiLCJsZW5ndGgiLCJjaGlsZHJlbkFycmF5IiwiY2hpbGRJdGVtIiwiVVJMUGF0aCIsImxvY2F0aW9uIiwiaGFzaCIsInN0dWR5TWluT25lIiwic3R1ZHlNYXhPbmUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtYXBWZXJzaW9uIiwibWFwTWluT25lIiwibWFwTWF4T25lIiwidG9TdHJpbmciLCJsaWJyYXJ5IiwiZmFzIiwiZmFyIiwiZG9tIiwid2F0Y2giLCJtYXBCb3hDb25maWciLCJNYXBCb3hDb25maWciLCJoYW5kbGVycyIsImxvYWRIVE1MQmxvY2siLCJibG9ja1N0dWR5QWdncmVlbWVudCIsImJsb2NrU3R1ZHlEaXNzYWdncmVlIiwiYmxvY2tTdHVkeVNVUyIsImJsb2NrU3R1ZHlDb21wbGV0ZWQiLCJtYXAxIiwibWFwMmEiLCJtYXAyYiIsIm1hcDNBcnIiLCJtYXBkZWYiLCJibG9ja1N0dWR5UXVlc3Rpb24xIiwibWFrZUFuaW1hdGVNYXAiLCJibG9ja1N0dWR5UXVlc3Rpb24yIiwibWFrZU1hcCIsInN5bmNNYXBzIiwiYmxvY2tTdHVkeVF1ZXN0aW9uMyIsIm1ha2VDb21wYXJlTWFwIiwibWFwRW5kYSIsIm1hcEVuZGIiLCJyZXNpemVBbGxNYXBzIiwicmVzaXplIiwic2V0Wm9vbSIsInVybFN0cmluZyIsImhyZWYiLCJ1cmwiLCJVUkwiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJpc01vYmlsZURldmljZSIsImFnZ3JlbWVudENoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlckFncmVlQ2xpY2siLCJkaXNhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cyIsImFkZEhhbmRsZXJEaXNhZ3JlZUNsaWNrIiwic3VibWl0Q2hhbmdlRWxlbWVudHMiLCJhZGRIYW5kbGVyU3VibWl0Q2hhbmdlQ2xpY2siLCJzdXNDaGFuZ2VFbGVtZW50cyIsImFkZEhhbmRsZXJTdWJtaXRTVVNDbGljayIsImFkZEhhbmRsZXJQbGF5Q2xpY2siLCJhZGRIYW5kbGVyUGF1c2VDbGljayIsImFkZEhhbmRsZXJMYXllcnNPZmZDbGljayIsImN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTiIsImdldFNvdXJjZSIsInNldERhdGEiLCJzdXNCdG5Hcm91cEVsZW1lbnRzIiwiYWRkSGFuZGxlclNVU1F1ZXN0aW9uQ2xpY2siLCJpbWFnZXJ5RGlyZWN0aW9uc0VsZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImVsZW0iLCJzZXRBdHRyaWJ1dGUiLCJzdXNOYW1lIiwic3VzSXRlcmF0aW9ucyIsInNldFN0YXRlRm9yR3JvdXAiLCJzZXREb21TdGF0ZUZvckdyb3VwIiwiaXNTdHVkeWNvbXBsZXRlZCIsInN0dWR5Q29tcGxldGVkIiwiU3R1ZHlBZ3JyZWVtZW50Iiwic3R1ZHlBZ3JyZWVkIiwiZ3JpZFN1Ym1pdGVkU3RhdGUiLCJncmlkU3VibWl0ZWQiLCJzdXNTdWJtaXRlZFN0YXRlIiwic3VzU3VibWl0ZWQiLCJhZ2dyZW1lbnRFbGVtZW50IiwiZGlhZ2dyZWVFbGVtZW50IiwiZ3JpZFN1Ym1pdEVsZW1lbnQiLCJjb21wbGV0ZWRTdWJtaXRFbGVtZW50IiwiY2xpY2siLCJldmVudCIsInJlbG9hZCIsInN5bmNNb3ZlIiwicmVxdWlyZSIsImJ1ZmZEaXN0IiwiYnVmZlVuaXRzIiwidW5pdHMiLCJpa0JveCIsIlNxdWFyZUdyaWRHZW9KU09OT25lIiwiaHN0bkJveCIsIlNxdWFyZUdyaWRHZW9KU09OU2Vjb25kIiwibHZCb3giLCJTcXVhcmVHcmlkR2VvSlNPTlRoaXJkIiwiaWtNYXhCb3giLCJoc3RuTWF4Qm94IiwibHZNYXhCb3giLCJzcXVhcmVHcmlkR2VvSlNPTiIsImRlZmF1bHRNYXBTdHlsZSIsImRlZmF1bHRNYXBDZW50ZXIiLCJkZWZhdWx0TWF4Qm91bmRzIiwiZGVmYXVsdE1hcFpvb20iLCJkZWZhdWx0TWFwQ29udGFpbmVyIiwiZGFya01hcFN0eWxlIiwibGlnaHRNYXBTdHlsZSIsIm1hcGJveGdsIiwiTWFwYm94Q29tcGFyZSIsImFjY2Vzc1Rva2VuIiwicXVpZXQiLCJtYXAyIiwiZGVmYXVsdEdyZXlCb3giLCJzZWxlY3RlZEJveCIsIm1hcENoYW5nZUxheWVycyIsImxheWVycyIsIm1pbnpvb20iLCJtYXh6b29tIiwic2NoZW1lIiwidGlsZVNpemUiLCJib3VuZHMiLCJtYXhib3VuZHMiLCJtYXBDaGFuZ2VMYXllcnNPbmUiLCJtYXBDb250YWluZXIiLCJtYXBJbmRleCIsImVuZCIsImVuYWJsZWNsaWNrIiwibWFwU2V0dXAiLCJtYXBJbmRleEJvdW5kcyIsIm1hcCIsIk1hcCIsImNvbnRhaW5lciIsInN0eWxlIiwiem9vbSIsInNob3dab29tIiwidG91Y2hFbmFibGVkIiwia2V5YmluZGluZ3MiLCJtYXhCb3VuZHMiLCJvbiIsImZpdE15Qm91bmRzIiwiYWRkTGF5ZXIiLCJtYWtlVE1TTGF5ZXIiLCJtYWtlR3JpZE91dExpbmVMYXllciIsIm1ha2VHcmlkQ29ycmVjdExheWVyIiwibWFrZUdyaWRMYXllciIsImFkZEdyaWRDbGljayIsInNldFRpbWVvdXQiLCJvbmxvYWQiLCJhZGRDb250cm9sIiwiTmF2aWdhdGlvbkNvbnRyb2wiLCJzaG93Q29tcGFzcyIsImVuZG1hcHMiLCJjZW50ZXIiLCJpbmRleENvdW50IiwiaW5kZXgiLCJzZXRJbnRlcnZhbCIsImtlZXBHb2luZyIsImtlZXBHb2luZ1N0b3AiLCJzZXRMYXlvdXRQcm9wZXJ0eSIsIm1hcEJlZm9yZUNvbnRhaW5lciIsIm1hcEFmdGVyQ29udGFpbmVyIiwibWFwQ29tcGFyZVdyYXBwZXJJRCIsImJlZm9yZU1hcCIsImFmdGVyTWFwIiwiY29tcGFyZSIsInNldFNsaWRlciIsIm1hcENoYW5nZSIsInR5cGUiLCJzb3VyY2UiLCJ0aWxlcyIsInBhaW50IiwiZGF0YSIsImxheW91dCIsImdldENhbnZhcyIsImN1cnNvciIsImZlYXR1cmUiLCJuZXdGZWF0dXJlIiwidG9nZ2xlU2VsZWN0ZWRGZWF0dXJlIiwic2VsZWN0ZWRGZWF0dXJlcyIsIm1ha2VTZWxlY3RlZEZlYXR1cmVHZW9KU09OIiwibmV3U3F1YXJlR3JpZEdlb0pTT04iLCJ1cGRhdGVTcXVhcmVHcmlkV2l0aFNlbGVjdGVkRmVhdHVyZXMiLCJzdG9yZVNxdWFyZUdyaWQiLCJzdG9yZVNlbGVjdGVkRmVhdHVyZSIsIk5ld1NxdWFyZUdyaWRHZW9KU09OIiwiZml0Qm91bmRzIiwicGFkZGluZyIsInNlbGVjdGVkIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsImN1cnJlbnRGZWF0dXJlSWRzIiwiY29uY2F0IiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJkYXRhcGkiLCJmb28iLCJhY3Rpb24iLCJjYXRlZ29yeSIsImxhYmVsIiwiZGF0ZSIsImpzb25kYXRhIiwiZGF0YUFQSVVSTCIsInNlYXJjaCIsIlVSTFNlYXJjaFBhcmFtcyIsImZldGNoIiwiU1RBVEVfS0VZIiwic3RvcmFnZUF2YWlsYWJsZSIsImxvY2FsU3RvcmFnZSIsInN0YXRlIiwiY2hlY2tTdGF0ZUV4aXN0cyIsImdldFN0YXRlIiwic3RvcmVPYmoiLCJuZXdTdGF0ZU9iaiIsInNldFN0YXRlIiwicGFyc2UiLCJnZXRJdGVtIiwiY2hlY2tJdGVtIiwic2V0SXRlbSIsIkJvb2xlYW4iLCJpdGVtIiwic3RhdGVTdHIiLCJnZXRTdGF0ZUFzU3RyaW5nIiwiaW5kZXhPZiIsIngiLCJET01FeGNlcHRpb24iLCJjb2RlIiwibmFtZSIsImNoZWNrIiwib2JqIiwidW5kZWZpbmVkIiwiT2JqZWN0Iiwia2V5cyIsImNyeXB0byIsImdldFJhbmRvbVZhbHVlcyIsIlVpbnQzMkFycmF5Iiwiam9pbiIsImEiLCJ0ZXN0Iiwic3Vic3RyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidmVuZG9yIiwib3BlcmEiLCJwbGFjZUhvbGRlckVsZW1lbnRJRCIsInRlbXBsYXRlIiwiY29tcG9uZW50RWxlbSIsImlubmVySFRNTCIsImV2ZW50TmFtZSIsImRldGFpbCIsIkN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInN0YXRldGV4dCIsIml0ZXJhdGlvbnMiLCJidG5QcmVmaXgiLCJuZXh0SXRlcmF0aW9uIiwidmFsdWVBcnJheSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LFVBQU16VSxZQUFZLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUFsQjtBQUNBNUMsWUFBTW9DLFlBQU4sQ0FBbUIsZUFBbkIsRUFBb0MsSUFBcEM7QUFDQXBDLFlBQU1vQyxZQUFOLENBQW1CLGFBQW5CLEVBQWtDK1UsVUFBbEM7QUFDQW5YLFlBQU1vQyxZQUFOLENBQW1CLGtCQUFuQixFQUF1Q00sU0FBdkM7QUFDQSxhQUFPLElBQVA7QUFDRCIsImZpbGUiOiJpbmRleC5hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJiNmRmZDdiYWU5YmFmNTMzZDE5NFwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3JzfmluZGV4XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC1hbGxcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDBcXFwiPlxcblxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5TdHVkeSBBZ3JyZWVtZW50PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnQtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdHVkeSBQYXJ0aWNpcGF0aW9uIEFncmVlbWVudDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50XFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaC0xMDBcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIFRoYW5rIHlvdSBmb3IgdGFraW5nIHBhcnQgaW4gdGhpcyBzdHVkeS4gQnkgdXNpbmcgdGhlIGZvbGxvd2luZyB3ZWJzaXRlLFxcbiAgICAgICAgeW91IGFncmVlIHRvIHBhcnRpY2lwYXRlIGluIGEgc3R1ZHkgYWJvdXQgaG93IHBlb3BsZSB1c2Ugd2ViLXByZXNlbnRlZCBtYXBzLlxcbiAgICAgICAgV2Ugd2lsbCBjb2xsZWN0IGluZm9ybWF0aW9uIGFib3V0IHlvdXIgaW50ZXJhY3Rpb25zIHdpdGggdGhpcyBzaXRlIGJ1dCBub3QgYW55XFxuICAgICAgICBwZXJzb25hbGx5IGlkZW50aWZpYWJsZSBpbmZvcm1hdGlvbi4gVGhlIG9ubHkgcGVvcGxlIHdpdGggYWNjZXNzIHRvIHRoZSBzdHVkeVxcbiAgICAgICAgZGF0YSBhcmUgdGhlIHJlc2VhcmNoZXJzLiBIb3dldmVyLCB0aGUgZGF0YSB3aWxsIGJlIHN1bW1hcml6ZWQsIHNoYXJlZCwgYW5kXFxuICAgICAgICBkaXNzZW1pbmF0ZWQgaW4gdGFsa3MsIGJsb2dzLCBhbmQgcG9zc2libHkgcmVzZWFyY2ggam91cm5hbHMuIFRoZXJlIGlzIG5vXFxuICAgICAgICBjb3N0IHRvIHlvdSB0byBwYXJ0aWNpcGF0ZSBpbiB0aGlzIHJlc2VhcmNoIHN0dWR5LCBhbmQgeW91IHdpbGwgbm90IGJlXFxuICAgICAgICBjb21wZW5zYXRlZC4gVGhlcmUgYXJlIG5vIGtub3duIHJpc2tzIGluIHRoZSBmb2xsb3dpbmcgdGFza3MuXFxuICAgICAgICA8YnIgLz48YnIgLz5cXG4gICAgICAgIEJ5IGFncmVlaW5nIHRvIHRoaXMsIHlvdSBoYXZlIGFja25vd2xlZGdlZCB0aGF0IHlvdSBoYXZlIHJlYWQgdGhlXFxuICAgICAgICBjb250ZW50cyBvZiB0aGlzIGNvbnNlbnQsIGFyZSBhbiBhZHVsdCBvdmVyIDE4IHllYXJzIG9mIGFnZSwgYW5kXFxuICAgICAgICB5b3UgYXJlIGdpdmluZyBjb25zZW50IHRvIHBhcnRpY2lwYXRlIGluIHRoaXMgc3R1ZHkuXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTVcXFwiPkRvIHlvdSB3YW50IHRvIHBhcnRpY2lwYXRlPzwvZGl2PlxcblxcbiAgPHNwYW4gY2xhc3M9XFxcIm10LTMgaC1hdXRvIGQtZmxleFxcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcImFnZ3JlZS1idXR0b25cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZCBtci0zXFxcIiA+XFxuICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS1jaGVja1xcXCI+PC9pPlxcbiAgICAgIFllc1xcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiBpZD1cXFwiZGlhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXhsaWdodCBidG4tYWdncmVlbWVudCB3LTIwIGFsaWduLXNlbGYtZW5kXFxcIiA+XFxuICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS10aW1lcy1jaXJjbGVcXFwiPjwvaT5cXG4gICAgICBOb1xcbiAgICA8L2J1dHRvbj5cXG4gIDwvc3Bhbj5cXG5cXG4gIDwhLS0gPGRpdiBpZD1cXFwiYWdncmVlLWRpc2FnZ3JlLXdyYXBwZXJcXFwiIGNsYXNzPVxcXCJtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50LXN1YlxcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyBhbGlnbi1zZWxmLWNlbnRlciBwYi00IHB5LTJcXFwiPkRvIHlvdSB3YW50IHRvIHBhcnRpY2lwYXRlPzwvZGl2PlxcbiAgICA8YnV0dG9uIGlkPVxcXCJhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmQgbXItM1xcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtY2hlY2tcXFwiPjwvaT5cXG4gICAgICBZZXNcXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b24gaWQ9XFxcImRpYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi14bGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZFxcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtdGltZXMtY2lyY2xlXFxcIj48L2k+XFxuICAgICAgTm9cXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj4gLS0+XFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLWVuZFxcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDBcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwXFxcIj5cXG4gICAgVGhhbmtzIGZvciBwYXJ0aWNpcGF0aW5nIVxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLWVuZFxcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDwhLS0gPGRpdiBpZD1cXFwibWFwLWhvbGRlci1lbmRcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItZW5kXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlxcbiAgICAgICAgPGRpdiBpZD0nY29tcGFyZS1lbmQtd3JhcHBlcic+XFxuICAgICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1jLWVuZGFcXFwiIGNsYXNzPVxcXCJteS0zIG14LTNcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtYy1lbmRiXFxcIiBjbGFzcz1cXFwibXktMyBteC0zXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj4tLT5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHctMTAwIG1sLTNcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNiBweC0wIHctMTAwXFxcIiA+XFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDBcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTEyIHB4LTAgcHktMSB3LTEwMFxcXCIgPlxcbiAgICAgICAgICAgIFlvdXIgYW5zd2VyXFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtZW5kYVxcXCIgY2xhc3M9XFxcImNvbC0xMiBjb2wtbWQtNiBweC0wIG1hcC1lbmRhIGVuZG1hcFxcXCI+PC9kaXY+XFxuICAgICAgICAgIDwhLS0gPGRpdiBpZD1cXFwibWFwLWhvbGRlci0zXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTNcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlciBjb21wYXJlXFxcIj5cXG4gICAgICAgICAgICAgIDxkaXYgaWQ9J2NvbXBhcmUtZW5kMS13cmFwcGVyJz5cXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwibWFwLWMtZW5kYVxcXCIgY2xhc3M9XFxcIm14LTNcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtYy1lbmRiXFxcIiBjbGFzcz1cXFwibXgtM1xcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+IC0tPlxcbiAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS02IHB4LTAgdy0xMDBcXFwiID5cXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMFxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBweC0wIHB5LTEgbWwtMCBtbC1zbS0zIHctMTAwXFxcIiA+XFxuICAgICAgICAgICAgT3VyIGFuc3dlclxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPCEtLSA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLTNcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItM1xcXCIgY2xhc3M9XFxcInJvdyBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGNvbXBhcmVcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBpZD0nY29tcGFyZS1lbmQyLXdyYXBwZXInPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtYy1lbmRjXFxcIiBjbGFzcz1cXFwibXgtM1xcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1jLWVuZGRcXFwiIGNsYXNzPVxcXCJteC0zXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj4gLS0+XFxuICAgICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1lbmRiXFxcIiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IHB4LTAgbWwtMyBtYXAtZW5kYiBlbmRtYXBcXFwiPjwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDAgbXktMlxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNCBjb2wtbWQtNCB3LTEwMFxcXCIgPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgbXQtM1xcXCI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJjb21wbGV0ZWQtcGxheVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuLWNlbnRlciBidG4teGxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCB0ZXh0LWNlbnRlclxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYXIgZmEtcGxheS1jaXJjbGUgbXItMlxcXCI+PC9pPlBsYXlcXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS00IGNvbC1tZC00IHctMTAwXFxcIiA+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBtdC0zXFxcIj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcImNvbXBsZXRlZC1wYXVzZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuLWNlbnRlciBidG4teGxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCB0ZXh0LWNlbnRlclxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYXIgZmEtcGF1c2UtY2lyY2xlIG1yLTJcXFwiPjwvaT5QYXVzZVxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTQgY29sLW1kLTQgdy0xMDBcXFwiID5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG10LTNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwiY29tcGxldGVkLXN0b3BcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0bi1jZW50ZXIgYnRuLXhsaWdodCBidG4tZHJhdy1jaXJjbGUgdy0xMDAgdGV4dC1jZW50ZXJcXFwiIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiBkYXRhLWh0bWw9XFxcInRydWVcXFwiIHRpdGxlPVxcXCJTdWJtaXQgYW5kIGdvIHRvIHN1cnZleS5cXFwiPlxcbiAgICAgICAgICA8aSBjbGFzcz1cXFwiZmFyIGZhLXN0b3AtY2lyY2xlIG1yLTJcXFwiPjwvaT5TdG9wXFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktZGlzc2FnZ3JlZVxcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5UaGFua3MgYW55d2F5ITwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3R1ZHktZGlzc2FnZ3JlZS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgPHNwYW4+XFxuICAgICAgVGhhbmsgeW91IGZvciBjb25zaWRlcmluZyBiZWluZyBhIHBhcnRpY2lwYW50LiBJZiB5b3UgY2hhbmdlIHlvdXJtaW5kIHlvdSBjYW5cXG4gICAgICBhbHdheXMgcmV2aWV3IHRoZSA8YSBocmVmPVxcXCJcXFwiPmFnZ3JlbWVudDwvYT4gYWdhaW4hXFxuICAgIDwvc3Bhbj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1wcm9ncmVzcy1tYXAtMFxcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDEgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIDx1bD5cXG4gICAgICA8bGk+VGhlIG1hcCBiZWxvdyBjb250YWlucyB0d28gaW1hZ2VzIHRoYXQgYXJlIGRpZmZlcmVudC48L2xpPlxcbiAgICAgIDxsaT5UaGUgdHdvIGltYWdlcyB3aWxsIHR1cm4gb24gYW5kIG9mZiBhdCBhIHJlZ3VsYXIgaW50ZXJ2YWxzLjwvbGk+XFxuICAgICAgPGxpPkNsaWNrIG9uIGFueSBib3hlcyB3aGVyZSB5b3UgYmVsaWV2ZSB0aGUgdHdvIGltYWdlcyBhcmUgZGlmZmVyZW50LjwvbGk+XFxuICAgICAgPGxpIGNsYXNzPVxcXCJmb3Itc2F0XFxcIj5Pbmx5IHNlbGVjdCBhcmVhcyBvZiA8c3Ryb25nPk1BSk9SPC9zdHJvbmc+IGNoYW5nZS48L2xpPlxcbiAgICAgIDxsaT5UaGUgYm94ZXMgeW91IGNsaWNrIG9uIHdpbGwgY2hhbmdlIG9yYW5nZSBhbmQgd2lsbCBiZWNvbWUgeW91ciBhbnN3ZXJzIHdoZW4geW91IGNsaWNrIHN1Ym1pdC48L2xpPlxcbiAgICAgIDxsaT5DbGlja2luZyBvbiBhbiBvcmFuZ2UgYm94IHdpbGwgcmVtb3ZlIGl0IGZyb20geW91ciBzZWxlY3Rpb24uPC9saT5cXG4gICAgICA8bGk+Wm9vbSBvciBQYW4gaWYgeW91IG5lZWQgdG8uPC9saT5cXG4gICAgICA8bGk+U3VibWl0IHlvdXIgYW5zd2VyLjwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItMVxcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItMVxcXCIgY2xhc3M9XFxcInJvdyBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJtYXAtMVxcXCIgY2xhc3M9XFxcIm15LTMgbXgtM1xcXCI+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDAgbXktMlxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tMTIgY29sLW1kLTQgdy0xMDBcXFwiID5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG10LTNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwic3R1ZHktcGxheVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuLWNlbnRlciBidG4teGxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCB0ZXh0LWNlbnRlclxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYXIgZmEtcGxheS1jaXJjbGUgbXItMlxcXCI+PC9pPlBsYXlcXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS0xMiBjb2wtbWQtNCB3LTEwMFxcXCIgPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgbXQtM1xcXCI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJzdHVkeS1wYXVzZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuLWNlbnRlciBidG4teGxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCB0ZXh0LWNlbnRlclxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYXIgZmEtcGF1c2UtY2lyY2xlIG1yLTJcXFwiPjwvaT5QYXVzZVxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTEyIGNvbC1tZC00IHctMTAwXFxcIiA+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBtdC0zXFxcIj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcInN0dWR5LXN0b3BcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0bi1jZW50ZXIgYnRuLXhsaWdodCBidG4tZHJhdy1jaXJjbGUgdy0xMDAgdGV4dC1jZW50ZXJcXFwiIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiBkYXRhLWh0bWw9XFxcInRydWVcXFwiIHRpdGxlPVxcXCJTdWJtaXQgYW5kIGdvIHRvIHN1cnZleS5cXFwiPlxcbiAgICAgICAgICA8aSBjbGFzcz1cXFwiZmFyIGZhLXN0b3AtY2lyY2xlIG1yLTJcXFwiPjwvaT5TdG9wXFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAyIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBTdWJtaXQgdGhlIHNlbGVjdGVkIGJveGVzIChpbiBvcmFuZ2UpIGFzIHlvdXIgYW5zd2VyLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTBcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiU3VibWl0IGFuZCBnbyB0byBzdXJ2ZXkuXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtbWFwLTFcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAxIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICA8dWw+XFxuICAgICAgPGxpPlRoZSB0d28gbWFwcyBiZWxvdyBjb250YWluIGltYWdlcyB0aGF0IGFyZSBkaWZmZXJlbnQuPC9saT5cXG4gICAgICA8bGk+Q2xpY2sgb24gYW55IGJveGVzIHdoZXJlIHlvdSBiZWxpZXZlIHRoZSB0d28gaW1hZ2VzIGFyZSBkaWZmZXJlbnQuPC9saT5cXG4gICAgICA8bGkgY2xhc3M9XFxcImZvci1zYXRcXFwiPk9ubHkgc2VsZWN0IGFyZWFzIG9mIDxzdHJvbmc+TUFKT1I8L3N0cm9uZz4gY2hhbmdlLjwvbGk+XFxuICAgICAgPGxpPlRoZSBib3hlcyB5b3UgY2xpY2sgb24gd2lsbCBjaGFuZ2Ugb3JhbmdlIGFuZCB3aWxsIGJlY29tZSB5b3VyIGFuc3dlcnMgd2hlbiB5b3UgY2xpY2sgc3VibWl0LjwvbGk+XFxuICAgICAgPGxpPkNsaWNraW5nIG9uIGFuIG9yYW5nZSBib3ggd2lsbCByZW1vdmUgaXQgZnJvbSB5b3VyIHNlbGVjdGlvbi48L2xpPlxcbiAgICAgIDxsaT5ab29tIG9yIFBhbiBpZiB5b3UgbmVlZCB0by48L2xpPlxcbiAgICAgIDxsaT5TdWJtaXQgeW91ciBhbnN3ZXIuPC9saT5cXG4gICAgPC91bD5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci0yXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtbC0zIG10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTJcXFwiIGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IGR1YWxtYXBzIGQtZmxleFxcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtMmFcXFwiIGNsYXNzPVxcXCJteS0zIG14LTAgbXgtc20tMCBteC1tZC0zIG1hcC0yYVxcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IGR1YWxtYXBzIGQtZmxleFxcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtMmJcXFwiIGNsYXNzPVxcXCJteS0zIG14LTAgbXgtc20tMCBteC1tZC0zIG1hcC0yYlxcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMiBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgU3VibWl0IHRoZSBzZWxlY3RlZCBib3hlcyAoaW4gb3JhbmdlKSBhcyB5b3VyIGFuc3dlci5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IG10LTNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLXN1cy0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgU3VibWl0XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLW1hcC0yXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMSBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgPHVsPlxcbiAgICAgIDxsaT5UaGUgdHdvIG1hcHMgYmVsb3cgY29udGFpbiBpbWFnZXMgdGhhdCBhcmUgZGlmZmVyZW50LjwvbGk+XFxuICAgICAgPGxpPkRyYWcgdGhlIHZlcnRpY2FsIGJhciBzaWRlLXRvLXNpZGUgdG8gcmV2ZWFsIHRoZSBpbWFnZXMuPC9saT5cXG4gICAgICA8bGk+Q2xpY2sgb24gYW55IGJveGVzIHdoZXJlIHlvdSBiZWxpZXZlIHRoZSB0d28gaW1hZ2VzIGFyZSBkaWZmZXJlbnQuPC9saT5cXG4gICAgICA8bGkgY2xhc3M9XFxcImZvci1zYXRcXFwiPk9ubHkgc2VsZWN0IGFyZWFzIG9mIDxzdHJvbmc+TUFKT1I8L3N0cm9uZz4gY2hhbmdlLjwvbGk+XFxuICAgICAgPGxpPlRoZSBib3hlcyB5b3UgY2xpY2sgb24gd2lsbCBjaGFuZ2Ugb3JhbmdlIGFuZCB3aWxsIGJlY29tZSB5b3VyIGFuc3dlcnMgd2hlbiB5b3UgY2xpY2sgc3VibWl0LjwvbGk+XFxuICAgICAgPGxpPkNsaWNraW5nIG9uIGFuIG9yYW5nZSBib3ggd2lsbCByZW1vdmUgaXQgZnJvbSB5b3VyIHNlbGVjdGlvbi48L2xpPlxcbiAgICAgIDxsaT5ab29tIG9yIFBhbiBpZiB5b3UgbmVlZCB0by48L2xpPlxcbiAgICAgIDxsaT5TdWJtaXQgeW91ciBhbnN3ZXIuPC9saT5cXG4gICAgPC91bD5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci0zXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci0zXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgY29tcGFyZVxcXCI+XFxuICAgICAgPGRpdiBpZD0nY29tcGFyZS13cmFwcGVyJz5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC0zYVxcXCIgY2xhc3M9XFxcIm14LTNcXFwiPjwvZGl2PlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLTNiXFxcIiBjbGFzcz1cXFwibXgtM1xcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMiBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgU3VibWl0IHRoZSBzZWxlY3RlZCBib3hlcyAoaW4gb3JhbmdlKSBhcyB5b3VyIGFuc3dlci5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IG10LTNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLXN1cy0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgU3VibWl0XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLXN1c1xcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDMgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIDx1bD5cXG4gICAgICA8bGk+UmFuayBlYWNoIHF1ZXN0aW9uIGZyb20gMSB0byA1IGJhc2VkIG9uIGhvdyBtdWNoIHlvdSBhZ3JlZSBvciBkaXNhZ2dyZSB3aXRoIHRoZSBzdGF0ZW1lbnQuPC9saT5cXG4gICAgICA8bGk+MSBpbmRpY2F0ZXMgeW91IHN0cm9uZ2x5IGRpc2FncmVlLjwvbGk+XFxuICAgICAgPGxpPjUgaW5kaWNhdGVzIHlvdSBzdHJvbmdseSBhZ2dyZWUuPC9saT5cXG4gICAgPC91bD4gICAgXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInBsLTEgcHQtMyBwYi0zXFxcIj5cXG4gICAgJm5ic3A7XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1vZGRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMS4mbmJzcDsmbmJzcDtJIHRoaW5rIHRoYXQgSSB3b3VsZCBsaWtlIHRvIHVzZSB0aGlzIHNpdGUgZnJlcXVlbnRseVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0xXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIGJ0bi1zdXMgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMi4mbmJzcDsmbmJzcDtJIGZvdW5kIHRoZSBzaXRlIHVubmVjZXNzYXJpbHkgY29tcGxleFxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0yXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDMuJm5ic3A7Jm5ic3A7SSB0aG91Z2h0IHRoZSBzaXRlIHdhcyBlYXN5IHRvIHVzZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0zXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA0LiZuYnNwOyZuYnNwO0kgdGhpbmsgdGhhdCBJIHdvdWxkIG5lZWQgdGhlIHN1cHBvcnQgb2YgYSB0ZWNobmljYWwgcGVyc29uIHRvIGJlIGFibGUgdG8gdXNlIHRoaXMgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy00XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDUuJm5ic3A7Jm5ic3A7SSBmb3VuZCB0aGUgdmFyaW91cyBmdW5jdGlvbnMgaW4gdGhpcyBzaXRlIHdlcmUgd2VsbCBpbnRlZ3JhdGVkXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwYi0yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTVcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDYuJm5ic3A7Jm5ic3A7SSB0aG91Z2h0IHRoZXJlIHdhcyB0b28gbXVjaCBpbmNvbnNpc3RlbmN5IGluIHRoaXMgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy02XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDcuJm5ic3A7Jm5ic3A7SSB3b3VsZCBpbWFnaW5lIHRoYXQgbW9zdCBwZW9wbGUgd291bGQgbGVhcm4gdG8gdXNlIHRoaXMgc2l0ZSB2ZXJ5IHF1aWNrbHlcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtN1xcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE3LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTctMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNy0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE3LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTctNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgOC4mbmJzcDsmbmJzcDtJIGZvdW5kIHRoZSBzaXRlIHZlcnkgY3VtYmVyc29tZSB0byB1c2VcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtOFxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA5LiZuYnNwOyZuYnNwO0kgZmVsdCB2ZXJ5IGNvbmZpZGVudCB1c2luZyB0aGUgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy05XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICAxMC4mbmJzcDsmbmJzcDtJIG5lZWRlZCB0byBsZWFybiBhIGxvdCBvZiB0aGluZ3MgYmVmb3JlIEkgY291bGQgZ2V0IGdvaW5nIHdpdGggdGhpcyBzaXRlXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwYi0yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTEwXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMCBkLWZsZXggbXQtNFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcInB0LXNtLTIgcHQtbWQtMCBjb2wtMTIgY29sLXNtLTEyIGNvbC1tZC03XFxcIj5cXG4gICAgICAmbmJzcDtcXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLTQgcHQtc20tMiBwdC1tZC0wIGNvbC0xMiBjb2wtc20tMTIgY29sLW1kLTVcXFwiPlxcbiAgICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tZW5kXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZmluaXNoLlxcXCI+XFxuICAgICAgICBTdWJtaXQgYW5kIGZpbmlzaFxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbjwvZGl2PlxcblwiOyIsImltcG9ydCB7IFJlY29yZFN0dWR5RGF0YSB9IGZyb20gJy4vcmVjb3JkLXN0dWR5LWRhdGEnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IFV0aWxpdHkgfSBmcm9tICcuL3V0aWxpdHknO1xuXG5jb25zdCByZWNvcmRTdHVkeURhdGEgPSBuZXcgUmVjb3JkU3R1ZHlEYXRhKCk7XG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuZXhwb3J0IGNsYXNzIEhhbmRsZXJzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kaXNwbGF5Tm9uZUNsYXNzID0gJ2Qtbm9uZSc7XG4gICAgdGhpcy5zZWxlY3RlZENsYXNzID0gJ3NlbGVjdGVkJztcblxuICAgIC8vIHN0dWR5IGFnZ3JlZW1lbnRcbiAgICB0aGlzLnN0dWR5QWdncmVlbWVudEVsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1tYXAtJ107XG4gICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSA9IFsnYmxvY2stc3R1ZHktYWdncmVlbWVudC1ob2xkZXInXTtcblxuICAgIC8vIHN0dWR5IGRpc2FnZ3JlZW1lbnRcbiAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzQWRkID0gWydzdHVkeS1kaXNzYWdncmVlJ107XG4gICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSA9IFsnYmxvY2stc3R1ZHktYWdncmVlbWVudC1ob2xkZXInXTtcblxuICAgIC8vIHN0dWR5IHF1ZXN0aW9ucyBtYXAgY2hhbmdlXG4gICAgdGhpcy5zdHVkeVF1ZXN0aW9uRWxlbWVudHNBZGQgPSBbJ3N0dWR5LXByb2dyZXNzLXN1cycsICdibG9jay1zdHVkeS1zdXMtaG9sZGVyJ107XG4gICAgdGhpcy5zdHVkeVF1ZXN0aW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzUmVtb3ZlID0gW2BzdHVkeS1wcm9ncmVzcy1tYXAtJHt0aGlzLnN0dWR5UXVlc3Rpb259YCwgJ21hcC1hY3Rpb24taG9sZGVyJ107XG5cbiAgICAvLyBTVVMgc2NvcmVzXG4gICAgdGhpcy5zdHVkeVNVU0VsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1lbmQnLCAnYmxvY2stc3R1ZHktY29tcGxldGVkLWhvbGRlciddO1xuICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c1JlbW92ZSA9IFsnc3R1ZHktcHJvZ3Jlc3Mtc3VzJywgJ2Jsb2NrLXN0dWR5LXN1cy1ob2xkZXInXTtcbiAgICB0aGlzLnN1c1N0b3JhZ2VLZXlzID0gWydzdXMtcXVlc3Rpb24tMScsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTInLFxuICAgICAgJ3N1cy1xdWVzdGlvbi0zJyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNCcsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTUnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi02JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNycsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTgnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi05JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tMTAnXTtcbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3Igc3VibWl0dGluZyBjaGFuZ2UgZGF0YSBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIGVsZW1lbnRJRCAtIEhUTUwgZWxlbWVudCBJRFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlclN1Ym1pdENoYW5nZUNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuXG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gYWRkIGVsZW1lbnRzIHRvIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBncmlkTmFtZSA9ICdncmlkLWJveC0nO1xuICAgICAgICBjb25zdCBncmlkSXRlcmF0aW9ucyA9IDQyO1xuICAgICAgICB1dGlsaXR5LnNldEFQSUZvckdyb3VwKGdyaWROYW1lLCBncmlkSXRlcmF0aW9ucyk7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgcGFnZTogMiB9LCAnI3N1cy1xdWVzdGlvbnMnLCAnI3N1cy1xdWVzdGlvbnMnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gY29tcGxldGVkLXBsYXlcbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBwbGF5aW5nIGFuaW1hdGlvblxuICAvL1xuICAvLyBAcGFyYW0gcGFnZSAtIHN0cmluZyBwYWdlIHRvIHBsYXkgY29tcGxldGVkLCBtYXBcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJQbGF5Q2xpY2socGFnZSA9ICdjb21wbGV0ZWQnLCBlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYG1hcC0ke3BhZ2V9LWFuaW1hdGlvbmAsIHRydWUpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYG1hcC0ke3BhZ2V9LWFuaW1hdGlvbi1zdG9wYCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIGNvbXBsZXRlZC1wbGF5XG4gIC8vIGFkZHMgaGFuZGxlciBmb3IgcGxheWluZyBhbmltYXRpb25cbiAgLy9cbiAgLy8gQHBhcmFtIHBhZ2UgLSBzdHJpbmcgcGFnZSB0byBwbGF5IGNvbXBsZXRlZCwgbWFwXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyTGF5ZXJzT2ZmQ2xpY2socGFnZSA9ICdjb21wbGV0ZWQnLCBlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYG1hcC0ke3BhZ2V9LWFuaW1hdGlvbi1zdG9wYCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmFuaW1hdGUgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxuICAvLyBjb21wbGV0ZWQtcGxheVxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIHBhdXNpbmcgYW5pbWF0aW9uXG4gIC8vXG4gIC8vIEBwYXJhbSBwYWdlIC0gc3RyaW5nIHBhZ2UgdG8gcGxheSBjb21wbGV0ZWQsIG1hcFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlclBhdXNlQ2xpY2socGFnZSA9ICdjb21wbGV0ZWQnLCBlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYG1hcC0ke3BhZ2V9LWFuaW1hdGlvbmAsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5hbmltYXRlID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIHN1Ym1pdHRpbmcgc3VzIHNjb3JlXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTdWJtaXRTVVNDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBhZGQgZWxlbWVudHMgdG8gVUlcbiAgICAgICAgdGhpcy5zdHVkeVNVU0VsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3VzVmFsdWVBcnJheSA9IFtdO1xuICAgICAgICB0aGlzLnN1c1N0b3JhZ2VLZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQW5zd2VyID0gc3RvcmUuZ2V0U3RhdGVJdGVtKGtleSk7XG4gICAgICAgICAgc3VzVmFsdWVBcnJheS5wdXNoKHsga2V5LCBxdWVzdGlvbkFuc3dlciB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGRhdGVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgdXRpbGl0eS50cmlnZ2VyRXZlbnQoJ3N1cy1jbGlja2VkJywgJ3N1cy1jbGlja2VkJyk7XG5cbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXN1Ym1pdGVkJywgdHJ1ZSk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3VzYW5zd2VycycsIHN1c1ZhbHVlQXJyYXkpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtdGltZScsIGRhdGVzdGFtcCk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJywgdHJ1ZSk7XG4gICAgICAgIEhhbmRsZXJzLnJlY29yZEFnZ3JlZWQoKTtcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoeyBwYWdlOiAzIH0sICcjc3R1ZHktY29tcGxldGVkJywgJyNzdHVkeS1jb21wbGV0ZWQnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICAgIC8vIHRlbXAgZ2V0IHJpZCBvZiBzdGF0ZSBpdGVtc1xuICAgICAgICAvLyBSRU1PVkUgRk9SIFJFTEVBU0VcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHdpbmRvd1snbG9jYWxTdG9yYWdlJ107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKCdzdGF0ZScpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgcmVjb3JkRGlzYWdncmVlZCgpIHtcbiAgICBjb25zdCB1dWlkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJyk7XG4gICAgY29uc3Qgc3R1ZHlTdGFydGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkJyk7XG4gICAgY29uc3Qgc3R1ZHlTdGFydGVkVGltZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCB0aW1lJyk7XG4gICAgY29uc3Qgc3R1ZHlBZ3JlZW1lbnRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xuICAgIGNvbnN0IHN0dWR5QWdyZWVtZW50VGltZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50LXRpbWUnKTtcbiAgICBjb25zdCBjYW1wYWlnblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnY2FtcGFpZ24nKTtcbiAgICBjb25zdCBtb2JpbGVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21vYmlsZScpO1xuICAgIGNvbnN0IG1hcFZlcnNpb25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3Qgc3R1ZHlRdWVzdGlvblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICBjb25zdCBzdXNhbnN3ZXJzU3VibWl0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtc3VibWl0ZWQnKTtcbiAgICBjb25zdCBncmlkU3VibWl0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWQtc3VibWl0ZWQnKTtcbiAgICBjb25zdCBzdXNhbnN3ZXJzUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzJyk7XG4gICAgY29uc3QgZ3JpZGFuc3dlcnNSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzJyk7XG4gICAgY29uc3QgZ3JpZGNvcnJlY3RSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gICAgY29uc3Qgc3R1ZHlDb21wbGV0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWNvbXBsZXRlZCcpO1xuXG4gICAgY29uc3QgZ3JpZGNvcnJlY3RSZWNQcm9wcyA9IFtdO1xuXG4gICAgZ3JpZGNvcnJlY3RSZWMuZmVhdHVyZXMuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICBncmlkY29ycmVjdFJlY1Byb3BzLnB1c2goe1xuICAgICAgICBrZXk6IGBncmlkLWJveC0ke3ZhbC5wcm9wZXJ0aWVzLmlkfWAsXG4gICAgICAgIHZhbHVlOiB2YWwucHJvcGVydGllcy52XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGpzb25EYXRhID0ge1xuICAgICAgdXVpZDogdXVpZFJlYyxcbiAgICAgIHN0dWR5X3N0YXJ0ZWQ6IHN0dWR5U3RhcnRlZFJlYyxcbiAgICAgIHN0dWR5X3N0YXJ0ZWRfdGltZTogc3R1ZHlTdGFydGVkVGltZVJlYyxcbiAgICAgIHN0dWR5X2FncmVlbWVudDogc3R1ZHlBZ3JlZW1lbnRSZWMsXG4gICAgICBzdXNhbnN3ZXJzX3N1Ym1pdGVkOiBzdXNhbnN3ZXJzU3VibWl0ZWRSZWMsXG4gICAgICBncmlkX3N1Ym1pdGVkOiBncmlkU3VibWl0ZWRSZWMsXG4gICAgICBzdHVkeV9hZ3JlZW1lbnRfdGltZTogc3R1ZHlBZ3JlZW1lbnRUaW1lUmVjLFxuICAgICAgY2FtcGFpZ246IEpTT04uc3RyaW5naWZ5KGNhbXBhaWduUmVjKSxcbiAgICAgIG1vYmlsZTogSlNPTi5zdHJpbmdpZnkobW9iaWxlUmVjKSxcbiAgICAgIG1hcF92ZXJzaW9uOiBtYXBWZXJzaW9uUmVjLFxuICAgICAgZ3JpZF9jb3JyZWN0OiBKU09OLnN0cmluZ2lmeShncmlkY29ycmVjdFJlY1Byb3BzKSxcbiAgICAgIGdyaWRfYW5zd2VyczogSlNPTi5zdHJpbmdpZnkoZ3JpZGFuc3dlcnNSZWMpLFxuICAgICAgZ3JpZGFuc3dlcnNfdGltZTogJycsXG4gICAgICBzdHVkeV9xdWVzdGlvbjogc3R1ZHlRdWVzdGlvblJlYyxcbiAgICAgIHN1c19hbnN3ZXJzOiBKU09OLnN0cmluZ2lmeShzdXNhbnN3ZXJzUmVjKSxcbiAgICAgIHN1c2Fuc3dlcnNfdGltZTogJycsXG4gICAgICBzdHVkeV9jb21wbGV0ZWQ6IHN0dWR5Q29tcGxldGVkUmVjXG4gICAgfTtcblxuICAgIHJlY29yZFN0dWR5RGF0YS5zZXRFdmVudEFsbChqc29uRGF0YSk7XG4gIH1cblxuICBzdGF0aWMgcmVjb3JkQWdncmVlZCgpIHtcbiAgICBjb25zdCB1dWlkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJyk7XG4gICAgY29uc3Qgc3R1ZHlTdGFydGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkJyk7XG4gICAgY29uc3Qgc3R1ZHlTdGFydGVkVGltZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCB0aW1lJyk7XG4gICAgY29uc3Qgc3R1ZHlBZ3JlZW1lbnRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xuICAgIGNvbnN0IHN0dWR5QWdyZWVtZW50VGltZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50LXRpbWUnKTtcbiAgICBjb25zdCBjYW1wYWlnblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnY2FtcGFpZ24nKTtcbiAgICBjb25zdCBtb2JpbGVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21vYmlsZScpO1xuICAgIGNvbnN0IG1hcFZlcnNpb25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3Qgc3R1ZHlRdWVzdGlvblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICBjb25zdCBzdXNhbnN3ZXJzU3VibWl0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtc3VibWl0ZWQnKTtcbiAgICBjb25zdCBncmlkU3VibWl0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWQtc3VibWl0ZWQnKTtcbiAgICBjb25zdCBzdXNhbnN3ZXJzUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzJyk7XG4gICAgY29uc3Qgc3VzYW5zd2Vyc0RhdGVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtdGltZScpO1xuICAgIGNvbnN0IGdyaWRhbnN3ZXJzUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdncmlkYW5zd2VycycpO1xuICAgIGNvbnN0IGdyaWRhbnN3ZXJzRGF0ZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMtdGltZScpO1xuICAgIGNvbnN0IGdyaWRjb3JyZWN0UmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgIGNvbnN0IHN0dWR5Q29tcGxldGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1jb21wbGV0ZWQnKTtcblxuICAgIGNvbnN0IGdyaWRjb3JyZWN0UmVjUHJvcHMgPSBbXTtcblxuICAgIGdyaWRjb3JyZWN0UmVjLmZlYXR1cmVzLmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgZ3JpZGNvcnJlY3RSZWNQcm9wcy5wdXNoKHtcbiAgICAgICAga2V5OiBgZ3JpZC1ib3gtJHt2YWwucHJvcGVydGllcy5pZH1gLFxuICAgICAgICB2YWx1ZTogdmFsLnByb3BlcnRpZXMudlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBqc29uRGF0YSA9IHtcbiAgICAgIHV1aWQ6IHV1aWRSZWMsXG4gICAgICBzdHVkeV9zdGFydGVkOiBzdHVkeVN0YXJ0ZWRSZWMsXG4gICAgICBzdHVkeV9zdGFydGVkX3RpbWU6IHN0dWR5U3RhcnRlZFRpbWVSZWMsXG4gICAgICBzdHVkeV9hZ3JlZW1lbnQ6IHN0dWR5QWdyZWVtZW50UmVjLFxuICAgICAgc3VzYW5zd2Vyc19zdWJtaXRlZDogc3VzYW5zd2Vyc1N1Ym1pdGVkUmVjLFxuICAgICAgZ3JpZF9zdWJtaXRlZDogZ3JpZFN1Ym1pdGVkUmVjLFxuICAgICAgc3R1ZHlfYWdyZWVtZW50X3RpbWU6IHN0dWR5QWdyZWVtZW50VGltZVJlYyxcbiAgICAgIGNhbXBhaWduOiBKU09OLnN0cmluZ2lmeShjYW1wYWlnblJlYyksXG4gICAgICBtb2JpbGU6IEpTT04uc3RyaW5naWZ5KG1vYmlsZVJlYyksXG4gICAgICBtYXBfdmVyc2lvbjogbWFwVmVyc2lvblJlYyxcbiAgICAgIGdyaWRfY29ycmVjdDogSlNPTi5zdHJpbmdpZnkoZ3JpZGNvcnJlY3RSZWNQcm9wcyksXG4gICAgICBncmlkX2Fuc3dlcnM6IEpTT04uc3RyaW5naWZ5KGdyaWRhbnN3ZXJzUmVjKSxcbiAgICAgIGdyaWRhbnN3ZXJzX3RpbWU6IGdyaWRhbnN3ZXJzRGF0ZVJlYyxcbiAgICAgIHN0dWR5X3F1ZXN0aW9uOiBzdHVkeVF1ZXN0aW9uUmVjLFxuICAgICAgc3VzX2Fuc3dlcnM6IEpTT04uc3RyaW5naWZ5KHN1c2Fuc3dlcnNSZWMpLFxuICAgICAgc3VzYW5zd2Vyc190aW1lOiBzdXNhbnN3ZXJzRGF0ZVJlYyxcbiAgICAgIHN0dWR5X2NvbXBsZXRlZDogc3R1ZHlDb21wbGV0ZWRSZWNcbiAgICB9O1xuXG4gICAgcmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50QWxsKGpzb25EYXRhKTtcbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3IgYWdncmVlaW5nIHRvIGRvIHN0dWR5XG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyQWdyZWVDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBzdHVkeVZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJyk7XG4gICAgICAgIGNvbnN0IGFncmVlbWVudFRpbWVTdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxuICAgICAgICAvLyBhZGQgZWxlbWVudHMgdG8gVUlcbiAgICAgICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2VsZW1lbnRVSUlEfSR7c3R1ZHlWZXJzaW9ufWApLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlBZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGFkZCBkaXNwbGF5IG5vbmUgY2xhc3MgaWYgdGhlIGNsYXNzIGRvZXMgbm90IGV4c2lzdFxuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGR1cGxpY2F0ZSBjbGFzc2VzIGFyZSBub3QgYWRkZWRcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5kaXNwbGF5Tm9uZUNsYXNzKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5hZGQodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxpdHkudHJpZ2dlckV2ZW50KCdhZ2dyZWUtY2xpY2tlZCcsICdoYW5kbGVBZ3JlZUNsaWNrJyk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50JywgdHJ1ZSk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50LXRpbWUnLCBhZ3JlZW1lbnRUaW1lU3RhbXApO1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IHBhZ2U6IDEgfSwgJyNtYXAnLCAnI21hcCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIERJU2FnZ3JlZWluZyB0byBkbyBzdHVkeVxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlckRpc2FncmVlQ2xpY2soZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgYWdyZWVtZW50VGltZVN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAvLyBhZGQgZWxlbWVudHMgdG8gVUlcbiAgICAgICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlsaXR5LnRyaWdnZXJFdmVudCgnZGlzYWdncmVlLWNsaWNrZWQnLCAnaGFuZGxlQWdyZWVDbGljaycpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIGZhbHNlKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScsIGFncmVlbWVudFRpbWVTdGFtcCk7XG4gICAgICAgIEhhbmRsZXJzLnJlY29yZERpc2FnZ3JlZWQoKTtcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoeyBwYWdlOiAxIH0sICcjZGlzYWdncmVlJywgJyNkaXNhZ2dyZWUnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBpbmRpdmlkdWFsIHN1cyBzY29yZSBxdWVzdGlvbnMgdG8gbG9jYWwgc3RvcmFnZVxuICAvL1xuICAvLyBAcGFyYW0gZWxlbWVudElEIC0gSFRNTCBlbGVtZW50IElEXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2xhc3MgPSAnc2VsZWN0ZWQnO1xuXG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gZ2V0IHBhcmVudCBlbGVtZW50IHdoaWNoIGlzIGJ1dHRvbiBncm91cFxuICAgICAgICBjb25zdCBwYXJlbnRCdG5Hcm91cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUudGFyZ2V0LmlkKS5wYXJlbnRFbGVtZW50O1xuICAgICAgICBIYW5kbGVycy50b2dnbGVCdXR0b25Hcm91cEJ1dHR0b25zT2ZmKHBhcmVudEJ0bkdyb3VwLCB0aGlzLnNlbGVjdGVkQ2xhc3MpO1xuXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uVGV4dCA9IHBhcmVudEJ0bkdyb3VwLmlkLnJlcGxhY2UoJ2J0bi1ncm91cC1zdXMtJywgJ3N1cy1xdWVzdGlvbi0nKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKHF1ZXN0aW9uVGV4dCwgTnVtYmVyKGUudGFyZ2V0LmlubmVyVGV4dCkpO1xuXG4gICAgICAgIC8vIGFkZCBzdXMgcXVlc3Rpb24gYW5zd2VyIHRvIHNlbGVjdGVkIHRvIGNsYXNzXG4gICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLnNlbGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLmNsYXNzTGlzdC5hZGQodGhpcy5zZWxlY3RlZENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gcmVtb3ZlcyB0aGUgc2VsZWN0ZWQgY2xhc3MgXCJ1bnNsZWN0c1wiIGFsbCB0aGUgYnV0dG9uc1xuICAvLyAgaW4gYSBidXR0b24gZ3JvdXBcbiAgLy9cbiAgLy8gQHBhcmFtIGJ0bkdyb3VwIC0gSFRNTCBlbGVtZW50XG4gIC8vIEByZXR1cm4gbnVsbFxuICBzdGF0aWMgdG9nZ2xlQnV0dG9uR3JvdXBCdXR0dG9uc09mZihidG5Hcm91cCwgc2VsZWN0ZWRDbGFzcykge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gYnRuR3JvdXAuY2hpbGROb2RlcztcbiAgICAvLyBtYWtlIHN1cmUgY2hpbGRyZW4gaXMgdmFsaXVkIG9iamVjdFxuICAgIGlmICghdXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KGNoaWxkcmVuKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAvLyBtYWtlIHN1cmUgdGhlcmUgYXJlIGNoaWxkZXJlbiBidXR0b25zXG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBbLi4uY2hpbGRyZW5dO1xuICAgICAgY2hpbGRyZW5BcnJheS5mb3JFYWNoKChjaGlsZEl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGNoaWxkSXRlbS5jbGFzc0xpc3QpIHtcbiAgICAgICAgICBjaGlsZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShzZWxlY3RlZENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCIvLyBpbXBvcnQgZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBsaWJyYXJ5LCBkb20gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgZmFzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IGZhciB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXJlZ3VsYXItc3ZnLWljb25zJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBNYXBCb3hDb25maWcgfSBmcm9tICcuL21hcC1jb25maWcnO1xuaW1wb3J0IHsgVXRpbGl0eSB9IGZyb20gJy4vdXRpbGl0eSc7XG5pbXBvcnQgeyBIYW5kbGVycyB9IGZyb20gJy4vaGFuZGxlcnMnO1xuXG5pbXBvcnQgYmxvY2tTdHVkeUFnZ3JlZW1lbnQgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktYWdncmVlbWVudC5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5RGlzc2FnZ3JlZSBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1kaXNzYWdncmVlLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlRdWVzdGlvbjEgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5UXVlc3Rpb24yIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTIuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVF1ZXN0aW9uMyBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0zLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlTVVMgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlDb21wbGV0ZWQgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuY29uc3QgVVJMUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG4vLyBzdHVkeSBjb25zdHJhaW50cyBudW1iZXIgb2YgcXVlc3Rpb25zIHN0YXJ0cyB3aXRoIDBcbmxldCBzdHVkeVZlcnNpb24gPSAwOyAvLyBkZWZhdWx0IHN0dWR5IHZlcnNpb25cbmlmICh1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpKSkge1xuICBzdHVkeVZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJyk7XG59IGVsc2Uge1xuICBjb25zdCBzdHVkeU1pbk9uZSA9IDA7XG4gIGNvbnN0IHN0dWR5TWF4T25lID0gMjtcbiAgc3R1ZHlWZXJzaW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHN0dWR5TWF4T25lIC0gc3R1ZHlNaW5PbmUgKyAxKSArIHN0dWR5TWluT25lKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicsIHN0dWR5VmVyc2lvbik7XG59XG5cbi8vIHN0dWR5IGNvbnN0cmFpbnRzIG51bWJlciBvZiBxdWVzdGlvbnMgc3RhcnRzIHdpdGggMFxubGV0IG1hcFZlcnNpb24gPSAwOyAvLyBkZWZhdWx0IHN0dWR5IHZlcnNpb25cbmlmICh1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpKSkge1xuICBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xufSBlbHNlIHtcbiAgY29uc3QgbWFwTWluT25lID0gMDtcbiAgY29uc3QgbWFwTWF4T25lID0gMjtcbiAgbWFwVmVyc2lvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXBNYXhPbmUgLSBtYXBNaW5PbmUgKyAxKSArIG1hcE1pbk9uZSk7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nLCBtYXBWZXJzaW9uKTtcbn1cblxuaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtY29tcGxldGVkLWFuaW1hdGlvbi1zdG9wJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnbWFwLWNvbXBsZXRlZC1hbmltYXRpb24tc3RvcCcsIHRydWUpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC1zdHVkeS1hbmltYXRpb24tc3RvcCcpKSkge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ21hcC1zdHVkeS1hbmltYXRpb24tc3RvcCcsIHRydWUpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC1jb21wbGV0ZWQtYW5pbWF0aW9uJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnbWFwLWNvbXBsZXRlZC1hbmltYXRpb24nLCB0cnVlKTtcbn1cblxuaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtc3R1ZHktYW5pbWF0aW9uJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnbWFwLXN0dWR5LWFuaW1hdGlvbicsIHRydWUpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCd1dWlkJywgdXRpbGl0eS51dWlkKCkudG9TdHJpbmcoKSk7XG59XG5cbmlmICghdXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtc3VibWl0ZWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXN1Ym1pdGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWQtc3VibWl0ZWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkLXN1Ym1pdGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpKSkge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIGZhbHNlKTtcbn1cblxuLy8gS2lja3Mgb2ZmIHRoZSBwcm9jZXNzIG9mIGZpbmRpbmcgPGk+IHRhZ3MgYW5kIHJlcGxhY2luZyB3aXRoIDxzdmc+XG4vLyBhZGRlcyBzdXBwb3J0IGZvciBmb250YXdlc29tZVxubGlicmFyeS5hZGQoZmFzLCBmYXIpO1xuZG9tLndhdGNoKCk7XG5cbmNvbnN0IG1hcEJveENvbmZpZyA9IG5ldyBNYXBCb3hDb25maWcoKTtcbmNvbnN0IGhhbmRsZXJzID0gbmV3IEhhbmRsZXJzKCk7XG5cbi8vIGxvYWQgb25seSB0aGUgYmxvY2sgbmVlZGVkXG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQtaG9sZGVyJywgYmxvY2tTdHVkeUFnZ3JlZW1lbnQpO1xudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1kaXNzYWdncmVlLWhvbGRlcicsIGJsb2NrU3R1ZHlEaXNzYWdncmVlKTtcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktc3VzLWhvbGRlcicsIGJsb2NrU3R1ZHlTVVMpO1xudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1jb21wbGV0ZWQtaG9sZGVyJywgYmxvY2tTdHVkeUNvbXBsZXRlZCk7XG5cbmxldCBtYXAxO1xubGV0IG1hcDJhO1xubGV0IG1hcDJiO1xubGV0IG1hcDNBcnI7XG5sZXQgbWFwZGVmO1xuXG5zd2l0Y2ggKHN0dWR5VmVyc2lvbikge1xuICBjYXNlIDA6IC8vIGFuaW1hdGVcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTEtaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMSk7XG4gICAgbWFwMSA9IG1hcEJveENvbmZpZy5tYWtlQW5pbWF0ZU1hcCgnbWFwLTEnLCAwKTtcbiAgICBicmVhaztcbiAgY2FzZSAxOiAvLyBzaWRlIGJ5IHNpZGVcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTItaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMik7XG4gICAgbWFwMmEgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLTJhJywgMCk7XG4gICAgbWFwMmIgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLTJiJywgMSk7XG4gICAgbWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcDJhLCBtYXAyYik7XG4gICAgYnJlYWs7XG4gIGNhc2UgMjogLy8gc2xpZGVyXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0zLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjMpO1xuICAgIG1hcDNBcnIgPSBtYXBCb3hDb25maWcubWFrZUNvbXBhcmVNYXAoJ21hcC0zYScsICdtYXAtM2InLCAnY29tcGFyZS13cmFwcGVyJyk7XG4gICAgbWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcDNBcnJbMF0sIG1hcDNBcnJbMV0pO1xuICAgIGJyZWFrO1xuICBkZWZhdWx0OiAvLyBhbmltYXRlXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0xLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjEpO1xuICAgIG1hcGRlZiA9IG1hcEJveENvbmZpZy5tYWtlQW5pbWF0ZU1hcCgnbWFwLTEnLCAwKTtcbiAgICBicmVhaztcbn1cblxuLy8gY29tcGFyZSBtYXBzIG5lZWQgdG8gdW5jb21tZW50IGh0bWwgdG9vXG4vLyBjb25zdCBtYXBFbmRBQXJyID0gbWFwQm94Q29uZmlnLm1ha2VDb21wYXJlTWFwKCdtYXAtYy1lbmRhJywgJ21hcC1jLWVuZGInLFxuLy8gICAgICAgICdjb21wYXJlLWVuZDEtd3JhcHBlcicsIGZhbHNlLCBmYWxzZSk7XG4vLyBjb25zdCBtYXBFbmRCQXJyID0gbWFwQm94Q29uZmlnLm1ha2VDb21wYXJlTWFwKCdtYXAtYy1lbmRjJywgJ21hcC1jLWVuZGQnLFxuLy8gICAgICAgICdjb21wYXJlLWVuZDItd3JhcHBlcicsIHRydWUsIGZhbHNlKTtcbi8vIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXBFbmRBQXJyWzBdLCBtYXBFbmRBQXJyWzFdKTtcbi8vIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXBFbmRCQXJyWzBdLCBtYXBFbmRCQXJyWzFdKTtcblxuY29uc3QgbWFwRW5kYSA9IG1hcEJveENvbmZpZy5tYWtlQW5pbWF0ZU1hcCgnbWFwLWVuZGEnLCA5OSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbmNvbnN0IG1hcEVuZGIgPSBtYXBCb3hDb25maWcubWFrZUFuaW1hdGVNYXAoJ21hcC1lbmRiJywgOTksIHRydWUsIGZhbHNlLCB0cnVlKTtcblxuLy8gIHNpbmdsZSBtYXBzXG4vLyBjb25zdCBtYXBFbmRhID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC1lbmRhJywgOTksIGZhbHNlLCBmYWxzZSk7XG4vLyBjb25zdCBtYXBFbmRiID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC1lbmRiJyw5OSwgdHJ1ZSwgZmFsc2UpO1xuLy8gbWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcEVuZEFyclswXSwgbWFwRW5kQXJyWzFdKTtcblxuLy8gc3luYyBtYXBzXG5tYXBCb3hDb25maWcuc3luY01hcHMobWFwRW5kYSwgbWFwRW5kYik7XG5cbi8vIC8vIFRPRE8gb25seSBkZWFsIHdpdGggbWFwIGZvciBzdHVkeSBxdWVzdGlvblxuLy8gLy8gb25seSBsb2FkIGh0bWwgYmxvY2sgbmVlZGVkIG1hcCBvYmplY3RzIHdpbGwgaGF2ZSBnZW5lcmljIG5hbWVzIGFsc29cbmZ1bmN0aW9uIHJlc2l6ZUFsbE1hcHMoKSB7XG4gIHN3aXRjaCAoc3R1ZHlWZXJzaW9uKSB7XG4gICAgY2FzZSAwOiAvLyBhbmltYXRlXG4gICAgICBtYXAxLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOiAvLyBzaWRlIGJ5IHNpZGVcbiAgICAgIG1hcDJhLnJlc2l6ZSgpO1xuICAgICAgbWFwMmIucmVzaXplKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6IC8vIHNsaWRlclxuICAgICAgbWFwM0FyclswXS5yZXNpemUoKTtcbiAgICAgIG1hcDNBcnJbMV0ucmVzaXplKCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiAvLyBhbmltYXRlXG4gICAgICBtYXBkZWYucmVzaXplKCk7XG4gICAgICBicmVhaztcbiAgfVxuICAvLyBtYXBFbmRBQXJyWzBdLnJlc2l6ZSgpO1xuICAvLyBtYXBFbmRBQXJyWzFdLnJlc2l6ZSgpO1xuICAvLyBtYXBFbmRCQXJyWzBdLnJlc2l6ZSgpO1xuICAvLyBtYXBFbmRCQXJyWzFdLnJlc2l6ZSgpO1xuXG4gIG1hcEVuZGEucmVzaXplKCk7XG4gIG1hcEVuZGIucmVzaXplKCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnZ3JlZS1jbGlja2VkJywgKCkgPT4ge1xuICByZXNpemVBbGxNYXBzKCk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VzLWNsaWNrZWQnLCAoKSA9PiB7XG4gIHJlc2l6ZUFsbE1hcHMoKTtcbiAgbWFwRW5kYS5zZXRab29tKDUpO1xuICBtYXBFbmRhLnNldFpvb20oNSk7XG5cbiAgLy8gbWFwRW5kQUFyclswXS5zZXRab29tKDUpOztcbiAgLy8gbWFwRW5kQUFyclsxXS5zZXRab29tKDUpOztcbiAgLy8gbWFwRW5kQkFyclswXS5zZXRab29tKDUpOztcbiAgLy8gbWFwRW5kQkFyclsxXS5zZXRab29tKDUpOztcblxuICAvLyBtYXBFbmRBcnJbMF0uc2V0Wm9vbSgxMSk7XG4gIC8vIG1hcEVuZEFyclsxXS5zZXRab29tKDExKTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkaXNhZ2dyZWUtY2xpY2tlZCcsICgpID0+IHtcbiAgcmVzaXplQWxsTWFwcygpO1xufSk7XG5cbmNvbnN0IHVybFN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuY29uc3QgdXJsID0gbmV3IFVSTCh1cmxTdHJpbmcpO1xuY29uc3QgY2FtcGFpZ24gPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnY2FtcGFpZ24nKTtcblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmNvbnN0IGRhdGVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbnN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCcsIHRydWUpO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkIHRpbWUnLCBkYXRlc3RhbXApO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdjYW1wYWlnbicsIGNhbXBhaWduKTtcbnN0b3JlLnNldFN0YXRlSXRlbSgnbW9iaWxlJywgdXRpbGl0eS5pc01vYmlsZURldmljZSgpKTtcblxuLy8gYWxsIHRoZSBBZ2dyZWVtZW50IGNoYW5nZSBlbGVtZW50cyBwb3NzaWJsZVxuY29uc3QgYWdncmVtZW50Q2hhbmdlRWxlbWVudHMgPSBbJ2FnZ3JlZS1idXR0b24nXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIGFnZ3JlZSB0b1xuLy8gcGFydGljcGF0ZSBpbiBzdHVkeVxuYWdncmVtZW50Q2hhbmdlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgaGFuZGxlcnMuYWRkSGFuZGxlckFncmVlQ2xpY2soZWxlbWVudFVJSUQpO1xufSk7XG5cbi8vIGFsbCB0aGUgRGlzYWdncmVlbWVudCBjaGFuZ2UgZWxlbWVudHMgcG9zc2libGVcbmNvbnN0IGRpc2FnZ3JlbWVudENoYW5nZUVsZW1lbnRzID0gWydkaWFnZ3JlZS1idXR0b24nXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIGFnZ3JlZSB0b1xuLy8gcGFydGljcGF0ZSBpbiBzdHVkeVxuZGlzYWdncmVtZW50Q2hhbmdlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgaGFuZGxlcnMuYWRkSGFuZGxlckRpc2FncmVlQ2xpY2soZWxlbWVudFVJSUQpO1xufSk7XG5cbi8vIGFsbCB0aGUgc3VibWl0IGNoYW5nZSBlbGVtZW50cyBwb3NzaWJsZVxuY29uc3Qgc3VibWl0Q2hhbmdlRWxlbWVudHMgPSBbJ3N1Ym1pdC1idXR0b24tdG8tc3VzLTAnLCAnc3VibWl0LWJ1dHRvbi10by1zdXMtMScsICdzdWJtaXQtYnV0dG9uLXRvLXN1cy0yJ107XG5cbi8vIGVsZW1lbnRzIHRvIGFkZCB0byBVSSBhZnRlciBjbGlja2luZyBvbiBzdWJtaXQgY2hhbmdlXG4vLyBmcm9tIG9uZSBvZiB0aHJlZSBtYXAgcXVlc3Rpb25zXG5zdWJtaXRDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyU3VibWl0Q2hhbmdlQ2xpY2soZWxlbWVudFVJSUQpO1xufSk7XG5cbi8vIGFsbCB0aGUgU1VTIGNoYW5nZSBlbGVtZW50cyBwb3NzaWJsZVxuY29uc3Qgc3VzQ2hhbmdlRWxlbWVudHMgPSBbJ3N1Ym1pdC1idXR0b24tdG8tZW5kJ107XG5cbi8vIGVsZW1lbnRzIHRvIGFkZCB0byBVSSBhZnRlciBjbGlja2luZyBvbiBzdWJtaXQgY2hhbmdlXG4vLyBmcm9tIG9uZSBvZiB0aHJlZSBtYXAgcXVlc3Rpb25zXG5zdXNDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyU3VibWl0U1VTQ2xpY2soZWxlbWVudFVJSUQpO1xufSk7XG5cblxuaGFuZGxlcnMuYWRkSGFuZGxlclBsYXlDbGljaygnY29tcGxldGVkJywgJ2NvbXBsZXRlZC1wbGF5Jyk7XG5oYW5kbGVycy5hZGRIYW5kbGVyUGF1c2VDbGljaygnY29tcGxldGVkJywgJ2NvbXBsZXRlZC1wYXVzZScpO1xuaGFuZGxlcnMuYWRkSGFuZGxlckxheWVyc09mZkNsaWNrKCdjb21wbGV0ZWQnLCAnY29tcGxldGVkLXN0b3AnKTtcblxuaGFuZGxlcnMuYWRkSGFuZGxlclBsYXlDbGljaygnc3R1ZHknLCAnc3R1ZHktcGxheScpO1xuaGFuZGxlcnMuYWRkSGFuZGxlclBhdXNlQ2xpY2soJ3N0dWR5JywgJ3N0dWR5LXBhdXNlJyk7XG5oYW5kbGVycy5hZGRIYW5kbGVyTGF5ZXJzT2ZmQ2xpY2soJ3N0dWR5JywgJ3N0dWR5LXN0b3AnKTtcblxuXG4vLyBvbmx5IHVwZGF0ZXMgb25lIG1hcCBob3cgZG8gZ2V0IGV2ZXJ5IG1hcFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ3JpZC11cGRhdGUnLCAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgc3dpdGNoIChzdHVkeVZlcnNpb24pIHtcbiAgICBjYXNlIDA6IC8vIGFuaW1hdGVcbiAgICAgIG1hcDEuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTogLy8gc2lkZSBieSBzaWRlXG4gICAgICBtYXAyYS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgICAgbWFwMmIuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjogLy8gc2xpZGVyXG4gICAgICBtYXAzQXJyWzBdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBtYXAzQXJyWzFdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiAvLyBhbmltYXRlXG4gICAgICBtYXBkZWYuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIC8vIG1hcEVuZEFyclswXS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAvLyBtYXBFbmRBcnJbMV0uZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgbWFwRW5kYS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICBtYXBFbmRiLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG59KTtcblxuY29uc3Qgc3VzQnRuR3JvdXBFbGVtZW50cyA9IFsnYnRuLWdyb3VwLXN1cy0xJyxcbiAgJ2J0bi1ncm91cC1zdXMtMicsXG4gICdidG4tZ3JvdXAtc3VzLTMnLFxuICAnYnRuLWdyb3VwLXN1cy00JyxcbiAgJ2J0bi1ncm91cC1zdXMtNScsXG4gICdidG4tZ3JvdXAtc3VzLTYnLFxuICAnYnRuLWdyb3VwLXN1cy03JyxcbiAgJ2J0bi1ncm91cC1zdXMtOCcsXG4gICdidG4tZ3JvdXAtc3VzLTknLFxuICAnYnRuLWdyb3VwLXN1cy0xMCddO1xuXG5zdXNCdG5Hcm91cEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIC8vIGFkZCBxdWVzdGlvbiBoYW5kbGVyXG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTVVNRdWVzdGlvbkNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyByZW1vdmUgaW1hZ2VyeSBkaXJlY3Rpb25zIHdoZW4gbm90IGltYWdlcnlcbmlmIChtYXBWZXJzaW9uICE9PSAyKSB7XG4gIGNvbnN0IGltYWdlcnlEaXJlY3Rpb25zRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9yLXNhdCcpO1xuXG4gIGltYWdlcnlEaXJlY3Rpb25zRWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lICFpbXBvcnRhbnQnKTtcbiAgfSk7XG59XG5cbi8vIHN1cyBxdWVzdGlvbiBzdGF0ZSBpdGVtc1xuY29uc3Qgc3VzTmFtZSA9ICdzdXMtcXVlc3Rpb24tJztcbmNvbnN0IHN1c0l0ZXJhdGlvbnMgPSAxMDtcbnV0aWxpdHkuc2V0U3RhdGVGb3JHcm91cChzdXNOYW1lLCBzdXNJdGVyYXRpb25zKTtcbnV0aWxpdHkuc2V0RG9tU3RhdGVGb3JHcm91cChzdXNOYW1lLCBzdXNJdGVyYXRpb25zKTtcblxuLy8gYWRkIGdyaWQgYm94IHN0YXRlIGl0ZW1zXG5jb25zdCBncmlkSXRlcmF0aW9ucyA9IDQyO1xuY29uc3QgZ3JpZE5hbWUgPSAnZ3JpZC1ib3gtJztcbnV0aWxpdHkuc2V0U3RhdGVGb3JHcm91cChncmlkTmFtZSwgZ3JpZEl0ZXJhdGlvbnMpO1xuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBjb21wbGV0ZXRpb25cbmNvbnN0IGlzU3R1ZHljb21wbGV0ZWQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWNvbXBsZXRlZCcpO1xubGV0IHN0dWR5Q29tcGxldGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIGlzU3R1ZHljb21wbGV0ZWQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUNvbXBsZXRlZCA9IGlzU3R1ZHljb21wbGV0ZWQ7XG59IGVsc2Uge1xuICBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBhZ2dyZWVpbmcgdG8gc3R1ZHlcbmNvbnN0IFN0dWR5QWdycmVlbWVudCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG5sZXQgc3R1ZHlBZ3JyZWVkID0gZmFsc2U7XG5pZiAodHlwZW9mIFN0dWR5QWdycmVlbWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gIHN0dWR5QWdycmVlZCA9IFN0dWR5QWdycmVlbWVudDtcbn0gZWxzZSB7XG4gIHN0dWR5QWdycmVlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBzdWJtaXR0aW5nIHN0dWR5XG5jb25zdCBncmlkU3VibWl0ZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZC1zdWJtaXRlZCcpO1xubGV0IGdyaWRTdWJtaXRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBncmlkU3VibWl0ZWRTdGF0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gIGdyaWRTdWJtaXRlZCA9IGdyaWRTdWJtaXRlZFN0YXRlO1xufSBlbHNlIHtcbiAgZ3JpZFN1Ym1pdGVkID0gZmFsc2U7XG59XG5cbi8vIGNoZWNrIHN0dWR5IHNlc3Npb24gc3RhdGUgZm9yIHN1Ym1pdHRpbmcgc3VzIHF1ZXN0aW9uc1xuY29uc3Qgc3VzU3VibWl0ZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy1zdWJtaXRlZCcpO1xubGV0IHN1c1N1Ym1pdGVkID0gZmFsc2U7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbmlmICh0eXBlb2YgZ3JpZFN1Ym1pdGVkU3RhdGUgPT09ICdib29sZWFuJykge1xuICBzdXNTdWJtaXRlZCA9IHN1c1N1Ym1pdGVkU3RhdGU7XG59IGVsc2Uge1xuICBzdXNTdWJtaXRlZCA9IGZhbHNlO1xufVxuXG4vLyBzdWJtaXQgYnV0dG9uc1xuY29uc3QgYWdncmVtZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2dyZWUtYnV0dG9uJyk7XG5jb25zdCBkaWFnZ3JlZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhZ2dyZWUtYnV0dG9uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbmNvbnN0IGdyaWRTdWJtaXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHN1Ym1pdC1idXR0b24tdG8tc3VzLSR7c3R1ZHlWZXJzaW9ufWApO1xuY29uc3QgY29tcGxldGVkU3VibWl0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtYnV0dG9uLXRvLWVuZCcpO1xuXG5pZiAoc3R1ZHlBZ3JyZWVkKSB7XG4gIHN3aXRjaCAoVVJMUGF0aCkge1xuICAgIGNhc2UgJyMnOlxuICAgICAgaWYgKHN0dWR5QWdycmVlZCkge1xuICAgICAgICBpZiAoYWdncmVtZW50RWxlbWVudCkge1xuICAgICAgICAgIGFnZ3JlbWVudEVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnI21hcCc6XG4gICAgICBpZiAoc3R1ZHlBZ3JyZWVkKSB7XG4gICAgICAgIGlmIChhZ2dyZW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgYWdncmVtZW50RWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICcjc3VzLXF1ZXN0aW9ucyc6XG4gICAgICBpZiAoZ3JpZFN1Ym1pdGVkKSB7XG4gICAgICAgIGlmIChncmlkU3VibWl0RWxlbWVudCkge1xuICAgICAgICAgIGdyaWRTdWJtaXRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAoc3R1ZHlBZ3JyZWVkKSB7XG4gICAgICAgIGlmIChhZ2dyZW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgYWdncmVtZW50RWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIChldmVudCkgPT4ge1xuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG59KTtcblxuLy8gaGlkZSBzdHVkeVxuaWYgKHN0dWR5Q29tcGxldGVkKSB7XG4gIGlmIChjb21wbGV0ZWRTdWJtaXRFbGVtZW50KSB7XG4gICAgY29tcGxldGVkU3VibWl0RWxlbWVudC5jbGljaygpO1xuICB9XG59XG4iLCJpbXBvcnQgbWFwYm94Z2wgZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCBNYXBib3hDb21wYXJlIGZyb20gJ21hcGJveC1nbC1jb21wYXJlJztcbmltcG9ydCB7IHBvbHlnb24sIGZlYXR1cmVDb2xsZWN0aW9uIH0gZnJvbSAnQHR1cmYvaGVscGVycyc7XG5pbXBvcnQgYnVmZmVyIGZyb20gJ0B0dXJmL2J1ZmZlcic7XG5pbXBvcnQgYmJveFBvbHlnb24gZnJvbSAnQHR1cmYvYmJveC1wb2x5Z29uJztcbmltcG9ydCBiYm94IGZyb20gJ0B0dXJmL2Jib3gnO1xuaW1wb3J0IGVudmVsb3BlIGZyb20gJ0B0dXJmL2VudmVsb3BlJztcbmltcG9ydCB7IFV0aWxpdHkgfSBmcm9tICcuL3V0aWxpdHknO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTk9uZSBmcm9tICcuL3NxdWFyZS1ncmlkLWdlb2pzb24uanNvbic7XG5pbXBvcnQgU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQgZnJvbSAnLi9zcXVhcmUtZ3JpZC1nZW9qc29uLXNlY29uZC5qc29uJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkIGZyb20gJy4vc3F1YXJlLWdyaWQtZ2VvanNvbi10aGlyZC5qc29uJztcblxuXG5jb25zdCBzeW5jTW92ZSA9IHJlcXVpcmUoJ0BtYXBib3gvbWFwYm94LWdsLXN5bmMtbW92ZScpO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuZXhwb3J0IGNsYXNzIE1hcEJveENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGRlZmF1bHRzIGZvciBncmlkIGJveGVzXG4gICAgY29uc3QgYnVmZkRpc3QgPSA0O1xuICAgIGNvbnN0IGJ1ZmZVbml0cyA9IHsgdW5pdHM6ICdtaWxlcycgfTtcbiAgICBjb25zdCBpa0JveCA9IGJib3goZW52ZWxvcGUoU3F1YXJlR3JpZEdlb0pTT05PbmUpKTtcbiAgICBjb25zdCBoc3RuQm94ID0gYmJveChlbnZlbG9wZShTcXVhcmVHcmlkR2VvSlNPTlNlY29uZCkpO1xuICAgIGNvbnN0IGx2Qm94ID0gYmJveChlbnZlbG9wZShTcXVhcmVHcmlkR2VvSlNPTlRoaXJkKSk7XG5cbiAgICBjb25zdCBpa01heEJveCA9IGJib3goYnVmZmVyKGJib3hQb2x5Z29uKGlrQm94KSwgYnVmZkRpc3QsIGJ1ZmZVbml0cykpO1xuICAgIGNvbnN0IGhzdG5NYXhCb3ggPSBiYm94KGJ1ZmZlcihiYm94UG9seWdvbihoc3RuQm94KSwgYnVmZkRpc3QsIGJ1ZmZVbml0cykpO1xuICAgIGNvbnN0IGx2TWF4Qm94ID0gYmJveChidWZmZXIoYmJveFBvbHlnb24obHZCb3gpLCBidWZmRGlzdCwgYnVmZlVuaXRzKSk7XG5cbiAgICB0aGlzLm1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgc3dpdGNoICh0aGlzLm1hcFZlcnNpb24pIHtcbiAgICAgIGNhc2UgMDogLy8gYXZsXG4gICAgICAgIGlmICh1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpKSkge1xuICAgICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IFNxdWFyZUdyaWRHZW9KU09OT25lO1xuICAgICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nLCBTcXVhcmVHcmlkR2VvSlNPTk9uZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6IC8vIGhzdG5cbiAgICAgICAgaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJykpKSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQ7XG4gICAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIFNxdWFyZUdyaWRHZW9KU09OU2Vjb25kKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjogLy8gbHZcbiAgICAgICAgaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJykpKSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gU3F1YXJlR3JpZEdlb0pTT05UaGlyZDtcbiAgICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05UaGlyZCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBhdmxcbiAgICAgICAgaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJykpKSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gU3F1YXJlR3JpZEdlb0pTT05PbmU7XG4gICAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIFNxdWFyZUdyaWRHZW9KU09OT25lKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmRlZmF1bHRNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJztcbiAgICB0aGlzLmRlZmF1bHRNYXBDZW50ZXIgPSBbLTgyLjU3MCwgMzUuNTYwXTsgLy8gc3RhcnRpbmcgcG9zaXRpb24gW2xuZywgbGF0XVxuICAgIHRoaXMuZGVmYXVsdE1heEJvdW5kcyA9IFstODIuNzAyLCAzNS40NjMsIC04Mi40NDIsIDM1LjY1N107XG4gICAgdGhpcy5kZWZhdWx0TWFwWm9vbSA9IDU7IC8vIHN0YXJ0aW5nIHpvb21cbiAgICB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIgPSAnbWFwJztcbiAgICB0aGlzLmRhcmtNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L2RhcmstdjEwJztcbiAgICB0aGlzLmxpZ2h0TWFwU3R5bGUgPSAnbWFwYm94Oi8vc3R5bGVzL21hcGJveC9saWdodC12MTAnO1xuICAgIHRoaXMubWFwYm94Z2wgPSBtYXBib3hnbDtcbiAgICB0aGlzLk1hcGJveENvbXBhcmUgPSBNYXBib3hDb21wYXJlO1xuICAgIHRoaXMubWFwYm94Z2wuYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2laR0YyWldsemJTSXNJbUVpT2lKQ2RqVXhUMEZ6SW4wLlY5b0lrX3dVYzR1WnU3VUJibFI4bXcnO1xuICAgIHRoaXMucXVpZXQgPSB0cnVlO1xuICAgIHRoaXMubWFwMSA9IG51bGw7XG4gICAgdGhpcy5tYXAyID0gbnVsbDtcbiAgICB0aGlzLmRlZmF1bHRHcmV5Qm94ID0gJyM1NTU1NTUnO1xuICAgIHRoaXMuc2VsZWN0ZWRCb3ggPSAnI0ZCQjAzQic7XG4gICAgdGhpcy5tYXBDaGFuZ2VMYXllcnMgPSB7XG4gICAgICBsYXllcnM6IFtcbiAgICAgICAgWyAvLyBhdmwgMFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9pa25vd18xL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICAgICAgbWF4em9vbTogMTQsXG4gICAgICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgICAgIGJvdW5kczogaWtCb3gsXG4gICAgICAgICAgICBtYXhib3VuZHM6IGlrTWF4Qm94XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvaWtub3dfMi97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IGlrQm94LFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBpa01heEJveFxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgWyAvLyBoc3RuIDFcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvbGFuZGNvdmVyXzEve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBoc3RuQm94LFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBoc3RuTWF4Qm94XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvbGFuZGNvdmVyXzIve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBoc3RuQm94LFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBoc3RuTWF4Qm94XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBbIC8vIGx2IDJcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvbGFrZW1lYWRfMS97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IGx2Qm94LFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBsdk1heEJveFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2xha2VtZWFkXzIve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBsdkJveCxcbiAgICAgICAgICAgIG1heGJvdW5kczogbHZNYXhCb3hcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUgPSBbXG4gICAgICAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL25sY2QtMjAxNi0zMC97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9ubGNkLTIwMDEtMzAve3p9L3t4fS97eX0ucG5nJ1xuICAgIF07XG4gIH1cblxuICAvLyBTZXRzIGFuIGluZGl2aWR1YWwgbWFwYm94IG1hcCB0ZXN0XG4gIC8vXG4gIC8vIEBwYXJhbSBtYXBDb250YWluZXIgLSBzdHJpbmdcbiAgLy8gQHJldHVybiBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZU1hcChtYXBDb250YWluZXIgPSB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIsIG1hcEluZGV4ID0gMCwgZW5kID0gZmFsc2UsIGVuYWJsZWNsaWNrID0gdHJ1ZSkge1xuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG4gICAgbGV0IG1hcEluZGV4Qm91bmRzID0gdGhpcy5kZWZhdWx0TWF4Qm91bmRzO1xuICAgIGlmIChtYXBJbmRleCA9PT0gOTkpIHtcbiAgICAgIG1hcEluZGV4Qm91bmRzID0gbWFwU2V0dXBbMF0ubWF4Ym91bmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXBJbmRleEJvdW5kcyA9IG1hcFNldHVwW21hcEluZGV4XS5tYXhib3VuZHM7XG4gICAgfVxuICAgIGNvbnN0IG1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcENvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIHpvb206IHRoaXMuZGVmYXVsdE1hcFpvb20sXG4gICAgICBzaG93Wm9vbTogdHJ1ZSxcbiAgICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgICAgbWF4Qm91bmRzOiBtYXBJbmRleEJvdW5kc1xuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMobWFwKTtcbiAgICAgIGlmIChtYXBJbmRleCAhPT0gOTkpIHtcbiAgICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCBtYXBJbmRleCkpO1xuICAgICAgfVxuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkQ29ycmVjdExheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRMYXllcigpKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmFibGVjbGljaykge1xuICAgICAgICB0aGlzLmFkZEdyaWRDbGljayhtYXApO1xuICAgICAgfVxuICAgICAgbWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBtYXAucmVzaXplKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbWFwLnJlc2l6ZSgpOyB9LCAxMCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIG1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG1hcC5yZXNpemUoKTsgfSwgMTApO1xuICAgIH07XG4gICAgbWFwLmFkZENvbnRyb2wobmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKHsgc2hvd0NvbXBhc3M6IGZhbHNlIH0pLCAndG9wLWxlZnQnKTtcbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgLy8gU2V0cyB1cCBhbmltYXRlZCBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG1hcENvbnRhaW5lciAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIG5ldyBtYXBib3ggbWFwIG9iamVjdFxuICBtYWtlQW5pbWF0ZU1hcChtYXBDb250YWluZXIgPSB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIsXG4gICAgbWFwSW5kZXggPSAwLCBlbmQgPSBmYWxzZSwgZW5hYmxlY2xpY2sgPSB0cnVlLCBlbmRtYXBzID0gZmFsc2UpIHtcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuXG4gICAgY29uc3QgbWFwID0gbmV3IHRoaXMubWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogbWFwQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMuZGFya01hcFN0eWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmRlZmF1bHRNYXBDZW50ZXIsXG4gICAgICB6b29tOiB0aGlzLmRlZmF1bHRNYXBab29tLFxuICAgICAgc2hvd1pvb206IHRydWUsXG4gICAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgICBrZXliaW5kaW5nczogdHJ1ZSxcbiAgICAgIG1heEJvdW5kczogbWFwU2V0dXBbMF0ubWF4Ym91bmRzXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ2xvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5maXRNeUJvdW5kcyhtYXApO1xuICAgICAgLy8gaWYgKGVuZCkge1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAwKSk7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlVE1TTGF5ZXIodGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUsIDEpKTtcbiAgICAgIC8vIH1cbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZENvcnJlY3RMYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkTGF5ZXIoKSk7XG4gICAgICB9XG4gICAgICBpZiAoZW5hYmxlY2xpY2spIHtcbiAgICAgICAgdGhpcy5hZGRHcmlkQ2xpY2sobWFwKTtcbiAgICAgIH1cbiAgICAgIG1hcC5yZXNpemUoKTtcblxuICAgICAgY29uc3QgaW5kZXhDb3VudCA9IDI7XG4gICAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIC8vIHNlZSBpZiB1c2VyIHBhdXNlZCBhbmltYXRpb25cbiAgICAgICAgaWYgKGVuZG1hcHMpIHtcbiAgICAgICAgICBjb25zdCBrZWVwR29pbmcgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC1jb21wbGV0ZWQtYW5pbWF0aW9uJyk7XG4gICAgICAgICAgaWYgKCFrZWVwR29pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBrZWVwR29pbmdTdG9wID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtY29tcGxldGVkLWFuaW1hdGlvbi1zdG9wJyk7XG4gICAgICAgICAgaWYgKCFrZWVwR29pbmdTdG9wKSB7XG4gICAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMScsICd2aXNpYmlsaXR5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0wJywgJ3Zpc2liaWxpdHknLCAnbm9uZScpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGtlZXBHb2luZyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXN0dWR5LWFuaW1hdGlvbicpO1xuICAgICAgICAgIGlmICgha2VlcEdvaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBrZWVwR29pbmdTdG9wID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtc3R1ZHktYW5pbWF0aW9uLXN0b3AnKTtcbiAgICAgICAgICBpZiAoIWtlZXBHb2luZ1N0b3ApIHtcbiAgICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0xJywgJ3Zpc2liaWxpdHknLCAnbm9uZScpO1xuICAgICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTAnLCAndmlzaWJpbGl0eScsICdub25lJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbmRleCA9IChpbmRleCArIDEpICUgaW5kZXhDb3VudDtcbiAgICAgICAgaWYgKGluZGV4ID09PSAxKSB7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTEnLCAndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTAnLCAndmlzaWJpbGl0eScsICdub25lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTAnLCAndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTEnLCAndmlzaWJpbGl0eScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgbWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBtYXAucmVzaXplKCk7XG4gICAgfTtcbiAgICAvLyBBZGQgem9vbSBhbmQgcm90YXRpb24gY29udHJvbHMgdG8gdGhlIG1hcC5cbiAgICBtYXAuYWRkQ29udHJvbChuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woeyBzaG93Q29tcGFzczogZmFsc2UgfSksICd0b3AtbGVmdCcpO1xuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICAvLyBtYWtlQ29tcGFyZU1hcCBTZXRzIGFuIGNvbXBhcmluZyBtYXAgXCJzd2lwaW5nXCIgbWFwYm94IG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbWFwQ29udGFpbmVyIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYXJyYXkgb2YgbWFwcyBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZUNvbXBhcmVNYXAobWFwQmVmb3JlQ29udGFpbmVyLCBtYXBBZnRlckNvbnRhaW5lciwgbWFwQ29tcGFyZVdyYXBwZXJJRCxcbiAgICBlbmQgPSBmYWxzZSwgZW5hYmxlY2xpY2sgPSB0cnVlKSB7XG4gICAgY29uc3QgbWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBtYXBTZXR1cCA9IHRoaXMubWFwQ2hhbmdlTGF5ZXJzLmxheWVyc1ttYXBWZXJzaW9uXTtcblxuICAgIGNvbnN0IGJlZm9yZU1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcEJlZm9yZUNvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgICBtYXhCb3VuZHM6IG1hcFNldHVwWzBdLm1heGJvdW5kc1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWZ0ZXJNYXAgPSBuZXcgdGhpcy5tYXBib3hnbC5NYXAoe1xuICAgICAgY29udGFpbmVyOiBtYXBBZnRlckNvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgICBtYXhCb3VuZHM6IG1hcFNldHVwWzFdLm1heGJvdW5kc1xuICAgIH0pO1xuICAgIGNvbnN0IGNvbXBhcmUgPSBuZXcgdGhpcy5NYXBib3hDb21wYXJlKGJlZm9yZU1hcCwgYWZ0ZXJNYXAsIGAjJHttYXBDb21wYXJlV3JhcHBlcklEfWApO1xuXG4gICAgYmVmb3JlTWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMoYmVmb3JlTWFwKTtcbiAgICAgIGJlZm9yZU1hcC5hZGRMYXllcih0aGlzLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgMSkpOyAvLyBuZWVkcyB1cGRhdGVcbiAgICAgIGJlZm9yZU1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICBiZWZvcmVNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZENvcnJlY3RMYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJlZm9yZU1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkTGF5ZXIoKSk7XG4gICAgICB9XG4gICAgICBpZiAoZW5hYmxlY2xpY2spIHtcbiAgICAgICAgdGhpcy5hZGRHcmlkQ2xpY2soYmVmb3JlTWFwKTtcbiAgICAgIH1cbiAgICAgIGJlZm9yZU1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgYmVmb3JlTWFwLnJlc2l6ZSgpO1xuICAgICAgY29tcGFyZS5zZXRTbGlkZXIoMTUwKTtcbiAgICB9KTtcblxuICAgIGFmdGVyTWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMoYWZ0ZXJNYXApO1xuICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlVE1TTGF5ZXIodGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUsIDApKTsgLy8gbmVlZHMgdXBkYXRlXG4gICAgICBhZnRlck1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICBhZnRlck1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkQ29ycmVjdExheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgfVxuICAgICAgaWYgKGVuYWJsZWNsaWNrKSB7XG4gICAgICAgIHRoaXMuYWRkR3JpZENsaWNrKGFmdGVyTWFwKTtcbiAgICAgIH1cbiAgICAgIGFmdGVyTWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBhZnRlck1hcC5yZXNpemUoKTtcbiAgICAgIGNvbXBhcmUuc2V0U2xpZGVyKDE1MCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIGFmdGVyTWFwLnJlc2l6ZSgpO1xuICAgICAgYmVmb3JlTWFwLnJlc2l6ZSgpO1xuICAgICAgY29tcGFyZS5zZXRTbGlkZXIoMTUwKTtcbiAgICB9O1xuICAgIC8vIEFkZCB6b29tIGFuZCByb3RhdGlvbiBjb250cm9scyB0byB0aGUgbWFwLlxuICAgIGJlZm9yZU1hcC5hZGRDb250cm9sKG5ldyBtYXBib3hnbC5OYXZpZ2F0aW9uQ29udHJvbCh7IHNob3dDb21wYXNzOiBmYWxzZSB9KSwgJ3RvcC1sZWZ0Jyk7XG4gICAgYWZ0ZXJNYXAuYWRkQ29udHJvbChuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woeyBzaG93Q29tcGFzczogZmFsc2UgfSksICd0b3AtbGVmdCcpO1xuICAgIHJldHVybiBbYmVmb3JlTWFwLCBhZnRlck1hcF07XG4gIH1cblxuICAvLyBzeW5jcyB0d28gbWFwcyB6b29tIGFuZCBwYW5cbiAgLy8gbW9kaWZlZCBmcm9tIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC5qcy9leGFtcGxlL3YxLjAuMC9zeW5jLWxheWVyLW1vdmVtZW50L1xuICAvL1xuICAvLyBAcGFyYW0gbWFwMSA9IGZpcnN0IG1hcGJveCBtYXAgb2JqZWN0XG4gIC8vIEBwYXJhbSBtYXAyICA9IHNlY29uZCBtYXBib3ggbWFwIG9iamVjdFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc3luY01hcHMobWFwMSwgbWFwMikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgc3luY01vdmUobWFwMSwgbWFwMik7XG4gIH1cblxuICBtYWtlVE1TTGF5ZXIobWFwQ2hhbmdlLCBtYXBJbmRleCkge1xuICAgIC8vIHN0dWR5IGNvbnN0cmFpbnRzIG51bWJlciBvZiBxdWVzdGlvbnMgc3RhcnRzIHdpdGggMFxuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGBtYXAtY2hhbmdlLSR7bWFwSW5kZXh9YCxcbiAgICAgIHR5cGU6ICdyYXN0ZXInLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdyYXN0ZXInLFxuICAgICAgICB0aWxlczogW21hcFNldHVwW21hcEluZGV4XS51cmxdLFxuICAgICAgICBtaW56b29tOiBtYXBTZXR1cFttYXBJbmRleF0ubWluem9vbSxcbiAgICAgICAgbWF4em9vbTogbWFwU2V0dXBbbWFwSW5kZXhdLm1heHpvb20sXG4gICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgIGJvdW5kczogbWFwU2V0dXBbbWFwSW5kZXhdLmJvdW5kcyxcbiAgICAgICAgbWF4Qm91bmRzOiBtYXBTZXR1cFttYXBJbmRleF0ubWF4Ym91bmRzXG4gICAgICB9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ3Jhc3Rlci1mYWRlLWR1cmF0aW9uJzogMFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBtYWtlcyBjaGFuZ2UgZ3JpZCBsYXllciBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIG1ha2VHcmlkTGF5ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnY2hhbmdlLWdyaWQnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgZGF0YTogdGhpcy5zcXVhcmVHcmlkR2VvSlNPTlxuICAgICAgfSxcbiAgICAgIGxheW91dDoge30sXG4gICAgICBwYWludDoge1xuICAgICAgICAnZmlsbC1jb2xvcic6IFtcbiAgICAgICAgICAnbWF0Y2gnLFxuICAgICAgICAgIFsnZ2V0JywgJ3NlbGVjdGVkJ10sXG4gICAgICAgICAgMSwgdGhpcy5zZWxlY3RlZEJveCxcbiAgICAgICAgICAvKiBvdGhlciAqLyB0aGlzLmRlZmF1bHRHcmV5Qm94XG4gICAgICAgIF0sXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiAwLjVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gbWFrZXMgY2hhbmdlIGdyaWQgbGF5ZXIgd2hhdCBjb3JyZWN0IG9uIG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgbWFrZUdyaWRDb3JyZWN0TGF5ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnY2hhbmdlLWdyaWQnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgZGF0YTogdGhpcy5zcXVhcmVHcmlkR2VvSlNPTlxuICAgICAgfSxcbiAgICAgIGxheW91dDoge30sXG4gICAgICBwYWludDoge1xuICAgICAgICAnZmlsbC1jb2xvcic6IFtcbiAgICAgICAgICAnbWF0Y2gnLFxuICAgICAgICAgIFsnZ2V0JywgJ3YnXSxcbiAgICAgICAgICAxLCB0aGlzLnNlbGVjdGVkQm94LFxuICAgICAgICAgIC8qIG90aGVyICovIHRoaXMuZGVmYXVsdEdyZXlCb3hcbiAgICAgICAgXSxcbiAgICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuNVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBtYWtlcyBjaGFuZ2UgZ3JpZCBsYXllciBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIG1ha2VHcmlkT3V0TGluZUxheWVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ2NoYW5nZS1ncmlkLW91dGxpbmUnLFxuICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgZGF0YTogdGhpcy5zcXVhcmVHcmlkR2VvSlNPTlxuICAgICAgfSxcbiAgICAgIGxheW91dDoge1xuICAgICAgICAnbGluZS1qb2luJzogJ3JvdW5kJyxcbiAgICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJ1xuICAgICAgfSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdsaW5lLWNvbG9yJzogdGhpcy5kZWZhdWx0R3JleUJveCxcbiAgICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIGFkZHMgY2xpY2sgb2YgZ3JpZCBib3ggdG8gY2FwdHVyZSB3aGljaCBncmlkIHRoZSB1c2VyXG4gIC8vIHRoaW5rcyBjaGFuZ2UgaGFwcGVuZCBpbiBvcmdpbmFsIGZyb206XG4gIC8vIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC1nbC1qcy9leGFtcGxlL3BvbHlnb24tcG9wdXAtb24tY2xpY2svXG4gIC8vXG4gIC8vIEBwYXJhbSBtYXAgPSBtYXBib3ggbWFwIG9iamVjdCB0byB1cGRhdGUgem9vbSBhbmQgY2VudGVyIHRvXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRHcmlkQ2xpY2sobWFwKSB7XG4gICAgLy8gY29uc3QgbWFrZUdyaWRMYXllciA9IHRoaXMubWFrZUdyaWRMYXllcigpO1xuICAgIC8vIFdoZW4gYSBjbGljayBldmVudCBvY2N1cnMgb24gYSBmZWF0dXJlIGluIHRoZSBzdGF0ZXMgbGF5ZXIsIG9wZW4gYSBwb3B1cCBhdCB0aGVcbiAgICAvLyBsb2NhdGlvbiBvZiB0aGUgY2xpY2ssIHdpdGggZGVzY3JpcHRpb24gSFRNTCBmcm9tIGl0cyBwcm9wZXJ0aWVzLlxuICAgIG1hcC5vbignbW91c2VlbnRlcicsICdjaGFuZ2UtZ3JpZCcsIChlKSA9PiB7XG4gICAgICBtYXAuZ2V0Q2FudmFzKCkuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ21vdXNlbGVhdmUnLCAnY2hhbmdlLWdyaWQnLCAoZSkgPT4ge1xuICAgICAgbWFwLmdldENhbnZhcygpLnN0eWxlLmN1cnNvciA9ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ2NsaWNrJywgJ2NoYW5nZS1ncmlkJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGZlYXR1cmUgPSBlLmZlYXR1cmVzWzBdO1xuICAgICAgY29uc3QgaWQgPSBOdW1iZXIoZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcblxuICAgICAgLy8gdWRwYXRlcyBzZWxlY3RlZCBnZW9qc29uIHByb3Blcml0ZXMuc2VsZWN0ZWQgMCBvciAxIGRlcGVuZWRpbmdcbiAgICAgIC8vIGlmIHVzZXIgc2VsZWN0ZWQgcG9seWdvblxuICAgICAgY29uc3QgbmV3RmVhdHVyZSA9IE1hcEJveENvbmZpZy50b2dnbGVTZWxlY3RlZEZlYXR1cmUoZmVhdHVyZSk7XG5cbiAgICAgIC8vIGNyZWF0ZSBhIG5ldyBmZWF0dXJlIGNvbGxlY3Rpb24gZnJvbSBzZWxlY3RlZCBmZWF0dXJlXG4gICAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmVzID0gTWFwQm94Q29uZmlnLm1ha2VTZWxlY3RlZEZlYXR1cmVHZW9KU09OKG5ld0ZlYXR1cmUpO1xuXG4gICAgICAvLyB1cGRhdGVzIHNxdWFyZUdyaWRHZW9KU09OIHdpdGggbmV3IGdlb2pzb25cbiAgICAgIGNvbnN0IG5ld1NxdWFyZUdyaWRHZW9KU09OID0gTWFwQm94Q29uZmlnLnVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyhzZWxlY3RlZEZlYXR1cmVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICAvLyBzdG9yZSBuZXcgc3F1YXJlIGdyaWQgd2l0aCBzbGVjdGVkIGJveGVzXG4gICAgICB0aGlzLnN0b3JlU3F1YXJlR3JpZChuZXdTcXVhcmVHcmlkR2VvSlNPTik7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSB3aXRoIHNlbGVjdGVkIGZlYXR1cmVcbiAgICAgIE1hcEJveENvbmZpZy5zdG9yZVNlbGVjdGVkRmVhdHVyZShpZCk7XG5cbiAgICAgIC8vIHRpZ2dlciBldmVudCBzbyBhbGwgZGF0YSBzb3VyY2VzIHVwZGF0ZVxuICAgICAgdXRpbGl0eS50cmlnZ2VyRXZlbnQoJ2dyaWQtdXBkYXRlJywgaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gdG9nZ2xlcyB2YWx1ZSB0aGUgcHJvcGVydGllcyAoYXR0cmlidXRlKSBzZWxlY3RlZFxuICAvLyAgICB3aGVuIGEgdXNlciBjbGlja3MgdGhlIGdyaWQgYm94ID4gMCB3aGVuIHNlbGVjdGVkXG4gIC8vICAgIDAgd2hlbiBzZWxlY3RlXG4gIC8vXG4gIC8vIEBwYXJhbSBmZWF0dXJlID0gZ2VvanNvbiBmZWF0dXJlIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gZmVhdHVyZSA9IGdlb2pzb24gZmVhdHVyZVxuICBzdGF0aWMgdG9nZ2xlU2VsZWN0ZWRGZWF0dXJlKGZlYXR1cmUpIHtcbiAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnNlbGVjdGVkID09PSAwKSB7XG4gICAgICBmZWF0dXJlLnByb3BlcnRpZXMuc2VsZWN0ZWQgPSAxOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGZlYXR1cmUucHJvcGVydGllcy5zZWxlY3RlZCA9IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG4gICAgcmV0dXJuIGZlYXR1cmU7XG4gIH1cblxuICAvLyBzZXRzIHRoZSBzZWxlY3RlZCBmZWF0dXJlIGluIHN0YXRlID4gMCB3aGVuIHNlbGVjdGVkXG4gIC8vICAgIDAgd2hlbiBzZWxlY3RlXG4gIC8vXG4gIC8vIEBwYXJhbSBpZCA9IG51bWJlciB3aGljaCByZXByZXNlbnRzIHRoZSBmZWF0dXJlIGlkXG4gIC8vIEByZXR1cm4gbnVsbFxuICBzdGF0aWMgc3RvcmVTZWxlY3RlZEZlYXR1cmUoaWQpIHtcbiAgICBjb25zdCBncmlkTmFtZSA9ICdncmlkLWJveC0nO1xuICAgIC8vIHplcm8gb3V0IFwidG9nZ2xlIG9mZlwiIGlmIGdyaWQgaWQgZXhpc3RzIHN0YXRlIGl0ZW1cbiAgICBpZiAoc3RvcmUuZ2V0U3RhdGVJdGVtKGAke2dyaWROYW1lfSR7aWR9YCkgPiAwKSB7XG4gICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYCR7Z3JpZE5hbWV9JHtpZH1gLCAwKTtcbiAgICAvLyBhZGQgXCJ0b2dnbGUgb25cIiBpZiAgc3RhdGUgaXRlbSA+IDAgb3Igbm90IHNlbGVjdGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShgJHtncmlkTmFtZX0ke2lkfWAsIE51bWJlcihpZCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIG1ha2VzIHRoZSBzZWxlY3RlZCBmZWF0dXJlIGEgbmV3IGZlYXR1cmUgY29sbGVjdGlvblxuICAvL1xuICAvLyBAcGFyYW0gZmVhdHVyZSA9IGdlb2pzb24gZmVhdHVyZSAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uIChmcm9tIHR1cmYuanMpXG4gIHN0YXRpYyBtYWtlU2VsZWN0ZWRGZWF0dXJlR2VvSlNPTihmZWF0dXJlKSB7XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKFtwb2x5Z29uKGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIGZlYXR1cmUucHJvcGVydGllcyldKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZXMgdGhlIFNxdWFyZUdyaWRHZW9KU09OIGFmdGVyIG1lcmdpbmcgYW5kIHJlY29uY2lsaW5nXG4gIC8vICAgIHdpdGggdGhlIHNlbGVjdGVkIGZlYXV0dXJlc1xuICAvL1xuICAvLyBAcGFyYW0gc2VsZWN0ZWRGZWF0dXJlcyA9IGdlb2pzb24gZmVhdHVyZWNvbGxlY3RvbiByZXByZXNlbnRpbmcgdGhlIHNlbGVjdGVkXG4gIC8vICAgICAgICBmZWF0dXJlcyAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uIChmcm9tIHR1cmYuanMpXG4gIHN0YXRpYyB1cGRhdGVTcXVhcmVHcmlkV2l0aFNlbGVjdGVkRmVhdHVyZXMoc2VsZWN0ZWRGZWF0dXJlcykge1xuICAgIGNvbnN0IGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICBjb25zdCBjdXJyZW50RmVhdHVyZUlkcyA9IHNlbGVjdGVkRmVhdHVyZXMuZmVhdHVyZXMubWFwKGZlYXR1cmUgPT4gZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oc2VsZWN0ZWRGZWF0dXJlcy5mZWF0dXJlcy5jb25jYXQoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OLmZlYXR1cmVzLmZpbHRlcihmZWF0dXJlID0+ICFjdXJyZW50RmVhdHVyZUlkcy5pbmNsdWRlcyhmZWF0dXJlLnByb3BlcnRpZXMuaWQpKSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICAvLyB1cGRhdGVzIHN0YXRlIHdpdGggdGhlIG5ldyB2ZXJzaW9uIG9mIFNxdWFyZUdyaWRHZW9KU09OXG4gIC8vICAgIGNvbnRhaW5zIHNlbGVjdGVkIGZlYXR1cmVzIGFsc28gKGlmIGFueSBzZWxlY3RlZClcbiAgLy9cbiAgLy8gQHBhcmFtIE5ld1NxdWFyZUdyaWRHZW9KU09OID0gZ2VvanNvbiBmZWF0dXJlY29sbGVjdG9uIHJlcHJlc2VudGluZ1xuICAvLyAgICAgICAgICAgICAgICB0aGUgbmV3IGZlYXR1cmVzIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gbnVsbFxuICBzdG9yZVNxdWFyZUdyaWQoTmV3U3F1YXJlR3JpZEdlb0pTT04pIHtcbiAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gTmV3U3F1YXJlR3JpZEdlb0pTT047XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIE5ld1NxdWFyZUdyaWRHZW9KU09OKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZpdE15Qm91bmRzKG1hcCkge1xuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG4gICAgY29uc3QgYm91bmRzID0gbWFwU2V0dXBbMF0ubWF4Ym91bmRzO1xuICAgIG1hcC5maXRCb3VuZHMoYm91bmRzLCB7IHBhZGRpbmc6IDEwMCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgZGF0YXBpID0gJ2h0dHBzOi8vc2NyaXB0Lmdvb2dsZS5jb20vbWFjcm9zL3MvQUtmeWNieFJQOVBWQ1NKN1lvNF9YWXRxa3p1U3BIZjBjT0FuMW5vRktqZHFuZmZCZlMyWkV6dy9leGVjJztcblxuZXhwb3J0IGNsYXNzIFJlY29yZFN0dWR5RGF0YSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9vID0ge307XG4gICAgdGhpcy5kYXRhcGkgPSBkYXRhcGk7XG4gIH1cblxuICBzZXRFdmVudChhY3Rpb24gPSAnJywgY2F0ZWdvcnkgPSAnJywgbGFiZWwgPSAnJywgdmFsdWUgPSAwKSB7XG4gICAgLy8gZ2V0IHZhcnJpYWJsZXMgZm9yXG4gICAgdGhpcy51dWlkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJykudG9TdHJpbmcoKTtcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgdGhpcy5kYXRhID0gbGFiZWw7XG4gICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuXG4gICAgLy8gc3R1ZHkgdG8gSlNPTlxuICAgIGNvbnN0IGpzb25kYXRhID0ge1xuICAgICAgdXVpZDogdGhpcy51dWlkLFxuICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICBkYXRlOiB0aGlzLmRhdGVcbiAgICB9O1xuXG4gICAgY29uc3QgZGF0YUFQSVVSTCA9IG5ldyBVUkwodGhpcy5kYXRhcGkpO1xuICAgIGRhdGFBUElVUkwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhqc29uZGF0YSk7XG4gICAgZmV0Y2goZGF0YUFQSVVSTCk7XG4gIH1cblxuICBzZXRFdmVudEFsbChqc29uZGF0YSA9IHt9KSB7XG4gICAgY29uc3QgZGF0YUFQSVVSTCA9IG5ldyBVUkwodGhpcy5kYXRhcGkpO1xuICAgIGRhdGFBUElVUkwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhqc29uZGF0YSk7XG4gICAgZmV0Y2goZGF0YUFQSVVSTCk7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCB7IFN0b3JhZ2VBUEkgfSBmcm9tICcuL2xvY2FsU3RvcmFnZUFQSSc7XG5cbi8qKlxuKiBUaGlzIGNvbXBvbmVudCBpcyBpbnRlbmRlZCB0byBoYW5kbGUgdGhlIHN0b3JhZ2UgYW5kIHJldHJpZXZhbCBvZiB0aGUgc3RhdGUgb2ZcbiogQXMgb2YgdGhpcyB3cml0aW5nIGl0IGlzIHVzaW5nIGxvY2FsU3RvcmFnZSB0byBkbyB0aGlzLlxuKiBVc2VzIHNpbXBsZSBjbGFzcyBpbnN0YW5jZSBtZXRob2RzIHdpdGggdGhlIHNob3J0LWhhbmQgbWV0aG9kIGRlY2xhcmF0aW9uXG4qIHBhdHRlcm4uXG4qXG4qIFRvIG5vdGU6IFRoZXJlIGlzIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBTdG9yZSBhbmQgdGhlIFN0YXRlLiBBcyBvZiAwYTMxMDZlXG4qIHRoZSBTdG9yZSBpcyBhIFN0cmluZyBzYXZlZCB0byB0aGUgYnJvd3NlcnMgbG9jYWxTdG9yYWdlIGFuZCBpcyBhIHNlcmlhbGl6ZWRcbiogdmVyc2lvbiBvZiB0aGUgU3RhdGUuIFRoZSBTdGF0ZSBpcyBhbiBPYmplY3Qgd2hpY2ggaXMgaW50ZXJhY3RlZCB3aXRoIGJ5XG4qIHBhcnNpbmcgdGhlIFN0YXRlIHN0cmluZyBmcm9tIHRoZSBTdG9yZSwgbW9kaWZ5aW5nIHRoZSByZXN1bHRzIG9mIHRoZSBwYXJzZSxcbiogYW5kIHJlLXNlcmlhbGl6aW5nIGl0IGJhY2sgdG8gdGhlIFN0b3JlLlxuKi9cbmNvbnN0IFNUQVRFX0tFWSA9ICdzdGF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gIC8vIC4uYW5kIGFuIChvcHRpb25hbCkgY3VzdG9tIGNsYXNzIGNvbnN0cnVjdG9yLiBJZiBvbmUgaXNcbiAgLy8gbm90IHN1cHBsaWVkLCBhIGRlZmF1bHQgY29uc3RydWN0b3IgaXMgdXNlZCBpbnN0ZWFkOlxuICAvLyBjb25zdHJ1Y3RvcigpIHsgfVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgLy8gdGhpcy5zdG9yZSA9IG5ldyBTdG9yYWdlQVBJKCk7XG4gICAgaWYgKFN0b3JlLnN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5zdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IFNUQVRFX0tFWSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNldHMgYSBrZXkvdmFsdWUgcGFpciB0byB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZUl0ZW0oa2V5ID0gJycsIHZhbHVlID0gJycpIHtcbiAgICBjb25zdCBzdG9yZU9iaiA9IHsgW2tleV06IHZhbHVlIH07XG4gICAgY29uc3QgbmV3U3RhdGVPYmogPSB7IC4uLnRoaXMuZ2V0U3RhdGUoKSwgLi4uc3RvcmVPYmogfTtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlT2JqKTtcbiAgICByZXR1cm4gbmV3U3RhdGVPYmo7XG4gIH1cblxuICAvLyBEZWxldGUgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vICEvLyBXQVJOSU5HOiBvbmx5IGRvZXMgYSBzaGFsbG93IGRlbGV0ZVxuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGRlbGV0ZVN0YXRlSXRlbShrZXkgPSAnJykge1xuICAgIGNvbnN0IHN0b3JlT2JqID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgIGRlbGV0ZSBzdG9yZU9ialtrZXldO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RvcmVPYmopO1xuICAgIHJldHVybiBzdG9yZU9iajtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIGVudGlyZSBzdGF0ZSBvYmplY3RcbiAgLy9cbiAgLy8gQHJldHVybiBvYmplY3RcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpID8gSlNPTi5wYXJzZSh0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSkgOiB7fTtcbiAgfVxuXG4gIC8vIEdldHMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0SXRlbShrZXkgPSAnJykge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0l0ZW0oa2V5KSA/IHRoaXMuZ2V0U3RhdGUoKVtrZXldIDoge307XG4gIH1cblxuICAvLyBTZXRzIGEgbmV3IHN0YXRlIG9iamVjdCBzdGF0ZVxuICAvL1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGUodmFsdWUgPSB7fSkge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFNUQVRFX0tFWSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgPyBKU09OLnBhcnNlKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKSA6IHt9O1xuICB9XG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBzdGF0ZSBleGlzdHMgaW4gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgY2hlY2tTdGF0ZUV4aXN0cygpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSk7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBzdGF0ZSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyXG4gIC8vXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldFN0YXRlQXNTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW4gaXRlbSBoYXMgYmVlbiBzYXZlZCB0byB0aGUgc3RvcmVcbiAgLy8gdW51c2VkIGFzIG9mIDBhMzEwNmVcbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGlzU3RhdGVJdGVtRXhpc3QoaXRlbSkge1xuICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSkge1xuICAgICAgY29uc3Qgc3RhdGVTdHIgPSB0aGlzLmdldFN0YXRlQXNTdHJpbmcoKTtcbiAgICAgIGlmIChzdGF0ZVN0ci5pbmRleE9mKGl0ZW0pID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGNoZWNrSXRlbShpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpICYmIHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpLmluZGV4T2YoaXRlbSkgPiAwO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIGF2YWlsYWJsZS5cbiAgLy8gVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX1N0b3JhZ2VfQVBJL1VzaW5nX3RoZV9XZWJfU3RvcmFnZV9BUElcbiAgLy9cbiAgLy8gQHJldHVybiBib29sZWFuXG4gIHN0YXRpYyBzdG9yYWdlQXZhaWxhYmxlKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnbG9jYWxTdG9yYWdlJztcbiAgICBsZXQgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICBzdG9yYWdlLmxlbmd0aCAhPT0gMDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcblxuZXhwb3J0IGNsYXNzIFV0aWxpdHkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvbyA9IHt9O1xuICAgIHRoaXMuY2hlY2sgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGNoZWNrcyBpcyBKYXZhc2NyaXB0IG9iamVjdCBpcyBhIHZhbGlkIG9iamVjdFxuICAvL1xuICAvLyBAcGFyYW0gb2JqIC0gb2JqZWN0XG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBjaGVja1ZhbGlkT2JqZWN0KG9iaikge1xuICAgIHRoaXMub2JqID0gb2JqO1xuICAgIGlmICh0aGlzLm9iaiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMub2JqID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5vYmogPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5vYmogPT09ICdzdHJpbmcnICYmIHRoaXMub2JqLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gY3JlYXRlcyBhIHV1aWRcbiAgLy9cbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgdXVpZCgpIHtcbiAgICB0aGlzLmNyeXB0byA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDQpKS5qb2luKCctJyk7XG4gICAgcmV0dXJuIHRoaXMuY3J5cHRvO1xuICB9XG5cbiAgLy8gY2hlY2tzIGlmIGN1cnJlbnQgZGV2aWNlIGlzIGEgbW9iaWxlXG4gIC8vXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBpc01vYmlsZURldmljZSgpIHtcbiAgICB0aGlzLmNoZWNrID0gZmFsc2U7XG4gICAgKGZ1bmN0aW9uKGEpe2lmKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSByZXR1cm4gdHJ1ZTt9KShuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHx3aW5kb3cub3BlcmEpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIHRoaXMuY2hlY2s7XG4gIH1cblxuICAvLyBjaGVja3MgaHRtbCBhcyBhIHRlbXBsYXRlL2Jsb2NrXG4gIC8vXG4gIC8vIEBwYXJhbSBwbGFjZUhvbGRlckVsZW1lbnRJRCAtIEhUTUwgZWxlbWVudCBJRCB0aGF0IHdpbGwgaG9sZCB0aGUgdGVtcGxhdGVcbiAgLy8gQHBhcmFtIHRlbXBsYXRlIC0gSFRNTCBjb250ZW50XG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBsb2FkSFRNTEJsb2NrKHBsYWNlSG9sZGVyRWxlbWVudElELCB0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGFjZUhvbGRlckVsZW1lbnRJRCk7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGVtcGxhdGUgZXhzaXN0c1xuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgaWYgKGNvbXBvbmVudEVsZW0gIT0gbnVsbCkge1xuICAgICAgICBjb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2htbC1ibG9jay1sb2FkZWQnLCBwbGFjZUhvbGRlckVsZW1lbnRJRCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdobWwtYmxvY2stdW5sb2FkZWQnLCBwbGFjZUhvbGRlckVsZW1lbnRJRCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvYWQgdGVtcGxhdGUgaW50byBwbGFjZWhvbGRlciBlbGVtZW50XG4gICAgICAgIGNvbXBvbmVudEVsZW0uaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gdHJpZ2dlcnMgYSBkb20gZXZlbnRcbiAgLy9cbiAgLy8gQHBhcmFtIGV2ZW50TmFtZSAtIHN0cmluZyBldmVudCBuYW1lIGZvciBhIGxpc3RuZXIgdG8gbGlzdGVuIHRvb1xuICAvLyBAcGFyYW0gZGV0YWlsIC0gb2JqZWN0IGRldGFpbHMgZm9yIGV2ZW50XG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICB0cmlnZ2VyRXZlbnQoZXZlbnROYW1lLCBkZXRhaWwpIHtcbiAgICB0aGlzLmV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQodGhpcy5ldmVudCk7XG4gIH1cblxuICAvLyBpdGVyYXRlcyB4IG51bWJlciBvZiBpdGVyYXRpb25zIGFuZCBzZXRzXG4gIC8vICAgIHN1cyBxdWVzdGlvbnMgdG9wIHN0YXRlXG4gIC8vXG4gIC8vIEBwYXJhbSBldmVudE5hbWUgLSBzdHJpbmcgZXZlbnQgbmFtZSBmb3IgYSBsaXN0bmVyIHRvIGxpc3RlbiB0b29cbiAgLy8gQHBhcmFtIGRldGFpbCAtIG9iamVjdCBkZXRhaWxzIGZvciBldmVudFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc2V0RG9tU3RhdGVGb3JHcm91cChzdGF0ZXRleHQsIGl0ZXJhdGlvbnMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHN0b3JlLmdldFN0YXRlSXRlbShgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWAsIDApO1xuICAgIGNvbnN0IGJ0blByZWZpeCA9IGBidG4tc3VzLXEke2l0ZXJhdGlvbnN9LWA7XG4gICAgY29uc3QgYWdncmVtZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2J0blByZWZpeH0ke3ZhbHVlfWApO1xuICAgIGlmIChhZ2dyZW1lbnRFbGVtZW50KSB7XG4gICAgICBhZ2dyZW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIGlmIChpdGVyYXRpb25zID4gMCkge1xuICAgICAgY29uc3QgbmV4dEl0ZXJhdGlvbiA9IGl0ZXJhdGlvbnMgLSAxO1xuICAgICAgdGhpcy5zZXREb21TdGF0ZUZvckdyb3VwKHN0YXRldGV4dCwgbmV4dEl0ZXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLy8gaXRlcmF0ZXMgeCBudW1iZXIgb2YgaXRlcmF0aW9ucyBhbmQgd3JpdGVzIGFcbiAgLy8gYSBkZWZhdWx0IHplcm8gdmFsdWUgc3RhdGUga2V5XG4gIC8vXG4gIC8vIEBwYXJhbSBldmVudE5hbWUgLSBzdHJpbmcgZXZlbnQgbmFtZSBmb3IgYSBsaXN0bmVyIHRvIGxpc3RlbiB0b29cbiAgLy8gQHBhcmFtIGRldGFpbCAtIG9iamVjdCBkZXRhaWxzIGZvciBldmVudFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc2V0U3RhdGVGb3JHcm91cChzdGF0ZXRleHQsIGl0ZXJhdGlvbnMpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gKSkpIHtcbiAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWAsIDApO1xuICAgIH1cbiAgICBpZiAoaXRlcmF0aW9ucyA+IDApIHtcbiAgICAgIGNvbnN0IG5leHRJdGVyYXRpb24gPSBpdGVyYXRpb25zIC0gMTtcbiAgICAgIHRoaXMuc2V0U3RhdGVGb3JHcm91cChzdGF0ZXRleHQsIG5leHRJdGVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGl0ZXJhdGVzIHggbnVtYmVyIG9mIGl0ZXJhdGlvbnMgYW5kIHdyaXRlcyB0byB0aGUgQVBJXG4gIC8vXG4gIC8vIEBwYXJhbSBldmVudE5hbWUgLSBzdHJpbmcgZXZlbnQgbmFtZSBmb3IgYSBsaXN0bmVyIHRvIGxpc3RlbiB0b29cbiAgLy8gQHBhcmFtIGRldGFpbCAtIG9iamVjdCBkZXRhaWxzIGZvciBldmVudFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc2V0QVBJRm9yR3JvdXAoc3RhdGV0ZXh0LCBpdGVyYXRpb25zLCB2YWx1ZUFycmF5ID0gW10pIHtcbiAgICBjb25zdCBrZXkgPSBgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWA7XG4gICAgY29uc3QgdmFsdWUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gKTtcbiAgICAvLyBjYXB0dXJlIGluIGFycmF5IHNvIHdlIGNhbiB3cml0ZSBjb21wbHRlZCBhcnJheSB0byBhcGlcbiAgICB2YWx1ZUFycmF5LnB1c2goeyBrZXksIHZhbHVlIH0pO1xuICAgIGlmIChpdGVyYXRpb25zID4gMCkge1xuICAgICAgY29uc3QgbmV4dEl0ZXJhdGlvbiA9IGl0ZXJhdGlvbnMgLSAxO1xuICAgICAgdGhpcy5zZXRBUElGb3JHcm91cChzdGF0ZXRleHQsIG5leHRJdGVyYXRpb24sIHZhbHVlQXJyYXkpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIHdyaXRlIGNvbXBsdGVkIGFycmF5IHRvIGFwaVxuICAgIC8vIHJlY29yZFN0dWR5RGF0YS5zZXRFdmVudCgnZGF0YScsICdncmlkYW5zd2VycycsIEpTT04uc3RyaW5naWZ5KHZhbHVlQXJyYXkpKTtcbiAgICBjb25zdCBkYXRlc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkLXN1Ym1pdGVkJywgdHJ1ZSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkYW5zd2VycycsIHZhbHVlQXJyYXkpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMtdGltZScsIGRhdGVzdGFtcCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=