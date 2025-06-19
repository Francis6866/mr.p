import React from 'react'
import { LineChart } from '@mui/x-charts'; // Importing the dataset for the graph
import { dataset } from './basicDataset';

const LineGraph = () => {
  return (
    <>
        <LineChart
          dataset={dataset}
          xAxis={[{ dataKey: 'x' }]}
          series={[{ dataKey: 'y' }]}
          height={300}
          grid={{ vertical: true, horizontal: true }}
        />
    </>
  )
}

export default LineGraph