import React, {createRef} from 'react';

const NightMode = () => {
    let mode = localStorage.getItem('theme');
    let el = createRef();
    document.documentElement.setAttribute('data-theme', mode);

    const switchMode = (evt) => {
       mode = el.checked ? 'dark': 'light';
       localStorage.setItem('theme', mode);
       document.documentElement.setAttribute('data-theme', mode);
    }
    
    return (
        <div className="night-mode-switch">
            <input 
            type="checkbox"
            ref={(input) => {el = input;}}
            onChange={switchMode}
            defaultChecked={mode === 'dark'}
            id="nightmode"/>
            <label htmlFor="nightmode">on</label>
         </div>
    )
}

export default NightMode;