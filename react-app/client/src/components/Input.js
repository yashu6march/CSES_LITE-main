import React, { useState } from 'react'

export const Input = (props) => {
    const [input, setInput] = useState("");

    props.changesInInput(input);

    function changeInput(e) {
        const input = e.target.value;
        props.changesInInput(input);
        setInput(input);
    }
    return (
        <div>
            <textarea name="input" rows="4" spellcheck="false" id="exampleFormControlTextarea2" 
            style={{
                backgroundColor: 'rgb(180, 225, 226)',
                color: 'rgb(15, 0, 10)',
                width: '700px'
            }}
                onChange={changeInput}
                value = {input}
            />
        </div>
    )
}
