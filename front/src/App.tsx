import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./store";
import { initTy } from './models/dataType';
import Item from "./Item";
import './a.scss';


function App() {
  const { data, getData, postData, deleteData, putData, status, isdone }: any = useStore();
  //
  const [id, setId] = useState<number | null>(null)
  
  // console.log(data)
  //무한반복 제거
  useEffect(() => {
    getData()
  }, [])

  const elForm = useRef(null)
  const elForm2 = useRef(null)
  const elsubmit = useRef<HTMLInputElement>(null)
  const elsubmit2 = useRef<HTMLInputElement>(null)
  const elDoneBtn = useRef<HTMLButtonElement | null>(null)

  // console.log(elForm.current)

  //완료 버튼 활성화

  const adddata = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (elForm.current) {
      const formdata = new FormData(elForm.current);
      // console.log(formdata.get('name'))
      // console.log(Object.fromEntries(formdata)) 객체화
      const name = formdata.get('name')?.toString()
      if (name == '') {
        alert('이름을 입력해주세요')
      } else {
        postData(name, id)
      }
    }

  }
  const putdata = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (elForm2.current && id) {
      const formdata = new FormData(elForm2.current);
      // console.log(formdata.get('name'))
      // console.log(Object.fromEntries(formdata)) 객체화
      const name = formdata.get('name')?.toString()
      
      putData(name, id)
    }
    setId(null);
  }

  let isDone = (id:number) => {
      isdone(id)
      
  }

  let dataEa = data.filter((obj: initTy) => {
    return obj.sta === false;
    // return obj.id === id
    //선택한 1개만 return하여 dd값에 넣음
  })


  // 기본 셋팅 저장용

  // const adddata = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (elForm.current && id == null) {
  //     const formdata = new FormData(elForm.current);
  //     // console.log(formdata.get('name'))
  //     // console.log(Object.fromEntries(formdata)) 객체화
  //     const name = formdata.get('name')?.toString()
  //     postData(name, id)


  //   } else if (elForm.current && id) {
  //     const formdata = new FormData(elForm.current);
  //     const name = formdata.get('name')?.toString()
  //     putData(name, id)

  //   }
  //   

  // }

  if (!status) return <>Loading...</>

  return (
    <div>
      <main>
        <form className="form1" ref={elForm} onSubmit={adddata}>
          <input id="dd" type="text" name="name" />
          {/* 기본셋팅 저장 */}
          {/* <input ref={elsubmit} type="submit" value={id ? '수정' : '저장'} /> */}
          <input ref={elsubmit} type="submit" value='저장' />
        </form>

        <ul>
          <p>하고싶은 BucketList {dataEa.length}개 </p>
          {
            data.map((obj: initTy, k: number) => (
              <li className={obj.sta ? 'active' : ''} key={obj.id}>
                <Item obj={obj} k={k} />
                <div className="buttons">
                  <button onClick={() => { deleteData(obj.id) }}>삭제</button>
                  <button onClick={() => { setId(obj.id) }}>수정</button>
                  <button ref={elDoneBtn} onClick={() => (isDone(obj.id))}>{obj.sta ? '미완료' : '완료'}</button>
                </div>
              </li>
            ))
          }
        </ul>
        <form className={`form2${id ? 'active' : ''}`} ref={elForm2} onSubmit={putdata}>
          <input id="dd" type="text" name="name" />
          <input ref={elsubmit2} type="submit" value='수정' />
        </form>
      </main>
    </div>
  );
}

export default App;
