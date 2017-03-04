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

define(["./Widgette","./RendererSlider","./RendererSlider/sliderUtils","../Color","../core/numberUtils","dijit/_TemplatedMixin","dojo/_base/array","dojo/_base/lang","dojo/dom-style","dojox/gfx","dojo/text!./OpacitySlider/templates/OpacitySlider.html"],function(t,i,s,e,a,o,h,l,r,n,u){var m=t.createSubclass([o],{_rampNode:null,_sliderHeight:null,_updateTimer:null,_forceMinValue:null,_forceMaxValue:null,_css:null,declaredClass:"esri.widgets.OpacitySlider",templateString:u,properties:{opacityInfo:null,minValue:null,maxValue:null,histogram:null,statistics:null,zoomOptions:null,handles:[0,1],showLabels:!0,showTicks:!0,showHandles:!0,showHistogram:!0,showStatistics:!0,showTransparentBackground:!0,histogramWidth:100,rampWidth:26},constructor:function(t){void 0!==t.minValue&&this.set("_forceMinValue",t.minValue),void 0!==t.maxValue&&this.set("_forceMaxValue",t.maxValue),this._css={container:"esri-opacity-slider",rampSurface:"esri-slider-ramp-surface"}},postCreate:function(){this.inherited(arguments),this._setupDataDefaults()},startup:function(){this.inherited(arguments),this._slider=new i({type:"OpacitySlider",values:this.values,isDate:this.isDate,minimum:this.zoomOptions?this.zoomOptions.minSliderValue:this.minValue,maximum:this.zoomOptions?this.zoomOptions.maxSliderValue:this.maxValue,_minZoomLabel:this.zoomOptions?this.minValue:null,_maxZoomLabel:this.zoomOptions?this.maxValue:null,_isZoomed:this.zoomOptions?!0:!1,showLabels:this.showLabels,showTicks:this.showTicks,showHandles:this.showHandles},this._sliderNode),this._slider.startup(),this._rampNode=this._slider._sliderAreaRight,this._sliderHeight=r.get(this._rampNode,"height")||155,this._valuesAutoAdjust(),this._createSVGSurfaces(),this.own(this._slider.on("slide",l.hitch(this,function(t){this._valuesAutoAdjust(),this._fillRamp()})),this._slider.on("data-change",l.hitch(this,function(t){this.set("values",t.values),this._updateOpacityInfo(t.values),this._valuesAutoAdjust(),this._fillRamp(),this.emit("data-change",{minValue:this.minValue,maxValue:this.maxValue,opacityInfo:l.clone(this.opacityInfo)})})),this._slider.on("handle-value-change",l.hitch(this,function(t){this.set("values",t.values),this._updateOpacityInfo(t.values),this._valuesAutoAdjust(),this._fillRamp(),this.emit("handle-value-change",{minValue:this.minValue,maxValue:this.maxValue,opacityInfo:l.clone(this.opacityInfo)})})),this._slider.on("data-value-change",l.hitch(this,function(t){this.set({minValue:t.min,maxValue:t.max}),this._updateRendererSlider(),this.emit("data-value-change",{minValue:t.min,maxValue:t.max,opacityInfo:l.clone(this.opacityInfo)})})),this._slider.on("stop",l.hitch(this,function(t){this.emit("handle-value-change",{minValue:this.minValue,maxValue:this.maxValue,opacityInfo:l.clone(this.opacityInfo)})})),this._slider.on("zoom-out",l.hitch(this,function(t){this.set("zoomOptions",null)}))),this.statistics&&this.showStatistics&&this._generateStatistics(),this.showHistogram&&(this.histogram||this.zoomOptions&&this.zoomOptions.histogram)&&this._generateHistogram(),this.watch("opacityInfo, minValue, maxValue, statistics, histogram, zoomOptions, showHandles, showLabels, showTicks",this._updateTimeout),this.watch("zoomOptions",this._zoomEventHandler),this.watch("showHistogram",this._toggleHistogram),this.watch("showTransparentBackground",this._toggleTransparentBackground),this.set("loaded",!0),this.emit("load")},destroy:function(){this.inherited(arguments),this._slider&&this._slider.destroy(),this._avgHandleObjs&&this._avgHandleObjs.avgHandleTooltip&&this._avgHandleObjs.avgHandleTooltip.destroy(),this.countTooltips&&h.forEach(this.countTooltips,function(t){t.destroy()})},_updateOpacityInfo:function(t){h.forEach(this.opacityInfo.stops,l.hitch(this,function(i,s){i.value=t[s].value,i.opacity=t[s].opacity}))},_valuesAutoAdjust:function(){var t,i,s,e,a,o,l,r=this._slider.values,n=[];for(h.some(r,function(t,i){t.hidden||n.push(i)}),o=0;o<n.length-1;o++)for(t=n[o],i=n[o+1],s=i-t,e=r[t].value,a=r[i].value,l=t+1;i>l;l++)r[l].value=e*(i-l)/s+a*(l-t)/s},_getHandleInfo:function(t){return h.map(t,function(i,s){return{color:new e([0,121,193,i.opacity]),value:t[s].value,opacity:t[s].opacity}})},_updateTimeout:function(t){this._updateRendererSlider()},_updateRendererSlider:function(t){null!==this.zoomOptions&&this.zoomOptions!==!1?(this.toggleSliderBottom=this.zoomOptions.minSliderValue>this.minValue,this.toggleSliderTop=this.zoomOptions.maxSliderValue<this.maxValue,this._slider.set({minimum:this.zoomOptions.minSliderValue,maximum:this.zoomOptions.maxSliderValue,_minZoomLabel:this.minValue,_maxZoomLabel:this.maxValue,_isZoomed:!0})):this._slider.set({minimum:this.minValue,maximum:this.maxValue,_minZoomLabel:null,_maxZoomLabel:null,_isZoomed:!1}),this.set("values",this._getHandleInfo(this.opacityInfo.stops)),this._slider.set("values",this.values),this._slider._reset(),this._slider._updateRoundedLabels(),this._slider._generateMoveables(),this._clearRect(),this._createSVGSurfaces(),this.statistics&&this.showStatistics&&this._generateStatistics(),this.showHistogram&&(this.histogram||this.zoomOptions&&this.zoomOptions.histogram)&&this._generateHistogram()},_zoomEventHandler:function(){this.emit("zoomed",!!this.zoomOptions)},_setupDataDefaults:function(){this.statistics?this.set({minValue:this.statistics.min,maxValue:this.statistics.max}):this.set({minValue:0,maxValue:100}),null!==this._forceMinValue&&this.set("minValue",this._forceMinValue),null!==this._forceMaxValue&&this.set("maxValue",this._forceMaxValue),null!==this.zoomOptions&&(this.toggleSliderBottom=this.zoomOptions.minSliderValue>this.minValue,this.toggleSliderTop=this.zoomOptions.maxSliderValue<this.maxValue),this.minValue===this.maxValue&&(0===this.minValue?this.set("maxValue",100):null===this.minValue?this.set({minValue:0,maxValue:100}):this.set({minValue:0,maxValue:2*this.minValue})),null===this.minValue&&this.set("minValue",0),null===this.maxValue&&this.set("maxValue",100),this.set("values",this._getHandleInfo(l.clone(this.opacityInfo.stops)))},_createSVGSurfaces:function(){this._colorRampSurface=n.createSurface(this._rampNode,this.rampWidth-2,this._sliderHeight-2),this._colorRampSurface.rawNode.setAttribute("class",this._css.rampSurface),this._surfaceRect=this._colorRampSurface.createRect({width:this.rampWidth,height:this._sliderHeight}),this._transparentBackgroundNode=s.generateTransparentBackground(this._colorRampSurface,this.rampWidth-2,this._sliderHeight-2,this.showTransparentBackground),this._histogramSurface=s.generateHistogramSurface(this._rampNode,this.histogramWidth,this._sliderHeight,this.rampWidth),this._fillRamp(),null!==this.zoomOptions&&(this.toggleSliderBottom&&this.toggleSliderTop?(this._colorRampSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({color:"#fff",width:3}).setTransform(n.matrix.translate(0,5)),this._colorRampSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({color:"#fff",width:3}).setTransform(n.matrix.translate(0,195))):this.toggleSliderBottom?this._colorRampSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({color:"#fff",width:3}).setTransform(n.matrix.translate(0,195)):this.toggleSliderTop&&this._colorRampSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({color:"#fff",width:3}).setTransform(n.matrix.translate(0,5)))},_fillRamp:function(){var t=this._slider.values,i=this._slider.minimum,s=this._slider.maximum,e=t.slice(0);h.forEach(e,function(t){t.offset=(s-t.value)/(s-i)}),e.reverse(),null!==this.zoomOptions?this.toggleSliderBottom&&this.toggleSliderTop?this._surfaceRect.setFill({type:"linear",x1:0,y1:10,x2:0,y2:this._sliderHeight-10,colors:e}):this.toggleSliderBottom?this._surfaceRect.setFill({type:"linear",x1:0,y1:0,x2:0,y2:this._sliderHeight-20,colors:e}):this.toggleSliderTop&&this._surfaceRect.setFill({type:"linear",x1:0,y1:20,x2:0,y2:this._sliderHeight,colors:e}):this._surfaceRect.setFill({type:"linear",x1:0,y1:0,x2:0,y2:this._sliderHeight,colors:e})},_toggleTransparentBackground:function(){this.showTransparentBackground?this._transparentBackgroundNode.setFill(s.getTransparentFill()):this._transparentBackgroundNode.setFill(null)},_clearRect:function(){this._colorRampSurface.destroy(),this._histogramSurface.destroy()},_showHistogram:function(){this.histogram||this.zoomOptions&&this.zoomOptions.histogram?this._generateHistogram():this._barsGroup&&(this._barsGroup.destroy(),this._barsGroup=null)},_toggleHistogram:function(){this.showHistogram?(r.set(this._barsGroup.rawNode,"display","inline-block"),this._showHistogram()):r.set(this._barsGroup.rawNode,"display","none")},_generateHistogram:function(){var t=this.zoomOptions&&this.zoomOptions.histogram?this.zoomOptions.histogram:this.histogram;this._barsGroup=s.generateHistogram(this._histogramSurface,t,this.histogramWidth,this.rampWidth,this.isLeftToRight()),this.countTooltips=s.generateCountTooltips(t,this._barsGroup)},_generateStatistics:function(){if(!(this.statistics.count<2||isNaN(this.statistics.avg))){var t,i,e,o=this.statistics,h=this._slider,l=this.zoomOptions||null,r=s.getPrecision(this.maxValue),n=o.avg;o.min===o.max&&o.min===o.avg?(i=0,e=2*o.avg):(i=o.min,e=o.max),(i!==h.minimum||e!==h.maximum)&&(i=h.minimum,e=h.maximum),l&&(i=l.minSliderValue,e=l.maxSliderValue),n=a.round([o.avg,e,i])[0],t=this._sliderHeight*(e-o.avg)/(e-i),this._avgHandleObjs=s.generateAvgLine(this._histogramSurface,n,t,r,this.isDate,this.isLeftToRight())}}});return m});