import React, { useState } from "react"

import Button from "./components/Button"
import * as Form from "./components/Form"
import { getCSRFToken } from "./getCSRFToken"
import { User } from "./App"

interface Props {
  user: User
}
function Account(props: Props) {
  const {
    first_name: initialFirstName,
    last_name: initialLastName,
    email: initialEmail
  } = props.user
  const [firstName, setFirstName] = useState(initialFirstName)
  const [lastName, setLastName] = useState(initialLastName)
  const [email, setEmail] = useState(initialEmail)

  return (
    <Form.Container>
      <h2>Мой аккаунт:</h2>
      <Form.Form method="post" action="/users/update" onSubmit={() => {}}>
        <input type="hidden" name="authenticity_token" value={getCSRFToken()} />
        <Form.InputBox>
          <input
            name="[user]first_name"
            placeholder="Имя"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </Form.InputBox>
        <Form.InputBox>
          <input
            name="[user]last_name"
            placeholder="Фамилия"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </Form.InputBox>
        <Form.InputBox>
          <input
            name="[user]email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.InputBox>
        <Button>Сохранить</Button>
      </Form.Form>
    </Form.Container>
  )
}

export default Account
