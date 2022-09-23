import React, { useEffect, useState } from "react";

export function Shows(){
    const [shows,setshows]=useState("");
    const [detail,setdetail]=useState([]);
    useEffect(() => {
        async function fetchdata() {
          const response = await fetch(
            `https://api.tvmaze.com/search/shows?q=${shows}`
          );
          const res_data = await response.json();
          console.log(res_data);
          setdetail(res_data);
        }
        fetchdata();
      }, [shows]);

    const handleshows=(event)=>{
        setshows(event.target.value);
    }
    return(
        <div className="TVmaze">
            <div className="show">
                <label id="tag">{shows === '' ? 'Enter Show name Below' : 'shows are...'}</label><br /><br />
                <input type="text" placeholder="Ex: Friends" value={shows} onChange={handleshows} id="input"/>
            </div>
            <div className="showlist">
                {
                    detail.length > 0?(
                        detail.map((item)=>
                        {
                            return(
                                <div key={item.show.id} className="showitem">
                                    <h3 >
                                    <img src={item.show.image !== null? item.show.image.medium: ""} alt="not found"/>
                                    <h2>{item.show.name}</h2>
                                    <h3>rating is :{item.show.rating.average}</h3>
                                    <p>{item.show.summary}</p>
                                    </h3>
                                </div>
                            )
                        }
                        )
                    ) :(shows === '' ? '':<p className="result" style={{ color: "red" }}>No result found!</p>)
                }
            </div>
        </div>
    )
}