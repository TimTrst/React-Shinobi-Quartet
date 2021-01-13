import React, {useState, useEffect } from "react";
import axios from "axios";
import Shinobi from "../game/Shinobi";
import List from "./List";
import update from "immutability-helper";

export default function Admin(){
    const [shinobis, setShinobis] = useState<Shinobi[]>([]);
    useEffect(() => {
        async function fetchData(){
            const cards = await axios.get<Shinobi[]>("http://localhost:3001/card");
            setShinobis(cards.data);
        }
        fetchData();
    },[]);

    const deleteShinobi = async (id: number) => {
        await axios.delete(`http://localhost:3001/card/${id}`);
        setShinobis(shinobis => shinobis.filter((shinobi: Shinobi) => shinobi.id !== id));
    };

    const saveShinobi = async (shinobi: Shinobi) => {
        const data = new FormData();
        data.append('name', shinobi.name);
        data.append('image', shinobi.image);
        data.append('size', shinobi.size.toString());
        data.append('weight', shinobi.weight.toString());
        data.append('age', shinobi.age.toString());
        data.append('chakra', shinobi.chakra.toString());
        data.append('power', shinobi.power.toString());
        if(shinobi.id){
            const updatedShinobi = await axios.put(`http://localhost:3001/card/${shinobi.id}`, data, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });
            setShinobis(shinobis => {
                const index = shinobis.findIndex(shinobi => shinobi.id === updatedShinobi.data.id);
                return update(shinobis, {[index]: { $set: updatedShinobi.data } });
            });
        }
        else{
            const newShinobi = await axios.post('http://localhost:3001/card', data, {
              headers: {
               'content-type': 'multipart/form-data',
               },
          });
          setShinobis(shinobis => update(shinobis, { $push: [newShinobi.data] })) 
        }

    };
    
    return <List shinobis={shinobis} onDelete={deleteShinobi} onSave={saveShinobi}/>
}