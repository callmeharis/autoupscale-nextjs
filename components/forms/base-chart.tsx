// import { useEffect, useRef } from 'react';
// import { Chart, registerables } from 'chart.js/auto';

// const BaseChart = () => {
//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null);

//   useEffect(() => {
//     Chart.register(...registerables);

//     const chartCanvas = chartRef.current.getContext('2d');

//     if (chartInstanceRef.current) {
//       // Destroy the previous chart instance if it exists
//       chartInstanceRef.current.destroy();
//     }

//     chartInstanceRef.current = new Chart(chartCanvas, {
//       type: 'bar',
//       data: {
//         labels: ['Customer', 'Investor', 'Cars'],
//         datasets: [
//           {
//             label: 'Data',
//             data: [10, 20, 30],
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });

//     // Cleanup function
//     return () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }
//     };
//   }, []);

//   return <canvas ref={chartRef} />;
// };

// export default BaseChart;


// import { useEffect, useRef } from 'react';
// import { Chart, registerables } from 'chart.js/auto';

// const PieChart = () => {
//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null);

//   useEffect(() => {
//     Chart.register(...registerables);

//     const chartCanvas = chartRef.current.getContext('2d');

//     if (chartInstanceRef.current) {
//       // Destroy the previous chart instance if it exists
//       chartInstanceRef.current.destroy();
//     }

//     chartInstanceRef.current = new Chart(chartCanvas, {
//       type: 'pie',
//       data: {
//         labels: ['Customer', 'Investor', 'Vehicles'],
//         datasets: [
//           {
//             data: [10, 20, 30],
//             backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
//             borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//       },
//     });

//     // Cleanup function
//     return () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }
//     };
//   }, []);

//   return <canvas ref={chartRef} />;
// };

// export default PieChart;

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js/auto';

const DonutChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        Chart.register(...registerables);

        const chartCanvas = chartRef.current.getContext('2d');

        if (chartInstanceRef.current) {
            // Destroy the previous chart instance if it exists
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [10, 20],
                        backgroundColor: ['red', 'blue'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                cutout: '60%', // Adjust the cutout percentage as needed
            },
        });

        // Cleanup function
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return <canvas ref={chartRef} />;
};

export default DonutChart;
