tinymce.init({
    selector: '#editor',
    plugins: 'preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link math media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate markdown revisionhistory kityformula-editor mathjax',
    toolbar: "undo redo | revisionhistory tableofcontents permanentpen | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | link image | table math kityformula-editor media pageembed | lineheight  outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save print | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck", // Note: if a toolbar item requires a plugin, the item will not present in the toolbar if the plugin is not also loaded.
    language: 'zh_CN',
    skin: 'fabric',
    content_css: 'fabric',
    height: window.innerHeight - 20,
    mathjax: { lib: './mathjax-3.2.2/package/es5/tex-mml-chtml.js' },

    toolbar_mode: 'sliding',
    tinycomments_mode: 'embedded',
    revisionhistory_display_author: true,
    branding: false,
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
        })
        editor.on('SetContent', (e) => {
            console.log('setcontent')
            // 将所有图片内容提添加最大宽度为800px
            editor.dom.setStyles(editor.dom.select('img'), { 'max-width': '626px', 'height': 'auto' })
        })
    }
})