/*!
 * Tiny Markdown plugin
 *
 * Copyright (c) 2024 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 7.3.0-86
 */

!function() {
    "use strict";
    var e = function(e) {
        if (null === e)
            return "null";
        if (void 0 === e)
            return "undefined";
        var t = typeof e;
        return "object" === t && (Array.prototype.isPrototypeOf(e) || e.constructor && "Array" === e.constructor.name) ? "array" : "object" === t && (String.prototype.isPrototypeOf(e) || e.constructor && "String" === e.constructor.name) ? "string" : t
    }
      , t = function(t) {
        return function(n) {
            return e(n) === t
        }
    }
      , n = t("string")
      , r = t("object")
      , s = t("array")
      , i = t("null")
      , o = t("boolean")
      , l = t("undefined")
      , a = t("function")
      , c = t("number")
      , u = function(e, t, n) {
        for (var r = e.length, s = new Array(r), i = 0; i < r - 1; i++) {
            var o = e[i];
            s[i] = n(t(o))
        }
        return r > 0 && (s[r - 1] = t(e[r - 1])),
        s
    }
      , h = function(e) {
        return {
            eq: e
        }
    }
      , p = h((function(e, t) {
        return e === t
    }
    ))
      , f = p
      , g = p
      , d = p
      , k = p
      , m = function(e) {
        return h((function(t, n) {
            if (t.length !== n.length)
                return !1;
            for (var r = t.length, s = 0; s < r; s++)
                if (!e.eq(t[s], n[s]))
                    return !1;
            return !0
        }
        ))
    }
      , x = h((function(t, n) {
        if (t === n)
            return !0;
        var r, s = e(t);
        return s === e(n) && (function(e) {
            return -1 !== ["undefined", "boolean", "number", "string", "function", "xml", "null"].indexOf(e)
        }(s) ? t === n : "array" === s ? m(x).eq(t, n) : "object" === s && (r = x,
        h((function(e, t) {
            var n = Object.keys(e)
              , s = Object.keys(t);
            if (!function(e, t) {
                return function(e, t) {
                    return h((function(n, r) {
                        return e.eq(t(n), t(r))
                    }
                    ))
                }(m(e), (function(e) {
                    return function(e, t) {
                        return Array.prototype.slice.call(e).sort(t)
                    }(e, t)
                }
                ))
            }(f).eq(n, s))
                return !1;
            for (var i = n.length, o = 0; o < i; o++) {
                var l = n[o];
                if (!r.eq(e[l], t[l]))
                    return !1
            }
            return !0
        }
        ))).eq(t, n))
    }
    ))
      , b = function(e) {
        return '"' + e.replace(/"/g, '\\"') + '"'
    }
      , w = function(e) {
        return {
            show: e
        }
    }
      , y = function(e) {
        return w((function() {
            return e
        }
        ))
    }
      , v = w((function(e) {
        return String(e)
    }
    ))
      , _ = y("undefined")
      , $ = y("null")
      , A = v
      , T = v
      , R = w((function(e) {
        return b(e)
    }
    ))
      , S = y("function() {...}")
      , E = function() {
        return E = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var s in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
            return e
        }
        ,
        E.apply(this, arguments)
    };
    "function" == typeof SuppressedError && SuppressedError;
    var z = function(e, t, n) {
        return {
            start: e,
            children: t,
            end: n
        }
    }
      , C = function(e) {
        return t = function(t) {
            return t + e
        }
        ,
        function(e) {
            return (n = t(e.end),
            function(e) {
                return E(E({}, e), {
                    end: n
                })
            }
            )(e);
            var n
        }
        ;
        var t
    }
      , O = function(e) {
        return {
            pprint: e
        }
    }
      , D = function(e) {
        return O((function(t) {
            return n = e.show(t),
            z(n, [], "");
            var n
        }
        ))
    }
      , I = D(_)
      , N = D($)
      , P = D(R)
      , M = D(A)
      , B = D(T)
      , L = D(S)
      , q = D(v)
      , j = function(e) {
        return O((function(t) {
            var n = function(e) {
                for (var t = [], n = Object.keys(e), r = n.length, s = 0; s < r; s++) {
                    var i = n[s]
                      , o = e[i];
                    t.push([i, o])
                }
                return t
            }(t)
              , r = u(n, (function(t) {
                var n, r, s = t[0], i = t[1], o = e.pprint(i), l = b(s) + ": ";
                return (n = l,
                r = function(e) {
                    return n + e
                }
                ,
                function(e) {
                    return (t = r(e.start),
                    function(e) {
                        return E(E({}, e), {
                            start: t
                        })
                    }
                    )(e);
                    var t
                }
                )(o)
            }
            ), C(","));
            return z("{", r, "}")
        }
        ))
    }
      , H = O((function(e) {
        return l(e) ? I.pprint(e) : i(e) ? N.pprint(e) : c(e) ? B.pprint(e) : o(e) ? M.pprint(e) : a(e) ? L.pprint(e) : n(e) ? P.pprint(e) : s(e) ? (t = H,
        O((function(e) {
            var n = u(e, t.pprint, C(","));
            return z("[", n, "]")
        }
        ))).pprint(e) : r(e) ? j(H).pprint(e) : q.pprint(e);
        var t
    }
    ))
      , Z = function(e, t) {
        return E(E({}, e), t)
    };
    Z(d, I),
    Z(k, N),
    Z(f, P),
    Z(g, B),
    Z(x, H),
    Z(p, H);
    const F = e=>t=>(e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (n = r = e,
        (s = String).prototype.isPrototypeOf(n) || (null === (i = r.constructor) || void 0 === i ? void 0 : i.name) === s.name) ? "string" : t;
        var n, r, s, i
    }
    )(t) === e
      , U = F("string")
      , Q = F("array")
      , V = e=>null == e
      , W = ("function",
    e=>"function" == typeof e);
    const G = ()=>{}
      , K = e=>()=>e;
    K(!0);
    class X {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new X(!0,e)
        }
        static none() {
            return X.singletonNone
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
            return this.tag ? X.some(e(this.value)) : X.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : X.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : X.none()
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
            return V(e) ? X.none() : X.some(e)
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
    X.singletonNone = new X(!1);
    const Y = Array.prototype.indexOf
      , J = (e,t)=>{
        return n = e,
        r = t,
        Y.call(n, r) > -1;
        var n, r
    }
      , ee = (e,t)=>{
        for (let n = 0, r = e.length; n < r; n++)
            t(e[n], n)
    }
      , te = Object.keys
      , ne = e=>{
        if (!Q(e))
            throw new Error("cases must be an array");
        if (0 === e.length)
            throw new Error("there must be at least one case");
        const t = []
          , n = {};
        return ee(e, ((r,s)=>{
            const i = te(r);
            if (1 !== i.length)
                throw new Error("one and only one name per case");
            const o = i[0]
              , l = r[o];
            if (void 0 !== n[o])
                throw new Error("duplicate key detected:" + o);
            if ("cata" === o)
                throw new Error("cannot have a case named cata (sorry)");
            if (!Q(l))
                throw new Error("case arguments must be an array");
            t.push(o),
            n[o] = (...n)=>{
                const r = n.length;
                if (r !== l.length)
                    throw new Error("Wrong number of arguments to case " + o + ". Expected " + l.length + " (" + l + "), got " + r);
                return {
                    fold: (...t)=>{
                        if (t.length !== e.length)
                            throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                        return t[s].apply(null, n)
                    }
                    ,
                    match: e=>{
                        const r = te(e);
                        if (t.length !== r.length)
                            throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + r.join(","));
                        if (!((e,t)=>{
                            for (let t = 0, s = e.length; t < s; ++t)
                                if (!0 !== (n = e[t],
                                J(r, n)))
                                    return !1;
                            var n;
                            return !0
                        }
                        )(t))
                            throw new Error("Not all branches were specified when using match. Specified: " + r.join(", ") + "\nRequired: " + t.join(", "));
                        return e[o].apply(null, n)
                    }
                    ,
                    log: e=>{
                        console.log(e, {
                            constructors: t,
                            constructor: o,
                            params: n
                        })
                    }
                }
            }
        }
        )),
        n
    }
    ;
    "undefined" != typeof window ? window : Function("return this;")(),
    ne([{
        bothErrors: ["error1", "error2"]
    }, {
        firstError: ["error1", "value2"]
    }, {
        secondError: ["value1", "error2"]
    }, {
        bothValues: ["value1", "value2"]
    }]);
    const re = ne([{
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
    }]);
    re.starts,
    re.pattern,
    re.contains,
    re.exact,
    re.all,
    re.not;
    let se = {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
    };
    function ie(e) {
        se = e
    }
    const oe = /[&<>"']/
      , le = new RegExp(oe.source,"g")
      , ae = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/
      , ce = new RegExp(ae.source,"g")
      , ue = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }
      , he = e=>ue[e];
    function pe(e, t) {
        if (t) {
            if (oe.test(e))
                return e.replace(le, he)
        } else if (ae.test(e))
            return e.replace(ce, he);
        return e
    }
    const fe = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi
      , ge = /(^|[^\[])\^/g;
    function de(e, t) {
        e = "string" == typeof e ? e : e.source,
        t = t || "";
        const n = {
            replace: (t,r)=>(r = (r = "object" == typeof r && "source"in r ? r.source : r).replace(ge, "$1"),
            e = e.replace(t, r),
            n),
            getRegex: ()=>new RegExp(e,t)
        };
        return n
    }
    function ke(e) {
        try {
            e = encodeURI(e).replace(/%25/g, "%")
        } catch (e) {
            return null
        }
        return e
    }
    const me = {
        exec: ()=>null
    };
    function xe(e, t) {
        const n = e.replace(/\|/g, ((e,t,n)=>{
            let r = !1
              , s = t;
            for (; --s >= 0 && "\\" === n[s]; )
                r = !r;
            return r ? "|" : " |"
        }
        )).split(/ \|/);
        let r = 0;
        if (n[0].trim() || n.shift(),
        n.length > 0 && !n[n.length - 1].trim() && n.pop(),
        t)
            if (n.length > t)
                n.splice(t);
            else
                for (; n.length < t; )
                    n.push("");
        for (; r < n.length; r++)
            n[r] = n[r].trim().replace(/\\\|/g, "|");
        return n
    }
    function be(e, t, n) {
        const r = e.length;
        if (0 === r)
            return "";
        let s = 0;
        for (; s < r; ) {
            const i = e.charAt(r - s - 1);
            if (i !== t || n) {
                if (i === t || !n)
                    break;
                s++
            } else
                s++
        }
        return e.slice(0, r - s)
    }
    function we(e, t, n, r) {
        const s = t.href
          , i = t.title ? pe(t.title) : null
          , o = e[1].replace(/\\([\[\]])/g, "$1");
        if ("!" !== e[0].charAt(0)) {
            r.state.inLink = !0;
            const e = {
                type: "link",
                raw: n,
                href: s,
                title: i,
                text: o,
                tokens: r.inlineTokens(o)
            };
            return r.state.inLink = !1,
            e
        }
        return {
            type: "image",
            raw: n,
            href: s,
            title: i,
            text: pe(o)
        }
    }
    class ye {
        options;
        rules;
        lexer;
        constructor(e) {
            this.options = e || se
        }
        space(e) {
            const t = this.rules.block.newline.exec(e);
            if (t && t[0].length > 0)
                return {
                    type: "space",
                    raw: t[0]
                }
        }
        code(e) {
            const t = this.rules.block.code.exec(e);
            if (t) {
                const e = t[0].replace(/^ {1,4}/gm, "");
                return {
                    type: "code",
                    raw: t[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic ? e : be(e, "\n")
                }
            }
        }
        fences(e) {
            const t = this.rules.block.fences.exec(e);
            if (t) {
                const e = t[0]
                  , n = function(e, t) {
                    const n = e.match(/^(\s+)(?:```)/);
                    if (null === n)
                        return t;
                    const r = n[1];
                    return t.split("\n").map((e=>{
                        const t = e.match(/^\s+/);
                        if (null === t)
                            return e;
                        const [n] = t;
                        return n.length >= r.length ? e.slice(r.length) : e
                    }
                    )).join("\n")
                }(e, t[3] || "");
                return {
                    type: "code",
                    raw: e,
                    lang: t[2] ? t[2].trim().replace(this.rules.inline._escapes, "$1") : t[2],
                    text: n
                }
            }
        }
        heading(e) {
            const t = this.rules.block.heading.exec(e);
            if (t) {
                let e = t[2].trim();
                if (/#$/.test(e)) {
                    const t = be(e, "#");
                    this.options.pedantic ? e = t.trim() : t && !/ $/.test(t) || (e = t.trim())
                }
                return {
                    type: "heading",
                    raw: t[0],
                    depth: t[1].length,
                    text: e,
                    tokens: this.lexer.inline(e)
                }
            }
        }
        hr(e) {
            const t = this.rules.block.hr.exec(e);
            if (t)
                return {
                    type: "hr",
                    raw: t[0]
                }
        }
        blockquote(e) {
            const t = this.rules.block.blockquote.exec(e);
            if (t) {
                const e = be(t[0].replace(/^ *>[ \t]?/gm, ""), "\n")
                  , n = this.lexer.state.top;
                this.lexer.state.top = !0;
                const r = this.lexer.blockTokens(e);
                return this.lexer.state.top = n,
                {
                    type: "blockquote",
                    raw: t[0],
                    tokens: r,
                    text: e
                }
            }
        }
        list(e) {
            let t = this.rules.block.list.exec(e);
            if (t) {
                let n = t[1].trim();
                const r = n.length > 1
                  , s = {
                    type: "list",
                    raw: "",
                    ordered: r,
                    start: r ? +n.slice(0, -1) : "",
                    loose: !1,
                    items: []
                };
                n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`,
                this.options.pedantic && (n = r ? n : "[*+-]");
                const i = new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`);
                let o = ""
                  , l = ""
                  , a = !1;
                for (; e; ) {
                    let n = !1;
                    if (!(t = i.exec(e)))
                        break;
                    if (this.rules.block.hr.test(e))
                        break;
                    o = t[0],
                    e = e.substring(o.length);
                    let r = t[2].split("\n", 1)[0].replace(/^\t+/, (e=>" ".repeat(3 * e.length)))
                      , c = e.split("\n", 1)[0]
                      , u = 0;
                    this.options.pedantic ? (u = 2,
                    l = r.trimStart()) : (u = t[2].search(/[^ ]/),
                    u = u > 4 ? 1 : u,
                    l = r.slice(u),
                    u += t[1].length);
                    let h = !1;
                    if (!r && /^ *$/.test(c) && (o += c + "\n",
                    e = e.substring(c.length + 1),
                    n = !0),
                    !n) {
                        const t = new RegExp(`^ {0,${Math.min(3, u - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`)
                          , n = new RegExp(`^ {0,${Math.min(3, u - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)
                          , s = new RegExp(`^ {0,${Math.min(3, u - 1)}}(?:\`\`\`|~~~)`)
                          , i = new RegExp(`^ {0,${Math.min(3, u - 1)}}#`);
                        for (; e; ) {
                            const a = e.split("\n", 1)[0];
                            if (c = a,
                            this.options.pedantic && (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
                            s.test(c))
                                break;
                            if (i.test(c))
                                break;
                            if (t.test(c))
                                break;
                            if (n.test(e))
                                break;
                            if (c.search(/[^ ]/) >= u || !c.trim())
                                l += "\n" + c.slice(u);
                            else {
                                if (h)
                                    break;
                                if (r.search(/[^ ]/) >= 4)
                                    break;
                                if (s.test(r))
                                    break;
                                if (i.test(r))
                                    break;
                                if (n.test(r))
                                    break;
                                l += "\n" + c
                            }
                            h || c.trim() || (h = !0),
                            o += a + "\n",
                            e = e.substring(a.length + 1),
                            r = c.slice(u)
                        }
                    }
                    s.loose || (a ? s.loose = !0 : /\n *\n *$/.test(o) && (a = !0));
                    let p, f = null;
                    this.options.gfm && (f = /^\[[ xX]\] /.exec(l),
                    f && (p = "[ ] " !== f[0],
                    l = l.replace(/^\[[ xX]\] +/, ""))),
                    s.items.push({
                        type: "list_item",
                        raw: o,
                        task: !!f,
                        checked: p,
                        loose: !1,
                        text: l,
                        tokens: []
                    }),
                    s.raw += o
                }
                s.items[s.items.length - 1].raw = o.trimEnd(),
                s.items[s.items.length - 1].text = l.trimEnd(),
                s.raw = s.raw.trimEnd();
                for (let e = 0; e < s.items.length; e++)
                    if (this.lexer.state.top = !1,
                    s.items[e].tokens = this.lexer.blockTokens(s.items[e].text, []),
                    !s.loose) {
                        const t = s.items[e].tokens.filter((e=>"space" === e.type))
                          , n = t.length > 0 && t.some((e=>/\n.*\n/.test(e.raw)));
                        s.loose = n
                    }
                if (s.loose)
                    for (let e = 0; e < s.items.length; e++)
                        s.items[e].loose = !0;
                return s
            }
        }
        html(e) {
            const t = this.rules.block.html.exec(e);
            if (t)
                return {
                    type: "html",
                    block: !0,
                    raw: t[0],
                    pre: "pre" === t[1] || "script" === t[1] || "style" === t[1],
                    text: t[0]
                }
        }
        def(e) {
            const t = this.rules.block.def.exec(e);
            if (t) {
                const e = t[1].toLowerCase().replace(/\s+/g, " ")
                  , n = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : ""
                  , r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline._escapes, "$1") : t[3];
                return {
                    type: "def",
                    tag: e,
                    raw: t[0],
                    href: n,
                    title: r
                }
            }
        }
        table(e) {
            const t = this.rules.block.table.exec(e);
            if (t) {
                if (!/[:|]/.test(t[2]))
                    return;
                const e = {
                    type: "table",
                    raw: t[0],
                    header: xe(t[1]).map((e=>({
                        text: e,
                        tokens: []
                    }))),
                    align: t[2].replace(/^\||\| *$/g, "").split("|"),
                    rows: t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : []
                };
                if (e.header.length === e.align.length) {
                    let t, n, r, s, i = e.align.length;
                    for (t = 0; t < i; t++) {
                        const n = e.align[t];
                        n && (/^ *-+: *$/.test(n) ? e.align[t] = "right" : /^ *:-+: *$/.test(n) ? e.align[t] = "center" : /^ *:-+ *$/.test(n) ? e.align[t] = "left" : e.align[t] = null)
                    }
                    for (i = e.rows.length,
                    t = 0; t < i; t++)
                        e.rows[t] = xe(e.rows[t], e.header.length).map((e=>({
                            text: e,
                            tokens: []
                        })));
                    for (i = e.header.length,
                    n = 0; n < i; n++)
                        e.header[n].tokens = this.lexer.inline(e.header[n].text);
                    for (i = e.rows.length,
                    n = 0; n < i; n++)
                        for (s = e.rows[n],
                        r = 0; r < s.length; r++)
                            s[r].tokens = this.lexer.inline(s[r].text);
                    return e
                }
            }
        }
        lheading(e) {
            const t = this.rules.block.lheading.exec(e);
            if (t)
                return {
                    type: "heading",
                    raw: t[0],
                    depth: "=" === t[2].charAt(0) ? 1 : 2,
                    text: t[1],
                    tokens: this.lexer.inline(t[1])
                }
        }
        paragraph(e) {
            const t = this.rules.block.paragraph.exec(e);
            if (t) {
                const e = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
                return {
                    type: "paragraph",
                    raw: t[0],
                    text: e,
                    tokens: this.lexer.inline(e)
                }
            }
        }
        text(e) {
            const t = this.rules.block.text.exec(e);
            if (t)
                return {
                    type: "text",
                    raw: t[0],
                    text: t[0],
                    tokens: this.lexer.inline(t[0])
                }
        }
        escape(e) {
            const t = this.rules.inline.escape.exec(e);
            if (t)
                return {
                    type: "escape",
                    raw: t[0],
                    text: pe(t[1])
                }
        }
        tag(e) {
            const t = this.rules.inline.tag.exec(e);
            if (t)
                return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1),
                !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1),
                {
                    type: "html",
                    raw: t[0],
                    inLink: this.lexer.state.inLink,
                    inRawBlock: this.lexer.state.inRawBlock,
                    block: !1,
                    text: t[0]
                }
        }
        link(e) {
            const t = this.rules.inline.link.exec(e);
            if (t) {
                const e = t[2].trim();
                if (!this.options.pedantic && /^</.test(e)) {
                    if (!/>$/.test(e))
                        return;
                    const t = be(e.slice(0, -1), "\\");
                    if ((e.length - t.length) % 2 == 0)
                        return
                } else {
                    const e = function(e, t) {
                        if (-1 === e.indexOf(t[1]))
                            return -1;
                        let n = 0;
                        for (let r = 0; r < e.length; r++)
                            if ("\\" === e[r])
                                r++;
                            else if (e[r] === t[0])
                                n++;
                            else if (e[r] === t[1] && (n--,
                            n < 0))
                                return r;
                        return -1
                    }(t[2], "()");
                    if (e > -1) {
                        const n = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
                        t[2] = t[2].substring(0, e),
                        t[0] = t[0].substring(0, n).trim(),
                        t[3] = ""
                    }
                }
                let n = t[2]
                  , r = "";
                if (this.options.pedantic) {
                    const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
                    e && (n = e[1],
                    r = e[3])
                } else
                    r = t[3] ? t[3].slice(1, -1) : "";
                return n = n.trim(),
                /^</.test(n) && (n = this.options.pedantic && !/>$/.test(e) ? n.slice(1) : n.slice(1, -1)),
                we(t, {
                    href: n ? n.replace(this.rules.inline._escapes, "$1") : n,
                    title: r ? r.replace(this.rules.inline._escapes, "$1") : r
                }, t[0], this.lexer)
            }
        }
        reflink(e, t) {
            let n;
            if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
                let e = (n[2] || n[1]).replace(/\s+/g, " ");
                if (e = t[e.toLowerCase()],
                !e) {
                    const e = n[0].charAt(0);
                    return {
                        type: "text",
                        raw: e,
                        text: e
                    }
                }
                return we(n, e, n[0], this.lexer)
            }
        }
        emStrong(e, t, n="") {
            let r = this.rules.inline.emStrong.lDelim.exec(e);
            if (r && (!r[3] || !n.match(/[\p{L}\p{N}]/u)) && (!r[1] && !r[2] || !n || this.rules.inline.punctuation.exec(n))) {
                const n = [...r[0]].length - 1;
                let s, i, o = n, l = 0;
                const a = "*" === r[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
                for (a.lastIndex = 0,
                t = t.slice(-1 * e.length + n); null != (r = a.exec(t)); ) {
                    if (s = r[1] || r[2] || r[3] || r[4] || r[5] || r[6],
                    !s)
                        continue;
                    if (i = [...s].length,
                    r[3] || r[4]) {
                        o += i;
                        continue
                    }
                    if ((r[5] || r[6]) && n % 3 && !((n + i) % 3)) {
                        l += i;
                        continue
                    }
                    if (o -= i,
                    o > 0)
                        continue;
                    i = Math.min(i, i + o + l);
                    const t = [...r[0]][0].length
                      , a = e.slice(0, n + r.index + t + i);
                    if (Math.min(n, i) % 2) {
                        const e = a.slice(1, -1);
                        return {
                            type: "em",
                            raw: a,
                            text: e,
                            tokens: this.lexer.inlineTokens(e)
                        }
                    }
                    const c = a.slice(2, -2);
                    return {
                        type: "strong",
                        raw: a,
                        text: c,
                        tokens: this.lexer.inlineTokens(c)
                    }
                }
            }
        }
        codespan(e) {
            const t = this.rules.inline.code.exec(e);
            if (t) {
                let e = t[2].replace(/\n/g, " ");
                const n = /[^ ]/.test(e)
                  , r = /^ /.test(e) && / $/.test(e);
                return n && r && (e = e.substring(1, e.length - 1)),
                e = pe(e, !0),
                {
                    type: "codespan",
                    raw: t[0],
                    text: e
                }
            }
        }
        br(e) {
            const t = this.rules.inline.br.exec(e);
            if (t)
                return {
                    type: "br",
                    raw: t[0]
                }
        }
        del(e) {
            const t = this.rules.inline.del.exec(e);
            if (t)
                return {
                    type: "del",
                    raw: t[0],
                    text: t[2],
                    tokens: this.lexer.inlineTokens(t[2])
                }
        }
        autolink(e) {
            const t = this.rules.inline.autolink.exec(e);
            if (t) {
                let e, n;
                return "@" === t[2] ? (e = pe(t[1]),
                n = "mailto:" + e) : (e = pe(t[1]),
                n = e),
                {
                    type: "link",
                    raw: t[0],
                    text: e,
                    href: n,
                    tokens: [{
                        type: "text",
                        raw: e,
                        text: e
                    }]
                }
            }
        }
        url(e) {
            let t;
            if (t = this.rules.inline.url.exec(e)) {
                let e, n;
                if ("@" === t[2])
                    e = pe(t[0]),
                    n = "mailto:" + e;
                else {
                    let r;
                    do {
                        r = t[0],
                        t[0] = this.rules.inline._backpedal.exec(t[0])[0]
                    } while (r !== t[0]);
                    e = pe(t[0]),
                    n = "www." === t[1] ? "http://" + t[0] : t[0]
                }
                return {
                    type: "link",
                    raw: t[0],
                    text: e,
                    href: n,
                    tokens: [{
                        type: "text",
                        raw: e,
                        text: e
                    }]
                }
            }
        }
        inlineText(e) {
            const t = this.rules.inline.text.exec(e);
            if (t) {
                let e;
                return e = this.lexer.state.inRawBlock ? t[0] : pe(t[0]),
                {
                    type: "text",
                    raw: t[0],
                    text: e
                }
            }
        }
    }
    const ve = {
        newline: /^(?: *(?:\n|$))+/,
        code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
        fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
        hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
        html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
        def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
        table: me,
        lheading: /^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        text: /^[^\n]+/,
        _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
        _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
    };
    ve.def = de(ve.def).replace("label", ve._label).replace("title", ve._title).getRegex(),
    ve.bullet = /(?:[*+-]|\d{1,9}[.)])/,
    ve.listItemStart = de(/^( *)(bull) */).replace("bull", ve.bullet).getRegex(),
    ve.list = de(ve.list).replace(/bull/g, ve.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + ve.def.source + ")").getRegex(),
    ve._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
    ve._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/,
    ve.html = de(ve.html, "i").replace("comment", ve._comment).replace("tag", ve._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
    ve.lheading = de(ve.lheading).replace(/bull/g, ve.bullet).getRegex(),
    ve.paragraph = de(ve._paragraph).replace("hr", ve.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ve._tag).getRegex(),
    ve.blockquote = de(ve.blockquote).replace("paragraph", ve.paragraph).getRegex(),
    ve.normal = {
        ...ve
    },
    ve.gfm = {
        ...ve.normal,
        table: "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
    },
    ve.gfm.table = de(ve.gfm.table).replace("hr", ve.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ve._tag).getRegex(),
    ve.gfm.paragraph = de(ve._paragraph).replace("hr", ve.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ve.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ve._tag).getRegex(),
    ve.pedantic = {
        ...ve.normal,
        html: de("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", ve._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: me,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: de(ve.normal._paragraph).replace("hr", ve.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", ve.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    };
    const _e = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: me,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(ref)\]/,
        nolink: /^!?\[(ref)\](?:\[\])?/,
        reflinkSearch: "reflink|nolink(?!\\()",
        emStrong: {
            lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
            rDelimAst: /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
            rDelimUnd: /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: me,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^((?![*_])[\spunctuation])/,
        _punctuation: "\\p{P}$+<=>`^|~"
    };
    _e.punctuation = de(_e.punctuation, "u").replace(/punctuation/g, _e._punctuation).getRegex(),
    _e.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
    _e.anyPunctuation = /\\[punct]/g,
    _e._escapes = /\\([punct])/g,
    _e._comment = de(ve._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(),
    _e.emStrong.lDelim = de(_e.emStrong.lDelim, "u").replace(/punct/g, _e._punctuation).getRegex(),
    _e.emStrong.rDelimAst = de(_e.emStrong.rDelimAst, "gu").replace(/punct/g, _e._punctuation).getRegex(),
    _e.emStrong.rDelimUnd = de(_e.emStrong.rDelimUnd, "gu").replace(/punct/g, _e._punctuation).getRegex(),
    _e.anyPunctuation = de(_e.anyPunctuation, "gu").replace(/punct/g, _e._punctuation).getRegex(),
    _e._escapes = de(_e._escapes, "gu").replace(/punct/g, _e._punctuation).getRegex(),
    _e._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,
    _e._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
    _e.autolink = de(_e.autolink).replace("scheme", _e._scheme).replace("email", _e._email).getRegex(),
    _e._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
    _e.tag = de(_e.tag).replace("comment", _e._comment).replace("attribute", _e._attribute).getRegex(),
    _e._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
    _e._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,
    _e._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,
    _e.link = de(_e.link).replace("label", _e._label).replace("href", _e._href).replace("title", _e._title).getRegex(),
    _e.reflink = de(_e.reflink).replace("label", _e._label).replace("ref", ve._label).getRegex(),
    _e.nolink = de(_e.nolink).replace("ref", ve._label).getRegex(),
    _e.reflinkSearch = de(_e.reflinkSearch, "g").replace("reflink", _e.reflink).replace("nolink", _e.nolink).getRegex(),
    _e.normal = {
        ..._e
    },
    _e.pedantic = {
        ..._e.normal,
        strong: {
            start: /^__|\*\*/,
            middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            endAst: /\*\*(?!\*)/g,
            endUnd: /__(?!_)/g
        },
        em: {
            start: /^_|\*/,
            middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
            endAst: /\*(?!\*)/g,
            endUnd: /_(?!_)/g
        },
        link: de(/^!?\[(label)\]\((.*?)\)/).replace("label", _e._label).getRegex(),
        reflink: de(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _e._label).getRegex()
    },
    _e.gfm = {
        ..._e.normal,
        escape: de(_e.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    },
    _e.gfm.url = de(_e.gfm.url, "i").replace("email", _e.gfm._extended_email).getRegex(),
    _e.breaks = {
        ..._e.gfm,
        br: de(_e.br).replace("{2,}", "*").getRegex(),
        text: de(_e.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    };
    class $e {
        tokens;
        options;
        state;
        tokenizer;
        inlineQueue;
        constructor(e) {
            this.tokens = [],
            this.tokens.links = Object.create(null),
            this.options = e || se,
            this.options.tokenizer = this.options.tokenizer || new ye,
            this.tokenizer = this.options.tokenizer,
            this.tokenizer.options = this.options,
            this.tokenizer.lexer = this,
            this.inlineQueue = [],
            this.state = {
                inLink: !1,
                inRawBlock: !1,
                top: !0
            };
            const t = {
                block: ve.normal,
                inline: _e.normal
            };
            this.options.pedantic ? (t.block = ve.pedantic,
            t.inline = _e.pedantic) : this.options.gfm && (t.block = ve.gfm,
            this.options.breaks ? t.inline = _e.breaks : t.inline = _e.gfm),
            this.tokenizer.rules = t
        }
        static get rules() {
            return {
                block: ve,
                inline: _e
            }
        }
        static lex(e, t) {
            return new $e(t).lex(e)
        }
        static lexInline(e, t) {
            return new $e(t).inlineTokens(e)
        }
        lex(e) {
            let t;
            for (e = e.replace(/\r\n|\r/g, "\n"),
            this.blockTokens(e, this.tokens); t = this.inlineQueue.shift(); )
                this.inlineTokens(t.src, t.tokens);
            return this.tokens
        }
        blockTokens(e, t=[]) {
            let n, r, s, i;
            for (e = this.options.pedantic ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e.replace(/^( *)(\t+)/gm, ((e,t,n)=>t + "    ".repeat(n.length))); e; )
                if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((r=>!!(n = r.call({
                    lexer: this
                }, e, t)) && (e = e.substring(n.raw.length),
                t.push(n),
                !0)))))
                    if (n = this.tokenizer.space(e))
                        e = e.substring(n.raw.length),
                        1 === n.raw.length && t.length > 0 ? t[t.length - 1].raw += "\n" : t.push(n);
                    else if (n = this.tokenizer.code(e))
                        e = e.substring(n.raw.length),
                        r = t[t.length - 1],
                        !r || "paragraph" !== r.type && "text" !== r.type ? t.push(n) : (r.raw += "\n" + n.raw,
                        r.text += "\n" + n.text,
                        this.inlineQueue[this.inlineQueue.length - 1].src = r.text);
                    else if (n = this.tokenizer.fences(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.heading(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.hr(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.blockquote(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.list(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.html(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.def(e))
                        e = e.substring(n.raw.length),
                        r = t[t.length - 1],
                        !r || "paragraph" !== r.type && "text" !== r.type ? this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
                            href: n.href,
                            title: n.title
                        }) : (r.raw += "\n" + n.raw,
                        r.text += "\n" + n.raw,
                        this.inlineQueue[this.inlineQueue.length - 1].src = r.text);
                    else if (n = this.tokenizer.table(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.lheading(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else {
                        if (s = e,
                        this.options.extensions && this.options.extensions.startBlock) {
                            let t = 1 / 0;
                            const n = e.slice(1);
                            let r;
                            this.options.extensions.startBlock.forEach((e=>{
                                r = e.call({
                                    lexer: this
                                }, n),
                                "number" == typeof r && r >= 0 && (t = Math.min(t, r))
                            }
                            )),
                            t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1))
                        }
                        if (this.state.top && (n = this.tokenizer.paragraph(s)))
                            r = t[t.length - 1],
                            i && "paragraph" === r.type ? (r.raw += "\n" + n.raw,
                            r.text += "\n" + n.text,
                            this.inlineQueue.pop(),
                            this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(n),
                            i = s.length !== e.length,
                            e = e.substring(n.raw.length);
                        else if (n = this.tokenizer.text(e))
                            e = e.substring(n.raw.length),
                            r = t[t.length - 1],
                            r && "text" === r.type ? (r.raw += "\n" + n.raw,
                            r.text += "\n" + n.text,
                            this.inlineQueue.pop(),
                            this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(n);
                        else if (e) {
                            const t = "Infinite loop on byte: " + e.charCodeAt(0);
                            if (this.options.silent) {
                                console.error(t);
                                break
                            }
                            throw new Error(t)
                        }
                    }
            return this.state.top = !0,
            t
        }
        inline(e, t=[]) {
            return this.inlineQueue.push({
                src: e,
                tokens: t
            }),
            t
        }
        inlineTokens(e, t=[]) {
            let n, r, s, i, o, l, a = e;
            if (this.tokens.links) {
                const e = Object.keys(this.tokens.links);
                if (e.length > 0)
                    for (; null != (i = this.tokenizer.rules.inline.reflinkSearch.exec(a)); )
                        e.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (a = a.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
            }
            for (; null != (i = this.tokenizer.rules.inline.blockSkip.exec(a)); )
                a = a.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            for (; null != (i = this.tokenizer.rules.inline.anyPunctuation.exec(a)); )
                a = a.slice(0, i.index) + "++" + a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
            for (; e; )
                if (o || (l = ""),
                o = !1,
                !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((r=>!!(n = r.call({
                    lexer: this
                }, e, t)) && (e = e.substring(n.raw.length),
                t.push(n),
                !0)))))
                    if (n = this.tokenizer.escape(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.tag(e))
                        e = e.substring(n.raw.length),
                        r = t[t.length - 1],
                        r && "text" === n.type && "text" === r.type ? (r.raw += n.raw,
                        r.text += n.text) : t.push(n);
                    else if (n = this.tokenizer.link(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.reflink(e, this.tokens.links))
                        e = e.substring(n.raw.length),
                        r = t[t.length - 1],
                        r && "text" === n.type && "text" === r.type ? (r.raw += n.raw,
                        r.text += n.text) : t.push(n);
                    else if (n = this.tokenizer.emStrong(e, a, l))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.codespan(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.br(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.del(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (n = this.tokenizer.autolink(e))
                        e = e.substring(n.raw.length),
                        t.push(n);
                    else if (this.state.inLink || !(n = this.tokenizer.url(e))) {
                        if (s = e,
                        this.options.extensions && this.options.extensions.startInline) {
                            let t = 1 / 0;
                            const n = e.slice(1);
                            let r;
                            this.options.extensions.startInline.forEach((e=>{
                                r = e.call({
                                    lexer: this
                                }, n),
                                "number" == typeof r && r >= 0 && (t = Math.min(t, r))
                            }
                            )),
                            t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1))
                        }
                        if (n = this.tokenizer.inlineText(s))
                            e = e.substring(n.raw.length),
                            "_" !== n.raw.slice(-1) && (l = n.raw.slice(-1)),
                            o = !0,
                            r = t[t.length - 1],
                            r && "text" === r.type ? (r.raw += n.raw,
                            r.text += n.text) : t.push(n);
                        else if (e) {
                            const t = "Infinite loop on byte: " + e.charCodeAt(0);
                            if (this.options.silent) {
                                console.error(t);
                                break
                            }
                            throw new Error(t)
                        }
                    } else
                        e = e.substring(n.raw.length),
                        t.push(n);
            return t
        }
    }
    class Ae {
        options;
        constructor(e) {
            this.options = e || se
        }
        code(e, t, n) {
            const r = (t || "").match(/^\S*/)?.[0];
            return e = e.replace(/\n$/, "") + "\n",
            r ? '<pre><code class="language-' + pe(r) + '">' + (n ? e : pe(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : pe(e, !0)) + "</code></pre>\n"
        }
        blockquote(e) {
            return `<blockquote>\n${e}</blockquote>\n`
        }
        html(e, t) {
            return e
        }
        heading(e, t, n) {
            return `<h${t}>${e}</h${t}>\n`
        }
        hr() {
            return "<hr>\n"
        }
        list(e, t, n) {
            const r = t ? "ol" : "ul";
            return "<" + r + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + r + ">\n"
        }
        listitem(e, t, n) {
            return `<li>${e}</li>\n`
        }
        checkbox(e) {
            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
        }
        paragraph(e) {
            return `<p>${e}</p>\n`
        }
        table(e, t) {
            return t && (t = `<tbody>${t}</tbody>`),
            "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
        }
        tablerow(e) {
            return `<tr>\n${e}</tr>\n`
        }
        tablecell(e, t) {
            const n = t.header ? "th" : "td";
            return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`
        }
        strong(e) {
            return `<strong>${e}</strong>`
        }
        em(e) {
            return `<em>${e}</em>`
        }
        codespan(e) {
            return `<code>${e}</code>`
        }
        br() {
            return "<br>"
        }
        del(e) {
            return `<del>${e}</del>`
        }
        link(e, t, n) {
            const r = ke(e);
            if (null === r)
                return n;
            let s = '<a href="' + (e = r) + '"';
            return t && (s += ' title="' + t + '"'),
            s += ">" + n + "</a>",
            s
        }
        image(e, t, n) {
            const r = ke(e);
            if (null === r)
                return n;
            let s = `<img src="${e = r}" alt="${n}"`;
            return t && (s += ` title="${t}"`),
            s += ">",
            s
        }
        text(e) {
            return e
        }
    }
    class Te {
        strong(e) {
            return e
        }
        em(e) {
            return e
        }
        codespan(e) {
            return e
        }
        del(e) {
            return e
        }
        html(e) {
            return e
        }
        text(e) {
            return e
        }
        link(e, t, n) {
            return "" + n
        }
        image(e, t, n) {
            return "" + n
        }
        br() {
            return ""
        }
    }
    class Re {
        options;
        renderer;
        textRenderer;
        constructor(e) {
            this.options = e || se,
            this.options.renderer = this.options.renderer || new Ae,
            this.renderer = this.options.renderer,
            this.renderer.options = this.options,
            this.textRenderer = new Te
        }
        static parse(e, t) {
            return new Re(t).parse(e)
        }
        static parseInline(e, t) {
            return new Re(t).parseInline(e)
        }
        parse(e, t=!0) {
            let n = "";
            for (let r = 0; r < e.length; r++) {
                const s = e[r];
                if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
                    const e = s
                      , t = this.options.extensions.renderers[e.type].call({
                        parser: this
                    }, e);
                    if (!1 !== t || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(e.type)) {
                        n += t || "";
                        continue
                    }
                }
                switch (s.type) {
                case "space":
                    continue;
                case "hr":
                    n += this.renderer.hr();
                    continue;
                case "heading":
                    {
                        const e = s;
                        n += this.renderer.heading(this.parseInline(e.tokens), e.depth, this.parseInline(e.tokens, this.textRenderer).replace(fe, ((e,t)=>"colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "")));
                        continue
                    }
                case "code":
                    {
                        const e = s;
                        n += this.renderer.code(e.text, e.lang, !!e.escaped);
                        continue
                    }
                case "table":
                    {
                        const e = s;
                        let t = ""
                          , r = "";
                        for (let t = 0; t < e.header.length; t++)
                            r += this.renderer.tablecell(this.parseInline(e.header[t].tokens), {
                                header: !0,
                                align: e.align[t]
                            });
                        t += this.renderer.tablerow(r);
                        let i = "";
                        for (let t = 0; t < e.rows.length; t++) {
                            const n = e.rows[t];
                            r = "";
                            for (let t = 0; t < n.length; t++)
                                r += this.renderer.tablecell(this.parseInline(n[t].tokens), {
                                    header: !1,
                                    align: e.align[t]
                                });
                            i += this.renderer.tablerow(r)
                        }
                        n += this.renderer.table(t, i);
                        continue
                    }
                case "blockquote":
                    {
                        const e = s
                          , t = this.parse(e.tokens);
                        n += this.renderer.blockquote(t);
                        continue
                    }
                case "list":
                    {
                        const e = s
                          , t = e.ordered
                          , r = e.start
                          , i = e.loose;
                        let o = "";
                        for (let t = 0; t < e.items.length; t++) {
                            const n = e.items[t]
                              , r = n.checked
                              , s = n.task;
                            let l = "";
                            if (n.task) {
                                const e = this.renderer.checkbox(!!r);
                                i ? n.tokens.length > 0 && "paragraph" === n.tokens[0].type ? (n.tokens[0].text = e + " " + n.tokens[0].text,
                                n.tokens[0].tokens && n.tokens[0].tokens.length > 0 && "text" === n.tokens[0].tokens[0].type && (n.tokens[0].tokens[0].text = e + " " + n.tokens[0].tokens[0].text)) : n.tokens.unshift({
                                    type: "text",
                                    text: e + " "
                                }) : l += e + " "
                            }
                            l += this.parse(n.tokens, i),
                            o += this.renderer.listitem(l, s, !!r)
                        }
                        n += this.renderer.list(o, t, r);
                        continue
                    }
                case "html":
                    {
                        const e = s;
                        n += this.renderer.html(e.text, e.block);
                        continue
                    }
                case "paragraph":
                    {
                        const e = s;
                        n += this.renderer.paragraph(this.parseInline(e.tokens));
                        continue
                    }
                case "text":
                    {
                        let i = s
                          , o = i.tokens ? this.parseInline(i.tokens) : i.text;
                        for (; r + 1 < e.length && "text" === e[r + 1].type; )
                            i = e[++r],
                            o += "\n" + (i.tokens ? this.parseInline(i.tokens) : i.text);
                        n += t ? this.renderer.paragraph(o) : o;
                        continue
                    }
                default:
                    {
                        const e = 'Token with "' + s.type + '" type was not found.';
                        if (this.options.silent)
                            return console.error(e),
                            "";
                        throw new Error(e)
                    }
                }
            }
            return n
        }
        parseInline(e, t) {
            t = t || this.renderer;
            let n = "";
            for (let r = 0; r < e.length; r++) {
                const s = e[r];
                if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
                    const e = this.options.extensions.renderers[s.type].call({
                        parser: this
                    }, s);
                    if (!1 !== e || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
                        n += e || "";
                        continue
                    }
                }
                switch (s.type) {
                case "escape":
                    {
                        const e = s;
                        n += t.text(e.text);
                        break
                    }
                case "html":
                    {
                        const e = s;
                        n += t.html(e.text);
                        break
                    }
                case "link":
                    {
                        const e = s;
                        n += t.link(e.href, e.title, this.parseInline(e.tokens, t));
                        break
                    }
                case "image":
                    {
                        const e = s;
                        n += t.image(e.href, e.title, e.text);
                        break
                    }
                case "strong":
                    {
                        const e = s;
                        n += t.strong(this.parseInline(e.tokens, t));
                        break
                    }
                case "em":
                    {
                        const e = s;
                        n += t.em(this.parseInline(e.tokens, t));
                        break
                    }
                case "codespan":
                    {
                        const e = s;
                        n += t.codespan(e.text);
                        break
                    }
                case "br":
                    n += t.br();
                    break;
                case "del":
                    {
                        const e = s;
                        n += t.del(this.parseInline(e.tokens, t));
                        break
                    }
                case "text":
                    {
                        const e = s;
                        n += t.text(e.text);
                        break
                    }
                default:
                    {
                        const e = 'Token with "' + s.type + '" type was not found.';
                        if (this.options.silent)
                            return console.error(e),
                            "";
                        throw new Error(e)
                    }
                }
            }
            return n
        }
    }
    class Se {
        options;
        constructor(e) {
            this.options = e || se
        }
        static passThroughHooks = new Set(["preprocess", "postprocess"]);
        preprocess(e) {
            return e
        }
        postprocess(e) {
            return e
        }
    }
    class Ee {
        defaults = {
            async: !1,
            breaks: !1,
            extensions: null,
            gfm: !0,
            hooks: null,
            pedantic: !1,
            renderer: null,
            silent: !1,
            tokenizer: null,
            walkTokens: null
        };
        options = this.setOptions;
        parse = this.#e($e.lex, Re.parse);
        parseInline = this.#e($e.lexInline, Re.parseInline);
        Parser = Re;
        Renderer = Ae;
        TextRenderer = Te;
        Lexer = $e;
        Tokenizer = ye;
        Hooks = Se;
        constructor(...e) {
            this.use(...e)
        }
        walkTokens(e, t) {
            let n = [];
            for (const r of e)
                switch (n = n.concat(t.call(this, r)),
                r.type) {
                case "table":
                    {
                        const e = r;
                        for (const r of e.header)
                            n = n.concat(this.walkTokens(r.tokens, t));
                        for (const r of e.rows)
                            for (const e of r)
                                n = n.concat(this.walkTokens(e.tokens, t));
                        break
                    }
                case "list":
                    {
                        const e = r;
                        n = n.concat(this.walkTokens(e.items, t));
                        break
                    }
                default:
                    {
                        const e = r;
                        this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r=>{
                            n = n.concat(this.walkTokens(e[r], t))
                        }
                        )) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)))
                    }
                }
            return n
        }
        use(...e) {
            const t = this.defaults.extensions || {
                renderers: {},
                childTokens: {}
            };
            return e.forEach((e=>{
                const n = {
                    ...e
                };
                if (n.async = this.defaults.async || n.async || !1,
                e.extensions && (e.extensions.forEach((e=>{
                    if (!e.name)
                        throw new Error("extension name required");
                    if ("renderer"in e) {
                        const n = t.renderers[e.name];
                        t.renderers[e.name] = n ? function(...t) {
                            let r = e.renderer.apply(this, t);
                            return !1 === r && (r = n.apply(this, t)),
                            r
                        }
                        : e.renderer
                    }
                    if ("tokenizer"in e) {
                        if (!e.level || "block" !== e.level && "inline" !== e.level)
                            throw new Error("extension level must be 'block' or 'inline'");
                        const n = t[e.level];
                        n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer],
                        e.start && ("block" === e.level ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : "inline" === e.level && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]))
                    }
                    "childTokens"in e && e.childTokens && (t.childTokens[e.name] = e.childTokens)
                }
                )),
                n.extensions = t),
                e.renderer) {
                    const t = this.defaults.renderer || new Ae(this.defaults);
                    for (const n in e.renderer) {
                        const r = e.renderer[n]
                          , s = n
                          , i = t[s];
                        t[s] = (...e)=>{
                            let n = r.apply(t, e);
                            return !1 === n && (n = i.apply(t, e)),
                            n || ""
                        }
                    }
                    n.renderer = t
                }
                if (e.tokenizer) {
                    const t = this.defaults.tokenizer || new ye(this.defaults);
                    for (const n in e.tokenizer) {
                        const r = e.tokenizer[n]
                          , s = n
                          , i = t[s];
                        t[s] = (...e)=>{
                            let n = r.apply(t, e);
                            return !1 === n && (n = i.apply(t, e)),
                            n
                        }
                    }
                    n.tokenizer = t
                }
                if (e.hooks) {
                    const t = this.defaults.hooks || new Se;
                    for (const n in e.hooks) {
                        const r = e.hooks[n]
                          , s = n
                          , i = t[s];
                        Se.passThroughHooks.has(n) ? t[s] = e=>{
                            if (this.defaults.async)
                                return Promise.resolve(r.call(t, e)).then((e=>i.call(t, e)));
                            const n = r.call(t, e);
                            return i.call(t, n)
                        }
                        : t[s] = (...e)=>{
                            let n = r.apply(t, e);
                            return !1 === n && (n = i.apply(t, e)),
                            n
                        }
                    }
                    n.hooks = t
                }
                if (e.walkTokens) {
                    const t = this.defaults.walkTokens
                      , r = e.walkTokens;
                    n.walkTokens = function(e) {
                        let n = [];
                        return n.push(r.call(this, e)),
                        t && (n = n.concat(t.call(this, e))),
                        n
                    }
                }
                this.defaults = {
                    ...this.defaults,
                    ...n
                }
            }
            )),
            this
        }
        setOptions(e) {
            return this.defaults = {
                ...this.defaults,
                ...e
            },
            this
        }
        lexer(e, t) {
            return $e.lex(e, t ?? this.defaults)
        }
        parser(e, t) {
            return Re.parse(e, t ?? this.defaults)
        }
        #e(e, t) {
            return (n,r)=>{
                const s = {
                    ...r
                }
                  , i = {
                    ...this.defaults,
                    ...s
                };
                !0 === this.defaults.async && !1 === s.async && (i.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),
                i.async = !0);
                const o = this.#t(!!i.silent, !!i.async);
                if (null == n)
                    return o(new Error("marked(): input parameter is undefined or null"));
                if ("string" != typeof n)
                    return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
                if (i.hooks && (i.hooks.options = i),
                i.async)
                    return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((t=>e(t, i))).then((e=>i.walkTokens ? Promise.all(this.walkTokens(e, i.walkTokens)).then((()=>e)) : e)).then((e=>t(e, i))).then((e=>i.hooks ? i.hooks.postprocess(e) : e)).catch(o);
                try {
                    i.hooks && (n = i.hooks.preprocess(n));
                    const r = e(n, i);
                    i.walkTokens && this.walkTokens(r, i.walkTokens);
                    let s = t(r, i);
                    return i.hooks && (s = i.hooks.postprocess(s)),
                    s
                } catch (e) {
                    return o(e)
                }
            }
        }
        #t(e, t) {
            return n=>{
                if (n.message += "\nPlease report this to https://github.com/markedjs/marked.",
                e) {
                    const e = "<p>An error occurred:</p><pre>" + pe(n.message + "", !0) + "</pre>";
                    return t ? Promise.resolve(e) : e
                }
                if (t)
                    return Promise.reject(n);
                throw n
            }
        }
    }
    const ze = new Ee;
    function Ce(e, t) {
        return ze.parse(e, t)
    }
    function Oe(e, t) {
        return Array(t + 1).join(e)
    }
    Ce.options = Ce.setOptions = function(e) {
        return ze.setOptions(e),
        Ce.defaults = ze.defaults,
        ie(Ce.defaults),
        Ce
    }
    ,
    Ce.getDefaults = function() {
        return {
            async: !1,
            breaks: !1,
            extensions: null,
            gfm: !0,
            hooks: null,
            pedantic: !1,
            renderer: null,
            silent: !1,
            tokenizer: null,
            walkTokens: null
        }
    }
    ,
    Ce.defaults = se,
    Ce.use = function(...e) {
        return ze.use(...e),
        Ce.defaults = ze.defaults,
        ie(Ce.defaults),
        Ce
    }
    ,
    Ce.walkTokens = function(e, t) {
        return ze.walkTokens(e, t)
    }
    ,
    Ce.parseInline = ze.parseInline,
    Ce.Parser = Re,
    Ce.parser = Re.parse,
    Ce.Renderer = Ae,
    Ce.TextRenderer = Te,
    Ce.Lexer = $e,
    Ce.lexer = $e.lex,
    Ce.Tokenizer = ye,
    Ce.Hooks = Se,
    Ce.parse = Ce,
    Ce.options,
    Ce.setOptions,
    Ce.use,
    Ce.walkTokens,
    Ce.parseInline,
    Re.parse,
    $e.lex;
    var De = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
    function Ie(e) {
        return Be(e, De)
    }
    var Ne = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
    function Pe(e) {
        return Be(e, Ne)
    }
    var Me = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
    function Be(e, t) {
        return t.indexOf(e.nodeName) >= 0
    }
    function Le(e, t) {
        return e.getElementsByTagName && t.some((function(t) {
            return e.getElementsByTagName(t).length
        }
        ))
    }
    var qe = {};
    function je(e) {
        return e ? e.replace(/(\n+\s*)+/g, "\n") : ""
    }
    function He(e) {
        for (var t in this.options = e,
        this._keep = [],
        this._remove = [],
        this.blankRule = {
            replacement: e.blankReplacement
        },
        this.keepReplacement = e.keepReplacement,
        this.defaultRule = {
            replacement: e.defaultReplacement
        },
        this.array = [],
        e.rules)
            this.array.push(e.rules[t])
    }
    function Ze(e, t, n) {
        for (var r = 0; r < e.length; r++) {
            var s = e[r];
            if (Fe(s, t, n))
                return s
        }
    }
    function Fe(e, t, n) {
        var r = e.filter;
        if ("string" == typeof r) {
            if (r === t.nodeName.toLowerCase())
                return !0
        } else if (Array.isArray(r)) {
            if (r.indexOf(t.nodeName.toLowerCase()) > -1)
                return !0
        } else {
            if ("function" != typeof r)
                throw new TypeError("`filter` needs to be a string, array, or function");
            if (r.call(e, t, n))
                return !0
        }
    }
    function Ue(e) {
        var t = e.nextSibling || e.parentNode;
        return e.parentNode.removeChild(e),
        t
    }
    function Qe(e, t, n) {
        return e && e.parentNode === t || n(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode
    }
    qe.paragraph = {
        filter: "p",
        replacement: function(e) {
            return "\n\n" + e + "\n\n"
        }
    },
    qe.lineBreak = {
        filter: "br",
        replacement: function(e, t, n) {
            return n.br + "\n"
        }
    },
    qe.heading = {
        filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
        replacement: function(e, t, n) {
            var r = Number(t.nodeName.charAt(1));
            return "setext" === n.headingStyle && r < 3 ? "\n\n" + e + "\n" + Oe(1 === r ? "=" : "-", e.length) + "\n\n" : "\n\n" + Oe("#", r) + " " + e + "\n\n"
        }
    },
    qe.blockquote = {
        filter: "blockquote",
        replacement: function(e) {
            return "\n\n" + (e = (e = e.replace(/^\n+|\n+$/g, "")).replace(/^/gm, "> ")) + "\n\n"
        }
    },
    qe.list = {
        filter: ["ul", "ol"],
        replacement: function(e, t) {
            var n = t.parentNode;
            return "LI" === n.nodeName && n.lastElementChild === t ? "\n" + e : "\n\n" + e + "\n\n"
        }
    },
    qe.listItem = {
        filter: "li",
        replacement: function(e, t, n) {
            e = e.replace(/^\n+/, "").replace(/\n+$/, "\n").replace(/\n/gm, "\n    ");
            var r = n.bulletListMarker + "   "
              , s = t.parentNode;
            if ("OL" === s.nodeName) {
                var i = s.getAttribute("start")
                  , o = Array.prototype.indexOf.call(s.children, t);
                r = (i ? Number(i) + o : o + 1) + ".  "
            }
            return r + e + (t.nextSibling && !/\n$/.test(e) ? "\n" : "")
        }
    },
    qe.indentedCodeBlock = {
        filter: function(e, t) {
            return "indented" === t.codeBlockStyle && "PRE" === e.nodeName && e.firstChild && "CODE" === e.firstChild.nodeName
        },
        replacement: function(e, t, n) {
            return "\n\n    " + t.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n"
        }
    },
    qe.fencedCodeBlock = {
        filter: function(e, t) {
            return "fenced" === t.codeBlockStyle && "PRE" === e.nodeName && e.firstChild && "CODE" === e.firstChild.nodeName
        },
        replacement: function(e, t, n) {
            for (var r, s = ((t.firstChild.getAttribute("class") || "").match(/language-(\S+)/) || [null, ""])[1], i = t.firstChild.textContent, o = n.fence.charAt(0), l = 3, a = new RegExp("^" + o + "{3,}","gm"); r = a.exec(i); )
                r[0].length >= l && (l = r[0].length + 1);
            var c = Oe(o, l);
            return "\n\n" + c + s + "\n" + i.replace(/\n$/, "") + "\n" + c + "\n\n"
        }
    },
    qe.horizontalRule = {
        filter: "hr",
        replacement: function(e, t, n) {
            return "\n\n" + n.hr + "\n\n"
        }
    },
    qe.inlineLink = {
        filter: function(e, t) {
            return "inlined" === t.linkStyle && "A" === e.nodeName && e.getAttribute("href")
        },
        replacement: function(e, t) {
            var n = t.getAttribute("href")
              , r = je(t.getAttribute("title"));
            return r && (r = ' "' + r + '"'),
            "[" + e + "](" + n + r + ")"
        }
    },
    qe.referenceLink = {
        filter: function(e, t) {
            return "referenced" === t.linkStyle && "A" === e.nodeName && e.getAttribute("href")
        },
        replacement: function(e, t, n) {
            var r, s, i = t.getAttribute("href"), o = je(t.getAttribute("title"));
            switch (o && (o = ' "' + o + '"'),
            n.linkReferenceStyle) {
            case "collapsed":
                r = "[" + e + "][]",
                s = "[" + e + "]: " + i + o;
                break;
            case "shortcut":
                r = "[" + e + "]",
                s = "[" + e + "]: " + i + o;
                break;
            default:
                var l = this.references.length + 1;
                r = "[" + e + "][" + l + "]",
                s = "[" + l + "]: " + i + o
            }
            return this.references.push(s),
            r
        },
        references: [],
        append: function(e) {
            var t = "";
            return this.references.length && (t = "\n\n" + this.references.join("\n") + "\n\n",
            this.references = []),
            t
        }
    },
    qe.emphasis = {
        filter: ["em", "i"],
        replacement: function(e, t, n) {
            return e.trim() ? n.emDelimiter + e + n.emDelimiter : ""
        }
    },
    qe.strong = {
        filter: ["strong", "b"],
        replacement: function(e, t, n) {
            return e.trim() ? n.strongDelimiter + e + n.strongDelimiter : ""
        }
    },
    qe.code = {
        filter: function(e) {
            var t = e.previousSibling || e.nextSibling
              , n = "PRE" === e.parentNode.nodeName && !t;
            return "CODE" === e.nodeName && !n
        },
        replacement: function(e) {
            if (!e)
                return "";
            e = e.replace(/\r?\n|\r/g, " ");
            for (var t = /^`|^ .*?[^ ].* $|`$/.test(e) ? " " : "", n = "`", r = e.match(/`+/gm) || []; -1 !== r.indexOf(n); )
                n += "`";
            return n + t + e + t + n
        }
    },
    qe.image = {
        filter: "img",
        replacement: function(e, t) {
            var n = je(t.getAttribute("alt"))
              , r = t.getAttribute("src") || ""
              , s = je(t.getAttribute("title"));
            return r ? "![" + n + "](" + r + (s ? ' "' + s + '"' : "") + ")" : ""
        }
    },
    He.prototype = {
        add: function(e, t) {
            this.array.unshift(t)
        },
        keep: function(e) {
            this._keep.unshift({
                filter: e,
                replacement: this.keepReplacement
            })
        },
        remove: function(e) {
            this._remove.unshift({
                filter: e,
                replacement: function() {
                    return ""
                }
            })
        },
        forNode: function(e) {
            return e.isBlank ? this.blankRule : (t = Ze(this.array, e, this.options)) || (t = Ze(this._keep, e, this.options)) || (t = Ze(this._remove, e, this.options)) ? t : this.defaultRule;
            var t
        },
        forEach: function(e) {
            for (var t = 0; t < this.array.length; t++)
                e(this.array[t], t)
        }
    };
    var Ve, We, Ge, Ke = "undefined" != typeof window ? window : {}, Xe = function() {
        var e = Ke.DOMParser
          , t = !1;
        try {
            (new e).parseFromString("", "text/html") && (t = !0)
        } catch (e) {}
        return t
    }() ? Ke.DOMParser : (Ve = function() {}
    ,
    We = {},
    Ve.prototype.parseFromString = function(e) {
        return We.createDocument(e)
    }
    ,
    Ve);
    function Ye(e, t) {
        var n;
        return function(e) {
            var t = e.element
              , n = e.isBlock
              , r = e.isVoid
              , s = e.isPre || function(e) {
                return "PRE" === e.nodeName
            }
            ;
            if (t.firstChild && !s(t)) {
                for (var i = null, o = !1, l = null, a = Qe(l, t, s); a !== t; ) {
                    if (3 === a.nodeType || 4 === a.nodeType) {
                        var c = a.data.replace(/[ \r\n\t]+/g, " ");
                        if (i && !/ $/.test(i.data) || o || " " !== c[0] || (c = c.substr(1)),
                        !c) {
                            a = Ue(a);
                            continue
                        }
                        a.data = c,
                        i = a
                    } else {
                        if (1 !== a.nodeType) {
                            a = Ue(a);
                            continue
                        }
                        n(a) || "BR" === a.nodeName ? (i && (i.data = i.data.replace(/ $/, "")),
                        i = null,
                        o = !1) : r(a) || s(a) ? (i = null,
                        o = !0) : i && (o = !1)
                    }
                    var u = Qe(l, a, s);
                    l = a,
                    a = u
                }
                i && (i.data = i.data.replace(/ $/, ""),
                i.data || Ue(i))
            }
        }({
            element: n = "string" == typeof e ? (Ge = Ge || new Xe).parseFromString('<x-turndown id="turndown-root">' + e + "</x-turndown>", "text/html").getElementById("turndown-root") : e.cloneNode(!0),
            isBlock: Ie,
            isVoid: Pe,
            isPre: t.preformattedCode ? Je : null
        }),
        n
    }
    function Je(e) {
        return "PRE" === e.nodeName || "CODE" === e.nodeName
    }
    function et(e, t) {
        return e.isBlock = Ie(e),
        e.isCode = "CODE" === e.nodeName || e.parentNode.isCode,
        e.isBlank = function(e) {
            return !Pe(e) && !function(e) {
                return Be(e, Me)
            }(e) && /^\s*$/i.test(e.textContent) && !function(e) {
                return Le(e, Ne)
            }(e) && !function(e) {
                return Le(e, Me)
            }(e)
        }(e),
        e.flankingWhitespace = function(e, t) {
            if (e.isBlock || t.preformattedCode && e.isCode)
                return {
                    leading: "",
                    trailing: ""
                };
            var n, r = {
                leading: (n = e.textContent.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/))[1],
                leadingAscii: n[2],
                leadingNonAscii: n[3],
                trailing: n[4],
                trailingNonAscii: n[5],
                trailingAscii: n[6]
            };
            return r.leadingAscii && tt("left", e, t) && (r.leading = r.leadingNonAscii),
            r.trailingAscii && tt("right", e, t) && (r.trailing = r.trailingNonAscii),
            {
                leading: r.leading,
                trailing: r.trailing
            }
        }(e, t),
        e
    }
    function tt(e, t, n) {
        var r, s, i;
        return "left" === e ? (r = t.previousSibling,
        s = / $/) : (r = t.nextSibling,
        s = /^ /),
        r && (3 === r.nodeType ? i = s.test(r.nodeValue) : n.preformattedCode && "CODE" === r.nodeName ? i = !1 : 1 !== r.nodeType || Ie(r) || (i = s.test(r.textContent))),
        i
    }
    var nt = Array.prototype.reduce
      , rt = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
    function st(e) {
        if (!(this instanceof st))
            return new st(e);
        var t = {
            rules: qe,
            headingStyle: "setext",
            hr: "* * *",
            bulletListMarker: "*",
            codeBlockStyle: "indented",
            fence: "```",
            emDelimiter: "_",
            strongDelimiter: "**",
            linkStyle: "inlined",
            linkReferenceStyle: "full",
            br: "  ",
            preformattedCode: !1,
            blankReplacement: function(e, t) {
                return t.isBlock ? "\n\n" : ""
            },
            keepReplacement: function(e, t) {
                return t.isBlock ? "\n\n" + t.outerHTML + "\n\n" : t.outerHTML
            },
            defaultReplacement: function(e, t) {
                return t.isBlock ? "\n\n" + e + "\n\n" : e
            }
        };
        this.options = function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    n.hasOwnProperty(r) && (e[r] = n[r])
            }
            return e
        }({}, t, e),
        this.rules = new He(this.options)
    }
    function it(e) {
        var t = this;
        return nt.call(e.childNodes, (function(e, n) {
            var r = "";
            return 3 === (n = new et(n,t.options)).nodeType ? r = n.isCode ? n.nodeValue : t.escape(n.nodeValue) : 1 === n.nodeType && (r = lt.call(t, n)),
            at(e, r)
        }
        ), "")
    }
    function ot(e) {
        var t = this;
        return this.rules.forEach((function(n) {
            "function" == typeof n.append && (e = at(e, n.append(t.options)))
        }
        )),
        e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "")
    }
    function lt(e) {
        var t = this.rules.forNode(e)
          , n = it.call(this, e)
          , r = e.flankingWhitespace;
        return (r.leading || r.trailing) && (n = n.trim()),
        r.leading + t.replacement(n, e, this.options) + r.trailing
    }
    function at(e, t) {
        var n = function(e) {
            for (var t = e.length; t > 0 && "\n" === e[t - 1]; )
                t--;
            return e.substring(0, t)
        }(e)
          , r = t.replace(/^\n*/, "")
          , s = Math.max(e.length - n.length, t.length - r.length);
        return n + "\n\n".substring(0, s) + r
    }
    st.prototype = {
        turndown: function(e) {
            if (!function(e) {
                return null != e && ("string" == typeof e || e.nodeType && (1 === e.nodeType || 9 === e.nodeType || 11 === e.nodeType))
            }(e))
                throw new TypeError(e + " is not a string, or an element/document/fragment node.");
            if ("" === e)
                return "";
            var t = it.call(this, new Ye(e,this.options));
            return ot.call(this, t)
        },
        use: function(e) {
            if (Array.isArray(e))
                for (var t = 0; t < e.length; t++)
                    this.use(e[t]);
            else {
                if ("function" != typeof e)
                    throw new TypeError("plugin must be a Function or an Array of Functions");
                e(this)
            }
            return this
        },
        addRule: function(e, t) {
            return this.rules.add(e, t),
            this
        },
        keep: function(e) {
            return this.rules.keep(e),
            this
        },
        remove: function(e) {
            return this.rules.remove(e),
            this
        },
        escape: function(e) {
            return rt.reduce((function(e, t) {
                return e.replace(t[0], t[1])
            }
            ), e)
        }
    };
    const ct = e=>{
        return t = e.options.get("markdown_symbols"),
        n = (e,t)=>({
            text: e
        }),
        ((e,t)=>{
            const n = {};
            return ((e,t)=>{
                const n = te(e);
                for (let r = 0, s = n.length; r < s; r++) {
                    const s = n[r];
                    t(e[s], s)
                }
            }
            )(e, ((e,r)=>{
                const s = t(e, r);
                n[s.k] = s.v
            }
            )),
            n
        }
        )(t, ((e,t)=>({
            k: t,
            v: n(e)
        })));
        var t, n
    }
      , ut = /[.*+\-?^${}()|[\]\\]/g
      , ht = e=>e.replace(ut, "\\$&")
      , pt = (e,t)=>{
        if (0 === te(e).length)
            return X.none();
        const n = "TinyPlugin" + t.nameAddition
          , r = new RegExp(`${t.startMarker || ":"}(${te(e).map(ht).join("|")})${t.endMarker || ":"}`)
          , s = new RegExp(`^${r.source}`);
        return X.some({
            extensions: [{
                name: n,
                level: "inline",
                start: e=>{
                    var t;
                    return null === (t = e.match(r)) || void 0 === t ? void 0 : t.index
                }
                ,
                tokenizer: t=>{
                    const r = s.exec(t);
                    if (!r)
                        return;
                    const i = r[1]
                      , o = e[i];
                    return {
                        type: n,
                        raw: r[0],
                        text: o.text
                    }
                }
                ,
                renderer: e=>e.text
            }]
        })
    }
      , ft = {
        code: (e,t,n)=>{
            const r = (null == t ? void 0 : t.toLowerCase()) || void 0;
            return r ? `<pre class="language-${r}"><code>${e}</code></pre>` : e
        }
    }
      , gt = (e,t)=>{
        const n = e.converterToHtml.parse(t, {
            async: !1
        });
        if (U(n))
            return n;
        throw new Error("Markdown parsing is async despite expectations")
    }
    ;
    tinymce.PluginManager.add("markdown", (e=>{
        (e=>{
            e.options.register("markdown_symbols", {
                processor: "object",
                default: {
                    C: "\xa9",
                    TM: "\u2122",
                    R: "\xae"
                }
            })
        }
        )(e);
        const t = (e=>{
            const t = new Ee
              , n = new st;
            return t.use({
                renderer: ft
            }),
            pt(ct(e), {
                startMarker: "\\(",
                endMarker: "\\)",
                nameAddition: "-symbols"
            }).each((e=>t.use(e))),
            (e=>new Promise(((t,n)=>{
                const r = ()=>{
                    e.plugins.emoticons && W(e.plugins.emoticons.getAllEmojis) ? e.plugins.emoticons.getAllEmojis().then((e=>{
                        const n = {};
                        ee(e, (e=>{
                            n[e.title] = {
                                text: e.char
                            }
                        }
                        ));
                        const r = pt(n, {
                            nameAddition: "-emoji"
                        });
                        return t(r)
                    }
                    )).catch(n) : t(X.none())
                }
                ;
                e.initialized ? r() : e.on("init", r)
            }
            )))(e).then((e=>e.each((e=>t.use(e))))).catch(G).then(K({
                converterToHtml: t,
                converterFromHtml: n
            }))
        }
        )(e);
        return t.then((t=>(((e,t)=>{
            e.addCommand("MarkdownInsert", ((n,r)=>{
                U(r) && (e.undoManager.add(),
                e.undoManager.extra((()=>e.execCommand("mceInsertClipboardContent", !1, {
                    text: r
                })), (()=>e.insertContent(gt(t, r)))))
            }
            ))
        }
        )(e, t),
        e.on("paste", (n=>{
            n.isDefaultPrevented() || e.queryCommandState("mceTogglePlainTextPaste") || ((e,t)=>t.isDefaultPrevented() || V(t.clipboardData) || J(t.clipboardData.types, "text/html") ? X.none() : J(t.clipboardData.types, "text/plain") ? ((e,t)=>gt(e, t) === t ? X.none() : X.some(t))(e, t.clipboardData.getData("text/plain")) : X.none())(t, n).each((t=>{
                n.preventDefault(),
                e.execCommand("MarkdownInsert", !1, t),
                (e=>{
                    e.dispatch("MarkdownPaste")
                }
                )(e)
            }
            ))
        }
        ), !0),
        t))),
        {
            getContent: ()=>t.then((t=>((e,t)=>e.converterFromHtml.turndown(t))(t, e.getContent())))
        }
    }
    ))
}();
