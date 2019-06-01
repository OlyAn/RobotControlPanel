export class BreakpointsArray extends Array<number> {
  xs: number
  sm: number
  md: number
  lg: number

  constructor(items: number[]) {
    super(...items)
    this.xs = 0
    this.sm = items[0]
    this.md = items[1]
    this.lg = items[2]
  }
}

interface Theme {
  font: string
  breakpoints: BreakpointsArray
  colors: {
    main: string
    mainAlt: string
    outline: string
    orange: string
  }
}

export const theme: Theme = {
  font: "Montserrat",
  breakpoints: new BreakpointsArray([474, 948, 1220]),
  colors: {
    main: "#535F5F",
    mainAlt: "#ECF0F1",
    outline: "#bbdada",
    orange: "#ff5c00"
  }
}
