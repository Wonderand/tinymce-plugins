/*!
 * Tiny Enhanced Tables plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 7.3.0-86
 */

!function() {
    "use strict";
    const e = e=>parseInt(e, 10)
      , t = (e,t)=>{
        const o = e - t;
        return 0 === o ? 0 : o > 0 ? 1 : -1
    }
      , o = (e,t,o)=>({
        major: e,
        minor: t,
        patch: o
    })
      , n = t=>{
        const n = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t);
        return n ? o(e(n[1]), e(n[2]), e(n[3])) : o(0, 0, 0)
    }
      , r = e=>t=>(e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (o = n = e,
        (r = String).prototype.isPrototypeOf(o) || (null === (s = n.constructor) || void 0 === s ? void 0 : s.name) === r.name) ? "string" : t;
        var o, n, r, s
    }
    )(t) === e
      , s = e=>t=>typeof t === e
      , l = e=>t=>e === t
      , c = r("string")
      , i = r("object")
      , a = r("array")
      , m = l(null)
      , u = s("boolean")
      , d = l(void 0)
      , h = e=>null == e
      , p = e=>!h(e)
      , g = s("function")
      , f = s("number");
    class w {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new w(!0,e)
        }
        static none() {
            return w.singletonNone
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
            return this.tag ? w.some(e(this.value)) : w.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : w.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : w.none()
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
            return p(e) ? w.some(e) : w.none()
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
    w.singletonNone = new w(!1);
    const b = ()=>{}
      , v = e=>()=>e
      , y = e=>e
      , C = (e,t)=>e === t;
    function x(e, ...t) {
        return (...o)=>{
            const n = t.concat(o);
            return e.apply(null, n)
        }
    }
    const S = v(!1)
      , T = v(!0)
      , R = Array.prototype.slice
      , D = Array.prototype.indexOf
      , O = Array.prototype.push
      , A = (e,t)=>{
        return o = e,
        n = t,
        D.call(o, n) > -1;
        var o, n
    }
      , E = (e,t)=>{
        for (let o = 0, n = e.length; o < n; o++)
            if (t(e[o], o))
                return !0;
        return !1
    }
      , k = (e,t)=>{
        const o = [];
        for (let n = 0; n < e; n++)
            o.push(t(n));
        return o
    }
      , N = (e,t)=>{
        const o = e.length
          , n = new Array(o);
        for (let r = 0; r < o; r++) {
            const o = e[r];
            n[r] = t(o, r)
        }
        return n
    }
      , W = (e,t)=>{
        for (let o = 0, n = e.length; o < n; o++)
            t(e[o], o)
    }
      , L = (e,t)=>{
        const o = []
          , n = [];
        for (let r = 0, s = e.length; r < s; r++) {
            const s = e[r];
            (t(s, r) ? o : n).push(s)
        }
        return {
            pass: o,
            fail: n
        }
    }
      , M = (e,t)=>{
        const o = [];
        for (let n = 0, r = e.length; n < r; n++) {
            const r = e[n];
            t(r, n) && o.push(r)
        }
        return o
    }
      , j = (e,t)=>{
        if (0 === e.length)
            return [];
        {
            let o = t(e[0]);
            const n = [];
            let r = [];
            for (let s = 0, l = e.length; s < l; s++) {
                const l = e[s]
                  , c = t(l);
                c !== o && (n.push(r),
                r = []),
                o = c,
                r.push(l)
            }
            return 0 !== r.length && n.push(r),
            n
        }
    }
      , B = (e,t,o)=>(((e,t)=>{
        for (let o = e.length - 1; o >= 0; o--)
            t(e[o], o)
    }
    )(e, ((e,n)=>{
        o = t(o, e, n)
    }
    )),
    o)
      , I = (e,t,o)=>(W(e, ((e,n)=>{
        o = t(o, e, n)
    }
    )),
    o)
      , P = (e,t)=>((e,t,o)=>{
        for (let n = 0, r = e.length; n < r; n++) {
            const r = e[n];
            if (t(r, n))
                return w.some(r);
            if (o(r, n))
                break
        }
        return w.none()
    }
    )(e, t, S)
      , z = (e,t)=>(e=>{
        const t = [];
        for (let o = 0, n = e.length; o < n; ++o) {
            if (!a(e[o]))
                throw new Error("Arr.flatten item " + o + " was not an array, input: " + e);
            O.apply(t, e[o])
        }
        return t
    }
    )(N(e, t))
      , _ = (e,t)=>{
        for (let o = 0, n = e.length; o < n; ++o)
            if (!0 !== t(e[o], o))
                return !1;
        return !0
    }
      , F = (e,t)=>{
        const o = R.call(e, 0);
        return o.sort(t),
        o
    }
      , $ = (e,t)=>t >= 0 && t < e.length ? w.some(e[t]) : w.none()
      , V = e=>$(e, 0)
      , G = e=>$(e, e.length - 1)
      , q = (e,t)=>{
        for (let o = 0; o < e.length; o++) {
            const n = t(e[o], o);
            if (n.isSome())
                return n
        }
        return w.none()
    }
      , H = (e,t,o=C)=>e.exists((e=>o(e, t)))
      , U = (e,t,o)=>e.isSome() && t.isSome() ? w.some(o(e.getOrDie(), t.getOrDie())) : w.none()
      , K = e=>e.bind(y)
      , Q = (e,t)=>e ? w.some(t) : w.none()
      , X = e=>{
        if (null == e)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: e
        }
    }
      , Y = {
        fromHtml: (e,t)=>{
            const o = (t || document).createElement("div");
            if (o.innerHTML = e,
            !o.hasChildNodes() || o.childNodes.length > 1) {
                const t = "HTML does not have a single root node";
                throw console.error(t, e),
                new Error(t)
            }
            return X(o.childNodes[0])
        }
        ,
        fromTag: (e,t)=>{
            const o = (t || document).createElement(e);
            return X(o)
        }
        ,
        fromText: (e,t)=>{
            const o = (t || document).createTextNode(e);
            return X(o)
        }
        ,
        fromDom: X,
        fromPoint: (e,t,o)=>w.from(e.dom.elementFromPoint(t, o)).map(X)
    }
      , J = "undefined" != typeof window ? window : Function("return this;")()
      , Z = (e,t)=>((e,t)=>{
        let o = null != t ? t : J;
        for (let t = 0; t < e.length && null != o; ++t)
            o = o[e[t]];
        return o
    }
    )(e.split("."), t)
      , ee = Object.getPrototypeOf
      , te = e=>{
        const t = Z("ownerDocument.defaultView", e);
        return i(e) && ((e=>((e,t)=>{
            const o = ((e,t)=>Z(e, t))(e, t);
            if (null == o)
                throw new Error(e + " not available on this browser");
            return o
        }
        )("HTMLElement", e))(t).prototype.isPrototypeOf(e) || /^HTML\w*Element$/.test(ee(e).constructor.name))
    }
      , oe = e=>e.dom.nodeName.toLowerCase()
      , ne = e=>e.dom.nodeType
      , re = e=>t=>ne(t) === e
      , se = e=>8 === ne(e) || "#comment" === oe(e)
      , le = re(1)
      , ce = re(3)
      , ie = re(9)
      , ae = re(11)
      , me = e=>t=>le(t) && oe(t) === e
      , ue = (e,t)=>{
        const o = e.dom;
        if (1 !== o.nodeType)
            return !1;
        {
            const e = o;
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
      , de = e=>1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType || 0 === e.childElementCount
      , he = (e,t)=>e.dom === t.dom
      , pe = ue
      , ge = e=>Y.fromDom(e.dom.ownerDocument)
      , fe = e=>w.from(e.dom.parentNode).map(Y.fromDom)
      , we = (e,t)=>{
        const o = g(t) ? t : S;
        let n = e.dom;
        const r = [];
        for (; null !== n.parentNode && void 0 !== n.parentNode; ) {
            const e = n.parentNode
              , t = Y.fromDom(e);
            if (r.push(t),
            !0 === o(t))
                break;
            n = e
        }
        return r
    }
      , be = e=>w.from(e.dom.previousSibling).map(Y.fromDom)
      , ve = e=>w.from(e.dom.nextSibling).map(Y.fromDom)
      , ye = e=>N(e.dom.childNodes, Y.fromDom)
      , Ce = e=>Y.fromDom(e.dom.host)
      , xe = e=>{
        const t = ce(e) ? e.dom.parentNode : e.dom;
        if (null == t || null === t.ownerDocument)
            return !1;
        const o = t.ownerDocument;
        return (e=>{
            const t = (e=>Y.fromDom(e.dom.getRootNode()))(e);
            return ae(o = t) && p(o.dom.host) ? w.some(t) : w.none();
            var o
        }
        )(Y.fromDom(t)).fold((()=>o.body.contains(t)), (n = xe,
        r = Ce,
        e=>n(r(e))));
        var n, r
    }
      , Se = (e,t)=>{
        let o = [];
        return W(ye(e), (e=>{
            t(e) && (o = o.concat([e])),
            o = o.concat(Se(e, t))
        }
        )),
        o
    }
      , Te = (e,t,o)=>((e,o,n)=>M(we(e, n), (e=>ue(e, t))))(e, 0, o)
      , Re = (e,t)=>((e,o)=>M(ye(e), (e=>ue(e, t))))(e)
      , De = (e,t)=>((e,t)=>{
        const o = void 0 === t ? document : t.dom;
        return de(o) ? [] : N(o.querySelectorAll(e), Y.fromDom)
    }
    )(t, e)
      , Oe = (e,t,o)=>{
        let n = e.dom;
        const r = g(o) ? o : S;
        for (; n.parentNode; ) {
            n = n.parentNode;
            const e = Y.fromDom(n);
            if (t(e))
                return w.some(e);
            if (r(e))
                break
        }
        return w.none()
    }
      , Ae = (e,t,o)=>Oe(e, (e=>ue(e, t)), o)
      , Ee = (e,t)=>((e,o)=>P(e.dom.childNodes, (e=>{
        return o = Y.fromDom(e),
        ue(o, t);
        var o
    }
    )).map(Y.fromDom))(e)
      , ke = (e,t)=>((e,t)=>{
        const o = void 0 === t ? document : t.dom;
        return de(o) ? w.none() : w.from(o.querySelector(e)).map(Y.fromDom)
    }
    )(t, e)
      , Ne = (e,t,o)=>((e,t,o,n,r)=>((e,t)=>ue(e, t))(o, n) ? w.some(o) : g(r) && r(o) ? w.none() : t(o, n, r))(0, Ae, e, t, o)
      , We = Object.keys
      , Le = Object.hasOwnProperty
      , Me = (e,t)=>{
        const o = We(e);
        for (let n = 0, r = o.length; n < r; n++) {
            const r = o[n];
            t(e[r], r)
        }
    }
      , je = (e,t)=>{
        const o = [];
        return Me(e, ((e,n)=>{
            o.push(t(e, n))
        }
        )),
        o
    }
      , Be = e=>je(e, y)
      , Ie = e=>We(e).length
      , Pe = (e,t)=>ze(e, t) ? w.from(e[t]) : w.none()
      , ze = (e,t)=>Le.call(e, t)
      , _e = e=>{
        for (const t in e)
            if (Le.call(e, t))
                return !1;
        return !0
    }
      , Fe = (e,t,o)=>{
        if (!(c(o) || u(o) || f(o)))
            throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", o, ":: Element ", e),
            new Error("Attribute value was not simple");
        e.setAttribute(t, o + "")
    }
      , $e = (e,t,o)=>{
        Fe(e.dom, t, o)
    }
      , Ve = (e,t)=>{
        const o = e.dom;
        Me(t, ((e,t)=>{
            Fe(o, t, e)
        }
        ))
    }
      , Ge = (e,t)=>{
        const o = e.dom.getAttribute(t);
        return null === o ? void 0 : o
    }
      , qe = (e,t)=>w.from(Ge(e, t))
      , He = (e,t)=>{
        e.dom.removeAttribute(t)
    }
      , Ue = e=>I(e.dom.attributes, ((e,t)=>(e[t.name] = t.value,
    e)), {})
      , Ke = (e,t,o=0,n)=>{
        const r = e.indexOf(t, o);
        return -1 !== r && (!!d(n) || r + t.length <= n)
    }
      , Qe = (e=>t=>t.replace(e, ""))(/^\s+|\s+$/g)
      , Xe = e=>!(e=>e.length > 0)(e)
      , Ye = e=>void 0 !== e.style && g(e.style.getPropertyValue)
      , Je = (e,t,o)=>{
        ((e,t,o)=>{
            if (!c(o))
                throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", o, ":: Element ", e),
                new Error("CSS value must be a string: " + o);
            Ye(e) && e.style.setProperty(t, o)
        }
        )(e.dom, t, o)
    }
      , Ze = (e,t)=>{
        const o = e.dom
          , n = window.getComputedStyle(o).getPropertyValue(t);
        return "" !== n || xe(e) ? n : et(o, t)
    }
      , et = (e,t)=>Ye(e) ? e.style.getPropertyValue(t) : ""
      , tt = (e,t)=>{
        const o = e.dom
          , n = et(o, t);
        return w.from(n).filter((e=>e.length > 0))
    }
      , ot = (e,t)=>{
        ((e,t)=>{
            Ye(e) && e.style.removeProperty(t)
        }
        )(e.dom, t),
        H(qe(e, "style").map(Qe), "") && He(e, "style")
    }
      , nt = (e,t,o=0)=>qe(e, t).map((e=>parseInt(e, 10))).getOr(o)
      , rt = e=>me("col")(e) ? nt(e, "span", 1) > 1 : ((e,t)=>nt(e, "colspan", 1))(e) > 1
      , st = v(10)
      , lt = (e,t)=>ct(e, t, T)
      , ct = (e,t,o)=>z(ye(e), (e=>ue(e, t) ? o(e) ? [e] : [] : ct(e, t, o)))
      , it = ["tfoot", "thead", "tbody", "colgroup"]
      , at = (e,t,o)=>({
        element: e,
        rowspan: t,
        colspan: o
    })
      , mt = (e,t,o)=>({
        element: e,
        cells: t,
        section: o
    })
      , ut = (e,t,o)=>({
        element: e,
        isNew: t,
        isLocked: o
    })
      , dt = (e,t,o,n)=>({
        element: e,
        cells: t,
        section: o,
        isNew: n
    })
      , ht = (e,t)=>((e,t,o=S)=>o(t) ? w.none() : A(e, oe(t)) ? w.some(t) : Ae(t, e.join(","), (e=>ue(e, "table") || o(e))))(["td", "th"], e, t)
      , pt = e=>lt(e, "th,td")
      , gt = e=>ue(e, "colgroup") ? Re(e, "col") : z(bt(e), (e=>Re(e, "col")))
      , ft = (e,t)=>Ne(e, "table", t)
      , wt = e=>lt(e, "tr")
      , bt = e=>ft(e).fold(v([]), (e=>Re(e, "colgroup")))
      , vt = e=>fe(e).map((e=>{
        const t = oe(e);
        return (e=>A(it, e))(t) ? t : "tbody"
    }
    )).getOr("tbody")
      , yt = (e,t)=>dt(e.element, t, e.section, e.isNew)
      , Ct = (e,t)=>e.cells[t]
      , xt = (e,t)=>Ct(e, t).element
      , St = e=>{
        const t = L(e, (e=>"colgroup" === e.section));
        return {
            rows: t.fail,
            cols: t.pass
        }
    }
      , Tt = "data-snooker-locked-cols"
      , Rt = e=>qe(e, Tt).bind((e=>w.from(e.match(/\d+/g)))).map((e=>((e,t)=>{
        const o = {};
        for (let n = 0, r = e.length; n < r; n++) {
            const r = e[n];
            o[String(r)] = t(r, n)
        }
        return o
    }
    )(e, T)))
      , Dt = (e,t)=>e + "," + t
      , Ot = e=>{
        const t = {}
          , o = []
          , n = V(e).map((e=>e.element)).bind(ft).bind(Rt).getOr({});
        let r = 0
          , s = 0
          , l = 0;
        const {pass: c, fail: i} = L(e, (e=>"colgroup" === e.section));
        W(i, (e=>{
            const c = [];
            W(e.cells, (e=>{
                let o = 0;
                for (; void 0 !== t[Dt(l, o)]; )
                    o++;
                const r = ((e,t)=>ze(e, t) && void 0 !== e[t] && null !== e[t])(n, o.toString())
                  , i = ((e,t,o,n,r,s)=>({
                    element: e,
                    rowspan: t,
                    colspan: o,
                    row: n,
                    column: r,
                    isLocked: s
                }))(e.element, e.rowspan, e.colspan, l, o, r);
                for (let n = 0; n < e.colspan; n++)
                    for (let r = 0; r < e.rowspan; r++) {
                        const e = o + n
                          , c = Dt(l + r, e);
                        t[c] = i,
                        s = Math.max(s, e + 1)
                    }
                c.push(i)
            }
            )),
            r++,
            o.push(mt(e.element, c, e.section)),
            l++
        }
        ));
        const {columns: a, colgroups: m} = G(c).map((e=>{
            const t = (e=>{
                const t = {};
                let o = 0;
                return W(e.cells, (e=>{
                    const n = e.colspan;
                    k(n, (r=>{
                        const s = o + r;
                        t[s] = ((e,t,o)=>({
                            element: e,
                            colspan: t,
                            column: o
                        }))(e.element, n, s)
                    }
                    )),
                    o += n
                }
                )),
                t
            }
            )(e)
              , o = ((e,t)=>({
                element: e,
                columns: t
            }))(e.element, Be(t));
            return {
                colgroups: [o],
                columns: t
            }
        }
        )).getOrThunk((()=>({
            colgroups: [],
            columns: {}
        })))
          , u = ((e,t)=>({
            rows: e,
            columns: t
        }))(r, s);
        return {
            grid: u,
            access: t,
            all: o,
            columns: a,
            colgroups: m
        }
    }
      , At = e=>{
        const t = (e=>{
            const t = wt(e);
            return o = [...bt(e), ...t],
            n = vt,
            N(o, (e=>{
                if ("colgroup" === oe(e)) {
                    const t = N(gt(e), (e=>{
                        const t = nt(e, "span", 1);
                        return at(e, 1, t)
                    }
                    ));
                    return mt(e, t, "colgroup")
                }
                {
                    const t = N(pt(e), (e=>{
                        const t = nt(e, "rowspan", 1)
                          , o = nt(e, "colspan", 1);
                        return at(e, t, o)
                    }
                    ));
                    return mt(e, t, n(e))
                }
            }
            ));
            var o, n
        }
        )(e);
        return Ot(t)
    }
      , Et = Ot
      , kt = (e,t,o)=>w.from(e.access[Dt(t, o)])
      , Nt = (e,t,o)=>{
        const n = ((e,t)=>{
            const o = z(e.all, (e=>e.cells));
            return M(o, t)
        }
        )(e, (e=>o(t, e.element)));
        return n.length > 0 ? w.some(n[0]) : w.none()
    }
      , Wt = e=>Be(e.columns)
      , Lt = e=>We(e.columns).length > 0
      , Mt = (e,t)=>w.from(e.columns[t])
      , jt = e=>Y.fromDom(e.getBody())
      , Bt = e=>t=>he(t, jt(e))
      , It = e=>Y.fromDom(e.selection.getStart())
      , Pt = (e,t)=>t.column >= e.startCol && t.column + t.colspan - 1 <= e.finishCol && t.row >= e.startRow && t.row + t.rowspan - 1 <= e.finishRow
      , zt = (e,t,o)=>((e,t,o)=>{
        const n = Nt(e, t, he)
          , r = Nt(e, o, he);
        return n.bind((e=>r.map((t=>{
            return o = e,
            n = t,
            {
                startRow: Math.min(o.row, n.row),
                startCol: Math.min(o.column, n.column),
                finishRow: Math.max(o.row + o.rowspan - 1, n.row + n.rowspan - 1),
                finishCol: Math.max(o.column + o.colspan - 1, n.column + n.colspan - 1)
            };
            var o, n
        }
        ))))
    }
    )(e, t, o).bind((t=>((e,t)=>{
        let o = !0;
        const n = x(Pt, t);
        for (let r = t.startRow; r <= t.finishRow; r++)
            for (let s = t.startCol; s <= t.finishCol; s++)
                o = o && kt(e, r, s).exists(n);
        return o ? w.some(t) : w.none()
    }
    )(e, t)))
      , _t = (e,t,o)=>{
        const n = Ft(e);
        return zt(n, t, o)
    }
      , Ft = At
      , $t = (e,t)=>{
        fe(e).each((o=>{
            o.dom.insertBefore(t.dom, e.dom)
        }
        ))
    }
      , Vt = (e,t)=>{
        ve(e).fold((()=>{
            fe(e).each((e=>{
                qt(e, t)
            }
            ))
        }
        ), (e=>{
            $t(e, t)
        }
        ))
    }
      , Gt = (e,t)=>{
        (e=>((e,t)=>{
            const o = e.dom.childNodes;
            return w.from(o[0]).map(Y.fromDom)
        }
        )(e))(e).fold((()=>{
            qt(e, t)
        }
        ), (o=>{
            e.dom.insertBefore(t.dom, o.dom)
        }
        ))
    }
      , qt = (e,t)=>{
        e.dom.appendChild(t.dom)
    }
      , Ht = (e,t)=>{
        $t(e, t),
        qt(t, e)
    }
      , Ut = (e,t)=>{
        W(t, ((o,n)=>{
            const r = 0 === n ? e : t[n - 1];
            Vt(r, o)
        }
        ))
    }
      , Kt = (e,t)=>{
        W(t, (t=>{
            qt(e, t)
        }
        ))
    }
      , Qt = e=>{
        e.dom.textContent = "",
        W(ye(e), (e=>{
            Xt(e)
        }
        ))
    }
      , Xt = e=>{
        const t = e.dom;
        null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , Yt = e=>{
        const t = ye(e);
        t.length > 0 && Ut(e, t),
        Xt(e)
    }
      , Jt = ((e,t)=>{
        const o = t=>e(t) ? w.from(t.dom.nodeValue) : w.none();
        return {
            get: t=>{
                if (!e(t))
                    throw new Error("Can only get text value of a text node");
                return o(t).getOr("")
            }
            ,
            getOption: o,
            set: (t,o)=>{
                if (!e(t))
                    throw new Error("Can only set raw text value of a text node");
                t.dom.nodeValue = o
            }
        }
    }
    )(ce)
      , Zt = e=>Jt.get(e)
      , eo = (e,t)=>Jt.set(e, t);
    var to = ["body", "p", "div", "article", "aside", "figcaption", "figure", "footer", "header", "nav", "section", "ol", "ul", "li", "table", "thead", "tbody", "tfoot", "caption", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "address"]
      , oo = ()=>({
        up: v({
            selector: Ae,
            closest: Ne,
            predicate: Oe,
            all: we
        }),
        down: v({
            selector: De,
            predicate: Se
        }),
        styles: v({
            get: Ze,
            getRaw: tt,
            set: Je,
            remove: ot
        }),
        attrs: v({
            get: Ge,
            set: $e,
            remove: He,
            copyTo: (e,t)=>{
                const o = Ue(e);
                Ve(t, o)
            }
        }),
        insert: v({
            before: $t,
            after: Vt,
            afterAll: Ut,
            append: qt,
            appendAll: Kt,
            prepend: Gt,
            wrap: Ht
        }),
        remove: v({
            unwrap: Yt,
            remove: Xt
        }),
        create: v({
            nu: Y.fromTag,
            clone: e=>Y.fromDom(e.dom.cloneNode(!1)),
            text: Y.fromText
        }),
        query: v({
            comparePosition: (e,t)=>e.dom.compareDocumentPosition(t.dom),
            prevSibling: be,
            nextSibling: ve
        }),
        property: v({
            children: ye,
            name: oe,
            parent: fe,
            document: e=>{
                return (t = e,
                ie(t) ? t : ge(t)).dom;
                var t
            }
            ,
            isText: ce,
            isComment: se,
            isElement: le,
            isSpecial: e=>{
                const t = oe(e);
                return A(["script", "noscript", "iframe", "noframes", "noembed", "title", "style", "textarea", "xmp"], t)
            }
            ,
            getLanguage: e=>le(e) ? qe(e, "lang") : w.none(),
            getText: Zt,
            setText: eo,
            isBoundary: e=>!!le(e) && ("body" === oe(e) || A(to, oe(e))),
            isEmptyTag: e=>!!le(e) && A(["br", "img", "hr", "input"], oe(e)),
            isNonEditable: e=>le(e) && "false" === Ge(e, "contenteditable")
        }),
        eq: he,
        is: pe
    });
    const no = (e,t,o,n)=>{
        const r = t(e, o);
        return B(n, ((o,n)=>{
            const r = t(e, n);
            return ro(e, o, r)
        }
        ), r)
    }
      , ro = (e,t,o)=>t.bind((t=>o.filter(x(e.eq, t))))
      , so = oo()
      , lo = e=>Ae(e, "table")
      , co = (e,t,o)=>ke(e, t).bind((t=>ke(e, o).bind((e=>{
        return (o = lo,
        n = [t, e],
        ((e,t,o)=>o.length > 0 ? ((e,t,o,n)=>n(e, t, o[0], o.slice(1)))(e, t, o, no) : w.none())(so, ((e,t)=>o(t)), n)).map((o=>({
            first: t,
            last: e,
            table: o
        })));
        var o, n
    }
    ))))
      , io = y
      , ao = e=>{
        const t = (e,t)=>qe(e, t).exists((e=>parseInt(e, 10) > 1));
        return e.length > 0 && _(e, (e=>t(e, "rowspan") || t(e, "colspan"))) ? w.some(e) : w.none()
    }
      , mo = (e,t,o)=>{
        return t.length <= 1 ? w.none() : (n = e,
        r = o.firstSelectedSelector,
        s = o.lastSelectedSelector,
        co(n, r, s).bind((e=>{
            const t = e=>he(n, e)
              , o = "thead,tfoot,tbody,table"
              , r = Ae(e.first, o, t)
              , s = Ae(e.last, o, t);
            return r.bind((t=>s.bind((o=>he(t, o) ? _t(e.table, e.first, e.last) : w.none()))))
        }
        ))).map((e=>({
            bounds: e,
            cells: t
        })));
        var n, r, s
    }
      , uo = "data-mce-selected"
      , ho = "data-mce-first-selected"
      , po = "data-mce-last-selected"
      , go = {
        selected: uo,
        selectedSelector: "td[" + uo + "],th[" + uo + "]",
        firstSelected: ho,
        firstSelectedSelector: "td[" + ho + "],th[" + ho + "]",
        lastSelected: po,
        lastSelectedSelector: "td[" + po + "],th[" + po + "]"
    }
      , fo = e=>({
        element: e,
        mergable: w.none(),
        unmergable: w.none(),
        selection: [e]
    })
      , wo = (e,t,o)=>({
        element: o,
        mergable: mo(t, e, go),
        unmergable: ao(e),
        selection: io(e)
    })
      , bo = e=>(t,o)=>{
        const n = oe(t)
          , r = "col" === n || "colgroup" === n ? ft(s = t).bind((e=>((e,t)=>((e,t)=>{
            const o = De(e, t);
            return o.length > 0 ? w.some(o) : w.none()
        }
        )(e, t))(e, go.firstSelectedSelector))).fold(v(s), (e=>e[0])) : t;
        var s;
        return Ne(r, e, o)
    }
      , vo = bo("th,td,caption")
      , yo = bo("th,td")
      , Co = e=>{
        return t = e.model.table.getSelectedCells(),
        N(t, Y.fromDom);
        var t
    }
      , xo = e=>{
        let t, o = !1;
        return (...n)=>(o || (o = !0,
        t = e.apply(null, n)),
        t)
    }
      , So = (e,t)=>({
        element: e,
        offset: t
    })
      , To = (e,t,o)=>e.property().isText(t) && 0 === e.property().getText(t).trim().length || e.property().isComment(t) ? o(t).bind((t=>To(e, t, o).orThunk((()=>w.some(t))))) : w.none()
      , Ro = (e,t)=>e.property().isText(t) ? e.property().getText(t).length : e.property().children(t).length
      , Do = (e,t)=>{
        const o = To(e, t, e.query().prevSibling).getOr(t);
        if (e.property().isText(o))
            return So(o, Ro(e, o));
        const n = e.property().children(o);
        return n.length > 0 ? Do(e, n[n.length - 1]) : So(o, Ro(e, o))
    }
      , Oo = Do
      , Ao = oo()
      , Eo = {
        unsupportedLength: ["em", "ex", "cap", "ch", "ic", "rem", "lh", "rlh", "vw", "vh", "vi", "vb", "vmin", "vmax", "cm", "mm", "Q", "in", "pc", "pt", "px"],
        fixed: ["px", "pt"],
        relative: ["%"],
        empty: [""]
    }
      , ko = (()=>{
        const e = "[0-9]+"
          , t = "[eE][+-]?" + e
          , o = e=>`(?:${e})?`
          , n = ["Infinity", e + "\\." + o(e) + o(t), "\\." + e + o(t), e + o(t)].join("|");
        return new RegExp(`^([+-]?(?:${n}))(.*)$`)
    }
    )()
      , No = (e,t)=>w.from(ko.exec(e)).bind((e=>{
        const o = Number(e[1])
          , n = e[2];
        return ((e,t)=>E(t, (t=>E(Eo[t], (t=>e === t)))))(n, t) ? w.some({
            value: o,
            unit: n
        }) : w.none()
    }
    ))
      , Wo = (e,t,o)=>((e,t)=>(e=>{
        const t = parseFloat(e);
        return isNaN(t) ? w.none() : w.some(t)
    }
    )(e).getOr(t))(Ze(e, t), o)
      , Lo = ((e,t)=>{
        const o = t=>{
            const o = (e=>e.dom.offsetWidth)(t);
            if (o <= 0 || null === o) {
                const o = Ze(t, e);
                return parseFloat(o) || 0
            }
            return o
        }
          , n = (e,t)=>I(t, ((t,o)=>{
            const n = Ze(e, o)
              , r = void 0 === n ? 0 : parseInt(n, 10);
            return isNaN(r) ? t : t + r
        }
        ), 0);
        return {
            set: (t,o)=>{
                if (!f(o) && !o.match(/^[0-9]+$/))
                    throw new Error(e + ".set accepts only positive integer values. Value was " + o);
                const n = t.dom;
                Ye(n) && (n.style[e] = o + "px")
            }
            ,
            get: o,
            getOuter: o,
            aggregate: n,
            max: (e,t,o)=>{
                const r = n(e, o);
                return t > r ? t - r : 0
            }
        }
    }
    )("width")
      , Mo = e=>Lo.get(e)
      , jo = e=>Lo.getOuter(e)
      , Bo = e=>((e,t)=>{
        const o = e.dom
          , n = o.getBoundingClientRect().width || o.offsetWidth;
        return "border-box" === t ? n : ((e,t,o,n)=>t - Wo(e, `padding-${o}`, 0) - Wo(e, `padding-${n}`, 0) - Wo(e, `border-${o}-width`, 0) - Wo(e, `border-${n}-width`, 0))(e, n, "left", "right")
    }
    )(e, "content-box")
      , Io = me("col")
      , Po = (e,t,o)=>{
        const n = (r = e,
        w.from(r.dom.parentElement).map(Y.fromDom)).getOrThunk((()=>(e=>{
            const t = e.dom.body;
            if (null == t)
                throw new Error("Body is not available yet");
            return Y.fromDom(t)
        }
        )(ge(e))));
        var r;
        return t(e) / o(n) * 100
    }
      , zo = (e,t)=>{
        Je(e, "width", t + "px")
    }
      , _o = (e,t)=>{
        Je(e, "width", t + "%")
    }
      , Fo = e=>((e,t)=>tt(e, t).orThunk((()=>qe(e, t).map((e=>e + "px")))))(e, "width")
      , $o = e=>Po(e, Mo, Bo)
      , Vo = e=>{
        return Io(e) ? Mo(e) : Wo(t = e, "width", t.dom.offsetWidth);
        var t
    }
      , Go = (e,t,o)=>{
        Je(e, "width", t + o)
    }
      , qo = v(/(\d+(\.\d+)?)%/)
      , Ho = (e,t)=>{
        if (!rt(e)) {
            const o = (e=>Fo(e).bind((e=>No(e, ["fixed", "relative", "empty"]))))(e);
            o.each((o=>{
                const n = o.value / 2;
                Go(e, n, o.unit),
                Go(t, n, o.unit)
            }
            ))
        }
    }
      , Uo = me("col")
      , Ko = me("colgroup")
      , Qo = e=>({
        element: e,
        colspan: nt(e, "colspan", 1),
        rowspan: nt(e, "rowspan", 1)
    })
      , Xo = (e,t=Qo)=>{
        const o = o=>{
            if ((e=>"tr" === oe(e) || Ko(e))(o))
                return Ko((r = {
                    element: o
                }).element) ? e.colgroup(r) : e.row(r);
            {
                const r = o
                  , s = (t=>Uo(t.element) ? e.col(t) : e.cell(t))(t(r));
                return n = w.some({
                    item: r,
                    replacement: s
                }),
                s
            }
            var r
        }
        ;
        let n = w.none();
        return {
            getOrInit: (e,t)=>n.fold((()=>o(e)), (n=>t(e, n.item) ? n.replacement : o(e)))
        }
    }
      , Yo = e=>N(e, v(0))
      , Jo = e=>(t,o,n,r)=>{
        if (e(n)) {
            const e = Math.max(r, t[o] - Math.abs(n))
              , s = Math.abs(e - t[o]);
            return n >= 0 ? s : -s
        }
        return n
    }
      , Zo = Jo((e=>e < 0))
      , en = Jo(T)
      , tn = ()=>{
        const e = (e,t,o,n,r)=>{
            const s = en(e, n >= 0 ? o : t, n, r);
            return ((e,t,o,n,r)=>r(e.slice(0, t)).concat(n).concat(r(e.slice(o))))(e, t, o + 1, [s, -s], Yo)
        }
        ;
        return {
            resizeTable: (e,t,o)=>{
                o && e(t)
            }
            ,
            clampTableDelta: (e,t,o,n,r)=>{
                if (r) {
                    if (o >= 0)
                        return o;
                    {
                        const t = I(e, ((e,t)=>e + t - n), 0);
                        return Math.max(-t, o)
                    }
                }
                return Zo(e, t, o, n)
            }
            ,
            calcLeftEdgeDeltas: e,
            calcMiddleDeltas: (t,o,n,r,s,l)=>e(t, n, r, s, l),
            calcRightEdgeDeltas: (e,t,o,n,r,s)=>{
                if (s)
                    return Yo(e);
                {
                    const t = n / e.length;
                    return N(e, v(t))
                }
            }
            ,
            calcRedestributedWidths: (e,t,o,n)=>({
                delta: 0,
                newSizes: e
            })
        }
    }
      , on = (e,t)=>Y.fromDom(e.dom.cloneNode(t))
      , nn = (e,t)=>{
        const o = ((e,t)=>{
            const o = Y.fromTag(t)
              , n = Ue(e);
            return Ve(o, n),
            o
        }
        )(e, t)
          , n = ye((e=>on(e, !0))(e));
        return Kt(o, n),
        o
    }
      , rn = (me("th"),
    (e,t,o)=>ut(o(e.element, t), !0, e.isLocked))
      , sn = ()=>({
        transformRow: y,
        transformCell: rn
    })
      , ln = ()=>cn(0, 0)
      , cn = (e,t)=>({
        major: e,
        minor: t
    })
      , an = {
        nu: cn,
        detect: (e,t)=>{
            const o = String(t).toLowerCase();
            return 0 === e.length ? ln() : ((e,t)=>{
                const o = ((e,t)=>{
                    for (let o = 0; o < e.length; o++) {
                        const n = e[o];
                        if (n.test(t))
                            return n
                    }
                }
                )(e, t);
                if (!o)
                    return {
                        major: 0,
                        minor: 0
                    };
                const n = e=>Number(t.replace(o, "$" + e));
                return cn(n(1), n(2))
            }
            )(e, o)
        }
        ,
        unknown: ln
    }
      , mn = (e,t)=>{
        const o = String(t).toLowerCase();
        return P(e, (e=>e.search(o)))
    }
      , un = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/
      , dn = e=>t=>Ke(t, e)
      , hn = [{
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: e=>Ke(e, "edge/") && Ke(e, "chrome") && Ke(e, "safari") && Ke(e, "applewebkit")
    }, {
        name: "Chromium",
        brand: "Chromium",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, un],
        search: e=>Ke(e, "chrome") && !Ke(e, "chromeframe")
    }, {
        name: "IE",
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: e=>Ke(e, "msie") || Ke(e, "trident")
    }, {
        name: "Opera",
        versionRegexes: [un, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: dn("opera")
    }, {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: dn("firefox")
    }, {
        name: "Safari",
        versionRegexes: [un, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: e=>(Ke(e, "safari") || Ke(e, "mobile/")) && Ke(e, "applewebkit")
    }]
      , pn = [{
        name: "Windows",
        search: dn("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "iOS",
        search: e=>Ke(e, "iphone") || Ke(e, "ipad"),
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
    }, {
        name: "Android",
        search: dn("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "macOS",
        search: dn("mac os x"),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
    }, {
        name: "Linux",
        search: dn("linux"),
        versionRegexes: []
    }, {
        name: "Solaris",
        search: dn("sunos"),
        versionRegexes: []
    }, {
        name: "FreeBSD",
        search: dn("freebsd"),
        versionRegexes: []
    }, {
        name: "ChromeOS",
        search: dn("cros"),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
    }]
      , gn = {
        browsers: v(hn),
        oses: v(pn)
    }
      , fn = "Edge"
      , wn = "Chromium"
      , bn = "Opera"
      , vn = "Firefox"
      , yn = "Safari"
      , Cn = e=>{
        const t = e.current
          , o = e.version
          , n = e=>()=>t === e;
        return {
            current: t,
            version: o,
            isEdge: n(fn),
            isChromium: n(wn),
            isIE: n("IE"),
            isOpera: n(bn),
            isFirefox: n(vn),
            isSafari: n(yn)
        }
    }
      , xn = ()=>Cn({
        current: void 0,
        version: an.unknown()
    })
      , Sn = Cn
      , Tn = (v(fn),
    v(wn),
    v("IE"),
    v(bn),
    v(vn),
    v(yn),
    "Windows")
      , Rn = "Android"
      , Dn = "Linux"
      , On = "macOS"
      , An = "Solaris"
      , En = "FreeBSD"
      , kn = "ChromeOS"
      , Nn = e=>{
        const t = e.current
          , o = e.version
          , n = e=>()=>t === e;
        return {
            current: t,
            version: o,
            isWindows: n(Tn),
            isiOS: n("iOS"),
            isAndroid: n(Rn),
            isMacOS: n(On),
            isLinux: n(Dn),
            isSolaris: n(An),
            isFreeBSD: n(En),
            isChromeOS: n(kn)
        }
    }
      , Wn = ()=>Nn({
        current: void 0,
        version: an.unknown()
    })
      , Ln = Nn
      , Mn = (v(Tn),
    v("iOS"),
    v(Rn),
    v(Dn),
    v(On),
    v(An),
    v(En),
    v(kn),
    e=>window.matchMedia(e).matches);
    let jn = xo((()=>((e,t,o)=>{
        const n = gn.browsers()
          , r = gn.oses()
          , s = t.bind((e=>((e,t)=>q(t.brands, (t=>{
            const o = t.brand.toLowerCase();
            return P(e, (e=>{
                var t;
                return o === (null === (t = e.brand) || void 0 === t ? void 0 : t.toLowerCase())
            }
            )).map((e=>({
                current: e.name,
                version: an.nu(parseInt(t.version, 10), 0)
            })))
        }
        )))(n, e))).orThunk((()=>((e,t)=>mn(e, t).map((e=>{
            const o = an.detect(e.versionRegexes, t);
            return {
                current: e.name,
                version: o
            }
        }
        )))(n, e))).fold(xn, Sn)
          , l = ((e,t)=>mn(e, t).map((e=>{
            const o = an.detect(e.versionRegexes, t);
            return {
                current: e.name,
                version: o
            }
        }
        )))(r, e).fold(Wn, Ln)
          , c = ((e,t,o,n)=>{
            const r = e.isiOS() && !0 === /ipad/i.test(o)
              , s = e.isiOS() && !r
              , l = e.isiOS() || e.isAndroid()
              , c = l || n("(pointer:coarse)")
              , i = r || !s && l && n("(min-device-width:768px)")
              , a = s || l && !i
              , m = t.isSafari() && e.isiOS() && !1 === /safari/i.test(o)
              , u = !a && !i && !m;
            return {
                isiPad: v(r),
                isiPhone: v(s),
                isTablet: v(i),
                isPhone: v(a),
                isTouch: v(c),
                isAndroid: e.isAndroid,
                isiOS: e.isiOS,
                isWebView: v(m),
                isDesktop: v(u)
            }
        }
        )(l, s, e, o);
        return {
            browser: s,
            os: l,
            deviceType: c
        }
    }
    )(window.navigator.userAgent, w.from(window.navigator.userAgentData), Mn)));
    const Bn = (e,t=T)=>{
        const o = e.grid
          , n = k(o.columns, y)
          , r = k(o.rows, y);
        return N(n, (o=>In((()=>z(r, (t=>kt(e, t, o).filter((e=>e.column === o)).toArray()))), (e=>1 === e.colspan && t(e.element)), (()=>kt(e, 0, o)))))
    }
      , In = (e,t,o)=>{
        const n = e();
        return P(n, t).orThunk((()=>w.from(n[0]).orThunk(o))).map((e=>e.element))
    }
      , Pn = (e,t)=>({
        left: e,
        top: t,
        translate: (o,n)=>Pn(e + o, t + n)
    })
      , zn = Pn
      , _n = (e,t)=>void 0 !== e ? e : void 0 !== t ? t : 0
      , Fn = e=>{
        const t = e.dom.ownerDocument
          , o = t.body
          , n = t.defaultView
          , r = t.documentElement;
        if (o === e.dom)
            return zn(o.offsetLeft, o.offsetTop);
        const s = _n(null == n ? void 0 : n.pageYOffset, r.scrollTop)
          , l = _n(null == n ? void 0 : n.pageXOffset, r.scrollLeft)
          , c = _n(r.clientTop, o.clientTop)
          , i = _n(r.clientLeft, o.clientLeft);
        return $n(e).translate(l - i, s - c)
    }
      , $n = e=>{
        const t = e.dom
          , o = t.ownerDocument.body;
        return o === t ? zn(o.offsetLeft, o.offsetTop) : xe(e) ? (e=>{
            const t = e.getBoundingClientRect();
            return zn(t.left, t.top)
        }
        )(t) : zn(0, 0)
    }
      , Vn = (e,t)=>({
        col: e,
        x: t
    })
      , Gn = e=>Fn(e).left + jo(e)
      , qn = e=>Fn(e).left
      , Hn = (e,t)=>Vn(e, qn(t))
      , Un = (e,t)=>Vn(e, Gn(t))
      , Kn = (e,t,o)=>{
        if (0 === o.length)
            return [];
        const n = N(o.slice(1), ((t,o)=>t.map((t=>e(o, t)))))
          , r = o[o.length - 1].map((e=>t(o.length - 1, e)));
        return n.concat([r])
    }
      , Qn = (Xn = {
        delta: y,
        edge: qn,
        positions: e=>Kn(Hn, Un, e)
    },
    Yn = {
        delta: e=>-e,
        edge: Gn,
        positions: e=>Kn(Un, Hn, e)
    },
    e=>"rtl" === (e=>"rtl" === Ze(e, "direction") ? "rtl" : "ltr")(e) ? Yn : Xn);
    var Xn, Yn;
    const Jn = e=>Qn(e).edge(e)
      , Zn = me("col")
      , er = (e,t,o,n,r,s)=>e.filter(n).fold((()=>s(((e,t)=>{
        if (t < 0 || t >= e.length - 1)
            return w.none();
        const o = e[t].fold((()=>{
            const o = (e=>{
                const t = R.call(e, 0);
                return t.reverse(),
                t
            }
            )(e.slice(0, t));
            return q(o, ((e,t)=>e.map((e=>({
                value: e,
                delta: t + 1
            })))))
        }
        ), (e=>w.some({
            value: e,
            delta: 0
        })))
          , n = e[t + 1].fold((()=>{
            const o = e.slice(t + 1);
            return q(o, ((e,t)=>e.map((e=>({
                value: e,
                delta: t + 1
            })))))
        }
        ), (e=>w.some({
            value: e,
            delta: 1
        })));
        return o.bind((e=>n.map((t=>{
            const o = t.delta + e.delta;
            return Math.abs(t.value - e.value) / o
        }
        ))))
    }
    )(o, t))), (e=>r(e)))
      , tr = (e,t,o,n)=>{
        const r = Bn(e)
          , s = Lt(e) ? (e=>N(Wt(e), (e=>w.from(e.element))))(e) : r
          , l = [w.some(Jn(t))].concat(N(((e,t)=>Qn(t).positions(e, t))(r, t), (e=>e.map((e=>e.x)))))
          , c = (i = rt,
        e=>!i(e));
        var i;
        return N(s, ((e,t)=>er(e, t, l, c, (e=>{
            if ((e=>{
                const t = jn().browser
                  , o = t.isChromium() || t.isFirefox();
                return !Zn(e) || o
            }
            )(e))
                return o(e);
            {
                const e = ((e,t)=>null != e ? t(e) : w.none())(r[t], y);
                return er(e, t, l, c, (e=>n(w.some(Mo(e)))), n)
            }
        }
        ), n)))
    }
      , or = (e,t,o)=>tr(e, t, Vo, (e=>e.getOrThunk(o.minCellWidth)))
      , nr = (e,t)=>()=>xe(e) ? t(e) : parseFloat(tt(e, "width").getOr("0"))
      , rr = e=>Fo(e).fold((()=>(e=>{
        const t = nr(e, Mo)
          , o = v(0);
        return {
            width: t,
            pixelWidth: t,
            getWidths: (t,o)=>or(t, e, o),
            getCellDelta: o,
            singleColumnWidth: v([0]),
            minCellWidth: o,
            setElementWidth: b,
            adjustTableWidth: b,
            isRelative: !0,
            label: "none"
        }
    }
    )(e)), (t=>{
        return o = e,
        n = t,
        null !== qo().exec(n) ? (e=>{
            const t = nr(e, (e=>parseFloat((e=>Po(e, Mo, Bo) + "%")(e))))
              , o = nr(e, Mo);
            return {
                width: t,
                pixelWidth: o,
                getWidths: (t,o)=>((e,t,o)=>tr(e, t, $o, (e=>e.fold((()=>o.minCellWidth()), (e=>e / o.pixelWidth() * 100)))))(t, e, o),
                getCellDelta: e=>e / o() * 100,
                singleColumnWidth: (e,t)=>[100 - e],
                minCellWidth: ()=>st() / o() * 100,
                setElementWidth: _o,
                adjustTableWidth: o=>{
                    const n = t();
                    _o(e, n + o / 100 * n)
                }
                ,
                isRelative: !0,
                label: "percent"
            }
        }
        )(o) : (e=>{
            const t = nr(e, Mo);
            return {
                width: t,
                pixelWidth: t,
                getWidths: (t,o)=>or(t, e, o),
                getCellDelta: y,
                singleColumnWidth: (e,t)=>[Math.max(st(), e + t) - e],
                minCellWidth: st,
                setElementWidth: zo,
                adjustTableWidth: o=>{
                    const n = t() + o;
                    zo(e, n)
                }
                ,
                isRelative: !1,
                label: "pixel"
            }
        }
        )(o);
        var o, n
    }
    ))
      , sr = (e,t,o,n)=>{
        o === n ? He(e, t) : $e(e, t, o)
    }
      , lr = (e,t,o)=>{
        G(Re(e, t)).fold((()=>Gt(e, o)), (e=>Vt(e, o)))
    }
      , cr = (e,t)=>{
        const o = []
          , n = []
          , r = e=>N(e, (e=>{
            e.isNew && o.push(e.element);
            const t = e.element;
            return Qt(t),
            W(e.cells, (e=>{
                e.isNew && n.push(e.element),
                sr(e.element, "colspan", e.colspan, 1),
                sr(e.element, "rowspan", e.rowspan, 1),
                qt(t, e.element)
            }
            )),
            t
        }
        ))
          , s = e=>z(e, (e=>N(e.cells, (e=>(sr(e.element, "span", e.colspan, 1),
        e.element)))))
          , l = (t,o)=>{
            const n = ((e,t)=>{
                const o = Ee(e, t).getOrThunk((()=>{
                    const o = Y.fromTag(t, ge(e).dom);
                    return "thead" === t ? lr(e, "caption,colgroup", o) : "colgroup" === t ? lr(e, "caption", o) : qt(e, o),
                    o
                }
                ));
                return Qt(o),
                o
            }
            )(e, o)
              , l = ("colgroup" === o ? s : r)(t);
            Kt(n, l)
        }
          , c = (t,o)=>{
            t.length > 0 ? l(t, o) : (t=>{
                Ee(e, t).each(Xt)
            }
            )(o)
        }
          , i = []
          , a = []
          , m = []
          , u = [];
        return W(t, (e=>{
            switch (e.section) {
            case "thead":
                i.push(e);
                break;
            case "tbody":
                a.push(e);
                break;
            case "tfoot":
                m.push(e);
                break;
            case "colgroup":
                u.push(e)
            }
        }
        )),
        c(u, "colgroup"),
        c(i, "thead"),
        c(a, "tbody"),
        c(m, "tfoot"),
        {
            newRows: o,
            newCells: n
        }
    }
      , ir = (e,t)=>{
        if (0 === e.length)
            return 0;
        const o = e[0]
          , n = ((e,n)=>{
            for (let n = 0, s = e.length; n < s; n++)
                if (r = e[n],
                !t(o.element, r.element))
                    return w.some(n);
            var r;
            return w.none()
        }
        )(e);
        return n.getOr(e.length)
    }
      , ar = (e,t)=>{
        const o = N(e, (e=>N(e.cells, S)));
        return N(e, ((n,r)=>{
            const s = z(n.cells, ((n,s)=>{
                if (!1 === o[r][s]) {
                    const m = ((e,t,o,n)=>{
                        const r = ((e,t)=>e[t])(e, t)
                          , s = "colgroup" === r.section
                          , l = ir(r.cells.slice(o), n)
                          , c = s ? 1 : ir(((e,t)=>N(e, (e=>Ct(e, t))))(e.slice(t), o), n);
                        return {
                            colspan: l,
                            rowspan: c
                        }
                    }
                    )(e, r, s, t);
                    return ((e,t,n,r)=>{
                        for (let s = e; s < e + n; s++)
                            for (let e = t; e < t + r; e++)
                                o[s][e] = !0
                    }
                    )(r, s, m.rowspan, m.colspan),
                    [(l = n.element,
                    c = m.rowspan,
                    i = m.colspan,
                    a = n.isNew,
                    {
                        element: l,
                        rowspan: c,
                        colspan: i,
                        isNew: a
                    })]
                }
                return [];
                var l, c, i, a
            }
            ));
            return l = n.element,
            c = s,
            i = n.section,
            a = n.isNew,
            {
                element: l,
                cells: c,
                section: i,
                isNew: a
            };
            var l, c, i, a
        }
        ))
    }
      , mr = (e,t)=>q(e.all, (e=>P(e.cells, (e=>he(t, e.element)))))
      , ur = (e,t,o)=>{
        const n = (e=>{
            const t = []
              , o = e=>{
                t.push(e)
            }
            ;
            for (let t = 0; t < e.length; t++)
                e[t].each(o);
            return t
        }
        )(N(t.selection, (t=>ht(t).bind((t=>mr(e, t))).filter(o))));
        return Q(n.length > 0, n)
    }
      , dr = (e,t,o,n,r)=>(s,l,c,i)=>{
        const a = At(s)
          , m = w.from(null == i ? void 0 : i.section).getOrThunk(sn)
          , u = t(a, l).map((t=>{
            const o = ((e,t)=>((e,t,o)=>{
                const n = [];
                W(e.colgroups, (r=>{
                    const s = [];
                    for (let n = 0; n < e.grid.columns; n++) {
                        const r = Mt(e, n).map((e=>ut(e.element, o, !1))).getOrThunk((()=>ut(t.colGap(), !0, !1)));
                        s.push(r)
                    }
                    n.push(dt(r.element, s, "colgroup", o))
                }
                ));
                for (let r = 0; r < e.grid.rows; r++) {
                    const s = [];
                    for (let n = 0; n < e.grid.columns; n++) {
                        const l = kt(e, r, n).map((e=>ut(e.element, o, e.isLocked))).getOrThunk((()=>ut(t.gap(), !0, !1)));
                        s.push(l)
                    }
                    const l = e.all[r]
                      , c = dt(l.element, s, l.section, o);
                    n.push(c)
                }
                return n
            }
            )(e, t, !1))(a, c)
              , n = e(o, t, he, r(c), m)
              , s = (e=>{
                const t = I(St(e).rows, ((e,t)=>(W(t.cells, ((t,o)=>{
                    t.isLocked && (e[o] = !0)
                }
                )),
                e)), {})
                  , o = je(t, ((e,t)=>parseInt(t, 10)));
                return F(o)
            }
            )(n.grid);
            return {
                info: t,
                grid: (l = n.grid,
                ar(l, he)),
                cursor: n.cursor,
                lockedColumns: s
            };
            var l
        }
        ));
        return u.bind((e=>{
            const t = cr(s, e.grid)
              , r = w.from(null == i ? void 0 : i.sizing).getOrThunk((()=>rr(s)))
              , l = w.from(null == i ? void 0 : i.resize).getOrThunk(tn);
            return o(s, e.grid, e.info, {
                sizing: r,
                resize: l,
                section: m
            }),
            n(s),
            He(s, Tt),
            e.lockedColumns.length > 0 && $e(s, Tt, e.lockedColumns.join(",")),
            w.some({
                cursor: e.cursor,
                newRows: t.newRows,
                newCells: t.newCells
            })
        }
        ))
    }
      , hr = (e,t)=>ht(t.element).bind((t=>mr(e, t)))
      , pr = (e,t)=>ur(e, t, T)
      , gr = (e,t)=>_(t, (t=>((e,t)=>mr(e, t).exists((e=>!e.isLocked)))(e, t)))
      , fr = (e,t)=>((e,t)=>t.mergable)(0, t).filter((t=>gr(e, t.cells)))
      , wr = (e,t)=>((e,t)=>t.unmergable)(0, t).filter((t=>gr(e, t)))
      , br = ["img", "br"]
      , vr = e=>{
        return (t = e,
        Jt.getOption(t)).filter((e=>0 !== e.trim().length || e.indexOf("\xa0") > -1)).isSome() || A(br, oe(e)) || (e=>{
            return le(t = e) && te(t.dom) && "false" === Ge(e, "contenteditable");
            var t
        }
        )(e);
        var t
    }
      , yr = {
        scope: ["row", "col"]
    }
      , Cr = e=>()=>{
        const t = Y.fromTag("td", e.dom);
        return qt(t, Y.fromTag("br", e.dom)),
        t
    }
      , xr = e=>()=>Y.fromTag("col", e.dom)
      , Sr = e=>()=>Y.fromTag("colgroup", e.dom)
      , Tr = e=>()=>Y.fromTag("tr", e.dom)
      , Rr = (e,t,o)=>{
        const n = nn(e, t);
        return Me(o, ((e,t)=>{
            null === e ? He(n, t) : $e(n, t, e)
        }
        )),
        n
    }
      , Dr = (e,t,o)=>{
        return (n = e,
        ((e,t)=>{
            const o = e=>{
                for (let n = 0; n < e.childNodes.length; n++) {
                    const r = Y.fromDom(e.childNodes[n]);
                    if (t(r))
                        return w.some(r);
                    const s = o(e.childNodes[n]);
                    if (s.isSome())
                        return s
                }
                return w.none()
            }
            ;
            return o(e.dom)
        }
        )(n, vr)).map((n=>{
            const r = o.join(",")
              , s = Te(n, r, (t=>he(t, e)));
            return B(s, ((e,t)=>{
                const o = on(t, !1);
                return qt(e, o),
                o
            }
            ), t)
        }
        )).getOr(t);
        var n
    }
      , Or = (e,t,o)=>{
        const n = (e,t)=>{
            ((e,t)=>{
                const o = e.dom
                  , n = t.dom;
                Ye(o) && Ye(n) && (n.style.cssText = o.style.cssText)
            }
            )(e.element, t),
            ot(t, "height"),
            1 !== e.colspan && ot(t, "width")
        }
        ;
        return {
            col: o=>{
                const r = Y.fromTag(oe(o.element), t.dom);
                return n(o, r),
                e(o.element, r),
                r
            }
            ,
            colgroup: Sr(t),
            row: Tr(t),
            cell: r=>{
                const s = Y.fromTag(oe(r.element), t.dom)
                  , l = o.getOr(["strong", "em", "b", "i", "span", "font", "h1", "h2", "h3", "h4", "h5", "h6", "p", "div"])
                  , c = l.length > 0 ? Dr(r.element, s, l) : s;
                return qt(c, Y.fromTag("br")),
                n(r, s),
                ((e,t)=>{
                    Me(yr, ((o,n)=>qe(e, n).filter((e=>A(o, e))).each((e=>$e(t, n, e)))))
                }
                )(r.element, s),
                e(r.element, s),
                s
            }
            ,
            replace: Rr,
            colGap: xr(t),
            gap: Cr(t)
        }
    }
      , Ar = e=>At(e).grid
      , Er = (e,t=!1)=>{
        return xe(e) ? e.dom.isContentEditable : (o = e,
        Ne(o, "[contenteditable]")).fold(v(t), (e=>"true" === kr(e)));
        var o
    }
      , kr = e=>e.dom.contentEditable
      , Nr = (e,t,o,n,r)=>N(e, (e=>{
        const s = t > 0 && t < e.cells.length && n(xt(e, t - 1), xt(e, t))
          , l = ((e,t,o,n,r,s,l)=>{
            if ("colgroup" !== o && n)
                return Ct(e, t);
            {
                const t = Ct(e, r);
                return ut(l(t.element, s), !0, !1)
            }
        }
        )(e, t, e.section, s, o, n, r);
        return ((e,t,o)=>((e,t,o)=>{
            const n = e.cells
              , r = n.slice(0, t)
              , s = n.slice(t)
              , l = r.concat(o).concat(s);
            return yt(e, l)
        }
        )(e, t, [o]))(e, t, l)
    }
    ))
      , Wr = {
        ...(e=>{
            if (!a(e))
                throw new Error("cases must be an array");
            if (0 === e.length)
                throw new Error("there must be at least one case");
            const t = []
              , o = {};
            return W(e, ((n,r)=>{
                const s = We(n);
                if (1 !== s.length)
                    throw new Error("one and only one name per case");
                const l = s[0]
                  , c = n[l];
                if (void 0 !== o[l])
                    throw new Error("duplicate key detected:" + l);
                if ("cata" === l)
                    throw new Error("cannot have a case named cata (sorry)");
                if (!a(c))
                    throw new Error("case arguments must be an array");
                t.push(l),
                o[l] = (...o)=>{
                    const n = o.length;
                    if (n !== c.length)
                        throw new Error("Wrong number of arguments to case " + l + ". Expected " + c.length + " (" + c + "), got " + n);
                    return {
                        fold: (...t)=>{
                            if (t.length !== e.length)
                                throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                            return t[r].apply(null, o)
                        }
                        ,
                        match: e=>{
                            const n = We(e);
                            if (t.length !== n.length)
                                throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + n.join(","));
                            if (!_(t, (e=>A(n, e))))
                                throw new Error("Not all branches were specified when using match. Specified: " + n.join(", ") + "\nRequired: " + t.join(", "));
                            return e[l].apply(null, o)
                        }
                        ,
                        log: e=>{
                            console.log(e, {
                                constructors: t,
                                constructor: l,
                                params: o
                            })
                        }
                    }
                }
            }
            )),
            o
        }
        )([{
            none: []
        }, {
            only: ["index"]
        }, {
            left: ["index", "next"]
        }, {
            middle: ["prev", "index", "next"]
        }, {
            right: ["prev", "index"]
        }])
    }
      , Lr = (e,t)=>Lt(e) ? ((e,t)=>{
        const o = Wt(e);
        return N(o, ((e,o)=>({
            element: e.element,
            width: t[o],
            colspan: e.colspan
        })))
    }
    )(e, t) : ((e,t)=>{
        const o = (e=>z(e.all, (e=>e.cells)))(e);
        return N(o, (e=>{
            const o = ((e,t,o)=>{
                let n = 0;
                for (let r = e; r < t; r++)
                    n += void 0 !== o[r] ? o[r] : 0;
                return n
            }
            )(e.column, e.column + e.colspan, t);
            return {
                element: e.element,
                width: o,
                colspan: e.colspan
            }
        }
        ))
    }
    )(e, t)
      , Mr = (e,t,o)=>{
        const n = Lr(e, t);
        W(n, (e=>{
            o.setElementWidth(e.element, e.width)
        }
        ))
    }
      , jr = e=>I(e, ((e,t)=>E(e, (e=>e.column === t.column)) ? e : e.concat([t])), []).sort(((e,t)=>e.column - t.column))
      , Br = e=>Er(e, !0)
      , Ir = (e,t,o)=>((e,t)=>({
        grid: e,
        cursor: t
    }))(e, ((e,t,o)=>{
        var n, r;
        const s = St(e).rows;
        return w.from(null === (r = null === (n = s[t]) || void 0 === n ? void 0 : n.cells[o]) || void 0 === r ? void 0 : r.element).filter(Br).orThunk((()=>(e=>q(e, (e=>q(e.cells, (e=>{
            const t = e.element;
            return Q(Br(t), t)
        }
        )))))(s)))
    }
    )(e, t, o))
      , Pr = (e,t,o,n)=>((e,t,o,n,r)=>{
        const s = Et(t)
          , l = n.getWidths(s, n)
          , c = n.pixelWidth()
          , {newSizes: i, delta: a} = r.calcRedestributedWidths(l, c, o.pixelDelta, n.isRelative);
        Mr(s, i, n),
        n.adjustTableWidth(a)
    }
    )(0, t, o, n.sizing, n.resize)
      , zr = (e,t)=>{
        const o = Bn(e)
          , n = jr(t);
        return I(n, ((e,t)=>e + o[t.column].map(jo).getOr(0)), 0)
    }
      , _r = dr(((e,t,o,n)=>{
        const r = t.detail
          , s = r.column
          , l = r.column
          , c = Nr(e, l, s, o, n.getOrInit);
        return Ir(c, r.row, l)
    }
    ), ((e,t)=>hr(e, t).filter((e=>!E([e], (e=>0 === e.column && e.isLocked)))).map((t=>({
        detail: t,
        pixelDelta: zr(e, [t])
    })))), Pr, b, Xo)
      , Fr = dr(((e,t,o,n)=>{
        const r = jr(t.details)
          , s = ((e,t)=>z(e, (e=>{
            const o = e.cells
              , n = B(t, ((e,t)=>t >= 0 && t < e.length ? e.slice(0, t).concat(e.slice(t + 1)) : e), o);
            return n.length > 0 ? [dt(e.element, n, e.section, e.isNew)] : []
        }
        )))(e, N(r, (e=>e.column)))
          , l = s.length > 0 ? s[0].cells.length - 1 : 0;
        return Ir(s, r[0].row, Math.min(r[0].column, l))
    }
    ), ((e,t)=>((e,t)=>ur(e, t, (e=>!e.isLocked)))(e, t).map((t=>({
        details: t,
        pixelDelta: -zr(e, t)
    })))), Pr, (e=>{
        0 === pt(e).length && Xt(e)
    }
    ), Xo)
      , $r = (e,t)=>{
        const o = Ge(e, t);
        return void 0 === o || "" === o ? [] : o.split(" ")
    }
      , Vr = e=>void 0 !== e.dom.classList
      , Gr = e=>e.dom.textContent
      , qr = me("th")
      , Hr = (e,t)=>e && t ? "sectionCells" : e ? "section" : "cells"
      , Ur = e=>{
        const t = M(e, (e=>qr(e.element)));
        return 0 === t.length ? w.some("td") : t.length === e.length ? w.some("th") : w.none()
    }
      , Kr = e=>{
        const t = N(e, (e=>(e=>{
            const t = "thead" === e.section
              , o = H(Ur(e.cells), "th");
            return "tfoot" === e.section ? {
                type: "footer"
            } : t || o ? {
                type: "header",
                subType: Hr(t, o)
            } : {
                type: "body"
            }
        }
        )(e).type))
          , o = A(t, "header")
          , n = A(t, "footer");
        if (o || n) {
            const e = A(t, "body");
            return !o || e || n ? o || e || !n ? w.none() : w.some("footer") : w.some("header")
        }
        return w.some("body")
    }
      , Qr = {
        structure: !1,
        style: !0
    }
      , Xr = {
        structure: !0,
        style: !1
    }
      , Yr = (e,t,o)=>({
        value: t + 1
    })
      , Jr = (e,t,o)=>{
        const n = "A".charCodeAt(0)
          , r = [];
        let s = t;
        for (; s >= 0; )
            r.push(String.fromCharCode(n + s % 26)),
            s = Math.floor(s / 26) - 1;
        return {
            value: r.reverse().join("")
        }
    }
      , Zr = e=>e.options.get("advtable_value_series")
      , es = e=>{
        const t = parseFloat(e);
        return Q(!(isNaN(t) || isNaN(e)), t)
    }
      , ts = (e,t)=>e < t ? -1 : e > t ? 1 : 0
      , os = (e,t)=>U(es(e), es(t), ts).getOrThunk((()=>((e,t)=>e.localeCompare(t))(e, t)))
      , ns = e=>{
        const t = (e=>w.from(e.options.get("table_clone_elements")))(e)
          , o = (o,r,s,l)=>(c,i,a,m,u=!1)=>{
            const d = Y.fromDom(e.getDoc())
              , h = Or(s, d, t);
            return r(c) ? o(c, i, h).bind((t=>{
                W(t.newRows, (t=>{
                    ((e,t)=>{
                        e.dispatch("NewRow", {
                            node: t
                        })
                    }
                    )(e, t.dom)
                }
                )),
                W(t.newCells, (t=>{
                    ((e,t)=>{
                        e.dispatch("NewCell", {
                            node: t
                        })
                    }
                    )(e, t.dom)
                }
                ));
                const o = ((t,o,r,s)=>{
                    const l = r.filter((e=>xe(e) && n(e))).or(o.cursor);
                    return l.fold((()=>{
                        const o = pt(t);
                        return V(o).filter(xe).map((o=>{
                            const n = e.dom.createRng();
                            return n.selectNode(o.dom),
                            s && (e.model.table.clearSelectedCells(t.dom),
                            e.selection.setRng(n),
                            $e(o, "data-mce-selected", "1")),
                            n
                        }
                        ))
                    }
                    ), (o=>{
                        const n = e.dom.createRng()
                          , r = Oo(Ao, o);
                        return n.setStart(r.element.dom, r.offset),
                        n.setEnd(r.element.dom, r.offset),
                        s && (e.model.table.clearSelectedCells(t.dom),
                        e.selection.setRng(n)),
                        w.some(n)
                    }
                    ))
                }
                )(c, t, a, m);
                return xe(c) && ((e=>{
                    He(e, "data-mce-style");
                    const t = e=>He(e, "data-mce-style");
                    W(pt(e), t),
                    W(gt(e), t),
                    W(wt(e), t)
                }
                )(c),
                u || ((e,t,o)=>{
                    e.dispatch("TableModified", {
                        ...o,
                        table: t
                    })
                }
                )(e, c.dom, l)),
                o.map((e=>({
                    rng: e,
                    effect: l
                })))
            }
            )) : w.none()
        }
          , n = e=>Er(e, !0)
          , r = (e,t,o)=>((e,t)=>({
            grid: e,
            cursor: t
        }))(e, ((e,t,o)=>{
            var r, s;
            const l = St(e).rows;
            return w.from(null === (s = null === (r = l[t]) || void 0 === r ? void 0 : r.cells[o]) || void 0 === s ? void 0 : s.element).filter(n).orThunk((()=>(e=>q(e, (e=>q(e.cells, (e=>{
                const t = e.element;
                return Q(n(t), t)
            }
            )))))(l)))
        }
        )(e, t, o))
          , s = (e,t,o,n)=>{
            const {cols: r, rows: s} = St(e)
              , l = j(s, (e=>e.section))
              , c = N(l, (e=>j(e, (e=>{
                const o = Ct(e, t).element;
                return oe(o)
            }
            ))))
              , i = z(c, (e=>z(e, (e=>{
                const r = Ct(e[0], t).element;
                return "th" === oe(r) ? e : (e=>{
                    const r = N(e, (e=>{
                        const o = Ct(e, t).element;
                        return {
                            row: e,
                            text: w.from(Gr(o)).getOr("")
                        }
                    }
                    ))
                      , s = F(r, ((e,t)=>{
                        const r = o(e.text, t.text);
                        return n ? r : -1 * r
                    }
                    ));
                    return N(s, (e=>e.row))
                }
                )(e)
            }
            ))));
            return [...r, ...i]
        }
          , l = (e,t,o,n)=>{
            const {cols: r, rows: s} = St(e)
              , l = s[t].cells
              , c = N(l, (e=>{
                const t = e.element;
                return w.from(Gr(t)).getOr("")
            }
            ))
              , i = me("th")
              , a = N(s, (e=>{
                const t = N(e.cells, ((e,t)=>({
                    cell: e,
                    column: t,
                    reference: l[t],
                    referenceText: c[t]
                })));
                return {
                    ...e,
                    zippedCells: t
                }
            }
            ))
              , m = N(a, (e=>{
                const t = j(e.zippedCells, (e=>{
                    const t = e.reference.element;
                    return oe(t)
                }
                ))
                  , r = z(t, (e=>{
                    const t = e[0].reference.element;
                    if (i(t))
                        return N(e, (e=>e.cell));
                    {
                        const {pass: t, fail: r} = L(e, (e=>e.cell.isLocked))
                          , s = F(r, ((e,t)=>{
                            const r = o(e.referenceText, t.referenceText);
                            return n ? r : -1 * r
                        }
                        ))
                          , l = I(t, ((e,t)=>{
                            const o = t.column
                              , n = e.slice(0, o)
                              , r = e.slice(o);
                            return n.concat([t]).concat(r)
                        }
                        ), s);
                        return N(l, (e=>e.cell))
                    }
                }
                ));
                return dt(e.element, r, e.section, e.isNew)
            }
            ));
            return [...r, ...m]
        }
          , u = s
          , d = l
          , h = (e,t,o,n,r)=>{
            const {cols: s, rows: l} = St(e)
              , c = l.slice(0, t)
              , i = [...s, ...l.slice(t, o + 1)];
            return {
                beforeRows: c,
                afterRows: l.slice(o + 1, e.length),
                selectionGridBefore: i.map((e=>({
                    ...e,
                    cells: e.cells.slice(0, n)
                }))),
                selectionGrid: i.map((e=>({
                    ...e,
                    cells: e.cells.slice(n, r + 1)
                }))),
                selectionGridAfter: i.map((e=>({
                    ...e,
                    cells: e.cells.slice(r + 1, e.cells.length)
                })))
            }
        }
          , p = (e,t)=>{
            const o = N(t, ((t,o)=>{
                const n = e.selectionGridBefore[o].cells
                  , r = e.selectionGridAfter[o].cells;
                return {
                    ...t,
                    cells: n.concat(t.cells).concat(r)
                }
            }
            ))
              , {cols: n, rows: r} = St(o);
            return [...n, ...e.beforeRows, ...r, ...e.afterRows]
        }
          , g = (e,t,o,n,r,l,c,i)=>{
            const a = h(e, o, n, r, l)
              , m = s(a.selectionGrid, t - r, c, i);
            return p(a, m)
        }
          , C = (e,t,o,n,r,s,c,i)=>{
            const a = h(e, o, n, r, s)
              , m = l(a.selectionGrid, t - o, c, i);
            return p(a, m)
        }
          , x = e=>I(e, ((e,t)=>E(e, (e=>e.row === t.row)) ? e : e.concat([t])), []).sort(((e,t)=>e.row - t.row))
          , S = e=>I(e, ((e,t)=>E(e, (e=>e.column === t.column)) ? e : e.concat([t])), []).sort(((e,t)=>e.column - t.column))
          , R = e=>I(e, ((e,t)=>E(e, (e=>he(e.element, t.element))) ? e : e.concat([t])), [])
          , D = e=>{
            const t = i(e.attributes) ? je(e.attributes, ((e,t)=>m(e) ? e=>He(e, t) : o=>$e(o, t, e))) : [];
            return [...t, ...((e,t)=>{
                if (a(e)) {
                    for (let o = 0, n = e.length; o < n; ++o)
                        if (!t(e[o]))
                            return !1;
                    return !0
                }
                return !1
            }
            )(e.classes, c) ? N(e.classes, (e=>t=>((e,t)=>{
                Vr(e) ? e.dom.classList.add(t) : ((e,t)=>{
                    ((e,t,o)=>{
                        const n = $r(e, t).concat([o]);
                        $e(e, t, n.join(" "))
                    }
                    )(e, "class", t)
                }
                )(e, t)
            }
            )(t, e))) : [], t=>{
                const o = Gr(t) || ""
                  , n = (r = e.value,
                f(r) ? String(r) : c(r) ? r : void 0);
                var r;
                const s = c(n) ? n : o;
                Xe(s) ? ((e,t)=>{
                    const o = ge(e).dom
                      , n = Y.fromDom(o.createDocumentFragment())
                      , r = ((e,t)=>{
                        const o = (t || document).createElement("div");
                        return o.innerHTML = e,
                        ye(Y.fromDom(o))
                    }
                    )(t, o);
                    Kt(n, r),
                    Qt(e),
                    qt(e, n)
                }
                )(t, "<br>") : ((e,t)=>{
                    e.dom.textContent = t
                }
                )(t, s)
            }
            ]
        }
          , O = (e,t,o,n,r,s,l,c)=>{
            let i;
            W(t, ((t,a)=>{
                const m = t.element
                  , u = {
                    sectionType: s(a),
                    cellType: oe(m),
                    getRowType: l(a),
                    getColType: c(a),
                    classes: (p = m,
                    Vr(p) ? (e=>{
                        const t = e.dom.classList
                          , o = new Array(t.length);
                        for (let e = 0; e < t.length; e++) {
                            const n = t.item(e);
                            null !== n && (o[e] = n)
                        }
                        return o
                    }
                    )(p) : (e=>$r(e, "class"))(p)),
                    prev: null == i ? void 0 : i.raw,
                    direction: o
                }
                  , d = e(u, n(a), r(a))
                  , h = D(d);
                var p;
                W(h, (e=>e(m))),
                i = d
            }
            ))
        }
          , A = (e,t,o,n,s)=>{
            const l = g(e, s, 0, e.length, s, s, o, n);
            return r(l, t[0].row, t[0].column)
        }
          , k = (e,t,o,n,s)=>{
            const l = x(t)
              , c = S(t)
              , i = g(e, s, l[0].row, l[l.length - 1].row, c[0].column, c[c.length - 1].column, o, n);
            return r(i, t[0].row, t[0].column)
        }
          , M = (e,t,o,n,s)=>{
            const l = u(e, s, o, n);
            return r(l, t.row, t.column)
        }
          , B = (e,t,o,n,s)=>{
            const l = C(e, s, s, s, 0, e[t[0].row].cells.length, o, n);
            return r(l, t[0].row, t[0].column)
        }
          , P = (e,t,o,n,s)=>{
            const l = x(t)
              , c = S(t)
              , i = C(e, s, l[0].row, l[l.length - 1].row, c[0].column, c[c.length - 1].column, o, n);
            return r(i, t[0].row, t[0].column)
        }
          , _ = (e,t,o,n,s)=>{
            const l = d(e, s, o, n);
            return r(l, t.row, t.column)
        }
          , $ = (e,t,o,n)=>{
            const s = St(e).rows
              , l = N(s, (e=>Ct(e, n)))
              , c = R(l)
              , i = xo((()=>Ur(c).getOr("")));
            return O(o, c, "column", y, v(n), (e=>s[e].section), (e=>xo((()=>{
                const t = s[e];
                return Kr([{
                    cells: t.cells,
                    section: t.section
                }]).getOr("")
            }
            ))), (e=>i)),
            r(e, t.row, t.column)
        }
          , G = (e,t,o,n)=>{
            const s = St(e).rows
              , l = s[n]
              , c = R(l.cells)
              , i = xo((()=>Kr([{
                cells: l.cells,
                section: l.section
            }]).getOr("")));
            return O(o, c, "row", v(n), y, (e=>l.section), (e=>i), (e=>xo((()=>{
                const t = N(s, (t=>Ct(t, e)));
                return Ur(t).getOr("")
            }
            )))),
            r(e, t.row, t.column)
        }
          , H = (e,t,o,n,r)=>(s,l,c)=>{
            const i = dr(((r,s)=>e(r, s, t, o, n)), r, b, b, Xo);
            return i(s, l, c)
        }
          , U = (e,t,o,n)=>(r,s,l)=>{
            const c = dr(((n,r)=>e(n, r, t, o)), n, b, b, Xo);
            return c(r, s, l)
        }
          , K = o(_r, T, Ho, Xr)
          , X = o(Fr, (t=>0 == ("table" === oe(jt(e))) || Ar(t).columns > 1), b, Xr);
        return {
            sortColumnRowsAsc: e=>o(H(A, os, !0, e, pr), T, b, Xr),
            sortColumnRowsDesc: e=>o(H(A, os, !1, e, pr), T, b, Xr),
            sortSelectionRowsAsc: e=>o(H(k, os, !0, e, pr), T, b, Xr),
            sortSelectionRowsDesc: e=>o(H(k, os, !1, e, pr), T, b, Xr),
            sortTableRowsAsc: e=>o(H(M, os, !0, e, hr), T, b, Xr),
            sortTableRowsDesc: e=>o(H(M, os, !1, e, hr), T, b, Xr),
            sortRowColumnsAsc: e=>o(H(B, os, !0, e, pr), T, b, Xr),
            sortRowColumnsDesc: e=>o(H(B, os, !1, e, pr), T, b, Xr),
            sortSelectionColumnsAsc: e=>o(H(P, os, !0, e, pr), T, b, Xr),
            sortSelectionColumnsDesc: e=>o(H(P, os, !1, e, pr), T, b, Xr),
            sortTableColumnsAsc: e=>o(H(_, os, !0, e, hr), T, b, Xr),
            sortTableColumnsDesc: e=>o(H(_, os, !1, e, hr), T, b, Xr),
            insertColumnBefore: K,
            deleteColumn: X,
            populateColumn: (e,t)=>o(U($, t, e, hr), T, b, Qr),
            populateRow: (e,t)=>o(U(G, t, e, hr), T, b, Qr)
        }
    }
      , rs = "data-snooker-locked-cols"
      , ss = e=>qe(e, rs).map((e=>z(e.split(","), (e=>{
        const t = parseInt(e, 10);
        return isNaN(t) ? [] : [t]
    }
    )))).getOr([])
      , ls = (e,t)=>$e(e, rs, F(t).join(","))
      , cs = (e,t)=>{
        const o = ss(e);
        A(o, t) || ls(e, o.concat([t]))
    }
      , is = (e,t)=>{
        const o = ss(e);
        ls(e, M(o, (e=>t !== e)))
    }
      , as = "data-snooker-col-series"
      , ms = e=>qe(e, as)
      , us = (e,t)=>H(ms(e).map((e=>e.toLowerCase())), t.toLowerCase())
      , ds = e=>((e,t)=>{
        const o = e.dom;
        return !(!o || !o.hasAttribute) && o.hasAttribute(t)
    }
    )(e, as)
      , hs = e=>{
        const t = rr(e)
          , o = At(e)
          , n = kt(o, 0, 0).bind((e=>{
            const t = e.element;
            return No(Ze(t, "width"), ["fixed"])
        }
        )).map((e=>28 - e.value)).getOr(0);
        ((e,t,o,n,r)=>{
            const s = At(e)
              , l = r.getCellDelta(t)
              , c = r.getWidths(s, r)
              , i = 0 == s.grid.columns - 1
              , a = n.clampTableDelta(c, 0, l, r.minCellWidth(), i)
              , m = ((e,t,o,n,r)=>{
                const s = e.slice(0)
                  , l = ((e,t)=>0 === e.length ? Wr.none() : 1 === e.length ? Wr.only(0) : 0 === t ? Wr.left(0, 1) : t === e.length - 1 ? Wr.right(t - 1, t) : t > 0 && t < e.length - 1 ? Wr.middle(t - 1, t, t + 1) : Wr.none())(e, t)
                  , c = v(N(s, v(0)));
                return l.fold(c, (e=>n.singleColumnWidth(s[e], o)), ((e,t)=>r.calcLeftEdgeDeltas(s, e, t, o, n.minCellWidth(), n.isRelative)), ((e,t,l)=>r.calcMiddleDeltas(s, e, t, l, o, n.minCellWidth(), n.isRelative)), ((e,t)=>r.calcRightEdgeDeltas(s, e, t, o, n.minCellWidth(), n.isRelative)))
            }
            )(c, 0, a, r, n)
              , u = N(m, ((e,t)=>e + c[t]));
            Mr(s, u, r),
            n.resizeTable(r.adjustTableWidth, a, i)
        }
        )(e, n, 0, tn(), t)
    }
      , ps = (e,t,o,n,r)=>{
        ((e,t)=>{
            const o = E(ss(e), (e=>0 === e));
            o && is(e, 0),
            t(),
            o && cs(e, 1)
        }
        )(e, (()=>{
            o.column(0, t.insertColumnBefore, !0, !0),
            hs(e),
            gs(e, t, o, n, r)
        }
        ))
    }
      , gs = (e,t,o,n,r)=>{
        o.table(e, 0, 0, t.populateColumn(0, ((e,t,o)=>{
            const n = r.generator(e, t, o);
            return {
                raw: n,
                value: n.value,
                classes: n.classes,
                attributes: {
                    contenteditable: "false",
                    ...n.attributes,
                    "data-mce-resize": !1 === r.resizable ? "false" : null
                }
            }
        }
        )), !0, !0),
        ((e,t)=>{
            $e(e, as, t)
        }
        )(e, n),
        cs(e, 0)
    }
      , fs = e=>{
        let t = e;
        return {
            get: ()=>t,
            set: e=>{
                t = e
            }
        }
    }
      , ws = e=>ft(It(e), Bt(e))
      , bs = (e,t)=>{
        e.execCommand("mceTableToggleSeries", !1, t)
    }
      , vs = (e,t,o)=>t.onSetupCellOrRowToggle((()=>((e,t)=>ws(e).exists((e=>Xe(t) ? !ds(e) : us(e, t))))(e, o)))
      , ys = (e,t)=>({
        type: "togglemenuitem",
        text: "None",
        onAction: ()=>{
            (e=>ws(e).bind(ms))(e).each((t=>{
                bs(e, {
                    name: t
                })
            }
            ))
        }
        ,
        onSetup: vs(e, t, "")
    })
      , Cs = (e,t,o,n,r)=>({
        type: "togglemenuitem",
        text: o,
        value: n,
        icon: r,
        onAction: ()=>bs(e, {
            name: n
        }),
        onSetup: vs(e, t, n)
    })
      , xs = (e,t,o)=>je(o, ((o,n)=>{
        const r = w.from(o.title).getOrThunk((()=>{
            return "" === (e = n) ? "" : e.charAt(0).toUpperCase() + e.substring(1);
            var e
        }
        ));
        return Cs(e, t, r, n)
    }
    ))
      , Ss = e=>t=>{
        const o = t.getData();
        t.close(),
        e.undoManager.transact((()=>{
            e.execCommand("mceSortTableAdvanced", !1, o),
            e.focus(),
            e.addVisual()
        }
        ))
    }
      , Ts = e=>{
        const t = {
            type: "listbox",
            name: "sortby",
            label: "Sort by",
            items: [{
                text: "Column",
                value: "column"
            }, {
                text: "Row",
                value: "row"
            }]
        }
          , o = fs(w.none())
          , n = t=>({
            type: "listbox",
            name: "roworcol",
            label: "column" === t ? "Column" : "Row",
            items: "column" === t ? (()=>{
                const t = o.get().getOrDie("state must be present")
                  , n = t.limit ? t.finishCol + 1 - t.startCol : t.columns;
                return k(n, (o=>{
                    const n = t.limit ? t.startCol : 0
                      , r = (e=>{
                        let t = e
                          , o = "";
                        for (; Math.floor(t) > 0; )
                            --t,
                            o += String.fromCharCode("A".charCodeAt(0) + t % 26),
                            t /= 26;
                        return o.split("").reverse().join("")
                    }
                    )(o + n + 1);
                    return {
                        text: e.translate(["Column {0}", r]),
                        value: `${o + n}`
                    }
                }
                ))
            }
            )() : (()=>{
                const t = o.get().getOrDie("state must be present")
                  , n = t.limit ? t.finishRow + 1 - t.startRow : t.rows;
                return k(n, (o=>{
                    const n = t.limit ? t.startRow : 0
                      , r = (o + n + 1).toString();
                    return {
                        text: e.translate(["Row {0}", r]),
                        value: `${o + n}`
                    }
                }
                ))
            }
            )()
        })
          , r = e=>({
            type: "listbox",
            name: "sort",
            label: "Sort",
            items: ["column" === e ? {
                text: "Column",
                value: "column"
            } : {
                text: "Row",
                value: "row"
            }, {
                text: "Selection",
                value: "selection"
            }, {
                text: "Table",
                value: "table"
            }]
        })
          , s = {
            type: "listbox",
            name: "order",
            label: "Order",
            items: [{
                text: "Ascending",
                value: "ascending"
            }, {
                text: "Descending",
                value: "descending"
            }]
        }
          , l = e=>({
            type: "panel",
            items: [{
                type: "grid",
                columns: 2,
                items: [t, n(e), r(e), s]
            }]
        })
          , c = e=>({
            title: "Advanced Sort",
            size: "normal",
            body: l(e),
            buttons: [{
                type: "cancel",
                name: "cancel",
                text: "Cancel"
            }, {
                type: "submit",
                name: "sort",
                text: "Sort",
                primary: !0
            }]
        })
          , i = ()=>{
            o.set(w.none())
        }
          , a = (t,n)=>{
            if ("sortby" === n.name) {
                const n = t.getData()
                  , l = (r = n,
                s = o.get().getOrDie("state must be present"),
                "column" === r.sortby ? {
                    sortby: "column",
                    roworcol: `${s.startCol}`,
                    sort: "row" === r.sort ? "column" : r.sort,
                    order: r.order
                } : {
                    sortby: "row",
                    roworcol: `${s.startRow}`,
                    sort: "column" === r.sort ? "row" : r.sort,
                    order: r.order
                })
                  , m = {
                    ...c(n.sortby),
                    onChange: a,
                    onClose: i,
                    onSubmit: Ss(e),
                    initialData: l
                };
                t.redial(m),
                t.focus("sortby")
            }
            var r, s
        }
        ;
        yo(It(e)).each((t=>{
            ft(t, Bt(e)).each((n=>{
                const r = wo(Co(e), n, t)
                  , s = t=>{
                    o.set(w.some(t));
                    const n = {
                        sortby: "column",
                        roworcol: `${t.startCol}`,
                        sort: "column",
                        order: "ascending"
                    }
                      , r = {
                        ...c("column"),
                        onChange: a,
                        onClose: i,
                        onSubmit: Ss(e),
                        initialData: n
                    };
                    e.windowManager.open(r)
                }
                  , l = Ar(n);
                r.mergable.fold((()=>{
                    _t(n, t, t).each((e=>{
                        const t = {
                            ...e,
                            ...l,
                            limit: !1
                        };
                        s(t)
                    }
                    ))
                }
                ), (e=>{
                    const t = {
                        ...e.bounds,
                        ...l,
                        limit: !0
                    };
                    s(t)
                }
                ))
            }
            ))
        }
        ))
    }
      , Rs = (e,t,o,n)=>{
        const r = e=>"selection" === e
          , s = e=>"ascending" === e
          , l = t=>ft(t, Bt(e))
          , i = ()=>yo(It(e), Bt(e)).bind((e=>l(e).bind((t=>_t(t, e, e)))))
          , a = ()=>i().map((e=>e.startCol))
          , m = ()=>i().map((e=>e.startRow));
        e.addCommand("mceSortTableByColumnAsc", (()=>{
            a().each((e=>{
                o.selection(t.sortTableRowsAsc(e))
            }
            ))
        }
        )),
        e.addCommand("mceSortTableByColumnDesc", (()=>{
            a().each((e=>{
                o.selection(t.sortTableRowsDesc(e))
            }
            ))
        }
        )),
        e.addCommand("mceSortTableByRowAsc", (()=>{
            m().each((e=>{
                o.selection(t.sortTableColumnsAsc(e))
            }
            ))
        }
        )),
        e.addCommand("mceSortTableByRowDesc", (()=>{
            m().each((e=>{
                o.selection(t.sortTableColumnsDesc(e))
            }
            ))
        }
        )),
        e.addCommand("mceSortTableAdvanced", ((e,n)=>(e=>{
            const n = parseInt(e.roworcol, 10);
            "column" === e.sortby ? ((e,n)=>{
                (e=>"column" === e)(e.sort) ? s(e.order) ? o.selection(t.sortColumnRowsAsc(n)) : o.selection(t.sortColumnRowsDesc(n)) : r(e.sort) ? s(e.order) ? o.selection(t.sortSelectionRowsAsc(n)) : o.selection(t.sortSelectionRowsDesc(n)) : s(e.order) ? o.selection(t.sortTableRowsAsc(n)) : o.selection(t.sortTableRowsDesc(n))
            }
            )(e, n) : ((e,n)=>{
                (e=>"row" === e)(e.sort) ? s(e.order) ? o.selection(t.sortRowColumnsAsc(n)) : o.selection(t.sortRowColumnsDesc(n)) : r(e.sort) ? s(e.order) ? o.selection(t.sortSelectionColumnsAsc(n)) : o.selection(t.sortSelectionColumnsDesc(n)) : s(e.order) ? o.selection(t.sortTableColumnsAsc(n)) : o.selection(t.sortTableColumnsDesc(n))
            }
            )(e, n)
        }
        )(n))),
        e.addCommand("mceAdvancedTableSort", (()=>Ts(e))),
        e.addCommand("mceTableToggleSeries", ((r,s)=>{
            const i = w.from(s.name).filter(c)
              , a = l(It(e));
            U(i, a, ((e,r)=>{
                us(r, e) ? ((e,t,o)=>{
                    is(e, 0),
                    (e=>{
                        He(e, as)
                    }
                    )(e),
                    o.column(0, t.deleteColumn, !0, !0)
                }
                )(r, t, o) : Pe(n, e).each((n=>{
                    (ds(r) ? gs : ps)(r, t, o, e, n)
                }
                ))
            }
            ))
        }
        ))
    }
      , Ds = e=>{
        const t = fs(w.none())
          , o = fs([]);
        let n = w.none();
        const r = me("caption")
          , s = ()=>vo(It(e), Bt(e)).bind((t=>K(U(ft(t), vo((e=>Y.fromDom(e.selection.getEnd()))(e), Bt(e)).bind(ft), ((o,n)=>he(o, n) ? r(t) ? w.some(fo(t)) : w.some(wo(Co(e), o, t)) : w.none())))))
          , l = e=>ft(e.element).map((t=>{
            const o = At(t)
              , n = pr(o, e).getOr([])
              , r = I(n, ((e,t)=>(t.isLocked && (e.onAny = !0,
            0 === t.column ? e.onFirst = !0 : t.column + t.colspan >= o.grid.columns && (e.onLast = !0)),
            e)), {
                onAny: !1,
                onFirst: !1,
                onLast: !1
            });
            return {
                mergeable: fr(o, e).isSome(),
                unmergeable: wr(o, e).isSome(),
                locked: r
            }
        }
        ))
          , c = ()=>{
            t.set(xo(s)()),
            n = t.get().bind(l),
            W(o.get(), (e=>e()))
        }
          , i = e=>(e(),
        o.set(o.get().concat([e])),
        ()=>{
            o.set(M(o.get(), (t=>t !== e)))
        }
        )
          , a = (e,o)=>i((()=>t.get().fold((()=>{
            e.setEnabled(!1)
        }
        ), (t=>{
            e.setEnabled(!o(t))
        }
        ))));
        return e.on("NodeChange ExecCommand TableSelectorChange", c),
        {
            onSetupTable: e=>a(e, (e=>!1)),
            onSetupCellOrRow: e=>a(e, (e=>r(e.element))),
            onSetupColumn: e=>t=>a(t, (t=>r(t.element) || (e=>n.exists((t=>t.locked[e])))(e))),
            onSetupCellOrRowToggle: e=>o=>((e,o,n)=>i((()=>t.get().fold((()=>{
                e.setEnabled(!1),
                e.setActive(!1)
            }
            ), (t=>{
                e.setEnabled(!(e=>r(e.element))(t)),
                e.setActive(n(t))
            }
            )))))(o, 0, e),
            resetTargets: c,
            targets: ()=>t.get()
        }
    }
    ;
    tinymce.PluginManager.requireLangPack("advtable", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("advtable", (e=>{
        if (((e,o)=>!!e && -1 === ((e,o)=>{
            const n = t(e.major, o.major);
            if (0 !== n)
                return n;
            const r = t(e.minor, o.minor);
            if (0 !== r)
                return r;
            const s = t(e.patch, o.patch);
            return 0 !== s ? s : 0
        }
        )((e=>n((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), n(o)))(tinymce, "6.0.0"))
            return console.error("Please use Enhanced Tables with TinyMCE 6.0.0 or later."),
            {};
        (e=>{
            (0,
            e.options.register)("advtable_value_series", {
                processor: "object",
                default: {
                    numeric: {
                        title: "Numeric",
                        update: !0,
                        resizable: !1,
                        generator: Yr
                    },
                    alpha: {
                        title: "Alpha",
                        update: !0,
                        resizable: !1,
                        generator: Jr
                    }
                }
            })
        }
        )(e);
        const o = ns(e)
          , r = Ds(e)
          , s = (e=>{
            const t = t=>{
                e.focus()
            }
              , o = t=>ft(t, Bt(e))
              , n = (n,r,s,l,c)=>{
                yo(It(e)).each((e=>{
                    o(e).each((o=>{
                        const i = At(o)
                          , a = (e,t)=>Nt(i, e, he).map((e=>e[t]))
                          , m = n.orThunk((()=>a(e, "row")))
                          , u = r.orThunk((()=>a(e, "column")))
                          , d = K(U(m, u, ((e,t)=>kt(i, e, t).map((e=>e.element)))));
                        d.bind((t=>{
                            const n = fo(t);
                            return s(o, n, Q(l, e), !0, c)
                        }
                        )).each(t)
                    }
                    ))
                }
                ))
            }
            ;
            return {
                selection: (n,r)=>{
                    yo(It(e)).each((s=>{
                        o(s).each((o=>{
                            const l = wo(Co(e), o, s);
                            n(o, l, w.none(), !0, r).each(t)
                        }
                        ))
                    }
                    ))
                }
                ,
                row: (e,t,o,r)=>n(w.some(e), w.none(), t, o, r),
                column: (e,t,o,r)=>n(w.none(), w.some(e), t, o, r),
                table: (o,n,r,s,l,c)=>{
                    const i = At(o)
                      , a = kt(i, n, r).map((e=>e.element))
                      , m = yo(It(e))
                      , u = m.bind((e=>Nt(i, e, he))).isSome()
                      , d = a.bind((e=>{
                        const t = fo(e)
                          , n = u && l ? m : w.none();
                        return s(o, t, n, u, c)
                    }
                    ));
                    d.each(t)
                }
            }
        }
        )(e)
          , l = Zr(e);
        return Rs(e, o, s, l),
        ((e,t,o,n)=>{
            const r = ()=>ft(It(e), Bt(e))
              , s = (s,l=T)=>{
                const c = ms(s)
                  , i = c.bind((e=>Pe(n, e)));
                U(c, i, ((n,c)=>{
                    1 === At(s).grid.columns ? r().exists((e=>he(s, e))) ? e.execCommand("mceTableDelete") : e.undoManager.transact((()=>{
                        Xt(s)
                    }
                    )) : !0 === c.update && l() && gs(s, t, o, n, c)
                }
                ))
            }
            ;
            e.on("TableModified", (e=>{
                const t = Y.fromDom(e.table);
                s(t, (()=>!1 !== e.structure))
            }
            )),
            e.on("PreInit", (()=>{
                ((e,t)=>{
                    const o = e=>{
                        const t = [];
                        return h(e) ? t : ((e=>"thead" === e.name || "tbody" === e.name || "tfoot" === e.name)(e) ? t.push(...o(e.firstChild)) : "tr" === e.name && t.push(e),
                        t.concat(o(e.next)))
                    }
                      , n = e=>o(e.firstChild);
                    e.parser.addAttributeFilter(as, (e=>{
                        var o;
                        for (const r of e)
                            if ("table" === r.name) {
                                const e = r.attr(as);
                                if (!1 === (null === (o = t[e]) || void 0 === o ? void 0 : o.resizable)) {
                                    const e = n(r);
                                    for (const t of e)
                                        p(t.firstChild) && t.firstChild.attr("data-mce-resize", "false")
                                }
                            }
                    }
                    ))
                }
                )(e, n)
            }
            )),
            e.on("init", (()=>{
                const t = ()=>{
                    const t = yo(It(e), Bt(e));
                    return e.selection.isCollapsed() && t.exists((t=>e.dom.isEmpty(t.dom)))
                }
                ;
                e.on("ExecCommand", (e=>{
                    const o = e.command.toLowerCase();
                    "delete" !== o && "forwarddelete" !== o || !t() || r().each(s)
                }
                ), !0),
                e.on("keyup", (e=>{
                    const o = e.keyCode;
                    8 !== o && 46 !== o || !t() || r().each(s)
                }
                ))
            }
            ))
        }
        )(e, o, s, l),
        e.hasPlugin("table") && (((e,t)=>{
            const o = (t,o)=>()=>e.execCommand(t, !1, o)
              , n = t.onSetupCellOrRow
              , r = [{
                type: "menuitem",
                text: "Sort table by column ascending",
                onAction: o("mceSortTableByColumnAsc"),
                onSetup: n
            }, {
                type: "menuitem",
                text: "Sort table by column descending",
                onAction: o("mceSortTableByColumnDesc"),
                onSetup: n
            }, {
                type: "separator"
            }, {
                type: "menuitem",
                text: "Advanced sort...",
                onAction: ()=>Ts(e),
                onSetup: n
            }];
            e.ui.registry.addNestedMenuItem("advtablesort", {
                type: "nestedmenuitem",
                text: "Sort",
                getSubmenuItems: v(r)
            });
            const s = Zr(e);
            if (1 === Ie(s)) {
                const o = We(s)[0];
                e.ui.registry.addToggleMenuItem("advtablerownumbering", Cs(e, t, "Row numbering", o, "table-row-numbering"))
            } else
                _e(s) || e.ui.registry.addNestedMenuItem("advtablerownumbering", {
                    type: "nestedmenuitem",
                    text: "Row numbering",
                    icon: "table-row-numbering",
                    getSubmenuItems: ()=>{
                        const o = ys(e, t)
                          , n = xs(e, t, s);
                        return [o].concat(n)
                    }
                })
        }
        )(e, r),
        ((e,t)=>{
            const o = Zr(e);
            if (1 === Ie(o)) {
                const n = We(o)[0];
                e.ui.registry.addToggleButton("advtablerownumbering", {
                    type: "togglebutton",
                    tooltip: "Row numbering",
                    icon: "table-row-numbering",
                    onAction: ()=>bs(e, {
                        name: n
                    }),
                    onSetup: vs(e, t, n)
                })
            } else
                _e(o) || e.ui.registry.addMenuButton("advtablerownumbering", {
                    type: "menubutton",
                    icon: "table-row-numbering",
                    tooltip: "Row numbering",
                    fetch: n=>{
                        const r = ys(e, t)
                          , s = xs(e, t, o);
                        return n([r].concat(s))
                    }
                    ,
                    onSetup: t.onSetupCellOrRow
                })
        }
        )(e, r)),
        {}
    }
    ))
}();
