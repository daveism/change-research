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
/******/ 	var hotCurrentHash = "499ea5e429157366f92e";
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

module.exports = "<div id=\"study-progress-end\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100\">Whats Changed?</div>\n  <div id=\"step1-directions\" class=\"step-directions w-100\">\n    Thanks for participating!\n  </div>\n\n  <div id=\"map-holder-end\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-end\" class=\"row h-100 justify-content-center\">\n      <div class=\"col-12 complete-map-n-description d-flex dualmaps\">\n\n        <span class=\"w-100\" >\n          Your answer\n        </span>\n      </div>\n\n      <div class=\"col-12 complete-map-n-description d-flex dualmaps\">\n        <div id=\"map-enda\" class=\"my-3 mx-0 mx-sm-0 mx-med-3 map-enda\"></div>\n      </div>\n\n      <div class=\"col-12 complete-map-n-description d-flex dualmaps\">\n        <span class=\"w-100\" >\n          Our answer\n        </span>\n      </div>\n\n      <div class=\"col-12 complete-map-n-description d-flex dualmaps\">\n        <div id=\"map-endb\" class=\"my-3 mx-0 mx-sm-0 mx-med-3 map-endb\"></div>\n      </div>\n\n    </div>\n  </div>\n\n</div>\n";

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

module.exports = "<div id=\"study-progress-map-1\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Review the two maps and click on any box where you believe change occurred.\n  </div>\n\n  <div id=\"map-holder-2\" class=\"start-map w-100 d-flex ml-3 mt-3\">\n    <div id=\"map-inner-holder-2\" class=\"row h-100 justify-content-center\">\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2a\" class=\"my-3 mx-0 mx-sm-0 mx-med-3 map-2a\"></div>\n      </div>\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2b\" class=\"my-3 mx-0 mx-sm-0 mx-med-3 map-2b\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-3\">\n    <button id=\"submit-button-to-sus-1\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-3.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-3.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-2\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Review the map using the horizontal bar by dragging the bar side to side to\n    reveal what’s changed. Then click on any box where you believe change\n    occurred between the two maps.\n  </div>\n\n  <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center\">\n      <div id='compare-wrapper'>\n        <div id=\"map-3a\" class=\"my-3 mx-3\"></div>\n        <div id=\"map-3b\" class=\"my-3 mx-3\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer to areas that have changed.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-3\">\n    <button id=\"submit-button-to-sus-2\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-sus.html":
/*!*************************************************!*\
  !*** ./src/content-blocks/block-study-sus.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-sus\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 3 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Review the map and the animation of the two images. Then click on any\n    box where you believe change occurred. 1 indicates you strongly disagree\n    and 5 indicates you strongly aggree.\n  </div>\n\n  <div class=\"pl-1 pt-3 pb-3\">\n    &nbsp;\n  </div>\n\n  <!-- <div class=\"row w-100 p-3 m-3\">\n\n    <div class=\"sus-describer-lead col-6\">\n      &nbsp\n    </div>\n\n    <div class=\"sus-describer-agree text-left col-3\">\n        Strongly disagree\n    </div>\n\n    <div class=\"sus-describer-disagree text-right col-3\">\n        Strongly agree\n    </div>\n\n  </div> -->\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        1.&nbsp;&nbsp;I think that I would like to use this site frequently\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-1\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q1-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q1-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q1-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q1-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q1-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        2.&nbsp;&nbsp;I found the site unnecessarily complex\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-2\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q2-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q2-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q2-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q2-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q2-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        3.&nbsp;&nbsp;I thought the site was easy to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-3\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q3-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q3-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q3-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q3-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q3-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        4.&nbsp;&nbsp;I think that I would need the support of a technical person to be able to use this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-4\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q4-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q4-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q4-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q4-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q4-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        5.&nbsp;&nbsp;I found the various functions in this site were well integrated\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-5\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q5-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q5-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q5-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q5-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q5-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        6.&nbsp;&nbsp;I thought there was too much inconsistency in this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-6\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q6-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q6-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q6-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q6-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q6-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        7.&nbsp;&nbsp;I would imagine that most people would learn to use this site very quickly\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-7\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q7-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-replace-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-replace-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-replace-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-replace-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        8.&nbsp;&nbsp;I found the site very cumbersome to use\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-8\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q8-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q8-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q8-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q8-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q8-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-odd\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        9.&nbsp;&nbsp;I felt very confident using the site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-9\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q9-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q9-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q9-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q9-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q9-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-auto mt-2 pl-1 pr-1 pt-3 pb-3 sus-even\">\n    <div class=\"col-12 col-sm-7 col-md-8\">\n      <div id=\"step1-directions\" class=\"step-directions\">\n        10.&nbsp;&nbsp;I needed to learn a lot of things before I could get going with this site\n      </div>\n    </div>\n\n    <div class=\"pb-md-0 pb-sm-0 pb-2 pt-md-0 pt-sm-0 pt-2 col-12 col-sm-5 col-md-4\"  >\n      <div class=\"btn-toolbar\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n        <div id=\"btn-group-sus-10\" class=\"btn-group mr-2\" role=\"group\" aria-label=\"First group\">\n          <button id=\"btn-sus-q10-1\" type=\"button\" class=\"btn btn-secondary\">1</button>\n          <button id=\"btn-sus-q10-2\" type=\"button\" class=\"btn btn-secondary\">2</button>\n          <button id=\"btn-sus-q10-3\" type=\"button\" class=\"btn btn-secondary\">3</button>\n          <button id=\"btn-sus-q10-4\" type=\"button\" class=\"btn btn-secondary\">4</button>\n          <button id=\"btn-sus-q10-5\" type=\"button\" class=\"btn btn-secondary\">5</button>\n        </div>\n      </div>\n\n      <div class=\"row pt-2\">\n        <div class=\"col-6\">\n          <span class=\"sus-describer-disagree-sm d-flex text-left\">Strongly disagree</span>\n        </div>\n        <div class=\"col-5\">\n          <span class=\"sus-describer-disagree-sm d-flex text-right\">Strongly agree</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row w-100 d-flex mt-4\">\n    <div class=\"pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-7\">\n      &nbsp;\n    </div>\n    <div class=\"pt-sm-2 pt-md-0 col-12 col-sm-12 col-md-5\">\n      <button id=\"submit-button-to-end\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Please search for location and draw a circle first!\">\n        Submit and finish\n      </button>\n    </div>\n  </div>\n\n</div>\n";

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
    this.studyAggreementElementsRemove = ['study-agreement-all'];

    // study disaggreement
    this.studyDisaggreementElementsAdd = ['study-dissaggree'];
    this.studyDisaggreementElementsRemove = ['study-agreement-all'];

    // study questions map change
    this.studyQuestionElementsAdd = ['study-progress-sus', 'block-study-sus-holder'];
    this.studyQuestionElementsRemove = ['study-progress-map-0', 'study-progress-map-1', 'study-progress-map-2', 'map-action-holder'];

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
          recordStudyData.setEvent('data', 'susanswers', JSON.stringify(susValueArray));
          store.setStateItem('susanswers', susValueArray);
        });
      }

      return null;
    }

    // adds handler for aggreeing to do study
    //
    // @param null
    // @return null

  }, {
    key: 'addHandlerAgreeClick',
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
          store.setStateItem('study-agreement-date', agreementTimeStamp);
          recordStudyData.setEvent('data', 'study-agreement', true);
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
          store.setStateItem('study-agreement-date', agreementTimeStamp);
          recordStudyData.setEvent('data', 'study-agreement', false);
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

var _recordStudyData = __webpack_require__(/*! ./record-study-data */ "./src/scripts/record-study-data.js");

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

var store = new _store.Store({}); // import dependencies
// TODOS
//   record data at end so its all in one row.... store it in store then get each element
//    record progress in state so when particpatant comes back or hist back button
//            they are back at state they left the study ---- this really has to happen sine
//            G limits writes...  maybe put answer grid into an array
//    MIGHT NOT BE ABLE TO DO THIS
//
// add change maps
// completed needs expected map so people can see how they did
// figure out how only load and initailze maps needed.
//      not all at the start so there is less lag at start
// On the completed map disable map click of adding removing selecte grids
// Back to grid button when on sus? maybe or use navgo to create page
// play pause on animation

var recordStudyData = new _recordStudyData.RecordStudyData();
var mapBoxConfig = new _mapConfig.MapBoxConfig();
var utility = new _utility.Utility();
var handlers = new _handlers.Handlers();

if (!utility.checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', utility.uuid().toString());
}

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas, _freeRegularSvgIcons.far);
_fontawesomeSvgCore.dom.watch();

// load all html blocks
utility.loadHTMLBlock('block-study-aggreement-holder', _blockStudyAggreement2.default);
utility.loadHTMLBlock('block-study-dissaggree-holder', _blockStudyDissaggree2.default);
utility.loadHTMLBlock('block-study-question-1-holder', _blockStudyQuestion2.default);
utility.loadHTMLBlock('block-study-question-2-holder', _blockStudyQuestion4.default);
utility.loadHTMLBlock('block-study-question-3-holder', _blockStudyQuestion6.default);
utility.loadHTMLBlock('block-study-sus-holder', _blockStudySus2.default);
utility.loadHTMLBlock('block-study-completed-holder', _blockStudyCompleted2.default);

// create all the mapbox map objects
var map1 = mapBoxConfig.makeAnimateMap('map-1', 0);
var map2a = mapBoxConfig.makeMap('map-2a', 0);
var map2b = mapBoxConfig.makeMap('map-2b', 1);
var map3Arr = mapBoxConfig.makeCompareMap('map-3a', 'map-3b', 'compare-wrapper');
var mapEnda = mapBoxConfig.makeMap('map-enda', 0);
var mapEndb = mapBoxConfig.makeMap('map-endb', 1);

// create mapbox navigation control instance
var nav = mapBoxConfig.addNav();

// add navigatio to maps
// I may not need this if I do not let user zoom/pan
map1.addControl(nav, 'top-left');
map2a.addControl(nav, 'top-left');
map2b.addControl(nav, 'top-left');
map3Arr[0].addControl(nav, 'top-left');
map3Arr[1].addControl(nav, 'top-left');
mapEnda.addControl(nav, 'top-left');
mapEndb.addControl(nav, 'top-left');

// sync maps
mapBoxConfig.synMaps(map2a, map2b);
mapBoxConfig.synMaps(mapEnda, mapEndb);

// study constraints number of questions starts with 0
var studyMinOne = 0;
var studyMaxOne = 2;
var studyVersion = Math.floor(Math.random() * (studyMaxOne - studyMinOne + 1) + studyMinOne);
store.setStateItem('study-question', studyVersion);
recordStudyData.setEvent('data', 'study-question', studyVersion);

// study constraints number of questions starts with 0
var mapMinOne = 0;
var mapMaxOne = 2;
var mapVersion = Math.floor(Math.random() * (mapMaxOne - mapMinOne + 1) + mapMinOne);
store.setStateItem('map-version', mapVersion);
recordStudyData.setEvent('data', 'map-version', mapVersion);

// // TODO only deal with map for study question
// // only load html block needed map objects will have generic names also
function resizeAllMaps() {
  map1.resize();
  map2a.resize();
  map2b.resize();
  map3Arr[0].resize();
  map3Arr[1].resize();
  mapEnda.resize();
  mapEndb.resize();
}

document.addEventListener('aggree-clicked', function () {
  resizeAllMaps();
});

document.addEventListener('disaggree-clicked', function () {
  resizeAllMaps();
});

var urlString = window.location.href;
var url = new URL(urlString);
var campaign = url.searchParams.get('campaign');

// ga event action, category, label
recordStudyData.setEvent('data', 'study started', 'true');

// ga event action, category, label
recordStudyData.setEvent('data', 'campaign', campaign);

// ga event action, category, label
recordStudyData.setEvent('data', 'mobile', utility.isMobileDevice());

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
  map1.getSource('change-grid').setData(currentSquareGridGeoJSON);
  map2a.getSource('change-grid').setData(currentSquareGridGeoJSON);
  map2b.getSource('change-grid').setData(currentSquareGridGeoJSON);
  map3Arr[0].getSource('change-grid').setData(currentSquareGridGeoJSON);
  map3Arr[1].getSource('change-grid').setData(currentSquareGridGeoJSON);
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var syncMove = __webpack_require__(/*! @mapbox/mapbox-gl-sync-move */ "./node_modules/@mapbox/mapbox-gl-sync-move/index.js");

var store = new _store.Store({});
var utility = new _utility.Utility();

