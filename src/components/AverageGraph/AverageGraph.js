import React from "react"
// import { Bar } from "@vx/shape"
// import { Group } from "@vx/group"
// import { scaleBand, scaleLinear } from "@vx/scale"
// import Button from "../button"
import _ from "lodash"
import Graph from '../Graph';
import moment from "moment"

import getData from "../ChangeGraph/data"

function getAverageByMonth() {
  const data = getData();
  const byMonth = data.reduce((acc, week, i) => {

    if (i === 0) {
      return acc;
    }    

    const { date, insertions, deletions } = week;
    const prevWeek = data[i - 1];

    const yearMonth = moment(date).format("YYYY-MM");
    const nextYearMonth = moment(prevWeek.date).format("YYYY-MM");
    const lastWeek = acc.length - 1;

    if (yearMonth !== nextYearMonth) {
      acc.push({
        date: `${yearMonth}-01`,
        change: [insertions - deletions]
      });
    } else if (!!acc[lastWeek]) {

      acc[lastWeek] = {
        date: acc[lastWeek].date,
        change: [...acc[lastWeek].change, insertions - deletions]
      }
    }
    
    return acc;
  }, []);

  const averageByMonth = byMonth.map((month) => {
    return { ...month, averageChanges: month.change.reduce((a,b) => a + b, 0) / month.change.length}
  })

  return averageByMonth;
}
const avg = getAverageByMonth();

function AverageGraph() {
  const [date, setDate] = React.useState(avg[avg.length - 1].date);
  
  const day = React.useMemo(() => {
    return _.find(avg, ['date', date]);
  }, [date])
  
  return (
    <>
      <h1>Average CSS Changes Per Week</h1>
      <Graph dataSet={avg} xKey="averageChanges" onClick={setDate} />
      <div style={{ textAlign: "center" }}>
        <div>Date: {date}</div>
        <div>Average Changes: <strong>{day.averageChanges}</strong></div>
        <div>(Insertions – Deletions)</div>
      </div>
    </>
  )
}

export default AverageGraph;