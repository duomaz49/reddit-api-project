import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader
} from "reactstrap"
import { FaReddit } from "react-icons/fa"
import { useState } from "react"
import SubReddits from "../components/SubReddits"

export default function NavBar(args) {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)

  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen)

  return (
    <Navbar {...args} fixed="top" color="warning" light>
      <NavbarBrand href="/">
        <FaReddit className="me-2" style={{ fontSize: 40 }} />Reddit Minimal
      </NavbarBrand>
      <NavbarToggler onClick={toggleOffcanvas} />

      <Offcanvas isOpen={isOffcanvasOpen} direction="end" toggle={toggleOffcanvas}>
        <OffcanvasHeader
          className="bg-warning-subtle"
          toggle={toggleOffcanvas}>SubReddits</OffcanvasHeader>
        <OffcanvasBody
          className="bg-warning-subtle">
          <Nav navbar>
            <SubReddits
              toggleOffcanvas={toggleOffcanvas}
            />
          </Nav>
        </OffcanvasBody>
      </Offcanvas>
    </Navbar>
  )
}