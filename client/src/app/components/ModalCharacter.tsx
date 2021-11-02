import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'store'
import { getCharacter } from 'store/ranking'
import { ReactLoader } from '.'

interface Props {
  name?: string
}

export const ModalCharacter: React.FC<Props> = ({ name }) => {
  const dispatch = useAppDispatch()
  const { loading, data } = useAppSelector((state) => state.ranking.character)

  useEffect(() => {
    if (name) dispatch(getCharacter({ name }))
  }, [dispatch, name])

  if (!name) return null

  return (
    <div>
      {loading ? (
        <ReactLoader />
      ) : !data ? (
        <div>Couldn't get character information</div>
      ) : (
        <div>
          <div>name: {data.name}</div>
          <div>class: {data.class}</div>
          <div>reset: {data.reset}</div>
          <div>level: {data.level}</div>
        </div>
      )}
    </div>
  )
}
