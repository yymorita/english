import { client } from '../libs/client'
import dayjs from 'dayjs'
import Layout from '../components/layout'
import * as d3 from 'd3'
import * as React from 'react'
import convertDateList from '../libs/convertDateList'
import { Calendar } from '../components/calendar'


export default function Chart({ achvmnts }) {
  const date_list = achvmnts.map(v => ({ Date: new Date(v.Date), count: v.count }))
  return (
    <Layout>

    </Layout>
  );
}

export const getStaticProps = async () => {
  const limit = 128
  const data = await client.get({ endpoint: 'english', queries: { limit: limit, fields: 'createdAt' } });
  let contents = data.contents;
  let total_post = data.totalCount;
  console.log(total_post)

  let max_off_set = Math.floor(total_post / limit)
  for (let i = 0; i < max_off_set; i++) {

  }

  let format_contents = contents.map(obj => dayjs(obj.createdAt).format('YYYY-MM-DD'))
  let achvmnts = convertDateList(format_contents)

  console.log(achvmnts)
  return {
    props: {
      achvmnts: achvmnts,
    },
  };
};