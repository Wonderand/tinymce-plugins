/*!
 * Tiny Footnotes plugin
 *
 * Copyright (c) 2022 Ephox Corporation DBA Tiny Technologies, Inc.
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
      , r = e=>t=>typeof t === e
      , i = e=>"string" === (e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (o = n = e,
        (r = String).prototype.isPrototypeOf(o) || (null === (i = n.constructor) || void 0 === i ? void 0 : i.name) === r.name) ? "string" : t;
        var o, n, r, i
    }
    )(e)
      , s = r("boolean")
      , a = e=>!(e=>null == e)(e)
      , d = r("function")
      , l = r("number")
      , c = ()=>{}
      , m = e=>()=>e
      , u = (e,t)=>e === t
      , f = m(!1);
    class h {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new h(!0,e)
        }
        static none() {
            return h.singletonNone
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
            return this.tag ? h.some(e(this.value)) : h.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : h.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : h.none()
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
            return a(e) ? h.some(e) : h.none()
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
    h.singletonNone = new h(!1);
    const g = Array.prototype.indexOf
      , p = (e,t)=>{
        return o = e,
        n = t,
        g.call(o, n) > -1;
        var o, n
    }
      , y = (e,t)=>{
        for (let o = 0, n = e.length; o < n; o++)
            if (t(e[o], o))
                return !0;
        return !1
    }
      , v = (e,t)=>{
        const o = e.length
          , n = new Array(o);
        for (let r = 0; r < o; r++) {
            const o = e[r];
            n[r] = t(o, r)
        }
        return n
    }
      , b = (e,t)=>{
        for (let o = 0, n = e.length; o < n; o++)
            t(e[o], o)
    }
      , x = (e,t)=>{
        const o = [];
        for (let n = 0, r = e.length; n < r; n++) {
            const r = e[n];
            t(r, n) && o.push(r)
        }
        return o
    }
      , w = (e,t,o)=>(b(e, ((e,n)=>{
        o = t(o, e, n)
    }
    )),
    o)
      , T = e=>{
        const t = []
          , o = e=>{
            t.push(e)
        }
        ;
        for (let t = 0; t < e.length; t++)
            e[t].each(o);
        return t
    }
      , I = (e,t)=>k(e, t) ? ((e,t)=>e.substring(t))(e, t.length) : e
      , k = (e,t)=>((e,t,o)=>"" === t || e.length >= t.length && e.substr(0, 0 + t.length) === t)(e, t)
      , P = (D = /^\s+|\s+$/g,
    e=>e.replace(D, ""));
    var D;
    const S = "\xa0"
      , C = Object.keys
      , N = Object.hasOwnProperty
      , E = (e,t)=>N.call(e, t);
    "undefined" != typeof window ? window : Function("return this;")();
    const $ = e=>e.dom.nodeName.toLowerCase()
      , W = e=>e.dom.nodeType
      , A = e=>t=>W(t) === e
      , B = A(1)
      , F = A(3)
      , _ = A(9)
      , M = A(11)
      , O = (e,t,o)=>{
        if (!(i(o) || s(o) || l(o)))
            throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", o, ":: Element ", e),
            new Error("Attribute value was not simple");
        e.setAttribute(t, o + "")
    }
      , U = (e,t,o)=>{
        O(e.dom, t, o)
    }
      , j = (e,t)=>{
        const o = e.dom;
        ((e,t)=>{
            const o = C(e);
            for (let n = 0, r = o.length; n < r; n++) {
                const r = o[n];
                t(e[r], r)
            }
        }
        )(t, ((e,t)=>{
            O(o, t, e)
        }
        ))
    }
      , L = (e,t)=>{
        const o = e.dom.getAttribute(t);
        return null === o ? void 0 : o
    }
      , V = (e,t)=>h.from(L(e, t))
      , R = (e,t)=>{
        e.dom.removeAttribute(t)
    }
      , q = e=>{
        if (null == e)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: e
        }
    }
      , H = {
        fromHtml: (e,t)=>{
            const o = (t || document).createElement("div");
            if (o.innerHTML = e,
            !o.hasChildNodes() || o.childNodes.length > 1) {
                const t = "HTML does not have a single root node";
                throw console.error(t, e),
                new Error(t)
            }
            return q(o.childNodes[0])
        }
        ,
        fromTag: (e,t)=>{
            const o = (t || document).createElement(e);
            return q(o)
        }
        ,
        fromText: (e,t)=>{
            const o = (t || document).createTextNode(e);
            return q(o)
        }
        ,
        fromDom: q,
        fromPoint: (e,t,o)=>h.from(e.dom.elementFromPoint(t, o)).map(q)
    }
      , z = (e,t)=>{
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
      , K = e=>1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType || 0 === e.childElementCount
      , G = (e,t)=>e.dom === t.dom
      , J = z
      , Q = e=>void 0 !== e.style && d(e.style.getPropertyValue)
      , X = e=>H.fromDom(e.dom.ownerDocument)
      , Y = e=>h.from(e.dom.parentNode).map(H.fromDom)
      , Z = e=>h.from(e.dom.nextSibling).map(H.fromDom)
      , ee = e=>v(e.dom.childNodes, H.fromDom)
      , te = e=>H.fromDom(e.dom.host)
      , oe = e=>{
        const t = F(e) ? e.dom.parentNode : e.dom;
        if (null == t || null === t.ownerDocument)
            return !1;
        const o = t.ownerDocument;
        return (e=>{
            const t = (e=>H.fromDom(e.dom.getRootNode()))(e);
            return M(o = t) && a(o.dom.host) ? h.some(t) : h.none();
            var o
        }
        )(H.fromDom(t)).fold((()=>o.body.contains(t)), (n = oe,
        r = te,
        e=>n(r(e))));
        var n, r
    }
      , ne = (e,t)=>Q(e) ? e.style.getPropertyValue(t) : ""
      , re = (e,t)=>{
        Y(e).each((o=>{
            o.dom.insertBefore(t.dom, e.dom)
        }
        ))
    }
      , ie = (e,t)=>{
        Z(e).fold((()=>{
            Y(e).each((e=>{
                se(e, t)
            }
            ))
        }
        ), (e=>{
            re(e, t)
        }
        ))
    }
      , se = (e,t)=>{
        e.dom.appendChild(t.dom)
    }
      , ae = (e,t)=>{
        b(t, ((o,n)=>{
            const r = 0 === n ? e : t[n - 1];
            ie(r, o)
        }
        ))
    }
      , de = (e,t)=>{
        b(t, (t=>{
            se(e, t)
        }
        ))
    }
      , le = (e,t)=>{
        let o = [];
        return b(ee(e), (e=>{
            t(e) && (o = o.concat([e])),
            o = o.concat(le(e, t))
        }
        )),
        o
    }
      , ce = (e,t,o)=>{
        let n = e.dom;
        const r = d(o) ? o : f;
        for (; n.parentNode; ) {
            n = n.parentNode;
            const e = H.fromDom(n);
            if (t(e))
                return h.some(e);
            if (r(e))
                break
        }
        return h.none()
    }
      , me = e=>{
        e.dom.textContent = "",
        b(ee(e), (e=>{
            ue(e)
        }
        ))
    }
      , ue = e=>{
        const t = e.dom;
        null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , fe = (e,t)=>((e,o)=>x(ee(e), (e=>z(e, t))))(e)
      , he = (e,t)=>((e,t)=>{
        const o = void 0 === t ? document : t.dom;
        return K(o) ? [] : v(o.querySelectorAll(e), H.fromDom)
    }
    )(t, e)
      , ge = (e,t,o)=>ce(e, (e=>z(e, t)), o)
      , pe = (e,t)=>((e,o)=>{
        return (n = e.dom.childNodes,
        r = e=>{
            return o = H.fromDom(e),
            z(o, t);
            var o
        }
        ,
        ((e,t,o)=>{
            for (let n = 0, r = e.length; n < r; n++) {
                const r = e[n];
                if (t(r, n))
                    return h.some(r);
                if (o(r, n))
                    break
            }
            return h.none()
        }
        )(n, r, f)).map(H.fromDom);
        var n, r
    }
    )(e)
      , ye = (e,t)=>((e,t)=>{
        const o = void 0 === t ? document : t.dom;
        return K(o) ? h.none() : h.from(o.querySelector(e)).map(H.fromDom)
    }
    )(t, e)
      , ve = ((e,t)=>{
        const o = t=>e(t) ? h.from(t.dom.nodeValue) : h.none();
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
    )(F);
    var be = ["body", "p", "div", "article", "aside", "figcaption", "figure", "footer", "header", "nav", "section", "ol", "ul", "li", "table", "thead", "tbody", "tfoot", "caption", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "address"];
    const xe = (e,t)=>({
        element: e,
        offset: t
    })
      , we = (e,t,o)=>e.property().isText(t) && 0 === e.property().getText(t).trim().length || e.property().isComment(t) ? o(t).bind((t=>we(e, t, o).orThunk((()=>h.some(t))))) : h.none()
      , Te = (e,t)=>e.property().isText(t) ? e.property().getText(t).length : e.property().children(t).length
      , Ie = (e,t)=>{
        const o = we(e, t, e.query().prevSibling).getOr(t);
        if (e.property().isText(o))
            return xe(o, Te(e, o));
        const n = e.property().children(o);
        return n.length > 0 ? Ie(e, n[n.length - 1]) : xe(o, Te(e, o))
    }
      , ke = Ie
      , Pe = {
        up: m({
            selector: ge,
            closest: (e,t,o)=>((e,t,o,n,r)=>((e,t)=>z(e, t))(o, n) ? h.some(o) : d(r) && r(o) ? h.none() : t(o, n, r))(0, ge, e, t, o),
            predicate: ce,
            all: (e,t)=>{
                const o = d(t) ? t : f;
                let n = e.dom;
                const r = [];
                for (; null !== n.parentNode && void 0 !== n.parentNode; ) {
                    const e = n.parentNode
                      , t = H.fromDom(e);
                    if (r.push(t),
                    !0 === o(t))
                        break;
                    n = e
                }
                return r
            }
        }),
        down: m({
            selector: he,
            predicate: le
        }),
        styles: m({
            get: (e,t)=>{
                const o = e.dom
                  , n = window.getComputedStyle(o).getPropertyValue(t);
                return "" !== n || oe(e) ? n : ne(o, t)
            }
            ,
            getRaw: (e,t)=>{
                const o = e.dom
                  , n = ne(o, t);
                return h.from(n).filter((e=>e.length > 0))
            }
            ,
            set: (e,t,o)=>{
                ((e,t,o)=>{
                    if (!i(o))
                        throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", o, ":: Element ", e),
                        new Error("CSS value must be a string: " + o);
                    Q(e) && e.style.setProperty(t, o)
                }
                )(e.dom, t, o)
            }
            ,
            remove: (e,t)=>{
                ((e,t)=>{
                    Q(e) && e.style.removeProperty(t)
                }
                )(e.dom, t),
                ((e,t,o=u)=>e.exists((e=>o(e, t))))(V(e, "style").map(P), "") && R(e, "style")
            }
        }),
        attrs: m({
            get: L,
            set: U,
            remove: R,
            copyTo: (e,t)=>{
                const o = w(e.dom.attributes, ((e,t)=>(e[t.name] = t.value,
                e)), {});
                j(t, o)
            }
        }),
        insert: m({
            before: re,
            after: ie,
            afterAll: ae,
            append: se,
            appendAll: de,
            prepend: (e,t)=>{
                (e=>((e,t)=>{
                    const o = e.dom.childNodes;
                    return h.from(o[0]).map(H.fromDom)
                }
                )(e))(e).fold((()=>{
                    se(e, t)
                }
                ), (o=>{
                    e.dom.insertBefore(t.dom, o.dom)
                }
                ))
            }
            ,
            wrap: (e,t)=>{
                re(e, t),
                se(t, e)
            }
        }),
        remove: m({
            unwrap: e=>{
                const t = ee(e);
                t.length > 0 && ae(e, t),
                ue(e)
            }
            ,
            remove: ue
        }),
        create: m({
            nu: H.fromTag,
            clone: e=>H.fromDom(e.dom.cloneNode(!1)),
            text: H.fromText
        }),
        query: m({
            comparePosition: (e,t)=>e.dom.compareDocumentPosition(t.dom),
            prevSibling: e=>h.from(e.dom.previousSibling).map(H.fromDom),
            nextSibling: Z
        }),
        property: m({
            children: ee,
            name: $,
            parent: Y,
            document: e=>{
                return (t = e,
                _(t) ? t : X(t)).dom;
                var t
            }
            ,
            isText: F,
            isComment: e=>8 === W(e) || "#comment" === $(e),
            isElement: B,
            isSpecial: e=>{
                const t = $(e);
                return p(["script", "noscript", "iframe", "noframes", "noembed", "title", "style", "textarea", "xmp"], t)
            }
            ,
            getLanguage: e=>B(e) ? V(e, "lang") : h.none(),
            getText: e=>ve.get(e),
            setText: (e,t)=>ve.set(e, t),
            isBoundary: e=>!!B(e) && ("body" === $(e) || p(be, $(e))),
            isEmptyTag: e=>!!B(e) && p(["br", "img", "hr", "input"], $(e)),
            isNonEditable: e=>B(e) && "false" === L(e, "contenteditable")
        }),
        eq: G,
        is: J
    }
      , De = (e,t)=>{
        (e=>void 0 !== e.dom.classList)(e) ? e.dom.classList.add(t) : ((e,t)=>{
            ((e,t,o)=>{
                const n = ((e,t)=>{
                    const o = L(e, t);
                    return void 0 === o || "" === o ? [] : o.split(" ")
                }
                )(e, t)
                  , r = n.concat([o]);
                U(e, t, r.join(" "))
            }
            )(e, "class", t)
        }
        )(e, t)
    }
      , Se = e=>e.dom.innerHTML
      , Ce = (e,t,o)=>ge(e, t, o).isSome()
      , Ne = (e,t)=>{
        e.dom.textContent = t
    }
      , Ee = "footnote"
      , $e = "mce-footnote"
      , We = "mce-footnotes"
      , Ae = "footnotes_entry"
      , Be = "mce-footnotes-backlink"
      , Fe = "mce-footnotes-note"
      , _e = "sup"
      , Me = "div"
      , Oe = "li"
      , Ue = "span"
      , je = '[contenteditable="false"]'
      , Le = e=>`${_e}.${$e}${i(e) ? `#${e}` : ""}${je}`
      , Ve = `${Me}.${We}${je}`
      , Re = e=>`${Oe}#${e}`
      , qe = `a.${Be}`
      , He = `${Ue}.${Fe}[contenteditable="true"]`
      , ze = e=>`${Ee}_${e}`
      , Ke = e=>`${Ae}_${e}`
      , Ge = e=>t=>I(t, e + "_")
      , Je = Ge(Ee)
      , Qe = Ge(Ae)
      , Xe = e=>e.startsWith(Ee + "_")
      , Ye = e=>e.startsWith(Ae + "_")
      , Ze = e=>{
        const t = e.getBody()
          , o = e.selection.getStart()
          , n = `${Ve} ${Oe}`;
        return h.from(e.dom.getParent(o, n, t)).bind((o=>h.from(e.dom.getParent(o, Ve, t)).map((e=>({
            section: H.fromDom(e),
            entry: H.fromDom(o)
        })))))
    }
      , et = (tt = e=>a(e.dom.getParent(e.selection.getStart(), Ve, e.getBody())),
    e=>!tt(e));
    var tt;
    const ot = e=>H.fromDom(e.getBody())
      , nt = (rt = Oe,
    e=>B(e) && $(e) === rt);
    var rt;
    const it = e=>ye(e, Ve)
      , st = e=>pe(e, "ol")
      , at = e=>pe(e, He)
      , dt = e=>V(e, "id").filter(Ye)
      , lt = e=>nt(e) && dt(e).isSome() && Ce(e, Ve)
      , ct = (e,t)=>it(ot(e)).bind(st).bind((e=>((e,t)=>pe(e, Re(t)))(e, t))).bind(at).each((t=>{
        mt(e, t),
        e.selection.scrollIntoView(void 0, !0)
    }
    ))
      , mt = (e,t)=>{
        const o = e.dom.createRng()
          , n = ke(Pe, t);
        o.setStart(n.element.dom, n.offset),
        o.setEnd(n.element.dom, n.offset),
        e.selection.setRng(o)
    }
      , ut = e=>dt(e).bind((t=>at(e).map(Se).bind((o=>{
        return (n = e,
        pe(n, qe)).bind((e=>V(e, "href"))).map((e=>({
            entryIdWithPrefix: t,
            note: o,
            backlinkIdWithPrefix: e
        })));
        var n
    }
    ))))
      , ft = e=>{
        const t = H.fromTag(Oe)
          , o = H.fromTag("a");
        De(o, Be),
        Ne(o, `^${S}`);
        const n = H.fromTag(Ue);
        De(n, Fe),
        U(n, "contenteditable", !0);
        return ((e,t)=>{
            const o = X(e).dom
              , n = H.fromDom(o.createDocumentFragment())
              , r = ((e,t)=>{
                const o = (t || document).createElement("div");
                return o.innerHTML = e,
                ee(H.fromDom(o))
            }
            )(t, o);
            de(n, r),
            me(e),
            se(e, n)
        }
        )(n, e.note.length > 0 ? e.note : '<br data-mce-bogus="1">'),
        se(t, o),
        se(t, n),
        U(t, "id", e.entryIdWithPrefix),
        U(o, "href", e.backlinkIdWithPrefix),
        t
    }
    ;
    let ht = 0;
    const gt = e=>{
        const t = he(e, Le());
        return x(t, (t=>{
            return n = e,
            !(((e,t)=>{
                const o = e.dom;
                return !(!o || !o.hasAttribute) && o.hasAttribute("data-mce-bogus")
            }
            )(o = t) || Ce(o, '[data-mce-bogus="all"]', (e=>t=>G(t, e))(n)));
            var o, n
        }
        ))
    }
      , pt = e=>ye(e, "a")
      , yt = ()=>(e=>{
        const t = (new Date).getTime()
          , o = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 * 1e9);
        return ht++,
        e + "_" + o + ht + String(t)
    }
    )(Ee)
      , vt = e=>{
        return (t = e,
        V(t, "id").filter(Xe)).bind((t=>pt(e).bind((e=>(e=>V(e, "data-mce-href").orThunk((()=>V(e, "href"))).bind((e=>{
            return t = e,
            k(e, "#") ? h.some(t) : h.none();
            var t
        }
        )))(e).map((o=>{
            var n, r;
            return {
                footnoteIdWithPrefix: t,
                symbol: null !== (r = e,
                n = r.dom.textContent) && void 0 !== n ? n : "",
                forwardlinkIdWithPrefix: o
            }
        }
        ))))));
        var t
    }
      , bt = (e,t,o)=>{
        U(e, "id", o.footnoteIdWithPrefix),
        Ne(t, o.symbol),
        U(t, "href", o.forwardlinkIdWithPrefix),
        U(t, "data-mce-href", o.forwardlinkIdWithPrefix)
    }
      , xt = (e,t)=>{
        const o = gt(e)
          , n = x(o, (e=>vt(e).isSome()));
        b(n, ((e,o)=>{
            var n, r;
            n = e,
            r = t[o],
            pt(n).each((e=>{
                bt(n, e, r)
            }
            ))
        }
        ))
    }
      , wt = (e,t,o)=>{
        const n = w(t, ((e,t)=>({
            ...e,
            [Qe(t.entryIdWithPrefix)]: t
        })), {})
          , r = w(e, ((e,t,r)=>{
            const i = Je(t.footnoteIdWithPrefix)
              , s = {
                newBaseId: E(e.existingIds, i) ? Je(o(i)) : i,
                note: (a = n,
                d = i,
                E(a, d) ? h.from(a[d]) : h.none()).map((e=>e.note)).getOr(""),
                symbol: String(r + 1)
            };
            var a, d;
            return {
                intexts: e.intexts.concat([s]),
                existingIds: {
                    ...e.existingIds,
                    [i]: !0
                }
            }
        }
        ), {
            existingIds: {},
            intexts: []
        })
          , i = v(r.intexts, (e=>({
            note: e.note,
            entryIdWithPrefix: Ke(e.newBaseId),
            backlinkIdWithPrefix: `#${ze(e.newBaseId)}`
        })));
        return {
            intext: v(r.intexts, (e=>({
                footnoteIdWithPrefix: ze(e.newBaseId),
                forwardlinkIdWithPrefix: `#${Ke(e.newBaseId)}`,
                symbol: e.symbol
            }))),
            entries: i
        }
    }
      , Tt = (e,t)=>{
        (e=>{
            b(gt(e), ue)
        }
        )(t);
        const o = (e=>{
            const t = e.getBody();
            return it(H.fromDom(t)).bind((t=>{
                if ("1" === L(t, "data-mce-selected") || ((e,t)=>Ze(e).filter((({section: e})=>G(t, e))).isSome())(e, t)) {
                    const o = e.dom.createRng();
                    return o.setStartBefore(t.dom),
                    o.setEndBefore(t.dom),
                    ue(t),
                    h.some(o)
                }
                return ue(t),
                h.none()
            }
            ))
        }
        )(e);
        e.dom.isEmpty(e.getBody()) ? (e.setContent(""),
        e.selection.setCursorLocation()) : o.each(e.selection.setRng)
    }
      , It = (e,t)=>{
        const o = ot(e)
          , {addUndo: n, isDeleteTrigger: r} = t
          , i = (e=>{
            const t = gt(e);
            return T(v(t, vt))
        }
        )(o)
          , s = (e=>{
            const t = it(e)
              , o = (e=>it(e).bind(st).map((e=>fe(e, Oe))).getOr([]))(e);
            return t.map((e=>({
                entries: T(v(o, ut))
            })))
        }
        )(o)
          , a = ((e,t,o)=>e.section.fold((()=>e.intext.length > 0 ? o ? {
            kind: "remove-footnotes"
        } : ((e,t)=>{
            const {intext: o, entries: n} = wt(e, [], t);
            return {
                kind: "insert-footnotes",
                newFootnotes: {
                    intext: o,
                    entries: n
                }
            }
        }
        )(e.intext, t) : {
            kind: "noop-footnotes"
        }), (o=>e.intext.length > 0 ? ((e,t,o)=>{
            const {intext: n, entries: r} = wt(e, t, o);
            return n.length !== e.length || y(n, ((t,o)=>t.footnoteIdWithPrefix !== e[o].footnoteIdWithPrefix || t.symbol !== e[o].symbol || t.forwardlinkIdWithPrefix !== e[o].forwardlinkIdWithPrefix)) || r.length !== t.length || y(r, ((e,o)=>e.entryIdWithPrefix !== t[o].entryIdWithPrefix || e.backlinkIdWithPrefix !== t[o].backlinkIdWithPrefix || e.note !== t[o].note)) ? {
                kind: "update-footnotes",
                newFootnotes: {
                    intext: n,
                    entries: r
                }
            } : {
                kind: "noop-footnotes"
            }
        }
        )(e.intext, o.entries, t) : {
            kind: "remove-footnotes"
        })))({
            intext: i,
            section: s
        }, yt, r)
          , d = n ? e.undoManager.transact : e.undoManager.ignore;
        switch (a.kind) {
        case "noop-footnotes":
            return;
        case "remove-footnotes":
            return void d((()=>{
                Tt(e, o)
            }
            ));
        case "insert-footnotes":
            return void d((()=>{
                xt(o, a.newFootnotes.intext),
                ((e,t)=>{
                    const o = (e=>{
                        const t = (()=>{
                            const e = H.fromTag(Me);
                            return j(e, {
                                contentEditable: !1
                            }),
                            De(e, We),
                            e
                        }
                        )()
                          , o = H.fromTag("hr")
                          , n = H.fromTag("ol");
                        return de(n, e),
                        se(t, o),
                        se(t, n),
                        t
                    }
                    )(v(t, ft));
                    se(e, o)
                }
                )(o, a.newFootnotes.entries)
            }
            ));
        case "update-footnotes":
            return void d((()=>{
                xt(o, a.newFootnotes.intext),
                ((e,t)=>{
                    Ze(e).bind((({entry: e, section: t})=>dt(e).map((e=>({
                        entryId: e,
                        section: t
                    }))))).filter((({section: t})=>it(ot(e)).exists((e=>G(e, t))))).fold((()=>t()), (o=>{
                        const n = t()
                          , r = `${Re(o.entryId)} ${He}`;
                        return ye(o.section, r).orThunk((()=>{
                            const e = `${Oe} ${He}`;
                            return ye(o.section, e)
                        }
                        )).each((t=>mt(e, t))),
                        n
                    }
                    ))
                }
                )(e, (()=>{
                    ((e,t)=>{
                        const o = v(t, ft);
                        it(e).bind(st).each((e=>{
                            me(e),
                            de(e, o)
                        }
                        ))
                    }
                    )(o, a.newFootnotes.entries)
                }
                ))
            }
            ))
        }
    }
      , kt = e=>{
        e.addCommand("mceInsertFootnote", ((t,o)=>{
            e.selection.isEditable() && (e=>{
                et(e) && e.undoManager.transact((()=>{
                    const t = (e=>{
                        const t = yt()
                          , o = Je(t);
                        return e.undoManager.ignore((()=>{
                            const o = ((e,t)=>{
                                const o = H.fromTag(_e);
                                U(o, "contenteditable", "false"),
                                De(o, $e);
                                const n = H.fromTag("a");
                                return se(o, n),
                                bt(o, n, {
                                    footnoteIdWithPrefix: e,
                                    symbol: t,
                                    forwardlinkIdWithPrefix: `#${Ke(Je(e))}`
                                }),
                                o
                            }
                            )(t, S)
                              , n = (e=>{
                                const t = H.fromTag("div")
                                  , o = H.fromDom(e.dom.cloneNode(!0));
                                return se(t, o),
                                Se(t)
                            }
                            )(o);
                            e.selection.collapse(!1),
                            e.insertContent(n, {
                                no_events: !0
                            })
                        }
                        )),
                        o
                    }
                    )(e);
                    It(e, {
                        addUndo: !1,
                        isDeleteTrigger: !1
                    }),
                    ct(e, Ke(t))
                }
                ))
            }
            )(e)
        }
        )),
        e.addCommand("mceUpdateFootnotes", ((t,o)=>{
            e.selection.isEditable() && It(e, {
                addUndo: !0,
                isDeleteTrigger: !1
            })
        }
        ))
    }
      , Pt = tinymce.util.VK
      , Dt = e=>l(null == e ? void 0 : e.nodeType)
      , St = e=>{
        e.on("init", (()=>{
            e.on("click", (t=>{
                h.from(t.target).filter(Dt).bind((t=>((e,t)=>h.from(e.dom.getParent(t, "a[href]")).map(H.fromDom))(e, t))).each((o=>{
                    const n = ((e,t,o)=>V(t, "href").filter((e=>/^#/.test(e))).map((e=>I(e, "#"))).exists((t=>Xe(t) ? (((e,t)=>{
                        ((e,t)=>ye(e, Le(t)))(ot(e), t).each((t=>e.selection.scrollIntoView(t.dom, !0)))
                    }
                    )(e, t),
                    !0) : !(!Ye(t) || !o || (ct(e, t),
                    0)))))(e, o, Pt.metaKeyPressed(t));
                    n && t.preventDefault()
                }
                ))
            }
            ))
        }
        ))
    }
      , Ct = tinymce.html.Node
      , Nt = e=>{
        var t, o;
        return null !== (o = null === (t = e.attr("class")) || void 0 === t ? void 0 : t.split(" ")) && void 0 !== o ? o : []
    }
      , Et = (e,t)=>{
        const o = Nt(e).concat(t);
        e.attr("class", o.join(" "))
    }
      , $t = e=>{
        const t = new Ct("br",1);
        t.attr("data-mce-bogus", "1"),
        e.empty(),
        e.append(t)
    }
      , Wt = e=>{
        const t = new Ct("#text",3);
        t.value = S,
        e.empty(),
        e.append(t)
    }
      , At = e=>e.name === Me && p(Nt(e), We)
      , Bt = e=>{
        const t = e.attr("id");
        return e.name === Oe && a(t) && Ye(t)
    }
      , Ft = e=>{
        const t = e.attr("id");
        return e.name === _e && a(t) && Xe(t)
    }
      , _t = e=>{
        let t = e.parent;
        for (; a(t); ) {
            if (At(t))
                return t;
            t = t.parent
        }
    }
      , Mt = e=>{
        const t = e.children();
        for (let e = t.length - 1; e >= 0; e--) {
            const n = t[e];
            if ((o = n).name === Ue && p(Nt(o), Fe))
                return n
        }
        var o
    }
      , Ot = e=>{
        const t = []
          , o = [];
        for (let n = 0; n < e.length; n++) {
            const r = e[n];
            if (Bt(r)) {
                const e = _t(r);
                if (a(e)) {
                    const t = o.find((t=>t.node === e));
                    a(t) ? t.entries.push(r) : o.push({
                        node: e,
                        entries: [r]
                    })
                }
            } else
                Ft(r) && t.push(r)
        }
        return {
            intextFootnotes: t,
            footnotesSections: o
        }
    }
      , Ut = e=>l(null == e ? void 0 : e.nodeType);
    tinymce.PluginManager.requireLangPack("footnotes", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("footnotes", (e=>{
        ((e,o)=>!!e && -1 === ((e,o)=>{
            const n = t(e.major, o.major);
            if (0 !== n)
                return n;
            const r = t(e.minor, o.minor);
            if (0 !== r)
                return r;
            const i = t(e.patch, o.patch);
            return 0 !== i ? i : 0
        }
        )((e=>n((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), n(o)))(tinymce, "6.4.0") ? console.error("The footnotes plugin requires at least version 6.4.0 of TinyMCE.") : (kt(e),
        (e=>{
            const t = ()=>e.execCommand("mceInsertFootnote")
              , o = ()=>e.execCommand("mceUpdateFootnotes")
              , n = t=>{
                const o = ()=>t.setEnabled(e.selection.isEditable() && et(e));
                return o(),
                e.on("NodeChange", o),
                ()=>e.off("NodeChange", o)
            }
            ;
            e.ui.registry.addButton("footnotes", {
                icon: "footnote",
                tooltip: "Insert footnote",
                onAction: t,
                onSetup: n
            }),
            e.ui.registry.addMenuItem("footnotes", {
                icon: "footnote",
                text: "Insert footnote",
                onAction: t,
                onSetup: n
            }),
            e.ui.registry.addButton("footnotesupdate", {
                icon: "reload",
                tooltip: "Update footnotes",
                onAction: o
            }),
            e.ui.registry.addMenuItem("footnotesupdate", {
                icon: "reload",
                text: "Update footnotes",
                onAction: o
            })
        }
        )(e),
        (e=>{
            e.on("PreInit", (()=>{
                e.serializer.addAttributeFilter("id", (e=>{
                    const t = Ot(e);
                    for (const e of t.intextFootnotes)
                        e.attr("contenteditable", null);
                    for (const e of t.footnotesSections) {
                        const t = e.node
                          , o = e.entries;
                        t.attr("contenteditable", null);
                        for (const e of o) {
                            const t = Mt(e);
                            if (a(t))
                                t.attr("contenteditable", null);
                            else {
                                const t = new Ct(Ue,1);
                                Et(t, [Fe]),
                                Wt(t),
                                e.append(t)
                            }
                        }
                    }
                }
                )),
                e.parser.addAttributeFilter("id", (e=>{
                    var t;
                    const o = Ot(e);
                    for (const e of o.intextFootnotes)
                        e.attr("contenteditable", "false");
                    for (const e of o.footnotesSections) {
                        const o = e.node
                          , n = e.entries;
                        o.attr("contenteditable", "false");
                        for (const e of n) {
                            const o = Mt(e);
                            a(o) && (o.firstChild === o.lastChild && (null === (t = o.firstChild) || void 0 === t ? void 0 : t.value) === S && $t(o),
                            o.attr("contenteditable", "true"))
                        }
                    }
                }
                ))
            }
            ))
        }
        )(e),
        St(e),
        (e=>{
            e.on("PreInit", (()=>{
                e.on("mousedown tap", (t=>{
                    h.from(t.target).filter(Ut).map(H.fromDom).filter(lt).filter((t=>at(t).exists((t=>e.dom.isEmpty(t.dom))))).bind(dt).each((o=>{
                        t.preventDefault(),
                        ct(e, o)
                    }
                    ))
                }
                ))
            }
            ))
        }
        )(e),
        (e=>{
            const t = (()=>{
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
                    )(h.none())
                      , o = ()=>t.get().each(e);
                    return {
                        clear: ()=>{
                            o(),
                            t.set(h.none())
                        }
                        ,
                        isSet: ()=>t.get().isSome(),
                        get: ()=>t.get(),
                        set: e=>{
                            o(),
                            t.set(h.some(e))
                        }
                    }
                }
                )(c);
                return {
                    ...e,
                    on: t=>e.get().each(t)
                }
            }
            )();
            e.on("ExecCommand", (t=>{
                const o = t.command.toLowerCase();
                "delete" !== o && "forwarddelete" !== o || It(e, {
                    addUndo: !1,
                    isDeleteTrigger: !0
                })
            }
            ), !0),
            e.on("input", (o=>{
                var n;
                ("insertParagraph" === (n = o.inputType) || "insertLineBreak" === n || "insertFromPaste" === n || "insertFromDrop" === n || "insertReplacementText" === n) && (It(e, {
                    addUndo: !1,
                    isDeleteTrigger: !0
                }),
                t.clear())
            }
            )),
            e.on("keydown", (()=>{
                t.set(!e.selection.isCollapsed())
            }
            ), !0),
            e.on("keyup", (o=>{
                const n = o.keyCode
                  , r = 8 === n || 46 === n;
                (t.get().getOr(!1) || r) && It(e, {
                    addUndo: !1,
                    isDeleteTrigger: !0
                }),
                t.clear()
            }
            )),
            e.on("dragend", (()=>{
                It(e, {
                    addUndo: !1,
                    isDeleteTrigger: !1
                })
            }
            )),
            e.on("SetContent", (t=>{
                "raw" !== t.format && It(e, {
                    addUndo: !1,
                    isDeleteTrigger: !t.set
                })
            }
            ))
        }
        )(e))
    }
    ))
}();
