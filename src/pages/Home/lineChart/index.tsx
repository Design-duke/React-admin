import { Line } from "@ant-design/plots";
import { useEffect, useState } from "react";

const LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config: any = {
    data,
    xField: "year",
    yField: "gdp",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v: number) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
    color: ["#1677FF", "#5A54F9", "#9E339F", "#ED4192", "#E0282E"],
  };

  return <Line style={{ height: "300px" }} {...config} />;
};

export default LineChart;
