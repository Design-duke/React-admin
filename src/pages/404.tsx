import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function Resul() {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("Home");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={backHome}>
          Back Home
        </Button>
      }
    />
  );
}

export default Resul;
