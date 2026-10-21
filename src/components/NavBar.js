import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <NavLink to="/" end>Trang chủ</NavLink>
    <NavLink to="/contacts" end>Danh sách</NavLink>
    <NavLink to="/contacts/new">Thêm mới</NavLink>
  </nav>
);

export default NavBar;
