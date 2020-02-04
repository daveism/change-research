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
/******/ 	var hotCurrentHash = "8fa3e9f242d253dd88e9";
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

module.exports = "<div id=\"study-progress-end\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100\">Whats Changed?</div>\n  <div id=\"step1-directions\" class=\"step-directions w-100\">\n    Thanks for participating!\n  </div>\n\n  <div id=\"map-holder-end\" class=\"start-map w-100 d-flex mt-3\">\n    <!-- <div id=\"map-holder-end\" class=\"start-map w-100 d-flex mt-3\">\n      <div id=\"map-inner-holder-end\" class=\"row h-100 justify-content-center\">\n        <div id='compare-end-wrapper'>\n          <div id=\"map-c-enda\" class=\"my-3 mx-3\"></div>\n          <div id=\"map-c-endb\" class=\"my-3 mx-3\"></div>\n        </div>\n      </div>\n    </div>-->\n    <div class=\"row w-100 ml-3\">\n      <div class=\"col-12 col-sm-6 px-0 w-100\" >\n\n        <div class=\"row w-100\">\n          <div class=\"col-12 col-md-12 px-0 py-1 w-100\" >\n            Your answer\n          </div>\n          <div id=\"map-enda\" class=\"col-12 col-md-6 px-0 map-enda endmap\"></div>\n          <!-- <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n            <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n              <div id='compare-end1-wrapper'>\n                <div id=\"map-c-enda\" class=\"mx-3\"></div>\n                <div id=\"map-c-endb\" class=\"mx-3\"></div>\n              </div>\n            </div>\n          </div> -->\n        </div>\n\n      </div>\n      <div class=\"col-12 col-sm-6 px-0 w-100\" >\n\n        <div class=\"row w-100\">\n          <div class=\"col-12 px-0 py-1 ml-0 ml-sm-3 mt-3 mt-sm-0 w-100\" >\n            Our answer\n          </div>\n          <!-- <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n            <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n              <div id='compare-end2-wrapper'>\n                <div id=\"map-c-endc\" class=\"mx-3\"></div>\n                <div id=\"map-c-endd\" class=\"mx-3\"></div>\n              </div>\n            </div>\n          </div> -->\n          <div id=\"map-endb\" class=\"col-12 col-md-6 px-0 ml-3 map-endb endmap\"></div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row w-100 my-2\">\n    <div class=\"col-12 col-sm-4 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"completed-play\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-play-circle mr-2\"></i>Play\n        </button>\n      </div>\n    </div>\n    <div class=\"col-12 col-sm-4 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"completed-pause\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-pause-circle mr-2\"></i>Pause\n        </button>\n      </div>\n    </div>\n    <div class=\"col-12 col-sm-4 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"completed-stop\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-stop-circle mr-2\"></i>Stop\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n";

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

