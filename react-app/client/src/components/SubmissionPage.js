import React, { useState } from 'react'
import CodeEditor from './CodeEditor'
import {LanguageChoice} from './LanguageChoice'
import {Input} from './Input'

export const SubmissionPage = () => {

  const [verdict, setVerdict] = useState("");

  const instance = {code: "ggwp", lang: "CPP14", input:"Hello World"};

  function changeCode(code) {
    instance.code = code;
  }

  function changeLang(lang) {
    instance.lang = lang;
  }

  function changeInput(input) {
    instance.input = input;
  }

  const PostData = async (e) => {
    e.preventDefault();

    const res = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(instance)
    });

    const data = await res.json();
    if (!data) {
      console.log('No Response!');
      window.alert('Couldn\'t compile');
    } else {
      const ver = data.message;
      console.log(ver);
      setVerdict(ver);
    }
  }

  return (
    <>
      <form method='POST'>
        <CodeEditor
          changesInCode = {changeCode}
        />
        <Input
          changesInInput = {changeInput}
        />
        <LanguageChoice
          changesInLang = {changeLang}
        />

        <button type='submit' onClick={PostData}>submit</button>
      </form>
      <h1>
        {verdict}
      </h1>
    </>
  )
}
