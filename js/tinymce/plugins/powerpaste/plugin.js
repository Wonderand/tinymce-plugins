/* !
 * Tiny PowerPaste plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 7.3.0-86
 */

!function() {
    "use strict";
    const e = e=>t=>(e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && ((e,t,n)=>{
            var r, o;
            return o = e,
            !!t.prototype.isPrototypeOf(o) || (null === (r = e.constructor) || void 0 === r ? void 0 : r.name) === t.name
        }
        )(e, String) ? "string" : t
    }
    )(t) === e
      , t = e=>t=>typeof t === e
      , n = e("string")
      , r = e("object")
      , o = e("array")
      , s = t("boolean")
      , a = (void 0,
    e=>undefined === e);
    const i = e=>null == e
      , l = e=>!i(e)
      , c = t("function")
      , u = t("number")
      , d = ()=>{}
      , h = (e,t)=>(...n)=>e(t.apply(null, n))
      , m = e=>()=>e
      , p = e=>e
      , f = (e,t)=>e === t;
    function g(e, ...t) {
        return (...n)=>{
            const r = t.concat(n);
            return e.apply(null, r)
        }
    }
    const v = e=>()=>{
        throw new Error(e)
    }
      , y = e=>e()
      , b = m(!1)
      , x = m(!0);
    class k {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new k(!0,e)
        }
        static none() {
            return k.singletonNone
        }
        fold(e, t) {
            return this.tag ? t(this.value) : e()
        }
        isSome() {
            return this.tag
        }
        isNone() {
            return !this.tag
        }
        map(e) {
            return this.tag ? k.some(e(this.value)) : k.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : k.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : k.none()
        }
        getOr(e) {
            return this.tag ? this.value : e
        }
        or(e) {
            return this.tag ? this : e
        }
        getOrThunk(e) {
            return this.tag ? this.value : e()
        }
        orThunk(e) {
            return this.tag ? this : e()
        }
        getOrDie(e) {
            if (this.tag)
                return this.value;
            throw new Error(null != e ? e : "Called getOrDie on None")
        }
        static from(e) {
            return l(e) ? k.some(e) : k.none()
        }
        getOrNull() {
            return this.tag ? this.value : null
        }
        getOrUndefined() {
            return this.value
        }
        each(e) {
            this.tag && e(this.value)
        }
        toArray() {
            return this.tag ? [this.value] : []
        }
        toString() {
            return this.tag ? `some(${this.value})` : "none()"
        }
    }
    k.singletonNone = new k(!1);
    const w = Array.prototype.slice
      , S = Array.prototype.indexOf
      , C = Array.prototype.push
      , T = (e,t)=>((e,t)=>S.call(e, t))(e, t) > -1
      , I = (e,t)=>{
        for (let n = 0, r = e.length; n < r; n++)
            if (t(e[n], n))
                return !0;
        return !1
    }
      , A = (e,t)=>{
        const n = e.length
          , r = new Array(n);
        for (let o = 0; o < n; o++) {
            const n = e[o];
            r[o] = t(n, o)
        }
        return r
    }
      , O = (e,t)=>{
        for (let n = 0, r = e.length; n < r; n++)
            t(e[n], n)
    }
      , E = (e,t)=>{
        const n = []
          , r = [];
        for (let o = 0, s = e.length; o < s; o++) {
            const s = e[o];
            (t(s, o) ? n : r).push(s)
        }
        return {
            pass: n,
            fail: r
        }
    }
      , L = (e,t)=>{
        const n = [];
        for (let r = 0, o = e.length; r < o; r++) {
            const o = e[r];
            t(o, r) && n.push(o)
        }
        return n
    }
      , N = (e,t,n)=>(O(e, ((e,r)=>{
        n = t(n, e, r)
    }
    )),
    n)
      , _ = (e,t)=>((e,t,n)=>{
        for (let r = 0, o = e.length; r < o; r++) {
            const o = e[r];
            if (t(o, r))
                return k.some(o);
            if (n(o, r))
                break
        }
        return k.none()
    }
    )(e, t, b)
      , D = (e,t)=>{
        for (let n = 0, r = e.length; n < r; n++)
            if (t(e[n], n))
                return k.some(n);
        return k.none()
    }
      , P = e=>{
        const t = [];
        for (let n = 0, r = e.length; n < r; ++n) {
            if (!o(e[n]))
                throw new Error("Arr.flatten item " + n + " was not an array, input: " + e);
            C.apply(t, e[n])
        }
        return t
    }
      , R = (e,t)=>P(A(e, t))
      , M = (e,t)=>{
        for (let n = 0, r = e.length; n < r; ++n)
            if (!0 !== t(e[n], n))
                return !1;
        return !0
    }
      , j = (e,t)=>{
        const n = {};
        for (let r = 0, o = e.length; r < o; r++) {
            const o = e[r];
            n[String(o)] = t(o, r)
        }
        return n
    }
      , F = (e,t)=>{
        const n = w.call(e, 0);
        return n.sort(t),
        n
    }
      , U = e=>((e,t)=>0 < e.length ? k.some(e[0]) : k.none())(e)
      , B = (e,t)=>{
        for (let n = 0; n < e.length; n++) {
            const r = t(e[n], n);
            if (r.isSome())
                return r
        }
        return k.none()
    }
      , z = (e,t,n)=>"" === t || e.length >= t.length && e.substr(n, n + t.length) === t
      , H = (e,t)=>$(e, t) ? ((e,t)=>e.substring(t))(e, t.length) : e
      , W = (e,t,n=0,r)=>{
        const o = e.indexOf(t, n);
        return -1 !== o && (!!a(r) || o + t.length <= r)
    }
      , $ = (e,t)=>z(e, t, 0)
      , V = (e,t)=>z(e, t, e.length - t.length)
      , G = (q = /^\s+|\s+$/g,
    e=>e.replace(q, ""));
    var q;
    const K = e=>parseInt(e, 10)
      , J = (e,t)=>{
        const n = e - t;
        return 0 === n ? 0 : n > 0 ? 1 : -1
    }
      , Y = (e,t,n)=>({
        major: e,
        minor: t,
        patch: n
    })
      , X = e=>{
        const t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
        return t ? Y(K(t[1]), K(t[2]), K(t[3])) : Y(0, 0, 0)
    }
      , Z = e=>t=>t.options.get(e)
      , Q = Z("paste_as_text")
      , ee = Z("paste_merge_formats")
      , te = Z("paste_tab_spaces")
      , ne = Z("smart_paste")
      , re = Z("cache_suffix")
      , oe = Z("automatic_uploads")
      , se = Z("indent_use_margin")
      , ae = Z("powerpaste_block_drop")
      , ie = Z("powerpaste_keep_unsupported_src")
      , le = Z("powerpaste_allow_local_images")
      , ce = Z("powerpaste_word_import")
      , ue = Z("powerpaste_googledocs_import")
      , de = Z("powerpaste_html_import")
      , he = Z("powerpaste_clean_filtered_inline_elements")
      , me = Z("link_default_protocol")
      , pe = Z("powerpaste_autolink_urls")
      , fe = e=>{
        var t;
        return tinymce.explode(null !== (t = e.options.get("images_file_types")) && void 0 !== t ? t : "")
    }
      , ge = e=>{
        let t = e;
        return {
            get: ()=>t,
            set: e=>{
                t = e
            }
        }
    }
      , ve = ()=>{
        const e = (e=>{
            const t = ge(k.none())
              , n = ()=>t.get().each(e);
            return {
                clear: ()=>{
                    n(),
                    t.set(k.none())
                }
                ,
                isSet: ()=>t.get().isSome(),
                get: ()=>t.get(),
                set: e=>{
                    n(),
                    t.set(k.some(e))
                }
            }
        }
        )(d);
        return {
            ...e,
            on: t=>e.get().each(t)
        }
    }
      , ye = (e,t)=>{
        const n = t=>e(t) ? k.from(t.dom.nodeValue) : k.none();
        return {
            get: r=>{
                if (!e(r))
                    throw new Error("Can only get " + t + " value of a " + t + " node");
                return n(r).getOr("")
            }
            ,
            getOption: n,
            set: (n,r)=>{
                if (!e(n))
                    throw new Error("Can only set raw " + t + " value of a " + t + " node");
                n.dom.nodeValue = r
            }
        }
    }
      , be = "undefined" != typeof window ? window : Function("return this;")()
      , xe = (e,t)=>(void 0 !== e[t] && null !== e[t] || (e[t] = {}),
    e[t])
      , ke = (e,t)=>((e,t)=>{
        let n = void 0 !== t ? t : be;
        for (let t = 0; t < e.length; ++t)
            n = xe(n, e[t]);
        return n
    }
    )(e.split("."), t)
      , we = e=>e.dom.nodeName.toLowerCase()
      , Se = e=>e.dom.nodeType
      , Ce = e=>t=>Se(t) === e
      , Te = e=>8 === Se(e) || "#comment" === we(e)
      , Ie = Ce(1)
      , Ae = Ce(3)
      , Oe = Ce(9)
      , Ee = Ce(11)
      , Le = e=>t=>Ie(t) && we(t) === e
      , Ne = ye(Te, "comment")
      , _e = e=>Ne.get(e)
      , De = e=>{
        if (null == e)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: e
        }
    }
      , Pe = {
        fromHtml: (e,t)=>{
            const n = (t || document).createElement("div");
            if (n.innerHTML = e,
            !n.hasChildNodes() || n.childNodes.length > 1) {
                const t = "HTML does not have a single root node";
                throw console.error(t, e),
                new Error(t)
            }
            return De(n.childNodes[0])
        }
        ,
        fromTag: (e,t)=>{
            const n = (t || document).createElement(e);
            return De(n)
        }
        ,
        fromText: (e,t)=>{
            const n = (t || document).createTextNode(e);
            return De(n)
        }
        ,
        fromDom: De,
        fromPoint: (e,t,n)=>k.from(e.dom.elementFromPoint(t, n)).map(De)
    }
      , Re = Object.keys
      , Me = Object.hasOwnProperty
      , je = (e,t)=>{
        const n = Re(e);
        for (let r = 0, o = n.length; r < o; r++) {
            const o = n[r];
            t(e[o], o)
        }
    }
      , Fe = (e,t)=>Ue(e, ((e,n)=>({
        k: n,
        v: t(e, n)
    })))
      , Ue = (e,t)=>{
        const n = {};
        return je(e, ((e,r)=>{
            const o = t(e, r);
            n[o.k] = o.v
        }
        )),
        n
    }
      , Be = (e,t)=>{
        const n = {};
        return ((e,t,n,r)=>{
            je(e, ((e,o)=>{
                (t(e, o) ? n : r)(e, o)
            }
            ))
        }
        )(e, t, (e=>(t,n)=>{
            e[n] = t
        }
        )(n), d),
        n
    }
      , ze = e=>Re(e).length
      , He = (e,t)=>Me.call(e, t)
      , We = e=>{
        let t, n = !1;
        return (...r)=>(n || (n = !0,
        t = e.apply(null, r)),
        t)
    }
      , $e = ()=>Ve(0, 0)
      , Ve = (e,t)=>({
        major: e,
        minor: t
    })
      , Ge = {
        nu: Ve,
        detect: (e,t)=>{
            const n = String(t).toLowerCase();
            return 0 === e.length ? $e() : ((e,t)=>{
                const n = ((e,t)=>{
                    for (let n = 0; n < e.length; n++) {
                        const r = e[n];
                        if (r.test(t))
                            return r
                    }
                }
                )(e, t);
                if (!n)
                    return {
                        major: 0,
                        minor: 0
                    };
                const r = e=>Number(t.replace(n, "$" + e));
                return Ve(r(1), r(2))
            }
            )(e, n)
        }
        ,
        unknown: $e
    }
      , qe = (e,t)=>{
        const n = String(t).toLowerCase();
        return _(e, (e=>e.search(n)))
    }
      , Ke = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/
      , Je = e=>t=>W(t, e)
      , Ye = [{
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: e=>W(e, "edge/") && W(e, "chrome") && W(e, "safari") && W(e, "applewebkit")
    }, {
        name: "Chromium",
        brand: "Chromium",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, Ke],
        search: e=>W(e, "chrome") && !W(e, "chromeframe")
    }, {
        name: "IE",
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: e=>W(e, "msie") || W(e, "trident")
    }, {
        name: "Opera",
        versionRegexes: [Ke, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: Je("opera")
    }, {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: Je("firefox")
    }, {
        name: "Safari",
        versionRegexes: [Ke, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: e=>(W(e, "safari") || W(e, "mobile/")) && W(e, "applewebkit")
    }]
      , Xe = [{
        name: "Windows",
        search: Je("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "iOS",
        search: e=>W(e, "iphone") || W(e, "ipad"),
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
    }, {
        name: "Android",
        search: Je("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "macOS",
        search: Je("mac os x"),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
    }, {
        name: "Linux",
        search: Je("linux"),
        versionRegexes: []
    }, {
        name: "Solaris",
        search: Je("sunos"),
        versionRegexes: []
    }, {
        name: "FreeBSD",
        search: Je("freebsd"),
        versionRegexes: []
    }, {
        name: "ChromeOS",
        search: Je("cros"),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
    }]
      , Ze = {
        browsers: m(Ye),
        oses: m(Xe)
    }
      , Qe = "Edge"
      , et = "Chromium"
      , tt = "Opera"
      , nt = "Firefox"
      , rt = "Safari"
      , ot = e=>{
        const t = e.current
          , n = e.version
          , r = e=>()=>t === e;
        return {
            current: t,
            version: n,
            isEdge: r(Qe),
            isChromium: r(et),
            isIE: r("IE"),
            isOpera: r(tt),
            isFirefox: r(nt),
            isSafari: r(rt)
        }
    }
      , st = ()=>ot({
        current: void 0,
        version: Ge.unknown()
    })
      , at = ot
      , it = (m(Qe),
    m(et),
    m("IE"),
    m(tt),
    m(nt),
    m(rt),
    "Windows")
      , lt = "Android"
      , ct = "Linux"
      , ut = "macOS"
      , dt = "Solaris"
      , ht = "FreeBSD"
      , mt = "ChromeOS"
      , pt = e=>{
        const t = e.current
          , n = e.version
          , r = e=>()=>t === e;
        return {
            current: t,
            version: n,
            isWindows: r(it),
            isiOS: r("iOS"),
            isAndroid: r(lt),
            isMacOS: r(ut),
            isLinux: r(ct),
            isSolaris: r(dt),
            isFreeBSD: r(ht),
            isChromeOS: r(mt)
        }
    }
      , ft = ()=>pt({
        current: void 0,
        version: Ge.unknown()
    })
      , gt = pt
      , vt = (m(it),
    m("iOS"),
    m(lt),
    m(ct),
    m(ut),
    m(dt),
    m(ht),
    m(mt),
    e=>window.matchMedia(e).matches);
    let yt = We((()=>((e,t,n)=>{
        const r = Ze.browsers()
          , o = Ze.oses()
          , s = t.bind((e=>((e,t)=>B(t.brands, (t=>{
            const n = t.brand.toLowerCase();
            return _(e, (e=>{
                var t;
                return n === (null === (t = e.brand) || void 0 === t ? void 0 : t.toLowerCase())
            }
            )).map((e=>({
                current: e.name,
                version: Ge.nu(parseInt(t.version, 10), 0)
            })))
        }
        )))(r, e))).orThunk((()=>((e,t)=>qe(e, t).map((e=>{
            const n = Ge.detect(e.versionRegexes, t);
            return {
                current: e.name,
                version: n
            }
        }
        )))(r, e))).fold(st, at)
          , a = ((e,t)=>qe(e, t).map((e=>{
            const n = Ge.detect(e.versionRegexes, t);
            return {
                current: e.name,
                version: n
            }
        }
        )))(o, e).fold(ft, gt)
          , i = ((e,t,n,r)=>{
            const o = e.isiOS() && !0 === /ipad/i.test(n)
              , s = e.isiOS() && !o
              , a = e.isiOS() || e.isAndroid()
              , i = a || r("(pointer:coarse)")
              , l = o || !s && a && r("(min-device-width:768px)")
              , c = s || a && !l
              , u = t.isSafari() && e.isiOS() && !1 === /safari/i.test(n)
              , d = !c && !l && !u;
            return {
                isiPad: m(o),
                isiPhone: m(s),
                isTablet: m(l),
                isPhone: m(c),
                isTouch: m(i),
                isAndroid: e.isAndroid,
                isiOS: e.isiOS,
                isWebView: m(u),
                isDesktop: m(d)
            }
        }
        )(a, s, e, n);
        return {
            browser: s,
            os: a,
            deviceType: i
        }
    }
    )(window.navigator.userAgent, k.from(window.navigator.userAgentData), vt)));
    const bt = ()=>yt()
      , xt = bt()
      , kt = xt.deviceType.isiOS() || xt.deviceType.isAndroid()
      , wt = m({
        isSupported: !1,
        cleanDocument: ()=>Promise.reject("not supported")
    });
    var St = kt ? wt : (e,t,n)=>{
        const r = t + "/wordimport.js" + (e=>k.from(e).filter((e=>0 !== e.length)).map((e=>(-1 === e.indexOf("?") ? "?" : "") + e)).getOr(""))(n || "v=6.0.0")
          , o = e.loadScript("ephox.wimp", r);
        return o.catch((e=>{
            console.error("Unable to load word import: ", e)
        }
        )),
        {
            isSupported: !0,
            cleanDocument: (e,t,n)=>o.then((r=>r.cleanDocument(e, t, n.cleanFilteredInlineElements)))
        }
    }
    ;
    const Ct = e=>{
        let t = [];
        return {
            bind: e=>{
                if (void 0 === e)
                    throw new Error("Event bind error: undefined handler");
                t.push(e)
            }
            ,
            unbind: e=>{
                t = L(t, (t=>t !== e))
            }
            ,
            trigger: (...n)=>{
                const r = {};
                O(e, ((e,t)=>{
                    r[e] = n[t]
                }
                )),
                O(t, (e=>{
                    e(r)
                }
                ))
            }
        }
    }
      , Tt = e=>{
        const t = Fe(e, (e=>({
            bind: e.bind,
            unbind: e.unbind
        })))
          , n = Fe(e, (e=>e.trigger));
        return {
            registry: t,
            trigger: n
        }
    }
      , It = (e,t)=>{
        const n = e.dom;
        if (1 !== n.nodeType)
            return !1;
        {
            const e = n;
            if (void 0 !== e.matches)
                return e.matches(t);
            if (void 0 !== e.msMatchesSelector)
                return e.msMatchesSelector(t);
            if (void 0 !== e.webkitMatchesSelector)
                return e.webkitMatchesSelector(t);
            if (void 0 !== e.mozMatchesSelector)
                return e.mozMatchesSelector(t);
            throw new Error("Browser lacks native selectors")
        }
    }
      , At = (e,t)=>{
        const n = void 0 === t ? document : t.dom;
        return 1 !== (r = n).nodeType && 9 !== r.nodeType && 11 !== r.nodeType || 0 === r.childElementCount ? [] : A(n.querySelectorAll(e), Pe.fromDom);
        var r
    }
      , Ot = (e,t)=>e.dom === t.dom
      , Et = It
      , Lt = (e,t,n)=>{
        const r = e.document.createRange();
        var o;
        return o = r,
        t.fold((e=>{
            o.setStartBefore(e.dom)
        }
        ), ((e,t)=>{
            o.setStart(e.dom, t)
        }
        ), (e=>{
            o.setStartAfter(e.dom)
        }
        )),
        ((e,t)=>{
            t.fold((t=>{
                e.setEndBefore(t.dom)
            }
            ), ((t,n)=>{
                e.setEnd(t.dom, n)
            }
            ), (t=>{
                e.setEndAfter(t.dom)
            }
            ))
        }
        )(r, n),
        r
    }
      , Nt = (e,t,n,r,o)=>{
        const s = e.document.createRange();
        return s.setStart(t.dom, n),
        s.setEnd(r.dom, o),
        s
    }
      , _t = e=>{
        if (!o(e))
            throw new Error("cases must be an array");
        if (0 === e.length)
            throw new Error("there must be at least one case");
        const t = []
          , n = {};
        return O(e, ((r,s)=>{
            const a = Re(r);
            if (1 !== a.length)
                throw new Error("one and only one name per case");
            const i = a[0]
              , l = r[i];
            if (void 0 !== n[i])
                throw new Error("duplicate key detected:" + i);
            if ("cata" === i)
                throw new Error("cannot have a case named cata (sorry)");
            if (!o(l))
                throw new Error("case arguments must be an array");
            t.push(i),
            n[i] = (...n)=>{
                const r = n.length;
                if (r !== l.length)
                    throw new Error("Wrong number of arguments to case " + i + ". Expected " + l.length + " (" + l + "), got " + r);
                return {
                    fold: (...t)=>{
                        if (t.length !== e.length)
                            throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                        return t[s].apply(null, n)
                    }
                    ,
                    match: e=>{
                        const r = Re(e);
                        if (t.length !== r.length)
                            throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + r.join(","));
                        if (!M(t, (e=>T(r, e))))
                            throw new Error("Not all branches were specified when using match. Specified: " + r.join(", ") + "\nRequired: " + t.join(", "));
                        return e[i].apply(null, n)
                    }
                    ,
                    log: e=>{
                        console.log(e, {
                            constructors: t,
                            constructor: i,
                            params: n
                        })
                    }
                }
            }
        }
        )),
        n
    }
      , Dt = _t([{
        ltr: ["start", "soffset", "finish", "foffset"]
    }, {
        rtl: ["start", "soffset", "finish", "foffset"]
    }])
      , Pt = (e,t,n)=>t(Pe.fromDom(n.startContainer), n.startOffset, Pe.fromDom(n.endContainer), n.endOffset);
    Dt.ltr,
    Dt.rtl;
    const Rt = (e,t,n,r)=>({
        start: e,
        soffset: t,
        finish: n,
        foffset: r
    })
      , Mt = e=>Pe.fromDom(e.dom.ownerDocument)
      , jt = e=>Oe(e) ? e : Mt(e)
      , Ft = e=>Pe.fromDom(jt(e).dom.defaultView)
      , Ut = e=>k.from(e.dom.parentNode).map(Pe.fromDom)
      , Bt = e=>k.from(e.dom.previousSibling).map(Pe.fromDom)
      , zt = e=>k.from(e.dom.nextSibling).map(Pe.fromDom)
      , Ht = e=>(e=>{
        const t = w.call(e, 0);
        return t.reverse(),
        t
    }
    )(((e,t)=>{
        const n = []
          , r = e=>(n.push(e),
        t(e));
        let o = t(e);
        do {
            o = o.bind(r)
        } while (o.isSome());
        return n
    }
    )(e, Bt))
      , Wt = e=>A(e.dom.childNodes, Pe.fromDom)
      , $t = e=>Pe.fromDom(e.dom.host)
      , Vt = e=>{
        const t = Ae(e) ? e.dom.parentNode : e.dom;
        if (null == t || null === t.ownerDocument)
            return !1;
        const n = t.ownerDocument;
        return (e=>{
            const t = (e=>Pe.fromDom(e.dom.getRootNode()))(e);
            return Ee(n = t) && l(n.dom.host) ? k.some(t) : k.none();
            var n
        }
        )(Pe.fromDom(t)).fold((()=>n.body.contains(t)), (r = Vt,
        o = $t,
        e=>r(o(e))));
        var r, o
    }
      , Gt = (e,t)=>{
        let n = [];
        return O(Wt(e), (e=>{
            t(e) && (n = n.concat([e])),
            n = n.concat(Gt(e, t))
        }
        )),
        n
    }
      , qt = (e,t)=>At(t, e)
      , Kt = _t([{
        before: ["element"]
    }, {
        on: ["element", "offset"]
    }, {
        after: ["element"]
    }])
      , Jt = {
        before: Kt.before,
        on: Kt.on,
        after: Kt.after,
        cata: (e,t,n,r)=>e.fold(t, n, r),
        getStart: e=>e.fold(p, p, p)
    }
      , Yt = _t([{
        domRange: ["rng"]
    }, {
        relative: ["startSitu", "finishSitu"]
    }, {
        exact: ["start", "soffset", "finish", "foffset"]
    }])
      , Xt = {
        domRange: Yt.domRange,
        relative: Yt.relative,
        exact: Yt.exact,
        exactFromRange: e=>Yt.exact(e.start, e.soffset, e.finish, e.foffset),
        getWin: e=>{
            const t = (e=>e.match({
                domRange: e=>Pe.fromDom(e.startContainer),
                relative: (e,t)=>Jt.getStart(e),
                exact: (e,t,n,r)=>e
            }))(e);
            return Ft(t)
        }
        ,
        range: Rt
    }
      , Zt = (e,t)=>{
        const n = we(e);
        return "input" === n ? Jt.after(e) : T(["br", "img"], n) ? 0 === t ? Jt.before(e) : Jt.after(e) : Jt.on(e, t)
    }
      , Qt = (e,t,n,r)=>{
        const o = Mt(e).dom.createRange();
        return o.setStart(e.dom, t),
        o.setEnd(n.dom, r),
        o
    }
      , en = e=>k.from(e.getSelection())
      , tn = (e,t,n,r,o)=>{
        ((e,t)=>{
            en(e).each((e=>{
                e.removeAllRanges(),
                e.addRange(t)
            }
            ))
        }
        )(e, Nt(e, t, n, r, o))
    }
      , nn = (e,t,n,r,o)=>{
        const s = ((e,t,n,r)=>{
            const o = Zt(e, t)
              , s = Zt(n, r);
            return Xt.relative(o, s)
        }
        )(t, n, r, o);
        ((e,t)=>{
            ((e,t)=>{
                const n = ((e,t)=>t.match({
                    domRange: e=>({
                        ltr: m(e),
                        rtl: k.none
                    }),
                    relative: (t,n)=>({
                        ltr: We((()=>Lt(e, t, n))),
                        rtl: We((()=>k.some(Lt(e, n, t))))
                    }),
                    exact: (t,n,r,o)=>({
                        ltr: We((()=>Nt(e, t, n, r, o))),
                        rtl: We((()=>k.some(Nt(e, r, o, t, n))))
                    })
                }))(e, t);
                return ((e,t)=>{
                    const n = t.ltr();
                    return n.collapsed ? t.rtl().filter((e=>!1 === e.collapsed)).map((e=>Dt.rtl(Pe.fromDom(e.endContainer), e.endOffset, Pe.fromDom(e.startContainer), e.startOffset))).getOrThunk((()=>Pt(0, Dt.ltr, n))) : Pt(0, Dt.ltr, n)
                }
                )(0, n)
            }
            )(e, t).match({
                ltr: (t,n,r,o)=>{
                    tn(e, t, n, r, o)
                }
                ,
                rtl: (t,n,r,o)=>{
                    en(e).each((s=>{
                        if (s.setBaseAndExtent)
                            s.setBaseAndExtent(t.dom, n, r.dom, o);
                        else if (s.extend)
                            try {
                                ((e,t,n,r,o,s)=>{
                                    t.collapse(n.dom, r),
                                    t.extend(o.dom, s)
                                }
                                )(0, s, t, n, r, o)
                            } catch (s) {
                                tn(e, r, o, t, n)
                            }
                        else
                            tn(e, r, o, t, n)
                    }
                    ))
                }
            })
        }
        )(e, s)
    }
      , rn = e=>{
        if (e.rangeCount > 0) {
            const t = e.getRangeAt(0)
              , n = e.getRangeAt(e.rangeCount - 1);
            return k.some(Rt(Pe.fromDom(t.startContainer), t.startOffset, Pe.fromDom(n.endContainer), n.endOffset))
        }
        return k.none()
    }
      , on = e=>{
        if (null === e.anchorNode || null === e.focusNode)
            return rn(e);
        {
            const t = Pe.fromDom(e.anchorNode)
              , n = Pe.fromDom(e.focusNode);
            return ((e,t,n,r)=>{
                const o = Qt(e, t, n, r)
                  , s = Ot(e, n) && t === r;
                return o.collapsed && !s
            }
            )(t, e.anchorOffset, n, e.focusOffset) ? k.some(Rt(t, e.anchorOffset, n, e.focusOffset)) : rn(e)
        }
    }
      , sn = e=>en(e).filter((e=>e.rangeCount > 0)).bind(on)
      , an = (e,t)=>{
        Ut(e).each((n=>{
            n.dom.insertBefore(t.dom, e.dom)
        }
        ))
    }
      , ln = (e,t)=>{
        zt(e).fold((()=>{
            Ut(e).each((e=>{
                un(e, t)
            }
            ))
        }
        ), (e=>{
            an(e, t)
        }
        ))
    }
      , cn = (e,t)=>{
        (e=>((e,t)=>{
            const n = e.dom.childNodes;
            return k.from(n[0]).map(Pe.fromDom)
        }
        )(e))(e).fold((()=>{
            un(e, t)
        }
        ), (n=>{
            e.dom.insertBefore(t.dom, n.dom)
        }
        ))
    }
      , un = (e,t)=>{
        e.dom.appendChild(t.dom)
    }
      , dn = (e,t)=>{
        an(e, t),
        un(t, e)
    }
      , hn = (e,t)=>{
        O(t, ((n,r)=>{
            const o = 0 === r ? e : t[r - 1];
            ln(o, n)
        }
        ))
    }
      , mn = (e,t)=>{
        O(t, (t=>{
            un(e, t)
        }
        ))
    }
      , pn = e=>{
        e.dom.textContent = "",
        O(Wt(e), (e=>{
            fn(e)
        }
        ))
    }
      , fn = e=>{
        const t = e.dom;
        null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , gn = e=>{
        const t = Wt(e);
        t.length > 0 && hn(e, t),
        fn(e)
    }
      , vn = (e,t,n,r)=>{
        const o = Ot(e, n) && t === r;
        return {
            startContainer: m(e),
            startOffset: m(t),
            endContainer: m(n),
            endOffset: m(r),
            collapsed: m(o)
        }
    }
    ;
    let yn = 0;
    const bn = e=>{
        const t = (new Date).getTime()
          , n = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 * 1e9);
        return yn++,
        e + "_" + n + yn + String(t)
    }
      , xn = (e,t,r)=>{
        if (!(n(r) || s(r) || u(r)))
            throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", r, ":: Element ", e),
            new Error("Attribute value was not simple");
        e.setAttribute(t, r + "")
    }
      , kn = (e,t,n)=>{
        xn(e.dom, t, n)
    }
      , wn = (e,t)=>{
        const n = e.dom;
        je(t, ((e,t)=>{
            xn(n, t, e)
        }
        ))
    }
      , Sn = (e,t)=>{
        const n = e.dom.getAttribute(t);
        return null === n ? void 0 : n
    }
      , Cn = (e,t)=>k.from(Sn(e, t))
      , Tn = (e,t)=>{
        const n = e.dom;
        return !(!n || !n.hasAttribute) && n.hasAttribute(t)
    }
      , In = (e,t)=>{
        e.dom.removeAttribute(t)
    }
      , An = (e,t)=>{
        const n = Sn(e, t);
        return void 0 === n || "" === n ? [] : n.split(" ")
    }
      , On = e=>void 0 !== e.dom.classList
      , En = e=>An(e, "class")
      , Ln = (e,t)=>{
        On(e) ? e.dom.classList.add(t) : ((e,t)=>{
            ((e,t,n)=>{
                const r = An(e, t).concat([n]);
                kn(e, t, r.join(" "))
            }
            )(e, "class", t)
        }
        )(e, t)
    }
      , Nn = (e,t)=>{
        On(e) ? e.dom.classList.remove(t) : ((e,t)=>{
            ((e,t,n)=>{
                const r = L(An(e, t), (e=>e !== n));
                r.length > 0 ? kn(e, t, r.join(" ")) : In(e, t)
            }
            )(e, "class", t)
        }
        )(e, t),
        (e=>{
            0 === (On(e) ? e.dom.classList : En(e)).length && In(e, "class")
        }
        )(e)
    }
      , _n = (e,t)=>On(e) && e.dom.classList.contains(t)
      , Dn = (e,t,n=f)=>e.exists((e=>n(e, t)))
      , Pn = (e,t)=>e ? k.some(t) : k.none()
      , Rn = e=>void 0 !== e.style && c(e.style.getPropertyValue)
      , Mn = (e,t,r)=>{
        if (!n(r))
            throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", r, ":: Element ", e),
            new Error("CSS value must be a string: " + r);
        Rn(e) && e.style.setProperty(t, r)
    }
      , jn = (e,t)=>{
        Rn(e) && e.style.removeProperty(t)
    }
      , Fn = (e,t,n)=>{
        const r = e.dom;
        Mn(r, t, n)
    }
      , Un = (e,t)=>{
        const n = e.dom;
        je(t, ((e,t)=>{
            Mn(n, t, e)
        }
        ))
    }
      , Bn = (e,t)=>{
        const n = e.dom
          , r = window.getComputedStyle(n).getPropertyValue(t);
        return "" !== r || Vt(e) ? r : zn(n, t)
    }
      , zn = (e,t)=>Rn(e) ? e.style.getPropertyValue(t) : ""
      , Hn = (e,t)=>{
        const n = e.dom
          , r = zn(n, t);
        return k.from(r).filter((e=>e.length > 0))
    }
      , Wn = e=>{
        const t = {}
          , n = e.dom;
        if (Rn(n))
            for (let e = 0; e < n.style.length; e++) {
                const r = n.style.item(e);
                t[r] = n.style[r]
            }
        return t
    }
      , $n = (e,t)=>{
        const n = e.dom;
        jn(n, t),
        Dn(Cn(e, "style").map(G), "") && In(e, "style")
    }
      , Vn = e=>"rtl" === Bn(e, "direction") ? "rtl" : "ltr"
      , Gn = (e,t)=>{
        const n = (t || document).createElement("div");
        return n.innerHTML = e,
        Wt(Pe.fromDom(n))
    }
      , qn = e=>e.dom.innerHTML
      , Kn = (e,t,n)=>{
        let r = e.dom;
        const o = c(n) ? n : b;
        for (; r.parentNode; ) {
            r = r.parentNode;
            const e = Pe.fromDom(r);
            if (t(e))
                return k.some(e);
            if (o(e))
                break
        }
        return k.none()
    }
      , Jn = (e,t)=>_(e.dom.childNodes, (e=>t(Pe.fromDom(e)))).map(Pe.fromDom)
      , Yn = (e,t)=>{
        const n = e=>{
            for (let r = 0; r < e.childNodes.length; r++) {
                const o = Pe.fromDom(e.childNodes[r]);
                if (t(o))
                    return k.some(o);
                const s = n(e.childNodes[r]);
                if (s.isSome())
                    return s
            }
            return k.none()
        }
        ;
        return n(e.dom)
    }
      , Xn = (e,t,n)=>Kn(e, (e=>It(e, t)), n)
      , Zn = (e,t,n)=>((e,t,n,r,o)=>((e,t)=>It(e, t))(n, r) ? k.some(n) : c(o) && o(n) ? k.none() : t(n, r, o))(0, Xn, e, t, n)
      , Qn = e=>{
        const t = er(e);
        return {
            resolve: e=>{
                const n = e.split(" ");
                return A(n, (e=>tr(t, e))).join(" ")
            }
        }
    }
      , er = e=>e.replace(/\./g, "-")
      , tr = (e,t)=>e + "-" + t
      , nr = Qn("ephox-sloth").resolve
      , rr = m(nr("bin"))
      , or = ["b", "i", "u", "sub", "sup", "strike"]
      , sr = rr()
      , ar = sr + bn("")
      , ir = ("-100000px",
    "100000px",
    e=>"rtl" === Vn(e) ? "100000px" : "-100000px");
    const lr = (e,t)=>{
        const n = Pe.fromTag("div");
        var r;
        wn(n, t),
        wn(n, {
            contenteditable: "true",
            "aria-hidden": "true"
        }),
        Un(n, {
            position: "fixed",
            top: "0px",
            width: "100px",
            height: "100px",
            overflow: "hidden",
            opacity: "0"
        }),
        r = n,
        O([sr, ar], (e=>{
            Ln(r, e)
        }
        ));
        const o = e=>_n(e, ar);
        return {
            attach: e=>{
                pn(n),
                Fn(n, "left", ir(e)),
                un(e, n)
            }
            ,
            focus: ()=>{
                Xn(n, "body").each((t=>{
                    e.toOff(t, n)
                }
                ))
            }
            ,
            contents: ()=>(((e,t)=>{
                zt(e).filter(t).each((t=>{
                    const n = Wt(t);
                    mn(e, n),
                    fn(t)
                }
                )),
                ((e,t)=>{
                    const n = Wt(e);
                    O(n, (e=>{
                        t(e) && ((e,t)=>{
                            const n = Wt(e)
                              , r = Pe.fromTag("div", Mt(e).dom);
                            mn(r, n),
                            an(e, r),
                            fn(e)
                        }
                        )(e)
                    }
                    ))
                }
                )(e, t),
                O(Wt(e), (e=>{
                    (e=>Ie(e) && !e.dom.hasChildNodes() && T(or, we(e)))(e) && fn(e)
                }
                ))
            }
            )(n, o),
            {
                elements: Wt(n),
                html: qn(n),
                offscreen: n
            }),
            container: m(n),
            detach: ()=>{
                fn(n)
            }
        }
    }
      , cr = e=>{
        const t = Ot(e.start, e.finish) && e.soffset === e.foffset;
        return {
            startContainer: m(e.start),
            startOffset: m(e.soffset),
            endContainer: m(e.finish),
            endOffset: m(e.foffset),
            collapsed: m(t)
        }
    }
      , ur = {
        set: (e,t)=>{
            nn(e, t.startContainer(), t.startOffset(), t.endContainer(), t.endOffset())
        }
        ,
        get: e=>sn(e).map(cr)
    };
    var dr = e=>t=>{
        const n = Tt({
            after: Ct(["container"])
        })
          , r = (e=>{
            const t = Pe.fromTag("br");
            let n = k.none();
            const r = e=>Ft(e).dom;
            return {
                cleanup: ()=>{
                    fn(t)
                }
                ,
                toOn: (t,o)=>{
                    const s = r(o);
                    n.each((n=>{
                        const r = (e=>e.dom.childNodes.length)(t)
                          , o = Ot(t, n.startContainer()) && r < n.startOffset() ? r : n.startOffset()
                          , a = Ot(t, n.endContainer()) && r < n.endOffset() ? r : n.endOffset()
                          , i = vn(n.startContainer(), o, n.endContainer(), a);
                        e.set(s, i)
                    }
                    ))
                }
                ,
                toOff: (o,s)=>{
                    const a = r(s);
                    un(s, t),
                    n = e.get(a),
                    e.set(a, vn(t, 0, t, 0))
                }
            }
        }
        )(ur)
          , o = ((e,t,n)=>{
            const r = lr(e, n)
              , o = ()=>{
                e.cleanup();
                const t = r.contents();
                r.detach(),
                s.trigger.after(t.elements, t.html, r.container())
            }
              , s = Tt({
                before: Ct([]),
                after: Ct(["elements", "html", "container"])
            })
              , a = d;
            return {
                instance: m((()=>{
                    s.trigger.before(),
                    r.attach(t),
                    r.focus(),
                    ((e,t)=>{
                        ((e,t)=>{
                            setTimeout(t, 1)
                        }
                        )(0, t)
                    }
                    )(Mt(t), o)
                }
                )),
                destroy: a,
                events: s.registry
            }
        }
        )(r, t, e);
        return o.events.after.bind((e=>{
            r.toOn(t, e.container),
            n.trigger.after(e.container)
        }
        )),
        {
            run: ()=>{
                o.instance()()
            }
            ,
            events: n.registry
        }
    }
    ;
    const hr = Qn("ephox-cement").resolve
      , mr = {
        cacheSuffix: "",
        pasteBinAttrs: {},
        keepSrc: !1,
        sanitizer: {
            sanitizeHtml: m(""),
            sanitizeText: m("")
        },
        tabSpaces: 4,
        cleanFilteredInlineElements: [],
        indentUseMargin: !1,
        defaultProtocol: "https",
        autoLinkUrls: !0
    }
      , pr = m(hr("smartpaste-eph-bin"))
      , fr = e=>{
        let t = k.none()
          , n = [];
        const r = e=>{
            o() ? s(e) : n.push(e)
        }
          , o = ()=>t.isSome()
          , s = e=>{
            t.each((t=>{
                setTimeout((()=>{
                    e(t)
                }
                ), 0)
            }
            ))
        }
        ;
        return e((e=>{
            o() || (t = k.some(e),
            O(n, s),
            n = [])
        }
        )),
        {
            get: r,
            map: e=>fr((t=>{
                r((n=>{
                    t(e(n))
                }
                ))
            }
            )),
            isReady: o
        }
    }
      , gr = {
        nu: fr,
        pure: e=>fr((t=>{
            t(e)
        }
        ))
    }
      , vr = e=>{
        setTimeout((()=>{
            throw e
        }
        ), 0)
    }
      , yr = e=>{
        const t = t=>{
            e().then(t, vr)
        }
        ;
        return {
            map: t=>yr((()=>e().then(t))),
            bind: t=>yr((()=>e().then((e=>t(e).toPromise())))),
            anonBind: t=>yr((()=>e().then((()=>t.toPromise())))),
            toLazy: ()=>gr.nu(t),
            toCached: ()=>{
                let t = null;
                return yr((()=>(null === t && (t = e()),
                t)))
            }
            ,
            toPromise: e,
            get: t
        }
    }
      , br = e=>yr((()=>new Promise(e)))
      , xr = e=>((e,t)=>t((t=>{
        const n = [];
        let r = 0;
        0 === e.length ? t([]) : O(e, ((o,s)=>{
            o.get((o=>s=>{
                n[o] = s,
                r++,
                r >= e.length && t(n)
            }
            )(s))
        }
        ))
    }
    )))(e, br)
      , kr = ()=>{
        const e = {};
        return {
            getOrSetIndexed: (t,n)=>(t=>void 0 !== e[t])(t) ? e[t] : ((t,n)=>(e[t] = n,
            n))(t, n()),
            waitForLoad: ()=>{
                const t = ((e,t)=>{
                    const n = [];
                    return je(e, ((e,r)=>{
                        n.push(t(e, r))
                    }
                    )),
                    n
                }
                )(e, p);
                return xr(t)
            }
        }
    }
      , wr = e=>{
        const t = t=>t(e)
          , n = m(e)
          , r = ()=>o
          , o = {
            tag: !0,
            inner: e,
            fold: (t,n)=>n(e),
            isValue: x,
            isError: b,
            map: t=>Cr.value(t(e)),
            mapError: r,
            bind: t,
            exists: t,
            forall: t,
            getOr: n,
            or: r,
            getOrThunk: n,
            orThunk: r,
            getOrDie: n,
            each: t=>{
                t(e)
            }
            ,
            toOptional: ()=>k.some(e)
        };
        return o
    }
      , Sr = e=>{
        const t = ()=>n
          , n = {
            tag: !1,
            inner: e,
            fold: (t,n)=>t(e),
            isValue: b,
            isError: x,
            map: t,
            mapError: t=>Cr.error(t(e)),
            bind: t,
            exists: b,
            forall: x,
            getOr: p,
            or: p,
            getOrThunk: y,
            orThunk: y,
            getOrDie: v(String(e)),
            each: d,
            toOptional: k.none
        };
        return n
    }
      , Cr = {
        value: wr,
        error: Sr,
        fromOption: (e,t)=>e.fold((()=>Sr(t)), wr)
    }
      , Tr = e=>{
        const t = Pe.fromDom((e=>{
            if (l(e.target)) {
                const t = Pe.fromDom(e.target);
                if (Ie(t) && l(t.dom.shadowRoot) && e.composed && e.composedPath) {
                    const t = e.composedPath();
                    if (t)
                        return U(t)
                }
            }
            return k.from(e.target)
        }
        )(e).getOr(e.target))
          , n = ()=>e.stopPropagation()
          , r = ()=>e.preventDefault()
          , o = h(r, n);
        return ((e,t,n,r,o,s,a)=>({
            target: e,
            x: t,
            y: n,
            stop: r,
            prevent: o,
            kill: s,
            raw: a
        }))(t, e.clientX, e.clientY, n, r, o, e)
    }
      , Ir = (e,t,n,r)=>{
        e.dom.removeEventListener(t, n, r)
    }
      , Ar = x
      , Or = (e,t,n)=>((e,t,n,r)=>((e,t,n,r,o)=>{
        const s = ((e,t)=>n=>{
            e(n) && t(Tr(n))
        }
        )(n, r);
        return e.dom.addEventListener(t, s, o),
        {
            unbind: g(Ir, e, t, s, o)
        }
    }
    )(e, t, n, r, !1))(e, t, Ar, n)
      , Er = (e=>{
        const t = g(ke, e);
        ke("callbacks", t());
        const n = (n,o)=>{
            const s = t()
              , a = (e=>{
                const t = void 0 === e.count ? 0 : e.count
                  , n = "callback_" + t;
                return e.count = t + 1,
                n
            }
            )(s);
            return s.callbacks[a] = (...e)=>{
                o || r(a),
                n(...e)
            }
            ,
            (t=>e + ".callbacks." + t)(a)
        }
          , r = e=>{
            const n = e.substring(e.lastIndexOf(".") + 1)
              , r = t();
            void 0 !== r.callbacks[n] && delete r.callbacks[n]
        }
        ;
        return {
            ephemeral: e=>n(e, !1),
            permanent: e=>n(e, !0),
            unregister: r
        }
    }
    )("ephox.henchman.features")
      , Lr = (e,t)=>gr.nu((n=>{
        const o = t=>{
            O(a, (e=>{
                e.unbind()
            }
            )),
            n(t.fold((t=>Cr.error(t + 'Unable to download editor stylesheets from "' + e + '"')), Cr.value))
        }
          , s = ((e,t)=>{
            const n = Pe.fromDom(document)
              , r = Pe.fromTag("link", n.dom);
            return wn(r, {
                rel: "stylesheet",
                type: "text/css",
                href: e
            }),
            ((e,t)=>{
                const n = (e=>{
                    const t = e.dom.head;
                    if (null == t)
                        throw new Error("Head is not available yet");
                    return Pe.fromDom(t)
                }
                )(e);
                un(n, t)
            }
            )(n, r),
            r
        }
        )(e)
          , a = [Or(s, "load", (e=>{
            (e=>{
                var t;
                try {
                    const n = null === (t = e.target.dom.sheet) || void 0 === t ? void 0 : t.cssRules;
                    return r(n) && 0 === n.length
                } catch (e) {}
                return !1
            }
            )(e) ? o(Cr.error("")) : t(o)
        }
        )), Or(s, "error", g(o, Cr.error("")))]
    }
    ))
      , Nr = (()=>{
        const e = kr()
          , t = ()=>e.waitForLoad();
        return {
            preload: ()=>{
                t().get(p)
            }
            ,
            addStylesheet: (t,n)=>e.getOrSetIndexed(t, (()=>Lr(t, n))),
            addScript: (t,n)=>e.getOrSetIndexed(t, (()=>(e=>gr.nu((t=>{
                const n = ()=>{
                    o.unbind(),
                    s.unbind()
                }
                  , r = Pe.fromTag("script");
                kn(r, "src", e),
                kn(r, "type", "text/javascript"),
                kn(r, "async", "async"),
                kn(r, "data-main", Er.ephemeral((e=>{
                    t(Cr.value(e))
                }
                )));
                const o = Or(r, "error", (()=>{
                    n(),
                    t(Cr.error("Error loading external script tag " + e))
                }
                ))
                  , s = Or(r, "load", n);
                un(Pe.fromDom(document.head), r)
            }
            )))(t).map(n))),
            waitForLoad: t
        }
    }
    )()
      , _r = {
        loadScript: (e,t)=>new Promise(((e,n)=>{
            ((e,t)=>Nr.addScript(e, t))(t, p).get((t=>{
                t.fold(n, e)
            }
            ))
        }
        ))
    }
      , Dr = _t([{
        error: ["message"]
    }, {
        paste: ["elements", "correlated"]
    }, {
        cancel: []
    }, {
        incomplete: ["elements", "correlated", "message"]
    }])
      , Pr = (e,t,n,r,o)=>e.fold(t, n, r, o)
      , Rr = Dr.error
      , Mr = Dr.paste
      , jr = Dr.cancel
      , Fr = Dr.incomplete
      , Ur = ["officeStyles", "htmlStyles", "gdocsStyles", "isWord", "isGoogleDocs", "proxyBin", "isInternal"]
      , Br = (e,t)=>{
        const n = {};
        return O(Ur, (r=>{
            t[r].or(e[r]).each((e=>{
                n[r] = e
            }
            ))
        }
        )),
        zr(n)
    }
      , zr = e=>j(Ur, (t=>k.from(e[t])))
      , Hr = e=>({
        response: Rr(e),
        bundle: zr({})
    })
      , Wr = e=>Promise.resolve(Hr(e))
      , $r = {
        response: jr(),
        bundle: zr({})
    }
      , Vr = e=>l(e.then)
      , Gr = (e,t,n,r)=>({
        steps: e,
        input: t,
        label: n,
        capture: r
    })
      , qr = (e,t)=>{
        const n = Br(e.bundle, t.bundle)
          , r = ((e,t)=>Pr(e, k.none, k.none, k.none, ((e,n,r)=>Pr(t, k.none, ((e,t)=>k.some(Dr.incomplete(e, t, r))), k.none, k.none))).getOr(t))(e.response, t.response);
        return {
            response: r,
            bundle: n
        }
    }
      , Kr = (e,t,n)=>{
        const r = ()=>e
          , o = ()=>{
            const r = n(t, e);
            return Vr(r) ? r.then((t=>qr(e, t))) : qr(e, r)
        }
        ;
        return Pr(e.response, r, o, r, o)
    }
      , Jr = (Yr = (e,t)=>t,
    (...e)=>{
        if (0 === e.length)
            throw new Error("Can't merge zero objects");
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n];
            for (const e in r)
                He(r, e) && (t[e] = Yr(t[e], r[e]))
        }
        return t
    }
    );
    var Yr;
    const Xr = _t([{
        starts: ["value", "f"]
    }, {
        pattern: ["regex", "f"]
    }, {
        contains: ["value", "f"]
    }, {
        exact: ["value", "f"]
    }, {
        all: []
    }, {
        not: ["stringMatch"]
    }])
      , Zr = p
      , Qr = (e,t)=>e.fold(((e,n)=>0 === n(t).indexOf(n(e))), ((e,n)=>e.test(n(t))), ((e,n)=>n(t).indexOf(n(e)) >= 0), ((e,n)=>n(t) === n(e)), x, (e=>!Qr(e, t)))
      , eo = {
        starts: Xr.starts,
        pattern: Xr.pattern,
        contains: Xr.contains,
        exact: Xr.exact,
        all: Xr.all,
        not: Xr.not,
        cata: (e,t,n,r,o,s,a)=>e.fold(t, n, r, o, s, a),
        matches: Qr,
        caseSensitive: Zr,
        caseInsensitive: e=>e.toLowerCase()
    }
      , to = (e,t)=>{
        const n = we(e)
          , r = t.name
          , o = void 0 !== t.condition ? t.condition : x;
        return eo.matches(r, n) && o(e)
    }
      , no = (e,t,n)=>{
        const r = (e=>{
            const t = {}
              , n = l(e) ? e.split(";") : [];
            return O(n, (e=>{
                const n = e.split(":");
                2 === n.length && (t[G(n[0])] = G(n[1]))
            }
            )),
            t
        }
        )(e.dom.getAttribute("style"))
          , o = {};
        return O(t, (e=>{
            const t = r[e];
            void 0 === t || n(t, e) || (o[e] = t)
        }
        )),
        o
    }
      , ro = e=>{
        const t = Re(e);
        return A(t, (t=>t + ": " + e[t])).join("; ")
    }
      , oo = ["mso-list"]
      , so = (e,t)=>{
        const n = no(e, oo, t)
          , r = ((e,t)=>{
            const n = e.dom.style
              , r = i(n) ? [] : n
              , o = {};
            return O(r, (n=>{
                Hn(e, n).each((e=>{
                    t(e, n) || (o[n] = e)
                }
                ))
            }
            )),
            o
        }
        )(e, t);
        ((e,t,n)=>{
            kn(e, "style", "");
            const r = ze(t)
              , o = ze(n);
            if (0 === r && 0 === o)
                In(e, "style");
            else if (0 === r)
                kn(e, "style", ro(n));
            else {
                je(t, ((t,n)=>{
                    Fn(e, n, t)
                }
                ));
                const r = Sn(e, "style")
                  , s = o > 0 ? ro(n) + "; " : "";
                kn(e, "style", s + r)
            }
        }
        )(e, r, n)
    }
      , ao = (e,t)=>{
        const n = ((e,t)=>{
            const n = {};
            return O(e.dom.attributes, (e=>{
                t(e.value, e.name) || (n[e.name] = e.value)
            }
            )),
            n
        }
        )(e, t);
        ((e,t)=>{
            const n = A(e.dom.attributes, (e=>e.name));
            ze(t) !== n.length && ((e,t,n)=>{
                O(t, (t=>{
                    In(e, t)
                }
                )),
                je(n, ((t,n)=>{
                    kn(e, n, t)
                }
                ))
            }
            )(e, n, t)
        }
        )(e, n)
    }
      , io = (e,t)=>{
        so(Pe.fromDom(e), t)
    }
      , lo = (e,t,n)=>{
        e(n, ((e,r)=>I(t, (t=>((e,t,n,r)=>{
            const o = r.name
              , s = void 0 !== r.condition ? r.condition : x
              , a = void 0 !== r.value ? r.value : eo.all();
            return eo.matches(o, n) && eo.matches(a, t) && s(e)
        }
        )(n, e, r, t)))))
    }
      , co = "startElement"
      , uo = "endElement"
      , ho = "text"
      , mo = "comment"
      , po = (e,t,n)=>{
        let r, o, s;
        const a = Pe.fromDom(e);
        switch (e.nodeType) {
        case 1:
            t ? r = uo : (r = co,
            Un(a, n || {}));
            const i = e;
            o = "HTML" !== i.scopeName && i.scopeName && i.tagName && i.tagName.indexOf(":") <= 0 ? (i.scopeName + ":" + i.tagName).toLowerCase() : i.tagName.toLowerCase();
            break;
        case 3:
            r = ho,
            s = e.nodeValue;
            break;
        case 8:
            r = mo,
            s = e.nodeValue;
            break;
        default:
            console.log("WARNING: Unsupported node type encountered: " + e.nodeType)
        }
        return {
            getNode: m(e),
            tag: ()=>o,
            type: ()=>r,
            text: ()=>s
        }
    }
      , fo = (e,t,n,r)=>{
        const o = r.createElement(e);
        return je(t, ((e,t)=>{
            o.setAttribute(t, e + "")
        }
        )),
        po(o, !1, n)
    }
      , go = (e,t)=>po(t.createElement(e), !0)
      , vo = go("html", window.document)
      , yo = e=>{
        const t = e.createDocumentFragment();
        let n = t;
        const r = e=>{
            n.appendChild(e)
        }
        ;
        return {
            dom: t,
            receive: o=>{
                switch (o.type()) {
                case co:
                    s = o.getNode().cloneNode(!1),
                    r(s),
                    n = s;
                    break;
                case ho:
                    (t=>{
                        const n = e.createTextNode(t.text());
                        r(n)
                    }
                    )(o);
                    break;
                case uo:
                    (()=>{
                        const e = n.parentNode;
                        n = null === e ? t : e
                    }
                    )();
                    break;
                case mo:
                    break;
                default:
                    throw new Error("Unsupported token type: " + o.type())
                }
                var s
            }
            ,
            label: "SERIALISER"
        }
    }
      , bo = e=>t=>{
        ((e,t)=>{
            const n = Jr({
                styles: [],
                attributes: [],
                classes: [],
                tags: []
            }, t)
              , r = qt(e, "*");
            O(r, (e=>{
                lo(so, n.styles, e),
                lo(ao, n.attributes, e),
                O(n.classes, (t=>{
                    const n = Tn(e, "class") ? (e=>On(e) ? (e=>{
                        const t = e.dom.classList
                          , n = new Array(t.length);
                        for (let e = 0; e < t.length; e++) {
                            const r = t.item(e);
                            null !== r && (n[e] = r)
                        }
                        return n
                    }
                    )(e) : En(e))(e) : [];
                    O(n, (n=>{
                        eo.matches(t.name, n) && Nn(e, n)
                    }
                    ))
                }
                ))
            }
            ));
            const o = qt(e, "*");
            O(o, (e=>{
                I(n.tags, g(to, e)) && fn(e)
            }
            ))
        }
        )(t, e)
    }
      , xo = e=>t=>{
        ((e,t)=>{
            const n = Jr({
                tags: []
            }, t)
              , r = qt(e, "*");
            O(r, (e=>{
                I(n.tags, g(to, e)) && gn(e)
            }
            ))
        }
        )(t, e)
    }
      , ko = e=>t=>{
        ((e,t)=>{
            const n = Jr({
                tags: []
            }, t)
              , r = qt(e, "*");
            O(r, (e=>{
                _(n.tags, g(to, e)).each((t=>{
                    t.mutate(e)
                }
                ))
            }
            ))
        }
        )(t, e)
    }
      , wo = e=>t=>{
        const n = qn(t)
          , r = ((e,t,n)=>{
            const r = yo(e)
              , o = ((e,t=window.document)=>{
                const n = t.createElement("div");
                t.body.appendChild(n),
                n.style.position = "absolute",
                n.style.left = "-10000px",
                n.innerHTML = e;
                let r = n.firstChild || vo;
                const o = [];
                let s = !1;
                return {
                    hasNext: ()=>void 0 !== r,
                    next: ()=>{
                        const e = r
                          , a = r
                          , i = s;
                        return !s && e.firstChild ? (o.push(e),
                        r = e.firstChild) : s || 1 !== e.nodeType ? e.nextSibling ? (r = e.nextSibling,
                        s = !1) : (r = o.pop(),
                        s = !0) : s = !0,
                        a === vo || r || (t.body.removeChild(n),
                        r = vo),
                        (l = a) === vo ? l : l ? po(l, i) : void 0;
                        var l
                    }
                }
            }
            )(t, e)
              , s = ((e,t,n)=>{
                let r = n;
                for (let n = t.length - 1; n >= 0; n--)
                    r = t[n](r, {}, e);
                return r
            }
            )(e, n, r);
            for (; o.hasNext(); ) {
                const e = o.next();
                s.receive(e)
            }
            return r.dom
        }
        )(Mt(t).dom, n, e);
        pn(t),
        t.dom.appendChild(r)
    }
      , So = (e,t,n)=>{
        const r = Pe.fromTag("div", e.dom);
        Un(r, {
            position: "fixed",
            left: "-100000px",
            top: "0px"
        }),
        un((e=>{
            const t = e.dom.body;
            if (null == t)
                throw new Error("Body is not available yet");
            return Pe.fromDom(t)
        }
        )(e), r),
        r.dom.innerHTML = t,
        O(n, (e=>{
            e(r)
        }
        ));
        const o = qn(r);
        return fn(r),
        o
    }
      , Co = (e,t)=>n=>{
        const r = e=>{
            n.receive(e)
        }
          , o = (e,t,n)=>(n = void 0 !== n ? n : e.type() === uo,
        po(t, n, {}))
          , s = {
            emit: r,
            emitTokens: e=>{
                O(e, r)
            }
            ,
            receive: t=>{
                e(s, t, o)
            }
            ,
            document: window.document
        };
        return t(s),
        s
    }
      , To = (e,t)=>{
        if (void 0 === e || void 0 === t)
            throw console.trace(),
            new Error("brick");
        e.nextFilter.set(t)
    }
      , Io = (e,t,n=!1)=>e === t || l(e) && l(t) && e.tag === t.tag && e.type === t.type && (n || e.variant === t.variant)
      , Ao = (e,t)=>Tn(Pe.fromDom(t.getNode()), "data-list-level")
      , Oo = (e,t,n,r)=>{
        const o = n.getCurrentListType()
          , s = n.getCurrentLevel() == r.level() ? o : null;
        return (a = r.emblems(),
        i = s,
        _(a, (e=>"ul" === e.tag || l(i) && Io(e, i, !0))).orThunk((()=>U(a)))).filter((e=>!("ol" === e.tag && (e=>{
            if (T(["p"], e.tag())) {
                const t = ((e,t)=>{
                    const n = Pe.fromDom(e.getNode());
                    return Sn(n, "class")
                }
                )(e);
                return l(t) && /^MsoHeading/.test(t)
            }
            return !0
        }
        )(t))));
        var a, i
    }
      , Eo = e=>(t,n,r)=>{
        const o = r
          , s = (e=>{
            const t = parseInt(Sn(e, "data-list-level"), 10)
              , n = Sn(e, "data-list-emblems")
              , r = l(n) ? JSON.parse(n) : [];
            return In(e, "data-list-level"),
            In(e, "data-list-emblems"),
            {
                level: m(t),
                emblems: m(r)
            }
        }
        )(Pe.fromDom(o.getNode()));
        n.originalToken.set(o);
        const a = ((e,t,n)=>(Oo(n.listType.get(), e, n.emitter, t).each(n.listType.set),
        ((e,t,n)=>({
            level: m(e),
            token: m(t),
            type: m(n)
        }))(t.level(), n.originalToken.get(), n.listType.get())))(o, s, n);
        n.emitter.openItem(a.level(), a.token(), a.type()),
        To(n, e.inside())
    }
      , Lo = (e,t,n)=>({
        pred: e,
        action: t,
        label: m(n)
    });
    var No = (e,t,n)=>{
        const r = (e,r,o)=>{
            _(t, (e=>e.pred(r, o))).fold(m(n), (e=>e.action))(e, r, o)
        }
        ;
        return r.toString = ()=>"Handlers for " + e,
        r
    }
    ;
    const _o = (e,t)=>({
        state: m(e),
        result: m(t)
    })
      , Do = (e,t)=>({
        state: m(e),
        value: m(t)
    })
      , Po = (e,t,n,r)=>({
        level: m(e),
        type: m(t),
        types: m(n),
        items: m(r)
    })
      , Ro = e=>{
        const t = e.items().slice(0);
        if (t.length > 0 && "p" !== t[t.length - 1]) {
            const n = t[t.length - 1];
            t[t.length - 1] = "p";
            const r = Po(e.level(), e.type(), e.types(), t);
            return Do(r, k.some(n))
        }
        return Do(e, k.none())
    }
      , Mo = (e,t,n)=>{
        let r = []
          , o = e;
        for (; t(o); ) {
            const e = n(o);
            o = e.state(),
            r = r.concat(e.result())
        }
        return _o(o, r)
    }
      , jo = (e,t,n)=>{
        const r = t.start && t.start > 1 ? {
            start: t.start
        } : {}
          , o = e.level() + 1
          , s = t
          , a = e.types().concat([t])
          , i = [g(fo, t.tag, r, n)]
          , l = Po(o, s, a, e.items());
        return _o(l, i)
    }
      , Fo = e=>{
        const t = e.types().slice(0)
          , n = [g(go, t.pop().tag)]
          , r = e.level() - 1
          , o = t[t.length - 1]
          , s = Po(r, o, t, e.items());
        return _o(s, n)
    }
      , Uo = (e,t,n)=>{
        const r = (c = t) ? (e=>{
            const t = ((e,t)=>{
                const n = Pe.fromDom(e.getNode());
                return Bn(n, "margin-left")
            }
            )(e);
            return l(t) && "0px" !== t ? {
                "margin-left": t
            } : {}
        }
        )(c) : {
            "list-style-type": "none"
        }
          , o = e.type() && !Io(e.type(), n) ? ((e,t)=>{
            const n = Fo(e)
              , r = jo(n.state(), t, t.type ? {
                "list-style-type": t.type
            } : {});
            return _o(r.state(), n.result().concat(r.result()))
        }
        )(e, n) : _o(e, [])
          , s = [g(fo, "li", {}, r)]
          , a = ((e,t)=>{
            const n = e.items().slice(0)
              , r = void 0 !== t && "p" !== t ? k.some(t) : k.none();
            r.fold((()=>{
                n.push("p")
            }
            ), (e=>{
                n.push(e)
            }
            ));
            const o = Po(e.level(), e.type(), e.types(), n);
            return Do(o, r)
        }
        )(o.state(), t && t.tag())
          , i = a.value().map((e=>{
            const n = t;
            return io(n.getNode(), x),
            [m(n)]
        }
        )).getOr([]);
        var c;
        return _o(a.state(), o.result().concat(s).concat(i))
    }
      , Bo = e=>{
        const t = g(go, "li")
          , n = Ro(e)
          , r = n.value().fold((()=>[t]), (e=>[g(go, e), t]));
        return _o(n.state(), r)
    }
      , zo = e=>{
        if (0 === e.length)
            throw new Error("Compose must have at least one element in the list");
        const t = e[e.length - 1]
          , n = R(e, (e=>e.result()));
        return _o(t.state(), n)
    }
      , Ho = e=>{
        const t = Bo(e)
          , n = Fo(t.state());
        return zo([t, n])
    }
      , Wo = (e,t)=>((e,t,n)=>Mo(e, (e=>e.level() > t), n))(e, t, Ho)
      , $o = (e,t,n,r)=>{
        const o = e.level() > t ? Wo(e, t) : _o(e, [])
          , s = o.state().level() === t ? ((e,t,n)=>{
            const r = e.level() > 0 ? Bo(e) : _o(e, [])
              , o = Uo(r.state(), n, t);
            return zo([r, o])
        }
        )(o.state(), r, n) : ((e,t,n,r)=>{
            const o = n > 1 ? Ro(e) : Do(e, k.none())
              , s = o.value().map((e=>[g(go, e)])).getOr([])
              , a = ((e,t,n,r)=>((e,t,n)=>Mo(e, (e=>e.level() < t), n))(e, n, (e=>((e,t,n,r)=>{
                const o = e.level() === n - 1 && t.type ? {
                    "list-style-type": t.type
                } : {}
                  , s = jo(e, t, o)
                  , a = Uo(s.state(), s.state().level() == n ? r : void 0, t);
                return zo([s, a])
            }
            )(e, t, n, r))))(o.state(), t, n, r);
            return _o(a.state(), s.concat(a.result()))
        }
        )(o.state(), r, t, n);
        return zo([o, s])
    }
      , Vo = Wo
      , Go = ["disc", "circle", "square"]
      , qo = {
        getCurrentListType: ()=>Ko().getCurrentListType(),
        getCurrentLevel: ()=>Ko().getCurrentLevel(),
        closeAllLists: ()=>Ko().closeAllLists(),
        openItem: (e,t,n)=>Ko().openItem(e, t, n)
    };
    let Ko = ()=>({
        getCurrentListType: m({}),
        getCurrentLevel: m(1),
        closeAllLists: d,
        openItem: p
    });
    const Jo = {
        inside: ()=>Xo,
        outside: ()=>Zo
    }
      , Yo = (()=>{
        let e = !1;
        return {
            check: t=>!(!e || t.type() !== ho) || (t.type() === co && "style" === t.tag() ? (e = !0,
            !0) : t.type() === uo && "style" === t.tag() && (e = !1,
            !0))
        }
    }
    )()
      , Xo = (e=>No("Inside.List.Item", [Lo(((e,t)=>{
        const n = e.originalToken.get();
        return t.type() === uo && null !== n && t.tag() === n.tag()
    }
    ), ((t,n)=>{
        To(n, e.outside())
    }
    ), "Closing open tag")], ((e,t,n)=>{
        e.emit(n)
    }
    )))(Jo)
      , Zo = (e=>No("Outside.List.Item", [Lo(Ao, Eo(e), "Data List ****"), Lo(((e,t)=>t.type() === ho && (e=>e.type() === ho && /^[\s\u00A0]*$/.test(e.text()))(t)), ((e,t,n)=>{
        e.emit(n)
    }
    ), "Whitespace")], ((t,n,r)=>{
        n.emitter.closeAllLists(),
        t.emit(r),
        To(n, e.outside())
    }
    )))(Jo)
      , Qo = (e=>{
        const t = ge(e)
          , n = ge(null)
          , r = ge(null);
        return {
            reset: o=>{
                t.set(e),
                n.set(null),
                r.set(null),
                Ko = m(((e,t)=>{
                    let n = Po(0, void 0, [], []);
                    const r = n=>{
                        O(n.result(), (n=>{
                            const r = n(t);
                            e.emit(r)
                        }
                        ))
                    }
                    ;
                    return {
                        closeAllLists: ()=>{
                            const e = Vo(n, 0);
                            n = e.state(),
                            r(e)
                        }
                        ,
                        openItem: (e,t,o)=>{
                            if (!o)
                                return;
                            const s = ((e,t)=>"ul" === e.tag && Go[t - 1] === e.type ? {
                                tag: "ul"
                            } : e)(o, e)
                              , a = $o(n, e, t, s);
                            n = a.state(),
                            r(a)
                        }
                        ,
                        getCurrentListType: ()=>n.type(),
                        getCurrentLevel: ()=>n.level()
                    }
                }
                )(o, o.document))
            }
            ,
            nextFilter: t,
            originalToken: n,
            listType: r,
            emitter: qo
        }
    }
    )(Zo);
    var es = Co(((e,t,n)=>{
        Yo.check(t) || ((e,t,n)=>{
            t.nextFilter.get()(e, t, n)
        }
        )(e, Qo, t)
    }
    ), Qo.reset);
    const ts = e=>e.dom.textContent
      , ns = [{
        regex: /^\(?[dc][\.\)]$/,
        type: {
            tag: "ol",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[DC][\.\)]$/,
        type: {
            tag: "ol",
            type: "upper-alpha"
        }
    }, {
        regex: /^\(?M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[\.\)]$/,
        type: {
            tag: "ol",
            type: "upper-roman"
        }
    }, {
        regex: /^\(?m*(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[\.\)]$/,
        type: {
            tag: "ol",
            type: "lower-roman"
        }
    }, {
        regex: /^\(?[0-9]+[\.\)]$/,
        type: {
            tag: "ol"
        }
    }, {
        regex: /^([0-9]+\.)*[0-9]+\.?$/,
        type: {
            tag: "ol",
            variant: "outline"
        }
    }, {
        regex: /^\(?[a-z]+[\.\)]$/,
        type: {
            tag: "ol",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[A-Z]+[\.\)]$/,
        type: {
            tag: "ol",
            type: "upper-alpha"
        }
    }]
      , rs = {
        "\u2022": {
            tag: "ul",
            type: "disc"
        },
        "\xb7": {
            tag: "ul",
            type: "disc"
        },
        "\xa7": {
            tag: "ul",
            type: "square"
        }
    }
      , os = {
        o: {
            tag: "ul",
            type: "circle"
        },
        "-": {
            tag: "ul",
            type: "disc"
        },
        "\u25cf": {
            tag: "ul",
            type: "disc"
        },
        "\ufffd": {
            tag: "ul",
            type: "circle"
        }
    }
      , ss = (e,t)=>a(e.variant) ? "(" === t.charAt(0) ? "()" : ")" === t.charAt(t.length - 1) ? ")" : "." : e.variant
      , as = e=>{
        const t = e.split(".")
          , n = (()=>{
            if (0 === t.length)
                return e;
            const n = t[t.length - 1];
            return 0 === n.length && t.length > 1 ? t[t.length - 2] : n
        }
        )()
          , r = parseInt(n, 10);
        return isNaN(r) ? {} : {
            start: r
        }
    }
      , is = e=>{
        const t = (e=>no(e, ["mso-list"], b)["mso-list"])(e)
          , n = l(t) && / level([0-9]+)/.exec(t);
        return n && n[1] ? k.some(parseInt(n[1], 10)) : k.none()
    }
      , ls = (e,t)=>{
        const n = ((e,t)=>{
            const n = os[e] ? [os[e]] : []
              , r = ((e,t)=>t && rs[e] ? [rs[e]] : t ? [{
                tag: "ul",
                variant: e
            }] : [])(e, t)
              , o = R(ns, (t=>t.regex.test(e) ? [Jr(t.type, as(e), {
                variant: ss(t.type, e)
            })] : []))
              , s = n.concat(r).concat(o);
            return A(s, (t=>void 0 !== t.variant ? t : Jr(t, {
                variant: e
            })))
        }
        )(ts(e).trim(), t);
        return n.length > 0 ? k.some(n) : k.none()
    }
      , cs = e=>Jn(e, Te).bind(zt).filter(Le("span"))
      , us = e=>Yn(e, (e=>!!(Ie(e) ? no(e, ["mso-list"], b) : {})["mso-list"]))
      , ds = e=>Ie(e) && Hn(e, "font-family").exists((e=>T(["wingdings", "symbol"], e.toLowerCase())))
      , hs = (e,t,n,r)=>{
        ((e,t,n)=>{
            kn(e, "data-list-level", t);
            const r = JSON.stringify(n);
            kn(e, "data-list-emblems", r)
        }
        )(e, t, n),
        (e=>{
            const t = ((e,t)=>{
                const n = t.getOr(x);
                return (e=>{
                    const t = [];
                    for (; null !== e.nextNode(); )
                        t.push(Pe.fromDom(e.currentNode));
                    return t
                }
                )(document.createTreeWalker(e.dom, NodeFilter.SHOW_COMMENT, {
                    acceptNode: e=>n(e.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
                }))
            }
            )(e, k.none());
            O(t, fn)
        }
        )(e),
        O(r, fn),
        In(e, "style"),
        In(e, "class")
    }
      , ms = e=>(e=>is(e).bind((t=>(e=>Jn(e, ds))(e).bind((n=>ls(n, !0).map((r=>({
        mutate: ()=>{
            hs(e, t, r, [n])
        }
    }))))))))(e).orThunk((()=>(e=>is(e).bind((t=>cs(e).bind((n=>ls(n, ds(n)).map((r=>({
        mutate: ()=>{
            hs(e, t, r, [n])
        }
    }))))))))(e))).orThunk((()=>(e=>is(e).bind((t=>cs(e).bind((n=>ls(n, ds(n)).map((r=>({
        mutate: ()=>{
            hs(e, t, r, [n])
        }
    }))))))))(e))).orThunk((()=>(e=>"p" !== we(e) ? k.none() : is(e).bind((t=>us(e).bind((n=>ls(n, !1).map((r=>({
        mutate: ()=>{
            hs(e, t, r, [Ut(n).getOr(n)])
        }
    }))))))))(e))).orThunk((()=>(e=>"p" !== we(e) ? k.none() : us(e).bind((t=>{
        const n = Ut(t).getOr(t)
          , r = ds(n);
        return ls(t, r).bind((t=>(e=>Hn(e, "margin-left").bind((e=>{
            const t = parseInt(e, 10);
            return isNaN(t) ? k.none() : k.some(Math.max(1, Math.ceil(t / 18)))
        }
        )))(e).map((r=>({
            mutate: ()=>{
                hs(e, r, t, [n])
            }
        })))))
    }
    )))(e)))
      , ps = ko({
        tags: [{
            name: eo.pattern(/^(p|h\d+)$/, eo.caseInsensitive),
            mutate: e=>{
                ms(e).each((e=>{
                    e.mutate()
                }
                ))
            }
        }]
    })
      , fs = es
      , gs = e=>{
        return (o = e,
        Te(o) ? (t = o,
        n = "v:shape",
        k.from((r = t,
        r.dom.nodeValue)).bind((e=>{
            const t = e.indexOf("]>")
              , r = (e=>{
                try {
                    return (new DOMParser).parseFromString(e, "text/html").body
                } catch (t) {
                    const n = document.implementation.createHTMLDocument("").body;
                    return n.innerHTML = e,
                    n
                }
            }
            )(`<div>${e.slice(t + 2, e.lastIndexOf("<!["))}</div>`);
            return Yn(Pe.fromDom(r), (e=>we(e) === n))
        }
        ))) : k.none()).map((e=>{
            const t = Sn(e, "o:spid")
              , n = void 0 === t ? Cn(e, "id").getOr("") : t
              , r = Pe.fromTag("img");
            return Ln(r, "rtf-data-image"),
            kn(r, "data-image-id", n.substr(7)),
            kn(r, "data-image-type", "code"),
            ((e,t)=>{
                const n = e.dom;
                je(t, ((e,t)=>{
                    e.fold((()=>{
                        jn(n, t)
                    }
                    ), (e=>{
                        Mn(n, t, e)
                    }
                    ))
                }
                ))
            }
            )(r, {
                width: Hn(e, "width"),
                height: Hn(e, "height")
            }),
            r
        }
        ));
        var t, n, r, o
    }
      , vs = e=>{
        if (Le("img")(e)) {
            const t = Sn(e, "src");
            if (null != t && $(t, "file://")) {
                const n = (e=>((e,t)=>Pe.fromDom(e.dom.cloneNode(!1)))(e))(e)
                  , r = t.split(/[\/\\]/)
                  , o = r[r.length - 1];
                return kn(n, "data-image-id", o),
                In(n, "src"),
                kn(n, "data-image-type", "local"),
                Ln(n, "rtf-data-image"),
                k.some(n)
            }
            return k.none()
        }
        return k.none()
    }
    ;
    var ys;
    !function(e) {
        e[e.Word = 0] = "Word",
        e[e.GoogleDocs = 1] = "GoogleDocs",
        e[e.Html = 2] = "Html"
    }(ys || (ys = {}));
    const bs = e=>t=>{
        Cn(t, e.attrName).each((n=>{
            const r = l(e.styleName) ? e.styleName : e.attrName;
            if (Hn(t, r).isNone()) {
                const o = e.mapValue(n);
                Fn(t, r, o)
            }
            In(t, e.attrName)
        }
        ))
    }
      , xs = e=>{
        const t = we(e);
        return "td" === t || "tr" === t || "col" === t || "th" === t
    }
      , ks = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
      , ws = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
      , Ss = e=>H(e, "#").toUpperCase()
      , Cs = e=>{
        const t = e.toString(16);
        return (1 === t.length ? "0" + t : t).toUpperCase()
    }
      , Ts = e=>(e=>({
        value: Ss(e)
    }))(Cs(e.red) + Cs(e.green) + Cs(e.blue))
      , Is = /^\s*rgb\s*\(\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)\s*\)\s*$/i
      , As = /^\s*rgba\s*\(\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*((?:\d?\.\d+|\d+)%?)\s*\)\s*$/i
      , Os = (e,t,n,r)=>({
        red: e,
        green: t,
        blue: n,
        alpha: r
    })
      , Es = (e,t,n,r)=>{
        const o = parseInt(e, 10)
          , s = parseInt(t, 10)
          , a = parseInt(n, 10)
          , i = parseFloat(r);
        return Os(o, s, a, i)
    }
      , Ls = ["background-repeat-x", "background-repeat-y"]
      , Ns = e=>{
        return "currentcolor" === e || "transparent" === e ? e : "#" + (t = H(e, "#").toUpperCase(),
        (e=>ks.test(e) || ws.test(e))(t) ? k.some({
            value: Ss(t)
        }) : k.none()).orThunk((()=>(e=>{
            const t = Is.exec(e);
            if (null !== t)
                return k.some(Es(t[1], t[2], t[3], "1"));
            const n = As.exec(e);
            return null !== n ? k.some(Es(n[1], n[2], n[3], n[4])) : k.none()
        }
        )(e).map(Ts))).getOrThunk((()=>{
            const t = document.createElement("canvas");
            t.height = 1,
            t.width = 1;
            const n = t.getContext("2d");
            n.clearRect(0, 0, t.width, t.height),
            n.fillStyle = "#FFFFFF",
            n.fillStyle = e,
            n.fillRect(0, 0, 1, 1);
            const r = n.getImageData(0, 0, 1, 1).data
              , o = r[0]
              , s = r[1]
              , a = r[2]
              , i = r[3];
            return Ts(Os(o, s, a, i))
        }
        )).value;
        var t
    }
      , _s = (e,t)=>{
        if (a(e))
            return "";
        switch (t) {
        case "color":
            return Ns(e);
        case "font-family":
            return e.replace(/['"]/g, "");
        case "font-weight":
            return (e=>{
                switch (e) {
                case "bold":
                    return "700";
                case "normal":
                    return "400";
                default:
                    return e
                }
            }
            )(e);
        default:
            return V(t, "-color") ? Ns(e) : (e=>e.replace(/^0(pt|px|pc|in|cm|mm|Q|cap|ch|ic|em|ex|lh|rlh|rem|vw|vh|vb|vi|vmax|vmin|%)$/, "0"))(e)
        }
    }
      , Ds = ko({
        tags: [{
            name: eo.pattern(/^(p|div)$/, eo.caseInsensitive),
            mutate: e=>{
                const t = "ltr" === Vn(e)
                  , n = t ? "margin-left" : "margin-right"
                  , r = t ? "padding-left" : "padding-right";
                Hn(e, n).each((()=>{
                    const t = Bn(e, n);
                    Fn(e, r, t),
                    $n(e, n)
                }
                ))
            }
        }]
    })
      , Ps = xo({
        tags: [{
            name: eo.exact("b", eo.caseInsensitive),
            condition: e=>Cn(e, "id").exists((e=>$(e, "docs-internal-guid")))
        }]
    })
      , Rs = bo({
        attributes: [{
            name: eo.exact("id", eo.caseInsensitive),
            value: eo.starts("docs-internal-guid", eo.caseInsensitive)
        }]
    })
      , Ms = [ko({
        tags: [{
            name: eo.exact("col", eo.caseInsensitive),
            mutate: bs({
                attrName: "width",
                mapValue: e=>e.replace(/^(\d+)$/, "$1px")
            })
        }]
    })]
      , js = e=>ko({
        tags: [{
            name: eo.exact(e.matchTag, eo.caseInsensitive),
            mutate: t=>{
                var n, r;
                (n = Wn(t),
                r = e.key,
                He(n, r) ? k.from(n[r]) : k.none()).exists((t=>T(e.values, t))) && (dn(t, Pe.fromTag(e.newTag)),
                $n(t, e.key),
                o(e.removeExtra) && O(e.removeExtra, (e=>$n(t, e))))
            }
        }]
    })
      , Fs = [js({
        matchTag: "span",
        key: "font-weight",
        values: ["700", "bold"],
        newTag: "strong"
    }), js({
        matchTag: "span",
        key: "font-style",
        values: ["italic"],
        newTag: "em"
    }), js({
        matchTag: "span",
        key: "vertical-align",
        values: ["sub"],
        newTag: "sub",
        removeExtra: ["font-size"]
    }), js({
        matchTag: "span",
        key: "vertical-align",
        values: ["super"],
        newTag: "sup",
        removeExtra: ["font-size"]
    })]
      , Us = e=>t=>{
        const n = []
          , r = {
            border: e.browser.isFirefox() ? "medium none" : "none",
            "text-decoration": "none"
        }
          , o = (e,t)=>{
            if (!a(t)) {
                const r = Pe.fromTag(we(e));
                un(t, r),
                n.push({
                    me: e,
                    fake: r
                })
            }
            const r = L(Wt(e), Ie);
            O(r, (t=>o(t, e)))
        }
        ;
        o(t);
        const s = A(n, (e=>{
            const {fake: t, me: n} = e
              , o = Wn(n)
              , s = Be(o, ((e,r)=>{
                const o = ((e,t)=>T(Ls, t) ? Hn(e, "background-repeat") : k.none())(n, r).getOr(e)
                  , s = ((e,t)=>T(Ls, t) ? Bn(e, "background-repeat") : Bn(e, t))(t, r);
                return _s(o, r) === _s(s, r)
            }
            ))
              , a = Be(r, ((e,t)=>Dn(Hn(n, t), e)));
            return {
                fake: t,
                me: n,
                toRemove: s,
                toPreserve: a
            }
        }
        ));
        O(s, (e=>{
            const {me: t, toRemove: n, toPreserve: r, fake: o} = e;
            je(n, ((e,n)=>{
                $n(t, n)
            }
            )),
            je(r, ((e,n)=>{
                Fn(t, n, e)
            }
            )),
            fn(o)
        }
        ))
    }
      , Bs = ["p", "div", "article", "aside", "details", "dt", "figcaption", "footer", "form", "fieldset", "header", "hgroup", "html", "main", "nav", "section", "summary", "body", "dl", "multicol", "dd", "figure", "address", "center", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "listing", "xmp", "pre", "plaintext", "menu", "dir", "ul", "ol", "li", "hr", "table", "tbody", "thead", "tfoot", "th", "tr", "td", "caption"]
      , zs = bo({
        styles: [{
            name: eo.exact("background-color", eo.caseInsensitive),
            value: eo.exact("transparent", eo.caseInsensitive)
        }, {
            name: eo.exact("white-space", eo.caseInsensitive),
            value: eo.starts("pre", eo.caseInsensitive)
        }, {
            name: eo.exact("white-space-collapse", eo.caseInsensitive),
            value: eo.starts("preserve", eo.caseInsensitive)
        }, {
            name: eo.exact("text-wrap", eo.caseInsensitive),
            value: eo.not(eo.exact("wrap", eo.caseInsensitive))
        }, {
            name: eo.exact("text-wrap-mode", eo.caseInsensitive),
            value: eo.not(eo.exact("wrap", eo.caseInsensitive))
        }, {
            name: eo.pattern(/^overflow(-[xy])?$/, eo.caseInsensitive),
            condition: e=>xs(e) && Dn(Hn(e, "overflow"), "hidden")
        }, {
            name: eo.exact("overflow-wrap", eo.caseInsensitive),
            condition: xs
        }, {
            name: eo.exact("table-layout", eo.caseInsensitive),
            value: eo.exact("fixed", eo.caseInsensitive),
            condition: Le("table")
        }, {
            name: eo.exact("line-height", eo.caseInsensitive),
            value: eo.exact("1.38", eo.caseInsensitive)
        }, {
            name: eo.exact("vertical-align", eo.caseInsensitive),
            value: eo.exact("baseline", eo.caseInsensitive)
        }, {
            name: eo.exact("font-style", eo.caseInsensitive),
            value: eo.exact("normal", eo.caseInsensitive)
        }, {
            name: eo.exact("font-variant", eo.caseInsensitive),
            value: eo.exact("normal", eo.caseInsensitive)
        }, {
            name: eo.exact("background-color", eo.caseInsensitive),
            value: eo.exact("transparent", eo.caseInsensitive)
        }, {
            name: eo.starts("padding", eo.caseInsensitive),
            condition: xs
        }, {
            name: eo.pattern(/^text-decoration(-(line|thickness|style|color))?$/, eo.caseInsensitive),
            condition: e=>!Le("a")(e) && Dn(Hn(e, "text-decoration"), "none")
        }],
        attributes: [{
            name: eo.exact("aria-level", eo.caseInsensitive),
            condition: Le("li")
        }, {
            name: eo.exact("dir", eo.caseInsensitive),
            value: eo.exact("ltr", eo.caseInsensitive),
            condition: e=>T(Bs, we(e))
        }, {
            name: eo.exact("role", eo.caseInsensitive),
            value: eo.exact("presentation", eo.caseInsensitive),
            condition: e=>Le("p")(e) && Ut(e).exists(Le("li"))
        }]
    })
      , Hs = bo({
        styles: [{
            name: eo.exact("text-align", eo.caseInsensitive),
            value: eo.exact("right", eo.caseInsensitive),
            condition: e=>"rtl" === Vn(e)
        }]
    })
      , Ws = ko({
        tags: [{
            name: eo.exact("p", eo.caseInsensitive),
            condition: e=>{
                const t = t=>Hn(e, t).map((e=>parseInt(e, 10))).filter((e=>!isNaN(e))).getOr(0)
                  , n = Vn(e);
                return t("text-indent") + t("rtl" === n ? "padding-right" : "padding-left") === 0
            }
            ,
            mutate: e=>{
                const t = Vn(e);
                $n(e, "text-indent"),
                $n(e, "rtl" === t ? "padding-right" : "padding-left")
            }
        }]
    })
      , $s = e=>t=>_n(t, e)
      , Vs = ye(Ae, "text")
      , Gs = e=>Vs.get(e)
      , qs = e=>{
        const t = e.dom.attributes;
        return null == t || 0 === t.length || 1 === t.length && "style" === t[0].name
    }
      , Ks = (e,t)=>{
        const n = Pe.fromTag(e);
        an(t, n);
        const r = t.dom.attributes;
        O(r, (e=>{
            n.dom.setAttribute(e.name, e.value)
        }
        ));
        const o = Wt(t);
        return mn(n, o),
        fn(t),
        n
    }
      , Js = Le("li")
      , Ys = e=>Bt(e).bind((e=>Ae(e) && 0 === Gs(e).trim().length ? Ys(e) : Js(e) ? k.some(e) : k.none()))
      , Xs = e=>{
        const t = Ks("span", e)
          , n = {
            "font-size": {
                1: "8pt",
                2: "10pt",
                3: "12pt",
                4: "14pt",
                5: "18pt",
                6: "24pt",
                7: "36pt"
            }
        };
        je({
            face: "font-family",
            size: "font-size",
            color: "color"
        }, ((e,r)=>{
            Cn(t, r).each((o=>{
                const s = n[e]
                  , a = void 0 !== s && void 0 !== s[o] ? s[o] : o;
                Fn(t, e, a),
                In(t, r)
            }
            ))
        }
        ))
    }
      , Zs = bo({
        tags: [{
            name: eo.exact("script", eo.caseInsensitive)
        }, {
            name: eo.exact("link", eo.caseInsensitive)
        }, {
            name: eo.exact("style", eo.caseInsensitive),
            condition: e=>0 === qn(e).length
        }],
        attributes: [{
            name: eo.starts("on", eo.caseInsensitive)
        }, {
            name: eo.exact('"', eo.caseInsensitive)
        }, {
            name: eo.exact("lang", eo.caseInsensitive)
        }, {
            name: eo.exact("language", eo.caseInsensitive)
        }],
        styles: [{
            name: eo.all(),
            value: eo.pattern(/OLE_LINK/i, eo.caseInsensitive)
        }]
    })
      , Qs = bo({
        tags: [{
            name: eo.exact("meta", eo.caseInsensitive)
        }]
    })
      , ea = bo({
        tags: [{
            name: eo.exact("style", eo.caseInsensitive)
        }]
    })
      , ta = bo({
        styles: [{
            name: eo.not(eo.pattern(/^(width|height|list-style-type)$/, eo.caseInsensitive)),
            condition: e=>!_n(e, "ephox-limbo-transform")
        }, {
            name: eo.pattern(/^(width|height)$/, eo.caseInsensitive),
            condition: e=>{
                return (e=>"img" !== we(e))(e) && !("table" === we(t = e) || xs(t));
                var t
            }
        }]
    })
      , na = (e=[])=>{
        const t = A(e, (e=>({
            name: eo.exact(e, eo.caseInsensitive)
        })));
        return xo({
            tags: t
        })
    }
      , ra = bo({
        classes: [{
            name: eo.not(eo.exact("rtf-data-image", eo.caseInsensitive))
        }]
    })
      , oa = bo({
        styles: [{
            name: eo.pattern(/^(mso-.*|tab-stops|tab-interval|language|text-underline|text-effect|text-line-through|font-color|horiz-align|list-image-[0-9]+|separator-image|table-border-color-(dark|light)|vert-align|vnd\..*)$/, eo.caseInsensitive)
        }]
    })
      , sa = bo({
        classes: [{
            name: eo.pattern(/mso/i, eo.caseInsensitive)
        }]
    })
      , aa = xo({
        tags: [{
            name: eo.exact("img", eo.caseInsensitive),
            condition: e=>{
                const t = Sn(e, "src");
                return n(t) && /^file:/.test(t)
            }
        }]
    })
      , ia = xo({
        tags: [{
            name: eo.exact("a", eo.caseInsensitive),
            condition: qs
        }]
    })
      , la = bo({
        attributes: [{
            name: eo.exact("style", eo.caseInsensitive),
            value: eo.exact("", eo.caseInsensitive)
        }]
    })
      , ca = bo({
        attributes: [{
            name: eo.exact("class", eo.caseInsensitive),
            value: eo.exact("", eo.caseInsensitive)
        }]
    })
      , ua = xo({
        tags: [{
            name: eo.pattern(/^(font|em|strong|samp|acronym|cite|code|dfn|kbd|tt|b|i|u|s|sub|sup|ins|del|var|span)$/, eo.caseInsensitive),
            condition: (da = e=>!qs(e) || (e=>{
                const t = e.dom.attributes
                  , n = null != t && t.length > 0;
                return "span" !== we(e) || n
            }
            )(e) && Yn(e, (e=>{
                const t = !qs(e)
                  , n = !T(["font", "em", "strong", "samp", "acronym", "cite", "code", "dfn", "kbd", "tt", "b", "i", "u", "s", "sub", "sup", "ins", "del", "var", "span"], we(e));
                return Ae(e) || t || n
            }
            )).isSome(),
            e=>!da(e))
        }]
    });
    var da;
    const ha = ko({
        tags: [{
            name: eo.exact("p", eo.caseInsensitive),
            mutate: e=>{
                0 === qn(e).length && un(e, Pe.fromTag("br"))
            }
        }]
    })
      , ma = e=>{
        const t = Ks("span", e);
        Ln(t, "ephox-limbo-transform"),
        Fn(t, "text-decoration", "underline")
    }
      , pa = ko({
        tags: [{
            name: eo.pattern(/ol|ul/, eo.caseInsensitive),
            mutate: e=>{
                Ut(e).each((t=>{
                    const n = we(t);
                    T(["ol", "ul"], n) && Ys(e).fold((()=>{
                        const t = Pe.fromTag("li");
                        Fn(t, "list-style-type", "none"),
                        dn(e, t)
                    }
                    ), (t=>{
                        un(t, e)
                    }
                    ))
                }
                ))
            }
        }]
    })
      , fa = e=>{
        const t = [{
            name: "b",
            transform: {
                mutate: g(Ks, "strong")
            }
        }, {
            name: "i",
            transform: {
                mutate: g(Ks, "em")
            }
        }, {
            name: "u",
            transform: {
                mutate: ma
            }
        }, {
            name: "s",
            transform: {
                mutate: g(Ks, "strike")
            }
        }, {
            name: "font",
            transform: {
                mutate: Xs,
                debug: !0
            }
        }]
          , n = L(t, (t=>!T(e, t.name))).map((e=>({
            name: eo.exact(e.name, eo.caseInsensitive),
            ...e.transform
        })));
        return ko({
            tags: n
        })
    }
      , ga = bo({
        classes: [{
            name: eo.exact("ephox-limbo-transform", eo.caseInsensitive)
        }]
    })
      , va = bo({
        tags: [{
            name: eo.exact("br", eo.caseInsensitive),
            condition: $s("Apple-interchange-newline")
        }]
    })
      , ya = bo({
        styles: [{
            name: eo.pattern(/^-/, eo.caseInsensitive)
        }, {
            name: eo.all(),
            value: eo.exact("initial", eo.caseInsensitive)
        }, {
            name: eo.exact("background-color", eo.caseInsensitive),
            value: eo.exact("transparent", eo.caseInsensitive)
        }, {
            name: eo.exact("font-style", eo.caseInsensitive),
            value: eo.exact("normal", eo.caseInsensitive)
        }, {
            name: eo.pattern(/font-variant.*/, eo.caseInsensitive)
        }, {
            name: eo.exact("letter-spacing", eo.caseInsensitive)
        }, {
            name: eo.exact("font-weight", eo.caseInsensitive),
            value: eo.pattern(/400|normal/, eo.caseInsensitive)
        }, {
            name: eo.exact("orphans", eo.caseInsensitive)
        }, {
            name: eo.exact("text-decoration", eo.caseInsensitive),
            value: eo.exact("none", eo.caseInsensitive)
        }, {
            name: eo.exact("text-size-adjust", eo.caseInsensitive)
        }, {
            name: eo.exact("text-indent", eo.caseInsensitive),
            value: eo.exact("0px", eo.caseInsensitive)
        }, {
            name: eo.exact("text-transform", eo.caseInsensitive),
            value: eo.exact("none", eo.caseInsensitive)
        }, {
            name: eo.exact("white-space", eo.caseInsensitive),
            value: eo.exact("normal", eo.caseInsensitive)
        }, {
            name: eo.exact("widows", eo.caseInsensitive)
        }, {
            name: eo.exact("word-spacing", eo.caseInsensitive),
            value: eo.exact("0px", eo.caseInsensitive)
        }, {
            name: eo.exact("text-align", eo.caseInsensitive),
            value: eo.pattern(/start|end/, eo.caseInsensitive)
        }, {
            name: eo.exact("font-weight", eo.caseInsensitive),
            value: eo.pattern(/700|bold/, eo.caseInsensitive),
            condition: e=>/^h\d$/.test(we(e))
        }]
    })
      , ba = (()=>{
        const e = (e,t)=>n=>e(n).filter((e=>Ae(n) && t(ts(e) || "", " "))).isSome()
          , t = e(Bt, V)
          , n = e(zt, $);
        return ko({
            tags: [{
                name: eo.exact("span", eo.caseInsensitive),
                condition: $s("Apple-converted-space"),
                mutate: e=>{
                    "\xa0" === ts(e) && (t(e) || n(e) ? gn(e) : (an(e, Pe.fromText(" ")),
                    fn(e)))
                }
            }]
        })
    }
    )()
      , xa = (()=>{
        const e = /^file:\/\/\/[^#]+(#[^#]+)$/;
        return ko({
            tags: [{
                name: eo.exact("a", eo.caseInsensitive),
                condition: t=>{
                    const n = Sn(t, "href");
                    return !!n && e.test(n)
                }
                ,
                mutate: t=>{
                    Cn(t, "href").each((n=>{
                        kn(t, "href", n.replace(e, "$1"))
                    }
                    ))
                }
            }]
        })
    }
    )()
      , ka = bo({
        attributes: [{
            name: eo.exact("href", eo.caseInsensitive),
            value: eo.starts("file:///", eo.caseInsensitive)
        }]
    })
      , wa = (()=>{
        const e = (e,t,n)=>({
            name: eo.exact(e, eo.caseInsensitive),
            condition: e=>Tn(e, t),
            mutate: e=>{
                Cn(e, t).each((r=>{
                    kn(e, n, r),
                    In(e, t)
                }
                ))
            }
        });
        return ko({
            tags: [e("a", "data-ephox-href", "href"), e("img", "data-ephox-src", "src")]
        })
    }
    )()
      , Sa = e=>{
        const t = ["table", "thead", "tbody", "tfoot", "th", "tr", "td", "ul", "ol", "li"]
          , n = Gt(e, Te)
          , r = _(n, (e=>W(_e(e), "StartFragment")))
          , o = _(n, (e=>W(_e(e), "EndFragment")));
        r.each((n=>{
            o.each((r=>{
                let o = n;
                const s = [];
                let a = ((e,t,n,r)=>{
                    const o = Qt(e, 0, n, 0);
                    return Pe.fromDom(o.commonAncestorContainer)
                }
                )(n, 0, r);
                for (; void 0 !== a && !Ot(a, e); )
                    T(t, we(a)) ? o = a : s.push(a),
                    a = Ut(a).getOrUndefined();
                O(s, gn),
                O(Ht(o), fn)
            }
            )),
            fn(n)
        }
        )),
        o.each(fn)
    }
      , Ca = ko({
        tags: [{
            name: eo.pattern(/^(img|table)$/, eo.caseInsensitive),
            mutate: e=>{
                Hn(e, "margin-left").exists((e=>$(e, "-"))) && $n(e, "margin-left"),
                $(Bn(e, "margin-left"), "-") && (Fn(e, "margin-top", Bn(e, "margin-top")),
                Fn(e, "margin-bottom", Bn(e, "margin-bottom")),
                Fn(e, "margin-right", Bn(e, "margin-right")),
                $n(e, "margin"))
            }
        }]
    })
      , Ta = ko({
        tags: [{
            name: eo.exact("p", eo.caseInsensitive),
            mutate: bs({
                attrName: "align",
                styleName: "text-align",
                mapValue: p
            })
        }]
    })
      , Ia = (e,t)=>{
        return (n = e,
        Vs.getOption(n)).exists((e=>0 === t(e).length));
        var n
    }
      , Aa = bo({
        tags: [{
            name: eo.exact("font", eo.caseInsensitive),
            condition: e=>{
                const t = Wt(e)
                  , n = e=>e.replace(/[ \r\n\uFEFF]+/g, "");
                return 0 === t.length || M(t, (e=>Ia(e, n)))
            }
        }]
    })
      , Oa = e=>O(Wt(e), (e=>{
        Ia(e, G) && fn(e)
    }
    ))
      , Ea = ko({
        tags: [{
            name: eo.exact("ol", eo.caseInsensitive),
            mutate: Oa
        }, {
            name: eo.exact("ul", eo.caseInsensitive),
            mutate: Oa
        }]
    })
      , La = xo({
        tags: [{
            name: eo.pattern(/^([OVWXP]|U[0-9]+|ST[0-9]+):/i, eo.caseInsensitive)
        }]
    })
      , Na = [wo([fs])]
      , _a = bo({
        attributes: [{
            name: eo.exact("height", eo.caseInsensitive),
            condition: Le("table")
        }]
    })
      , Da = bo({
        attributes: [{
            name: eo.pattern(/^(width|height)$/, eo.caseInsensitive),
            condition: xs
        }]
    })
      , Pa = ko({
        tags: [{
            name: eo.exact("table", eo.caseInsensitive),
            mutate: bs({
                attrName: "width",
                mapValue: e=>e.replace(/^(\d+)$/, "$1px")
            })
        }]
    })
      , Ra = bo({
        styles: [{
            name: eo.exact("height", eo.caseInsensitive),
            condition: Le("td")
        }, {
            name: eo.exact("width", eo.caseInsensitive),
            condition: Le("tr")
        }, {
            name: eo.exact("height", eo.caseInsensitive),
            condition: Le("col")
        }]
    })
      , Ma = bo({
        attributes: [{
            name: eo.pattern(/^v:/, eo.caseInsensitive)
        }, {
            name: eo.exact("href", eo.caseInsensitive),
            value: eo.contains("#_toc", eo.caseInsensitive)
        }, {
            name: eo.exact("href", eo.caseInsensitive),
            value: eo.contains("#_mso", eo.caseInsensitive)
        }, {
            name: eo.pattern(/^xmlns(:|$)/, eo.caseInsensitive)
        }, {
            name: eo.exact("type", eo.caseInsensitive),
            condition: e=>"ol" === we(e) || "ul" === we(e)
        }]
    });
    xo({
        tags: [{
            name: eo.exact("p", eo.caseInsensitive),
            condition: ("li",
            e=>Ut(e).exists((e=>"li" === we(e) && 1 === Wt(e).length)))
        }]
    }),
    ko({
        tags: [{
            name: eo.pattern(/^(img|table)$/, eo.caseInsensitive),
            mutate: e=>{
                Hn(e, "margin-left").exists((e=>$(e, "-"))) && $n(e, "margin-left"),
                $(Bn(e, "margin-left"), "-") && (Fn(e, "margin-top", Bn(e, "margin-top")),
                Fn(e, "margin-bottom", Bn(e, "margin-bottom")),
                Fn(e, "margin-right", Bn(e, "margin-right")),
                $n(e, "margin"))
            }
        }]
    });
    const ja = e=>{
        const t = [Ta, oa, sa]
          , n = [Ta, ta, na(e.cleanFilteredInlineElements), ra];
        return e.merge ? t : n
    }
      , Fa = e=>e.type === ys.Word ? [ps] : []
      , Ua = e=>e.type === ys.Word ? [La, ...Na, Ma] : []
      , Ba = e=>e.type === ys.GoogleDocs ? [Ps] : []
      , za = e=>e.type !== ys.GoogleDocs || e.indentUseMargin ? [] : [Ds]
      , Ha = (e,t)=>e.type === ys.GoogleDocs ? [zs, ...Fs, ...Ms, Us(t), Hs, Ws, ...za(e)] : []
      , Wa = e=>e.type === ys.Html && e.merge ? [ya] : []
      , $a = e=>e.type === ys.Word ? [Ra, Pa, Da, _a] : [];
    _t([{
        bothErrors: ["error1", "error2"]
    }, {
        firstError: ["error1", "value2"]
    }, {
        secondError: ["value1", "error2"]
    }, {
        bothValues: ["value1", "value2"]
    }]);
    const Va = (e,t)=>Ka(document.createElement("canvas"), e, t)
      , Ga = e=>{
        const t = Va(e.width, e.height);
        return qa(t).drawImage(e, 0, 0),
        t
    }
      , qa = e=>e.getContext("2d")
      , Ka = (e,t,n)=>(e.width = t,
    e.height = n,
    e)
      , Ja = e=>e.naturalWidth || e.width
      , Ya = e=>e.naturalHeight || e.height
      , Xa = e=>fetch(e).then((e=>e.ok ? e.blob() : Promise.reject(new Error("Error " + e.status + " downloading image"))), (()=>Promise.reject((()=>{
        const e = new Error("No access to download image");
        return e.code = 18,
        e.name = "SecurityError",
        e
    }
    )())))
      , Za = e=>{
        const t = e.split(",")
          , n = /data:([^;]+)/.exec(t[0]);
        if (!n)
            return k.none();
        const r = n[1]
          , o = t[1]
          , s = 1024
          , a = atob(o)
          , i = a.length
          , l = Math.ceil(i / s)
          , c = new Array(l);
        for (let e = 0; e < l; ++e) {
            const t = e * s
              , n = Math.min(t + s, i)
              , r = new Array(n - t);
            for (let e = t, o = 0; e < n; ++o,
            ++e)
                r[o] = a[e].charCodeAt(0);
            c[e] = new Uint8Array(r)
        }
        return k.some(new Blob(c,{
            type: r
        }))
    }
      , Qa = e=>new Promise(((t,n)=>{
        Za(e).fold((()=>{
            n("uri is not base64: " + e)
        }
        ), t)
    }
    ))
      , ei = (e,t,n)=>(t = t || "image/png",
    c(HTMLCanvasElement.prototype.toBlob) ? new Promise(((r,o)=>{
        e.toBlob((e=>{
            e ? r(e) : o()
        }
        ), t, n)
    }
    )) : Qa(e.toDataURL(t, n)))
      , ti = e=>(e=>{
        const t = URL.createObjectURL(e)
          , n = new Image;
        return n.src = t,
        (e=>new Promise(((t,n)=>{
            const r = ()=>{
                s(),
                t(e)
            }
              , o = [Or(e, "load", r), Or(e, "error", (()=>{
                s(),
                n("Unable to load data from image: " + e.dom.src)
            }
            ))]
              , s = ()=>O(o, (e=>e.unbind()));
            e.dom.complete && r()
        }
        )))(Pe.fromDom(n)).then((e=>e.dom))
    }
    )(e).then((e=>{
        ri(e);
        const t = Va(Ja(e), Ya(e));
        return qa(t).drawImage(e, 0, 0),
        t
    }
    ))
      , ni = e=>new Promise((t=>{
        const n = new FileReader;
        n.onloadend = ()=>{
            t(n.result)
        }
        ,
        n.readAsDataURL(e)
    }
    ))
      , ri = e=>{
        URL.revokeObjectURL(e.src)
    }
      , oi = (e,t,n)=>{
        const r = t.type
          , o = m(r)
          , s = m(n)
          , a = (t,n)=>e.then((e=>((e,t,n)=>(t = t || "image/png",
        e.toDataURL(t, n)))(e, t, n)));
        return {
            getType: o,
            toBlob: ()=>Promise.resolve(t),
            toDataURL: s,
            toBase64: ()=>n.split(",")[1],
            toAdjustedBlob: (t,n)=>e.then((e=>ei(e, t, n))),
            toAdjustedDataURL: a,
            toAdjustedBase64: (e,t)=>a(e, t).then((e=>e.split(",")[1])),
            toCanvas: ()=>e.then(Ga)
        }
    }
      , si = (e,t)=>ei(e, t).then((t=>oi(Promise.resolve(e), t, e.toDataURL())))
      , ai = (e,t,n)=>{
        const r = Ja(e)
          , o = Ya(e);
        let s = t / r
          , a = n / o
          , i = !1;
        (s < .5 || s > 2) && (s = s < .5 ? .5 : 2,
        i = !0),
        (a < .5 || a > 2) && (a = a < .5 ? .5 : 2,
        i = !0);
        const l = ii(e, s, a);
        return i ? l.then((e=>ai(e, t, n))) : l
    }
      , ii = (e,t,n)=>new Promise((r=>{
        const o = Ja(e)
          , s = Ya(e)
          , a = Math.floor(o * t)
          , i = Math.floor(s * n)
          , l = Va(a, i);
        qa(l).drawImage(e, 0, 0, o, s, 0, 0, a, i),
        r(l)
    }
    ))
      , li = (e,t=2)=>{
        const n = Math.pow(10, t)
          , r = Math.round(e * n);
        return Math.ceil(r / n)
    }
      , ci = (e,t,n,r,o)=>((e,t,n,r,o)=>e.toCanvas().then((s=>((e,t,n,r,o,s)=>{
        const a = Va(o, s);
        return qa(a).drawImage(e, -n, -r),
        si(a, t)
    }
    )(s, e.getType(), t, n, r, o))))(e, t, n, r, o)
      , ui = (e,t)=>((e,t)=>e.toCanvas().then((n=>((e,t,n)=>{
        const r = (n < 0 ? 360 + n : n) * Math.PI / 180
          , o = e.width
          , s = e.height
          , a = Math.sin(r)
          , i = Math.cos(r)
          , l = li(Math.abs(o * i) + Math.abs(s * a))
          , c = li(Math.abs(o * a) + Math.abs(s * i))
          , u = Va(l, c)
          , d = qa(u);
        return d.translate(l / 2, c / 2),
        d.rotate(r),
        d.drawImage(e, -o / 2, -s / 2),
        si(u, t)
    }
    )(n, e.getType(), t))))(e, t)
      , di = (e,t)=>((e,t)=>oi(ti(e), e, t))(e, t)
      , hi = e=>(e=>(e=>{
        const t = e.src;
        return 0 === t.indexOf("data:") ? Qa(t) : Xa(t)
    }
    )(e).then((e=>(e=>ni(e).then((t=>oi(ti(e), e, t))))(e))))(e)
      , mi = e=>e.toBlob()
      , pi = e=>e.toDataURL()
      , fi = e=>parseInt(e, 10)
      , gi = e=>e.isPx && (e.cropWidth !== e.width || e.cropHeight !== e.height)
      , vi = /rotate\((\d\.\d+)rad\)/
      , yi = (e,t,n)=>hi(e.dom).then((e=>t=>((e,t,n)=>((e,t,n)=>e.toCanvas().then((r=>ai(r, t, n).then((t=>si(t, e.getType()))))))(e, t, n))(t, e.width, e.height))(t)).then(((e,t)=>n=>{
        if (gi(t)) {
            const r = -1 * fi(Bn(e, "margin-top"))
              , o = -1 * fi(Bn(e, "margin-left"));
            return ci(n, o, r, t.cropWidth, t.cropHeight).then((n=>(wn(e, {
                width: t.cropWidth,
                height: t.cropHeight
            }),
            n)))
        }
        return Promise.resolve(n)
    }
    )(e, t)).then(((e,t)=>n=>(e=>{
        const t = Bn(e, "transform");
        return k.from(vi.exec(t)).map((e=>Math.round(parseFloat(e[1]) * (180 / Math.PI))))
    }
    )(t).fold((()=>Promise.resolve(n)), (r=>ui(n, r).then((n=>($n(t, "transform"),
    In(e, "width"),
    In(e, "height"),
    n))))))(e, n)).then((t=>{
        const n = pi(t);
        return kn(e, "src", n),
        Promise.resolve()
    }
    ))
      , bi = e=>Ut(e).filter(Le("span")).map((t=>{
        const n = ()=>((e,t)=>{
            var n, r, o;
            $n(e, "margin-top"),
            $n(e, "margin-left"),
            $n(t, "width"),
            $n(t, "height"),
            $n(t, "overflow"),
            $n(t, "display"),
            r = e,
            o = ["transform"],
            Ie(n = t) && Ie(r) && O(o, (e=>{
                ((e,t,n)=>{
                    Hn(e, n).each((e=>{
                        Hn(t, n).isNone() && Fn(t, n, e)
                    }
                    ))
                }
                )(n, r, e)
            }
            )),
            $n(t, "transform")
        }
        )(e, t)
          , r = ((e,t)=>{
            const n = (e,t)=>Cn(e, t).map(fi).filter((e=>!isNaN(e))).getOr(0)
              , r = Bn(t, "width")
              , o = Bn(t, "height")
              , s = n(e, "width")
              , a = n(e, "height")
              , i = /^\d+px$/;
            return {
                isPx: i.test(r) && i.test(o),
                cropWidth: fi(r),
                cropHeight: fi(o),
                width: s,
                height: a
            }
        }
        )(e, t);
        return (gi(r) || vi.test(Bn(t, "transform")) ? yi(e, r, t) : Promise.resolve()).then(n, n)
    }
    )).getOrThunk((()=>Promise.resolve()));
    var xi = ["body", "p", "div", "article", "aside", "figcaption", "figure", "footer", "header", "nav", "section", "ol", "ul", "li", "table", "thead", "tbody", "tfoot", "caption", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "address"];
    const ki = (e,t)=>D(e, (e=>e.start === t))
      , wi = (e,t,n=0)=>N(e, ((e,n)=>t(n, e.len).fold(m(e), (t=>({
        len: t.finish,
        list: e.list.concat([t])
    })))), {
        len: n,
        list: []
    }).list
      , Si = (e,t,n)=>0 === t.length ? e : R(e, (e=>{
        const r = R(t, (t=>((e,t)=>t >= e.start && t <= e.finish)(e, t) ? [t - e.start] : []));
        return r.length > 0 ? ((e,t,n)=>((e,t)=>A(e, (e=>({
            ...e,
            start: e.start + t,
            finish: e.finish + t
        }))))(n(e, t), e.start))(e, r, n) : [e]
    }
    ))
      , Ci = (e,t)=>{
        const n = R(t, (t=>{
            const n = ((e,t)=>{
                const n = t.term()
                  , r = [];
                let o = n.exec(e);
                for (; o; ) {
                    const s = o.index + t.prefix(o)
                      , a = o[0].length - t.prefix(o) - t.suffix(o);
                    r.push({
                        start: s,
                        finish: s + a
                    }),
                    n.lastIndex = s + a,
                    o = n.exec(e)
                }
                return r
            }
            )(e, t.pattern);
            return A(n, (e=>({
                ...t,
                ...e
            })))
        }
        ));
        return (e=>{
            const t = (e=>F(e, ((e,t)=>e.start - t.start)))(e);
            return N(t, ((e,t)=>{
                const n = I(e, (e=>t.start >= e.start && t.finish <= e.finish));
                return D(e, (e=>t.start === e.start)).fold((()=>n ? e : [...e, t]), (n=>t.finish > e[n].finish ? [...e.slice(0, n), t] : e))
            }
            ), [])
        }
        )(n)
    }
      , Ti = (e,t,n)=>({
        element: e,
        start: t,
        finish: n
    })
      , Ii = _t([{
        include: ["item"]
    }, {
        excludeWith: ["item"]
    }, {
        excludeWithout: ["item"]
    }])
      , Ai = {
        include: Ii.include,
        excludeWith: Ii.excludeWith,
        excludeWithout: Ii.excludeWithout,
        cata: (e,t,n,r)=>e.fold(t, n, r)
    }
      , Oi = _t([{
        boundary: ["item", "universe"]
    }, {
        empty: ["item", "universe"]
    }, {
        text: ["item", "universe"]
    }, {
        nonEditable: ["item", "universe"]
    }])
      , Ei = b
      , Li = x
      , Ni = m(0)
      , _i = m(1)
      , Di = e=>({
        ...e,
        isBoundary: ()=>e.fold(Li, Ei, Ei, Ei),
        toText: ()=>e.fold(k.none, k.none, (e=>k.some(e)), k.none),
        is: t=>e.fold(Ei, Ei, ((e,n)=>n.eq(e, t)), Ei),
        len: ()=>e.fold(Ni, _i, ((e,t)=>t.property().getText(e).length), _i)
    })
      , Pi = {
        text: h(Di, Oi.text),
        boundary: h(Di, Oi.boundary),
        empty: h(Di, Oi.empty),
        nonEditable: h(Di, Oi.empty),
        cata: (e,t,n,r,o)=>e.fold(t, n, r, o)
    }
      , Ri = m([])
      , Mi = (e,t,n)=>{
        if (e.property().isText(t))
            return [Pi.text(t, e)];
        if (e.property().isEmptyTag(t))
            return [Pi.empty(t, e)];
        if (e.property().isNonEditable(t))
            return [];
        if (e.property().isElement(t)) {
            const r = e.property().children(t)
              , o = e.property().isBoundary(t) ? [Pi.boundary(t, e)] : []
              , s = void 0 !== n && n(t) ? [] : R(r, (t=>Mi(e, t, n)));
            return o.concat(s).concat(o)
        }
        return []
    }
      , ji = Mi
      , Fi = (e,t,n)=>{
        const r = ((e,t)=>{
            const n = [];
            let r = [];
            return O(e, (e=>{
                const o = t(e);
                Ai.cata(o, (()=>{
                    r.push(e)
                }
                ), (()=>{
                    r.length > 0 && n.push(r),
                    n.push([e]),
                    r = []
                }
                ), (()=>{
                    r.length > 0 && n.push(r),
                    r = []
                }
                ))
            }
            )),
            r.length > 0 && n.push(r),
            n
        }
        )(R(t, (t=>ji(e, t, n))), (e=>e.match({
            boundary: ()=>Ai.excludeWithout(e),
            empty: ()=>Ai.excludeWith(e),
            text: ()=>Ai.include(e),
            nonEditable: ()=>Ai.excludeWithout(e)
        })));
        return L(r, (e=>e.length > 0))
    }
      , Ui = (e,t,n)=>{
        const r = R(n, (e=>[e.start, e.finish]))
          , o = Si(t, r, ((t,n)=>((e,t,n)=>{
            const r = e.property().getText(t)
              , o = L(((e,t)=>{
                if (0 === t.length)
                    return [e];
                const n = N(t, ((t,n)=>{
                    if (0 === n)
                        return t;
                    const r = e.substring(t.prev, n);
                    return {
                        prev: n,
                        values: t.values.concat([r])
                    }
                }
                ), {
                    prev: 0,
                    values: []
                })
                  , r = t[t.length - 1];
                return r < e.length ? n.values.concat(e.substring(r)) : n.values
            }
            )(r, n), (e=>e.length > 0));
            if (o.length <= 1)
                return [Ti(t, 0, r.length)];
            e.property().setText(t, o[0]);
            const s = wi(o.slice(1), ((t,n)=>{
                const r = e.create().text(t)
                  , o = Ti(r, n, n + t.length);
                return k.some(o)
            }
            ), o[0].length)
              , a = A(s, (e=>e.element));
            return e.insert().afterAll(t, a),
            [Ti(t, 0, o[0].length)].concat(s)
        }
        )(e, t.element, n)));
        return A(n, (t=>{
            const n = ((e,t,n)=>{
                const r = ki(e, t)
                  , o = ki(e, n);
                return r.bind((t=>{
                    const r = o.getOr(((e,t)=>e[e.length - 1] && e[e.length - 1].finish === t ? e.length + 1 : -1)(e, n));
                    return r > -1 ? k.some(e.slice(t, r)) : k.none()
                }
                )).getOr([])
            }
            )(o, t.start, t.finish)
              , r = A(n, (e=>e.element))
              , s = A(r, e.property().getText).join("");
            return {
                elements: r,
                word: t.word,
                exact: s
            }
        }
        ))
    }
      , Bi = {
        up: m({
            selector: Xn,
            closest: Zn,
            predicate: Kn,
            all: (e,t)=>{
                const n = c(t) ? t : b;
                let r = e.dom;
                const o = [];
                for (; null !== r.parentNode && void 0 !== r.parentNode; ) {
                    const e = r.parentNode
                      , t = Pe.fromDom(e);
                    if (o.push(t),
                    !0 === n(t))
                        break;
                    r = e
                }
                return o
            }
        }),
        down: m({
            selector: qt,
            predicate: Gt
        }),
        styles: m({
            get: Bn,
            getRaw: Hn,
            set: Fn,
            remove: $n
        }),
        attrs: m({
            get: Sn,
            set: kn,
            remove: In,
            copyTo: (e,t)=>{
                const n = N(e.dom.attributes, ((e,t)=>(e[t.name] = t.value,
                e)), {});
                wn(t, n)
            }
        }),
        insert: m({
            before: an,
            after: ln,
            afterAll: hn,
            append: un,
            appendAll: mn,
            prepend: cn,
            wrap: dn
        }),
        remove: m({
            unwrap: gn,
            remove: fn
        }),
        create: m({
            nu: Pe.fromTag,
            clone: e=>Pe.fromDom(e.dom.cloneNode(!1)),
            text: Pe.fromText
        }),
        query: m({
            comparePosition: (e,t)=>e.dom.compareDocumentPosition(t.dom),
            prevSibling: Bt,
            nextSibling: zt
        }),
        property: m({
            children: Wt,
            name: we,
            parent: Ut,
            document: e=>jt(e).dom,
            isText: Ae,
            isComment: Te,
            isElement: Ie,
            isSpecial: e=>{
                const t = we(e);
                return T(["script", "noscript", "iframe", "noframes", "noembed", "title", "style", "textarea", "xmp"], t)
            }
            ,
            getLanguage: e=>Ie(e) ? Cn(e, "lang") : k.none(),
            getText: Gs,
            setText: (e,t)=>Vs.set(e, t),
            isBoundary: e=>!!Ie(e) && ("body" === we(e) || T(xi, we(e))),
            isEmptyTag: e=>!!Ie(e) && T(["br", "img", "hr", "input"], we(e)),
            isNonEditable: e=>Ie(e) && "false" === Sn(e, "contenteditable")
        }),
        eq: Ot,
        is: Et
    }
      , zi = /(?:[A-Za-z][A-Za-z\d.+-]{0,14}:\/\/(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?|www\.|[-;:&=+$,.\w]+@)[A-Za-z\d-]+(?:\.[A-Za-z\d-]+)*(?::\d+)?(?:\/(?:[-.~*+=!;:'%@$(),\/\w]*[-~*+=%@$()\/\w])?)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?/g.source
      , Hi = e=>{
        return ((e,t,n)=>((e,t,n,r)=>{
            const o = Fi(e, t, r)
              , s = R(o, (t=>{
                const r = R(t, (e=>e.fold(Ri, Ri, (e=>[e]), Ri)))
                  , o = A(r, e.property().getText).join("")
                  , s = Ci(o, n)
                  , a = ((e,t)=>wi(t, ((t,n)=>{
                    const r = n + e.property().getText(t).length;
                    return k.from(Ti(t, n, r))
                }
                )))(e, r);
                return Ui(e, a, s)
            }
            ));
            return s
        }
        )(Bi, e, t, void 0))(e, [{
            word: "__INTERNAL__",
            pattern: (t = zi,
            ((e,t,n,r)=>({
                term: ()=>new RegExp(e,r.getOr("g")),
                prefix: t,
                suffix: n
            }))(t, m(0), m(0), k.none()))
        }]);
        var t
    }
      , Wi = e=>!Zn(e, "a", undefined).isSome()
      , $i = (e,t)=>{
        const n = Hi(e);
        O(n, (e=>{
            const n = e.exact;
            if (n.indexOf("@") < 0 || Vi(n)) {
                const r = W(n, "://") ? n : `${t.defaultProtocol}://${n}`;
                ((e,t)=>{
                    k.from(e[0]).filter(Wi).map((n=>{
                        const r = Pe.fromTag("a");
                        return an(n, r),
                        mn(r, e),
                        kn(r, "href", t),
                        r
                    }
                    ))
                }
                )(e.elements, r)
            }
        }
        ))
    }
      , Vi = e=>{
        const t = e.indexOf("://");
        return t >= 3 && t <= 9
    }
      , Gi = (e,t)=>{
        O(e, (e=>{
            Ie(e) && Hn(e, "position").isSome() && $n(e, "position")
        }
        ))
    }
      , qi = (e,t)=>{
        const n = L(e, Le("li"));
        if (n.length > 0) {
            const t = Ht(n[0])
              , r = Pe.fromTag("ul");
            if (an(e[0], r),
            t.length > 0) {
                const e = Pe.fromTag("li");
                un(r, e),
                mn(e, t)
            }
            mn(r, n)
        }
    }
      , Ki = (e,t)=>{
        const n = Wt(e);
        O([...t.autoLinkUrls ? [$i] : [], Gi, qi], (e=>{
            e(n, t)
        }
        ))
    }
      , Ji = {
        disabled: ()=>({
            discriminator: "disabled",
            data: {}
        }),
        fromClipboard: e=>({
            discriminator: "fromClipboard",
            data: {
                rtf: e
            }
        })
    }
      , Yi = Re(Ji)
      , Xi = Ji.disabled
      , Zi = Ji.fromClipboard
      , Qi = e=>void 0 !== e && void 0 !== e.types && null !== e.types
      , el = (e,t)=>{
        const n = new RegExp(t,"i");
        return B(e, (e=>Pn(null !== n.exec(e), {
            type: e,
            flavor: t
        })))
    }
    ;
    function tl(e) {
        return tl = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ,
        tl(e)
    }
    function nl(e, t) {
        return nl = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t,
            e
        }
        ,
        nl(e, t)
    }
    function rl(e, t, n) {
        return rl = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                ))),
                !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct : function(e, t, n) {
            var r = [null];
            r.push.apply(r, t);
            var o = new (Function.bind.apply(e, r));
            return n && nl(o, n.prototype),
            o
        }
        ,
        rl.apply(null, arguments)
    }
    function ol(e) {
        return function(e) {
            if (Array.isArray(e))
                return sl(e)
        }(e) || function(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                return Array.from(e)
        }(e) || function(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return sl(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? sl(e, t) : void 0
            }
        }(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function sl(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++)
            r[n] = e[n];
        return r
    }
    var al = Object.hasOwnProperty
      , il = Object.setPrototypeOf
      , ll = Object.isFrozen
      , cl = Object.getPrototypeOf
      , ul = Object.getOwnPropertyDescriptor
      , dl = Object.freeze
      , hl = Object.seal
      , ml = Object.create
      , pl = "undefined" != typeof Reflect && Reflect
      , fl = pl.apply
      , gl = pl.construct;
    fl || (fl = function(e, t, n) {
        return e.apply(t, n)
    }
    ),
    dl || (dl = function(e) {
        return e
    }
    ),
    hl || (hl = function(e) {
        return e
    }
    ),
    gl || (gl = function(e, t) {
        return rl(e, ol(t))
    }
    );
    var vl, yl = El(Array.prototype.forEach), bl = El(Array.prototype.pop), xl = El(Array.prototype.push), kl = El(String.prototype.toLowerCase), wl = El(String.prototype.toString), Sl = El(String.prototype.match), Cl = El(String.prototype.replace), Tl = El(String.prototype.indexOf), Il = El(String.prototype.trim), Al = El(RegExp.prototype.test), Ol = (vl = TypeError,
    function() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        return gl(vl, t)
    }
    );
    function El(e) {
        return function(t) {
            for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
                r[o - 1] = arguments[o];
            return fl(e, t, r)
        }
    }
    function Ll(e, t, n) {
        var r;
        n = null !== (r = n) && void 0 !== r ? r : kl,
        il && il(e, null);
        for (var o = t.length; o--; ) {
            var s = t[o];
            if ("string" == typeof s) {
                var a = n(s);
                a !== s && (ll(t) || (t[o] = a),
                s = a)
            }
            e[s] = !0
        }
        return e
    }
    function Nl(e) {
        var t, n = ml(null);
        for (t in e)
            !0 === fl(al, e, [t]) && (n[t] = e[t]);
        return n
    }
    function _l(e, t) {
        for (; null !== e; ) {
            var n = ul(e, t);
            if (n) {
                if (n.get)
                    return El(n.get);
                if ("function" == typeof n.value)
                    return El(n.value)
            }
            e = cl(e)
        }
        return function(e) {
            return console.warn("fallback value for", e),
            null
        }
    }
    var Dl = dl(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"])
      , Pl = dl(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"])
      , Rl = dl(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"])
      , Ml = dl(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"])
      , jl = dl(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"])
      , Fl = dl(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"])
      , Ul = dl(["#text"])
      , Bl = dl(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"])
      , zl = dl(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"])
      , Hl = dl(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"])
      , Wl = dl(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"])
      , $l = hl(/\{\{[\w\W]*|[\w\W]*\}\}/gm)
      , Vl = hl(/<%[\w\W]*|[\w\W]*%>/gm)
      , Gl = hl(/\${[\w\W]*}/gm)
      , ql = hl(/^data-[\-\w.\u00B7-\uFFFF]/)
      , Kl = hl(/^aria-[\-\w]+$/)
      , Jl = hl(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i)
      , Yl = hl(/^(?:\w+script|data):/i)
      , Xl = hl(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g)
      , Zl = hl(/^html$/i)
      , Ql = function() {
        return "undefined" == typeof window ? null : window
    }
      , ec = function e() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ql()
          , n = function(t) {
            return e(t)
        };
        if (n.version = "2.4.7",
        n.removed = [],
        !t || !t.document || 9 !== t.document.nodeType)
            return n.isSupported = !1,
            n;
        var r = t.document
          , o = t.document
          , s = t.DocumentFragment
          , a = t.HTMLTemplateElement
          , i = t.Node
          , l = t.Element
          , c = t.NodeFilter
          , u = t.NamedNodeMap
          , d = void 0 === u ? t.NamedNodeMap || t.MozNamedAttrMap : u
          , h = t.HTMLFormElement
          , m = t.DOMParser
          , p = t.trustedTypes
          , f = l.prototype
          , g = _l(f, "cloneNode")
          , v = _l(f, "nextSibling")
          , y = _l(f, "childNodes")
          , b = _l(f, "parentNode");
        if ("function" == typeof a) {
            var x = o.createElement("template");
            x.content && x.content.ownerDocument && (o = x.content.ownerDocument)
        }
        var k = function(e, t) {
            if ("object" !== tl(e) || "function" != typeof e.createPolicy)
                return null;
            var n = null
              , r = "data-tt-policy-suffix";
            t.currentScript && t.currentScript.hasAttribute(r) && (n = t.currentScript.getAttribute(r));
            var o = "dompurify" + (n ? "#" + n : "");
            try {
                return e.createPolicy(o, {
                    createHTML: function(e) {
                        return e
                    },
                    createScriptURL: function(e) {
                        return e
                    }
                })
            } catch (e) {
                return console.warn("TrustedTypes policy " + o + " could not be created."),
                null
            }
        }(p, r)
          , w = k ? k.createHTML("") : ""
          , S = o
          , C = S.implementation
          , T = S.createNodeIterator
          , I = S.createDocumentFragment
          , A = S.getElementsByTagName
          , O = r.importNode
          , E = {};
        try {
            E = Nl(o).documentMode ? o.documentMode : {}
        } catch (e) {}
        var L = {};
        n.isSupported = "function" == typeof b && C && void 0 !== C.createHTMLDocument && 9 !== E;
        var N, _, D = $l, P = Vl, R = Gl, M = ql, j = Kl, F = Yl, U = Xl, B = Jl, z = null, H = Ll({}, [].concat(ol(Dl), ol(Pl), ol(Rl), ol(jl), ol(Ul))), W = null, $ = Ll({}, [].concat(ol(Bl), ol(zl), ol(Hl), ol(Wl))), V = Object.seal(Object.create(null, {
            tagNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            attributeNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            allowCustomizedBuiltInElements: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: !1
            }
        })), G = null, q = null, K = !0, J = !0, Y = !1, X = !0, Z = !1, Q = !1, ee = !1, te = !1, ne = !1, re = !1, oe = !1, se = !0, ae = !1, ie = !0, le = !1, ce = {}, ue = null, de = Ll({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]), he = null, me = Ll({}, ["audio", "video", "img", "source", "image", "track"]), pe = null, fe = Ll({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ge = "http://www.w3.org/1998/Math/MathML", ve = "http://www.w3.org/2000/svg", ye = "http://www.w3.org/1999/xhtml", be = ye, xe = !1, ke = null, we = Ll({}, [ge, ve, ye], wl), Se = ["application/xhtml+xml", "text/html"], Ce = null, Te = o.createElement("form"), Ie = function(e) {
            return e instanceof RegExp || e instanceof Function
        }, Ae = function(e) {
            Ce && Ce === e || (e && "object" === tl(e) || (e = {}),
            e = Nl(e),
            N = N = -1 === Se.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE,
            _ = "application/xhtml+xml" === N ? wl : kl,
            z = "ALLOWED_TAGS"in e ? Ll({}, e.ALLOWED_TAGS, _) : H,
            W = "ALLOWED_ATTR"in e ? Ll({}, e.ALLOWED_ATTR, _) : $,
            ke = "ALLOWED_NAMESPACES"in e ? Ll({}, e.ALLOWED_NAMESPACES, wl) : we,
            pe = "ADD_URI_SAFE_ATTR"in e ? Ll(Nl(fe), e.ADD_URI_SAFE_ATTR, _) : fe,
            he = "ADD_DATA_URI_TAGS"in e ? Ll(Nl(me), e.ADD_DATA_URI_TAGS, _) : me,
            ue = "FORBID_CONTENTS"in e ? Ll({}, e.FORBID_CONTENTS, _) : de,
            G = "FORBID_TAGS"in e ? Ll({}, e.FORBID_TAGS, _) : {},
            q = "FORBID_ATTR"in e ? Ll({}, e.FORBID_ATTR, _) : {},
            ce = "USE_PROFILES"in e && e.USE_PROFILES,
            K = !1 !== e.ALLOW_ARIA_ATTR,
            J = !1 !== e.ALLOW_DATA_ATTR,
            Y = e.ALLOW_UNKNOWN_PROTOCOLS || !1,
            X = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR,
            Z = e.SAFE_FOR_TEMPLATES || !1,
            Q = e.WHOLE_DOCUMENT || !1,
            ne = e.RETURN_DOM || !1,
            re = e.RETURN_DOM_FRAGMENT || !1,
            oe = e.RETURN_TRUSTED_TYPE || !1,
            te = e.FORCE_BODY || !1,
            se = !1 !== e.SANITIZE_DOM,
            ae = e.SANITIZE_NAMED_PROPS || !1,
            ie = !1 !== e.KEEP_CONTENT,
            le = e.IN_PLACE || !1,
            B = e.ALLOWED_URI_REGEXP || B,
            be = e.NAMESPACE || ye,
            V = e.CUSTOM_ELEMENT_HANDLING || {},
            e.CUSTOM_ELEMENT_HANDLING && Ie(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (V.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
            e.CUSTOM_ELEMENT_HANDLING && Ie(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (V.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
            e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (V.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
            Z && (J = !1),
            re && (ne = !0),
            ce && (z = Ll({}, ol(Ul)),
            W = [],
            !0 === ce.html && (Ll(z, Dl),
            Ll(W, Bl)),
            !0 === ce.svg && (Ll(z, Pl),
            Ll(W, zl),
            Ll(W, Wl)),
            !0 === ce.svgFilters && (Ll(z, Rl),
            Ll(W, zl),
            Ll(W, Wl)),
            !0 === ce.mathMl && (Ll(z, jl),
            Ll(W, Hl),
            Ll(W, Wl))),
            e.ADD_TAGS && (z === H && (z = Nl(z)),
            Ll(z, e.ADD_TAGS, _)),
            e.ADD_ATTR && (W === $ && (W = Nl(W)),
            Ll(W, e.ADD_ATTR, _)),
            e.ADD_URI_SAFE_ATTR && Ll(pe, e.ADD_URI_SAFE_ATTR, _),
            e.FORBID_CONTENTS && (ue === de && (ue = Nl(ue)),
            Ll(ue, e.FORBID_CONTENTS, _)),
            ie && (z["#text"] = !0),
            Q && Ll(z, ["html", "head", "body"]),
            z.table && (Ll(z, ["tbody"]),
            delete G.tbody),
            dl && dl(e),
            Ce = e)
        }, Oe = Ll({}, ["mi", "mo", "mn", "ms", "mtext"]), Ee = Ll({}, ["foreignobject", "desc", "title", "annotation-xml"]), Le = Ll({}, ["title", "style", "font", "a", "script"]), Ne = Ll({}, Pl);
        Ll(Ne, Rl),
        Ll(Ne, Ml);
        var _e = Ll({}, jl);
        Ll(_e, Fl);
        var De = function(e) {
            xl(n.removed, {
                element: e
            });
            try {
                e.parentNode.removeChild(e)
            } catch (t) {
                try {
                    e.outerHTML = w
                } catch (t) {
                    e.remove()
                }
            }
        }
          , Pe = function(e, t) {
            try {
                xl(n.removed, {
                    attribute: t.getAttributeNode(e),
                    from: t
                })
            } catch (e) {
                xl(n.removed, {
                    attribute: null,
                    from: t
                })
            }
            if (t.removeAttribute(e),
            "is" === e && !W[e])
                if (ne || re)
                    try {
                        De(t)
                    } catch (e) {}
                else
                    try {
                        t.setAttribute(e, "")
                    } catch (e) {}
        }
          , Re = function(e) {
            var t, n;
            if (te)
                e = "<remove></remove>" + e;
            else {
                var r = Sl(e, /^[\r\n\t ]+/);
                n = r && r[0]
            }
            "application/xhtml+xml" === N && be === ye && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
            var s = k ? k.createHTML(e) : e;
            if (be === ye)
                try {
                    t = (new m).parseFromString(s, N)
                } catch (e) {}
            if (!t || !t.documentElement) {
                t = C.createDocument(be, "template", null);
                try {
                    t.documentElement.innerHTML = xe ? w : s
                } catch (e) {}
            }
            var a = t.body || t.documentElement;
            return e && n && a.insertBefore(o.createTextNode(n), a.childNodes[0] || null),
            be === ye ? A.call(t, Q ? "html" : "body")[0] : Q ? t.documentElement : a
        }
          , Me = function(e) {
            return T.call(e.ownerDocument || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT, null, !1)
        }
          , je = function(e) {
            return "object" === tl(i) ? e instanceof i : e && "object" === tl(e) && "number" == typeof e.nodeType && "string" == typeof e.nodeName
        }
          , Fe = function(e, t, r) {
            L[e] && yl(L[e], (function(e) {
                e.call(n, t, r, Ce)
            }
            ))
        }
          , Ue = function(e) {
            var t, r;
            if (Fe("beforeSanitizeElements", e, null),
            (r = e)instanceof h && ("string" != typeof r.nodeName || "string" != typeof r.textContent || "function" != typeof r.removeChild || !(r.attributes instanceof d) || "function" != typeof r.removeAttribute || "function" != typeof r.setAttribute || "string" != typeof r.namespaceURI || "function" != typeof r.insertBefore || "function" != typeof r.hasChildNodes))
                return De(e),
                !0;
            if (Al(/[\u0080-\uFFFF]/, e.nodeName))
                return De(e),
                !0;
            var o = _(e.nodeName);
            if (Fe("uponSanitizeElement", e, {
                tagName: o,
                allowedTags: z
            }),
            e.hasChildNodes() && !je(e.firstElementChild) && (!je(e.content) || !je(e.content.firstElementChild)) && Al(/<[/\w]/g, e.innerHTML) && Al(/<[/\w]/g, e.textContent))
                return De(e),
                !0;
            if ("select" === o && Al(/<template/i, e.innerHTML))
                return De(e),
                !0;
            if (!z[o] || G[o]) {
                if (!G[o] && ze(o)) {
                    if (V.tagNameCheck instanceof RegExp && Al(V.tagNameCheck, o))
                        return !1;
                    if (V.tagNameCheck instanceof Function && V.tagNameCheck(o))
                        return !1
                }
                if (ie && !ue[o]) {
                    var s = b(e) || e.parentNode
                      , a = y(e) || e.childNodes;
                    if (a && s)
                        for (var i = a.length - 1; i >= 0; --i)
                            s.insertBefore(g(a[i], !0), v(e))
                }
                return De(e),
                !0
            }
            return e instanceof l && !function(e) {
                var t = b(e);
                t && t.tagName || (t = {
                    namespaceURI: be,
                    tagName: "template"
                });
                var n = kl(e.tagName)
                  , r = kl(t.tagName);
                return !!ke[e.namespaceURI] && (e.namespaceURI === ve ? t.namespaceURI === ye ? "svg" === n : t.namespaceURI === ge ? "svg" === n && ("annotation-xml" === r || Oe[r]) : Boolean(Ne[n]) : e.namespaceURI === ge ? t.namespaceURI === ye ? "math" === n : t.namespaceURI === ve ? "math" === n && Ee[r] : Boolean(_e[n]) : e.namespaceURI === ye ? !(t.namespaceURI === ve && !Ee[r]) && !(t.namespaceURI === ge && !Oe[r]) && !_e[n] && (Le[n] || !Ne[n]) : !("application/xhtml+xml" !== N || !ke[e.namespaceURI]))
            }(e) ? (De(e),
            !0) : "noscript" !== o && "noembed" !== o && "noframes" !== o || !Al(/<\/no(script|embed|frames)/i, e.innerHTML) ? (Z && 3 === e.nodeType && (t = e.textContent,
            t = Cl(t, D, " "),
            t = Cl(t, P, " "),
            t = Cl(t, R, " "),
            e.textContent !== t && (xl(n.removed, {
                element: e.cloneNode()
            }),
            e.textContent = t)),
            Fe("afterSanitizeElements", e, null),
            !1) : (De(e),
            !0)
        }
          , Be = function(e, t, n) {
            if (se && ("id" === t || "name" === t) && (n in o || n in Te))
                return !1;
            if (J && !q[t] && Al(M, t))
                ;
            else if (K && Al(j, t))
                ;
            else if (!W[t] || q[t]) {
                if (!(ze(e) && (V.tagNameCheck instanceof RegExp && Al(V.tagNameCheck, e) || V.tagNameCheck instanceof Function && V.tagNameCheck(e)) && (V.attributeNameCheck instanceof RegExp && Al(V.attributeNameCheck, t) || V.attributeNameCheck instanceof Function && V.attributeNameCheck(t)) || "is" === t && V.allowCustomizedBuiltInElements && (V.tagNameCheck instanceof RegExp && Al(V.tagNameCheck, n) || V.tagNameCheck instanceof Function && V.tagNameCheck(n))))
                    return !1
            } else if (pe[t])
                ;
            else if (Al(B, Cl(n, U, "")))
                ;
            else if ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== Tl(n, "data:") || !he[e])
                if (Y && !Al(F, Cl(n, U, "")))
                    ;
                else if (n)
                    return !1;
            return !0
        }
          , ze = function(e) {
            return e.indexOf("-") > 0
        }
          , He = function(e) {
            var t, r, o, s;
            Fe("beforeSanitizeAttributes", e, null);
            var a = e.attributes;
            if (a) {
                var i = {
                    attrName: "",
                    attrValue: "",
                    keepAttr: !0,
                    allowedAttributes: W
                };
                for (s = a.length; s--; ) {
                    var l = t = a[s]
                      , c = l.name
                      , u = l.namespaceURI;
                    if (r = "value" === c ? t.value : Il(t.value),
                    o = _(c),
                    i.attrName = o,
                    i.attrValue = r,
                    i.keepAttr = !0,
                    i.forceKeepAttr = void 0,
                    Fe("uponSanitizeAttribute", e, i),
                    r = i.attrValue,
                    !i.forceKeepAttr && (Pe(c, e),
                    i.keepAttr))
                        if (X || !Al(/\/>/i, r)) {
                            Z && (r = Cl(r, D, " "),
                            r = Cl(r, P, " "),
                            r = Cl(r, R, " "));
                            var d = _(e.nodeName);
                            if (Be(d, o, r)) {
                                if (!ae || "id" !== o && "name" !== o || (Pe(c, e),
                                r = "user-content-" + r),
                                k && "object" === tl(p) && "function" == typeof p.getAttributeType)
                                    if (u)
                                        ;
                                    else
                                        switch (p.getAttributeType(d, o)) {
                                        case "TrustedHTML":
                                            r = k.createHTML(r);
                                            break;
                                        case "TrustedScriptURL":
                                            r = k.createScriptURL(r)
                                        }
                                try {
                                    u ? e.setAttributeNS(u, c, r) : e.setAttribute(c, r),
                                    bl(n.removed)
                                } catch (e) {}
                            }
                        } else
                            Pe(c, e)
                }
                Fe("afterSanitizeAttributes", e, null)
            }
        }
          , We = function e(t) {
            var n, r = Me(t);
            for (Fe("beforeSanitizeShadowDOM", t, null); n = r.nextNode(); )
                Fe("uponSanitizeShadowNode", n, null),
                Ue(n) || (n.content instanceof s && e(n.content),
                He(n));
            Fe("afterSanitizeShadowDOM", t, null)
        };
        return n.sanitize = function(e) {
            var o, a, l, c, u, d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if ((xe = !e) && (e = "\x3c!--\x3e"),
            "string" != typeof e && !je(e)) {
                if ("function" != typeof e.toString)
                    throw Ol("toString is not a function");
                if ("string" != typeof (e = e.toString()))
                    throw Ol("dirty is not a string, aborting")
            }
            if (!n.isSupported) {
                if ("object" === tl(t.toStaticHTML) || "function" == typeof t.toStaticHTML) {
                    if ("string" == typeof e)
                        return t.toStaticHTML(e);
                    if (je(e))
                        return t.toStaticHTML(e.outerHTML)
                }
                return e
            }
            if (ee || Ae(d),
            n.removed = [],
            "string" == typeof e && (le = !1),
            le) {
                if (e.nodeName) {
                    var h = _(e.nodeName);
                    if (!z[h] || G[h])
                        throw Ol("root node is forbidden and cannot be sanitized in-place")
                }
            } else if (e instanceof i)
                1 === (a = (o = Re("\x3c!----\x3e")).ownerDocument.importNode(e, !0)).nodeType && "BODY" === a.nodeName || "HTML" === a.nodeName ? o = a : o.appendChild(a);
            else {
                if (!ne && !Z && !Q && -1 === e.indexOf("<"))
                    return k && oe ? k.createHTML(e) : e;
                if (!(o = Re(e)))
                    return ne ? null : oe ? w : ""
            }
            o && te && De(o.firstChild);
            for (var m = Me(le ? e : o); l = m.nextNode(); )
                3 === l.nodeType && l === c || Ue(l) || (l.content instanceof s && We(l.content),
                He(l),
                c = l);
            if (c = null,
            le)
                return e;
            if (ne) {
                if (re)
                    for (u = I.call(o.ownerDocument); o.firstChild; )
                        u.appendChild(o.firstChild);
                else
                    u = o;
                return (W.shadowroot || W.shadowrootmod) && (u = O.call(r, u, !0)),
                u
            }
            var p = Q ? o.outerHTML : o.innerHTML;
            return Q && z["!doctype"] && o.ownerDocument && o.ownerDocument.doctype && o.ownerDocument.doctype.name && Al(Zl, o.ownerDocument.doctype.name) && (p = "<!DOCTYPE " + o.ownerDocument.doctype.name + ">\n" + p),
            Z && (p = Cl(p, D, " "),
            p = Cl(p, P, " "),
            p = Cl(p, R, " ")),
            k && oe ? k.createHTML(p) : p
        }
        ,
        n.setConfig = function(e) {
            Ae(e),
            ee = !0
        }
        ,
        n.clearConfig = function() {
            Ce = null,
            ee = !1
        }
        ,
        n.isValidAttribute = function(e, t, n) {
            Ce || Ae({});
            var r = _(e)
              , o = _(t);
            return Be(r, o, n)
        }
        ,
        n.addHook = function(e, t) {
            "function" == typeof t && (L[e] = L[e] || [],
            xl(L[e], t))
        }
        ,
        n.removeHook = function(e) {
            if (L[e])
                return bl(L[e])
        }
        ,
        n.removeHooks = function(e) {
            L[e] && (L[e] = [])
        }
        ,
        n.removeAllHooks = function() {
            L = {}
        }
        ,
        n
    }();
    const tc = ["script", "svg"]
      , nc = e=>-1 !== e.lastIndexOf("</html>")
      , rc = e=>({
        sanitizeHtml: (t,n)=>e(t) ? t : ((e,t)=>{
            ec.addHook("uponSanitizeElement", ((e,t)=>{
                T(tc, t.tagName) || He(t.allowedTags, t.tagName) || (t.allowedTags[t.tagName] = !0)
            }
            )),
            ec.addHook("uponSanitizeAttribute", ((e,t)=>{
                0 === t.attrName.indexOf("on") || He(t.allowedAttributes, t.attrName) || (t.allowedAttributes[t.attrName] = !0),
                t.attrValue && -1 !== t.attrValue.indexOf("\n") && (t.attrValue = t.attrValue.replace(/\r?\n/g, ""))
            }
            ));
            const n = (e=>$(G(e), "<!"))(e)
              , r = n ? `<body>${e}</body>` : (e=>e.replace(/^[\S\s]*?(<!DOCTYPE|<html)/i, "$1"))(e)
              , o = ec.sanitize(r, {
                ALLOW_UNKNOWN_PROTOCOLS: !0,
                FORBID_TAGS: tc,
                WHOLE_DOCUMENT: nc(e)
            });
            return ec.removeHook("uponSanitizeElement"),
            ec.removeHook("uponSanitizeAttribute"),
            n ? (s = H(o, "<body>"),
            V(s, "</body>") ? ((e,t)=>e.substring(0, e.length - 7))(s) : s) : o;
            var s
        }
        )(t),
        sanitizeText: p
    })
      , oc = {
        sanitizeHtml: p,
        sanitizeText: p
    }
      , sc = e=>t=>({
        discriminator: e,
        data: t
    })
      , ac = e=>t=>t.discriminator === e ? k.some(t.data) : k.none()
      , ic = sc("event")
      , lc = sc("html")
      , cc = sc("images")
      , uc = sc("word")
      , dc = sc("text")
      , hc = sc("void")
      , mc = ac("html")
      , pc = ac("images")
      , fc = ac("word")
      , gc = ac("text")
      , vc = ["^image/", "file"]
      , yc = e=>(e=>W(e, "<html") && (W(e, 'xmlns:o="urn:schemas-microsoft-com:office:office"') || W(e, 'xmlns:x="urn:schemas-microsoft-com:office:excel"')))(e) || (e=>W(e, 'meta name="ProgId" content="Word.Document"'))(e)
      , bc = e=>W(e, 'id="docs-internal-guid-')
      , xc = e=>e.length > 0
      , kc = (e,t)=>el(e.types, t).map((t=>e.getData(t.type))).filter(xc)
      , wc = e=>kc(e, "html")
      , Sc = e=>wc(e).filter(bc)
      , Cc = e=>k.from(e.clipboardData).filter(Qi)
      , Tc = e=>{
        const t = Pe.fromTag("div")
          , n = ((e,t)=>So(e, t, [Sa]))(Mt(t), e);
        return ((e,t)=>{
            const n = Mt(e).dom
              , r = Pe.fromDom(n.createDocumentFragment())
              , o = Gn(t, n);
            mn(r, o),
            pn(e),
            un(e, r)
        }
        )(t, n),
        lc({
            container: t
        })
    }
      , Ic = {
        native: "Outside of Textbox.io pasting HTML5 API (could be internal)",
        fallback: "Outside of Textbox.io pasting offscreen (could be internal)",
        msoffice: "Word Import pasting",
        googledocs: "Google Docs pasting",
        image: "Image pasting",
        plaintext: "Only plain text is available to paste",
        text: "Plain text pasting",
        none: "There is no valid way to paste",
        discard: "There is no valid way to paste, discarding content"
    }
      , Ac = {
        getLabelForApi: e=>{
            const t = Re(Ic);
            return _(t, (t=>Ic[t] === e)).fold(m("unknown"), (e=>{
                switch (e) {
                case "native":
                case "fallback":
                    return "html";
                case "none":
                case "discard":
                    return "invalid";
                default:
                    return e
                }
            }
            ))
        }
        ,
        ...Ic
    }
      , Oc = e=>A(e, (e=>e.asset))
      , Ec = (e,t,n)=>{
        const r = Tt({
            cancel: Ct([]),
            error: Ct(["message"]),
            insert: Ct(["elements", "assets", "correlated", "isInternal", "source", "mode"]),
            block: Ct(["state"])
        });
        let o = !1;
        r.registry.block.bind((e=>o = e.state));
        const s = (n,o)=>{
            r.trigger.block(!0);
            const s = ((e,t,n)=>{
                const r = ((e,t)=>B(e, (e=>e.getAvailable(t).map((t=>Gr(e.steps, t, e.label, e.capture()))))))(e, n);
                return r.getOrThunk((()=>{
                    const e = t.getAvailable(n);
                    return Gr(t.steps, e, t.label, t.capture())
                }
                ))
            }
            )(e, t, n);
            s.capture && o();
            const a = ((e,t)=>{
                const n = {
                    response: Mr([], []),
                    bundle: zr({})
                }
                  , r = N(e, ((e,n)=>Vr(e) ? e.then((e=>Kr(e, t, n))) : Kr(e, t, n)), n);
                return Vr(r) ? r : Promise.resolve(r)
            }
            )(s.steps, s.input)
              , i = Ac.getLabelForApi(s.label);
            a.then((e=>{
                const t = e.bundle.isInternal.getOr(!1)
                  , n = e.bundle.officeStyles.fold(m("auto"), (e=>e ? "merge" : "clean"));
                r.trigger.block(!1),
                Pr(e.response, (e=>{
                    r.trigger.error(e)
                }
                ), ((e,o)=>{
                    r.trigger.insert(e, Oc(o), o, t, i, n)
                }
                ), (()=>{
                    r.trigger.cancel()
                }
                ), ((e,o,s)=>{
                    r.trigger.insert(e, Oc(o), o, t, i, n),
                    r.trigger.error(s)
                }
                ))
            }
            ))
        }
        ;
        return {
            paste: e=>{
                const t = Ft(Pe.fromDom(e.target));
                sn(t.dom).each((t=>{
                    if (!_n(t.start, rr())) {
                        const t = ((e,t=oc)=>{
                            const n = e=>{
                                return void 0 === e.items ? k.none() : (t = vc,
                                n = e.types,
                                B(t, (e=>el(n, e)))).map((t=>{
                                    const n = [];
                                    for (let t = 0; t < e.items.length; t++)
                                        n.push(e.items[t]);
                                    return cc({
                                        images: n
                                    })
                                }
                                ));
                                var t, n
                            }
                              , r = e=>B(e.types, (n=>"text/plain" === n ? k.some(e.getData(n)).map((e=>dc({
                                text: t.sanitizeText(e)
                            }))) : k.none()));
                            return {
                                getWordData: ()=>Cc(e).bind((e=>(e=>wc(e).filter(yc))(e).map((t=>{
                                    const n = (e=>kc(e, "rtf"))(e);
                                    return uc({
                                        html: t,
                                        rtf: n.fold((()=>Xi()), (e=>Zi(e)))
                                    })
                                }
                                )))),
                                getGoogleDocsData: ()=>Cc(e).bind(Sc).map((e=>t.sanitizeHtml(e, "googledocs"))).map(Tc),
                                getImage: ()=>Cc(e).bind(n),
                                getText: ()=>Cc(e).bind(r),
                                getHtml: ()=>Cc(e).bind(wc).map(t.sanitizeHtml).map(Tc),
                                getOnlyText: ()=>Cc(e).bind((e=>{
                                    return 1 === (t = e.types).length && "text/plain" === t[0] ? r(e) : k.none();
                                    var t
                                }
                                )),
                                getNative: ()=>ic({
                                    nativeEvent: e
                                }),
                                getVoid: ()=>hc({})
                            }
                        }
                        )(e, n);
                        s(t, (()=>{
                            e.preventDefault()
                        }
                        ))
                    }
                }
                ))
            }
            ,
            pasteCustom: (e,t=d)=>{
                s(e, t)
            }
            ,
            isBlocked: ()=>o,
            destroy: d,
            events: r.registry
        }
    }
      , Lc = e=>ni(e);
    var Nc = {
        cata: (e,t,n)=>e.fold(t, n),
        ..._t([{
            blob: ["id", "imageresult", "objurl"]
        }, {
            url: ["id", "url", "raw"]
        }])
    };
    const _c = e=>{
        const t = URL.createObjectURL(e);
        return Dc(e, t)
    }
      , Dc = (e,t)=>Lc(e).then((n=>{
        const r = di(e, n)
          , o = bn("image");
        return Nc.blob(o, r, t)
    }
    ))
      , Pc = e=>Promise.all(A(e, _c))
      , Rc = (e,t)=>({
        asset: e,
        image: t
    })
      , Mc = (e,t)=>Nc.cata(e, ((e,n,r)=>(kn(t, "src", r),
    !0)), b)
      , jc = (e,t)=>{
        const n = [];
        return O(e, ((e,r)=>{
            const o = t[r];
            Mc(e, o) && n.push(Rc(e, o))
        }
        )),
        n
    }
      , Fc = (e,t)=>({
        asyncAsset: e.then(Cr.value, Cr.error),
        image: t
    })
      , Uc = e=>{
        const t = Pe.fromTag("div");
        return mn(t, e),
        qt(t, "img[src]")
    }
      , Bc = e=>0 === e.indexOf("data:") && e.indexOf("base64") > -1
      , zc = e=>0 === e.indexOf("blob:")
      , Hc = e=>Cn(e, "src").exists((e=>Bc(e) || zc(e)))
      , Wc = e=>R(Uc(e), (e=>{
        const t = Cn(e, "src").getOr("");
        return Bc(t) ? ((e,t)=>{
            return (n = t,
            Za(n)).map((t=>Fc(_c(t), e)));
            var n
        }
        )(e, t).toArray() : zc(t) ? ((e,t)=>{
            return (n = t,
            k.from(0 === (r = n).indexOf("blob:") ? Xa(r) : 0 === r.indexOf("data:") ? Qa(r) : null)).map((t=>{
                const n = t.then(_c);
                return Fc(n, e)
            }
            ));
            var n, r
        }
        )(e, t).toArray() : []
    }
    ))
      , $c = e=>{
        const t = L(e, (e=>!Le("img")(e) || !Hc(e)));
        return Fr(t, [], "errors.local.images.disallowed")
    }
    ;
    var Vc = e=>(t,n)=>{
        const r = ()=>Promise.resolve(n)
          , o = (t,o)=>!1 === e.allowLocalImages ? (e=>{
            const t = L(Uc(e), Hc);
            return O(t, fn),
            Promise.resolve({
                response: t.length > 0 ? $c(e) : n.response,
                bundle: n.bundle
            })
        }
        )(t) : 0 === o.length ? (e=>{
            const t = Wc(e)
              , r = Promise.all(A(t, (e=>e.asyncAsset)))
              , o = A(t, (e=>e.image));
            return r.then((t=>{
                const r = (e=>{
                    const t = []
                      , n = [];
                    return O(e, (e=>{
                        e.fold((e=>{
                            t.push(e)
                        }
                        ), (e=>{
                            n.push(e)
                        }
                        ))
                    }
                    )),
                    {
                        errors: t,
                        values: n
                    }
                }
                )(t)
                  , s = jc(r.values, o);
                return {
                    response: r.errors.length > 0 ? Fr(e, s, "errors.imageimport.failed") : Mr(e, s),
                    bundle: n.bundle
                }
            }
            ))
        }
        )(t) : r();
        return Pr(n.response, Wr, o, r, o)
    }
    ;
    const Gc = (e,t,n=!1)=>fetch(e, {
        credentials: n ? "include" : "same-origin",
        headers: t
    }).then((async e=>{
        const t = await e.blob();
        return {
            ok: e.ok,
            status: e.status,
            blob: t
        }
    }
    ), (()=>({
        ok: !1,
        status: 0
    })))
      , qc = [{
        code: 404,
        message: "Could not find Image Proxy"
    }, {
        code: 403,
        message: "Rejected request"
    }, {
        code: 0,
        message: "Incorrect Image Proxy URL"
    }]
      , Kc = [{
        type: "not_found",
        message: "Failed to load image."
    }, {
        type: "key_missing",
        message: "The request did not include an api key."
    }, {
        type: "key_not_found",
        message: "The provided api key could not be found."
    }, {
        type: "domain_not_trusted",
        message: "The api key is not valid for the request origins."
    }]
      , Jc = e=>{
        const t = (e=>{
            const t = _(qc, (t=>e === t.code)).fold(m("Unknown ImageProxy error"), (e=>e.message));
            return "ImageProxy HTTP error: " + t
        }
        )(e);
        return Promise.reject(t)
    }
      , Yc = e=>_(Kc, (t=>t.type === e)).fold(m("Unknown service error"), (e=>e.message))
      , Xc = e=>(e=>new Promise(((t,n)=>{
        const r = new FileReader;
        r.onload = ()=>{
            t(r.result)
        }
        ,
        r.onerror = e=>{
            n(e)
        }
        ,
        r.readAsText(e)
    }
    )))(e).then((e=>{
        const t = (e=>{
            const t = (e=>{
                try {
                    return k.some(JSON.parse(e))
                } catch (e) {
                    return k.none()
                }
            }
            )(e)
              , n = t.bind((e=>((e,t)=>{
                const n = N(["error", "type"], ((e,t)=>l(e) ? e[t] : void 0), e);
                return k.from(n)
            }
            )(e).map(Yc))).getOr("Invalid JSON in service error message");
            return "ImageProxy Service error: " + n
        }
        )(e);
        return Promise.reject(t)
    }
    ))
      , Zc = (e,t,n=!0)=>t ? ((e,t)=>{
        const n = {
            "Content-Type": "application/json;charset=UTF-8",
            "tiny-api-key": t
        };
        return Gc(((e,t)=>{
            const n = -1 === e.indexOf("?") ? "?" : "&";
            return /[?&]apiKey=/.test(e) ? e : e + n + "apiKey=" + encodeURIComponent(t)
        }
        )(e, t), n).then((e=>{
            return e.ok ? Promise.resolve(e.blob) : ((e,t)=>"application/json" === (null == t ? void 0 : t.type) && (400 === e || 403 === e || 404 === e || 500 === e))(t = e.status, n = e.blob) ? Xc(n) : Jc(t);
            var t, n
        }
        ))
    }
    )(e, t) : ((e,t)=>Gc(e, {}, t).then((e=>e.ok ? Promise.resolve(e.blob) : Jc(e.status))))(e, n)
      , Qc = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
      , eu = /^(?:(?![^:@\/]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      , tu = /(?:^|&)([^&=]+)=?([^&]*)/g
      , nu = e=>{
        const t = {};
        for (; ; ) {
            const n = tu.exec(e);
            if (null === n)
                return t;
            t[n[1]] = n[2]
        }
    }
      , ru = (e,t)=>{
        const n = ()=>Promise.resolve({
            response: t.response,
            bundle: t.bundle
        })
          , r = e=>Lc(e).then((t=>{
            const n = bn("image")
              , r = di(e, t)
              , o = URL.createObjectURL(e);
            return Nc.blob(n, r, o)
        }
        ))
          , o = (e,t)=>Nc.url(bn("image"), t, e)
          , s = (e,n)=>{
            let s = !1;
            const a = R(e, (e=>qt(e, "img")));
            return Promise.all(A(a, (e=>{
                const t = e.dom.src;
                return (e=>{
                    const t = ((e,t={})=>{
                        var n;
                        return ((e,t)=>{
                            const n = (t ? Qc : eu).exec(e)
                              , r = j(["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], ((e,t)=>{
                                var r;
                                return null !== (r = n[t]) && void 0 !== r ? r : ""
                            }
                            ));
                            return {
                                ...r,
                                queryKey: nu(r.query)
                            }
                        }
                        )(e, null !== (n = t.strictMode) && void 0 !== n && n)
                    }
                    )(e);
                    return W(t.host, "google") && !$(t.path, "/drawings/")
                }
                )(t) ? Zc(e.dom.src, void 0, !0).then(r, (()=>(s = !0,
                o(e, t)))) : o(e, t)
            }
            ))).then((r=>{
                const o = n.concat(jc(r, a));
                return {
                    response: s ? Fr(e, o, "errors.imageimport.failed") : Mr(e, o),
                    bundle: t.bundle
                }
            }
            ), (()=>({
                response: Rr("errors.imageimport.invalid"),
                bundle: t.bundle
            })))
        }
        ;
        return Pr(t.response, n, s, n, s)
    }
      , ou = e=>{
        const t = iu(e);
        return t && su(e) || !t && au(e)
    }
      , su = e=>e.officeStyles.getOr(!0)
      , au = e=>e.htmlStyles.getOr(!1)
      , iu = e=>e.isWord.getOr(!1)
      , lu = e=>e.isInternal.getOr(!1)
      , cu = e=>iu(e) ? ys.Word : (e=>e.isGoogleDocs.getOr(!1))(e) ? ys.GoogleDocs : ys.Html
      , uu = (e,t)=>{
        const n = ((e,t)=>{
            const n = t.translations
              , r = e=>k.some(Jr(t, {
                officeStyles: e,
                gdocsStyles: e,
                htmlStyles: e
            }));
            return {
                get: o=>{
                    const s = (e=>{
                        switch (e) {
                        case ys.Word:
                            return "officeStyles";
                        case ys.GoogleDocs:
                            return "gdocsStyles";
                        default:
                            return "htmlStyles"
                        }
                    }
                    )(o)
                      , a = t[s];
                    return c(a) ? a().then((e=>r("merge" === e)), (e=>(console.error(e),
                    r(!1)))) : "clean" === a ? Promise.resolve(r(!1)) : "merge" === a ? Promise.resolve(r(!0)) : new Promise((t=>{
                        const o = Pe.fromTag("div");
                        Ln(o, hr("styles-dialog-content"));
                        const s = Pe.fromTag("p")
                          , a = Gn(n("cement.dialog.paste.instructions"));
                        mn(s, a),
                        un(o, s);
                        const i = {
                            text: n("cement.dialog.paste.clean"),
                            tabindex: 0,
                            className: hr("clean-styles"),
                            click: ()=>{
                                c(),
                                t(r(!1))
                            }
                        }
                          , l = {
                            text: n("cement.dialog.paste.merge"),
                            tabindex: 1,
                            className: hr("merge-styles"),
                            click: ()=>{
                                c(),
                                t(r(!0))
                            }
                        }
                          , c = ()=>{
                            u.destroy()
                        }
                          , u = e();
                        u.setTitle(n("cement.dialog.paste.title")),
                        u.setContent(o),
                        u.setButtons([i, l]),
                        u.events.close.bind((()=>{
                            c(),
                            t(k.none())
                        }
                        )),
                        u.show()
                    }
                    ))
                }
                ,
                destroy: d
            }
        }
        )(e, t);
        return (e,t)=>{
            const r = t.bundle
              , o = t.response;
            return n.get(cu(r)).then((e=>e.fold((()=>({
                response: jr(),
                bundle: t.bundle
            })), (e=>({
                response: o,
                bundle: zr({
                    officeStyles: e.officeStyles,
                    gdocsStyles: e.gdocsStyles,
                    htmlStyles: e.htmlStyles
                })
            })))))
        }
    }
      , du = (e,t)=>(n,r)=>lu(r.bundle) ? (e=>Promise.resolve({
        response: r.response,
        bundle: zr({
            officeStyles: e,
            gdocsStyles: e,
            htmlStyles: e
        })
    }))(!0) : uu(e, t)(n, r)
      , hu = (e,t)=>{
        if (!Vt(e))
            throw new Error("Internal error: attempted to write to an iframe that is not in the DOM");
        const n = (e=>(e=>{
            const t = e.dom;
            try {
                return ((e,t)=>null != e ? k.some(t(e)) : k.none())(t.contentWindow ? t.contentWindow.document : t.contentDocument, Pe.fromDom)
            } catch (e) {
                return console.log("Error reading iframe: ", t),
                console.log("Error was: " + e),
                k.none()
            }
        }
        )(e).getOrThunk((()=>Mt(e))))(e)
          , r = n.dom;
        r.open("text/html", "replace"),
        r.write(t),
        r.close()
    }
    ;
    var mu = Object.create
      , pu = Object.defineProperty
      , fu = Object.getOwnPropertyDescriptor
      , gu = Object.getOwnPropertyNames
      , vu = Object.getPrototypeOf
      , yu = Object.prototype.hasOwnProperty
      , bu = (e,t)=>()=>(t || e((t = {
        exports: {}
    }).exports, t),
    t.exports)
      , xu = (e,t)=>{
        for (var n in t)
            pu(e, n, {
                get: t[n],
                enumerable: !0
            })
    }
      , ku = bu((e=>{
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        e.encode = function(e) {
            if (0 <= e && e < t.length)
                return t[e];
            throw new TypeError("Must be between 0 and 63: " + e)
        }
        ,
        e.decode = function(e) {
            return 65 <= e && e <= 90 ? e - 65 : 97 <= e && e <= 122 ? e - 97 + 26 : 48 <= e && e <= 57 ? e - 48 + 52 : 43 == e ? 62 : 47 == e ? 63 : -1
        }
    }
    ))
      , wu = bu((e=>{
        var t = ku();
        e.encode = function(e) {
            var n, r, o = "", s = (r = e) < 0 ? 1 + (-r << 1) : 0 + (r << 1);
            do {
                n = 31 & s,
                (s >>>= 5) > 0 && (n |= 32),
                o += t.encode(n)
            } while (s > 0);
            return o
        }
        ,
        e.decode = function(e, n, r) {
            var o, s, a = e.length, i = 0, l = 0;
            do {
                if (n >= a)
                    throw new Error("Expected more digits in base 64 VLQ value.");
                if (-1 === (s = t.decode(e.charCodeAt(n++))))
                    throw new Error("Invalid base64 digit: " + e.charAt(n - 1));
                o = !!(32 & s),
                i += (s &= 31) << l,
                l += 5
            } while (o);
            r.value = function(e) {
                var t = e >> 1;
                return 1 == (1 & e) ? -t : t
            }(i),
            r.rest = n
        }
    }
    ))
      , Su = bu((e=>{
        e.getArg = function(e, t, n) {
            if (t in e)
                return e[t];
            if (3 === arguments.length)
                return n;
            throw new Error('"' + t + '" is a required argument.')
        }
        ;
        var t = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/
          , n = /^data:.+\,.+$/;
        function r(e) {
            var n = e.match(t);
            return n ? {
                scheme: n[1],
                auth: n[2],
                host: n[3],
                port: n[4],
                path: n[5]
            } : null
        }
        function o(e) {
            var t = "";
            return e.scheme && (t += e.scheme + ":"),
            t += "//",
            e.auth && (t += e.auth + "@"),
            e.host && (t += e.host),
            e.port && (t += ":" + e.port),
            e.path && (t += e.path),
            t
        }
        e.urlParse = r,
        e.urlGenerate = o;
        var s = function(t) {
            var n = [];
            return function(t) {
                for (var s = 0; s < n.length; s++)
                    if (n[s].input === t) {
                        var a = n[0];
                        return n[0] = n[s],
                        n[s] = a,
                        n[0].result
                    }
                var i = function(t) {
                    var n = t
                      , s = r(t);
                    if (s) {
                        if (!s.path)
                            return t;
                        n = s.path
                    }
                    for (var a = e.isAbsolute(n), i = [], l = 0, c = 0; ; ) {
                        if (l = c,
                        -1 === (c = n.indexOf("/", l))) {
                            i.push(n.slice(l));
                            break
                        }
                        for (i.push(n.slice(l, c)); c < n.length && "/" === n[c]; )
                            c++
                    }
                    var u, d = 0;
                    for (c = i.length - 1; c >= 0; c--)
                        "." === (u = i[c]) ? i.splice(c, 1) : ".." === u ? d++ : d > 0 && ("" === u ? (i.splice(c + 1, d),
                        d = 0) : (i.splice(c, 2),
                        d--));
                    return "" === (n = i.join("/")) && (n = a ? "/" : "."),
                    s ? (s.path = n,
                    o(s)) : n
                }(t);
                return n.unshift({
                    input: t,
                    result: i
                }),
                n.length > 32 && n.pop(),
                i
            }
        }();
        function a(e, t) {
            "" === e && (e = "."),
            "" === t && (t = ".");
            var a = r(t)
              , i = r(e);
            if (i && (e = i.path || "/"),
            a && !a.scheme)
                return i && (a.scheme = i.scheme),
                o(a);
            if (a || t.match(n))
                return t;
            if (i && !i.host && !i.path)
                return i.host = t,
                o(i);
            var l = "/" === t.charAt(0) ? t : s(e.replace(/\/+$/, "") + "/" + t);
            return i ? (i.path = l,
            o(i)) : l
        }
        e.normalize = s,
        e.join = a,
        e.isAbsolute = function(e) {
            return "/" === e.charAt(0) || t.test(e)
        }
        ,
        e.relative = function(e, t) {
            "" === e && (e = "."),
            e = e.replace(/\/$/, "");
            for (var n = 0; 0 !== t.indexOf(e + "/"); ) {
                var r = e.lastIndexOf("/");
                if (r < 0 || (e = e.slice(0, r)).match(/^([^\/]+:\/)?\/*$/))
                    return t;
                ++n
            }
            return Array(n + 1).join("../") + t.substr(e.length + 1)
        }
        ;
        var i = !("__proto__"in Object.create(null));
        function l(e) {
            return e
        }
        function c(e) {
            if (!e)
                return !1;
            var t = e.length;
            if (t < 9 || 95 !== e.charCodeAt(t - 1) || 95 !== e.charCodeAt(t - 2) || 111 !== e.charCodeAt(t - 3) || 116 !== e.charCodeAt(t - 4) || 111 !== e.charCodeAt(t - 5) || 114 !== e.charCodeAt(t - 6) || 112 !== e.charCodeAt(t - 7) || 95 !== e.charCodeAt(t - 8) || 95 !== e.charCodeAt(t - 9))
                return !1;
            for (var n = t - 10; n >= 0; n--)
                if (36 !== e.charCodeAt(n))
                    return !1;
            return !0
        }
        function u(e, t) {
            return e === t ? 0 : null === e ? 1 : null === t ? -1 : e > t ? 1 : -1
        }
        e.toSetString = i ? l : function(e) {
            return c(e) ? "$" + e : e
        }
        ,
        e.fromSetString = i ? l : function(e) {
            return c(e) ? e.slice(1) : e
        }
        ,
        e.compareByOriginalPositions = function(e, t, n) {
            var r = u(e.source, t.source);
            return 0 !== r || 0 != (r = e.originalLine - t.originalLine) || 0 != (r = e.originalColumn - t.originalColumn) || n || 0 != (r = e.generatedColumn - t.generatedColumn) || 0 != (r = e.generatedLine - t.generatedLine) ? r : u(e.name, t.name)
        }
        ,
        e.compareByOriginalPositionsNoSource = function(e, t, n) {
            var r;
            return 0 != (r = e.originalLine - t.originalLine) || 0 != (r = e.originalColumn - t.originalColumn) || n || 0 != (r = e.generatedColumn - t.generatedColumn) || 0 != (r = e.generatedLine - t.generatedLine) ? r : u(e.name, t.name)
        }
        ,
        e.compareByGeneratedPositionsDeflated = function(e, t, n) {
            var r = e.generatedLine - t.generatedLine;
            return 0 !== r || 0 != (r = e.generatedColumn - t.generatedColumn) || n || 0 !== (r = u(e.source, t.source)) || 0 != (r = e.originalLine - t.originalLine) || 0 != (r = e.originalColumn - t.originalColumn) ? r : u(e.name, t.name)
        }
        ,
        e.compareByGeneratedPositionsDeflatedNoLine = function(e, t, n) {
            var r = e.generatedColumn - t.generatedColumn;
            return 0 !== r || n || 0 !== (r = u(e.source, t.source)) || 0 != (r = e.originalLine - t.originalLine) || 0 != (r = e.originalColumn - t.originalColumn) ? r : u(e.name, t.name)
        }
        ,
        e.compareByGeneratedPositionsInflated = function(e, t) {
            var n = e.generatedLine - t.generatedLine;
            return 0 !== n || 0 != (n = e.generatedColumn - t.generatedColumn) || 0 !== (n = u(e.source, t.source)) || 0 != (n = e.originalLine - t.originalLine) || 0 != (n = e.originalColumn - t.originalColumn) ? n : u(e.name, t.name)
        }
        ,
        e.parseSourceMapInput = function(e) {
            return JSON.parse(e.replace(/^\)]}'[^\n]*\n/, ""))
        }
        ,
        e.computeSourceURL = function(e, t, n) {
            if (t = t || "",
            e && ("/" !== e[e.length - 1] && "/" !== t[0] && (e += "/"),
            t = e + t),
            n) {
                var i = r(n);
                if (!i)
                    throw new Error("sourceMapURL could not be parsed");
                if (i.path) {
                    var l = i.path.lastIndexOf("/");
                    l >= 0 && (i.path = i.path.substring(0, l + 1))
                }
                t = a(o(i), t)
            }
            return s(t)
        }
    }
    ))
      , Cu = bu((e=>{
        var t = Su()
          , n = Object.prototype.hasOwnProperty
          , r = typeof Map < "u";
        function o() {
            this._array = [],
            this._set = r ? new Map : Object.create(null)
        }
        o.fromArray = function(e, t) {
            for (var n = new o, r = 0, s = e.length; r < s; r++)
                n.add(e[r], t);
            return n
        }
        ,
        o.prototype.size = function() {
            return r ? this._set.size : Object.getOwnPropertyNames(this._set).length
        }
        ,
        o.prototype.add = function(e, o) {
            var s = r ? e : t.toSetString(e)
              , a = r ? this.has(e) : n.call(this._set, s)
              , i = this._array.length;
            (!a || o) && this._array.push(e),
            a || (r ? this._set.set(e, i) : this._set[s] = i)
        }
        ,
        o.prototype.has = function(e) {
            if (r)
                return this._set.has(e);
            var o = t.toSetString(e);
            return n.call(this._set, o)
        }
        ,
        o.prototype.indexOf = function(e) {
            if (r) {
                var o = this._set.get(e);
                if (o >= 0)
                    return o
            } else {
                var s = t.toSetString(e);
                if (n.call(this._set, s))
                    return this._set[s]
            }
            throw new Error('"' + e + '" is not in the set.')
        }
        ,
        o.prototype.at = function(e) {
            if (e >= 0 && e < this._array.length)
                return this._array[e];
            throw new Error("No element indexed by " + e)
        }
        ,
        o.prototype.toArray = function() {
            return this._array.slice()
        }
        ,
        e.ArraySet = o
    }
    ))
      , Tu = bu((e=>{
        var t = Su();
        function n() {
            this._array = [],
            this._sorted = !0,
            this._last = {
                generatedLine: -1,
                generatedColumn: 0
            }
        }
        n.prototype.unsortedForEach = function(e, t) {
            this._array.forEach(e, t)
        }
        ,
        n.prototype.add = function(e) {
            !function(e, n) {
                var r = e.generatedLine
                  , o = n.generatedLine
                  , s = e.generatedColumn
                  , a = n.generatedColumn;
                return o > r || o == r && a >= s || t.compareByGeneratedPositionsInflated(e, n) <= 0
            }(this._last, e) ? (this._sorted = !1,
            this._array.push(e)) : (this._last = e,
            this._array.push(e))
        }
        ,
        n.prototype.toArray = function() {
            return this._sorted || (this._array.sort(t.compareByGeneratedPositionsInflated),
            this._sorted = !0),
            this._array
        }
        ,
        e.MappingList = n
    }
    ))
      , Iu = bu((e=>{
        var t = wu()
          , n = Su()
          , r = Cu().ArraySet
          , o = Tu().MappingList;
        function s(e) {
            e || (e = {}),
            this._file = n.getArg(e, "file", null),
            this._sourceRoot = n.getArg(e, "sourceRoot", null),
            this._skipValidation = n.getArg(e, "skipValidation", !1),
            this._sources = new r,
            this._names = new r,
            this._mappings = new o,
            this._sourcesContents = null
        }
        s.prototype._version = 3,
        s.fromSourceMap = function(e) {
            var t = e.sourceRoot
              , r = new s({
                file: e.file,
                sourceRoot: t
            });
            return e.eachMapping((function(e) {
                var o = {
                    generated: {
                        line: e.generatedLine,
                        column: e.generatedColumn
                    }
                };
                null != e.source && (o.source = e.source,
                null != t && (o.source = n.relative(t, o.source)),
                o.original = {
                    line: e.originalLine,
                    column: e.originalColumn
                },
                null != e.name && (o.name = e.name)),
                r.addMapping(o)
            }
            )),
            e.sources.forEach((function(o) {
                var s = o;
                null !== t && (s = n.relative(t, o)),
                r._sources.has(s) || r._sources.add(s);
                var a = e.sourceContentFor(o);
                null != a && r.setSourceContent(o, a)
            }
            )),
            r
        }
        ,
        s.prototype.addMapping = function(e) {
            var t = n.getArg(e, "generated")
              , r = n.getArg(e, "original", null)
              , o = n.getArg(e, "source", null)
              , s = n.getArg(e, "name", null);
            this._skipValidation || this._validateMapping(t, r, o, s),
            null != o && (o = String(o),
            this._sources.has(o) || this._sources.add(o)),
            null != s && (s = String(s),
            this._names.has(s) || this._names.add(s)),
            this._mappings.add({
                generatedLine: t.line,
                generatedColumn: t.column,
                originalLine: null != r && r.line,
                originalColumn: null != r && r.column,
                source: o,
                name: s
            })
        }
        ,
        s.prototype.setSourceContent = function(e, t) {
            var r = e;
            null != this._sourceRoot && (r = n.relative(this._sourceRoot, r)),
            null != t ? (this._sourcesContents || (this._sourcesContents = Object.create(null)),
            this._sourcesContents[n.toSetString(r)] = t) : this._sourcesContents && (delete this._sourcesContents[n.toSetString(r)],
            0 === Object.keys(this._sourcesContents).length && (this._sourcesContents = null))
        }
        ,
        s.prototype.applySourceMap = function(e, t, o) {
            var s = t;
            if (null == t) {
                if (null == e.file)
                    throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
                s = e.file
            }
            var a = this._sourceRoot;
            null != a && (s = n.relative(a, s));
            var i = new r
              , l = new r;
            this._mappings.unsortedForEach((function(t) {
                if (t.source === s && null != t.originalLine) {
                    var r = e.originalPositionFor({
                        line: t.originalLine,
                        column: t.originalColumn
                    });
                    null != r.source && (t.source = r.source,
                    null != o && (t.source = n.join(o, t.source)),
                    null != a && (t.source = n.relative(a, t.source)),
                    t.originalLine = r.line,
                    t.originalColumn = r.column,
                    null != r.name && (t.name = r.name))
                }
                var c = t.source;
                null != c && !i.has(c) && i.add(c);
                var u = t.name;
                null != u && !l.has(u) && l.add(u)
            }
            ), this),
            this._sources = i,
            this._names = l,
            e.sources.forEach((function(t) {
                var r = e.sourceContentFor(t);
                null != r && (null != o && (t = n.join(o, t)),
                null != a && (t = n.relative(a, t)),
                this.setSourceContent(t, r))
            }
            ), this)
        }
        ,
        s.prototype._validateMapping = function(e, t, n, r) {
            if (t && "number" != typeof t.line && "number" != typeof t.column)
                throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
            if (!(e && "line"in e && "column"in e && e.line > 0 && e.column >= 0) || t || n || r) {
                if (e && "line"in e && "column"in e && t && "line"in t && "column"in t && e.line > 0 && e.column >= 0 && t.line > 0 && t.column >= 0 && n)
                    return;
                throw new Error("Invalid mapping: " + JSON.stringify({
                    generated: e,
                    source: n,
                    original: t,
                    name: r
                }))
            }
        }
        ,
        s.prototype._serializeMappings = function() {
            for (var e, r, o, s, a = 0, i = 1, l = 0, c = 0, u = 0, d = 0, h = "", m = this._mappings.toArray(), p = 0, f = m.length; p < f; p++) {
                if (e = "",
                (r = m[p]).generatedLine !== i)
                    for (a = 0; r.generatedLine !== i; )
                        e += ";",
                        i++;
                else if (p > 0) {
                    if (!n.compareByGeneratedPositionsInflated(r, m[p - 1]))
                        continue;
                    e += ","
                }
                e += t.encode(r.generatedColumn - a),
                a = r.generatedColumn,
                null != r.source && (s = this._sources.indexOf(r.source),
                e += t.encode(s - d),
                d = s,
                e += t.encode(r.originalLine - 1 - c),
                c = r.originalLine - 1,
                e += t.encode(r.originalColumn - l),
                l = r.originalColumn,
                null != r.name && (o = this._names.indexOf(r.name),
                e += t.encode(o - u),
                u = o)),
                h += e
            }
            return h
        }
        ,
        s.prototype._generateSourcesContent = function(e, t) {
            return e.map((function(e) {
                if (!this._sourcesContents)
                    return null;
                null != t && (e = n.relative(t, e));
                var r = n.toSetString(e);
                return Object.prototype.hasOwnProperty.call(this._sourcesContents, r) ? this._sourcesContents[r] : null
            }
            ), this)
        }
        ,
        s.prototype.toJSON = function() {
            var e = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings()
            };
            return null != this._file && (e.file = this._file),
            null != this._sourceRoot && (e.sourceRoot = this._sourceRoot),
            this._sourcesContents && (e.sourcesContent = this._generateSourcesContent(e.sources, e.sourceRoot)),
            e
        }
        ,
        s.prototype.toString = function() {
            return JSON.stringify(this.toJSON())
        }
        ,
        e.SourceMapGenerator = s
    }
    ));
    function Au(e) {
        return e >= 48 && e <= 57
    }
    function Ou(e) {
        return Au(e) || e >= 65 && e <= 70 || e >= 97 && e <= 102
    }
    function Eu(e) {
        return e >= 65 && e <= 90
    }
    function Lu(e) {
        return function(e) {
            return Eu(e) || function(e) {
                return e >= 97 && e <= 122
            }(e)
        }(e) || function(e) {
            return e >= 128
        }(e) || 95 === e
    }
    function Nu(e) {
        return Lu(e) || Au(e) || 45 === e
    }
    function _u(e) {
        return e >= 0 && e <= 8 || 11 === e || e >= 14 && e <= 31 || 127 === e
    }
    function Du(e) {
        return 10 === e || 13 === e || 12 === e
    }
    function Pu(e) {
        return Du(e) || 32 === e || 9 === e
    }
    function Ru(e, t) {
        return !(92 !== e || Du(t) || 0 === t)
    }
    function Mu(e, t, n) {
        return 45 === e ? Lu(t) || 45 === t || Ru(t, n) : !!Lu(e) || 92 === e && Ru(e, t)
    }
    function ju(e, t, n) {
        return 43 === e || 45 === e ? Au(t) ? 2 : 46 === t && Au(n) ? 3 : 0 : 46 === e ? Au(t) ? 2 : 0 : Au(e) ? 1 : 0
    }
    function Fu(e) {
        return 65279 === e || 65534 === e ? 1 : 0
    }
    var Uu = new Array(128)
      , Bu = 130
      , zu = 131
      , Hu = 132
      , Wu = 133;
    for (let e = 0; e < Uu.length; e++)
        Uu[e] = Pu(e) && Bu || Au(e) && zu || Lu(e) && Hu || _u(e) && Wu || e || 128;
    function $u(e) {
        return e < 128 ? Uu[e] : Hu
    }
    function Vu(e, t) {
        return t < e.length ? e.charCodeAt(t) : 0
    }
    function Gu(e, t, n) {
        return 13 === n && 10 === Vu(e, t + 1) ? 2 : 1
    }
    function qu(e, t, n) {
        let r = e.charCodeAt(t);
        return Eu(r) && (r |= 32),
        r === n
    }
    function Ku(e, t, n, r) {
        if (n - t !== r.length || t < 0 || n > e.length)
            return !1;
        for (let o = t; o < n; o++) {
            let n = r.charCodeAt(o - t)
              , s = e.charCodeAt(o);
            if (Eu(s) && (s |= 32),
            s !== n)
                return !1
        }
        return !0
    }
    function Ju(e, t) {
        for (; t < e.length && Pu(e.charCodeAt(t)); t++)
            ;
        return t
    }
    function Yu(e, t) {
        for (; t < e.length && Au(e.charCodeAt(t)); t++)
            ;
        return t
    }
    function Xu(e, t) {
        if (Ou(Vu(e, (t += 2) - 1))) {
            for (let n = Math.min(e.length, t + 5); t < n && Ou(Vu(e, t)); t++)
                ;
            let n = Vu(e, t);
            Pu(n) && (t += Gu(e, t, n))
        }
        return t
    }
    function Zu(e, t) {
        for (; t < e.length; t++) {
            let n = e.charCodeAt(t);
            if (!Nu(n)) {
                if (Ru(n, Vu(e, t + 1))) {
                    t = Xu(e, t) - 1;
                    continue
                }
                break
            }
        }
        return t
    }
    function Qu(e, t) {
        let n = e.charCodeAt(t);
        if ((43 === n || 45 === n) && (n = e.charCodeAt(t += 1)),
        Au(n) && (t = Yu(e, t + 1),
        n = e.charCodeAt(t)),
        46 === n && Au(e.charCodeAt(t + 1)) && (t = Yu(e, t += 2)),
        qu(e, t, 101)) {
            let r = 0;
            n = e.charCodeAt(t + 1),
            (45 === n || 43 === n) && (r = 1,
            n = e.charCodeAt(t + 2)),
            Au(n) && (t = Yu(e, t + 1 + r + 1))
        }
        return t
    }
    function ed(e, t) {
        for (; t < e.length; t++) {
            let n = e.charCodeAt(t);
            if (41 === n) {
                t++;
                break
            }
            Ru(n, Vu(e, t + 1)) && (t = Xu(e, t))
        }
        return t
    }
    function td(e) {
        if (1 === e.length && !Ou(e.charCodeAt(0)))
            return e[0];
        let t = parseInt(e, 16);
        return (0 === t || t >= 55296 && t <= 57343 || t > 1114111) && (t = 65533),
        String.fromCodePoint(t)
    }
    var nd = ["EOF-token", "ident-token", "function-token", "at-keyword-token", "hash-token", "string-token", "bad-string-token", "url-token", "bad-url-token", "delim-token", "number-token", "percentage-token", "dimension-token", "whitespace-token", "CDO-token", "CDC-token", "colon-token", "semicolon-token", "comma-token", "[-token", "]-token", "(-token", ")-token", "{-token", "}-token"];
    function rd(e=null, t) {
        return null === e || e.length < t ? new Uint32Array(Math.max(t + 1024, 16384)) : e
    }
    function od(e) {
        let t = e.source
          , n = t.length
          , r = t.length > 0 ? Fu(t.charCodeAt(0)) : 0
          , o = rd(e.lines, n)
          , s = rd(e.columns, n)
          , a = e.startLine
          , i = e.startColumn;
        for (let e = r; e < n; e++) {
            let r = t.charCodeAt(e);
            o[e] = a,
            s[e] = i++,
            (10 === r || 13 === r || 12 === r) && (13 === r && e + 1 < n && 10 === t.charCodeAt(e + 1) && (e++,
            o[e] = a,
            s[e] = i),
            a++,
            i = 1)
        }
        o[n] = a,
        s[n] = i,
        e.lines = o,
        e.columns = s,
        e.computed = !0
    }
    var sd = class {
        constructor() {
            this.lines = null,
            this.columns = null,
            this.computed = !1
        }
        setSource(e, t=0, n=1, r=1) {
            this.source = e,
            this.startOffset = t,
            this.startLine = n,
            this.startColumn = r,
            this.computed = !1
        }
        getLocation(e, t) {
            return this.computed || od(this),
            {
                source: t,
                offset: this.startOffset + e,
                line: this.lines[e],
                column: this.columns[e]
            }
        }
        getLocationRange(e, t, n) {
            return this.computed || od(this),
            {
                source: n,
                start: {
                    offset: this.startOffset + e,
                    line: this.lines[e],
                    column: this.columns[e]
                },
                end: {
                    offset: this.startOffset + t,
                    line: this.lines[t],
                    column: this.columns[t]
                }
            }
        }
    }
      , ad = 16777215
      , id = 24
      , ld = new Map([[2, 22], [21, 22], [19, 20], [23, 24]])
      , cd = class {
        constructor(e, t) {
            this.setSource(e, t)
        }
        reset() {
            this.eof = !1,
            this.tokenIndex = -1,
            this.tokenType = 0,
            this.tokenStart = this.firstCharOffset,
            this.tokenEnd = this.firstCharOffset
        }
        setSource(e="", t=(()=>{}
        )) {
            let n = (e = String(e || "")).length
              , r = rd(this.offsetAndType, e.length + 1)
              , o = rd(this.balance, e.length + 1)
              , s = 0
              , a = 0
              , i = 0
              , l = -1;
            for (this.offsetAndType = null,
            this.balance = null,
            t(e, ((e,t,c)=>{
                switch (e) {
                default:
                    o[s] = n;
                    break;
                case a:
                    {
                        let e = i & ad;
                        for (i = o[e],
                        a = i >> id,
                        o[s] = e,
                        o[e++] = s; e < s; e++)
                            o[e] === n && (o[e] = s);
                        break
                    }
                case 21:
                case 2:
                case 19:
                case 23:
                    o[s] = i,
                    a = ld.get(e),
                    i = a << id | s
                }
                r[s++] = e << id | c,
                -1 === l && (l = t)
            }
            )),
            r[s] = 0 | n,
            o[s] = n,
            o[n] = n; 0 !== i; ) {
                let e = i & ad;
                i = o[e],
                o[e] = n
            }
            this.source = e,
            this.firstCharOffset = -1 === l ? 0 : l,
            this.tokenCount = s,
            this.offsetAndType = r,
            this.balance = o,
            this.reset(),
            this.next()
        }
        lookupType(e) {
            return (e += this.tokenIndex) < this.tokenCount ? this.offsetAndType[e] >> id : 0
        }
        lookupOffset(e) {
            return (e += this.tokenIndex) < this.tokenCount ? this.offsetAndType[e - 1] & ad : this.source.length
        }
        lookupValue(e, t) {
            return (e += this.tokenIndex) < this.tokenCount && Ku(this.source, this.offsetAndType[e - 1] & ad, this.offsetAndType[e] & ad, t)
        }
        getTokenStart(e) {
            return e === this.tokenIndex ? this.tokenStart : e > 0 ? e < this.tokenCount ? this.offsetAndType[e - 1] & ad : this.offsetAndType[this.tokenCount] & ad : this.firstCharOffset
        }
        substrToCursor(e) {
            return this.source.substring(e, this.tokenStart)
        }
        isBalanceEdge(e) {
            return this.balance[this.tokenIndex] < e
        }
        isDelim(e, t) {
            return t ? 9 === this.lookupType(t) && this.source.charCodeAt(this.lookupOffset(t)) === e : 9 === this.tokenType && this.source.charCodeAt(this.tokenStart) === e
        }
        skip(e) {
            let t = this.tokenIndex + e;
            t < this.tokenCount ? (this.tokenIndex = t,
            this.tokenStart = this.offsetAndType[t - 1] & ad,
            t = this.offsetAndType[t],
            this.tokenType = t >> id,
            this.tokenEnd = t & ad) : (this.tokenIndex = this.tokenCount,
            this.next())
        }
        next() {
            let e = this.tokenIndex + 1;
            e < this.tokenCount ? (this.tokenIndex = e,
            this.tokenStart = this.tokenEnd,
            e = this.offsetAndType[e],
            this.tokenType = e >> id,
            this.tokenEnd = e & ad) : (this.eof = !0,
            this.tokenIndex = this.tokenCount,
            this.tokenType = 0,
            this.tokenStart = this.tokenEnd = this.source.length)
        }
        skipSC() {
            for (; 13 === this.tokenType || 25 === this.tokenType; )
                this.next()
        }
        skipUntilBalanced(e, t) {
            let n, r, o = e;
            e: for (; o < this.tokenCount && (n = this.balance[o],
            !(n < e)); o++)
                switch (r = o > 0 ? this.offsetAndType[o - 1] & ad : this.firstCharOffset,
                t(this.source.charCodeAt(r))) {
                case 1:
                    break e;
                case 2:
                    o++;
                    break e;
                default:
                    this.balance[n] === o && (o = n)
                }
            this.skip(o - this.tokenIndex)
        }
        forEachToken(e) {
            for (let t = 0, n = this.firstCharOffset; t < this.tokenCount; t++) {
                let r = n
                  , o = this.offsetAndType[t]
                  , s = o & ad;
                n = s,
                e(o >> id, r, s, t)
            }
        }
        dump() {
            let e = new Array(this.tokenCount);
            return this.forEachToken(((t,n,r,o)=>{
                e[o] = {
                    idx: o,
                    type: nd[t],
                    chunk: this.source.substring(n, r),
                    balance: this.balance[o]
                }
            }
            )),
            e
        }
    }
    ;
    function ud(e, t) {
        function n(t) {
            return t < i ? e.charCodeAt(t) : 0
        }
        function r() {
            return c = Qu(e, c),
            Mu(n(c), n(c + 1), n(c + 2)) ? (a = 12,
            void (c = Zu(e, c))) : 37 === n(c) ? (a = 11,
            void c++) : void (a = 10)
        }
        function o() {
            let t = c;
            return c = Zu(e, c),
            Ku(e, t, c, "url") && 40 === n(c) ? (c = Ju(e, c + 1),
            34 === n(c) || 39 === n(c) ? (a = 2,
            void (c = t + 4)) : void function() {
                for (a = 7,
                c = Ju(e, c); c < e.length; c++) {
                    let t = e.charCodeAt(c);
                    switch ($u(t)) {
                    case 41:
                        return void c++;
                    case Bu:
                        return c = Ju(e, c),
                        41 === n(c) || c >= e.length ? void (c < e.length && c++) : (c = ed(e, c),
                        void (a = 8));
                    case 34:
                    case 39:
                    case 40:
                    case Wu:
                        return c = ed(e, c),
                        void (a = 8);
                    case 92:
                        if (Ru(t, n(c + 1))) {
                            c = Xu(e, c) - 1;
                            break
                        }
                        return c = ed(e, c),
                        void (a = 8)
                    }
                }
            }()) : 40 === n(c) ? (a = 2,
            void c++) : void (a = 1)
        }
        function s(t) {
            for (t || (t = n(c++)),
            a = 5; c < e.length; c++) {
                let r = e.charCodeAt(c);
                switch ($u(r)) {
                case t:
                    return void c++;
                case Bu:
                    if (Du(r))
                        return c += Gu(e, c, r),
                        void (a = 6);
                    break;
                case 92:
                    if (c === e.length - 1)
                        break;
                    let o = n(c + 1);
                    Du(o) ? c += Gu(e, c + 1, o) : Ru(r, o) && (c = Xu(e, c) - 1)
                }
            }
        }
        let a, i = (e = String(e || "")).length, l = Fu(n(0)), c = l;
        for (; c < i; ) {
            let i = e.charCodeAt(c);
            switch ($u(i)) {
            case Bu:
                a = 13,
                c = Ju(e, c + 1);
                break;
            case 34:
                s();
                break;
            case 35:
                Nu(n(c + 1)) || Ru(n(c + 1), n(c + 2)) ? (a = 4,
                c = Zu(e, c + 1)) : (a = 9,
                c++);
                break;
            case 39:
                s();
                break;
            case 40:
                a = 21,
                c++;
                break;
            case 41:
                a = 22,
                c++;
                break;
            case 43:
                ju(i, n(c + 1), n(c + 2)) ? r() : (a = 9,
                c++);
                break;
            case 44:
                a = 18,
                c++;
                break;
            case 45:
                ju(i, n(c + 1), n(c + 2)) ? r() : 45 === n(c + 1) && 62 === n(c + 2) ? (a = 15,
                c += 3) : Mu(i, n(c + 1), n(c + 2)) ? o() : (a = 9,
                c++);
                break;
            case 46:
                ju(i, n(c + 1), n(c + 2)) ? r() : (a = 9,
                c++);
                break;
            case 47:
                42 === n(c + 1) ? (a = 25,
                c = e.indexOf("*/", c + 2),
                c = -1 === c ? e.length : c + 2) : (a = 9,
                c++);
                break;
            case 58:
                a = 16,
                c++;
                break;
            case 59:
                a = 17,
                c++;
                break;
            case 60:
                33 === n(c + 1) && 45 === n(c + 2) && 45 === n(c + 3) ? (a = 14,
                c += 4) : (a = 9,
                c++);
                break;
            case 64:
                Mu(n(c + 1), n(c + 2), n(c + 3)) ? (a = 3,
                c = Zu(e, c + 1)) : (a = 9,
                c++);
                break;
            case 91:
                a = 19,
                c++;
                break;
            case 92:
                Ru(i, n(c + 1)) ? o() : (a = 9,
                c++);
                break;
            case 93:
                a = 20,
                c++;
                break;
            case 123:
                a = 23,
                c++;
                break;
            case 125:
                a = 24,
                c++;
                break;
            case zu:
                r();
                break;
            case Hu:
                o();
                break;
            default:
                a = 9,
                c++
            }
            t(a, l, l = c)
        }
    }
    var dd, hd = (dd = Iu(),
    ((e,t,n,r)=>{
        if (t && "object" == typeof t || "function" == typeof t)
            for (let n of gu(t))
                !yu.call(e, n) && "default" !== n && pu(e, n, {
                    get: ()=>t[n],
                    enumerable: !(r = fu(t, n)) || r.enumerable
                });
        return e
    }
    )((e=>pu(e, "__esModule", {
        value: !0
    }))(pu(null != dd ? mu(vu(dd)) : {}, "default", {
        value: dd,
        enumerable: !0
    })), dd)), md = new Set(["Atrule", "Selector", "Declaration"]), pd = {};
    xu(pd, {
        safe: ()=>xd,
        spec: ()=>bd
    });
    var fd = (e,t)=>{
        if (9 === e && (e = t),
        "string" == typeof e) {
            let t = e.charCodeAt(0);
            return t > 127 ? 32768 : t << 8
        }
        return e
    }
      , gd = [[1, 1], [1, 2], [1, 7], [1, 8], [1, "-"], [1, 10], [1, 11], [1, 12], [1, 15], [1, 21], [3, 1], [3, 2], [3, 7], [3, 8], [3, "-"], [3, 10], [3, 11], [3, 12], [3, 15], [4, 1], [4, 2], [4, 7], [4, 8], [4, "-"], [4, 10], [4, 11], [4, 12], [4, 15], [12, 1], [12, 2], [12, 7], [12, 8], [12, "-"], [12, 10], [12, 11], [12, 12], [12, 15], ["#", 1], ["#", 2], ["#", 7], ["#", 8], ["#", "-"], ["#", 10], ["#", 11], ["#", 12], ["#", 15], ["-", 1], ["-", 2], ["-", 7], ["-", 8], ["-", "-"], ["-", 10], ["-", 11], ["-", 12], ["-", 15], [10, 1], [10, 2], [10, 7], [10, 8], [10, 10], [10, 11], [10, 12], [10, "%"], [10, 15], ["@", 1], ["@", 2], ["@", 7], ["@", 8], ["@", "-"], ["@", 15], [".", 10], [".", 11], [".", 12], ["+", 10], ["+", 11], ["+", 12], ["/", "*"]]
      , vd = gd.concat([[1, 4], [12, 4], [4, 4], [3, 21], [3, 5], [3, 16], [11, 11], [11, 12], [11, 2], [11, "-"], [22, 1], [22, 2], [22, 11], [22, 12], [22, 4], [22, "-"]]);
    function yd(e) {
        let t = new Set(e.map((([e,t])=>fd(e) << 16 | fd(t))));
        return function(e, n, r) {
            let o = fd(n, r)
              , s = r.charCodeAt(0);
            return (45 === s && 1 !== n && 2 !== n && 15 !== n || 43 === s ? t.has(e << 16 | s << 8) : t.has(e << 16 | o)) && this.emit(" ", 13, !0),
            o
        }
    }
    var bd = yd(gd)
      , xd = yd(vd);
    function kd(e, t) {
        if ("function" != typeof t)
            e.children.forEach(this.node, this);
        else {
            let n = null;
            e.children.forEach((e=>{
                null !== n && t.call(this, n),
                this.node(e),
                n = e
            }
            ))
        }
    }
    function wd(e) {
        ud(e, ((t,n,r)=>{
            this.token(t, e.slice(n, r))
        }
        ))
    }
    var Sd = {};
    xu(Sd, {
        AnPlusB: ()=>Dd,
        Atrule: ()=>Pd,
        AtrulePrelude: ()=>Rd,
        AttributeSelector: ()=>Vd,
        Block: ()=>Gd,
        Brackets: ()=>qd,
        CDC: ()=>Kd,
        CDO: ()=>Jd,
        ClassSelector: ()=>Xd,
        Combinator: ()=>Qd,
        Comment: ()=>eh,
        Declaration: ()=>th,
        DeclarationList: ()=>nh,
        Dimension: ()=>rh,
        Function: ()=>oh,
        Hash: ()=>sh,
        IdSelector: ()=>ch,
        Identifier: ()=>ih,
        MediaFeature: ()=>uh,
        MediaQuery: ()=>dh,
        MediaQueryList: ()=>hh,
        NestingSelector: ()=>ph,
        Nth: ()=>gh,
        Number: ()=>vh,
        Operator: ()=>yh,
        Parentheses: ()=>bh,
        Percentage: ()=>kh,
        PseudoClassSelector: ()=>Sh,
        PseudoElementSelector: ()=>Th,
        Ratio: ()=>Ih,
        Raw: ()=>Eh,
        Rule: ()=>Lh,
        Selector: ()=>_h,
        SelectorList: ()=>Ph,
        String: ()=>Bh,
        StyleSheet: ()=>zh,
        TypeSelector: ()=>Vh,
        UnicodeRange: ()=>Gh,
        Url: ()=>Qh,
        Value: ()=>em,
        WhiteSpace: ()=>tm
    });
    var Cd = 43
      , Td = 45
      , Id = 110
      , Ad = !0;
    function Od(e, t) {
        let n = this.tokenStart + e
          , r = this.charCodeAt(n);
        for ((r === Cd || r === Td) && (t && this.error("Number sign is not allowed"),
        n++); n < this.tokenEnd; n++)
            Au(this.charCodeAt(n)) || this.error("Integer is expected", n)
    }
    function Ed(e) {
        return Od.call(this, 0, e)
    }
    function Ld(e, t) {
        if (!this.cmpChar(this.tokenStart + e, t)) {
            let n = "";
            switch (t) {
            case Id:
                n = "N is expected";
                break;
            case Td:
                n = "HyphenMinus is expected"
            }
            this.error(n, this.tokenStart + e)
        }
    }
    function Nd() {
        let e = 0
          , t = 0
          , n = this.tokenType;
        for (; 13 === n || 25 === n; )
            n = this.lookupType(++e);
        if (10 !== n) {
            if (!this.isDelim(Cd, e) && !this.isDelim(Td, e))
                return null;
            t = this.isDelim(Cd, e) ? Cd : Td;
            do {
                n = this.lookupType(++e)
            } while (13 === n || 25 === n);
            10 !== n && (this.skip(e),
            Ed.call(this, Ad))
        }
        return e > 0 && this.skip(e),
        0 === t && (n = this.charCodeAt(this.tokenStart),
        n !== Cd && n !== Td && this.error("Number sign is expected")),
        Ed.call(this, 0 !== t),
        t === Td ? "-" + this.consume(10) : this.consume(10)
    }
    function _d() {
        let e = this.tokenStart
          , t = null
          , n = null;
        if (10 === this.tokenType)
            Ed.call(this, !1),
            n = this.consume(10);
        else if (1 === this.tokenType && this.cmpChar(this.tokenStart, Td))
            switch (t = "-1",
            Ld.call(this, 1, Id),
            this.tokenEnd - this.tokenStart) {
            case 2:
                this.next(),
                n = Nd.call(this);
                break;
            case 3:
                Ld.call(this, 2, Td),
                this.next(),
                this.skipSC(),
                Ed.call(this, Ad),
                n = "-" + this.consume(10);
                break;
            default:
                Ld.call(this, 2, Td),
                Od.call(this, 3, Ad),
                this.next(),
                n = this.substrToCursor(e + 2)
            }
        else if (1 === this.tokenType || this.isDelim(Cd) && 1 === this.lookupType(1)) {
            let r = 0;
            switch (t = "1",
            this.isDelim(Cd) && (r = 1,
            this.next()),
            Ld.call(this, 0, Id),
            this.tokenEnd - this.tokenStart) {
            case 1:
                this.next(),
                n = Nd.call(this);
                break;
            case 2:
                Ld.call(this, 1, Td),
                this.next(),
                this.skipSC(),
                Ed.call(this, Ad),
                n = "-" + this.consume(10);
                break;
            default:
                Ld.call(this, 1, Td),
                Od.call(this, 2, Ad),
                this.next(),
                n = this.substrToCursor(e + r + 1)
            }
        } else if (12 === this.tokenType) {
            let r = this.charCodeAt(this.tokenStart)
              , o = r === Cd || r === Td
              , s = this.tokenStart + o;
            for (; s < this.tokenEnd && Au(this.charCodeAt(s)); s++)
                ;
            s === this.tokenStart + o && this.error("Integer is expected", this.tokenStart + o),
            Ld.call(this, s - this.tokenStart, Id),
            t = this.substring(e, s),
            s + 1 === this.tokenEnd ? (this.next(),
            n = Nd.call(this)) : (Ld.call(this, s - this.tokenStart + 1, Td),
            s + 2 === this.tokenEnd ? (this.next(),
            this.skipSC(),
            Ed.call(this, Ad),
            n = "-" + this.consume(10)) : (Od.call(this, s - this.tokenStart + 2, Ad),
            this.next(),
            n = this.substrToCursor(s + 1)))
        } else
            this.error();
        return null !== t && t.charCodeAt(0) === Cd && (t = t.substr(1)),
        null !== n && n.charCodeAt(0) === Cd && (n = n.substr(1)),
        {
            type: "AnPlusB",
            loc: this.getLocation(e, this.tokenStart),
            a: t,
            b: n
        }
    }
    function Dd(e) {
        if (e.a) {
            let t = ("+1" === e.a || "1" === e.a ? "n" : "-1" === e.a && "-n") || e.a + "n";
            if (e.b) {
                let n = "-" === e.b[0] || "+" === e.b[0] ? e.b : "+" + e.b;
                this.tokenize(t + n)
            } else
                this.tokenize(t)
        } else
            this.tokenize(e.b)
    }
    function Pd(e) {
        this.token(3, "@" + e.name),
        null !== e.prelude && this.node(e.prelude),
        e.block ? this.node(e.block) : this.token(17, ";")
    }
    function Rd(e) {
        this.children(e)
    }
    var Md = 36
      , jd = 42
      , Fd = 61
      , Ud = 94
      , Bd = 124
      , zd = 126;
    function Hd() {
        this.eof && this.error("Unexpected end of input");
        let e = this.tokenStart
          , t = !1;
        return this.isDelim(jd) ? (t = !0,
        this.next()) : this.isDelim(Bd) || this.eat(1),
        this.isDelim(Bd) ? this.charCodeAt(this.tokenStart + 1) !== Fd ? (this.next(),
        this.eat(1)) : t && this.error("Identifier is expected", this.tokenEnd) : t && this.error("Vertical line is expected"),
        {
            type: "Identifier",
            loc: this.getLocation(e, this.tokenStart),
            name: this.substrToCursor(e)
        }
    }
    function Wd() {
        let e = this.tokenStart
          , t = this.charCodeAt(e);
        return t !== Fd && t !== zd && t !== Ud && t !== Md && t !== jd && t !== Bd && this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),
        this.next(),
        t !== Fd && (this.isDelim(Fd) || this.error("Equal sign is expected"),
        this.next()),
        this.substrToCursor(e)
    }
    function $d() {
        let e, t = this.tokenStart, n = null, r = null, o = null;
        return this.eat(19),
        this.skipSC(),
        e = Hd.call(this),
        this.skipSC(),
        20 !== this.tokenType && (1 !== this.tokenType && (n = Wd.call(this),
        this.skipSC(),
        r = 5 === this.tokenType ? this.String() : this.Identifier(),
        this.skipSC()),
        1 === this.tokenType && (o = this.consume(1),
        this.skipSC())),
        this.eat(20),
        {
            type: "AttributeSelector",
            loc: this.getLocation(t, this.tokenStart),
            name: e,
            matcher: n,
            value: r,
            flags: o
        }
    }
    function Vd(e) {
        this.token(9, "["),
        this.node(e.name),
        null !== e.matcher && (this.tokenize(e.matcher),
        this.node(e.value)),
        null !== e.flags && this.token(1, e.flags),
        this.token(9, "]")
    }
    function Gd(e) {
        this.token(23, "{"),
        this.children(e, (e=>{
            "Declaration" === e.type && this.token(17, ";")
        }
        )),
        this.token(24, "}")
    }
    function qd(e) {
        this.token(9, "["),
        this.children(e),
        this.token(9, "]")
    }
    function Kd() {
        this.token(15, "--\x3e")
    }
    function Jd() {
        this.token(14, "\x3c!--")
    }
    function Yd() {
        return this.eatDelim(46),
        {
            type: "ClassSelector",
            loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
            name: this.consume(1)
        }
    }
    function Xd(e) {
        this.token(9, "."),
        this.token(1, e.name)
    }
    function Zd() {
        let e, t = this.tokenStart;
        switch (this.tokenType) {
        case 13:
            e = " ";
            break;
        case 9:
            switch (this.charCodeAt(this.tokenStart)) {
            case 62:
            case 43:
            case 126:
                this.next();
                break;
            case 47:
                this.next(),
                this.eatIdent("deep"),
                this.eatDelim(47);
                break;
            default:
                this.error("Combinator is expected")
            }
            e = this.substrToCursor(t)
        }
        return {
            type: "Combinator",
            loc: this.getLocation(t, this.tokenStart),
            name: e
        }
    }
    function Qd(e) {
        this.tokenize(e.name)
    }
    function eh(e) {
        this.token(25, "/*" + e.value + "*/")
    }
    function th(e) {
        this.token(1, e.property),
        this.token(16, ":"),
        this.node(e.value),
        e.important && (this.token(9, "!"),
        this.token(1, !0 === e.important ? "important" : e.important))
    }
    function nh(e) {
        this.children(e, (e=>{
            "Declaration" === e.type && this.token(17, ";")
        }
        ))
    }
    function rh(e) {
        this.token(12, e.value + e.unit)
    }
    function oh(e) {
        this.token(2, e.name + "("),
        this.children(e),
        this.token(22, ")")
    }
    function sh(e) {
        this.token(4, "#" + e.value)
    }
    function ah() {
        return {
            type: "Identifier",
            loc: this.getLocation(this.tokenStart, this.tokenEnd),
            name: this.consume(1)
        }
    }
    function ih(e) {
        this.token(1, e.name)
    }
    function lh() {
        let e = this.tokenStart;
        return this.eat(4),
        {
            type: "IdSelector",
            loc: this.getLocation(e, this.tokenStart),
            name: this.substrToCursor(e + 1)
        }
    }
    function ch(e) {
        this.token(9, "#" + e.name)
    }
    function uh(e) {
        this.token(21, "("),
        this.token(1, e.name),
        null !== e.value && (this.token(16, ":"),
        this.node(e.value)),
        this.token(22, ")")
    }
    function dh(e) {
        this.children(e)
    }
    function hh(e) {
        this.children(e, (()=>this.token(18, ",")))
    }
    function mh() {
        let e = this.tokenStart;
        return this.eatDelim(38),
        {
            type: "NestingSelector",
            loc: this.getLocation(e, this.tokenStart)
        }
    }
    function ph() {
        this.token(9, "&")
    }
    function fh() {
        this.skipSC();
        let e, t = this.tokenStart, n = t, r = null;
        return e = this.lookupValue(0, "odd") || this.lookupValue(0, "even") ? this.Identifier() : this.AnPlusB(),
        n = this.tokenStart,
        this.skipSC(),
        this.lookupValue(0, "of") && (this.next(),
        r = this.SelectorList(),
        n = this.tokenStart),
        {
            type: "Nth",
            loc: this.getLocation(t, n),
            nth: e,
            selector: r
        }
    }
    function gh(e) {
        this.node(e.nth),
        null !== e.selector && (this.token(1, "of"),
        this.node(e.selector))
    }
    function vh(e) {
        this.token(10, e.value)
    }
    function yh(e) {
        this.tokenize(e.value)
    }
    function bh(e) {
        this.token(21, "("),
        this.children(e),
        this.token(22, ")")
    }
    function xh() {
        return {
            type: "Percentage",
            loc: this.getLocation(this.tokenStart, this.tokenEnd),
            value: this.consumeNumber(11)
        }
    }
    function kh(e) {
        this.token(11, e.value + "%")
    }
    function wh() {
        let e, t, n = this.tokenStart, r = null;
        return this.eat(16),
        2 === this.tokenType ? (e = this.consumeFunctionName(),
        t = e.toLowerCase(),
        hasOwnProperty.call(this.pseudo, t) ? (this.skipSC(),
        r = this.pseudo[t].call(this),
        this.skipSC()) : (r = this.createList(),
        r.push(this.Raw(this.tokenIndex, null, !1))),
        this.eat(22)) : e = this.consume(1),
        {
            type: "PseudoClassSelector",
            loc: this.getLocation(n, this.tokenStart),
            name: e,
            children: r
        }
    }
    function Sh(e) {
        this.token(16, ":"),
        null === e.children ? this.token(1, e.name) : (this.token(2, e.name + "("),
        this.children(e),
        this.token(22, ")"))
    }
    function Ch() {
        let e, t, n = this.tokenStart, r = null;
        return this.eat(16),
        this.eat(16),
        2 === this.tokenType ? (e = this.consumeFunctionName(),
        t = e.toLowerCase(),
        hasOwnProperty.call(this.pseudo, t) ? (this.skipSC(),
        r = this.pseudo[t].call(this),
        this.skipSC()) : (r = this.createList(),
        r.push(this.Raw(this.tokenIndex, null, !1))),
        this.eat(22)) : e = this.consume(1),
        {
            type: "PseudoElementSelector",
            loc: this.getLocation(n, this.tokenStart),
            name: e,
            children: r
        }
    }
    function Th(e) {
        this.token(16, ":"),
        this.token(16, ":"),
        null === e.children ? this.token(1, e.name) : (this.token(2, e.name + "("),
        this.children(e),
        this.token(22, ")"))
    }
    function Ih(e) {
        this.token(10, e.left),
        this.token(9, "/"),
        this.token(10, e.right)
    }
    function Ah() {
        return this.tokenIndex > 0 && 13 === this.lookupType(-1) ? this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset : this.tokenStart
    }
    function Oh(e, t, n) {
        let r, o = this.getTokenStart(e);
        return this.skipUntilBalanced(e, t || this.consumeUntilBalanceEnd),
        r = n && this.tokenStart > o ? Ah.call(this) : this.tokenStart,
        {
            type: "Raw",
            loc: this.getLocation(o, r),
            value: this.substring(o, r)
        }
    }
    function Eh(e) {
        this.tokenize(e.value)
    }
    function Lh(e) {
        this.node(e.prelude),
        this.node(e.block)
    }
    function Nh() {
        let e = this.readSequence(this.scope.Selector);
        return null === this.getFirstListNode(e) && this.error("Selector is expected"),
        {
            type: "Selector",
            loc: this.getLocationFromList(e),
            children: e
        }
    }
    function _h(e) {
        this.children(e)
    }
    function Dh() {
        let e = this.createList();
        for (; !this.eof && (e.push(this.Selector()),
        18 === this.tokenType); )
            this.next();
        return {
            type: "SelectorList",
            loc: this.getLocationFromList(e),
            children: e
        }
    }
    function Ph(e) {
        this.children(e, (()=>this.token(18, ",")))
    }
    var Rh = 92
      , Mh = 34
      , jh = 39;
    function Fh(e) {
        let t = e.length
          , n = e.charCodeAt(0)
          , r = n === Mh || n === jh ? 1 : 0
          , o = 1 === r && t > 1 && e.charCodeAt(t - 1) === n ? t - 2 : t - 1
          , s = "";
        for (let n = r; n <= o; n++) {
            let r = e.charCodeAt(n);
            if (r === Rh) {
                if (n === o) {
                    n !== t - 1 && (s = e.substr(n + 1));
                    break
                }
                if (r = e.charCodeAt(++n),
                Ru(Rh, r)) {
                    let t = n - 1
                      , r = Xu(e, t);
                    n = r - 1,
                    s += td(e.substring(t + 1, r))
                } else
                    13 === r && 10 === e.charCodeAt(n + 1) && n++
            } else
                s += e[n]
        }
        return s
    }
    function Uh() {
        return {
            type: "String",
            loc: this.getLocation(this.tokenStart, this.tokenEnd),
            value: Fh(this.consume(5))
        }
    }
    function Bh(e) {
        this.token(5, function(e, t) {
            let n = Mh
              , r = ""
              , o = !1;
            for (let t = 0; t < e.length; t++) {
                let s = e.charCodeAt(t);
                0 !== s ? s <= 31 || 127 === s ? (r += "\\" + s.toString(16),
                o = !0) : s === n || s === Rh ? (r += "\\" + e.charAt(t),
                o = !1) : (o && (Ou(s) || Pu(s)) && (r += " "),
                r += e.charAt(t),
                o = !1) : r += "\ufffd"
            }
            return '"' + r + '"'
        }(e.value))
    }
    function zh(e) {
        this.children(e)
    }
    var Hh = 42;
    function Wh() {
        1 !== this.tokenType && !1 === this.isDelim(Hh) && this.error("Identifier or asterisk is expected"),
        this.next()
    }
    function $h() {
        let e = this.tokenStart;
        return this.isDelim(124) ? (this.next(),
        Wh.call(this)) : (Wh.call(this),
        this.isDelim(124) && (this.next(),
        Wh.call(this))),
        {
            type: "TypeSelector",
            loc: this.getLocation(e, this.tokenStart),
            name: this.substrToCursor(e)
        }
    }
    function Vh(e) {
        this.tokenize(e.name)
    }
    function Gh(e) {
        this.tokenize(e.value)
    }
    var qh = 32
      , Kh = 92
      , Jh = 34
      , Yh = 39
      , Xh = 40
      , Zh = 41;
    function Qh(e) {
        this.token(7, function(e) {
            let t = ""
              , n = !1;
            for (let r = 0; r < e.length; r++) {
                let o = e.charCodeAt(r);
                0 !== o ? o <= 31 || 127 === o ? (t += "\\" + o.toString(16),
                n = !0) : o === qh || o === Kh || o === Jh || o === Yh || o === Xh || o === Zh ? (t += "\\" + e.charAt(r),
                n = !1) : (n && Ou(o) && (t += " "),
                t += e.charAt(r),
                n = !1) : t += "\ufffd"
            }
            return "url(" + t + ")"
        }(e.value))
    }
    function em(e) {
        this.children(e)
    }
    function tm(e) {
        this.token(13, e.value)
    }
    var nm = function(e) {
        let t = new Map;
        for (let n in e.node) {
            let r = e.node[n];
            "function" == typeof (r.generate || r) && t.set(n, r.generate || r)
        }
        return function(e, n) {
            let r = ""
              , o = 0
              , s = {
                node(e) {
                    if (!t.has(e.type))
                        throw new Error("Unknown node type: " + e.type);
                    t.get(e.type).call(a, e)
                },
                tokenBefore: xd,
                token(e, t) {
                    o = this.tokenBefore(o, e, t),
                    this.emit(t, e, !1),
                    9 === e && 92 === t.charCodeAt(0) && this.emit("\n", 13, !0)
                },
                emit(e) {
                    r += e
                },
                result: ()=>r
            };
            n && ("function" == typeof n.decorator && (s = n.decorator(s)),
            n.sourceMap && (s = function(e) {
                let t = new hd.SourceMapGenerator
                  , n = {
                    line: 1,
                    column: 0
                }
                  , r = {
                    line: 0,
                    column: 0
                }
                  , o = {
                    line: 1,
                    column: 0
                }
                  , s = {
                    generated: o
                }
                  , a = 1
                  , i = 0
                  , l = !1
                  , c = e.node;
                e.node = function(e) {
                    if (e.loc && e.loc.start && md.has(e.type)) {
                        let c = e.loc.start.line
                          , u = e.loc.start.column - 1;
                        (r.line !== c || r.column !== u) && (r.line = c,
                        r.column = u,
                        n.line = a,
                        n.column = i,
                        l && (l = !1,
                        (n.line !== o.line || n.column !== o.column) && t.addMapping(s)),
                        l = !0,
                        t.addMapping({
                            source: e.loc.source,
                            original: r,
                            generated: n
                        }))
                    }
                    c.call(this, e),
                    l && md.has(e.type) && (o.line = a,
                    o.column = i)
                }
                ;
                let u = e.emit;
                e.emit = function(e, t, n) {
                    for (let t = 0; t < e.length; t++)
                        10 === e.charCodeAt(t) ? (a++,
                        i = 0) : i++;
                    u(e, t, n)
                }
                ;
                let d = e.result;
                return e.result = function() {
                    return l && t.addMapping(s),
                    {
                        css: d(),
                        map: t
                    }
                }
                ,
                e
            }(s)),
            n.mode in pd && (s.tokenBefore = pd[n.mode]));
            let a = {
                node: e=>s.node(e),
                children: kd,
                token: (e,t)=>s.token(e, t),
                tokenize: wd
            };
            return s.node(e),
            s.result()
        }
    }({
        node: Sd
    })
      , rm = null
      , om = class {
        static createItem(e) {
            return {
                prev: null,
                next: null,
                data: e
            }
        }
        constructor() {
            this.head = null,
            this.tail = null,
            this.cursor = null
        }
        createItem(e) {
            return om.createItem(e)
        }
        allocateCursor(e, t) {
            let n;
            return null !== rm ? (n = rm,
            rm = rm.cursor,
            n.prev = e,
            n.next = t,
            n.cursor = this.cursor) : n = {
                prev: e,
                next: t,
                cursor: this.cursor
            },
            this.cursor = n,
            n
        }
        releaseCursor() {
            let {cursor: e} = this;
            this.cursor = e.cursor,
            e.prev = null,
            e.next = null,
            e.cursor = rm,
            rm = e
        }
        updateCursors(e, t, n, r) {
            let {cursor: o} = this;
            for (; null !== o; )
                o.prev === e && (o.prev = t),
                o.next === n && (o.next = r),
                o = o.cursor
        }
        *[Symbol.iterator]() {
            for (let e = this.head; null !== e; e = e.next)
                yield e.data
        }
        get size() {
            let e = 0;
            for (let t = this.head; null !== t; t = t.next)
                e++;
            return e
        }
        get isEmpty() {
            return null === this.head
        }
        get first() {
            return this.head && this.head.data
        }
        get last() {
            return this.tail && this.tail.data
        }
        fromArray(e) {
            let t = null;
            this.head = null;
            for (let n of e) {
                let e = om.createItem(n);
                null !== t ? t.next = e : this.head = e,
                e.prev = t,
                t = e
            }
            return this.tail = t,
            this
        }
        toArray() {
            return [...this]
        }
        toJSON() {
            return [...this]
        }
        forEach(e, t=this) {
            let n = this.allocateCursor(null, this.head);
            for (; null !== n.next; ) {
                let r = n.next;
                n.next = r.next,
                e.call(t, r.data, r, this)
            }
            this.releaseCursor()
        }
        forEachRight(e, t=this) {
            let n = this.allocateCursor(this.tail, null);
            for (; null !== n.prev; ) {
                let r = n.prev;
                n.prev = r.prev,
                e.call(t, r.data, r, this)
            }
            this.releaseCursor()
        }
        reduce(e, t, n=this) {
            let r, o = this.allocateCursor(null, this.head), s = t;
            for (; null !== o.next; )
                r = o.next,
                o.next = r.next,
                s = e.call(n, s, r.data, r, this);
            return this.releaseCursor(),
            s
        }
        reduceRight(e, t, n=this) {
            let r, o = this.allocateCursor(this.tail, null), s = t;
            for (; null !== o.prev; )
                r = o.prev,
                o.prev = r.prev,
                s = e.call(n, s, r.data, r, this);
            return this.releaseCursor(),
            s
        }
        some(e, t=this) {
            for (let n = this.head; null !== n; n = n.next)
                if (e.call(t, n.data, n, this))
                    return !0;
            return !1
        }
        map(e, t=this) {
            let n = new om;
            for (let r = this.head; null !== r; r = r.next)
                n.appendData(e.call(t, r.data, r, this));
            return n
        }
        filter(e, t=this) {
            let n = new om;
            for (let r = this.head; null !== r; r = r.next)
                e.call(t, r.data, r, this) && n.appendData(r.data);
            return n
        }
        nextUntil(e, t, n=this) {
            if (null === e)
                return;
            let r = this.allocateCursor(null, e);
            for (; null !== r.next; ) {
                let e = r.next;
                if (r.next = e.next,
                t.call(n, e.data, e, this))
                    break
            }
            this.releaseCursor()
        }
        prevUntil(e, t, n=this) {
            if (null === e)
                return;
            let r = this.allocateCursor(e, null);
            for (; null !== r.prev; ) {
                let e = r.prev;
                if (r.prev = e.prev,
                t.call(n, e.data, e, this))
                    break
            }
            this.releaseCursor()
        }
        clear() {
            this.head = null,
            this.tail = null
        }
        copy() {
            let e = new om;
            for (let t of this)
                e.appendData(t);
            return e
        }
        prepend(e) {
            return this.updateCursors(null, e, this.head, e),
            null !== this.head ? (this.head.prev = e,
            e.next = this.head) : this.tail = e,
            this.head = e,
            this
        }
        prependData(e) {
            return this.prepend(om.createItem(e))
        }
        append(e) {
            return this.insert(e)
        }
        appendData(e) {
            return this.insert(om.createItem(e))
        }
        insert(e, t=null) {
            if (null !== t)
                if (this.updateCursors(t.prev, e, t, e),
                null === t.prev) {
                    if (this.head !== t)
                        throw new Error("before doesn't belong to list");
                    this.head = e,
                    t.prev = e,
                    e.next = t,
                    this.updateCursors(null, e)
                } else
                    t.prev.next = e,
                    e.prev = t.prev,
                    t.prev = e,
                    e.next = t;
            else
                this.updateCursors(this.tail, e, null, e),
                null !== this.tail ? (this.tail.next = e,
                e.prev = this.tail) : this.head = e,
                this.tail = e;
            return this
        }
        insertData(e, t) {
            return this.insert(om.createItem(e), t)
        }
        remove(e) {
            if (this.updateCursors(e, e.prev, e, e.next),
            null !== e.prev)
                e.prev.next = e.next;
            else {
                if (this.head !== e)
                    throw new Error("item doesn't belong to list");
                this.head = e.next
            }
            if (null !== e.next)
                e.next.prev = e.prev;
            else {
                if (this.tail !== e)
                    throw new Error("item doesn't belong to list");
                this.tail = e.prev
            }
            return e.prev = null,
            e.next = null,
            e
        }
        push(e) {
            this.insert(om.createItem(e))
        }
        pop() {
            return null !== this.tail ? this.remove(this.tail) : null
        }
        unshift(e) {
            this.prepend(om.createItem(e))
        }
        shift() {
            return null !== this.head ? this.remove(this.head) : null
        }
        prependList(e) {
            return this.insertList(e, this.head)
        }
        appendList(e) {
            return this.insertList(e)
        }
        insertList(e, t) {
            return null === e.head || (null != t ? (this.updateCursors(t.prev, e.tail, t, e.head),
            null !== t.prev ? (t.prev.next = e.head,
            e.head.prev = t.prev) : this.head = e.head,
            t.prev = e.tail,
            e.tail.next = t) : (this.updateCursors(this.tail, e.tail, null, e.head),
            null !== this.tail ? (this.tail.next = e.head,
            e.head.prev = this.tail) : this.head = e.head,
            this.tail = e.tail),
            e.head = null,
            e.tail = null),
            this
        }
        replace(e, t) {
            "head"in t ? this.insertList(t, e) : this.insert(t, e),
            this.remove(e)
        }
    }
      , sm = 100
      , am = 60
      , im = "    ";
    function lm({source: e, line: t, column: n}, r) {
        function o(e, t) {
            return s.slice(e, t).map(((t,n)=>String(e + n + 1).padStart(l) + " |" + t)).join("\n")
        }
        let s = e.split(/\r\n?|\n|\f/)
          , a = Math.max(1, t - r) - 1
          , i = Math.min(t + r, s.length + 1)
          , l = Math.max(4, String(i).length) + 1
          , c = 0;
        (n += (im.length - 1) * (s[t - 1].substr(0, n - 1).match(/\t/g) || []).length) > sm && (c = n - am + 3,
        n = am - 2);
        for (let e = a; e <= i; e++)
            e >= 0 && e < s.length && (s[e] = s[e].replace(/\t/g, im),
            s[e] = (c > 0 && s[e].length > c ? "\u2026" : "") + s[e].substr(c, sm - 2) + (s[e].length > c + sm - 1 ? "\u2026" : ""));
        return [o(a, t), new Array(n + l + 2).join("-") + "^", o(t, i)].filter(Boolean).join("\n")
    }
    function cm(e, t, n, r, o) {
        return Object.assign(function(e, t) {
            let n = Object.create(SyntaxError.prototype)
              , r = new Error;
            return Object.assign(n, {
                name: e,
                message: t,
                get stack() {
                    return (r.stack || "").replace(/^(.+\n){1,3}/, `${e}: ${t}\n`)
                }
            })
        }("SyntaxError", e), {
            source: t,
            offset: n,
            line: r,
            column: o,
            sourceFragment: e=>lm({
                source: t,
                line: r,
                column: o
            }, isNaN(e) ? 0 : e),
            get formattedMessage() {
                return `Parse error: ${e}\n` + lm({
                    source: t,
                    line: r,
                    column: o
                }, 2)
            }
        })
    }
    function um(e) {
        let t = this.createList()
          , n = !1
          , r = {
            recognizer: e
        };
        for (; !this.eof; ) {
            switch (this.tokenType) {
            case 25:
                this.next();
                continue;
            case 13:
                n = !0,
                this.next();
                continue
            }
            let o = e.getNode.call(this, r);
            if (void 0 === o)
                break;
            n && (e.onWhiteSpace && e.onWhiteSpace.call(this, o, t, r),
            n = !1),
            t.push(o)
        }
        return n && e.onWhiteSpace && e.onWhiteSpace.call(this, null, t, r),
        t
    }
    var dm = ()=>{}
    ;
    function hm(e) {
        return function() {
            return this[e]()
        }
    }
    function mm(e) {
        let t = Object.create(null);
        for (let n in e) {
            let r = e[n]
              , o = r.parse || r;
            o && (t[n] = o)
        }
        return t
    }
    var pm = {
        parse() {
            return this.createSingleNodeList(this.SelectorList())
        }
    }
      , fm = {
        parse() {
            return this.createSingleNodeList(this.Selector())
        }
    }
      , gm = {
        parse() {
            return this.createSingleNodeList(this.Identifier())
        }
    }
      , vm = {
        parse() {
            return this.createSingleNodeList(this.Nth())
        }
    }
      , ym = {
        dir: gm,
        has: pm,
        lang: gm,
        matches: pm,
        is: pm,
        "-moz-any": pm,
        "-webkit-any": pm,
        where: pm,
        not: pm,
        "nth-child": vm,
        "nth-last-child": vm,
        "nth-last-of-type": vm,
        "nth-of-type": vm,
        slotted: fm,
        host: fm,
        "host-context": fm
    }
      , bm = {};
    xu(bm, {
        AnPlusB: ()=>_d,
        AttributeSelector: ()=>$d,
        ClassSelector: ()=>Yd,
        Combinator: ()=>Zd,
        IdSelector: ()=>lh,
        Identifier: ()=>ah,
        NestingSelector: ()=>mh,
        Nth: ()=>fh,
        Percentage: ()=>xh,
        PseudoClassSelector: ()=>wh,
        PseudoElementSelector: ()=>Ch,
        Raw: ()=>Oh,
        Selector: ()=>Nh,
        SelectorList: ()=>Dh,
        String: ()=>Uh,
        TypeSelector: ()=>$h
    });
    var xm = function(e) {
        let t = ""
          , n = "<unknown>"
          , r = !1
          , o = dm
          , s = !1
          , a = new sd
          , i = Object.assign(new cd, function(e) {
            let t = {
                context: Object.create(null),
                scope: Object.assign(Object.create(null), e.scope),
                atrule: mm(e.atrule),
                pseudo: mm(e.pseudo),
                node: mm(e.node)
            };
            for (let n in e.parseContext)
                switch (typeof e.parseContext[n]) {
                case "function":
                    t.context[n] = e.parseContext[n];
                    break;
                case "string":
                    t.context[n] = hm(e.parseContext[n])
                }
            return {
                config: t,
                ...t,
                ...t.node
            }
        }(e || {}), {
            parseAtrulePrelude: !0,
            parseRulePrelude: !0,
            parseValue: !0,
            parseCustomProperty: !1,
            readSequence: um,
            consumeUntilBalanceEnd: ()=>0,
            consumeUntilLeftCurlyBracket: e=>123 === e ? 1 : 0,
            consumeUntilLeftCurlyBracketOrSemicolon: e=>123 === e || 59 === e ? 1 : 0,
            consumeUntilExclamationMarkOrSemicolon: e=>33 === e || 59 === e ? 1 : 0,
            consumeUntilSemicolonIncluded: e=>59 === e ? 2 : 0,
            createList: ()=>new om,
            createSingleNodeList: e=>(new om).appendData(e),
            getFirstListNode: e=>e && e.first,
            getLastListNode: e=>e && e.last,
            parseWithFallback(e, t) {
                let n = this.tokenIndex;
                try {
                    return e.call(this)
                } catch (e) {
                    if (s)
                        throw e;
                    let r = t.call(this, n);
                    return s = !0,
                    o(e, r),
                    s = !1,
                    r
                }
            },
            lookupNonWSType(e) {
                let t;
                do {
                    if (t = this.lookupType(e++),
                    13 !== t)
                        return t
                } while (0 !== t);
                return 0
            },
            charCodeAt: e=>e >= 0 && e < t.length ? t.charCodeAt(e) : 0,
            substring: (e,n)=>t.substring(e, n),
            substrToCursor(e) {
                return this.source.substring(e, this.tokenStart)
            },
            cmpChar: (e,n)=>qu(t, e, n),
            cmpStr: (e,n,r)=>Ku(t, e, n, r),
            consume(e) {
                let t = this.tokenStart;
                return this.eat(e),
                this.substrToCursor(t)
            },
            consumeFunctionName() {
                let e = t.substring(this.tokenStart, this.tokenEnd - 1);
                return this.eat(2),
                e
            },
            consumeNumber(e) {
                let n = t.substring(this.tokenStart, Qu(t, this.tokenStart));
                return this.eat(e),
                n
            },
            eat(e) {
                if (this.tokenType !== e) {
                    let t = nd[e].slice(0, -6).replace(/-/g, " ").replace(/^./, (e=>e.toUpperCase()))
                      , n = `${/[[\](){}]/.test(t) ? `"${t}"` : t} is expected`
                      , r = this.tokenStart;
                    switch (e) {
                    case 1:
                        2 === this.tokenType || 7 === this.tokenType ? (r = this.tokenEnd - 1,
                        n = "Identifier is expected but function found") : n = "Identifier is expected";
                        break;
                    case 4:
                        this.isDelim(35) && (this.next(),
                        r++,
                        n = "Name is expected");
                        break;
                    case 11:
                        10 === this.tokenType && (r = this.tokenEnd,
                        n = "Percent sign is expected")
                    }
                    this.error(n, r)
                }
                this.next()
            },
            eatIdent(e) {
                (1 !== this.tokenType || !1 === this.lookupValue(0, e)) && this.error(`Identifier "${e}" is expected`),
                this.next()
            },
            eatDelim(e) {
                this.isDelim(e) || this.error(`Delim "${String.fromCharCode(e)}" is expected`),
                this.next()
            },
            getLocation: (e,t)=>r ? a.getLocationRange(e, t, n) : null,
            getLocationFromList(e) {
                if (r) {
                    let t = this.getFirstListNode(e)
                      , r = this.getLastListNode(e);
                    return a.getLocationRange(null !== t ? t.loc.start.offset - a.startOffset : this.tokenStart, null !== r ? r.loc.end.offset - a.startOffset : this.tokenStart, n)
                }
                return null
            },
            error(e, n) {
                let r = typeof n < "u" && n < t.length ? a.getLocation(n) : this.eof ? a.getLocation(function(e, t) {
                    for (; t >= 0 && Pu(e.charCodeAt(t)); t--)
                        ;
                    return t + 1
                }(t, t.length - 1)) : a.getLocation(this.tokenStart);
                throw new cm(e || "Unexpected input",t,r.offset,r.line,r.column)
            }
        });
        return Object.assign((function(e, l) {
            t = e,
            l = l || {},
            i.setSource(t, ud),
            a.setSource(t, l.offset, l.line, l.column),
            n = l.filename || "<unknown>",
            r = Boolean(l.positions),
            o = "function" == typeof l.onParseError ? l.onParseError : dm,
            s = !1,
            i.parseAtrulePrelude = !("parseAtrulePrelude"in l) || Boolean(l.parseAtrulePrelude),
            i.parseRulePrelude = !("parseRulePrelude"in l) || Boolean(l.parseRulePrelude),
            i.parseValue = !("parseValue"in l) || Boolean(l.parseValue),
            i.parseCustomProperty = "parseCustomProperty"in l && Boolean(l.parseCustomProperty);
            let {context: c="default", onComment: u} = l;
            if (!(c in i.context))
                throw new Error("Unknown context `" + c + "`");
            "function" == typeof u && i.forEachToken(((e,n,r)=>{
                if (25 === e) {
                    let e = i.getLocation(n, r)
                      , o = Ku(t, r - 2, r, "*/") ? t.slice(n + 2, r - 2) : t.slice(n + 2, r);
                    u(o, e)
                }
            }
            ));
            let d = i.context[c].call(i, l);
            return i.eof || i.error(),
            d
        }
        ), {
            SyntaxError: cm,
            config: i.config
        })
    }({
        parseContext: {
            default: "SelectorList",
            selectorList: "SelectorList",
            selector: "Selector"
        },
        scope: {
            Selector: {
                onWhiteSpace: function(e, t) {
                    null !== t.last && "Combinator" !== t.last.type && null !== e && "Combinator" !== e.type && t.push({
                        type: "Combinator",
                        loc: null,
                        name: " "
                    })
                },
                getNode: function() {
                    switch (this.tokenType) {
                    case 19:
                        return this.AttributeSelector();
                    case 4:
                        return this.IdSelector();
                    case 16:
                        return 16 === this.lookupType(1) ? this.PseudoElementSelector() : this.PseudoClassSelector();
                    case 1:
                        return this.TypeSelector();
                    case 10:
                    case 11:
                        return this.Percentage();
                    case 12:
                        46 === this.charCodeAt(this.tokenStart) && this.error("Identifier is expected", this.tokenStart + 1);
                        break;
                    case 9:
                        switch (this.charCodeAt(this.tokenStart)) {
                        case 43:
                        case 62:
                        case 126:
                        case 47:
                            return this.Combinator();
                        case 46:
                            return this.ClassSelector();
                        case 42:
                        case 124:
                            return this.TypeSelector();
                        case 35:
                            return this.IdSelector();
                        case 38:
                            return this.NestingSelector()
                        }
                    }
                }
            }
        },
        atrule: {},
        pseudo: ym,
        node: bm
    })
      , km = (e,t)=>e.a === t.a ? e.b === t.b ? e.c - t.c : e.b - t.b : e.a - t.a
      , wm = (e,t)=>0 === km(e, t)
      , Sm = (e,t)=>km(e, t) > 0
      , Cm = (e,t)=>km(e, t) < 0
      , Tm = (e,t="ASC")=>{
        let n = e.sort(km);
        return "DESC" === t ? n.reverse() : n
    }
      , Im = (...e)=>Tm(e, "ASC")
      , Am = (...e)=>Tm(e, "DESC")
      , Om = (...e)=>Am(...e)[0]
      , Em = e=>{
        let t = {
            a: 0,
            b: 0,
            c: 0
        };
        return e.children.forEach((e=>{
            switch (e.type) {
            case "IdSelector":
                t.a += 1;
                break;
            case "AttributeSelector":
            case "ClassSelector":
                t.b += 1;
                break;
            case "PseudoClassSelector":
                switch (e.name.toLowerCase()) {
                case "where":
                    break;
                case "is":
                case "matches":
                case "-webkit-any":
                case "-moz-any":
                case "any":
                case "not":
                case "has":
                    if (e.children) {
                        let n = Om(...Lm(e.children.first));
                        t.a += n.a,
                        t.b += n.b,
                        t.c += n.c
                    }
                    break;
                case "nth-child":
                case "nth-last-child":
                    if (t.b += 1,
                    e.children.first.selector) {
                        let n = Om(...Lm(e.children.first.selector));
                        t.a += n.a,
                        t.b += n.b,
                        t.c += n.c
                    }
                    break;
                case "host-context":
                case "host":
                    if (t.b += 1,
                    e.children) {
                        let n = {
                            type: "Selector",
                            children: []
                        }
                          , r = !1;
                        e.children.first.children.forEach((e=>!r && ("Combinator" === e.type ? (r = !0,
                        !1) : void n.children.push(e))));
                        let o = Lm(n)[0];
                        t.a += o.a,
                        t.b += o.b,
                        t.c += o.c
                    }
                    break;
                case "after":
                case "before":
                case "first-letter":
                case "first-line":
                    t.c += 1;
                    break;
                default:
                    t.b += 1
                }
                break;
            case "PseudoElementSelector":
                switch (e.name) {
                case "slotted":
                    if (t.c += 1,
                    e.children) {
                        let n = {
                            type: "Selector",
                            children: []
                        }
                          , r = !1;
                        e.children.first.children.forEach((e=>!r && ("Combinator" === e.type ? (r = !0,
                        !1) : void n.children.push(e))));
                        let o = Lm(n)[0];
                        t.a += o.a,
                        t.b += o.b,
                        t.c += o.c
                    }
                    break;
                case "view-transition-group":
                case "view-transition-image-pair":
                case "view-transition-old":
                case "view-transition-new":
                    if (e.children && "*" === e.children.first.value)
                        break;
                    t.c += 1;
                    break;
                default:
                    t.c += 1
                }
                break;
            case "TypeSelector":
                let n = e.name;
                n.includes("|") && (n = n.split("|")[1]),
                "*" !== n && (t.c += 1)
            }
        }
        )),
        new Nm(t,e)
    }
      , Lm = e=>{
        if (!e)
            return [];
        let t = (e=>{
            if ("string" == typeof e || e instanceof String)
                try {
                    return xm(e, {
                        context: "selectorList"
                    })
                } catch (t) {
                    throw new TypeError(`Could not convert passed in source '${e}' to SelectorList: ${t.message}`)
                }
            if (e instanceof Object) {
                if (e.type && ["Selector", "SelectorList"].includes(e.type))
                    return e;
                if (e.type && "Raw" === e.type)
                    try {
                        return xm(e.value, {
                            context: "selectorList"
                        })
                    } catch (e) {
                        throw new TypeError(`Could not convert passed in source to SelectorList: ${e.message}`)
                    }
                throw new TypeError("Passed in source is an Object but no AST / AST of the type Selector or SelectorList")
            }
            throw new TypeError("Passed in source is not a String nor an Object. I don't know what to do with it.")
        }
        )(e);
        if ("Selector" === t.type)
            return [Em(e)];
        if ("SelectorList" === t.type) {
            let e = [];
            return t.children.forEach((t=>{
                let n = Em(t);
                e.push(n)
            }
            )),
            e
        }
    }
      , Nm = class {
        constructor(e, t=null) {
            this.value = e,
            this.selector = t
        }
        get a() {
            return this.value.a
        }
        set a(e) {
            throw new Error("Manipulating the port of the specificity directly is not allowed. Instead, directly set a new value")
        }
        get b() {
            return this.value.b
        }
        set b(e) {
            throw new Error("Manipulating the port of the specificity directly is not allowed. Instead, directly set a new value")
        }
        get c() {
            return this.value.c
        }
        set c(e) {
            throw new Error("Manipulating the port of the specificity directly is not allowed. Instead, directly set a new value")
        }
        selectorString() {
            return "string" == typeof this.selector || this.selector instanceof String ? this.selector : this.selector instanceof Object && "Selector" === this.selector.type ? nm(this.selector) : ""
        }
        toObject() {
            return this.value
        }
        toArray() {
            return [this.value.a, this.value.b, this.value.c]
        }
        toString() {
            return `(${this.value.a},${this.value.b},${this.value.c})`
        }
        toJSON() {
            return {
                selector: this.selectorString(),
                asObject: this.toObject(),
                asArray: this.toArray(),
                asString: this.toString()
            }
        }
        isEqualTo(e) {
            return wm(this, e)
        }
        isGreaterThan(e) {
            return Sm(this, e)
        }
        isLessThan(e) {
            return Cm(this, e)
        }
        static calculate(e) {
            return Lm(e)
        }
        static compare(e, t) {
            return km(e, t)
        }
        static equals(e, t) {
            return wm(e, t)
        }
        static lessThan(e, t) {
            return Cm(e, t)
        }
        static greaterThan(e, t) {
            return Sm(e, t)
        }
        static min(...e) {
            return ((...e)=>Im(...e)[0])(...e)
        }
        static max(...e) {
            return Om(...e)
        }
        static sortAsc(...e) {
            return Im(...e)
        }
        static sortDesc(...e) {
            return Am(...e)
        }
    }
    ;
    const _m = e=>(e=>{
        const t = new Map
          , n = e=>{
            const n = t.get(e);
            if (l(n))
                return n;
            {
                const n = Nm.calculate(e)[0];
                return t.set(e, n),
                n
            }
        }
        ;
        return F(e, ((e,t)=>{
            const r = n(e.selector)
              , o = n(t.selector);
            return Nm.compare(r, o)
        }
        ))
    }
    )((e=>R(e, (e=>(e=>-1 !== e.selector.indexOf(","))(e) ? (e=>{
        const t = e.selector.split(/,(?![^(]*\))/g);
        return A(t, (t=>{
            const n = t.trim();
            return {
                ...e,
                selector: n
            }
        }
        ))
    }
    )(e) : [e])))(e))
      , Dm = e=>{
        const t = {};
        return O(e, (r=>{
            const o = e.getPropertyValue(r);
            n(o) && (t[r] = o)
        }
        )),
        t
    }
      , Pm = e=>({
        selector: e.selectorText,
        styles: Dm(e.style)
    })
      , Rm = e=>{
        const t = e.cssRules;
        return R(t, (e=>(e=>e.type === window.CSSRule.IMPORT_RULE)(e) ? Rm(e.styleSheet) : (e=>e.type === window.CSSRule.STYLE_RULE)(e) ? [Pm(e)] : []))
    }
      , Mm = (e,t)=>{
        const n = N(t, ((e,t)=>({
            ...e,
            ...t.styles
        })), {});
        return Be(n, ((t,n)=>!T(e.dom.style, n)))
    }
    ;
    const jm = e=>{
        return t = (e=>{
            const t = e.dom.styleSheets;
            return Array.prototype.slice.call(t)
        }
        )(e),
        R(t, Rm);
        var t
    }
      , Fm = (!0,
    (e,t,n)=>((e,t,r,o)=>{
        var s, a;
        ((e,t,n)=>{
            ((e,t,n)=>{
                const r = []
                  , o = document.createTreeWalker(e.dom, NodeFilter.SHOW_ELEMENT);
                for (; l(o.nextNode()); ) {
                    const e = Pe.fromDom(o.currentNode)
                      , n = L(t, (t=>It(e, t.selector)));
                    if (n.length > 0) {
                        const t = Mm(e, n);
                        Un(e, t),
                        r.push(e)
                    }
                }
                n && O(r, (e=>In(e, "class")))
            }
            )(t, _m(e), n)
        }
        )((s = jm(t),
        a = n,
        A(s, (e=>{
            const t = e.selector
              , n = a.hasOwnProperty(t) ? a[t] : t;
            return {
                ...e,
                selector: n
            }
        }
        ))), r, true)
    }
    )(0, e, t));
    const Um = {
        p: "p, li[data-converted-paragraph]"
    }
      , Bm = (e,t)=>{
        const n = qt(e, "li[data-converted-paragraph]");
        if (O(n, (e=>{
            In(e, "data-converted-paragraph")
        }
        )),
        t) {
            const t = qt(e, "li");
            O(t, (t=>{
                const n = (e=>{
                    const t = (()=>{
                        const t = Pe.fromTag("spn");
                        return cn(e, t),
                        t
                    }
                    )();
                    return {
                        convertToPx: e=>{
                            return Fn(t, "margin-left", e),
                            n = Bn(t, "margin-left"),
                            parseFloat(/-?\d+\.?\d*/.exec(n)[0]);
                            var n
                        }
                        ,
                        destroy: ()=>fn(t)
                    }
                }
                )(e)
                  , r = ((e,t)=>{
                    const n = Cn(e, "data-tab-interval").getOr("36pt");
                    return t.convertToPx(n)
                }
                )(e, n)
                  , o = zm(t, r, n).getOr({});
                (e=>{
                    In(e, "data-list-level"),
                    In(e, "data-text-indent-alt"),
                    In(e, "data-border-margin"),
                    $n(e, "margin-left"),
                    $n(e, "text-indent"),
                    je(Wn(e), ((t,n)=>{
                        !$(n, "border") || "border-image" !== n && "none" !== t.trim() && "initial" !== t.trim() || $n(e, n)
                    }
                    ))
                }
                )(t),
                n.destroy(),
                Un(t, o)
            }
            ));
            const n = qt(e, "ol,ul");
            O(n, (e=>{
                const t = qt(e, "li");
                Hn(e, "margin-top").isNone() && k.from(t[0]).each((t=>{
                    Fn(e, "margin-top", Bn(t, "margin-top"))
                }
                )),
                Hn(e, "margin-bottom").isNone() && k.from(t[t.length - 1]).each((t=>{
                    Fn(e, "margin-bottom", Bn(t, "margin-bottom"))
                }
                ))
            }
            ))
        }
        In(e, "data-tab-interval")
    }
      , zm = (e,t,n)=>{
        const r = e=>Cn(e, "data-list-level").map((e=>parseInt(e, 10))).getOr(1);
        return Hn(e, "text-indent").bind((o=>Hn(e, "margin-left").map((s=>{
            const a = Hn(e, "list-style").exists((e=>W(e, "none")))
              , i = Cn(e, "data-border-margin").getOr("0px")
              , l = a ? r(e) + 1 : r(e)
              , c = n.convertToPx(s) + n.convertToPx(i)
              , u = t * l
              , d = Cn(e, "data-text-indent-alt").getOr(o)
              , h = n.convertToPx(d)
              , m = {}
              , p = t / 2 * -1 - h;
            p > 0 && (m["text-indent"] = p + "px");
            const f = c - u - p;
            return m["margin-left"] = f > 0 ? f + "px" : "0px",
            m
        }
        ))))
    }
      , Hm = e=>{
        const t = (n = Pe.fromDom(document.body),
        {
            play: (e,t,r)=>{
                const o = Pe.fromTag("div")
                  , s = Pe.fromTag("iframe");
                Un(o, {
                    display: "none"
                });
                const a = Or(s, "load", (()=>{
                    var n;
                    a.unbind(),
                    hu(s, e);
                    const i = null === (n = s.dom.contentWindow) || void 0 === n ? void 0 : n.document;
                    if (void 0 === i)
                        throw new Error("sandbox iframe load event did not fire correctly");
                    const l = Pe.fromDom(i)
                      , c = l.dom.body;
                    if (void 0 === c)
                        throw new Error("sandbox iframe does not have a body");
                    const u = Pe.fromDom(c)
                      , d = t(l, u);
                    fn(o),
                    setTimeout(g(r, d), 0)
                }
                ));
                un(o, s),
                un(n, o)
            }
        });
        var n;
        return n=>new Promise((r=>{
            t.play(n, ((t,n)=>(((e,t,n)=>{
                const r = n.mergeInline();
                r && (Fm(e, t, Um),
                (e=>{
                    Ca(e)
                }
                )(t)),
                Bm(t, r)
            }
            )(t, n, {
                mergeInline: m(e)
            }),
            qn(n))), r)
        }
        ))
    }
      , Wm = (e,t,n,r)=>{
        const o = e.html;
        return n.cleanDocument(o, t, r).then((e=>{
            if (null == (n = e) || 0 === n.length)
                return {
                    response: Mr([], []),
                    bundle: zr({})
                };
            {
                const n = void 0 === r.sanitizer ? rc(r.intraFlag.isMarked) : r.sanitizer;
                return ((e,t,n,r)=>{
                    const o = e=>({
                        response: e,
                        bundle: zr({})
                    })
                      , s = r.sanitizeHtml(t, "word");
                    return Hm(e)(s).then((e=>{
                        const t = Gn(e)
                          , r = e=>o(Mr(t, e))
                          , s = Pe.fromTag("div");
                        mn(s, t);
                        const a = L(At("img[src]", s), (e=>Cn(e, "src").exists((e=>$(e, "blob:") || $(e, "data:")))))
                          , i = At("img[data-image-src]", s);
                        if (0 === a.length && 0 === i.length)
                            return r([]);
                        if (n)
                            return O(a, (e=>In(e, "id"))),
                            (e=>Promise.all(A(e, (e=>{
                                const t = e.dom;
                                return hi(t).then((n=>n.toBlob().then((r=>((n,r)=>{
                                    const o = $(t.src, "blob:") ? t.src : URL.createObjectURL(r)
                                      , s = bn("image")
                                      , a = Nc.blob(s, n, o);
                                    return Rc(a, e)
                                }
                                )(n, r)))))
                            }
                            ))))(a).then(r);
                        {
                            O(a, fn),
                            O(i, fn);
                            const e = Wt(s);
                            return o(Fr(e, [], "errors.local.images.disallowed"))
                        }
                    }
                    ))
                }
                )(t, e, r.allowLocalImages, n)
            }
            var n
        }
        ), (e=>(console.error("PowerPaste error code: WIM01"),
        {
            response: Rr("errors.paste.process.failure"),
            bundle: zr({})
        })))
    }
      , $m = bt()
      , Vm = e=>{
        try {
            const t = e()
              , n = null != t && t.length > 0 ? Gn(t) : [];
            return Cr.value(n)
        } catch (e) {
            return console.error("PowerPaste error code: PT01. Message: ", e),
            Cr.error("errors.paste.process.failure")
        }
    }
      , Gm = e=>e.fold(Hr, (e=>({
        response: Mr(e, []),
        bundle: zr({})
    })))
      , qm = (e,t,n,r,o)=>Vm((()=>{
        const s = {
            type: r,
            merge: n,
            cleanFilteredInlineElements: o.cleanFilteredInlineElements,
            indentUseMargin: o.indentUseMargin,
            preprocessor: {
                defaultProtocol: o.defaultProtocol,
                autoLinkUrls: o.autoLinkUrls
            }
        };
        return ((e,t,n,r)=>{
            Ki(n, r.preprocessor);
            const o = qn(n)
              , s = ((e,t)=>{
                const n = t.merge
                  , r = ((e,t)=>{
                    const n = t.browser.isFirefox()
                      , r = wo([(s = n ? vs : gs,
                    a = !n,
                    Co(((e,t)=>{
                        const n = ((e,t,n)=>t(Pe.fromDom(e.getNode())).fold((()=>[e]), (t=>{
                            const r = e.type() === uo
                              , o = [po(t.dom, r)];
                            return !r && n && o.push(po(t.dom, !0)),
                            o
                        }
                        )))(t, s, a);
                        e.emitTokens(n)
                    }
                    ), d))])
                      , o = n ? d : aa;
                    var s, a;
                    return {
                        annotate: [e.type === ys.Word ? r : d],
                        local: [o]
                    }
                }
                )(t, e);
                return P([r.local, Fa(t), Ba(t), r.annotate, (o = n ? [] : t.cleanFilteredInlineElements,
                [Aa, Ea, fa(o)]), Ua(t), Ha(t, e), [Rs], [pa], [Zs], [Qs], ja(t), [xa, ka, ia, wa], [la], [ca], [ua], [va], Wa(t), [ba], [ha], [Ca], $a(t), [ga], [ea]]);
                var o
            }
            )(t, r);
            return So(e, o, s)
        }
        )(e, $m, t, s)
    }
    ))
      , Km = (e,t)=>{
        const n = Vm((()=>((e,t)=>((e,t)=>So(e, t, [Qs, wa]))(e, qn(t)))(e, t)));
        return Gm(n)
    }
      , Jm = (e,t,n,r,o)=>qm(e, t, r, n, o).fold(Wr, (e=>Promise.resolve({
        response: Mr(e, []),
        bundle: zr({})
    })))
      , Ym = e=>"\n" === e || "\r" === e
      , Xm = (e,t)=>{
        const n = (e=>{
            const t = Pe.fromTag("div");
            return ((e,t)=>{
                e.dom.textContent = t
            }
            )(t, e),
            qn(t)
        }
        )(e)
          , r = ((e,t)=>{
            const n = ((e,t)=>{
                const n = e.replace(/\t/g, (r = t) <= 0 ? "" : new Array(r + 1).join(" "));
                var r;
                const o = N(n, ((e,t)=>(e=>-1 !== " \f\t\v".indexOf(e))(t) || "\xa0" === t ? e.pcIsSpace || "" === e.str || e.str.length === n.length - 1 || ((e,t)=>t < e.length && t >= 0 && Ym(e[t]))(n, e.str.length + 1) ? {
                    pcIsSpace: !1,
                    str: e.str + "\xa0"
                } : {
                    pcIsSpace: !0,
                    str: e.str + " "
                } : {
                    pcIsSpace: Ym(t),
                    str: e.str + t
                }), {
                    pcIsSpace: !1,
                    str: ""
                });
                return o.str
            }
            )(e, t).replace(/^[\r\n]*|[\r\n]*$/g, "").split(/(?:\r?\n){2}/)
              , r = A(n, (e=>e.split(/\n|\r\n/).join("<br />")));
            return 1 === r.length ? r[0] : A(r, (e=>"<p>" + e + "</p>")).join("")
        }
        )(n, t)
          , o = Gn(r);
        return Mr(o, [])
    }
      , Zm = e=>(t,n)=>((e,t)=>{
        const n = gc(e).getOrDie("Required text input for Text Handler");
        return {
            response: n.text.length > 0 ? Xm(n.text, t) : jr(),
            bundle: zr({})
        }
    }
    )(t, e)
      , Qm = e=>(t,n)=>{
        const r = (t,r)=>{
            const o = Pe.fromTag("div");
            mn(o, t),
            Ki(o, e);
            const s = Wt(o);
            return {
                response: Mr(s, r),
                bundle: n.bundle
            }
        }
          , o = m(n);
        return Pr(n.response, o, r, o, r)
    }
      , ep = (e,t,n)=>(r,o)=>{
        const s = mc(r).getOrDie("Wrong input type for HTML handler").container
          , a = Mt(t)
          , i = o.bundle;
        return lu(i) ? Km(a, s) : (e(s),
        ((e,t,n,r,o)=>{
            const s = qm(e, t, n, r, o);
            return Gm(s)
        }
        )(a, s, ou(i), cu(i), n))
    }
      , tp = (e,t,n)=>(r,o)=>{
        const s = o.bundle;
        return (e=>({
            handle: (t,n)=>e.proxyBin.fold((()=>(console.error(t),
            Promise.resolve({
                response: jr(),
                bundle: zr({})
            }))), n)
        }))(s).handle("There was no proxy bin setup. Ensure you have run proxyStep first.", (r=>{
            const o = ou(s)
              , a = cu(s)
              , i = lu(s)
              , l = Mt(e);
            return i ? ((e,t,n,r)=>{
                const o = ys.Html
                  , s = t.findClipboardTags(Wt(n)).getOr([]);
                return O(s, fn),
                Jm(e, n, o, !0, r)
            }
            )(l, t, r, n) : ((e,t,n,r,o)=>Jm(e, t, r, n, o))(l, r, o, a, n)
        }
        ))
    }
      , np = (e,t)=>(n,r)=>{
        const o = fc(n).getOrDie("Wrong input type for Word Import handler")
          , s = su(r.bundle);
        return Wm(o, s, e, t)
    }
      , rp = (e,t)=>$r
      , op = e=>(t,n)=>{
        const r = Br(n.bundle, zr(e));
        return {
            response: n.response,
            bundle: r
        }
    }
      , sp = (e,t)=>(e=>{
        const t = e=>({
            response: Mr([e], []),
            bundle: zr({})
        });
        return (e=>(e=>{
            const t = qt(e, "img");
            return Promise.all(A(t, bi)).then((()=>e))
        }
        )(e))(e).then(t).catch((()=>t(e)))
    }
    )(mc(e).getOrDie("Wrong input type for HTML handler").container);
    bt();
    var ap = (e,t,n,r)=>(o,s)=>{
        const a = s.response;
        return new Promise(((o,s)=>{
            const i = e(n);
            i.events.after.bind((e=>{
                const n = e.container;
                t(n),
                Ln(n, pr());
                const s = (u = qn(n)).indexOf("<o:p>") >= 0 || u.indexOf("mso-list") >= 0 || u.indexOf("p.MsoNormal, li.MsoNormal, div.MsoNormal") >= 0 || u.indexOf("MsoListParagraphCxSpFirst") >= 0 || u.indexOf("<w:WordDocument>") >= 0
                  , i = ((e,t)=>{
                    const n = qt(t, "*[id]");
                    return I(n, (e=>Cn(e, "id").exists((e=>$(e, "docs-internal-guid-")))))
                }
                )(0, n)
                  , l = Wt(n)
                  , c = r.findClipboardTags(l).isSome();
                var u;
                o({
                    response: a,
                    bundle: zr({
                        isWord: s,
                        isGoogleDocs: i,
                        isInternal: c,
                        proxyBin: n
                    })
                })
            }
            )),
            i.run()
        }
        ))
    }
    ;
    const ip = _t([{
        unsupported: ["id", "message", "isEquation", "attrs"]
    }, {
        supported: ["id", "contentType", "blob", "isEquation", "attrs"]
    }])
      , lp = {
        unsupported: ip.unsupported,
        supported: ip.supported,
        cata: (e,t,n)=>e.fold(t, n)
    }
      , cp = (e,t,n)=>t.indexOf(e, n)
      , up = (e,t,n,r,o,s,a)=>-1 === e || -1 === t ? k.none() : k.some({
        start: e,
        end: t,
        bower: n,
        regex: r,
        idRef: o,
        isEquation: s,
        attrs: a
    })
      , dp = (e,t,n)=>e.substring(t, n)
      , hp = (e,t)=>{
        if (-1 === t)
            return t;
        let n = 0;
        const r = e.length;
        do {
            const o = e.indexOf("{", t)
              , s = e.indexOf("}", t);
            if (s > o && -1 !== o ? (t = o + 1,
            ++n) : (o > s || o < 0) && -1 !== s && (t = s + 1,
            --n),
            t > r || -1 === s)
                return -1
        } while (n > 0);
        return t
    }
      , mp = (e,t,n,r,o)=>{
        const s = dp(e, n, r)
          , a = ((e,t)=>{
            const n = cp("\\picscalex", e, t)
              , r = cp("\\bliptag", e, n);
            return n > -1 && n < r ? k.from(e.substring(n, r)) : k.none()
        }
        )(e, n);
        return up(n, r, s, /[^a-fA-F0-9]([a-fA-F0-9]+)\}$/, "i", o, a)
    }
      , pp = (e,t,n,r,o)=>{
        const s = dp(e, n, r);
        return up(n, r, s, /([a-fA-F0-9]{64,})(?:\}.*)/, "s", o, k.none())
    }
      , fp = (e,t)=>((e,t)=>{
        const n = cp("{\\pict{", e, t)
          , r = hp(e, n)
          , o = cp("{\\shp{", e, t)
          , s = hp(e, o)
          , a = cp("{\\mmathPict{", e, t)
          , i = hp(e, a)
          , l = -1 !== a && a < n && i > r
          , c = g(pp, e, t, o, s, -1 !== a && a < o && i > s)
          , u = g(mp, e, t, n, r, l);
        return -1 === n && -1 === o ? k.none() : -1 === n ? c() : -1 === o || o < n && s > r ? u() : n < o && r > s ? c() : n < o ? u() : o < n ? c() : k.none()
    }
    )(e, t)
      , gp = e=>{
        let t = [];
        const n = ()=>e.length
          , r = e=>{
            const n = (e=>{
                const t = e.bower
                  , n = e.regex
                  , r = e.isEquation
                  , o = e.attrs;
                return (e=>{
                    const t = /\\shplid(\d+)/.exec(e);
                    return null !== t ? k.some(t[1]) : k.none()
                }
                )(t).map((s=>{
                    const a = e.idRef + s;
                    return (e=>e.indexOf("\\pngblip") >= 0 ? Cr.value("image/png") : e.indexOf("\\jpegblip") >= 0 ? Cr.value("image/jpeg") : Cr.error("errors.imageimport.unsupported"))(t).fold((e=>lp.unsupported(a, e, r, o)), (e=>((e,t)=>{
                        const n = e.match(t);
                        return n && n[1] && n[1].length % 2 == 0 ? Cr.value(n[1]) : Cr.error("errors.imageimport.invalid")
                    }
                    )(t, n).fold((e=>lp.unsupported(a, e, r, o)), (t=>lp.supported(a, e, ((e,t)=>{
                        if (0 === e.length)
                            throw new Error("Zero length content passed to Hex conversion");
                        const n = (e=>{
                            const t = new Array(e.length / 2);
                            for (let n = 0; n < e.length; n += 2) {
                                const r = e.substr(n, 2);
                                t[Math.floor(n / 2)] = parseInt(r, 16)
                            }
                            return t
                        }
                        )(e)
                          , r = new Uint8Array(n);
                        return new Blob([r],{
                            type: t
                        })
                    }
                    )(t, e), r, o)))))
                }
                ))
            }
            )(e);
            return t = t.concat(n.toArray()),
            e.end
        }
        ;
        let o = 0;
        for (; o < e.length; )
            o = fp(e, o).fold(n, r);
        return t
    }
      , vp = e=>lp.cata(e, ((e,t,n)=>e), ((e,t,n,r,o)=>e))
      , yp = e=>lp.cata(e, ((e,t,n)=>n), ((e,t,n,r,o)=>r))
      , bp = e=>lp.cata(e, ((e,t,n)=>Cr.error(t)), ((e,t,n,r,o)=>Cr.value(n)))
      , xp = (e,t)=>{
        const n = new RegExp("\\\\pic" + t + "(\\-?\\d+)\\\\").exec(e)[1];
        return parseInt(n, 10)
    }
      , kp = (e,t,n,r,o)=>{
        const s = []
          , a = [];
        let i = !1;
        const l = R(e, ((e,l)=>{
            const c = Sn(e, "data-image-id");
            return In(e, "rtf-data-image"),
            In(e, "data-image-id"),
            In(e, "data-ms-equation"),
            o || In(e, "data-image-src"),
            "unsupported" === c ? (i = !0,
            kn(e, "alt", n("errors.imageimport.unsupported")),
            []) : _(t, ((e,t)=>r(e, t, c, l))).fold((()=>(console.log("WARNING: unable to find data for image ", e.dom),
            i = !0,
            kn(e, "alt", n("errors.imageimport.unsupported")),
            [])), (t=>bp(t).fold((t=>(i = !0,
            console.error("PowerPaste error code: RTF04"),
            kn(e, "alt", n(t)),
            [])), (n=>{
                var r;
                return s.push(e),
                a.push((r = t,
                lp.cata(r, ((e,t,n)=>k.none()), ((e,t,n,r,o)=>o)))),
                o && In(e, "data-image-src"),
                [n]
            }
            ))))
        }
        ));
        return {
            blobs: l,
            filteredImages: s,
            imageAttrs: a,
            failedImage: i
        }
    }
      , wp = (e,t,n,r,o)=>{
        const s = (e=>N(e, ((e,t)=>{
            const n = vp(t)
              , r = yp(t);
            return D(e, (e=>!(r || yp(e)) && vp(e) === n)).fold((()=>e.concat([t])), (n=>bp(e[n]).isValue() ? e : e.slice(0, n).concat(e.slice(n + 1)).concat([t])))
        }
        ), []))(t)
          , {pass: a, fail: i} = E(s, (e=>!yp(e)))
          , {pass: l, fail: c} = E(e, (e=>!(e=>"true" === Sn(e, "data-ms-equation"))(e)))
          , u = kp(l, a, r, ((e,t,n,r)=>vp(e) === n), o.keepSrc)
          , d = kp(c, i, r, ((e,t,n,r)=>t === r), o.keepSrc)
          , h = u.filteredImages.concat(d.filteredImages)
          , m = u.imageAttrs.concat(d.imageAttrs)
          , p = u.blobs.concat(d.blobs)
          , f = u.failedImage || d.failedImage;
        Pc(p).then((e=>{
            ((e,t)=>e.length === t.length ? Promise.all(A(e, ((e,n)=>((e,t)=>t.fold((()=>Promise.resolve(e)), (t=>Nc.cata(e, ((n,r,o)=>r.toCanvas().then((s=>{
                const a = Pe.fromDom(s)
                  , i = Cn(a, "width").map((e=>parseInt(e, 10))).getOr(1)
                  , l = Cn(a, "height").map((e=>parseInt(e, 10))).getOr(1)
                  , c = ((e,t,n)=>{
                    const r = g(xp, e)
                      , o = r("wgoal")
                      , s = r("hgoal")
                      , a = o / t
                      , i = s / n
                      , l = r("cropl")
                      , c = r("cropt");
                    return {
                        cropl: l / a,
                        cropt: c / i,
                        cropw: (o - l - r("cropr")) / a,
                        croph: (s - c - r("cropb")) / i
                    }
                }
                )(t, i, l);
                return i === c.cropw && l === c.croph && 0 === c.cropl && 0 === c.cropt ? Promise.resolve(e) : ci(r, c.cropl, c.cropt, c.cropw, c.croph).then((e=>e.toBlob().then((t=>{
                    URL.revokeObjectURL(o);
                    const r = URL.createObjectURL(t);
                    return Nc.blob(n, e, r)
                }
                ))))
            }
            ))), ((t,n,r)=>Promise.resolve(e))))))(e, t[n])))) : Promise.resolve(e))(e, m).then((e=>{
                const t = jc(e, h);
                n(t, f)
            }
            ))
        }
        ))
    }
      , Sp = e=>qt(e, "[rtf-data-image]")
      , Cp = e=>{
        const t = e.translations
          , n = Tt({
            insert: Ct(["elements", "correlated"]),
            incomplete: Ct(["elements", "correlated", "message"])
        });
        return {
            events: n.registry,
            processRtf: (e,r,o,s)=>{
                const a = (e=>{
                    const t = e.replace(/\r/g, "").replace(/\n/g, "");
                    return gp(t)
                }
                )(o)
                  , i = Sp(e);
                wp(i, a, ((t,o)=>{
                    const s = Wt(e)
                      , a = t.concat(r);
                    o ? (console.error("PowerPaste error code: RTF01"),
                    n.trigger.incomplete(s, a, "errors.imageimport.failed")) : n.trigger.insert(s, a)
                }
                ), t, s)
            }
        }
    }
    ;
    const Tp = e=>{
        const t = ()=>Promise.resolve(e);
        return Nc.cata(e.asset, ((n,r,o)=>/(tiff|pdf)$/.test(r.getType()) ? (e=>((e,t,n)=>e.toAdjustedBlob(t, n))(e, "image/png").then(_c).then(k.some).catch((e=>(console.warn(e),
        k.none()))))(r).then((t=>t.map((t=>{
            const n = e.image;
            return URL.revokeObjectURL(o),
            Mc(t, n),
            Rc(t, n)
        }
        )).getOr(e))) : t()), t)
    }
    ;
    var Ip = (e,t)=>{
        const n = (e,n)=>Promise.all(A(e, Tp)).then((e=>({
            response: n(e),
            bundle: t.bundle
        })));
        return Pr(t.response, Wr, ((e,t)=>n(t, (t=>Mr(e, t)))), (()=>Promise.resolve(t)), ((e,t,r)=>n(t, (t=>(console.error("PowerPaste error code:  IMG01"),
        Fr(e, t, r))))))
    }
    ;
    const Ap = (e,t)=>e.isSupported ? t.getWordData() : k.none()
      , Op = e=>e.getNative()
      , Ep = e=>e.getImage()
      , Lp = e=>e.getHtml()
      , Np = e=>e.getText()
      , _p = e=>e.getOnlyText()
      , Dp = e=>e.getGoogleDocsData()
      , Pp = e=>e.getVoid()
      , Rp = (e,t,n,r)=>({
        label: e,
        getAvailable: t,
        steps: n,
        capture: m(r)
    })
      , Mp = (e,t,n,r)=>({
        label: e,
        getAvailable: t,
        steps: n,
        capture: m(r)
    })
      , jp = (e,t,n,r)=>{
        return Rp(Ac.native, Lp, [(o = t.intraFlag,
        (e,t)=>{
            const n = mc(e).getOrDie("Wrong input type for HTML handler")
              , r = o.findClipboardTags(Wt(n.container));
            r.each((e=>{
                O(e, fn)
            }
            ));
            const s = r.isSome();
            return {
                response: t.response,
                bundle: zr({
                    isInternal: s
                })
            }
        }
        ), du(e, t), ep(n, r, t), Vc(t), Ip], !0);
        var o
    }
      , Fp = (e,t,n)=>{
        return Rp(Ac.msoffice, g(Ap, e), [op({
            isWord: !0
        }), uu(t, n), np(e, n), (r = n,
        (e,t)=>new Promise(((n,o)=>{
            const s = Cp(r)
              , a = e=>n({
                response: e,
                bundle: zr({})
            });
            s.events.insert.bind((e=>{
                a(Mr(e.elements, e.correlated))
            }
            )),
            s.events.incomplete.bind((e=>{
                console.error("PowerPaste error code: RTF02"),
                a(Fr(e.elements, e.correlated, e.message))
            }
            ));
            const i = fc(e).getOrDie("Word input required for rtf data")
              , l = e=>{
                const n = ()=>Promise.resolve(t)
                  , o = (t,n)=>{
                    const o = Pe.fromTag("div");
                    return mn(o, t),
                    e.fold((()=>{
                        const e = Sp(o);
                        return e.length > 0 ? (e=>{
                            O(e, fn);
                            const t = Wt(o);
                            return console.error("PowerPaste error code: RTF03"),
                            a(Fr(t, n, "errors.imageimport.failed"))
                        }
                        )(e) : (()=>{
                            const e = Wt(o);
                            return a(Mr(e, n))
                        }
                        )()
                    }
                    ), (e=>{
                        s.processRtf(o, n, e, r)
                    }
                    ))
                }
                ;
                return Pr(t.response, n, o, n, o)
            }
            ;
            ((e,t)=>{
                const n = Re(t);
                if (n.length !== Yi.length)
                    throw new Error("Partial match");
                B(n, (n=>Pn(e.discriminator === n, t[n]))).getOrDie("Must find branch for constructor: " + e.discriminator)(e.data)
            }
            )(i.rtf, {
                disabled: ()=>{
                    l(k.none())
                }
                ,
                fromClipboard: e=>{
                    l(!0 === r.allowLocalImages ? k.some(e.rtf) : k.none())
                }
            })
        }
        ))), Ip], !0);
        var r
    }
      , Up = (e,t,n,r)=>Rp(Ac.googledocs, Dp, [op({
        isGoogleDocs: !0
    }), uu(e, t), sp, ep(n, r, t), ru, Vc(t), Ip], !0)
      , Bp = e=>Rp(Ac.image, Ep, [!1 === e.allowLocalImages ? (e,t)=>Wr("errors.local.images.disallowed") : (e,t)=>(e=>{
        const t = L(e, (e=>"file" === e.kind && /image/.test(e.type)))
          , n = N(t, ((e,t)=>{
            const n = t.getAsFile();
            return (e=>null !== e)(n) ? e.concat(n) : e
        }
        ), []);
        return Pc(n).then((e=>{
            const t = (e=>{
                const t = []
                  , n = [];
                return O(e, (e=>Nc.cata(e, ((r,o,s)=>{
                    const a = Pe.fromTag("img");
                    kn(a, "src", s),
                    t.push(a),
                    n.push(Rc(e, a))
                }
                ), ((e,t,n)=>{
                    console.error("Internal error: Paste operation produced an image URL instead of a Data URI: ", t)
                }
                )))),
                Mr(t, n)
            }
            )(e);
            return {
                response: t,
                bundle: zr({})
            }
        }
        ))
    }
    )(pc(e).getOrDie("Must have image data for images handler").images), Ip], !0)
      , zp = e=>{
        const t = [Zm(e.tabSpaces)];
        return e.autoLinkUrls && t.push(Qm({
            defaultProtocol: e.defaultProtocol,
            autoLinkUrls: !0
        })),
        Rp(Ac.plaintext, _p, t, !0)
    }
      , Hp = (e,t,n)=>{
        const r = [Zm(e)];
        return n && r.push(Qm({
            defaultProtocol: t,
            autoLinkUrls: !0
        })),
        Rp(Ac.text, Np, r, !0)
    }
    ;
    var Wp = Object.freeze({
        __proto__: null,
        loadScript: (e,t)=>tinymce.Resource.load(e, t)
    });
    const $p = {
        "cement.dialog.paste.title": "Paste Formatting Options",
        "cement.dialog.paste.instructions": "Choose to keep or remove formatting in the pasted content.",
        "cement.dialog.paste.merge": "Keep formatting",
        "cement.dialog.paste.clean": "Remove formatting",
        "error.code.images.not.found": "The images service was not found: (",
        "error.imageupload": "Image failed to upload: (",
        "error.full.stop": ").",
        "errors.local.images.disallowed": "Local image paste has been disabled. Local images have been removed from pasted content.",
        "errors.imageimport.failed": "Some images failed to import.",
        "errors.imageimport.unsupported": "Unsupported image type.",
        "errors.imageimport.invalid": "Image is invalid."
    }
      , Vp = e=>tinymce.translate((e=>$p[e])(e))
      , Gp = e=>{
        const t = document.createElement("div");
        return t.appendChild(e.cloneNode(!0)),
        t.innerHTML
    }
      , qp = "x-tinymce/html"
      , Kp = m(qp)
      , Jp = "\x3c!-- " + qp + " --\x3e"
      , Yp = e=>-1 !== e.indexOf(Jp)
      , Xp = e=>/^https?:\/\/[\w\-\/+=.,!;:&%@^~(){}?#]+$/i.test(e)
      , Zp = e=>{
        const t = /^<a href="([^"]+)">([^<]+)<\/a>$/.exec(e);
        return k.from(t).bind((t=>{
            const n = {
                url: t[1],
                html: e
            };
            return Pn(t[1] === t[2], n)
        }
        ))
    }
      , Qp = (e,t,n)=>(e=>"extra"in e.undoManager)(e) ? (e.undoManager.extra((()=>{
        nf(e, t)
    }
    ), n),
    k.some(!0)) : k.none()
      , ef = (e,t)=>Zp(t).bind((t=>!1 === e.selection.isCollapsed() && Xp(t.url) ? ((e,t)=>Qp(e, t.html, (()=>{
        e.execCommand("mceInsertLink", !1, t.url)
    }
    )))(e, t) : k.none()))
      , tf = (e,t)=>Zp(t).bind((t=>((e,t)=>{
        const n = e.toLowerCase();
        return Xp(n) && I(t, (e=>V(n, `.${e.toLowerCase()}`)))
    }
    )(t.url, fe(e)) ? ((e,t)=>Qp(e, t.html, (()=>{
        e.insertContent('<img src="' + t.url + '">')
    }
    )))(e, t) : k.none()))
      , nf = (e,t)=>(e.insertContent(t, {
        merge: ee(e),
        paste: !0
    }),
    k.some(!0))
      , rf = (e,t)=>e.hasEventListeners(t)
      , of = (e,t,n,r,o)=>{
        const s = (e=>e.replace(Jp, ""))(t)
          , a = ((e,t,n,r,o)=>rf(e, "PastePreProcess") ? ((e,t,n,r,o)=>{
            const s = ((e,t)=>e.dispatch("PastePreProcess", t))(e, {
                internal: n,
                content: t,
                source: r,
                mode: o
            })
              , a = s.isDefaultPrevented();
            return a ? {
                cancelled: a
            } : {
                cancelled: a,
                content: s.content
            }
        }
        )(e, t, n, r, o) : {
            cancelled: !1,
            content: t
        })(e, s, n, r, o);
        return a.cancelled ? a : ((e,t,n,r,o)=>rf(e, "PastePostProcess") ? ((e,t,n,r,o)=>{
            const s = e.dom.add(e.getBody(), "div", {
                style: "display:none"
            }, t)
              , a = ((e,t)=>e.dispatch("PastePostProcess", t))(e, {
                internal: n,
                node: s,
                source: r,
                mode: o
            })
              , i = a.isDefaultPrevented();
            if (i)
                return {
                    cancelled: i
                };
            const l = a.node.innerHTML;
            return e.dom.remove(s),
            {
                cancelled: i,
                content: l
            }
        }
        )(e, t, n, r, o) : {
            content: t,
            cancelled: !1
        })(e, a.content, n, r, o)
    }
      , sf = (e,t,n,r,o,s)=>{
        const a = ve()
          , i = (null == r ? void 0 : r.jsUrl) ? r.jsUrl : ("/js",
        n.replace(/\/$/, "") + "/" + "/js".replace(/^\//, ""));
        const c = (e,t)=>(e.undoManager.transact((()=>{
            var n;
            nf(e, t),
            n = e.getBody(),
            O(A(n.getElementsByTagName("*"), Pe.fromDom), (e=>{
                Tn(e, "data-mce-style") && !Tn(e, "style") && Cn(e, "data-mce-style").each((t=>kn(e, "style", t)))
            }
            ))
        }
        )),
        k.some(!0))
          , u = ()=>{
            a.on((t=>e.selection.moveToBookmark(t))),
            a.clear()
        }
          , h = te(e)
          , m = {
            baseUrl: i,
            cacheSuffix: re(e),
            officeStyles: ce(e),
            htmlStyles: de(e),
            gdocsStyles: ue(e),
            translations: Vp,
            allowLocalImages: le(e),
            pasteBinAttrs: {
                "data-mce-bogus": "all",
                class: "mce-pastebin"
            },
            intraFlag: {
                isMarked: Yp,
                findClipboardTags: e=>{
                    const t = L(e, (e=>Te(e) && W(_e(e), Kp())));
                    return t.length ? k.some(t) : k.none()
                }
            },
            keepSrc: ie(e),
            cleanFilteredInlineElements: he(e),
            indentUseMargin: se(e),
            sanitizer: o,
            tabSpaces: h,
            defaultProtocol: me(e),
            autoLinkUrls: pe(e)
        }
          , p = ((e,t,n,r,o=_r)=>{
            const s = {
                ...{
                    ...mr,
                    sanitizer: rc(r.intraFlag.isMarked)
                },
                ...Be(r, l)
            }
              , a = St(o, s.baseUrl, s.cacheSuffix)
              , i = dr(s.pasteBinAttrs)
              , c = [zp(s), Fp(a, t, s), Up(t, s, n, e), jp(t, s, n, e), Bp(s), Hp(s.tabSpaces, s.defaultProtocol, s.autoLinkUrls)]
              , u = ((e,t,n,r,o)=>Mp(Ac.fallback, Op, [ap(r, n, o, t.intraFlag), du(e, t), tp(o, t.intraFlag, t), Vc(t), Ip], !1))(t, s, n, i, e);
            return Ec(c, u, s.sanitizer)
        }
        )(Pe.fromDom(e.getBody()), (e=>({
            createDialog: ()=>{
                let t = "";
                const n = ve()
                  , r = (()=>{
                    const e = ge([{
                        text: "Close",
                        name: "close",
                        type: "custom",
                        primary: !0
                    }])
                      , t = ge({});
                    return {
                        setButtons: n=>{
                            const r = {}
                              , o = A(n, (e=>{
                                const t = e.text;
                                return r[t.toLowerCase()] = e.click,
                                {
                                    text: t,
                                    name: t.toLowerCase(),
                                    type: "custom"
                                }
                            }
                            ));
                            t.set(r),
                            e.set(o)
                        }
                        ,
                        getButtons: e.get,
                        getAction: e=>{
                            const n = t.get();
                            return He(n, e) ? k.some(n[e]) : k.none()
                        }
                    }
                }
                )()
                  , o = Tt({
                    close: Ct([])
                })
                  , s = ()=>{
                    o.trigger.close()
                }
                ;
                return {
                    events: o.registry,
                    setTitle: e=>t = e,
                    setContent: e=>n.set(e),
                    setButtons: e=>{
                        r.setButtons(e)
                    }
                    ,
                    show: ()=>{
                        n.on((n=>{
                            const o = Gp(n.dom)
                              , a = {
                                title: t,
                                body: {
                                    type: "panel",
                                    items: [{
                                        type: "htmlpanel",
                                        html: o
                                    }]
                                },
                                initialData: {},
                                buttons: r.getButtons(),
                                onCancel: s,
                                onAction: (e,t)=>{
                                    r.getAction(t.name).each(y),
                                    e.close()
                                }
                            };
                            e.windowManager.open(a)
                        }
                        ))
                    }
                    ,
                    hide: d,
                    destroy: ()=>{
                        n.clear()
                    }
                    ,
                    reflow: d
                }
            }
        }))(e).createDialog, d, m, Wp)
          , f = ((e=oc,t=mr.tabSpaces,n=mr.autoLinkUrls)=>Ec([Hp(t, mr.defaultProtocol, n)], Mp(Ac.discard, Pp, [rp], !0), e))(o, h, pe(e));
        return O([p, f], (t=>{
            t.events.cancel.bind((()=>{
                u()
            }
            )),
            t.events.error.bind((t=>{
                u(),
                e.notificationManager ? e.notificationManager.open({
                    text: Vp(t.message),
                    type: "error"
                }) : ((e,t)=>{
                    const n = {
                        title: "Error",
                        body: {
                            type: "panel",
                            items: [{
                                type: "htmlpanel",
                                html: t
                            }]
                        },
                        initialData: {},
                        buttons: [{
                            text: "OK",
                            type: "cancel",
                            name: "ok",
                            primary: !0
                        }]
                    };
                    e.windowManager.open(n)
                }
                )(e, Vp(t.message))
            }
            )),
            t.events.insert.bind((t=>{
                const n = A(t.elements, (e=>Gp(e.dom))).join("");
                e.focus(),
                s.importImages(t.assets).get((()=>{
                    u();
                    const r = of(e, n, t.isInternal, t.source, t.mode);
                    r.cancelled || (((e,t)=>{
                        ((e,t,n)=>{
                            B(n, (n=>n(e, t)))
                        }
                        )(e, t, (ne(e) ? [ef, tf] : []).concat([c]))
                    }
                    )(e, r.content),
                    oe(e) && s.uploadImages(t.assets))
                }
                ))
            }
            )),
            t.events.block.bind((t=>{
                e.setProgressState(t.state)
            }
            ))
        }
        )),
        {
            pasteHtml: e=>p.pasteCustom(((e,t=oc)=>({
                getWordData: ()=>k.from(e).filter(yc).map((e=>uc({
                    html: e,
                    rtf: Xi()
                }))),
                getGoogleDocsData: ()=>k.from(e).filter(bc).map((e=>t.sanitizeHtml(e, "googledocs"))).map(Tc),
                getImage: k.none,
                getHtml: ()=>k.some(Tc(t.sanitizeHtml(e))),
                getText: k.none,
                getNative: v("There is no native event"),
                getOnlyText: k.none,
                getVoid: v("There is no paste event")
            }))(e, o)),
            pasteText: e=>f.pasteCustom(((e,t=oc)=>({
                getWordData: k.none,
                getGoogleDocsData: k.none,
                getImage: k.none,
                getHtml: k.none,
                getText: ()=>k.some(dc({
                    text: t.sanitizeText(e)
                })),
                getNative: v("There is no native event"),
                getOnlyText: k.none,
                getVoid: v("There is no paste event")
            }))(e, o)),
            pasteEvent: n=>{
                (e=>{
                    return (t = e,
                    k.from(t.clipboardData).bind((e=>k.from(e.getData("text/html"))))).bind((e=>(e=>W(e, "<google-sheets-html-origin"))(e) ? k.some("googlesheets") : (e=>W(e, " data-ccp-props=") && W(e, " paraid=") && /font-family:.+?_MSFontService(&quot;)?[,;]/.test(e))(e) ? k.some("mswordonline") : (e=>W(e, "<meta name=ProgId content=Excel.Sheet>") && !W(e, '="urn:schemas-microsoft-com:office:'))(e) ? k.some("msexcelonline") : k.none()));
                    var t
                }
                )(n).each((t=>{
                    ((e,t)=>{
                        e.dispatch("PowerPasteTempStats", {
                            source: t
                        })
                    }
                    )(e, t)
                }
                )),
                a.isSet() || a.set(e.selection.getBookmark(1)),
                (t.isText() ? f : p).paste(n),
                t.reset(),
                n.stopImmediatePropagation()
            }
        }
    }
      , af = (e,t)=>{
        const n = tinymce.html.DomParser({}, e.schema).parse(t, {
            forced_root_block: !1,
            isRootContent: !0
        });
        return tinymce.html.Serializer({
            validate: !0
        }, e.schema).serialize(n)
    }
      , lf = (e,t)=>{
        e.dom.bind(t, "drop dragstart dragend dragover dragenter dragleave dragdrop draggesture", (e=>{
            e.preventDefault(),
            e.stopImmediatePropagation()
        }
        ))
    }
      , cf = e=>{
        var t, n;
        return I(null !== (n = null === (t = e.dataTransfer) || void 0 === t ? void 0 : t.items) && void 0 !== n ? n : [], (e=>$(e.type, "image/")))
    }
      , uf = (e,t,n,r)=>{
        const o = tinymce.dom.RangeUtils;
        let s;
        const a = t=>{
            var n, r;
            const s = o.getCaretRangeFromPoint(null !== (n = t.clientX) && void 0 !== n ? n : 0, null !== (r = t.clientY) && void 0 !== r ? r : 0, e.getDoc());
            e.focus(),
            l(s) && e.selection.setRng(s)
        }
        ;
        e.on("dragstart dragend", (e=>{
            s = "dragstart" === e.type
        }
        )),
        e.on("dragover dragend dragleave", (e=>{
            s || cf(e) || (e.preventDefault(),
            a(e))
        }
        ));
        const i = (e,t)=>t in e && e[t].length > 0;
        e.on("drop", (t=>{
            if (!s && !cf(t)) {
                a(t);
                const o = (t=>{
                    var n, r, o;
                    const s = null !== (o = null !== (n = t.target.files) && void 0 !== n ? n : null === (r = t.dataTransfer) || void 0 === r ? void 0 : r.files) && void 0 !== o ? o : []
                      , a = fe(e);
                    return L(s, (e=>$(e.type, "image/") && I(a, (t=>(e=>{
                        const t = e.toLowerCase()
                          , n = {
                            jpg: "jpeg",
                            jpe: "jpeg",
                            jfi: "jpeg",
                            jif: "jpeg",
                            jfif: "jpeg",
                            pjpeg: "jpeg",
                            pjp: "jpeg",
                            svg: "svg+xml"
                        };
                        return He(n, t) ? "image/" + n[t] : "image/" + t
                    }
                    )(t) === e.type))))
                }
                )(t);
                if (o.length > 0)
                    return (t=>{
                        Pc(t).then((t=>{
                            const n = (e=>A(e, (e=>{
                                const t = Pe.fromTag("img")
                                  , n = Nc.cata(e, r.getLocalURL, ((e,t,n)=>t));
                                return kn(t, "src", n),
                                t.dom.outerHTML
                            }
                            )).join(""))(t)
                              , o = of(e, n, !1, "imagedrop", "auto");
                            o.cancelled || (e.insertContent(o.content, {
                                merge: ee(e)
                            }),
                            oe(e) && r.uploadImages(t))
                        }
                        ))
                    }
                    )(o),
                    void t.preventDefault();
                const s = (e=>{
                    const t = {};
                    if (e && e.types)
                        for (let n = 0; n < e.types.length; n++) {
                            const r = e.types[n];
                            t[r] = e.getData(r)
                        }
                    return t
                }
                )(t.dataTransfer);
                i(s, "text/html") ? (n.pasteHtml(s["text/html"]),
                t.preventDefault()) : i(s, "text/plain") && !(e=>{
                    const t = e["text/plain"];
                    return !!t && 0 === t.indexOf("file://")
                }
                )(s) && (n.pasteText(s["text/plain"]),
                t.preventDefault())
            }
        }
        ))
    }
    ;
    tinymce.PluginManager.requireLangPack("powerpaste", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("powerpaste", (e=>(t,r)=>{
        if (((e,t)=>!!e && -1 === ((e,t)=>{
            const n = J(e.major, t.major);
            if (0 !== n)
                return n;
            const r = J(e.minor, t.minor);
            if (0 !== r)
                return r;
            const o = J(e.patch, t.patch);
            return 0 !== o ? o : 0
        }
        )((e=>X((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), X(t)))(tinymce, "6.0.0"))
            return void console.error('The "powerpaste" plugin requires at least version 6.0.0 of TinyMCE.');
        (e=>{
            const t = e.options.register
              , r = e=>{
                const t = c(e) || (e=>n(e) && T(["clean", "merge", "prompt"], e))(e);
                return t ? {
                    value: e,
                    valid: t
                } : {
                    valid: !1,
                    message: "Must be prompt, clean or merge."
                }
            }
            ;
            t("powerpaste_block_drop", {
                processor: "boolean",
                default: !1
            }),
            t("powerpaste_keep_unsupported_src", {
                processor: "boolean",
                default: !1
            }),
            t("powerpaste_allow_local_images", {
                processor: "boolean",
                default: !0
            }),
            t("powerpaste_word_import", {
                processor: r,
                default: "prompt"
            }),
            t("powerpaste_googledocs_import", {
                processor: r,
                default: "prompt"
            }),
            t("powerpaste_html_import", {
                processor: r,
                default: "clean"
            }),
            t("powerpaste_clean_filtered_inline_elements", {
                processor: "string[]",
                default: []
            }),
            e.options.isRegistered("link_default_protocol") || t("link_default_protocol", {
                processor: "string",
                default: "https"
            }),
            t("powerpaste_autolink_urls", {
                processor: "boolean",
                default: !0
            })
        }
        )(t),
        (e=>{
            const t = e.options.set;
            t("paste_block_drop", !1),
            t("paste_remove_styles_if_webkit", !1)
        }
        )(t);
        const o = (e=>{
            const t = ge(Q(e))
              , n = ge(!1);
            return e.on("keydown", (e=>{
                (e=>tinymce.util.VK.metaKeyPressed(e) && 86 === e.keyCode && e.shiftKey)(e) && n.set(!0)
            }
            )),
            e.on("PastePlainTextToggle", (e=>{
                t.set(e.state)
            }
            )),
            {
                reset: ()=>{
                    n.set(!1)
                }
                ,
                isText: ()=>n.get() || t.get()
            }
        }
        )(t)
          , s = (e=>{
            const t = (e,t)=>m(e + "." + (e=>{
                const t = e.toLowerCase()
                  , n = {
                    "image/jpeg": "jpg",
                    "image/jpg": "jpg",
                    "image/gif": "gif",
                    "image/png": "png",
                    "image/apng": "apng",
                    "image/avif": "avif",
                    "image/svg+xml": "svg",
                    "image/webp": "webp",
                    "image/bmp": "bmp",
                    "image/tiff": "tiff"
                };
                return He(n, t) ? n[t] : "dat"
            }
            )(t))
              , n = (n,r,o,s)=>br((a=>{
                mi(r).then((r=>{
                    e.editorUpload.blobCache.add({
                        id: m(n),
                        name: m(n),
                        filename: t(n, r.type),
                        blob: m(r),
                        base64: m(o.split(",")[1]),
                        blobUri: m(s),
                        uri: m(void 0)
                    }),
                    a(r)
                }
                ))
            }
            ));
            return {
                importImages: e=>{
                    const t = R(e, (e=>Nc.cata(e, ((e,t,r)=>{
                        const o = pi(t);
                        return [n(e, t, o, r)]
                    }
                    ), m([]))));
                    return xr(t)
                }
                ,
                uploadImages: ()=>{
                    e.uploadImages()
                }
                ,
                getLocalURL: (e,t,n)=>pi(t)
            }
        }
        )(t)
          , a = (e=>{
            const t = rc(Yp)
              , n = (e=>({
                sanitizeHtml: g(af, e),
                sanitizeText: p
            }))(e);
            return {
                sanitizeText: t.sanitizeText,
                sanitizeHtml: (e,r)=>(Yp(e) ? n : t).sanitizeHtml(e, r)
            }
        }
        )(t);
        t.on("PreInit", (()=>{
            if (t.removed)
                return;
            const i = sf(t, o, r, e, a, s);
            ((e,t)=>{
                e.addCommand("mceInsertClipboardContent", ((e,r)=>{
                    n(r.html) ? t.pasteHtml(r.html) : n(r.text) && t.pasteText(r.text)
                }
                ))
            }
            )(t, i),
            ((e,t)=>{
                e.on("paste", (e=>{
                    e.isDefaultPrevented() || (e=>{
                        var t, n;
                        const r = null !== (n = null === (t = e.clipboardData) || void 0 === t ? void 0 : t.items) && void 0 !== n ? n : []
                          , o = L(r, (e=>$(e.type, "image/")));
                        return o.length > 0 && o.length === r.length
                    }
                    )(e) || t.pasteEvent(e)
                }
                ))
            }
            )(t, i),
            ae(t) ? (e=>{
                lf(e, e.getBody()),
                e.inline || lf(e, e.getDoc())
            }
            )(t) : uf(t, 0, i, s)
        }
        ))
    }
    )(undefined))
}();
