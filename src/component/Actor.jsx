import React, { useCallback, useEffect,useState } from "react";

export function Actor(){
    const [actor,setactor] = useState("");
    const [detail,setdetail]= useState([]);
    const [more,setmore]=useState([]);
    useEffect(() => {
        async function fetchdata() {
            const response = await fetch(`https://api.tvmaze.com/search/people?q=${actor}`);
            const res_data = await response.json();
            console.log(res_data);
            setdetail(res_data);
        }
        fetchdata();
    }, [actor]);

    const getFilms = useCallback(() => {
        let res = detail.filter((item) => item.person.name.toLowerCase() === actor.toLowerCase());
        console.log(res);
        console.log(actor.toLowerCase());
        return res;
    },[detail,actor]);
    
    useEffect(() => {
        async function fetchdata() {
            let result = getFilms();
            if(result[0].person.id != null){
                console.log(result);
                const response = await fetch(`https://api.tvmaze.com/people/${result[0].person.id}/castcredits?embed=show`);
                const res_data2 = await response.json();
                console.log(res_data2);
                if (actor.length > 0){
                    setmore(res_data2);
                }
                else{
                    setmore([]);
                }
            }
        }
        fetchdata();
    },[actor,getFilms]);

    const handleshows=(event)=>{
        setactor(event.target.value);
    }
    return(
        <div className="TVmaze">
            <div className="actor">
                <label id="tag">{actor === '' ? 'Enter Actor name Below' : 'shows are...'}</label><br/><br/>
                <input type="text" placeholder="Ex: Akon" onChange={handleshows} value={actor} id="input"/>
            </div>
            <div className="showlist">
                {
                    more.length > 0?(
                        more.map((item)=>{
                            return(
                                <div key={item._embedded.show.id} className="showitem">
                                    <h3>
                                        <img onHover={item._embedded.show.summary} src={item._embedded.show.image !== null? item._embedded.show.image.medium: ""} 
                                        alt="No available"/>
                                        <h2>{item._embedded.show.name}</h2>
                                        <h3>rating is :{item._embedded.show.rating.average}</h3>
                                        <p>{item._embedded.show.summary}</p>
                                    </h3>
                                </div>
                            )
                        })
                    ):(actor === '' ? '': <p className="result" style={{ color: "red" }}>No result found!</p>
                    )
                }
            </div>
        </div>
    )
}