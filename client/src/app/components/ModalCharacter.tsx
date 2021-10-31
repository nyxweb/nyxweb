import { Character } from 'store/ranking'
import { Modal } from './'

interface Props {
  char: Character | null
  active: boolean
}

export const ModalCharacter: React.FC<Props> = ({ char, active }) => {
  if (!char) return null

  return (
    <Modal active={active}>
      <div>name: {char.name}</div>
      <div>zen: {char.zen}</div>
      <div>
        level: {char.level}
        <sup>{char.reset}</sup>
      </div>
    </Modal>
  )
}
