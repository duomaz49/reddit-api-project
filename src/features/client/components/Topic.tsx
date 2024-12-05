import {Button, Card, CardBody, Container} from "reactstrap";
import {useNavigate} from "react-router-dom";

export default function Topic() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center">
      <Card className="w-50 m-3 p-4">
        <CardBody className="text-start">
          <h1 className="text-center">Topic</h1>
        </CardBody>
      </Card>
    </Container>
  )
}