var MapBoxConfig = exports.MapBoxConfig = function () {
  function MapBoxConfig() {
    _classCallCheck(this, MapBoxConfig);

    this.defaultMapStyle = 'mapbox://styles/mapbox/streets-v11';
    this.defaultMapCenter = [-82.570, 35.560]; // starting position [lng, lat]
    this.defaultMapZoom = 10; // starting zoom
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
    this.squareGridGeoJSON = _squareGridGeojson2.default;
    this.mapChangeLayersOne = ['https://daveism.github.io/change-research/dist/maps/nlcd-2016-30/{z}/{x}/{y}.png', 'https://daveism.github.io/change-research/dist/maps/nlcd-2001-30/{z}/{x}/{y}.png'];
    store.setStateItem('squareGridGeoJSON', this.squareGridGeoJSON);
  }

  // Sets an individual mapbox map test
  //
  // @param mapContainer - string
  // @return new mapbox map object


  _createClass(MapBoxConfig, [{
    key: 'makeMap',
    value: function makeMap() {
      var _this = this;

      var mapContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultMapContainer;
      var mapIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var map = new this.mapboxgl.Map({
        container: mapContainer,
        style: this.lightMapStyle,
        center: this.defaultMapCenter,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true
      });

      map.on('load', function (e) {
        map.addLayer(MapBoxConfig.makeTMSLayer(_this.mapChangeLayersOne, mapIndex));
        map.addLayer(_this.makeGridOutLineLayer());
        map.addLayer(_this.makeGridLayer());
        _this.addGridClick(map);
        map.resize();
      });

      window.onload = function (e) {
        map.resize();
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

      var map = new this.mapboxgl.Map({
        container: mapContainer,
        style: this.lightMapStyle,
        center: this.defaultMapCenter,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true
      });

      map.on('load', function (e) {
        map.addLayer(MapBoxConfig.makeTMSLayer(_this2.mapChangeLayersOne, 0));
        map.addLayer(MapBoxConfig.makeTMSLayer(_this2.mapChangeLayersOne, 1));
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

      var beforeMap = new this.mapboxgl.Map({
        container: mapBeforeContainer,
        style: this.lightMapStyle,
        center: this.defaultMapCenter,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true
      });

      var afterMap = new this.mapboxgl.Map({
        container: mapAfterContainer,
        style: this.lightMapStyle,
        center: this.defaultMapCenter,
        zoom: this.defaultMapZoom,
        showZoom: true,
        touchEnabled: true,
        keybindings: true
      });
      var compare = new this.MapboxCompare(beforeMap, afterMap, '#' + mapCompareWrapperID);

      beforeMap.on('load', function (e) {
        beforeMap.addLayer(MapBoxConfig.makeTMSLayer(_this3.mapChangeLayersOne, 1));
        beforeMap.addLayer(_this3.makeGridOutLineLayer());
        beforeMap.addLayer(_this3.makeGridLayer());
        _this3.addGridClick(beforeMap);
        beforeMap.resize();
        compare.setSlider(150);
      });

      afterMap.on('load', function (e) {
        afterMap.addLayer(MapBoxConfig.makeTMSLayer(_this3.mapChangeLayersOne, 0));
        afterMap.addLayer(_this3.makeGridOutLineLayer());
        afterMap.addLayer(_this3.makeGridLayer());
        _this3.addGridClick(afterMap);
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
    key: 'synMaps',
    value: function synMaps(map1, map2) {
      // eslint-disable-line
      syncMove(map1, map2);
    }
  }, {
    key: 'makeGridLayer',


    // makes change grid layer on map
    //
    // @param null
    // @return null
    value: function makeGridLayer() {
      // {"_sw":{"lng":-82.69918436136798,"lat":35.5006993752381},
      // "_ne":{"lng":-82.43593385567635,"lat":35.61967467603169}
      // }
      // const bbox = [-82.650, 35.508 ,-82.485, 35.623]; // side to side fits small

      // uncomment if need to redoo the qrid
      // const bbox = [-82.650, 35.505 ,-82.485, 35.615];
      // const cellSide = 0.6;
      // const options = {units: 'miles'};
      // const squareGridGeoJSON = squareGrid(bbox, cellSide, options);
      // console.log('squareGridGeoJSON', JSON.stringify(squareGridGeoJSON))
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
  }], [{
    key: 'makeTMSLayer',
    value: function makeTMSLayer(mapChange, mapIndex) {
      return {
        id: 'map-change-' + mapIndex,
        type: 'raster',
        source: {
          type: 'raster',
          tiles: [mapChange[mapIndex]],
          minzoom: 1,
          maxzoom: 14,
          scheme: 'tms',
          tileSize: 256,
          bounds: [-82.647, -82.498, 35.507, 35.612]
        },
        paint: {
          'raster-fade-duration': 0
        }
      };
    }
  }, {
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

      var dataAPIURL = new URL(datapi);
      dataAPIURL.search = new URLSearchParams(jsondata);
      fetch(dataAPIURL);
    }
  }]);

  return RecordStudyData;
}();

/***/ }),

/***/ "./src/scripts/square-grid-geojson.json":
/*!**********************************************!*\
  !*** ./src/scripts/square-grid-geojson.json ***!
  \**********************************************/
/*! exports provided: type, name, features, default */
/***/ (function(module) {

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.63683762677812,35.61210336993178],[-82.62617029958149,35.61210336993178],[-82.62617029958149,35.60341947494315],[-82.62617029958149,35.59473557995452],[-82.63683762677812,35.59473557995452],[-82.64750495397475,35.59473557995452],[-82.64750495397475,35.60341947494315],[-82.64750495397475,35.61210336993178],[-82.63683762677812,35.61210336993178]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.63683762677812,35.59473557995452],[-82.62617029958149,35.59473557995452],[-82.62617029958149,35.586051684965895],[-82.62617029958149,35.57736778997727],[-82.63683762677812,35.57736778997727],[-82.64750495397475,35.57736778997727],[-82.64750495397475,35.586051684965895],[-82.64750495397475,35.59473557995452],[-82.63683762677812,35.59473557995452]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.56],[-82.64750495397475,35.56868389498864],[-82.64750495397475,35.57736778997727],[-82.63683762677812,35.57736778997727],[-82.62617029958149,35.57736778997727],[-82.62617029958149,35.56868389498864],[-82.62617029958149,35.56],[-82.63683762677812,35.56],[-82.64750495397475,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.54263221002275],[-82.64750495397475,35.55131610501138],[-82.64750495397475,35.56],[-82.63683762677812,35.56],[-82.62617029958149,35.56],[-82.62617029958149,35.55131610501138],[-82.62617029958149,35.54263221002275],[-82.63683762677812,35.54263221002275],[-82.64750495397475,35.54263221002275]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.525264420045495],[-82.64750495397475,35.533948315034124],[-82.64750495397475,35.54263221002275],[-82.63683762677812,35.54263221002275],[-82.62617029958149,35.54263221002275],[-82.62617029958149,35.533948315034124],[-82.62617029958149,35.525264420045495],[-82.63683762677812,35.525264420045495],[-82.64750495397475,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.64750495397475,35.50789663006824],[-82.64750495397475,35.51658052505687],[-82.64750495397475,35.525264420045495],[-82.63683762677812,35.525264420045495],[-82.62617029958149,35.525264420045495],[-82.62617029958149,35.51658052505687],[-82.62617029958149,35.50789663006824],[-82.63683762677812,35.50789663006824],[-82.64750495397475,35.50789663006824]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.59473557995452],[-82.62617029958149,35.60341947494315],[-82.62617029958149,35.61210336993178],[-82.61550297238486,35.61210336993178],[-82.60483564518823,35.61210336993178],[-82.60483564518823,35.60341947494315],[-82.60483564518823,35.59473557995452],[-82.61550297238486,35.59473557995452],[-82.62617029958149,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.5941683179916,35.61210336993178],[-82.58350099079497,35.61210336993178],[-82.58350099079497,35.60341947494315],[-82.58350099079497,35.59473557995452],[-82.5941683179916,35.59473557995452],[-82.60483564518823,35.59473557995452],[-82.60483564518823,35.60341947494315],[-82.60483564518823,35.61210336993178],[-82.5941683179916,35.61210336993178]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.59473557995452],[-82.58350099079497,35.60341947494315],[-82.58350099079497,35.61210336993178],[-82.57283366359835,35.61210336993178],[-82.56216633640172,35.61210336993178],[-82.56216633640172,35.60341947494315],[-82.56216633640172,35.59473557995452],[-82.57283366359835,35.59473557995452],[-82.58350099079497,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.59473557995452],[-82.56216633640172,35.60341947494315],[-82.56216633640172,35.61210336993178],[-82.55149900920509,35.61210336993178],[-82.54083168200846,35.61210336993178],[-82.54083168200846,35.60341947494315],[-82.54083168200846,35.59473557995452],[-82.55149900920509,35.59473557995452],[-82.56216633640172,35.59473557995452]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.53016435481183,35.61210336993178],[-82.5194970276152,35.61210336993178],[-82.5194970276152,35.60341947494315],[-82.5194970276152,35.59473557995452],[-82.53016435481183,35.59473557995452],[-82.54083168200846,35.59473557995452],[-82.54083168200846,35.60341947494315],[-82.54083168200846,35.61210336993178],[-82.53016435481183,35.61210336993178]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.5194970276152,35.59473557995452],[-82.5194970276152,35.60341947494315],[-82.5194970276152,35.61210336993178],[-82.50882970041857,35.61210336993178],[-82.49816237322194,35.61210336993178],[-82.49816237322194,35.60341947494315],[-82.49816237322194,35.59473557995452],[-82.50882970041857,35.59473557995452],[-82.5194970276152,35.59473557995452]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.5194970276152,35.57736778997727],[-82.5194970276152,35.586051684965895],[-82.5194970276152,35.59473557995452],[-82.50882970041857,35.59473557995452],[-82.49816237322194,35.59473557995452],[-82.49816237322194,35.586051684965895],[-82.49816237322194,35.57736778997727],[-82.50882970041857,35.57736778997727],[-82.5194970276152,35.57736778997727]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.57736778997727],[-82.49816237322194,35.57736778997727],[-82.49816237322194,35.56868389498864],[-82.49816237322194,35.56],[-82.50882970041857,35.56],[-82.5194970276152,35.56],[-82.5194970276152,35.56868389498864],[-82.5194970276152,35.57736778997727],[-82.50882970041857,35.57736778997727]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.56],[-82.49816237322194,35.56],[-82.49816237322194,35.55131610501138],[-82.49816237322194,35.54263221002275],[-82.50882970041857,35.54263221002275],[-82.5194970276152,35.54263221002275],[-82.5194970276152,35.55131610501138],[-82.5194970276152,35.56],[-82.50882970041857,35.56]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.54263221002275],[-82.49816237322194,35.54263221002275],[-82.49816237322194,35.533948315034124],[-82.49816237322194,35.525264420045495],[-82.50882970041857,35.525264420045495],[-82.5194970276152,35.525264420045495],[-82.5194970276152,35.533948315034124],[-82.5194970276152,35.54263221002275],[-82.50882970041857,35.54263221002275]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.50882970041857,35.525264420045495],[-82.49816237322194,35.525264420045495],[-82.49816237322194,35.51658052505687],[-82.49816237322194,35.50789663006824],[-82.50882970041857,35.50789663006824],[-82.5194970276152,35.50789663006824],[-82.5194970276152,35.51658052505687],[-82.5194970276152,35.525264420045495],[-82.50882970041857,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.525264420045495],[-82.60483564518823,35.525264420045495],[-82.60483564518823,35.51658052505687],[-82.60483564518823,35.50789663006824],[-82.61550297238486,35.50789663006824],[-82.62617029958149,35.50789663006824],[-82.62617029958149,35.51658052505687],[-82.62617029958149,35.525264420045495],[-82.61550297238486,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.50789663006824],[-82.60483564518823,35.51658052505687],[-82.60483564518823,35.525264420045495],[-82.5941683179916,35.525264420045495],[-82.58350099079497,35.525264420045495],[-82.58350099079497,35.51658052505687],[-82.58350099079497,35.50789663006824],[-82.5941683179916,35.50789663006824],[-82.60483564518823,35.50789663006824]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.50789663006824],[-82.58350099079497,35.51658052505687],[-82.58350099079497,35.525264420045495],[-82.57283366359835,35.525264420045495],[-82.56216633640172,35.525264420045495],[-82.56216633640172,35.51658052505687],[-82.56216633640172,35.50789663006824],[-82.57283366359835,35.50789663006824],[-82.58350099079497,35.50789663006824]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.55149900920509,35.525264420045495],[-82.54083168200846,35.525264420045495],[-82.54083168200846,35.51658052505687],[-82.54083168200846,35.50789663006824],[-82.55149900920509,35.50789663006824],[-82.56216633640172,35.50789663006824],[-82.56216633640172,35.51658052505687],[-82.56216633640172,35.525264420045495],[-82.55149900920509,35.525264420045495]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.50789663006824],[-82.54083168200846,35.51658052505687],[-82.54083168200846,35.525264420045495],[-82.53016435481183,35.525264420045495],[-82.5194970276152,35.525264420045495],[-82.5194970276152,35.51658052505687],[-82.5194970276152,35.50789663006824],[-82.53016435481183,35.50789663006824],[-82.54083168200846,35.50789663006824]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.57736778997727],[-82.62617029958149,35.586051684965895],[-82.62617029958149,35.59473557995452],[-82.61550297238486,35.59473557995452],[-82.60483564518823,35.59473557995452],[-82.60483564518823,35.586051684965895],[-82.60483564518823,35.57736778997727],[-82.61550297238486,35.57736778997727],[-82.62617029958149,35.57736778997727]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.525264420045495],[-82.54083168200846,35.533948315034124],[-82.54083168200846,35.54263221002275],[-82.53016435481183,35.54263221002275],[-82.5194970276152,35.54263221002275],[-82.5194970276152,35.533948315034124],[-82.5194970276152,35.525264420045495],[-82.53016435481183,35.525264420045495],[-82.54083168200846,35.525264420045495]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.586051684965895],[-82.54083168200846,35.59473557995452],[-82.53016435481183,35.59473557995452],[-82.5194970276152,35.59473557995452],[-82.5194970276152,35.586051684965895],[-82.5194970276152,35.57736778997727],[-82.53016435481183,35.57736778997727],[-82.54083168200846,35.57736778997727],[-82.54083168200846,35.586051684965895]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.54263221002275],[-82.60483564518823,35.54263221002275],[-82.60483564518823,35.533948315034124],[-82.60483564518823,35.525264420045495],[-82.61550297238486,35.525264420045495],[-82.62617029958149,35.525264420045495],[-82.62617029958149,35.533948315034124],[-82.62617029958149,35.54263221002275],[-82.61550297238486,35.54263221002275]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.62617029958149,35.56],[-82.62617029958149,35.56868389498864],[-82.62617029958149,35.57736778997727],[-82.61550297238486,35.57736778997727],[-82.60483564518823,35.57736778997727],[-82.60483564518823,35.56868389498864],[-82.60483564518823,35.56],[-82.61550297238486,35.56],[-82.62617029958149,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.61550297238486,35.56],[-82.60483564518823,35.56],[-82.60483564518823,35.55131610501138],[-82.60483564518823,35.54263221002275],[-82.61550297238486,35.54263221002275],[-82.62617029958149,35.54263221002275],[-82.62617029958149,35.55131610501138],[-82.62617029958149,35.56],[-82.61550297238486,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.54083168200846,35.55131610501138],[-82.54083168200846,35.56],[-82.53016435481183,35.56],[-82.5194970276152,35.56],[-82.5194970276152,35.55131610501138],[-82.5194970276152,35.54263221002275],[-82.53016435481183,35.54263221002275],[-82.54083168200846,35.54263221002275],[-82.54083168200846,35.55131610501138]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.53016435481183,35.57736778997727],[-82.5194970276152,35.57736778997727],[-82.5194970276152,35.56868389498864],[-82.5194970276152,35.56],[-82.53016435481183,35.56],[-82.54083168200846,35.56],[-82.54083168200846,35.56868389498864],[-82.54083168200846,35.57736778997727],[-82.53016435481183,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.57736778997727],[-82.56216633640172,35.586051684965895],[-82.56216633640172,35.59473557995452],[-82.55149900920509,35.59473557995452],[-82.54083168200846,35.59473557995452],[-82.54083168200846,35.586051684965895],[-82.54083168200846,35.57736778997727],[-82.55149900920509,35.57736778997727],[-82.56216633640172,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.57736778997727],[-82.58350099079497,35.586051684965895],[-82.58350099079497,35.59473557995452],[-82.57283366359835,35.59473557995452],[-82.56216633640172,35.59473557995452],[-82.56216633640172,35.586051684965895],[-82.56216633640172,35.57736778997727],[-82.57283366359835,35.57736778997727],[-82.58350099079497,35.57736778997727]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.586051684965895],[-82.60483564518823,35.59473557995452],[-82.5941683179916,35.59473557995452],[-82.58350099079497,35.59473557995452],[-82.58350099079497,35.586051684965895],[-82.58350099079497,35.57736778997727],[-82.5941683179916,35.57736778997727],[-82.60483564518823,35.57736778997727],[-82.60483564518823,35.586051684965895]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.56],[-82.60483564518823,35.56868389498864],[-82.60483564518823,35.57736778997727],[-82.5941683179916,35.57736778997727],[-82.58350099079497,35.57736778997727],[-82.58350099079497,35.56868389498864],[-82.58350099079497,35.56],[-82.5941683179916,35.56],[-82.60483564518823,35.56]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.57283366359835,35.57736778997727],[-82.56216633640172,35.57736778997727],[-82.56216633640172,35.56868389498864],[-82.56216633640172,35.56],[-82.57283366359835,35.56],[-82.58350099079497,35.56],[-82.58350099079497,35.56868389498864],[-82.58350099079497,35.57736778997727],[-82.57283366359835,35.57736778997727]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.56],[-82.56216633640172,35.56868389498864],[-82.56216633640172,35.57736778997727],[-82.55149900920509,35.57736778997727],[-82.54083168200846,35.57736778997727],[-82.54083168200846,35.56868389498864],[-82.54083168200846,35.56],[-82.55149900920509,35.56],[-82.56216633640172,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.54263221002275],[-82.60483564518823,35.55131610501138],[-82.60483564518823,35.56],[-82.5941683179916,35.56],[-82.58350099079497,35.56],[-82.58350099079497,35.55131610501138],[-82.58350099079497,35.54263221002275],[-82.5941683179916,35.54263221002275],[-82.60483564518823,35.54263221002275]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.57283366359835,35.56],[-82.56216633640172,35.56],[-82.56216633640172,35.55131610501138],[-82.56216633640172,35.54263221002275],[-82.57283366359835,35.54263221002275],[-82.58350099079497,35.54263221002275],[-82.58350099079497,35.55131610501138],[-82.58350099079497,35.56],[-82.57283366359835,35.56]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.54263221002275],[-82.56216633640172,35.55131610501138],[-82.56216633640172,35.56],[-82.55149900920509,35.56],[-82.54083168200846,35.56],[-82.54083168200846,35.55131610501138],[-82.54083168200846,35.54263221002275],[-82.55149900920509,35.54263221002275],[-82.56216633640172,35.54263221002275]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.56216633640172,35.525264420045495],[-82.56216633640172,35.533948315034124],[-82.56216633640172,35.54263221002275],[-82.55149900920509,35.54263221002275],[-82.54083168200846,35.54263221002275],[-82.54083168200846,35.533948315034124],[-82.54083168200846,35.525264420045495],[-82.55149900920509,35.525264420045495],[-82.56216633640172,35.525264420045495]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.58350099079497,35.525264420045495],[-82.58350099079497,35.533948315034124],[-82.58350099079497,35.54263221002275],[-82.57283366359835,35.54263221002275],[-82.56216633640172,35.54263221002275],[-82.56216633640172,35.533948315034124],[-82.56216633640172,35.525264420045495],[-82.57283366359835,35.525264420045495],[-82.58350099079497,35.525264420045495]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0},"geometry":{"type":"Polygon","coordinates":[[[-82.60483564518823,35.525264420045495],[-82.60483564518823,35.533948315034124],[-82.60483564518823,35.54263221002275],[-82.5941683179916,35.54263221002275],[-82.58350099079497,35.54263221002275],[-82.58350099079497,35.533948315034124],[-82.58350099079497,35.525264420045495],[-82.5941683179916,35.525264420045495],[-82.60483564518823,35.525264420045495]]]}}]};

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

