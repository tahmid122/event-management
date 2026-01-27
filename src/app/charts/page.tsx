import React from "react";
import MyChart from "./MyChart";
import { ChartAreaInteractive } from "./AreaChart";

const Charts = () => {
  return (
    <section className="py-10  container">
      <MyChart />
      <ChartAreaInteractive />
    </section>
  );
};

export default Charts;
