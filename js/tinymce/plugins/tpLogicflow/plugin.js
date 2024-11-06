/*!
*  @plugin @tinymce-plugin/tp-logicflow
*  @version 0.0.3-beta.6 (2022-7-29)
*  @description logicflow
*  @copyright (2022) Li Hailong . All rights reserved. https://github.com/tinymce-plugin/tp-logicflow
*/
(function () {
  "use strict";
    var temp = "";
  var l = window.__tp$dev__
    , s = function (n,t) {
      var t = n.dom.getParent(n.selection.getNode(), "[data-tp-logicflow]");
      if (t)
        try {
        var obj = document.createElement("object")
          obj.setAttribute("data",i.url)
          obj.setAttribute("style",i.style)
          obj.appendChild(t)
          var content = `<object data="${i.url}"  style="${i.style}">${t.innerHTML}</object>`
          window.tpLogicflow.tp_initData = obj
        } catch {
          window.tpLogicflow.tp_initData = ""
        }
      else
        window.tpLogicflow.tp_initData = ""
    }
    , c = function (n, t) {
      s(n,t),
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
                  console.log("saveGraphSVGData", i)
                  temp = '<span data-tp-logicflow data-tp-logicflow contenteditable="false" data-tp-no-img><object data="' + i.url + '"  style="' + i.style + '"/></span>'
                  n.insertContent('<div data-tp-logicflow data-tp-logicflow contenteditable="false" data-tp-no-img style="' + i.style + '; display: flex;margin-left: auto;margin-right: auto;">' + i.svg.toString() + '</div>'),
                    e.close()
                });
                break
              case "close":
                e.close()
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
          // text: t.title,
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
        // n.ui.registry.addContextToolbar(t.registryName, {
        //   predicate: i,
        //   items: a,
        //   scope: "node",
        //   position: "node"
        // })
      }
    }
    , f = function (n, t) {
      n.addCommand("mce".concat(t.registryName.substring(0, 1).toUpperCase() + t.registryName.substring(1)), function () {
        console.log("mce".concat(t.registryName),n,t)
        n.undoManager.transact(function () {
          // n.focus(),
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
      name: "流程图",
      registryName: "tpLogicflow",
      title: "流程图",
      repo: "",
      icon: '<svg t="1725605376467" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3767" width="23" height="23"><path d="M914 652.13h-47.35V504.26c0-20.81-16.87-37.68-37.68-37.68H557.41v-94.72h62.82c20.81 0 37.68-16.87 37.68-37.68V148.65c0-20.81-16.87-37.68-37.68-37.68H434.69c-20.81 0-37.68 16.87-37.68 37.68v185.54c0 20.81 16.87 37.68 37.68 37.68h47.37v94.72H210.5c-20.81 0-37.68 16.87-37.68 37.68v147.87H110c-20.81 0-37.68 16.87-37.68 37.68v185.54c0 20.81 16.87 37.68 37.68 37.68h185.54c20.81 0 37.68-16.87 37.68-37.68V689.81c0-20.81-16.87-37.68-37.68-37.68h-47.37V541.94h233.89v110.19h-62.82c-20.81 0-37.68 16.87-37.68 37.68v185.54c0 20.81 16.87 37.68 37.68 37.68h185.54c20.81 0 37.68-16.87 37.68-37.68V689.81c0-20.81-16.87-37.68-37.68-37.68h-47.37V541.94H791.3v110.19h-62.84c-20.81 0-37.68 16.87-37.68 37.68v185.54c0 20.81 16.87 37.68 37.68 37.68H914c20.81 0 37.68-16.87 37.68-37.68V689.81c0-20.81-16.87-37.68-37.68-37.68zM472.37 186.32h110.19v110.19H472.37V186.32z m-214.5 651.36h-110.2v-110.2h110.19v110.2z m309.24 0h-110.2v-110.2H567.1v110.2z m309.22 0h-110.2v-110.2h110.19v110.2z" fill="#1196db" p-id="3768"></path></svg>'
    };
  m(r);
  var w = {
    opt: r
  };
  return w
}
)();
