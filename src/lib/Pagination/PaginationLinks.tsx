import React, { ReactElement } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { PaginationMeta } from '../Api/RestResponse'
import * as R from 'ramda'

interface PaginationLinksProps {
    meta: PaginationMeta,
    links: number,
    includeEnds: boolean,
}

export default function PaginationLinks(props: PaginationLinksProps): ReactElement {
    const { links, meta } = props
    const location = useLocation()
    let queryString = new URLSearchParams(location.search)

    const pageLinks = R.range(1, links + 1).map((pageNumber) => {
        queryString.set('page', pageNumber.toString())
        return <Link
            key={pageNumber}
            className={meta.current_page === pageNumber ? 'active' : ''}
            to={location.pathname + '?' + queryString}>
            {pageNumber}
        </Link>
    })

    return <div className="Pagination__Links">
        {pageLinks}
    </div>
}