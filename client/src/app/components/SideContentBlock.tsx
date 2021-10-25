import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  desc: string
  rightSide?: boolean
}

export const SideContentBlock: React.FC<Props> = ({ children, title, desc, rightSide = false }) => {
  return (
    <Wrapper>
      <Title rightSide={rightSide}>
        <Icon rightSide={rightSide} />
        <Text rightSide={rightSide}>
          <span>{title}</span>
          {desc}
        </Text>
      </Title>
      <div className='content'>{children}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: url('/images/partials/light-bg.jpg');
  box-shadow: 0px 12px 30px -5px rgba(0, 0, 0, 0.1), 0px -12px 30px -5px rgba(0, 0, 0, 0.1);

  & .content {
    padding: 20px;
  }
`

const Title = styled.div<{ rightSide: boolean }>`
  color: #657793;
  line-height: 1.6;
  padding: 15px 20px 0 20px;
  margin-bottom: -10px;
  display: flex;
  justify-content: space-between;
  ${({ rightSide }) => (rightSide ? 'text-align: right;' : '')}
`

const Icon = styled.div<{ rightSide: boolean }>`
  background: url('/images/partials/bar-title-bg.png') no-repeat
    ${({ rightSide }) => (rightSide ? '' : 'center center')};
  width: 43px;
  height: 42px;
  border-radius: 50%;
  box-shadow: 0px 0px 14px 0px rgba(51, 99, 171, 0.5);
  order: ${({ rightSide }) => (rightSide ? '1' : '2')};
`

const Text = styled.div<{ rightSide?: boolean }>`
  order: ${({ rightSide }) => (rightSide ? '2' : '1')};

  & span {
    display: block;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }
`
