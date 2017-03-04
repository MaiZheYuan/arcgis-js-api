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

define(["../../../core/declare","dojo/_base/lang","dojo/Deferred","../../../core/Accessor","../../../core/Promise","../../../core/urlUtils","../../../core/promiseUtils","../../../geometry/Extent","../../support/WebSocketConnector","../../../tasks/QueryTask","../../../request"],function(e,t,r,i,n,s,o,a,l,u,h){var c=e([i,n],{getDefaults:function(e){var r=this.inherited(arguments),i=e.layer;return i&&(r=t.mixin(r,{url:i.url})),r},initialize:function(){this.addResolvingPromise(this._fetchLayers())},properties:{connectionInfo:{get:function(){if(this.layer.hasMemorySource||this.layer.socketUrl)return{serviceSocketUrls:[this.layer.socketUrl]};if(this.layerDefinition){var e,t,r,i,n={},o=this.layerDefinition,a=[],l=[],u=[];if(o.streamUrls&&o.streamUrls.forEach(function(e){"ws"===e.transport&&(a=e.urls,n.token=e.token)},this),a.forEach(function(e){0===e.lastIndexOf("wss",0)?u.push(e):l.push(e)}),e="https"===s.appUrl.scheme||0===this.url.lastIndexOf("https:",0)?u:0===l.length?u:l,e&&e.length>1)for(t=0;t<e.length-1;t++)r=t+Math.floor(Math.random()*(e.length-t)),i=e[r],e[r]=e[t],e[t]=i;return n.serviceSocketUrls=e,n}}},latestUrl:{get:function(){var e=this.layerDefinition,t=e.keepLatestArchive&&e.keepLatestArchive.featuresUrl;return t=t?t:null}},latestQueryTask:{get:function(){var e=this.latestUrl;return e?new u(e):null}},relatedFeaturesInfo:{get:function(){var e=this.layerDefinition||{},t=e.relatedFeatures;return t=t&&t.featuresUrl?t:null}},relatedFeaturesQueryTask:{get:function(){var e=this.relatedFeaturesInfo,t=e?e.featuresUrl:null;return t?new u(t):null}},parsedUrl:{get:function(){return this.url?s.urlToObject(this.url):null}},url:null},createWebSocketConnector:function(e){var i=new r;return this.then(function(){var r,n,s,o,a=this.connectionInfo,u=this.layer.spatialReference,h={};try{r=this.makeFilter()}catch(c){return void i.reject(c)}if(a){if(a.socketUrl?s=[a.socketUrl]:a.serviceSocketUrls&&(s=a.serviceSocketUrls.map(function(e){return e+"/"+this.layer.socketDirection}.bind(this))),h.socketUrls=s,r&&(r.where||r.geometry||r.outFields)){var f=r.geometry;f&&"string"!=typeof f&&(f=f.toJSON?JSON.stringify(f.toJSON()):JSON.stringify(f)),n=t.mixin(n||{},{where:r.where,geometry:f,outFields:r.outFields})}a.token&&(n=t.mixin(n||{},{token:a.token})),e&&u&&e.wkid!==u.wkid&&(n=t.mixin(n||{},{outSR:e.wkid})),h.queryParams=n,h.layerSource=this,o=new l(h),i.resolve(o)}else i.reject(new Error("No web socket urls found"))}.bind(this)),i.promise},getWebSocketToken:function(){return this._fetchLayer().then(function(){var e=null;return this.layerDefinition.streamUrls&&this.layerDefinition.streamUrls.some(function(t){return"ws"===t.transport?(e=t.token,!0):void 0},this),e}.bind(this))},makeFilter:function(e){var r,i=this.layer,n=null;if(e){var s;if(r={},e.hasOwnProperty("where")&&(r.where=e.where),e.hasOwnProperty("geometry")){if(s=e.geometry,s&&!s.hasOwnProperty("xmin"))throw new Error("Cannot make filter. Only Extent is supported for the geometry filter");s&&!s.declaredClass&&(s=new a(s)),r.geometry=s}}else{var o=i.filter||{};r={where:o.where,geometry:o.geometry};var l=this.relatedFeaturesInfo&&this.relatedFeaturesInfo.outFields||i.outFields;if(l&&-1===l.indexOf("*")){var u=i.fields.map(function(e){return e.name});n=l.filter(function(e){return-1!==u.indexOf(e)}).join(","),r=t.mixin(r||{},{outFields:n})}}return r},_fetchLayers:function(){return this._fetchStreamLayer().then(function(e){return e.ssl&&(this.url=this.url.replace(/^http:/i,"https:")),this.layerDefinition=e.data,this._fetchArchiveLayer()}.bind(this)).then(function(e){return this.archivedLayerDefinition=e&&e.data,this._fetchRelatedLayer()}.bind(this)).then(function(e){this.relatedLayerDefinition=e&&e.data}.bind(this))},_fetchStreamLayer:function(){return this._requestServiceDefinition({url:this.layer.parsedUrl.path,content:t.mixin({f:"json"},this.layer.parsedUrl.query)})},_fetchArchiveLayer:function(){var e=this.latestUrl;return e?this._requestServiceDefinition({url:e}):o.resolve()},_fetchRelatedLayer:function(){var e=this.relatedFeaturesInfo;return e?this._requestServiceDefinition({url:e.featuresUrl}):o.resolve()},_requestServiceDefinition:function(e){return e&&e.url?h(e.url,{query:t.mixin(e.content||{},{f:"json"}),responseType:"json",callbackParamName:"callback"}):o.reject(new Error("url is a required options property"))}});return c});