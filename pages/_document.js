
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {


    render() {
        return (
            <Html lang='en'>
                <Head>
                    <style>{`body { margin: 0 } /* custom! */`}</style>

                </Head>

                <body>
                    <Main />
                </body>
                <NextScript />
            </Html>
        )
    }
}