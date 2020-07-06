import React from 'react'
import styled from 'styled-components'
import Link from 'commonComponents/Link'

interface Props {
  crumbs: [
    {
      url?: string
      title: string
    }
  ]
}

function Breadcrumb({ crumbs }: Props) {
  return (
    <StyledBreadcrumb>
      <ul>
        {crumbs.map((crumb, i) => {
          if (crumb.url) {
            return (
              <li key={i}>
                <Link to={crumb.url}>{crumb.title}</Link>
              </li>
            )
          } else {
            return <li key={i}>{crumb.title}</li>
          }
        })}
      </ul>
    </StyledBreadcrumb>
  )
}

const StyledBreadcrumb = styled.div`
  padding: 16px 16px;
  /* border-bottom: 1px solid ${({ theme }) => theme.color.grey}; */
  & > ul {
    list-style: none;
  }

  & > ul li {
    display: inline-block;
  }

  & > ul li:not(:last-child)::after {
    content: '/';
    padding: 0 6px;
  }
`

export default Breadcrumb
