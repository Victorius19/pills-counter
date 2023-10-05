!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=3)}([function(e,t,n){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";n.r(t);n(1);const r=[],s={get:()=>r,add(e){r.push(...e)}};n(0);const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},o=e=>[a.prefix,e,a.suffix].filter(e=>e&&e.length>0).join("-"),i=e=>e||o(a.precache),c=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n};class l extends Error{constructor(e,t){super(c(e,t)),this.name=e,this.details=t}}const u=new Set;const h=(e,t)=>e.filter(e=>t in e),d=async({request:e,mode:t,plugins:n=[]})=>{const r=h(n,"cacheKeyWillBeUsed");let s=e;for(const e of r)s=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:s}),"string"==typeof s&&(s=new Request(s));return s},f=async({cacheName:e,request:t,event:n,matchOptions:r,plugins:s=[]})=>{const a=await self.caches.open(e),o=await d({plugins:s,request:t,mode:"read"});let i=await a.match(o,r);for(const t of s)if("cachedResponseWillBeUsed"in t){const s=t.cachedResponseWillBeUsed;i=await s.call(t,{cacheName:e,event:n,matchOptions:r,cachedResponse:i,request:o})}return i},p=async({cacheName:e,request:t,response:n,event:r,plugins:s=[],matchOptions:a})=>{const o=await d({plugins:s,request:t,mode:"write"});if(!n)throw new l("cache-put-with-no-response",{url:(i=o.url,new URL(String(i),location.href).href.replace(new RegExp("^"+location.origin),""))});var i;const c=await(async({request:e,response:t,event:n,plugins:r=[]})=>{let s=t,a=!1;for(const t of r)if("cacheWillUpdate"in t){a=!0;const r=t.cacheWillUpdate;if(s=await r.call(t,{request:e,response:s,event:n}),!s)break}return a||(s=s&&200===s.status?s:void 0),s||null})({event:r,plugins:s,response:n,request:o});if(!c)return void 0;const p=await self.caches.open(e),y=h(s,"cacheDidUpdate"),g=y.length>0?await f({cacheName:e,matchOptions:a,request:o}):null;try{await p.put(o,c)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of u)await e()}(),e}for(const t of y)await t.cacheDidUpdate.call(t,{cacheName:e,event:r,oldResponse:g,newResponse:c,request:o})},y=async({request:e,fetchOptions:t,event:n,plugins:r=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const s=h(r,"fetchDidFail"),a=s.length>0?e.clone():null;try{for(const t of r)if("requestWillFetch"in t){const r=t.requestWillFetch,s=e.clone();e=await r.call(t,{request:s,event:n})}}catch(e){throw new l("plugin-error-request-will-fetch",{thrownError:e})}const o=e.clone();try{let s;s="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of r)"fetchDidSucceed"in e&&(s=await e.fetchDidSucceed.call(e,{event:n,request:o,response:s}));return s}catch(e){0;for(const t of s)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:o.clone()});throw e}};let g;async function w(e,t){const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},s=t?t(r):r,a=function(){if(void 0===g){const e=new Response("");if("body"in e)try{new Response(e.body),g=!0}catch(e){g=!1}g=!1}return g}()?n.body:await n.blob();return new Response(a,s)}function m(e){if(!e)throw new l("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new l("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(n,location.href),s=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",t),{cacheKey:r.href,url:s.href}}class _{constructor(e){this._cacheName=i(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:r}=m(n),s="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==e)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(r,e),this._urlsToCacheModes.set(r,s),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],r=[],s=await self.caches.open(this._cacheName),a=await s.keys(),o=new Set(a.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)o.has(t)?r.push(e):n.push({cacheKey:t,url:e});const i=n.map(({cacheKey:n,url:r})=>{const s=this._cacheKeysToIntegrities.get(n),a=this._urlsToCacheModes.get(r);return this._addURLToCache({cacheKey:n,cacheMode:a,event:e,integrity:s,plugins:t,url:r})});await Promise.all(i);return{updatedURLs:n.map(e=>e.url),notUpdatedURLs:r}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),r=[];for(const s of t)n.has(s.url)||(await e.delete(s),r.push(s.url));return{deletedURLs:r}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:r,plugins:s,integrity:a}){const o=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});let i,c=await y({event:r,plugins:s,request:o});for(const e of s||[])"cacheWillUpdate"in e&&(i=e);if(!(i?await i.cacheWillUpdate({event:r,request:o,response:c}):c.status<400))throw new l("bad-precaching-response",{url:t,status:c.status});c.redirected&&(c=await w(c)),await p({event:r,plugins:s,response:c,request:e===t?o:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new l("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new l("non-precached-url",{url:e});const n=this.createHandler(t),r=new Request(e);return()=>n({request:r})}}let v;const R=()=>(v||(v=new _),v);const b=(e,t)=>{const n=R().getURLsToCacheKeys();for(const r of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:r,urlManipulation:s}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const o=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(a,t);if(yield o.href,n&&o.pathname.endsWith("/")){const e=new URL(o.href);e.pathname+=n,yield e.href}if(r){const e=new URL(o.href);e.pathname+=".html",yield e.href}if(s){const e=s({url:a});for(const t of e)yield t.href}}(e,t)){const e=n.get(r);if(e)return e}};let U=!1;function T(e){U||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:r}={})=>{const s=i();self.addEventListener("fetch",a=>{const o=b(a.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:r});if(!o)return void 0;let i=self.caches.open(s).then(e=>e.match(o)).then(e=>e||fetch(o));a.respondWith(i)})})(e),U=!0)}const q=e=>{const t=R(),n=s.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},L=e=>{const t=R();e.waitUntil(t.activate())};n(2);const C=e=>e&&"object"==typeof e?e:{handle:e};class x{constructor(e,t,n="GET"){this.handler=C(t),this.match=e,this.method=n}}class E extends x{constructor(e,t,n){super(({url:t})=>{const n=e.exec(t.href);if(n&&(t.origin===location.origin||0===n.index))return n.slice(1)},t,n)}}class K{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const n=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(n),e.ports&&e.ports[0]&&n.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return void 0;const{params:r,route:s}=this.findMatchingRoute({url:n,request:e,event:t});let a=s&&s.handler;if(!a&&this._defaultHandler&&(a=this._defaultHandler),!a)return void 0;let o;try{o=a.handle({url:n,request:e,event:t,params:r})}catch(e){o=Promise.reject(e)}return o instanceof Promise&&this._catchHandler&&(o=o.catch(r=>this._catchHandler.handle({url:n,request:e,event:t}))),o}findMatchingRoute({url:e,request:t,event:n}){const r=this._routes.get(t.method)||[];for(const s of r){let r;const a=s.match({url:e,request:t,event:n});if(a)return r=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:s,params:r}}return{}}setDefaultHandler(e){this._defaultHandler=C(e)}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new l("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let O;const S=()=>(O||(O=new K,O.addFetchListener(),O.addCacheListener()),O);class M{constructor(e,t,{onupgradeneeded:n,onversionchange:r}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=n,this._onversionchange=r||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let n=!1;setTimeout(()=>{n=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const r=indexedDB.open(this._name,this._version);r.onerror=()=>t(r.error),r.onupgradeneeded=e=>{n?(r.transaction.abort(),r.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},r.onsuccess=()=>{const t=r.result;n?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,n){return await this.getAllMatching(e,{query:t,count:n})}async getAllKeys(e,t,n){return(await this.getAllMatching(e,{query:t,count:n,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:n=null,direction:r="next",count:s,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(o,i)=>{const c=o.objectStore(e),l=t?c.index(t):c,u=[],h=l.openCursor(n,r);h.onsuccess=()=>{const e=h.result;e?(u.push(a?e:e.value),s&&u.length>=s?i(u):e.continue()):i(u)}})}async transaction(e,t,n){return await this.open(),await new Promise((r,s)=>{const a=this._db.transaction(e,t);a.onabort=()=>s(a.error),a.oncomplete=()=>r(),n(a,e=>r(e))})}async _call(e,t,n,...r){return await this.transaction([t],n,(n,s)=>{const a=n.objectStore(t),o=a[e].apply(a,r);o.onsuccess=()=>s(o.result)})}close(){this._db&&(this._db.close(),this._db=null)}}M.prototype.OPEN_TIMEOUT=2e3;const N={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(N))for(const n of t)n in IDBObjectStore.prototype&&(M.prototype[n]=async function(t,...r){return await this._call(n,t,e,...r)});function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,s=!1,a=void 0;try{for(var o,i=e[Symbol.iterator]();!(r=(o=i.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){s=!0,a=e}finally{try{r||null==i.return||i.return()}finally{if(s)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return I(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var P,j=0;if("BroadcastChannel"in navigator){var W=new BroadcastChannel("count-channel");W.onmessage=function(e){e.data&&"INCREASE_COUNT_BROADCAST"===e.data.type&&W.postMessage({payload:++j})}}self.addEventListener("message",(function(e){if(e.data&&"INIT_PORT"===e.data.type){var t=A(e.ports,1);P=t[0]}e.data&&"INCREASE_COUNT_MESSAGE"===e.data.type&&P.postMessage({payload:++j}),e.data&&"INCREASE_COUNT_CLIENTS"===e.data.type&&self.clients.matchAll({includeUncontrolled:!0,type:"window"}).then((function(e){e&&e.length&&e[0].postMessage({type:"REPLY_COUNT_CLIENTS",count:++j})})),e.data&&"SKIP_WAITING"===e.data.type&&self.addEventListener("install",()=>self.skipWaiting())})),self.addEventListener("activate",()=>self.clients.claim());var k,H=[].concat(self.__WB_MANIFEST||[]);(function(e){R().addToCacheList(e),e.length>0&&(self.addEventListener("install",q),self.addEventListener("activate",L))})(H),T(k);var B,F=(B="/index.html",R().createHandlerBoundToURL(B));!function(e,t,n){let r;if("string"==typeof e){const s=new URL(e,location.href);0;r=new x(({url:e})=>e.href===s.href,t,n)}else if(e instanceof RegExp)r=new E(e,t,n);else if("function"==typeof e)r=new x(e,t,n);else{if(!(e instanceof x))throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}S().registerRoute(r)}(new class extends x{constructor(e,{allowlist:t=[/./],denylist:n=[]}={}){super(e=>this._match(e),e),this._allowlist=t,this._denylist=n}_match({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const n=e.pathname+e.search;for(const e of this._denylist)if(e.test(n))return!1;return!!this._allowlist.some(e=>e.test(n))}}(F,{denylist:[/^\/_/,/\/[^/?]+\.[^/]+$/]}))}]);
//# sourceMappingURL=service-worker.js.map