import {useForm} from 'react-hook-form'
import {db} from '../Firebase/config'
import {updateDoc,setDoc, getDoc, doc} from 'firebase/firestore'
import {React,useState,useCallback} from 'react'
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import './update.css'

export function UpdateForm() {


  const [id,setId]=useState("");   
  const [deets,setDeets]=useState([]) 
  const [flag,setFlag]=useState(false)

    const fetchEvent=async()=>{
      const res=await getDoc(doc(db,"Events",id))
      setDeets(res.data())
      setFlag(true)
    }

    const {register,handleSubmit}=useForm()
    
    const update=async(data)=>{
      console.log(data.check)
      await updateDoc(doc(db,"Events",id),{
        description:data.descr,
        rules:data.rules,
        regfee:data.fee,
        venue:data.venue,
        first:data.first,
        second:data.second,
        third:data.third,
        isActive:data.check
      })
      alert("Updated")
    }

  return (
    <div className='a'>
    <div class="get">
      <h1>UPDATE EVENT</h1>
       <h3>Enter Event id</h3>
       <input type="text"  placeholder='Event id' onChange={(e)=>setId(e.target.value)}/>
       <button onClick={fetchEvent}>Get</button>
    </div>

    {flag?(
      <form className='form' onSubmit={handleSubmit(update)}>
      <textarea type="text" placeholder='description' defaultValue={deets.description} {...register('descr')}/>
      <textarea type="text" placeholder='Rules' defaultValue={deets.rules} {...register('rules')}/>

      <label htmlFor="">Registration Fee</label>
      <input type="number" placeholder='Registration Fee' defaultValue={deets.regfee} {...register('fee')}/>
      <label htmlFor="">Venue</label>
      <input type="text" placeholder='Venue' {...register('venue')}/>

      <label htmlFor="">First</label>
      <input type="number" placeholder='first' defaultValue={deets.first} {...register('first')}/>
      <label htmlFor="">Second</label>
      <input type="number" placeholder='second'defaultValue={deets.second} {...register('second')}/>
      <label htmlFor="">Third</label>
      <input type="number" placeholder='Third' defaultValue={deets.third} {...register('third')}/>

      <label >is Active</label>
      <input type="checkbox" {...register('check')}/>

      <input type="submit" />
      </form>
    )
      :<></>}

  </div>
   
  )
}