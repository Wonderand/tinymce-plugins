/*!
 * Tiny Comments plugin
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
      , t = Object.getPrototypeOf
      , n = (e,t,n)=>{
        var o;
        return !!n(e, t.prototype) || (null === (o = e.constructor) || void 0 === o ? void 0 : o.name) === t.name
    }
      , o = e=>t=>(e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && n(e, String, ((e,t)=>t.isPrototypeOf(e))) ? "string" : t
    }
    )(t) === e
      , r = e=>t=>typeof t === e
      , s = e=>t=>e === t
      , a = o("string")
      , i = o("object")
      , c = e=>((e,o)=>i(e) && n(e, o, ((e,n)=>t(e) === n)))(e, Object)
      , l = s(null)
      , m = r("boolean")
      , d = s(void 0)
      , u = e=>!(e=>null == e)(e)
      , h = r("function")
      , _ = r("number");
    class v {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new v(!0,e)
        }
        static none() {
            return v.singletonNone
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
            return this.tag ? v.some(e(this.value)) : v.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : v.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : v.none()
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
            return u(e) ? v.some(e) : v.none()
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
    v.singletonNone = new v(!1);
    const p = e=>parseInt(e, 10)
      , g = (e,t)=>{
        const n = e - t;
        return 0 === n ? 0 : n > 0 ? 1 : -1
    }
      , y = (e,t,n)=>({
        major: e,
        minor: t,
        patch: n
    })
      , f = e=>{
        const t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
        return t ? y(p(t[1]), p(t[2]), p(t[3])) : y(0, 0, 0)
    }
    ;
    let b = 0;
    const w = e=>{
        const t = (new Date).getTime()
          , n = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 * 1e9);
        return b++,
        e + "_" + n + b + String(t)
    }
      , S = ()=>{}
      , C = e=>()=>e
      , x = e=>e
      , O = e=>e()
      , A = C(!1)
      , R = C(!0)
      , E = Array.prototype.indexOf
      , D = (e,t)=>{
        const n = e.length
          , o = new Array(n);
        for (let r = 0; r < n; r++) {
            const n = e[r];
            o[r] = t(n, r)
        }
        return o
    }
      , k = (e,t)=>{
        for (let n = 0, o = e.length; n < o; n++)
            t(e[n], n)
    }
      , T = (e,t)=>{
        const n = [];
        for (let o = 0, r = e.length; o < r; o++) {
            const r = e[o];
            t(r, o) && n.push(r)
        }
        return n
    }
      , M = (e,t)=>((e,t,n)=>{
        for (let o = 0, r = e.length; o < r; o++) {
            const r = e[o];
            if (t(r, o))
                return v.some(r);
            if (n(r, o))
                break
        }
        return v.none()
    }
    )(e, t, A)
      , L = Object.keys
      , U = Object.hasOwnProperty
      , N = (e,t)=>{
        const n = L(e);
        for (let o = 0, r = n.length; o < r; o++) {
            const r = n[o];
            t(e[r], r)
        }
    }
      , j = (e,t)=>P(e, ((e,n)=>({
        k: n,
        v: t(e, n)
    })))
      , P = (e,t)=>{
        const n = {};
        return N(e, ((e,o)=>{
            const r = t(e, o);
            n[r.k] = r.v
        }
        )),
        n
    }
      , $ = (e,t)=>U.call(e, t);
    "undefined" != typeof window ? window : Function("return this;")();
    const I = (1,
    e=>1 === (e=>e.dom.nodeType)(e));
    const F = e=>t=>I(t) && t.dom.nodeName.toLowerCase() === e
      , H = (e,t,n)=>{
        if (!(a(n) || m(n) || _(n)))
            throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", n, ":: Element ", e),
            new Error("Attribute value was not simple");
        e.setAttribute(t, n + "")
    }
      , V = (e,t,n)=>{
        H(e.dom, t, n)
    }
      , B = (e,t)=>{
        const n = e.dom.getAttribute(t);
        return null === n ? void 0 : n
    }
      , Y = (e,t)=>v.from(B(e, t))
      , W = (e,t)=>{
        e.dom.removeAttribute(t)
    }
      , G = (e,t,n=0,o)=>{
        const r = e.indexOf(t, n);
        return -1 !== r && (!!d(o) || r + t.length <= o)
    }
      , q = e=>t=>t.replace(e, "")
      , z = q(/^\s+|\s+$/g)
      , J = q(/^\s+/g)
      , K = e=>{
        if (null == e)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: e
        }
    }
      , Q = (e,t)=>{
        const n = (t || document).createElement("div");
        if (n.innerHTML = e,
        !n.hasChildNodes() || n.childNodes.length > 1) {
            const t = "HTML does not have a single root node";
            throw console.error(t, e),
            new Error(t)
        }
        return K(n.childNodes[0])
    }
      , X = (e,t)=>{
        const n = (t || document).createElement(e);
        return K(n)
    }
      , Z = K
      , ee = e=>1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType || 0 === e.childElementCount
      , te = e=>v.from(e.dom.parentNode).map(Z)
      , ne = e=>D(e.dom.childNodes, Z)
      , oe = ()=>re(Z(document))
      , re = e=>{
        const t = e.dom.body;
        if (null == t)
            throw new Error("Body is not available yet");
        return Z(t)
    }
      , se = (e,t)=>{
        e.dom.appendChild(t.dom)
    }
      , ae = e=>{
        e.dom.textContent = "",
        k(ne(e), (e=>{
            ie(e)
        }
        ))
    }
      , ie = e=>{
        const t = e.dom;
        null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , ce = e=>{
        const t = ne(e);
        var n, o;
        t.length > 0 && (n = e,
        k(o = t, ((e,t)=>{
            ((e,t)=>{
                const n = (e=>v.from(e.dom.nextSibling).map(Z))(e);
                n.fold((()=>{
                    te(e).each((e=>{
                        se(e, t)
                    }
                    ))
                }
                ), (e=>{
                    ((e,t)=>{
                        te(e).each((n=>{
                            n.dom.insertBefore(t.dom, e.dom)
                        }
                        ))
                    }
                    )(e, t)
                }
                ))
            }
            )(0 === t ? n : o[t - 1], e)
        }
        ))),
        ie(e)
    }
      , le = (e,t)=>{
        const n = (e=>Z(e.dom.ownerDocument))(e)
          , o = n.dom
          , r = Z(o.createDocumentFragment());
        ((e,t)=>{
            k(t, (t=>{
                se(e, t)
            }
            ))
        }
        )(r, ((e,t)=>{
            const n = (t || document).createElement("div");
            return n.innerHTML = e,
            ne(Z(n))
        }
        )(t, o)),
        ae(e),
        se(e, r)
    }
      , me = ()=>de(0, 0)
      , de = (e,t)=>({
        major: e,
        minor: t
    })
      , ue = {
        nu: de,
        detect: (e,t)=>{
            const n = String(t).toLowerCase();
            return 0 === e.length ? me() : ((e,t)=>{
                const n = ((e,t)=>{
                    for (let n = 0; n < e.length; n++) {
                        const o = e[n];
                        if (o.test(t))
                            return o
                    }
                }
                )(e, t);
                if (!n)
                    return {
                        major: 0,
                        minor: 0
                    };
                const o = e=>Number(t.replace(n, "$" + e));
                return de(o(1), o(2))
            }
            )(e, n)
        }
        ,
        unknown: me
    }
      , he = (e,t)=>{
        const n = String(t).toLowerCase();
        return M(e, (e=>e.search(n)))
    }
      , _e = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/
      , ve = e=>t=>G(t, e)
      , pe = [{
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: e=>G(e, "edge/") && G(e, "chrome") && G(e, "safari") && G(e, "applewebkit")
    }, {
        name: "Chromium",
        brand: "Chromium",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, _e],
        search: e=>G(e, "chrome") && !G(e, "chromeframe")
    }, {
        name: "IE",
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: e=>G(e, "msie") || G(e, "trident")
    }, {
        name: "Opera",
        versionRegexes: [_e, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: ve("opera")
    }, {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: ve("firefox")
    }, {
        name: "Safari",
        versionRegexes: [_e, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: e=>(G(e, "safari") || G(e, "mobile/")) && G(e, "applewebkit")
    }]
      , ge = [{
        name: "Windows",
        search: ve("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "iOS",
        search: e=>G(e, "iphone") || G(e, "ipad"),
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
    }, {
        name: "Android",
        search: ve("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "macOS",
        search: ve("mac os x"),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
    }, {
        name: "Linux",
        search: ve("linux"),
        versionRegexes: []
    }, {
        name: "Solaris",
        search: ve("sunos"),
        versionRegexes: []
    }, {
        name: "FreeBSD",
        search: ve("freebsd"),
        versionRegexes: []
    }, {
        name: "ChromeOS",
        search: ve("cros"),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
    }]
      , ye = {
        browsers: C(pe),
        oses: C(ge)
    }
      , fe = "Edge"
      , be = "Chromium"
      , we = "Opera"
      , Se = "Firefox"
      , Ce = "Safari"
      , xe = e=>{
        const t = e.current
          , n = e.version
          , o = e=>()=>t === e;
        return {
            current: t,
            version: n,
            isEdge: o(fe),
            isChromium: o(be),
            isIE: o("IE"),
            isOpera: o(we),
            isFirefox: o(Se),
            isSafari: o(Ce)
        }
    }
      , Oe = ()=>xe({
        current: void 0,
        version: ue.unknown()
    })
      , Ae = xe
      , Re = (C(fe),
    C(be),
    C("IE"),
    C(we),
    C(Se),
    C(Ce),
    "Windows")
      , Ee = "Android"
      , De = "Linux"
      , ke = "macOS"
      , Te = "Solaris"
      , Me = "FreeBSD"
      , Le = "ChromeOS"
      , Ue = e=>{
        const t = e.current
          , n = e.version
          , o = e=>()=>t === e;
        return {
            current: t,
            version: n,
            isWindows: o(Re),
            isiOS: o("iOS"),
            isAndroid: o(Ee),
            isMacOS: o(ke),
            isLinux: o(De),
            isSolaris: o(Te),
            isFreeBSD: o(Me),
            isChromeOS: o(Le)
        }
    }
      , Ne = ()=>Ue({
        current: void 0,
        version: ue.unknown()
    })
      , je = Ue
      , Pe = (C(Re),
    C("iOS"),
    C(Ee),
    C(De),
    C(ke),
    C(Te),
    C(Me),
    C(Le),
    (e,t,n)=>{
        const o = ye.browsers()
          , r = ye.oses()
          , s = t.bind((e=>((e,t)=>((e,t)=>{
            for (let n = 0; n < e.length; n++) {
                const o = t(e[n]);
                if (o.isSome())
                    return o
            }
            return v.none()
        }
        )(t.brands, (t=>{
            const n = t.brand.toLowerCase();
            return M(e, (e=>{
                var t;
                return n === (null === (t = e.brand) || void 0 === t ? void 0 : t.toLowerCase())
            }
            )).map((e=>({
                current: e.name,
                version: ue.nu(parseInt(t.version, 10), 0)
            })))
        }
        )))(o, e))).orThunk((()=>((e,t)=>he(e, t).map((e=>{
            const n = ue.detect(e.versionRegexes, t);
            return {
                current: e.name,
                version: n
            }
        }
        )))(o, e))).fold(Oe, Ae)
          , a = ((e,t)=>he(e, t).map((e=>{
            const n = ue.detect(e.versionRegexes, t);
            return {
                current: e.name,
                version: n
            }
        }
        )))(r, e).fold(Ne, je)
          , i = ((e,t,n,o)=>{
            const r = e.isiOS() && !0 === /ipad/i.test(n)
              , s = e.isiOS() && !r
              , a = e.isiOS() || e.isAndroid()
              , i = a || o("(pointer:coarse)")
              , c = r || !s && a && o("(min-device-width:768px)")
              , l = s || a && !c
              , m = t.isSafari() && e.isiOS() && !1 === /safari/i.test(n)
              , d = !l && !c && !m;
            return {
                isiPad: C(r),
                isiPhone: C(s),
                isTablet: C(c),
                isPhone: C(l),
                isTouch: C(i),
                isAndroid: e.isAndroid,
                isiOS: e.isiOS,
                isWebView: C(m),
                isDesktop: C(d)
            }
        }
        )(a, s, e, n);
        return {
            browser: s,
            os: a,
            deviceType: i
        }
    }
    )
      , $e = e=>window.matchMedia(e).matches
      , Ie = (e=>{
        let t, n = !1;
        return (...o)=>(n || (n = !0,
        t = e.apply(null, o)),
        t)
    }
    )((()=>Pe(window.navigator.userAgent, v.from(window.navigator.userAgentData), $e)))().os.isMacOS() ? "\u2318" : "Ctrl"
      , Fe = j({
        tc_menu_name: "TinyComments",
        tc_conversations_title: "Comments",
        tc_announce_sidebar_available: `Comment. Sidebar available. Press ${Ie} + Alt + M to switch to sidebar`,
        tc_items_addcomment: "Add comment",
        tc_items_showcomments: "Show comments",
        tc_items_deleteall: "Delete all conversations",
        tc_edit_buttons_save: "Save",
        tc_edit_buttons_cancel: "Cancel",
        tc_reply_buttons_comment: "Comment",
        tc_reply_buttons_clear: "Clear",
        tc_reply_placeholders: "Add comment...",
        tc_kebab_delete_conversation: "Delete conversation",
        tc_kebab_resolve_conversation: "Resolve conversation",
        tc_kebab_delete: "Delete",
        tc_kebab_edit: "Edit",
        tc_edit_problem_comment: "An error occurred editing this comment. See the console for details.",
        tc_edit_unauthorised_comment: "You are not allowed to edit this comment",
        tc_delete_buttons_cancel: "Cancel",
        tc_delete_buttons_proceed: "Delete",
        tc_resolve_buttons_proceed: "Resolve",
        tc_create_problem: "An error occurred while creating a comment. See the console for details",
        tc_reply_problem: "An error occurred while replying to a comment. See the console for details",
        tc_delete_prompts_conversation: "Delete this conversation?",
        tc_delete_prompts_conversation_detail_sing: "1 comment will be deleted. You can't undo this action.",
        tc_delete_prompts_conversation_detail_pl: "{0} comments will be deleted. You can't undo this action.",
        tc_delete_prompts_all: "Delete all conversations in the content? This cannot be undone.",
        tc_delete_prompts_comment: "Are you sure you want to delete this comment?",
        tc_resolve_prompts_conversation: "Resolve this conversation?",
        tc_resolve_prompts_conversation_detail_sing: "1 comment will be resolved. You can't undo this action.",
        tc_resolve_prompts_conversation_detail_pl: "{0} comments will be resolved. You can't undo this action.",
        tc_delete_problem_all: "An error occurred deleting all the conversations. See the console for details.",
        tc_delete_problem_conversation: "An error occurred deleting the conversation. See the console for details.",
        tc_delete_problem_comment: "An error occurred deleting the comment. See the console for details.",
        tc_delete_unauthorised_all: "You are not allowed to delete all the conversations",
        tc_delete_unauthorised_conversation: "You are not allowed to delete this conversation",
        tc_delete_unauthorised_comment: "You are not allowed to delete this comment",
        tc_resolve_unauthorised_conversation: "You are not allowed to resolve this conversation",
        tc_resolve_problem_conversation: "An error occurred resolving the conversation. See the console for details.",
        tc_date_less_than_a_minute_ago: "a moment ago",
        tc_date_1_minute_ago: "1 minute ago",
        tc_date_x_minutes_ago: "{0} minutes ago",
        tc_date_1_hour_ago: "1 hour ago",
        tc_date_x_hours_ago: "{0} hours ago",
        tc_date_1_day_ago: "1 day ago",
        tc_date_x_days_ago: "{0} days ago",
        tc_date_1_week_ago: "1 week ago",
        tc_date_x_weeks_ago: "{0} weeks ago",
        tc_date_1_month_ago: "1 month ago",
        tc_date_x_months_ago: "{0} months ago",
        tc_date_1_year_ago: "1 year ago",
        tc_date_x_years_ago: "{0} years ago",
        tc_date_comment_edited: " (edited)",
        tc_comment_buttons_showmore: "SHOW MORE",
        tc_comment_buttons_showless: "SHOW LESS"
    }, x)
      , He = w("aria-comment-description");
    let Ve = 0;
    const Be = e=>{
        const t = (n = oe(),
        o = `#${He}`,
        ((e,t)=>{
            const n = void 0 === t ? document : t.dom;
            return ee(n) ? v.none() : v.from(n.querySelector(e)).map(Z)
        }
        )(o, n)).getOrThunk((()=>{
            const e = X("span");
            return ((e,t)=>{
                const n = e.dom;
                N(t, ((e,t)=>{
                    H(n, t, e)
                }
                ))
            }
            )(e, {
                id: He,
                "aria-live": "polite",
                "aria-atomic": "true",
                role: "alert"
            }),
            ((e,t)=>{
                const n = e.dom;
                N({
                    position: "absolute",
                    left: "-10000px",
                    top: "-1000px"
                }, ((e,t)=>{
                    ((e,t,n)=>{
                        if (!a(n))
                            throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", n, ":: Element ", e),
                            new Error("CSS value must be a string: " + n);
                        (e=>void 0 !== e.style && h(e.style.getPropertyValue))(e) && e.style.setProperty(t, n)
                    }
                    )(n, t, e)
                }
                ))
            }
            )(e),
            se(oe(), e),
            e
        }
        ));
        var n, o;
        return Ve++,
        ((e,t)=>({
            onComment: ()=>{
                le(t, e.translate(Fe.tc_announce_sidebar_available))
            }
            ,
            notOnComment: ()=>{
                le(t, "")
            }
            ,
            getMarker: ()=>t,
            release: ()=>{
                Ve--,
                0 === Ve && ie(t)
            }
        }))(e, t)
    }
      , Ye = ()=>(new Date).toISOString();
    var We;
    !function(e) {
        e[e.LessThanMinute = 0] = "LessThanMinute",
        e[e.Minute = 1] = "Minute",
        e[e.Hour = 2] = "Hour",
        e[e.Day = 3] = "Day",
        e[e.Week = 4] = "Week",
        e[e.Month = 5] = "Month",
        e[e.Year = 6] = "Year"
    }(We || (We = {}));
    const Ge = e=>{
        e.dispatch("mce-tinycomments-update", {})
    }
      , qe = (e,t="")=>{
        const n = e.get()
          , o = "" === t ? 0 : Date.parse(t);
        return {
            timestamp: Ye(),
            events: o > 0 ? T(n, (e=>Date.parse(e.timestamp) > o)) : n
        }
    }
      , ze = e=>(t={})=>a(t.after) ? qe(e, t.after) : qe(e)
      , Je = F("hr")
      , Ke = e=>{
        const t = Z(e.selection.getNode())
          , n = Z(e.selection.getStart());
        return (e=>{
            let t = e.selection.getRng().commonAncestorContainer;
            return 3 === t.nodeType && (t = t.parentNode),
            !!u(t) && e.dom.isEmpty(t)
        }
        )(e) || Je(t) || Je(n)
    }
      , Qe = (e,t)=>{
        const n = B(e, t);
        return void 0 === n || "" === n ? [] : n.split(" ")
    }
      , Xe = e=>void 0 !== e.dom.classList
      , Ze = (e,t)=>{
        Xe(e) ? e.dom.classList.remove(t) : ((e,t)=>{
            ((e,t,n)=>{
                const o = T(Qe(e, t), (e=>e !== n));
                o.length > 0 ? V(e, t, o.join(" ")) : W(e, t)
            }
            )(e, "class", t)
        }
        )(e, t),
        (e=>{
            const t = Xe(e) ? e.dom.classList : (e=>Qe(e, "class"))(e);
            0 === t.length && W(e, "class")
        }
        )(e)
    }
      , et = C("tox-comment")
      , tt = C("tinycomments")
      , nt = C("mce-annotation")
      , ot = C("data-mce-annotation")
      , rt = C("data-mce-annotation-uid")
      , st = C("data-mce-annotation-active")
      , at = C("data-mce-annotation-classes")
      , it = C("data-mce-annotation-attrs")
      , ct = C("tox-comments-visible")
      , lt = F("span")
      , mt = e=>{
        lt(e) ? ce(e) : (e=>{
            Ze(e, nt()),
            W(e, `${rt()}`),
            W(e, `${ot()}`),
            W(e, `${st()}`);
            const t = Y(e, `${it()}`).map((e=>e.split(","))).getOr([])
              , n = Y(e, `${at()}`).map((e=>e.split(","))).getOr([]);
            var o;
            k(t, (t=>W(e, t))),
            o = e,
            k(n, (e=>{
                Ze(o, e)
            }
            )),
            W(e, `${at()}`),
            W(e, `${it()}`)
        }
        )(e)
    }
      , dt = (e,t,n,o)=>(le(e, t),
    k(((e,t)=>((e,t)=>{
        const n = void 0 === t ? document : t.dom;
        return ee(n) ? [] : D(n.querySelectorAll(e), Z)
    }
    )(t, e))(e, n), o),
    e.dom.innerHTML)
      , ut = (e,t,n)=>{
        const o = X("div");
        k(e, (e=>{
            if (e.content = dt(o, e.content, t, n),
            u(e.fragments))
                for (let r = 0; r < e.fragments.length; r++)
                    e.fragments[r] = dt(o, e.fragments[r], t, n)
        }
        ))
    }
      , ht = "tc-open-comment"
      , _t = "tc-try-delete-all-conversations"
      , vt = (e,t,n,o,r)=>{
        e.on("init", (()=>{
            ((e,t,n)=>{
                e.addCommand(ht, ((e,o)=>{
                    const r = n.get();
                    t.refreshSidebar(r, o.grabFocus ? 1 : 0)
                }
                ))
            }
            )(e, t, r),
            ((e,t)=>{
                e.addCommand("tc-delete-conversation-at-cursor", ((n,o)=>{
                    var r, s;
                    Ke(e) || (e.undoManager.transact((()=>e.annotator.remove(tt()))),
                    r = e.undoManager.data,
                    s = o.conversationUid,
                    ut(r, (e=>`[${rt()}="${e}"]`)(s), mt),
                    t.refreshSidebar(v.none(), 2),
                    e.focus())
                }
                ))
            }
            )(e, t),
            ((e,t,n,o)=>{
                e.addCommand(_t, (()=>{
                    Ke(e) || e.windowManager.confirm(Fe.tc_delete_prompts_all, (r=>{
                        if (r)
                            return n.deleteAllConversations({}).get((n=>{
                                n.fold((e=>t.showError(Fe.tc_delete_problem_all, e)), (n=>{
                                    var r;
                                    n.canDelete ? (o({
                                        type: "delete-all-conversations",
                                        timestamp: Ye()
                                    }),
                                    e.annotator.removeAll(tt()),
                                    r = e.undoManager.data,
                                    ut(r, `[${ot()}="${tt()}"]`, mt),
                                    e.undoManager.dispatchChange(),
                                    t.refreshSidebar(v.none(), 2),
                                    e.focus()) : t.showError(Fe.tc_delete_unauthorised_all)
                                }
                                ))
                            }
                            ))
                    }
                    ))
                }
                ))
            }
            )(e, t, n, o)
        }
        ))
    }
      , pt = (e,t)=>{
        e.execCommand(ht, !1, {
            grabFocus: t
        }, {
            skip_focus: !t
        })
    }
      , gt = e=>{
        e.execCommand("ToggleSidebar", !1, "showcomments")
    }
      , yt = e=>{
        let t = v.none()
          , n = [];
        const o = e=>{
            r() ? s(e) : n.push(e)
        }
          , r = ()=>t.isSome()
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
            r() || (t = v.some(e),
            k(n, s),
            n = [])
        }
        )),
        {
            get: o,
            map: e=>yt((t=>{
                o((n=>{
                    t(e(n))
                }
                ))
            }
            )),
            isReady: r
        }
    }
      , ft = {
        nu: yt,
        pure: e=>yt((t=>{
            t(e)
        }
        ))
    }
      , bt = e=>{
        setTimeout((()=>{
            throw e
        }
        ), 0)
    }
      , wt = e=>{
        const t = t=>{
            e().then(t, bt)
        }
        ;
        return {
            map: t=>wt((()=>e().then(t))),
            bind: t=>wt((()=>e().then((e=>t(e).toPromise())))),
            anonBind: t=>wt((()=>e().then((()=>t.toPromise())))),
            toLazy: ()=>ft.nu(t),
            toCached: ()=>{
                let t = null;
                return wt((()=>(null === t && (t = e()),
                t)))
            }
            ,
            toPromise: e,
            get: t
        }
    }
      , St = e=>wt((()=>new Promise(e)))
      , Ct = e=>wt((()=>Promise.resolve(e)))
      , xt = e=>{
        const t = t=>t(e)
          , n = C(e)
          , o = ()=>r
          , r = {
            tag: !0,
            inner: e,
            fold: (t,n)=>n(e),
            isValue: R,
            isError: A,
            map: t=>At.value(t(e)),
            mapError: o,
            bind: t,
            exists: t,
            forall: t,
            getOr: n,
            or: o,
            getOrThunk: n,
            orThunk: o,
            getOrDie: n,
            each: t=>{
                t(e)
            }
            ,
            toOptional: ()=>v.some(e)
        };
        return r
    }
      , Ot = e=>{
        const t = ()=>n
          , n = {
            tag: !1,
            inner: e,
            fold: (t,n)=>t(e),
            isValue: A,
            isError: R,
            map: t,
            mapError: t=>At.error(t(e)),
            bind: t,
            exists: A,
            forall: R,
            getOr: x,
            or: x,
            getOrThunk: O,
            orThunk: O,
            getOrDie: (o = String(e),
            ()=>{
                throw new Error(o)
            }
            ),
            each: S,
            toOptional: v.none
        };
        var o;
        return n
    }
      , At = {
        value: xt,
        error: Ot,
        fromOption: (e,t)=>e.fold((()=>Ot(t)), xt)
    }
      , Rt = e=>({
        ...e,
        toCached: ()=>Rt(e.toCached()),
        bindFuture: t=>Rt(e.bind((e=>e.fold((e=>Ct(At.error(e))), (e=>t(e)))))),
        bindResult: t=>Rt(e.map((e=>e.bind(t)))),
        mapResult: t=>Rt(e.map((e=>e.map(t)))),
        mapError: t=>Rt(e.map((e=>e.mapError(t)))),
        foldResult: (t,n)=>e.map((e=>e.fold(t, n))),
        withTimeout: (t,n)=>Rt(St((o=>{
            let r = !1;
            const s = setTimeout((()=>{
                r = !0,
                o(At.error(n()))
            }
            ), t);
            e.get((e=>{
                r || (clearTimeout(s),
                o(e))
            }
            ))
        }
        )))
    })
      , Et = e=>Rt(St(e))
      , Dt = e=>Rt(Ct(At.value(e)))
      , kt = e=>Rt(Ct(At.error(e)))
      , Tt = e=>t=>Et((n=>e(t, (e=>{
        n(At.value(e))
    }
    ), (e=>{
        n(At.error(e))
    }
    ))))
      , Mt = e=>t=>t.options.get(e)
      , Lt = e=>t=>v.from(Mt(e)(t)).filter(h)
      , Ut = e=>t=>Lt(e)(t).getOrDie(e + " has not been implemented.")
      , Nt = (e,t)=>n=>{
        var o;
        return null !== (o = n.options.get(e)) && void 0 !== o ? o : t(n)
    }
      , jt = (e,t)=>n=>{
        const o = Nt(e, (()=>t(Wt(n))))(n);
        return Tt(o)
    }
      , Pt = Ut("tinycomments_create")
      , $t = Ut("tinycomments_reply")
      , It = Ut("tinycomments_delete")
      , Ft = Lt("tinycomments_resolve")
      , Ht = Ut("tinycomments_delete_all")
      , Vt = Ut("tinycomments_delete_comment")
      , Bt = Ut("tinycomments_edit_comment")
      , Yt = Ut("tinycomments_lookup")
      , Wt = Mt("tinycomments_author")
      , Gt = Nt("tinycomments_author_name", Wt)
      , qt = Mt("tinycomments_author_avatar")
      , zt = jt("tinycomments_can_delete", (e=>(t,n,o)=>{
        n({
            canDelete: t.comments.length > 0 && t.comments[0].author === e && !0
        })
    }
    ))
      , Jt = Lt("tinycomments_can_resolve")
      , Kt = jt("tinycomments_can_delete_comment", (e=>(t,n,o)=>{
        n({
            canDelete: t.comment.author === e && !0
        })
    }
    ))
      , Qt = jt("tinycomments_can_edit_comment", (e=>(t,n,o)=>{
        n({
            canEdit: t.comment.author === e && !0
        })
    }
    ))
      , Xt = Mt("tinycomments_mode")
      , Zt = Mt("tinycomments_css_url")
      , en = Mt("tinycomments_js_url")
      , tn = (nn = (e,t)=>c(e) && c(t) ? tn(e, t) : t,
    (...e)=>{
        if (0 === e.length)
            throw new Error("Can't merge zero objects");
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const o = e[n];
            for (const e in o)
                $(o, e) && (t[e] = nn(t[e], o[e]))
        }
        return t
    }
    );
    var nn;
    const on = e=>{
        const t = Pt(e)
          , n = $t(e)
          , o = Yt(e)
          , r = It(e)
          , s = Ft(e)
          , a = Ht(e)
          , i = Vt(e)
          , c = Bt(e);
        return {
            create: Tt(t),
            reply: Tt(n),
            lookup: Tt((l = o,
            (e,t,n)=>{
                l(e, (e=>{
                    const n = D(e.conversation.comments, (e=>({
                        authorName: e.author,
                        ...e
                    })));
                    t(tn(e, {
                        conversation: {
                            comments: n
                        }
                    }))
                }
                ), n)
            }
            )),
            deleteConversation: Tt(r),
            resolveConversation: s.map((e=>Tt(e))),
            deleteAllConversations: Tt(a),
            editComment: Tt(c),
            deleteComment: Tt(i),
            lifecycleHooks: {
                onPreInit: S,
                onGetContent: v.none
            }
        };
        var l
    }
      , rn = {
        base64: {
            versions: ["2.0", "2.1"],
            encryptor: {
                encryptText: e=>{
                    const t = new Blob([e],{
                        type: "application/json"
                    })
                      , n = new FileReader;
                    return Et((e=>{
                        n.addEventListener("loadend", (()=>e(At.value({
                            encrypted: [n.result]
                        })))),
                        n.addEventListener("error", (()=>e(At.error(n.error || new Error("error decoding text"))))),
                        n.readAsDataURL(t)
                    }
                    ))
                }
                ,
                decryptText: e=>{
                    return (t = e[0],
                    (e=>{
                        const t = e.split(",")
                          , n = /data:([^;]+)/.exec(t[0]);
                        if (!n)
                            return v.none();
                        const o = n[1]
                          , r = t[1]
                          , s = 1024
                          , a = atob(r)
                          , i = a.length
                          , c = Math.ceil(i / s)
                          , l = new Array(c);
                        for (let e = 0; e < c; ++e) {
                            const t = e * s
                              , n = Math.min(t + s, i)
                              , o = new Array(n - t);
                            for (let e = t, r = 0; e < n; ++r,
                            ++e)
                                o[r] = a[e].charCodeAt(0);
                            l[e] = new Uint8Array(o)
                        }
                        return v.some(new Blob(l,{
                            type: o
                        }))
                    }
                    )(t)).fold((()=>kt("Could not decode URI")), (e=>{
                        const t = new FileReader;
                        return Et((n=>{
                            t.addEventListener("loadend", (()=>n(At.value({
                                decrypted: t.result
                            })))),
                            t.addEventListener("error", (()=>{
                                var e;
                                return n(At.error((null === (e = t.error) || void 0 === e ? void 0 : e.message) || "error decoding text"))
                            }
                            )),
                            t.readAsText(e)
                        }
                        ))
                    }
                    ));
                    var t
                }
            }
        }
    };
    rn.current = rn.base64;
    const sn = e=>((e,t)=>{
        const n = L(e);
        for (let o = 0, r = n.length; o < r; o++) {
            const r = n[o]
              , s = e[r];
            if (t(s))
                return v.some(s)
        }
        return v.none()
    }
    )(rn, (t=>((e,t)=>{
        return n = e,
        o = t,
        E.call(n, o) > -1;
        var n, o
    }
    )(t.versions, e))).map((e=>e.encryptor))
      , an = (e,t,n)=>t === e ? n : "2.0" === e ? an("2.1", t, (e=>({
        ...e,
        authorName: e.author
    }))(n)) : n
      , cn = "tinycomments"
      , ln = "2.1"
      , mn = e=>{
        return t = J(e),
        "" === (n = cn) || t.length >= n.length && t.substr(0, 0 + n.length) === n;
        var t, n
    }
      , dn = e=>{
        const t = z(e).split("|");
        return t.length > 2 ? At.value({
            version: t[1],
            rest: t.slice(2)
        }) : At.error("Embedded comments not in expected format.")
    }
      , un = (e,t,n)=>((e,t)=>{
        const n = (e=>{
            try {
                const t = JSON.parse(e);
                return At.value(t)
            } catch (e) {
                return At.error("Could not JSON parse conversations.")
            }
        }
        )(t);
        return e !== ln ? n.map((t=>j(t, (t=>({
            ...t,
            comments: D(t.comments, (t=>an(e, ln, t)))
        }))))) : n
    }
    )(e, n).map((e=>({
        conversations: e,
        encrypted: {
            encrypted: t
        }
    })))
      , hn = e=>{
        const t = Wt(e)
          , n = Gt(e)
          , o = qt(e)
          , r = (()=>{
            let e = {}
              , t = v.none();
            const n = t=>Object.prototype.hasOwnProperty.call(e, t) ? v.some(e[t]) : v.none();
            return {
                get: ()=>tn(e, {}),
                clear: ()=>{
                    e = {},
                    t = v.none()
                }
                ,
                addData: (t,n)=>{
                    e[t] = n
                }
                ,
                setData: (n,o)=>{
                    e = n,
                    t = v.some(o)
                }
                ,
                setEncryptedData: e=>{
                    t = v.some(e)
                }
                ,
                getEncryptedData: ()=>t,
                lookupData: n,
                removeData: t=>{
                    delete e[t]
                }
                ,
                updateData: (t,o)=>n(t).map((n=>{
                    const r = o(n);
                    return e[t] = r,
                    r
                }
                ))
            }
        }
        )()
          , s = zt(e)
          , a = Kt(e)
          , i = Qt(e)
          , c = Jt(e).map((e=>Tt(e)))
          , l = {
            author: t,
            authorName: n
        }
          , m = ((e,t)=>{
            const n = {};
            var o;
            return ((e,t,n,o)=>{
                N(e, ((e,r)=>{
                    (t(e, r) ? n : o)(e, r)
                }
                ))
            }
            )(e, t, (o = n,
            (e,t)=>{
                o[t] = e
            }
            ), S),
            n
        }
        )({
            authorAvatar: o
        }, (e=>!d(e)))
          , u = rn.current.encryptor
          , h = ()=>u.encryptText(JSON.stringify(r.get())).mapResult((e=>r.setEncryptedData(e)))
          , _ = c.map((e=>t=>r.lookupData(t.conversationUid).fold((()=>kt("Could not find conversation to resolve")), (n=>e({
            conversationUid: n.uid,
            comments: n.comments
        }).bindFuture((e=>e.canResolve ? (r.removeData(t.conversationUid),
        h().mapResult((()=>({
            canResolve: !0
        })))) : Dt({
            canResolve: !1
        })))))))
          , p = (e,t,n,o)=>(e=>r.lookupData(e.conversationUid).fold((()=>At.error(`Could not find conversation with uid ${e.conversationUid}`)), (t=>M(t.comments, (t=>t.uid === e.commentUid)).fold((()=>At.error(`Could not find comment with uid ${e.commentUid} in conversation ${e.conversationUid}`)), (e=>At.value({
            conversationUid: t.uid,
            comment: e
        }))))))(e).fold((e=>kt(e)), (s=>n(s).bindFuture((n=>!0 === n[t] ? r.updateData(e.conversationUid, o(s)).fold((()=>kt("Could not operate on comment (" + t + ")")), (e=>h().mapResult((()=>({
            [t]: !0
        }))))) : Dt({
            [t]: !1
        })))));
        return {
            create: e=>{
                const t = w("mce-conversation");
                return r.addData(t, {
                    uid: t,
                    comments: [{
                        uid: t,
                        ...l,
                        ...m,
                        content: e.content,
                        createdAt: e.createdAt,
                        modifiedAt: e.createdAt
                    }]
                }),
                h().mapResult((()=>({
                    conversationUid: t
                })))
            }
            ,
            reply: e=>{
                const t = w("mce-reply")
                  , n = {
                    uid: t,
                    ...l,
                    ...m,
                    content: e.content,
                    createdAt: e.createdAt,
                    modifiedAt: e.createdAt
                };
                return r.updateData(e.conversationUid, (e=>({
                    ...e,
                    comments: e.comments.concat([n])
                }))).fold((()=>kt("Could not reply to uid: " + e.conversationUid)), (()=>h().mapResult((()=>({
                    commentUid: t
                })))))
            }
            ,
            lookup: e=>r.lookupData(e.conversationUid).fold((()=>kt("Could not find uid: " + e.conversationUid)), (e=>Dt({
                conversation: e
            }))),
            deleteConversation: e=>r.lookupData(e.conversationUid).fold((()=>kt("Could not find conversation to delete")), (t=>s({
                conversationUid: t.uid,
                comments: t.comments
            }).bindFuture((t=>t.canDelete ? (r.removeData(e.conversationUid),
            h().mapResult((()=>({
                canDelete: !0
            })))) : Dt({
                canDelete: !1
            }))))),
            resolveConversation: _,
            deleteAllConversations: ()=>{
                const e = L(r.get())
                  , t = D(e, (e=>r.lookupData(e).fold((()=>kt("Could not find conversation")), (e=>s({
                    conversationUid: e.uid,
                    comments: e.comments
                })))));
                return Et((e=>{
                    var n;
                    (n = t,
                    ((e,t)=>t((t=>{
                        const n = [];
                        let o = 0;
                        0 === e.length ? t([]) : k(e, ((r,s)=>{
                            r.get((r=>s=>{
                                n[r] = s,
                                o++,
                                o >= e.length && t(n)
                            }
                            )(s))
                        }
                        ))
                    }
                    )))(n, St)).get((t=>{
                        const n = ((e,t)=>{
                            for (let t = 0, n = e.length; t < n; ++t)
                                if (!0 !== e[t].exists((e=>e.canDelete)))
                                    return !1;
                            return !0
                        }
                        )(t);
                        n && r.clear(),
                        e(At.value({
                            canDelete: n
                        }))
                    }
                    ))
                }
                ))
            }
            ,
            deleteComment: e=>p(e, "canDelete", a, (e=>{
                return t = e.comment.uid,
                e=>({
                    uid: e.uid,
                    comments: T(e.comments, (e=>e.uid !== t))
                });
                var t
            }
            )),
            editComment: e=>p(e, "canEdit", (t=>i({
                ...t,
                edit: {
                    modifiedAt: e.modifiedAt,
                    content: e.content
                }
            })), (()=>{
                return t = e.commentUid,
                n = e.content,
                o = e.modifiedAt,
                e=>({
                    uid: e.uid,
                    comments: D(e.comments, (e=>e.uid === t ? {
                        ...e,
                        content: n,
                        modifiedAt: o
                    } : e))
                });
                var t, n, o
            }
            )),
            lifecycleHooks: {
                onPreInit: t=>{
                    e.parser.addNodeFilter("#comment", ((e,t,n)=>{
                        n.isRootContent && (r.clear(),
                        k(e, (e=>{
                            const t = e.value;
                            var n;
                            t && mn(t) && (e.remove(),
                            dn(t).each((e=>r.setEncryptedData({
                                encrypted: e.rest
                            }))),
                            (n = t,
                            mn(n) ? dn(n).fold((e=>kt(e)), (({version: e, rest: t})=>((e,t)=>sn(e).fold((()=>kt(`No Encryptor for version: ${e}`)), (e=>e.decryptText(t))))(e, t).bindResult((({decrypted: n})=>un(e, t, n))))) : Dt({
                                conversations: {},
                                encrypted: {
                                    encrypted: []
                                }
                            })).get((e=>e.fold((e=>console.error("Error extracting embedded conversations: " + e)), (e=>{
                                r.setData(e.conversations, e.encrypted)
                            }
                            )))))
                        }
                        )))
                    }
                    ))
                }
                ,
                onGetContent: (e,t)=>r.getEncryptedData().map((e=>t + (e=>{
                    const t = Z(document.createComment((e=>[cn, ln, ...e.encrypted].join("|"))(e)));
                    return (e=>{
                        const t = X("div")
                          , n = Z(e.dom.cloneNode(!0));
                        return se(t, n),
                        (e=>e.dom.innerHTML)(t)
                    }
                    )(t)
                }
                )(e)))
            }
        }
    }
      , _n = (e,t,n)=>{
        e.on("init", (()=>{
            e.annotator.register(tt(), {
                decorate: ()=>({
                    classes: [et()],
                    attributes: {}
                })
            }),
            e.annotator.annotationChanged(tt(), ((e,o,r)=>{
                if (e) {
                    if (n.onComment(),
                    r) {
                        const {uid: e, nodes: n} = r;
                        t.refreshView(v.some({
                            uid: e,
                            nodes: D(n, Z)
                        }))
                    }
                } else
                    n.notOnComment(),
                    t.refreshView(v.none())
            }
            ));
            const o = ((e,t)=>{
                let n = null;
                const o = ()=>{
                    l(n) || (clearTimeout(n),
                    n = null)
                }
                ;
                return {
                    cancel: o,
                    throttle: (...t)=>{
                        o(),
                        n = setTimeout((()=>{
                            n = null,
                            e.apply(null, t)
                        }
                        ), 50)
                    }
                }
            }
            )((()=>{
                t.refreshReadonly()
            }
            ));
            e.on("SelectionChange AfterSetSelectionRange", o.throttle),
            e.on("remove", o.cancel)
        }
        ))
    }
      , vn = e=>{
        return ((e=(()=>Z(document))())=>v.from(e.dom.activeElement).map(Z))((t = e,
        Z(t.dom.getRootNode()))).filter((t=>e.dom.contains(t.dom)));
        var t
    }
      , pn = "mce-tinycomments-uistate-updated";
    var gn;
    !function(e) {
        e[e.Open = 0] = "Open",
        e[e.Closed = 1] = "Closed",
        e[e.Closing = 2] = "Closing"
    }(gn || (gn = {}));
    const yn = (e,t)=>()=>{
        var n, o;
        t.set(gn.Open),
        n = Z(e.getBody()),
        o = ct(),
        Xe(n) ? n.dom.classList.add(o) : ((e,t)=>{
            ((e,t,n)=>{
                const o = Qe(e, t).concat([n]);
                V(e, t, o.join(" "))
            }
            )(e, "class", t)
        }
        )(n, o),
        Ge(e),
        pt(e, !1)
    }
      , fn = (e,t)=>n=>{
        vn(Z(n.element())).each((t=>{
            e.focus()
        }
        )),
        t.set(gn.Closed),
        Ze(Z(e.getBody()), ct()),
        Ge(e)
    }
      , bn = (e,t,n)=>{
        t.isReadonly() || (n.get() !== gn.Closed && n.get() !== gn.Closing || gt(e),
        pt(e, !0))
    }
      , wn = (t,n)=>{
        const o = e(!1)
          , r = e(v.none())
          , s = e([]);
        ((e,t)=>{
            const n = e.options.register;
            n("tinycomments_css_url", {
                processor: "string",
                default: t + "/css"
            }),
            n("tinycomments_js_url", {
                processor: "string",
                default: t + "/js"
            }),
            n("tinycomments_mode", {
                processor: "string",
                default: "callback"
            }),
            n("tinycomments_author", {
                processor: "string",
                default: "Anon"
            }),
            n("tinycomments_author_name", {
                processor: "string"
            }),
            n("tinycomments_author_avatar", {
                processor: "string"
            }),
            k(["tinycomments_create", "tinycomments_reply", "tinycomments_lookup", "tinycomments_delete", "tinycomments_delete_all", "tinycomments_delete_comment", "tinycomments_can_delete", "tinycomments_can_delete_comment", "tinycomments_resolve", "tinycomments_can_resolve", "tinycomments_edit_comment", "tinycomments_can_edit_comment"], (e=>n(e, {
                processor: "function"
            })))
        }
        )(t, n);
        const i = (e=>("embedded" === Xt(e) ? hn : on)(e))(t)
          , c = (()=>{
            const t = e(v.none())
              , n = e(v.none());
            return {
                rememberSidebar: e=>{
                    n.set(v.some(e)),
                    t.get().fold((()=>{
                        const t = Q('<div aria-busy="true" class="tox-conversations" style="position: relative;">\n  <div class="tox-dialog__busy-spinner">\n  <div class="tox-loading-text">\n      <div>\n      <p>Comments are loading</p>\n      </div>\n  <div class="tox-spinner">\n      <div></div>\n      <div></div>\n      <div></div>\n  </div>\n</div></div>');
                        se(e, t)
                    }
                    ), (t=>{
                        t.attachTo(e)
                    }
                    ))
                }
                ,
                setUi: e=>{
                    t.set(v.some(e)),
                    n.get().each((t=>{
                        ae(t),
                        e.attachTo(t),
                        e.controller.refreshReadonly()
                    }
                    ))
                }
                ,
                refreshView: e=>{
                    t.get().fold(S, (t=>{
                        t.controller.refreshView(e)
                    }
                    ))
                }
                ,
                refreshSidebar: (e,n)=>{
                    t.get().fold(S, (t=>{
                        t.controller.refreshSidebar(e, n)
                    }
                    ))
                }
                ,
                setReadonly: e=>{
                    t.get().each((t=>t.controller.setReadonly(e)))
                }
                ,
                setSaving: e=>{
                    t.get().each((t=>t.controller.setSaving(e)))
                }
                ,
                showError: (e,n)=>{
                    t.get().each((t=>t.controller.showError(e, n)))
                }
                ,
                isReadonly: ()=>t.get().map((e=>e.controller.isReadonly())).getOr(!1),
                refreshReadonly: ()=>t.get().map((e=>e.controller.refreshReadonly())).getOr(!1)
            }
        }
        )()
          , l = {
            translate: e=>tinymce.translate(e),
            getIcon: e=>{
                var n;
                return null !== (n = t.ui.registry.getAll().icons[e]) && void 0 !== n ? n : "temporary-placeholder"
            }
        };
        ((e,t)=>tinymce.Resource.load("tinymce.plugins.tinycomments.sidebar", t))(0, (e=>en(e) + "/")(t) + "tinycomments-sidebar.min.js").then((e=>e(t, i, r, s, (e=>{
            c.setUi(e),
            c.refreshSidebar(r.get(), 5),
            o.set(!0)
        }
        ), l)));
        const m = Be(l);
        return t.on("remove", m.release),
        vt(t, c, i, ((e,t)=>n=>{
            const o = ze(t);
            t.set(t.get().concat([n])),
            ((e,t)=>{
                const n = {
                    getEventLog: t
                };
                e.dispatch("CommentChange", n)
            }
            )(e, o)
        }
        )(t, s), r),
        _n(t, c, m),
        ((t,n)=>{
            const o = e(gn.Closed);
            t.shortcuts.add("meta+alt+m", "TinyComments addComment", (()=>{
                bn(t, n, o)
            }
            )),
            ((e,t,n)=>{
                const o = "comment-add"
                  , r = (n,o)=>{
                    o(!t.isReadonly());
                    const r = ()=>{
                        o(!t.isReadonly())
                    }
                    ;
                    return e.on(pn, r),
                    ()=>e.off(pn, r)
                }
                ;
                e.ui.registry.addButton("addcomment", {
                    tooltip: Fe.tc_items_addcomment,
                    icon: o,
                    onSetup: e=>r(e.isEnabled, e.setEnabled),
                    onAction: ()=>{
                        e.selection.expand(),
                        bn(e, t, n)
                    }
                }),
                e.ui.registry.addMenuItem("addcomment", {
                    text: Fe.tc_items_addcomment,
                    shortcut: "meta+Alt+M",
                    icon: o,
                    onSetup: e=>r(e.isEnabled, e.setEnabled),
                    onAction: ()=>{
                        e.selection.expand(),
                        bn(e, t, n)
                    }
                }),
                e.ui.registry.addMenuItem("deleteallconversations", {
                    text: Fe.tc_items_deleteall,
                    onAction: ()=>{
                        (e=>{
                            e.execCommand(_t, !1, {})
                        }
                        )(e)
                    }
                    ,
                    onSetup: t=>{
                        const n = e.annotator.getAll(tt());
                        return t.setEnabled(!(e=>{
                            for (const t in e)
                                if (U.call(e, t))
                                    return !1;
                            return !0
                        }
                        )(n)),
                        S
                    }
                }),
                e.ui.registry.addToggleMenuItem("showcomments", {
                    text: Fe.tc_items_showcomments,
                    icon: "comment",
                    onAction: ()=>gt(e),
                    onSetup: t=>{
                        const o = ()=>{
                            t.setActive(n.get() === gn.Open)
                        }
                        ;
                        return e.on("mce-tinycomments-update", o),
                        o(),
                        ()=>{
                            e.off("mce-tinycomments-update", o)
                        }
                    }
                }),
                e.ui.registry.addSidebar("showcomments", {
                    tooltip: Fe.tc_items_showcomments,
                    icon: "comment",
                    onSetup: e=>(t.rememberSidebar(Z(e.element())),
                    S),
                    onShow: yn(e, n),
                    onHide: fn(e, n)
                })
            }
            )(t, n, o)
        }
        )(t, c),
        t.on("PostRender", (()=>{
            (e=>{
                var t;
                const n = Zt(e) + "/tinycomments.css"
                  , o = v.from(null === (t = e.ui) || void 0 === t ? void 0 : t.styleSheetLoader).getOr(tinymce.DOM.styleSheetLoader);
                ((e,t,n)=>{
                    const o = null != n ? n : tinymce.DOM.styleSheetLoader;
                    if (tinymce.Resource.has(e)) {
                        const t = tinymce.Resource.get(e);
                        return tinymce.DOM.styleSheetLoader.loadRawCss(e, t),
                        Promise.resolve()
                    }
                    o.load(t)
                }
                )("tinycomments/css/tinycomments.css", n, o),
                e.on("remove", (()=>o.unload(n)))
            }
            )(t)
        }
        )),
        t.on("init", (()=>{
            c.refreshSidebar(v.none(), 5)
        }
        )),
        t.on("PreInit", (()=>{
            i.lifecycleHooks.onPreInit(t)
        }
        )),
        t.on("setContent", (e=>{
            e.selection || c.refreshView(v.none())
        }
        )),
        t.on("SwitchMode", (()=>{
            c.setReadonly(t.readonly)
        }
        )),
        t.on("GetContent", (e=>{
            if (a(e.content)) {
                const n = !0 === e.source_view
                  , o = !0 === e.contextual
                  , r = !0 === e.selection
                  , s = n || o || r ? v.none() : i.lifecycleHooks.onGetContent(t, e.content);
                e.content = s.getOr(e.content)
            }
        }
        )),
        ((e,t)=>({
            getEventLog: ze(t),
            hasLoadedUi: e.get
        }))(o, s)
    }
    ;
    tinymce.PluginManager.requireLangPack("tinycomments", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_PT,pt_BR,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("tinycomments", ((e,t)=>((e,t)=>!!e && -1 === ((e,t)=>{
        const n = g(e.major, t.major);
        if (0 !== n)
            return n;
        const o = g(e.minor, t.minor);
        if (0 !== o)
            return o;
        const r = g(e.patch, t.patch);
        return 0 !== r ? r : 0
    }
    )((e=>f((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), f(t)))(tinymce, "6.8.0") ? (console.error("The tinycomments plugin requires at least version 6.8.0 of TinyMCE."),
    {}) : wn(e, t)))
}();
