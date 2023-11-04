import Link from 'next/link';

const Header = () => {
  const routes = {
    Home: '/',
    Tasks: '/tasks',
  };

  return (
    <header className='mx-auto mb-6 flex w-11/12 items-center justify-between py-6 md:max-w-screen-md'>
      <h3 className='font-bold dark:text-white'>Ingen.</h3>
      <nav className='flex items-center justify-start'>
        {Object.entries(routes).map(([title, link], i) => (
          <Link key={i} href={link} className='mx-4 text-sm dark:text-white/80'>
            {title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
