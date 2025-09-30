import { client } from '../../libs/client'
import Pagination from '../../components/pagination';
import Card from '../../components/card'
import Masonry from 'react-masonry-css'
import masonryStyle from '../../components/masonry.module.css'
import { breakpointColumnsObj } from '../../libs/breakpoint'
import Layout from '../../components/layout'


const PER_PAGE = 14;
const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
    return (
        <Layout>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={masonryStyle.myMasonryGrid}
                columnClassName={masonryStyle.myMasonryGridColumn}
            >
                {blog.map(blog => <Card key={blog.id} id={blog.id} title={blog.title} date={blog.createdAt} snippet={blog.contents.slice(0, 300) + "..."} tags={blog.tags} />)}
            </Masonry>
            <Pagination totalCount={totalCount} />
        </Layout>
    );
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: 'english', queries: { limit: 2048 } });
    const paths = range(1, Math.ceil(data.totalCount / PER_PAGE)).map((repo) => `/page/${repo}`)
    return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: 'english', queries: { offset: (id - 1) * PER_PAGE, limit: PER_PAGE } });
    return {
        props: {
            blog: data.contents,
            totalCount: data.totalCount
        },
    };
};