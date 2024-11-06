/*!
 * Tiny Templates plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 7.4.1-94
 */

!function() {
    "use strict";
    const e = e => parseInt(e, 10)
      , t = (e, t) => {
        const a = e - t;
        return 0 === a ? 0 : a > 0 ? 1 : -1
    }
      , a = (e, t, a) => ({
        major: e,
        minor: t,
        patch: a
    })
      , n = t => {
        const n = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t);
        return n ? a(e(n[1]), e(n[2]), e(n[3])) : a(0, 0, 0)
    }
      , o = e => t => (e => {
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (a = n = e,
        (o = String).prototype.isPrototypeOf(a) || (null === (r = n.constructor) || void 0 === r ? void 0 : r.name) === o.name) ? "string" : t;
        var a, n, o, r
    }
    )(t) === e
      , r = e => t => typeof t === e
      , i = o("string")
      , l = o("object")
      , s = o("array")
      , c = r("boolean")
      , m = (void 0,
    e => undefined === e);
    const d = e => !(e => null == e)(e)
      , p = r("function")
      , u = r("number")
      , g = e => {
        let t = e;
        return {
            get: () => t,
            set: e => {
                t = e
            }
        }
    }
      , y = () => {}
      , v = e => () => e
      , h = e => e
      , f = e => e()
      , _ = v(!1)
      , b = v(!0);
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
            return d(e) ? w.some(e) : w.none()
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
    const x = Array.prototype.slice
      , S = Array.prototype.indexOf
      , C = Array.prototype.push
      , T = (e, t) => ( (e, t) => S.call(e, t))(e, t) > -1
      , A = (e, t) => {
        const a = e.length
          , n = new Array(a);
        for (let o = 0; o < a; o++) {
            const a = e[o];
            n[o] = t(a, o)
        }
        return n
    }
      , E = (e, t) => {
        for (let a = 0, n = e.length; a < n; a++)
            t(e[a], a)
    }
      , D = (e, t) => {
        const a = [];
        for (let n = 0, o = e.length; n < o; n++) {
            const o = e[n];
            t(o, n) && a.push(o)
        }
        return a
    }
      , O = (e, t) => ( (e, t, a) => {
        for (let n = 0, o = e.length; n < o; n++) {
            const o = e[n];
            if (t(o, n))
                return w.some(o);
            if (a(o, n))
                break
        }
        return w.none()
    }
    )(e, t, _)
      , P = (e, t) => {
        for (let a = 0, n = e.length; a < n; a++)
            if (t(e[a], a))
                return w.some(a);
        return w.none()
    }
      , k = (e, t) => (e => {
        const t = [];
        for (let a = 0, n = e.length; a < n; ++a) {
            if (!s(e[a]))
                throw new Error("Arr.flatten item " + a + " was not an array, input: " + e);
            C.apply(t, e[a])
        }
        return t
    }
    )(A(e, t))
      , I = (e, t) => {
        for (let a = 0, n = e.length; a < n; ++a)
            if (!0 !== t(e[a], a))
                return !1;
        return !0
    }
    ;
    class M extends Error {
        constructor(e) {
            super(e),
            this.name = "AdvTemplateError"
        }
    }
    const N = e => {
        const t = t => t(e)
          , a = v(e)
          , n = () => o
          , o = {
            tag: !0,
            inner: e,
            fold: (t, a) => a(e),
            isValue: b,
            isError: _,
            map: t => j.value(t(e)),
            mapError: n,
            bind: t,
            exists: t,
            forall: t,
            getOr: a,
            or: n,
            getOrThunk: a,
            orThunk: n,
            getOrDie: a,
            each: t => {
                t(e)
            }
            ,
            toOptional: () => w.some(e)
        };
        return o
    }
      , $ = e => {
        const t = () => a
          , a = {
            tag: !1,
            inner: e,
            fold: (t, a) => t(e),
            isValue: _,
            isError: b,
            map: t,
            mapError: t => j.error(t(e)),
            bind: t,
            exists: _,
            forall: b,
            getOr: h,
            or: h,
            getOrThunk: f,
            orThunk: f,
            getOrDie: (n = String(e),
            () => {
                throw new Error(n)
            }
            ),
            each: y,
            toOptional: w.none
        };
        var n;
        return a
    }
      , j = {
        value: N,
        error: $,
        fromOption: (e, t) => e.fold(( () => $(t)), N)
    }
      , R = Object.keys
      , B = Object.hasOwnProperty
      , L = (e, t) => {
        const a = R(e);
        for (let n = 0, o = a.length; n < o; n++) {
            const o = a[n];
            t(e[o], o)
        }
    }
      , z = (e, t) => B.call(e, t)
      , U = e => i(e) && e.length > 0
      , V = e => U(e)
      , K = e => z(e, "id") && V(e.id)
      , q = e => z(e, "title") && U(e.title)
      , F = e => z(e, "content") && U(e.content)
      , H = e => l(e) && K(e) && q(e) && z(e, "items") && Q(e.items)
      , G = e => e.locked || !1
      , J = (e, t) => W(e.id, t).exists(G)
      , W = (e, t) => O(t, (t => H(t) && T(A(t.items, ( ({id: e}) => e)), e)))
      , Y = e => l(e) && K(e) && q(e) && (e => !z(e, "items") || Q(e.items))(e)
      , Q = e => s(e) && I(e, Y)
      , X = e => z(e, "items") && ee(e.items)
      , Z = e => l(e) && q(e) && ((e => F(e))(e) || X(e))
      , ee = e => s(e) && I(e, Z)
      , te = (e, t) => a => e(a) ? j.value(a) : j.error(t)
      , ae = te((e => l(e) && (e => {
        for (const t in e)
            if (B.call(e, t))
                return !1;
        return !0
    }
    )(e)), "response should contain empty object")
      , ne = te((e => l(e) && K(e)), "response should contain id")
      , oe = te((e => l(e) && K(e) && q(e) && F(e)), "response contains invalid template data")
      , re = e => Q(e) ? (e => {
        const t = e => k(e, (e => H(e) ? [e.id, ...t(e.items)] : [e.id]))
          , a = t(e);
        return a.length === [...new Set(a)].length
    }
    )(e) ? j.value(e) : j.error("response contains duplicated ids") : j.error("response contains invalid data")
      , ie = e => t => t.options.get(e)
      , le = e => {
        const t = (t, a) => {
            var n, o;
            n = t,
            o = (e, t) => (...n) => ( (e, t, a) => {
                return l(n = a) && p(n.then) && p(n.catch) ? a.then((a => t(a).fold((t => Promise.reject(new M(`${e} ${t}`))), (e => Promise.resolve(e))))) : Promise.reject(new M(`${e} should return a Promise`));
                var n
            }
            )(e, a, t(...n)),
            e.options.register(n, {
                processor: e => p(e) ? {
                    valid: !0,
                    value: o(n, e)
                } : {
                    valid: !1,
                    message: "Must be a function returning promise"
                },
                default: () => Promise.reject(new M(`${n} option is not configured`))
            })
        }
        ;
        t("advtemplate_create_category", ne),
        t("advtemplate_rename_category", ae),
        t("advtemplate_move_category_items", ae),
        t("advtemplate_delete_category", ae),
        t("advtemplate_create_template", ne),
        t("advtemplate_rename_template", ae),
        t("advtemplate_update_template", ae),
        t("advtemplate_move_template", ae),
        t("advtemplate_get_template", oe),
        t("advtemplate_delete_template", ae),
        t("advtemplate_delete_all", ae),
        t("advtemplate_list", re),
        e.options.register("advtemplate_templates", {
            processor: ee
        })
    }
      , se = ie("advtemplate_create_category")
      , ce = ie("advtemplate_rename_category")
      , me = ie("advtemplate_move_category_items")
      , de = ie("advtemplate_delete_category")
      , pe = ie("advtemplate_create_template")
      , ue = ie("advtemplate_rename_template")
      , ge = ie("advtemplate_move_template")
      , ye = ie("advtemplate_get_template")
      , ve = ie("advtemplate_delete_template")
      , he = ie("advtemplate_list")
      , fe = ie("advtemplate_templates")
      , _e = ie("content_style")
      , be = ie("body_class")
      , we = ie("content_css_cors")
      , xe = e => {
        if (null == e)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: e
        }
    }
      , Se = (e, t) => {
        const a = (t || document).createElement(e);
        return xe(a)
    }
      , Ce = xe
      , Te = e => 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType || 0 === e.childElementCount;
    "undefined" != typeof window ? window : Function("return this;")();
    const Ae = e => {
        const t = e.dom;
        null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , Ee = 'data-mce-advtemplate-marker="clipboard"'
      , De = e => {
        const t = ( (e, t) => ( (e, t) => {
            const a = void 0 === t ? document : t.dom;
            return Te(a) ? [] : A(a.querySelectorAll(e), Ce)
        }
        )(t, e))(Ce(e.getBody()), `span[${Ee}]`);
        return 0 === t.length ? Promise.resolve() : (async () => new Promise(( (e, t) => {
            var a;
            p(null === (a = null === navigator || void 0 === navigator ? void 0 : navigator.clipboard) || void 0 === a ? void 0 : a.readText) ? navigator.clipboard.readText().then((t => {
                e(t)
            }
            )).catch((e => {
                t(e)
            }
            )) : t(new Error("Clipboard API not supported in this browser."))
        }
        )))().then((a => {
            E(t, (t => {
                const n = e.dom.createRng();
                n.setStartAfter(t.dom),
                n.setEndAfter(t.dom),
                e.selection.setRng(n),
                e.insertContent(a)
            }
            ))
        }
        )).catch((t => {
            e.notificationManager.open({
                text: e.translate("Failed to read clipboard content"),
                type: "error",
                timeout: 2e3
            }),
            console.error(t)
        }
        )).finally(( () => {
            E(t, (e => {
                Ae(e)
            }
            ))
        }
        ))
    }
      , Oe = 'data-mce-advtemplate-marker="cursor"'
      , Pe = "{{mce-cursor}}"
      , ke = new RegExp(Pe)
      , Ie = new RegExp("{{mce-clipboard}}","g")
      , Me = 'data-mce-bookmark="1"'
      , Ne = `<span ${Me} ${Oe}></span>`
      , $e = `<span ${Me} ${Ee}></span>`
      , je = async e => {
        await De(e),
        (e => {
            ( (e, t) => ( (e, t) => {
                const a = void 0 === t ? document : t.dom;
                return Te(a) ? w.none() : w.from(a.querySelector(e)).map(Ce)
            }
            )(t, e))(Ce(e.getBody()), `span[${Oe}]`).each((t => {
                const a = e.dom.createRng();
                a.setStartBefore(t.dom),
                a.setEndBefore(t.dom),
                e.selection.setRng(a),
                e.selection.scrollIntoView(),
                Ae(t)
            }
            ))
        }
        )(e)
    }
      , Re = (e, t) => ye(e)(t).then((t => {
        (async (e, t) => {
            const a = g(!1)
              , n = ( (e, t, a) => {
                const n = tinymce.html.DomParser(void 0, e.schema);
                n.addNodeFilter("#text", (e => t => {
                    let a, n = !1;
                    for (const e of t) {
                        let t = !1;
                        w.from(e.value).each((o => {
                            let r = o;
                            if (!n) {
                                const e = r.match(ke);
                                d(e) && (r = r.replace(Pe, Ne),
                                n = !0,
                                t = !0)
                            }
                            const i = r.match(Ie);
                            if (d(i) && (r = r.replace(Ie, $e),
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
                    e.set(d(a))
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
            a.get() && await je(e)
        }
        )(e, t.content)
    }
    ))
      , Be = (e, t) => e ? w.some(t) : w.none()
      , Le = {
        text: "Uncategorized",
        value: ""
    }
      , ze = (e, t) => {
        const a = D(e, (e => H(e) && (!d(t) || e.id !== t) && !G(e)));
        return [...t === Le.value ? [] : [Le], ...A(a, ( ({id: e, title: t}) => ({
            text: t,
            value: e
        })))]
    }
      , Ue = (e, t) => O(t, (t => H(t) && T(A(t.items, ( ({id: e}) => e)), e))).map((e => e.id)).getOr(Le.value)
      , Ve = e => Be(e !== Le.value, e).getOrUndefined()
      , Ke = (e, t, a) => e.options.isSet(t) ? [a] : []
      , qe = (e, t, a, n) => {
        const o = e => {
            const t = [...Ke(n, "advtemplate_rename_category", {
                type: "menuitem",
                text: "Rename...",
                onAction: a.renameCategory(e)
            }), ...Ke(n, "advtemplate_move_category_items", {
                type: "menuitem",
                text: "Move all items...",
                enabled: e.items.length > 0,
                onAction: a.moveCategoryItems(e.id)
            }), ...Ke(n, "advtemplate_delete_category", {
                type: "separator"
            }), ...Ke(n, "advtemplate_delete_category", {
                type: "menuitem",
                icon: "remove",
                text: "Delete all",
                onAction: a.deleteCategory(e.id)
            })];
            return t.length > 0 ? {
                menu: {
                    type: "menubutton",
                    icon: "image-options",
                    fetch: e => e(t),
                    tooltip: "Category actions"
                }
            } : {}
        }
          , r = e => {
            const t = [...Ke(n, "advtemplate_rename_template", {
                type: "menuitem",
                text: "Rename...",
                onAction: a.renameTemplate(e)
            }), ...Ke(n, "advtemplate_move_template", {
                type: "menuitem",
                text: "Move to...",
                onAction: a.moveTemplate(e.id)
            }), ...Ke(n, "advtemplate_delete_template", {
                type: "separator"
            }), ...Ke(n, "advtemplate_delete_template", {
                type: "menuitem",
                icon: "remove",
                text: "Delete",
                onAction: a.deleteTemplate(e.id)
            })];
            return t.length > 0 ? {
                menu: {
                    type: "menubutton",
                    icon: "image-options",
                    fetch: e => e(t),
                    tooltip: "Template actions"
                }
            } : {}
        }
        ;
        return A(t, (t => H(t) ? (e => ({
            type: "directory",
            id: e.id,
            title: e.title,
            children: qe(e, e.items, a, n),
            ...G(e) ? {
                customStateIcon: "lock",
                customStateIconTooltip: n.translate("Locked for editing")
            } : o(e)
        }))(t) : (t => ({
            type: "leaf",
            id: t.id,
            title: t.title,
            ...e && G(e) ? {
                customStateIcon: "lock",
                customStateIconTooltip: n.translate("Locked for editing")
            } : r(t)
        }))(t)))
    }
      , Fe = e => {
        const t = (e, a) => ( (e, a, n) => (E(e, ( (e, a) => {
            var o, r;
            o = n,
            n = "directory" === (r = e).type ? [r, ...t(r.children, o)] : [...o, r]
        }
        )),
        n))(e, 0, a);
        return t(e, [])
    }
      , He = e => t => {
        w.from(t.message).bind((e => (console.error(e),
        Be(!(e => e instanceof M)(t), e)))).or(w.some("Operation failed")).each(e.windowManager.alert)
    }
      , Ge = (e, t) => ( (e, t, a) => {
        const n = ( (e, t) => {
            const a = ( (e, t) => {
                const a = e.dom.getAttribute(t);
                return null === a ? void 0 : a
            }
            )(e, t);
            return void 0 === a || "" === a ? [] : a.split(" ")
        }
        )(e, t);
        return ( (e, t, a) => {
            ( (e, t, a) => {
                if (!(i(a) || c(a) || u(a)))
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
      , Je = (e => {
        let t, a = !1;
        return (...n) => (a || (a = !0,
        t = e.apply(null, n)),
        t)
    }
    )(( () => {
        const e = tinymce.Env.os.isMacOS() || tinymce.Env.os.isiOS() ? e => e.metaKey : e => e.ctrlKey && !e.altKey;
        return `<script>(${(e => {
            document.addEventListener("click", (t => {
                for (leta = t.target; a; a = a.parentNode)
                    "A" !== a.nodeName || e(t) || t.preventDefault()
            }
            ), !1)
        }
        ).toString()})(${e.toString()})<\/script>`
    }
    ))
      , We = (e, t) => tinymce.html.Serializer({
        validate: !0
    }, e.schema).serialize(e.parser.parse(t, {
        insert: !0
    }))
      , Ye = e => `<style type="text/css">${e}</style>`
      , Qe = (e, t) => w.from(e).filter((e => e.length > 0)).map(t).getOr("")
      , Xe = Ye(".mce-advtemplate-preview-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #b1aeae; font-family: sans-serif; }")
      , Ze = (e, t) => {
        if (-1 === t.indexOf("<html>")) {
            const a = Qe(_e(e), Ye)
              , n = we(e) ? ' crossorigin="anonymous"' : ""
              , o = A(e.contentCSS, (t => `<link type="text/css" rel="stylesheet" href="${e.documentBaseURI.toAbsolute(t)}"${n}>`))
              , r = e.dom.encode
              , i = `<base href="${r(e.documentBaseURI.getURI())}">`
              , l = Qe(be(e), (e => ` class="${r(e)}"`))
              , s = Qe(e.getBody().dir, (e => ` dir="${r(e)}"`));
            return ["<!DOCTYPE html><html><head>", i, o.join(""), Xe, a, Je(), `</head><body${l}${s}>`, We(e, t), "</body></html>"].join("")
        }
        return t
    }
      , et = e => {
        const t = Se("div");
        var a, n;
        return n = "mce-advtemplate-preview-placeholder",
        (e => void 0 !== e.dom.classList)(a = t) ? a.dom.classList.add(n) : Ge(a, n),
        ( (e, t) => {
            e.dom.textContent = t
        }
        )(t, e.translate("Select template to preview")),
        Ze(e, (e => {
            const t = Se("div");
            return ( (e, t) => {
                e.dom.appendChild(t.dom)
            }
            )(t, Ce(e.dom.cloneNode(!0))),
            (e => e.dom.innerHTML)(t)
        }
        )(t))
    }
      , tt = (e, t, a) => ({
        renameCategory: t => () => ( (e, t, a) => {
            G(a) || e.windowManager.open({
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
                onChange: e => {
                    const t = e.getData();
                    e.setEnabled("save", t.title.length > 0)
                }
                ,
                onSubmit: n => {
                    const {title: o} = n.getData();
                    ce(e)(a.id, o).then((async () => {
                        await t(),
                        n.close()
                    }
                    )).catch(He(e))
                }
            })
        }
        )(e, a, t),
        renameTemplate: t => () => (async (e, t, a) => {
            const n = await he(e)()
              , o = await ye(e)(a.id);
            J(o, n) || e.windowManager.open({
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
                onChange: e => {
                    const t = e.getData();
                    e.setEnabled("save", t.title.length > 0)
                }
                ,
                onSubmit: n => {
                    const {title: o} = n.getData();
                    ue(e)(a.id, o).then((async () => {
                        await t(),
                        n.close()
                    }
                    )).catch(He(e))
                }
            })
        }
        )(e, a, t),
        moveTemplate: t => () => {
            (async (e, t, a) => {
                const n = await he(e)()
                  , o = await ye(e)(a);
                J(o, n) || e.windowManager.open({
                    title: "Move to",
                    body: {
                        type: "panel",
                        items: [{
                            type: "listbox",
                            name: "category",
                            label: "Category",
                            items: ze(n, Ue(a, n))
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
                    onSubmit: n => {
                        const {category: o} = n.getData();
                        ge(e)(a, Ve(o)).then((async () => {
                            await t(),
                            n.close()
                        }
                        )).catch(He(e))
                    }
                })
            }
            )(e, a, t)
        }
        ,
        moveCategoryItems: t => () => {
            (async (e, t, a) => {
                const n = await he(e)()
                  , o = ( (e, t) => {
                    const a = O(t, (t => t.id === e)).getOrDie();
                    if (H(a))
                        return a;
                    throw new Error(JSON.stringify(a) + " is not a category.")
                }
                )(a, n);
                G(o) || e.windowManager.open({
                    title: "Move all items",
                    body: {
                        type: "panel",
                        items: [{
                            type: "listbox",
                            name: "category",
                            label: "Category",
                            items: ze(n, a)
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
                    onSubmit: n => {
                        const {category: o} = n.getData();
                        me(e)(a, Ve(o)).then((async () => {
                            await t(),
                            n.close()
                        }
                        )).catch(He(e))
                    }
                })
            }
            )(e, a, t)
        }
        ,
        deleteTemplate: n => () => {
            e.windowManager.confirm("Are you sure you want to permanently delete the template?", (o => {
                o && ve(e)(n).then((async () => {
                    t.get().exists((e => e === n)) ? (t.clear(),
                    await a(!0)) : await a(!1)
                }
                )).catch(He(e))
            }
            ))
        }
        ,
        deleteCategory: t => () => {
            e.windowManager.confirm("Are you sure you want to permanently delete the category and all its content?", (n => {
                n && de(e)(t).then((async () => {
                    await a()
                }
                )).catch(He(e))
            }
            ))
        }
    })
      , at = async e => {
        let t = !1;
        const a = ( () => {
            const e = (e => {
                const t = g(w.none())
                  , a = () => t.get().each(e);
                return {
                    clear: () => {
                        a(),
                        t.set(w.none())
                    }
                    ,
                    isSet: () => t.get().isSome(),
                    get: () => t.get(),
                    set: e => {
                        a(),
                        t.set(w.some(e))
                    }
                }
            }
            )(y);
            return {
                ...e,
                on: t => e.get().each(t)
            }
        }
        )();
        let n = [];
        const o = n => {
            ye(e)(n).then((o => {
                m.setData({
                    preview: Ze(e, o.content)
                }),
                a.set(n),
                t || (t = !0,
                m.setEnabled("submit", !0))
            }
            ))
        }
          , r = (e, t) => {
            if (0 === t.length)
                return e;
            {
                const a = t.toLowerCase()
                  , n = ( (e, t) => {
                    const a = x.call(e, 0);
                    return a.sort(( (e, t) => e.index - t.index)),
                    a
                }
                )(k(Fe(e), (e => {
                    const t = e.title.toLowerCase().indexOf(a);
                    return t >= 0 ? [{
                        item: e,
                        index: t
                    }] : []
                }
                )));
                return A(n, ( ({item: e}) => e))
            }
        }
          , i = (l, c) => ({
            title: "Templates",
            size: "large",
            onChange: () => {
                const e = m.getData();
                m.redial(i(l, e))
            }
            ,
            onAction: (t, a) => {
                "addcategory" === a.name && ( (e, t) => {
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
                        onChange: e => {
                            const t = e.getData();
                            e.setEnabled("save", t.title.length > 0)
                        }
                        ,
                        onSubmit: a => {
                            const {title: n} = a.getData();
                            se(e)(n).then((async () => {
                                await t(),
                                a.close()
                            }
                            )).catch(He(e))
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
                            onToggleExpand: e => {
                                n = e
                            }
                            ,
                            defaultExpandedIds: c.search.length > 0 ? [] : n,
                            ...a.get().fold(( () => ({})), (e => ({
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
            buttons: [...Ke(e, "advtemplate_create_category", {
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
            onSubmit: t => {
                a.get().each((a => {
                    Re(e, a).then(t.close).catch(He(e))
                }
                ))
            }
        })
          , l = async t => {
            const a = await he(e)();
            return qe(null, a, t, e)
        }
          , s = async (t=!1) => {
            const a = await l(c)
              , n = m.getData();
            t && (n.preview = et(e)),
            m.redial(i(a, n))
        }
          , c = tt(e, a, s)
          , m = e.windowManager.open(i(await l(c), {
            preview: et(e),
            search: ""
        }))
    }
      , nt = (e, t, a) => m(a) ? e.execCommand(t) : e.execCommand(t, !1, a)
      , ot = (rt = /^\s+|\s+$/g,
    e => e.replace(rt, ""));
    var rt;
    tinymce.PluginManager.requireLangPack("advtemplate", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("advtemplate", (e => {
        ( (e, a) => !!e && -1 === ( (e, a) => {
            const n = t(e.major, a.major);
            if (0 !== n)
                return n;
            const o = t(e.minor, a.minor);
            if (0 !== o)
                return o;
            const r = t(e.patch, a.patch);
            return 0 !== r ? r : 0
        }
        )((e => n((e => [e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), n(a)))(tinymce, "6.5.0") ? console.error("The advtemplate plugin requires at least version 6.5.0 of TinyMCE.") : (le(e),
        (e => {
            w.from(fe(e)).each((t => {
                const a = ( (e=[]) => {
                    let t = [];
                    const a = {}
                      , n = {};
                    let o = 0;
                    const r = () => (++o).toString()
                      , l = e => e.bind(s).exists(G)
                      , s = e => w.from(n[e])
                      , c = e => s(e).getOrDie("Category not found")
                      , m = e => e.bind(s).fold(( () => t), (e => e.items))
                      , d = (e, t) => {
                        if (!(i(t) && (a = ot(t),
                        a.length > 0)))
                            throw new Error("Invalid title");
                        var a;
                        if (( (e, a) => {
                            for (let a = 0, n = e.length; a < n; a++)
                                if (e[a].title === t)
                                    return !0;
                            return !1
                        }
                        )(e))
                            throw new Error("The name already exists")
                    }
                      , p = e => w.from(a[e]).getOrDie("Template not found")
                      , u = (e, a) => {
                        d(t, e);
                        const o = r()
                          , i = {
                            id: o,
                            title: e,
                            items: [],
                            locked: a || !1
                        };
                        return t.push(i),
                        n[o] = i,
                        {
                            ...i
                        }
                    }
                      , g = (e, t, n) => {
                        const o = m(w.from(n));
                        d(o, e);
                        const i = r()
                          , l = {
                            id: i,
                            title: e,
                            content: t
                        };
                        return o.push(l),
                        a[i] = {
                            template: l,
                            parent: w.from(n)
                        },
                        {
                            ...l
                        }
                    }
                      , y = (e, t) => {
                        const a = m(t);
                        P(a, (t => t.id === e)).each((e => a.splice(e, 1)))
                    }
                      , v = async (e, t) => {
                        const {template: n, parent: o} = p(e)
                          , r = w.from(t);
                        return l(o) || l(r) || (m(r).push(n),
                        y(e, o),
                        a[e] = {
                            template: n,
                            parent: r
                        }),
                        Promise.resolve({})
                    }
                      , h = (e, t) => {
                        for (const a of e)
                            if (X(a)) {
                                const e = u(a.title, a.locked);
                                h(a.items, e.id)
                            } else
                                g(a.title, a.content, t)
                    }
                    ;
                    return h(e),
                    {
                        advtemplate_create_category: async e => {
                            const {id: t} = u(e);
                            return Promise.resolve({
                                id: t
                            })
                        }
                        ,
                        advtemplate_rename_category: async (e, a) => {
                            const n = c(e);
                            return n.title === a || G(n) || (d(t, a),
                            n.title = a),
                            Promise.resolve({})
                        }
                        ,
                        advtemplate_delete_category: async e => {
                            const a = c(e);
                            return G(a) || (( (t, a) => {
                                for (let a = t.length - 1; a >= 0; a--)
                                    n = t[a],
                                    y(n.id, w.from(e));
                                var n
                            }
                            )(a.items),
                            P(t, (t => t.id === e)).each((e => t.splice(e, 1))),
                            delete n[e]),
                            Promise.resolve({})
                        }
                        ,
                        advtemplate_create_template: async (e, t, a) => {
                            l(w.from(a)) && (a = void 0);
                            const {id: n} = g(e, t, a);
                            return Promise.resolve({
                                id: n
                            })
                        }
                        ,
                        advtemplate_rename_template: async (e, t) => {
                            const {template: a, parent: n} = p(e);
                            if (l(n))
                                return Promise.resolve({});
                            if (a.title === t)
                                return Promise.resolve({});
                            const o = m(n);
                            return d(o, t),
                            a.title = t,
                            Promise.resolve({})
                        }
                        ,
                        advtemplate_update_template: async (e, t) => {
                            const {template: a, parent: n} = p(e);
                            return l(n) || (a.content = t),
                            Promise.resolve({})
                        }
                        ,
                        advtemplate_move_template: v,
                        advtemplate_get_template: async e => {
                            const {template: t} = p(e);
                            return Promise.resolve({
                                ...t
                            })
                        }
                        ,
                        advtemplate_delete_template: async e => {
                            const {parent: t} = p(e);
                            return l(t) || (y(e, t),
                            delete a[e]),
                            Promise.resolve({})
                        }
                        ,
                        advtemplate_list: async (e=!1) => {
                            if (e)
                                return Promise.resolve([...t]);
                            {
                                const e = A(t, (e => H(e) ? {
                                    id: e.id,
                                    title: e.title,
                                    locked: e.locked,
                                    items: A(e.items, ( ({id: e, title: t}) => ({
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
                        advtemplate_delete_all: async () => (t = D(t, (e => H(e) ? G(e) : J(e, t))),
                        L(a, ( (e, t) => {
                            e.parent.exists((e => s(e).exists(G))) || delete a[t]
                        }
                        )),
                        L(n, ( (e, t) => {
                            G(e) || delete n[t]
                        }
                        )),
                        Promise.resolve({})),
                        advtemplate_move_category_items: async (e, t) => {
                            const a = w.from(e);
                            if (l(a) || l(w.from(t)))
                                return Promise.resolve({});
                            const n = m(a).slice();
                            for (let e = 0; e < n.length; e++) {
                                const a = (o = n,
                                (r = e) >= 0 && r < o.length ? w.some(o[r]) : w.none());
                                await v(a.getOrDie().id, t)
                            }
                            var o, r;
                            return Promise.resolve({})
                        }
                    }
                }
                )(t);
                L(a, ( (t, a) => {
                    T(["advtemplate_list", "advtemplate_get_template"], a) ? e.options.set(a, t) : e.options.unset(a)
                }
                ))
            }
            ))
        }
        )(e),
        (e => {
            const t = (t, a) => {
                e.addCommand(t, a)
            }
            ;
            t("AdvTemplateInsertDialog", ( () => {
                at(e)
            }
            )),
            e.options.isSet("advtemplate_create_template") && t("AdvTemplateAddDialog", ( () => {
                (async e => {
                    const t = await he(e)();
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
                                items: ze(t)
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
                        onChange: e => {
                            const t = e.getData();
                            e.setEnabled("save", t.title.length > 0)
                        }
                        ,
                        onSubmit: t => {
                            const {title: a, category: n} = t.getData();
                            pe(e)(a, e.selection.getContent(), Ve(n)).then(( () => {
                                t.close(),
                                e.notificationManager.open({
                                    text: "Template successfully saved",
                                    type: "success",
                                    timeout: 2e3
                                })
                            }
                            )).catch(He(e))
                        }
                    })
                }
                )(e)
            }
            )),
            t("AdvTemplateInsertTemplateById", ( (t, a) => {
                if (!V(a))
                    throw new Error("Id should be non-empty string");
                Re(e, a).catch((e => {
                    console.error("Insert template by id failed due to:", e)
                }
                ))
            }
            ))
        }
        )(e),
        (e => {
            e.options.isSet("advtemplate_create_template") && e.ui.registry.addButton("addtemplate", {
                tooltip: "Save as template",
                icon: "template-add",
                onAction: () => {
                    nt(e, "AdvTemplateAddDialog")
                }
                ,
                onSetup: t => {
                    t.setEnabled(!1);
                    const a = () => {
                        t.setEnabled(!e.selection.isCollapsed() && !e.mode.isReadOnly())
                    }
                    ;
                    return e.on("NodeChange SelectionChange", a),
                    () => {
                        e.off("NodeChange SelectionChange", a)
                    }
                }
            }),
            e.ui.registry.addButton("inserttemplate", {
                tooltip: "Insert template",
                icon: "template",
                onSetup: t => {
                    const a = () => {
                        t.setEnabled(e.selection.isEditable())
                    }
                    ;
                    return e.on("NodeChange", a),
                    a(),
                    () => {
                        e.off("NodeChange", a)
                    }
                }
                ,
                onAction: () => {
                    nt(e, "AdvTemplateInsertDialog")
                }
            })
        }
        )(e),
        (e => {
            e.ui.registry.addMenuItem("inserttemplate", {
                text: "Template...",
                icon: "template",
                onSetup: t => (t.setEnabled(e.selection.isEditable()),
                y),
                onAction: () => nt(e, "AdvTemplateInsertDialog")
            }),
            e.options.isSet("advtemplate_create_template") && e.ui.registry.addMenuItem("addtemplate", {
                text: "Save as template...",
                icon: "template-add",
                onAction: () => e.execCommand("AdvTemplateAddDialog"),
                onSetup: t => (t.setEnabled(!e.selection.isCollapsed()),
                y)
            }),
            e.ui.registry.addContextMenu("advtemplate", {
                update: v("addtemplate")
            })
        }
        )(e))
    }
    ))
}();
