/* common functions */

const populateTable = (data, num) => {
    const table = document.getElementById("view-table");
    const tableBody = document.createElement("tbody");

    data.map(item => {
        const date = item.date_time.substr(0,10);
        const time = item.date_time.substr(11,5);

        const row = document.createElement("tr");

        const dateColumn = document.createElement("td");
        dateColumn.innerHTML = date;
        row.appendChild(dateColumn);

        const timeColumn = document.createElement("td");
        timeColumn.innerHTML = time;
        row.appendChild(timeColumn);

        
        if (num === 1) {
            const measurementColumn = document.createElement("td");
            const measurement = Object.keys(item.data);
            measurementColumn.innerHTML = measurement[0];
            row.appendChild(measurementColumn);

            const valueColumn = document.createElement("td");
            const value = Object.values(item.data);
            valueColumn.innerHTML = Math.round(value[0] * 100) / 100;
            row.appendChild(valueColumn);
        }
        else if (num === 2) {
            const valueColumn = document.createElement("td");
            valueColumn.innerHTML = item.temperature.substr(0,5);
            row.appendChild(valueColumn);
        }
        else if (num === 3) {
            const valueColumn = document.createElement("td");
            valueColumn.innerHTML = item.humidity_in.substr(0,5);
            row.appendChild(valueColumn);
        }
        

        tableBody.appendChild(row);
        table.appendChild(tableBody);
    });
}

const createChart = (data, num) => {
    let xValues = [];
    let yValues = [];
    if (num === 2) {
        data.map(item => {
            yValues.push(item.temperature);
            const date = item.date_time.substr(0,10);
            const time = item.date_time.substr(11,5);
            const dateTime = date + " " + time;
            xValues.push(dateTime);
        });
    }
    else if (num === 3) {
        data.map(item => {
            yValues.push(item.humidity_in);
            const date = item.date_time.substr(0,10);
            const time = item.date_time.substr(11,5);
            const dateTime = date + " " + time;
            xValues.push(dateTime);
        });
    }
    new Chart("chart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: yValues,
                backgroundColor: "#000",
                borderColor: "#000",    
            }]
        },
        options: {
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#000"
                    }
                },
                y: {
                    ticks: {
                        color: "#000"
                    }
                }
            }
        }
    });
}

const doStatistics = (data) => {
    var max = 0, min = 100;
    /* mean */
    var count = 0;
    data.map(item => {
        const array = Object.values(item);
        count += parseFloat(array[2], 10);

        /* range */
        if (array[2] < min) {
            min = Math.round(array[2] * 100) / 100;
        }
        if (array[2] > max) {
            max = Math.round(array[2] * 100) / 100;
        }
        document.getElementById("info-box-range").innerHTML = min + " - " + max;

    });
    const mean = count / 20;
    document.getElementById("info-box-mean").innerHTML = Math.round(mean * 100) / 100;

    /* median */
    const array = Object.values(data[9]);
    const array2 = Object.values(data[10]);
    const num = parseFloat(array[2]);
    const num2 = parseFloat(array2[2]);
    const median = (num + num2) / 2;
    document.getElementById("info-box-med").innerHTML = Math.round(median * 100) / 100;

    /* mode */
    var valueArray = [];
    for (var i = 0; i < 20; i++) {
        const array = Object.values(data[i]);
        valueArray.push(parseFloat(array[2]));
    }
    console.log(valueArray);
    valueArray.sort(function(a,b) {
        return a - b;
    });
    console.log(valueArray);

    const count2 = {};

    valueArray.forEach(item => {
        if (!(item in count2)) {
            count2[item] = 0;
        }
        count2[item]++;
    });

    let mode;
    let bestCount = 0;

    Object.entries(count2).forEach(([k, v]) => {
        if (v > bestCount) {
            mode = k;
            bestCount = v;
        }
    });

    document.getElementById("info-box-mode").innerHTML = Math.round(mode * 100) / 100;

    /* standard deviation */
    var counter = 0;
    data.map(item => {
        const array = Object.values(item);
        counter += (array[2] - mean) * (array[2] - mean);
    });
    const mean2 = counter / 20;
    const deviation = Math.sqrt(mean2);
    document.getElementById("info-box-dev").innerHTML = Math.round(deviation * 100) / 100;
}