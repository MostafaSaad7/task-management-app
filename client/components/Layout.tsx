import Head from 'next/head';
import Menu from './Menu';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? title : 'Task Management App'}</title>
        <meta
          name='description'
          content='An online tool that helps people collaborate and work together'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex gap-12'>
        <Menu />
        {children}
      </div>
    </>
  );
};
export default Layout;
