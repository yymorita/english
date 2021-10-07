import { client } from '../libs/client'
import Card from '../components/card'
import Layout from '../components/layout'
import Masonry from 'react-masonry-css'
import masonryStyle from '../components/masonry.module.css'
import Link from 'next/link'
import { breakpointColumnsObj } from '../libs/breakpoint'
import utilStyles from '../styles/utils.module.css'

export default function Home({ blog }) {
  const cards = blog.map((blog) => <Card key={blog.id} id={blog.id} title={blog.title} date={blog.date} snippet={blog.snippet} tags={blog.tags} />)
  return (
    <Layout>
      <div className={utilStyles.rightSide}><Link href={'/tags'}>タグ</Link> <Link href='https://klcal.netlify.app/'>カレンダー</Link></div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={masonryStyle.myMasonryGrid}
        columnClassName={masonryStyle.myMasonryGridColumn}
      >
        {cards}
      </Masonry>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'english', queries: { orders: '-createdat' } });

  return {
    props: {
      blog: data.contents,
    },
  };
};