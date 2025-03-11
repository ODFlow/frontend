"use client";
import axios from 'axios'
import { useState } from 'react';


const TestFetch = () => {
const [city, setCity] = useState(null);
const [error, setError] = useState(null);
const [response, setResponse] = useState(null);

const url = 'https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/tyokay/statfin_tyokay_pxt_115b.px'

const jsonq = 
{
    "query": [
      {
        "code": "Alue", 
        "selection": {
          "filter": "item",
          "values": [
            "KU564" // change the city
          ]
        }
      },
      {
        "code": "Pääasiallinen toiminta",
        "selection": {
          "filter": "item",
          "values": [
            "SSS" 
          ]
        }
      },
      {
        "code": "Sukupuoli",
        "selection": {
          "filter": "item",
          "values": [
            "1",
            "2"
          ]
        }
      },
      {
        "code": "Ikä",
        "selection": {
          "filter": "item",
          "values": [
            "0-17",
            "18-64",
            "65-"
          ]
        }
      },
      {
        "code": "Vuosi",
        "selection": {
          "filter": "item",
          "values": [
            "2023"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
}



const tryReq = async (event) => {
    event.preventDefault();
    try {
        const re = await axios.post(url, jsonq);
        setResponse(re.data);
    } catch (e) {
        setError(err);
    } finally {}
}

const parseData = (response) => {
  const { dimension, value } = response;
  const formattedData = [];

 const areas = dimension.Alue.category.label;
 const sex = dimension.Sukupuoli.category.label;
 const age = dimension.Ikä.category.label;


const labels = [
  { label: "Area", data: areas },
  { label: "Sex", data: sex },
  { label: "Age", data: age },
];
}

return (
    <div>
        <button onClick={tryReq}>Button</button>
        {response && (<pre>{JSON.stringify(response, null, 2)}</pre>)}
        
    </div>
)

}




export default  TestFetch;