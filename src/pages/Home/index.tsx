import { DollarOutlined, ContainerOutlined } from "@ant-design/icons";
import { Card, Statistic, Space, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import FooterCard from "./footerCard/index";

const Home: React.FC = () => {
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
    <div className="bg-zinc-100 p-6">
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <div className="p-5">
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
        <FooterCard />
      </Space>
    </div>
  );
};

export default Home;
