import React from "react"

import Button from "./components/Button"
import * as Form from "./components/Form"
import { getCSRFToken } from "./getCSRFToken"

function Login() {
  return (
    <Form.Container>
      <h2>Войдите в ваш аккаунт:</h2>
      <Form.Form method="post" action="/users/sign_in" onSubmit={() => {}}>
        <input type="hidden" name="authenticity_token" value={getCSRFToken()} />
        <Form.InputBox>
          <input name="[user]email" placeholder="your@email.com" required />
        </Form.InputBox>
        <Form.InputBox>
          <input
            name="[user]password"
            placeholder="Password"
            type="password"
            required
          />
        </Form.InputBox>
        <Button>Войти</Button>
      </Form.Form>
    </Form.Container>
  )
}

export default Login
