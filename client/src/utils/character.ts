import { IGuildMember } from 'store/ranking'

interface CharacterInfo {
  className: { short: string; long: string }
  classImage: { short: string; long: string }
  baseStats: {
    Strength: number
    Agility: number
    Vitality: number
    Energy: number
    Command?: number
  }
}

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

export const getClassInfo = (charClass: number | string): CharacterInfo => {
  switch (Number(charClass)) {
    case 0:
    case 1:
      return {
        className: getClassName(charClass),
        classImage: { long: 'dw.png', short: 'dw.gif' },
        baseStats: {
          Strength: 18,
          Agility: 18,
          Vitality: 15,
          Energy: 30,
        },
      }
    case 16:
    case 17:
      return {
        className: getClassName(charClass),
        classImage: { long: 'dk.png', short: 'dk.gif' },
        baseStats: {
          Strength: 28,
          Agility: 20,
          Vitality: 25,
          Energy: 10,
        },
      }
    case 32:
    case 33:
      return {
        className: getClassName(charClass),
        classImage: { long: 'elf.png', short: 'elf.gif' },
        baseStats: {
          Strength: 22,
          Agility: 25,
          Vitality: 15,
          Energy: 20,
        },
      }
    case 48:
      return {
        className: getClassName(charClass),
        classImage: { long: 'mg.png', short: 'mg.gif' },
        baseStats: {
          Strength: 26,
          Agility: 26,
          Vitality: 26,
          Energy: 16,
        },
      }
    case 64:
    default:
      return {
        className: getClassName(charClass),
        classImage: { long: 'dl.png', short: 'dl.gif' },
        baseStats: {
          Strength: 26,
          Agility: 20,
          Vitality: 20,
          Energy: 15,
          Command: 25,
        },
      }
  }
}

export const getInventory = (hex: string) => ({
  wings: hex.substr(224, 32),
  helm: hex.substr(64, 32),
  armor: hex.substr(96, 32),
  pants: hex.substr(128, 32),
  gloves: hex.substr(160, 32),
  boots: hex.substr(192, 32),
  wep1: hex.substr(0, 32),
  wep2: hex.substr(32, 32),
  pend: hex.substr(288, 32),
  ring1: hex.substr(320, 32),
  ring2: hex.substr(352, 32),
  pet: hex.substr(256, 32),
})

export const getLocation = (map: number) => {
  switch (map) {
    case 0:
      return "<font color='#e3e48b'>Lorencia</font>"
    case 1:
      return "<font color='#cccccc'>Dungeon</font>"
    case 2:
      return "<font color='#66ccd8'>Davias</font>"
    case 3:
      return "<font color='#4e9c46'>Noria</font>"
    case 4:
      return 'Lost Tower'
    case 5:
      return 'Exile'
    case 6:
      return 'Stadium'
    case 7:
      return 'Atlans'
    case 8:
      return 'Tarkan'
    case 9:
    case 32:
      return 'Devil Square'
    case 10:
      return 'Icarus'
    case 11:
      return 'Blood Castle 1'
    case 12:
      return 'Blood Castle 2'
    case 13:
      return 'Blood Castle 3'
    case 14:
      return 'Blood Castle 4'
    case 15:
      return 'Blood Castle 5'
    case 16:
      return 'Blood Castle 6'
    case 17:
      return 'Blood Castle 7'
    case 18:
      return 'Chaos Castle 1'
    case 19:
      return 'Chaos Castle 2'
    case 20:
      return 'Chaos Castle 3'
    case 21:
      return 'Chaos Castle 4'
    case 22:
      return 'Chaos Castle 5'
    case 23:
      return 'Chaos Castle 6'
    case 24:
      return 'Kalima 1'
    case 25:
      return 'Kalima 2'
    case 26:
      return 'Kalima 3'
    case 27:
      return 'Kalima 4'
    case 28:
      return 'Kalima 5'
    case 29:
      return 'Kalima 6'
    case 36:
      return 'Kalima 7'
    case 30:
      return 'Valley Of Loren'
    case 31:
      return 'Land of Trials'
    case 52:
      return 'Blood Castle 8'
    case 53:
      return 'Chaos Castle 7'
    default:
      return 'Unknown'
  }
}

export const getPkStatus = (pk: number) => {
  if (pk < 0) {
    return `<font color='#92c2d4'>Hero</font> ( ${pk} )`
  } else if (pk === 0) {
    return `<font color='#e6f7ff'>Commoner</font> ( ${pk} )`
  } else if (pk === 1) {
    return `<font color='#ffad73'>Killer</font> ( ${pk} )`
  } else if (pk === 2) {
    return `<font color='#ff5833'>Outlaw</font> ( ${pk} )`
  } else {
    return `<font color='#ff0000'>Phonomania</font> ( ${pk} )`
  }
}

export const getGuildPosition = (position: number) => {
  switch (position) {
    case 128:
      return `<font color='#ff0000'>Guild Master</font>`
    case 64:
      return `<font color='#92c2d4'>Assist. Master</font>`
    case 32:
      return `<font color='#ffad73'>Battle Master</font>`
    default:
      return `<font color='#e6f7ff'>Member</font>`
  }
}

export const getGuildRank = (status: IGuildMember['G_Status']) => {
  switch (status) {
    case 128:
      return {
        title: 'Guild Master',
        image: '/images/ranks/crown.png',
      }
    case 64:
      return {
        title: 'Battle Master',
        image: '/images/ranks/swords.png',
      }
    case 32:
      return {
        title: 'Guild Assistant',
        image: '/images/ranks/shield.png',
      }
    case 0:
    default:
      return null
  }
}
