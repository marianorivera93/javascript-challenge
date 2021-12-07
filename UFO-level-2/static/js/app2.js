// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");
var dateSelect = d3.select("#datetime");
var citySelect = d3.select("#city");
var stateSelect = d3.select("#state");
var countrySelect = d3.select("#country");
var shapeSelect = d3.select("#shape");
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn");

function clearTable() {
    tbody.html("");
};

function resetForm() {
    document.getElementById('formFilter').reset();
}

function resetTable() {

    // clear the  data
    clearTable();

    //clear the form filters
    resetForm();

    data.forEach((ufoSighting) => {
        var row = tbody.append("tr");
        Object.values(ufoSighting).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
            cell.attr("class", "table-style");
        }); // close second forEach
    }); // close first forEach

}; // close function resetTable()

// mdropdown menus 
function populateDropdowns() {

    
    var dates = Array.from(new Set(data.map(sighting => sighting.datetime)));
    var cities = Array.from(new Set(data.map(sighting => sighting.city))).sort(d3.ascending);
    var states = Array.from(new Set(data.map(sighting => sighting.state))).sort(d3.ascending);
    var countries = Array.from(new Set(data.map(sighting => sighting.country))).sort(d3.ascending);
    var shapes = Array.from(new Set(data.map(sighting => sighting.shape))).sort(d3.asending);

    // use a forEach to loop over elements in each array to populate dropdowns
    dates.forEach(date => {
        var option = dateSelect.append("option");
        option.text(date);
    });

    cities.forEach(city => {
        var option = citySelect.append("option");
        option.text(city);
    });

    states.forEach(state => {
        var option = stateSelect.append("option");
        option.text(state);
    });

    countries.forEach(country => {
        var option = countrySelect.append("option");
        option.text(country);
    });

    shapes.forEach(shape => {
        var option = shapeSelect.append("option");
        option.text(shape);
    });

} // end Dropdowns()

function filterTable() {

    d3.event.preventDefault();

    // filtering 
    var inputDate = $('#datetime').val();
    var inputCity = $('#city').val();
    var inputState = $('#state').val();
    var inputCountry = $('#country').val();
    var inputShape = $('#shape').val()

    // make a copy of the data for filtering
    var filteredData = data;

    if (inputDate.length) {
        filteredData = filteredData.filter(sighting => inputDate.includes(sighting.datetime));
    }

    if (inputCity.length) {
        filteredData = filteredData.filter(sighting => inputCity.includes(sighting.city));
    }

    if (inputState.length) {
        filteredData = filteredData.filter(sighting => inputState.includes(sighting.state));
    }

    if (inputCountry.length) {
        filteredData = filteredData.filter(sighting => inputCountry.includes(sighting.country));
    }

    if (inputShape.length) {
        filteredData = filteredData.filter(sighting => inputShape.includes(sighting.shape));
    }

    // reset the table
    clearTable();

    if (filteredData.length == 0) {
        var row = tbody.text("There are no sightings for your chosen filters.");
    }


    else {
        filteredData.forEach((ufoSighting) => {

            var row = tbody.append("tr");

            Object.values(ufoSighting).forEach(value => {

                // new cell
                var cell = row.append("td");

                cell.text(value);
                cell.attr("class", "table-style");
            }); // close

        }); // close

    } // else

}; // close filter

resetTable();

populateDropdowns();

filterButton.on("click", filterTable);

resetButton.on("click", resetTable);