/*!
 * Tiny FormatPainter plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 7.3.0-86
 */

!function() {
    "use strict";
    const e = e=>{
        let t = e;
        return {
            get: ()=>t,
            set: e=>{
                t = e
            }
        }
    }
      , t = e=>parseInt(e, 10)
      , r = (e,t)=>{
        const r = e - t;
        return 0 === r ? 0 : r > 0 ? 1 : -1
    }
      , o = (e,t,r)=>({
        major: e,
        minor: t,
        patch: r
    })
      , n = e=>{
        const r = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
        return r ? o(t(r[1]), t(r[2]), t(r[3])) : o(0, 0, 0)
    }
      , s = e=>t=>(e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (r = o = e,
        (n = String).prototype.isPrototypeOf(r) || (null === (s = o.constructor) || void 0 === s ? void 0 : s.name) === n.name) ? "string" : t;
        var r, o, n, s
    }
    )(t) === e
      , i = e=>t=>typeof t === e
      , a = s("string")
      , c = s("array")
      , l = i("boolean")
      , m = (void 0,
    e=>undefined === e);
    const u = e=>!(e=>null == e)(e)
      , d = i("function")
      , g = i("number")
      , h = e=>()=>e
      , f = e=>e
      , p = h(!1)
      , v = h(!0);
    class b {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new b(!0,e)
        }
        static none() {
            return b.singletonNone
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
            return this.tag ? b.some(e(this.value)) : b.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : b.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : b.none()
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
            return u(e) ? b.some(e) : b.none()
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
    b.singletonNone = new b(!1);
    const y = Array.prototype.indexOf
      , S = Array.prototype.push
      , w = (e,t)=>((e,t)=>y.call(e, t))(e, t) > -1
      , x = (e,t)=>{
        for (let r = 0, o = e.length; r < o; r++)
            if (t(e[r], r))
                return !0;
        return !1
    }
      , k = (e,t)=>{
        const r = e.length
          , o = new Array(r);
        for (let n = 0; n < r; n++) {
            const r = e[n];
            o[n] = t(r, n)
        }
        return o
    }
      , A = (e,t)=>{
        const r = [];
        for (let o = 0, n = e.length; o < n; o++) {
            const n = e[o];
            t(n, o) && r.push(n)
        }
        return r
    }
      , O = (e,t)=>((e,t,r)=>{
        for (let o = 0, n = e.length; o < n; o++) {
            const n = e[o];
            if (t(n, o))
                return b.some(n);
            if (r(n, o))
                break
        }
        return b.none()
    }
    )(e, t, p)
      , C = (e,t)=>(e=>{
        const t = [];
        for (let r = 0, o = e.length; r < o; ++r) {
            if (!c(e[r]))
                throw new Error("Arr.flatten item " + r + " was not an array, input: " + e);
            S.apply(t, e[r])
        }
        return t
    }
    )(k(e, t))
      , L = ()=>T(0, 0)
      , T = (e,t)=>({
        major: e,
        minor: t
    })
      , R = {
        nu: T,
        detect: (e,t)=>{
            const r = String(t).toLowerCase();
            return 0 === e.length ? L() : ((e,t)=>{
                const r = ((e,t)=>{
                    for (let r = 0; r < e.length; r++) {
                        const o = e[r];
                        if (o.test(t))
                            return o
                    }
                }
                )(e, t);
                if (!r)
                    return {
                        major: 0,
                        minor: 0
                    };
                const o = e=>Number(t.replace(r, "$" + e));
                return T(o(1), o(2))
            }
            )(e, r)
        }
        ,
        unknown: L
    }
      , _ = (e,t)=>{
        const r = String(t).toLowerCase();
        return O(e, (e=>e.search(r)))
    }
      , P = (e,t,r=0,o)=>{
        const n = e.indexOf(t, r);
        return -1 !== n && (!!m(o) || n + t.length <= o)
    }
      , F = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/
      , E = e=>t=>P(t, e)
      , B = [{
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: e=>P(e, "edge/") && P(e, "chrome") && P(e, "safari") && P(e, "applewebkit")
    }, {
        name: "Chromium",
        brand: "Chromium",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, F],
        search: e=>P(e, "chrome") && !P(e, "chromeframe")
    }, {
        name: "IE",
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: e=>P(e, "msie") || P(e, "trident")
    }, {
        name: "Opera",
        versionRegexes: [F, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: E("opera")
    }, {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: E("firefox")
    }, {
        name: "Safari",
        versionRegexes: [F, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: e=>(P(e, "safari") || P(e, "mobile/")) && P(e, "applewebkit")
    }]
      , D = [{
        name: "Windows",
        search: E("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "iOS",
        search: e=>P(e, "iphone") || P(e, "ipad"),
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
    }, {
        name: "Android",
        search: E("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "macOS",
        search: E("mac os x"),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
    }, {
        name: "Linux",
        search: E("linux"),
        versionRegexes: []
    }, {
        name: "Solaris",
        search: E("sunos"),
        versionRegexes: []
    }, {
        name: "FreeBSD",
        search: E("freebsd"),
        versionRegexes: []
    }, {
        name: "ChromeOS",
        search: E("cros"),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
    }]
      , N = {
        browsers: h(B),
        oses: h(D)
    }
      , I = "Edge"
      , j = "Chromium"
      , M = "Opera"
      , V = "Firefox"
      , U = "Safari"
      , W = e=>{
        const t = e.current
          , r = e.version
          , o = e=>()=>t === e;
        return {
            current: t,
            version: r,
            isEdge: o(I),
            isChromium: o(j),
            isIE: o("IE"),
            isOpera: o(M),
            isFirefox: o(V),
            isSafari: o(U)
        }
    }
      , $ = ()=>W({
        current: void 0,
        version: R.unknown()
    })
      , q = W
      , z = (h(I),
    h(j),
    h("IE"),
    h(M),
    h(V),
    h(U),
    "Windows")
      , K = "Android"
      , Z = "Linux"
      , G = "macOS"
      , H = "Solaris"
      , J = "FreeBSD"
      , Q = "ChromeOS"
      , X = e=>{
        const t = e.current
          , r = e.version
          , o = e=>()=>t === e;
        return {
            current: t,
            version: r,
            isWindows: o(z),
            isiOS: o("iOS"),
            isAndroid: o(K),
            isMacOS: o(G),
            isLinux: o(Z),
            isSolaris: o(H),
            isFreeBSD: o(J),
            isChromeOS: o(Q)
        }
    }
      , Y = ()=>X({
        current: void 0,
        version: R.unknown()
    })
      , ee = X
      , te = (h(z),
    h("iOS"),
    h(K),
    h(Z),
    h(G),
    h(H),
    h(J),
    h(Q),
    (e,t,r)=>{
        const o = N.browsers()
          , n = N.oses()
          , s = t.bind((e=>((e,t)=>((e,t)=>{
            for (let r = 0; r < e.length; r++) {
                const o = t(e[r]);
                if (o.isSome())
                    return o
            }
            return b.none()
        }
        )(t.brands, (t=>{
            const r = t.brand.toLowerCase();
            return O(e, (e=>{
                var t;
                return r === (null === (t = e.brand) || void 0 === t ? void 0 : t.toLowerCase())
            }
            )).map((e=>({
                current: e.name,
                version: R.nu(parseInt(t.version, 10), 0)
            })))
        }
        )))(o, e))).orThunk((()=>((e,t)=>_(e, t).map((e=>{
            const r = R.detect(e.versionRegexes, t);
            return {
                current: e.name,
                version: r
            }
        }
        )))(o, e))).fold($, q)
          , i = ((e,t)=>_(e, t).map((e=>{
            const r = R.detect(e.versionRegexes, t);
            return {
                current: e.name,
                version: r
            }
        }
        )))(n, e).fold(Y, ee)
          , a = ((e,t,r,o)=>{
            const n = e.isiOS() && !0 === /ipad/i.test(r)
              , s = e.isiOS() && !n
              , i = e.isiOS() || e.isAndroid()
              , a = i || o("(pointer:coarse)")
              , c = n || !s && i && o("(min-device-width:768px)")
              , l = s || i && !c
              , m = t.isSafari() && e.isiOS() && !1 === /safari/i.test(r)
              , u = !l && !c && !m;
            return {
                isiPad: h(n),
                isiPhone: h(s),
                isTablet: h(c),
                isPhone: h(l),
                isTouch: h(a),
                isAndroid: e.isAndroid,
                isiOS: e.isiOS,
                isWebView: h(m),
                isDesktop: h(u)
            }
        }
        )(i, s, e, r);
        return {
            browser: s,
            os: i,
            deviceType: a
        }
    }
    )
      , re = e=>window.matchMedia(e).matches;
    let oe = (e=>{
        let t, r = !1;
        return (...o)=>(r || (r = !0,
        t = e.apply(null, o)),
        t)
    }
    )((()=>te(window.navigator.userAgent, b.from(window.navigator.userAgentData), re)));
    const ne = ()=>oe()
      , se = Object.keys
      , ie = Object.hasOwnProperty
      , ae = (e,t)=>{
        const r = se(e);
        for (let o = 0, n = r.length; o < n; o++) {
            const n = r[o];
            t(e[n], n)
        }
    }
      , ce = (e,t)=>{
        const r = {};
        return ae(e, ((e,o)=>{
            const n = t(e, o);
            r[n.k] = n.v
        }
        )),
        r
    }
      , le = e=>(t,r)=>{
        e[r] = t
    }
      , me = e=>((e,t)=>{
        const r = [];
        return ae(e, ((e,o)=>{
            r.push(t(e, o))
        }
        )),
        r
    }
    )(e, f)
      , ue = (e,t)=>de(e, t) ? b.from(e[t]) : b.none()
      , de = (e,t)=>ie.call(e, t);
    "undefined" != typeof window ? window : Function("return this;")();
    const ge = e=>t=>(e=>e.dom.nodeType)(t) === e
      , he = ge(1)
      , fe = ge(3)
      , pe = ge(11)
      , ve = (e,t,r)=>{
        ((e,t,r)=>{
            if (!(a(r) || l(r) || g(r)))
                throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", r, ":: Element ", e),
                new Error("Attribute value was not simple");
            e.setAttribute(t, r + "")
        }
        )(e.dom, t, r)
    }
      , be = (e,t)=>{
        const r = e.dom.getAttribute(t);
        return null === r ? void 0 : r
    }
      , ye = (e,t)=>{
        e.dom.removeAttribute(t)
    }
      , Se = (e,t)=>{
        const r = be(e, t);
        return void 0 === r || "" === r ? [] : r.split(" ")
    }
      , we = e=>void 0 !== e.dom.classList
      , xe = e=>Se(e, "class")
      , ke = (e,t)=>{
        we(e) ? e.dom.classList.remove(t) : ((e,t)=>{
            ((e,t,r)=>{
                const o = A(Se(e, t), (e=>e !== r));
                o.length > 0 ? ve(e, t, o.join(" ")) : ye(e, t)
            }
            )(e, "class", t)
        }
        )(e, t),
        (e=>{
            0 === (we(e) ? e.dom.classList : xe(e)).length && ye(e, "class")
        }
        )(e)
    }
      , Ae = e=>{
        if (null == e)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: e
        }
    }
      , Oe = Ae
      , Ce = (e,t)=>{
        e.dispatch("FormatPainterToggle", {
            state: t
        })
    }
    ;
    var Le, Te, Re, _e;
    !function(e) {
        e.Retrival = "Retrieval",
        e.Application = "Application"
    }(Le || (Le = {})),
    function(e) {
        e.ListSchema = "ListSchema",
        e.SubstitutionSchema = "SubstitionSchema"
    }(Te || (Te = {})),
    function(e) {
        e.InsertUnorderedList = "InsertUnorderedList",
        e.InsertOrderedList = "InsertOrderedList",
        e.InsertDefinitionList = "InsertDefinitionList"
    }(Re || (Re = {})),
    function(e) {
        e.Table = "Table",
        e.Unspecified = "Unspecified"
    }(_e || (_e = {}));
    const Pe = e=>{
        var t, r;
        t = Oe(e.getBody()),
        r = "tox-cursor-format-painter",
        we(t) ? t.dom.classList.add(r) : ((e,t)=>{
            ((e,t,r)=>{
                const o = Se(e, t).concat([r]);
                ve(e, t, o.join(" "))
            }
            )(e, "class", t)
        }
        )(t, r)
    }
      , Fe = (e,t)=>{
        (e=>{
            ke(Oe(e.getBody()), "tox-cursor-format-painter")
        }
        )(e),
        t.set(Le.Retrival),
        Ce(e, !1)
    }
      , Ee = (e,t)=>e.dom === t.dom
      , Be = (e,t)=>{
        const r = e.dom;
        if (1 !== r.nodeType)
            return !1;
        {
            const e = r;
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
      , De = e=>Oe(e.dom.host)
      , Ne = e=>{
        const t = fe(e) ? e.dom.parentNode : e.dom;
        if (null == t || null === t.ownerDocument)
            return !1;
        const r = t.ownerDocument;
        return (e=>{
            const t = (e=>Oe(e.dom.getRootNode()))(e);
            return pe(r = t) && u(r.dom.host) ? b.some(t) : b.none();
            var r
        }
        )(Oe(t)).fold((()=>r.body.contains(t)), (o = Ne,
        n = De,
        e=>o(n(e))));
        var o, n
    }
      , Ie = (e,t,r)=>{
        let o = e.dom;
        const n = d(r) ? r : p;
        for (; o.parentNode; ) {
            o = o.parentNode;
            const e = Oe(o);
            if (t(e))
                return b.some(e);
            if (n(e))
                break
        }
        return b.none()
    }
      , je = (e,t,r)=>((e,t,r,o,n)=>o(r) ? b.some(r) : d(n) && n(r) ? b.none() : t(r, o, n))(0, Ie, e, t, r)
      , Me = {
        formatpainter_checklist: {
            selector: "ul",
            classes: "tox-checklist"
        },
        formatpainter_liststyletype: {
            selector: "ul,ol",
            styles: {
                listStyleType: "%value"
            }
        },
        formatpainter_borderstyle: {
            selector: "td,th",
            styles: {
                borderTopStyle: "%valueTop",
                borderRightStyle: "%valueRight",
                borderBottomStyle: "%valueBottom",
                borderLeftStyle: "%valueLeft"
            },
            remove_similar: !0
        },
        formatpainter_bordercolor: {
            selector: "td,th",
            styles: {
                borderTopColor: "%valueTop",
                borderRightColor: "%valueRight",
                borderBottomColor: "%valueBottom",
                borderLeftColor: "%valueLeft"
            },
            remove_similar: !0
        },
        formatpainter_backgroundcolor: {
            selector: "td,th",
            styles: {
                backgroundColor: "%value"
            },
            remove_similar: !0
        },
        formatpainter_removeformat: [{
            selector: "b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins",
            remove: "all",
            split: !0,
            expand: !1,
            block_expand: !0,
            deep: !0
        }, {
            selector: "span",
            attributes: ["style", "class"],
            remove: "empty",
            split: !0,
            expand: !1,
            deep: !0
        }, {
            selector: "*:not(tr,td,th,table)",
            attributes: ["style", "class"],
            split: !1,
            expand: !1,
            deep: !0
        }],
        formatpainter_legacy_font: {
            inline: "font",
            attributes: {
                size: "%value"
            }
        }
    }
      , Ve = (e,t)=>ue(t, "selector").exists((t=>{
        const r = e.getBody()
          , o = e.selection.getStart()
          , n = e.dom.getParents(o, v, r)
          , s = e.selection.getSelectedBlocks();
        return e.dom.is([...n, ...s], t)
    }
    ))
      , Ue = e=>e.length > 1 && "%" === e.charAt(0)
      , We = (e,t)=>ue(e, t).filter((e=>!c(e)))
      , $e = e=>Be(e, "OL,UL,DL")
      , qe = e=>Be(e, "LI,DT,DD")
      , ze = e=>e.replace(/([A-Z])/g, (e=>`-${e[0].toLowerCase()}`))
      , Ke = (e,t,r)=>{
        const o = e.formatter
          , n = ((e,t)=>x(e.formatter.get(t), (t=>((e,t)=>de(t, "inline") && !Ve(e, t))(e, t))))(e, r.formatName)
          , s = ((e,t,r)=>x(t.get(r), (t=>((e,t)=>de(t, "block") || Ve(e, t))(e, t))))(e, o, r.formatName)
          , i = (a = r.formatName,
        w(["formatpainter_borderstyle", "formatpainter_bordercolor", "formatpainter_backgroundcolor"], a));
        var a;
        (t.table && i || t.inline && n || t.block && s && !i) && o.apply(r.formatName, r.substitutedVariables)
    }
      , Ze = e=>{
        const t = e.selection
          , r = t.getRng()
          , o = Oe(e.getBody())
          , n = (e=>A(e.selection.getSelectedBlocks().map(Oe), qe))(e)
          , s = r.collapsed && n.length
          , i = n.length && !((e,t)=>{
            const r = e=>Ee(e, t);
            return (o = je(Oe(e.getStart()), $e, r),
            n = je(Oe(e.getEnd()), $e, r),
            s = (e,t)=>Ee(e, t),
            o.isSome() && n.isSome() ? b.some(s(o.getOrDie(), n.getOrDie())) : b.none()).getOr(!1);
            var o, n, s
        }
        )(t, o);
        return n.length > 1 || s || i
    }
      , Ge = (e,t)=>{
        const r = e.dom
          , o = window.getComputedStyle(r).getPropertyValue(t);
        return "" !== o || Ne(e) ? o : He(r, t)
    }
      , He = (e,t)=>(e=>void 0 !== e.style && d(e.style.getPropertyValue))(e) ? e.style.getPropertyValue(t) : ""
      , Je = ("formatpainter_ignored_formats",
    e=>e.options.get("formatpainter_ignored_formats"));
    const Qe = (e,t)=>{
        return "class" === t ? (e=>we(e) ? (e=>{
            const t = e.dom.classList
              , r = new Array(t.length);
            for (let e = 0; e < t.length; e++) {
                const o = t.item(e);
                null !== o && (r[e] = o)
            }
            return r
        }
        )(e) : xe(e))(e).filter((e=>!/^(mce-.*)/.test(e))).join(" ") : (r = e,
        o = t,
        b.from(be(r, o))).getOr("");
        var r, o
    }
      , Xe = e=>((e,t)=>{
        const r = {}
          , o = {};
        return ((e,t,r,o)=>{
            ae(e, ((e,n)=>{
                (t(e, n) ? r : o)(e, n)
            }
            ))
        }
        )(e, t, le(r), le(o)),
        {
            t: r,
            f: o
        }
    }
    )(e, (e=>{
        return (t = e).length > 1 && "%" === t.charAt(0);
        var t
    }
    )).t
      , Ye = (e,t)=>(e=>{
        const t = Je(e);
        return se(e.formatter.get()).filter((e=>!w(t, e)))
    }
    )(e).filter((r=>{
        const o = ((e,t)=>x(e.formatter.get(t), (e=>(e=>{
            const t = We(e, "styles").exists((e=>x(me(e), Ue)))
              , r = We(e, "attributes").exists((e=>x(me(e), Ue)));
            return t || r
        }
        )(e))))(e, r);
        return e.formatter.matchNode(t.dom, r, {}, o)
    }
    ))
      , et = (e,t)=>{
        const r = k(e.dom.getParents(t, v), Oe);
        return C(A(r, he), (t=>C(Ye(e, t), (r=>((e,t,r)=>{
            return (o = e.get(t),
            ((e,t)=>0 < e.length ? b.some(e[0]) : b.none())(o)).bind((e=>((e,t)=>{
                const r = We(e, "styles").map((e=>{
                    return r = t,
                    o = Xe(e),
                    ce(o, ((e,t)=>({
                        k: e.slice(1, e.length),
                        v: Ge(r, ze(t))
                    })));
                    var r, o
                }
                ))
                  , o = We(e, "attributes").map((e=>{
                    return r = t,
                    o = Xe(e),
                    ce(o, ((e,t)=>({
                        k: e.slice(1, e.length),
                        v: Qe(r, t)
                    })));
                    var r, o
                }
                ))
                  , n = {
                    ...r.getOr({}),
                    ...o.getOr({})
                };
                return me(n).every((e=>"" !== e)) ? b.some(n) : b.none()
            }
            )(e, r))).map((e=>({
                kind: Te.SubstitutionSchema,
                formatName: t,
                substitutedVariables: e
            })));
            var o
        }
        )(e.formatter, r, t).toArray()))))
    }
      , tt = e=>(e=>O(me(Re), (t=>e.queryCommandState(t))))(e).map((e=>({
        kind: Te.ListSchema,
        command: e
    })))
      , rt = (e,t)=>e.getParent(t, "TABLE") ? _e.Table : _e.Unspecified
      , ot = (t,r,o)=>{
        t.addCommand("mceToggleFormatPainter", (()=>{
            ((t,r)=>{
                r.get() === Le.Application ? Fe(t, r) : ((t,r)=>{
                    const o = ne()
                      , n = e(!1);
                    Pe(t),
                    r.set(Le.Application),
                    Ce(t, !0),
                    t.execCommand("mceRetrieveFormats");
                    const s = ()=>{
                        t.execCommand("mcePaintFormats"),
                        Fe(t, r)
                    }
                      , i = ()=>{
                        r.get() === Le.Application && s(),
                        m()
                    }
                      , a = e=>{
                        r.get() === Le.Application && ("touchcancel" === e.type && o.os.isAndroid() ? t.once("contextmenu", s) : n.get() ? s() : t.once("selectionchange", s)),
                        m()
                    }
                      , c = e=>{
                        27 === e.keyCode && (Fe(t, r),
                        m())
                    }
                      , l = e=>{
                        n.set("touchmove" === e.type)
                    }
                    ;
                    t.on("click", i),
                    t.on("touchstart touchmove", l),
                    t.on("touchend touchcancel", a),
                    t.on("keydown", c);
                    const m = ()=>{
                        t.off("click", i),
                        t.off("touchstart touchmove", l),
                        t.off("touchend touchcancel", a),
                        t.off("keydown", c)
                    }
                }
                )(t, r)
            }
            )(t, r)
        }
        )),
        t.addCommand("mcePaintFormats", (()=>{
            t.selection.isEditable() && t.undoManager.transact((()=>{
                ((e,t)=>{
                    ((e,t)=>{
                        e.formatter.remove("formatpainter_removeformat"),
                        t === _e.Table && ((t,r)=>{
                            for (let r = 0, n = t.length; r < n; r++)
                                o = t[r],
                                e.formatter.remove(o);
                            var o
                        }
                        )(["formatpainter_borderstyle", "formatpainter_bordercolor", "formatpainter_backgroundcolor"]),
                        Ze(e) && e.execCommand("RemoveList")
                    }
                    )(e, t.context);
                    const r = (e=>{
                        const t = e.selection.getStart()
                          , r = e.selection.getRng().collapsed
                          , o = e.dom.select("td[data-mce-selected]").length > 0
                          , n = !!e.dom.getParent(t, "TABLE");
                        return {
                            inline: !0,
                            table: r && n || o,
                            block: r || (s = e.selection,
                            s.getSelectedBlocks().length > 1) || o
                        };
                        var s
                    }
                    )(e);
                    t.schemas.forEach((t=>{
                        switch (t.kind) {
                        case Te.ListSchema:
                            ((e,t,r)=>{
                                r.block && e.execCommand(t.command)
                            }
                            )(e, t, r);
                            break;
                        case Te.SubstitutionSchema:
                            Ke(e, r, t)
                        }
                    }
                    ))
                }
                )(t, o.get())
            }
            ))
        }
        )),
        t.addCommand("mceRetrieveFormats", (()=>{
            o.set((e=>{
                const t = e.dom
                  , r = e.selection.getStart();
                return {
                    schemas: [...tt(e).toArray(), ...et(e, r)],
                    context: rt(t, r)
                }
            }
            )(t))
        }
        ))
    }
    ;
    tinymce.PluginManager.add("formatpainter", (t=>{
        if (((e,t)=>!!e && -1 === ((e,t)=>{
            const o = r(e.major, t.major);
            if (0 !== o)
                return o;
            const n = r(e.minor, t.minor);
            if (0 !== n)
                return n;
            const s = r(e.patch, t.patch);
            return 0 !== s ? s : 0
        }
        )((e=>n((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), n(t)))(tinymce, "6.0.0"))
            return void window.console.error("The format painter plugin requires at least version 6.0.0 of TinyMCE.");
        const o = e(Le.Retrival)
          , s = e({
            schemas: [],
            context: _e.Unspecified
        });
        (e=>{
            (0,
            e.options.register)("formatpainter_ignored_formats", {
                processor: "string[]",
                default: "link,address,removeformat,formatpainter_removeformat".split(",")
            })
        }
        )(t),
        (e=>{
            e.on("PreInit", (()=>{
                ae(Me, ((t,r)=>{
                    e.formatter.get(r) || e.formatter.register(r, t)
                }
                ))
            }
            ))
        }
        )(t),
        ot(t, o, s),
        (e=>{
            e.ui.registry.addToggleButton("formatpainter", {
                active: !1,
                icon: "format-painter",
                tooltip: "Format painter",
                onAction: ()=>e.execCommand("mceToggleFormatPainter"),
                onSetup: t=>{
                    const r = e=>{
                        t.setActive(e.state)
                    }
                    ;
                    return e.on("FormatPainterToggle", r),
                    ()=>e.off("FormatPainterToggle", r)
                }
            })
        }
        )(t),
        ((e,t)=>{
            e.ui.registry.addToggleMenuItem("formatpainter", {
                active: !1,
                icon: "format-painter",
                text: "Format painter",
                onAction: ()=>e.execCommand("mceToggleFormatPainter"),
                onSetup: r=>{
                    const o = e=>{
                        r.setActive(e.state)
                    }
                    ;
                    return r.setActive(t.get() === Le.Application),
                    e.on("FormatPainterToggle", o),
                    ()=>e.off("FormatPainterToggle", o)
                }
            })
        }
        )(t, o),
        (e=>{
            e.addShortcut("Meta+alt+C", "", (()=>{
                e.execCommand("mceRetrieveFormats")
            }
            )),
            e.addShortcut("Meta+alt+V", "", (()=>{
                e.execCommand("mcePaintFormats")
            }
            ))
        }
        )(t)
    }
    ))
}();
