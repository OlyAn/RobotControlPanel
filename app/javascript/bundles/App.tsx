import React from "react"
import { ThemeProvider } from "styled-components"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import ROSLIB from "roslib"

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

export interface Twist {
  linear: {
    x: number
    y: number
    z: number
  }
  angular: {
    x: number
    y: number
    z: number
  }
}

export default class App extends React.Component<Props> {
  ros: any = null
  mobileController: any = null

  componentDidMount() {
    this.ros = new ROSLIB.Ros({
      url: `ws://${this.props.robot.ip}:9090`
    })

    this.ros.on("connection", () => console.log("Connected"))
    this.ros.on("error", (error: any) => console.log("Error:", error))

    this.mobileController = new ROSLIB.Topic({
      ros: this.ros,
      name: "/mobile_base_controller/cmd_vel",
      messageType: "geometry_msgs/Twist"
    })
  }

  ride = (value: Twist) => {
    const twist = new ROSLIB.Message(value)
    console.log("writing: ", twist)
    this.mobileController.publish(twist)
  }

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
                    <ControlPanel robot={robot} ride={this.ride} />
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
