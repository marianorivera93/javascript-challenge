// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");

function appendRowsAndData(obj) {
    var row = tbody.append("tr");

    //loop same order and are present every time
    Object.entries(obj).forEach(([key, value]) => {
        row.append("td").text(value); 
    })
};

//rows and data
data.forEach(appendRowsAndData);

//filter
var button = d3.select("#filter-btn");

//click button
button.on("click", function() {
    d3.event.preventDefault();

    //filter date
    var dateInput = d3.select("#datetime");
    var datetime = dateInput.property("value");

    var filterInputs = {};

    if (datetime !== "") {
        filterInputs.datetime = datetime;
    }

    var filtered = tableData.filter(obj => {
        var criteria = true;
        Object.entries(filterInputs).forEach(([key, value]) => {
            criteria = criteria && (obj[key] === value);
        });
        return criteria;
    });

    console.log(filtered);

    tbody.html("");

    filtered.forEach(appendRowsAndData);
});