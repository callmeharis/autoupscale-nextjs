import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js/auto';
import { useEffectAsync } from '@/utils/react';
import DashboardApi from '@/pages/api/dashboard';
import { EmptyData } from '@/components/empty-data';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import CompanyRoutes from '@/routes/company.route';

const Charts = () => {
  const [graphData, setGraphData] = useState();
  useEffectAsync(async () => {
    try {
      const dashboardApi = new DashboardApi();
      const data = await dashboardApi.list();
      setGraphData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
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
            data: [graphData?.reserved_vehicles, graphData?.available_vehicles, graphData?.in_service],
            backgroundColor: ['red', 'blue', 'green'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)'],
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
  }, [graphData?.reserved_vehicles, graphData?.available_vehicles]);

  return (
    <>
      {/* <div className='flex'>
        <div className="h-40 w-40 container m-0 p-0 ">
          <canvas ref={chartRef} />
        </div>

        <div className="flex flex-col space-y-6 mt-3 mx-3">
          <div className="flex">
            <span className='w-5 h-5 mr-3 flex-shrink-0 rounded-full ' style={{ background: '#ff0000' }}></span>
            <h1 className='font-semibold '>{graphData?.reserved_vehicles}</h1>  <h1 className="font-semibold mx-3">
              Reserved Vehicle
            </h1>

          </div>
          <div className="flex">
            <span className='w-5 h-5 mr-3 flex-shrink-0 rounded-full ' style={{ background: 'blue' }}></span>
            <h1 className='font-semibold '>{graphData?.available_vehicles}</h1>  <h1 className="font-semibold mx-3">
              Available Vehicle
            </h1>

          </div>
        </div>
      </div> */}
      <div className='flex md:flex-row flex-col'>
        <div className="h-40 w-40 container  md:m-0 p-0 ">
          <canvas ref={chartRef} />
        </div>

        {!!Boolean(graphData?.reserved_vehicles || graphData?.available_vehicles || graphData?.in_service) ?
          <div className="flex flex-col space-y-6 mt-3 mx-3">
            <div className="flex md:justify-start justify-center">
              <span className='w-5 h-5 mr-3 flex-shrink-0 rounded-full ' style={{ background: '#ff0000' }}></span>
              <h1 className='font-semibold text-md'>{graphData?.reserved_vehicles}</h1>  <h1 className="font-semibold mx-3 md:text-md text-sm">
                Reserved Vehicle
              </h1>

            </div>
            <div className="flex md:justify-start justify-center">
              <span className='w-5 h-5 mr-3 flex-shrink-0 rounded-full ' style={{ background: 'blue' }}></span>
              <h1 className='font-semibold '>{graphData?.available_vehicles}</h1>  <h1 className="font-semibold mx-3 md:text-md text-sm">
                Available Vehicle
              </h1>

            </div>
            <div className="flex md:justify-start justify-center">
              <span className='w-5 h-5 mr-3 flex-shrink-0 rounded-full ' style={{ background: 'green' }}></span>
              <h1 className='font-semibold '>{graphData?.in_service}</h1>  <h1 className="font-semibold mx-3 md:text-md text-sm">
                In Maintenance
              </h1>

            </div>
          </div>
          : (
            <>

              <div className='flex flex-col justify-center items-center'>
              <EmptyData title='NO Data Available Yet' />
                <Button className="bg-btn-100 mt-4 "><Link href={CompanyRoutes.vehicle.create}>Add Vehicle</Link></Button>
              </div>

            </>
          )
        }
      </div>
    </>
  );
};

export default Charts;
