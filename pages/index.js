import { client } from '../libs/client'
import Card from '../components/card'
import Layout from '../components/layout'
import Masonry from 'react-masonry-css'
import masonryStyle from '../components/masonry.module.css'

export default function Home({ blog }) {
  return (
    <Layout>
      <Masonry
        breakpointCols={2}
        className={masonryStyle.myMasonryGrid}
        columnClassName={masonryStyle.myMasonryGridColumn}>
        {blog.map((blog) => <Card id={blog.id} title={blog.title} date={blog.date} snippet={blog.snippet} />)}
      </Masonry>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'english', queries: { orders: '-date' } });

  return {
    props: {
      blog: data.contents,
    },
  };
};