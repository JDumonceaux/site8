export const InputContent = (): JSX.Element => {
  const obj = `
  <label>Current Password
    <input
      autoComplete="current-password"
      id={password-uuid}
      inputMode="text"
      maxLength={60}
      minLength={1}
      name={password-uuid}
      onChange={handleChange()}
      placeholder="Current password"
      required
      spellCheck="false"
      type="password"
      value=""
    />
  </label>
`;

  return (
    <>
      <div>
        Controlled Fields: React has controlled and uncontrolled fields. Adding
        &apos;value&apos; or &apos;checked&apos; will make the field controlled.
        Controlled fields require an &apos;onChange&apos; event handler.
      </div>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Html</th>
            <th>Sample</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>default</td>
            <td>
              <samp>{`<input type="text" />`}</samp>
            </td>
            <td>
              <input type="text" />
            </td>
            <td>type is optional</td>
          </tr>
          <tr>
            <td>email</td>
            <td>
              <samp>{`<input type="email" />`}</samp>
            </td>
            <td>
              <input type="email" />
            </td>
            <td />
          </tr>
          <tr>
            <td>hidden</td>
            <td>
              <samp>{`<input type="hidden" />`}</samp>
            </td>
            <td>
              <input type="hidden" />
            </td>
            <td />
          </tr>
          <tr>
            <td>password</td>
            <td>
              <samp>{`<input type="password" />`}</samp>
            </td>
            <td>
              <input type="password" />
            </td>
            <td>
              masks the input with ***. To show, change the type to
              &apos;text&apos;
            </td>
          </tr>
          <tr>
            <td>tel</td>
            <td>
              <samp>{`<input type="tel" />`}</samp>
            </td>
            <td>
              <input type="tel" />
            </td>
            <td />
          </tr>
          <tr>
            <td>search</td>
            <td>
              <samp>{`<input type="search" />`}</samp>
            </td>
            <td>
              <input type="search" />
            </td>
            <td>search adds the x to clear the field</td>
          </tr>

          <tr>
            <td colSpan={4}>Time</td>
          </tr>
          <tr>
            <td>date</td>
            <td>
              <samp>{`<input type="date" />`}</samp>
            </td>
            <td>
              <input type="date" />
            </td>
            <td />
          </tr>
          <tr>
            <td>datetime-local</td>
            <td>
              <samp>{`<input type="datetime-local" />`}</samp>
            </td>
            <td>
              <input type="datetime-local" />
            </td>
            <td />
          </tr>
          <tr>
            <td>month</td>
            <td>
              <samp>{`<input type="month" />`}</samp>
            </td>
            <td>
              <input type="month" />
            </td>
            <td>03/2024 - Not supported Safari, Firefox</td>
          </tr>
          <tr>
            <td>time</td>
            <td>
              <samp>{`<input type="time" />`}</samp>
            </td>
            <td>
              <input type="time" />
            </td>
            <td />
          </tr>
          <tr>
            <td>week</td>
            <td>
              <samp>{`<input type="week" />`}</samp>
            </td>
            <td>
              <input type="week" />
            </td>
            <td>03/2024 - Not supported Safari, Firefox</td>
          </tr>
          <tr>
            <td>
              <del>datetime</del>
            </td>
            <td>
              <samp>{`<input type="datetime" />`}</samp>
            </td>
            <td>
              <input type="datetime" />
            </td>
            <td>03/2024 - obsolete</td>
          </tr>

          <tr>
            <td colSpan={4}>Numeric</td>
          </tr>
          <tr>
            <td>number</td>
            <td>
              <samp>{`<input type="number" />`}</samp>
            </td>
            <td>
              <input type="number" />
            </td>
            <td />
          </tr>
          <tr>
            <td>range</td>
            <td>
              <samp>{`<input type="range" />`}</samp>
            </td>
            <td>
              <input type="range" />
            </td>
            <td />
          </tr>
          <tr>
            <td colSpan={4}>Buttons</td>
          </tr>
          <tr>
            <td>button</td>
            <td>
              <samp>{`<input type="button" />`}</samp>
            </td>
            <td>
              <input type="button" />
            </td>
            <td />
          </tr>
          <tr>
            <td>reset</td>
            <td>
              <samp>{`<input type="reset" />`}</samp>
            </td>
            <td>
              <input type="reset" />
            </td>
            <td />
          </tr>
          <tr>
            <td>submit</td>
            <td>
              <samp>{`<input type="submit" />`}</samp>
            </td>
            <td>
              <input type="submit" />
            </td>
            <td />
          </tr>
          <tr>
            <td>image</td>
            <td>
              <samp>{`<input alt="" type="image" />`}</samp>
            </td>
            <td>
              <input alt="" type="image" />
            </td>
            <td />
          </tr>
          <tr>
            <td colSpan={4}>Etc.</td>
          </tr>
          <tr>
            <td>color</td>
            <td>
              <samp>{`<input type="color" />`}</samp>
            </td>
            <td>
              <input type="color" />
            </td>
            <td />
          </tr>
          <tr>
            <td>file</td>
            <td>
              <samp>{`<input type="file" />`}</samp>
            </td>
            <td>
              <input type="file" />
            </td>
            <td />
          </tr>
          <tr>
            <td>radio</td>
            <td>
              <samp>{`<input type="radio" />`}</samp>
            </td>
            <td>
              <input type="radio" />
            </td>
            <td />
          </tr>
          <tr>
            <td>checkbox</td>
            <td>
              <samp>{`<input type="checkbox" />`}</samp>
            </td>
            <td>
              <input type="checkbox" />
            </td>
            <td />
          </tr>
        </tbody>
      </table>

      <div>
        Suggested Password Field Attributes:
        <pre>
          <code>{obj}</code>
        </pre>
      </div>

      <div>Additional Resources:</div>
      <div>
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input">
          Mozilla - Input
        </a>
      </div>

      <div>
        <a href="https://react.dev/reference/react-dom/components/input">
          React Input
        </a>
      </div>
      <div>
        <a href="https://www.w3schools.com/tags/tag_input.asp">
          W3Schools Input
        </a>
      </div>
      <div>
        <a href="https://caniuse.com/?search=input">Can I Use - Input</a>
      </div>
      <div>
        <a href="https://a11y-101.com/development/inputs">
          A11Y-101 Input (Accessibility)
        </a>
      </div>
    </>
  );
};

export default InputContent;
