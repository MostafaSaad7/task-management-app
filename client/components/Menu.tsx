import Logo from './Logo';
import Nav from './Nav';
import UserCard from './UserCard';

const Menu = () => {
  return (
    <section className='h-screen px-4 w-1/3 max-w-xs bg-light-gray flex flex-col justify-between'>
      <div>
        <Logo />
        <div className='mt-36'>
          <Nav />
        </div>
      </div>
      <UserCard />
    </section>
  );
};
export default Menu;
