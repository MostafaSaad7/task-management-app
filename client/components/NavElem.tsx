import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavElemPorps {
  children: React.ReactNode;
  route: string;
}

const NavElem = ({ children, route }: NavElemPorps) => {
  const router = useRouter();

  const activeRoute = router.pathname === route;

  return (
    <div
      className={`py-2 font-semibold cursor-pointer rounded-md ${
        activeRoute ? 'bg-gray pl-6 text-black' : 'pl-4'
      }`}
    >
      <Link href={route}>{children}</Link>
    </div>
  );
};
export default NavElem;
