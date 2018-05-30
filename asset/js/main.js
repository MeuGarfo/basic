var showSource=true;

function editor(command) {
    var editorElm = document.getElementById("editor");
    if(command=="CreateLink"){
        var url = prompt("Digite o endereço:", "http://");
        if ((url != null) && (url != "")) {
            document.execCommand("CreateLink",false,url);
        }
    }else if (command == "CreateTable") {
        rowstext = prompt("enter rows");
        colstext = prompt("enter cols");
        rows = parseInt(rowstext);
        cols = parseInt(colstext);
        if ((rows > 0) && (cols > 0)) {
            table = document.createElement("table");
            tbody =document.createElement("tbody");
            for (var i=0; i < rows; i++) {
                tr =document.createElement("tr");
                for (var j=0; j < cols; j++) {
                    td =document.createElement("td");
                    br =document.createElement("br");
                    td.appendChild(br);
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            table.setAttribute("class", "table table-bordered table-hover");
            var responsive = document.createElement("div");
            responsive.setAttribute("class", "responsive");
            responsive.appendChild(table);
            insertNodeAtSelection(responsive);
        }
    }else if(command=='focus'){
        editorElm.focus();
    }else if(command=='html'){
        var editorHTML;
        if (this.showSource) {
            editorHTML = document.createTextNode(editorElm.innerHTML);
            editorElm.innerHTML = "";
            var editorPre = document.createElement("pre");
            editorElm.contentEditable = false;
            editorPre.id = "sourceText";
            editorPre.contentEditable = true;
            editorPre.appendChild(editorHTML);
            editorElm.appendChild(editorPre);
            this.showSource=false;
        } else {
            if (document.all) {
                editorElm.innerHTML = editorElm.innerText;
            } else {
                editorHTML = document.createRange();
                editorHTML.selectNodeContents(editorElm.firstChild);
                editorElm.innerHTML = editorHTML.toString();
            }
            editorElm.contentEditable = true;
            this.showSource=true;
        }
        editorElm.focus();
    }else if(command=='h2' || command=='h3' || command=='p'){
        document.execCommand('formatblock',false, command);
    }else if (command == "InsertImage") {
        imagePath = prompt('URL da imagem:', 'http://');
        if ((imagePath != null) && (imagePath != "")) {
            document.execCommand('InsertImage', false, imagePath);
        }
    }else if(command=='reset'){
        editorElm.innerHTML="";
        editor('p');
    }else{
        document.execCommand(command);
    }
    editorElm.focus();
}

function insertNodeAtSelection(insertNode) {
    var sel = document.getSelection();
    var range = sel.getRangeAt(0);
    sel.removeAllRanges();
    range.deleteContents();
    var container = range.startContainer;
    var pos = range.startOffset;
    range=document.createRange();
    if (container.nodeType==3 && insertNode.nodeType==3) {
        container.insertData(pos, insertNode.nodeValue);
        range.setEnd(container, pos+insertNode.length);
        range.setStart(container, pos+insertNode.length);
    } else {
        var afterNode;
        if (container.nodeType==3) {
            var textNode = container;
            container = textNode.parentNode;
            var text = textNode.nodeValue;
            var textBefore = text.substr(0,pos);
            var textAfter = text.substr(pos);
            var beforeNode = document.createTextNode(textBefore);
            afterNode = document.createTextNode(textAfter);
            container.insertBefore(afterNode, textNode);
            container.insertBefore(insertNode, afterNode);
            container.insertBefore(beforeNode, insertNode);
            container.removeChild(textNode);
        }  else {
            afterNode = container.childNodes[pos];
            container.insertBefore(insertNode, afterNode);
        }
        range.setEnd(afterNode, 0);
        range.setStart(afterNode, 0);
    }
    sel.addRange(range);
}
