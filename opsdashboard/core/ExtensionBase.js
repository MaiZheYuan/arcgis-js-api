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

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","../../core/typescript","dojo/Deferred","../../identity/IdentityManager","../../identity/Credential","../../request","./messageHandler","./MessageReceiver","./errorMessages","../MapWidgetProxy","../DataSourceProxy"],function(e,t,i,r,o,n,a,s,d,u,c,p,h,l){var g=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.portalHelperServices=null,t.drawingType={POINT:"point",LINE:"line",POLYLINE:"polyline",FREEHAND_POLYLINE:"freehandpolyline",EXTENT:"extent",CIRCLE:"circle",POLYGON:"polygon",FREEHAND_POLYGON:"freehandpolygon"},t.isNative=null,t.portalUrl=null,t}return i(t,e),t.prototype.dojoConstructor=function(){var e=this;this._hostInitialized=!1,this._dataSourceProxies=[],this._mapWidgetProxies=[],this.portalHelperServices=null,u._sendMessageWithReply({functionName:"initialize"}).then(function(t){return e._initializeResponseReceived(t)}).then(function(){return e._hostReady()}).then(function(){u._sendMessage({functionName:"afterInitialize"})}).otherwise(function(t){e._hostInitializationError(t)})},t.prototype.__messageReceived=function(e){switch(e.functionName.toLowerCase()){case"datasourceadded":return this._dataSourceAdded(e.args.dataSource);case"datasourceremoved":return this._dataSourceRemoved(e.args.dataSourceId);case"mapwidgetadded":return this._mapWidgetAdded(e.args.mapWidget);case"mapwidgetremoved":return this._mapWidgetRemoved(e.args.mapWidgetId);default:return this._messageReceived(e)}},t.prototype._initializeResponseReceived=function(e){return this.isNative=u.isNative,this._hostInitialized=!0,this.portalHelperServices=e.helperServices,this.portalUrl=e.portalUrl,this.setupIdentityManager(e.usePortalServices),this._setConfig(e.configuration),(new n).resolve()},t.prototype._isHostInitialized=function(){return this._hostInitialized},t.prototype._hostReady=function(){this.hostReady(),this.emit("host-ready")},t.prototype.hostReady=function(){},t.prototype._hostInitializationError=function(e){this._hostInitialized=!1,this.hostInitializationError(e),this.emit("initialization-error",{error:e})},t.prototype.hostInitializationError=function(e){},t.prototype.getMapWidgetProxies=function(){var e=this;return this._isHostInitialized()?this._mapWidgetProxies&&this._mapWidgetProxies.length>0?(new n).resolve(this._mapWidgetProxies):u._sendMessageWithReply({functionName:"getMapWidgets"}).then(function(t){return e._mapWidgetProxies=t.mapWidgets.map(function(e){return new h(e)},e),e._mapWidgetProxies}):(new n).reject(new Error(p.hostNotReady))},t.prototype.getMapWidgetProxy=function(e){return this._isHostInitialized()?e?this.getMapWidgetProxies().then(function(t){for(var i=0;i<t.length;i++)if(t[i].id===e)return t[i];return null}):(new n).reject(new Error(p.invalidArguments)):(new n).reject(new Error(p.hostNotReady))},t.prototype._mapWidgetRemoved=function(e){for(var t=0;t<this._mapWidgetProxies.length;t++)if(this._mapWidgetProxies[t].id===e){this._mapWidgetProxies.splice(t,1);break}this.mapWidgetRemoved(e),this.emit("map-widget-removed",{mapWidgetId:e})},t.prototype.mapWidgetRemoved=function(e){},t.prototype._mapWidgetAdded=function(e){var t=new h(e);this._mapWidgetProxies.push(t),this.mapWidgetAdded(t),this.emit("map-widget-added",{mapWidgetProxy:t})},t.prototype.mapWidgetAdded=function(e){},t.prototype.getDataSourceProxies=function(){var e=this;return this._isHostInitialized()?u._sendMessageWithReply({functionName:"getDataSources"}).then(function(t){return e._dataSourceProxies=[],t.dataSources.map(function(t){var i=new l(t);return e._dataSourceProxies[t.id]=i,i})}):(new n).reject(new Error(p.hostNotReady))},t.prototype.getDataSourceProxy=function(e){var t=this;if(!this._isHostInitialized())return(new n).reject(new Error(p.hostNotReady));if(!e)return(new n).reject(new Error(p.invalidArguments));var i=this._dataSourceProxies[e];if(i)return(new n).resolve(i);var r={functionName:"getDataSource",args:{dataSourceId:e}};return u._sendMessageWithReply(r).then(function(e){var i=new l(e.dataSource);return t._dataSourceProxies[e.dataSource.id]=i,i})},t.prototype._dataSourceRemoved=function(e){for(var t=0;t<this._dataSourceProxies.length;t++)if(this._dataSourceProxies[t].id===e){this._dataSourceProxies.splice(t,1);break}this.dataSourceRemoved(e),this.emit("data-source-removed",{dataSourceId:e})},t.prototype.dataSourceRemoved=function(e){},t.prototype._dataSourceAdded=function(e){var t=new l(e);this._dataSourceProxies[e.dataSourceId]=t,this.dataSourceAdded(t),this.emit("data-source-added",{dataSourceProxy:t})},t.prototype.dataSourceAdded=function(e){},t.prototype.setupIdentityManager=function(e){function t(e){return u._sendMessageWithReply({functionName:"getCredential",args:{url:e}})}e&&(a.useSignInPage=!1,d.setRequestPreCallback(function(e){return e.failOk=!0,e}),a.signIn=function(e,i){var r=new n;return t(e).then(function(e){var i=new s(e.credential);i.refreshToken=function(){var e=this;return t(this.server).then(function(t){e.token=t.credential.token,e.expires=t.credential.expires?Number(t.credential.expires):null,e.creationTime=t.credential.creationTime,e.validity=t.credential.validity,e.onTokenChange()})},r.resolve(i)}),r},a.setProtocolErrorHandler(function(){return!0}))},t}(c);return r([o.shared("esri.opsdashboard.ExtensionBase")],g.prototype,"declaredClass",void 0),g=r([o.subclass()],g)});