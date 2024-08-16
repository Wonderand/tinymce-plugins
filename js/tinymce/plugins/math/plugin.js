/*!
 * Math Code Editor plugin
 *
 * Copyright (c) 2024 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 7.3.0-86
 */

!function() {
    "use strict";
    const e = e=>parseInt(e, 10)
      , t = (e,t)=>{
        const r = e - t;
        return 0 === r ? 0 : r > 0 ? 1 : -1
    }
      , r = (e,t,r)=>({
        major: e,
        minor: t,
        patch: r
    })
      , a = t=>{
        const a = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t);
        return a ? r(e(a[1]), e(a[2]), e(a[3])) : r(0, 0, 0)
    }
      , n = e=>t=>typeof t === e
      , i = e=>"string" === (e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (r = a = e,
        (n = String).prototype.isPrototypeOf(r) || (null === (i = a.constructor) || void 0 === i ? void 0 : i.name) === n.name) ? "string" : t;
        var r, a, n, i
    }
    )(e)
      , o = n("boolean")
      , s = n("function")
      , l = n("number")
      , h = ()=>{}
      , m = ()=>!1;
    class c {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new c(!0,e)
        }
        static none() {
            return c.singletonNone
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
            return this.tag ? c.some(e(this.value)) : c.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : c.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : c.none()
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
            return null == e ? c.none() : c.some(e)
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
    c.singletonNone = new c(!1);
    const p = (e,t)=>{
        const r = e.length
          , a = new Array(r);
        for (let n = 0; n < r; n++) {
            const r = e[n];
            a[n] = t(r, n)
        }
        return a
    }
      , u = (e,t)=>{
        for (let r = 0, a = e.length; r < a; r++)
            t(e[r], r)
    }
    ;
    "undefined" != typeof window ? window : Function("return this;")();
    const d = e=>e.dom.nodeName.toLowerCase()
      , g = (1,
    e=>1 === (e=>e.dom.nodeType)(e));
    const f = (e,t)=>{
        const r = e.dom.getAttribute(t);
        return null === r ? void 0 : r
    }
      , v = (e,t,r)=>{
        const a = ((e,t)=>{
            const r = f(e, t);
            return void 0 === r || "" === r ? [] : r.split(" ")
        }
        )(e, t);
        return ((e,t,r)=>{
            ((e,t,r)=>{
                if (!(i(r) || o(r) || l(r)))
                    throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", r, ":: Element ", e),
                    new Error("Attribute value was not simple");
                e.setAttribute(t, r + "")
            }
            )(e.dom, t, r)
        }
        )(e, t, a.concat([r]).join(" ")),
        !0
    }
      , b = (e,t)=>{
        (e=>void 0 !== e.dom.classList)(e) ? e.dom.classList.add(t) : ((e,t)=>{
            v(e, "class", t)
        }
        )(e, t)
    }
      , y = e=>{
        if (null == e)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: e
        }
    }
      , x = (e,t)=>{
        const r = (t || document).createElement("div");
        if (r.innerHTML = e,
        !r.hasChildNodes() || r.childNodes.length > 1) {
            const t = "HTML does not have a single root node";
            throw console.error(t, e),
            new Error(t)
        }
        return y(r.childNodes[0])
    }
      , w = (e,t)=>{
        const r = (t || document).createElement(e);
        return y(r)
    }
      , k = y
      , S = (e,t)=>{
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
      , M = e=>p(e.dom.childNodes, k)
      , z = (e,t)=>{
        const r = e.dom.childNodes;
        return c.from(r[t]).map(k)
    }
      , A = e=>z(e, e.dom.childNodes.length - 1)
      , T = (e,t)=>{
        e.dom.appendChild(t.dom)
    }
      , B = e=>{
        const t = e.dom;
        null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , N = (e,t,r)=>((e,r,a)=>{
        let n = e.dom;
        const i = s(a) ? a : m;
        for (; n.parentNode; ) {
            n = n.parentNode;
            const e = k(n);
            if (S(e, t))
                return c.some(e);
            if (i(e))
                break
        }
        return c.none()
    }
    )(e, 0, r)
      , C = "tiny-math-inline"
      , q = "tiny-math-block"
      , I = e=>e.nodeName.toLowerCase() === C || e.nodeName.toLowerCase() === q
      , R = (e,t)=>{
        const r = k(t);
        return ((e,t,a)=>((e,t,r)=>((e,t,r,a,n)=>e(r, a) ? c.some(r) : s(n) && n(r) ? c.none() : t(r, a, n))(((e,t)=>S(e, t)), N, e, t, r))(e, t, (e=>{
            return t = r,
            e.dom === t.dom;
            var t
        }
        )).isSome())(k(e), `${C},${q}`)
    }
      , H = e=>((e,t)=>((e,t)=>{
        const r = void 0 === t ? document : t.dom;
        return 1 !== (a = r).nodeType && 9 !== a.nodeType && 11 !== a.nodeType || 0 === a.childElementCount ? [] : p(r.querySelectorAll(e), k);
        var a
    }
    )(t, e))(e, `${C},${q}`)
      , O = e=>{
        const t = w("div")
          , r = k(e.dom.cloneNode(!0));
        return T(t, r),
        (e=>e.dom.innerHTML)(t)
    }
    ;
    class E {
        constructor(e, t, r) {
            this.lexer = void 0,
            this.start = void 0,
            this.end = void 0,
            this.lexer = e,
            this.start = t,
            this.end = r
        }
        static range(e, t) {
            return t ? e && e.loc && t.loc && e.loc.lexer === t.loc.lexer ? new E(e.loc.lexer,e.loc.start,t.loc.end) : null : e && e.loc
        }
    }
    class L {
        constructor(e, t) {
            this.text = void 0,
            this.loc = void 0,
            this.noexpand = void 0,
            this.treatAsRelax = void 0,
            this.text = e,
            this.loc = t
        }
        range(e, t) {
            return new L(t,E.range(this, e))
        }
    }
    class D {
        constructor(e, t) {
            this.name = void 0,
            this.position = void 0,
            this.length = void 0,
            this.rawMessage = void 0;
            var r, a, n = "KaTeX parse error: " + e, i = t && t.loc;
            if (i && i.start <= i.end) {
                var o = i.lexer.input;
                r = i.start,
                a = i.end,
                r === o.length ? n += " at end of input: " : n += " at position " + (r + 1) + ": ";
                var s = o.slice(r, a).replace(/[^]/g, "$&\u0332");
                n += (r > 15 ? "\u2026" + o.slice(r - 15, r) : o.slice(0, r)) + s + (a + 15 < o.length ? o.slice(a, a + 15) + "\u2026" : o.slice(a))
            }
            var l = new Error(n);
            return l.name = "ParseError",
            l.__proto__ = D.prototype,
            l.position = r,
            null != r && null != a && (l.length = a - r),
            l.rawMessage = e,
            l
        }
    }
    D.prototype.__proto__ = Error.prototype;
    var P = /([A-Z])/g
      , V = {
        "&": "&amp;",
        ">": "&gt;",
        "<": "&lt;",
        '"': "&quot;",
        "'": "&#x27;"
    }
      , F = /[&><"']/g
      , G = function e(t) {
        return "ordgroup" === t.type || "color" === t.type ? 1 === t.body.length ? e(t.body[0]) : t : "font" === t.type ? e(t.body) : t
    }
      , U = function(e, t) {
        return -1 !== e.indexOf(t)
    }
      , Y = function(e, t) {
        return void 0 === e ? t : e
    }
      , W = function(e) {
        return String(e).replace(F, (e=>V[e]))
    }
      , X = function(e) {
        return e.replace(P, "-$1").toLowerCase()
    }
      , $ = G
      , j = function(e) {
        var t = G(e);
        return "mathord" === t.type || "textord" === t.type || "atom" === t.type
    }
      , _ = function(e) {
        var t = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e);
        return t ? ":" !== t[2] ? null : /^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(t[1]) ? t[1].toLowerCase() : null : "_relative"
    }
      , Z = {
        displayMode: {
            type: "boolean",
            description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
            cli: "-d, --display-mode"
        },
        output: {
            type: {
                enum: ["htmlAndMathml", "html", "mathml"]
            },
            description: "Determines the markup language of the output.",
            cli: "-F, --format <type>"
        },
        leqno: {
            type: "boolean",
            description: "Render display math in leqno style (left-justified tags)."
        },
        fleqn: {
            type: "boolean",
            description: "Render display math flush left."
        },
        throwOnError: {
            type: "boolean",
            default: !0,
            cli: "-t, --no-throw-on-error",
            cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
        },
        errorColor: {
            type: "string",
            default: "#cc0000",
            cli: "-c, --error-color <color>",
            cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
            cliProcessor: e=>"#" + e
        },
        macros: {
            type: "object",
            cli: "-m, --macro <def>",
            cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
            cliDefault: [],
            cliProcessor: (e,t)=>(t.push(e),
            t)
        },
        minRuleThickness: {
            type: "number",
            description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
            processor: e=>Math.max(0, e),
            cli: "--min-rule-thickness <size>",
            cliProcessor: parseFloat
        },
        colorIsTextColor: {
            type: "boolean",
            description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
            cli: "-b, --color-is-text-color"
        },
        strict: {
            type: [{
                enum: ["warn", "ignore", "error"]
            }, "boolean", "function"],
            description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
            cli: "-S, --strict",
            cliDefault: !1
        },
        trust: {
            type: ["boolean", "function"],
            description: "Trust the input, enabling all HTML features such as \\url.",
            cli: "-T, --trust"
        },
        maxSize: {
            type: "number",
            default: 1 / 0,
            description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
            processor: e=>Math.max(0, e),
            cli: "-s, --max-size <n>",
            cliProcessor: parseInt
        },
        maxExpand: {
            type: "number",
            default: 1e3,
            description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
            processor: e=>Math.max(0, e),
            cli: "-e, --max-expand <n>",
            cliProcessor: e=>"Infinity" === e ? 1 / 0 : parseInt(e)
        },
        globalGroup: {
            type: "boolean",
            cli: !1
        }
    };
    function K(e) {
        if (e.default)
            return e.default;
        var t = e.type
          , r = Array.isArray(t) ? t[0] : t;
        if ("string" != typeof r)
            return r.enum[0];
        switch (r) {
        case "boolean":
            return !1;
        case "string":
            return "";
        case "number":
            return 0;
        case "object":
            return {}
        }
    }
    class J {
        constructor(e) {
            for (var t in this.displayMode = void 0,
            this.output = void 0,
            this.leqno = void 0,
            this.fleqn = void 0,
            this.throwOnError = void 0,
            this.errorColor = void 0,
            this.macros = void 0,
            this.minRuleThickness = void 0,
            this.colorIsTextColor = void 0,
            this.strict = void 0,
            this.trust = void 0,
            this.maxSize = void 0,
            this.maxExpand = void 0,
            this.globalGroup = void 0,
            e = e || {},
            Z)
                if (Z.hasOwnProperty(t)) {
                    var r = Z[t];
                    this[t] = void 0 !== e[t] ? r.processor ? r.processor(e[t]) : e[t] : K(r)
                }
        }
        reportNonstrict(e, t, r) {
            var a = this.strict;
            if ("function" == typeof a && (a = a(e, t, r)),
            a && "ignore" !== a) {
                if (!0 === a || "error" === a)
                    throw new D("LaTeX-incompatible input and strict mode is set to 'error': " + t + " [" + e + "]",r);
                "warn" === a ? "undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + t + " [" + e + "]") : "undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to unrecognized '" + a + "': " + t + " [" + e + "]")
            }
        }
        useStrictBehavior(e, t, r) {
            var a = this.strict;
            if ("function" == typeof a)
                try {
                    a = a(e, t, r)
                } catch (e) {
                    a = "error"
                }
            return !(!a || "ignore" === a || !0 !== a && "error" !== a && ("warn" === a ? ("undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + t + " [" + e + "]"),
            1) : ("undefined" != typeof console && console.warn("LaTeX-incompatible input and strict mode is set to unrecognized '" + a + "': " + t + " [" + e + "]"),
            1)))
        }
        isTrusted(e) {
            if (e.url && !e.protocol) {
                var t = _(e.url);
                if (null == t)
                    return !1;
                e.protocol = t
            }
            var r = "function" == typeof this.trust ? this.trust(e) : this.trust;
            return Boolean(r)
        }
    }
    class Q {
        constructor(e, t, r) {
            this.id = void 0,
            this.size = void 0,
            this.cramped = void 0,
            this.id = e,
            this.size = t,
            this.cramped = r
        }
        sup() {
            return ee[te[this.id]]
        }
        sub() {
            return ee[re[this.id]]
        }
        fracNum() {
            return ee[ae[this.id]]
        }
        fracDen() {
            return ee[ne[this.id]]
        }
        cramp() {
            return ee[ie[this.id]]
        }
        text() {
            return ee[oe[this.id]]
        }
        isTight() {
            return this.size >= 2
        }
    }
    var ee = [new Q(0,0,!1), new Q(1,0,!0), new Q(2,1,!1), new Q(3,1,!0), new Q(4,2,!1), new Q(5,2,!0), new Q(6,3,!1), new Q(7,3,!0)]
      , te = [4, 5, 4, 5, 6, 7, 6, 7]
      , re = [5, 5, 5, 5, 7, 7, 7, 7]
      , ae = [2, 3, 4, 5, 6, 7, 6, 7]
      , ne = [3, 3, 5, 5, 7, 7, 7, 7]
      , ie = [1, 1, 3, 3, 5, 5, 7, 7]
      , oe = [0, 1, 2, 3, 2, 3, 2, 3]
      , se = {
        DISPLAY: ee[0],
        TEXT: ee[2],
        SCRIPT: ee[4],
        SCRIPTSCRIPT: ee[6]
    }
      , le = [{
        name: "latin",
        blocks: [[256, 591], [768, 879]]
    }, {
        name: "cyrillic",
        blocks: [[1024, 1279]]
    }, {
        name: "armenian",
        blocks: [[1328, 1423]]
    }, {
        name: "brahmic",
        blocks: [[2304, 4255]]
    }, {
        name: "georgian",
        blocks: [[4256, 4351]]
    }, {
        name: "cjk",
        blocks: [[12288, 12543], [19968, 40879], [65280, 65376]]
    }, {
        name: "hangul",
        blocks: [[44032, 55215]]
    }]
      , he = [];
    function me(e) {
        for (var t = 0; t < he.length; t += 2)
            if (e >= he[t] && e <= he[t + 1])
                return !0;
        return !1
    }
    le.forEach((e=>e.blocks.forEach((e=>he.push(...e)))));
    var ce = {
        doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
        doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
        leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
        leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
        leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
        leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
        leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
        leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
        leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
        leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
        leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
        lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
        leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
        leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
        leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
        longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
        midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
        midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
        oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
        oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
        oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
        oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
        rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
        rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
        rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
        rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
        rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
        rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
        rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
        rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
        rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
        righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
        rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
        rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
        twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
        twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
        tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
        tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
        tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
        tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
        vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
        widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
        widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
        widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
        widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
        widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
        widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
        widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
        widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
        baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
        rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
        baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
        rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
        shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
        shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
    };
    class pe {
        constructor(e) {
            this.children = void 0,
            this.classes = void 0,
            this.height = void 0,
            this.depth = void 0,
            this.maxFontSize = void 0,
            this.style = void 0,
            this.children = e,
            this.classes = [],
            this.height = 0,
            this.depth = 0,
            this.maxFontSize = 0,
            this.style = {}
        }
        hasClass(e) {
            return U(this.classes, e)
        }
        toNode() {
            for (var e = document.createDocumentFragment(), t = 0; t < this.children.length; t++)
                e.appendChild(this.children[t].toNode());
            return e
        }
        toMarkup() {
            for (var e = "", t = 0; t < this.children.length; t++)
                e += this.children[t].toMarkup();
            return e
        }
        toText() {
            return this.children.map((e=>e.toText())).join("")
        }
    }
    var ue = {
        "AMS-Regular": {
            32: [0, 0, 0, 0, .25],
            65: [0, .68889, 0, 0, .72222],
            66: [0, .68889, 0, 0, .66667],
            67: [0, .68889, 0, 0, .72222],
            68: [0, .68889, 0, 0, .72222],
            69: [0, .68889, 0, 0, .66667],
            70: [0, .68889, 0, 0, .61111],
            71: [0, .68889, 0, 0, .77778],
            72: [0, .68889, 0, 0, .77778],
            73: [0, .68889, 0, 0, .38889],
            74: [.16667, .68889, 0, 0, .5],
            75: [0, .68889, 0, 0, .77778],
            76: [0, .68889, 0, 0, .66667],
            77: [0, .68889, 0, 0, .94445],
            78: [0, .68889, 0, 0, .72222],
            79: [.16667, .68889, 0, 0, .77778],
            80: [0, .68889, 0, 0, .61111],
            81: [.16667, .68889, 0, 0, .77778],
            82: [0, .68889, 0, 0, .72222],
            83: [0, .68889, 0, 0, .55556],
            84: [0, .68889, 0, 0, .66667],
            85: [0, .68889, 0, 0, .72222],
            86: [0, .68889, 0, 0, .72222],
            87: [0, .68889, 0, 0, 1],
            88: [0, .68889, 0, 0, .72222],
            89: [0, .68889, 0, 0, .72222],
            90: [0, .68889, 0, 0, .66667],
            107: [0, .68889, 0, 0, .55556],
            160: [0, 0, 0, 0, .25],
            165: [0, .675, .025, 0, .75],
            174: [.15559, .69224, 0, 0, .94666],
            240: [0, .68889, 0, 0, .55556],
            295: [0, .68889, 0, 0, .54028],
            710: [0, .825, 0, 0, 2.33334],
            732: [0, .9, 0, 0, 2.33334],
            770: [0, .825, 0, 0, 2.33334],
            771: [0, .9, 0, 0, 2.33334],
            989: [.08167, .58167, 0, 0, .77778],
            1008: [0, .43056, .04028, 0, .66667],
            8245: [0, .54986, 0, 0, .275],
            8463: [0, .68889, 0, 0, .54028],
            8487: [0, .68889, 0, 0, .72222],
            8498: [0, .68889, 0, 0, .55556],
            8502: [0, .68889, 0, 0, .66667],
            8503: [0, .68889, 0, 0, .44445],
            8504: [0, .68889, 0, 0, .66667],
            8513: [0, .68889, 0, 0, .63889],
            8592: [-.03598, .46402, 0, 0, .5],
            8594: [-.03598, .46402, 0, 0, .5],
            8602: [-.13313, .36687, 0, 0, 1],
            8603: [-.13313, .36687, 0, 0, 1],
            8606: [.01354, .52239, 0, 0, 1],
            8608: [.01354, .52239, 0, 0, 1],
            8610: [.01354, .52239, 0, 0, 1.11111],
            8611: [.01354, .52239, 0, 0, 1.11111],
            8619: [0, .54986, 0, 0, 1],
            8620: [0, .54986, 0, 0, 1],
            8621: [-.13313, .37788, 0, 0, 1.38889],
            8622: [-.13313, .36687, 0, 0, 1],
            8624: [0, .69224, 0, 0, .5],
            8625: [0, .69224, 0, 0, .5],
            8630: [0, .43056, 0, 0, 1],
            8631: [0, .43056, 0, 0, 1],
            8634: [.08198, .58198, 0, 0, .77778],
            8635: [.08198, .58198, 0, 0, .77778],
            8638: [.19444, .69224, 0, 0, .41667],
            8639: [.19444, .69224, 0, 0, .41667],
            8642: [.19444, .69224, 0, 0, .41667],
            8643: [.19444, .69224, 0, 0, .41667],
            8644: [.1808, .675, 0, 0, 1],
            8646: [.1808, .675, 0, 0, 1],
            8647: [.1808, .675, 0, 0, 1],
            8648: [.19444, .69224, 0, 0, .83334],
            8649: [.1808, .675, 0, 0, 1],
            8650: [.19444, .69224, 0, 0, .83334],
            8651: [.01354, .52239, 0, 0, 1],
            8652: [.01354, .52239, 0, 0, 1],
            8653: [-.13313, .36687, 0, 0, 1],
            8654: [-.13313, .36687, 0, 0, 1],
            8655: [-.13313, .36687, 0, 0, 1],
            8666: [.13667, .63667, 0, 0, 1],
            8667: [.13667, .63667, 0, 0, 1],
            8669: [-.13313, .37788, 0, 0, 1],
            8672: [-.064, .437, 0, 0, 1.334],
            8674: [-.064, .437, 0, 0, 1.334],
            8705: [0, .825, 0, 0, .5],
            8708: [0, .68889, 0, 0, .55556],
            8709: [.08167, .58167, 0, 0, .77778],
            8717: [0, .43056, 0, 0, .42917],
            8722: [-.03598, .46402, 0, 0, .5],
            8724: [.08198, .69224, 0, 0, .77778],
            8726: [.08167, .58167, 0, 0, .77778],
            8733: [0, .69224, 0, 0, .77778],
            8736: [0, .69224, 0, 0, .72222],
            8737: [0, .69224, 0, 0, .72222],
            8738: [.03517, .52239, 0, 0, .72222],
            8739: [.08167, .58167, 0, 0, .22222],
            8740: [.25142, .74111, 0, 0, .27778],
            8741: [.08167, .58167, 0, 0, .38889],
            8742: [.25142, .74111, 0, 0, .5],
            8756: [0, .69224, 0, 0, .66667],
            8757: [0, .69224, 0, 0, .66667],
            8764: [-.13313, .36687, 0, 0, .77778],
            8765: [-.13313, .37788, 0, 0, .77778],
            8769: [-.13313, .36687, 0, 0, .77778],
            8770: [-.03625, .46375, 0, 0, .77778],
            8774: [.30274, .79383, 0, 0, .77778],
            8776: [-.01688, .48312, 0, 0, .77778],
            8778: [.08167, .58167, 0, 0, .77778],
            8782: [.06062, .54986, 0, 0, .77778],
            8783: [.06062, .54986, 0, 0, .77778],
            8785: [.08198, .58198, 0, 0, .77778],
            8786: [.08198, .58198, 0, 0, .77778],
            8787: [.08198, .58198, 0, 0, .77778],
            8790: [0, .69224, 0, 0, .77778],
            8791: [.22958, .72958, 0, 0, .77778],
            8796: [.08198, .91667, 0, 0, .77778],
            8806: [.25583, .75583, 0, 0, .77778],
            8807: [.25583, .75583, 0, 0, .77778],
            8808: [.25142, .75726, 0, 0, .77778],
            8809: [.25142, .75726, 0, 0, .77778],
            8812: [.25583, .75583, 0, 0, .5],
            8814: [.20576, .70576, 0, 0, .77778],
            8815: [.20576, .70576, 0, 0, .77778],
            8816: [.30274, .79383, 0, 0, .77778],
            8817: [.30274, .79383, 0, 0, .77778],
            8818: [.22958, .72958, 0, 0, .77778],
            8819: [.22958, .72958, 0, 0, .77778],
            8822: [.1808, .675, 0, 0, .77778],
            8823: [.1808, .675, 0, 0, .77778],
            8828: [.13667, .63667, 0, 0, .77778],
            8829: [.13667, .63667, 0, 0, .77778],
            8830: [.22958, .72958, 0, 0, .77778],
            8831: [.22958, .72958, 0, 0, .77778],
            8832: [.20576, .70576, 0, 0, .77778],
            8833: [.20576, .70576, 0, 0, .77778],
            8840: [.30274, .79383, 0, 0, .77778],
            8841: [.30274, .79383, 0, 0, .77778],
            8842: [.13597, .63597, 0, 0, .77778],
            8843: [.13597, .63597, 0, 0, .77778],
            8847: [.03517, .54986, 0, 0, .77778],
            8848: [.03517, .54986, 0, 0, .77778],
            8858: [.08198, .58198, 0, 0, .77778],
            8859: [.08198, .58198, 0, 0, .77778],
            8861: [.08198, .58198, 0, 0, .77778],
            8862: [0, .675, 0, 0, .77778],
            8863: [0, .675, 0, 0, .77778],
            8864: [0, .675, 0, 0, .77778],
            8865: [0, .675, 0, 0, .77778],
            8872: [0, .69224, 0, 0, .61111],
            8873: [0, .69224, 0, 0, .72222],
            8874: [0, .69224, 0, 0, .88889],
            8876: [0, .68889, 0, 0, .61111],
            8877: [0, .68889, 0, 0, .61111],
            8878: [0, .68889, 0, 0, .72222],
            8879: [0, .68889, 0, 0, .72222],
            8882: [.03517, .54986, 0, 0, .77778],
            8883: [.03517, .54986, 0, 0, .77778],
            8884: [.13667, .63667, 0, 0, .77778],
            8885: [.13667, .63667, 0, 0, .77778],
            8888: [0, .54986, 0, 0, 1.11111],
            8890: [.19444, .43056, 0, 0, .55556],
            8891: [.19444, .69224, 0, 0, .61111],
            8892: [.19444, .69224, 0, 0, .61111],
            8901: [0, .54986, 0, 0, .27778],
            8903: [.08167, .58167, 0, 0, .77778],
            8905: [.08167, .58167, 0, 0, .77778],
            8906: [.08167, .58167, 0, 0, .77778],
            8907: [0, .69224, 0, 0, .77778],
            8908: [0, .69224, 0, 0, .77778],
            8909: [-.03598, .46402, 0, 0, .77778],
            8910: [0, .54986, 0, 0, .76042],
            8911: [0, .54986, 0, 0, .76042],
            8912: [.03517, .54986, 0, 0, .77778],
            8913: [.03517, .54986, 0, 0, .77778],
            8914: [0, .54986, 0, 0, .66667],
            8915: [0, .54986, 0, 0, .66667],
            8916: [0, .69224, 0, 0, .66667],
            8918: [.0391, .5391, 0, 0, .77778],
            8919: [.0391, .5391, 0, 0, .77778],
            8920: [.03517, .54986, 0, 0, 1.33334],
            8921: [.03517, .54986, 0, 0, 1.33334],
            8922: [.38569, .88569, 0, 0, .77778],
            8923: [.38569, .88569, 0, 0, .77778],
            8926: [.13667, .63667, 0, 0, .77778],
            8927: [.13667, .63667, 0, 0, .77778],
            8928: [.30274, .79383, 0, 0, .77778],
            8929: [.30274, .79383, 0, 0, .77778],
            8934: [.23222, .74111, 0, 0, .77778],
            8935: [.23222, .74111, 0, 0, .77778],
            8936: [.23222, .74111, 0, 0, .77778],
            8937: [.23222, .74111, 0, 0, .77778],
            8938: [.20576, .70576, 0, 0, .77778],
            8939: [.20576, .70576, 0, 0, .77778],
            8940: [.30274, .79383, 0, 0, .77778],
            8941: [.30274, .79383, 0, 0, .77778],
            8994: [.19444, .69224, 0, 0, .77778],
            8995: [.19444, .69224, 0, 0, .77778],
            9416: [.15559, .69224, 0, 0, .90222],
            9484: [0, .69224, 0, 0, .5],
            9488: [0, .69224, 0, 0, .5],
            9492: [0, .37788, 0, 0, .5],
            9496: [0, .37788, 0, 0, .5],
            9585: [.19444, .68889, 0, 0, .88889],
            9586: [.19444, .74111, 0, 0, .88889],
            9632: [0, .675, 0, 0, .77778],
            9633: [0, .675, 0, 0, .77778],
            9650: [0, .54986, 0, 0, .72222],
            9651: [0, .54986, 0, 0, .72222],
            9654: [.03517, .54986, 0, 0, .77778],
            9660: [0, .54986, 0, 0, .72222],
            9661: [0, .54986, 0, 0, .72222],
            9664: [.03517, .54986, 0, 0, .77778],
            9674: [.11111, .69224, 0, 0, .66667],
            9733: [.19444, .69224, 0, 0, .94445],
            10003: [0, .69224, 0, 0, .83334],
            10016: [0, .69224, 0, 0, .83334],
            10731: [.11111, .69224, 0, 0, .66667],
            10846: [.19444, .75583, 0, 0, .61111],
            10877: [.13667, .63667, 0, 0, .77778],
            10878: [.13667, .63667, 0, 0, .77778],
            10885: [.25583, .75583, 0, 0, .77778],
            10886: [.25583, .75583, 0, 0, .77778],
            10887: [.13597, .63597, 0, 0, .77778],
            10888: [.13597, .63597, 0, 0, .77778],
            10889: [.26167, .75726, 0, 0, .77778],
            10890: [.26167, .75726, 0, 0, .77778],
            10891: [.48256, .98256, 0, 0, .77778],
            10892: [.48256, .98256, 0, 0, .77778],
            10901: [.13667, .63667, 0, 0, .77778],
            10902: [.13667, .63667, 0, 0, .77778],
            10933: [.25142, .75726, 0, 0, .77778],
            10934: [.25142, .75726, 0, 0, .77778],
            10935: [.26167, .75726, 0, 0, .77778],
            10936: [.26167, .75726, 0, 0, .77778],
            10937: [.26167, .75726, 0, 0, .77778],
            10938: [.26167, .75726, 0, 0, .77778],
            10949: [.25583, .75583, 0, 0, .77778],
            10950: [.25583, .75583, 0, 0, .77778],
            10955: [.28481, .79383, 0, 0, .77778],
            10956: [.28481, .79383, 0, 0, .77778],
            57350: [.08167, .58167, 0, 0, .22222],
            57351: [.08167, .58167, 0, 0, .38889],
            57352: [.08167, .58167, 0, 0, .77778],
            57353: [0, .43056, .04028, 0, .66667],
            57356: [.25142, .75726, 0, 0, .77778],
            57357: [.25142, .75726, 0, 0, .77778],
            57358: [.41951, .91951, 0, 0, .77778],
            57359: [.30274, .79383, 0, 0, .77778],
            57360: [.30274, .79383, 0, 0, .77778],
            57361: [.41951, .91951, 0, 0, .77778],
            57366: [.25142, .75726, 0, 0, .77778],
            57367: [.25142, .75726, 0, 0, .77778],
            57368: [.25142, .75726, 0, 0, .77778],
            57369: [.25142, .75726, 0, 0, .77778],
            57370: [.13597, .63597, 0, 0, .77778],
            57371: [.13597, .63597, 0, 0, .77778]
        },
        "Caligraphic-Regular": {
            32: [0, 0, 0, 0, .25],
            65: [0, .68333, 0, .19445, .79847],
            66: [0, .68333, .03041, .13889, .65681],
            67: [0, .68333, .05834, .13889, .52653],
            68: [0, .68333, .02778, .08334, .77139],
            69: [0, .68333, .08944, .11111, .52778],
            70: [0, .68333, .09931, .11111, .71875],
            71: [.09722, .68333, .0593, .11111, .59487],
            72: [0, .68333, .00965, .11111, .84452],
            73: [0, .68333, .07382, 0, .54452],
            74: [.09722, .68333, .18472, .16667, .67778],
            75: [0, .68333, .01445, .05556, .76195],
            76: [0, .68333, 0, .13889, .68972],
            77: [0, .68333, 0, .13889, 1.2009],
            78: [0, .68333, .14736, .08334, .82049],
            79: [0, .68333, .02778, .11111, .79611],
            80: [0, .68333, .08222, .08334, .69556],
            81: [.09722, .68333, 0, .11111, .81667],
            82: [0, .68333, 0, .08334, .8475],
            83: [0, .68333, .075, .13889, .60556],
            84: [0, .68333, .25417, 0, .54464],
            85: [0, .68333, .09931, .08334, .62583],
            86: [0, .68333, .08222, 0, .61278],
            87: [0, .68333, .08222, .08334, .98778],
            88: [0, .68333, .14643, .13889, .7133],
            89: [.09722, .68333, .08222, .08334, .66834],
            90: [0, .68333, .07944, .13889, .72473],
            160: [0, 0, 0, 0, .25]
        },
        "Fraktur-Regular": {
            32: [0, 0, 0, 0, .25],
            33: [0, .69141, 0, 0, .29574],
            34: [0, .69141, 0, 0, .21471],
            38: [0, .69141, 0, 0, .73786],
            39: [0, .69141, 0, 0, .21201],
            40: [.24982, .74947, 0, 0, .38865],
            41: [.24982, .74947, 0, 0, .38865],
            42: [0, .62119, 0, 0, .27764],
            43: [.08319, .58283, 0, 0, .75623],
            44: [0, .10803, 0, 0, .27764],
            45: [.08319, .58283, 0, 0, .75623],
            46: [0, .10803, 0, 0, .27764],
            47: [.24982, .74947, 0, 0, .50181],
            48: [0, .47534, 0, 0, .50181],
            49: [0, .47534, 0, 0, .50181],
            50: [0, .47534, 0, 0, .50181],
            51: [.18906, .47534, 0, 0, .50181],
            52: [.18906, .47534, 0, 0, .50181],
            53: [.18906, .47534, 0, 0, .50181],
            54: [0, .69141, 0, 0, .50181],
            55: [.18906, .47534, 0, 0, .50181],
            56: [0, .69141, 0, 0, .50181],
            57: [.18906, .47534, 0, 0, .50181],
            58: [0, .47534, 0, 0, .21606],
            59: [.12604, .47534, 0, 0, .21606],
            61: [-.13099, .36866, 0, 0, .75623],
            63: [0, .69141, 0, 0, .36245],
            65: [0, .69141, 0, 0, .7176],
            66: [0, .69141, 0, 0, .88397],
            67: [0, .69141, 0, 0, .61254],
            68: [0, .69141, 0, 0, .83158],
            69: [0, .69141, 0, 0, .66278],
            70: [.12604, .69141, 0, 0, .61119],
            71: [0, .69141, 0, 0, .78539],
            72: [.06302, .69141, 0, 0, .7203],
            73: [0, .69141, 0, 0, .55448],
            74: [.12604, .69141, 0, 0, .55231],
            75: [0, .69141, 0, 0, .66845],
            76: [0, .69141, 0, 0, .66602],
            77: [0, .69141, 0, 0, 1.04953],
            78: [0, .69141, 0, 0, .83212],
            79: [0, .69141, 0, 0, .82699],
            80: [.18906, .69141, 0, 0, .82753],
            81: [.03781, .69141, 0, 0, .82699],
            82: [0, .69141, 0, 0, .82807],
            83: [0, .69141, 0, 0, .82861],
            84: [0, .69141, 0, 0, .66899],
            85: [0, .69141, 0, 0, .64576],
            86: [0, .69141, 0, 0, .83131],
            87: [0, .69141, 0, 0, 1.04602],
            88: [0, .69141, 0, 0, .71922],
            89: [.18906, .69141, 0, 0, .83293],
            90: [.12604, .69141, 0, 0, .60201],
            91: [.24982, .74947, 0, 0, .27764],
            93: [.24982, .74947, 0, 0, .27764],
            94: [0, .69141, 0, 0, .49965],
            97: [0, .47534, 0, 0, .50046],
            98: [0, .69141, 0, 0, .51315],
            99: [0, .47534, 0, 0, .38946],
            100: [0, .62119, 0, 0, .49857],
            101: [0, .47534, 0, 0, .40053],
            102: [.18906, .69141, 0, 0, .32626],
            103: [.18906, .47534, 0, 0, .5037],
            104: [.18906, .69141, 0, 0, .52126],
            105: [0, .69141, 0, 0, .27899],
            106: [0, .69141, 0, 0, .28088],
            107: [0, .69141, 0, 0, .38946],
            108: [0, .69141, 0, 0, .27953],
            109: [0, .47534, 0, 0, .76676],
            110: [0, .47534, 0, 0, .52666],
            111: [0, .47534, 0, 0, .48885],
            112: [.18906, .52396, 0, 0, .50046],
            113: [.18906, .47534, 0, 0, .48912],
            114: [0, .47534, 0, 0, .38919],
            115: [0, .47534, 0, 0, .44266],
            116: [0, .62119, 0, 0, .33301],
            117: [0, .47534, 0, 0, .5172],
            118: [0, .52396, 0, 0, .5118],
            119: [0, .52396, 0, 0, .77351],
            120: [.18906, .47534, 0, 0, .38865],
            121: [.18906, .47534, 0, 0, .49884],
            122: [.18906, .47534, 0, 0, .39054],
            160: [0, 0, 0, 0, .25],
            8216: [0, .69141, 0, 0, .21471],
            8217: [0, .69141, 0, 0, .21471],
            58112: [0, .62119, 0, 0, .49749],
            58113: [0, .62119, 0, 0, .4983],
            58114: [.18906, .69141, 0, 0, .33328],
            58115: [.18906, .69141, 0, 0, .32923],
            58116: [.18906, .47534, 0, 0, .50343],
            58117: [0, .69141, 0, 0, .33301],
            58118: [0, .62119, 0, 0, .33409],
            58119: [0, .47534, 0, 0, .50073]
        },
        "Main-Bold": {
            32: [0, 0, 0, 0, .25],
            33: [0, .69444, 0, 0, .35],
            34: [0, .69444, 0, 0, .60278],
            35: [.19444, .69444, 0, 0, .95833],
            36: [.05556, .75, 0, 0, .575],
            37: [.05556, .75, 0, 0, .95833],
            38: [0, .69444, 0, 0, .89444],
            39: [0, .69444, 0, 0, .31944],
            40: [.25, .75, 0, 0, .44722],
            41: [.25, .75, 0, 0, .44722],
            42: [0, .75, 0, 0, .575],
            43: [.13333, .63333, 0, 0, .89444],
            44: [.19444, .15556, 0, 0, .31944],
            45: [0, .44444, 0, 0, .38333],
            46: [0, .15556, 0, 0, .31944],
            47: [.25, .75, 0, 0, .575],
            48: [0, .64444, 0, 0, .575],
            49: [0, .64444, 0, 0, .575],
            50: [0, .64444, 0, 0, .575],
            51: [0, .64444, 0, 0, .575],
            52: [0, .64444, 0, 0, .575],
            53: [0, .64444, 0, 0, .575],
            54: [0, .64444, 0, 0, .575],
            55: [0, .64444, 0, 0, .575],
            56: [0, .64444, 0, 0, .575],
            57: [0, .64444, 0, 0, .575],
            58: [0, .44444, 0, 0, .31944],
            59: [.19444, .44444, 0, 0, .31944],
            60: [.08556, .58556, 0, 0, .89444],
            61: [-.10889, .39111, 0, 0, .89444],
            62: [.08556, .58556, 0, 0, .89444],
            63: [0, .69444, 0, 0, .54305],
            64: [0, .69444, 0, 0, .89444],
            65: [0, .68611, 0, 0, .86944],
            66: [0, .68611, 0, 0, .81805],
            67: [0, .68611, 0, 0, .83055],
            68: [0, .68611, 0, 0, .88194],
            69: [0, .68611, 0, 0, .75555],
            70: [0, .68611, 0, 0, .72361],
            71: [0, .68611, 0, 0, .90416],
            72: [0, .68611, 0, 0, .9],
            73: [0, .68611, 0, 0, .43611],
            74: [0, .68611, 0, 0, .59444],
            75: [0, .68611, 0, 0, .90138],
            76: [0, .68611, 0, 0, .69166],
            77: [0, .68611, 0, 0, 1.09166],
            78: [0, .68611, 0, 0, .9],
            79: [0, .68611, 0, 0, .86388],
            80: [0, .68611, 0, 0, .78611],
            81: [.19444, .68611, 0, 0, .86388],
            82: [0, .68611, 0, 0, .8625],
            83: [0, .68611, 0, 0, .63889],
            84: [0, .68611, 0, 0, .8],
            85: [0, .68611, 0, 0, .88472],
            86: [0, .68611, .01597, 0, .86944],
            87: [0, .68611, .01597, 0, 1.18888],
            88: [0, .68611, 0, 0, .86944],
            89: [0, .68611, .02875, 0, .86944],
            90: [0, .68611, 0, 0, .70277],
            91: [.25, .75, 0, 0, .31944],
            92: [.25, .75, 0, 0, .575],
            93: [.25, .75, 0, 0, .31944],
            94: [0, .69444, 0, 0, .575],
            95: [.31, .13444, .03194, 0, .575],
            97: [0, .44444, 0, 0, .55902],
            98: [0, .69444, 0, 0, .63889],
            99: [0, .44444, 0, 0, .51111],
            100: [0, .69444, 0, 0, .63889],
            101: [0, .44444, 0, 0, .52708],
            102: [0, .69444, .10903, 0, .35139],
            103: [.19444, .44444, .01597, 0, .575],
            104: [0, .69444, 0, 0, .63889],
            105: [0, .69444, 0, 0, .31944],
            106: [.19444, .69444, 0, 0, .35139],
            107: [0, .69444, 0, 0, .60694],
            108: [0, .69444, 0, 0, .31944],
            109: [0, .44444, 0, 0, .95833],
            110: [0, .44444, 0, 0, .63889],
            111: [0, .44444, 0, 0, .575],
            112: [.19444, .44444, 0, 0, .63889],
            113: [.19444, .44444, 0, 0, .60694],
            114: [0, .44444, 0, 0, .47361],
            115: [0, .44444, 0, 0, .45361],
            116: [0, .63492, 0, 0, .44722],
            117: [0, .44444, 0, 0, .63889],
            118: [0, .44444, .01597, 0, .60694],
            119: [0, .44444, .01597, 0, .83055],
            120: [0, .44444, 0, 0, .60694],
            121: [.19444, .44444, .01597, 0, .60694],
            122: [0, .44444, 0, 0, .51111],
            123: [.25, .75, 0, 0, .575],
            124: [.25, .75, 0, 0, .31944],
            125: [.25, .75, 0, 0, .575],
            126: [.35, .34444, 0, 0, .575],
            160: [0, 0, 0, 0, .25],
            163: [0, .69444, 0, 0, .86853],
            168: [0, .69444, 0, 0, .575],
            172: [0, .44444, 0, 0, .76666],
            176: [0, .69444, 0, 0, .86944],
            177: [.13333, .63333, 0, 0, .89444],
            184: [.17014, 0, 0, 0, .51111],
            198: [0, .68611, 0, 0, 1.04166],
            215: [.13333, .63333, 0, 0, .89444],
            216: [.04861, .73472, 0, 0, .89444],
            223: [0, .69444, 0, 0, .59722],
            230: [0, .44444, 0, 0, .83055],
            247: [.13333, .63333, 0, 0, .89444],
            248: [.09722, .54167, 0, 0, .575],
            305: [0, .44444, 0, 0, .31944],
            338: [0, .68611, 0, 0, 1.16944],
            339: [0, .44444, 0, 0, .89444],
            567: [.19444, .44444, 0, 0, .35139],
            710: [0, .69444, 0, 0, .575],
            711: [0, .63194, 0, 0, .575],
            713: [0, .59611, 0, 0, .575],
            714: [0, .69444, 0, 0, .575],
            715: [0, .69444, 0, 0, .575],
            728: [0, .69444, 0, 0, .575],
            729: [0, .69444, 0, 0, .31944],
            730: [0, .69444, 0, 0, .86944],
            732: [0, .69444, 0, 0, .575],
            733: [0, .69444, 0, 0, .575],
            915: [0, .68611, 0, 0, .69166],
            916: [0, .68611, 0, 0, .95833],
            920: [0, .68611, 0, 0, .89444],
            923: [0, .68611, 0, 0, .80555],
            926: [0, .68611, 0, 0, .76666],
            928: [0, .68611, 0, 0, .9],
            931: [0, .68611, 0, 0, .83055],
            933: [0, .68611, 0, 0, .89444],
            934: [0, .68611, 0, 0, .83055],
            936: [0, .68611, 0, 0, .89444],
            937: [0, .68611, 0, 0, .83055],
            8211: [0, .44444, .03194, 0, .575],
            8212: [0, .44444, .03194, 0, 1.14999],
            8216: [0, .69444, 0, 0, .31944],
            8217: [0, .69444, 0, 0, .31944],
            8220: [0, .69444, 0, 0, .60278],
            8221: [0, .69444, 0, 0, .60278],
            8224: [.19444, .69444, 0, 0, .51111],
            8225: [.19444, .69444, 0, 0, .51111],
            8242: [0, .55556, 0, 0, .34444],
            8407: [0, .72444, .15486, 0, .575],
            8463: [0, .69444, 0, 0, .66759],
            8465: [0, .69444, 0, 0, .83055],
            8467: [0, .69444, 0, 0, .47361],
            8472: [.19444, .44444, 0, 0, .74027],
            8476: [0, .69444, 0, 0, .83055],
            8501: [0, .69444, 0, 0, .70277],
            8592: [-.10889, .39111, 0, 0, 1.14999],
            8593: [.19444, .69444, 0, 0, .575],
            8594: [-.10889, .39111, 0, 0, 1.14999],
            8595: [.19444, .69444, 0, 0, .575],
            8596: [-.10889, .39111, 0, 0, 1.14999],
            8597: [.25, .75, 0, 0, .575],
            8598: [.19444, .69444, 0, 0, 1.14999],
            8599: [.19444, .69444, 0, 0, 1.14999],
            8600: [.19444, .69444, 0, 0, 1.14999],
            8601: [.19444, .69444, 0, 0, 1.14999],
            8636: [-.10889, .39111, 0, 0, 1.14999],
            8637: [-.10889, .39111, 0, 0, 1.14999],
            8640: [-.10889, .39111, 0, 0, 1.14999],
            8641: [-.10889, .39111, 0, 0, 1.14999],
            8656: [-.10889, .39111, 0, 0, 1.14999],
            8657: [.19444, .69444, 0, 0, .70277],
            8658: [-.10889, .39111, 0, 0, 1.14999],
            8659: [.19444, .69444, 0, 0, .70277],
            8660: [-.10889, .39111, 0, 0, 1.14999],
            8661: [.25, .75, 0, 0, .70277],
            8704: [0, .69444, 0, 0, .63889],
            8706: [0, .69444, .06389, 0, .62847],
            8707: [0, .69444, 0, 0, .63889],
            8709: [.05556, .75, 0, 0, .575],
            8711: [0, .68611, 0, 0, .95833],
            8712: [.08556, .58556, 0, 0, .76666],
            8715: [.08556, .58556, 0, 0, .76666],
            8722: [.13333, .63333, 0, 0, .89444],
            8723: [.13333, .63333, 0, 0, .89444],
            8725: [.25, .75, 0, 0, .575],
            8726: [.25, .75, 0, 0, .575],
            8727: [-.02778, .47222, 0, 0, .575],
            8728: [-.02639, .47361, 0, 0, .575],
            8729: [-.02639, .47361, 0, 0, .575],
            8730: [.18, .82, 0, 0, .95833],
            8733: [0, .44444, 0, 0, .89444],
            8734: [0, .44444, 0, 0, 1.14999],
            8736: [0, .69224, 0, 0, .72222],
            8739: [.25, .75, 0, 0, .31944],
            8741: [.25, .75, 0, 0, .575],
            8743: [0, .55556, 0, 0, .76666],
            8744: [0, .55556, 0, 0, .76666],
            8745: [0, .55556, 0, 0, .76666],
            8746: [0, .55556, 0, 0, .76666],
            8747: [.19444, .69444, .12778, 0, .56875],
            8764: [-.10889, .39111, 0, 0, .89444],
            8768: [.19444, .69444, 0, 0, .31944],
            8771: [.00222, .50222, 0, 0, .89444],
            8773: [.027, .638, 0, 0, .894],
            8776: [.02444, .52444, 0, 0, .89444],
            8781: [.00222, .50222, 0, 0, .89444],
            8801: [.00222, .50222, 0, 0, .89444],
            8804: [.19667, .69667, 0, 0, .89444],
            8805: [.19667, .69667, 0, 0, .89444],
            8810: [.08556, .58556, 0, 0, 1.14999],
            8811: [.08556, .58556, 0, 0, 1.14999],
            8826: [.08556, .58556, 0, 0, .89444],
            8827: [.08556, .58556, 0, 0, .89444],
            8834: [.08556, .58556, 0, 0, .89444],
            8835: [.08556, .58556, 0, 0, .89444],
            8838: [.19667, .69667, 0, 0, .89444],
            8839: [.19667, .69667, 0, 0, .89444],
            8846: [0, .55556, 0, 0, .76666],
            8849: [.19667, .69667, 0, 0, .89444],
            8850: [.19667, .69667, 0, 0, .89444],
            8851: [0, .55556, 0, 0, .76666],
            8852: [0, .55556, 0, 0, .76666],
            8853: [.13333, .63333, 0, 0, .89444],
            8854: [.13333, .63333, 0, 0, .89444],
            8855: [.13333, .63333, 0, 0, .89444],
            8856: [.13333, .63333, 0, 0, .89444],
            8857: [.13333, .63333, 0, 0, .89444],
            8866: [0, .69444, 0, 0, .70277],
            8867: [0, .69444, 0, 0, .70277],
            8868: [0, .69444, 0, 0, .89444],
            8869: [0, .69444, 0, 0, .89444],
            8900: [-.02639, .47361, 0, 0, .575],
            8901: [-.02639, .47361, 0, 0, .31944],
            8902: [-.02778, .47222, 0, 0, .575],
            8968: [.25, .75, 0, 0, .51111],
            8969: [.25, .75, 0, 0, .51111],
            8970: [.25, .75, 0, 0, .51111],
            8971: [.25, .75, 0, 0, .51111],
            8994: [-.13889, .36111, 0, 0, 1.14999],
            8995: [-.13889, .36111, 0, 0, 1.14999],
            9651: [.19444, .69444, 0, 0, 1.02222],
            9657: [-.02778, .47222, 0, 0, .575],
            9661: [.19444, .69444, 0, 0, 1.02222],
            9667: [-.02778, .47222, 0, 0, .575],
            9711: [.19444, .69444, 0, 0, 1.14999],
            9824: [.12963, .69444, 0, 0, .89444],
            9825: [.12963, .69444, 0, 0, .89444],
            9826: [.12963, .69444, 0, 0, .89444],
            9827: [.12963, .69444, 0, 0, .89444],
            9837: [0, .75, 0, 0, .44722],
            9838: [.19444, .69444, 0, 0, .44722],
            9839: [.19444, .69444, 0, 0, .44722],
            10216: [.25, .75, 0, 0, .44722],
            10217: [.25, .75, 0, 0, .44722],
            10815: [0, .68611, 0, 0, .9],
            10927: [.19667, .69667, 0, 0, .89444],
            10928: [.19667, .69667, 0, 0, .89444],
            57376: [.19444, .69444, 0, 0, 0]
        },
        "Main-BoldItalic": {
            32: [0, 0, 0, 0, .25],
            33: [0, .69444, .11417, 0, .38611],
            34: [0, .69444, .07939, 0, .62055],
            35: [.19444, .69444, .06833, 0, .94444],
            37: [.05556, .75, .12861, 0, .94444],
            38: [0, .69444, .08528, 0, .88555],
            39: [0, .69444, .12945, 0, .35555],
            40: [.25, .75, .15806, 0, .47333],
            41: [.25, .75, .03306, 0, .47333],
            42: [0, .75, .14333, 0, .59111],
            43: [.10333, .60333, .03306, 0, .88555],
            44: [.19444, .14722, 0, 0, .35555],
            45: [0, .44444, .02611, 0, .41444],
            46: [0, .14722, 0, 0, .35555],
            47: [.25, .75, .15806, 0, .59111],
            48: [0, .64444, .13167, 0, .59111],
            49: [0, .64444, .13167, 0, .59111],
            50: [0, .64444, .13167, 0, .59111],
            51: [0, .64444, .13167, 0, .59111],
            52: [.19444, .64444, .13167, 0, .59111],
            53: [0, .64444, .13167, 0, .59111],
            54: [0, .64444, .13167, 0, .59111],
            55: [.19444, .64444, .13167, 0, .59111],
            56: [0, .64444, .13167, 0, .59111],
            57: [0, .64444, .13167, 0, .59111],
            58: [0, .44444, .06695, 0, .35555],
            59: [.19444, .44444, .06695, 0, .35555],
            61: [-.10889, .39111, .06833, 0, .88555],
            63: [0, .69444, .11472, 0, .59111],
            64: [0, .69444, .09208, 0, .88555],
            65: [0, .68611, 0, 0, .86555],
            66: [0, .68611, .0992, 0, .81666],
            67: [0, .68611, .14208, 0, .82666],
            68: [0, .68611, .09062, 0, .87555],
            69: [0, .68611, .11431, 0, .75666],
            70: [0, .68611, .12903, 0, .72722],
            71: [0, .68611, .07347, 0, .89527],
            72: [0, .68611, .17208, 0, .8961],
            73: [0, .68611, .15681, 0, .47166],
            74: [0, .68611, .145, 0, .61055],
            75: [0, .68611, .14208, 0, .89499],
            76: [0, .68611, 0, 0, .69777],
            77: [0, .68611, .17208, 0, 1.07277],
            78: [0, .68611, .17208, 0, .8961],
            79: [0, .68611, .09062, 0, .85499],
            80: [0, .68611, .0992, 0, .78721],
            81: [.19444, .68611, .09062, 0, .85499],
            82: [0, .68611, .02559, 0, .85944],
            83: [0, .68611, .11264, 0, .64999],
            84: [0, .68611, .12903, 0, .7961],
            85: [0, .68611, .17208, 0, .88083],
            86: [0, .68611, .18625, 0, .86555],
            87: [0, .68611, .18625, 0, 1.15999],
            88: [0, .68611, .15681, 0, .86555],
            89: [0, .68611, .19803, 0, .86555],
            90: [0, .68611, .14208, 0, .70888],
            91: [.25, .75, .1875, 0, .35611],
            93: [.25, .75, .09972, 0, .35611],
            94: [0, .69444, .06709, 0, .59111],
            95: [.31, .13444, .09811, 0, .59111],
            97: [0, .44444, .09426, 0, .59111],
            98: [0, .69444, .07861, 0, .53222],
            99: [0, .44444, .05222, 0, .53222],
            100: [0, .69444, .10861, 0, .59111],
            101: [0, .44444, .085, 0, .53222],
            102: [.19444, .69444, .21778, 0, .4],
            103: [.19444, .44444, .105, 0, .53222],
            104: [0, .69444, .09426, 0, .59111],
            105: [0, .69326, .11387, 0, .35555],
            106: [.19444, .69326, .1672, 0, .35555],
            107: [0, .69444, .11111, 0, .53222],
            108: [0, .69444, .10861, 0, .29666],
            109: [0, .44444, .09426, 0, .94444],
            110: [0, .44444, .09426, 0, .64999],
            111: [0, .44444, .07861, 0, .59111],
            112: [.19444, .44444, .07861, 0, .59111],
            113: [.19444, .44444, .105, 0, .53222],
            114: [0, .44444, .11111, 0, .50167],
            115: [0, .44444, .08167, 0, .48694],
            116: [0, .63492, .09639, 0, .385],
            117: [0, .44444, .09426, 0, .62055],
            118: [0, .44444, .11111, 0, .53222],
            119: [0, .44444, .11111, 0, .76777],
            120: [0, .44444, .12583, 0, .56055],
            121: [.19444, .44444, .105, 0, .56166],
            122: [0, .44444, .13889, 0, .49055],
            126: [.35, .34444, .11472, 0, .59111],
            160: [0, 0, 0, 0, .25],
            168: [0, .69444, .11473, 0, .59111],
            176: [0, .69444, 0, 0, .94888],
            184: [.17014, 0, 0, 0, .53222],
            198: [0, .68611, .11431, 0, 1.02277],
            216: [.04861, .73472, .09062, 0, .88555],
            223: [.19444, .69444, .09736, 0, .665],
            230: [0, .44444, .085, 0, .82666],
            248: [.09722, .54167, .09458, 0, .59111],
            305: [0, .44444, .09426, 0, .35555],
            338: [0, .68611, .11431, 0, 1.14054],
            339: [0, .44444, .085, 0, .82666],
            567: [.19444, .44444, .04611, 0, .385],
            710: [0, .69444, .06709, 0, .59111],
            711: [0, .63194, .08271, 0, .59111],
            713: [0, .59444, .10444, 0, .59111],
            714: [0, .69444, .08528, 0, .59111],
            715: [0, .69444, 0, 0, .59111],
            728: [0, .69444, .10333, 0, .59111],
            729: [0, .69444, .12945, 0, .35555],
            730: [0, .69444, 0, 0, .94888],
            732: [0, .69444, .11472, 0, .59111],
            733: [0, .69444, .11472, 0, .59111],
            915: [0, .68611, .12903, 0, .69777],
            916: [0, .68611, 0, 0, .94444],
            920: [0, .68611, .09062, 0, .88555],
            923: [0, .68611, 0, 0, .80666],
            926: [0, .68611, .15092, 0, .76777],
            928: [0, .68611, .17208, 0, .8961],
            931: [0, .68611, .11431, 0, .82666],
            933: [0, .68611, .10778, 0, .88555],
            934: [0, .68611, .05632, 0, .82666],
            936: [0, .68611, .10778, 0, .88555],
            937: [0, .68611, .0992, 0, .82666],
            8211: [0, .44444, .09811, 0, .59111],
            8212: [0, .44444, .09811, 0, 1.18221],
            8216: [0, .69444, .12945, 0, .35555],
            8217: [0, .69444, .12945, 0, .35555],
            8220: [0, .69444, .16772, 0, .62055],
            8221: [0, .69444, .07939, 0, .62055]
        },
        "Main-Italic": {
            32: [0, 0, 0, 0, .25],
            33: [0, .69444, .12417, 0, .30667],
            34: [0, .69444, .06961, 0, .51444],
            35: [.19444, .69444, .06616, 0, .81777],
            37: [.05556, .75, .13639, 0, .81777],
            38: [0, .69444, .09694, 0, .76666],
            39: [0, .69444, .12417, 0, .30667],
            40: [.25, .75, .16194, 0, .40889],
            41: [.25, .75, .03694, 0, .40889],
            42: [0, .75, .14917, 0, .51111],
            43: [.05667, .56167, .03694, 0, .76666],
            44: [.19444, .10556, 0, 0, .30667],
            45: [0, .43056, .02826, 0, .35778],
            46: [0, .10556, 0, 0, .30667],
            47: [.25, .75, .16194, 0, .51111],
            48: [0, .64444, .13556, 0, .51111],
            49: [0, .64444, .13556, 0, .51111],
            50: [0, .64444, .13556, 0, .51111],
            51: [0, .64444, .13556, 0, .51111],
            52: [.19444, .64444, .13556, 0, .51111],
            53: [0, .64444, .13556, 0, .51111],
            54: [0, .64444, .13556, 0, .51111],
            55: [.19444, .64444, .13556, 0, .51111],
            56: [0, .64444, .13556, 0, .51111],
            57: [0, .64444, .13556, 0, .51111],
            58: [0, .43056, .0582, 0, .30667],
            59: [.19444, .43056, .0582, 0, .30667],
            61: [-.13313, .36687, .06616, 0, .76666],
            63: [0, .69444, .1225, 0, .51111],
            64: [0, .69444, .09597, 0, .76666],
            65: [0, .68333, 0, 0, .74333],
            66: [0, .68333, .10257, 0, .70389],
            67: [0, .68333, .14528, 0, .71555],
            68: [0, .68333, .09403, 0, .755],
            69: [0, .68333, .12028, 0, .67833],
            70: [0, .68333, .13305, 0, .65277],
            71: [0, .68333, .08722, 0, .77361],
            72: [0, .68333, .16389, 0, .74333],
            73: [0, .68333, .15806, 0, .38555],
            74: [0, .68333, .14028, 0, .525],
            75: [0, .68333, .14528, 0, .76888],
            76: [0, .68333, 0, 0, .62722],
            77: [0, .68333, .16389, 0, .89666],
            78: [0, .68333, .16389, 0, .74333],
            79: [0, .68333, .09403, 0, .76666],
            80: [0, .68333, .10257, 0, .67833],
            81: [.19444, .68333, .09403, 0, .76666],
            82: [0, .68333, .03868, 0, .72944],
            83: [0, .68333, .11972, 0, .56222],
            84: [0, .68333, .13305, 0, .71555],
            85: [0, .68333, .16389, 0, .74333],
            86: [0, .68333, .18361, 0, .74333],
            87: [0, .68333, .18361, 0, .99888],
            88: [0, .68333, .15806, 0, .74333],
            89: [0, .68333, .19383, 0, .74333],
            90: [0, .68333, .14528, 0, .61333],
            91: [.25, .75, .1875, 0, .30667],
            93: [.25, .75, .10528, 0, .30667],
            94: [0, .69444, .06646, 0, .51111],
            95: [.31, .12056, .09208, 0, .51111],
            97: [0, .43056, .07671, 0, .51111],
            98: [0, .69444, .06312, 0, .46],
            99: [0, .43056, .05653, 0, .46],
            100: [0, .69444, .10333, 0, .51111],
            101: [0, .43056, .07514, 0, .46],
            102: [.19444, .69444, .21194, 0, .30667],
            103: [.19444, .43056, .08847, 0, .46],
            104: [0, .69444, .07671, 0, .51111],
            105: [0, .65536, .1019, 0, .30667],
            106: [.19444, .65536, .14467, 0, .30667],
            107: [0, .69444, .10764, 0, .46],
            108: [0, .69444, .10333, 0, .25555],
            109: [0, .43056, .07671, 0, .81777],
            110: [0, .43056, .07671, 0, .56222],
            111: [0, .43056, .06312, 0, .51111],
            112: [.19444, .43056, .06312, 0, .51111],
            113: [.19444, .43056, .08847, 0, .46],
            114: [0, .43056, .10764, 0, .42166],
            115: [0, .43056, .08208, 0, .40889],
            116: [0, .61508, .09486, 0, .33222],
            117: [0, .43056, .07671, 0, .53666],
            118: [0, .43056, .10764, 0, .46],
            119: [0, .43056, .10764, 0, .66444],
            120: [0, .43056, .12042, 0, .46389],
            121: [.19444, .43056, .08847, 0, .48555],
            122: [0, .43056, .12292, 0, .40889],
            126: [.35, .31786, .11585, 0, .51111],
            160: [0, 0, 0, 0, .25],
            168: [0, .66786, .10474, 0, .51111],
            176: [0, .69444, 0, 0, .83129],
            184: [.17014, 0, 0, 0, .46],
            198: [0, .68333, .12028, 0, .88277],
            216: [.04861, .73194, .09403, 0, .76666],
            223: [.19444, .69444, .10514, 0, .53666],
            230: [0, .43056, .07514, 0, .71555],
            248: [.09722, .52778, .09194, 0, .51111],
            338: [0, .68333, .12028, 0, .98499],
            339: [0, .43056, .07514, 0, .71555],
            710: [0, .69444, .06646, 0, .51111],
            711: [0, .62847, .08295, 0, .51111],
            713: [0, .56167, .10333, 0, .51111],
            714: [0, .69444, .09694, 0, .51111],
            715: [0, .69444, 0, 0, .51111],
            728: [0, .69444, .10806, 0, .51111],
            729: [0, .66786, .11752, 0, .30667],
            730: [0, .69444, 0, 0, .83129],
            732: [0, .66786, .11585, 0, .51111],
            733: [0, .69444, .1225, 0, .51111],
            915: [0, .68333, .13305, 0, .62722],
            916: [0, .68333, 0, 0, .81777],
            920: [0, .68333, .09403, 0, .76666],
            923: [0, .68333, 0, 0, .69222],
            926: [0, .68333, .15294, 0, .66444],
            928: [0, .68333, .16389, 0, .74333],
            931: [0, .68333, .12028, 0, .71555],
            933: [0, .68333, .11111, 0, .76666],
            934: [0, .68333, .05986, 0, .71555],
            936: [0, .68333, .11111, 0, .76666],
            937: [0, .68333, .10257, 0, .71555],
            8211: [0, .43056, .09208, 0, .51111],
            8212: [0, .43056, .09208, 0, 1.02222],
            8216: [0, .69444, .12417, 0, .30667],
            8217: [0, .69444, .12417, 0, .30667],
            8220: [0, .69444, .1685, 0, .51444],
            8221: [0, .69444, .06961, 0, .51444],
            8463: [0, .68889, 0, 0, .54028]
        },
        "Main-Regular": {
            32: [0, 0, 0, 0, .25],
            33: [0, .69444, 0, 0, .27778],
            34: [0, .69444, 0, 0, .5],
            35: [.19444, .69444, 0, 0, .83334],
            36: [.05556, .75, 0, 0, .5],
            37: [.05556, .75, 0, 0, .83334],
            38: [0, .69444, 0, 0, .77778],
            39: [0, .69444, 0, 0, .27778],
            40: [.25, .75, 0, 0, .38889],
            41: [.25, .75, 0, 0, .38889],
            42: [0, .75, 0, 0, .5],
            43: [.08333, .58333, 0, 0, .77778],
            44: [.19444, .10556, 0, 0, .27778],
            45: [0, .43056, 0, 0, .33333],
            46: [0, .10556, 0, 0, .27778],
            47: [.25, .75, 0, 0, .5],
            48: [0, .64444, 0, 0, .5],
            49: [0, .64444, 0, 0, .5],
            50: [0, .64444, 0, 0, .5],
            51: [0, .64444, 0, 0, .5],
            52: [0, .64444, 0, 0, .5],
            53: [0, .64444, 0, 0, .5],
            54: [0, .64444, 0, 0, .5],
            55: [0, .64444, 0, 0, .5],
            56: [0, .64444, 0, 0, .5],
            57: [0, .64444, 0, 0, .5],
            58: [0, .43056, 0, 0, .27778],
            59: [.19444, .43056, 0, 0, .27778],
            60: [.0391, .5391, 0, 0, .77778],
            61: [-.13313, .36687, 0, 0, .77778],
            62: [.0391, .5391, 0, 0, .77778],
            63: [0, .69444, 0, 0, .47222],
            64: [0, .69444, 0, 0, .77778],
            65: [0, .68333, 0, 0, .75],
            66: [0, .68333, 0, 0, .70834],
            67: [0, .68333, 0, 0, .72222],
            68: [0, .68333, 0, 0, .76389],
            69: [0, .68333, 0, 0, .68056],
            70: [0, .68333, 0, 0, .65278],
            71: [0, .68333, 0, 0, .78472],
            72: [0, .68333, 0, 0, .75],
            73: [0, .68333, 0, 0, .36111],
            74: [0, .68333, 0, 0, .51389],
            75: [0, .68333, 0, 0, .77778],
            76: [0, .68333, 0, 0, .625],
            77: [0, .68333, 0, 0, .91667],
            78: [0, .68333, 0, 0, .75],
            79: [0, .68333, 0, 0, .77778],
            80: [0, .68333, 0, 0, .68056],
            81: [.19444, .68333, 0, 0, .77778],
            82: [0, .68333, 0, 0, .73611],
            83: [0, .68333, 0, 0, .55556],
            84: [0, .68333, 0, 0, .72222],
            85: [0, .68333, 0, 0, .75],
            86: [0, .68333, .01389, 0, .75],
            87: [0, .68333, .01389, 0, 1.02778],
            88: [0, .68333, 0, 0, .75],
            89: [0, .68333, .025, 0, .75],
            90: [0, .68333, 0, 0, .61111],
            91: [.25, .75, 0, 0, .27778],
            92: [.25, .75, 0, 0, .5],
            93: [.25, .75, 0, 0, .27778],
            94: [0, .69444, 0, 0, .5],
            95: [.31, .12056, .02778, 0, .5],
            97: [0, .43056, 0, 0, .5],
            98: [0, .69444, 0, 0, .55556],
            99: [0, .43056, 0, 0, .44445],
            100: [0, .69444, 0, 0, .55556],
            101: [0, .43056, 0, 0, .44445],
            102: [0, .69444, .07778, 0, .30556],
            103: [.19444, .43056, .01389, 0, .5],
            104: [0, .69444, 0, 0, .55556],
            105: [0, .66786, 0, 0, .27778],
            106: [.19444, .66786, 0, 0, .30556],
            107: [0, .69444, 0, 0, .52778],
            108: [0, .69444, 0, 0, .27778],
            109: [0, .43056, 0, 0, .83334],
            110: [0, .43056, 0, 0, .55556],
            111: [0, .43056, 0, 0, .5],
            112: [.19444, .43056, 0, 0, .55556],
            113: [.19444, .43056, 0, 0, .52778],
            114: [0, .43056, 0, 0, .39167],
            115: [0, .43056, 0, 0, .39445],
            116: [0, .61508, 0, 0, .38889],
            117: [0, .43056, 0, 0, .55556],
            118: [0, .43056, .01389, 0, .52778],
            119: [0, .43056, .01389, 0, .72222],
            120: [0, .43056, 0, 0, .52778],
            121: [.19444, .43056, .01389, 0, .52778],
            122: [0, .43056, 0, 0, .44445],
            123: [.25, .75, 0, 0, .5],
            124: [.25, .75, 0, 0, .27778],
            125: [.25, .75, 0, 0, .5],
            126: [.35, .31786, 0, 0, .5],
            160: [0, 0, 0, 0, .25],
            163: [0, .69444, 0, 0, .76909],
            167: [.19444, .69444, 0, 0, .44445],
            168: [0, .66786, 0, 0, .5],
            172: [0, .43056, 0, 0, .66667],
            176: [0, .69444, 0, 0, .75],
            177: [.08333, .58333, 0, 0, .77778],
            182: [.19444, .69444, 0, 0, .61111],
            184: [.17014, 0, 0, 0, .44445],
            198: [0, .68333, 0, 0, .90278],
            215: [.08333, .58333, 0, 0, .77778],
            216: [.04861, .73194, 0, 0, .77778],
            223: [0, .69444, 0, 0, .5],
            230: [0, .43056, 0, 0, .72222],
            247: [.08333, .58333, 0, 0, .77778],
            248: [.09722, .52778, 0, 0, .5],
            305: [0, .43056, 0, 0, .27778],
            338: [0, .68333, 0, 0, 1.01389],
            339: [0, .43056, 0, 0, .77778],
            567: [.19444, .43056, 0, 0, .30556],
            710: [0, .69444, 0, 0, .5],
            711: [0, .62847, 0, 0, .5],
            713: [0, .56778, 0, 0, .5],
            714: [0, .69444, 0, 0, .5],
            715: [0, .69444, 0, 0, .5],
            728: [0, .69444, 0, 0, .5],
            729: [0, .66786, 0, 0, .27778],
            730: [0, .69444, 0, 0, .75],
            732: [0, .66786, 0, 0, .5],
            733: [0, .69444, 0, 0, .5],
            915: [0, .68333, 0, 0, .625],
            916: [0, .68333, 0, 0, .83334],
            920: [0, .68333, 0, 0, .77778],
            923: [0, .68333, 0, 0, .69445],
            926: [0, .68333, 0, 0, .66667],
            928: [0, .68333, 0, 0, .75],
            931: [0, .68333, 0, 0, .72222],
            933: [0, .68333, 0, 0, .77778],
            934: [0, .68333, 0, 0, .72222],
            936: [0, .68333, 0, 0, .77778],
            937: [0, .68333, 0, 0, .72222],
            8211: [0, .43056, .02778, 0, .5],
            8212: [0, .43056, .02778, 0, 1],
            8216: [0, .69444, 0, 0, .27778],
            8217: [0, .69444, 0, 0, .27778],
            8220: [0, .69444, 0, 0, .5],
            8221: [0, .69444, 0, 0, .5],
            8224: [.19444, .69444, 0, 0, .44445],
            8225: [.19444, .69444, 0, 0, .44445],
            8230: [0, .123, 0, 0, 1.172],
            8242: [0, .55556, 0, 0, .275],
            8407: [0, .71444, .15382, 0, .5],
            8463: [0, .68889, 0, 0, .54028],
            8465: [0, .69444, 0, 0, .72222],
            8467: [0, .69444, 0, .11111, .41667],
            8472: [.19444, .43056, 0, .11111, .63646],
            8476: [0, .69444, 0, 0, .72222],
            8501: [0, .69444, 0, 0, .61111],
            8592: [-.13313, .36687, 0, 0, 1],
            8593: [.19444, .69444, 0, 0, .5],
            8594: [-.13313, .36687, 0, 0, 1],
            8595: [.19444, .69444, 0, 0, .5],
            8596: [-.13313, .36687, 0, 0, 1],
            8597: [.25, .75, 0, 0, .5],
            8598: [.19444, .69444, 0, 0, 1],
            8599: [.19444, .69444, 0, 0, 1],
            8600: [.19444, .69444, 0, 0, 1],
            8601: [.19444, .69444, 0, 0, 1],
            8614: [.011, .511, 0, 0, 1],
            8617: [.011, .511, 0, 0, 1.126],
            8618: [.011, .511, 0, 0, 1.126],
            8636: [-.13313, .36687, 0, 0, 1],
            8637: [-.13313, .36687, 0, 0, 1],
            8640: [-.13313, .36687, 0, 0, 1],
            8641: [-.13313, .36687, 0, 0, 1],
            8652: [.011, .671, 0, 0, 1],
            8656: [-.13313, .36687, 0, 0, 1],
            8657: [.19444, .69444, 0, 0, .61111],
            8658: [-.13313, .36687, 0, 0, 1],
            8659: [.19444, .69444, 0, 0, .61111],
            8660: [-.13313, .36687, 0, 0, 1],
            8661: [.25, .75, 0, 0, .61111],
            8704: [0, .69444, 0, 0, .55556],
            8706: [0, .69444, .05556, .08334, .5309],
            8707: [0, .69444, 0, 0, .55556],
            8709: [.05556, .75, 0, 0, .5],
            8711: [0, .68333, 0, 0, .83334],
            8712: [.0391, .5391, 0, 0, .66667],
            8715: [.0391, .5391, 0, 0, .66667],
            8722: [.08333, .58333, 0, 0, .77778],
            8723: [.08333, .58333, 0, 0, .77778],
            8725: [.25, .75, 0, 0, .5],
            8726: [.25, .75, 0, 0, .5],
            8727: [-.03472, .46528, 0, 0, .5],
            8728: [-.05555, .44445, 0, 0, .5],
            8729: [-.05555, .44445, 0, 0, .5],
            8730: [.2, .8, 0, 0, .83334],
            8733: [0, .43056, 0, 0, .77778],
            8734: [0, .43056, 0, 0, 1],
            8736: [0, .69224, 0, 0, .72222],
            8739: [.25, .75, 0, 0, .27778],
            8741: [.25, .75, 0, 0, .5],
            8743: [0, .55556, 0, 0, .66667],
            8744: [0, .55556, 0, 0, .66667],
            8745: [0, .55556, 0, 0, .66667],
            8746: [0, .55556, 0, 0, .66667],
            8747: [.19444, .69444, .11111, 0, .41667],
            8764: [-.13313, .36687, 0, 0, .77778],
            8768: [.19444, .69444, 0, 0, .27778],
            8771: [-.03625, .46375, 0, 0, .77778],
            8773: [-.022, .589, 0, 0, .778],
            8776: [-.01688, .48312, 0, 0, .77778],
            8781: [-.03625, .46375, 0, 0, .77778],
            8784: [-.133, .673, 0, 0, .778],
            8801: [-.03625, .46375, 0, 0, .77778],
            8804: [.13597, .63597, 0, 0, .77778],
            8805: [.13597, .63597, 0, 0, .77778],
            8810: [.0391, .5391, 0, 0, 1],
            8811: [.0391, .5391, 0, 0, 1],
            8826: [.0391, .5391, 0, 0, .77778],
            8827: [.0391, .5391, 0, 0, .77778],
            8834: [.0391, .5391, 0, 0, .77778],
            8835: [.0391, .5391, 0, 0, .77778],
            8838: [.13597, .63597, 0, 0, .77778],
            8839: [.13597, .63597, 0, 0, .77778],
            8846: [0, .55556, 0, 0, .66667],
            8849: [.13597, .63597, 0, 0, .77778],
            8850: [.13597, .63597, 0, 0, .77778],
            8851: [0, .55556, 0, 0, .66667],
            8852: [0, .55556, 0, 0, .66667],
            8853: [.08333, .58333, 0, 0, .77778],
            8854: [.08333, .58333, 0, 0, .77778],
            8855: [.08333, .58333, 0, 0, .77778],
            8856: [.08333, .58333, 0, 0, .77778],
            8857: [.08333, .58333, 0, 0, .77778],
            8866: [0, .69444, 0, 0, .61111],
            8867: [0, .69444, 0, 0, .61111],
            8868: [0, .69444, 0, 0, .77778],
            8869: [0, .69444, 0, 0, .77778],
            8872: [.249, .75, 0, 0, .867],
            8900: [-.05555, .44445, 0, 0, .5],
            8901: [-.05555, .44445, 0, 0, .27778],
            8902: [-.03472, .46528, 0, 0, .5],
            8904: [.005, .505, 0, 0, .9],
            8942: [.03, .903, 0, 0, .278],
            8943: [-.19, .313, 0, 0, 1.172],
            8945: [-.1, .823, 0, 0, 1.282],
            8968: [.25, .75, 0, 0, .44445],
            8969: [.25, .75, 0, 0, .44445],
            8970: [.25, .75, 0, 0, .44445],
            8971: [.25, .75, 0, 0, .44445],
            8994: [-.14236, .35764, 0, 0, 1],
            8995: [-.14236, .35764, 0, 0, 1],
            9136: [.244, .744, 0, 0, .412],
            9137: [.244, .745, 0, 0, .412],
            9651: [.19444, .69444, 0, 0, .88889],
            9657: [-.03472, .46528, 0, 0, .5],
            9661: [.19444, .69444, 0, 0, .88889],
            9667: [-.03472, .46528, 0, 0, .5],
            9711: [.19444, .69444, 0, 0, 1],
            9824: [.12963, .69444, 0, 0, .77778],
            9825: [.12963, .69444, 0, 0, .77778],
            9826: [.12963, .69444, 0, 0, .77778],
            9827: [.12963, .69444, 0, 0, .77778],
            9837: [0, .75, 0, 0, .38889],
            9838: [.19444, .69444, 0, 0, .38889],
            9839: [.19444, .69444, 0, 0, .38889],
            10216: [.25, .75, 0, 0, .38889],
            10217: [.25, .75, 0, 0, .38889],
            10222: [.244, .744, 0, 0, .412],
            10223: [.244, .745, 0, 0, .412],
            10229: [.011, .511, 0, 0, 1.609],
            10230: [.011, .511, 0, 0, 1.638],
            10231: [.011, .511, 0, 0, 1.859],
            10232: [.024, .525, 0, 0, 1.609],
            10233: [.024, .525, 0, 0, 1.638],
            10234: [.024, .525, 0, 0, 1.858],
            10236: [.011, .511, 0, 0, 1.638],
            10815: [0, .68333, 0, 0, .75],
            10927: [.13597, .63597, 0, 0, .77778],
            10928: [.13597, .63597, 0, 0, .77778],
            57376: [.19444, .69444, 0, 0, 0]
        },
        "Math-BoldItalic": {
            32: [0, 0, 0, 0, .25],
            48: [0, .44444, 0, 0, .575],
            49: [0, .44444, 0, 0, .575],
            50: [0, .44444, 0, 0, .575],
            51: [.19444, .44444, 0, 0, .575],
            52: [.19444, .44444, 0, 0, .575],
            53: [.19444, .44444, 0, 0, .575],
            54: [0, .64444, 0, 0, .575],
            55: [.19444, .44444, 0, 0, .575],
            56: [0, .64444, 0, 0, .575],
            57: [.19444, .44444, 0, 0, .575],
            65: [0, .68611, 0, 0, .86944],
            66: [0, .68611, .04835, 0, .8664],
            67: [0, .68611, .06979, 0, .81694],
            68: [0, .68611, .03194, 0, .93812],
            69: [0, .68611, .05451, 0, .81007],
            70: [0, .68611, .15972, 0, .68889],
            71: [0, .68611, 0, 0, .88673],
            72: [0, .68611, .08229, 0, .98229],
            73: [0, .68611, .07778, 0, .51111],
            74: [0, .68611, .10069, 0, .63125],
            75: [0, .68611, .06979, 0, .97118],
            76: [0, .68611, 0, 0, .75555],
            77: [0, .68611, .11424, 0, 1.14201],
            78: [0, .68611, .11424, 0, .95034],
            79: [0, .68611, .03194, 0, .83666],
            80: [0, .68611, .15972, 0, .72309],
            81: [.19444, .68611, 0, 0, .86861],
            82: [0, .68611, .00421, 0, .87235],
            83: [0, .68611, .05382, 0, .69271],
            84: [0, .68611, .15972, 0, .63663],
            85: [0, .68611, .11424, 0, .80027],
            86: [0, .68611, .25555, 0, .67778],
            87: [0, .68611, .15972, 0, 1.09305],
            88: [0, .68611, .07778, 0, .94722],
            89: [0, .68611, .25555, 0, .67458],
            90: [0, .68611, .06979, 0, .77257],
            97: [0, .44444, 0, 0, .63287],
            98: [0, .69444, 0, 0, .52083],
            99: [0, .44444, 0, 0, .51342],
            100: [0, .69444, 0, 0, .60972],
            101: [0, .44444, 0, 0, .55361],
            102: [.19444, .69444, .11042, 0, .56806],
            103: [.19444, .44444, .03704, 0, .5449],
            104: [0, .69444, 0, 0, .66759],
            105: [0, .69326, 0, 0, .4048],
            106: [.19444, .69326, .0622, 0, .47083],
            107: [0, .69444, .01852, 0, .6037],
            108: [0, .69444, .0088, 0, .34815],
            109: [0, .44444, 0, 0, 1.0324],
            110: [0, .44444, 0, 0, .71296],
            111: [0, .44444, 0, 0, .58472],
            112: [.19444, .44444, 0, 0, .60092],
            113: [.19444, .44444, .03704, 0, .54213],
            114: [0, .44444, .03194, 0, .5287],
            115: [0, .44444, 0, 0, .53125],
            116: [0, .63492, 0, 0, .41528],
            117: [0, .44444, 0, 0, .68102],
            118: [0, .44444, .03704, 0, .56666],
            119: [0, .44444, .02778, 0, .83148],
            120: [0, .44444, 0, 0, .65903],
            121: [.19444, .44444, .03704, 0, .59028],
            122: [0, .44444, .04213, 0, .55509],
            160: [0, 0, 0, 0, .25],
            915: [0, .68611, .15972, 0, .65694],
            916: [0, .68611, 0, 0, .95833],
            920: [0, .68611, .03194, 0, .86722],
            923: [0, .68611, 0, 0, .80555],
            926: [0, .68611, .07458, 0, .84125],
            928: [0, .68611, .08229, 0, .98229],
            931: [0, .68611, .05451, 0, .88507],
            933: [0, .68611, .15972, 0, .67083],
            934: [0, .68611, 0, 0, .76666],
            936: [0, .68611, .11653, 0, .71402],
            937: [0, .68611, .04835, 0, .8789],
            945: [0, .44444, 0, 0, .76064],
            946: [.19444, .69444, .03403, 0, .65972],
            947: [.19444, .44444, .06389, 0, .59003],
            948: [0, .69444, .03819, 0, .52222],
            949: [0, .44444, 0, 0, .52882],
            950: [.19444, .69444, .06215, 0, .50833],
            951: [.19444, .44444, .03704, 0, .6],
            952: [0, .69444, .03194, 0, .5618],
            953: [0, .44444, 0, 0, .41204],
            954: [0, .44444, 0, 0, .66759],
            955: [0, .69444, 0, 0, .67083],
            956: [.19444, .44444, 0, 0, .70787],
            957: [0, .44444, .06898, 0, .57685],
            958: [.19444, .69444, .03021, 0, .50833],
            959: [0, .44444, 0, 0, .58472],
            960: [0, .44444, .03704, 0, .68241],
            961: [.19444, .44444, 0, 0, .6118],
            962: [.09722, .44444, .07917, 0, .42361],
            963: [0, .44444, .03704, 0, .68588],
            964: [0, .44444, .13472, 0, .52083],
            965: [0, .44444, .03704, 0, .63055],
            966: [.19444, .44444, 0, 0, .74722],
            967: [.19444, .44444, 0, 0, .71805],
            968: [.19444, .69444, .03704, 0, .75833],
            969: [0, .44444, .03704, 0, .71782],
            977: [0, .69444, 0, 0, .69155],
            981: [.19444, .69444, 0, 0, .7125],
            982: [0, .44444, .03194, 0, .975],
            1009: [.19444, .44444, 0, 0, .6118],
            1013: [0, .44444, 0, 0, .48333],
            57649: [0, .44444, 0, 0, .39352],
            57911: [.19444, .44444, 0, 0, .43889]
        },
        "Math-Italic": {
            32: [0, 0, 0, 0, .25],
            48: [0, .43056, 0, 0, .5],
            49: [0, .43056, 0, 0, .5],
            50: [0, .43056, 0, 0, .5],
            51: [.19444, .43056, 0, 0, .5],
            52: [.19444, .43056, 0, 0, .5],
            53: [.19444, .43056, 0, 0, .5],
            54: [0, .64444, 0, 0, .5],
            55: [.19444, .43056, 0, 0, .5],
            56: [0, .64444, 0, 0, .5],
            57: [.19444, .43056, 0, 0, .5],
            65: [0, .68333, 0, .13889, .75],
            66: [0, .68333, .05017, .08334, .75851],
            67: [0, .68333, .07153, .08334, .71472],
            68: [0, .68333, .02778, .05556, .82792],
            69: [0, .68333, .05764, .08334, .7382],
            70: [0, .68333, .13889, .08334, .64306],
            71: [0, .68333, 0, .08334, .78625],
            72: [0, .68333, .08125, .05556, .83125],
            73: [0, .68333, .07847, .11111, .43958],
            74: [0, .68333, .09618, .16667, .55451],
            75: [0, .68333, .07153, .05556, .84931],
            76: [0, .68333, 0, .02778, .68056],
            77: [0, .68333, .10903, .08334, .97014],
            78: [0, .68333, .10903, .08334, .80347],
            79: [0, .68333, .02778, .08334, .76278],
            80: [0, .68333, .13889, .08334, .64201],
            81: [.19444, .68333, 0, .08334, .79056],
            82: [0, .68333, .00773, .08334, .75929],
            83: [0, .68333, .05764, .08334, .6132],
            84: [0, .68333, .13889, .08334, .58438],
            85: [0, .68333, .10903, .02778, .68278],
            86: [0, .68333, .22222, 0, .58333],
            87: [0, .68333, .13889, 0, .94445],
            88: [0, .68333, .07847, .08334, .82847],
            89: [0, .68333, .22222, 0, .58056],
            90: [0, .68333, .07153, .08334, .68264],
            97: [0, .43056, 0, 0, .52859],
            98: [0, .69444, 0, 0, .42917],
            99: [0, .43056, 0, .05556, .43276],
            100: [0, .69444, 0, .16667, .52049],
            101: [0, .43056, 0, .05556, .46563],
            102: [.19444, .69444, .10764, .16667, .48959],
            103: [.19444, .43056, .03588, .02778, .47697],
            104: [0, .69444, 0, 0, .57616],
            105: [0, .65952, 0, 0, .34451],
            106: [.19444, .65952, .05724, 0, .41181],
            107: [0, .69444, .03148, 0, .5206],
            108: [0, .69444, .01968, .08334, .29838],
            109: [0, .43056, 0, 0, .87801],
            110: [0, .43056, 0, 0, .60023],
            111: [0, .43056, 0, .05556, .48472],
            112: [.19444, .43056, 0, .08334, .50313],
            113: [.19444, .43056, .03588, .08334, .44641],
            114: [0, .43056, .02778, .05556, .45116],
            115: [0, .43056, 0, .05556, .46875],
            116: [0, .61508, 0, .08334, .36111],
            117: [0, .43056, 0, .02778, .57246],
            118: [0, .43056, .03588, .02778, .48472],
            119: [0, .43056, .02691, .08334, .71592],
            120: [0, .43056, 0, .02778, .57153],
            121: [.19444, .43056, .03588, .05556, .49028],
            122: [0, .43056, .04398, .05556, .46505],
            160: [0, 0, 0, 0, .25],
            915: [0, .68333, .13889, .08334, .61528],
            916: [0, .68333, 0, .16667, .83334],
            920: [0, .68333, .02778, .08334, .76278],
            923: [0, .68333, 0, .16667, .69445],
            926: [0, .68333, .07569, .08334, .74236],
            928: [0, .68333, .08125, .05556, .83125],
            931: [0, .68333, .05764, .08334, .77986],
            933: [0, .68333, .13889, .05556, .58333],
            934: [0, .68333, 0, .08334, .66667],
            936: [0, .68333, .11, .05556, .61222],
            937: [0, .68333, .05017, .08334, .7724],
            945: [0, .43056, .0037, .02778, .6397],
            946: [.19444, .69444, .05278, .08334, .56563],
            947: [.19444, .43056, .05556, 0, .51773],
            948: [0, .69444, .03785, .05556, .44444],
            949: [0, .43056, 0, .08334, .46632],
            950: [.19444, .69444, .07378, .08334, .4375],
            951: [.19444, .43056, .03588, .05556, .49653],
            952: [0, .69444, .02778, .08334, .46944],
            953: [0, .43056, 0, .05556, .35394],
            954: [0, .43056, 0, 0, .57616],
            955: [0, .69444, 0, 0, .58334],
            956: [.19444, .43056, 0, .02778, .60255],
            957: [0, .43056, .06366, .02778, .49398],
            958: [.19444, .69444, .04601, .11111, .4375],
            959: [0, .43056, 0, .05556, .48472],
            960: [0, .43056, .03588, 0, .57003],
            961: [.19444, .43056, 0, .08334, .51702],
            962: [.09722, .43056, .07986, .08334, .36285],
            963: [0, .43056, .03588, 0, .57141],
            964: [0, .43056, .1132, .02778, .43715],
            965: [0, .43056, .03588, .02778, .54028],
            966: [.19444, .43056, 0, .08334, .65417],
            967: [.19444, .43056, 0, .05556, .62569],
            968: [.19444, .69444, .03588, .11111, .65139],
            969: [0, .43056, .03588, 0, .62245],
            977: [0, .69444, 0, .08334, .59144],
            981: [.19444, .69444, 0, .08334, .59583],
            982: [0, .43056, .02778, 0, .82813],
            1009: [.19444, .43056, 0, .08334, .51702],
            1013: [0, .43056, 0, .05556, .4059],
            57649: [0, .43056, 0, .02778, .32246],
            57911: [.19444, .43056, 0, .08334, .38403]
        },
        "SansSerif-Bold": {
            32: [0, 0, 0, 0, .25],
            33: [0, .69444, 0, 0, .36667],
            34: [0, .69444, 0, 0, .55834],
            35: [.19444, .69444, 0, 0, .91667],
            36: [.05556, .75, 0, 0, .55],
            37: [.05556, .75, 0, 0, 1.02912],
            38: [0, .69444, 0, 0, .83056],
            39: [0, .69444, 0, 0, .30556],
            40: [.25, .75, 0, 0, .42778],
            41: [.25, .75, 0, 0, .42778],
            42: [0, .75, 0, 0, .55],
            43: [.11667, .61667, 0, 0, .85556],
            44: [.10556, .13056, 0, 0, .30556],
            45: [0, .45833, 0, 0, .36667],
            46: [0, .13056, 0, 0, .30556],
            47: [.25, .75, 0, 0, .55],
            48: [0, .69444, 0, 0, .55],
            49: [0, .69444, 0, 0, .55],
            50: [0, .69444, 0, 0, .55],
            51: [0, .69444, 0, 0, .55],
            52: [0, .69444, 0, 0, .55],
            53: [0, .69444, 0, 0, .55],
            54: [0, .69444, 0, 0, .55],
            55: [0, .69444, 0, 0, .55],
            56: [0, .69444, 0, 0, .55],
            57: [0, .69444, 0, 0, .55],
            58: [0, .45833, 0, 0, .30556],
            59: [.10556, .45833, 0, 0, .30556],
            61: [-.09375, .40625, 0, 0, .85556],
            63: [0, .69444, 0, 0, .51945],
            64: [0, .69444, 0, 0, .73334],
            65: [0, .69444, 0, 0, .73334],
            66: [0, .69444, 0, 0, .73334],
            67: [0, .69444, 0, 0, .70278],
            68: [0, .69444, 0, 0, .79445],
            69: [0, .69444, 0, 0, .64167],
            70: [0, .69444, 0, 0, .61111],
            71: [0, .69444, 0, 0, .73334],
            72: [0, .69444, 0, 0, .79445],
            73: [0, .69444, 0, 0, .33056],
            74: [0, .69444, 0, 0, .51945],
            75: [0, .69444, 0, 0, .76389],
            76: [0, .69444, 0, 0, .58056],
            77: [0, .69444, 0, 0, .97778],
            78: [0, .69444, 0, 0, .79445],
            79: [0, .69444, 0, 0, .79445],
            80: [0, .69444, 0, 0, .70278],
            81: [.10556, .69444, 0, 0, .79445],
            82: [0, .69444, 0, 0, .70278],
            83: [0, .69444, 0, 0, .61111],
            84: [0, .69444, 0, 0, .73334],
            85: [0, .69444, 0, 0, .76389],
            86: [0, .69444, .01528, 0, .73334],
            87: [0, .69444, .01528, 0, 1.03889],
            88: [0, .69444, 0, 0, .73334],
            89: [0, .69444, .0275, 0, .73334],
            90: [0, .69444, 0, 0, .67223],
            91: [.25, .75, 0, 0, .34306],
            93: [.25, .75, 0, 0, .34306],
            94: [0, .69444, 0, 0, .55],
            95: [.35, .10833, .03056, 0, .55],
            97: [0, .45833, 0, 0, .525],
            98: [0, .69444, 0, 0, .56111],
            99: [0, .45833, 0, 0, .48889],
            100: [0, .69444, 0, 0, .56111],
            101: [0, .45833, 0, 0, .51111],
            102: [0, .69444, .07639, 0, .33611],
            103: [.19444, .45833, .01528, 0, .55],
            104: [0, .69444, 0, 0, .56111],
            105: [0, .69444, 0, 0, .25556],
            106: [.19444, .69444, 0, 0, .28611],
            107: [0, .69444, 0, 0, .53056],
            108: [0, .69444, 0, 0, .25556],
            109: [0, .45833, 0, 0, .86667],
            110: [0, .45833, 0, 0, .56111],
            111: [0, .45833, 0, 0, .55],
            112: [.19444, .45833, 0, 0, .56111],
            113: [.19444, .45833, 0, 0, .56111],
            114: [0, .45833, .01528, 0, .37222],
            115: [0, .45833, 0, 0, .42167],
            116: [0, .58929, 0, 0, .40417],
            117: [0, .45833, 0, 0, .56111],
            118: [0, .45833, .01528, 0, .5],
            119: [0, .45833, .01528, 0, .74445],
            120: [0, .45833, 0, 0, .5],
            121: [.19444, .45833, .01528, 0, .5],
            122: [0, .45833, 0, 0, .47639],
            126: [.35, .34444, 0, 0, .55],
            160: [0, 0, 0, 0, .25],
            168: [0, .69444, 0, 0, .55],
            176: [0, .69444, 0, 0, .73334],
            180: [0, .69444, 0, 0, .55],
            184: [.17014, 0, 0, 0, .48889],
            305: [0, .45833, 0, 0, .25556],
            567: [.19444, .45833, 0, 0, .28611],
            710: [0, .69444, 0, 0, .55],
            711: [0, .63542, 0, 0, .55],
            713: [0, .63778, 0, 0, .55],
            728: [0, .69444, 0, 0, .55],
            729: [0, .69444, 0, 0, .30556],
            730: [0, .69444, 0, 0, .73334],
            732: [0, .69444, 0, 0, .55],
            733: [0, .69444, 0, 0, .55],
            915: [0, .69444, 0, 0, .58056],
            916: [0, .69444, 0, 0, .91667],
            920: [0, .69444, 0, 0, .85556],
            923: [0, .69444, 0, 0, .67223],
            926: [0, .69444, 0, 0, .73334],
            928: [0, .69444, 0, 0, .79445],
            931: [0, .69444, 0, 0, .79445],
            933: [0, .69444, 0, 0, .85556],
            934: [0, .69444, 0, 0, .79445],
            936: [0, .69444, 0, 0, .85556],
            937: [0, .69444, 0, 0, .79445],
            8211: [0, .45833, .03056, 0, .55],
            8212: [0, .45833, .03056, 0, 1.10001],
            8216: [0, .69444, 0, 0, .30556],
            8217: [0, .69444, 0, 0, .30556],
            8220: [0, .69444, 0, 0, .55834],
            8221: [0, .69444, 0, 0, .55834]
        },
        "SansSerif-Italic": {
            32: [0, 0, 0, 0, .25],
            33: [0, .69444, .05733, 0, .31945],
            34: [0, .69444, .00316, 0, .5],
            35: [.19444, .69444, .05087, 0, .83334],
            36: [.05556, .75, .11156, 0, .5],
            37: [.05556, .75, .03126, 0, .83334],
            38: [0, .69444, .03058, 0, .75834],
            39: [0, .69444, .07816, 0, .27778],
            40: [.25, .75, .13164, 0, .38889],
            41: [.25, .75, .02536, 0, .38889],
            42: [0, .75, .11775, 0, .5],
            43: [.08333, .58333, .02536, 0, .77778],
            44: [.125, .08333, 0, 0, .27778],
            45: [0, .44444, .01946, 0, .33333],
            46: [0, .08333, 0, 0, .27778],
            47: [.25, .75, .13164, 0, .5],
            48: [0, .65556, .11156, 0, .5],
            49: [0, .65556, .11156, 0, .5],
            50: [0, .65556, .11156, 0, .5],
            51: [0, .65556, .11156, 0, .5],
            52: [0, .65556, .11156, 0, .5],
            53: [0, .65556, .11156, 0, .5],
            54: [0, .65556, .11156, 0, .5],
            55: [0, .65556, .11156, 0, .5],
            56: [0, .65556, .11156, 0, .5],
            57: [0, .65556, .11156, 0, .5],
            58: [0, .44444, .02502, 0, .27778],
            59: [.125, .44444, .02502, 0, .27778],
            61: [-.13, .37, .05087, 0, .77778],
            63: [0, .69444, .11809, 0, .47222],
            64: [0, .69444, .07555, 0, .66667],
            65: [0, .69444, 0, 0, .66667],
            66: [0, .69444, .08293, 0, .66667],
            67: [0, .69444, .11983, 0, .63889],
            68: [0, .69444, .07555, 0, .72223],
            69: [0, .69444, .11983, 0, .59722],
            70: [0, .69444, .13372, 0, .56945],
            71: [0, .69444, .11983, 0, .66667],
            72: [0, .69444, .08094, 0, .70834],
            73: [0, .69444, .13372, 0, .27778],
            74: [0, .69444, .08094, 0, .47222],
            75: [0, .69444, .11983, 0, .69445],
            76: [0, .69444, 0, 0, .54167],
            77: [0, .69444, .08094, 0, .875],
            78: [0, .69444, .08094, 0, .70834],
            79: [0, .69444, .07555, 0, .73611],
            80: [0, .69444, .08293, 0, .63889],
            81: [.125, .69444, .07555, 0, .73611],
            82: [0, .69444, .08293, 0, .64584],
            83: [0, .69444, .09205, 0, .55556],
            84: [0, .69444, .13372, 0, .68056],
            85: [0, .69444, .08094, 0, .6875],
            86: [0, .69444, .1615, 0, .66667],
            87: [0, .69444, .1615, 0, .94445],
            88: [0, .69444, .13372, 0, .66667],
            89: [0, .69444, .17261, 0, .66667],
            90: [0, .69444, .11983, 0, .61111],
            91: [.25, .75, .15942, 0, .28889],
            93: [.25, .75, .08719, 0, .28889],
            94: [0, .69444, .0799, 0, .5],
            95: [.35, .09444, .08616, 0, .5],
            97: [0, .44444, .00981, 0, .48056],
            98: [0, .69444, .03057, 0, .51667],
            99: [0, .44444, .08336, 0, .44445],
            100: [0, .69444, .09483, 0, .51667],
            101: [0, .44444, .06778, 0, .44445],
            102: [0, .69444, .21705, 0, .30556],
            103: [.19444, .44444, .10836, 0, .5],
            104: [0, .69444, .01778, 0, .51667],
            105: [0, .67937, .09718, 0, .23889],
            106: [.19444, .67937, .09162, 0, .26667],
            107: [0, .69444, .08336, 0, .48889],
            108: [0, .69444, .09483, 0, .23889],
            109: [0, .44444, .01778, 0, .79445],
            110: [0, .44444, .01778, 0, .51667],
            111: [0, .44444, .06613, 0, .5],
            112: [.19444, .44444, .0389, 0, .51667],
            113: [.19444, .44444, .04169, 0, .51667],
            114: [0, .44444, .10836, 0, .34167],
            115: [0, .44444, .0778, 0, .38333],
            116: [0, .57143, .07225, 0, .36111],
            117: [0, .44444, .04169, 0, .51667],
            118: [0, .44444, .10836, 0, .46111],
            119: [0, .44444, .10836, 0, .68334],
            120: [0, .44444, .09169, 0, .46111],
            121: [.19444, .44444, .10836, 0, .46111],
            122: [0, .44444, .08752, 0, .43472],
            126: [.35, .32659, .08826, 0, .5],
            160: [0, 0, 0, 0, .25],
            168: [0, .67937, .06385, 0, .5],
            176: [0, .69444, 0, 0, .73752],
            184: [.17014, 0, 0, 0, .44445],
            305: [0, .44444, .04169, 0, .23889],
            567: [.19444, .44444, .04169, 0, .26667],
            710: [0, .69444, .0799, 0, .5],
            711: [0, .63194, .08432, 0, .5],
            713: [0, .60889, .08776, 0, .5],
            714: [0, .69444, .09205, 0, .5],
            715: [0, .69444, 0, 0, .5],
            728: [0, .69444, .09483, 0, .5],
            729: [0, .67937, .07774, 0, .27778],
            730: [0, .69444, 0, 0, .73752],
            732: [0, .67659, .08826, 0, .5],
            733: [0, .69444, .09205, 0, .5],
            915: [0, .69444, .13372, 0, .54167],
            916: [0, .69444, 0, 0, .83334],
            920: [0, .69444, .07555, 0, .77778],
            923: [0, .69444, 0, 0, .61111],
            926: [0, .69444, .12816, 0, .66667],
            928: [0, .69444, .08094, 0, .70834],
            931: [0, .69444, .11983, 0, .72222],
            933: [0, .69444, .09031, 0, .77778],
            934: [0, .69444, .04603, 0, .72222],
            936: [0, .69444, .09031, 0, .77778],
            937: [0, .69444, .08293, 0, .72222],
            8211: [0, .44444, .08616, 0, .5],
            8212: [0, .44444, .08616, 0, 1],
            8216: [0, .69444, .07816, 0, .27778],
            8217: [0, .69444, .07816, 0, .27778],
            8220: [0, .69444, .14205, 0, .5],
            8221: [0, .69444, .00316, 0, .5]
        },
        "SansSerif-Regular": {
            32: [0, 0, 0, 0, .25],
            33: [0, .69444, 0, 0, .31945],
            34: [0, .69444, 0, 0, .5],
            35: [.19444, .69444, 0, 0, .83334],
            36: [.05556, .75, 0, 0, .5],
            37: [.05556, .75, 0, 0, .83334],
            38: [0, .69444, 0, 0, .75834],
            39: [0, .69444, 0, 0, .27778],
            40: [.25, .75, 0, 0, .38889],
            41: [.25, .75, 0, 0, .38889],
            42: [0, .75, 0, 0, .5],
            43: [.08333, .58333, 0, 0, .77778],
            44: [.125, .08333, 0, 0, .27778],
            45: [0, .44444, 0, 0, .33333],
            46: [0, .08333, 0, 0, .27778],
            47: [.25, .75, 0, 0, .5],
            48: [0, .65556, 0, 0, .5],
            49: [0, .65556, 0, 0, .5],
            50: [0, .65556, 0, 0, .5],
            51: [0, .65556, 0, 0, .5],
            52: [0, .65556, 0, 0, .5],
            53: [0, .65556, 0, 0, .5],
            54: [0, .65556, 0, 0, .5],
            55: [0, .65556, 0, 0, .5],
            56: [0, .65556, 0, 0, .5],
            57: [0, .65556, 0, 0, .5],
            58: [0, .44444, 0, 0, .27778],
            59: [.125, .44444, 0, 0, .27778],
            61: [-.13, .37, 0, 0, .77778],
            63: [0, .69444, 0, 0, .47222],
            64: [0, .69444, 0, 0, .66667],
            65: [0, .69444, 0, 0, .66667],
            66: [0, .69444, 0, 0, .66667],
            67: [0, .69444, 0, 0, .63889],
            68: [0, .69444, 0, 0, .72223],
            69: [0, .69444, 0, 0, .59722],
            70: [0, .69444, 0, 0, .56945],
            71: [0, .69444, 0, 0, .66667],
            72: [0, .69444, 0, 0, .70834],
            73: [0, .69444, 0, 0, .27778],
            74: [0, .69444, 0, 0, .47222],
            75: [0, .69444, 0, 0, .69445],
            76: [0, .69444, 0, 0, .54167],
            77: [0, .69444, 0, 0, .875],
            78: [0, .69444, 0, 0, .70834],
            79: [0, .69444, 0, 0, .73611],
            80: [0, .69444, 0, 0, .63889],
            81: [.125, .69444, 0, 0, .73611],
            82: [0, .69444, 0, 0, .64584],
            83: [0, .69444, 0, 0, .55556],
            84: [0, .69444, 0, 0, .68056],
            85: [0, .69444, 0, 0, .6875],
            86: [0, .69444, .01389, 0, .66667],
            87: [0, .69444, .01389, 0, .94445],
            88: [0, .69444, 0, 0, .66667],
            89: [0, .69444, .025, 0, .66667],
            90: [0, .69444, 0, 0, .61111],
            91: [.25, .75, 0, 0, .28889],
            93: [.25, .75, 0, 0, .28889],
            94: [0, .69444, 0, 0, .5],
            95: [.35, .09444, .02778, 0, .5],
            97: [0, .44444, 0, 0, .48056],
            98: [0, .69444, 0, 0, .51667],
            99: [0, .44444, 0, 0, .44445],
            100: [0, .69444, 0, 0, .51667],
            101: [0, .44444, 0, 0, .44445],
            102: [0, .69444, .06944, 0, .30556],
            103: [.19444, .44444, .01389, 0, .5],
            104: [0, .69444, 0, 0, .51667],
            105: [0, .67937, 0, 0, .23889],
            106: [.19444, .67937, 0, 0, .26667],
            107: [0, .69444, 0, 0, .48889],
            108: [0, .69444, 0, 0, .23889],
            109: [0, .44444, 0, 0, .79445],
            110: [0, .44444, 0, 0, .51667],
            111: [0, .44444, 0, 0, .5],
            112: [.19444, .44444, 0, 0, .51667],
            113: [.19444, .44444, 0, 0, .51667],
            114: [0, .44444, .01389, 0, .34167],
            115: [0, .44444, 0, 0, .38333],
            116: [0, .57143, 0, 0, .36111],
            117: [0, .44444, 0, 0, .51667],
            118: [0, .44444, .01389, 0, .46111],
            119: [0, .44444, .01389, 0, .68334],
            120: [0, .44444, 0, 0, .46111],
            121: [.19444, .44444, .01389, 0, .46111],
            122: [0, .44444, 0, 0, .43472],
            126: [.35, .32659, 0, 0, .5],
            160: [0, 0, 0, 0, .25],
            168: [0, .67937, 0, 0, .5],
            176: [0, .69444, 0, 0, .66667],
            184: [.17014, 0, 0, 0, .44445],
            305: [0, .44444, 0, 0, .23889],
            567: [.19444, .44444, 0, 0, .26667],
            710: [0, .69444, 0, 0, .5],
            711: [0, .63194, 0, 0, .5],
            713: [0, .60889, 0, 0, .5],
            714: [0, .69444, 0, 0, .5],
            715: [0, .69444, 0, 0, .5],
            728: [0, .69444, 0, 0, .5],
            729: [0, .67937, 0, 0, .27778],
            730: [0, .69444, 0, 0, .66667],
            732: [0, .67659, 0, 0, .5],
            733: [0, .69444, 0, 0, .5],
            915: [0, .69444, 0, 0, .54167],
            916: [0, .69444, 0, 0, .83334],
            920: [0, .69444, 0, 0, .77778],
            923: [0, .69444, 0, 0, .61111],
            926: [0, .69444, 0, 0, .66667],
            928: [0, .69444, 0, 0, .70834],
            931: [0, .69444, 0, 0, .72222],
            933: [0, .69444, 0, 0, .77778],
            934: [0, .69444, 0, 0, .72222],
            936: [0, .69444, 0, 0, .77778],
            937: [0, .69444, 0, 0, .72222],
            8211: [0, .44444, .02778, 0, .5],
            8212: [0, .44444, .02778, 0, 1],
            8216: [0, .69444, 0, 0, .27778],
            8217: [0, .69444, 0, 0, .27778],
            8220: [0, .69444, 0, 0, .5],
            8221: [0, .69444, 0, 0, .5]
        },
        "Script-Regular": {
            32: [0, 0, 0, 0, .25],
            65: [0, .7, .22925, 0, .80253],
            66: [0, .7, .04087, 0, .90757],
            67: [0, .7, .1689, 0, .66619],
            68: [0, .7, .09371, 0, .77443],
            69: [0, .7, .18583, 0, .56162],
            70: [0, .7, .13634, 0, .89544],
            71: [0, .7, .17322, 0, .60961],
            72: [0, .7, .29694, 0, .96919],
            73: [0, .7, .19189, 0, .80907],
            74: [.27778, .7, .19189, 0, 1.05159],
            75: [0, .7, .31259, 0, .91364],
            76: [0, .7, .19189, 0, .87373],
            77: [0, .7, .15981, 0, 1.08031],
            78: [0, .7, .3525, 0, .9015],
            79: [0, .7, .08078, 0, .73787],
            80: [0, .7, .08078, 0, 1.01262],
            81: [0, .7, .03305, 0, .88282],
            82: [0, .7, .06259, 0, .85],
            83: [0, .7, .19189, 0, .86767],
            84: [0, .7, .29087, 0, .74697],
            85: [0, .7, .25815, 0, .79996],
            86: [0, .7, .27523, 0, .62204],
            87: [0, .7, .27523, 0, .80532],
            88: [0, .7, .26006, 0, .94445],
            89: [0, .7, .2939, 0, .70961],
            90: [0, .7, .24037, 0, .8212],
            160: [0, 0, 0, 0, .25]
        },
        "Size1-Regular": {
            32: [0, 0, 0, 0, .25],
            40: [.35001, .85, 0, 0, .45834],
            41: [.35001, .85, 0, 0, .45834],
            47: [.35001, .85, 0, 0, .57778],
            91: [.35001, .85, 0, 0, .41667],
            92: [.35001, .85, 0, 0, .57778],
            93: [.35001, .85, 0, 0, .41667],
            123: [.35001, .85, 0, 0, .58334],
            125: [.35001, .85, 0, 0, .58334],
            160: [0, 0, 0, 0, .25],
            710: [0, .72222, 0, 0, .55556],
            732: [0, .72222, 0, 0, .55556],
            770: [0, .72222, 0, 0, .55556],
            771: [0, .72222, 0, 0, .55556],
            8214: [-99e-5, .601, 0, 0, .77778],
            8593: [1e-5, .6, 0, 0, .66667],
            8595: [1e-5, .6, 0, 0, .66667],
            8657: [1e-5, .6, 0, 0, .77778],
            8659: [1e-5, .6, 0, 0, .77778],
            8719: [.25001, .75, 0, 0, .94445],
            8720: [.25001, .75, 0, 0, .94445],
            8721: [.25001, .75, 0, 0, 1.05556],
            8730: [.35001, .85, 0, 0, 1],
            8739: [-.00599, .606, 0, 0, .33333],
            8741: [-.00599, .606, 0, 0, .55556],
            8747: [.30612, .805, .19445, 0, .47222],
            8748: [.306, .805, .19445, 0, .47222],
            8749: [.306, .805, .19445, 0, .47222],
            8750: [.30612, .805, .19445, 0, .47222],
            8896: [.25001, .75, 0, 0, .83334],
            8897: [.25001, .75, 0, 0, .83334],
            8898: [.25001, .75, 0, 0, .83334],
            8899: [.25001, .75, 0, 0, .83334],
            8968: [.35001, .85, 0, 0, .47222],
            8969: [.35001, .85, 0, 0, .47222],
            8970: [.35001, .85, 0, 0, .47222],
            8971: [.35001, .85, 0, 0, .47222],
            9168: [-99e-5, .601, 0, 0, .66667],
            10216: [.35001, .85, 0, 0, .47222],
            10217: [.35001, .85, 0, 0, .47222],
            10752: [.25001, .75, 0, 0, 1.11111],
            10753: [.25001, .75, 0, 0, 1.11111],
            10754: [.25001, .75, 0, 0, 1.11111],
            10756: [.25001, .75, 0, 0, .83334],
            10758: [.25001, .75, 0, 0, .83334]
        },
        "Size2-Regular": {
            32: [0, 0, 0, 0, .25],
            40: [.65002, 1.15, 0, 0, .59722],
            41: [.65002, 1.15, 0, 0, .59722],
            47: [.65002, 1.15, 0, 0, .81111],
            91: [.65002, 1.15, 0, 0, .47222],
            92: [.65002, 1.15, 0, 0, .81111],
            93: [.65002, 1.15, 0, 0, .47222],
            123: [.65002, 1.15, 0, 0, .66667],
            125: [.65002, 1.15, 0, 0, .66667],
            160: [0, 0, 0, 0, .25],
            710: [0, .75, 0, 0, 1],
            732: [0, .75, 0, 0, 1],
            770: [0, .75, 0, 0, 1],
            771: [0, .75, 0, 0, 1],
            8719: [.55001, 1.05, 0, 0, 1.27778],
            8720: [.55001, 1.05, 0, 0, 1.27778],
            8721: [.55001, 1.05, 0, 0, 1.44445],
            8730: [.65002, 1.15, 0, 0, 1],
            8747: [.86225, 1.36, .44445, 0, .55556],
            8748: [.862, 1.36, .44445, 0, .55556],
            8749: [.862, 1.36, .44445, 0, .55556],
            8750: [.86225, 1.36, .44445, 0, .55556],
            8896: [.55001, 1.05, 0, 0, 1.11111],
            8897: [.55001, 1.05, 0, 0, 1.11111],
            8898: [.55001, 1.05, 0, 0, 1.11111],
            8899: [.55001, 1.05, 0, 0, 1.11111],
            8968: [.65002, 1.15, 0, 0, .52778],
            8969: [.65002, 1.15, 0, 0, .52778],
            8970: [.65002, 1.15, 0, 0, .52778],
            8971: [.65002, 1.15, 0, 0, .52778],
            10216: [.65002, 1.15, 0, 0, .61111],
            10217: [.65002, 1.15, 0, 0, .61111],
            10752: [.55001, 1.05, 0, 0, 1.51112],
            10753: [.55001, 1.05, 0, 0, 1.51112],
            10754: [.55001, 1.05, 0, 0, 1.51112],
            10756: [.55001, 1.05, 0, 0, 1.11111],
            10758: [.55001, 1.05, 0, 0, 1.11111]
        },
        "Size3-Regular": {
            32: [0, 0, 0, 0, .25],
            40: [.95003, 1.45, 0, 0, .73611],
            41: [.95003, 1.45, 0, 0, .73611],
            47: [.95003, 1.45, 0, 0, 1.04445],
            91: [.95003, 1.45, 0, 0, .52778],
            92: [.95003, 1.45, 0, 0, 1.04445],
            93: [.95003, 1.45, 0, 0, .52778],
            123: [.95003, 1.45, 0, 0, .75],
            125: [.95003, 1.45, 0, 0, .75],
            160: [0, 0, 0, 0, .25],
            710: [0, .75, 0, 0, 1.44445],
            732: [0, .75, 0, 0, 1.44445],
            770: [0, .75, 0, 0, 1.44445],
            771: [0, .75, 0, 0, 1.44445],
            8730: [.95003, 1.45, 0, 0, 1],
            8968: [.95003, 1.45, 0, 0, .58334],
            8969: [.95003, 1.45, 0, 0, .58334],
            8970: [.95003, 1.45, 0, 0, .58334],
            8971: [.95003, 1.45, 0, 0, .58334],
            10216: [.95003, 1.45, 0, 0, .75],
            10217: [.95003, 1.45, 0, 0, .75]
        },
        "Size4-Regular": {
            32: [0, 0, 0, 0, .25],
            40: [1.25003, 1.75, 0, 0, .79167],
            41: [1.25003, 1.75, 0, 0, .79167],
            47: [1.25003, 1.75, 0, 0, 1.27778],
            91: [1.25003, 1.75, 0, 0, .58334],
            92: [1.25003, 1.75, 0, 0, 1.27778],
            93: [1.25003, 1.75, 0, 0, .58334],
            123: [1.25003, 1.75, 0, 0, .80556],
            125: [1.25003, 1.75, 0, 0, .80556],
            160: [0, 0, 0, 0, .25],
            710: [0, .825, 0, 0, 1.8889],
            732: [0, .825, 0, 0, 1.8889],
            770: [0, .825, 0, 0, 1.8889],
            771: [0, .825, 0, 0, 1.8889],
            8730: [1.25003, 1.75, 0, 0, 1],
            8968: [1.25003, 1.75, 0, 0, .63889],
            8969: [1.25003, 1.75, 0, 0, .63889],
            8970: [1.25003, 1.75, 0, 0, .63889],
            8971: [1.25003, 1.75, 0, 0, .63889],
            9115: [.64502, 1.155, 0, 0, .875],
            9116: [1e-5, .6, 0, 0, .875],
            9117: [.64502, 1.155, 0, 0, .875],
            9118: [.64502, 1.155, 0, 0, .875],
            9119: [1e-5, .6, 0, 0, .875],
            9120: [.64502, 1.155, 0, 0, .875],
            9121: [.64502, 1.155, 0, 0, .66667],
            9122: [-99e-5, .601, 0, 0, .66667],
            9123: [.64502, 1.155, 0, 0, .66667],
            9124: [.64502, 1.155, 0, 0, .66667],
            9125: [-99e-5, .601, 0, 0, .66667],
            9126: [.64502, 1.155, 0, 0, .66667],
            9127: [1e-5, .9, 0, 0, .88889],
            9128: [.65002, 1.15, 0, 0, .88889],
            9129: [.90001, 0, 0, 0, .88889],
            9130: [0, .3, 0, 0, .88889],
            9131: [1e-5, .9, 0, 0, .88889],
            9132: [.65002, 1.15, 0, 0, .88889],
            9133: [.90001, 0, 0, 0, .88889],
            9143: [.88502, .915, 0, 0, 1.05556],
            10216: [1.25003, 1.75, 0, 0, .80556],
            10217: [1.25003, 1.75, 0, 0, .80556],
            57344: [-.00499, .605, 0, 0, 1.05556],
            57345: [-.00499, .605, 0, 0, 1.05556],
            57680: [0, .12, 0, 0, .45],
            57681: [0, .12, 0, 0, .45],
            57682: [0, .12, 0, 0, .45],
            57683: [0, .12, 0, 0, .45]
        },
        "Typewriter-Regular": {
            32: [0, 0, 0, 0, .525],
            33: [0, .61111, 0, 0, .525],
            34: [0, .61111, 0, 0, .525],
            35: [0, .61111, 0, 0, .525],
            36: [.08333, .69444, 0, 0, .525],
            37: [.08333, .69444, 0, 0, .525],
            38: [0, .61111, 0, 0, .525],
            39: [0, .61111, 0, 0, .525],
            40: [.08333, .69444, 0, 0, .525],
            41: [.08333, .69444, 0, 0, .525],
            42: [0, .52083, 0, 0, .525],
            43: [-.08056, .53055, 0, 0, .525],
            44: [.13889, .125, 0, 0, .525],
            45: [-.08056, .53055, 0, 0, .525],
            46: [0, .125, 0, 0, .525],
            47: [.08333, .69444, 0, 0, .525],
            48: [0, .61111, 0, 0, .525],
            49: [0, .61111, 0, 0, .525],
            50: [0, .61111, 0, 0, .525],
            51: [0, .61111, 0, 0, .525],
            52: [0, .61111, 0, 0, .525],
            53: [0, .61111, 0, 0, .525],
            54: [0, .61111, 0, 0, .525],
            55: [0, .61111, 0, 0, .525],
            56: [0, .61111, 0, 0, .525],
            57: [0, .61111, 0, 0, .525],
            58: [0, .43056, 0, 0, .525],
            59: [.13889, .43056, 0, 0, .525],
            60: [-.05556, .55556, 0, 0, .525],
            61: [-.19549, .41562, 0, 0, .525],
            62: [-.05556, .55556, 0, 0, .525],
            63: [0, .61111, 0, 0, .525],
            64: [0, .61111, 0, 0, .525],
            65: [0, .61111, 0, 0, .525],
            66: [0, .61111, 0, 0, .525],
            67: [0, .61111, 0, 0, .525],
            68: [0, .61111, 0, 0, .525],
            69: [0, .61111, 0, 0, .525],
            70: [0, .61111, 0, 0, .525],
            71: [0, .61111, 0, 0, .525],
            72: [0, .61111, 0, 0, .525],
            73: [0, .61111, 0, 0, .525],
            74: [0, .61111, 0, 0, .525],
            75: [0, .61111, 0, 0, .525],
            76: [0, .61111, 0, 0, .525],
            77: [0, .61111, 0, 0, .525],
            78: [0, .61111, 0, 0, .525],
            79: [0, .61111, 0, 0, .525],
            80: [0, .61111, 0, 0, .525],
            81: [.13889, .61111, 0, 0, .525],
            82: [0, .61111, 0, 0, .525],
            83: [0, .61111, 0, 0, .525],
            84: [0, .61111, 0, 0, .525],
            85: [0, .61111, 0, 0, .525],
            86: [0, .61111, 0, 0, .525],
            87: [0, .61111, 0, 0, .525],
            88: [0, .61111, 0, 0, .525],
            89: [0, .61111, 0, 0, .525],
            90: [0, .61111, 0, 0, .525],
            91: [.08333, .69444, 0, 0, .525],
            92: [.08333, .69444, 0, 0, .525],
            93: [.08333, .69444, 0, 0, .525],
            94: [0, .61111, 0, 0, .525],
            95: [.09514, 0, 0, 0, .525],
            96: [0, .61111, 0, 0, .525],
            97: [0, .43056, 0, 0, .525],
            98: [0, .61111, 0, 0, .525],
            99: [0, .43056, 0, 0, .525],
            100: [0, .61111, 0, 0, .525],
            101: [0, .43056, 0, 0, .525],
            102: [0, .61111, 0, 0, .525],
            103: [.22222, .43056, 0, 0, .525],
            104: [0, .61111, 0, 0, .525],
            105: [0, .61111, 0, 0, .525],
            106: [.22222, .61111, 0, 0, .525],
            107: [0, .61111, 0, 0, .525],
            108: [0, .61111, 0, 0, .525],
            109: [0, .43056, 0, 0, .525],
            110: [0, .43056, 0, 0, .525],
            111: [0, .43056, 0, 0, .525],
            112: [.22222, .43056, 0, 0, .525],
            113: [.22222, .43056, 0, 0, .525],
            114: [0, .43056, 0, 0, .525],
            115: [0, .43056, 0, 0, .525],
            116: [0, .55358, 0, 0, .525],
            117: [0, .43056, 0, 0, .525],
            118: [0, .43056, 0, 0, .525],
            119: [0, .43056, 0, 0, .525],
            120: [0, .43056, 0, 0, .525],
            121: [.22222, .43056, 0, 0, .525],
            122: [0, .43056, 0, 0, .525],
            123: [.08333, .69444, 0, 0, .525],
            124: [.08333, .69444, 0, 0, .525],
            125: [.08333, .69444, 0, 0, .525],
            126: [0, .61111, 0, 0, .525],
            127: [0, .61111, 0, 0, .525],
            160: [0, 0, 0, 0, .525],
            176: [0, .61111, 0, 0, .525],
            184: [.19445, 0, 0, 0, .525],
            305: [0, .43056, 0, 0, .525],
            567: [.22222, .43056, 0, 0, .525],
            711: [0, .56597, 0, 0, .525],
            713: [0, .56555, 0, 0, .525],
            714: [0, .61111, 0, 0, .525],
            715: [0, .61111, 0, 0, .525],
            728: [0, .61111, 0, 0, .525],
            730: [0, .61111, 0, 0, .525],
            770: [0, .61111, 0, 0, .525],
            771: [0, .61111, 0, 0, .525],
            776: [0, .61111, 0, 0, .525],
            915: [0, .61111, 0, 0, .525],
            916: [0, .61111, 0, 0, .525],
            920: [0, .61111, 0, 0, .525],
            923: [0, .61111, 0, 0, .525],
            926: [0, .61111, 0, 0, .525],
            928: [0, .61111, 0, 0, .525],
            931: [0, .61111, 0, 0, .525],
            933: [0, .61111, 0, 0, .525],
            934: [0, .61111, 0, 0, .525],
            936: [0, .61111, 0, 0, .525],
            937: [0, .61111, 0, 0, .525],
            8216: [0, .61111, 0, 0, .525],
            8217: [0, .61111, 0, 0, .525],
            8242: [0, .61111, 0, 0, .525],
            9251: [.11111, .21944, 0, 0, .525]
        }
    }
      , de = {
        slant: [.25, .25, .25],
        space: [0, 0, 0],
        stretch: [0, 0, 0],
        shrink: [0, 0, 0],
        xHeight: [.431, .431, .431],
        quad: [1, 1.171, 1.472],
        extraSpace: [0, 0, 0],
        num1: [.677, .732, .925],
        num2: [.394, .384, .387],
        num3: [.444, .471, .504],
        denom1: [.686, .752, 1.025],
        denom2: [.345, .344, .532],
        sup1: [.413, .503, .504],
        sup2: [.363, .431, .404],
        sup3: [.289, .286, .294],
        sub1: [.15, .143, .2],
        sub2: [.247, .286, .4],
        supDrop: [.386, .353, .494],
        subDrop: [.05, .071, .1],
        delim1: [2.39, 1.7, 1.98],
        delim2: [1.01, 1.157, 1.42],
        axisHeight: [.25, .25, .25],
        defaultRuleThickness: [.04, .049, .049],
        bigOpSpacing1: [.111, .111, .111],
        bigOpSpacing2: [.166, .166, .166],
        bigOpSpacing3: [.2, .2, .2],
        bigOpSpacing4: [.6, .611, .611],
        bigOpSpacing5: [.1, .143, .143],
        sqrtRuleThickness: [.04, .04, .04],
        ptPerEm: [10, 10, 10],
        doubleRuleSep: [.2, .2, .2],
        arrayRuleWidth: [.04, .04, .04],
        fboxsep: [.3, .3, .3],
        fboxrule: [.04, .04, .04]
    }
      , ge = {
        \u00c5: "A",
        \u00d0: "D",
        \u00de: "o",
        \u00e5: "a",
        \u00f0: "d",
        \u00fe: "o",
        \u0410: "A",
        \u0411: "B",
        \u0412: "B",
        \u0413: "F",
        \u0414: "A",
        \u0415: "E",
        \u0416: "K",
        \u0417: "3",
        \u0418: "N",
        \u0419: "N",
        \u041a: "K",
        \u041b: "N",
        \u041c: "M",
        \u041d: "H",
        \u041e: "O",
        \u041f: "N",
        \u0420: "P",
        \u0421: "C",
        \u0422: "T",
        \u0423: "y",
        \u0424: "O",
        \u0425: "X",
        \u0426: "U",
        \u0427: "h",
        \u0428: "W",
        \u0429: "W",
        \u042a: "B",
        \u042b: "X",
        \u042c: "B",
        \u042d: "3",
        \u042e: "X",
        \u042f: "R",
        \u0430: "a",
        \u0431: "b",
        \u0432: "a",
        \u0433: "r",
        \u0434: "y",
        \u0435: "e",
        \u0436: "m",
        \u0437: "e",
        \u0438: "n",
        \u0439: "n",
        \u043a: "n",
        \u043b: "n",
        \u043c: "m",
        \u043d: "n",
        \u043e: "o",
        \u043f: "n",
        \u0440: "p",
        \u0441: "c",
        \u0442: "o",
        \u0443: "y",
        \u0444: "b",
        \u0445: "x",
        \u0446: "n",
        \u0447: "n",
        \u0448: "w",
        \u0449: "w",
        \u044a: "a",
        \u044b: "m",
        \u044c: "a",
        \u044d: "e",
        \u044e: "m",
        \u044f: "r"
    };
    function fe(e, t, r) {
        if (!ue[t])
            throw new Error("Font metrics not found for font: " + t + ".");
        var a = e.charCodeAt(0)
          , n = ue[t][a];
        if (!n && e[0]in ge && (a = ge[e[0]].charCodeAt(0),
        n = ue[t][a]),
        n || "text" !== r || me(a) && (n = ue[t][77]),
        n)
            return {
                depth: n[0],
                height: n[1],
                italic: n[2],
                skew: n[3],
                width: n[4]
            }
    }
    var ve = {}
      , be = [[1, 1, 1], [2, 1, 1], [3, 1, 1], [4, 2, 1], [5, 2, 1], [6, 3, 1], [7, 4, 2], [8, 6, 3], [9, 7, 6], [10, 8, 7], [11, 10, 9]]
      , ye = [.5, .6, .7, .8, .9, 1, 1.2, 1.44, 1.728, 2.074, 2.488]
      , xe = function(e, t) {
        return t.size < 2 ? e : be[e - 1][t.size - 1]
    };
    class we {
        constructor(e) {
            this.style = void 0,
            this.color = void 0,
            this.size = void 0,
            this.textSize = void 0,
            this.phantom = void 0,
            this.font = void 0,
            this.fontFamily = void 0,
            this.fontWeight = void 0,
            this.fontShape = void 0,
            this.sizeMultiplier = void 0,
            this.maxSize = void 0,
            this.minRuleThickness = void 0,
            this._fontMetrics = void 0,
            this.style = e.style,
            this.color = e.color,
            this.size = e.size || we.BASESIZE,
            this.textSize = e.textSize || this.size,
            this.phantom = !!e.phantom,
            this.font = e.font || "",
            this.fontFamily = e.fontFamily || "",
            this.fontWeight = e.fontWeight || "",
            this.fontShape = e.fontShape || "",
            this.sizeMultiplier = ye[this.size - 1],
            this.maxSize = e.maxSize,
            this.minRuleThickness = e.minRuleThickness,
            this._fontMetrics = void 0
        }
        extend(e) {
            var t = {
                style: this.style,
                size: this.size,
                textSize: this.textSize,
                color: this.color,
                phantom: this.phantom,
                font: this.font,
                fontFamily: this.fontFamily,
                fontWeight: this.fontWeight,
                fontShape: this.fontShape,
                maxSize: this.maxSize,
                minRuleThickness: this.minRuleThickness
            };
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            return new we(t)
        }
        havingStyle(e) {
            return this.style === e ? this : this.extend({
                style: e,
                size: xe(this.textSize, e)
            })
        }
        havingCrampedStyle() {
            return this.havingStyle(this.style.cramp())
        }
        havingSize(e) {
            return this.size === e && this.textSize === e ? this : this.extend({
                style: this.style.text(),
                size: e,
                textSize: e,
                sizeMultiplier: ye[e - 1]
            })
        }
        havingBaseStyle(e) {
            e = e || this.style.text();
            var t = xe(we.BASESIZE, e);
            return this.size === t && this.textSize === we.BASESIZE && this.style === e ? this : this.extend({
                style: e,
                size: t
            })
        }
        havingBaseSizing() {
            var e;
            switch (this.style.id) {
            case 4:
            case 5:
                e = 3;
                break;
            case 6:
            case 7:
                e = 1;
                break;
            default:
                e = 6
            }
            return this.extend({
                style: this.style.text(),
                size: e
            })
        }
        withColor(e) {
            return this.extend({
                color: e
            })
        }
        withPhantom() {
            return this.extend({
                phantom: !0
            })
        }
        withFont(e) {
            return this.extend({
                font: e
            })
        }
        withTextFontFamily(e) {
            return this.extend({
                fontFamily: e,
                font: ""
            })
        }
        withTextFontWeight(e) {
            return this.extend({
                fontWeight: e,
                font: ""
            })
        }
        withTextFontShape(e) {
            return this.extend({
                fontShape: e,
                font: ""
            })
        }
        sizingClasses(e) {
            return e.size !== this.size ? ["sizing", "reset-size" + e.size, "size" + this.size] : []
        }
        baseSizingClasses() {
            return this.size !== we.BASESIZE ? ["sizing", "reset-size" + this.size, "size" + we.BASESIZE] : []
        }
        fontMetrics() {
            return this._fontMetrics || (this._fontMetrics = function(e) {
                var t;
                if (!ve[t = e >= 5 ? 0 : e >= 3 ? 1 : 2]) {
                    var r = ve[t] = {
                        cssEmPerMu: de.quad[t] / 18
                    };
                    for (var a in de)
                        de.hasOwnProperty(a) && (r[a] = de[a][t])
                }
                return ve[t]
            }(this.size)),
            this._fontMetrics
        }
        getColor() {
            return this.phantom ? "transparent" : this.color
        }
    }
    we.BASESIZE = 6;
    var ke = {
        pt: 1,
        mm: 7227 / 2540,
        cm: 7227 / 254,
        in: 72.27,
        bp: 1.00375,
        pc: 12,
        dd: 1238 / 1157,
        cc: 14856 / 1157,
        nd: 685 / 642,
        nc: 1370 / 107,
        sp: 1 / 65536,
        px: 1.00375
    }
      , Se = {
        ex: !0,
        em: !0,
        mu: !0
    }
      , Me = function(e) {
        return "string" != typeof e && (e = e.unit),
        e in ke || e in Se || "ex" === e
    }
      , ze = function(e, t) {
        var r;
        if (e.unit in ke)
            r = ke[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
        else if ("mu" === e.unit)
            r = t.fontMetrics().cssEmPerMu;
        else {
            var a;
            if (a = t.style.isTight() ? t.havingStyle(t.style.text()) : t,
            "ex" === e.unit)
                r = a.fontMetrics().xHeight;
            else {
                if ("em" !== e.unit)
                    throw new D("Invalid unit: '" + e.unit + "'");
                r = a.fontMetrics().quad
            }
            a !== t && (r *= a.sizeMultiplier / t.sizeMultiplier)
        }
        return Math.min(e.number * r, t.maxSize)
    }
      , Ae = function(e) {
        return +e.toFixed(4) + "em"
    }
      , Te = function(e) {
        return e.filter((e=>e)).join(" ")
    }
      , Be = function(e, t, r) {
        if (this.classes = e || [],
        this.attributes = {},
        this.height = 0,
        this.depth = 0,
        this.maxFontSize = 0,
        this.style = r || {},
        t) {
            t.style.isTight() && this.classes.push("mtight");
            var a = t.getColor();
            a && (this.style.color = a)
        }
    }
      , Ne = function(e) {
        var t = document.createElement(e);
        for (var r in t.className = Te(this.classes),
        this.style)
            this.style.hasOwnProperty(r) && (t.style[r] = this.style[r]);
        for (var a in this.attributes)
            this.attributes.hasOwnProperty(a) && t.setAttribute(a, this.attributes[a]);
        for (var n = 0; n < this.children.length; n++)
            t.appendChild(this.children[n].toNode());
        return t
    }
      , Ce = function(e) {
        var t = "<" + e;
        this.classes.length && (t += ' class="' + W(Te(this.classes)) + '"');
        var r = "";
        for (var a in this.style)
            this.style.hasOwnProperty(a) && (r += X(a) + ":" + this.style[a] + ";");
        for (var n in r && (t += ' style="' + W(r) + '"'),
        this.attributes)
            this.attributes.hasOwnProperty(n) && (t += " " + n + '="' + W(this.attributes[n]) + '"');
        t += ">";
        for (var i = 0; i < this.children.length; i++)
            t += this.children[i].toMarkup();
        return t + "</" + e + ">"
    };
    class qe {
        constructor(e, t, r, a) {
            this.children = void 0,
            this.attributes = void 0,
            this.classes = void 0,
            this.height = void 0,
            this.depth = void 0,
            this.width = void 0,
            this.maxFontSize = void 0,
            this.style = void 0,
            Be.call(this, e, r, a),
            this.children = t || []
        }
        setAttribute(e, t) {
            this.attributes[e] = t
        }
        hasClass(e) {
            return U(this.classes, e)
        }
        toNode() {
            return Ne.call(this, "span")
        }
        toMarkup() {
            return Ce.call(this, "span")
        }
    }
    class Ie {
        constructor(e, t, r, a) {
            this.children = void 0,
            this.attributes = void 0,
            this.classes = void 0,
            this.height = void 0,
            this.depth = void 0,
            this.maxFontSize = void 0,
            this.style = void 0,
            Be.call(this, t, a),
            this.children = r || [],
            this.setAttribute("href", e)
        }
        setAttribute(e, t) {
            this.attributes[e] = t
        }
        hasClass(e) {
            return U(this.classes, e)
        }
        toNode() {
            return Ne.call(this, "a")
        }
        toMarkup() {
            return Ce.call(this, "a")
        }
    }
    class Re {
        constructor(e, t, r) {
            this.src = void 0,
            this.alt = void 0,
            this.classes = void 0,
            this.height = void 0,
            this.depth = void 0,
            this.maxFontSize = void 0,
            this.style = void 0,
            this.alt = t,
            this.src = e,
            this.classes = ["mord"],
            this.style = r
        }
        hasClass(e) {
            return U(this.classes, e)
        }
        toNode() {
            var e = document.createElement("img");
            for (var t in e.src = this.src,
            e.alt = this.alt,
            e.className = "mord",
            this.style)
                this.style.hasOwnProperty(t) && (e.style[t] = this.style[t]);
            return e
        }
        toMarkup() {
            var e = '<img src="' + W(this.src) + '" alt="' + W(this.alt) + '"'
              , t = "";
            for (var r in this.style)
                this.style.hasOwnProperty(r) && (t += X(r) + ":" + this.style[r] + ";");
            return t && (e += ' style="' + W(t) + '"'),
            e + "'/>"
        }
    }
    var He = {
        \u00ee: "\u0131\u0302",
        \u00ef: "\u0131\u0308",
        \u00ed: "\u0131\u0301",
        \u00ec: "\u0131\u0300"
    };
    class Oe {
        constructor(e, t, r, a, n, i, o, s) {
            this.text = void 0,
            this.height = void 0,
            this.depth = void 0,
            this.italic = void 0,
            this.skew = void 0,
            this.width = void 0,
            this.maxFontSize = void 0,
            this.classes = void 0,
            this.style = void 0,
            this.text = e,
            this.height = t || 0,
            this.depth = r || 0,
            this.italic = a || 0,
            this.skew = n || 0,
            this.width = i || 0,
            this.classes = o || [],
            this.style = s || {},
            this.maxFontSize = 0;
            var l = function(e) {
                for (var t = 0; t < le.length; t++)
                    for (var r = le[t], a = 0; a < r.blocks.length; a++) {
                        var n = r.blocks[a];
                        if (e >= n[0] && e <= n[1])
                            return r.name
                    }
                return null
            }(this.text.charCodeAt(0));
            l && this.classes.push(l + "_fallback"),
            /[\xee\xef\xed\xec]/.test(this.text) && (this.text = He[this.text])
        }
        hasClass(e) {
            return U(this.classes, e)
        }
        toNode() {
            var e = document.createTextNode(this.text)
              , t = null;
            for (var r in this.italic > 0 && ((t = document.createElement("span")).style.marginRight = Ae(this.italic)),
            this.classes.length > 0 && ((t = t || document.createElement("span")).className = Te(this.classes)),
            this.style)
                this.style.hasOwnProperty(r) && ((t = t || document.createElement("span")).style[r] = this.style[r]);
            return t ? (t.appendChild(e),
            t) : e
        }
        toMarkup() {
            var e = !1
              , t = "<span";
            this.classes.length && (e = !0,
            t += ' class="',
            t += W(Te(this.classes)),
            t += '"');
            var r = "";
            for (var a in this.italic > 0 && (r += "margin-right:" + this.italic + "em;"),
            this.style)
                this.style.hasOwnProperty(a) && (r += X(a) + ":" + this.style[a] + ";");
            r && (e = !0,
            t += ' style="' + W(r) + '"');
            var n = W(this.text);
            return e ? (t += ">",
            t += n,
            t += "</span>") : n
        }
    }
    class Ee {
        constructor(e, t) {
            this.children = void 0,
            this.attributes = void 0,
            this.children = e || [],
            this.attributes = t || {}
        }
        toNode() {
            var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            for (var t in this.attributes)
                Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
            for (var r = 0; r < this.children.length; r++)
                e.appendChild(this.children[r].toNode());
            return e
        }
        toMarkup() {
            var e = '<svg xmlns="http://www.w3.org/2000/svg"';
            for (var t in this.attributes)
                Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + '="' + W(this.attributes[t]) + '"');
            e += ">";
            for (var r = 0; r < this.children.length; r++)
                e += this.children[r].toMarkup();
            return e + "</svg>"
        }
    }
    class Le {
        constructor(e, t) {
            this.pathName = void 0,
            this.alternate = void 0,
            this.pathName = e,
            this.alternate = t
        }
        toNode() {
            var e = document.createElementNS("http://www.w3.org/2000/svg", "path");
            return this.alternate ? e.setAttribute("d", this.alternate) : e.setAttribute("d", ce[this.pathName]),
            e
        }
        toMarkup() {
            return this.alternate ? '<path d="' + W(this.alternate) + '"/>' : '<path d="' + W(ce[this.pathName]) + '"/>'
        }
    }
    class De {
        constructor(e) {
            this.attributes = void 0,
            this.attributes = e || {}
        }
        toNode() {
            var e = document.createElementNS("http://www.w3.org/2000/svg", "line");
            for (var t in this.attributes)
                Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
            return e
        }
        toMarkup() {
            var e = "<line";
            for (var t in this.attributes)
                Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + '="' + W(this.attributes[t]) + '"');
            return e + "/>"
        }
    }
    function Pe(e) {
        if (e instanceof Oe)
            return e;
        throw new Error("Expected symbolNode but got " + String(e) + ".")
    }
    var Ve = {
        bin: 1,
        close: 1,
        inner: 1,
        open: 1,
        punct: 1,
        rel: 1
    }
      , Fe = {
        "accent-token": 1,
        mathord: 1,
        "op-token": 1,
        spacing: 1,
        textord: 1
    }
      , Ge = {
        math: {},
        text: {}
    };
    function Ue(e, t, r, a, n, i) {
        Ge[e][n] = {
            font: t,
            group: r,
            replace: a
        },
        i && a && (Ge[e][a] = Ge[e][n])
    }
    var Ye = "math"
      , We = "text"
      , Xe = "main"
      , $e = "ams"
      , je = "accent-token"
      , _e = "bin"
      , Ze = "close"
      , Ke = "inner"
      , Je = "mathord"
      , Qe = "op-token"
      , et = "open"
      , tt = "punct"
      , rt = "rel"
      , at = "spacing"
      , nt = "textord";
    Ue(Ye, Xe, rt, "\u2261", "\\equiv", !0),
    Ue(Ye, Xe, rt, "\u227a", "\\prec", !0),
    Ue(Ye, Xe, rt, "\u227b", "\\succ", !0),
    Ue(Ye, Xe, rt, "\u223c", "\\sim", !0),
    Ue(Ye, Xe, rt, "\u22a5", "\\perp"),
    Ue(Ye, Xe, rt, "\u2aaf", "\\preceq", !0),
    Ue(Ye, Xe, rt, "\u2ab0", "\\succeq", !0),
    Ue(Ye, Xe, rt, "\u2243", "\\simeq", !0),
    Ue(Ye, Xe, rt, "\u2223", "\\mid", !0),
    Ue(Ye, Xe, rt, "\u226a", "\\ll", !0),
    Ue(Ye, Xe, rt, "\u226b", "\\gg", !0),
    Ue(Ye, Xe, rt, "\u224d", "\\asymp", !0),
    Ue(Ye, Xe, rt, "\u2225", "\\parallel"),
    Ue(Ye, Xe, rt, "\u22c8", "\\bowtie", !0),
    Ue(Ye, Xe, rt, "\u2323", "\\smile", !0),
    Ue(Ye, Xe, rt, "\u2291", "\\sqsubseteq", !0),
    Ue(Ye, Xe, rt, "\u2292", "\\sqsupseteq", !0),
    Ue(Ye, Xe, rt, "\u2250", "\\doteq", !0),
    Ue(Ye, Xe, rt, "\u2322", "\\frown", !0),
    Ue(Ye, Xe, rt, "\u220b", "\\ni", !0),
    Ue(Ye, Xe, rt, "\u221d", "\\propto", !0),
    Ue(Ye, Xe, rt, "\u22a2", "\\vdash", !0),
    Ue(Ye, Xe, rt, "\u22a3", "\\dashv", !0),
    Ue(Ye, Xe, rt, "\u220b", "\\owns"),
    Ue(Ye, Xe, tt, ".", "\\ldotp"),
    Ue(Ye, Xe, tt, "\u22c5", "\\cdotp"),
    Ue(Ye, Xe, nt, "#", "\\#"),
    Ue(We, Xe, nt, "#", "\\#"),
    Ue(Ye, Xe, nt, "&", "\\&"),
    Ue(We, Xe, nt, "&", "\\&"),
    Ue(Ye, Xe, nt, "\u2135", "\\aleph", !0),
    Ue(Ye, Xe, nt, "\u2200", "\\forall", !0),
    Ue(Ye, Xe, nt, "\u210f", "\\hbar", !0),
    Ue(Ye, Xe, nt, "\u2203", "\\exists", !0),
    Ue(Ye, Xe, nt, "\u2207", "\\nabla", !0),
    Ue(Ye, Xe, nt, "\u266d", "\\flat", !0),
    Ue(Ye, Xe, nt, "\u2113", "\\ell", !0),
    Ue(Ye, Xe, nt, "\u266e", "\\natural", !0),
    Ue(Ye, Xe, nt, "\u2663", "\\clubsuit", !0),
    Ue(Ye, Xe, nt, "\u2118", "\\wp", !0),
    Ue(Ye, Xe, nt, "\u266f", "\\sharp", !0),
    Ue(Ye, Xe, nt, "\u2662", "\\diamondsuit", !0),
    Ue(Ye, Xe, nt, "\u211c", "\\Re", !0),
    Ue(Ye, Xe, nt, "\u2661", "\\heartsuit", !0),
    Ue(Ye, Xe, nt, "\u2111", "\\Im", !0),
    Ue(Ye, Xe, nt, "\u2660", "\\spadesuit", !0),
    Ue(Ye, Xe, nt, "\xa7", "\\S", !0),
    Ue(We, Xe, nt, "\xa7", "\\S"),
    Ue(Ye, Xe, nt, "\xb6", "\\P", !0),
    Ue(We, Xe, nt, "\xb6", "\\P"),
    Ue(Ye, Xe, nt, "\u2020", "\\dag"),
    Ue(We, Xe, nt, "\u2020", "\\dag"),
    Ue(We, Xe, nt, "\u2020", "\\textdagger"),
    Ue(Ye, Xe, nt, "\u2021", "\\ddag"),
    Ue(We, Xe, nt, "\u2021", "\\ddag"),
    Ue(We, Xe, nt, "\u2021", "\\textdaggerdbl"),
    Ue(Ye, Xe, Ze, "\u23b1", "\\rmoustache", !0),
    Ue(Ye, Xe, et, "\u23b0", "\\lmoustache", !0),
    Ue(Ye, Xe, Ze, "\u27ef", "\\rgroup", !0),
    Ue(Ye, Xe, et, "\u27ee", "\\lgroup", !0),
    Ue(Ye, Xe, _e, "\u2213", "\\mp", !0),
    Ue(Ye, Xe, _e, "\u2296", "\\ominus", !0),
    Ue(Ye, Xe, _e, "\u228e", "\\uplus", !0),
    Ue(Ye, Xe, _e, "\u2293", "\\sqcap", !0),
    Ue(Ye, Xe, _e, "\u2217", "\\ast"),
    Ue(Ye, Xe, _e, "\u2294", "\\sqcup", !0),
    Ue(Ye, Xe, _e, "\u25ef", "\\bigcirc", !0),
    Ue(Ye, Xe, _e, "\u2219", "\\bullet", !0),
    Ue(Ye, Xe, _e, "\u2021", "\\ddagger"),
    Ue(Ye, Xe, _e, "\u2240", "\\wr", !0),
    Ue(Ye, Xe, _e, "\u2a3f", "\\amalg"),
    Ue(Ye, Xe, _e, "&", "\\And"),
    Ue(Ye, Xe, rt, "\u27f5", "\\longleftarrow", !0),
    Ue(Ye, Xe, rt, "\u21d0", "\\Leftarrow", !0),
    Ue(Ye, Xe, rt, "\u27f8", "\\Longleftarrow", !0),
    Ue(Ye, Xe, rt, "\u27f6", "\\longrightarrow", !0),
    Ue(Ye, Xe, rt, "\u21d2", "\\Rightarrow", !0),
    Ue(Ye, Xe, rt, "\u27f9", "\\Longrightarrow", !0),
    Ue(Ye, Xe, rt, "\u2194", "\\leftrightarrow", !0),
    Ue(Ye, Xe, rt, "\u27f7", "\\longleftrightarrow", !0),
    Ue(Ye, Xe, rt, "\u21d4", "\\Leftrightarrow", !0),
    Ue(Ye, Xe, rt, "\u27fa", "\\Longleftrightarrow", !0),
    Ue(Ye, Xe, rt, "\u21a6", "\\mapsto", !0),
    Ue(Ye, Xe, rt, "\u27fc", "\\longmapsto", !0),
    Ue(Ye, Xe, rt, "\u2197", "\\nearrow", !0),
    Ue(Ye, Xe, rt, "\u21a9", "\\hookleftarrow", !0),
    Ue(Ye, Xe, rt, "\u21aa", "\\hookrightarrow", !0),
    Ue(Ye, Xe, rt, "\u2198", "\\searrow", !0),
    Ue(Ye, Xe, rt, "\u21bc", "\\leftharpoonup", !0),
    Ue(Ye, Xe, rt, "\u21c0", "\\rightharpoonup", !0),
    Ue(Ye, Xe, rt, "\u2199", "\\swarrow", !0),
    Ue(Ye, Xe, rt, "\u21bd", "\\leftharpoondown", !0),
    Ue(Ye, Xe, rt, "\u21c1", "\\rightharpoondown", !0),
    Ue(Ye, Xe, rt, "\u2196", "\\nwarrow", !0),
    Ue(Ye, Xe, rt, "\u21cc", "\\rightleftharpoons", !0),
    Ue(Ye, $e, rt, "\u226e", "\\nless", !0),
    Ue(Ye, $e, rt, "\ue010", "\\@nleqslant"),
    Ue(Ye, $e, rt, "\ue011", "\\@nleqq"),
    Ue(Ye, $e, rt, "\u2a87", "\\lneq", !0),
    Ue(Ye, $e, rt, "\u2268", "\\lneqq", !0),
    Ue(Ye, $e, rt, "\ue00c", "\\@lvertneqq"),
    Ue(Ye, $e, rt, "\u22e6", "\\lnsim", !0),
    Ue(Ye, $e, rt, "\u2a89", "\\lnapprox", !0),
    Ue(Ye, $e, rt, "\u2280", "\\nprec", !0),
    Ue(Ye, $e, rt, "\u22e0", "\\npreceq", !0),
    Ue(Ye, $e, rt, "\u22e8", "\\precnsim", !0),
    Ue(Ye, $e, rt, "\u2ab9", "\\precnapprox", !0),
    Ue(Ye, $e, rt, "\u2241", "\\nsim", !0),
    Ue(Ye, $e, rt, "\ue006", "\\@nshortmid"),
    Ue(Ye, $e, rt, "\u2224", "\\nmid", !0),
    Ue(Ye, $e, rt, "\u22ac", "\\nvdash", !0),
    Ue(Ye, $e, rt, "\u22ad", "\\nvDash", !0),
    Ue(Ye, $e, rt, "\u22ea", "\\ntriangleleft"),
    Ue(Ye, $e, rt, "\u22ec", "\\ntrianglelefteq", !0),
    Ue(Ye, $e, rt, "\u228a", "\\subsetneq", !0),
    Ue(Ye, $e, rt, "\ue01a", "\\@varsubsetneq"),
    Ue(Ye, $e, rt, "\u2acb", "\\subsetneqq", !0),
    Ue(Ye, $e, rt, "\ue017", "\\@varsubsetneqq"),
    Ue(Ye, $e, rt, "\u226f", "\\ngtr", !0),
    Ue(Ye, $e, rt, "\ue00f", "\\@ngeqslant"),
    Ue(Ye, $e, rt, "\ue00e", "\\@ngeqq"),
    Ue(Ye, $e, rt, "\u2a88", "\\gneq", !0),
    Ue(Ye, $e, rt, "\u2269", "\\gneqq", !0),
    Ue(Ye, $e, rt, "\ue00d", "\\@gvertneqq"),
    Ue(Ye, $e, rt, "\u22e7", "\\gnsim", !0),
    Ue(Ye, $e, rt, "\u2a8a", "\\gnapprox", !0),
    Ue(Ye, $e, rt, "\u2281", "\\nsucc", !0),
    Ue(Ye, $e, rt, "\u22e1", "\\nsucceq", !0),
    Ue(Ye, $e, rt, "\u22e9", "\\succnsim", !0),
    Ue(Ye, $e, rt, "\u2aba", "\\succnapprox", !0),
    Ue(Ye, $e, rt, "\u2246", "\\ncong", !0),
    Ue(Ye, $e, rt, "\ue007", "\\@nshortparallel"),
    Ue(Ye, $e, rt, "\u2226", "\\nparallel", !0),
    Ue(Ye, $e, rt, "\u22af", "\\nVDash", !0),
    Ue(Ye, $e, rt, "\u22eb", "\\ntriangleright"),
    Ue(Ye, $e, rt, "\u22ed", "\\ntrianglerighteq", !0),
    Ue(Ye, $e, rt, "\ue018", "\\@nsupseteqq"),
    Ue(Ye, $e, rt, "\u228b", "\\supsetneq", !0),
    Ue(Ye, $e, rt, "\ue01b", "\\@varsupsetneq"),
    Ue(Ye, $e, rt, "\u2acc", "\\supsetneqq", !0),
    Ue(Ye, $e, rt, "\ue019", "\\@varsupsetneqq"),
    Ue(Ye, $e, rt, "\u22ae", "\\nVdash", !0),
    Ue(Ye, $e, rt, "\u2ab5", "\\precneqq", !0),
    Ue(Ye, $e, rt, "\u2ab6", "\\succneqq", !0),
    Ue(Ye, $e, rt, "\ue016", "\\@nsubseteqq"),
    Ue(Ye, $e, _e, "\u22b4", "\\unlhd"),
    Ue(Ye, $e, _e, "\u22b5", "\\unrhd"),
    Ue(Ye, $e, rt, "\u219a", "\\nleftarrow", !0),
    Ue(Ye, $e, rt, "\u219b", "\\nrightarrow", !0),
    Ue(Ye, $e, rt, "\u21cd", "\\nLeftarrow", !0),
    Ue(Ye, $e, rt, "\u21cf", "\\nRightarrow", !0),
    Ue(Ye, $e, rt, "\u21ae", "\\nleftrightarrow", !0),
    Ue(Ye, $e, rt, "\u21ce", "\\nLeftrightarrow", !0),
    Ue(Ye, $e, rt, "\u25b3", "\\vartriangle"),
    Ue(Ye, $e, nt, "\u210f", "\\hslash"),
    Ue(Ye, $e, nt, "\u25bd", "\\triangledown"),
    Ue(Ye, $e, nt, "\u25ca", "\\lozenge"),
    Ue(Ye, $e, nt, "\u24c8", "\\circledS"),
    Ue(Ye, $e, nt, "\xae", "\\circledR"),
    Ue(We, $e, nt, "\xae", "\\circledR"),
    Ue(Ye, $e, nt, "\u2221", "\\measuredangle", !0),
    Ue(Ye, $e, nt, "\u2204", "\\nexists"),
    Ue(Ye, $e, nt, "\u2127", "\\mho"),
    Ue(Ye, $e, nt, "\u2132", "\\Finv", !0),
    Ue(Ye, $e, nt, "\u2141", "\\Game", !0),
    Ue(Ye, $e, nt, "\u2035", "\\backprime"),
    Ue(Ye, $e, nt, "\u25b2", "\\blacktriangle"),
    Ue(Ye, $e, nt, "\u25bc", "\\blacktriangledown"),
    Ue(Ye, $e, nt, "\u25a0", "\\blacksquare"),
    Ue(Ye, $e, nt, "\u29eb", "\\blacklozenge"),
    Ue(Ye, $e, nt, "\u2605", "\\bigstar"),
    Ue(Ye, $e, nt, "\u2222", "\\sphericalangle", !0),
    Ue(Ye, $e, nt, "\u2201", "\\complement", !0),
    Ue(Ye, $e, nt, "\xf0", "\\eth", !0),
    Ue(We, Xe, nt, "\xf0", "\xf0"),
    Ue(Ye, $e, nt, "\u2571", "\\diagup"),
    Ue(Ye, $e, nt, "\u2572", "\\diagdown"),
    Ue(Ye, $e, nt, "\u25a1", "\\square"),
    Ue(Ye, $e, nt, "\u25a1", "\\Box"),
    Ue(Ye, $e, nt, "\u25ca", "\\Diamond"),
    Ue(Ye, $e, nt, "\xa5", "\\yen", !0),
    Ue(We, $e, nt, "\xa5", "\\yen", !0),
    Ue(Ye, $e, nt, "\u2713", "\\checkmark", !0),
    Ue(We, $e, nt, "\u2713", "\\checkmark"),
    Ue(Ye, $e, nt, "\u2136", "\\beth", !0),
    Ue(Ye, $e, nt, "\u2138", "\\daleth", !0),
    Ue(Ye, $e, nt, "\u2137", "\\gimel", !0),
    Ue(Ye, $e, nt, "\u03dd", "\\digamma", !0),
    Ue(Ye, $e, nt, "\u03f0", "\\varkappa"),
    Ue(Ye, $e, et, "\u250c", "\\@ulcorner", !0),
    Ue(Ye, $e, Ze, "\u2510", "\\@urcorner", !0),
    Ue(Ye, $e, et, "\u2514", "\\@llcorner", !0),
    Ue(Ye, $e, Ze, "\u2518", "\\@lrcorner", !0),
    Ue(Ye, $e, rt, "\u2266", "\\leqq", !0),
    Ue(Ye, $e, rt, "\u2a7d", "\\leqslant", !0),
    Ue(Ye, $e, rt, "\u2a95", "\\eqslantless", !0),
    Ue(Ye, $e, rt, "\u2272", "\\lesssim", !0),
    Ue(Ye, $e, rt, "\u2a85", "\\lessapprox", !0),
    Ue(Ye, $e, rt, "\u224a", "\\approxeq", !0),
    Ue(Ye, $e, _e, "\u22d6", "\\lessdot"),
    Ue(Ye, $e, rt, "\u22d8", "\\lll", !0),
    Ue(Ye, $e, rt, "\u2276", "\\lessgtr", !0),
    Ue(Ye, $e, rt, "\u22da", "\\lesseqgtr", !0),
    Ue(Ye, $e, rt, "\u2a8b", "\\lesseqqgtr", !0),
    Ue(Ye, $e, rt, "\u2251", "\\doteqdot"),
    Ue(Ye, $e, rt, "\u2253", "\\risingdotseq", !0),
    Ue(Ye, $e, rt, "\u2252", "\\fallingdotseq", !0),
    Ue(Ye, $e, rt, "\u223d", "\\backsim", !0),
    Ue(Ye, $e, rt, "\u22cd", "\\backsimeq", !0),
    Ue(Ye, $e, rt, "\u2ac5", "\\subseteqq", !0),
    Ue(Ye, $e, rt, "\u22d0", "\\Subset", !0),
    Ue(Ye, $e, rt, "\u228f", "\\sqsubset", !0),
    Ue(Ye, $e, rt, "\u227c", "\\preccurlyeq", !0),
    Ue(Ye, $e, rt, "\u22de", "\\curlyeqprec", !0),
    Ue(Ye, $e, rt, "\u227e", "\\precsim", !0),
    Ue(Ye, $e, rt, "\u2ab7", "\\precapprox", !0),
    Ue(Ye, $e, rt, "\u22b2", "\\vartriangleleft"),
    Ue(Ye, $e, rt, "\u22b4", "\\trianglelefteq"),
    Ue(Ye, $e, rt, "\u22a8", "\\vDash", !0),
    Ue(Ye, $e, rt, "\u22aa", "\\Vvdash", !0),
    Ue(Ye, $e, rt, "\u2323", "\\smallsmile"),
    Ue(Ye, $e, rt, "\u2322", "\\smallfrown"),
    Ue(Ye, $e, rt, "\u224f", "\\bumpeq", !0),
    Ue(Ye, $e, rt, "\u224e", "\\Bumpeq", !0),
    Ue(Ye, $e, rt, "\u2267", "\\geqq", !0),
    Ue(Ye, $e, rt, "\u2a7e", "\\geqslant", !0),
    Ue(Ye, $e, rt, "\u2a96", "\\eqslantgtr", !0),
    Ue(Ye, $e, rt, "\u2273", "\\gtrsim", !0),
    Ue(Ye, $e, rt, "\u2a86", "\\gtrapprox", !0),
    Ue(Ye, $e, _e, "\u22d7", "\\gtrdot"),
    Ue(Ye, $e, rt, "\u22d9", "\\ggg", !0),
    Ue(Ye, $e, rt, "\u2277", "\\gtrless", !0),
    Ue(Ye, $e, rt, "\u22db", "\\gtreqless", !0),
    Ue(Ye, $e, rt, "\u2a8c", "\\gtreqqless", !0),
    Ue(Ye, $e, rt, "\u2256", "\\eqcirc", !0),
    Ue(Ye, $e, rt, "\u2257", "\\circeq", !0),
    Ue(Ye, $e, rt, "\u225c", "\\triangleq", !0),
    Ue(Ye, $e, rt, "\u223c", "\\thicksim"),
    Ue(Ye, $e, rt, "\u2248", "\\thickapprox"),
    Ue(Ye, $e, rt, "\u2ac6", "\\supseteqq", !0),
    Ue(Ye, $e, rt, "\u22d1", "\\Supset", !0),
    Ue(Ye, $e, rt, "\u2290", "\\sqsupset", !0),
    Ue(Ye, $e, rt, "\u227d", "\\succcurlyeq", !0),
    Ue(Ye, $e, rt, "\u22df", "\\curlyeqsucc", !0),
    Ue(Ye, $e, rt, "\u227f", "\\succsim", !0),
    Ue(Ye, $e, rt, "\u2ab8", "\\succapprox", !0),
    Ue(Ye, $e, rt, "\u22b3", "\\vartriangleright"),
    Ue(Ye, $e, rt, "\u22b5", "\\trianglerighteq"),
    Ue(Ye, $e, rt, "\u22a9", "\\Vdash", !0),
    Ue(Ye, $e, rt, "\u2223", "\\shortmid"),
    Ue(Ye, $e, rt, "\u2225", "\\shortparallel"),
    Ue(Ye, $e, rt, "\u226c", "\\between", !0),
    Ue(Ye, $e, rt, "\u22d4", "\\pitchfork", !0),
    Ue(Ye, $e, rt, "\u221d", "\\varpropto"),
    Ue(Ye, $e, rt, "\u25c0", "\\blacktriangleleft"),
    Ue(Ye, $e, rt, "\u2234", "\\therefore", !0),
    Ue(Ye, $e, rt, "\u220d", "\\backepsilon"),
    Ue(Ye, $e, rt, "\u25b6", "\\blacktriangleright"),
    Ue(Ye, $e, rt, "\u2235", "\\because", !0),
    Ue(Ye, $e, rt, "\u22d8", "\\llless"),
    Ue(Ye, $e, rt, "\u22d9", "\\gggtr"),
    Ue(Ye, $e, _e, "\u22b2", "\\lhd"),
    Ue(Ye, $e, _e, "\u22b3", "\\rhd"),
    Ue(Ye, $e, rt, "\u2242", "\\eqsim", !0),
    Ue(Ye, Xe, rt, "\u22c8", "\\Join"),
    Ue(Ye, $e, rt, "\u2251", "\\Doteq", !0),
    Ue(Ye, $e, _e, "\u2214", "\\dotplus", !0),
    Ue(Ye, $e, _e, "\u2216", "\\smallsetminus"),
    Ue(Ye, $e, _e, "\u22d2", "\\Cap", !0),
    Ue(Ye, $e, _e, "\u22d3", "\\Cup", !0),
    Ue(Ye, $e, _e, "\u2a5e", "\\doublebarwedge", !0),
    Ue(Ye, $e, _e, "\u229f", "\\boxminus", !0),
    Ue(Ye, $e, _e, "\u229e", "\\boxplus", !0),
    Ue(Ye, $e, _e, "\u22c7", "\\divideontimes", !0),
    Ue(Ye, $e, _e, "\u22c9", "\\ltimes", !0),
    Ue(Ye, $e, _e, "\u22ca", "\\rtimes", !0),
    Ue(Ye, $e, _e, "\u22cb", "\\leftthreetimes", !0),
    Ue(Ye, $e, _e, "\u22cc", "\\rightthreetimes", !0),
    Ue(Ye, $e, _e, "\u22cf", "\\curlywedge", !0),
    Ue(Ye, $e, _e, "\u22ce", "\\curlyvee", !0),
    Ue(Ye, $e, _e, "\u229d", "\\circleddash", !0),
    Ue(Ye, $e, _e, "\u229b", "\\circledast", !0),
    Ue(Ye, $e, _e, "\u22c5", "\\centerdot"),
    Ue(Ye, $e, _e, "\u22ba", "\\intercal", !0),
    Ue(Ye, $e, _e, "\u22d2", "\\doublecap"),
    Ue(Ye, $e, _e, "\u22d3", "\\doublecup"),
    Ue(Ye, $e, _e, "\u22a0", "\\boxtimes", !0),
    Ue(Ye, $e, rt, "\u21e2", "\\dashrightarrow", !0),
    Ue(Ye, $e, rt, "\u21e0", "\\dashleftarrow", !0),
    Ue(Ye, $e, rt, "\u21c7", "\\leftleftarrows", !0),
    Ue(Ye, $e, rt, "\u21c6", "\\leftrightarrows", !0),
    Ue(Ye, $e, rt, "\u21da", "\\Lleftarrow", !0),
    Ue(Ye, $e, rt, "\u219e", "\\twoheadleftarrow", !0),
    Ue(Ye, $e, rt, "\u21a2", "\\leftarrowtail", !0),
    Ue(Ye, $e, rt, "\u21ab", "\\looparrowleft", !0),
    Ue(Ye, $e, rt, "\u21cb", "\\leftrightharpoons", !0),
    Ue(Ye, $e, rt, "\u21b6", "\\curvearrowleft", !0),
    Ue(Ye, $e, rt, "\u21ba", "\\circlearrowleft", !0),
    Ue(Ye, $e, rt, "\u21b0", "\\Lsh", !0),
    Ue(Ye, $e, rt, "\u21c8", "\\upuparrows", !0),
    Ue(Ye, $e, rt, "\u21bf", "\\upharpoonleft", !0),
    Ue(Ye, $e, rt, "\u21c3", "\\downharpoonleft", !0),
    Ue(Ye, Xe, rt, "\u22b6", "\\origof", !0),
    Ue(Ye, Xe, rt, "\u22b7", "\\imageof", !0),
    Ue(Ye, $e, rt, "\u22b8", "\\multimap", !0),
    Ue(Ye, $e, rt, "\u21ad", "\\leftrightsquigarrow", !0),
    Ue(Ye, $e, rt, "\u21c9", "\\rightrightarrows", !0),
    Ue(Ye, $e, rt, "\u21c4", "\\rightleftarrows", !0),
    Ue(Ye, $e, rt, "\u21a0", "\\twoheadrightarrow", !0),
    Ue(Ye, $e, rt, "\u21a3", "\\rightarrowtail", !0),
    Ue(Ye, $e, rt, "\u21ac", "\\looparrowright", !0),
    Ue(Ye, $e, rt, "\u21b7", "\\curvearrowright", !0),
    Ue(Ye, $e, rt, "\u21bb", "\\circlearrowright", !0),
    Ue(Ye, $e, rt, "\u21b1", "\\Rsh", !0),
    Ue(Ye, $e, rt, "\u21ca", "\\downdownarrows", !0),
    Ue(Ye, $e, rt, "\u21be", "\\upharpoonright", !0),
    Ue(Ye, $e, rt, "\u21c2", "\\downharpoonright", !0),
    Ue(Ye, $e, rt, "\u21dd", "\\rightsquigarrow", !0),
    Ue(Ye, $e, rt, "\u21dd", "\\leadsto"),
    Ue(Ye, $e, rt, "\u21db", "\\Rrightarrow", !0),
    Ue(Ye, $e, rt, "\u21be", "\\restriction"),
    Ue(Ye, Xe, nt, "\u2018", "`"),
    Ue(Ye, Xe, nt, "$", "\\$"),
    Ue(We, Xe, nt, "$", "\\$"),
    Ue(We, Xe, nt, "$", "\\textdollar"),
    Ue(Ye, Xe, nt, "%", "\\%"),
    Ue(We, Xe, nt, "%", "\\%"),
    Ue(Ye, Xe, nt, "_", "\\_"),
    Ue(We, Xe, nt, "_", "\\_"),
    Ue(We, Xe, nt, "_", "\\textunderscore"),
    Ue(Ye, Xe, nt, "\u2220", "\\angle", !0),
    Ue(Ye, Xe, nt, "\u221e", "\\infty", !0),
    Ue(Ye, Xe, nt, "\u2032", "\\prime"),
    Ue(Ye, Xe, nt, "\u25b3", "\\triangle"),
    Ue(Ye, Xe, nt, "\u0393", "\\Gamma", !0),
    Ue(Ye, Xe, nt, "\u0394", "\\Delta", !0),
    Ue(Ye, Xe, nt, "\u0398", "\\Theta", !0),
    Ue(Ye, Xe, nt, "\u039b", "\\Lambda", !0),
    Ue(Ye, Xe, nt, "\u039e", "\\Xi", !0),
    Ue(Ye, Xe, nt, "\u03a0", "\\Pi", !0),
    Ue(Ye, Xe, nt, "\u03a3", "\\Sigma", !0),
    Ue(Ye, Xe, nt, "\u03a5", "\\Upsilon", !0),
    Ue(Ye, Xe, nt, "\u03a6", "\\Phi", !0),
    Ue(Ye, Xe, nt, "\u03a8", "\\Psi", !0),
    Ue(Ye, Xe, nt, "\u03a9", "\\Omega", !0),
    Ue(Ye, Xe, nt, "A", "\u0391"),
    Ue(Ye, Xe, nt, "B", "\u0392"),
    Ue(Ye, Xe, nt, "E", "\u0395"),
    Ue(Ye, Xe, nt, "Z", "\u0396"),
    Ue(Ye, Xe, nt, "H", "\u0397"),
    Ue(Ye, Xe, nt, "I", "\u0399"),
    Ue(Ye, Xe, nt, "K", "\u039a"),
    Ue(Ye, Xe, nt, "M", "\u039c"),
    Ue(Ye, Xe, nt, "N", "\u039d"),
    Ue(Ye, Xe, nt, "O", "\u039f"),
    Ue(Ye, Xe, nt, "P", "\u03a1"),
    Ue(Ye, Xe, nt, "T", "\u03a4"),
    Ue(Ye, Xe, nt, "X", "\u03a7"),
    Ue(Ye, Xe, nt, "\xac", "\\neg", !0),
    Ue(Ye, Xe, nt, "\xac", "\\lnot"),
    Ue(Ye, Xe, nt, "\u22a4", "\\top"),
    Ue(Ye, Xe, nt, "\u22a5", "\\bot"),
    Ue(Ye, Xe, nt, "\u2205", "\\emptyset"),
    Ue(Ye, $e, nt, "\u2205", "\\varnothing"),
    Ue(Ye, Xe, Je, "\u03b1", "\\alpha", !0),
    Ue(Ye, Xe, Je, "\u03b2", "\\beta", !0),
    Ue(Ye, Xe, Je, "\u03b3", "\\gamma", !0),
    Ue(Ye, Xe, Je, "\u03b4", "\\delta", !0),
    Ue(Ye, Xe, Je, "\u03f5", "\\epsilon", !0),
    Ue(Ye, Xe, Je, "\u03b6", "\\zeta", !0),
    Ue(Ye, Xe, Je, "\u03b7", "\\eta", !0),
    Ue(Ye, Xe, Je, "\u03b8", "\\theta", !0),
    Ue(Ye, Xe, Je, "\u03b9", "\\iota", !0),
    Ue(Ye, Xe, Je, "\u03ba", "\\kappa", !0),
    Ue(Ye, Xe, Je, "\u03bb", "\\lambda", !0),
    Ue(Ye, Xe, Je, "\u03bc", "\\mu", !0),
    Ue(Ye, Xe, Je, "\u03bd", "\\nu", !0),
    Ue(Ye, Xe, Je, "\u03be", "\\xi", !0),
    Ue(Ye, Xe, Je, "\u03bf", "\\omicron", !0),
    Ue(Ye, Xe, Je, "\u03c0", "\\pi", !0),
    Ue(Ye, Xe, Je, "\u03c1", "\\rho", !0),
    Ue(Ye, Xe, Je, "\u03c3", "\\sigma", !0),
    Ue(Ye, Xe, Je, "\u03c4", "\\tau", !0),
    Ue(Ye, Xe, Je, "\u03c5", "\\upsilon", !0),
    Ue(Ye, Xe, Je, "\u03d5", "\\phi", !0),
    Ue(Ye, Xe, Je, "\u03c7", "\\chi", !0),
    Ue(Ye, Xe, Je, "\u03c8", "\\psi", !0),
    Ue(Ye, Xe, Je, "\u03c9", "\\omega", !0),
    Ue(Ye, Xe, Je, "\u03b5", "\\varepsilon", !0),
    Ue(Ye, Xe, Je, "\u03d1", "\\vartheta", !0),
    Ue(Ye, Xe, Je, "\u03d6", "\\varpi", !0),
    Ue(Ye, Xe, Je, "\u03f1", "\\varrho", !0),
    Ue(Ye, Xe, Je, "\u03c2", "\\varsigma", !0),
    Ue(Ye, Xe, Je, "\u03c6", "\\varphi", !0),
    Ue(Ye, Xe, _e, "\u2217", "*", !0),
    Ue(Ye, Xe, _e, "+", "+"),
    Ue(Ye, Xe, _e, "\u2212", "-", !0),
    Ue(Ye, Xe, _e, "\u22c5", "\\cdot", !0),
    Ue(Ye, Xe, _e, "\u2218", "\\circ", !0),
    Ue(Ye, Xe, _e, "\xf7", "\\div", !0),
    Ue(Ye, Xe, _e, "\xb1", "\\pm", !0),
    Ue(Ye, Xe, _e, "\xd7", "\\times", !0),
    Ue(Ye, Xe, _e, "\u2229", "\\cap", !0),
    Ue(Ye, Xe, _e, "\u222a", "\\cup", !0),
    Ue(Ye, Xe, _e, "\u2216", "\\setminus", !0),
    Ue(Ye, Xe, _e, "\u2227", "\\land"),
    Ue(Ye, Xe, _e, "\u2228", "\\lor"),
    Ue(Ye, Xe, _e, "\u2227", "\\wedge", !0),
    Ue(Ye, Xe, _e, "\u2228", "\\vee", !0),
    Ue(Ye, Xe, nt, "\u221a", "\\surd"),
    Ue(Ye, Xe, et, "\u27e8", "\\langle", !0),
    Ue(Ye, Xe, et, "\u2223", "\\lvert"),
    Ue(Ye, Xe, et, "\u2225", "\\lVert"),
    Ue(Ye, Xe, Ze, "?", "?"),
    Ue(Ye, Xe, Ze, "!", "!"),
    Ue(Ye, Xe, Ze, "\u27e9", "\\rangle", !0),
    Ue(Ye, Xe, Ze, "\u2223", "\\rvert"),
    Ue(Ye, Xe, Ze, "\u2225", "\\rVert"),
    Ue(Ye, Xe, rt, "=", "="),
    Ue(Ye, Xe, rt, ":", ":"),
    Ue(Ye, Xe, rt, "\u2248", "\\approx", !0),
    Ue(Ye, Xe, rt, "\u2245", "\\cong", !0),
    Ue(Ye, Xe, rt, "\u2265", "\\ge"),
    Ue(Ye, Xe, rt, "\u2265", "\\geq", !0),
    Ue(Ye, Xe, rt, "\u2190", "\\gets"),
    Ue(Ye, Xe, rt, ">", "\\gt", !0),
    Ue(Ye, Xe, rt, "\u2208", "\\in", !0),
    Ue(Ye, Xe, rt, "\ue020", "\\@not"),
    Ue(Ye, Xe, rt, "\u2282", "\\subset", !0),
    Ue(Ye, Xe, rt, "\u2283", "\\supset", !0),
    Ue(Ye, Xe, rt, "\u2286", "\\subseteq", !0),
    Ue(Ye, Xe, rt, "\u2287", "\\supseteq", !0),
    Ue(Ye, $e, rt, "\u2288", "\\nsubseteq", !0),
    Ue(Ye, $e, rt, "\u2289", "\\nsupseteq", !0),
    Ue(Ye, Xe, rt, "\u22a8", "\\models"),
    Ue(Ye, Xe, rt, "\u2190", "\\leftarrow", !0),
    Ue(Ye, Xe, rt, "\u2264", "\\le"),
    Ue(Ye, Xe, rt, "\u2264", "\\leq", !0),
    Ue(Ye, Xe, rt, "<", "\\lt", !0),
    Ue(Ye, Xe, rt, "\u2192", "\\rightarrow", !0),
    Ue(Ye, Xe, rt, "\u2192", "\\to"),
    Ue(Ye, $e, rt, "\u2271", "\\ngeq", !0),
    Ue(Ye, $e, rt, "\u2270", "\\nleq", !0),
    Ue(Ye, Xe, at, "\xa0", "\\ "),
    Ue(Ye, Xe, at, "\xa0", "\\space"),
    Ue(Ye, Xe, at, "\xa0", "\\nobreakspace"),
    Ue(We, Xe, at, "\xa0", "\\ "),
    Ue(We, Xe, at, "\xa0", " "),
    Ue(We, Xe, at, "\xa0", "\\space"),
    Ue(We, Xe, at, "\xa0", "\\nobreakspace"),
    Ue(Ye, Xe, at, null, "\\nobreak"),
    Ue(Ye, Xe, at, null, "\\allowbreak"),
    Ue(Ye, Xe, tt, ",", ","),
    Ue(Ye, Xe, tt, ";", ";"),
    Ue(Ye, $e, _e, "\u22bc", "\\barwedge", !0),
    Ue(Ye, $e, _e, "\u22bb", "\\veebar", !0),
    Ue(Ye, Xe, _e, "\u2299", "\\odot", !0),
    Ue(Ye, Xe, _e, "\u2295", "\\oplus", !0),
    Ue(Ye, Xe, _e, "\u2297", "\\otimes", !0),
    Ue(Ye, Xe, nt, "\u2202", "\\partial", !0),
    Ue(Ye, Xe, _e, "\u2298", "\\oslash", !0),
    Ue(Ye, $e, _e, "\u229a", "\\circledcirc", !0),
    Ue(Ye, $e, _e, "\u22a1", "\\boxdot", !0),
    Ue(Ye, Xe, _e, "\u25b3", "\\bigtriangleup"),
    Ue(Ye, Xe, _e, "\u25bd", "\\bigtriangledown"),
    Ue(Ye, Xe, _e, "\u2020", "\\dagger"),
    Ue(Ye, Xe, _e, "\u22c4", "\\diamond"),
    Ue(Ye, Xe, _e, "\u22c6", "\\star"),
    Ue(Ye, Xe, _e, "\u25c3", "\\triangleleft"),
    Ue(Ye, Xe, _e, "\u25b9", "\\triangleright"),
    Ue(Ye, Xe, et, "{", "\\{"),
    Ue(We, Xe, nt, "{", "\\{"),
    Ue(We, Xe, nt, "{", "\\textbraceleft"),
    Ue(Ye, Xe, Ze, "}", "\\}"),
    Ue(We, Xe, nt, "}", "\\}"),
    Ue(We, Xe, nt, "}", "\\textbraceright"),
    Ue(Ye, Xe, et, "{", "\\lbrace"),
    Ue(Ye, Xe, Ze, "}", "\\rbrace"),
    Ue(Ye, Xe, et, "[", "\\lbrack", !0),
    Ue(We, Xe, nt, "[", "\\lbrack", !0),
    Ue(Ye, Xe, Ze, "]", "\\rbrack", !0),
    Ue(We, Xe, nt, "]", "\\rbrack", !0),
    Ue(Ye, Xe, et, "(", "\\lparen", !0),
    Ue(Ye, Xe, Ze, ")", "\\rparen", !0),
    Ue(We, Xe, nt, "<", "\\textless", !0),
    Ue(We, Xe, nt, ">", "\\textgreater", !0),
    Ue(Ye, Xe, et, "\u230a", "\\lfloor", !0),
    Ue(Ye, Xe, Ze, "\u230b", "\\rfloor", !0),
    Ue(Ye, Xe, et, "\u2308", "\\lceil", !0),
    Ue(Ye, Xe, Ze, "\u2309", "\\rceil", !0),
    Ue(Ye, Xe, nt, "\\", "\\backslash"),
    Ue(Ye, Xe, nt, "\u2223", "|"),
    Ue(Ye, Xe, nt, "\u2223", "\\vert"),
    Ue(We, Xe, nt, "|", "\\textbar", !0),
    Ue(Ye, Xe, nt, "\u2225", "\\|"),
    Ue(Ye, Xe, nt, "\u2225", "\\Vert"),
    Ue(We, Xe, nt, "\u2225", "\\textbardbl"),
    Ue(We, Xe, nt, "~", "\\textasciitilde"),
    Ue(We, Xe, nt, "\\", "\\textbackslash"),
    Ue(We, Xe, nt, "^", "\\textasciicircum"),
    Ue(Ye, Xe, rt, "\u2191", "\\uparrow", !0),
    Ue(Ye, Xe, rt, "\u21d1", "\\Uparrow", !0),
    Ue(Ye, Xe, rt, "\u2193", "\\downarrow", !0),
    Ue(Ye, Xe, rt, "\u21d3", "\\Downarrow", !0),
    Ue(Ye, Xe, rt, "\u2195", "\\updownarrow", !0),
    Ue(Ye, Xe, rt, "\u21d5", "\\Updownarrow", !0),
    Ue(Ye, Xe, Qe, "\u2210", "\\coprod"),
    Ue(Ye, Xe, Qe, "\u22c1", "\\bigvee"),
    Ue(Ye, Xe, Qe, "\u22c0", "\\bigwedge"),
    Ue(Ye, Xe, Qe, "\u2a04", "\\biguplus"),
    Ue(Ye, Xe, Qe, "\u22c2", "\\bigcap"),
    Ue(Ye, Xe, Qe, "\u22c3", "\\bigcup"),
    Ue(Ye, Xe, Qe, "\u222b", "\\int"),
    Ue(Ye, Xe, Qe, "\u222b", "\\intop"),
    Ue(Ye, Xe, Qe, "\u222c", "\\iint"),
    Ue(Ye, Xe, Qe, "\u222d", "\\iiint"),
    Ue(Ye, Xe, Qe, "\u220f", "\\prod"),
    Ue(Ye, Xe, Qe, "\u2211", "\\sum"),
    Ue(Ye, Xe, Qe, "\u2a02", "\\bigotimes"),
    Ue(Ye, Xe, Qe, "\u2a01", "\\bigoplus"),
    Ue(Ye, Xe, Qe, "\u2a00", "\\bigodot"),
    Ue(Ye, Xe, Qe, "\u222e", "\\oint"),
    Ue(Ye, Xe, Qe, "\u222f", "\\oiint"),
    Ue(Ye, Xe, Qe, "\u2230", "\\oiiint"),
    Ue(Ye, Xe, Qe, "\u2a06", "\\bigsqcup"),
    Ue(Ye, Xe, Qe, "\u222b", "\\smallint"),
    Ue(We, Xe, Ke, "\u2026", "\\textellipsis"),
    Ue(Ye, Xe, Ke, "\u2026", "\\mathellipsis"),
    Ue(We, Xe, Ke, "\u2026", "\\ldots", !0),
    Ue(Ye, Xe, Ke, "\u2026", "\\ldots", !0),
    Ue(Ye, Xe, Ke, "\u22ef", "\\@cdots", !0),
    Ue(Ye, Xe, Ke, "\u22f1", "\\ddots", !0),
    Ue(Ye, Xe, nt, "\u22ee", "\\varvdots"),
    Ue(Ye, Xe, je, "\u02ca", "\\acute"),
    Ue(Ye, Xe, je, "\u02cb", "\\grave"),
    Ue(Ye, Xe, je, "\xa8", "\\ddot"),
    Ue(Ye, Xe, je, "~", "\\tilde"),
    Ue(Ye, Xe, je, "\u02c9", "\\bar"),
    Ue(Ye, Xe, je, "\u02d8", "\\breve"),
    Ue(Ye, Xe, je, "\u02c7", "\\check"),
    Ue(Ye, Xe, je, "^", "\\hat"),
    Ue(Ye, Xe, je, "\u20d7", "\\vec"),
    Ue(Ye, Xe, je, "\u02d9", "\\dot"),
    Ue(Ye, Xe, je, "\u02da", "\\mathring"),
    Ue(Ye, Xe, Je, "\ue131", "\\@imath"),
    Ue(Ye, Xe, Je, "\ue237", "\\@jmath"),
    Ue(Ye, Xe, nt, "\u0131", "\u0131"),
    Ue(Ye, Xe, nt, "\u0237", "\u0237"),
    Ue(We, Xe, nt, "\u0131", "\\i", !0),
    Ue(We, Xe, nt, "\u0237", "\\j", !0),
    Ue(We, Xe, nt, "\xdf", "\\ss", !0),
    Ue(We, Xe, nt, "\xe6", "\\ae", !0),
    Ue(We, Xe, nt, "\u0153", "\\oe", !0),
    Ue(We, Xe, nt, "\xf8", "\\o", !0),
    Ue(We, Xe, nt, "\xc6", "\\AE", !0),
    Ue(We, Xe, nt, "\u0152", "\\OE", !0),
    Ue(We, Xe, nt, "\xd8", "\\O", !0),
    Ue(We, Xe, je, "\u02ca", "\\'"),
    Ue(We, Xe, je, "\u02cb", "\\`"),
    Ue(We, Xe, je, "\u02c6", "\\^"),
    Ue(We, Xe, je, "\u02dc", "\\~"),
    Ue(We, Xe, je, "\u02c9", "\\="),
    Ue(We, Xe, je, "\u02d8", "\\u"),
    Ue(We, Xe, je, "\u02d9", "\\."),
    Ue(We, Xe, je, "\xb8", "\\c"),
    Ue(We, Xe, je, "\u02da", "\\r"),
    Ue(We, Xe, je, "\u02c7", "\\v"),
    Ue(We, Xe, je, "\xa8", '\\"'),
    Ue(We, Xe, je, "\u02dd", "\\H"),
    Ue(We, Xe, je, "\u25ef", "\\textcircled");
    var it = {
        "--": !0,
        "---": !0,
        "``": !0,
        "''": !0
    };
    Ue(We, Xe, nt, "\u2013", "--", !0),
    Ue(We, Xe, nt, "\u2013", "\\textendash"),
    Ue(We, Xe, nt, "\u2014", "---", !0),
    Ue(We, Xe, nt, "\u2014", "\\textemdash"),
    Ue(We, Xe, nt, "\u2018", "`", !0),
    Ue(We, Xe, nt, "\u2018", "\\textquoteleft"),
    Ue(We, Xe, nt, "\u2019", "'", !0),
    Ue(We, Xe, nt, "\u2019", "\\textquoteright"),
    Ue(We, Xe, nt, "\u201c", "``", !0),
    Ue(We, Xe, nt, "\u201c", "\\textquotedblleft"),
    Ue(We, Xe, nt, "\u201d", "''", !0),
    Ue(We, Xe, nt, "\u201d", "\\textquotedblright"),
    Ue(Ye, Xe, nt, "\xb0", "\\degree", !0),
    Ue(We, Xe, nt, "\xb0", "\\degree"),
    Ue(We, Xe, nt, "\xb0", "\\textdegree", !0),
    Ue(Ye, Xe, nt, "\xa3", "\\pounds"),
    Ue(Ye, Xe, nt, "\xa3", "\\mathsterling", !0),
    Ue(We, Xe, nt, "\xa3", "\\pounds"),
    Ue(We, Xe, nt, "\xa3", "\\textsterling", !0),
    Ue(Ye, $e, nt, "\u2720", "\\maltese"),
    Ue(We, $e, nt, "\u2720", "\\maltese");
    for (var ot = 0; ot < 14; ot++) {
        var st = '0123456789/@."'.charAt(ot);
        Ue(Ye, Xe, nt, st, st)
    }
    for (var lt = 0; lt < 25; lt++) {
        var ht = '0123456789!@*()-=+";:?/.,'.charAt(lt);
        Ue(We, Xe, nt, ht, ht)
    }
    for (var mt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", ct = 0; ct < 52; ct++) {
        var pt = mt.charAt(ct);
        Ue(Ye, Xe, Je, pt, pt),
        Ue(We, Xe, nt, pt, pt)
    }
    Ue(Ye, $e, nt, "C", "\u2102"),
    Ue(We, $e, nt, "C", "\u2102"),
    Ue(Ye, $e, nt, "H", "\u210d"),
    Ue(We, $e, nt, "H", "\u210d"),
    Ue(Ye, $e, nt, "N", "\u2115"),
    Ue(We, $e, nt, "N", "\u2115"),
    Ue(Ye, $e, nt, "P", "\u2119"),
    Ue(We, $e, nt, "P", "\u2119"),
    Ue(Ye, $e, nt, "Q", "\u211a"),
    Ue(We, $e, nt, "Q", "\u211a"),
    Ue(Ye, $e, nt, "R", "\u211d"),
    Ue(We, $e, nt, "R", "\u211d"),
    Ue(Ye, $e, nt, "Z", "\u2124"),
    Ue(We, $e, nt, "Z", "\u2124"),
    Ue(Ye, Xe, Je, "h", "\u210e"),
    Ue(We, Xe, Je, "h", "\u210e");
    for (var ut = "", dt = 0; dt < 52; dt++) {
        var gt = mt.charAt(dt);
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56320 + dt)),
        Ue(We, Xe, nt, gt, ut),
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56372 + dt)),
        Ue(We, Xe, nt, gt, ut),
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56424 + dt)),
        Ue(We, Xe, nt, gt, ut),
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56580 + dt)),
        Ue(We, Xe, nt, gt, ut),
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56684 + dt)),
        Ue(We, Xe, nt, gt, ut),
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56736 + dt)),
        Ue(We, Xe, nt, gt, ut),
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56788 + dt)),
        Ue(We, Xe, nt, gt, ut),
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56840 + dt)),
        Ue(We, Xe, nt, gt, ut),
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56944 + dt)),
        Ue(We, Xe, nt, gt, ut),
        dt < 26 && (Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56632 + dt)),
        Ue(We, Xe, nt, gt, ut),
        Ue(Ye, Xe, Je, gt, ut = String.fromCharCode(55349, 56476 + dt)),
        Ue(We, Xe, nt, gt, ut))
    }
    Ue(Ye, Xe, Je, "k", ut = String.fromCharCode(55349, 56668)),
    Ue(We, Xe, nt, "k", ut);
    for (var ft = 0; ft < 10; ft++) {
        var vt = ft.toString();
        Ue(Ye, Xe, Je, vt, ut = String.fromCharCode(55349, 57294 + ft)),
        Ue(We, Xe, nt, vt, ut),
        Ue(Ye, Xe, Je, vt, ut = String.fromCharCode(55349, 57314 + ft)),
        Ue(We, Xe, nt, vt, ut),
        Ue(Ye, Xe, Je, vt, ut = String.fromCharCode(55349, 57324 + ft)),
        Ue(We, Xe, nt, vt, ut),
        Ue(Ye, Xe, Je, vt, ut = String.fromCharCode(55349, 57334 + ft)),
        Ue(We, Xe, nt, vt, ut)
    }
    for (var bt = 0; bt < 3; bt++) {
        var yt = "\xd0\xde\xfe".charAt(bt);
        Ue(Ye, Xe, Je, yt, yt),
        Ue(We, Xe, nt, yt, yt)
    }
    var xt = [["mathbf", "textbf", "Main-Bold"], ["mathbf", "textbf", "Main-Bold"], ["mathnormal", "textit", "Math-Italic"], ["mathnormal", "textit", "Math-Italic"], ["boldsymbol", "boldsymbol", "Main-BoldItalic"], ["boldsymbol", "boldsymbol", "Main-BoldItalic"], ["mathscr", "textscr", "Script-Regular"], ["", "", ""], ["", "", ""], ["", "", ""], ["mathfrak", "textfrak", "Fraktur-Regular"], ["mathfrak", "textfrak", "Fraktur-Regular"], ["mathbb", "textbb", "AMS-Regular"], ["mathbb", "textbb", "AMS-Regular"], ["mathboldfrak", "textboldfrak", "Fraktur-Regular"], ["mathboldfrak", "textboldfrak", "Fraktur-Regular"], ["mathsf", "textsf", "SansSerif-Regular"], ["mathsf", "textsf", "SansSerif-Regular"], ["mathboldsf", "textboldsf", "SansSerif-Bold"], ["mathboldsf", "textboldsf", "SansSerif-Bold"], ["mathitsf", "textitsf", "SansSerif-Italic"], ["mathitsf", "textitsf", "SansSerif-Italic"], ["", "", ""], ["", "", ""], ["mathtt", "texttt", "Typewriter-Regular"], ["mathtt", "texttt", "Typewriter-Regular"]]
      , wt = [["mathbf", "textbf", "Main-Bold"], ["", "", ""], ["mathsf", "textsf", "SansSerif-Regular"], ["mathboldsf", "textboldsf", "SansSerif-Bold"], ["mathtt", "texttt", "Typewriter-Regular"]]
      , kt = function(e, t, r) {
        return Ge[r][e] && Ge[r][e].replace && (e = Ge[r][e].replace),
        {
            value: e,
            metrics: fe(e, t, r)
        }
    }
      , St = function(e, t, r, a, n) {
        var i, o = kt(e, t, r), s = o.metrics;
        if (e = o.value,
        s) {
            var l = s.italic;
            ("text" === r || a && "mathit" === a.font) && (l = 0),
            i = new Oe(e,s.height,s.depth,l,s.skew,s.width,n)
        } else
            "undefined" != typeof console && console.warn("No character metrics for '" + e + "' in style '" + t + "' and mode '" + r + "'"),
            i = new Oe(e,0,0,0,0,0,n);
        if (a) {
            i.maxFontSize = a.sizeMultiplier,
            a.style.isTight() && i.classes.push("mtight");
            var h = a.getColor();
            h && (i.style.color = h)
        }
        return i
    }
      , Mt = (e,t)=>{
        if (Te(e.classes) !== Te(t.classes) || e.skew !== t.skew || e.maxFontSize !== t.maxFontSize)
            return !1;
        if (1 === e.classes.length) {
            var r = e.classes[0];
            if ("mbin" === r || "mord" === r)
                return !1
        }
        for (var a in e.style)
            if (e.style.hasOwnProperty(a) && e.style[a] !== t.style[a])
                return !1;
        for (var n in t.style)
            if (t.style.hasOwnProperty(n) && e.style[n] !== t.style[n])
                return !1;
        return !0
    }
      , zt = function(e) {
        for (var t = 0, r = 0, a = 0, n = 0; n < e.children.length; n++) {
            var i = e.children[n];
            i.height > t && (t = i.height),
            i.depth > r && (r = i.depth),
            i.maxFontSize > a && (a = i.maxFontSize)
        }
        e.height = t,
        e.depth = r,
        e.maxFontSize = a
    }
      , At = function(e, t, r, a) {
        var n = new qe(e,t,r,a);
        return zt(n),
        n
    }
      , Tt = (e,t,r,a)=>new qe(e,t,r,a)
      , Bt = function(e) {
        var t = new pe(e);
        return zt(t),
        t
    }
      , Nt = function(e, t, r) {
        var a = "";
        switch (e) {
        case "amsrm":
            a = "AMS";
            break;
        case "textrm":
            a = "Main";
            break;
        case "textsf":
            a = "SansSerif";
            break;
        case "texttt":
            a = "Typewriter";
            break;
        default:
            a = e
        }
        return a + "-" + ("textbf" === t && "textit" === r ? "BoldItalic" : "textbf" === t ? "Bold" : "textit" === t ? "Italic" : "Regular")
    }
      , Ct = {
        mathbf: {
            variant: "bold",
            fontName: "Main-Bold"
        },
        mathrm: {
            variant: "normal",
            fontName: "Main-Regular"
        },
        textit: {
            variant: "italic",
            fontName: "Main-Italic"
        },
        mathit: {
            variant: "italic",
            fontName: "Main-Italic"
        },
        mathnormal: {
            variant: "italic",
            fontName: "Math-Italic"
        },
        mathbb: {
            variant: "double-struck",
            fontName: "AMS-Regular"
        },
        mathcal: {
            variant: "script",
            fontName: "Caligraphic-Regular"
        },
        mathfrak: {
            variant: "fraktur",
            fontName: "Fraktur-Regular"
        },
        mathscr: {
            variant: "script",
            fontName: "Script-Regular"
        },
        mathsf: {
            variant: "sans-serif",
            fontName: "SansSerif-Regular"
        },
        mathtt: {
            variant: "monospace",
            fontName: "Typewriter-Regular"
        }
    }
      , qt = {
        vec: ["vec", .471, .714],
        oiintSize1: ["oiintSize1", .957, .499],
        oiintSize2: ["oiintSize2", 1.472, .659],
        oiiintSize1: ["oiiintSize1", 1.304, .499],
        oiiintSize2: ["oiiintSize2", 1.98, .659]
    }
      , It = {
        fontMap: Ct,
        makeSymbol: St,
        mathsym: function(e, t, r, a) {
            return void 0 === a && (a = []),
            "boldsymbol" === r.font && kt(e, "Main-Bold", t).metrics ? St(e, "Main-Bold", t, r, a.concat(["mathbf"])) : "\\" === e || "main" === Ge[t][e].font ? St(e, "Main-Regular", t, r, a) : St(e, "AMS-Regular", t, r, a.concat(["amsrm"]))
        },
        makeSpan: At,
        makeSvgSpan: Tt,
        makeLineSpan: function(e, t, r) {
            var a = At([e], [], t);
            return a.height = Math.max(r || t.fontMetrics().defaultRuleThickness, t.minRuleThickness),
            a.style.borderBottomWidth = Ae(a.height),
            a.maxFontSize = 1,
            a
        },
        makeAnchor: function(e, t, r, a) {
            var n = new Ie(e,t,r,a);
            return zt(n),
            n
        },
        makeFragment: Bt,
        wrapFragment: function(e, t) {
            return e instanceof pe ? At([], [e], t) : e
        },
        makeVList: function(e, t) {
            for (var {children: r, depth: a} = function(e) {
                if ("individualShift" === e.positionType) {
                    for (var t = e.children, r = [t[0]], a = -t[0].shift - t[0].elem.depth, n = a, i = 1; i < t.length; i++) {
                        var o = -t[i].shift - n - t[i].elem.depth
                          , s = o - (t[i - 1].elem.height + t[i - 1].elem.depth);
                        n += o,
                        r.push({
                            type: "kern",
                            size: s
                        }),
                        r.push(t[i])
                    }
                    return {
                        children: r,
                        depth: a
                    }
                }
                var l;
                if ("top" === e.positionType) {
                    for (var h = e.positionData, m = 0; m < e.children.length; m++) {
                        var c = e.children[m];
                        h -= "kern" === c.type ? c.size : c.elem.height + c.elem.depth
                    }
                    l = h
                } else if ("bottom" === e.positionType)
                    l = -e.positionData;
                else {
                    var p = e.children[0];
                    if ("elem" !== p.type)
                        throw new Error('First child must have type "elem".');
                    if ("shift" === e.positionType)
                        l = -p.elem.depth - e.positionData;
                    else {
                        if ("firstBaseline" !== e.positionType)
                            throw new Error("Invalid positionType " + e.positionType + ".");
                        l = -p.elem.depth
                    }
                }
                return {
                    children: e.children,
                    depth: l
                }
            }(e), n = 0, i = 0; i < r.length; i++) {
                var o = r[i];
                if ("elem" === o.type) {
                    var s = o.elem;
                    n = Math.max(n, s.maxFontSize, s.height)
                }
            }
            n += 2;
            var l = At(["pstrut"], []);
            l.style.height = Ae(n);
            for (var h = [], m = a, c = a, p = a, u = 0; u < r.length; u++) {
                var d = r[u];
                if ("kern" === d.type)
                    p += d.size;
                else {
                    var g = d.elem
                      , f = d.wrapperClasses || []
                      , v = d.wrapperStyle || {}
                      , b = At(f, [l, g], void 0, v);
                    b.style.top = Ae(-n - p - g.depth),
                    d.marginLeft && (b.style.marginLeft = d.marginLeft),
                    d.marginRight && (b.style.marginRight = d.marginRight),
                    h.push(b),
                    p += g.height + g.depth
                }
                m = Math.min(m, p),
                c = Math.max(c, p)
            }
            var y, x = At(["vlist"], h);
            if (x.style.height = Ae(c),
            m < 0) {
                var w = At([], [])
                  , k = At(["vlist"], [w]);
                k.style.height = Ae(-m);
                var S = At(["vlist-s"], [new Oe("\u200b")]);
                y = [At(["vlist-r"], [x, S]), At(["vlist-r"], [k])]
            } else
                y = [At(["vlist-r"], [x])];
            var M = At(["vlist-t"], y);
            return 2 === y.length && M.classes.push("vlist-t2"),
            M.height = c,
            M.depth = -m,
            M
        },
        makeOrd: function(e, t, r) {
            var a = e.mode
              , n = e.text
              , i = ["mord"]
              , o = "math" === a || "text" === a && t.font
              , s = o ? t.font : t.fontFamily
              , l = ""
              , h = "";
            if (55349 === n.charCodeAt(0) && ([l,h] = function(e, t) {
                var r = 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536
                  , a = "math" === t ? 0 : 1;
                if (119808 <= r && r < 120484) {
                    var n = Math.floor((r - 119808) / 26);
                    return [xt[n][2], xt[n][a]]
                }
                if (120782 <= r && r <= 120831) {
                    var i = Math.floor((r - 120782) / 10);
                    return [wt[i][2], wt[i][a]]
                }
                if (120485 === r || 120486 === r)
                    return [xt[0][2], xt[0][a]];
                if (120486 < r && r < 120782)
                    return ["", ""];
                throw new D("Unsupported character: " + e)
            }(n, a)),
            l.length > 0)
                return St(n, l, a, t, i.concat(h));
            if (s) {
                var m, c;
                if ("boldsymbol" === s) {
                    var p = function(e, t, r, a, n) {
                        return "textord" !== n && kt(e, "Math-BoldItalic", t).metrics ? {
                            fontName: "Math-BoldItalic",
                            fontClass: "boldsymbol"
                        } : {
                            fontName: "Main-Bold",
                            fontClass: "mathbf"
                        }
                    }(n, a, 0, 0, r);
                    m = p.fontName,
                    c = [p.fontClass]
                } else
                    o ? (m = Ct[s].fontName,
                    c = [s]) : (m = Nt(s, t.fontWeight, t.fontShape),
                    c = [s, t.fontWeight, t.fontShape]);
                if (kt(n, m, a).metrics)
                    return St(n, m, a, t, i.concat(c));
                if (it.hasOwnProperty(n) && "Typewriter" === m.slice(0, 10)) {
                    for (var u = [], d = 0; d < n.length; d++)
                        u.push(St(n[d], m, a, t, i.concat(c)));
                    return Bt(u)
                }
            }
            if ("mathord" === r)
                return St(n, "Math-Italic", a, t, i.concat(["mathnormal"]));
            if ("textord" === r) {
                var g = Ge[a][n] && Ge[a][n].font;
                if ("ams" === g) {
                    var f = Nt("amsrm", t.fontWeight, t.fontShape);
                    return St(n, f, a, t, i.concat("amsrm", t.fontWeight, t.fontShape))
                }
                if ("main" !== g && g) {
                    var v = Nt(g, t.fontWeight, t.fontShape);
                    return St(n, v, a, t, i.concat(v, t.fontWeight, t.fontShape))
                }
                var b = Nt("textrm", t.fontWeight, t.fontShape);
                return St(n, b, a, t, i.concat(t.fontWeight, t.fontShape))
            }
            throw new Error("unexpected type: " + r + " in makeOrd")
        },
        makeGlue: (e,t)=>{
            var r = At(["mspace"], [], t)
              , a = ze(e, t);
            return r.style.marginRight = Ae(a),
            r
        }
        ,
        staticSvg: function(e, t) {
            var [r,a,n] = qt[e]
              , i = new Le(r)
              , o = new Ee([i],{
                width: Ae(a),
                height: Ae(n),
                style: "width:" + Ae(a),
                viewBox: "0 0 " + 1e3 * a + " " + 1e3 * n,
                preserveAspectRatio: "xMinYMin"
            })
              , s = Tt(["overlay"], [o], t);
            return s.height = n,
            s.style.height = Ae(n),
            s.style.width = Ae(a),
            s
        },
        svgData: qt,
        tryCombineChars: e=>{
            for (var t = 0; t < e.length - 1; t++) {
                var r = e[t]
                  , a = e[t + 1];
                r instanceof Oe && a instanceof Oe && Mt(r, a) && (r.text += a.text,
                r.height = Math.max(r.height, a.height),
                r.depth = Math.max(r.depth, a.depth),
                r.italic = a.italic,
                e.splice(t + 1, 1),
                t--)
            }
            return e
        }
    }
      , Rt = {
        number: 3,
        unit: "mu"
    }
      , Ht = {
        number: 4,
        unit: "mu"
    }
      , Ot = {
        number: 5,
        unit: "mu"
    }
      , Et = {
        mord: {
            mop: Rt,
            mbin: Ht,
            mrel: Ot,
            minner: Rt
        },
        mop: {
            mord: Rt,
            mop: Rt,
            mrel: Ot,
            minner: Rt
        },
        mbin: {
            mord: Ht,
            mop: Ht,
            mopen: Ht,
            minner: Ht
        },
        mrel: {
            mord: Ot,
            mop: Ot,
            mopen: Ot,
            minner: Ot
        },
        mopen: {},
        mclose: {
            mop: Rt,
            mbin: Ht,
            mrel: Ot,
            minner: Rt
        },
        mpunct: {
            mord: Rt,
            mop: Rt,
            mrel: Ot,
            mopen: Rt,
            mclose: Rt,
            mpunct: Rt,
            minner: Rt
        },
        minner: {
            mord: Rt,
            mop: Rt,
            mbin: Ht,
            mrel: Ot,
            mopen: Rt,
            mpunct: Rt,
            minner: Rt
        }
    }
      , Lt = {
        mord: {
            mop: Rt
        },
        mop: {
            mord: Rt,
            mop: Rt
        },
        mbin: {},
        mrel: {},
        mopen: {},
        mclose: {
            mop: Rt
        },
        mpunct: {},
        minner: {
            mop: Rt
        }
    }
      , Dt = {}
      , Pt = {}
      , Vt = {};
    function Ft(e) {
        for (var {type: t, names: r, props: a, handler: n, htmlBuilder: i, mathmlBuilder: o} = e, s = {
            type: t,
            numArgs: a.numArgs,
            argTypes: a.argTypes,
            allowedInArgument: !!a.allowedInArgument,
            allowedInText: !!a.allowedInText,
            allowedInMath: void 0 === a.allowedInMath || a.allowedInMath,
            numOptionalArgs: a.numOptionalArgs || 0,
            infix: !!a.infix,
            primitive: !!a.primitive,
            handler: n
        }, l = 0; l < r.length; ++l)
            Dt[r[l]] = s;
        t && (i && (Pt[t] = i),
        o && (Vt[t] = o))
    }
    function Gt(e) {
        var {type: t, htmlBuilder: r, mathmlBuilder: a} = e;
        Ft({
            type: t,
            names: [],
            props: {
                numArgs: 0
            },
            handler() {
                throw new Error("Should never be called.")
            },
            htmlBuilder: r,
            mathmlBuilder: a
        })
    }
    var Ut = function(e) {
        return "ordgroup" === e.type && 1 === e.body.length ? e.body[0] : e
    }
      , Yt = function(e) {
        return "ordgroup" === e.type ? e.body : [e]
    }
      , Wt = It.makeSpan
      , Xt = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"]
      , $t = ["rightmost", "mrel", "mclose", "mpunct"]
      , jt = {
        display: se.DISPLAY,
        text: se.TEXT,
        script: se.SCRIPT,
        scriptscript: se.SCRIPTSCRIPT
    }
      , _t = {
        mord: "mord",
        mop: "mop",
        mbin: "mbin",
        mrel: "mrel",
        mopen: "mopen",
        mclose: "mclose",
        mpunct: "mpunct",
        minner: "minner"
    }
      , Zt = function(e, t, r, a) {
        void 0 === a && (a = [null, null]);
        for (var n = [], i = 0; i < e.length; i++) {
            var o = rr(e[i], t);
            if (o instanceof pe) {
                var s = o.children;
                n.push(...s)
            } else
                n.push(o)
        }
        if (It.tryCombineChars(n),
        !r)
            return n;
        var l = t;
        if (1 === e.length) {
            var h = e[0];
            "sizing" === h.type ? l = t.havingSize(h.size) : "styling" === h.type && (l = t.havingStyle(jt[h.style]))
        }
        var m = Wt([a[0] || "leftmost"], [], t)
          , c = Wt([a[1] || "rightmost"], [], t)
          , p = "root" === r;
        return Kt(n, ((e,t)=>{
            var r = t.classes[0]
              , a = e.classes[0];
            "mbin" === r && U($t, a) ? t.classes[0] = "mord" : "mbin" === a && U(Xt, r) && (e.classes[0] = "mord")
        }
        ), {
            node: m
        }, c, p),
        Kt(n, ((e,t)=>{
            var r = er(t)
              , a = er(e)
              , n = r && a ? e.hasClass("mtight") ? Lt[r][a] : Et[r][a] : null;
            if (n)
                return It.makeGlue(n, l)
        }
        ), {
            node: m
        }, c, p),
        n
    }
      , Kt = function e(t, r, a, n, i) {
        n && t.push(n);
        for (var o = 0; o < t.length; o++) {
            var s = t[o]
              , l = Jt(s);
            if (l)
                e(l.children, r, a, null, i);
            else {
                var h = !s.hasClass("mspace");
                if (h) {
                    var m = r(s, a.node);
                    m && (a.insertAfter ? a.insertAfter(m) : (t.unshift(m),
                    o++))
                }
                h ? a.node = s : i && s.hasClass("newline") && (a.node = Wt(["leftmost"])),
                a.insertAfter = (e=>r=>{
                    t.splice(e + 1, 0, r),
                    o++
                }
                )(o)
            }
        }
        n && t.pop()
    }
      , Jt = function(e) {
        return e instanceof pe || e instanceof Ie || e instanceof qe && e.hasClass("enclosing") ? e : null
    }
      , Qt = function e(t, r) {
        var a = Jt(t);
        if (a) {
            var n = a.children;
            if (n.length) {
                if ("right" === r)
                    return e(n[n.length - 1], "right");
                if ("left" === r)
                    return e(n[0], "left")
            }
        }
        return t
    }
      , er = function(e, t) {
        return e ? (t && (e = Qt(e, t)),
        _t[e.classes[0]] || null) : null
    }
      , tr = function(e, t) {
        var r = ["nulldelimiter"].concat(e.baseSizingClasses());
        return Wt(t.concat(r))
    }
      , rr = function(e, t, r) {
        if (!e)
            return Wt();
        if (Pt[e.type]) {
            var a = Pt[e.type](e, t);
            if (r && t.size !== r.size) {
                a = Wt(t.sizingClasses(r), [a], t);
                var n = t.sizeMultiplier / r.sizeMultiplier;
                a.height *= n,
                a.depth *= n
            }
            return a
        }
        throw new D("Got group of unknown type: '" + e.type + "'")
    };
    function ar(e, t) {
        var r = Wt(["base"], e, t)
          , a = Wt(["strut"]);
        return a.style.height = Ae(r.height + r.depth),
        r.depth && (a.style.verticalAlign = Ae(-r.depth)),
        r.children.unshift(a),
        r
    }
    function nr(e, t) {
        var r = null;
        1 === e.length && "tag" === e[0].type && (r = e[0].tag,
        e = e[0].body);
        var a, n = Zt(e, t, "root");
        2 === n.length && n[1].hasClass("tag") && (a = n.pop());
        for (var i, o = [], s = [], l = 0; l < n.length; l++)
            if (s.push(n[l]),
            n[l].hasClass("mbin") || n[l].hasClass("mrel") || n[l].hasClass("allowbreak")) {
                for (var h = !1; l < n.length - 1 && n[l + 1].hasClass("mspace") && !n[l + 1].hasClass("newline"); )
                    l++,
                    s.push(n[l]),
                    n[l].hasClass("nobreak") && (h = !0);
                h || (o.push(ar(s, t)),
                s = [])
            } else
                n[l].hasClass("newline") && (s.pop(),
                s.length > 0 && (o.push(ar(s, t)),
                s = []),
                o.push(n[l]));
        s.length > 0 && o.push(ar(s, t)),
        r ? ((i = ar(Zt(r, t, !0))).classes = ["tag"],
        o.push(i)) : a && o.push(a);
        var m = Wt(["katex-html"], o);
        if (m.setAttribute("aria-hidden", "true"),
        i) {
            var c = i.children[0];
            c.style.height = Ae(m.height + m.depth),
            m.depth && (c.style.verticalAlign = Ae(-m.depth))
        }
        return m
    }
    function ir(e) {
        return new pe(e)
    }
    class or {
        constructor(e, t, r) {
            this.type = void 0,
            this.attributes = void 0,
            this.children = void 0,
            this.classes = void 0,
            this.type = e,
            this.attributes = {},
            this.children = t || [],
            this.classes = r || []
        }
        setAttribute(e, t) {
            this.attributes[e] = t
        }
        getAttribute(e) {
            return this.attributes[e]
        }
        toNode() {
            var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
            for (var t in this.attributes)
                Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
            this.classes.length > 0 && (e.className = Te(this.classes));
            for (var r = 0; r < this.children.length; r++)
                e.appendChild(this.children[r].toNode());
            return e
        }
        toMarkup() {
            var e = "<" + this.type;
            for (var t in this.attributes)
                Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + '="',
                e += W(this.attributes[t]),
                e += '"');
            this.classes.length > 0 && (e += ' class ="' + W(Te(this.classes)) + '"'),
            e += ">";
            for (var r = 0; r < this.children.length; r++)
                e += this.children[r].toMarkup();
            return e + "</" + this.type + ">"
        }
        toText() {
            return this.children.map((e=>e.toText())).join("")
        }
    }
    class sr {
        constructor(e) {
            this.text = void 0,
            this.text = e
        }
        toNode() {
            return document.createTextNode(this.text)
        }
        toMarkup() {
            return W(this.toText())
        }
        toText() {
            return this.text
        }
    }
    var lr = {
        MathNode: or,
        TextNode: sr,
        SpaceNode: class {
            constructor(e) {
                this.width = void 0,
                this.character = void 0,
                this.width = e,
                this.character = e >= .05555 && e <= .05556 ? "\u200a" : e >= .1666 && e <= .1667 ? "\u2009" : e >= .2222 && e <= .2223 ? "\u2005" : e >= .2777 && e <= .2778 ? "\u2005\u200a" : e >= -.05556 && e <= -.05555 ? "\u200a\u2063" : e >= -.1667 && e <= -.1666 ? "\u2009\u2063" : e >= -.2223 && e <= -.2222 ? "\u205f\u2063" : e >= -.2778 && e <= -.2777 ? "\u2005\u2063" : null
            }
            toNode() {
                if (this.character)
                    return document.createTextNode(this.character);
                var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
                return e.setAttribute("width", Ae(this.width)),
                e
            }
            toMarkup() {
                return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + Ae(this.width) + '"/>'
            }
            toText() {
                return this.character ? this.character : " "
            }
        }
        ,
        newDocumentFragment: ir
    }
      , hr = function(e, t, r) {
        return !Ge[t][e] || !Ge[t][e].replace || 55349 === e.charCodeAt(0) || it.hasOwnProperty(e) && r && (r.fontFamily && "tt" === r.fontFamily.slice(4, 6) || r.font && "tt" === r.font.slice(4, 6)) || (e = Ge[t][e].replace),
        new lr.TextNode(e)
    }
      , mr = function(e) {
        return 1 === e.length ? e[0] : new lr.MathNode("mrow",e)
    }
      , cr = function(e, t) {
        if ("texttt" === t.fontFamily)
            return "monospace";
        if ("textsf" === t.fontFamily)
            return "textit" === t.fontShape && "textbf" === t.fontWeight ? "sans-serif-bold-italic" : "textit" === t.fontShape ? "sans-serif-italic" : "textbf" === t.fontWeight ? "bold-sans-serif" : "sans-serif";
        if ("textit" === t.fontShape && "textbf" === t.fontWeight)
            return "bold-italic";
        if ("textit" === t.fontShape)
            return "italic";
        if ("textbf" === t.fontWeight)
            return "bold";
        var r = t.font;
        if (!r || "mathnormal" === r)
            return null;
        var a = e.mode;
        if ("mathit" === r)
            return "italic";
        if ("boldsymbol" === r)
            return "textord" === e.type ? "bold" : "bold-italic";
        if ("mathbf" === r)
            return "bold";
        if ("mathbb" === r)
            return "double-struck";
        if ("mathfrak" === r)
            return "fraktur";
        if ("mathscr" === r || "mathcal" === r)
            return "script";
        if ("mathsf" === r)
            return "sans-serif";
        if ("mathtt" === r)
            return "monospace";
        var n = e.text;
        return U(["\\imath", "\\jmath"], n) ? null : (Ge[a][n] && Ge[a][n].replace && (n = Ge[a][n].replace),
        fe(n, It.fontMap[r].fontName, a) ? It.fontMap[r].variant : null)
    }
      , pr = function(e, t, r) {
        if (1 === e.length) {
            var a = dr(e[0], t);
            return r && a instanceof or && "mo" === a.type && (a.setAttribute("lspace", "0em"),
            a.setAttribute("rspace", "0em")),
            [a]
        }
        for (var n, i = [], o = 0; o < e.length; o++) {
            var s = dr(e[o], t);
            if (s instanceof or && n instanceof or) {
                if ("mtext" === s.type && "mtext" === n.type && s.getAttribute("mathvariant") === n.getAttribute("mathvariant")) {
                    n.children.push(...s.children);
                    continue
                }
                if ("mn" === s.type && "mn" === n.type) {
                    n.children.push(...s.children);
                    continue
                }
                if ("mi" === s.type && 1 === s.children.length && "mn" === n.type) {
                    var l = s.children[0];
                    if (l instanceof sr && "." === l.text) {
                        n.children.push(...s.children);
                        continue
                    }
                } else if ("mi" === n.type && 1 === n.children.length) {
                    var h = n.children[0];
                    if (h instanceof sr && "\u0338" === h.text && ("mo" === s.type || "mi" === s.type || "mn" === s.type)) {
                        var m = s.children[0];
                        m instanceof sr && m.text.length > 0 && (m.text = m.text.slice(0, 1) + "\u0338" + m.text.slice(1),
                        i.pop())
                    }
                }
            }
            i.push(s),
            n = s
        }
        return i
    }
      , ur = function(e, t, r) {
        return mr(pr(e, t, r))
    }
      , dr = function(e, t) {
        if (!e)
            return new lr.MathNode("mrow");
        if (Vt[e.type])
            return Vt[e.type](e, t);
        throw new D("Got group of unknown type: '" + e.type + "'")
    };
    function gr(e, t, r, a, n) {
        var i, o = pr(e, r);
        i = 1 === o.length && o[0]instanceof or && U(["mrow", "mtable"], o[0].type) ? o[0] : new lr.MathNode("mrow",o);
        var s = new lr.MathNode("annotation",[new lr.TextNode(t)]);
        s.setAttribute("encoding", "application/x-tex");
        var l = new lr.MathNode("semantics",[i, s])
          , h = new lr.MathNode("math",[l]);
        return h.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"),
        a && h.setAttribute("display", "block"),
        It.makeSpan([n ? "katex" : "katex-mathml"], [h])
    }
    var fr = {
        widehat: "^",
        widecheck: "\u02c7",
        widetilde: "~",
        utilde: "~",
        overleftarrow: "\u2190",
        underleftarrow: "\u2190",
        xleftarrow: "\u2190",
        overrightarrow: "\u2192",
        underrightarrow: "\u2192",
        xrightarrow: "\u2192",
        underbrace: "\u23df",
        overbrace: "\u23de",
        overgroup: "\u23e0",
        undergroup: "\u23e1",
        overleftrightarrow: "\u2194",
        underleftrightarrow: "\u2194",
        xleftrightarrow: "\u2194",
        Overrightarrow: "\u21d2",
        xRightarrow: "\u21d2",
        overleftharpoon: "\u21bc",
        xleftharpoonup: "\u21bc",
        overrightharpoon: "\u21c0",
        xrightharpoonup: "\u21c0",
        xLeftarrow: "\u21d0",
        xLeftrightarrow: "\u21d4",
        xhookleftarrow: "\u21a9",
        xhookrightarrow: "\u21aa",
        xmapsto: "\u21a6",
        xrightharpoondown: "\u21c1",
        xleftharpoondown: "\u21bd",
        xrightleftharpoons: "\u21cc",
        xleftrightharpoons: "\u21cb",
        xtwoheadleftarrow: "\u219e",
        xtwoheadrightarrow: "\u21a0",
        xlongequal: "=",
        xtofrom: "\u21c4",
        xrightleftarrows: "\u21c4",
        xrightequilibrium: "\u21cc",
        xleftequilibrium: "\u21cb",
        "\\cdrightarrow": "\u2192",
        "\\cdleftarrow": "\u2190",
        "\\cdlongequal": "="
    }
      , vr = {
        overrightarrow: [["rightarrow"], .888, 522, "xMaxYMin"],
        overleftarrow: [["leftarrow"], .888, 522, "xMinYMin"],
        underrightarrow: [["rightarrow"], .888, 522, "xMaxYMin"],
        underleftarrow: [["leftarrow"], .888, 522, "xMinYMin"],
        xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
        "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
        xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
        "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
        Overrightarrow: [["doublerightarrow"], .888, 560, "xMaxYMin"],
        xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
        xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
        overleftharpoon: [["leftharpoon"], .888, 522, "xMinYMin"],
        xleftharpoonup: [["leftharpoon"], .888, 522, "xMinYMin"],
        xleftharpoondown: [["leftharpoondown"], .888, 522, "xMinYMin"],
        overrightharpoon: [["rightharpoon"], .888, 522, "xMaxYMin"],
        xrightharpoonup: [["rightharpoon"], .888, 522, "xMaxYMin"],
        xrightharpoondown: [["rightharpoondown"], .888, 522, "xMaxYMin"],
        xlongequal: [["longequal"], .888, 334, "xMinYMin"],
        "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
        xtwoheadleftarrow: [["twoheadleftarrow"], .888, 334, "xMinYMin"],
        xtwoheadrightarrow: [["twoheadrightarrow"], .888, 334, "xMaxYMin"],
        overleftrightarrow: [["leftarrow", "rightarrow"], .888, 522],
        overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
        underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
        underleftrightarrow: [["leftarrow", "rightarrow"], .888, 522],
        xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
        xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
        xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
        xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
        xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
        xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
        overlinesegment: [["leftlinesegment", "rightlinesegment"], .888, 522],
        underlinesegment: [["leftlinesegment", "rightlinesegment"], .888, 522],
        overgroup: [["leftgroup", "rightgroup"], .888, 342],
        undergroup: [["leftgroupunder", "rightgroupunder"], .888, 342],
        xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
        xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
        xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
        xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
        xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
    }
      , br = function(e) {
        var t = new lr.MathNode("mo",[new lr.TextNode(fr[e.replace(/^\\/, "")])]);
        return t.setAttribute("stretchy", "true"),
        t
    }
      , yr = function(e, t) {
        var {span: r, minWidth: a, height: n} = function() {
            var r = 4e5
              , a = e.label.slice(1);
            if (U(["widehat", "widecheck", "widetilde", "utilde"], a)) {
                var n, i, o, s = "ordgroup" === (u = e.base).type ? u.body.length : 1;
                if (s > 5)
                    "widehat" === a || "widecheck" === a ? (n = 420,
                    r = 2364,
                    o = .42,
                    i = a + "4") : (n = 312,
                    r = 2340,
                    o = .34,
                    i = "tilde4");
                else {
                    var l = [1, 1, 2, 2, 3, 3][s];
                    "widehat" === a || "widecheck" === a ? (r = [0, 1062, 2364, 2364, 2364][l],
                    n = [0, 239, 300, 360, 420][l],
                    o = [0, .24, .3, .3, .36, .42][l],
                    i = a + l) : (r = [0, 600, 1033, 2339, 2340][l],
                    n = [0, 260, 286, 306, 312][l],
                    o = [0, .26, .286, .3, .306, .34][l],
                    i = "tilde" + l)
                }
                var h = new Le(i)
                  , m = new Ee([h],{
                    width: "100%",
                    height: Ae(o),
                    viewBox: "0 0 " + r + " " + n,
                    preserveAspectRatio: "none"
                });
                return {
                    span: It.makeSvgSpan([], [m], t),
                    minWidth: 0,
                    height: o
                }
            }
            var c, p, u, d = [], g = vr[a], [f,v,b] = g, y = b / 1e3, x = f.length;
            if (1 === x)
                c = ["hide-tail"],
                p = [g[3]];
            else if (2 === x)
                c = ["halfarrow-left", "halfarrow-right"],
                p = ["xMinYMin", "xMaxYMin"];
            else {
                if (3 !== x)
                    throw new Error("Correct katexImagesData or update code here to support\n                    " + x + " children.");
                c = ["brace-left", "brace-center", "brace-right"],
                p = ["xMinYMin", "xMidYMin", "xMaxYMin"]
            }
            for (var w = 0; w < x; w++) {
                var k = new Le(f[w])
                  , S = new Ee([k],{
                    width: "400em",
                    height: Ae(y),
                    viewBox: "0 0 " + r + " " + b,
                    preserveAspectRatio: p[w] + " slice"
                })
                  , M = It.makeSvgSpan([c[w]], [S], t);
                if (1 === x)
                    return {
                        span: M,
                        minWidth: v,
                        height: y
                    };
                M.style.height = Ae(y),
                d.push(M)
            }
            return {
                span: It.makeSpan(["stretchy"], d, t),
                minWidth: v,
                height: y
            }
        }();
        return r.height = n,
        r.style.height = Ae(n),
        a > 0 && (r.style.minWidth = Ae(a)),
        r
    };
    function xr(e, t) {
        if (!e || e.type !== t)
            throw new Error("Expected node of type " + t + ", but got " + (e ? "node of type " + e.type : String(e)));
        return e
    }
    function wr(e) {
        var t = kr(e);
        if (!t)
            throw new Error("Expected node of symbol group type, but got " + (e ? "node of type " + e.type : String(e)));
        return t
    }
    function kr(e) {
        return e && ("atom" === e.type || Fe.hasOwnProperty(e.type)) ? e : null
    }
    var Sr = (e,t)=>{
        var r, a, n;
        e && "supsub" === e.type ? (r = (a = xr(e.base, "accent")).base,
        e.base = r,
        n = function(e) {
            if (e instanceof qe)
                return e;
            throw new Error("Expected span<HtmlDomNode> but got " + String(e) + ".")
        }(rr(e, t)),
        e.base = a) : r = (a = xr(e, "accent")).base;
        var i = rr(r, t.havingCrampedStyle())
          , o = 0;
        if (a.isShifty && j(r)) {
            var s = $(r);
            o = Pe(rr(s, t.havingCrampedStyle())).skew
        }
        var l, h = "\\c" === a.label, m = h ? i.height + i.depth : Math.min(i.height, t.fontMetrics().xHeight);
        if (a.isStretchy)
            l = yr(a, t),
            l = It.makeVList({
                positionType: "firstBaseline",
                children: [{
                    type: "elem",
                    elem: i
                }, {
                    type: "elem",
                    elem: l,
                    wrapperClasses: ["svg-align"],
                    wrapperStyle: o > 0 ? {
                        width: "calc(100% - " + Ae(2 * o) + ")",
                        marginLeft: Ae(2 * o)
                    } : void 0
                }]
            }, t);
        else {
            var c, p;
            "\\vec" === a.label ? (c = It.staticSvg("vec", t),
            p = It.svgData.vec[1]) : ((c = Pe(c = It.makeOrd({
                mode: a.mode,
                text: a.label
            }, t, "textord"))).italic = 0,
            p = c.width,
            h && (m += c.depth)),
            l = It.makeSpan(["accent-body"], [c]);
            var u = "\\textcircled" === a.label;
            u && (l.classes.push("accent-full"),
            m = i.height);
            var d = o;
            u || (d -= p / 2),
            l.style.left = Ae(d),
            "\\textcircled" === a.label && (l.style.top = ".2em"),
            l = It.makeVList({
                positionType: "firstBaseline",
                children: [{
                    type: "elem",
                    elem: i
                }, {
                    type: "kern",
                    size: -m
                }, {
                    type: "elem",
                    elem: l
                }]
            }, t)
        }
        var g = It.makeSpan(["mord", "accent"], [l], t);
        return n ? (n.children[0] = g,
        n.height = Math.max(g.height, n.height),
        n.classes[0] = "mord",
        n) : g
    }
      , Mr = (e,t)=>{
        var r = e.isStretchy ? br(e.label) : new lr.MathNode("mo",[hr(e.label, e.mode)])
          , a = new lr.MathNode("mover",[dr(e.base, t), r]);
        return a.setAttribute("accent", "true"),
        a
    }
      , zr = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((e=>"\\" + e)).join("|"));
    Ft({
        type: "accent",
        names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
        props: {
            numArgs: 1
        },
        handler: (e,t)=>{
            var r = Ut(t[0])
              , a = !zr.test(e.funcName)
              , n = !a || "\\widehat" === e.funcName || "\\widetilde" === e.funcName || "\\widecheck" === e.funcName;
            return {
                type: "accent",
                mode: e.parser.mode,
                label: e.funcName,
                isStretchy: a,
                isShifty: n,
                base: r
            }
        }
        ,
        htmlBuilder: Sr,
        mathmlBuilder: Mr
    }),
    Ft({
        type: "accent",
        names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
        props: {
            numArgs: 1,
            allowedInText: !0,
            allowedInMath: !0,
            argTypes: ["primitive"]
        },
        handler: (e,t)=>{
            var r = t[0]
              , a = e.parser.mode;
            return "math" === a && (e.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + e.funcName + " works only in text mode"),
            a = "text"),
            {
                type: "accent",
                mode: a,
                label: e.funcName,
                isStretchy: !1,
                isShifty: !0,
                base: r
            }
        }
        ,
        htmlBuilder: Sr,
        mathmlBuilder: Mr
    }),
    Ft({
        type: "accentUnder",
        names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
        props: {
            numArgs: 1
        },
        handler: (e,t)=>{
            var {parser: r, funcName: a} = e
              , n = t[0];
            return {
                type: "accentUnder",
                mode: r.mode,
                label: a,
                base: n
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = rr(e.base, t)
              , a = yr(e, t)
              , n = "\\utilde" === e.label ? .12 : 0
              , i = It.makeVList({
                positionType: "top",
                positionData: r.height,
                children: [{
                    type: "elem",
                    elem: a,
                    wrapperClasses: ["svg-align"]
                }, {
                    type: "kern",
                    size: n
                }, {
                    type: "elem",
                    elem: r
                }]
            }, t);
            return It.makeSpan(["mord", "accentunder"], [i], t)
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = br(e.label)
              , a = new lr.MathNode("munder",[dr(e.base, t), r]);
            return a.setAttribute("accentunder", "true"),
            a
        }
    });
    var Ar = e=>{
        var t = new lr.MathNode("mpadded",e ? [e] : []);
        return t.setAttribute("width", "+0.6em"),
        t.setAttribute("lspace", "0.3em"),
        t
    }
    ;
    Ft({
        type: "xArrow",
        names: ["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xrightleftharpoons", "\\xleftrightharpoons", "\\xlongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xtofrom", "\\xrightleftarrows", "\\xrightequilibrium", "\\xleftequilibrium", "\\\\cdrightarrow", "\\\\cdleftarrow", "\\\\cdlongequal"],
        props: {
            numArgs: 1,
            numOptionalArgs: 1
        },
        handler(e, t, r) {
            var {parser: a, funcName: n} = e;
            return {
                type: "xArrow",
                mode: a.mode,
                label: n,
                body: t[0],
                below: r[0]
            }
        },
        htmlBuilder(e, t) {
            var r, a = t.style, n = t.havingStyle(a.sup()), i = It.wrapFragment(rr(e.body, n, t), t), o = "\\x" === e.label.slice(0, 2) ? "x" : "cd";
            i.classes.push(o + "-arrow-pad"),
            e.below && (n = t.havingStyle(a.sub()),
            (r = It.wrapFragment(rr(e.below, n, t), t)).classes.push(o + "-arrow-pad"));
            var s, l = yr(e, t), h = -t.fontMetrics().axisHeight + .5 * l.height, m = -t.fontMetrics().axisHeight - .5 * l.height - .111;
            if ((i.depth > .25 || "\\xleftequilibrium" === e.label) && (m -= i.depth),
            r) {
                var c = -t.fontMetrics().axisHeight + r.height + .5 * l.height + .111;
                s = It.makeVList({
                    positionType: "individualShift",
                    children: [{
                        type: "elem",
                        elem: i,
                        shift: m
                    }, {
                        type: "elem",
                        elem: l,
                        shift: h
                    }, {
                        type: "elem",
                        elem: r,
                        shift: c
                    }]
                }, t)
            } else
                s = It.makeVList({
                    positionType: "individualShift",
                    children: [{
                        type: "elem",
                        elem: i,
                        shift: m
                    }, {
                        type: "elem",
                        elem: l,
                        shift: h
                    }]
                }, t);
            return s.children[0].children[0].children[1].classes.push("svg-align"),
            It.makeSpan(["mrel", "x-arrow"], [s], t)
        },
        mathmlBuilder(e, t) {
            var r, a = br(e.label);
            if (a.setAttribute("minsize", "x" === e.label.charAt(0) ? "1.75em" : "3.0em"),
            e.body) {
                var n = Ar(dr(e.body, t));
                if (e.below) {
                    var i = Ar(dr(e.below, t));
                    r = new lr.MathNode("munderover",[a, i, n])
                } else
                    r = new lr.MathNode("mover",[a, n])
            } else if (e.below) {
                var o = Ar(dr(e.below, t));
                r = new lr.MathNode("munder",[a, o])
            } else
                r = Ar(),
                r = new lr.MathNode("mover",[a, r]);
            return r
        }
    });
    var Tr = It.makeSpan;
    function Br(e, t) {
        var r = Zt(e.body, t, !0);
        return Tr([e.mclass], r, t)
    }
    function Nr(e, t) {
        var r, a = pr(e.body, t);
        return "minner" === e.mclass ? r = new lr.MathNode("mpadded",a) : "mord" === e.mclass ? e.isCharacterBox ? (r = a[0]).type = "mi" : r = new lr.MathNode("mi",a) : (e.isCharacterBox ? (r = a[0]).type = "mo" : r = new lr.MathNode("mo",a),
        "mbin" === e.mclass ? (r.attributes.lspace = "0.22em",
        r.attributes.rspace = "0.22em") : "mpunct" === e.mclass ? (r.attributes.lspace = "0em",
        r.attributes.rspace = "0.17em") : "mopen" === e.mclass || "mclose" === e.mclass ? (r.attributes.lspace = "0em",
        r.attributes.rspace = "0em") : "minner" === e.mclass && (r.attributes.lspace = "0.0556em",
        r.attributes.width = "+0.1111em")),
        r
    }
    Ft({
        type: "mclass",
        names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
        props: {
            numArgs: 1,
            primitive: !0
        },
        handler(e, t) {
            var {parser: r, funcName: a} = e
              , n = t[0];
            return {
                type: "mclass",
                mode: r.mode,
                mclass: "m" + a.slice(5),
                body: Yt(n),
                isCharacterBox: j(n)
            }
        },
        htmlBuilder: Br,
        mathmlBuilder: Nr
    });
    var Cr = e=>{
        var t = "ordgroup" === e.type && e.body.length ? e.body[0] : e;
        return "atom" !== t.type || "bin" !== t.family && "rel" !== t.family ? "mord" : "m" + t.family
    }
    ;
    Ft({
        type: "mclass",
        names: ["\\@binrel"],
        props: {
            numArgs: 2
        },
        handler(e, t) {
            var {parser: r} = e;
            return {
                type: "mclass",
                mode: r.mode,
                mclass: Cr(t[0]),
                body: Yt(t[1]),
                isCharacterBox: j(t[1])
            }
        }
    }),
    Ft({
        type: "mclass",
        names: ["\\stackrel", "\\overset", "\\underset"],
        props: {
            numArgs: 2
        },
        handler(e, t) {
            var r, {parser: a, funcName: n} = e, i = t[1], o = t[0];
            r = "\\stackrel" !== n ? Cr(i) : "mrel";
            var s = {
                type: "op",
                mode: i.mode,
                limits: !0,
                alwaysHandleSupSub: !0,
                parentIsSupSub: !1,
                symbol: !1,
                suppressBaseShift: "\\stackrel" !== n,
                body: Yt(i)
            }
              , l = {
                type: "supsub",
                mode: o.mode,
                base: s,
                sup: "\\underset" === n ? null : o,
                sub: "\\underset" === n ? o : null
            };
            return {
                type: "mclass",
                mode: a.mode,
                mclass: r,
                body: [l],
                isCharacterBox: j(l)
            }
        },
        htmlBuilder: Br,
        mathmlBuilder: Nr
    }),
    Ft({
        type: "pmb",
        names: ["\\pmb"],
        props: {
            numArgs: 1,
            allowedInText: !0
        },
        handler(e, t) {
            var {parser: r} = e;
            return {
                type: "pmb",
                mode: r.mode,
                mclass: Cr(t[0]),
                body: Yt(t[0])
            }
        },
        htmlBuilder(e, t) {
            var r = Zt(e.body, t, !0)
              , a = It.makeSpan([e.mclass], r, t);
            return a.style.textShadow = "0.02em 0.01em 0.04px",
            a
        },
        mathmlBuilder(e, t) {
            var r = pr(e.body, t)
              , a = new lr.MathNode("mstyle",r);
            return a.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"),
            a
        }
    });
    var qr = {
        ">": "\\\\cdrightarrow",
        "<": "\\\\cdleftarrow",
        "=": "\\\\cdlongequal",
        A: "\\uparrow",
        V: "\\downarrow",
        "|": "\\Vert",
        ".": "no arrow"
    }
      , Ir = e=>"textord" === e.type && "@" === e.text;
    function Rr(e, t, r) {
        var a = qr[e];
        switch (a) {
        case "\\\\cdrightarrow":
        case "\\\\cdleftarrow":
            return r.callFunction(a, [t[0]], [t[1]]);
        case "\\uparrow":
        case "\\downarrow":
            var n = {
                type: "atom",
                text: a,
                mode: "math",
                family: "rel"
            }
              , i = {
                type: "ordgroup",
                mode: "math",
                body: [r.callFunction("\\\\cdleft", [t[0]], []), r.callFunction("\\Big", [n], []), r.callFunction("\\\\cdright", [t[1]], [])]
            };
            return r.callFunction("\\\\cdparent", [i], []);
        case "\\\\cdlongequal":
            return r.callFunction("\\\\cdlongequal", [], []);
        case "\\Vert":
            return r.callFunction("\\Big", [{
                type: "textord",
                text: "\\Vert",
                mode: "math"
            }], []);
        default:
            return {
                type: "textord",
                text: " ",
                mode: "math"
            }
        }
    }
    Ft({
        type: "cdlabel",
        names: ["\\\\cdleft", "\\\\cdright"],
        props: {
            numArgs: 1
        },
        handler(e, t) {
            var {parser: r, funcName: a} = e;
            return {
                type: "cdlabel",
                mode: r.mode,
                side: a.slice(4),
                label: t[0]
            }
        },
        htmlBuilder(e, t) {
            var r = t.havingStyle(t.style.sup())
              , a = It.wrapFragment(rr(e.label, r, t), t);
            return a.classes.push("cd-label-" + e.side),
            a.style.bottom = Ae(.8 - a.depth),
            a.height = 0,
            a.depth = 0,
            a
        },
        mathmlBuilder(e, t) {
            var r = new lr.MathNode("mrow",[dr(e.label, t)]);
            return (r = new lr.MathNode("mpadded",[r])).setAttribute("width", "0"),
            "left" === e.side && r.setAttribute("lspace", "-1width"),
            r.setAttribute("voffset", "0.7em"),
            (r = new lr.MathNode("mstyle",[r])).setAttribute("displaystyle", "false"),
            r.setAttribute("scriptlevel", "1"),
            r
        }
    }),
    Ft({
        type: "cdlabelparent",
        names: ["\\\\cdparent"],
        props: {
            numArgs: 1
        },
        handler(e, t) {
            var {parser: r} = e;
            return {
                type: "cdlabelparent",
                mode: r.mode,
                fragment: t[0]
            }
        },
        htmlBuilder(e, t) {
            var r = It.wrapFragment(rr(e.fragment, t), t);
            return r.classes.push("cd-vert-arrow"),
            r
        },
        mathmlBuilder: (e,t)=>new lr.MathNode("mrow",[dr(e.fragment, t)])
    }),
    Ft({
        type: "textord",
        names: ["\\@char"],
        props: {
            numArgs: 1,
            allowedInText: !0
        },
        handler(e, t) {
            for (var {parser: r} = e, a = xr(t[0], "ordgroup").body, n = "", i = 0; i < a.length; i++)
                n += xr(a[i], "textord").text;
            var o, s = parseInt(n);
            if (isNaN(s))
                throw new D("\\@char has non-numeric argument " + n);
            if (s < 0 || s >= 1114111)
                throw new D("\\@char with invalid code point " + n);
            return s <= 65535 ? o = String.fromCharCode(s) : (s -= 65536,
            o = String.fromCharCode(55296 + (s >> 10), 56320 + (1023 & s))),
            {
                type: "textord",
                mode: r.mode,
                text: o
            }
        }
    });
    var Hr = (e,t)=>{
        var r = Zt(e.body, t.withColor(e.color), !1);
        return It.makeFragment(r)
    }
      , Or = (e,t)=>{
        var r = pr(e.body, t.withColor(e.color))
          , a = new lr.MathNode("mstyle",r);
        return a.setAttribute("mathcolor", e.color),
        a
    }
    ;
    Ft({
        type: "color",
        names: ["\\textcolor"],
        props: {
            numArgs: 2,
            allowedInText: !0,
            argTypes: ["color", "original"]
        },
        handler(e, t) {
            var {parser: r} = e
              , a = xr(t[0], "color-token").color
              , n = t[1];
            return {
                type: "color",
                mode: r.mode,
                color: a,
                body: Yt(n)
            }
        },
        htmlBuilder: Hr,
        mathmlBuilder: Or
    }),
    Ft({
        type: "color",
        names: ["\\color"],
        props: {
            numArgs: 1,
            allowedInText: !0,
            argTypes: ["color"]
        },
        handler(e, t) {
            var {parser: r, breakOnTokenText: a} = e
              , n = xr(t[0], "color-token").color;
            r.gullet.macros.set("\\current@color", n);
            var i = r.parseExpression(!0, a);
            return {
                type: "color",
                mode: r.mode,
                color: n,
                body: i
            }
        },
        htmlBuilder: Hr,
        mathmlBuilder: Or
    }),
    Ft({
        type: "cr",
        names: ["\\\\"],
        props: {
            numArgs: 0,
            numOptionalArgs: 0,
            allowedInText: !0
        },
        handler(e, t, r) {
            var {parser: a} = e
              , n = "[" === a.gullet.future().text ? a.parseSizeGroup(!0) : null
              , i = !a.settings.displayMode || !a.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
            return {
                type: "cr",
                mode: a.mode,
                newLine: i,
                size: n && xr(n, "size").value
            }
        },
        htmlBuilder(e, t) {
            var r = It.makeSpan(["mspace"], [], t);
            return e.newLine && (r.classes.push("newline"),
            e.size && (r.style.marginTop = Ae(ze(e.size, t)))),
            r
        },
        mathmlBuilder(e, t) {
            var r = new lr.MathNode("mspace");
            return e.newLine && (r.setAttribute("linebreak", "newline"),
            e.size && r.setAttribute("height", Ae(ze(e.size, t)))),
            r
        }
    });
    var Er = {
        "\\global": "\\global",
        "\\long": "\\\\globallong",
        "\\\\globallong": "\\\\globallong",
        "\\def": "\\gdef",
        "\\gdef": "\\gdef",
        "\\edef": "\\xdef",
        "\\xdef": "\\xdef",
        "\\let": "\\\\globallet",
        "\\futurelet": "\\\\globalfuture"
    }
      , Lr = e=>{
        var t = e.text;
        if (/^(?:[\\{}$&#^_]|EOF)$/.test(t))
            throw new D("Expected a control sequence",e);
        return t
    }
      , Dr = (e,t,r,a)=>{
        var n = e.gullet.macros.get(r.text);
        null == n && (r.noexpand = !0,
        n = {
            tokens: [r],
            numArgs: 0,
            unexpandable: !e.gullet.isExpandable(r.text)
        }),
        e.gullet.macros.set(t, n, a)
    }
    ;
    Ft({
        type: "internal",
        names: ["\\global", "\\long", "\\\\globallong"],
        props: {
            numArgs: 0,
            allowedInText: !0
        },
        handler(e) {
            var {parser: t, funcName: r} = e;
            t.consumeSpaces();
            var a = t.fetch();
            if (Er[a.text])
                return "\\global" !== r && "\\\\globallong" !== r || (a.text = Er[a.text]),
                xr(t.parseFunction(), "internal");
            throw new D("Invalid token after macro prefix",a)
        }
    }),
    Ft({
        type: "internal",
        names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
        props: {
            numArgs: 0,
            allowedInText: !0,
            primitive: !0
        },
        handler(e) {
            var {parser: t, funcName: r} = e
              , a = t.gullet.popToken()
              , n = a.text;
            if (/^(?:[\\{}$&#^_]|EOF)$/.test(n))
                throw new D("Expected a control sequence",a);
            for (var i, o = 0, s = [[]]; "{" !== t.gullet.future().text; )
                if ("#" === (a = t.gullet.popToken()).text) {
                    if ("{" === t.gullet.future().text) {
                        i = t.gullet.future(),
                        s[o].push("{");
                        break
                    }
                    if (a = t.gullet.popToken(),
                    !/^[1-9]$/.test(a.text))
                        throw new D('Invalid argument number "' + a.text + '"');
                    if (parseInt(a.text) !== o + 1)
                        throw new D('Argument number "' + a.text + '" out of order');
                    o++,
                    s.push([])
                } else {
                    if ("EOF" === a.text)
                        throw new D("Expected a macro definition");
                    s[o].push(a.text)
                }
            var {tokens: l} = t.gullet.consumeArg();
            return i && l.unshift(i),
            "\\edef" !== r && "\\xdef" !== r || (l = t.gullet.expandTokens(l)).reverse(),
            t.gullet.macros.set(n, {
                tokens: l,
                numArgs: o,
                delimiters: s
            }, r === Er[r]),
            {
                type: "internal",
                mode: t.mode
            }
        }
    }),
    Ft({
        type: "internal",
        names: ["\\let", "\\\\globallet"],
        props: {
            numArgs: 0,
            allowedInText: !0,
            primitive: !0
        },
        handler(e) {
            var {parser: t, funcName: r} = e
              , a = Lr(t.gullet.popToken());
            t.gullet.consumeSpaces();
            var n = (e=>{
                var t = e.gullet.popToken();
                return "=" === t.text && " " === (t = e.gullet.popToken()).text && (t = e.gullet.popToken()),
                t
            }
            )(t);
            return Dr(t, a, n, "\\\\globallet" === r),
            {
                type: "internal",
                mode: t.mode
            }
        }
    }),
    Ft({
        type: "internal",
        names: ["\\futurelet", "\\\\globalfuture"],
        props: {
            numArgs: 0,
            allowedInText: !0,
            primitive: !0
        },
        handler(e) {
            var {parser: t, funcName: r} = e
              , a = Lr(t.gullet.popToken())
              , n = t.gullet.popToken()
              , i = t.gullet.popToken();
            return Dr(t, a, i, "\\\\globalfuture" === r),
            t.gullet.pushToken(i),
            t.gullet.pushToken(n),
            {
                type: "internal",
                mode: t.mode
            }
        }
    });
    var Pr = function(e, t, r) {
        var a = fe(Ge.math[e] && Ge.math[e].replace || e, t, r);
        if (!a)
            throw new Error("Unsupported symbol " + e + " and font size " + t + ".");
        return a
    }
      , Vr = function(e, t, r, a) {
        var n = r.havingBaseStyle(t)
          , i = It.makeSpan(a.concat(n.sizingClasses(r)), [e], r)
          , o = n.sizeMultiplier / r.sizeMultiplier;
        return i.height *= o,
        i.depth *= o,
        i.maxFontSize = n.sizeMultiplier,
        i
    }
      , Fr = function(e, t, r) {
        var a = t.havingBaseStyle(r)
          , n = (1 - t.sizeMultiplier / a.sizeMultiplier) * t.fontMetrics().axisHeight;
        e.classes.push("delimcenter"),
        e.style.top = Ae(n),
        e.height -= n,
        e.depth += n
    }
      , Gr = function(e, t, r, a, n, i) {
        var o = function(e, t, r, a) {
            return It.makeSymbol(e, "Size" + t + "-Regular", r, a)
        }(e, t, n, a)
          , s = Vr(It.makeSpan(["delimsizing", "size" + t], [o], a), se.TEXT, a, i);
        return r && Fr(s, a, se.TEXT),
        s
    }
      , Ur = function(e, t, r) {
        return {
            type: "elem",
            elem: It.makeSpan(["delimsizinginner", "Size1-Regular" === t ? "delim-size1" : "delim-size4"], [It.makeSpan([], [It.makeSymbol(e, t, r)])])
        }
    }
      , Yr = function(e, t, r) {
        var a = ue["Size4-Regular"][e.charCodeAt(0)] ? ue["Size4-Regular"][e.charCodeAt(0)][4] : ue["Size1-Regular"][e.charCodeAt(0)][4]
          , n = new Le("inner",function(e, t) {
            switch (e) {
            case "\u239c":
                return "M291 0 H417 V" + t + " H291z M291 0 H417 V" + t + " H291z";
            case "\u2223":
                return "M145 0 H188 V" + t + " H145z M145 0 H188 V" + t + " H145z";
            case "\u2225":
                return "M145 0 H188 V" + t + " H145z M145 0 H188 V" + t + " H145zM367 0 H410 V" + t + " H367z M367 0 H410 V" + t + " H367z";
            case "\u239f":
                return "M457 0 H583 V" + t + " H457z M457 0 H583 V" + t + " H457z";
            case "\u23a2":
                return "M319 0 H403 V" + t + " H319z M319 0 H403 V" + t + " H319z";
            case "\u23a5":
                return "M263 0 H347 V" + t + " H263z M263 0 H347 V" + t + " H263z";
            case "\u23aa":
                return "M384 0 H504 V" + t + " H384z M384 0 H504 V" + t + " H384z";
            case "\u23d0":
                return "M312 0 H355 V" + t + " H312z M312 0 H355 V" + t + " H312z";
            case "\u2016":
                return "M257 0 H300 V" + t + " H257z M257 0 H300 V" + t + " H257zM478 0 H521 V" + t + " H478z M478 0 H521 V" + t + " H478z";
            default:
                return ""
            }
        }(e, Math.round(1e3 * t)))
          , i = new Ee([n],{
            width: Ae(a),
            height: Ae(t),
            style: "width:" + Ae(a),
            viewBox: "0 0 " + 1e3 * a + " " + Math.round(1e3 * t),
            preserveAspectRatio: "xMinYMin"
        })
          , o = It.makeSvgSpan([], [i], r);
        return o.height = t,
        o.style.height = Ae(t),
        o.style.width = Ae(a),
        {
            type: "elem",
            elem: o
        }
    }
      , Wr = {
        type: "kern",
        size: -.008
    }
      , Xr = ["|", "\\lvert", "\\rvert", "\\vert"]
      , $r = ["\\|", "\\lVert", "\\rVert", "\\Vert"]
      , jr = function(e, t, r, a, n, i) {
        var o, s, l, h, m = "", c = 0;
        o = l = h = e,
        s = null;
        var p = "Size1-Regular";
        "\\uparrow" === e ? l = h = "\u23d0" : "\\Uparrow" === e ? l = h = "\u2016" : "\\downarrow" === e ? o = l = "\u23d0" : "\\Downarrow" === e ? o = l = "\u2016" : "\\updownarrow" === e ? (o = "\\uparrow",
        l = "\u23d0",
        h = "\\downarrow") : "\\Updownarrow" === e ? (o = "\\Uparrow",
        l = "\u2016",
        h = "\\Downarrow") : U(Xr, e) ? (l = "\u2223",
        m = "vert",
        c = 333) : U($r, e) ? (l = "\u2225",
        m = "doublevert",
        c = 556) : "[" === e || "\\lbrack" === e ? (o = "\u23a1",
        l = "\u23a2",
        h = "\u23a3",
        p = "Size4-Regular",
        m = "lbrack",
        c = 667) : "]" === e || "\\rbrack" === e ? (o = "\u23a4",
        l = "\u23a5",
        h = "\u23a6",
        p = "Size4-Regular",
        m = "rbrack",
        c = 667) : "\\lfloor" === e || "\u230a" === e ? (l = o = "\u23a2",
        h = "\u23a3",
        p = "Size4-Regular",
        m = "lfloor",
        c = 667) : "\\lceil" === e || "\u2308" === e ? (o = "\u23a1",
        l = h = "\u23a2",
        p = "Size4-Regular",
        m = "lceil",
        c = 667) : "\\rfloor" === e || "\u230b" === e ? (l = o = "\u23a5",
        h = "\u23a6",
        p = "Size4-Regular",
        m = "rfloor",
        c = 667) : "\\rceil" === e || "\u2309" === e ? (o = "\u23a4",
        l = h = "\u23a5",
        p = "Size4-Regular",
        m = "rceil",
        c = 667) : "(" === e || "\\lparen" === e ? (o = "\u239b",
        l = "\u239c",
        h = "\u239d",
        p = "Size4-Regular",
        m = "lparen",
        c = 875) : ")" === e || "\\rparen" === e ? (o = "\u239e",
        l = "\u239f",
        h = "\u23a0",
        p = "Size4-Regular",
        m = "rparen",
        c = 875) : "\\{" === e || "\\lbrace" === e ? (o = "\u23a7",
        s = "\u23a8",
        h = "\u23a9",
        l = "\u23aa",
        p = "Size4-Regular") : "\\}" === e || "\\rbrace" === e ? (o = "\u23ab",
        s = "\u23ac",
        h = "\u23ad",
        l = "\u23aa",
        p = "Size4-Regular") : "\\lgroup" === e || "\u27ee" === e ? (o = "\u23a7",
        h = "\u23a9",
        l = "\u23aa",
        p = "Size4-Regular") : "\\rgroup" === e || "\u27ef" === e ? (o = "\u23ab",
        h = "\u23ad",
        l = "\u23aa",
        p = "Size4-Regular") : "\\lmoustache" === e || "\u23b0" === e ? (o = "\u23a7",
        h = "\u23ad",
        l = "\u23aa",
        p = "Size4-Regular") : "\\rmoustache" !== e && "\u23b1" !== e || (o = "\u23ab",
        h = "\u23a9",
        l = "\u23aa",
        p = "Size4-Regular");
        var u = Pr(o, p, n)
          , d = u.height + u.depth
          , g = Pr(l, p, n)
          , f = g.height + g.depth
          , v = Pr(h, p, n)
          , b = v.height + v.depth
          , y = 0
          , x = 1;
        if (null !== s) {
            var w = Pr(s, p, n);
            y = w.height + w.depth,
            x = 2
        }
        var k = d + b + y
          , S = k + Math.max(0, Math.ceil((t - k) / (x * f))) * x * f
          , M = a.fontMetrics().axisHeight;
        r && (M *= a.sizeMultiplier);
        var z = S / 2 - M
          , A = [];
        if (m.length > 0) {
            var T = S - d - b
              , B = Math.round(1e3 * S)
              , N = function(e, t) {
                switch (e) {
                case "lbrack":
                    return "M403 1759 V84 H666 V0 H319 V1759 v" + t + " v1759 h347 v-84\nH403z M403 1759 V0 H319 V1759 v" + t + " v1759 h84z";
                case "rbrack":
                    return "M347 1759 V0 H0 V84 H263 V1759 v" + t + " v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v" + t + " v1759 h84z";
                case "vert":
                    return "M145 15 v585 v" + t + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -t + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + t + " v585 h43z";
                case "doublevert":
                    return "M145 15 v585 v" + t + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -t + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + t + " v585 h43z\nM367 15 v585 v" + t + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -t + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v" + t + " v585 h43z";
                case "lfloor":
                    return "M319 602 V0 H403 V602 v" + t + " v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v" + t + " v1715 H319z";
                case "rfloor":
                    return "M319 602 V0 H403 V602 v" + t + " v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v" + t + " v1715 H319z";
                case "lceil":
                    return "M403 1759 V84 H666 V0 H319 V1759 v" + t + " v602 h84z\nM403 1759 V0 H319 V1759 v" + t + " v602 h84z";
                case "rceil":
                    return "M347 1759 V0 H0 V84 H263 V1759 v" + t + " v602 h84z\nM347 1759 V0 h-84 V1759 v" + t + " v602 h84z";
                case "lparen":
                    return "M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0," + (t + 84) + "c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-" + (t + 92) + "c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";
                case "rparen":
                    return "M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0," + (t + 9) + "\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-" + (t + 144) + "c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";
                default:
                    throw new Error("Unknown stretchy delimiter.")
                }
            }(m, Math.round(1e3 * T))
              , C = new Le(m,N)
              , q = (c / 1e3).toFixed(3) + "em"
              , I = (B / 1e3).toFixed(3) + "em"
              , R = new Ee([C],{
                width: q,
                height: I,
                viewBox: "0 0 " + c + " " + B
            })
              , H = It.makeSvgSpan([], [R], a);
            H.height = B / 1e3,
            H.style.width = q,
            H.style.height = I,
            A.push({
                type: "elem",
                elem: H
            })
        } else {
            if (A.push(Ur(h, p, n)),
            A.push(Wr),
            null === s) {
                var O = S - d - b + .016;
                A.push(Yr(l, O, a))
            } else {
                var E = (S - d - b - y) / 2 + .016;
                A.push(Yr(l, E, a)),
                A.push(Wr),
                A.push(Ur(s, p, n)),
                A.push(Wr),
                A.push(Yr(l, E, a))
            }
            A.push(Wr),
            A.push(Ur(o, p, n))
        }
        var L = a.havingBaseStyle(se.TEXT)
          , D = It.makeVList({
            positionType: "bottom",
            positionData: z,
            children: A
        }, L);
        return Vr(It.makeSpan(["delimsizing", "mult"], [D], L), se.TEXT, a, i)
    }
      , _r = .08
      , Zr = function(e, t, r, a, n) {
        var i = function(e, t, r) {
            t *= 1e3;
            var a = "";
            switch (e) {
            case "sqrtMain":
                a = function(e, t) {
                    return "M95," + (622 + e + 80) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + e / 2.075 + " -" + e + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + e) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + e) + " 80h400000v" + (40 + e) + "h-400000z"
                }(t);
                break;
            case "sqrtSize1":
                a = function(e, t) {
                    return "M263," + (601 + e + 80) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + e / 2.084 + " -" + e + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + e) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + e) + " 80h400000v" + (40 + e) + "h-400000z"
                }(t);
                break;
            case "sqrtSize2":
                a = function(e, t) {
                    return "M983 " + (10 + e + 80) + "\nl" + e / 3.13 + " -" + e + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + e) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + e) + " 80h400000v" + (40 + e) + "h-400000z"
                }(t);
                break;
            case "sqrtSize3":
                a = function(e, t) {
                    return "M424," + (2398 + e + 80) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + e / 4.223 + " -" + e + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + e) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + e) + " 80\nh400000v" + (40 + e) + "h-400000z"
                }(t);
                break;
            case "sqrtSize4":
                a = function(e, t) {
                    return "M473," + (2713 + e + 80) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + e / 5.298 + " -" + e + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + e) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + e) + " 80h400000v" + (40 + e) + "H1017.7z"
                }(t);
                break;
            case "sqrtTall":
                a = function(e, t, r) {
                    return "M702 " + (e + 80) + "H400000" + (40 + e) + "\nH742v" + (r - 54 - 80 - e) + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 80H400000v" + (40 + e) + "H742z"
                }(t, 0, r)
            }
            return a
        }(e, a, r)
          , o = new Le(e,i)
          , s = new Ee([o],{
            width: "400em",
            height: Ae(t),
            viewBox: "0 0 400000 " + r,
            preserveAspectRatio: "xMinYMin slice"
        });
        return It.makeSvgSpan(["hide-tail"], [s], n)
    }
      , Kr = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230a", "\u230b", "\\lceil", "\\rceil", "\u2308", "\u2309", "\\surd"]
      , Jr = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27ee", "\u27ef", "\\lmoustache", "\\rmoustache", "\u23b0", "\u23b1"]
      , Qr = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"]
      , ea = [0, 1.2, 1.8, 2.4, 3]
      , ta = [{
        type: "small",
        style: se.SCRIPTSCRIPT
    }, {
        type: "small",
        style: se.SCRIPT
    }, {
        type: "small",
        style: se.TEXT
    }, {
        type: "large",
        size: 1
    }, {
        type: "large",
        size: 2
    }, {
        type: "large",
        size: 3
    }, {
        type: "large",
        size: 4
    }]
      , ra = [{
        type: "small",
        style: se.SCRIPTSCRIPT
    }, {
        type: "small",
        style: se.SCRIPT
    }, {
        type: "small",
        style: se.TEXT
    }, {
        type: "stack"
    }]
      , aa = [{
        type: "small",
        style: se.SCRIPTSCRIPT
    }, {
        type: "small",
        style: se.SCRIPT
    }, {
        type: "small",
        style: se.TEXT
    }, {
        type: "large",
        size: 1
    }, {
        type: "large",
        size: 2
    }, {
        type: "large",
        size: 3
    }, {
        type: "large",
        size: 4
    }, {
        type: "stack"
    }]
      , na = function(e) {
        if ("small" === e.type)
            return "Main-Regular";
        if ("large" === e.type)
            return "Size" + e.size + "-Regular";
        if ("stack" === e.type)
            return "Size4-Regular";
        throw new Error("Add support for delim type '" + e.type + "' here.")
    }
      , ia = function(e, t, r, a) {
        for (var n = Math.min(2, 3 - a.style.size); n < r.length && "stack" !== r[n].type; n++) {
            var i = Pr(e, na(r[n]), "math")
              , o = i.height + i.depth;
            if ("small" === r[n].type && (o *= a.havingBaseStyle(r[n].style).sizeMultiplier),
            o > t)
                return r[n]
        }
        return r[r.length - 1]
    }
      , oa = function(e, t, r, a, n, i) {
        var o;
        "<" === e || "\\lt" === e || "\u27e8" === e ? e = "\\langle" : ">" !== e && "\\gt" !== e && "\u27e9" !== e || (e = "\\rangle"),
        o = U(Qr, e) ? ta : U(Kr, e) ? aa : ra;
        var s = ia(e, t, o, a);
        return "small" === s.type ? function(e, t, r, a, n, i) {
            var o = It.makeSymbol(e, "Main-Regular", n, a)
              , s = Vr(o, t, a, i);
            return r && Fr(s, a, t),
            s
        }(e, s.style, r, a, n, i) : "large" === s.type ? Gr(e, s.size, r, a, n, i) : jr(e, t, r, a, n, i)
    }
      , sa = {
        sqrtImage: function(e, t) {
            var r, a, n = t.havingBaseSizing(), i = ia("\\surd", e * n.sizeMultiplier, aa, n), o = n.sizeMultiplier, s = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness), l = 0, h = 0, m = 0;
            return "small" === i.type ? (e < 1 ? o = 1 : e < 1.4 && (o = .7),
            h = (1 + s) / o,
            (r = Zr("sqrtMain", l = (1 + s + _r) / o, m = 1e3 + 1e3 * s + 80, s, t)).style.minWidth = "0.853em",
            a = .833 / o) : "large" === i.type ? (m = 1080 * ea[i.size],
            h = (ea[i.size] + s) / o,
            l = (ea[i.size] + s + _r) / o,
            (r = Zr("sqrtSize" + i.size, l, m, s, t)).style.minWidth = "1.02em",
            a = 1 / o) : (l = e + s + _r,
            h = e + s,
            m = Math.floor(1e3 * e + s) + 80,
            (r = Zr("sqrtTall", l, m, s, t)).style.minWidth = "0.742em",
            a = 1.056),
            r.height = h,
            r.style.height = Ae(l),
            {
                span: r,
                advanceWidth: a,
                ruleWidth: (t.fontMetrics().sqrtRuleThickness + s) * o
            }
        },
        sizedDelim: function(e, t, r, a, n) {
            if ("<" === e || "\\lt" === e || "\u27e8" === e ? e = "\\langle" : ">" !== e && "\\gt" !== e && "\u27e9" !== e || (e = "\\rangle"),
            U(Kr, e) || U(Qr, e))
                return Gr(e, t, !1, r, a, n);
            if (U(Jr, e))
                return jr(e, ea[t], !1, r, a, n);
            throw new D("Illegal delimiter: '" + e + "'")
        },
        sizeToMaxHeight: ea,
        customSizedDelim: oa,
        leftRightDelim: function(e, t, r, a, n, i) {
            var o = a.fontMetrics().axisHeight * a.sizeMultiplier
              , s = 5 / a.fontMetrics().ptPerEm
              , l = Math.max(t - o, r + o)
              , h = Math.max(l / 500 * 901, 2 * l - s);
            return oa(e, h, !0, a, n, i)
        }
    }
      , la = {
        "\\bigl": {
            mclass: "mopen",
            size: 1
        },
        "\\Bigl": {
            mclass: "mopen",
            size: 2
        },
        "\\biggl": {
            mclass: "mopen",
            size: 3
        },
        "\\Biggl": {
            mclass: "mopen",
            size: 4
        },
        "\\bigr": {
            mclass: "mclose",
            size: 1
        },
        "\\Bigr": {
            mclass: "mclose",
            size: 2
        },
        "\\biggr": {
            mclass: "mclose",
            size: 3
        },
        "\\Biggr": {
            mclass: "mclose",
            size: 4
        },
        "\\bigm": {
            mclass: "mrel",
            size: 1
        },
        "\\Bigm": {
            mclass: "mrel",
            size: 2
        },
        "\\biggm": {
            mclass: "mrel",
            size: 3
        },
        "\\Biggm": {
            mclass: "mrel",
            size: 4
        },
        "\\big": {
            mclass: "mord",
            size: 1
        },
        "\\Big": {
            mclass: "mord",
            size: 2
        },
        "\\bigg": {
            mclass: "mord",
            size: 3
        },
        "\\Bigg": {
            mclass: "mord",
            size: 4
        }
    }
      , ha = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230a", "\u230b", "\\lceil", "\\rceil", "\u2308", "\u2309", "<", ">", "\\langle", "\u27e8", "\\rangle", "\u27e9", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27ee", "\u27ef", "\\lmoustache", "\\rmoustache", "\u23b0", "\u23b1", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];
    function ma(e, t) {
        var r = kr(e);
        if (r && U(ha, r.text))
            return r;
        throw new D(r ? "Invalid delimiter '" + r.text + "' after '" + t.funcName + "'" : "Invalid delimiter type '" + e.type + "'",e)
    }
    function ca(e) {
        if (!e.body)
            throw new Error("Bug: The leftright ParseNode wasn't fully parsed.")
    }
    Ft({
        type: "delimsizing",
        names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
        props: {
            numArgs: 1,
            argTypes: ["primitive"]
        },
        handler: (e,t)=>{
            var r = ma(t[0], e);
            return {
                type: "delimsizing",
                mode: e.parser.mode,
                size: la[e.funcName].size,
                mclass: la[e.funcName].mclass,
                delim: r.text
            }
        }
        ,
        htmlBuilder: (e,t)=>"." === e.delim ? It.makeSpan([e.mclass]) : sa.sizedDelim(e.delim, e.size, t, e.mode, [e.mclass]),
        mathmlBuilder: e=>{
            var t = [];
            "." !== e.delim && t.push(hr(e.delim, e.mode));
            var r = new lr.MathNode("mo",t);
            "mopen" === e.mclass || "mclose" === e.mclass ? r.setAttribute("fence", "true") : r.setAttribute("fence", "false"),
            r.setAttribute("stretchy", "true");
            var a = Ae(sa.sizeToMaxHeight[e.size]);
            return r.setAttribute("minsize", a),
            r.setAttribute("maxsize", a),
            r
        }
    }),
    Ft({
        type: "leftright-right",
        names: ["\\right"],
        props: {
            numArgs: 1,
            primitive: !0
        },
        handler: (e,t)=>{
            var r = e.parser.gullet.macros.get("\\current@color");
            if (r && "string" != typeof r)
                throw new D("\\current@color set to non-string in \\right");
            return {
                type: "leftright-right",
                mode: e.parser.mode,
                delim: ma(t[0], e).text,
                color: r
            }
        }
    }),
    Ft({
        type: "leftright",
        names: ["\\left"],
        props: {
            numArgs: 1,
            primitive: !0
        },
        handler: (e,t)=>{
            var r = ma(t[0], e)
              , a = e.parser;
            ++a.leftrightDepth;
            var n = a.parseExpression(!1);
            --a.leftrightDepth,
            a.expect("\\right", !1);
            var i = xr(a.parseFunction(), "leftright-right");
            return {
                type: "leftright",
                mode: a.mode,
                body: n,
                left: r.text,
                right: i.delim,
                rightColor: i.color
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            ca(e);
            for (var r, a, n = Zt(e.body, t, !0, ["mopen", "mclose"]), i = 0, o = 0, s = !1, l = 0; l < n.length; l++)
                n[l].isMiddle ? s = !0 : (i = Math.max(n[l].height, i),
                o = Math.max(n[l].depth, o));
            if (i *= t.sizeMultiplier,
            o *= t.sizeMultiplier,
            r = "." === e.left ? tr(t, ["mopen"]) : sa.leftRightDelim(e.left, i, o, t, e.mode, ["mopen"]),
            n.unshift(r),
            s)
                for (var h = 1; h < n.length; h++) {
                    var m = n[h].isMiddle;
                    m && (n[h] = sa.leftRightDelim(m.delim, i, o, m.options, e.mode, []))
                }
            if ("." === e.right)
                a = tr(t, ["mclose"]);
            else {
                var c = e.rightColor ? t.withColor(e.rightColor) : t;
                a = sa.leftRightDelim(e.right, i, o, c, e.mode, ["mclose"])
            }
            return n.push(a),
            It.makeSpan(["minner"], n, t)
        }
        ,
        mathmlBuilder: (e,t)=>{
            ca(e);
            var r = pr(e.body, t);
            if ("." !== e.left) {
                var a = new lr.MathNode("mo",[hr(e.left, e.mode)]);
                a.setAttribute("fence", "true"),
                r.unshift(a)
            }
            if ("." !== e.right) {
                var n = new lr.MathNode("mo",[hr(e.right, e.mode)]);
                n.setAttribute("fence", "true"),
                e.rightColor && n.setAttribute("mathcolor", e.rightColor),
                r.push(n)
            }
            return mr(r)
        }
    }),
    Ft({
        type: "middle",
        names: ["\\middle"],
        props: {
            numArgs: 1,
            primitive: !0
        },
        handler: (e,t)=>{
            var r = ma(t[0], e);
            if (!e.parser.leftrightDepth)
                throw new D("\\middle without preceding \\left",r);
            return {
                type: "middle",
                mode: e.parser.mode,
                delim: r.text
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r;
            if ("." === e.delim)
                r = tr(t, []);
            else {
                r = sa.sizedDelim(e.delim, 1, t, e.mode, []);
                var a = {
                    delim: e.delim,
                    options: t
                };
                r.isMiddle = a
            }
            return r
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = "\\vert" === e.delim || "|" === e.delim ? hr("|", "text") : hr(e.delim, e.mode)
              , a = new lr.MathNode("mo",[r]);
            return a.setAttribute("fence", "true"),
            a.setAttribute("lspace", "0.05em"),
            a.setAttribute("rspace", "0.05em"),
            a
        }
    });
    var pa = (e,t)=>{
        var r, a, n, i = It.wrapFragment(rr(e.body, t), t), o = e.label.slice(1), s = t.sizeMultiplier, l = 0, h = j(e.body);
        if ("sout" === o)
            (r = It.makeSpan(["stretchy", "sout"])).height = t.fontMetrics().defaultRuleThickness / s,
            l = -.5 * t.fontMetrics().xHeight;
        else if ("phase" === o) {
            var m = ze({
                number: .6,
                unit: "pt"
            }, t)
              , c = ze({
                number: .35,
                unit: "ex"
            }, t);
            s /= t.havingBaseSizing().sizeMultiplier;
            var p = i.height + i.depth + m + c;
            i.style.paddingLeft = Ae(p / 2 + m);
            var u = Math.floor(1e3 * p * s)
              , d = "M400000 " + (a = u) + " H0 L" + a / 2 + " 0 l65 45 L145 " + (a - 80) + " H400000z"
              , g = new Ee([new Le("phase",d)],{
                width: "400em",
                height: Ae(u / 1e3),
                viewBox: "0 0 400000 " + u,
                preserveAspectRatio: "xMinYMin slice"
            });
            (r = It.makeSvgSpan(["hide-tail"], [g], t)).style.height = Ae(p),
            l = i.depth + m + c
        } else {
            /cancel/.test(o) ? h || i.classes.push("cancel-pad") : "angl" === o ? i.classes.push("anglpad") : i.classes.push("boxpad");
            var f = 0
              , v = 0
              , b = 0;
            /box/.test(o) ? (b = Math.max(t.fontMetrics().fboxrule, t.minRuleThickness),
            v = f = t.fontMetrics().fboxsep + ("colorbox" === o ? 0 : b)) : "angl" === o ? (f = 4 * (b = Math.max(t.fontMetrics().defaultRuleThickness, t.minRuleThickness)),
            v = Math.max(0, .25 - i.depth)) : v = f = h ? .2 : 0,
            r = function(e, t, r, a, n) {
                var i, o = e.height + e.depth + r + a;
                if (/fbox|color|angl/.test(t)) {
                    if (i = It.makeSpan(["stretchy", t], [], n),
                    "fbox" === t) {
                        var s = n.color && n.getColor();
                        s && (i.style.borderColor = s)
                    }
                } else {
                    var l = [];
                    /^[bx]cancel$/.test(t) && l.push(new De({
                        x1: "0",
                        y1: "0",
                        x2: "100%",
                        y2: "100%",
                        "stroke-width": "0.046em"
                    })),
                    /^x?cancel$/.test(t) && l.push(new De({
                        x1: "0",
                        y1: "100%",
                        x2: "100%",
                        y2: "0",
                        "stroke-width": "0.046em"
                    }));
                    var h = new Ee(l,{
                        width: "100%",
                        height: Ae(o)
                    });
                    i = It.makeSvgSpan([], [h], n)
                }
                return i.height = o,
                i.style.height = Ae(o),
                i
            }(i, o, f, v, t),
            /fbox|boxed|fcolorbox/.test(o) ? (r.style.borderStyle = "solid",
            r.style.borderWidth = Ae(b)) : "angl" === o && .049 !== b && (r.style.borderTopWidth = Ae(b),
            r.style.borderRightWidth = Ae(b)),
            l = i.depth + v,
            e.backgroundColor && (r.style.backgroundColor = e.backgroundColor,
            e.borderColor && (r.style.borderColor = e.borderColor))
        }
        if (e.backgroundColor)
            n = It.makeVList({
                positionType: "individualShift",
                children: [{
                    type: "elem",
                    elem: r,
                    shift: l
                }, {
                    type: "elem",
                    elem: i,
                    shift: 0
                }]
            }, t);
        else {
            var y = /cancel|phase/.test(o) ? ["svg-align"] : [];
            n = It.makeVList({
                positionType: "individualShift",
                children: [{
                    type: "elem",
                    elem: i,
                    shift: 0
                }, {
                    type: "elem",
                    elem: r,
                    shift: l,
                    wrapperClasses: y
                }]
            }, t)
        }
        return /cancel/.test(o) && (n.height = i.height,
        n.depth = i.depth),
        /cancel/.test(o) && !h ? It.makeSpan(["mord", "cancel-lap"], [n], t) : It.makeSpan(["mord"], [n], t)
    }
      , ua = (e,t)=>{
        var r = 0
          , a = new lr.MathNode(e.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose",[dr(e.body, t)]);
        switch (e.label) {
        case "\\cancel":
            a.setAttribute("notation", "updiagonalstrike");
            break;
        case "\\bcancel":
            a.setAttribute("notation", "downdiagonalstrike");
            break;
        case "\\phase":
            a.setAttribute("notation", "phasorangle");
            break;
        case "\\sout":
            a.setAttribute("notation", "horizontalstrike");
            break;
        case "\\fbox":
            a.setAttribute("notation", "box");
            break;
        case "\\angl":
            a.setAttribute("notation", "actuarial");
            break;
        case "\\fcolorbox":
        case "\\colorbox":
            if (r = t.fontMetrics().fboxsep * t.fontMetrics().ptPerEm,
            a.setAttribute("width", "+" + 2 * r + "pt"),
            a.setAttribute("height", "+" + 2 * r + "pt"),
            a.setAttribute("lspace", r + "pt"),
            a.setAttribute("voffset", r + "pt"),
            "\\fcolorbox" === e.label) {
                var n = Math.max(t.fontMetrics().fboxrule, t.minRuleThickness);
                a.setAttribute("style", "border: " + n + "em solid " + String(e.borderColor))
            }
            break;
        case "\\xcancel":
            a.setAttribute("notation", "updiagonalstrike downdiagonalstrike")
        }
        return e.backgroundColor && a.setAttribute("mathbackground", e.backgroundColor),
        a
    }
    ;
    Ft({
        type: "enclose",
        names: ["\\colorbox"],
        props: {
            numArgs: 2,
            allowedInText: !0,
            argTypes: ["color", "text"]
        },
        handler(e, t, r) {
            var {parser: a, funcName: n} = e
              , i = xr(t[0], "color-token").color
              , o = t[1];
            return {
                type: "enclose",
                mode: a.mode,
                label: n,
                backgroundColor: i,
                body: o
            }
        },
        htmlBuilder: pa,
        mathmlBuilder: ua
    }),
    Ft({
        type: "enclose",
        names: ["\\fcolorbox"],
        props: {
            numArgs: 3,
            allowedInText: !0,
            argTypes: ["color", "color", "text"]
        },
        handler(e, t, r) {
            var {parser: a, funcName: n} = e
              , i = xr(t[0], "color-token").color
              , o = xr(t[1], "color-token").color
              , s = t[2];
            return {
                type: "enclose",
                mode: a.mode,
                label: n,
                backgroundColor: o,
                borderColor: i,
                body: s
            }
        },
        htmlBuilder: pa,
        mathmlBuilder: ua
    }),
    Ft({
        type: "enclose",
        names: ["\\fbox"],
        props: {
            numArgs: 1,
            argTypes: ["hbox"],
            allowedInText: !0
        },
        handler(e, t) {
            var {parser: r} = e;
            return {
                type: "enclose",
                mode: r.mode,
                label: "\\fbox",
                body: t[0]
            }
        }
    }),
    Ft({
        type: "enclose",
        names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
        props: {
            numArgs: 1
        },
        handler(e, t) {
            var {parser: r, funcName: a} = e
              , n = t[0];
            return {
                type: "enclose",
                mode: r.mode,
                label: a,
                body: n
            }
        },
        htmlBuilder: pa,
        mathmlBuilder: ua
    }),
    Ft({
        type: "enclose",
        names: ["\\angl"],
        props: {
            numArgs: 1,
            argTypes: ["hbox"],
            allowedInText: !1
        },
        handler(e, t) {
            var {parser: r} = e;
            return {
                type: "enclose",
                mode: r.mode,
                label: "\\angl",
                body: t[0]
            }
        }
    });
    var da = {};
    function ga(e) {
        for (var {type: t, names: r, props: a, handler: n, htmlBuilder: i, mathmlBuilder: o} = e, s = {
            type: t,
            numArgs: a.numArgs || 0,
            allowedInText: !1,
            numOptionalArgs: 0,
            handler: n
        }, l = 0; l < r.length; ++l)
            da[r[l]] = s;
        i && (Pt[t] = i),
        o && (Vt[t] = o)
    }
    var fa = {};
    function va(e, t) {
        fa[e] = t
    }
    function ba(e) {
        var t = [];
        e.consumeSpaces();
        var r = e.fetch().text;
        for ("\\relax" === r && (e.consume(),
        e.consumeSpaces(),
        r = e.fetch().text); "\\hline" === r || "\\hdashline" === r; )
            e.consume(),
            t.push("\\hdashline" === r),
            e.consumeSpaces(),
            r = e.fetch().text;
        return t
    }
    var ya = e=>{
        if (!e.parser.settings.displayMode)
            throw new D("{" + e.envName + "} can be used only in display mode.")
    }
    ;
    function xa(e) {
        if (-1 === e.indexOf("ed"))
            return -1 === e.indexOf("*")
    }
    function wa(e, t, r) {
        var {hskipBeforeAndAfter: a, addJot: n, cols: i, arraystretch: o, colSeparationType: s, autoTag: l, singleRow: h, emptySingleRow: m, maxNumCols: c, leqno: p} = t;
        if (e.gullet.beginGroup(),
        h || e.gullet.macros.set("\\cr", "\\\\\\relax"),
        !o) {
            var u = e.gullet.expandMacroAsText("\\arraystretch");
            if (null == u)
                o = 1;
            else if (!(o = parseFloat(u)) || o < 0)
                throw new D("Invalid \\arraystretch: " + u)
        }
        e.gullet.beginGroup();
        var d = []
          , g = [d]
          , f = []
          , v = []
          , b = null != l ? [] : void 0;
        function y() {
            l && e.gullet.macros.set("\\@eqnsw", "1", !0)
        }
        function x() {
            b && (e.gullet.macros.get("\\df@tag") ? (b.push(e.subparse([new L("\\df@tag")])),
            e.gullet.macros.set("\\df@tag", void 0, !0)) : b.push(Boolean(l) && "1" === e.gullet.macros.get("\\@eqnsw")))
        }
        for (y(),
        v.push(ba(e)); ; ) {
            var w = e.parseExpression(!1, h ? "\\end" : "\\\\");
            e.gullet.endGroup(),
            e.gullet.beginGroup(),
            w = {
                type: "ordgroup",
                mode: e.mode,
                body: w
            },
            r && (w = {
                type: "styling",
                mode: e.mode,
                style: r,
                body: [w]
            }),
            d.push(w);
            var k = e.fetch().text;
            if ("&" === k) {
                if (c && d.length === c) {
                    if (h || s)
                        throw new D("Too many tab characters: &",e.nextToken);
                    e.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.")
                }
                e.consume()
            } else {
                if ("\\end" === k) {
                    x(),
                    1 === d.length && "styling" === w.type && 0 === w.body[0].body.length && (g.length > 1 || !m) && g.pop(),
                    v.length < g.length + 1 && v.push([]);
                    break
                }
                if ("\\\\" !== k)
                    throw new D("Expected & or \\\\ or \\cr or \\end",e.nextToken);
                e.consume();
                var S = void 0;
                " " !== e.gullet.future().text && (S = e.parseSizeGroup(!0)),
                f.push(S ? S.value : null),
                x(),
                v.push(ba(e)),
                d = [],
                g.push(d),
                y()
            }
        }
        return e.gullet.endGroup(),
        e.gullet.endGroup(),
        {
            type: "array",
            mode: e.mode,
            addJot: n,
            arraystretch: o,
            body: g,
            cols: i,
            rowGaps: f,
            hskipBeforeAndAfter: a,
            hLinesBeforeRow: v,
            colSeparationType: s,
            tags: b,
            leqno: p
        }
    }
    function ka(e) {
        return "d" === e.slice(0, 1) ? "display" : "text"
    }
    var Sa = function(e, t) {
        var r, a, n = e.body.length, i = e.hLinesBeforeRow, o = 0, s = new Array(n), l = [], h = Math.max(t.fontMetrics().arrayRuleWidth, t.minRuleThickness), m = 1 / t.fontMetrics().ptPerEm, c = 5 * m;
        e.colSeparationType && "small" === e.colSeparationType && (c = t.havingStyle(se.SCRIPT).sizeMultiplier / t.sizeMultiplier * .2778);
        var p = "CD" === e.colSeparationType ? ze({
            number: 3,
            unit: "ex"
        }, t) : 12 * m
          , u = 3 * m
          , d = e.arraystretch * p
          , g = .7 * d
          , f = .3 * d
          , v = 0;
        function b(e) {
            for (var t = 0; t < e.length; ++t)
                t > 0 && (v += .25),
                l.push({
                    pos: v,
                    isDashed: e[t]
                })
        }
        for (b(i[0]),
        r = 0; r < e.body.length; ++r) {
            var y = e.body[r]
              , x = g
              , w = f;
            o < y.length && (o = y.length);
            var k = new Array(y.length);
            for (a = 0; a < y.length; ++a) {
                var S = rr(y[a], t);
                w < S.depth && (w = S.depth),
                x < S.height && (x = S.height),
                k[a] = S
            }
            var M = e.rowGaps[r]
              , z = 0;
            M && (z = ze(M, t)) > 0 && (w < (z += f) && (w = z),
            z = 0),
            e.addJot && (w += u),
            k.height = x,
            k.depth = w,
            v += x,
            k.pos = v,
            v += w + z,
            s[r] = k,
            b(i[r + 1])
        }
        var A, T, B = v / 2 + t.fontMetrics().axisHeight, N = e.cols || [], C = [], q = [];
        if (e.tags && e.tags.some((e=>e)))
            for (r = 0; r < n; ++r) {
                var I = s[r]
                  , R = I.pos - B
                  , H = e.tags[r]
                  , O = void 0;
                (O = !0 === H ? It.makeSpan(["eqn-num"], [], t) : It.makeSpan([], !1 === H ? [] : Zt(H, t, !0), t)).depth = I.depth,
                O.height = I.height,
                q.push({
                    type: "elem",
                    elem: O,
                    shift: R
                })
            }
        for (a = 0,
        T = 0; a < o || T < N.length; ++a,
        ++T) {
            for (var E = N[T] || {}, L = !0; "separator" === E.type; ) {
                if (L || ((A = It.makeSpan(["arraycolsep"], [])).style.width = Ae(t.fontMetrics().doubleRuleSep),
                C.push(A)),
                "|" !== E.separator && ":" !== E.separator)
                    throw new D("Invalid separator type: " + E.separator);
                var P = "|" === E.separator ? "solid" : "dashed"
                  , V = It.makeSpan(["vertical-separator"], [], t);
                V.style.height = Ae(v),
                V.style.borderRightWidth = Ae(h),
                V.style.borderRightStyle = P,
                V.style.margin = "0 " + Ae(-h / 2);
                var F = v - B;
                F && (V.style.verticalAlign = Ae(-F)),
                C.push(V),
                E = N[++T] || {},
                L = !1
            }
            if (!(a >= o)) {
                var G = void 0;
                (a > 0 || e.hskipBeforeAndAfter) && 0 !== (G = Y(E.pregap, c)) && ((A = It.makeSpan(["arraycolsep"], [])).style.width = Ae(G),
                C.push(A));
                var U = [];
                for (r = 0; r < n; ++r) {
                    var W = s[r]
                      , X = W[a];
                    if (X) {
                        var $ = W.pos - B;
                        X.depth = W.depth,
                        X.height = W.height,
                        U.push({
                            type: "elem",
                            elem: X,
                            shift: $
                        })
                    }
                }
                U = It.makeVList({
                    positionType: "individualShift",
                    children: U
                }, t),
                U = It.makeSpan(["col-align-" + (E.align || "c")], [U]),
                C.push(U),
                (a < o - 1 || e.hskipBeforeAndAfter) && 0 !== (G = Y(E.postgap, c)) && ((A = It.makeSpan(["arraycolsep"], [])).style.width = Ae(G),
                C.push(A))
            }
        }
        if (s = It.makeSpan(["mtable"], C),
        l.length > 0) {
            for (var j = It.makeLineSpan("hline", t, h), _ = It.makeLineSpan("hdashline", t, h), Z = [{
                type: "elem",
                elem: s,
                shift: 0
            }]; l.length > 0; ) {
                var K = l.pop()
                  , J = K.pos - B;
                K.isDashed ? Z.push({
                    type: "elem",
                    elem: _,
                    shift: J
                }) : Z.push({
                    type: "elem",
                    elem: j,
                    shift: J
                })
            }
            s = It.makeVList({
                positionType: "individualShift",
                children: Z
            }, t)
        }
        if (0 === q.length)
            return It.makeSpan(["mord"], [s], t);
        var Q = It.makeVList({
            positionType: "individualShift",
            children: q
        }, t);
        return Q = It.makeSpan(["tag"], [Q], t),
        It.makeFragment([s, Q])
    }
      , Ma = {
        c: "center ",
        l: "left ",
        r: "right "
    }
      , za = function(e, t) {
        for (var r = [], a = new lr.MathNode("mtd",[],["mtr-glue"]), n = new lr.MathNode("mtd",[],["mml-eqn-num"]), i = 0; i < e.body.length; i++) {
            for (var o = e.body[i], s = [], l = 0; l < o.length; l++)
                s.push(new lr.MathNode("mtd",[dr(o[l], t)]));
            e.tags && e.tags[i] && (s.unshift(a),
            s.push(a),
            e.leqno ? s.unshift(n) : s.push(n)),
            r.push(new lr.MathNode("mtr",s))
        }
        var h = new lr.MathNode("mtable",r)
          , m = .5 === e.arraystretch ? .1 : .16 + e.arraystretch - 1 + (e.addJot ? .09 : 0);
        h.setAttribute("rowspacing", Ae(m));
        var c = ""
          , p = "";
        if (e.cols && e.cols.length > 0) {
            var u = e.cols
              , d = ""
              , g = !1
              , f = 0
              , v = u.length;
            "separator" === u[0].type && (c += "top ",
            f = 1),
            "separator" === u[u.length - 1].type && (c += "bottom ",
            v -= 1);
            for (var b = f; b < v; b++)
                "align" === u[b].type ? (p += Ma[u[b].align],
                g && (d += "none "),
                g = !0) : "separator" === u[b].type && g && (d += "|" === u[b].separator ? "solid " : "dashed ",
                g = !1);
            h.setAttribute("columnalign", p.trim()),
            /[sd]/.test(d) && h.setAttribute("columnlines", d.trim())
        }
        if ("align" === e.colSeparationType) {
            for (var y = e.cols || [], x = "", w = 1; w < y.length; w++)
                x += w % 2 ? "0em " : "1em ";
            h.setAttribute("columnspacing", x.trim())
        } else
            "alignat" === e.colSeparationType || "gather" === e.colSeparationType ? h.setAttribute("columnspacing", "0em") : "small" === e.colSeparationType ? h.setAttribute("columnspacing", "0.2778em") : "CD" === e.colSeparationType ? h.setAttribute("columnspacing", "0.5em") : h.setAttribute("columnspacing", "1em");
        var k = ""
          , S = e.hLinesBeforeRow;
        c += S[0].length > 0 ? "left " : "",
        c += S[S.length - 1].length > 0 ? "right " : "";
        for (var M = 1; M < S.length - 1; M++)
            k += 0 === S[M].length ? "none " : S[M][0] ? "dashed " : "solid ";
        return /[sd]/.test(k) && h.setAttribute("rowlines", k.trim()),
        "" !== c && (h = new lr.MathNode("menclose",[h])).setAttribute("notation", c.trim()),
        e.arraystretch && e.arraystretch < 1 && (h = new lr.MathNode("mstyle",[h])).setAttribute("scriptlevel", "1"),
        h
    }
      , Aa = function(e, t) {
        -1 === e.envName.indexOf("ed") && ya(e);
        var r, a = [], n = e.envName.indexOf("at") > -1 ? "alignat" : "align", i = "split" === e.envName, o = wa(e.parser, {
            cols: a,
            addJot: !0,
            autoTag: i ? void 0 : xa(e.envName),
            emptySingleRow: !0,
            colSeparationType: n,
            maxNumCols: i ? 2 : void 0,
            leqno: e.parser.settings.leqno
        }, "display"), s = 0, l = {
            type: "ordgroup",
            mode: e.mode,
            body: []
        };
        if (t[0] && "ordgroup" === t[0].type) {
            for (var h = "", m = 0; m < t[0].body.length; m++)
                h += xr(t[0].body[m], "textord").text;
            r = Number(h),
            s = 2 * r
        }
        var c = !s;
        o.body.forEach((function(e) {
            for (var t = 1; t < e.length; t += 2) {
                var a = xr(e[t], "styling");
                xr(a.body[0], "ordgroup").body.unshift(l)
            }
            if (c)
                s < e.length && (s = e.length);
            else {
                var n = e.length / 2;
                if (r < n)
                    throw new D("Too many math in a row: expected " + r + ", but got " + n,e[0])
            }
        }
        ));
        for (var p = 0; p < s; ++p) {
            var u = "r"
              , d = 0;
            p % 2 == 1 ? u = "l" : p > 0 && c && (d = 1),
            a[p] = {
                type: "align",
                align: u,
                pregap: d,
                postgap: 0
            }
        }
        return o.colSeparationType = c ? "align" : "alignat",
        o
    };
    ga({
        type: "array",
        names: ["array", "darray"],
        props: {
            numArgs: 1
        },
        handler(e, t) {
            var r = (kr(t[0]) ? [t[0]] : xr(t[0], "ordgroup").body).map((function(e) {
                var t = wr(e).text;
                if (-1 !== "lcr".indexOf(t))
                    return {
                        type: "align",
                        align: t
                    };
                if ("|" === t)
                    return {
                        type: "separator",
                        separator: "|"
                    };
                if (":" === t)
                    return {
                        type: "separator",
                        separator: ":"
                    };
                throw new D("Unknown column alignment: " + t,e)
            }
            ))
              , a = {
                cols: r,
                hskipBeforeAndAfter: !0,
                maxNumCols: r.length
            };
            return wa(e.parser, a, ka(e.envName))
        },
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    ga({
        type: "array",
        names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
        props: {
            numArgs: 0
        },
        handler(e) {
            var t = {
                matrix: null,
                pmatrix: ["(", ")"],
                bmatrix: ["[", "]"],
                Bmatrix: ["\\{", "\\}"],
                vmatrix: ["|", "|"],
                Vmatrix: ["\\Vert", "\\Vert"]
            }[e.envName.replace("*", "")]
              , r = "c"
              , a = {
                hskipBeforeAndAfter: !1,
                cols: [{
                    type: "align",
                    align: r
                }]
            };
            if ("*" === e.envName.charAt(e.envName.length - 1)) {
                var n = e.parser;
                if (n.consumeSpaces(),
                "[" === n.fetch().text) {
                    if (n.consume(),
                    n.consumeSpaces(),
                    r = n.fetch().text,
                    -1 === "lcr".indexOf(r))
                        throw new D("Expected l or c or r",n.nextToken);
                    n.consume(),
                    n.consumeSpaces(),
                    n.expect("]"),
                    n.consume(),
                    a.cols = [{
                        type: "align",
                        align: r
                    }]
                }
            }
            var i = wa(e.parser, a, ka(e.envName))
              , o = Math.max(0, ...i.body.map((e=>e.length)));
            return i.cols = new Array(o).fill({
                type: "align",
                align: r
            }),
            t ? {
                type: "leftright",
                mode: e.mode,
                body: [i],
                left: t[0],
                right: t[1],
                rightColor: void 0
            } : i
        },
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    ga({
        type: "array",
        names: ["smallmatrix"],
        props: {
            numArgs: 0
        },
        handler(e) {
            var t = wa(e.parser, {
                arraystretch: .5
            }, "script");
            return t.colSeparationType = "small",
            t
        },
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    ga({
        type: "array",
        names: ["subarray"],
        props: {
            numArgs: 1
        },
        handler(e, t) {
            var r = (kr(t[0]) ? [t[0]] : xr(t[0], "ordgroup").body).map((function(e) {
                var t = wr(e).text;
                if (-1 !== "lc".indexOf(t))
                    return {
                        type: "align",
                        align: t
                    };
                throw new D("Unknown column alignment: " + t,e)
            }
            ));
            if (r.length > 1)
                throw new D("{subarray} can contain only one column");
            var a = {
                cols: r,
                hskipBeforeAndAfter: !1,
                arraystretch: .5
            };
            if ((a = wa(e.parser, a, "script")).body.length > 0 && a.body[0].length > 1)
                throw new D("{subarray} can contain only one column");
            return a
        },
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    ga({
        type: "array",
        names: ["cases", "dcases", "rcases", "drcases"],
        props: {
            numArgs: 0
        },
        handler(e) {
            var t = wa(e.parser, {
                arraystretch: 1.2,
                cols: [{
                    type: "align",
                    align: "l",
                    pregap: 0,
                    postgap: 1
                }, {
                    type: "align",
                    align: "l",
                    pregap: 0,
                    postgap: 0
                }]
            }, ka(e.envName));
            return {
                type: "leftright",
                mode: e.mode,
                body: [t],
                left: e.envName.indexOf("r") > -1 ? "." : "\\{",
                right: e.envName.indexOf("r") > -1 ? "\\}" : ".",
                rightColor: void 0
            }
        },
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    ga({
        type: "array",
        names: ["align", "align*", "aligned", "split"],
        props: {
            numArgs: 0
        },
        handler: Aa,
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    ga({
        type: "array",
        names: ["gathered", "gather", "gather*"],
        props: {
            numArgs: 0
        },
        handler(e) {
            U(["gather", "gather*"], e.envName) && ya(e);
            var t = {
                cols: [{
                    type: "align",
                    align: "c"
                }],
                addJot: !0,
                colSeparationType: "gather",
                autoTag: xa(e.envName),
                emptySingleRow: !0,
                leqno: e.parser.settings.leqno
            };
            return wa(e.parser, t, "display")
        },
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    ga({
        type: "array",
        names: ["alignat", "alignat*", "alignedat"],
        props: {
            numArgs: 1
        },
        handler: Aa,
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    ga({
        type: "array",
        names: ["equation", "equation*"],
        props: {
            numArgs: 0
        },
        handler(e) {
            ya(e);
            var t = {
                autoTag: xa(e.envName),
                emptySingleRow: !0,
                singleRow: !0,
                maxNumCols: 1,
                leqno: e.parser.settings.leqno
            };
            return wa(e.parser, t, "display")
        },
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    ga({
        type: "array",
        names: ["CD"],
        props: {
            numArgs: 0
        },
        handler: e=>(ya(e),
        function(e) {
            var t = [];
            for (e.gullet.beginGroup(),
            e.gullet.macros.set("\\cr", "\\\\\\relax"),
            e.gullet.beginGroup(); ; ) {
                t.push(e.parseExpression(!1, "\\\\")),
                e.gullet.endGroup(),
                e.gullet.beginGroup();
                var r = e.fetch().text;
                if ("&" !== r && "\\\\" !== r) {
                    if ("\\end" === r) {
                        0 === t[t.length - 1].length && t.pop();
                        break
                    }
                    throw new D("Expected \\\\ or \\cr or \\end",e.nextToken)
                }
                e.consume()
            }
            for (var a, n, i = [], o = [i], s = 0; s < t.length; s++) {
                for (var l = t[s], h = {
                    type: "styling",
                    body: [],
                    mode: "math",
                    style: "display"
                }, m = 0; m < l.length; m++)
                    if (Ir(l[m])) {
                        i.push(h);
                        var c = wr(l[m += 1]).text
                          , p = new Array(2);
                        if (p[0] = {
                            type: "ordgroup",
                            mode: "math",
                            body: []
                        },
                        p[1] = {
                            type: "ordgroup",
                            mode: "math",
                            body: []
                        },
                        "=|.".indexOf(c) > -1)
                            ;
                        else {
                            if (!("<>AV".indexOf(c) > -1))
                                throw new D('Expected one of "<>AV=|." after @',l[m]);
                            for (var u = 0; u < 2; u++) {
                                for (var d = !0, g = m + 1; g < l.length; g++) {
                                    if (n = c,
                                    ("mathord" === (a = l[g]).type || "atom" === a.type) && a.text === n) {
                                        d = !1,
                                        m = g;
                                        break
                                    }
                                    if (Ir(l[g]))
                                        throw new D("Missing a " + c + " character to complete a CD arrow.",l[g]);
                                    p[u].body.push(l[g])
                                }
                                if (d)
                                    throw new D("Missing a " + c + " character to complete a CD arrow.",l[m])
                            }
                        }
                        var f = {
                            type: "styling",
                            body: [Rr(c, p, e)],
                            mode: "math",
                            style: "display"
                        };
                        i.push(f),
                        h = {
                            type: "styling",
                            body: [],
                            mode: "math",
                            style: "display"
                        }
                    } else
                        h.body.push(l[m]);
                s % 2 == 0 ? i.push(h) : i.shift(),
                i = [],
                o.push(i)
            }
            return e.gullet.endGroup(),
            e.gullet.endGroup(),
            {
                type: "array",
                mode: "math",
                body: o,
                arraystretch: 1,
                addJot: !0,
                rowGaps: [null],
                cols: new Array(o[0].length).fill({
                    type: "align",
                    align: "c",
                    pregap: .25,
                    postgap: .25
                }),
                colSeparationType: "CD",
                hLinesBeforeRow: new Array(o.length + 1).fill([])
            }
        }(e.parser)),
        htmlBuilder: Sa,
        mathmlBuilder: za
    }),
    va("\\nonumber", "\\gdef\\@eqnsw{0}"),
    va("\\notag", "\\nonumber"),
    Ft({
        type: "text",
        names: ["\\hline", "\\hdashline"],
        props: {
            numArgs: 0,
            allowedInText: !0,
            allowedInMath: !0
        },
        handler(e, t) {
            throw new D(e.funcName + " valid only within array environment")
        }
    });
    var Ta = da;
    Ft({
        type: "environment",
        names: ["\\begin", "\\end"],
        props: {
            numArgs: 1,
            argTypes: ["text"]
        },
        handler(e, t) {
            var {parser: r, funcName: a} = e
              , n = t[0];
            if ("ordgroup" !== n.type)
                throw new D("Invalid environment name",n);
            for (var i = "", o = 0; o < n.body.length; ++o)
                i += xr(n.body[o], "textord").text;
            if ("\\begin" === a) {
                if (!Ta.hasOwnProperty(i))
                    throw new D("No such environment: " + i,n);
                var s = Ta[i]
                  , {args: l, optArgs: h} = r.parseArguments("\\begin{" + i + "}", s)
                  , m = {
                    mode: r.mode,
                    envName: i,
                    parser: r
                }
                  , c = s.handler(m, l, h);
                r.expect("\\end", !1);
                var p = r.nextToken
                  , u = xr(r.parseFunction(), "environment");
                if (u.name !== i)
                    throw new D("Mismatch: \\begin{" + i + "} matched by \\end{" + u.name + "}",p);
                return c
            }
            return {
                type: "environment",
                mode: r.mode,
                name: i,
                nameGroup: n
            }
        }
    });
    var Ba = (e,t)=>{
        var r = e.font
          , a = t.withFont(r);
        return rr(e.body, a)
    }
      , Na = (e,t)=>{
        var r = e.font
          , a = t.withFont(r);
        return dr(e.body, a)
    }
      , Ca = {
        "\\Bbb": "\\mathbb",
        "\\bold": "\\mathbf",
        "\\frak": "\\mathfrak",
        "\\bm": "\\boldsymbol"
    };
    Ft({
        type: "font",
        names: ["\\mathrm", "\\mathit", "\\mathbf", "\\mathnormal", "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt", "\\Bbb", "\\bold", "\\frak"],
        props: {
            numArgs: 1,
            allowedInArgument: !0
        },
        handler: (e,t)=>{
            var {parser: r, funcName: a} = e
              , n = Ut(t[0])
              , i = a;
            return i in Ca && (i = Ca[i]),
            {
                type: "font",
                mode: r.mode,
                font: i.slice(1),
                body: n
            }
        }
        ,
        htmlBuilder: Ba,
        mathmlBuilder: Na
    }),
    Ft({
        type: "mclass",
        names: ["\\boldsymbol", "\\bm"],
        props: {
            numArgs: 1
        },
        handler: (e,t)=>{
            var {parser: r} = e
              , a = t[0]
              , n = j(a);
            return {
                type: "mclass",
                mode: r.mode,
                mclass: Cr(a),
                body: [{
                    type: "font",
                    mode: r.mode,
                    font: "boldsymbol",
                    body: a
                }],
                isCharacterBox: n
            }
        }
    }),
    Ft({
        type: "font",
        names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
        props: {
            numArgs: 0,
            allowedInText: !0
        },
        handler: (e,t)=>{
            var {parser: r, funcName: a, breakOnTokenText: n} = e
              , {mode: i} = r
              , o = r.parseExpression(!0, n);
            return {
                type: "font",
                mode: i,
                font: "math" + a.slice(1),
                body: {
                    type: "ordgroup",
                    mode: r.mode,
                    body: o
                }
            }
        }
        ,
        htmlBuilder: Ba,
        mathmlBuilder: Na
    });
    var qa = (e,t)=>{
        var r = t;
        return "display" === e ? r = r.id >= se.SCRIPT.id ? r.text() : se.DISPLAY : "text" === e && r.size === se.DISPLAY.size ? r = se.TEXT : "script" === e ? r = se.SCRIPT : "scriptscript" === e && (r = se.SCRIPTSCRIPT),
        r
    }
      , Ia = (e,t)=>{
        var r, a = qa(e.size, t.style), n = a.fracNum(), i = a.fracDen();
        r = t.havingStyle(n);
        var o = rr(e.numer, r, t);
        if (e.continued) {
            var s = 8.5 / t.fontMetrics().ptPerEm
              , l = 3.5 / t.fontMetrics().ptPerEm;
            o.height = o.height < s ? s : o.height,
            o.depth = o.depth < l ? l : o.depth
        }
        r = t.havingStyle(i);
        var h, m, c, p, u, d, g, f, v, b, y = rr(e.denom, r, t);
        if (e.hasBarLine ? (e.barSize ? (m = ze(e.barSize, t),
        h = It.makeLineSpan("frac-line", t, m)) : h = It.makeLineSpan("frac-line", t),
        m = h.height,
        c = h.height) : (h = null,
        m = 0,
        c = t.fontMetrics().defaultRuleThickness),
        a.size === se.DISPLAY.size || "display" === e.size ? (p = t.fontMetrics().num1,
        u = m > 0 ? 3 * c : 7 * c,
        d = t.fontMetrics().denom1) : (m > 0 ? (p = t.fontMetrics().num2,
        u = c) : (p = t.fontMetrics().num3,
        u = 3 * c),
        d = t.fontMetrics().denom2),
        h) {
            var x = t.fontMetrics().axisHeight;
            p - o.depth - (x + .5 * m) < u && (p += u - (p - o.depth - (x + .5 * m))),
            x - .5 * m - (y.height - d) < u && (d += u - (x - .5 * m - (y.height - d))),
            g = It.makeVList({
                positionType: "individualShift",
                children: [{
                    type: "elem",
                    elem: y,
                    shift: d
                }, {
                    type: "elem",
                    elem: h,
                    shift: -(x - .5 * m)
                }, {
                    type: "elem",
                    elem: o,
                    shift: -p
                }]
            }, t)
        } else {
            var w = p - o.depth - (y.height - d);
            w < u && (p += .5 * (u - w),
            d += .5 * (u - w)),
            g = It.makeVList({
                positionType: "individualShift",
                children: [{
                    type: "elem",
                    elem: y,
                    shift: d
                }, {
                    type: "elem",
                    elem: o,
                    shift: -p
                }]
            }, t)
        }
        return r = t.havingStyle(a),
        g.height *= r.sizeMultiplier / t.sizeMultiplier,
        g.depth *= r.sizeMultiplier / t.sizeMultiplier,
        f = a.size === se.DISPLAY.size ? t.fontMetrics().delim1 : a.size === se.SCRIPTSCRIPT.size ? t.havingStyle(se.SCRIPT).fontMetrics().delim2 : t.fontMetrics().delim2,
        v = null == e.leftDelim ? tr(t, ["mopen"]) : sa.customSizedDelim(e.leftDelim, f, !0, t.havingStyle(a), e.mode, ["mopen"]),
        b = e.continued ? It.makeSpan([]) : null == e.rightDelim ? tr(t, ["mclose"]) : sa.customSizedDelim(e.rightDelim, f, !0, t.havingStyle(a), e.mode, ["mclose"]),
        It.makeSpan(["mord"].concat(r.sizingClasses(t)), [v, It.makeSpan(["mfrac"], [g]), b], t)
    }
      , Ra = (e,t)=>{
        var r = new lr.MathNode("mfrac",[dr(e.numer, t), dr(e.denom, t)]);
        if (e.hasBarLine) {
            if (e.barSize) {
                var a = ze(e.barSize, t);
                r.setAttribute("linethickness", Ae(a))
            }
        } else
            r.setAttribute("linethickness", "0px");
        var n = qa(e.size, t.style);
        if (n.size !== t.style.size) {
            r = new lr.MathNode("mstyle",[r]);
            var i = n.size === se.DISPLAY.size ? "true" : "false";
            r.setAttribute("displaystyle", i),
            r.setAttribute("scriptlevel", "0")
        }
        if (null != e.leftDelim || null != e.rightDelim) {
            var o = [];
            if (null != e.leftDelim) {
                var s = new lr.MathNode("mo",[new lr.TextNode(e.leftDelim.replace("\\", ""))]);
                s.setAttribute("fence", "true"),
                o.push(s)
            }
            if (o.push(r),
            null != e.rightDelim) {
                var l = new lr.MathNode("mo",[new lr.TextNode(e.rightDelim.replace("\\", ""))]);
                l.setAttribute("fence", "true"),
                o.push(l)
            }
            return mr(o)
        }
        return r
    }
    ;
    Ft({
        type: "genfrac",
        names: ["\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac", "\\\\bracefrac", "\\\\brackfrac"],
        props: {
            numArgs: 2,
            allowedInArgument: !0
        },
        handler: (e,t)=>{
            var r, {parser: a, funcName: n} = e, i = t[0], o = t[1], s = null, l = null, h = "auto";
            switch (n) {
            case "\\dfrac":
            case "\\frac":
            case "\\tfrac":
                r = !0;
                break;
            case "\\\\atopfrac":
                r = !1;
                break;
            case "\\dbinom":
            case "\\binom":
            case "\\tbinom":
                r = !1,
                s = "(",
                l = ")";
                break;
            case "\\\\bracefrac":
                r = !1,
                s = "\\{",
                l = "\\}";
                break;
            case "\\\\brackfrac":
                r = !1,
                s = "[",
                l = "]";
                break;
            default:
                throw new Error("Unrecognized genfrac command")
            }
            switch (n) {
            case "\\dfrac":
            case "\\dbinom":
                h = "display";
                break;
            case "\\tfrac":
            case "\\tbinom":
                h = "text"
            }
            return {
                type: "genfrac",
                mode: a.mode,
                continued: !1,
                numer: i,
                denom: o,
                hasBarLine: r,
                leftDelim: s,
                rightDelim: l,
                size: h,
                barSize: null
            }
        }
        ,
        htmlBuilder: Ia,
        mathmlBuilder: Ra
    }),
    Ft({
        type: "genfrac",
        names: ["\\cfrac"],
        props: {
            numArgs: 2
        },
        handler: (e,t)=>{
            var {parser: r, funcName: a} = e
              , n = t[0]
              , i = t[1];
            return {
                type: "genfrac",
                mode: r.mode,
                continued: !0,
                numer: n,
                denom: i,
                hasBarLine: !0,
                leftDelim: null,
                rightDelim: null,
                size: "display",
                barSize: null
            }
        }
    }),
    Ft({
        type: "infix",
        names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
        props: {
            numArgs: 0,
            infix: !0
        },
        handler(e) {
            var t, {parser: r, funcName: a, token: n} = e;
            switch (a) {
            case "\\over":
                t = "\\frac";
                break;
            case "\\choose":
                t = "\\binom";
                break;
            case "\\atop":
                t = "\\\\atopfrac";
                break;
            case "\\brace":
                t = "\\\\bracefrac";
                break;
            case "\\brack":
                t = "\\\\brackfrac";
                break;
            default:
                throw new Error("Unrecognized infix genfrac command")
            }
            return {
                type: "infix",
                mode: r.mode,
                replaceWith: t,
                token: n
            }
        }
    });
    var Ha = ["display", "text", "script", "scriptscript"]
      , Oa = function(e) {
        var t = null;
        return e.length > 0 && (t = "." === (t = e) ? null : t),
        t
    };
    Ft({
        type: "genfrac",
        names: ["\\genfrac"],
        props: {
            numArgs: 6,
            allowedInArgument: !0,
            argTypes: ["math", "math", "size", "text", "math", "math"]
        },
        handler(e, t) {
            var r, {parser: a} = e, n = t[4], i = t[5], o = Ut(t[0]), s = "atom" === o.type && "open" === o.family ? Oa(o.text) : null, l = Ut(t[1]), h = "atom" === l.type && "close" === l.family ? Oa(l.text) : null, m = xr(t[2], "size"), c = null;
            r = !!m.isBlank || (c = m.value).number > 0;
            var p = "auto"
              , u = t[3];
            if ("ordgroup" === u.type) {
                if (u.body.length > 0) {
                    var d = xr(u.body[0], "textord");
                    p = Ha[Number(d.text)]
                }
            } else
                u = xr(u, "textord"),
                p = Ha[Number(u.text)];
            return {
                type: "genfrac",
                mode: a.mode,
                numer: n,
                denom: i,
                continued: !1,
                hasBarLine: r,
                barSize: c,
                leftDelim: s,
                rightDelim: h,
                size: p
            }
        },
        htmlBuilder: Ia,
        mathmlBuilder: Ra
    }),
    Ft({
        type: "infix",
        names: ["\\above"],
        props: {
            numArgs: 1,
            argTypes: ["size"],
            infix: !0
        },
        handler(e, t) {
            var {parser: r, funcName: a, token: n} = e;
            return {
                type: "infix",
                mode: r.mode,
                replaceWith: "\\\\abovefrac",
                size: xr(t[0], "size").value,
                token: n
            }
        }
    }),
    Ft({
        type: "genfrac",
        names: ["\\\\abovefrac"],
        props: {
            numArgs: 3,
            argTypes: ["math", "size", "math"]
        },
        handler: (e,t)=>{
            var {parser: r, funcName: a} = e
              , n = t[0]
              , i = function(e) {
                if (!e)
                    throw new Error("Expected non-null, but got " + String(e));
                return e
            }(xr(t[1], "infix").size)
              , o = t[2]
              , s = i.number > 0;
            return {
                type: "genfrac",
                mode: r.mode,
                numer: n,
                denom: o,
                continued: !1,
                hasBarLine: s,
                barSize: i,
                leftDelim: null,
                rightDelim: null,
                size: "auto"
            }
        }
        ,
        htmlBuilder: Ia,
        mathmlBuilder: Ra
    });
    var Ea = (e,t)=>{
        var r, a, n = t.style;
        "supsub" === e.type ? (r = e.sup ? rr(e.sup, t.havingStyle(n.sup()), t) : rr(e.sub, t.havingStyle(n.sub()), t),
        a = xr(e.base, "horizBrace")) : a = xr(e, "horizBrace");
        var i, o = rr(a.base, t.havingBaseStyle(se.DISPLAY)), s = yr(a, t);
        if (a.isOver ? (i = It.makeVList({
            positionType: "firstBaseline",
            children: [{
                type: "elem",
                elem: o
            }, {
                type: "kern",
                size: .1
            }, {
                type: "elem",
                elem: s
            }]
        }, t)).children[0].children[0].children[1].classes.push("svg-align") : (i = It.makeVList({
            positionType: "bottom",
            positionData: o.depth + .1 + s.height,
            children: [{
                type: "elem",
                elem: s
            }, {
                type: "kern",
                size: .1
            }, {
                type: "elem",
                elem: o
            }]
        }, t)).children[0].children[0].children[0].classes.push("svg-align"),
        r) {
            var l = It.makeSpan(["mord", a.isOver ? "mover" : "munder"], [i], t);
            i = a.isOver ? It.makeVList({
                positionType: "firstBaseline",
                children: [{
                    type: "elem",
                    elem: l
                }, {
                    type: "kern",
                    size: .2
                }, {
                    type: "elem",
                    elem: r
                }]
            }, t) : It.makeVList({
                positionType: "bottom",
                positionData: l.depth + .2 + r.height + r.depth,
                children: [{
                    type: "elem",
                    elem: r
                }, {
                    type: "kern",
                    size: .2
                }, {
                    type: "elem",
                    elem: l
                }]
            }, t)
        }
        return It.makeSpan(["mord", a.isOver ? "mover" : "munder"], [i], t)
    }
    ;
    Ft({
        type: "horizBrace",
        names: ["\\overbrace", "\\underbrace"],
        props: {
            numArgs: 1
        },
        handler(e, t) {
            var {parser: r, funcName: a} = e;
            return {
                type: "horizBrace",
                mode: r.mode,
                label: a,
                isOver: /^\\over/.test(a),
                base: t[0]
            }
        },
        htmlBuilder: Ea,
        mathmlBuilder: (e,t)=>{
            var r = br(e.label);
            return new lr.MathNode(e.isOver ? "mover" : "munder",[dr(e.base, t), r])
        }
    }),
    Ft({
        type: "href",
        names: ["\\href"],
        props: {
            numArgs: 2,
            argTypes: ["url", "original"],
            allowedInText: !0
        },
        handler: (e,t)=>{
            var {parser: r} = e
              , a = t[1]
              , n = xr(t[0], "url").url;
            return r.settings.isTrusted({
                command: "\\href",
                url: n
            }) ? {
                type: "href",
                mode: r.mode,
                href: n,
                body: Yt(a)
            } : r.formatUnsupportedCmd("\\href")
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = Zt(e.body, t, !1);
            return It.makeAnchor(e.href, [], r, t)
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = ur(e.body, t);
            return r instanceof or || (r = new or("mrow",[r])),
            r.setAttribute("href", e.href),
            r
        }
    }),
    Ft({
        type: "href",
        names: ["\\url"],
        props: {
            numArgs: 1,
            argTypes: ["url"],
            allowedInText: !0
        },
        handler: (e,t)=>{
            var {parser: r} = e
              , a = xr(t[0], "url").url;
            if (!r.settings.isTrusted({
                command: "\\url",
                url: a
            }))
                return r.formatUnsupportedCmd("\\url");
            for (var n = [], i = 0; i < a.length; i++) {
                var o = a[i];
                "~" === o && (o = "\\textasciitilde"),
                n.push({
                    type: "textord",
                    mode: "text",
                    text: o
                })
            }
            var s = {
                type: "text",
                mode: r.mode,
                font: "\\texttt",
                body: n
            };
            return {
                type: "href",
                mode: r.mode,
                href: a,
                body: Yt(s)
            }
        }
    }),
    Ft({
        type: "hbox",
        names: ["\\hbox"],
        props: {
            numArgs: 1,
            argTypes: ["text"],
            allowedInText: !0,
            primitive: !0
        },
        handler(e, t) {
            var {parser: r} = e;
            return {
                type: "hbox",
                mode: r.mode,
                body: Yt(t[0])
            }
        },
        htmlBuilder(e, t) {
            var r = Zt(e.body, t, !1);
            return It.makeFragment(r)
        },
        mathmlBuilder: (e,t)=>new lr.MathNode("mrow",pr(e.body, t))
    }),
    Ft({
        type: "html",
        names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
        props: {
            numArgs: 2,
            argTypes: ["raw", "original"],
            allowedInText: !0
        },
        handler: (e,t)=>{
            var r, {parser: a, funcName: n, token: i} = e, o = xr(t[0], "raw").string, s = t[1];
            a.settings.strict && a.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
            var l = {};
            switch (n) {
            case "\\htmlClass":
                l.class = o,
                r = {
                    command: "\\htmlClass",
                    class: o
                };
                break;
            case "\\htmlId":
                l.id = o,
                r = {
                    command: "\\htmlId",
                    id: o
                };
                break;
            case "\\htmlStyle":
                l.style = o,
                r = {
                    command: "\\htmlStyle",
                    style: o
                };
                break;
            case "\\htmlData":
                for (var h = o.split(","), m = 0; m < h.length; m++) {
                    var c = h[m].split("=");
                    if (2 !== c.length)
                        throw new D("Error parsing key-value for \\htmlData");
                    l["data-" + c[0].trim()] = c[1].trim()
                }
                r = {
                    command: "\\htmlData",
                    attributes: l
                };
                break;
            default:
                throw new Error("Unrecognized html command")
            }
            return a.settings.isTrusted(r) ? {
                type: "html",
                mode: a.mode,
                attributes: l,
                body: Yt(s)
            } : a.formatUnsupportedCmd(n)
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = Zt(e.body, t, !1)
              , a = ["enclosing"];
            e.attributes.class && a.push(...e.attributes.class.trim().split(/\s+/));
            var n = It.makeSpan(a, r, t);
            for (var i in e.attributes)
                "class" !== i && e.attributes.hasOwnProperty(i) && n.setAttribute(i, e.attributes[i]);
            return n
        }
        ,
        mathmlBuilder: (e,t)=>ur(e.body, t)
    }),
    Ft({
        type: "htmlmathml",
        names: ["\\html@mathml"],
        props: {
            numArgs: 2,
            allowedInText: !0
        },
        handler: (e,t)=>{
            var {parser: r} = e;
            return {
                type: "htmlmathml",
                mode: r.mode,
                html: Yt(t[0]),
                mathml: Yt(t[1])
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = Zt(e.html, t, !1);
            return It.makeFragment(r)
        }
        ,
        mathmlBuilder: (e,t)=>ur(e.mathml, t)
    });
    var La = function(e) {
        if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e))
            return {
                number: +e,
                unit: "bp"
            };
        var t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
        if (!t)
            throw new D("Invalid size: '" + e + "' in \\includegraphics");
        var r = {
            number: +(t[1] + t[2]),
            unit: t[3]
        };
        if (!Me(r))
            throw new D("Invalid unit: '" + r.unit + "' in \\includegraphics.");
        return r
    };
    Ft({
        type: "includegraphics",
        names: ["\\includegraphics"],
        props: {
            numArgs: 1,
            numOptionalArgs: 1,
            argTypes: ["raw", "url"],
            allowedInText: !1
        },
        handler: (e,t,r)=>{
            var {parser: a} = e
              , n = {
                number: 0,
                unit: "em"
            }
              , i = {
                number: .9,
                unit: "em"
            }
              , o = {
                number: 0,
                unit: "em"
            }
              , s = "";
            if (r[0])
                for (var l = xr(r[0], "raw").string.split(","), h = 0; h < l.length; h++) {
                    var m = l[h].split("=");
                    if (2 === m.length) {
                        var c = m[1].trim();
                        switch (m[0].trim()) {
                        case "alt":
                            s = c;
                            break;
                        case "width":
                            n = La(c);
                            break;
                        case "height":
                            i = La(c);
                            break;
                        case "totalheight":
                            o = La(c);
                            break;
                        default:
                            throw new D("Invalid key: '" + m[0] + "' in \\includegraphics.")
                        }
                    }
                }
            var p = xr(t[0], "url").url;
            return "" === s && (s = (s = (s = p).replace(/^.*[\\/]/, "")).substring(0, s.lastIndexOf("."))),
            a.settings.isTrusted({
                command: "\\includegraphics",
                url: p
            }) ? {
                type: "includegraphics",
                mode: a.mode,
                alt: s,
                width: n,
                height: i,
                totalheight: o,
                src: p
            } : a.formatUnsupportedCmd("\\includegraphics")
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = ze(e.height, t)
              , a = 0;
            e.totalheight.number > 0 && (a = ze(e.totalheight, t) - r);
            var n = 0;
            e.width.number > 0 && (n = ze(e.width, t));
            var i = {
                height: Ae(r + a)
            };
            n > 0 && (i.width = Ae(n)),
            a > 0 && (i.verticalAlign = Ae(-a));
            var o = new Re(e.src,e.alt,i);
            return o.height = r,
            o.depth = a,
            o
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = new lr.MathNode("mglyph",[]);
            r.setAttribute("alt", e.alt);
            var a = ze(e.height, t)
              , n = 0;
            if (e.totalheight.number > 0 && (n = ze(e.totalheight, t) - a,
            r.setAttribute("valign", Ae(-n))),
            r.setAttribute("height", Ae(a + n)),
            e.width.number > 0) {
                var i = ze(e.width, t);
                r.setAttribute("width", Ae(i))
            }
            return r.setAttribute("src", e.src),
            r
        }
    }),
    Ft({
        type: "kern",
        names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
        props: {
            numArgs: 1,
            argTypes: ["size"],
            primitive: !0,
            allowedInText: !0
        },
        handler(e, t) {
            var {parser: r, funcName: a} = e
              , n = xr(t[0], "size");
            if (r.settings.strict) {
                var i = "m" === a[1]
                  , o = "mu" === n.value.unit;
                i ? (o || r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " supports only mu units, not " + n.value.unit + " units"),
                "math" !== r.mode && r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " works only in math mode")) : o && r.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " doesn't support mu units")
            }
            return {
                type: "kern",
                mode: r.mode,
                dimension: n.value
            }
        },
        htmlBuilder: (e,t)=>It.makeGlue(e.dimension, t),
        mathmlBuilder(e, t) {
            var r = ze(e.dimension, t);
            return new lr.SpaceNode(r)
        }
    }),
    Ft({
        type: "lap",
        names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
        props: {
            numArgs: 1,
            allowedInText: !0
        },
        handler: (e,t)=>{
            var {parser: r, funcName: a} = e
              , n = t[0];
            return {
                type: "lap",
                mode: r.mode,
                alignment: a.slice(5),
                body: n
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r;
            "clap" === e.alignment ? (r = It.makeSpan([], [rr(e.body, t)]),
            r = It.makeSpan(["inner"], [r], t)) : r = It.makeSpan(["inner"], [rr(e.body, t)]);
            var a = It.makeSpan(["fix"], [])
              , n = It.makeSpan([e.alignment], [r, a], t)
              , i = It.makeSpan(["strut"]);
            return i.style.height = Ae(n.height + n.depth),
            n.depth && (i.style.verticalAlign = Ae(-n.depth)),
            n.children.unshift(i),
            n = It.makeSpan(["thinbox"], [n], t),
            It.makeSpan(["mord", "vbox"], [n], t)
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = new lr.MathNode("mpadded",[dr(e.body, t)]);
            if ("rlap" !== e.alignment) {
                var a = "llap" === e.alignment ? "-1" : "-0.5";
                r.setAttribute("lspace", a + "width")
            }
            return r.setAttribute("width", "0px"),
            r
        }
    }),
    Ft({
        type: "styling",
        names: ["\\(", "$"],
        props: {
            numArgs: 0,
            allowedInText: !0,
            allowedInMath: !1
        },
        handler(e, t) {
            var {funcName: r, parser: a} = e
              , n = a.mode;
            a.switchMode("math");
            var i = "\\(" === r ? "\\)" : "$"
              , o = a.parseExpression(!1, i);
            return a.expect(i),
            a.switchMode(n),
            {
                type: "styling",
                mode: a.mode,
                style: "text",
                body: o
            }
        }
    }),
    Ft({
        type: "text",
        names: ["\\)", "\\]"],
        props: {
            numArgs: 0,
            allowedInText: !0,
            allowedInMath: !1
        },
        handler(e, t) {
            throw new D("Mismatched " + e.funcName)
        }
    });
    var Da = (e,t)=>{
        switch (t.style.size) {
        case se.DISPLAY.size:
            return e.display;
        case se.TEXT.size:
            return e.text;
        case se.SCRIPT.size:
            return e.script;
        case se.SCRIPTSCRIPT.size:
            return e.scriptscript;
        default:
            return e.text
        }
    }
    ;
    Ft({
        type: "mathchoice",
        names: ["\\mathchoice"],
        props: {
            numArgs: 4,
            primitive: !0
        },
        handler: (e,t)=>{
            var {parser: r} = e;
            return {
                type: "mathchoice",
                mode: r.mode,
                display: Yt(t[0]),
                text: Yt(t[1]),
                script: Yt(t[2]),
                scriptscript: Yt(t[3])
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = Da(e, t)
              , a = Zt(r, t, !1);
            return It.makeFragment(a)
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = Da(e, t);
            return ur(r, t)
        }
    });
    var Pa = (e,t,r,a,n,i,o)=>{
        e = It.makeSpan([], [e]);
        var s, l, h, m = r && j(r);
        if (t) {
            var c = rr(t, a.havingStyle(n.sup()), a);
            l = {
                elem: c,
                kern: Math.max(a.fontMetrics().bigOpSpacing1, a.fontMetrics().bigOpSpacing3 - c.depth)
            }
        }
        if (r) {
            var p = rr(r, a.havingStyle(n.sub()), a);
            s = {
                elem: p,
                kern: Math.max(a.fontMetrics().bigOpSpacing2, a.fontMetrics().bigOpSpacing4 - p.height)
            }
        }
        if (l && s) {
            var u = a.fontMetrics().bigOpSpacing5 + s.elem.height + s.elem.depth + s.kern + e.depth + o;
            h = It.makeVList({
                positionType: "bottom",
                positionData: u,
                children: [{
                    type: "kern",
                    size: a.fontMetrics().bigOpSpacing5
                }, {
                    type: "elem",
                    elem: s.elem,
                    marginLeft: Ae(-i)
                }, {
                    type: "kern",
                    size: s.kern
                }, {
                    type: "elem",
                    elem: e
                }, {
                    type: "kern",
                    size: l.kern
                }, {
                    type: "elem",
                    elem: l.elem,
                    marginLeft: Ae(i)
                }, {
                    type: "kern",
                    size: a.fontMetrics().bigOpSpacing5
                }]
            }, a)
        } else if (s) {
            var d = e.height - o;
            h = It.makeVList({
                positionType: "top",
                positionData: d,
                children: [{
                    type: "kern",
                    size: a.fontMetrics().bigOpSpacing5
                }, {
                    type: "elem",
                    elem: s.elem,
                    marginLeft: Ae(-i)
                }, {
                    type: "kern",
                    size: s.kern
                }, {
                    type: "elem",
                    elem: e
                }]
            }, a)
        } else {
            if (!l)
                return e;
            var g = e.depth + o;
            h = It.makeVList({
                positionType: "bottom",
                positionData: g,
                children: [{
                    type: "elem",
                    elem: e
                }, {
                    type: "kern",
                    size: l.kern
                }, {
                    type: "elem",
                    elem: l.elem,
                    marginLeft: Ae(i)
                }, {
                    type: "kern",
                    size: a.fontMetrics().bigOpSpacing5
                }]
            }, a)
        }
        var f = [h];
        if (s && 0 !== i && !m) {
            var v = It.makeSpan(["mspace"], [], a);
            v.style.marginRight = Ae(i),
            f.unshift(v)
        }
        return It.makeSpan(["mop", "op-limits"], f, a)
    }
      , Va = ["\\smallint"]
      , Fa = (e,t)=>{
        var r, a, n, i = !1;
        "supsub" === e.type ? (r = e.sup,
        a = e.sub,
        n = xr(e.base, "op"),
        i = !0) : n = xr(e, "op");
        var o, s = t.style, l = !1;
        if (s.size === se.DISPLAY.size && n.symbol && !U(Va, n.name) && (l = !0),
        n.symbol) {
            var h = l ? "Size2-Regular" : "Size1-Regular"
              , m = "";
            if ("\\oiint" !== n.name && "\\oiiint" !== n.name || (m = n.name.slice(1),
            n.name = "oiint" === m ? "\\iint" : "\\iiint"),
            o = It.makeSymbol(n.name, h, "math", t, ["mop", "op-symbol", l ? "large-op" : "small-op"]),
            m.length > 0) {
                var c = o.italic
                  , p = It.staticSvg(m + "Size" + (l ? "2" : "1"), t);
                o = It.makeVList({
                    positionType: "individualShift",
                    children: [{
                        type: "elem",
                        elem: o,
                        shift: 0
                    }, {
                        type: "elem",
                        elem: p,
                        shift: l ? .08 : 0
                    }]
                }, t),
                n.name = "\\" + m,
                o.classes.unshift("mop"),
                o.italic = c
            }
        } else if (n.body) {
            var u = Zt(n.body, t, !0);
            1 === u.length && u[0]instanceof Oe ? (o = u[0]).classes[0] = "mop" : o = It.makeSpan(["mop"], u, t)
        } else {
            for (var d = [], g = 1; g < n.name.length; g++)
                d.push(It.mathsym(n.name[g], n.mode, t));
            o = It.makeSpan(["mop"], d, t)
        }
        var f = 0
          , v = 0;
        return (o instanceof Oe || "\\oiint" === n.name || "\\oiiint" === n.name) && !n.suppressBaseShift && (f = (o.height - o.depth) / 2 - t.fontMetrics().axisHeight,
        v = o.italic),
        i ? Pa(o, r, a, t, s, v, f) : (f && (o.style.position = "relative",
        o.style.top = Ae(f)),
        o)
    }
      , Ga = (e,t)=>{
        var r;
        if (e.symbol)
            r = new or("mo",[hr(e.name, e.mode)]),
            U(Va, e.name) && r.setAttribute("largeop", "false");
        else if (e.body)
            r = new or("mo",pr(e.body, t));
        else {
            r = new or("mi",[new sr(e.name.slice(1))]);
            var a = new or("mo",[hr("\u2061", "text")]);
            r = e.parentIsSupSub ? new or("mrow",[r, a]) : ir([r, a])
        }
        return r
    }
      , Ua = {
        "\u220f": "\\prod",
        "\u2210": "\\coprod",
        "\u2211": "\\sum",
        "\u22c0": "\\bigwedge",
        "\u22c1": "\\bigvee",
        "\u22c2": "\\bigcap",
        "\u22c3": "\\bigcup",
        "\u2a00": "\\bigodot",
        "\u2a01": "\\bigoplus",
        "\u2a02": "\\bigotimes",
        "\u2a04": "\\biguplus",
        "\u2a06": "\\bigsqcup"
    };
    Ft({
        type: "op",
        names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "\u220f", "\u2210", "\u2211", "\u22c0", "\u22c1", "\u22c2", "\u22c3", "\u2a00", "\u2a01", "\u2a02", "\u2a04", "\u2a06"],
        props: {
            numArgs: 0
        },
        handler: (e,t)=>{
            var {parser: r, funcName: a} = e
              , n = a;
            return 1 === n.length && (n = Ua[n]),
            {
                type: "op",
                mode: r.mode,
                limits: !0,
                parentIsSupSub: !1,
                symbol: !0,
                name: n
            }
        }
        ,
        htmlBuilder: Fa,
        mathmlBuilder: Ga
    }),
    Ft({
        type: "op",
        names: ["\\mathop"],
        props: {
            numArgs: 1,
            primitive: !0
        },
        handler: (e,t)=>{
            var {parser: r} = e
              , a = t[0];
            return {
                type: "op",
                mode: r.mode,
                limits: !1,
                parentIsSupSub: !1,
                symbol: !1,
                body: Yt(a)
            }
        }
        ,
        htmlBuilder: Fa,
        mathmlBuilder: Ga
    });
    var Ya = {
        "\u222b": "\\int",
        "\u222c": "\\iint",
        "\u222d": "\\iiint",
        "\u222e": "\\oint",
        "\u222f": "\\oiint",
        "\u2230": "\\oiiint"
    };
    Ft({
        type: "op",
        names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
        props: {
            numArgs: 0
        },
        handler(e) {
            var {parser: t, funcName: r} = e;
            return {
                type: "op",
                mode: t.mode,
                limits: !1,
                parentIsSupSub: !1,
                symbol: !1,
                name: r
            }
        },
        htmlBuilder: Fa,
        mathmlBuilder: Ga
    }),
    Ft({
        type: "op",
        names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
        props: {
            numArgs: 0
        },
        handler(e) {
            var {parser: t, funcName: r} = e;
            return {
                type: "op",
                mode: t.mode,
                limits: !0,
                parentIsSupSub: !1,
                symbol: !1,
                name: r
            }
        },
        htmlBuilder: Fa,
        mathmlBuilder: Ga
    }),
    Ft({
        type: "op",
        names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "\u222b", "\u222c", "\u222d", "\u222e", "\u222f", "\u2230"],
        props: {
            numArgs: 0
        },
        handler(e) {
            var {parser: t, funcName: r} = e
              , a = r;
            return 1 === a.length && (a = Ya[a]),
            {
                type: "op",
                mode: t.mode,
                limits: !1,
                parentIsSupSub: !1,
                symbol: !0,
                name: a
            }
        },
        htmlBuilder: Fa,
        mathmlBuilder: Ga
    });
    var Wa = (e,t)=>{
        var r, a, n, i, o = !1;
        if ("supsub" === e.type ? (r = e.sup,
        a = e.sub,
        n = xr(e.base, "operatorname"),
        o = !0) : n = xr(e, "operatorname"),
        n.body.length > 0) {
            for (var s = n.body.map((e=>{
                var t = e.text;
                return "string" == typeof t ? {
                    type: "textord",
                    mode: e.mode,
                    text: t
                } : e
            }
            )), l = Zt(s, t.withFont("mathrm"), !0), h = 0; h < l.length; h++) {
                var m = l[h];
                m instanceof Oe && (m.text = m.text.replace(/\u2212/, "-").replace(/\u2217/, "*"))
            }
            i = It.makeSpan(["mop"], l, t)
        } else
            i = It.makeSpan(["mop"], [], t);
        return o ? Pa(i, r, a, t, t.style, 0, 0) : i
    }
    ;
    function Xa(e, t, r) {
        for (var a = Zt(e, t, !1), n = t.sizeMultiplier / r.sizeMultiplier, i = 0; i < a.length; i++) {
            var o = a[i].classes.indexOf("sizing");
            o < 0 ? Array.prototype.push.apply(a[i].classes, t.sizingClasses(r)) : a[i].classes[o + 1] === "reset-size" + t.size && (a[i].classes[o + 1] = "reset-size" + r.size),
            a[i].height *= n,
            a[i].depth *= n
        }
        return It.makeFragment(a)
    }
    Ft({
        type: "operatorname",
        names: ["\\operatorname@", "\\operatornamewithlimits"],
        props: {
            numArgs: 1
        },
        handler: (e,t)=>{
            var {parser: r, funcName: a} = e
              , n = t[0];
            return {
                type: "operatorname",
                mode: r.mode,
                body: Yt(n),
                alwaysHandleSupSub: "\\operatornamewithlimits" === a,
                limits: !1,
                parentIsSupSub: !1
            }
        }
        ,
        htmlBuilder: Wa,
        mathmlBuilder: (e,t)=>{
            for (var r = pr(e.body, t.withFont("mathrm")), a = !0, n = 0; n < r.length; n++) {
                var i = r[n];
                if (i instanceof lr.SpaceNode)
                    ;
                else if (i instanceof lr.MathNode)
                    switch (i.type) {
                    case "mi":
                    case "mn":
                    case "ms":
                    case "mspace":
                    case "mtext":
                        break;
                    case "mo":
                        var o = i.children[0];
                        1 === i.children.length && o instanceof lr.TextNode ? o.text = o.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : a = !1;
                        break;
                    default:
                        a = !1
                    }
                else
                    a = !1
            }
            if (a) {
                var s = r.map((e=>e.toText())).join("");
                r = [new lr.TextNode(s)]
            }
            var l = new lr.MathNode("mi",r);
            l.setAttribute("mathvariant", "normal");
            var h = new lr.MathNode("mo",[hr("\u2061", "text")]);
            return e.parentIsSupSub ? new lr.MathNode("mrow",[l, h]) : lr.newDocumentFragment([l, h])
        }
    }),
    va("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@"),
    Gt({
        type: "ordgroup",
        htmlBuilder: (e,t)=>e.semisimple ? It.makeFragment(Zt(e.body, t, !1)) : It.makeSpan(["mord"], Zt(e.body, t, !0), t),
        mathmlBuilder: (e,t)=>ur(e.body, t, !0)
    }),
    Ft({
        type: "overline",
        names: ["\\overline"],
        props: {
            numArgs: 1
        },
        handler(e, t) {
            var {parser: r} = e
              , a = t[0];
            return {
                type: "overline",
                mode: r.mode,
                body: a
            }
        },
        htmlBuilder(e, t) {
            var r = rr(e.body, t.havingCrampedStyle())
              , a = It.makeLineSpan("overline-line", t)
              , n = t.fontMetrics().defaultRuleThickness
              , i = It.makeVList({
                positionType: "firstBaseline",
                children: [{
                    type: "elem",
                    elem: r
                }, {
                    type: "kern",
                    size: 3 * n
                }, {
                    type: "elem",
                    elem: a
                }, {
                    type: "kern",
                    size: n
                }]
            }, t);
            return It.makeSpan(["mord", "overline"], [i], t)
        },
        mathmlBuilder(e, t) {
            var r = new lr.MathNode("mo",[new lr.TextNode("\u203e")]);
            r.setAttribute("stretchy", "true");
            var a = new lr.MathNode("mover",[dr(e.body, t), r]);
            return a.setAttribute("accent", "true"),
            a
        }
    }),
    Ft({
        type: "phantom",
        names: ["\\phantom"],
        props: {
            numArgs: 1,
            allowedInText: !0
        },
        handler: (e,t)=>{
            var {parser: r} = e
              , a = t[0];
            return {
                type: "phantom",
                mode: r.mode,
                body: Yt(a)
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = Zt(e.body, t.withPhantom(), !1);
            return It.makeFragment(r)
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = pr(e.body, t);
            return new lr.MathNode("mphantom",r)
        }
    }),
    Ft({
        type: "hphantom",
        names: ["\\hphantom"],
        props: {
            numArgs: 1,
            allowedInText: !0
        },
        handler: (e,t)=>{
            var {parser: r} = e
              , a = t[0];
            return {
                type: "hphantom",
                mode: r.mode,
                body: a
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = It.makeSpan([], [rr(e.body, t.withPhantom())]);
            if (r.height = 0,
            r.depth = 0,
            r.children)
                for (var a = 0; a < r.children.length; a++)
                    r.children[a].height = 0,
                    r.children[a].depth = 0;
            return r = It.makeVList({
                positionType: "firstBaseline",
                children: [{
                    type: "elem",
                    elem: r
                }]
            }, t),
            It.makeSpan(["mord"], [r], t)
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = pr(Yt(e.body), t)
              , a = new lr.MathNode("mphantom",r)
              , n = new lr.MathNode("mpadded",[a]);
            return n.setAttribute("height", "0px"),
            n.setAttribute("depth", "0px"),
            n
        }
    }),
    Ft({
        type: "vphantom",
        names: ["\\vphantom"],
        props: {
            numArgs: 1,
            allowedInText: !0
        },
        handler: (e,t)=>{
            var {parser: r} = e
              , a = t[0];
            return {
                type: "vphantom",
                mode: r.mode,
                body: a
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = It.makeSpan(["inner"], [rr(e.body, t.withPhantom())])
              , a = It.makeSpan(["fix"], []);
            return It.makeSpan(["mord", "rlap"], [r, a], t)
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = pr(Yt(e.body), t)
              , a = new lr.MathNode("mphantom",r)
              , n = new lr.MathNode("mpadded",[a]);
            return n.setAttribute("width", "0px"),
            n
        }
    }),
    Ft({
        type: "raisebox",
        names: ["\\raisebox"],
        props: {
            numArgs: 2,
            argTypes: ["size", "hbox"],
            allowedInText: !0
        },
        handler(e, t) {
            var {parser: r} = e
              , a = xr(t[0], "size").value
              , n = t[1];
            return {
                type: "raisebox",
                mode: r.mode,
                dy: a,
                body: n
            }
        },
        htmlBuilder(e, t) {
            var r = rr(e.body, t)
              , a = ze(e.dy, t);
            return It.makeVList({
                positionType: "shift",
                positionData: -a,
                children: [{
                    type: "elem",
                    elem: r
                }]
            }, t)
        },
        mathmlBuilder(e, t) {
            var r = new lr.MathNode("mpadded",[dr(e.body, t)])
              , a = e.dy.number + e.dy.unit;
            return r.setAttribute("voffset", a),
            r
        }
    }),
    Ft({
        type: "internal",
        names: ["\\relax"],
        props: {
            numArgs: 0,
            allowedInText: !0
        },
        handler(e) {
            var {parser: t} = e;
            return {
                type: "internal",
                mode: t.mode
            }
        }
    }),
    Ft({
        type: "rule",
        names: ["\\rule"],
        props: {
            numArgs: 2,
            numOptionalArgs: 1,
            argTypes: ["size", "size", "size"]
        },
        handler(e, t, r) {
            var {parser: a} = e
              , n = r[0]
              , i = xr(t[0], "size")
              , o = xr(t[1], "size");
            return {
                type: "rule",
                mode: a.mode,
                shift: n && xr(n, "size").value,
                width: i.value,
                height: o.value
            }
        },
        htmlBuilder(e, t) {
            var r = It.makeSpan(["mord", "rule"], [], t)
              , a = ze(e.width, t)
              , n = ze(e.height, t)
              , i = e.shift ? ze(e.shift, t) : 0;
            return r.style.borderRightWidth = Ae(a),
            r.style.borderTopWidth = Ae(n),
            r.style.bottom = Ae(i),
            r.width = a,
            r.height = n + i,
            r.depth = -i,
            r.maxFontSize = 1.125 * n * t.sizeMultiplier,
            r
        },
        mathmlBuilder(e, t) {
            var r = ze(e.width, t)
              , a = ze(e.height, t)
              , n = e.shift ? ze(e.shift, t) : 0
              , i = t.color && t.getColor() || "black"
              , o = new lr.MathNode("mspace");
            o.setAttribute("mathbackground", i),
            o.setAttribute("width", Ae(r)),
            o.setAttribute("height", Ae(a));
            var s = new lr.MathNode("mpadded",[o]);
            return n >= 0 ? s.setAttribute("height", Ae(n)) : (s.setAttribute("height", Ae(n)),
            s.setAttribute("depth", Ae(-n))),
            s.setAttribute("voffset", Ae(n)),
            s
        }
    });
    var $a = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];
    Ft({
        type: "sizing",
        names: $a,
        props: {
            numArgs: 0,
            allowedInText: !0
        },
        handler: (e,t)=>{
            var {breakOnTokenText: r, funcName: a, parser: n} = e
              , i = n.parseExpression(!1, r);
            return {
                type: "sizing",
                mode: n.mode,
                size: $a.indexOf(a) + 1,
                body: i
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = t.havingSize(e.size);
            return Xa(e.body, r, t)
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = t.havingSize(e.size)
              , a = pr(e.body, r)
              , n = new lr.MathNode("mstyle",a);
            return n.setAttribute("mathsize", Ae(r.sizeMultiplier)),
            n
        }
    }),
    Ft({
        type: "smash",
        names: ["\\smash"],
        props: {
            numArgs: 1,
            numOptionalArgs: 1,
            allowedInText: !0
        },
        handler: (e,t,r)=>{
            var {parser: a} = e
              , n = !1
              , i = !1
              , o = r[0] && xr(r[0], "ordgroup");
            if (o)
                for (var s = "", l = 0; l < o.body.length; ++l)
                    if ("t" === (s = o.body[l].text))
                        n = !0;
                    else {
                        if ("b" !== s) {
                            n = !1,
                            i = !1;
                            break
                        }
                        i = !0
                    }
            else
                n = !0,
                i = !0;
            var h = t[0];
            return {
                type: "smash",
                mode: a.mode,
                body: h,
                smashHeight: n,
                smashDepth: i
            }
        }
        ,
        htmlBuilder: (e,t)=>{
            var r = It.makeSpan([], [rr(e.body, t)]);
            if (!e.smashHeight && !e.smashDepth)
                return r;
            if (e.smashHeight && (r.height = 0,
            r.children))
                for (var a = 0; a < r.children.length; a++)
                    r.children[a].height = 0;
            if (e.smashDepth && (r.depth = 0,
            r.children))
                for (var n = 0; n < r.children.length; n++)
                    r.children[n].depth = 0;
            var i = It.makeVList({
                positionType: "firstBaseline",
                children: [{
                    type: "elem",
                    elem: r
                }]
            }, t);
            return It.makeSpan(["mord"], [i], t)
        }
        ,
        mathmlBuilder: (e,t)=>{
            var r = new lr.MathNode("mpadded",[dr(e.body, t)]);
            return e.smashHeight && r.setAttribute("height", "0px"),
            e.smashDepth && r.setAttribute("depth", "0px"),
            r
        }
    }),
    Ft({
        type: "sqrt",
        names: ["\\sqrt"],
        props: {
            numArgs: 1,
            numOptionalArgs: 1
        },
        handler(e, t, r) {
            var {parser: a} = e
              , n = r[0]
              , i = t[0];
            return {
                type: "sqrt",
                mode: a.mode,
                body: i,
                index: n
            }
        },
        htmlBuilder(e, t) {
            var r = rr(e.body, t.havingCrampedStyle());
            0 === r.height && (r.height = t.fontMetrics().xHeight),
            r = It.wrapFragment(r, t);
            var a = t.fontMetrics().defaultRuleThickness
              , n = a;
            t.style.id < se.TEXT.id && (n = t.fontMetrics().xHeight);
            var i = a + n / 4
              , o = r.height + r.depth + i + a
              , {span: s, ruleWidth: l, advanceWidth: h} = sa.sqrtImage(o, t)
              , m = s.height - l;
            m > r.height + r.depth + i && (i = (i + m - r.height - r.depth) / 2);
            var c = s.height - r.height - i - l;
            r.style.paddingLeft = Ae(h);
            var p = It.makeVList({
                positionType: "firstBaseline",
                children: [{
                    type: "elem",
                    elem: r,
                    wrapperClasses: ["svg-align"]
                }, {
                    type: "kern",
                    size: -(r.height + c)
                }, {
                    type: "elem",
                    elem: s
                }, {
                    type: "kern",
                    size: l
                }]
            }, t);
            if (e.index) {
                var u = t.havingStyle(se.SCRIPTSCRIPT)
                  , d = rr(e.index, u, t)
                  , g = .6 * (p.height - p.depth)
                  , f = It.makeVList({
                    positionType: "shift",
                    positionData: -g,
                    children: [{
                        type: "elem",
                        elem: d
                    }]
                }, t)
                  , v = It.makeSpan(["root"], [f]);
                return It.makeSpan(["mord", "sqrt"], [v, p], t)
            }
            return It.makeSpan(["mord", "sqrt"], [p], t)
        },
        mathmlBuilder(e, t) {
            var {body: r, index: a} = e;
            return a ? new lr.MathNode("mroot",[dr(r, t), dr(a, t)]) : new lr.MathNode("msqrt",[dr(r, t)])
        }
    });
    var ja = {
        display: se.DISPLAY,
        text: se.TEXT,
        script: se.SCRIPT,
        scriptscript: se.SCRIPTSCRIPT
    };
    Ft({
        type: "styling",
        names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
        props: {
            numArgs: 0,
            allowedInText: !0,
            primitive: !0
        },
        handler(e, t) {
            var {breakOnTokenText: r, funcName: a, parser: n} = e
              , i = n.parseExpression(!0, r)
              , o = a.slice(1, a.length - 5);
            return {
                type: "styling",
                mode: n.mode,
                style: o,
                body: i
            }
        },
        htmlBuilder(e, t) {
            var r = ja[e.style]
              , a = t.havingStyle(r).withFont("");
            return Xa(e.body, a, t)
        },
        mathmlBuilder(e, t) {
            var r = ja[e.style]
              , a = t.havingStyle(r)
              , n = pr(e.body, a)
              , i = new lr.MathNode("mstyle",n)
              , o = {
                display: ["0", "true"],
                text: ["0", "false"],
                script: ["1", "false"],
                scriptscript: ["2", "false"]
            }[e.style];
            return i.setAttribute("scriptlevel", o[0]),
            i.setAttribute("displaystyle", o[1]),
            i
        }
    }),
    Gt({
        type: "supsub",
        htmlBuilder(e, t) {
            var r = function(e, t) {
                var r = e.base;
                return r ? "op" === r.type ? r.limits && (t.style.size === se.DISPLAY.size || r.alwaysHandleSupSub) ? Fa : null : "operatorname" === r.type ? r.alwaysHandleSupSub && (t.style.size === se.DISPLAY.size || r.limits) ? Wa : null : "accent" === r.type ? j(r.base) ? Sr : null : "horizBrace" === r.type && !e.sub === r.isOver ? Ea : null : null
            }(e, t);
            if (r)
                return r(e, t);
            var a, n, i, {base: o, sup: s, sub: l} = e, h = rr(o, t), m = t.fontMetrics(), c = 0, p = 0, u = o && j(o);
            if (s) {
                var d = t.havingStyle(t.style.sup());
                a = rr(s, d, t),
                u || (c = h.height - d.fontMetrics().supDrop * d.sizeMultiplier / t.sizeMultiplier)
            }
            if (l) {
                var g = t.havingStyle(t.style.sub());
                n = rr(l, g, t),
                u || (p = h.depth + g.fontMetrics().subDrop * g.sizeMultiplier / t.sizeMultiplier)
            }
            i = t.style === se.DISPLAY ? m.sup1 : t.style.cramped ? m.sup3 : m.sup2;
            var f, v = t.sizeMultiplier, b = Ae(.5 / m.ptPerEm / v), y = null;
            if (n) {
                var x = e.base && "op" === e.base.type && e.base.name && ("\\oiint" === e.base.name || "\\oiiint" === e.base.name);
                (h instanceof Oe || x) && (y = Ae(-h.italic))
            }
            if (a && n) {
                c = Math.max(c, i, a.depth + .25 * m.xHeight),
                p = Math.max(p, m.sub2);
                var w = 4 * m.defaultRuleThickness;
                if (c - a.depth - (n.height - p) < w) {
                    p = w - (c - a.depth) + n.height;
                    var k = .8 * m.xHeight - (c - a.depth);
                    k > 0 && (c += k,
                    p -= k)
                }
                f = It.makeVList({
                    positionType: "individualShift",
                    children: [{
                        type: "elem",
                        elem: n,
                        shift: p,
                        marginRight: b,
                        marginLeft: y
                    }, {
                        type: "elem",
                        elem: a,
                        shift: -c,
                        marginRight: b
                    }]
                }, t)
            } else if (n) {
                p = Math.max(p, m.sub1, n.height - .8 * m.xHeight),
                f = It.makeVList({
                    positionType: "shift",
                    positionData: p,
                    children: [{
                        type: "elem",
                        elem: n,
                        marginLeft: y,
                        marginRight: b
                    }]
                }, t)
            } else {
                if (!a)
                    throw new Error("supsub must have either sup or sub.");
                c = Math.max(c, i, a.depth + .25 * m.xHeight),
                f = It.makeVList({
                    positionType: "shift",
                    positionData: -c,
                    children: [{
                        type: "elem",
                        elem: a,
                        marginRight: b
                    }]
                }, t)
            }
            var S = er(h, "right") || "mord";
            return It.makeSpan([S], [h, It.makeSpan(["msupsub"], [f])], t)
        },
        mathmlBuilder(e, t) {
            var r, a = !1;
            e.base && "horizBrace" === e.base.type && !!e.sup === e.base.isOver && (a = !0,
            r = e.base.isOver),
            !e.base || "op" !== e.base.type && "operatorname" !== e.base.type || (e.base.parentIsSupSub = !0);
            var n, i = [dr(e.base, t)];
            if (e.sub && i.push(dr(e.sub, t)),
            e.sup && i.push(dr(e.sup, t)),
            a)
                n = r ? "mover" : "munder";
            else if (e.sub)
                if (e.sup) {
                    var o = e.base;
                    n = o && "op" === o.type && o.limits && t.style === se.DISPLAY || o && "operatorname" === o.type && o.alwaysHandleSupSub && (t.style === se.DISPLAY || o.limits) ? "munderover" : "msubsup"
                } else {
                    var s = e.base;
                    n = s && "op" === s.type && s.limits && (t.style === se.DISPLAY || s.alwaysHandleSupSub) || s && "operatorname" === s.type && s.alwaysHandleSupSub && (s.limits || t.style === se.DISPLAY) ? "munder" : "msub"
                }
            else {
                var l = e.base;
                n = l && "op" === l.type && l.limits && (t.style === se.DISPLAY || l.alwaysHandleSupSub) || l && "operatorname" === l.type && l.alwaysHandleSupSub && (l.limits || t.style === se.DISPLAY) ? "mover" : "msup"
            }
            return new lr.MathNode(n,i)
        }
    }),
    Gt({
        type: "atom",
        htmlBuilder: (e,t)=>It.mathsym(e.text, e.mode, t, ["m" + e.family]),
        mathmlBuilder(e, t) {
            var r = new lr.MathNode("mo",[hr(e.text, e.mode)]);
            if ("bin" === e.family) {
                var a = cr(e, t);
                "bold-italic" === a && r.setAttribute("mathvariant", a)
            } else
                "punct" === e.family ? r.setAttribute("separator", "true") : "open" !== e.family && "close" !== e.family || r.setAttribute("stretchy", "false");
            return r
        }
    });
    var _a = {
        mi: "italic",
        mn: "normal",
        mtext: "normal"
    };
    Gt({
        type: "mathord",
        htmlBuilder: (e,t)=>It.makeOrd(e, t, "mathord"),
        mathmlBuilder(e, t) {
            var r = new lr.MathNode("mi",[hr(e.text, e.mode, t)])
              , a = cr(e, t) || "italic";
            return a !== _a[r.type] && r.setAttribute("mathvariant", a),
            r
        }
    }),
    Gt({
        type: "textord",
        htmlBuilder: (e,t)=>It.makeOrd(e, t, "textord"),
        mathmlBuilder(e, t) {
            var r, a = hr(e.text, e.mode, t), n = cr(e, t) || "normal";
            return r = "text" === e.mode ? new lr.MathNode("mtext",[a]) : /[0-9]/.test(e.text) ? new lr.MathNode("mn",[a]) : "\\prime" === e.text ? new lr.MathNode("mo",[a]) : new lr.MathNode("mi",[a]),
            n !== _a[r.type] && r.setAttribute("mathvariant", n),
            r
        }
    });
    var Za = {
        "\\nobreak": "nobreak",
        "\\allowbreak": "allowbreak"
    }
      , Ka = {
        " ": {},
        "\\ ": {},
        "~": {
            className: "nobreak"
        },
        "\\space": {},
        "\\nobreakspace": {
            className: "nobreak"
        }
    };
    Gt({
        type: "spacing",
        htmlBuilder(e, t) {
            if (Ka.hasOwnProperty(e.text)) {
                var r = Ka[e.text].className || "";
                if ("text" === e.mode) {
                    var a = It.makeOrd(e, t, "textord");
                    return a.classes.push(r),
                    a
                }
                return It.makeSpan(["mspace", r], [It.mathsym(e.text, e.mode, t)], t)
            }
            if (Za.hasOwnProperty(e.text))
                return It.makeSpan(["mspace", Za[e.text]], [], t);
            throw new D('Unknown type of space "' + e.text + '"')
        },
        mathmlBuilder(e, t) {
            if (!Ka.hasOwnProperty(e.text)) {
                if (Za.hasOwnProperty(e.text))
                    return new lr.MathNode("mspace");
                throw new D('Unknown type of space "' + e.text + '"')
            }
            return new lr.MathNode("mtext",[new lr.TextNode("\xa0")])
        }
    });
    var Ja = ()=>{
        var e = new lr.MathNode("mtd",[]);
        return e.setAttribute("width", "50%"),
        e
    }
    ;
    Gt({
        type: "tag",
        mathmlBuilder(e, t) {
            var r = new lr.MathNode("mtable",[new lr.MathNode("mtr",[Ja(), new lr.MathNode("mtd",[ur(e.body, t)]), Ja(), new lr.MathNode("mtd",[ur(e.tag, t)])])]);
            return r.setAttribute("width", "100%"),
            r
        }
    });
    var Qa = {
        "\\text": void 0,
        "\\textrm": "textrm",
        "\\textsf": "textsf",
        "\\texttt": "texttt",
        "\\textnormal": "textrm"
    }
      , en = {
        "\\textbf": "textbf",
        "\\textmd": "textmd"
    }
      , tn = {
        "\\textit": "textit",
        "\\textup": "textup"
    }
      , rn = (e,t)=>{
        var r = e.font;
        return r ? Qa[r] ? t.withTextFontFamily(Qa[r]) : en[r] ? t.withTextFontWeight(en[r]) : t.withTextFontShape(tn[r]) : t
    }
    ;
    Ft({
        type: "text",
        names: ["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textbf", "\\textmd", "\\textit", "\\textup"],
        props: {
            numArgs: 1,
            argTypes: ["text"],
            allowedInArgument: !0,
            allowedInText: !0
        },
        handler(e, t) {
            var {parser: r, funcName: a} = e
              , n = t[0];
            return {
                type: "text",
                mode: r.mode,
                body: Yt(n),
                font: a
            }
        },
        htmlBuilder(e, t) {
            var r = rn(e, t)
              , a = Zt(e.body, r, !0);
            return It.makeSpan(["mord", "text"], a, r)
        },
        mathmlBuilder(e, t) {
            var r = rn(e, t);
            return ur(e.body, r)
        }
    }),
    Ft({
        type: "underline",
        names: ["\\underline"],
        props: {
            numArgs: 1,
            allowedInText: !0
        },
        handler(e, t) {
            var {parser: r} = e;
            return {
                type: "underline",
                mode: r.mode,
                body: t[0]
            }
        },
        htmlBuilder(e, t) {
            var r = rr(e.body, t)
              , a = It.makeLineSpan("underline-line", t)
              , n = t.fontMetrics().defaultRuleThickness
              , i = It.makeVList({
                positionType: "top",
                positionData: r.height,
                children: [{
                    type: "kern",
                    size: n
                }, {
                    type: "elem",
                    elem: a
                }, {
                    type: "kern",
                    size: 3 * n
                }, {
                    type: "elem",
                    elem: r
                }]
            }, t);
            return It.makeSpan(["mord", "underline"], [i], t)
        },
        mathmlBuilder(e, t) {
            var r = new lr.MathNode("mo",[new lr.TextNode("\u203e")]);
            r.setAttribute("stretchy", "true");
            var a = new lr.MathNode("munder",[dr(e.body, t), r]);
            return a.setAttribute("accentunder", "true"),
            a
        }
    }),
    Ft({
        type: "vcenter",
        names: ["\\vcenter"],
        props: {
            numArgs: 1,
            argTypes: ["original"],
            allowedInText: !1
        },
        handler(e, t) {
            var {parser: r} = e;
            return {
                type: "vcenter",
                mode: r.mode,
                body: t[0]
            }
        },
        htmlBuilder(e, t) {
            var r = rr(e.body, t)
              , a = t.fontMetrics().axisHeight
              , n = .5 * (r.height - a - (r.depth + a));
            return It.makeVList({
                positionType: "shift",
                positionData: n,
                children: [{
                    type: "elem",
                    elem: r
                }]
            }, t)
        },
        mathmlBuilder: (e,t)=>new lr.MathNode("mpadded",[dr(e.body, t)],["vcenter"])
    }),
    Ft({
        type: "verb",
        names: ["\\verb"],
        props: {
            numArgs: 0,
            allowedInText: !0
        },
        handler(e, t, r) {
            throw new D("\\verb ended by end of line instead of matching delimiter")
        },
        htmlBuilder(e, t) {
            for (var r = an(e), a = [], n = t.havingStyle(t.style.text()), i = 0; i < r.length; i++) {
                var o = r[i];
                "~" === o && (o = "\\textasciitilde"),
                a.push(It.makeSymbol(o, "Typewriter-Regular", e.mode, n, ["mord", "texttt"]))
            }
            return It.makeSpan(["mord", "text"].concat(n.sizingClasses(t)), It.tryCombineChars(a), n)
        },
        mathmlBuilder(e, t) {
            var r = new lr.TextNode(an(e))
              , a = new lr.MathNode("mtext",[r]);
            return a.setAttribute("mathvariant", "monospace"),
            a
        }
    });
    var an = e=>e.body.replace(/ /g, e.star ? "\u2423" : "\xa0")
      , nn = Dt
      , on = "[ \r\n\t]"
      , sn = "(\\\\[a-zA-Z@]+)" + on + "*"
      , ln = "[\u0300-\u036f]"
      , hn = new RegExp(ln + "+$")
      , mn = "(" + on + "+)|\\\\(\n|[ \r\t]+\n?)[ \r\t]*|([!-\\[\\]-\u2027\u202a-\ud7ff\uf900-\uffff]" + ln + "*|[\ud800-\udbff][\udc00-\udfff]" + ln + "*|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5|" + sn + "|\\\\[^\ud800-\udfff])";
    class cn {
        constructor(e, t) {
            this.input = void 0,
            this.settings = void 0,
            this.tokenRegex = void 0,
            this.catcodes = void 0,
            this.input = e,
            this.settings = t,
            this.tokenRegex = new RegExp(mn,"g"),
            this.catcodes = {
                "%": 14,
                "~": 13
            }
        }
        setCatcode(e, t) {
            this.catcodes[e] = t
        }
        lex() {
            var e = this.input
              , t = this.tokenRegex.lastIndex;
            if (t === e.length)
                return new L("EOF",new E(this,t,t));
            var r = this.tokenRegex.exec(e);
            if (null === r || r.index !== t)
                throw new D("Unexpected character: '" + e[t] + "'",new L(e[t],new E(this,t,t + 1)));
            var a = r[6] || r[3] || (r[2] ? "\\ " : " ");
            if (14 === this.catcodes[a]) {
                var n = e.indexOf("\n", this.tokenRegex.lastIndex);
                return -1 === n ? (this.tokenRegex.lastIndex = e.length,
                this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = n + 1,
                this.lex()
            }
            return new L(a,new E(this,t,this.tokenRegex.lastIndex))
        }
    }
    class pn {
        constructor(e, t) {
            void 0 === e && (e = {}),
            void 0 === t && (t = {}),
            this.current = void 0,
            this.builtins = void 0,
            this.undefStack = void 0,
            this.current = t,
            this.builtins = e,
            this.undefStack = []
        }
        beginGroup() {
            this.undefStack.push({})
        }
        endGroup() {
            if (0 === this.undefStack.length)
                throw new D("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
            var e = this.undefStack.pop();
            for (var t in e)
                e.hasOwnProperty(t) && (null == e[t] ? delete this.current[t] : this.current[t] = e[t])
        }
        endGroups() {
            for (; this.undefStack.length > 0; )
                this.endGroup()
        }
        has(e) {
            return this.current.hasOwnProperty(e) || this.builtins.hasOwnProperty(e)
        }
        get(e) {
            return this.current.hasOwnProperty(e) ? this.current[e] : this.builtins[e]
        }
        set(e, t, r) {
            if (void 0 === r && (r = !1),
            r) {
                for (var a = 0; a < this.undefStack.length; a++)
                    delete this.undefStack[a][e];
                this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e] = t)
            } else {
                var n = this.undefStack[this.undefStack.length - 1];
                n && !n.hasOwnProperty(e) && (n[e] = this.current[e])
            }
            null == t ? delete this.current[e] : this.current[e] = t
        }
    }
    var un = fa;
    va("\\noexpand", (function(e) {
        var t = e.popToken();
        return e.isExpandable(t.text) && (t.noexpand = !0,
        t.treatAsRelax = !0),
        {
            tokens: [t],
            numArgs: 0
        }
    }
    )),
    va("\\expandafter", (function(e) {
        var t = e.popToken();
        return e.expandOnce(!0),
        {
            tokens: [t],
            numArgs: 0
        }
    }
    )),
    va("\\@firstoftwo", (function(e) {
        return {
            tokens: e.consumeArgs(2)[0],
            numArgs: 0
        }
    }
    )),
    va("\\@secondoftwo", (function(e) {
        return {
            tokens: e.consumeArgs(2)[1],
            numArgs: 0
        }
    }
    )),
    va("\\@ifnextchar", (function(e) {
        var t = e.consumeArgs(3);
        e.consumeSpaces();
        var r = e.future();
        return 1 === t[0].length && t[0][0].text === r.text ? {
            tokens: t[1],
            numArgs: 0
        } : {
            tokens: t[2],
            numArgs: 0
        }
    }
    )),
    va("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}"),
    va("\\TextOrMath", (function(e) {
        var t = e.consumeArgs(2);
        return "text" === e.mode ? {
            tokens: t[0],
            numArgs: 0
        } : {
            tokens: t[1],
            numArgs: 0
        }
    }
    ));
    var dn = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        a: 10,
        A: 10,
        b: 11,
        B: 11,
        c: 12,
        C: 12,
        d: 13,
        D: 13,
        e: 14,
        E: 14,
        f: 15,
        F: 15
    };
    va("\\char", (function(e) {
        var t, r = e.popToken(), a = "";
        if ("'" === r.text)
            t = 8,
            r = e.popToken();
        else if ('"' === r.text)
            t = 16,
            r = e.popToken();
        else if ("`" === r.text)
            if ("\\" === (r = e.popToken()).text[0])
                a = r.text.charCodeAt(1);
            else {
                if ("EOF" === r.text)
                    throw new D("\\char` missing argument");
                a = r.text.charCodeAt(0)
            }
        else
            t = 10;
        if (t) {
            if (null == (a = dn[r.text]) || a >= t)
                throw new D("Invalid base-" + t + " digit " + r.text);
            for (var n; null != (n = dn[e.future().text]) && n < t; )
                a *= t,
                a += n,
                e.popToken()
        }
        return "\\@char{" + a + "}"
    }
    ));
    var gn = (e,t,r)=>{
        var a = e.consumeArg().tokens;
        if (1 !== a.length)
            throw new D("\\newcommand's first argument must be a macro name");
        var n = a[0].text
          , i = e.isDefined(n);
        if (i && !t)
            throw new D("\\newcommand{" + n + "} attempting to redefine " + n + "; use \\renewcommand");
        if (!i && !r)
            throw new D("\\renewcommand{" + n + "} when command " + n + " does not yet exist; use \\newcommand");
        var o = 0;
        if (1 === (a = e.consumeArg().tokens).length && "[" === a[0].text) {
            for (var s = "", l = e.expandNextToken(); "]" !== l.text && "EOF" !== l.text; )
                s += l.text,
                l = e.expandNextToken();
            if (!s.match(/^\s*[0-9]+\s*$/))
                throw new D("Invalid number of arguments: " + s);
            o = parseInt(s),
            a = e.consumeArg().tokens
        }
        return e.macros.set(n, {
            tokens: a,
            numArgs: o
        }),
        ""
    }
    ;
    va("\\newcommand", (e=>gn(e, !1, !0))),
    va("\\renewcommand", (e=>gn(e, !0, !1))),
    va("\\providecommand", (e=>gn(e, !0, !0))),
    va("\\message", (e=>{
        var t = e.consumeArgs(1)[0];
        return console.log(t.reverse().map((e=>e.text)).join("")),
        ""
    }
    )),
    va("\\errmessage", (e=>{
        var t = e.consumeArgs(1)[0];
        return console.error(t.reverse().map((e=>e.text)).join("")),
        ""
    }
    )),
    va("\\show", (e=>{
        var t = e.popToken()
          , r = t.text;
        return console.log(t, e.macros.get(r), nn[r], Ge.math[r], Ge.text[r]),
        ""
    }
    )),
    va("\\bgroup", "{"),
    va("\\egroup", "}"),
    va("~", "\\nobreakspace"),
    va("\\lq", "`"),
    va("\\rq", "'"),
    va("\\aa", "\\r a"),
    va("\\AA", "\\r A"),
    va("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`\xa9}"),
    va("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}"),
    va("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xae}"),
    va("\u212c", "\\mathscr{B}"),
    va("\u2130", "\\mathscr{E}"),
    va("\u2131", "\\mathscr{F}"),
    va("\u210b", "\\mathscr{H}"),
    va("\u2110", "\\mathscr{I}"),
    va("\u2112", "\\mathscr{L}"),
    va("\u2133", "\\mathscr{M}"),
    va("\u211b", "\\mathscr{R}"),
    va("\u212d", "\\mathfrak{C}"),
    va("\u210c", "\\mathfrak{H}"),
    va("\u2128", "\\mathfrak{Z}"),
    va("\\Bbbk", "\\Bbb{k}"),
    va("\xb7", "\\cdotp"),
    va("\\llap", "\\mathllap{\\textrm{#1}}"),
    va("\\rlap", "\\mathrlap{\\textrm{#1}}"),
    va("\\clap", "\\mathclap{\\textrm{#1}}"),
    va("\\mathstrut", "\\vphantom{(}"),
    va("\\underbar", "\\underline{\\text{#1}}"),
    va("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}'),
    va("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}"),
    va("\\ne", "\\neq"),
    va("\u2260", "\\neq"),
    va("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}"),
    va("\u2209", "\\notin"),
    va("\u2258", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}"),
    va("\u2259", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}"),
    va("\u225a", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225a}}"),
    va("\u225b", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225b}}"),
    va("\u225d", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225d}}"),
    va("\u225e", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225e}}"),
    va("\u225f", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225f}}"),
    va("\u27c2", "\\perp"),
    va("\u203c", "\\mathclose{!\\mkern-0.8mu!}"),
    va("\u220c", "\\notni"),
    va("\u231c", "\\ulcorner"),
    va("\u231d", "\\urcorner"),
    va("\u231e", "\\llcorner"),
    va("\u231f", "\\lrcorner"),
    va("\xa9", "\\copyright"),
    va("\xae", "\\textregistered"),
    va("\ufe0f", "\\textregistered"),
    va("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}'),
    va("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}'),
    va("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}'),
    va("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}'),
    va("\\vdots", "\\mathord{\\varvdots\\rule{0pt}{15pt}}"),
    va("\u22ee", "\\vdots"),
    va("\\varGamma", "\\mathit{\\Gamma}"),
    va("\\varDelta", "\\mathit{\\Delta}"),
    va("\\varTheta", "\\mathit{\\Theta}"),
    va("\\varLambda", "\\mathit{\\Lambda}"),
    va("\\varXi", "\\mathit{\\Xi}"),
    va("\\varPi", "\\mathit{\\Pi}"),
    va("\\varSigma", "\\mathit{\\Sigma}"),
    va("\\varUpsilon", "\\mathit{\\Upsilon}"),
    va("\\varPhi", "\\mathit{\\Phi}"),
    va("\\varPsi", "\\mathit{\\Psi}"),
    va("\\varOmega", "\\mathit{\\Omega}"),
    va("\\substack", "\\begin{subarray}{c}#1\\end{subarray}"),
    va("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax"),
    va("\\boxed", "\\fbox{$\\displaystyle{#1}$}"),
    va("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;"),
    va("\\implies", "\\DOTSB\\;\\Longrightarrow\\;"),
    va("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
    var fn = {
        ",": "\\dotsc",
        "\\not": "\\dotsb",
        "+": "\\dotsb",
        "=": "\\dotsb",
        "<": "\\dotsb",
        ">": "\\dotsb",
        "-": "\\dotsb",
        "*": "\\dotsb",
        ":": "\\dotsb",
        "\\DOTSB": "\\dotsb",
        "\\coprod": "\\dotsb",
        "\\bigvee": "\\dotsb",
        "\\bigwedge": "\\dotsb",
        "\\biguplus": "\\dotsb",
        "\\bigcap": "\\dotsb",
        "\\bigcup": "\\dotsb",
        "\\prod": "\\dotsb",
        "\\sum": "\\dotsb",
        "\\bigotimes": "\\dotsb",
        "\\bigoplus": "\\dotsb",
        "\\bigodot": "\\dotsb",
        "\\bigsqcup": "\\dotsb",
        "\\And": "\\dotsb",
        "\\longrightarrow": "\\dotsb",
        "\\Longrightarrow": "\\dotsb",
        "\\longleftarrow": "\\dotsb",
        "\\Longleftarrow": "\\dotsb",
        "\\longleftrightarrow": "\\dotsb",
        "\\Longleftrightarrow": "\\dotsb",
        "\\mapsto": "\\dotsb",
        "\\longmapsto": "\\dotsb",
        "\\hookrightarrow": "\\dotsb",
        "\\doteq": "\\dotsb",
        "\\mathbin": "\\dotsb",
        "\\mathrel": "\\dotsb",
        "\\relbar": "\\dotsb",
        "\\Relbar": "\\dotsb",
        "\\xrightarrow": "\\dotsb",
        "\\xleftarrow": "\\dotsb",
        "\\DOTSI": "\\dotsi",
        "\\int": "\\dotsi",
        "\\oint": "\\dotsi",
        "\\iint": "\\dotsi",
        "\\iiint": "\\dotsi",
        "\\iiiint": "\\dotsi",
        "\\idotsint": "\\dotsi",
        "\\DOTSX": "\\dotsx"
    };
    va("\\dots", (function(e) {
        var t = "\\dotso"
          , r = e.expandAfterFuture().text;
        return r in fn ? t = fn[r] : ("\\not" === r.slice(0, 4) || r in Ge.math && U(["bin", "rel"], Ge.math[r].group)) && (t = "\\dotsb"),
        t
    }
    ));
    var vn = {
        ")": !0,
        "]": !0,
        "\\rbrack": !0,
        "\\}": !0,
        "\\rbrace": !0,
        "\\rangle": !0,
        "\\rceil": !0,
        "\\rfloor": !0,
        "\\rgroup": !0,
        "\\rmoustache": !0,
        "\\right": !0,
        "\\bigr": !0,
        "\\biggr": !0,
        "\\Bigr": !0,
        "\\Biggr": !0,
        $: !0,
        ";": !0,
        ".": !0,
        ",": !0
    };
    va("\\dotso", (function(e) {
        return e.future().text in vn ? "\\ldots\\," : "\\ldots"
    }
    )),
    va("\\dotsc", (function(e) {
        var t = e.future().text;
        return t in vn && "," !== t ? "\\ldots\\," : "\\ldots"
    }
    )),
    va("\\cdots", (function(e) {
        return e.future().text in vn ? "\\@cdots\\," : "\\@cdots"
    }
    )),
    va("\\dotsb", "\\cdots"),
    va("\\dotsm", "\\cdots"),
    va("\\dotsi", "\\!\\cdots"),
    va("\\dotsx", "\\ldots\\,"),
    va("\\DOTSI", "\\relax"),
    va("\\DOTSB", "\\relax"),
    va("\\DOTSX", "\\relax"),
    va("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax"),
    va("\\,", "\\tmspace+{3mu}{.1667em}"),
    va("\\thinspace", "\\,"),
    va("\\>", "\\mskip{4mu}"),
    va("\\:", "\\tmspace+{4mu}{.2222em}"),
    va("\\medspace", "\\:"),
    va("\\;", "\\tmspace+{5mu}{.2777em}"),
    va("\\thickspace", "\\;"),
    va("\\!", "\\tmspace-{3mu}{.1667em}"),
    va("\\negthinspace", "\\!"),
    va("\\negmedspace", "\\tmspace-{4mu}{.2222em}"),
    va("\\negthickspace", "\\tmspace-{5mu}{.277em}"),
    va("\\enspace", "\\kern.5em "),
    va("\\enskip", "\\hskip.5em\\relax"),
    va("\\quad", "\\hskip1em\\relax"),
    va("\\qquad", "\\hskip2em\\relax"),
    va("\\tag", "\\@ifstar\\tag@literal\\tag@paren"),
    va("\\tag@paren", "\\tag@literal{({#1})}"),
    va("\\tag@literal", (e=>{
        if (e.macros.get("\\df@tag"))
            throw new D("Multiple \\tag");
        return "\\gdef\\df@tag{\\text{#1}}"
    }
    )),
    va("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}"),
    va("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"),
    va("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}"),
    va("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1"),
    va("\\newline", "\\\\\\relax"),
    va("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
    var bn = Ae(ue["Main-Regular"]["T".charCodeAt(0)][1] - .7 * ue["Main-Regular"]["A".charCodeAt(0)][1]);
    va("\\LaTeX", "\\textrm{\\html@mathml{L\\kern-.36em\\raisebox{" + bn + "}{\\scriptstyle A}\\kern-.15em\\TeX}{LaTeX}}"),
    va("\\KaTeX", "\\textrm{\\html@mathml{K\\kern-.17em\\raisebox{" + bn + "}{\\scriptstyle A}\\kern-.15em\\TeX}{KaTeX}}"),
    va("\\hspace", "\\@ifstar\\@hspacer\\@hspace"),
    va("\\@hspace", "\\hskip #1\\relax"),
    va("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax"),
    va("\\ordinarycolon", ":"),
    va("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}"),
    va("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}'),
    va("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}'),
    va("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}'),
    va("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}'),
    va("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}'),
    va("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}'),
    va("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}'),
    va("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}'),
    va("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}'),
    va("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}'),
    va("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}'),
    va("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}'),
    va("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}'),
    va("\u2237", "\\dblcolon"),
    va("\u2239", "\\eqcolon"),
    va("\u2254", "\\coloneqq"),
    va("\u2255", "\\eqqcolon"),
    va("\u2a74", "\\Coloneqq"),
    va("\\ratio", "\\vcentcolon"),
    va("\\coloncolon", "\\dblcolon"),
    va("\\colonequals", "\\coloneqq"),
    va("\\coloncolonequals", "\\Coloneqq"),
    va("\\equalscolon", "\\eqqcolon"),
    va("\\equalscoloncolon", "\\Eqqcolon"),
    va("\\colonminus", "\\coloneq"),
    va("\\coloncolonminus", "\\Coloneq"),
    va("\\minuscolon", "\\eqcolon"),
    va("\\minuscoloncolon", "\\Eqcolon"),
    va("\\coloncolonapprox", "\\Colonapprox"),
    va("\\coloncolonsim", "\\Colonsim"),
    va("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}"),
    va("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}"),
    va("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}"),
    va("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}"),
    va("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220c}}"),
    va("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}"),
    va("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}"),
    va("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}"),
    va("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}"),
    va("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}"),
    va("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}"),
    va("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}"),
    va("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}"),
    va("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{\u2269}"),
    va("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{\u2268}"),
    va("\\ngeqq", "\\html@mathml{\\@ngeqq}{\u2271}"),
    va("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{\u2271}"),
    va("\\nleqq", "\\html@mathml{\\@nleqq}{\u2270}"),
    va("\\nleqslant", "\\html@mathml{\\@nleqslant}{\u2270}"),
    va("\\nshortmid", "\\html@mathml{\\@nshortmid}{\u2224}"),
    va("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{\u2226}"),
    va("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{\u2288}"),
    va("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{\u2289}"),
    va("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{\u228a}"),
    va("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{\u2acb}"),
    va("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{\u228b}"),
    va("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{\u2acc}"),
    va("\\imath", "\\html@mathml{\\@imath}{\u0131}"),
    va("\\jmath", "\\html@mathml{\\@jmath}{\u0237}"),
    va("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27e6}}"),
    va("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27e7}}"),
    va("\u27e6", "\\llbracket"),
    va("\u27e7", "\\rrbracket"),
    va("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}"),
    va("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}"),
    va("\u2983", "\\lBrace"),
    va("\u2984", "\\rBrace"),
    va("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`\u29b5}}"),
    va("\u29b5", "\\minuso"),
    va("\\darr", "\\downarrow"),
    va("\\dArr", "\\Downarrow"),
    va("\\Darr", "\\Downarrow"),
    va("\\lang", "\\langle"),
    va("\\rang", "\\rangle"),
    va("\\uarr", "\\uparrow"),
    va("\\uArr", "\\Uparrow"),
    va("\\Uarr", "\\Uparrow"),
    va("\\N", "\\mathbb{N}"),
    va("\\R", "\\mathbb{R}"),
    va("\\Z", "\\mathbb{Z}"),
    va("\\alef", "\\aleph"),
    va("\\alefsym", "\\aleph"),
    va("\\Alpha", "\\mathrm{A}"),
    va("\\Beta", "\\mathrm{B}"),
    va("\\bull", "\\bullet"),
    va("\\Chi", "\\mathrm{X}"),
    va("\\clubs", "\\clubsuit"),
    va("\\cnums", "\\mathbb{C}"),
    va("\\Complex", "\\mathbb{C}"),
    va("\\Dagger", "\\ddagger"),
    va("\\diamonds", "\\diamondsuit"),
    va("\\empty", "\\emptyset"),
    va("\\Epsilon", "\\mathrm{E}"),
    va("\\Eta", "\\mathrm{H}"),
    va("\\exist", "\\exists"),
    va("\\harr", "\\leftrightarrow"),
    va("\\hArr", "\\Leftrightarrow"),
    va("\\Harr", "\\Leftrightarrow"),
    va("\\hearts", "\\heartsuit"),
    va("\\image", "\\Im"),
    va("\\infin", "\\infty"),
    va("\\Iota", "\\mathrm{I}"),
    va("\\isin", "\\in"),
    va("\\Kappa", "\\mathrm{K}"),
    va("\\larr", "\\leftarrow"),
    va("\\lArr", "\\Leftarrow"),
    va("\\Larr", "\\Leftarrow"),
    va("\\lrarr", "\\leftrightarrow"),
    va("\\lrArr", "\\Leftrightarrow"),
    va("\\Lrarr", "\\Leftrightarrow"),
    va("\\Mu", "\\mathrm{M}"),
    va("\\natnums", "\\mathbb{N}"),
    va("\\Nu", "\\mathrm{N}"),
    va("\\Omicron", "\\mathrm{O}"),
    va("\\plusmn", "\\pm"),
    va("\\rarr", "\\rightarrow"),
    va("\\rArr", "\\Rightarrow"),
    va("\\Rarr", "\\Rightarrow"),
    va("\\real", "\\Re"),
    va("\\reals", "\\mathbb{R}"),
    va("\\Reals", "\\mathbb{R}"),
    va("\\Rho", "\\mathrm{P}"),
    va("\\sdot", "\\cdot"),
    va("\\sect", "\\S"),
    va("\\spades", "\\spadesuit"),
    va("\\sub", "\\subset"),
    va("\\sube", "\\subseteq"),
    va("\\supe", "\\supseteq"),
    va("\\Tau", "\\mathrm{T}"),
    va("\\thetasym", "\\vartheta"),
    va("\\weierp", "\\wp"),
    va("\\Zeta", "\\mathrm{Z}"),
    va("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}"),
    va("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}"),
    va("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits"),
    va("\\bra", "\\mathinner{\\langle{#1}|}"),
    va("\\ket", "\\mathinner{|{#1}\\rangle}"),
    va("\\braket", "\\mathinner{\\langle{#1}\\rangle}"),
    va("\\Bra", "\\left\\langle#1\\right|"),
    va("\\Ket", "\\left|#1\\right\\rangle");
    var yn = e=>t=>{
        var r = t.consumeArg().tokens
          , a = t.consumeArg().tokens
          , n = t.consumeArg().tokens
          , i = t.consumeArg().tokens
          , o = t.macros.get("|")
          , s = t.macros.get("\\|");
        t.macros.beginGroup();
        var l = t=>r=>{
            e && (r.macros.set("|", o),
            n.length && r.macros.set("\\|", s));
            var i = t;
            return !t && n.length && "|" === r.future().text && (r.popToken(),
            i = !0),
            {
                tokens: i ? n : a,
                numArgs: 0
            }
        }
        ;
        t.macros.set("|", l(!1)),
        n.length && t.macros.set("\\|", l(!0));
        var h = t.consumeArg().tokens
          , m = t.expandTokens([...i, ...h, ...r]);
        return t.macros.endGroup(),
        {
            tokens: m.reverse(),
            numArgs: 0
        }
    }
    ;
    va("\\bra@ket", yn(!1)),
    va("\\bra@set", yn(!0)),
    va("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}"),
    va("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}"),
    va("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}"),
    va("\\angln", "{\\angl n}"),
    va("\\blue", "\\textcolor{##6495ed}{#1}"),
    va("\\orange", "\\textcolor{##ffa500}{#1}"),
    va("\\pink", "\\textcolor{##ff00af}{#1}"),
    va("\\red", "\\textcolor{##df0030}{#1}"),
    va("\\green", "\\textcolor{##28ae7b}{#1}"),
    va("\\gray", "\\textcolor{gray}{#1}"),
    va("\\purple", "\\textcolor{##9d38bd}{#1}"),
    va("\\blueA", "\\textcolor{##ccfaff}{#1}"),
    va("\\blueB", "\\textcolor{##80f6ff}{#1}"),
    va("\\blueC", "\\textcolor{##63d9ea}{#1}"),
    va("\\blueD", "\\textcolor{##11accd}{#1}"),
    va("\\blueE", "\\textcolor{##0c7f99}{#1}"),
    va("\\tealA", "\\textcolor{##94fff5}{#1}"),
    va("\\tealB", "\\textcolor{##26edd5}{#1}"),
    va("\\tealC", "\\textcolor{##01d1c1}{#1}"),
    va("\\tealD", "\\textcolor{##01a995}{#1}"),
    va("\\tealE", "\\textcolor{##208170}{#1}"),
    va("\\greenA", "\\textcolor{##b6ffb0}{#1}"),
    va("\\greenB", "\\textcolor{##8af281}{#1}"),
    va("\\greenC", "\\textcolor{##74cf70}{#1}"),
    va("\\greenD", "\\textcolor{##1fab54}{#1}"),
    va("\\greenE", "\\textcolor{##0d923f}{#1}"),
    va("\\goldA", "\\textcolor{##ffd0a9}{#1}"),
    va("\\goldB", "\\textcolor{##ffbb71}{#1}"),
    va("\\goldC", "\\textcolor{##ff9c39}{#1}"),
    va("\\goldD", "\\textcolor{##e07d10}{#1}"),
    va("\\goldE", "\\textcolor{##a75a05}{#1}"),
    va("\\redA", "\\textcolor{##fca9a9}{#1}"),
    va("\\redB", "\\textcolor{##ff8482}{#1}"),
    va("\\redC", "\\textcolor{##f9685d}{#1}"),
    va("\\redD", "\\textcolor{##e84d39}{#1}"),
    va("\\redE", "\\textcolor{##bc2612}{#1}"),
    va("\\maroonA", "\\textcolor{##ffbde0}{#1}"),
    va("\\maroonB", "\\textcolor{##ff92c6}{#1}"),
    va("\\maroonC", "\\textcolor{##ed5fa6}{#1}"),
    va("\\maroonD", "\\textcolor{##ca337c}{#1}"),
    va("\\maroonE", "\\textcolor{##9e034e}{#1}"),
    va("\\purpleA", "\\textcolor{##ddd7ff}{#1}"),
    va("\\purpleB", "\\textcolor{##c6b9fc}{#1}"),
    va("\\purpleC", "\\textcolor{##aa87ff}{#1}"),
    va("\\purpleD", "\\textcolor{##7854ab}{#1}"),
    va("\\purpleE", "\\textcolor{##543b78}{#1}"),
    va("\\mintA", "\\textcolor{##f5f9e8}{#1}"),
    va("\\mintB", "\\textcolor{##edf2df}{#1}"),
    va("\\mintC", "\\textcolor{##e0e5cc}{#1}"),
    va("\\grayA", "\\textcolor{##f6f7f7}{#1}"),
    va("\\grayB", "\\textcolor{##f0f1f2}{#1}"),
    va("\\grayC", "\\textcolor{##e3e5e6}{#1}"),
    va("\\grayD", "\\textcolor{##d6d8da}{#1}"),
    va("\\grayE", "\\textcolor{##babec2}{#1}"),
    va("\\grayF", "\\textcolor{##888d93}{#1}"),
    va("\\grayG", "\\textcolor{##626569}{#1}"),
    va("\\grayH", "\\textcolor{##3b3e40}{#1}"),
    va("\\grayI", "\\textcolor{##21242c}{#1}"),
    va("\\kaBlue", "\\textcolor{##314453}{#1}"),
    va("\\kaGreen", "\\textcolor{##71B307}{#1}");
    var xn = {
        "^": !0,
        _: !0,
        "\\limits": !0,
        "\\nolimits": !0
    };
    class wn {
        constructor(e, t, r) {
            this.settings = void 0,
            this.expansionCount = void 0,
            this.lexer = void 0,
            this.macros = void 0,
            this.stack = void 0,
            this.mode = void 0,
            this.settings = t,
            this.expansionCount = 0,
            this.feed(e),
            this.macros = new pn(un,t.macros),
            this.mode = r,
            this.stack = []
        }
        feed(e) {
            this.lexer = new cn(e,this.settings)
        }
        switchMode(e) {
            this.mode = e
        }
        beginGroup() {
            this.macros.beginGroup()
        }
        endGroup() {
            this.macros.endGroup()
        }
        endGroups() {
            this.macros.endGroups()
        }
        future() {
            return 0 === this.stack.length && this.pushToken(this.lexer.lex()),
            this.stack[this.stack.length - 1]
        }
        popToken() {
            return this.future(),
            this.stack.pop()
        }
        pushToken(e) {
            this.stack.push(e)
        }
        pushTokens(e) {
            this.stack.push(...e)
        }
        scanArgument(e) {
            var t, r, a;
            if (e) {
                if (this.consumeSpaces(),
                "[" !== this.future().text)
                    return null;
                t = this.popToken(),
                ({tokens: a, end: r} = this.consumeArg(["]"]))
            } else
                ({tokens: a, start: t, end: r} = this.consumeArg());
            return this.pushToken(new L("EOF",r.loc)),
            this.pushTokens(a),
            t.range(r, "")
        }
        consumeSpaces() {
            for (; " " === this.future().text; )
                this.stack.pop()
        }
        consumeArg(e) {
            var t = []
              , r = e && e.length > 0;
            r || this.consumeSpaces();
            var a, n = this.future(), i = 0, o = 0;
            do {
                if (a = this.popToken(),
                t.push(a),
                "{" === a.text)
                    ++i;
                else if ("}" === a.text) {
                    if (-1 == --i)
                        throw new D("Extra }",a)
                } else if ("EOF" === a.text)
                    throw new D("Unexpected end of input in a macro argument, expected '" + (e && r ? e[o] : "}") + "'",a);
                if (e && r)
                    if ((0 === i || 1 === i && "{" === e[o]) && a.text === e[o]) {
                        if (++o === e.length) {
                            t.splice(-o, o);
                            break
                        }
                    } else
                        o = 0
            } while (0 !== i || r);
            return "{" === n.text && "}" === t[t.length - 1].text && (t.pop(),
            t.shift()),
            t.reverse(),
            {
                tokens: t,
                start: n,
                end: a
            }
        }
        consumeArgs(e, t) {
            if (t) {
                if (t.length !== e + 1)
                    throw new D("The length of delimiters doesn't match the number of args!");
                for (var r = t[0], a = 0; a < r.length; a++) {
                    var n = this.popToken();
                    if (r[a] !== n.text)
                        throw new D("Use of the macro doesn't match its definition",n)
                }
            }
            for (var i = [], o = 0; o < e; o++)
                i.push(this.consumeArg(t && t[o + 1]).tokens);
            return i
        }
        countExpansion(e) {
            if (this.expansionCount += e,
            this.expansionCount > this.settings.maxExpand)
                throw new D("Too many expansions: infinite loop or need to increase maxExpand setting")
        }
        expandOnce(e) {
            var t = this.popToken()
              , r = t.text
              , a = t.noexpand ? null : this._getExpansion(r);
            if (null == a || e && a.unexpandable) {
                if (e && null == a && "\\" === r[0] && !this.isDefined(r))
                    throw new D("Undefined control sequence: " + r);
                return this.pushToken(t),
                !1
            }
            this.countExpansion(1);
            var n = a.tokens
              , i = this.consumeArgs(a.numArgs, a.delimiters);
            if (a.numArgs)
                for (var o = (n = n.slice()).length - 1; o >= 0; --o) {
                    var s = n[o];
                    if ("#" === s.text) {
                        if (0 === o)
                            throw new D("Incomplete placeholder at end of macro body",s);
                        if ("#" === (s = n[--o]).text)
                            n.splice(o + 1, 1);
                        else {
                            if (!/^[1-9]$/.test(s.text))
                                throw new D("Not a valid argument number",s);
                            n.splice(o, 2, ...i[+s.text - 1])
                        }
                    }
                }
            return this.pushTokens(n),
            n.length
        }
        expandAfterFuture() {
            return this.expandOnce(),
            this.future()
        }
        expandNextToken() {
            for (; ; )
                if (!1 === this.expandOnce()) {
                    var e = this.stack.pop();
                    return e.treatAsRelax && (e.text = "\\relax"),
                    e
                }
            throw new Error
        }
        expandMacro(e) {
            return this.macros.has(e) ? this.expandTokens([new L(e)]) : void 0
        }
        expandTokens(e) {
            var t = []
              , r = this.stack.length;
            for (this.pushTokens(e); this.stack.length > r; )
                if (!1 === this.expandOnce(!0)) {
                    var a = this.stack.pop();
                    a.treatAsRelax && (a.noexpand = !1,
                    a.treatAsRelax = !1),
                    t.push(a)
                }
            return this.countExpansion(t.length),
            t
        }
        expandMacroAsText(e) {
            var t = this.expandMacro(e);
            return t ? t.map((e=>e.text)).join("") : t
        }
        _getExpansion(e) {
            var t = this.macros.get(e);
            if (null == t)
                return t;
            if (1 === e.length) {
                var r = this.lexer.catcodes[e];
                if (null != r && 13 !== r)
                    return
            }
            var a = "function" == typeof t ? t(this) : t;
            if ("string" == typeof a) {
                var n = 0;
                if (-1 !== a.indexOf("#"))
                    for (var i = a.replace(/##/g, ""); -1 !== i.indexOf("#" + (n + 1)); )
                        ++n;
                for (var o = new cn(a,this.settings), s = [], l = o.lex(); "EOF" !== l.text; )
                    s.push(l),
                    l = o.lex();
                return s.reverse(),
                {
                    tokens: s,
                    numArgs: n
                }
            }
            return a
        }
        isDefined(e) {
            return this.macros.has(e) || nn.hasOwnProperty(e) || Ge.math.hasOwnProperty(e) || Ge.text.hasOwnProperty(e) || xn.hasOwnProperty(e)
        }
        isExpandable(e) {
            var t = this.macros.get(e);
            return null != t ? "string" == typeof t || "function" == typeof t || !t.unexpandable : nn.hasOwnProperty(e) && !nn[e].primitive
        }
    }
    var kn = /^[\u208a\u208b\u208c\u208d\u208e\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089\u2090\u2091\u2095\u1d62\u2c7c\u2096\u2097\u2098\u2099\u2092\u209a\u1d63\u209b\u209c\u1d64\u1d65\u2093\u1d66\u1d67\u1d68\u1d69\u1d6a]/
      , Sn = Object.freeze({
        "\u208a": "+",
        "\u208b": "-",
        "\u208c": "=",
        "\u208d": "(",
        "\u208e": ")",
        "\u2080": "0",
        "\u2081": "1",
        "\u2082": "2",
        "\u2083": "3",
        "\u2084": "4",
        "\u2085": "5",
        "\u2086": "6",
        "\u2087": "7",
        "\u2088": "8",
        "\u2089": "9",
        \u2090: "a",
        \u2091: "e",
        \u2095: "h",
        \u1d62: "i",
        \u2c7c: "j",
        \u2096: "k",
        \u2097: "l",
        \u2098: "m",
        \u2099: "n",
        \u2092: "o",
        \u209a: "p",
        \u1d63: "r",
        \u209b: "s",
        \u209c: "t",
        \u1d64: "u",
        \u1d65: "v",
        \u2093: "x",
        \u1d66: "\u03b2",
        \u1d67: "\u03b3",
        \u1d68: "\u03c1",
        \u1d69: "\u03d5",
        \u1d6a: "\u03c7",
        "\u207a": "+",
        "\u207b": "-",
        "\u207c": "=",
        "\u207d": "(",
        "\u207e": ")",
        "\u2070": "0",
        "\xb9": "1",
        "\xb2": "2",
        "\xb3": "3",
        "\u2074": "4",
        "\u2075": "5",
        "\u2076": "6",
        "\u2077": "7",
        "\u2078": "8",
        "\u2079": "9",
        \u1d2c: "A",
        \u1d2e: "B",
        \u1d30: "D",
        \u1d31: "E",
        \u1d33: "G",
        \u1d34: "H",
        \u1d35: "I",
        \u1d36: "J",
        \u1d37: "K",
        \u1d38: "L",
        \u1d39: "M",
        \u1d3a: "N",
        \u1d3c: "O",
        \u1d3e: "P",
        \u1d3f: "R",
        \u1d40: "T",
        \u1d41: "U",
        \u2c7d: "V",
        \u1d42: "W",
        \u1d43: "a",
        \u1d47: "b",
        \u1d9c: "c",
        \u1d48: "d",
        \u1d49: "e",
        \u1da0: "f",
        \u1d4d: "g",
        \u02b0: "h",
        \u2071: "i",
        \u02b2: "j",
        \u1d4f: "k",
        \u02e1: "l",
        \u1d50: "m",
        \u207f: "n",
        \u1d52: "o",
        \u1d56: "p",
        \u02b3: "r",
        \u02e2: "s",
        \u1d57: "t",
        \u1d58: "u",
        \u1d5b: "v",
        \u02b7: "w",
        \u02e3: "x",
        \u02b8: "y",
        \u1dbb: "z",
        \u1d5d: "\u03b2",
        \u1d5e: "\u03b3",
        \u1d5f: "\u03b4",
        \u1d60: "\u03d5",
        \u1d61: "\u03c7",
        \u1dbf: "\u03b8"
    })
      , Mn = {
        "\u0301": {
            text: "\\'",
            math: "\\acute"
        },
        "\u0300": {
            text: "\\`",
            math: "\\grave"
        },
        "\u0308": {
            text: '\\"',
            math: "\\ddot"
        },
        "\u0303": {
            text: "\\~",
            math: "\\tilde"
        },
        "\u0304": {
            text: "\\=",
            math: "\\bar"
        },
        "\u0306": {
            text: "\\u",
            math: "\\breve"
        },
        "\u030c": {
            text: "\\v",
            math: "\\check"
        },
        "\u0302": {
            text: "\\^",
            math: "\\hat"
        },
        "\u0307": {
            text: "\\.",
            math: "\\dot"
        },
        "\u030a": {
            text: "\\r",
            math: "\\mathring"
        },
        "\u030b": {
            text: "\\H"
        },
        "\u0327": {
            text: "\\c"
        }
    }
      , zn = {
        \u00e1: "a\u0301",
        \u00e0: "a\u0300",
        \u00e4: "a\u0308",
        \u01df: "a\u0308\u0304",
        \u00e3: "a\u0303",
        \u0101: "a\u0304",
        \u0103: "a\u0306",
        \u1eaf: "a\u0306\u0301",
        \u1eb1: "a\u0306\u0300",
        \u1eb5: "a\u0306\u0303",
        \u01ce: "a\u030c",
        \u00e2: "a\u0302",
        \u1ea5: "a\u0302\u0301",
        \u1ea7: "a\u0302\u0300",
        \u1eab: "a\u0302\u0303",
        \u0227: "a\u0307",
        \u01e1: "a\u0307\u0304",
        \u00e5: "a\u030a",
        \u01fb: "a\u030a\u0301",
        \u1e03: "b\u0307",
        \u0107: "c\u0301",
        \u1e09: "c\u0327\u0301",
        \u010d: "c\u030c",
        \u0109: "c\u0302",
        \u010b: "c\u0307",
        \u00e7: "c\u0327",
        \u010f: "d\u030c",
        \u1e0b: "d\u0307",
        \u1e11: "d\u0327",
        \u00e9: "e\u0301",
        \u00e8: "e\u0300",
        \u00eb: "e\u0308",
        \u1ebd: "e\u0303",
        \u0113: "e\u0304",
        \u1e17: "e\u0304\u0301",
        \u1e15: "e\u0304\u0300",
        \u0115: "e\u0306",
        \u1e1d: "e\u0327\u0306",
        \u011b: "e\u030c",
        \u00ea: "e\u0302",
        \u1ebf: "e\u0302\u0301",
        \u1ec1: "e\u0302\u0300",
        \u1ec5: "e\u0302\u0303",
        \u0117: "e\u0307",
        \u0229: "e\u0327",
        \u1e1f: "f\u0307",
        \u01f5: "g\u0301",
        \u1e21: "g\u0304",
        \u011f: "g\u0306",
        \u01e7: "g\u030c",
        \u011d: "g\u0302",
        \u0121: "g\u0307",
        \u0123: "g\u0327",
        \u1e27: "h\u0308",
        \u021f: "h\u030c",
        \u0125: "h\u0302",
        \u1e23: "h\u0307",
        \u1e29: "h\u0327",
        \u00ed: "i\u0301",
        \u00ec: "i\u0300",
        \u00ef: "i\u0308",
        \u1e2f: "i\u0308\u0301",
        \u0129: "i\u0303",
        \u012b: "i\u0304",
        \u012d: "i\u0306",
        \u01d0: "i\u030c",
        \u00ee: "i\u0302",
        \u01f0: "j\u030c",
        \u0135: "j\u0302",
        \u1e31: "k\u0301",
        \u01e9: "k\u030c",
        \u0137: "k\u0327",
        \u013a: "l\u0301",
        \u013e: "l\u030c",
        \u013c: "l\u0327",
        \u1e3f: "m\u0301",
        \u1e41: "m\u0307",
        \u0144: "n\u0301",
        \u01f9: "n\u0300",
        \u00f1: "n\u0303",
        \u0148: "n\u030c",
        \u1e45: "n\u0307",
        \u0146: "n\u0327",
        \u00f3: "o\u0301",
        \u00f2: "o\u0300",
        \u00f6: "o\u0308",
        \u022b: "o\u0308\u0304",
        \u00f5: "o\u0303",
        \u1e4d: "o\u0303\u0301",
        \u1e4f: "o\u0303\u0308",
        \u022d: "o\u0303\u0304",
        \u014d: "o\u0304",
        \u1e53: "o\u0304\u0301",
        \u1e51: "o\u0304\u0300",
        \u014f: "o\u0306",
        \u01d2: "o\u030c",
        \u00f4: "o\u0302",
        \u1ed1: "o\u0302\u0301",
        \u1ed3: "o\u0302\u0300",
        \u1ed7: "o\u0302\u0303",
        \u022f: "o\u0307",
        \u0231: "o\u0307\u0304",
        \u0151: "o\u030b",
        \u1e55: "p\u0301",
        \u1e57: "p\u0307",
        \u0155: "r\u0301",
        \u0159: "r\u030c",
        \u1e59: "r\u0307",
        \u0157: "r\u0327",
        \u015b: "s\u0301",
        \u1e65: "s\u0301\u0307",
        \u0161: "s\u030c",
        \u1e67: "s\u030c\u0307",
        \u015d: "s\u0302",
        \u1e61: "s\u0307",
        \u015f: "s\u0327",
        \u1e97: "t\u0308",
        \u0165: "t\u030c",
        \u1e6b: "t\u0307",
        \u0163: "t\u0327",
        \u00fa: "u\u0301",
        \u00f9: "u\u0300",
        \u00fc: "u\u0308",
        \u01d8: "u\u0308\u0301",
        \u01dc: "u\u0308\u0300",
        \u01d6: "u\u0308\u0304",
        \u01da: "u\u0308\u030c",
        \u0169: "u\u0303",
        \u1e79: "u\u0303\u0301",
        \u016b: "u\u0304",
        \u1e7b: "u\u0304\u0308",
        \u016d: "u\u0306",
        \u01d4: "u\u030c",
        \u00fb: "u\u0302",
        \u016f: "u\u030a",
        \u0171: "u\u030b",
        \u1e7d: "v\u0303",
        \u1e83: "w\u0301",
        \u1e81: "w\u0300",
        \u1e85: "w\u0308",
        \u0175: "w\u0302",
        \u1e87: "w\u0307",
        \u1e98: "w\u030a",
        \u1e8d: "x\u0308",
        \u1e8b: "x\u0307",
        \u00fd: "y\u0301",
        \u1ef3: "y\u0300",
        \u00ff: "y\u0308",
        \u1ef9: "y\u0303",
        \u0233: "y\u0304",
        \u0177: "y\u0302",
        \u1e8f: "y\u0307",
        \u1e99: "y\u030a",
        \u017a: "z\u0301",
        \u017e: "z\u030c",
        \u1e91: "z\u0302",
        \u017c: "z\u0307",
        \u00c1: "A\u0301",
        \u00c0: "A\u0300",
        \u00c4: "A\u0308",
        \u01de: "A\u0308\u0304",
        \u00c3: "A\u0303",
        \u0100: "A\u0304",
        \u0102: "A\u0306",
        \u1eae: "A\u0306\u0301",
        \u1eb0: "A\u0306\u0300",
        \u1eb4: "A\u0306\u0303",
        \u01cd: "A\u030c",
        \u00c2: "A\u0302",
        \u1ea4: "A\u0302\u0301",
        \u1ea6: "A\u0302\u0300",
        \u1eaa: "A\u0302\u0303",
        \u0226: "A\u0307",
        \u01e0: "A\u0307\u0304",
        \u00c5: "A\u030a",
        \u01fa: "A\u030a\u0301",
        \u1e02: "B\u0307",
        \u0106: "C\u0301",
        \u1e08: "C\u0327\u0301",
        \u010c: "C\u030c",
        \u0108: "C\u0302",
        \u010a: "C\u0307",
        \u00c7: "C\u0327",
        \u010e: "D\u030c",
        \u1e0a: "D\u0307",
        \u1e10: "D\u0327",
        \u00c9: "E\u0301",
        \u00c8: "E\u0300",
        \u00cb: "E\u0308",
        \u1ebc: "E\u0303",
        \u0112: "E\u0304",
        \u1e16: "E\u0304\u0301",
        \u1e14: "E\u0304\u0300",
        \u0114: "E\u0306",
        \u1e1c: "E\u0327\u0306",
        \u011a: "E\u030c",
        \u00ca: "E\u0302",
        \u1ebe: "E\u0302\u0301",
        \u1ec0: "E\u0302\u0300",
        \u1ec4: "E\u0302\u0303",
        \u0116: "E\u0307",
        \u0228: "E\u0327",
        \u1e1e: "F\u0307",
        \u01f4: "G\u0301",
        \u1e20: "G\u0304",
        \u011e: "G\u0306",
        \u01e6: "G\u030c",
        \u011c: "G\u0302",
        \u0120: "G\u0307",
        \u0122: "G\u0327",
        \u1e26: "H\u0308",
        \u021e: "H\u030c",
        \u0124: "H\u0302",
        \u1e22: "H\u0307",
        \u1e28: "H\u0327",
        \u00cd: "I\u0301",
        \u00cc: "I\u0300",
        \u00cf: "I\u0308",
        \u1e2e: "I\u0308\u0301",
        \u0128: "I\u0303",
        \u012a: "I\u0304",
        \u012c: "I\u0306",
        \u01cf: "I\u030c",
        \u00ce: "I\u0302",
        \u0130: "I\u0307",
        \u0134: "J\u0302",
        \u1e30: "K\u0301",
        \u01e8: "K\u030c",
        \u0136: "K\u0327",
        \u0139: "L\u0301",
        \u013d: "L\u030c",
        \u013b: "L\u0327",
        \u1e3e: "M\u0301",
        \u1e40: "M\u0307",
        \u0143: "N\u0301",
        \u01f8: "N\u0300",
        \u00d1: "N\u0303",
        \u0147: "N\u030c",
        \u1e44: "N\u0307",
        \u0145: "N\u0327",
        \u00d3: "O\u0301",
        \u00d2: "O\u0300",
        \u00d6: "O\u0308",
        \u022a: "O\u0308\u0304",
        \u00d5: "O\u0303",
        \u1e4c: "O\u0303\u0301",
        \u1e4e: "O\u0303\u0308",
        \u022c: "O\u0303\u0304",
        \u014c: "O\u0304",
        \u1e52: "O\u0304\u0301",
        \u1e50: "O\u0304\u0300",
        \u014e: "O\u0306",
        \u01d1: "O\u030c",
        \u00d4: "O\u0302",
        \u1ed0: "O\u0302\u0301",
        \u1ed2: "O\u0302\u0300",
        \u1ed6: "O\u0302\u0303",
        \u022e: "O\u0307",
        \u0230: "O\u0307\u0304",
        \u0150: "O\u030b",
        \u1e54: "P\u0301",
        \u1e56: "P\u0307",
        \u0154: "R\u0301",
        \u0158: "R\u030c",
        \u1e58: "R\u0307",
        \u0156: "R\u0327",
        \u015a: "S\u0301",
        \u1e64: "S\u0301\u0307",
        \u0160: "S\u030c",
        \u1e66: "S\u030c\u0307",
        \u015c: "S\u0302",
        \u1e60: "S\u0307",
        \u015e: "S\u0327",
        \u0164: "T\u030c",
        \u1e6a: "T\u0307",
        \u0162: "T\u0327",
        \u00da: "U\u0301",
        \u00d9: "U\u0300",
        \u00dc: "U\u0308",
        \u01d7: "U\u0308\u0301",
        \u01db: "U\u0308\u0300",
        \u01d5: "U\u0308\u0304",
        \u01d9: "U\u0308\u030c",
        \u0168: "U\u0303",
        \u1e78: "U\u0303\u0301",
        \u016a: "U\u0304",
        \u1e7a: "U\u0304\u0308",
        \u016c: "U\u0306",
        \u01d3: "U\u030c",
        \u00db: "U\u0302",
        \u016e: "U\u030a",
        \u0170: "U\u030b",
        \u1e7c: "V\u0303",
        \u1e82: "W\u0301",
        \u1e80: "W\u0300",
        \u1e84: "W\u0308",
        \u0174: "W\u0302",
        \u1e86: "W\u0307",
        \u1e8c: "X\u0308",
        \u1e8a: "X\u0307",
        \u00dd: "Y\u0301",
        \u1ef2: "Y\u0300",
        \u0178: "Y\u0308",
        \u1ef8: "Y\u0303",
        \u0232: "Y\u0304",
        \u0176: "Y\u0302",
        \u1e8e: "Y\u0307",
        \u0179: "Z\u0301",
        \u017d: "Z\u030c",
        \u1e90: "Z\u0302",
        \u017b: "Z\u0307",
        \u03ac: "\u03b1\u0301",
        \u1f70: "\u03b1\u0300",
        \u1fb1: "\u03b1\u0304",
        \u1fb0: "\u03b1\u0306",
        \u03ad: "\u03b5\u0301",
        \u1f72: "\u03b5\u0300",
        \u03ae: "\u03b7\u0301",
        \u1f74: "\u03b7\u0300",
        \u03af: "\u03b9\u0301",
        \u1f76: "\u03b9\u0300",
        \u03ca: "\u03b9\u0308",
        \u0390: "\u03b9\u0308\u0301",
        \u1fd2: "\u03b9\u0308\u0300",
        \u1fd1: "\u03b9\u0304",
        \u1fd0: "\u03b9\u0306",
        \u03cc: "\u03bf\u0301",
        \u1f78: "\u03bf\u0300",
        \u03cd: "\u03c5\u0301",
        \u1f7a: "\u03c5\u0300",
        \u03cb: "\u03c5\u0308",
        \u03b0: "\u03c5\u0308\u0301",
        \u1fe2: "\u03c5\u0308\u0300",
        \u1fe1: "\u03c5\u0304",
        \u1fe0: "\u03c5\u0306",
        \u03ce: "\u03c9\u0301",
        \u1f7c: "\u03c9\u0300",
        \u038e: "\u03a5\u0301",
        \u1fea: "\u03a5\u0300",
        \u03ab: "\u03a5\u0308",
        \u1fe9: "\u03a5\u0304",
        \u1fe8: "\u03a5\u0306",
        \u038f: "\u03a9\u0301",
        \u1ffa: "\u03a9\u0300"
    };
    class An {
        constructor(e, t) {
            this.mode = void 0,
            this.gullet = void 0,
            this.settings = void 0,
            this.leftrightDepth = void 0,
            this.nextToken = void 0,
            this.mode = "math",
            this.gullet = new wn(e,t,this.mode),
            this.settings = t,
            this.leftrightDepth = 0
        }
        expect(e, t) {
            if (void 0 === t && (t = !0),
            this.fetch().text !== e)
                throw new D("Expected '" + e + "', got '" + this.fetch().text + "'",this.fetch());
            t && this.consume()
        }
        consume() {
            this.nextToken = null
        }
        fetch() {
            return null == this.nextToken && (this.nextToken = this.gullet.expandNextToken()),
            this.nextToken
        }
        switchMode(e) {
            this.mode = e,
            this.gullet.switchMode(e)
        }
        parse() {
            this.settings.globalGroup || this.gullet.beginGroup(),
            this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
            try {
                var e = this.parseExpression(!1);
                return this.expect("EOF"),
                this.settings.globalGroup || this.gullet.endGroup(),
                e
            } finally {
                this.gullet.endGroups()
            }
        }
        subparse(e) {
            var t = this.nextToken;
            this.consume(),
            this.gullet.pushToken(new L("}")),
            this.gullet.pushTokens(e);
            var r = this.parseExpression(!1);
            return this.expect("}"),
            this.nextToken = t,
            r
        }
        parseExpression(e, t) {
            for (var r = []; ; ) {
                "math" === this.mode && this.consumeSpaces();
                var a = this.fetch();
                if (-1 !== An.endOfExpression.indexOf(a.text))
                    break;
                if (t && a.text === t)
                    break;
                if (e && nn[a.text] && nn[a.text].infix)
                    break;
                var n = this.parseAtom(t);
                if (!n)
                    break;
                "internal" !== n.type && r.push(n)
            }
            return "text" === this.mode && this.formLigatures(r),
            this.handleInfixNodes(r)
        }
        handleInfixNodes(e) {
            for (var t, r = -1, a = 0; a < e.length; a++)
                if ("infix" === e[a].type) {
                    if (-1 !== r)
                        throw new D("only one infix operator per group",e[a].token);
                    r = a,
                    t = e[a].replaceWith
                }
            if (-1 !== r && t) {
                var n, i, o = e.slice(0, r), s = e.slice(r + 1);
                return n = 1 === o.length && "ordgroup" === o[0].type ? o[0] : {
                    type: "ordgroup",
                    mode: this.mode,
                    body: o
                },
                i = 1 === s.length && "ordgroup" === s[0].type ? s[0] : {
                    type: "ordgroup",
                    mode: this.mode,
                    body: s
                },
                ["\\\\abovefrac" === t ? this.callFunction(t, [n, e[r], i], []) : this.callFunction(t, [n, i], [])]
            }
            return e
        }
        handleSupSubscript(e) {
            var t = this.fetch()
              , r = t.text;
            this.consume(),
            this.consumeSpaces();
            var a = this.parseGroup(e);
            if (!a)
                throw new D("Expected group after '" + r + "'",t);
            return a
        }
        formatUnsupportedCmd(e) {
            for (var t = [], r = 0; r < e.length; r++)
                t.push({
                    type: "textord",
                    mode: "text",
                    text: e[r]
                });
            var a = {
                type: "text",
                mode: this.mode,
                body: t
            };
            return {
                type: "color",
                mode: this.mode,
                color: this.settings.errorColor,
                body: [a]
            }
        }
        parseAtom(e) {
            var t, r, a = this.parseGroup("atom", e);
            if ("text" === this.mode)
                return a;
            for (; ; ) {
                this.consumeSpaces();
                var n = this.fetch();
                if ("\\limits" === n.text || "\\nolimits" === n.text) {
                    if (a && "op" === a.type) {
                        var i = "\\limits" === n.text;
                        a.limits = i,
                        a.alwaysHandleSupSub = !0
                    } else {
                        if (!a || "operatorname" !== a.type)
                            throw new D("Limit controls must follow a math operator",n);
                        a.alwaysHandleSupSub && (a.limits = "\\limits" === n.text)
                    }
                    this.consume()
                } else if ("^" === n.text) {
                    if (t)
                        throw new D("Double superscript",n);
                    t = this.handleSupSubscript("superscript")
                } else if ("_" === n.text) {
                    if (r)
                        throw new D("Double subscript",n);
                    r = this.handleSupSubscript("subscript")
                } else if ("'" === n.text) {
                    if (t)
                        throw new D("Double superscript",n);
                    var o = {
                        type: "textord",
                        mode: this.mode,
                        text: "\\prime"
                    }
                      , s = [o];
                    for (this.consume(); "'" === this.fetch().text; )
                        s.push(o),
                        this.consume();
                    "^" === this.fetch().text && s.push(this.handleSupSubscript("superscript")),
                    t = {
                        type: "ordgroup",
                        mode: this.mode,
                        body: s
                    }
                } else {
                    if (!Sn[n.text])
                        break;
                    var l = kn.test(n.text)
                      , h = [];
                    for (h.push(new L(Sn[n.text])),
                    this.consume(); ; ) {
                        var m = this.fetch().text;
                        if (!Sn[m])
                            break;
                        if (kn.test(m) !== l)
                            break;
                        h.unshift(new L(Sn[m])),
                        this.consume()
                    }
                    var c = this.subparse(h);
                    l ? r = {
                        type: "ordgroup",
                        mode: "math",
                        body: c
                    } : t = {
                        type: "ordgroup",
                        mode: "math",
                        body: c
                    }
                }
            }
            return t || r ? {
                type: "supsub",
                mode: this.mode,
                base: a,
                sup: t,
                sub: r
            } : a
        }
        parseFunction(e, t) {
            var r = this.fetch()
              , a = r.text
              , n = nn[a];
            if (!n)
                return null;
            if (this.consume(),
            t && "atom" !== t && !n.allowedInArgument)
                throw new D("Got function '" + a + "' with no arguments" + (t ? " as " + t : ""),r);
            if ("text" === this.mode && !n.allowedInText)
                throw new D("Can't use function '" + a + "' in text mode",r);
            if ("math" === this.mode && !1 === n.allowedInMath)
                throw new D("Can't use function '" + a + "' in math mode",r);
            var {args: i, optArgs: o} = this.parseArguments(a, n);
            return this.callFunction(a, i, o, r, e)
        }
        callFunction(e, t, r, a, n) {
            var i = {
                funcName: e,
                parser: this,
                token: a,
                breakOnTokenText: n
            }
              , o = nn[e];
            if (o && o.handler)
                return o.handler(i, t, r);
            throw new D("No function handler for " + e)
        }
        parseArguments(e, t) {
            var r = t.numArgs + t.numOptionalArgs;
            if (0 === r)
                return {
                    args: [],
                    optArgs: []
                };
            for (var a = [], n = [], i = 0; i < r; i++) {
                var o = t.argTypes && t.argTypes[i]
                  , s = i < t.numOptionalArgs;
                (t.primitive && null == o || "sqrt" === t.type && 1 === i && null == n[0]) && (o = "primitive");
                var l = this.parseGroupOfType("argument to '" + e + "'", o, s);
                if (s)
                    n.push(l);
                else {
                    if (null == l)
                        throw new D("Null argument, please report this as a bug");
                    a.push(l)
                }
            }
            return {
                args: a,
                optArgs: n
            }
        }
        parseGroupOfType(e, t, r) {
            switch (t) {
            case "color":
                return this.parseColorGroup(r);
            case "size":
                return this.parseSizeGroup(r);
            case "url":
                return this.parseUrlGroup(r);
            case "math":
            case "text":
                return this.parseArgumentGroup(r, t);
            case "hbox":
                var a = this.parseArgumentGroup(r, "text");
                return null != a ? {
                    type: "styling",
                    mode: a.mode,
                    body: [a],
                    style: "text"
                } : null;
            case "raw":
                var n = this.parseStringGroup("raw", r);
                return null != n ? {
                    type: "raw",
                    mode: "text",
                    string: n.text
                } : null;
            case "primitive":
                if (r)
                    throw new D("A primitive argument cannot be optional");
                var i = this.parseGroup(e);
                if (null == i)
                    throw new D("Expected group as " + e,this.fetch());
                return i;
            case "original":
            case null:
            case void 0:
                return this.parseArgumentGroup(r);
            default:
                throw new D("Unknown group type as " + e,this.fetch())
            }
        }
        consumeSpaces() {
            for (; " " === this.fetch().text; )
                this.consume()
        }
        parseStringGroup(e, t) {
            var r = this.gullet.scanArgument(t);
            if (null == r)
                return null;
            for (var a, n = ""; "EOF" !== (a = this.fetch()).text; )
                n += a.text,
                this.consume();
            return this.consume(),
            r.text = n,
            r
        }
        parseRegexGroup(e, t) {
            for (var r, a = this.fetch(), n = a, i = ""; "EOF" !== (r = this.fetch()).text && e.test(i + r.text); )
                i += (n = r).text,
                this.consume();
            if ("" === i)
                throw new D("Invalid " + t + ": '" + a.text + "'",a);
            return a.range(n, i)
        }
        parseColorGroup(e) {
            var t = this.parseStringGroup("color", e);
            if (null == t)
                return null;
            var r = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);
            if (!r)
                throw new D("Invalid color: '" + t.text + "'",t);
            var a = r[0];
            return /^[0-9a-f]{6}$/i.test(a) && (a = "#" + a),
            {
                type: "color-token",
                mode: this.mode,
                color: a
            }
        }
        parseSizeGroup(e) {
            var t, r = !1;
            if (this.gullet.consumeSpaces(),
            !(t = e || "{" === this.gullet.future().text ? this.parseStringGroup("size", e) : this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size")))
                return null;
            e || 0 !== t.text.length || (t.text = "0pt",
            r = !0);
            var a = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);
            if (!a)
                throw new D("Invalid size: '" + t.text + "'",t);
            var n = {
                number: +(a[1] + a[2]),
                unit: a[3]
            };
            if (!Me(n))
                throw new D("Invalid unit: '" + n.unit + "'",t);
            return {
                type: "size",
                mode: this.mode,
                value: n,
                isBlank: r
            }
        }
        parseUrlGroup(e) {
            this.gullet.lexer.setCatcode("%", 13),
            this.gullet.lexer.setCatcode("~", 12);
            var t = this.parseStringGroup("url", e);
            if (this.gullet.lexer.setCatcode("%", 14),
            this.gullet.lexer.setCatcode("~", 13),
            null == t)
                return null;
            var r = t.text.replace(/\\([#$%&~_^{}])/g, "$1");
            return {
                type: "url",
                mode: this.mode,
                url: r
            }
        }
        parseArgumentGroup(e, t) {
            var r = this.gullet.scanArgument(e);
            if (null == r)
                return null;
            var a = this.mode;
            t && this.switchMode(t),
            this.gullet.beginGroup();
            var n = this.parseExpression(!1, "EOF");
            this.expect("EOF"),
            this.gullet.endGroup();
            var i = {
                type: "ordgroup",
                mode: this.mode,
                loc: r.loc,
                body: n
            };
            return t && this.switchMode(a),
            i
        }
        parseGroup(e, t) {
            var r, a = this.fetch(), n = a.text;
            if ("{" === n || "\\begingroup" === n) {
                this.consume();
                var i = "{" === n ? "}" : "\\endgroup";
                this.gullet.beginGroup();
                var o = this.parseExpression(!1, i)
                  , s = this.fetch();
                this.expect(i),
                this.gullet.endGroup(),
                r = {
                    type: "ordgroup",
                    mode: this.mode,
                    loc: E.range(a, s),
                    body: o,
                    semisimple: "\\begingroup" === n || void 0
                }
            } else if (null == (r = this.parseFunction(t, e) || this.parseSymbol()) && "\\" === n[0] && !xn.hasOwnProperty(n)) {
                if (this.settings.throwOnError)
                    throw new D("Undefined control sequence: " + n,a);
                r = this.formatUnsupportedCmd(n),
                this.consume()
            }
            return r
        }
        formLigatures(e) {
            for (var t = e.length - 1, r = 0; r < t; ++r) {
                var a = e[r]
                  , n = a.text;
                "-" === n && "-" === e[r + 1].text && (r + 1 < t && "-" === e[r + 2].text ? (e.splice(r, 3, {
                    type: "textord",
                    mode: "text",
                    loc: E.range(a, e[r + 2]),
                    text: "---"
                }),
                t -= 2) : (e.splice(r, 2, {
                    type: "textord",
                    mode: "text",
                    loc: E.range(a, e[r + 1]),
                    text: "--"
                }),
                t -= 1)),
                "'" !== n && "`" !== n || e[r + 1].text !== n || (e.splice(r, 2, {
                    type: "textord",
                    mode: "text",
                    loc: E.range(a, e[r + 1]),
                    text: n + n
                }),
                t -= 1)
            }
        }
        parseSymbol() {
            var e = this.fetch()
              , t = e.text;
            if (/^\\verb[^a-zA-Z]/.test(t)) {
                this.consume();
                var r = t.slice(5)
                  , a = "*" === r.charAt(0);
                if (a && (r = r.slice(1)),
                r.length < 2 || r.charAt(0) !== r.slice(-1))
                    throw new D("\\verb assertion failed --\n                    please report what input caused this bug");
                return {
                    type: "verb",
                    mode: "text",
                    body: r = r.slice(1, -1),
                    star: a
                }
            }
            zn.hasOwnProperty(t[0]) && !Ge[this.mode][t[0]] && (this.settings.strict && "math" === this.mode && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + t[0] + '" used in math mode', e),
            t = zn[t[0]] + t.slice(1));
            var n, i = hn.exec(t);
            if (i && ("i" === (t = t.substring(0, i.index)) ? t = "\u0131" : "j" === t && (t = "\u0237")),
            Ge[this.mode][t]) {
                this.settings.strict && "math" === this.mode && "\xd0\xde\xfe".indexOf(t) >= 0 && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + t[0] + '" used in math mode', e);
                var o, s = Ge[this.mode][t].group, l = E.range(e);
                if (Ve.hasOwnProperty(s)) {
                    var h = s;
                    o = {
                        type: "atom",
                        mode: this.mode,
                        family: h,
                        loc: l,
                        text: t
                    }
                } else
                    o = {
                        type: s,
                        mode: this.mode,
                        loc: l,
                        text: t
                    };
                n = o
            } else {
                if (!(t.charCodeAt(0) >= 128))
                    return null;
                this.settings.strict && (me(t.charCodeAt(0)) ? "math" === this.mode && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + t[0] + '" used in math mode', e) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + t[0] + '" (' + t.charCodeAt(0) + ")", e)),
                n = {
                    type: "textord",
                    mode: "text",
                    loc: E.range(e),
                    text: t
                }
            }
            if (this.consume(),
            i)
                for (var m = 0; m < i[0].length; m++) {
                    var c = i[0][m];
                    if (!Mn[c])
                        throw new D("Unknown accent ' " + c + "'",e);
                    var p = Mn[c][this.mode] || Mn[c].text;
                    if (!p)
                        throw new D("Accent " + c + " unsupported in " + this.mode + " mode",e);
                    n = {
                        type: "accent",
                        mode: this.mode,
                        loc: E.range(e),
                        label: p,
                        isStretchy: !1,
                        isShifty: !0,
                        base: n
                    }
                }
            return n
        }
    }
    An.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
    "undefined" != typeof document && "CSS1Compat" !== document.compatMode && "undefined" != typeof console && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.");
    var Tn = function(e, t) {
        var r = new J(t);
        try {
            return function(e, t, r) {
                var a, n = function(e) {
                    return new we({
                        style: e.displayMode ? se.DISPLAY : se.TEXT,
                        maxSize: e.maxSize,
                        minRuleThickness: e.minRuleThickness
                    })
                }(r);
                if ("mathml" === r.output)
                    return gr(e, t, n, r.displayMode, !0);
                if ("html" === r.output) {
                    var i = nr(e, n);
                    a = It.makeSpan(["katex"], [i])
                } else {
                    var o = gr(e, t, n, r.displayMode, !1)
                      , s = nr(e, n);
                    a = It.makeSpan(["katex"], [o, s])
                }
                return function(e, t) {
                    if (t.displayMode) {
                        var r = ["katex-display"];
                        t.leqno && r.push("leqno"),
                        t.fleqn && r.push("fleqn"),
                        e = It.makeSpan(r, [e])
                    }
                    return e
                }(a, r)
            }(function(e, t) {
                if (!("string" == typeof e || e instanceof String))
                    throw new TypeError("KaTeX can only parse string typed expression");
                var r = new An(e,t);
                delete r.gullet.macros.current["\\df@tag"];
                var a = r.parse();
                if (delete r.gullet.macros.current["\\current@color"],
                delete r.gullet.macros.current["\\color"],
                r.gullet.macros.get("\\df@tag")) {
                    if (!t.displayMode)
                        throw new D("\\tag works only in display equations");
                    a = [{
                        type: "tag",
                        mode: "text",
                        body: a,
                        tag: r.subparse([new L("\\df@tag")])
                    }]
                }
                return a
            }(e, r), e, r)
        } catch (t) {
            return function(e, t, r) {
                if (r.throwOnError || !(e instanceof D))
                    throw e;
                var a = It.makeSpan(["katex-error"], [new Oe(t)]);
                return a.setAttribute("title", e.toString()),
                a.setAttribute("style", "color:" + r.errorColor),
                a
            }(t, e, r)
        }
    };
    const Bn = (e,t,r)=>`<tiny-math-${e}${t.map((e=>` formula="${tinymce.DOM.encode(e)}"`)).getOr("")}>${r}</tiny-math-${e}>`
      , Nn = e=>g(e) && "math" === d(e)
      , Cn = (e,t)=>{
        return (n = x((r = e.trim(),
        a = {
            output: "mathml",
            throwOnError: !1
        },
        Tn(r, a).toMarkup())),
        z(n, 0)).filter(Nn).map((r=>(A(r).bind(A).each((e=>{
            (e=>g(e) && "annotation" === d(e) && "application/x-tex" === f(e, "encoding"))(e) && B(e)
        }
        )),
        Bn(t, c.some(e), O(r)))));
        var r, a, n
    }
      , qn = (e,t)=>{
        return (r = ((e,t)=>{
            const r = document.createElement("div");
            return r.innerHTML = e,
            M(k(r))
        }
        )(e),
        a = Nn,
        ((e,t,r)=>{
            for (let a = 0, n = e.length; a < n; a++) {
                const n = e[a];
                if (t(n, a))
                    return c.some(n);
                if (r(n, a))
                    break
            }
            return c.none()
        }
        )(r, a, m)).map((e=>Bn(t, c.none(), O(e))));
        var r, a
    }
      , In = (e,t,r)=>"" === e.trim() ? c.none() : "latex" === r ? Cn(e, t) : qn(e, t)
      , Rn = e=>{
        const t = e.selection.getNode()
          , r = (()=>{
            const e = (e=>{
                const t = (e=>{
                    let t = e;
                    return {
                        get: ()=>t,
                        set: e=>{
                            t = e
                        }
                    }
                }
                )(c.none())
                  , r = ()=>t.get().each(e);
                return {
                    clear: ()=>{
                        r(),
                        t.set(c.none())
                    }
                    ,
                    isSet: ()=>t.get().isSome(),
                    get: ()=>t.get(),
                    set: e=>{
                        r(),
                        t.set(c.some(e))
                    }
                }
            }
            )(h);
            return {
                ...e,
                on: t=>e.get().each(t)
            }
        }
        )()
          , a = I(n = t) && !n.getAttribute("formula") ? "mathml" : "latex";
        var n;
        const i = (t,r,a)=>"" === t.trim() ? "" : ((e,t,r,a)=>In(t, r, a).map((t=>((e,t)=>{
            const r = tinymce.html.DomParser({}, e.schema).parse(t, {
                forced_root_block: !1,
                isRootContent: !0
            });
            return tinymce.html.Serializer({
                validate: !0
            }, e.schema).serialize(r)
        }
        )(e, t))))(e, t, r, a).getOr("")
          , o = e=>{
            r.get().each((t=>{
                c.from(t.dom.shadowRoot).map(k).each((t=>{
                    var r;
                    (r = t).dom.textContent = "",
                    u(M(r), (e=>{
                        B(e)
                    }
                    )),
                    e && T(t, x(e))
                }
                ))
            }
            ))
        }
          , s = "mathml" === a ? t.innerHTML : I(t) ? c.from(t.getAttribute("formula")).getOr("") : ""
          , l = (e=>e.nodeName.toLowerCase() === C)(t) ? "inline" : "block"
          , m = {
            formula: s,
            language: a,
            presentation: l
        };
        e.windowManager.open({
            title: "Insert/Edit Math",
            size: "large",
            body: {
                type: "panel",
                items: [{
                    name: "language",
                    type: "listbox",
                    label: "Language",
                    items: [{
                        value: "latex",
                        text: "LaTeX"
                    }, {
                        value: "mathml",
                        text: "MathML"
                    }]
                }, {
                    name: "formula",
                    type: "textarea",
                    label: "Formula"
                }, {
                    name: "presentation",
                    type: "listbox",
                    label: "Text Wrap",
                    items: [{
                        value: "block",
                        text: "Text above and below"
                    }, {
                        value: "inline",
                        text: "Inline with text"
                    }]
                }, {
                    type: "htmlpanel",
                    presets: "presentation",
                    stretched: !0,
                    html: "",
                    onInit: e=>{
                        const t = k(e)
                          , n = w("label");
                        b(n, "tox-label"),
                        ((e,t)=>{
                            e.dom.textContent = t
                        }
                        )(n, tinymce.i18n.translate("Preview")),
                        T(t, n);
                        const h = w("div");
                        b(h, "tox-custom-preview"),
                        r.set(h),
                        T(t, h),
                        h.dom.attachShadow({
                            mode: "open"
                        }),
                        o(i(s, l, a))
                    }
                }]
            },
            buttons: [{
                type: "cancel",
                name: "cancel",
                text: "Cancel",
                align: "end"
            }, {
                type: "submit",
                name: "save",
                text: "Save",
                primary: !0,
                align: "end"
            }],
            initialData: m,
            onSubmit: r=>{
                const a = r.getData();
                In(a.formula, a.presentation, a.language).fold((()=>{
                    I(t) && e.execCommand("Delete")
                }
                ), (r=>{
                    const a = k(e.getBody())
                      , n = ((e,t)=>{
                        for (let r = 0, a = e.length; r < a; r++)
                            if (t(e[r]))
                                return c.some(r);
                        return c.none()
                    }
                    )(H(a), (e=>e.dom === t));
                    e.insertContent(r),
                    n.each((t=>((e,t)=>t >= 0 && t < e.length ? c.some(e[t]) : c.none())(H(a), t).each((t=>e.selection.select(t.dom)))))
                }
                )),
                (e=>{
                    e.dispatch("MathDialogSubmit")
                }
                )(e),
                r.close()
            }
            ,
            onChange: e=>{
                const {formula: t, presentation: r, language: a} = e.getData();
                o(i(t, r, a))
            }
        })
    }
      , Hn = (e,t,r)=>{
        u(e, (e=>{
            r.source_view && e.attr("formula") && e.empty(),
            e.attr("contenteditable", null)
        }
        ))
    }
      , On = e=>{
        (e=>{
            e.addCommand("Math", (()=>{
                Rn(e)
            }
            ))
        }
        )(e),
        (e=>{
            const t = "math-equation"
              , r = ()=>e.execCommand("Math");
            e.ui.registry.addToggleButton("math", {
                icon: t,
                tooltip: "Insert/edit math",
                onAction: r,
                onSetup: t=>{
                    const r = e.selection.getNode();
                    t.setActive(I(r));
                    const a = e.selection.selectorChangedWithUnbind(`${C},${q}`, t.setActive);
                    return ()=>{
                        a.unbind()
                    }
                }
            }),
            e.ui.registry.addMenuItem("math", {
                icon: t,
                text: "Math...",
                onAction: r
            }),
            e.ui.registry.addContextMenu("math", {
                update: t=>R(t, e.getBody()) ? ["math"] : []
            })
        }
        )(e),
        (e=>{
            e.on("PreInit", (()=>{
                e.schema.addCustomElements({
                    [q]: {
                        extends: "div",
                        attributes: ["formula"],
                        children: ["math"]
                    },
                    [C]: {
                        extends: "span",
                        attributes: ["formula"],
                        children: ["math"]
                    },
                    math: {
                        attributes: ["display"]
                    }
                })
            }
            ))
        }
        )(e),
        (e=>{
            e.on("PreInit", (()=>{
                const t = `${q}, ${C}`;
                e.parser.addNodeFilter(t, (e=>t=>{
                    u(t, (t=>{
                        var r;
                        const a = t.name === q ? "block" : "inline"
                          , n = t.attr("formula");
                        n && "math" !== (null === (r = t.firstChild) || void 0 === r ? void 0 : r.name) && In(n, a, "latex").each((r=>{
                            t.replace(e.parser.parse(r).getAll("block" === a ? q : C)[0])
                        }
                        )),
                        t.attr("contenteditable", "false")
                    }
                    ))
                }
                )(e)),
                e.serializer.addNodeFilter(t, Hn)
            }
            ))
        }
        )(e)
    }
    ;
    tinymce.PluginManager.requireLangPack("math", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("math", (e=>{
        ((e,r)=>!!e && -1 === ((e,r)=>{
            const a = t(e.major, r.major);
            if (0 !== a)
                return a;
            const n = t(e.minor, r.minor);
            if (0 !== n)
                return n;
            const i = t(e.patch, r.patch);
            return 0 !== i ? i : 0
        }
        )((e=>a((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), a(r)))(tinymce, "7.1.0") ? console.error("The math plugin requires at least version 7.1.0 of TinyMCE.") : (On(e),
        e.on("dblclick", (t=>{
            R(t.target, e.getBody()) && e.execCommand("Math")
        }
        )))
    }
    ))
}();