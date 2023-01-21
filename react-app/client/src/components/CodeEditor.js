import React, {useState} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import 'prismjs/components/prism-markup'
import "prismjs/components/prism-jsx";

import "./styles/reset.css";
import "./styles/editor.css";

const defCode = ``;

const CodeEditor = (props) => {

  const [code, setCode] = useState(defCode);
  props.changesInCode(code);

  function onChange(code) {
    setCode(code);
    props.changesInCode(code);
  }

  return (
    <>
      <Editor
        value={code}
        onValueChange={(code) => onChange(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          backgroundColor: '#f7f7f7',
          height: '500px'
        }}
      />
    </>
  )
}

export default CodeEditor;