/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
var manualUploads = null;
sap.ui
		.define(
				[ "jquery.sap.global", "sap/m/library",
						"sap/m/MessageBox", "sap/m/Dialog",
						"sap/ui/core/Control", "sap/ui/core/Icon",
						"sap/ui/core/IconPool", "sap/m/Image", "sap/m/Text",
						"sap/m/Title", "sap/m/Button", "sap/m/List",
						"sap/m/StandardListItem",
						"sap/ui/unified/FileUploaderParameter",
						"sap/ui/unified/FileUploader",
						"sap/ui/core/format/FileSizeFormat",
						"sap/m/OverflowToolbar", "sap/m/ToolbarSpacer",
						"sap/m/ObjectAttribute", "sap/m/UploadCollectionItem",
						"sap/m/UploadCollectionParameter",
						"sap/m/UploadCollectionToolbarPlaceholder",
						"sap/ui/core/HTML", "sap/m/CustomListItem",
						"sap/ui/core/ResizeHandler", "sap/ui/Device",
						"./UploadCollectionRenderer", "jquery.sap.keycodes" ],
				function(q, M, a, D, C, I, b, c, T, d, B, f, S, F, g, h, O,
						k, l, U, m, n, H, o, R, p, r) {
					//"use strict";
					manualUploads = C
							.extend(
									"sap.m.UploadCollection",
									{
										constructor : function(i, j) {
											var t;
											if (j && j.instantUpload === false) {
												t = j.instantUpload;
												delete j.instantUpload;
											} else if (i
													&& i.instantUpload === false) {
												t = i.instantUpload;
												delete i.instantUpload;
											}
											/*if (j
													&& j.mode === L.ListMode.MultiSelect
													&& t === false) {
												j.mode = L.ListMode.None;
												q.sap.log
														.info("sap.m.ListMode.MultiSelect is not supported by UploadCollection for Upload Pending scenario. Value has been resetted to 'None'");
											} else if (i
													&& i.mode === L.ListMode.MultiSelect
													&& t === false) {
												i.mode = L.ListMode.None;
												q.sap.log
														.info("sap.m.ListMode.MultiSelect is not supported by UploadCollection for Upload Pending scenario. Value has been resetted to 'None'");
											}*/
											try {
												C.apply(this, arguments);
												if (t === false) {
													this.bInstantUpload = t;
													this._oFormatDecimal = h
															.getInstance({
																binaryFilesize : false,
																maxFractionDigits : 1,
																maxIntegerDigits : 3
															});
												}
											} catch (e) {
												this.destroy();
												throw e;
											}
										},
										metadata : {
											library : "sap.m",
											properties : {
												fileType : {
													type : "string[]",
													group : "Data",
													defaultValue : null
												},
												maximumFilenameLength : {
													type : "int",
													group : "Data",
													defaultValue : null
												},
												maximumFileSize : {
													type : "float",
													group : "Data",
													defaultValue : null
												},
												mimeType : {
													type : "string[]",
													group : "Data",
													defaultValue : null
												},
												multiple : {
													type : "boolean",
													group : "Behavior",
													defaultValue : false
												},
												noDataText : {
													type : "string",
													group : "Appearance",
													defaultValue : null
												},
												noDataDescription : {
													type : "string",
													group : "Appearance",
													defaultValue : null
												},
												sameFilenameAllowed : {
													type : "boolean",
													group : "Behavior",
													defaultValue : false
												},
												showSeparators : {
													type : "sap.m.ListSeparators",
													group : "Appearance",
													defaultValue : "All"
												},
												uploadEnabled : {
													type : "boolean",
													group : "Behavior",
													defaultValue : true
												},
												uploadUrl : {
													type : "string",
													group : "Data",
													defaultValue : "../../../upload"
												},
												instantUpload : {
													type : "boolean",
													group : "Behavior",
													defaultValue : true
												},
												numberOfAttachmentsText : {
													type : "string",
													group : "Appearance",
													defaultValue : null
												},
												mode : {
													type : "sap.m.ListMode",
													group : "Behavior",
													defaultValue : "None"
												},
												uploadButtonInvisible : {
													type : "boolean",
													group : "Appearance",
													defaultValue : false
												},
												terminationEnabled : {
													type : "boolean",
													group : "Behavior",
													defaultValue : true
												}
											},
											defaultAggregation : "items",
											aggregations : {
												items : {
													type : "sap.m.UploadCollectionItem",
													multiple : true,
													singularName : "item",
													bindable : "bindable"
												},
												headerParameters : {
													type : "sap.m.UploadCollectionParameter",
													multiple : true,
													singularName : "headerParameter"
												},
												parameters : {
													type : "sap.m.UploadCollectionParameter",
													multiple : true,
													singularName : "parameter"
												},
												toolbar : {
													type : "sap.m.OverflowToolbar",
													multiple : false
												},
												infoToolbar : {
													type : "sap.m.Toolbar",
													multiple : false,
													forwarding : {
														idSuffix : "-list",
														aggregation : "infoToolbar"
													}
												},
												_list : {
													type : "sap.m.List",
													multiple : false,
													visibility : "hidden"
												},
												_noDataIcon : {
													type : "sap.ui.core.Icon",
													multiple : false,
													visibility : "hidden"
												},
												_dragDropIcon : {
													type : "sap.ui.core.Icon",
													multiple : false,
													visibility : "hidden"
												},
												_dragDropText : {
													type : "sap.m.Text",
													multiple : false,
													visibility : "hidden"
												}
											},
											events : {
												change : {
													parameters : {
														documentId : {
															type : "string"
														},
														files : {
															type : "object[]"
														}
													}
												},
												fileDeleted : {
													parameters : {
														documentId : {
															type : "string"
														},
														item : {
															type : "sap.m.UploadCollectionItem"
														}
													}
												},
												filenameLengthExceed : {
													parameters : {
														documentId : {
															type : "string"
														},
														files : {
															type : "object[]"
														}
													}
												},
												fileRenamed : {
													parameters : {
														documentId : {
															type : "string"
														},
														fileName : {
															type : "string"
														},
														item : {
															type : "sap.m.UploadCollectionItem"
														}
													}
												},
												fileSizeExceed : {
													parameters : {
														documentId : {
															type : "string"
														},
														fileSize : {
															type : "string"
														},
														files : {
															type : "object[]"
														}
													}
												},
												typeMissmatch : {
													parameters : {
														documentId : {
															type : "string"
														},
														fileType : {
															type : "string"
														},
														mimeType : {
															type : "string"
														},
														files : {
															type : "object[]"
														}
													}
												},
												uploadComplete : {
													parameters : {
														readyStateXHR : {
															type : "string"
														},
														response : {
															type : "string"
														},
														status : {
															type : "string"
														},
														files : {
															type : "object[]"
														}
													}
												},
												uploadTerminated : {
													parameters : {
														fileName : {
															type : "string"
														},
														getHeaderParameter : {
															type : "function",
															parameters : {
																headerParameterName : {
																	type : "string"
																}
															}
														}
													}
												},
												beforeUploadStarts : {
													parameters : {
														fileName : {
															type : "string"
														},
														addHeaderParameter : {
															type : "function",
															parameters : {
																headerParameter : {
																	type : "sap.m.UploadCollectionParameter"
																}
															}
														},
														getHeaderParameter : {
															type : "function",
															parameters : {
																headerParameterName : {
																	type : "string"
																}
															}
														}
													}
												},
												selectionChange : {
													parameters : {
														selectedItem : {
															type : "sap.m.UploadCollectionItem"
														},
														selectedItems : {
															type : "sap.m.UploadCollectionItem[]"
														},
														selected : {
															type : "boolean"
														}
													}
												}
											}
										}
									});
					manualUploads._uploadingStatus = "uploading";
					manualUploads._displayStatus = "display";
					manualUploads._toBeDeletedStatus = "toBeDeleted";
					manualUploads._pendingUploadStatus = "pendingUploadStatus";
					manualUploads._placeholderCamera = "sap-icon://card";
					manualUploads._markerMargin = 8;
					if (p.system.phone) {
						manualUploads._resizeTimeoutInterval = 500;
					} else {
						manualUploads._resizeTimeoutInterval = 100;
					}
					manualUploads.prototype.init = function() {
						manualUploads.prototype._oRb = sap.ui.getCore()
								.getLibraryResourceBundle("sap.m");
						this._headerParamConst = {
							requestIdName : "requestId" + q.now(),
							fileNameRequestIdName : "fileNameRequestId"
									+ q.now()
						};
						this._requestIdValue = 0;
						this._iFUCounter = 0;
						this._oList = new f(this.getId() + "-list", {
							selectionChange : [ this._handleSelectionChange,
									this ]
						});
						this.setAggregation("_list", this._oList, true);
						this._oList.addStyleClass("sapMUCList");
						this.setAggregation("_noDataIcon", new I(this.getId()
								+ "-no-data-icon", {
							src : "sap-icon://document",
							size : "6rem",
							noTabStop : true
						}), true);
						this.setAggregation("_dragDropIcon", new I(this.getId()
								+ "-drag-drop-icon", {
							src : "sap-icon://upload-to-cloud",
							size : "4rem",
							noTabStop : true
						}), true);
						this
								.setAggregation(
										"_dragDropText",
										new T(
												this.getId()
														+ "-drag-drop-text",
												{
													text : this._oRb
															.getText("UPLOADCOLLECTION_DRAG_FILE_INDICATOR")
												}), true);
						this._iUploadStartCallCounter = 0;
						this.aItems = [];
						this._aDeletedItemForPendingUpload = [];
						this._aFileUploadersForPendingUpload = [];
						this._aFilesFromDragAndDropForPendingUpload = [];
						this._iFileUploaderPH = null;
						this._oListEventDelegate = null;
						this._oItemToUpdate = null;
						this._sReziseHandlerId = null;
					};
					manualUploads.prototype.setFileType = function(e) {
						if (!e) {
							return this;
						}
						if (!this.getInstantUpload()) {
							q.sap.log
									.info("As property instantUpload is false it is not allowed to change fileType at runtime.");
						} else {
							var j = e.length;
							for ( var i = 0; i < j; i++) {
								e[i] = e[i].toLowerCase();
							}
							if (this.getFileType() !== e) {
								this.setProperty("fileType", e, true);
								this._getFileUploader().setFileType(e);
							}
						}
						return this;
					};
					manualUploads.prototype.setMaximumFilenameLength = function(i) {
						if (!this.getInstantUpload()) {
							q.sap.log
									.info("As property instantUpload is false it is not allowed to change maximumFilenameLength at runtime.");
						} else if (this.getMaximumFilenameLength() !== i) {
							this.setProperty("maximumFilenameLength", i, true);
							this._getFileUploader().setMaximumFilenameLength(i);
						}
						return this;
					};
					manualUploads.prototype.setMaximumFileSize = function(i) {
						if (!this.getInstantUpload()) {
							q.sap.log
									.info("As property instantUpload is false it is not allowed to change maximumFileSize at runtime.");
						} else if (this.getMaximumFileSize() !== i) {
							this.setProperty("maximumFileSize", i, true);
							this._getFileUploader().setMaximumFileSize(i);
						}
						return this;
					};
					manualUploads.prototype.setMimeType = function(e) {
						if (!this.getInstantUpload()) {
							q.sap.log
									.info("As property instantUpload is false it is not allowed to change mimeType at runtime.");
						} else if (this.getMimeType() !== e) {
							this.setProperty("mimeType", e, true);
							this._getFileUploader().setMimeType(e);
						}
						return this;
					};
					manualUploads.prototype.setMultiple = function(e) {
						if (!this.getInstantUpload()) {
							q.sap.log
									.info("As property instantUpload is false it is not allowed to change multiple at runtime.");
						} else if (this.getMultiple() !== e) {
							this.setProperty("multiple", e);
							this._getFileUploader().setMultiple(e);
						}
						return this;
					};
					manualUploads.prototype.setShowSeparators = function(e) {
						if (this.getShowSeparators() !== e) {
							this.setProperty("showSeparators", e);
							this._oList.setShowSeparators(e);
						}
						return this;
					};
					manualUploads.prototype.setUploadEnabled = function(u) {
						if (!this.getInstantUpload()) {
							q.sap.log
									.info("As property instantUpload is false it is not allowed to change uploadEnabled at runtime.");
						} else if (this.getUploadEnabled() !== u) {
							this.setProperty("uploadEnabled", u);
							this._getFileUploader().setEnabled(u);
						}
						return this;
					};
					manualUploads.prototype.setUploadUrl = function(u) {
						if (!this.getInstantUpload()) {
							q.sap.log
									.info("As property instantUpload is false it is not allowed to change uploadUrl at runtime.");
						} else if (this.getUploadUrl() !== u) {
							this.setProperty("uploadUrl", u);
							this._getFileUploader().setUploadUrl(u);
						}
						return this;
					};
					manualUploads.prototype.setInstantUpload = function() {
						q.sap.log
								.error("It is not supported to change the behavior at runtime.");
						return this;
					};
					manualUploads.prototype.setMode = function(e) {
						if (e === L.ListMode.Delete) {
							this._oList.setMode(L.ListMode.None);
							q.sap.log
									.info("sap.m.ListMode.Delete is not supported by UploadCollection. Value has been resetted to 'None'");
						} else if (e === L.ListMode.MultiSelect
								&& !this.getInstantUpload()) {
							this._oList.setMode(L.ListMode.None);
							q.sap.log
									.info("sap.m.ListMode.MultiSelect is not supported by UploadCollection for Pending Upload. Value has been resetted to 'None'");
						} else {
							this._oList.setMode(e);
						}
						return this;
					};
					manualUploads.prototype.getMode = function() {
						return this._oList.getMode();
					};
					manualUploads.prototype.getToolbar = function() {
						return this._oHeaderToolbar;
					};
					manualUploads.prototype.getNoDataText = function() {
						var N = this.getProperty("noDataText");
						N = N
								|| this._oRb
										.getText("UPLOADCOLLECTION_NO_DATA_TEXT");
						return N;
					};
					manualUploads.prototype.getNoDataDescription = function() {
						var N = this.getProperty("noDataDescription");
						N = N
								|| this._oRb
										.getText("UPLOADCOLLECTION_NO_DATA_DESCRIPTION");
						return N;
					};
					manualUploads.prototype.setUploadButtonInvisible = function(u) {
						if (this.getUploadButtonInvisible() === u) {
							return this;
						}
						this.setProperty("uploadButtonInvisible", u, true);
						if (this.getInstantUpload()) {
							this._getFileUploader().setVisible(!u);
						} else {
							this._setFileUploaderVisibility(u);
						}
						if (this._bDragDropEnabled) {
							this._unbindDragEnterLeave();
							this._bDragDropEnabled = false;
						} else {
							this._bindDragEnterLeave();
						}
						return this;
					};
					manualUploads.prototype.getInternalRequestHeaderNames = function() {
						return [ this._headerParamConst.fileNameRequestIdName,
								this._headerParamConst.requestIdName ];
					};
					manualUploads.prototype.upload = function() {
						if (this.getInstantUpload()) {
							q.sap.log
									.error("Not a valid API call. 'instantUpload' should be set to 'false'.");
						}
						var e = this._aFileUploadersForPendingUpload.length;
						for ( var i = 0; i < e; i++) {
							this._iUploadStartCallCounter = 0;
							if (this._aFileUploadersForPendingUpload[i]
									.getValue()) {
								this._aFileUploadersForPendingUpload[i]
										.upload();
							}
						}
						if (this._aFilesFromDragAndDropForPendingUpload.length > 0) {
							this._oFileUploader
									._sendFilesFromDragAndDrop(this._aFilesFromDragAndDropForPendingUpload);
							this._aFilesFromDragAndDropForPendingUpload = [];
						}
					};
					manualUploads.prototype.getSelectedItems = function() {
						var e = this._oList.getSelectedItems();
						return this._getUploadCollectionItemsByListItems(e);
					};
					manualUploads.prototype.getSelectedItem = function() {
						var e = this._oList.getSelectedItem();
						if (e) {
							return this._getUploadCollectionItemByListItem(e);
						}
						return null;
					};
					manualUploads.prototype.setSelectedItemById = function(i, e) {
						this._oList.setSelectedItemById(i + "-cli", e);
						this._setSelectedForItems([ this
								._getUploadCollectionItemById(i) ], e);
						return this;
					};
					manualUploads.prototype.setSelectedItem = function(u, e) {
						return this.setSelectedItemById(u.getId(), e);
					};
					manualUploads.prototype.selectAll = function() {
						var e = this._oList.selectAll();
						if (e.getItems().length !== this.getItems().length) {
							q.sap.log
									.info("Internal 'List' and external 'UploadCollection' are not in sync.");
						}
						this._setSelectedForItems(this.getItems(), true);
						return this;
					};
					manualUploads.prototype.downloadItem = function(u, e) {
						if (!this.getInstantUpload()) {
							q.sap.log
									.info("Download is not possible on Pending Upload mode");
							return false;
						} else {
							return u.download(e);
						}
					};
					manualUploads.prototype.openFileDialog = function(i) {
						if (this._oFileUploader) {
							if (i) {
								if (!this._oFileUploader.getMultiple()) {
									this._oItemToUpdate = i;
									this._oFileUploader.$().find(
											"input[type=file]")
											.trigger("click");
								} else {
									q.sap.log
											.warning("Version Upload cannot be used in multiple upload mode");
								}
							} else {
								this._oFileUploader.$()
										.find("input[type=file]").trigger(
												"click");
							}
						}
						return this;
					};
					manualUploads.prototype.removeAggregation = function(A, v, e) {
						var i, j, t;
						if (!this.getInstantUpload() && A === "items" && v) {
							i = v._internalFileIdWithinDragDropArray;
							if (i) {
								j = this._aFilesFromDragAndDropForPendingUpload
										.indexOf(i);
								if (j !== -1) {
									this._aFilesFromDragAndDropForPendingUpload
											.splice(j, 1);
								}
							} else if (q.isNumeric(v)) {
								t = this.getItems();
								this._aDeletedItemForPendingUpload.push(t[v]);
							} else {
								this._aDeletedItemForPendingUpload.push(v);
							}
						}
						return C.prototype.removeAggregation.apply(this,
								arguments);
					};
					manualUploads.prototype.removeAllAggregation = function(A, e) {
						if (!this.getInstantUpload() && A === "items") {
							if (this._aFileUploadersForPendingUpload) {
								for ( var i = 0; i < this._aFileUploadersForPendingUpload.length; i++) {
									this._aFileUploadersForPendingUpload[i]
											.destroy();
									this._aFileUploadersForPendingUpload[i] = null;
								}
								this._aFileUploadersForPendingUpload = [];
							}
						}
						return C.prototype.removeAllAggregation.apply(this,
								arguments);
					};
					manualUploads.prototype.onBeforeRendering = function() {
						this._RenderManager = this._RenderManager
								|| sap.ui.getCore().createRenderManager();
						var i, e;
						if (this._oListEventDelegate) {
							this._oList
									.removeEventDelegate(this._oListEventDelegate);
							this._oListEventDelegate = null;
						}
						this._deregisterSizeHandler();
						this._unbindDragEnterLeave();
						j.bind(this)();
						if (!this.getInstantUpload()) {
							this.aItems = this.getItems();
							this._getListHeader(this.aItems.length);
							this._clearList();
							this._fillList(this.aItems);
							this._oList.setHeaderToolbar(this._oHeaderToolbar);
							return;
						}
						if (this.aItems.length > 0) {
							e = this.aItems.length;
							var u = [];
							for (i = 0; i < e; i++) {
								if (this.aItems[i]
										&& this.aItems[i]._status === manualUploads._uploadingStatus) {
									u.push(this.aItems[i]);
								} else if (this.aItems[i]
										&& this.aItems[i]._status !== manualUploads._uploadingStatus
										&& this.aItems[i]._percentUploaded === 100
										&& this.getItems().length === 0) {
									u.push(this.aItems[i]);
								}
							}
							if (u.length !== 0) {
								this.aItems = [];
								this.aItems = this.getItems();
								this.aItems = u.concat(this.aItems);
							} else {
								this.aItems = this.getItems();
							}
						} else {
							this.aItems = this.getItems();
						}
						this._getListHeader(this.aItems.length);
						this._clearList();
						this._fillList(this.aItems);
						this._oList.setAggregation("headerToolbar",
								this._oHeaderToolbar, true);
						if (this.sErrorState !== "Error") {
							if (this.getUploadEnabled() !== this._oFileUploader
									.getEnabled()) {
								this._oFileUploader.setEnabled(this
										.getUploadEnabled());
							}
						} else {
							this._oFileUploader.setEnabled(false);
						}
						if (this.sDeletedItemId) {
							q(document.activeElement).blur();
						}
						function j() {
							if (this.bInstantUpload === false) {
								this.setProperty("instantUpload",
										this.bInstantUpload, true);
								delete this.bInstantUpload;
							}
						}
					};
					manualUploads.prototype.onAfterRendering = function() {
						this._bindDragEnterLeave();
						if (this.getInstantUpload()) {
							if (this.aItems
									|| (this.aItems === this.getItems())) {
								if (this.editModeItem) {
									var $ = q.sap.byId(this.editModeItem
											+ "-ta_editFileName-inner");
									if ($) {
										var i = this.editModeItem;
										if (!p.os.ios) {
											$
													.focus(function() {
														$.selectText(0,
																$.val().length);
													});
										}
										$.focus();
										this._oListEventDelegate = {
											onclick : function(e) {
												this._handleClick(e, i);
											}.bind(this)
										};
										this._oList
												.addDelegate(this._oListEventDelegate);
									}
								} else if (this.sFocusId) {
									this._setFocusToLineItem(this.sFocusId);
									this.sFocusId = null;
								} else if (this.sDeletedItemId) {
									this._setFocusAfterDeletion();
								}
							}
						} else if (this.sFocusId) {
							this._setFocusToLineItem(this.sFocusId);
							this.sFocusId = null;
						}
					};
					manualUploads.prototype.exit = function() {
						var i, P, e;
						this._unbindDragEnterLeave();
						if (this._$RootNode) {
							this._$RootNode = null;
						}
						if (this._oFileUploader) {
							this._oFileUploader.destroy();
							this._oFileUploader = null;
						}
						if (this._oHeaderToolbar) {
							this._oHeaderToolbar.destroy();
							this._oHeaderToolbar = null;
						}
						if (this._oNumberOfAttachmentsTitle) {
							this._oNumberOfAttachmentsTitle.destroy();
							this._oNumberOfAttachmentsTitle = null;
						}
						if (this._RenderManager) {
							this._RenderManager.destroy();
						}
						if (this._aFileUploadersForPendingUpload) {
							P = this._aFileUploadersForPendingUpload.length;
							for (i = 0; i < P; i++) {
								this._aFileUploadersForPendingUpload[i]
										.destroy();
								this._aFileUploadersForPendingUpload[i] = null;
							}
							this._aFileUploadersForPendingUpload = null;
						}
						for (i = 0; i < this.aItems.length; i++) {
							if (this.aItems[i]._status === manualUploads._uploadingStatus) {
								e = this.aItems.splice(i, 1)[0];
								if (e.destroy) {
									e.destroy();
								}
							}
						}
						this._deregisterSizeHandler();
					};
					manualUploads.prototype._bindDragEnterLeave = function() {
						this._bDragDropEnabled = this._isDragAndDropAllowed();
						if (!this._bDragDropEnabled) {
							return;
						}
						if (!this._oDragDropHandler) {
							this._oDragDropHandler = {
								dragEnterUIArea : this._onDragEnterUIArea
										.bind(this),
								dragLeaveUIArea : this._onDragLeaveUIArea
										.bind(this),
								dragOverUIArea : this._onDragOverUIArea
										.bind(this),
								dropOnUIArea : this._onDropOnUIArea.bind(this),
								dragEnterUploadCollection : this._onDragEnterUploadCollection
										.bind(this),
								dragLeaveUploadCollection : this._onDragLeaveUploadCollection
										.bind(this),
								dragOverUploadCollection : this._onDragOverUploadCollection
										.bind(this),
								dropOnUploadCollection : this._onDropOnUploadCollection
										.bind(this)
							};
						}
						this._$RootNode = q(document.body);
						this._$RootNode.bind("dragenter",
								this._oDragDropHandler.dragEnterUIArea);
						this._$RootNode.bind("dragleave",
								this._oDragDropHandler.dragLeaveUIArea);
						this._$RootNode.bind("dragover",
								this._oDragDropHandler.dragOverUIArea);
						this._$RootNode.bind("drop",
								this._oDragDropHandler.dropOnUIArea);
						this._$DragDropArea = this.$("drag-drop-area");
						this
								.$()
								.bind(
										"dragenter",
										this._oDragDropHandler.dragEnterUploadCollection);
						this
								.$()
								.bind(
										"dragleave",
										this._oDragDropHandler.dragLeaveUploadCollection);
						this
								.$()
								.bind(
										"dragover",
										this._oDragDropHandler.dragOverUploadCollection);
						this.$().bind("drop",
								this._oDragDropHandler.dropOnUploadCollection);
					};
					manualUploads.prototype._unbindDragEnterLeave = function() {
						if (!this._bDragDropEnabled && !this._oDragDropHandler) {
							return;
						}
						if (this._$RootNode) {
							this._$RootNode.unbind("dragenter",
									this._oDragDropHandler.dragEnterUIArea);
							this._$RootNode.unbind("dragleave",
									this._oDragDropHandler.dragLeaveUIArea);
							this._$RootNode.unbind("dragover",
									this._oDragDropHandler.dragOverUIArea);
							this._$RootNode.unbind("drop",
									this._oDragDropHandler.dropOnUIArea);
						}
						this
								.$()
								.unbind(
										"dragenter",
										this._oDragDropHandler.dragEnterUploadCollection);
						this
								.$()
								.unbind(
										"dragleave",
										this._oDragDropHandler.dragLeaveUploadCollection);
						this
								.$()
								.unbind(
										"dragover",
										this._oDragDropHandler.dragOverUploadCollection);
						this.$().unbind("drop",
								this._oDragDropHandler.dropOnUploadCollection);
					};
					manualUploads.prototype._onDragEnterUIArea = function(e) {
						if (!this._checkForFiles(e)) {
							return;
						}
						this._oLastEnterUIArea = e.target;
						this._$DragDropArea
								.removeClass("sapMUCDragDropOverlayHide");
						this._adjustDragDropIcon();
					};
					manualUploads.prototype._onDragOverUIArea = function(e) {
						e.preventDefault();
						if (!this._checkForFiles(e)) {
							return;
						}
						this._$DragDropArea
								.removeClass("sapMUCDragDropOverlayHide");
					};
					manualUploads.prototype._onDragLeaveUIArea = function(e) {
						if (this._oLastEnterUIArea === e.target) {
							this._$DragDropArea
									.addClass("sapMUCDragDropOverlayHide");
						}
					};
					manualUploads.prototype._onDropOnUIArea = function(e) {
						this._$DragDropArea
								.addClass("sapMUCDragDropOverlayHide");
					};
					manualUploads.prototype._onDragEnterUploadCollection = function(e) {
						if (!this._checkForFiles(e)) {
							return;
						}
						if (e.target === this._$DragDropArea[0]) {
							this._$DragDropArea.addClass("sapMUCDropIndicator");
							this._adjustDragDropIcon();
							this
									.getAggregation("_dragDropText")
									.setText(
											this._oRb
													.getText("UPLOADCOLLECTION_DROP_FILE_INDICATOR"));
						}
					};
					manualUploads.prototype._onDragOverUploadCollection = function(e) {
						e.preventDefault();
					};
					manualUploads.prototype._onDragLeaveUploadCollection = function(e) {
						if (e.target === this._$DragDropArea[0]) {
							this._$DragDropArea
									.removeClass("sapMUCDropIndicator");
							this
									.getAggregation("_dragDropText")
									.setText(
											this._oRb
													.getText("UPLOADCOLLECTION_DRAG_FILE_INDICATOR"));
						}
					};
					manualUploads.prototype._checkForFiles = function(e) {
						var t = e.originalEvent.dataTransfer.types;
						if (t) {
							for ( var i = 0; i < t.length; i++) {
								if (t[i] === "Files") {
									return true;
								}
							}
						}
						return false;
					};
					manualUploads.prototype._isDragAndDropAllowed = function() {
						return this.getUploadEnabled()
								&& !this.getUploadButtonInvisible();
					};
					manualUploads.prototype._onDropOnUploadCollection = function(e) {
						if (!this._checkForFiles(e)) {
							e.preventDefault();
							return;
						}
						if (e.target === this._$DragDropArea[0]) {
							e.preventDefault();
							this._$DragDropArea
									.removeClass("sapMUCDropIndicator");
							this._$DragDropArea
									.addClass("sapMUCDragDropOverlayHide");
							this
									.getAggregation("_dragDropText")
									.setText(
											this._oRb
													.getText("UPLOADCOLLECTION_DRAG_FILE_INDICATOR"));
							var j = e.originalEvent.dataTransfer.files;
							if (j.length > 1 && !this.getMultiple()) {
								var t = this._oRb
										.getText("UPLOADCOLLECTION_MULTIPLE_FALSE");
								a.error(t);
								return;
							}
							if (!this._oFileUploader._areFilesAllowed(j)) {
								return;
							}
							if (!this.getInstantUpload()) {
								for ( var i = 0; i < j.length; i++) {
									this._oFileUploader.fireChange({
										files : [ j[i] ],
										fromDragDrop : true
									});
									this._aFilesFromDragAndDropForPendingUpload
											.push(j[i]);
								}
							} else {
								this._oFileUploader.fireChange({
									files : j
								});
								this._oFileUploader
										._sendFilesFromDragAndDrop(j);
							}
						}
					};
					manualUploads.prototype._adjustDragDropIcon = function() {
						if (this._$DragDropArea[0].offsetHeight < 160) {
							this.getAggregation("_dragDropIcon").$().hide();
						}
					};
					manualUploads.prototype._deregisterSizeHandler = function() {
						p.orientation.detachHandler(this._onResize, this);
						R.deregister(this._sReziseHandlerId);
					};
					manualUploads.prototype._hideFileUploaders = function() {
						var t, i;
						if (!this.getInstantUpload()) {
							t = this._oHeaderToolbar.getContent().length;
							if (this._aFileUploadersForPendingUpload.length) {
								for (i = 0; i < t; i++) {
									if (this._oHeaderToolbar.getContent()[i] instanceof g) {
										if (i === this._iFileUploaderPH
												&& this._bFocusFileUploader) {
											this._oHeaderToolbar.getContent()[i]
													.$().find("button").focus();
										} else {
											this._oHeaderToolbar.getContent()[i]
													.$().hide();
										}
									}
								}
							}
						}
					};
					manualUploads.prototype._truncateFileName = function(e) {
						if (!e) {
							return;
						}
						if (e._status === "Edit") {
							var j = e.getId() + "-cli";
							this.$().find("#" + j).find(
									".sapMUCObjectMarkerContainer").attr(
									"style", "display: none");
							return;
						}
						var t = 0;
						var u = e.getMarkers();
						var v;
						for ( var i = 0; i < u.length; i++) {
							t = t + u[i].$().width() + manualUploads._markerMargin;
						}
						if (t > 0) {
							var $ = this.$().find(
									"#" + e.getId() + "-ta_filenameHL");
							if ($) {
								v = "max-width: calc(100% - " + t + "px)";
								if ($.attr("style") !== v) {
									$.attr("style", v);
								}
							}
						}
					};
					manualUploads.prototype._getListHeader = function(e) {
						var j, i;
						this._setNumberOfAttachmentsTitle(e);
						if (!this._oHeaderToolbar) {
							if (!!this._oFileUploader
									&& !this.getInstantUpload()) {
								this._oFileUploader.destroy();
							}
							j = this._getFileUploader();
							this._oHeaderToolbar = this
									.getAggregation("toolbar");
							if (!this._oHeaderToolbar) {
								this._oHeaderToolbar = new O(this.getId()
										+ "-toolbar", {
									content : [
											this._oNumberOfAttachmentsTitle,
											new k(), j ]
								}).addEventDelegate({
									onAfterRendering : this._hideFileUploaders
								}, this);
								this._iFileUploaderPH = 2;
							} else {
								this._oHeaderToolbar.addEventDelegate({
									onAfterRendering : this._hideFileUploaders
								}, this);
								this._iFileUploaderPH = this
										._getFileUploaderPlaceHolderPosition(this._oHeaderToolbar);
								if (this._oHeaderToolbar
										&& this._iFileUploaderPH > -1) {
									this._setFileUploaderInToolbar(j);
								} else {
									q.sap.log
											.info("A place holder of type 'sap.m.UploadCollectionPlaceholder' needs to be provided.");
								}
							}
						} else if (!this.getInstantUpload()) {
							var P = this._aFileUploadersForPendingUpload.length;
							for (i = P - 1; i >= 0; i--) {
								if (this._aFileUploadersForPendingUpload[i]
										.getId() === this._oFileUploader
										.getId()) {
									j = this._getFileUploader();
									this._oHeaderToolbar.insertAggregation(
											"content", j,
											this._iFileUploaderPH, true);
									break;
								}
							}
						}
					};
					manualUploads.prototype._getFileUploaderPlaceHolderPosition = function(
							t) {
						for ( var i = 0; i < t.getContent().length; i++) {
							if (t.getContent()[i] instanceof n) {
								return i;
							}
						}
						return -1;
					};
					manualUploads.prototype._setFileUploaderInToolbar = function(e) {
						this._oHeaderToolbar.getContent()[this._iFileUploaderPH]
								.setVisible(false);
						this._oHeaderToolbar.insertContent(e,
								this._iFileUploaderPH);
					};
					manualUploads.prototype._mapItemToListItem = function(i) {
						if (!i
								|| (this._oItemToUpdate && i.getId() === this._oItemToUpdate
										.getId())) {
							return null;
						}
						var e, j, t, u, v, w, $, x, y;
						e = i.getId();
						j = i._status;
						t = i.getFileName();
						if (j === manualUploads._uploadingStatus) {
							u = i._getBusyIndicator ? i._getBusyIndicator() : i
									._getControl("sap.m.BusyIndicator", {
										id : e + "-ia_indicator"
									}, "BusyIndicator").addStyleClass(
											"sapMUCloadingIcon");
						} else {
							y = this._createIcon(i, e, t);
						}
						w = e + "-container";
						$ = q.sap.byId(w);
						if ($) {
							$.remove();
							$ = null;
						}
						x = new H(
								{
									content : "<span id="
											+ w
											+ " class='sapMUCTextButtonContainer'></span>",
									afterRendering : this._renderContent.bind(
											this, i, w)
								});
						v = new o(e + "-cli", {
							content : [ u, y, x ],
							selected : i.getSelected()
						});
						v._oUploadCollectionItem = i;
						v._status = j;
						v.addStyleClass("sapMUCItem");
						v.setTooltip(i.getTooltip_Text());
						return v;
					};
					manualUploads.prototype._renderContent = function(e, j) {
						var t, i, A, u, v, P, w, x, y, z, E;
						P = e._percentUploaded;
						w = e.getAllAttributes();
						x = e.getStatuses();
						E = e.getMarkers();
						t = e.getId();
						A = w.length;
						u = x.length;
						v = E.length;
						z = e._status;
						y = this._RenderManager;
						y.write("<div class=\"sapMUCTextContainer ");
						if (z === "Edit") {
							y.write("sapMUCEditMode ");
						}
						y.write("\" >");
						y.renderControl(this._getFileNameControl(e));
						if (z === manualUploads._uploadingStatus) {
							y.renderControl(this._createProgressLabel(e, P));
						} else {
							if (v > 0) {
								y
										.write("<div class=\"sapMUCObjectMarkerContainer\">");
								for (i = 0; i < v; i++) {
									y
											.renderControl(E[i]
													.addStyleClass("sapMUCObjectMarker"));
								}
								y.write("</div>");
							}
							if (A > 0) {
								y.write("<div class=\"sapMUCAttrContainer\">");
								for (i = 0; i < A; i++) {
									w[i].addStyleClass("sapMUCAttr");
									y.renderControl(w[i]);
									if ((i + 1) < A) {
										y
												.write("<div class=\"sapMUCSeparator\">&nbsp&#x00B7&#160</div>");
									}
								}
								y.write("</div>");
							}
							if (u > 0) {
								y
										.write("<div class=\"sapMUCStatusContainer\">");
								for (i = 0; i < u; i++) {
									x[i].detachBrowserEvent("hover");
									y.renderControl(x[i]);
									if ((i + 1) < u) {
										y
												.write("<div class=\"sapMUCSeparator\">&nbsp&#x00B7&#160</div>");
									}
								}
								y.write("</div>");
							}
						}
						y.write("</div>");
						this._renderButtons(y, e, z, t);
						y.flush(q.sap.byId(j)[0], true);
						this._truncateFileName(e);
						this._sReziseHandlerId = R.register(this,
								this._onResize.bind(this));
						p.orientation.attachHandler(this._onResize, this);
					};
					manualUploads.prototype._renderButtons = function(e, j, t, u) {
						var v, w;
						v = this._getButtons(j, t, u);
						if (v) {
							w = v.length;
						}
						if (w > 0) {
							e.write("<div class=\"sapMUCButtonContainer\">");
							for ( var i = 0; i < w; i++) {
								if ((i + 1) < w) {
									v[i].addStyleClass("sapMUCFirstButton");
								}
								e.renderControl(v[i]);
							}
							e.write("</div>");
						}
					};
					manualUploads.prototype._getFileNameControl = function(i) {
						var e, j, t, u, v, w, x, V, y, z, A;
						u = i.getFileName();
						v = i.getId();
						w = i._status;
						if (w !== "Edit") {
							e = i._getFileNameLink ? i._getFileNameLink() : i
									._getControl("sap.m.Link",
											{
												id : v + "-ta_filenameHL",
												press : [ i,
														this._onItemPressed,
														this ]
											}, "FileNameLink");
							e.setEnabled(this._getItemPressEnabled(i));
							e.addStyleClass("sapMUCFileName");
							e.setModel(i.getModel());
							e.setText(u);
							return e;
						} else {
							j = manualUploads._splitFilename(u);
							x = this.getMaximumFilenameLength();
							V = "None";
							y = false;
							t = j.name;
							if (i.errorState === "Error") {
								y = true;
								V = "Error";
								t = i.changedFileName;
								if (t.length === 0) {
									A = this._oRb
											.getText("UPLOADCOLLECTION_TYPE_FILENAME");
								} else {
									A = this._oRb
											.getText("UPLOADCOLLECTION_EXISTS");
								}
							}
							z = i._getFileNameEditBox ? i._getFileNameEditBox()
									: i._getControl("sap.m.Input", {
										id : v + "-ta_editFileName",
										type : L.InputType.Text
									}, "FileNameEditBox");
							z.addStyleClass("sapMUCEditBox");
							z.setModel(i.getModel());
							z.setValue(t);
							z.setValueState(V);
							z.setFieldWidth("75%");
							z.setValueStateText(A);
							z.setDescription(j.extension);
							z.setShowValueStateMessage(y);
							if ((x - j.extension.length) > 0) {
								z.setProperty("maxLength", x
										- j.extension.length, true);
							}
							return z;
						}
					};
					manualUploads.prototype._getItemPressEnabled = function(i) {
						return i._getPressEnabled()
								&& this.sErrorState !== "Error";
					};
					manualUploads.prototype._onItemPressed = function(e, i) {
						if (i.hasListeners("press")) {
							i.firePress();
						} else if (this.sErrorState !== "Error"
								&& q.trim(i.getProperty("url"))) {
							this._triggerLink(e);
						}
					};
					manualUploads.prototype._createProgressLabel = function(i, e) {
						var P, j = i.getId();
						P = i._getProgressLabel ? i._getProgressLabel() : i
								._getControl("sap.m.Label", {
									id : j + "-ta_progress"
								}, "ProgressLabel").addStyleClass(
										"sapMUCProgress");
						P.setText(this._oRb.getText(
								"UPLOADCOLLECTION_UPLOADING", [ e ]));
						return P;
					};
					manualUploads.prototype._createIcon = function(i, e, j) {
						var t, u, v, w;
						t = i.getThumbnailUrl();
						if (t) {
							v = b.createControlByURI({
								id : e + "-ia_imageHL",
								src : this._getThumbnail(t, j),
								decorative : false
							}, c).addStyleClass(
									"sapMUCItemImage sapMUCItemIcon");
							v.setAlt(this._getAriaLabelForPicture(i));
						} else {
							u = this._getThumbnail(undefined, j);
							v = new I(e + "-ia_iconHL", {
								src : u,
								decorative : false,
								useIconTooltip : false
							});
							v.setAlt(this._getAriaLabelForPicture(i));
							if (this.sErrorState !== "Error"
									&& q.trim(i.getProperty("url"))) {
								w = "sapMUCItemIcon";
							} else {
								w = "sapMUCItemIconInactive";
							}
							if (u === manualUploads._placeholderCamera) {
								if (this.sErrorState !== "Error"
										&& q.trim(i.getProperty("url"))) {
									w = w + " sapMUCItemPlaceholder";
								} else {
									w = w + " sapMUCItemPlaceholderInactive";
								}
							}
							v.addStyleClass(w);
						}
						if (this._getItemPressEnabled(i)) {
							v.attachPress(i, this._onItemPressed, this);
						}
						return v;
					};
					manualUploads.prototype._getButtons = function(i, e, j) {
						var t, u, v, w, x, E, y;
						t = [];
						if (!this.getInstantUpload()) {
							w = "deleteButton";
							x = this._createDeleteButton(j, w, i,
									this.sErrorState);
							t.push(x);
							return t;
						}
						if (e === "Edit") {
							u = i._getOkButton ? i._getOkButton()
									: i
											._getControl(
													"sap.m.Button",
													{
														id : j + "-okButton",
														text : this._oRb
																.getText("UPLOADCOLLECTION_RENAMEBUTTON_TEXT"),
														type : L.ButtonType.Transparent
													}, "OkButton")
											.addStyleClass("sapMUCOkBtn");
							v = i._getCancelButton ? i._getCancelButton()
									: i
											._getControl(
													"sap.m.Button",
													{
														id : j
																+ "-cancelButton",
														text : this._oRb
																.getText("UPLOADCOLLECTION_CANCELBUTTON_TEXT"),
														type : L.ButtonType.Transparent
													}, "CancelButton")
											.addStyleClass("sapMUCCancelBtn");
							t.push(u);
							t.push(v);
						} else if (e === manualUploads._uploadingStatus) {
							w = "terminateButton";
							x = this._createDeleteButton(j, w, i,
									this.sErrorState);
							t.push(x);
						} else {
							E = i.getEnableEdit();
							if (this.sErrorState === "Error") {
								E = false;
							}
							if (i.getVisibleEdit()) {
								y = i._getEditButton ? i._getEditButton()
										: i
												._getControl(
														"sap.m.Button",
														{
															id : j
																	+ "-editButton",
															icon : "sap-icon://edit",
															type : L.ButtonType.Standard,
															tooltip : this._oRb
																	.getText("UPLOADCOLLECTION_EDITBUTTON_TEXT"),
															press : [
																	i,
																	this._handleEdit,
																	this ]
														}, "EditButton")
												.addStyleClass("sapMUCEditBtn");
								y.setEnabled(E);
								y.setVisible(i.getVisibleEdit());
								t.push(y);
							}
							w = "deleteButton";
							if (i.getVisibleDelete()) {
								x = this._createDeleteButton(j, w, i,
										this.sErrorState);
								t.push(x);
							}
						}
						return t;
					};
					manualUploads.prototype._createDeleteButton = function(i, e, j, t) {
						var E, u, G, v, w, V, P;
						E = j.getEnableDelete();
						if (t === "Error") {
							E = false;
						}
						if (e === "deleteButton") {
							G = "DeleteButton";
							w = j._getDeleteButton;
							v = this._oRb
									.getText("UPLOADCOLLECTION_DELETEBUTTON_TEXT");
							V = j.getVisibleDelete();
							P = [ this, this._handleDelete, this ];
						} else {
							G = "TerminateButton";
							w = j._getTerminateButton;
							v = this._oRb
									.getText("UPLOADCOLLECTION_TERMINATEBUTTON_TEXT");
							V = this.getTerminationEnabled();
							P = [ j, this._handleTerminate, this ];
						}
						u = w ? w() : j._getControl("sap.m.Button", {
							id : i + "-" + e,
							icon : "sap-icon://sys-cancel",
							type : L.ButtonType.Standard,
							press : P
						}, G).addStyleClass("sapMUCDeleteBtn");
						u.setVisible(V);
						u.setEnabled(E);
						u.setTooltip(v);
						return u;
					};
					manualUploads.prototype._fillList = function(i) {
						var t = this, e = i.length - 1, j = this
								.getBinding("items"), G = false, u, v = this
								.getBindingInfo("items") ? this
								.getBindingInfo("items").groupHeaderFactory
								: null;
						var w = function(y) {
							return y.getBindingContext() ? j.getGroup(y
									.getBindingContext()) : null;
						};
						var x = function(y) {
							return w(y) && w(y).key;
						};
						q
								.each(
										i,
										function(y, z) {
											if (j && j.isGrouped() && z) {
												if (!G || u !== x(z)) {
													if (v) {
														t._oList.addItemGroup(
																w(z), v(w(z)),
																true);
													} else if (w(z)) {
														t._oList.addItemGroup(
																w(z), null,
																true);
													}
													G = true;
													u = x(z);
												}
											}
											if (!z._status) {
												z._status = manualUploads._displayStatus;
											} else if (t.getInstantUpload()
													&& t._oItemForDelete
													&& t._oItemForDelete._status === manualUploads._toBeDeletedStatus
													&& z.getDocumentId() === t._oItemForDelete.documentId) {
												return false;
											}
											if (!z._percentUploaded
													&& z._status === manualUploads._uploadingStatus) {
												z._percentUploaded = 0;
											}
											var A = t._mapItemToListItem(z);
											if (A) {
												if (y === 0 && e === 0) {
													A
															.addStyleClass("sapMUCListSingleItem");
												} else if (y === 0) {
													A
															.addStyleClass("sapMUCListFirstItem");
												} else if (y === e) {
													A
															.addStyleClass("sapMUCListLastItem");
												} else {
													A
															.addStyleClass("sapMUCListItem");
												}
												t._oList.addAggregation(
														"items", A, true);
												z
														.attachEvent(
																"selected",
																t._handleItemSetSelected,
																t);
											}
											return true;
										});
					};
					manualUploads.prototype._clearList = function() {
						if (this._oList) {
							this._oList.destroyAggregation("items", true);
						}
					};
					manualUploads.prototype._setNumberOfAttachmentsTitle = function(e) {
						var i = e || 0;
						var t;
						if (this._oItemToUpdate) {
							i--;
						}
						if (this.getNumberOfAttachmentsText()) {
							t = this.getNumberOfAttachmentsText();
						} else {
							t = this._oRb.getText(
									"UPLOADCOLLECTION_ATTACHMENTS", [ i ]);
						}
						if (!this._oNumberOfAttachmentsTitle) {
							this._oNumberOfAttachmentsTitle = new d(this
									.getId()
									+ "-numberOfAttachmentsTitle", {
								text : t
							});
						} else {
							this._oNumberOfAttachmentsTitle.setText(t);
						}
					};
					manualUploads.prototype._setFileUploaderVisibility = function(u) {
						var t = this._oHeaderToolbar.getContent();
						if (t) {
							var P = t[this._iFileUploaderPH];
							if (P instanceof g) {
								P.setVisible(!u);
							}
						}
					};
					manualUploads.prototype._handleDelete = function(e) {
						var P = e.getParameters();
						var j = this.getItems();
						var t = P.id.split("-deleteButton")[0];
						var u;
						var v;
						var w = "";
						var x;
						var y;
						for ( var i = 0; i < j.length; i++) {
							if (j[i].sId === t) {
								v = i;
								u = {
									documentId : j[i].getDocumentId(),
									_iLineNumber : v
								};
								break;
							}
						}
						if (j[v].hasListeners("deletePress")) {
							j[v].fireDeletePress();
							return;
						}
						this.sDeletedItemId = t;
						if (q.sap.byId(this.sId).hasClass("sapUiSizeCompact")) {
							w = "sapUiSizeCompact";
						}
						if (this.editModeItem) {
							this._handleOk(e, this.editModeItem, true);
							if (this.sErrorState === "Error") {
								return;
							}
						}
						if (j[v] && j[v].getEnableDelete()) {
							x = j[v].getFileName();
							if (!x) {
								y = this._oRb
										.getText("UPLOADCOLLECTION_DELETE_WITHOUT_FILENAME_TEXT");
							} else {
								y = this._oRb.getText(
										"UPLOADCOLLECTION_DELETE_TEXT", x);
							}
							this._oItemForDelete = u;
							a
									.show(
											y,
											{
												title : this._oRb
														.getText("UPLOADCOLLECTION_DELETE_TITLE"),
												actions : [ a.Action.OK,
														a.Action.CANCEL ],
												onClose : this._onCloseMessageBoxDeleteItem
														.bind(this),
												dialogId : "messageBoxDeleteFile",
												styleClass : w
											});
						}
					};
					manualUploads.prototype._onCloseMessageBoxDeleteItem = function(e) {
						var j = this.getItems();
						var t;
						if (this.getInstantUpload()) {
							for ( var i = 0; i < j.length; i++) {
								if (j[i].getDocumentId() === this._oItemForDelete.documentId) {
									t = j[i];
								}
							}
						} else {
							t = j[this._oItemForDelete._iLineNumber];
						}
						if (e === a.Action.OK) {
							this._oItemForDelete._status = manualUploads._toBeDeletedStatus;
							if (this.getInstantUpload()) {
								this
										.fireFileDeleted({
											documentId : this._oItemForDelete.documentId,
											item : t
										});
								this._oItemForDelete = null;
							} else {
								if (this.aItems.length === 1) {
									if (!this.getUploadButtonInvisible()) {
										this.sFocusId = this._oFileUploader.$()
												.find(":button")[0].id;
									}
								} else if (this._oItemForDelete._iLineNumber < this.aItems.length - 1) {
									this.sFocusId = this.aItems[this._oItemForDelete._iLineNumber + 1]
											.getId()
											+ "-cli";
								} else {
									this.sFocusId = this.aItems[0].getId()
											+ "-cli";
								}
								this._aDeletedItemForPendingUpload.push(t);
								this.aItems.splice(
										this._oItemForDelete._iLineNumber, 1);
								this.removeAggregation("items", t, false);
							}
						}
					};
					manualUploads.prototype._handleTerminate = function(e, j) {
						var t, u;
						t = new f({
							items : [ new S({
								title : j.getFileName(),
								icon : this._getIconFromFilename(j
										.getFileName())
							}) ]
						});
						u = new D(
								{
									id : this.getId() + "deleteDialog",
									title : this._oRb
											.getText("UPLOADCOLLECTION_TERMINATE_TITLE"),
									content : [
											new T(
													{
														text : this._oRb
																.getText("UPLOADCOLLECTION_TERMINATE_TEXT")
													}), t ],
									buttons : [
											new B(
													{
														text : this._oRb
																.getText("UPLOADCOLLECTION_OKBUTTON_TEXT"),
														press : [ v, this ]
													}),
											new B(
													{
														text : this._oRb
																.getText("UPLOADCOLLECTION_CANCELBUTTON_TEXT"),
														press : function() {
															u.close();
														}
													}) ],
									afterClose : function() {
										u.destroy();
									}
								}).open();
						function v() {
							var A = false;
							for ( var i = 0; i < this.aItems.length; i++) {
								if (this.aItems[i]._status === manualUploads._uploadingStatus
										&& this.aItems[i]._requestIdName === j._requestIdName) {
									this.aItems[i]._status = manualUploads._toBeDeletedStatus;
									this._oItemForDelete = this.aItems[i];
									A = true;
									break;
								} else if (j.getFileName() === this.aItems[i]
										.getFileName()
										&& this.aItems[i]._status === manualUploads._displayStatus) {
									this.aItems[i]._status = manualUploads._toBeDeletedStatus;
									this._oItemForDelete = this.aItems[i];
									this.fireFileDeleted({
										documentId : this.aItems[i]
												.getDocumentId(),
										item : this.aItems[i]
									});
									break;
								}
							}
							if (A) {
								this
										._getFileUploader()
										.abort(
												this._headerParamConst.fileNameRequestIdName,
												this._encodeToAscii(j
														.getFileName())
														+ this._oItemForDelete._requestIdName);
							}
							u.close();
							this.invalidate();
						}
					};
					manualUploads.prototype._handleEdit = function(e, j) {
						var i, t = j.getId(), u = this.aItems.length;
						if (this.editModeItem) {
							this._handleOk(e, this.editModeItem, false);
						}
						if (this.sErrorState !== "Error") {
							for (i = 0; i < u; i++) {
								if (this.aItems[i].getId() === t) {
									this.aItems[i]._status = "Edit";
									break;
								}
							}
							j._status = "Edit";
							this.editModeItem = e.getSource().getId().split(
									"-editButton")[0];
							this.invalidate();
						}
					};
					manualUploads.prototype._handleClick = function(e, i) {
						var $ = q(e.target).closest("button");
						var j = "";
						if ($.length) {
							j = $.prop("id");
						}
						if (j.lastIndexOf("editButton") === -1) {
							if (j.lastIndexOf("cancelButton") !== -1) {
								this._handleCancel(e, i);
							} else if (e.target.id.lastIndexOf("ia_imageHL") < 0
									&& e.target.id.lastIndexOf("ia_iconHL") < 0
									&& e.target.id.lastIndexOf("deleteButton") < 0
									&& e.target.id
											.lastIndexOf("ta_editFileName-inner") < 0) {
								if (e.target.id.lastIndexOf("cli") > 0) {
									this.sFocusId = e.target.id;
								}
								this._handleOk(e, i, true);
							}
						}
					};
					manualUploads.prototype._handleOk = function(e, i, j) {
						var E = document.getElementById(i
								+ "-ta_editFileName-inner");
						var N;
						var t = manualUploads._findById(i, this.aItems);
						var u = t.getProperty("fileName");
						var v = manualUploads._splitFilename(u);
						var w = sap.ui.getCore().byId(i + "-ta_editFileName");
						var x = t.errorState;
						var y = t.changedFileName;
						if (E !== null) {
							N = E.value.replace(/^\manualUploads+/, "");
						}
						this.sFocusId = i + "-cli";
						if (!N || N.length === 0) {
							if (E !== null) {
								this._setErrorStateOnItem(this, t, N, y, x);
							}
							return;
						}
						t._status = manualUploads._displayStatus;
						if (v.name === N) {
							this._removeErrorStateFromItem(this, t);
							if (j) {
								this.invalidate();
							}
							return;
						}
						if (this.getSameFilenameAllowed()) {
							this._removeErrorStateFromItem(this, t);
							this._oItemForRename = t;
							this._onEditItemOk.bind(this)(N + v.extension);
							return;
						}
						if (manualUploads
								._checkDoubleFileName(N + v.extension,
										this.aItems)) {
							w.setProperty("valueState", "Error", true);
							this._setErrorStateOnItem(this, t, N, y, x);
						} else {
							w.setProperty("valueState", "None", true);
							t.changedFileName = null;
							this._removeErrorStateFromItem(this, t);
							if (j) {
								this.invalidate();
							}
							this._oItemForRename = t;
							this._onEditItemOk.bind(this)(N + v.extension);
						}
					};
					manualUploads.prototype._setErrorStateOnItem = function(e, i, N, j, E) {
						i._status = "Edit";
						i.errorState = "Error";
						e.sErrorState = "Error";
						i.changedFileName = N;
						if (E !== "Error" || j !== N) {
							e.invalidate();
						}
					};
					manualUploads.prototype._removeErrorStateFromItem = function(e, i) {
						i.errorState = null;
						e.sErrorState = null;
						e.editModeItem = null;
					};
					manualUploads.prototype._onEditItemOk = function(N) {
						if (this._oItemForRename) {
							this._oItemForRename.setFileName(N);
							this.fireFileRenamed({
								documentId : this._oItemForRename
										.getProperty("documentId"),
								fileName : N,
								item : this._oItemForRename
							});
						}
						delete this._oItemForRename;
					};
					manualUploads.prototype._handleCancel = function(e, i) {
						var j = manualUploads._findById(i, this.aItems);
						j._status = manualUploads._displayStatus;
						j.errorState = null;
						j.changedFileName = j._getFileNameEditBox().getValue();
						this.sFocusId = this.editModeItem + "-cli";
						this.sErrorState = null;
						this.editModeItem = null;
						this.invalidate();
					};
					manualUploads.prototype._onChange = function(e) {
						if (e) {
							var j, t = e.getParameter("files").length, i, u, v, w, A;
							if (t === 0) {
								return;
							}
							this._oFileUploader.removeAllAggregation(
									"headerParameters", true);
							this.removeAllAggregation("headerParameters", true);
							this._oFileUploader.removeAllAggregation(
									"parameters", true);
							this.removeAllAggregation("parameters", true);
							this.fireChange({
								getParameter : function(y) {
									if (y) {
										return e.getParameter(y);
									}
									return null;
								},
								getParameters : function() {
									return e.getParameters();
								},
								mParameters : e.getParameters(),
								files : e.getParameter("files")
							});
							var P = this.getAggregation("parameters");
							if (P) {
								q.each(P, function(y, z) {
									var E = new F({
										name : z.getProperty("name"),
										value : z.getProperty("value")
									});
									this._oFileUploader.addParameter(E);
								}.bind(this));
							}
							if (!this.getInstantUpload()) {
								this._bFocusFileUploader = true;
								v = manualUploads._pendingUploadStatus;
							} else {
								v = manualUploads._uploadingStatus;
							}
							this._requestIdValue++;
							j = this._requestIdValue.toString();
							var x = this.getAggregation("headerParameters");
							if (!this.getInstantUpload()) {
								this._aFileUploadersForPendingUpload
										.push(this._oFileUploader);
							}
							for (i = 0; i < t; i++) {
								u = new U({
									fileName : e.getParameter("files")[i].name
								});
								if (e.getParameter("fromDragDrop")) {
									u._internalFileIdWithinDragDropArray = e
											.getParameter("files")[i];
								}
								u._status = v;
								u._internalFileIndexWithinFileUploader = i + 1;
								u._requestIdName = j;
								if (!this.getInstantUpload()) {
									u.setAssociation("fileUploader",
											this._oFileUploader, true);
									w = this._oFormatDecimal.format(e
											.getParameter("files")[i].size);
									A = new l({
										text : w
									});
									u.insertAggregation("attributes", A, true);
									this.insertItem(u);
								} else {
									u._percentUploaded = 0;
								}
								this.aItems.unshift(u);
							}
							if (x) {
								q.each(x, function(y, z) {
									this._oFileUploader
											.addHeaderParameter(new F({
												name : z.getProperty("name"),
												value : z.getProperty("value")
											}));
								}.bind(this));
							}
							this._oFileUploader.addHeaderParameter(new F({
								name : this._headerParamConst.requestIdName,
								value : j
							}));
						}
					};
					manualUploads.prototype._onFilenameLengthExceed = function(e) {
						var i = {
							name : e.getParameter("fileName")
						};
						var j = [ i ];
						this.fireFilenameLengthExceed({
							getParameter : function(P) {
								if (P) {
									return e.getParameter(P);
								}
							},
							getParameters : function() {
								return e.getParameters();
							},
							mParameters : e.getParameters(),
							files : j
						});
					};
					manualUploads.prototype._onFileSizeExceed = function(e) {
						var i = {
							name : e.getParameter("fileName"),
							fileSize : e.getParameter("fileSize")
						};
						this.fireFileSizeExceed({
							getParameter : function(P) {
								if (P) {
									return e.getParameter(P);
								}
							},
							getParameters : function() {
								return e.getParameters();
							},
							mParameters : e.getParameters(),
							files : [ i ]
						});
					};
					manualUploads.prototype._onTypeMissmatch = function(e) {
						var i = {
							name : e.getParameter("fileName"),
							fileType : e.getParameter("fileType"),
							mimeType : e.getParameter("mimeType")
						};
						var j = [ i ];
						this.fireTypeMissmatch({
							getParameter : function(P) {
								if (P) {
									return e.getParameter(P);
								}
							},
							getParameters : function() {
								return e.getParameters();
							},
							mParameters : e.getParameters(),
							files : j
						});
					};
					manualUploads.prototype._onUploadTerminated = function(e) {
						var i;
						var j = this._getRequestId(e);
						var t = e.getParameter("fileName");
						var u = this.aItems.length;
						for (i = 0; i < u; i++) {
							if (this.aItems[i]
									&& this.aItems[i].getFileName() === t
									&& this.aItems[i]._requestIdName === j
									&& (this.aItems[i]._status === manualUploads._uploadingStatus || this.aItems[i]._status === manualUploads._toBeDeletedStatus)) {
								this.aItems.splice(i, 1);
								this.removeItem(i);
								break;
							}
						}
						this
								.fireUploadTerminated({
									fileName : t,
									getHeaderParameter : this._getHeaderParameterWithinEvent
											.bind(e)
								});
					};
					manualUploads.prototype._onUploadComplete = function(e) {
						if (e) {
							var i, j = this._getRequestId(e), u = e
									.getParameter("fileName"), t, v, w, x = y();
							t = this.aItems.length;
							w = [ manualUploads._uploadingStatus, manualUploads._pendingUploadStatus ];
							for (i = 0; i < t; i++) {
								if ((!j || this.aItems[i]._requestIdName === j)
										&& this.aItems[i]
												.getProperty("fileName") === u
										&& (w.indexOf(this.aItems[i]._status) >= 0)) {
									if (x
											&& this.aItems[i]._status !== manualUploads._pendingUploadStatus) {
										this.aItems[i]._percentUploaded = 100;
										this.aItems[i]._status = manualUploads._displayStatus;
									}
									v = this.aItems.splice(i, 1)[0];
									if (v.destroy) {
										v.destroy();
									}
									this._oItemToUpdate = null;
									break;
								}
							}
							this
									.fireUploadComplete({
										getParameter : e.getParameter,
										getParameters : e.getParameters,
										mParameters : e.getParameters(),
										files : [ {
											fileName : e
													.getParameter("fileName")
													|| u,
											responseRaw : e
													.getParameter("responseRaw"),
											reponse : e
													.getParameter("response"),
											response : e
													.getParameter("response"),
											status : e.getParameter("status"),
											headers : e.getParameter("headers")
										} ]
									});
						}
						this.invalidate();
						function y() {
							var z = e.getParameter("status").toString()
									|| "200";
							return z[0] === "2" || z[0] === "3";
						}
					};
					manualUploads.prototype._onUploadProgress = function(e) {
						if (!e || !this.getInstantUpload()) {
							return;
						}
						var u = e.getParameter("fileName"), P, j = Math.round(e
								.getParameter("loaded")
								/ e.getParameter("total") * 100), t = this
								._getRequestId(e), v = this.aItems.length, w, $, x;
						if (j === 100) {
							P = this._oRb
									.getText("UPLOADCOLLECTION_UPLOAD_COMPLETED");
						} else {
							P = this._oRb.getText("UPLOADCOLLECTION_UPLOADING",
									[ j ]);
						}
						for ( var i = 0; i < v; i++) {
							x = this.aItems[i];
							if (x.getProperty("fileName") === u
									&& x._requestIdName === t
									&& x._status === manualUploads._uploadingStatus) {
								w = x._getProgressLabel ? x._getProgressLabel()
										: x._getControl("sap.m.Label", {
											id : x.getId() + "-ta_progress"
										}, "ProgressLabel");
								if (w) {
									w.setText(P);
									x._percentUploaded = j;
									$ = q.sap.byId(x.getId() + "-ia_indicator");
									if (j === 100) {
										$.attr("aria-label", P);
									} else {
										$.attr("aria-valuenow", j);
									}
									break;
								}
							}
						}
					};
					manualUploads.prototype._getRequestId = function(e) {
						var i;
						i = e.getParameter("requestHeaders");
						if (!i) {
							return null;
						}
						for ( var j = 0; j < i.length; j++) {
							if (i[j].name === this._headerParamConst.requestIdName) {
								return i[j].value;
							}
						}
						return null;
					};
					manualUploads.prototype._getFileUploader = function() {
						var u = this.getInstantUpload();
						if (!u || !this._oFileUploader) {
							var t = this.getInstantUpload() ? this._oRb
									.getText("UPLOADCOLLECTION_UPLOAD")
									: this._oRb.getText("UPLOADCOLLECTION_ADD");
							this._iFUCounter = this._iFUCounter + 1;
							this._oFileUploader = new g(
									this.getId() + "-" + this._iFUCounter
											+ "-uploader",
									{
										buttonOnly : true,
										buttonText : t,
										tooltip : t,
										iconOnly : true,
										enabled : this.getUploadEnabled(),
										fileType : this.getFileType(),
										icon : "sap-icon://add",
										iconFirst : false,
										style : "Transparent",
										maximumFilenameLength : this
												.getMaximumFilenameLength(),
										maximumFileSize : this
												.getMaximumFileSize(),
										mimeType : this.getMimeType(),
										multiple : this.getMultiple(),
										name : "uploadCollection",
										uploadOnChange : u,
										sameFilenameAllowed : true,
										uploadUrl : this.getUploadUrl(),
										useMultipart : false,
										sendXHR : true,
										change : [ this._onChange, this ],
										filenameLengthExceed : [
												this._onFilenameLengthExceed,
												this ],
										fileSizeExceed : [
												this._onFileSizeExceed, this ],
										typeMissmatch : [
												this._onTypeMissmatch, this ],
										uploadAborted : [
												this._onUploadTerminated, this ],
										uploadComplete : [
												this._onUploadComplete, this ],
										uploadProgress : [
												this._onUploadProgress, this ],
										uploadStart : [ this._onUploadStart,
												this ],
										visible : !this
												.getUploadButtonInvisible()
									});
						}
						return this._oFileUploader;
					};
					manualUploads.prototype._onUploadStart = function(e) {
						var j, i, t, P, u, G;
						this._iUploadStartCallCounter++;
						P = e.getParameter("requestHeaders").length;
						for (i = 0; i < P; i++) {
							if (e.getParameter("requestHeaders")[i].name === this._headerParamConst.requestIdName) {
								t = e.getParameter("requestHeaders")[i].value;
								break;
							}
						}
						u = e.getParameter("fileName");
						j = {
							name : this._headerParamConst.fileNameRequestIdName,
							value : this._encodeToAscii(u) + t
						};
						e.getParameter("requestHeaders").push(j);
						for (i = 0; i < this._aDeletedItemForPendingUpload.length; i++) {
							if (this._aDeletedItemForPendingUpload[i]
									.getAssociation("fileUploader") === e.oSource.sId
									&& this._aDeletedItemForPendingUpload[i]
											.getFileName() === u
									&& this._aDeletedItemForPendingUpload[i]._internalFileIndexWithinFileUploader === this._iUploadStartCallCounter) {
								e
										.getSource()
										.abort(
												this._headerParamConst.fileNameRequestIdName,
												this._encodeToAscii(u) + t);
								return;
							}
						}
						this.fireBeforeUploadStarts({
							fileName : u,
							addHeaderParameter : v,
							getHeaderParameter : w.bind(this)
						});
						if (q.isArray(G)) {
							for (i = 0; i < G.length; i++) {
								if (e.getParameter("requestHeaders")[i].name === G[i]
										.getName()) {
									e.getParameter("requestHeaders")[i].value = G[i]
											.getValue();
								}
							}
						} else if (G instanceof m) {
							for (i = 0; i < e.getParameter("requestHeaders").length; i++) {
								if (e.getParameter("requestHeaders")[i].name === G
										.getName()) {
									e.getParameter("requestHeaders")[i].value = G
											.getValue();
									break;
								}
							}
						}
						function v(x) {
							var j = {
								name : x.getName(),
								value : x.getValue()
							};
							e.getParameter("requestHeaders").push(j);
						}
						function w(x) {
							G = this._getHeaderParameterWithinEvent.bind(e)(x);
							return G;
						}
					};
					manualUploads.prototype._getIconFromFilename = function(e) {
						var i = manualUploads._splitFilename(e).extension;
						if (q.type(i) === "string") {
							i = i.toLowerCase();
						}
						switch (i) {
						case ".bmp":
						case ".jpg":
						case ".jpeg":
						case ".png":
							return manualUploads._placeholderCamera;
						case ".csv":
						case ".xls":
						case ".xlsx":
							return "sap-icon://excel-attachment";
						case ".doc":
						case ".docx":
						case ".odt":
							return "sap-icon://doc-attachment";
						case ".pdf":
							return "sap-icon://pdf-attachment";
						case ".ppt":
						case ".pptx":
							return "sap-icon://ppt-attachment";
						case ".txt":
							return "sap-icon://document-text";
						default:
							return "sap-icon://document";
						}
					};
					manualUploads.prototype._getThumbnail = function(t, e) {
						if (t) {
							return t;
						} else {
							return this._getIconFromFilename(e);
						}
					};
					manualUploads.prototype._triggerLink = function(e) {
						var i, j;
						if (this.editModeItem) {
							this._handleOk(e, this.editModeItem, true);
							if (this.sErrorState === "Error") {
								return;
							}
							this.sFocusId = e.getParameter("id");
						}
						j = e.oSource.getId().split("-");
						i = j[j.length - 2];
						M.URLHelper.redirect(this.aItems[i].getProperty("url"),
								true);
					};
					manualUploads.prototype.onkeydown = function(e) {
						switch (e.keyCode) {
						case q.sap.KeyCodes.F2:
							this._handleF2(e);
							break;
						case q.sap.KeyCodes.ESCAPE:
							this._handleESC(e);
							break;
						case q.sap.KeyCodes.DELETE:
							this._handleDEL(e);
							break;
						case q.sap.KeyCodes.ENTER:
							this._handleENTER(e);
							break;
						default:
							return;
						}
						e.setMarked();
					};
					manualUploads.prototype._setFocusAfterDeletion = function() {
						var i = this.aItems.length;
						var e;
						if (i === 0) {
							this._oFileUploader.focus();
						} else {
							var j = this.sDeletedItemId.split("-").pop();
							if (j <= i - 1) {
								e = this.sDeletedItemId + "-cli";
							} else {
								e = this.aItems[this.aItems.length - 1].sId
										+ "-cli";
							}
							this._setFocusToLineItem(e);
						}
						this.sDeletedItemId = null;
					};
					manualUploads.prototype._setFocusToLineItem = function(i) {
						q.sap.byId(i).focus();
					};
					manualUploads.prototype._handleENTER = function(e) {
						var t, i, j, u;
						if (this.editModeItem) {
							t = e.target.id.split(this.editModeItem).pop();
						} else {
							t = e.target.id.split("-").pop();
						}
						switch (t) {
						case "-ta_editFileName-inner":
						case "-okButton":
							this._handleOk(e, this.editModeItem, true);
							break;
						case "-cancelButton":
							e.preventDefault();
							this._handleCancel(e, this.editModeItem);
							break;
						case "-ia_iconHL":
						case "-ia_imageHL":
							u = this.editModeItem.split("-").pop();
							M.URLHelper.redirect(this.aItems[u]
									.getProperty("url"), true);
							break;
						case "ia_iconHL":
						case "ia_imageHL":
						case "cli":
							i = e.target.id.split(t)[0] + "ta_filenameHL";
							j = sap.ui.getCore().byId(i);
							if (j.getEnabled()) {
								u = e.target.id.split("-")[2];
								M.URLHelper.redirect(this.aItems[u]
										.getProperty("url"), true);
							}
							break;
						default:
							break;
						}
					};
					manualUploads.prototype._handleDEL = function(e) {
						if (!this.editModeItem) {
							var t = e.target.id.slice(0, -4), i = sap.ui
									.getCore().byId(t), j = i
									&& i._getDeleteButton
									&& i._getDeleteButton();
							if (j) {
								j.firePress();
							}
						}
					};
					manualUploads.prototype._handleESC = function(e) {
						if (this.editModeItem) {
							this.sFocusId = this.editModeItem + "-cli";
							this.aItems[this.editModeItem.split("-").pop()]._status = manualUploads._displayStatus;
							this._handleCancel(e, this.editModeItem);
						}
					};
					manualUploads.prototype._handleF2 = function(e) {
						var i = sap.ui.getCore().byId(e.target.id);
						if (i !== undefined) {
							if (i._status === manualUploads._displayStatus) {
								var j = q.sap.byId(e.target.id);
								var t = j.find("[id$='-editButton']");
								var E = sap.ui.getCore().byId(t[0].id);
								if (E.getEnabled()) {
									if (this.editModeItem) {
										this._handleClick(e, this.editModeItem);
									}
									if (this.sErrorState !== "Error") {
										E.firePress();
									}
								}
							} else {
								this._handleClick(e, this.editModeItem);
							}
						} else if (e.target.id.search(this.editModeItem) === 0) {
							this._handleOk(e, this.editModeItem, true);
						}
					};
					manualUploads._checkDoubleFileName = function(e, j) {
						if (j.length === 0 || !e) {
							return false;
						}
						var t = j.length;
						e = e.replace(/^\manualUploads+/, "");
						for ( var i = 0; i < t; i++) {
							if (e === j[i].getProperty("fileName")) {
								return true;
							}
						}
						return false;
					};
					manualUploads._splitFilename = function(e) {
						var i = {};
						var N = e.split(".");
						if (N.length === 1) {
							i.extension = "";
							i.name = N.pop();
							return i;
						}
						i.extension = "." + N.pop();
						i.name = N.join(".");
						return i;
					};
					manualUploads.prototype._getAriaLabelForPicture = function(i) {
						var t;
						t = (i.getAriaLabelForPicture() || i.getFileName());
						return t;
					};
					manualUploads.prototype._getHeaderParameterWithinEvent = function(e) {
						var u = [];
						var j = this.getParameter("requestHeaders");
						var P = j.length;
						var i;
						if (j && e) {
							for (i = 0; i < P; i++) {
								if (j[i].name === e) {
									return new m({
										name : j[i].name,
										value : j[i].value
									});
								}
							}
							return null;
						} else if (j) {
							for (i = 0; i < P; i++) {
								u.push(new m({
									name : j[i].name,
									value : j[i].value
								}));
							}
							return u;
						}
					};
					manualUploads.prototype._encodeToAscii = function(v) {
						var e = "";
						for ( var i = 0; i < v.length; i++) {
							e = e + v.charCodeAt(i);
						}
						return e;
					};
					manualUploads.prototype._onResize = function() {
						var e = this._oList.getItems();
						for ( var i = 0; i < e.length; i++) {
							q.sap.delayedCall(manualUploads._resizeTimeoutInterval, this,
									this._truncateFileName.bind(this),
									[ e[i]._oUploadCollectionItem ]);
						}
					};
					manualUploads.prototype._getUploadCollectionItemByListItem = function(e) {
						var A = this.getItems();
						for ( var i = 0; i < A.length; i++) {
							if (A[i].getId() === e.getId().replace("-cli", "")) {
								return A[i];
							}
						}
						return null;
					};
					manualUploads.prototype._getUploadCollectionItemById = function(u) {
						var A = this.getItems();
						for ( var i = 0; i < A.length; i++) {
							if (A[i].getId() === u) {
								return A[i];
							}
						}
						return null;
					};
					manualUploads.prototype._getUploadCollectionItemsByListItems = function(
							e) {
						var u = [];
						var t = this.getItems();
						if (e) {
							for ( var i = 0; i < e.length; i++) {
								for ( var j = 0; j < t.length; j++) {
									if (e[i].getId().replace("-cli", "") === t[j]
											.getId()) {
										u.push(t[j]);
										break;
									}
								}
							}
							return u;
						}
						return null;
					};
					manualUploads.prototype._setSelectedForItems = function(u, e) {
						if (this.getMode() !== L.ListMode.MultiSelect && e) {
							var t = this.getItems();
							for ( var j = 0; j < t.length; j++) {
								t[j].setSelected(false);
							}
						}
						for ( var i = 0; i < u.length; i++) {
							u[i].setSelected(e);
						}
					};
					manualUploads.prototype._handleItemSetSelected = function(e) {
						var i = e.getSource();
						if (i instanceof U) {
							var j = this._getListItemById(i.getId() + "-cli");
							if (j) {
								j.setSelected(i.getSelected());
							}
						}
					};
					manualUploads.prototype._handleSelectionChange = function(e) {
						var i = e.getParameter("listItem");
						var j = e.getParameter("selected");
						var u = this._getUploadCollectionItemsByListItems(e
								.getParameter("listItems"));
						var t = this._getUploadCollectionItemByListItem(i);
						if (t && i && u) {
							this.fireSelectionChange({
								selectedItem : t,
								selectedItems : u,
								selected : j
							});
							t.setSelected(i.getSelected());
						}
					};
					manualUploads.prototype._getListItemById = function(e) {
						var i = this._oList.getItems();
						return manualUploads._findById(e, i);
					};
					manualUploads._findById = function(e, j) {
						for ( var i = 0; i < j.length; i++) {
							if (j[i].getId() === e) {
								return j[i];
							}
						}
						return null;
					};
					debugger;
					return manualUploads;
				});
