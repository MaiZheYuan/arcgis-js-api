// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/4.0/esri/copyright.txt for details.

define(["require","exports","dojo/_base/lang","../../webgl-engine/lib/Util","./I3SUtil","./I3SBinaryReader","../../support/PromiseLightweight","../../support/projectionUtils","../../lib/glMatrix","../../support/PromiseNativeOrShim"],function(e,t,r,a,n,i,o,u,s,l){var d=a.assert,f=s.vec4d,c={},h=function(){function e(t,r,a,i,o,u,s,d,f,c,h,m,p,g,v){this.bundleLoadedCallback=r,this.queueFunctionCall=a,this.debugVis=i,this.renderCoordsHelper=o,this.indexSR=u,this.calcDesiredTextureLOD=s,this.imageIsPartOfTextureBundle=d,this.matId2Meta=f,this.texId2Meta=c,this.useCompressedTextures=h,this.warningEvent=m,this.defaultGeometrySchema=p,this.requiredAttributes=g,this.bypassFeatureData=v,this.texIdToPromises={},this.loadShared=function(t){if(null==t.sharedResource)return l.resolve({});var r=n.concatUrl(t.baseUrl,t.sharedResource.href)+"/";return t.sharedResource.hrefConcat=r,this.loadJSON(r).then(function(t){return e.fixTextureEncodings(t),e.addAbsoluteHrefTexture(t,r),t})},this.loader=t,this.cancelled=!1}return e.prototype.waitForAnimationFrame=function(){var e=this;return new l(function(t,r){e.queueFunctionCall(t,null,[],r)})},e.prototype.cancel=function(){this.cancelled=!0},e.prototype.loadJSON=function(e){var t=this.loader.request(e,"json");return new l(function(r,a){t.then(function(e,t){r(t)},function(){a(new Error("Failed to load: "+e))})})},e.prototype.loadBinary=function(e){var t=this.loader.request(e,"binary");return new l(function(r,a){t.then(function(e,t){r(t)},function(){a(new Error("Failed to load: "+e))})})},e.prototype.loadImage=function(e){var t=this.loader.request(e,"image");return new l(function(r,a){t.then(function(e,t){r(t)},function(){a(new Error("Failed to load: "+e))})})},e.prototype.loadAttribute=function(e,t,r){var a=n.addTrailingSlash(n.concatUrl(e,r));return this.loadBinary(a).then(function(e){return i.readBinaryAttribute(t,e)})},e.prototype.loadAttributes=function(e,t,r){var a=this,n=r.map(function(r){return a.loadAttribute(t,r.attributeStorageInfo,e.attributeData[r.index].href)});return l.all(n).then(function(e){for(var t={},a=0;a<r.length;++a)e[a]&&(t[r[a].name]=e[a]);return t})},e.prototype.prepareBinaryGeometryData=function(e,t,a,o){var u=e.geometries[0];if(r.mixin(u.params,a),e.faceRanges[0][0]=0,e.faceRanges[0][1]=a.header.fields.vertexCount/3-1,o||null!=a.vertexAttributes.region||delete a.vertexAttributes.region,null!=a.featureAttributes){var s=a.featureAttributes;if(s.faceRange){e.faceRanges=[];for(var l=i.createTypedView(t,s.faceRange),d=s.faceRange.valuesPerElement,f=0;f<a.header.fields.featureCount;f++)e.faceRanges[f]=[l[f*d],l[f*d+1]]}if(s.id){e.featureIds=[];var c=1,h=n.valueType2TypedArrayClassMap[s.id.valueType];"UInt64"===s.id.valueType&&(h=Uint32Array,c=2);for(var m=new h(t,s.id.byteOffset,s.id.count*s.id.valuesPerElement*c),f=0;f<a.header.fields.featureCount;f++)if(e.featureIds[f]=m[f*s.id.valuesPerElement*c],2===c){var p=m[f*s.id.valuesPerElement*c+1];if(p>=2097150)throw new Error("ID exceeded maximum range supported by javascript (max = 53bit-1 = 9007199254740991)");e.featureIds[f]+=4294967296*p}}}},e.prototype.loadNodeData=function(t,a,o,u,s){var d=this,f=null==t.features,c=t.baseUrl,h={},m=this.loadShared(t),p=m.then(function(e){return d.loadReferencedShared(e,c)}),g=null;null!=this.requiredAttributes&&(g=this.loadAttributes(t,c,this.requiredAttributes));var v=null;null!=t.geometryData&&(v=t.geometryData.map(function(e,t){if(-1===a.indexOf(t))return null;var r=n.concatUrl(c,e.href);return e.hrefConcat=r,d.loadBinary(r)})),l.all([m,p]).then(function(n){var o=n[0],c=n[1];d.handleCancelled(),t.sharedResource&&(h[t.sharedResource.hrefConcat]=o,r.mixin(h,c));var m=a.map(function(r){var a=d.loadFeatureData(t,r,o);return a.then(function(a){d.handleCancelled(),f&&e.buildNodeFeatures(t,r,a);var n=d.collectGeometries(t,r,a,o),s=null;s=null!=v&&null!=v[r]?v[r].then(function(e){h[t.geometryData[r].hrefConcat]=e;var a=Object.keys(o.materialDefinitions)[0],u=o.materialDefinitions[a].params.vertexRegions,s=i.createGeometryDataIndex(e,d.defaultGeometrySchema,u);return d.prepareBinaryGeometryData(n[0],e,s,u),n}):l.resolve(n);var c=u?d.loadTextures(n,o,d.matId2Meta,d.texId2Meta).then(function(e){var t={};return e.forEach(function(e){var r=e.i3sTexId;t[r]={i3sTexId:r,data:e.data,encoding:e.encoding,desiredLOD:e.desiredLOD,createdTextureForDomImage:function(){d.texIdToPromises[r]&&delete d.texIdToPromises[r]}}}),t}):null;return l.all([c,s,g])}).then(function(e){var a=e[0],n=e[1],i=e[2];d.handleCancelled(),void 0!==d.debugVis&&d.debugVis.show(t,d.indexSR,"green");var o=null;return i&&(o={attributeData:i,loadedAttributes:d.requiredAttributes}),d.callbackWrapped(t,n,o,h,a,r,s)})["catch"](function(){return d.handleCancelled(),d.callbackWrapped(t,null,null,h,null,r,s)})});return l.all(m)})["catch"](function(){if(!d.cancelled){var e=a.map(function(e){return d.callbackWrapped(t,null,null,h,null,e,s)});return l.all(e)}}).then(function(){o.done()})},e.prototype.callbackWrapped=function(e,t,r,a,n,i,u){var s=this;return this.waitForAnimationFrame().then(function(){return new l(function(l,d){var f=new o.Promise,c=s.bundleLoadedCallback;c(e,t,r,a,f,n,i,u),f.then(l,d)})})},e.addAbsoluteHrefTexture=function(e,t){var r=e.textureDefinitions;if(void 0!==r)for(var a in r)if(r.hasOwnProperty(a))for(var i=r[a],o=0;o<i.images.length;o++){var u=i.images[o];u.hrefConcat=Array.isArray(i.encoding)?u.href.map(function(e){return n.concatUrl(t,e)}):n.concatUrl(t,u.href)}},e.fixTextureEncodings=function(e){var t=e.textureDefinitions;if(null!=t)for(var r in t){var a=t[r];if(Array.isArray(a.encoding))for(var n=0;n<a.encoding.length;n++){var i=a.encoding[n];"data:"===i.substring(0,5)&&(a.encoding[n]=i.substring(5))}else{var i=a.encoding;"data:"===i.substring(0,5)&&(a.encoding=i.substring(5))}}},e.prototype.loadReferencedShared=function(t,r){var a=this;if(null==t||null==t.materialDefinitions)return l.resolve({});var i=Object.keys(t.materialDefinitions).filter(function(e){return t.materialDefinitions[e]&&null!=t.materialDefinitions[e].href}).map(function(e){return n.concatUrl(r,t.materialDefinitions[e].href)+"/"});return l.all(i.map(function(e){return a.loadJSON(e).then(function(t){return[e,t]})})).then(function(t){for(var r={},a=0,n=t;a<n.length;a++){var i=n[a],o=i[0],u=i[1];e.fixTextureEncodings(u),e.addAbsoluteHrefTexture(u,o),r[o]=u}return r})},e.prototype.loadTexture=function(e,t,r,a,i,o){var u=this,s=o>-1?r.encoding[o]:r.encoding,f=s===n.DDS_ENCODING_STRING,c=this.imageIsPartOfTextureBundle(a);return d(!(f&&c),"DDS in multi texture bundles not supported at the moment"),f?this.loadBinary(e).then(function(e){return u.cancelled?l.reject():{i3sTexId:t,data:e,encoding:s,desiredLOD:i}}):c?this.loadBinary(e).then(function(r){var n;try{var f,c=void 0;o>-1?(d(Array.isArray(a.byteOffset)&&Array.isArray(a.length),"texture encoding is array, but image byteOffset/length isn't"),c=a.byteOffset[o],f=a.length[o]):(c=a.byteOffset,f=a.length);var h=new Uint8Array(r,c,f),m=new Blob([h],{type:s});n=window.URL.createObjectURL(m)}catch(p){n="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIElEQVQ4T2P8zyD6n4ECwDhqAMNoGDCMhgEwDw2DdAAAdzkhQdS8dl8AAAAASUVORK5CYII=",console.error("error loading texture "+e+" "+p)}var g=new Image,v=new l(function(e,r){var a=function(){window.URL.revokeObjectURL(n),g.onerror=void 0,g.onload=void 0};g.onerror=function(e){a(),r(e)},g.onload=function(){a(),u.cancelled?r():e({i3sTexId:t,data:g,encoding:s,desiredLOD:i})}});return g.src=n,v}):this.loadImage(e).then(function(e){return u.cancelled?l.reject():{i3sTexId:t,data:e,encoding:s,desiredLOD:i}})},e.getAllEngineMBS=function(e){for(var t=[],r=0;r<e.length;r++)t.push(e[r].engineMBS);return t},e.prototype.loadTextures=function(t,r,a,i){for(var o=[],u=0;u<t.length;u++)for(var s=t[u].geometries,f=e.getAllEngineMBS(t[u].features),c=0;c<s.length;++c)for(var h=s[c],m=h.params.components.length,p=0;m>p;p++){var g=h.params.components[p],v=g.materialID,b=g.textureID||"none";if((!a[v]||null==a[v][b])&&null==i[b]&&"none"!==b){if(null!=this.texIdToPromises[b]){o.push(this.texIdToPromises[b]);continue}(null==r.textureDefinitions||null==r.textureDefinitions[b])&&this.warningEvent("textureDefinitions missing in shared resource. i3sTexId: "+b,1);var y=r.textureDefinitions[b];d(void 0!==y,"geometry wants unknown texture "+b);var D=this.calcDesiredTextureLOD(f,y.images);if(0===y.images.length)continue;var x=y.images[D],A=n.getAppropriateTextureEncoding(y.encoding,this.useCompressedTextures()),I=A>-1?x.hrefConcat[A]:x.hrefConcat,R=this.loadTexture(I,b,y,x,D,A);o.push(R),this.texIdToPromises[b]=R}}return l.all(o)},e.getIdFromJsonPointer=function(e){var t=e.split("/");return t[t.length-1]},e.buildNodeFeatures=function(e,t,r){null==e.features&&(e.features=[]);for(var a in r.featureData){var n=r.featureData[a];e.features.push({id:n.id,mbs:e.mbs,block:t})}},e.prototype.collectGeometries=function(t,r,a,n){var i=[],o=!1,s=0,l=t.features.length-1;null==t.featureData[r].featureRange?o=!0:(s=t.featureData[r].featureRange[0],l=t.featureData[r].featureRange[1]);for(var c=s;l>=c;++c){var h=t.features[c];if(!h.engineMBS){var m=f.create();u.mbsToMbs(h.mbs,this.indexSR,m,this.renderCoordsHelper.spatialReference),m[3]=h.mbs[3],h.engineMBS=m}if(!o||h.block===r){for(var p=a.featureData,g=void 0,v=0;v<p.length;v++)if(p[v].id===h.id){g=p[v];break}d(null!=g,"I3S: unable to find feature data in specified block in node.id "+t.id+" feature.id "+h.id);var b=g.geometries,y=[],D=[];if(null!=b)for(var x=0;x<b.length;x++){var A=g.geometries[x];if("GeometryReference"===A.type){for(var I=e.getIdFromJsonPointer(A.params.$ref),R=void 0,T=0;T<a.geometryData.length;T++){var w=a.geometryData[T];if(w.id+""===I){R=w;break}}if(d(null!=R,"I3S: Unable to find referenced geometry"),null==R.params.material){this.warningEvent("material definition is missing in featureData, node: "+t.id,1);var O=Object.keys(n.materialDefinitions)[0];R.params.material="/materialDefinitions/"+O}null==R.params.components&&(R.params.components=null!=R.params.texture?[{material:R.params.material,materialID:e.getIdFromJsonPointer(R.params.material),texture:R.params.texture,textureID:e.getIdFromJsonPointer(R.params.texture),id:1}]:[{material:R.params.material,materialID:e.getIdFromJsonPointer(R.params.material),id:1}],null!=R.params.faces&&null!=R.params.faces.position&&(R.params.faces.position.componentIndices=[0]));var S=void 0;S=null;for(var T=0;T<i.length;T++)if(1===i[T].geometries.length&&i[T].geometries[0].id+""===I){S=i[T];break}null===S&&(S={features:[],featureDataPositions:[],featureDataAttributes:[],faceRanges:[],geometries:[R]},i.push(S)),S.features.push(h),S.featureDataAttributes.push(g.attributes),S.featureDataPositions.push(g.position),S.faceRanges.push(A.params.faceRange)}else y.push(A),null!=A.params.faceRange&&D.push(A.params.faceRange)}else null!=g.position&&y.push({id:h.id,type:"Embedded",transformation:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],params:{type:"points",vertexAttributes:{position:[0,0,0]}}});0===D.length&&(D=null),y.length>0&&i.push({features:[h],featureDataAttributes:[g.attributes],featureDataPositions:[g.position],geometries:y,faceRanges:D})}}return i},e.prototype.loadFeatureData=function(t,r,a){if(this.bypassFeatureData&&this.defaultGeometrySchema){var i=t.id,o=void 0,u=void 0;null!=a.materialDefinitions&&(o=Object.keys(a.materialDefinitions)[0]),null!=a.textureDefinitions&&(u=Object.keys(a.textureDefinitions)[0]);var s=null,d=e.buildDefaultFeatureData(i,o,u,s);return l.resolve(d)}var f=n.concatUrl(t.baseUrl,t.featureData[r].href);return t.featureData[r].hrefConcat=f,this.loadJSON(f)},e.buildDefaultFeatureData=function(e,t,r,a){return{featureData:[{id:e,position:[0,0,0],pivotOffset:[0,0,0],mbb:a,layer:"Default",geometries:[{id:"1",type:"GeometryReference",params:{$ref:"/geometryData/0",faceRange:[0,0]}}]}],geometryData:[{id:"0",type:"ArrayBufferView",transformation:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],params:{type:"triangles",material:"/materialDefinitions/"+t,texture:null!=r?"/textureDefinitions/"+r:void 0}}]}},e.prototype.handleCancelled=function(){if(this.cancelled)throw c},e}();return h});