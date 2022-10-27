import { client } from '../../libs/client'
import Head from 'next/head'
import Layout from '../../components/layout'
import Link from 'next/link'


export default function Tags({ tags }) {
    return (
        <Layout>
            <Head>
                <title>Tags</title>
            </Head>
            <h1>Tags</h1>
            <ul>
                {tags.map((tag) => <li><Link href={`/tags/${tag}`}>{tag}</Link></li>)}
            </ul>
        </Layout>
    )
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
          snippet: string
        }[],
        totalCount: number,
        offset: number,
        limit: number
      } = await client.get({ endpoint: 'english', queries: { fields: 'tags', limit: 1024} });
    const taglist1 = data.contents.map((tag) => tag.tags[0])
    const taglist = taglist1.filter(function (value, i, self) {
        return self.indexOf(value) == i
    })
    return {
        props: {
            tags: taglist,
        },
    };
};