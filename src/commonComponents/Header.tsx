import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'commonComponents/Link'

interface Props {}

function Header(props: Props) {
  const username = window.localStorage.getItem('username')
  const userId = window.localStorage.getItem('userId')
  return (
    <StyledHeader>
      <StyledLeft>
        <StyledLogo src='/logo.png' alt='Recipes Logo' />
        <Link isDark to='/'>
          Recipes
        </Link>
      </StyledLeft>
      <div>
        <Link
          isDark
          to={
            username
              ? `/profiles/${userId}-${username}`
              : {
                  pathname: '/login',
                  state: { referrer: window.location.pathname },
                }
          }>
          {username || 'Login'}
        </Link>
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  ${({ theme }) => css`
    color: ${theme.color.black};
    background-color: ${theme.color.white};
    border-bottom: 1px solid ${theme.color.grey};
  `}

  height: 60px;

  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`

const StyledLogo = styled.img`
  width: 36px;
  margin-right: 4px;
`

export default Header
