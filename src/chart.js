import React from 'react';
import { Pie } from 'react-chartjs-2';

import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);


const PieChart = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: [
                    '#777777',
                    '#d9dc40',
                    '#AA3333',
                    '#4BC0C0',
                    '#FA6384',
                ],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;