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
    // plugins: 'test preview powerpaste casechange import_word importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link math media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate markdown revisionhistory kityformula-editor mathjax indent2em',
    // toolbar: 'undo redo | revisionhistory tableofcontents permanentpen | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | link image | table math kityformula-editor media pageembed | lineheight indent2em outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save print import_word | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck', // Note: if a toolbar item requires a plugin, the item will not present in the toolbar if the plugin is not also loaded.
    plugins: 'advcode preview form-drag-and-drop numlist bullist wordcount',
    toolbar: 'undo redo blocks fontsizeinput | bold italic | alignleft aligncenter alignright alignjustify numlist bullist outdent indent code preview|dragCheckbox dragRadio dragInput dragSelect |saveContent',
    language: 'zh_CN',
    skin: 'fabric',
    content_css: ['fabric',
        // 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
    ],
    font_family_formats: '微软雅黑=Microsoft YaHei;等线=DengXian;宋体=SimSun;仿宋=FangSong;黑体=SimHei;楷体=KaiTi;隶书=LiSu;幼圆=YouYuan;Andale Mono=andale mono; Arial=arial;Arial Black=arial black;Book Antiqua=antiqua;Comic Sans MS=comic sans ms;Courier New=courier new;Georgia=georgia;Helvetica=helvetica;Impact=impact;Symbol=symbol;Tahoma=tahoma;Terminal=terminal;Times New Roman=times new roman;Trebuchet MS=trebuchet ms;Verdana=verdana;Webdings=webdings;Wingdings=wingdings',
    height: window.innerHeight,
    mathjax: {lib: './mathjax-3.2.2/package/es5/tex-mml-chtml.js'},
    toolbar_mode: 'sliding',
    tinycomments_mode: 'embedded',
    revisionhistory_display_author: true,
    branding: false,
    statusbar: true, // 状态栏
    // highlight_on_focus: true, // 聚焦时高亮
    // link_context_toolbar: true, // 链接工具栏
    // toolbar_location: 'bottom', //默认位于内容区域上方。
    relative_urls: false,      // 禁止使用相对路径
    remove_script_host: false, // 保留主机名和协议
    // toolbar_sticky: true, // 粘性工具栏
    toolbar_persist: true, // 持久工具栏
    draggable_modal: true, // 拖动式对话框
    menubar: false,
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
            // fetch(baseUrl + '/api/notToken')  // 异步获取内容
            //     .then(response => response.text())
            //     .then(data => {
            //         let content = JSON.parse(data)
            //         editor.setContent(content.data); // 动态设置内容
            //     });
            editor.insertContent('<div class="dpu8C _2kCxD">\n' +
                '    <p style="text-align: justify;"><span style="font-size: 18px;">据CCTV国际时讯消息，当地时间11月6日凌晨，在美国大选计票还在进行之中，共和党总统候选人特朗普登上佛罗里达州集会舞台开始讲话，宣布胜选。</span></p>\n' +
                '</div>\n' +
                '<div class="dpu8C _2kCxD " style="text-align: justify;">\n' +
                '    <p><span style="font-size: 18px;">根据《国会山报》、美国福克斯新闻网等多家美国媒体最新公布的测算，特朗普已收获超半数的选举人票，预计将锁定本次美国总统选举胜局。但其他美国主流媒体尚未发布类似报道。目前美国总统大选计票仍在进行。</span></p>\n' +
                '</div>\n' +
                '<div class="dpu8C _2kCxD " style="text-align: justify;">\n' +
                '    <p><span style="font-size: 18px;">另据美国民主党总统候选人、副总统哈里斯的竞选团队方面称，哈里斯暂时不会对其支持者发表演讲，&ldquo;将于明天讲话&rdquo;。据美国有线电视新闻网（CNN）11月5日报道，哈里斯竞选团队负责人迪兰（Jen O&rsquo;Malley Dillon）当晚在发给员工的一份邮件中说，她预计大选结果不会在今晚出来。她说，投票结果要到几小时后才能揭晓。</span></p>\n' +
                '</div>\n' +
                '<div class="dpu8C _2kCxD " style="text-align: justify;">\n' +
                '    <p><span style="font-size: 18px;">美国总统选举采取选举人团制度，50个州按人口比例分配选举人票，获得538张选举人票中的至少270张即为获胜。</span></p>\n' +
                '</div>\n' +
                '<div class="dpu8C _2kCxD">\n' +
                '    <p style="text-align: justify;"><span style="font-size: 18px;">来源：央视新闻</span></p>\n' +
                '    <p style="text-align: justify;">&nbsp;</p>\n' +
                '</div>' +
                '<p style="padding-left: 240px;"><span style="font-size: 18px;">姓名：<input class="form-control-text form-control draggable" style="display: inline-block; width: 70px; height: 21px;" type="text" placeholder="请输入内容">&nbsp; &nbsp;时间：<input class="form-control-datetime-local form-control draggable" style="display: inline-block; width: 150px; height: 21px;" type="datetime-local"></span></p>')
        })
        editor.on('SetContent', (e) => {
            console.log('setcontent')
            // 将所有图片内容提添加最大宽度为800px
            editor.dom.setStyles(editor.dom.select('img'), {'max-width': '626px', 'height': 'auto'})
            // 给所有p标签添加首行缩进
            // editor.dom.setStyles(editor.dom.select('p'), { 'text-indent': '2em' })
        })
        editor.on('keydown', (e) => {
            // 检测 Ctrl + Enter 组合键
            if (e.ctrlKey && e.keyCode === 13) {
                e.preventDefault(); // 阻止默认行为
                // 获取当前选中的节点
                let currentNode = editor.selection.getNode();
                // 找到当前节点的父节点直到body
                while (currentNode && currentNode.parentNode.nodeName !== 'BODY') {
                    currentNode = currentNode.parentNode;
                }
                console.log(currentNode)
                // 创建一个新的段落
                const newParagraph = editor.dom.create('p', {}, '<br>');
                // 将新段落插入到当前节点之后
                editor.dom.insertAfter(newParagraph, currentNode);
                // 将光标移动到新段落内
                editor.selection.setCursorLocation(newParagraph, 0);
                // 使编辑器聚焦
                editor.focus();
            }
        })
        editor.on('change', () => {

        })
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
        editor.ui.registry.addButton('saveContent', {
            text: '导出HTML',
            onAction: function () {
                let content = editor.getContent({format: 'raw'})
                console.log(content)
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
                content: editor.getContent({format: 'raw'})
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
    }
})
