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
/******/ 	var hotCurrentHash = "a43fce3eec4d836ba14d";
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

module.exports = "<div id=\"study-progress-map-0\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    The map below contains two images that are different. The two images\n    will turn on and off at a regular interval. Click on any box where you\n    believe the two images are different. The boxes you click on will change\n    orange and will become your answers when you click submit. Clicking on an\n    orange box will remove it from your selection.\n  </div>\n  <div id=\"step1-directions\" class=\"step-directions for-sat w-100 d-flex mt-1\">\n    Only select areas of major change.\n  </div>\n\n\n  <div id=\"map-holder-1\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-1\" class=\"row h-100 justify-content-center\">\n      <div id=\"map-1\" class=\"my-3 mx-3\"></div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-0\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-2.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-2.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-1\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    The two maps below contain images that are different. Click on any boxes where\n    you believe the two images are different. The boxes you click on will change\n    orange and will become your answers when you click submit. Clicking on an\n    orange box will remove it from your selection.\n  </div>\n  <div id=\"step1-directions\" class=\"step-directions for-sat w-100 d-flex mt-1\">\n    Only select areas of major change.\n  </div>\n\n  <div id=\"map-holder-2\" class=\"start-map w-100 d-flex ml-3 mt-3\">\n    <div id=\"map-inner-holder-2\" class=\"row h-100 justify-content-center\">\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2a\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2a\"></div>\n      </div>\n      <div class=\"col-12 col-md-6 dualmaps d-flex\">\n        <div id=\"map-2b\" class=\"my-3 mx-0 mx-sm-0 mx-md-3 map-2b\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-1\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

/***/ }),

/***/ "./src/content-blocks/block-study-question-3.html":
/*!********************************************************!*\
  !*** ./src/content-blocks/block-study-question-3.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"study-progress-map-2\" class=\"h-auto w-100 d-none\">\n  <div id=\"page-title\" class=\"page-title w-100 d-flex\">Whats Changed?</div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 1 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    The map below contains two images that are different. Drag the vertical bar side-to-side\n    to reveal the images. Click on any box where you believe the two images are different. The\n    boxes you click on will change orange and will become your answers when you click\n    submit. Clicking on an orange box will remove it from your selection.\n  </div>\n  <div id=\"step1-directions\" class=\"step-directions for-sat w-100 d-flex mt-1\">\n    Only select areas of major change.\n  </div>\n\n  <div id=\"map-holder-3\" class=\"start-map w-100 d-flex mt-3\">\n    <div id=\"map-inner-holder-3\" class=\"row h-100 justify-content-center compare\">\n      <div id='compare-wrapper'>\n        <div id=\"map-3a\" class=\"mx-3\"></div>\n        <div id=\"map-3b\" class=\"mx-3\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"step1-title\" class=\"step-title w-100 d-flex mt-3\">Step 2 of 3</div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex mt-1\">\n    Submit the selected boxes (in orange) as your answer.\n  </div>\n\n  <div id=\"step1-directions\" class=\"step-directions w-100 d-flex justify-content-start mt-3\">\n    <button id=\"submit-button-to-sus-2\" type=\"button\" class=\"btn btn-light btn-draw-circle w-100 align-self-end\" data-toggle=\"tooltip\" data-html=\"true\" title=\"Submit and go to survey.\">\n      Submit\n    </button>\n  </div>\n\n</div>\n";

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
        url: 'https://daveism.github.io/change-research/dist/maps/lakemead_1/{z}/{x}/{y}.png',
        minzoom: 1,
        maxzoom: 14,
        scheme: 'tms',
        tileSize: 256,
        bounds: [-114.899, 36.0795, -114.750, 36.183],
        maxbounds: [-114.955, 36.034, -114.694, 36.228]
      }, {
        url: 'https://daveism.github.io/change-research/dist/maps/lakemead_2/{z}/{x}/{y}.png',
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

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.9297282558553,29.77495644902612],[-95.91906092865867,29.77495644902612],[-95.91906092865867,29.766272554037492],[-95.91906092865867,29.757588659048864],[-95.9297282558553,29.757588659048864],[-95.94039558305192,29.757588659048864],[-95.94039558305192,29.766272554037492],[-95.94039558305192,29.77495644902612],[-95.9297282558553,29.77495644902612]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.9297282558553,29.757588659048864],[-95.91906092865867,29.757588659048864],[-95.91906092865867,29.748904764060235],[-95.91906092865867,29.740220869071607],[-95.9297282558553,29.740220869071607],[-95.94039558305192,29.740220869071607],[-95.94039558305192,29.748904764060235],[-95.94039558305192,29.757588659048864],[-95.9297282558553,29.757588659048864]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.722853079094342],[-95.94039558305192,29.731536974082978],[-95.94039558305192,29.740220869071607],[-95.9297282558553,29.740220869071607],[-95.91906092865867,29.740220869071607],[-95.91906092865867,29.731536974082978],[-95.91906092865867,29.722853079094342],[-95.9297282558553,29.722853079094342],[-95.94039558305192,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.705485289117092],[-95.94039558305192,29.71416918410572],[-95.94039558305192,29.722853079094342],[-95.9297282558553,29.722853079094342],[-95.91906092865867,29.722853079094342],[-95.91906092865867,29.71416918410572],[-95.91906092865867,29.705485289117092],[-95.9297282558553,29.705485289117092],[-95.94039558305192,29.705485289117092]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.688117499139835],[-95.94039558305192,29.696801394128464],[-95.94039558305192,29.705485289117092],[-95.9297282558553,29.705485289117092],[-95.91906092865867,29.705485289117092],[-95.91906092865867,29.696801394128464],[-95.91906092865867,29.688117499139835],[-95.9297282558553,29.688117499139835],[-95.94039558305192,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.94039558305192,29.67074970916258],[-95.94039558305192,29.679433604151207],[-95.94039558305192,29.688117499139835],[-95.9297282558553,29.688117499139835],[-95.91906092865867,29.688117499139835],[-95.91906092865867,29.679433604151207],[-95.91906092865867,29.67074970916258],[-95.9297282558553,29.67074970916258],[-95.94039558305192,29.67074970916258]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.91906092865867,29.757588659048864],[-95.91906092865867,29.766272554037492],[-95.91906092865867,29.77495644902612],[-95.90839360146204,29.77495644902612],[-95.89772627426541,29.77495644902612],[-95.89772627426541,29.766272554037492],[-95.89772627426541,29.757588659048864],[-95.90839360146204,29.757588659048864],[-95.91906092865867,29.757588659048864]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.88705894706878,29.77495644902612],[-95.87639161987215,29.77495644902612],[-95.87639161987215,29.766272554037492],[-95.87639161987215,29.757588659048864],[-95.88705894706878,29.757588659048864],[-95.89772627426541,29.757588659048864],[-95.89772627426541,29.766272554037492],[-95.89772627426541,29.77495644902612],[-95.88705894706878,29.77495644902612]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.757588659048864],[-95.87639161987215,29.766272554037492],[-95.87639161987215,29.77495644902612],[-95.86572429267552,29.77495644902612],[-95.8550569654789,29.77495644902612],[-95.8550569654789,29.766272554037492],[-95.8550569654789,29.757588659048864],[-95.86572429267552,29.757588659048864],[-95.87639161987215,29.757588659048864]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.757588659048864],[-95.8550569654789,29.766272554037492],[-95.8550569654789,29.77495644902612],[-95.84438963828227,29.77495644902612],[-95.83372231108564,29.77495644902612],[-95.83372231108564,29.766272554037492],[-95.83372231108564,29.757588659048864],[-95.84438963828227,29.757588659048864],[-95.8550569654789,29.757588659048864]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.82305498388901,29.77495644902612],[-95.81238765669238,29.77495644902612],[-95.81238765669238,29.766272554037492],[-95.81238765669238,29.757588659048864],[-95.82305498388901,29.757588659048864],[-95.83372231108564,29.757588659048864],[-95.83372231108564,29.766272554037492],[-95.83372231108564,29.77495644902612],[-95.82305498388901,29.77495644902612]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.81238765669238,29.757588659048864],[-95.81238765669238,29.766272554037492],[-95.81238765669238,29.77495644902612],[-95.80172032949575,29.77495644902612],[-95.79105300229912,29.77495644902612],[-95.79105300229912,29.766272554037492],[-95.79105300229912,29.757588659048864],[-95.80172032949575,29.757588659048864],[-95.81238765669238,29.757588659048864]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.81238765669238,29.740220869071607],[-95.81238765669238,29.748904764060235],[-95.81238765669238,29.757588659048864],[-95.80172032949575,29.757588659048864],[-95.79105300229912,29.757588659048864],[-95.79105300229912,29.748904764060235],[-95.79105300229912,29.740220869071607],[-95.80172032949575,29.740220869071607],[-95.81238765669238,29.740220869071607]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.740220869071607],[-95.79105300229912,29.740220869071607],[-95.79105300229912,29.731536974082978],[-95.79105300229912,29.722853079094342],[-95.80172032949575,29.722853079094342],[-95.81238765669238,29.722853079094342],[-95.81238765669238,29.731536974082978],[-95.81238765669238,29.740220869071607],[-95.80172032949575,29.740220869071607]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.722853079094342],[-95.79105300229912,29.722853079094342],[-95.79105300229912,29.71416918410572],[-95.79105300229912,29.705485289117092],[-95.80172032949575,29.705485289117092],[-95.81238765669238,29.705485289117092],[-95.81238765669238,29.71416918410572],[-95.81238765669238,29.722853079094342],[-95.80172032949575,29.722853079094342]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.705485289117092],[-95.79105300229912,29.705485289117092],[-95.79105300229912,29.696801394128464],[-95.79105300229912,29.688117499139835],[-95.80172032949575,29.688117499139835],[-95.81238765669238,29.688117499139835],[-95.81238765669238,29.696801394128464],[-95.81238765669238,29.705485289117092],[-95.80172032949575,29.705485289117092]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.80172032949575,29.688117499139835],[-95.79105300229912,29.688117499139835],[-95.79105300229912,29.679433604151207],[-95.79105300229912,29.67074970916258],[-95.80172032949575,29.67074970916258],[-95.81238765669238,29.67074970916258],[-95.81238765669238,29.679433604151207],[-95.81238765669238,29.688117499139835],[-95.80172032949575,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.90839360146204,29.688117499139835],[-95.89772627426541,29.688117499139835],[-95.89772627426541,29.679433604151207],[-95.89772627426541,29.67074970916258],[-95.90839360146204,29.67074970916258],[-95.91906092865867,29.67074970916258],[-95.91906092865867,29.679433604151207],[-95.91906092865867,29.688117499139835],[-95.90839360146204,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.67074970916258],[-95.89772627426541,29.679433604151207],[-95.89772627426541,29.688117499139835],[-95.88705894706878,29.688117499139835],[-95.87639161987215,29.688117499139835],[-95.87639161987215,29.679433604151207],[-95.87639161987215,29.67074970916258],[-95.88705894706878,29.67074970916258],[-95.89772627426541,29.67074970916258]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.67074970916258],[-95.87639161987215,29.679433604151207],[-95.87639161987215,29.688117499139835],[-95.86572429267552,29.688117499139835],[-95.8550569654789,29.688117499139835],[-95.8550569654789,29.679433604151207],[-95.8550569654789,29.67074970916258],[-95.86572429267552,29.67074970916258],[-95.87639161987215,29.67074970916258]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.84438963828227,29.688117499139835],[-95.83372231108564,29.688117499139835],[-95.83372231108564,29.679433604151207],[-95.83372231108564,29.67074970916258],[-95.84438963828227,29.67074970916258],[-95.8550569654789,29.67074970916258],[-95.8550569654789,29.679433604151207],[-95.8550569654789,29.688117499139835],[-95.84438963828227,29.688117499139835]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.67074970916258],[-95.83372231108564,29.679433604151207],[-95.83372231108564,29.688117499139835],[-95.82305498388901,29.688117499139835],[-95.81238765669238,29.688117499139835],[-95.81238765669238,29.679433604151207],[-95.81238765669238,29.67074970916258],[-95.82305498388901,29.67074970916258],[-95.83372231108564,29.67074970916258]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.91906092865867,29.740220869071607],[-95.91906092865867,29.748904764060235],[-95.91906092865867,29.757588659048864],[-95.90839360146204,29.757588659048864],[-95.89772627426541,29.757588659048864],[-95.89772627426541,29.748904764060235],[-95.89772627426541,29.740220869071607],[-95.90839360146204,29.740220869071607],[-95.91906092865867,29.740220869071607]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.688117499139835],[-95.83372231108564,29.696801394128464],[-95.83372231108564,29.705485289117092],[-95.82305498388901,29.705485289117092],[-95.81238765669238,29.705485289117092],[-95.81238765669238,29.696801394128464],[-95.81238765669238,29.688117499139835],[-95.82305498388901,29.688117499139835],[-95.83372231108564,29.688117499139835]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.748904764060235],[-95.83372231108564,29.757588659048864],[-95.82305498388901,29.757588659048864],[-95.81238765669238,29.757588659048864],[-95.81238765669238,29.748904764060235],[-95.81238765669238,29.740220869071607],[-95.82305498388901,29.740220869071607],[-95.83372231108564,29.740220869071607],[-95.83372231108564,29.748904764060235]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.90839360146204,29.705485289117092],[-95.89772627426541,29.705485289117092],[-95.89772627426541,29.696801394128464],[-95.89772627426541,29.688117499139835],[-95.90839360146204,29.688117499139835],[-95.91906092865867,29.688117499139835],[-95.91906092865867,29.696801394128464],[-95.91906092865867,29.705485289117092],[-95.90839360146204,29.705485289117092]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.91906092865867,29.722853079094342],[-95.91906092865867,29.731536974082978],[-95.91906092865867,29.740220869071607],[-95.90839360146204,29.740220869071607],[-95.89772627426541,29.740220869071607],[-95.89772627426541,29.731536974082978],[-95.89772627426541,29.722853079094342],[-95.90839360146204,29.722853079094342],[-95.91906092865867,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-95.90839360146204,29.722853079094342],[-95.89772627426541,29.722853079094342],[-95.89772627426541,29.71416918410572],[-95.89772627426541,29.705485289117092],[-95.90839360146204,29.705485289117092],[-95.91906092865867,29.705485289117092],[-95.91906092865867,29.71416918410572],[-95.91906092865867,29.722853079094342],[-95.90839360146204,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.83372231108564,29.71416918410572],[-95.83372231108564,29.722853079094342],[-95.82305498388901,29.722853079094342],[-95.81238765669238,29.722853079094342],[-95.81238765669238,29.71416918410572],[-95.81238765669238,29.705485289117092],[-95.82305498388901,29.705485289117092],[-95.83372231108564,29.705485289117092],[-95.83372231108564,29.71416918410572]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.82305498388901,29.740220869071607],[-95.81238765669238,29.740220869071607],[-95.81238765669238,29.731536974082978],[-95.81238765669238,29.722853079094342],[-95.82305498388901,29.722853079094342],[-95.83372231108564,29.722853079094342],[-95.83372231108564,29.731536974082978],[-95.83372231108564,29.740220869071607],[-95.82305498388901,29.740220869071607]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.740220869071607],[-95.8550569654789,29.748904764060235],[-95.8550569654789,29.757588659048864],[-95.84438963828227,29.757588659048864],[-95.83372231108564,29.757588659048864],[-95.83372231108564,29.748904764060235],[-95.83372231108564,29.740220869071607],[-95.84438963828227,29.740220869071607],[-95.8550569654789,29.740220869071607]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.740220869071607],[-95.87639161987215,29.748904764060235],[-95.87639161987215,29.757588659048864],[-95.86572429267552,29.757588659048864],[-95.8550569654789,29.757588659048864],[-95.8550569654789,29.748904764060235],[-95.8550569654789,29.740220869071607],[-95.86572429267552,29.740220869071607],[-95.87639161987215,29.740220869071607]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.748904764060235],[-95.89772627426541,29.757588659048864],[-95.88705894706878,29.757588659048864],[-95.87639161987215,29.757588659048864],[-95.87639161987215,29.748904764060235],[-95.87639161987215,29.740220869071607],[-95.88705894706878,29.740220869071607],[-95.89772627426541,29.740220869071607],[-95.89772627426541,29.748904764060235]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.722853079094342],[-95.89772627426541,29.731536974082978],[-95.89772627426541,29.740220869071607],[-95.88705894706878,29.740220869071607],[-95.87639161987215,29.740220869071607],[-95.87639161987215,29.731536974082978],[-95.87639161987215,29.722853079094342],[-95.88705894706878,29.722853079094342],[-95.89772627426541,29.722853079094342]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.86572429267552,29.740220869071607],[-95.8550569654789,29.740220869071607],[-95.8550569654789,29.731536974082978],[-95.8550569654789,29.722853079094342],[-95.86572429267552,29.722853079094342],[-95.87639161987215,29.722853079094342],[-95.87639161987215,29.731536974082978],[-95.87639161987215,29.740220869071607],[-95.86572429267552,29.740220869071607]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.722853079094342],[-95.8550569654789,29.731536974082978],[-95.8550569654789,29.740220869071607],[-95.84438963828227,29.740220869071607],[-95.83372231108564,29.740220869071607],[-95.83372231108564,29.731536974082978],[-95.83372231108564,29.722853079094342],[-95.84438963828227,29.722853079094342],[-95.8550569654789,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.705485289117092],[-95.89772627426541,29.71416918410572],[-95.89772627426541,29.722853079094342],[-95.88705894706878,29.722853079094342],[-95.87639161987215,29.722853079094342],[-95.87639161987215,29.71416918410572],[-95.87639161987215,29.705485289117092],[-95.88705894706878,29.705485289117092],[-95.89772627426541,29.705485289117092]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.86572429267552,29.722853079094342],[-95.8550569654789,29.722853079094342],[-95.8550569654789,29.71416918410572],[-95.8550569654789,29.705485289117092],[-95.86572429267552,29.705485289117092],[-95.87639161987215,29.705485289117092],[-95.87639161987215,29.71416918410572],[-95.87639161987215,29.722853079094342],[-95.86572429267552,29.722853079094342]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.705485289117092],[-95.8550569654789,29.71416918410572],[-95.8550569654789,29.722853079094342],[-95.84438963828227,29.722853079094342],[-95.83372231108564,29.722853079094342],[-95.83372231108564,29.71416918410572],[-95.83372231108564,29.705485289117092],[-95.84438963828227,29.705485289117092],[-95.8550569654789,29.705485289117092]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.8550569654789,29.688117499139835],[-95.8550569654789,29.696801394128464],[-95.8550569654789,29.705485289117092],[-95.84438963828227,29.705485289117092],[-95.83372231108564,29.705485289117092],[-95.83372231108564,29.696801394128464],[-95.83372231108564,29.688117499139835],[-95.84438963828227,29.688117499139835],[-95.8550569654789,29.688117499139835]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.87639161987215,29.688117499139835],[-95.87639161987215,29.696801394128464],[-95.87639161987215,29.705485289117092],[-95.86572429267552,29.705485289117092],[-95.8550569654789,29.705485289117092],[-95.8550569654789,29.696801394128464],[-95.8550569654789,29.688117499139835],[-95.86572429267552,29.688117499139835],[-95.87639161987215,29.688117499139835]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-95.89772627426541,29.688117499139835],[-95.89772627426541,29.696801394128464],[-95.89772627426541,29.705485289117092],[-95.88705894706878,29.705485289117092],[-95.87639161987215,29.705485289117092],[-95.87639161987215,29.696801394128464],[-95.87639161987215,29.688117499139835],[-95.88705894706878,29.688117499139835],[-95.89772627426541,29.688117499139835]]]}}]};

/***/ }),

/***/ "./src/scripts/square-grid-geojson-third.json":
/*!****************************************************!*\
  !*** ./src/scripts/square-grid-geojson-third.json ***!
  \****************************************************/
