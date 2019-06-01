import React from "react"
import { ThemeProvider } from "styled-components"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
// import ROSLIB from "roslib"

import { theme } from "../styles/theme"
import { Normalize } from "../styles/normalize"

import Header from "./components/Navigation"
import SignUp from "./SignUp"
import Login from "./Login"
import Account from "./Account"
import ControlPanel from "./ControlPanel"

export interface User {
  first_name: string
  last_name: string
  email: string
}
export interface Robot {
  name: string
  ip: string
}
interface Props {
  user: User
  robot: Robot
}

export default class App extends React.Component<Props> {
  ros: any = null

  // componentDidMount() {
  //   this.ros = new ROSLIB.Ros({
  //     url: `ws://${ROBOT_IP}:9090`
  //   })

  //   this.ros.on("connection", () => console.log("Connected"))
  //   this.ros.on("error", (error: any) => console.log("Error:", error))

  //   const leftEncoderTopic = new ROSLIB.Topic({
  //     ros: this.ros,
  //     name: "/left_encoder",
  //     messageType: "std_msgs/Int32"
  //   })

  //   leftEncoderTopic.subscribe((value: any) => console.log(value))
  // }

  render() {
    const { robot, user } = this.props

    return (
      <Router basename="/">
        <Normalize />
        <ThemeProvider theme={theme}>
          <>
            <Header user={user} />
            <Switch>
              <Route path="/sign-up" component={SignUp} />
              <Route path="/sign-in" component={Login} />
              <Route
                path="/control-panel"
                render={() =>
                  user ? (
                    <ControlPanel robot={robot} />
                  ) : (
                    <Redirect to="/sign-in" />
                  )
                }
              />
              <Route
                path="/account"
                render={() =>
                  user ? <Account user={user} /> : <Redirect to="/sign-in" />
                }
              />
              <Redirect to="/sign-in" />
            </Switch>
          </>
        </ThemeProvider>
      </Router>
    )
  }
}
