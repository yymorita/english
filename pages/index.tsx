import { client } from '../libs/client'
import Card from '../components/card'
import Layout from '../components/layout'
import Masonry from 'react-masonry-css'
import masonryStyle from '../components/masonry.module.css'
import Link from 'next/link'
import { breakpointColumnsObj } from '../libs/breakpoint'
import utilStyles from '../styles/utils.module.css'
import Pagination from '../components/pagination'

export default function Home({ blogs, totalCount }) {
  const cards = blogs.map((blog) => <Card key={blog.id} id={blog.id} title={blog.title} date={blog.createdAt} snippet={blog.contents.slice(0, 300) + "..."} tags={blog.tags} />)
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
  const data: {
    contents: {
      id: string,
      createdAt: string,
      updatedAt: string,
      publishedAt: string,
      revisedAt: string,
      title: string,
      contents: string,
      tags: string[],
      // snippet: string
    }[],
    totalCount: number,
    offset: number,
    limit: number
  } = await client.get({ endpoint: 'english', queries: { orders: '-createdat', limit: 14 } });
  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount
    },
  };
};