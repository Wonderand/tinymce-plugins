/*!
 * Tiny Templates plugin
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
        const a = e - t;
        return 0 === a ? 0 : a > 0 ? 1 : -1
    }
      , a = (e,t,a)=>({
        major: e,
        minor: t,
        patch: a
    })
      , n = t=>{
        const n = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t);
        return n ? a(e(n[1]), e(n[2]), e(n[3])) : a(0, 0, 0)
    }
      , o = e=>t=>(e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (a = n = e,
        (o = String).prototype.isPrototypeOf(a) || (null === (r = n.constructor) || void 0 === r ? void 0 : r.name) === o.name) ? "string" : t;
        var a, n, o, r
    }
    )(t) === e
      , r = e=>t=>typeof t === e
      , i = o("string")
      , l = o("object")
      , s = o("array")
      , c = r("boolean")
      , m = (void 0,
    e=>undefined === e);
    const d = e=>null == e
      , p = e=>!d(e)
      , u = r("function")
      , g = r("number")
      , y = e=>{
        let t = e;
        return {
            get: ()=>t,
            set: e=>{
                t = e
            }
        }
    }
      , v = ()=>{}
      , h = e=>()=>e
      , f = e=>e
      , _ = e=>e()
      , b = h(!1)
      , w = h(!0);
    class x {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new x(!0,e)
        }
        static none() {
            return x.singletonNone
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
            return this.tag ? x.some(e(this.value)) : x.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : x.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : x.none()
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
            return p(e) ? x.some(e) : x.none()
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
    x.singletonNone = new x(!1);
    const C = Array.prototype.slice
      , S = Array.prototype.indexOf
      , A = Array.prototype.push
      , E = (e,t)=>((e,t)=>S.call(e, t))(e, t) > -1
      , T = (e,t)=>{
        const a = e.length
          , n = new Array(a);
        for (let o = 0; o < a; o++) {
            const a = e[o];
            n[o] = t(a, o)
        }
        return n
    }
      , D = (e,t)=>{
        for (let a = 0, n = e.length; a < n; a++)
            t(e[a], a)
    }
      , O = (e,t)=>{
        for (let a = 0, n = e.length; a < n; a++)
            if (t(e[a], a))
                return x.some(a);
        return x.none()
    }
      , P = (e,t)=>(e=>{
        const t = [];
        for (let a = 0, n = e.length; a < n; ++a) {
            if (!s(e[a]))
                throw new Error("Arr.flatten item " + a + " was not an array, input: " + e);
            A.apply(t, e[a])
        }
        return t
    }
    )(T(e, t))
      , I = (e,t)=>{
        for (let a = 0, n = e.length; a < n; ++a)
            if (!0 !== t(e[a], a))
                return !1;
        return !0
    }
      , M = e=>((e,t)=>0 < e.length ? x.some(e[0]) : x.none())(e);
    class $ extends Error {
        constructor(e) {
            super(e),
            this.name = "AdvTemplateError"
        }
    }
    const N = e=>{
        const t = t=>t(e)
          , a = h(e)
          , n = ()=>o
          , o = {
            tag: !0,
            inner: e,
            fold: (t,a)=>a(e),
            isValue: w,
            isError: b,
            map: t=>k.value(t(e)),
            mapError: n,
            bind: t,
            exists: t,
            forall: t,
            getOr: a,
            or: n,
            getOrThunk: a,
            orThunk: n,
            getOrDie: a,
            each: t=>{
                t(e)
            }
            ,
            toOptional: ()=>x.some(e)
        };
        return o
    }
      , j = e=>{
        const t = ()=>a
          , a = {
            tag: !1,
            inner: e,
            fold: (t,a)=>t(e),
            isValue: b,
            isError: w,
            map: t,
            mapError: t=>k.error(t(e)),
            bind: t,
            exists: b,
            forall: w,
            getOr: f,
            or: f,
            getOrThunk: _,
            orThunk: _,
            getOrDie: (n = String(e),
            ()=>{
                throw new Error(n)
            }
            ),
            each: v,
            toOptional: x.none
        };
        var n;
        return a
    }
      , k = {
        value: N,
        error: j,
        fromOption: (e,t)=>e.fold((()=>j(t)), N)
    }
      , R = Object.keys
      , B = Object.hasOwnProperty
      , L = (e,t)=>B.call(e, t)
      , z = e=>i(e) && e.length > 0
      , U = e=>z(e)
      , V = e=>L(e, "id") && U(e.id)
      , K = e=>L(e, "title") && z(e.title)
      , q = e=>L(e, "content") && z(e.content)
      , F = e=>l(e) && V(e) && K(e) && L(e, "items") && G(e.items)
      , H = e=>l(e) && V(e) && K(e) && (e=>!L(e, "items") || G(e.items))(e)
      , G = e=>s(e) && I(e, H)
      , W = e=>L(e, "items") && J(e.items)
      , Y = e=>l(e) && K(e) && ((e=>q(e))(e) || W(e))
      , J = e=>s(e) && I(e, Y)
      , Q = (e,t)=>a=>e(a) ? k.value(a) : k.error(t)
      , X = Q((e=>l(e) && (e=>{
        for (const t in e)
            if (B.call(e, t))
                return !1;
        return !0
    }
    )(e)), "response should contain empty object")
      , Z = Q((e=>l(e) && V(e)), "response should contain id")
      , ee = Q((e=>l(e) && V(e) && K(e) && q(e)), "response contains invalid template data")
      , te = e=>G(e) ? (e=>{
        const t = e=>P(e, (e=>F(e) ? [e.id, ...t(e.items)] : [e.id]))
          , a = t(e);
        return a.length === [...new Set(a)].length
    }
    )(e) ? k.value(e) : k.error("response contains duplicated ids") : k.error("response contains invalid data")
      , ae = e=>t=>t.options.get(e)
      , ne = e=>{
        const t = (t,a)=>{
            var n, o;
            n = t,
            o = (e,t)=>(...n)=>((e,t,a)=>{
                return l(n = a) && u(n.then) && u(n.catch) ? a.then((a=>t(a).fold((t=>Promise.reject(new $(`${e} ${t}`))), (e=>Promise.resolve(e))))) : Promise.reject(new $(`${e} should return a Promise`));
                var n
            }
            )(e, a, t(...n)),
            e.options.register(n, {
                processor: e=>u(e) ? {
                    valid: !0,
                    value: o(n, e)
                } : {
                    valid: !1,
                    message: "Must be a function returning promise"
                },
                default: ()=>Promise.reject(new $(`${n} option is not configured`))
            })
        }
        ;
        t("advtemplate_create_category", Z),
        t("advtemplate_rename_category", X),
        t("advtemplate_move_category_items", X),
        t("advtemplate_delete_category", X),
        t("advtemplate_create_template", Z),
        t("advtemplate_rename_template", X),
        t("advtemplate_update_template", X),
        t("advtemplate_move_template", X),
        t("advtemplate_get_template", ee),
        t("advtemplate_delete_template", X),
        t("advtemplate_delete_all", X),
        t("advtemplate_list", te),
        e.options.register("advtemplate_templates", {
            processor: J
        })
    }
      , oe = ae("advtemplate_create_category")
      , re = ae("advtemplate_rename_category")
      , ie = ae("advtemplate_move_category_items")
      , le = ae("advtemplate_delete_category")
      , se = ae("advtemplate_create_template")
      , ce = ae("advtemplate_rename_template")
      , me = ae("advtemplate_move_template")
      , de = ae("advtemplate_get_template")
      , pe = ae("advtemplate_delete_template")
      , ue = ae("advtemplate_list")
      , ge = ae("advtemplate_templates")
      , ye = ae("content_style")
      , ve = ae("body_class")
      , he = ae("content_css_cors")
      , fe = e=>{
        if (null == e)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: e
        }
    }
      , _e = (e,t)=>{
        const a = (t || document).createElement(e);
        return fe(a)
    }
      , be = fe
      , we = e=>1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType || 0 === e.childElementCount;
    "undefined" != typeof window ? window : Function("return this;")();
    const xe = e=>{
        const t = e.dom;
        null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , Ce = 'data-mce-advtemplate-marker="clipboard"'
      , Se = e=>{
        const t = ((e,t)=>((e,t)=>{
            const a = void 0 === t ? document : t.dom;
            return we(a) ? [] : T(a.querySelectorAll(e), be)
        }
        )(t, e))(be(e.getBody()), `span[${Ce}]`);
        return 0 === t.length ? Promise.resolve() : (async()=>new Promise(((e,t)=>{
            var a;
            u(null === (a = null === navigator || void 0 === navigator ? void 0 : navigator.clipboard) || void 0 === a ? void 0 : a.readText) ? navigator.clipboard.readText().then((t=>{
                e(t)
            }
            )).catch((e=>{
                t(e)
            }
            )) : t(new Error("Clipboard API not supported in this browser."))
        }
        )))().then((a=>{
            D(t, (t=>{
                const n = e.dom.createRng();
                n.setStartAfter(t.dom),
                n.setEndAfter(t.dom),
                e.selection.setRng(n),
                e.insertContent(a)
            }
            ))
        }
        )).catch((t=>{
            e.notificationManager.open({
                text: e.translate("Failed to read clipboard content"),
                type: "error",
                timeout: 2e3
            }),
            console.error(t)
        }
        )).finally((()=>{
            D(t, (e=>{
                xe(e)
            }
            ))
        }
        ))
    }
      , Ae = 'data-mce-advtemplate-marker="cursor"'
      , Ee = "{{mce-cursor}}"
      , Te = new RegExp(Ee)
      , De = new RegExp("{{mce-clipboard}}","g")
      , Oe = 'data-mce-bookmark="1"'
      , Pe = `<span ${Oe} ${Ae}></span>`
      , Ie = `<span ${Oe} ${Ce}></span>`
      , Me = async e=>{
        await Se(e),
        (e=>{
            ((e,t)=>((e,t)=>{
                const a = void 0 === t ? document : t.dom;
                return we(a) ? x.none() : x.from(a.querySelector(e)).map(be)
            }
            )(t, e))(be(e.getBody()), `span[${Ae}]`).each((t=>{
                const a = e.dom.createRng();
                a.setStartBefore(t.dom),
                a.setEndBefore(t.dom),
                e.selection.setRng(a),
                e.selection.scrollIntoView(),
                xe(t)
            }
            ))
        }
        )(e)
    }
      , $e = (e,t)=>de(e)(t).then((t=>{
        (async(e,t)=>{
            const a = y(!1)
              , n = ((e,t,a)=>{
                const n = tinymce.html.DomParser(void 0, e.schema);
                n.addNodeFilter("#text", (e=>t=>{
                    let a, n = !1;
                    for (const e of t) {
                        let t = !1;
                        x.from(e.value).each((o=>{
                            let r = o;
                            if (!n) {
                                const e = r.match(Te);
                                p(e) && (r = r.replace(Ee, Pe),
                                n = !0,
                                t = !0)
                            }
                            const i = r.match(De);
                            if (p(i) && (r = r.replace(De, Ie),
                            t = !0),
                            t) {
                                a = null != a ? a : tinymce.html.DomParser();
                                const t = a.parse(r);
                                e.replace(t),
                                t.unwrap()
                            }
                        }
                        ))
                    }
                    e.set(p(a))
                }
                )(a));
                const o = n.parse(t, {
                    insert: !0
                });
                return a.get() ? tinymce.html.Serializer({
                    validate: !0
                }, e.schema).serialize(o) : t
            }
            )(e, t, a);
            e.insertContent(n),
            a.get() && await Me(e)
        }
        )(e, t.content)
    }
    ))
      , Ne = (e,t)=>e ? x.some(t) : x.none()
      , je = {
        text: "Uncategorized",
        value: ""
    }
      , ke = (e,t)=>{
        const a = ((e,a)=>{
            const n = [];
            for (let a = 0, r = e.length; a < r; a++) {
                const r = e[a];
                F(o = r) && (!p(t) || o.id !== t) && n.push(r)
            }
            var o;
            return n
        }
        )(e);
        return [...t === je.value ? [] : [je], ...T(a, (({id: e, title: t})=>({
            text: t,
            value: e
        })))]
    }
      , Re = (e,t)=>{
        return (a = t,
        n = t=>F(t) && E(T(t.items, (({id: e})=>e)), e),
        ((e,t,a)=>{
            for (let n = 0, o = e.length; n < o; n++) {
                const o = e[n];
                if (t(o, n))
                    return x.some(o);
                if (a(o, n))
                    break
            }
            return x.none()
        }
        )(a, n, b)).map((e=>e.id)).getOr(je.value);
        var a, n
    }
      , Be = e=>Ne(e !== je.value, e).getOrUndefined()
      , Le = (e,t,a)=>e.options.isSet(t) ? [a] : []
      , ze = (e,t,a)=>{
        const n = e=>{
            const n = [...Le(a, "advtemplate_rename_category", {
                type: "menuitem",
                text: "Rename...",
                onAction: t.renameCategory(e)
            }), ...Le(a, "advtemplate_move_category_items", {
                type: "menuitem",
                text: "Move all items...",
                enabled: e.items.length > 0,
                onAction: t.moveCategoryItems(e.id)
            }), ...Le(a, "advtemplate_delete_category", {
                type: "separator"
            }), ...Le(a, "advtemplate_delete_category", {
                type: "menuitem",
                icon: "remove",
                text: "Delete all",
                onAction: t.deleteCategory(e.id)
            })];
            return n.length > 0 ? {
                menu: {
                    type: "menubutton",
                    icon: "image-options",
                    fetch: e=>e(n),
                    tooltip: "Category actions"
                }
            } : {}
        }
          , o = e=>{
            const n = [...Le(a, "advtemplate_rename_template", {
                type: "menuitem",
                text: "Rename...",
                onAction: t.renameTemplate(e)
            }), ...Le(a, "advtemplate_move_template", {
                type: "menuitem",
                text: "Move to...",
                onAction: t.moveTemplate(e.id)
            }), ...Le(a, "advtemplate_delete_template", {
                type: "separator"
            }), ...Le(a, "advtemplate_delete_template", {
                type: "menuitem",
                icon: "remove",
                text: "Delete",
                onAction: t.deleteTemplate(e.id)
            })];
            return n.length > 0 ? {
                menu: {
                    type: "menubutton",
                    icon: "image-options",
                    fetch: e=>e(n),
                    tooltip: "Template actions"
                }
            } : {}
        }
        ;
        return T(e, (e=>F(e) ? (e=>({
            type: "directory",
            id: e.id,
            title: e.title,
            children: ze(e.items, t, a),
            ...n(e)
        }))(e) : (e=>({
            type: "leaf",
            id: e.id,
            title: e.title,
            ...o(e)
        }))(e)))
    }
      , Ue = e=>{
        const t = (e,a)=>((e,a,n)=>(D(e, ((e,a)=>{
            var o, r;
            o = n,
            n = "directory" === (r = e).type ? [r, ...t(r.children, o)] : [...o, r]
        }
        )),
        n))(e, 0, a);
        return t(e, [])
    }
      , Ve = e=>t=>{
        x.from(t.message).bind((e=>(console.error(e),
        Ne(!(e=>e instanceof $)(t), e)))).or(x.some("Operation failed")).each(e.windowManager.alert)
    }
      , Ke = (e,t)=>((e,t,a)=>{
        const n = ((e,t)=>{
            const a = ((e,t)=>{
                const a = e.dom.getAttribute(t);
                return null === a ? void 0 : a
            }
            )(e, t);
            return void 0 === a || "" === a ? [] : a.split(" ")
        }
        )(e, t);
        return ((e,t,a)=>{
            ((e,t,a)=>{
                if (!(i(a) || c(a) || g(a)))
                    throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", a, ":: Element ", e),
                    new Error("Attribute value was not simple");
                e.setAttribute(t, a + "")
            }
            )(e.dom, t, a)
        }
        )(e, t, n.concat([a]).join(" ")),
        !0
    }
    )(e, "class", t)
      , qe = (e=>{
        let t, a = !1;
        return (...n)=>(a || (a = !0,
        t = e.apply(null, n)),
        t)
    }
    )((()=>{
        const e = tinymce.Env.os.isMacOS() || tinymce.Env.os.isiOS() ? e=>e.metaKey : e=>e.ctrlKey && !e.altKey;
        return `<script>(${(e=>{
            document.addEventListener("click", (t=>{
                for (leta = t.target; a; a = a.parentNode)
                    "A" !== a.nodeName || e(t) || t.preventDefault()
            }
            ), !1)
        }
        ).toString()})(${e.toString()})<\/script>`
    }
    ))
      , Fe = (e,t)=>tinymce.html.Serializer({
        validate: !0
    }, e.schema).serialize(e.parser.parse(t, {
        insert: !0
    }))
      , He = e=>`<style type="text/css">${e}</style>`
      , Ge = (e,t)=>x.from(e).filter((e=>e.length > 0)).map(t).getOr("")
      , We = He(".mce-advtemplate-preview-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #b1aeae; font-family: sans-serif; }")
      , Ye = (e,t)=>{
        if (-1 === t.indexOf("<html>")) {
            const a = Ge(ye(e), He)
              , n = he(e) ? ' crossorigin="anonymous"' : ""
              , o = T(e.contentCSS, (t=>`<link type="text/css" rel="stylesheet" href="${e.documentBaseURI.toAbsolute(t)}"${n}>`))
              , r = e.dom.encode
              , i = `<base href="${r(e.documentBaseURI.getURI())}">`
              , l = Ge(ve(e), (e=>` class="${r(e)}"`))
              , s = Ge(e.getBody().dir, (e=>` dir="${r(e)}"`));
            return ["<!DOCTYPE html><html><head>", i, o.join(""), We, a, qe(), `</head><body${l}${s}>`, Fe(e, t), "</body></html>"].join("")
        }
        return t
    }
      , Je = e=>{
        const t = _e("div");
        var a, n;
        return n = "mce-advtemplate-preview-placeholder",
        (e=>void 0 !== e.dom.classList)(a = t) ? a.dom.classList.add(n) : Ke(a, n),
        ((e,t)=>{
            e.dom.textContent = t
        }
        )(t, e.translate("Select template to preview")),
        Ye(e, (e=>{
            const t = _e("div");
            return ((e,t)=>{
                e.dom.appendChild(t.dom)
            }
            )(t, be(e.dom.cloneNode(!0))),
            (e=>e.dom.innerHTML)(t)
        }
        )(t))
    }
      , Qe = async e=>{
        let t = !1;
        const a = (()=>{
            const e = (e=>{
                const t = y(x.none())
                  , a = ()=>t.get().each(e);
                return {
                    clear: ()=>{
                        a(),
                        t.set(x.none())
                    }
                    ,
                    isSet: ()=>t.get().isSome(),
                    get: ()=>t.get(),
                    set: e=>{
                        a(),
                        t.set(x.some(e))
                    }
                }
            }
            )(v);
            return {
                ...e,
                on: t=>e.get().each(t)
            }
        }
        )();
        let n = [];
        const o = n=>{
            de(e)(n).then((o=>{
                m.setData({
                    preview: Ye(e, o.content)
                }),
                a.set(n),
                t || (t = !0,
                m.setEnabled("submit", !0))
            }
            ))
        }
          , r = (e,t)=>{
            if (0 === t.length)
                return e;
            {
                const a = t.toLowerCase()
                  , n = ((e,t)=>{
                    const a = C.call(e, 0);
                    return a.sort(((e,t)=>e.index - t.index)),
                    a
                }
                )(P(Ue(e), (e=>{
                    const t = e.title.toLowerCase().indexOf(a);
                    return t >= 0 ? [{
                        item: e,
                        index: t
                    }] : []
                }
                )));
                return T(n, (({item: e})=>e))
            }
        }
          , i = (l,c)=>({
            title: "Templates",
            size: "large",
            onChange: ()=>{
                const e = m.getData();
                m.redial(i(l, e))
            }
            ,
            onAction: (t,a)=>{
                "addcategory" === a.name && ((e,t)=>{
                    e.windowManager.open({
                        title: "New category",
                        body: {
                            type: "panel",
                            items: [{
                                type: "input",
                                name: "title",
                                label: "Category name"
                            }]
                        },
                        buttons: [{
                            type: "cancel",
                            name: "cancel",
                            text: "Cancel"
                        }, {
                            type: "submit",
                            name: "save",
                            text: "Save",
                            primary: !0,
                            enabled: !1
                        }],
                        onChange: e=>{
                            const t = e.getData();
                            e.setEnabled("save", t.title.length > 0)
                        }
                        ,
                        onSubmit: a=>{
                            const {title: n} = a.getData();
                            oe(e)(n).then((async()=>{
                                await t(),
                                a.close()
                            }
                            )).catch(Ve(e))
                        }
                    })
                }
                )(e, s)
            }
            ,
            initialData: c,
            body: {
                type: "panel",
                classes: ["tox-advtemplate"],
                items: [{
                    type: "grid",
                    columns: 2,
                    items: [{
                        type: "panel",
                        items: [{
                            type: "input",
                            name: "search",
                            placeholder: "Search"
                        }, {
                            type: "tree",
                            items: r(l, c.search),
                            onLeafAction: o,
                            onToggleExpand: e=>{
                                n = e
                            }
                            ,
                            defaultExpandedIds: c.search.length > 0 ? [] : n,
                            ...a.get().fold((()=>({})), (e=>({
                                defaultSelectedId: e
                            })))
                        }]
                    }, {
                        type: "iframe",
                        name: "preview",
                        sandboxed: !1,
                        transparent: !1
                    }]
                }]
            },
            buttons: [...Le(e, "advtemplate_create_category", {
                type: "custom",
                name: "addcategory",
                text: "New category",
                align: "start"
            }), {
                type: "cancel",
                name: "cancel",
                text: "Cancel"
            }, {
                enabled: t,
                type: "submit",
                name: "submit",
                text: "Insert",
                primary: !0
            }],
            onSubmit: t=>{
                a.get().each((a=>{
                    $e(e, a).then(t.close).catch(Ve(e))
                }
                ))
            }
        })
          , l = async t=>{
            const a = await ue(e)();
            return ze(a, t, e)
        }
          , s = async(t=!1)=>{
            const a = await l(c)
              , n = m.getData();
            t && (n.preview = Je(e)),
            m.redial(i(a, n))
        }
          , c = ((e,t,a)=>({
            renameCategory: t=>()=>((e,t,a)=>{
                e.windowManager.open({
                    title: "Rename category",
                    initialData: {
                        title: a.title
                    },
                    body: {
                        type: "panel",
                        items: [{
                            type: "input",
                            name: "title",
                            label: "Category name"
                        }]
                    },
                    buttons: [{
                        type: "cancel",
                        name: "cancel",
                        text: "Cancel"
                    }, {
                        type: "submit",
                        name: "save",
                        text: "Save",
                        primary: !0
                    }],
                    onChange: e=>{
                        const t = e.getData();
                        e.setEnabled("save", t.title.length > 0)
                    }
                    ,
                    onSubmit: n=>{
                        const {title: o} = n.getData();
                        re(e)(a.id, o).then((async()=>{
                            await t(),
                            n.close()
                        }
                        )).catch(Ve(e))
                    }
                })
            }
            )(e, a, t),
            renameTemplate: t=>()=>((e,t,a)=>{
                e.windowManager.open({
                    title: "Rename template",
                    initialData: {
                        title: a.title
                    },
                    body: {
                        type: "panel",
                        items: [{
                            type: "input",
                            name: "title",
                            label: "Template name"
                        }]
                    },
                    buttons: [{
                        type: "cancel",
                        name: "cancel",
                        text: "Cancel"
                    }, {
                        type: "submit",
                        name: "save",
                        text: "Save",
                        primary: !0
                    }],
                    onChange: e=>{
                        const t = e.getData();
                        e.setEnabled("save", t.title.length > 0)
                    }
                    ,
                    onSubmit: n=>{
                        const {title: o} = n.getData();
                        ce(e)(a.id, o).then((async()=>{
                            await t(),
                            n.close()
                        }
                        )).catch(Ve(e))
                    }
                })
            }
            )(e, a, t),
            moveTemplate: t=>()=>{
                (async(e,t,a)=>{
                    const n = await ue(e)();
                    e.windowManager.open({
                        title: "Move to",
                        body: {
                            type: "panel",
                            items: [{
                                type: "listbox",
                                name: "category",
                                label: "Category",
                                items: ke(n, Re(a, n))
                            }]
                        },
                        buttons: [{
                            type: "cancel",
                            name: "cancel",
                            text: "Cancel"
                        }, {
                            type: "submit",
                            name: "save",
                            text: "Save",
                            primary: !0
                        }],
                        onSubmit: n=>{
                            const {category: o} = n.getData();
                            me(e)(a, Be(o)).then((async()=>{
                                await t(),
                                n.close()
                            }
                            )).catch(Ve(e))
                        }
                    })
                }
                )(e, a, t)
            }
            ,
            moveCategoryItems: t=>()=>{
                (async(e,t,a)=>{
                    const n = await ue(e)();
                    e.windowManager.open({
                        title: "Move all items",
                        body: {
                            type: "panel",
                            items: [{
                                type: "listbox",
                                name: "category",
                                label: "Category",
                                items: ke(n, a)
                            }]
                        },
                        buttons: [{
                            type: "cancel",
                            name: "cancel",
                            text: "Cancel"
                        }, {
                            type: "submit",
                            name: "save",
                            text: "Save",
                            primary: !0
                        }],
                        onSubmit: n=>{
                            const {category: o} = n.getData();
                            ie(e)(a, Be(o)).then((async()=>{
                                await t(),
                                n.close()
                            }
                            )).catch(Ve(e))
                        }
                    })
                }
                )(e, a, t)
            }
            ,
            deleteTemplate: n=>()=>{
                e.windowManager.confirm("Are you sure you want to permanently delete the template?", (o=>{
                    o && pe(e)(n).then((async()=>{
                        t.get().exists((e=>e === n)) ? (t.clear(),
                        await a(!0)) : await a(!1)
                    }
                    )).catch(Ve(e))
                }
                ))
            }
            ,
            deleteCategory: t=>()=>{
                e.windowManager.confirm("Are you sure you want to permanently delete the category and all its content?", (n=>{
                    n && le(e)(t).then((async()=>{
                        await a()
                    }
                    )).catch(Ve(e))
                }
                ))
            }
        }))(e, a, s)
          , m = e.windowManager.open(i(await l(c), {
            preview: Je(e),
            search: ""
        }))
    }
      , Xe = (e,t,a)=>m(a) ? e.execCommand(t) : e.execCommand(t, !1, a)
      , Ze = (et = /^\s+|\s+$/g,
    e=>e.replace(et, ""));
    var et;
    tinymce.PluginManager.requireLangPack("advtemplate", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("advtemplate", (e=>{
        ((e,a)=>!!e && -1 === ((e,a)=>{
            const n = t(e.major, a.major);
            if (0 !== n)
                return n;
            const o = t(e.minor, a.minor);
            if (0 !== o)
                return o;
            const r = t(e.patch, a.patch);
            return 0 !== r ? r : 0
        }
        )((e=>n((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), n(a)))(tinymce, "6.5.0") ? console.error("The advtemplate plugin requires at least version 6.5.0 of TinyMCE.") : (ne(e),
        (e=>{
            x.from(ge(e)).each((t=>{
                const a = ((e=[])=>{
                    let t = []
                      , a = {}
                      , n = {}
                      , o = 0;
                    const r = ()=>(++o).toString()
                      , l = e=>x.from(n[e]).getOrDie("Category not found")
                      , s = e=>d(e) ? t : l(e).items
                      , c = (e,t)=>{
                        if (!(i(t) && (a = Ze(t),
                        a.length > 0)))
                            throw new Error("Invalid title");
                        var a;
                        if (((e,a)=>{
                            for (let a = 0, n = e.length; a < n; a++)
                                if (e[a].title === t)
                                    return !0;
                            return !1
                        }
                        )(e))
                            throw new Error("The name already exists")
                    }
                      , m = e=>x.from(a[e]).getOrDie("Template not found")
                      , p = e=>{
                        c(t, e);
                        const a = r()
                          , o = {
                            id: a,
                            title: e,
                            items: []
                        };
                        return t.push(o),
                        n[a] = o,
                        {
                            ...o
                        }
                    }
                      , u = (e,t,n)=>{
                        const o = s(n);
                        c(o, e);
                        const i = r()
                          , l = {
                            id: i,
                            title: e,
                            content: t
                        };
                        return o.push(l),
                        a[i] = [l, n],
                        {
                            ...l
                        }
                    }
                      , g = (e,t)=>{
                        const a = s(t);
                        O(a, (t=>t.id === e)).each((e=>a.splice(e, 1)))
                    }
                      , y = async(e,t)=>{
                        const [n,o] = m(e);
                        return s(t).push(n),
                        g(e, o),
                        a[e] = [n, t],
                        Promise.resolve({})
                    }
                      , v = (e,t)=>{
                        for (const a of e)
                            if (W(a)) {
                                const e = p(a.title);
                                v(a.items, e.id)
                            } else
                                u(a.title, a.content, t)
                    }
                    ;
                    return v(e),
                    {
                        advtemplate_create_category: async e=>{
                            const {id: t} = p(e);
                            return Promise.resolve({
                                id: t
                            })
                        }
                        ,
                        advtemplate_rename_category: async(e,a)=>{
                            const n = l(e);
                            return n.title === a || (c(t, a),
                            n.title = a),
                            Promise.resolve({})
                        }
                        ,
                        advtemplate_delete_category: async e=>(((t,a)=>{
                            for (let a = t.length - 1; a >= 0; a--)
                                n = t[a],
                                g(n.id, e);
                            var n
                        }
                        )(l(e).items),
                        O(t, (t=>t.id === e)).each((e=>t.splice(e, 1))),
                        delete n[e],
                        Promise.resolve({})),
                        advtemplate_create_template: async(e,t,a)=>{
                            const {id: n} = u(e, t, a);
                            return Promise.resolve({
                                id: n
                            })
                        }
                        ,
                        advtemplate_rename_template: async(e,t)=>{
                            const [a,n] = m(e);
                            if (a.title === t)
                                return Promise.resolve({});
                            const o = s(n);
                            return c(o, t),
                            a.title = t,
                            Promise.resolve({})
                        }
                        ,
                        advtemplate_update_template: async(e,t)=>{
                            const [a] = m(e);
                            return a.content = t,
                            Promise.resolve({})
                        }
                        ,
                        advtemplate_move_template: y,
                        advtemplate_get_template: async e=>{
                            const [t] = m(e);
                            return Promise.resolve({
                                ...t
                            })
                        }
                        ,
                        advtemplate_delete_template: async e=>{
                            const [,t] = m(e);
                            return g(e, t),
                            delete a[e],
                            Promise.resolve({})
                        }
                        ,
                        advtemplate_list: async(e=!1)=>{
                            if (e)
                                return Promise.resolve([...t]);
                            {
                                const e = T(t, (e=>F(e) ? {
                                    id: e.id,
                                    title: e.title,
                                    items: T(e.items, (({id: e, title: t})=>({
                                        id: e,
                                        title: t
                                    })))
                                } : {
                                    id: e.id,
                                    title: e.title
                                }));
                                return Promise.resolve(e)
                            }
                        }
                        ,
                        advtemplate_delete_all: async()=>(t = [],
                        a = {},
                        n = {},
                        Promise.resolve({})),
                        advtemplate_move_category_items: async(e,t)=>{
                            const a = s(e);
                            for (let e = M(a); e.isSome(); e = M(a))
                                await y(e.getOrDie().id, t);
                            return Promise.resolve({})
                        }
                    }
                }
                )(t);
                ((t,a)=>{
                    const n = R(t);
                    for (let a = 0, i = n.length; a < i; a++) {
                        const i = n[a];
                        o = t[i],
                        E(["advtemplate_list", "advtemplate_get_template"], r = i) ? e.options.set(r, o) : e.options.unset(r)
                    }
                    var o, r
                }
                )(a)
            }
            ))
        }
        )(e),
        (e=>{
            const t = (t,a)=>{
                e.addCommand(t, a)
            }
            ;
            t("AdvTemplateInsertDialog", (()=>{
                Qe(e)
            }
            )),
            e.options.isSet("advtemplate_create_template") && t("AdvTemplateAddDialog", (()=>{
                (async e=>{
                    const t = await ue(e)();
                    e.windowManager.open({
                        title: "New template",
                        body: {
                            type: "panel",
                            items: [{
                                type: "input",
                                name: "title",
                                label: "Template name"
                            }, {
                                type: "listbox",
                                name: "category",
                                label: "Category",
                                items: ke(t)
                            }]
                        },
                        buttons: [{
                            type: "cancel",
                            name: "cancel",
                            text: "Cancel"
                        }, {
                            type: "submit",
                            name: "save",
                            text: "Save",
                            primary: !0,
                            enabled: !1
                        }],
                        onChange: e=>{
                            const t = e.getData();
                            e.setEnabled("save", t.title.length > 0)
                        }
                        ,
                        onSubmit: t=>{
                            const {title: a, category: n} = t.getData();
                            se(e)(a, e.selection.getContent(), Be(n)).then((()=>{
                                t.close(),
                                e.notificationManager.open({
                                    text: "Template successfully saved",
                                    type: "success",
                                    timeout: 2e3
                                })
                            }
                            )).catch(Ve(e))
                        }
                    })
                }
                )(e)
            }
            )),
            t("AdvTemplateInsertTemplateById", ((t,a)=>{
                if (!U(a))
                    throw new Error("Id should be non-empty string");
                $e(e, a).catch((e=>{
                    console.error("Insert template by id failed due to:", e)
                }
                ))
            }
            ))
        }
        )(e),
        (e=>{
            e.options.isSet("advtemplate_create_template") && e.ui.registry.addButton("addtemplate", {
                tooltip: "Save as template",
                icon: "template-add",
                onAction: ()=>{
                    Xe(e, "AdvTemplateAddDialog")
                }
                ,
                onSetup: t=>{
                    t.setEnabled(!1);
                    const a = ()=>{
                        t.setEnabled(!e.selection.isCollapsed())
                    }
                    ;
                    return e.on("NodeChange SelectionChange", a),
                    ()=>{
                        e.off("NodeChange SelectionChange", a)
                    }
                }
            }),
            e.ui.registry.addButton("inserttemplate", {
                tooltip: "Insert template",
                icon: "template",
                onSetup: t=>{
                    const a = ()=>{
                        t.setEnabled(e.selection.isEditable())
                    }
                    ;
                    return e.on("NodeChange", a),
                    a(),
                    ()=>{
                        e.off("NodeChange", a)
                    }
                }
                ,
                onAction: ()=>{
                    Xe(e, "AdvTemplateInsertDialog")
                }
            })
        }
        )(e),
        (e=>{
            e.ui.registry.addMenuItem("inserttemplate", {
                text: "Template...",
                icon: "template",
                onSetup: t=>(t.setEnabled(e.selection.isEditable()),
                v),
                onAction: ()=>Xe(e, "AdvTemplateInsertDialog")
            }),
            e.options.isSet("advtemplate_create_template") && e.ui.registry.addMenuItem("addtemplate", {
                text: "Save as template...",
                icon: "template-add",
                onAction: ()=>e.execCommand("AdvTemplateAddDialog"),
                onSetup: t=>(t.setEnabled(!e.selection.isCollapsed()),
                v)
            }),
            e.ui.registry.addContextMenu("advtemplate", {
                update: h("addtemplate")
            })
        }
        )(e))
    }
    ))
}();
