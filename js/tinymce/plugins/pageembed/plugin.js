/*!
 * Tiny Page Embed plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 7.3.0-86
 */

!function() {
    "use strict";
    const t = t=>parseInt(t, 10)
      , e = (t,e)=>{
        const n = t - e;
        return 0 === n ? 0 : n > 0 ? 1 : -1
    }
      , n = (t,e,n)=>({
        major: t,
        minor: e,
        patch: n
    })
      , r = e=>{
        const r = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
        return r ? n(t(r[1]), t(r[2]), t(r[3])) : n(0, 0, 0)
    }
      , i = [{
        text: "Responsive - 21x9",
        value: "tiny-pageembed--21by9"
    }, {
        text: "Responsive - 16x9",
        value: "tiny-pageembed--16by9"
    }, {
        text: "Responsive - 4x3",
        value: "tiny-pageembed--4by3"
    }, {
        text: "Responsive - 1x1",
        value: "tiny-pageembed--1by1"
    }]
      , s = t=>e=>e.options.get(t)
      , o = s("tiny_pageembed_classes")
      , a = s("tiny_pageembed_inline_styles")
      , l = s("tiny_pageembed_css_url")
      , c = t=>e=>(t=>{
        const e = typeof t;
        return null === t ? "null" : "object" === e && Array.isArray(t) ? "array" : "object" === e && (n = r = t,
        (i = String).prototype.isPrototypeOf(n) || (null === (s = r.constructor) || void 0 === s ? void 0 : s.name) === i.name) ? "string" : e;
        var n, r, i, s
    }
    )(e) === t
      , u = t=>e=>typeof e === t
      , h = c("string")
      , d = c("array")
      , p = u("boolean")
      , f = (void 0,
    t=>undefined === t);
    const m = t=>!(t=>null == t)(t)
      , g = u("function")
      , k = u("number")
      , y = ()=>{}
    ;
    class b {
        constructor(t, e) {
            this.tag = t,
            this.value = e
        }
        static some(t) {
            return new b(!0,t)
        }
        static none() {
            return b.singletonNone
        }
        fold(t, e) {
            return this.tag ? e(this.value) : t()
        }
        isSome() {
            return this.tag
        }
        isNone() {
            return !this.tag
        }
        map(t) {
            return this.tag ? b.some(t(this.value)) : b.none()
        }
        bind(t) {
            return this.tag ? t(this.value) : b.none()
        }
        exists(t) {
            return this.tag && t(this.value)
        }
        forall(t) {
            return !this.tag || t(this.value)
        }
        filter(t) {
            return !this.tag || t(this.value) ? this : b.none()
        }
        getOr(t) {
            return this.tag ? this.value : t
        }
        or(t) {
            return this.tag ? this : t
        }
        getOrThunk(t) {
            return this.tag ? this.value : t()
        }
        orThunk(t) {
            return this.tag ? this : t()
        }
        getOrDie(t) {
            if (this.tag)
                return this.value;
            throw new Error(null != t ? t : "Called getOrDie on None")
        }
        static from(t) {
            return m(t) ? b.some(t) : b.none()
        }
        getOrNull() {
            return this.tag ? this.value : null
        }
        getOrUndefined() {
            return this.value
        }
        each(t) {
            this.tag && t(this.value)
        }
        toArray() {
            return this.tag ? [this.value] : []
        }
        toString() {
            return this.tag ? `some(${this.value})` : "none()"
        }
    }
    b.singletonNone = new b(!1);
    const S = Array.prototype.slice
      , v = Array.prototype.indexOf
      , C = Array.prototype.push
      , w = (t,e)=>((t,e)=>v.call(t, e))(t, e) > -1
      , x = (t,e)=>{
        const n = t.length
          , r = new Array(n);
        for (let i = 0; i < n; i++) {
            const n = t[i];
            r[i] = e(n, i)
        }
        return r
    }
      , A = (t,e)=>{
        for (let n = 0, r = t.length; n < r; n++)
            e(t[n], n)
    }
      , L = (t,e)=>{
        const n = [];
        for (let r = 0, i = t.length; r < i; r++) {
            const i = t[r];
            e(i, r) && n.push(i)
        }
        return n
    }
      , _ = (t,e,n)=>(A(t, ((t,r)=>{
        n = e(n, t, r)
    }
    )),
    n)
      , T = t=>{
        const e = [];
        for (let n = 0, r = t.length; n < r; ++n) {
            if (!d(t[n]))
                throw new Error("Arr.flatten item " + n + " was not an array, input: " + t);
            C.apply(e, t[n])
        }
        return e
    }
      , E = (t,e)=>T(x(t, e))
      , O = Object.keys
      , I = Object.hasOwnProperty
      , P = (t,e)=>{
        const n = O(t);
        for (let r = 0, i = n.length; r < i; r++) {
            const i = n[r];
            e(t[i], i)
        }
    }
    ;
    "undefined" != typeof window ? window : Function("return this;")();
    const N = t=>1 === (t=>t.dom.nodeType)(t)
      , M = (t,e,n)=>{
        ((t,e,n)=>{
            if (!(h(n) || p(n) || k(n)))
                throw console.error("Invalid call to Attribute.set. Key ", e, ":: Value ", n, ":: Element ", t),
                new Error("Attribute value was not simple");
            t.setAttribute(e, n + "")
        }
        )(t.dom, e, n)
    }
      , j = (t,e)=>{
        const n = t.dom.getAttribute(e);
        return null === n ? void 0 : n
    }
      , D = (t,e)=>b.from(j(t, e))
      , R = t=>{
        if (null == t)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: t
        }
    }
      , B = (t,e)=>{
        const n = (e || document).createElement(t);
        return R(n)
    }
      , z = R
      , U = t=>void 0 !== t.dom.classList
      , F = (t,e)=>{
        U(t) ? t.dom.classList.add(e) : ((t,e)=>{
            ((t,e,n)=>{
                const r = ((t,e)=>{
                    const n = j(t, e);
                    return void 0 === n || "" === n ? [] : n.split(" ")
                }
                )(t, e)
                  , i = r.concat([n]);
                M(t, e, i.join(" "))
            }
            )(t, "class", e)
        }
        )(t, e)
    }
      , V = (t,e)=>U(t) && t.dom.classList.contains(e)
      , $ = "tiny-pageembed"
      , G = t=>V(t, $)
      , W = t=>{
        const e = t.attr("class");
        return m(e) && ((t,e,n=0,r)=>{
            const i = t.indexOf(e, n);
            return -1 !== i && (!!f(r) || i + e.length <= r)
        }
        )(" " + e + " ", " " + $ + " ")
    }
      , q = t=>{
        A(t, (t=>{
            if (W(t)) {
                const e = new tinymce.html.Node("span",1);
                e.attr("class", "mce-shim"),
                e.attr("data-mce-bogus", "1"),
                t.append(e),
                t.attr("contenteditable", "false")
            }
        }
        ))
    }
      , J = t=>{
        A(t, (t=>{
            W(t) && t.attr("contenteditable", null)
        }
        ))
    }
      , H = (t,e)=>{
        const n = t.dom;
        if (1 !== n.nodeType)
            return !1;
        {
            const t = n;
            if (void 0 !== t.matches)
                return t.matches(e);
            if (void 0 !== t.msMatchesSelector)
                return t.msMatchesSelector(e);
            if (void 0 !== t.webkitMatchesSelector)
                return t.webkitMatchesSelector(e);
            if (void 0 !== t.mozMatchesSelector)
                return t.mozMatchesSelector(e);
            throw new Error("Browser lacks native selectors")
        }
    }
      , Q = t=>((t,e)=>{
        const n = t.dom.childNodes;
        return b.from(n[0]).map(z)
    }
    )(t)
      , K = (t,e)=>{
        t.dom.appendChild(e.dom)
    }
      , Y = (t,e)=>{
        const n = t.dom;
        P(e, ((t,e)=>{
            ((t,e,n)=>{
                if (!h(n))
                    throw console.error("Invalid call to CSS.set. Property ", e, ":: Value ", n, ":: Element ", t),
                    new Error("CSS value must be a string: " + n);
                (t=>void 0 !== t.style && g(t.style.getPropertyValue))(t) && t.style.setProperty(e, n)
            }
            )(n, e, t)
        }
        ))
    }
    ;
    var X = Object.create
      , Z = Object.defineProperty
      , tt = Object.getOwnPropertyDescriptor
      , et = Object.getOwnPropertyNames
      , nt = Object.getPrototypeOf
      , rt = Object.prototype.hasOwnProperty
      , it = (t,e)=>()=>(e || t((e = {
        exports: {}
    }).exports, e),
    e.exports)
      , st = (t,e)=>{
        for (var n in e)
            Z(t, n, {
                get: e[n],
                enumerable: !0
            })
    }
      , ot = it((t=>{
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        t.encode = function(t) {
            if (0 <= t && t < e.length)
                return e[t];
            throw new TypeError("Must be between 0 and 63: " + t)
        }
        ,
        t.decode = function(t) {
            return 65 <= t && t <= 90 ? t - 65 : 97 <= t && t <= 122 ? t - 97 + 26 : 48 <= t && t <= 57 ? t - 48 + 52 : 43 == t ? 62 : 47 == t ? 63 : -1
        }
    }
    ))
      , at = it((t=>{
        var e = ot();
        t.encode = function(t) {
            var n, r, i = "", s = (r = t) < 0 ? 1 + (-r << 1) : 0 + (r << 1);
            do {
                n = 31 & s,
                (s >>>= 5) > 0 && (n |= 32),
                i += e.encode(n)
            } while (s > 0);
            return i
        }
        ,
        t.decode = function(t, n, r) {
            var i, s, o = t.length, a = 0, l = 0;
            do {
                if (n >= o)
                    throw new Error("Expected more digits in base 64 VLQ value.");
                if (-1 === (s = e.decode(t.charCodeAt(n++))))
                    throw new Error("Invalid base64 digit: " + t.charAt(n - 1));
                i = !!(32 & s),
                a += (s &= 31) << l,
                l += 5
            } while (i);
            r.value = function(t) {
                var e = t >> 1;
                return 1 == (1 & t) ? -e : e
            }(a),
            r.rest = n
        }
    }
    ))
      , lt = it((t=>{
        t.getArg = function(t, e, n) {
            if (e in t)
                return t[e];
            if (3 === arguments.length)
                return n;
            throw new Error('"' + e + '" is a required argument.')
        }
        ;
        var e = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/
          , n = /^data:.+\,.+$/;
        function r(t) {
            var n = t.match(e);
            return n ? {
                scheme: n[1],
                auth: n[2],
                host: n[3],
                port: n[4],
                path: n[5]
            } : null
        }
        function i(t) {
            var e = "";
            return t.scheme && (e += t.scheme + ":"),
            e += "//",
            t.auth && (e += t.auth + "@"),
            t.host && (e += t.host),
            t.port && (e += ":" + t.port),
            t.path && (e += t.path),
            e
        }
        t.urlParse = r,
        t.urlGenerate = i;
        var s = function(e) {
            var n = [];
            return function(e) {
                for (var s = 0; s < n.length; s++)
                    if (n[s].input === e) {
                        var o = n[0];
                        return n[0] = n[s],
                        n[s] = o,
                        n[0].result
                    }
                var a = function(e) {
                    var n = e
                      , s = r(e);
                    if (s) {
                        if (!s.path)
                            return e;
                        n = s.path
                    }
                    for (var o = t.isAbsolute(n), a = [], l = 0, c = 0; ; ) {
                        if (l = c,
                        -1 === (c = n.indexOf("/", l))) {
                            a.push(n.slice(l));
                            break
                        }
                        for (a.push(n.slice(l, c)); c < n.length && "/" === n[c]; )
                            c++
                    }
                    var u, h = 0;
                    for (c = a.length - 1; c >= 0; c--)
                        "." === (u = a[c]) ? a.splice(c, 1) : ".." === u ? h++ : h > 0 && ("" === u ? (a.splice(c + 1, h),
                        h = 0) : (a.splice(c, 2),
                        h--));
                    return "" === (n = a.join("/")) && (n = o ? "/" : "."),
                    s ? (s.path = n,
                    i(s)) : n
                }(e);
                return n.unshift({
                    input: e,
                    result: a
                }),
                n.length > 32 && n.pop(),
                a
            }
        }();
        function o(t, e) {
            "" === t && (t = "."),
            "" === e && (e = ".");
            var o = r(e)
              , a = r(t);
            if (a && (t = a.path || "/"),
            o && !o.scheme)
                return a && (o.scheme = a.scheme),
                i(o);
            if (o || e.match(n))
                return e;
            if (a && !a.host && !a.path)
                return a.host = e,
                i(a);
            var l = "/" === e.charAt(0) ? e : s(t.replace(/\/+$/, "") + "/" + e);
            return a ? (a.path = l,
            i(a)) : l
        }
        t.normalize = s,
        t.join = o,
        t.isAbsolute = function(t) {
            return "/" === t.charAt(0) || e.test(t)
        }
        ,
        t.relative = function(t, e) {
            "" === t && (t = "."),
            t = t.replace(/\/$/, "");
            for (var n = 0; 0 !== e.indexOf(t + "/"); ) {
                var r = t.lastIndexOf("/");
                if (r < 0 || (t = t.slice(0, r)).match(/^([^\/]+:\/)?\/*$/))
                    return e;
                ++n
            }
            return Array(n + 1).join("../") + e.substr(t.length + 1)
        }
        ;
        var a = !("__proto__"in Object.create(null));
        function l(t) {
            return t
        }
        function c(t) {
            if (!t)
                return !1;
            var e = t.length;
            if (e < 9 || 95 !== t.charCodeAt(e - 1) || 95 !== t.charCodeAt(e - 2) || 111 !== t.charCodeAt(e - 3) || 116 !== t.charCodeAt(e - 4) || 111 !== t.charCodeAt(e - 5) || 114 !== t.charCodeAt(e - 6) || 112 !== t.charCodeAt(e - 7) || 95 !== t.charCodeAt(e - 8) || 95 !== t.charCodeAt(e - 9))
                return !1;
            for (var n = e - 10; n >= 0; n--)
                if (36 !== t.charCodeAt(n))
                    return !1;
            return !0
        }
        function u(t, e) {
            return t === e ? 0 : null === t ? 1 : null === e ? -1 : t > e ? 1 : -1
        }
        t.toSetString = a ? l : function(t) {
            return c(t) ? "$" + t : t
        }
        ,
        t.fromSetString = a ? l : function(t) {
            return c(t) ? t.slice(1) : t
        }
        ,
        t.compareByOriginalPositions = function(t, e, n) {
            var r = u(t.source, e.source);
            return 0 !== r || 0 != (r = t.originalLine - e.originalLine) || 0 != (r = t.originalColumn - e.originalColumn) || n || 0 != (r = t.generatedColumn - e.generatedColumn) || 0 != (r = t.generatedLine - e.generatedLine) ? r : u(t.name, e.name)
        }
        ,
        t.compareByOriginalPositionsNoSource = function(t, e, n) {
            var r;
            return 0 != (r = t.originalLine - e.originalLine) || 0 != (r = t.originalColumn - e.originalColumn) || n || 0 != (r = t.generatedColumn - e.generatedColumn) || 0 != (r = t.generatedLine - e.generatedLine) ? r : u(t.name, e.name)
        }
        ,
        t.compareByGeneratedPositionsDeflated = function(t, e, n) {
            var r = t.generatedLine - e.generatedLine;
            return 0 !== r || 0 != (r = t.generatedColumn - e.generatedColumn) || n || 0 !== (r = u(t.source, e.source)) || 0 != (r = t.originalLine - e.originalLine) || 0 != (r = t.originalColumn - e.originalColumn) ? r : u(t.name, e.name)
        }
        ,
        t.compareByGeneratedPositionsDeflatedNoLine = function(t, e, n) {
            var r = t.generatedColumn - e.generatedColumn;
            return 0 !== r || n || 0 !== (r = u(t.source, e.source)) || 0 != (r = t.originalLine - e.originalLine) || 0 != (r = t.originalColumn - e.originalColumn) ? r : u(t.name, e.name)
        }
        ,
        t.compareByGeneratedPositionsInflated = function(t, e) {
            var n = t.generatedLine - e.generatedLine;
            return 0 !== n || 0 != (n = t.generatedColumn - e.generatedColumn) || 0 !== (n = u(t.source, e.source)) || 0 != (n = t.originalLine - e.originalLine) || 0 != (n = t.originalColumn - e.originalColumn) ? n : u(t.name, e.name)
        }
        ,
        t.parseSourceMapInput = function(t) {
            return JSON.parse(t.replace(/^\)]}'[^\n]*\n/, ""))
        }
        ,
        t.computeSourceURL = function(t, e, n) {
            if (e = e || "",
            t && ("/" !== t[t.length - 1] && "/" !== e[0] && (t += "/"),
            e = t + e),
            n) {
                var a = r(n);
                if (!a)
                    throw new Error("sourceMapURL could not be parsed");
                if (a.path) {
                    var l = a.path.lastIndexOf("/");
                    l >= 0 && (a.path = a.path.substring(0, l + 1))
                }
                e = o(i(a), e)
            }
            return s(e)
        }
    }
    ))
      , ct = it((t=>{
        var e = lt()
          , n = Object.prototype.hasOwnProperty
          , r = typeof Map < "u";
        function i() {
            this._array = [],
            this._set = r ? new Map : Object.create(null)
        }
        i.fromArray = function(t, e) {
            for (var n = new i, r = 0, s = t.length; r < s; r++)
                n.add(t[r], e);
            return n
        }
        ,
        i.prototype.size = function() {
            return r ? this._set.size : Object.getOwnPropertyNames(this._set).length
        }
        ,
        i.prototype.add = function(t, i) {
            var s = r ? t : e.toSetString(t)
              , o = r ? this.has(t) : n.call(this._set, s)
              , a = this._array.length;
            (!o || i) && this._array.push(t),
            o || (r ? this._set.set(t, a) : this._set[s] = a)
        }
        ,
        i.prototype.has = function(t) {
            if (r)
                return this._set.has(t);
            var i = e.toSetString(t);
            return n.call(this._set, i)
        }
        ,
        i.prototype.indexOf = function(t) {
            if (r) {
                var i = this._set.get(t);
                if (i >= 0)
                    return i
            } else {
                var s = e.toSetString(t);
                if (n.call(this._set, s))
                    return this._set[s]
            }
            throw new Error('"' + t + '" is not in the set.')
        }
        ,
        i.prototype.at = function(t) {
            if (t >= 0 && t < this._array.length)
                return this._array[t];
            throw new Error("No element indexed by " + t)
        }
        ,
        i.prototype.toArray = function() {
            return this._array.slice()
        }
        ,
        t.ArraySet = i
    }
    ))
      , ut = it((t=>{
        var e = lt();
        function n() {
            this._array = [],
            this._sorted = !0,
            this._last = {
                generatedLine: -1,
                generatedColumn: 0
            }
        }
        n.prototype.unsortedForEach = function(t, e) {
            this._array.forEach(t, e)
        }
        ,
        n.prototype.add = function(t) {
            !function(t, n) {
                var r = t.generatedLine
                  , i = n.generatedLine
                  , s = t.generatedColumn
                  , o = n.generatedColumn;
                return i > r || i == r && o >= s || e.compareByGeneratedPositionsInflated(t, n) <= 0
            }(this._last, t) ? (this._sorted = !1,
            this._array.push(t)) : (this._last = t,
            this._array.push(t))
        }
        ,
        n.prototype.toArray = function() {
            return this._sorted || (this._array.sort(e.compareByGeneratedPositionsInflated),
            this._sorted = !0),
            this._array
        }
        ,
        t.MappingList = n
    }
    ))
      , ht = it((t=>{
        var e = at()
          , n = lt()
          , r = ct().ArraySet
          , i = ut().MappingList;
        function s(t) {
            t || (t = {}),
            this._file = n.getArg(t, "file", null),
            this._sourceRoot = n.getArg(t, "sourceRoot", null),
            this._skipValidation = n.getArg(t, "skipValidation", !1),
            this._sources = new r,
            this._names = new r,
            this._mappings = new i,
            this._sourcesContents = null
        }
        s.prototype._version = 3,
        s.fromSourceMap = function(t) {
            var e = t.sourceRoot
              , r = new s({
                file: t.file,
                sourceRoot: e
            });
            return t.eachMapping((function(t) {
                var i = {
                    generated: {
                        line: t.generatedLine,
                        column: t.generatedColumn
                    }
                };
                null != t.source && (i.source = t.source,
                null != e && (i.source = n.relative(e, i.source)),
                i.original = {
                    line: t.originalLine,
                    column: t.originalColumn
                },
                null != t.name && (i.name = t.name)),
                r.addMapping(i)
            }
            )),
            t.sources.forEach((function(i) {
                var s = i;
                null !== e && (s = n.relative(e, i)),
                r._sources.has(s) || r._sources.add(s);
                var o = t.sourceContentFor(i);
                null != o && r.setSourceContent(i, o)
            }
            )),
            r
        }
        ,
        s.prototype.addMapping = function(t) {
            var e = n.getArg(t, "generated")
              , r = n.getArg(t, "original", null)
              , i = n.getArg(t, "source", null)
              , s = n.getArg(t, "name", null);
            this._skipValidation || this._validateMapping(e, r, i, s),
            null != i && (i = String(i),
            this._sources.has(i) || this._sources.add(i)),
            null != s && (s = String(s),
            this._names.has(s) || this._names.add(s)),
            this._mappings.add({
                generatedLine: e.line,
                generatedColumn: e.column,
                originalLine: null != r && r.line,
                originalColumn: null != r && r.column,
                source: i,
                name: s
            })
        }
        ,
        s.prototype.setSourceContent = function(t, e) {
            var r = t;
            null != this._sourceRoot && (r = n.relative(this._sourceRoot, r)),
            null != e ? (this._sourcesContents || (this._sourcesContents = Object.create(null)),
            this._sourcesContents[n.toSetString(r)] = e) : this._sourcesContents && (delete this._sourcesContents[n.toSetString(r)],
            0 === Object.keys(this._sourcesContents).length && (this._sourcesContents = null))
        }
        ,
        s.prototype.applySourceMap = function(t, e, i) {
            var s = e;
            if (null == e) {
                if (null == t.file)
                    throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
                s = t.file
            }
            var o = this._sourceRoot;
            null != o && (s = n.relative(o, s));
            var a = new r
              , l = new r;
            this._mappings.unsortedForEach((function(e) {
                if (e.source === s && null != e.originalLine) {
                    var r = t.originalPositionFor({
                        line: e.originalLine,
                        column: e.originalColumn
                    });
                    null != r.source && (e.source = r.source,
                    null != i && (e.source = n.join(i, e.source)),
                    null != o && (e.source = n.relative(o, e.source)),
                    e.originalLine = r.line,
                    e.originalColumn = r.column,
                    null != r.name && (e.name = r.name))
                }
                var c = e.source;
                null != c && !a.has(c) && a.add(c);
                var u = e.name;
                null != u && !l.has(u) && l.add(u)
            }
            ), this),
            this._sources = a,
            this._names = l,
            t.sources.forEach((function(e) {
                var r = t.sourceContentFor(e);
                null != r && (null != i && (e = n.join(i, e)),
                null != o && (e = n.relative(o, e)),
                this.setSourceContent(e, r))
            }
            ), this)
        }
        ,
        s.prototype._validateMapping = function(t, e, n, r) {
            if (e && "number" != typeof e.line && "number" != typeof e.column)
                throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
            if (!(t && "line"in t && "column"in t && t.line > 0 && t.column >= 0) || e || n || r) {
                if (t && "line"in t && "column"in t && e && "line"in e && "column"in e && t.line > 0 && t.column >= 0 && e.line > 0 && e.column >= 0 && n)
                    return;
                throw new Error("Invalid mapping: " + JSON.stringify({
                    generated: t,
                    source: n,
                    original: e,
                    name: r
                }))
            }
        }
        ,
        s.prototype._serializeMappings = function() {
            for (var t, r, i, s, o = 0, a = 1, l = 0, c = 0, u = 0, h = 0, d = "", p = this._mappings.toArray(), f = 0, m = p.length; f < m; f++) {
                if (t = "",
                (r = p[f]).generatedLine !== a)
                    for (o = 0; r.generatedLine !== a; )
                        t += ";",
                        a++;
                else if (f > 0) {
                    if (!n.compareByGeneratedPositionsInflated(r, p[f - 1]))
                        continue;
                    t += ","
                }
                t += e.encode(r.generatedColumn - o),
                o = r.generatedColumn,
                null != r.source && (s = this._sources.indexOf(r.source),
                t += e.encode(s - h),
                h = s,
                t += e.encode(r.originalLine - 1 - c),
                c = r.originalLine - 1,
                t += e.encode(r.originalColumn - l),
                l = r.originalColumn,
                null != r.name && (i = this._names.indexOf(r.name),
                t += e.encode(i - u),
                u = i)),
                d += t
            }
            return d
        }
        ,
        s.prototype._generateSourcesContent = function(t, e) {
            return t.map((function(t) {
                if (!this._sourcesContents)
                    return null;
                null != e && (t = n.relative(e, t));
                var r = n.toSetString(t);
                return Object.prototype.hasOwnProperty.call(this._sourcesContents, r) ? this._sourcesContents[r] : null
            }
            ), this)
        }
        ,
        s.prototype.toJSON = function() {
            var t = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings()
            };
            return null != this._file && (t.file = this._file),
            null != this._sourceRoot && (t.sourceRoot = this._sourceRoot),
            this._sourcesContents && (t.sourcesContent = this._generateSourcesContent(t.sources, t.sourceRoot)),
            t
        }
        ,
        s.prototype.toString = function() {
            return JSON.stringify(this.toJSON())
        }
        ,
        t.SourceMapGenerator = s
    }
    ));
    function dt(t) {
        return t >= 48 && t <= 57
    }
    function pt(t) {
        return dt(t) || t >= 65 && t <= 70 || t >= 97 && t <= 102
    }
    function ft(t) {
        return t >= 65 && t <= 90
    }
    function mt(t) {
        return function(t) {
            return ft(t) || function(t) {
                return t >= 97 && t <= 122
            }(t)
        }(t) || function(t) {
            return t >= 128
        }(t) || 95 === t
    }
    function gt(t) {
        return mt(t) || dt(t) || 45 === t
    }
    function kt(t) {
        return t >= 0 && t <= 8 || 11 === t || t >= 14 && t <= 31 || 127 === t
    }
    function yt(t) {
        return 10 === t || 13 === t || 12 === t
    }
    function bt(t) {
        return yt(t) || 32 === t || 9 === t
    }
    function St(t, e) {
        return !(92 !== t || yt(e) || 0 === e)
    }
    function vt(t, e, n) {
        return 45 === t ? mt(e) || 45 === e || St(e, n) : !!mt(t) || 92 === t && St(t, e)
    }
    function Ct(t, e, n) {
        return 43 === t || 45 === t ? dt(e) ? 2 : 46 === e && dt(n) ? 3 : 0 : 46 === t ? dt(e) ? 2 : 0 : dt(t) ? 1 : 0
    }
    function wt(t) {
        return 65279 === t || 65534 === t ? 1 : 0
    }
    var xt = new Array(128)
      , At = 130
      , Lt = 131
      , _t = 132
      , Tt = 133;
    for (let t = 0; t < xt.length; t++)
        xt[t] = bt(t) && At || dt(t) && Lt || mt(t) && _t || kt(t) && Tt || t || 128;
    function Et(t) {
        return t < 128 ? xt[t] : _t
    }
    function Ot(t, e) {
        return e < t.length ? t.charCodeAt(e) : 0
    }
    function It(t, e, n) {
        return 13 === n && 10 === Ot(t, e + 1) ? 2 : 1
    }
    function Pt(t, e, n) {
        let r = t.charCodeAt(e);
        return ft(r) && (r |= 32),
        r === n
    }
    function Nt(t, e, n, r) {
        if (n - e !== r.length || e < 0 || n > t.length)
            return !1;
        for (let i = e; i < n; i++) {
            let n = r.charCodeAt(i - e)
              , s = t.charCodeAt(i);
            if (ft(s) && (s |= 32),
            s !== n)
                return !1
        }
        return !0
    }
    function Mt(t, e) {
        for (; e < t.length && bt(t.charCodeAt(e)); e++)
            ;
        return e
    }
    function jt(t, e) {
        for (; e < t.length && dt(t.charCodeAt(e)); e++)
            ;
        return e
    }
    function Dt(t, e) {
        if (pt(Ot(t, (e += 2) - 1))) {
            for (let n = Math.min(t.length, e + 5); e < n && pt(Ot(t, e)); e++)
                ;
            let n = Ot(t, e);
            bt(n) && (e += It(t, e, n))
        }
        return e
    }
    function Rt(t, e) {
        for (; e < t.length; e++) {
            let n = t.charCodeAt(e);
            if (!gt(n)) {
                if (St(n, Ot(t, e + 1))) {
                    e = Dt(t, e) - 1;
                    continue
                }
                break
            }
        }
        return e
    }
    function Bt(t, e) {
        let n = t.charCodeAt(e);
        if ((43 === n || 45 === n) && (n = t.charCodeAt(e += 1)),
        dt(n) && (e = jt(t, e + 1),
        n = t.charCodeAt(e)),
        46 === n && dt(t.charCodeAt(e + 1)) && (e = jt(t, e += 2)),
        Pt(t, e, 101)) {
            let r = 0;
            n = t.charCodeAt(e + 1),
            (45 === n || 43 === n) && (r = 1,
            n = t.charCodeAt(e + 2)),
            dt(n) && (e = jt(t, e + 1 + r + 1))
        }
        return e
    }
    function zt(t, e) {
        for (; e < t.length; e++) {
            let n = t.charCodeAt(e);
            if (41 === n) {
                e++;
                break
            }
            St(n, Ot(t, e + 1)) && (e = Dt(t, e))
        }
        return e
    }
    function Ut(t) {
        if (1 === t.length && !pt(t.charCodeAt(0)))
            return t[0];
        let e = parseInt(t, 16);
        return (0 === e || e >= 55296 && e <= 57343 || e > 1114111) && (e = 65533),
        String.fromCodePoint(e)
    }
    var Ft = ["EOF-token", "ident-token", "function-token", "at-keyword-token", "hash-token", "string-token", "bad-string-token", "url-token", "bad-url-token", "delim-token", "number-token", "percentage-token", "dimension-token", "whitespace-token", "CDO-token", "CDC-token", "colon-token", "semicolon-token", "comma-token", "[-token", "]-token", "(-token", ")-token", "{-token", "}-token"];
    function Vt(t=null, e) {
        return null === t || t.length < e ? new Uint32Array(Math.max(e + 1024, 16384)) : t
    }
    function $t(t) {
        let e = t.source
          , n = e.length
          , r = e.length > 0 ? wt(e.charCodeAt(0)) : 0
          , i = Vt(t.lines, n)
          , s = Vt(t.columns, n)
          , o = t.startLine
          , a = t.startColumn;
        for (let t = r; t < n; t++) {
            let r = e.charCodeAt(t);
            i[t] = o,
            s[t] = a++,
            (10 === r || 13 === r || 12 === r) && (13 === r && t + 1 < n && 10 === e.charCodeAt(t + 1) && (t++,
            i[t] = o,
            s[t] = a),
            o++,
            a = 1)
        }
        i[n] = o,
        s[n] = a,
        t.lines = i,
        t.columns = s,
        t.computed = !0
    }
    var Gt = class {
        constructor() {
            this.lines = null,
            this.columns = null,
            this.computed = !1
        }
        setSource(t, e=0, n=1, r=1) {
            this.source = t,
            this.startOffset = e,
            this.startLine = n,
            this.startColumn = r,
            this.computed = !1
        }
        getLocation(t, e) {
            return this.computed || $t(this),
            {
                source: e,
                offset: this.startOffset + t,
                line: this.lines[t],
                column: this.columns[t]
            }
        }
        getLocationRange(t, e, n) {
            return this.computed || $t(this),
            {
                source: n,
                start: {
                    offset: this.startOffset + t,
                    line: this.lines[t],
                    column: this.columns[t]
                },
                end: {
                    offset: this.startOffset + e,
                    line: this.lines[e],
                    column: this.columns[e]
                }
            }
        }
    }
      , Wt = 16777215
      , qt = 24
      , Jt = new Map([[2, 22], [21, 22], [19, 20], [23, 24]])
      , Ht = class {
        constructor(t, e) {
            this.setSource(t, e)
        }
        reset() {
            this.eof = !1,
            this.tokenIndex = -1,
            this.tokenType = 0,
            this.tokenStart = this.firstCharOffset,
            this.tokenEnd = this.firstCharOffset
        }
        setSource(t="", e=(()=>{}
        )) {
            let n = (t = String(t || "")).length
              , r = Vt(this.offsetAndType, t.length + 1)
              , i = Vt(this.balance, t.length + 1)
              , s = 0
              , o = 0
              , a = 0
              , l = -1;
            for (this.offsetAndType = null,
            this.balance = null,
            e(t, ((t,e,c)=>{
                switch (t) {
                default:
                    i[s] = n;
                    break;
                case o:
                    {
                        let t = a & Wt;
                        for (a = i[t],
                        o = a >> qt,
                        i[s] = t,
                        i[t++] = s; t < s; t++)
                            i[t] === n && (i[t] = s);
                        break
                    }
                case 21:
                case 2:
                case 19:
                case 23:
                    i[s] = a,
                    o = Jt.get(t),
                    a = o << qt | s
                }
                r[s++] = t << qt | c,
                -1 === l && (l = e)
            }
            )),
            r[s] = 0 | n,
            i[s] = n,
            i[n] = n; 0 !== a; ) {
                let t = a & Wt;
                a = i[t],
                i[t] = n
            }
            this.source = t,
            this.firstCharOffset = -1 === l ? 0 : l,
            this.tokenCount = s,
            this.offsetAndType = r,
            this.balance = i,
            this.reset(),
            this.next()
        }
        lookupType(t) {
            return (t += this.tokenIndex) < this.tokenCount ? this.offsetAndType[t] >> qt : 0
        }
        lookupOffset(t) {
            return (t += this.tokenIndex) < this.tokenCount ? this.offsetAndType[t - 1] & Wt : this.source.length
        }
        lookupValue(t, e) {
            return (t += this.tokenIndex) < this.tokenCount && Nt(this.source, this.offsetAndType[t - 1] & Wt, this.offsetAndType[t] & Wt, e)
        }
        getTokenStart(t) {
            return t === this.tokenIndex ? this.tokenStart : t > 0 ? t < this.tokenCount ? this.offsetAndType[t - 1] & Wt : this.offsetAndType[this.tokenCount] & Wt : this.firstCharOffset
        }
        substrToCursor(t) {
            return this.source.substring(t, this.tokenStart)
        }
        isBalanceEdge(t) {
            return this.balance[this.tokenIndex] < t
        }
        isDelim(t, e) {
            return e ? 9 === this.lookupType(e) && this.source.charCodeAt(this.lookupOffset(e)) === t : 9 === this.tokenType && this.source.charCodeAt(this.tokenStart) === t
        }
        skip(t) {
            let e = this.tokenIndex + t;
            e < this.tokenCount ? (this.tokenIndex = e,
            this.tokenStart = this.offsetAndType[e - 1] & Wt,
            e = this.offsetAndType[e],
            this.tokenType = e >> qt,
            this.tokenEnd = e & Wt) : (this.tokenIndex = this.tokenCount,
            this.next())
        }
        next() {
            let t = this.tokenIndex + 1;
            t < this.tokenCount ? (this.tokenIndex = t,
            this.tokenStart = this.tokenEnd,
            t = this.offsetAndType[t],
            this.tokenType = t >> qt,
            this.tokenEnd = t & Wt) : (this.eof = !0,
            this.tokenIndex = this.tokenCount,
            this.tokenType = 0,
            this.tokenStart = this.tokenEnd = this.source.length)
        }
        skipSC() {
            for (; 13 === this.tokenType || 25 === this.tokenType; )
                this.next()
        }
        skipUntilBalanced(t, e) {
            let n, r, i = t;
            t: for (; i < this.tokenCount && (n = this.balance[i],
            !(n < t)); i++)
                switch (r = i > 0 ? this.offsetAndType[i - 1] & Wt : this.firstCharOffset,
                e(this.source.charCodeAt(r))) {
                case 1:
                    break t;
                case 2:
                    i++;
                    break t;
                default:
                    this.balance[n] === i && (i = n)
                }
            this.skip(i - this.tokenIndex)
        }
        forEachToken(t) {
            for (let e = 0, n = this.firstCharOffset; e < this.tokenCount; e++) {
                let r = n
                  , i = this.offsetAndType[e]
                  , s = i & Wt;
                n = s,
                t(i >> qt, r, s, e)
            }
        }
        dump() {
            let t = new Array(this.tokenCount);
            return this.forEachToken(((e,n,r,i)=>{
                t[i] = {
                    idx: i,
                    type: Ft[e],
                    chunk: this.source.substring(n, r),
                    balance: this.balance[i]
                }
            }
            )),
            t
        }
    }
    ;
    function Qt(t, e) {
        function n(e) {
            return e < a ? t.charCodeAt(e) : 0
        }
        function r() {
            return c = Bt(t, c),
            vt(n(c), n(c + 1), n(c + 2)) ? (o = 12,
            void (c = Rt(t, c))) : 37 === n(c) ? (o = 11,
            void c++) : void (o = 10)
        }
        function i() {
            let e = c;
            return c = Rt(t, c),
            Nt(t, e, c, "url") && 40 === n(c) ? (c = Mt(t, c + 1),
            34 === n(c) || 39 === n(c) ? (o = 2,
            void (c = e + 4)) : void function() {
                for (o = 7,
                c = Mt(t, c); c < t.length; c++) {
                    let e = t.charCodeAt(c);
                    switch (Et(e)) {
                    case 41:
                        return void c++;
                    case At:
                        return c = Mt(t, c),
                        41 === n(c) || c >= t.length ? void (c < t.length && c++) : (c = zt(t, c),
                        void (o = 8));
                    case 34:
                    case 39:
                    case 40:
                    case Tt:
                        return c = zt(t, c),
                        void (o = 8);
                    case 92:
                        if (St(e, n(c + 1))) {
                            c = Dt(t, c) - 1;
                            break
                        }
                        return c = zt(t, c),
                        void (o = 8)
                    }
                }
            }()) : 40 === n(c) ? (o = 2,
            void c++) : void (o = 1)
        }
        function s(e) {
            for (e || (e = n(c++)),
            o = 5; c < t.length; c++) {
                let r = t.charCodeAt(c);
                switch (Et(r)) {
                case e:
                    return void c++;
                case At:
                    if (yt(r))
                        return c += It(t, c, r),
                        void (o = 6);
                    break;
                case 92:
                    if (c === t.length - 1)
                        break;
                    let i = n(c + 1);
                    yt(i) ? c += It(t, c + 1, i) : St(r, i) && (c = Dt(t, c) - 1)
                }
            }
        }
        let o, a = (t = String(t || "")).length, l = wt(n(0)), c = l;
        for (; c < a; ) {
            let a = t.charCodeAt(c);
            switch (Et(a)) {
            case At:
                o = 13,
                c = Mt(t, c + 1);
                break;
            case 34:
                s();
                break;
            case 35:
                gt(n(c + 1)) || St(n(c + 1), n(c + 2)) ? (o = 4,
                c = Rt(t, c + 1)) : (o = 9,
                c++);
                break;
            case 39:
                s();
                break;
            case 40:
                o = 21,
                c++;
                break;
            case 41:
                o = 22,
                c++;
                break;
            case 43:
                Ct(a, n(c + 1), n(c + 2)) ? r() : (o = 9,
                c++);
                break;
            case 44:
                o = 18,
                c++;
                break;
            case 45:
                Ct(a, n(c + 1), n(c + 2)) ? r() : 45 === n(c + 1) && 62 === n(c + 2) ? (o = 15,
                c += 3) : vt(a, n(c + 1), n(c + 2)) ? i() : (o = 9,
                c++);
                break;
            case 46:
                Ct(a, n(c + 1), n(c + 2)) ? r() : (o = 9,
                c++);
                break;
            case 47:
                42 === n(c + 1) ? (o = 25,
                c = t.indexOf("*/", c + 2),
                c = -1 === c ? t.length : c + 2) : (o = 9,
                c++);
                break;
            case 58:
                o = 16,
                c++;
                break;
            case 59:
                o = 17,
                c++;
                break;
            case 60:
                33 === n(c + 1) && 45 === n(c + 2) && 45 === n(c + 3) ? (o = 14,
                c += 4) : (o = 9,
                c++);
                break;
            case 64:
                vt(n(c + 1), n(c + 2), n(c + 3)) ? (o = 3,
                c = Rt(t, c + 1)) : (o = 9,
                c++);
                break;
            case 91:
                o = 19,
                c++;
                break;
            case 92:
                St(a, n(c + 1)) ? i() : (o = 9,
                c++);
                break;
            case 93:
                o = 20,
                c++;
                break;
            case 123:
                o = 23,
                c++;
                break;
            case 125:
                o = 24,
                c++;
                break;
            case Lt:
                r();
                break;
            case _t:
                i();
                break;
            default:
                o = 9,
                c++
            }
            e(o, l, l = c)
        }
    }
    var Kt, Yt = (Kt = ht(),
    ((t,e,n,r)=>{
        if (e && "object" == typeof e || "function" == typeof e)
            for (let n of et(e))
                !rt.call(t, n) && "default" !== n && Z(t, n, {
                    get: ()=>e[n],
                    enumerable: !(r = tt(e, n)) || r.enumerable
                });
        return t
    }
    )((t=>Z(t, "__esModule", {
        value: !0
    }))(Z(null != Kt ? X(nt(Kt)) : {}, "default", {
        value: Kt,
        enumerable: !0
    })), Kt)), Xt = new Set(["Atrule", "Selector", "Declaration"]), Zt = {};
    st(Zt, {
        safe: ()=>se,
        spec: ()=>ie
    });
    var te = (t,e)=>{
        if (9 === t && (t = e),
        "string" == typeof t) {
            let e = t.charCodeAt(0);
            return e > 127 ? 32768 : e << 8
        }
        return t
    }
      , ee = [[1, 1], [1, 2], [1, 7], [1, 8], [1, "-"], [1, 10], [1, 11], [1, 12], [1, 15], [1, 21], [3, 1], [3, 2], [3, 7], [3, 8], [3, "-"], [3, 10], [3, 11], [3, 12], [3, 15], [4, 1], [4, 2], [4, 7], [4, 8], [4, "-"], [4, 10], [4, 11], [4, 12], [4, 15], [12, 1], [12, 2], [12, 7], [12, 8], [12, "-"], [12, 10], [12, 11], [12, 12], [12, 15], ["#", 1], ["#", 2], ["#", 7], ["#", 8], ["#", "-"], ["#", 10], ["#", 11], ["#", 12], ["#", 15], ["-", 1], ["-", 2], ["-", 7], ["-", 8], ["-", "-"], ["-", 10], ["-", 11], ["-", 12], ["-", 15], [10, 1], [10, 2], [10, 7], [10, 8], [10, 10], [10, 11], [10, 12], [10, "%"], [10, 15], ["@", 1], ["@", 2], ["@", 7], ["@", 8], ["@", "-"], ["@", 15], [".", 10], [".", 11], [".", 12], ["+", 10], ["+", 11], ["+", 12], ["/", "*"]]
      , ne = ee.concat([[1, 4], [12, 4], [4, 4], [3, 21], [3, 5], [3, 16], [11, 11], [11, 12], [11, 2], [11, "-"], [22, 1], [22, 2], [22, 11], [22, 12], [22, 4], [22, "-"]]);
    function re(t) {
        let e = new Set(t.map((([t,e])=>te(t) << 16 | te(e))));
        return function(t, n, r) {
            let i = te(n, r)
              , s = r.charCodeAt(0);
            return (45 === s && 1 !== n && 2 !== n && 15 !== n || 43 === s ? e.has(t << 16 | s << 8) : e.has(t << 16 | i)) && this.emit(" ", 13, !0),
            i
        }
    }
    var ie = re(ee)
      , se = re(ne);
    function oe(t, e) {
        if ("function" != typeof e)
            t.children.forEach(this.node, this);
        else {
            let n = null;
            t.children.forEach((t=>{
                null !== n && e.call(this, n),
                this.node(t),
                n = t
            }
            ))
        }
    }
    function ae(t) {
        Qt(t, ((e,n,r)=>{
            this.token(e, t.slice(n, r))
        }
        ))
    }
    var le = {};
    st(le, {
        AnPlusB: ()=>ye,
        Atrule: ()=>be,
        AtrulePrelude: ()=>Se,
        AttributeSelector: ()=>Oe,
        Block: ()=>Ie,
        Brackets: ()=>Pe,
        CDC: ()=>Ne,
        CDO: ()=>Me,
        ClassSelector: ()=>De,
        Combinator: ()=>Be,
        Comment: ()=>ze,
        Declaration: ()=>Ue,
        DeclarationList: ()=>Fe,
        Dimension: ()=>Ve,
        Function: ()=>$e,
        Hash: ()=>Ge,
        IdSelector: ()=>He,
        Identifier: ()=>qe,
        MediaFeature: ()=>Qe,
        MediaQuery: ()=>Ke,
        MediaQueryList: ()=>Ye,
        NestingSelector: ()=>Ze,
        Nth: ()=>en,
        Number: ()=>nn,
        Operator: ()=>rn,
        Parentheses: ()=>sn,
        Percentage: ()=>an,
        PseudoClassSelector: ()=>cn,
        PseudoElementSelector: ()=>hn,
        Ratio: ()=>dn,
        Raw: ()=>mn,
        Rule: ()=>gn,
        Selector: ()=>yn,
        SelectorList: ()=>Sn,
        String: ()=>Ln,
        StyleSheet: ()=>_n,
        TypeSelector: ()=>In,
        UnicodeRange: ()=>Pn,
        Url: ()=>zn,
        Value: ()=>Un,
        WhiteSpace: ()=>Fn
    });
    var ce = 43
      , ue = 45
      , he = 110
      , de = !0;
    function pe(t, e) {
        let n = this.tokenStart + t
          , r = this.charCodeAt(n);
        for ((r === ce || r === ue) && (e && this.error("Number sign is not allowed"),
        n++); n < this.tokenEnd; n++)
            dt(this.charCodeAt(n)) || this.error("Integer is expected", n)
    }
    function fe(t) {
        return pe.call(this, 0, t)
    }
    function me(t, e) {
        if (!this.cmpChar(this.tokenStart + t, e)) {
            let n = "";
            switch (e) {
            case he:
                n = "N is expected";
                break;
            case ue:
                n = "HyphenMinus is expected"
            }
            this.error(n, this.tokenStart + t)
        }
    }
    function ge() {
        let t = 0
          , e = 0
          , n = this.tokenType;
        for (; 13 === n || 25 === n; )
            n = this.lookupType(++t);
        if (10 !== n) {
            if (!this.isDelim(ce, t) && !this.isDelim(ue, t))
                return null;
            e = this.isDelim(ce, t) ? ce : ue;
            do {
                n = this.lookupType(++t)
            } while (13 === n || 25 === n);
            10 !== n && (this.skip(t),
            fe.call(this, de))
        }
        return t > 0 && this.skip(t),
        0 === e && (n = this.charCodeAt(this.tokenStart),
        n !== ce && n !== ue && this.error("Number sign is expected")),
        fe.call(this, 0 !== e),
        e === ue ? "-" + this.consume(10) : this.consume(10)
    }
    function ke() {
        let t = this.tokenStart
          , e = null
          , n = null;
        if (10 === this.tokenType)
            fe.call(this, !1),
            n = this.consume(10);
        else if (1 === this.tokenType && this.cmpChar(this.tokenStart, ue))
            switch (e = "-1",
            me.call(this, 1, he),
            this.tokenEnd - this.tokenStart) {
            case 2:
                this.next(),
                n = ge.call(this);
                break;
            case 3:
                me.call(this, 2, ue),
                this.next(),
                this.skipSC(),
                fe.call(this, de),
                n = "-" + this.consume(10);
                break;
            default:
                me.call(this, 2, ue),
                pe.call(this, 3, de),
                this.next(),
                n = this.substrToCursor(t + 2)
            }
        else if (1 === this.tokenType || this.isDelim(ce) && 1 === this.lookupType(1)) {
            let r = 0;
            switch (e = "1",
            this.isDelim(ce) && (r = 1,
            this.next()),
            me.call(this, 0, he),
            this.tokenEnd - this.tokenStart) {
            case 1:
                this.next(),
                n = ge.call(this);
                break;
            case 2:
                me.call(this, 1, ue),
                this.next(),
                this.skipSC(),
                fe.call(this, de),
                n = "-" + this.consume(10);
                break;
            default:
                me.call(this, 1, ue),
                pe.call(this, 2, de),
                this.next(),
                n = this.substrToCursor(t + r + 1)
            }
        } else if (12 === this.tokenType) {
            let r = this.charCodeAt(this.tokenStart)
              , i = r === ce || r === ue
              , s = this.tokenStart + i;
            for (; s < this.tokenEnd && dt(this.charCodeAt(s)); s++)
                ;
            s === this.tokenStart + i && this.error("Integer is expected", this.tokenStart + i),
            me.call(this, s - this.tokenStart, he),
            e = this.substring(t, s),
            s + 1 === this.tokenEnd ? (this.next(),
            n = ge.call(this)) : (me.call(this, s - this.tokenStart + 1, ue),
            s + 2 === this.tokenEnd ? (this.next(),
            this.skipSC(),
            fe.call(this, de),
            n = "-" + this.consume(10)) : (pe.call(this, s - this.tokenStart + 2, de),
            this.next(),
            n = this.substrToCursor(s + 1)))
        } else
            this.error();
        return null !== e && e.charCodeAt(0) === ce && (e = e.substr(1)),
        null !== n && n.charCodeAt(0) === ce && (n = n.substr(1)),
        {
            type: "AnPlusB",
            loc: this.getLocation(t, this.tokenStart),
            a: e,
            b: n
        }
    }
    function ye(t) {
        if (t.a) {
            let e = ("+1" === t.a || "1" === t.a ? "n" : "-1" === t.a && "-n") || t.a + "n";
            if (t.b) {
                let n = "-" === t.b[0] || "+" === t.b[0] ? t.b : "+" + t.b;
                this.tokenize(e + n)
            } else
                this.tokenize(e)
        } else
            this.tokenize(t.b)
    }
    function be(t) {
        this.token(3, "@" + t.name),
        null !== t.prelude && this.node(t.prelude),
        t.block ? this.node(t.block) : this.token(17, ";")
    }
    function Se(t) {
        this.children(t)
    }
    var ve = 36
      , Ce = 42
      , we = 61
      , xe = 94
      , Ae = 124
      , Le = 126;
    function _e() {
        this.eof && this.error("Unexpected end of input");
        let t = this.tokenStart
          , e = !1;
        return this.isDelim(Ce) ? (e = !0,
        this.next()) : this.isDelim(Ae) || this.eat(1),
        this.isDelim(Ae) ? this.charCodeAt(this.tokenStart + 1) !== we ? (this.next(),
        this.eat(1)) : e && this.error("Identifier is expected", this.tokenEnd) : e && this.error("Vertical line is expected"),
        {
            type: "Identifier",
            loc: this.getLocation(t, this.tokenStart),
            name: this.substrToCursor(t)
        }
    }
    function Te() {
        let t = this.tokenStart
          , e = this.charCodeAt(t);
        return e !== we && e !== Le && e !== xe && e !== ve && e !== Ce && e !== Ae && this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),
        this.next(),
        e !== we && (this.isDelim(we) || this.error("Equal sign is expected"),
        this.next()),
        this.substrToCursor(t)
    }
    function Ee() {
        let t, e = this.tokenStart, n = null, r = null, i = null;
        return this.eat(19),
        this.skipSC(),
        t = _e.call(this),
        this.skipSC(),
        20 !== this.tokenType && (1 !== this.tokenType && (n = Te.call(this),
        this.skipSC(),
        r = 5 === this.tokenType ? this.String() : this.Identifier(),
        this.skipSC()),
        1 === this.tokenType && (i = this.consume(1),
        this.skipSC())),
        this.eat(20),
        {
            type: "AttributeSelector",
            loc: this.getLocation(e, this.tokenStart),
            name: t,
            matcher: n,
            value: r,
            flags: i
        }
    }
    function Oe(t) {
        this.token(9, "["),
        this.node(t.name),
        null !== t.matcher && (this.tokenize(t.matcher),
        this.node(t.value)),
        null !== t.flags && this.token(1, t.flags),
        this.token(9, "]")
    }
    function Ie(t) {
        this.token(23, "{"),
        this.children(t, (t=>{
            "Declaration" === t.type && this.token(17, ";")
        }
        )),
        this.token(24, "}")
    }
    function Pe(t) {
        this.token(9, "["),
        this.children(t),
        this.token(9, "]")
    }
    function Ne() {
        this.token(15, "--\x3e")
    }
    function Me() {
        this.token(14, "\x3c!--")
    }
    function je() {
        return this.eatDelim(46),
        {
            type: "ClassSelector",
            loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
            name: this.consume(1)
        }
    }
    function De(t) {
        this.token(9, "."),
        this.token(1, t.name)
    }
    function Re() {
        let t, e = this.tokenStart;
        switch (this.tokenType) {
        case 13:
            t = " ";
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
            t = this.substrToCursor(e)
        }
        return {
            type: "Combinator",
            loc: this.getLocation(e, this.tokenStart),
            name: t
        }
    }
    function Be(t) {
        this.tokenize(t.name)
    }
    function ze(t) {
        this.token(25, "/*" + t.value + "*/")
    }
    function Ue(t) {
        this.token(1, t.property),
        this.token(16, ":"),
        this.node(t.value),
        t.important && (this.token(9, "!"),
        this.token(1, !0 === t.important ? "important" : t.important))
    }
    function Fe(t) {
        this.children(t, (t=>{
            "Declaration" === t.type && this.token(17, ";")
        }
        ))
    }
    function Ve(t) {
        this.token(12, t.value + t.unit)
    }
    function $e(t) {
        this.token(2, t.name + "("),
        this.children(t),
        this.token(22, ")")
    }
    function Ge(t) {
        this.token(4, "#" + t.value)
    }
    function We() {
        return {
            type: "Identifier",
            loc: this.getLocation(this.tokenStart, this.tokenEnd),
            name: this.consume(1)
        }
    }
    function qe(t) {
        this.token(1, t.name)
    }
    function Je() {
        let t = this.tokenStart;
        return this.eat(4),
        {
            type: "IdSelector",
            loc: this.getLocation(t, this.tokenStart),
            name: this.substrToCursor(t + 1)
        }
    }
    function He(t) {
        this.token(9, "#" + t.name)
    }
    function Qe(t) {
        this.token(21, "("),
        this.token(1, t.name),
        null !== t.value && (this.token(16, ":"),
        this.node(t.value)),
        this.token(22, ")")
    }
    function Ke(t) {
        this.children(t)
    }
    function Ye(t) {
        this.children(t, (()=>this.token(18, ",")))
    }
    function Xe() {
        let t = this.tokenStart;
        return this.eatDelim(38),
        {
            type: "NestingSelector",
            loc: this.getLocation(t, this.tokenStart)
        }
    }
    function Ze() {
        this.token(9, "&")
    }
    function tn() {
        this.skipSC();
        let t, e = this.tokenStart, n = e, r = null;
        return t = this.lookupValue(0, "odd") || this.lookupValue(0, "even") ? this.Identifier() : this.AnPlusB(),
        n = this.tokenStart,
        this.skipSC(),
        this.lookupValue(0, "of") && (this.next(),
        r = this.SelectorList(),
        n = this.tokenStart),
        {
            type: "Nth",
            loc: this.getLocation(e, n),
            nth: t,
            selector: r
        }
    }
    function en(t) {
        this.node(t.nth),
        null !== t.selector && (this.token(1, "of"),
        this.node(t.selector))
    }
    function nn(t) {
        this.token(10, t.value)
    }
    function rn(t) {
        this.tokenize(t.value)
    }
    function sn(t) {
        this.token(21, "("),
        this.children(t),
        this.token(22, ")")
    }
    function on() {
        return {
            type: "Percentage",
            loc: this.getLocation(this.tokenStart, this.tokenEnd),
            value: this.consumeNumber(11)
        }
    }
    function an(t) {
        this.token(11, t.value + "%")
    }
    function ln() {
        let t, e, n = this.tokenStart, r = null;
        return this.eat(16),
        2 === this.tokenType ? (t = this.consumeFunctionName(),
        e = t.toLowerCase(),
        hasOwnProperty.call(this.pseudo, e) ? (this.skipSC(),
        r = this.pseudo[e].call(this),
        this.skipSC()) : (r = this.createList(),
        r.push(this.Raw(this.tokenIndex, null, !1))),
        this.eat(22)) : t = this.consume(1),
        {
            type: "PseudoClassSelector",
            loc: this.getLocation(n, this.tokenStart),
            name: t,
            children: r
        }
    }
    function cn(t) {
        this.token(16, ":"),
        null === t.children ? this.token(1, t.name) : (this.token(2, t.name + "("),
        this.children(t),
        this.token(22, ")"))
    }
    function un() {
        let t, e, n = this.tokenStart, r = null;
        return this.eat(16),
        this.eat(16),
        2 === this.tokenType ? (t = this.consumeFunctionName(),
        e = t.toLowerCase(),
        hasOwnProperty.call(this.pseudo, e) ? (this.skipSC(),
        r = this.pseudo[e].call(this),
        this.skipSC()) : (r = this.createList(),
        r.push(this.Raw(this.tokenIndex, null, !1))),
        this.eat(22)) : t = this.consume(1),
        {
            type: "PseudoElementSelector",
            loc: this.getLocation(n, this.tokenStart),
            name: t,
            children: r
        }
    }
    function hn(t) {
        this.token(16, ":"),
        this.token(16, ":"),
        null === t.children ? this.token(1, t.name) : (this.token(2, t.name + "("),
        this.children(t),
        this.token(22, ")"))
    }
    function dn(t) {
        this.token(10, t.left),
        this.token(9, "/"),
        this.token(10, t.right)
    }
    function pn() {
        return this.tokenIndex > 0 && 13 === this.lookupType(-1) ? this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset : this.tokenStart
    }
    function fn(t, e, n) {
        let r, i = this.getTokenStart(t);
        return this.skipUntilBalanced(t, e || this.consumeUntilBalanceEnd),
        r = n && this.tokenStart > i ? pn.call(this) : this.tokenStart,
        {
            type: "Raw",
            loc: this.getLocation(i, r),
            value: this.substring(i, r)
        }
    }
    function mn(t) {
        this.tokenize(t.value)
    }
    function gn(t) {
        this.node(t.prelude),
        this.node(t.block)
    }
    function kn() {
        let t = this.readSequence(this.scope.Selector);
        return null === this.getFirstListNode(t) && this.error("Selector is expected"),
        {
            type: "Selector",
            loc: this.getLocationFromList(t),
            children: t
        }
    }
    function yn(t) {
        this.children(t)
    }
    function bn() {
        let t = this.createList();
        for (; !this.eof && (t.push(this.Selector()),
        18 === this.tokenType); )
            this.next();
        return {
            type: "SelectorList",
            loc: this.getLocationFromList(t),
            children: t
        }
    }
    function Sn(t) {
        this.children(t, (()=>this.token(18, ",")))
    }
    var vn = 92
      , Cn = 34
      , wn = 39;
    function xn(t) {
        let e = t.length
          , n = t.charCodeAt(0)
          , r = n === Cn || n === wn ? 1 : 0
          , i = 1 === r && e > 1 && t.charCodeAt(e - 1) === n ? e - 2 : e - 1
          , s = "";
        for (let n = r; n <= i; n++) {
            let r = t.charCodeAt(n);
            if (r === vn) {
                if (n === i) {
                    n !== e - 1 && (s = t.substr(n + 1));
                    break
                }
                if (r = t.charCodeAt(++n),
                St(vn, r)) {
                    let e = n - 1
                      , r = Dt(t, e);
                    n = r - 1,
                    s += Ut(t.substring(e + 1, r))
                } else
                    13 === r && 10 === t.charCodeAt(n + 1) && n++
            } else
                s += t[n]
        }
        return s
    }
    function An() {
        return {
            type: "String",
            loc: this.getLocation(this.tokenStart, this.tokenEnd),
            value: xn(this.consume(5))
        }
    }
    function Ln(t) {
        this.token(5, function(t, e) {
            let n = Cn
              , r = ""
              , i = !1;
            for (let e = 0; e < t.length; e++) {
                let s = t.charCodeAt(e);
                0 !== s ? s <= 31 || 127 === s ? (r += "\\" + s.toString(16),
                i = !0) : s === n || s === vn ? (r += "\\" + t.charAt(e),
                i = !1) : (i && (pt(s) || bt(s)) && (r += " "),
                r += t.charAt(e),
                i = !1) : r += "\ufffd"
            }
            return '"' + r + '"'
        }(t.value))
    }
    function _n(t) {
        this.children(t)
    }
    var Tn = 42;
    function En() {
        1 !== this.tokenType && !1 === this.isDelim(Tn) && this.error("Identifier or asterisk is expected"),
        this.next()
    }
    function On() {
        let t = this.tokenStart;
        return this.isDelim(124) ? (this.next(),
        En.call(this)) : (En.call(this),
        this.isDelim(124) && (this.next(),
        En.call(this))),
        {
            type: "TypeSelector",
            loc: this.getLocation(t, this.tokenStart),
            name: this.substrToCursor(t)
        }
    }
    function In(t) {
        this.tokenize(t.name)
    }
    function Pn(t) {
        this.tokenize(t.value)
    }
    var Nn = 32
      , Mn = 92
      , jn = 34
      , Dn = 39
      , Rn = 40
      , Bn = 41;
    function zn(t) {
        this.token(7, function(t) {
            let e = ""
              , n = !1;
            for (let r = 0; r < t.length; r++) {
                let i = t.charCodeAt(r);
                0 !== i ? i <= 31 || 127 === i ? (e += "\\" + i.toString(16),
                n = !0) : i === Nn || i === Mn || i === jn || i === Dn || i === Rn || i === Bn ? (e += "\\" + t.charAt(r),
                n = !1) : (n && pt(i) && (e += " "),
                e += t.charAt(r),
                n = !1) : e += "\ufffd"
            }
            return "url(" + e + ")"
        }(t.value))
    }
    function Un(t) {
        this.children(t)
    }
    function Fn(t) {
        this.token(13, t.value)
    }
    var Vn = function(t) {
        let e = new Map;
        for (let n in t.node) {
            let r = t.node[n];
            "function" == typeof (r.generate || r) && e.set(n, r.generate || r)
        }
        return function(t, n) {
            let r = ""
              , i = 0
              , s = {
                node(t) {
                    if (!e.has(t.type))
                        throw new Error("Unknown node type: " + t.type);
                    e.get(t.type).call(o, t)
                },
                tokenBefore: se,
                token(t, e) {
                    i = this.tokenBefore(i, t, e),
                    this.emit(e, t, !1),
                    9 === t && 92 === e.charCodeAt(0) && this.emit("\n", 13, !0)
                },
                emit(t) {
                    r += t
                },
                result: ()=>r
            };
            n && ("function" == typeof n.decorator && (s = n.decorator(s)),
            n.sourceMap && (s = function(t) {
                let e = new Yt.SourceMapGenerator
                  , n = {
                    line: 1,
                    column: 0
                }
                  , r = {
                    line: 0,
                    column: 0
                }
                  , i = {
                    line: 1,
                    column: 0
                }
                  , s = {
                    generated: i
                }
                  , o = 1
                  , a = 0
                  , l = !1
                  , c = t.node;
                t.node = function(t) {
                    if (t.loc && t.loc.start && Xt.has(t.type)) {
                        let c = t.loc.start.line
                          , u = t.loc.start.column - 1;
                        (r.line !== c || r.column !== u) && (r.line = c,
                        r.column = u,
                        n.line = o,
                        n.column = a,
                        l && (l = !1,
                        (n.line !== i.line || n.column !== i.column) && e.addMapping(s)),
                        l = !0,
                        e.addMapping({
                            source: t.loc.source,
                            original: r,
                            generated: n
                        }))
                    }
                    c.call(this, t),
                    l && Xt.has(t.type) && (i.line = o,
                    i.column = a)
                }
                ;
                let u = t.emit;
                t.emit = function(t, e, n) {
                    for (let e = 0; e < t.length; e++)
                        10 === t.charCodeAt(e) ? (o++,
                        a = 0) : a++;
                    u(t, e, n)
                }
                ;
                let h = t.result;
                return t.result = function() {
                    return l && e.addMapping(s),
                    {
                        css: h(),
                        map: e
                    }
                }
                ,
                t
            }(s)),
            n.mode in Zt && (s.tokenBefore = Zt[n.mode]));
            let o = {
                node: t=>s.node(t),
                children: oe,
                token: (t,e)=>s.token(t, e),
                tokenize: ae
            };
            return s.node(t),
            s.result()
        }
    }({
        node: le
    })
      , $n = null
      , Gn = class {
        static createItem(t) {
            return {
                prev: null,
                next: null,
                data: t
            }
        }
        constructor() {
            this.head = null,
            this.tail = null,
            this.cursor = null
        }
        createItem(t) {
            return Gn.createItem(t)
        }
        allocateCursor(t, e) {
            let n;
            return null !== $n ? (n = $n,
            $n = $n.cursor,
            n.prev = t,
            n.next = e,
            n.cursor = this.cursor) : n = {
                prev: t,
                next: e,
                cursor: this.cursor
            },
            this.cursor = n,
            n
        }
        releaseCursor() {
            let {cursor: t} = this;
            this.cursor = t.cursor,
            t.prev = null,
            t.next = null,
            t.cursor = $n,
            $n = t
        }
        updateCursors(t, e, n, r) {
            let {cursor: i} = this;
            for (; null !== i; )
                i.prev === t && (i.prev = e),
                i.next === n && (i.next = r),
                i = i.cursor
        }
        *[Symbol.iterator]() {
            for (let t = this.head; null !== t; t = t.next)
                yield t.data
        }
        get size() {
            let t = 0;
            for (let e = this.head; null !== e; e = e.next)
                t++;
            return t
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
        fromArray(t) {
            let e = null;
            this.head = null;
            for (let n of t) {
                let t = Gn.createItem(n);
                null !== e ? e.next = t : this.head = t,
                t.prev = e,
                e = t
            }
            return this.tail = e,
            this
        }
        toArray() {
            return [...this]
        }
        toJSON() {
            return [...this]
        }
        forEach(t, e=this) {
            let n = this.allocateCursor(null, this.head);
            for (; null !== n.next; ) {
                let r = n.next;
                n.next = r.next,
                t.call(e, r.data, r, this)
            }
            this.releaseCursor()
        }
        forEachRight(t, e=this) {
            let n = this.allocateCursor(this.tail, null);
            for (; null !== n.prev; ) {
                let r = n.prev;
                n.prev = r.prev,
                t.call(e, r.data, r, this)
            }
            this.releaseCursor()
        }
        reduce(t, e, n=this) {
            let r, i = this.allocateCursor(null, this.head), s = e;
            for (; null !== i.next; )
                r = i.next,
                i.next = r.next,
                s = t.call(n, s, r.data, r, this);
            return this.releaseCursor(),
            s
        }
        reduceRight(t, e, n=this) {
            let r, i = this.allocateCursor(this.tail, null), s = e;
            for (; null !== i.prev; )
                r = i.prev,
                i.prev = r.prev,
                s = t.call(n, s, r.data, r, this);
            return this.releaseCursor(),
            s
        }
        some(t, e=this) {
            for (let n = this.head; null !== n; n = n.next)
                if (t.call(e, n.data, n, this))
                    return !0;
            return !1
        }
        map(t, e=this) {
            let n = new Gn;
            for (let r = this.head; null !== r; r = r.next)
                n.appendData(t.call(e, r.data, r, this));
            return n
        }
        filter(t, e=this) {
            let n = new Gn;
            for (let r = this.head; null !== r; r = r.next)
                t.call(e, r.data, r, this) && n.appendData(r.data);
            return n
        }
        nextUntil(t, e, n=this) {
            if (null === t)
                return;
            let r = this.allocateCursor(null, t);
            for (; null !== r.next; ) {
                let t = r.next;
                if (r.next = t.next,
                e.call(n, t.data, t, this))
                    break
            }
            this.releaseCursor()
        }
        prevUntil(t, e, n=this) {
            if (null === t)
                return;
            let r = this.allocateCursor(t, null);
            for (; null !== r.prev; ) {
                let t = r.prev;
                if (r.prev = t.prev,
                e.call(n, t.data, t, this))
                    break
            }
            this.releaseCursor()
        }
        clear() {
            this.head = null,
            this.tail = null
        }
        copy() {
            let t = new Gn;
            for (let e of this)
                t.appendData(e);
            return t
        }
        prepend(t) {
            return this.updateCursors(null, t, this.head, t),
            null !== this.head ? (this.head.prev = t,
            t.next = this.head) : this.tail = t,
            this.head = t,
            this
        }
        prependData(t) {
            return this.prepend(Gn.createItem(t))
        }
        append(t) {
            return this.insert(t)
        }
        appendData(t) {
            return this.insert(Gn.createItem(t))
        }
        insert(t, e=null) {
            if (null !== e)
                if (this.updateCursors(e.prev, t, e, t),
                null === e.prev) {
                    if (this.head !== e)
                        throw new Error("before doesn't belong to list");
                    this.head = t,
                    e.prev = t,
                    t.next = e,
                    this.updateCursors(null, t)
                } else
                    e.prev.next = t,
                    t.prev = e.prev,
                    e.prev = t,
                    t.next = e;
            else
                this.updateCursors(this.tail, t, null, t),
                null !== this.tail ? (this.tail.next = t,
                t.prev = this.tail) : this.head = t,
                this.tail = t;
            return this
        }
        insertData(t, e) {
            return this.insert(Gn.createItem(t), e)
        }
        remove(t) {
            if (this.updateCursors(t, t.prev, t, t.next),
            null !== t.prev)
                t.prev.next = t.next;
            else {
                if (this.head !== t)
                    throw new Error("item doesn't belong to list");
                this.head = t.next
            }
            if (null !== t.next)
                t.next.prev = t.prev;
            else {
                if (this.tail !== t)
                    throw new Error("item doesn't belong to list");
                this.tail = t.prev
            }
            return t.prev = null,
            t.next = null,
            t
        }
        push(t) {
            this.insert(Gn.createItem(t))
        }
        pop() {
            return null !== this.tail ? this.remove(this.tail) : null
        }
        unshift(t) {
            this.prepend(Gn.createItem(t))
        }
        shift() {
            return null !== this.head ? this.remove(this.head) : null
        }
        prependList(t) {
            return this.insertList(t, this.head)
        }
        appendList(t) {
            return this.insertList(t)
        }
        insertList(t, e) {
            return null === t.head || (null != e ? (this.updateCursors(e.prev, t.tail, e, t.head),
            null !== e.prev ? (e.prev.next = t.head,
            t.head.prev = e.prev) : this.head = t.head,
            e.prev = t.tail,
            t.tail.next = e) : (this.updateCursors(this.tail, t.tail, null, t.head),
            null !== this.tail ? (this.tail.next = t.head,
            t.head.prev = this.tail) : this.head = t.head,
            this.tail = t.tail),
            t.head = null,
            t.tail = null),
            this
        }
        replace(t, e) {
            "head"in e ? this.insertList(e, t) : this.insert(e, t),
            this.remove(t)
        }
    }
      , Wn = 100
      , qn = 60
      , Jn = "    ";
    function Hn({source: t, line: e, column: n}, r) {
        function i(t, e) {
            return s.slice(t, e).map(((e,n)=>String(t + n + 1).padStart(l) + " |" + e)).join("\n")
        }
        let s = t.split(/\r\n?|\n|\f/)
          , o = Math.max(1, e - r) - 1
          , a = Math.min(e + r, s.length + 1)
          , l = Math.max(4, String(a).length) + 1
          , c = 0;
        (n += (Jn.length - 1) * (s[e - 1].substr(0, n - 1).match(/\t/g) || []).length) > Wn && (c = n - qn + 3,
        n = qn - 2);
        for (let t = o; t <= a; t++)
            t >= 0 && t < s.length && (s[t] = s[t].replace(/\t/g, Jn),
            s[t] = (c > 0 && s[t].length > c ? "\u2026" : "") + s[t].substr(c, Wn - 2) + (s[t].length > c + Wn - 1 ? "\u2026" : ""));
        return [i(o, e), new Array(n + l + 2).join("-") + "^", i(e, a)].filter(Boolean).join("\n")
    }
    function Qn(t, e, n, r, i) {
        return Object.assign(function(t, e) {
            let n = Object.create(SyntaxError.prototype)
              , r = new Error;
            return Object.assign(n, {
                name: t,
                message: e,
                get stack() {
                    return (r.stack || "").replace(/^(.+\n){1,3}/, `${t}: ${e}\n`)
                }
            })
        }("SyntaxError", t), {
            source: e,
            offset: n,
            line: r,
            column: i,
            sourceFragment: t=>Hn({
                source: e,
                line: r,
                column: i
            }, isNaN(t) ? 0 : t),
            get formattedMessage() {
                return `Parse error: ${t}\n` + Hn({
                    source: e,
                    line: r,
                    column: i
                }, 2)
            }
        })
    }
    function Kn(t) {
        let e = this.createList()
          , n = !1
          , r = {
            recognizer: t
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
            let i = t.getNode.call(this, r);
            if (void 0 === i)
                break;
            n && (t.onWhiteSpace && t.onWhiteSpace.call(this, i, e, r),
            n = !1),
            e.push(i)
        }
        return n && t.onWhiteSpace && t.onWhiteSpace.call(this, null, e, r),
        e
    }
    var Yn = ()=>{}
    ;
    function Xn(t) {
        return function() {
            return this[t]()
        }
    }
    function Zn(t) {
        let e = Object.create(null);
        for (let n in t) {
            let r = t[n]
              , i = r.parse || r;
            i && (e[n] = i)
        }
        return e
    }
    var tr = {
        parse() {
            return this.createSingleNodeList(this.SelectorList())
        }
    }
      , er = {
        parse() {
            return this.createSingleNodeList(this.Selector())
        }
    }
      , nr = {
        parse() {
            return this.createSingleNodeList(this.Identifier())
        }
    }
      , rr = {
        parse() {
            return this.createSingleNodeList(this.Nth())
        }
    }
      , ir = {
        dir: nr,
        has: tr,
        lang: nr,
        matches: tr,
        is: tr,
        "-moz-any": tr,
        "-webkit-any": tr,
        where: tr,
        not: tr,
        "nth-child": rr,
        "nth-last-child": rr,
        "nth-last-of-type": rr,
        "nth-of-type": rr,
        slotted: er,
        host: er,
        "host-context": er
    }
      , sr = {};
    st(sr, {
        AnPlusB: ()=>ke,
        AttributeSelector: ()=>Ee,
        ClassSelector: ()=>je,
        Combinator: ()=>Re,
        IdSelector: ()=>Je,
        Identifier: ()=>We,
        NestingSelector: ()=>Xe,
        Nth: ()=>tn,
        Percentage: ()=>on,
        PseudoClassSelector: ()=>ln,
        PseudoElementSelector: ()=>un,
        Raw: ()=>fn,
        Selector: ()=>kn,
        SelectorList: ()=>bn,
        String: ()=>An,
        TypeSelector: ()=>On
    });
    var or = function(t) {
        let e = ""
          , n = "<unknown>"
          , r = !1
          , i = Yn
          , s = !1
          , o = new Gt
          , a = Object.assign(new Ht, function(t) {
            let e = {
                context: Object.create(null),
                scope: Object.assign(Object.create(null), t.scope),
                atrule: Zn(t.atrule),
                pseudo: Zn(t.pseudo),
                node: Zn(t.node)
            };
            for (let n in t.parseContext)
                switch (typeof t.parseContext[n]) {
                case "function":
                    e.context[n] = t.parseContext[n];
                    break;
                case "string":
                    e.context[n] = Xn(t.parseContext[n])
                }
            return {
                config: e,
                ...e,
                ...e.node
            }
        }(t || {}), {
            parseAtrulePrelude: !0,
            parseRulePrelude: !0,
            parseValue: !0,
            parseCustomProperty: !1,
            readSequence: Kn,
            consumeUntilBalanceEnd: ()=>0,
            consumeUntilLeftCurlyBracket: t=>123 === t ? 1 : 0,
            consumeUntilLeftCurlyBracketOrSemicolon: t=>123 === t || 59 === t ? 1 : 0,
            consumeUntilExclamationMarkOrSemicolon: t=>33 === t || 59 === t ? 1 : 0,
            consumeUntilSemicolonIncluded: t=>59 === t ? 2 : 0,
            createList: ()=>new Gn,
            createSingleNodeList: t=>(new Gn).appendData(t),
            getFirstListNode: t=>t && t.first,
            getLastListNode: t=>t && t.last,
            parseWithFallback(t, e) {
                let n = this.tokenIndex;
                try {
                    return t.call(this)
                } catch (t) {
                    if (s)
                        throw t;
                    let r = e.call(this, n);
                    return s = !0,
                    i(t, r),
                    s = !1,
                    r
                }
            },
            lookupNonWSType(t) {
                let e;
                do {
                    if (e = this.lookupType(t++),
                    13 !== e)
                        return e
                } while (0 !== e);
                return 0
            },
            charCodeAt: t=>t >= 0 && t < e.length ? e.charCodeAt(t) : 0,
            substring: (t,n)=>e.substring(t, n),
            substrToCursor(t) {
                return this.source.substring(t, this.tokenStart)
            },
            cmpChar: (t,n)=>Pt(e, t, n),
            cmpStr: (t,n,r)=>Nt(e, t, n, r),
            consume(t) {
                let e = this.tokenStart;
                return this.eat(t),
                this.substrToCursor(e)
            },
            consumeFunctionName() {
                let t = e.substring(this.tokenStart, this.tokenEnd - 1);
                return this.eat(2),
                t
            },
            consumeNumber(t) {
                let n = e.substring(this.tokenStart, Bt(e, this.tokenStart));
                return this.eat(t),
                n
            },
            eat(t) {
                if (this.tokenType !== t) {
                    let e = Ft[t].slice(0, -6).replace(/-/g, " ").replace(/^./, (t=>t.toUpperCase()))
                      , n = `${/[[\](){}]/.test(e) ? `"${e}"` : e} is expected`
                      , r = this.tokenStart;
                    switch (t) {
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
            eatIdent(t) {
                (1 !== this.tokenType || !1 === this.lookupValue(0, t)) && this.error(`Identifier "${t}" is expected`),
                this.next()
            },
            eatDelim(t) {
                this.isDelim(t) || this.error(`Delim "${String.fromCharCode(t)}" is expected`),
                this.next()
            },
            getLocation: (t,e)=>r ? o.getLocationRange(t, e, n) : null,
            getLocationFromList(t) {
                if (r) {
                    let e = this.getFirstListNode(t)
                      , r = this.getLastListNode(t);
                    return o.getLocationRange(null !== e ? e.loc.start.offset - o.startOffset : this.tokenStart, null !== r ? r.loc.end.offset - o.startOffset : this.tokenStart, n)
                }
                return null
            },
            error(t, n) {
                let r = typeof n < "u" && n < e.length ? o.getLocation(n) : this.eof ? o.getLocation(function(t, e) {
                    for (; e >= 0 && bt(t.charCodeAt(e)); e--)
                        ;
                    return e + 1
                }(e, e.length - 1)) : o.getLocation(this.tokenStart);
                throw new Qn(t || "Unexpected input",e,r.offset,r.line,r.column)
            }
        });
        return Object.assign((function(t, l) {
            e = t,
            l = l || {},
            a.setSource(e, Qt),
            o.setSource(e, l.offset, l.line, l.column),
            n = l.filename || "<unknown>",
            r = Boolean(l.positions),
            i = "function" == typeof l.onParseError ? l.onParseError : Yn,
            s = !1,
            a.parseAtrulePrelude = !("parseAtrulePrelude"in l) || Boolean(l.parseAtrulePrelude),
            a.parseRulePrelude = !("parseRulePrelude"in l) || Boolean(l.parseRulePrelude),
            a.parseValue = !("parseValue"in l) || Boolean(l.parseValue),
            a.parseCustomProperty = "parseCustomProperty"in l && Boolean(l.parseCustomProperty);
            let {context: c="default", onComment: u} = l;
            if (!(c in a.context))
                throw new Error("Unknown context `" + c + "`");
            "function" == typeof u && a.forEachToken(((t,n,r)=>{
                if (25 === t) {
                    let t = a.getLocation(n, r)
                      , i = Nt(e, r - 2, r, "*/") ? e.slice(n + 2, r - 2) : e.slice(n + 2, r);
                    u(i, t)
                }
            }
            ));
            let h = a.context[c].call(a, l);
            return a.eof || a.error(),
            h
        }
        ), {
            SyntaxError: Qn,
            config: a.config
        })
    }({
        parseContext: {
            default: "SelectorList",
            selectorList: "SelectorList",
            selector: "Selector"
        },
        scope: {
            Selector: {
                onWhiteSpace: function(t, e) {
                    null !== e.last && "Combinator" !== e.last.type && null !== t && "Combinator" !== t.type && e.push({
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
        pseudo: ir,
        node: sr
    })
      , ar = (t,e)=>t.a === e.a ? t.b === e.b ? t.c - e.c : t.b - e.b : t.a - e.a
      , lr = (t,e)=>0 === ar(t, e)
      , cr = (t,e)=>ar(t, e) > 0
      , ur = (t,e)=>ar(t, e) < 0
      , hr = (t,e="ASC")=>{
        let n = t.sort(ar);
        return "DESC" === e ? n.reverse() : n
    }
      , dr = (...t)=>hr(t, "ASC")
      , pr = (...t)=>hr(t, "DESC")
      , fr = (...t)=>pr(...t)[0]
      , mr = t=>{
        let e = {
            a: 0,
            b: 0,
            c: 0
        };
        return t.children.forEach((t=>{
            switch (t.type) {
            case "IdSelector":
                e.a += 1;
                break;
            case "AttributeSelector":
            case "ClassSelector":
                e.b += 1;
                break;
            case "PseudoClassSelector":
                switch (t.name.toLowerCase()) {
                case "where":
                    break;
                case "is":
                case "matches":
                case "-webkit-any":
                case "-moz-any":
                case "any":
                case "not":
                case "has":
                    if (t.children) {
                        let n = fr(...gr(t.children.first));
                        e.a += n.a,
                        e.b += n.b,
                        e.c += n.c
                    }
                    break;
                case "nth-child":
                case "nth-last-child":
                    if (e.b += 1,
                    t.children.first.selector) {
                        let n = fr(...gr(t.children.first.selector));
                        e.a += n.a,
                        e.b += n.b,
                        e.c += n.c
                    }
                    break;
                case "host-context":
                case "host":
                    if (e.b += 1,
                    t.children) {
                        let n = {
                            type: "Selector",
                            children: []
                        }
                          , r = !1;
                        t.children.first.children.forEach((t=>!r && ("Combinator" === t.type ? (r = !0,
                        !1) : void n.children.push(t))));
                        let i = gr(n)[0];
                        e.a += i.a,
                        e.b += i.b,
                        e.c += i.c
                    }
                    break;
                case "after":
                case "before":
                case "first-letter":
                case "first-line":
                    e.c += 1;
                    break;
                default:
                    e.b += 1
                }
                break;
            case "PseudoElementSelector":
                switch (t.name) {
                case "slotted":
                    if (e.c += 1,
                    t.children) {
                        let n = {
                            type: "Selector",
                            children: []
                        }
                          , r = !1;
                        t.children.first.children.forEach((t=>!r && ("Combinator" === t.type ? (r = !0,
                        !1) : void n.children.push(t))));
                        let i = gr(n)[0];
                        e.a += i.a,
                        e.b += i.b,
                        e.c += i.c
                    }
                    break;
                case "view-transition-group":
                case "view-transition-image-pair":
                case "view-transition-old":
                case "view-transition-new":
                    if (t.children && "*" === t.children.first.value)
                        break;
                    e.c += 1;
                    break;
                default:
                    e.c += 1
                }
                break;
            case "TypeSelector":
                let n = t.name;
                n.includes("|") && (n = n.split("|")[1]),
                "*" !== n && (e.c += 1)
            }
        }
        )),
        new kr(e,t)
    }
      , gr = t=>{
        if (!t)
            return [];
        let e = (t=>{
            if ("string" == typeof t || t instanceof String)
                try {
                    return or(t, {
                        context: "selectorList"
                    })
                } catch (e) {
                    throw new TypeError(`Could not convert passed in source '${t}' to SelectorList: ${e.message}`)
                }
            if (t instanceof Object) {
                if (t.type && ["Selector", "SelectorList"].includes(t.type))
                    return t;
                if (t.type && "Raw" === t.type)
                    try {
                        return or(t.value, {
                            context: "selectorList"
                        })
                    } catch (t) {
                        throw new TypeError(`Could not convert passed in source to SelectorList: ${t.message}`)
                    }
                throw new TypeError("Passed in source is an Object but no AST / AST of the type Selector or SelectorList")
            }
            throw new TypeError("Passed in source is not a String nor an Object. I don't know what to do with it.")
        }
        )(t);
        if ("Selector" === e.type)
            return [mr(t)];
        if ("SelectorList" === e.type) {
            let t = [];
            return e.children.forEach((e=>{
                let n = mr(e);
                t.push(n)
            }
            )),
            t
        }
    }
      , kr = class {
        constructor(t, e=null) {
            this.value = t,
            this.selector = e
        }
        get a() {
            return this.value.a
        }
        set a(t) {
            throw new Error("Manipulating the port of the specificity directly is not allowed. Instead, directly set a new value")
        }
        get b() {
            return this.value.b
        }
        set b(t) {
            throw new Error("Manipulating the port of the specificity directly is not allowed. Instead, directly set a new value")
        }
        get c() {
            return this.value.c
        }
        set c(t) {
            throw new Error("Manipulating the port of the specificity directly is not allowed. Instead, directly set a new value")
        }
        selectorString() {
            return "string" == typeof this.selector || this.selector instanceof String ? this.selector : this.selector instanceof Object && "Selector" === this.selector.type ? Vn(this.selector) : ""
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
        isEqualTo(t) {
            return lr(this, t)
        }
        isGreaterThan(t) {
            return cr(this, t)
        }
        isLessThan(t) {
            return ur(this, t)
        }
        static calculate(t) {
            return gr(t)
        }
        static compare(t, e) {
            return ar(t, e)
        }
        static equals(t, e) {
            return lr(t, e)
        }
        static lessThan(t, e) {
            return ur(t, e)
        }
        static greaterThan(t, e) {
            return cr(t, e)
        }
        static min(...t) {
            return ((...t)=>dr(...t)[0])(...t)
        }
        static max(...t) {
            return fr(...t)
        }
        static sortAsc(...t) {
            return dr(...t)
        }
        static sortDesc(...t) {
            return pr(...t)
        }
    }
    ;
    const yr = t=>{
        const e = new Map
          , n = t=>{
            const n = e.get(t);
            if (m(n))
                return n;
            {
                const n = kr.calculate(t)[0];
                return e.set(t, n),
                n
            }
        }
        ;
        return ((t,e)=>{
            const r = S.call(t, 0);
            return r.sort(((t,e)=>{
                const r = n(t.selector)
                  , i = n(e.selector);
                return kr.compare(r, i)
            }
            )),
            r
        }
        )(t)
    }
      , br = t=>{
        const e = {};
        return A(t, (n=>{
            const r = t.getPropertyValue(n);
            h(r) && (e[n] = r)
        }
        )),
        e
    }
      , Sr = t=>({
        selector: t.selectorText,
        styles: br(t.style)
    })
      , vr = t=>{
        const e = t.cssRules;
        return E(e, (t=>(t=>t.type === window.CSSRule.IMPORT_RULE)(t) ? vr(t.styleSheet) : (t=>t.type === window.CSSRule.STYLE_RULE)(t) ? [Sr(t)] : []))
    }
      , Cr = (t,e)=>((t,e)=>{
        const n = {};
        var r;
        return ((t,e,n,r)=>{
            P(t, ((t,i)=>{
                (e(t, i) ? n : r)(t, i)
            }
            ))
        }
        )(t, e, (r = n,
        (t,e)=>{
            r[e] = t
        }
        ), y),
        n
    }
    )(_(e, ((t,e)=>({
        ...t,
        ...e.styles
    })), {}), ((e,n)=>!w(t.dom.style, n)))
      , wr = (t,e,n)=>{
        const r = (t=>{
            const e = (t=>E(t, (t=>(t=>-1 !== t.selector.indexOf(","))(t) ? (t=>{
                const e = t.selector.split(/,(?![^(]*\))/g);
                return x(e, (e=>{
                    const n = e.trim();
                    return {
                        ...t,
                        selector: n
                    }
                }
                ))
            }
            )(t) : [t])))(t);
            return yr(e)
        }
        )(t);
        ((t,e,n)=>{
            const r = []
              , i = document.createTreeWalker(t.dom, NodeFilter.SHOW_ELEMENT);
            for (; m(i.nextNode()); ) {
                const t = z(i.currentNode)
                  , n = L(e, (e=>H(t, e.selector)));
                if (n.length > 0) {
                    const e = Cr(t, n);
                    Y(t, e),
                    r.push(t)
                }
            }
            n && A(r, (t=>("class",
            void t.dom.removeAttribute("class"))))
        }
        )(e, r, n)
    }
    ;
    const xr = t=>{
        return e = (t=>{
            const e = t.dom.styleSheets;
            return Array.prototype.slice.call(e)
        }
        )(t),
        E(e, vr);
        var e
    }
      , Ar = (t,e,n,r)=>{
        const i = t(xr(e));
        wr(i, n, r)
    }
      , Lr = (!1,
    (t,e,n)=>Ar((t=>((t,e)=>L(t, (t=>((t,e)=>((t,e,n)=>"" === e || t.length >= e.length && t.substr(0, 0 + e.length) === e)(t, e))(t.selector, e))))(t, n)), t, e, false));
    const _r = (t,e,n)=>Ar((t=>((t,e)=>L(t, (t=>w(e, t.selector))))(t, n)), t, e, !1)
      , Tr = (t,e,n)=>{
        n.trim().length > 0 && M(t, e, n)
    }
      , Er = (t,e,n,r)=>{
        const i = (t=>{
            const e = B("div");
            return M(e, "contentEditable", "false"),
            F(e, $),
            "inline" !== t.size && F(e, t.size),
            e
        }
        )(t)
          , s = B("iframe");
        var o, a;
        return Tr(s, "src", t.source.value),
        Tr(s, "title", t.title),
        Tr(s, "name", t.name),
        Tr(s, "longdesc", t.descriptionUrl.value),
        (o = t,
        a = "dimensions",
        ((t,e)=>I.call(t, e))(o, a) ? b.from(o[a]) : b.none()).each((t=>{
            Tr(s, "width", t.width),
            Tr(s, "height", t.height)
        }
        )),
        t.showBorder || M(s, "frameborder", "0"),
        M(s, "scrolling", t.scrollbar ? "yes" : "no"),
        K(i, s),
        e() && ((t,e,n)=>{
            const r = B("div");
            K(r, e);
            const i = t();
            n().fold((()=>{
                Lr(i, r, ".tiny-pageembed")
            }
            ), (t=>{
                const e = x(t, (t=>`.${t}`));
                _r(i, r, e)
            }
            ));
            const s = ((t,e)=>{
                const n = void 0 === e ? document : e.dom;
                return 1 !== (r = n).nodeType && 9 !== r.nodeType && 11 !== r.nodeType || 0 === r.childElementCount ? [] : x(n.querySelectorAll(t), z);
                var r
            }
            )("*[style]", r);
            A(s, (t=>{
                D(t, "style").each((e=>M(t, "data-mce-style", e)))
            }
            ))
        }
        )(n, i, r),
        (t=>{
            const e = B("div")
              , n = z(t.dom.cloneNode(!0));
            return K(e, n),
            (t=>t.dom.innerHTML)(e)
        }
        )(i)
    }
      , Or = t=>{
        const e = [{
            text: "Inline Value",
            value: "inline"
        }].concat(o(t))
          , n = r=>({
            title: "Insert/Edit Iframe",
            body: {
                type: "tabpanel",
                tabs: [{
                    title: "General",
                    items: T([[{
                        name: "source",
                        type: "urlinput",
                        filetype: "file",
                        label: "Source"
                    }], e.length > 1 ? [{
                        label: "Size",
                        type: "listbox",
                        name: "size",
                        items: e
                    }] : [], "inline" === r.size ? [{
                        type: "sizeinput",
                        name: "dimensions",
                        label: "Constrain proportions",
                        constrain: !0
                    }] : []])
                }, {
                    title: "Advanced",
                    items: [{
                        name: "name",
                        type: "input",
                        label: "Name"
                    }, {
                        name: "title",
                        type: "input",
                        label: "Title"
                    }, {
                        name: "descriptionUrl",
                        type: "urlinput",
                        label: "Long description URL"
                    }, {
                        type: "label",
                        label: "Border",
                        items: [{
                            type: "checkbox",
                            name: "showBorder",
                            label: "Show iframe border"
                        }]
                    }, {
                        type: "label",
                        label: "Scrollbar",
                        items: [{
                            type: "checkbox",
                            name: "scrollbar",
                            label: "Enable scrollbar"
                        }]
                    }]
                }]
            },
            buttons: [{
                type: "cancel",
                name: "cancel",
                text: "Cancel"
            }, {
                type: "submit",
                name: "submit",
                text: "Save",
                primary: !0
            }],
            onChange: (t,{name: e})=>{
                "size" === e && (t.redial(n(t.getData())),
                t.focus("size"))
            }
            ,
            onSubmit: e=>{
                const n = e.getData();
                if (n.source.value.length > 0) {
                    const e = ()=>{
                        if ((t=>t.options.isSet("tiny_pageembed_classes"))(t)) {
                            const e = o(t);
                            return b.some(x(e, (t=>t.value)))
                        }
                        return b.none()
                    }
                      , r = Er(n, (()=>a(t)), (()=>z(t.getDoc())), e);
                    t.insertContent(r),
                    t.nodeChanged()
                }
                e.close()
            }
            ,
            initialData: r
        })
          , r = t.selection.getNode()
          , i = (s = r,
        l = {
            source: {
                value: ""
            },
            size: "inline",
            dimensions: {
                width: "350px",
                height: "260px"
            },
            name: "",
            title: "",
            descriptionUrl: {
                value: ""
            },
            showBorder: !0,
            scrollbar: !1
        },
        c = e,
        b.from(s).map(z).filter(G).bind(Q).filter((t=>N(t) && "iframe" === t.dom.nodeName.toLowerCase())).fold((()=>l), (t=>{
            const e = (t,e,n)=>D(t, e).getOr(n);
            return {
                source: {
                    value: e(t, "src", l.source.value)
                },
                size: (t=>{
                    const e = z(t);
                    return _(c, ((t,n)=>V(e, n.value) ? n.value : t), "inline")
                }
                )(s),
                dimensions: {
                    width: e(t, "width", l.dimensions.width),
                    height: e(t, "height", l.dimensions.height)
                },
                name: e(t, "name", l.name),
                title: e(t, "title", l.title),
                descriptionUrl: {
                    value: e(t, "longdesc", l.descriptionUrl.value)
                },
                showBorder: D(t, "frameborder").map((t=>"0" !== t.toLowerCase())).getOr(l.showBorder),
                scrollbar: D(t, "scrolling").map((t=>"yes" === t.toLowerCase())).getOr(l.scrollbar)
            }
        }
        )));
        var s, l, c;
        t.windowManager.open(n(i))
    }
    ;
    tinymce.PluginManager.requireLangPack("pageembed", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("pageembed", ((t,n)=>((t,n)=>!!t && -1 === ((t,n)=>{
        const r = e(t.major, n.major);
        if (0 !== r)
            return r;
        const i = e(t.minor, n.minor);
        if (0 !== i)
            return i;
        const s = e(t.patch, n.patch);
        return 0 !== s ? s : 0
    }
    )((t=>r((t=>[t.majorVersion, t.minorVersion].join(".").split(".").slice(0, 3).join("."))(t)))(t), r(n)))(tinymce, "6.8.0") ? (console.error("The pageembed plugin requires at least version 6.8.0 of TinyMCE"),
    {}) : (((t,e)=>{
        const n = t.options.register;
        n("tiny_pageembed_css_url", {
            processor: "string",
            default: e + "/css/empa30.css"
        }),
        n("tiny_pageembed_classes", {
            processor: "object[]",
            default: i
        }),
        n("tiny_pageembed_inline_styles", {
            processor: "boolean",
            default: !1
        })
    }
    )(t, n),
    (t=>{
        t.on("click keyup touchend", (()=>{
            b.from(t.selection.getNode()).map(z).each((t=>{
                G(t) && ((t,e)=>{
                    const n = t.dom;
                    return !(!n || !n.hasAttribute) && n.hasAttribute("data-mce-selected")
                }
                )(t) && M(t, "data-mce-selected", "2")
            }
            ))
        }
        )),
        t.on("PreInit", (()=>{
            t.parser.addNodeFilter("div", q),
            t.serializer.addNodeFilter("div", J)
        }
        ))
    }
    )(t),
    (t=>{
        t.ui.registry.addToggleButton("pageembed", {
            icon: "embed-page",
            tooltip: "Embed iframe",
            onAction: e=>{
                Or(t)
            }
            ,
            onSetup: e=>{
                const n = n=>{
                    e.setEnabled(t.selection.isEditable()),
                    e.setActive(!t.readonly && n.element.classList.contains($))
                }
                ;
                return t.on("nodechange", n),
                ()=>t.off("nodechange", n)
            }
        }),
        t.ui.registry.addMenuItem("pageembed", {
            text: "Insert/edit iframe",
            icon: "embed-page",
            onAction: e=>{
                Or(t)
            }
            ,
            onSetup: e=>{
                const n = ()=>{
                    e.setEnabled(t.selection.isEditable())
                }
                ;
                return t.on("nodechange", n),
                n(),
                ()=>t.off("nodechange", n)
            }
        })
    }
    )(t),
    ((t,e)=>{
        const n = l(t) || e + "/css/empa30.css";
        t.on("PreInit", (()=>{
            const e = "pageembed/css/empa30.css";
            if (tinymce.Resource.has(e)) {
                const n = tinymce.Resource.get(e);
                (t=>t.inline ? t.ui.styleSheetLoader : t.dom.styleSheetLoader)(t).loadRawCss(e, n)
            } else
                t.contentCSS.push(t.documentBaseURI.toAbsolute(n))
        }
        ))
    }
    )(t, n),
    {})))
}();
