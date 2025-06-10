import React, { useContext, useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/components/prism-javascript";
import { UserContext } from "../Context/user.context";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import LoadingReview from "./LoadingReview";

export default function Home() {
  const [code, setCode] = useState(`function sayHello(){\nreturn "hello";\n}`);
  const { checkAuth, user, loading, reviewCode } = useContext(UserContext);
  const [reviewLoad, setreviewLoad] = useState(false);
  const navigate = useNavigate();
  const [review, setReview] = useState(
    "### Code review will be displayed here."
  );
  useEffect(() => {
    checkAuth(navigate); // runs only once
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {loading ? <Loading></Loading> : ""}
      {reviewLoad ? <LoadingReview></LoadingReview> : ""}
      <div className="w-full flex-grow flex gap-2 px-2 mt-2">
        <div className=" relative w-[50%] h-[700px] rounded-2xl overflow-auto bg-[#1E1E1E] text-white">
          <Editor
            className="my-code-editor"
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 18,
              height: "100%",
              width: "100%",
              overflowY: "scroll",
              backgroundColor: "#1e1e1e",
              color: "#f8f8f2",
            }}
          />
          <div
            className="bg-white absolute z-10 bottom-3 right-3 px-4 py-2 text-[15px] font-mont text-black flex justify-center items-center rounded-[10px] cursor-pointer font-medium"
            onClick={() => {
              reviewCode(code, setReview, setreviewLoad);
            }}
          >
            Review
          </div>
        </div>
        <div className="w-[50%] h-[700px] rounded-2xl overflow-y-scroll">
          <MarkdownPreview
            source={review}
            style={{
              padding: 16,
              backgroundColor: "#1e1e1e", // Darker background for better contrast
              color: "#EDF2FA",
              borderRadius: "12px",
              fontFamily: "monospace",
              fontSize: 16,
              height: "700px",
              overflowY: "scroll",
              lineHeight: 1.6,
            }}
            wrapperElement={{
              "data-color-mode": "dark",
              style: {
                backgroundColor: "#1e1e1e",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
