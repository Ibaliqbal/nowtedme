import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TestReactQuill = () => {
  const [value, setValue] = useState<string>("");
  const [isReadonly, setIsReadonly] = useState<boolean>(false);
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div className="w-full flex">
      <button
        className="bg-white"
        onClick={() => setIsReadonly((prev) => !prev)}
      >
        to change readonly: {isReadonly.valueOf() ? "true" : "false"}
      </button>
      <div className="w-1/2">
        <ReactQuill theme="snow" onChange={setValue} className="text-white" />
      </div>
      <div className="w-1/2">
        <ReactQuill
          theme="snow"
          readOnly={isReadonly}
          value={value}
          onChange={setValue}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default TestReactQuill;
