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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/_base/lang","../core/accessorSupport/decorators","../core/HandleRegistry","../core/watchUtils","../core/promiseUtils","../Viewpoint","../geometry/Point","../geometry/ScreenPoint","../geometry/Extent","../geometry/SpatialReference","./View","./ViewAnimation","./2d/FrameTask","./2d/PaddedViewState","./2d/MapViewConstraints","./2d/AnimationManager","./2d/viewpointUtils"],function(t,e,i,n,r,o,a,s,p,l,c,h,u,d,y,f,g,m,v,w,_){var b=function(t){function e(e){var i=t.call(this,e)||this;i._frameTask=new g(i),i._handles=new a,i.interacting=!1,i.resizeAlign="center",i.type="2d",i.constraints=new v,i.padding={top:0,right:0,bottom:0,left:0},i._frameTask=new g(i),i.watch("stationary",function(t){i._frameTask.stationary=t,i._frameTask.requestFrame()},!0),i.watch("state.viewpoint",function(t){i._flipStationary(),i._frameTask.requestFrame()},!0),i._handles.add([i.on("resize",function(t){return i._resizeHandler(t)})]),i.watch("ready",function(t){return i._readyWatcher(t)},!0),i.watch("animationManager.animation",function(t){i.animation||(i.animation=t)});var n=i.notifyChange.bind(i,"tileInfo");s.on(i,"map.basemap.baseLayers","change",n,n,n),s.on(i,"map.layers","change",n,n,n);var r=function(){this._set("updating",this.layerViewManager.factory.working||this.allLayerViews.some(function(t){return t.updating===!0}))}.bind(i);return i.allLayerViews.on("change",function(){r(),i._handles.remove("layerViewsUpdating"),i._handles.add(i.allLayerViews.map(function(t){return t.watch("updating",r)}).toArray(),"layerViewsUpdating")}),i}return i(e,t),Object.defineProperty(e.prototype,"animation",{set:function(t){var e=this,i=this._get("animation");return i&&i.stop(),!t||t.isFulfilled()?void this._set("animation",null):(this._set("animation",t),void t.then(function(){return e.animation=null},function(){return e.animation=null},function(t){return e.state.viewpoint=t}))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"center",{get:function(){if(!this.ready)return this._get("center");var t=this.content.center,e=this.content.spatialReference;return new c({x:t[0],y:t[1],spatialReference:e})},set:function(t){if(null!=t){if(!this.ready)return this._set("center",t),void this.notifyChange("initialExtentRequired");var e=this.viewpoint;_.centerAt(e,e,t),this.viewpoint=e}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"constraints",{set:function(t){var e=this,i=this._get("constraints");i&&(this._handles.remove("constraints"),i.view=null),this._set("constraints",t),t&&(this.ready&&(t.view=this,this.state.viewpoint=t.constrain(this.content.viewpoint,null)),this._handles.add(t.on("update",function(){e.ready&&e.state&&(e.state.viewpoint=t.constrain(e.content.viewpoint,null))}),"constraints"))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extent",{get:function(){return this.ready?this.content.extent.clone():this._get("extent")},set:function(t){if(null!=t){if(!this.ready)return this._set("extent",t),this._set("center",null),this._set("scale",0),void this.notifyChange("initialExtentRequired");var e=this.viewpoint;_.setExtent(e,e,t,this.size,{constraints:this.constraints}),this.viewpoint=e}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"initialExtentRequired",{get:function(){var t=this.get("map.initialViewProperties.viewpoint"),e=this._get("extent"),i=this._get("center"),n=this._get("scale"),r=this._get("viewpoint"),o=this._get("zoom"),a=this.initialExtent;return t?!(!(i&&n>0)||a):a?!1:!(e||r||i&&(n>0||-1!==o))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"padding",{get:function(){return this.ready?this.state.padding:this._get("padding")},set:function(t){return this.ready?(this.state.padding=t,void this._set("padding",this.state.padding)):void this._set("padding",t)},enumerable:!0,configurable:!0}),e.prototype._readyGetter=function(){var t=this.get("map.basemap"),e=this.get("map.basemap.baseLayers.0"),i=this.get("map.layers.0"),n=!0;return t&&t.load(),e&&e.load(),i&&i.load(),t&&t.loaded?e&&e.loaded?n=!1:!e&&i&&i.loaded&&(n=!1):t||(i&&i.loaded?n=!1:i||(n=!1)),this.inherited(arguments)&&!n},Object.defineProperty(e.prototype,"rotation",{get:function(){return this.ready?this.content.rotation:this._get("rotation")},set:function(t){if(!isNaN(t)){if(!this.ready)return void this._set("rotation",t);var e=this.viewpoint;_.rotateTo(e,e,t),this.viewpoint=e}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scale",{get:function(){return this.ready?this.content.scale:this._get("scale")},set:function(t){if(!isNaN(t)){if(!this.ready){this._set("scale",t);var e=this._get("extent");return e&&(this._set("extent",null),this._set("center",e.center)),void this.notifyChange("initialExtentRequired")}var i=this.viewpoint;_.scaleTo(i,i,t),this.viewpoint=i}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"stationary",{get:function(){return!(this.animation||this.interacting||this._get("resizing")||this._stationaryTimer)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"tileInfo",{get:function(){return this.get("map.basemap.baseLayers.0.tileInfo")||this.get("map.layers.0.tileInfo")},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"viewpoint",{get:function(){return this.ready?this.content.viewpoint.clone():this._get("viewpoint")},set:function(t){if(null!=t){if(!this.ready)return this._set("viewpoint",t),void this.notifyChange("initialExtentRequired");var e=_.create();_.copy(e,t),this.constraints.constrain(e,this.content.viewpoint),this.state.viewpoint=e,this._frameTask.requestFrame(),this._set("viewpoint",e)}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"zoom",{get:function(){return this.ready?this.constraints.scaleToZoom(this.scale):this._get("zoom")},set:function(t){if(null!=t&&(this.ready||(this.notifyChange("initialExtentRequired"),this._set("zoom",t)),this.constraints.effectiveLODs)){var e=this.viewpoint;_.scaleTo(e,e,this.constraints.zoomToScale(t)),this.viewpoint=e,this._set("zoom",this.constraints.scaleToZoom(this.scale))}},enumerable:!0,configurable:!0}),e.prototype.goTo=function(t,e){var i=this,n=this.content,o=n?n.size:this.size,a=n?n.viewpoint:this.viewpoint,s=this.spatialReference||null,p=this.constraints.snapToZoom;e=r.mixin({animate:!0},e,{spatialReference:s,size:o,currentViewpoint:a,constraints:this.constraints,snapToZoom:p});var l=_.createAsync(t,e);return l.then(function(t){if(e.animate){var n=null;return i.ready&&i.animationManager?(i.constraints.constrain(t,i.viewpoint),n=i.animation=i.animationManager.animateTo(t,i.viewpoint,e)):(i.viewpoint=t,n=new f({target:t}),n.finish(),n)}i.viewpoint=t})},e.prototype.hitTest=function(t,e){return p.reject("Should be implemented by subclasses")},e.prototype.toMap=function(t,e,i){if(!this.ready)return null;t&&null!=t.x&&(i=e,e=t.y,t=t.x);var n=[0,0];return this.state.toMap(n,[t,e]),i=i||new c,i.x=n[0],i.y=n[1],i.spatialReference=this.spatialReference,i},e.prototype.toScreen=function(t,e,i,n){if(!this.ready)return null;t&&null!=t.x&&(n=e,e=t.y,t=t.x),n=i||n||new h;var r=[t,e];return this.state.toScreen(r,r),n.x=r[0],n.y=r[1],n},e.prototype.pixelSizeAt=function(t,e){return this.ready?(t&&null!=t.x&&(e=t.y,t=t.x),this.content.pixelSizeAt([t,e])):NaN},e.prototype.requestLayerViewUpdate=function(t){this.ready&&this._frameTask.requestLayerViewUpdate(t)},e.prototype.getDefaultSpatialReference=function(){return this.get("map.initialViewProperties.spatialReference")||this.get("defaultsFromMap.spatialReference")},e.prototype._resizeHandler=function(t){var e=this.state;if(e){var i=this.content.viewpoint,n=this.content.size.concat();e.size=[t.width,t.height],_.resize(i,i,n,this.content.size,this.resizeAlign),i=this.constraints.constrain(i,null),this.state.viewpoint=i}},e.prototype._readyWatcher=function(t){t||this._frameTask.stop(),this.constraints.view=this;var e={zoom:this._get("zoom"),scale:this._get("scale"),center:this._get("center"),extent:this._get("extent"),padding:this._get("padding"),rotation:this._get("rotation"),viewpoint:this._get("viewpoint")},i=this.get("map.initialViewProperties.viewpoint"),n=!i||e.center||e.extent?e:{viewpoint:i},r=_.create(n,{spatialReference:this.spatialReference,size:this.size,constraints:this.constraints,extent:this.initialExtent});this._set("animationManager",new w),this.state=new m({padding:e.padding,size:this.size,viewpoint:r}),this.content=this.state.content,this._frameTask.start()},e.prototype._flipStationary=function(){var t=this;this._stationaryTimer&&clearTimeout(this._stationaryTimer),this._stationaryTimer=setTimeout(function(){t._stationaryTimer=null,t.notifyChange("stationary")},160),this.notifyChange("stationary")},e}(o.declared(y));return n([o.property()],b.prototype,"animation",null),n([o.property({readOnly:!0})],b.prototype,"animationManager",void 0),n([o.property({value:null,type:c,dependsOn:["content.center"]})],b.prototype,"center",null),n([o.property({type:v})],b.prototype,"constraints",null),n([o.property()],b.prototype,"content",void 0),n([o.property({value:null,type:u,dependsOn:["content.extent"]})],b.prototype,"extent",null),n([o.property({readOnly:!0})],b.prototype,"interacting",void 0),n([o.property({type:u})],b.prototype,"initialExtent",void 0),n([o.property({dependsOn:["map.initialViewProperties.viewpoint"]})],b.prototype,"initialExtentRequired",null),n([o.property({value:{top:0,right:0,bottom:0,left:0},cast:function(t){return r.mixin({top:0,right:0,bottom:0,left:0},t)}})],b.prototype,"padding",null),n([o.property()],b.prototype,"resizeAlign",void 0),n([o.property({value:0,type:Number,dependsOn:["content.rotation"]})],b.prototype,"rotation",null),n([o.property({type:Number,dependsOn:["content.scale"]})],b.prototype,"scale",null),n([o.property({type:d,dependsOn:["map.initialViewProperties.spatialReference"]})],b.prototype,"spatialReference",void 0),n([o.property()],b.prototype,"state",void 0),n([o.property()],b.prototype,"stationary",null),n([o.property({readOnly:!0,dependsOn:["map.initialViewProperties.viewpoint","map.layers","map.basemap"]})],b.prototype,"tileInfo",null),n([o.property({readOnly:!0})],b.prototype,"type",void 0),n([o.property({value:null,type:l,dependsOn:["content.viewpoint"]})],b.prototype,"viewpoint",null),n([o.property({value:-1,dependsOn:["content.scale"]})],b.prototype,"zoom",null),b=n([o.subclass("esri.views.MapViewBase")],b)});