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

define([],function(){"use strict";function n(n,t,x){x=x||2;var i=t&&t.length,u=i?t[0]*x:n.length,v=e(n,0,u,x,!0),o=[];if(!v)return o;var y,l,p,a,h,s,c;if(i&&(v=f(n,t,v,x)),n.length>80*x){y=p=n[0],l=a=n[1];for(var Z=x;u>Z;Z+=x)h=n[Z],s=n[Z+1],y>h&&(y=h),l>s&&(l=s),h>p&&(p=h),s>a&&(a=s);c=Math.max(p-y,a-l)}return r(v,o,x,y,l,c),o}function e(n,e,t,r,x){var i,u;if(x===A(n,e,t,r)>0)for(i=e;t>i;i+=r)u=k(i,n[i],n[i+1],u);else for(i=t-r;i>=e;i-=r)u=k(i,n[i],n[i+1],u);return u&&d(u,u.next)&&(j(u),u=u.next),u}function t(n,e){if(!n)return n;e||(e=n);var t,r=n;do if(t=!1,r.steiner||!d(r,r.next)&&0!==g(r.prev,r,r.next))r=r.next;else{if(j(r),r=e=r.prev,r===r.next)return null;t=!0}while(t||r!==e);return e}function r(n,e,f,o,y,l,a){if(n){!a&&l&&p(n,o,y,l);for(var h,s,c=n;n.prev!==n.next;)if(h=n.prev,s=n.next,l?i(n,o,y,l):x(n))e.push(h.i/f),e.push(n.i/f),e.push(s.i/f),j(n),n=s.next,c=s.next;else if(n=s,n===c){a?1===a?(n=u(n,e,f),r(n,e,f,o,y,l,2)):2===a&&v(n,e,f,o,y,l):r(t(n),e,f,o,y,l,1);break}}}function x(n){var e=n.prev,t=n,r=n.next;if(g(e,t,r)>=0)return!1;for(var x=n.next.next;x!==n.prev;){if(c(e.x,e.y,t.x,t.y,r.x,r.y,x.x,x.y)&&g(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function i(n,e,t,r){var x=n.prev,i=n,u=n.next;if(g(x,i,u)>=0)return!1;for(var v=x.x<i.x?x.x<u.x?x.x:u.x:i.x<u.x?i.x:u.x,f=x.y<i.y?x.y<u.y?x.y:u.y:i.y<u.y?i.y:u.y,o=x.x>i.x?x.x>u.x?x.x:u.x:i.x>u.x?i.x:u.x,y=x.y>i.y?x.y>u.y?x.y:u.y:i.y>u.y?i.y:u.y,l=h(v,f,e,t,r),p=h(o,y,e,t,r),a=n.nextZ;a&&a.z<=p;){if(a!==n.prev&&a!==n.next&&c(x.x,x.y,i.x,i.y,u.x,u.y,a.x,a.y)&&g(a.prev,a,a.next)>=0)return!1;a=a.nextZ}for(a=n.prevZ;a&&a.z>=l;){if(a!==n.prev&&a!==n.next&&c(x.x,x.y,i.x,i.y,u.x,u.y,a.x,a.y)&&g(a.prev,a,a.next)>=0)return!1;a=a.prevZ}return!0}function u(n,e,t){var r=n;do{var x=r.prev,i=r.next.next;!d(x,i)&&w(x,r,r.next,i)&&b(x,i)&&b(i,x)&&(e.push(x.i/t),e.push(r.i/t),e.push(i.i/t),j(r),j(r.next),r=n=i),r=r.next}while(r!==n);return r}function v(n,e,x,i,u,v){var f=n;do{for(var o=f.next.next;o!==f.prev;){if(f.i!==o.i&&Z(f,o)){var y=m(f,o);return f=t(f,f.next),y=t(y,y.next),r(f,e,x,i,u,v),void r(y,e,x,i,u,v)}o=o.next}f=f.next}while(f!==n)}function f(n,r,x,i){var u,v,f,l,p,a=[];for(u=0,v=r.length;v>u;u++)f=r[u]*i,l=v-1>u?r[u+1]*i:n.length,p=e(n,f,l,i,!1),p===p.next&&(p.steiner=!0),a.push(s(p));for(a.sort(o),u=0;u<a.length;u++)y(a[u],x),x=t(x,x.next);return x}function o(n,e){return n.x-e.x}function y(n,e){if(e=l(n,e)){var r=m(e,n);t(r,r.next)}}function l(n,e){var t,r=e,x=n.x,i=n.y,u=-(1/0);do{if(i<=r.y&&i>=r.next.y){var v=r.x+(i-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(x>=v&&v>u){if(u=v,v===x){if(i===r.y)return r;if(i===r.next.y)return r.next}t=r.x<r.next.x?r:r.next}}r=r.next}while(r!==e);if(!t)return null;if(x===u)return t.prev;var f,o=t,y=t.x,l=t.y,p=1/0;for(r=t.next;r!==o;)x>=r.x&&r.x>=y&&c(l>i?x:u,i,y,l,l>i?u:x,i,r.x,r.y)&&(f=Math.abs(i-r.y)/(x-r.x),(p>f||f===p&&r.x>t.x)&&b(r,n)&&(t=r,p=f)),r=r.next;return t}function p(n,e,t,r){var x=n;do null===x.z&&(x.z=h(x.x,x.y,e,t,r)),x.prevZ=x.prev,x.nextZ=x.next,x=x.next;while(x!==n);x.prevZ.nextZ=null,x.prevZ=null,a(x)}function a(n){var e,t,r,x,i,u,v,f,o=1;do{for(t=n,n=null,i=null,u=0;t;){for(u++,r=t,v=0,e=0;o>e&&(v++,r=r.nextZ,r);e++);for(f=o;v>0||f>0&&r;)0===v?(x=r,r=r.nextZ,f--):0!==f&&r?t.z<=r.z?(x=t,t=t.nextZ,v--):(x=r,r=r.nextZ,f--):(x=t,t=t.nextZ,v--),i?i.nextZ=x:n=x,x.prevZ=i,i=x;t=r}i.nextZ=null,o*=2}while(u>1);return n}function h(n,e,t,r,x){return n=32767*(n-t)/x,e=32767*(e-r)/x,n=16711935&(n|n<<8),n=252645135&(n|n<<4),n=858993459&(n|n<<2),n=1431655765&(n|n<<1),e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),n|e<<1}function s(n){var e=n,t=n;do e.x<t.x&&(t=e),e=e.next;while(e!==n);return t}function c(n,e,t,r,x,i,u,v){return(x-u)*(e-v)-(n-u)*(i-v)>=0&&(n-u)*(r-v)-(t-u)*(e-v)>=0&&(t-u)*(i-v)-(x-u)*(r-v)>=0}function Z(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!z(n,e)&&b(n,e)&&b(e,n)&&M(n,e)}function g(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function d(n,e){return n.x===e.x&&n.y===e.y}function w(n,e,t,r){return d(n,e)&&d(t,r)||d(n,r)&&d(t,e)?!0:g(n,e,t)>0!=g(n,e,r)>0&&g(t,r,n)>0!=g(t,r,e)>0}function z(n,e){var t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&w(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function b(n,e){return g(n.prev,n,n.next)<0?g(n,e,n.next)>=0&&g(n,n.prev,e)>=0:g(n,e,n.prev)<0||g(n,n.next,e)<0}function M(n,e){var t=n,r=!1,x=(n.x+e.x)/2,i=(n.y+e.y)/2;do t.y>i!=t.next.y>i&&x<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(r=!r),t=t.next;while(t!==n);return r}function m(n,e){var t=new q(n.i,n.x,n.y),r=new q(e.i,e.x,e.y),x=n.next,i=e.prev;return n.next=e,e.prev=n,t.next=x,x.prev=t,r.next=t,t.prev=r,i.next=r,r.prev=i,r}function k(n,e,t,r){var x=new q(n,e,t);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function j(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function q(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function A(n,e,t,r){for(var x=0,i=e,u=t-r;t>i;i+=r)x+=(n[u]-n[i])*(n[i+1]+n[u+1]),u=i;return x}return n.deviation=function(n,e,t,r){var x=e&&e.length,i=x?e[0]*t:n.length,u=Math.abs(A(n,0,i,t));if(x)for(var v=0,f=e.length;f>v;v++){var o=e[v]*t,y=f-1>v?e[v+1]*t:n.length;u-=Math.abs(A(n,o,y,t))}var l=0;for(v=0;v<r.length;v+=3){var p=r[v]*t,a=r[v+1]*t,h=r[v+2]*t;l+=Math.abs((n[p]-n[h])*(n[a+1]-n[p+1])-(n[p]-n[a])*(n[h+1]-n[p+1]))}return 0===u&&0===l?0:Math.abs((l-u)/u)},n.flatten=function(n){for(var e=n[0][0].length,t={vertices:[],holes:[],dimensions:e},r=0,x=0;x<n.length;x++){for(var i=0;i<n[x].length;i++)for(var u=0;e>u;u++)t.vertices.push(n[x][i][u]);x>0&&(r+=n[x-1].length,t.holes.push(r))}return t},n});