// pages/blog/page/[id].js
import Link from 'next/link';
import Pagination from '../../components/pagination';
import Card from '../../components/card'
import Masonry from 'react-masonry-css'
import masonryStyle from '../../components/masonry.module.css'
import { breakpointColumnsObj } from '../../libs/breakpoint'
import Layout from '../../components/layout'


const PER_PAGE = 14;

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
    return (
        <Layout>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={masonryStyle.myMasonryGrid}
                columnClassName={masonryStyle.myMasonryGridColumn}
            >
                {blog.map(blog => <Card key={blog.id} id={blog.id} title={blog.title} date={blog.date} snippet={blog.snippet} tags={blog.tags} />)}
            </Masonry>
            <Pagination totalCount={totalCount} />
        </Layout>
    );
}

// 動的なページを作成
export const getStaticPaths = async () => {
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY }
    };

    const res = await fetch('https://laprn.microcms.io/api/v1/blog', key)

    const repos = await res.json();

    const pageNumbers = [];

    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/page/${repo}`)

    return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY }
    };

    const data = await fetch(
        `https://laprn.microcms.io/api/v1/english?offset=${(id - 1) * 5}&limit=15`,
        key
    ).then(res => res.json()).catch(() => null)
    return {
        props: {
            blog: data.contents,
            totalCount: data.totalCount
        }
    };
};