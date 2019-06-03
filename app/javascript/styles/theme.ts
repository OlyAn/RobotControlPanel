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
    navyBlue: string
    gunmetal: string
    lightblue: string
    blueDark: string
    rustyRed: string
    warmYellow: string
    yellowLight: string
    silver: string
    silverDarker: string
    purple: string
    green: string
    peach: string
  }
}

export const theme: Theme = {
  font: "Montserrat",
  breakpoints: new BreakpointsArray([474, 948, 1220]),
  colors: {
    main: "#535F5F",
    mainAlt: "#ECF0F1",
    outline: "#bbdada",
    orange: "#ff5c00",

    navyBlue: "#17121e",
    gunmetal: "#22313b",
    lightblue: "#c5d8e5",
    blueDark: "#275d7f",
    rustyRed: "#984c46",
    warmYellow: "#e9c77b",
    yellowLight: "#ffe2a1",
    silver: "#eaf0f4",
    silverDarker: "#85939c",
    purple: "#53679e",
    green: "#647f50",
    peach: "#fbdec2"
  }
}
