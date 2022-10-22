import Router from 'next/router';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css'

function Pagination ({ totalCount }) {
    const PER_PAGE = 14;

    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

    return (
        <ul className={utilStyles.ul_pagination}>
            {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
                <li key={index} className={utilStyles.pagination}>
                    <Link href={`/page/${number}`}>
                        <a>{number}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Pagination