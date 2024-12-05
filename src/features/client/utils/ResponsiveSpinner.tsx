import { Spinner } from "reactstrap"

export default function ResponsiveSpinner() {
  return (
    <Spinner
      color="success"
      className="m-auto"
      style={{
        width: "20vw",
        height: "20vw",
        maxWidth: "10rem",
        maxHeight: "10rem"
      }}
    />
  )
}