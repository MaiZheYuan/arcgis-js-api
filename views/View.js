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

define(["dojo/_base/lang","../Graphic","../core/Accessor","../core/Collection","../core/CollectionFlattener","../core/Evented","../core/HandleRegistry","../core/Promise","../core/watchUtils","../core/promiseUtils","../core/Scheduler","../geometry/SpatialReference","../geometry/Extent","./BreakpointsOwner","./LayerViewManager","./BasemapView","./GroundView","./support/DefaultsFromMap"],function(e,t,i,a,n,r,s,l,o,h,d,c,u,p,f,y,w,m){var g=i.createSubclass([l,r,p],{declaredClass:"esri.views.View",properties:{allLayerViews:{readOnly:!0},basemapView:{},animation:{},resizing:{},interacting:{},graphics:{type:a.ofType(t)},groundView:{},defaultsFromMap:m,initialExtent:{readOnly:!0,type:u,dependsOn:["defaultsFromMap.extent"]},initialExtentRequired:{},layerViews:{type:a},map:{},ready:{readOnly:!0,dependsOn:["map","spatialReference","width","height","initialExtentRequired","initialExtent","defaultsFromMap.isDone","map.loaded"]},size:{readOnly:!0,dependsOn:["width","height"],get:function(){return[this.width,this.height]}},spatialReference:{type:c,dependsOn:["defaultsFromMap.spatialReference"]},stationary:{dependsOn:["animation","interacting","resizing"]},type:{},updating:{},padding:{},width:{},height:{}},constructor:function(e){this._viewHandles=new s,this._viewHandles.add(this.watch("ready",function(e,t){e?this._currentSpatialReference=this.spatialReference:this._currentSpatialReference=null,this.notifyChange("spatialReference"),!e&&t&&this.layerViewManager.empty()}.bind(this))),this.allLayerViews=new n({root:this,rootCollectionNames:["basemapView.baseLayerViews","groundView.layerViews","layerViews","basemapView.referenceLayerViews"],getChildrenFunction:function(e){return e.layerViews}}),this.defaultsFromMap=new m({view:this})},getDefaults:function(){return e.mixin(this.inherited(arguments),{layerViews:[],graphics:[],padding:{left:0,top:0,right:0,bottom:0}})},initialize:function(){var e=this.validate().then(function(){return this._isValid=!0,this.notifyChange("ready"),o.whenOnce(this,"ready")}.bind(this));this.addResolvingPromise(e),this.basemapView=new y({view:this}),this.groundView=new w({view:this}),this.layerViewManager=new f({view:this}),this._resetInitialViewPropertiesFromContent()},destroy:function(){this.basemapView.destroy(),this.groundView.destroy(),this.destroyLayerViews(),this.defaultsFromMap.destroy(),this.defaultsFromMap=null,this._viewHandles.destroy(),this.map=null},destroyLayerViews:function(){this.layerViewManager.destroy()},_viewHandles:null,_isValid:!1,_readyCycleForced:!1,_userSpatialReference:null,_currentSpatialReference:null,animation:null,basemapView:null,groundView:null,graphics:null,_graphicsSetter:function(e){this._graphicsView&&(this._graphicsView.graphics=e),this._set("graphics",e)},interacting:!1,layerViews:null,map:null,_mapSetter:function(e){var t=this._get("map");e!==t&&(e&&e.load&&e.load(),this._forceReadyCycle(),this._resetInitialViewPropertiesFromContent(),this._set("map",e))},padding:null,_readyGetter:function(){return!(!this._isValid||this._readyCycleForced||!this.map||0===this.width||0===this.height||!this.spatialReference||this.map.load&&!this.map.loaded||!(this._currentSpatialReference||!this.initialExtentRequired||this.initialExtent||this.defaultsFromMap&&this.defaultsFromMap.isDone)||!this.isSpatialReferenceSupported(this.spatialReference))},spatialReference:null,_spatialReferenceGetter:function(){return this._userSpatialReference||this._currentSpatialReference||this.getDefaultSpatialReference()||null},_spatialReferenceSetter:function(e){this._userSpatialReference=e,this._set("spatialReference",e)},stationary:!0,_stationaryGetter:function(){return!this.animation&&!this.interacting&&!this.resizing},type:null,updating:!1,initialExtentRequired:!0,initialExtent:null,_initialExtentGetter:function(){return this.defaultsFromMap&&this.defaultsFromMap.extent},whenLayerView:function(e){return this.layerViewManager.whenLayerView(e)},getDefaultSpatialReference:function(){return this.get("defaultsFromMap.spatialReference")},validate:function(){return h.resolve()},isSpatialReferenceSupported:function(){return!0},_resetInitialViewPropertiesFromContent:function(){if(this.defaultsFromMap){var e=this.defaultsFromMap.start.bind(this.defaultsFromMap);this.defaultsFromMap.reset(),this._currentSpatialReference=null,this.notifyChange("spatialReference"),this._viewHandles.remove("defaultsFromMap"),this._viewHandles.add([o.watch(this,"spatialReference",e),o.watch(this,"initialExtentRequired",e),d.schedule(e)],"defaultsFromMap")}},_forceReadyCycle:function(){this.ready&&(this._readyCycleForced=!0,this.notifyChange("ready"),o.whenFalseOnce(this,"ready",function(){this._readyCycleForced=!1,this.notifyChange("ready")}.bind(this)))}});return g});