function editorStartTextarea(editor_sequence, content_key, primary_key) {
    var obj = xGetElementById('editor_'+editor_sequence);
    var use_html = xGetElementById('htm_'+editor_sequence).value;
    obj.form.setAttribute('editor_sequence', editor_sequence);

    editorRelKeys[editor_sequence] = new Array();
    editorRelKeys[editor_sequence]["primary"] = obj.form[primary_key];
    editorRelKeys[editor_sequence]["content"] = obj.form[content_key];
    editorRelKeys[editor_sequence]["func"] = editorGetContentTextarea;

    var content = obj.form[content_key].value;
    obj.value = content;
}

function editorGetContentTextarea(editor_sequence) {
    var obj = xGetElementById('editor_'+editor_sequence);
    var use_html = xGetElementById('htm_'+editor_sequence).value;
    var content = obj.value.trim();
    return content;
}