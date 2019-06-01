import React from "react"

import Button from "./components/Button"
import * as Form from "./components/Form"
import { getCSRFToken } from "./getCSRFToken"

function SignUp() {
  return (
    <Form.Container>
      <h2>Создание аккаунта:</h2>
      <Form.Form method="post" action="/users" onSubmit={() => {}}>
        <input type="hidden" name="authenticity_token" value={getCSRFToken()} />
        <Form.InputBox>
          <input name="[user]first_name" placeholder="Имя" required />
        </Form.InputBox>
        <Form.InputBox>
          <input name="[user]last_name" placeholder="Фамилия" required />
        </Form.InputBox>
        <Form.InputBox>
          <input name="[user]email" placeholder="your@email.com" required />
        </Form.InputBox>
        <Form.InputBox>
          <input
            name="[user]password"
            placeholder="Пароль"
            type="password"
            required
          />
        </Form.InputBox>
        <Button>Продолжить</Button>
      </Form.Form>
    </Form.Container>
  )
}

export default SignUp
