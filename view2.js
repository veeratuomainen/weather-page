"use strict";

const API_URL = "http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature";

const fetchTempData = async() => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        populateTable(data, 2);
        createChart(data, 2);
        doStatistics(data);
    } catch (error) {
        console.log(error);
    }
}

fetchTempData();