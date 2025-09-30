import { client } from '../../libs/client'
import Head from 'next/head'
import Layout from '../../components/layout'
import Moment from 'moment'
import Link from 'next/link'
import utilStyles from '../../styles/utils.module.css'

export default function BlogId({ blog }) {
    return (
        <Layout>
            <Head>
                <title>{blog.title}</title>
            </Head>
            <h1>{blog.title}</h1>
            <span id={utilStyles.calendar}>Posted At: {Moment(blog['createdAt']).format("ddd, MMM DD YYYY")}</span>
            <div className={utilStyles.postBorderBottom}>
                <span id={utilStyles.tags}>{blog.tags.map((tag) => <Link href={`/tags/${tag}`}> {tag}</Link>)}</span>
            </div>
            <div
                dangerouslySetInnerHTML={{
                    __html: `${blog.contents}`,
                }}
            />
            <Link href={'/'}>ホームに戻る</Link>
        </Layout>
    );
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: 'english', queries: { limit: 2048 } });
    const paths = data.contents.map(content => `/posts/${content.id}`);
    return { paths, fallback: false };
}

export const getStaticProps = async context => {
    const id = context.params.id;
    const data = await client.get({ endpoint: 'english', contentId: id });
    return {
        props: {
            blog: data,
        },
    };
}