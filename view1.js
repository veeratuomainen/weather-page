"use strict";

const API_URL = "http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50";

const fetchLatestData = async() => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        populateTable(data, 1);
    } catch (error) {
        console.log(error);
    }
}

fetchLatestData();