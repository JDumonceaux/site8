import React, { useState } from 'react';
import { z } from 'zod';

enum Hobbies {
  Programming,
  Art,
}

const UserSchema = z
  .object({
    userName: z.string().min(1).max(50),
    age: z.number().gt(0),
    birthdate: z.date().optional(),
    isValid: z.boolean().default(false).nullable(),
    xNull: z.null().optional(),
    xUndefined: z.undefined().optional(),
    xVoid: z.void().optional().nullish(),
    hobbies: z.nativeEnum(Hobbies).optional(),
  })
  .strict();

type User = z.infer<typeof UserSchema>;

function FormExample2() {
  const [userName, setUserName] = useState<string>('');

  const user: User = { userName: 'Sammy', age: 1, isValid: false };

  const onHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserName(event.target.value);
    console.log('x', UserSchema.safeParse(user));
  };

  return (
    <div className="form-example-2">
      <main className="main">
        <input
          type="text"
          className="adorned-input"
          placeholder="Enter text"
          value={userName}
          onChange={onHandleChange}
        />
      </main>
    </div>
  );
}

export default FormExample2;
