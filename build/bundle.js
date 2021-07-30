var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function a(t){let e;return i(t,(t=>e=t))(),e}function c(t,e,n){t.$$.on_destroy.push(i(e,n))}function u(t){return null==t?"":t}function s(t,e,n=e){return t.set(n),e}let f,d=!1;function p(t,e,n,o){for(;t<e;){const r=t+(e-t>>1);n(r)<=o?t=r+1:e=r}return t}function h(t,e){d?(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;const e=t.childNodes,n=new Int32Array(e.length+1),o=new Int32Array(e.length);n[0]=-1;let r=0;for(let t=0;t<e.length;t++){const l=p(1,r+1,(t=>e[n[t]].claim_order),e[t].claim_order)-1;o[t]=n[l]+1;const i=l+1;n[i]=t,r=Math.max(i,r)}const l=[],i=[];let a=e.length-1;for(let t=n[r]+1;0!=t;t=o[t-1]){for(l.push(e[t-1]);a>=t;a--)i.push(e[a]);a--}for(;a>=0;a--)i.push(e[a]);l.reverse(),i.sort(((t,e)=>t.claim_order-e.claim_order));for(let e=0,n=0;e<i.length;e++){for(;n<l.length&&i[e].claim_order>=l[n].claim_order;)n++;const o=n<l.length?l[n]:null;t.insertBefore(i[e],o)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild),e!==t.actual_end_child?t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling):e.parentNode!==t&&t.appendChild(e)}function m(t,e,n){d&&!n?h(t,e):(e.parentNode!==t||n&&e.nextSibling!==n)&&t.insertBefore(e,n||null)}function $(t){t.parentNode.removeChild(t)}function v(t){return document.createElement(t)}function g(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function y(t){return document.createTextNode(t)}function w(){return y(" ")}function x(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function b(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function _(t){return""===t?null:+t}function C(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function k(t,e){t.value=null==e?"":e}function A(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}}function E(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function O(t){f=t}function N(){if(!f)throw new Error("Function called outside component initialization");return f}function j(){const t=N();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const r=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);o.slice().forEach((e=>{e.call(t,r)}))}}}const F=[],R=[],D=[],U=[],z=Promise.resolve();let M=!1;function B(t){D.push(t)}function S(t){U.push(t)}let L=!1;const V=new Set;function q(){if(!L){L=!0;do{for(let t=0;t<F.length;t+=1){const e=F[t];O(e),T(e.$$)}for(O(null),F.length=0;R.length;)R.pop()();for(let t=0;t<D.length;t+=1){const e=D[t];V.has(e)||(V.add(e),e())}D.length=0}while(F.length);for(;U.length;)U.pop()();M=!1,L=!1,V.clear()}}function T(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const W=new Set;let P;function I(){P={r:0,c:[],p:P}}function H(){P.r||o(P.c),P=P.p}function G(t,e){t&&t.i&&(W.delete(t),t.i(e))}function J(t,e,n,o){if(t&&t.o){if(W.has(t))return;W.add(t),P.c.push((()=>{W.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function K(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}function Q(t){t&&t.c()}function X(t,n,l,i){const{fragment:a,on_mount:c,on_destroy:u,after_update:s}=t.$$;a&&a.m(n,l),i||B((()=>{const n=c.map(e).filter(r);u?u.push(...n):o(n),t.$$.on_mount=[]})),s.forEach(B)}function Y(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Z(t,e){-1===t.$$.dirty[0]&&(F.push(t),M||(M=!0,z.then(q)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function tt(e,r,l,i,a,c,u=[-1]){const s=f;O(e);const p=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s?s.$$.context:r.context||[]),callbacks:n(),dirty:u,skip_bound:!1};let h=!1;if(p.ctx=l?l(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&a(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),h&&Z(e,t)),n})):[],p.update(),h=!0,o(p.before_update),p.fragment=!!i&&i(p.ctx),r.target){if(r.hydrate){d=!0;const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach($)}else p.fragment&&p.fragment.c();r.intro&&G(e.$$.fragment),X(e,r.target,r.anchor,r.customElement),d=!1,q()}O(s)}class et{$destroy(){Y(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const nt=[];function ot(e,n=t){let o;const r=[];function i(t){if(l(e,t)&&(e=t,o)){const t=!nt.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),nt.push(n,e)}if(t){for(let t=0;t<nt.length;t+=2)nt[t][0](nt[t+1]);nt.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(l,a=t){const c=[l,a];return r.push(c),1===r.length&&(o=n(i)||t),l(e),()=>{const t=r.indexOf(c);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}let rt=ot(new ArrayBuffer(0)),lt=ot(0),it=ot(0),at=ot(0),ct=ot(new AudioBuffer({length:1,sampleRate:8e4}));function ut(e){let n,r,l,i,a,c,u,s,f,d,p,g;return{c(){n=v("p"),n.textContent="Choose an audio file to extend",r=w(),l=v("div"),i=v("input"),a=w(),c=v("span"),c.textContent="or",u=w(),s=v("input"),f=w(),d=v("button"),d.textContent="Extend",b(i,"type","file"),b(i,"accept","audio/*"),b(i,"class","svelte-l57kau"),b(c,"class","svelte-l57kau"),b(s,"type","url"),b(s,"placeholder","Enter a URL"),b(s,"class","svelte-l57kau"),b(l,"class","input-container svelte-l57kau"),b(d,"class","svelte-l57kau")},m(t,o){m(t,n,o),m(t,r,o),m(t,l,o),h(l,i),e[3](i),h(l,a),h(l,c),h(l,u),h(l,s),k(s,e[1]),m(t,f,o),m(t,d,o),p||(g=[x(s,"input",e[4]),x(d,"click",e[2])],p=!0)},p(t,[e]){2&e&&k(s,t[1])},i:t,o:t,d(t){t&&$(n),t&&$(r),t&&$(l),e[3](null),t&&$(f),t&&$(d),p=!1,o(g)}}}function st(t,e,n){let o;c(t,rt,(t=>n(5,o=t)));var r=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,l){function i(t){try{c(o.next(t))}catch(t){l(t)}}function a(t){try{c(o.throw(t))}catch(t){l(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}c((o=o.apply(t,e||[])).next())}))};let l,i;return[l,i,function(){return r(this,void 0,void 0,(function*(){if(l.files.length>0)s(rt,o=yield new Promise((t=>{let e=new FileReader;e.onload=e=>{let n=e.target.result;"object"==typeof n&&t(n)},e.onerror=t=>{console.error(t.target.error),alert("Could not read the file")},e.readAsArrayBuffer(l.files[0])})),o);else try{let t=yield fetch(i);s(rt,o=yield t.arrayBuffer(),o)}catch(t){console.error(t),alert("Could not read the file, because the server does not allow it. Please download and upload it manually.")}}))},function(t){R[t?"unshift":"push"]((()=>{l=t,n(0,l)}))},function(){i=this.value,n(1,i)}]}class ft extends et{constructor(t){super(),tt(this,t,st,ut,l,{})}}function dt(t){let e,n,o,r;function l(t,e){return"string"==typeof t[8][4]?ht:pt}let i=l(t),a=i(t);return{c(){e=g("svg"),n=g("g"),o=g("g"),a.c(),b(o,"transform",t[10]),b(n,"transform","translate(256 256)"),b(e,"id",t[1]),b(e,"class",t[0]),b(e,"style",t[9]),b(e,"viewBox",r=`0 0 ${t[8][0]} ${t[8][1]}`),b(e,"aria-hidden","true"),b(e,"role","img"),b(e,"xmlns","http://www.w3.org/2000/svg")},m(t,r){m(t,e,r),h(e,n),h(n,o),a.m(o,null)},p(t,n){i===(i=l(t))&&a?a.p(t,n):(a.d(1),a=i(t),a&&(a.c(),a.m(o,null))),1024&n&&b(o,"transform",t[10]),2&n&&b(e,"id",t[1]),1&n&&b(e,"class",t[0]),512&n&&b(e,"style",t[9]),256&n&&r!==(r=`0 0 ${t[8][0]} ${t[8][1]}`)&&b(e,"viewBox",r)},d(t){t&&$(e),a.d()}}}function pt(t){let e,n,o,r,l,i,a,c;return{c(){e=g("path"),l=g("path"),b(e,"d",n=t[8][4][0]),b(e,"fill",o=t[4]||t[2]||"currentColor"),b(e,"fill-opacity",r=0!=t[7]?t[5]:t[6]),b(e,"transform","translate(-256 -256)"),b(l,"d",i=t[8][4][1]),b(l,"fill",a=t[3]||t[2]||"currentColor"),b(l,"fill-opacity",c=0!=t[7]?t[6]:t[5]),b(l,"transform","translate(-256 -256)")},m(t,n){m(t,e,n),m(t,l,n)},p(t,u){256&u&&n!==(n=t[8][4][0])&&b(e,"d",n),20&u&&o!==(o=t[4]||t[2]||"currentColor")&&b(e,"fill",o),224&u&&r!==(r=0!=t[7]?t[5]:t[6])&&b(e,"fill-opacity",r),256&u&&i!==(i=t[8][4][1])&&b(l,"d",i),12&u&&a!==(a=t[3]||t[2]||"currentColor")&&b(l,"fill",a),224&u&&c!==(c=0!=t[7]?t[6]:t[5])&&b(l,"fill-opacity",c)},d(t){t&&$(e),t&&$(l)}}}function ht(t){let e,n,o;return{c(){e=g("path"),b(e,"d",n=t[8][4]),b(e,"fill",o=t[2]||t[3]||"currentColor"),b(e,"transform","translate(-256 -256)")},m(t,n){m(t,e,n)},p(t,r){256&r&&n!==(n=t[8][4])&&b(e,"d",n),12&r&&o!==(o=t[2]||t[3]||"currentColor")&&b(e,"fill",o)},d(t){t&&$(e)}}}function mt(e){let n,o=e[8][4]&&dt(e);return{c(){o&&o.c(),n=y("")},m(t,e){o&&o.m(t,e),m(t,n,e)},p(t,[e]){t[8][4]?o?o.p(t,e):(o=dt(t),o.c(),o.m(n.parentNode,n)):o&&(o.d(1),o=null)},i:t,o:t,d(t){o&&o.d(t),t&&$(n)}}}function $t(t,e,n){let o,r,l,{class:i=""}=e,{id:a=""}=e,{style:c=""}=e,{icon:u}=e,{fw:s=!1}=e,{flip:f=!1}=e,{pull:d=""}=e,{rotate:p=""}=e,{size:h=""}=e,{color:m=""}=e,{primaryColor:$=""}=e,{secondaryColor:v=""}=e,{primaryOpacity:g=1}=e,{secondaryOpacity:y=.4}=e,{swapOpacity:w=!1}=e;return t.$$set=t=>{"class"in t&&n(0,i=t.class),"id"in t&&n(1,a=t.id),"style"in t&&n(11,c=t.style),"icon"in t&&n(12,u=t.icon),"fw"in t&&n(13,s=t.fw),"flip"in t&&n(14,f=t.flip),"pull"in t&&n(15,d=t.pull),"rotate"in t&&n(16,p=t.rotate),"size"in t&&n(17,h=t.size),"color"in t&&n(2,m=t.color),"primaryColor"in t&&n(3,$=t.primaryColor),"secondaryColor"in t&&n(4,v=t.secondaryColor),"primaryOpacity"in t&&n(5,g=t.primaryOpacity),"secondaryOpacity"in t&&n(6,y=t.secondaryOpacity),"swapOpacity"in t&&n(7,w=t.swapOpacity)},t.$$.update=()=>{if(4096&t.$$.dirty&&n(8,o=u&&u.icon||[0,0,"",[],""]),174080&t.$$.dirty){let t,e;const o="1em";let l,i,a,u="-.125em";const f="visible";s&&(a="center",e="1.25em"),d&&(t=d),h&&("lg"==h?(i="1.33333em",l=".75em",u="-.225em"):i="xs"==h?".75em":"sm"==h?".875em":h.replace("x","em"));const p={float:t,width:e,height:o,"line-height":l,"font-size":i,"text-align":a,"vertical-align":u,overflow:f};let m="";for(const t in p)p[t]&&(m+=`${t}:${p[t]};`);n(9,r=m+c)}if(81920&t.$$.dirty){let t="";if(f){let e=1,n=1;"horizontal"==f?e=-1:"vertical"==f?n=-1:e=n=-1,t+=` scale(${e} ${n})`}p&&(t+=` rotate(${p} 0 0)`),n(10,l=t)}},[i,a,m,$,v,g,y,w,o,r,l,c,u,s,f,d,p,h]}class vt extends et{constructor(t){super(),tt(this,t,$t,mt,l,{class:0,id:1,style:11,icon:12,fw:13,flip:14,pull:15,rotate:16,size:17,color:2,primaryColor:3,secondaryColor:4,primaryOpacity:5,secondaryOpacity:6,swapOpacity:7})}}
/*!
     * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
     * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
     */var gt,yt={prefix:"fas",iconName:"pause",icon:[448,512,[],"f04c","M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"]},wt={prefix:"fas",iconName:"play",icon:[448,512,[],"f04b","M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"]};function xt(t,e=gt.round){let n=Math.floor(t/3600),o=Math.floor(t/60%60),r=t%60;return e===gt.round?r=Math.floor(r):e===gt.milli&&(r=Math.round(1e3*r)/1e3),n>0?`${n}:${bt(o)}:${bt(r)}`:`${o}:${bt(r)}`}function bt(t){return t<10?"0"+t:String(t)}function _t(e){let n,o;return n=new vt({props:{icon:wt}}),{c(){Q(n.$$.fragment)},m(t,e){X(n,t,e),o=!0},p:t,i(t){o||(G(n.$$.fragment,t),o=!0)},o(t){J(n.$$.fragment,t),o=!1},d(t){Y(n,t)}}}function Ct(e){let n,o;return n=new vt({props:{icon:yt}}),{c(){Q(n.$$.fragment)},m(t,e){X(n,t,e),o=!0},p:t,i(t){o||(G(n.$$.fragment,t),o=!0)},o(t){J(n.$$.fragment,t),o=!1},d(t){Y(n,t)}}}function kt(t){let e,n,r,l,i,a,c,u,s,f,d,p,g,_,A,E,O=xt(t[3])+"",N=xt(t[4])+"";const j=[Ct,_t],F=[];function R(t,e){return t[2]?0:1}return r=R(t),l=F[r]=j[r](t),{c(){e=v("div"),n=v("span"),l.c(),i=w(),a=v("span"),c=y(O),u=w(),s=v("input"),d=w(),p=v("span"),g=y(N),b(n,"class","play-button svelte-7mk9qe"),b(a,"class","current time svelte-7mk9qe"),b(s,"type","range"),b(s,"max",t[4]),b(s,"step","any"),b(s,"style",f=`\n            --loop-start: ${t[0]/t[4]*100}%;\n            --loop-end: ${t[1]/t[4]*100}%;\n        `),b(s,"class","svelte-7mk9qe"),b(p,"class","end time svelte-7mk9qe"),b(e,"class","player-container svelte-7mk9qe")},m(o,l){m(o,e,l),h(e,n),F[r].m(n,null),h(e,i),h(e,a),h(a,c),h(e,u),h(e,s),k(s,t[3]),h(e,d),h(e,p),h(p,g),_=!0,A||(E=[x(n,"click",t[5]),x(s,"change",t[10]),x(s,"input",t[10]),x(s,"mousedown",t[6]),x(s,"mouseup",t[7]),x(s,"touchstart",t[6],{passive:!0}),x(s,"touchend",t[7],{passive:!0})],A=!0)},p(t,[e]){let o=r;r=R(t),r===o?F[r].p(t,e):(I(),J(F[o],1,1,(()=>{F[o]=null})),H(),l=F[r],l?l.p(t,e):(l=F[r]=j[r](t),l.c()),G(l,1),l.m(n,null)),(!_||8&e)&&O!==(O=xt(t[3])+"")&&C(c,O),(!_||16&e)&&b(s,"max",t[4]),(!_||19&e&&f!==(f=`\n            --loop-start: ${t[0]/t[4]*100}%;\n            --loop-end: ${t[1]/t[4]*100}%;\n        `))&&b(s,"style",f),8&e&&k(s,t[3]),(!_||16&e)&&N!==(N=xt(t[4])+"")&&C(g,N)},i(t){_||(G(l),_=!0)},o(t){J(l),_=!1},d(t){t&&$(e),F[r].d(),A=!1,o(E)}}}function At(t,e,n){let o,r,l,i,a;c(t,it,(t=>n(0,o=t))),c(t,at,(t=>n(1,r=t))),c(t,ct,(t=>n(15,l=t))),c(t,rt,(t=>n(16,i=t))),c(t,lt,(t=>n(4,a=t)));var u=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,l){function i(t){try{c(o.next(t))}catch(t){l(t)}}function a(t){try{c(o.throw(t))}catch(t){l(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}c((o=o.apply(t,e||[])).next())}))};let f,d=new AudioContext;function p(t,e,o){n(3,v=e),m&&f.stop(),n(9,f=d.createBufferSource()),f.connect(d.destination),n(9,f.buffer=l,f),f.start(t,e,o),"suspended"===d.state&&d.resume(),m=!0,n(2,h=!0),$=Date.now()/1e3-v,y()}let h=!1,m=!1;d.onstatechange=()=>{m&&"running"===d.state?(n(2,h=!0),$=Date.now()/1e3-v,y()):n(2,h=!1)};let $,v=0,g=!1;function y(){v>=r&&($+=r-o),g||n(3,v=Date.now()/1e3-$),h&&requestAnimationFrame(y)}let w=j();return u(void 0,void 0,void 0,(function*(){try{n(9,f=d.createBufferSource()),s(ct,l=yield d.decodeAudioData(i),l),n(9,f.buffer=l,f),s(lt,a=f.buffer.duration,a),w("duration")}catch(t){console.error(t),alert("Could not play the audio file")}})),t.$$.update=()=>{515&t.$$.dirty&&f&&(n(9,f.loop=!0,f),n(9,f.loopStart=o,f),n(9,f.loopEnd=r,f))},[o,r,h,v,a,function(){h?d.suspend():m?d.resume():p(0,v)},function(){g=!0},function(){g=!1,$=Date.now()/1e3-v,m&&f.stop(),h?p(0,v):m=!1},p,f,function(){v=_(this.value),n(3,v)}]}!function(t){t[t.round=0]="round",t[t.milli=1]="milli",t[t.noRounding=2]="noRounding"}(gt||(gt={}));class Et extends et{constructor(t){super(),tt(this,t,At,kt,l,{start:8})}get start(){return this.$$.ctx[8]}}function Ot(e){let n,r,l,i,a,c,s,f,d,p,g,y,_,C,A,E,O,N,j,F,R;return{c(){n=v("div"),r=v("button"),r.textContent="-1ms",l=w(),i=v("button"),i.textContent="-10ms",a=w(),c=v("button"),c.textContent="-0.1s",s=w(),f=v("button"),f.textContent="-1s",d=w(),p=v("input"),y=w(),_=v("button"),_.textContent="+1ms",C=w(),A=v("button"),A.textContent="+10ms",E=w(),O=v("button"),O.textContent="+0.1s",N=w(),j=v("button"),j.textContent="+1s",b(r,"class","row1 col1 svelte-1jd5ba9"),b(i,"class","row1 col2 svelte-1jd5ba9"),b(c,"class","row2 col1 svelte-1jd5ba9"),b(f,"class","row2 col2 svelte-1jd5ba9"),b(p,"class",g=u(e[1]?"":"invalid")+" svelte-1jd5ba9"),b(p,"type","text"),b(_,"class","row1 col3 svelte-1jd5ba9"),b(A,"class","row1 col4 svelte-1jd5ba9"),b(O,"class","row2 col3 svelte-1jd5ba9"),b(j,"class","row2 col4 svelte-1jd5ba9"),b(n,"class","input-container svelte-1jd5ba9")},m(t,o){m(t,n,o),h(n,r),h(n,l),h(n,i),h(n,a),h(n,c),h(n,s),h(n,f),h(n,d),h(n,p),k(p,e[0]),h(n,y),h(n,_),h(n,C),h(n,A),h(n,E),h(n,O),h(n,N),h(n,j),F||(R=[x(r,"click",e[6]),x(i,"click",e[7]),x(c,"click",e[8]),x(f,"click",e[9]),x(p,"input",e[10]),x(_,"click",e[11]),x(A,"click",e[12]),x(O,"click",e[13]),x(j,"click",e[14])],F=!0)},p(t,[e]){2&e&&g!==(g=u(t[1]?"":"invalid")+" svelte-1jd5ba9")&&b(p,"class",g),1&e&&p.value!==t[0]&&k(p,t[0])},i:t,o:t,d(t){t&&$(n),F=!1,o(R)}}}function Nt(t,e,n){let o,{value:r=0}=e,{max:l=1/0}=e,i=xt(r);function a(t){n(3,r+t>0?r+=t:r=0),n(0,i=xt(r,gt.milli))}return t.$$set=t=>{"value"in t&&n(3,r=t.value),"max"in t&&n(4,l=t.max)},t.$$.update=()=>{if(19&t.$$.dirty){let t=function(t){let e=t.split(":");return 1===e.length?Number(e[0]):2===e.length?60*Number(e[0])+Number(e[1]):3===e.length?3600*Number(e[0])+60*Number(e[1])+Number(e[2]):NaN}(i);n(1,o=t<=l&&t>=0&&!isNaN(t)),o&&n(3,r=t)}},[i,o,a,r,l,function(t,e){n(0,i=xt(t,e))},()=>a(-.001),()=>a(-.01),()=>a(-.1),()=>a(-1),function(){i=this.value,n(0,i)},()=>a(.001),()=>a(.01),()=>a(.1),()=>a(1)]}class jt extends et{constructor(t){super(),tt(this,t,Nt,Ot,l,{value:3,max:4,setValue:5})}get setValue(){return this.$$.ctx[5]}}function Ft(e){let n,o,r;return B(e[7]),{c(){n=v("canvas"),b(n,"width","0"),b(n,"height","151"),b(n,"class","svelte-m5vup3")},m(t,l){m(t,n,l),e[8](n),o||(r=x(window,"resize",e[7]),o=!0)},p:t,i:t,o:t,d(t){t&&$(n),e[8](null),o=!1,r()}}}function Rt(t,e,n){let o,r,l;c(t,ct,(t=>n(4,o=t))),c(t,it,(t=>n(5,r=t))),c(t,at,(t=>n(6,l=t)));let i,a,u,s,{graphDomain:f}=e;function d(t){let e;e="sample"===f?s:f*o.sampleRate;let n=new Float32Array(e);o.copyFromChannel(n,0,o.sampleRate*t);let r=new Uint8Array(e);for(let t=0;t<r.length;t++)r[t]=Math.round(75*(1-n[t]));return r}var p;return p=()=>{a=i.getContext("2d")},N().$$.on_mount.push(p),t.$$set=t=>{"graphDomain"in t&&n(2,f=t.graphDomain)},t.$$.update=()=>{1&t.$$.dirty&&n(3,s=.9*u),124&t.$$.dirty&&o.length>1&&(n(1,i.width=s,i),function(){let t=d(r),e=d(l);a.fillStyle="white",a.fillRect(0,0,s,256),a.beginPath(),a.lineWidth=2,a.strokeStyle="lime",a.moveTo(0,t[0]);for(let e=1;e<t.length;e++){let n=e;"sample"!==f&&(n=e/t.length*s),a.lineTo(n,t[e])}a.stroke(),a.beginPath(),a.lineWidth=2,a.strokeStyle="rgba(0, 0, 255, 0.5)",a.moveTo(0,e[0]);for(let t=1;t<e.length;t++){let n=t;"sample"!==f&&(n=t/e.length*s),a.lineTo(n,e[t])}a.stroke()}())},[u,i,f,s,o,r,l,function(){n(0,u=window.innerWidth)},function(t){R[t?"unshift":"push"]((()=>{i=t,n(1,i),n(4,o),n(5,r),n(6,l),n(3,s),n(2,f),n(0,u)}))}]}class Dt extends et{constructor(t){super(),tt(this,t,Rt,Ft,l,{graphDomain:2})}}var Ut=function(t,e){e=e||{};var n,o=t.numberOfChannels,r=t.sampleRate,l=e.float32?3:1,i=3===l?32:16;n=2===o?function(t,e){var n=t.length+e.length,o=new Float32Array(n),r=0,l=0;for(;r<n;)o[r++]=t[l],o[r++]=e[l],l++;return o}(t.getChannelData(0),t.getChannelData(1)):t.getChannelData(0);return function(t,e,n,o,r){var l=r/8,i=o*l,a=new ArrayBuffer(44+t.length*l),c=new DataView(a);zt(c,0,"RIFF"),c.setUint32(4,36+t.length*l,!0),zt(c,8,"WAVE"),zt(c,12,"fmt "),c.setUint32(16,16,!0),c.setUint16(20,e,!0),c.setUint16(22,o,!0),c.setUint32(24,n,!0),c.setUint32(28,n*i,!0),c.setUint16(32,i,!0),c.setUint16(34,r,!0),zt(c,36,"data"),c.setUint32(40,t.length*l,!0),1===e?function(t,e,n){for(var o=0;o<n.length;o++,e+=2){var r=Math.max(-1,Math.min(1,n[o]));t.setInt16(e,r<0?32768*r:32767*r,!0)}}(c,44,t):function(t,e,n){for(var o=0;o<n.length;o++,e+=4)t.setFloat32(e,n[o],!0)}(c,44,t);return a}(n,l,r,o,i)};function zt(t,e,n){for(var o=0;o<n.length;o++)t.setUint8(e+o,n.charCodeAt(o))}function Mt(e){let n,r,l,i,a,c,u,s,f,d,p,g,E,O,N,j,F="duration"===e[0]?"min":"";return{c(){n=v("div"),r=v("h2"),r.textContent="Download",l=w(),i=v("select"),a=v("option"),a.textContent="Amount of loops",c=v("option"),c.textContent="Minimal duration",u=w(),s=v("input"),f=w(),d=y(F),p=w(),g=v("p"),g.textContent="Note: these files can get quite big",E=w(),O=v("button"),O.textContent="Download",a.__value="loops",a.value=a.__value,c.__value="duration",c.value=c.__value,void 0===e[0]&&B((()=>e[7].call(i))),b(s,"type","number"),b(s,"class","svelte-11znw9r"),b(n,"class","download-container svelte-11znw9r")},m(t,o){m(t,n,o),h(n,r),h(n,l),h(n,i),h(i,a),h(i,c),A(i,e[0]),h(n,u),h(n,s),k(s,e[1]),h(n,f),h(n,d),h(n,p),h(n,g),h(n,E),h(n,O),N||(j=[x(i,"change",e[7]),x(s,"input",e[8]),x(O,"click",e[2])],N=!0)},p(t,[e]){1&e&&A(i,t[0]),2&e&&_(s.value)!==t[1]&&k(s,t[1]),1&e&&F!==(F="duration"===t[0]?"min":"")&&C(d,F)},i:t,o:t,d(t){t&&$(n),N=!1,o(j)}}}function Bt(t,e,n){let o,r,l,i,a;c(t,it,(t=>n(3,o=t))),c(t,at,(t=>n(4,r=t))),c(t,lt,(t=>n(5,l=t))),c(t,ct,(t=>n(6,i=t)));let u,s,f,d,p=2;function h(t,e){let n=new Float32Array(u*d);i.copyFromChannel(n,t);let l=new Float32Array(s*d);i.copyFromChannel(l,t,o*d);let a=new Float32Array(f*d);i.copyFromChannel(a,t,r*d);let c=new Float32Array(d*(u+s*e+f));c.set(n);for(let t=0;t<e;t++)c.set(l,(u+s*t)*d);return c.set(a,(u+s*e)*d),c}return t.$$.update=()=>{120&t.$$.dirty&&(u=o,s=r-o,f=l-r,d=i.sampleRate)},[a,p,function(){let t;t="loops"===a?p:Math.ceil((p-(u+f))/s);let e=new AudioBuffer({length:d*(u+s*t+f),sampleRate:i.sampleRate,numberOfChannels:i.numberOfChannels});for(let n=0;n<i.numberOfChannels;n++){let o=h(n,t);e.copyToChannel(o,n)}let n=Ut(e),o=new Uint8Array(n),r=new Blob([o],{type:"audio/vnd.wav"}),l=URL.createObjectURL(r),c=document.createElement("a");c.href=l,c.download="extended.wav",c.click(),URL.revokeObjectURL(l)},o,r,l,i,function(){a=E(this),n(0,a)},function(){p=_(this.value),n(1,p)}]}class St extends et{constructor(t){super(),tt(this,t,Bt,Mt,l,{})}}function Lt(t,e,n){let o=0;for(let r=0;r<t.length;r++)o+=Math.pow(t[r]-e[r+n],2);return o}function Vt(t){let e,n,l,i,a,c,u,s,f,d,p,g,y,_,C,k,E,O,N,j,F,D,U,z,M,L,V,q,T,W,P,I,H,Z,tt,et,nt,ot;function rt(e){t[6](e)}let lt={};function it(e){t[7](e)}void 0!==t[1]&&(lt.start=t[1]),e=new Et({props:lt}),R.push((()=>K(e,"start",rt))),e.$on("duration",(function(){r(t[0](t[3],gt.round))&&t[0](t[3],gt.round).apply(this,arguments)}));let at={max:t[5]};function ct(e){t[8](e)}function ut(e){t[9](e)}void 0!==t[4]&&(at.value=t[4]),s=new jt({props:at}),R.push((()=>K(s,"value",it)));let st={max:t[3]};return void 0!==t[5]&&(st.value=t[5]),void 0!==t[0]&&(st.setValue=t[0]),_=new jt({props:st}),R.push((()=>K(_,"value",ct))),R.push((()=>K(_,"setValue",ut))),N=new Dt({props:{graphDomain:t[2]}}),tt=new St({}),{c(){Q(e.$$.fragment),l=w(),i=v("div"),a=v("div"),c=v("h2"),c.textContent="Loop from",u=w(),Q(s.$$.fragment),d=w(),p=v("div"),g=v("h2"),g.textContent="until",y=w(),Q(_.$$.fragment),E=w(),O=v("div"),Q(N.$$.fragment),j=w(),F=v("select"),D=v("option"),D.textContent="Pixel = sample",U=v("option"),U.textContent="Width = 50ms",z=v("option"),z.textContent="Width = 0.1s",M=v("option"),M.textContent="Width = 0.5s",L=v("option"),L.textContent="Width = 1s",V=v("option"),V.textContent="Width = 5s",q=w(),T=v("button"),T.textContent="Adjust end time",W=w(),P=v("button"),P.textContent="Test",I=w(),H=v("br"),Z=w(),Q(tt.$$.fragment),b(a,"class","time-input svelte-1o22igu"),b(p,"class","time-input svelte-1o22igu"),b(i,"class","input-container svelte-1o22igu"),D.__value="sample",D.value=D.__value,U.__value="0.05",U.value=U.__value,z.__value="0.1",z.value=z.__value,M.__value="0.5",M.value=M.__value,L.__value="1",L.value=L.__value,V.__value="5",V.value=V.__value,void 0===t[2]&&B((()=>t[10].call(F)))},m(n,o){X(e,n,o),m(n,l,o),m(n,i,o),h(i,a),h(a,c),h(a,u),X(s,a,null),h(i,d),h(i,p),h(p,g),h(p,y),X(_,p,null),m(n,E,o),m(n,O,o),X(N,O,null),m(n,j,o),m(n,F,o),h(F,D),h(F,U),h(F,z),h(F,M),h(F,L),h(F,V),A(F,t[2]),m(n,q,o),m(n,T,o),m(n,W,o),m(n,P,o),m(n,I,o),m(n,H,o),m(n,Z,o),X(tt,n,o),et=!0,nt||(ot=[x(F,"change",t[10]),x(T,"click",t[11]),x(P,"click",t[12])],nt=!0)},p(o,[r]){t=o;const l={};!n&&2&r&&(n=!0,l.start=t[1],S((()=>n=!1))),e.$set(l);const i={};32&r&&(i.max=t[5]),!f&&16&r&&(f=!0,i.value=t[4],S((()=>f=!1))),s.$set(i);const a={};8&r&&(a.max=t[3]),!C&&32&r&&(C=!0,a.value=t[5],S((()=>C=!1))),!k&&1&r&&(k=!0,a.setValue=t[0],S((()=>k=!1))),_.$set(a);const c={};4&r&&(c.graphDomain=t[2]),N.$set(c),4&r&&A(F,t[2])},i(t){et||(G(e.$$.fragment,t),G(s.$$.fragment,t),G(_.$$.fragment,t),G(N.$$.fragment,t),G(tt.$$.fragment,t),et=!0)},o(t){J(e.$$.fragment,t),J(s.$$.fragment,t),J(_.$$.fragment,t),J(N.$$.fragment,t),J(tt.$$.fragment,t),et=!1},d(t){Y(e,t),t&&$(l),t&&$(i),Y(s),Y(_),t&&$(E),t&&$(O),Y(N),t&&$(j),t&&$(F),t&&$(q),t&&$(T),t&&$(W),t&&$(P),t&&$(I),t&&$(H),t&&$(Z),Y(tt,t),nt=!1,o(ot)}}}function qt(t,e,n){let o,r,l,i,u,s;c(t,lt,(t=>n(3,o=t))),c(t,it,(t=>n(4,r=t))),c(t,at,(t=>n(5,l=t)));return[i,u,s,o,r,l,function(t){u=t,n(1,u)},function(t){r=t,it.set(r)},function(t){l=t,at.set(l)},function(t){i=t,n(0,i)},function(){s=E(this),n(2,s)},()=>i(function(){let t=a(ct),e=a(it),n=a(at),o=t.sampleRate,r=new Float32Array(50);t.copyFromChannel(r,0,e*o);let l=new Float32Array(2*o+50);t.copyFromChannel(l,0,(n-1)*o);let i=1/0,c=0;for(let t=0;t<2*o;t++){let e=Lt(r,l,t);e<i&&(c=t,i=e)}return n-1+c/o}(),gt.noRounding),()=>u(0,l-5)]}class Tt extends et{constructor(t){super(),tt(this,t,qt,Vt,l,{})}}function Wt(t){let e,n;return e=new Tt({}),{c(){Q(e.$$.fragment)},m(t,o){X(e,t,o),n=!0},i(t){n||(G(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Y(e,t)}}}function Pt(t){let e,n;return e=new ft({}),{c(){Q(e.$$.fragment)},m(t,o){X(e,t,o),n=!0},i(t){n||(G(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){Y(e,t)}}}function It(t){let e,n,o,r,l,i,a;const c=[Pt,Wt],u=[];function s(t,e){return 0===t[0].byteLength?0:1}return l=s(t),i=u[l]=c[l](t),{c(){e=w(),n=v("header"),n.innerHTML="<h1>Audio Extender</h1>",o=w(),r=v("main"),i.c(),document.title="Audio Extender",b(n,"class","svelte-1jpbzkx"),b(r,"class","svelte-1jpbzkx")},m(t,i){m(t,e,i),m(t,n,i),m(t,o,i),m(t,r,i),u[l].m(r,null),a=!0},p(t,[e]){let n=l;l=s(t),l!==n&&(I(),J(u[n],1,1,(()=>{u[n]=null})),H(),i=u[l],i||(i=u[l]=c[l](t),i.c()),G(i,1),i.m(r,null))},i(t){a||(G(i),a=!0)},o(t){J(i),a=!1},d(t){t&&$(e),t&&$(n),t&&$(o),t&&$(r),u[l].d()}}}function Ht(t,e,n){let o;return c(t,rt,(t=>n(0,o=t))),[o]}return new class extends et{constructor(t){super(),tt(this,t,Ht,It,l,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
