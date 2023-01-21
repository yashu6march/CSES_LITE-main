import React, { useState } from 'react'

export const LanguageChoice = (props) => {
    const [lang, setLang] = useState('CPP14');
    props.changesInLang(lang);

    function changeLang(e) {
        const lang = e.target.value;
        setLang(lang);
        props.changesInLang(lang);
    }
    return (
        <div>
            <label for="lang" >Choose a Language:</label>
            <select id="lang" name="lang" value={lang} onChange={changeLang}>
                <option value="CPP14">CPP14</option>
                <option value="JAVA8">JAVA8(class = Main)</option>
                <option value="Python3">Python3</option>
            </select>
        </div>
    )
}