import React, { ReactElement } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { PaginationMeta } from '../Api/RestResponse'
import classNames from 'classnames'
import qs from 'qs'
import * as R from 'ramda'
import './PaginationLinks.css'

interface PaginationLinksProps {
    meta: PaginationMeta,
    links: number,
    includeEnds: boolean,
}

export default function PaginationLinks(props: PaginationLinksProps): ReactElement {
    const { links, meta } = props
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')

    const first = Math.max(1, meta.current_page - Math.floor(links / 2))
    const last = Math.min(meta.current_page + Math.floor(links/ 2), meta.last_page)

    const pageLinks = R.range(first, last + 1).map((pageNumber) => {
        const classes = classNames('PaginationLinks__Link', {
            'PaginationLinks__Link--Active': meta.current_page === pageNumber
        })
        const url = location.pathname + '?' + qs.stringify({
            page: pageNumber,
            query: query,
        })

        return <Link
            key={pageNumber}
            className={classes}
            to={url}
        >{pageNumber}</Link>
    })

    return <div className="Pagination__Links">
        {pageLinks}
    </div>
}