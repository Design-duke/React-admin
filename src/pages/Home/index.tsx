import { DollarOutlined, ContainerOutlined } from "@ant-design/icons";
import { Card, Statistic, Space, Row, Col } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import LineChart from "./lineChart";
import ColumnChart from "./columnChart";
import FooterCard from "./footerCard/index";

import styles from "./index.module.less";

function Home() {
  const [cardTitle, setCardTitle] = useState([
    {
      title: "今日订单总数",
      value: 110,
      prefix: <ContainerOutlined style={{ color: "rgb(18,150,219)" }} />,
    },
    {
      title: "今日销售总额",
      value: 213.06,
      prefix: <DollarOutlined style={{ color: "rgb(18,150,219)" }} />,
    },
    {
      title: "昨日销售总额",
      value: 3333.66,
      prefix: <DollarOutlined style={{ color: "rgb(18,150,219)" }} />,
    },
  ]);

  const formatter: any = (value: number) => (
    <CountUp end={value} separator="," decimals={2} />
  );

  useEffect(() => {}, []);

  return (
    <div className={styles.boxWrapper}>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <div className={styles.siteCardWrapper}>
          <Row gutter={16}>
            {cardTitle.map((item) => (
              <Col span={8} key={item.title}>
                <Card title={item.title} bordered={false}>
                  <Statistic
                    precision={2}
                    value={item.value}
                    prefix={item.prefix}
                    formatter={formatter}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <LineChart />
        <ColumnChart />
        <FooterCard />
      </Space>
    </div>
  );
}

export default Home;
