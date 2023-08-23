import { Col, Row, Card, Statistic } from "antd";

import styles from "./index.module.less";
const FooterCard = () => {
  const gridStyle: React.CSSProperties = {
    width: "33.3%",
    textAlign: "center",
    cursor: "pointer",
  };
  const product = [
    { title: "已下架", value: 0 },
    { title: "已上架", value: 6966 },
    { title: "全部商品", value: 9999 },
  ];
  const customer = [
    { title: "昨日新增", value: 0 },
    { title: "本月新增", value: 6966 },
    { title: "会员总数", value: 138235 },
  ];

  return (
    <div className={styles.productOverviewBox}>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="商品总览">
            {product.map((item) => (
              <Card.Grid key={item.title} style={gridStyle}>
                <Statistic
                  title={item.title}
                  value={item.value}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card.Grid>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="客户总览">
            {customer.map((item) => (
              <Card.Grid key={item.title} style={gridStyle}>
                <Statistic
                  title={item.title}
                  value={item.value}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card.Grid>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FooterCard;
