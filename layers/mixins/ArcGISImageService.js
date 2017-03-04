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

//  copyright

/**
       * The copyright text as defined by the image service.
       *
       * @type {string}
       */

// We expose "copyrightText" as "copyright" in the SDK.

define(["dojo/_base/lang","dojo/Deferred","./ArcGISService","../support/Field","../support/Raster","../support/PixelBlock","../support/MosaicRule","../support/RasterFunction","../support/DimensionalDefinition","../../geometry/Extent","../../geometry/Point","../../geometry/SpatialReference","../../tasks/QueryTask","../../tasks/ImageServiceIdentifyTask","../../tasks/support/ImageServiceIdentifyParameters","../../request","../../Graphic","../../PopupTemplate","../../core/lang","../../core/Accessor","../../core/kebabDictionary","../../core/promiseUtils"],function(e,t,i,r,a,n,s,l,o,u,c,d,p,f,h,m,v,b,y,g,x,R){var D=x({S8:"s8",S16:"s16",S32:"s32",U8:"u8",U16:"u16",U32:"u32",F32:"f32",F64:"f64"}),I=g.createSubclass({properties:{layer:{},mosaicRule:{get:function(){var e=this.layer,t=e.mosaicRule||null;return t}},version:{value:0,dependsOn:["layer.bandIds","layer.format","layer.compressionQuality","layer.compressionTolerance","layer.interpolation","layer.noData","layer.noDataInterpretation","layer.mosaicRule","layer.renderingRule","layer.adjustAspectRatio"],get:function(){return this._get("version")+1}}},toJSON:function(){var e=this.layer;return{bandIds:e.bandIds?e.bandIds.join(","):null,format:e.format,compressionQuality:e.compressionQuality,compressionTolerance:e.compressionTolerance,interpolation:e.interpolation,noData:e.noData,noDataInterpretation:e.noDataInterpretation,mosaicRule:this.mosaicRule?JSON.stringify(this.mosaicRule.toJSON()):null,renderingRule:e.renderingRule?JSON.stringify(e.renderingRule.toJSON()):null,adjustAspectRatio:e.adjustAspectRatio}}}),T=i.createSubclass({declaredClass:"esri.layers.mixins.ArcGISImageService",getDefaults:function(){return e.mixin(this.inherited(arguments),{exportImageServiceParameters:{layer:this}})},_raster:null,properties:{adjustAspectRatio:{},bandCount:{},bandIds:{},capabilities:{json:{read:function(e){return e&&e.split(",").map(function(e){return e.trim()})}}},compressionQuality:{},compressionTolerance:.01,copyright:{json:{read:{source:["copyrightText"],reader:function(e,t){return t.copyrightText}}}},definitionExpression:{get:function(){return this.mosaicRule?this.mosaicRule.where:null},set:function(e){var t=this.mosaicRule||new s;t.where=e,this._set("mosaicRule",t)},json:{read:{source:["definitionExpression","layerDefinition.definitionExpression"],reader:function(e,t){return e||t.layerDefinition&&t.layerDefinition.definitionExpression||void 0}}}},domainFields:{value:null,type:[r],dependsOn:["fields"],get:function(){return this.fields&&this.fields.filter(function(e){return null!=e.domain})||[]}},exportImageServiceParameters:{readOnly:!0,type:I},fields:{type:[r]},fullExtent:{type:u,json:{read:{source:["extent"],reader:function(e,t){return u.fromJSON(t.extent)}}}},format:"lerc",hasRasterAttributeTable:{},hasMultidimensions:{},interpolation:{},mosaicRule:{value:null,json:{read:{source:["defaultMosaicMethod"],reader:function(e,t){return s.fromJSON(t.mosaicRule||t)}}}},multidimensionalInfo:null,noData:{},noDataInterpretation:{},objectIdField:{json:{read:{source:["fields"],reader:function(e,t){return!e&&t.fields&&t.fields.some(function(t){return"esriFieldTypeOID"===t.type&&(e=t.name),!!e}),e}}}},pixelType:{value:null,json:{read:D.fromJSON}},popupTemplate:{value:null,type:b,json:{read:{source:["popupInfo"],reader:function(e,t){return t.popupInfo?b.fromJSON(t.popupInfo):null}}}},queryTask:{readOnly:!0,dependsOn:["url"],get:function(){return new p({url:this.url})}},rasterAttributeTable:null,rasterAttributeTableFieldPrefix:"Raster.",rasterFields:{value:null,dependsOn:["fields","rasterAttributeTable","rasterAttributeTableFieldPrefix"],get:function(){var e=this.rasterAttributeTableFieldPrefix,t={name:"Raster.ItemPixelValue",alias:"Item Pixel Value",domain:null,editable:!1,length:50,type:"string"},i={name:"Raster.ServicePixelValue",alias:"Service Pixel Value",domain:null,editable:!1,length:50,type:"string"},r=this.fields?y.clone(this.fields):[],a=r.length;if(r[a]=i,(this.capabilities&&this.capabilities.indexOf("Catalog")>-1||this.fields&&this.fields.length>0)&&(r[a+1]=t),y.isDefined(this.pixelFilter)&&("esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType)){var n={name:"Raster.Magnitude",alias:"Magnitude",domain:null,editable:!1,type:"double"},s={name:"Raster.Direction",alias:"Direction",domain:null,editable:!1,type:"double"};r[a+2]=n,r[a+3]=s}var l=this.rasterAttributeTable&&this.rasterAttributeTable.fields||null;if(l&&l.length>0){var o=l.filter(function(e){return"esriFieldTypeOID"!==e.type&&"value"!==e.name.toLowerCase()}),u=o.map(function(t){var i=y.clone(t);return i.name=e+t.name,i});r=r.concat(u)}return r}},renderingRule:{json:{read:{source:["rasterFunctionInfos"],reader:function(e,t){return l.fromJSON(t.renderingRule||{rasterFunctionInfos:t.rasterFunctionInfos})}}}},serviceDataType:{},spatialReference:{value:null,readOnly:!0,json:{read:{source:["extent"],reader:function(e,t){return e=t.extent&&t.extent.spatialReference,e&&d.fromJSON(e)}}}},url:{},version:{value:null,readOnly:!0,json:{read:{source:["currentVersion","fields","timeInfo"],reader:function(e,t){return e=t.currentVersion,e||(e=t.hasOwnProperty("fields")||t.hasOwnProperty("objectIdField")||t.hasOwnProperty("timeInfo")?10:9.3),e}}}}},fetchKeyProperties:function(){return m(this.parsedUrl.path+"/keyProperties",{query:e.mixin({f:"json"}),responseType:"json",callbackParamName:"callback"}).then(function(e){return e.data})},getExportImageServiceParameters:function(t){var i=t.extent.clone().shiftCentralMeridian(),r=t.width,a=t.height,n=i&&i.spatialReference;return n=n&&(n.wkid||JSON.stringify(n.toJSON())),e.mixin({bbox:i&&i.xmin+","+i.ymin+","+i.xmax+","+i.ymax,bboxSR:n,imageSR:n,size:r+","+a},this.exportImageServiceParameters.toJSON())},queryRasters:function(e){return this.queryTask.execute(e)},queryVisibleRasters:function(e,i){this._visibleRasters=[];var r=!1,a=this.popupTemplate;a&&a.fieldInfos&&a.fieldInfos.length>0&&(r=a.fieldInfos.length>1||"raster.servicepixelvalue"!==a.fieldInfos[0].toLowerCase()),!r&&this.rasterFields&&(r=this.rasterFields.some(function(e){var t=e&&e.name?e.name.toLowerCase():null;return t&&"raster.servicepixelvalue"!==t&&(a.title&&a.title.toLowerCase().indexOf(t)>-1||a.content&&a.content.toLowerCase().indexOf(t)>-1)}));var n=i.layerView,s=n&&n.view&&n.view.state||null,l=s&&.5*s.resolution,o=new h({geometry:e.geometry,returnCatalogItems:r,timeExtent:e.timeExtent,mosaicRule:this.mosaicRule||null,renderingRule:this.renderingRule||null,returnGeometry:s&&s.spatialReference.equals(this.spatialReference),outSpatialReference:s&&s.spatialReference.clone(),pixelSize:l&&new c(l,l,s.spatialReference)}),u=new t,d=new f({url:this.url});return d.execute(o).then(function(e){u.resolve(this._processVisibleRastersResponse(e,i))}.bind(this),function(e){throw new Error("Error querying for visible rasters")}),u},_isScientificData:function(){return"esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType||"esriImageServiceDataTypeScientific"===this.serviceDataType},_fetchService:function(){return R.resolve().then(function(){return this.resourceInfo||m(this.parsedUrl.path,{query:e.mixin({f:"json"},this.parsedUrl.query),responseType:"json",callbackParamName:"callback"})}.bind(this)).then(function(e){e.ssl&&(this.url=this.url.replace(/^http:/i,"https:")),this.read(e.data,{origin:"service",url:this.parsedUrl}),this._raster=new a({url:this.url})}.bind(this)).then(function(){return this.version>10&&this.hasRasterAttributeTable?m(this.parsedUrl.path+"/rasterAttributeTable",{query:{f:"json"},responseType:"json"}).then(function(e){var t=e.data;t&&t.features&&t.fields&&this.read({rasterAttributeTable:t},{origin:"service",url:this.parsedUrl})}.bind(this)):void 0}.bind(this)).then(function(){return this.version>=10.3&&this._isScientificData()&&this.hasMultidimensions?m(this.parsedUrl.path+"/multiDimensionalInfo",{query:{f:"json"},responseType:"json"}).then(function(e){var t=e.data;t&&t.multidimensionalInfo&&(this._updateMultidimensionalDefinition(t.multidimensionalInfo),this.multidimensionalInfo=t.multidimensionalInfo)}.bind(this)):void 0}.bind(this))},_updateMultidimensionalDefinition:function(e){var t,i="",r=e.variables[0].dimensions,a=[];for(t in r)if(r.hasOwnProperty(t)){var n=r[t],l=!0,u=n.extent,c=[u[0]];n.hasRanges&&n.hasRanges===!0?(l=!1,c=[n.values[0]]):"stdz"===n.name.toLowerCase()&&Math.abs(u[1])<=Math.abs(u[0])&&(c=[u[1]]),a.push(new o({variableName:i,dimensionName:r[t].name,isSlice:l,values:c}))}if(a.length>0){this.mosaicRule=this.mosaicRule||new s;var d=this.mosaicRule.multidimensionalDefinition;(!d||d&&d.length<=0)&&(this.mosaicRule.multidimensionalDefinition=a)}},_fetchImage:function(e){if(!(y.isDefined(this._raster)&&y.isDefined(e.extent)&&y.isDefined(e.width)&&y.isDefined(e.height))){var i=new t;return i.reject(new Error("Insufficient parameters for requesting an image. A valid extent, width and height values are required.")),i.promise}var r=this.getExportImageServiceParameters(e),a={imageServiceParameters:r,nBands:Math.min(this.bandCount,3),pixelType:this.pixelType};return this._raster.read(a)},_applyFilter:function(e){var t=this._clonePixelData(e);return this.pixelFilter&&this.pixelFilter(t),t},_clonePixelData:function(e){if(null===e||void 0===e)return e;var t={};e.extent&&(t.extent=e.extent.clone());var i=e.pixelBlock;return null===i||void 0===i?t:(t.pixelBlock=i.clone(),t)},_processVisibleRastersResponse:function(e,t){var i,r,a,n,s=e.value,l=0,o=this.objectIdField,c=e.catalogItems&&e.catalogItems.features&&e.catalogItems.features.length||0;if(c){var d,p,f=0,h=0;for(r=[c],i=[c],n=[c],l=0;c>l;l++)e.properties.Values[l].toLowerCase().indexOf("nodata")>-1&&h++;for(d=c-h,l=0;c>l;l++)p=e.properties.Values[l].toLowerCase().indexOf("nodata")>-1?d++:f++,r[p]=e.catalogItems.features[l],i[p]=e.properties.Values[l],n[p]=r[p].attributes[o]}this._visibleRasters=[];var m,b=s.toLowerCase().indexOf("nodata")>-1;if(s&&!r&&!b){o="ObjectId",r=[];var y={};y.ObjectId=0,m=new v(new u(this.fullExtent),null,y),r.push(m)}var g=[];if(!r)return g;var x,R,D=t&&t.returnDomainValues||!1;for(l=0,a=r.length;a>l;l++)m=r[l],m.popupTemplate=this.popupTemplate,m._layer=this,s&&(x=s,i&&i.length>=l&&(R=i[l],x=R.replace(/ /gi,", ")),m.attributes["Raster.ItemPixelValue"]=x,m.attributes["Raster.ServicePixelValue"]=s,this._updateFeatureWithMagDirValues(m,x),this._updateFeatureWithRasterAttributeTableValues(m,x)),D&&this._updateFeatureWithDomainValues(m),g.push(m);return g},_updateFeatureWithRasterAttributeTableValues:function(t,i){var r=this.rasterAttributeTable&&this.rasterAttributeTable.features;if(r&&!(r.length<1)&&this.rasterAttributeTableFieldPrefix){var a=null;if(r.forEach(function(e){e&&e.attributes&&(a=e.attributes.hasOwnProperty("Value")&&e.attributes.Value==i?e:e.attributes.VALUE==i?e:null)}),a){var n,s,l={};for(n in a.attributes)a.attributes.hasOwnProperty(n)&&(s=this.rasterAttributeTableFieldPrefix+n,l[s]=a.attributes[n]);t.attributes=e.mixin(t.attributes,a.attributes)}}},_updateFeatureWithMagDirValues:function(e,t){if(this.pixelFilter&&("esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType)){var i=t.replace(" ","").split(","),r=new n({height:1,width:1,pixelType:"f32",pixels:[],statistics:[]});i.forEach(function(e){r.addData({pixels:[e],statistics:{minValue:e,maxValue:e,noDataValue:null}})}),this.pixelFilter({pixelBlock:r,extent:new u(0,0,0,0,this.spatialReference)}),e.attributes["Raster.Magnitude"]=r.pixels[0][0],e.attributes["Raster.Direction"]=r.pixels[1][0]}},_updateFeatureWithDomainValues:function(e){var t=this.domainFields;y.isDefined(t)&&t.forEach(function(t){if(t){var i=e.attributes[t.name];if(y.isDefined(i)){var r=this._findMatchingDomainValue(t.domain,i);y.isDefined(r)&&(e.attributes[t.name]=r)}}},this)},_findMatchingDomainValue:function(e,t){var i=e&&e.codedValues;if(i){var r;return i.some(function(e){return e.code===t?(r=e.name,!0):!1}),r}}});return T});