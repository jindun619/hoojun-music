import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en" data-theme="emerald">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/asset/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/asset/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/asset/favicon-16x16.png"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
