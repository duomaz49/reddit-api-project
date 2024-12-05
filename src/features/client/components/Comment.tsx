import type { IComment } from "../../../types/Coment"
import { Card, CardBody, Col, Row } from "reactstrap"
import moment from "moment"
interface CommentProps {
  comment: IComment;
}

export default function Comment(props: CommentProps) {
  const { comment } = props
  return (
    <Card className='m-2'>
      <CardBody>
        <Row className='mb-2'>
          <Col className="d-flex justify-content-between">
            <div className="fw-bold text-start">{props.comment.author}</div>
            <div className="text-end">{moment.unix(comment.created_utc).fromNow()}</div>
          </Col>
        </Row>
        <div className='text-start'>{props.comment.body}</div>
      </CardBody>
    </Card>
  )
}