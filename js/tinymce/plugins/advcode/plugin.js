/*!
 * Tiny Enhanced Code Editor plugin
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
      , i = e=>{
        const i = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
        return i ? n(t(i[1]), t(i[2]), t(i[3])) : n(0, 0, 0)
    }
    ;
    var _ = {
        exports: {}
    }
      , r = {}
      , s = {}
      , o = {};
    function a(t, e) {
        this.raw_options = p(t, e),
        this.disabled = this._get_boolean("disabled"),
        this.eol = this._get_characters("eol", "auto"),
        this.end_with_newline = this._get_boolean("end_with_newline"),
        this.indent_size = this._get_number("indent_size", 4),
        this.indent_char = this._get_characters("indent_char", " "),
        this.indent_level = this._get_number("indent_level"),
        this.preserve_newlines = this._get_boolean("preserve_newlines", !0),
        this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786),
        this.preserve_newlines || (this.max_preserve_newlines = 0),
        this.indent_with_tabs = this._get_boolean("indent_with_tabs", "\t" === this.indent_char),
        this.indent_with_tabs && (this.indent_char = "\t",
        1 === this.indent_size && (this.indent_size = 4)),
        this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char")),
        this.indent_empty_lines = this._get_boolean("indent_empty_lines"),
        this.templating = this._get_selection_list("templating", ["auto", "none", "angular", "django", "erb", "handlebars", "php", "smarty"], ["auto"])
    }
    function p(t, e) {
        var n, i = {};
        for (n in t = h(t))
            n !== e && (i[n] = t[n]);
        if (e && t[e])
            for (n in t[e])
                i[n] = t[e][n];
        return i
    }
    function h(t) {
        var e, n = {};
        for (e in t)
            n[e.replace(/-/g, "_")] = t[e];
        return n
    }
    a.prototype._get_array = function(t, e) {
        var n = this.raw_options[t]
          , i = e || [];
        return "object" == typeof n ? null !== n && "function" == typeof n.concat && (i = n.concat()) : "string" == typeof n && (i = n.split(/[^a-zA-Z0-9_\/\-]+/)),
        i
    }
    ,
    a.prototype._get_boolean = function(t, e) {
        var n = this.raw_options[t];
        return void 0 === n ? !!e : !!n
    }
    ,
    a.prototype._get_characters = function(t, e) {
        var n = this.raw_options[t]
          , i = e || "";
        return "string" == typeof n && (i = n.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "\t")),
        i
    }
    ,
    a.prototype._get_number = function(t, e) {
        var n = this.raw_options[t];
        e = parseInt(e, 10),
        isNaN(e) && (e = 0);
        var i = parseInt(n, 10);
        return isNaN(i) && (i = e),
        i
    }
    ,
    a.prototype._get_selection = function(t, e, n) {
        var i = this._get_selection_list(t, e, n);
        if (1 !== i.length)
            throw new Error("Invalid Option Value: The option '" + t + "' can only be one of the following values:\n" + e + "\nYou passed in: '" + this.raw_options[t] + "'");
        return i[0]
    }
    ,
    a.prototype._get_selection_list = function(t, e, n) {
        if (!e || 0 === e.length)
            throw new Error("Selection list cannot be empty.");
        if (n = n || [e[0]],
        !this._is_valid_selection(n, e))
            throw new Error("Invalid Default Value!");
        var i = this._get_array(t, n);
        if (!this._is_valid_selection(i, e))
            throw new Error("Invalid Option Value: The option '" + t + "' can contain only the following values:\n" + e + "\nYou passed in: '" + this.raw_options[t] + "'");
        return i
    }
    ,
    a.prototype._is_valid_selection = function(t, e) {
        return t.length && e.length && !t.some((function(t) {
            return -1 === e.indexOf(t)
        }
        ))
    }
    ,
    o.Options = a,
    o.normalizeOpts = h,
    o.mergeOpts = p;
    var c = o.Options;
    function l(t) {
        c.call(this, t, "html"),
        1 === this.templating.length && "auto" === this.templating[0] && (this.templating = ["django", "erb", "handlebars", "php"]),
        this.indent_inner_html = this._get_boolean("indent_inner_html"),
        this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", !0),
        this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", !0),
        this.indent_handlebars = this._get_boolean("indent_handlebars", !0),
        this.wrap_attributes = this._get_selection("wrap_attributes", ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]),
        this.wrap_attributes_min_attrs = this._get_number("wrap_attributes_min_attrs", 2),
        this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size),
        this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]),
        this.inline = this._get_array("inline", ["a", "abbr", "area", "audio", "b", "bdi", "bdo", "br", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "map", "mark", "math", "meter", "noscript", "object", "output", "progress", "q", "ruby", "s", "samp", "select", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "var", "video", "wbr", "text", "acronym", "big", "strike", "tt"]),
        this.inline_custom_elements = this._get_boolean("inline_custom_elements", !0),
        this.void_elements = this._get_array("void_elements", ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr", "!doctype", "?xml", "basefont", "isindex"]),
        this.unformatted = this._get_array("unformatted", []),
        this.content_unformatted = this._get_array("content_unformatted", ["pre", "textarea"]),
        this.unformatted_content_delimiter = this._get_characters("unformatted_content_delimiter"),
        this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"])
    }
    l.prototype = new c,
    s.Options = l;
    var u = {};
    function d(t) {
        this.__parent = t,
        this.__character_count = 0,
        this.__indent_count = -1,
        this.__alignment_count = 0,
        this.__wrap_point_index = 0,
        this.__wrap_point_character_count = 0,
        this.__wrap_point_indent_count = -1,
        this.__wrap_point_alignment_count = 0,
        this.__items = []
    }
    function g(t, e) {
        this.__cache = [""],
        this.__indent_size = t.indent_size,
        this.__indent_string = t.indent_char,
        t.indent_with_tabs || (this.__indent_string = new Array(t.indent_size + 1).join(t.indent_char)),
        e = e || "",
        t.indent_level > 0 && (e = new Array(t.indent_level + 1).join(this.__indent_string)),
        this.__base_string = e,
        this.__base_string_length = e.length
    }
    function m(t, e) {
        this.__indent_cache = new g(t,e),
        this.raw = !1,
        this._end_with_newline = t.end_with_newline,
        this.indent_size = t.indent_size,
        this.wrap_line_length = t.wrap_line_length,
        this.indent_empty_lines = t.indent_empty_lines,
        this.__lines = [],
        this.previous_line = null,
        this.current_line = null,
        this.next_line = new d(this),
        this.space_before_token = !1,
        this.non_breaking_space = !1,
        this.previous_token_wrapped = !1,
        this.__add_outputline()
    }
    d.prototype.clone_empty = function() {
        var t = new d(this.__parent);
        return t.set_indent(this.__indent_count, this.__alignment_count),
        t
    }
    ,
    d.prototype.item = function(t) {
        return t < 0 ? this.__items[this.__items.length + t] : this.__items[t]
    }
    ,
    d.prototype.has_match = function(t) {
        for (var e = this.__items.length - 1; e >= 0; e--)
            if (this.__items[e].match(t))
                return !0;
        return !1
    }
    ,
    d.prototype.set_indent = function(t, e) {
        this.is_empty() && (this.__indent_count = t || 0,
        this.__alignment_count = e || 0,
        this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count))
    }
    ,
    d.prototype._set_wrap_point = function() {
        this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length,
        this.__wrap_point_character_count = this.__character_count,
        this.__wrap_point_indent_count = this.__parent.next_line.__indent_count,
        this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count)
    }
    ,
    d.prototype._should_wrap = function() {
        return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count
    }
    ,
    d.prototype._allow_wrap = function() {
        if (this._should_wrap()) {
            this.__parent.add_new_line();
            var t = this.__parent.current_line;
            return t.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count),
            t.__items = this.__items.slice(this.__wrap_point_index),
            this.__items = this.__items.slice(0, this.__wrap_point_index),
            t.__character_count += this.__character_count - this.__wrap_point_character_count,
            this.__character_count = this.__wrap_point_character_count,
            " " === t.__items[0] && (t.__items.splice(0, 1),
            t.__character_count -= 1),
            !0
        }
        return !1
    }
    ,
    d.prototype.is_empty = function() {
        return 0 === this.__items.length
    }
    ,
    d.prototype.last = function() {
        return this.is_empty() ? null : this.__items[this.__items.length - 1]
    }
    ,
    d.prototype.push = function(t) {
        this.__items.push(t);
        var e = t.lastIndexOf("\n");
        -1 !== e ? this.__character_count = t.length - e : this.__character_count += t.length
    }
    ,
    d.prototype.pop = function() {
        var t = null;
        return this.is_empty() || (t = this.__items.pop(),
        this.__character_count -= t.length),
        t
    }
    ,
    d.prototype._remove_indent = function() {
        this.__indent_count > 0 && (this.__indent_count -= 1,
        this.__character_count -= this.__parent.indent_size)
    }
    ,
    d.prototype._remove_wrap_indent = function() {
        this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1)
    }
    ,
    d.prototype.trim = function() {
        for (; " " === this.last(); )
            this.__items.pop(),
            this.__character_count -= 1
    }
    ,
    d.prototype.toString = function() {
        var t = "";
        return this.is_empty() ? this.__parent.indent_empty_lines && (t = this.__parent.get_indent_string(this.__indent_count)) : (t = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count),
        t += this.__items.join("")),
        t
    }
    ,
    g.prototype.get_indent_size = function(t, e) {
        var n = this.__base_string_length;
        return e = e || 0,
        t < 0 && (n = 0),
        (n += t * this.__indent_size) + e
    }
    ,
    g.prototype.get_indent_string = function(t, e) {
        var n = this.__base_string;
        return e = e || 0,
        t < 0 && (t = 0,
        n = ""),
        e += t * this.__indent_size,
        this.__ensure_cache(e),
        n + this.__cache[e]
    }
    ,
    g.prototype.__ensure_cache = function(t) {
        for (; t >= this.__cache.length; )
            this.__add_column()
    }
    ,
    g.prototype.__add_column = function() {
        var t = this.__cache.length
          , e = 0
          , n = "";
        this.__indent_size && t >= this.__indent_size && (t -= (e = Math.floor(t / this.__indent_size)) * this.__indent_size,
        n = new Array(e + 1).join(this.__indent_string)),
        t && (n += new Array(t + 1).join(" ")),
        this.__cache.push(n)
    }
    ,
    m.prototype.__add_outputline = function() {
        this.previous_line = this.current_line,
        this.current_line = this.next_line.clone_empty(),
        this.__lines.push(this.current_line)
    }
    ,
    m.prototype.get_line_number = function() {
        return this.__lines.length
    }
    ,
    m.prototype.get_indent_string = function(t, e) {
        return this.__indent_cache.get_indent_string(t, e)
    }
    ,
    m.prototype.get_indent_size = function(t, e) {
        return this.__indent_cache.get_indent_size(t, e)
    }
    ,
    m.prototype.is_empty = function() {
        return !this.previous_line && this.current_line.is_empty()
    }
    ,
    m.prototype.add_new_line = function(t) {
        return !(this.is_empty() || !t && this.just_added_newline() || (this.raw || this.__add_outputline(),
        0))
    }
    ,
    m.prototype.get_code = function(t) {
        this.trim(!0);
        var e = this.current_line.pop();
        e && ("\n" === e[e.length - 1] && (e = e.replace(/\n+$/g, "")),
        this.current_line.push(e)),
        this._end_with_newline && this.__add_outputline();
        var n = this.__lines.join("\n");
        return "\n" !== t && (n = n.replace(/[\n]/g, t)),
        n
    }
    ,
    m.prototype.set_wrap_point = function() {
        this.current_line._set_wrap_point()
    }
    ,
    m.prototype.set_indent = function(t, e) {
        return t = t || 0,
        e = e || 0,
        this.next_line.set_indent(t, e),
        this.__lines.length > 1 ? (this.current_line.set_indent(t, e),
        !0) : (this.current_line.set_indent(),
        !1)
    }
    ,
    m.prototype.add_raw_token = function(t) {
        for (var e = 0; e < t.newlines; e++)
            this.__add_outputline();
        this.current_line.set_indent(-1),
        this.current_line.push(t.whitespace_before),
        this.current_line.push(t.text),
        this.space_before_token = !1,
        this.non_breaking_space = !1,
        this.previous_token_wrapped = !1
    }
    ,
    m.prototype.add_token = function(t) {
        this.__add_space_before_token(),
        this.current_line.push(t),
        this.space_before_token = !1,
        this.non_breaking_space = !1,
        this.previous_token_wrapped = this.current_line._allow_wrap()
    }
    ,
    m.prototype.__add_space_before_token = function() {
        this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(),
        this.current_line.push(" "))
    }
    ,
    m.prototype.remove_indent = function(t) {
        for (var e = this.__lines.length; t < e; )
            this.__lines[t]._remove_indent(),
            t++;
        this.current_line._remove_wrap_indent()
    }
    ,
    m.prototype.trim = function(t) {
        for (t = void 0 !== t && t,
        this.current_line.trim(); t && this.__lines.length > 1 && this.current_line.is_empty(); )
            this.__lines.pop(),
            this.current_line = this.__lines[this.__lines.length - 1],
            this.current_line.trim();
        this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null
    }
    ,
    m.prototype.just_added_newline = function() {
        return this.current_line.is_empty()
    }
    ,
    m.prototype.just_added_blankline = function() {
        return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty()
    }
    ,
    m.prototype.ensure_empty_line_above = function(t, e) {
        for (var n = this.__lines.length - 2; n >= 0; ) {
            var i = this.__lines[n];
            if (i.is_empty())
                break;
            if (0 !== i.item(0).indexOf(t) && i.item(-1) !== e) {
                this.__lines.splice(n + 1, 0, new d(this)),
                this.previous_line = this.__lines[this.__lines.length - 2];
                break
            }
            n--
        }
    }
    ,
    u.Output = m;
    var f = {}
      , y = {}
      , w = {}
      , v = RegExp.prototype.hasOwnProperty("sticky");
    function b(t) {
        this.__input = t || "",
        this.__input_length = this.__input.length,
        this.__position = 0
    }
    b.prototype.restart = function() {
        this.__position = 0
    }
    ,
    b.prototype.back = function() {
        this.__position > 0 && (this.__position -= 1)
    }
    ,
    b.prototype.hasNext = function() {
        return this.__position < this.__input_length
    }
    ,
    b.prototype.next = function() {
        var t = null;
        return this.hasNext() && (t = this.__input.charAt(this.__position),
        this.__position += 1),
        t
    }
    ,
    b.prototype.peek = function(t) {
        var e = null;
        return t = t || 0,
        (t += this.__position) >= 0 && t < this.__input_length && (e = this.__input.charAt(t)),
        e
    }
    ,
    b.prototype.__match = function(t, e) {
        t.lastIndex = e;
        var n = t.exec(this.__input);
        return !n || v && t.sticky || n.index !== e && (n = null),
        n
    }
    ,
    b.prototype.test = function(t, e) {
        return e = e || 0,
        (e += this.__position) >= 0 && e < this.__input_length && !!this.__match(t, e)
    }
    ,
    b.prototype.testChar = function(t, e) {
        var n = this.peek(e);
        return t.lastIndex = 0,
        null !== n && t.test(n)
    }
    ,
    b.prototype.match = function(t) {
        var e = this.__match(t, this.__position);
        return e ? this.__position += e[0].length : e = null,
        e
    }
    ,
    b.prototype.read = function(t, e, n) {
        var i, _ = "";
        return t && (i = this.match(t)) && (_ += i[0]),
        !e || !i && t || (_ += this.readUntil(e, n)),
        _
    }
    ,
    b.prototype.readUntil = function(t, e) {
        var n, i = this.__position;
        t.lastIndex = this.__position;
        var _ = t.exec(this.__input);
        return _ ? (i = _.index,
        e && (i += _[0].length)) : i = this.__input_length,
        n = this.__input.substring(this.__position, i),
        this.__position = i,
        n
    }
    ,
    b.prototype.readUntilAfter = function(t) {
        return this.readUntil(t, !0)
    }
    ,
    b.prototype.get_regexp = function(t, e) {
        var n = null
          , i = "g";
        return e && v && (i = "y"),
        "string" == typeof t && "" !== t ? n = new RegExp(t,i) : t && (n = new RegExp(t.source,i)),
        n
    }
    ,
    b.prototype.get_literal_regexp = function(t) {
        return RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
    }
    ,
    b.prototype.peekUntilAfter = function(t) {
        var e = this.__position
          , n = this.readUntilAfter(t);
        return this.__position = e,
        n
    }
    ,
    b.prototype.lookBack = function(t) {
        var e = this.__position - 1;
        return e >= t.length && this.__input.substring(e - t.length, e).toLowerCase() === t
    }
    ,
    w.InputScanner = b;
    var x = {
        Token: function(t, e, n, i) {
            this.type = t,
            this.text = e,
            this.comments_before = null,
            this.newlines = n || 0,
            this.whitespace_before = i || "",
            this.parent = null,
            this.next = null,
            this.previous = null,
            this.opened = null,
            this.closed = null,
            this.directives = null
        }
    }
      , k = {};
    function T(t) {
        this.__tokens = [],
        this.__tokens_length = this.__tokens.length,
        this.__position = 0,
        this.__parent_token = t
    }
    T.prototype.restart = function() {
        this.__position = 0
    }
    ,
    T.prototype.isEmpty = function() {
        return 0 === this.__tokens_length
    }
    ,
    T.prototype.hasNext = function() {
        return this.__position < this.__tokens_length
    }
    ,
    T.prototype.next = function() {
        var t = null;
        return this.hasNext() && (t = this.__tokens[this.__position],
        this.__position += 1),
        t
    }
    ,
    T.prototype.peek = function(t) {
        var e = null;
        return t = t || 0,
        (t += this.__position) >= 0 && t < this.__tokens_length && (e = this.__tokens[t]),
        e
    }
    ,
    T.prototype.add = function(t) {
        this.__parent_token && (t.parent = this.__parent_token),
        this.__tokens.push(t),
        this.__tokens_length += 1
    }
    ,
    k.TokenStream = T;
    var O = {}
      , E = {};
    function A(t, e) {
        this._input = t,
        this._starting_pattern = null,
        this._match_pattern = null,
        this._until_pattern = null,
        this._until_after = !1,
        e && (this._starting_pattern = this._input.get_regexp(e._starting_pattern, !0),
        this._match_pattern = this._input.get_regexp(e._match_pattern, !0),
        this._until_pattern = this._input.get_regexp(e._until_pattern),
        this._until_after = e._until_after)
    }
    A.prototype.read = function() {
        var t = this._input.read(this._starting_pattern);
        return this._starting_pattern && !t || (t += this._input.read(this._match_pattern, this._until_pattern, this._until_after)),
        t
    }
    ,
    A.prototype.read_match = function() {
        return this._input.match(this._match_pattern)
    }
    ,
    A.prototype.until_after = function(t) {
        var e = this._create();
        return e._until_after = !0,
        e._until_pattern = this._input.get_regexp(t),
        e._update(),
        e
    }
    ,
    A.prototype.until = function(t) {
        var e = this._create();
        return e._until_after = !1,
        e._until_pattern = this._input.get_regexp(t),
        e._update(),
        e
    }
    ,
    A.prototype.starting_with = function(t) {
        var e = this._create();
        return e._starting_pattern = this._input.get_regexp(t, !0),
        e._update(),
        e
    }
    ,
    A.prototype.matching = function(t) {
        var e = this._create();
        return e._match_pattern = this._input.get_regexp(t, !0),
        e._update(),
        e
    }
    ,
    A.prototype._create = function() {
        return new A(this._input,this)
    }
    ,
    A.prototype._update = function() {}
    ,
    E.Pattern = A;
    var C = E.Pattern;
    function N(t, e) {
        C.call(this, t, e),
        e ? this._line_regexp = this._input.get_regexp(e._line_regexp) : this.__set_whitespace_patterns("", ""),
        this.newline_count = 0,
        this.whitespace_before_token = ""
    }
    N.prototype = new C,
    N.prototype.__set_whitespace_patterns = function(t, e) {
        t += "\\t ",
        e += "\\n\\r",
        this._match_pattern = this._input.get_regexp("[" + t + e + "]+", !0),
        this._newline_regexp = this._input.get_regexp("\\r\\n|[" + e + "]")
    }
    ,
    N.prototype.read = function() {
        this.newline_count = 0,
        this.whitespace_before_token = "";
        var t = this._input.read(this._match_pattern);
        if (" " === t)
            this.whitespace_before_token = " ";
        else if (t) {
            var e = this.__split(this._newline_regexp, t);
            this.newline_count = e.length - 1,
            this.whitespace_before_token = e[this.newline_count]
        }
        return t
    }
    ,
    N.prototype.matching = function(t, e) {
        var n = this._create();
        return n.__set_whitespace_patterns(t, e),
        n._update(),
        n
    }
    ,
    N.prototype._create = function() {
        return new N(this._input,this)
    }
    ,
    N.prototype.__split = function(t, e) {
        t.lastIndex = 0;
        for (var n = 0, i = [], _ = t.exec(e); _; )
            i.push(e.substring(n, _.index)),
            n = _.index + _[0].length,
            _ = t.exec(e);
        return n < e.length ? i.push(e.substring(n, e.length)) : i.push(""),
        i
    }
    ,
    O.WhitespacePattern = N;
    var S = w.InputScanner
      , z = x.Token
      , L = k.TokenStream
      , j = O.WhitespacePattern
      , R = {
        START: "TK_START",
        RAW: "TK_RAW",
        EOF: "TK_EOF"
    }
      , I = function(t, e) {
        this._input = new S(t),
        this._options = e || {},
        this.__tokens = null,
        this._patterns = {},
        this._patterns.whitespace = new j(this._input)
    };
    I.prototype.tokenize = function() {
        var t;
        this._input.restart(),
        this.__tokens = new L,
        this._reset();
        for (var e = new z(R.START,""), n = null, i = [], _ = new L; e.type !== R.EOF; ) {
            for (t = this._get_next_token(e, n); this._is_comment(t); )
                _.add(t),
                t = this._get_next_token(e, n);
            _.isEmpty() || (t.comments_before = _,
            _ = new L),
            t.parent = n,
            this._is_opening(t) ? (i.push(n),
            n = t) : n && this._is_closing(t, n) && (t.opened = n,
            n.closed = t,
            n = i.pop(),
            t.parent = n),
            t.previous = e,
            e.next = t,
            this.__tokens.add(t),
            e = t
        }
        return this.__tokens
    }
    ,
    I.prototype._is_first_token = function() {
        return this.__tokens.isEmpty()
    }
    ,
    I.prototype._reset = function() {}
    ,
    I.prototype._get_next_token = function(t, e) {
        this._readWhitespace();
        var n = this._input.read(/.+/g);
        return n ? this._create_token(R.RAW, n) : this._create_token(R.EOF, "")
    }
    ,
    I.prototype._is_comment = function(t) {
        return !1
    }
    ,
    I.prototype._is_opening = function(t) {
        return !1
    }
    ,
    I.prototype._is_closing = function(t, e) {
        return !1
    }
    ,
    I.prototype._create_token = function(t, e) {
        return new z(t,e,this._patterns.whitespace.newline_count,this._patterns.whitespace.whitespace_before_token)
    }
    ,
    I.prototype._readWhitespace = function() {
        return this._patterns.whitespace.read()
    }
    ,
    y.Tokenizer = I,
    y.TOKEN = R;
    var U = {};
    function F(t, e) {
        t = "string" == typeof t ? t : t.source,
        e = "string" == typeof e ? e : e.source,
        this.__directives_block_pattern = new RegExp(t + / beautify( \w+[:]\w+)+ /.source + e,"g"),
        this.__directive_pattern = / (\w+)[:](\w+)/g,
        this.__directives_end_ignore_pattern = new RegExp(t + /\sbeautify\signore:end\s/.source + e,"g")
    }
    F.prototype.get_directives = function(t) {
        if (!t.match(this.__directives_block_pattern))
            return null;
        var e = {};
        this.__directive_pattern.lastIndex = 0;
        for (var n = this.__directive_pattern.exec(t); n; )
            e[n[1]] = n[2],
            n = this.__directive_pattern.exec(t);
        return e
    }
    ,
    F.prototype.readIgnored = function(t) {
        return t.readUntilAfter(this.__directives_end_ignore_pattern)
    }
    ,
    U.Directives = F;
    var P = {}
      , W = E.Pattern
      , M = {
        django: !1,
        erb: !1,
        handlebars: !1,
        php: !1,
        smarty: !1,
        angular: !1
    };
    function K(t, e) {
        W.call(this, t, e),
        this.__template_pattern = null,
        this._disabled = Object.assign({}, M),
        this._excluded = Object.assign({}, M),
        e && (this.__template_pattern = this._input.get_regexp(e.__template_pattern),
        this._excluded = Object.assign(this._excluded, e._excluded),
        this._disabled = Object.assign(this._disabled, e._disabled));
        var n = new W(t);
        this.__patterns = {
            handlebars_comment: n.starting_with(/{{!--/).until_after(/--}}/),
            handlebars_unescaped: n.starting_with(/{{{/).until_after(/}}}/),
            handlebars: n.starting_with(/{{/).until_after(/}}/),
            php: n.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
            erb: n.starting_with(/<%[^%]/).until_after(/[^%]%>/),
            django: n.starting_with(/{%/).until_after(/%}/),
            django_value: n.starting_with(/{{/).until_after(/}}/),
            django_comment: n.starting_with(/{#/).until_after(/#}/),
            smarty: n.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
            smarty_comment: n.starting_with(/{\*/).until_after(/\*}/),
            smarty_literal: n.starting_with(/{literal}/).until_after(/{\/literal}/)
        }
    }
    K.prototype = new W,
    K.prototype._create = function() {
        return new K(this._input,this)
    }
    ,
    K.prototype._update = function() {
        this.__set_templated_pattern()
    }
    ,
    K.prototype.disable = function(t) {
        var e = this._create();
        return e._disabled[t] = !0,
        e._update(),
        e
    }
    ,
    K.prototype.read_options = function(t) {
        var e = this._create();
        for (var n in M)
            e._disabled[n] = -1 === t.templating.indexOf(n);
        return e._update(),
        e
    }
    ,
    K.prototype.exclude = function(t) {
        var e = this._create();
        return e._excluded[t] = !0,
        e._update(),
        e
    }
    ,
    K.prototype.read = function() {
        var t = "";
        t = this._match_pattern ? this._input.read(this._starting_pattern) : this._input.read(this._starting_pattern, this.__template_pattern);
        for (var e = this._read_template(); e; )
            this._match_pattern ? e += this._input.read(this._match_pattern) : e += this._input.readUntil(this.__template_pattern),
            t += e,
            e = this._read_template();
        return this._until_after && (t += this._input.readUntilAfter(this._until_pattern)),
        t
    }
    ,
    K.prototype.__set_templated_pattern = function() {
        var t = [];
        this._disabled.php || t.push(this.__patterns.php._starting_pattern.source),
        this._disabled.handlebars || t.push(this.__patterns.handlebars._starting_pattern.source),
        this._disabled.erb || t.push(this.__patterns.erb._starting_pattern.source),
        this._disabled.django || (t.push(this.__patterns.django._starting_pattern.source),
        t.push(this.__patterns.django_value._starting_pattern.source),
        t.push(this.__patterns.django_comment._starting_pattern.source)),
        this._disabled.smarty || t.push(this.__patterns.smarty._starting_pattern.source),
        this._until_pattern && t.push(this._until_pattern.source),
        this.__template_pattern = this._input.get_regexp("(?:" + t.join("|") + ")")
    }
    ,
    K.prototype._read_template = function() {
        var t = ""
          , e = this._input.peek();
        if ("<" === e) {
            var n = this._input.peek(1);
            this._disabled.php || this._excluded.php || "?" !== n || (t = t || this.__patterns.php.read()),
            this._disabled.erb || this._excluded.erb || "%" !== n || (t = t || this.__patterns.erb.read())
        } else
            "{" === e && (this._disabled.handlebars || this._excluded.handlebars || (t = (t = (t = t || this.__patterns.handlebars_comment.read()) || this.__patterns.handlebars_unescaped.read()) || this.__patterns.handlebars.read()),
            this._disabled.django || (this._excluded.django || this._excluded.handlebars || (t = t || this.__patterns.django_value.read()),
            this._excluded.django || (t = (t = t || this.__patterns.django_comment.read()) || this.__patterns.django.read())),
            this._disabled.smarty || this._disabled.django && this._disabled.handlebars && (t = (t = (t = t || this.__patterns.smarty_comment.read()) || this.__patterns.smarty_literal.read()) || this.__patterns.smarty.read()));
        return t
    }
    ,
    P.TemplatablePattern = K;
    var G = y.Tokenizer
      , V = y.TOKEN
      , B = U.Directives
      , D = P.TemplatablePattern
      , q = E.Pattern
      , X = {
        TAG_OPEN: "TK_TAG_OPEN",
        TAG_CLOSE: "TK_TAG_CLOSE",
        CONTROL_FLOW_OPEN: "TK_CONTROL_FLOW_OPEN",
        CONTROL_FLOW_CLOSE: "TK_CONTROL_FLOW_CLOSE",
        ATTRIBUTE: "TK_ATTRIBUTE",
        EQUALS: "TK_EQUALS",
        VALUE: "TK_VALUE",
        COMMENT: "TK_COMMENT",
        TEXT: "TK_TEXT",
        UNKNOWN: "TK_UNKNOWN",
        START: V.START,
        RAW: V.RAW,
        EOF: V.EOF
    }
      , $ = new B(/<\!--/,/-->/)
      , Q = function(t, e) {
        G.call(this, t, e),
        this._current_tag_name = "";
        var n = new D(this._input).read_options(this._options)
          , i = new q(this._input);
        if (this.__patterns = {
            word: n.until(/[\n\r\t <]/),
            word_control_flow_close_excluded: n.until(/[\n\r\t <}]/),
            single_quote: n.until_after(/'/),
            double_quote: n.until_after(/"/),
            attribute: n.until(/[\n\r\t =>]|\/>/),
            element_name: n.until(/[\n\r\t >\/]/),
            angular_control_flow_start: i.matching(/\@[a-zA-Z]+[^({]*[({]/),
            handlebars_comment: i.starting_with(/{{!--/).until_after(/--}}/),
            handlebars: i.starting_with(/{{/).until_after(/}}/),
            handlebars_open: i.until(/[\n\r\t }]/),
            handlebars_raw_close: i.until(/}}/),
            comment: i.starting_with(/<!--/).until_after(/-->/),
            cdata: i.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
            conditional_comment: i.starting_with(/<!\[/).until_after(/]>/),
            processing: i.starting_with(/<\?/).until_after(/\?>/)
        },
        this._options.indent_handlebars && (this.__patterns.word = this.__patterns.word.exclude("handlebars"),
        this.__patterns.word_control_flow_close_excluded = this.__patterns.word_control_flow_close_excluded.exclude("handlebars")),
        this._unformatted_content_delimiter = null,
        this._options.unformatted_content_delimiter) {
            var _ = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
            this.__patterns.unformatted_content_delimiter = i.matching(_).until_after(_)
        }
    };
    (Q.prototype = new G)._is_comment = function(t) {
        return !1
    }
    ,
    Q.prototype._is_opening = function(t) {
        return t.type === X.TAG_OPEN || t.type === X.CONTROL_FLOW_OPEN
    }
    ,
    Q.prototype._is_closing = function(t, e) {
        return t.type === X.TAG_CLOSE && e && ((">" === t.text || "/>" === t.text) && "<" === e.text[0] || "}}" === t.text && "{" === e.text[0] && "{" === e.text[1]) || t.type === X.CONTROL_FLOW_CLOSE && "}" === t.text && e.text.endsWith("{")
    }
    ,
    Q.prototype._reset = function() {
        this._current_tag_name = ""
    }
    ,
    Q.prototype._get_next_token = function(t, e) {
        var n = null;
        this._readWhitespace();
        var i = this._input.peek();
        return null === i ? this._create_token(X.EOF, "") : n = (n = (n = (n = (n = (n = (n = (n = (n = (n = n || this._read_open_handlebars(i, e)) || this._read_attribute(i, t, e)) || this._read_close(i, e)) || this._read_control_flows(i, e)) || this._read_raw_content(i, t, e)) || this._read_content_word(i, e)) || this._read_comment_or_cdata(i)) || this._read_processing(i)) || this._read_open(i, e)) || this._create_token(X.UNKNOWN, this._input.next())
    }
    ,
    Q.prototype._read_comment_or_cdata = function(t) {
        var e = null
          , n = null
          , i = null;
        return "<" === t && ("!" === this._input.peek(1) && ((n = this.__patterns.comment.read()) ? (i = $.get_directives(n)) && "start" === i.ignore && (n += $.readIgnored(this._input)) : n = this.__patterns.cdata.read()),
        n && ((e = this._create_token(X.COMMENT, n)).directives = i)),
        e
    }
    ,
    Q.prototype._read_processing = function(t) {
        var e = null
          , n = null;
        if ("<" === t) {
            var i = this._input.peek(1);
            "!" !== i && "?" !== i || (n = (n = this.__patterns.conditional_comment.read()) || this.__patterns.processing.read()),
            n && ((e = this._create_token(X.COMMENT, n)).directives = null)
        }
        return e
    }
    ,
    Q.prototype._read_open = function(t, e) {
        var n = null
          , i = null;
        return e && e.type !== X.CONTROL_FLOW_OPEN || "<" === t && (n = this._input.next(),
        "/" === this._input.peek() && (n += this._input.next()),
        n += this.__patterns.element_name.read(),
        i = this._create_token(X.TAG_OPEN, n)),
        i
    }
    ,
    Q.prototype._read_open_handlebars = function(t, e) {
        var n = null
          , i = null;
        return e && e.type !== X.CONTROL_FLOW_OPEN || this._options.indent_handlebars && "{" === t && "{" === this._input.peek(1) && ("!" === this._input.peek(2) ? (n = (n = this.__patterns.handlebars_comment.read()) || this.__patterns.handlebars.read(),
        i = this._create_token(X.COMMENT, n)) : (n = this.__patterns.handlebars_open.read(),
        i = this._create_token(X.TAG_OPEN, n))),
        i
    }
    ,
    Q.prototype._read_control_flows = function(t, e) {
        var n = ""
          , i = null;
        if (!this._options.templating.includes("angular") || !this._options.indent_handlebars)
            return i;
        if ("@" === t) {
            if ("" === (n = this.__patterns.angular_control_flow_start.read()))
                return i;
            for (var _ = n.endsWith("(") ? 1 : 0, r = 0; !n.endsWith("{") || _ !== r; ) {
                var s = this._input.next();
                if (null === s)
                    break;
                "(" === s ? _++ : ")" === s && r++,
                n += s
            }
            i = this._create_token(X.CONTROL_FLOW_OPEN, n)
        } else
            "}" === t && e && e.type === X.CONTROL_FLOW_OPEN && (n = this._input.next(),
            i = this._create_token(X.CONTROL_FLOW_CLOSE, n));
        return i
    }
    ,
    Q.prototype._read_close = function(t, e) {
        var n = null
          , i = null;
        return e && e.type === X.TAG_OPEN && ("<" === e.text[0] && (">" === t || "/" === t && ">" === this._input.peek(1)) ? (n = this._input.next(),
        "/" === t && (n += this._input.next()),
        i = this._create_token(X.TAG_CLOSE, n)) : "{" === e.text[0] && "}" === t && "}" === this._input.peek(1) && (this._input.next(),
        this._input.next(),
        i = this._create_token(X.TAG_CLOSE, "}}"))),
        i
    }
    ,
    Q.prototype._read_attribute = function(t, e, n) {
        var i = null
          , _ = "";
        if (n && "<" === n.text[0])
            if ("=" === t)
                i = this._create_token(X.EQUALS, this._input.next());
            else if ('"' === t || "'" === t) {
                var r = this._input.next();
                r += '"' === t ? this.__patterns.double_quote.read() : this.__patterns.single_quote.read(),
                i = this._create_token(X.VALUE, r)
            } else
                (_ = this.__patterns.attribute.read()) && (i = e.type === X.EQUALS ? this._create_token(X.VALUE, _) : this._create_token(X.ATTRIBUTE, _));
        return i
    }
    ,
    Q.prototype._is_content_unformatted = function(t) {
        return -1 === this._options.void_elements.indexOf(t) && (-1 !== this._options.content_unformatted.indexOf(t) || -1 !== this._options.unformatted.indexOf(t))
    }
    ,
    Q.prototype._read_raw_content = function(t, e, n) {
        var i = "";
        if (n && "{" === n.text[0])
            i = this.__patterns.handlebars_raw_close.read();
        else if (e.type === X.TAG_CLOSE && "<" === e.opened.text[0] && "/" !== e.text[0]) {
            var _ = e.opened.text.substr(1).toLowerCase();
            if ("script" === _ || "style" === _) {
                var r = this._read_comment_or_cdata(t);
                if (r)
                    return r.type = X.TEXT,
                    r;
                i = this._input.readUntil(new RegExp("</" + _ + "[\\n\\r\\t ]*?>","ig"))
            } else
                this._is_content_unformatted(_) && (i = this._input.readUntil(new RegExp("</" + _ + "[\\n\\r\\t ]*?>","ig")))
        }
        return i ? this._create_token(X.TEXT, i) : null
    }
    ,
    Q.prototype._read_content_word = function(t, e) {
        var n = "";
        if (this._options.unformatted_content_delimiter && t === this._options.unformatted_content_delimiter[0] && (n = this.__patterns.unformatted_content_delimiter.read()),
        n || (n = e && e.type === X.CONTROL_FLOW_OPEN ? this.__patterns.word_control_flow_close_excluded.read() : this.__patterns.word.read()),
        n)
            return this._create_token(X.TEXT, n)
    }
    ,
    f.Tokenizer = Q,
    f.TOKEN = X;
    var H = s.Options
      , Y = u.Output
      , Z = f.Tokenizer
      , J = f.TOKEN
      , tt = /\r\n|[\r\n]/
      , et = /\r\n|[\r\n]/g
      , nt = function(t, e) {
        this.indent_level = 0,
        this.alignment_size = 0,
        this.max_preserve_newlines = t.max_preserve_newlines,
        this.preserve_newlines = t.preserve_newlines,
        this._output = new Y(t,e)
    };
    nt.prototype.current_line_has_match = function(t) {
        return this._output.current_line.has_match(t)
    }
    ,
    nt.prototype.set_space_before_token = function(t, e) {
        this._output.space_before_token = t,
        this._output.non_breaking_space = e
    }
    ,
    nt.prototype.set_wrap_point = function() {
        this._output.set_indent(this.indent_level, this.alignment_size),
        this._output.set_wrap_point()
    }
    ,
    nt.prototype.add_raw_token = function(t) {
        this._output.add_raw_token(t)
    }
    ,
    nt.prototype.print_preserved_newlines = function(t) {
        var e = 0;
        t.type !== J.TEXT && t.previous.type !== J.TEXT && (e = t.newlines ? 1 : 0),
        this.preserve_newlines && (e = t.newlines < this.max_preserve_newlines + 1 ? t.newlines : this.max_preserve_newlines + 1);
        for (var n = 0; n < e; n++)
            this.print_newline(n > 0);
        return 0 !== e
    }
    ,
    nt.prototype.traverse_whitespace = function(t) {
        return !(!t.whitespace_before && !t.newlines || (this.print_preserved_newlines(t) || (this._output.space_before_token = !0),
        0))
    }
    ,
    nt.prototype.previous_token_wrapped = function() {
        return this._output.previous_token_wrapped
    }
    ,
    nt.prototype.print_newline = function(t) {
        this._output.add_new_line(t)
    }
    ,
    nt.prototype.print_token = function(t) {
        t.text && (this._output.set_indent(this.indent_level, this.alignment_size),
        this._output.add_token(t.text))
    }
    ,
    nt.prototype.indent = function() {
        this.indent_level++
    }
    ,
    nt.prototype.deindent = function() {
        this.indent_level > 0 && (this.indent_level--,
        this._output.set_indent(this.indent_level, this.alignment_size))
    }
    ,
    nt.prototype.get_full_indent = function(t) {
        return (t = this.indent_level + (t || 0)) < 1 ? "" : this._output.get_indent_string(t)
    }
    ;
    function it(t, e) {
        return -1 !== e.indexOf(t)
    }
    function _t(t, e, n) {
        this.parent = t || null,
        this.tag = e ? e.tag_name : "",
        this.indent_level = n || 0,
        this.parser_token = e || null
    }
    function rt(t) {
        this._printer = t,
        this._current_frame = null
    }
    function st(t, e, n, i) {
        this._source_text = t || "",
        e = e || {},
        this._js_beautify = n,
        this._css_beautify = i,
        this._tag_stack = null;
        var _ = new H(e,"html");
        this._options = _,
        this._is_wrap_attributes_force = "force" === this._options.wrap_attributes.substr(0, 5),
        this._is_wrap_attributes_force_expand_multiline = "force-expand-multiline" === this._options.wrap_attributes,
        this._is_wrap_attributes_force_aligned = "force-aligned" === this._options.wrap_attributes,
        this._is_wrap_attributes_aligned_multiple = "aligned-multiple" === this._options.wrap_attributes,
        this._is_wrap_attributes_preserve = "preserve" === this._options.wrap_attributes.substr(0, 8),
        this._is_wrap_attributes_preserve_aligned = "preserve-aligned" === this._options.wrap_attributes
    }
    rt.prototype.get_parser_token = function() {
        return this._current_frame ? this._current_frame.parser_token : null
    }
    ,
    rt.prototype.record_tag = function(t) {
        var e = new _t(this._current_frame,t,this._printer.indent_level);
        this._current_frame = e
    }
    ,
    rt.prototype._try_pop_frame = function(t) {
        var e = null;
        return t && (e = t.parser_token,
        this._printer.indent_level = t.indent_level,
        this._current_frame = t.parent),
        e
    }
    ,
    rt.prototype._get_frame = function(t, e) {
        for (var n = this._current_frame; n && -1 === t.indexOf(n.tag); ) {
            if (e && -1 !== e.indexOf(n.tag)) {
                n = null;
                break
            }
            n = n.parent
        }
        return n
    }
    ,
    rt.prototype.try_pop = function(t, e) {
        var n = this._get_frame([t], e);
        return this._try_pop_frame(n)
    }
    ,
    rt.prototype.indent_to_tag = function(t) {
        var e = this._get_frame(t);
        e && (this._printer.indent_level = e.indent_level)
    }
    ,
    st.prototype.beautify = function() {
        if (this._options.disabled)
            return this._source_text;
        var t = this._source_text
          , e = this._options.eol;
        "auto" === this._options.eol && (e = "\n",
        t && tt.test(t) && (e = t.match(tt)[0]));
        var n = (t = t.replace(et, "\n")).match(/^[\t ]*/)[0]
          , i = {
            text: "",
            type: ""
        }
          , _ = new ot
          , r = new nt(this._options,n)
          , s = new Z(t,this._options).tokenize();
        this._tag_stack = new rt(r);
        for (var o = null, a = s.next(); a.type !== J.EOF; )
            a.type === J.TAG_OPEN || a.type === J.COMMENT ? _ = o = this._handle_tag_open(r, a, _, i, s) : a.type === J.ATTRIBUTE || a.type === J.EQUALS || a.type === J.VALUE || a.type === J.TEXT && !_.tag_complete ? o = this._handle_inside_tag(r, a, _, i) : a.type === J.TAG_CLOSE ? o = this._handle_tag_close(r, a, _) : a.type === J.TEXT ? o = this._handle_text(r, a, _) : a.type === J.CONTROL_FLOW_OPEN ? o = this._handle_control_flow_open(r, a) : a.type === J.CONTROL_FLOW_CLOSE ? o = this._handle_control_flow_close(r, a) : r.add_raw_token(a),
            i = o,
            a = s.next();
        return r._output.get_code(e)
    }
    ,
    st.prototype._handle_control_flow_open = function(t, e) {
        var n = {
            text: e.text,
            type: e.type
        };
        return t.set_space_before_token(e.newlines || "" !== e.whitespace_before, !0),
        e.newlines ? t.print_preserved_newlines(e) : t.set_space_before_token(e.newlines || "" !== e.whitespace_before, !0),
        t.print_token(e),
        t.indent(),
        n
    }
    ,
    st.prototype._handle_control_flow_close = function(t, e) {
        var n = {
            text: e.text,
            type: e.type
        };
        return t.deindent(),
        e.newlines ? t.print_preserved_newlines(e) : t.set_space_before_token(e.newlines || "" !== e.whitespace_before, !0),
        t.print_token(e),
        n
    }
    ,
    st.prototype._handle_tag_close = function(t, e, n) {
        var i = {
            text: e.text,
            type: e.type
        };
        return t.alignment_size = 0,
        n.tag_complete = !0,
        t.set_space_before_token(e.newlines || "" !== e.whitespace_before, !0),
        n.is_unformatted ? t.add_raw_token(e) : ("<" === n.tag_start_char && (t.set_space_before_token("/" === e.text[0], !0),
        this._is_wrap_attributes_force_expand_multiline && n.has_wrapped_attrs && t.print_newline(!1)),
        t.print_token(e)),
        !n.indent_content || n.is_unformatted || n.is_content_unformatted || (t.indent(),
        n.indent_content = !1),
        n.is_inline_element || n.is_unformatted || n.is_content_unformatted || t.set_wrap_point(),
        i
    }
    ,
    st.prototype._handle_inside_tag = function(t, e, n, i) {
        var _ = n.has_wrapped_attrs
          , r = {
            text: e.text,
            type: e.type
        };
        return t.set_space_before_token(e.newlines || "" !== e.whitespace_before, !0),
        n.is_unformatted ? t.add_raw_token(e) : "{" === n.tag_start_char && e.type === J.TEXT ? t.print_preserved_newlines(e) ? (e.newlines = 0,
        t.add_raw_token(e)) : t.print_token(e) : (e.type === J.ATTRIBUTE ? t.set_space_before_token(!0) : (e.type === J.EQUALS || e.type === J.VALUE && e.previous.type === J.EQUALS) && t.set_space_before_token(!1),
        e.type === J.ATTRIBUTE && "<" === n.tag_start_char && ((this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) && (t.traverse_whitespace(e),
        _ = _ || 0 !== e.newlines),
        this._is_wrap_attributes_force && n.attr_count >= this._options.wrap_attributes_min_attrs && (i.type !== J.TAG_OPEN || this._is_wrap_attributes_force_expand_multiline) && (t.print_newline(!1),
        _ = !0)),
        t.print_token(e),
        _ = _ || t.previous_token_wrapped(),
        n.has_wrapped_attrs = _),
        r
    }
    ,
    st.prototype._handle_text = function(t, e, n) {
        var i = {
            text: e.text,
            type: "TK_CONTENT"
        };
        return n.custom_beautifier_name ? this._print_custom_beatifier_text(t, e, n) : n.is_unformatted || n.is_content_unformatted ? t.add_raw_token(e) : (t.traverse_whitespace(e),
        t.print_token(e)),
        i
    }
    ,
    st.prototype._print_custom_beatifier_text = function(t, e, n) {
        var i = this;
        if ("" !== e.text) {
            var _, r = e.text, s = 1, o = "", a = "";
            "javascript" === n.custom_beautifier_name && "function" == typeof this._js_beautify ? _ = this._js_beautify : "css" === n.custom_beautifier_name && "function" == typeof this._css_beautify ? _ = this._css_beautify : "html" === n.custom_beautifier_name && (_ = function(t, e) {
                return new st(t,e,i._js_beautify,i._css_beautify).beautify()
            }
            ),
            "keep" === this._options.indent_scripts ? s = 0 : "separate" === this._options.indent_scripts && (s = -t.indent_level);
            var p = t.get_full_indent(s);
            if (r = r.replace(/\n[ \t]*$/, ""),
            "html" !== n.custom_beautifier_name && "<" === r[0] && r.match(/^(<!--|<!\[CDATA\[)/)) {
                var h = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(r);
                if (!h)
                    return void t.add_raw_token(e);
                o = p + h[1] + "\n",
                r = h[4],
                h[5] && (a = p + h[5]),
                r = r.replace(/\n[ \t]*$/, ""),
                (h[2] || -1 !== h[3].indexOf("\n")) && (h = h[3].match(/[ \t]+$/)) && (e.whitespace_before = h[0])
            }
            if (r)
                if (_) {
                    var c = function() {
                        this.eol = "\n"
                    };
                    c.prototype = this._options.raw_options,
                    r = _(p + r, new c)
                } else {
                    var l = e.whitespace_before;
                    l && (r = r.replace(new RegExp("\n(" + l + ")?","g"), "\n")),
                    r = p + r.replace(/\n/g, "\n" + p)
                }
            o && (r = r ? o + r + "\n" + a : o + a),
            t.print_newline(!1),
            r && (e.text = r,
            e.whitespace_before = "",
            e.newlines = 0,
            t.add_raw_token(e),
            t.print_newline(!0))
        }
    }
    ,
    st.prototype._handle_tag_open = function(t, e, n, i, _) {
        var r = this._get_tag_open_token(e);
        if (!n.is_unformatted && !n.is_content_unformatted || n.is_empty_element || e.type !== J.TAG_OPEN || r.is_start_tag ? (t.traverse_whitespace(e),
        this._set_tag_position(t, e, r, n, i),
        r.is_inline_element || t.set_wrap_point(),
        t.print_token(e)) : (t.add_raw_token(e),
        r.start_tag_token = this._tag_stack.try_pop(r.tag_name)),
        r.is_start_tag && this._is_wrap_attributes_force) {
            var s, o = 0;
            do {
                (s = _.peek(o)).type === J.ATTRIBUTE && (r.attr_count += 1),
                o += 1
            } while (s.type !== J.EOF && s.type !== J.TAG_CLOSE)
        }
        return (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) && (r.alignment_size = e.text.length + 1),
        r.tag_complete || r.is_unformatted || (t.alignment_size = r.alignment_size),
        r
    }
    ;
    var ot = function(t, e) {
        if (this.parent = t || null,
        this.text = "",
        this.type = "TK_TAG_OPEN",
        this.tag_name = "",
        this.is_inline_element = !1,
        this.is_unformatted = !1,
        this.is_content_unformatted = !1,
        this.is_empty_element = !1,
        this.is_start_tag = !1,
        this.is_end_tag = !1,
        this.indent_content = !1,
        this.multiline_content = !1,
        this.custom_beautifier_name = null,
        this.start_tag_token = null,
        this.attr_count = 0,
        this.has_wrapped_attrs = !1,
        this.alignment_size = 0,
        this.tag_complete = !1,
        this.tag_start_char = "",
        this.tag_check = "",
        e) {
            var n;
            this.tag_start_char = e.text[0],
            this.text = e.text,
            "<" === this.tag_start_char ? (n = e.text.match(/^<([^\s>]*)/),
            this.tag_check = n ? n[1] : "") : (n = e.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/),
            this.tag_check = n ? n[1] : "",
            (e.text.startsWith("{{#>") || e.text.startsWith("{{~#>")) && ">" === this.tag_check[0] && (">" === this.tag_check && null !== e.next ? this.tag_check = e.next.text.split(" ")[0] : this.tag_check = e.text.split(">")[1])),
            this.tag_check = this.tag_check.toLowerCase(),
            e.type === J.COMMENT && (this.tag_complete = !0),
            this.is_start_tag = "/" !== this.tag_check.charAt(0),
            this.tag_name = this.is_start_tag ? this.tag_check : this.tag_check.substr(1),
            this.is_end_tag = !this.is_start_tag || e.closed && "/>" === e.closed.text;
            var i = 2;
            "{" === this.tag_start_char && this.text.length >= 3 && "~" === this.text.charAt(2) && (i = 3),
            this.is_end_tag = this.is_end_tag || "{" === this.tag_start_char && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(i)))
        } else
            this.tag_complete = !0
    };
    st.prototype._get_tag_open_token = function(t) {
        var e = new ot(this._tag_stack.get_parser_token(),t);
        return e.alignment_size = this._options.wrap_attributes_indent_size,
        e.is_end_tag = e.is_end_tag || it(e.tag_check, this._options.void_elements),
        e.is_empty_element = e.tag_complete || e.is_start_tag && e.is_end_tag,
        e.is_unformatted = !e.tag_complete && it(e.tag_check, this._options.unformatted),
        e.is_content_unformatted = !e.is_empty_element && it(e.tag_check, this._options.content_unformatted),
        e.is_inline_element = it(e.tag_name, this._options.inline) || this._options.inline_custom_elements && e.tag_name.includes("-") || "{" === e.tag_start_char,
        e
    }
    ,
    st.prototype._set_tag_position = function(t, e, n, i, _) {
        if (n.is_empty_element || (n.is_end_tag ? n.start_tag_token = this._tag_stack.try_pop(n.tag_name) : (this._do_optional_end_element(n) && (n.is_inline_element || t.print_newline(!1)),
        this._tag_stack.record_tag(n),
        "script" !== n.tag_name && "style" !== n.tag_name || n.is_unformatted || n.is_content_unformatted || (n.custom_beautifier_name = function(t, e) {
            var n = null
              , i = null;
            return e.closed ? ("script" === t ? n = "text/javascript" : "style" === t && (n = "text/css"),
            n = function(t) {
                for (var e = null, n = t.next; n.type !== J.EOF && t.closed !== n; ) {
                    if (n.type === J.ATTRIBUTE && "type" === n.text) {
                        n.next && n.next.type === J.EQUALS && n.next.next && n.next.next.type === J.VALUE && (e = n.next.next.text);
                        break
                    }
                    n = n.next
                }
                return e
            }(e) || n,
            n.search("text/css") > -1 ? i = "css" : n.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1 ? i = "javascript" : n.search(/(text|application|dojo)\/(x-)?(html)/) > -1 ? i = "html" : n.search(/test\/null/) > -1 && (i = "null"),
            i) : null
        }(n.tag_check, e)))),
        it(n.tag_check, this._options.extra_liners) && (t.print_newline(!1),
        t._output.just_added_blankline() || t.print_newline(!0)),
        n.is_empty_element)
            "{" === n.tag_start_char && "else" === n.tag_check && (this._tag_stack.indent_to_tag(["if", "unless", "each"]),
            n.indent_content = !0,
            t.current_line_has_match(/{{#if/) || t.print_newline(!1)),
            "!--" === n.tag_name && _.type === J.TAG_CLOSE && i.is_end_tag && -1 === n.text.indexOf("\n") || (n.is_inline_element || n.is_unformatted || t.print_newline(!1),
            this._calcluate_parent_multiline(t, n));
        else if (n.is_end_tag) {
            var r = !1;
            r = (r = n.start_tag_token && n.start_tag_token.multiline_content) || !n.is_inline_element && !(i.is_inline_element || i.is_unformatted) && !(_.type === J.TAG_CLOSE && n.start_tag_token === i) && "TK_CONTENT" !== _.type,
            (n.is_content_unformatted || n.is_unformatted) && (r = !1),
            r && t.print_newline(!1)
        } else
            n.indent_content = !n.custom_beautifier_name,
            "<" === n.tag_start_char && ("html" === n.tag_name ? n.indent_content = this._options.indent_inner_html : "head" === n.tag_name ? n.indent_content = this._options.indent_head_inner_html : "body" === n.tag_name && (n.indent_content = this._options.indent_body_inner_html)),
            n.is_inline_element || n.is_unformatted || "TK_CONTENT" === _.type && !n.is_content_unformatted || t.print_newline(!1),
            this._calcluate_parent_multiline(t, n)
    }
    ,
    st.prototype._calcluate_parent_multiline = function(t, e) {
        !e.parent || !t._output.just_added_newline() || (e.is_inline_element || e.is_unformatted) && e.parent.is_inline_element || (e.parent.multiline_content = !0)
    }
    ;
    var at = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "menu", "nav", "ol", "p", "pre", "section", "table", "ul"]
      , pt = ["a", "audio", "del", "ins", "map", "noscript", "video"];
    st.prototype._do_optional_end_element = function(t) {
        var e = null;
        if (!t.is_empty_element && t.is_start_tag && t.parent) {
            if ("body" === t.tag_name)
                e = e || this._tag_stack.try_pop("head");
            else if ("li" === t.tag_name)
                e = e || this._tag_stack.try_pop("li", ["ol", "ul", "menu"]);
            else if ("dd" === t.tag_name || "dt" === t.tag_name)
                e = (e = e || this._tag_stack.try_pop("dt", ["dl"])) || this._tag_stack.try_pop("dd", ["dl"]);
            else if ("p" === t.parent.tag_name && -1 !== at.indexOf(t.tag_name)) {
                var n = t.parent.parent;
                n && -1 !== pt.indexOf(n.tag_name) || (e = e || this._tag_stack.try_pop("p"))
            } else
                "rp" === t.tag_name || "rt" === t.tag_name ? e = (e = e || this._tag_stack.try_pop("rt", ["ruby", "rtc"])) || this._tag_stack.try_pop("rp", ["ruby", "rtc"]) : "optgroup" === t.tag_name ? e = e || this._tag_stack.try_pop("optgroup", ["select"]) : "option" === t.tag_name ? e = e || this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]) : "colgroup" === t.tag_name ? e = e || this._tag_stack.try_pop("caption", ["table"]) : "thead" === t.tag_name ? e = (e = e || this._tag_stack.try_pop("caption", ["table"])) || this._tag_stack.try_pop("colgroup", ["table"]) : "tbody" === t.tag_name || "tfoot" === t.tag_name ? e = (e = (e = (e = e || this._tag_stack.try_pop("caption", ["table"])) || this._tag_stack.try_pop("colgroup", ["table"])) || this._tag_stack.try_pop("thead", ["table"])) || this._tag_stack.try_pop("tbody", ["table"]) : "tr" === t.tag_name ? e = (e = (e = e || this._tag_stack.try_pop("caption", ["table"])) || this._tag_stack.try_pop("colgroup", ["table"])) || this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"]) : "th" !== t.tag_name && "td" !== t.tag_name || (e = (e = e || this._tag_stack.try_pop("td", ["table", "thead", "tbody", "tfoot", "tr"])) || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]));
            return t.parent = this._tag_stack.get_parser_token(),
            e
        }
    }
    ,
    r.Beautifier = st;
    var ht = r.Beautifier
      , ct = s.Options;
    _.exports = function(t, e, n, i) {
        return new ht(t,e,n,i).beautify()
    }
    ,
    _.exports.defaultOptions = function() {
        return new ct
    }
    ;
    var lt, ut = (lt = _.exports) && lt.__esModule && Object.prototype.hasOwnProperty.call(lt, "default") ? lt.default : lt;
    const dt = t=>e=>typeof e === t
      , gt = ("string",
    t=>"string" === (t=>{
        const e = typeof t;
        return null === t ? "null" : "object" === e && Array.isArray(t) ? "array" : "object" === e && (n = i = t,
        (_ = String).prototype.isPrototypeOf(n) || (null === (r = i.constructor) || void 0 === r ? void 0 : r.name) === _.name) ? "string" : e;
        var n, i, _, r
    }
    )(t));
    const mt = dt("boolean")
      , ft = dt("function")
      , yt = dt("number");
    class wt {
        constructor(t, e) {
            this.tag = t,
            this.value = e
        }
        static some(t) {
            return new wt(!0,t)
        }
        static none() {
            return wt.singletonNone
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
            return this.tag ? wt.some(t(this.value)) : wt.none()
        }
        bind(t) {
            return this.tag ? t(this.value) : wt.none()
        }
        exists(t) {
            return this.tag && t(this.value)
        }
        forall(t) {
            return !this.tag || t(this.value)
        }
        filter(t) {
            return !this.tag || t(this.value) ? this : wt.none()
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
            return null == t ? wt.none() : wt.some(t)
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
    wt.singletonNone = new wt(!1);
    let vt = 0;
    const bt = t=>{
        const e = (new Date).getTime()
          , n = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 * 1e9);
        return vt++,
        t + "_" + n + vt + String(e)
    }
      , xt = t=>e=>e.options.get(t)
      , kt = xt("codemirror_script")
      , Tt = xt("codemirror_linewrapping")
      , Ot = xt("codemirror_linenumbers")
      , Et = xt("codemirror_foldgutter")
      , At = xt("codemirror_gutter")
      , Ct = xt("advcode_headless")
      , Nt = xt("advcode_inline")
      , St = xt("advcode_prettify_editor")
      , zt = xt("advcode_prettify_getcontent")
      , Lt = (t,e,n)=>({
        customEditorScriptUrl: e + "/customeditor.min.js",
        codeMirrorScriptUrl: kt(t),
        lineWrapping: Tt(t),
        lineNumbers: Ot(t),
        foldGutter: Et(t),
        gutter: At(t),
        editorId: t.id,
        advcodeInstanceId: bt("advcode_instance"),
        currentAdvStatus: n
    })
      , jt = ()=>{}
      , Rt = ()=>!1
      , It = t=>{
        if (null == t)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: t
        }
    }
      , Ut = (t,e)=>{
        const n = (e || document).createElement("div");
        if (n.innerHTML = t,
        !n.hasChildNodes() || n.childNodes.length > 1) {
            const e = "HTML does not have a single root node";
            throw console.error(e, t),
            new Error(e)
        }
        return It(n.childNodes[0])
    }
      , Ft = (t,e)=>{
        const n = (e || document).createElement(t);
        return It(n)
    }
      , Pt = It;
    "undefined" != typeof window ? window : Function("return this;")();
    const Wt = (t,e,n)=>{
        let i = t.dom;
        const _ = ft(n) ? n : Rt;
        for (; i.parentNode; ) {
            i = i.parentNode;
            const t = Pt(i);
            if (e(t))
                return wt.some(t);
            if (_(t))
                break
        }
        return wt.none()
    }
      , Mt = Object.hasOwnProperty
      , Kt = (t,e)=>Mt.call(t, e)
      , Gt = t=>{
        const e = t.dom;
        null !== e.parentNode && e.parentNode.removeChild(e)
    }
      , Vt = "\x3c!--mce_cursor--\x3e"
      , Bt = (t,e)=>{
        const n = t.dom
          , i = t.selection
          , _ = i.getBookmark()
          , r = (t=>Kt(t, "name"))(_) ? n.select(_.name)[_.index] : n.select(`#${_.id}_start`)[0]
          , s = wt.from(r).map((e=>{
            const n = Pt(t.getBody());
            return ((t,e)=>{
                const i = Ut(Vt)
                  , _ = Pt(t)
                  , r = ((t,e,n)=>((t,e,n,i,_)=>i(n) ? wt.some(n) : ft(_) && _(n) ? wt.none() : e(n, i, _))(0, Wt, t, e, n))(_, (t=>((t,e)=>{
                    const n = t.dom;
                    return !(!n || !n.hasAttribute) && n.hasAttribute("data-mce-bogus")
                }
                )(t)), (t=>{
                    return e = n,
                    t.dom === e.dom;
                    var e
                }
                )).getOr(_);
                return ((t,e)=>{
                    const n = (t=>wt.from(t.dom.parentNode).map(Pt))(t);
                    n.each((n=>{
                        n.dom.insertBefore(e.dom, t.dom)
                    }
                    ))
                }
                )(r, i),
                i
            }
            )(e)
        }
        ))
          , o = e();
        return s.each(Gt),
        i.moveToBookmark(_),
        o
    }
      , Dt = t=>{
        const e = (t=>{
            const e = t.indexOf(Vt);
            return -1 === e ? 0 : e
        }
        )(Bt(t, (()=>t.getContent({
            source_view: !0
        }))))
          , n = St(t);
        return {
            content: t.getContent({
                source_view: !0,
                prettify: n
            }),
            cursor: e
        }
    }
      , qt = t=>{
        let e = t;
        return {
            get: ()=>e,
            set: t=>{
                e = t
            }
        }
    }
      , Xt = ()=>{
        const t = (t=>{
            const e = qt(wt.none())
              , n = ()=>e.get().each(t);
            return {
                clear: ()=>{
                    n(),
                    e.set(wt.none())
                }
                ,
                isSet: ()=>e.get().isSome(),
                get: ()=>e.get(),
                set: t=>{
                    n(),
                    e.set(wt.some(t))
                }
            }
        }
        )(jt);
        return {
            ...t,
            on: e=>t.get().each(e)
        }
    }
      , $t = (t,e)=>{
        t.focus(),
        t.undoManager.transact((()=>{
            t.setContent(e)
        }
        )),
        t.selection.setCursorLocation(),
        t.nodeChanged()
    }
      , Qt = t=>{
        return (e = tinymce,
        "get",
        Kt(e, "get") ? wt.from(e.get) : wt.none()).bind((e=>wt.from(e.call(tinymce, t))));
        var e
    }
      , Ht = (t,e)=>Qt(t).bind((t=>wt.from(t.plugins.advcode))).map((t=>(t[e] || (t[e] = Xt()),
    t[e])))
      , Yt = (t,e)=>{
        Qt(t).bind((t=>wt.from(t.plugins.advcode))).each((t=>{
            t[e] && delete t[e]
        }
        ))
    }
      , Zt = t=>({
        name: "codeview",
        type: "customeditor",
        tag: "div",
        onFocus: t=>{
            ((t,e)=>{
                const n = t=>{
                    for (let e = 0; e < t.childNodes.length; e++) {
                        const i = Pt(t.childNodes[e]);
                        if (i.dom.shadowRoot)
                            return wt.some(i);
                        const _ = n(t.childNodes[e]);
                        if (_.isSome())
                            return _
                    }
                    return wt.none()
                }
                ;
                return n(t.dom)
            }
            )(Pt(t)).each((t=>{
                var e;
                null === (e = t.dom.shadowRoot.querySelector(".cm-content")) || void 0 === e || e.focus()
            }
            ))
        }
        ,
        scriptId: "tinymce.plugins.advcode.customeditor",
        scriptUrl: t.customEditorScriptUrl,
        settings: t
    })
      , Jt = (t,e)=>{
        const n = {
            dark: !1,
            fullscreen: !1,
            fontSize: wt.none()
        };
        t.addCommand("mceCodeEditor", (()=>{
            Nt(t) && !t.inline ? "code" === t.mode.get() ? t.mode.set("design") : t.mode.set("code") : (()=>{
                const i = Lt(t, e, n);
                ((t,e)=>{
                    const n = Dt(t)
                      , i = {
                        ...e,
                        cursor: n.cursor
                    }
                      , _ = e.currentAdvStatus
                      , r = Ht(e.editorId, e.advcodeInstanceId);
                    var s;
                    t.windowManager.open((s = n.content,
                    {
                        title: "Source Code",
                        size: "large",
                        body: {
                            type: "panel",
                            items: [Zt(i)]
                        },
                        buttons: (()=>{
                            let t = [{
                                type: "togglebutton",
                                name: "format_code",
                                icon: "format-code",
                                text: "Format code",
                                align: "start"
                            }, {
                                type: "togglebutton",
                                name: "dark_theme_toggle",
                                text: "Dark/light mode",
                                active: _.dark,
                                align: "start"
                            }, {
                                type: "custom",
                                name: "increase_font_size",
                                text: "Increase font size",
                                icon: "text-size-increase",
                                align: "start"
                            }, {
                                type: "custom",
                                name: "decrease_font_size",
                                text: "Decrease font size",
                                icon: "text-size-decrease",
                                align: "start"
                            }, {
                                type: "cancel",
                                name: "cancel",
                                text: "Cancel",
                                align: "end"
                            }, {
                                type: "submit",
                                name: "save",
                                text: "Save",
                                primary: !0,
                                align: "end"
                            }];
                            return window.isSecureContext ? t = [{
                                type: "togglebutton",
                                name: "copy_code",
                                icon: "copy",
                                text: "Copy code",
                                align: "start"
                            }].concat(t) : console.warn("Copy code is not allowed since window.isSecureContext is false"),
                            t
                        }
                        )(),
                        initialData: {
                            codeview: s
                        },
                        onSubmit: n=>{
                            $t(t, n.getData().codeview),
                            Yt(e.editorId, e.advcodeInstanceId),
                            n.close()
                        }
                        ,
                        onClose: ()=>{
                            Yt(e.editorId, e.advcodeInstanceId)
                        }
                        ,
                        onAction: (t,e)=>{
                            "copy_code" === e.name && r.each((e=>e.get().each((e=>{
                                (async()=>{
                                    const n = setTimeout((()=>{
                                        t.block("copying")
                                    }
                                    ), 150);
                                    await e.copyCode(),
                                    clearTimeout(n),
                                    t.unblock()
                                }
                                )()
                            }
                            )))),
                            "format_code" === e.name && r.each((t=>t.get().each((t=>{
                                t.formatCode()
                            }
                            )))),
                            "increase_font_size" === e.name && r.each((t=>t.get().each((t=>{
                                _.fontSize = t.changeFontSize("increase")
                            }
                            )))),
                            "decrease_font_size" === e.name && r.each((t=>t.get().each((t=>{
                                _.fontSize = t.changeFontSize("decrease")
                            }
                            )))),
                            "dark_theme_toggle" === e.name && r.each((t=>t.get().each((t=>{
                                t.setDarkMode(!_.dark),
                                _.dark = !_.dark
                            }
                            ))))
                        }
                    }))
                }
                )(t, i)
            }
            )()
        }
        ))
    }
      , te = (t,e)=>((t,e,n)=>{
        const i = ((t,e)=>{
            const n = ((t,e)=>{
                const n = t.dom.getAttribute(e);
                return null === n ? void 0 : n
            }
            )(t, e);
            return void 0 === n || "" === n ? [] : n.split(" ")
        }
        )(t, e);
        return ((t,e,n)=>{
            ((t,e,n)=>{
                if (!(gt(n) || mt(n) || yt(n)))
                    throw console.error("Invalid call to Attribute.set. Key ", e, ":: Value ", n, ":: Element ", t),
                    new Error("Attribute value was not simple");
                t.setAttribute(e, n + "")
            }
            )(t.dom, e, n)
        }
        )(t, e, i.concat([n]).join(" ")),
        !0
    }
    )(t, "class", e)
      , ee = t=>t.plugins.fullscreen && t.plugins.fullscreen.isFullscreen()
      , ne = (t,e,n)=>{
        const i = qt({
            dark: !1,
            fullscreen: !1,
            fontSize: wt.none()
        })
          , _ = qt(ee(t))
          , r = Xt()
          , s = qt(wt.none())
          , o = {
            dark: !1,
            fullscreen: !1,
            fontSize: wt.none()
        }
          , a = ()=>s.get().bind((e=>Ht(t.id, e)))
          , p = ()=>{
            r.get().each((({destroy: e})=>{
                e(),
                i.get().fullscreen !== _.get() && t.execCommand("mceFullScreen")
            }
            )),
            r.clear()
        }
        ;
        t.ui.registry.addView("code", {
            buttons: 1 === n ? [{
                type: "group",
                buttons: [...t.hasPlugin("fullscreen") ? [{
                    type: "togglebutton",
                    icon: "fullscreen",
                    tooltip: "Fullsceen",
                    onAction: e=>{
                        t.execCommand("mceFullScreen", void 0, void 0, {
                            skip_focus: !0
                        });
                        const n = !e.isActive();
                        i.set({
                            ...i.get(),
                            fullscreen: n
                        }),
                        e.setActive(n)
                    }
                }] : [], {
                    type: "togglebutton",
                    icon: "copy",
                    text: "Copy code",
                    onAction: t=>a().each((t=>t.get().each((t=>{
                        (async()=>{
                            await t.copyCode()
                        }
                        )()
                    }
                    ))))
                }, {
                    type: "togglebutton",
                    icon: "format-code",
                    text: "Format code",
                    onAction: ()=>a().each((t=>t.get().each((t=>{
                        t.formatCode()
                    }
                    ))))
                }]
            }, {
                type: "group",
                buttons: [{
                    type: "togglebutton",
                    text: "Dark/light mode",
                    onAction: t=>{
                        a().each((e=>e.get().each((e=>{
                            i.set({
                                ...i.get(),
                                dark: !t.isActive()
                            }),
                            t.setActive(i.get().dark),
                            e.setDarkMode(i.get().dark)
                        }
                        ))))
                    }
                }, {
                    type: "togglebutton",
                    icon: "text-size-increase",
                    tooltip: "Increase font size",
                    onAction: t=>a().each((t=>t.get().each((t=>i.set({
                        ...i.get(),
                        fontSize: t.changeFontSize("increase")
                    })))))
                }, {
                    type: "togglebutton",
                    icon: "text-size-decrease",
                    tooltip: "Decrease font size",
                    onAction: t=>a().each((t=>t.get().each((t=>i.set({
                        ...i.get(),
                        fontSize: t.changeFontSize("decrease")
                    })))))
                }]
            }, {
                type: "group",
                buttons: [{
                    type: "button",
                    text: "Cancel",
                    onAction: ()=>{
                        r.get().each((()=>{
                            p(),
                            t.mode.set("design")
                        }
                        ))
                    }
                }, {
                    type: "button",
                    text: "Save code",
                    buttonType: "primary",
                    onAction: ()=>{
                        r.get().each((({syncWithEditor: e})=>{
                            e(),
                            p(),
                            t.mode.set("design")
                        }
                        ))
                    }
                }]
            }] : [],
            onShow: a=>{
                const p = a.getContainer()
                  , h = Lt(t, e, o);
                s.set(wt.some(h.advcodeInstanceId)),
                _.set(ee(t)),
                t.setProgressState(!0),
                i.get().fullscreen !== ee(t) && t.execCommand("mceFullScreen"),
                (async t=>{
                    var e;
                    return (await (e = t,
                    tinymce.Resource.load("tinymce.plugins.advcode.CodeMirror", e)))()
                }
                )(kt(t)).then((e=>{
                    t.setProgressState(!1),
                    r.set(((t,e,n,i,_,r)=>{
                        const s = Dt(n)
                          , o = {
                            ..._,
                            cursor: s.cursor
                        }
                          , a = Ft("div");
                        var p;
                        p = a,
                        ((t,e)=>{
                            for (let n = 0, i = t.length; n < i; n++)
                                e(t[n])
                        }
                        )(0 === e ? ["tox-inline-headless-codemirror", "mce-codemirror"] : ["tox-custom-editor", "tox-inline-codemirror", "mce-codemirror"], (t=>{
                            ((t,e)=>{
                                (t=>void 0 !== t.dom.classList)(t) ? t.dom.classList.add(e) : te(t, e)
                            }
                            )(p, t)
                        }
                        )),
                        ((t,e)=>{
                            t.dom.appendChild(e.dom)
                        }
                        )(Pt(t), a);
                        const {getValue: h, destroy: c, copyCode: l, formatCode: u, changeFontSize: d, setDarkMode: g, setFontSize: m, focus: f} = i(a.dom, o, s.content, r)
                          , y = f;
                        t.addEventListener("focus", y),
                        Ht(_.editorId, _.advcodeInstanceId).each((t=>t.set({
                            copyCode: l,
                            formatCode: u,
                            changeFontSize: d,
                            setDarkMode: g,
                            setFontSize: m
                        }))),
                        m(r.fontSize);
                        const w = ()=>$t(n, h());
                        return 0 === e && n.on("BeforeGetContent", w),
                        {
                            syncWithEditor: w,
                            destroy: ()=>{
                                0 === e && (n.off("BeforeGetContent", w),
                                w()),
                                Gt(a),
                                t.removeEventListener("focus", y),
                                c()
                            }
                        }
                    }
                    )(p, n, t, e, h, i.get()))
                }
                ))
            }
            ,
            onHide: p
        })
    }
    ;
    tinymce.PluginManager.requireLangPack("advcode", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("advcode", ((t,n)=>{
        ((t,n)=>!!t && -1 === ((t,n)=>{
            const i = e(t.major, n.major);
            if (0 !== i)
                return i;
            const _ = e(t.minor, n.minor);
            if (0 !== _)
                return _;
            const r = e(t.patch, n.patch);
            return 0 !== r ? r : 0
        }
        )((t=>i((t=>[t.majorVersion, t.minorVersion].join(".").split(".").slice(0, 3).join("."))(t)))(t), i(n)))(tinymce, "6.8.0") ? console.error("The advcode plugin requires at least version 6.8.0 of TinyMCE.") : (((t,e)=>{
            ((t,e)=>{
                const n = t.options.register;
                n("codemirror_script", {
                    processor: "string",
                    default: e + "/codemirror.min.js"
                }),
                n("codemirror_linewrapping", {
                    processor: "boolean",
                    default: !0
                }),
                n("codemirror_linenumbers", {
                    processor: "boolean",
                    default: !0
                }),
                n("codemirror_foldgutter", {
                    processor: "boolean",
                    default: !0
                }),
                n("codemirror_gutter", {
                    processor: "boolean",
                    default: !0
                }),
                n("advcode_headless", {
                    processor: "boolean",
                    default: !1
                }),
                n("advcode_inline", {
                    processor: "boolean",
                    default: !1
                }),
                n("advcode_prettify_editor", {
                    processor: "boolean",
                    default: !0
                }),
                n("advcode_prettify_getcontent", {
                    processor: "boolean",
                    default: !1
                })
            }
            )(t, e),
            Jt(t, e),
            (t=>{
                const e = "sourcecode"
                  , n = ()=>t.execCommand("mceCodeEditor");
                t.ui.registry.addButton("code", {
                    icon: e,
                    tooltip: "Source code",
                    onAction: n
                }),
                t.ui.registry.addMenuItem("code", {
                    icon: e,
                    text: "Source code",
                    onAction: n
                })
            }
            )(t),
            ((t,e)=>{
                ne(t, e, Ct(t) ? 0 : 1)
            }
            )(t, e),
            (t=>{
                t.mode.register("code", {
                    activate: ()=>{
                        "code" !== t.queryCommandValue("ToggleView") && t.execCommand("ToggleView", !1, "code")
                    }
                    ,
                    deactivate: ()=>{
                        "code" === t.queryCommandValue("ToggleView") && t.execCommand("ToggleView", !1, "code")
                    }
                    ,
                    editorReadOnly: !1
                })
            }
            )(t)
        }
        )(t, n),
        t.on("getContent", (e=>{
            if (!1 === e.prettify)
                return;
            const n = !0 === e.prettify
              , i = zt(t);
            var _;
            (n || i) && (e.content = (_ = e.content,
            ut(_)))
        }
        )))
    }
    ))
}();
