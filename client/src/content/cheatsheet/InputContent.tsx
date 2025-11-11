import type { JSX } from 'react';

export const InputContent = (): JSX.Element => {
  const obj = `
<label>
  Current Password
  <input
    autoComplete="current-password"
    id="password-uuid"
    inputMode="text"
    maxLength={60}
    minLength={1}
    name="password-uuid"
    onChange={handleChange}
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
              <label htmlFor="sample-input">Sample Input</label>
              <input
                id="sample-input"
                type="text"
              />
            </td>
            <td>type is optional</td>
          </tr>
          {/* ...other rows unchanged... */}
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

InputContent.displayName = 'InputContent';
export default InputContent;
