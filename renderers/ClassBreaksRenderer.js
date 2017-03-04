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

define(["../core/declare","../core/lang","../core/kebabDictionary","../core/Error","dojo/_base/array","dojo/_base/lang","../symbols/support/jsonUtils","./Renderer","./support/arcadeUtils"],function(e,s,a,i,n,l,t,o,r){var u="log",c="percent-of-total",d="field",f=a({esriNormalizeByLog:u,esriNormalizeByPercentOfTotal:c,esriNormalizeByField:d}),m=a({esriClassifyNaturalBreaks:"natural-breaks",esriClassifyEqualInterval:"equal-interval",esriClassifyQuantile:"quantile",esriClassifyStandardDeviation:"standard-deviation",esriClassifyGeometricalInterval:"geometrical-interval"}),h=e(o,{declaredClass:"esri.renderers.ClassBreaksRenderer",properties:{backgroundFillSymbol:{value:null,json:{read:t.read,write:function(e,s,a,i){var n=t.write(e,{},i);n&&(s.backgroundFillSymbol=n)}}},classBreakInfos:{set:function(e){this._symbols={},e&&e.forEach(this._processCBInfo,this),this._set("classBreakInfos",e)},json:{read:{source:["classBreakInfos","minValue"],reader:function(e,a,i){var n=a.minValue;if(e&&Array.isArray(e)){var l=e[0]&&null!=e[0].classMaxValue;return e.map(function(e){if(e=s.clone(e),l){var o=e.classMaxValue;e.minValue=n,e.maxValue=o,n=o}return e.symbol=t.read(e.symbol,a,i),e})}return e}},write:function(e,a,i,l){var o=this.classBreakInfos||[],r=o[0]&&o[0].minValue;a.minValue=r===-(1/0)?-Number.MAX_VALUE:r,a.classBreakInfos=n.map(o,function(e){return e=s.clone(e),e.symbol&&(e.symbol=t.write(e.symbol,{},l)),e.classMaxValue=e.maxValue===1/0?Number.MAX_VALUE:e.maxValue,delete e.minValue,delete e.maxValue,s.fixJson(e)})}}},classificationMethod:{value:null,json:{read:m.fromJSON,write:function(e,s){var a=m.toJSON(e);a&&(s.classificationMethod=a)}}},defaultLabel:{value:null,json:{write:!0}},defaultSymbol:{value:null,json:{read:t.read,write:function(e,s,a,i){var n=t.write(e,{},i);n&&(s.defaultSymbol=n)}}},valueExpression:{value:null,json:{write:function(e,s,a,n){n&&"web-scene"===n.origin?e&&n.messages&&n.messages.push(new i("property:unsupported",this.declaredClass+".valueExpression is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:"valueExpression",context:n})):s.valueExpression=e}}},valueExpressionTitle:{value:null,json:{write:function(e,s,a,n){n&&"web-scene"===n.origin?e&&n.messages&&n.messages.push(new i("property:unsupported",this.declaredClass+".valueExpressionTitle is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:"valueExpressionTitle",context:n})):s.valueExpressionTitle=e}}},compiledFunc:{dependsOn:["valueExpression"],get:function(){return r.createFunction(this.valueExpression)}},legendOptions:{value:null,json:{read:function(e){return s.clone(e)},write:function(e,a,n,l){l&&"web-scene"===l.origin?e&&l.messages&&l.messages.push(new i("property:unsupported",this.declaredClass+".legendOptions is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:"legendOptions",context:l})):a.legendOptions=s.clone(e)}}},field:{value:null,json:{write:!0}},isMaxInclusive:!0,normalizationField:{value:null,json:{write:!0}},normalizationTotal:{value:null,json:{write:!0}},normalizationType:{value:null,dependsOn:["normalizationField","normalizationTotal"],get:function(){var e=this._get("normalizationType"),s=!!this.normalizationField,a=null!=this.normalizationTotal;return s||a?(e=s&&d||a&&c,s&&a&&console.warn("warning: both normalizationField and normalizationTotal are set!")):(e===d||e===c)&&(e=null),e},json:{read:f.fromJSON,write:function(e,s){var a=f.toJSON(e);a&&(s.normalizationType=a)}}},requiredFields:{dependsOn:["field","normalizationField"]},type:"classBreaks"},constructor:function(){this._symbols={},this.classBreakInfos=[]},addClassBreakInfo:function(e,s,a){var i=l.isObject(e)?e:{minValue:e,maxValue:s,symbol:a};this.classBreakInfos.push(i),this._processCBInfo(i)},removeClassBreakInfo:function(e,s){var a,i,n=this.classBreakInfos.length,l=this._symbols;for(i=0;n>i;i++)if(a=[this.classBreakInfos[i].minValue,this.classBreakInfos[i].maxValue],a[0]==e&&a[1]==s){delete l[e+"-"+s],this.classBreakInfos.splice(i,1);break}},getBreakIndex:function(e,s){var a,i,n,t=this.field,o=e.attributes,f=this.classBreakInfos.length,m=this.isMaxInclusive;if(this.valueExpression)a=r.executeFunction(this.compiledFunc,r.createExecContext(e,r.getView(s)));else if(l.isFunction(t))a=t(e);else{a=parseFloat(o[t]);var h,p,v=this.normalizationType;if(v)if(h=parseFloat(this.normalizationTotal),p=parseFloat(o[this.normalizationField]),v===u)a=Math.log(a)*Math.LOG10E;else if(v!==c||isNaN(h)){if(v===d&&!isNaN(p)){if(isNaN(a)||isNaN(p))return-1;a/=p}}else a=a/h*100}if(null!=a&&!isNaN(a)&&"number"==typeof a)for(i=0;f>i;i++)if(n=[this.classBreakInfos[i].minValue,this.classBreakInfos[i].maxValue],n[0]<=a&&(m?a<=n[1]:a<n[1]))return i;return-1},getClassBreakInfo:function(e,s){var a=this.getBreakIndex(e,s);return-1!==a?this.classBreakInfos[a]:null},getSymbol:function(e,s){var a=this.getBreakIndex(e,s),i=a>-1&&[this.classBreakInfos[a].minValue,this.classBreakInfos[a].maxValue];return i?this._symbols[i[0]+"-"+i[1]]:this.defaultSymbol},clone:function(){return new h({field:this.field,backgroundFillSymbol:this.backgroundFillSymbol&&this.backgroundFillSymbol.clone(),classificationMethod:this.classificationMethod,defaultLabel:this.defaultLabel,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.clone(),valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,classBreakInfos:s.clone(this.classBreakInfos),isMaxInclusive:this.isMaxInclusive,normalizationField:this.normalizationField,normalizationTotal:this.normalizationTotal,normalizationType:this.normalizationType,visualVariables:s.clone(this.visualVariables),legendOptions:s.clone(this.legendOptions),authoringInfo:s.clone(this.authoringInfo)})},collectRequiredFields:function(e){this.inherited(arguments),[this.field,this.normalizationField].forEach(function(s){s&&(e[s]=!0)})},_processCBInfo:function(e){var s=e.minValue,a=e.maxValue,i=e.symbol;i&&(i.declaredClass||(e.symbol=t.fromJSON(i))),this._symbols[s+"-"+a]=e.symbol}});return h});