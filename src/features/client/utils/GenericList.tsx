import { ListGroup, ListGroupItem } from "reactstrap"
import { FaReddit } from "react-icons/fa"

interface GenericListProps<T> {
  items: T[];
  onItemClick: (item: T) => void;
  title?: string;
  selected?: string;
  buttonClassName?: string;
  listAsRowClassName?: string;
}

export default function GenericList<T>(props: GenericListProps<T>) {
  const { items, onItemClick, title, buttonClassName, listAsRowClassName, selected } = props
  return (
    <>
      <h6 className="text-center mt-4 mb-4">{title}</h6>
      <ListGroup className={listAsRowClassName}>
        {items?.map((item) => (
          <ListGroupItem
            key={item.id}
            onClick={() => onItemClick(item.url)}
            className={`${selected === item.url ? "bg-secondary-subtle" : buttonClassName} d-flex justify-content-start align-items-center border rounded-pill mb-2`}>
            {item.icon_img ? <img
              src={item.icon_img}
              alt={`${item.display_name}`}
              className="img-fluid"
              style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight: "10px" }}
            /> :
              <FaReddit className="me-1" style={{ fontSize: 40, color: "red" }} />
            }
            {item.display_name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  )
}