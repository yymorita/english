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
            <span id={utilStyles.calendar}>{Moment(blog['date']).format('YYYY年MM月DD日')}</span>
            <div>
                {blog.tags.map((tag) => <Link href={`/tags/${tag}`}>{tag}</Link>)}
            </div>
            <hr></hr>
            <div
                dangerouslySetInnerHTML={{
                    __html: `${blog.contents}`,
                }}
            />
            <Link href={`/`}>ホームに戻る</Link>
        </Layout>
    );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY },
    };
    const limit = 1024
    const data = await fetch(`https://laprn.microcms.io/api/v1/english?limit=${limit}`, key)
        .then(res => res.json())
        .catch((err) => console.log(err));
    const paths = data.contents.map(content => `/posts/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
    const id = context.params.id;
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY },
    };
    
    const data = await fetch(
        'https://laprn.microcms.io/api/v1/english/' + id,
        key,
    )
        .then(res => res.json())
        .catch((err) => console.log(err));
    return {
        props: {
            blog: data,
        },
    };
};