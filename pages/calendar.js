import { client } from '../libs/client'
import dayjs from 'dayjs'
import Layout from '../components/layout'


export default function Home({ achvmnts }) {
    const a = achvmnts.map((post) => post.count)
  return (
    <Layout>
      { a }
    </Layout>
  );
}

const convertDateList = (dateList) => {
    let noDuplicateList = [];
    const newDateList = dateList.reduce((acc, obj) => {
        obj.count = 1;
        let key = obj['createdAt'];
        if (noDuplicateList.includes(key)) {
            let current_count = acc.slice(-1)[0].count;
            // let index = acc.findIndex((v) => v.createdAt === key && v.count === current_count);
            let index = acc.findIndex((v) => dayjs(v.createdAt).isSame(dayjs(key), 'day') && v.count === current_count);
            acc[index].count += 1;
        } else {
            acc.push(obj);
            noDuplicateList.push(key);
        }
        return acc;
    }, []);
    return newDateList;
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'english', queries: {limit: 550, fields: 'createdAt'}});
  let contents = data.contents;

  let format_contents = contents.map(obj => ({Date: dayjs(obj.createdAt).toDate()}))
  let achvmnts = convertDateList(format_contents)
  console.log(achvmnts)
  return {
    props: {
        achvmnts: achvmnts,
    },
  };
};