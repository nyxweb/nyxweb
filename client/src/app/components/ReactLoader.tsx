import Loader, { LoaderProps } from 'react-loader-spinner'

interface Props extends Omit<LoaderProps, 'type'> {
  type?: LoaderProps['type']
  size?: number
}

export const ReactLoader: React.FC<Props> = ({ type = 'Triangle', color = 'lightblue', size = 40, ...rest }) => {
  return <Loader type={type} color={color} width={size} height={size} {...rest} />
}
