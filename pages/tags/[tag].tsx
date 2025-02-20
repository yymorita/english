import Head from 'next/head'
import Layout from '../../components/layout'
import Masonry from 'react-masonry-css'
import masonryStyle from '../../components/masonry.module.css'
import Card from '../../components/card'
import { breakpointColumnsObj } from '../../libs/breakpoint'


export default function TagId({ posts, tag }) {
    return(
        <Layout>
            <Head>
                <title>{ tag }</title>
            </Head>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={masonryStyle.myMasonryGrid}
                columnClassName={masonryStyle.myMasonryGridColumn}>
                {posts.map((post) => <Card id={post.id} title={post.title} date={post.createdAt} snippet={post.contents.slice(0, 300) + "..."} tags={post.tags}/>)}
            </Masonry>
        </Layout>
    )
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY },
    };
    const limit = 2048
    const data = await fetch(`https://laprn.microcms.io/api/v1/english?limit=${limit}`, key)
        .then(res => res.json())
        .catch(() => null);
    const paths = data.contents.map(content => `/tags/${content.tags}`);
    console.log(paths)
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
    const tag = context.params.tag
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY },
        // params : { 'filters': `tags[contains]${encodeURI(tag)}`},
    };
    const limit = 2048
    console.log(tag)
    const data = await fetch(
        `https://laprn.microcms.io/api/v1/english/?limit=${limit}&filters=tags[contains]${encodeURI(tag)}`,
        key
    )
        .then(res => res.json())
        .catch((err) => err);
    return {
        props: {
            posts: data.contents,
            tag: tag
        },
    };
};