import React, { useState } from "react";
import {Shows} from "./Shows";
import {Actor} from "./Actor";

export function Mvproject(){
    const [selected,setSelected]=useState(true);
    return (
    <div className="App">
        <div className="movie">
            <div className='header'>
                <div className='header-details'>
                    <h1>TV maze</h1>
                    <h2>Please Select Your Choice</h2>
                    <label htmlFor="Shows" id="label">Shows</label>
                    <input type="radio" id="Shows" onChange={()=>setSelected(true)} name="movie" defaultChecked={true}/><br/>
                    <label htmlFor="Shows" id="label">Actors</label>
                    <input type="radio" id="Actors" onChange={()=>setSelected(false)} name="movie"/>
                </div>
                <br/><br/><br/>
            </div>
        </div>
        <div className='shows-display'>{selected === false ? <Actor /> : " "}
        {selected === true ? <Shows /> : " "}</div>
    </div>
    );
}
export default Mvproject;