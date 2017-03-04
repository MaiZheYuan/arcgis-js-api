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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/promise/all","../core/accessorSupport/decorators","../core/HandleRegistry","../core/watchUtils","../core/promiseUtils","./MapViewBase","./DOMContainer","../geometry/ScreenPoint","./ui/2d/DefaultUI2D","./2d/engine/Stage","./2d/layers/support/GraphicsView2D","./input/ViewEvents","./input/InputManager","./input/BrowserEventSource","./input/handlers/PreventContextMenu","./2d/navigation/MapViewNavigation","./ui/ZoomBox","./support/screenshotUtils"],function(t,e,i,n,s,r,a,o,h,u,p,c,l,g,d,v,w,y,_,f,m,M){var V=function(t){function e(e){var i=t.call(this,e)||this;return i._graphicsView=null,i._mapViewHandles=new a,i._viewEvents=null,i.inputManager=null,i.watch("stationary",function(t){i.stage&&(i.stage.stationary=t)},!0),i.watch("state.viewpoint",function(t){i.stage&&(i.stage.state=i.state)},!0),i.watch("ready",function(t){t?i._setupStage():i._destroyStage()}),o.whenFalse(i,"ready",function(){i.stage&&i.stage.removeAllChildren()}),i}return i(e,t),Object.defineProperty(e.prototype,"interacting",{get:function(){return this.navigation&&this.navigation.interacting||this.zoomBox&&this.zoomBox.interacting||!1},enumerable:!0,configurable:!0}),e.prototype.hitTest=function(t,e){if(!this.ready)return null;var i;i=null!=t&&t.x?t:new c({x:t,y:e});var n=this.toMap(i),r=[this._graphicsView];return r.push.apply(r,this.allLayerViews.toArray().reverse()),s(r.map(function(t){return t&&t.hitTest?t.hitTest(i.x,i.y):null})).then(function(t){return{screenPoint:i,results:t.filter(function(t){return null!=t}).map(function(t){return{mapPoint:n,graphic:t}})}})},e.prototype.takeScreenshot=function(t){return this.ready?(t=M.adjustScreenshotSettings(t,this),this.stage.takeScreenshot(t)):h.reject("Map view cannot be used before it is ready")},e.prototype.on=function(t,e,i){this._viewEvents||(this._viewEvents=new v.ViewEvents(this));var n=this._viewEvents.register(t,e,i);return n?n:this.inherited(arguments)},e.prototype._disconnect=function(){this.zoomBox.destroy(),this._set("zoomBox",null),this.navigation=null,this.inputManager=null,this._source&&(this._source.destroy(),this._source=null),this._viewEvents&&(this._viewEvents.disconnect(),this._viewEvents=null)},e.prototype._connect=function(){this._viewEvents||(this._viewEvents=new v.ViewEvents(this)),this._source||(this._source=new y.BrowserEventSource(this.surface)),this.inputManager||(this.inputManager=new w.InputManager(this._source),this.inputManager.installHandlers("prevent-context-menu",[new _.PreventContextMenu])),this.navigation||(this.navigation=new f({view:this,animationManager:this.animationManager,inputManager:this.inputManager})),this._get("zoomBox")||this._set("zoomBox",new m({view:this,inputManager:this.inputManager})),this._viewEvents.inputManager||this._viewEvents.connect(this.inputManager)},e.prototype._setupStage=function(){var t=this;this.stage||(this.stage=new g(this._get("surface")),this.stage.state=this.state,this._graphicsView=new d({view:this,graphics:this.graphics}),this.stage.addChild(this._graphicsView.container),this._updateStageChildren(),this._mapViewHandles.add(this.allLayerViews.on("change",function(){return t._updateStageChildren()}),"allLayerViews"),this._mapViewHandles.add([o.whenNot(this,"ready",function(){return t._disconnect()}),o.when(this,"ready",function(){return t._connect()})],"inputHandlers"))},e.prototype._destroyStage=function(){this.stage||(this._graphicsView.destroy(),this._graphicsView=null,this._mapViewHandles.remove("allLayerViews"),this._mapViewHandles.remove("inputHandlers"),this._disconnect(),this.stage.removeAllChildren(),this.stage.destroy(),this.stage=null)},e.prototype._updateStageChildren=function(){var t=this;this.stage.removeAllChildren(),this.allLayerViews.filter(function(t){return null!=t.container}).forEach(function(e,i){t.stage.addChildAt(e.container,i)}),this.stage.addChild(this._graphicsView.container)},e}(r.declared(u,p));return n([r.property()],V.prototype,"inputManager",void 0),n([r.property()],V.prototype,"navigation",void 0),n([r.property({dependsOn:["navigation.interacting","zoomBox.interacting"],type:Boolean})],V.prototype,"interacting",null),n([r.property({type:l})],V.prototype,"ui",void 0),n([r.property({type:m,readOnly:!0})],V.prototype,"zoomBox",void 0),V=n([r.subclass("esri.views.MapView")],V)});