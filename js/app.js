var elementID = 0;
const elements = {
    "process": document.getElementById("process"),
    "break": document.getElementById("break"),
    "call": document.getElementById("call"),
    "if": document.getElementById("if"),
    "case": document.getElementById("case"),
    "headloop": document.getElementById("headloop"),
    "footloop": document.getElementById("footloop"),
};

var selectedElement = null;

document.addEventListener('click', function(event) {
    if (event.target.innerHTML === "∅") {
        let activeBefore = document.getElementsByClassName("active")[0];
        activeBefore.classList.remove("active");
        event.target.classList.add("active");

        if (event.target.parentNode.id === "lastrow") {
            selectedElement = null;
            return;
        }
        selectedElement = event.target;
    }

});

document.addEventListener('dragstart', function(event) {
    let tbody = event.target.getElementsByTagName('tbody')[0];
    event.dataTransfer.setData('text/html', tbody.id);
});

document.addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.addEventListener('drop', dropElement);

function dropElement(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text/html");
    let nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = data + elementID;
    let newTable = document.createElement('table');
    newTable.appendChild(nodeCopy);

    if (selectedElement) {
        selectedElement.innerText = "";
        selectedElement.appendChild(newTable);

    } else {
        let newRow = document.createElement('tr');
        let newCell = document.createElement('td');
        newCell.appendChild(newTable);
        newRow.appendChild(newCell);
        let lastrow = document.getElementById("lastrow");
        lastrow.parentNode.insertBefore(newRow, lastrow);
    }
    elementID++;
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("controls").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("controls").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}