import { useState, useCallback, ChangeEvent } from 'react';
import React from "react";
import Shinobi from "../game/Shinobi";
import update from "immutability-helper";
import { fileURLToPath } from 'url';

export default function useCardAdmin(initialShinobi: Shinobi = new Shinobi("","",0,0,0,0,0))
    :[Shinobi, (event: ChangeEvent<HTMLInputElement>) => void]{
        const [shinobi, setShinobi] = useState<Shinobi>(initialShinobi);

        const changeProperty = useCallback(
            (event: ChangeEvent<HTMLInputElement>): void => {
              const id = event.currentTarget.id;
              let value: string | File; 
              value = event.currentTarget.value;

              if(id === "image"){
                value = event.currentTarget.files![0];
              }

              setShinobi(shinobiState =>{
                const newState = update(shinobiState, {
                  [id]: { $set: value},
                });
                return newState;
              });
            },
            []
          );
        return [shinobi, changeProperty];
}