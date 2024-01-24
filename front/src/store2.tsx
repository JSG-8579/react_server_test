import axios from "axios";
import { create } from "zustand";

const request = axios.create({
    baseURL: process.env.REACT_APP_baseURL2,
    timeout: 1000
})

export const useStore2 = create((set) => {

    return {
        data: [],

        status: false,
        //데이터 불러오기
        getData: () => {
            set({ status: false });
            request.get('/')
                .then(res => {
                    set({ data: res.data, status: true })
                    //작업이 끝나면 true 변경
                    
                })
                //오류시 메세지
                .catch((err) => {
                    console.log(err)
                })
        },
        postData: (value:string) =>{
            set({ status:false});
            request.post('/',{id:Date.now(), name:value, sta:false})
                .then(res => {
                    set({data:res.data, status: true})
                })
        },
        deleteData: (id2:number)=> {
            set({ status:false});
            request.delete(`/${id2}`)
                .then(res =>{
                    set({data:res.data, status: true})
                })
        },
        putData: (value:string,id:number)=>{
            set({ status:false});
            request.put('/',{id: id, name:value, sta:false})
                .then(res => {
                    set({data:res.data, status: true})
                })
        },
        
        isdone: (id:number)=>{
            set({ status:false});
            request.put('/isdone',{id})
                .then(res => {
                    set({data:res.data, status: true})
                })
        }


    }
})