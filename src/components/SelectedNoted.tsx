import { useState } from "react";
import { BsThreeDots, BsCalendarMinus, BsFolder } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SelectedNoted = () => {
  const [value, setValue] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("My Goals Next Year");

  return (
    <section className="px-4 py-3 text-white flex flex-col gap-4 h-full parent">
      <div className="child-1">
        <div className="w-full flex justify-between items-center">
          <input
            type="text"
            className="p-3 rounded-md text-xl basis-4/5 bg-[#181818]"
            placeholder="Write some text to title...."
            value={folderName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFolderName(e.target.value)
            }
          />
          <div className="basis-1/5 flex justify-center items-center">
            <button className="border-2 border-slate-600 rounded-full p-2">
              <BsThreeDots className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex gap-28 pb-6 border-b-2 border-b-slate-600">
            <h3 className="flex items-center gap-6 text-md">
              <BsCalendarMinus />
              Date
            </h3>
            <p>1/11/2024</p>
          </div>
          <div className="w-full flex gap-28 pb-6 border-b-2 border-b-slate-600">
            <h3 className="flex items-center gap-6 text-md">
              <BsFolder />
              Folder
            </h3>
            <p>Personal</p>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-auto max-h-full">
        <ReactQuill
          theme="snow"
          // value={value}
          onChange={setValue}
          className="text-white max-h-full desc overflow-auto"
        />
      </div>
    </section>
  );
};

export default SelectedNoted;
