/*!
*  @plugin @tinymce-plugin/tp-logicflow
*  @version 0.0.3-beta.6 (2022-7-29)
*  @description logicflow
*  @copyright (2022) Li Hailong . All rights reserved. https://github.com/tinymce-plugin/tp-logicflow
*/
(function () {
  "use strict";
  var l = window.__tp$dev__
    , s = function (n) {
      var t = n.dom.getParent(n.selection.getNode(), "[data-tp-logicflow]");
      if (t)
        try {
          window.tpLogicflow.tp_initData = t.firstChild || ""
        } catch {
          window.tpLogicflow.tp_initData = ""
        }
      else
        window.tpLogicflow.tp_initData = ""
    }
    , c = function (n, t) {
      s(n),
        n.windowManager.openUrl({
          title: t.name,
          size: "large",
          url: l ? "/logicflow/index.html" : n.editorManager.PluginManager.urls[t.registryName] + "/logicflow/index.html",
          buttons: [{
            type: "cancel",
            text: "Close"
          }, {
            type: "custom",
            text: "Save",
            name: "save",
            primary: !0
          }],
          onAction: function (e, a) {
            switch (a.name) {
              case "save":
                window.tpLogicflow.saveGraphSVGData().then(function (i) {
                  n.insertContent('<span data-tp-logicflow data-tp-logicflow contenteditable="false" data-tp-no-img><object data="' + i.url + '"  style="' + i.style + '"/></span>'),
                    e.close()
                });
                break
            }
          }
        })
    }
    , g = function (n, t) {
      return function (e) {
        return n.selection.selectorChangedWithUnbind(t.join(","), function (a, i) {
          e.setActive(a)
        }).unbind
      }
    }
    , u = function (n, t) {
      n.on("init", function () {
        n.dom.addStyle(`
     [data-tp-logicflow] >object{
      pointer-events: none;
     }
     [data-tp-logicflow]{
        display: inline-block;
        cursor: default;
     }
     [data-tp-logicflow][data-mce-selected]{
        outline: none;
        box-shadow: 0 0 0 1px #b4d7ff;
        position: relative;
        z-index:999;
        border-color: #B4D7FF;
        border-style: solid;
     }
  `)
      }),
        n.ui.registry.getAll().icons[t.registryName] || n.ui.registry.addIcon(t.registryName, t.icon),
        window.tpLogicflow = {
          translateI18n: n.editorManager.i18n.translate
        },
        n.ui.registry.addToggleButton(t.registryName, {
          icon: t.registryName,
          tooltip: t.title,
          onSetup: g(n, ["*[data-tp-logicflow]"]),
          onAction: function () {
            return c(n, t)
          }
        });
      var e = function (o) {
        return function () {
          return n.execCommand(o)
        }
      };
      n.ui.registry.addMenuItem(t.registryName, {
        icon: t.registryName,
        text: t.title,
        onAction: function () {
          return c(n, t)
        }
      }),
        n.ui.registry.addButton("tpLogicflowDelete", {
          tooltip: "Delete",
          onAction: e("mceTpLogicflowDelete"),
          icon: "table-delete-table"
        }),
        n.ui.registry.addButton("tpLogicflowProps", {
          tooltip: t.title,
          onAction: e("mceTpLogicflow"),
          icon: t.registryName
        }),
        n.addCommand("mceTpLogicflowDelete", function () {
          try {
            n.dom.getParent(n.selection.getNode(), "[data-tp-logicflow]").remove(),
              n.focus()
          } catch { }
        });
      var a = "tpLogicflowProps | tpLogicflowDelete";
      if (a.length > 0) {
        var i = function (o) {
          return n.dom.is(o, "[data-tp-logicflow]") && n.getBody().contains(o)
        };
        n.ui.registry.addContextToolbar(t.registryName, {
          predicate: i,
          items: a,
          scope: "node",
          position: "node"
        })
      }
    }
    , f = function (n, t) {
      n.addCommand("mce".concat(t.registryName.substring(0, 1).toUpperCase() + t.registryName.substring(1)), function () {
        n.undoManager.transact(function () {
          n.focus(),
            c(n, t)
        })
      })
    }
    , d = function (n, t) {
      var e = window.__tp$dev__;
      console.log("load language", n, t)
      // tinymce.util.URI({
      //   url: e ? "/langs/" + (n.settings.language || "en") + ".json" : n.editorManager.PluginManager.urls[t.registryName] + "/langs/" + (n.settings.language || "en") + ".json",
      //   async: !1,
      //   dataType: "json",
      //   success: function(a) {
      //     try {
      //       n.tp$.I18n.add(n.settings.language, JSON.parse(a))
      //     } catch {}
      //   }
      // })
    }
    , m = function (n) {
      tinymce.PluginManager.add(n.registryName, function (t, e) {
        return d(t, n),
          u(t, n),
          f(t, n),
        {
          getMetadata: function () {
            return {
              name: n.name,
              url: n.repo
            }
          }
        }
      })
    }
    , r = {
      name: "Logic flow",
      registryName: "tpLogicflow",
      title: "Logic Flow",
      repo: "https://github.com/Five-great/tinymce-plugin/tp-logicflow",
      icon: '<svg t="1657623416055" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1763" width="24" height="24"><path d="M568.778656 638.44176H925.328211c19.691481 0 35.655058-15.648398 35.655058-34.952046V463.681528c0-19.303648-15.963577-34.952047-35.655058-34.952047H568.778656c-19.691481 0-35.655058 15.648398-35.655058 34.952047v20.009729H390.236284l-101.217263-99.221815a35.839253 35.839253 0 0 0 1.026376-8.510838v-97.240695a111.448278 111.448278 0 0 0 76.550467-105.84056c0-61.550845-49.89641-111.447255-111.447255-111.447255-61.550845 0-111.447255 49.89641-111.447255 111.447255 0 48.523133 31.014364 89.796142 74.29817 105.096617v95.467305L79.949378 508.769422c-6.749728 6.562463-10.546194 15.495926-10.546193 24.816199 0 9.31925 3.796466 18.252713 10.546193 24.816199l138.050146 135.328151v149.070131c0 19.832697 16.128329 35.910884 36.023448 35.910884h279.100626v39.346123c0 19.303648 15.963577 34.952047 35.655058 34.952047H925.328211c19.691481 0 35.655058-15.648398 35.655058-34.952047V778.249947c0-19.303648-15.963577-34.952047-35.655058-34.952047H568.778656c-19.691481 0-35.655058 15.648398-35.655058 34.952047v28.640293H290.046421V681.694867l125.772518-123.293047a35.365462 35.365462 0 0 0 2.647293-2.887771h114.657366v47.975665c0 19.303648 15.963577 34.952047 35.655058 34.952046z m320.894498 174.760233v69.904093H604.433714v-15.672958c6.085602-6.430456 9.82374-15.093766 9.823739-24.632003s-3.738138-18.201547-9.823739-24.632004v-4.966105h285.23944zM247.884159 624.11138L155.537937 533.585621l92.346222-90.52576 92.346221 90.52576-92.346221 90.525759z m641.788995-55.573713H604.433714v-24.302498c6.085602-6.430456 9.82374-15.093766 9.823739-24.632004a35.667338 35.667338 0 0 0-6.78759-20.969591h282.203291v69.904093z" p-id="1764"></path></svg>'
    };
  m(r);
  var w = {
    opt: r
  };
  return w
}
)();