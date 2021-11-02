import Loader, { LoaderProps } from 'react-loader-spinner'

interface Props extends Omit<LoaderProps, 'type'> {
  type?: LoaderProps['type']
}

export const ReactLoader: React.FC<Props> = ({ type = 'Triangle', height = 40, color = 'lightblue' }) => {
  return <Loader type={type} height={height} color={color} />
}
