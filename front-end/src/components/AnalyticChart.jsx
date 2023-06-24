import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';



export const AnalyticChart = ({data}) => {
  const ref = useRef();

  const chartData = {
    labels: data.label,
    datasets: [
      {
        label: 'Penggunaan',
        data: data.data,
        borderColor: '#F59E0B',
        backgroundColor: '#F59E0B',
      },
    ],
  };

  useEffect(() => {
    console.log(data);
  }, [])

  return (
    <div className="w-full m-0">
      <Line data={chartData} ref={ref} width={'100%'} height={300} options={{maintainAspectRatio: false}} />
    </div>
  );
}