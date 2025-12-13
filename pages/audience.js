import Head from 'next/head'
import Audience from '../components/Audience'

// Page component must not share the same name as the imported UI component.
export default function AudiencePage() {
  return (
    <>
      <Head>
        <title>Audience Analytics</title>
        <meta name="description" content="Audience metrics skeleton for TikTok and YouTube" />
      </Head>

      <Audience />
    </>
  )
}

