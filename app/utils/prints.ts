// app/utils/prints.ts
import type { PrintOption } from '~/types/gallery'

/** One price list for every photo. Edit here to change sizes, finishes or prices. */
export const PRINT_OPTIONS: PrintOption[] = [
  { size: '8x10', finish: 'Matte', price: 35 },
  { size: '8x10', finish: 'Lustre', price: 35 },
  { size: '11x14', finish: 'Matte', price: 65 },
  { size: '11x14', finish: 'Lustre', price: 65 },
  { size: '16x20', finish: 'Matte', price: 110 },
  { size: '16x20', finish: 'Canvas', price: 145 },
  { size: '20x30', finish: 'Canvas', price: 210 },
  { size: '20x30', finish: 'Framed', price: 320 },
]
