// Exercise 3 - Expense Tracker
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test
let arr = [];
let count = 0;
let isSort = false;
let selectedCategory = "all";

const sortBtn = document.getElementById("sort-btn");
const filter = document.getElementById("filter");

const form = document.getElementById("expense-form");
// One expense in the array looks like this:
// { id: 1, desc: "Pizza", amount: 42.5, category: "food" }
// Step 2: render() - rebuild the table rows from the array

function editNoRow(arr) {
    const noRow = document.getElementById("no-rows");
    (arr.length == 0) ? noRow.hidden = false : noRow.hidden = true;
}
// Step 4: total of the expenses that are shown
function editTotal(arr) {
    let total = 0;
    const totalP = document.getElementById("total");
    arr.forEach(element => { total += element.amount });
    totalP.textContent = total.toFixed(2);
}
function render() {
    const rows = document.getElementById("rows");
    rows.innerHTML = "";
   
    let showArr = (isSort) ? arr.toSorted((a, b) => b.amount - a.amount) : arr;
    if (selectedCategory !== "all") {
        showArr = showArr.filter(element =>
            element.category === selectedCategory
        );
    }
    showArr.forEach(element => {
        const tr = document.createElement("tr");
        // Step 7: rows with an amount above 100 get the class "big"
        if (element.amount > 100) tr.classList.add("big");
        const td1 = document.createElement("td");
        td1.textContent = element.desc;

        const td2 = document.createElement("td");
        const span = document.createElement("span");
        span.textContent = element.category;
        span.classList.add("badge");
        td2.appendChild(span);

        const td3 = document.createElement("td");
        td3.textContent = element.amount.toFixed(2);

        const td4 = document.createElement("td");
        const button = document.createElement("button");
        button.classList.add("delete");
        button.dataset.id = element.id;
        button.textContent = "Delete";
        td4.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        rows.appendChild(tr);
    });
    editTotal(showArr);
     editNoRow(showArr);

}
// Step 1: add an expense on submit (unique id, no reload, validation messages, clear desc + amount, focus desc)
form.onsubmit = function (event) {
    event.preventDefault();
    const err = document.getElementById("form-error");
    if (!event.target.elements["desc"].value.trim() || Number(event.target.elements["amount"].value <= 0)) {
        if (!event.target.elements["desc"].value.trim())
            err.textContent = "Please add a description"
        if (event.target.elements["amount"].value <= 0)
            err.textContent = "The amount must be larger than 0"

        err.hidden = false
    }
    else {
        let row = {};
        count++;
        row.id = count;
        row.desc = event.target.elements["desc"].value.trim();
        row.amount = Number(event.target.elements["amount"].value);
        row.category = event.target.elements["category"].value;
        arr.push(row);

        event.target.elements["desc"].value = "";
        event.target.elements["amount"].value = "";
        event.target.elements["category"].value = "food";
        event.target.elements["desc"].focus();
        err.hidden = true
        render()
    }

}

// Step 3: delete (one listener on #rows - event delegation, by data-id)

const rows = document.getElementById("rows");

rows.onclick = function (event) {
    if (event.target.classList.contains("delete")) {
        const id = Number(event.target.dataset.id);

        arr = arr.filter(element => element.id !== id);

        render();
    }
};


// Step 5: filter by category

filter.onchange = function (event) {
    selectedCategory = event.target.value;
    render();
};
// Step 6: sort by amount (toSorted - the original array keeps its order)

sortBtn.onclick = function () {
    isSort = !isSort;
    sortBtn.textContent = isSort ? "Sort by amount: on" : "Sort by amount: off";
    render()
}