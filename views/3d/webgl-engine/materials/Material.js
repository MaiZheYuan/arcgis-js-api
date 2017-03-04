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

define(["dojo/_base/lang","dojo/text!./Material.xml","./internal/MaterialUtil","../../../webgl/Program","../lib/ShaderVariations","../lib/Util","../lib/gl-matrix","../lib/RenderSlot","../lib/DefaultVertexAttributeLocations","../lib/DefaultVertexBufferLayouts","../../../webgl/Util","../../support/mathUtils"],function(e,t,i,n,r,a,o,s,l,d,v,u){function f(e,t){var i=t.vvSizeEnabled||t.vvRotationEnabled;t.vvSizeEnabled?(e.setUniform3fv("vvSizeMinSize",t.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",t.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",t.vvSizeOffset),e.setUniform3fv("vvSizeFactor",t.vvSizeFactor)):i&&e.setUniform3fv("vvSizeValue",t.vvSizeValue),i&&(e.setUniform3fv("vvAnchorValue",t.vvAnchorValue),t.vvRotationEnabled?e.setUniform1f("vvRotationValue",u.deg2rad(t.vvRotationValue)):e.setUniformMatrix4fv("vvRotationValue",h(t.vvRotationValue,b))),t.vvColorEnabled&&(e.setUniform1fv("vvColorValues",t.vvColorValues),e.setUniform4fv("vvColorColors",t.vvColorColors))}function c(e,t){e.vvSizeEnabled=t.vvSizeEnabled,e.vvSizeMinSize=t.vvSizeMinSize,e.vvSizeMaxSize=t.vvSizeMaxSize,e.vvSizeOffset=t.vvSizeOffset,e.vvSizeFactor=t.vvSizeFactor,e.vvSizeValue=t.vvSizeValue,e.vvRotationValue=t.vvRotationValue,e.vvAnchorValue=t.vvAnchorValue}function h(e,t){return g.identity(t),g.rotateZ(t,-u.deg2rad(e)),t}var S,p=a.assert,x=o.vec3,g=o.mat4,m=x.create(),b=g.create(),C=function(e,t){i.basicMaterialConstructor(this,t),e=e||{},e.ambient=e.ambient||[.2,.2,.2],e.diffuse=e.diffuse||[.8,.8,.8],e.specular=e.specular||[0,0,0],e.externalColor=e.externalColor||[1,1,1,1],e.externalColorMixMode=e.externalColorMixMode||i.externalColorMixModes.multiply,e.shininess=e.shininess||10,e.opacity=void 0!==e.opacity?e.opacity:1,e.blendModeOneOne=e.blendModeOneOne||!1,e.inverseWindingOrder=e.inverseWindingOrder||!1,e.vertexColors=e.vertexColors||!1,e.flipV=e.flipV||!1,e.doubleSided=e.doubleSided||!1,e.cullFace=e.cullFace||void 0,e.instanced=e.instanced||!1,this.instanced=!!e.instanced,e.writeStencil=e.writeStencil||!1,e.textureId||(e.reflTextureId=void 0),e.receiveSSAO=void 0!==e.receiveSSAO?e.receiveSSAO:!0,e.vvSizeEnabled=e.vvSizeEnabled||!1,e.vvSizeMinSize=e.vvSizeMinSize||[1,1,1],e.vvSizeMaxSize=e.vvSizeMaxSize||[100,100,100],e.vvSizeOffset=e.vvSizeOffset||[0,0,0],e.vvSizeFactor=e.vvSizeFactor||[1,1,1],e.vvSizeValue=e.vvSizeValue||[1,1,1],e.vvAnchorValue=e.vvAnchorValue||[0,0,0],e.vvRotationEnabled=e.vvRotationEnabled||!1,e.vvRotationValue=e.vvRotationValue||0,e.vvColorEnabled=e.vvColorEnabled||!1,e.vvColorValues=e.vvColorValues||[0,0,0,0,0,0,0,0],e.vvColorColors=e.vvColorColors||[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];var n;n=e.textureId?e.atlasRegions?"Pos3NormTexRegion":"Pos3NormTex":"Pos3Norm",e.vertexColors&&(n+="Col");var r=d[n],a=null;e.instanced&&(a=[],v.addDescriptor(a,"model",16,5126,!1,1),v.addDescriptor(a,"modelNormal",16,5126,!1,1),e.instanced.indexOf("color")>-1&&v.addDescriptor(a,"instanceColor",4,5126,!1,1),e.instanced.indexOf("featureAttribute")>-1&&v.addDescriptor(a,"instanceFeatureAttribute",4,5126,!1,1));var o=this.isVisible.bind(this);this.isVisible=function(){return o()&&e.opacity>0},this.dispose=function(){},this.getParams=function(){return e},this.getParameterValues=function(){var t={ambient:e.ambient,diffuse:e.diffuse,specular:e.specular,externalColor:e.externalColor,externalColorMixMode:e.externalColorMixMode,shininess:e.shininess,opacity:e.opacity,transparent:e.transparent,polygonOffset:e.polygonOffset,reflectivity:e.reflectivity,atlasRegions:e.atlasRegions,flipV:e.flipV,doubleSided:e.doubleSided,cullFace:e.cullFace,writeStencil:e.writeStencil,receiveSSAO:e.receiveSSAO,vvSizeEnabled:e.vvSizeEnabled,vvSizeMinSize:e.vvSizeMinSize,vvSizeMaxSize:e.vvSizeMaxSize,vvSizeOffset:e.vvSizeOffset,vvSizeFactor:e.vvSizeFactor,vvSizeValue:e.vvSizeValue,vvRotationEnabled:e.vvRotationEnabled,vvRotationValue:e.vvRotationValue,vvAnchorValue:e.vvAnchorValue,vvColorEnabled:e.vvColorEnabled,vvColorValues:e.vvColorValues,vvColorColors:e.vvColorColors};return e.textureId&&(t.textureId=e.textureId,t.initTexture=e.initTexture),t},this.setParameterValues=function(t){for(var i in t)"textureId"===i&&p(e.textureId,"Can only change texture of material that already has a texture"),e[i]=t[i];this.notifyDirty("matChanged")},this.getOutputAmount=function(e){var t=v.getStride(r)/4;return e*t},this.getVertexBufferLayout=function(){return r},this.getInstanceBufferLayout=function(){return a},this.fillInterleaved=function(e,t,n,a,o,s,l){i.fillInterleaved(e,t,n,a,r,o,s,l)},this.intersect=i.intersectTriangleGeometry,this.getGLMaterials=function(){return{color:O,depthShadowMap:E,normal:I,depth:D,highlight:z}},this.getAllTextureIds=function(){var t=[];return e.textureId&&t.push(e.textureId),e.reflTextureId&&t.push(e.reflTextureId),t}};C.paramsFromOldConstructor=function(e,t,i,n,r,a,o,s,l,d,v,u,f){return{textureId:e,transparent:t,ambient:i,diffuse:n,specular:r,shininess:a,opacity:o,polygonOffset:s,initTexture:l,reflTextureId:d,reflectivity:v,flipV:u,doubleSided:f,cullFace:void 0}};var V=function(e){return e.cullFace?"none"!==e.cullFace:e.transparent?!1:!0},T=function(e,t){var i=e.gl,n=V(t);n?(e.setFaceCullingEnabled(!0),"front"===t.cullFace&&e.setCullFace(i.FRONT)):e.setFaceCullingEnabled(!1)},M=function(e,t){var i=e.gl,n=V(t);n?(e.setFaceCullingEnabled(!1),"front"===t.cullFace&&e.setCullFace(i.BACK)):e.setFaceCullingEnabled(!0)},A=function(e,t){return e?s.TRANSPARENT_MATERIAL:t?s.STENCIL_MATERIAL:s.OPAQUE_MATERIAL},O=function(t,n,r){i.basicGLMaterialConstructor(this,t);var a=e.clone(t.getParams()),o=A(a.transparent,a.writeStencil);i.singleTextureGLMaterialConstructor(this,r,a);var s=i.aquireIfNotUndefined(a.reflTextureId,a.reflInitTexture,r);s&&(s=s.getGLTexture()),p(!(a.atlasRegions&&a.reflTextureId),"Atlas texture with reflection is not yet supported");var l=a.textureId?a.atlasRegions?"AtlasTextured":"Textured":"none";this.instanced=S&&a.instanced;var d=!!this.instanced&&this.instanced.indexOf("color")>-1;this._loadProgram=function(e,t){return n.shaderVariators.Material.getProgram([l,!!a.reflTextureId,a.vertexColors,a.flipV,a.doubleSided,!!this.instanced,d,e,t,!!a.vvSizeEnabled,!!a.vvColorEnabled,!!a.vvRotationEnabled])};var v=this._loadProgram(!1,a.receiveSSAO),u=this._loadProgram(!0,a.receiveSSAO),h=null,g="AtlasTextured"===l,b=this.dispose;this.dispose=function(){b(),i.releaseIfNotUndefined(a.reflTextureId,r)},this.beginSlot=function(e){return o===e},this.getProgram=function(){return h||v},this.getAllPrograms=function(){return[u,v]},this.updateParameters=function(){var e=t.getParams();a.ambient=e.ambient,a.diffuse=e.diffuse,a.specular=e.specular,a.externalColor=e.externalColor,a.externalColorMixMode=e.externalColorMixMode,a.shininess=e.shininess,a.opacity=e.opacity,a.polygonOffset=e.polygonOffset,a.reflectivity=e.reflectivity,a.flipV=e.flipV,a.doubleSided=e.doubleSided,a.cullFace=e.cullFace,a.receiveSSAO=e.receiveSSAO,c(a,e),a.vvColorEnabled=e.vvColorEnabled,a.vvColorValues=e.vvColorValues,a.vvColorColors=e.vvColorColors,a.transparent!=e.transparent&&(o=A(e.transparent),a.transparent=e.transparent),a.initTexture=e.initTexture,this.updateTexture(e.textureId),e.atlasRegions&&(a.atlasRegions=e.atlasRegions),a.blendModeOneOne=e.blendModeOneOne,a.inverseWindingOrder=e.inverseWindingOrder,v=this._loadProgram(!1,a.receiveSSAO),u=this._loadProgram(!0,a.receiveSSAO)},this.bind=function(e,t){var i=e.gl,n=t.shadowMap&&t.shadowMap.getEnableState();h=n?u:v,e.bindProgram(h),h.setUniform3fv("ambient",a.ambient),h.setUniform3fv("diffuse",a.diffuse),h.setUniform3fv("specular",a.specular),h.setUniform4fv("externalColor",a.externalColor),h.setUniform1i("externalColorMixMode",a.externalColorMixMode),h.setUniform1f("shininess",a.shininess),h.setUniform1f("opacity",a.opacity),t.shadowMap||h.setUniform1f("depthHalfPixelSz",-1),f(h,a),this.bindTexture(e,h),g&&this.bindTextureSize(e,h),e.setBlendFunctionSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA),void 0!==s&&(h.setUniform1i("reflTex",1),e.bindTexture(s,1),h.setUniform1f("reflectivity",a.reflectivity)),a.inverseWindingOrder&&e.setFrontFace(i.CW),a.transparent?(e.setBlendingEnabled(!0),a.blendModeOneOne?(e.setBlendFunction(i.ONE,i.ONE),e.setDepthWriteEnabled(!1)):e.setBlendFunctionSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA)):e.setBlendingEnabled(!1),a.polygonOffset&&(e.setPolygonOffsetFillEnabled(!0),e.setPolygonOffset(2,2)),T(e,a),e.setDepthTestEnabled(!0)},this.release=function(e,t){var i=e.gl;e.setPolygonOffsetFillEnabled(!1),M(e,a),e.setBlendingEnabled(!1),e.setBlendFunctionSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA),e.setDepthWriteEnabled(!0),e.setFrontFace(i.CCW)},this.bindView=function(e,t){var n=t.shadowMap&&t.shadowMap.getEnableState();h=n?u:v;var r=t.origin;i.bindView(r,t.view,h),i.bindCamPos(r,t.viewInvTransp,h),t.shadowMap&&t.shadowMap.bindView(h,r)},this.bindInstance=function(e,t){if(h.setUniformMatrix4fv("model",t.transformation),h.setUniformMatrix4fv("modelNormal",t.transformationNormal),d&&t.instanceParameters){var i=t.instanceParameters.color;i&&(x.multiply(a.ambient,i,m),h.setUniform3fv("ambient",m),x.multiply(a.diffuse,i,m),h.setUniform3fv("diffuse",m),h.setUniform1f("opacity",a.opacity*i[3]))}},this.getDrawMode=function(e){var t=e.gl;return t.TRIANGLES}},D=function(t,n,r,a){i.basicGLMaterialConstructor(this,t);var o=e.clone(t.getParams());this.instanced=S&&o.instanced;var s=v.hasAttribute(t.getVertexBufferLayout(),"uv0")?(o.atlasRegions,"Textured"):"none",l=n.shaderVariators.MaterialDepth.getProgram([s,o.flipV,!!this.instanced,!!a,!!o.vvSizeEnabled,!!o.vvRotationEnabled]),d=A(o.transparent,o.writeStencil);i.singleTextureGLMaterialConstructor(this,r,o),this.beginSlot=function(e){return d===e},this.getProgram=function(){return l},this.updateParameters=function(){var e=t.getParams();o.initTexture=e.initTexture,o.cullFace=e.cullFace,o.inverseWindingOrder=e.inverseWindingOrder,o.flipV=e.flipV,c(o,e),this.updateTexture(e.textureId)},this.bind=function(e,t){var i=e.gl;e.bindProgram(l),l.setUniform2fv("nearFar",t.nearFar),o.inverseWindingOrder&&e.setFrontFace(i.CW),f(l,o),this.bindTexture(e,l),T(e,o),e.setDepthTestEnabled(!0)},this.release=function(e){var t=e.gl;M(e,o),o.inverseWindingOrder&&e.setFrontFace(t.CCW)},this.bindView=function(e,t){i.bindView(t.origin,t.view,l)},this.bindInstance=function(e,t){l.setUniformMatrix4fv("model",t.transformation)},this.getDrawMode=function(e){var t=e.gl;return t.TRIANGLES}},E=function(e,t,i){D.call(this,e,t,i,!0)},I=function(t,n,r){i.basicGLMaterialConstructor(this,t);var a=e.clone(t.getParams()),o=v.hasAttribute(t.getVertexBufferLayout(),"uv0")?(a.atlasRegions,"Textured"):"none";this.instanced=S&&a.instanced;var s=n.shaderVariators.MaterialNormal.getProgram([o,a.flipV,!!this.instanced,!!a.vvSizeEnabled,!!a.vvRotationEnabled]),l=A(a.transparent,a.writeStencil);i.singleTextureGLMaterialConstructor(this,r,a),this.beginSlot=function(e){return l===e},this.getProgram=function(){return s},this.updateParameters=function(){var e=t.getParams();a.initTexture=e.initTexture,a.cullFace=e.cullFace,a.inverseWindingOrder=e.inverseWindingOrder,a.flipV=e.flipV,c(a,e),this.updateTexture(e.textureId)},this.bind=function(e,t){var i=e.gl;e.bindProgram(s),this.bindTexture(e,s),s.setUniformMatrix4fv("viewNormal",t.viewInvTransp),f(s,a),T(e,a),a.inverseWindingOrder&&e.setFrontFace(i.CW),e.setDepthTestEnabled(!0)},this.release=function(e){var t=e.gl;M(e,a),a.inverseWindingOrder&&e.setFrontFace(t.CCW)},this.bindView=function(e,t){i.bindView(t.origin,t.view,s)},this.bindInstance=function(e,t){s.setUniformMatrix4fv("model",t.transformation),s.setUniformMatrix4fv("modelNormal",t.transformationNormal)},this.getDrawMode=function(e){var t=e.gl;return t.TRIANGLES}},z=function(t,n,r,a){i.basicGLMaterialConstructor(this,t);var o=e.clone(t.getParams()),l=v.hasAttribute(t.getVertexBufferLayout(),"uv0")?(o.atlasRegions,"Textured"):"none";this.instanced=S&&o.instanced;var d=n.shaderVariators.MaterialHighlight.getProgram([l,o.flipV,!!this.instanced,!!o.vvSizeEnabled,!!o.vvRotationEnabled]),u=s.OPAQUE_MATERIAL;i.singleTextureGLMaterialConstructor(this,r,o),this.beginSlot=function(e){return u===e},this.getProgram=function(){return d},this.updateParameters=function(){var e=t.getParams();o.initTexture=e.initTexture,o.cullFace=e.cullFace,o.inverseWindingOrder=e.inverseWindingOrder,o.flipV=e.flipV,c(o,e),this.updateTexture(e.textureId)},this.bind=function(e,t){var i=e.gl;e.bindProgram(d),this.bindTexture(e,d),f(d,o),T(e,o),o.inverseWindingOrder&&e.setFrontFace(i.CW),e.setDepthTestEnabled(!0)},this.release=function(e){var t=e.gl;M(e,o),o.inverseWindingOrder&&e.setFrontFace(t.CW)},this.bindView=function(e,t){i.bindView(t.origin,t.view,d)},this.bindInstance=function(e,t){d.setUniformMatrix4fv("model",t.transformation),d.setUniformMatrix4fv("modelNormal",t.transformationNormal)},this.getDrawMode=function(e){var t=e.gl;return t.TRIANGLES}};return C.loadShaders=function(e,i,a,o){e._parse(t),S=o.extensions.angleInstancedArrays,o.extensions.shaderTextureLOD,o.extensions.standardDerivatives;var s=new r("phong",["vsPhong","fsPhong"],null,a,i,e,o);s.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]),s.addBinaryShaderSnippetSuffix("Refl","Refl",[!1,!0]),s.addDefine("Color","VERTEXCOLORS"),s.addDefine("FlipV","FLIPV"),s.addDefine("DoubleSided","DOUBLESIDED"),s.addDefine("Instanced","INSTANCED"),s.addDefine("InstColor","INSTANCEDCOLOR"),s.addDefine("ReceiveShadows","RECEIVE_SHADOWS"),s.addDefine("ReceiveSSAO","RECEIVE_SSAO"),s.addDefine("vvSize","VV_SIZE"),s.addDefine("vvColor","VV_COLOR"),s.addDefine("vvRotation","VV_ROTATION"),a.shaderVariators.Material=s;var d=new r("depth",["vsDepth","fsDepth"],null,a,i,e,o);d.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]),d.addDefine("FlipV","FLIPV"),d.addDefine("Instanced","INSTANCED"),d.addDefine("ShadowMap","BIAS_SHADOWMAP"),d.addDefine("vvSize","VV_SIZE"),d.addDefine("vvRotation","VV_ROTATION"),a.shaderVariators.MaterialDepth=d;var v=new r("normal",["vsNormal","fsNormal"],null,a,i,e,o);v.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]),v.addDefine("FlipV","FLIPV"),v.addDefine("Instanced","INSTANCED"),v.addDefine("vvSize","VV_SIZE"),v.addDefine("vvRotation","VV_ROTATION"),a.shaderVariators.MaterialNormal=v;var u=new r("highlight",["vsNormal","fsNormal"],null,a,i,e,o);u.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]),u.addDefine("FlipV","FLIPV"),u.addDefine("Instanced","INSTANCED"),u.addDefine("vvSize","VV_SIZE"),u.addDefine("vvRotation","VV_ROTATION"),a.shaderVariators.MaterialHighlight=u;var f=new n(o,e.vsDepth,e.fsDepth,l.Default3D,["BIAS_SHADOWMAP 1"]),c=new n(o,e.vsDepthTextured,e.fsDepthTextured,l.Default3D,["BIAS_SHADOWMAP 1"]),h=new n(o,e.vsDepth,e.fsDepth,l.Default3D),p=new n(o,e.vsDepthTextured,e.fsDepthTextured,l.Default3D),x=new n(o,e.vsNormal,e.fsNormal,l.Default3D),g=new n(o,e.vsNormalTextured,e.fsNormalTextured,l.Default3D),m=new n(o,e.vsHighlight,e.fsHighlight,l.Default3D),b=new n(o,e.vsHighlightTextured,e.fsHighlightTextured,l.Default3D);a.add("depthShadowMap",f),a.add("depthTexturedShadowMap",c),a.add("depth",h),a.add("depthTextured",p),a.add("normal",x),a.add("normalTextured",g),a.add("highlight",m),a.add("highlightTextured",b),i.add("fsDepth",{source:e.fsDepth}),i.add("fsDepthTextured",{source:e.fsDepthTextured}),i.add("fsDepthShadowMap",{source:e.fsDepthShadowMap,defines:["BIAS_SHADOWMAP 1"]}),i.add("fsDepthTexturedShadowMap",{source:e.fsDepthTextured,defines:["BIAS_SHADOWMAP 1"]}),i.add("vsDepth",{source:e.vsDepth}),i.add("fsNormal",{source:e.fsNormal})},C});