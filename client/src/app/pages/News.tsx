import styled from 'styled-components'

export const News = () => {
  return (
    <div>
      <WeeklyHOFWrapper>HOF HERE</WeeklyHOFWrapper>
    </div>
  )
}

const WeeklyHOFWrapper = styled.div`
  box-shadow: 0px 25px 20px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 0;
  min-height: 100px;
`
