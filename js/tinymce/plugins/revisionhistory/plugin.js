/*!
 * Tiny Revision History plugin
 *
 * Copyright (c) 2024 Ephox Corporation DBA Tiny Technologies, Inc.
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
      , o = t=>e=>typeof e === t
      , i = t=>"string" === (t=>{
        const e = typeof t;
        return null === t ? "null" : "object" === e && Array.isArray(t) ? "array" : "object" === e && ((t,e,n)=>{
            var r;
            return !!((t,e)=>e.isPrototypeOf(t))(t, e.prototype) || (null === (r = t.constructor) || void 0 === r ? void 0 : r.name) === e.name
        }
        )(t, String) ? "string" : e
    }
    )(t)
      , s = o("boolean")
      , l = t=>void 0 === t
      , a = t=>null == t
      , c = t=>!a(t)
      , h = o("function")
      , f = o("number")
      , u = ()=>{}
      , _ = t=>()=>t
      , d = (t,e)=>t === e
      , g = _(!1)
      , p = _(!0);
    class m {
        constructor(t, e) {
            this.tag = t,
            this.value = e
        }
        static some(t) {
            return new m(!0,t)
        }
        static none() {
            return m.singletonNone
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
            return this.tag ? m.some(t(this.value)) : m.none()
        }
        bind(t) {
            return this.tag ? t(this.value) : m.none()
        }
        exists(t) {
            return this.tag && t(this.value)
        }
        forall(t) {
            return !this.tag || t(this.value)
        }
        filter(t) {
            return !this.tag || t(this.value) ? this : m.none()
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
            return c(t) ? m.some(t) : m.none()
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
    m.singletonNone = new m(!1);
    const v = Array.prototype.slice
      , y = Array.prototype.indexOf
      , b = (t,e)=>((t,e)=>y.call(t, e))(t, e) > -1
      , w = (t,e)=>{
        const n = t.length
          , r = new Array(n);
        for (let o = 0; o < n; o++) {
            const n = t[o];
            r[o] = e(n, o)
        }
        return r
    }
      , x = (t,e)=>{
        for (let n = 0, r = t.length; n < r; n++)
            e(t[n], n)
    }
      , k = (t,e)=>{
        const n = [];
        for (let r = 0, o = t.length; r < o; r++) {
            const o = t[r];
            e(o, r) && n.push(o)
        }
        return n
    }
      , S = (t,e,n)=>(x(t, ((t,r)=>{
        n = e(n, t, r)
    }
    )),
    n)
      , C = (t,e)=>((t,e,n)=>{
        for (let r = 0, o = t.length; r < o; r++) {
            const o = t[r];
            if (e(o, r))
                return m.some(o);
            if (n(o, r))
                break
        }
        return m.none()
    }
    )(t, e, g)
      , M = (t,e)=>{
        for (let n = 0, r = t.length; n < r; n++)
            if (e(t[n], n))
                return m.some(n);
        return m.none()
    }
      , D = t=>{
        const e = v.call(t, 0);
        return e.reverse(),
        e
    }
      , A = (t,e)=>{
        const n = v.call(t, 0);
        return n.sort(e),
        n
    }
      , N = (t,e)=>e >= 0 && e < t.length ? m.some(t[e]) : m.none()
      , E = t=>N(t, 0)
      , T = t=>N(t, t.length - 1)
      , R = t=>{
        if (null == t)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: t
        }
    }
      , I = (t,e)=>{
        const n = (e || document).createElement(t);
        return R(n)
    }
      , P = (t,e)=>{
        const n = (e || document).createTextNode(t);
        return R(n)
    }
      , O = R
      , U = (t,e)=>{
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
      , H = t=>1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType || 0 === t.childElementCount
      , F = (t,e)=>t.dom === e.dom;
    "undefined" != typeof window ? window : Function("return this;")();
    const j = t=>t.dom.nodeName.toLowerCase()
      , $ = t=>t.dom.nodeType
      , L = t=>e=>$(e) === t
      , V = L(1)
      , B = L(3)
      , K = L(9)
      , z = L(11)
      , W = t=>O(t.dom.ownerDocument)
      , q = t=>K(t) ? t : W(t)
      , G = t=>m.from(t.dom.parentNode).map(O)
      , X = t=>G(t)
      , Y = t=>m.from(t.dom.previousSibling).map(O)
      , Z = t=>m.from(t.dom.nextSibling).map(O)
      , J = t=>w(t.dom.childNodes, O)
      , Q = t=>((t,e)=>{
        const n = t.dom.childNodes;
        return m.from(n[0]).map(O)
    }
    )(t)
      , tt = (t,e)=>{
        G(t).each((n=>{
            n.dom.insertBefore(e.dom, t.dom)
        }
        ))
    }
      , et = (t,e)=>{
        t.dom.appendChild(e.dom)
    }
      , nt = t=>{
        const e = t.dom;
        null !== e.parentNode && e.parentNode.removeChild(e)
    }
      , rt = (t,e)=>{
        const n = (e || document).createElement("div");
        return n.innerHTML = t,
        J(O(n))
    }
      , ot = t=>t.dom.innerHTML
      , it = t=>{
        const e = I("div")
          , n = O(t.dom.cloneNode(!0));
        return et(e, n),
        ot(e)
    }
      , st = (t,e)=>{
        const n = (e || document).createDocumentFragment();
        return x(t, (t=>{
            n.appendChild(t.dom)
        }
        )),
        O(n)
    }
      , lt = function() {
        this.Diff_Timeout = 1,
        this.Diff_EditCost = 4,
        this.Match_Threshold = .5,
        this.Match_Distance = 1e3,
        this.Patch_DeleteThreshold = .5,
        this.Patch_Margin = 4,
        this.Match_MaxBits = 32
    }
      , at = -1;
    (lt.Diff = function(t, e) {
        this[0] = t,
        this[1] = e
    }
    ).prototype.length = 2,
    lt.Diff.prototype.toString = function() {
        return this[0] + "," + this[1]
    }
    ,
    lt.Diff.prototype[Symbol.iterator] = function*() {
        yield this[0],
        yield this[1]
    }
    ,
    lt.prototype.diff_main = function(t, e, n, r) {
        void 0 === r && (r = this.Diff_Timeout <= 0 ? Number.MAX_VALUE : (new Date).getTime() + 1e3 * this.Diff_Timeout);
        var o = r;
        if (null == t || null == e)
            throw new Error("Null input. (diff_main)");
        if (t == e)
            return t ? [new lt.Diff(0,t)] : [];
        void 0 === n && (n = !0);
        var i = n
          , s = this.diff_commonPrefix(t, e)
          , l = t.substring(0, s);
        t = t.substring(s),
        e = e.substring(s),
        s = this.diff_commonSuffix(t, e);
        var a = t.substring(t.length - s);
        t = t.substring(0, t.length - s),
        e = e.substring(0, e.length - s);
        var c = this.diff_compute_(t, e, i, o);
        return l && c.unshift(new lt.Diff(0,l)),
        a && c.push(new lt.Diff(0,a)),
        this.diff_cleanupMerge(c),
        c
    }
    ,
    lt.prototype.diff_compute_ = function(t, e, n, r) {
        var o;
        if (!t)
            return [new lt.Diff(1,e)];
        if (!e)
            return [new lt.Diff(at,t)];
        var i = t.length > e.length ? t : e
          , s = t.length > e.length ? e : t
          , l = i.indexOf(s);
        if (-1 != l)
            return o = [new lt.Diff(1,i.substring(0, l)), new lt.Diff(0,s), new lt.Diff(1,i.substring(l + s.length))],
            t.length > e.length && (o[0][0] = o[2][0] = at),
            o;
        if (1 == s.length)
            return [new lt.Diff(at,t), new lt.Diff(1,e)];
        var a = this.diff_halfMatch_(t, e);
        if (a) {
            var c = a[0]
              , h = a[1]
              , f = a[2]
              , u = a[3]
              , _ = a[4]
              , d = this.diff_main(c, f, n, r)
              , g = this.diff_main(h, u, n, r);
            return d.concat([new lt.Diff(0,_)], g)
        }
        return n && t.length > 100 && e.length > 100 ? this.diff_lineMode_(t, e, r) : this.diff_bisect_(t, e, r)
    }
    ,
    lt.prototype.diff_lineMode_ = function(t, e, n) {
        var r = this.diff_linesToChars_(t, e);
        t = r.chars1,
        e = r.chars2;
        var o = r.lineArray
          , i = this.diff_main(t, e, !1, n);
        this.diff_charsToLines_(i, o),
        this.diff_cleanupSemantic(i),
        i.push(new lt.Diff(0,""));
        for (var s = 0, l = 0, a = 0, c = "", h = ""; s < i.length; ) {
            switch (i[s][0]) {
            case 1:
                a++,
                h += i[s][1];
                break;
            case at:
                l++,
                c += i[s][1];
                break;
            case 0:
                if (l >= 1 && a >= 1) {
                    i.splice(s - l - a, l + a),
                    s = s - l - a;
                    for (var f = this.diff_main(c, h, !1, n), u = f.length - 1; u >= 0; u--)
                        i.splice(s, 0, f[u]);
                    s += f.length
                }
                a = 0,
                l = 0,
                c = "",
                h = ""
            }
            s++
        }
        return i.pop(),
        i
    }
    ,
    lt.prototype.diff_bisect_ = function(t, e, n) {
        for (var r = t.length, o = e.length, i = Math.ceil((r + o) / 2), s = i, l = 2 * i, a = new Array(l), c = new Array(l), h = 0; h < l; h++)
            a[h] = -1,
            c[h] = -1;
        a[s + 1] = 0,
        c[s + 1] = 0;
        for (var f = r - o, u = f % 2 != 0, _ = 0, d = 0, g = 0, p = 0, m = 0; m < i && !((new Date).getTime() > n); m++) {
            for (var v = -m + _; v <= m - d; v += 2) {
                for (var y = s + v, b = (C = v == -m || v != m && a[y - 1] < a[y + 1] ? a[y + 1] : a[y - 1] + 1) - v; C < r && b < o && t.charAt(C) == e.charAt(b); )
                    C++,
                    b++;
                if (a[y] = C,
                C > r)
                    d += 2;
                else if (b > o)
                    _ += 2;
                else if (u && (k = s + f - v) >= 0 && k < l && -1 != c[k] && C >= (x = r - c[k]))
                    return this.diff_bisectSplit_(t, e, C, b, n)
            }
            for (var w = -m + g; w <= m - p; w += 2) {
                for (var x, k = s + w, S = (x = w == -m || w != m && c[k - 1] < c[k + 1] ? c[k + 1] : c[k - 1] + 1) - w; x < r && S < o && t.charAt(r - x - 1) == e.charAt(o - S - 1); )
                    x++,
                    S++;
                if (c[k] = x,
                x > r)
                    p += 2;
                else if (S > o)
                    g += 2;
                else if (!u) {
                    var C;
                    if ((y = s + f - w) >= 0 && y < l && -1 != a[y])
                        if (b = s + (C = a[y]) - y,
                        C >= (x = r - x))
                            return this.diff_bisectSplit_(t, e, C, b, n)
                }
            }
        }
        return [new lt.Diff(at,t), new lt.Diff(1,e)]
    }
    ,
    lt.prototype.diff_bisectSplit_ = function(t, e, n, r, o) {
        var i = t.substring(0, n)
          , s = e.substring(0, r)
          , l = t.substring(n)
          , a = e.substring(r)
          , c = this.diff_main(i, s, !1, o)
          , h = this.diff_main(l, a, !1, o);
        return c.concat(h)
    }
    ,
    lt.prototype.diff_linesToChars_ = function(t, e) {
        var n = []
          , r = {};
        function o(t) {
            for (var e = "", o = 0, s = -1, l = n.length; s < t.length - 1; ) {
                -1 == (s = t.indexOf("\n", o)) && (s = t.length - 1);
                var a = t.substring(o, s + 1);
                (r.hasOwnProperty ? r.hasOwnProperty(a) : void 0 !== r[a]) ? e += String.fromCharCode(r[a]) : (l == i && (a = t.substring(o),
                s = t.length),
                e += String.fromCharCode(l),
                r[a] = l,
                n[l++] = a),
                o = s + 1
            }
            return e
        }
        n[0] = "";
        var i = 4e4
          , s = o(t);
        return i = 65535,
        {
            chars1: s,
            chars2: o(e),
            lineArray: n
        }
    }
    ,
    lt.prototype.diff_charsToLines_ = function(t, e) {
        for (var n = 0; n < t.length; n++) {
            for (var r = t[n][1], o = [], i = 0; i < r.length; i++)
                o[i] = e[r.charCodeAt(i)];
            t[n][1] = o.join("")
        }
    }
    ,
    lt.prototype.diff_commonPrefix = function(t, e) {
        if (!t || !e || t.charAt(0) != e.charAt(0))
            return 0;
        for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o; )
            t.substring(i, o) == e.substring(i, o) ? i = n = o : r = o,
            o = Math.floor((r - n) / 2 + n);
        return o
    }
    ,
    lt.prototype.diff_commonSuffix = function(t, e) {
        if (!t || !e || t.charAt(t.length - 1) != e.charAt(e.length - 1))
            return 0;
        for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o; )
            t.substring(t.length - o, t.length - i) == e.substring(e.length - o, e.length - i) ? i = n = o : r = o,
            o = Math.floor((r - n) / 2 + n);
        return o
    }
    ,
    lt.prototype.diff_commonOverlap_ = function(t, e) {
        var n = t.length
          , r = e.length;
        if (0 == n || 0 == r)
            return 0;
        n > r ? t = t.substring(n - r) : n < r && (e = e.substring(0, n));
        var o = Math.min(n, r);
        if (t == e)
            return o;
        for (var i = 0, s = 1; ; ) {
            var l = t.substring(o - s)
              , a = e.indexOf(l);
            if (-1 == a)
                return i;
            s += a,
            0 != a && t.substring(o - s) != e.substring(0, s) || (i = s,
            s++)
        }
    }
    ,
    lt.prototype.diff_halfMatch_ = function(t, e) {
        if (this.Diff_Timeout <= 0)
            return null;
        var n = t.length > e.length ? t : e
          , r = t.length > e.length ? e : t;
        if (n.length < 4 || 2 * r.length < n.length)
            return null;
        var o = this;
        function i(t, e, n) {
            for (var r, i, s, l, a = t.substring(n, n + Math.floor(t.length / 4)), c = -1, h = ""; -1 != (c = e.indexOf(a, c + 1)); ) {
                var f = o.diff_commonPrefix(t.substring(n), e.substring(c))
                  , u = o.diff_commonSuffix(t.substring(0, n), e.substring(0, c));
                h.length < u + f && (h = e.substring(c - u, c) + e.substring(c, c + f),
                r = t.substring(0, n - u),
                i = t.substring(n + f),
                s = e.substring(0, c - u),
                l = e.substring(c + f))
            }
            return 2 * h.length >= t.length ? [r, i, s, l, h] : null
        }
        var s, l, a, c, h, f = i(n, r, Math.ceil(n.length / 4)), u = i(n, r, Math.ceil(n.length / 2));
        return f || u ? (s = u ? f && f[4].length > u[4].length ? f : u : f,
        t.length > e.length ? (l = s[0],
        a = s[1],
        c = s[2],
        h = s[3]) : (c = s[0],
        h = s[1],
        l = s[2],
        a = s[3]),
        [l, a, c, h, s[4]]) : null
    }
    ,
    lt.prototype.diff_cleanupSemantic = function(t) {
        for (var e = !1, n = [], r = 0, o = null, i = 0, s = 0, l = 0, a = 0, c = 0; i < t.length; )
            0 == t[i][0] ? (n[r++] = i,
            s = a,
            l = c,
            a = 0,
            c = 0,
            o = t[i][1]) : (1 == t[i][0] ? a += t[i][1].length : c += t[i][1].length,
            o && o.length <= Math.max(s, l) && o.length <= Math.max(a, c) && (t.splice(n[r - 1], 0, new lt.Diff(at,o)),
            t[n[r - 1] + 1][0] = 1,
            r--,
            i = --r > 0 ? n[r - 1] : -1,
            s = 0,
            l = 0,
            a = 0,
            c = 0,
            o = null,
            e = !0)),
            i++;
        for (e && this.diff_cleanupMerge(t),
        this.diff_cleanupSemanticLossless(t),
        i = 1; i < t.length; ) {
            if (t[i - 1][0] == at && 1 == t[i][0]) {
                var h = t[i - 1][1]
                  , f = t[i][1]
                  , u = this.diff_commonOverlap_(h, f)
                  , _ = this.diff_commonOverlap_(f, h);
                u >= _ ? (u >= h.length / 2 || u >= f.length / 2) && (t.splice(i, 0, new lt.Diff(0,f.substring(0, u))),
                t[i - 1][1] = h.substring(0, h.length - u),
                t[i + 1][1] = f.substring(u),
                i++) : (_ >= h.length / 2 || _ >= f.length / 2) && (t.splice(i, 0, new lt.Diff(0,h.substring(0, _))),
                t[i - 1][0] = 1,
                t[i - 1][1] = f.substring(0, f.length - _),
                t[i + 1][0] = at,
                t[i + 1][1] = h.substring(_),
                i++),
                i++
            }
            i++
        }
    }
    ,
    lt.prototype.diff_cleanupSemanticLossless = function(t) {
        function e(t, e) {
            if (!t || !e)
                return 6;
            var n = t.charAt(t.length - 1)
              , r = e.charAt(0)
              , o = n.match(lt.nonAlphaNumericRegex_)
              , i = r.match(lt.nonAlphaNumericRegex_)
              , s = o && n.match(lt.whitespaceRegex_)
              , l = i && r.match(lt.whitespaceRegex_)
              , a = s && n.match(lt.linebreakRegex_)
              , c = l && r.match(lt.linebreakRegex_)
              , h = a && t.match(lt.blanklineEndRegex_)
              , f = c && e.match(lt.blanklineStartRegex_);
            return h || f ? 5 : a || c ? 4 : o && !s && l ? 3 : s || l ? 2 : o || i ? 1 : 0
        }
        for (var n = 1; n < t.length - 1; ) {
            if (0 == t[n - 1][0] && 0 == t[n + 1][0]) {
                var r = t[n - 1][1]
                  , o = t[n][1]
                  , i = t[n + 1][1]
                  , s = this.diff_commonSuffix(r, o);
                if (s) {
                    var l = o.substring(o.length - s);
                    r = r.substring(0, r.length - s),
                    o = l + o.substring(0, o.length - s),
                    i = l + i
                }
                for (var a = r, c = o, h = i, f = e(r, o) + e(o, i); o.charAt(0) === i.charAt(0); ) {
                    r += o.charAt(0),
                    o = o.substring(1) + i.charAt(0),
                    i = i.substring(1);
                    var u = e(r, o) + e(o, i);
                    u >= f && (f = u,
                    a = r,
                    c = o,
                    h = i)
                }
                t[n - 1][1] != a && (a ? t[n - 1][1] = a : (t.splice(n - 1, 1),
                n--),
                t[n][1] = c,
                h ? t[n + 1][1] = h : (t.splice(n + 1, 1),
                n--))
            }
            n++
        }
    }
    ,
    lt.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/,
    lt.whitespaceRegex_ = /\s/,
    lt.linebreakRegex_ = /[\r\n]/,
    lt.blanklineEndRegex_ = /\n\r?\n$/,
    lt.blanklineStartRegex_ = /^\r?\n\r?\n/,
    lt.prototype.diff_cleanupEfficiency = function(t) {
        for (var e = !1, n = [], r = 0, o = null, i = 0, s = !1, l = !1, a = !1, c = !1; i < t.length; )
            0 == t[i][0] ? (t[i][1].length < this.Diff_EditCost && (a || c) ? (n[r++] = i,
            s = a,
            l = c,
            o = t[i][1]) : (r = 0,
            o = null),
            a = c = !1) : (t[i][0] == at ? c = !0 : a = !0,
            o && (s && l && a && c || o.length < this.Diff_EditCost / 2 && s + l + a + c == 3) && (t.splice(n[r - 1], 0, new lt.Diff(at,o)),
            t[n[r - 1] + 1][0] = 1,
            r--,
            o = null,
            s && l ? (a = c = !0,
            r = 0) : (i = --r > 0 ? n[r - 1] : -1,
            a = c = !1),
            e = !0)),
            i++;
        e && this.diff_cleanupMerge(t)
    }
    ,
    lt.prototype.diff_cleanupMerge = function(t) {
        t.push(new lt.Diff(0,""));
        for (var e, n = 0, r = 0, o = 0, i = "", s = ""; n < t.length; )
            switch (t[n][0]) {
            case 1:
                o++,
                s += t[n][1],
                n++;
                break;
            case at:
                r++,
                i += t[n][1],
                n++;
                break;
            case 0:
                r + o > 1 ? (0 !== r && 0 !== o && (0 !== (e = this.diff_commonPrefix(s, i)) && (n - r - o > 0 && 0 == t[n - r - o - 1][0] ? t[n - r - o - 1][1] += s.substring(0, e) : (t.splice(0, 0, new lt.Diff(0,s.substring(0, e))),
                n++),
                s = s.substring(e),
                i = i.substring(e)),
                0 !== (e = this.diff_commonSuffix(s, i)) && (t[n][1] = s.substring(s.length - e) + t[n][1],
                s = s.substring(0, s.length - e),
                i = i.substring(0, i.length - e))),
                n -= r + o,
                t.splice(n, r + o),
                i.length && (t.splice(n, 0, new lt.Diff(at,i)),
                n++),
                s.length && (t.splice(n, 0, new lt.Diff(1,s)),
                n++),
                n++) : 0 !== n && 0 == t[n - 1][0] ? (t[n - 1][1] += t[n][1],
                t.splice(n, 1)) : n++,
                o = 0,
                r = 0,
                i = "",
                s = ""
            }
        "" === t[t.length - 1][1] && t.pop();
        var l = !1;
        for (n = 1; n < t.length - 1; )
            0 == t[n - 1][0] && 0 == t[n + 1][0] && (t[n][1].substring(t[n][1].length - t[n - 1][1].length) == t[n - 1][1] ? (t[n][1] = t[n - 1][1] + t[n][1].substring(0, t[n][1].length - t[n - 1][1].length),
            t[n + 1][1] = t[n - 1][1] + t[n + 1][1],
            t.splice(n - 1, 1),
            l = !0) : t[n][1].substring(0, t[n + 1][1].length) == t[n + 1][1] && (t[n - 1][1] += t[n + 1][1],
            t[n][1] = t[n][1].substring(t[n + 1][1].length) + t[n + 1][1],
            t.splice(n + 1, 1),
            l = !0)),
            n++;
        l && this.diff_cleanupMerge(t)
    }
    ,
    lt.prototype.diff_cleanupSplitSurrogates = function(t) {
        for (var e, n = 0; n < t.length; n++) {
            var r = t[n]
              , o = r[1][0]
              , i = r[1][r[1].length - 1];
            0 !== r[1].length ? (i && this.isHighSurrogate(i) && (e = i,
            r[1] = r[1].slice(0, -1)),
            e && o && this.isHighSurrogate(e) && this.isLowSurrogate(o) && (r[1] = e + r[1]),
            0 !== r[1].length || t.splice(n--, 1)) : t.splice(n--, 1)
        }
        return t
    }
    ,
    lt.prototype.isHighSurrogate = function(t) {
        var e = t.charCodeAt(0);
        return e >= 55296 && e <= 56319
    }
    ,
    lt.prototype.isLowSurrogate = function(t) {
        var e = t.charCodeAt(0);
        return e >= 56320 && e <= 57343
    }
    ,
    lt.prototype.digit16 = function(t) {
        switch (t) {
        case "0":
            return 0;
        case "1":
            return 1;
        case "2":
            return 2;
        case "3":
            return 3;
        case "4":
            return 4;
        case "5":
            return 5;
        case "6":
            return 6;
        case "7":
            return 7;
        case "8":
            return 8;
        case "9":
            return 9;
        case "A":
        case "a":
            return 10;
        case "B":
        case "b":
            return 11;
        case "C":
        case "c":
            return 12;
        case "D":
        case "d":
            return 13;
        case "E":
        case "e":
            return 14;
        case "F":
        case "f":
            return 15;
        default:
            throw new Error("Invalid hex-code")
        }
    }
    ,
    lt.prototype.decodeURI = function(t) {
        try {
            return decodeURI(t)
        } catch (a) {
            for (var e = 0, n = ""; e < t.length; )
                if ("%" === t[e]) {
                    var r = (this.digit16(t[e + 1]) << 4) + this.digit16(t[e + 2]);
                    if (0 != (128 & r)) {
                        if ("%" !== t[e + 3])
                            throw new URIError("URI malformed");
                        var o = (this.digit16(t[e + 4]) << 4) + this.digit16(t[e + 5]);
                        if (128 != (192 & o))
                            throw new URIError("URI malformed");
                        if (o &= 63,
                        192 != (224 & r)) {
                            if ("%" !== t[e + 6])
                                throw new URIError("URI malformed");
                            var i = (this.digit16(t[e + 7]) << 4) + this.digit16(t[e + 8]);
                            if (128 != (192 & i))
                                throw new URIError("URI malformed");
                            if (i &= 63,
                            224 != (240 & r)) {
                                if ("%" !== t[e + 9])
                                    throw new URIError("URI malformed");
                                var s = (this.digit16(t[e + 10]) << 4) + this.digit16(t[e + 11]);
                                if (128 != (192 & s))
                                    throw new URIError("URI malformed");
                                if (s &= 63,
                                240 == (248 & r)) {
                                    var l = (7 & r) << 18 | o << 12 | i << 6 | s;
                                    if (l >= 65536 && l <= 1114111) {
                                        n += String.fromCharCode((65535 & l) >>> 10 & 1023 | 55296),
                                        n += String.fromCharCode(56320 | 1023 & l),
                                        e += 12;
                                        continue
                                    }
                                }
                                throw new URIError("URI malformed")
                            }
                            n += String.fromCharCode((15 & r) << 12 | o << 6 | i),
                            e += 9
                        } else
                            n += String.fromCharCode((31 & r) << 6 | o),
                            e += 6
                    } else
                        n += String.fromCharCode(r),
                        e += 3
                } else
                    n += t[e++];
            return n
        }
    }
    ,
    lt.prototype.diff_xIndex = function(t, e) {
        var n, r = 0, o = 0, i = 0, s = 0;
        for (n = 0; n < t.length && (1 !== t[n][0] && (r += t[n][1].length),
        t[n][0] !== at && (o += t[n][1].length),
        !(r > e)); n++)
            i = r,
            s = o;
        return t.length != n && t[n][0] === at ? s : s + (e - i)
    }
    ,
    lt.prototype.diff_prettyHtml = function(t) {
        t = this.diff_cleanupSplitSurrogates(t);
        for (var e = [], n = /&/g, r = /</g, o = />/g, i = /\n/g, s = 0; s < t.length; s++) {
            var l = t[s][0]
              , a = t[s][1].replace(n, "&amp;").replace(r, "&lt;").replace(o, "&gt;").replace(i, "&para;<br>");
            switch (l) {
            case 1:
                e[s] = '<ins style="background:#e6ffe6;">' + a + "</ins>";
                break;
            case at:
                e[s] = '<del style="background:#ffe6e6;">' + a + "</del>";
                break;
            case 0:
                e[s] = "<span>" + a + "</span>"
            }
        }
        return e.join("")
    }
    ,
    lt.prototype.diff_text1 = function(t) {
        for (var e = [], n = 0; n < t.length; n++)
            1 !== t[n][0] && (e[n] = t[n][1]);
        return e.join("")
    }
    ,
    lt.prototype.diff_text2 = function(t) {
        for (var e = [], n = 0; n < t.length; n++)
            t[n][0] !== at && (e[n] = t[n][1]);
        return e.join("")
    }
    ,
    lt.prototype.diff_levenshtein = function(t) {
        for (var e = 0, n = 0, r = 0, o = 0; o < t.length; o++) {
            var i = t[o][0]
              , s = t[o][1];
            switch (i) {
            case 1:
                n += s.length;
                break;
            case at:
                r += s.length;
                break;
            case 0:
                e += Math.max(n, r),
                n = 0,
                r = 0
            }
        }
        return e + Math.max(n, r)
    }
    ,
    lt.prototype.diff_toDelta = function(t) {
        t = this.diff_cleanupSplitSurrogates(t);
        for (var e = [], n = 0; n < t.length; n++)
            switch (t[n][0]) {
            case 1:
                e[n] = "+" + encodeURI(t[n][1]);
                break;
            case at:
                e[n] = "-" + t[n][1].length;
                break;
            case 0:
                e[n] = "=" + t[n][1].length
            }
        return e.join("\t").replace(/%20/g, " ")
    }
    ,
    lt.prototype.diff_fromDelta = function(t, e) {
        for (var n = [], r = 0, o = 0, i = e.split(/\t/g), s = 0; s < i.length; s++) {
            var l = i[s].substring(1);
            switch (i[s].charAt(0)) {
            case "+":
                try {
                    n[r++] = new lt.Diff(1,this.decodeURI(l))
                } catch (t) {
                    throw new Error("Illegal escape in diff_fromDelta: " + l)
                }
                break;
            case "-":
            case "=":
                var a = parseInt(l, 10);
                if (isNaN(a) || a < 0)
                    throw new Error("Invalid number in diff_fromDelta: " + l);
                var c = t.substring(o, o += a);
                "=" == i[s].charAt(0) ? n[r++] = new lt.Diff(0,c) : n[r++] = new lt.Diff(at,c);
                break;
            default:
                if (i[s])
                    throw new Error("Invalid diff operation in diff_fromDelta: " + i[s])
            }
        }
        if (o != t.length)
            throw new Error("Delta length (" + o + ") does not equal source text length (" + t.length + ").");
        return n
    }
    ,
    lt.prototype.match_main = function(t, e, n) {
        if (null == t || null == e || null == n)
            throw new Error("Null input. (match_main)");
        return n = Math.max(0, Math.min(n, t.length)),
        t == e ? 0 : t.length ? t.substring(n, n + e.length) == e ? n : this.match_bitap_(t, e, n) : -1
    }
    ,
    lt.prototype.match_bitap_ = function(t, e, n) {
        if (e.length > this.Match_MaxBits)
            throw new Error("Pattern too long for this browser.");
        var r = this.match_alphabet_(e)
          , o = this;
        function i(t, r) {
            var i = t / e.length
              , s = Math.abs(n - r);
            return o.Match_Distance ? i + s / o.Match_Distance : s ? 1 : i
        }
        var s = this.Match_Threshold
          , l = t.indexOf(e, n);
        -1 != l && (s = Math.min(i(0, l), s),
        -1 != (l = t.lastIndexOf(e, n + e.length)) && (s = Math.min(i(0, l), s)));
        var a, c, h = 1 << e.length - 1;
        l = -1;
        for (var f, u = e.length + t.length, _ = 0; _ < e.length; _++) {
            for (a = 0,
            c = u; a < c; )
                i(_, n + c) <= s ? a = c : u = c,
                c = Math.floor((u - a) / 2 + a);
            u = c;
            var d = Math.max(1, n - c + 1)
              , g = Math.min(n + c, t.length) + e.length
              , p = Array(g + 2);
            p[g + 1] = (1 << _) - 1;
            for (var m = g; m >= d; m--) {
                var v = r[t.charAt(m - 1)];
                if (p[m] = 0 === _ ? (p[m + 1] << 1 | 1) & v : (p[m + 1] << 1 | 1) & v | (f[m + 1] | f[m]) << 1 | 1 | f[m + 1],
                p[m] & h) {
                    var y = i(_, m - 1);
                    if (y <= s) {
                        if (s = y,
                        !((l = m - 1) > n))
                            break;
                        d = Math.max(1, 2 * n - l)
                    }
                }
            }
            if (i(_ + 1, n) > s)
                break;
            f = p
        }
        return l
    }
    ,
    lt.prototype.match_alphabet_ = function(t) {
        for (var e = {}, n = 0; n < t.length; n++)
            e[t.charAt(n)] = 0;
        for (n = 0; n < t.length; n++)
            e[t.charAt(n)] |= 1 << t.length - n - 1;
        return e
    }
    ,
    lt.prototype.patch_addContext_ = function(t, e) {
        if (0 != e.length) {
            if (null === t.start2)
                throw Error("patch not initialized");
            for (var n = e.substring(t.start2, t.start2 + t.length1), r = 0; e.indexOf(n) != e.lastIndexOf(n) && n.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin; )
                r += this.Patch_Margin,
                n = e.substring(t.start2 - r, t.start2 + t.length1 + r);
            r += this.Patch_Margin,
            t.start2 - r > 0 && lt.prototype.isLowSurrogate(e[t.start2 - r]) && r++;
            var o = e.substring(t.start2 - r, t.start2);
            o && t.diffs.unshift(new lt.Diff(0,o)),
            t.start2 + t.length1 + r < e.length && lt.prototype.isHighSurrogate(e[t.start2 + t.length1 + r]) && r++;
            var i = e.substring(t.start2 + t.length1, t.start2 + t.length1 + r);
            i && t.diffs.push(new lt.Diff(0,i)),
            t.start1 -= o.length,
            t.start2 -= o.length,
            t.length1 += o.length + i.length,
            t.length2 += o.length + i.length
        }
    }
    ,
    lt.prototype.patch_make = function(t, e, n) {
        var r, o;
        if ("string" == typeof t && "string" == typeof e && void 0 === n)
            r = t,
            (o = this.diff_main(r, e, !0)).length > 2 && (this.diff_cleanupSemantic(o),
            this.diff_cleanupEfficiency(o));
        else if (t && "object" == typeof t && void 0 === e && void 0 === n)
            o = t,
            r = this.diff_text1(o);
        else if ("string" == typeof t && e && "object" == typeof e && void 0 === n)
            r = t,
            o = e;
        else {
            if ("string" != typeof t || "string" != typeof e || !n || "object" != typeof n)
                throw new Error("Unknown call format to patch_make.");
            r = t,
            o = n
        }
        if (0 === o.length)
            return [];
        o = this.diff_cleanupSplitSurrogates(o);
        for (var i = [], s = new lt.patch_obj, l = 0, a = 0, c = 0, h = r, f = r, u = 0; u < o.length; u++) {
            var _ = o[u][0]
              , d = o[u][1];
            switch (l || 0 === _ || (s.start1 = a,
            s.start2 = c),
            _) {
            case 1:
                s.diffs[l++] = o[u],
                s.length2 += d.length,
                f = f.substring(0, c) + d + f.substring(c);
                break;
            case at:
                s.length1 += d.length,
                s.diffs[l++] = o[u],
                f = f.substring(0, c) + f.substring(c + d.length);
                break;
            case 0:
                d.length <= 2 * this.Patch_Margin && l && o.length != u + 1 ? (s.diffs[l++] = o[u],
                s.length1 += d.length,
                s.length2 += d.length) : d.length >= 2 * this.Patch_Margin && l && (this.patch_addContext_(s, h),
                i.push(s),
                s = new lt.patch_obj,
                l = 0,
                h = f,
                a = c)
            }
            1 !== _ && (a += d.length),
            _ !== at && (c += d.length)
        }
        return l && (this.patch_addContext_(s, h),
        i.push(s)),
        i
    }
    ,
    lt.prototype.patch_deepCopy = function(t) {
        for (var e = [], n = 0; n < t.length; n++) {
            var r = t[n]
              , o = new lt.patch_obj;
            o.diffs = [];
            for (var i = 0; i < r.diffs.length; i++)
                o.diffs[i] = new lt.Diff(r.diffs[i][0],r.diffs[i][1]);
            o.start1 = r.start1,
            o.start2 = r.start2,
            o.length1 = r.length1,
            o.length2 = r.length2,
            e[n] = o
        }
        return e
    }
    ,
    lt.prototype.patch_apply = function(t, e) {
        if (0 == t.length)
            return [e, []];
        t = this.patch_deepCopy(t);
        var n = this.patch_addPadding(t);
        e = n + e + n,
        this.patch_splitMax(t);
        for (var r = 0, o = [], i = 0; i < t.length; i++) {
            var s, l, a = t[i].start2 + r, c = this.diff_text1(t[i].diffs), h = -1;
            if (c.length > this.Match_MaxBits ? -1 != (s = this.match_main(e, c.substring(0, this.Match_MaxBits), a)) && (-1 == (h = this.match_main(e, c.substring(c.length - this.Match_MaxBits), a + c.length - this.Match_MaxBits)) || s >= h) && (s = -1) : s = this.match_main(e, c, a),
            -1 == s)
                o[i] = !1,
                r -= t[i].length2 - t[i].length1;
            else if (o[i] = !0,
            r = s - a,
            c == (l = -1 == h ? e.substring(s, s + c.length) : e.substring(s, h + this.Match_MaxBits)))
                e = e.substring(0, s) + this.diff_text2(t[i].diffs) + e.substring(s + c.length);
            else {
                var f = this.diff_main(c, l, !1);
                if (c.length > this.Match_MaxBits && this.diff_levenshtein(f) / c.length > this.Patch_DeleteThreshold)
                    o[i] = !1;
                else {
                    this.diff_cleanupSemanticLossless(f);
                    for (var u, _ = 0, d = 0; d < t[i].diffs.length; d++) {
                        var g = t[i].diffs[d];
                        0 !== g[0] && (u = this.diff_xIndex(f, _)),
                        1 === g[0] ? e = e.substring(0, s + u) + g[1] + e.substring(s + u) : g[0] === at && (e = e.substring(0, s + u) + e.substring(s + this.diff_xIndex(f, _ + g[1].length))),
                        g[0] !== at && (_ += g[1].length)
                    }
                }
            }
        }
        return [e = e.substring(n.length, e.length - n.length), o]
    }
    ,
    lt.prototype.patch_addPadding = function(t) {
        for (var e = this.Patch_Margin, n = "", r = 1; r <= e; r++)
            n += String.fromCharCode(r);
        for (r = 0; r < t.length; r++)
            t[r].start1 += e,
            t[r].start2 += e;
        var o = t[0]
          , i = o.diffs;
        if (0 == i.length || 0 != i[0][0])
            i.unshift(new lt.Diff(0,n)),
            o.start1 -= e,
            o.start2 -= e,
            o.length1 += e,
            o.length2 += e;
        else if (e > i[0][1].length) {
            var s = e - i[0][1].length;
            i[0][1] = n.substring(i[0][1].length) + i[0][1],
            o.start1 -= s,
            o.start2 -= s,
            o.length1 += s,
            o.length2 += s
        }
        return 0 == (i = (o = t[t.length - 1]).diffs).length || 0 != i[i.length - 1][0] ? (i.push(new lt.Diff(0,n)),
        o.length1 += e,
        o.length2 += e) : e > i[i.length - 1][1].length && (s = e - i[i.length - 1][1].length,
        i[i.length - 1][1] += n.substring(0, s),
        o.length1 += s,
        o.length2 += s),
        n
    }
    ,
    lt.prototype.patch_splitMax = function(t) {
        for (var e = this.Match_MaxBits, n = 0; n < t.length; n++)
            if (!(t[n].length1 <= e)) {
                var r = t[n];
                t.splice(n--, 1);
                for (var o = r.start1, i = r.start2, s = ""; 0 !== r.diffs.length; ) {
                    var l = new lt.patch_obj
                      , a = !0;
                    for (l.start1 = o - s.length,
                    l.start2 = i - s.length,
                    "" !== s && (l.length1 = l.length2 = s.length,
                    l.diffs.push(new lt.Diff(0,s))); 0 !== r.diffs.length && l.length1 < e - this.Patch_Margin; ) {
                        var c = r.diffs[0][0]
                          , h = r.diffs[0][1];
                        1 === c ? (l.length2 += h.length,
                        i += h.length,
                        l.diffs.push(r.diffs.shift()),
                        a = !1) : c === at && 1 == l.diffs.length && 0 == l.diffs[0][0] && h.length > 2 * e ? (l.length1 += h.length,
                        o += h.length,
                        a = !1,
                        l.diffs.push(new lt.Diff(c,h)),
                        r.diffs.shift()) : (h = h.substring(0, e - l.length1 - this.Patch_Margin),
                        l.length1 += h.length,
                        o += h.length,
                        0 === c ? (l.length2 += h.length,
                        i += h.length) : a = !1,
                        l.diffs.push(new lt.Diff(c,h)),
                        h == r.diffs[0][1] ? r.diffs.shift() : r.diffs[0][1] = r.diffs[0][1].substring(h.length))
                    }
                    s = (s = this.diff_text2(l.diffs)).substring(s.length - this.Patch_Margin);
                    var f = this.diff_text1(r.diffs).substring(0, this.Patch_Margin);
                    "" !== f && (l.length1 += f.length,
                    l.length2 += f.length,
                    0 !== l.diffs.length && 0 === l.diffs[l.diffs.length - 1][0] ? l.diffs[l.diffs.length - 1][1] += f : l.diffs.push(new lt.Diff(0,f))),
                    a || t.splice(++n, 0, l)
                }
            }
    }
    ,
    lt.prototype.patch_toText = function(t) {
        for (var e = [], n = 0; n < t.length; n++)
            e[n] = t[n];
        return e.join("")
    }
    ,
    lt.prototype.patch_fromText = function(t) {
        var e = [];
        if (!t)
            return e;
        for (var n = t.split("\n"), r = 0, o = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; r < n.length; ) {
            var i = n[r].match(o);
            if (!i)
                throw new Error("Invalid patch string: " + n[r]);
            var s = new lt.patch_obj;
            for (e.push(s),
            s.start1 = parseInt(i[1], 10),
            "" === i[2] ? (s.start1--,
            s.length1 = 1) : "0" == i[2] ? s.length1 = 0 : (s.start1--,
            s.length1 = parseInt(i[2], 10)),
            s.start2 = parseInt(i[3], 10),
            "" === i[4] ? (s.start2--,
            s.length2 = 1) : "0" == i[4] ? s.length2 = 0 : (s.start2--,
            s.length2 = parseInt(i[4], 10)),
            r++; r < n.length; ) {
                var l = n[r].charAt(0);
                try {
                    var a = decodeURI(n[r].substring(1))
                } catch (t) {
                    throw new Error("Illegal escape in patch_fromText: " + a)
                }
                if ("-" == l)
                    s.diffs.push(new lt.Diff(at,a));
                else if ("+" == l)
                    s.diffs.push(new lt.Diff(1,a));
                else if (" " == l)
                    s.diffs.push(new lt.Diff(0,a));
                else {
                    if ("@" == l)
                        break;
                    if ("" !== l)
                        throw new Error('Invalid patch mode "' + l + '" in: ' + a)
                }
                r++
            }
        }
        return e
    }
    ,
    (lt.patch_obj = function() {
        this.diffs = [],
        this.start1 = null,
        this.start2 = null,
        this.length1 = 0,
        this.length2 = 0
    }
    ).prototype.toString = function() {
        var t, e = ["@@ -" + (0 === this.length1 ? this.start1 + ",0" : 1 == this.length1 ? this.start1 + 1 : this.start1 + 1 + "," + this.length1) + " +" + (0 === this.length2 ? this.start2 + ",0" : 1 == this.length2 ? this.start2 + 1 : this.start2 + 1 + "," + this.length2) + " @@\n"];
        lt.prototype.diff_cleanupSplitSurrogates(this.diffs);
        for (var n = 0; n < this.diffs.length; n++) {
            switch (this.diffs[n][0]) {
            case 1:
                t = "+";
                break;
            case at:
                t = "-";
                break;
            case 0:
                t = " "
            }
            e[n + 1] = t + encodeURI(this.diffs[n][1]) + "\n"
        }
        return e.join("").replace(/%20/g, " ")
    }
    ;
    const ct = Object.keys
      , ht = Object.hasOwnProperty
      , ft = (t,e,n)=>{
        ((t,e,n)=>{
            if (!(i(n) || s(n) || f(n)))
                throw console.error("Invalid call to Attribute.set. Key ", e, ":: Value ", n, ":: Element ", t),
                new Error("Attribute value was not simple");
            t.setAttribute(e, n + "")
        }
        )(t.dom, e, n)
    }
      , ut = (t,e)=>{
        const n = t.dom.getAttribute(e);
        return null === n ? void 0 : n
    }
      , _t = (t,e)=>m.from(ut(t, e))
      , dt = (t,e)=>{
        t.dom.removeAttribute(e)
    }
      , gt = (t,e)=>O(t.dom.cloneNode(e))
      , pt = t=>gt(t, !1)
      , mt = t=>gt(t, !0)
      , vt = t=>O(t.dom.getRootNode())
      , yt = t=>O(t.dom.host)
      , bt = t=>{
        const e = B(t) ? t.dom.parentNode : t.dom;
        if (null == e || null === e.ownerDocument)
            return !1;
        const n = e.ownerDocument;
        return (t=>{
            const e = vt(t);
            return z(n = e) && c(n.dom.host) ? m.some(e) : m.none();
            var n
        }
        )(O(e)).fold((()=>n.body.contains(e)), (r = bt,
        o = yt,
        t=>r(o(t))));
        var r, o
    }
      , wt = (t,e)=>((t,e)=>{
        const n = void 0 === e ? document : e.dom;
        return H(n) ? [] : w(n.querySelectorAll(t), O)
    }
    )(e, t)
      , xt = (t,e)=>t ? m.some(e) : m.none()
      , kt = (t,e)=>{
        const n = ut(t, e);
        return void 0 === n || "" === n ? [] : n.split(" ")
    }
      , St = t=>void 0 !== t.dom.classList
      , Ct = (t,e)=>{
        St(t) ? t.dom.classList.add(e) : ((t,e)=>{
            ((t,e,n)=>{
                const r = kt(t, e).concat([n]);
                ft(t, e, r.join(" "))
            }
            )(t, "class", e)
        }
        )(t, e)
    }
      , Mt = t=>V(t)
      , Dt = t=>B(t)
      , At = (t,e)=>t === e
      , Nt = t=>{
        if (t.dom.getAttributeNames)
            return A(t.dom.getAttributeNames());
        const e = (t=>S(t.dom.attributes, ((t,e)=>(t[e.name] = e.value,
        t)), {}))(t);
        return A(ct(e))
    }
      , Et = (t,e)=>{
        const n = j(t);
        return n === j(e) && b(["img", "iframe", "audio", "video", "embed", "source"], n) && ((t,e,n=d)=>((t,e,n)=>t.isSome() && e.isSome() ? m.some(n(t.getOrDie(), e.getOrDie())) : m.none())(t, e, n).getOr(t.isNone() && e.isNone()))(_t(t, "src"), _t(e, "src"))
    }
      , Tt = (t,e,n=!1)=>{
        if (F(t, e))
            return !0;
        if ($(t) !== $(e) || j(t) !== j(e))
            return !1;
        if (Dt(t) || (8 === $(r = t) || "#comment" === j(r))) {
            if (t.dom.data !== e.dom.data)
                return !1
        } else if (Mt(t)) {
            const n = Nt(t);
            if (!((t,e,n=At)=>{
                if (t.length !== e.length)
                    return !1;
                for (let r = 0, o = t.length; r < o; ++r)
                    if (!n(t[r], e[r]))
                        return !1;
                return !0
            }
            )(n, Nt(e)))
                return !1;
            for (let r = 0, o = n.length; r < o; ++r) {
                const o = n[r];
                if (ut(t, o) !== ut(e, o))
                    return !1
            }
        }
        var r;
        if (n) {
            const r = J(t)
              , o = J(e);
            if (r.length !== o.length)
                return !1;
            for (let t = 0, e = r.length; t < e; ++t)
                if (!Tt(r[t], o[t], n))
                    return !1
        }
        return !0
    }
      , Rt = (t,e=m.none())=>{
        const n = t=>e.exists((e=>F(t, e)));
        return n(t) ? [] : ((t,e)=>{
            const n = h(e) ? e : g;
            let r = t.dom;
            const o = [];
            for (; null !== r.parentNode && void 0 !== r.parentNode; ) {
                const t = r.parentNode
                  , e = O(t);
                if (o.push(e),
                !0 === n(e))
                    break;
                r = t
            }
            return o
        }
        )(t, n)
    }
      , It = (t="visual-dom-diff: An error occurred when trying to calculate the diff between content")=>{
        throw new Error(t)
    }
      , Pt = t=>{
        for (let e = 0; e < t.length - 2; ) {
            const n = t[e]
              , r = t[e + 1]
              , o = t[e + 2];
            if (0 !== n[0] || 0 === r[0] || 0 !== o[0]) {
                e++;
                continue
            }
            const i = n[1]
              , s = r[1]
              , l = o[1]
              , a = i[i.length - 1];
            a !== s[s.length - 1] || a < "\ue000" || a >= "\uf900" ? e++ : (n[1] = i.substring(0, i.length - 1),
            r[1] = a + s.substring(0, s.length - 1),
            o[1] = a + l,
            0 === n[1].length && t.splice(e, 1))
        }
    }
      , Ot = new lt
      , Ut = (t,e)=>{
        const n = Ot.diff_main(t, e)
          , r = []
          , o = [];
        Pt(n);
        for (let t = 0, e = n.length; t < e; ++t) {
            const e = n[t];
            if (0 === e[0]) {
                const t = e[1]
                  , n = t.length
                  , i = m.from(/^[^\uE000-\uF8FF]*/.exec(t)).map((t=>t[0].length)).getOr(0);
                if (i < n) {
                    const e = m.from(/[^\uE000-\uF8FF]*$/.exec(t)).map((t=>t[0].length)).getOr(0);
                    i > 0 && o.push(new lt.Diff(0,t.substring(0, i))),
                    Ot.diff_cleanupSemantic(o),
                    Ht(r, o),
                    o.length = 0,
                    r.push(new lt.Diff(0,t.substring(i, n - e))),
                    e > 0 && o.push(new lt.Diff(0,t.substring(n - e)))
                } else
                    o.push(e)
            } else
                o.push(e)
        }
        return Ot.diff_cleanupSemantic(o),
        Ht(r, o),
        o.length = 0,
        Ot.diff_cleanupMerge(r),
        Pt(r),
        r
    }
      , Ht = (t,e)=>{
        Array.prototype.push.apply(t, e)
    }
      , Ft = (t,e,n)=>{
        if (Mt(t))
            Ct(t, n);
        else {
            const r = q(t);
            Y(t).filter((t=>{
                return j(t) === e && (o = n,
                St(r = t) && r.dom.classList.contains(o));
                var r, o
            }
            )).fold((()=>{
                const o = I(e, r.dom);
                Ct(o, n),
                tt(t, o),
                et(o, t)
            }
            ), (e=>et(e, t)))
        }
    }
      , jt = (t,e)=>{
        let n;
        const r = t=>{
            const e = j(t);
            return "th" === e || "td" === e
        }
          , o = (t,o)=>{
            const i = j(t)
              , s = J(t);
            if ("tr" !== i || 0 === s.length)
                return !1;
            const a = t=>S(t, ((t,e)=>{
                if (!Mt(e))
                    return {
                        columns: t.columns + 1,
                        rowspan: t.rowspan + 1
                    };
                const n = _t(e, "colspan").map((t=>parseInt(t, 10))).getOr(1);
                return {
                    columns: t.columns + n,
                    rowspan: t.rowspan + _t(e, "rowspan").map((t=>parseInt(t, 10) - 1)).getOr(0) * n
                }
            }
            ), {
                columns: 0,
                rowspan: 0
            });
            if (e)
                if (l(n))
                    n = a(s);
                else {
                    const t = a(s);
                    if (n.rowspan > 0) {
                        const e = t.columns + n.rowspan - n.columns < 0
                          , r = o && n.rowspan + t.columns > n.columns;
                        if (e || r)
                            return !1;
                        {
                            const e = n.columns - t.columns;
                            n = {
                                columns: n.columns,
                                rowspan: n.rowspan - e + t.rowspan
                            }
                        }
                    } else {
                        if (n.columns !== t.columns)
                            return !1;
                        n = t
                    }
                }
            for (let t = 0, e = s.length; t < e; ++t)
                if (!r(s[t]))
                    return !1;
            return !0
        }
          , i = t=>{
            const e = j(t)
              , n = J(t);
            if ("tbody" === e && 0 === n.length)
                return !1;
            for (let t = 0, e = n.length; t < e; ++t) {
                const e = n.length - 1 === t;
                if (!o(n[t], e))
                    return !1
            }
            return !0
        }
        ;
        return (t=>{
            const e = J(t)
              , n = e.length;
            let r = 0;
            if (r < n && "caption" === j(e[r]) && r++,
            r < n && "thead" === j(e[r])) {
                if (!i(e[r]))
                    return !1;
                r++
            }
            if (!(r < n && "tbody" === j(e[r])))
                return !1;
            if (!i(e[r]))
                return !1;
            if (r++,
            r < n && "tfoot" === j(e[r])) {
                if (!i(e[r]))
                    return !1;
                r++
            }
            return r === n
        }
        )(t)
    }
      , $t = (t,e)=>{
        let n = !1;
        for (const r of t)
            if (F(r, e)) {
                n = !0;
                break
            }
        return n
    }
      , Lt = (t,e)=>{
        let n = null;
        const r = Array.from(t.entries());
        for (const [t,o] of r)
            if (F(t, e)) {
                n = o;
                break
            }
        return m.from(n)
    }
      , Vt = (t,e)=>{
        const n = J(t)
          , r = J(e);
        for (let t = 0; t < Math.min(n.length, r.length); t++) {
            const e = n[t]
              , o = r[t];
            if (Mt(e) && Mt(o)) {
                const t = ut(e, "colspan") || "1"
                  , n = ut(o, "colspan") || "1"
                  , r = ut(e, "rowspan") || "1"
                  , i = ut(o, "rowspan") || "1";
                if (t !== n || r !== i)
                    return !1
            }
        }
        return !0
    }
      , Bt = new Set(["img", "video", "iframe", "object", "svg"])
      , Kt = new Set(["bdo", "bdi", "q", "cite", "code", "data", "time", "var", "dfn", "abbr", "strong", "em", "big", "small", "mark", "sub", "sup", "samp", "kbd", "b", "i", "s", "u", "span"])
      , zt = ({addedClass: t="vdd-added", modifiedClass: e="vdd-modified", removedClass: n="vdd-removed", skipModified: r=!1, skipChildren: o, skipSelf: i, diffText: s=Ut}={})=>({
        addedClass: t,
        diffText: s,
        modifiedClass: e,
        removedClass: n,
        skipModified: r,
        skipChildren: t=>{
            if (!Mt(t) && !(t=>z(t))(t) && !(t=>K(t))(t))
                return !0;
            if (o) {
                const e = o(t);
                if ("boolean" == typeof e)
                    return e
            }
            return Bt.has(j(t))
        }
        ,
        skipSelf: t=>{
            if (!Dt(t) && !Mt(t))
                return !0;
            if (i) {
                const e = i(t);
                if ("boolean" == typeof e)
                    return e
            }
            return Kt.has(j(t))
        }
    });
    class Wt {
        constructor(t, e) {
            this.descend = !0,
            this.nextNode = m.some(t),
            this.rootNode = t,
            this.config = e,
            this.nextNode.each((t=>{
                this.skipSelf(t) && this.next()
            }
            ))
        }
        toArray() {
            const t = [];
            let e = this.next();
            for (; !e.done; ) {
                const {value: n} = e;
                t.push(n),
                e = this.next()
            }
            return t
        }
        forEach(t) {
            let e = 0
              , n = this.next();
            for (; !n.done; )
                t(n.value, e),
                n = this.next(),
                e++
        }
        reduce(t, e) {
            let n = e
              , r = this.next();
            for (; !r.done; )
                n = t(n, r.value),
                r = this.next();
            return n
        }
        some(t) {
            let e = this.next();
            for (; !e.done; ) {
                if (t(e.value))
                    return !0;
                e = this.next()
            }
            return !1
        }
        next() {
            return this.nextNode.fold((()=>({
                done: !0,
                value: this.rootNode
            })), (t=>(this.descend && t.dom.firstChild && !this.skipChildren(t) ? this.nextNode = Q(t) : F(t, this.rootNode) ? this.nextNode = m.none() : Z(t).isSome() ? (this.nextNode = Z(t),
            this.descend = !0) : (this.nextNode = G(t),
            this.descend = !1,
            this.next()),
            this.nextNode.each((t=>{
                this.skipSelf(t) && this.next()
            }
            )),
            {
                done: !1,
                value: t
            })))
        }
        skipSelf(t) {
            return !(!this.config || !this.config.skipSelf) && this.config.skipSelf(t)
        }
        skipChildren(t) {
            return !(!this.config || !this.config.skipChildren) && this.config.skipChildren(t)
        }
    }
    const qt = t=>"th" === t ? "td" : t
      , Gt = (t,e)=>new Wt(t,e).reduce(((t,e)=>{
        return t + (Dt(e) ? e.dom.data : (n = qt(j(e)),
        String.fromCharCode(57344 + (t=>{
            let e = 0;
            for (let n = 0; n < t.length; n++)
                e = (e << 5) - e + t.charCodeAt(n) | 0;
            return e
        }
        )(n) % 6400)));
        var n
    }
    ), "")
      , Xt = t=>Dt(t) ? t.dom.length : 1
      , Yt = t=>"tr" === j(t)
      , Zt = {
        skipChildren: Yt,
        skipSelf: t=>!Yt(t)
    }
      , Jt = (t,e,n={})=>{
        const r = q(e).dom
          , o = zt(n)
          , {addedClass: i, diffText: s, modifiedClass: l, removedClass: a, skipSelf: h, skipChildren: f} = o
          , u = t=>!h(t)
          , _ = (t,e)=>k(Rt(t, m.from(e)), u).length
          , d = t=>Mt(t) && h(t)
          , g = (t,e)=>D(k(Rt(t, m.from(e)), d))
          , p = t=>$t(z, t) ? 1 : $t(K, t) ? -1 : 0
          , v = s(Gt(t, o), Gt(e, o));
        let y = 0;
        const b = new Wt(t,o)
          , w = new Wt(e,o);
        let S, C, M, A, N, E = 0, T = 0, R = 0;
        M = v[y++],
        ({done: S, value: A} = b.next()),
        ({done: C, value: N} = w.next());
        const O = st([], r);
        let U = O
          , H = 0
          , $ = O
          , L = 0
          , V = m.none()
          , B = m.none();
        const K = new Set
          , z = new Set
          , W = new Set
          , Z = new Map
          , Q = new Array
          , rt = new Map
          , ot = ()=>{
            const e = _(A, t);
            for (; H > e; )
                G(U).fold((()=>{
                    It()
                }
                ), (t=>{
                    V.each((t=>{
                        F(U, t) && (V = m.none())
                    }
                    )),
                    U = t,
                    H--
                }
                ));
            H !== e && It()
        }
          , it = ()=>{
            const t = _(N, e);
            for (; L > t; )
                G($).fold((()=>{
                    It()
                }
                ), (t=>{
                    B.each((t=>{
                        F($, t) && (B = m.none())
                    }
                    )),
                    $ = t,
                    L--
                }
                ));
            L !== t && It()
        }
          , lt = n=>{
            if ((!F(U, $) || B.isSome() || V.isSome()) && It(),
            Dt(n)) {
                const r = g(A, t)
                  , o = g(N, e);
                Z.set(n, o);
                const i = r.length;
                if (i !== o.length)
                    W.add(n);
                else
                    for (let t = 0; t < i; ++t)
                        if (!Tt(r[t], o[t])) {
                            W.add(n);
                            break
                        }
            } else {
                Tt(A, N) || W.add(n);
                const t = j(A);
                "table" === t ? Q.push({
                    newTable: N,
                    oldTable: A,
                    outputTable: n
                }) : "tr" === t && rt.set(n, {
                    newRow: N,
                    oldRow: A
                })
            }
            et($, n),
            U = n,
            $ = n,
            H++,
            L++
        }
          , ct = e=>{
            if (V.isNone() && (V = m.from(e),
            K.add(e)),
            Dt(e)) {
                const n = g(A, t);
                Z.set(e, n)
            }
            et(U, e),
            U = e,
            H++
        }
          , ht = t=>{
            if (B.isNone() && (B = m.from(t),
            z.add(t)),
            Dt(t)) {
                const n = g(N, e);
                Z.set(t, n)
            }
            et($, t),
            $ = t,
            L++
        }
          , ft = t=>{
            const e = M[1].length;
            E += t,
            E === e ? (M = v[y++],
            E = 0) : E > e && It()
        }
          , ut = t=>{
            const e = Xt(A);
            T += t,
            T === e ? (({done: S, value: A} = b.next()),
            T = 0) : T > e && It()
        }
          , _t = t=>{
            const e = Xt(N);
            R += t,
            R === e ? (({done: C, value: N} = w.next()),
            R = 0) : R > e && It()
        }
        ;
        for (; M; )
            if (M[0] === at) {
                S && It(),
                ot();
                const t = Math.min(M[1].length - E, Xt(A) - T)
                  , e = M[1].substring(E, E + t);
                ct(Dt(A) ? P(e, r) : pt(A)),
                ft(t),
                ut(t)
            } else if (1 === M[0]) {
                C && It(),
                it();
                const t = Math.min(M[1].length - E, Xt(N) - R)
                  , e = M[1].substring(E, E + t);
                ht(Dt(N) ? P(e, r) : pt(N)),
                ft(t),
                _t(t)
            } else {
                (S || C) && It(),
                ot(),
                it();
                const t = Math.min(M[1].length - E, Xt(A) - T, Xt(N) - R)
                  , e = M[1].substring(E, E + t)
                  , n = ()=>Dt(A) && Dt(N)
                  , o = ()=>qt(j(A)) === qt(j(N))
                  , i = ()=>!f(A) && !f(N);
                F(U, $) && (n() || o() && i() || Tt(A, N) || Et(A, N)) ? lt(Dt(N) ? P(e, r) : pt(N)) : (ct(Dt(A) ? P(e, r) : pt(A)),
                ht(Dt(N) ? P(e, r) : pt(N))),
                ft(t),
                ut(t),
                _t(t)
            }
        return x(Array.from(K), (t=>{
            let e = Y(t).getOrNull();
            for (; c(e) && $t(z, e); )
                tt(e, t),
                e = Y(t).getOrNull()
        }
        )),
        Q.forEach((t=>{
            const {newTable: e, oldTable: r, outputTable: o} = t
              , i = t=>wt(t, "td[colspan],th[colspan],td[rowspan],th[rowspan]").length > 0;
            if (!jt(r, !0) || !jt(e, !0) || !jt(o, !1) || (i(e) || i(r)) && !(t=>{
                for (const e of t.values()) {
                    const t = e.oldRow
                      , n = e.newRow;
                    if (!Vt(t, n))
                        return !1
                }
                return !0
            }
            )(rt)) {
                new Wt(o).forEach((t=>{
                    z.delete(t),
                    K.delete(t),
                    W.delete(t),
                    Z.delete(t)
                }
                ));
                const t = mt(r)
                  , n = mt(e);
                return tt(o, t),
                tt(o, n),
                nt(o),
                K.add(t),
                void z.add(n)
            }
            const s = [];
            new Wt(o,Zt).forEach((t=>Lt(rt, t).map((e=>{
                const {oldRow: n, newRow: r} = e
                  , o = J(n)
                  , i = J(r)
                  , l = o.length
                  , a = i.length
                  , c = Math.max(l, a)
                  , h = Math.min(l, a)
                  , f = []
                  , u = J(t);
                if (u.length === c) {
                    const t = u;
                    for (let e = 0, n = t.length; e < n; ++e)
                        f.push(p(t[e]));
                    s.push(f)
                } else {
                    let t = 0
                      , e = 0;
                    for (; t < h; )
                        f[t++] = e;
                    for (e = l < a ? 1 : -1; t < c; )
                        f[t++] = e;
                    s.push(f)
                }
            }
            )))),
            0 === s.length && It(),
            new Wt(o,Zt).forEach(((t,e)=>{
                const r = J(t);
                X(t).each((o=>{
                    if ($t(z, t) || $t(z, o)) {
                        if (s[e] && r.length < s[e].length)
                            for (let t = 0; t < s[e].length; ++t)
                                if (-1 === s[e][t]) {
                                    const e = I("td");
                                    tt(r[t], e),
                                    K.add(e)
                                }
                    } else if ($t(K, t) || $t(K, o)) {
                        if (s[e] && r.length < s[e].length)
                            for (let t = 0; t < s[e].length; ++t)
                                if (1 === s[e][t]) {
                                    const e = I("td");
                                    tt(r[t], e)
                                }
                    } else {
                        let o = !0;
                        for (let t = 0, n = r.length; t < n; ++t)
                            if (s[e] && p(r[t]) !== s[e][t]) {
                                o = !1;
                                break
                            }
                        if (!o) {
                            const r = new Wt(t);
                            for (r.next(),
                            r.forEach((t=>{
                                z.delete(t),
                                K.delete(t),
                                W.delete(t),
                                Z.delete(t)
                            }
                            )); t.dom.firstChild; )
                                t.dom.removeChild(t.dom.firstChild);
                            Lt(rt, t).each((({newRow: r, oldRow: o})=>{
                                const i = J(r)
                                  , l = J(o);
                                let a = 0
                                  , c = 0;
                                for (const r of s[e])
                                    if (1 === r) {
                                        const e = mt(i[c++]);
                                        et(t, e),
                                        z.add(e)
                                    } else if (-1 === r) {
                                        const e = mt(l[a++]);
                                        et(t, e),
                                        K.add(e)
                                    } else
                                        t.dom.appendChild(Jt(l[a++], i[c++], n).dom)
                            }
                            ))
                        }
                    }
                }
                ))
            }
            ))
        }
        )),
        K.forEach((t=>{
            Ft(t, "del", a)
        }
        )),
        z.forEach((t=>{
            Ft(t, "ins", i)
        }
        )),
        o.skipModified || W.forEach((t=>{
            Ft(t, "ins", l)
        }
        )),
        Z.forEach(((t,e)=>{
            t.forEach((t=>{
                Y(e).filter((e=>Tt(e, t))).fold((()=>{
                    const n = pt(t);
                    tt(e, n),
                    et(n, e)
                }
                ), (t=>et(t, e)))
            }
            ))
        }
        )),
        O
    }
      , Qt = (t,e)=>{
        const n = [`pre ins.${e.addition}`, `pre del.${e.removal}`].join(",")
          , r = wt(t, n);
        x(r, (t=>{
            ((t,e)=>{
                const n = W(t).dom
                  , r = O(n.createDocumentFragment());
                ((t,e)=>{
                    x(e, (e=>{
                        et(t, e)
                    }
                    ))
                }
                )(r, rt(e, n)),
                (t=>{
                    t.dom.textContent = "",
                    x(J(t), (t=>{
                        nt(t)
                    }
                    ))
                }
                )(t),
                et(t, r)
            }
            )(t, ot(t).replace(/\n/g, '<span data-mce-newline-placeholder="1">&nbsp;</span>\n'))
        }
        ))
    }
      , te = (t,e,n)=>{
        const r = st(rt(t))
          , o = st(rt(e))
          , i = {
            addedClass: n.addition,
            removedClass: n.removal,
            modifiedClass: n.modification
        };
        return ((t,e)=>(x([Qt], (n=>{
            n(t, e)
        }
        )),
        t))(Jt(r, o, i), n)
    }
      , ee = {
        addition: "tox-revisionhistory__annotation--added",
        removal: "tox-revisionhistory__annotation--removed",
        modification: "tox-revisionhistory__annotation--modified"
    }
      , ne = t=>e=>e.options.get(t)
      , re = t=>e=>m.from(ne(t)(e)).filter(h)
      , oe = (ie = "revisionhistory_fetch",
    t=>re(ie)(t).getOrDie(ie + " has not been implemented."));
    var ie;
    const se = re("revisionhistory_fetch_revision")
      , le = ne("revisionhistory_css_url")
      , ae = t=>{
        const e = m.from(t.options.get("revisionhistory_diff_classes")).getOr({});
        return ((t,e)=>{
            const n = {};
            return ((t,e)=>{
                const n = ct(t);
                for (let r = 0, o = n.length; r < o; r++) {
                    const o = n[r];
                    e(t[o], o)
                }
            }
            )(t, ((t,r)=>{
                const o = e(t, r);
                n[o.k] = o.v
            }
            )),
            n
        }
        )(ee, ((t,n)=>{
            return {
                k: n,
                v: (r = t,
                o = n,
                ((t,e)=>((t,e)=>ht.call(t, e))(t, e) ? m.from(t[e]) : m.none())(e, o).getOr(r))
            };
            var r, o
        }
        ))
    }
      , ce = ne("revisionhistory_author")
      , he = ne("revisionhistory_display_author")
      , fe = ne("body_class")
      , ue = ne("content_style")
      , _e = ne("content_css_cors")
      , de = ()=>window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
    let ge = 0;
    const pe = t=>{
        const e = (new Date).getTime()
          , n = Math.floor(1e9 * de());
        return ge++,
        t + "_" + n + ge + String(e)
    }
      , me = t=>{
        const e = (t=>{
            let e = t;
            return {
                get: ()=>e,
                set: t=>{
                    e = t
                }
            }
        }
        )(m.none())
          , n = ()=>e.get().each(t);
        return {
            clear: ()=>{
                n(),
                e.set(m.none())
            }
            ,
            isSet: ()=>e.get().isSome(),
            get: ()=>e.get(),
            set: t=>{
                n(),
                e.set(m.some(t))
            }
        }
    }
      , ve = t=>t.length > 0
      , ye = (t,e)=>tinymce.html.Serializer({
        validate: !0
    }, t.schema).serialize(t.parser.parse(e))
      , be = t=>ye(t, t.getContent())
      , we = (t,e)=>({
        content: be(t),
        createdAt: (new Date).toISOString(),
        revisionId: pe("tinymce"),
        internalType: e,
        author: ce(t)
    });
    var xe, ke, Se, Ce, Me, De, Ae, Ne, Ee, Te, Re, Ie = {}, Pe = [], Oe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Ue = Array.isArray;
    function He(t, e) {
        for (var n in e)
            t[n] = e[n];
        return t
    }
    function Fe(t) {
        var e = t.parentNode;
        e && e.removeChild(t)
    }
    function je(t, e, n, r, o) {
        var i = {
            type: t,
            props: e,
            key: n,
            ref: r,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            constructor: void 0,
            __v: null == o ? ++Se : o,
            __i: -1,
            __u: 0
        };
        return null == o && null != ke.vnode && ke.vnode(i),
        i
    }
    function $e(t) {
        return t.children
    }
    function Le(t, e) {
        this.props = t,
        this.context = e
    }
    function Ve(t, e) {
        if (null == e)
            return t.__ ? Ve(t.__, t.__i + 1) : null;
        for (var n; e < t.__k.length; e++)
            if (null != (n = t.__k[e]) && null != n.__e)
                return n.__e;
        return "function" == typeof t.type ? Ve(t) : null
    }
    function Be(t) {
        var e, n;
        if (null != (t = t.__) && null != t.__c) {
            for (t.__e = t.__c.base = null,
            e = 0; e < t.__k.length; e++)
                if (null != (n = t.__k[e]) && null != n.__e) {
                    t.__e = t.__c.base = n.__e;
                    break
                }
            return Be(t)
        }
    }
    function Ke(t) {
        (!t.__d && (t.__d = !0) && Ce.push(t) && !ze.__r++ || Me !== ke.debounceRendering) && ((Me = ke.debounceRendering) || De)(ze)
    }
    function ze() {
        var t, e, n, r, o, i, s, l;
        for (Ce.sort(Ae); t = Ce.shift(); )
            t.__d && (e = Ce.length,
            r = void 0,
            i = (o = (n = t).__v).__e,
            s = [],
            l = [],
            n.__P && ((r = He({}, o)).__v = o.__v + 1,
            ke.vnode && ke.vnode(r),
            Qe(n.__P, r, o, n.__n, void 0 !== n.__P.ownerSVGElement, 32 & o.__u ? [i] : null, s, null == i ? Ve(o) : i, !!(32 & o.__u), l),
            r.__v = o.__v,
            r.__.__k[r.__i] = r,
            tn(s, r, l),
            r.__e != i && Be(r)),
            Ce.length > e && Ce.sort(Ae));
        ze.__r = 0
    }
    function We(t, e, n, r, o, i, s, l, a, c, h) {
        var f, u, _, d, g, p = r && r.__k || Pe, m = e.length;
        for (n.__d = a,
        qe(n, e, p),
        a = n.__d,
        f = 0; f < m; f++)
            null != (_ = n.__k[f]) && "boolean" != typeof _ && "function" != typeof _ && (u = -1 === _.__i ? Ie : p[_.__i] || Ie,
            _.__i = f,
            Qe(t, _, u, o, i, s, l, a, c, h),
            d = _.__e,
            _.ref && u.ref != _.ref && (u.ref && nn(u.ref, null, _),
            h.push(_.ref, _.__c || d, _)),
            null == g && null != d && (g = d),
            65536 & _.__u || u.__k === _.__k ? (a && !a.isConnected && (a = Ve(u)),
            a = Ge(_, a, t)) : "function" == typeof _.type && void 0 !== _.__d ? a = _.__d : d && (a = d.nextSibling),
            _.__d = void 0,
            _.__u &= -196609);
        n.__d = a,
        n.__e = g
    }
    function qe(t, e, n) {
        var r, o, i, s, l, a = e.length, c = n.length, h = c, f = 0;
        for (t.__k = [],
        r = 0; r < a; r++)
            s = r + f,
            null != (o = t.__k[r] = null == (o = e[r]) || "boolean" == typeof o || "function" == typeof o ? null : "string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? je(null, o, null, null, null) : Ue(o) ? je($e, {
                children: o
            }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? je(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : o) ? (o.__ = t,
            o.__b = t.__b + 1,
            l = Xe(o, n, s, h),
            o.__i = l,
            i = null,
            -1 !== l && (h--,
            (i = n[l]) && (i.__u |= 131072)),
            null == i || null === i.__v ? (-1 == l && f--,
            "function" != typeof o.type && (o.__u |= 65536)) : l !== s && (l === s + 1 ? f++ : l > s ? h > a - s ? f += l - s : f-- : l < s ? l == s - 1 && (f = l - s) : f = 0,
            l !== r + f && (o.__u |= 65536))) : (i = n[s]) && null == i.key && i.__e && 0 == (131072 & i.__u) && (i.__e == t.__d && (t.__d = Ve(i)),
            rn(i, i, !1),
            n[s] = null,
            h--);
        if (h)
            for (r = 0; r < c; r++)
                null != (i = n[r]) && 0 == (131072 & i.__u) && (i.__e == t.__d && (t.__d = Ve(i)),
                rn(i, i))
    }
    function Ge(t, e, n) {
        var r, o;
        if ("function" == typeof t.type) {
            for (r = t.__k,
            o = 0; r && o < r.length; o++)
                r[o] && (r[o].__ = t,
                e = Ge(r[o], e, n));
            return e
        }
        t.__e != e && (n.insertBefore(t.__e, e || null),
        e = t.__e);
        do {
            e = e && e.nextSibling
        } while (null != e && 8 === e.nodeType);
        return e
    }
    function Xe(t, e, n, r) {
        var o = t.key
          , i = t.type
          , s = n - 1
          , l = n + 1
          , a = e[n];
        if (null === a || a && o == a.key && i === a.type && 0 == (131072 & a.__u))
            return n;
        if (r > (null != a && 0 == (131072 & a.__u) ? 1 : 0))
            for (; s >= 0 || l < e.length; ) {
                if (s >= 0) {
                    if ((a = e[s]) && 0 == (131072 & a.__u) && o == a.key && i === a.type)
                        return s;
                    s--
                }
                if (l < e.length) {
                    if ((a = e[l]) && 0 == (131072 & a.__u) && o == a.key && i === a.type)
                        return l;
                    l++
                }
            }
        return -1
    }
    function Ye(t, e, n) {
        "-" === e[0] ? t.setProperty(e, null == n ? "" : n) : t[e] = null == n ? "" : "number" != typeof n || Oe.test(e) ? n : n + "px"
    }
    function Ze(t, e, n, r, o) {
        var i;
        t: if ("style" === e)
            if ("string" == typeof n)
                t.style.cssText = n;
            else {
                if ("string" == typeof r && (t.style.cssText = r = ""),
                r)
                    for (e in r)
                        n && e in n || Ye(t.style, e, "");
                if (n)
                    for (e in n)
                        r && n[e] === r[e] || Ye(t.style, e, n[e])
            }
        else if ("o" === e[0] && "n" === e[1])
            i = e !== (e = e.replace(/(PointerCapture)$|Capture$/i, "$1")),
            e = e.toLowerCase()in t || "onFocusOut" === e || "onFocusIn" === e ? e.toLowerCase().slice(2) : e.slice(2),
            t.l || (t.l = {}),
            t.l[e + i] = n,
            n ? r ? n.u = r.u : (n.u = Ne,
            t.addEventListener(e, i ? Te : Ee, i)) : t.removeEventListener(e, i ? Te : Ee, i);
        else {
            if (o)
                e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
            else if ("width" != e && "height" != e && "href" != e && "list" != e && "form" != e && "tabIndex" != e && "download" != e && "rowSpan" != e && "colSpan" != e && "role" != e && e in t)
                try {
                    t[e] = null == n ? "" : n;
                    break t
                } catch (t) {}
            "function" == typeof n || (null == n || !1 === n && "-" !== e[4] ? t.removeAttribute(e) : t.setAttribute(e, n))
        }
    }
    function Je(t) {
        return function(e) {
            if (this.l) {
                var n = this.l[e.type + t];
                if (null == e.t)
                    e.t = Ne++;
                else if (e.t < n.u)
                    return;
                return n(ke.event ? ke.event(e) : e)
            }
        }
    }
    function Qe(t, e, n, r, o, i, s, l, a, c) {
        var h, f, u, _, d, g, p, m, v, y, b, w, x, k, S, C = e.type;
        if (void 0 !== e.constructor)
            return null;
        128 & n.__u && (a = !!(32 & n.__u),
        i = [l = e.__e = n.__e]),
        (h = ke.__b) && h(e);
        t: if ("function" == typeof C)
            try {
                if (m = e.props,
                v = (h = C.contextType) && r[h.__c],
                y = h ? v ? v.props.value : h.__ : r,
                n.__c ? p = (f = e.__c = n.__c).__ = f.__E : ("prototype"in C && C.prototype.render ? e.__c = f = new C(m,y) : (e.__c = f = new Le(m,y),
                f.constructor = C,
                f.render = on),
                v && v.sub(f),
                f.props = m,
                f.state || (f.state = {}),
                f.context = y,
                f.__n = r,
                u = f.__d = !0,
                f.__h = [],
                f._sb = []),
                null == f.__s && (f.__s = f.state),
                null != C.getDerivedStateFromProps && (f.__s == f.state && (f.__s = He({}, f.__s)),
                He(f.__s, C.getDerivedStateFromProps(m, f.__s))),
                _ = f.props,
                d = f.state,
                f.__v = e,
                u)
                    null == C.getDerivedStateFromProps && null != f.componentWillMount && f.componentWillMount(),
                    null != f.componentDidMount && f.__h.push(f.componentDidMount);
                else {
                    if (null == C.getDerivedStateFromProps && m !== _ && null != f.componentWillReceiveProps && f.componentWillReceiveProps(m, y),
                    !f.__e && (null != f.shouldComponentUpdate && !1 === f.shouldComponentUpdate(m, f.__s, y) || e.__v === n.__v)) {
                        for (e.__v !== n.__v && (f.props = m,
                        f.state = f.__s,
                        f.__d = !1),
                        e.__e = n.__e,
                        e.__k = n.__k,
                        e.__k.forEach((function(t) {
                            t && (t.__ = e)
                        }
                        )),
                        b = 0; b < f._sb.length; b++)
                            f.__h.push(f._sb[b]);
                        f._sb = [],
                        f.__h.length && s.push(f);
                        break t
                    }
                    null != f.componentWillUpdate && f.componentWillUpdate(m, f.__s, y),
                    null != f.componentDidUpdate && f.__h.push((function() {
                        f.componentDidUpdate(_, d, g)
                    }
                    ))
                }
                if (f.context = y,
                f.props = m,
                f.__P = t,
                f.__e = !1,
                w = ke.__r,
                x = 0,
                "prototype"in C && C.prototype.render) {
                    for (f.state = f.__s,
                    f.__d = !1,
                    w && w(e),
                    h = f.render(f.props, f.state, f.context),
                    k = 0; k < f._sb.length; k++)
                        f.__h.push(f._sb[k]);
                    f._sb = []
                } else
                    do {
                        f.__d = !1,
                        w && w(e),
                        h = f.render(f.props, f.state, f.context),
                        f.state = f.__s
                    } while (f.__d && ++x < 25);
                f.state = f.__s,
                null != f.getChildContext && (r = He(He({}, r), f.getChildContext())),
                u || null == f.getSnapshotBeforeUpdate || (g = f.getSnapshotBeforeUpdate(_, d)),
                We(t, Ue(S = null != h && h.type === $e && null == h.key ? h.props.children : h) ? S : [S], e, n, r, o, i, s, l, a, c),
                f.base = e.__e,
                e.__u &= -161,
                f.__h.length && s.push(f),
                p && (f.__E = f.__ = null)
            } catch (t) {
                e.__v = null,
                a || null != i ? (e.__e = l,
                e.__u |= a ? 160 : 32,
                i[i.indexOf(l)] = null) : (e.__e = n.__e,
                e.__k = n.__k),
                ke.__e(t, e, n)
            }
        else
            null == i && e.__v === n.__v ? (e.__k = n.__k,
            e.__e = n.__e) : e.__e = en(n.__e, e, n, r, o, i, s, a, c);
        (h = ke.diffed) && h(e)
    }
    function tn(t, e, n) {
        e.__d = void 0;
        for (var r = 0; r < n.length; r++)
            nn(n[r], n[++r], n[++r]);
        ke.__c && ke.__c(e, t),
        t.some((function(e) {
            try {
                t = e.__h,
                e.__h = [],
                t.some((function(t) {
                    t.call(e)
                }
                ))
            } catch (t) {
                ke.__e(t, e.__v)
            }
        }
        ))
    }
    function en(t, e, n, r, o, i, s, l, a) {
        var c, h, f, u, _, d, g, p = n.props, m = e.props, v = e.type;
        if ("svg" === v && (o = !0),
        null != i)
            for (c = 0; c < i.length; c++)
                if ((_ = i[c]) && "setAttribute"in _ == !!v && (v ? _.localName === v : 3 === _.nodeType)) {
                    t = _,
                    i[c] = null;
                    break
                }
        if (null == t) {
            if (null === v)
                return document.createTextNode(m);
            t = o ? document.createElementNS("http://www.w3.org/2000/svg", v) : document.createElement(v, m.is && m),
            i = null,
            l = !1
        }
        if (null === v)
            p === m || l && t.data === m || (t.data = m);
        else {
            if (i = i && xe.call(t.childNodes),
            p = n.props || Ie,
            !l && null != i)
                for (p = {},
                c = 0; c < t.attributes.length; c++)
                    p[(_ = t.attributes[c]).name] = _.value;
            for (c in p)
                _ = p[c],
                "children" == c || ("dangerouslySetInnerHTML" == c ? f = _ : "key" === c || c in m || Ze(t, c, null, _, o));
            for (c in m)
                _ = m[c],
                "children" == c ? u = _ : "dangerouslySetInnerHTML" == c ? h = _ : "value" == c ? d = _ : "checked" == c ? g = _ : "key" === c || l && "function" != typeof _ || p[c] === _ || Ze(t, c, _, p[c], o);
            if (h)
                l || f && (h.__html === f.__html || h.__html === t.innerHTML) || (t.innerHTML = h.__html),
                e.__k = [];
            else if (f && (t.innerHTML = ""),
            We(t, Ue(u) ? u : [u], e, n, r, o && "foreignObject" !== v, i, s, i ? i[0] : n.__k && Ve(n, 0), l, a),
            null != i)
                for (c = i.length; c--; )
                    null != i[c] && Fe(i[c]);
            l || (c = "value",
            void 0 !== d && (d !== t[c] || "progress" === v && !d || "option" === v && d !== p[c]) && Ze(t, c, d, p[c], !1),
            c = "checked",
            void 0 !== g && g !== t[c] && Ze(t, c, g, p[c], !1))
        }
        return t
    }
    function nn(t, e, n) {
        try {
            "function" == typeof t ? t(e) : t.current = e
        } catch (t) {
            ke.__e(t, n)
        }
    }
    function rn(t, e, n) {
        var r, o;
        if (ke.unmount && ke.unmount(t),
        (r = t.ref) && (r.current && r.current !== t.__e || nn(r, null, e)),
        null != (r = t.__c)) {
            if (r.componentWillUnmount)
                try {
                    r.componentWillUnmount()
                } catch (t) {
                    ke.__e(t, e)
                }
            r.base = r.__P = null
        }
        if (r = t.__k)
            for (o = 0; o < r.length; o++)
                r[o] && rn(r[o], e, n || "function" != typeof t.type);
        n || null == t.__e || Fe(t.__e),
        t.__c = t.__ = t.__e = t.__d = void 0
    }
    function on(t, e, n) {
        return this.constructor(t, n)
    }
    function sn(t, e, n) {
        var r, o, i, s;
        ke.__ && ke.__(t, e),
        o = (r = "function" == typeof n) ? null : n && n.__k || e.__k,
        i = [],
        s = [],
        Qe(e, t = (!r && n || e).__k = function(t, e, n) {
            var r, o, i, s = {};
            for (i in e)
                "key" == i ? r = e[i] : "ref" == i ? o = e[i] : s[i] = e[i];
            if (arguments.length > 2 && (s.children = arguments.length > 3 ? xe.call(arguments, 2) : n),
            "function" == typeof t && null != t.defaultProps)
                for (i in t.defaultProps)
                    void 0 === s[i] && (s[i] = t.defaultProps[i]);
            return je(t, s, r, o, null)
        }($e, null, [t]), o || Ie, Ie, void 0 !== e.ownerSVGElement, !r && n ? [n] : o ? null : e.firstChild ? xe.call(e.childNodes) : null, i, !r && n ? n : o ? o.__e : e.firstChild, r, s),
        tn(i, t, s)
    }
    xe = Pe.slice,
    ke = {
        __e: function(t, e, n, r) {
            for (var o, i, s; e = e.__; )
                if ((o = e.__c) && !o.__)
                    try {
                        if ((i = o.constructor) && null != i.getDerivedStateFromError && (o.setState(i.getDerivedStateFromError(t)),
                        s = o.__d),
                        null != o.componentDidCatch && (o.componentDidCatch(t, r || {}),
                        s = o.__d),
                        s)
                            return o.__E = o
                    } catch (e) {
                        t = e
                    }
            throw t
        }
    },
    Se = 0,
    Le.prototype.setState = function(t, e) {
        var n;
        n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = He({}, this.state),
        "function" == typeof t && (t = t(He({}, n), this.props)),
        t && He(n, t),
        null != t && this.__v && (e && this._sb.push(e),
        Ke(this))
    }
    ,
    Le.prototype.forceUpdate = function(t) {
        this.__v && (this.__e = !0,
        t && this.__h.push(t),
        Ke(this))
    }
    ,
    Le.prototype.render = $e,
    Ce = [],
    De = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout,
    Ae = function(t, e) {
        return t.__v.__b - e.__v.__b
    }
    ,
    ze.__r = 0,
    Ne = 0,
    Ee = Je(!1),
    Te = Je(!0),
    Re = 0;
    var ln = 0;
    function an(t, e, n, r, o, i) {
        var s, l, a = {};
        for (l in e)
            "ref" == l ? s = e[l] : a[l] = e[l];
        var c = {
            type: t,
            props: a,
            key: n,
            ref: s,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            constructor: void 0,
            __v: --ln,
            __i: -1,
            __u: 0,
            __source: o,
            __self: i
        };
        if ("function" == typeof t && (s = t.defaultProps))
            for (l in s)
                void 0 === a[l] && (a[l] = s[l]);
        return ke.vnode && ke.vnode(c),
        c
    }
    const cn = (t,e)=>{
        x(e, (e=>{
            ((t,e)=>{
                St(t) ? t.dom.classList.remove(e) : ((t,e)=>{
                    ((t,e,n)=>{
                        const r = k(kt(t, e), (t=>t !== n));
                        r.length > 0 ? ft(t, e, r.join(" ")) : dt(t, e)
                    }
                    )(t, "class", e)
                }
                )(t, e),
                (t=>{
                    const e = St(t) ? t.dom.classList : (t=>kt(t, "class"))(t);
                    0 === e.length && dt(t, "class")
                }
                )(t)
            }
            )(t, e)
        }
        ))
    }
    ;
    var hn, fn, un, _n, dn = 0, gn = [], pn = [], mn = ke, vn = mn.__b, yn = mn.__r, bn = mn.diffed, wn = mn.__c, xn = mn.unmount, kn = mn.__;
    function Sn(t, e) {
        mn.__h && mn.__h(fn, t, dn || e),
        dn = 0;
        var n = fn.__H || (fn.__H = {
            __: [],
            __h: []
        });
        return t >= n.__.length && n.__.push({
            __V: pn
        }),
        n.__[t]
    }
    function Cn(t) {
        return dn = 1,
        function(t, e, n) {
            var r = Sn(hn++, 2);
            if (r.t = t,
            !r.__c && (r.__ = [Un(void 0, e), function(t) {
                var e = r.__N ? r.__N[0] : r.__[0]
                  , n = r.t(e, t);
                e !== n && (r.__N = [n, r.__[1]],
                r.__c.setState({}))
            }
            ],
            r.__c = fn,
            !fn.u)) {
                var o = function(t, e, n) {
                    if (!r.__c.__H)
                        return !0;
                    var o = r.__c.__H.__.filter((function(t) {
                        return !!t.__c
                    }
                    ));
                    if (o.every((function(t) {
                        return !t.__N
                    }
                    )))
                        return !i || i.call(this, t, e, n);
                    var s = !1;
                    return o.forEach((function(t) {
                        if (t.__N) {
                            var e = t.__[0];
                            t.__ = t.__N,
                            t.__N = void 0,
                            e !== t.__[0] && (s = !0)
                        }
                    }
                    )),
                    !(!s && r.__c.props === t) && (!i || i.call(this, t, e, n))
                };
                fn.u = !0;
                var i = fn.shouldComponentUpdate
                  , s = fn.componentWillUpdate;
                fn.componentWillUpdate = function(t, e, n) {
                    if (this.__e) {
                        var r = i;
                        i = void 0,
                        o(t, e, n),
                        i = r
                    }
                    s && s.call(this, t, e, n)
                }
                ,
                fn.shouldComponentUpdate = o
            }
            return r.__N || r.__
        }(Un, t)
    }
    function Mn(t, e) {
        var n = Sn(hn++, 3);
        !mn.__s && On(n.__H, e) && (n.__ = t,
        n.i = e,
        fn.__H.__h.push(n))
    }
    function Dn(t) {
        return dn = 5,
        An((function() {
            return {
                current: t
            }
        }
        ), [])
    }
    function An(t, e) {
        var n = Sn(hn++, 7);
        return On(n.__H, e) ? (n.__V = t(),
        n.i = e,
        n.__h = t,
        n.__V) : n.__
    }
    function Nn(t) {
        var e = fn.context[t.__c]
          , n = Sn(hn++, 9);
        return n.c = t,
        e ? (null == n.__ && (n.__ = !0,
        e.sub(fn)),
        e.props.value) : t.__
    }
    function En() {
        for (var t; t = gn.shift(); )
            if (t.__P && t.__H)
                try {
                    t.__H.__h.forEach(In),
                    t.__H.__h.forEach(Pn),
                    t.__H.__h = []
                } catch (e) {
                    t.__H.__h = [],
                    mn.__e(e, t.__v)
                }
    }
    mn.__b = function(t) {
        fn = null,
        vn && vn(t)
    }
    ,
    mn.__ = function(t, e) {
        t && e.__k && e.__k.__m && (t.__m = e.__k.__m),
        kn && kn(t, e)
    }
    ,
    mn.__r = function(t) {
        yn && yn(t),
        hn = 0;
        var e = (fn = t.__c).__H;
        e && (un === fn ? (e.__h = [],
        fn.__h = [],
        e.__.forEach((function(t) {
            t.__N && (t.__ = t.__N),
            t.__V = pn,
            t.__N = t.i = void 0
        }
        ))) : (e.__h.forEach(In),
        e.__h.forEach(Pn),
        e.__h = [],
        hn = 0)),
        un = fn
    }
    ,
    mn.diffed = function(t) {
        bn && bn(t);
        var e = t.__c;
        e && e.__H && (e.__H.__h.length && (1 !== gn.push(e) && _n === mn.requestAnimationFrame || ((_n = mn.requestAnimationFrame) || Rn)(En)),
        e.__H.__.forEach((function(t) {
            t.i && (t.__H = t.i),
            t.__V !== pn && (t.__ = t.__V),
            t.i = void 0,
            t.__V = pn
        }
        ))),
        un = fn = null
    }
    ,
    mn.__c = function(t, e) {
        e.some((function(t) {
            try {
                t.__h.forEach(In),
                t.__h = t.__h.filter((function(t) {
                    return !t.__ || Pn(t)
                }
                ))
            } catch (n) {
                e.some((function(t) {
                    t.__h && (t.__h = [])
                }
                )),
                e = [],
                mn.__e(n, t.__v)
            }
        }
        )),
        wn && wn(t, e)
    }
    ,
    mn.unmount = function(t) {
        xn && xn(t);
        var e, n = t.__c;
        n && n.__H && (n.__H.__.forEach((function(t) {
            try {
                In(t)
            } catch (t) {
                e = t
            }
        }
        )),
        n.__H = void 0,
        e && mn.__e(e, n.__v))
    }
    ;
    var Tn = "function" == typeof requestAnimationFrame;
    function Rn(t) {
        var e, n = function() {
            clearTimeout(r),
            Tn && cancelAnimationFrame(e),
            setTimeout(t)
        }, r = setTimeout(n, 100);
        Tn && (e = requestAnimationFrame(n))
    }
    function In(t) {
        var e = fn
          , n = t.__c;
        "function" == typeof n && (t.__c = void 0,
        n()),
        fn = e
    }
    function Pn(t) {
        var e = fn;
        t.__c = t.__(),
        fn = e
    }
    function On(t, e) {
        return !t || t.length !== e.length || e.some((function(e, n) {
            return e !== t[n]
        }
        ))
    }
    function Un(t, e) {
        return "function" == typeof e ? e(t) : e
    }
    const Hn = t=>{
        const e = new Date(t)
          , n = e.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        })
          , r = e.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: !0
        });
        return `${n.replace(",", "")}, ${r}`
    }
      , Fn = t=>c(t.content) ? t.content : ""
      , jn = ["#2DC26B", "#F1C40F", "#E03E2D", "#B96AD9", "#3598DB", "#169179", "#E67E23", "#BA372A", "#843FA1", "#236FA1", "#95A5A6", "#7E8C8D", "#34495E"]
      , $n = ()=>{
        const t = Math.floor(de() * jn.length);
        return jn[t]
    }
      , Ln = (t,e,n=36)=>{
        const r = n / 2;
        return `<svg height="${n}" width="${n}" xmlns="http://www.w3.org/2000/svg"><circle cx="${r}" cy="${r}" r="${r}" fill="${e}"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" fill="#FFF" font-family="sans-serif" font-size="${r}">` + (t=>{
            if (Intl.Segmenter)
                return (new Intl.Segmenter).segment(t)[Symbol.iterator]().next().value.segment;
            {
                let e = 0;
                for (; t.charCodeAt(e) > 255 && e < t.length; )
                    e++;
                return e > 0 ? t.slice(0, e) : t[0]
            }
        }
        )(t) + "</text></svg>"
    }
      , Vn = ({children: t, politenessSetting: e="polite", className: n})=>an("div", {
        style: {
            border: 0,
            clip: "rect(0 0 0 0)",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            width: "1px"
        },
        "aria-live": e,
        className: n,
        children: t
    });
    var Bn = function(t, e) {
        var n = {
            __c: e = "__cC" + Re++,
            __: t,
            Consumer: function(t, e) {
                return t.children(e)
            },
            Provider: function(t) {
                var n, r;
                return this.getChildContext || (n = [],
                (r = {})[e] = this,
                this.getChildContext = function() {
                    return r
                }
                ,
                this.shouldComponentUpdate = function(t) {
                    this.props.value !== t.value && n.some((function(t) {
                        t.__e = !0,
                        Ke(t)
                    }
                    ))
                }
                ,
                this.sub = function(t) {
                    n.push(t);
                    var e = t.componentWillUnmount;
                    t.componentWillUnmount = function() {
                        n.splice(n.indexOf(t), 1),
                        e && e.call(t)
                    }
                }
                ),
                t.children
            }
        };
        return n.Provider.__ = n.Consumer.contextType = n
    }(m.none());
    const Kn = (t,e,n)=>((t,e,n)=>{
        let r = t.dom;
        const o = h(n) ? n : g;
        for (; r.parentNode; ) {
            r = r.parentNode;
            const t = O(r);
            if (e(t))
                return m.some(t);
            if (o(t))
                break
        }
        return m.none()
    }
    )(t, (t=>U(t, e)), n)
      , zn = (t,e,n)=>((t,e,n,r,o)=>t(n, r) ? m.some(n) : h(o) && o(n) ? m.none() : e(n, r, o))(((t,e)=>U(t, e)), Kn, t, e, n)
      , Wn = t=>void 0 !== t.style && h(t.style.getPropertyValue)
      , qn = (t,e)=>{
        const n = t.dom
          , r = window.getComputedStyle(n).getPropertyValue(e);
        return "" !== r || bt(t) ? r : Gn(n, e)
    }
      , Gn = (t,e)=>Wn(t) ? t.style.getPropertyValue(e) : ""
      , Xn = (t,e)=>n=>"rtl" === Yn(n) ? e : t
      , Yn = t=>"rtl" === qn(t, "direction") ? "rtl" : "ltr"
      , Zn = t=>(e,n,r)=>{
        const o = t(e);
        return tr(o, e, n, r)
    }
      , Jn = (t,e)=>{
        const n = Xn(t, e);
        return Zn(n)
    }
      , Qn = (t,e)=>{
        const n = Xn(e, t);
        return Zn(n)
    }
      , tr = (t,e,n,r)=>r.focusManager.get(e).bind((n=>t(e, n, r))).map((t=>(r.focusManager.set(e, t),
    !0)))
      , er = t=>!(t=>t.offsetWidth <= 0 && t.offsetHeight <= 0)(t.dom)
      , nr = (t,e,n)=>{
        const r = wt(t, n);
        return ((t,n)=>M(t, (t=>F(t, e))).map((e=>({
            index: e,
            candidates: t
        }))))(k(r, er))
    }
      , rr = (t,e,n,r,o)=>{
        const i = (t,e,n)=>o(t, e, r, 0, n.length - 1, n[e], (e=>{
            return r = n[e],
            "button" === j(r) && "disabled" === ut(r, "disabled") ? i(t, e, n) : m.from(n[e]);
            var r
        }
        ));
        return nr(t, n, e).bind((t=>{
            const e = t.index
              , n = t.candidates;
            return i(e, e, n)
        }
        ))
    }
      , or = (t,e,n,r)=>rr(t, e, n, r, ((t,e,n,r,o,i,s)=>{
        const l = ((t,e,n)=>Math.min(Math.max(t, e), n))(e + n, r, o);
        return l === t ? m.from(i) : s(l)
    }
    ))
      , ir = (t,e,n,r)=>rr(t, e, n, r, ((t,e,n,r,o,i,s)=>{
        const l = ((t,e,n,r)=>{
            const o = t + e;
            return o > r ? n : o < n ? r : o
        }
        )(e, n, r, o);
        return l === t ? m.none() : s(l)
    }
    ))
      , sr = ()=>({
        get: t=>{
            return ((t=(()=>O(document))())=>m.from(t.dom.activeElement).map(O))(vt(e = t)).filter((t=>e.dom.contains(t.dom)));
            var e
        }
        ,
        set: (t,e)=>{
            e.dom.focus(),
            e.dom.dispatchEvent(new window.Event("Focus"))
        }
    });
    var lr;
    !function(t) {
        t.OnFocusMode = "onFocus"
    }(lr || (lr = {}));
    const ar = (t,e)=>({
        matches: t,
        classification: e
    })
      , cr = (t,e,n,r)=>{
        const o = {
            ...t,
            focusManager: sr(),
            focusInside: lr.OnFocusMode,
            focusIn: r
        }
          , i = (t,e,n)=>((t,e)=>{
            const n = C(t, (t=>t.matches(e)));
            return n.map((t=>t.classification))
        }
        )(n(t, e, o), e).bind((n=>n(t, e, o)));
        return {
            handleKeydown: (t,n)=>i(t, n, e).each((t=>{
                n.preventDefault(),
                n.stopPropagation()
            }
            )),
            handleKeyup: (t,e)=>i(t, e, n).each((()=>{
                e.preventDefault(),
                e.stopPropagation()
            }
            )),
            handleFocus: (t,e)=>{
                r(o).each((n=>{
                    n(t, o),
                    e.preventDefault(),
                    e.stopPropagation()
                }
                ))
            }
        }
    }
      , hr = t=>e=>b(t, e.which)
      , fr = [9]
      , ur = [13]
      , _r = [37]
      , dr = [38]
      , gr = [39]
      , pr = [40]
      , mr = [32]
      , vr = (t,e)=>{
        const n = (t,e,n)=>((t,e)=>e.focusManager.get(t).bind((t=>zn(t, e.selector))))(t, n).bind((t=>n.execute(t)))
          , r = (t,e)=>{
            ((t,e)=>((t,e)=>{
                const n = void 0 === e ? document : e.dom;
                return H(n) ? m.none() : m.from(n.querySelector(t)).map(O)
            }
            )(e, t))(t, e.selector).each((n=>{
                e.focusManager.set(t, n)
            }
            ))
        }
          , o = (t,e,n)=>(n.cycles ? ir : or)(t, n.selector, e, -1)
          , i = (t,e,n)=>(n.cycles ? ir : or)(t, n.selector, e, 1)
          , s = t=>(e,n,r)=>t(e, n, r)
          , l = _([])
          , a = cr({
            selector: e,
            execute: t=>(t.dom.dispatchEvent(new window.Event("click")),
            m.some(!0)),
            allowVertical: !0,
            allowHorizontal: !0,
            cycles: !0
        }, ((t,e,r)=>{
            const l = [...r.allowHorizontal ? _r : []].concat(r.allowVertical ? dr : [])
              , a = [...r.allowHorizontal ? gr : []].concat(r.allowVertical ? pr : []);
            return [ar(hr(l), s(Jn(o, i))), ar(hr(a), s(Qn(o, i))), ar(hr(ur), n), ar(hr(mr), n)]
        }
        ), l, (()=>m.some(r)));
        return {
            keydown: e=>a.handleKeydown(t, e),
            keyup: e=>a.handleKeyup(t, e),
            focus: e=>a.handleFocus(t, e)
        }
    }
      , yr = ((t,e)=>{
        const n = e=>{
            const n = (t=>{
                const e = t.dom;
                return bt(t) ? e.getBoundingClientRect().height : e.offsetHeight
            }
            )(e);
            if (n <= 0 || null === n) {
                const n = qn(e, t);
                return parseFloat(n) || 0
            }
            return n
        }
          , r = (t,e)=>S(e, ((e,n)=>{
            const r = qn(t, n)
              , o = void 0 === r ? 0 : parseInt(r, 10);
            return isNaN(o) ? e : e + o
        }
        ), 0);
        return {
            set: (e,n)=>{
                if (!f(n) && !n.match(/^[0-9]+$/))
                    throw new Error(t + ".set accepts only positive integer values. Value was " + n);
                const r = e.dom;
                Wn(r) && (r.style[t] = n + "px")
            }
            ,
            get: n,
            getOuter: n,
            aggregate: r,
            max: (t,e,n)=>{
                const o = r(t, n);
                return e > o ? e - o : 0
            }
        }
    }
    )("height")
      , br = (t,e,n)=>{
        const r = D(t.slice(0, e))
          , o = D(t.slice(e + 1));
        return C(r.concat(o), n)
    }
      , wr = (t,e,n)=>{
        const r = D(t.slice(0, e));
        return C(r, n)
    }
      , xr = (t,e,n)=>{
        const r = t.slice(0, e)
          , o = t.slice(e + 1);
        return C(o.concat(r), n)
    }
      , kr = (t,e,n)=>{
        const r = t.slice(e + 1);
        return C(r, n)
    }
      , Sr = (t,e)=>e.focusManager.get(t).bind((t=>zn(t, e.selector)))
      , Cr = (t,e)=>{
        ((t,e)=>{
            const n = wt(t, e.selector)
              , r = k(n, (t=>(t=>yr.get(t))(t) > 0));
            return m.from(r[e.firstTabstop])
        }
        )(t, e).each((n=>e.focusManager.set(t, n)))
    }
      , Mr = (t,e,n,r)=>{
        const o = wt(t, n.selector);
        return Sr(t, n).bind((e=>M(o, function(t, ...e) {
            return (...n)=>{
                const r = e.concat(n);
                return t.apply(null, r)
            }
        }(F, e)).bind((e=>((t,e,n,r,o)=>o(e, n, (t=>((t,e)=>t.useTabstopAt(e))(r, t))).fold((()=>r.cyclic ? m.some(!0) : m.none()), (e=>(r.focusManager.set(t, e),
        m.some(!0)))))(t, o, e, n, r)))))
    }
      , Dr = (t,e,n)=>{
        const r = n.cyclic ? br : wr;
        return Mr(t, 0, n, r)
    }
      , Ar = (t,e,n)=>{
        const r = n.cyclic ? xr : kr;
        return Mr(t, 0, n, r)
    }
      , Nr = _([ar((Er = [t=>!0 === t.shiftKey, hr(fr)],
    t=>((t,e)=>{
        for (let n = 0, r = t.length; n < r; ++n)
            if (!0 !== e(t[n]))
                return !1;
        return !0
    }
    )(Er, (e=>e(t)))), Dr), ar(hr(fr), Ar)]);
    var Er;
    const Tr = _([ar(hr(fr), ((t,e,n)=>Sr(t, n).filter((t=>!n.useTabstopAt(t))).bind((r=>((t=>X(t).bind(Q).exists((e=>F(e, t))))(r) ? Dr : Ar)(t, e, n)))))])
      , Rr = (t,e)=>{
        const n = cr({
            selector: e,
            firstTabstop: 0,
            useTabstopAt: p,
            cyclic: !0
        }, Nr, Tr, (()=>m.some(Cr)));
        return {
            keydown: e=>n.handleKeydown(t, e),
            keyup: e=>n.handleKeyup(t, e),
            focus: e=>n.handleFocus(t, e)
        }
    }
      , Ir = (t,e,n)=>An((()=>{
        if (t.current) {
            const r = ("tab" === n ? Rr : vr)(O(t.current), e);
            return {
                onKeyUp: r.keyup,
                onKeyDown: r.keydown,
                onFocus: r.focus
            }
        }
        return {
            onKeyDown: u,
            onKeyUp: u,
            onFocus: u
        }
    }
    ), [t.current])
      , Pr = ({items: t})=>{
        const e = Dn(null);
        return an("div", {
            ref: e,
            className: "tox-view__toolbar",
            tabIndex: -1,
            ...Ir(e, ".tox-button:not([disabled])", "flow"),
            children: w(t, ((t,e)=>"title" === t.type ? an("div", {
                className: "tox-view__label tox-view__label--large",
                tabindex: -1,
                children: t.label
            }, e) : an("button", {
                className: "tox-button " + (!0 === t.primary ? "tox-button--primary tox-revisionhistory--align-right" : "tox-button--secondary"),
                onClick: t.onAction,
                type: "button",
                disabled: !0 === t.disabled,
                children: t.label
            }, e)))
        })
    }
      , Or = ({avatar: t, name: e})=>{
        const n = An((()=>m.from(t).filter(ve).getOrThunk((()=>`data:image/svg+xml, ${encodeURIComponent(Ln(e, $n()))}`))), [t, e])
          , [r,o] = Cn(n);
        return Mn((()=>{
            o(n)
        }
        ), [n]),
        an("img", {
            className: "tox-revisionhistory__avatar",
            src: r,
            onError: ()=>{
                o(`data:image/svg+xml, ${encodeURIComponent(Ln(e, $n()))}`)
            }
        })
    }
      , Ur = t=>an("div", {
        className: "tox-revisionhistory__card-author",
        children: [an(Or, {
            ...t
        }), an("span", {
            className: "tox-revisionhistory__card-author-name",
            "aria-label": t.name,
            children: t.name
        })]
    })
      , Hr = ()=>{
        const t = Nn(Bn);
        return an("img", {
            className: "tox-revisionhistory__card-check-icon",
            src: An((()=>t.map((t=>{
                return e = t.editor,
                m.from(e.ui.registry.getAll().icons.checkmark).fold(_(""), (t=>{
                    let e = t;
                    return ((t,e,n=0,r)=>{
                        const o = t.indexOf(e, n);
                        return -1 !== o && (!!l(r) || o + e.length <= r)
                    }
                    )(t, "xmlns") || (e = t.replace("svg", 'svg xmlns="http://www.w3.org/2000/svg"')),
                    `data:image/svg+xml, ${encodeURIComponent(e)}`
                }
                ));
                var e
            }
            )).getOr("")), [t])
        })
    }
      , Fr = ({revision: t, isSelected: e, onSelect: n, showAuthor: r})=>{
        const o = Hn(t.createdAt)
          , i = tinymce.i18n.translate(["Revision on {0}", o])
          , s = An((()=>{
            const e = m.from(t.author).getOr({
                id: "anonymous"
            });
            return {
                ...e,
                name: c(e.name) && ve(e.name) ? e.name : tinymce.i18n.translate("Anonymous")
            }
        }
        ), [t]);
        return an("div", {
            role: "listitem",
            children: an("div", {
                "aria-pressed": e,
                className: "tox-revisionhistory__card " + (e ? "tox-revisionhistory__card--selected" : ""),
                tabIndex: -1,
                onClick: n,
                "aria-label": i,
                role: "button",
                children: [an("div", {
                    children: [t.internalType && an("span", {
                        className: "tox-label tox-revisionhistory__card-label",
                        children: tinymce.i18n.translate(t.internalType.toUpperCase())
                    }), an("div", {
                        className: "tox-revisionhistory__card-date",
                        children: [an("span", {
                            className: "tox-revisionhistory__card-date-label",
                            children: o
                        }), e && an(Hr, {})]
                    })]
                }), r && an(Ur, {
                    ...s
                })]
            })
        })
    }
      , jr = ({revisions: t, onRevisionSelected: e})=>{
        const [n,r] = Cn("")
          , o = [".tox-revisionhistory__card", ".tox-revisionhistory__norevision"].join(", ")
          , i = Dn(null)
          , s = Ir(i, o, "flow")
          , l = tinymce.i18n.translate("No revisions")
          , a = tinymce.i18n.translate("Revision History")
          , h = Nn(Bn).map((t=>he(t.editor))).getOr(!1)
          , f = t=>{
            r(t),
            e(t)
        }
        ;
        return Mn((()=>{
            c(t) && !n && N(t, 0).each((t=>f(t.revisionId)))
        }
        ), [t]),
        an("div", {
            className: "tox-revisionhistory__sidebar",
            tabIndex: -1,
            children: [an("h1", {
                className: "tox-revisionhistory__sidebar-title",
                children: a
            }), an("div", {
                role: "list",
                ref: i,
                className: "tox-revisionhistory__revisions",
                tabIndex: -1,
                ...s,
                children: c(t) ? 0 === t.length ? an("div", {
                    role: "listitem",
                    className: "tox-revisionhistory__norevision",
                    children: l
                }) : w(t, ((t,e)=>an(Fr, {
                    showAuthor: h,
                    isSelected: t.revisionId === n,
                    revision: t,
                    onSelect: ()=>f(t.revisionId)
                }, e))) : null
            })]
        })
    }
      , $r = ({restore: t, goBack: e, getRevisions: n, getRevision: r, editor: o})=>{
        const i = Dn(null)
          , s = [".tox-view__toolbar", ".tox-revisionhistory__revisions"].join(", ")
          , [l,h] = Cn(m.none())
          , f = Ir(i, s, "tab")
          , [u,d] = Cn("")
          , [g,p] = Cn("")
          , [v,y] = Cn(!1)
          , b = tinymce.i18n.translate("Restore this version")
          , k = tinymce.i18n.translate("Revision History")
          , C = tinymce.i18n.translate("Close")
          , D = l.fold(_(k), (({createdAt: t})=>Hn(t)))
          , [A,N] = Cn()
          , E = async t=>{
            if (c(A)) {
                o.setProgressState(!0);
                const e = await (async(t,e,n)=>{
                    const r = [];
                    return M(e, (e=>e.revisionId === t)).each((t=>{
                        r.push(e[t]),
                        t <= e.length - 2 && r.push(e[t + 1])
                    }
                    )),
                    await Promise.all(w(r, n))
                }
                )(t, A, r);
                if (o.removed || o.setProgressState(!1),
                e.length > 0 && !o.removed) {
                    let t = "";
                    const [n,r] = e
                      , i = Fn(n);
                    t = c(r) ? it(te(Fn(r), i, ae(o))) : i,
                    (t=>{
                        if (A && t.length > 0) {
                            const e = ((t,e,n)=>{
                                const r = [...t];
                                return x(e, (t=>{
                                    t && M(r, (e=>((t,e)=>t.revisionId === e.revisionId)(t, e))).each((e=>{
                                        r[e] = t
                                    }
                                    ))
                                }
                                )),
                                r
                            }
                            )(A, t);
                            N(e)
                        }
                    }
                    )(e),
                    h(m.some(n)),
                    d(((t,e)=>{
                        const n = le(e)
                          , r = ((t,e)=>{
                            return o = e,
                            n = t.parser.parse(o, {
                                insert: !0
                            }),
                            r = t.schema,
                            tinymce.html.Serializer({
                                validate: !0
                            }, r).serialize(n);
                            var n, r, o
                        }
                        )(e, t)
                          , o = m.from(ue(e)).map((t=>`<style type="text/css">${t}</style>`)).getOr("")
                          , i = xt(_e(e), ' crossorigin="anonymous"').getOr("")
                          , s = `<link type="text/css" rel="stylesheet" href="${n}"/>`
                          , l = S(e.contentCSS, ((t,n)=>`${t}<link type="text/css" rel="stylesheet" href="${e.documentBaseURI.toAbsolute(n)}"${i}>`), "")
                          , a = e.dom.encode
                          , c = m.from(fe(e)).map((t=>` class="${a(t)}"`)).getOr("")
                          , h = m.from(e.getBody()).map((t=>a(t.dir))).bind((t=>xt("" !== t, ` dir="${t}"`))).getOr("")
                          , f = tinymce.Env.os
                          , u = '<script>document.addEventListener && document.addEventListener("click", function(e) {for (var elm = e.target; elm; elm = elm.parentNode) {if (elm.nodeName === "A" && !(' + (f.isMacOS() || f.isiOS() ? "e.metaKey" : "e.ctrlKey && !e.altKey") + ")) {e.preventDefault();}}}, false);<\/script> ";
                        return `<!DOCTYPE html><html><head><base href="${a(e.documentBaseURI.getURI())}">` + l + o + "<style>table, table td, table th, table caption { border: 1px dashed #bbb }</style>" + s + u + "</head>" + `<body${c}${h}>` + r + "</body></html>"
                    }
                    )(t, o));
                    const s = a(r) ? tinymce.i18n.translate(["Showing the initial version on {0}", Hn(n.createdAt)]) : tinymce.i18n.translate(["Comparing revision on {0} to the previous version", Hn(n.createdAt)]);
                    p(s)
                }
            }
        }
        ;
        return Mn((()=>{
            (async()=>{
                o.setProgressState(!0);
                const t = await n().finally((()=>o.setProgressState(!1)));
                N(t)
            }
            )()
        }
        ), []),
        Mn((()=>{
            !v && c(i.current) && c(A) && (A.length > 0 && l.isSome() || 0 === A.length) && (i.current.dispatchEvent(new window.Event("focus")),
            y(!0))
        }
        ), [i.current, l, A]),
        an("div", {
            ref: i,
            ...f,
            className: "tox-revisionhistory__container",
            children: an(Bn.Provider, {
                value: m.some({
                    editor: o
                }),
                children: [an(Pr, {
                    items: [{
                        type: "title",
                        label: D
                    }, {
                        type: "button",
                        label: b,
                        disabled: l.forall((t=>"draft" === t.internalType || "initial" === t.internalType)),
                        primary: !0,
                        onAction: ()=>l.each((({content: e, revisionId: n})=>{
                            t(e),
                            ((t,e)=>{
                                t.dispatch("VersionRestored", {
                                    revisionId: e
                                })
                            }
                            )(o, n)
                        }
                        ))
                    }, {
                        type: "button",
                        label: C,
                        onAction: e
                    }]
                }), an("div", {
                    className: "tox-revisionhistory",
                    children: [an("iframe", {
                        className: "tox-revisionhistory__iframe",
                        srcDoc: u
                    }), an(jr, {
                        onRevisionSelected: t=>{
                            E(t)
                        }
                        ,
                        revisions: A
                    })]
                }), an(Vn, {
                    children: g
                })]
            })
        })
    }
      , Lr = (t,e)=>{
        const n = me((t=>t.destroy()));
        t.ui.registry.addView("revision", {
            onShow: r=>{
                const o = ()=>{
                    return t = r.getContainer(),
                    cn(O(t), ["tox-revisionhistory__pane"]),
                    void sn(null, t);
                    var t
                }
                ;
                var i, s, l;
                t.on("remove", o),
                n.set({
                    destroy: ()=>{
                        o(),
                        t.off("remove", o)
                    }
                }),
                i = r.getContainer(),
                s = {
                    restore: e=>{
                        c(e) && t.setContent(e),
                        t.execCommand("ToggleView", !1, "revision")
                    }
                    ,
                    goBack: ()=>{
                        t.execCommand("ToggleView", !1, "revision")
                    }
                    ,
                    ...e,
                    editor: t
                },
                l = O(i),
                x(["tox-revisionhistory__pane"], (t=>{
                    Ct(l, t)
                }
                )),
                sn(an($r, {
                    ...s
                }), i)
            }
            ,
            onHide: ()=>{
                t.mode.set("design"),
                n.clear()
            }
        })
    }
    ;
    tinymce.PluginManager.requireLangPack("revisionhistory", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("revisionhistory", ((t,n)=>{
        if (!((t,n)=>!!t && -1 === ((t,n)=>{
            const r = e(t.major, n.major);
            if (0 !== r)
                return r;
            const o = e(t.minor, n.minor);
            if (0 !== o)
                return o;
            const i = e(t.patch, n.patch);
            return 0 !== i ? i : 0
        }
        )((t=>r((t=>[t.majorVersion, t.minorVersion].join(".").split(".").slice(0, 3).join("."))(t)))(t), r(n)))(tinymce, "7.0.0"))
            return ((t,e)=>{
                ((t,e)=>{
                    const n = t.options.register;
                    n("revisionhistory_fetch", {
                        processor: "function"
                    }),
                    n("revisionhistory_fetch_revision", {
                        processor: "function"
                    }),
                    n("revisionhistory_css_url", {
                        processor: "string",
                        default: e + "/css/revisionhistory.css"
                    }),
                    n("revisionhistory_diff_classes", {
                        processor: "object"
                    }),
                    n("revisionhistory_author", {
                        processor: "object",
                        default: {
                            name: "Anonymous"
                        }
                    }),
                    n("revisionhistory_display_author", {
                        processor: "boolean",
                        default: !1
                    })
                }
                )(t, e);
                const {getRevision: n, getRevisions: r} = (t=>{
                    const e = (()=>{
                        const t = me(u);
                        return {
                            ...t,
                            on: e=>t.get().each(e)
                        }
                    }
                    )()
                      , n = oe(t);
                    return t.on("LoadContent", (()=>{
                        e.set(we(t, "initial"))
                    }
                    )),
                    {
                        getRevisions: async()=>{
                            const r = []
                              , o = (t,e=!0)=>{
                                const n = e ? T : E;
                                c(t.content) && ve(t.content) && n(r).forall((e=>e.content !== t.content)) && (e ? r.push(t) : r.unshift(t))
                            }
                              , i = we(t, "draft");
                            try {
                                const s = await n();
                                0 === s.length ? (o(i),
                                e.get().each(o)) : (x(s, (e=>{
                                    r.push({
                                        ...e,
                                        ...c(e.content) ? {
                                            content: ye(t, e.content)
                                        } : {}
                                    })
                                }
                                )),
                                o(i, !1))
                            } catch (e) {
                                t.notificationManager.open({
                                    text: "An error occurred fetching revisions.",
                                    type: "error"
                                }),
                                console.error(e)
                            }
                            return r
                        }
                        ,
                        getRevision: async e=>new Promise((n=>se(t).fold((()=>{
                            n(e)
                        }
                        ), (r=>{
                            a(e.content) ? r(t, e).then((e=>{
                                const r = c(e.content) && ve(e.content) ? ye(t, e.content) : e.content
                                  , o = {
                                    ...e,
                                    content: r
                                };
                                n(o)
                            }
                            )).catch((r=>{
                                t.removed || (t.notificationManager.open({
                                    text: "An error occurred fetching the updated revision.",
                                    type: "error"
                                }),
                                console.error(r)),
                                n(e)
                            }
                            )) : n(e)
                        }
                        ))))
                    }
                }
                )(t);
                (t=>{
                    t.addCommand("revisionHistory", (()=>{
                        t.inline || ("revision" === t.mode.get() ? t.mode.set("design") : (t.mode.set("revision"),
                        (t=>{
                            t.dispatch("RevisionHistoryOpen")
                        }
                        )(t)))
                    }
                    ))
                }
                )(t),
                (t=>{
                    const e = "revision-history"
                      , n = "Revision history"
                      , r = ()=>t.execCommand("revisionHistory");
                    t.ui.registry.addButton("revisionhistory", {
                        icon: e,
                        tooltip: n,
                        onAction: r
                    }),
                    t.ui.registry.addMenuItem("revisionhistory", {
                        icon: e,
                        text: n,
                        onAction: r
                    })
                }
                )(t),
                (t=>{
                    t.mode.register("revision", {
                        activate: ()=>{
                            "revision" !== t.queryCommandValue("ToggleView") && t.execCommand("ToggleView", !1, "revision")
                        }
                        ,
                        deactivate: ()=>{
                            "revision" === t.queryCommandValue("ToggleView") && t.execCommand("ToggleView", !1, "revision")
                        }
                        ,
                        editorReadOnly: !1
                    })
                }
                )(t),
                Lr(t, {
                    getRevisions: r,
                    getRevision: n
                })
            }
            )(t, n),
            (t=>({
                diff: (e,n)=>{
                    const r = ae(t);
                    return it(te(e, n, r))
                }
            }))(t);
        console.error("The revisionhistory plugin requires at least version 7.0 of TinyMCE.")
    }
    ))
}();
