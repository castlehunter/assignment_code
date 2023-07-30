import { Container, Nav, Navbar, Form, Button} from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from "react";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken,removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  let token = readToken();

  const [isExpanded, setExpanded] = useState(false);
  const [searchHisotry, setSearchHistory] = useAtom(searchHistoryAtom)

  function logout() {
    setExpanded(false);
    removeToken();
    router.push('/');
  }

  async function submitForm(e){
    e.preventDefault();
    const work=e.target.searchField.value;
    if (!work) {
      return; 
    }
    const queryString=`title=true&q=${work}`;
    router.push(`/artwork?${queryString}`);
    setExpanded(false);
    setSearchHistory(await addToHistory(queryString));
  }

  function toggle() {
    setExpanded(!isExpanded);
  }

    return (
    <>
    <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded}>
      <Container>
        <Navbar.Brand>Qing Zhang</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
             <Link href="/" passHref legacyBehavior>
               <Nav.Link active={router.pathname==="/"} onClick={() => setExpanded(false)}>Home</Nav.Link>
             </Link>
            {token && <Link href="/search" passHref legacyBehavior>
               <Nav.Link active={router.pathname==="/search"} onClick={() => setExpanded(false)}>Advanced Search</Nav.Link>
             </Link>}
          </Nav>
          &nbsp;
          {token && <Form className="d-flex" onSubmit={submitForm}>
             <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" name="searchField" />
             <Button variant="success" type="submit">Search</Button>
          </Form>}
          &nbsp;

          {token &&
            <Nav>
             <NavDropdown title={token.userName} id="basic-nav-dropdown">
               <Link href="/favourites" passHref legacyBehavior>
                 <NavDropdown.Item active={router.pathname==="/favourites"} onClick={() => setExpanded(false)}>Favourites</NavDropdown.Item>
               </Link>
               <Link href="/history" passHref legacyBehavior>
                 <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setExpanded(false)}>Search Hisotry</NavDropdown.Item>
               </Link>
               <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>          
             </NavDropdown>
            </Nav>}
  
          <Nav>
                {!token &&  <Link href="/register" legacyBehavior passHref>
                    <Nav.Link onClick={toggle} active={router.pathname === "/register"}> Register</Nav.Link>
                 </Link> }             
                  {/* &nbsp; */}
                {!token &&  <Link href="/login" legacyBehavior passHref>
                    <Nav.Link onClick={toggle} active={router.pathname === "/Login"}> Login</Nav.Link>
                </Link> }     
          </Nav> 

        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br />
    <br />
    </>
    )
}