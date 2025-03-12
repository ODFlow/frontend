"use client";
import axios from 'axios'
import { useState } from 'react';
import { trafficQuery } from './sq-api_table_statfin_ton_pxt_12qh.px';
import { employmentRate } from './sq-api_table_statfin_tyonv_pxt_12r5.px';
import { generalAge } from './sq-api_table_statfin_vaerak_pxt_11ra.px';
import { crimeRate } from './sq-api_table_statfin_rpk_pxt_13it.px';

const GeneralFetch = () => {
const [city, setCity] = useState(null);
const [error, setError] = useState(null);
const [response, setResponse] = useState(null);

const url = 'https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/ton/statfin_ton_pxt_12qh.px'
//const url = 'https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/tyonv/statfin_tyonv_pxt_12r5.px'
// const url = 'https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/vaerak/statfin_vaerak_pxt_11ra.px'
// const url = 'https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/rpk/statfin_rpk_pxt_13it.px'





const tryReq = async (event) => {
    event.preventDefault();
    try {
        const re = await axios.post(url, trafficQuery.queryObj);
        setResponse(re.data);
        console.log(re.data.dimension.Alue.category.label);
        console.log(re.data.dimension.Vuosi.category.label);
        console.log(re.data.dimension.Kuukausi.category.label);
        //console.log(re.data.dimension.Tiedot.category.label);
        //console.log(re.data.dimension.Kunta.category.label);
        //console.log(re.data.dimension.Kuukausi.category.label);
        //console.log(re.data.dimension["Rikosryhmä ja teonkuvauksen tarkenne"]["category"]["label"])
        console.log(re.data.value);
    } catch (e) {
        setError(e);
    } finally {}
}

function parseData(data) {
    const areas = Object.values(data.dimension.Alue.category.label);
    const years = Object.values(re.data.dimension.Vuosi.category.label);
    const accidentTypes = Object.values(data.dimension.Tiedot.category.label);

    const table = [];

    const areaSize = data.size[0];
    const yearSize = data.size[1];
    const typeSize = data.size[2];

    const values = [];

    
}



return (
    <div>
        <button onClick={tryReq}>Button</button>
        {response && (<pre>{JSON.stringify(response, null, 2)}</pre>)}
        
    </div>
)

}




export default  GeneralFetch;