import { useEffect } from "react";

import { APP_NAME } from "../../utils/constants";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";
//import TextInput from "../../components/ui/Form/TextField/TextInput";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../services/state/store";
import { increment } from "../../services/state/examples/counterSlice";

import "./formExample1.css";

function FormExample1() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.title = `${APP_NAME} - Form Example 1`;
  }, []);

  const onHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(increment(event.target.value));
  };

  return (
    <div className="form-example-1">
      <TwoColumn
        pageTitle={<PageTitle title="Form Example 1" />}
        left={
          <main className="main">
            <div>
              <div className="adorned-input-container">
                <span className="start-adornment">@</span>
                <input
                  type="text"
                  className="adorned-input"
                  placeholder="Enter text"
                  value={count + 1}
                  onChange={onHandleChange}
                />
                <span className="end-adornment">#</span>
              </div>
            </div>
          </main>
        }
        right={<div className="right-column"></div>}
      />
    </div>
  );
}

export default FormExample1;
