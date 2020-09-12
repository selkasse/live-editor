// * Set initial editor values

let htmlCode = document.getElementById('htmlCode');
htmlCode.innerHTML = `<!-- HTML -->
`;



let cssCode = document.getElementById('cssCode');
cssCode.innerHTML = `/* CSS */`;

let jsCode = document.getElementById('jsCode');
jsCode.innerHTML = `// JavaScript`;

// * Convert textareas to CodeMirror objects

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

const writeMarkup = function () {
    const htmlString = `<h2 id='test'>ooo where did this come from?!</h2>`;
    return htmlString;
}

// * Render the preview in the iframe
function showPreview() {
    let htmlCode = htmlEditor.getValue();
    let cssCode = `<style>${cssEditor.getValue()}</style>`;
    let jsCode = "<scri" + "pt>" + jsEditor.getValue() + "</scri" + "pt>";
    let defaultCode = writeMarkup();
    frame.open();
    frame.write(defaultCode + htmlCode + cssCode + jsCode);
    frame.close();
    frame.getElementById('test').style.color = "orange";
    frame.body.style.backgroundColor = "black";

}

// * Add CodeMirror event listeners to editors
htmlEditor.on("change", showPreview);
cssEditor.on("change", showPreview);
// * Only call showPreview when the user presses a key that likely signifies they are done writing that section of code
// * This prevents console errors when in the middle of typing new code
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