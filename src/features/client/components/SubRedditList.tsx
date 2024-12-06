import { ListGroup, ListGroupItem } from "reactstrap"
import { FaReddit } from "react-icons/fa"

interface SubRedditListProps{
  subReddits: any[];
  handleSubRedditSelect: (subReddit: string) => void;
  selected?: string;
}

export default function SubRedditList(props: SubRedditListProps) {
  const { subReddits, handleSubRedditSelect, selected } = props
  return (
    <>
      <h6 className="text-center mt-4 mb-4">SubRe<span className="text-danger">dd</span>its</h6>
      <ListGroup className='list-group'>
        {subReddits?.map((subReddit) => (
          <ListGroupItem
            key={subReddit.id}
            onClick={() => handleSubRedditSelect(subReddit.url)}
            className={`${selected === subReddit.url ? "bg-secondary-subtle" : 'btn btn-light'} d-flex justify-content-start align-items-center border rounded-pill mb-2 shadow-sm`}>
            {subReddit.icon_img ?
              <img
              src={subReddit.icon_img}
              alt={`${subReddit.display_name}`}
              className="img-fluid"
              style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight: "10px" }}
            /> :
              <FaReddit className="me-1" style={{ fontSize: 40, color: "red" }} />
            }
            {subReddit.display_name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  )
}