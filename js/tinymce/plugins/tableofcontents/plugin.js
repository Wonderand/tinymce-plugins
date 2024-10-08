/*!
 * Tiny Table of Contents plugin
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
      , o = e=>{
        const o = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
        return o ? n(t(o[1]), t(o[2]), t(o[3])) : n(0, 0, 0)
    }
      , r = t=>e=>(t=>{
        const e = typeof t;
        return null === t ? "null" : "object" === e && Array.isArray(t) ? "array" : "object" === e && (n = o = t,
        (r = String).prototype.isPrototypeOf(n) || (null === (s = o.constructor) || void 0 === s ? void 0 : s.name) === r.name) ? "string" : e;
        var n, o, r, s
    }
    )(e) === t
      , s = r("string")
      , l = r("object")
      , i = t=>!(t=>null == t)(t)
      , a = t=>"number" == typeof t
      , c = (!1,
    ()=>false);
    class u {
        constructor(t, e) {
            this.tag = t,
            this.value = e
        }
        static some(t) {
            return new u(!0,t)
        }
        static none() {
            return u.singletonNone
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
            return this.tag ? u.some(t(this.value)) : u.none()
        }
        bind(t) {
            return this.tag ? t(this.value) : u.none()
        }
        exists(t) {
            return this.tag && t(this.value)
        }
        forall(t) {
            return !this.tag || t(this.value)
        }
        filter(t) {
            return !this.tag || t(this.value) ? this : u.none()
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
            return i(t) ? u.some(t) : u.none()
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
    u.singletonNone = new u(!1);
    const d = t=>{
        if (null == t)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: t
        }
    }
      , h = d
      , f = "undefined" != typeof window ? window : Function("return this;")()
      , m = (t,e)=>((t,e)=>{
        let n = null != e ? e : f;
        for (let e = 0; e < t.length && null != n; ++e)
            n = n[t[e]];
        return n
    }
    )(t.split("."), e)
      , g = Object.getPrototypeOf
      , p = t=>{
        const e = m("ownerDocument.defaultView", t);
        return l(t) && ((t=>((t,e)=>{
            const n = ((t,e)=>m(t, e))(t, e);
            if (null == n)
                throw new Error(t + " not available on this browser");
            return n
        }
        )("HTMLElement", t))(e).prototype.isPrototypeOf(t) || /^HTML\w*Element$/.test(g(t).constructor.name))
    }
      , b = t=>v(t) && p(t.dom)
      , v = (1,
    t=>1 === (t=>t.dom.nodeType)(t));
    const y = t=>e=>e.options.get(t)
      , _ = y("tableofcontents_class")
      , T = y("tableofcontents_header")
      , C = y("tableofcontents_depth")
      , w = y("tableofcontents_includeheader")
      , E = y("tableofcontents_orderedlist")
      , j = y("tableofcontents_orderedlist_type")
      , A = t=>{
        return (o = h(t),
        r = b,
        (e = o.dom.childNodes,
        n = t=>r(h(t)),
        ((t,e,n)=>{
            for (let o = 0, r = t.length; o < r; o++) {
                const r = t[o];
                if (e(r, o))
                    return u.some(r);
                if (n(r, o))
                    break
            }
            return u.none()
        }
        )(e, n, c)).map(h)).map((t=>t.dom.innerHTML));
        var e, n, o, r
    }
      , N = (t=>{
        let e = 0;
        return ()=>"mcetoc_" + (new Date).getTime().toString(32) + (e++).toString(32)
    }
    )()
      , O = t=>{
        const e = _(t)
          , n = T(t)
          , o = (t=>{
            const e = [];
            for (let n = 1; n <= t; n++)
                e.push("h" + n);
            return e.join(",")
        }
        )(C(t));
        let r = t.dom.select(o);
        return r.length && /^h[1-9]$/i.test(n) && (r = ((t,e)=>{
            const n = [];
            for (let o = 0, r = t.length; o < r; o++) {
                const r = t[o];
                e(r) && n.push(r)
            }
            return n
        }
        )(r, (n=>{
            const o = n.parentElement;
            return i(o) && !t.dom.hasClass(o, e) && !t.dom.isEmpty(n)
        }
        ))),
        ((t,e)=>{
            const n = t.length
              , o = new Array(n);
            for (let r = 0; r < n; r++) {
                const n = t[r];
                o[r] = e(n)
            }
            return o
        }
        )(r, (t=>({
            id: t.id || N(),
            level: parseInt(t.nodeName.replace(/^H/i, ""), 10),
            title: t.innerText,
            element: t
        })))
    }
      , S = (t,e)=>{
        let n = "";
        const o = O(t)
          , r = E(t) ? "ol" : "ul"
          , s = [r];
        let l = (t=>{
            let e = 9;
            for (const n of t)
                if (n.level < e && (e = n.level),
                1 === e)
                    return e;
            return e
        }
        )(o) - 1;
        if (!o.length)
            return "";
        if (E(t) && s.push(`type="${j(t)}"`),
        w(t)) {
            const o = e.getOr(t.translate("Table of Contents"));
            n += ((t,e)=>"<" + t + ' contenteditable="true">' + e + "</" + t + ">")(T(t), o)
        }
        for (let e = 0; e < o.length; e++) {
            const i = o[e];
            i.element.id = i.id;
            const a = o[e + 1] && o[e + 1].level;
            if (l === i.level)
                n += "<li>";
            else
                for (let t = l; t < i.level; t++)
                    n += `<${s.join(" ")}><li>`;
            if (n += '<a href="#' + i.id + '">' + t.dom.encode(i.title) + "</a>",
            a !== i.level && a)
                for (let t = i.level; t > a; t--)
                    n += t === a + 1 ? `</li></${r}><li>` : `</li></${r}>`;
            else
                n += "</li>",
                a || (n += `</${r}>`);
            l = i.level
        }
        return n
    }
      , P = t=>{
        const e = _(t)
          , n = t.dom.select("." + e);
        n.length && t.undoManager.transact((()=>{
            t.dom.setHTML(n, S(t, A(n[0])))
        }
        ))
    }
      , k = t=>e=>{
        const n = ()=>{
            const n = t.selection.isEditable();
            e.setEnabled(!t.readonly && n && (t=>O(t).length > 0)(t))
        }
        ;
        return t.on("NodeChange LoadContent SetContent change", n),
        n(),
        ()=>t.off("NodeChange LoadContent SetContent change", n)
    }
      , I = t=>e=>t.dom.is(e, "." + _(t)) && t.getBody().contains(e);
    tinymce.PluginManager.requireLangPack("tableofcontents", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("tableofcontents", (t=>{
        ((t,n)=>!!t && -1 === ((t,n)=>{
            const o = e(t.major, n.major);
            if (0 !== o)
                return o;
            const r = e(t.minor, n.minor);
            if (0 !== r)
                return r;
            const s = e(t.patch, n.patch);
            return 0 !== s ? s : 0
        }
        )((t=>o((t=>[t.majorVersion, t.minorVersion].join(".").split(".").slice(0, 3).join("."))(t)))(t), o(n)))(tinymce, "6.4.0") ? console.error("The tinydrive plugin requires at least version 6.4.0 of TinyMCE.") : ((t=>{
            const e = t.options.register;
            e("tableofcontents_class", {
                processor: "string",
                default: "mce-toc"
            }),
            e("tableofcontents_header", {
                processor: t=>s(t) && /^h[1-6]$/.test(t),
                default: "h2"
            }),
            e("tableofcontents_depth", {
                processor: t=>a(t) && t >= 1 && t <= 9,
                default: 3
            }),
            e("tableofcontents_includeheader", {
                processor: "boolean",
                default: !0
            }),
            e("tableofcontents_orderedlist", {
                processor: "boolean",
                default: !1
            }),
            e("tableofcontents_orderedlist_type", {
                processor: t=>s(t) && ["1", "A", "a", "I", "i"].includes(t),
                default: "1"
            })
        }
        )(t),
        (t=>{
            t.addCommand("mceInsertToc", (()=>{
                (t=>{
                    const e = _(t)
                      , n = t.dom.select("." + e);
                    ((t,e)=>!e.length || t.dom.getParents(e[0], ".mce-offscreen-selection").length > 0)(t, n) ? t.insertContent(((t,e)=>{
                        const n = S(t, e);
                        return '<div class="' + t.dom.encode(_(t)) + '" contenteditable="false" data-mce-toc="true">' + n + "</div>"
                    }
                    )(t, u.none())) : P(t)
                }
                )(t)
            }
            )),
            t.addCommand("mceUpdateToc", (()=>{
                P(t)
            }
            ))
        }
        )(t),
        (t=>{
            const e = ()=>t.execCommand("mceInsertToc");
            t.ui.registry.addButton("tableofcontents", {
                icon: "toc",
                tooltip: "Table of contents",
                onAction: e,
                onSetup: k(t)
            }),
            t.ui.registry.addButton("tableofcontentsupdate", {
                icon: "reload",
                tooltip: "Update",
                onAction: ()=>t.execCommand("mceUpdateToc")
            }),
            t.ui.registry.addMenuItem("tableofcontents", {
                icon: "toc",
                text: "Table of contents",
                onAction: e,
                onSetup: k(t)
            }),
            t.ui.registry.addContextToolbar("tableofcontents", {
                items: "tableofcontentsupdate",
                predicate: I(t),
                scope: "node",
                position: "node"
            })
        }
        )(t),
        (t=>{
            const e = _(t)
              , n = "data-mce-toc";
            t.on("PreProcess", (n=>{
                const o = t.dom
                  , r = o.select("." + e, n.node)[0];
                r && ((t,e)=>{
                    for (let e = 0, r = t.length; e < r; e++)
                        n = t[e],
                        o.setAttrib(n, "contentEditable", null);
                    var n
                }
                )([r].concat(o.select("[contenteditable]", r)))
            }
            )),
            t.on("PreInit", (()=>{
                t.serializer.addTempAttr(n)
            }
            )),
            t.on("SetContent", (()=>{
                const o = t.dom
                  , r = o.select("." + e)[0];
                if (r) {
                    o.setAttribs(r, {
                        contentEditable: !1,
                        [n]: !0
                    });
                    const t = r.firstElementChild;
                    i(t) && o.setAttrib(t, "contentEditable", !0)
                }
            }
            ))
        }
        )(t))
    }
    ))
}();
