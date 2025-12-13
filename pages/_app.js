import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Head from 'next/head'
import Header from '../components/Header'

export default function MyApp({ Component, pageProps }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nickaferd.dev'
  const siteTitle = 'Nickaferd — Theme Parks, Disney and More'
  const siteDescription = 'Nickaferd — media kit website for Nick, a content creator focused on theme parks, Disney, and travel.'

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon_io/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />

        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Social / SEO defaults (page-level Head can override) */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />

        <meta property="og:site_name" content="Nickaferd" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/favicon_io/android-chrome-512x512.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${siteUrl}/favicon_io/android-chrome-512x512.png`} />

        {/* Structured data (Organization / Person) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Nick",
          "url": siteUrl,
          "sameAs": [
            "https://www.tiktok.com/@nickaferd",
            "https://www.youtube.com/@nickaferd"
          ]
        }) }} />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
