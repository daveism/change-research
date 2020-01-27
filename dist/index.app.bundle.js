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
/******/ 	var hotCurrentHash = "0fb2713510564ca1abc6";
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

module.exports = "<div id=\"study-progress-map-0\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Review the map and the animation of the two images. Then click on any box where you believe change occurred.\n  </div>\n\n  <div id=\"map-holder-1\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-1\" class=\"row h-100 justify-content-center\">\n      <div id=\"map-1\" class=\"my-3 mx-3\"></div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-3\">\n    <button id=\"submit-button-to-sus-0\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-2.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-2.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-1\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Review the two maps and click on any box where you believe change occurred.\n  </div>\n\n  <div id=\"map-holder-2\" class=\"start-map w-100 d-flex ml-3 mt-3\">\n    <div id=\"map-inner-holder-2\" class=\"row h-100 justify-content-center\">\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2a\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2a\"></div>\n      </div>\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2b\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2b\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-3\">\n    <button id=\"submit-button-to-sus-1\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-3.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-3.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-2\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Review the map using the horizontal bar by dragging the bar side to side to\n    reveal what’s changed. Then click on any box where you believe change\n    occurred between the two maps.\n  </div>\n\n  <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n      <div id='compare-wrapper'>\n        <div id=\"map-3a\" class=\"mx-3\"></div>\n        <div id=\"map-3b\" class=\"mx-3\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-3\">\n    <button id=\"submit-button-to-sus-2\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

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

// create mapbox navigation control instance
var nav = mapBoxConfig.addNav();
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
    map1.addControl(nav, 'top-left');
    break;
  case 1:
    // side by side
    utility.loadHTMLBlock('block-study-question-2-holder', _blockStudyQuestion4.default);
    map2a = mapBoxConfig.makeMap('map-2a', 0);
    map2b = mapBoxConfig.makeMap('map-2b', 1);
    map2a.addControl(nav, 'top-left');
    map2b.addControl(nav, 'top-left');
    mapBoxConfig.syncMaps(map2a, map2b);
    break;
  case 2:
    // slider
    utility.loadHTMLBlock('block-study-question-3-holder', _blockStudyQuestion6.default);
    map3Arr = mapBoxConfig.makeCompareMap('map-3a', 'map-3b', 'compare-wrapper');
    map3Arr[0].addControl(nav, 'top-left');
    map3Arr[1].addControl(nav, 'top-left');
    mapBoxConfig.syncMaps(map3Arr[0], map3Arr[1]);
    break;
  default:
    // animate
    utility.loadHTMLBlock('block-study-question-1-holder', _blockStudyQuestion2.default);
    mapdef = mapBoxConfig.makeAnimateMap('map-1', 0);
    mapdef.addControl(nav, 'top-left');
    break;
}

// create all the mapbox map objects
// const mapEndArr = mapBoxConfig.makeCompareMap('map-c-enda',
//  'map-c-endb', 'compare-end-wrapper', true, false);
//
var mapEnda = mapBoxConfig.makeMap('map-enda', 0, false, false);
var mapEndb = mapBoxConfig.makeMap('map-endb', 1, true, false);
// mapBoxConfig.syncMaps(mapEndArr[0], mapEndArr[1]);


