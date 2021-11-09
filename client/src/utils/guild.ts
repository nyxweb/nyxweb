export const guildHexDecode = (key: string) => {
  switch (key.toLowerCase()) {
    case '1':
      return '#000000'
    case '2':
      return '#8c8a8d'
    case '3':
      return '#ffffff'
    case '4':
      return '#fe0000'
    case '5':
      return '#ff8a00'
    case '6':
      return '#ffff00'
    case '7':
      return '#8cff01'
    case '8':
      return '#00ff00'
    case '9':
      return '#01ff8d'
    case 'a':
      return '#00ffff'
    case 'b':
      return '#008aff'
    case 'c':
      return '#0000fe'
    case 'd':
      return '#8c00ff'
    case 'e':
      return '#ff00fe'
    case 'f':
      return '#ff0080'
    case '0':
    default:
      return 'transparent'
  }
}
