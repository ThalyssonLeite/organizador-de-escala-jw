(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[856],{7856:function(e){var t;t=function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,n){return(t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,n)}function n(e,r,o){return(n=!function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}()?function(e,n,r){var o=[null];o.push.apply(o,n);var a=new(Function.bind.apply(e,o));return r&&t(a,r.prototype),a}:Reflect.construct).apply(null,arguments)}function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}}(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var a,i=Object.hasOwnProperty,l=Object.setPrototypeOf,c=Object.isFrozen,s=Object.getPrototypeOf,u=Object.getOwnPropertyDescriptor,m=Object.freeze,f=Object.seal,p=Object.create,d="undefined"!=typeof Reflect&&Reflect,h=d.apply,g=d.construct;h||(h=function(e,t,n){return e.apply(t,n)}),m||(m=function(e){return e}),f||(f=function(e){return e}),g||(g=function(e,t){return n(e,r(t))});var y=x(Array.prototype.forEach),b=x(Array.prototype.pop),v=x(Array.prototype.push),T=x(String.prototype.toLowerCase),N=x(String.prototype.toString),E=x(String.prototype.match),A=x(String.prototype.replace),w=x(String.prototype.indexOf),S=x(String.prototype.trim),_=x(RegExp.prototype.test),k=(a=TypeError,function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return g(a,t)});function x(e){return function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return h(e,t,r)}}function O(e,t,n){n=n||T,l&&l(e,null);for(var r=t.length;r--;){var o=t[r];if("string"==typeof o){var a=n(o);a!==o&&(c(t)||(t[r]=a),o=a)}e[o]=!0}return e}function D(e){var t,n=p(null);for(t in e)h(i,e,[t])&&(n[t]=e[t]);return n}function C(e,t){for(;null!==e;){var n=u(e,t);if(n){if(n.get)return x(n.get);if("function"==typeof n.value)return x(n.value)}e=s(e)}return function(e){return console.warn("fallback value for",e),null}}var L=m(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),R=m(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),M=m(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),I=m(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),F=m(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),U=m(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),H=m(["#text"]),z=m(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),P=m(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),B=m(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),j=m(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),G=f(/\{\{[\w\W]*|[\w\W]*\}\}/gm),W=f(/<%[\w\W]*|[\w\W]*%>/gm),q=f(/\${[\w\W]*}/gm),Y=f(/^data-[\-\w.\u00B7-\uFFFF]/),$=f(/^aria-[\-\w]+$/),K=f(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),V=f(/^(?:\w+script|data):/i),X=f(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Z=f(/^html$/i),J=function(t,n){if("object"!==e(t)||"function"!=typeof t.createPolicy)return null;var r=null,o="data-tt-policy-suffix";n.currentScript&&n.currentScript.hasAttribute(o)&&(r=n.currentScript.getAttribute(o));var a="dompurify"+(r?"#"+r:"");try{return t.createPolicy(a,{createHTML:function(e){return e},createScriptURL:function(e){return e}})}catch(i){return console.warn("TrustedTypes policy "+a+" could not be created."),null}};return function t(){var n,o,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"undefined"==typeof window?null:window,i=function(e){return t(e)};if(i.version="2.4.1",i.removed=[],!a||!a.document||9!==a.document.nodeType)return i.isSupported=!1,i;var l=a.document,c=a.document,s=a.DocumentFragment,u=a.HTMLTemplateElement,f=a.Node,p=a.Element,d=a.NodeFilter,h=a.NamedNodeMap,g=void 0===h?a.NamedNodeMap||a.MozNamedAttrMap:h,x=a.HTMLFormElement,Q=a.DOMParser,ee=a.trustedTypes,et=p.prototype,en=C(et,"cloneNode"),er=C(et,"nextSibling"),eo=C(et,"childNodes"),ea=C(et,"parentNode");if("function"==typeof u){var ei=c.createElement("template");ei.content&&ei.content.ownerDocument&&(c=ei.content.ownerDocument)}var el=J(ee,l),ec=el?el.createHTML(""):"",es=c,eu=es.implementation,em=es.createNodeIterator,ef=es.createDocumentFragment,ep=es.getElementsByTagName,ed=l.importNode,eh={};try{eh=D(c).documentMode?c.documentMode:{}}catch(eg){}var ey={};i.isSupported="function"==typeof ea&&eu&&void 0!==eu.createHTMLDocument&&9!==eh;var eb=K,ev=null,eT=O({},[].concat(r(L),r(R),r(M),r(F),r(H))),eN=null,eE=O({},[].concat(r(z),r(P),r(B),r(j))),eA=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ew=null,eS=null,e_=!0,ek=!0,ex=!1,eO=!1,eD=!1,eC=!1,eL=!1,eR=!1,eM=!1,eI=!1,eF=!0,eU=!1,eH=!0,ez=!1,eP={},eB=null,ej=O({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),eG=null,eW=O({},["audio","video","img","source","image","track"]),eq=null,eY=O({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),e$="http://www.w3.org/1998/Math/MathML",eK="http://www.w3.org/2000/svg",eV="http://www.w3.org/1999/xhtml",eX=eV,eZ=!1,eJ=null,eQ=O({},[e$,eK,eV],N),e0=["application/xhtml+xml","text/html"],e1=null,e2=c.createElement("form"),e9=function(e){return e instanceof RegExp||e instanceof Function},e3=function(t){(!e1||e1!==t)&&(t&&"object"===e(t)||(t={}),t=D(t),o="application/xhtml+xml"===(n=n=-1===e0.indexOf(t.PARSER_MEDIA_TYPE)?"text/html":t.PARSER_MEDIA_TYPE)?N:T,ev="ALLOWED_TAGS"in t?O({},t.ALLOWED_TAGS,o):eT,eN="ALLOWED_ATTR"in t?O({},t.ALLOWED_ATTR,o):eE,eJ="ALLOWED_NAMESPACES"in t?O({},t.ALLOWED_NAMESPACES,N):eQ,eq="ADD_URI_SAFE_ATTR"in t?O(D(eY),t.ADD_URI_SAFE_ATTR,o):eY,eG="ADD_DATA_URI_TAGS"in t?O(D(eW),t.ADD_DATA_URI_TAGS,o):eW,eB="FORBID_CONTENTS"in t?O({},t.FORBID_CONTENTS,o):ej,ew="FORBID_TAGS"in t?O({},t.FORBID_TAGS,o):{},eS="FORBID_ATTR"in t?O({},t.FORBID_ATTR,o):{},eP="USE_PROFILES"in t&&t.USE_PROFILES,e_=!1!==t.ALLOW_ARIA_ATTR,ek=!1!==t.ALLOW_DATA_ATTR,ex=t.ALLOW_UNKNOWN_PROTOCOLS||!1,eO=t.SAFE_FOR_TEMPLATES||!1,eD=t.WHOLE_DOCUMENT||!1,eR=t.RETURN_DOM||!1,eM=t.RETURN_DOM_FRAGMENT||!1,eI=t.RETURN_TRUSTED_TYPE||!1,eL=t.FORCE_BODY||!1,eF=!1!==t.SANITIZE_DOM,eU=t.SANITIZE_NAMED_PROPS||!1,eH=!1!==t.KEEP_CONTENT,ez=t.IN_PLACE||!1,eb=t.ALLOWED_URI_REGEXP||eb,eX=t.NAMESPACE||eV,t.CUSTOM_ELEMENT_HANDLING&&e9(t.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(eA.tagNameCheck=t.CUSTOM_ELEMENT_HANDLING.tagNameCheck),t.CUSTOM_ELEMENT_HANDLING&&e9(t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(eA.attributeNameCheck=t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),t.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(eA.allowCustomizedBuiltInElements=t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),eO&&(ek=!1),eM&&(eR=!0),eP&&(ev=O({},r(H)),eN=[],!0===eP.html&&(O(ev,L),O(eN,z)),!0===eP.svg&&(O(ev,R),O(eN,P),O(eN,j)),!0===eP.svgFilters&&(O(ev,M),O(eN,P),O(eN,j)),!0===eP.mathMl&&(O(ev,F),O(eN,B),O(eN,j))),t.ADD_TAGS&&(ev===eT&&(ev=D(ev)),O(ev,t.ADD_TAGS,o)),t.ADD_ATTR&&(eN===eE&&(eN=D(eN)),O(eN,t.ADD_ATTR,o)),t.ADD_URI_SAFE_ATTR&&O(eq,t.ADD_URI_SAFE_ATTR,o),t.FORBID_CONTENTS&&(eB===ej&&(eB=D(eB)),O(eB,t.FORBID_CONTENTS,o)),eH&&(ev["#text"]=!0),eD&&O(ev,["html","head","body"]),ev.table&&(O(ev,["tbody"]),delete ew.tbody),m&&m(t),e1=t)},e8=O({},["mi","mo","mn","ms","mtext"]),e6=O({},["foreignobject","desc","title","annotation-xml"]),e5=O({},["title","style","font","a","script"]),e4=O({},R);O(e4,M),O(e4,I);var e7=O({},F);O(e7,U);var te=function(e){var t=ea(e);t&&t.tagName||(t={namespaceURI:eX,tagName:"template"});var r=T(e.tagName),o=T(t.tagName);return!!eJ[e.namespaceURI]&&(e.namespaceURI===eK?t.namespaceURI===eV?"svg"===r:t.namespaceURI===e$?"svg"===r&&("annotation-xml"===o||e8[o]):Boolean(e4[r]):e.namespaceURI===e$?t.namespaceURI===eV?"math"===r:t.namespaceURI===eK?"math"===r&&e6[o]:Boolean(e7[r]):e.namespaceURI===eV?(t.namespaceURI!==eK||!!e6[o])&&(t.namespaceURI!==e$||!!e8[o])&&!e7[r]&&(e5[r]||!e4[r]):"application/xhtml+xml"===n&&!!eJ[e.namespaceURI])},tt=function(e){v(i.removed,{element:e});try{e.parentNode.removeChild(e)}catch(n){try{e.outerHTML=ec}catch(t){e.remove()}}},tn=function(e,t){try{v(i.removed,{attribute:t.getAttributeNode(e),from:t})}catch(n){v(i.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!eN[e]){if(eR||eM)try{tt(t)}catch(r){}else try{t.setAttribute(e,"")}catch(o){}}},tr=function(e){if(eL)e="<remove></remove>"+e;else{var t,r,o=E(e,/^[\r\n\t ]+/);r=o&&o[0]}"application/xhtml+xml"===n&&eX===eV&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var a=el?el.createHTML(e):e;if(eX===eV)try{t=new Q().parseFromString(a,n)}catch(i){}if(!t||!t.documentElement){t=eu.createDocument(eX,"template",null);try{t.documentElement.innerHTML=eZ?"":a}catch(l){}}var s=t.body||t.documentElement;return(e&&r&&s.insertBefore(c.createTextNode(r),s.childNodes[0]||null),eX===eV)?ep.call(t,eD?"html":"body")[0]:eD?t.documentElement:s},to=function(e){return em.call(e.ownerDocument||e,e,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT,null,!1)},ta=function(t){return"object"===e(f)?t instanceof f:t&&"object"===e(t)&&"number"==typeof t.nodeType&&"string"==typeof t.nodeName},ti=function(e,t,n){ey[e]&&y(ey[e],function(e){e.call(i,t,n,e1)})},tl=function(e){if(ti("beforeSanitizeElements",e,null),(t=e)instanceof x&&("string"!=typeof t.nodeName||"string"!=typeof t.textContent||"function"!=typeof t.removeChild||!(t.attributes instanceof g)||"function"!=typeof t.removeAttribute||"function"!=typeof t.setAttribute||"string"!=typeof t.namespaceURI||"function"!=typeof t.insertBefore||"function"!=typeof t.hasChildNodes)||_(/[\u0080-\uFFFF]/,e.nodeName))return tt(e),!0;var t,n,r=o(e.nodeName);if(ti("uponSanitizeElement",e,{tagName:r,allowedTags:ev}),e.hasChildNodes()&&!ta(e.firstElementChild)&&(!ta(e.content)||!ta(e.content.firstElementChild))&&_(/<[/\w]/g,e.innerHTML)&&_(/<[/\w]/g,e.textContent)||"select"===r&&_(/<template/i,e.innerHTML))return tt(e),!0;if(!ev[r]||ew[r]){if(!ew[r]&&ts(r)&&(eA.tagNameCheck instanceof RegExp&&_(eA.tagNameCheck,r)||eA.tagNameCheck instanceof Function&&eA.tagNameCheck(r)))return!1;if(eH&&!eB[r]){var a=ea(e)||e.parentNode,l=eo(e)||e.childNodes;if(l&&a)for(var c=l.length,s=c-1;s>=0;--s)a.insertBefore(en(l[s],!0),er(e))}return tt(e),!0}return e instanceof p&&!te(e)||("noscript"===r||"noembed"===r)&&_(/<\/no(script|embed)/i,e.innerHTML)?(tt(e),!0):(eO&&3===e.nodeType&&(n=A(n=e.textContent,G," "),n=A(n,W," "),n=A(n,q," "),e.textContent!==n&&(v(i.removed,{element:e.cloneNode()}),e.textContent=n)),ti("afterSanitizeElements",e,null),!1)},tc=function(e,t,n){if(eF&&("id"===t||"name"===t)&&(n in c||n in e2))return!1;if(ek&&!eS[t]&&_(Y,t));else if(e_&&_($,t));else if(!eN[t]||eS[t]){if(!(ts(e)&&(eA.tagNameCheck instanceof RegExp&&_(eA.tagNameCheck,e)||eA.tagNameCheck instanceof Function&&eA.tagNameCheck(e))&&(eA.attributeNameCheck instanceof RegExp&&_(eA.attributeNameCheck,t)||eA.attributeNameCheck instanceof Function&&eA.attributeNameCheck(t))||"is"===t&&eA.allowCustomizedBuiltInElements&&(eA.tagNameCheck instanceof RegExp&&_(eA.tagNameCheck,n)||eA.tagNameCheck instanceof Function&&eA.tagNameCheck(n))))return!1}else if(eq[t]);else if(_(eb,A(n,X,"")));else if(("src"===t||"xlink:href"===t||"href"===t)&&"script"!==e&&0===w(n,"data:")&&eG[e]);else if(ex&&!_(V,A(n,X,"")));else if(n)return!1;return!0},ts=function(e){return e.indexOf("-")>0},tu=function(t){ti("beforeSanitizeAttributes",t,null);var n,r,a,l,c=t.attributes;if(c){var s={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:eN};for(l=c.length;l--;){var u=n=c[l],m=u.name,f=u.namespaceURI;if(r="value"===m?n.value:S(n.value),a=o(m),s.attrName=a,s.attrValue=r,s.keepAttr=!0,s.forceKeepAttr=void 0,ti("uponSanitizeAttribute",t,s),r=s.attrValue,!s.forceKeepAttr&&(tn(m,t),s.keepAttr)){if(_(/\/>/i,r)){tn(m,t);continue}eO&&(r=A(r,G," "),r=A(r,W," "),r=A(r,q," "));var p=o(t.nodeName);if(tc(p,a,r)){if(eU&&("id"===a||"name"===a)&&(tn(m,t),r="user-content-"+r),el&&"object"===e(ee)&&"function"==typeof ee.getAttributeType){if(f);else switch(ee.getAttributeType(p,a)){case"TrustedHTML":r=el.createHTML(r);break;case"TrustedScriptURL":r=el.createScriptURL(r)}}try{f?t.setAttributeNS(f,m,r):t.setAttribute(m,r),b(i.removed)}catch(d){}}}}ti("afterSanitizeAttributes",t,null)}},tm=function e(t){var n,r=to(t);for(ti("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)ti("uponSanitizeShadowNode",n,null),!tl(n)&&(n.content instanceof s&&e(n.content),tu(n));ti("afterSanitizeShadowDOM",t,null)};return i.sanitize=function(t){var n,r,c,u,m,p=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if((eZ=!t)&&(t="<!-->"),"string"!=typeof t&&!ta(t)){if("function"!=typeof t.toString)throw k("toString is not a function");if("string"!=typeof(t=t.toString()))throw k("dirty is not a string, aborting")}if(!i.isSupported){if("object"===e(a.toStaticHTML)||"function"==typeof a.toStaticHTML){if("string"==typeof t)return a.toStaticHTML(t);if(ta(t))return a.toStaticHTML(t.outerHTML)}return t}if(eC||e3(p),i.removed=[],"string"==typeof t&&(ez=!1),ez){if(t.nodeName){var d=o(t.nodeName);if(!ev[d]||ew[d])throw k("root node is forbidden and cannot be sanitized in-place")}}else if(t instanceof f)1===(r=(n=tr("<!---->")).ownerDocument.importNode(t,!0)).nodeType&&"BODY"===r.nodeName?n=r:"HTML"===r.nodeName?n=r:n.appendChild(r);else{if(!eR&&!eO&&!eD&&-1===t.indexOf("<"))return el&&eI?el.createHTML(t):t;if(!(n=tr(t)))return eR?null:eI?ec:""}n&&eL&&tt(n.firstChild);for(var h=to(ez?t:n);c=h.nextNode();)!(3===c.nodeType&&c===u||tl(c))&&(c.content instanceof s&&tm(c.content),tu(c),u=c);if(u=null,ez)return t;if(eR){if(eM)for(m=ef.call(n.ownerDocument);n.firstChild;)m.appendChild(n.firstChild);else m=n;return eN.shadowroot&&(m=ed.call(l,m,!0)),m}var g=eD?n.outerHTML:n.innerHTML;return eD&&ev["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&_(Z,n.ownerDocument.doctype.name)&&(g="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+g),eO&&(g=A(g,G," "),g=A(g,W," "),g=A(g,q," ")),el&&eI?el.createHTML(g):g},i.setConfig=function(e){e3(e),eC=!0},i.clearConfig=function(){e1=null,eC=!1},i.isValidAttribute=function(e,t,n){e1||e3({});var r=o(e),a=o(t);return tc(r,a,n)},i.addHook=function(e,t){"function"==typeof t&&(ey[e]=ey[e]||[],v(ey[e],t))},i.removeHook=function(e){if(ey[e])return b(ey[e])},i.removeHooks=function(e){ey[e]&&(ey[e]=[])},i.removeAllHooks=function(){ey={}},i}()},e.exports=t()}}]);