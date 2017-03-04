// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","dojo/promise/all","../../../views/3d/support/ResourceController","../../../core/sql/WhereClause","../../../views/3d/layers/i3s/I3SNodeLoader","../../../views/3d/layers/i3s/I3SIndexTraversal","../../../views/3d/layers/i3s/I3SUtil","../../../views/3d/layers/i3s/I3SLodHandling","../../../views/3d/layers/i3s/I3SViewportQueries","../../../layers/SceneLayer","../../../layers/IntegratedMeshLayer","../../../core/accessorSupport/decorators","../../../core/Accessor","../../../core/Evented","../../../core/Promise","../../../core/Logger","../../../core/watchUtils","../../../core/HandleRegistry","../../../views/3d/support/PromiseLightweight","../../../views/3d/support/projectionUtils","../../../views/3d/lib/glMatrix"],function(e,t,i,r,n,o,a,s,d,l,u,h,p,c,y,g,_,f,v,m,F,w,b,L){function N(e,t){for(var i=0;i<e.length;i++)if(e[i].name===t)return[i,e[i]];return[-1,void 0]}var V=!1,x=!1,I=L.vec3d,S=v.getLogger("esri.layers.SceneService"),O=function(e){function t(t){var i=e.call(this)||this;return i.nodeIndex={},i.screenSizeFactor=0,i.updating=!1,i.updatingPercentage=0,i._lodFactorProperty=null,i._isIdle=!1,i._numNodesLoading=0,i._progressMaxNumNodes=1,i._animFrameFunctionQueue=[[],[]],i._requiredAttributesDirty=!0,i._updatesDisabled=!1,i._restartNodeLoading=!1,i._handles=new F,i._bundleLoadedCallback=function(e,t,r,n,o,a,s,d){if(i._lodHandling.lodSwapBundleLoaded(e,t,d),i.layerViewRequiredFunctions.addBundle(e,t,r,n,o,a,s),null!=i.layerViewOptionalFunctions.setPolygonOffset){var l=i._lodHandling.shouldSetPolygonOffset(e);l&&i.layerViewOptionalFunctions.setPolygonOffset(e,l)}},i}return i(t,e),Object.defineProperty(t.prototype,"isMeshPyramid",{get:function(){return"mesh-pyramids"===this.layer.profile||"MeshPyramid"===this.layer.store.lodType},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"streamDataSupplier",{get:function(){return this.layerView.view.resourceController.registerClient(this.layerView,o.ClientType.SCENE,{addUrlToken:this.addUrlToken,trackRequests:!0})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"parsedDefinitionExpression",{get:function(){if(!this.layer||!this.layer.definitionExpression)return null;try{var e=a.create(this.layer.definitionExpression);return e.isStandardized()?e:(S.error("definitionExpression is using non standard function"),null)}catch(t){return S.error("Failed to parse definitionExpression: "+t),null}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"definitionExpressionFields",{get:function(){if(this.parsedDefinitionExpression){var e=this.parsedDefinitionExpression.getFields();return l.findFieldsCaseInsensitive(e,this.layer.fields)}return null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"crsVertex",{get:function(){return l.getVertexCrs(this.layer)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"crsIndex",{get:function(){return l.getIndexCrs(this.layer)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rootNodeVisible",{get:function(){var e=this._rootNodeId&&this.nodeIndex[this._rootNodeId];return e&&this._viewportQueries?this._viewportQueries.isNodeVisible(e):!0},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this.updateEventListener={needsUpdate:function(){return e._needsAnimationFrameHandler()},idleFrame:function(t){return e._animationFrameHandler(t)},idleBegin:function(){e._startNodeLoading(),e._updateIdleState(!0)},idleEnd:function(){e.cancelNodeLoading(),e._updateIdleState(!1)}},this.updateEventListenerWhileSuspended={idleBegin:function(){return e._startNodeLoadingWhileSuspended()}},this._lodHandling=new u(this.layerViewRequiredFunctions,this.layerViewOptionalFunctions,function(){return e._evaluateUpdatingState()}),this.layerView._controller=this;var t=this.layer;this._defaultGeometrySchema=t.store.defaultGeometrySchema,this._fields=t.fields,this._attributeStorageInfo=t.attributeStorageInfo,this._rootNodeUrl=t.store.rootNode;var i=this._rootNodeUrl.split("/");this._rootNodeId=i[i.length-1],this.layer instanceof p?"mesh"===this.layer.geometryType?this._lodFactorProperty="qualitySettings.sceneService.3dObject.lodFactor":"point"===this.layer.geometryType&&(this._lodFactorProperty="qualitySettings.sceneService.point.lodFactor"):this.layer instanceof c&&(this._lodFactorProperty="qualitySettings.sceneService.integratedMesh.lodFactor");var r=n([this.layer,this.layerView]).then(function(){if(!e.destroyed&&e.layerView&&!e.layerView.destroyed){e.setClippingArea(e.layerView.view.clippingArea);var t=e.layerView.view.resourceController,i=!1;e._handles.add(m.init(e.layerView,"suspended",function(r){null!=e.layerView.setVisibility&&e.layerView.setVisibility(!r),i&&t.deregisterIdleFrameWorker(e),r?t.registerIdleFrameWorker(e,e.updateEventListenerWhileSuspended):t.registerIdleFrameWorker(e,e.updateEventListener),i=!0}),"layerview"),e._lodFactorProperty&&e._handles.add(e.layerView.view.watch(e._lodFactorProperty,function(){return e._qualityChanged()}),"quality")}});this.addResolvingPromise(r)},t.prototype.destroy=function(){this.layerView.view.resourceController.deregisterIdleFrameWorker(this),this.layerView.view.resourceController.deregisterClient(this.layerView),this._handles.destroy(),this._nodeLoader=null},t.prototype._modifyNumNodesLoading=function(e){this._numNodesLoading+=e},t.prototype._getRequiredAttributes=function(){if(null==this._attributeStorageInfo||!this._fields)return[];var e=Object.create(null);if(this.layer.renderer&&this.layer.renderer.collectRequiredFields(e),this.layer.labelsVisible&&this.layer.labelingInfo&&this.layer.labelingInfo.forEach(function(t){t._collectRequiredFields(e)}),null!=this.definitionExpressionFields)for(var t=0,i=this.definitionExpressionFields;t<i.length;t++){var r=i[t];e[r]=!0}var n=this._attributeStorageInfo,o=this._fields,a=Object.keys(e).map(function(e){var t=N(n,e)[0],i=N(o,e)[1];return{index:t,name:e,field:i,attributeStorageInfo:n[t]}}).filter(function(e){return-1!==e.index&&null!=e.field});return a},t.prototype._requiredFieldsChange=function(){this._requiredAttributesDirty=!0,this.restartNodeLoading()},t.prototype._labelingChanged=function(){var e=this._getRequiredAttributes();e.length===this._requiredAttributes.length&&this._requiredAttributes.every(function(t){return-1!==N(e,t.name)[0]})||this._requiredFieldsChange()},t.prototype.setClippingArea=function(e){var t=[];b.extentToBoundingBox(e,t,this.layerView.view.renderSpatialReference)?this._clippingArea=t:this._clippingArea=null},t.prototype._qualityChanged=function(){this.restartNodeLoading()},t.prototype.updateClippingArea=function(e){this.setClippingArea(e),this.restartNodeLoading()},t.prototype.queueAnimationFrameFunctionCall=function(e,t,i,r,n){null!=this._nodeLoader&&(n=n||0,this._animFrameFunctionQueue[n].push({fct:e,that:t,args:i,cancelFunc:r}),this._evaluateUpdatingState())},t.prototype.getBaseUrl=function(){return l.addTrailingSlash(this.layer.parsedUrl.path)},t.prototype.updateElevationChanged=function(e,t,i){l.findIntersectingNodes(e,t,this.nodeIndex.root,this.crsIndex,this.nodeIndex,i);for(var r=0;r<i.length;r++){var n=i.data[r];n.computedMbs&&(n.computedMbs[3]=-1)}i.length&&this.restartNodeLoading()},t.prototype.restartNodeLoading=function(){this._restartNodeLoading=!0,this._evaluateUpdatingState()},t.prototype._needsAnimationFrameHandler=function(){return!0},t.prototype._animationFrameHandler=function(e){if(this._restartNodeLoading&&(this.cancelNodeLoading(),this._startNodeLoading()),null!=this._nodeLoader){for(var t;this._animFrameFunctionQueue[0].length>0&&!e.done();)t=this._animFrameFunctionQueue[0].shift(),t.fct.apply(t.that,t.args);var i=5-this._numNodesLoading;for(null!=this._indexLoader&&i>0&&this._indexLoader.continueTraversal(i);this._animFrameFunctionQueue[1].length>0&&!e.done();)t=this._animFrameFunctionQueue[1].shift(),t.fct.apply(t.that,t.args);this._evaluateUpdatingState(),this._lodHandling.lodGlobalHandling()}},t.prototype._evaluateUpdatingState=function(){var e=null!=this._indexLoader?this._indexLoader.getQueueSize()+3*this._numNodesLoading:0,t=!(!(e>0||this._indexLoader&&this._indexLoader.isLoading()||this._nodeLoader&&this._nodeLoader.isLoadingAttributes||this._restartNodeLoading||this._animFrameFunctionQueue[0].length>0||this._animFrameFunctionQueue[1].length>0||this._lodHandling&&this._lodHandling.requiresLODGlobalHandling)&&this._isIdle);0===e&&(this._progressMaxNumNodes=1),this._progressMaxNumNodes=Math.max(e,this._progressMaxNumNodes),t!==this._get("updating")&&this._set("updating",t);var i=100*e/this._progressMaxNumNodes;i!==this._get("updatingPercentage")&&this._set("updatingPercentage",i)},t.prototype._initViewData=function(){var e=this.layerView.view,t=e.navigation.targetCamera,i=e.renderCoordsHelper;this.camPos=t.eye,this.screenSizeFactor=1/t.perPixelRatio,this._poi=I.create();var r=I.create(),n=I.create();I.subtract(t.center,t.eye,r),I.normalize(r),i.worldUpAtPosition(t.center,n);var o=Math.acos(I.dot(n,r))-.5*Math.PI;I.lerp(t.eye,t.center,Math.max(0,Math.min(1,o/(.5*Math.PI))),this._poi);var a=this._lodFactorProperty&&this.layerView.view.get(this._lodFactorProperty)||1,s=null!=this.layerViewOptionalFunctions.traversalOptions?this.layerViewOptionalFunctions.traversalOptions.errorMetricPreference:null,d=this.layerViewOptionalFunctions.traversalOptions.elevationInfo,l=d?e.basemapTerrain:null;this._viewportQueries=new h(this.crsIndex,i,t,this._clippingArea,s,l,d,{screenspaceErrorBias:a,maxDistance:25e7,angleDependentLoD:.5>a}),this.notifyChange("rootNodeVisible")},t.prototype._startNodeLoadingWhileSuspended=function(){var e=this;this._initViewData();var t=function(t){return e._viewportQueries.isNodeVisible(t)};this._removeInvisibleNodes(t)},t.prototype._startNodeLoading=function(){var e=this;if(this._restartNodeLoading=!1,!this._updatesDisabled&&null!=this.streamDataSupplier){this._initViewData();var t=null!=this.layerViewOptionalFunctions.getTexturePrefetchFunctions?this.layerViewOptionalFunctions.getTexturePrefetchFunctions():void 0,i=this.isMeshPyramid&&null!=this._defaultGeometrySchema&&null!=this._defaultGeometrySchema.ordering;null!=this.layerViewOptionalFunctions.getLoadedAttributes&&this._requiredAttributesDirty&&(this._requiredAttributes=this._getRequiredAttributes(),this._requiredAttributesDirty=!1,this._handles.add([this.layer.watch("renderer",function(){return e._requiredFieldsChange()}),this.layer.watch("definitionExpression",function(){return e._requiredFieldsChange()}),this.layer.watch("labelsVisible",function(){return e._labelingChanged()}),this.layer.watch("labelingInfo",function(){return e._labelingChanged()})],"requiredAttributes")),this._nodeLoader=new s(this.streamDataSupplier,this._bundleLoadedCallback,this.queueAnimationFrameFunctionCall.bind(this),void 0,this.layerView.view.renderCoordsHelper,this.crsIndex,t?t._calcDesiredTextureLOD:void 0,t?t._imageIsPartOfTextureBundle:void 0,t?t._matId2Meta:void 0,t?t._texId2Meta:void 0,t?t.useCompressedTextures:void 0,S,this._defaultGeometrySchema,this._requiredAttributes,i),this._indexLoader=new d(this.getBaseUrl(),this._rootNodeUrl,this._rootNodeId,this._poi,this.nodeIndex,this.streamDataSupplier,this._viewportQueries,function(t,i){return e._processNodeIndexDocument(t,i)},function(t){return e._lodHandling.finishedLevel(t)},this.layerViewOptionalFunctions._nodeDebugVisualizer,S,this.layerViewOptionalFunctions.traversalOptions),this._indexLoader.start();var r=function(t){return e._indexLoader.nodeIsVisible(t)},n=this._removeInvisibleNodes(r),o=null!=this.layerViewOptionalFunctions.traversalOptions&&this.layerViewOptionalFunctions.traversalOptions.perLevelTraversal===!0?"perLevel":this.isMeshPyramid?"global":"swap";this._lodHandling.startNodeLoading(this._indexLoader.nodeIsVisible.bind(this._indexLoader),this._indexLoader.nodeTraversalState.bind(this._indexLoader),o,this.nodeIndex,n,this._rootNodeId),this.layerViewOptionalFunctions.additionalStartNodeLoadingHandler&&this.layerViewOptionalFunctions.additionalStartNodeLoadingHandler(),this._evaluateUpdatingState()}},t.prototype.isNodeLoading=function(){return null!=this._nodeLoader&&null!=this._indexLoader},t.prototype.cancelNodeLoading=function(){if(this.isNodeLoading()){this._indexLoader.cancel(),this._nodeLoader.cancel(),this.streamDataSupplier.cancelAll();for(var e=0;e<this._animFrameFunctionQueue.length;e++)for(var t=0;t<this._animFrameFunctionQueue[e].length;t++)void 0!==this._animFrameFunctionQueue[e][t].cancelFunc&&this._animFrameFunctionQueue[e][t].cancelFunc();this._numNodesLoading=0,V&&console.log("cancelNodeLoading()"),this._animFrameFunctionQueue=[[],[]],this._nodeLoader=void 0,this._indexLoader=void 0,this._lodHandling.cancelNodeLoading(),this.layerViewOptionalFunctions.additionalCancelNodeLoadingHandler&&this.layerViewOptionalFunctions.additionalCancelNodeLoadingHandler(),this._evaluateUpdatingState()}},t.prototype._removeInvisibleNodes=function(e){for(var t={},i=this.layerViewRequiredFunctions.getAddedNodeIDs(),r=0;r<i.length;r++){var n=i[r],o=this.nodeIndex[n],a=this._isNodeVisibleWithParents(o,e);a?t[n]=o:this._removeNodeData(o)}return t},t.prototype._isNodeVisibleWithParents=function(e,t){var i,r=e;do{i=t(r);var n=r.parentNode;r=null!=n?this.nodeIndex[n.id]:null}while(i&&null!=r);return i},t.prototype._removeNodeData=function(e){this._lodHandling.setLodGlobalDirty(),this.layerViewRequiredFunctions.removeNodeData(e),V&&console.debug("_removeNodeData, deleting "+e.id)},t.prototype._processNodeIndexDocument=function(e,t){var i=this,r=new w.Promise;if(V&&console.debug("_processNodeIndexDocument node id: "+e.id+" areAllBundlesLoaded "+this.layerViewRequiredFunctions.areAllBundlesLoaded(e)+" shouldLoadNode "+this._lodHandling.shouldLoadNode(e,t)),null!=e.featureData&&e.featureData.length>0){if(this.layerViewRequiredFunctions.areAllBundlesLoaded(e)){var n=this.layerViewOptionalFunctions.getLoadedAttributes,o=null!=n?n(e):void 0;if(null!=o&&o!==this._requiredAttributes){var a=e.baseUrl;this._nodeLoader.loadAttributes(e,a,this._requiredAttributes).then(function(t){i.layerViewOptionalFunctions.setAttributeData(e,i._requiredAttributes,t),i._evaluateUpdatingState()})["catch"](function(t){i.layerViewOptionalFunctions.setAttributeData(e,i._requiredAttributes,{})}).then(function(){i._evaluateUpdatingState()}),this._evaluateUpdatingState()}if(this._lodHandling.shouldLoadNode(e,t)){var s=this._lodHandling.lodSwapBuildInfoForNode(e);s&&null==s.swapPairs&&this._lodHandling.lodSwapBundleLoaded(e,null,s)}null!=this.layerViewOptionalFunctions._nodeDebugVisualizer&&x&&this.layerViewOptionalFunctions._nodeDebugVisualizer.show(e,this.crsIndex,"grey")}else if(null!=this.layerViewOptionalFunctions._nodeDebugVisualizer&&x&&this.layerViewOptionalFunctions._nodeDebugVisualizer.show(e,this.crsIndex,"yellow"),this._lodHandling.shouldLoadNode(e,t)){V&&console.debug("_processNodeIndexDocument, shouldLoadNode true for "+e.id);var s=this._lodHandling.lodSwapBuildInfoForNode(e);if(this.layerViewRequiredFunctions.isOverMemory())return r.done(),r;this._modifyNumNodesLoading(1);for(var d=[],l=0;l<e.featureData.length;l++)this.layerViewRequiredFunctions.isBundleAlreadyAddedToStage(e,l)||d.push(l);return this.queueAnimationFrameFunctionCall(this._nodeLoader.loadNodeData,this._nodeLoader,[e,d,r,null!=this.layerViewOptionalFunctions.getTexturePrefetchFunctions,s],void 0,1),r.then(function(){return i._modifyNumNodesLoading(-1)},function(){return i._modifyNumNodesLoading(-1)}),r}}else null!=this.layerViewOptionalFunctions._nodeDebugVisualizer&&x&&this.layerViewOptionalFunctions._nodeDebugVisualizer.show(e,this.crsIndex,"blue");return r.done(),r},t.prototype._updateIdleState=function(e){e!==this._isIdle&&(this._isIdle=e,this._evaluateUpdatingState())},t}(y.declared(g,f,_));return r([y.property({readOnly:!0})],O.prototype,"isMeshPyramid",null),r([y.property({readOnly:!0})],O.prototype,"streamDataSupplier",null),r([y.property({readOnly:!0,dependsOn:["layer.definitionExpression"]})],O.prototype,"parsedDefinitionExpression",null),r([y.property({readOnly:!0,dependsOn:["parsedDefinitionExpression"]})],O.prototype,"definitionExpressionFields",null),r([y.property({readOnly:!0})],O.prototype,"crsVertex",null),r([y.property({readOnly:!0})],O.prototype,"crsIndex",null),r([y.property({readOnly:!0})],O.prototype,"nodeIndex",void 0),r([y.property()],O.prototype,"camPos",void 0),r([y.property()],O.prototype,"screenSizeFactor",void 0),r([y.property()],O.prototype,"layerView",void 0),r([y.property()],O.prototype,"layerViewRequiredFunctions",void 0),r([y.property()],O.prototype,"layerViewOptionalFunctions",void 0),r([y.property()],O.prototype,"layer",void 0),r([y.property()],O.prototype,"addUrlToken",void 0),r([y.property({readOnly:!0})],O.prototype,"updating",void 0),r([y.property({readOnly:!0})],O.prototype,"updatingPercentage",void 0),r([y.property({readOnly:!0})],O.prototype,"rootNodeVisible",null),O=r([y.subclass("esri.layers.graphics.controllers.I3SOnDemandController")],O)});