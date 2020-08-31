const { ipcRenderer } = {}//window.require('electron');
const fs = window.require('fs')

function save (userInput) {
    return new Promise((res, rej) => {
        let outputStr = fs.createWriteStream('tmp.txt');
        outputStr.on('finish', () => res(ipcRenderer.sendSync('make-pdf', 'output.pdf')))

        outputStr.write("\\documentclass{article}\n");
        outputStr.write("\\usepackage{amsmath}\n\n");

        outputStr.write("\\title{Latex test}\n");
        outputStr.write("\\author{Manali Redkar}\n");
        outputStr.write("\\date{\\today}\n\n");
        outputStr.write("\\begin{document}\n");
        outputStr.write("\\begin{align*}\n");

        for (var input of userInput)
            if (input.name == "math") 
                outputStr.write(input.value + " && ");
            else if (input.name == "text")
                outputStr.write("\\text{" + input.value + "}\\\\\n");

        outputStr.write("\\end{align*}\n");
        outputStr.write("\\end{document}");
        outputStr.end();
        outputStr.close();
    })
}

export default { save }


//ipcMain side:
// listen for "convert pls"
        // convert "tmp.txt" > <output path>.pdf
        // remove "tmp.txt"
        // respond "all done"