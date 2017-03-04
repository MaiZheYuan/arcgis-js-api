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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../support/PromiseLightweight","./Graphics3DGraphic","./Graphics3DSymbolLayerFactory"],function(r,e,i,t,s,h){var a=function(r){function e(e,i,t){var s=r.call(this)||this;s.symbol=e;var a=e.symbolLayers,o=0;t&&(a=t.concat(a),o=t.length);var l=a.length;s.childGraphics3DSymbols=new Array(a.length),s.childGraphics3DSymbolPromises=new Array(a.length);for(var c=i.layerOrder,n=0,p=0,d=!1,y=function(r,e){e&&(this.childGraphics3DSymbols[r]=e,p++),n--,!this.isRejected()&&d&&1>n&&(p>0?this.resolve():this.reject())},f=0;l>f;f++){var m=a.getItemAt(f);if(m.enabled!==!1){i.layerOrder=c+(1-(1+f)/l),i.layerOrderDelta=1/l;var u=h.make(m,i,m._ignoreDrivers);u&&(n++,s.childGraphics3DSymbolPromises[f]=u,u.then(y.bind(s,f,u),y.bind(s,f,null)))}}return i.layerOrder=c,d=!0,!s.isRejected()&&1>n&&(p>0?s.resolve():s.reject()),s}return i(e,r),e.prototype.createGraphics3DGraphic=function(r,e,i){for(var t=new Array(this.childGraphics3DSymbols.length),h=0;h<this.childGraphics3DSymbols.length;h++){var a=this.childGraphics3DSymbols[h];a&&(t[h]=a.createGraphics3DGraphic(r,e))}return new s(r,i||this,t)},e.prototype.layerPropertyChanged=function(r,e){for(var i=this.childGraphics3DSymbols.length,t=0;i>t;t++){var s=this.childGraphics3DSymbols[t];if(s&&!s.layerPropertyChanged(r,e,t))return!1}return!0},e.prototype.applyRendererDiff=function(r,e,i){return this.isResolved()?this.childGraphics3DSymbols.reduce(function(t,s,h){return t&&(!s||s.applyRendererDiff(r,e,i,h))},!0):!1},e.prototype.getFastUpdateStatus=function(){var r=0,e=0,i=0;return this.childGraphics3DSymbolPromises.forEach(function(t){t&&!t.isFulfilled()?r++:t&&t.isFastUpdatesEnabled()?i++:t&&e++}),{loading:r,slow:e,fast:i}},e.prototype.setDrawOrder=function(r,e){for(var i=this.childGraphics3DSymbols.length,t=1/i,s=0;i>s;s++){var h=this.childGraphics3DSymbols[s];if(h){var a=r+(1-(1+s)/i);h.setDrawOrder(a,t,e)}}},e.prototype.destroy=function(){this.isFulfilled()||this.reject();for(var r=0;r<this.childGraphics3DSymbolPromises.length;r++)this.childGraphics3DSymbolPromises[r]&&this.childGraphics3DSymbolPromises[r].destroy()},e}(t.Promise);return a});