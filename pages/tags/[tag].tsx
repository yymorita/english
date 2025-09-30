import { client } from '../../libs/client'
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

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
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
          snippet: string
        }[],
        totalCount: number,
        offset: number,
        limit: number
      } = await client.get({ endpoint: 'english', queries: { limit: 512} });
      const paths = data.contents.map(content => `/tags/${content.tags}`);
      return { paths, fallback: false}
    };

// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps = async context => {
    const tag = context.params.tag
    const data = await client.get({ endpoint: 'english', queries: { limit: 512, filters: `tags[contains]${tag}`} });
      return { 
        props: {
            posts: data.contents,
            tag: tag
        },
      };
    };