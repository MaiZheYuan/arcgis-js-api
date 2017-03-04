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

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","./Bucket","./style/StyleLayer","./LineTess"],function(e,t,r,i,n,o,s){var a=function(e){function t(t,r,i,n,o){var a=e.call(this,t,r)||this;return a.extrudeVectorsDoubleBuffer=[s.allocExtrudeVectors(),s.allocExtrudeVectors()],a.recycledTriangleBridge=s.allocTriangles(20),a.recycledTrianglePie=s.allocTriangles(20),a.lineVertexBuffer=i,a.lineIndexBuffer=n,a}return r(t,e),Object.defineProperty(t.prototype,"triangleIndexStart",{get:function(){return this.triangleElementsStart},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"triangleIndexCount",{get:function(){return this.triangleElementsCount},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"connectorStart",{get:function(){return 0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"connectorCount",{get:function(){return 0},enumerable:!0,configurable:!0}),t.prototype.assignBufferInfo=function(e){var t=e;t.triangleElementsStart=this.triangleElementsStart,t.triangleElementsCount=this.triangleElementsCount},t.prototype.processFeatures=function(e,t){this.triangleElementsStart=this.lineIndexBuffer.index,this.triangleElementsCount=0,e&&e.setExtent(this.layerExtent);for(var r=new o.LineLayout(this.layer,this.zoom),i=0,n=this._features;i<n.length;i++){var s=n[i],a=s.getGeometry(e);this._processFeature(r,a)}},t.prototype._processFeature=function(e,t){if(t)for(var r=t.length,i=0;r>i;i++)this._processGeometry(t[i],e)},t.prototype._processGeometry=function(e,t){if(!(e.length<2)){var r=.001,i=e[0],n=e[e.length-1],o=n.x-i.x,a=n.y-i.y,l=r*r>o*o+a*a;if(!(e.length<2||3===e.length&&l)){for(var c=e[0],u=1;u<e.length;){var h=e[u].x-c.x,f=e[u].y-c.y;r*r>h*h+f*f?e.splice(u,1):(c=e[u],++u)}if(!(e.length<2||3===e.length&&l)){this.vertices=e,this.isClosed=l,this.cap=t.cap,this.join=t.join,this.almostParallelRads=.05,this.veryShallowRads=.1,this.miterSafeRads=s.MITER_SAFE_RADS,this.miterLimitMag=Math.min(t.miterLimit,s.SYSTEM_MAG_LIMIT),this.roundLimitRads=Math.min(t.roundLimit,.5),this.newRoundJoinsSafeRads=2.3;for(var d=this.lineIndexBuffer.index,p=0,g=void 0,m=0;m<e.length;++m){var y=e[m],v=g===this.extrudeVectorsDoubleBuffer[m%2]?this.extrudeVectorsDoubleBuffer[(m+1)%2]:this.extrudeVectorsDoubleBuffer[m%2];if(this._computeExtrudeVectors(v,m),this._writeGPUVertices(y.x,y.y,p,v),!v.capCenter||l&&m===e.length-1||this._writeGPUPieElements(v),g&&this._writeGPUBridgeElements(g,v),m<e.length-1){var x=e[m+1],b=s.length([x.x-y.x,x.y-y.y]);p+=b}g=v}this.triangleElementsCount+=3*(this.lineIndexBuffer.index-d)}}}},t.prototype._computeExtrudeVectors=function(e,t){var r=this.vertices,i=this.isClosed,n=r[t],o=[void 0,void 0],a=[void 0,void 0];if(t>0&&t<r.length-1){var l=r[(t+r.length-1)%r.length],c=r[(t+1)%r.length];s.normalize(o,[n.x-l.x,n.y-l.y]),s.normalize(a,[c.x-n.x,c.y-n.y])}else if(0===t){var c=r[(t+1)%r.length];if(s.normalize(a,[c.x-n.x,c.y-n.y]),i){var u=r[r.length-2];s.normalize(o,[n.x-u.x,n.y-u.y])}else o=a}else{if(t!==r.length-1)throw new Error("Parameter i out of range.");var l=r[(t+r.length-1)%r.length];if(s.normalize(o,[n.x-l.x,n.y-l.y]),i){var h=r[1];s.normalize(a,[h.x-n.x,h.y-n.y])}else a=o}i||0!==t?i||t!==r.length-1?this._computeJoinExtrudeVectors(e,o,a):this._computeCapExtrudeVectors(e,o,a,s.CapPosition.END):this._computeCapExtrudeVectors(e,o,a,s.CapPosition.START)},t.prototype._computeCapExtrudeVectors=function(e,t,r,i){if(0===this.cap)s.buttCap(e,t,r);else if(1===this.cap)s.roundCap(e,t,r,i,s.getNumberOfSlices(Math.PI));else{if(2!==this.cap)throw new Error("Unknown cap type!");s.squareCap(e,t,r,i)}},t.prototype._computeJoinExtrudeVectors=function(e,t,r){var i=s.getRads(t,r);if(2===this.join||i<this.veryShallowRads)i<this.almostParallelRads?s.fastMiterJoin(e,t,r):i<this.miterSafeRads?s.miterJoin(e,t,r):s.bevelJoin(e,t,r,this.miterLimitMag);else if(0===this.join)s.bevelJoin(e,t,r,1);else if(1===this.join){var n=s.getNumberOfSlices(i),o=i<this.newRoundJoinsSafeRads;o?2>n||i<this.roundLimitRads?s.bevelJoin(e,t,r,1):s.roundJoin(e,t,r,n):s.unitRoundJoin(e,t,r,n)}},t.prototype._writeGPUVertices=function(e,t,r,i){for(var n=0;n<i.vectors.count;++n){var o=i.vectors.items[n].vector[0],s=i.vectors.items[n].vector[1],a=0,l=i.vectors.items[n].side+1,c=this.lineVertexBuffer.add(e,t,o,s,a,l,r);i.vectors.items[n].base=c}},t.prototype._writeGPUBridgeElements=function(e,t){s.bridge(this.recycledTriangleBridge,e,t,!1);for(var r=0;r<this.recycledTriangleBridge.count;++r){var i=this.recycledTriangleBridge.items[r];this.lineIndexBuffer.add(i.v1.base,i.v2.base,i.v3.base)}},t.prototype._writeGPUPieElements=function(e){s.pie(this.recycledTrianglePie,e);for(var t=0;t<this.recycledTrianglePie.count;++t){var r=this.recycledTrianglePie.items[t];this.lineIndexBuffer.add(r.v1.base,r.v2.base,r.v3.base)}},t}(n);return a});