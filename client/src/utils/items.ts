import { CSSProperties } from 'react'

const hex2dec = (hex: string) => parseInt(hex, 16)

export interface Item {
  group: number
  id: number
  excellent: number[]
  durability: number
  luck: boolean
  level: number
  skill: boolean
  options: number
  serial: string
  ancient: number
  pink: boolean
  harmony: {
    type: number
    level: number
  }
}

/**
 * Decoding item hex code
 */

export const itemHexDecode = (hex: string): Item | false => {
  if (!/^[a-f0-9]{32}$/i.test(hex) || hex.toLowerCase() === 'f'.repeat(32)) return false

  const opts = hex2dec(hex.substr(2, 2))
  const exos = hex2dec(hex.substr(14, 2))

  const excellent = Array(6)
    .fill('')
    .map((_, i) => (exos >> i) & 0b1)

  const group = hex2dec(hex.substr(18, 1))
  const id = hex2dec(hex.substr(0, 2))
  const luck = !!((opts >> 2) & 0b1)
  const level = (opts >> 3) & 0b1111
  const skill = !!((opts >> 7) & 0b1)
  const options = (opts & 0b11) | (((exos >> 6) & 0b1) << 2)
  const ancient = hex2dec(hex.substr(17, 1))
  const serial = hex.substr(6, 8)
  const durability = hex2dec(hex.substr(4, 2))
  const pink = !!hex2dec(hex.substr(19, 1))
  const harmony = {
    type: hex2dec(hex.substr(20, 1)),
    level: hex2dec(hex.substr(21, 1)),
  }

  return {
    group,
    id,
    luck,
    level,
    skill,
    options,
    ancient,
    serial,
    durability,
    excellent,
    pink,
    harmony,
  }
}

/**
 * Generating item hex code
 */
export const genBinValue = (n: number) => {
  switch (n) {
    case 0:
      return 1
    case 1:
      return 2
    case 2:
      return 4
    case 3:
      return 8
    case 4:
      return 16
    case 5:
      return 32
    case 6:
      return 64
    case 7:
    default:
      return 128
  }
}

const insert = (str: string, mass: string, pos: number) => mass.slice(0, pos) + str + mass.slice(pos + str.length)

const dec2hex = (dec: number, length = 1) =>
  length === 1 ? dec.toString(16) : dec.toString(16).length === 1 ? '0' + dec.toString(16) : dec.toString(16)

export const generateItemHex = ({
  group,
  id,
  level = 0,
  excellent = [0, 0, 0, 0, 0, 0],
  durability = 255,
  luck = false,
  skill = false,
  options = 0,
  serial,
  ancient = 0,
  pink = false,
  harmony = {
    type: 0,
    level: 0,
  },
}: Item): string | false => {
  let hex: string = '0'.repeat(32)
  let exos = 0

  // group
  hex = insert(dec2hex(group), hex, 18)
  // id
  hex = insert(dec2hex(id, 2), hex, 0)

  // level skill luck options
  const opts = level * 8 + (skill ? 128 : 0) + (luck ? 4 : 0) + (options <= 3 ? options : options - 4)
  hex = insert(dec2hex(opts, 2), hex, 2)

  if (options > 3) {
    exos += 64
  }

  // excellent options
  excellent.forEach((o, i) => (exos += o ? genBinValue(i) : 0))
  hex = insert(dec2hex(exos, 2), hex, 14)

  // durability
  hex = insert(dec2hex(durability, 2), hex, 4)

  // ancient
  hex = insert(dec2hex(ancient === 1 ? 5 : ancient === 2 ? 10 : 0), hex, 17)

  // pink
  hex = insert(dec2hex(pink ? 8 : 0), hex, 19)

  // harmony
  hex = insert(dec2hex(harmony.type), hex, 20)
  hex = insert(dec2hex(harmony.level), hex, 21)

  // serial
  hex = insert(serial || 'f'.repeat(8), hex, 6)

  return hex
}

/**
 * Get item name color/css style
 */

export const getItemNameStyle = (item: Item) => {
  const style: CSSProperties = {}

  if (item.ancient) {
    // Ancient
    style.backgroundColor = '#0000ff'
    style.color = '#01df01'
  } else if (item.excellent.find((exo) => exo)) {
    // Excellent
    style.color = '#12b322'
  } else if (item.level >= 7) {
    // Golden
    style.color = '#fff200'
  } else {
    // Everything else
    style.color = '#80b2ff'
  }

  return style
}

export const getSlotsMatrix = (itemsHex: string, itemsDB: any) => {
  if (itemsHex) {
    const hexArray = itemsHex.toLowerCase().match(/[a-f0-9]{32}/gi)
    const slots: number[][] = []

    if (hexArray) {
      Array(hexArray.length)
        .fill(null)
        .forEach((_, i) => {
          const row = Math.floor(i / 8)
          if (slots[row]) slots[row].push(0)
          else slots[row] = [0]
        })

      hexArray.forEach((hex, i) => {
        const row = Math.floor(i / 8)
        const column = Math.floor(i - row * 8)

        if (hex.toLowerCase() !== 'f'.repeat(32)) {
          const item = itemHexDecode(hex)
          const itemData =
            item && itemsDB && itemsDB[item.group] && itemsDB[item.group].items[item.id]
              ? itemsDB[item.group].items[item.id]
              : false

          if (itemData) {
            for (let x = 0; x < itemData.x; x++) {
              for (let y = 0; y < itemData.y; y++) {
                if (slots[y + row] !== undefined && slots[y + row][x + column] !== undefined)
                  slots[y + row][x + column] = 1
              }
            }
          }
        }
      })

      return slots
    }
  }

  return false
}

export const multidimensionalSum = (array: any) => {
  let sum = 0

  if (array) {
    array.forEach((n: number) => {
      if (typeof n === 'object') {
        sum += multidimensionalSum(n)
      } else {
        sum += n
      }
    })
  }
  return sum
}
