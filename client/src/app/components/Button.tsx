import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { v4 as uuid } from 'uuid'

interface Props {
  value: string
  type?: 'button' | 'submit' | 'reset'
  looks?: 'blue' | 'green'
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  style?: React.CSSProperties
  tooltip?: string
  className?: string
}

export const Button = ({
  type = 'button',
  value,
  looks = 'blue',
  loading = false,
  onClick,
  style,
  tooltip,
  className = '',
}: Props) => {
  const id = uuid()

  return (
    <>
      <Wrapper
        className={`${looks} ${className}`}
        type={type}
        disabled={loading}
        style={style}
        onClick={(e) => (onClick ? onClick(e) : {})}
        data-tip={tooltip}
        data-for={id}
      >
        {loading ? (
          <div className='loading'>
            <div className='container'>
              <div className='fill' />
            </div>
          </div>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: value }} />
        )}
      </Wrapper>
      {tooltip && <ReactTooltip place='top' type='dark' effect='solid' offset={{ top: 10 }} html={true} id={id} />}
    </>
  )
}

const Wrapper = styled.button`
  background: url('/images/partials/button.jpg') no-repeat center center/cover;
  outline: none;
  color: #c3eaee;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  padding: 0 15px;
  display: inline-block;
  border-radius: 3px;
  transition: 0.3s ease-in-out;
  height: 30px;
  line-height: 30px;
  font-size: 13px;

  &:hover {
    -webkit-filter: brightness(120%);
    filter: brightness(120%);
    text-decoration: none;
  }

  &.green {
    background: url('/images/partials/green-button.jpg') no-repeat center center/cover;
    box-shadow: 0px 0px 20px 0px rgba(119, 240, 241, 0.2);
  }

  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
      position: relative;
      width: 100%;
      height: 3px;
      border-radius: 2px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.2);

      .fill {
        position: absolute;
        background: rgba(9, 73, 116, 0.712);
        width: 100%;
        height: 100%;
        animation: loader 1.5s ease-in-out forwards infinite;
      }

      @keyframes loader {
        0% {
          width: 0%;
          left: 0;
        }
        50% {
          width: 100%;
          left: 0;
        }
        100% {
          left: 100%;
        }
      }
    }
  }
`
