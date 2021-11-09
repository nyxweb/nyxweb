import { Fragment } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { v4 as uuid } from 'uuid'

import { ICharacter } from 'store/ranking'
import { getGuildRank } from 'utils'

interface Props {
  char: ICharacter
  /** Wether or not to display guild before character name */
  guild?: boolean
}

const BadgeWrapper = styled.div`
  position: absolute;
  top: -4px;
  right: -17px;

  img {
    width: 14px;
  }
`

const Badge: React.FC<Props> = ({ char }) => {
  const rank = getGuildRank(char.member?.G_Status || 0)
  if (!rank) return null
  const id = uuid()

  return (
    <Fragment>
      <BadgeWrapper data-tip={rank.title} data-for={id}>
        <img src={rank.image} alt='GR' />
      </BadgeWrapper>
      <ReactTooltip place='top' type='dark' effect='solid' offset={{ top: 10 }} id={id} />
    </Fragment>
  )
}

export const Character: React.FC<Props> = ({ char, guild = false }) => {
  return (
    <Wrapper>
      {guild && char.member && (
        <Guild>
          <GSpacer>[</GSpacer>
          {char.member.G_Name}
          <GSpacer>]</GSpacer>
        </Guild>
      )}
      {char.Name}
      <Badge char={char} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  color: #52b5ee;
`

const Guild = styled.span`
  margin-right: 5px;
  color: #466da7;
`

const GSpacer = styled.span`
  color: #29374e;
`
