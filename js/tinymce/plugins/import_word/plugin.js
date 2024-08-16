
tinymce.PluginManager.add('import_word', function(editor, url) {
  function openDialog() {
    var fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.docx'

    fileInput.onchange = function(event) {
      var file = event.target.files[0]
      var reader = new FileReader()
      tinymce.activeEditor.notificationManager.open({
        text: '正在导入Word文件...',
        type: 'info',
      })
      reader.onload = function(event) {
        var arrayBuffer = reader.result

        mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          .then(displayResult)
          .catch(handleError)
      }

      reader.readAsArrayBuffer(file)
    }

    fileInput.click()
  }

  function displayResult(result) {
    const htmlContent = result.value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');
    var tables = doc.querySelectorAll('table');
    const anchors = doc.querySelectorAll('a');
    console.log('anchors', anchors,tables)
    anchors.forEach(anchor => {
      if (anchor.attributes[0].nodeValue.startsWith('_')){
        anchor.parentNode.removeChild(anchor);
      }
    });
    images.forEach(img => {
      img.style.maxWidth = '800px'; // 设置图片的最大宽度
      img.style.margin = '10px';
    });
    tables.forEach(table => {
      table.style.width = '100%'; // 设置表格的宽度为100%
      table.style.marginLeft = 'auto';
      table.style.marginRight = 'auto';
      table.style.borderCollapse = 'collapse';
      table.style.borderStyle = 'solid';
      // 添加边框
      for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
          table.rows[i].cells[j].style.border = '1px solid #000';
        }
      }
      // 过滤掉table中所有的首行缩进，包括table
      filterFirstRowIndent(table);
      function filterFirstRowIndent(table) {
        for (let i = 0; i < table.rows.length; i++) {
          if (i === 0) {
            for (let j = 0; j < table.rows[i].cells.length; j++) {
              table.rows[i].cells[j].innerHTML = table.rows[i].cells[j].innerHTML.replace(/^[\s\uFEFF\xA0]+/, '');
            }
          } else {
            break;
          }
        }
      }
    });
    tinymce.activeEditor.notificationManager.close()
   
    editor.insertContent(doc.body.innerHTML)
    tinymce.activeEditor.notificationManager.open({
      text: '导入完成',
      type: 'success',
    })
    setTimeout(() => {
      tinymce.activeEditor.notificationManager.close()
    }, 3000)
  }

  function handleError(err) {
    console.error('Error reading file:', err)
    editor.notificationManager.open({
      text: '导入失败: ' + err.message,
      type: 'error',
      timeout: 5000,
    })
  }

  editor.ui.registry.addButton('import_word', {
    // text: '导入Word',
    icon: 'import-word',
    tooltip: '导入Word',
    onAction: function() {
      openDialog()
    },
  })

  editor.ui.registry.addMenuItem('import_word', {
    text: '导入Word',
    icon: 'import-word',
    onAction: function() {
      openDialog()
    },
  })

  return {
    getMetadata: function() {
      return {
        name: 'Import Word Plugin',
        url: 'https://example.com/import-word-plugin',
      }
    },
  }
})
