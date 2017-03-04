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

define(["require","exports","../../lib/glMatrix","../../support/earthUtils","../../support/projectionUtils","../../../../core/promiseUtils","../../../../core/Error","../../../../core/urlUtils","../../../../geometry/support/webMercatorUtils","../../../../tasks/QueryTask","../../../../tasks/support/Query","dojo/_base/lang","dojo/promise/all","../../../../request","../../../../geometry/SpatialReference","../../webgl-engine/Stage","../../webgl-engine/materials/Material","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/Layer","../../webgl-engine/lib/Util","./I3SBinaryReader"],function(e,t,r,n,a,o,i,l,s,u,c,d,f,g,p,h,m,v,b,y,w,R,T){function S(e){return"/"!==e[e.length-1]&&(e+="/"),e}function C(e){return e&&parseInt(e.substring(e.lastIndexOf("/")+1,e.length),10)}function M(e,t,r){switch(t){case"none":I(e);break;case"east-north-up":break;case"earth-centered":var n=a.SphericalRenderSpatialReference;r(e.normals,n);break;case"vertex-reference-frame":break;default:throw new Error("Received unexpected normalReferenceFrame: "+t)}}function I(e){var t=e.normals,r=e.positions,n=e.normalInd,a=e.positionInd;Z(e.normalInd.length===e.positionInd.length);for(var o=K.create(),i=K.create(),l=0;l<a.length;l+=3){var s=3*a[l],u=r[s],c=r[s+1],d=r[s+2];s=3*a[l+1],o[0]=r[s]-u,o[1]=r[s+1]-c,o[2]=r[s+2]-d,s=3*a[l+2],i[0]=r[s]-u,i[1]=r[s+1]-c,i[2]=r[s+2]-d,K.cross(o,i,o),K.normalize(o);for(var f=0;3>f;f++){var g=3*n[l+f];t[g]=o[0],t[g+1]=o[1],t[g+2]=o[2]}}}function O(e,r){if(Array.isArray(e)){if(r){var n=e.indexOf(t.DDS_ENCODING_STRING);if(n>-1)return n}for(var a=0;a<e.length;a++)if(t.BROWSER_SUPPORTED_IMAGE_ENCODING_STRINGS.indexOf(e[a])>-1)return a;throw new Error("Could not find appropriate texture encoding (among "+e.toString()+")")}return-1}function x(e,t,r,n,o,i){if(null!=r){var l=$;if(a.mbsToMbs(r.mbs,n,l,t),0!==E(e,l)){i.push(r);for(var s=null!=r.children?r.children.length:0,u=0;s>u;u++){var c=o[r.children[u].id];x(e,t,c,n,o,i)}}}}function E(e,t){var r=t[0],n=t[1],a=t[2],o=t[3],i=0;if(r<e[0]){var l=e[0]-r;i+=l*l}if(n<e[1]){var l=e[1]-n;i+=l*l}if(a<e[2]){var l=e[2]-a;i+=l*l}if(r>e[3]){var l=r-e[3];i+=l*l}if(n>e[4]){var l=n-e[4];i+=l*l}if(a>e[5]){var l=a-e[5];i+=l*l}if(i>o*o)return 0;if(i>0)return 1;var s=1/0;return r-e[0]<s&&(s=r-e[0]),n-e[1]<s&&(s=n-e[1]),a-e[2]<s&&(s=a-e[2]),e[3]-r<s&&(s=e[3]-r),e[4]-n<s&&(s=e[4]-n),e[5]-a<s&&(s=e[5]-a),s>o?2:1}function G(e,t,r){function o(e){return{ambient:e,diffuse:[0,0,0],transparent:!0,opacity:.5,blendModeOneOne:!1}}var i=new v(b.createCylinderGeometry(1,1,64,[0,0,1],[0,0,0],!1),"debugCylinder"),l=new v(b.createSphereGeometry(1),"debugSphere"),s={red:new m(o([.8,0,0]),"debugMaterialRed"),grey:new m(o([.4,.4,.4]),"debugMaterialGrey"),brown:new m(o([.2,.1,0]),"debugMaterialBrown"),green:new m(o([0,.8,0]),"debugMaterialGreen"),blue:new m(o([0,0,.8]),"debugMaterialBlue"),yellow:new m(o([.8,.8,0]),"debugMaterialYellow"),magenta:new m(o([.8,0,.8]),"debugMaterialMagenta")};for(var u in s)e.add(h.ModelContentType.MATERIAL,s[u]);e.add(h.ModelContentType.GEOMETRY,i);var c=new w(r+"_debug",{interaction:"IGNORED"},r+"_debug");e.add(h.ModelContentType.LAYER,c),e.addToViewContent([c.getId()]);var d=K.create(),f=X.create();return{engineLayer:c,added:{},show:function(e,r,o){var l=e.computedMbs;l||(l=Q.create(),a.mbsToMbs(e.mbs,r,l,t.spatialReference));var u="node"+e.id+"dbg";K.set(l,d);var c=l[3];if(c>n.earthRadius/10&&t.spatialReference===a.SphericalRenderSpatialReference){this.showWS(d,Math.max(.01*c,1e4),o,u+"_center");var g=K.length(d),p=n.earthRadius;if(p+c>g){var h=(g*g+p*p-c*c)/(2*g);K.scale(d,h/g),c=Math.sqrt(p*p-h*h)}}X.identity(f),X.scale(f,[c,c,.05*c]);var m=s[o];Z(m);var v=new y({name:u,geometries:[i],materials:[[m]],transformations:[f],castShadow:!1,idHint:u});a.computeLinearTransformation(r,e.mbs,f,t.spatialReference),null!=d&&(f[12]=d[0],f[13]=d[1],f[14]=d[2]),v.setObjectTransformation(f),this._addToStage(v,u)},showWS:function(e,t,r,n){var a=X.identity();X.scale(a,[t,t,t]);var o=s[r];Z(o);var i=new y({name:n,geometries:[l],materials:[[o]],transformations:[a],castShadow:!1,idHint:n}),u=X.identity();X.translate(u,e),i.setObjectTransformation(u),this._addToStage(i,n)},_addToStage:function(t,r){e.add(h.ModelContentType.OBJECT,t),this.engineLayer.addObject(t);var n=this.added[r];void 0!==n&&(e.remove(h.ModelContentType.OBJECT,n.getId()),this.engineLayer.removeObject(n)),this.added[r]=t},clear:function(){for(var t in this.added){var r=this.added[t];e.remove(h.ModelContentType.OBJECT,r.getId()),this.engineLayer.removeObject(r)}this.added={}},dispose:function(){this.clear();for(var t in s)e.remove(h.ModelContentType.MATERIAL,s[t].getId());e.remove(h.ModelContentType.GEOMETRY,i.getId()),e.remove(h.ModelContentType.LAYER,this.engineLayer.getId())}}}function A(e,t){for(var r=[],n=0,a=e;n<a.length;n++)for(var o=a[n],i=o.toLowerCase(),l=0,s=t;l<s.length;l++){var u=s[l];i===u.name.toLowerCase()&&r.push(u.name)}return r}function L(e,t,r,n,a){if(0===t.length)return o.resolve(t);var l=Object.keys(t[0].attributes).map(function(e){return e.toLowerCase()}),s=n.filter(function(e){return l.indexOf(e.toLowerCase())<0});if(0===s.length)return o.resolve(t);var u=function(e){for(var r=0;r<t.length;r++)d.mixin(t[r].attributes,e[r]);return t},c=e.companionFeatureLayer,f=e.attributeStorageInfo;if(c){t.sort(function(e,t){return e.attributes[r]-t.attributes[r]});var g=t.map(function(e){return e.attributes[r]});return k(c,g,s).then(u)}if(f){var p=a();if(null!=p)return _(f,p.node,p.indices,s,e.token).then(u)}return o.reject(new i("scenelayer:no-attribute-source","This scene layer does not have a source for attributes available"))}function k(e,t,r){if(void 0===r&&(r=["*"]),null!=e.maxRecordCount&&t.length>e.maxRecordCount){var n=N(t,e.maxRecordCount);return f(n.map(function(t){return k(e,t,r)})).then(D)}var a=new c({objectIds:t,outFields:r,orderByFields:[e.objectIdField]}),l=new u(e.parsedUrl.path);return l.execute(a).then(function(e){return e&&e.features&&e.features.length===t.length?e.features.map(function(e){return e.attributes}):o.reject(new i("scenelayer:feature-not-in-companion","Feature not found in companion feature layer"))})}function _(e,t,r,n,a){void 0===n&&(n=["*"]);var i=n.some(function(e){return"*"===e}),s=i?null:n.map(function(e){return e.toLowerCase()});return f(t.attributeData.map(function(r,n){var u=e[n].name.toLowerCase();if(!i&&!s.some(function(e){return u===e}))return o.resolve(null);var c=l.makeAbsolute(r.href,t.baseUrl);return g(c,{query:{token:a},responseType:"array-buffer"}).then(function(t){return T.readBinaryAttribute(e[n],t.data)}).otherwise(function(){return null})})).then(function(t){for(var n=[],a=0,o=r;a<o.length;a++){for(var i=o[a],l={},s=0;s<t.length;s++)null!=t[s]&&(l[e[s].name]=j(t[s],i));n.push(l)}return n})}function j(e,t){var r=e[t],n=r!==r;return n?null:r}function N(e,t){for(var r=e.length,n=Math.ceil(r/t),a=[],o=0;n>o;o++){var i=Math.floor(r*o/n),l=Math.floor(r*(o+1)/n);a.push(e.slice(i,l))}return a}function D(e){for(var t=[],r=0,n=e;r<n.length;r++){var a=n[r];t=t.concat(a)}return t}function B(e,t,r){void 0===r&&(r=2);for(var n=3,a=null!=t?t:e.length/r,o=new Uint32Array(a+1),l=0;a>l;l++){var s=e[l*r],u=s*n;o[l]=u;var c=(l-1)*r+1;if(c>=0&&s-1!==e[c])throw new i("Face ranges are not continuous")}var d=e[(a-1)*r+1],f=3*(d+1);return o[o.length-1]=f,o}function U(e){var t=new p(C(e.store.indexCRS||e.store.geographicCRS));return t.equals(e.spatialReference)?e.spatialReference:t}function F(e){var t=new p(C(e.store.vertexCRS||e.store.projectedCRS));return t.equals(e.spatialReference)?e.spatialReference:t}function P(e,t,r){if(!s.canProject(e,t))throw new i("layerview:spatial-reference-incompatible","The spatial reference of this scene layer is incompatible with the spatial reference of the view",{});if("local"===r&&e.isGeographic)throw new i("layerview:local-gcs-not-supported","Geographic coordinate systems are not supported in local scenes",{})}function V(e,t,r){var n=U(e),a=F(e);P(n,t,r),P(a,t,r)}function W(e){return null!=e.geometryType&&"triangles"!==e.geometryType?!1:null!=e.topology&&"PerAttributeArray"!==e.topology?!1:null==e.vertexAttributes||null==e.vertexAttributes.position?!1:!0}function q(e){if(null==e.store||null==e.store.defaultGeometrySchema||!W(e.store.defaultGeometrySchema))throw new i("scenelayer:unsupported-geometry-schema","The geometry schema of this scene layer is not supported.",{})}function Y(e,t){V(e,t.spatialReference,t.viewingMode)}function z(e){return null==e.geometryType||"points"!==e.geometryType?!1:null!=e.topology&&"PerAttributeArray"!==e.topology?!1:null!=e.encoding&&""!==e.encoding&&"lepcc-xyz"!==e.encoding?!1:null==e.vertexAttributes||null==e.vertexAttributes.position?!1:!0}function J(e){if(null==e.store||null==e.store.defaultGeometrySchema||!z(e.store.defaultGeometrySchema))throw new i("pointcloud:unsupported-geometry-schema","The geometry schema of this point cloud scene layer is not supported.",{})}function H(e,t){P(e.spatialReference,t.spatialReference,t.viewingMode)}var Q=r.vec4d,K=r.vec3d,X=r.mat4d,Z=R.assert,$=Q.create();t.DDS_ENCODING_STRING="image/vnd-ms.dds",t.BROWSER_SUPPORTED_IMAGE_ENCODING_STRINGS=["image/jpeg","image/png"],t.addTrailingSlash=S,t.extractWkid=C,t.processNormals=M,t.getAppropriateTextureEncoding=O,t.findIntersectingNodes=x,t.intersectBoundingBoxWithMbs=E,t.makeNodeDebugVisualizer=G,t.findFieldsCaseInsensitive=A,t.whenGraphicAttributes=L,t.getCachedAttributeValue=j,t.convertFlatRangesToOffsets=B,t.getIndexCrs=U,t.getVertexCrs=F,t.checkSpatialReference=P,t.checkSpatialReferences=V,t.checkSceneLayerValid=q,t.checkSceneLayerCompatibleWithView=Y,t.checkPointCloudLayerValid=J,t.checkPointCloudLayerCompatibleWithView=H});