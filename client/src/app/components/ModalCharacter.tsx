import { Character } from 'store/ranking'

interface Props {
  char: Character | null
}

export const ModalCharacter: React.FC<Props> = ({ char }) => {
  if (!char) return null

  return (
    <div>
      <div>name: {char.name}</div>
      <div>zen: {char.zen}</div>
      <div>
        level: {char.level}
        <sup>{char.reset}</sup>
      </div>
    </div>
  )
}
