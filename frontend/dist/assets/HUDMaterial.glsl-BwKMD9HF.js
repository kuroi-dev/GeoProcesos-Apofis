import{uV as kt,C_ as Nt,Co as Wt,c3 as Yt,yD as Xt,C$ as Kt,uX as Zt,aP as wt,tU as Qt,pk as Jt,D0 as eo,D1 as to,D2 as oo,oU as We,rT as no,cX as so,D3 as io,D4 as ao,D5 as ro,Cl as lo,Cm as co,Cn as uo,c9 as bt,ll as fo,eP as oe,eG as re,c5 as Je,c2 as _,c4 as yt,cx as L,eJ as G,eK as q,eA as Ye,cw as ne,eC as po,eM as W,cn as k,CC as ho,eT as vo,fp as go,pv as mo,fm as Xe,nr as Ke,yz as xo,l8 as wo,lD as bo,_ as yo,n1 as et,L as E,lm as tt,lw as Pt,c8 as $t,eB as be,eS as St,cG as Po,iT as $o,fC as ot,pu as zt,nI as Ve,lx as So,ln as zo,lz as Ct,co as Co}from"./index-mJToMGYU.js";import{t as nt,r as H,n as Y}from"./vec3f32-WCVSSNPR.js";import{aW as Oo,n as X,m as K,aX as st,aH as Ot,D as Ao,ax as Do,aq as Ze,r as Be,a6 as De,aY as Mo,af as Vo,aL as At,aZ as Dt,as as To,K as jo,ap as Mt,i as _o,a_ as Fo,G as Ro,H as Eo,M as Uo,al as it,L as _e,b as at,aI as Io,a2 as te,ai as Ho,a as Bo,j as Go,k as Lo,T as qo,W as Vt,X as ko,Y as No,x as U,A as Wo,a$ as Fe,t as Yo,b0 as Xo,b1 as Ko,b2 as Zo,aB as Qo,b3 as Jo,b4 as en,b5 as tn,b6 as rt,b7 as on,b8 as lt,b9 as ct,ba as nn,aD as sn}from"./OutputColorHighlightOID.glsl-zytNlfh_.js";import{A as an,U as Tt}from"./Indices-BUPqBBDU.js";import{t as D}from"./orientedBoundingBox-Ce5r1C6A.js";import{s as jt,g as rn}from"./BufferView-B3Rf-tUP.js";import{Q as _t,t as ln}from"./InterleavedLayout-BxNvt3sV.js";import{T as cn,d as un,c as fn}from"./renderState-CKc66y4x.js";import{t as pn}from"./VertexAttributeLocations-BfZbt_DV.js";import{t as $,n as I}from"./glsl-B5bJgrnA.js";import{s as dn}from"./ShaderBuilder-Xr8VjdOE.js";function ps(o,e){if(o.type==="point")return ee(o,e,!1);if(Kt(o))switch(o.type){case"extent":return ee(o.center,e,!1);case"polygon":return ee(ft(o),e,!1);case"polyline":return ee(ut(o),e,!0);case"mesh":return ee(Zt(o.vertexSpace,o.spatialReference)??o.extent.center,e,!1);case"multipoint":return}else switch(o.type){case"extent":return ee(hn(o),e,!0);case"polygon":return ee(ft(o),e,!0);case"polyline":return ee(ut(o),e,!0);case"multipoint":return}}function ut(o){const e=o.paths[0];if(!e||e.length===0)return null;const n=to(e,oo(e)/2);return We(n[0],n[1],n[2],o.spatialReference)}function hn(o){return We(.5*(o.xmax+o.xmin),.5*(o.ymax+o.ymin),o.zmin!=null&&o.zmax!=null&&isFinite(o.zmin)&&isFinite(o.zmax)?.5*(o.zmax+o.zmin):void 0,o.spatialReference)}function ft(o){const e=o.rings[0];if(!e||e.length===0)return null;const n=no(o.rings,!!o.hasZ);return We(n[0],n[1],n[2],o.spatialReference)}function ee(o,e,n){const t=n?o:Jt(o);return e&&o?eo(o,t,e)?t:null:t}function ds(o,e,n,t=0){if(o){e||(e=wt());const s=o;let a=.5*s.width*(n-1),i=.5*s.height*(n-1);return s.width<1e-7*s.height?a+=i/20:s.height<1e-7*s.width&&(i+=a/20),Qt(e,s.xmin-a-t,s.ymin-i-t,s.xmax+a+t,s.ymax+i+t),e}return null}function hs(o,e,n=null){const t=Nt(Xt);return o!=null&&(t[0]=o[0],t[1]=o[1],t[2]=o[2],o.length>3&&(t[3]=o[3])),e!=null&&(t[3]=e),n&&Wt(t,t,n),t}function vs(o=kt,e,n,t=1){const s=new Array(3);if(e==null||n==null)s[0]=1,s[1]=1,s[2]=1;else{let a,i=0;for(let r=2;r>=0;r--){const l=o[r],c=l!=null,u=r===0&&!a&&!c,p=n[r];let h;l==="symbol-value"||u?h=p!==0?e[r]/p:1:c&&l!=="proportional"&&isFinite(l)&&(h=p!==0?l/p:1),h!=null&&(s[r]=h,a=h,i=Math.max(i,Math.abs(h)))}for(let r=2;r>=0;r--)s[r]==null?s[r]=a:s[r]===0&&(s[r]=.001*i)}for(let a=2;a>=0;a--)s[a]/=t;return Yt(s)}function vn(o){return o.isPrimitive!=null}function gs(o){return gn(vn(o)?[o.width,o.depth,o.height]:o)?null:"Symbol sizes may not be negative values"}function gn(o){const e=n=>n==null||n>=0;return Array.isArray(o)?o.every(e):e(o)}function ms(o,e,n,t=bt()){return o&&lo(t,t,-o/180*Math.PI),e&&co(t,t,e/180*Math.PI),n&&uo(t,t,n/180*Math.PI),t}function xs(o,e,n){if(n.minDemResolution!=null)return n.minDemResolution;const t=so(e),s=io(o)*t,a=ao(o)*t,i=ro(o)*(e.isGeographic?1:t);return s===0&&a===0&&i===0?n.minDemResolutionForPoints:.01*Math.max(s,a,i)}function pt(o,e){const n=o[e],t=o[e+1],s=o[e+2];return Math.sqrt(n*n+t*t+s*s)}function mn(o,e){const n=o[e],t=o[e+1],s=o[e+2],a=1/Math.sqrt(n*n+t*t+s*s);o[e]*=a,o[e+1]*=a,o[e+2]*=a}function dt(o,e,n){o[e]*=n,o[e+1]*=n,o[e+2]*=n}function xn(o,e,n,t,s,a=e){(s=s||o)[a]=o[e]+n[t],s[a+1]=o[e+1]+n[t+1],s[a+2]=o[e+2]+n[t+2]}function wn(){return ht??=bn(),ht}function bn(){const n=new D([0,0,0,255,255,0,255,255],[0,1,2,3],2,!0);return new Oo([["uv0",n]])}let ht=null;const Re=[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5]],yn=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],Pn=[0,0,1,0,1,1,0,1],$n=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],Ft=new Array(36);for(let o=0;o<6;o++)for(let e=0;e<6;e++)Ft[6*o+e]=o;const ie=new Array(36);for(let o=0;o<6;o++)ie[6*o]=0,ie[6*o+1]=1,ie[6*o+2]=2,ie[6*o+3]=2,ie[6*o+4]=3,ie[6*o+5]=0;function ws(o,e){Array.isArray(e)||(e=[e,e,e]);const n=new Array(24);for(let t=0;t<8;t++)n[3*t]=Re[t][0]*e[0],n[3*t+1]=Re[t][1]*e[1],n[3*t+2]=Re[t][2]*e[2];return new K(o,[["position",new D(n,$n,3,!0)],["normal",new D(yn,Ft,3)],["uv0",new D(Pn,ie,2)]])}const Ee=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[0,-.5,0],[0,.5,0]],Sn=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],zn=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],Cn=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];function bs(o,e){Array.isArray(e)||(e=[e,e,e]);const n=new Array(18);for(let t=0;t<6;t++)n[3*t]=Ee[t][0]*e[0],n[3*t+1]=Ee[t][1]*e[1],n[3*t+2]=Ee[t][2]*e[2];return new K(o,[["position",new D(n,zn,3,!0)],["normal",new D(Sn,Cn,3)]])}const $e=H(-.5,0,-.5),Se=H(.5,0,-.5),ze=H(0,0,.5),Ce=H(0,.5,0),ce=Y(),ue=Y(),pe=Y(),de=Y(),he=Y();W(ce,$e,Ce),W(ue,$e,Se),ne(pe,ce,ue),L(pe,pe),W(ce,Se,Ce),W(ue,Se,ze),ne(de,ce,ue),L(de,de),W(ce,ze,Ce),W(ue,ze,$e),ne(he,ce,ue),L(he,he);const Ue=[$e,Se,ze,Ce],On=[0,-1,0,pe[0],pe[1],pe[2],de[0],de[1],de[2],he[0],he[1],he[2]],An=[0,1,2,3,1,0,3,2,1,3,0,2],Dn=[0,0,0,1,1,1,2,2,2,3,3,3];function ys(o,e){Array.isArray(e)||(e=[e,e,e]);const n=new Array(12);for(let t=0;t<4;t++)n[3*t]=Ue[t][0]*e[0],n[3*t+1]=Ue[t][1]*e[1],n[3*t+2]=Ue[t][2]*e[2];return new K(o,[["position",new D(n,An,3,!0)],["normal",new D(On,Dn,3)]])}function Ps(o,e,n,t,s={uv:!0}){const a=-Math.PI,i=2*Math.PI,r=-Math.PI/2,l=Math.PI,c=Math.max(3,Math.floor(n)),u=Math.max(2,Math.floor(t)),p=(c+1)*(u+1),h=X(3*p),b=X(3*p),y=X(2*p),m=[];let d=0;for(let x=0;x<=u;x++){const O=[],f=x/u,z=r+f*l,C=Math.cos(z);for(let P=0;P<=c;P++){const B=P/c,w=a+B*i,T=Math.cos(w)*C,V=Math.sin(z),Z=-Math.sin(w)*C;h[3*d]=T*e,h[3*d+1]=V*e,h[3*d+2]=Z*e,b[3*d]=T,b[3*d+1]=V,b[3*d+2]=Z,y[2*d]=B,y[2*d+1]=f,O.push(d),++d}m.push(O)}const v=new Array;for(let x=0;x<u;x++)for(let O=0;O<c;O++){const f=m[x][O],z=m[x][O+1],C=m[x+1][O+1],P=m[x+1][O];x===0?(v.push(f),v.push(C),v.push(P)):x===u-1?(v.push(f),v.push(z),v.push(C)):(v.push(f),v.push(z),v.push(C),v.push(C),v.push(P),v.push(f))}const g=[["position",new D(h,v,3,!0)],["normal",new D(b,v,3,!0)]];return s.uv&&g.push(["uv0",new D(y,v,2,!0)]),s.offset&&(g[0][0]="offset",g.push(["position",new D(Float64Array.from(s.offset),Tt(v.length),3,!0)])),new K(o,g)}function $s(o,e,n,t){const s=Mn(e,n);return new K(o,s)}function Mn(o,e,n){let t,s;t=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],s=[0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1];for(let l=0;l<t.length;l+=3)dt(t,l,o/pt(t,l));let a={};function i(l,c){l>c&&([l,c]=[c,l]);const u=l.toString()+"."+c.toString();if(a[u])return a[u];let p=t.length;return t.length+=3,xn(t,3*l,t,3*c,t,p),dt(t,p,o/pt(t,p)),p/=3,a[u]=p,p}for(let l=0;l<e;l++){const c=s.length,u=new Array(4*c);for(let p=0;p<c;p+=3){const h=s[p],b=s[p+1],y=s[p+2],m=i(h,b),d=i(b,y),v=i(y,h),g=4*p;u[g]=h,u[g+1]=m,u[g+2]=v,u[g+3]=b,u[g+4]=d,u[g+5]=m,u[g+6]=y,u[g+7]=v,u[g+8]=d,u[g+9]=m,u[g+10]=d,u[g+11]=v}s=u,a={}}const r=st(t);for(let l=0;l<r.length;l+=3)mn(r,l);return[["position",new D(st(t),s,3,!0)],["normal",new D(r,s,3,!0)]]}function Ss(o,{normal:e,position:n,color:t,rotation:s,size:a,centerOffsetAndDistance:i,uvi:r,featureAttribute:l,olidColor:c=null}={}){const u=n?Je(n):_(),p=e?Je(e):yt(0,0,1),h=t?[t[0],t[1],t[2],t.length>3?t[3]:255]:[255,255,255,255],b=a!=null&&a.length===2?a:[1,1],y=s!=null?[s]:[0],m=Tt(1),d=[["position",new D(u,m,3,!0)],["normal",new D(p,m,3,!0)],["color",new D(h,m,4,!0)],["size",new D(b,m,2)],["rotation",new D(y,m,1,!0)]];if(r&&d.push(["uvi",new D(r,m,r.length)]),i!=null){const v=[i[0],i[1],i[2],i[3]];d.push(["centerOffsetAndDistance",new D(v,m,4)])}if(l){const v=[l[0],l[1],l[2],l[3]];d.push(["featureAttribute",new D(v,m,4)])}return new K(o,d,null,1,c,void 0,wn())}function Vn(o,e,n,t,s=!0,a=!0){let i=0;const r=e,l=o;let c=H(0,i,0),u=H(0,i+l,0),p=H(0,-1,0),h=H(0,1,0);t&&(i=l,u=H(0,0,0),c=H(0,i,0),p=H(0,1,0),h=H(0,-1,0));const b=[u,c],y=[p,h],m=n+2,d=Math.sqrt(l*l+r*r);if(t)for(let f=n-1;f>=0;f--){const z=f*(2*Math.PI/n),C=H(Math.cos(z)*r,i,Math.sin(z)*r);b.push(C);const P=H(l*Math.cos(z)/d,-r/d,l*Math.sin(z)/d);y.push(P)}else for(let f=0;f<n;f++){const z=f*(2*Math.PI/n),C=H(Math.cos(z)*r,i,Math.sin(z)*r);b.push(C);const P=H(l*Math.cos(z)/d,r/d,l*Math.sin(z)/d);y.push(P)}const v=new Array,g=new Array;if(s){for(let f=3;f<b.length;f++)v.push(1),v.push(f-1),v.push(f),g.push(0),g.push(0),g.push(0);v.push(b.length-1),v.push(2),v.push(1),g.push(0),g.push(0),g.push(0)}if(a){for(let f=3;f<b.length;f++)v.push(f),v.push(f-1),v.push(0),g.push(f),g.push(f-1),g.push(1);v.push(0),v.push(2),v.push(b.length-1),g.push(1),g.push(2),g.push(y.length-1)}const x=X(3*m);for(let f=0;f<m;f++)x[3*f]=b[f][0],x[3*f+1]=b[f][1],x[3*f+2]=b[f][2];const O=X(3*m);for(let f=0;f<m;f++)O[3*f]=y[f][0],O[3*f+1]=y[f][1],O[3*f+2]=y[f][2];return[["position",new D(x,v,3,!0)],["normal",new D(O,g,3,!0)]]}function zs(o,e,n,t,s,a=!0,i=!0){return new K(o,Vn(e,n,t,s,a,i))}function Cs(o,e,n,t,s,a,i){const r=s?nt(s):H(1,0,0),l=a?nt(a):H(0,0,0);i??=!0;const c=Y();L(c,r);const u=Y();G(u,c,Math.abs(e));const p=Y();G(p,u,-.5),q(p,p,l);const h=H(0,1,0);Math.abs(1-Ye(c,h))<.2&&oe(h,0,0,1);const b=Y();ne(b,c,h),L(b,b),ne(h,b,c);const y=2*t+(i?2:0),m=t+(i?2:0),d=X(3*y),v=X(3*m),g=X(2*y),x=new Array(3*t*(i?4:2)),O=new Array(3*t*(i?4:2));i&&(d[3*(y-2)]=p[0],d[3*(y-2)+1]=p[1],d[3*(y-2)+2]=p[2],g[2*(y-2)]=0,g[2*(y-2)+1]=0,d[3*(y-1)]=d[3*(y-2)]+u[0],d[3*(y-1)+1]=d[3*(y-2)+1]+u[1],d[3*(y-1)+2]=d[3*(y-2)+2]+u[2],g[2*(y-1)]=1,g[2*(y-1)+1]=1,v[3*(m-2)]=-c[0],v[3*(m-2)+1]=-c[1],v[3*(m-2)+2]=-c[2],v[3*(m-1)]=c[0],v[3*(m-1)+1]=c[1],v[3*(m-1)+2]=c[2]);const f=(w,T,V)=>{x[w]=T,O[w]=V};let z=0;const C=Y(),P=Y();for(let w=0;w<t;w++){const T=w*(2*Math.PI/t);G(C,h,Math.sin(T)),G(P,b,Math.cos(T)),q(C,C,P),v[3*w]=C[0],v[3*w+1]=C[1],v[3*w+2]=C[2],G(C,C,n),q(C,C,p),d[3*w]=C[0],d[3*w+1]=C[1],d[3*w+2]=C[2],g[2*w]=w/t,g[2*w+1]=0,d[3*(w+t)]=d[3*w]+u[0],d[3*(w+t)+1]=d[3*w+1]+u[1],d[3*(w+t)+2]=d[3*w+2]+u[2],g[2*(w+t)]=w/t,g[2*w+1]=1;const V=(w+1)%t;f(z++,w,w),f(z++,w+t,w),f(z++,V,V),f(z++,V,V),f(z++,w+t,w),f(z++,V+t,V)}if(i){for(let w=0;w<t;w++){const T=(w+1)%t;f(z++,y-2,m-2),f(z++,w,m-2),f(z++,T,m-2)}for(let w=0;w<t;w++){const T=(w+1)%t;f(z++,w+t,m-1),f(z++,y-1,m-1),f(z++,T+t,m-1)}}const B=[["position",new D(d,x,3,!0)],["normal",new D(v,O,3,!0)],["uv0",new D(g,x,2,!0)]];return new K(o,B)}function Os(o,e,n,t,s,a){t=t||10,s=s==null||s,jt(e.length>1);const i=[[0,0,0]],r=[],l=[];for(let c=0;c<t;c++){r.push([0,-c-1,-(c+1)%t-1]);const u=c/t*2*Math.PI;l.push([Math.cos(u)*n,Math.sin(u)*n])}return Tn(o,l,e,i,r,s,a)}function Tn(o,e,n,t,s,a,i=H(0,0,0)){const r=e.length,l=X(n.length*r*3+(6*t.length||0)),c=X(n.length*r*3+(t?6:0)),u=new Array,p=new Array;let h=0,b=0;const y=_(),m=_(),d=_(),v=_(),g=_(),x=_(),O=_(),f=_(),z=_(),C=_(),P=_(),B=_(),w=_(),T=po();oe(z,0,1,0),W(m,n[1],n[0]),L(m,m),a?(q(f,n[0],i),L(d,f)):oe(d,0,0,1),vt(m,d,z,z,g,d,gt),k(v,d),k(B,g);for(let S=0;S<t.length;S++)G(x,g,t[S][0]),G(f,d,t[S][2]),q(x,x,f),q(x,x,n[0]),l[h++]=x[0],l[h++]=x[1],l[h++]=x[2];c[b++]=-m[0],c[b++]=-m[1],c[b++]=-m[2];for(let S=0;S<s.length;S++)u.push(s[S][0]>0?s[S][0]:-s[S][0]-1+t.length),u.push(s[S][1]>0?s[S][1]:-s[S][1]-1+t.length),u.push(s[S][2]>0?s[S][2]:-s[S][2]-1+t.length),p.push(0),p.push(0),p.push(0);let V=t.length;const Z=t.length-1;for(let S=0;S<n.length;S++){let me=!1;S>0&&(k(y,m),S<n.length-1?(W(m,n[S+1],n[S]),L(m,m)):me=!0,q(C,y,m),L(C,C),q(P,n[S-1],v),ho(n[S],C,T),vo(T,go(P,y),f)?(W(f,f,n[S]),L(d,f),ne(g,C,d),L(g,g)):vt(C,v,B,z,g,d,gt),k(v,d),k(B,g)),a&&(q(f,n[S],i),L(w,f));for(let J=0;J<r;J++)if(G(x,g,e[J][0]),G(f,d,e[J][1]),q(x,x,f),L(O,x),c[b++]=O[0],c[b++]=O[1],c[b++]=O[2],q(x,x,n[S]),l[h++]=x[0],l[h++]=x[1],l[h++]=x[2],!me){const Te=(J+1)%r;u.push(V+J),u.push(V+r+J),u.push(V+Te),u.push(V+Te),u.push(V+r+J),u.push(V+r+Te);for(let je=0;je<6;je++){const qt=u.length-6;p.push(u[qt+je]-Z)}}V+=r}const le=n[n.length-1];for(let S=0;S<t.length;S++)G(x,g,t[S][0]),G(f,d,t[S][1]),q(x,x,f),q(x,x,le),l[h++]=x[0],l[h++]=x[1],l[h++]=x[2];const Q=b/3;c[b++]=m[0],c[b++]=m[1],c[b++]=m[2];const N=V-r;for(let S=0;S<s.length;S++)u.push(s[S][0]>=0?V+s[S][0]:-s[S][0]-1+N),u.push(s[S][2]>=0?V+s[S][2]:-s[S][2]-1+N),u.push(s[S][1]>=0?V+s[S][1]:-s[S][1]-1+N),p.push(Q),p.push(Q),p.push(Q);const se=[["position",new D(l,u,3,!0)],["normal",new D(c,p,3,!0)]];return new K(o,se)}function As(o,e,n,t,s){const a=fo(3*e.length),i=new Array(2*(e.length-1));let r=0,l=0;for(let u=0;u<e.length;u++){for(let p=0;p<3;p++)a[r++]=e[u][p];u>0&&(i[l++]=u-1,i[l++]=u)}const c=[["position",new D(a,i,3,!0)]];if(n&&n.length===e.length&&n[0].length===3){const u=X(3*n.length);let p=0;for(let h=0;h<e.length;h++)for(let b=0;b<3;b++)u[p++]=n[h][b];c.push(["normal",new D(u,i,3,!0)])}return t&&c.push(["color",new D(t,an(t.length/4),4)]),new K(o,c,null,2)}function Ds(o,e,n,t,s,a=0){const i=new Array(18),r=[[-n,a,s/2],[t,a,s/2],[0,e+a,s/2],[-n,a,-s/2],[t,a,-s/2],[0,e+a,-s/2]],l=[0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5];for(let c=0;c<6;c++)i[3*c]=r[c][0],i[3*c+1]=r[c][1],i[3*c+2]=r[c][2];return new K(o,[["position",new D(i,l,3,!0)]])}function Ms(o,e){const n=o.getMutableAttribute("position").data;for(let t=0;t<n.length;t+=3){const s=n[t],a=n[t+1],i=n[t+2];oe(fe,s,a,i),re(fe,fe,e),n[t]=fe[0],n[t+1]=fe[1],n[t+2]=fe[2]}}function Vs(o,e=o){const n=o.attributes,t=n.get("position").data,s=n.get("normal").data;if(s){const a=e.getMutableAttribute("normal").data;for(let i=0;i<s.length;i+=3){const r=s[i+1];a[i+1]=-s[i+2],a[i+2]=r}}if(t){const a=e.getMutableAttribute("position").data;for(let i=0;i<t.length;i+=3){const r=t[i+1];a[i+1]=-t[i+2],a[i+2]=r}}}function Ie(o,e,n,t,s){return!(Math.abs(Ye(e,o))>s)&&(ne(n,o,e),L(n,n),ne(t,n,o),L(t,t),!0)}function vt(o,e,n,t,s,a,i){return Ie(o,e,s,a,i)||Ie(o,n,s,a,i)||Ie(o,t,s,a,i)}const gt=.99619469809,fe=_();function jn(o){return o instanceof Float32Array&&o.length>=16}function _n(o){return Array.isArray(o)&&o.length>=16}function Fn(o){return jn(o)||_n(o)}const Rt=.5;function Rn(o,e){o.include(Ot),o.attributes.add("position","vec3"),o.attributes.add("normal","vec3"),o.attributes.add("centerOffsetAndDistance","vec4");const n=o.vertex;Ao(n,e),Do(n,e),n.uniforms.add(new Ze("viewport",t=>t.camera.fullViewport),new Be("polygonOffset",t=>t.shaderPolygonOffset),new De("cameraGroundRelative",t=>t.camera.aboveGround?1:-1)),e.hasVerticalOffset&&Mo(n),n.code.add($`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),n.code.add($`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${e.terrainDepthTest?$.float(0):$`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = cameraGroundRelative;
      }

      // cameraGroundRelative is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = cameraGroundRelative * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),e.draped&&!e.hasVerticalOffset||Vo(n),e.draped||(n.uniforms.add(new De("perDistancePixelRatio",t=>Math.tan(t.camera.fovY/2)/(t.camera.fullViewport[2]/2))),n.code.add($`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${$.float(Rt)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),e.screenCenterOffsetUnitsEnabled&&At(n),e.hasScreenSizePerspective&&Dt(n),n.code.add($`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${e.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${e.hasScreenSizePerspective&&(e.hasVerticalOffset||e.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${e.hasVerticalOffset?e.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${e.hasVerticalOffset?$`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${e.screenCenterOffsetUnitsEnabled?"":$`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${e.screenCenterOffsetUnitsEnabled?e.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${e.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function Qe(o){o.uniforms.add(new To("alignPixelEnabled",e=>e.alignPixelEnabled)),o.code.add($`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),o.code.add($`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}function En(o,e){const{vertex:n,fragment:t}=o;o.include(jo,e),n.include(Qe),n.main.add($`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),t.main.add($`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function Un(o){o.vertex.uniforms.add(new De("renderTransparentlyOccludedHUD",e=>e.hudRenderStyle===0?1:e.hudRenderStyle===1?0:.75),new Ze("viewport",e=>e.camera.fullViewport),new Mt("hudVisibilityTexture",e=>e.hudVisibility?.getTexture())),o.vertex.include(Qe),o.vertex.code.add($`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}class In extends _o{constructor(e,n,t){super(e,"vec4",2,(s,a,i)=>s.setUniform4fv(e,n(a,i),t))}}function Et(o){const e=new dn,{signedDistanceFieldEnabled:n,occlusionTestEnabled:t,horizonCullingEnabled:s,pixelSnappingEnabled:a,hasScreenSizePerspective:i,debugDrawLabelBorder:r,hasVVSize:l,hasVVColor:c,hasRotation:u,occludedFragmentFade:p,sampleSignedDistanceFieldTexelCenter:h}=o;e.include(Rn,o),e.vertex.include(Fo,o);const{occlusionPass:b,output:y,oitPass:m}=o;if(b)return e.include(En,o),e;const{vertex:d,fragment:v}=e;e.include(Ot),e.include(Ro,o),e.include(Eo,o),t&&e.include(Un),v.include(Uo),e.varyings.add("vcolor","vec4"),e.varyings.add("vtc","vec2"),e.varyings.add("vsize","vec2");const g=y===9,x=g&&t;x&&e.varyings.add("voccluded","float"),d.uniforms.add(new Ze("viewport",P=>P.camera.fullViewport),new it("screenOffset",(P,B)=>Ke(Oe,2*P.screenOffset[0]*B.camera.pixelRatio,2*P.screenOffset[1]*B.camera.pixelRatio)),new it("anchorPosition",P=>ge(P)),new _e("materialColor",P=>P.color),new Be("materialRotation",P=>P.rotation),new at("tex",P=>P.texture)),At(d),n&&(d.uniforms.add(new _e("outlineColor",P=>P.outlineColor)),v.uniforms.add(new _e("outlineColor",P=>mt(P)?P.outlineColor:xo),new Be("outlineSize",P=>mt(P)?P.outlineSize:0))),s&&d.uniforms.add(new In("pointDistanceSphere",(P,B)=>{const w=B.camera.eye,T=P.origin;return wo(T[0]-w[0],T[1]-w[1],T[2]-w[2],bo.radius)})),a&&d.include(Qe),i&&(Io(d),Dt(d)),r&&e.varyings.add("debugBorderCoords","vec4"),e.attributes.add("uv0","vec2"),e.attributes.add("uvi","vec4"),e.attributes.add("color","vec4"),e.attributes.add("size","vec2"),e.attributes.add("rotation","float"),(l||c)&&e.attributes.add("featureAttribute","vec4"),d.code.add(s?$`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:$`bool behindHorizon(vec3 posModel) { return false; }`),d.main.add($`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${I(i,$`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,$`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${I(l,$`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${I(t,$`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${I(r,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${I(x,$`voccluded = visible ? 0.0 : 1.0;`)}
  `);const O=$`
      vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
      vec2 texSize = vec2(textureSize(tex, 0));
      uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${Bn})));
      quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

      ${I(u,$`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,f=a?n?$`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:$`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:$`posProj += quadOffset;`;d.main.add($`
    ${O}
    ${c?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${I(y===10,$`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${$.float(te)};
    ${I(n,`alphaDiscard = alphaDiscard && outlineColor.a < ${$.float(te)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${f}
      gl_Position = posProj;
    }

    vtc = uv;

    ${I(r,$`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),v.uniforms.add(new at("tex",P=>P.texture)),p&&!g&&v.uniforms.add(new Mt("depthMap",P=>P.mainDepth),new De("occludedOpacity",P=>P.hudOccludedFragmentOpacity));const z=r?$`(isBorder > 0.0 ? 0.0 : ${$.float(te)})`:$.float(te),C=$`
    ${I(r,$`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${I(h,$`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${n?$`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${z} ||
          fillPixelColor.a + outlinePixelColor.a < ${$.float(te)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${I(!g,$`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${z}) {
          discard;
        }

        ${I(!g,$`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:$`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${z}) {
            discard;
          }
          ${I(!g,$`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${I(p&&!g,$`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${I(!g&&r,$`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(y){case 0:case 1:e.outputs.add("fragColor","vec4",0),y===1&&e.outputs.add("fragEmission","vec4",1),m===1&&e.outputs.add("fragAlpha","float",y===1?2:1),v.main.add($`
        ${C}
        ${I(m===2,$`fragColor.rgb /= fragColor.a;`)}
        ${I(y===1,$`fragEmission = vec4(0.0);`)}
        ${I(m===1,$`fragAlpha = fragColor.a;`)}`);break;case 10:v.main.add($`
        ${C}
        outputObjectAndLayerIdColor();`);break;case 9:e.include(Ho,o),v.main.add($`
        ${C}
        outputHighlight(${I(x,$`voccluded == 1.0`,$`false`)});`)}return e}function mt(o){return o.outlineColor[3]>0&&o.outlineSize>0}function ge(o){return o.textureIsSignedDistanceField?Hn(o.anchorPosition,o.distanceFieldBoundingBox,Oe):mo(Oe,o.anchorPosition),Oe}function Hn(o,e,n){Ke(n,o[0]*(e[2]-e[0])+e[0],o[1]*(e[3]-e[1])+e[1])}const Oe=Xe(),ye=32e3,Bn=$.float(ye),Gn=Object.freeze(Object.defineProperty({__proto__:null,build:Et,calculateAnchorPosition:ge,fullUV:ye},Symbol.toStringTag,{value:"Module"}));class Ln extends Go{constructor(e,n){super(e,n,new Lo(Gn,()=>yo(()=>Promise.resolve().then(()=>es),void 0)),pn([Ut,Ht()].map(ln))),this.primitiveType=n.occlusionPass?et.POINTS:et.TRIANGLE_STRIP}initializePipeline(e){const{oitPass:n,hasPolygonOffset:t,draped:s,output:a,depthTestEnabled:i,occlusionPass:r}=e,l=i&&!s&&n!==1&&!r&&a!==9;return cn({blending:Vt(a)?ko(n,!0):null,depthTest:i&&!s?{func:515}:null,depthWrite:l?fn:null,drawBuffers:qo(n,a),colorWrite:un,polygonOffset:t?qn:null})}}const qn={factor:0,units:-4},Ut=_t().vec2u8("uv0",{glNormalized:!0}),It=_t().vec3f("position").vec3f("normal").vec4i16("uvi").vec4u8("color").vec2f("size").f32("rotation").vec4f("centerOffsetAndDistance").vec4f("featureAttribute"),kn=It.clone().vec4u8("olidColor");function Ht(){return Bo()?kn:It}class F extends No{constructor(e){super(),this.spherical=e,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.olidColorInstanced=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.hasVVInstancing=!1,this.snowCover=!1}}E([U()],F.prototype,"screenCenterOffsetUnitsEnabled",void 0),E([U()],F.prototype,"occlusionTestEnabled",void 0),E([U()],F.prototype,"signedDistanceFieldEnabled",void 0),E([U()],F.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),E([U()],F.prototype,"hasVVSize",void 0),E([U()],F.prototype,"hasVVColor",void 0),E([U()],F.prototype,"hasVerticalOffset",void 0),E([U()],F.prototype,"hasScreenSizePerspective",void 0),E([U()],F.prototype,"hasRotation",void 0),E([U()],F.prototype,"debugDrawLabelBorder",void 0),E([U()],F.prototype,"hasPolygonOffset",void 0),E([U()],F.prototype,"depthTestEnabled",void 0),E([U()],F.prototype,"pixelSnappingEnabled",void 0),E([U()],F.prototype,"draped",void 0),E([U()],F.prototype,"terrainDepthTest",void 0),E([U()],F.prototype,"cullAboveTerrain",void 0),E([U()],F.prototype,"occlusionPass",void 0),E([U()],F.prototype,"occludedFragmentFade",void 0),E([U()],F.prototype,"horizonCullingEnabled",void 0),E([U()],F.prototype,"isFocused",void 0);class Ts extends Wo{constructor(e,n){super(e,Qn),this.produces=new Map([[13,t=>Fe(t)&&!this.parameters.drawAsLabel],[14,t=>Fe(t)&&this.parameters.drawAsLabel],[12,()=>this.parameters.occlusionTest],[18,t=>this.parameters.draped&&Fe(t)]]),this._visible=!0,this._configuration=new F(n)}getConfiguration(e,n){const t=this.parameters.draped;return super.getConfiguration(e,n,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits==="screen",this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=t,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.hasVVSize=!!this.parameters.vvSize,this._configuration.hasVVColor=!!this.parameters.vvColor,this._configuration.occlusionPass=n.slot===12,this._configuration.occludedFragmentFade=!t&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||n.slot===12,Vt(e)&&(this._configuration.debugDrawLabelBorder=!!Yo.LABELS_SHOW_BORDER),this._configuration.oitPass=n.oitPass,this._configuration.terrainDepthTest=n.terrainDepthTest,this._configuration.cullAboveTerrain=n.cullAboveTerrain,this._configuration}intersect(e,n,t,s,a,i){const{options:{selectionMode:r,hud:l,excludeLabels:c},point:u,camera:p}=t,{parameters:h}=this;if(!r||!l||c&&h.isLabel||!e.visible||!u||!p)return;const b=e.attributes.get("featureAttribute"),y=b==null?null:tt(b.data,qe),{scaleX:m,scaleY:d}=ke(y,h,p.pixelRatio);Pt(Ae,n),e.attributes.has("featureAttribute")&&Yn(Ae);const v=e.attributes.get("position"),g=e.attributes.get("size"),x=e.attributes.get("normal"),O=e.attributes.get("rotation"),f=e.attributes.get("centerOffsetAndDistance");jt(v.size>=3);const z=ge(h),C=this.parameters.centerOffsetUnits==="screen";for(let P=0;P<v.data.length/v.size;P++){const B=P*v.size;oe(A,v.data[B],v.data[B+1],v.data[B+2]),re(A,A,n),re(A,A,p.viewMatrix);const w=P*f.size;if(oe(j,f.data[w],f.data[w+1],f.data[w+2]),!C&&(A[0]+=j[0],A[1]+=j[1],j[2]!==0)){const V=j[2];L(j,A),W(A,A,G(j,j,V))}const T=P*x.size;if(oe(ae,x.data[T],x.data[T+1],x.data[T+2]),Ge(ae,Ae,p,we),Ne(this.parameters,A,we,p,ve),p.applyProjection(A,M),M[0]>-1){C&&(j[0]||j[1])&&(M[0]+=j[0]*p.pixelRatio,j[1]!==0&&(M[1]+=ve.alignmentEvaluator.apply(j[1])*p.pixelRatio),p.unapplyProjection(M,A)),M[0]+=this.parameters.screenOffset[0]*p.pixelRatio,M[1]+=this.parameters.screenOffset[1]*p.pixelRatio,M[0]=Math.floor(M[0]),M[1]=Math.floor(M[1]);const V=P*g.size;R[0]=g.data[V],R[1]=g.data[V+1],ve.evaluator.applyVec2(R,R);const Z=Lt*p.pixelRatio;let le=0;h.textureIsSignedDistanceField&&(le=Math.min(h.outlineSize,.5*R[0])*p.pixelRatio/2),R[0]*=m,R[1]*=d;const Q=P*O.size,N=h.rotation+O.data[Q];if(Le(u,M[0],M[1],R,Z,le,N,h,z)){const se=t.ray;if(re(Me,A,$t(Gt,p.viewMatrix)),M[0]=u[0],M[1]=u[1],p.unprojectFromRenderScreen(M,A)){const S=_();k(S,se.direction);const me=1/be(S);G(S,S,me),i(St(se.origin,A)*me,S,-1,Me)}}}}}intersectDraped(e,n,t,s,a){const i=e.attributes.get("position"),r=e.attributes.get("size"),l=e.attributes.get("rotation"),c=this.parameters,u=ge(c),p=e.attributes.get("featureAttribute"),h=p==null?null:tt(p.data,qe),{scaleX:b,scaleY:y}=ke(h,c,e.screenToWorldRatio),m=Kn*e.screenToWorldRatio;for(let d=0;d<i.data.length/i.size;d++){const v=d*i.size,g=i.data[v],x=i.data[v+1],O=d*r.size;R[0]=r.data[O],R[1]=r.data[O+1];let f=0;c.textureIsSignedDistanceField&&(f=Math.min(c.outlineSize,.5*R[0])*e.screenToWorldRatio/2),R[0]*=b,R[1]*=y;const z=d*l.size,C=c.rotation+l.data[z];Le(t,g,x,R,m,f,C,c,u)&&s(a.distance,a.normal,-1)}}createBufferWriter(){return new Jn}applyShaderOffsetsView(e,n,t,s,a,i,r){const l=Ge(n,t,a,we);return this._applyVerticalGroundOffsetView(e,l,a,r),Ne(this.parameters,r,l,a,i),this._applyPolygonOffsetView(r,l,s[3],a,r),this._applyCenterOffsetView(r,s,r),r}applyShaderOffsetsNDC(e,n,t,s,a){return this._applyCenterOffsetNDC(e,n,t,s),a!=null&&k(a,s),this._applyPolygonOffsetNDC(s,n,t,s),s}_applyPolygonOffsetView(e,n,t,s,a){const i=s.aboveGround?1:-1;let r=Math.sign(t);r===0&&(r=i);const l=i*r;if(this.parameters.shaderPolygonOffset<=0)return k(a,e);const c=Po(Math.abs(n.cosAngle),.01,1),u=1-Math.sqrt(1-c*c)/c/s.viewport[2];return G(a,e,l>0?u:1/u),a}_applyVerticalGroundOffsetView(e,n,t,s){const a=be(e),i=t.aboveGround?1:-1,r=t.computeRenderPixelSizeAtDist(a)*Rt,l=G(A,n.normal,i*r);return q(s,e,l),s}_applyCenterOffsetView(e,n,t){const s=this.parameters.centerOffsetUnits!=="screen";return t!==e&&k(t,e),s&&(t[0]+=n[0],t[1]+=n[1],n[2]&&(L(ae,t),$o(t,t,G(ae,ae,n[2])))),t}_applyCenterOffsetNDC(e,n,t,s){const a=this.parameters.centerOffsetUnits!=="screen";return s!==e&&k(s,e),a||(s[0]+=n[0]/t.fullWidth*2,s[1]+=n[1]/t.fullHeight*2),s}_applyPolygonOffsetNDC(e,n,t,s){const a=this.parameters.shaderPolygonOffset;if(e!==s&&k(s,e),a){const i=t.aboveGround?1:-1,r=i*Math.sign(n[3]);s[2]-=(r||i)*a}return s}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:n,outlineColor:t}=this.parameters,s=e[3]>=te||n>=te&&t[3]>=te;return this._visible&&s}createGLMaterial(e){return new Nn(e)}calculateRelativeScreenBounds(e,n,t=wt()){return Wn(this.parameters,e,n,t),t[2]=t[0]+e[0],t[3]=t[1]+e[1],t}}class Nn extends sn{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(Ln,e)}}function Wn(o,e,n,t){t[0]=o.anchorPosition[0]*-e[0]+o.screenOffset[0]*n,t[1]=o.anchorPosition[1]*-e[1]+o.screenOffset[1]*n}function Ge(o,e,n,t){return Fn(e)&&(e=Pt(Xn,e)),So(t.normal,o,e),re(t.normal,t.normal,n.viewInverseTransposeMatrix),t.cosAngle=Ye(Bt,Zn),t}function Yn(o){const e=o[0],n=o[1],t=o[2],s=o[3],a=o[4],i=o[5],r=o[6],l=o[7],c=o[8],u=1/Math.sqrt(e*e+n*n+t*t),p=1/Math.sqrt(s*s+a*a+i*i),h=1/Math.sqrt(r*r+l*l+c*c);return o[0]=e*u,o[1]=n*u,o[2]=t*u,o[3]=s*p,o[4]=a*p,o[5]=i*p,o[6]=r*h,o[7]=l*h,o[8]=c*h,o}function Le(o,e,n,t,s,a,i,r,l){let c=e-s-t[0]*l[0],u=c+t[0]+2*s,p=n-s-t[1]*l[1],h=p+t[1]+2*s;const b=r.distanceFieldBoundingBox;return r.textureIsSignedDistanceField&&b!=null&&(c+=t[0]*b[0],p+=t[1]*b[1],u-=t[0]*(1-b[2]),h-=t[1]*(1-b[3]),c-=a,u+=a,p-=a,h+=a),Ke(xt,e,n),zo(xe,o,xt,Co(i)),xe[0]>c&&xe[0]<u&&xe[1]>p&&xe[1]<h}const ve=new Xo,A=_(),ae=_(),M=Ve(),Bt=_(),Me=_(),xe=Xe(),xt=Xe(),Ae=Ct(),Xn=Ct(),Gt=bt(),Pe=Ve(),j=_(),He=_(),qe=Ve(),we={normal:Bt,cosAngle:0},Lt=1,Kn=2,R=zt(0,0),Zn=yt(0,0,1);class Qn extends Ko{constructor(){super(...arguments),this.renderOccluded=1,this.isDecoration=!1,this.color=ot(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=zt(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=ot(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=Ve(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class Jn{constructor(){this.layout=Ut,this.instanceLayout=Ht()}elementCount(e){return e.get("position").indices.length}elementCountBaseInstance(e){return e.get("uv0").indices.length}write(e,n,t,s,a,i){const{position:r,normal:l,color:c,size:u,rotation:p,centerOffsetAndDistance:h,featureAttribute:b,uvi:y}=a;Jo(t.get("position"),e,r,i),en(t.get("normal"),n,l,i);const m=t.get("position").indices.length;let d=0,v=0,g=ye,x=ye;const O=t.get("uvi")?.data;O&&O.length>=4&&(d=O[0],v=O[1],g=O[2],x=O[3]);for(let f=0;f<m;++f){const z=i+f;y.setValues(z,d,v,g,x)}if(tn(t.get("color"),4,c,i),rt(t.get("size"),u,i),on(t.get("rotation"),p,i),t.get("centerOffsetAndDistance")?lt(t.get("centerOffsetAndDistance"),h,i):ct(h,i,m),t.get("featureAttribute")?lt(t.get("featureAttribute"),b,i):ct(b,i,m),s!=null){const f=t.get("position")?.indices;if(f){const z=f.length,C=a.getField("olidColor",rn);nn(s,C,z,i)}}return{numVerticesPerItem:1,numItems:m}}writeBaseInstance(e,n){const{uv0:t}=n;rt(e.get("uv0"),t,0)}intersect(e,n,t,s,a,i,r){const{options:{selectionMode:l,hud:c,excludeLabels:u},point:p,camera:h}=s;if(!l||!c||u&&n.isLabel||!p)return;const b=this.instanceLayout.createView(e),{position:y,normal:m,rotation:d,size:v,featureAttribute:g,centerOffsetAndDistance:x}=b,O=n.centerOffsetUnits==="screen",f=ge(n);if(y==null||m==null||d==null||v==null||x==null||h==null)return;const z=g==null?null:g.getVec(0,qe),{scaleX:C,scaleY:P}=ke(z,n,h.pixelRatio),B=y.count;for(let w=0;w<B;w++){if(y.getVec(w,A),t!=null&&q(A,A,t),re(A,A,h.viewMatrix),x.getVec(w,Pe),oe(j,Pe[0],Pe[1],Pe[2]),!O&&(A[0]+=j[0],A[1]+=j[1],j[2]!==0)){const T=j[2];L(j,A),W(A,A,G(j,j,T))}if(m.getVec(w,ae),Ge(ae,Ae,h,we),Ne(n,A,we,h,ve),h.applyProjection(A,M),M[0]>-1){O&&(j[0]||j[1])&&(M[0]+=j[0]*h.pixelRatio,j[1]!==0&&(M[1]+=ve.alignmentEvaluator.apply(j[1])*h.pixelRatio),h.unapplyProjection(M,A)),M[0]+=n.screenOffset[0]*h.pixelRatio,M[1]+=n.screenOffset[1]*h.pixelRatio,M[0]=Math.floor(M[0]),M[1]=Math.floor(M[1]),v.getVec(w,R),ve.evaluator.applyVec2(R,R);const T=Lt*h.pixelRatio;let V=0;n.textureIsSignedDistanceField&&(V=Math.min(n.outlineSize,.5*R[0])*h.pixelRatio/2),R[0]*=C,R[1]*=P;const Z=d.get(w),le=n.rotation+Z;if(Le(p,M[0],M[1],R,T,V,le,n,f)){const Q=s.ray;if(re(Me,A,$t(Gt,h.viewMatrix)),M[0]=p[0],M[1]=p[1],h.unprojectFromRenderScreen(M,A)){const N=_();k(N,Q.direction);const se=1/be(N);G(N,N,se),r(St(Q.origin,A)*se,N,w,Me)}}}}}}function ke(o,e,n){return o==null||e.vvSize==null?{scaleX:n,scaleY:n}:(Zo(He,e,o),{scaleX:He[0]*n,scaleY:He[1]*n})}function Ne(o,e,n,t,s){if(!o.verticalOffset?.screenLength){const l=be(e);return s.update(n.cosAngle,l,o.screenSizePerspective,o.screenSizePerspectiveMinPixelReferenceSize,o.screenSizePerspectiveAlignment,null),e}const a=be(e),i=o.screenSizePerspectiveAlignment??o.screenSizePerspective,r=Qo(t,a,o.verticalOffset,n.cosAngle,i,o.screenSizePerspectiveMinPixelReferenceSize);return s.update(n.cosAngle,a,o.screenSizePerspective,o.screenSizePerspectiveMinPixelReferenceSize,o.screenSizePerspectiveAlignment,null),G(n.normal,n.normal,r),q(e,e,n.normal)}function js(o){return o.type==="point"}const es=Object.freeze(Object.defineProperty({__proto__:null,build:Et,calculateAnchorPosition:ge,fullUV:ye},Symbol.toStringTag,{value:"Module"}));export{hs as A,vs as D,ws as E,xs as G,As as M,bs as Q,ds as U,gs as Z,Cs as a,Vs as b,Ss as c,Rn as d,ms as e,zs as f,vt as g,$s as h,Ts as i,Ps as j,gn as k,Qe as l,Ds as m,Un as n,Os as o,Vn as p,Tn as q,ys as r,js as t,Mn as u,ps as w,Ms as y};
