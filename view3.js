"use strict";

const API_URL = "http://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_in";

const fetchHumidData = async() => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        populateTable(data, 3);
        createChart(data, 3);
        doStatistics(data);
    } catch (error) {
        console.log(error);
    }
}

fetchHumidData();