/*! exports provided: type, name, features, default */
/***/ (function(module) {

module.exports = {"type":"FeatureCollection","name":"square-grid-geojson","features":[{"type":"Feature","properties":{"row":1,"col":1,"id":1,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.88923346904315,36.18378058869747],[-114.87856614184652,36.18378058869747],[-114.87856614184652,36.175096693708845],[-114.87856614184652,36.166412798720216],[-114.88923346904315,36.166412798720216],[-114.89990079623978,36.166412798720216],[-114.89990079623978,36.175096693708845],[-114.89990079623978,36.18378058869747],[-114.88923346904315,36.18378058869747]]]}},{"type":"Feature","properties":{"row":2,"col":1,"id":2,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.88923346904315,36.166412798720216],[-114.87856614184652,36.166412798720216],[-114.87856614184652,36.15772890373159],[-114.87856614184652,36.14904500874296],[-114.88923346904315,36.14904500874296],[-114.89990079623978,36.14904500874296],[-114.89990079623978,36.15772890373159],[-114.89990079623978,36.166412798720216],[-114.88923346904315,36.166412798720216]]]}},{"type":"Feature","properties":{"row":3,"col":1,"id":3,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.131677218765695],[-114.89990079623978,36.14036111375433],[-114.89990079623978,36.14904500874296],[-114.88923346904315,36.14904500874296],[-114.87856614184652,36.14904500874296],[-114.87856614184652,36.14036111375433],[-114.87856614184652,36.131677218765695],[-114.88923346904315,36.131677218765695],[-114.89990079623978,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":1,"id":4,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.114309428788445],[-114.89990079623978,36.122993323777074],[-114.89990079623978,36.131677218765695],[-114.88923346904315,36.131677218765695],[-114.87856614184652,36.131677218765695],[-114.87856614184652,36.122993323777074],[-114.87856614184652,36.114309428788445],[-114.88923346904315,36.114309428788445],[-114.89990079623978,36.114309428788445]]]}},{"type":"Feature","properties":{"row":5,"col":1,"id":5,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.09694163881119],[-114.89990079623978,36.10562553379982],[-114.89990079623978,36.114309428788445],[-114.88923346904315,36.114309428788445],[-114.87856614184652,36.114309428788445],[-114.87856614184652,36.10562553379982],[-114.87856614184652,36.09694163881119],[-114.88923346904315,36.09694163881119],[-114.89990079623978,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":1,"id":6,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.89990079623978,36.07957384883393],[-114.89990079623978,36.08825774382256],[-114.89990079623978,36.09694163881119],[-114.88923346904315,36.09694163881119],[-114.87856614184652,36.09694163881119],[-114.87856614184652,36.08825774382256],[-114.87856614184652,36.07957384883393],[-114.88923346904315,36.07957384883393],[-114.89990079623978,36.07957384883393]]]}},{"type":"Feature","properties":{"row":1,"col":2,"id":7,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.87856614184652,36.166412798720216],[-114.87856614184652,36.175096693708845],[-114.87856614184652,36.18378058869747],[-114.86789881464989,36.18378058869747],[-114.85723148745326,36.18378058869747],[-114.85723148745326,36.175096693708845],[-114.85723148745326,36.166412798720216],[-114.86789881464989,36.166412798720216],[-114.87856614184652,36.166412798720216]]]}},{"type":"Feature","properties":{"row":1,"col":3,"id":8,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.84656416025663,36.18378058869747],[-114.83589683306,36.18378058869747],[-114.83589683306,36.175096693708845],[-114.83589683306,36.166412798720216],[-114.84656416025663,36.166412798720216],[-114.85723148745326,36.166412798720216],[-114.85723148745326,36.175096693708845],[-114.85723148745326,36.18378058869747],[-114.84656416025663,36.18378058869747]]]}},{"type":"Feature","properties":{"row":1,"col":4,"id":9,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.166412798720216],[-114.83589683306,36.175096693708845],[-114.83589683306,36.18378058869747],[-114.82522950586338,36.18378058869747],[-114.81456217866675,36.18378058869747],[-114.81456217866675,36.175096693708845],[-114.81456217866675,36.166412798720216],[-114.82522950586338,36.166412798720216],[-114.83589683306,36.166412798720216]]]}},{"type":"Feature","properties":{"row":1,"col":5,"id":10,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.166412798720216],[-114.81456217866675,36.175096693708845],[-114.81456217866675,36.18378058869747],[-114.80389485147012,36.18378058869747],[-114.79322752427349,36.18378058869747],[-114.79322752427349,36.175096693708845],[-114.79322752427349,36.166412798720216],[-114.80389485147012,36.166412798720216],[-114.81456217866675,36.166412798720216]]]}},{"type":"Feature","properties":{"row":1,"col":6,"id":11,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.78256019707686,36.18378058869747],[-114.77189286988023,36.18378058869747],[-114.77189286988023,36.175096693708845],[-114.77189286988023,36.166412798720216],[-114.78256019707686,36.166412798720216],[-114.79322752427349,36.166412798720216],[-114.79322752427349,36.175096693708845],[-114.79322752427349,36.18378058869747],[-114.78256019707686,36.18378058869747]]]}},{"type":"Feature","properties":{"row":1,"col":7,"id":12,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.77189286988023,36.166412798720216],[-114.77189286988023,36.175096693708845],[-114.77189286988023,36.18378058869747],[-114.7612255426836,36.18378058869747],[-114.75055821548698,36.18378058869747],[-114.75055821548698,36.175096693708845],[-114.75055821548698,36.166412798720216],[-114.7612255426836,36.166412798720216],[-114.77189286988023,36.166412798720216]]]}},{"type":"Feature","properties":{"row":2,"col":7,"id":13,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.77189286988023,36.14904500874296],[-114.77189286988023,36.15772890373159],[-114.77189286988023,36.166412798720216],[-114.7612255426836,36.166412798720216],[-114.75055821548698,36.166412798720216],[-114.75055821548698,36.15772890373159],[-114.75055821548698,36.14904500874296],[-114.7612255426836,36.14904500874296],[-114.77189286988023,36.14904500874296]]]}},{"type":"Feature","properties":{"row":3,"col":7,"id":14,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.14904500874296],[-114.75055821548698,36.14904500874296],[-114.75055821548698,36.14036111375433],[-114.75055821548698,36.131677218765695],[-114.7612255426836,36.131677218765695],[-114.77189286988023,36.131677218765695],[-114.77189286988023,36.14036111375433],[-114.77189286988023,36.14904500874296],[-114.7612255426836,36.14904500874296]]]}},{"type":"Feature","properties":{"row":4,"col":7,"id":15,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.131677218765695],[-114.75055821548698,36.131677218765695],[-114.75055821548698,36.122993323777074],[-114.75055821548698,36.114309428788445],[-114.7612255426836,36.114309428788445],[-114.77189286988023,36.114309428788445],[-114.77189286988023,36.122993323777074],[-114.77189286988023,36.131677218765695],[-114.7612255426836,36.131677218765695]]]}},{"type":"Feature","properties":{"row":5,"col":7,"id":16,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.114309428788445],[-114.75055821548698,36.114309428788445],[-114.75055821548698,36.10562553379982],[-114.75055821548698,36.09694163881119],[-114.7612255426836,36.09694163881119],[-114.77189286988023,36.09694163881119],[-114.77189286988023,36.10562553379982],[-114.77189286988023,36.114309428788445],[-114.7612255426836,36.114309428788445]]]}},{"type":"Feature","properties":{"row":6,"col":7,"id":17,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.7612255426836,36.09694163881119],[-114.75055821548698,36.09694163881119],[-114.75055821548698,36.08825774382256],[-114.75055821548698,36.07957384883393],[-114.7612255426836,36.07957384883393],[-114.77189286988023,36.07957384883393],[-114.77189286988023,36.08825774382256],[-114.77189286988023,36.09694163881119],[-114.7612255426836,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":2,"id":18,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.86789881464989,36.09694163881119],[-114.85723148745326,36.09694163881119],[-114.85723148745326,36.08825774382256],[-114.85723148745326,36.07957384883393],[-114.86789881464989,36.07957384883393],[-114.87856614184652,36.07957384883393],[-114.87856614184652,36.08825774382256],[-114.87856614184652,36.09694163881119],[-114.86789881464989,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":3,"id":19,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.07957384883393],[-114.85723148745326,36.08825774382256],[-114.85723148745326,36.09694163881119],[-114.84656416025663,36.09694163881119],[-114.83589683306,36.09694163881119],[-114.83589683306,36.08825774382256],[-114.83589683306,36.07957384883393],[-114.84656416025663,36.07957384883393],[-114.85723148745326,36.07957384883393]]]}},{"type":"Feature","properties":{"row":6,"col":4,"id":20,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.07957384883393],[-114.83589683306,36.08825774382256],[-114.83589683306,36.09694163881119],[-114.82522950586338,36.09694163881119],[-114.81456217866675,36.09694163881119],[-114.81456217866675,36.08825774382256],[-114.81456217866675,36.07957384883393],[-114.82522950586338,36.07957384883393],[-114.83589683306,36.07957384883393]]]}},{"type":"Feature","properties":{"row":6,"col":5,"id":21,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.80389485147012,36.09694163881119],[-114.79322752427349,36.09694163881119],[-114.79322752427349,36.08825774382256],[-114.79322752427349,36.07957384883393],[-114.80389485147012,36.07957384883393],[-114.81456217866675,36.07957384883393],[-114.81456217866675,36.08825774382256],[-114.81456217866675,36.09694163881119],[-114.80389485147012,36.09694163881119]]]}},{"type":"Feature","properties":{"row":6,"col":6,"id":22,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.07957384883393],[-114.79322752427349,36.08825774382256],[-114.79322752427349,36.09694163881119],[-114.78256019707686,36.09694163881119],[-114.77189286988023,36.09694163881119],[-114.77189286988023,36.08825774382256],[-114.77189286988023,36.07957384883393],[-114.78256019707686,36.07957384883393],[-114.79322752427349,36.07957384883393]]]}},{"type":"Feature","properties":{"row":2,"col":2,"id":23,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.87856614184652,36.14904500874296],[-114.87856614184652,36.15772890373159],[-114.87856614184652,36.166412798720216],[-114.86789881464989,36.166412798720216],[-114.85723148745326,36.166412798720216],[-114.85723148745326,36.15772890373159],[-114.85723148745326,36.14904500874296],[-114.86789881464989,36.14904500874296],[-114.87856614184652,36.14904500874296]]]}},{"type":"Feature","properties":{"row":5,"col":6,"id":24,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.09694163881119],[-114.79322752427349,36.10562553379982],[-114.79322752427349,36.114309428788445],[-114.78256019707686,36.114309428788445],[-114.77189286988023,36.114309428788445],[-114.77189286988023,36.10562553379982],[-114.77189286988023,36.09694163881119],[-114.78256019707686,36.09694163881119],[-114.79322752427349,36.09694163881119]]]}},{"type":"Feature","properties":{"row":2,"col":6,"id":25,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.15772890373159],[-114.79322752427349,36.166412798720216],[-114.78256019707686,36.166412798720216],[-114.77189286988023,36.166412798720216],[-114.77189286988023,36.15772890373159],[-114.77189286988023,36.14904500874296],[-114.78256019707686,36.14904500874296],[-114.79322752427349,36.14904500874296],[-114.79322752427349,36.15772890373159]]]}},{"type":"Feature","properties":{"row":5,"col":2,"id":26,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.86789881464989,36.114309428788445],[-114.85723148745326,36.114309428788445],[-114.85723148745326,36.10562553379982],[-114.85723148745326,36.09694163881119],[-114.86789881464989,36.09694163881119],[-114.87856614184652,36.09694163881119],[-114.87856614184652,36.10562553379982],[-114.87856614184652,36.114309428788445],[-114.86789881464989,36.114309428788445]]]}},{"type":"Feature","properties":{"row":3,"col":2,"id":27,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.87856614184652,36.131677218765695],[-114.87856614184652,36.14036111375433],[-114.87856614184652,36.14904500874296],[-114.86789881464989,36.14904500874296],[-114.85723148745326,36.14904500874296],[-114.85723148745326,36.14036111375433],[-114.85723148745326,36.131677218765695],[-114.86789881464989,36.131677218765695],[-114.87856614184652,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":2,"id":28,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.86789881464989,36.131677218765695],[-114.85723148745326,36.131677218765695],[-114.85723148745326,36.122993323777074],[-114.85723148745326,36.114309428788445],[-114.86789881464989,36.114309428788445],[-114.87856614184652,36.114309428788445],[-114.87856614184652,36.122993323777074],[-114.87856614184652,36.131677218765695],[-114.86789881464989,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":6,"id":29,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.79322752427349,36.122993323777074],[-114.79322752427349,36.131677218765695],[-114.78256019707686,36.131677218765695],[-114.77189286988023,36.131677218765695],[-114.77189286988023,36.122993323777074],[-114.77189286988023,36.114309428788445],[-114.78256019707686,36.114309428788445],[-114.79322752427349,36.114309428788445],[-114.79322752427349,36.122993323777074]]]}},{"type":"Feature","properties":{"row":3,"col":6,"id":30,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.78256019707686,36.14904500874296],[-114.77189286988023,36.14904500874296],[-114.77189286988023,36.14036111375433],[-114.77189286988023,36.131677218765695],[-114.78256019707686,36.131677218765695],[-114.79322752427349,36.131677218765695],[-114.79322752427349,36.14036111375433],[-114.79322752427349,36.14904500874296],[-114.78256019707686,36.14904500874296]]]}},{"type":"Feature","properties":{"row":2,"col":5,"id":31,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.14904500874296],[-114.81456217866675,36.15772890373159],[-114.81456217866675,36.166412798720216],[-114.80389485147012,36.166412798720216],[-114.79322752427349,36.166412798720216],[-114.79322752427349,36.15772890373159],[-114.79322752427349,36.14904500874296],[-114.80389485147012,36.14904500874296],[-114.81456217866675,36.14904500874296]]]}},{"type":"Feature","properties":{"row":2,"col":4,"id":32,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.14904500874296],[-114.83589683306,36.15772890373159],[-114.83589683306,36.166412798720216],[-114.82522950586338,36.166412798720216],[-114.81456217866675,36.166412798720216],[-114.81456217866675,36.15772890373159],[-114.81456217866675,36.14904500874296],[-114.82522950586338,36.14904500874296],[-114.83589683306,36.14904500874296]]]}},{"type":"Feature","properties":{"row":2,"col":3,"id":33,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.15772890373159],[-114.85723148745326,36.166412798720216],[-114.84656416025663,36.166412798720216],[-114.83589683306,36.166412798720216],[-114.83589683306,36.15772890373159],[-114.83589683306,36.14904500874296],[-114.84656416025663,36.14904500874296],[-114.85723148745326,36.14904500874296],[-114.85723148745326,36.15772890373159]]]}},{"type":"Feature","properties":{"row":3,"col":3,"id":34,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.131677218765695],[-114.85723148745326,36.14036111375433],[-114.85723148745326,36.14904500874296],[-114.84656416025663,36.14904500874296],[-114.83589683306,36.14904500874296],[-114.83589683306,36.14036111375433],[-114.83589683306,36.131677218765695],[-114.84656416025663,36.131677218765695],[-114.85723148745326,36.131677218765695]]]}},{"type":"Feature","properties":{"row":3,"col":4,"id":35,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.82522950586338,36.14904500874296],[-114.81456217866675,36.14904500874296],[-114.81456217866675,36.14036111375433],[-114.81456217866675,36.131677218765695],[-114.82522950586338,36.131677218765695],[-114.83589683306,36.131677218765695],[-114.83589683306,36.14036111375433],[-114.83589683306,36.14904500874296],[-114.82522950586338,36.14904500874296]]]}},{"type":"Feature","properties":{"row":3,"col":5,"id":36,"selected":0,"v":0},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.131677218765695],[-114.81456217866675,36.14036111375433],[-114.81456217866675,36.14904500874296],[-114.80389485147012,36.14904500874296],[-114.79322752427349,36.14904500874296],[-114.79322752427349,36.14036111375433],[-114.79322752427349,36.131677218765695],[-114.80389485147012,36.131677218765695],[-114.81456217866675,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":3,"id":37,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.114309428788445],[-114.85723148745326,36.122993323777074],[-114.85723148745326,36.131677218765695],[-114.84656416025663,36.131677218765695],[-114.83589683306,36.131677218765695],[-114.83589683306,36.122993323777074],[-114.83589683306,36.114309428788445],[-114.84656416025663,36.114309428788445],[-114.85723148745326,36.114309428788445]]]}},{"type":"Feature","properties":{"row":4,"col":4,"id":38,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.82522950586338,36.131677218765695],[-114.81456217866675,36.131677218765695],[-114.81456217866675,36.122993323777074],[-114.81456217866675,36.114309428788445],[-114.82522950586338,36.114309428788445],[-114.83589683306,36.114309428788445],[-114.83589683306,36.122993323777074],[-114.83589683306,36.131677218765695],[-114.82522950586338,36.131677218765695]]]}},{"type":"Feature","properties":{"row":4,"col":5,"id":39,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.114309428788445],[-114.81456217866675,36.122993323777074],[-114.81456217866675,36.131677218765695],[-114.80389485147012,36.131677218765695],[-114.79322752427349,36.131677218765695],[-114.79322752427349,36.122993323777074],[-114.79322752427349,36.114309428788445],[-114.80389485147012,36.114309428788445],[-114.81456217866675,36.114309428788445]]]}},{"type":"Feature","properties":{"row":5,"col":5,"id":40,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.81456217866675,36.09694163881119],[-114.81456217866675,36.10562553379982],[-114.81456217866675,36.114309428788445],[-114.80389485147012,36.114309428788445],[-114.79322752427349,36.114309428788445],[-114.79322752427349,36.10562553379982],[-114.79322752427349,36.09694163881119],[-114.80389485147012,36.09694163881119],[-114.81456217866675,36.09694163881119]]]}},{"type":"Feature","properties":{"row":5,"col":4,"id":41,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.83589683306,36.09694163881119],[-114.83589683306,36.10562553379982],[-114.83589683306,36.114309428788445],[-114.82522950586338,36.114309428788445],[-114.81456217866675,36.114309428788445],[-114.81456217866675,36.10562553379982],[-114.81456217866675,36.09694163881119],[-114.82522950586338,36.09694163881119],[-114.83589683306,36.09694163881119]]]}},{"type":"Feature","properties":{"row":5,"col":3,"id":42,"selected":0,"v":1},"geometry":{"type":"Polygon","coordinates":[[[-114.85723148745326,36.09694163881119],[-114.85723148745326,36.10562553379982],[-114.85723148745326,36.114309428788445],[-114.84656416025663,36.114309428788445],[-114.83589683306,36.114309428788445],[-114.83589683306,36.10562553379982],[-114.83589683306,36.09694163881119],[-114.84656416025663,36.09694163881119],[-114.85723148745326,36.09694163881119]]]}}]};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LWRpc3NhZ2dyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0yLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTMuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWFwLWNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yZWNvcmQtc3R1ZHktZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbInJlY29yZFN0dWR5RGF0YSIsIlJlY29yZFN0dWR5RGF0YSIsInN0b3JlIiwiU3RvcmUiLCJ1dGlsaXR5IiwiVXRpbGl0eSIsIkhhbmRsZXJzIiwiZGlzcGxheU5vbmVDbGFzcyIsInNlbGVjdGVkQ2xhc3MiLCJzdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCIsInN0dWR5QWdncmVlbWVudEVsZW1lbnRzUmVtb3ZlIiwic3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNBZGQiLCJzdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZSIsInN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZCIsInN0dWR5UXVlc3Rpb24iLCJnZXRTdGF0ZUl0ZW0iLCJzdHVkeVF1ZXN0aW9uRWxlbWVudHNSZW1vdmUiLCJzdHVkeVNVU0VsZW1lbnRzQWRkIiwic3R1ZHlTVVNFbGVtZW50c1JlbW92ZSIsInN1c1N0b3JhZ2VLZXlzIiwiZWxlbWVudElEIiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZvckVhY2giLCJlbGVtZW50VUlJRCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImNvbnRhaW5zIiwiYWRkIiwiZ3JpZE5hbWUiLCJncmlkSXRlcmF0aW9ucyIsInNldEFQSUZvckdyb3VwIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInBhZ2UiLCJzdXNWYWx1ZUFycmF5Iiwia2V5IiwicXVlc3Rpb25BbnN3ZXIiLCJwdXNoIiwiZGF0ZXN0YW1wIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidHJpZ2dlckV2ZW50Iiwic2V0U3RhdGVJdGVtIiwicmVjb3JkQWdncmVlZCIsInN0b3JhZ2UiLCJ3aW5kb3ciLCJyZW1vdmVJdGVtIiwic3R1ZHlWZXJzaW9uIiwiYWdyZWVtZW50VGltZVN0YW1wIiwicmVjb3JkRGlzYWdncmVlZCIsInBhcmVudEJ0bkdyb3VwIiwidGFyZ2V0IiwiaWQiLCJwYXJlbnRFbGVtZW50IiwidG9nZ2xlQnV0dG9uR3JvdXBCdXR0dG9uc09mZiIsInF1ZXN0aW9uVGV4dCIsInJlcGxhY2UiLCJOdW1iZXIiLCJpbm5lclRleHQiLCJ1dWlkUmVjIiwic3R1ZHlTdGFydGVkUmVjIiwic3R1ZHlTdGFydGVkVGltZVJlYyIsInN0dWR5QWdyZWVtZW50UmVjIiwic3R1ZHlBZ3JlZW1lbnRUaW1lUmVjIiwiY2FtcGFpZ25SZWMiLCJtb2JpbGVSZWMiLCJtYXBWZXJzaW9uUmVjIiwic3R1ZHlRdWVzdGlvblJlYyIsInN1c2Fuc3dlcnNTdWJtaXRlZFJlYyIsImdyaWRTdWJtaXRlZFJlYyIsInN1c2Fuc3dlcnNSZWMiLCJncmlkYW5zd2Vyc1JlYyIsImdyaWRjb3JyZWN0UmVjIiwic3R1ZHlDb21wbGV0ZWRSZWMiLCJncmlkY29ycmVjdFJlY1Byb3BzIiwiZmVhdHVyZXMiLCJ2YWwiLCJwcm9wZXJ0aWVzIiwidmFsdWUiLCJ2IiwianNvbkRhdGEiLCJ1dWlkIiwic3R1ZHlfc3RhcnRlZCIsInN0dWR5X3N0YXJ0ZWRfdGltZSIsInN0dWR5X2FncmVlbWVudCIsInN1c2Fuc3dlcnNfc3VibWl0ZWQiLCJncmlkX3N1Ym1pdGVkIiwic3R1ZHlfYWdyZWVtZW50X3RpbWUiLCJjYW1wYWlnbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJtb2JpbGUiLCJtYXBfdmVyc2lvbiIsImdyaWRfY29ycmVjdCIsImdyaWRfYW5zd2VycyIsImdyaWRhbnN3ZXJzX3RpbWUiLCJzdHVkeV9xdWVzdGlvbiIsInN1c19hbnN3ZXJzIiwic3VzYW5zd2Vyc190aW1lIiwic3R1ZHlfY29tcGxldGVkIiwic2V0RXZlbnRBbGwiLCJzdXNhbnN3ZXJzRGF0ZVJlYyIsImdyaWRhbnN3ZXJzRGF0ZVJlYyIsImJ0bkdyb3VwIiwiY2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwiY2hlY2tWYWxpZE9iamVjdCIsImxlbmd0aCIsImNoaWxkcmVuQXJyYXkiLCJjaGlsZEl0ZW0iLCJVUkxQYXRoIiwibG9jYXRpb24iLCJoYXNoIiwic3R1ZHlNaW5PbmUiLCJzdHVkeU1heE9uZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1hcFZlcnNpb24iLCJtYXBNaW5PbmUiLCJtYXBNYXhPbmUiLCJ0b1N0cmluZyIsImxpYnJhcnkiLCJmYXMiLCJmYXIiLCJkb20iLCJ3YXRjaCIsIm1hcEJveENvbmZpZyIsIk1hcEJveENvbmZpZyIsImhhbmRsZXJzIiwibG9hZEhUTUxCbG9jayIsImJsb2NrU3R1ZHlBZ2dyZWVtZW50IiwiYmxvY2tTdHVkeURpc3NhZ2dyZWUiLCJibG9ja1N0dWR5U1VTIiwiYmxvY2tTdHVkeUNvbXBsZXRlZCIsIm1hcDEiLCJtYXAyYSIsIm1hcDJiIiwibWFwM0FyciIsIm1hcGRlZiIsImJsb2NrU3R1ZHlRdWVzdGlvbjEiLCJtYWtlQW5pbWF0ZU1hcCIsImJsb2NrU3R1ZHlRdWVzdGlvbjIiLCJtYWtlTWFwIiwic3luY01hcHMiLCJibG9ja1N0dWR5UXVlc3Rpb24zIiwibWFrZUNvbXBhcmVNYXAiLCJtYXBFbmRhIiwibWFwRW5kYiIsInJlc2l6ZUFsbE1hcHMiLCJyZXNpemUiLCJzZXRab29tIiwidXJsU3RyaW5nIiwiaHJlZiIsInVybCIsIlVSTCIsInNlYXJjaFBhcmFtcyIsImdldCIsImlzTW9iaWxlRGV2aWNlIiwiYWdncmVtZW50Q2hhbmdlRWxlbWVudHMiLCJhZGRIYW5kbGVyQWdyZWVDbGljayIsImRpc2FnZ3JlbWVudENoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlckRpc2FncmVlQ2xpY2siLCJzdWJtaXRDaGFuZ2VFbGVtZW50cyIsImFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayIsInN1c0NoYW5nZUVsZW1lbnRzIiwiYWRkSGFuZGxlclN1Ym1pdFNVU0NsaWNrIiwiY3VycmVudFNxdWFyZUdyaWRHZW9KU09OIiwiZ2V0U291cmNlIiwic2V0RGF0YSIsInN1c0J0bkdyb3VwRWxlbWVudHMiLCJhZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayIsImltYWdlcnlEaXJlY3Rpb25zRWxlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWxlbSIsInNldEF0dHJpYnV0ZSIsInN1c05hbWUiLCJzdXNJdGVyYXRpb25zIiwic2V0U3RhdGVGb3JHcm91cCIsInNldERvbVN0YXRlRm9yR3JvdXAiLCJpc1N0dWR5Y29tcGxldGVkIiwic3R1ZHlDb21wbGV0ZWQiLCJTdHVkeUFncnJlZW1lbnQiLCJzdHVkeUFncnJlZWQiLCJncmlkU3VibWl0ZWRTdGF0ZSIsImdyaWRTdWJtaXRlZCIsInN1c1N1Ym1pdGVkU3RhdGUiLCJzdXNTdWJtaXRlZCIsImFnZ3JlbWVudEVsZW1lbnQiLCJkaWFnZ3JlZUVsZW1lbnQiLCJncmlkU3VibWl0RWxlbWVudCIsImNvbXBsZXRlZFN1Ym1pdEVsZW1lbnQiLCJjbGljayIsImV2ZW50IiwicmVsb2FkIiwic3luY01vdmUiLCJyZXF1aXJlIiwic3F1YXJlR3JpZEdlb0pTT04iLCJTcXVhcmVHcmlkR2VvSlNPTk9uZSIsIlNxdWFyZUdyaWRHZW9KU09OU2Vjb25kIiwiU3F1YXJlR3JpZEdlb0pTT05UaGlyZCIsImRlZmF1bHRNYXBTdHlsZSIsImRlZmF1bHRNYXBDZW50ZXIiLCJkZWZhdWx0TWF4Qm91bmRzIiwiZGVmYXVsdE1hcFpvb20iLCJkZWZhdWx0TWFwQ29udGFpbmVyIiwiZGFya01hcFN0eWxlIiwibGlnaHRNYXBTdHlsZSIsIm1hcGJveGdsIiwiTWFwYm94Q29tcGFyZSIsImFjY2Vzc1Rva2VuIiwicXVpZXQiLCJtYXAyIiwiZGVmYXVsdEdyZXlCb3giLCJzZWxlY3RlZEJveCIsIm1hcENoYW5nZUxheWVycyIsImxheWVycyIsIm1pbnpvb20iLCJtYXh6b29tIiwic2NoZW1lIiwidGlsZVNpemUiLCJib3VuZHMiLCJtYXhib3VuZHMiLCJtYXBDaGFuZ2VMYXllcnNPbmUiLCJtYXBDb250YWluZXIiLCJtYXBJbmRleCIsImVuZCIsImVuYWJsZWNsaWNrIiwibWFwU2V0dXAiLCJtYXAiLCJNYXAiLCJjb250YWluZXIiLCJzdHlsZSIsInpvb20iLCJzaG93Wm9vbSIsInRvdWNoRW5hYmxlZCIsImtleWJpbmRpbmdzIiwibWF4Qm91bmRzIiwib24iLCJmaXRNeUJvdW5kcyIsImFkZExheWVyIiwibWFrZVRNU0xheWVyIiwibWFrZUdyaWRPdXRMaW5lTGF5ZXIiLCJtYWtlR3JpZENvcnJlY3RMYXllciIsIm1ha2VHcmlkTGF5ZXIiLCJhZGRHcmlkQ2xpY2siLCJzZXRUaW1lb3V0Iiwib25sb2FkIiwiYWRkQ29udHJvbCIsIk5hdmlnYXRpb25Db250cm9sIiwic2hvd0NvbXBhc3MiLCJjZW50ZXIiLCJpbmRleENvdW50IiwiaW5kZXgiLCJzZXRJbnRlcnZhbCIsInNldExheW91dFByb3BlcnR5IiwibWFwQmVmb3JlQ29udGFpbmVyIiwibWFwQWZ0ZXJDb250YWluZXIiLCJtYXBDb21wYXJlV3JhcHBlcklEIiwiYmVmb3JlTWFwIiwiYWZ0ZXJNYXAiLCJjb21wYXJlIiwic2V0U2xpZGVyIiwibWFwQ2hhbmdlIiwidHlwZSIsInNvdXJjZSIsInRpbGVzIiwicGFpbnQiLCJkYXRhIiwibGF5b3V0IiwiZ2V0Q2FudmFzIiwiY3Vyc29yIiwiZmVhdHVyZSIsIm5ld0ZlYXR1cmUiLCJ0b2dnbGVTZWxlY3RlZEZlYXR1cmUiLCJzZWxlY3RlZEZlYXR1cmVzIiwibWFrZVNlbGVjdGVkRmVhdHVyZUdlb0pTT04iLCJuZXdTcXVhcmVHcmlkR2VvSlNPTiIsInVwZGF0ZVNxdWFyZUdyaWRXaXRoU2VsZWN0ZWRGZWF0dXJlcyIsInN0b3JlU3F1YXJlR3JpZCIsInN0b3JlU2VsZWN0ZWRGZWF0dXJlIiwiTmV3U3F1YXJlR3JpZEdlb0pTT04iLCJmaXRCb3VuZHMiLCJwYWRkaW5nIiwic2VsZWN0ZWQiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiY3VycmVudEZlYXR1cmVJZHMiLCJjb25jYXQiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImRhdGFwaSIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJkYXRlIiwianNvbmRhdGEiLCJkYXRhQVBJVVJMIiwic2VhcmNoIiwiVVJMU2VhcmNoUGFyYW1zIiwiZmV0Y2giLCJTVEFURV9LRVkiLCJzdG9yYWdlQXZhaWxhYmxlIiwibG9jYWxTdG9yYWdlIiwic3RhdGUiLCJjaGVja1N0YXRlRXhpc3RzIiwiZ2V0U3RhdGUiLCJzdG9yZU9iaiIsIm5ld1N0YXRlT2JqIiwic2V0U3RhdGUiLCJwYXJzZSIsImdldEl0ZW0iLCJjaGVja0l0ZW0iLCJzZXRJdGVtIiwiQm9vbGVhbiIsIml0ZW0iLCJzdGF0ZVN0ciIsImdldFN0YXRlQXNTdHJpbmciLCJpbmRleE9mIiwieCIsIkRPTUV4Y2VwdGlvbiIsImNvZGUiLCJuYW1lIiwiY2hlY2siLCJvYmoiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJrZXlzIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiYSIsInRlc3QiLCJzdWJzdHIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ2ZW5kb3IiLCJvcGVyYSIsInBsYWNlSG9sZGVyRWxlbWVudElEIiwidGVtcGxhdGUiLCJjb21wb25lbnRFbGVtIiwiaW5uZXJIVE1MIiwiZXZlbnROYW1lIiwiZGV0YWlsIiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50Iiwic3RhdGV0ZXh0IiwiaXRlcmF0aW9ucyIsImJ0blByZWZpeCIsIm5leHRJdGVyYXRpb24iLCJ2YWx1ZUFycmF5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QkFBZ0JGLGFBQWEsQ0FBbkM7QUFDQSxhQUFLM0ssZ0JBQUwsQ0FBc0IwSyxTQUF0QixFQUFpQ0csYUFBakM7QUFDRDtBQUNGOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7bUNBQ2VILFMsRUFBV0MsVSxFQUE2QjtBQUFBLFVBQWpCRyxVQUFpQix1RUFBSixFQUFJOztBQUNyRCxVQUFNN1QsV0FBU3lULFNBQVQsR0FBcUJDLFVBQTNCO0FBQ0EsVUFBTS9RLFFBQVFoRixNQUFNYSxZQUFOLE1BQXNCaVYsU0FBdEIsR0FBa0NDLFVBQWxDLENBQWQ7QUFDQTtBQUNBRyxpQkFBVzNULElBQVgsQ0FBZ0IsRUFBRUYsUUFBRixFQUFPMkMsWUFBUCxFQUFoQjtBQUNBLFVBQUkrUSxhQUFhLENBQWpCLEVBQW9CO0FBQ2xCLFlBQU1FLGdCQUFnQkYsYUFBYSxDQUFuQztBQUNBLGFBQUsvVCxjQUFMLENBQW9COFQsU0FBcEIsRUFBK0JHLGFBQS9CLEVBQThDQyxVQUE5QztBQUNBLGVBQU8sSUFBUDtBQUNEO0FBQ0Q7QUFDQTtBQUNBLFVBQU0xVCxZQUFZLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUFsQjtBQUNBMUMsWUFBTTRDLFlBQU4sQ0FBbUIsZUFBbkIsRUFBb0MsSUFBcEM7QUFDQTVDLFlBQU00QyxZQUFOLENBQW1CLGFBQW5CLEVBQWtDc1QsVUFBbEM7QUFDQWxXLFlBQU00QyxZQUFOLENBQW1CLGtCQUFuQixFQUF1Q0osU0FBdkM7QUFDQSxhQUFPLElBQVA7QUFDRCIsImZpbGUiOiJpbmRleC5hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJhNDNmY2UzZWVjNGQ4MzZiYTE0ZFwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3JzfmluZGV4XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC1hbGxcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDBcXFwiPlxcblxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3R1ZHktYWdyZWVtZW50LXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3R1ZHkgUGFydGljaXBhdGlvbiBBZ3JlZW1lbnQ8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudFxcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImgtMTAwXFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdHVkeS1hZ3JlZW1lbnQtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICBUaGFuayB5b3UgZm9yIHRha2luZyBwYXJ0IGluIHRoaXMgc3R1ZHkuIEJ5IHVzaW5nIHRoZSBmb2xsb3dpbmcgd2Vic2l0ZSxcXG4gICAgICAgIHlvdSBhZ3JlZSB0byBwYXJ0aWNpcGF0ZSBpbiBhIHN0dWR5IGFib3V0IGhvdyBwZW9wbGUgdXNlIHdlYi1wcmVzZW50ZWQgbWFwcy5cXG4gICAgICAgIFdlIHdpbGwgY29sbGVjdCBpbmZvcm1hdGlvbiBhYm91dCB5b3VyIGludGVyYWN0aW9ucyB3aXRoIHRoaXMgc2l0ZSBidXQgbm90IGFueVxcbiAgICAgICAgcGVyc29uYWxseSBpZGVudGlmaWFibGUgaW5mb3JtYXRpb24uIFRoZSBvbmx5IHBlb3BsZSB3aXRoIGFjY2VzcyB0byB0aGUgc3R1ZHlcXG4gICAgICAgIGRhdGEgYXJlIHRoZSByZXNlYXJjaGVycy4gSG93ZXZlciwgdGhlIGRhdGEgd2lsbCBiZSBzdW1tYXJpemVkLCBzaGFyZWQsIGFuZFxcbiAgICAgICAgZGlzc2VtaW5hdGVkIGluIHRhbGtzLCBibG9ncywgYW5kIHBvc3NpYmx5IHJlc2VhcmNoIGpvdXJuYWxzLiBUaGVyZSBpcyBub1xcbiAgICAgICAgY29zdCB0byB5b3UgdG8gcGFydGljaXBhdGUgaW4gdGhpcyByZXNlYXJjaCBzdHVkeSwgYW5kIHlvdSB3aWxsIG5vdCBiZVxcbiAgICAgICAgY29tcGVuc2F0ZWQuIFRoZXJlIGFyZSBubyBrbm93biByaXNrcyBpbiB0aGUgZm9sbG93aW5nIHRhc2tzLlxcbiAgICAgICAgPGJyIC8+PGJyIC8+XFxuICAgICAgICBCeSBhZ3JlZWluZyB0byB0aGlzLCB5b3UgaGF2ZSBhY2tub3dsZWRnZWQgdGhhdCB5b3UgaGF2ZSByZWFkIHRoZVxcbiAgICAgICAgY29udGVudHMgb2YgdGhpcyBjb25zZW50LCBhcmUgYW4gYWR1bHQgb3ZlciAxOCB5ZWFycyBvZiBhZ2UsIGFuZFxcbiAgICAgICAgeW91IGFyZSBnaXZpbmcgY29uc2VudCB0byBwYXJ0aWNpcGF0ZSBpbiB0aGlzIHN0dWR5LlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC01XFxcIj5EbyB5b3Ugd2FudCB0byBwYXJ0aWNpcGF0ZT88L2Rpdj5cXG5cXG4gIDxzcGFuIGNsYXNzPVxcXCJtdC0zIGgtYXV0byBkLWZsZXhcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJhZ2dyZWUtYnV0dG9uXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmQgbXItM1xcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtY2hlY2tcXFwiPjwvaT5cXG4gICAgICBZZXNcXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b24gaWQ9XFxcImRpYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi14bGlnaHQgYnRuLWFnZ3JlZW1lbnQgdy0yMCBhbGlnbi1zZWxmLWVuZFxcXCIgPlxcbiAgICAgIDxpIGNsYXNzPVxcXCJmYXMgZmEtdGltZXMtY2lyY2xlXFxcIj48L2k+XFxuICAgICAgTm9cXG4gICAgPC9idXR0b24+XFxuICA8L3NwYW4+XFxuXFxuICA8IS0tIDxkaXYgaWQ9XFxcImFnZ3JlZS1kaXNhZ2dyZS13cmFwcGVyXFxcIiBjbGFzcz1cXFwibXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcInN0dWR5LWFncmVlbWVudC1zdWJcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgYWxpZ24tc2VsZi1jZW50ZXIgcGItNCBweS0yXFxcIj5EbyB5b3Ugd2FudCB0byBwYXJ0aWNpcGF0ZT88L2Rpdj5cXG4gICAgPGJ1dHRvbiBpZD1cXFwiYWdncmVlLWJ1dHRvblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tYWdncmVlbWVudCB3LTIwIGFsaWduLXNlbGYtZW5kIG1yLTNcXFwiID5cXG4gICAgICA8aSBjbGFzcz1cXFwiZmFzIGZhLWNoZWNrXFxcIj48L2k+XFxuICAgICAgWWVzXFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJkaWFnZ3JlZS1idXR0b25cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4teGxpZ2h0IGJ0bi1hZ2dyZWVtZW50IHctMjAgYWxpZ24tc2VsZi1lbmRcXFwiID5cXG4gICAgICA8aSBjbGFzcz1cXFwiZmFzIGZhLXRpbWVzLWNpcmNsZVxcXCI+PC9pPlxcbiAgICAgIE5vXFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+IC0tPlxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1wcm9ncmVzcy1lbmRcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwXFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMFxcXCI+XFxuICAgIFRoYW5rcyBmb3IgcGFydGljaXBhdGluZyFcXG4gIDwvZGl2PlxcblxcbiAgPCEtLSA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLWVuZFxcXCIgY2xhc3M9XFxcInN0YXJ0LW1hcCB3LTEwMCBkLWZsZXggbXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItZW5kXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlxcbiAgICAgIDxkaXYgaWQ9J2NvbXBhcmUtZW5kLXdyYXBwZXInPlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLWMtZW5kYVxcXCIgY2xhc3M9XFxcIm15LTMgbXgtM1xcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtYy1lbmRiXFxcIiBjbGFzcz1cXFwibXktMyBteC0zXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gICAtLT5cXG4gIDxkaXYgaWQ9XFxcIm1hcC1ob2xkZXItZW5kXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDAgbWwtM1xcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgcHgtMCB3LTEwMFxcXCIgPlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInJvdyB3LTEwMFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTEyIHB4LTAgcHktMSB3LTEwMFxcXCIgPlxcbiAgICAgICAgICBZb3VyIGFuc3dlclxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJtYXAtZW5kYVxcXCIgY2xhc3M9XFxcImNvbC0xMiBjb2wtbWQtNiBweC0wIG1hcC1lbmRhIGVuZG1hcFxcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicm93IG10LTQgdy0xMDBcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIHB4LTAgcHktMSB3LTEwMFxcXCIgPlxcbiAgICAgICAgICBPdXIgYW5zd2VyXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC1lbmRiXFxcIiBjbGFzcz1cXFwiY29sLTEyIGNvbC1tZC02IHB4LTAgbWFwLWVuZGIgZW5kbWFwXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJzdHVkeS1kaXNzYWdncmVlXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlRoYW5rcyBhbnl3YXkhPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdHVkeS1kaXNzYWdncmVlLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICA8c3Bhbj5cXG4gICAgICBUaGFuayB5b3UgZm9yIGNvbnNpZGVyaW5nIGJlaW5nIGEgcGFydGljaXBhbnQuIElmIHlvdSBjaGFuZ2UgeW91cm1pbmQgeW91IGNhblxcbiAgICAgIGFsd2F5cyByZXZpZXcgdGhlIDxhIGhyZWY9XFxcIlxcXCI+YWdncmVtZW50PC9hPiBhZ2FpbiFcXG4gICAgPC9zcGFuPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLW1hcC0wXFxcIiBjbGFzcz1cXFwiaC1hdXRvIHctMTAwIGQtbm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJwYWdlLXRpdGxlXFxcIiBjbGFzcz1cXFwicGFnZS10aXRsZSB3LTEwMCBkLWZsZXhcXFwiPldoYXRzIENoYW5nZWQ/PC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMSBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgVGhlIG1hcCBiZWxvdyBjb250YWlucyB0d28gaW1hZ2VzIHRoYXQgYXJlIGRpZmZlcmVudC4gVGhlIHR3byBpbWFnZXNcXG4gICAgd2lsbCB0dXJuIG9uIGFuZCBvZmYgYXQgYSByZWd1bGFyIGludGVydmFsLiBDbGljayBvbiBhbnkgYm94IHdoZXJlIHlvdVxcbiAgICBiZWxpZXZlIHRoZSB0d28gaW1hZ2VzIGFyZSBkaWZmZXJlbnQuIFRoZSBib3hlcyB5b3UgY2xpY2sgb24gd2lsbCBjaGFuZ2VcXG4gICAgb3JhbmdlIGFuZCB3aWxsIGJlY29tZSB5b3VyIGFuc3dlcnMgd2hlbiB5b3UgY2xpY2sgc3VibWl0LiBDbGlja2luZyBvbiBhblxcbiAgICBvcmFuZ2UgYm94IHdpbGwgcmVtb3ZlIGl0IGZyb20geW91ciBzZWxlY3Rpb24uXFxuICA8L2Rpdj5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgZm9yLXNhdCB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIE9ubHkgc2VsZWN0IGFyZWFzIG9mIG1ham9yIGNoYW5nZS5cXG4gIDwvZGl2PlxcblxcblxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci0xXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci0xXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcIm1hcC0xXFxcIiBjbGFzcz1cXFwibXktMyBteC0zXFxcIj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAyIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBTdWJtaXQgdGhlIHNlbGVjdGVkIGJveGVzIChpbiBvcmFuZ2UpIGFzIHlvdXIgYW5zd2VyLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTBcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiU3VibWl0IGFuZCBnbyB0byBzdXJ2ZXkuXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtbWFwLTFcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAxIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBUaGUgdHdvIG1hcHMgYmVsb3cgY29udGFpbiBpbWFnZXMgdGhhdCBhcmUgZGlmZmVyZW50LiBDbGljayBvbiBhbnkgYm94ZXMgd2hlcmVcXG4gICAgeW91IGJlbGlldmUgdGhlIHR3byBpbWFnZXMgYXJlIGRpZmZlcmVudC4gVGhlIGJveGVzIHlvdSBjbGljayBvbiB3aWxsIGNoYW5nZVxcbiAgICBvcmFuZ2UgYW5kIHdpbGwgYmVjb21lIHlvdXIgYW5zd2VycyB3aGVuIHlvdSBjbGljayBzdWJtaXQuIENsaWNraW5nIG9uIGFuXFxuICAgIG9yYW5nZSBib3ggd2lsbCByZW1vdmUgaXQgZnJvbSB5b3VyIHNlbGVjdGlvbi5cXG4gIDwvZGl2PlxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyBmb3Itc2F0IHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgT25seSBzZWxlY3QgYXJlYXMgb2YgbWFqb3IgY2hhbmdlLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJtYXAtaG9sZGVyLTJcXFwiIGNsYXNzPVxcXCJzdGFydC1tYXAgdy0xMDAgZC1mbGV4IG1sLTMgbXQtM1xcXCI+XFxuICAgIDxkaXYgaWQ9XFxcIm1hcC1pbm5lci1ob2xkZXItMlxcXCIgY2xhc3M9XFxcInJvdyBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTYgZHVhbG1hcHMgZC1mbGV4XFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC0yYVxcXCIgY2xhc3M9XFxcIm15LTMgbXgtMCBteC1zbS0wIG14LW1kLTMgbWFwLTJhXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLW1kLTYgZHVhbG1hcHMgZC1mbGV4XFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC0yYlxcXCIgY2xhc3M9XFxcIm15LTMgbXgtMCBteC1zbS0wIG14LW1kLTMgbWFwLTJiXFxcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAyIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBTdWJtaXQgdGhlIHNlbGVjdGVkIGJveGVzIChpbiBvcmFuZ2UpIGFzIHlvdXIgYW5zd2VyLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgbXQtM1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdC1idXR0b24tdG8tc3VzLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLWRyYXctY2lyY2xlIHctMTAwIGFsaWduLXNlbGYtZW5kXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1odG1sPVxcXCJ0cnVlXFxcIiB0aXRsZT1cXFwiU3VibWl0IGFuZCBnbyB0byBzdXJ2ZXkuXFxcIj5cXG4gICAgICBTdWJtaXRcXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwic3R1ZHktcHJvZ3Jlc3MtbWFwLTJcXFwiIGNsYXNzPVxcXCJoLWF1dG8gdy0xMDAgZC1ub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcInBhZ2UtdGl0bGVcXFwiIGNsYXNzPVxcXCJwYWdlLXRpdGxlIHctMTAwIGQtZmxleFxcXCI+V2hhdHMgQ2hhbmdlZD88L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLXRpdGxlXFxcIiBjbGFzcz1cXFwic3RlcC10aXRsZSB3LTEwMCBkLWZsZXggbXQtM1xcXCI+U3RlcCAxIG9mIDM8L2Rpdj5cXG5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgdy0xMDAgZC1mbGV4IG10LTFcXFwiPlxcbiAgICBUaGUgbWFwIGJlbG93IGNvbnRhaW5zIHR3byBpbWFnZXMgdGhhdCBhcmUgZGlmZmVyZW50LiBEcmFnIHRoZSB2ZXJ0aWNhbCBiYXIgc2lkZS10by1zaWRlXFxuICAgIHRvIHJldmVhbCB0aGUgaW1hZ2VzLiBDbGljayBvbiBhbnkgYm94IHdoZXJlIHlvdSBiZWxpZXZlIHRoZSB0d28gaW1hZ2VzIGFyZSBkaWZmZXJlbnQuIFRoZVxcbiAgICBib3hlcyB5b3UgY2xpY2sgb24gd2lsbCBjaGFuZ2Ugb3JhbmdlIGFuZCB3aWxsIGJlY29tZSB5b3VyIGFuc3dlcnMgd2hlbiB5b3UgY2xpY2tcXG4gICAgc3VibWl0LiBDbGlja2luZyBvbiBhbiBvcmFuZ2UgYm94IHdpbGwgcmVtb3ZlIGl0IGZyb20geW91ciBzZWxlY3Rpb24uXFxuICA8L2Rpdj5cXG4gIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnMgZm9yLXNhdCB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIE9ubHkgc2VsZWN0IGFyZWFzIG9mIG1ham9yIGNoYW5nZS5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwibWFwLWhvbGRlci0zXFxcIiBjbGFzcz1cXFwic3RhcnQtbWFwIHctMTAwIGQtZmxleCBtdC0zXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwibWFwLWlubmVyLWhvbGRlci0zXFxcIiBjbGFzcz1cXFwicm93IGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgY29tcGFyZVxcXCI+XFxuICAgICAgPGRpdiBpZD0nY29tcGFyZS13cmFwcGVyJz5cXG4gICAgICAgIDxkaXYgaWQ9XFxcIm1hcC0zYVxcXCIgY2xhc3M9XFxcIm14LTNcXFwiPjwvZGl2PlxcbiAgICAgICAgPGRpdiBpZD1cXFwibWFwLTNiXFxcIiBjbGFzcz1cXFwibXgtM1xcXCI+PC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS10aXRsZVxcXCIgY2xhc3M9XFxcInN0ZXAtdGl0bGUgdy0xMDAgZC1mbGV4IG10LTNcXFwiPlN0ZXAgMiBvZiAzPC9kaXY+XFxuXFxuICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zIHctMTAwIGQtZmxleCBtdC0xXFxcIj5cXG4gICAgU3VibWl0IHRoZSBzZWxlY3RlZCBib3hlcyAoaW4gb3JhbmdlKSBhcyB5b3VyIGFuc3dlci5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IG10LTNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLXN1cy0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1kcmF3LWNpcmNsZSB3LTEwMCBhbGlnbi1zZWxmLWVuZFxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIGRhdGEtaHRtbD1cXFwidHJ1ZVxcXCIgdGl0bGU9XFxcIlN1Ym1pdCBhbmQgZ28gdG8gc3VydmV5LlxcXCI+XFxuICAgICAgU3VibWl0XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XFxuXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcInN0dWR5LXByb2dyZXNzLXN1c1xcXCIgY2xhc3M9XFxcImgtYXV0byB3LTEwMCBkLW5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwicGFnZS10aXRsZVxcXCIgY2xhc3M9XFxcInBhZ2UtdGl0bGUgdy0xMDAgZC1mbGV4XFxcIj5XaGF0cyBDaGFuZ2VkPzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtdGl0bGVcXFwiIGNsYXNzPVxcXCJzdGVwLXRpdGxlIHctMTAwIGQtZmxleCBtdC0zXFxcIj5TdGVwIDMgb2YgMzwvZGl2PlxcblxcbiAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9ucyB3LTEwMCBkLWZsZXggbXQtMVxcXCI+XFxuICAgIFJhbmsgZWFjaCBxdWVzdGlvbiBmcm9tIDEgdG8gNSBiYXNlZCBvbiBob3cgbXVjaCB5b3UgYWdyZWUgb3IgZGlzYWdncmVcXG4gICAgd2l0aCB0aGUgc3RhdGVtZW50LiAgMSBpbmRpY2F0ZXMgeW91IHN0cm9uZ2x5IGRpc2FncmVlLiA1IGluZGljYXRlc1xcbiAgICB5b3Ugc3Ryb25nbHkgYWdncmVlLlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJwbC0xIHB0LTMgcGItM1xcXCI+XFxuICAgICZuYnNwO1xcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtb2RkXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDEuJm5ic3A7Jm5ic3A7SSB0aGluayB0aGF0IEkgd291bGQgbGlrZSB0byB1c2UgdGhpcyBzaXRlIGZyZXF1ZW50bHlcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtMVxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBidG4tc3VzIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExLTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTEtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMS01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDIuJm5ic3A7Jm5ic3A7SSBmb3VuZCB0aGUgc2l0ZSB1bm5lY2Vzc2FyaWx5IGNvbXBsZXhcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtMlxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMi0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEyLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTItNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICAzLiZuYnNwOyZuYnNwO0kgdGhvdWdodCB0aGUgc2l0ZSB3YXMgZWFzeSB0byB1c2VcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtM1xcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xMy0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXEzLTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTMtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgNC4mbmJzcDsmbmJzcDtJIHRoaW5rIHRoYXQgSSB3b3VsZCBuZWVkIHRoZSBzdXBwb3J0IG9mIGEgdGVjaG5pY2FsIHBlcnNvbiB0byBiZSBhYmxlIHRvIHVzZSB0aGlzIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtNFxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNC0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE0LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTQtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA1LiZuYnNwOyZuYnNwO0kgZm91bmQgdGhlIHZhcmlvdXMgZnVuY3Rpb25zIGluIHRoaXMgc2l0ZSB3ZXJlIHdlbGwgaW50ZWdyYXRlZFxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy01XFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIG1yLTJcXFwiIHJvbGU9XFxcImdyb3VwXFxcIiBhcmlhLWxhYmVsPVxcXCJGaXJzdCBncm91cFxcXCI+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtMVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjE8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE1LTNcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4zPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTUtNFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjQ8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNS01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy1hdXRvIG10LTIgcGwtMSBwci0xIHB0LTMgcGItNCBzdXMtZXZlblxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA2LiZuYnNwOyZuYnNwO0kgdGhvdWdodCB0aGVyZSB3YXMgdG9vIG11Y2ggaW5jb25zaXN0ZW5jeSBpbiB0aGlzIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtNlxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNi0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE2LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTYtNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLW9kZFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNyBjb2wtbWQtOFxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwic3RlcDEtZGlyZWN0aW9uc1xcXCIgY2xhc3M9XFxcInN0ZXAtZGlyZWN0aW9uc1xcXCI+XFxuICAgICAgICA3LiZuYnNwOyZuYnNwO0kgd291bGQgaW1hZ2luZSB0aGF0IG1vc3QgcGVvcGxlIHdvdWxkIGxlYXJuIHRvIHVzZSB0aGlzIHNpdGUgdmVyeSBxdWlja2x5XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwYi0yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLTdcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNy0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE3LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTctM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xNy00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE3LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1ldmVuXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLTEyIGNvbC1zbS03IGNvbC1tZC04XFxcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJzdGVwMS1kaXJlY3Rpb25zXFxcIiBjbGFzcz1cXFwic3RlcC1kaXJlY3Rpb25zXFxcIj5cXG4gICAgICAgIDguJm5ic3A7Jm5ic3A7SSBmb3VuZCB0aGUgc2l0ZSB2ZXJ5IGN1bWJlcnNvbWUgdG8gdXNlXFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi1tZC0wIHBiLXNtLTAgcGItMiBwdC1tZC0wIHB0LXNtLTAgcHQtMiBjb2wtMTIgY29sLXNtLTUgY29sLW1kLTRcXFwiICA+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvdyBwYi0yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1sZWZ0XFxcIj5TdHJvbmdseSBkaXNhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtNVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3VzLWRlc2NyaWJlci1kaXNhZ3JlZS1zbSBkLWZsZXggdGV4dC1yaWdodFxcXCI+U3Ryb25nbHkgYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi10b29sYmFyXFxcIiByb2xlPVxcXCJ0b29sYmFyXFxcIiBhcmlhLWxhYmVsPVxcXCJUb29sYmFyIHdpdGggYnV0dG9uIGdyb3Vwc1xcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJidG4tZ3JvdXAtc3VzLThcXFwiIGNsYXNzPVxcXCJidG4tZ3JvdXAgbXItMlxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiIGFyaWEtbGFiZWw9XFxcIkZpcnN0IGdyb3VwXFxcIj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4yPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTgtM1xcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjM8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOC00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE4LTVcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj41PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInJvdyB3LWF1dG8gbXQtMiBwbC0xIHByLTEgcHQtMyBwYi00IHN1cy1vZGRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgOS4mbmJzcDsmbmJzcDtJIGZlbHQgdmVyeSBjb25maWRlbnQgdXNpbmcgdGhlIHNpdGVcXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInBiLW1kLTAgcGItc20tMCBwYi0yIHB0LW1kLTAgcHQtc20tMCBwdC0yIGNvbC0xMiBjb2wtc20tNSBjb2wtbWQtNFxcXCIgID5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93IHBiLTJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LWxlZnRcXFwiPlN0cm9uZ2x5IGRpc2FncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC01XFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdXMtZGVzY3JpYmVyLWRpc2FncmVlLXNtIGQtZmxleCB0ZXh0LXJpZ2h0XFxcIj5TdHJvbmdseSBhZ3JlZTwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLXRvb2xiYXJcXFwiIHJvbGU9XFxcInRvb2xiYXJcXFwiIGFyaWEtbGFiZWw9XFxcIlRvb2xiYXIgd2l0aCBidXR0b24gZ3JvdXBzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImJ0bi1ncm91cC1zdXMtOVxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTFcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj4xPC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktMlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjI8L2J1dHRvbj5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYnRuLXN1cy1xOS0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXE5LTRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5XFxcIj40PC9idXR0b24+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImJ0bi1zdXMtcTktNVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnlcXFwiPjU8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cXFwicm93IHctYXV0byBtdC0yIHBsLTEgcHItMSBwdC0zIHBiLTQgc3VzLWV2ZW5cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTcgY29sLW1kLThcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcInN0ZXAxLWRpcmVjdGlvbnNcXFwiIGNsYXNzPVxcXCJzdGVwLWRpcmVjdGlvbnNcXFwiPlxcbiAgICAgICAgMTAuJm5ic3A7Jm5ic3A7SSBuZWVkZWQgdG8gbGVhcm4gYSBsb3Qgb2YgdGhpbmdzIGJlZm9yZSBJIGNvdWxkIGdldCBnb2luZyB3aXRoIHRoaXMgc2l0ZVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwicGItbWQtMCBwYi1zbS0wIHBiLTIgcHQtbWQtMCBwdC1zbS0wIHB0LTIgY29sLTEyIGNvbC1zbS01IGNvbC1tZC00XFxcIiAgPlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgcGItMlxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTZcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtbGVmdFxcXCI+U3Ryb25nbHkgZGlzYWdyZWU8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLTVcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN1cy1kZXNjcmliZXItZGlzYWdyZWUtc20gZC1mbGV4IHRleHQtcmlnaHRcXFwiPlN0cm9uZ2x5IGFncmVlPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tdG9vbGJhclxcXCIgcm9sZT1cXFwidG9vbGJhclxcXCIgYXJpYS1sYWJlbD1cXFwiVG9vbGJhciB3aXRoIGJ1dHRvbiBncm91cHNcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwiYnRuLWdyb3VwLXN1cy0xMFxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBtci0yXFxcIiByb2xlPVxcXCJncm91cFxcXCIgYXJpYS1sYWJlbD1cXFwiRmlyc3QgZ3JvdXBcXFwiPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC0xXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MTwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC0yXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MjwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC0zXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+MzwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC00XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NDwvYnV0dG9uPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJidG4tc3VzLXExMC01XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNlY29uZGFyeVxcXCI+NTwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJyb3cgdy0xMDAgZC1mbGV4IG10LTRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwdC1zbS0yIHB0LW1kLTAgY29sLTEyIGNvbC1zbS0xMiBjb2wtbWQtN1xcXCI+XFxuICAgICAgJm5ic3A7XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYi00IHB0LXNtLTIgcHQtbWQtMCBjb2wtMTIgY29sLXNtLTEyIGNvbC1tZC01XFxcIj5cXG4gICAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXQtYnV0dG9uLXRvLWVuZFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tZHJhdy1jaXJjbGUgdy0xMDAgYWxpZ24tc2VsZi1lbmRcXFwiIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiBkYXRhLWh0bWw9XFxcInRydWVcXFwiIHRpdGxlPVxcXCJTdWJtaXQgYW5kIGZpbmlzaC5cXFwiPlxcbiAgICAgICAgU3VibWl0IGFuZCBmaW5pc2hcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cIjsiLCJpbXBvcnQgeyBSZWNvcmRTdHVkeURhdGEgfSBmcm9tICcuL3JlY29yZC1zdHVkeS1kYXRhJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBVdGlsaXR5IH0gZnJvbSAnLi91dGlsaXR5JztcblxuY29uc3QgcmVjb3JkU3R1ZHlEYXRhID0gbmV3IFJlY29yZFN0dWR5RGF0YSgpO1xuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgdXRpbGl0eSA9IG5ldyBVdGlsaXR5KCk7XG5cbmV4cG9ydCBjbGFzcyBIYW5kbGVycyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGlzcGxheU5vbmVDbGFzcyA9ICdkLW5vbmUnO1xuICAgIHRoaXMuc2VsZWN0ZWRDbGFzcyA9ICdzZWxlY3RlZCc7XG5cbiAgICAvLyBzdHVkeSBhZ2dyZWVtZW50XG4gICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c0FkZCA9IFsnc3R1ZHktcHJvZ3Jlc3MtbWFwLSddO1xuICAgIHRoaXMuc3R1ZHlBZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUgPSBbJ2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQtaG9sZGVyJ107XG5cbiAgICAvLyBzdHVkeSBkaXNhZ2dyZWVtZW50XG4gICAgdGhpcy5zdHVkeURpc2FnZ3JlZW1lbnRFbGVtZW50c0FkZCA9IFsnc3R1ZHktZGlzc2FnZ3JlZSddO1xuICAgIHRoaXMuc3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUgPSBbJ2Jsb2NrLXN0dWR5LWFnZ3JlZW1lbnQtaG9sZGVyJ107XG5cbiAgICAvLyBzdHVkeSBxdWVzdGlvbnMgbWFwIGNoYW5nZVxuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbkVsZW1lbnRzQWRkID0gWydzdHVkeS1wcm9ncmVzcy1zdXMnLCAnYmxvY2stc3R1ZHktc3VzLWhvbGRlciddO1xuICAgIHRoaXMuc3R1ZHlRdWVzdGlvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c1JlbW92ZSA9IFtgc3R1ZHktcHJvZ3Jlc3MtbWFwLSR7dGhpcy5zdHVkeVF1ZXN0aW9ufWAsICdtYXAtYWN0aW9uLWhvbGRlciddO1xuXG4gICAgLy8gU1VTIHNjb3Jlc1xuICAgIHRoaXMuc3R1ZHlTVVNFbGVtZW50c0FkZCA9IFsnc3R1ZHktcHJvZ3Jlc3MtZW5kJywgJ2Jsb2NrLXN0dWR5LWNvbXBsZXRlZC1ob2xkZXInXTtcbiAgICB0aGlzLnN0dWR5U1VTRWxlbWVudHNSZW1vdmUgPSBbJ3N0dWR5LXByb2dyZXNzLXN1cycsICdibG9jay1zdHVkeS1zdXMtaG9sZGVyJ107XG4gICAgdGhpcy5zdXNTdG9yYWdlS2V5cyA9IFsnc3VzLXF1ZXN0aW9uLTEnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi0yJyxcbiAgICAgICdzdXMtcXVlc3Rpb24tMycsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTQnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi01JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tNicsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTcnLFxuICAgICAgJ3N1cy1xdWVzdGlvbi04JyxcbiAgICAgICdzdXMtcXVlc3Rpb24tOScsXG4gICAgICAnc3VzLXF1ZXN0aW9uLTEwJ107XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIHN1Ym1pdHRpbmcgY2hhbmdlIGRhdGEgb24gbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcblxuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c0FkZC5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICByZW1vdmUgZWxlbWVudHMgZnJvbSBVSVxuICAgICAgICB0aGlzLnN0dWR5UXVlc3Rpb25FbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZ3JpZE5hbWUgPSAnZ3JpZC1ib3gtJztcbiAgICAgICAgY29uc3QgZ3JpZEl0ZXJhdGlvbnMgPSA0MjtcbiAgICAgICAgdXRpbGl0eS5zZXRBUElGb3JHcm91cChncmlkTmFtZSwgZ3JpZEl0ZXJhdGlvbnMpO1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IHBhZ2U6IDIgfSwgJyNzdXMtcXVlc3Rpb25zJywgJyNzdXMtcXVlc3Rpb25zJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3Igc3VibWl0dGluZyBzdXMgc2NvcmVcbiAgLy9cbiAgLy8gQHBhcmFtIGVsZW1lbnRJRCAtIEhUTUwgZWxlbWVudCBJRFxuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkSGFuZGxlclN1Ym1pdFNVU0NsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5U1VTRWxlbWVudHNBZGQuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyAgcmVtb3ZlIGVsZW1lbnRzIGZyb20gVUlcbiAgICAgICAgdGhpcy5zdHVkeVNVU0VsZW1lbnRzUmVtb3ZlLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgLy8gb25seSBhZGQgZGlzcGxheSBub25lIGNsYXNzIGlmIHRoZSBjbGFzcyBkb2VzIG5vdCBleHNpc3RcbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBkdXBsaWNhdGUgY2xhc3NlcyBhcmUgbm90IGFkZGVkXG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZGlzcGxheU5vbmVDbGFzcykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzcGxheU5vbmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdXNWYWx1ZUFycmF5ID0gW107XG4gICAgICAgIHRoaXMuc3VzU3RvcmFnZUtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25BbnN3ZXIgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oa2V5KTtcbiAgICAgICAgICBzdXNWYWx1ZUFycmF5LnB1c2goeyBrZXksIHF1ZXN0aW9uQW5zd2VyIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGF0ZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICB1dGlsaXR5LnRyaWdnZXJFdmVudCgnc3VzLWNsaWNrZWQnLCAnc3VzLWNsaWNrZWQnKTtcblxuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtc3VibWl0ZWQnLCB0cnVlKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzJywgc3VzVmFsdWVBcnJheSk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy10aW1lJywgZGF0ZXN0YW1wKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1jb21wbGV0ZWQnLCB0cnVlKTtcbiAgICAgICAgSGFuZGxlcnMucmVjb3JkQWdncmVlZCgpO1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IHBhZ2U6IDMgfSwgJyNzdHVkeS1jb21wbGV0ZWQnLCAnI3N0dWR5LWNvbXBsZXRlZCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgICAgLy8gdGVtcCBnZXQgcmlkIG9mIHN0YXRlIGl0ZW1zXG4gICAgICAgIC8vIFJFTU9WRSBGT1IgUkVMRUFTRVxuICAgICAgICBjb25zdCBzdG9yYWdlID0gd2luZG93Wydsb2NhbFN0b3JhZ2UnXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0YXRlJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyByZWNvcmREaXNhZ2dyZWVkKCkge1xuICAgIGNvbnN0IHV1aWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkIHRpbWUnKTtcbiAgICBjb25zdCBzdHVkeUFncmVlbWVudFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG4gICAgY29uc3Qgc3R1ZHlBZ3JlZW1lbnRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScpO1xuICAgIGNvbnN0IGNhbXBhaWduUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdjYW1wYWlnbicpO1xuICAgIGNvbnN0IG1vYmlsZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbW9iaWxlJyk7XG4gICAgY29uc3QgbWFwVmVyc2lvblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBzdHVkeVF1ZXN0aW9uUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNTdWJtaXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy1zdWJtaXRlZCcpO1xuICAgIGNvbnN0IGdyaWRTdWJtaXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZC1zdWJtaXRlZCcpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMnKTtcbiAgICBjb25zdCBncmlkYW5zd2Vyc1JlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMnKTtcbiAgICBjb25zdCBncmlkY29ycmVjdFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICBjb25zdCBzdHVkeUNvbXBsZXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktY29tcGxldGVkJyk7XG5cbiAgICBjb25zdCBncmlkY29ycmVjdFJlY1Byb3BzID0gW107XG5cbiAgICBncmlkY29ycmVjdFJlYy5mZWF0dXJlcy5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgIGdyaWRjb3JyZWN0UmVjUHJvcHMucHVzaCh7XG4gICAgICAgIGtleTogYGdyaWQtYm94LSR7dmFsLnByb3BlcnRpZXMuaWR9YCxcbiAgICAgICAgdmFsdWU6IHZhbC5wcm9wZXJ0aWVzLnZcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkRhdGEgPSB7XG4gICAgICB1dWlkOiB1dWlkUmVjLFxuICAgICAgc3R1ZHlfc3RhcnRlZDogc3R1ZHlTdGFydGVkUmVjLFxuICAgICAgc3R1ZHlfc3RhcnRlZF90aW1lOiBzdHVkeVN0YXJ0ZWRUaW1lUmVjLFxuICAgICAgc3R1ZHlfYWdyZWVtZW50OiBzdHVkeUFncmVlbWVudFJlYyxcbiAgICAgIHN1c2Fuc3dlcnNfc3VibWl0ZWQ6IHN1c2Fuc3dlcnNTdWJtaXRlZFJlYyxcbiAgICAgIGdyaWRfc3VibWl0ZWQ6IGdyaWRTdWJtaXRlZFJlYyxcbiAgICAgIHN0dWR5X2FncmVlbWVudF90aW1lOiBzdHVkeUFncmVlbWVudFRpbWVSZWMsXG4gICAgICBjYW1wYWlnbjogSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25SZWMpLFxuICAgICAgbW9iaWxlOiBKU09OLnN0cmluZ2lmeShtb2JpbGVSZWMpLFxuICAgICAgbWFwX3ZlcnNpb246IG1hcFZlcnNpb25SZWMsXG4gICAgICBncmlkX2NvcnJlY3Q6IEpTT04uc3RyaW5naWZ5KGdyaWRjb3JyZWN0UmVjUHJvcHMpLFxuICAgICAgZ3JpZF9hbnN3ZXJzOiBKU09OLnN0cmluZ2lmeShncmlkYW5zd2Vyc1JlYyksXG4gICAgICBncmlkYW5zd2Vyc190aW1lOiAnJyxcbiAgICAgIHN0dWR5X3F1ZXN0aW9uOiBzdHVkeVF1ZXN0aW9uUmVjLFxuICAgICAgc3VzX2Fuc3dlcnM6IEpTT04uc3RyaW5naWZ5KHN1c2Fuc3dlcnNSZWMpLFxuICAgICAgc3VzYW5zd2Vyc190aW1lOiAnJyxcbiAgICAgIHN0dWR5X2NvbXBsZXRlZDogc3R1ZHlDb21wbGV0ZWRSZWNcbiAgICB9O1xuXG4gICAgcmVjb3JkU3R1ZHlEYXRhLnNldEV2ZW50QWxsKGpzb25EYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyByZWNvcmRBZ2dyZWVkKCkge1xuICAgIGNvbnN0IHV1aWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQnKTtcbiAgICBjb25zdCBzdHVkeVN0YXJ0ZWRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkIHRpbWUnKTtcbiAgICBjb25zdCBzdHVkeUFncmVlbWVudFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG4gICAgY29uc3Qgc3R1ZHlBZ3JlZW1lbnRUaW1lUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScpO1xuICAgIGNvbnN0IGNhbXBhaWduUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdjYW1wYWlnbicpO1xuICAgIGNvbnN0IG1vYmlsZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbW9iaWxlJyk7XG4gICAgY29uc3QgbWFwVmVyc2lvblJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBjb25zdCBzdHVkeVF1ZXN0aW9uUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNTdWJtaXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy1zdWJtaXRlZCcpO1xuICAgIGNvbnN0IGdyaWRTdWJtaXRlZFJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZ3JpZC1zdWJtaXRlZCcpO1xuICAgIGNvbnN0IHN1c2Fuc3dlcnNSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMnKTtcbiAgICBjb25zdCBzdXNhbnN3ZXJzRGF0ZVJlYyA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy10aW1lJyk7XG4gICAgY29uc3QgZ3JpZGFuc3dlcnNSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzJyk7XG4gICAgY29uc3QgZ3JpZGFuc3dlcnNEYXRlUmVjID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdncmlkYW5zd2Vycy10aW1lJyk7XG4gICAgY29uc3QgZ3JpZGNvcnJlY3RSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gICAgY29uc3Qgc3R1ZHlDb21wbGV0ZWRSZWMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWNvbXBsZXRlZCcpO1xuXG4gICAgY29uc3QgZ3JpZGNvcnJlY3RSZWNQcm9wcyA9IFtdO1xuXG4gICAgZ3JpZGNvcnJlY3RSZWMuZmVhdHVyZXMuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICBncmlkY29ycmVjdFJlY1Byb3BzLnB1c2goe1xuICAgICAgICBrZXk6IGBncmlkLWJveC0ke3ZhbC5wcm9wZXJ0aWVzLmlkfWAsXG4gICAgICAgIHZhbHVlOiB2YWwucHJvcGVydGllcy52XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGpzb25EYXRhID0ge1xuICAgICAgdXVpZDogdXVpZFJlYyxcbiAgICAgIHN0dWR5X3N0YXJ0ZWQ6IHN0dWR5U3RhcnRlZFJlYyxcbiAgICAgIHN0dWR5X3N0YXJ0ZWRfdGltZTogc3R1ZHlTdGFydGVkVGltZVJlYyxcbiAgICAgIHN0dWR5X2FncmVlbWVudDogc3R1ZHlBZ3JlZW1lbnRSZWMsXG4gICAgICBzdXNhbnN3ZXJzX3N1Ym1pdGVkOiBzdXNhbnN3ZXJzU3VibWl0ZWRSZWMsXG4gICAgICBncmlkX3N1Ym1pdGVkOiBncmlkU3VibWl0ZWRSZWMsXG4gICAgICBzdHVkeV9hZ3JlZW1lbnRfdGltZTogc3R1ZHlBZ3JlZW1lbnRUaW1lUmVjLFxuICAgICAgY2FtcGFpZ246IEpTT04uc3RyaW5naWZ5KGNhbXBhaWduUmVjKSxcbiAgICAgIG1vYmlsZTogSlNPTi5zdHJpbmdpZnkobW9iaWxlUmVjKSxcbiAgICAgIG1hcF92ZXJzaW9uOiBtYXBWZXJzaW9uUmVjLFxuICAgICAgZ3JpZF9jb3JyZWN0OiBKU09OLnN0cmluZ2lmeShncmlkY29ycmVjdFJlY1Byb3BzKSxcbiAgICAgIGdyaWRfYW5zd2VyczogSlNPTi5zdHJpbmdpZnkoZ3JpZGFuc3dlcnNSZWMpLFxuICAgICAgZ3JpZGFuc3dlcnNfdGltZTogZ3JpZGFuc3dlcnNEYXRlUmVjLFxuICAgICAgc3R1ZHlfcXVlc3Rpb246IHN0dWR5UXVlc3Rpb25SZWMsXG4gICAgICBzdXNfYW5zd2VyczogSlNPTi5zdHJpbmdpZnkoc3VzYW5zd2Vyc1JlYyksXG4gICAgICBzdXNhbnN3ZXJzX3RpbWU6IHN1c2Fuc3dlcnNEYXRlUmVjLFxuICAgICAgc3R1ZHlfY29tcGxldGVkOiBzdHVkeUNvbXBsZXRlZFJlY1xuICAgIH07XG5cbiAgICByZWNvcmRTdHVkeURhdGEuc2V0RXZlbnRBbGwoanNvbkRhdGEpO1xuICB9XG5cbiAgLy8gYWRkcyBoYW5kbGVyIGZvciBhZ2dyZWVpbmcgdG8gZG8gc3R1ZHlcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJBZ3JlZUNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIC8vIGVuc3VyZSBlbGVtZW50IGV4c2lzdHNcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0dWR5VmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktcXVlc3Rpb24nKTtcbiAgICAgICAgY29uc3QgYWdyZWVtZW50VGltZVN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5QWdncmVlbWVudEVsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZWxlbWVudFVJSUR9JHtzdHVkeVZlcnNpb259YCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyAgcmVtb3ZlIGVsZW1lbnRzIGZyb20gVUlcbiAgICAgICAgdGhpcy5zdHVkeUFnZ3JlZW1lbnRFbGVtZW50c1JlbW92ZS5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAgICAgICAgIC8vIG9ubHkgYWRkIGRpc3BsYXkgbm9uZSBjbGFzcyBpZiB0aGUgY2xhc3MgZG9lcyBub3QgZXhzaXN0XG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgZHVwbGljYXRlIGNsYXNzZXMgYXJlIG5vdCBhZGRlZFxuICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VUlJRCkuY2xhc3NMaXN0LmFkZCh0aGlzLmRpc3BsYXlOb25lQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbGl0eS50cmlnZ2VyRXZlbnQoJ2FnZ3JlZS1jbGlja2VkJywgJ2hhbmRsZUFncmVlQ2xpY2snKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCB0cnVlKTtcbiAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQtdGltZScsIGFncmVlbWVudFRpbWVTdGFtcCk7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgcGFnZTogMSB9LCAnI21hcCcsICcjbWFwJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIGFkZHMgaGFuZGxlciBmb3IgRElTYWdncmVlaW5nIHRvIGRvIHN0dWR5XG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBhZGRIYW5kbGVyRGlzYWdyZWVDbGljayhlbGVtZW50SUQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBhZ3JlZW1lbnRUaW1lU3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIC8vIGFkZCBlbGVtZW50cyB0byBVSVxuICAgICAgICB0aGlzLnN0dWR5RGlzYWdncmVlbWVudEVsZW1lbnRzQWRkLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gIHJlbW92ZSBlbGVtZW50cyBmcm9tIFVJXG4gICAgICAgIHRoaXMuc3R1ZHlEaXNhZ2dyZWVtZW50RWxlbWVudHNSZW1vdmUuZm9yRWFjaCgoZWxlbWVudFVJSUQpID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGFkZCBkaXNwbGF5IG5vbmUgY2xhc3MgaWYgdGhlIGNsYXNzIGRvZXMgbm90IGV4c2lzdFxuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGR1cGxpY2F0ZSBjbGFzc2VzIGFyZSBub3QgYWRkZWRcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRVSUlEKS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5kaXNwbGF5Tm9uZUNsYXNzKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFVJSUQpLmNsYXNzTGlzdC5hZGQodGhpcy5kaXNwbGF5Tm9uZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxpdHkudHJpZ2dlckV2ZW50KCdkaXNhZ2dyZWUtY2xpY2tlZCcsICdoYW5kbGVBZ3JlZUNsaWNrJyk7XG4gICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50JywgZmFsc2UpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudC10aW1lJywgYWdyZWVtZW50VGltZVN0YW1wKTtcbiAgICAgICAgSGFuZGxlcnMucmVjb3JkRGlzYWdncmVlZCgpO1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IHBhZ2U6IDEgfSwgJyNkaXNhZ2dyZWUnLCAnI2Rpc2FnZ3JlZScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBhZGRzIGhhbmRsZXIgZm9yIGluZGl2aWR1YWwgc3VzIHNjb3JlIHF1ZXN0aW9ucyB0byBsb2NhbCBzdG9yYWdlXG4gIC8vXG4gIC8vIEBwYXJhbSBlbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSURcbiAgLy8gQHJldHVybiBudWxsXG4gIGFkZEhhbmRsZXJTVVNRdWVzdGlvbkNsaWNrKGVsZW1lbnRJRCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpO1xuICAgIHRoaXMuc2VsZWN0ZWRDbGFzcyA9ICdzZWxlY3RlZCc7XG5cbiAgICAvLyBlbnN1cmUgZWxlbWVudCBleHNpc3RzXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBnZXQgcGFyZW50IGVsZW1lbnQgd2hpY2ggaXMgYnV0dG9uIGdyb3VwXG4gICAgICAgIGNvbnN0IHBhcmVudEJ0bkdyb3VwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIEhhbmRsZXJzLnRvZ2dsZUJ1dHRvbkdyb3VwQnV0dHRvbnNPZmYocGFyZW50QnRuR3JvdXAsIHRoaXMuc2VsZWN0ZWRDbGFzcyk7XG5cbiAgICAgICAgY29uc3QgcXVlc3Rpb25UZXh0ID0gcGFyZW50QnRuR3JvdXAuaWQucmVwbGFjZSgnYnRuLWdyb3VwLXN1cy0nLCAnc3VzLXF1ZXN0aW9uLScpO1xuICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0ocXVlc3Rpb25UZXh0LCBOdW1iZXIoZS50YXJnZXQuaW5uZXJUZXh0KSk7XG5cbiAgICAgICAgLy8gYWRkIHN1cyBxdWVzdGlvbiBhbnN3ZXIgdG8gc2VsZWN0ZWQgdG8gY2xhc3NcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuc2VsZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuY2xhc3NMaXN0LmFkZCh0aGlzLnNlbGVjdGVkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyByZW1vdmVzIHRoZSBzZWxlY3RlZCBjbGFzcyBcInVuc2xlY3RzXCIgYWxsIHRoZSBidXR0b25zXG4gIC8vICBpbiBhIGJ1dHRvbiBncm91cFxuICAvL1xuICAvLyBAcGFyYW0gYnRuR3JvdXAgLSBIVE1MIGVsZW1lbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHN0YXRpYyB0b2dnbGVCdXR0b25Hcm91cEJ1dHR0b25zT2ZmKGJ0bkdyb3VwLCBzZWxlY3RlZENsYXNzKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBidG5Hcm91cC5jaGlsZE5vZGVzO1xuICAgIC8vIG1ha2Ugc3VyZSBjaGlsZHJlbiBpcyB2YWxpdWQgb2JqZWN0XG4gICAgaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3QoY2hpbGRyZW4pKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSBhcmUgY2hpbGRlcmVuIGJ1dHRvbnNcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFsuLi5jaGlsZHJlbl07XG4gICAgICBjaGlsZHJlbkFycmF5LmZvckVhY2goKGNoaWxkSXRlbSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGRJdGVtLmNsYXNzTGlzdCkge1xuICAgICAgICAgIGNoaWxkSXRlbS5jbGFzc0xpc3QucmVtb3ZlKHNlbGVjdGVkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbi8vIFRPRE9TXG4vLyBwbGF5IHBhdXNlIG9uIGFuaW1hdGlvbiAtIG1heWJlXG5pbXBvcnQgeyBsaWJyYXJ5LCBkb20gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgZmFzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IGZhciB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXJlZ3VsYXItc3ZnLWljb25zJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBNYXBCb3hDb25maWcgfSBmcm9tICcuL21hcC1jb25maWcnO1xuaW1wb3J0IHsgVXRpbGl0eSB9IGZyb20gJy4vdXRpbGl0eSc7XG5pbXBvcnQgeyBIYW5kbGVycyB9IGZyb20gJy4vaGFuZGxlcnMnO1xuXG5pbXBvcnQgYmxvY2tTdHVkeUFnZ3JlZW1lbnQgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktYWdncmVlbWVudC5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5RGlzc2FnZ3JlZSBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1kaXNzYWdncmVlLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlRdWVzdGlvbjEgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktcXVlc3Rpb24tMS5odG1sJztcbmltcG9ydCBibG9ja1N0dWR5UXVlc3Rpb24yIGZyb20gJy4uL2NvbnRlbnQtYmxvY2tzL2Jsb2NrLXN0dWR5LXF1ZXN0aW9uLTIuaHRtbCc7XG5pbXBvcnQgYmxvY2tTdHVkeVF1ZXN0aW9uMyBmcm9tICcuLi9jb250ZW50LWJsb2Nrcy9ibG9jay1zdHVkeS1xdWVzdGlvbi0zLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlTVVMgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktc3VzLmh0bWwnO1xuaW1wb3J0IGJsb2NrU3R1ZHlDb21wbGV0ZWQgZnJvbSAnLi4vY29udGVudC1ibG9ja3MvYmxvY2stc3R1ZHktY29tcGxldGVkLmh0bWwnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuY29uc3QgVVJMUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG4vLyBzdHVkeSBjb25zdHJhaW50cyBudW1iZXIgb2YgcXVlc3Rpb25zIHN0YXJ0cyB3aXRoIDBcbmxldCBzdHVkeVZlcnNpb24gPSAwOyAvLyBkZWZhdWx0IHN0dWR5IHZlcnNpb25cbmlmICh1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicpKSkge1xuICBzdHVkeVZlcnNpb24gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LXF1ZXN0aW9uJyk7XG59IGVsc2Uge1xuICBjb25zdCBzdHVkeU1pbk9uZSA9IDA7XG4gIGNvbnN0IHN0dWR5TWF4T25lID0gMjtcbiAgc3R1ZHlWZXJzaW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHN0dWR5TWF4T25lIC0gc3R1ZHlNaW5PbmUgKyAxKSArIHN0dWR5TWluT25lKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1xdWVzdGlvbicsIHN0dWR5VmVyc2lvbik7XG59XG5cbi8vIHN0dWR5IGNvbnN0cmFpbnRzIG51bWJlciBvZiBxdWVzdGlvbnMgc3RhcnRzIHdpdGggMFxubGV0IG1hcFZlcnNpb24gPSAwOyAvLyBkZWZhdWx0IHN0dWR5IHZlcnNpb25cbmlmICh1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpKSkge1xuICBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xufSBlbHNlIHtcbiAgY29uc3QgbWFwTWluT25lID0gMDtcbiAgY29uc3QgbWFwTWF4T25lID0gMjtcbiAgbWFwVmVyc2lvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXBNYXhPbmUgLSBtYXBNaW5PbmUgKyAxKSArIG1hcE1pbk9uZSk7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nLCBtYXBWZXJzaW9uKTtcbn1cblxuaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgndXVpZCcsIHV0aWxpdHkudXVpZCgpLnRvU3RyaW5nKCkpO1xufVxuXG5pZiAoIXV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWNvbXBsZXRlZCcpKSkge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWNvbXBsZXRlZCcsIGZhbHNlKTtcbn1cblxuaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdXNhbnN3ZXJzLXN1Ym1pdGVkJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnc3VzYW5zd2Vycy1zdWJtaXRlZCcsIGZhbHNlKTtcbn1cblxuaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdncmlkLXN1Ym1pdGVkJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnZ3JpZC1zdWJtaXRlZCcsIGZhbHNlKTtcbn1cblxuaWYgKCF1dGlsaXR5LmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCBmYWxzZSk7XG59XG5cbi8vIEtpY2tzIG9mZiB0aGUgcHJvY2VzcyBvZiBmaW5kaW5nIDxpPiB0YWdzIGFuZCByZXBsYWNpbmcgd2l0aCA8c3ZnPlxuLy8gYWRkZXMgc3VwcG9ydCBmb3IgZm9udGF3ZXNvbWVcbmxpYnJhcnkuYWRkKGZhcywgZmFyKTtcbmRvbS53YXRjaCgpO1xuXG5jb25zdCBtYXBCb3hDb25maWcgPSBuZXcgTWFwQm94Q29uZmlnKCk7XG5jb25zdCBoYW5kbGVycyA9IG5ldyBIYW5kbGVycygpO1xuXG4vLyBsb2FkIG9ubHkgdGhlIGJsb2NrIG5lZWRlZFxudXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1hZ2dyZWVtZW50LWhvbGRlcicsIGJsb2NrU3R1ZHlBZ2dyZWVtZW50KTtcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktZGlzc2FnZ3JlZS1ob2xkZXInLCBibG9ja1N0dWR5RGlzc2FnZ3JlZSk7XG51dGlsaXR5LmxvYWRIVE1MQmxvY2soJ2Jsb2NrLXN0dWR5LXN1cy1ob2xkZXInLCBibG9ja1N0dWR5U1VTKTtcbnV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktY29tcGxldGVkLWhvbGRlcicsIGJsb2NrU3R1ZHlDb21wbGV0ZWQpO1xuXG5sZXQgbWFwMTtcbmxldCBtYXAyYTtcbmxldCBtYXAyYjtcbmxldCBtYXAzQXJyO1xubGV0IG1hcGRlZjtcblxuc3dpdGNoIChzdHVkeVZlcnNpb24pIHtcbiAgY2FzZSAwOiAvLyBhbmltYXRlXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0xLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjEpO1xuICAgIG1hcDEgPSBtYXBCb3hDb25maWcubWFrZUFuaW1hdGVNYXAoJ21hcC0xJywgMCk7XG4gICAgYnJlYWs7XG4gIGNhc2UgMTogLy8gc2lkZSBieSBzaWRlXG4gICAgdXRpbGl0eS5sb2FkSFRNTEJsb2NrKCdibG9jay1zdHVkeS1xdWVzdGlvbi0yLWhvbGRlcicsIGJsb2NrU3R1ZHlRdWVzdGlvbjIpO1xuICAgIG1hcDJhID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC0yYScsIDApO1xuICAgIG1hcDJiID0gbWFwQm94Q29uZmlnLm1ha2VNYXAoJ21hcC0yYicsIDEpO1xuICAgIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXAyYSwgbWFwMmIpO1xuICAgIGJyZWFrO1xuICBjYXNlIDI6IC8vIHNsaWRlclxuICAgIHV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktcXVlc3Rpb24tMy1ob2xkZXInLCBibG9ja1N0dWR5UXVlc3Rpb24zKTtcbiAgICBtYXAzQXJyID0gbWFwQm94Q29uZmlnLm1ha2VDb21wYXJlTWFwKCdtYXAtM2EnLCAnbWFwLTNiJywgJ2NvbXBhcmUtd3JhcHBlcicpO1xuICAgIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXAzQXJyWzBdLCBtYXAzQXJyWzFdKTtcbiAgICBicmVhaztcbiAgZGVmYXVsdDogLy8gYW5pbWF0ZVxuICAgIHV0aWxpdHkubG9hZEhUTUxCbG9jaygnYmxvY2stc3R1ZHktcXVlc3Rpb24tMS1ob2xkZXInLCBibG9ja1N0dWR5UXVlc3Rpb24xKTtcbiAgICBtYXBkZWYgPSBtYXBCb3hDb25maWcubWFrZUFuaW1hdGVNYXAoJ21hcC0xJywgMCk7XG4gICAgYnJlYWs7XG59XG5cbi8vIGNyZWF0ZSBhbGwgdGhlIG1hcGJveCBtYXAgb2JqZWN0c1xuLy8gY29uc3QgbWFwRW5kQXJyID0gbWFwQm94Q29uZmlnLm1ha2VDb21wYXJlTWFwKCdtYXAtYy1lbmRhJyxcbi8vICAnbWFwLWMtZW5kYicsICdjb21wYXJlLWVuZC13cmFwcGVyJywgdHJ1ZSwgZmFsc2UpO1xuLy9cbmNvbnN0IG1hcEVuZGEgPSBtYXBCb3hDb25maWcubWFrZU1hcCgnbWFwLWVuZGEnLCAwLCBmYWxzZSwgZmFsc2UpO1xuY29uc3QgbWFwRW5kYiA9IG1hcEJveENvbmZpZy5tYWtlTWFwKCdtYXAtZW5kYicsIDEsIHRydWUsIGZhbHNlKTtcbi8vIG1hcEJveENvbmZpZy5zeW5jTWFwcyhtYXBFbmRBcnJbMF0sIG1hcEVuZEFyclsxXSk7XG5cbi8vIHN5bmMgbWFwc1xubWFwQm94Q29uZmlnLnN5bmNNYXBzKG1hcEVuZGEsIG1hcEVuZGIpO1xuXG4vLyAvLyBUT0RPIG9ubHkgZGVhbCB3aXRoIG1hcCBmb3Igc3R1ZHkgcXVlc3Rpb25cbi8vIC8vIG9ubHkgbG9hZCBodG1sIGJsb2NrIG5lZWRlZCBtYXAgb2JqZWN0cyB3aWxsIGhhdmUgZ2VuZXJpYyBuYW1lcyBhbHNvXG5mdW5jdGlvbiByZXNpemVBbGxNYXBzKCkge1xuICBzd2l0Y2ggKHN0dWR5VmVyc2lvbikge1xuICAgIGNhc2UgMDogLy8gYW5pbWF0ZVxuICAgICAgbWFwMS5yZXNpemUoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTogLy8gc2lkZSBieSBzaWRlXG4gICAgICBtYXAyYS5yZXNpemUoKTtcbiAgICAgIG1hcDJiLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOiAvLyBzbGlkZXJcbiAgICAgIG1hcDNBcnJbMF0ucmVzaXplKCk7XG4gICAgICBtYXAzQXJyWzFdLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDogLy8gYW5pbWF0ZVxuICAgICAgbWFwZGVmLnJlc2l6ZSgpO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgLy8gbWFwRW5kQXJyWzBdLnJlc2l6ZSgpO1xuICAvLyBtYXBFbmRBcnJbMV0ucmVzaXplKCk7XG4gIG1hcEVuZGEucmVzaXplKCk7XG4gIG1hcEVuZGIucmVzaXplKCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnZ3JlZS1jbGlja2VkJywgKCkgPT4ge1xuICByZXNpemVBbGxNYXBzKCk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VzLWNsaWNrZWQnLCAoKSA9PiB7XG4gIG1hcEVuZGEuc2V0Wm9vbSg1KTtcbiAgbWFwRW5kYS5zZXRab29tKDUpO1xuICByZXNpemVBbGxNYXBzKCk7XG4gIC8vIG1hcEVuZEFyclswXS5zZXRab29tKDExKTtcbiAgLy8gbWFwRW5kQXJyWzFdLnNldFpvb20oMTEpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Rpc2FnZ3JlZS1jbGlja2VkJywgKCkgPT4ge1xuICByZXNpemVBbGxNYXBzKCk7XG59KTtcblxuY29uc3QgdXJsU3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5jb25zdCB1cmwgPSBuZXcgVVJMKHVybFN0cmluZyk7XG5jb25zdCBjYW1wYWlnbiA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdjYW1wYWlnbicpO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuY29uc3QgZGF0ZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeSBzdGFydGVkJywgdHJ1ZSk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5IHN0YXJ0ZWQgdGltZScsIGRhdGVzdGFtcCk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ2NhbXBhaWduJywgY2FtcGFpZ24pO1xuc3RvcmUuc2V0U3RhdGVJdGVtKCdtb2JpbGUnLCB1dGlsaXR5LmlzTW9iaWxlRGV2aWNlKCkpO1xuXG4vLyBhbGwgdGhlIEFnZ3JlZW1lbnQgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cyA9IFsnYWdncmVlLWJ1dHRvbiddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gYWdncmVlIHRvXG4vLyBwYXJ0aWNwYXRlIGluIHN0dWR5XG5hZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyQWdyZWVDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gYWxsIHRoZSBEaXNhZ2dyZWVtZW50IGNoYW5nZSBlbGVtZW50cyBwb3NzaWJsZVxuY29uc3QgZGlzYWdncmVtZW50Q2hhbmdlRWxlbWVudHMgPSBbJ2RpYWdncmVlLWJ1dHRvbiddO1xuXG4vLyBlbGVtZW50cyB0byBhZGQgdG8gVUkgYWZ0ZXIgY2xpY2tpbmcgb24gYWdncmVlIHRvXG4vLyBwYXJ0aWNwYXRlIGluIHN0dWR5XG5kaXNhZ2dyZW1lbnRDaGFuZ2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICBoYW5kbGVycy5hZGRIYW5kbGVyRGlzYWdyZWVDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gYWxsIHRoZSBzdWJtaXQgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBzdWJtaXRDaGFuZ2VFbGVtZW50cyA9IFsnc3VibWl0LWJ1dHRvbi10by1zdXMtMCcsICdzdWJtaXQtYnV0dG9uLXRvLXN1cy0xJywgJ3N1Ym1pdC1idXR0b24tdG8tc3VzLTInXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIHN1Ym1pdCBjaGFuZ2Vcbi8vIGZyb20gb25lIG9mIHRocmVlIG1hcCBxdWVzdGlvbnNcbnN1Ym1pdENoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTdWJtaXRDaGFuZ2VDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gYWxsIHRoZSBTVVMgY2hhbmdlIGVsZW1lbnRzIHBvc3NpYmxlXG5jb25zdCBzdXNDaGFuZ2VFbGVtZW50cyA9IFsnc3VibWl0LWJ1dHRvbi10by1lbmQnXTtcblxuLy8gZWxlbWVudHMgdG8gYWRkIHRvIFVJIGFmdGVyIGNsaWNraW5nIG9uIHN1Ym1pdCBjaGFuZ2Vcbi8vIGZyb20gb25lIG9mIHRocmVlIG1hcCBxdWVzdGlvbnNcbnN1c0NoYW5nZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnRVSUlEKSA9PiB7XG4gIGhhbmRsZXJzLmFkZEhhbmRsZXJTdWJtaXRTVVNDbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gb25seSB1cGRhdGVzIG9uZSBtYXAgaG93IGRvIGdldCBldmVyeSBtYXBcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dyaWQtdXBkYXRlJywgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gIHN3aXRjaCAoc3R1ZHlWZXJzaW9uKSB7XG4gICAgY2FzZSAwOiAvLyBhbmltYXRlXG4gICAgICBtYXAxLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6IC8vIHNpZGUgYnkgc2lkZVxuICAgICAgbWFwMmEuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgICAgIG1hcDJiLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6IC8vIHNsaWRlclxuICAgICAgbWFwM0FyclswXS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgICAgbWFwM0FyclsxXS5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDogLy8gYW5pbWF0ZVxuICAgICAgbWFwZGVmLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgICBicmVhaztcbiAgfVxuICAvLyBtYXBFbmRBcnJbMF0uZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgLy8gbWFwRW5kQXJyWzFdLmdldFNvdXJjZSgnY2hhbmdlLWdyaWQnKS5zZXREYXRhKGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTik7XG4gIG1hcEVuZGEuZ2V0U291cmNlKCdjaGFuZ2UtZ3JpZCcpLnNldERhdGEoY3VycmVudFNxdWFyZUdyaWRHZW9KU09OKTtcbiAgbWFwRW5kYi5nZXRTb3VyY2UoJ2NoYW5nZS1ncmlkJykuc2V0RGF0YShjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04pO1xufSk7XG5cbmNvbnN0IHN1c0J0bkdyb3VwRWxlbWVudHMgPSBbJ2J0bi1ncm91cC1zdXMtMScsXG4gICdidG4tZ3JvdXAtc3VzLTInLFxuICAnYnRuLWdyb3VwLXN1cy0zJyxcbiAgJ2J0bi1ncm91cC1zdXMtNCcsXG4gICdidG4tZ3JvdXAtc3VzLTUnLFxuICAnYnRuLWdyb3VwLXN1cy02JyxcbiAgJ2J0bi1ncm91cC1zdXMtNycsXG4gICdidG4tZ3JvdXAtc3VzLTgnLFxuICAnYnRuLWdyb3VwLXN1cy05JyxcbiAgJ2J0bi1ncm91cC1zdXMtMTAnXTtcblxuc3VzQnRuR3JvdXBFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50VUlJRCkgPT4ge1xuICAvLyBhZGQgcXVlc3Rpb24gaGFuZGxlclxuICBoYW5kbGVycy5hZGRIYW5kbGVyU1VTUXVlc3Rpb25DbGljayhlbGVtZW50VUlJRCk7XG59KTtcblxuLy8gcmVtb3ZlIGltYWdlcnkgZGlyZWN0aW9ucyB3aGVuIG5vdCBpbWFnZXJ5XG5pZiAobWFwVmVyc2lvbiAhPT0gMikge1xuICBjb25zdCBpbWFnZXJ5RGlyZWN0aW9uc0VsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvci1zYXQnKTtcblxuICBpbWFnZXJ5RGlyZWN0aW9uc0VsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBlbGVtLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZSAhaW1wb3J0YW50Jyk7XG4gIH0pO1xufVxuXG4vLyBzdXMgcXVlc3Rpb24gc3RhdGUgaXRlbXNcbmNvbnN0IHN1c05hbWUgPSAnc3VzLXF1ZXN0aW9uLSc7XG5jb25zdCBzdXNJdGVyYXRpb25zID0gMTA7XG51dGlsaXR5LnNldFN0YXRlRm9yR3JvdXAoc3VzTmFtZSwgc3VzSXRlcmF0aW9ucyk7XG51dGlsaXR5LnNldERvbVN0YXRlRm9yR3JvdXAoc3VzTmFtZSwgc3VzSXRlcmF0aW9ucyk7XG5cbi8vIGFkZCBncmlkIGJveCBzdGF0ZSBpdGVtc1xuY29uc3QgZ3JpZEl0ZXJhdGlvbnMgPSA0MjtcbmNvbnN0IGdyaWROYW1lID0gJ2dyaWQtYm94LSc7XG51dGlsaXR5LnNldFN0YXRlRm9yR3JvdXAoZ3JpZE5hbWUsIGdyaWRJdGVyYXRpb25zKTtcblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBpc1N0dWR5Y29tcGxldGVkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1jb21wbGV0ZWQnKTtcbmxldCBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBpc1N0dWR5Y29tcGxldGVkID09PSAnYm9vbGVhbicpIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBpc1N0dWR5Y29tcGxldGVkO1xufSBlbHNlIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBmYWxzZTtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgYWdncmVlaW5nIHRvIHN0dWR5XG5jb25zdCBTdHVkeUFncnJlZW1lbnQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xubGV0IHN0dWR5QWdycmVlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBTdHVkeUFncnJlZW1lbnQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUFncnJlZWQgPSBTdHVkeUFncnJlZW1lbnQ7XG59IGVsc2Uge1xuICBzdHVkeUFncnJlZWQgPSBmYWxzZTtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3Igc3VibWl0dGluZyBzdHVkeVxuY29uc3QgZ3JpZFN1Ym1pdGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2dyaWQtc3VibWl0ZWQnKTtcbmxldCBncmlkU3VibWl0ZWQgPSBmYWxzZTtcbmlmICh0eXBlb2YgZ3JpZFN1Ym1pdGVkU3RhdGUgPT09ICdib29sZWFuJykge1xuICBncmlkU3VibWl0ZWQgPSBncmlkU3VibWl0ZWRTdGF0ZTtcbn0gZWxzZSB7XG4gIGdyaWRTdWJtaXRlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBzdWJtaXR0aW5nIHN1cyBxdWVzdGlvbnNcbmNvbnN0IHN1c1N1Ym1pdGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N1c2Fuc3dlcnMtc3VibWl0ZWQnKTtcbmxldCBzdXNTdWJtaXRlZCA9IGZhbHNlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5pZiAodHlwZW9mIGdyaWRTdWJtaXRlZFN0YXRlID09PSAnYm9vbGVhbicpIHtcbiAgc3VzU3VibWl0ZWQgPSBzdXNTdWJtaXRlZFN0YXRlO1xufSBlbHNlIHtcbiAgc3VzU3VibWl0ZWQgPSBmYWxzZTtcbn1cblxuLy8gc3VibWl0IGJ1dHRvbnNcbmNvbnN0IGFnZ3JlbWVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdncmVlLWJ1dHRvbicpO1xuY29uc3QgZGlhZ2dyZWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWdncmVlLWJ1dHRvbicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5jb25zdCBncmlkU3VibWl0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzdWJtaXQtYnV0dG9uLXRvLXN1cy0ke3N0dWR5VmVyc2lvbn1gKTtcbmNvbnN0IGNvbXBsZXRlZFN1Ym1pdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbi10by1lbmQnKTtcblxuaWYgKHN0dWR5QWdycmVlZCkge1xuICBzd2l0Y2ggKFVSTFBhdGgpIHtcbiAgICBjYXNlICcjJzpcbiAgICAgIGlmIChzdHVkeUFncnJlZWQpIHtcbiAgICAgICAgaWYgKGFnZ3JlbWVudEVsZW1lbnQpIHtcbiAgICAgICAgICBhZ2dyZW1lbnRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJyNtYXAnOlxuICAgICAgaWYgKHN0dWR5QWdycmVlZCkge1xuICAgICAgICBpZiAoYWdncmVtZW50RWxlbWVudCkge1xuICAgICAgICAgIGFnZ3JlbWVudEVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnI3N1cy1xdWVzdGlvbnMnOlxuICAgICAgaWYgKGdyaWRTdWJtaXRlZCkge1xuICAgICAgICBpZiAoZ3JpZFN1Ym1pdEVsZW1lbnQpIHtcbiAgICAgICAgICBncmlkU3VibWl0RWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHN0dWR5QWdycmVlZCkge1xuICAgICAgICBpZiAoYWdncmVtZW50RWxlbWVudCkge1xuICAgICAgICAgIGFnZ3JlbWVudEVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufSk7XG5cbi8vIGhpZGUgc3R1ZHlcbmlmIChzdHVkeUNvbXBsZXRlZCkge1xuICBpZiAoY29tcGxldGVkU3VibWl0RWxlbWVudCkge1xuICAgIGNvbXBsZXRlZFN1Ym1pdEVsZW1lbnQuY2xpY2soKTtcbiAgfVxufVxuIiwiaW1wb3J0IG1hcGJveGdsIGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgTWFwYm94Q29tcGFyZSBmcm9tICdtYXBib3gtZ2wtY29tcGFyZSc7XG5pbXBvcnQgeyBwb2x5Z29uLCBmZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuLy8gaW1wb3J0IGNlbnRlciBmcm9tICdAdHVyZi9jZW50ZXInO1xuaW1wb3J0IHsgVXRpbGl0eSB9IGZyb20gJy4vdXRpbGl0eSc7XG4vLyBpbXBvcnQgc3F1YXJlR3JpZCBmcm9tICdAdHVyZi9zcXVhcmUtZ3JpZCc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IFNxdWFyZUdyaWRHZW9KU09OT25lIGZyb20gJy4vc3F1YXJlLWdyaWQtZ2VvanNvbi5qc29uJztcbmltcG9ydCBTcXVhcmVHcmlkR2VvSlNPTlNlY29uZCBmcm9tICcuL3NxdWFyZS1ncmlkLWdlb2pzb24tc2Vjb25kLmpzb24nO1xuaW1wb3J0IFNxdWFyZUdyaWRHZW9KU09OVGhpcmQgZnJvbSAnLi9zcXVhcmUtZ3JpZC1nZW9qc29uLXRoaXJkLmpzb24nO1xuXG5jb25zdCBzeW5jTW92ZSA9IHJlcXVpcmUoJ0BtYXBib3gvbWFwYm94LWdsLXN5bmMtbW92ZScpO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCB1dGlsaXR5ID0gbmV3IFV0aWxpdHkoKTtcblxuZXhwb3J0IGNsYXNzIE1hcEJveENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWFwVmVyc2lvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbWFwLXZlcnNpb24nKTtcbiAgICBzd2l0Y2ggKHRoaXMubWFwVmVyc2lvbikge1xuICAgICAgY2FzZSAwOiAvLyBhdmxcbiAgICAgICAgaWYgKHV0aWxpdHkuY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJykpKSB7XG4gICAgICAgICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gU3F1YXJlR3JpZEdlb0pTT05PbmU7XG4gICAgICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicsIFNxdWFyZUdyaWRHZW9KU09OT25lKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTogLy8gaHN0blxuICAgICAgICBpZiAodXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKSkpIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBTcXVhcmVHcmlkR2VvSlNPTlNlY29uZDtcbiAgICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05TZWNvbmQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOiAvLyBsdlxuICAgICAgICBpZiAodXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKSkpIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkO1xuICAgICAgICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nLCBTcXVhcmVHcmlkR2VvSlNPTlRoaXJkKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IC8vIGF2bFxuICAgICAgICBpZiAodXRpbGl0eS5jaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nKSkpIHtcbiAgICAgICAgICB0aGlzLnNxdWFyZUdyaWRHZW9KU09OID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzcXVhcmVHcmlkR2VvSlNPTicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3F1YXJlR3JpZEdlb0pTT04gPSBTcXVhcmVHcmlkR2VvSlNPTk9uZTtcbiAgICAgICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJywgU3F1YXJlR3JpZEdlb0pTT05PbmUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuZGVmYXVsdE1hcFN0eWxlID0gJ21hcGJveDovL3N0eWxlcy9tYXBib3gvc3RyZWV0cy12MTEnO1xuICAgIHRoaXMuZGVmYXVsdE1hcENlbnRlciA9IFstODIuNTcwLCAzNS41NjBdOyAvLyBzdGFydGluZyBwb3NpdGlvbiBbbG5nLCBsYXRdXG4gICAgdGhpcy5kZWZhdWx0TWF4Qm91bmRzID0gWy04Mi43MDIsIDM1LjQ2MywgLTgyLjQ0MiwgMzUuNjU3XTtcbiAgICB0aGlzLmRlZmF1bHRNYXBab29tID0gNTsgLy8gc3RhcnRpbmcgem9vbVxuICAgIHRoaXMuZGVmYXVsdE1hcENvbnRhaW5lciA9ICdtYXAnO1xuICAgIHRoaXMuZGFya01hcFN0eWxlID0gJ21hcGJveDovL3N0eWxlcy9tYXBib3gvZGFyay12MTAnO1xuICAgIHRoaXMubGlnaHRNYXBTdHlsZSA9ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L2xpZ2h0LXYxMCc7XG4gICAgdGhpcy5tYXBib3hnbCA9IG1hcGJveGdsO1xuICAgIHRoaXMuTWFwYm94Q29tcGFyZSA9IE1hcGJveENvbXBhcmU7XG4gICAgdGhpcy5tYXBib3hnbC5hY2Nlc3NUb2tlbiA9ICdway5leUoxSWpvaVpHRjJaV2x6YlNJc0ltRWlPaUpDZGpVeFQwRnpJbjAuVjlvSWtfd1VjNHVadTdVQmJsUjhtdyc7XG4gICAgdGhpcy5xdWlldCA9IHRydWU7XG4gICAgdGhpcy5tYXAxID0gbnVsbDtcbiAgICB0aGlzLm1hcDIgPSBudWxsO1xuICAgIHRoaXMuZGVmYXVsdEdyZXlCb3ggPSAnIzU1NTU1NSc7XG4gICAgdGhpcy5zZWxlY3RlZEJveCA9ICcjRkJCMDNCJztcbiAgICB0aGlzLm1hcENoYW5nZUxheWVycyA9IHtcbiAgICAgIGxheWVyczogW1xuICAgICAgICBbIC8vIGF2bCAwXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2lrbm93XzEve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBbLTgyLjY0NywgMzUuNTA3LCAtODIuNDk4LCAzNS42MTJdLFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBbLTgyLjcwMiwgMzUuNDQyLCAtODIuNDYyLCAzNS42NTddXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvaWtub3dfMi97en0ve3h9L3t5fS5wbmcnLFxuICAgICAgICAgICAgbWluem9vbTogMSxcbiAgICAgICAgICAgIG1heHpvb206IDE0LFxuICAgICAgICAgICAgc2NoZW1lOiAndG1zJyxcbiAgICAgICAgICAgIHRpbGVTaXplOiAyNTYsXG4gICAgICAgICAgICBib3VuZHM6IFstODIuNjQ3LCAzNS41MDcsIC04Mi40OTgsIDM1LjYxMl0sXG4gICAgICAgICAgICBtYXhib3VuZHM6IFstODIuNzAyLCAzNS40NDIsIC04Mi40NjIsIDM1LjY1N11cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFsgLy8gaHN0biAxXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2xhbmRjb3Zlcl8xL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICAgICAgbWF4em9vbTogMTQsXG4gICAgICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgICAgIGJvdW5kczogWy05NS45NDAsIDI5LjY3MSwgLTk1Ljc5MSwgMjkuNzc1XSxcbiAgICAgICAgICAgIG1heGJvdW5kczogWy05NS45OTIsIDI5LjYyNSwgLTk1LjczOSwgMjkuODIwXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2xhbmRjb3Zlcl8yL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICAgICAgbWF4em9vbTogMTQsXG4gICAgICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgICAgIGJvdW5kczogWy05NS45NDAsIDI5LjY3MSwgLTk1Ljc5MSwgMjkuNzc1XSxcbiAgICAgICAgICAgIG1heGJvdW5kczogWy05NS45OTIsIDI5LjYyNSwgLTk1LjczOSwgMjkuODIwXVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgWyAvLyBsdiAyXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kYXZlaXNtLmdpdGh1Yi5pby9jaGFuZ2UtcmVzZWFyY2gvZGlzdC9tYXBzL2xha2VtZWFkXzEve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICAgICAgIG1pbnpvb206IDEsXG4gICAgICAgICAgICBtYXh6b29tOiAxNCxcbiAgICAgICAgICAgIHNjaGVtZTogJ3RtcycsXG4gICAgICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICAgICAgYm91bmRzOiBbLTExNC44OTksIDM2LjA3OTUsIC0xMTQuNzUwLCAzNi4xODNdLFxuICAgICAgICAgICAgbWF4Ym91bmRzOiBbLTExNC45NTUsIDM2LjAzNCwgLTExNC42OTQsIDM2LjIyOF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9sYWtlbWVhZF8yL3t6fS97eH0ve3l9LnBuZycsXG4gICAgICAgICAgICBtaW56b29tOiAxLFxuICAgICAgICAgICAgbWF4em9vbTogMTQsXG4gICAgICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICAgICAgdGlsZVNpemU6IDI1NixcbiAgICAgICAgICAgIGJvdW5kczogWy0xMTQuODk5LCAzNi4wNzk1LCAtMTE0Ljc1MCwgMzYuMTgzXSxcbiAgICAgICAgICAgIG1heGJvdW5kczogWy0xMTQuOTU1LCAzNi4wMzQsIC0xMTQuNjk0LCAzNi4yMjhdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lID0gW1xuICAgICAgJ2h0dHBzOi8vZGF2ZWlzbS5naXRodWIuaW8vY2hhbmdlLXJlc2VhcmNoL2Rpc3QvbWFwcy9ubGNkLTIwMTYtMzAve3p9L3t4fS97eX0ucG5nJyxcbiAgICAgICdodHRwczovL2RhdmVpc20uZ2l0aHViLmlvL2NoYW5nZS1yZXNlYXJjaC9kaXN0L21hcHMvbmxjZC0yMDAxLTMwL3t6fS97eH0ve3l9LnBuZydcbiAgICBdO1xuICB9XG5cbiAgLy8gU2V0cyBhbiBpbmRpdmlkdWFsIG1hcGJveCBtYXAgdGVzdFxuICAvL1xuICAvLyBAcGFyYW0gbWFwQ29udGFpbmVyIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gbmV3IG1hcGJveCBtYXAgb2JqZWN0XG4gIG1ha2VNYXAobWFwQ29udGFpbmVyID0gdGhpcy5kZWZhdWx0TWFwQ29udGFpbmVyLCBtYXBJbmRleCA9IDAsIGVuZCA9IGZhbHNlLCBlbmFibGVjbGljayA9IHRydWUpIHtcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuICAgIGNvbnN0IG1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcENvbnRhaW5lcixcbiAgICAgIHN0eWxlOiB0aGlzLmRhcmtNYXBTdHlsZSxcbiAgICAgIHpvb206IHRoaXMuZGVmYXVsdE1hcFpvb20sXG4gICAgICBzaG93Wm9vbTogdHJ1ZSxcbiAgICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgICAgbWF4Qm91bmRzOiBtYXBTZXR1cFttYXBJbmRleF0ubWF4Ym91bmRzXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ2xvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5maXRNeUJvdW5kcyhtYXApO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCBtYXBJbmRleCkpO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkQ29ycmVjdExheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRMYXllcigpKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmFibGVjbGljaykge1xuICAgICAgICB0aGlzLmFkZEdyaWRDbGljayhtYXApO1xuICAgICAgfVxuICAgICAgbWFwLnNldFpvb20odGhpcy5kZWZhdWx0TWFwWm9vbSk7XG4gICAgICBtYXAucmVzaXplKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbWFwLnJlc2l6ZSgpOyB9LCAxMCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cub25sb2FkID0gKGUpID0+IHtcbiAgICAgIG1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgbWFwLnJlc2l6ZSgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG1hcC5yZXNpemUoKTsgfSwgMTApO1xuICAgIH07XG4gICAgbWFwLmFkZENvbnRyb2wobmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKHsgc2hvd0NvbXBhc3M6IGZhbHNlIH0pLCAndG9wLWxlZnQnKTtcbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgLy8gU2V0cyB1cCBhbmltYXRlZCBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG1hcENvbnRhaW5lciAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIG5ldyBtYXBib3ggbWFwIG9iamVjdFxuICBtYWtlQW5pbWF0ZU1hcChtYXBDb250YWluZXIgPSB0aGlzLmRlZmF1bHRNYXBDb250YWluZXIpIHtcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuXG4gICAgY29uc3QgbWFwID0gbmV3IHRoaXMubWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogbWFwQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMuZGFya01hcFN0eWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmRlZmF1bHRNYXBDZW50ZXIsXG4gICAgICB6b29tOiB0aGlzLmRlZmF1bHRNYXBab29tLFxuICAgICAgc2hvd1pvb206IHRydWUsXG4gICAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgICBrZXliaW5kaW5nczogdHJ1ZSxcbiAgICAgIG1heEJvdW5kczogbWFwU2V0dXBbMF0ubWF4Ym91bmRzXG4gICAgfSk7XG5cbiAgICBtYXAub24oJ2xvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5maXRNeUJvdW5kcyhtYXApO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAwKSk7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5tYWtlVE1TTGF5ZXIodGhpcy5tYXBDaGFuZ2VMYXllcnNPbmUsIDEpKTtcbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLm1ha2VHcmlkT3V0TGluZUxheWVyKCkpO1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRMYXllcigpKTtcbiAgICAgIHRoaXMuYWRkR3JpZENsaWNrKG1hcCk7XG4gICAgICBtYXAucmVzaXplKCk7XG5cbiAgICAgIGNvbnN0IGluZGV4Q291bnQgPSAyO1xuICAgICAgbGV0IGluZGV4ID0gMDtcblxuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpbmRleCA9IChpbmRleCArIDEpICUgaW5kZXhDb3VudDtcbiAgICAgICAgaWYgKGluZGV4ID09PSAxKSB7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTEnLCAndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTAnLCAndmlzaWJpbGl0eScsICdub25lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTAnLCAndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgbWFwLnNldExheW91dFByb3BlcnR5KCdtYXAtY2hhbmdlLTEnLCAndmlzaWJpbGl0eScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xuXG4gICAgd2luZG93Lm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBtYXAuc2V0Wm9vbSh0aGlzLmRlZmF1bHRNYXBab29tKTtcbiAgICAgIG1hcC5yZXNpemUoKTtcbiAgICB9O1xuICAgIC8vIEFkZCB6b29tIGFuZCByb3RhdGlvbiBjb250cm9scyB0byB0aGUgbWFwLlxuICAgIG1hcC5hZGRDb250cm9sKG5ldyBtYXBib3hnbC5OYXZpZ2F0aW9uQ29udHJvbCh7IHNob3dDb21wYXNzOiBmYWxzZSB9KSwgJ3RvcC1sZWZ0Jyk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIC8vIG1ha2VDb21wYXJlTWFwIFNldHMgYW4gY29tcGFyaW5nIG1hcCBcInN3aXBpbmdcIiBtYXBib3ggbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBtYXBDb250YWluZXIgLSBzdHJpbmdcbiAgLy8gQHJldHVybiBhcnJheSBvZiBtYXBzIG5ldyBtYXBib3ggbWFwIG9iamVjdFxuICBtYWtlQ29tcGFyZU1hcChtYXBCZWZvcmVDb250YWluZXIsIG1hcEFmdGVyQ29udGFpbmVyLCBtYXBDb21wYXJlV3JhcHBlcklELFxuICAgIGVuZCA9IGZhbHNlLCBlbmFibGVjbGljayA9IHRydWUpIHtcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuXG4gICAgY29uc3QgYmVmb3JlTWFwID0gbmV3IHRoaXMubWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogbWFwQmVmb3JlQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMuZGFya01hcFN0eWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmRlZmF1bHRNYXBDZW50ZXIsXG4gICAgICB6b29tOiB0aGlzLmRlZmF1bHRNYXBab29tLFxuICAgICAgc2hvd1pvb206IHRydWUsXG4gICAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgICBrZXliaW5kaW5nczogdHJ1ZSxcbiAgICAgIG1heEJvdW5kczogbWFwU2V0dXBbMF0ubWF4Ym91bmRzXG4gICAgfSk7XG5cbiAgICBjb25zdCBhZnRlck1hcCA9IG5ldyB0aGlzLm1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IG1hcEFmdGVyQ29udGFpbmVyLFxuICAgICAgc3R5bGU6IHRoaXMuZGFya01hcFN0eWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmRlZmF1bHRNYXBDZW50ZXIsXG4gICAgICB6b29tOiB0aGlzLmRlZmF1bHRNYXBab29tLFxuICAgICAgc2hvd1pvb206IHRydWUsXG4gICAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgICBrZXliaW5kaW5nczogdHJ1ZSxcbiAgICAgIG1heEJvdW5kczogbWFwU2V0dXBbMV0ubWF4Ym91bmRzXG4gICAgfSk7XG4gICAgY29uc3QgY29tcGFyZSA9IG5ldyB0aGlzLk1hcGJveENvbXBhcmUoYmVmb3JlTWFwLCBhZnRlck1hcCwgYCMke21hcENvbXBhcmVXcmFwcGVySUR9YCk7XG5cbiAgICBiZWZvcmVNYXAub24oJ2xvYWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5maXRNeUJvdW5kcyhiZWZvcmVNYXApO1xuICAgICAgYmVmb3JlTWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAxKSk7IC8vIG5lZWRzIHVwZGF0ZVxuICAgICAgYmVmb3JlTWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRPdXRMaW5lTGF5ZXIoKSk7XG4gICAgICBiZWZvcmVNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZExheWVyKCkpO1xuICAgICAgaWYgKGVuYWJsZWNsaWNrKSB7XG4gICAgICAgIHRoaXMuYWRkR3JpZENsaWNrKGJlZm9yZU1hcCk7XG4gICAgICB9XG4gICAgICBiZWZvcmVNYXAuc2V0Wm9vbSh0aGlzLmRlZmF1bHRNYXBab29tKTtcbiAgICAgIGJlZm9yZU1hcC5yZXNpemUoKTtcbiAgICAgIGNvbXBhcmUuc2V0U2xpZGVyKDE1MCk7XG4gICAgfSk7XG5cbiAgICBhZnRlck1hcC5vbignbG9hZCcsIChlKSA9PiB7XG4gICAgICB0aGlzLmZpdE15Qm91bmRzKGFmdGVyTWFwKTtcbiAgICAgIGFmdGVyTWFwLmFkZExheWVyKHRoaXMubWFrZVRNU0xheWVyKHRoaXMubWFwQ2hhbmdlTGF5ZXJzT25lLCAwKSk7IC8vIG5lZWRzIHVwZGF0ZVxuICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZE91dExpbmVMYXllcigpKTtcbiAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgYWZ0ZXJNYXAuYWRkTGF5ZXIodGhpcy5tYWtlR3JpZENvcnJlY3RMYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFmdGVyTWFwLmFkZExheWVyKHRoaXMubWFrZUdyaWRMYXllcigpKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmFibGVjbGljaykge1xuICAgICAgICB0aGlzLmFkZEdyaWRDbGljayhhZnRlck1hcCk7XG4gICAgICB9XG4gICAgICBhZnRlck1hcC5zZXRab29tKHRoaXMuZGVmYXVsdE1hcFpvb20pO1xuICAgICAgYWZ0ZXJNYXAucmVzaXplKCk7XG4gICAgICBjb21wYXJlLnNldFNsaWRlcigxNTApO1xuICAgIH0pO1xuXG4gICAgd2luZG93Lm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBhZnRlck1hcC5yZXNpemUoKTtcbiAgICAgIGJlZm9yZU1hcC5yZXNpemUoKTtcbiAgICAgIGNvbXBhcmUuc2V0U2xpZGVyKDE1MCk7XG4gICAgfTtcbiAgICAvLyBBZGQgem9vbSBhbmQgcm90YXRpb24gY29udHJvbHMgdG8gdGhlIG1hcC5cbiAgICBiZWZvcmVNYXAuYWRkQ29udHJvbChuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woeyBzaG93Q29tcGFzczogZmFsc2UgfSksICd0b3AtbGVmdCcpO1xuICAgIGFmdGVyTWFwLmFkZENvbnRyb2wobmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKHsgc2hvd0NvbXBhc3M6IGZhbHNlIH0pLCAndG9wLWxlZnQnKTtcbiAgICByZXR1cm4gW2JlZm9yZU1hcCwgYWZ0ZXJNYXBdO1xuICB9XG5cbiAgLy8gc3luY3MgdHdvIG1hcHMgem9vbSBhbmQgcGFuXG4gIC8vIG1vZGlmZWQgZnJvbSBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3guanMvZXhhbXBsZS92MS4wLjAvc3luYy1sYXllci1tb3ZlbWVudC9cbiAgLy9cbiAgLy8gQHBhcmFtIG1hcDEgPSBmaXJzdCBtYXBib3ggbWFwIG9iamVjdFxuICAvLyBAcGFyYW0gbWFwMiAgPSBzZWNvbmQgbWFwYm94IG1hcCBvYmplY3RcbiAgLy8gQHJldHVybiBudWxsXG4gIHN5bmNNYXBzKG1hcDEsIG1hcDIpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHN5bmNNb3ZlKG1hcDEsIG1hcDIpO1xuICB9XG5cbiAgbWFrZVRNU0xheWVyKG1hcENoYW5nZSwgbWFwSW5kZXgpIHtcbiAgICAvLyBzdHVkeSBjb25zdHJhaW50cyBudW1iZXIgb2YgcXVlc3Rpb25zIHN0YXJ0cyB3aXRoIDBcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBgbWFwLWNoYW5nZS0ke21hcEluZGV4fWAsXG4gICAgICB0eXBlOiAncmFzdGVyJyxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiAncmFzdGVyJyxcbiAgICAgICAgdGlsZXM6IFttYXBTZXR1cFttYXBJbmRleF0udXJsXSxcbiAgICAgICAgbWluem9vbTogbWFwU2V0dXBbbWFwSW5kZXhdLm1pbnpvb20sXG4gICAgICAgIG1heHpvb206IG1hcFNldHVwW21hcEluZGV4XS5tYXh6b29tLFxuICAgICAgICBzY2hlbWU6ICd0bXMnLFxuICAgICAgICB0aWxlU2l6ZTogMjU2LFxuICAgICAgICBib3VuZHM6IG1hcFNldHVwW21hcEluZGV4XS5ib3VuZHMsXG4gICAgICAgIG1heEJvdW5kczogbWFwU2V0dXBbbWFwSW5kZXhdLm1heGJvdW5kc1xuICAgICAgfSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdyYXN0ZXItZmFkZS1kdXJhdGlvbic6IDBcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gbWFrZXMgY2hhbmdlIGdyaWQgbGF5ZXIgb24gbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBtYWtlR3JpZExheWVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ2NoYW5nZS1ncmlkJyxcbiAgICAgIHR5cGU6ICdmaWxsJyxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICAgIGRhdGE6IHRoaXMuc3F1YXJlR3JpZEdlb0pTT05cbiAgICAgIH0sXG4gICAgICBsYXlvdXQ6IHt9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2ZpbGwtY29sb3InOiBbXG4gICAgICAgICAgJ21hdGNoJyxcbiAgICAgICAgICBbJ2dldCcsICdzZWxlY3RlZCddLFxuICAgICAgICAgIDEsIHRoaXMuc2VsZWN0ZWRCb3gsXG4gICAgICAgICAgLyogb3RoZXIgKi8gdGhpcy5kZWZhdWx0R3JleUJveFxuICAgICAgICBdLFxuICAgICAgICAnZmlsbC1vcGFjaXR5JzogMC41XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIG1ha2VzIGNoYW5nZSBncmlkIGxheWVyIHdoYXQgY29ycmVjdCBvbiBtYXBcbiAgLy9cbiAgLy8gQHBhcmFtIG51bGxcbiAgLy8gQHJldHVybiBudWxsXG4gIG1ha2VHcmlkQ29ycmVjdExheWVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ2NoYW5nZS1ncmlkJyxcbiAgICAgIHR5cGU6ICdmaWxsJyxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICAgIGRhdGE6IHRoaXMuc3F1YXJlR3JpZEdlb0pTT05cbiAgICAgIH0sXG4gICAgICBsYXlvdXQ6IHt9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2ZpbGwtY29sb3InOiBbXG4gICAgICAgICAgJ21hdGNoJyxcbiAgICAgICAgICBbJ2dldCcsICd2J10sXG4gICAgICAgICAgMSwgdGhpcy5zZWxlY3RlZEJveCxcbiAgICAgICAgICAvKiBvdGhlciAqLyB0aGlzLmRlZmF1bHRHcmV5Qm94XG4gICAgICAgIF0sXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiAwLjVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gbWFrZXMgY2hhbmdlIGdyaWQgbGF5ZXIgb24gbWFwXG4gIC8vXG4gIC8vIEBwYXJhbSBudWxsXG4gIC8vIEByZXR1cm4gbnVsbFxuICBtYWtlR3JpZE91dExpbmVMYXllcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdjaGFuZ2UtZ3JpZC1vdXRsaW5lJyxcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICAgIGRhdGE6IHRoaXMuc3F1YXJlR3JpZEdlb0pTT05cbiAgICAgIH0sXG4gICAgICBsYXlvdXQ6IHtcbiAgICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCcsXG4gICAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCdcbiAgICAgIH0sXG4gICAgICBwYWludDoge1xuICAgICAgICAnbGluZS1jb2xvcic6IHRoaXMuZGVmYXVsdEdyZXlCb3gsXG4gICAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBhZGRzIGNsaWNrIG9mIGdyaWQgYm94IHRvIGNhcHR1cmUgd2hpY2ggZ3JpZCB0aGUgdXNlclxuICAvLyB0aGlua3MgY2hhbmdlIGhhcHBlbmQgaW4gb3JnaW5hbCBmcm9tOlxuICAvLyBodHRwczovL2RvY3MubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvZXhhbXBsZS9wb2x5Z29uLXBvcHVwLW9uLWNsaWNrL1xuICAvL1xuICAvLyBAcGFyYW0gbWFwID0gbWFwYm94IG1hcCBvYmplY3QgdG8gdXBkYXRlIHpvb20gYW5kIGNlbnRlciB0b1xuICAvLyBAcmV0dXJuIG51bGxcbiAgYWRkR3JpZENsaWNrKG1hcCkge1xuICAgIC8vIGNvbnN0IG1ha2VHcmlkTGF5ZXIgPSB0aGlzLm1ha2VHcmlkTGF5ZXIoKTtcbiAgICAvLyBXaGVuIGEgY2xpY2sgZXZlbnQgb2NjdXJzIG9uIGEgZmVhdHVyZSBpbiB0aGUgc3RhdGVzIGxheWVyLCBvcGVuIGEgcG9wdXAgYXQgdGhlXG4gICAgLy8gbG9jYXRpb24gb2YgdGhlIGNsaWNrLCB3aXRoIGRlc2NyaXB0aW9uIEhUTUwgZnJvbSBpdHMgcHJvcGVydGllcy5cbiAgICBtYXAub24oJ21vdXNlZW50ZXInLCAnY2hhbmdlLWdyaWQnLCAoZSkgPT4ge1xuICAgICAgbWFwLmdldENhbnZhcygpLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdtb3VzZWxlYXZlJywgJ2NoYW5nZS1ncmlkJywgKGUpID0+IHtcbiAgICAgIG1hcC5nZXRDYW52YXMoKS5zdHlsZS5jdXJzb3IgPSAnJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0pO1xuXG4gICAgbWFwLm9uKCdjbGljaycsICdjaGFuZ2UtZ3JpZCcsIChlKSA9PiB7XG4gICAgICBjb25zdCBmZWF0dXJlID0gZS5mZWF0dXJlc1swXTtcbiAgICAgIGNvbnN0IGlkID0gTnVtYmVyKGZlYXR1cmUucHJvcGVydGllcy5pZCk7XG5cbiAgICAgIC8vIHVkcGF0ZXMgc2VsZWN0ZWQgZ2VvanNvbiBwcm9wZXJpdGVzLnNlbGVjdGVkIDAgb3IgMSBkZXBlbmVkaW5nXG4gICAgICAvLyBpZiB1c2VyIHNlbGVjdGVkIHBvbHlnb25cbiAgICAgIGNvbnN0IG5ld0ZlYXR1cmUgPSBNYXBCb3hDb25maWcudG9nZ2xlU2VsZWN0ZWRGZWF0dXJlKGZlYXR1cmUpO1xuXG4gICAgICAvLyBjcmVhdGUgYSBuZXcgZmVhdHVyZSBjb2xsZWN0aW9uIGZyb20gc2VsZWN0ZWQgZmVhdHVyZVxuICAgICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlcyA9IE1hcEJveENvbmZpZy5tYWtlU2VsZWN0ZWRGZWF0dXJlR2VvSlNPTihuZXdGZWF0dXJlKTtcblxuICAgICAgLy8gdXBkYXRlcyBzcXVhcmVHcmlkR2VvSlNPTiB3aXRoIG5ldyBnZW9qc29uXG4gICAgICBjb25zdCBuZXdTcXVhcmVHcmlkR2VvSlNPTiA9IE1hcEJveENvbmZpZy51cGRhdGVTcXVhcmVHcmlkV2l0aFNlbGVjdGVkRmVhdHVyZXMoc2VsZWN0ZWRGZWF0dXJlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgLy8gc3RvcmUgbmV3IHNxdWFyZSBncmlkIHdpdGggc2xlY3RlZCBib3hlc1xuICAgICAgdGhpcy5zdG9yZVNxdWFyZUdyaWQobmV3U3F1YXJlR3JpZEdlb0pTT04pO1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGUgd2l0aCBzZWxlY3RlZCBmZWF0dXJlXG4gICAgICBNYXBCb3hDb25maWcuc3RvcmVTZWxlY3RlZEZlYXR1cmUoaWQpO1xuXG4gICAgICAvLyB0aWdnZXIgZXZlbnQgc28gYWxsIGRhdGEgc291cmNlcyB1cGRhdGVcbiAgICAgIHV0aWxpdHkudHJpZ2dlckV2ZW50KCdncmlkLXVwZGF0ZScsIGlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHRvZ2dsZXMgdmFsdWUgdGhlIHByb3BlcnRpZXMgKGF0dHJpYnV0ZSkgc2VsZWN0ZWRcbiAgLy8gICAgd2hlbiBhIHVzZXIgY2xpY2tzIHRoZSBncmlkIGJveCA+IDAgd2hlbiBzZWxlY3RlZFxuICAvLyAgICAwIHdoZW4gc2VsZWN0ZVxuICAvL1xuICAvLyBAcGFyYW0gZmVhdHVyZSA9IGdlb2pzb24gZmVhdHVyZSAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIGZlYXR1cmUgPSBnZW9qc29uIGZlYXR1cmVcbiAgc3RhdGljIHRvZ2dsZVNlbGVjdGVkRmVhdHVyZShmZWF0dXJlKSB7XG4gICAgaWYgKGZlYXR1cmUucHJvcGVydGllcy5zZWxlY3RlZCA9PT0gMCkge1xuICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLnNlbGVjdGVkID0gMTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBmZWF0dXJlLnByb3BlcnRpZXMuc2VsZWN0ZWQgPSAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuICAgIHJldHVybiBmZWF0dXJlO1xuICB9XG5cbiAgLy8gc2V0cyB0aGUgc2VsZWN0ZWQgZmVhdHVyZSBpbiBzdGF0ZSA+IDAgd2hlbiBzZWxlY3RlZFxuICAvLyAgICAwIHdoZW4gc2VsZWN0ZVxuICAvL1xuICAvLyBAcGFyYW0gaWQgPSBudW1iZXIgd2hpY2ggcmVwcmVzZW50cyB0aGUgZmVhdHVyZSBpZFxuICAvLyBAcmV0dXJuIG51bGxcbiAgc3RhdGljIHN0b3JlU2VsZWN0ZWRGZWF0dXJlKGlkKSB7XG4gICAgY29uc3QgZ3JpZE5hbWUgPSAnZ3JpZC1ib3gtJztcbiAgICAvLyB6ZXJvIG91dCBcInRvZ2dsZSBvZmZcIiBpZiBncmlkIGlkIGV4aXN0cyBzdGF0ZSBpdGVtXG4gICAgaWYgKHN0b3JlLmdldFN0YXRlSXRlbShgJHtncmlkTmFtZX0ke2lkfWApID4gMCkge1xuICAgICAgc3RvcmUuc2V0U3RhdGVJdGVtKGAke2dyaWROYW1lfSR7aWR9YCwgMCk7XG4gICAgLy8gYWRkIFwidG9nZ2xlIG9uXCIgaWYgIHN0YXRlIGl0ZW0gPiAwIG9yIG5vdCBzZWxlY3RlZFxuICAgIH0gZWxzZSB7XG4gICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYCR7Z3JpZE5hbWV9JHtpZH1gLCBOdW1iZXIoaWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBtYWtlcyB0aGUgc2VsZWN0ZWQgZmVhdHVyZSBhIG5ldyBmZWF0dXJlIGNvbGxlY3Rpb25cbiAgLy9cbiAgLy8gQHBhcmFtIGZlYXR1cmUgPSBnZW9qc29uIGZlYXR1cmUgKHBvcGVydGllcyBhbmQgZ2VvbSlcbiAgLy8gQHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbiAoZnJvbSB0dXJmLmpzKVxuICBzdGF0aWMgbWFrZVNlbGVjdGVkRmVhdHVyZUdlb0pTT04oZmVhdHVyZSkge1xuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihbcG9seWdvbihmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCBmZWF0dXJlLnByb3BlcnRpZXMpXSk7XG4gIH1cblxuICAvLyB1cGRhdGVzIHRoZSBTcXVhcmVHcmlkR2VvSlNPTiBhZnRlciBtZXJnaW5nIGFuZCByZWNvbmNpbGluZ1xuICAvLyAgICB3aXRoIHRoZSBzZWxlY3RlZCBmZWF1dHVyZXNcbiAgLy9cbiAgLy8gQHBhcmFtIHNlbGVjdGVkRmVhdHVyZXMgPSBnZW9qc29uIGZlYXR1cmVjb2xsZWN0b24gcmVwcmVzZW50aW5nIHRoZSBzZWxlY3RlZFxuICAvLyAgICAgICAgZmVhdHVyZXMgKHBvcGVydGllcyBhbmQgZ2VvbSlcbiAgLy8gQHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbiAoZnJvbSB0dXJmLmpzKVxuICBzdGF0aWMgdXBkYXRlU3F1YXJlR3JpZFdpdGhTZWxlY3RlZEZlYXR1cmVzKHNlbGVjdGVkRmVhdHVyZXMpIHtcbiAgICBjb25zdCBjdXJyZW50U3F1YXJlR3JpZEdlb0pTT04gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3NxdWFyZUdyaWRHZW9KU09OJyk7XG4gICAgY29uc3QgY3VycmVudEZlYXR1cmVJZHMgPSBzZWxlY3RlZEZlYXR1cmVzLmZlYXR1cmVzLm1hcChmZWF0dXJlID0+IGZlYXR1cmUucHJvcGVydGllcy5pZCk7XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKHNlbGVjdGVkRmVhdHVyZXMuZmVhdHVyZXMuY29uY2F0KGN1cnJlbnRTcXVhcmVHcmlkR2VvSlNPTi5mZWF0dXJlcy5maWx0ZXIoZmVhdHVyZSA9PiAhY3VycmVudEZlYXR1cmVJZHMuaW5jbHVkZXMoZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKSkpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgLy8gdXBkYXRlcyBzdGF0ZSB3aXRoIHRoZSBuZXcgdmVyc2lvbiBvZiBTcXVhcmVHcmlkR2VvSlNPTlxuICAvLyAgICBjb250YWlucyBzZWxlY3RlZCBmZWF0dXJlcyBhbHNvIChpZiBhbnkgc2VsZWN0ZWQpXG4gIC8vXG4gIC8vIEBwYXJhbSBOZXdTcXVhcmVHcmlkR2VvSlNPTiA9IGdlb2pzb24gZmVhdHVyZWNvbGxlY3RvbiByZXByZXNlbnRpbmdcbiAgLy8gICAgICAgICAgICAgICAgdGhlIG5ldyBmZWF0dXJlcyAocG9wZXJ0aWVzIGFuZCBnZW9tKVxuICAvLyBAcmV0dXJuIG51bGxcbiAgc3RvcmVTcXVhcmVHcmlkKE5ld1NxdWFyZUdyaWRHZW9KU09OKSB7XG4gICAgdGhpcy5zcXVhcmVHcmlkR2VvSlNPTiA9IE5ld1NxdWFyZUdyaWRHZW9KU09OO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3F1YXJlR3JpZEdlb0pTT04nLCBOZXdTcXVhcmVHcmlkR2VvSlNPTik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmaXRNeUJvdW5kcyhtYXApIHtcbiAgICBjb25zdCBtYXBWZXJzaW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdtYXAtdmVyc2lvbicpO1xuICAgIGNvbnN0IG1hcFNldHVwID0gdGhpcy5tYXBDaGFuZ2VMYXllcnMubGF5ZXJzW21hcFZlcnNpb25dO1xuICAgIGNvbnN0IGJvdW5kcyA9IG1hcFNldHVwWzBdLm1heGJvdW5kcztcbiAgICBtYXAuZml0Qm91bmRzKGJvdW5kcywgeyBwYWRkaW5nOiAxMDAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcbmNvbnN0IGRhdGFwaSA9ICdodHRwczovL3NjcmlwdC5nb29nbGUuY29tL21hY3Jvcy9zL0FLZnljYnhSUDlQVkNTSjdZbzRfWFl0cWt6dVNwSGYwY09BbjFub0ZLamRxbmZmQmZTMlpFencvZXhlYyc7XG5cbmV4cG9ydCBjbGFzcyBSZWNvcmRTdHVkeURhdGEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvbyA9IHt9O1xuICAgIHRoaXMuZGF0YXBpID0gZGF0YXBpO1xuICB9XG5cbiAgc2V0RXZlbnQoYWN0aW9uID0gJycsIGNhdGVnb3J5ID0gJycsIGxhYmVsID0gJycsIHZhbHVlID0gMCkge1xuICAgIC8vIGdldCB2YXJyaWFibGVzIGZvclxuICAgIHRoaXMudXVpZCA9IHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIHRoaXMuZGF0YSA9IGxhYmVsO1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcblxuICAgIC8vIHN0dWR5IHRvIEpTT05cbiAgICBjb25zdCBqc29uZGF0YSA9IHtcbiAgICAgIHV1aWQ6IHRoaXMudXVpZCxcbiAgICAgIGNhdGVnb3J5OiB0aGlzLmNhdGVnb3J5LFxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgZGF0ZTogdGhpcy5kYXRlXG4gICAgfTtcblxuICAgIGNvbnN0IGRhdGFBUElVUkwgPSBuZXcgVVJMKHRoaXMuZGF0YXBpKTtcbiAgICBkYXRhQVBJVVJMLnNlYXJjaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoanNvbmRhdGEpO1xuICAgIGZldGNoKGRhdGFBUElVUkwpO1xuICB9XG5cbiAgc2V0RXZlbnRBbGwoanNvbmRhdGEgPSB7fSkge1xuICAgIGNvbnN0IGRhdGFBUElVUkwgPSBuZXcgVVJMKHRoaXMuZGF0YXBpKTtcbiAgICBkYXRhQVBJVVJMLnNlYXJjaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoanNvbmRhdGEpO1xuICAgIGZldGNoKGRhdGFBUElVUkwpO1xuICB9XG59XG4iLCIvLyBpbXBvcnQgeyBTdG9yYWdlQVBJIH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2VBUEknO1xuXG4vKipcbiogVGhpcyBjb21wb25lbnQgaXMgaW50ZW5kZWQgdG8gaGFuZGxlIHRoZSBzdG9yYWdlIGFuZCByZXRyaWV2YWwgb2YgdGhlIHN0YXRlIG9mXG4qIEFzIG9mIHRoaXMgd3JpdGluZyBpdCBpcyB1c2luZyBsb2NhbFN0b3JhZ2UgdG8gZG8gdGhpcy5cbiogVXNlcyBzaW1wbGUgY2xhc3MgaW5zdGFuY2UgbWV0aG9kcyB3aXRoIHRoZSBzaG9ydC1oYW5kIG1ldGhvZCBkZWNsYXJhdGlvblxuKiBwYXR0ZXJuLlxuKlxuKiBUbyBub3RlOiBUaGVyZSBpcyBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgU3RvcmUgYW5kIHRoZSBTdGF0ZS4gQXMgb2YgMGEzMTA2ZVxuKiB0aGUgU3RvcmUgaXMgYSBTdHJpbmcgc2F2ZWQgdG8gdGhlIGJyb3dzZXJzIGxvY2FsU3RvcmFnZSBhbmQgaXMgYSBzZXJpYWxpemVkXG4qIHZlcnNpb24gb2YgdGhlIFN0YXRlLiBUaGUgU3RhdGUgaXMgYW4gT2JqZWN0IHdoaWNoIGlzIGludGVyYWN0ZWQgd2l0aCBieVxuKiBwYXJzaW5nIHRoZSBTdGF0ZSBzdHJpbmcgZnJvbSB0aGUgU3RvcmUsIG1vZGlmeWluZyB0aGUgcmVzdWx0cyBvZiB0aGUgcGFyc2UsXG4qIGFuZCByZS1zZXJpYWxpemluZyBpdCBiYWNrIHRvIHRoZSBTdG9yZS5cbiovXG5jb25zdCBTVEFURV9LRVkgPSAnc3RhdGUnO1xuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAvLyAuLmFuZCBhbiAob3B0aW9uYWwpIGN1c3RvbSBjbGFzcyBjb25zdHJ1Y3Rvci4gSWYgb25lIGlzXG4gIC8vIG5vdCBzdXBwbGllZCwgYSBkZWZhdWx0IGNvbnN0cnVjdG9yIGlzIHVzZWQgaW5zdGVhZDpcbiAgLy8gY29uc3RydWN0b3IoKSB7IH1cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIC8vIHRoaXMuc3RvcmUgPSBuZXcgU3RvcmFnZUFQSSgpO1xuICAgIGlmIChTdG9yZS5zdG9yYWdlQXZhaWxhYmxlKCkpIHtcbiAgICAgIHRoaXMuc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICBpZiAodGhpcy5jaGVja1N0YXRlRXhpc3RzKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0geyBTVEFURV9LRVkgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZXRzIGEga2V5L3ZhbHVlIHBhaXIgdG8gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGVJdGVtKGtleSA9ICcnLCB2YWx1ZSA9ICcnKSB7XG4gICAgY29uc3Qgc3RvcmVPYmogPSB7IFtrZXldOiB2YWx1ZSB9O1xuICAgIGNvbnN0IG5ld1N0YXRlT2JqID0geyAuLi50aGlzLmdldFN0YXRlKCksIC4uLnN0b3JlT2JqIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZU9iaik7XG4gICAgcmV0dXJuIG5ld1N0YXRlT2JqO1xuICB9XG5cbiAgLy8gRGVsZXRlIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvLyAhLy8gV0FSTklORzogb25seSBkb2VzIGEgc2hhbGxvdyBkZWxldGVcbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBkZWxldGVTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICBjb25zdCBzdG9yZU9iaiA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICBkZWxldGUgc3RvcmVPYmpba2V5XTtcbiAgICB0aGlzLnNldFN0YXRlKHN0b3JlT2JqKTtcbiAgICByZXR1cm4gc3RvcmVPYmo7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBlbnRpcmUgc3RhdGUgb2JqZWN0XG4gIC8vXG4gIC8vIEByZXR1cm4gb2JqZWN0XG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSA/IEpTT04ucGFyc2UodGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpIDoge307XG4gIH1cblxuICAvLyBHZXRzIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldEl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oU1RBVEVfS0VZKTtcbiAgfVxuXG4gIC8vIEdldHMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0U3RhdGVJdGVtKGtleSA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tJdGVtKGtleSkgPyB0aGlzLmdldFN0YXRlKClba2V5XSA6IHt9O1xuICB9XG5cbiAgLy8gU2V0cyBhIG5ldyBzdGF0ZSBvYmplY3Qgc3RhdGVcbiAgLy9cbiAgLy8gQHBhcmFtIHZhbHVlIHwgc3RyaW5nXG4gIHNldFN0YXRlKHZhbHVlID0ge30pIHtcbiAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShTVEFURV9LRVksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpID8gSlNPTi5wYXJzZSh0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSkgOiB7fTtcbiAgfVxuXG4gIC8vIENoZWNrcyBpZiB0aGUgc3RhdGUgZXhpc3RzIGluIHRoZSBzdG9yYWdlIHByb3ZpZGVyXG4gIGNoZWNrU3RhdGVFeGlzdHMoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpO1xuICB9XG5cbiAgLy8gR2V0cyB0aGUgc3RhdGUgZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlclxuICAvL1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUFzU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFuIGl0ZW0gaGFzIGJlZW4gc2F2ZWQgdG8gdGhlIHN0b3JlXG4gIC8vIHVudXNlZCBhcyBvZiAwYTMxMDZlXG4gIC8vXG4gIC8vIEBwYXJhbSBpdGVtIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBpc1N0YXRlSXRlbUV4aXN0KGl0ZW0pIHtcbiAgICBpZiAodGhpcy5jaGVja1N0YXRlRXhpc3RzKCkpIHtcbiAgICAgIGNvbnN0IHN0YXRlU3RyID0gdGhpcy5nZXRTdGF0ZUFzU3RyaW5nKCk7XG4gICAgICBpZiAoc3RhdGVTdHIuaW5kZXhPZihpdGVtKSA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vXG4gIC8vIEBwYXJhbSBpdGVtIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBjaGVja0l0ZW0oaXRlbSkge1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSAmJiB0aGlzLmdldFN0YXRlQXNTdHJpbmcoKS5pbmRleE9mKGl0ZW0pID4gMDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGxvY2FsU3RvcmFnZSBhdmFpbGFibGUuXG4gIC8vIFRha2VuIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9TdG9yYWdlX0FQSS9Vc2luZ190aGVfV2ViX1N0b3JhZ2VfQVBJXG4gIC8vXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBzdGF0aWMgc3RvcmFnZUF2YWlsYWJsZSgpIHtcbiAgICBjb25zdCB0eXBlID0gJ2xvY2FsU3RvcmFnZSc7XG4gICAgbGV0IHN0b3JhZ2U7XG4gICAgdHJ5IHtcbiAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICBjb25zdCB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgICAgc3RvcmFnZS5sZW5ndGggIT09IDA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5cbmV4cG9ydCBjbGFzcyBVdGlsaXR5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mb28gPSB7fTtcbiAgICB0aGlzLmNoZWNrID0gZmFsc2U7XG4gIH1cblxuICAvLyBjaGVja3MgaXMgSmF2YXNjcmlwdCBvYmplY3QgaXMgYSB2YWxpZCBvYmplY3RcbiAgLy9cbiAgLy8gQHBhcmFtIG9iaiAtIG9iamVjdFxuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgY2hlY2tWYWxpZE9iamVjdChvYmopIHtcbiAgICB0aGlzLm9iaiA9IG9iajtcbiAgICBpZiAodGhpcy5vYmogPT09IHVuZGVmaW5lZCB8fCB0aGlzLm9iaiA9PT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMub2JqID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIHRoaXMub2JqID09PSAnc3RyaW5nJyAmJiB0aGlzLm9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGNyZWF0ZXMgYSB1dWlkXG4gIC8vXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIHV1aWQoKSB7XG4gICAgdGhpcy5jcnlwdG8gPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSg0KSkuam9pbignLScpO1xuICAgIHJldHVybiB0aGlzLmNyeXB0bztcbiAgfVxuXG4gIC8vIGNoZWNrcyBpZiBjdXJyZW50IGRldmljZSBpcyBhIG1vYmlsZVxuICAvL1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgaXNNb2JpbGVEZXZpY2UoKSB7XG4gICAgdGhpcy5jaGVjayA9IGZhbHNlO1xuICAgIChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSkgcmV0dXJuIHRydWU7fSkobmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8d2luZG93Lm9wZXJhKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHJldHVybiB0aGlzLmNoZWNrO1xuICB9XG5cbiAgLy8gY2hlY2tzIGh0bWwgYXMgYSB0ZW1wbGF0ZS9ibG9ja1xuICAvL1xuICAvLyBAcGFyYW0gcGxhY2VIb2xkZXJFbGVtZW50SUQgLSBIVE1MIGVsZW1lbnQgSUQgdGhhdCB3aWxsIGhvbGQgdGhlIHRlbXBsYXRlXG4gIC8vIEBwYXJhbSB0ZW1wbGF0ZSAtIEhUTUwgY29udGVudFxuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgbG9hZEhUTUxCbG9jayhwbGFjZUhvbGRlckVsZW1lbnRJRCwgdGVtcGxhdGUpIHtcbiAgICBjb25zdCBjb21wb25lbnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxhY2VIb2xkZXJFbGVtZW50SUQpO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRlbXBsYXRlIGV4c2lzdHNcbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIGlmIChjb21wb25lbnRFbGVtICE9IG51bGwpIHtcbiAgICAgICAgY29tcG9uZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdobWwtYmxvY2stbG9hZGVkJywgcGxhY2VIb2xkZXJFbGVtZW50SUQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb21wb25lbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnaG1sLWJsb2NrLXVubG9hZGVkJywgcGxhY2VIb2xkZXJFbGVtZW50SUQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMb2FkIHRlbXBsYXRlIGludG8gcGxhY2Vob2xkZXIgZWxlbWVudFxuICAgICAgICBjb21wb25lbnRFbGVtLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHRyaWdnZXJzIGEgZG9tIGV2ZW50XG4gIC8vXG4gIC8vIEBwYXJhbSBldmVudE5hbWUgLSBzdHJpbmcgZXZlbnQgbmFtZSBmb3IgYSBsaXN0bmVyIHRvIGxpc3RlbiB0b29cbiAgLy8gQHBhcmFtIGRldGFpbCAtIG9iamVjdCBkZXRhaWxzIGZvciBldmVudFxuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgdHJpZ2dlckV2ZW50KGV2ZW50TmFtZSwgZGV0YWlsKSB7XG4gICAgdGhpcy5ldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7IGRldGFpbCB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnQpO1xuICB9XG5cbiAgLy8gaXRlcmF0ZXMgeCBudW1iZXIgb2YgaXRlcmF0aW9ucyBhbmQgc2V0c1xuICAvLyAgICBzdXMgcXVlc3Rpb25zIHRvcCBzdGF0ZVxuICAvL1xuICAvLyBAcGFyYW0gZXZlbnROYW1lIC0gc3RyaW5nIGV2ZW50IG5hbWUgZm9yIGEgbGlzdG5lciB0byBsaXN0ZW4gdG9vXG4gIC8vIEBwYXJhbSBkZXRhaWwgLSBvYmplY3QgZGV0YWlscyBmb3IgZXZlbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHNldERvbVN0YXRlRm9yR3JvdXAoc3RhdGV0ZXh0LCBpdGVyYXRpb25zKSB7XG4gICAgY29uc3QgdmFsdWUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gLCAwKTtcbiAgICBjb25zdCBidG5QcmVmaXggPSBgYnRuLXN1cy1xJHtpdGVyYXRpb25zfS1gO1xuICAgIGNvbnN0IGFnZ3JlbWVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtidG5QcmVmaXh9JHt2YWx1ZX1gKTtcbiAgICBpZiAoYWdncmVtZW50RWxlbWVudCkge1xuICAgICAgYWdncmVtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoaXRlcmF0aW9ucyA+IDApIHtcbiAgICAgIGNvbnN0IG5leHRJdGVyYXRpb24gPSBpdGVyYXRpb25zIC0gMTtcbiAgICAgIHRoaXMuc2V0RG9tU3RhdGVGb3JHcm91cChzdGF0ZXRleHQsIG5leHRJdGVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGl0ZXJhdGVzIHggbnVtYmVyIG9mIGl0ZXJhdGlvbnMgYW5kIHdyaXRlcyBhXG4gIC8vIGEgZGVmYXVsdCB6ZXJvIHZhbHVlIHN0YXRlIGtleVxuICAvL1xuICAvLyBAcGFyYW0gZXZlbnROYW1lIC0gc3RyaW5nIGV2ZW50IG5hbWUgZm9yIGEgbGlzdG5lciB0byBsaXN0ZW4gdG9vXG4gIC8vIEBwYXJhbSBkZXRhaWwgLSBvYmplY3QgZGV0YWlscyBmb3IgZXZlbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHNldFN0YXRlRm9yR3JvdXAoc3RhdGV0ZXh0LCBpdGVyYXRpb25zKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YCkpKSB7XG4gICAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gLCAwKTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGlvbnMgPiAwKSB7XG4gICAgICBjb25zdCBuZXh0SXRlcmF0aW9uID0gaXRlcmF0aW9ucyAtIDE7XG4gICAgICB0aGlzLnNldFN0YXRlRm9yR3JvdXAoc3RhdGV0ZXh0LCBuZXh0SXRlcmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvLyBpdGVyYXRlcyB4IG51bWJlciBvZiBpdGVyYXRpb25zIGFuZCB3cml0ZXMgdG8gdGhlIEFQSVxuICAvL1xuICAvLyBAcGFyYW0gZXZlbnROYW1lIC0gc3RyaW5nIGV2ZW50IG5hbWUgZm9yIGEgbGlzdG5lciB0byBsaXN0ZW4gdG9vXG4gIC8vIEBwYXJhbSBkZXRhaWwgLSBvYmplY3QgZGV0YWlscyBmb3IgZXZlbnRcbiAgLy8gQHJldHVybiBudWxsXG4gIHNldEFQSUZvckdyb3VwKHN0YXRldGV4dCwgaXRlcmF0aW9ucywgdmFsdWVBcnJheSA9IFtdKSB7XG4gICAgY29uc3Qga2V5ID0gYCR7c3RhdGV0ZXh0fSR7aXRlcmF0aW9uc31gO1xuICAgIGNvbnN0IHZhbHVlID0gc3RvcmUuZ2V0U3RhdGVJdGVtKGAke3N0YXRldGV4dH0ke2l0ZXJhdGlvbnN9YCk7XG4gICAgLy8gY2FwdHVyZSBpbiBhcnJheSBzbyB3ZSBjYW4gd3JpdGUgY29tcGx0ZWQgYXJyYXkgdG8gYXBpXG4gICAgdmFsdWVBcnJheS5wdXNoKHsga2V5LCB2YWx1ZSB9KTtcbiAgICBpZiAoaXRlcmF0aW9ucyA+IDApIHtcbiAgICAgIGNvbnN0IG5leHRJdGVyYXRpb24gPSBpdGVyYXRpb25zIC0gMTtcbiAgICAgIHRoaXMuc2V0QVBJRm9yR3JvdXAoc3RhdGV0ZXh0LCBuZXh0SXRlcmF0aW9uLCB2YWx1ZUFycmF5KTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyB3cml0ZSBjb21wbHRlZCBhcnJheSB0byBhcGlcbiAgICAvLyByZWNvcmRTdHVkeURhdGEuc2V0RXZlbnQoJ2RhdGEnLCAnZ3JpZGFuc3dlcnMnLCBKU09OLnN0cmluZ2lmeSh2YWx1ZUFycmF5KSk7XG4gICAgY29uc3QgZGF0ZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnZ3JpZC1zdWJtaXRlZCcsIHRydWUpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnZ3JpZGFuc3dlcnMnLCB2YWx1ZUFycmF5KTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2dyaWRhbnN3ZXJzLXRpbWUnLCBkYXRlc3RhbXApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9