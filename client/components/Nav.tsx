import NavElem from './NavElem';

const navElements = [
  {
    label: 'Boards',
    route: '/boards',
  },
  {
    label: 'Settings',
    route: '/settings',
  },
];

const Nav = () => {
  return (
    <nav className='flex flex-col gap-1'>
      {navElements.map(({ label, route }) => (
        <NavElem key={label} route={route}>
          {label}
        </NavElem>
      ))}
    </nav>
  );
};
export default Nav;