// add navigatio to maps
// I may not need this if I do not let user zoom/pan
// mapEndArr[0].addControl(nav, 'top-left');
// mapEndArr[1].addControl(nav, 'top-left');
mapEnda.addControl(nav, 'top-left');
mapEndb.addControl(nav, 'top-left');

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
      return [beforeMap, afterMap];
    }

    // instantiates a navigation bar on the map
    //
    // @param null
    // @return null

  }, {
    key: 'addNav',
    value: function addNav() {
      return new this.mapboxgl.NavigationControl();
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
      store.setStateItem('' + statetext + iterations, 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0yLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWFwLWNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yZWNvcmQtc3R1ZHktZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbInJlY29yZFN0dWR5RGF0YSIsIlJlY29yZFN0dWR5RGF0YSIsInN0b3JlIiwiU3RvcmUiLCJ1dGlsaXR5IiwiVXRpbGl0eSIsIkhhbmRsZXJzIiwiZGlzcGxheU5vbmVDbGFzcyIsInNlbGVjdGVkQ2xhc3MiLCJzdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCIsInN0dWR5QWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlIiwic3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNBZGQiLCJzdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSIsInN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZCIsInN0dWR5UXVlc3Rpb24iLCJnZXRTdGF0ZUl0ZW0iLCJzdHVkeVF1ZXN0aW9uRWxlbWVudHNSZW1vdmUiLCJzdHVkeVNVU0VsZW1lbnRzQWRkIiwic3R1ZHlTVVNFbGVtZW50c1JlbW92ZSIsInN1c1N0b3JhZ2VLZXlzIiwiZWxlbWVudElEIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZvckVhY2giLCJlbGVtZW50VUlJRCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImNvbnRhaW5zIiwiYWRkIiwiZ3JpZE5hbWUiLCJncmlkSXRlcmF0aW9ucyIsInNldEFQSUZvckdyb3VwIiwic3VzVmFsdWVBcnJheSIsImtleSIsInF1ZXN0aW9uQW5zd2VyIiwicHVzaCIsImRhdGVzdGFtcCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInRyaWdnZXJFdmVudCIsInNldFN0YXRlSXRlbSIsInJlY29yZEFnZ3JlZWQiLCJzdHVkeVZlcnNpb24iLCJhZ3JlZW1lbnRUaW1lU3RhbXAiLCJyZWNvcmREaXNhZ2dyZWVkIiwicGFyZW50QnRuR3JvdXAiLCJ0YXJnZXQiLCJpZCIsInBhcmVudEVsZW1lbnQiLCJ0b2dnbGVCdXR0b25Hcm91cEJ1dHR0b25zT2ZmIiwicXVlc3Rpb25UZXh0IiwicmVwbGFjZSIsIk51bWJlciIsImlubmVyVGV4dCIsInV1aWRSZWMiLCJzdHVkeVN0YXJ0ZWRSZWMiLCJzdHVkeVN0YXJ0ZWRUaW1lUmVjIiwic3R1ZHlBZ3JlZW1lbnRSZWMiLCJzdHVkeUFncmVlbWVudFRpbWVSZWMiLCJjYW1wYWlnblJlYyIsIm1vYmlsZVJlYyIsIm1hcFZlcnNpb25SZWMiLCJzdHVkeVF1ZXN0aW9uUmVjIiwic3VzYW5zd2Vyc1JlYyIsImdyaWRhbnN3ZXJzUmVjIiwiZ3JpZGNvcnJlY3RSZWMiLCJncmlkY29ycmVjdFJlY1Byb3BzIiwiZmVhdHVyZXMiLCJ2YWwiLCJwcm9wZXJ0aWVzIiwidmFsdWUiLCJ2IiwianNvbkRhdGEiLCJ1dWlkIiwic3R1ZHlfc3RhcnRlZCIsInN0dWR5X3N0YXJ0ZWRfdGltZSIsInN0dWR5X2FncmVlbWVudCIsInN0dWR5X2FncmVlbWVudF90aW1lIiwiY2FtcGFpZ24iLCJKU09OIiwic3RyaW5naWZ5IiwibW9iaWxlIiwibWFwX3ZlcnNpb24iLCJncmlkX2NvcnJlY3QiLCJncmlkX2Fuc3dlcnMiLCJncmlkYW5zd2Vyc190aW1lIiwic3R1ZHlfcXVlc3Rpb24iLCJzdXNfYW5zd2VycyIsInN1c2Fuc3dlcnNfdGltZSIsInNldEV2ZW50QWxsIiwic3VzYW5zd2Vyc0RhdGVSZWMiLCJncmlkYW5zd2Vyc0RhdGVSZWMiLCJidG5Hcm91cCIsImNoaWxkcmVuIiwiY2hpbGROb2RlcyIsImNoZWNrVmFsaWRPYmplY3QiLCJsZW5ndGgiLCJjaGlsZHJlbkFycmF5IiwiY2hpbGRJdGVtIiwic3R1ZHlNaW5PbmUiLCJzdHVkeU1heE9uZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1hcE1pbk9uZSIsIm1hcE1heE9uZSIsIm1hcFZlcnNpb24iLCJoYW5kbGVycyIsIm1hcEJveENvbmZpZyIsIk1hcEJveENvbmZpZyIsInRvU3RyaW5nIiwibGlicmFyeSIsImZhcyIsImZhciIsImRvbSIsIndhdGNoIiwibG9hZEhUTUxCbG9jayIsImJsb2NrU3R1ZHlBZ2dyZWVtZW50IiwiYmxvY2tTdHVkeURpc3NhZ2dyZWUiLCJibG9ja1N0dWR5U1VTIiwiYmxvY2tTdHVkeUNvbXBsZXRlZCIsIm5hdiIsImFkZE5hdiIsIm1hcDEiLCJtYXAyYSIsIm1hcDJiIiwibWFwM0FyciIsIm1hcGRlZiIsImJsb2NrU3R1ZHlRdWVzdGlvbjEiLCJtYWtlQW5pbWF0ZU1hcCIsImFkZENvbnRyb2wiLCJibG9ja1N0dWR5UXVlc3Rpb24yIiwibWFrZU1hcCIsInN5bmNNYXBzIiwiYmxvY2tTdHVkeVF1ZXN0aW9uMyIsIm1ha2VDb21wYXJlTWFwIiwibWFwRW5kYSIsIm1hcEVuZGIiLCJyZXNpemVBbGxNYXBzIiwicmVzaXplIiwic2V0Wm9vbSIsInVybFN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInVybCIsIlVSTCIsInNlYXJjaFBhcmFtcyIsImdldCIsImlzTW9iaWxlRGV2aWNlIiwiYWdncmVtZW50Q2hhbmdlRWxlbWVudHMiLCJhZGRIYW5kbGVyQWdyZWVDbGljayIsImRpc2FnZ3JlbWVudENoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlckRpc2FncmVlQ2xpY2siLCJzdWJtaXRDaGFuZ2VFbGVtZW50cyIsImFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayIsInN1c0NoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlclN1Ym1pdFNVU0NsaWNrIiwiY3VycmVudFNxdWFyZUdyaWRHZW9KU09OIiwiZ2V0U291cmNlIiwic2V0RGF0YSIsInN1c0J0bkdyb3VwRWxlbWVudHMiLCJhZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayIsInN1c05hbWUiLCJzdXNJdGVyYXRpb25zIiwic2V0U3RhdGVGb3JHcm91cCIsImlzU3R1ZHljb21wbGV0ZWQiLCJzdHVkeUNvbXBsZXRlZCIsIlN0dWR5QWdycmVlbWVudCIsInN0dWR5QWdycmVlZCIsInN5bmNNb3ZlIiwicmVxdWlyZSIsInNxdWFyZUdyaWRHZW9KU09OIiwiU3F1YXJlR3JpZEdlb0pTT05PbmUiLCJTcXVhcmVHcmlkR2VvSlNPTlNlY29uZCIsIlNxdWFyZUdyaWRHZW9KU09OVGhpcmQiLCJkZWZhdWx0TWFwU3R5bGUiLCJkZWZhdWx0TWFwQ2VudGVyIiwiZGVmYXVsdE1heEJvdW5kcyIsImRlZmF1bHRNYXBab29tIiwiZGVmYXVsdE1hcENvbnRhaW5lciIsImRhcmtNYXBTdHlsZSIsImxpZ2h0TWFwU3R5bGUiLCJtYXBib3hnbCIsIk1hcGJveENvbXBhcmUiLCJhY2Nlc3NUb2tlbiIsInF1aWV0IiwibWFwMiIsImRlZmF1bHRHcmV5Qm94Iiwic2VsZWN0ZWRCb3giLCJtYXBDaGFuZ2VMYXllcnMiLCJsYXllcnMiLCJtaW56b29tIiwibWF4em9vbSIsInNjaGVtZSIsInRpbGVTaXplIiwiYm91bmRzIiwibWF4Ym91bmRzIiwibWFwQ2hhbmdlTGF5ZXJzT25lIiwibWFwQ29udGFpbmVyIiwibWFwSW5kZXgiLCJlbmQiLCJlbmFibGVjbGljayIsIm1hcFNldHVwIiwibWFwIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJ6b29tIiwic2hvd1pvb20iLCJ0b3VjaEVuYWJsZWQiLCJrZXliaW5kaW5ncyIsIm1heEJvdW5kcyIsIm9uIiwiZml0TXlCb3VuZHMiLCJhZGRMYXllciIsIm1ha2VUTVNMYXllciIsIm1ha2VHcmlkT3V0TGluZUxheWVyIiwibWFrZUdyaWRDb3JyZWN0TGF5ZXIiLCJtYWtlR3JpZExheWVyIiwiYWRkR3JpZENsaWNrIiwic2V0VGltZW91dCIsIm9ubG9hZCIsImNlbnRlciIsImluZGV4Q291bnQiLCJpbmRleCIsInNldEludGVydmFsIiwic2V0TGF5b3V0UHJvcGVydHkiLCJtYXBCZWZvcmVDb250YWluZXIiLCJtYXBBZnRlckNvbnRhaW5lciIsIm1hcENvbXBhcmVXcmFwcGVySUQiLCJiZWZvcmVNYXAiLCJhZnRlck1hcCIsImNvbXBhcmUiLCJzZXRTbGlkZXIiLCJOYXZpZ2F0aW9uQ29udHJvbCIsIm1hcENoYW5nZSIsInR5cGUiLCJzb3VyY2UiLCJ0aWxlcyIsInBhaW50IiwiZGF0YSIsImxheW91dCIsImdldENhbnZhcyIsImN1cnNvciIsImZlYXR1cmUiLCJuZXdGZWF0dXJlIiwidG9nZ2xlU2VsZWN0ZWRGZWF0dXJlIiwic2VsZWN0ZWRGZWF0dXJlcyIsIm1ha2VTZWxlY3RlZEZlYXR1cmVHZW9KU09OIiwibmV3U3F1YXJlR3JpZEdlb0pTT04iLCJ1cGRhdGVTcXVhcmVHcmlkV2l0aFNlbGVjdGVkRmVhdHVyZXMiLCJzdG9yZVNxdWFyZUdyaWQiLCJzdG9yZVNlbGVjdGVkRmVhdHVyZSIsIk5ld1NxdWFyZUdyaWRHZW9KU09OIiwiZml0Qm91bmRzIiwicGFkZGluZyIsInNlbGVjdGVkIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsImN1cnJlbnRGZWF0dXJlSWRzIiwiY29uY2F0IiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJkYXRhcGkiLCJmb28iLCJhY3Rpb24iLCJjYXRlZ29yeSIsImxhYmVsIiwiZGF0ZSIsImpzb25kYXRhIiwiZGF0YUFQSVVSTCIsInNlYXJjaCIsIlVSTFNlYXJjaFBhcmFtcyIsImZldGNoIiwiU1RBVEVfS0VZIiwic3RvcmFnZUF2YWlsYWJsZSIsInN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJzdGF0ZSIsImNoZWNrU3RhdGVFeGlzdHMiLCJnZXRTdGF0ZSIsInN0b3JlT2JqIiwibmV3U3RhdGVPYmoiLCJzZXRTdGF0ZSIsInBhcnNlIiwiZ2V0SXRlbSIsImNoZWNrSXRlbSIsInNldEl0ZW0iLCJCb29sZWFuIiwiaXRlbSIsInN0YXRlU3RyIiwiZ2V0U3RhdGVBc1N0cmluZyIsImluZGV4T2YiLCJ4IiwicmVtb3ZlSXRlbSIsIkRPTUV4Y2VwdGlvbiIsImNvZGUiLCJuYW1lIiwiY2hlY2siLCJvYmoiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJrZXlzIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiYSIsInRlc3QiLCJzdWJzdHIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ2ZW5kb3IiLCJvcGVyYSIsInBsYWNlSG9sZGVyRWxlbWVudElEIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiaW5uZXJIVE1MIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzdGF0ZXRleHQiLCJpdGVyYXRpb25zIiwibmV4dEl0ZXJhdGlvbiIsInZhbHVlQXJyYXkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUFhLENBQW5DO0FBQ0EsYUFBS2hLLGdCQUFMLENBQXNCK0osU0FBdEIsRUFBaUNFLGFBQWpDO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O21DQUNlRixTLEVBQVdDLFUsRUFBNkI7QUFBQSxVQUFqQkUsVUFBaUIsdUVBQUosRUFBSTs7QUFDckQsVUFBTXRTLFdBQVNtUyxTQUFULEdBQXFCQyxVQUEzQjtBQUNBLFVBQU0vUCxRQUFRdkUsTUFBTWEsWUFBTixNQUFzQndULFNBQXRCLEdBQWtDQyxVQUFsQyxDQUFkO0FBQ0E7QUFDQUUsaUJBQVdwUyxJQUFYLENBQWdCLEVBQUVGLFFBQUYsRUFBT3FDLFlBQVAsRUFBaEI7QUFDQSxVQUFJK1AsYUFBYSxDQUFqQixFQUFvQjtBQUNsQixZQUFNQyxnQkFBZ0JELGFBQWEsQ0FBbkM7QUFDQSxhQUFLdFMsY0FBTCxDQUFvQnFTLFNBQXBCLEVBQStCRSxhQUEvQixFQUE4Q0MsVUFBOUM7QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNEO0FBQ0E7QUFDQSxVQUFNblMsWUFBWSxJQUFJQyxJQUFKLEdBQVdDLFdBQVgsRUFBbEI7QUFDQXZDLFlBQU15QyxZQUFOLENBQW1CLGFBQW5CLEVBQWtDK1IsVUFBbEM7QUFDQXhVLFlBQU15QyxZQUFOLENBQW1CLGtCQUFuQixFQUF1Q0osU0FBdkM7QUFDQSxhQUFPLElBQVA7QUFDRCIsImZpbGUiOiJpbmRleC5hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIwZmIyNzEzNTEwNTY0Y2ExYWJjNlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3JzfmluZGV4XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC1hbGxcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDBcXFwiPlxcblxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50LXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3R1ZHkgUGFydGljaXBhdGlvbiBBZ3JlZW1lbnQ8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudFxcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImgtMTAwXFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnQtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICBUaGFuayB5b3UgZm9yIHRha2luZyBwYXJ0IGluIHRoaXMgc3R1ZHkuIEJ5IHVzaW5nIHRoZSBmb2xsb3dpbmcgd2Vic2l0ZSxcXG4gICAgICAgIHlvdSBhZ3JlZSB0byBwYXJ0aWNpcGF0ZSBpbiBhIHN0dWR5IGFib3V0IGhvdyBwZW9wbGUgdXNlIHdlYi1wcmVzZW50ZWQgbWFwcy5cXG4gICAgICAgIFdlIHdpbGwgY29sbGVjdCBpbmZvcm1hdGlvbiBhYm91dCB5b3VyIGludGVyYWN0aW9ucyB3aXRoIHRoaXMgc2l0ZSBidXQgbm90IGFueVxcbiAgICAgICAgcGVyc29uYWxseSBpZGVudGlmaWFibGUgaW5mb3JtYXRpb24uIFRoZSBvbmx5IHBlb3BsZSB3aXRoIGFjY2VzcyB0byB0aGUgc3R1ZHlcXG4gICAgICAgIGRhdGEgYXJlIHRoZSByZXNlYXJjaGVycy4gSG93ZXZlciwgdGhlIGRhdGEgd2lsbCBiZSBzdW1tYXJpemVkLCBzaGFyZWQsIGFuZFxcbiAgICAgICAgZGlzc2VtaW5hdGVkIGluIHRhbGtzLCBibG9ncywgYW5kIHBvc3NpYmx5IHJlc2VhcmNoIGpvdXJuYWxzLiBUaGVyZSBpcyBub1xcbiAgICAgICAgY29zdCB0byB5b3UgdG8gcGFydGljaXBhdGUgaW4gdGhpcyByZXNlYXJjaCBzdHVkeSwgYW5kIHlvdSB3aWxsIG5vdCBiZVxcbiAgICAgICAgY29tcGVuc2F0ZWQuIFRoZXJlIGFyZSBubyBrbm93biByaXNrcyBpbiB0aGUgZm9sbG93aW5nIHRhc2tzLlxcbiAgICAgICAgPGJyIC8+PGJyIC8+XFxuICAgICAgICBCeSBhZ3JlZWluZyB0byB0aGlzLCB5b3UgaGF2ZSBhY2tub3dsZWRnZWQgdGhhdCB5b3UgaGF2ZSByZWFkIHRoZVxcbiAgICAgICAgY29udGVudHMgb2YgdGhpcyBjb25zZW50LCBhcmUgYW4gYWR1bHQgb3ZlciAxOCB5ZWFycyBvZiBhZ2UsIGFuZFxcbiAgICAgICAgeW91IGFyZSBnaXZpbmcgY29uc2VudCB0byBwYXJ0aWNpcGF0ZSBpbiB0aGlzIHN0dWR5LlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC01XFxcIj5EbyB5b3Ugd2FudCB0byBwYXJ0aWNpcGF0ZT88L2Rpdj5cXG5cXG4gIDxzcGFuIGNsYXNzPVxcXCJtdC0zIGgtYXV0byBkLWZsZXhcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmQgbXItM1xcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtY2hlY2tcXFwiPjwvaT5cXG4gICAgICBZZXNcXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b24gaWQ9XFxcImRpYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi14bGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZFxcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtdGltZXMtY2lyY2xlXFxcIj48L2k+XFxuICAgICAgTm9cXG4gICAgPC9idXR0b24+XFxuICA8L3NwYW4+XFxuXFxuICA8IS0tIDxkaXYgaWQ9XFxcImFnZ3JlZS1kaXNhZ2dyZS13cmFwcGVyXFxcIiBjbGFzcz1cXFwibXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC1zdWJcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgYWxpZ24tc2VsZi1jZW50ZXIgcGItNCBweS0yXFxcIj5EbyB5b3Ugd2FudCB0byBwYXJ0aWNpcGF0ZT88L2Rpdj5cXG4gICAgPGJ1dHRvbiBpZD1cXFwiYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tYWdncmVlbWVudCB3LTIwIGFsaWduLXNlbGYtZW5kIG1yLTNcXFwiID5cXG4gICAgICA8aSBjbGFzcz1cXFwiZmFzIGZhLWNoZWNrXFxcIj48L2k+XFxuICAgICAgWWVzXFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJkaWFnZ3JlZS1idXR0b25cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4teGxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmRcXFwiID5cXG4gICAgICA8aSBjbGFzcz1cXFwiZmFzIGZhLXRpbWVzLWNpcmNsZVxcXCI+PC9pPlxcbiAgICAgIE5vXFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+IC0tPlxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1wcm9ncmVzcy1lbmRcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwXFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMFxcXCI+XFxuICAgIFRoYW5rcyBmb3IgcGFydGljaXBhdGluZyFcXG4gIDwvZGl2PlxcblxcbiAgPCEtLSA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLWVuZFxcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItZW5kXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlxcbiAgICAgIDxkaXYgaWQ9J2NvbXBhcmUtZW5kLXdyYXBwZXInPlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLWMtZW5kYVxcXCIgY2xhc3M9XFxcIm15LTMgbXgtM1xcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtYy1lbmRiXFxcIiBjbGFzcz1cXFwibXktMyBteC0zXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gICAtLT5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItZW5kXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDAgbWwtM1xcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgcHgtMCB3LTEwMFxcXCIgPlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTEyIHB4LTAgcHktMSB3LTEwMFxcXCIgPlxcbiAgICAgICAgICBZb3VyIGFuc3dlclxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtZW5kYVxcXCIgY2xhc3M9XFxcImNvbC0xMiBjb2wtbWQtNiBweC0wIG1hcC1lbmRhIGVuZG1hcFxcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IG10LTQgdy0xMDBcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIHB4LTAgcHktMSB3LTEwMFxcXCIgPlxcbiAgICAgICAgICBPdXIgYW5zd2VyXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1lbmRiXFxcIiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IHB4LTAgbWFwLWVuZGIgZW5kbWFwXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1kaXNzYWdncmVlXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlRoYW5rcyBhbnl3YXkhPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdHVkeS1kaXNzYWdncmVlLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBUaGFuayB5b3UgZm9yIGNvbnNpZGVyaW5nIGJlaW5nIGEgcGFydGljaXBhbnQuIElmIHlvdSBjaGFuZ2UgeW91clxcbiAgICBtaW5kIHlvdSBjYW4gYWx3YXlzIHJldmlldyB0aGUmbmJzcDs8YSBocmVmPVxcXCJcXFwiID4gYWdncmVtZW50IDwvYT4mbmJzcDthZ2FpbiFcXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1wcm9ncmVzcy1tYXAtMFxcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDEgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIFJldmlldyB0aGUgbWFwIGFuZCB0aGUgYW5pbWF0aW9uIG9mIHRoZSB0d28gaW1hZ2VzLiBUaGVuIGNsaWNrIG9uIGFueSBib3ggd2hlcmUgeW91IGJlbGlldmUgY2hhbmdlIG9jY3VycmVkLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLTFcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTFcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwibWFwLTFcXFwiIGNsYXNzPVxcXCJteS0zIG14LTNcXFwiPjwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDIgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIFN1Ym1pdCB0aGUgc2VsZWN0ZWQgYm94ZXMgKGluIG9yYW5nZSkgYXMgeW91ciBhbnN3ZXIgdG8gYXJlYXMgdGhhdCBoYXZlIGNoYW5nZWQuXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLXN1cy0wXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlBsZWFzZSBzZWFyY2ggZm9yIGxvY2F0aW9uIGFuZCBkcmF3IGEgY2lyY2xlIGZpcnN0IVxcXCI+XFxuICAgICAgU3VibWl0XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLW1hcC0xXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMSBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgUmV2aWV3IHRoZSB0d28gbWFwcyBhbmQgY2xpY2sgb24gYW55IGJveCB3aGVyZSB5b3UgYmVsaWV2ZSBjaGFuZ2Ugb2NjdXJyZWQuXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItMlxcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbWwtMyBtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci0yXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtbWQtNiBkdWFsbWFwcyBkLWZsZXhcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLTJhXFxcIiBjbGFzcz1cXFwibXktMyBteC0wIG14LXNtLTAgbXgtbWQtMyBtYXAtMmFcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtbWQtNiBkdWFsbWFwcyBkLWZsZXhcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLTJiXFxcIiBjbGFzcz1cXFwibXktMyBteC0wIG14LXNtLTAgbXgtbWQtMyBtYXAtMmJcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDIgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIFN1Ym1pdCB0aGUgc2VsZWN0ZWQgYm94ZXMgKGluIG9yYW5nZSkgYXMgeW91ciBhbnN3ZXIgdG8gYXJlYXMgdGhhdCBoYXZlIGNoYW5nZWQuXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLXN1cy0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlBsZWFzZSBzZWFyY2ggZm9yIGxvY2F0aW9uIGFuZCBkcmF3IGEgY2lyY2xlIGZpcnN0IVxcXCI+XFxuICAgICAgU3VibWl0XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLW1hcC0yXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMSBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgUmV2aWV3IHRoZSBtYXAgdXNpbmcgdGhlIGhvcml6b250YWwgYmFyIGJ5IGRyYWdnaW5nIHRoZSBiYXIgc2lkZSB0byBzaWRlIHRvXFxuICAgIHJldmVhbCB3aGF04oCZcyBjaGFuZ2VkLiBUaGVuIGNsaWNrIG9uIGFueSBib3ggd2hlcmUgeW91IGJlbGlldmUgY2hhbmdlXFxuICAgIG9jY3VycmVkIGJldHdlZW4gdGhlIHR3byBtYXBzLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLTNcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTNcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlciBjb21wYXJlXFxcIj5cXG4gICAgICA8ZGl2IGlkPSdjb21wYXJlLXdyYXBwZXInPlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLTNhXFxcIiBjbGFzcz1cXFwibXgtM1xcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtM2JcXFwiIGNsYXNzPVxcXCJteC0zXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAyIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBTdWJtaXQgdGhlIHNlbGVjdGVkIGJveGVzIChpbiBvcmFuZ2UpIGFzIHlvdXIgYW5zd2VyIHRvIGFyZWFzIHRoYXQgaGF2ZSBjaGFuZ2VkLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgPGJ1dHRvbiBpZD1cXFwic3VibWl0LWJ1dHRvbi10by1zdXMtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tZHJhdy1jaXJjbGUgdy0xMDAgYWxpZ24tc2VsZi1lbmRcXFwiIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiBkYXRhLWh0bWw9XFxcInRydWVcXFwiIHRpdGxlPVxcXCJQbGVhc2Ugc2VhcmNoIGZvciBsb2NhdGlvbiBhbmQgZHJhdyBhIGNpcmNsZSBmaXJzdCFcXFwiPlxcbiAgICAgIFN1Ym1pdFxcbiAgICA8L2J1dHRvbj5cXG4gIDwvZGl2PlxcblxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1wcm9ncmVzcy1zdXNcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAzIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBSZXZpZXcgdGhlIG1hcCBhbmQgdGhlIGFuaW1hdGlvbiBvZiB0aGUgdHdvIGltYWdlcy4gVGhlbiBjbGljayBvbiBhbnlcXG4gICAgYm94IHdoZXJlIHlvdSBiZWxpZXZlIGNoYW5nZSBvY2N1cnJlZC4gMSBpbmRpY2F0ZXMgeW91IHN0cm9uZ2x5IGRpc2FncmVlXFxuICAgIGFuZCA1IGluZGljYXRlcyB5b3Ugc3Ryb25nbHkgYWdncmVlLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJwbC0xIHB0LTMgcGItM1xcXCI+XFxuICAgICZuYnNwO1xcbiAgPC9kaXY+XFxuXFxuICA8IS0tIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMCBwLTMgbS0zXFxcIj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1sZWFkIGNvbC02XFxcIj5cXG4gICAgICAmbmJzcFxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1hZ3JlZSB0ZXh0LWxlZnQgY29sLTNcXFwiPlxcbiAgICAgICAgU3Ryb25nbHkgZGlzYWdyZWVcXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUgdGV4dC1yaWdodCBjb2wtM1xcXCI+XFxuICAgICAgICBTdHJvbmdseSBhZ3JlZVxcbiAgICA8L2Rpdj5cXG5cXG4gIDwvZGl2PiAtLT5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi0zIHN1cy1vZGRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMS4mbmJzcDsmbmJzcDtJIHRoaW5rIHRoYXQgSSB3b3VsZCBsaWtlIHRvIHVzZSB0aGlzIHNpdGUgZnJlcXVlbnRseVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTFcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgYnRuLXN1cyBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwdC0yXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi0zIHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDIuJm5ic3A7Jm5ic3A7SSBmb3VuZCB0aGUgc2l0ZSB1bm5lY2Vzc2FyaWx5IGNvbXBsZXhcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0yXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi0zIHN1cy1vZGRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMy4mbmJzcDsmbmJzcDtJIHRob3VnaHQgdGhlIHNpdGUgd2FzIGVhc3kgdG8gdXNlXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtM1xcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwdC0yXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItMyBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA0LiZuYnNwOyZuYnNwO0kgdGhpbmsgdGhhdCBJIHdvdWxkIG5lZWQgdGhlIHN1cHBvcnQgb2YgYSB0ZWNobmljYWwgcGVyc29uIHRvIGJlIGFibGUgdG8gdXNlIHRoaXMgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTRcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA1LiZuYnNwOyZuYnNwO0kgZm91bmQgdGhlIHZhcmlvdXMgZnVuY3Rpb25zIGluIHRoaXMgc2l0ZSB3ZXJlIHdlbGwgaW50ZWdyYXRlZFxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTVcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgNi4mbmJzcDsmbmJzcDtJIHRob3VnaHQgdGhlcmUgd2FzIHRvbyBtdWNoIGluY29uc2lzdGVuY3kgaW4gdGhpcyBzaXRlXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtNlxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwdC0yXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItMyBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDcuJm5ic3A7Jm5ic3A7SSB3b3VsZCBpbWFnaW5lIHRoYXQgbW9zdCBwZW9wbGUgd291bGQgbGVhcm4gdG8gdXNlIHRoaXMgc2l0ZSB2ZXJ5IHF1aWNrbHlcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy03XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTctMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1yZXBsYWNlLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcmVwbGFjZS0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXJlcGxhY2UtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1yZXBsYWNlLTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgOC4mbmJzcDsmbmJzcDtJIGZvdW5kIHRoZSBzaXRlIHZlcnkgY3VtYmVyc29tZSB0byB1c2VcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy04XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi0zIHN1cy1vZGRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgOS4mbmJzcDsmbmJzcDtJIGZlbHQgdmVyeSBjb25maWRlbnQgdXNpbmcgdGhlIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy05XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi0zIHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDEwLiZuYnNwOyZuYnNwO0kgbmVlZGVkIHRvIGxlYXJuIGEgbG90IG9mIHRoaW5ncyBiZWZvcmUgSSBjb3VsZCBnZXQgZ29pbmcgd2l0aCB0aGlzIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0xMFxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMCBkLWZsZXggbXQtNFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcInB0LXNtLTIgcHQtbWQtMCBjb2wtMTIgY29sLXNtLTEyIGNvbC1tZC03XFxcIj5cXG4gICAgICAmbmJzcDtcXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcInB0LXNtLTIgcHQtbWQtMCBjb2wtMTIgY29sLXNtLTEyIGNvbC1tZC01XFxcIj5cXG4gICAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLWVuZFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tZHJhdy1jaXJjbGUgdy0xMDAgYWxpZ24tc2VsZi1lbmRcXFwiIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiBkYXRhLWh0bWw9XFxcInRydWVcXFwiIHRpdGxlPVxcXCJQbGVhc2Ugc2VhcmNoIGZvciBsb2NhdGlvbiBhbmQgZHJhdyBhIGNpcmNsZSBmaXJzdCFcXFwiPlxcbiAgICAgICAgU3VibWl0IGFuZCBmaW5pc2hcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJpbXBvcnQgeyBSZWNvcmRTdHVkeURhdGEgfSBmcm9tICcuL3JlY29yZC1zdHVkeS1kYXRhJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBVdGlsaXR5IH0gZnJvbSAnLi91dGlsaXR5JztcblxuY29uc3QgcmVjb3JkU3R1ZHlEYXRhID0gbmV3IFJlY29yZFN0dWR5RGF0YSgpO1xuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgdXRpbGl0eSA9IG5ldyBVdGlsaXR5KCk7XG5cbmV4cG9ydCBjbGFzcyBIYW5kbGVycyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGlzcGxheU5vbmVDbGFzcyA9ICdkLW5vbmUnO1xuICAgIHRoaXMuc2VsZWN0ZWRDbGFzcyA9ICdzZWxlY3RlZCc7XG5cbiAgICAvLyBzdHVkeSBhZ2dyZWVtZW50XG4gICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCA9IFsnc3R1ZHktcHJvZ3Jlc3MtbWFwLSddO1xuICAgIHRoaXMuc3R1ZHlBZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUgPSBbJ2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQtaG9sZGVyJ107XG5cbiAgICAvLyBzdHVkeSBkaXNhZ2dyZWVtZW50XG4gICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c0FkZCA9IFsnc3R1ZHktZGlzc2FnZ3JlZSddO1xuICAgIHRoaXMuc3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUgPSBbJ2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQtaG9sZGVyJ107XG5cbiAgICAvLyBzdHVkeSBxdWVzdGlvbnMgbWFwIGNoYW5nZVxuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1zdXMnLCAnYmxvY2stc3R1ZHktc3VzLWhvbGRlciddO1xuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c1JlbW92ZSA9IFtgc3R1ZHktcHJvZ3Jlc3MtbWFwLSR7dGhpcy5zdHVkeVF1ZXN0aW9ufWAsICdtYXAtYWN0aW9uLWhvbGRlciddO1xuXG4gICAgLy8gU1VTIHNjb3Jlc1xuICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c0FkZCA9IFsnc3R1ZHktcHJvZ3Jlc3MtZW5kJywgJ2Jsb2NrLXN0dWR5LWNvbXBsZXRlZC1ob2xkZXInXTtcbiAgICB0aGlzLnN0dWR5U1VTRWxlbWVudHNSZW1vdmUgPSBbJ3N0dWR5LXByb2dyZXNzLXN1cycsICdibG9jay1zdHVkeS1zdXMtaG9sZGVyJ107XG4gICAgdGhpcy5zdXNTdG9yYWdlS2V5cyA9IFsnc3VzLXF1ZXN0aW9uLTEnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi0yJyxcbiAgICAgICdzdXMtcXVlc3Rpb24tMycsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTQnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi01JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNicsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTcnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi04JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tOScsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTEwJ107XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIHN1Ym1pdHRpbmcgY2hhbmdlIGRhdGEgb24gbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcblxuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZ3JpZE5hbWUgPSAnZ3JpZC1ib3gtJztcbiAgICAgICAgY29uc3QgZ3JpZEl0ZXJhdGlvbnMgPSA0MjtcbiAgICAgICAgdXRpbGl0eS5zZXRBUElGb3JHcm91cChncmlkTmFtZSwgZ3JpZEl0ZXJhdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBzdWJtaXR0aW5nIHN1cyBzY29yZVxuICAvL1xuICAvLyBAcGFyYW0gZWxlbWVudElEIC0gSFRNTCBlbGVtZW50IElEXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyU3VibWl0U1VTQ2xpY2soZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gYWRkIGVsZW1lbnRzIHRvIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5U1VTRWxlbWVudHNSZW1vdmUuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGFkZCBkaXNwbGF5IG5vbmUgY2xhc3MgaWYgdGhlIGNsYXNzIGRvZXMgbm90IGV4c2lzdFxuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGR1cGxpY2F0ZSBjbGFzc2VzIGFyZSBub3QgYWRkZWRcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5kaXNwbGF5Tm9uZUNsYXNzKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5hZGQodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN1c1ZhbHVlQXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5zdXNTdG9yYWdlS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkFuc3dlciA9IHN0b3JlLmdldFN0YXRlSXRlbShrZXkpO1xuICAgICAgICAgIHN1c1ZhbHVlQXJyYXkucHVzaCh7IGtleSwgcXVlc3Rpb25BbnN3ZXIgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkYXRlc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIHV0aWxpdHkudHJpZ2dlckV2ZW50KCdzdXMtY2xpY2tlZCcsICdzdXMtY2xpY2tlZCcpO1xuXG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3VzYW5zd2VycycsIHN1c1ZhbHVlQXJyYXkpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtdGltZScsIGRhdGVzdGFtcCk7XG5cbiAgICAgICAgSGFuZGxlcnMucmVjb3JkQWdncmVlZCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgcmVjb3JkRGlzYWdncmVlZCgpIHtcbiAgICBjb25zdCB1dWlkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJyk7XG4gICAgY29uc3Qgc3R1ZHlTdGFydGVkUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkJyk7XG4gICAgY29uc3Qgc3R1ZHlTdGFydGVkVGltZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCB0aW1lJyk7XG4gICAgY29uc3Qgc3R1ZHlBZ3JlZW1lbnRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xuICAgIGNvbnN0IHN0dWR5QWdyZWVtZW50VGltZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50LXRpbWUnKTtcbiAgICBjb25zdCBjYW1wYWlnblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnY2FtcGFpZ24nKTtcbiAgICBjb25zdCBtb2JpbGVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21vYmlsZScpO1xuICAgIGNvbnN0IG1hcFZlcnNpb25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3Qgc3R1ZHlRdWVzdGlvblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICBjb25zdCBzdXNhbnN3ZXJzUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzJyk7XG4gICAgY29uc3QgZ3JpZGFuc3dlcnNSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzJyk7XG4gICAgY29uc3QgZ3JpZGNvcnJlY3RSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG5cbiAgICBjb25zdCBncmlkY29ycmVjdFJlY1Byb3BzID0gW107XG5cbiAgICBncmlkY29ycmVjdFJlYy5mZWF0dXJlcy5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgIGdyaWRjb3JyZWN0UmVjUHJvcHMucHVzaCh7XG4gICAgICAgIGtleTogYGdyaWQtYm94LSR7dmFsLnByb3BlcnRpZXMuaWR9YCxcbiAgICAgICAgdmFsdWU6IHZhbC5wcm9wZXJ0aWVzLnZcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkRhdGEgPSB7XG4gICAgICB1dWlkOiB1dWlkUmVjLFxuICAgICAgc3R1ZHlfc3RhcnRlZDogc3R1ZHlTdGFydGVkUmVjLFxuICAgICAgc3R1ZHlfc3RhcnRlZF90aW1lOiBzdHVkeVN0YXJ0ZWRUaW1lUmVjLFxuICAgICAgc3R1ZHlfYWdyZWVtZW50OiBzdHVkeUFncmVlbWVudFJlYyxcbiAgICAgIHN0dWR5X2FncmVlbWVudF90aW1lOiBzdHVkeUFncmVlbWVudFRpbWVSZWMsXG4gICAgICBjYW1wYWlnbjogSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25SZWMpLFxuICAgICAgbW9iaWxlOiBKU09OLnN0cmluZ2lmeShtb2JpbGVSZWMpLFxuICAgICAgbWFwX3ZlcnNpb246IG1hcFZlcnNpb25SZWMsXG4gICAgICBncmlkX2NvcnJlY3Q6IEpTT04uc3RyaW5naWZ5KGdyaWRjb3JyZWN0UmVjUHJvcHMpLFxuICAgICAgZ3JpZF9hbnN3ZXJzOiBKU09OLnN0cmluZ2lmeShncmlkYW5zd2Vyc1JlYyksXG4gICAgICBncmlkYW5zd2Vyc190aW1lOiAnJyxcbiAgICAgIHN0dWR5X3F1ZXN0aW9uOiBzdHVkeVF1ZXN0aW9uUmVjLFxuICAgICAgc3VzX2Fuc3dlcnM6IEpTT04uc3RyaW5naWZ5KHN1c2Fuc3dlcnNSZWMpLFxuICAgICAgc3VzYW5zd2Vyc190aW1lOiAnJ1xuICAgIH07XG5cbiAgICByZWNvcmRTdHVkeURhdGEuc2V0RXZlbnRBbGwoanNvbkRhdGEpO1xuICB9XG5cbiAgc3RhdGljIHJlY29yZEFnZ3JlZWQoKSB7XG4gICAgY29uc3QgdXVpZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpO1xuICAgIGNvbnN0IHN0dWR5U3RhcnRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCcpO1xuICAgIGNvbnN0IHN0dWR5U3RhcnRlZFRpbWVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQgdGltZScpO1xuICAgIGNvbnN0IHN0dWR5QWdyZWVtZW50UmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnKTtcbiAgICBjb25zdCBzdHVkeUFncmVlbWVudFRpbWVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudC10aW1lJyk7XG4gICAgY29uc3QgY2FtcGFpZ25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2NhbXBhaWduJyk7XG4gICAgY29uc3QgbW9iaWxlUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtb2JpbGUnKTtcbiAgICBjb25zdCBtYXBWZXJzaW9uUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IHN0dWR5UXVlc3Rpb25SZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJyk7XG4gICAgY29uc3Qgc3VzYW5zd2Vyc1JlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2VycycpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNEYXRlUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXRpbWUnKTtcbiAgICBjb25zdCBncmlkYW5zd2Vyc1JlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMnKTtcbiAgICBjb25zdCBncmlkYW5zd2Vyc0RhdGVSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzLXRpbWUnKTtcbiAgICBjb25zdCBncmlkY29ycmVjdFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcblxuICAgIGNvbnN0IGdyaWRjb3JyZWN0UmVjUHJvcHMgPSBbXTtcblxuICAgIGdyaWRjb3JyZWN0UmVjLmZlYXR1cmVzLmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgZ3JpZGNvcnJlY3RSZWNQcm9wcy5wdXNoKHtcbiAgICAgICAga2V5OiBgZ3JpZC1ib3gtJHt2YWwucHJvcGVydGllcy5pZH1gLFxuICAgICAgICB2YWx1ZTogdmFsLnByb3BlcnRpZXMudlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBqc29uRGF0YSA9IHtcbiAgICAgIHV1aWQ6IHV1aWRSZWMsXG4gICAgICBzdHVkeV9zdGFydGVkOiBzdHVkeVN0YXJ0ZWRSZWMsXG4gICAgICBzdHVkeV9zdGFydGVkX3RpbWU6IHN0dWR5U3RhcnRlZFRpbWVSZWMsXG4gICAgICBzdHVkeV9hZ3JlZW1lbnQ6IHN0dWR5QWdyZWVtZW50UmVjLFxuICAgICAgc3R1ZHlfYWdyZWVtZW50X3RpbWU6IHN0dWR5QWdyZWVtZW50VGltZVJlYyxcbiAgICAgIGNhbXBhaWduOiBKU09OLnN0cmluZ2lmeShjYW1wYWlnblJlYyksXG4gICAgICBtb2JpbGU6IEpTT04uc3RyaW5naWZ5KG1vYmlsZVJlYyksXG4gICAgICBtYXBfdmVyc2lvbjogbWFwVmVyc2lvblJlYyxcbiAgICAgIGdyaWRfY29ycmVjdDogSlNPTi5zdHJpbmdpZnkoZ3JpZGNvcnJlY3RSZWNQcm9wcyksXG4gICAgICBncmlkX2Fuc3dlcnM6IEpTT04uc3RyaW5naWZ5KGdyaWRhbnN3ZXJzUmVjKSxcbiAgICAgIGdyaWRhbnN3ZXJzX3RpbWU6IGdyaWRhbnN3ZXJzRGF0ZVJlYyxcbiAgICAgIHN0dWR5X3F1ZXN0aW9uOiBzdHVkeVF1ZXN0aW9uUmVjLFxuICAgICAgc3VzX2Fuc3dlcnM6IEpTT04uc3RyaW5naWZ5KHN1c2Fuc3dlcnNSZWMpLFxuICAgICAgc3VzYW5zd2Vyc190aW1lOiBzdXNhbnN3ZXJzRGF0ZVJlY1xuICAgIH07XG5cbiAgICByZWNvcmRTdHVkeURhdGEuc2V0RXZlbnRBbGwoanNvbkRhdGEpO1xuICB9XG5cbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBhZ2dyZWVpbmcgdG8gZG8gc3R1ZHlcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJBZ3JlZUNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0dWR5VmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICAgICAgY29uc3QgYWdyZWVtZW50VGltZVN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5QWdncmVlbWVudEVsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZWxlbWVudFVJSUR9JHtzdHVkeVZlcnNpb259YCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyAgcmVtb3ZlIGVsZW1lbnRzIGZyb20gVUlcbiAgICAgICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbGl0eS50cmlnZ2VyRXZlbnQoJ2FnZ3JlZS1jbGlja2VkJywgJ2hhbmRsZUFncmVlQ2xpY2snKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCB0cnVlKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScsIGFncmVlbWVudFRpbWVTdGFtcCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIERJU2FnZ3JlZWluZyB0byBkbyBzdHVkeVxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlckRpc2FncmVlQ2xpY2soZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgYWdyZWVtZW50VGltZVN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAvLyBhZGQgZWxlbWVudHMgdG8gVUlcbiAgICAgICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlsaXR5LnRyaWdnZXJFdmVudCgnZGlzYWdncmVlLWNsaWNrZWQnLCAnaGFuZGxlQWdyZWVDbGljaycpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIGZhbHNlKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScsIGFncmVlbWVudFRpbWVTdGFtcCk7XG5cbiAgICAgICAgSGFuZGxlcnMucmVjb3JkRGlzYWdncmVlZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBpbmRpdmlkdWFsIHN1cyBzY29yZSBxdWVzdGlvbnMgdG8gbG9jYWwgc3RvcmFnZVxuICAvL1xuICAvLyBAcGFyYW0gZWxlbWVudElEIC0gSFRNTCBlbGVtZW50IElEXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2xhc3MgPSAnc2VsZWN0ZWQnO1xuXG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gZ2V0IHBhcmVudCBlbGVtZW50IHdoaWNoIGlzIGJ1dHRvbiBncm91cFxuICAgICAgICBjb25zdCBwYXJlbnRCdG5Hcm91cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUudGFyZ2V0LmlkKS5wYXJlbnRFbGVtZW50O1xuICAgICAgICBIYW5kbGVycy50b2dnbGVCdXR0b25Hcm91cEJ1dHR0b25zT2ZmKHBhcmVudEJ0bkdyb3VwLCB0aGlzLnNlbGVjdGVkQ2xhc3MpO1xuXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uVGV4dCA9IHBhcmVudEJ0bkdyb3VwLmlkLnJlcGxhY2UoJ2J0bi1ncm91cC1zdXMtJywgJ3N1cy1xdWVzdGlvbi0nKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKHF1ZXN0aW9uVGV4dCwgTnVtYmVyKGUudGFyZ2V0LmlubmVyVGV4dCkpO1xuXG4gICAgICAgIC8vIGFkZCBzdXMgcXVlc3Rpb24gYW5zd2VyIHRvIHNlbGVjdGVkIHRvIGNsYXNzXG4gICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLnNlbGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLmNsYXNzTGlzdC5hZGQodGhpcy5zZWxlY3RlZENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gcmVtb3ZlcyB0aGUgc2VsZWN0ZWQgY2xhc3MgXCJ1bnNsZWN0c1wiIGFsbCB0aGUgYnV0dG9uc1xuICAvLyAgaW4gYSBidXR0b24gZ3JvdXBcbiAgLy9cbiAgLy8gQHBhcmFtIGJ0bkdyb3VwIC0gSFRNTCBlbGVtZW50XG4gIC8vIEByZXR1cm4gbnVsbFxuICBzdGF0aWMgdG9nZ2xlQnV0dG9uR3JvdXBCdXR0dG9uc09mZihidG5Hcm91cCwgc2VsZWN0ZWRDbGFzcykge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gYnRuR3JvdXAuY2hpbGROb2RlcztcbiAgICAvLyBtYWtlIHN1cmUgY2hpbGRyZW4gaXMgdmFsaXVkIG9iamVjdFxuICAgIGlmICghdXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KGNoaWxkcmVuKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAvLyBtYWtlIHN1cmUgdGhlcmUgYXJlIGNoaWxkZXJlbiBidXR0b25zXG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBbLi4uY2hpbGRyZW5dO1xuICAgICAgY2hpbGRyZW5BcnJheS5mb3JFYWNoKChjaGlsZEl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGNoaWxkSXRlbS5jbGFzc0xpc3QpIHtcbiAgICAgICAgICBjaGlsZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShzZWxlY3RlZENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCIvLyBpbXBvcnQgZGVwZW5kZW5jaWVzXG4vLyBUT0RPU1xuLy8gQmFjayB0byBncmlkIGJ1dHRvbiB3aGVuIG9uIHN1cz8gbWF5YmUgb3IgdXNlIG5hdmdvIHRvIGNyZWF0ZSBwYWdlXG4vLyBwbGF5IHBhdXNlIG9uIGFuaW1hdGlvbiAtIG1heWJlXG5pbXBvcnQgeyBsaWJyYXJ5LCBkb20gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgZmFzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IGZhciB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXJlZ3VsYXItc3ZnLWljb25zJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBNYXBCb3hDb25maWcgfSBmcm9tICcuL21hcC1jb25maWcnO1xuaW1wb3J0IHsgVXRpbGl0eSB9IGZyb20gJy4vdXRpbGl0eSc7XG5pbXBvcnQgeyBIYW5kbGVycyB9IGZyb20gJy4vaGFuZGxlcnMnO1xuXG5pbXBvcnQgYmxvY2tTdHVkeUFnZ3JlZW1lbnQgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktYWdncmVlbWVudC5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5RGlzc2FnZ3JlZSBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1kaXNzYWdncmVlLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlRdWVzdGlvbjEgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5UXVlc3Rpb24yIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTIuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVF1ZXN0aW9uMyBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0zLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlTVVMgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlDb21wbGV0ZWQgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5cbi8vIHN0dWR5IGNvbnN0cmFpbnRzIG51bWJlciBvZiBxdWVzdGlvbnMgc3RhcnRzIHdpdGggMFxuY29uc3Qgc3R1ZHlNaW5PbmUgPSAwO1xuY29uc3Qgc3R1ZHlNYXhPbmUgPSAyO1xuY29uc3Qgc3R1ZHlWZXJzaW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHN0dWR5TWF4T25lIC0gc3R1ZHlNaW5PbmUgKyAxKSArIHN0dWR5TWluT25lKTtcbnN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nLCBzdHVkeVZlcnNpb24pO1xuXG4vLyBzdHVkeSBjb25zdHJhaW50cyBudW1iZXIgb2YgcXVlc3Rpb25zIHN0YXJ0cyB3aXRoIDBcbmNvbnN0IG1hcE1pbk9uZSA9IDA7XG5jb25zdCBtYXBNYXhPbmUgPSAyO1xuY29uc3QgbWFwVmVyc2lvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXBNYXhPbmUgLSBtYXBNaW5PbmUgKyAxKSArIG1hcE1pbk9uZSk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJywgbWFwVmVyc2lvbik7XG5cbmNvbnN0IHV0aWxpdHkgPSBuZXcgVXRpbGl0eSgpO1xuY29uc3QgaGFuZGxlcnMgPSBuZXcgSGFuZGxlcnMoKTtcbmNvbnN0IG1hcEJveENvbmZpZyA9IG5ldyBNYXBCb3hDb25maWcoKTtcblxuaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgndXVpZCcsIHV0aWxpdHkudXVpZCgpLnRvU3RyaW5nKCkpO1xufVxuXG4vLyBLaWNrcyBvZmYgdGhlIHByb2Nlc3Mgb2YgZmluZGluZyA8aT4gdGFncyBhbmQgcmVwbGFjaW5nIHdpdGggPHN2Zz5cbi8vIGFkZGVzIHN1cHBvcnQgZm9yIGZvbnRhd2Vzb21lXG5saWJyYXJ5LmFkZChmYXMsIGZhcik7XG5kb20ud2F0Y2goKTtcblxuLy8gbG9hZCBvbmx5IHRoZSBibG9jayBuZWVkZWRcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktYWdncmVlbWVudC1ob2xkZXInLCBibG9ja1N0dWR5QWdncmVlbWVudCk7XG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUtaG9sZGVyJywgYmxvY2tTdHVkeURpc3NhZ2dyZWUpO1xudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1zdXMtaG9sZGVyJywgYmxvY2tTdHVkeVNVUyk7XG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LWNvbXBsZXRlZC1ob2xkZXInLCBibG9ja1N0dWR5Q29tcGxldGVkKTtcblxuLy8gY3JlYXRlIG1hcGJveCBuYXZpZ2F0aW9uIGNvbnRyb2wgaW5zdGFuY2VcbmNvbnN0IG5hdiA9IG1hcEJveENvbmZpZy5hZGROYXYoKTtcbmxldCBtYXAxO1xubGV0IG1hcDJhO1xubGV0IG1hcDJiO1xubGV0IG1hcDNBcnI7XG5sZXQgbWFwZGVmO1xuXG5zd2l0Y2ggKHN0dWR5VmVyc2lvbikge1xuICBjYXNlIDA6IC8vIGFuaW1hdGVcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTEtaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMSk7XG4gICAgbWFwMSA9IG1hcEJveENvbmZpZy5tYWtlQW5pbWF0ZU1hcCgnbWFwLTEnLCAwKTtcbiAgICBtYXAxLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcbiAgICBicmVhaztcbiAgY2FzZSAxOiAvLyBzaWRlIGJ5IHNpZGVcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTItaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMik7XG4gICAgbWFwMmEgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLTJhJywgMCk7XG4gICAgbWFwMmIgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLTJiJywgMSk7XG4gICAgbWFwMmEuYWRkQ29udHJvbChuYXYsICd0b3AtbGVmdCcpO1xuICAgIG1hcDJiLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcbiAgICBtYXBCb3hDb25maWcuc3luY01hcHMobWFwMmEsIG1hcDJiKTtcbiAgICBicmVhaztcbiAgY2FzZSAyOiAvLyBzbGlkZXJcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMtaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMyk7XG4gICAgbWFwM0FyciA9IG1hcEJveENvbmZpZy5tYWtlQ29tcGFyZU1hcCgnbWFwLTNhJywgJ21hcC0zYicsICdjb21wYXJlLXdyYXBwZXInKTtcbiAgICBtYXAzQXJyWzBdLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcbiAgICBtYXAzQXJyWzFdLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcbiAgICBtYXBCb3hDb25maWcuc3luY01hcHMobWFwM0FyclswXSwgbWFwM0FyclsxXSk7XG4gICAgYnJlYWs7XG4gIGRlZmF1bHQ6IC8vIGFuaW1hdGVcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTEtaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMSk7XG4gICAgbWFwZGVmID0gbWFwQm94Q29uZmlnLm1ha2VBbmltYXRlTWFwKCdtYXAtMScsIDApO1xuICAgIG1hcGRlZi5hZGRDb250cm9sKG5hdiwgJ3RvcC1sZWZ0Jyk7XG4gICAgYnJlYWs7XG59XG5cbi8vIGNyZWF0ZSBhbGwgdGhlIG1hcGJveCBtYXAgb2JqZWN0c1xuLy8gY29uc3QgbWFwRW5kQXJyID0gbWFwQm94Q29uZmlnLm1ha2VDb21wYXJlTWFwKCdtYXAtYy1lbmRhJyxcbi8vICAnbWFwLWMtZW5kYicsICdjb21wYXJlLWVuZC13cmFwcGVyJywgdHJ1ZSwgZmFsc2UpO1xuLy9cbmNvbnN0IG1hcEVuZGEgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLWVuZGEnLCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgbWFwRW5kYiA9IG1hcEJveENvbmZpZy5tYWtlTWFwKCdtYXAtZW5kYicsIDEsIHRydWUsIGZhbHNlKTtcbi8vIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXBFbmRBcnJbMF0sIG1hcEVuZEFyclsxXSk7XG5cblxuLy8gYWRkIG5hdmlnYXRpbyB0byBtYXBzXG4vLyBJIG1heSBub3QgbmVlZCB0aGlzIGlmIEkgZG8gbm90IGxldCB1c2VyIHpvb20vcGFuXG4vLyBtYXBFbmRBcnJbMF0uYWRkQ29udHJvbChuYXYsICd0b3AtbGVmdCcpO1xuLy8gbWFwRW5kQXJyWzFdLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcbm1hcEVuZGEuYWRkQ29udHJvbChuYXYsICd0b3AtbGVmdCcpO1xubWFwRW5kYi5hZGRDb250cm9sKG5hdiwgJ3RvcC1sZWZ0Jyk7XG5cbi8vIHN5bmMgbWFwc1xubWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcEVuZGEsIG1hcEVuZGIpO1xuXG4vLyAvLyBUT0RPIG9ubHkgZGVhbCB3aXRoIG1hcCBmb3Igc3R1ZHkgcXVlc3Rpb25cbi8vIC8vIG9ubHkgbG9hZCBodG1sIGJsb2NrIG5lZWRlZCBtYXAgb2JqZWN0cyB3aWxsIGhhdmUgZ2VuZXJpYyBuYW1lcyBhbHNvXG5mdW5jdGlvbiByZXNpemVBbGxNYXBzKCkge1xuICBzd2l0Y2ggKHN0dWR5VmVyc2lvbikge1xuICAgIGNhc2UgMDogLy8gYW5pbWF0ZVxuICAgICAgbWFwMS5yZXNpemUoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTogLy8gc2lkZSBieSBzaWRlXG4gICAgICBtYXAyYS5yZXNpemUoKTtcbiAgICAgIG1hcDJiLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOiAvLyBzbGlkZXJcbiAgICAgIG1hcDNBcnJbMF0ucmVzaXplKCk7XG4gICAgICBtYXAzQXJyWzFdLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDogLy8gYW5pbWF0ZVxuICAgICAgbWFwZGVmLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgLy8gbWFwRW5kQXJyWzBdLnJlc2l6ZSgpO1xuICAvLyBtYXBFbmRBcnJbMV0ucmVzaXplKCk7XG4gIG1hcEVuZGEucmVzaXplKCk7XG4gIG1hcEVuZGIucmVzaXplKCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnZ3JlZS1jbGlja2VkJywgKCkgPT4ge1xuICByZXNpemVBbGxNYXBzKCk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VzLWNsaWNrZWQnLCAoKSA9PiB7XG4gIG1hcEVuZGEuc2V0Wm9vbSg1KTtcbiAgbWFwRW5kYS5zZXRab29tKDUpO1xuICByZXNpemVBbGxNYXBzKCk7XG4gIC8vIG1hcEVuZEFyclswXS5zZXRab29tKDExKTtcbiAgLy8gbWFwRW5kQXJyWzFdLnNldFpvb20oMTEpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Rpc2FnZ3JlZS1jbGlja2VkJywgKCkgPT4ge1xuICByZXNpemVBbGxNYXBzKCk7XG59KTtcblxuY29uc3QgdXJsU3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5jb25zdCB1cmwgPSBuZXcgVVJMKHVybFN0cmluZyk7XG5jb25zdCBjYW1wYWlnbiA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdjYW1wYWlnbicpO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuY29uc3QgZGF0ZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkJywgdHJ1ZSk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQgdGltZScsIGRhdGVzdGFtcCk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ2NhbXBhaWduJywgY2FtcGFpZ24pO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdtb2JpbGUnLCB1dGlsaXR5LmlzTW9iaWxlRGV2aWNlKCkpO1xuXG4vLyBhbGwgdGhlIEFnZ3JlZW1lbnQgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cyA9IFsnYWdncmVlLWJ1dHRvbiddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gYWdncmVlIHRvXG4vLyBwYXJ0aWNwYXRlIGluIHN0dWR5XG5hZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyQWdyZWVDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gYWxsIHRoZSBEaXNhZ2dyZWVtZW50IGNoYW5nZSBlbGVtZW50cyBwb3NzaWJsZVxuY29uc3QgZGlzYWdncmVtZW50Q2hhbmdlRWxlbWVudHMgPSBbJ2RpYWdncmVlLWJ1dHRvbiddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gYWdncmVlIHRvXG4vLyBwYXJ0aWNwYXRlIGluIHN0dWR5XG5kaXNhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyRGlzYWdyZWVDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gYWxsIHRoZSBzdWJtaXQgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBzdWJtaXRDaGFuZ2VFbGVtZW50cyA9IFsnc3VibWl0LWJ1dHRvbi10by1zdXMtMCcsICdzdWJtaXQtYnV0dG9uLXRvLXN1cy0xJywgJ3N1Ym1pdC1idXR0b24tdG8tc3VzLTInXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIHN1Ym1pdCBjaGFuZ2Vcbi8vIGZyb20gb25lIG9mIHRocmVlIG1hcCBxdWVzdGlvbnNcbnN1Ym1pdENoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gYWxsIHRoZSBTVVMgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBzdXNDaGFuZ2VFbGVtZW50cyA9IFsnc3VibWl0LWJ1dHRvbi10by1lbmQnXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIHN1Ym1pdCBjaGFuZ2Vcbi8vIGZyb20gb25lIG9mIHRocmVlIG1hcCBxdWVzdGlvbnNcbnN1c0NoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTdWJtaXRTVVNDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gb25seSB1cGRhdGVzIG9uZSBtYXAgaG93IGRvIGdldCBldmVyeSBtYXBcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dyaWQtdXBkYXRlJywgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gIHN3aXRjaCAoc3R1ZHlWZXJzaW9uKSB7XG4gICAgY2FzZSAwOiAvLyBhbmltYXRlXG4gICAgICBtYXAxLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6IC8vIHNpZGUgYnkgc2lkZVxuICAgICAgbWFwMmEuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIG1hcDJiLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6IC8vIHNsaWRlclxuICAgICAgbWFwM0FyclswXS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgICAgbWFwM0FyclsxXS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDogLy8gYW5pbWF0ZVxuICAgICAgbWFwZGVmLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgfVxuICAvLyBtYXBFbmRBcnJbMF0uZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgLy8gbWFwRW5kQXJyWzFdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gIG1hcEVuZGEuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgbWFwRW5kYi5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xufSk7XG5cbmNvbnN0IHN1c0J0bkdyb3VwRWxlbWVudHMgPSBbJ2J0bi1ncm91cC1zdXMtMScsXG4gICdidG4tZ3JvdXAtc3VzLTInLFxuICAnYnRuLWdyb3VwLXN1cy0zJyxcbiAgJ2J0bi1ncm91cC1zdXMtNCcsXG4gICdidG4tZ3JvdXAtc3VzLTUnLFxuICAnYnRuLWdyb3VwLXN1cy02JyxcbiAgJ2J0bi1ncm91cC1zdXMtNycsXG4gICdidG4tZ3JvdXAtc3VzLTgnLFxuICAnYnRuLWdyb3VwLXN1cy05JyxcbiAgJ2J0bi1ncm91cC1zdXMtMTAnXTtcblxuc3VzQnRuR3JvdXBFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAvLyBhZGQgcXVlc3Rpb24gaGFuZGxlclxuICBoYW5kbGVycy5hZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gc3VzIHF1ZXN0aW9uIHN0YXRlIGl0ZW1zXG5jb25zdCBzdXNOYW1lID0gJ3N1cy1xdWVzdGlvbi0nO1xuY29uc3Qgc3VzSXRlcmF0aW9ucyA9IDEwO1xudXRpbGl0eS5zZXRTdGF0ZUZvckdyb3VwKHN1c05hbWUsIHN1c0l0ZXJhdGlvbnMpO1xuXG4vLyBhZGQgZ3JpZCBib3ggc3RhdGUgaXRlbXNcbmNvbnN0IGdyaWRJdGVyYXRpb25zID0gNDI7XG5jb25zdCBncmlkTmFtZSA9ICdncmlkLWJveC0nO1xudXRpbGl0eS5zZXRTdGF0ZUZvckdyb3VwKGdyaWROYW1lLCBncmlkSXRlcmF0aW9ucyk7XG5cbi8vIGNoZWNrIHN0dWR5IHNlc3Npb24gc3RhdGUgZm9yIGNvbXBsZXRldGlvblxuY29uc3QgaXNTdHVkeWNvbXBsZXRlZCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHljb21wbGV0ZWQnKTtcbmxldCBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBpc1N0dWR5Y29tcGxldGVkID09PSAnYm9vbGVhbicpIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBpc1N0dWR5Y29tcGxldGVkO1xufSBlbHNlIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBmYWxzZTtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBTdHVkeUFncnJlZW1lbnQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xubGV0IHN0dWR5QWdycmVlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBTdHVkeUFncnJlZW1lbnQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUFncnJlZWQgPSBTdHVkeUFncnJlZW1lbnQ7XG59IGVsc2Uge1xuICBzdHVkeUFncnJlZWQgPSBmYWxzZTtcbn1cblxuLy8gYWxyZWFkeSBhZ3JlZWRcbmlmIChzdHVkeUFncnJlZWQpIHtcbiAgLy8gaGFuZGxlQWdyZWVDbGljaygpO1xufVxuXG4vLyBoaWRlIHN0dWR5XG5pZiAoc3R1ZHlDb21wbGV0ZWQpIHsgLy9cbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIHRydWUpO1xufSBlbHNlIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIGZhbHNlKTtcbn1cbiIsImltcG9ydCBtYXBib3hnbCBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IE1hcGJveENvbXBhcmUgZnJvbSAnbWFwYm94LWdsLWNvbXBhcmUnO1xuaW1wb3J0IHsgcG9seWdvbiwgZmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICdAdHVyZi9oZWxwZXJzJztcbi8vIGltcG9ydCBjZW50ZXIgZnJvbSAnQHR1cmYvY2VudGVyJztcbmltcG9ydCB7IFV0aWxpdHkgfSBmcm9tICcuL3V0aWxpdHknO1xuLy8gaW1wb3J0IHNxdWFyZUdyaWQgZnJvbSAnQHR1cmYvc3F1YXJlLWdyaWQnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTk9uZSBmcm9tICcuL3NxdWFyZS1ncmlkLWdlb2pzb24uanNvbic7XG5pbXBvcnQgU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQgZnJvbSAnLi9zcXVhcmUtZ3JpZC1nZW9qc29uLXNlY29uZC5qc29uJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkIGZyb20gJy4vc3F1YXJlLWdyaWQtZ2VvanNvbi10aGlyZC5qc29uJztcblxuY29uc3Qgc3luY01vdmUgPSByZXF1aXJlKCdAbWFwYm94L21hcGJveC1nbC1zeW5jLW1vdmUnKTtcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgdXRpbGl0eSA9IG5ldyBVdGlsaXR5KCk7XG5cbmV4cG9ydCBjbGFzcyBNYXBCb3hDb25maWcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgc3dpdGNoICh0aGlzLm1hcFZlcnNpb24pIHtcbiAgICAgIGNhc2UgMDogLy8gYXZsXG4gICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBTcXVhcmVHcmlkR2VvSlNPTk9uZTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIFNxdWFyZUdyaWRHZW9KU09OT25lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6IC8vIGhzdG5cbiAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IFNxdWFyZUdyaWRHZW9KU09OU2Vjb25kO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjogLy8gbHZcbiAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IFNxdWFyZUdyaWRHZW9KU09OVGhpcmQ7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nLCBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBhdmxcbiAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IFNxdWFyZUdyaWRHZW9KU09OT25lO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05PbmUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmRlZmF1bHRNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJztcbiAgICB0aGlzLmRlZmF1bHRNYXBDZW50ZXIgPSBbLTgyLjU3MCwgMzUuNTYwXTsgLy8gc3RhcnRpbmcgcG9zaXRpb24gW2xuZywgbGF0XVxuICAgIHRoaXMuZGVmYXVsdE1heEJvdW5kcyA9IFstODIuNzAyLCAzNS40NjMsIC04Mi40NDIsIDM1LjY1N107XG4gICAgdGhpcy5kZWZhdWx0TWFwWm9vbSA9IDU7IC8vIHN0YXJ0aW5nIHpvb21cbiAgICB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIgPSAnbWFwJztcbiAgICB0aGlzLmRhcmtNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L2RhcmstdjEwJztcbiAgICB0aGlzLmxpZ2h0TWFwU3R5bGUgPSAnbWFwYm94Oi8vc3R5bGVzL21hcGJveC9saWdodC12MTAnO1xuICAgIHRoaXMubWFwYm94Z2wgPSBtYXBib3hnbDtcbiAgICB0aGlzLk1hcGJveENvbXBhcmUgPSBNYXBib3hDb21wYXJlO1xuICAgIHRoaXMubWFwYm94Z2wuYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2laR0YyWldsemJTSXNJbUVpT2lKQ2RqVXhUMEZ6SW4wLlY5b0lrX3dVYzR1WnU3VUJibFI4bXcnO1xuICAgIHRoaXMucXVpZXQgPSB0cnVlO1xuICAgIHRoaXMubWFwMSA9IG51bGw7XG4gICAgdGhpcy5tYXAyID0gbnVsbDtcbiAgICB0aGlzLmRlZmF1bHRHcmV5Qm94ID0gJyM1NTU1NTUnO1xuICAgIHRoaXMuc2VsZWN0ZWRCb3ggPSAnI0ZCQjAzQic7XG4gICAgdGhpcy5tYXBDaGFuZ2VMYXllcnMgPSB7XG4gICAgICBsYXllcnM6IFtcbiAgICAgICAgWyAvLyBhdmwgMFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9pa25vd18xL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICAgICAgbWF4em9vbTogMTQsXG4gICAgICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgICAgIGJvdW5kczogWy04Mi42NDcsIDM1LjUwNywgLTgyLjQ5OCwgMzUuNjEyXSxcbiAgICAgICAgICAgIG1heGJvdW5kczogWy04Mi43MDIsIDM1LjQ0MiwgLTgyLjQ2MiwgMzUuNjU3XVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2lrbm93XzIve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBbLTgyLjY0NywgMzUuNTA3LCAtODIuNDk4LCAzNS42MTJdLFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBbLTgyLjcwMiwgMzUuNDQyLCAtODIuNDYyLCAzNS42NTddXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBbIC8vIGhzdG4gMVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9sYW5kY292ZXJfMS97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IFstOTUuOTQwLCAyOS42NzEsIC05NS43OTEsIDI5Ljc3NV0sXG4gICAgICAgICAgICBtYXhib3VuZHM6IFstOTUuOTkyLCAyOS42MjUsIC05NS43MzksIDI5LjgyMF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9sYW5kY292ZXJfMi97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IFstOTUuOTQwLCAyOS42NzEsIC05NS43OTEsIDI5Ljc3NV0sXG4gICAgICAgICAgICBtYXhib3VuZHM6IFstOTUuOTkyLCAyOS42MjUsIC05NS43MzksIDI5LjgyMF1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFsgLy8gbHYgMlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9uYWlwXzEve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBbLTExNC44OTksIDM2LjA3OTUsIC0xMTQuNzUwLCAzNi4xODNdLFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBbLTExNC45NTUsIDM2LjAzNCwgLTExNC42OTQsIDM2LjIyOF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9uYWlwXzIve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBbLTExNC44OTksIDM2LjA3OTUsIC0xMTQuNzUwLCAzNi4xODNdLFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBbLTExNC45NTUsIDM2LjAzNCwgLTExNC42OTQsIDM2LjIyOF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUgPSBbXG4gICAgICAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL25sY2QtMjAxNi0zMC97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9ubGNkLTIwMDEtMzAve3p9L3t4fS97eX0ucG5nJ1xuICAgIF07XG4gIH1cblxuICAvLyBTZXRzIGFuIGluZGl2aWR1YWwgbWFwYm94IG1hcCB0ZXN0XG4gIC8vXG4gIC8vIEBwYXJhbSBtYXBDb250YWluZXIgLSBzdHJpbmdcbiAgLy8gQHJldHVybiBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZU1hcChtYXBDb250YWluZXIgPSB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIsIG1hcEluZGV4ID0gMCwgZW5kID0gZmFsc2UsIGVuYWJsZWNsaWNrID0gdHJ1ZSkge1xuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG4gICAgY29uc3QgbWFwID0gbmV3IHRoaXMubWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogbWFwQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMubGlnaHRNYXBTdHlsZSxcbiAgICAgIHpvb206IHRoaXMuZGVmYXVsdE1hcFpvb20sXG4gICAgICBzaG93Wm9vbTogdHJ1ZSxcbiAgICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgICAgbWF4Qm91bmRzOiBtYXBTZXR1cFttYXBJbmRleF0ubWF4Ym91bmRzXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ2xvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5maXRNeUJvdW5kcyhtYXApO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCBtYXBJbmRleCkpO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkQ29ycmVjdExheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRMYXllcigpKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmFibGVjbGljaykge1xuICAgICAgICB0aGlzLmFkZEdyaWRDbGljayhtYXApO1xuICAgICAgfVxuICAgICAgbWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBtYXAucmVzaXplKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbWFwLnJlc2l6ZSgpOyB9LCAxMCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIG1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG1hcC5yZXNpemUoKTsgfSwgMTApO1xuICAgIH07XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIC8vIFNldHMgdXAgYW5pbWF0ZWQgbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBtYXBDb250YWluZXIgLSBzdHJpbmdcbiAgLy8gQHJldHVybiBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZUFuaW1hdGVNYXAobWFwQ29udGFpbmVyID0gdGhpcy5kZWZhdWx0TWFwQ29udGFpbmVyKSB7XG4gICAgY29uc3QgbWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBtYXBTZXR1cCA9IHRoaXMubWFwQ2hhbmdlTGF5ZXJzLmxheWVyc1ttYXBWZXJzaW9uXTtcblxuICAgIGNvbnN0IG1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcENvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmxpZ2h0TWFwU3R5bGUsXG4gICAgICBjZW50ZXI6IHRoaXMuZGVmYXVsdE1hcENlbnRlcixcbiAgICAgIHpvb206IHRoaXMuZGVmYXVsdE1hcFpvb20sXG4gICAgICBzaG93Wm9vbTogdHJ1ZSxcbiAgICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgICAgbWF4Qm91bmRzOiBtYXBTZXR1cFswXS5tYXhib3VuZHNcbiAgICB9KTtcblxuICAgIG1hcC5vbignbG9hZCcsIChlKSA9PiB7XG4gICAgICB0aGlzLmZpdE15Qm91bmRzKG1hcCk7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlVE1TTGF5ZXIodGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUsIDApKTtcbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgMSkpO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgdGhpcy5hZGRHcmlkQ2xpY2sobWFwKTtcbiAgICAgIG1hcC5yZXNpemUoKTtcblxuICAgICAgY29uc3QgaW5kZXhDb3VudCA9IDI7XG4gICAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGluZGV4ID0gKGluZGV4ICsgMSkgJSBpbmRleENvdW50O1xuICAgICAgICBpZiAoaW5kZXggPT09IDEpIHtcbiAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMScsICd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMCcsICd2aXNpYmlsaXR5JywgJ25vbmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMCcsICd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMScsICd2aXNpYmlsaXR5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIG1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIC8vIG1ha2VDb21wYXJlTWFwIFNldHMgYW4gY29tcGFyaW5nIG1hcCBcInN3aXBpbmdcIiBtYXBib3ggbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBtYXBDb250YWluZXIgLSBzdHJpbmdcbiAgLy8gQHJldHVybiBhcnJheSBvZiBtYXBzIG5ldyBtYXBib3ggbWFwIG9iamVjdFxuICBtYWtlQ29tcGFyZU1hcChtYXBCZWZvcmVDb250YWluZXIsIG1hcEFmdGVyQ29udGFpbmVyLCBtYXBDb21wYXJlV3JhcHBlcklELFxuICAgIGVuZCA9IGZhbHNlLCBlbmFibGVjbGljayA9IHRydWUpIHtcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuXG4gICAgY29uc3QgYmVmb3JlTWFwID0gbmV3IHRoaXMubWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogbWFwQmVmb3JlQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMubGlnaHRNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgICBtYXhCb3VuZHM6IG1hcFNldHVwWzBdLm1heGJvdW5kc1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWZ0ZXJNYXAgPSBuZXcgdGhpcy5tYXBib3hnbC5NYXAoe1xuICAgICAgY29udGFpbmVyOiBtYXBBZnRlckNvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmxpZ2h0TWFwU3R5bGUsXG4gICAgICBjZW50ZXI6IHRoaXMuZGVmYXVsdE1hcENlbnRlcixcbiAgICAgIHpvb206IHRoaXMuZGVmYXVsdE1hcFpvb20sXG4gICAgICBzaG93Wm9vbTogdHJ1ZSxcbiAgICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgICAgbWF4Qm91bmRzOiBtYXBTZXR1cFsxXS5tYXhib3VuZHNcbiAgICB9KTtcbiAgICBjb25zdCBjb21wYXJlID0gbmV3IHRoaXMuTWFwYm94Q29tcGFyZShiZWZvcmVNYXAsIGFmdGVyTWFwLCBgIyR7bWFwQ29tcGFyZVdyYXBwZXJJRH1gKTtcblxuICAgIGJlZm9yZU1hcC5vbignbG9hZCcsIChlKSA9PiB7XG4gICAgICB0aGlzLmZpdE15Qm91bmRzKGJlZm9yZU1hcCk7XG4gICAgICBiZWZvcmVNYXAuYWRkTGF5ZXIodGhpcy5tYWtlVE1TTGF5ZXIodGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUsIDEpKTsgLy8gbmVlZHMgdXBkYXRlXG4gICAgICBiZWZvcmVNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZE91dExpbmVMYXllcigpKTtcbiAgICAgIGJlZm9yZU1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkTGF5ZXIoKSk7XG4gICAgICBpZiAoZW5hYmxlY2xpY2spIHtcbiAgICAgICAgdGhpcy5hZGRHcmlkQ2xpY2soYmVmb3JlTWFwKTtcbiAgICAgIH1cbiAgICAgIGJlZm9yZU1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgYmVmb3JlTWFwLnJlc2l6ZSgpO1xuICAgICAgY29tcGFyZS5zZXRTbGlkZXIoMTUwKTtcbiAgICB9KTtcblxuICAgIGFmdGVyTWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMoYWZ0ZXJNYXApO1xuICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlVE1TTGF5ZXIodGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUsIDApKTsgLy8gbmVlZHMgdXBkYXRlXG4gICAgICBhZnRlck1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICBhZnRlck1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkQ29ycmVjdExheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgfVxuICAgICAgaWYgKGVuYWJsZWNsaWNrKSB7XG4gICAgICAgIHRoaXMuYWRkR3JpZENsaWNrKGFmdGVyTWFwKTtcbiAgICAgIH1cbiAgICAgIGFmdGVyTWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBhZnRlck1hcC5yZXNpemUoKTtcbiAgICAgIGNvbXBhcmUuc2V0U2xpZGVyKDE1MCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIGFmdGVyTWFwLnJlc2l6ZSgpO1xuICAgICAgYmVmb3JlTWFwLnJlc2l6ZSgpO1xuICAgICAgY29tcGFyZS5zZXRTbGlkZXIoMTUwKTtcbiAgICB9O1xuICAgIHJldHVybiBbYmVmb3JlTWFwLCBhZnRlck1hcF07XG4gIH1cblxuICAvLyBpbnN0YW50aWF0ZXMgYSBuYXZpZ2F0aW9uIGJhciBvbiB0aGUgbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGROYXYoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLm1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKCk7XG4gIH1cblxuICAvLyBzeW5jcyB0d28gbWFwcyB6b29tIGFuZCBwYW5cbiAgLy8gbW9kaWZlZCBmcm9tIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC5qcy9leGFtcGxlL3YxLjAuMC9zeW5jLWxheWVyLW1vdmVtZW50L1xuICAvL1xuICAvLyBAcGFyYW0gbWFwMSA9IGZpcnN0IG1hcGJveCBtYXAgb2JqZWN0XG4gIC8vIEBwYXJhbSBtYXAyICA9IHNlY29uZCBtYXBib3ggbWFwIG9iamVjdFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc3luY01hcHMobWFwMSwgbWFwMikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgc3luY01vdmUobWFwMSwgbWFwMik7XG4gIH1cblxuICBtYWtlVE1TTGF5ZXIobWFwQ2hhbmdlLCBtYXBJbmRleCkge1xuICAgIC8vIHN0dWR5IGNvbnN0cmFpbnRzIG51bWJlciBvZiBxdWVzdGlvbnMgc3RhcnRzIHdpdGggMFxuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGBtYXAtY2hhbmdlLSR7bWFwSW5kZXh9YCxcbiAgICAgIHR5cGU6ICdyYXN0ZXInLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdyYXN0ZXInLFxuICAgICAgICB0aWxlczogW21hcFNldHVwW21hcEluZGV4XS51cmxdLFxuICAgICAgICBtaW56b29tOiBtYXBTZXR1cFttYXBJbmRleF0ubWluem9vbSxcbiAgICAgICAgbWF4em9vbTogbWFwU2V0dXBbbWFwSW5kZXhdLm1heHpvb20sXG4gICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgIGJvdW5kczogbWFwU2V0dXBbbWFwSW5kZXhdLmJvdW5kcyxcbiAgICAgICAgbWF4Qm91bmRzOiBtYXBTZXR1cFttYXBJbmRleF0ubWF4Ym91bmRzXG4gICAgICB9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ3Jhc3Rlci1mYWRlLWR1cmF0aW9uJzogMFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBtYWtlcyBjaGFuZ2UgZ3JpZCBsYXllciBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIG1ha2VHcmlkTGF5ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnY2hhbmdlLWdyaWQnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgZGF0YTogdGhpcy5zcXVhcmVHcmlkR2VvSlNPTlxuICAgICAgfSxcbiAgICAgIGxheW91dDoge30sXG4gICAgICBwYWludDoge1xuICAgICAgICAnZmlsbC1jb2xvcic6IFtcbiAgICAgICAgICAnbWF0Y2gnLFxuICAgICAgICAgIFsnZ2V0JywgJ3NlbGVjdGVkJ10sXG4gICAgICAgICAgMSwgdGhpcy5zZWxlY3RlZEJveCxcbiAgICAgICAgICAvKiBvdGhlciAqLyB0aGlzLmRlZmF1bHRHcmV5Qm94XG4gICAgICAgIF0sXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiAwLjVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gbWFrZXMgY2hhbmdlIGdyaWQgbGF5ZXIgd2hhdCBjb3JyZWN0IG9uIG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgbWFrZUdyaWRDb3JyZWN0TGF5ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnY2hhbmdlLWdyaWQnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgZGF0YTogdGhpcy5zcXVhcmVHcmlkR2VvSlNPTlxuICAgICAgfSxcbiAgICAgIGxheW91dDoge30sXG4gICAgICBwYWludDoge1xuICAgICAgICAnZmlsbC1jb2xvcic6IFtcbiAgICAgICAgICAnbWF0Y2gnLFxuICAgICAgICAgIFsnZ2V0JywgJ3YnXSxcbiAgICAgICAgICAxLCB0aGlzLnNlbGVjdGVkQm94LFxuICAgICAgICAgIC8qIG90aGVyICovIHRoaXMuZGVmYXVsdEdyZXlCb3hcbiAgICAgICAgXSxcbiAgICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuNVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBtYWtlcyBjaGFuZ2UgZ3JpZCBsYXllciBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIG1ha2VHcmlkT3V0TGluZUxheWVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ2NoYW5nZS1ncmlkLW91dGxpbmUnLFxuICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgZGF0YTogdGhpcy5zcXVhcmVHcmlkR2VvSlNPTlxuICAgICAgfSxcbiAgICAgIGxheW91dDoge1xuICAgICAgICAnbGluZS1qb2luJzogJ3JvdW5kJyxcbiAgICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJ1xuICAgICAgfSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdsaW5lLWNvbG9yJzogdGhpcy5kZWZhdWx0R3JleUJveCxcbiAgICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIGFkZHMgY2xpY2sgb2YgZ3JpZCBib3ggdG8gY2FwdHVyZSB3aGljaCBncmlkIHRoZSB1c2VyXG4gIC8vIHRoaW5rcyBjaGFuZ2UgaGFwcGVuZCBpbiBvcmdpbmFsIGZyb206XG4gIC8vIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC1nbC1qcy9leGFtcGxlL3BvbHlnb24tcG9wdXAtb24tY2xpY2svXG4gIC8vXG4gIC8vIEBwYXJhbSBtYXAgPSBtYXBib3ggbWFwIG9iamVjdCB0byB1cGRhdGUgem9vbSBhbmQgY2VudGVyIHRvXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRHcmlkQ2xpY2sobWFwKSB7XG4gICAgLy8gY29uc3QgbWFrZUdyaWRMYXllciA9IHRoaXMubWFrZUdyaWRMYXllcigpO1xuICAgIC8vIFdoZW4gYSBjbGljayBldmVudCBvY2N1cnMgb24gYSBmZWF0dXJlIGluIHRoZSBzdGF0ZXMgbGF5ZXIsIG9wZW4gYSBwb3B1cCBhdCB0aGVcbiAgICAvLyBsb2NhdGlvbiBvZiB0aGUgY2xpY2ssIHdpdGggZGVzY3JpcHRpb24gSFRNTCBmcm9tIGl0cyBwcm9wZXJ0aWVzLlxuICAgIG1hcC5vbignbW91c2VlbnRlcicsICdjaGFuZ2UtZ3JpZCcsIChlKSA9PiB7XG4gICAgICBtYXAuZ2V0Q2FudmFzKCkuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ21vdXNlbGVhdmUnLCAnY2hhbmdlLWdyaWQnLCAoZSkgPT4ge1xuICAgICAgbWFwLmdldENhbnZhcygpLnN0eWxlLmN1cnNvciA9ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ2NsaWNrJywgJ2NoYW5nZS1ncmlkJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGZlYXR1cmUgPSBlLmZlYXR1cmVzWzBdO1xuICAgICAgY29uc3QgaWQgPSBOdW1iZXIoZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcblxuICAgICAgLy8gdWRwYXRlcyBzZWxlY3RlZCBnZW9qc29uIHByb3Blcml0ZXMuc2VsZWN0ZWQgMCBvciAxIGRlcGVuZWRpbmdcbiAgICAgIC8vIGlmIHVzZXIgc2VsZWN0ZWQgcG9seWdvblxuICAgICAgY29uc3QgbmV3RmVhdHVyZSA9IE1hcEJveENvbmZpZy50b2dnbGVTZWxlY3RlZEZlYXR1cmUoZmVhdHVyZSk7XG5cbiAgICAgIC8vIGNyZWF0ZSBhIG5ldyBmZWF0dXJlIGNvbGxlY3Rpb24gZnJvbSBzZWxlY3RlZCBmZWF0dXJlXG4gICAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmVzID0gTWFwQm94Q29uZmlnLm1ha2VTZWxlY3RlZEZlYXR1cmVHZW9KU09OKG5ld0ZlYXR1cmUpO1xuXG4gICAgICAvLyB1cGRhdGVzIHNxdWFyZUdyaWRHZW9KU09OIHdpdGggbmV3IGdlb2pzb25cbiAgICAgIGNvbnN0IG5ld1NxdWFyZUdyaWRHZW9KU09OID0gTWFwQm94Q29uZmlnLnVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyhzZWxlY3RlZEZlYXR1cmVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICAvLyBzdG9yZSBuZXcgc3F1YXJlIGdyaWQgd2l0aCBzbGVjdGVkIGJveGVzXG4gICAgICB0aGlzLnN0b3JlU3F1YXJlR3JpZChuZXdTcXVhcmVHcmlkR2VvSlNPTik7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSB3aXRoIHNlbGVjdGVkIGZlYXR1cmVcbiAgICAgIE1hcEJveENvbmZpZy5zdG9yZVNlbGVjdGVkRmVhdHVyZShpZCk7XG5cbiAgICAgIC8vIHRpZ2dlciBldmVudCBzbyBhbGwgZGF0YSBzb3VyY2VzIHVwZGF0ZVxuICAgICAgdXRpbGl0eS50cmlnZ2VyRXZlbnQoJ2dyaWQtdXBkYXRlJywgaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gdG9nZ2xlcyB2YWx1ZSB0aGUgcHJvcGVydGllcyAoYXR0cmlidXRlKSBzZWxlY3RlZFxuICAvLyAgICB3aGVuIGEgdXNlciBjbGlja3MgdGhlIGdyaWQgYm94ID4gMCB3aGVuIHNlbGVjdGVkXG4gIC8vICAgIDAgd2hlbiBzZWxlY3RlXG4gIC8vXG4gIC8vIEBwYXJhbSBmZWF0dXJlID0gZ2VvanNvbiBmZWF0dXJlIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gZmVhdHVyZSA9IGdlb2pzb24gZmVhdHVyZVxuICBzdGF0aWMgdG9nZ2xlU2VsZWN0ZWRGZWF0dXJlKGZlYXR1cmUpIHtcbiAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnNlbGVjdGVkID09PSAwKSB7XG4gICAgICBmZWF0dXJlLnByb3BlcnRpZXMuc2VsZWN0ZWQgPSAxOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGZlYXR1cmUucHJvcGVydGllcy5zZWxlY3RlZCA9IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG4gICAgcmV0dXJuIGZlYXR1cmU7XG4gIH1cblxuICAvLyBzZXRzIHRoZSBzZWxlY3RlZCBmZWF0dXJlIGluIHN0YXRlID4gMCB3aGVuIHNlbGVjdGVkXG4gIC8vICAgIDAgd2hlbiBzZWxlY3RlXG4gIC8vXG4gIC8vIEBwYXJhbSBpZCA9IG51bWJlciB3aGljaCByZXByZXNlbnRzIHRoZSBmZWF0dXJlIGlkXG4gIC8vIEByZXR1cm4gbnVsbFxuICBzdGF0aWMgc3RvcmVTZWxlY3RlZEZlYXR1cmUoaWQpIHtcbiAgICBjb25zdCBncmlkTmFtZSA9ICdncmlkLWJveC0nO1xuICAgIC8vIHplcm8gb3V0IFwidG9nZ2xlIG9mZlwiIGlmIGdyaWQgaWQgZXhpc3RzIHN0YXRlIGl0ZW1cbiAgICBpZiAoc3RvcmUuZ2V0U3RhdGVJdGVtKGAke2dyaWROYW1lfSR7aWR9YCkgPiAwKSB7XG4gICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYCR7Z3JpZE5hbWV9JHtpZH1gLCAwKTtcbiAgICAvLyBhZGQgXCJ0b2dnbGUgb25cIiBpZiAgc3RhdGUgaXRlbSA+IDAgb3Igbm90IHNlbGVjdGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShgJHtncmlkTmFtZX0ke2lkfWAsIE51bWJlcihpZCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIG1ha2VzIHRoZSBzZWxlY3RlZCBmZWF0dXJlIGEgbmV3IGZlYXR1cmUgY29sbGVjdGlvblxuICAvL1xuICAvLyBAcGFyYW0gZmVhdHVyZSA9IGdlb2pzb24gZmVhdHVyZSAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uIChmcm9tIHR1cmYuanMpXG4gIHN0YXRpYyBtYWtlU2VsZWN0ZWRGZWF0dXJlR2VvSlNPTihmZWF0dXJlKSB7XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKFtwb2x5Z29uKGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIGZlYXR1cmUucHJvcGVydGllcyldKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZXMgdGhlIFNxdWFyZUdyaWRHZW9KU09OIGFmdGVyIG1lcmdpbmcgYW5kIHJlY29uY2lsaW5nXG4gIC8vICAgIHdpdGggdGhlIHNlbGVjdGVkIGZlYXV0dXJlc1xuICAvL1xuICAvLyBAcGFyYW0gc2VsZWN0ZWRGZWF0dXJlcyA9IGdlb2pzb24gZmVhdHVyZWNvbGxlY3RvbiByZXByZXNlbnRpbmcgdGhlIHNlbGVjdGVkXG4gIC8vICAgICAgICBmZWF0dXJlcyAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uIChmcm9tIHR1cmYuanMpXG4gIHN0YXRpYyB1cGRhdGVTcXVhcmVHcmlkV2l0aFNlbGVjdGVkRmVhdHVyZXMoc2VsZWN0ZWRGZWF0dXJlcykge1xuICAgIGNvbnN0IGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICBjb25zdCBjdXJyZW50RmVhdHVyZUlkcyA9IHNlbGVjdGVkRmVhdHVyZXMuZmVhdHVyZXMubWFwKGZlYXR1cmUgPT4gZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oc2VsZWN0ZWRGZWF0dXJlcy5mZWF0dXJlcy5jb25jYXQoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OLmZlYXR1cmVzLmZpbHRlcihmZWF0dXJlID0+ICFjdXJyZW50RmVhdHVyZUlkcy5pbmNsdWRlcyhmZWF0dXJlLnByb3BlcnRpZXMuaWQpKSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICAvLyB1cGRhdGVzIHN0YXRlIHdpdGggdGhlIG5ldyB2ZXJzaW9uIG9mIFNxdWFyZUdyaWRHZW9KU09OXG4gIC8vICAgIGNvbnRhaW5zIHNlbGVjdGVkIGZlYXR1cmVzIGFsc28gKGlmIGFueSBzZWxlY3RlZClcbiAgLy9cbiAgLy8gQHBhcmFtIE5ld1NxdWFyZUdyaWRHZW9KU09OID0gZ2VvanNvbiBmZWF0dXJlY29sbGVjdG9uIHJlcHJlc2VudGluZ1xuICAvLyAgICAgICAgICAgICAgICB0aGUgbmV3IGZlYXR1cmVzIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gbnVsbFxuICBzdG9yZVNxdWFyZUdyaWQoTmV3U3F1YXJlR3JpZEdlb0pTT04pIHtcbiAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gTmV3U3F1YXJlR3JpZEdlb0pTT047XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIE5ld1NxdWFyZUdyaWRHZW9KU09OKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZpdE15Qm91bmRzKG1hcCkge1xuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG4gICAgY29uc3QgYm91bmRzID0gbWFwU2V0dXBbMF0ubWF4Ym91bmRzO1xuICAgIG1hcC5maXRCb3VuZHMoYm91bmRzLCB7IHBhZGRpbmc6IDEwMCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgZGF0YXBpID0gJ2h0dHBzOi8vc2NyaXB0Lmdvb2dsZS5jb20vbWFjcm9zL3MvQUtmeWNieFJQOVBWQ1NKN1lvNF9YWXRxa3p1U3BIZjBjT0FuMW5vRktqZHFuZmZCZlMyWkV6dy9leGVjJztcblxuZXhwb3J0IGNsYXNzIFJlY29yZFN0dWR5RGF0YSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9vID0ge307XG4gICAgdGhpcy5kYXRhcGkgPSBkYXRhcGk7XG4gIH1cblxuICBzZXRFdmVudChhY3Rpb24gPSAnJywgY2F0ZWdvcnkgPSAnJywgbGFiZWwgPSAnJywgdmFsdWUgPSAwKSB7XG4gICAgLy8gZ2V0IHZhcnJpYWJsZXMgZm9yXG4gICAgdGhpcy51dWlkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJykudG9TdHJpbmcoKTtcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgdGhpcy5kYXRhID0gbGFiZWw7XG4gICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuXG4gICAgLy8gc3R1ZHkgdG8gSlNPTlxuICAgIGNvbnN0IGpzb25kYXRhID0ge1xuICAgICAgdXVpZDogdGhpcy51dWlkLFxuICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICBkYXRlOiB0aGlzLmRhdGVcbiAgICB9O1xuXG4gICAgY29uc3QgZGF0YUFQSVVSTCA9IG5ldyBVUkwodGhpcy5kYXRhcGkpO1xuICAgIGRhdGFBUElVUkwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhqc29uZGF0YSk7XG4gICAgZmV0Y2goZGF0YUFQSVVSTCk7XG4gIH1cblxuICBzZXRFdmVudEFsbChqc29uZGF0YSA9IHt9KSB7XG4gICAgY29uc3QgZGF0YUFQSVVSTCA9IG5ldyBVUkwodGhpcy5kYXRhcGkpO1xuICAgIGRhdGFBUElVUkwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhqc29uZGF0YSk7XG4gICAgZmV0Y2goZGF0YUFQSVVSTCk7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCB7IFN0b3JhZ2VBUEkgfSBmcm9tICcuL2xvY2FsU3RvcmFnZUFQSSc7XG5cbi8qKlxuKiBUaGlzIGNvbXBvbmVudCBpcyBpbnRlbmRlZCB0byBoYW5kbGUgdGhlIHN0b3JhZ2UgYW5kIHJldHJpZXZhbCBvZiB0aGUgc3RhdGUgb2ZcbiogQXMgb2YgdGhpcyB3cml0aW5nIGl0IGlzIHVzaW5nIGxvY2FsU3RvcmFnZSB0byBkbyB0aGlzLlxuKiBVc2VzIHNpbXBsZSBjbGFzcyBpbnN0YW5jZSBtZXRob2RzIHdpdGggdGhlIHNob3J0LWhhbmQgbWV0aG9kIGRlY2xhcmF0aW9uXG4qIHBhdHRlcm4uXG4qXG4qIFRvIG5vdGU6IFRoZXJlIGlzIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBTdG9yZSBhbmQgdGhlIFN0YXRlLiBBcyBvZiAwYTMxMDZlXG4qIHRoZSBTdG9yZSBpcyBhIFN0cmluZyBzYXZlZCB0byB0aGUgYnJvd3NlcnMgbG9jYWxTdG9yYWdlIGFuZCBpcyBhIHNlcmlhbGl6ZWRcbiogdmVyc2lvbiBvZiB0aGUgU3RhdGUuIFRoZSBTdGF0ZSBpcyBhbiBPYmplY3Qgd2hpY2ggaXMgaW50ZXJhY3RlZCB3aXRoIGJ5XG4qIHBhcnNpbmcgdGhlIFN0YXRlIHN0cmluZyBmcm9tIHRoZSBTdG9yZSwgbW9kaWZ5aW5nIHRoZSByZXN1bHRzIG9mIHRoZSBwYXJzZSxcbiogYW5kIHJlLXNlcmlhbGl6aW5nIGl0IGJhY2sgdG8gdGhlIFN0b3JlLlxuKi9cbmNvbnN0IFNUQVRFX0tFWSA9ICdzdGF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gIC8vIC4uYW5kIGFuIChvcHRpb25hbCkgY3VzdG9tIGNsYXNzIGNvbnN0cnVjdG9yLiBJZiBvbmUgaXNcbiAgLy8gbm90IHN1cHBsaWVkLCBhIGRlZmF1bHQgY29uc3RydWN0b3IgaXMgdXNlZCBpbnN0ZWFkOlxuICAvLyBjb25zdHJ1Y3RvcigpIHsgfVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgLy8gdGhpcy5zdG9yZSA9IG5ldyBTdG9yYWdlQVBJKCk7XG4gICAgaWYgKFN0b3JlLnN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5zdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IFNUQVRFX0tFWSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNldHMgYSBrZXkvdmFsdWUgcGFpciB0byB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZUl0ZW0oa2V5ID0gJycsIHZhbHVlID0gJycpIHtcbiAgICBjb25zdCBzdG9yZU9iaiA9IHsgW2tleV06IHZhbHVlIH07XG4gICAgY29uc3QgbmV3U3RhdGVPYmogPSB7IC4uLnRoaXMuZ2V0U3RhdGUoKSwgLi4uc3RvcmVPYmogfTtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlT2JqKTtcbiAgICByZXR1cm4gbmV3U3RhdGVPYmo7XG4gIH1cblxuICAvLyBEZWxldGUgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vICEvLyBXQVJOSU5HOiBvbmx5IGRvZXMgYSBzaGFsbG93IGRlbGV0ZVxuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGRlbGV0ZVN0YXRlSXRlbShrZXkgPSAnJykge1xuICAgIGNvbnN0IHN0b3JlT2JqID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgIGRlbGV0ZSBzdG9yZU9ialtrZXldO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RvcmVPYmopO1xuICAgIHJldHVybiBzdG9yZU9iajtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIGVudGlyZSBzdGF0ZSBvYmplY3RcbiAgLy9cbiAgLy8gQHJldHVybiBvYmplY3RcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpID8gSlNPTi5wYXJzZSh0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSkgOiB7fTtcbiAgfVxuXG4gIC8vIEdldHMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0SXRlbShrZXkgPSAnJykge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0l0ZW0oa2V5KSA/IHRoaXMuZ2V0U3RhdGUoKVtrZXldIDoge307XG4gIH1cblxuICAvLyBTZXRzIGEgbmV3IHN0YXRlIG9iamVjdCBzdGF0ZVxuICAvL1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGUodmFsdWUgPSB7fSkge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFNUQVRFX0tFWSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgPyBKU09OLnBhcnNlKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKSA6IHt9O1xuICB9XG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBzdGF0ZSBleGlzdHMgaW4gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgY2hlY2tTdGF0ZUV4aXN0cygpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSk7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBzdGF0ZSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyXG4gIC8vXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldFN0YXRlQXNTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW4gaXRlbSBoYXMgYmVlbiBzYXZlZCB0byB0aGUgc3RvcmVcbiAgLy8gdW51c2VkIGFzIG9mIDBhMzEwNmVcbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGlzU3RhdGVJdGVtRXhpc3QoaXRlbSkge1xuICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSkge1xuICAgICAgY29uc3Qgc3RhdGVTdHIgPSB0aGlzLmdldFN0YXRlQXNTdHJpbmcoKTtcbiAgICAgIGlmIChzdGF0ZVN0ci5pbmRleE9mKGl0ZW0pID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGNoZWNrSXRlbShpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpICYmIHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpLmluZGV4T2YoaXRlbSkgPiAwO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIGF2YWlsYWJsZS5cbiAgLy8gVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX1N0b3JhZ2VfQVBJL1VzaW5nX3RoZV9XZWJfU3RvcmFnZV9BUElcbiAgLy9cbiAgLy8gQHJldHVybiBib29sZWFuXG4gIHN0YXRpYyBzdG9yYWdlQXZhaWxhYmxlKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnbG9jYWxTdG9yYWdlJztcbiAgICBsZXQgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICBzdG9yYWdlLmxlbmd0aCAhPT0gMDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcblxuZXhwb3J0IGNsYXNzIFV0aWxpdHkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvbyA9IHt9O1xuICAgIHRoaXMuY2hlY2sgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGNoZWNrcyBpcyBKYXZhc2NyaXB0IG9iamVjdCBpcyBhIHZhbGlkIG9iamVjdFxuICAvL1xuICAvLyBAcGFyYW0gb2JqIC0gb2JqZWN0XG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBjaGVja1ZhbGlkT2JqZWN0KG9iaikge1xuICAgIHRoaXMub2JqID0gb2JqO1xuICAgIGlmICh0aGlzLm9iaiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMub2JqID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5vYmogPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5vYmogPT09ICdzdHJpbmcnICYmIHRoaXMub2JqLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gY3JlYXRlcyBhIHV1aWRcbiAgLy9cbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgdXVpZCgpIHtcbiAgICB0aGlzLmNyeXB0byA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDQpKS5qb2luKCctJyk7XG4gICAgcmV0dXJuIHRoaXMuY3J5cHRvO1xuICB9XG5cbiAgLy8gY2hlY2tzIGlmIGN1cnJlbnQgZGV2aWNlIGlzIGEgbW9iaWxlXG4gIC8vXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBpc01vYmlsZURldmljZSgpIHtcbiAgICB0aGlzLmNoZWNrID0gZmFsc2U7XG4gICAgKGZ1bmN0aW9uKGEpe2lmKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSByZXR1cm4gdHJ1ZTt9KShuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHx3aW5kb3cub3BlcmEpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIHRoaXMuY2hlY2s7XG4gIH1cblxuICAvLyBjaGVja3MgaHRtbCBhcyBhIHRlbXBsYXRlL2Jsb2NrXG4gIC8vXG4gIC8vIEBwYXJhbSBwbGFjZUhvbGRlckVsZW1lbnRJRCAtIEhUTUwgZWxlbWVudCBJRCB0aGF0IHdpbGwgaG9sZCB0aGUgdGVtcGxhdGVcbiAgLy8gQHBhcmFtIHRlbXBsYXRlIC0gSFRNTCBjb250ZW50XG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBsb2FkSFRNTEJsb2NrKHBsYWNlSG9sZGVyRWxlbWVudElELCB0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGFjZUhvbGRlckVsZW1lbnRJRCk7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGVtcGxhdGUgZXhzaXN0c1xuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgaWYgKGNvbXBvbmVudEVsZW0gIT0gbnVsbCkge1xuICAgICAgICBjb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2htbC1ibG9jay1sb2FkZWQnLCBwbGFjZUhvbGRlckVsZW1lbnRJRCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdobWwtYmxvY2stdW5sb2FkZWQnLCBwbGFjZUhvbGRlckVsZW1lbnRJRCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvYWQgdGVtcGxhdGUgaW50byBwbGFjZWhvbGRlciBlbGVtZW50XG4gICAgICAgIGNvbXBvbmVudEVsZW0uaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gdHJpZ2dlcnMgYSBkb20gZXZlbnRcbiAgLy9cbiAgLy8gQHBhcmFtIGV2ZW50TmFtZSAtIHN0cmluZyBldmVudCBuYW1lIGZvciBhIGxpc3RuZXIgdG8gbGlzdGVuIHRvb1xuICAvLyBAcGFyYW0gZGV0YWlsIC0gb2JqZWN0IGRldGFpbHMgZm9yIGV2ZW50XG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICB0cmlnZ2VyRXZlbnQoZXZlbnROYW1lLCBkZXRhaWwpIHtcbiAgICB0aGlzLmV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQodGhpcy5ldmVudCk7XG4gIH1cblxuICAvLyBpdGVyYXRlcyB4IG51bWJlciBvZiBpdGVyYXRpb25zIGFuZCB3cml0ZXMgYVxuICAvLyBhIGRlZmF1bHQgemVybyB2YWx1ZSBzdGF0ZSBrZXlcbiAgLy9cbiAgLy8gQHBhcmFtIGV2ZW50TmFtZSAtIHN0cmluZyBldmVudCBuYW1lIGZvciBhIGxpc3RuZXIgdG8gbGlzdGVuIHRvb1xuICAvLyBAcGFyYW0gZGV0YWlsIC0gb2JqZWN0IGRldGFpbHMgZm9yIGV2ZW50XG4gIC8vIEByZXR1cm4gbnVsbFxuICBzZXRTdGF0ZUZvckdyb3VwKHN0YXRldGV4dCwgaXRlcmF0aW9ucykge1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbShgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWAsIDApO1xuICAgIGlmIChpdGVyYXRpb25zID4gMCkge1xuICAgICAgY29uc3QgbmV4dEl0ZXJhdGlvbiA9IGl0ZXJhdGlvbnMgLSAxO1xuICAgICAgdGhpcy5zZXRTdGF0ZUZvckdyb3VwKHN0YXRldGV4dCwgbmV4dEl0ZXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLy8gaXRlcmF0ZXMgeCBudW1iZXIgb2YgaXRlcmF0aW9ucyBhbmQgd3JpdGVzIHRvIHRoZSBBUElcbiAgLy9cbiAgLy8gQHBhcmFtIGV2ZW50TmFtZSAtIHN0cmluZyBldmVudCBuYW1lIGZvciBhIGxpc3RuZXIgdG8gbGlzdGVuIHRvb1xuICAvLyBAcGFyYW0gZGV0YWlsIC0gb2JqZWN0IGRldGFpbHMgZm9yIGV2ZW50XG4gIC8vIEByZXR1cm4gbnVsbFxuICBzZXRBUElGb3JHcm91cChzdGF0ZXRleHQsIGl0ZXJhdGlvbnMsIHZhbHVlQXJyYXkgPSBbXSkge1xuICAgIGNvbnN0IGtleSA9IGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YDtcbiAgICBjb25zdCB2YWx1ZSA9IHN0b3JlLmdldFN0YXRlSXRlbShgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWApO1xuICAgIC8vIGNhcHR1cmUgaW4gYXJyYXkgc28gd2UgY2FuIHdyaXRlIGNvbXBsdGVkIGFycmF5IHRvIGFwaVxuICAgIHZhbHVlQXJyYXkucHVzaCh7IGtleSwgdmFsdWUgfSk7XG4gICAgaWYgKGl0ZXJhdGlvbnMgPiAwKSB7XG4gICAgICBjb25zdCBuZXh0SXRlcmF0aW9uID0gaXRlcmF0aW9ucyAtIDE7XG4gICAgICB0aGlzLnNldEFQSUZvckdyb3VwKHN0YXRldGV4dCwgbmV4dEl0ZXJhdGlvbiwgdmFsdWVBcnJheSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gd3JpdGUgY29tcGx0ZWQgYXJyYXkgdG8gYXBpXG4gICAgLy8gcmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50KCdkYXRhJywgJ2dyaWRhbnN3ZXJzJywgSlNPTi5zdHJpbmdpZnkodmFsdWVBcnJheSkpO1xuICAgIGNvbnN0IGRhdGVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzJywgdmFsdWVBcnJheSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkYW5zd2Vycy10aW1lJywgZGF0ZXN0YW1wKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==