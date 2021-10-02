import React, { useReducer } from 'react'
// import { client } from '../libs/client'
import { render } from 'react-dom'
// import { Chart } from "react-google-charts"
import Layout from '../components/layout'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { datelist_final } from '../components/getdatelist';


const data = [
    [
        {
            type: "date",
            id: "Date"
        },
        {
            type: "number",
            id: "Won/Loss"
        }
    ],
    [new Date(2021, 9, 25), 0],
    [new Date(2021, 9, 26), 1],
    [new Date(2021, 9, 27), 1],
    [new Date(2021, 9, 28), 1],
    [new Date('2021-09-29'), 1],

];
export default class AchievementChart extends React.Component {
    render() {
        return (
            <Layout>
                {/* <div className={"my-pretty-chart-container"}>
                    <Chart
                        chartType="Calendar"
                        width="100%"
                        height="400px"
                        data={data}
                        options={{
                            title: '学習達成率',
                        }}
                    />
                </div> */}
                {/* {datelist_final} */}
                {datelist_final}
            </Layout>
        )
    }
}

// export const getStaticProps = async () => {
//     dayjs.extend(utc);
//     dayjs.extend(timezone);
//     const data = await client.get({ endpoint: 'english', queries: { fields: 'createdAt' } });

//     // 日付データを日本時間に変換
//     for (let i = 0; i < data.contents.length; i++) {
//         data.contents[i].createdAt = dayjs.utc(data.contents[i].createdAt).tz('Asia/Tokyo').format('YYYY-MM-DD')
//     }
//     const datelist = data.contents.map((element) => element.createdAt)
//     const datelist_clean = datelist.filter(function (value, i, self) {
//         return self.indexOf(value) == i
//     })
//     console.log(datelist)
//     const datelist_final = datelist_clean.map((element) => [new Date(element), 1])
//     console.log(datelist_final)
//     return {
//         props: {
//             datelist: datelist_clean,
//         },
//     };
// };