let htmlCode = document.getElementById('htmlCode');
htmlCode.innerHTML = `<h1 id="my-h1">Hey now!</h1>
<button onclick="changeH1()">Click Me!</button>`;
let cssCode = document.getElementById('cssCode');
cssCode.innerHTML = `h1 {
    color: blue;
}`;
let jsCode = document.getElementById('jsCode');
jsCode.innerHTML = `function changeH1(){
    let h1 = document.getElementById('my-h1'); 
    h1.innerHTML = 'Boom!';
}`;
let htmlEditor = CodeMirror.fromTextArea(
    document.getElementById("htmlCode"),
    {
        mode: "xml",
        theme: "dracula",
        lineNumbers: true,
        autoCloseTags: true,
    }
);
let cssEditor = CodeMirror.fromTextArea(
    document.getElementById("cssCode"),
    {
        mode: "css",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
    }
);
let jsEditor = CodeMirror.fromTextArea(
    document.getElementById("jsCode"),
    {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
    }
);
let frame = document.getElementById("preview-window").contentWindow
    .document;

function showPreview() {
    let htmlCode = htmlEditor.getValue();
    let cssCode = `<style>${cssEditor.getValue()}</style>`;
    let jsCode = "<scri" + "pt>" + jsEditor.getValue() + "</scri" + "pt>";
    frame.open();
    frame.write(htmlCode + cssCode + jsCode);
    frame.close();
}

htmlEditor.on("change", showPreview);
cssEditor.on("change", showPreview);

jsEditor.on("keyup", function (cm, event) {
    if (
        event.key == "Enter" ||
        event.key == ";" ||
        event.key == ")" ||
        event.key == "}"
    ) {
        showPreview();
    }
});

showPreview();