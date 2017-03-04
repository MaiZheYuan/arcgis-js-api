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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/accessorSupport/decorators","./support/widget","./Widget","./Zoom/IconButton","./Zoom/ZoomViewModel","dojo/i18n!./Zoom/nls/Zoom"],function(o,t,e,n,i,r,s,a,l,u){var c={base:"esri-zoom esri-widget",horizontalLayout:"esri-zoom--horizontal",zoomInIcon:"esri-icon-plus",zoomOutIcon:"esri-icon-minus"},d=function(o){function t(t){var e=o.call(this)||this;return e.layout="vertical",e.view=null,e.viewModel=new l,e}return e(t,o),t.prototype.postInitialize=function(){this._zoomInButton=new a({action:this.zoomIn.bind(this),iconClass:c.zoomInIcon,title:u.zoomIn}),this._zoomOutButton=new a({action:this.zoomOut.bind(this),iconClass:c.zoomOutIcon,title:u.zoomOut})},t.prototype.render=function(){var o=this.viewModel,t=(e={},e[c.horizontalLayout]="horizontal"===this.layout,e);return this._zoomInButton.enabled="ready"===o.state&&o.canZoomIn,this._zoomOutButton.enabled="ready"===o.state&&o.canZoomOut,r.jsxFactory.createElement("div",{"class":c.base,classes:t},this._zoomInButton.render(),this._zoomOutButton.render());var e},t.prototype.zoomIn=function(){},t.prototype.zoomOut=function(){},t}(i.declared(s));return n([i.property(),r.renderable()],d.prototype,"layout",void 0),n([i.aliasOf("viewModel.view"),r.renderable()],d.prototype,"view",void 0),n([i.property({type:l}),r.renderable(["viewModel.canZoomIn","viewModel.canZoomOut","viewModel.state"])],d.prototype,"viewModel",void 0),n([i.aliasOf("viewModel.zoomIn")],d.prototype,"zoomIn",null),n([i.aliasOf("viewModel.zoomOut")],d.prototype,"zoomOut",null),d=n([i.subclass("esri.widgets.Zoom")],d)});