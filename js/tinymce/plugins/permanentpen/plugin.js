/*!
 * Tiny Permanent Pen plugin
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
      , t = e=>parseInt(e, 10)
      , n = (e,t)=>{
        const n = e - t;
        return 0 === n ? 0 : n > 0 ? 1 : -1
    }
      , r = (e,t,n)=>({
        major: e,
        minor: t,
        patch: n
    })
      , o = e=>{
        const n = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
        return n ? r(t(n[1]), t(n[2]), t(n[3])) : r(0, 0, 0)
    }
      , a = ("object",
    e=>"object" === (e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (n = r = e,
        (o = String).prototype.isPrototypeOf(n) || (null === (a = r.constructor) || void 0 === a ? void 0 : a.name) === o.name) ? "string" : t;
        var n, r, o, a
    }
    )(e));
    const i = e=>e;
    class s {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new s(!0,e)
        }
        static none() {
            return s.singletonNone
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
            return this.tag ? s.some(e(this.value)) : s.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : s.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : s.none()
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
            return null == e ? s.none() : s.some(e)
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
    s.singletonNone = new s(!1);
    const l = Array.prototype.indexOf
      , c = (e,t)=>{
        return n = e,
        r = t,
        l.call(n, r) > -1;
        var n, r
    }
      , m = (e,t)=>{
        for (let n = 0, r = e.length; n < r; n++)
            t(e[n], n)
    }
      , u = (e,t,n)=>(m(e, ((e,r)=>{
        n = t(n, e, r)
    }
    )),
    n)
      , p = Object.keys
      , g = (e,t)=>{
        const n = [];
        return ((e,t)=>{
            const n = p(e);
            for (let r = 0, o = n.length; r < o; r++) {
                const o = n[r];
                t(e[o], o)
            }
        }
        )(e, ((e,r)=>{
            n.push(t(e, r))
        }
        )),
        n
    }
      , f = (h = /^\s+|\s+$/g,
    e=>e.replace(h, ""));
    var h;
    const d = {
        fontname: "arial,helvetica,sans-serif",
        forecolor: "#E74C3C",
        fontsize: "12pt",
        hilitecolor: "",
        bold: !0,
        italic: !1,
        underline: !1,
        strikethrough: !1
    }
      , v = ("permanentpen_properties",
    e=>e.options.get("permanentpen_properties"));
    const y = e=>{
        var t;
        return (e=>{
            const t = e.indexOf("=") > 0 ? e.split(/[;,](?![^=;,]*(?:[;,]|$))/) : e.split(",");
            return u(t, ((e,t)=>{
                const n = t.split("=")
                  , r = n[0]
                  , o = n.length > 1 ? n[1] : r;
                return e[f(r)] = f(o),
                e
            }
            ), {})
        }
        )(null !== (t = e.options.get("font_family_formats")) && void 0 !== t ? t : "")
    }
      , b = e=>{
        var t;
        return (null !== (t = e.options.get("font_size_formats")) && void 0 !== t ? t : "").split(/[, ]/)
    }
      , P = e=>{
        const t = (e=>((e,t)=>{
            const n = e.length
              , r = new Array(n);
            for (let t = 0; t < n; t++) {
                const n = e[t];
                r[t] = {
                    text: o = n,
                    value: o
                }
            }
            var o;
            return r
        }
        )(b(e)))(e)
          , n = (e=>g(y(e), ((e,t)=>({
            text: t,
            value: e
        }))))(e);
        return {
            type: "panel",
            items: [{
                type: "listbox",
                name: "fontname",
                label: "Font",
                items: n
            }, {
                type: "listbox",
                name: "fontsize",
                label: "Size",
                items: t
            }, {
                type: "label",
                label: "Styles",
                items: [{
                    type: "bar",
                    items: [{
                        type: "checkbox",
                        name: "bold",
                        label: "Bold"
                    }, {
                        type: "checkbox",
                        name: "italic",
                        label: "Italic"
                    }, {
                        type: "checkbox",
                        name: "strikethrough",
                        label: "Strikethrough"
                    }, {
                        type: "checkbox",
                        name: "underline",
                        label: "Underline"
                    }]
                }]
            }, {
                name: "forecolor",
                type: "colorinput",
                label: "Text color"
            }, {
                name: "hilitecolor",
                type: "colorinput",
                label: "Background color"
            }]
        }
    }
      , x = e=>"br" === (null == e ? void 0 : e.nodeName.toLowerCase())
      , C = (e,t)=>(e=>c(["bold", "italic", "underline", "strikethrough"], e))(t) && e ? s.some({
        formatName: t,
        values: {}
    }) : (e=>c(["forecolor", "hilitecolor", "fontname", "fontsize"], e))(t) && e.length > 0 ? s.some({
        formatName: t,
        values: {
            value: e
        }
    }) : s.none()
      , T = e=>!e.isComposing && ("insertText" === e.inputType || "compositionend" === e.type) && null !== e.data && e.data.length > 0
      , N = (e,t,n,r)=>{
        e.undoManager.ignore((()=>{
            "Apply" === r ? ((e,t,n)=>{
                if (!((e,t)=>((t,n)=>{
                    for (let n = 0, o = t.length; n < o; ++n)
                        if (!0 !== (r = t[n],
                        e.formatter.match(r.formatName, r.values)))
                            return !1;
                    var r;
                    return !0
                }
                )(t))(e, t)) {
                    const r = e.selection.getRng();
                    r.setStart(r.startContainer, r.startOffset - n),
                    e.selection.setRng(r),
                    e.formatter.remove("removeformat"),
                    ((e,t)=>{
                        m(t, (t=>{
                            e.formatter.apply(t.formatName, t.values)
                        }
                        ))
                    }
                    )(e, t),
                    ((e,t)=>{
                        const n = e.getRng().cloneRange();
                        n.setEnd(n.startContainer, n.startOffset + t),
                        n.setStart(n.startContainer, n.startOffset + t),
                        e.setRng(n)
                    }
                    )(e.selection, n)
                }
            }
            )(e, (e=>(e=>{
                const t = []
                  , n = e=>{
                    t.push(e)
                }
                ;
                for (let t = 0; t < e.length; t++)
                    e[t].each(n);
                return t
            }
            )(g(e, C)))(t), n) : ((e,t)=>{
                const n = 0 === t
                  , r = e.selection.getRng().cloneRange();
                if (t > 0)
                    r.setStart(r.startContainer, r.startOffset - t);
                else {
                    const t = (e=>{
                        const t = e.dom.create("span", {
                            id: "_mce_caret",
                            "data-mce-bogus": "1",
                            "data-mce-type": "format-caret"
                        });
                        return t.appendChild(e.getDoc().createTextNode("\ufeff")),
                        t
                    }
                    )(e);
                    r.insertNode(t),
                    r.selectNodeContents(t),
                    x(t.previousSibling) && x(t.nextSibling) && r.setEndAfter(t.nextSibling)
                }
                e.selection.setRng(r),
                e.formatter.remove("removeformat"),
                e.selection.collapse(n)
            }
            )(e, n)
        }
        ))
    }
      , S = (e,t,n)=>{
        if (!((e,t)=>{
            for (let t = 0, r = e.length; t < r; t++)
                if (e[t] === n)
                    return !0;
            return !1
        }
        )(t)) {
            const r = u(t, ((e,t)=>e + `"${t}" `), `TinyMCE PermanentPen permanentpen_properties.${e}: "${n}" not found. Possible values are: `);
            console.log(r)
        }
    }
    ;
    tinymce.PluginManager.add("permanentpen", (t=>{
        if (((e,t)=>!!e && -1 === ((e,t)=>{
            const r = n(e.major, t.major);
            if (0 !== r)
                return r;
            const o = n(e.minor, t.minor);
            if (0 !== o)
                return o;
            const a = n(e.patch, t.patch);
            return 0 !== a ? a : 0
        }
        )((e=>o((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), o(t)))(tinymce, "6.0.0"))
            return void console.error("The permanentpen plugin requires at least version 6.0.0 of TinyMCE");
        (e=>{
            (0,
            e.options.register)("permanentpen_properties", {
                processor: e=>a(e) ? {
                    value: {
                        ...d,
                        ...e
                    },
                    valid: !0
                } : {
                    valid: !1,
                    message: "Must be an object."
                },
                default: d
            })
        }
        )(t),
        (e=>{
            const t = v(e);
            var n;
            S("fontsize", b(e), t.fontsize),
            S("fontname", (n = y(e),
            g(n, i)), t.fontname)
        }
        )(t);
        const r = e(!1)
          , s = e(v(t))
          , l = ((e,t)=>{
            const n = n=>{
                T(n) && N(e, t.get(), n.data.length, "Apply")
            }
              , r = n=>{
                const a = "input" === n.type && T(n) ? n.data.length : 0;
                N(e, t.get(), a, "Remove"),
                o(r)
            }
              , o = t=>{
                e.off("input compositionend NewBlock", t),
                t === r && e.off("nodechange", a)
            }
              , a = ()=>{
                e.composing || o(r)
            }
              , i = ()=>{
                o(n),
                o(r)
            }
            ;
            return {
                enterPermaPenMode: ()=>{
                    i(),
                    e.on("input compositionend", n)
                }
                ,
                leavePermaPenMode: ()=>{
                    i(),
                    e.once("input compositionend NewBlock", r),
                    e.on("nodechange", a)
                }
            }
        }
        )(t, s);
        ((e,t,n,r)=>{
            e.addCommand("mceConfigurePermanentPen", (()=>{
                ((e,t)=>{
                    e.windowManager.open({
                        title: "Permanent Pen Properties",
                        size: "normal",
                        body: P(e),
                        onSubmit: n=>{
                            const r = n.getData();
                            t.set(r),
                            ((e,t)=>{
                                e.dispatch("PermanentPenProperties", {
                                    properties: t
                                })
                            }
                            )(e, r),
                            n.close()
                        }
                        ,
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
                        initialData: t.get()
                    })
                }
                )(e, t)
            }
            )),
            e.addCommand("mceTogglePermanentPen", (()=>{
                const t = !n.get();
                ((e,t)=>{
                    e.dispatch("PermanentPenToggle", {
                        state: t
                    })
                }
                )(e, t),
                n.set(t),
                t ? r.enterPermaPenMode() : r.leavePermaPenMode()
            }
            ))
        }
        )(t, s, r, l),
        (e=>{
            e.ui.registry.addMenuItem("configurepermanentpen", {
                icon: "permanent-pen",
                text: "Permanent pen properties...",
                onAction: ()=>e.execCommand("mceConfigurePermanentPen")
            }),
            e.ui.registry.addMenuItem("permanentpen", {
                icon: "permanent-pen",
                text: "Permanent pen",
                onAction: ()=>e.execCommand("mceTogglePermanentPen")
            })
        }
        )(t),
        (e=>{
            e.ui.registry.addToggleButton("permanentpen", {
                icon: "permanent-pen",
                tooltip: "Permanent pen",
                onAction: ()=>e.execCommand("mceTogglePermanentPen"),
                onSetup: t=>{
                    const n = e=>{
                        t.setActive(e.state)
                    }
                    ;
                    return e.on("PermanentPenToggle", n),
                    ()=>e.off("PermanentPenToggle", n)
                }
            })
        }
        )(t),
        ((e,t)=>{
            e.ui.registry.addContextMenu("configurepermanentpen", {
                update: ()=>t.get() ? ["configurepermanentpen"] : []
            })
        }
        )(t, r)
    }
    ))
}();
