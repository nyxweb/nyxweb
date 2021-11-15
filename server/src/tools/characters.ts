export const getClassName = (charClass: number | string): { short: string; long: string } => {
  switch (charClass) {
    case 0:
      return {
        long: 'Dark Wizard',
        short: 'DW',
      }
    case 1:
      return {
        long: 'Soul Master',
        short: 'SM',
      }
    case 16:
      return {
        long: 'Dark Knight',
        short: 'DK',
      }
    case 17:
      return {
        long: 'Blade Knight',
        short: 'BK',
      }
    case 32:
      return {
        long: 'Fairy Elf',
        short: 'Elf',
      }
    case 33:
      return {
        long: 'Muse Elf',
        short: 'ME',
      }
    case 48:
      return {
        long: 'Magic Gladiator',
        short: 'MG',
      }
    case 64:
      return {
        long: 'Dark Lord',
        short: 'DL',
      }
    default:
      return {
        long: 'Unknown',
        short: 'n/a',
      }
  }
}
