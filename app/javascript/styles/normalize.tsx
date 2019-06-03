import { createGlobalStyle } from "styled-components"
import { theme } from "styles/theme"

export const Normalize = createGlobalStyle`
	body {
	  margin: 0;
	  font-family: ${theme.font}
    background-color: ${theme.colors.mainAlt};
  }

	button, input, optgroup, select, textarea {
	  font-family: inherit;
	  font-size: 100%;
	  line-height: 1.15;
	  margin: 0;
	}

  a {
    color: ${theme.colors.mainAlt};
  }

  a:hover {
    color: white;
  }

  a:visited {
    color: ${theme.colors.mainAlt};
  }

  input {
    padding: 10px;
  }

	button, input, select {
	  text-transform: none;
    overflow: visible;
  }

  button:focus, input:focus, select:focus {
    outline-color: ${theme.colors.outline};
    outline-style: double;
    outline-width: 2px;
  }

	button, [type="button"], [type="reset"], [type="submit"] {
	  -webkit-appearance: button;
	}
`
