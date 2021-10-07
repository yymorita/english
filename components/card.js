import Link from 'next/link'
import Moment from 'moment'
import utilStyles from '../styles/utils.module.css'


function Card(props) {
        return (
            <div className='card'>
                <h2><Link href={`/posts/${props.id}`}>{props.title}</Link></h2>
                {props.tags.map((tag) => <span><Link href={`/tags/${tag}`}>{tag}</Link></span>)}
                <div
                    dangerouslySetInnerHTML={{
                        __html: `${props.snippet}`,
                    }}
                />
                <p className={utilStyles.rightSide}><Link href={`/posts/${props.id}`}>続きを読む</Link></p>
                <p>{Moment(props.date).format('YYYY年MM月DD日')}</p>
            </div>
        )
}

export default Card