import React, { ReactElement } from 'react'
import { useLocation } from 'react-router'
import { PaginationMeta } from '../Api/RestResponse'
import qs from 'qs'
import * as R from 'ramda'
import './PaginationLinks.css'
import { HStack } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/button'

interface PaginationLinksProps {
    meta: PaginationMeta,
    links: number,
    includeEnds: boolean,
}

export default function PaginationLinks(props: PaginationLinksProps): ReactElement {
    const { links, meta } = props
    const location = useLocation()
    const params = Object.fromEntries(new URLSearchParams(location.search))

    const first = Math.max(1, meta.current_page - Math.floor(links / 2))
    const last = Math.min(meta.current_page + Math.floor(links/ 2), meta.last_page)

    const pageLinks = R.range(first, last + 1).map((pageNumber) => {
        const url = location.pathname + '?' + qs.stringify({
            ...params,
            page: pageNumber,
        })

        return <Button 
            as={Link}
            key={pageNumber}
            colorScheme="teal"
            to={url}
            variant={meta.current_page === pageNumber ? 'solid' : 'outline'}
            disabled={meta.current_page === pageNumber}
        >{pageNumber.toString()}</Button>
    })

    return <HStack spacing="4" my="8">
        {pageLinks}
    </HStack>
}