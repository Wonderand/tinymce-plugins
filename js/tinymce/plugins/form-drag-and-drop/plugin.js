/**
 * ClassName: plugin
 * Description:
 * @Author: hzr
 * Date: 2024/11/6 10:01
 * History:
 * <author> <time> <version> <desc>
 * hzr 2024/11/6 10:01 @Version 1.0 描述
 */
tinymce.PluginManager.add('form-drag-and-drop', function (editor, url) {
    // 表单属性编辑对话框对象
    var dialog = {
        width: 300,
        height: 40,
    }
    var openDialog = function (val) {
        return editor.windowManager.open({
            title: "编辑输入框",
            body: {
                type: 'panel',
                items: [
                    // 宽度
                    {
                        type: 'input',
                        name: 'width',
                        label: '宽度（px）',
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        placeholder: '请输入宽度',
                    },
                    // 高度
                    {
                        type: 'input',
                        name: 'height',
                        label: '高度（px）',
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        placeholder: '请输入高度',
                    },
                    // 类型
                    {
                        type: 'selectbox',
                        name: 'type',
                        label: '类型',
                        items: [
                            { text: '文本框', value: 'text' },
                            { text: '密码框', value: 'password' },
                            { text: '日期框', value: 'date' },
                            { text: '时间框', value: 'time' },
                            { text: '日期时间框', value: 'datetime-local' },
                            { text: '文件框', value: 'file' },
                            { text: '隐藏框', value: 'hidden' },
                            { text: '提交按钮', value: 'submit' },
                        ]
                    }
                ]
            },
            initialData: {
                width: val.width,
                height: val.height,
                type: val.type,
            },
            buttons: [
                {
                    type: 'cancel',
                    text: '取消'
                },
                {
                    type: 'submit',
                    text: '确定'
                }
            ],
            onSubmit: (api) => {
                const data = api.getData();
                const width = data.width;
                const height = data.height;
                const type = data.type;
                let className = 'form-control-' + type;
                // 检验宽度和高度是否合法
                // 正则表达式校验
                // 如果宽度和高度不为空，则进行正则表达式校验，否则就是默认值
                if (width !== '' || height !== ''){
                    console.log('宽度:', width, '高度:', height)
                    const validDimension = /^[0-9]+(px|em|%|rem|vw|vh)$/;
                    let isValid = true;
                    if (!validDimension.test(width)) {
                        isValid = false;
                        tinymce.activeEditor.windowManager.alert('请输入有效的宽度');
                        return;
                    }
                    if (!validDimension.test(height)) {
                        isValid = false;
                        tinymce.activeEditor.windowManager.alert('请输入有效的高度');
                        return;
                    }
                    if (!isValid) {
                        return;
                    }
                }

                // 创建新的表单元素
                let newElement = document.createElement('input');
                newElement.setAttribute('type', type);
                newElement.setAttribute('style', 'display: inline-block');
                newElement.setAttribute('class', `${className} form-control draggable`);
                if (type === 'text'){
                    newElement.setAttribute('placeholder', '请输入内容');
                }
                newElement.style.width = width;
                newElement.style.height = height;
                // console.log('宽度:', width, '高度:', height);
                // 给选中元素设置宽度和高度
                // const selectedElement = editor.selection.getNode();
                // selectedElement.style.width = width;
                // selectedElement.style.height = height;
                editor.selection.getNode().outerHTML = newElement.outerHTML;
                api.close();
            }
        });
    }
    // 插件初始化时，创建拖拽按钮
    editor.on('init', function () {
        // 监听点击事件，添加选中样式
        editor.on('click', function (e) {
            const target = e.target;

            if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA' || target.tagName === 'DIV') {
                // 移除所有其他元素的选中样式
                editor.getBody().querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                // 给点击的表单控件添加选中样式
                target.classList.add('selected');
                editor.selection.select(target);
                // addResizeHandles(target); // 添加缩放句柄
            } else {
                // 点击其他地方移除所有选中
                editor.getBody().querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                // removeResizeHandles();
            }
        });
    });

    // 添加不同类型的按钮到工具栏
    editor.ui.registry.addButton('dragInput', {
        text: 'Input',
        onAction: function () {
            editor.insertContent('<input type="text" style="display: inline-block " placeholder="请输入内容" class="form-control-text form-control draggable" />');
        }
    });

    editor.ui.registry.addContextToolbar('dragInput', {
        predicate: function (node) {
            // console.log(node)
            // 检测当前节点是否是 input 元素
            return node.nodeName.toLowerCase() === 'input' && node.classList.contains('form-control');
        },
        items: 'upInput',
        position: 'node',
        scope: 'node',
    })
    editor.ui.registry.addButton('upInput', {
        text: '编辑',
        onAction: function () {
            const selectedElement = editor.selection.getNode();
            // 获取选中的元素的宽度和高度
            const width = selectedElement.style.width;
            const height = selectedElement.style.height;
            // 获取input元素的类型
            dialog.width = width
            dialog.height = height
            dialog.type = selectedElement.type
            console.log(selectedElement,dialog)
            openDialog(dialog)
        }
    })

    editor.ui.registry.addButton('dragCheckbox', {
        text: 'Checkbox',
        onAction: function () {
            editor.insertContent('<input type="checkbox" class="draggable" /> 复选框');
        }
    });

    editor.ui.registry.addButton('dragRadio', {
        text: 'Radio',
        onAction: function () {
            editor.insertContent('<input type="radio" name="group1" class="draggable" /> 单选框');
        }
    });

    editor.ui.registry.addButton('dragSelect', {
        text: 'Select',
        onAction: function () {
            editor.insertContent('<select class="draggable"><option value="1">选项1</option><option value="2">选项2</option></select>');
        }
    });
    // 添加选项
    editor.ui.registry.addButton('dragOption', {
        text: 'Option',
        onAction: function () {
            editor.insertContent('<option value="3">选项3</option>');
        }
    });

    editor.ui.registry.addButton('dragTextarea', {
        text: 'Textarea',
        onAction: function () {
            editor.insertContent('<textarea class="draggable" style="width: 100%; height: 100px;"></textarea>');
        }
    });

    editor.ui.registry.addButton('dragButton', {
        text: 'Button',
        onAction: function () {
            editor.insertContent('<button class="draggable">按钮</button>');
        }
    });



    // 添加选中元素的缩放句柄
    function addResizeHandles(element) {
        // 清除旧的句柄
        removeResizeHandles();

        const handleSize = 10; // 缩放锚点的大小
        const handles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

        // 为每个角添加缩放锚点
        handles.forEach(handle => {
            const resizeHandle = document.createElement('div');
            resizeHandle.className = `resize-handle ${handle}`;
            resizeHandle.style.position = 'absolute';
            resizeHandle.style.width = `${handleSize}px`;
            resizeHandle.style.height = `${handleSize}px`;
            resizeHandle.style.background = 'blue';
            resizeHandle.style.zIndex = '10';
            resizeHandle.style.cursor = `${handle}-resize`;

            // 计算每个角的位置
            if (handle === 'top-left') {
                resizeHandle.style.top = '-5px';
                resizeHandle.style.left = '-5px';
            } else if (handle === 'top-right') {
                resizeHandle.style.top = '-5px';
                resizeHandle.style.right = '-5px';
            } else if (handle === 'bottom-left') {
                resizeHandle.style.bottom = '-5px';
                resizeHandle.style.left = '-5px';
            } else if (handle === 'bottom-right') {
                resizeHandle.style.bottom = '-5px';
                resizeHandle.style.right = '-5px';
            }

            // 监听每个缩放锚点的拖动事件
            resizeHandle.addEventListener('mousedown', function (e) {
                e.preventDefault();
                e.stopPropagation();  // 防止触发编辑器的选择或拖拽事件

                // 记录初始状态
                const rect = element.getBoundingClientRect();
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = rect.width;
                const startHeight = rect.height;
                const startLeft = rect.left;
                const startTop = rect.top;

                // 确定当前拖动的角是哪一个
                const resizeDirection = handle;

                document.addEventListener('mousemove', resizeElement);
                document.addEventListener('mouseup', stopResize);

                // 缩放时的计算
                function resizeElement(e) {
                    let newWidth = startWidth;
                    let newHeight = startHeight;
                    let newLeft = startLeft;
                    let newTop = startTop;

                    if (resizeDirection === 'top-left') {
                        newWidth = startWidth - (e.clientX - startX);
                        newHeight = startHeight - (e.clientY - startY);
                        newLeft = startLeft + (e.clientX - startX);
                        newTop = startTop + (e.clientY - startY);
                    } else if (resizeDirection === 'top-right') {
                        newWidth = startWidth + (e.clientX - startX);
                        newHeight = startHeight - (e.clientY - startY);
                        newTop = startTop + (e.clientY - startY);
                    } else if (resizeDirection === 'bottom-left') {
                        newWidth = startWidth - (e.clientX - startX);
                        newHeight = startHeight + (e.clientY - startY);
                        newLeft = startLeft + (e.clientX - startX);
                    } else if (resizeDirection === 'bottom-right') {
                        newWidth = startWidth + (e.clientX - startX);
                        newHeight = startHeight + (e.clientY - startY);
                    }

                    // 设置最小值，防止控件消失
                    if (newWidth > 20 && newHeight > 20) {
                        element.style.width = `${newWidth}px`;
                        element.style.height = `${newHeight}px`;
                        element.style.left = `${newLeft}px`;
                        element.style.top = `${newTop}px`;
                    }
                }

                // 停止缩放
                function stopResize() {
                    document.removeEventListener('mousemove', resizeElement);
                    document.removeEventListener('mouseup', stopResize);
                }
            });

            element.style.position = 'relative';
            element.appendChild(resizeHandle);
        });
    }

    function removeResizeHandles() {
        const handles = editor.getBody().querySelectorAll('.resize-handle');
        handles.forEach(handle => handle.parentNode.removeChild(handle));
    }

    return {
        getMetadata: function () {
            return {
                name: "Form Drag and Drop Plugin",
                url: "https://www.example.com"
            };
        }
    };
});

