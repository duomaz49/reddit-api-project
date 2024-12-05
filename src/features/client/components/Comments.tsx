import {Button, Card, CardBody, Container} from "reactstrap";
import {useNavigate} from "react-router-dom";

export default function Comments() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center">
      <Card className="w-50 m-3 p-4">
        <CardBody className="text-start">

        </CardBody>
      </Card>
    </Container>
  )
}