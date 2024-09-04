// 创建一个简单的插件
const TestPlugin = (ed, url) => {
    ed.on('click', (e) => {
        // ed.windowManager.alert('Hello World!');
    });
};

// 使用添加方法注册插件
tinymce.PluginManager.add('test', TestPlugin);
tinymce.ScriptLoader.load('somescript.js');
tinymce.init({
    selector: '#editor',
    plugins: 'test preview powerpaste casechange import_word importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link math media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate markdown revisionhistory kityformula-editor mathjax indent2em',
    toolbar: 'undo redo | revisionhistory tableofcontents permanentpen | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | link image | table math kityformula-editor media pageembed | lineheight indent2em outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save print import_word | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck', // Note: if a toolbar item requires a plugin, the item will not present in the toolbar if the plugin is not also loaded.
    language: 'zh_CN',
    skin: 'fabric',
    content_css: 'fabric',
    font_family_formats: '微软雅黑=Microsoft YaHei;等线=DengXian;宋体=SimSun;仿宋=FangSong;黑体=SimHei;楷体=KaiTi;隶书=LiSu;幼圆=YouYuan;Andale Mono=andale mono; Arial=arial;Arial Black=arial black;Book Antiqua=antiqua;Comic Sans MS=comic sans ms;Courier New=courier new;Georgia=georgia;Helvetica=helvetica;Impact=impact;Symbol=symbol;Tahoma=tahoma;Terminal=terminal;Times New Roman=times new roman;Trebuchet MS=trebuchet ms;Verdana=verdana;Webdings=webdings;Wingdings=wingdings',
    height: window.innerHeight - 20,
    mathjax: { lib: './mathjax-3.2.2/package/es5/tex-mml-chtml.js' },
    toolbar_mode: 'sliding',
    tinycomments_mode: 'embedded',
    revisionhistory_display_author: true,
    branding: false,
    draggable_modal: true, // 拖动式对话框
    statusbar: true, // 状态栏
    // highlight_on_focus: true, // 聚焦时高亮
    // link_context_toolbar: true, // 链接工具栏
    // toolbar_location: 'bottom', //默认位于内容区域上方。
    relative_urls: false,      // 禁止使用相对路径
    remove_script_host: false, // 保留主机名和协议
    toolbar_sticky: true, // 粘性工具栏
    toolbar_persist: true, // 持久工具栏
    help_accessibility: false, // 帮助访问性
    // object_resizing: false, // 禁用内容编辑器中的对象调整大小。
    // save_enablewhendirty: false, //允许您禁用保存按钮，直到对编辑器的内容进行修改。
    // placeholder: '在这里输入文字',
    advtemplate_templates,
    revisionhistory_fetch,
    revisionhistory_fetch_revision,
    revisionhistory_author: {
        id: 'john.doe',
        name: 'John Doe'
    },
    setup: (editor) => {
        editor.on('init', () => {
            console.log('init')
            fetch(baseUrl + '/api/notToken')  // 异步获取内容
                .then(response => response.text())
                .then(data => {
                    let content = JSON.parse(data)
                    editor.setContent(content.data); // 动态设置内容
                });
            // editor.insertContent('<h1>Hello World!</h1>')
        })
        editor.on('SetContent', (e) => {
            console.log('setcontent')
            // 将所有图片内容提添加最大宽度为800px
            editor.dom.setStyles(editor.dom.select('img'), { 'max-width': '626px', 'height': 'auto' })
            // 给所有p标签添加首行缩进
            editor.dom.setStyles(editor.dom.select('p'), { 'text-indent': '2em' })
        })
        // editor.on('change', () => {
        //     tinymce.activeEditor.notificationManager.open({
        //         text: '正在保存...',
        //         type: 'info',
        //         timeout: 2000
        //     });
        // })
        // 添加自定义按钮
        editor.ui.registry.addButton('revisionhistoryCustomButton', {
            tooltip: 'Revision history',
            icon: 'revision-history',
            onAction: function () {
                tinymce.activeEditor.execCommand('revisionHistory');
                // 获取编辑器的容器元素
                let btn = document.querySelector('.tox-revisionhistory__container .tox-view__toolbar .tox-button--secondary');
                console.log(btn)
                var editorContainer = editor.getContainer();
                // 设置编辑器容器的样式
                editorContainer.style.backgroundColor = '#f0f0f0';  // 设置背景色
                editorContainer.style.border = '2px solid #ff5733';  // 设置边框
                console.log(editorContainer)
            }
        });
    },
    save_onsavecallback: (editor) => {
        console.log('Saved');
        // tinymce.activeEditor.windowManager.alert('保存成功！');
        tinymce.activeEditor.notificationManager.open({
            text: '正在保存...',
            type: 'info',
        });
        $.ajax({
            url: '/api/save',
            type: 'post',
            data: {
                content: editor.getContent({ format: 'raw' })
            },
            success: (res) => {
                console.log(res)
                tinymce.activeEditor.notificationManager.open({
                    text: '保存成功！',
                    type: 'success',
                    timeout: 2000
                })
                setTimeout(() => {
                    tinymce.activeEditor.notificationManager.close()
                }, 2000)
            },
            error: (err) => {
                console.log(err)
                tinymce.activeEditor.notificationManager.open({
                    text: '保存失败！',
                    type: 'error',
                    timeout: 2000
                })
                setTimeout(() => {
                    tinymce.activeEditor.notificationManager.close()
                }, 2000)
            }
        })
    },
    init_instance_callback: (editor) => { //初始化结束
        // editor.off('keydown', function () {
        //     var _curNode = editor.selection.getNode();
        //     console.log(_curNode.nodeName)
        // });
        editor.on('change', () => {
            tinymce.activeEditor.notificationManager.open({
                text: '正在保存...',
                type: 'info',
                timeout: 2000
            });
        })
    },
})