var _recordStudyData = __webpack_require__(/*! ./record-study-data */ "./src/scripts/record-study-data.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = new _store.Store({});
var recordStudyData = new _recordStudyData.RecordStudyData();

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
      // const squareGridGeoJSON = store.getStateItem('squareGridGeoJSON'); // to big to write :(
      // recordStudyData.setEvent('data', 'girdgeojson', JSON.stringify(squareGridGeoJSON));
      recordStudyData.setEvent('data', 'gridanswers', JSON.stringify(valueArray));
      store.setStateItem('gridanswers', valueArray);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0yLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWFwLWNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yZWNvcmQtc3R1ZHktZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbInJlY29yZFN0dWR5RGF0YSIsIlJlY29yZFN0dWR5RGF0YSIsInN0b3JlIiwiU3RvcmUiLCJ1dGlsaXR5IiwiVXRpbGl0eSIsIkhhbmRsZXJzIiwiZGlzcGxheU5vbmVDbGFzcyIsInNlbGVjdGVkQ2xhc3MiLCJzdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCIsInN0dWR5QWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlIiwic3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNBZGQiLCJzdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSIsInN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZCIsInN0dWR5UXVlc3Rpb25FbGVtZW50c1JlbW92ZSIsInN0dWR5U1VTRWxlbWVudHNBZGQiLCJzdHVkeVNVU0VsZW1lbnRzUmVtb3ZlIiwic3VzU3RvcmFnZUtleXMiLCJlbGVtZW50SUQiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiZm9yRWFjaCIsImVsZW1lbnRVSUlEIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiY29udGFpbnMiLCJhZGQiLCJncmlkTmFtZSIsImdyaWRJdGVyYXRpb25zIiwic2V0QVBJRm9yR3JvdXAiLCJzdXNWYWx1ZUFycmF5Iiwia2V5IiwicXVlc3Rpb25BbnN3ZXIiLCJnZXRTdGF0ZUl0ZW0iLCJwdXNoIiwic2V0RXZlbnQiLCJKU09OIiwic3RyaW5naWZ5Iiwic2V0U3RhdGVJdGVtIiwic3R1ZHlWZXJzaW9uIiwiYWdyZWVtZW50VGltZVN0YW1wIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidHJpZ2dlckV2ZW50IiwicGFyZW50QnRuR3JvdXAiLCJ0YXJnZXQiLCJpZCIsInBhcmVudEVsZW1lbnQiLCJ0b2dnbGVCdXR0b25Hcm91cEJ1dHR0b25zT2ZmIiwicXVlc3Rpb25UZXh0IiwicmVwbGFjZSIsIk51bWJlciIsImlubmVyVGV4dCIsImJ0bkdyb3VwIiwiY2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwiY2hlY2tWYWxpZE9iamVjdCIsImxlbmd0aCIsImNoaWxkcmVuQXJyYXkiLCJjaGlsZEl0ZW0iLCJtYXBCb3hDb25maWciLCJNYXBCb3hDb25maWciLCJoYW5kbGVycyIsInV1aWQiLCJ0b1N0cmluZyIsImxpYnJhcnkiLCJmYXMiLCJmYXIiLCJkb20iLCJ3YXRjaCIsImxvYWRIVE1MQmxvY2siLCJibG9ja1N0dWR5QWdncmVlbWVudCIsImJsb2NrU3R1ZHlEaXNzYWdncmVlIiwiYmxvY2tTdHVkeVF1ZXN0aW9uMSIsImJsb2NrU3R1ZHlRdWVzdGlvbjIiLCJibG9ja1N0dWR5UXVlc3Rpb24zIiwiYmxvY2tTdHVkeVNVUyIsImJsb2NrU3R1ZHlDb21wbGV0ZWQiLCJtYXAxIiwibWFrZUFuaW1hdGVNYXAiLCJtYXAyYSIsIm1ha2VNYXAiLCJtYXAyYiIsIm1hcDNBcnIiLCJtYWtlQ29tcGFyZU1hcCIsIm1hcEVuZGEiLCJtYXBFbmRiIiwibmF2IiwiYWRkTmF2IiwiYWRkQ29udHJvbCIsInN5bk1hcHMiLCJzdHVkeU1pbk9uZSIsInN0dWR5TWF4T25lIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibWFwTWluT25lIiwibWFwTWF4T25lIiwibWFwVmVyc2lvbiIsInJlc2l6ZUFsbE1hcHMiLCJyZXNpemUiLCJ1cmxTdHJpbmciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ1cmwiLCJVUkwiLCJjYW1wYWlnbiIsInNlYXJjaFBhcmFtcyIsImdldCIsImlzTW9iaWxlRGV2aWNlIiwiYWdncmVtZW50Q2hhbmdlRWxlbWVudHMiLCJhZGRIYW5kbGVyQWdyZWVDbGljayIsImRpc2FnZ3JlbWVudENoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlckRpc2FncmVlQ2xpY2siLCJzdWJtaXRDaGFuZ2VFbGVtZW50cyIsImFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayIsInN1c0NoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlclN1Ym1pdFNVU0NsaWNrIiwiY3VycmVudFNxdWFyZUdyaWRHZW9KU09OIiwiZ2V0U291cmNlIiwic2V0RGF0YSIsInN1c0J0bkdyb3VwRWxlbWVudHMiLCJhZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayIsInN1c05hbWUiLCJzdXNJdGVyYXRpb25zIiwic2V0U3RhdGVGb3JHcm91cCIsImlzU3R1ZHljb21wbGV0ZWQiLCJzdHVkeUNvbXBsZXRlZCIsIlN0dWR5QWdycmVlbWVudCIsInN0dWR5QWdycmVlZCIsInN5bmNNb3ZlIiwicmVxdWlyZSIsImRlZmF1bHRNYXBTdHlsZSIsImRlZmF1bHRNYXBDZW50ZXIiLCJkZWZhdWx0TWFwWm9vbSIsImRlZmF1bHRNYXBDb250YWluZXIiLCJkYXJrTWFwU3R5bGUiLCJsaWdodE1hcFN0eWxlIiwibWFwYm94Z2wiLCJNYXBib3hDb21wYXJlIiwiYWNjZXNzVG9rZW4iLCJxdWlldCIsIm1hcDIiLCJkZWZhdWx0R3JleUJveCIsInNlbGVjdGVkQm94Iiwic3F1YXJlR3JpZEdlb0pTT04iLCJTcXVhcmVHcmlkR2VvSlNPTiIsIm1hcENoYW5nZUxheWVyc09uZSIsIm1hcENvbnRhaW5lciIsIm1hcEluZGV4IiwibWFwIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJjZW50ZXIiLCJ6b29tIiwic2hvd1pvb20iLCJ0b3VjaEVuYWJsZWQiLCJrZXliaW5kaW5ncyIsIm9uIiwiYWRkTGF5ZXIiLCJtYWtlVE1TTGF5ZXIiLCJtYWtlR3JpZE91dExpbmVMYXllciIsIm1ha2VHcmlkTGF5ZXIiLCJhZGRHcmlkQ2xpY2siLCJvbmxvYWQiLCJpbmRleENvdW50IiwiaW5kZXgiLCJzZXRJbnRlcnZhbCIsInNldExheW91dFByb3BlcnR5IiwibWFwQmVmb3JlQ29udGFpbmVyIiwibWFwQWZ0ZXJDb250YWluZXIiLCJtYXBDb21wYXJlV3JhcHBlcklEIiwiYmVmb3JlTWFwIiwiYWZ0ZXJNYXAiLCJjb21wYXJlIiwic2V0U2xpZGVyIiwiTmF2aWdhdGlvbkNvbnRyb2wiLCJ0eXBlIiwic291cmNlIiwiZGF0YSIsImxheW91dCIsInBhaW50IiwiZ2V0Q2FudmFzIiwiY3Vyc29yIiwiZmVhdHVyZSIsImZlYXR1cmVzIiwicHJvcGVydGllcyIsIm5ld0ZlYXR1cmUiLCJ0b2dnbGVTZWxlY3RlZEZlYXR1cmUiLCJzZWxlY3RlZEZlYXR1cmVzIiwibWFrZVNlbGVjdGVkRmVhdHVyZUdlb0pTT04iLCJuZXdTcXVhcmVHcmlkR2VvSlNPTiIsInVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyIsInN0b3JlU3F1YXJlR3JpZCIsInN0b3JlU2VsZWN0ZWRGZWF0dXJlIiwiTmV3U3F1YXJlR3JpZEdlb0pTT04iLCJtYXBDaGFuZ2UiLCJ0aWxlcyIsIm1pbnpvb20iLCJtYXh6b29tIiwic2NoZW1lIiwidGlsZVNpemUiLCJib3VuZHMiLCJzZWxlY3RlZCIsImdlb21ldHJ5IiwiY29vcmRpbmF0ZXMiLCJjdXJyZW50RmVhdHVyZUlkcyIsImNvbmNhdCIsImZpbHRlciIsImluY2x1ZGVzIiwiZGF0YXBpIiwiZm9vIiwiYWN0aW9uIiwiY2F0ZWdvcnkiLCJsYWJlbCIsInZhbHVlIiwiZGF0ZSIsImpzb25kYXRhIiwiZGF0YUFQSVVSTCIsInNlYXJjaCIsIlVSTFNlYXJjaFBhcmFtcyIsImZldGNoIiwiU1RBVEVfS0VZIiwic3RvcmFnZUF2YWlsYWJsZSIsInN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJzdGF0ZSIsImNoZWNrU3RhdGVFeGlzdHMiLCJnZXRTdGF0ZSIsInN0b3JlT2JqIiwibmV3U3RhdGVPYmoiLCJzZXRTdGF0ZSIsInBhcnNlIiwiZ2V0SXRlbSIsImNoZWNrSXRlbSIsInNldEl0ZW0iLCJCb29sZWFuIiwiaXRlbSIsInN0YXRlU3RyIiwiZ2V0U3RhdGVBc1N0cmluZyIsImluZGV4T2YiLCJ4IiwicmVtb3ZlSXRlbSIsIkRPTUV4Y2VwdGlvbiIsImNvZGUiLCJuYW1lIiwiY2hlY2siLCJvYmoiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJrZXlzIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiYSIsInRlc3QiLCJzdWJzdHIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ2ZW5kb3IiLCJvcGVyYSIsInBsYWNlSG9sZGVyRWxlbWVudElEIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiaW5uZXJIVE1MIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJzdGF0ZXRleHQiLCJp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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBYyw0QkFBNEI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWUsNEJBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUJBQWUsNEJBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsdUNBQXVDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJB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ZDtBQUNBO0FBQ0FFLGlCQUFXbFAsSUFBWCxDQUFnQixFQUFFSCxRQUFGLEVBQU8wTCxZQUFQLEVBQWhCO0FBQ0EsVUFBSXlELGFBQWEsQ0FBakIsRUFBb0I7QUFDbEIsWUFBTUMsZ0JBQWdCRCxhQUFhLENBQW5DO0FBQ0EsYUFBS3JQLGNBQUwsQ0FBb0JvUCxTQUFwQixFQUErQkUsYUFBL0IsRUFBOENDLFVBQTlDO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQXZSLHNCQUFnQnNDLFFBQWhCLENBQXlCLE1BQXpCLEVBQWlDLGFBQWpDLEVBQWdEQyxLQUFLQyxTQUFMLENBQWUrTyxVQUFmLENBQWhEO0FBQ0FyUixZQUFNdUMsWUFBTixDQUFtQixhQUFuQixFQUFrQzhPLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0QiLCJmaWxlIjoiaW5kZXguYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNDk5ZWE1ZTQyOTE1NzM2NmY5MmVcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc35pbmRleFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnQtYWxsXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwXFxcIj5cXG5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0dWR5IFBhcnRpY2lwYXRpb24gQWdyZWVtZW50PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnRcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJoLTEwMFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50LWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgVGhhbmsgeW91IGZvciB0YWtpbmcgcGFydCBpbiB0aGlzIHN0dWR5LiBCeSB1c2luZyB0aGUgZm9sbG93aW5nIHdlYnNpdGUsXFxuICAgICAgICB5b3UgYWdyZWUgdG8gcGFydGljaXBhdGUgaW4gYSBzdHVkeSBhYm91dCBob3cgcGVvcGxlIHVzZSB3ZWItcHJlc2VudGVkIG1hcHMuXFxuICAgICAgICBXZSB3aWxsIGNvbGxlY3QgaW5mb3JtYXRpb24gYWJvdXQgeW91ciBpbnRlcmFjdGlvbnMgd2l0aCB0aGlzIHNpdGUgYnV0IG5vdCBhbnlcXG4gICAgICAgIHBlcnNvbmFsbHkgaWRlbnRpZmlhYmxlIGluZm9ybWF0aW9uLiBUaGUgb25seSBwZW9wbGUgd2l0aCBhY2Nlc3MgdG8gdGhlIHN0dWR5XFxuICAgICAgICBkYXRhIGFyZSB0aGUgcmVzZWFyY2hlcnMuIEhvd2V2ZXIsIHRoZSBkYXRhIHdpbGwgYmUgc3VtbWFyaXplZCwgc2hhcmVkLCBhbmRcXG4gICAgICAgIGRpc3NlbWluYXRlZCBpbiB0YWxrcywgYmxvZ3MsIGFuZCBwb3NzaWJseSByZXNlYXJjaCBqb3VybmFscy4gVGhlcmUgaXMgbm9cXG4gICAgICAgIGNvc3QgdG8geW91IHRvIHBhcnRpY2lwYXRlIGluIHRoaXMgcmVzZWFyY2ggc3R1ZHksIGFuZCB5b3Ugd2lsbCBub3QgYmVcXG4gICAgICAgIGNvbXBlbnNhdGVkLiBUaGVyZSBhcmUgbm8ga25vd24gcmlza3MgaW4gdGhlIGZvbGxvd2luZyB0YXNrcy5cXG4gICAgICAgIDxiciAvPjxiciAvPlxcbiAgICAgICAgQnkgYWdyZWVpbmcgdG8gdGhpcywgeW91IGhhdmUgYWNrbm93bGVkZ2VkIHRoYXQgeW91IGhhdmUgcmVhZCB0aGVcXG4gICAgICAgIGNvbnRlbnRzIG9mIHRoaXMgY29uc2VudCwgYXJlIGFuIGFkdWx0IG92ZXIgMTggeWVhcnMgb2YgYWdlLCBhbmRcXG4gICAgICAgIHlvdSBhcmUgZ2l2aW5nIGNvbnNlbnQgdG8gcGFydGljaXBhdGUgaW4gdGhpcyBzdHVkeS5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtNVxcXCI+RG8geW91IHdhbnQgdG8gcGFydGljaXBhdGU/PC9kaXY+XFxuXFxuICA8c3BhbiBjbGFzcz1cXFwibXQtMyBoLWF1dG8gZC1mbGV4XFxcIj5cXG4gICAgPGJ1dHRvbiBpZD1cXFwiYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tYWdncmVlbWVudCB3LTIwIGFsaWduLXNlbGYtZW5kIG1yLTNcXFwiID5cXG4gICAgICA8aSBjbGFzcz1cXFwiZmFzIGZhLWNoZWNrXFxcIj48L2k+XFxuICAgICAgWWVzXFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJkaWFnZ3JlZS1idXR0b25cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4teGxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmRcXFwiID5cXG4gICAgICA8aSBjbGFzcz1cXFwiZmFzIGZhLXRpbWVzLWNpcmNsZVxcXCI+PC9pPlxcbiAgICAgIE5vXFxuICAgIDwvYnV0dG9uPlxcbiAgPC9zcGFuPlxcblxcbiAgPCEtLSA8ZGl2IGlkPVxcXCJhZ2dyZWUtZGlzYWdncmUtd3JhcHBlclxcXCIgY2xhc3M9XFxcIm10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnQtc3ViXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIGFsaWduLXNlbGYtY2VudGVyIHBiLTQgcHktMlxcXCI+RG8geW91IHdhbnQgdG8gcGFydGljaXBhdGU/PC9kaXY+XFxuICAgIDxidXR0b24gaWQ9XFxcImFnZ3JlZS1idXR0b25cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZCBtci0zXFxcIiA+XFxuICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS1jaGVja1xcXCI+PC9pPlxcbiAgICAgIFllc1xcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiBpZD1cXFwiZGlhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXhsaWdodCBidG4tYWdncmVlbWVudCB3LTIwIGFsaWduLXNlbGYtZW5kXFxcIiA+XFxuICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS10aW1lcy1jaXJjbGVcXFwiPjwvaT5cXG4gICAgICBOb1xcbiAgICA8L2J1dHRvbj5cXG4gIDwvZGl2PiAtLT5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtZW5kXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDBcXFwiPlxcbiAgICBUaGFua3MgZm9yIHBhcnRpY2lwYXRpbmchXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItZW5kXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci1lbmRcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbXBsZXRlLW1hcC1uLWRlc2NyaXB0aW9uIGQtZmxleCBkdWFsbWFwc1xcXCI+XFxuXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwidy0xMDBcXFwiID5cXG4gICAgICAgICAgWW91ciBhbnN3ZXJcXG4gICAgICAgIDwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29tcGxldGUtbWFwLW4tZGVzY3JpcHRpb24gZC1mbGV4IGR1YWxtYXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1lbmRhXFxcIiBjbGFzcz1cXFwibXktMyBteC0wIG14LXNtLTAgbXgtbWVkLTMgbWFwLWVuZGFcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb21wbGV0ZS1tYXAtbi1kZXNjcmlwdGlvbiBkLWZsZXggZHVhbG1hcHNcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInctMTAwXFxcIiA+XFxuICAgICAgICAgIE91ciBhbnN3ZXJcXG4gICAgICAgIDwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29tcGxldGUtbWFwLW4tZGVzY3JpcHRpb24gZC1mbGV4IGR1YWxtYXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1lbmRiXFxcIiBjbGFzcz1cXFwibXktMyBteC0wIG14LXNtLTAgbXgtbWVkLTMgbWFwLWVuZGJcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1kaXNzYWdncmVlXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlRoYW5rcyBhbnl3YXkhPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdHVkeS1kaXNzYWdncmVlLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBUaGFuayB5b3UgZm9yIGNvbnNpZGVyaW5nIGJlaW5nIGEgcGFydGljaXBhbnQuIElmIHlvdSBjaGFuZ2UgeW91clxcbiAgICBtaW5kIHlvdSBjYW4gYWx3YXlzIHJldmlldyB0aGUmbmJzcDs8YSBocmVmPVxcXCJcXFwiID4gYWdncmVtZW50IDwvYT4mbmJzcDthZ2FpbiFcXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1wcm9ncmVzcy1tYXAtMFxcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDEgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIFJldmlldyB0aGUgbWFwIGFuZCB0aGUgYW5pbWF0aW9uIG9mIHRoZSB0d28gaW1hZ2VzLiBUaGVuIGNsaWNrIG9uIGFueSBib3ggd2hlcmUgeW91IGJlbGlldmUgY2hhbmdlIG9jY3VycmVkLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLTFcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJtYXAtaW5uZXItaG9sZGVyLTFcXFwiIGNsYXNzPVxcXCJyb3cgaC0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwibWFwLTFcXFwiIGNsYXNzPVxcXCJteS0zIG14LTNcXFwiPjwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDIgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIFN1Ym1pdCB0aGUgc2VsZWN0ZWQgYm94ZXMgKGluIG9yYW5nZSkgYXMgeW91ciBhbnN3ZXIgdG8gYXJlYXMgdGhhdCBoYXZlIGNoYW5nZWQuXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLXN1cy0wXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlBsZWFzZSBzZWFyY2ggZm9yIGxvY2F0aW9uIGFuZCBkcmF3IGEgY2lyY2xlIGZpcnN0IVxcXCI+XFxuICAgICAgU3VibWl0XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLW1hcC0xXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMSBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgUmV2aWV3IHRoZSB0d28gbWFwcyBhbmQgY2xpY2sgb24gYW55IGJveCB3aGVyZSB5b3UgYmVsaWV2ZSBjaGFuZ2Ugb2NjdXJyZWQuXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItMlxcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbWwtMyBtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci0yXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtbWQtNiBkdWFsbWFwcyBkLWZsZXhcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLTJhXFxcIiBjbGFzcz1cXFwibXktMyBteC0wIG14LXNtLTAgbXgtbWVkLTMgbWFwLTJhXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTYgZHVhbG1hcHMgZC1mbGV4XFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC0yYlxcXCIgY2xhc3M9XFxcIm15LTMgbXgtMCBteC1zbS0wIG14LW1lZC0zIG1hcC0yYlxcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMiBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgU3VibWl0IHRoZSBzZWxlY3RlZCBib3hlcyAoaW4gb3JhbmdlKSBhcyB5b3VyIGFuc3dlciB0byBhcmVhcyB0aGF0IGhhdmUgY2hhbmdlZC5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiUGxlYXNlIHNlYXJjaCBmb3IgbG9jYXRpb24gYW5kIGRyYXcgYSBjaXJjbGUgZmlyc3QhXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtbWFwLTJcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAxIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBSZXZpZXcgdGhlIG1hcCB1c2luZyB0aGUgaG9yaXpvbnRhbCBiYXIgYnkgZHJhZ2dpbmcgdGhlIGJhciBzaWRlIHRvIHNpZGUgdG9cXG4gICAgcmV2ZWFsIHdoYXTigJlzIGNoYW5nZWQuIFRoZW4gY2xpY2sgb24gYW55IGJveCB3aGVyZSB5b3UgYmVsaWV2ZSBjaGFuZ2VcXG4gICAgb2NjdXJyZWQgYmV0d2VlbiB0aGUgdHdvIG1hcHMuXFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItM1xcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItM1xcXCIgY2xhc3M9XFxcInJvdyBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cXG4gICAgICA8ZGl2IGlkPSdjb21wYXJlLXdyYXBwZXInPlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLTNhXFxcIiBjbGFzcz1cXFwibXktMyBteC0zXFxcIj48L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC0zYlxcXCIgY2xhc3M9XFxcIm15LTMgbXgtM1xcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMiBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgU3VibWl0IHRoZSBzZWxlY3RlZCBib3hlcyAoaW4gb3JhbmdlKSBhcyB5b3VyIGFuc3dlciB0byBhcmVhcyB0aGF0IGhhdmUgY2hhbmdlZC5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiUGxlYXNlIHNlYXJjaCBmb3IgbG9jYXRpb24gYW5kIGRyYXcgYSBjaXJjbGUgZmlyc3QhXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3Mtc3VzXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMyBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgUmV2aWV3IHRoZSBtYXAgYW5kIHRoZSBhbmltYXRpb24gb2YgdGhlIHR3byBpbWFnZXMuIFRoZW4gY2xpY2sgb24gYW55XFxuICAgIGJveCB3aGVyZSB5b3UgYmVsaWV2ZSBjaGFuZ2Ugb2NjdXJyZWQuIDEgaW5kaWNhdGVzIHlvdSBzdHJvbmdseSBkaXNhZ3JlZVxcbiAgICBhbmQgNSBpbmRpY2F0ZXMgeW91IHN0cm9uZ2x5IGFnZ3JlZS5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicGwtMSBwdC0zIHBiLTNcXFwiPlxcbiAgICAmbmJzcDtcXG4gIDwvZGl2PlxcblxcbiAgPCEtLSA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDAgcC0zIG0tM1xcXCI+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInN1cy1kZXNjcmliZXItbGVhZCBjb2wtNlxcXCI+XFxuICAgICAgJm5ic3BcXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInN1cy1kZXNjcmliZXItYWdyZWUgdGV4dC1sZWZ0IGNvbC0zXFxcIj5cXG4gICAgICAgIFN0cm9uZ2x5IGRpc2FncmVlXFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlIHRleHQtcmlnaHQgY29sLTNcXFwiPlxcbiAgICAgICAgU3Ryb25nbHkgYWdyZWVcXG4gICAgPC9kaXY+XFxuXFxuICA8L2Rpdj4gLS0+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItMyBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDEuJm5ic3A7Jm5ic3A7SSB0aGluayB0aGF0IEkgd291bGQgbGlrZSB0byB1c2UgdGhpcyBzaXRlIGZyZXF1ZW50bHlcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0xXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMi4mbmJzcDsmbmJzcDtJIGZvdW5kIHRoZSBzaXRlIHVubmVjZXNzYXJpbHkgY29tcGxleFxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTJcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICAzLiZuYnNwOyZuYnNwO0kgdGhvdWdodCB0aGUgc2l0ZSB3YXMgZWFzeSB0byB1c2VcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0zXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi0zIHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDQuJm5ic3A7Jm5ic3A7SSB0aGluayB0aGF0IEkgd291bGQgbmVlZCB0aGUgc3VwcG9ydCBvZiBhIHRlY2huaWNhbCBwZXJzb24gdG8gYmUgYWJsZSB0byB1c2UgdGhpcyBzaXRlXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtNFxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwdC0yXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItMyBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDUuJm5ic3A7Jm5ic3A7SSBmb3VuZCB0aGUgdmFyaW91cyBmdW5jdGlvbnMgaW4gdGhpcyBzaXRlIHdlcmUgd2VsbCBpbnRlZ3JhdGVkXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtNVxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwdC0yXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItMyBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA2LiZuYnNwOyZuYnNwO0kgdGhvdWdodCB0aGVyZSB3YXMgdG9vIG11Y2ggaW5jb25zaXN0ZW5jeSBpbiB0aGlzIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy02XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IHB0LTJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi0zIHN1cy1vZGRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgNy4mbmJzcDsmbmJzcDtJIHdvdWxkIGltYWdpbmUgdGhhdCBtb3N0IHBlb3BsZSB3b3VsZCBsZWFybiB0byB1c2UgdGhpcyBzaXRlIHZlcnkgcXVpY2tseVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTdcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNy0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXJlcGxhY2UtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1yZXBsYWNlLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcmVwbGFjZS00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXJlcGxhY2UtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwdC0yXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItMyBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA4LiZuYnNwOyZuYnNwO0kgZm91bmQgdGhlIHNpdGUgdmVyeSBjdW1iZXJzb21lIHRvIHVzZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLThcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA5LiZuYnNwOyZuYnNwO0kgZmVsdCB2ZXJ5IGNvbmZpZGVudCB1c2luZyB0aGUgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTlcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTMgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMTAuJm5ic3A7Jm5ic3A7SSBuZWVkZWQgdG8gbGVhcm4gYSBsb3Qgb2YgdGhpbmdzIGJlZm9yZSBJIGNvdWxkIGdldCBnb2luZyB3aXRoIHRoaXMgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTEwXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEwLTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcHQtMlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctMTAwIGQtZmxleCBtdC00XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwicHQtc20tMiBwdC1tZC0wIGNvbC0xMiBjb2wtc20tMTIgY29sLW1kLTdcXFwiPlxcbiAgICAgICZuYnNwO1xcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwicHQtc20tMiBwdC1tZC0wIGNvbC0xMiBjb2wtc20tMTIgY29sLW1kLTVcXFwiPlxcbiAgICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tZW5kXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlBsZWFzZSBzZWFyY2ggZm9yIGxvY2F0aW9uIGFuZCBkcmF3IGEgY2lyY2xlIGZpcnN0IVxcXCI+XFxuICAgICAgICBTdWJtaXQgYW5kIGZpbmlzaFxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbjwvZGl2PlxcblwiOyIsImltcG9ydCB7IFJlY29yZFN0dWR5RGF0YSB9IGZyb20gJy4vcmVjb3JkLXN0dWR5LWRhdGEnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IFV0aWxpdHkgfSBmcm9tICcuL3V0aWxpdHknO1xuXG5jb25zdCByZWNvcmRTdHVkeURhdGEgPSBuZXcgUmVjb3JkU3R1ZHlEYXRhKCk7XG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuZXhwb3J0IGNsYXNzIEhhbmRsZXJzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kaXNwbGF5Tm9uZUNsYXNzID0gJ2Qtbm9uZSc7XG4gICAgdGhpcy5zZWxlY3RlZENsYXNzID0gJ3NlbGVjdGVkJztcblxuICAgIC8vIHN0dWR5IGFnZ3JlZW1lbnRcbiAgICB0aGlzLnN0dWR5QWdncmVlbWVudEVsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1tYXAtJ107XG4gICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSA9IFsnc3R1ZHktYWdyZWVtZW50LWFsbCddO1xuXG4gICAgLy8gc3R1ZHkgZGlzYWdncmVlbWVudFxuICAgIHRoaXMuc3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNBZGQgPSBbJ3N0dWR5LWRpc3NhZ2dyZWUnXTtcbiAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlID0gWydzdHVkeS1hZ3JlZW1lbnQtYWxsJ107XG5cbiAgICAvLyBzdHVkeSBxdWVzdGlvbnMgbWFwIGNoYW5nZVxuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1zdXMnLCAnYmxvY2stc3R1ZHktc3VzLWhvbGRlciddO1xuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzUmVtb3ZlID0gWydzdHVkeS1wcm9ncmVzcy1tYXAtMCcsICdzdHVkeS1wcm9ncmVzcy1tYXAtMScsICdzdHVkeS1wcm9ncmVzcy1tYXAtMicsICdtYXAtYWN0aW9uLWhvbGRlciddO1xuXG4gICAgLy8gU1VTIHNjb3Jlc1xuICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c0FkZCA9IFsnc3R1ZHktcHJvZ3Jlc3MtZW5kJywgJ2Jsb2NrLXN0dWR5LWNvbXBsZXRlZC1ob2xkZXInXTtcbiAgICB0aGlzLnN0dWR5U1VTRWxlbWVudHNSZW1vdmUgPSBbJ3N0dWR5LXByb2dyZXNzLXN1cycsICdibG9jay1zdHVkeS1zdXMtaG9sZGVyJ107XG4gICAgdGhpcy5zdXNTdG9yYWdlS2V5cyA9IFsnc3VzLXF1ZXN0aW9uLTEnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi0yJyxcbiAgICAgICdzdXMtcXVlc3Rpb24tMycsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTQnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi01JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNicsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTcnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi04JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tOScsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTEwJ107XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIHN1Ym1pdHRpbmcgY2hhbmdlIGRhdGEgb24gbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcblxuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZ3JpZE5hbWUgPSAnZ3JpZC1ib3gtJztcbiAgICAgICAgY29uc3QgZ3JpZEl0ZXJhdGlvbnMgPSA0MjtcbiAgICAgICAgdXRpbGl0eS5zZXRBUElGb3JHcm91cChncmlkTmFtZSwgZ3JpZEl0ZXJhdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBzdWJtaXR0aW5nIHN1cyBzY29yZVxuICAvL1xuICAvLyBAcGFyYW0gZWxlbWVudElEIC0gSFRNTCBlbGVtZW50IElEXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyU3VibWl0U1VTQ2xpY2soZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gYWRkIGVsZW1lbnRzIHRvIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5U1VTRWxlbWVudHNSZW1vdmUuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGFkZCBkaXNwbGF5IG5vbmUgY2xhc3MgaWYgdGhlIGNsYXNzIGRvZXMgbm90IGV4c2lzdFxuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGR1cGxpY2F0ZSBjbGFzc2VzIGFyZSBub3QgYWRkZWRcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5kaXNwbGF5Tm9uZUNsYXNzKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5hZGQodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN1c1ZhbHVlQXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5zdXNTdG9yYWdlS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkFuc3dlciA9IHN0b3JlLmdldFN0YXRlSXRlbShrZXkpO1xuICAgICAgICAgIHN1c1ZhbHVlQXJyYXkucHVzaCh7IGtleSwgcXVlc3Rpb25BbnN3ZXIgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZWNvcmRTdHVkeURhdGEuc2V0RXZlbnQoJ2RhdGEnLCAnc3VzYW5zd2VycycsIEpTT04uc3RyaW5naWZ5KHN1c1ZhbHVlQXJyYXkpKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzJywgc3VzVmFsdWVBcnJheSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3IgYWdncmVlaW5nIHRvIGRvIHN0dWR5XG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyQWdyZWVDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBzdHVkeVZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJyk7XG4gICAgICAgIGNvbnN0IGFncmVlbWVudFRpbWVTdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxuICAgICAgICAvLyBhZGQgZWxlbWVudHMgdG8gVUlcbiAgICAgICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2VsZW1lbnRVSUlEfSR7c3R1ZHlWZXJzaW9ufWApLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlBZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGFkZCBkaXNwbGF5IG5vbmUgY2xhc3MgaWYgdGhlIGNsYXNzIGRvZXMgbm90IGV4c2lzdFxuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGR1cGxpY2F0ZSBjbGFzc2VzIGFyZSBub3QgYWRkZWRcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5kaXNwbGF5Tm9uZUNsYXNzKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5hZGQodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxpdHkudHJpZ2dlckV2ZW50KCdhZ2dyZWUtY2xpY2tlZCcsICdoYW5kbGVBZ3JlZUNsaWNrJyk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50JywgdHJ1ZSk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50LWRhdGUnLCBhZ3JlZW1lbnRUaW1lU3RhbXApO1xuICAgICAgICByZWNvcmRTdHVkeURhdGEuc2V0RXZlbnQoJ2RhdGEnLCAnc3R1ZHktYWdyZWVtZW50JywgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIERJU2FnZ3JlZWluZyB0byBkbyBzdHVkeVxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlckRpc2FncmVlQ2xpY2soZWxlbWVudElEKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XG4gICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhzaXN0c1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgYWdyZWVtZW50VGltZVN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAvLyBhZGQgZWxlbWVudHMgdG8gVUlcbiAgICAgICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlsaXR5LnRyaWdnZXJFdmVudCgnZGlzYWdncmVlLWNsaWNrZWQnLCAnaGFuZGxlQWdyZWVDbGljaycpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIGZhbHNlKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtZGF0ZScsIGFncmVlbWVudFRpbWVTdGFtcCk7XG4gICAgICAgIHJlY29yZFN0dWR5RGF0YS5zZXRFdmVudCgnZGF0YScsICdzdHVkeS1hZ3JlZW1lbnQnLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIGluZGl2aWR1YWwgc3VzIHNjb3JlIHF1ZXN0aW9ucyB0byBsb2NhbCBzdG9yYWdlXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTVVNRdWVzdGlvbkNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIHRoaXMuc2VsZWN0ZWRDbGFzcyA9ICdzZWxlY3RlZCc7XG5cbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBnZXQgcGFyZW50IGVsZW1lbnQgd2hpY2ggaXMgYnV0dG9uIGdyb3VwXG4gICAgICAgIGNvbnN0IHBhcmVudEJ0bkdyb3VwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIEhhbmRsZXJzLnRvZ2dsZUJ1dHRvbkdyb3VwQnV0dHRvbnNPZmYocGFyZW50QnRuR3JvdXAsIHRoaXMuc2VsZWN0ZWRDbGFzcyk7XG5cbiAgICAgICAgY29uc3QgcXVlc3Rpb25UZXh0ID0gcGFyZW50QnRuR3JvdXAuaWQucmVwbGFjZSgnYnRuLWdyb3VwLXN1cy0nLCAnc3VzLXF1ZXN0aW9uLScpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0ocXVlc3Rpb25UZXh0LCBOdW1iZXIoZS50YXJnZXQuaW5uZXJUZXh0KSk7XG5cbiAgICAgICAgLy8gYWRkIHN1cyBxdWVzdGlvbiBhbnN3ZXIgdG8gc2VsZWN0ZWQgdG8gY2xhc3NcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuc2VsZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuY2xhc3NMaXN0LmFkZCh0aGlzLnNlbGVjdGVkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyByZW1vdmVzIHRoZSBzZWxlY3RlZCBjbGFzcyBcInVuc2xlY3RzXCIgYWxsIHRoZSBidXR0b25zXG4gIC8vICBpbiBhIGJ1dHRvbiBncm91cFxuICAvL1xuICAvLyBAcGFyYW0gYnRuR3JvdXAgLSBIVE1MIGVsZW1lbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHN0YXRpYyB0b2dnbGVCdXR0b25Hcm91cEJ1dHR0b25zT2ZmKGJ0bkdyb3VwLCBzZWxlY3RlZENsYXNzKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBidG5Hcm91cC5jaGlsZE5vZGVzO1xuICAgIC8vIG1ha2Ugc3VyZSBjaGlsZHJlbiBpcyB2YWxpdWQgb2JqZWN0XG4gICAgaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3QoY2hpbGRyZW4pKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSBhcmUgY2hpbGRlcmVuIGJ1dHRvbnNcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFsuLi5jaGlsZHJlbl07XG4gICAgICBjaGlsZHJlbkFycmF5LmZvckVhY2goKGNoaWxkSXRlbSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGRJdGVtLmNsYXNzTGlzdCkge1xuICAgICAgICAgIGNoaWxkSXRlbS5jbGFzc0xpc3QucmVtb3ZlKHNlbGVjdGVkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbi8vIFRPRE9TXG4vLyAgIHJlY29yZCBkYXRhIGF0IGVuZCBzbyBpdHMgYWxsIGluIG9uZSByb3cuLi4uIHN0b3JlIGl0IGluIHN0b3JlIHRoZW4gZ2V0IGVhY2ggZWxlbWVudFxuLy8gICAgcmVjb3JkIHByb2dyZXNzIGluIHN0YXRlIHNvIHdoZW4gcGFydGljcGF0YW50IGNvbWVzIGJhY2sgb3IgaGlzdCBiYWNrIGJ1dHRvblxuLy8gICAgICAgICAgICB0aGV5IGFyZSBiYWNrIGF0IHN0YXRlIHRoZXkgbGVmdCB0aGUgc3R1ZHkgLS0tLSB0aGlzIHJlYWxseSBoYXMgdG8gaGFwcGVuIHNpbmVcbi8vICAgICAgICAgICAgRyBsaW1pdHMgd3JpdGVzLi4uICBtYXliZSBwdXQgYW5zd2VyIGdyaWQgaW50byBhbiBhcnJheVxuLy8gICAgTUlHSFQgTk9UIEJFIEFCTEUgVE8gRE8gVEhJU1xuLy9cbi8vIGFkZCBjaGFuZ2UgbWFwc1xuLy8gY29tcGxldGVkIG5lZWRzIGV4cGVjdGVkIG1hcCBzbyBwZW9wbGUgY2FuIHNlZSBob3cgdGhleSBkaWRcbi8vIGZpZ3VyZSBvdXQgaG93IG9ubHkgbG9hZCBhbmQgaW5pdGFpbHplIG1hcHMgbmVlZGVkLlxuLy8gICAgICBub3QgYWxsIGF0IHRoZSBzdGFydCBzbyB0aGVyZSBpcyBsZXNzIGxhZyBhdCBzdGFydFxuLy8gT24gdGhlIGNvbXBsZXRlZCBtYXAgZGlzYWJsZSBtYXAgY2xpY2sgb2YgYWRkaW5nIHJlbW92aW5nIHNlbGVjdGUgZ3JpZHNcbi8vIEJhY2sgdG8gZ3JpZCBidXR0b24gd2hlbiBvbiBzdXM/IG1heWJlIG9yIHVzZSBuYXZnbyB0byBjcmVhdGUgcGFnZVxuLy8gcGxheSBwYXVzZSBvbiBhbmltYXRpb25cbmltcG9ydCB7IGxpYnJhcnksIGRvbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFyIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtcmVndWxhci1zdmctaWNvbnMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IFJlY29yZFN0dWR5RGF0YSB9IGZyb20gJy4vcmVjb3JkLXN0dWR5LWRhdGEnO1xuaW1wb3J0IHsgTWFwQm94Q29uZmlnIH0gZnJvbSAnLi9tYXAtY29uZmlnJztcbmltcG9ydCB7IFV0aWxpdHkgfSBmcm9tICcuL3V0aWxpdHknO1xuaW1wb3J0IHsgSGFuZGxlcnMgfSBmcm9tICcuL2hhbmRsZXJzJztcblxuaW1wb3J0IGJsb2NrU3R1ZHlBZ2dyZWVtZW50IGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeURpc3NhZ2dyZWUgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktZGlzc2FnZ3JlZS5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5UXVlc3Rpb24xIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTEuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVF1ZXN0aW9uMiBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0yLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlRdWVzdGlvbjMgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMy5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5U1VTIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXN1cy5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5Q29tcGxldGVkIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWNvbXBsZXRlZC5odG1sJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgcmVjb3JkU3R1ZHlEYXRhID0gbmV3IFJlY29yZFN0dWR5RGF0YSgpO1xuY29uc3QgbWFwQm94Q29uZmlnID0gbmV3IE1hcEJveENvbmZpZygpO1xuY29uc3QgdXRpbGl0eSA9IG5ldyBVdGlsaXR5KCk7XG5jb25zdCBoYW5kbGVycyA9IG5ldyBIYW5kbGVycygpO1xuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCd1dWlkJywgdXRpbGl0eS51dWlkKCkudG9TdHJpbmcoKSk7XG59XG5cbi8vIEtpY2tzIG9mZiB0aGUgcHJvY2VzcyBvZiBmaW5kaW5nIDxpPiB0YWdzIGFuZCByZXBsYWNpbmcgd2l0aCA8c3ZnPlxuLy8gYWRkZXMgc3VwcG9ydCBmb3IgZm9udGF3ZXNvbWVcbmxpYnJhcnkuYWRkKGZhcywgZmFyKTtcbmRvbS53YXRjaCgpO1xuXG4vLyBsb2FkIGFsbCBodG1sIGJsb2Nrc1xudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1hZ2dyZWVtZW50LWhvbGRlcicsIGJsb2NrU3R1ZHlBZ2dyZWVtZW50KTtcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktZGlzc2FnZ3JlZS1ob2xkZXInLCBibG9ja1N0dWR5RGlzc2FnZ3JlZSk7XG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTEtaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMSk7XG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTItaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMik7XG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMtaG9sZGVyJywgYmxvY2tTdHVkeVF1ZXN0aW9uMyk7XG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXN1cy1ob2xkZXInLCBibG9ja1N0dWR5U1VTKTtcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktY29tcGxldGVkLWhvbGRlcicsIGJsb2NrU3R1ZHlDb21wbGV0ZWQpO1xuXG4vLyBjcmVhdGUgYWxsIHRoZSBtYXBib3ggbWFwIG9iamVjdHNcbmNvbnN0IG1hcDEgPSBtYXBCb3hDb25maWcubWFrZUFuaW1hdGVNYXAoJ21hcC0xJywgMCk7XG5jb25zdCBtYXAyYSA9IG1hcEJveENvbmZpZy5tYWtlTWFwKCdtYXAtMmEnLCAwKTtcbmNvbnN0IG1hcDJiID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC0yYicsIDEpO1xuY29uc3QgbWFwM0FyciA9IG1hcEJveENvbmZpZy5tYWtlQ29tcGFyZU1hcCgnbWFwLTNhJywgJ21hcC0zYicsICdjb21wYXJlLXdyYXBwZXInKTtcbmNvbnN0IG1hcEVuZGEgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLWVuZGEnLCAwKTtcbmNvbnN0IG1hcEVuZGIgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLWVuZGInLCAxKTtcblxuLy8gY3JlYXRlIG1hcGJveCBuYXZpZ2F0aW9uIGNvbnRyb2wgaW5zdGFuY2VcbmNvbnN0IG5hdiA9IG1hcEJveENvbmZpZy5hZGROYXYoKTtcblxuLy8gYWRkIG5hdmlnYXRpbyB0byBtYXBzXG4vLyBJIG1heSBub3QgbmVlZCB0aGlzIGlmIEkgZG8gbm90IGxldCB1c2VyIHpvb20vcGFuXG5tYXAxLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcbm1hcDJhLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcbm1hcDJiLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcbm1hcDNBcnJbMF0uYWRkQ29udHJvbChuYXYsICd0b3AtbGVmdCcpO1xubWFwM0FyclsxXS5hZGRDb250cm9sKG5hdiwgJ3RvcC1sZWZ0Jyk7XG5tYXBFbmRhLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcbm1hcEVuZGIuYWRkQ29udHJvbChuYXYsICd0b3AtbGVmdCcpO1xuXG4vLyBzeW5jIG1hcHNcbm1hcEJveENvbmZpZy5zeW5NYXBzKG1hcDJhLCBtYXAyYik7XG5tYXBCb3hDb25maWcuc3luTWFwcyhtYXBFbmRhLCBtYXBFbmRiKTtcblxuLy8gc3R1ZHkgY29uc3RyYWludHMgbnVtYmVyIG9mIHF1ZXN0aW9ucyBzdGFydHMgd2l0aCAwXG5jb25zdCBzdHVkeU1pbk9uZSA9IDA7XG5jb25zdCBzdHVkeU1heE9uZSA9IDI7XG5jb25zdCBzdHVkeVZlcnNpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoc3R1ZHlNYXhPbmUgLSBzdHVkeU1pbk9uZSArIDEpICsgc3R1ZHlNaW5PbmUpO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicsIHN0dWR5VmVyc2lvbik7XG5yZWNvcmRTdHVkeURhdGEuc2V0RXZlbnQoJ2RhdGEnLCAnc3R1ZHktcXVlc3Rpb24nLCBzdHVkeVZlcnNpb24pO1xuXG4vLyBzdHVkeSBjb25zdHJhaW50cyBudW1iZXIgb2YgcXVlc3Rpb25zIHN0YXJ0cyB3aXRoIDBcbmNvbnN0IG1hcE1pbk9uZSA9IDA7XG5jb25zdCBtYXBNYXhPbmUgPSAyO1xuY29uc3QgbWFwVmVyc2lvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXBNYXhPbmUgLSBtYXBNaW5PbmUgKyAxKSArIG1hcE1pbk9uZSk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ21hcC12ZXJzaW9uJywgbWFwVmVyc2lvbik7XG5yZWNvcmRTdHVkeURhdGEuc2V0RXZlbnQoJ2RhdGEnLCAnbWFwLXZlcnNpb24nLCBtYXBWZXJzaW9uKTtcblxuLy8gLy8gVE9ETyBvbmx5IGRlYWwgd2l0aCBtYXAgZm9yIHN0dWR5IHF1ZXN0aW9uXG4vLyAvLyBvbmx5IGxvYWQgaHRtbCBibG9jayBuZWVkZWQgbWFwIG9iamVjdHMgd2lsbCBoYXZlIGdlbmVyaWMgbmFtZXMgYWxzb1xuZnVuY3Rpb24gcmVzaXplQWxsTWFwcygpIHtcbiAgbWFwMS5yZXNpemUoKTtcbiAgbWFwMmEucmVzaXplKCk7XG4gIG1hcDJiLnJlc2l6ZSgpO1xuICBtYXAzQXJyWzBdLnJlc2l6ZSgpO1xuICBtYXAzQXJyWzFdLnJlc2l6ZSgpO1xuICBtYXBFbmRhLnJlc2l6ZSgpO1xuICBtYXBFbmRiLnJlc2l6ZSgpO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ2dyZWUtY2xpY2tlZCcsICgpID0+IHtcbiAgcmVzaXplQWxsTWFwcygpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Rpc2FnZ3JlZS1jbGlja2VkJywgKCkgPT4ge1xuICByZXNpemVBbGxNYXBzKCk7XG59KTtcblxuY29uc3QgdXJsU3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5jb25zdCB1cmwgPSBuZXcgVVJMKHVybFN0cmluZyk7XG5jb25zdCBjYW1wYWlnbiA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdjYW1wYWlnbicpO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxucmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50KCdkYXRhJywgJ3N0dWR5IHN0YXJ0ZWQnLCAndHJ1ZScpO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxucmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50KCdkYXRhJywgJ2NhbXBhaWduJywgY2FtcGFpZ24pO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxucmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50KCdkYXRhJywgJ21vYmlsZScsIHV0aWxpdHkuaXNNb2JpbGVEZXZpY2UoKSk7XG5cbi8vIGFsbCB0aGUgQWdncmVlbWVudCBjaGFuZ2UgZWxlbWVudHMgcG9zc2libGVcbmNvbnN0IGFnZ3JlbWVudENoYW5nZUVsZW1lbnRzID0gWydhZ2dyZWUtYnV0dG9uJ107XG5cbi8vIGVsZW1lbnRzIHRvIGFkZCB0byBVSSBhZnRlciBjbGlja2luZyBvbiBhZ2dyZWUgdG9cbi8vIHBhcnRpY3BhdGUgaW4gc3R1ZHlcbmFnZ3JlbWVudENoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJBZ3JlZUNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBhbGwgdGhlIERpc2FnZ3JlZW1lbnQgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBkaXNhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cyA9IFsnZGlhZ2dyZWUtYnV0dG9uJ107XG5cbi8vIGVsZW1lbnRzIHRvIGFkZCB0byBVSSBhZnRlciBjbGlja2luZyBvbiBhZ2dyZWUgdG9cbi8vIHBhcnRpY3BhdGUgaW4gc3R1ZHlcbmRpc2FnZ3JlbWVudENoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJEaXNhZ3JlZUNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBhbGwgdGhlIHN1Ym1pdCBjaGFuZ2UgZWxlbWVudHMgcG9zc2libGVcbmNvbnN0IHN1Ym1pdENoYW5nZUVsZW1lbnRzID0gWydzdWJtaXQtYnV0dG9uLXRvLXN1cy0wJywgJ3N1Ym1pdC1idXR0b24tdG8tc3VzLTEnLCAnc3VibWl0LWJ1dHRvbi10by1zdXMtMiddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gc3VibWl0IGNoYW5nZVxuLy8gZnJvbSBvbmUgb2YgdGhyZWUgbWFwIHF1ZXN0aW9uc1xuc3VibWl0Q2hhbmdlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgaGFuZGxlcnMuYWRkSGFuZGxlclN1Ym1pdENoYW5nZUNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBhbGwgdGhlIFNVUyBjaGFuZ2UgZWxlbWVudHMgcG9zc2libGVcbmNvbnN0IHN1c0NoYW5nZUVsZW1lbnRzID0gWydzdWJtaXQtYnV0dG9uLXRvLWVuZCddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gc3VibWl0IGNoYW5nZVxuLy8gZnJvbSBvbmUgb2YgdGhyZWUgbWFwIHF1ZXN0aW9uc1xuc3VzQ2hhbmdlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgaGFuZGxlcnMuYWRkSGFuZGxlclN1Ym1pdFNVU0NsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBvbmx5IHVwZGF0ZXMgb25lIG1hcCBob3cgZG8gZ2V0IGV2ZXJ5IG1hcFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ3JpZC11cGRhdGUnLCAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgbWFwMS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICBtYXAyYS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICBtYXAyYi5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICBtYXAzQXJyWzBdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gIG1hcDNBcnJbMV0uZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgbWFwRW5kYS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICBtYXBFbmRiLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG59KTtcblxuY29uc3Qgc3VzQnRuR3JvdXBFbGVtZW50cyA9IFsnYnRuLWdyb3VwLXN1cy0xJyxcbiAgJ2J0bi1ncm91cC1zdXMtMicsXG4gICdidG4tZ3JvdXAtc3VzLTMnLFxuICAnYnRuLWdyb3VwLXN1cy00JyxcbiAgJ2J0bi1ncm91cC1zdXMtNScsXG4gICdidG4tZ3JvdXAtc3VzLTYnLFxuICAnYnRuLWdyb3VwLXN1cy03JyxcbiAgJ2J0bi1ncm91cC1zdXMtOCcsXG4gICdidG4tZ3JvdXAtc3VzLTknLFxuICAnYnRuLWdyb3VwLXN1cy0xMCddO1xuXG5zdXNCdG5Hcm91cEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIC8vIGFkZCBxdWVzdGlvbiBoYW5kbGVyXG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTVVNRdWVzdGlvbkNsaWNrKGVsZW1lbnRVSUlEKTtcbn0pO1xuXG4vLyBzdXMgcXVlc3Rpb24gc3RhdGUgaXRlbXNcbmNvbnN0IHN1c05hbWUgPSAnc3VzLXF1ZXN0aW9uLSc7XG5jb25zdCBzdXNJdGVyYXRpb25zID0gMTA7XG51dGlsaXR5LnNldFN0YXRlRm9yR3JvdXAoc3VzTmFtZSwgc3VzSXRlcmF0aW9ucyk7XG5cbi8vIGFkZCBncmlkIGJveCBzdGF0ZSBpdGVtc1xuY29uc3QgZ3JpZEl0ZXJhdGlvbnMgPSA0MjtcbmNvbnN0IGdyaWROYW1lID0gJ2dyaWQtYm94LSc7XG51dGlsaXR5LnNldFN0YXRlRm9yR3JvdXAoZ3JpZE5hbWUsIGdyaWRJdGVyYXRpb25zKTtcblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBpc1N0dWR5Y29tcGxldGVkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcpO1xubGV0IHN0dWR5Q29tcGxldGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIGlzU3R1ZHljb21wbGV0ZWQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUNvbXBsZXRlZCA9IGlzU3R1ZHljb21wbGV0ZWQ7XG59IGVsc2Uge1xuICBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBjb21wbGV0ZXRpb25cbmNvbnN0IFN0dWR5QWdycmVlbWVudCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG5sZXQgc3R1ZHlBZ3JyZWVkID0gZmFsc2U7XG5pZiAodHlwZW9mIFN0dWR5QWdycmVlbWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gIHN0dWR5QWdycmVlZCA9IFN0dWR5QWdycmVlbWVudDtcbn0gZWxzZSB7XG4gIHN0dWR5QWdycmVlZCA9IGZhbHNlO1xufVxuXG4vLyBhbHJlYWR5IGFncmVlZFxuaWYgKHN0dWR5QWdycmVlZCkge1xuICAvLyBoYW5kbGVBZ3JlZUNsaWNrKCk7XG59XG5cbi8vIGhpZGUgc3R1ZHlcbmlmIChzdHVkeUNvbXBsZXRlZCkgeyAvL1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5Y29tcGxldGVkJywgdHJ1ZSk7XG59IGVsc2Uge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5Y29tcGxldGVkJywgZmFsc2UpO1xufVxuIiwiaW1wb3J0IG1hcGJveGdsIGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgTWFwYm94Q29tcGFyZSBmcm9tICdtYXBib3gtZ2wtY29tcGFyZSc7XG5pbXBvcnQgeyBwb2x5Z29uLCBmZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuaW1wb3J0IHsgVXRpbGl0eSB9IGZyb20gJy4vdXRpbGl0eSc7XG4vLyBpbXBvcnQgc3F1YXJlR3JpZCBmcm9tICdAdHVyZi9zcXVhcmUtZ3JpZCc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IFNxdWFyZUdyaWRHZW9KU09OIGZyb20gJy4vc3F1YXJlLWdyaWQtZ2VvanNvbi5qc29uJztcblxuY29uc3Qgc3luY01vdmUgPSByZXF1aXJlKCdAbWFwYm94L21hcGJveC1nbC1zeW5jLW1vdmUnKTtcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgdXRpbGl0eSA9IG5ldyBVdGlsaXR5KCk7XG5cbmV4cG9ydCBjbGFzcyBNYXBCb3hDb25maWcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRlZmF1bHRNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJztcbiAgICB0aGlzLmRlZmF1bHRNYXBDZW50ZXIgPSBbLTgyLjU3MCwgMzUuNTYwXTsgLy8gc3RhcnRpbmcgcG9zaXRpb24gW2xuZywgbGF0XVxuICAgIHRoaXMuZGVmYXVsdE1hcFpvb20gPSAxMDsgLy8gc3RhcnRpbmcgem9vbVxuICAgIHRoaXMuZGVmYXVsdE1hcENvbnRhaW5lciA9ICdtYXAnO1xuICAgIHRoaXMuZGFya01hcFN0eWxlID0gJ21hcGJveDovL3N0eWxlcy9tYXBib3gvZGFyay12MTAnO1xuICAgIHRoaXMubGlnaHRNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L2xpZ2h0LXYxMCc7XG4gICAgdGhpcy5tYXBib3hnbCA9IG1hcGJveGdsO1xuICAgIHRoaXMuTWFwYm94Q29tcGFyZSA9IE1hcGJveENvbXBhcmU7XG4gICAgdGhpcy5tYXBib3hnbC5hY2Nlc3NUb2tlbiA9ICdway5leUoxSWpvaVpHRjJaV2x6YlNJc0ltRWlPaUpDZGpVeFQwRnpJbjAuVjlvSWtfd1VjNHVadTdVQmJsUjhtdyc7XG4gICAgdGhpcy5xdWlldCA9IHRydWU7XG4gICAgdGhpcy5tYXAxID0gbnVsbDtcbiAgICB0aGlzLm1hcDIgPSBudWxsO1xuICAgIHRoaXMuZGVmYXVsdEdyZXlCb3ggPSAnIzU1NTU1NSc7XG4gICAgdGhpcy5zZWxlY3RlZEJveCA9ICcjRkJCMDNCJztcbiAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gU3F1YXJlR3JpZEdlb0pTT047XG4gICAgdGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUgPSBbXG4gICAgICAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL25sY2QtMjAxNi0zMC97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9ubGNkLTIwMDEtMzAve3p9L3t4fS97eX0ucG5nJ1xuICAgIF07XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04pO1xuICB9XG5cbiAgLy8gU2V0cyBhbiBpbmRpdmlkdWFsIG1hcGJveCBtYXAgdGVzdFxuICAvL1xuICAvLyBAcGFyYW0gbWFwQ29udGFpbmVyIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gbmV3IG1hcGJveCBtYXAgb2JqZWN0XG4gIG1ha2VNYXAobWFwQ29udGFpbmVyID0gdGhpcy5kZWZhdWx0TWFwQ29udGFpbmVyLCBtYXBJbmRleCA9IDApIHtcbiAgICBjb25zdCBtYXAgPSBuZXcgdGhpcy5tYXBib3hnbC5NYXAoe1xuICAgICAgY29udGFpbmVyOiBtYXBDb250YWluZXIsXG4gICAgICBzdHlsZTogdGhpcy5saWdodE1hcFN0eWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmRlZmF1bHRNYXBDZW50ZXIsXG4gICAgICB6b29tOiB0aGlzLmRlZmF1bHRNYXBab29tLFxuICAgICAgc2hvd1pvb206IHRydWUsXG4gICAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgICBrZXliaW5kaW5nczogdHJ1ZVxuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIG1hcC5hZGRMYXllcihNYXBCb3hDb25maWcubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCBtYXBJbmRleCkpO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgdGhpcy5hZGRHcmlkQ2xpY2sobWFwKTtcbiAgICAgIG1hcC5yZXNpemUoKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgLy8gU2V0cyB1cCBhbmltYXRlZCBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG1hcENvbnRhaW5lciAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIG5ldyBtYXBib3ggbWFwIG9iamVjdFxuICBtYWtlQW5pbWF0ZU1hcChtYXBDb250YWluZXIgPSB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIpIHtcbiAgICBjb25zdCBtYXAgPSBuZXcgdGhpcy5tYXBib3hnbC5NYXAoe1xuICAgICAgY29udGFpbmVyOiBtYXBDb250YWluZXIsXG4gICAgICBzdHlsZTogdGhpcy5saWdodE1hcFN0eWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmRlZmF1bHRNYXBDZW50ZXIsXG4gICAgICB6b29tOiB0aGlzLmRlZmF1bHRNYXBab29tLFxuICAgICAgc2hvd1pvb206IHRydWUsXG4gICAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgICBrZXliaW5kaW5nczogdHJ1ZVxuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdsb2FkJywgKGUpID0+IHtcbiAgICAgIG1hcC5hZGRMYXllcihNYXBCb3hDb25maWcubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAwKSk7XG4gICAgICBtYXAuYWRkTGF5ZXIoTWFwQm94Q29uZmlnLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgMSkpO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgdGhpcy5hZGRHcmlkQ2xpY2sobWFwKTtcbiAgICAgIG1hcC5yZXNpemUoKTtcblxuICAgICAgY29uc3QgaW5kZXhDb3VudCA9IDI7XG4gICAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGluZGV4ID0gKGluZGV4ICsgMSkgJSBpbmRleENvdW50O1xuICAgICAgICBpZiAoaW5kZXggPT09IDEpIHtcbiAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMScsICd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMCcsICd2aXNpYmlsaXR5JywgJ25vbmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMCcsICd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICBtYXAuc2V0TGF5b3V0UHJvcGVydHkoJ21hcC1jaGFuZ2UtMScsICd2aXNpYmlsaXR5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIG1hcC5yZXNpemUoKTtcbiAgICB9O1xuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICAvLyBtYWtlQ29tcGFyZU1hcCBTZXRzIGFuIGNvbXBhcmluZyBtYXAgXCJzd2lwaW5nXCIgbWFwYm94IG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbWFwQ29udGFpbmVyIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYXJyYXkgb2YgbWFwcyBuZXcgbWFwYm94IG1hcCBvYmplY3RcbiAgbWFrZUNvbXBhcmVNYXAobWFwQmVmb3JlQ29udGFpbmVyLCBtYXBBZnRlckNvbnRhaW5lciwgbWFwQ29tcGFyZVdyYXBwZXJJRCkge1xuICAgIGNvbnN0IGJlZm9yZU1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcEJlZm9yZUNvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmxpZ2h0TWFwU3R5bGUsXG4gICAgICBjZW50ZXI6IHRoaXMuZGVmYXVsdE1hcENlbnRlcixcbiAgICAgIHpvb206IHRoaXMuZGVmYXVsdE1hcFpvb20sXG4gICAgICBzaG93Wm9vbTogdHJ1ZSxcbiAgICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGtleWJpbmRpbmdzOiB0cnVlXG4gICAgfSk7XG5cbiAgICBjb25zdCBhZnRlck1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcEFmdGVyQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMubGlnaHRNYXBTdHlsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5kZWZhdWx0TWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5kZWZhdWx0TWFwWm9vbSxcbiAgICAgIHNob3dab29tOiB0cnVlLFxuICAgICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgICAga2V5YmluZGluZ3M6IHRydWVcbiAgICB9KTtcbiAgICBjb25zdCBjb21wYXJlID0gbmV3IHRoaXMuTWFwYm94Q29tcGFyZShiZWZvcmVNYXAsIGFmdGVyTWFwLCBgIyR7bWFwQ29tcGFyZVdyYXBwZXJJRH1gKTtcblxuICAgIGJlZm9yZU1hcC5vbignbG9hZCcsIChlKSA9PiB7XG4gICAgICBiZWZvcmVNYXAuYWRkTGF5ZXIoTWFwQm94Q29uZmlnLm1ha2VUTVNMYXllcih0aGlzLm1hcENoYW5nZUxheWVyc09uZSwgMSkpO1xuICAgICAgYmVmb3JlTWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBiZWZvcmVNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgdGhpcy5hZGRHcmlkQ2xpY2soYmVmb3JlTWFwKTtcbiAgICAgIGJlZm9yZU1hcC5yZXNpemUoKTtcbiAgICAgIGNvbXBhcmUuc2V0U2xpZGVyKDE1MCk7XG4gICAgfSk7XG5cbiAgICBhZnRlck1hcC5vbignbG9hZCcsIChlKSA9PiB7XG4gICAgICBhZnRlck1hcC5hZGRMYXllcihNYXBCb3hDb25maWcubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAwKSk7XG4gICAgICBhZnRlck1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgdGhpcy5hZGRHcmlkQ2xpY2soYWZ0ZXJNYXApO1xuICAgICAgYWZ0ZXJNYXAucmVzaXplKCk7XG4gICAgICBjb21wYXJlLnNldFNsaWRlcigxNTApO1xuICAgIH0pO1xuXG4gICAgd2luZG93Lm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBhZnRlck1hcC5yZXNpemUoKTtcbiAgICAgIGJlZm9yZU1hcC5yZXNpemUoKTtcbiAgICAgIGNvbXBhcmUuc2V0U2xpZGVyKDE1MCk7XG4gICAgfTtcbiAgICByZXR1cm4gW2JlZm9yZU1hcCwgYWZ0ZXJNYXBdO1xuICB9XG5cbiAgLy8gaW5zdGFudGlhdGVzIGEgbmF2aWdhdGlvbiBiYXIgb24gdGhlIG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkTmF2KCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5tYXBib3hnbC5OYXZpZ2F0aW9uQ29udHJvbCgpO1xuICB9XG5cbiAgLy8gc3luY3MgdHdvIG1hcHMgem9vbSBhbmQgcGFuXG4gIC8vIG1vZGlmZWQgZnJvbSBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3guanMvZXhhbXBsZS92MS4wLjAvc3luYy1sYXllci1tb3ZlbWVudC9cbiAgLy9cbiAgLy8gQHBhcmFtIG1hcDEgPSBmaXJzdCBtYXBib3ggbWFwIG9iamVjdFxuICAvLyBAcGFyYW0gbWFwMiAgPSBzZWNvbmQgbWFwYm94IG1hcCBvYmplY3RcbiAgLy8gQHJldHVybiBudWxsXG4gIHN5bk1hcHMobWFwMSwgbWFwMikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgc3luY01vdmUobWFwMSwgbWFwMik7XG4gIH1cblxuICBzdGF0aWMgbWFrZVRNU0xheWVyKG1hcENoYW5nZSwgbWFwSW5kZXgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGBtYXAtY2hhbmdlLSR7bWFwSW5kZXh9YCxcbiAgICAgIHR5cGU6ICdyYXN0ZXInLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6ICdyYXN0ZXInLFxuICAgICAgICB0aWxlczogW21hcENoYW5nZVttYXBJbmRleF1dLFxuICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgYm91bmRzOiBbLTgyLjY0NywgLTgyLjQ5OCwgMzUuNTA3LCAzNS42MTJdXG4gICAgICB9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ3Jhc3Rlci1mYWRlLWR1cmF0aW9uJzogMFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBtYWtlcyBjaGFuZ2UgZ3JpZCBsYXllciBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIG1ha2VHcmlkTGF5ZXIoKSB7XG4gICAgLy8ge1wiX3N3XCI6e1wibG5nXCI6LTgyLjY5OTE4NDM2MTM2Nzk4LFwibGF0XCI6MzUuNTAwNjk5Mzc1MjM4MX0sXG4gICAgLy8gXCJfbmVcIjp7XCJsbmdcIjotODIuNDM1OTMzODU1Njc2MzUsXCJsYXRcIjozNS42MTk2NzQ2NzYwMzE2OX1cbiAgICAvLyB9XG4gICAgLy8gY29uc3QgYmJveCA9IFstODIuNjUwLCAzNS41MDggLC04Mi40ODUsIDM1LjYyM107IC8vIHNpZGUgdG8gc2lkZSBmaXRzIHNtYWxsXG5cbiAgICAvLyB1bmNvbW1lbnQgaWYgbmVlZCB0byByZWRvbyB0aGUgcXJpZFxuICAgIC8vIGNvbnN0IGJib3ggPSBbLTgyLjY1MCwgMzUuNTA1ICwtODIuNDg1LCAzNS42MTVdO1xuICAgIC8vIGNvbnN0IGNlbGxTaWRlID0gMC42O1xuICAgIC8vIGNvbnN0IG9wdGlvbnMgPSB7dW5pdHM6ICdtaWxlcyd9O1xuICAgIC8vIGNvbnN0IHNxdWFyZUdyaWRHZW9KU09OID0gc3F1YXJlR3JpZChiYm94LCBjZWxsU2lkZSwgb3B0aW9ucyk7XG4gICAgLy8gY29uc29sZS5sb2coJ3NxdWFyZUdyaWRHZW9KU09OJywgSlNPTi5zdHJpbmdpZnkoc3F1YXJlR3JpZEdlb0pTT04pKVxuICAgIHJldHVybiB7XG4gICAgICBpZDogJ2NoYW5nZS1ncmlkJyxcbiAgICAgIHR5cGU6ICdmaWxsJyxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICAgIGRhdGE6IHRoaXMuc3F1YXJlR3JpZEdlb0pTT05cbiAgICAgIH0sXG4gICAgICBsYXlvdXQ6IHt9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2ZpbGwtY29sb3InOiBbXG4gICAgICAgICAgJ21hdGNoJyxcbiAgICAgICAgICBbJ2dldCcsICdzZWxlY3RlZCddLFxuICAgICAgICAgIDEsIHRoaXMuc2VsZWN0ZWRCb3gsXG4gICAgICAgICAgLyogb3RoZXIgKi8gdGhpcy5kZWZhdWx0R3JleUJveFxuICAgICAgICBdLFxuICAgICAgICAnZmlsbC1vcGFjaXR5JzogMC41XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIG1ha2VzIGNoYW5nZSBncmlkIGxheWVyIG9uIG1hcFxuICAvL1xuICAvLyBAcGFyYW0gbnVsbFxuICAvLyBAcmV0dXJuIG51bGxcbiAgbWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnY2hhbmdlLWdyaWQtb3V0bGluZScsXG4gICAgICB0eXBlOiAnbGluZScsXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICBkYXRhOiB0aGlzLnNxdWFyZUdyaWRHZW9KU09OXG4gICAgICB9LFxuICAgICAgbGF5b3V0OiB7XG4gICAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnLFxuICAgICAgICAnbGluZS1jYXAnOiAncm91bmQnXG4gICAgICB9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2xpbmUtY29sb3InOiB0aGlzLmRlZmF1bHRHcmV5Qm94LFxuICAgICAgICAnbGluZS13aWR0aCc6IDRcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gYWRkcyBjbGljayBvZiBncmlkIGJveCB0byBjYXB0dXJlIHdoaWNoIGdyaWQgdGhlIHVzZXJcbiAgLy8gdGhpbmtzIGNoYW5nZSBoYXBwZW5kIGluIG9yZ2luYWwgZnJvbTpcbiAgLy8gaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2V4YW1wbGUvcG9seWdvbi1wb3B1cC1vbi1jbGljay9cbiAgLy9cbiAgLy8gQHBhcmFtIG1hcCA9IG1hcGJveCBtYXAgb2JqZWN0IHRvIHVwZGF0ZSB6b29tIGFuZCBjZW50ZXIgdG9cbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEdyaWRDbGljayhtYXApIHtcbiAgICAvLyBjb25zdCBtYWtlR3JpZExheWVyID0gdGhpcy5tYWtlR3JpZExheWVyKCk7XG4gICAgLy8gV2hlbiBhIGNsaWNrIGV2ZW50IG9jY3VycyBvbiBhIGZlYXR1cmUgaW4gdGhlIHN0YXRlcyBsYXllciwgb3BlbiBhIHBvcHVwIGF0IHRoZVxuICAgIC8vIGxvY2F0aW9uIG9mIHRoZSBjbGljaywgd2l0aCBkZXNjcmlwdGlvbiBIVE1MIGZyb20gaXRzIHByb3BlcnRpZXMuXG4gICAgbWFwLm9uKCdtb3VzZWVudGVyJywgJ2NoYW5nZS1ncmlkJywgKGUpID0+IHtcbiAgICAgIG1hcC5nZXRDYW52YXMoKS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9KTtcblxuICAgIG1hcC5vbignbW91c2VsZWF2ZScsICdjaGFuZ2UtZ3JpZCcsIChlKSA9PiB7XG4gICAgICBtYXAuZ2V0Q2FudmFzKCkuc3R5bGUuY3Vyc29yID0gJyc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9KTtcblxuICAgIG1hcC5vbignY2xpY2snLCAnY2hhbmdlLWdyaWQnLCAoZSkgPT4ge1xuICAgICAgY29uc3QgZmVhdHVyZSA9IGUuZmVhdHVyZXNbMF07XG4gICAgICBjb25zdCBpZCA9IE51bWJlcihmZWF0dXJlLnByb3BlcnRpZXMuaWQpO1xuXG4gICAgICAvLyB1ZHBhdGVzIHNlbGVjdGVkIGdlb2pzb24gcHJvcGVyaXRlcy5zZWxlY3RlZCAwIG9yIDEgZGVwZW5lZGluZ1xuICAgICAgLy8gaWYgdXNlciBzZWxlY3RlZCBwb2x5Z29uXG4gICAgICBjb25zdCBuZXdGZWF0dXJlID0gTWFwQm94Q29uZmlnLnRvZ2dsZVNlbGVjdGVkRmVhdHVyZShmZWF0dXJlKTtcblxuICAgICAgLy8gY3JlYXRlIGEgbmV3IGZlYXR1cmUgY29sbGVjdGlvbiBmcm9tIHNlbGVjdGVkIGZlYXR1cmVcbiAgICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZXMgPSBNYXBCb3hDb25maWcubWFrZVNlbGVjdGVkRmVhdHVyZUdlb0pTT04obmV3RmVhdHVyZSk7XG5cbiAgICAgIC8vIHVwZGF0ZXMgc3F1YXJlR3JpZEdlb0pTT04gd2l0aCBuZXcgZ2VvanNvblxuICAgICAgY29uc3QgbmV3U3F1YXJlR3JpZEdlb0pTT04gPSBNYXBCb3hDb25maWcudXBkYXRlU3F1YXJlR3JpZFdpdGhTZWxlY3RlZEZlYXR1cmVzKHNlbGVjdGVkRmVhdHVyZXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgIC8vIHN0b3JlIG5ldyBzcXVhcmUgZ3JpZCB3aXRoIHNsZWN0ZWQgYm94ZXNcbiAgICAgIHRoaXMuc3RvcmVTcXVhcmVHcmlkKG5ld1NxdWFyZUdyaWRHZW9KU09OKTtcblxuICAgICAgLy8gdXBkYXRlIHN0YXRlIHdpdGggc2VsZWN0ZWQgZmVhdHVyZVxuICAgICAgTWFwQm94Q29uZmlnLnN0b3JlU2VsZWN0ZWRGZWF0dXJlKGlkKTtcblxuICAgICAgLy8gdGlnZ2VyIGV2ZW50IHNvIGFsbCBkYXRhIHNvdXJjZXMgdXBkYXRlXG4gICAgICB1dGlsaXR5LnRyaWdnZXJFdmVudCgnZ3JpZC11cGRhdGUnLCBpZCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyB0b2dnbGVzIHZhbHVlIHRoZSBwcm9wZXJ0aWVzIChhdHRyaWJ1dGUpIHNlbGVjdGVkXG4gIC8vICAgIHdoZW4gYSB1c2VyIGNsaWNrcyB0aGUgZ3JpZCBib3ggPiAwIHdoZW4gc2VsZWN0ZWRcbiAgLy8gICAgMCB3aGVuIHNlbGVjdGVcbiAgLy9cbiAgLy8gQHBhcmFtIGZlYXR1cmUgPSBnZW9qc29uIGZlYXR1cmUgKHBvcGVydGllcyBhbmQgZ2VvbSlcbiAgLy8gQHJldHVybiBmZWF0dXJlID0gZ2VvanNvbiBmZWF0dXJlXG4gIHN0YXRpYyB0b2dnbGVTZWxlY3RlZEZlYXR1cmUoZmVhdHVyZSkge1xuICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMuc2VsZWN0ZWQgPT09IDApIHtcbiAgICAgIGZlYXR1cmUucHJvcGVydGllcy5zZWxlY3RlZCA9IDE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLnNlbGVjdGVkID0gMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cbiAgICByZXR1cm4gZmVhdHVyZTtcbiAgfVxuXG4gIC8vIHNldHMgdGhlIHNlbGVjdGVkIGZlYXR1cmUgaW4gc3RhdGUgPiAwIHdoZW4gc2VsZWN0ZWRcbiAgLy8gICAgMCB3aGVuIHNlbGVjdGVcbiAgLy9cbiAgLy8gQHBhcmFtIGlkID0gbnVtYmVyIHdoaWNoIHJlcHJlc2VudHMgdGhlIGZlYXR1cmUgaWRcbiAgLy8gQHJldHVybiBudWxsXG4gIHN0YXRpYyBzdG9yZVNlbGVjdGVkRmVhdHVyZShpZCkge1xuICAgIGNvbnN0IGdyaWROYW1lID0gJ2dyaWQtYm94LSc7XG4gICAgLy8gemVybyBvdXQgXCJ0b2dnbGUgb2ZmXCIgaWYgZ3JpZCBpZCBleGlzdHMgc3RhdGUgaXRlbVxuICAgIGlmIChzdG9yZS5nZXRTdGF0ZUl0ZW0oYCR7Z3JpZE5hbWV9JHtpZH1gKSA+IDApIHtcbiAgICAgIHN0b3JlLnNldFN0YXRlSXRlbShgJHtncmlkTmFtZX0ke2lkfWAsIDApO1xuICAgIC8vIGFkZCBcInRvZ2dsZSBvblwiIGlmICBzdGF0ZSBpdGVtID4gMCBvciBub3Qgc2VsZWN0ZWRcbiAgICB9IGVsc2Uge1xuICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKGAke2dyaWROYW1lfSR7aWR9YCwgTnVtYmVyKGlkKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gbWFrZXMgdGhlIHNlbGVjdGVkIGZlYXR1cmUgYSBuZXcgZmVhdHVyZSBjb2xsZWN0aW9uXG4gIC8vXG4gIC8vIEBwYXJhbSBmZWF0dXJlID0gZ2VvanNvbiBmZWF0dXJlIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24gKGZyb20gdHVyZi5qcylcbiAgc3RhdGljIG1ha2VTZWxlY3RlZEZlYXR1cmVHZW9KU09OKGZlYXR1cmUpIHtcbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oW3BvbHlnb24oZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcywgZmVhdHVyZS5wcm9wZXJ0aWVzKV0pO1xuICB9XG5cbiAgLy8gdXBkYXRlcyB0aGUgU3F1YXJlR3JpZEdlb0pTT04gYWZ0ZXIgbWVyZ2luZyBhbmQgcmVjb25jaWxpbmdcbiAgLy8gICAgd2l0aCB0aGUgc2VsZWN0ZWQgZmVhdXR1cmVzXG4gIC8vXG4gIC8vIEBwYXJhbSBzZWxlY3RlZEZlYXR1cmVzID0gZ2VvanNvbiBmZWF0dXJlY29sbGVjdG9uIHJlcHJlc2VudGluZyB0aGUgc2VsZWN0ZWRcbiAgLy8gICAgICAgIGZlYXR1cmVzIChwb3BlcnRpZXMgYW5kIGdlb20pXG4gIC8vIEByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24gKGZyb20gdHVyZi5qcylcbiAgc3RhdGljIHVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyhzZWxlY3RlZEZlYXR1cmVzKSB7XG4gICAgY29uc3QgY3VycmVudFNxdWFyZUdyaWRHZW9KU09OID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgIGNvbnN0IGN1cnJlbnRGZWF0dXJlSWRzID0gc2VsZWN0ZWRGZWF0dXJlcy5mZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiBmZWF0dXJlLnByb3BlcnRpZXMuaWQpO1xuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihzZWxlY3RlZEZlYXR1cmVzLmZlYXR1cmVzLmNvbmNhdChjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04uZmVhdHVyZXMuZmlsdGVyKGZlYXR1cmUgPT4gIWN1cnJlbnRGZWF0dXJlSWRzLmluY2x1ZGVzKGZlYXR1cmUucHJvcGVydGllcy5pZCkpKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIC8vIHVwZGF0ZXMgc3RhdGUgd2l0aCB0aGUgbmV3IHZlcnNpb24gb2YgU3F1YXJlR3JpZEdlb0pTT05cbiAgLy8gICAgY29udGFpbnMgc2VsZWN0ZWQgZmVhdHVyZXMgYWxzbyAoaWYgYW55IHNlbGVjdGVkKVxuICAvL1xuICAvLyBAcGFyYW0gTmV3U3F1YXJlR3JpZEdlb0pTT04gPSBnZW9qc29uIGZlYXR1cmVjb2xsZWN0b24gcmVwcmVzZW50aW5nXG4gIC8vICAgICAgICAgICAgICAgIHRoZSBuZXcgZmVhdHVyZXMgKHBvcGVydGllcyBhbmQgZ2VvbSlcbiAgLy8gQHJldHVybiBudWxsXG4gIHN0b3JlU3F1YXJlR3JpZChOZXdTcXVhcmVHcmlkR2VvSlNPTikge1xuICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBOZXdTcXVhcmVHcmlkR2VvSlNPTjtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgTmV3U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCBkYXRhcGkgPSAnaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4UlA5UFZDU0o3WW80X1hZdHFrenVTcEhmMGNPQW4xbm9GS2pkcW5mZkJmUzJaRXp3L2V4ZWMnO1xuXG5leHBvcnQgY2xhc3MgUmVjb3JkU3R1ZHlEYXRhIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mb28gPSB7fTtcbiAgfVxuXG4gIHNldEV2ZW50KGFjdGlvbiA9ICcnLCBjYXRlZ29yeSA9ICcnLCBsYWJlbCA9ICcnLCB2YWx1ZSA9IDApIHtcbiAgICAvLyBnZXQgdmFycmlhYmxlcyBmb3JcbiAgICB0aGlzLnV1aWQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKS50b1N0cmluZygpO1xuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICB0aGlzLmRhdGEgPSBsYWJlbDtcbiAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG5cbiAgICAvLyBzdHVkeSB0byBKU09OXG4gICAgY29uc3QganNvbmRhdGEgPSB7XG4gICAgICB1dWlkOiB0aGlzLnV1aWQsXG4gICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeSxcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgIGRhdGU6IHRoaXMuZGF0ZVxuICAgIH07XG5cbiAgICBjb25zdCBkYXRhQVBJVVJMID0gbmV3IFVSTChkYXRhcGkpO1xuICAgIGRhdGFBUElVUkwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhqc29uZGF0YSk7XG4gICAgZmV0Y2goZGF0YUFQSVVSTCk7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCB7IFN0b3JhZ2VBUEkgfSBmcm9tICcuL2xvY2FsU3RvcmFnZUFQSSc7XG5cbi8qKlxuKiBUaGlzIGNvbXBvbmVudCBpcyBpbnRlbmRlZCB0byBoYW5kbGUgdGhlIHN0b3JhZ2UgYW5kIHJldHJpZXZhbCBvZiB0aGUgc3RhdGUgb2ZcbiogQXMgb2YgdGhpcyB3cml0aW5nIGl0IGlzIHVzaW5nIGxvY2FsU3RvcmFnZSB0byBkbyB0aGlzLlxuKiBVc2VzIHNpbXBsZSBjbGFzcyBpbnN0YW5jZSBtZXRob2RzIHdpdGggdGhlIHNob3J0LWhhbmQgbWV0aG9kIGRlY2xhcmF0aW9uXG4qIHBhdHRlcm4uXG4qXG4qIFRvIG5vdGU6IFRoZXJlIGlzIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBTdG9yZSBhbmQgdGhlIFN0YXRlLiBBcyBvZiAwYTMxMDZlXG4qIHRoZSBTdG9yZSBpcyBhIFN0cmluZyBzYXZlZCB0byB0aGUgYnJvd3NlcnMgbG9jYWxTdG9yYWdlIGFuZCBpcyBhIHNlcmlhbGl6ZWRcbiogdmVyc2lvbiBvZiB0aGUgU3RhdGUuIFRoZSBTdGF0ZSBpcyBhbiBPYmplY3Qgd2hpY2ggaXMgaW50ZXJhY3RlZCB3aXRoIGJ5XG4qIHBhcnNpbmcgdGhlIFN0YXRlIHN0cmluZyBmcm9tIHRoZSBTdG9yZSwgbW9kaWZ5aW5nIHRoZSByZXN1bHRzIG9mIHRoZSBwYXJzZSxcbiogYW5kIHJlLXNlcmlhbGl6aW5nIGl0IGJhY2sgdG8gdGhlIFN0b3JlLlxuKi9cbmNvbnN0IFNUQVRFX0tFWSA9ICdzdGF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gIC8vIC4uYW5kIGFuIChvcHRpb25hbCkgY3VzdG9tIGNsYXNzIGNvbnN0cnVjdG9yLiBJZiBvbmUgaXNcbiAgLy8gbm90IHN1cHBsaWVkLCBhIGRlZmF1bHQgY29uc3RydWN0b3IgaXMgdXNlZCBpbnN0ZWFkOlxuICAvLyBjb25zdHJ1Y3RvcigpIHsgfVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgLy8gdGhpcy5zdG9yZSA9IG5ldyBTdG9yYWdlQVBJKCk7XG4gICAgaWYgKFN0b3JlLnN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5zdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IFNUQVRFX0tFWSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNldHMgYSBrZXkvdmFsdWUgcGFpciB0byB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZUl0ZW0oa2V5ID0gJycsIHZhbHVlID0gJycpIHtcbiAgICBjb25zdCBzdG9yZU9iaiA9IHsgW2tleV06IHZhbHVlIH07XG4gICAgY29uc3QgbmV3U3RhdGVPYmogPSB7IC4uLnRoaXMuZ2V0U3RhdGUoKSwgLi4uc3RvcmVPYmogfTtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlT2JqKTtcbiAgICByZXR1cm4gbmV3U3RhdGVPYmo7XG4gIH1cblxuICAvLyBEZWxldGUgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vICEvLyBXQVJOSU5HOiBvbmx5IGRvZXMgYSBzaGFsbG93IGRlbGV0ZVxuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGRlbGV0ZVN0YXRlSXRlbShrZXkgPSAnJykge1xuICAgIGNvbnN0IHN0b3JlT2JqID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgIGRlbGV0ZSBzdG9yZU9ialtrZXldO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RvcmVPYmopO1xuICAgIHJldHVybiBzdG9yZU9iajtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIGVudGlyZSBzdGF0ZSBvYmplY3RcbiAgLy9cbiAgLy8gQHJldHVybiBvYmplY3RcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpID8gSlNPTi5wYXJzZSh0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSkgOiB7fTtcbiAgfVxuXG4gIC8vIEdldHMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0SXRlbShrZXkgPSAnJykge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0l0ZW0oa2V5KSA/IHRoaXMuZ2V0U3RhdGUoKVtrZXldIDoge307XG4gIH1cblxuICAvLyBTZXRzIGEgbmV3IHN0YXRlIG9iamVjdCBzdGF0ZVxuICAvL1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGUodmFsdWUgPSB7fSkge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFNUQVRFX0tFWSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgPyBKU09OLnBhcnNlKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKSA6IHt9O1xuICB9XG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBzdGF0ZSBleGlzdHMgaW4gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgY2hlY2tTdGF0ZUV4aXN0cygpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSk7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBzdGF0ZSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyXG4gIC8vXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldFN0YXRlQXNTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW4gaXRlbSBoYXMgYmVlbiBzYXZlZCB0byB0aGUgc3RvcmVcbiAgLy8gdW51c2VkIGFzIG9mIDBhMzEwNmVcbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGlzU3RhdGVJdGVtRXhpc3QoaXRlbSkge1xuICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSkge1xuICAgICAgY29uc3Qgc3RhdGVTdHIgPSB0aGlzLmdldFN0YXRlQXNTdHJpbmcoKTtcbiAgICAgIGlmIChzdGF0ZVN0ci5pbmRleE9mKGl0ZW0pID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGNoZWNrSXRlbShpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpICYmIHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpLmluZGV4T2YoaXRlbSkgPiAwO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIGF2YWlsYWJsZS5cbiAgLy8gVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX1N0b3JhZ2VfQVBJL1VzaW5nX3RoZV9XZWJfU3RvcmFnZV9BUElcbiAgLy9cbiAgLy8gQHJldHVybiBib29sZWFuXG4gIHN0YXRpYyBzdG9yYWdlQXZhaWxhYmxlKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnbG9jYWxTdG9yYWdlJztcbiAgICBsZXQgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICBzdG9yYWdlLmxlbmd0aCAhPT0gMDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBSZWNvcmRTdHVkeURhdGEgfSBmcm9tICcuL3JlY29yZC1zdHVkeS1kYXRhJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgcmVjb3JkU3R1ZHlEYXRhID0gbmV3IFJlY29yZFN0dWR5RGF0YSgpO1xuXG5leHBvcnQgY2xhc3MgVXRpbGl0eSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9vID0ge307XG4gICAgdGhpcy5jaGVjayA9IGZhbHNlO1xuICB9XG5cbiAgLy8gY2hlY2tzIGlzIEphdmFzY3JpcHQgb2JqZWN0IGlzIGEgdmFsaWQgb2JqZWN0XG4gIC8vXG4gIC8vIEBwYXJhbSBvYmogLSBvYmplY3RcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGNoZWNrVmFsaWRPYmplY3Qob2JqKSB7XG4gICAgdGhpcy5vYmogPSBvYmo7XG4gICAgaWYgKHRoaXMub2JqID09PSB1bmRlZmluZWQgfHwgdGhpcy5vYmogPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ3N0cmluZycgJiYgdGhpcy5vYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBjcmVhdGVzIGEgdXVpZFxuICAvL1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICB1dWlkKCkge1xuICAgIHRoaXMuY3J5cHRvID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoNCkpLmpvaW4oJy0nKTtcbiAgICByZXR1cm4gdGhpcy5jcnlwdG87XG4gIH1cblxuICAvLyBjaGVja3MgaWYgY3VycmVudCBkZXZpY2UgaXMgYSBtb2JpbGVcbiAgLy9cbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGlzTW9iaWxlRGV2aWNlKCkge1xuICAgIHRoaXMuY2hlY2sgPSBmYWxzZTtcbiAgICAoZnVuY3Rpb24oYSl7aWYoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWlub3xhbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsay9pLnRlc3QoYSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCw0KSkpIHJldHVybiB0cnVlO30pKG5hdmlnYXRvci51c2VyQWdlbnR8fG5hdmlnYXRvci52ZW5kb3J8fHdpbmRvdy5vcGVyYSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gdGhpcy5jaGVjaztcbiAgfVxuXG4gIC8vIGNoZWNrcyBodG1sIGFzIGEgdGVtcGxhdGUvYmxvY2tcbiAgLy9cbiAgLy8gQHBhcmFtIHBsYWNlSG9sZGVyRWxlbWVudElEIC0gSFRNTCBlbGVtZW50IElEIHRoYXQgd2lsbCBob2xkIHRoZSB0ZW1wbGF0ZVxuICAvLyBAcGFyYW0gdGVtcGxhdGUgLSBIVE1MIGNvbnRlbnRcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGxvYWRIVE1MQmxvY2socGxhY2VIb2xkZXJFbGVtZW50SUQsIHRlbXBsYXRlKSB7XG4gICAgY29uc3QgY29tcG9uZW50RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYWNlSG9sZGVyRWxlbWVudElEKTtcblxuICAgIC8vIG1ha2Ugc3VyZSB0ZW1wbGF0ZSBleHNpc3RzXG4gICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICBpZiAoY29tcG9uZW50RWxlbSAhPSBudWxsKSB7XG4gICAgICAgIGNvbXBvbmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnaG1sLWJsb2NrLWxvYWRlZCcsIHBsYWNlSG9sZGVyRWxlbWVudElEKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCd1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2htbC1ibG9jay11bmxvYWRlZCcsIHBsYWNlSG9sZGVyRWxlbWVudElEKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTG9hZCB0ZW1wbGF0ZSBpbnRvIHBsYWNlaG9sZGVyIGVsZW1lbnRcbiAgICAgICAgY29tcG9uZW50RWxlbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyB0cmlnZ2VycyBhIGRvbSBldmVudFxuICAvL1xuICAvLyBAcGFyYW0gZXZlbnROYW1lIC0gc3RyaW5nIGV2ZW50IG5hbWUgZm9yIGEgbGlzdG5lciB0byBsaXN0ZW4gdG9vXG4gIC8vIEBwYXJhbSBkZXRhaWwgLSBvYmplY3QgZGV0YWlscyBmb3IgZXZlbnRcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIHRyaWdnZXJFdmVudChldmVudE5hbWUsIGRldGFpbCkge1xuICAgIHRoaXMuZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgeyBkZXRhaWwgfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aGlzLmV2ZW50KTtcbiAgfVxuXG4gIC8vIGl0ZXJhdGVzIHggbnVtYmVyIG9mIGl0ZXJhdGlvbnMgYW5kIHdyaXRlcyBhXG4gIC8vIGEgZGVmYXVsdCB6ZXJvIHZhbHVlIHN0YXRlIGtleVxuICAvL1xuICAvLyBAcGFyYW0gZXZlbnROYW1lIC0gc3RyaW5nIGV2ZW50IG5hbWUgZm9yIGEgbGlzdG5lciB0byBsaXN0ZW4gdG9vXG4gIC8vIEBwYXJhbSBkZXRhaWwgLSBvYmplY3QgZGV0YWlscyBmb3IgZXZlbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHNldFN0YXRlRm9yR3JvdXAoc3RhdGV0ZXh0LCBpdGVyYXRpb25zKSB7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YCwgMCk7XG4gICAgaWYgKGl0ZXJhdGlvbnMgPiAwKSB7XG4gICAgICBjb25zdCBuZXh0SXRlcmF0aW9uID0gaXRlcmF0aW9ucyAtIDE7XG4gICAgICB0aGlzLnNldFN0YXRlRm9yR3JvdXAoc3RhdGV0ZXh0LCBuZXh0SXRlcmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvLyBpdGVyYXRlcyB4IG51bWJlciBvZiBpdGVyYXRpb25zIGFuZCB3cml0ZXMgdG8gdGhlIEFQSVxuICAvL1xuICAvLyBAcGFyYW0gZXZlbnROYW1lIC0gc3RyaW5nIGV2ZW50IG5hbWUgZm9yIGEgbGlzdG5lciB0byBsaXN0ZW4gdG9vXG4gIC8vIEBwYXJhbSBkZXRhaWwgLSBvYmplY3QgZGV0YWlscyBmb3IgZXZlbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHNldEFQSUZvckdyb3VwKHN0YXRldGV4dCwgaXRlcmF0aW9ucywgdmFsdWVBcnJheSA9IFtdKSB7XG4gICAgY29uc3Qga2V5ID0gYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gO1xuICAgIGNvbnN0IHZhbHVlID0gc3RvcmUuZ2V0U3RhdGVJdGVtKGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YCk7XG4gICAgLy8gY2FwdHVyZSBpbiBhcnJheSBzbyB3ZSBjYW4gd3JpdGUgY29tcGx0ZWQgYXJyYXkgdG8gYXBpXG4gICAgdmFsdWVBcnJheS5wdXNoKHsga2V5LCB2YWx1ZSB9KTtcbiAgICBpZiAoaXRlcmF0aW9ucyA+IDApIHtcbiAgICAgIGNvbnN0IG5leHRJdGVyYXRpb24gPSBpdGVyYXRpb25zIC0gMTtcbiAgICAgIHRoaXMuc2V0QVBJRm9yR3JvdXAoc3RhdGV0ZXh0LCBuZXh0SXRlcmF0aW9uLCB2YWx1ZUFycmF5KTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyB3cml0ZSBjb21wbHRlZCBhcnJheSB0byBhcGlcbiAgICAvLyBjb25zdCBzcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTsgLy8gdG8gYmlnIHRvIHdyaXRlIDooXG4gICAgLy8gcmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50KCdkYXRhJywgJ2dpcmRnZW9qc29uJywgSlNPTi5zdHJpbmdpZnkoc3F1YXJlR3JpZEdlb0pTT04pKTtcbiAgICByZWNvcmRTdHVkeURhdGEuc2V0RXZlbnQoJ2RhdGEnLCAnZ3JpZGFuc3dlcnMnLCBKU09OLnN0cmluZ2lmeSh2YWx1ZUFycmF5KSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdncmlkYW5zd2VycycsIHZhbHVlQXJyYXkpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9