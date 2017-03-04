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

define(["require","exports","../core/tsSupport/extendsHelper","../core/tsSupport/decorateHelper","../core/typescript","dojo/_base/lang","dojo/when","dojo/promise/all","dojo/Deferred","../geometry/support/jsonUtils","./core/messageHandler","./core/errorMessages","./core/ExtensionBase","./FeatureActionFeatures"],function(t,e,r,o,a,i,n,s,u,d,c,p,h,f){var g=function(t){function e(){var e=t.call(this)||this;return e.mapWidgetProxy=null,e.mapWidgetId=null,e.dataSourceProxies=null,e.hasFeatureActions=!1,e.hasDefaultFeatureAction=!1,e.featureActionFeatures=null,e.dataSourceConfigs=null,e}return r(e,t),e.prototype._initializeResponseReceived=function(t){var e=this;return t&&"object"==typeof t||(new u).reject(new Error(p.invalidArguments)),this.inherited(arguments).then(function(){e.hasFeatureActions=t.supportFeatureActions,e.hasDefaultFeatureAction=t.supportDefaultFeatureAction;var r=n(e._setupMapWidgetProxy()),o=n(e._setupDataSourceProxies()),a=n(e._setupFeatureActionFeatures());return s([r,o,a])})},e.prototype._setupDataSourceProxies=function(){var t=this;if(this.dataSourceConfigs||(this.dataSourceConfigs=[]),0!==this.dataSourceConfigs.length){var e=[];return this.dataSourceConfigs.forEach(function(r){e.push(t.getDataSourceProxy(r.dataSourceId))}),s(e).then(function(e){t.dataSourceProxies=e})}},e.prototype._setupMapWidgetProxy=function(){var t=this;if(this.mapWidgetId)return this.getMapWidgetProxy(this.mapWidgetId).then(function(e){t.mapWidgetProxy=e})},e.prototype._setupFeatureActionFeatures=function(){var t=this;if(!this.hasFeatureActions||0===this.dataSourceConfigs.length)return void(this.featureActionFeatures=null);var e=this.dataSourceConfigs[0].dataSourceId;return this.featureActionFeatures?void(this.featureActionFeatures.dataSourceProxy.id!==e&&(this.featureActionFeatures=null)):this.getDataSourceProxy(e).then(function(e){t.featureActionFeatures=new f(e)})},e.prototype._messageReceived=function(t){switch(t.functionName.toLowerCase()){case"datasourceexpired":case"datasourceupdated":return void this._dataSourceExpired(t.args.dataSourceId);case"drawcomplete":return void this._drawComplete(t.args)}},e.prototype._dataSourceExpired=function(t){var e=this;this.getDataSourceProxy(t).then(function(t){var r=e.getDataSourceConfig(t);e.dataSourceExpired(t,r),e.emit("data-source-expired",{dataSourceProxy:t,dataSourceConfig:r})})},e.prototype.dataSourceExpired=function(t,e){},e.prototype.getDataSourceConfig=function(t){if(!this._isHostInitialized())throw new Error(p.hostNotReady);var e=t;"object"==typeof t&&(e=t.id);for(var r=0;r<this.dataSourceConfigs.length;r++)if(this.dataSourceConfigs[r].dataSourceId===e)return this.dataSourceConfigs[r];return null},e.prototype._dataSourceRemoved=function(t){if(this.inherited(arguments),this.dataSourceConfigs){for(var e=!1,r=0;r<this.dataSourceConfigs.length&&!e;r++)this.dataSourceConfigs[r].dataSourceId===t&&(this.dataSourceConfigs.splice(r,1),e=!0);e&&this._setupFeatureActionFeatures()}},e.prototype._mapWidgetRemoved=function(t){this.inherited(arguments),this.mapWidgetProxy&&this.mapWidgetProxy.id===t&&(this.mapWidgetProxy=null,this.mapWidgetId=null)},e.prototype.activateDrawingToolbar=function(t,e){if(!this._isHostInitialized())return(new u).reject(new Error(p.hostNotReady));if(e||(e=this.mapWidgetProxy),!e)return(new u).reject(new Error(p.invalidArguments));var r=e;return"object"==typeof e&&(r=e.id),c._sendMessageWithReply({functionName:"activateDrawingToolbar",args:i.mixin({mapWidgetId:r},t)}).then(function(){return!0},function(){return!1})},e.prototype.deactivateDrawingToolbar=function(t){if(!this._isHostInitialized())throw new Error(p.hostNotReady);if(t||(t=this.mapWidgetProxy),!t)throw new Error(p.invalidArguments);var e=t;"object"==typeof t&&(e=t.id),c._sendMessage({functionName:"deactivateDrawingToolbar",args:{mapWidgetId:e}})},e.prototype._drawComplete=function(t){if(t.cancelled)return this.drawingToolbarDeactivated(),void this.emit("drawing-toolbar-deactivated");var e=d.fromJSON(t.geometry);this.toolbarDrawComplete(e),this.emit("toolbar-draw-complete",{geometry:e})},e.prototype.toolbarDrawComplete=function(t){},e.prototype.drawingToolbarDeactivated=function(){},e.prototype.executeDefaultFeatureAction=function(t){if(!this._isHostInitialized())throw new Error(p.hostNotReady);if(this.hasDefaultFeatureAction&&Array.isArray(t)&&0!==t.length&&Array.isArray(this.dataSourceProxies)&&0!==this.dataSourceProxies.length){var e=this.dataSourceProxies[0],r=[];t.forEach(function(t){var o=t;if("object"==typeof t){if(!t.attributes||!t.attributes[e.objectIdFieldName])return;o=t.attributes[e.objectIdFieldName]}r.push(o)}),0!==r.length&&c._sendMessage({functionName:"executeDefaultFeatureAction",args:{dataSourceId:e.id,objectIds:r}})}},e}(h);return o([a.shared("esri.opsdashboard.WidgetProxy")],g.prototype,"declaredClass",void 0),g=o([a.subclass()],g)});