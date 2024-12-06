import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader
} from "reactstrap"
import { FaArrowRight, FaReddit } from "react-icons/fa"
import { useState } from "react"
import SubReddits from "../components/SubReddits"

export default function NavBar(args) {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)

  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen)

  return (
    <Navbar {...args} fixed="top" color="warning" light className="d-flex flex-nowrap justify-content-between align-items-center">
      <NavbarBrand href="/" className="d-flex align-items-center">
        <FaReddit className="me-2" style={{ fontSize: 40 }} />
        Re<span className="text-danger">dd</span>it Minimal
      </NavbarBrand>
      <div className="d-flex align-items-center ms-auto">
        <span className="me-3 d-flex align-items-center">
          Choose a category <FaArrowRight className='ms-2' />
        </span>
        <NavbarToggler onClick={toggleOffcanvas} />
      </div>
      <Offcanvas isOpen={isOffcanvasOpen} direction="end" toggle={toggleOffcanvas}>
        <OffcanvasHeader className="bg-warning-subtle" toggle={toggleOffcanvas}>
          SubRe<span className="text-danger">dd</span>it categories
        </OffcanvasHeader>
        <OffcanvasBody className="bg-warning-subtle">
          <Nav navbar>
            <SubReddits toggleOffcanvas={toggleOffcanvas} />
          </Nav>
        </OffcanvasBody>
      </Offcanvas>
    </Navbar>
  );
};