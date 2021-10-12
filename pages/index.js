import { client } from '../libs/client'
import Card from '../components/card'
import Layout from '../components/layout'
import Masonry from 'react-masonry-css'
import masonryStyle from '../components/masonry.module.css'
import Link from 'next/link'
import { breakpointColumnsObj } from '../libs/breakpoint'
import utilStyles from '../styles/utils.module.css'
import Pagination from '../components/pagination'

export default function Home({ blog, totalCount }) {
  const cards = blog.map((blog) => <Card key={blog.id} id={blog.id} title={blog.title} date={blog.date} snippet={blog.snippet} tags={blog.tags} />)
  return (
    <Layout>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={masonryStyle.myMasonryGrid}
        columnClassName={masonryStyle.myMasonryGridColumn}
      >
        {cards}
        <Pagination totalCount={totalCount} />

      </Masonry>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'english', queries: { orders: '-createdat', limit: 14 } });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount
    },
  };
};