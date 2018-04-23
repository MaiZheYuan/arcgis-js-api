// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./core/tsSupport/paramHelper","dojo/has","dojo/_base/lang","./kernel","./Map","./Viewpoint","./core/Collection","./core/Error","./core/JSONSupport","./core/Loadable","./core/Logger","./core/promiseUtils","./core/urlUtils","./core/accessorSupport/decorators","./core/accessorSupport/originUtils","./core/accessorSupport/read","./geometry/Extent","./geometry/HeightModelInfo","./geometry/SpatialReference","./geometry/support/heightModelInfoUtils","./geometry/support/jsonUtils","./portal/Portal","./portal/PortalItem","./support/webSceneUtils","./webscene/ApplicationProperties","./webscene/Environment","./webscene/InitialViewProperties","./webscene/Presentation","./webscene/Version"],function(e,t,r,i,n,o,a,p,s,l,c,u,d,y,f,h,v,w,g,m,b,S,A,I,M,V,_,R,L,O,j,P,U){var E=f.getLogger("esri.WebScene"),W=o("dojo-debug-messages"),N=new U.default(1,10);return function(t){function o(e){var r=t.call(this)||this;return r.applicationProperties=null,r.clippingArea=null,r.clippingEnabled=!1,r.heightModelInfo=null,r.sourceVersion=null,r.supportsHeightModelInfo=!0,r.presentation=null,r.initialViewProperties=null,r.portalItem=null,r.resourceInfo=null,r.authoringApp=null,r.authoringAppVersion=null,r._isAuthoringAppSetByUser=!1,r._isAuthoringAppVersionSetByUser=!1,r}return r(o,t),o.prototype.initialize=function(){if(this.when().catch(function(e){E.error("#load()","Failed to load web scene",e)}),this.resourceInfo){var e=void 0;try{e=this._validateJSON(this.resourceInfo)}catch(e){return void this.addResolvingPromise(h.reject(e))}this.read(e),this.addResolvingPromise(this._validateSpatialReference()),this.addResolvingPromise(this._validateHeightModelInfo())}},o.prototype.getDefaults=function(e){return a.mixin(this.inherited(arguments),{presentation:{},initialViewProperties:{}})},o.prototype.writeClippingArea=function(e,t){t.clippingArea||(t.clippingArea={}),t.clippingArea.geometry=e.toJSON()},o.prototype.readClippingEnabled=function(e,t){return!!t.clippingArea&&!!t.clippingArea.clip},o.prototype.writeClippingEnabled=function(e,t){this.clippingArea&&(t.clippingArea||(t.clippingArea={}),t.clippingArea.clip=e)},o.prototype.writeLayers=function(e,t,r,i){var n=this,o=a.mixin({},i,{layerContainerType:"operational-layers"}),p=e.filter(function(e){return n.verifyWriteLayer(e,o)}).map(function(e){return e.write(null,o)}).filter(function(e){return!!e});t[r]=p.toArray()},o.prototype.verifyWriteLayer=function(e,t){return!!e.write||(t&&t.messages&&t.messages.push(new u("layer:unsupported","Layers ("+e.title+", "+e.id+") of type '"+e.declaredClass+"' cannot be persisted in web scenes",{layer:e})),!1)},o.prototype.readSourceVersion=function(e,t){var r=t.version.split("."),i=r[0],n=r[1];return new U.default(parseInt(i,10),parseInt(n,10))},o.prototype.writeSourceVersion=function(e,t,r){t[r]=N.major+"."+N.minor},Object.defineProperty(o.prototype,"authoringApp",{set:function(e){this._isAuthoringAppSetByUser=!0,this._set("authoringApp",e)},enumerable:!0,configurable:!0}),o.prototype.writeAuthoringApp=function(e,t){e&&this._isAuthoringAppSetByUser?t.authoringApp=e:t.authoringApp="ArcGIS API for JavaScript"},Object.defineProperty(o.prototype,"authoringAppVersion",{set:function(e){this._isAuthoringAppVersionSetByUser=!0,this._set("authoringAppVersion",e)},enumerable:!0,configurable:!0}),o.prototype.writeAuthoringAppVersion=function(e,t){e&&this._isAuthoringAppVersionSetByUser?t.authoringAppVersion=e:t.authoringAppVersion=p.version},o.prototype.writeGround=function(e,t,r,i){t[r]=e?e.write(null,i):{layers:[]}},o.prototype.readInitialViewProperties=function(e,t){var r={};return t.initialState&&t.initialState.environment&&(r.environment=O.fromJSON(t.initialState.environment)),t.spatialReference&&(r.spatialReference=A.fromJSON(t.spatialReference)),r.viewingMode=t.viewingMode||"global",t.initialState&&t.initialState.viewpoint&&(r.viewpoint=l.fromJSON(t.initialState.viewpoint)),new j(r)},o.prototype.writeInitialViewProperties=function(e,t,r,i){if(e){var n={};e.environment&&(n.environment=e.environment.write({},i)),e.viewpoint&&(n.viewpoint=e.viewpoint.write({},i)),0!==Object.keys(n).length&&(t.initialState=n),t.spatialReference=e.spatialReference?e.spatialReference.write({},i):A.WebMercator.toJSON(),t.viewingMode=null!=e.viewingMode?e.viewingMode:"global"}},o.prototype.load=function(){return this.addResolvingPromise(this._loadFromSource()),this.when()},o.prototype.read=function(e,t){var r=this;t=a.mixin({},t,{origin:"web-scene"});var i=this._isAuthoringAppVersionSetByUser,n=this._isAuthoringAppSetByUser,o=arguments;if(m.readLoadable(this,e,function(t){return r.inherited(o,[e,t])},t),n||(this._isAuthoringAppSetByUser=!1),i||(this._isAuthoringAppVersionSetByUser=!1),e.baseMap&&Array.isArray(e.baseMap.elevationLayers)&&this.sourceVersion.supportsVisibleElevationLayersInSlides){var p=e.baseMap.elevationLayers.map(function(e){return{id:e.id}}),s=this.presentation.slides,l=function(e,t){return e.visibleLayers.some(function(e){return e.id===t})},c=p.filter(function(e){return!s.some(function(t){return l(t,e.id)})});s.forEach(function(e){e.visibleLayers.addMany(c)})}return this},o.prototype._writeBasemapElevationLayers=function(e){var t=e.ground&&e.ground.layers;!e.baseMap&&t&&t.length&&(e.baseMap={title:"Basemap",baseMapLayers:[]}),e.baseMap&&(e.baseMap.elevationLayers=a.clone(t))},o.prototype.write=function(e,t){if("loaded"!==this.loadStatus){var r=new u("webscene:not-loaded","Web scene must be loaded before it can be serialized");throw E.error("#toJSON()","Web scene must be loaded before it can be serialized",this.loadError||this.loadStatus),r}t=a.mixin({},t,{origin:"web-scene"});var i=this.inherited(arguments,[e,t]);return this._writeBasemapElevationLayers(i),i},o.prototype.save=function(e){var t=this;if(!this.portalItem)return E.error("save(): requires the .portalItem property to be set"),h.reject(new u("webscene:portal-item-not-set","Portal item to save to has not been set on the WebScene"));if("Web Scene"!==this.portalItem.type)return h.reject(new u("webscene:portal-item-wrong-type",'Portal item needs to have type "Web Scene"'));var r,i;return this.load().then(function(){return t._loadObjectsWithLayers()}).then(function(){return r=t._enableVerifyItemRelativeUrls({origin:"web-scene",url:t.portalItem.itemUrl&&v.urlToObject(t.portalItem.itemUrl),messages:[],portal:t.portalItem.portal||V.getDefault(),writtenProperties:[],blockedRelativeUrls:[]}),i=t.write(null,r),t._verifySave(i,r,e).then(function(){return t._updateTypeKeywords(t.portalItem),t.portalItem.update({data:i})})}).then(function(){return g.updateOrigins(r),h.resolve(t.portalItem)})},o.prototype.saveAs=function(e,t){var r=this;if(!e)return E.error("saveAs(portalItem): requires a portal item parameter"),h.reject(new u("webscene:portal-item-required","saveAs requires a portal item to save to"));if(e.type&&"Web Scene"!==e.type||e.id)return h.reject(new u("webscene:portal-item-already-exists","WebScene can only saveAs to a new and empty portal item"));var i,n,o=e.portal||V.getDefault();return this.load().then(function(){return r._loadObjectsWithLayers()}).then(function(){return i=r._enableVerifyItemRelativeUrls({origin:"web-scene",url:null,messages:[],portal:o,writtenProperties:[],blockedRelativeUrls:[]}),n=r.write(null,i),r._verifySaveAs(n,i,t).then(function(){return o._signIn()})}).then(function(){return e.type="Web Scene",e.portal=o,r._updateTypeKeywords(e),o.user.addItem({item:e,folder:t&&t.folder,data:n})}).then(function(){return r.portalItem=e,d.prototype.read.call(r,{version:n.version,authoringApp:n.authoringApp,authoringAppVersion:n.authoringAppVersion},{name:"web-scene",url:e.itemUrl&&v.urlToObject(e.itemUrl)}),g.updateOrigins(i),h.resolve(e)})},o.prototype._verifySave=function(t,r,i,n){void 0===n&&(n=!1);var o=r.messages.filter(function(e){return"error"===e.type}).map(function(e){return new u(e.name,e.message,e.details)});r.blockedRelativeUrls&&(o=o.concat(r.blockedRelativeUrls.map(function(e){return new u("url:unsupported","Relative url '"+e+"' is not supported in Web Scene")}))),i&&i.ignoreUnsupported&&(o=o.filter(function(e){return"layer:unsupported"!==e.name&&"symbol:unsupported"!==e.name&&"symbol-layer:unsupported"!==e.name&&"property:unsupported"!==e.name})),i&&i.strictSchemaValidationEnabled||(o=o.filter(function(e){return"web-document-write:property-required"!==e.name}));var a,p=i&&i.strictSchemaValidationEnabled;return a=W||p?h.create(function(t){return e(["./webscene/validator"],t)}).then(function(e){var r=e.validate(t);if(r.length>0){var i="webscene did not validate:\n"+r.join("\n");E.error((n?"saveAs":"save")+"(): "+i)}return r.map(function(e){return new u("webscene:schema-validation",e)})}).then(function(e){if(p&&e.length>0){var t=R.createSchemaValidationError(e.concat(o));return h.reject(t)}return o}):h.resolve(o),a.then(function(e){if(e.length>0)return h.reject(new u("webscene:save","Failed to save webscene due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:e}))})},o.prototype._verifySaveAs=function(e,t,r){return this.canSaveAs(t)?h.reject(R.createCopyError()):this._verifySave(e,t,r,!0)},o.prototype.verifySaveAs=function(e){var t=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),r=this.write(null,t);return this._verifySaveAs(r,t,e)},o.prototype.canSaveAs=function(e){return e||(e=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),this.write(null,e)),e.verifyItemRelativeUrls&&e.verifyItemRelativeUrls.writtenUrls.length>0},o.prototype.updateFrom=function(e,t){void 0===t&&(t={}),t.environmentExcluded||(this.initialViewProperties.environment=O.prototype.clone.apply(e.environment)),t.viewpointExcluded||(this.initialViewProperties.viewpoint=e.viewpoint.clone()),this.initialViewProperties.spatialReference=e.spatialReference.clone(),this.initialViewProperties.viewingMode=e.viewingMode,e.clippingArea?e.clippingArea!==this.clippingArea&&(this.clippingArea=e.clippingArea.clone(),this.clippingEnabled=!0):this.clippingEnabled=!1,e.heightModelInfo&&(this.heightModelInfo=e.heightModelInfo.clone()),e.map===this&&e.allLayerViews.forEach(function(e){e.layer.visible=e.visible})},o.prototype._loadFromSource=function(){return this.resourceInfo?this._loadFromJSON(this.resourceInfo,{origin:"web-scene"}):this.portalItem&&this.portalItem.id?this._loadFromItem(this.portalItem):this._loadObjectsWithLayers()},o.prototype._readAndLoadFromJSON=function(e,t){var r=this._validateJSON(e,t&&t.url&&t.url.path);return this.read(r,t),this._loadFromJSON(r,t)},o.prototype._extractOperationalLayers=function(e){var t=this,r=[];if(!this.sourceVersion.supportsGround&&e.baseMap&&Array.isArray(e.baseMap.elevationLayers))for(var i=0,n=e.baseMap.elevationLayers;i<n.length;i++){var o=n[i];r.push(o)}var a=[],p=function(e){return e.layers&&(e.layers=e.layers.filter(p)),"ArcGISTiledElevationServiceLayer"!==e.layerType||(t.sourceVersion.supportsGround||a.push(e),!1)};return{operationalLayers:e.operationalLayers?e.operationalLayers.filter(p):[],operationalElevationLayers:a,basemapElevationLayers:r}},o.prototype._loadFromJSON=function(t,r){var i=this,n=new c;return this._validateSpatialReference().then(function(){return i._validateHeightModelInfo()}).then(function(){return h.create(function(t){return e(["./portal/support/layersCreator"],t)})}).then(function(e){var o=i._extractOperationalLayers(t),p=o.operationalLayers,s=o.operationalElevationLayers,l=o.basemapElevationLayers,c=[],u={context:a.mixin({},r,{layerContainerType:"operational-layers"})};if(i.portalItem&&(u.context.portal=i.portalItem.portal||V.getDefault()),l.length>0){var d=a.mixin({},u,{context:a.mixin({},u.context,{layerContainerType:"ground"})});d.defaultLayerType="ArcGISTiledElevationServiceLayer",c.push.apply(c,e.populateOperationalLayers(i.ground.layers,l,d))}if(s.length>0){var d=a.mixin({},u,{context:a.mixin({},u.context,{layerContainerType:"ground"})});d.defaultLayerType="ArcGISTiledElevationServiceLayer",c.push.apply(c,e.populateOperationalLayers(n,s,d))}return p&&p.length>0&&c.push.apply(c,e.populateOperationalLayers(i.layers,p,u)),h.eachAlways(c).then(function(){})}).then(function(){return i._loadObjectsWithLayers()}).then(function(){i.ground.layers.addMany(n)})},o.prototype._loadObjectsWithLayers=function(){var e=[];return this.ground&&e.push(this.ground.load()),this.basemap&&e.push(this.basemap.load()),this.presentation.slides.forEach(function(t){t.basemap&&e.push(t.basemap.load())}),h.eachAlways(e).then(function(){})},o.prototype._loadFromItem=function(e){var t=this;return e.load().catch(function(e){throw new u("webscene:load-portal-item","Failed to load portal item",{error:e})}).then(function(){if("Web Scene"!==e.type)throw new u("webscene:invalid-portal-item","Invalid portal item type '${type}', expected 'Web Scene'",{type:e.type})}).then(function(){return e.fetchData()}).then(function(r){return t.resourceInfo=r,t._readAndLoadFromJSON(r,{origin:"web-scene",url:v.urlToObject(e.itemUrl),portal:e.portal||V.getDefault()})})},o.prototype._validateSpatialReference=function(){var e,t=this.initialViewProperties,r=this._sceneSpatialReference,i="local"!==t.viewingMode;if(i){if(!r.isWGS84&&!r.isWebMercator)return h.reject(new u("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in global mode, only Web Mercator or WGS84 GCS are supported",{spatialReference:r,viewingMode:t.viewingMode}));e=function(e){return!e||e.isWGS84||e.isWebMercator}}else{if(r.isGeographic)return h.reject(new u("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in local mode, only projected coordinate systems are supported",{spatialReference:r,viewingMode:t.viewingMode}));e=function(e){return!e||e.equals(r)}}var n=function(e){return e&&(e.camera&&e.camera.position&&e.camera.position.spatialReference||e.targetGeometry&&e.targetGeometry.spatialReference)},o=t.viewpoint,a=n(o);if(a&&!e(a))return h.reject(new u("webscene:incompatible-camera-spatial-reference","Camera spatial reference (${cameraSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{cameraSpatialReference:a,sceneSpatialReference:r,viewingMode:t.viewingMode}));var p=this.presentation.slides.find(function(t){return!e(n(t.viewpoint))});if(p){var s=n(p.viewpoint);return h.reject(new u("webscene:incompatible-slide-spatial-reference","Slide spatial reference (${slideSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{slideSpatialReference:s,sceneSpatialReference:r,viewingMode:t.viewingMode}))}return h.resolve()},o.prototype._validateHeightModelInfo=function(){var e=this._sceneSpatialReference,t=I.validateWebSceneError(this.heightModelInfo,e);return t?h.reject(t):h.resolve()},o.prototype._validateJSON=function(e,t){void 0===t&&(t=null);var r=this._sanitizeJSON(e,t),i=U.default.parse(r.version,"webscene");return N.validate(i),r.version=i.major+"."+i.minor,1===i.major&&i.minor<=2&&(r.spatialReference=A.WebMercator.toJSON()),r},o.prototype._sanitizeJSON=function(e,t){return void 0===t&&(t=null),{version:e.version||"",baseMap:e.baseMap,ground:e.ground,operationalLayers:e.operationalLayers,authoringApp:e.authoringApp||"",authoringAppVersion:e.authoringAppVersion||"",viewingMode:e.viewingMode||"global",presentation:e.presentation&&P.sanitizeJSON(e.presentation)||{},initialState:e.initialState,spatialReference:e.spatialReference||A.WebMercator.toJSON(),heightModelInfo:e.heightModelInfo||null,clippingArea:e.clippingArea,applicationProperties:e.applicationProperties}},o.prototype._updateTypeKeywords=function(e){"local"===this.initialViewProperties.viewingMode?e.typeKeywords?-1===e.typeKeywords.indexOf("ViewingMode-Local")&&e.typeKeywords.push("ViewingMode-Local"):e.typeKeywords=["ViewingMode-Local"]:"global"===this.initialViewProperties.viewingMode&&e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(function(e){return"ViewingMode-Local"!==e})),e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(function(e,t,r){return r.indexOf(e)===t}))},Object.defineProperty(o.prototype,"_sceneSpatialReference",{get:function(){return this.initialViewProperties.spatialReference||A.WebMercator},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"_verifyItemRelativeRootPath",{get:function(){return this.portalItem&&this.portalItem.itemUrl?v.urlToObject(this.portalItem.itemUrl).path:null},enumerable:!0,configurable:!0}),o.prototype._enableVerifyItemRelativeUrls=function(e){var t=this._verifyItemRelativeRootPath;return t&&(e.verifyItemRelativeUrls={rootPath:t,writtenUrls:[]}),e},o.fromJSON=function(e){if(!e)throw new u("webscene:empty-resource","Expected a JSON resource but got nothing");return new this({resourceInfo:e})},o.VERSION=N,i([w.property({type:L,json:{write:!0}})],o.prototype,"applicationProperties",void 0),i([w.property({json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],o.prototype,"basemap",void 0),i([w.property({type:b,json:{read:{source:"clippingArea.geometry",reader:M.fromJSON},write:{target:"clippingArea.geometry"}}})],o.prototype,"clippingArea",void 0),i([w.writer("clippingArea")],o.prototype,"writeClippingArea",null),i([w.property({type:Boolean,json:{write:{target:"clippingArea.clip"}}})],o.prototype,"clippingEnabled",void 0),i([w.reader("clippingEnabled",["clippingArea"])],o.prototype,"readClippingEnabled",null),i([w.writer("clippingEnabled")],o.prototype,"writeClippingEnabled",null),i([w.property({type:S,json:{write:!0}})],o.prototype,"heightModelInfo",void 0),i([w.property({json:{write:{target:"operationalLayers"}}})],o.prototype,"layers",void 0),i([w.writer("layers")],o.prototype,"writeLayers",null),i([w.property({readOnly:!0,type:U.default,json:{type:String,write:{allowNull:!0,target:"version",isRequired:!0}}})],o.prototype,"sourceVersion",void 0),i([w.reader("sourceVersion",["version"])],o.prototype,"readSourceVersion",null),i([w.writer("sourceVersion")],o.prototype,"writeSourceVersion",null),i([w.property({type:String,json:{write:{allowNull:!0}}})],o.prototype,"authoringApp",null),i([w.writer("authoringApp")],o.prototype,"writeAuthoringApp",null),i([w.property({type:String,json:{write:{allowNull:!0}}})],o.prototype,"authoringAppVersion",null),i([w.writer("authoringAppVersion")],o.prototype,"writeAuthoringAppVersion",null),i([w.property({json:{write:{isRequired:!0,allowNull:!0,enabled:!0}}})],o.prototype,"ground",void 0),i([w.writer("ground")],o.prototype,"writeGround",null),i([w.property({type:P,json:{write:function(e,t,r,i){e.slides&&e.slides.length>0&&(t.presentation=e.write(null,i))}}})],o.prototype,"presentation",void 0),i([w.property({type:j})],o.prototype,"initialViewProperties",void 0),i([w.reader("initialViewProperties",["initialState.environment","spatialReference","viewingMode","initialState.viewpoint"])],o.prototype,"readInitialViewProperties",null),i([w.writer("initialViewProperties",{"initialState.environment":{type:O},spatialReference:{type:A},viewingMode:{type:String},"initialState.viewpoint":{type:l}})],o.prototype,"writeInitialViewProperties",null),i([w.property({type:_})],o.prototype,"portalItem",void 0),i([w.property()],o.prototype,"resourceInfo",void 0),i([n(0,w.cast(_))],o.prototype,"saveAs",null),i([w.property()],o.prototype,"_sceneSpatialReference",null),i([w.property()],o.prototype,"_verifyItemRelativeRootPath",null),o=i([w.subclass("esri.WebScene")],o)}(w.declared(s,y,d))});