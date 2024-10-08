/*!
 * Tiny Image Editing plugin
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
      , r = (e,t)=>{
        const r = e - t;
        return 0 === r ? 0 : r > 0 ? 1 : -1
    }
      , o = (e,t,r)=>({
        major: e,
        minor: t,
        patch: r
    })
      , n = e=>{
        const r = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
        return r ? o(t(r[1]), t(r[2]), t(r[3])) : o(0, 0, 0)
    }
      , a = Object.getPrototypeOf
      , i = (e,t,r)=>{
        var o;
        return !!r(e, t.prototype) || (null === (o = e.constructor) || void 0 === o ? void 0 : o.name) === t.name
    }
      , s = e=>t=>(e=>{
        const t = typeof e;
        return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && i(e, String, ((e,t)=>t.isPrototypeOf(e))) ? "string" : t
    }
    )(t) === e
      , l = e=>t=>typeof t === e
      , d = s("string")
      , c = s("object")
      , u = e=>((e,t)=>c(e) && i(e, t, ((e,t)=>a(e) === t)))(e, Object)
      , m = s("array")
      , h = l("boolean")
      , g = (void 0,
    e=>undefined === e);
    const p = e=>!(e=>null == e)(e)
      , f = l("function")
      , y = l("number")
      , b = ()=>{}
      , w = e=>()=>e
      , v = e=>e
      , x = (e,t)=>e === t;
    function S(e, ...t) {
        return (...r)=>{
            const o = t.concat(r);
            return e.apply(null, o)
        }
    }
    const O = e=>e()
      , I = w(!1)
      , E = w(!0);
    class P {
        constructor(e, t) {
            this.tag = e,
            this.value = t
        }
        static some(e) {
            return new P(!0,e)
        }
        static none() {
            return P.singletonNone
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
            return this.tag ? P.some(e(this.value)) : P.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : P.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : P.none()
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
            return p(e) ? P.some(e) : P.none()
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
    P.singletonNone = new P(!1);
    const C = Object.keys
      , D = Object.hasOwnProperty
      , R = (e,t)=>{
        const r = C(e);
        for (let o = 0, n = r.length; o < n; o++) {
            const n = r[o];
            t(e[n], n)
        }
    }
      , M = (e,t)=>D.call(e, t)
      , U = Array.prototype.indexOf
      , A = (e,t)=>((e,t)=>U.call(e, t))(e, t) > -1
      , F = (e,t)=>{
        const r = e.length
          , o = new Array(r);
        for (let n = 0; n < r; n++) {
            const r = e[n];
            o[n] = t(r, n)
        }
        return o
    }
      , T = (e,t)=>{
        for (let r = 0, o = e.length; r < o; r++)
            t(e[r], r)
    }
      , k = (e,t,r)=>(T(e, ((e,o)=>{
        r = t(r, e, o)
    }
    )),
    r)
      , L = (e,t)=>((e,t,r)=>{
        for (let o = 0, n = e.length; o < n; o++) {
            const n = e[o];
            if (t(n, o))
                return P.some(n);
            if (r(n, o))
                break
        }
        return P.none()
    }
    )(e, t, I)
      , _ = e=>{
        if (null == e)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: e
        }
    }
      , N = (e,t)=>{
        const r = (t || document).createElement(e);
        return _(r)
    }
      , z = _
      , j = (e,t)=>{
        const r = void 0 === t ? document : t.dom;
        return 1 !== (o = r).nodeType && 9 !== o.nodeType && 11 !== o.nodeType || 0 === o.childElementCount ? P.none() : P.from(r.querySelector(e)).map(z);
        var o
    }
    ;
    "undefined" != typeof window ? window : Function("return this;")();
    const B = e=>t=>(e=>e.dom.nodeType)(t) === e
      , G = B(1)
      , H = B(3)
      , V = B(11)
      , W = e=>z(e.dom.getRootNode())
      , X = e=>z(e.dom.host)
      , Y = e=>{
        const t = H(e) ? e.dom.parentNode : e.dom;
        if (null == t || null === t.ownerDocument)
            return !1;
        const r = t.ownerDocument;
        return (e=>{
            const t = W(e);
            return V(r = t) && p(r.dom.host) ? P.some(t) : P.none();
            var r
        }
        )(z(t)).fold((()=>r.body.contains(t)), (o = Y,
        n = X,
        e=>o(n(e))));
        var o, n
    }
      , J = (e,t)=>((e,r)=>L(e.dom.childNodes, (e=>((e,t)=>{
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
    )(z(e), t))).map(z))(e)
      , q = (e,t)=>j(t, e)
      , K = e=>{
        const t = z((e=>{
            if (p(e.target)) {
                const t = z(e.target);
                if (G(t) && p(t.dom.shadowRoot) && e.composed && e.composedPath) {
                    const t = e.composedPath();
                    if (t)
                        return ((e,t)=>0 < e.length ? P.some(e[0]) : P.none())(t)
                }
            }
            return P.from(e.target)
        }
        )(e).getOr(e.target))
          , r = ()=>e.stopPropagation()
          , o = ()=>e.preventDefault()
          , n = (a = o,
        i = r,
        (...e)=>a(i.apply(null, e)));
        var a, i;
        return ((e,t,r,o,n,a,i)=>({
            target: e,
            x: t,
            y: r,
            stop: o,
            prevent: n,
            kill: a,
            raw: i
        }))(t, e.clientX, e.clientY, r, o, n, e)
    }
      , Z = (e,t,r,o)=>{
        e.dom.removeEventListener(t, r, o)
    }
      , $ = E
      , Q = (e,t,r)=>((e,t,r,o)=>((e,t,r,o,n)=>{
        const a = ((e,t)=>r=>{
            e(r) && t(K(r))
        }
        )(r, o);
        return e.dom.addEventListener(t, a, n),
        {
            unbind: S(Z, e, t, a, n)
        }
    }
    )(e, t, r, o, !1))(e, t, $, r)
      , ee = e=>new Promise(((t,r)=>{
        const o = ()=>{
            a(),
            t(e)
        }
          , n = [Q(e, "load", o), Q(e, "error", (()=>{
            a(),
            r("Unable to load data from image: " + e.dom.src)
        }
        ))]
          , a = ()=>T(n, (e=>e.unbind()));
        e.dom.complete && o()
    }
    ))
      , te = (e,t)=>ne(document.createElement("canvas"), e, t)
      , re = e=>{
        const t = te(e.width, e.height);
        return oe(t).drawImage(e, 0, 0),
        t
    }
      , oe = e=>e.getContext("2d")
      , ne = (e,t,r)=>(e.width = t,
    e.height = r,
    e)
      , ae = e=>e.naturalWidth || e.width
      , ie = e=>e.naturalHeight || e.height
      , se = e=>{
        const t = URL.createObjectURL(e)
          , r = new Image;
        return r.src = t,
        ee(z(r)).then((e=>e.dom))
    }
      , le = e=>new Promise(((t,r)=>{
        (e=>{
            const t = e.split(",")
              , r = /data:([^;]+)/.exec(t[0]);
            if (!r)
                return P.none();
            const o = r[1]
              , n = t[1]
              , a = 1024
              , i = atob(n)
              , s = i.length
              , l = Math.ceil(s / a)
              , d = new Array(l);
            for (let e = 0; e < l; ++e) {
                const t = e * a
                  , r = Math.min(t + a, s)
                  , o = new Array(r - t);
                for (let e = t, n = 0; e < r; ++n,
                ++e)
                    o[n] = i[e].charCodeAt(0);
                d[e] = new Uint8Array(o)
            }
            return P.some(new Blob(d,{
                type: o
            }))
        }
        )(e).fold((()=>{
            r("uri is not base64: " + e)
        }
        ), t)
    }
    ))
      , de = (e,t,r)=>(t = t || "image/png",
    f(HTMLCanvasElement.prototype.toBlob) ? new Promise(((o,n)=>{
        e.toBlob((e=>{
            e ? o(e) : n()
        }
        ), t, r)
    }
    )) : le(e.toDataURL(t, r)))
      , ce = e=>se(e)
      , ue = e=>(e=>{
        const t = e.src;
        return 0 === t.indexOf("data:") ? le(t) : fetch(t).then((e=>e.ok ? e.blob() : Promise.reject(new Error("Error " + e.status + " downloading image"))), (()=>Promise.reject((()=>{
            const e = new Error("No access to download image");
            return e.code = 18,
            e.name = "SecurityError",
            e
        }
        )())))
    }
    )(e)
      , me = e=>e.bind(v);
    (e=>{
        if (!m(e))
            throw new Error("cases must be an array");
        if (0 === e.length)
            throw new Error("there must be at least one case");
        const t = []
          , r = {};
        T(e, ((o,n)=>{
            const a = C(o);
            if (1 !== a.length)
                throw new Error("one and only one name per case");
            const i = a[0]
              , s = o[i];
            if (void 0 !== r[i])
                throw new Error("duplicate key detected:" + i);
            if ("cata" === i)
                throw new Error("cannot have a case named cata (sorry)");
            if (!m(s))
                throw new Error("case arguments must be an array");
            t.push(i),
            r[i] = (...r)=>{
                const o = r.length;
                if (o !== s.length)
                    throw new Error("Wrong number of arguments to case " + i + ". Expected " + s.length + " (" + s + "), got " + o);
                return {
                    fold: (...t)=>{
                        if (t.length !== e.length)
                            throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                        return t[n].apply(null, r)
                    }
                    ,
                    match: e=>{
                        const o = C(e);
                        if (t.length !== o.length)
                            throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + o.join(","));
                        if (!((e,t)=>{
                            for (let t = 0, n = e.length; t < n; ++t)
                                if (!0 !== (r = e[t],
                                A(o, r)))
                                    return !1;
                            var r;
                            return !0
                        }
                        )(t))
                            throw new Error("Not all branches were specified when using match. Specified: " + o.join(", ") + "\nRequired: " + t.join(", "));
                        return e[i].apply(null, r)
                    }
                    ,
                    log: e=>{
                        console.log(e, {
                            constructors: t,
                            constructor: i,
                            params: r
                        })
                    }
                }
            }
        }
        ))
    }
    )([{
        bothErrors: ["error1", "error2"]
    }, {
        firstError: ["error1", "value2"]
    }, {
        secondError: ["value1", "error2"]
    }, {
        bothValues: ["value1", "value2"]
    }]);
    const he = (e,t)=>e.exists((e=>e === t))
      , ge = e=>{
        const t = t=>t(e)
          , r = w(e)
          , o = ()=>n
          , n = {
            tag: !0,
            inner: e,
            fold: (t,r)=>r(e),
            isValue: E,
            isError: I,
            map: t=>fe.value(t(e)),
            mapError: o,
            bind: t,
            exists: t,
            forall: t,
            getOr: r,
            or: o,
            getOrThunk: r,
            orThunk: o,
            getOrDie: r,
            each: t=>{
                t(e)
            }
            ,
            toOptional: ()=>P.some(e)
        };
        return n
    }
      , pe = e=>{
        const t = ()=>r
          , r = {
            tag: !1,
            inner: e,
            fold: (t,r)=>t(e),
            isValue: I,
            isError: E,
            map: t,
            mapError: t=>fe.error(t(e)),
            bind: t,
            exists: I,
            forall: E,
            getOr: v,
            or: v,
            getOrThunk: O,
            orThunk: O,
            getOrDie: (o = String(e),
            ()=>{
                throw new Error(o)
            }
            ),
            each: b,
            toOptional: P.none
        };
        var o;
        return r
    }
      , fe = {
        value: ge,
        error: pe,
        fromOption: (e,t)=>e.fold((()=>pe(t)), ge)
    };
    class ye {
        constructor(e) {
            this.littleEndian = !1,
            this.dataView = new DataView(e)
        }
        read(e, t) {
            if (e + t > this.length())
                return fe.error("Read extends past buffer end");
            const r = this.littleEndian ? 0 : -8 * (t - 1);
            let o = 0;
            for (let n = 0; n < t; n++)
                o |= this.readByteAt(e + n) << Math.abs(r + 8 * n);
            return fe.value(o)
        }
        segment(e, t) {
            const r = this.dataView.buffer;
            return void 0 !== e && void 0 !== t ? r.slice(e, e + t) : void 0 !== e ? r.slice(e) : r
        }
        length() {
            return this.dataView.byteLength
        }
        readByteAt(e) {
            return this.dataView.getUint8(e)
        }
    }
    const be = (e,t,r,o,n)=>{
        if (t + r * o > e.length())
            return fe.error("Read would extend past end of buffer");
        const a = [];
        for (let i = 0; i < o; i++) {
            const o = n(e, t + r * i);
            if (o.isError())
                return o.map((e=>[e]));
            a.push(o.getOrDie())
        }
        return fe.value(a)
    }
      , we = (e,t)=>e.read(t, 1)
      , ve = (e,t)=>e.read(t, 2)
      , xe = (e,t)=>e.read(t, 4)
      , Se = e=>fe.value(String.fromCharCode(e))
      , Oe = e=>fe.value(e > 2147483647 ? e - 4294967296 : e)
      , Ie = (e,t)=>xe(e, t).bind(Oe)
      , Ee = (e,t)=>we(e, t).bind(Se)
      , Pe = (e,t,r=1)=>be(e, t, 1, r, Ee).map((e=>e.join("")))
      , Ce = {
        274: "Orientation",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer"
    }
      , De = {
        36864: "ExifVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        36867: "DateTimeOriginal",
        33434: "ExposureTime",
        33437: "FNumber",
        34855: "ISOSpeedRatings",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37386: "FocalLength",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41990: "SceneCaptureType",
        41988: "DigitalZoomRatio",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness"
    }
      , Re = {
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude"
    }
      , Me = {
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength"
    }
      , Ue = {
        ColorSpace: {
            1: "sRGB",
            0: "Uncalibrated"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            1: "Daylight",
            2: "Fliorescent",
            3: "Tungsten",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 -5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        ExposureMode: {
            0: "Auto exposure",
            1: "Manual exposure",
            2: "Auto bracket"
        },
        WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
        },
        SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
        },
        Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
        },
        Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        GPSLatitudeRef: {
            78: "North latitude",
            83: "South latitude"
        },
        GPSLongitudeRef: {
            69: "East longitude",
            87: "West longitude"
        }
    }
      , Ae = (e,t)=>xe(e, t).bind((r=>xe(e, t + 4).map((e=>r / e))))
      , Fe = (e,t)=>Ie(e, t).bind((r=>Ie(e, t + 4).map((e=>r / e))))
      , Te = (e,t,r,o)=>{
        const n = {
            1: {
                name: "BYTE",
                size: 1,
                read: we
            },
            7: {
                name: "UNDEFINED",
                size: 1,
                read: we
            },
            2: {
                name: "ASCII",
                size: 1,
                read: we
            },
            3: {
                name: "SHORT",
                size: 2,
                read: ve
            },
            4: {
                name: "LONG",
                size: 4,
                read: xe
            },
            5: {
                name: "RATIONAL",
                size: 8,
                read: Ae
            },
            9: {
                name: "SLONG",
                size: 4,
                read: Ie
            },
            10: {
                name: "SRATIONAL",
                size: 8,
                read: Fe
            }
        }
          , a = e=>t=>P.some([e, t])
          , i = e=>e.replace(/\0$/, "").trim();
        return ve(e, t).fold((()=>fe.value({})), (s=>{
            const l = {};
            for (let d = 0; d < s; d++) {
                const s = t + 2 + 12 * d
                  , c = ve(e, s + 0).bind((t=>ve(e, s + 2).bind((l=>xe(e, s + 4).bind((d=>{
                    const c = o[t];
                    if (void 0 === c)
                        return fe.value(P.none());
                    const u = n[l];
                    if (void 0 === u)
                        return fe.error("Tag with type number " + l + " was unrecognised.");
                    let m = s + 8;
                    if (u.size * d > 4) {
                        const t = xe(e, s + 8);
                        if (t.isError())
                            return t.map((e=>P.none()));
                        m = t.getOrDie() + r
                    }
                    return m + u.size * d >= e.length() ? fe.error("Invalid Exif data.") : 1 === d && void 0 !== Ue[c] ? u.read(e, m).map((e=>Ue[c][e])).map(a(c)) : "ASCII" === u.name ? Pe(e, m, d).map(i).map(a(c)) : 1 === d ? u.read(e, m).map(a(c)) : be(e, m, u.size, d, u.read).map(a(c))
                }
                ))))));
                if (c.isError())
                    return c.map((e=>l));
                c.each((e=>e.each((([e,t])=>{
                    l[e] = t
                }
                ))))
            }
            return fe.value(l)
        }
        ))
    }
      , ke = e=>({
        Orientation: P.from(e.Orientation).filter(y).getOrUndefined(),
        ImageDescription: P.from(e.ImageDescription).filter(d).getOrUndefined(),
        Make: P.from(e.Make).filter(d).getOrUndefined(),
        Model: P.from(e.Model).filter(d).getOrUndefined(),
        Software: P.from(e.Software).filter(d).getOrUndefined(),
        ExifIFDPointer: P.from(e.ExifIFDPointer).filter(y),
        GPSInfoIFDPointer: P.from(e.GPSInfoIFDPointer).filter(y)
    })
      , Le = e=>({
        ExifVersion: (()=>{
            const t = e.ExifVersion;
            return d(t) ? t : m(t) ? F(t, (e=>y(e) ? String.fromCharCode(e) : "")).join("") : void 0
        }
        )(),
        ColorSpace: P.from(e.ColorSpace).filter(d).getOrUndefined(),
        PixelXDimension: P.from(e.PixelXDimension).filter(y).getOrUndefined(),
        PixelYDimension: P.from(e.PixelYDimension).filter(y).getOrUndefined(),
        DateTimeOriginal: P.from(e.DateTimeOriginal).filter(d).getOrUndefined(),
        ExposureTime: P.from(e.ExposureTime).filter(y).getOrUndefined(),
        FNumber: P.from(e.FNumber).filter(y).getOrUndefined(),
        ISOSpeedRatings: P.from(e.ISOSpeedRatings).filter(y).getOrUndefined(),
        ShutterSpeedValue: P.from(e.ShutterSpeedValue).filter(y).getOrUndefined(),
        ApertureValue: P.from(e.ApertureValue).filter(y).getOrUndefined(),
        MeteringMode: P.from(e.MeteringMode).filter(d).getOrUndefined(),
        LightSource: P.from(e.LightSource).filter(d).getOrUndefined(),
        Flash: P.from(e.Flash).filter(d).getOrUndefined(),
        FocalLength: P.from(e.FocalLength).filter(y).getOrUndefined(),
        ExposureMode: P.from(e.ExposureMode).filter(d).getOrUndefined(),
        WhiteBalance: P.from(e.WhiteBalance).filter(d).getOrUndefined(),
        SceneCaptureType: P.from(e.SceneCaptureType).filter(d).getOrUndefined(),
        DigitalZoomRatio: P.from(e.DigitalZoomRatio).filter(y).getOrUndefined(),
        Contrast: P.from(e.Contrast).filter(d).getOrUndefined(),
        Saturation: P.from(e.Saturation).filter(d).getOrUndefined(),
        Sharpness: P.from(e.Sharpness).filter(d).getOrUndefined()
    })
      , _e = e=>({
        GPSVersionID: (()=>{
            const t = e.GPSVersionID;
            return d(t) ? t : m(t) ? F(t, (e=>y(e) ? "" + e : d(e) ? e : "")).join(".") : void 0
        }
        )(),
        GPSLatitudeRef: P.from(e.GPSLatitudeRef).filter(d).getOrUndefined(),
        GPSLatitude: P.from(e.GPSLatitude).filter(y).getOrUndefined(),
        GPSLongitudeRef: P.from(e.GPSLongitudeRef).filter(d).getOrUndefined(),
        GPSLongitude: P.from(e.GPSLongitude).filter(y).getOrUndefined()
    })
      , Ne = e=>{
        const t = e.JPEGInterchangeFormat;
        if (void 0 === t)
            return fe.error("");
        if (!y(t))
            return fe.error("");
        const r = e.JPEGInterchangeFormatLength;
        return void 0 === r ? fe.error("") : y(r) ? fe.value({
            JPEGInterchangeFormat: t,
            JPEGInterchangeFormatLength: r
        }) : fe.error("")
    }
      , ze = e=>(e=>new Promise((t=>{
        const r = new FileReader;
        r.onloadend = ()=>{
            t(r.result)
        }
        ,
        r.readAsArrayBuffer(e)
    }
    )))(e).then((t=>{
        try {
            const e = new ye(t);
            if (he(ve(e, 0), 65496)) {
                const t = je(e)
                  , r = t.filter((e=>"APP1" === e.name))
                  , o = {
                    rawHeaders: t
                };
                if (!r.length)
                    return Promise.reject("Headers did not include required information");
                {
                    const e = (e=>{
                        const t = new ye(e)
                          , r = 10
                          , o = he(ve(t, 0), 65505) && he(Pe(t, 4, 5).map((e=>e.toUpperCase())), "EXIF\0") ? (t.littleEndian = he(ve(t, r), 18761),
                        he(ve(t, 12), 42) ? xe(t, 14).map((e=>r + e)) : fe.error("Invalid Exif data.")) : fe.error("APP1 marker and EXIF marker cannot be read or not available.")
                          , n = o.bind((e=>Te(t, e, r, Ce).map(ke)))
                          , a = n.bind((e=>e.ExifIFDPointer.fold((()=>fe.value(P.none())), (e=>Te(t, r + e, r, De).map(Le).map(P.some)))))
                          , i = n.bind((e=>e.GPSInfoIFDPointer.fold((()=>fe.value(P.none())), (e=>Te(t, r + e, r, Re).map(_e).map(P.some)))));
                        return {
                            tiff: n,
                            exif: a,
                            gps: i,
                            thumb: o.bind((e=>ve(t, e).map((t=>e + 2 + 12 * t)))).bind((e=>xe(t, e).map((e=>e + r)))).bind((e=>Te(t, e, r, Me).bind(Ne).map((e=>t.segment(r + e.JPEGInterchangeFormat, e.JPEGInterchangeFormatLength))).map(P.some)))
                        }
                    }
                    )(r[0].segment);
                    o.tiff = e.tiff.getOrDie(),
                    o.exif = me(e.exif.toOptional()).getOrNull(),
                    o.gps = me(e.gps.toOptional()).getOrNull(),
                    o.thumb = me(e.thumb.toOptional()).getOrNull()
                }
                return o
            }
            return Promise.reject("Image was not a jpeg")
        } catch (t) {
            return Promise.reject(`Unsupported format or not an image: ${e.type} (Exception: ${t.message})`)
        }
    }
    ))
      , je = e=>{
        const t = [];
        let r = 2;
        for (; r + 2 <= e.length(); ) {
            const o = ve(e, r).toOptional().getOrNull();
            if (null === o)
                throw new Error("Invalid Exif data.");
            if (o >= 65488 && o <= 65495) {
                r += 2;
                continue
            }
            if (65498 === o || 65497 === o)
                break;
            const n = ve(e, r + 2).toOptional().getOrNull();
            if (null === n)
                throw new Error("Invalid Exif data.");
            const a = n + 2;
            o >= 65505 && o <= 65519 && t.push({
                hex: o,
                name: "APP" + (15 & o),
                start: r,
                length: a,
                segment: e.segment(r, a)
            }),
            r += a
        }
        return t
    }
      , Be = (e,t,r)=>{
        const o = t.type
          , n = w(o)
          , a = w(r)
          , i = (t,r)=>e.then((e=>((e,t,r)=>(t = t || "image/png",
        e.toDataURL(t, r)))(e, t, r)));
        return {
            getType: n,
            toBlob: ()=>Promise.resolve(t),
            toDataURL: a,
            toBase64: ()=>r.split(",")[1],
            toAdjustedBlob: (t,r)=>e.then((e=>de(e, t, r))),
            toAdjustedDataURL: i,
            toAdjustedBase64: (e,t)=>i(e, t).then((e=>e.split(",")[1])),
            toCanvas: ()=>e.then(re)
        }
    }
      , Ge = e=>(e=>new Promise((t=>{
        const r = new FileReader;
        r.onloadend = ()=>{
            t(r.result)
        }
        ,
        r.readAsDataURL(e)
    }
    )))(e).then((t=>Be((e=>se(e).then((e=>{
        (e=>{
            URL.revokeObjectURL(e.src)
        }
        )(e);
        const t = te(ae(e), ie(e));
        return oe(t).drawImage(e, 0, 0),
        t
    }
    )))(e), e, t)))
      , He = (e,t)=>de(e, t).then((t=>Be(Promise.resolve(e), t, e.toDataURL())))
      , Ve = (e,t,r)=>{
        let o = "string" == typeof e ? parseFloat(e) : e;
        return o > r ? o = r : o < t && (o = t),
        o
    }
      , We = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10]
      , Xe = (e,t)=>{
        const r = []
          , o = new Array(25);
        let n;
        for (let a = 0; a < 5; a++) {
            for (let e = 0; e < 5; e++)
                r[e] = t[e + 5 * a];
            for (let t = 0; t < 5; t++) {
                n = 0;
                for (let o = 0; o < 5; o++)
                    n += e[t + 5 * o] * r[o];
                o[t + 5 * a] = n
            }
        }
        return o
    }
      , Ye = (e,t)=>(t = Ve(t, 0, 1),
    e.map(((e,r)=>(r % 6 == 0 ? e = 1 - (1 - e) * t : e *= t,
    Ve(e, 0, 1)))))
      , Je = (e,t)=>e.toCanvas().then((r=>qe(r, e.getType(), t)))
      , qe = (e,t,r)=>{
        const o = oe(e)
          , n = ((e,t)=>{
            let r, o, n, a;
            const i = e.data
              , s = t[0]
              , l = t[1]
              , d = t[2]
              , c = t[3]
              , u = t[4]
              , m = t[5]
              , h = t[6]
              , g = t[7]
              , p = t[8]
              , f = t[9]
              , y = t[10]
              , b = t[11]
              , w = t[12]
              , v = t[13]
              , x = t[14]
              , S = t[15]
              , O = t[16]
              , I = t[17]
              , E = t[18]
              , P = t[19];
            for (let e = 0; e < i.length; e += 4)
                r = i[e],
                o = i[e + 1],
                n = i[e + 2],
                a = i[e + 3],
                i[e] = r * s + o * l + n * d + a * c + u,
                i[e + 1] = r * m + o * h + n * g + a * p + f,
                i[e + 2] = r * y + o * b + n * w + a * v + x,
                i[e + 3] = r * S + o * O + n * I + a * E + P;
            return e
        }
        )(o.getImageData(0, 0, e.width, e.height), r);
        return o.putImageData(n, 0, 0),
        He(e, t)
    }
      , Ke = e=>(t,r)=>t.toCanvas().then((o=>((t,r,o)=>{
        const n = oe(t)
          , a = new Array(256);
        for (let t = 0; t < a.length; t++)
            a[t] = e(t, o);
        const i = ((e,t)=>{
            const r = e.data;
            for (let e = 0; e < r.length; e += 4)
                r[e] = t[r[e]],
                r[e + 1] = t[r[e + 1]],
                r[e + 2] = t[r[e + 2]];
            return e
        }
        )(n.getImageData(0, 0, t.width, t.height), a);
        return n.putImageData(i, 0, 0),
        He(t, r)
    }
    )(o, t.getType(), r)))
      , Ze = e=>(t,r)=>Je(t, e([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], r))
      , $e = e=>t=>((e,t)=>e.toCanvas().then((r=>((e,t,r)=>{
        const o = oe(e)
          , n = o.getImageData(0, 0, e.width, e.height);
        let a = o.getImageData(0, 0, e.width, e.height);
        return a = ((e,t,r)=>{
            const o = (e,t,r)=>(e > r ? e = r : e < t && (e = t),
            e)
              , n = Math.round(Math.sqrt(r.length))
              , a = Math.floor(n / 2)
              , i = e.data
              , s = t.data
              , l = e.width
              , d = e.height;
            for (let e = 0; e < d; e++)
                for (let t = 0; t < l; t++) {
                    let c = 0
                      , u = 0
                      , m = 0;
                    for (let s = 0; s < n; s++)
                        for (let h = 0; h < n; h++) {
                            const g = o(t + h - a, 0, l - 1)
                              , p = 4 * (o(e + s - a, 0, d - 1) * l + g)
                              , f = r[s * n + h];
                            c += i[p] * f,
                            u += i[p + 1] * f,
                            m += i[p + 2] * f
                        }
                    const h = 4 * (e * l + t);
                    s[h] = o(c, 0, 255),
                    s[h + 1] = o(u, 0, 255),
                    s[h + 2] = o(m, 0, 255)
                }
            return t
        }
        )(n, a, r),
        o.putImageData(a, 0, 0),
        He(e, t)
    }
    )(r, e.getType(), t))))(t, e)
      , Qe = (et = [-1, 0, 0, 0, 255, 0, -1, 0, 0, 255, 0, 0, -1, 0, 255, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    e=>Je(e, et));
    var et;
    const tt = Ze(((e,t)=>(t = Ve(255 * t, -255, 255),
    Xe(e, [1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]))))
      , rt = Ze(((e,t)=>{
        t = Ve(t, -180, 180) / 180 * Math.PI;
        const r = Math.cos(t)
          , o = Math.sin(t)
          , n = .213
          , a = .715
          , i = .072;
        return Xe(e, [n + .787 * r + o * -n, a + r * -a + o * -a, i + r * -i + .928 * o, 0, 0, n + r * -n + .143 * o, a + r * (1 - a) + .14 * o, i + r * -i + -.283 * o, 0, 0, n + r * -n + -.787 * o, a + r * -a + o * a, i + .928 * r + o * i, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
    }
    ))
      , ot = Ze(((e,t)=>{
        const r = 1 + ((t = Ve(t, -1, 1)) > 0 ? 3 * t : t)
          , o = .3086
          , n = .6094
          , a = .082;
        return Xe(e, [o * (1 - r) + r, n * (1 - r), a * (1 - r), 0, 0, o * (1 - r), n * (1 - r) + r, a * (1 - r), 0, 0, o * (1 - r), n * (1 - r), a * (1 - r) + r, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
    }
    ))
      , nt = Ze(((e,t)=>{
        let r;
        return t = Ve(t, -1, 1),
        (t *= 100) < 0 ? r = 127 + t / 100 * 127 : (r = t % 1,
        r = 0 === r ? We[t] : We[Math.floor(t)] * (1 - r) + We[Math.floor(t) + 1] * r,
        r = 127 * r + 127),
        Xe(e, [r / 127, 0, 0, 0, .5 * (127 - r), 0, r / 127, 0, 0, .5 * (127 - r), 0, 0, r / 127, 0, .5 * (127 - r), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
    }
    ))
      , at = Ze(((e,t)=>(t = Ve(t, 0, 1),
    Xe(e, Ye([.33, .34, .33, 0, 0, .33, .34, .33, 0, 0, .33, .34, .33, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], t)))))
      , it = Ze(((e,t)=>(t = Ve(t, 0, 1),
    Xe(e, Ye([.393, .769, .189, 0, 0, .349, .686, .168, 0, 0, .272, .534, .131, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], t)))))
      , st = $e([0, -1, 0, -1, 5, -1, 0, -1, 0])
      , lt = $e([-2, -1, 0, -1, 1, 1, 0, 1, 2])
      , dt = Ke(((e,t)=>255 * Math.pow(e / 255, 1 - t)))
      , ct = Ke(((e,t)=>255 * (1 - Math.exp(-e / 255 * t))))
      , ut = (e,t,r)=>{
        const o = ae(e)
          , n = ie(e);
        let a = t / o
          , i = r / n
          , s = !1;
        (a < .5 || a > 2) && (a = a < .5 ? .5 : 2,
        s = !0),
        (i < .5 || i > 2) && (i = i < .5 ? .5 : 2,
        s = !0);
        const l = mt(e, a, i);
        return s ? l.then((e=>ut(e, t, r))) : l
    }
      , mt = (e,t,r)=>new Promise((o=>{
        const n = ae(e)
          , a = ie(e)
          , i = Math.floor(n * t)
          , s = Math.floor(a * r)
          , l = te(i, s);
        oe(l).drawImage(e, 0, 0, n, a, 0, 0, i, s),
        o(l)
    }
    ))
      , ht = (e,t=2)=>{
        const r = Math.pow(10, t)
          , o = Math.round(e * r);
        return Math.ceil(o / r)
    }
      , gt = (e,t,r,o)=>((e,t,r,o)=>Je(e, ((e,t,r,o)=>(t = Ve(t, 0, 2),
    r = Ve(r, 0, 2),
    o = Ve(o, 0, 2),
    Xe([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [t, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])))(0, t, r, o)))(e, t, r, o)
      , pt = (e,t)=>((e,t)=>e.toCanvas().then((r=>((e,t,r)=>{
        const o = te(e.width, e.height)
          , n = oe(o);
        return "v" === r ? (n.scale(1, -1),
        n.drawImage(e, 0, -o.height)) : (n.scale(-1, 1),
        n.drawImage(e, -o.width, 0)),
        He(o, t)
    }
    )(r, e.getType(), t))))(e, t)
      , ft = (e,t,r,o,n)=>((e,t,r,o,n)=>e.toCanvas().then((a=>((e,t,r,o,n,a)=>{
        const i = te(n, a);
        return oe(i).drawImage(e, -r, -o),
        He(i, t)
    }
    )(a, e.getType(), t, r, o, n))))(e, t, r, o, n)
      , yt = (e,t,r)=>((e,t,r)=>e.toCanvas().then((o=>ut(o, t, r).then((t=>He(t, e.getType()))))))(e, t, r)
      , bt = (e,t)=>((e,t)=>e.toCanvas().then((r=>((e,t,r)=>{
        const o = (r < 0 ? 360 + r : r) * Math.PI / 180
          , n = e.width
          , a = e.height
          , i = Math.sin(o)
          , s = Math.cos(o)
          , l = ht(Math.abs(n * s) + Math.abs(a * i))
          , d = ht(Math.abs(n * i) + Math.abs(a * s))
          , c = te(l, d)
          , u = oe(c);
        return u.translate(l / 2, d / 2),
        u.rotate(o),
        u.drawImage(e, -n / 2, -a / 2),
        He(c, t)
    }
    )(r, e.getType(), t))))(e, t);
    var wt = Object.freeze({
        __proto__: null,
        brightness: (e,t)=>tt(e, t),
        colorize: gt,
        contrast: (e,t)=>nt(e, t),
        crop: ft,
        emboss: e=>lt(e),
        exifRotate: e=>e.toBlob().then(ze).then((t=>{
            switch (t.tiff.Orientation) {
            case 6:
                return bt(e, 90);
            case 3:
                return bt(e, 180);
            case 8:
                return bt(e, 270);
            default:
                return e
            }
        }
        ), (()=>e)),
        exposure: (e,t)=>ct(e, t),
        flip: pt,
        gamma: (e,t)=>dt(e, t),
        grayscale: (e,t)=>at(e, t),
        hue: (e,t)=>rt(e, t),
        invert: e=>Qe(e),
        resize: yt,
        rotate: bt,
        saturate: (e,t)=>ot(e, t),
        sepia: (e,t)=>it(e, t),
        sharpen: e=>st(e)
    });
    const vt = (e,t,r=!1)=>fetch(e, {
        credentials: r ? "include" : "same-origin",
        headers: t
    }).then((async e=>{
        const t = await e.blob();
        return {
            ok: e.ok,
            status: e.status,
            blob: t
        }
    }
    ), (()=>({
        ok: !1,
        status: 0
    })))
      , xt = [{
        code: 404,
        message: "Could not find Image Proxy"
    }, {
        code: 403,
        message: "Rejected request"
    }, {
        code: 0,
        message: "Incorrect Image Proxy URL"
    }]
      , St = [{
        type: "not_found",
        message: "Failed to load image."
    }, {
        type: "key_missing",
        message: "The request did not include an api key."
    }, {
        type: "key_not_found",
        message: "The provided api key could not be found."
    }, {
        type: "domain_not_trusted",
        message: "The api key is not valid for the request origins."
    }]
      , Ot = e=>{
        const t = (e=>{
            const t = L(xt, (t=>e === t.code)).fold(w("Unknown ImageProxy error"), (e=>e.message));
            return "ImageProxy HTTP error: " + t
        }
        )(e);
        return Promise.reject(t)
    }
      , It = e=>L(St, (t=>t.type === e)).fold(w("Unknown service error"), (e=>e.message))
      , Et = e=>(e=>new Promise(((t,r)=>{
        const o = new FileReader;
        o.onload = ()=>{
            t(o.result)
        }
        ,
        o.onerror = e=>{
            r(e)
        }
        ,
        o.readAsText(e)
    }
    )))(e).then((e=>{
        const t = (e=>{
            const t = (e=>{
                try {
                    return P.some(JSON.parse(e))
                } catch (e) {
                    return P.none()
                }
            }
            )(e)
              , r = t.bind((e=>((e,t)=>{
                const r = k(["error", "type"], ((e,t)=>p(e) ? e[t] : void 0), e);
                return P.from(r)
            }
            )(e).map(It))).getOr("Invalid JSON in service error message");
            return "ImageProxy Service error: " + r
        }
        )(e);
        return Promise.reject(t)
    }
    ))
      , Pt = (e,t,r=!0)=>t ? ((e,t)=>{
        const r = {
            "Content-Type": "application/json;charset=UTF-8",
            "tiny-api-key": t
        };
        return vt(((e,t)=>{
            const r = -1 === e.indexOf("?") ? "?" : "&";
            return /[?&]apiKey=/.test(e) ? e : e + r + "apiKey=" + encodeURIComponent(t)
        }
        )(e, t), r).then((e=>{
            return e.ok ? Promise.resolve(e.blob) : ((e,t)=>"application/json" === (null == t ? void 0 : t.type) && (400 === e || 403 === e || 404 === e || 500 === e))(t = e.status, r = e.blob) ? Et(r) : Ot(t);
            var t, r
        }
        ))
    }
    )(e, t) : ((e,t)=>vt(e, {}, t).then((e=>e.ok ? Promise.resolve(e.blob) : Ot(e.status))))(e, r)
      , Ct = e=>Ge(e)
      , Dt = e=>t=>t.options.get(e)
      , Rt = Dt("editimage_toolbar")
      , Mt = Dt("editimage_cors_hosts")
      , Ut = Dt("editimage_credentials_hosts")
      , At = Dt("editimage_fetch_image")
      , Ft = Dt("editimage_upload_timeout")
      , Tt = Dt("images_reuse_filename")
      , kt = e=>{
        const t = e.options.get("editimage_proxy_service_url");
        return d(t) ? t + "/2/image" : e.options.get("editimage_proxy")
    }
      , Lt = e=>{
        let t, r;
        const o = e=>/^[0-9\.]+px$/.test(e);
        return t = e.style.width,
        r = e.style.height,
        t || r ? o(t) && o(r) ? {
            w: parseInt(t, 10),
            h: parseInt(r, 10)
        } : null : (t = e.width,
        r = e.height,
        t && r ? {
            w: t,
            h: r
        } : null)
    }
      , _t = e=>({
        w: e.naturalWidth,
        h: e.naturalHeight
    });
    let Nt = 0;
    const zt = e=>J(e, "img")
      , jt = (e,t)=>e.dom.is(t, "figure")
      , Bt = (e,t)=>e.dom.is(t, "img:not([data-mce-object]):not([data-mce-placeholder])")
      , Gt = (e,t)=>{
        const r = t=>(t=>Bt(e, t.dom) && (Xt(e, t.dom) || Yt(e, t.dom) || p(kt(e))))(t) ? P.some(t) : P.none();
        return jt(e, t.dom) ? zt(t).bind(r) : r(t)
    }
      , Ht = (e,t)=>{
        e.notificationManager.open({
            text: t,
            type: "error"
        })
    }
      , Vt = e=>{
        const t = e.selection.getNode()
          , r = e.dom.getParent(t, "figure.image");
        return null !== r && jt(e, r) ? zt(z(r)) : Bt(e, t) ? P.some(z(t)) : P.none()
    }
      , Wt = (e,t,r)=>{
        const o = /(?:\/|^)(([^\/\?]+)\.(?:[a-z0-9.]+))(?:\?|$)/i.exec(t);
        return p(o) ? e.dom.encode(o[r]) : void 0
    }
      , Xt = (e,t)=>{
        const r = t.src;
        return 0 === r.indexOf("data:") || 0 === r.indexOf("blob:") || new tinymce.util.URI(r).host === e.documentBaseURI.host
    }
      , Yt = (e,t)=>A(Mt(e), new tinymce.util.URI(t.src).host)
      , Jt = (e,t)=>{
        const r = e.editorUpload.blobCache.getByUri(t.src);
        return r ? Promise.resolve(r.blob()) : ((e,t)=>P.from(At(e)).fold((()=>((e,t)=>{
            var r;
            if (Yt(e, t))
                return Pt(t.src, void 0, ((e,t)=>A(Ut(e), new tinymce.util.URI(t.src).host))(e, t));
            if (!Xt(e, t)) {
                const o = null !== (r = kt(e)) && void 0 !== r ? r : ""
                  , n = o + (-1 === o.indexOf("?") ? "?" : "&") + "url=" + encodeURIComponent(t.src)
                  , a = (e=>{
                    var t;
                    return null !== (t = e.options.get("api_key")) && void 0 !== t ? t : e.options.get("editimage_api_key")
                }
                )(e);
                return Pt(n, a, !0)
            }
            return ue(t)
        }
        )(e, t)), (e=>e(t))))(e, t)
    }
      , qt = e=>{
        clearTimeout(e.get())
    }
      , Kt = (e,t,r,o,n,a,i)=>r.toBlob().then((s=>{
        let l, d, c;
        const u = e.editorUpload.blobCache;
        l = a.src;
        const m = t.type === s.type;
        if (Tt(e)) {
            const t = u.getByUri(l);
            p(t) ? (l = t.uri(),
            d = t.name(),
            c = t.filename()) : (d = Wt(e, l, 2),
            c = Wt(e, l, 1))
        }
        const h = u.create({
            id: "editimage" + Nt++,
            blob: s,
            base64: r.toBase64(),
            uri: l,
            name: d,
            filename: m ? c : void 0
        });
        return u.add(h),
        e.undoManager.transact((()=>{
            const t = ()=>{
                e.dom.unbind(a, "load", t),
                e.nodeChanged(),
                o ? e.editorUpload.uploadImagesAuto() : (qt(n),
                ((e,t)=>{
                    const r = tinymce.util.Delay.setEditorTimeout(e, (()=>{
                        e.editorUpload.uploadImagesAuto()
                    }
                    ), Ft(e));
                    t.set(r)
                }
                )(e, n))
            }
            ;
            e.dom.bind(a, "load", t),
            i && e.dom.setAttribs(a, {
                width: i.w,
                height: i.h
            }),
            e.dom.setAttribs(a, {
                src: h.blobUri()
            }),
            a.removeAttribute("data-mce-src")
        }
        )),
        h
    }
    ))
      , Zt = (e,t,r,o)=>()=>Vt(e).fold((()=>{
        Ht(e, "Could not find selected image")
    }
    ), (n=>e._scanForImages().then((()=>Jt(e, n.dom))).then((a=>Ct(a).then(r).then((r=>Kt(e, a, r, !1, t, n.dom, o))))).catch((t=>{
        Ht(e, t)
    }
    ))))
      , $t = (e,t,r)=>()=>{
        const o = Vt(e).map((e=>{
            const t = Lt(e.dom);
            return t ? {
                w: t.h,
                h: t.w
            } : null
        }
        )).getOrNull();
        return Zt(e, t, (e=>bt(e, r)), o)()
    }
      , Qt = (e,t,r)=>()=>Zt(e, t, (e=>pt(e, r)))()
      , er = (tr = (e,t)=>u(e) && u(t) ? er(e, t) : t,
    (...e)=>{
        if (0 === e.length)
            throw new Error("Can't merge zero objects");
        const t = {};
        for (let r = 0; r < e.length; r++) {
            const o = e[r];
            for (const e in o)
                M(o, e) && (t[e] = tr(t[e], o[e]))
        }
        return t
    }
    );
    var tr;
    const rr = {
        type: "panel",
        classes: ["tox-spacer"],
        items: []
    }
      , or = (e,t,r=!1)=>({
        type: "button",
        name: e,
        text: t,
        primary: r
    })
      , nr = (e,t,r,o=!1)=>({
        type: "button",
        name: e,
        icon: t,
        text: r,
        buttonType: "toolbar",
        enabled: !o
    })
      , ar = "undo-btn"
      , ir = "redo-btn"
      , sr = "zoom-in-btn"
      , lr = "zoom-out-btn"
      , dr = "crop-btn"
      , cr = "resize-btn"
      , ur = "orientation-btn"
      , mr = "brightness-btn"
      , hr = "sharpen-btn"
      , gr = "contrast-btn"
      , pr = "color-levels-btn"
      , fr = "gamma-btn"
      , yr = "invert-btn"
      , br = "flip-horizontally-btn"
      , wr = "flip-vertically-btn"
      , vr = "rotate-left-btn"
      , xr = "rotate-right-btn"
      , Sr = t=>{
        const r = e(P.none())
          , o = ()=>r.get().each(t);
        return {
            clear: ()=>{
                o(),
                r.set(P.none())
            }
            ,
            isSet: ()=>r.get().isSome(),
            get: ()=>r.get(),
            set: e=>{
                o(),
                r.set(P.some(e))
            }
        }
    }
      , Or = ()=>{
        const e = Sr(b);
        return {
            ...e,
            on: t=>e.get().each(t)
        }
    }
      , Ir = e=>void 0 !== e.style && f(e.style.getPropertyValue)
      , Er = (e,t,r)=>{
        if (!(d(r) || h(r) || y(r)))
            throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", r, ":: Element ", e),
            new Error("Attribute value was not simple");
        e.setAttribute(t, r + "")
    }
      , Pr = (e,t,r)=>{
        Er(e.dom, t, r)
    }
      , Cr = (e,t)=>{
        const r = e.dom;
        R(t, ((e,t)=>{
            Er(r, t, e)
        }
        ))
    }
      , Dr = (e,t)=>{
        const r = e.dom.getAttribute(t);
        return null === r ? void 0 : r
    }
      , Rr = (e,t)=>{
        const r = e.dom;
        R(t, ((e,t)=>{
            ((e,t,r)=>{
                if (!d(r))
                    throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", r, ":: Element ", e),
                    new Error("CSS value must be a string: " + r);
                Ir(e) && e.style.setProperty(t, r)
            }
            )(r, t, e)
        }
        ))
    }
      , Mr = (e,t)=>{
        const r = e.dom
          , o = window.getComputedStyle(r).getPropertyValue(t);
        return "" !== o || Y(e) ? o : Ur(r, t)
    }
      , Ur = (e,t)=>Ir(e) ? e.style.getPropertyValue(t) : ""
      , Ar = (e,t)=>{
        const r = r=>{
            const o = t(r);
            if (o <= 0 || null === o) {
                const t = Mr(r, e);
                return parseFloat(t) || 0
            }
            return o
        }
          , o = (e,t)=>k(t, ((t,r)=>{
            const o = Mr(e, r)
              , n = void 0 === o ? 0 : parseInt(o, 10);
            return isNaN(n) ? t : t + n
        }
        ), 0);
        return {
            set: (t,r)=>{
                if (!y(r) && !r.match(/^[0-9]+$/))
                    throw new Error(e + ".set accepts only positive integer values. Value was " + r);
                const o = t.dom;
                Ir(o) && (o.style[e] = r + "px")
            }
            ,
            get: r,
            getOuter: r,
            aggregate: o,
            max: (e,t,r)=>{
                const n = o(e, r);
                return t > n ? t - n : 0
            }
        }
    }
      , Fr = Ar("height", (e=>{
        const t = e.dom;
        return Y(e) ? t.getBoundingClientRect().height : t.offsetHeight
    }
    ))
      , Tr = e=>Fr.get(e)
      , kr = Ar("width", (e=>e.dom.offsetWidth))
      , Lr = e=>kr.get(e)
      , _r = (e,t)=>Ct(e).then(t).then((e=>e.toBlob()))
      , Nr = (e,t)=>{
        (e=>void 0 !== e.dom.classList)(e) ? e.dom.classList.add(t) : ((e,t)=>{
            ((e,t,r)=>{
                const o = ((e,t)=>{
                    const r = Dr(e, t);
                    return void 0 === r || "" === r ? [] : r.split(" ")
                }
                )(e, t)
                  , n = o.concat([r]);
                Pr(e, t, n.join(" "))
            }
            )(e, "class", t)
        }
        )(e, t)
    }
      , zr = (e,t)=>{
        e.dom.appendChild(t.dom)
    }
      , jr = e=>{
        const t = e.dom;
        null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , Br = e=>{
        const t = (e=>p(e.changedTouches))(e) ? e.changedTouches[0] : e;
        return ((e,r)=>{
            const o = {};
            for (let r = 0, n = e.length; r < n; r++) {
                const n = e[r];
                o[String(n)] = t[n]
            }
            return o
        }
        )(["screenX", "screenY", "pageX", "pageY", "clientX", "clientY"])
    }
    ;
    let Gr = 0;
    const Hr = (e,t,r,o,n)=>{
        let a, i = [];
        const s = "tox-"
          , l = s + "crid-" + Gr++
          , d = [{
            name: "move",
            xMul: 0,
            yMul: 0,
            deltaX: 1,
            deltaY: 1,
            deltaW: 0,
            deltaH: 0,
            label: "Crop Mask"
        }, {
            name: "nw",
            xMul: 0,
            yMul: 0,
            deltaX: 1,
            deltaY: 1,
            deltaW: -1,
            deltaH: -1,
            label: "Top Left Crop Handle"
        }, {
            name: "ne",
            xMul: 1,
            yMul: 0,
            deltaX: 0,
            deltaY: 1,
            deltaW: 1,
            deltaH: -1,
            label: "Top Right Crop Handle"
        }, {
            name: "sw",
            xMul: 0,
            yMul: 1,
            deltaX: 1,
            deltaY: 0,
            deltaW: -1,
            deltaH: 1,
            label: "Bottom Left Crop Handle"
        }, {
            name: "se",
            xMul: 1,
            yMul: 1,
            deltaX: 0,
            deltaY: 0,
            deltaW: 1,
            deltaH: 1,
            label: "Bottom Right Crop Handle"
        }]
          , c = ["top", "right", "bottom", "left"]
          , u = (e,t)=>({
            x: t.x - e.x,
            y: t.y - e.y,
            w: t.w,
            h: t.h
        })
          , m = (t,o,n,a)=>{
            const i = o.x + n * t.deltaX
              , s = o.y + a * t.deltaY
              , l = Math.max(20, o.w + n * t.deltaW)
              , d = Math.max(20, o.h + a * t.deltaH)
              , c = tinymce.geom.Rect;
            let m = e = c.clamp({
                x: i,
                y: s,
                w: l,
                h: d
            }, r, "move" === t.name);
            m = u(r, m),
            y.dispatch("updateRect", {
                rect: m
            }),
            f(m)
        }
          , h = e=>{
            const r = (e,t)=>{
                q(o, "#" + l + "-" + e).each((e=>{
                    Rr(e, {
                        left: t.x + "px",
                        top: t.y + "px",
                        width: Math.max(0, t.w) + "px",
                        height: Math.max(0, t.h) + "px"
                    })
                }
                ))
            }
            ;
            T(d, (t=>{
                q(o, "#" + l + "-" + t.name).each((r=>{
                    Rr(r, {
                        left: e.w * t.xMul + e.x + "px",
                        top: e.h * t.yMul + e.y + "px"
                    })
                }
                ))
            }
            )),
            r("top", {
                x: t.x,
                y: t.y,
                w: t.w,
                h: e.y - t.y
            }),
            r("right", {
                x: e.x + e.w,
                y: e.y,
                w: t.w - e.x - e.w + t.x,
                h: e.h
            }),
            r("bottom", {
                x: t.x,
                y: e.y + e.h,
                w: t.w,
                h: t.h - e.y - e.h + t.y
            }),
            r("left", {
                x: t.x,
                y: e.y,
                w: e.x - t.x,
                h: e.h
            }),
            r("move", e)
        }
          , g = t=>{
            h(e = t)
        }
          , f = e=>{
            var t, o;
            g((t = r,
            {
                x: (o = e).x + t.x,
                y: o.y + t.y,
                w: o.w,
                h: o.h
            }))
        }
        ;
        (()=>{
            const t = N("div");
            Cr(t, {
                id: l,
                class: s + "croprect-container",
                role: "grid",
                "aria-dropeffect": "execute"
            }),
            zr(o, t),
            T(c, (e=>{
                q(o, "#" + l).each((t=>{
                    const r = N("div");
                    Cr(r, {
                        id: l + "-" + e,
                        class: s + "croprect-block",
                        "data-mce-bogus": "all"
                    }),
                    zr(t, r)
                }
                ))
            }
            )),
            T(d, (e=>{
                q(o, "#" + l).each((t=>{
                    const r = N("div");
                    var o, n;
                    Cr(r, {
                        id: l + "-" + e.name,
                        "aria-label": e.label,
                        "aria-grabbed": "false",
                        "data-mce-bogus": "all",
                        role: "gridcell",
                        tabindex: "-1",
                        title: e.label
                    }),
                    o = r,
                    n = [s + "croprect-handle", s + "croprect-handle-" + e.name],
                    T(n, (e=>{
                        Nr(o, e)
                    }
                    )),
                    zr(t, r)
                }
                ))
            }
            )),
            a = F(d, (t=>{
                let r;
                return ((e,t)=>{
                    var r, o, n;
                    let a, i = [], s = [];
                    const l = null !== (r = t.document) && void 0 !== r ? r : document
                      , d = null !== (o = t.root) && void 0 !== o ? o : l
                      , c = z(l);
                    let u, m, h;
                    const g = z(d.getElementById(null !== (n = t.handle) && void 0 !== n ? n : e))
                      , f = e=>{
                        const r = e.raw
                          , o = (e=>{
                            const t = Math.max
                              , r = e.documentElement
                              , o = e.body
                              , n = t(r.scrollWidth, o.scrollWidth)
                              , a = t(r.clientWidth, o.clientWidth)
                              , i = t(r.offsetWidth, o.offsetWidth)
                              , s = t(r.scrollHeight, o.scrollHeight)
                              , l = t(r.clientHeight, o.clientHeight);
                            return {
                                width: n < i ? a : n,
                                height: s < t(r.offsetHeight, o.offsetHeight) ? l : s
                            }
                        }
                        )(l)
                          , n = Br(r);
                        e.prevent(),
                        u = r.button,
                        m = n.screenX,
                        h = n.screenY;
                        const i = Mr(g, "cursor");
                        a = N("div", l),
                        Rr(a, {
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: o.width + "px",
                            height: o.height + "px",
                            "z-index": "2147483647",
                            opacity: "0.0001",
                            cursor: i
                        }),
                        zr((e=>{
                            const t = e.dom.body;
                            if (null == t)
                                throw new Error("Body is not available yet");
                            return z(t)
                        }
                        )(c), a),
                        s.push(Q(c, "mousemove", y), Q(c, "touchmove", y), Q(c, "mouseup", b), Q(c, "touchend", b)),
                        t.start(r, n)
                    }
                      , y = e=>{
                        const r = e.raw
                          , o = Br(r);
                        if (r.button !== u)
                            return b(e);
                        const n = {
                            ...o,
                            deltaX: o.screenX - m,
                            deltaY: o.screenY - h
                        };
                        e.prevent(),
                        t.drag(r, n)
                    }
                      , b = e=>{
                        const r = Br(e.raw);
                        T(s, (e=>e.unbind())),
                        s = [],
                        p(a) && jr(a),
                        t.stop && t.stop(e.raw, r)
                    }
                    ;
                    return i.push(Q(g, "mousedown", f), Q(g, "touchstart", f)),
                    {
                        destroy: ()=>{
                            T(s.concat(i), (e=>e.unbind())),
                            s = [],
                            i = [],
                            p(a) && jr(a)
                        }
                    }
                }
                )(l, {
                    document: o.dom.ownerDocument,
                    root: W(o).dom,
                    handle: l + "-" + t.name,
                    start: ()=>{
                        r = e
                    }
                    ,
                    drag: (e,o)=>{
                        m(t, r, o.deltaX, o.deltaY)
                    }
                })
            }
            )),
            h(e);
            const r = e=>{
                Pr(e.target, "aria-grabbed", "focus" === e.raw.type ? "true" : "false")
            }
            ;
            i.push(Q(o, "focusin", r), Q(o, "focusout", r), Q(o, "keydown", (t=>{
                const r = G(t.target) ? Dr(t.target, "id") : void 0;
                L(d, (e=>r === l + "-" + e.name)).each((r=>{
                    const o = (e,t,o,n)=>{
                        e.kill(),
                        m(r, t, o, n)
                    }
                      , a = tinymce.util.VK;
                    switch (t.raw.keyCode) {
                    case a.LEFT:
                        o(t, e, -10, 0);
                        break;
                    case a.RIGHT:
                        o(t, e, 10, 0);
                        break;
                    case a.UP:
                        o(t, e, 0, -10);
                        break;
                    case a.DOWN:
                        o(t, e, 0, 10);
                        break;
                    case a.ENTER:
                    case a.SPACEBAR:
                        t.prevent(),
                        n()
                    }
                }
                ))
            }
            )))
        }
        )();
        const y = {
            ...tinymce.util.Observable,
            setClampRect: t=>{
                r = t,
                h(e)
            }
            ,
            setRect: g,
            getInnerRect: ()=>u(r, e),
            setInnerRect: f,
            setViewPortRect: r=>{
                t = r,
                h(e)
            }
            ,
            destroy: ()=>{
                T(a, (e=>e.destroy())),
                a = [],
                T(i, (e=>e.unbind())),
                i = []
            }
        };
        return y
    }
      , Vr = e=>[or("back", "Back"), ...e, or("apply", "Apply", !0)]
      , Wr = ()=>Vr([rr])
      , Xr = (e,t)=>r=>_r(r.blob, (r=>e(r, t)))
      , Yr = e=>(t,r)=>_r(t.blob, (t=>wt[e](t, r[e] / 100)))
      , Jr = e=>t=>_r(t.blob, (t=>wt[e](t)))
      , qr = t=>{
        const r = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        }
          , o = (()=>{
            const e = Sr((e=>e.destroy()));
            return {
                ...e,
                run: t=>e.get().each(t)
            }
        }
        )()
          , n = e(r)
          , a = ()=>j(".tox .tox-imagepreview", t).getOrDie("cannot find preview panel")
          , i = e=>{
            o.run((t=>{
                const r = a()
                  , o = j(".tox-imagepreview__container", r).getOrDie("cannot find preview container")
                  , i = Lr(r)
                  , s = Tr(r)
                  , l = Lr(o)
                  , d = Tr(o)
                  , c = Math.max(0, i / 2 - l / 2)
                  , u = Math.max(0, s / 2 - d / 2)
                  , m = n.get();
                t.setRect({
                    x: m.x * e + c,
                    y: m.y * e + u,
                    w: m.w * e,
                    h: m.h * e
                }),
                t.setClampRect({
                    x: c,
                    y: u,
                    w: l,
                    h: d
                }),
                t.setViewPortRect({
                    x: 0,
                    y: 0,
                    w: i,
                    h: s
                })
            }
            ))
        }
        ;
        return {
            barComponents: Wr(),
            renderFinal: e=>{
                const t = n.get();
                return o.clear(),
                n.set(r),
                _r(e.blob, (e=>ft(e, t.x, t.y, t.w, t.h)))
            }
            ,
            onZoom: e=>{
                var t;
                i(null !== (t = e.getData().imagepreview.zoom) && void 0 !== t ? t : 1)
            }
            ,
            onOpen: e=>{
                const r = j(".tox .tox-imagepreview .tox-imagepreview__container img", t).getOrDie("cannot find preview image");
                ee(r).then((()=>{
                    const t = ()=>{
                        var t;
                        return i(null !== (t = e.getData().imagepreview.zoom) && void 0 !== t ? t : 1)
                    }
                      , s = {
                        x: 0,
                        y: 0,
                        w: r.dom.naturalWidth,
                        h: r.dom.naturalHeight
                    }
                      , l = ((e,t,r)=>tinymce.geom.Rect.inflate(e, -20, -20))(s);
                    n.set(l);
                    const d = Hr(l, s, s, a(), b);
                    o.set(d),
                    t(),
                    d.on("updateRect", (r=>{
                        var o;
                        const a = r.rect
                          , i = null !== (o = e.getData().imagepreview.zoom) && void 0 !== o ? o : 1
                          , s = {
                            x: Math.round(a.x / i),
                            y: Math.round(a.y / i),
                            w: Math.round(a.w / i),
                            h: Math.round(a.h / i)
                        };
                        n.set(s),
                        t()
                    }
                    ))
                }
                ))
            }
        }
    }
      , Kr = e=>ce(e).then((t=>{
        const r = t.src;
        return {
            blob: e,
            url: r,
            width: t.naturalWidth,
            height: t.naturalHeight
        }
    }
    ))
      , Zr = (e,t,r)=>({
        type: "panel",
        classes: ["tox-image-tools"],
        items: [{
            type: "bar",
            items: e
        }, {
            type: "imagepreview",
            name: "imagepreview"
        }, {
            type: "bar",
            items: [nr(ar, "undo", "Undo", t), nr(ir, "redo", "Redo", r), nr(sr, "zoom-in", "Zoom in"), nr(lr, "zoom-out", "Zoom out")]
        }]
    })
      , $r = (e,t)=>{
        var r;
        const o = null !== (r = e.getData().imagepreview.zoom) && void 0 !== r ? r : 1
          , n = 0 === t ? Math.min(2, o + .1) : Math.max(.1, o - .1);
        e.setData({
            imagepreview: {
                zoom: n
            }
        })
    }
      , Qr = (t,r,o,n)=>{
        const a = e=>{
            ((e,t,r,o,n)=>{
                ce(n).then((e=>{
                    const t = _t(e);
                    return o.w === t.w && o.h === t.h || Lt(r) && ((e,t)=>{
                        let r, o;
                        t && (r = e.style.width,
                        o = e.style.height,
                        (r || o) && (e.style.width = t.w + "px",
                        e.style.height = t.h + "px",
                        e.removeAttribute("data-mce-style")),
                        r = e.width,
                        o = e.height,
                        (r || o) && (e.setAttribute("width", String(t.w)),
                        e.setAttribute("height", String(t.h))))
                    }
                    )(r, t),
                    URL.revokeObjectURL(e.src),
                    n
                }
                )).then(Ct).then((o=>Kt(e, n, o, !0, t, r)))
            }
            )(t, r, o.dom, n, e)
        }
          , i = W(z(t.getContainer()));
        Jt(t, o.dom).then((r=>{
            const o = (t=>{
                const r = e(t)
                  , o = Or()
                  , n = (()=>{
                    const e = [];
                    let t = -1;
                    const r = ()=>t > 0
                      , o = ()=>-1 !== t && t < e.length - 1;
                    return {
                        data: e,
                        add: r=>{
                            const o = e.splice(++t);
                            return e.push(r),
                            {
                                state: r,
                                removed: o
                            }
                        }
                        ,
                        undo: ()=>e[r() ? --t : t],
                        redo: ()=>e[o() ? ++t : t],
                        canUndo: r,
                        canRedo: o
                    }
                }
                )();
                n.add(t);
                const a = e=>{
                    r.set(e);
                    const t = n.add(e).removed;
                    l(t)
                }
                  , i = ()=>o.get().getOrThunk(r.get)
                  , s = e=>URL.revokeObjectURL(e.url)
                  , l = e=>T(e, s)
                  , d = ()=>{
                    o.on(s),
                    o.clear()
                }
                ;
                return {
                    getState: ()=>r.get(),
                    addState: e=>Kr(e).then(a),
                    destroyState: ()=>{
                        d(),
                        l(n.data)
                    }
                    ,
                    getTempState: i,
                    setTempState: e=>Kr(e).then((e=>{
                        d(),
                        o.set(e)
                    }
                    )),
                    applyTempState: ()=>o.get().each((e=>{
                        a(e),
                        o.clear()
                    }
                    )),
                    destroyTempState: d,
                    undo: ()=>{
                        const e = n.undo();
                        r.set(e)
                    }
                    ,
                    redo: ()=>{
                        const e = n.redo();
                        r.set(e)
                    }
                    ,
                    canRedo: n.canRedo,
                    canUndo: n.canUndo,
                    dialogData: (e=!1)=>{
                        const t = i();
                        return {
                            imagepreview: {
                                ...e ? {
                                    cachedWidth: t.width,
                                    cachedHeight: t.height
                                } : {},
                                url: t.url
                            },
                            size: {
                                width: String(t.width),
                                height: String(t.height)
                            }
                        }
                    }
                }
            }
            )({
                blob: r,
                url: URL.createObjectURL(r),
                width: n.w,
                height: n.h
            })
              , s = t.windowManager.open(((e,t,r)=>{
                const o = e=>{
                    const r = e.getData().imagepreview;
                    return er({
                        imagepreview: r
                    }, t.dialogData())
                }
                  , n = (e,r,o)=>e(o, r.getData()).then(t.setTempState).then((()=>{
                    r.setData(t.dialogData())
                }
                ))
                  , a = e=>{
                    e.setEnabled(ar, t.canUndo()),
                    e.setEnabled(ir, t.canRedo())
                }
                  , i = ({ui: e, existingApi: r, overrides: a, actions: i})=>r.redial({
                    ...h(),
                    initialData: o(r),
                    body: Zr(e.barComponents, !0, !0),
                    onAction: (e,r)=>{
                        !g(i) && M(i, r.name) ? n(i[r.name], e, t.getTempState()) : ("apply" === r.name && t.applyTempState(),
                        m.onAction(e, r))
                    }
                    ,
                    ...a
                })
                  , s = e=>r=>{
                    n(e.renderInitial, r, t.getState()).then((()=>i({
                        ui: e,
                        existingApi: r
                    })))
                }
                  , l = e=>r=>i({
                    ui: e,
                    existingApi: r,
                    overrides: {
                        onChange: r=>{
                            n(e.renderChange, r, t.getState())
                        }
                    }
                })
                  , d = e=>r=>{
                    i({
                        ui: e,
                        existingApi: r,
                        overrides: {
                            onAction: (r,o)=>{
                                switch ("apply" === o.name ? e.renderFinal(t.getState(), r.getData()).then(t.addState).then((()=>{
                                    r.setData(t.dialogData()),
                                    m.onAction(r, o)
                                }
                                )) : m.onAction(r, o),
                                o.name) {
                                case sr:
                                case lr:
                                    e.onZoom(r)
                                }
                            }
                        }
                    }),
                    e.onOpen(r)
                }
                  , c = {
                    [dr]: d(qr(e)),
                    [cr]: d({
                        barComponents: Vr([rr, {
                            type: "sizeinput",
                            name: "size"
                        }, rr]),
                        onOpen: b,
                        onZoom: b,
                        renderFinal: (e,t)=>{
                            const r = t.size;
                            return _r(e.blob, (e=>yt(e, parseInt(r.width, 10), parseInt(r.height, 10))))
                        }
                    }),
                    [ur]: (u = {
                        barComponents: Vr([rr, nr(br, "flip-horizontally", "Flip horizontally"), nr(wr, "flip-vertically", "Flip vertically"), nr(vr, "rotate-left", "Rotate counterclockwise"), nr(xr, "rotate-right", "Rotate clockwise"), rr]),
                        actions: {
                            [br]: Xr(pt, "h"),
                            [wr]: Xr(pt, "v"),
                            [vr]: Xr(bt, -90),
                            [xr]: Xr(bt, 90)
                        }
                    },
                    e=>i({
                        ui: u,
                        existingApi: e,
                        actions: u.actions
                    })),
                    [mr]: l({
                        barComponents: Vr([{
                            type: "slider",
                            name: "brightness",
                            label: "Brightness",
                            min: -100,
                            max: 100
                        }]),
                        renderChange: Yr("brightness")
                    }),
                    [hr]: s({
                        barComponents: Wr(),
                        renderInitial: Jr("sharpen")
                    }),
                    [gr]: l({
                        barComponents: Vr([{
                            type: "slider",
                            name: "contrast",
                            label: "Contrast",
                            min: -100,
                            max: 100
                        }]),
                        renderChange: Yr("contrast")
                    }),
                    [pr]: l({
                        barComponents: Vr([{
                            type: "slider",
                            name: "color-red",
                            label: "R",
                            min: 0,
                            max: 200
                        }, {
                            type: "slider",
                            name: "color-green",
                            label: "G",
                            min: 0,
                            max: 200
                        }, {
                            type: "slider",
                            name: "color-blue",
                            label: "B",
                            min: 0,
                            max: 200
                        }]),
                        renderChange: (e,t)=>{
                            const r = t["color-red"] / 100
                              , o = t["color-green"] / 100
                              , n = t["color-blue"] / 100;
                            return _r(e.blob, (e=>gt(e, r, o, n)))
                        }
                    }),
                    [fr]: l({
                        barComponents: Vr([{
                            type: "slider",
                            name: "gamma",
                            label: "Gamma",
                            min: -100,
                            max: 100
                        }]),
                        renderChange: Yr("gamma")
                    }),
                    [yr]: s({
                        barComponents: Wr(),
                        renderInitial: Jr("invert")
                    })
                };
                var u;
                const m = {
                    onSubmit: e=>{
                        const o = t.getState().blob;
                        r(o),
                        e.close()
                    }
                    ,
                    onClose: t.destroyState,
                    onAction: (e,r)=>{
                        const n = c[r.name];
                        if (g(n))
                            switch (r.name) {
                            case "apply":
                            case "back":
                                t.destroyTempState(),
                                e.redial({
                                    ...h(),
                                    initialData: o(e)
                                });
                                break;
                            case ar:
                                t.undo(),
                                e.setData(t.dialogData()),
                                a(e);
                                break;
                            case ir:
                                t.redo(),
                                e.setData(t.dialogData()),
                                a(e);
                                break;
                            case sr:
                                $r(e, 0);
                                break;
                            case lr:
                                $r(e, 1)
                            }
                        else
                            n(e)
                    }
                }
                  , h = ()=>({
                    ...m,
                    title: "Edit Image",
                    size: "large",
                    body: Zr([nr(dr, "crop", "Crop"), nr(cr, "resize", "Resize"), nr(ur, "orientation", "Orientation"), nr(mr, "brightness", "Brightness"), nr(hr, "sharpen", "Sharpen"), nr(gr, "contrast", "Contrast"), nr(pr, "color-levels", "Color levels"), nr(fr, "gamma", "Gamma"), nr(yr, "invert", "Invert")], !t.canUndo(), !t.canRedo()),
                    buttons: [{
                        type: "cancel",
                        name: "cancel",
                        text: "Cancel"
                    }, {
                        type: "submit",
                        name: "save",
                        text: "Save",
                        enabled: t.canUndo(),
                        primary: !0
                    }]
                });
                return {
                    ...h(),
                    initialData: t.dialogData(!0)
                }
            }
            )(i, o, a));
            s.setEnabled("save", !1)
        }
        ))
    }
      , eo = (e,t)=>()=>{
        Vt(e).bind((t=>Gt(e, t))).each((r=>{
            Qr(e, t, r, _t(r.dom))
        }
        ))
    }
      , to = (e,t)=>{
        const r = Or();
        e.on("NodeChange", (o=>{
            const n = r.get()
              , a = Gt(e, z(o.element));
            n.isSome() && !((e,t,r=x)=>{
                return (o = e,
                n = t,
                a = r,
                o.isSome() && n.isSome() ? P.some(a(o.getOrDie(), n.getOrDie())) : P.none()).getOr(e.isNone() && t.isNone());
                var o, n, a
            }
            )(a, n, ((e,t)=>e.dom.src === t.dom.src)) ? (qt(t),
            e.editorUpload.uploadImagesAuto(),
            r.clear()) : a.each(r.set)
        }
        ))
    }
    ;
    tinymce.PluginManager.requireLangPack("editimage", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("editimage", (t=>{
        if (((e,t)=>!!e && -1 === ((e,t)=>{
            const o = r(e.major, t.major);
            if (0 !== o)
                return o;
            const n = r(e.minor, t.minor);
            if (0 !== n)
                return n;
            const a = r(e.patch, t.patch);
            return 0 !== a ? a : 0
        }
        )((e=>n((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), n(t)))(tinymce, "6.4.0"))
            return void console.error("The editimage plugin requires at least version 6.4.0 of TinyMCE.");
        (e=>{
            const t = e.options.register;
            t("editimage_toolbar", {
                processor: "string",
                default: "rotateleft rotateright flipv fliph editimage imageoptions"
            }),
            t("editimage_proxy", {
                processor: "string"
            }),
            t("editimage_proxy_service_url", {
                processor: "string"
            }),
            t("editimage_cors_hosts", {
                processor: "string[]",
                default: []
            }),
            t("editimage_credentials_hosts", {
                processor: "string[]",
                default: []
            }),
            t("editimage_fetch_image", {
                processor: "function"
            }),
            t("editimage_api_key", {
                processor: "string"
            }),
            t("editimage_upload_timeout", {
                processor: "number",
                default: 3e4
            })
        }
        )(t);
        const o = e(0);
        ((e,t)=>{
            R({
                mceImageRotateLeft: $t(e, t, -90),
                mceImageRotateRight: $t(e, t, 90),
                mceImageFlipVertical: Qt(e, t, "v"),
                mceImageFlipHorizontal: Qt(e, t, "h"),
                mceEditImage: eo(e, t)
            }, ((t,r)=>{
                e.addCommand(r, t)
            }
            ))
        }
        )(t, o),
        (e=>{
            let t = [];
            const r = t=>()=>e.execCommand(t)
              , o = ()=>Vt(e).exists((t=>Gt(e, t).isSome()))
              , n = e=>{
                const r = t=>e.setEnabled(t);
                return r(o()),
                t = t.concat([r]),
                ()=>{
                    t = ((e,t)=>{
                        const o = [];
                        for (let t = 0, n = e.length; t < n; t++) {
                            const n = e[t];
                            n !== r && o.push(n)
                        }
                        return o
                    }
                    )(t)
                }
            }
            ;
            e.on("NodeChange", (()=>{
                const e = o();
                T(t, (t=>t(e)))
            }
            )),
            e.ui.registry.addButton("rotateleft", {
                tooltip: "Rotate counterclockwise",
                icon: "rotate-left",
                onAction: r("mceImageRotateLeft"),
                onSetup: n
            }),
            e.ui.registry.addButton("rotateright", {
                tooltip: "Rotate clockwise",
                icon: "rotate-right",
                onAction: r("mceImageRotateRight"),
                onSetup: n
            }),
            e.ui.registry.addButton("flipv", {
                tooltip: "Flip vertically",
                icon: "flip-vertically",
                onAction: r("mceImageFlipVertical"),
                onSetup: n
            }),
            e.ui.registry.addButton("fliph", {
                tooltip: "Flip horizontally",
                icon: "flip-horizontally",
                onAction: r("mceImageFlipHorizontal"),
                onSetup: n
            }),
            e.ui.registry.addButton("editimage", {
                tooltip: "Edit image",
                icon: "edit-image",
                onAction: r("mceEditImage"),
                onSetup: n
            }),
            e.ui.registry.addButton("imageoptions", {
                tooltip: "Image options",
                icon: "image",
                onAction: r("mceImage")
            }),
            e.ui.registry.addContextMenu("editimage", {
                update: t=>e.selection.isEditable() ? Gt(e, z(t)).map((e=>({
                    text: "Edit image",
                    icon: "edit-image",
                    onAction: r("mceEditImage")
                }))).toArray() : []
            })
        }
        )(t),
        (e=>{
            e.ui.registry.addContextToolbar("editimage", {
                items: Rt(e),
                predicate: t=>e.selection.isEditable() && Gt(e, z(t)).isSome(),
                position: "node",
                scope: "node"
            })
        }
        )(t),
        to(t, o)
    }
    ))
}();
