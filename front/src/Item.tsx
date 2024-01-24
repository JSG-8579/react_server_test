import React from 'react';
import { initTy } from './models/dataType';
import { useStore } from './store';

interface Own{
    obj:initTy
    k:number
}

function Item({obj, k}:Own) {
    // const {deleteData }:any = useStore()
    return (
        <div>
            <p>{k+1}    {obj.name}</p>
        </div>
    );
}

export default Item;