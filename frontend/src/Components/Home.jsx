import React, { useContext, useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/components/prism-javascript";
import { UserContext } from "../Context/user.context";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [code, setCode] = useState(`function Test () { return "hello" }`);
  const { checkAuth, user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const source = `
Okay, here's a review of the JavaScript code snippet, formatted in Markdown:

## Code Review: \`function(a, b){ return a + b }\`

**Code:**

\`\`\`javascript
function(a, b){ return a + b }
\`\`\`

**Analysis:**

*   **Functionality:** The code defines an anonymous JavaScript function that takes two arguments (\`a\` and \`b\`) and returns their sum.
*   **Implicit Type Coercion:** JavaScript is dynamically typed. If \`a\` and \`b\` are numbers, it performs addition; if strings, concatenation.
*   **Context:** It's an anonymous function. To be useful, it needs to be assigned to a variable or invoked directly.
*   **Conciseness:** The code is straightforward and brief.
*   **Readability:** Naming and commenting the function improves clarity.

**Suggestions:**

1. **Assign to a Variable:**
\`\`\`javascript
const add = function(a, b) { return a + b; };
let sum = add(5, 3);  // sum is 8
\`\`\`

2. **Arrow Function Syntax:**
\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`

3. **Type Checking:**
\`\`\`javascript
const addNumbers = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return NaN;
  }
  return a + b;
};
\`\`\`

4. **Using an IIFE:**
\`\`\`javascript
(function(a,b){console.log(a+b)})(1,2); // Output: 3
\`\`\`

**Summary:**

The original code works but can be improved with context and readability. Using arrow functions with or without type checking depends on your use case.
`;
  useEffect(() => {
    checkAuth(navigate); // runs only once
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-grow flex gap-2 px-2 mt-2">
        <div className="w-[50%] h-[650px] rounded-2xl overflow-auto bg-[#1E1E1E] text-white">
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
              backgroundColor: "#1e1e1e",
              color: "#f8f8f2",
            }}
          />
        </div>
        <div className="w-[50%] h-[650px] rounded-2xl overflow-y-scroll">
          <MarkdownPreview
            source={source}
            style={{
              padding: 16,
              backgroundColor: "#1e1e1e", // Darker background for better contrast
              color: "#f8f8f2",
              borderRadius: "12px",
              fontFamily: "Montserrat",
              fontSize: 14,
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
      <div className="h-[60px] w-full flex p-2">
        <div className="bg-white  px-4 py-2 text-[15px] font-mont text-black flex justify-center items-center rounded-[10px] cursor-pointer font-medium">
          Review
        </div>
      </div>
    </div>
  );
}
