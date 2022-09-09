import Head from 'next/head'
import Header from '../header'

const AppLayout = ({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) => {
  return (
    <>
      <Head>
        <title>{title ?? 'Ingen - Manage your time efficiently'}</title>
      </Head>

      <Header />
      <main className="mx-auto w-11/12 md:max-w-screen-md">{children}</main>
    </>
  )
}

export default AppLayout
