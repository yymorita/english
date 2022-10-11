const convertDateList = (dates) => {
    const dates_count = dates.reduce((acc, element) => {
        let date_count_element = { Date: element, Count: 1 };
        acc.find(value => value.Date === element)
            ? acc.slice(-1)[0].Count += 1
            : acc.push(date_count_element)
        return acc
    }, []);

    return dates_count;
}



export default convertDateList;