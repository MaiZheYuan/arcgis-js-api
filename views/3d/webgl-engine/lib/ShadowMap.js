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

define(["./Camera","./Util","./gl-matrix","../../../../core/Logger","../../../webgl/Texture","../../../webgl/FramebufferObject","../../../webgl/VertexArrayObject","../../../webgl/BufferObject","./DefaultVertexAttributeLocations","./DefaultVertexBufferLayouts","../../../webgl/Util"],function(e,t,a,r,i,o,n,s,c,l,d){var f=a.vec2d,h=a.vec3d,u=a.vec4d,v=a.mat3d,g=a.mat4d,m=a.mat4,p=r.getLogger("esri.views.3d.webgl-engine"),b=function(a,r){function b(e,a,r,i,o,n,s,c){f.set2(0,0,oe);var l;for(l=0;4>l;++l)f.add(oe,e[l],oe);for(f.scale(oe,.25),f.set2(0,0,ne),l=4;8>l;++l)f.add(ne,e[l],ne);f.scale(ne,.25),f.lerp(e[4],e[5],.5,se[0]),f.lerp(e[5],e[6],.5,se[1]),f.lerp(e[6],e[7],.5,se[2]),f.lerp(e[7],e[4],.5,se[3]);var d=0,h=f.dist2(se[0],oe);for(l=1;4>l;++l){var u=f.dist2(se[l],oe);h>u&&(h=u,d=l)}f.subtract(se[d],e[d+4],ce);var v=ce[0];ce[0]=-ce[1],ce[1]=v,f.subtract(ne,oe,le),f.lerp(ce,le,r),f.normalize(ce);var g,m;for(g=m=f.dot(f.subtract(e[0],oe,de),ce),l=1;8>l;++l){var p=f.dot(f.subtract(e[l],oe,de),ce);g>p?g=p:p>m&&(m=p)}f.set(oe,i),f.scale(ce,g-a,de),f.add(i,de,i);var b=-1,M=1,w=0,x=0;for(l=0;8>l;++l){f.subtract(e[l],i,fe),f.normalize(fe);var y=ce[0]*fe[1]-ce[1]*fe[0];y>0?y>b&&(b=y,w=l):M>y&&(M=y,x=l)}t.verify(b>0,"leftArea"),t.verify(0>M,"rightArea"),f.scale(ce,g,he),f.add(he,oe,he),f.scale(ce,m,ue),f.add(ue,oe,ue),ve[0]=-ce[1],ve[1]=ce[0];var T=t.rayRay2D(i,e[x],ue,f.add(ue,ve,de),1,o),E=t.rayRay2D(i,e[w],ue,de,1,n),D=t.rayRay2D(i,e[w],he,f.add(he,ve,de),1,s),R=t.rayRay2D(i,e[x],he,de,1,c);t.verify(T,"rayRay"),t.verify(E,"rayRay"),t.verify(D,"rayRay"),t.verify(R,"rayRay")}function M(e,t){return 3*t+e}function w(e,t){return h.set3(e[t],e[t+3],e[t+6],ge),ge}function x(e,t,a,r,i){f.scale(f.subtract(a,r,me),.5),pe[0]=me[0],pe[1]=me[1],pe[2]=0,pe[3]=me[1],pe[4]=-me[0],pe[5]=0,pe[6]=me[0]*me[0]+me[1]*me[1],pe[7]=me[0]*me[1]-me[1]*me[0],pe[8]=1,pe[M(0,2)]=-f.dot(w(pe,0),e),pe[M(1,2)]=-f.dot(w(pe,1),e);var o=f.dot(w(pe,0),a)+pe[M(0,2)],n=f.dot(w(pe,1),a)+pe[M(1,2)],s=f.dot(w(pe,0),r)+pe[M(0,2)],c=f.dot(w(pe,1),r)+pe[M(1,2)];o=-(o+s)/(n+c),pe[M(0,0)]+=pe[M(1,0)]*o,pe[M(0,1)]+=pe[M(1,1)]*o,pe[M(0,2)]+=pe[M(1,2)]*o,o=1/(f.dot(w(pe,0),a)+pe[M(0,2)]),n=1/(f.dot(w(pe,1),a)+pe[M(1,2)]),pe[M(0,0)]*=o,pe[M(0,1)]*=o,pe[M(0,2)]*=o,pe[M(1,0)]*=n,pe[M(1,1)]*=n,pe[M(1,2)]*=n,pe[M(2,0)]=pe[M(1,0)],pe[M(2,1)]=pe[M(1,1)],pe[M(2,2)]=pe[M(1,2)],pe[M(1,2)]+=1,o=f.dot(w(pe,1),t)+pe[M(1,2)],n=f.dot(w(pe,2),t)+pe[M(2,2)],s=f.dot(w(pe,1),a)+pe[M(1,2)],c=f.dot(w(pe,2),a)+pe[M(2,2)],o=-.5*(o/n+s/c),pe[M(1,0)]+=pe[M(2,0)]*o,pe[M(1,1)]+=pe[M(2,1)]*o,pe[M(1,2)]+=pe[M(2,2)]*o,o=f.dot(w(pe,1),t)+pe[M(1,2)],n=f.dot(w(pe,2),t)+pe[M(2,2)],s=-n/o,pe[M(1,0)]*=s,pe[M(1,1)]*=s,pe[M(1,2)]*=s,i[0]=pe[0],i[1]=pe[1],i[2]=0,i[3]=pe[2],i[4]=pe[3],i[5]=pe[4],i[6]=0,i[7]=pe[5],i[8]=0,i[9]=0,i[10]=1,i[11]=0,i[12]=pe[6],i[13]=pe[7],i[14]=0,i[15]=pe[8]}var y,T,E=r,D=r.gl,R=!1,A=4096,S=new i(E,{target:D.TEXTURE_2D,pixelFormat:D.RGBA,dataType:D.UNSIGNED_BYTE,samplingMode:D.NEAREST,width:4,height:4}),U=1,B=2,_=[0,0,0,0,0];this.dispose=function(){S.dispose(),S=null};var j,C,F,N=function(){this.camera=new e,this.lightMat=g.create()},I=[];for(j=0;4>j;++j)I[j]=new N;this.getIsSupported=function(){return E.extensions.standardDerivatives},this.setTextureResolution=function(e){A=e},this.getTextureResolution=function(){return A},this.setMaxNumCascades=function(e){B=t.clamp(Math.floor(e),1,4)},this.getMaxNumCascades=function(){return B},this.setEnableState=function(e){e?this.enable():this.disable()},this.getEnableState=function(){return void 0!==y},this.getDepthTexture=function(){return y},this.enable=function(){if(!this.getEnableState()){if(!this.getIsSupported())return void p.warn("Shadow maps are not supported for this browser or hardware");var e={target:D.TEXTURE_2D,pixelFormat:D.RGBA,dataType:D.UNSIGNED_BYTE,wrapMode:D.CLAMP_TO_EDGE,samplingMode:D.NEAREST,flipped:!0,width:A,height:A};y=new i(E,e),T=o.createWithAttachments(E,y,{colorTarget:0,depthStencilTarget:1,width:A,height:A})}},this.disable=function(){this.getEnableState()&&T&&(T.dispose(),T=void 0,y=void 0)};var V=g.create(),L=g.create(),P=u.create(),O=new Array(8);for(j=0;8>j;++j)O[j]=u.create();var G=h.create(),z=h.create(),W=f.create(),H=f.create(),X=f.create(),Y=f.create(),k=f.create(),q=g.create(),Q=h.create();this.prepare=function(e,a,i,o,n){t.assert(this.getEnableState()),g.multiply(e.projectionMatrix,e.viewMatrix,V);var s=n[0],c=n[1];2>s&&(s=2),2>c&&(c=2),s>=c&&(s=2,c=4),U=Math.min(1+Math.floor(t.logWithBase(c/s,4)),B);for(var l=Math.pow(c/s,1/U),d=0;U+1>d;++d)_[d]=s*Math.pow(l,d);g.inverse(V,L),g.lookAt([0,0,0],[-a[0],-a[1],-a[2]],[0,1,0],q);var f=e.viewMatrix,v=e.projectionMatrix;for(d=0;U>d;++d){var m=I[d],p=-_[d],M=-_[d+1],w=(v[10]*p+v[14])/Math.abs(v[11]*p+v[15]),y=(v[10]*M+v[14])/Math.abs(v[11]*M+v[15]);for(t.assert(y>w),C=0;8>C;++C){var R=C%4===0||C%4==3?-1:1,S=C%4===0||C%4==1?-1:1,j=4>C?w:y;for(u.set4(R,S,j,1,P),g.multiplyVec4(L,P,O[C]),F=0;3>F;++F)O[C][F]/=O[C][3]}for(h.negate(O[0],Q),g.translate(q,Q,m.camera.viewMatrix),C=0;8>C;++C)g.multiplyVec3(m.camera.viewMatrix,O[C]);for(h.set(O[0],G),h.set(O[0],z),C=1;8>C;++C)for(F=0;3>F;++F)G[F]=Math.min(G[F],O[C][F]),z[F]=Math.max(z[F],O[C][F]);G[2]-=200,z[2]+=200,m.camera.near=-z[2],m.camera.far=-G[2];var N=!0;if(N){s=1/O[0][3],c=1/O[4][3],t.assert(c>s);var J=s+Math.sqrt(s*c),K=Math.sin(Math.acos(f[2]*a[0]+f[6]*a[1]+f[10]*a[2]));J/=K,b(O,J,K,W,H,X,Y,k),x(W,H,Y,k,m.camera.projectionMatrix),m.camera.projectionMatrix[10]=2/(G[2]-z[2]),m.camera.projectionMatrix[14]=-(G[2]+z[2])/(G[2]-z[2])}else g.ortho(G[0],z[0],G[1],z[1],m.camera.near,m.camera.far,m.camera.projectionMatrix);g.multiply(m.camera.projectionMatrix,m.camera.viewMatrix,m.lightMat);var Z=A/2;m.camera.viewport[0]=d%2===0?0:Z,m.camera.viewport[1]=0===Math.floor(d/2)?0:Z,m.camera.viewport[2]=Z,m.camera.viewport[3]=Z}_[U]=100*c,E.bindFramebuffer(T),r.bindTexture(null,7),r.setClearColor(1,1,1,1),r.clear(D.COLOR_BUFFER_BIT|D.DEPTH_BUFFER_BIT),r.setBlendingEnabled(!1)};var J=[];this.getCascades=function(){for(var e=0;U>e;++e)J[e]=I[e];return J.length=U,J},this.finish=function(e){t.assert(this.getEnableState()),E.bindFramebuffer(e),R&&y.generateMipmap()},this.bind=function(e){var t=this.getEnableState();r.bindTexture(t?y:S,7),r.bindProgram(e),e.setUniform1i("depthTex",7),e.setUniform1f("depthHalfPixelSz",t?.5/A:-1),e.setUniform1i("shadowMapNum",U),e.setUniform4f("shadowMapDistance",_[0],_[1],_[2],_[3])},this.bindAll=function(e){for(var t=e.getProgramsUsingUniform("shadowMapDistance"),a=0;a<t.length;a++)this.bind(t[a])};var K=m.create(),Z=new Float32Array(64);this.bindView=function(e,t){if(this.getEnableState()){var a;for(m.translate(I[0].lightMat,t,K),a=0;16>a;++a)Z[a]=K[a];for(m.translate(I[1].lightMat,t,K),a=0;16>a;++a)Z[16+a]=K[a];for(m.translate(I[2].lightMat,t,K),a=0;16>a;++a)Z[32+a]=K[a];for(m.translate(I[3].lightMat,t,K),a=0;16>a;++a)Z[48+a]=K[a];e.setUniformMatrix4fv("shadowMapMatrix",Z)}};var $=0,ee=0,te=256,ae=256,re=new Float32Array(16);re[0]=$,re[1]=ee,re[2]=0,re[3]=0,re[4]=$+te,re[5]=ee,re[6]=1,re[7]=0,re[8]=$,re[9]=ee+ae,re[10]=0,re[11]=1,re[12]=$+te,re[13]=ee+ae,re[14]=1,re[15]=1;var ie=new n(r,c.Default3D,{geometry:l.Pos2Tex},{geometry:s.createVertex(r,D.STATIC_DRAW,re)});this.drawDebugQuad=function(e){t.assert(this.getEnableState());var i=a.get("showDepth");r.setDepthTestEnabled(!1),r.bindProgram(i),i.setUniformMatrix4fv("proj",e),i.setUniform1i("depthTex",0),r.bindTexture(y,0),r.bindVAO(ie),d.assertCompatibleVertexAttributeLocations(ie,i),r.drawArrays(D.TRIANGLE_STRIP,0,d.vertexCount(ie,"geometry")),r.setDepthTestEnabled(!0)};var oe=f.create(),ne=f.create(),se=[f.create(),f.create(),f.create(),f.create()],ce=f.create(),le=f.create(),de=f.create(),fe=f.create(),he=f.create(),ue=f.create(),ve=f.create(),ge=h.create(),me=f.create(),pe=v.create()};return b});