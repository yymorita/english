// import { client } from '../libs/client'
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';


// dayjs.extend(utc);
// dayjs.extend(timezone);
// const data = await client.get({ endpoint: 'english', queries: { fields: 'createdAt' } });

// // 日付データを日本時間に変換
// for (let i = 0; i < data.contents.length; i++) {
//     data.contents[i].createdAt = dayjs.utc(data.contents[i].createdAt).tz('Asia/Tokyo').format('YYYY-MM-DD')
// }

// const datelist = data.contents.map((element) => element.createdAt)
// const datelist_clean = datelist.filter(function (value, i, self) {
//     return self.indexOf(value) == i
// })
// console.log(datelist_clean)
// const datelist_body = datelist_clean.map((element) => [new Date(element), 1])
// const datelist_final = datelist_body.unshift([
//     {
//         type: "date",
//         id: "Date"
//     },
//     {
//         type: "number",
//         id: "Won/Loss"
//     }
// ])
// console.log(datelist_final)
    
// const datelist_final = 33
export const datelist_final = 33;