module.exports = "<div id=\"study-progress-map-0\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    <ul>\n      <li>The map below contains two images that are different.</li>\n      <li>The two images will turn on and off at a regular intervals.</li>\n      <li>Click on any boxes where you believe the two images are different.</li>\n      <li>The boxes you click on will change orange and will become your answers when you click submit.</li>\n      <li>Clicking on an orange box will remove it from your selection.</li>\n      <li>Zoom or Pan if you need to.</li>\n      <li>Submit your answer.</li>\n    </ul>\n  </div>\n\n  <div id=\"map-holder-1\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-1\" class=\"row h-100 justify-content-center\">\n      <div id=\"map-1\" class=\"my-3 mx-4 mx-sm-3\"></div>\n    </div>\n  </div>\n\n  <!-- no play-pause-stop on page want particpant to deal with animation -->\n  <!-- <div class=\"row w-100 my-2\">\n    <div class=\"col-12 col-sm-12 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"study-play\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-play-circle mr-2\"></i>Play\n        </button>\n      </div>\n    </div>\n    <div class=\"col-12 col-sm-12 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"study-pause\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-pause-circle mr-2\"></i>Pause\n        </button>\n      </div>\n    </div>\n    <div class=\"col-12 col-sm-12 col-md-4 w-100\" >\n      <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-center mt-3\">\n        <button id=\"study-stop\" type=\"button\" class=\"btn-center btn-xlight btn-draw-circle w-100 text-center\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n          <i class=\"far fa-stop-circle mr-2\"></i>Stop\n        </button>\n      </div>\n    </div>\n  </div> -->\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-0\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-2.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-2.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-1\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    <ul>\n      <li>The two maps below contain images that are different.</li>\n      <li>Click on any boxes where you believe the two images are different.</li>\n      <li>The boxes you click on will change orange and will become your answers when you click submit.</li>\n      <li>Clicking on an orange box will remove it from your selection.</li>\n      <li>Zoom or Pan if you need to.</li>\n      <li>Submit your answer.</li>\n    </ul>\n  </div>\n\n  <div id=\"map-holder-2\" class=\"start-map w-100 d-flex ml-3 mt-3\">\n    <div id=\"map-inner-holder-2\" class=\"row justify-content-center\">\n      <div class=\"col-12 col-md-6 dualmaps d-flex my-2\">\n        <div id=\"map-2a\" class=\"my-3 mx-1 map-2a\"></div>\n      </div>\n      <div class=\"col-12 col-md-6 dualmaps d-flex my-2\">\n        <div id=\"map-2b\" class=\"my-3 mx-1 map-2b\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-1\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-3.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-3.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-2\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    <ul>\n      <li>The two maps below contain images that are different.</li>\n      <li>Drag the vertical bar side-to-side to reveal the images.</li>\n      <li>Click on any boxes where you believe the two images are different.</li>\n      <li>The boxes you click on will change orange and will become your answers when you click submit.</li>\n      <li>Clicking on an orange box will remove it from your selection.</li>\n      <li>Zoom or Pan if you need to.</li>\n      <li>Submit your answer.</li>\n    </ul>\n  </div>\n\n  <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n      <div id=\"compare-wrapper\" class=\"mx-sm-2\">\n        <div id=\"map-3a\" class=\"mx-1\"></div>\n        <div id=\"map-3b\" class=\"mx-1\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-2\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-sus.html":
/*!*************************************************!*\
  !*** ./src/content-blocks/block-study-sus.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-sus\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 3 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    <ul>\n      <li>Rank each of the ten questions from 1 to 5 based on how much you agree or disaggre with the statement.</li>\n      <li>1 indicates you strongly disagree.</li>\n      <li>5 indicates you strongly aggree.</li>\n    </ul>\n  </div>\n\n  <div class=\"pl-1 pt-3 pb-3\">\n    &nbsp;\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        1.&nbsp;&nbsp;I think that I would like to use this site frequently\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-1\" class=\"btn-group btn-sus mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q1-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q1-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q1-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q1-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q1-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        2.&nbsp;&nbsp;I found the site unnecessarily complex\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-2\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q2-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q2-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q2-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q2-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q2-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        3.&nbsp;&nbsp;I thought the site was easy to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-3\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q3-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q3-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q3-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q3-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q3-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        4.&nbsp;&nbsp;I think that I would need the support of a technical person to be able to use this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-4\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q4-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q4-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q4-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q4-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q4-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        5.&nbsp;&nbsp;I found the various functions in this site were well integrated\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-5\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q5-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q5-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q5-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q5-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q5-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        6.&nbsp;&nbsp;I thought there was too much inconsistency in this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-6\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q6-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q6-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q6-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q6-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q6-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        7.&nbsp;&nbsp;I would imagine that most people would learn to use this site very quickly\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-7\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q7-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q7-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q7-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q7-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q7-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        8.&nbsp;&nbsp;I found the site very cumbersome to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-8\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q8-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q8-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q8-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q8-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q8-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        9.&nbsp;&nbsp;I felt very confident using the site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-9\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q9-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q9-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q9-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q9-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q9-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-4 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        10.&nbsp;&nbsp;I needed to learn a lot of things before I could get going with this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n\n    <div class=\"row pb-2\">\n      <div class=\"col-6\">\n        <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n      </div>\n      <div class=\"col-5\">\n        <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n      </div>\n    </div>\n\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-10\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q10-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q10-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q10-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q10-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q10-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-100 d-flex mt-4\">\n    <div class=\"pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-7\">\n      &nbsp;\n    </div>\n    <div class=\"pb-4 pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-5\">\n      <button id=\"submit-button-to-end\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and finish.\">\n        Submit and finish\n      </button>\n    </div>\n  </div>\n\n</div>\n";

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
          utility.unsetPlayButtons(page, true);
          element.classList.add('selected');
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
          utility.unsetPlayButtons(page);
          element.classList.add('selected');
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
          utility.unsetPlayButtons(page);
          var isPaused = store.getStateItem('map-' + page + '-animation');
          if (isPaused) {
            store.setStateItem('map-' + page + '-animation', false);
            element.classList.add('selected');
          } else {
            store.setStateItem('map-' + page + '-animation', true);
            element.classList.remove('selected');
          }
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

if (!utility.checkValidObject(store.getStateItem('map-completed-animation'))) {
  store.setStateItem('map-completed-animation', true);
} else {
  var isAnimated = store.getStateItem('map-completed-animation');
  if (isAnimated) {
    var playElement = document.getElementById('completed-play');
    if (playElement) {
      playElement.classList.add('selected');
    }
  } else {
    var pauseElement = document.getElementById('completed-pause');
    if (pauseElement) {
      pauseElement.classList.add('selected');
    }
  }
}

if (!utility.checkValidObject(store.getStateItem('map-completed-animation-stop'))) {
  store.setStateItem('map-completed-animation-stop', true);
} else {
  var _isAnimated = store.getStateItem('map-completed-animation-stop');
  if (!_isAnimated) {
    var stopElement = document.getElementById('completed-stop');
    if (stopElement) {
      utility.unsetPlayButtons('completed');
      stopElement.classList.add('selected');
    }
  }
}

if (!utility.checkValidObject(store.getStateItem('map-study-animation'))) {
  store.setStateItem('map-study-animation', true);
} else {
  var _isAnimated2 = store.getStateItem('map-study-animation');
  if (_isAnimated2) {
    var _playElement = document.getElementById('study-play');
    if (_playElement) {
      _playElement.classList.add('selected');
    }
  } else {
    var _pauseElement = document.getElementById('study-pause');
    if (_pauseElement) {
      _pauseElement.classList.add('selected');
    }
  }
}

if (!utility.checkValidObject(store.getStateItem('map-study-animation-stop'))) {
  store.setStateItem('map-study-animation-stop', true);
} else {
  var _isAnimated3 = store.getStateItem('map-study-animation-stop');
  if (!_isAnimated3) {
    var _stopElement = document.getElementById('study-stop');
    if (_stopElement) {
      utility.unsetPlayButtons('study');
      _stopElement.classList.add('selected');
    }
  }
}

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
        maxzoom: 13,
        scheme: 'tms',
        tileSize: 256,
        bounds: ikBox,
        maxbounds: ikMaxBox
      }, {
        url: 'https://daveism.github.io/change-research/dist/maps/iknow_2/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 13,
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

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.63683762677812,35.61210336993178],[-82.62617029958149,35.61210336993178],[-82.62617029958149,35.60341947494315],[-82.62617029958149,35.59473557995452],[-82.63683762677812,35.59473557995452],[-82.64750495397475,35.59473557995452],[-82.64750495397475,35.60341947494315],[-82.64750495397475,35.61210336993178],[-82.63683762677812,35.61210336993178]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.63683762677812,35.59473557995452],[-82.62617029958149,35.59473557995452],[-82.62617029958149,35.586051684965895],[-82.62617029958149,35.57736778997727],[-82.63683762677812,35.57736778997727],[-82.64750495397475,35.57736778997727],[-82.64750495397475,35.586051684965895],[-82.64750495397475,35.59473557995452],[-82.63683762677812,35.59473557995452]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.56],[-82.64750495397475,35.56868389498864],[-82.64750495397475,35.57736778997727],[-82.63683762677812,35.57736778997727],[-82.62617029958149,35.57736778997727],[-82.62617029958149,35.56868389498864],[-82.62617029958149,35.56],[-82.63683762677812,35.56],[-82.64750495397475,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.54263221002275],[-82.64750495397475,35.55131610501138],[-82.64750495397475,35.56],[-82.63683762677812,35.56],[-82.62617029958149,35.56],[-82.62617029958149,35.55131610501138],[-82.62617029958149,35.54263221002275],[-82.63683762677812,35.54263221002275],[-82.64750495397475,35.54263221002275]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.525264420045495],[-82.64750495397475,35.533948315034124],[-82.64750495397475,35.54263221002275],[-82.63683762677812,35.54263221002275],[-82.62617029958149,35.54263221002275],[-82.62617029958149,35.533948315034124],[-82.62617029958149,35.525264420045495],[-82.63683762677812,35.525264420045495],[-82.64750495397475,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.50789663006824],[-82.64750495397475,35.51658052505687],[-82.64750495397475,35.525264420045495],[-82.63683762677812,35.525264420045495],[-82.62617029958149,35.525264420045495],[-82.62617029958149,35.51658052505687],[-82.62617029958149,35.50789663006824],[-82.63683762677812,35.50789663006824],[-82.64750495397475,35.50789663006824]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.59473557995452],[-82.62617029958149,35.60341947494315],[-82.62617029958149,35.61210336993178],[-82.61550297238486,35.61210336993178],[-82.60483564518823,35.61210336993178],[-82.60483564518823,35.60341947494315],[-82.60483564518823,35.59473557995452],[-82.61550297238486,35.59473557995452],[-82.62617029958149,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.5941683179916,35.61210336993178],[-82.58350099079497,35.61210336993178],[-82.58350099079497,35.60341947494315],[-82.58350099079497,35.59473557995452],[-82.5941683179916,35.59473557995452],[-82.60483564518823,35.59473557995452],[-82.60483564518823,35.60341947494315],[-82.60483564518823,35.61210336993178],[-82.5941683179916,35.61210336993178]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.59473557995452],[-82.58350099079497,35.60341947494315],[-82.58350099079497,35.61210336993178],[-82.57283366359835,35.61210336993178],[-82.56216633640172,35.61210336993178],[-82.56216633640172,35.60341947494315],[-82.56216633640172,35.59473557995452],[-82.57283366359835,35.59473557995452],[-82.58350099079497,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.59473557995452],[-82.56216633640172,35.60341947494315],[-82.56216633640172,35.61210336993178],[-82.55149900920509,35.61210336993178],[-82.54083168200846,35.61210336993178],[-82.54083168200846,35.60341947494315],[-82.54083168200846,35.59473557995452],[-82.55149900920509,35.59473557995452],[-82.56216633640172,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.53016435481183,35.61210336993178],[-82.5194970276152,35.61210336993178],[-82.5194970276152,35.60341947494315],[-82.5194970276152,35.59473557995452],[-82.53016435481183,35.59473557995452],[-82.54083168200846,35.59473557995452],[-82.54083168200846,35.60341947494315],[-82.54083168200846,35.61210336993178],[-82.53016435481183,35.61210336993178]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.5194970276152,35.59473557995452],[-82.5194970276152,35.60341947494315],[-82.5194970276152,35.61210336993178],[-82.50882970041857,35.61210336993178],[-82.49816237322194,35.61210336993178],[-82.49816237322194,35.60341947494315],[-82.49816237322194,35.59473557995452],[-82.50882970041857,35.59473557995452],[-82.5194970276152,35.59473557995452]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.5194970276152,35.57736778997727],[-82.5194970276152,35.586051684965895],[-82.5194970276152,35.59473557995452],[-82.50882970041857,35.59473557995452],[-82.49816237322194,35.59473557995452],[-82.49816237322194,35.586051684965895],[-82.49816237322194,35.57736778997727],[-82.50882970041857,35.57736778997727],[-82.5194970276152,35.57736778997727]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.57736778997727],[-82.49816237322194,35.57736778997727],[-82.49816237322194,35.56868389498864],[-82.49816237322194,35.56],[-82.50882970041857,35.56],[-82.5194970276152,35.56],[-82.5194970276152,35.56868389498864],[-82.5194970276152,35.57736778997727],[-82.50882970041857,35.57736778997727]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.56],[-82.49816237322194,35.56],[-82.49816237322194,35.55131610501138],[-82.49816237322194,35.54263221002275],[-82.50882970041857,35.54263221002275],[-82.5194970276152,35.54263221002275],[-82.5194970276152,35.55131610501138],[-82.5194970276152,35.56],[-82.50882970041857,35.56]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.54263221002275],[-82.49816237322194,35.54263221002275],[-82.49816237322194,35.533948315034124],[-82.49816237322194,35.525264420045495],[-82.50882970041857,35.525264420045495],[-82.5194970276152,35.525264420045495],[-82.5194970276152,35.533948315034124],[-82.5194970276152,35.54263221002275],[-82.50882970041857,35.54263221002275]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.525264420045495],[-82.49816237322194,35.525264420045495],[-82.49816237322194,35.51658052505687],[-82.49816237322194,35.50789663006824],[-82.50882970041857,35.50789663006824],[-82.5194970276152,35.50789663006824],[-82.5194970276152,35.51658052505687],[-82.5194970276152,35.525264420045495],[-82.50882970041857,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.525264420045495],[-82.60483564518823,35.525264420045495],[-82.60483564518823,35.51658052505687],[-82.60483564518823,35.50789663006824],[-82.61550297238486,35.50789663006824],[-82.62617029958149,35.50789663006824],[-82.62617029958149,35.51658052505687],[-82.62617029958149,35.525264420045495],[-82.61550297238486,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.50789663006824],[-82.60483564518823,35.51658052505687],[-82.60483564518823,35.525264420045495],[-82.5941683179916,35.525264420045495],[-82.58350099079497,35.525264420045495],[-82.58350099079497,35.51658052505687],[-82.58350099079497,35.50789663006824],[-82.5941683179916,35.50789663006824],[-82.60483564518823,35.50789663006824]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.50789663006824],[-82.58350099079497,35.51658052505687],[-82.58350099079497,35.525264420045495],[-82.57283366359835,35.525264420045495],[-82.56216633640172,35.525264420045495],[-82.56216633640172,35.51658052505687],[-82.56216633640172,35.50789663006824],[-82.57283366359835,35.50789663006824],[-82.58350099079497,35.50789663006824]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.55149900920509,35.525264420045495],[-82.54083168200846,35.525264420045495],[-82.54083168200846,35.51658052505687],[-82.54083168200846,35.50789663006824],[-82.55149900920509,35.50789663006824],[-82.56216633640172,35.50789663006824],[-82.56216633640172,35.51658052505687],[-82.56216633640172,35.525264420045495],[-82.55149900920509,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.50789663006824],[-82.54083168200846,35.51658052505687],[-82.54083168200846,35.525264420045495],[-82.53016435481183,35.525264420045495],[-82.5194970276152,35.525264420045495],[-82.5194970276152,35.51658052505687],[-82.5194970276152,35.50789663006824],[-82.53016435481183,35.50789663006824],[-82.54083168200846,35.50789663006824]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.57736778997727],[-82.62617029958149,35.586051684965895],[-82.62617029958149,35.59473557995452],[-82.61550297238486,35.59473557995452],[-82.60483564518823,35.59473557995452],[-82.60483564518823,35.586051684965895],[-82.60483564518823,35.57736778997727],[-82.61550297238486,35.57736778997727],[-82.62617029958149,35.57736778997727]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.525264420045495],[-82.54083168200846,35.533948315034124],[-82.54083168200846,35.54263221002275],[-82.53016435481183,35.54263221002275],[-82.5194970276152,35.54263221002275],[-82.5194970276152,35.533948315034124],[-82.5194970276152,35.525264420045495],[-82.53016435481183,35.525264420045495],[-82.54083168200846,35.525264420045495]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.586051684965895],[-82.54083168200846,35.59473557995452],[-82.53016435481183,35.59473557995452],[-82.5194970276152,35.59473557995452],[-82.5194970276152,35.586051684965895],[-82.5194970276152,35.57736778997727],[-82.53016435481183,35.57736778997727],[-82.54083168200846,35.57736778997727],[-82.54083168200846,35.586051684965895]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.54263221002275],[-82.60483564518823,35.54263221002275],[-82.60483564518823,35.533948315034124],[-82.60483564518823,35.525264420045495],[-82.61550297238486,35.525264420045495],[-82.62617029958149,35.525264420045495],[-82.62617029958149,35.533948315034124],[-82.62617029958149,35.54263221002275],[-82.61550297238486,35.54263221002275]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.56],[-82.62617029958149,35.56868389498864],[-82.62617029958149,35.57736778997727],[-82.61550297238486,35.57736778997727],[-82.60483564518823,35.57736778997727],[-82.60483564518823,35.56868389498864],[-82.60483564518823,35.56],[-82.61550297238486,35.56],[-82.62617029958149,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.56],[-82.60483564518823,35.56],[-82.60483564518823,35.55131610501138],[-82.60483564518823,35.54263221002275],[-82.61550297238486,35.54263221002275],[-82.62617029958149,35.54263221002275],[-82.62617029958149,35.55131610501138],[-82.62617029958149,35.56],[-82.61550297238486,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.55131610501138],[-82.54083168200846,35.56],[-82.53016435481183,35.56],[-82.5194970276152,35.56],[-82.5194970276152,35.55131610501138],[-82.5194970276152,35.54263221002275],[-82.53016435481183,35.54263221002275],[-82.54083168200846,35.54263221002275],[-82.54083168200846,35.55131610501138]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.53016435481183,35.57736778997727],[-82.5194970276152,35.57736778997727],[-82.5194970276152,35.56868389498864],[-82.5194970276152,35.56],[-82.53016435481183,35.56],[-82.54083168200846,35.56],[-82.54083168200846,35.56868389498864],[-82.54083168200846,35.57736778997727],[-82.53016435481183,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.57736778997727],[-82.56216633640172,35.586051684965895],[-82.56216633640172,35.59473557995452],[-82.55149900920509,35.59473557995452],[-82.54083168200846,35.59473557995452],[-82.54083168200846,35.586051684965895],[-82.54083168200846,35.57736778997727],[-82.55149900920509,35.57736778997727],[-82.56216633640172,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.57736778997727],[-82.58350099079497,35.586051684965895],[-82.58350099079497,35.59473557995452],[-82.57283366359835,35.59473557995452],[-82.56216633640172,35.59473557995452],[-82.56216633640172,35.586051684965895],[-82.56216633640172,35.57736778997727],[-82.57283366359835,35.57736778997727],[-82.58350099079497,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.586051684965895],[-82.60483564518823,35.59473557995452],[-82.5941683179916,35.59473557995452],[-82.58350099079497,35.59473557995452],[-82.58350099079497,35.586051684965895],[-82.58350099079497,35.57736778997727],[-82.5941683179916,35.57736778997727],[-82.60483564518823,35.57736778997727],[-82.60483564518823,35.586051684965895]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.56],[-82.60483564518823,35.56868389498864],[-82.60483564518823,35.57736778997727],[-82.5941683179916,35.57736778997727],[-82.58350099079497,35.57736778997727],[-82.58350099079497,35.56868389498864],[-82.58350099079497,35.56],[-82.5941683179916,35.56],[-82.60483564518823,35.56]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.57283366359835,35.57736778997727],[-82.56216633640172,35.57736778997727],[-82.56216633640172,35.56868389498864],[-82.56216633640172,35.56],[-82.57283366359835,35.56],[-82.58350099079497,35.56],[-82.58350099079497,35.56868389498864],[-82.58350099079497,35.57736778997727],[-82.57283366359835,35.57736778997727]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.56],[-82.56216633640172,35.56868389498864],[-82.56216633640172,35.57736778997727],[-82.55149900920509,35.57736778997727],[-82.54083168200846,35.57736778997727],[-82.54083168200846,35.56868389498864],[-82.54083168200846,35.56],[-82.55149900920509,35.56],[-82.56216633640172,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.54263221002275],[-82.60483564518823,35.55131610501138],[-82.60483564518823,35.56],[-82.5941683179916,35.56],[-82.58350099079497,35.56],[-82.58350099079497,35.55131610501138],[-82.58350099079497,35.54263221002275],[-82.5941683179916,35.54263221002275],[-82.60483564518823,35.54263221002275]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.57283366359835,35.56],[-82.56216633640172,35.56],[-82.56216633640172,35.55131610501138],[-82.56216633640172,35.54263221002275],[-82.57283366359835,35.54263221002275],[-82.58350099079497,35.54263221002275],[-82.58350099079497,35.55131610501138],[-82.58350099079497,35.56],[-82.57283366359835,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.54263221002275],[-82.56216633640172,35.55131610501138],[-82.56216633640172,35.56],[-82.55149900920509,35.56],[-82.54083168200846,35.56],[-82.54083168200846,35.55131610501138],[-82.54083168200846,35.54263221002275],[-82.55149900920509,35.54263221002275],[-82.56216633640172,35.54263221002275]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.525264420045495],[-82.56216633640172,35.533948315034124],[-82.56216633640172,35.54263221002275],[-82.55149900920509,35.54263221002275],[-82.54083168200846,35.54263221002275],[-82.54083168200846,35.533948315034124],[-82.54083168200846,35.525264420045495],[-82.55149900920509,35.525264420045495],[-82.56216633640172,35.525264420045495]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.525264420045495],[-82.58350099079497,35.533948315034124],[-82.58350099079497,35.54263221002275],[-82.57283366359835,35.54263221002275],[-82.56216633640172,35.54263221002275],[-82.56216633640172,35.533948315034124],[-82.56216633640172,35.525264420045495],[-82.57283366359835,35.525264420045495],[-82.58350099079497,35.525264420045495]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.525264420045495],[-82.60483564518823,35.533948315034124],[-82.60483564518823,35.54263221002275],[-82.5941683179916,35.54263221002275],[-82.58350099079497,35.54263221002275],[-82.58350099079497,35.533948315034124],[-82.58350099079497,35.525264420045495],[-82.5941683179916,35.525264420045495],[-82.60483564518823,35.525264420045495]]]}}]};

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

    // unselects play/pause stop buttons
    //
    // @param page - string page to play completed, map
    // @return null

  }, {
    key: 'unsetPlayButtons',
    value: function unsetPlayButtons() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'completed';
      var doStop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.page = page;
      var playElement = document.getElementById(page + '-play');
      if (playElement) {
        playElement.classList.remove('selected');
      }
      var pauseElement = document.getElementById(page + '-pause');
      if (pauseElement) {
        pauseElement.classList.remove('selected');
      }
      var stopElement = document.getElementById(page + '-stop');
      if (doStop) {
        if (stopElement) {
          stopElement.classList.remove('selected');
        }
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0yLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWFwLWNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yZWNvcmQtc3R1ZHktZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbInJlY29yZFN0dWR5RGF0YSIsIlJlY29yZFN0dWR5RGF0YSIsInN0b3JlIiwiU3RvcmUiLCJ1dGlsaXR5IiwiVXRpbGl0eSIsIkhhbmRsZXJzIiwiZGlzcGxheU5vbmVDbGFzcyIsInNlbGVjdGVkQ2xhc3MiLCJzdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCIsInN0dWR5QWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlIiwic3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNBZGQiLCJzdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSIsInN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZCIsInN0dWR5UXVlc3Rpb24iLCJnZXRTdGF0ZUl0ZW0iLCJzdHVkeVF1ZXN0aW9uRWxlbWVudHNSZW1vdmUiLCJzdHVkeVNVU0VsZW1lbnRzQWRkIiwic3R1ZHlTVVNFbGVtZW50c1JlbW92ZSIsInN1c1N0b3JhZ2VLZXlzIiwiZWxlbWVudElEIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZvckVhY2giLCJlbGVtZW50VUlJRCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImNvbnRhaW5zIiwiYWRkIiwiZ3JpZE5hbWUiLCJncmlkSXRlcmF0aW9ucyIsInNldEFQSUZvckdyb3VwIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInBhZ2UiLCJzZXRTdGF0ZUl0ZW0iLCJhbmltYXRlIiwidW5zZXRQbGF5QnV0dG9ucyIsImlzUGF1c2VkIiwic3VzVmFsdWVBcnJheSIsImtleSIsInF1ZXN0aW9uQW5zd2VyIiwicHVzaCIsImRhdGVzdGFtcCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInRyaWdnZXJFdmVudCIsInJlY29yZEFnZ3JlZWQiLCJzdG9yYWdlIiwid2luZG93IiwicmVtb3ZlSXRlbSIsInN0dWR5VmVyc2lvbiIsImFncmVlbWVudFRpbWVTdGFtcCIsInJlY29yZERpc2FnZ3JlZWQiLCJwYXJlbnRCdG5Hcm91cCIsInRhcmdldCIsImlkIiwicGFyZW50RWxlbWVudCIsInRvZ2dsZUJ1dHRvbkdyb3VwQnV0dHRvbnNPZmYiLCJxdWVzdGlvblRleHQiLCJyZXBsYWNlIiwiTnVtYmVyIiwiaW5uZXJUZXh0IiwidXVpZFJlYyIsInN0dWR5U3RhcnRlZFJlYyIsInN0dWR5U3RhcnRlZFRpbWVSZWMiLCJzdHVkeUFncmVlbWVudFJlYyIsInN0dWR5QWdyZWVtZW50VGltZVJlYyIsImNhbXBhaWduUmVjIiwibW9iaWxlUmVjIiwibWFwVmVyc2lvblJlYyIsInN0dWR5UXVlc3Rpb25SZWMiLCJzdXNhbnN3ZXJzU3VibWl0ZWRSZWMiLCJncmlkU3VibWl0ZWRSZWMiLCJzdXNhbnN3ZXJzUmVjIiwiZ3JpZGFuc3dlcnNSZWMiLCJncmlkY29ycmVjdFJlYyIsInN0dWR5Q29tcGxldGVkUmVjIiwiZ3JpZGNvcnJlY3RSZWNQcm9wcyIsImZlYXR1cmVzIiwidmFsIiwicHJvcGVydGllcyIsInZhbHVlIiwidiIsImpzb25EYXRhIiwidXVpZCIsInN0dWR5X3N0YXJ0ZWQiLCJzdHVkeV9zdGFydGVkX3RpbWUiLCJzdHVkeV9hZ3JlZW1lbnQiLCJzdXNhbnN3ZXJzX3N1Ym1pdGVkIiwiZ3JpZF9zdWJtaXRlZCIsInN0dWR5X2FncmVlbWVudF90aW1lIiwiY2FtcGFpZ24iLCJKU09OIiwic3RyaW5naWZ5IiwibW9iaWxlIiwibWFwX3ZlcnNpb24iLCJncmlkX2NvcnJlY3QiLCJncmlkX2Fuc3dlcnMiLCJncmlkYW5zd2Vyc190aW1lIiwic3R1ZHlfcXVlc3Rpb24iLCJzdXNfYW5zd2VycyIsInN1c2Fuc3dlcnNfdGltZSIsInN0dWR5X2NvbXBsZXRlZCIsInNldEV2ZW50QWxsIiwic3VzYW5zd2Vyc0RhdGVSZWMiLCJncmlkYW5zd2Vyc0RhdGVSZWMiLCJidG5Hcm91cCIsImNoaWxkcmVuIiwiY2hpbGROb2RlcyIsImNoZWNrVmFsaWRPYmplY3QiLCJsZW5ndGgiLCJjaGlsZHJlbkFycmF5IiwiY2hpbGRJdGVtIiwiVVJMUGF0aCIsImxvY2F0aW9uIiwiaGFzaCIsInN0dWR5TWluT25lIiwic3R1ZHlNYXhPbmUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtYXBWZXJzaW9uIiwibWFwTWluT25lIiwibWFwTWF4T25lIiwidG9TdHJpbmciLCJsaWJyYXJ5IiwiZmFzIiwiZmFyIiwiZG9tIiwid2F0Y2giLCJtYXBCb3hDb25maWciLCJNYXBCb3hDb25maWciLCJoYW5kbGVycyIsImxvYWRIVE1MQmxvY2siLCJibG9ja1N0dWR5QWdncmVlbWVudCIsImJsb2NrU3R1ZHlEaXNzYWdncmVlIiwiYmxvY2tTdHVkeVNVUyIsImJsb2NrU3R1ZHlDb21wbGV0ZWQiLCJtYXAxIiwibWFwMmEiLCJtYXAyYiIsIm1hcDNBcnIiLCJtYXBkZWYiLCJibG9ja1N0dWR5UXVlc3Rpb24xIiwibWFrZUFuaW1hdGVNYXAiLCJibG9ja1N0dWR5UXVlc3Rpb24yIiwibWFrZU1hcCIsInN5bmNNYXBzIiwiYmxvY2tTdHVkeVF1ZXN0aW9uMyIsIm1ha2VDb21wYXJlTWFwIiwibWFwRW5kYSIsIm1hcEVuZGIiLCJyZXNpemVBbGxNYXBzIiwicmVzaXplIiwic2V0Wm9vbSIsInVybFN0cmluZyIsImhyZWYiLCJ1cmwiLCJVUkwiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJpc01vYmlsZURldmljZSIsImFnZ3JlbWVudENoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlckFncmVlQ2xpY2siLCJkaXNhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cyIsImFkZEhhbmRsZXJEaXNhZ3JlZUNsaWNrIiwic3VibWl0Q2hhbmdlRWxlbWVudHMiLCJhZGRIYW5kbGVyU3VibWl0Q2hhbmdlQ2xpY2siLCJzdXNDaGFuZ2VFbGVtZW50cyIsImFkZEhhbmRsZXJTdWJtaXRTVVNDbGljayIsImFkZEhhbmRsZXJQbGF5Q2xpY2siLCJhZGRIYW5kbGVyUGF1c2VDbGljayIsImFkZEhhbmRsZXJMYXllcnNPZmZDbGljayIsImlzQW5pbWF0ZWQiLCJwbGF5RWxlbWVudCIsInBhdXNlRWxlbWVudCIsInN0b3BFbGVtZW50IiwiY3VycmVudFNxdWFyZUdyaWRHZW9KU09OIiwiZ2V0U291cmNlIiwic2V0RGF0YSIsInN1c0J0bkdyb3VwRWxlbWVudHMiLCJhZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayIsImltYWdlcnlEaXJlY3Rpb25zRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWxlbSIsInNldEF0dHJpYnV0ZSIsInN1c05hbWUiLCJzdXNJdGVyYXRpb25zIiwic2V0U3RhdGVGb3JHcm91cCIsInNldERvbVN0YXRlRm9yR3JvdXAiLCJpc1N0dWR5Y29tcGxldGVkIiwic3R1ZHlDb21wbGV0ZWQiLCJTdHVkeUFncnJlZW1lbnQiLCJzdHVkeUFncnJlZWQiLCJncmlkU3VibWl0ZWRTdGF0ZSIsImdyaWRTdWJtaXRlZCIsInN1c1N1Ym1pdGVkU3RhdGUiLCJzdXNTdWJtaXRlZCIsImFnZ3JlbWVudEVsZW1lbnQiLCJkaWFnZ3JlZUVsZW1lbnQiLCJncmlkU3VibWl0RWxlbWVudCIsImNvbXBsZXRlZFN1Ym1pdEVsZW1lbnQiLCJjbGljayIsImV2ZW50IiwicmVsb2FkIiwic3luY01vdmUiLCJyZXF1aXJlIiwiYnVmZkRpc3QiLCJidWZmVW5pdHMiLCJ1bml0cyIsImlrQm94IiwiU3F1YXJlR3JpZEdlb0pTT05PbmUiLCJoc3RuQm94IiwiU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQiLCJsdkJveCIsIlNxdWFyZUdyaWRHZW9KU09OVGhpcmQiLCJpa01heEJveCIsImhzdG5NYXhCb3giLCJsdk1heEJveCIsInNxdWFyZUdyaWRHZW9KU09OIiwiZGVmYXVsdE1hcFN0eWxlIiwiZGVmYXVsdE1hcENlbnRlciIsImRlZmF1bHRNYXhCb3VuZHMiLCJkZWZhdWx0TWFwWm9vbSIsImRlZmF1bHRNYXBDb250YWluZXIiLCJkYXJrTWFwU3R5bGUiLCJsaWdodE1hcFN0eWxlIiwibWFwYm94Z2wiLCJNYXBib3hDb21wYXJlIiwiYWNjZXNzVG9rZW4iLCJxdWlldCIsIm1hcDIiLCJkZWZhdWx0R3JleUJveCIsInNlbGVjdGVkQm94IiwibWFwQ2hhbmdlTGF5ZXJzIiwibGF5ZXJzIiwibWluem9vbSIsIm1heHpvb20iLCJzY2hlbWUiLCJ0aWxlU2l6ZSIsImJvdW5kcyIsIm1heGJvdW5kcyIsIm1hcENoYW5nZUxheWVyc09uZSIsIm1hcENvbnRhaW5lciIsIm1hcEluZGV4IiwiZW5kIiwiZW5hYmxlY2xpY2siLCJtYXBTZXR1cCIsIm1hcEluZGV4Qm91bmRzIiwibWFwIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJ6b29tIiwic2hvd1pvb20iLCJ0b3VjaEVuYWJsZWQiLCJrZXliaW5kaW5ncyIsIm1heEJvdW5kcyIsIm9uIiwiZml0TXlCb3VuZHMiLCJhZGRMYXllciIsIm1ha2VUTVNMYXllciIsIm1ha2VHcmlkT3V0TGluZUxheWVyIiwibWFrZUdyaWRDb3JyZWN0TGF5ZXIiLCJtYWtlR3JpZExheWVyIiwiYWRkR3JpZENsaWNrIiwic2V0VGltZW91dCIsIm9ubG9hZCIsImFkZENvbnRyb2wiLCJOYXZpZ2F0aW9uQ29udHJvbCIsInNob3dDb21wYXNzIiwiZW5kbWFwcyIsImNlbnRlciIsImluZGV4Q291bnQiLCJpbmRleCIsInNldEludGVydmFsIiwia2VlcEdvaW5nIiwia2VlcEdvaW5nU3RvcCIsInNldExheW91dFByb3BlcnR5IiwibWFwQmVmb3JlQ29udGFpbmVyIiwibWFwQWZ0ZXJDb250YWluZXIiLCJtYXBDb21wYXJlV3JhcHBlcklEIiwiYmVmb3JlTWFwIiwiYWZ0ZXJNYXAiLCJjb21wYXJlIiwic2V0U2xpZGVyIiwibWFwQ2hhbmdlIiwidHlwZSIsInNvdXJjZSIsInRpbGVzIiwicGFpbnQiLCJkYXRhIiwibGF5b3V0IiwiZ2V0Q2FudmFzIiwiY3Vyc29yIiwiZmVhdHVyZSIsIm5ld0ZlYXR1cmUiLCJ0b2dnbGVTZWxlY3RlZEZlYXR1cmUiLCJzZWxlY3RlZEZlYXR1cmVzIiwibWFrZVNlbGVjdGVkRmVhdHVyZUdlb0pTT04iLCJuZXdTcXVhcmVHcmlkR2VvSlNPTiIsInVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyIsInN0b3JlU3F1YXJlR3JpZCIsInN0b3JlU2VsZWN0ZWRGZWF0dXJlIiwiTmV3U3F1YXJlR3JpZEdlb0pTT04iLCJmaXRCb3VuZHMiLCJwYWRkaW5nIiwic2VsZWN0ZWQiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiY3VycmVudEZlYXR1cmVJZHMiLCJjb25jYXQiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImRhdGFwaSIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJkYXRlIiwianNvbmRhdGEiLCJkYXRhQVBJVVJMIiwic2VhcmNoIiwiVVJMU2VhcmNoUGFyYW1zIiwiZmV0Y2giLCJTVEFURV9LRVkiLCJzdG9yYWdlQXZhaWxhYmxlIiwibG9jYWxTdG9yYWdlIiwic3RhdGUiLCJjaGVja1N0YXRlRXhpc3RzIiwiZ2V0U3RhdGUiLCJzdG9yZU9iaiIsIm5ld1N0YXRlT2JqIiwic2V0U3RhdGUiLCJwYXJzZSIsImdldEl0ZW0iLCJjaGVja0l0ZW0iLCJzZXRJdGVtIiwiQm9vbGVhbiIsIml0ZW0iLCJzdGF0ZVN0ciIsImdldFN0YXRlQXNTdHJpbmciLCJpbmRleE9mIiwieCIsIkRPTUV4Y2VwdGlvbiIsImNvZGUiLCJuYW1lIiwiY2hlY2siLCJvYmoiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJrZXlzIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiYSIsInRlc3QiLCJzdWJzdHIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ2ZW5kb3IiLCJvcGVyYSIsInBsYWNlSG9sZGVyRWxlbWVudElEIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiaW5uZXJIVE1MIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50Iiwic3RhdGV0ZXh0IiwiaXRlcmF0aW9ucyIsImJ0blByZWZpeCIsIm5leHRJdGVyYXRpb24iLCJ2YWx1ZUFycmF5IiwiZG9TdG9wIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FB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QUFwQztBQUNBcEMsWUFBTW9DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0NxVixVQUFsQztBQUNBelgsWUFBTW9DLFlBQU4sQ0FBbUIsa0JBQW5CLEVBQXVDUSxTQUF2QztBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBOzs7O3VDQUNxRDtBQUFBLFVBQXBDVCxJQUFvQyx1RUFBN0IsV0FBNkI7QUFBQSxVQUFoQnVWLE1BQWdCLHVFQUFQLEtBQU87O0FBQ25ELFdBQUt2VixJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFNNkksY0FBYzVKLFNBQVNDLGNBQVQsQ0FBMkJjLElBQTNCLFdBQXBCO0FBQ0EsVUFBSTZJLFdBQUosRUFBaUI7QUFDZkEsb0JBQVl0SixTQUFaLENBQXNCQyxNQUF0QixDQUE2QixVQUE3QjtBQUNEO0FBQ0QsVUFBTXNKLGVBQWU3SixTQUFTQyxjQUFULENBQTJCYyxJQUEzQixZQUFyQjtBQUNBLFVBQUk4SSxZQUFKLEVBQWtCO0FBQ2hCQSxxQkFBYXZKLFNBQWIsQ0FBdUJDLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7QUFDRCxVQUFNdUosY0FBYzlKLFNBQVNDLGNBQVQsQ0FBMkJjLElBQTNCLFdBQXBCO0FBQ0EsVUFBSXVWLE1BQUosRUFBWTtBQUNWLFlBQUl4TSxXQUFKLEVBQWlCO0FBQ2ZBLHNCQUFZeEosU0FBWixDQUFzQkMsTUFBdEIsQ0FBNkIsVUFBN0I7QUFDRDtBQUNGO0FBQ0QsYUFBTyxJQUFQO0FBQ0QiLCJmaWxlIjoiaW5kZXguYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiOGZhM2U5ZjI0MmQyNTNkZDg4ZTlcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc35pbmRleFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnQtYWxsXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwXFxcIj5cXG5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+U3R1ZHkgQWdycmVlbWVudDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50LXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3R1ZHkgUGFydGljaXBhdGlvbiBBZ3JlZW1lbnQ8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudFxcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImgtMTAwXFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnQtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICBUaGFuayB5b3UgZm9yIHRha2luZyBwYXJ0IGluIHRoaXMgc3R1ZHkuIEJ5IHVzaW5nIHRoZSBmb2xsb3dpbmcgd2Vic2l0ZSxcXG4gICAgICAgIHlvdSBhZ3JlZSB0byBwYXJ0aWNpcGF0ZSBpbiBhIHN0dWR5IGFib3V0IGhvdyBwZW9wbGUgdXNlIHdlYi1wcmVzZW50ZWQgbWFwcy5cXG4gICAgICAgIFdlIHdpbGwgY29sbGVjdCBpbmZvcm1hdGlvbiBhYm91dCB5b3VyIGludGVyYWN0aW9ucyB3aXRoIHRoaXMgc2l0ZSBidXQgbm90IGFueVxcbiAgICAgICAgcGVyc29uYWxseSBpZGVudGlmaWFibGUgaW5mb3JtYXRpb24uIFRoZSBvbmx5IHBlb3BsZSB3aXRoIGFjY2VzcyB0byB0aGUgc3R1ZHlcXG4gICAgICAgIGRhdGEgYXJlIHRoZSByZXNlYXJjaGVycy4gSG93ZXZlciwgdGhlIGRhdGEgd2lsbCBiZSBzdW1tYXJpemVkLCBzaGFyZWQsIGFuZFxcbiAgICAgICAgZGlzc2VtaW5hdGVkIGluIHRhbGtzLCBibG9ncywgYW5kIHBvc3NpYmx5IHJlc2VhcmNoIGpvdXJuYWxzLiBUaGVyZSBpcyBub1xcbiAgICAgICAgY29zdCB0byB5b3UgdG8gcGFydGljaXBhdGUgaW4gdGhpcyByZXNlYXJjaCBzdHVkeSwgYW5kIHlvdSB3aWxsIG5vdCBiZVxcbiAgICAgICAgY29tcGVuc2F0ZWQuIFRoZXJlIGFyZSBubyBrbm93biByaXNrcyBpbiB0aGUgZm9sbG93aW5nIHRhc2tzLlxcbiAgICAgICAgPGJyIC8+PGJyIC8+XFxuICAgICAgICBCeSBhZ3JlZWluZyB0byB0aGlzLCB5b3UgaGF2ZSBhY2tub3dsZWRnZWQgdGhhdCB5b3UgaGF2ZSByZWFkIHRoZVxcbiAgICAgICAgY29udGVudHMgb2YgdGhpcyBjb25zZW50LCBhcmUgYW4gYWR1bHQgb3ZlciAxOCB5ZWFycyBvZiBhZ2UsIGFuZFxcbiAgICAgICAgeW91IGFyZSBnaXZpbmcgY29uc2VudCB0byBwYXJ0aWNpcGF0ZSBpbiB0aGlzIHN0dWR5LlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC01XFxcIj5EbyB5b3Ugd2FudCB0byBwYXJ0aWNpcGF0ZT88L2Rpdj5cXG5cXG4gIDxzcGFuIGNsYXNzPVxcXCJtdC0zIGgtYXV0byBkLWZsZXhcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmQgbXItM1xcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtY2hlY2tcXFwiPjwvaT5cXG4gICAgICBZZXNcXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b24gaWQ9XFxcImRpYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi14bGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZFxcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtdGltZXMtY2lyY2xlXFxcIj48L2k+XFxuICAgICAgTm9cXG4gICAgPC9idXR0b24+XFxuICA8L3NwYW4+XFxuXFxuICA8IS0tIDxkaXYgaWQ9XFxcImFnZ3JlZS1kaXNhZ2dyZS13cmFwcGVyXFxcIiBjbGFzcz1cXFwibXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC1zdWJcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgYWxpZ24tc2VsZi1jZW50ZXIgcGItNCBweS0yXFxcIj5EbyB5b3Ugd2FudCB0byBwYXJ0aWNpcGF0ZT88L2Rpdj5cXG4gICAgPGJ1dHRvbiBpZD1cXFwiYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tYWdncmVlbWVudCB3LTIwIGFsaWduLXNlbGYtZW5kIG1yLTNcXFwiID5cXG4gICAgICA8aSBjbGFzcz1cXFwiZmFzIGZhLWNoZWNrXFxcIj48L2k+XFxuICAgICAgWWVzXFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJkaWFnZ3JlZS1idXR0b25cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4teGxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmRcXFwiID5cXG4gICAgICA8aSBjbGFzcz1cXFwiZmFzIGZhLXRpbWVzLWNpcmNsZVxcXCI+PC9pPlxcbiAgICAgIE5vXFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+IC0tPlxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1wcm9ncmVzcy1lbmRcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwXFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMFxcXCI+XFxuICAgIFRoYW5rcyBmb3IgcGFydGljaXBhdGluZyFcXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci1lbmRcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8IS0tIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItZW5kXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLWVuZFxcXCIgY2xhc3M9XFxcInJvdyBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9J2NvbXBhcmUtZW5kLXdyYXBwZXInPlxcbiAgICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtYy1lbmRhXFxcIiBjbGFzcz1cXFwibXktMyBteC0zXFxcIj48L2Rpdj5cXG4gICAgICAgICAgPGRpdiBpZD1cXFwibWFwLWMtZW5kYlxcXCIgY2xhc3M9XFxcIm15LTMgbXgtM1xcXCI+PC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+LS0+XFxuICAgIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMCBtbC0zXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTYgcHgtMCB3LTEwMFxcXCIgPlxcblxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHctMTAwXFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC0xMiBweC0wIHB5LTEgdy0xMDBcXFwiID5cXG4gICAgICAgICAgICBZb3VyIGFuc3dlclxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBpZD1cXFwibWFwLWVuZGFcXFwiIGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTYgcHgtMCBtYXAtZW5kYSBlbmRtYXBcXFwiPjwvZGl2PlxcbiAgICAgICAgICA8IS0tIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItM1xcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci0zXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgY29tcGFyZVxcXCI+XFxuICAgICAgICAgICAgICA8ZGl2IGlkPSdjb21wYXJlLWVuZDEtd3JhcHBlcic+XFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1jLWVuZGFcXFwiIGNsYXNzPVxcXCJteC0zXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwibWFwLWMtZW5kYlxcXCIgY2xhc3M9XFxcIm14LTNcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PiAtLT5cXG4gICAgICAgIDwvZGl2PlxcblxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNiBweC0wIHctMTAwXFxcIiA+XFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDBcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgcHgtMCBweS0xIG1sLTAgbWwtc20tMyBtdC0zIG10LXNtLTAgdy0xMDBcXFwiID5cXG4gICAgICAgICAgICBPdXIgYW5zd2VyXFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8IS0tIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItM1xcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci0zXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgY29tcGFyZVxcXCI+XFxuICAgICAgICAgICAgICA8ZGl2IGlkPSdjb21wYXJlLWVuZDItd3JhcHBlcic+XFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1jLWVuZGNcXFwiIGNsYXNzPVxcXCJteC0zXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwibWFwLWMtZW5kZFxcXCIgY2xhc3M9XFxcIm14LTNcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PiAtLT5cXG4gICAgICAgICAgPGRpdiBpZD1cXFwibWFwLWVuZGJcXFwiIGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTYgcHgtMCBtbC0zIG1hcC1lbmRiIGVuZG1hcFxcXCI+PC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMCBteS0yXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS00IGNvbC1tZC00IHctMTAwXFxcIiA+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBtdC0zXFxcIj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcImNvbXBsZXRlZC1wbGF5XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4tY2VudGVyIGJ0bi14bGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIHRleHQtY2VudGVyXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiU3VibWl0IGFuZCBnbyB0byBzdXJ2ZXkuXFxcIj5cXG4gICAgICAgICAgPGkgY2xhc3M9XFxcImZhciBmYS1wbGF5LWNpcmNsZSBtci0yXFxcIj48L2k+UGxheVxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTQgY29sLW1kLTQgdy0xMDBcXFwiID5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG10LTNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwiY29tcGxldGVkLXBhdXNlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4tY2VudGVyIGJ0bi14bGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIHRleHQtY2VudGVyXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiU3VibWl0IGFuZCBnbyB0byBzdXJ2ZXkuXFxcIj5cXG4gICAgICAgICAgPGkgY2xhc3M9XFxcImZhciBmYS1wYXVzZS1jaXJjbGUgbXItMlxcXCI+PC9pPlBhdXNlXFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNCBjb2wtbWQtNCB3LTEwMFxcXCIgPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgbXQtM1xcXCI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJjb21wbGV0ZWQtc3RvcFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuLWNlbnRlciBidG4teGxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCB0ZXh0LWNlbnRlclxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYXIgZmEtc3RvcC1jaXJjbGUgbXItMlxcXCI+PC9pPlN0b3BcXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1kaXNzYWdncmVlXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlRoYW5rcyBhbnl3YXkhPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdHVkeS1kaXNzYWdncmVlLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICA8c3Bhbj5cXG4gICAgICBUaGFuayB5b3UgZm9yIGNvbnNpZGVyaW5nIGJlaW5nIGEgcGFydGljaXBhbnQuIElmIHlvdSBjaGFuZ2UgeW91cm1pbmQgeW91IGNhblxcbiAgICAgIGFsd2F5cyByZXZpZXcgdGhlIDxhIGhyZWY9XFxcIlxcXCI+YWdncmVtZW50PC9hPiBhZ2FpbiFcXG4gICAgPC9zcGFuPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLW1hcC0wXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMSBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgPHVsPlxcbiAgICAgIDxsaT5UaGUgbWFwIGJlbG93IGNvbnRhaW5zIHR3byBpbWFnZXMgdGhhdCBhcmUgZGlmZmVyZW50LjwvbGk+XFxuICAgICAgPGxpPlRoZSB0d28gaW1hZ2VzIHdpbGwgdHVybiBvbiBhbmQgb2ZmIGF0IGEgcmVndWxhciBpbnRlcnZhbHMuPC9saT5cXG4gICAgICA8bGk+Q2xpY2sgb24gYW55IGJveGVzIHdoZXJlIHlvdSBiZWxpZXZlIHRoZSB0d28gaW1hZ2VzIGFyZSBkaWZmZXJlbnQuPC9saT5cXG4gICAgICA8bGk+VGhlIGJveGVzIHlvdSBjbGljayBvbiB3aWxsIGNoYW5nZSBvcmFuZ2UgYW5kIHdpbGwgYmVjb21lIHlvdXIgYW5zd2VycyB3aGVuIHlvdSBjbGljayBzdWJtaXQuPC9saT5cXG4gICAgICA8bGk+Q2xpY2tpbmcgb24gYW4gb3JhbmdlIGJveCB3aWxsIHJlbW92ZSBpdCBmcm9tIHlvdXIgc2VsZWN0aW9uLjwvbGk+XFxuICAgICAgPGxpPlpvb20gb3IgUGFuIGlmIHlvdSBuZWVkIHRvLjwvbGk+XFxuICAgICAgPGxpPlN1Ym1pdCB5b3VyIGFuc3dlci48L2xpPlxcbiAgICA8L3VsPlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLTFcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTFcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwibWFwLTFcXFwiIGNsYXNzPVxcXCJteS0zIG14LTQgbXgtc20tM1xcXCI+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8IS0tIG5vIHBsYXktcGF1c2Utc3RvcCBvbiBwYWdlIHdhbnQgcGFydGljcGFudCB0byBkZWFsIHdpdGggYW5pbWF0aW9uIC0tPlxcbiAgPCEtLSA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDAgbXktMlxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tMTIgY29sLW1kLTQgdy0xMDBcXFwiID5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIG10LTNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwic3R1ZHktcGxheVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuLWNlbnRlciBidG4teGxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCB0ZXh0LWNlbnRlclxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYXIgZmEtcGxheS1jaXJjbGUgbXItMlxcXCI+PC9pPlBsYXlcXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS0xMiBjb2wtbWQtNCB3LTEwMFxcXCIgPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgbXQtM1xcXCI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJzdHVkeS1wYXVzZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuLWNlbnRlciBidG4teGxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCB0ZXh0LWNlbnRlclxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYXIgZmEtcGF1c2UtY2lyY2xlIG1yLTJcXFwiPjwvaT5QYXVzZVxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTEyIGNvbC1tZC00IHctMTAwXFxcIiA+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBtdC0zXFxcIj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcInN0dWR5LXN0b3BcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0bi1jZW50ZXIgYnRuLXhsaWdodCBidG4tZHJhdy1jaXJjbGUgdy0xMDAgdGV4dC1jZW50ZXJcXFwiIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiBkYXRhLWh0bWw9XFxcInRydWVcXFwiIHRpdGxlPVxcXCJTdWJtaXQgYW5kIGdvIHRvIHN1cnZleS5cXFwiPlxcbiAgICAgICAgICA8aSBjbGFzcz1cXFwiZmFyIGZhLXN0b3AtY2lyY2xlIG1yLTJcXFwiPjwvaT5TdG9wXFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj4gLS0+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMiBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgU3VibWl0IHRoZSBzZWxlY3RlZCBib3hlcyAoaW4gb3JhbmdlKSBhcyB5b3VyIGFuc3dlci5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IG10LTNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLXN1cy0wXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgU3VibWl0XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLW1hcC0xXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMSBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgPHVsPlxcbiAgICAgIDxsaT5UaGUgdHdvIG1hcHMgYmVsb3cgY29udGFpbiBpbWFnZXMgdGhhdCBhcmUgZGlmZmVyZW50LjwvbGk+XFxuICAgICAgPGxpPkNsaWNrIG9uIGFueSBib3hlcyB3aGVyZSB5b3UgYmVsaWV2ZSB0aGUgdHdvIGltYWdlcyBhcmUgZGlmZmVyZW50LjwvbGk+XFxuICAgICAgPGxpPlRoZSBib3hlcyB5b3UgY2xpY2sgb24gd2lsbCBjaGFuZ2Ugb3JhbmdlIGFuZCB3aWxsIGJlY29tZSB5b3VyIGFuc3dlcnMgd2hlbiB5b3UgY2xpY2sgc3VibWl0LjwvbGk+XFxuICAgICAgPGxpPkNsaWNraW5nIG9uIGFuIG9yYW5nZSBib3ggd2lsbCByZW1vdmUgaXQgZnJvbSB5b3VyIHNlbGVjdGlvbi48L2xpPlxcbiAgICAgIDxsaT5ab29tIG9yIFBhbiBpZiB5b3UgbmVlZCB0by48L2xpPlxcbiAgICAgIDxsaT5TdWJtaXQgeW91ciBhbnN3ZXIuPC9saT5cXG4gICAgPC91bD5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci0yXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtbC0zIG10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTJcXFwiIGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IGR1YWxtYXBzIGQtZmxleCBteS0yXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC0yYVxcXCIgY2xhc3M9XFxcIm15LTMgbXgtMSBtYXAtMmFcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtbWQtNiBkdWFsbWFwcyBkLWZsZXggbXktMlxcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtMmJcXFwiIGNsYXNzPVxcXCJteS0zIG14LTEgbWFwLTJiXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAyIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBTdWJtaXQgdGhlIHNlbGVjdGVkIGJveGVzIChpbiBvcmFuZ2UpIGFzIHlvdXIgYW5zd2VyLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiU3VibWl0IGFuZCBnbyB0byBzdXJ2ZXkuXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtbWFwLTJcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAxIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICA8dWw+XFxuICAgICAgPGxpPlRoZSB0d28gbWFwcyBiZWxvdyBjb250YWluIGltYWdlcyB0aGF0IGFyZSBkaWZmZXJlbnQuPC9saT5cXG4gICAgICA8bGk+RHJhZyB0aGUgdmVydGljYWwgYmFyIHNpZGUtdG8tc2lkZSB0byByZXZlYWwgdGhlIGltYWdlcy48L2xpPlxcbiAgICAgIDxsaT5DbGljayBvbiBhbnkgYm94ZXMgd2hlcmUgeW91IGJlbGlldmUgdGhlIHR3byBpbWFnZXMgYXJlIGRpZmZlcmVudC48L2xpPlxcbiAgICAgIDxsaT5UaGUgYm94ZXMgeW91IGNsaWNrIG9uIHdpbGwgY2hhbmdlIG9yYW5nZSBhbmQgd2lsbCBiZWNvbWUgeW91ciBhbnN3ZXJzIHdoZW4geW91IGNsaWNrIHN1Ym1pdC48L2xpPlxcbiAgICAgIDxsaT5DbGlja2luZyBvbiBhbiBvcmFuZ2UgYm94IHdpbGwgcmVtb3ZlIGl0IGZyb20geW91ciBzZWxlY3Rpb24uPC9saT5cXG4gICAgICA8bGk+Wm9vbSBvciBQYW4gaWYgeW91IG5lZWQgdG8uPC9saT5cXG4gICAgICA8bGk+U3VibWl0IHlvdXIgYW5zd2VyLjwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItM1xcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItM1xcXCIgY2xhc3M9XFxcInJvdyBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGNvbXBhcmVcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcImNvbXBhcmUtd3JhcHBlclxcXCIgY2xhc3M9XFxcIm14LXNtLTJcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLTNhXFxcIiBjbGFzcz1cXFwibXgtMVxcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtM2JcXFwiIGNsYXNzPVxcXCJteC0xXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAyIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBTdWJtaXQgdGhlIHNlbGVjdGVkIGJveGVzIChpbiBvcmFuZ2UpIGFzIHlvdXIgYW5zd2VyLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiU3VibWl0IGFuZCBnbyB0byBzdXJ2ZXkuXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3Mtc3VzXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMyBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgPHVsPlxcbiAgICAgIDxsaT5SYW5rIGVhY2ggb2YgdGhlIHRlbiBxdWVzdGlvbnMgZnJvbSAxIHRvIDUgYmFzZWQgb24gaG93IG11Y2ggeW91IGFncmVlIG9yIGRpc2FnZ3JlIHdpdGggdGhlIHN0YXRlbWVudC48L2xpPlxcbiAgICAgIDxsaT4xIGluZGljYXRlcyB5b3Ugc3Ryb25nbHkgZGlzYWdyZWUuPC9saT5cXG4gICAgICA8bGk+NSBpbmRpY2F0ZXMgeW91IHN0cm9uZ2x5IGFnZ3JlZS48L2xpPlxcbiAgICA8L3VsPlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJwbC0xIHB0LTMgcGItM1xcXCI+XFxuICAgICZuYnNwO1xcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDEuJm5ic3A7Jm5ic3A7SSB0aGluayB0aGF0IEkgd291bGQgbGlrZSB0byB1c2UgdGhpcyBzaXRlIGZyZXF1ZW50bHlcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtMVxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBidG4tc3VzIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDIuJm5ic3A7Jm5ic3A7SSBmb3VuZCB0aGUgc2l0ZSB1bm5lY2Vzc2FyaWx5IGNvbXBsZXhcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtMlxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICAzLiZuYnNwOyZuYnNwO0kgdGhvdWdodCB0aGUgc2l0ZSB3YXMgZWFzeSB0byB1c2VcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtM1xcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgNC4mbmJzcDsmbmJzcDtJIHRoaW5rIHRoYXQgSSB3b3VsZCBuZWVkIHRoZSBzdXBwb3J0IG9mIGEgdGVjaG5pY2FsIHBlcnNvbiB0byBiZSBhYmxlIHRvIHVzZSB0aGlzIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtNFxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA1LiZuYnNwOyZuYnNwO0kgZm91bmQgdGhlIHZhcmlvdXMgZnVuY3Rpb25zIGluIHRoaXMgc2l0ZSB3ZXJlIHdlbGwgaW50ZWdyYXRlZFxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy01XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA2LiZuYnNwOyZuYnNwO0kgdGhvdWdodCB0aGVyZSB3YXMgdG9vIG11Y2ggaW5jb25zaXN0ZW5jeSBpbiB0aGlzIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtNlxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA3LiZuYnNwOyZuYnNwO0kgd291bGQgaW1hZ2luZSB0aGF0IG1vc3QgcGVvcGxlIHdvdWxkIGxlYXJuIHRvIHVzZSB0aGlzIHNpdGUgdmVyeSBxdWlja2x5XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwYi0yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTdcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNy0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE3LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTctM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNy00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE3LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDguJm5ic3A7Jm5ic3A7SSBmb3VuZCB0aGUgc2l0ZSB2ZXJ5IGN1bWJlcnNvbWUgdG8gdXNlXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwYi0yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLThcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1vZGRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgOS4mbmJzcDsmbmJzcDtJIGZlbHQgdmVyeSBjb25maWRlbnQgdXNpbmcgdGhlIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtOVxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMTAuJm5ic3A7Jm5ic3A7SSBuZWVkZWQgdG8gbGVhcm4gYSBsb3Qgb2YgdGhpbmdzIGJlZm9yZSBJIGNvdWxkIGdldCBnb2luZyB3aXRoIHRoaXMgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0xMFxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDAgZC1mbGV4IG10LTRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwdC1zbS0yIHB0LW1kLTAgY29sLTEyIGNvbC1zbS0xMiBjb2wtbWQtN1xcXCI+XFxuICAgICAgJm5ic3A7XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi00IHB0LXNtLTIgcHQtbWQtMCBjb2wtMTIgY29sLXNtLTEyIGNvbC1tZC01XFxcIj5cXG4gICAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLWVuZFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tZHJhdy1jaXJjbGUgdy0xMDAgYWxpZ24tc2VsZi1lbmRcXFwiIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiBkYXRhLWh0bWw9XFxcInRydWVcXFwiIHRpdGxlPVxcXCJTdWJtaXQgYW5kIGZpbmlzaC5cXFwiPlxcbiAgICAgICAgU3VibWl0IGFuZCBmaW5pc2hcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJpbXBvcnQgeyBSZWNvcmRTdHVkeURhdGEgfSBmcm9tICcuL3JlY29yZC1zdHVkeS1kYXRhJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBVdGlsaXR5IH0gZnJvbSAnLi91dGlsaXR5JztcblxuY29uc3QgcmVjb3JkU3R1ZHlEYXRhID0gbmV3IFJlY29yZFN0dWR5RGF0YSgpO1xuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgdXRpbGl0eSA9IG5ldyBVdGlsaXR5KCk7XG5cbmV4cG9ydCBjbGFzcyBIYW5kbGVycyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGlzcGxheU5vbmVDbGFzcyA9ICdkLW5vbmUnO1xuICAgIHRoaXMuc2VsZWN0ZWRDbGFzcyA9ICdzZWxlY3RlZCc7XG5cbiAgICAvLyBzdHVkeSBhZ2dyZWVtZW50XG4gICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCA9IFsnc3R1ZHktcHJvZ3Jlc3MtbWFwLSddO1xuICAgIHRoaXMuc3R1ZHlBZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUgPSBbJ2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQtaG9sZGVyJ107XG5cbiAgICAvLyBzdHVkeSBkaXNhZ2dyZWVtZW50XG4gICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c0FkZCA9IFsnc3R1ZHktZGlzc2FnZ3JlZSddO1xuICAgIHRoaXMuc3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUgPSBbJ2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQtaG9sZGVyJ107XG5cbiAgICAvLyBzdHVkeSBxdWVzdGlvbnMgbWFwIGNoYW5nZVxuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1zdXMnLCAnYmxvY2stc3R1ZHktc3VzLWhvbGRlciddO1xuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c1JlbW92ZSA9IFtgc3R1ZHktcHJvZ3Jlc3MtbWFwLSR7dGhpcy5zdHVkeVF1ZXN0aW9ufWAsICdtYXAtYWN0aW9uLWhvbGRlciddO1xuXG4gICAgLy8gU1VTIHNjb3Jlc1xuICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c0FkZCA9IFsnc3R1ZHktcHJvZ3Jlc3MtZW5kJywgJ2Jsb2NrLXN0dWR5LWNvbXBsZXRlZC1ob2xkZXInXTtcbiAgICB0aGlzLnN0dWR5U1VTRWxlbWVudHNSZW1vdmUgPSBbJ3N0dWR5LXByb2dyZXNzLXN1cycsICdibG9jay1zdHVkeS1zdXMtaG9sZGVyJ107XG4gICAgdGhpcy5zdXNTdG9yYWdlS2V5cyA9IFsnc3VzLXF1ZXN0aW9uLTEnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi0yJyxcbiAgICAgICdzdXMtcXVlc3Rpb24tMycsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTQnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi01JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNicsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTcnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi04JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tOScsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTEwJ107XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIHN1Ym1pdHRpbmcgY2hhbmdlIGRhdGEgb24gbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcblxuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZ3JpZE5hbWUgPSAnZ3JpZC1ib3gtJztcbiAgICAgICAgY29uc3QgZ3JpZEl0ZXJhdGlvbnMgPSA0MjtcbiAgICAgICAgdXRpbGl0eS5zZXRBUElGb3JHcm91cChncmlkTmFtZSwgZ3JpZEl0ZXJhdGlvbnMpO1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IHBhZ2U6IDIgfSwgJyNzdXMtcXVlc3Rpb25zJywgJyNzdXMtcXVlc3Rpb25zJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNvbXBsZXRlZC1wbGF5XG4gIC8vIGFkZHMgaGFuZGxlciBmb3IgcGxheWluZyBhbmltYXRpb25cbiAgLy9cbiAgLy8gQHBhcmFtIHBhZ2UgLSBzdHJpbmcgcGFnZSB0byBwbGF5IGNvbXBsZXRlZCwgbWFwXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyUGxheUNsaWNrKHBhZ2UgPSAnY29tcGxldGVkJywgZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKGBtYXAtJHtwYWdlfS1hbmltYXRpb25gLCB0cnVlKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKGBtYXAtJHtwYWdlfS1hbmltYXRpb24tc3RvcGAsIHRydWUpO1xuICAgICAgICB0aGlzLmFuaW1hdGUgPSB0cnVlO1xuICAgICAgICB1dGlsaXR5LnVuc2V0UGxheUJ1dHRvbnMocGFnZSwgdHJ1ZSk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gY29tcGxldGVkLXBsYXlcbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBwbGF5aW5nIGFuaW1hdGlvblxuICAvL1xuICAvLyBAcGFyYW0gcGFnZSAtIHN0cmluZyBwYWdlIHRvIHBsYXkgY29tcGxldGVkLCBtYXBcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJMYXllcnNPZmZDbGljayhwYWdlID0gJ2NvbXBsZXRlZCcsIGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShgbWFwLSR7cGFnZX0tYW5pbWF0aW9uLXN0b3BgLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSA9IHRydWU7XG4gICAgICAgIHV0aWxpdHkudW5zZXRQbGF5QnV0dG9ucyhwYWdlKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gY29tcGxldGVkLXBsYXlcbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBwYXVzaW5nIGFuaW1hdGlvblxuICAvL1xuICAvLyBAcGFyYW0gcGFnZSAtIHN0cmluZyBwYWdlIHRvIHBsYXkgY29tcGxldGVkLCBtYXBcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJQYXVzZUNsaWNrKHBhZ2UgPSAnY29tcGxldGVkJywgZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgdXRpbGl0eS51bnNldFBsYXlCdXR0b25zKHBhZ2UpO1xuICAgICAgICBjb25zdCBpc1BhdXNlZCA9IHN0b3JlLmdldFN0YXRlSXRlbShgbWFwLSR7cGFnZX0tYW5pbWF0aW9uYCk7XG4gICAgICAgIGlmIChpc1BhdXNlZCkge1xuICAgICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShgbWFwLSR7cGFnZX0tYW5pbWF0aW9uYCwgZmFsc2UpO1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYG1hcC0ke3BhZ2V9LWFuaW1hdGlvbmAsIHRydWUpO1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuaW1hdGUgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3Igc3VibWl0dGluZyBzdXMgc2NvcmVcbiAgLy9cbiAgLy8gQHBhcmFtIGVsZW1lbnRJRCAtIEhUTUwgZWxlbWVudCBJRFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlclN1Ym1pdFNVU0NsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5U1VTRWxlbWVudHNBZGQuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyAgcmVtb3ZlIGVsZW1lbnRzIGZyb20gVUlcbiAgICAgICAgdGhpcy5zdHVkeVNVU0VsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdXNWYWx1ZUFycmF5ID0gW107XG4gICAgICAgIHRoaXMuc3VzU3RvcmFnZUtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25BbnN3ZXIgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oa2V5KTtcbiAgICAgICAgICBzdXNWYWx1ZUFycmF5LnB1c2goeyBrZXksIHF1ZXN0aW9uQW5zd2VyIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGF0ZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICB1dGlsaXR5LnRyaWdnZXJFdmVudCgnc3VzLWNsaWNrZWQnLCAnc3VzLWNsaWNrZWQnKTtcblxuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtc3VibWl0ZWQnLCB0cnVlKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzJywgc3VzVmFsdWVBcnJheSk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy10aW1lJywgZGF0ZXN0YW1wKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1jb21wbGV0ZWQnLCB0cnVlKTtcbiAgICAgICAgSGFuZGxlcnMucmVjb3JkQWdncmVlZCgpO1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IHBhZ2U6IDMgfSwgJyNzdHVkeS1jb21wbGV0ZWQnLCAnI3N0dWR5LWNvbXBsZXRlZCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgICAgLy8gdGVtcCBnZXQgcmlkIG9mIHN0YXRlIGl0ZW1zXG4gICAgICAgIC8vIFJFTU9WRSBGT1IgUkVMRUFTRVxuICAgICAgICBjb25zdCBzdG9yYWdlID0gd2luZG93Wydsb2NhbFN0b3JhZ2UnXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0YXRlJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyByZWNvcmREaXNhZ2dyZWVkKCkge1xuICAgIGNvbnN0IHV1aWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkIHRpbWUnKTtcbiAgICBjb25zdCBzdHVkeUFncmVlbWVudFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG4gICAgY29uc3Qgc3R1ZHlBZ3JlZW1lbnRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScpO1xuICAgIGNvbnN0IGNhbXBhaWduUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdjYW1wYWlnbicpO1xuICAgIGNvbnN0IG1vYmlsZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbW9iaWxlJyk7XG4gICAgY29uc3QgbWFwVmVyc2lvblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBzdHVkeVF1ZXN0aW9uUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNTdWJtaXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy1zdWJtaXRlZCcpO1xuICAgIGNvbnN0IGdyaWRTdWJtaXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZC1zdWJtaXRlZCcpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMnKTtcbiAgICBjb25zdCBncmlkYW5zd2Vyc1JlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMnKTtcbiAgICBjb25zdCBncmlkY29ycmVjdFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICBjb25zdCBzdHVkeUNvbXBsZXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJyk7XG5cbiAgICBjb25zdCBncmlkY29ycmVjdFJlY1Byb3BzID0gW107XG5cbiAgICBncmlkY29ycmVjdFJlYy5mZWF0dXJlcy5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgIGdyaWRjb3JyZWN0UmVjUHJvcHMucHVzaCh7XG4gICAgICAgIGtleTogYGdyaWQtYm94LSR7dmFsLnByb3BlcnRpZXMuaWR9YCxcbiAgICAgICAgdmFsdWU6IHZhbC5wcm9wZXJ0aWVzLnZcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkRhdGEgPSB7XG4gICAgICB1dWlkOiB1dWlkUmVjLFxuICAgICAgc3R1ZHlfc3RhcnRlZDogc3R1ZHlTdGFydGVkUmVjLFxuICAgICAgc3R1ZHlfc3RhcnRlZF90aW1lOiBzdHVkeVN0YXJ0ZWRUaW1lUmVjLFxuICAgICAgc3R1ZHlfYWdyZWVtZW50OiBzdHVkeUFncmVlbWVudFJlYyxcbiAgICAgIHN1c2Fuc3dlcnNfc3VibWl0ZWQ6IHN1c2Fuc3dlcnNTdWJtaXRlZFJlYyxcbiAgICAgIGdyaWRfc3VibWl0ZWQ6IGdyaWRTdWJtaXRlZFJlYyxcbiAgICAgIHN0dWR5X2FncmVlbWVudF90aW1lOiBzdHVkeUFncmVlbWVudFRpbWVSZWMsXG4gICAgICBjYW1wYWlnbjogSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25SZWMpLFxuICAgICAgbW9iaWxlOiBKU09OLnN0cmluZ2lmeShtb2JpbGVSZWMpLFxuICAgICAgbWFwX3ZlcnNpb246IG1hcFZlcnNpb25SZWMsXG4gICAgICBncmlkX2NvcnJlY3Q6IEpTT04uc3RyaW5naWZ5KGdyaWRjb3JyZWN0UmVjUHJvcHMpLFxuICAgICAgZ3JpZF9hbnN3ZXJzOiBKU09OLnN0cmluZ2lmeShncmlkYW5zd2Vyc1JlYyksXG4gICAgICBncmlkYW5zd2Vyc190aW1lOiAnJyxcbiAgICAgIHN0dWR5X3F1ZXN0aW9uOiBzdHVkeVF1ZXN0aW9uUmVjLFxuICAgICAgc3VzX2Fuc3dlcnM6IEpTT04uc3RyaW5naWZ5KHN1c2Fuc3dlcnNSZWMpLFxuICAgICAgc3VzYW5zd2Vyc190aW1lOiAnJyxcbiAgICAgIHN0dWR5X2NvbXBsZXRlZDogc3R1ZHlDb21wbGV0ZWRSZWNcbiAgICB9O1xuXG4gICAgcmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50QWxsKGpzb25EYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyByZWNvcmRBZ2dyZWVkKCkge1xuICAgIGNvbnN0IHV1aWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkIHRpbWUnKTtcbiAgICBjb25zdCBzdHVkeUFncmVlbWVudFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG4gICAgY29uc3Qgc3R1ZHlBZ3JlZW1lbnRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScpO1xuICAgIGNvbnN0IGNhbXBhaWduUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdjYW1wYWlnbicpO1xuICAgIGNvbnN0IG1vYmlsZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbW9iaWxlJyk7XG4gICAgY29uc3QgbWFwVmVyc2lvblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBzdHVkeVF1ZXN0aW9uUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNTdWJtaXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy1zdWJtaXRlZCcpO1xuICAgIGNvbnN0IGdyaWRTdWJtaXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZC1zdWJtaXRlZCcpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMnKTtcbiAgICBjb25zdCBzdXNhbnN3ZXJzRGF0ZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy10aW1lJyk7XG4gICAgY29uc3QgZ3JpZGFuc3dlcnNSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzJyk7XG4gICAgY29uc3QgZ3JpZGFuc3dlcnNEYXRlUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdncmlkYW5zd2Vycy10aW1lJyk7XG4gICAgY29uc3QgZ3JpZGNvcnJlY3RSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gICAgY29uc3Qgc3R1ZHlDb21wbGV0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWNvbXBsZXRlZCcpO1xuXG4gICAgY29uc3QgZ3JpZGNvcnJlY3RSZWNQcm9wcyA9IFtdO1xuXG4gICAgZ3JpZGNvcnJlY3RSZWMuZmVhdHVyZXMuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICBncmlkY29ycmVjdFJlY1Byb3BzLnB1c2goe1xuICAgICAgICBrZXk6IGBncmlkLWJveC0ke3ZhbC5wcm9wZXJ0aWVzLmlkfWAsXG4gICAgICAgIHZhbHVlOiB2YWwucHJvcGVydGllcy52XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGpzb25EYXRhID0ge1xuICAgICAgdXVpZDogdXVpZFJlYyxcbiAgICAgIHN0dWR5X3N0YXJ0ZWQ6IHN0dWR5U3RhcnRlZFJlYyxcbiAgICAgIHN0dWR5X3N0YXJ0ZWRfdGltZTogc3R1ZHlTdGFydGVkVGltZVJlYyxcbiAgICAgIHN0dWR5X2FncmVlbWVudDogc3R1ZHlBZ3JlZW1lbnRSZWMsXG4gICAgICBzdXNhbnN3ZXJzX3N1Ym1pdGVkOiBzdXNhbnN3ZXJzU3VibWl0ZWRSZWMsXG4gICAgICBncmlkX3N1Ym1pdGVkOiBncmlkU3VibWl0ZWRSZWMsXG4gICAgICBzdHVkeV9hZ3JlZW1lbnRfdGltZTogc3R1ZHlBZ3JlZW1lbnRUaW1lUmVjLFxuICAgICAgY2FtcGFpZ246IEpTT04uc3RyaW5naWZ5KGNhbXBhaWduUmVjKSxcbiAgICAgIG1vYmlsZTogSlNPTi5zdHJpbmdpZnkobW9iaWxlUmVjKSxcbiAgICAgIG1hcF92ZXJzaW9uOiBtYXBWZXJzaW9uUmVjLFxuICAgICAgZ3JpZF9jb3JyZWN0OiBKU09OLnN0cmluZ2lmeShncmlkY29ycmVjdFJlY1Byb3BzKSxcbiAgICAgIGdyaWRfYW5zd2VyczogSlNPTi5zdHJpbmdpZnkoZ3JpZGFuc3dlcnNSZWMpLFxuICAgICAgZ3JpZGFuc3dlcnNfdGltZTogZ3JpZGFuc3dlcnNEYXRlUmVjLFxuICAgICAgc3R1ZHlfcXVlc3Rpb246IHN0dWR5UXVlc3Rpb25SZWMsXG4gICAgICBzdXNfYW5zd2VyczogSlNPTi5zdHJpbmdpZnkoc3VzYW5zd2Vyc1JlYyksXG4gICAgICBzdXNhbnN3ZXJzX3RpbWU6IHN1c2Fuc3dlcnNEYXRlUmVjLFxuICAgICAgc3R1ZHlfY29tcGxldGVkOiBzdHVkeUNvbXBsZXRlZFJlY1xuICAgIH07XG5cbiAgICByZWNvcmRTdHVkeURhdGEuc2V0RXZlbnRBbGwoanNvbkRhdGEpO1xuICB9XG5cbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBhZ2dyZWVpbmcgdG8gZG8gc3R1ZHlcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJBZ3JlZUNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0dWR5VmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICAgICAgY29uc3QgYWdyZWVtZW50VGltZVN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5QWdncmVlbWVudEVsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZWxlbWVudFVJSUR9JHtzdHVkeVZlcnNpb259YCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyAgcmVtb3ZlIGVsZW1lbnRzIGZyb20gVUlcbiAgICAgICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbGl0eS50cmlnZ2VyRXZlbnQoJ2FnZ3JlZS1jbGlja2VkJywgJ2hhbmRsZUFncmVlQ2xpY2snKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCB0cnVlKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScsIGFncmVlbWVudFRpbWVTdGFtcCk7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgcGFnZTogMSB9LCAnI21hcCcsICcjbWFwJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3IgRElTYWdncmVlaW5nIHRvIGRvIHN0dWR5XG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyRGlzYWdyZWVDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBhZ3JlZW1lbnRUaW1lU3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGFkZCBkaXNwbGF5IG5vbmUgY2xhc3MgaWYgdGhlIGNsYXNzIGRvZXMgbm90IGV4c2lzdFxuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGR1cGxpY2F0ZSBjbGFzc2VzIGFyZSBub3QgYWRkZWRcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5kaXNwbGF5Tm9uZUNsYXNzKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5hZGQodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxpdHkudHJpZ2dlckV2ZW50KCdkaXNhZ2dyZWUtY2xpY2tlZCcsICdoYW5kbGVBZ3JlZUNsaWNrJyk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50JywgZmFsc2UpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudC10aW1lJywgYWdyZWVtZW50VGltZVN0YW1wKTtcbiAgICAgICAgSGFuZGxlcnMucmVjb3JkRGlzYWdncmVlZCgpO1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IHBhZ2U6IDEgfSwgJyNkaXNhZ2dyZWUnLCAnI2Rpc2FnZ3JlZScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIGluZGl2aWR1YWwgc3VzIHNjb3JlIHF1ZXN0aW9ucyB0byBsb2NhbCBzdG9yYWdlXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTVVNRdWVzdGlvbkNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIHRoaXMuc2VsZWN0ZWRDbGFzcyA9ICdzZWxlY3RlZCc7XG5cbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBnZXQgcGFyZW50IGVsZW1lbnQgd2hpY2ggaXMgYnV0dG9uIGdyb3VwXG4gICAgICAgIGNvbnN0IHBhcmVudEJ0bkdyb3VwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIEhhbmRsZXJzLnRvZ2dsZUJ1dHRvbkdyb3VwQnV0dHRvbnNPZmYocGFyZW50QnRuR3JvdXAsIHRoaXMuc2VsZWN0ZWRDbGFzcyk7XG5cbiAgICAgICAgY29uc3QgcXVlc3Rpb25UZXh0ID0gcGFyZW50QnRuR3JvdXAuaWQucmVwbGFjZSgnYnRuLWdyb3VwLXN1cy0nLCAnc3VzLXF1ZXN0aW9uLScpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0ocXVlc3Rpb25UZXh0LCBOdW1iZXIoZS50YXJnZXQuaW5uZXJUZXh0KSk7XG5cbiAgICAgICAgLy8gYWRkIHN1cyBxdWVzdGlvbiBhbnN3ZXIgdG8gc2VsZWN0ZWQgdG8gY2xhc3NcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuc2VsZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuY2xhc3NMaXN0LmFkZCh0aGlzLnNlbGVjdGVkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyByZW1vdmVzIHRoZSBzZWxlY3RlZCBjbGFzcyBcInVuc2xlY3RzXCIgYWxsIHRoZSBidXR0b25zXG4gIC8vICBpbiBhIGJ1dHRvbiBncm91cFxuICAvL1xuICAvLyBAcGFyYW0gYnRuR3JvdXAgLSBIVE1MIGVsZW1lbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHN0YXRpYyB0b2dnbGVCdXR0b25Hcm91cEJ1dHR0b25zT2ZmKGJ0bkdyb3VwLCBzZWxlY3RlZENsYXNzKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBidG5Hcm91cC5jaGlsZE5vZGVzO1xuICAgIC8vIG1ha2Ugc3VyZSBjaGlsZHJlbiBpcyB2YWxpdWQgb2JqZWN0XG4gICAgaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3QoY2hpbGRyZW4pKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSBhcmUgY2hpbGRlcmVuIGJ1dHRvbnNcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFsuLi5jaGlsZHJlbl07XG4gICAgICBjaGlsZHJlbkFycmF5LmZvckVhY2goKGNoaWxkSXRlbSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGRJdGVtLmNsYXNzTGlzdCkge1xuICAgICAgICAgIGNoaWxkSXRlbS5jbGFzc0xpc3QucmVtb3ZlKHNlbGVjdGVkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbmltcG9ydCB7IGxpYnJhcnksIGRvbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFyIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtcmVndWxhci1zdmctaWNvbnMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IE1hcEJveENvbmZpZyB9IGZyb20gJy4vbWFwLWNvbmZpZyc7XG5pbXBvcnQgeyBVdGlsaXR5IH0gZnJvbSAnLi91dGlsaXR5JztcbmltcG9ydCB7IEhhbmRsZXJzIH0gZnJvbSAnLi9oYW5kbGVycyc7XG5cbmltcG9ydCBibG9ja1N0dWR5QWdncmVlbWVudCBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1hZ2dyZWVtZW50Lmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlEaXNzYWdncmVlIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVF1ZXN0aW9uMSBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0xLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlRdWVzdGlvbjIgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMi5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5UXVlc3Rpb24zIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVNVUyBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1zdXMuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeUNvbXBsZXRlZCBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1jb21wbGV0ZWQuaHRtbCc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcbmNvbnN0IHV0aWxpdHkgPSBuZXcgVXRpbGl0eSgpO1xuXG5jb25zdCBVUkxQYXRoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbi8vIHN0dWR5IGNvbnN0cmFpbnRzIG51bWJlciBvZiBxdWVzdGlvbnMgc3RhcnRzIHdpdGggMFxubGV0IHN0dWR5VmVyc2lvbiA9IDA7IC8vIGRlZmF1bHQgc3R1ZHkgdmVyc2lvblxuaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJykpKSB7XG4gIHN0dWR5VmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbn0gZWxzZSB7XG4gIGNvbnN0IHN0dWR5TWluT25lID0gMDtcbiAgY29uc3Qgc3R1ZHlNYXhPbmUgPSAyO1xuICBzdHVkeVZlcnNpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoc3R1ZHlNYXhPbmUgLSBzdHVkeU1pbk9uZSArIDEpICsgc3R1ZHlNaW5PbmUpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJywgc3R1ZHlWZXJzaW9uKTtcbn1cblxuLy8gc3R1ZHkgY29uc3RyYWludHMgbnVtYmVyIG9mIHF1ZXN0aW9ucyBzdGFydHMgd2l0aCAwXG5sZXQgbWFwVmVyc2lvbiA9IDA7IC8vIGRlZmF1bHQgc3R1ZHkgdmVyc2lvblxuaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJykpKSB7XG4gIG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG59IGVsc2Uge1xuICBjb25zdCBtYXBNaW5PbmUgPSAwO1xuICBjb25zdCBtYXBNYXhPbmUgPSAyO1xuICBtYXBWZXJzaW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1hcE1heE9uZSAtIG1hcE1pbk9uZSArIDEpICsgbWFwTWluT25lKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicsIG1hcFZlcnNpb24pO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCd1dWlkJywgdXRpbGl0eS51dWlkKCkudG9TdHJpbmcoKSk7XG59XG5cbmlmICghdXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtc3VibWl0ZWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXN1Ym1pdGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWQtc3VibWl0ZWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkLXN1Ym1pdGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpKSkge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIGZhbHNlKTtcbn1cblxuLy8gS2lja3Mgb2ZmIHRoZSBwcm9jZXNzIG9mIGZpbmRpbmcgPGk+IHRhZ3MgYW5kIHJlcGxhY2luZyB3aXRoIDxzdmc+XG4vLyBhZGRlcyBzdXBwb3J0IGZvciBmb250YXdlc29tZVxubGlicmFyeS5hZGQoZmFzLCBmYXIpO1xuZG9tLndhdGNoKCk7XG5cbmNvbnN0IG1hcEJveENvbmZpZyA9IG5ldyBNYXBCb3hDb25maWcoKTtcbmNvbnN0IGhhbmRsZXJzID0gbmV3IEhhbmRsZXJzKCk7XG5cbi8vIGxvYWQgb25seSB0aGUgYmxvY2sgbmVlZGVkXG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQtaG9sZGVyJywgYmxvY2tTdHVkeUFnZ3JlZW1lbnQpO1xudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1kaXNzYWdncmVlLWhvbGRlcicsIGJsb2NrU3R1ZHlEaXNzYWdncmVlKTtcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktc3VzLWhvbGRlcicsIGJsb2NrU3R1ZHlTVVMpO1xudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1jb21wbGV0ZWQtaG9sZGVyJywgYmxvY2tTdHVkeUNvbXBsZXRlZCk7XG5cbmxldCBtYXAxO1xubGV0IG1hcDJhO1xubGV0IG1hcDJiO1xubGV0IG1hcDNBcnI7XG5sZXQgbWFwZGVmO1xuXG5zd2l0Y2ggKHN0dWR5VmVyc2lvbikge1xuICBjYXNlIDA6IC8vIGFuaW1hdGVcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTEtaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMSk7XG4gICAgbWFwMSA9IG1hcEJveENvbmZpZy5tYWtlQW5pbWF0ZU1hcCgnbWFwLTEnLCAwKTtcbiAgICBicmVhaztcbiAgY2FzZSAxOiAvLyBzaWRlIGJ5IHNpZGVcbiAgICB1dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTItaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMik7XG4gICAgbWFwMmEgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLTJhJywgMCk7XG4gICAgbWFwMmIgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLTJiJywgMSk7XG4gICAgbWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcDJhLCBtYXAyYik7XG4gICAgYnJlYWs7XG4gIGNhc2UgMjogLy8gc2xpZGVyXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0zLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjMpO1xuICAgIG1hcDNBcnIgPSBtYXBCb3hDb25maWcubWFrZUNvbXBhcmVNYXAoJ21hcC0zYScsICdtYXAtM2InLCAnY29tcGFyZS13cmFwcGVyJyk7XG4gICAgbWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcDNBcnJbMF0sIG1hcDNBcnJbMV0pO1xuICAgIGJyZWFrO1xuICBkZWZhdWx0OiAvLyBhbmltYXRlXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0xLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjEpO1xuICAgIG1hcGRlZiA9IG1hcEJveENvbmZpZy5tYWtlQW5pbWF0ZU1hcCgnbWFwLTEnLCAwKTtcbiAgICBicmVhaztcbn1cblxuLy8gY29tcGFyZSBtYXBzIG5lZWQgdG8gdW5jb21tZW50IGh0bWwgdG9vXG4vLyBjb25zdCBtYXBFbmRBQXJyID0gbWFwQm94Q29uZmlnLm1ha2VDb21wYXJlTWFwKCdtYXAtYy1lbmRhJywgJ21hcC1jLWVuZGInLFxuLy8gICAgICAgICdjb21wYXJlLWVuZDEtd3JhcHBlcicsIGZhbHNlLCBmYWxzZSk7XG4vLyBjb25zdCBtYXBFbmRCQXJyID0gbWFwQm94Q29uZmlnLm1ha2VDb21wYXJlTWFwKCdtYXAtYy1lbmRjJywgJ21hcC1jLWVuZGQnLFxuLy8gICAgICAgICdjb21wYXJlLWVuZDItd3JhcHBlcicsIHRydWUsIGZhbHNlKTtcbi8vIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXBFbmRBQXJyWzBdLCBtYXBFbmRBQXJyWzFdKTtcbi8vIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXBFbmRCQXJyWzBdLCBtYXBFbmRCQXJyWzFdKTtcblxuY29uc3QgbWFwRW5kYSA9IG1hcEJveENvbmZpZy5tYWtlQW5pbWF0ZU1hcCgnbWFwLWVuZGEnLCA5OSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbmNvbnN0IG1hcEVuZGIgPSBtYXBCb3hDb25maWcubWFrZUFuaW1hdGVNYXAoJ21hcC1lbmRiJywgOTksIHRydWUsIGZhbHNlLCB0cnVlKTtcblxuLy8gIHNpbmdsZSBtYXBzXG4vLyBjb25zdCBtYXBFbmRhID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC1lbmRhJywgOTksIGZhbHNlLCBmYWxzZSk7XG4vLyBjb25zdCBtYXBFbmRiID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC1lbmRiJyw5OSwgdHJ1ZSwgZmFsc2UpO1xuLy8gbWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcEVuZEFyclswXSwgbWFwRW5kQXJyWzFdKTtcblxuLy8gc3luYyBtYXBzXG5tYXBCb3hDb25maWcuc3luY01hcHMobWFwRW5kYSwgbWFwRW5kYik7XG5cbi8vIC8vIFRPRE8gb25seSBkZWFsIHdpdGggbWFwIGZvciBzdHVkeSBxdWVzdGlvblxuLy8gLy8gb25seSBsb2FkIGh0bWwgYmxvY2sgbmVlZGVkIG1hcCBvYmplY3RzIHdpbGwgaGF2ZSBnZW5lcmljIG5hbWVzIGFsc29cbmZ1bmN0aW9uIHJlc2l6ZUFsbE1hcHMoKSB7XG4gIHN3aXRjaCAoc3R1ZHlWZXJzaW9uKSB7XG4gICAgY2FzZSAwOiAvLyBhbmltYXRlXG4gICAgICBtYXAxLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOiAvLyBzaWRlIGJ5IHNpZGVcbiAgICAgIG1hcDJhLnJlc2l6ZSgpO1xuICAgICAgbWFwMmIucmVzaXplKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6IC8vIHNsaWRlclxuICAgICAgbWFwM0FyclswXS5yZXNpemUoKTtcbiAgICAgIG1hcDNBcnJbMV0ucmVzaXplKCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiAvLyBhbmltYXRlXG4gICAgICBtYXBkZWYucmVzaXplKCk7XG4gICAgICBicmVhaztcbiAgfVxuICAvLyBtYXBFbmRBQXJyWzBdLnJlc2l6ZSgpO1xuICAvLyBtYXBFbmRBQXJyWzFdLnJlc2l6ZSgpO1xuICAvLyBtYXBFbmRCQXJyWzBdLnJlc2l6ZSgpO1xuICAvLyBtYXBFbmRCQXJyWzFdLnJlc2l6ZSgpO1xuXG4gIG1hcEVuZGEucmVzaXplKCk7XG4gIG1hcEVuZGIucmVzaXplKCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnZ3JlZS1jbGlja2VkJywgKCkgPT4ge1xuICByZXNpemVBbGxNYXBzKCk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VzLWNsaWNrZWQnLCAoKSA9PiB7XG4gIHJlc2l6ZUFsbE1hcHMoKTtcbiAgbWFwRW5kYS5zZXRab29tKDUpO1xuICBtYXBFbmRhLnNldFpvb20oNSk7XG5cbiAgLy8gbWFwRW5kQUFyclswXS5zZXRab29tKDUpOztcbiAgLy8gbWFwRW5kQUFyclsxXS5zZXRab29tKDUpOztcbiAgLy8gbWFwRW5kQkFyclswXS5zZXRab29tKDUpOztcbiAgLy8gbWFwRW5kQkFyclsxXS5zZXRab29tKDUpOztcblxuICAvLyBtYXBFbmRBcnJbMF0uc2V0Wm9vbSgxMSk7XG4gIC8vIG1hcEVuZEFyclsxXS5zZXRab29tKDExKTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkaXNhZ2dyZWUtY2xpY2tlZCcsICgpID0+IHtcbiAgcmVzaXplQWxsTWFwcygpO1xufSk7XG5cbmNvbnN0IHVybFN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuY29uc3QgdXJsID0gbmV3IFVSTCh1cmxTdHJpbmcpO1xuY29uc3QgY2FtcGFpZ24gPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnY2FtcGFpZ24nKTtcblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmNvbnN0IGRhdGVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbnN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHkgc3RhcnRlZCcsIHRydWUpO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkIHRpbWUnLCBkYXRlc3RhbXApO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdjYW1wYWlnbicsIGNhbXBhaWduKTtcbnN0b3JlLnNldFN0YXRlSXRlbSgnbW9iaWxlJywgdXRpbGl0eS5pc01vYmlsZURldmljZSgpKTtcblxuLy8gYWxsIHRoZSBBZ2dyZWVtZW50IGNoYW5nZSBlbGVtZW50cyBwb3NzaWJsZVxuY29uc3QgYWdncmVtZW50Q2hhbmdlRWxlbWVudHMgPSBbJ2FnZ3JlZS1idXR0b24nXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIGFnZ3JlZSB0b1xuLy8gcGFydGljcGF0ZSBpbiBzdHVkeVxuYWdncmVtZW50Q2hhbmdlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgaGFuZGxlcnMuYWRkSGFuZGxlckFncmVlQ2xpY2soZWxlbWVudFVJSUQpO1xufSk7XG5cbi8vIGFsbCB0aGUgRGlzYWdncmVlbWVudCBjaGFuZ2UgZWxlbWVudHMgcG9zc2libGVcbmNvbnN0IGRpc2FnZ3JlbWVudENoYW5nZUVsZW1lbnRzID0gWydkaWFnZ3JlZS1idXR0b24nXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIGFnZ3JlZSB0b1xuLy8gcGFydGljcGF0ZSBpbiBzdHVkeVxuZGlzYWdncmVtZW50Q2hhbmdlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgaGFuZGxlcnMuYWRkSGFuZGxlckRpc2FncmVlQ2xpY2soZWxlbWVudFVJSUQpO1xufSk7XG5cbi8vIGFsbCB0aGUgc3VibWl0IGNoYW5nZSBlbGVtZW50cyBwb3NzaWJsZVxuY29uc3Qgc3VibWl0Q2hhbmdlRWxlbWVudHMgPSBbJ3N1Ym1pdC1idXR0b24tdG8tc3VzLTAnLCAnc3VibWl0LWJ1dHRvbi10by1zdXMtMScsICdzdWJtaXQtYnV0dG9uLXRvLXN1cy0yJ107XG5cbi8vIGVsZW1lbnRzIHRvIGFkZCB0byBVSSBhZnRlciBjbGlja2luZyBvbiBzdWJtaXQgY2hhbmdlXG4vLyBmcm9tIG9uZSBvZiB0aHJlZSBtYXAgcXVlc3Rpb25zXG5zdWJtaXRDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyU3VibWl0Q2hhbmdlQ2xpY2soZWxlbWVudFVJSUQpO1xufSk7XG5cbi8vIGFsbCB0aGUgU1VTIGNoYW5nZSBlbGVtZW50cyBwb3NzaWJsZVxuY29uc3Qgc3VzQ2hhbmdlRWxlbWVudHMgPSBbJ3N1Ym1pdC1idXR0b24tdG8tZW5kJ107XG5cbi8vIGVsZW1lbnRzIHRvIGFkZCB0byBVSSBhZnRlciBjbGlja2luZyBvbiBzdWJtaXQgY2hhbmdlXG4vLyBmcm9tIG9uZSBvZiB0aHJlZSBtYXAgcXVlc3Rpb25zXG5zdXNDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyU3VibWl0U1VTQ2xpY2soZWxlbWVudFVJSUQpO1xufSk7XG5cblxuaGFuZGxlcnMuYWRkSGFuZGxlclBsYXlDbGljaygnY29tcGxldGVkJywgJ2NvbXBsZXRlZC1wbGF5Jyk7XG5oYW5kbGVycy5hZGRIYW5kbGVyUGF1c2VDbGljaygnY29tcGxldGVkJywgJ2NvbXBsZXRlZC1wYXVzZScpO1xuaGFuZGxlcnMuYWRkSGFuZGxlckxheWVyc09mZkNsaWNrKCdjb21wbGV0ZWQnLCAnY29tcGxldGVkLXN0b3AnKTtcblxuaGFuZGxlcnMuYWRkSGFuZGxlclBsYXlDbGljaygnc3R1ZHknLCAnc3R1ZHktcGxheScpO1xuaGFuZGxlcnMuYWRkSGFuZGxlclBhdXNlQ2xpY2soJ3N0dWR5JywgJ3N0dWR5LXBhdXNlJyk7XG5oYW5kbGVycy5hZGRIYW5kbGVyTGF5ZXJzT2ZmQ2xpY2soJ3N0dWR5JywgJ3N0dWR5LXN0b3AnKTtcblxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC1jb21wbGV0ZWQtYW5pbWF0aW9uJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnbWFwLWNvbXBsZXRlZC1hbmltYXRpb24nLCB0cnVlKTtcbn0gZWxzZSB7XG4gIGNvbnN0IGlzQW5pbWF0ZWQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC1jb21wbGV0ZWQtYW5pbWF0aW9uJyk7XG4gIGlmIChpc0FuaW1hdGVkKSB7XG4gICAgY29uc3QgcGxheUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcGxldGVkLXBsYXknKTtcbiAgICBpZiAocGxheUVsZW1lbnQpIHtcbiAgICAgIHBsYXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHBhdXNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wbGV0ZWQtcGF1c2UnKTtcbiAgICBpZiAocGF1c2VFbGVtZW50KSB7XG4gICAgICBwYXVzZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH1cbn1cblxuaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtY29tcGxldGVkLWFuaW1hdGlvbi1zdG9wJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnbWFwLWNvbXBsZXRlZC1hbmltYXRpb24tc3RvcCcsIHRydWUpO1xufSBlbHNlIHtcbiAgY29uc3QgaXNBbmltYXRlZCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLWNvbXBsZXRlZC1hbmltYXRpb24tc3RvcCcpO1xuICBpZiAoIWlzQW5pbWF0ZWQpIHtcbiAgICBjb25zdCBzdG9wRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wbGV0ZWQtc3RvcCcpO1xuICAgIGlmIChzdG9wRWxlbWVudCkge1xuICAgICAgdXRpbGl0eS51bnNldFBsYXlCdXR0b25zKCdjb21wbGV0ZWQnKTtcbiAgICAgIHN0b3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICB9XG59XG5cbmlmICghdXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXN0dWR5LWFuaW1hdGlvbicpKSkge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ21hcC1zdHVkeS1hbmltYXRpb24nLCB0cnVlKTtcbn0gZWxzZSB7XG4gIGNvbnN0IGlzQW5pbWF0ZWQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC1zdHVkeS1hbmltYXRpb24nKTtcbiAgaWYgKGlzQW5pbWF0ZWQpIHtcbiAgICBjb25zdCBwbGF5RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wbGF5Jyk7XG4gICAgaWYgKHBsYXlFbGVtZW50KSB7XG4gICAgICBwbGF5RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwYXVzZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcGF1c2UnKTtcbiAgICBpZiAocGF1c2VFbGVtZW50KSB7XG4gICAgICBwYXVzZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH1cbn1cblxuaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtc3R1ZHktYW5pbWF0aW9uLXN0b3AnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdtYXAtc3R1ZHktYW5pbWF0aW9uLXN0b3AnLCB0cnVlKTtcbn0gZWxzZSB7XG4gIGNvbnN0IGlzQW5pbWF0ZWQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC1zdHVkeS1hbmltYXRpb24tc3RvcCcpO1xuICBpZiAoIWlzQW5pbWF0ZWQpIHtcbiAgICBjb25zdCBzdG9wRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1zdG9wJyk7XG4gICAgaWYgKHN0b3BFbGVtZW50KSB7XG4gICAgICB1dGlsaXR5LnVuc2V0UGxheUJ1dHRvbnMoJ3N0dWR5Jyk7XG4gICAgICBzdG9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBvbmx5IHVwZGF0ZXMgb25lIG1hcCBob3cgZG8gZ2V0IGV2ZXJ5IG1hcFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ3JpZC11cGRhdGUnLCAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgc3dpdGNoIChzdHVkeVZlcnNpb24pIHtcbiAgICBjYXNlIDA6IC8vIGFuaW1hdGVcbiAgICAgIG1hcDEuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTogLy8gc2lkZSBieSBzaWRlXG4gICAgICBtYXAyYS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgICAgbWFwMmIuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjogLy8gc2xpZGVyXG4gICAgICBtYXAzQXJyWzBdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBtYXAzQXJyWzFdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiAvLyBhbmltYXRlXG4gICAgICBtYXBkZWYuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIC8vIG1hcEVuZEFyclswXS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAvLyBtYXBFbmRBcnJbMV0uZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgbWFwRW5kYS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICBtYXBFbmRiLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG59KTtcblxuY29uc3Qgc3VzQnRuR3JvdXBFbGVtZW50cyA9IFsnYnRuLWdyb3VwLXN1cy0xJyxcbiAgJ2J0bi1ncm91cC1zdXMtMicsXG4gICdidG4tZ3JvdXAtc3VzLTMnLFxuICAnYnRuLWdyb3VwLXN1cy00JyxcbiAgJ2J0bi1ncm91cC1zdXMtNScsXG4gICdidG4tZ3JvdXAtc3VzLTYnLFxuICAnYnRuLWdyb3VwLXN1cy03JyxcbiAgJ2J0bi1ncm91cC1zdXMtOCcsXG4gICdidG4tZ3JvdXAtc3VzLTknLFxuICAnYnRuLWdyb3VwLXN1cy0xMCddO1xuXG5zdXNCdG5Hcm91cEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIC8vIGFkZCBxdWVzdGlvbiBoYW5kbGVyXG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTVVNRdWVzdGlvbkNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyByZW1vdmUgaW1hZ2VyeSBkaXJlY3Rpb25zIHdoZW4gbm90IGltYWdlcnlcbmlmIChtYXBWZXJzaW9uICE9PSAyKSB7XG4gIGNvbnN0IGltYWdlcnlEaXJlY3Rpb25zRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9yLXNhdCcpO1xuXG4gIGltYWdlcnlEaXJlY3Rpb25zRWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lICFpbXBvcnRhbnQnKTtcbiAgfSk7XG59XG5cbi8vIHN1cyBxdWVzdGlvbiBzdGF0ZSBpdGVtc1xuY29uc3Qgc3VzTmFtZSA9ICdzdXMtcXVlc3Rpb24tJztcbmNvbnN0IHN1c0l0ZXJhdGlvbnMgPSAxMDtcbnV0aWxpdHkuc2V0U3RhdGVGb3JHcm91cChzdXNOYW1lLCBzdXNJdGVyYXRpb25zKTtcbnV0aWxpdHkuc2V0RG9tU3RhdGVGb3JHcm91cChzdXNOYW1lLCBzdXNJdGVyYXRpb25zKTtcblxuLy8gYWRkIGdyaWQgYm94IHN0YXRlIGl0ZW1zXG5jb25zdCBncmlkSXRlcmF0aW9ucyA9IDQyO1xuY29uc3QgZ3JpZE5hbWUgPSAnZ3JpZC1ib3gtJztcbnV0aWxpdHkuc2V0U3RhdGVGb3JHcm91cChncmlkTmFtZSwgZ3JpZEl0ZXJhdGlvbnMpO1xuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBjb21wbGV0ZXRpb25cbmNvbnN0IGlzU3R1ZHljb21wbGV0ZWQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWNvbXBsZXRlZCcpO1xubGV0IHN0dWR5Q29tcGxldGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIGlzU3R1ZHljb21wbGV0ZWQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUNvbXBsZXRlZCA9IGlzU3R1ZHljb21wbGV0ZWQ7XG59IGVsc2Uge1xuICBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBhZ2dyZWVpbmcgdG8gc3R1ZHlcbmNvbnN0IFN0dWR5QWdycmVlbWVudCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG5sZXQgc3R1ZHlBZ3JyZWVkID0gZmFsc2U7XG5pZiAodHlwZW9mIFN0dWR5QWdycmVlbWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gIHN0dWR5QWdycmVlZCA9IFN0dWR5QWdycmVlbWVudDtcbn0gZWxzZSB7XG4gIHN0dWR5QWdycmVlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBzdWJtaXR0aW5nIHN0dWR5XG5jb25zdCBncmlkU3VibWl0ZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZC1zdWJtaXRlZCcpO1xubGV0IGdyaWRTdWJtaXRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBncmlkU3VibWl0ZWRTdGF0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gIGdyaWRTdWJtaXRlZCA9IGdyaWRTdWJtaXRlZFN0YXRlO1xufSBlbHNlIHtcbiAgZ3JpZFN1Ym1pdGVkID0gZmFsc2U7XG59XG5cbi8vIGNoZWNrIHN0dWR5IHNlc3Npb24gc3RhdGUgZm9yIHN1Ym1pdHRpbmcgc3VzIHF1ZXN0aW9uc1xuY29uc3Qgc3VzU3VibWl0ZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy1zdWJtaXRlZCcpO1xubGV0IHN1c1N1Ym1pdGVkID0gZmFsc2U7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbmlmICh0eXBlb2YgZ3JpZFN1Ym1pdGVkU3RhdGUgPT09ICdib29sZWFuJykge1xuICBzdXNTdWJtaXRlZCA9IHN1c1N1Ym1pdGVkU3RhdGU7XG59IGVsc2Uge1xuICBzdXNTdWJtaXRlZCA9IGZhbHNlO1xufVxuXG4vLyBzdWJtaXQgYnV0dG9uc1xuY29uc3QgYWdncmVtZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2dyZWUtYnV0dG9uJyk7XG5jb25zdCBkaWFnZ3JlZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhZ2dyZWUtYnV0dG9uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbmNvbnN0IGdyaWRTdWJtaXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHN1Ym1pdC1idXR0b24tdG8tc3VzLSR7c3R1ZHlWZXJzaW9ufWApO1xuY29uc3QgY29tcGxldGVkU3VibWl0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtYnV0dG9uLXRvLWVuZCcpO1xuXG5pZiAoc3R1ZHlBZ3JyZWVkKSB7XG4gIHN3aXRjaCAoVVJMUGF0aCkge1xuICAgIGNhc2UgJyMnOlxuICAgICAgaWYgKHN0dWR5QWdycmVlZCkge1xuICAgICAgICBpZiAoYWdncmVtZW50RWxlbWVudCkge1xuICAgICAgICAgIGFnZ3JlbWVudEVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnI21hcCc6XG4gICAgICBpZiAoc3R1ZHlBZ3JyZWVkKSB7XG4gICAgICAgIGlmIChhZ2dyZW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgYWdncmVtZW50RWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICcjc3VzLXF1ZXN0aW9ucyc6XG4gICAgICBpZiAoZ3JpZFN1Ym1pdGVkKSB7XG4gICAgICAgIGlmIChncmlkU3VibWl0RWxlbWVudCkge1xuICAgICAgICAgIGdyaWRTdWJtaXRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAoc3R1ZHlBZ3JyZWVkKSB7XG4gICAgICAgIGlmIChhZ2dyZW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgYWdncmVtZW50RWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIChldmVudCkgPT4ge1xuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG59KTtcblxuLy8gaGlkZSBzdHVkeVxuaWYgKHN0dWR5Q29tcGxldGVkKSB7XG4gIGlmIChjb21wbGV0ZWRTdWJtaXRFbGVtZW50KSB7XG4gICAgY29tcGxldGVkU3VibWl0RWxlbWVudC5jbGljaygpO1xuICB9XG59XG4iLCJpbXBvcnQgbWFwYm94Z2wgZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCBNYXBib3hDb21wYXJlIGZyb20gJ21hcGJveC1nbC1jb21wYXJlJztcbmltcG9ydCB7IHBvbHlnb24sIGZlYXR1cmVDb2xsZWN0aW9uIH0gZnJvbSAnQHR1cmYvaGVscGVycyc7XG5pbXBvcnQgYnVmZmVyIGZyb20gJ0B0dXJmL2J1ZmZlcic7XG5pbXBvcnQgYmJveFBvbHlnb24gZnJvbSAnQHR1cmYvYmJveC1wb2x5Z29uJztcbmltcG9ydCBiYm94IGZyb20gJ0B0dXJmL2Jib3gnO1xuaW1wb3J0IGVudmVsb3BlIGZyb20gJ0B0dXJmL2VudmVsb3BlJztcbmltcG9ydCB7IFV0aWxpdHkgfSBmcm9tICcuL3V0aWxpdHknO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTk9uZSBmcm9tICcuL3NxdWFyZS1ncmlkLWdlb2pzb24uanNvbic7XG5pbXBvcnQgU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQgZnJvbSAnLi9zcXVhcmUtZ3JpZC1nZW9qc29uLXNlY29uZC5qc29uJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkIGZyb20gJy4vc3F1YXJlLWdyaWQtZ2VvanNvbi10aGlyZC5qc29uJztcblxuXG5jb25zdCBzeW5jTW92ZSA9IHJlcXVpcmUoJ0BtYXBib3gvbWFwYm94LWdsLXN5bmMtbW92ZScpO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuZXhwb3J0IGNsYXNzIE1hcEJveENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGRlZmF1bHRzIGZvciBncmlkIGJveGVzXG4gICAgY29uc3QgYnVmZkRpc3QgPSA0O1xuICAgIGNvbnN0IGJ1ZmZVbml0cyA9IHsgdW5pdHM6ICdtaWxlcycgfTtcbiAgICBjb25zdCBpa0JveCA9IGJib3goZW52ZWxvcGUoU3F1YXJlR3JpZEdlb0pTT05PbmUpKTtcbiAgICBjb25zdCBoc3RuQm94ID0gYmJveChlbnZlbG9wZShTcXVhcmVHcmlkR2VvSlNPTlNlY29uZCkpO1xuICAgIGNvbnN0IGx2Qm94ID0gYmJveChlbnZlbG9wZShTcXVhcmVHcmlkR2VvSlNPTlRoaXJkKSk7XG5cbiAgICBjb25zdCBpa01heEJveCA9IGJib3goYnVmZmVyKGJib3hQb2x5Z29uKGlrQm94KSwgYnVmZkRpc3QsIGJ1ZmZVbml0cykpO1xuICAgIGNvbnN0IGhzdG5NYXhCb3ggPSBiYm94KGJ1ZmZlcihiYm94UG9seWdvbihoc3RuQm94KSwgYnVmZkRpc3QsIGJ1ZmZVbml0cykpO1xuICAgIGNvbnN0IGx2TWF4Qm94ID0gYmJveChidWZmZXIoYmJveFBvbHlnb24obHZCb3gpLCBidWZmRGlzdCwgYnVmZlVuaXRzKSk7XG5cbiAgICB0aGlzLm1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgc3dpdGNoICh0aGlzLm1hcFZlcnNpb24pIHtcbiAgICAgIGNhc2UgMDogLy8gYXZsXG4gICAgICAgIGlmICh1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpKSkge1xuICAgICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IFNxdWFyZUdyaWRHZW9KU09OT25lO1xuICAgICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nLCBTcXVhcmVHcmlkR2VvSlNPTk9uZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6IC8vIGhzdG5cbiAgICAgICAgaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJykpKSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQ7XG4gICAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIFNxdWFyZUdyaWRHZW9KU09OU2Vjb25kKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjogLy8gbHZcbiAgICAgICAgaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJykpKSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gU3F1YXJlR3JpZEdlb0pTT05UaGlyZDtcbiAgICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05UaGlyZCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBhdmxcbiAgICAgICAgaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJykpKSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gU3F1YXJlR3JpZEdlb0pTT05PbmU7XG4gICAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIFNxdWFyZUdyaWRHZW9KU09OT25lKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmRlZmF1bHRNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJztcbiAgICB0aGlzLmRlZmF1bHRNYXBDZW50ZXIgPSBbLTgyLjU3MCwgMzUuNTYwXTsgLy8gc3RhcnRpbmcgcG9zaXRpb24gW2xuZywgbGF0XVxuICAgIHRoaXMuZGVmYXVsdE1heEJvdW5kcyA9IFstODIuNzAyLCAzNS40NjMsIC04Mi40NDIsIDM1LjY1N107XG4gICAgdGhpcy5kZWZhdWx0TWFwWm9vbSA9IDU7IC8vIHN0YXJ0aW5nIHpvb21cbiAgICB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIgPSAnbWFwJztcbiAgICB0aGlzLmRhcmtNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L2RhcmstdjEwJztcbiAgICB0aGlzLmxpZ2h0TWFwU3R5bGUgPSAnbWFwYm94Oi8vc3R5bGVzL21hcGJveC9saWdodC12MTAnO1xuICAgIHRoaXMubWFwYm94Z2wgPSBtYXBib3hnbDtcbiAgICB0aGlzLk1hcGJveENvbXBhcmUgPSBNYXBib3hDb21wYXJlO1xuICAgIHRoaXMubWFwYm94Z2wuYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2laR0YyWldsemJTSXNJbUVpT2lKQ2RqVXhUMEZ6SW4wLlY5b0lrX3dVYzR1WnU3VUJibFI4bXcnO1xuICAgIHRoaXMucXVpZXQgPSB0cnVlO1xuICAgIHRoaXMubWFwMSA9IG51bGw7XG4gICAgdGhpcy5tYXAyID0gbnVsbDtcbiAgICB0aGlzLmRlZmF1bHRHcmV5Qm94ID0gJyM1NTU1NTUnO1xuICAgIHRoaXMuc2VsZWN0ZWRCb3ggPSAnI0ZCQjAzQic7XG4gICAgdGhpcy5tYXBDaGFuZ2VMYXllcnMgPSB7XG4gICAgICBsYXllcnM6IFtcbiAgICAgICAgWyAvLyBhdmwgMFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9pa25vd18xL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICAgICAgbWF4em9vbTogMTMsXG4gICAgICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgICAgIGJvdW5kczogaWtCb3gsXG4gICAgICAgICAgICBtYXhib3VuZHM6IGlrTWF4Qm94XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvaWtub3dfMi97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDEzLFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IGlrQm94LFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBpa01heEJveFxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgWyAvLyBoc3RuIDFcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvbGFuZGNvdmVyXzEve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBoc3RuQm94LFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBoc3RuTWF4Qm94XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvbGFuZGNvdmVyXzIve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBoc3RuQm94LFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBoc3RuTWF4Qm94XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBbIC8vIGx2IDJcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvbGFrZW1lYWRfMS97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IGx2Qm94LFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBsdk1heEJveFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2xha2VtZWFkXzIve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBsdkJveCxcbiAgICAgICAgICAgIG1heGJvdW5kczogbHZNYXhCb3hcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUgPSBbXG4gICAgICAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL25sY2QtMjAxNi0zMC97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9ubGNkLTIwMDEtMzAve3p9L3t4fS97eX0ucG5nJ1xuICAgIF07XG4gIH1cblxuICAvLyBTZXRzIGFuIGluZGl2aWR1YWwgbWFwYm94IG1hcCB0ZXN0XG4gIC8vXG4gIC8vIEBwYXJhbSBtYXBDb250YWluZXIgLSBzdHJpbmdcbiAgLy8gQHJldHVybiBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZU1hcChtYXBDb250YWluZXIgPSB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIsIG1hcEluZGV4ID0gMCwgZW5kID0gZmFsc2UsIGVuYWJsZWNsaWNrID0gdHJ1ZSkge1xuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG4gICAgbGV0IG1hcEluZGV4Qm91bmRzID0gdGhpcy5kZWZhdWx0TWF4Qm91bmRzO1xuICAgIGlmIChtYXBJbmRleCA9PT0gOTkpIHtcbiAgICAgIG1hcEluZGV4Qm91bmRzID0gbWFwU2V0dXBbMF0ubWF4Ym91bmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXBJbmRleEJvdW5kcyA9IG1hcFNldHVwW21hcEluZGV4XS5tYXhib3VuZHM7XG4gICAgfVxuICAgIGNvbnN0IG1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcENvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIHpvb206IHRoaXMuZGVmYXVsdE1hcFpvb20sXG4gICAgICBzaG93Wm9vbTogdHJ1ZSxcbiAgICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgICAgbWF4Qm91bmRzOiBtYXBJbmRleEJvdW5kc1xuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMobWFwKTtcbiAgICAgIGlmIChtYXBJbmRleCAhPT0gOTkpIHtcbiAgICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCBtYXBJbmRleCkpO1xuICAgICAgfVxuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkQ29ycmVjdExheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRMYXllcigpKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmFibGVjbGljaykge1xuICAgICAgICB0aGlzLmFkZEdyaWRDbGljayhtYXApO1xuICAgICAgfVxuICAgICAgbWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBtYXAucmVzaXplKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbWFwLnJlc2l6ZSgpOyB9LCAxMCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIG1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG1hcC5yZXNpemUoKTsgfSwgMTApO1xuICAgIH07XG4gICAgbWFwLmFkZENvbnRyb2wobmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKHsgc2hvd0NvbXBhc3M6IGZhbHNlIH0pLCAndG9wLWxlZnQnKTtcbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgLy8gU2V0cyB1cCBhbmltYXRlZCBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG1hcENvbnRhaW5lciAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIG5ldyBtYXBib3ggbWFwIG9iamVjdFxuICBtYWtlQW5pbWF0ZU1hcChtYXBDb250YWluZXIgPSB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIsXG4gICAgbWFwSW5kZXggPSAwLCBlbmQgPSBmYWxzZSwgZW5hYmxlY2xpY2sgPSB0cnVlLCBlbmRtYXBzID0gZmFsc2UpIHtcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuXG4gICAgY29uc3QgbWFwID0gbmV3IHRoaXMubWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogbWFwQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMuZGFya01hcFN0eWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmRlZmF1bHRNYXBDZW50ZXIsXG4gICAgICB6b29tOiB0aGlzLmRlZmF1bHRNYXBab29tLFxuICAgICAgc2hvd1pvb206IHRydWUsXG4gICAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgICBrZXliaW5kaW5nczogdHJ1ZSxcbiAgICAgIG1heEJvdW5kczogbWFwU2V0dXBbMF0ubWF4Ym91bmRzXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ2xvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5maXRNeUJvdW5kcyhtYXApO1xuICAgICAgLy8gaWYgKGVuZCkge1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAwKSk7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlVE1TTGF5ZXIodGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUsIDEpKTtcbiAgICAgIC8vIH1cbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZENvcnJlY3RMYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkTGF5ZXIoKSk7XG4gICAgICB9XG4gICAgICBpZiAoZW5hYmxlY2xpY2spIHtcbiAgICAgICAgdGhpcy5hZGRHcmlkQ2xpY2sobWFwKTtcbiAgICAgIH1cbiAgICAgIG1hcC5yZXNpemUoKTtcblxuICAgICAgY29uc3QgaW5kZXhDb3VudCA9IDI7XG4gICAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIC8vIHNlZSBpZiB1c2VyIHBhdXNlZCBhbmltYXRpb25cbiAgICAgICAgaWYgKGVuZG1hcHMpIHtcbiAgICAgICAgICBjb25zdCBrZWVwR29pbmcgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC1jb21wbGV0ZWQtYW5pbWF0aW9uJyk7XG4gICAgICAgICAgaWYgKCFrZWVwR29pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBrZWVwR29pbmdTdG9wID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtY29tcGxldGVkLWFuaW1hdGlvbi1zdG9wJyk7XG4gICAgICAgICAgaWYgKCFrZWVwR29pbmdTdG9wKSB7XG4gICAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMScsICd2aXNpYmlsaXR5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0wJywgJ3Zpc2liaWxpdHknLCAnbm9uZScpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGtlZXBHb2luZyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXN0dWR5LWFuaW1hdGlvbicpO1xuICAgICAgICAgIGlmICgha2VlcEdvaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBrZWVwR29pbmdTdG9wID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtc3R1ZHktYW5pbWF0aW9uLXN0b3AnKTtcbiAgICAgICAgICBpZiAoIWtlZXBHb2luZ1N0b3ApIHtcbiAgICAgICAgICAgIG1hcC5zZXRMYXlvdXRQcm9wZXJ0eSgnbWFwLWNoYW5nZS0xJywgJ3Zpc2liaWxpdHknLCAnbm9uZScpO1xuICAgICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTAnLCAndmlzaWJpbGl0eScsICdub25lJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbmRleCA9IChpbmRleCArIDEpICUgaW5kZXhDb3VudDtcbiAgICAgICAgaWYgKGluZGV4ID09PSAxKSB7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTEnLCAndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTAnLCAndmlzaWJpbGl0eScsICdub25lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTAnLCAndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTEnLCAndmlzaWJpbGl0eScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgbWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBtYXAucmVzaXplKCk7XG4gICAgfTtcbiAgICAvLyBBZGQgem9vbSBhbmQgcm90YXRpb24gY29udHJvbHMgdG8gdGhlIG1hcC5cbiAgICBtYXAuYWRkQ29udHJvbChuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woeyBzaG93Q29tcGFzczogZmFsc2UgfSksICd0b3AtbGVmdCcpO1xuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICAvLyBtYWtlQ29tcGFyZU1hcCBTZXRzIGFuIGNvbXBhcmluZyBtYXAgXCJzd2lwaW5nXCIgbWFwYm94IG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbWFwQ29udGFpbmVyIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYXJyYXkgb2YgbWFwcyBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZUNvbXBhcmVNYXAobWFwQmVmb3JlQ29udGFpbmVyLCBtYXBBZnRlckNvbnRhaW5lciwgbWFwQ29tcGFyZVdyYXBwZXJJRCxcbiAgICBlbmQgPSBmYWxzZSwgZW5hYmxlY2xpY2sgPSB0cnVlKSB7XG4gICAgY29uc3QgbWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBtYXBTZXR1cCA9IHRoaXMubWFwQ2hhbmdlTGF5ZXJzLmxheWVyc1ttYXBWZXJzaW9uXTtcblxuICAgIGNvbnN0IGJlZm9yZU1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcEJlZm9yZUNvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgICBtYXhCb3VuZHM6IG1hcFNldHVwWzBdLm1heGJvdW5kc1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWZ0ZXJNYXAgPSBuZXcgdGhpcy5tYXBib3hnbC5NYXAoe1xuICAgICAgY29udGFpbmVyOiBtYXBBZnRlckNvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgICBtYXhCb3VuZHM6IG1hcFNldHVwWzFdLm1heGJvdW5kc1xuICAgIH0pO1xuICAgIGNvbnN0IGNvbXBhcmUgPSBuZXcgdGhpcy5NYXBib3hDb21wYXJlKGJlZm9yZU1hcCwgYWZ0ZXJNYXAsIGAjJHttYXBDb21wYXJlV3JhcHBlcklEfWApO1xuXG4gICAgYmVmb3JlTWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMoYmVmb3JlTWFwKTtcbiAgICAgIGJlZm9yZU1hcC5hZGRMYXllcih0aGlzLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgMSkpOyAvLyBuZWVkcyB1cGRhdGVcbiAgICAgIGJlZm9yZU1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICBiZWZvcmVNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZENvcnJlY3RMYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJlZm9yZU1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkTGF5ZXIoKSk7XG4gICAgICB9XG4gICAgICBpZiAoZW5hYmxlY2xpY2spIHtcbiAgICAgICAgdGhpcy5hZGRHcmlkQ2xpY2soYmVmb3JlTWFwKTtcbiAgICAgIH1cbiAgICAgIGJlZm9yZU1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgYmVmb3JlTWFwLnJlc2l6ZSgpO1xuICAgICAgY29tcGFyZS5zZXRTbGlkZXIoMTUwKTtcbiAgICB9KTtcblxuICAgIGFmdGVyTWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZml0TXlCb3VuZHMoYWZ0ZXJNYXApO1xuICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlVE1TTGF5ZXIodGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUsIDApKTsgLy8gbmVlZHMgdXBkYXRlXG4gICAgICBhZnRlck1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICBhZnRlck1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkQ29ycmVjdExheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgfVxuICAgICAgaWYgKGVuYWJsZWNsaWNrKSB7XG4gICAgICAgIHRoaXMuYWRkR3JpZENsaWNrKGFmdGVyTWFwKTtcbiAgICAgIH1cbiAgICAgIGFmdGVyTWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBhZnRlck1hcC5yZXNpemUoKTtcbiAgICAgIGNvbXBhcmUuc2V0U2xpZGVyKDE1MCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIGFmdGVyTWFwLnJlc2l6ZSgpO1xuICAgICAgYmVmb3JlTWFwLnJlc2l6ZSgpO1xuICAgICAgY29tcGFyZS5zZXRTbGlkZXIoMTUwKTtcbiAgICB9O1xuICAgIC8vIEFkZCB6b29tIGFuZCByb3RhdGlvbiBjb250cm9scyB0byB0aGUgbWFwLlxuICAgIGJlZm9yZU1hcC5hZGRDb250cm9sKG5ldyBtYXBib3hnbC5OYXZpZ2F0aW9uQ29udHJvbCh7IHNob3dDb21wYXNzOiBmYWxzZSB9KSwgJ3RvcC1sZWZ0Jyk7XG4gICAgYWZ0ZXJNYXAuYWRkQ29udHJvbChuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woeyBzaG93Q29tcGFzczogZmFsc2UgfSksICd0b3AtbGVmdCcpO1xuICAgIHJldHVybiBbYmVmb3JlTWFwLCBhZnRlck1hcF07XG4gIH1cblxuICAvLyBzeW5jcyB0d28gbWFwcyB6b29tIGFuZCBwYW5cbiAgLy8gbW9kaWZlZCBmcm9tIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC5qcy9leGFtcGxlL3YxLjAuMC9zeW5jLWxheWVyLW1vdmVtZW50L1xuICAvL1xuICAvLyBAcGFyYW0gbWFwMSA9IGZpcnN0IG1hcGJveCBtYXAgb2JqZWN0XG4gIC8vIEBwYXJhbSBtYXAyICA9IHNlY29uZCBtYXBib3ggbWFwIG9iamVjdFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc3luY01hcHMobWFwMSwgbWFwMikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgc3luY01vdmUobWFwMSwgbWFwMik7XG4gIH1cblxuICBtYWtlVE1TTGF5ZXIobWFwQ2hhbmdlLCBtYXBJbmRleCkge1xuICAgIC8vIHN0dWR5IGNvbnN0cmFpbnRzIG51bWJlciBvZiBxdWVzdGlvbnMgc3RhcnRzIHdpdGggMFxuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGBtYXAtY2hhbmdlLSR7bWFwSW5kZXh9YCxcbiAgICAgIHR5cGU6ICdyYXN0ZXInLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdyYXN0ZXInLFxuICAgICAgICB0aWxlczogW21hcFNldHVwW21hcEluZGV4XS51cmxdLFxuICAgICAgICBtaW56b29tOiBtYXBTZXR1cFttYXBJbmRleF0ubWluem9vbSxcbiAgICAgICAgbWF4em9vbTogbWFwU2V0dXBbbWFwSW5kZXhdLm1heHpvb20sXG4gICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgIGJvdW5kczogbWFwU2V0dXBbbWFwSW5kZXhdLmJvdW5kcyxcbiAgICAgICAgbWF4Qm91bmRzOiBtYXBTZXR1cFttYXBJbmRleF0ubWF4Ym91bmRzXG4gICAgICB9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ3Jhc3Rlci1mYWRlLWR1cmF0aW9uJzogMFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBtYWtlcyBjaGFuZ2UgZ3JpZCBsYXllciBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIG1ha2VHcmlkTGF5ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnY2hhbmdlLWdyaWQnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgZGF0YTogdGhpcy5zcXVhcmVHcmlkR2VvSlNPTlxuICAgICAgfSxcbiAgICAgIGxheW91dDoge30sXG4gICAgICBwYWludDoge1xuICAgICAgICAnZmlsbC1jb2xvcic6IFtcbiAgICAgICAgICAnbWF0Y2gnLFxuICAgICAgICAgIFsnZ2V0JywgJ3NlbGVjdGVkJ10sXG4gICAgICAgICAgMSwgdGhpcy5zZWxlY3RlZEJveCxcbiAgICAgICAgICAvKiBvdGhlciAqLyB0aGlzLmRlZmF1bHRHcmV5Qm94XG4gICAgICAgIF0sXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiAwLjVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gbWFrZXMgY2hhbmdlIGdyaWQgbGF5ZXIgd2hhdCBjb3JyZWN0IG9uIG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgbWFrZUdyaWRDb3JyZWN0TGF5ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnY2hhbmdlLWdyaWQnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgZGF0YTogdGhpcy5zcXVhcmVHcmlkR2VvSlNPTlxuICAgICAgfSxcbiAgICAgIGxheW91dDoge30sXG4gICAgICBwYWludDoge1xuICAgICAgICAnZmlsbC1jb2xvcic6IFtcbiAgICAgICAgICAnbWF0Y2gnLFxuICAgICAgICAgIFsnZ2V0JywgJ3YnXSxcbiAgICAgICAgICAxLCB0aGlzLnNlbGVjdGVkQm94LFxuICAgICAgICAgIC8qIG90aGVyICovIHRoaXMuZGVmYXVsdEdyZXlCb3hcbiAgICAgICAgXSxcbiAgICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuNVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBtYWtlcyBjaGFuZ2UgZ3JpZCBsYXllciBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIG1ha2VHcmlkT3V0TGluZUxheWVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ2NoYW5nZS1ncmlkLW91dGxpbmUnLFxuICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgZGF0YTogdGhpcy5zcXVhcmVHcmlkR2VvSlNPTlxuICAgICAgfSxcbiAgICAgIGxheW91dDoge1xuICAgICAgICAnbGluZS1qb2luJzogJ3JvdW5kJyxcbiAgICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJ1xuICAgICAgfSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdsaW5lLWNvbG9yJzogdGhpcy5kZWZhdWx0R3JleUJveCxcbiAgICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIGFkZHMgY2xpY2sgb2YgZ3JpZCBib3ggdG8gY2FwdHVyZSB3aGljaCBncmlkIHRoZSB1c2VyXG4gIC8vIHRoaW5rcyBjaGFuZ2UgaGFwcGVuZCBpbiBvcmdpbmFsIGZyb206XG4gIC8vIGh0dHBzOi8vZG9jcy5tYXBib3guY29tL21hcGJveC1nbC1qcy9leGFtcGxlL3BvbHlnb24tcG9wdXAtb24tY2xpY2svXG4gIC8vXG4gIC8vIEBwYXJhbSBtYXAgPSBtYXBib3ggbWFwIG9iamVjdCB0byB1cGRhdGUgem9vbSBhbmQgY2VudGVyIHRvXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRHcmlkQ2xpY2sobWFwKSB7XG4gICAgLy8gY29uc3QgbWFrZUdyaWRMYXllciA9IHRoaXMubWFrZUdyaWRMYXllcigpO1xuICAgIC8vIFdoZW4gYSBjbGljayBldmVudCBvY2N1cnMgb24gYSBmZWF0dXJlIGluIHRoZSBzdGF0ZXMgbGF5ZXIsIG9wZW4gYSBwb3B1cCBhdCB0aGVcbiAgICAvLyBsb2NhdGlvbiBvZiB0aGUgY2xpY2ssIHdpdGggZGVzY3JpcHRpb24gSFRNTCBmcm9tIGl0cyBwcm9wZXJ0aWVzLlxuICAgIG1hcC5vbignbW91c2VlbnRlcicsICdjaGFuZ2UtZ3JpZCcsIChlKSA9PiB7XG4gICAgICBtYXAuZ2V0Q2FudmFzKCkuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ21vdXNlbGVhdmUnLCAnY2hhbmdlLWdyaWQnLCAoZSkgPT4ge1xuICAgICAgbWFwLmdldENhbnZhcygpLnN0eWxlLmN1cnNvciA9ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ2NsaWNrJywgJ2NoYW5nZS1ncmlkJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGZlYXR1cmUgPSBlLmZlYXR1cmVzWzBdO1xuICAgICAgY29uc3QgaWQgPSBOdW1iZXIoZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcblxuICAgICAgLy8gdWRwYXRlcyBzZWxlY3RlZCBnZW9qc29uIHByb3Blcml0ZXMuc2VsZWN0ZWQgMCBvciAxIGRlcGVuZWRpbmdcbiAgICAgIC8vIGlmIHVzZXIgc2VsZWN0ZWQgcG9seWdvblxuICAgICAgY29uc3QgbmV3RmVhdHVyZSA9IE1hcEJveENvbmZpZy50b2dnbGVTZWxlY3RlZEZlYXR1cmUoZmVhdHVyZSk7XG5cbiAgICAgIC8vIGNyZWF0ZSBhIG5ldyBmZWF0dXJlIGNvbGxlY3Rpb24gZnJvbSBzZWxlY3RlZCBmZWF0dXJlXG4gICAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmVzID0gTWFwQm94Q29uZmlnLm1ha2VTZWxlY3RlZEZlYXR1cmVHZW9KU09OKG5ld0ZlYXR1cmUpO1xuXG4gICAgICAvLyB1cGRhdGVzIHNxdWFyZUdyaWRHZW9KU09OIHdpdGggbmV3IGdlb2pzb25cbiAgICAgIGNvbnN0IG5ld1NxdWFyZUdyaWRHZW9KU09OID0gTWFwQm94Q29uZmlnLnVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyhzZWxlY3RlZEZlYXR1cmVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICAvLyBzdG9yZSBuZXcgc3F1YXJlIGdyaWQgd2l0aCBzbGVjdGVkIGJveGVzXG4gICAgICB0aGlzLnN0b3JlU3F1YXJlR3JpZChuZXdTcXVhcmVHcmlkR2VvSlNPTik7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSB3aXRoIHNlbGVjdGVkIGZlYXR1cmVcbiAgICAgIE1hcEJveENvbmZpZy5zdG9yZVNlbGVjdGVkRmVhdHVyZShpZCk7XG5cbiAgICAgIC8vIHRpZ2dlciBldmVudCBzbyBhbGwgZGF0YSBzb3VyY2VzIHVwZGF0ZVxuICAgICAgdXRpbGl0eS50cmlnZ2VyRXZlbnQoJ2dyaWQtdXBkYXRlJywgaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gdG9nZ2xlcyB2YWx1ZSB0aGUgcHJvcGVydGllcyAoYXR0cmlidXRlKSBzZWxlY3RlZFxuICAvLyAgICB3aGVuIGEgdXNlciBjbGlja3MgdGhlIGdyaWQgYm94ID4gMCB3aGVuIHNlbGVjdGVkXG4gIC8vICAgIDAgd2hlbiBzZWxlY3RlXG4gIC8vXG4gIC8vIEBwYXJhbSBmZWF0dXJlID0gZ2VvanNvbiBmZWF0dXJlIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gZmVhdHVyZSA9IGdlb2pzb24gZmVhdHVyZVxuICBzdGF0aWMgdG9nZ2xlU2VsZWN0ZWRGZWF0dXJlKGZlYXR1cmUpIHtcbiAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnNlbGVjdGVkID09PSAwKSB7XG4gICAgICBmZWF0dXJlLnByb3BlcnRpZXMuc2VsZWN0ZWQgPSAxOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGZlYXR1cmUucHJvcGVydGllcy5zZWxlY3RlZCA9IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG4gICAgcmV0dXJuIGZlYXR1cmU7XG4gIH1cblxuICAvLyBzZXRzIHRoZSBzZWxlY3RlZCBmZWF0dXJlIGluIHN0YXRlID4gMCB3aGVuIHNlbGVjdGVkXG4gIC8vICAgIDAgd2hlbiBzZWxlY3RlXG4gIC8vXG4gIC8vIEBwYXJhbSBpZCA9IG51bWJlciB3aGljaCByZXByZXNlbnRzIHRoZSBmZWF0dXJlIGlkXG4gIC8vIEByZXR1cm4gbnVsbFxuICBzdGF0aWMgc3RvcmVTZWxlY3RlZEZlYXR1cmUoaWQpIHtcbiAgICBjb25zdCBncmlkTmFtZSA9ICdncmlkLWJveC0nO1xuICAgIC8vIHplcm8gb3V0IFwidG9nZ2xlIG9mZlwiIGlmIGdyaWQgaWQgZXhpc3RzIHN0YXRlIGl0ZW1cbiAgICBpZiAoc3RvcmUuZ2V0U3RhdGVJdGVtKGAke2dyaWROYW1lfSR7aWR9YCkgPiAwKSB7XG4gICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYCR7Z3JpZE5hbWV9JHtpZH1gLCAwKTtcbiAgICAvLyBhZGQgXCJ0b2dnbGUgb25cIiBpZiAgc3RhdGUgaXRlbSA+IDAgb3Igbm90IHNlbGVjdGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShgJHtncmlkTmFtZX0ke2lkfWAsIE51bWJlcihpZCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIG1ha2VzIHRoZSBzZWxlY3RlZCBmZWF0dXJlIGEgbmV3IGZlYXR1cmUgY29sbGVjdGlvblxuICAvL1xuICAvLyBAcGFyYW0gZmVhdHVyZSA9IGdlb2pzb24gZmVhdHVyZSAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uIChmcm9tIHR1cmYuanMpXG4gIHN0YXRpYyBtYWtlU2VsZWN0ZWRGZWF0dXJlR2VvSlNPTihmZWF0dXJlKSB7XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKFtwb2x5Z29uKGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIGZlYXR1cmUucHJvcGVydGllcyldKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZXMgdGhlIFNxdWFyZUdyaWRHZW9KU09OIGFmdGVyIG1lcmdpbmcgYW5kIHJlY29uY2lsaW5nXG4gIC8vICAgIHdpdGggdGhlIHNlbGVjdGVkIGZlYXV0dXJlc1xuICAvL1xuICAvLyBAcGFyYW0gc2VsZWN0ZWRGZWF0dXJlcyA9IGdlb2pzb24gZmVhdHVyZWNvbGxlY3RvbiByZXByZXNlbnRpbmcgdGhlIHNlbGVjdGVkXG4gIC8vICAgICAgICBmZWF0dXJlcyAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uIChmcm9tIHR1cmYuanMpXG4gIHN0YXRpYyB1cGRhdGVTcXVhcmVHcmlkV2l0aFNlbGVjdGVkRmVhdHVyZXMoc2VsZWN0ZWRGZWF0dXJlcykge1xuICAgIGNvbnN0IGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICBjb25zdCBjdXJyZW50RmVhdHVyZUlkcyA9IHNlbGVjdGVkRmVhdHVyZXMuZmVhdHVyZXMubWFwKGZlYXR1cmUgPT4gZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oc2VsZWN0ZWRGZWF0dXJlcy5mZWF0dXJlcy5jb25jYXQoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OLmZlYXR1cmVzLmZpbHRlcihmZWF0dXJlID0+ICFjdXJyZW50RmVhdHVyZUlkcy5pbmNsdWRlcyhmZWF0dXJlLnByb3BlcnRpZXMuaWQpKSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICAvLyB1cGRhdGVzIHN0YXRlIHdpdGggdGhlIG5ldyB2ZXJzaW9uIG9mIFNxdWFyZUdyaWRHZW9KU09OXG4gIC8vICAgIGNvbnRhaW5zIHNlbGVjdGVkIGZlYXR1cmVzIGFsc28gKGlmIGFueSBzZWxlY3RlZClcbiAgLy9cbiAgLy8gQHBhcmFtIE5ld1NxdWFyZUdyaWRHZW9KU09OID0gZ2VvanNvbiBmZWF0dXJlY29sbGVjdG9uIHJlcHJlc2VudGluZ1xuICAvLyAgICAgICAgICAgICAgICB0aGUgbmV3IGZlYXR1cmVzIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gbnVsbFxuICBzdG9yZVNxdWFyZUdyaWQoTmV3U3F1YXJlR3JpZEdlb0pTT04pIHtcbiAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gTmV3U3F1YXJlR3JpZEdlb0pTT047XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIE5ld1NxdWFyZUdyaWRHZW9KU09OKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZpdE15Qm91bmRzKG1hcCkge1xuICAgIGNvbnN0IG1hcFZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJyk7XG4gICAgY29uc3QgbWFwU2V0dXAgPSB0aGlzLm1hcENoYW5nZUxheWVycy5sYXllcnNbbWFwVmVyc2lvbl07XG4gICAgY29uc3QgYm91bmRzID0gbWFwU2V0dXBbMF0ubWF4Ym91bmRzO1xuICAgIG1hcC5maXRCb3VuZHMoYm91bmRzLCB7IHBhZGRpbmc6IDEwMCB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgZGF0YXBpID0gJ2h0dHBzOi8vc2NyaXB0Lmdvb2dsZS5jb20vbWFjcm9zL3MvQUtmeWNieFJQOVBWQ1NKN1lvNF9YWXRxa3p1U3BIZjBjT0FuMW5vRktqZHFuZmZCZlMyWkV6dy9leGVjJztcblxuZXhwb3J0IGNsYXNzIFJlY29yZFN0dWR5RGF0YSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9vID0ge307XG4gICAgdGhpcy5kYXRhcGkgPSBkYXRhcGk7XG4gIH1cblxuICBzZXRFdmVudChhY3Rpb24gPSAnJywgY2F0ZWdvcnkgPSAnJywgbGFiZWwgPSAnJywgdmFsdWUgPSAwKSB7XG4gICAgLy8gZ2V0IHZhcnJpYWJsZXMgZm9yXG4gICAgdGhpcy51dWlkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJykudG9TdHJpbmcoKTtcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgdGhpcy5kYXRhID0gbGFiZWw7XG4gICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuXG4gICAgLy8gc3R1ZHkgdG8gSlNPTlxuICAgIGNvbnN0IGpzb25kYXRhID0ge1xuICAgICAgdXVpZDogdGhpcy51dWlkLFxuICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICBkYXRlOiB0aGlzLmRhdGVcbiAgICB9O1xuXG4gICAgY29uc3QgZGF0YUFQSVVSTCA9IG5ldyBVUkwodGhpcy5kYXRhcGkpO1xuICAgIGRhdGFBUElVUkwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhqc29uZGF0YSk7XG4gICAgZmV0Y2goZGF0YUFQSVVSTCk7XG4gIH1cblxuICBzZXRFdmVudEFsbChqc29uZGF0YSA9IHt9KSB7XG4gICAgY29uc3QgZGF0YUFQSVVSTCA9IG5ldyBVUkwodGhpcy5kYXRhcGkpO1xuICAgIGRhdGFBUElVUkwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhqc29uZGF0YSk7XG4gICAgZmV0Y2goZGF0YUFQSVVSTCk7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCB7IFN0b3JhZ2VBUEkgfSBmcm9tICcuL2xvY2FsU3RvcmFnZUFQSSc7XG5cbi8qKlxuKiBUaGlzIGNvbXBvbmVudCBpcyBpbnRlbmRlZCB0byBoYW5kbGUgdGhlIHN0b3JhZ2UgYW5kIHJldHJpZXZhbCBvZiB0aGUgc3RhdGUgb2ZcbiogQXMgb2YgdGhpcyB3cml0aW5nIGl0IGlzIHVzaW5nIGxvY2FsU3RvcmFnZSB0byBkbyB0aGlzLlxuKiBVc2VzIHNpbXBsZSBjbGFzcyBpbnN0YW5jZSBtZXRob2RzIHdpdGggdGhlIHNob3J0LWhhbmQgbWV0aG9kIGRlY2xhcmF0aW9uXG4qIHBhdHRlcm4uXG4qXG4qIFRvIG5vdGU6IFRoZXJlIGlzIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBTdG9yZSBhbmQgdGhlIFN0YXRlLiBBcyBvZiAwYTMxMDZlXG4qIHRoZSBTdG9yZSBpcyBhIFN0cmluZyBzYXZlZCB0byB0aGUgYnJvd3NlcnMgbG9jYWxTdG9yYWdlIGFuZCBpcyBhIHNlcmlhbGl6ZWRcbiogdmVyc2lvbiBvZiB0aGUgU3RhdGUuIFRoZSBTdGF0ZSBpcyBhbiBPYmplY3Qgd2hpY2ggaXMgaW50ZXJhY3RlZCB3aXRoIGJ5XG4qIHBhcnNpbmcgdGhlIFN0YXRlIHN0cmluZyBmcm9tIHRoZSBTdG9yZSwgbW9kaWZ5aW5nIHRoZSByZXN1bHRzIG9mIHRoZSBwYXJzZSxcbiogYW5kIHJlLXNlcmlhbGl6aW5nIGl0IGJhY2sgdG8gdGhlIFN0b3JlLlxuKi9cbmNvbnN0IFNUQVRFX0tFWSA9ICdzdGF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gIC8vIC4uYW5kIGFuIChvcHRpb25hbCkgY3VzdG9tIGNsYXNzIGNvbnN0cnVjdG9yLiBJZiBvbmUgaXNcbiAgLy8gbm90IHN1cHBsaWVkLCBhIGRlZmF1bHQgY29uc3RydWN0b3IgaXMgdXNlZCBpbnN0ZWFkOlxuICAvLyBjb25zdHJ1Y3RvcigpIHsgfVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgLy8gdGhpcy5zdG9yZSA9IG5ldyBTdG9yYWdlQVBJKCk7XG4gICAgaWYgKFN0b3JlLnN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5zdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IFNUQVRFX0tFWSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNldHMgYSBrZXkvdmFsdWUgcGFpciB0byB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZUl0ZW0oa2V5ID0gJycsIHZhbHVlID0gJycpIHtcbiAgICBjb25zdCBzdG9yZU9iaiA9IHsgW2tleV06IHZhbHVlIH07XG4gICAgY29uc3QgbmV3U3RhdGVPYmogPSB7IC4uLnRoaXMuZ2V0U3RhdGUoKSwgLi4uc3RvcmVPYmogfTtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlT2JqKTtcbiAgICByZXR1cm4gbmV3U3RhdGVPYmo7XG4gIH1cblxuICAvLyBEZWxldGUgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vICEvLyBXQVJOSU5HOiBvbmx5IGRvZXMgYSBzaGFsbG93IGRlbGV0ZVxuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGRlbGV0ZVN0YXRlSXRlbShrZXkgPSAnJykge1xuICAgIGNvbnN0IHN0b3JlT2JqID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgIGRlbGV0ZSBzdG9yZU9ialtrZXldO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RvcmVPYmopO1xuICAgIHJldHVybiBzdG9yZU9iajtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIGVudGlyZSBzdGF0ZSBvYmplY3RcbiAgLy9cbiAgLy8gQHJldHVybiBvYmplY3RcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpID8gSlNPTi5wYXJzZSh0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSkgOiB7fTtcbiAgfVxuXG4gIC8vIEdldHMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0SXRlbShrZXkgPSAnJykge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0l0ZW0oa2V5KSA/IHRoaXMuZ2V0U3RhdGUoKVtrZXldIDoge307XG4gIH1cblxuICAvLyBTZXRzIGEgbmV3IHN0YXRlIG9iamVjdCBzdGF0ZVxuICAvL1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGUodmFsdWUgPSB7fSkge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFNUQVRFX0tFWSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgPyBKU09OLnBhcnNlKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKSA6IHt9O1xuICB9XG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBzdGF0ZSBleGlzdHMgaW4gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgY2hlY2tTdGF0ZUV4aXN0cygpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSk7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBzdGF0ZSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyXG4gIC8vXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldFN0YXRlQXNTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW4gaXRlbSBoYXMgYmVlbiBzYXZlZCB0byB0aGUgc3RvcmVcbiAgLy8gdW51c2VkIGFzIG9mIDBhMzEwNmVcbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGlzU3RhdGVJdGVtRXhpc3QoaXRlbSkge1xuICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSkge1xuICAgICAgY29uc3Qgc3RhdGVTdHIgPSB0aGlzLmdldFN0YXRlQXNTdHJpbmcoKTtcbiAgICAgIGlmIChzdGF0ZVN0ci5pbmRleE9mKGl0ZW0pID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGNoZWNrSXRlbShpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpICYmIHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpLmluZGV4T2YoaXRlbSkgPiAwO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIGF2YWlsYWJsZS5cbiAgLy8gVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX1N0b3JhZ2VfQVBJL1VzaW5nX3RoZV9XZWJfU3RvcmFnZV9BUElcbiAgLy9cbiAgLy8gQHJldHVybiBib29sZWFuXG4gIHN0YXRpYyBzdG9yYWdlQXZhaWxhYmxlKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnbG9jYWxTdG9yYWdlJztcbiAgICBsZXQgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICBzdG9yYWdlLmxlbmd0aCAhPT0gMDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcblxuZXhwb3J0IGNsYXNzIFV0aWxpdHkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvbyA9IHt9O1xuICAgIHRoaXMuY2hlY2sgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGNoZWNrcyBpcyBKYXZhc2NyaXB0IG9iamVjdCBpcyBhIHZhbGlkIG9iamVjdFxuICAvL1xuICAvLyBAcGFyYW0gb2JqIC0gb2JqZWN0XG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBjaGVja1ZhbGlkT2JqZWN0KG9iaikge1xuICAgIHRoaXMub2JqID0gb2JqO1xuICAgIGlmICh0aGlzLm9iaiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMub2JqID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5vYmogPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5vYmogPT09ICdzdHJpbmcnICYmIHRoaXMub2JqLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gY3JlYXRlcyBhIHV1aWRcbiAgLy9cbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgdXVpZCgpIHtcbiAgICB0aGlzLmNyeXB0byA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDQpKS5qb2luKCctJyk7XG4gICAgcmV0dXJuIHRoaXMuY3J5cHRvO1xuICB9XG5cbiAgLy8gY2hlY2tzIGlmIGN1cnJlbnQgZGV2aWNlIGlzIGEgbW9iaWxlXG4gIC8vXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBpc01vYmlsZURldmljZSgpIHtcbiAgICB0aGlzLmNoZWNrID0gZmFsc2U7XG4gICAgKGZ1bmN0aW9uKGEpe2lmKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSByZXR1cm4gdHJ1ZTt9KShuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHx3aW5kb3cub3BlcmEpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIHRoaXMuY2hlY2s7XG4gIH1cblxuICAvLyBjaGVja3MgaHRtbCBhcyBhIHRlbXBsYXRlL2Jsb2NrXG4gIC8vXG4gIC8vIEBwYXJhbSBwbGFjZUhvbGRlckVsZW1lbnRJRCAtIEhUTUwgZWxlbWVudCBJRCB0aGF0IHdpbGwgaG9sZCB0aGUgdGVtcGxhdGVcbiAgLy8gQHBhcmFtIHRlbXBsYXRlIC0gSFRNTCBjb250ZW50XG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBsb2FkSFRNTEJsb2NrKHBsYWNlSG9sZGVyRWxlbWVudElELCB0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGFjZUhvbGRlckVsZW1lbnRJRCk7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGVtcGxhdGUgZXhzaXN0c1xuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgaWYgKGNvbXBvbmVudEVsZW0gIT0gbnVsbCkge1xuICAgICAgICBjb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2htbC1ibG9jay1sb2FkZWQnLCBwbGFjZUhvbGRlckVsZW1lbnRJRCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdobWwtYmxvY2stdW5sb2FkZWQnLCBwbGFjZUhvbGRlckVsZW1lbnRJRCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvYWQgdGVtcGxhdGUgaW50byBwbGFjZWhvbGRlciBlbGVtZW50XG4gICAgICAgIGNvbXBvbmVudEVsZW0uaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gdHJpZ2dlcnMgYSBkb20gZXZlbnRcbiAgLy9cbiAgLy8gQHBhcmFtIGV2ZW50TmFtZSAtIHN0cmluZyBldmVudCBuYW1lIGZvciBhIGxpc3RuZXIgdG8gbGlzdGVuIHRvb1xuICAvLyBAcGFyYW0gZGV0YWlsIC0gb2JqZWN0IGRldGFpbHMgZm9yIGV2ZW50XG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICB0cmlnZ2VyRXZlbnQoZXZlbnROYW1lLCBkZXRhaWwpIHtcbiAgICB0aGlzLmV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsIH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQodGhpcy5ldmVudCk7XG4gIH1cblxuICAvLyBpdGVyYXRlcyB4IG51bWJlciBvZiBpdGVyYXRpb25zIGFuZCBzZXRzXG4gIC8vICAgIHN1cyBxdWVzdGlvbnMgdG9wIHN0YXRlXG4gIC8vXG4gIC8vIEBwYXJhbSBldmVudE5hbWUgLSBzdHJpbmcgZXZlbnQgbmFtZSBmb3IgYSBsaXN0bmVyIHRvIGxpc3RlbiB0b29cbiAgLy8gQHBhcmFtIGRldGFpbCAtIG9iamVjdCBkZXRhaWxzIGZvciBldmVudFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc2V0RG9tU3RhdGVGb3JHcm91cChzdGF0ZXRleHQsIGl0ZXJhdGlvbnMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHN0b3JlLmdldFN0YXRlSXRlbShgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWAsIDApO1xuICAgIGNvbnN0IGJ0blByZWZpeCA9IGBidG4tc3VzLXEke2l0ZXJhdGlvbnN9LWA7XG4gICAgY29uc3QgYWdncmVtZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2J0blByZWZpeH0ke3ZhbHVlfWApO1xuICAgIGlmIChhZ2dyZW1lbnRFbGVtZW50KSB7XG4gICAgICBhZ2dyZW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIGlmIChpdGVyYXRpb25zID4gMCkge1xuICAgICAgY29uc3QgbmV4dEl0ZXJhdGlvbiA9IGl0ZXJhdGlvbnMgLSAxO1xuICAgICAgdGhpcy5zZXREb21TdGF0ZUZvckdyb3VwKHN0YXRldGV4dCwgbmV4dEl0ZXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLy8gaXRlcmF0ZXMgeCBudW1iZXIgb2YgaXRlcmF0aW9ucyBhbmQgd3JpdGVzIGFcbiAgLy8gYSBkZWZhdWx0IHplcm8gdmFsdWUgc3RhdGUga2V5XG4gIC8vXG4gIC8vIEBwYXJhbSBldmVudE5hbWUgLSBzdHJpbmcgZXZlbnQgbmFtZSBmb3IgYSBsaXN0bmVyIHRvIGxpc3RlbiB0b29cbiAgLy8gQHBhcmFtIGRldGFpbCAtIG9iamVjdCBkZXRhaWxzIGZvciBldmVudFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc2V0U3RhdGVGb3JHcm91cChzdGF0ZXRleHQsIGl0ZXJhdGlvbnMpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gKSkpIHtcbiAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWAsIDApO1xuICAgIH1cbiAgICBpZiAoaXRlcmF0aW9ucyA+IDApIHtcbiAgICAgIGNvbnN0IG5leHRJdGVyYXRpb24gPSBpdGVyYXRpb25zIC0gMTtcbiAgICAgIHRoaXMuc2V0U3RhdGVGb3JHcm91cChzdGF0ZXRleHQsIG5leHRJdGVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGl0ZXJhdGVzIHggbnVtYmVyIG9mIGl0ZXJhdGlvbnMgYW5kIHdyaXRlcyB0byB0aGUgQVBJXG4gIC8vXG4gIC8vIEBwYXJhbSBldmVudE5hbWUgLSBzdHJpbmcgZXZlbnQgbmFtZSBmb3IgYSBsaXN0bmVyIHRvIGxpc3RlbiB0b29cbiAgLy8gQHBhcmFtIGRldGFpbCAtIG9iamVjdCBkZXRhaWxzIGZvciBldmVudFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc2V0QVBJRm9yR3JvdXAoc3RhdGV0ZXh0LCBpdGVyYXRpb25zLCB2YWx1ZUFycmF5ID0gW10pIHtcbiAgICBjb25zdCBrZXkgPSBgJHtzdGF0ZXRleHR9JHtpdGVyYXRpb25zfWA7XG4gICAgY29uc3QgdmFsdWUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gKTtcbiAgICAvLyBjYXB0dXJlIGluIGFycmF5IHNvIHdlIGNhbiB3cml0ZSBjb21wbHRlZCBhcnJheSB0byBhcGlcbiAgICB2YWx1ZUFycmF5LnB1c2goeyBrZXksIHZhbHVlIH0pO1xuICAgIGlmIChpdGVyYXRpb25zID4gMCkge1xuICAgICAgY29uc3QgbmV4dEl0ZXJhdGlvbiA9IGl0ZXJhdGlvbnMgLSAxO1xuICAgICAgdGhpcy5zZXRBUElGb3JHcm91cChzdGF0ZXRleHQsIG5leHRJdGVyYXRpb24sIHZhbHVlQXJyYXkpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIHdyaXRlIGNvbXBsdGVkIGFycmF5IHRvIGFwaVxuICAgIC8vIHJlY29yZFN0dWR5RGF0YS5zZXRFdmVudCgnZGF0YScsICdncmlkYW5zd2VycycsIEpTT04uc3RyaW5naWZ5KHZhbHVlQXJyYXkpKTtcbiAgICBjb25zdCBkYXRlc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkLXN1Ym1pdGVkJywgdHJ1ZSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkYW5zd2VycycsIHZhbHVlQXJyYXkpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMtdGltZScsIGRhdGVzdGFtcCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyB1bnNlbGVjdHMgcGxheS9wYXVzZSBzdG9wIGJ1dHRvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIHBhZ2UgLSBzdHJpbmcgcGFnZSB0byBwbGF5IGNvbXBsZXRlZCwgbWFwXG4gIC8vIEByZXR1cm4gbnVsbFxuICB1bnNldFBsYXlCdXR0b25zKHBhZ2UgPSAnY29tcGxldGVkJywgZG9TdG9wID0gZmFsc2UpIHtcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIGNvbnN0IHBsYXlFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGFnZX0tcGxheWApO1xuICAgIGlmIChwbGF5RWxlbWVudCkge1xuICAgICAgcGxheUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgY29uc3QgcGF1c2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cGFnZX0tcGF1c2VgKTtcbiAgICBpZiAocGF1c2VFbGVtZW50KSB7XG4gICAgICBwYXVzZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgY29uc3Qgc3RvcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwYWdlfS1zdG9wYCk7XG4gICAgaWYgKGRvU3RvcCkge1xuICAgICAgaWYgKHN0b3BFbGVtZW50KSB7XG4gICAgICAgIHN0b3BFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9