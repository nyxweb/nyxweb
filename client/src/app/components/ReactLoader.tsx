import Loader, { LoaderProps } from 'react-loader-spinner'

export const ReactLoader: React.FC<LoaderProps> = ({ type = 'Triangle', height = 40, color = 'lightblue' }) => {
  return <Loader type={type} height={height} color={color} />
}
