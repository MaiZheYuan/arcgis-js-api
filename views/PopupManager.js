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

define(["require","../core/promiseUtils","dojo/_base/array","dojo/on","dojo/Deferred","dojo/promise/all","../layers/support/layerUtils","../geometry/support/scaleUtils","../geometry/Extent","../tasks/support/Query","../layers/GroupLayer","../core/Accessor"],function(e,r,t,a,n,i,s,o,l,u,c,p){var f,h=p.createSubclass({declaredClass:"esri.views.PopupManager",properties:{map:{dependsOn:["view.map"],readOnly:!0}},constructor:function(){this._featureLayersCache={}},destroy:function(){this._featureLayersCache={},this.view=null},_clickHandle:null,_featureLayersCache:null,enabled:!1,_enabledSetter:function(e){this._clickHandle&&(e?this._clickHandle.resume():this._clickHandle.pause()),this._set("enabled",e)},_mapGetter:function(){return this.get("view.map")||null},view:null,_viewSetter:function(e){this._clickHandle&&(this._clickHandle.remove(),this._clickHandle=null),e&&(this._clickHandle=a.pausable(e,"click",this._clickHandler.bind(this)),this.enabled||this._clickHandle.pause()),this._set("view",e)},getMapLayer:function(e){var r;if(e&&(r=e.findLayerById())){var t=r.id;if(this._featureLayersCache[t]){var a=t.lastIndexOf("_");a>-1&&(t=t.substring(0,a),r=this.map.findLayerById(t))}}return r},_showPopup:function(e){function a(){y.clear(),y.close()}function i(e){return h.allLayerViews.find(function(r){return r.layer===e})}function s(e){if(null==e)return!1;var r=i(e);return null==r?!1:e.loaded&&!r.suspended&&(e.popupEnabled&&e.popupTemplate||"graphics"===e.type||r.getPopupData)}function p(e){var r=i(e);return r&&r.hasDraped}var f=this.map,h=this.view,y=h.popup,d=this,v=[],m="3d"===h.type;t.forEach(f.layers.toArray(),function(e){e.isInstanceOf(c)?t.forEach(e.layers.toArray(),function(e){!s(e)||m&&!p(e)||v.push(e)}):!s(e)||m&&!p(e)||v.push(e)}),h.graphics.length>0&&v.push(h.graphics);var g=null;if(e.graphic&&(e.graphic.popupTemplate||s(e.graphic.layer))&&(g=e.graphic),!v.length&&!g)return void a();var _=[],w=!!g;if(g){if(g.layer&&"scene"===g.layer.type)_.unshift(this._fetchSceneAttributes(g.layer,[g]));else if(g.getEffectivePopupTemplate()){var b=new n;_.unshift(b.resolve([g]))}}else{var L=d._calculateClickTolerance(v),x=e.mapPoint;if(!x)return void a();var M=1;h.state&&(M=h.state.resolution);var T=h.basemapTerrain;T&&T.overlayManager&&(M=T.overlayManager.overlayPixelSizeInMapUnits(x));var O=L*M;T&&!T.spatialReference.equals(h.spatialReference)&&(O*=o.getUnitValueForSR(T.spatialReference)/o.getUnitValueForSR(h.spatialReference));var k=x.clone().offset(-O,-O),D=x.clone().offset(O,O),E=new l(Math.min(k.x,D.x),Math.min(k.y,D.y),Math.max(k.x,D.x),Math.max(k.y,D.y),h.spatialReference),P=function(t){var a;if("imagery"===t.type){var n=new u;n.geometry=e.mapPoint;var s=i(t),o={};o.rasterAttributeTableFieldPrefix="Raster.",o.returnDomainValues=!0,o.layerView=s,a=t.queryVisibleRasters(n,o).then(function(e){return w=w||e.length>0,e})}else if("csv"===t.type||!d._featureLayersCache[t.id]&&"function"!=typeof t.queryFeatures){if("map-image"===t.type)return s=i(t),s.getPopupData(E);var l,c,p=[];"esri.core.Collection<esri.Graphic>"===t.declaredClass?(l=t,c=!0):"graphics"===t.type?(l=t.graphics,c=!0):(s=i(t),l=s&&s.loadedGraphics,c=!1),l&&(p=l.filter(function(e){return e&&(!c||e.popupTemplate)&&e.visible&&E.intersects(e.geometry)}).toArray()),p.length>0&&(w=!0,a="scene"===t.type?d._fetchSceneAttributes(t,p):r.resolve(p))}else{var f=t.createQuery();f.geometry=E,a=t.queryFeatures(f).then(function(e){var r=e.features;return w=w||r.length>0,r})}return a};_=v.map(P).filter(function(e){return!!e});var C=function(e){return e.reduce(function(e,r){return e.concat(r.items?C(r.items):r)},[])};_=C(_)}var S=t.some(_,function(e){return!e.isFulfilled()});return S||w?void(_.length&&y.open({promises:_,location:e.mapPoint})):void a()},_fetchSceneAttributes:function(e,t){return this.view.whenLayerView(e).then(function(a){var n=this._getOutFields(e.popupTemplate),i=t.map(function(e){return a.whenGraphicAttributes(e,n).otherwise(function(){return e})});return r.eachAlways(i)}.bind(this)).then(function(e){return e.map(function(e){return e.value})})},_getSubLayerFeatureLayers:function(r,o){var l=o||new n,u=[],c=r.length,p=Math.floor(this.view.extent.width/this.view.width),h=this.view.scale,y=!1,d=this;e:for(var v=0;c>v;v++){var m=r[v],g=m.dynamicLayerInfos||m.layerInfos;if(g){var _=null;m._params&&(m._params.layers||m._params.dynamicLayers)&&(_=m.visibleLayers),_=s._getVisibleLayers(g,_);for(var w=s._getLayersForScale(h,g),b=g.length,L=0;b>L;L++){var x=g[L],M=x.id,T=m.popupTemplates[M];if(!x.subLayerIds&&T&&T.popupTemplate&&t.indexOf(_,M)>-1&&t.indexOf(w,M)>-1){if(!f){y=!0;break e}var O=m.id+"_"+M,k=this._featureLayersCache[O];if(k&&k.loadError)continue;if(!k){var D=T.layerUrl;D||(D=x.source?this._getLayerUrl(m.url,"/dynamicLayer"):this._getLayerUrl(m.url,M)),k=new f(D,{id:O,drawMode:!1,mode:f.MODE_SELECTION,outFields:this._getOutFields(T.popupTemplate),resourceInfo:T.resourceInfo,source:x.source}),this._featureLayersCache[O]=k}k.setDefinitionExpression(m.layerDefinitions&&m.layerDefinitions[M]),k.setGDBVersion(m.gdbVersion),k.popupTemplate=T.popupTemplate,k.setMaxAllowableOffset(p),k.setUseMapTime(!!m.useMapTime),m.layerDrawingOptions&&m.layerDrawingOptions[M]&&m.layerDrawingOptions[M].renderer&&k.setRenderer(m.layerDrawingOptions[M].renderer),u.push(k)}}}}if(y){var E=new n;e(["../layers/FeatureLayer"],function(e){f=e,E.resolve()}),E.then(function(){d._getSubLayerFeatureLayers(r,l)})}else{var P=[];t.forEach(u,function(e){if(!e.loaded){var r=new n;a.once(e,"load, error",function(){r.resolve()}),P.push(r.promise)}}),P.length?i(P).then(function(){u=t.filter(u,function(e){return!e.loadError&&e.isVisibleAtScale(h)}),l.resolve(u)}):(u=t.filter(u,function(e){return e.isVisibleAtScale(h)}),l.resolve(u))}return l.promise},_getLayerUrl:function(e,r){var t,a=e.indexOf("?");return t=-1===a?e+"/"+r:e.substring(0,a)+"/"+r+e.substring(a)},_getOutFields:function(e){var r;return"esri.PopupTemplate"===e.declaredClass&&e.fieldInfos?(r=[],t.forEach(e.fieldInfos,function(e){var t=e.fieldName&&e.fieldName.toLowerCase();t&&"shape"!==t&&0!==t.indexOf("relationships/")&&r.push(e.fieldName)})):r=["*"],r},_calculateClickTolerance:function(e){var r=6;return t.forEach(e,function(e){var a=e.renderer;if(a)if("simple"===a.type){var n=a.symbol;n&&n.xoffset&&(r=Math.max(r,Math.abs(n.xoffset))),n&&n.yoffset&&(r=Math.max(r,Math.abs(n.yoffset)))}else("uniqueValue"===a.type||"classBreaks"===a.type)&&t.forEach(a.infos,function(e){var t=e.symbol;t&&t.xoffset&&(r=Math.max(r,Math.abs(t.xoffset))),t&&t.yoffset&&(r=Math.max(r,Math.abs(t.yoffset)))})}),r},_clickHandler:function(e){function r(e){return n.allLayerViews.find(function(r){return r.layer===e})}function t(e){if(null==e)return!1;var t=r(e);return null==t?!1:e.loaded&&!t.suspended&&(e.popupEnabled&&e.popupTemplate||"graphics"===e.type||t.getPopupData)}function a(e){var t=r(e);return t&&t.hasDraped}var n=this.view,i=n.popup,s=n.map,o=e.screenPoint,l=this;if(0===e.button&&i&&n.ready){var u="3d"===n.type,p=s.allLayers.some(function(e){return e.isInstanceOf(c)?!1:!t(e)||u&&!a(e)?!1:!0});return null!=o?void this.view.hitTest(o.x,o.y).then(function(r){r.results.length>0?l._showPopup(r.results[0]):p&&l._showPopup(e)}):void l._showPopup(e)}}});return h});