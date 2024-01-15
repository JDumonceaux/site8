import { useEffect, useState } from "react";

import { APP_NAME } from "../../utils/constants";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";
import { z } from "zod";

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
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    document.title = `${APP_NAME} - Form Example 2`;
  }, []);

  const user: User = { userName: "Sammy", age: 1, isValid: false };

  const onHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserName(event.target.value);
    console.log("x", UserSchema.safeParse(user));
  };

  return (
    <div className="form-example-2">
      <TwoColumn
        pageTitle={<PageTitle title="Form Example 2" />}
        left={
          <main className="main">
            <input
              type="text"
              className="adorned-input"
              placeholder="Enter text"
              value={userName}
              onChange={onHandleChange}
            />
          </main>
        }
        right={<div className="right-column"></div>}
      />
    </div>
  );
}

export default FormExample2;
