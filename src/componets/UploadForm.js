import React from 'react'
import {db} from '../Firebase/config'
import {doc,setDoc} from 'firebase/firestore'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import '../Upload.css'

export function UploadForm() {

      const schema=yup.object().shape({
    eventid:yup.string().required().max(5),
    name:yup.string().required(),
    headName:yup.string().required(),
    headPhno:yup.number().min(10).required(),
    sub1Name:yup.string().required(),
    sub1Phno:yup.number().min(10).required(),
    sub2Name:yup.string().required(),
    sub2Phno:yup.number().min(10).required(),
    category:yup.string().required(),
    subcategory:yup.string().required(),
    isTeam:yup.number().min(-1).max(2).required(),
    amount:yup.number().required(),
    spots:yup.number().required(),
    descr:yup.string().required(),
    rules:yup.string()
  })
  
  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(schema)
  })

  const post=async(data)=>{
    const docRef=doc(db,"Events",data.eventid)

    await setDoc(docRef,{
      eventid:data.eventid,
      name:data.name,
      headName:data.headName,
      headPhno:data.headPhno,
      sub1Name:data.sub1Name,
      sub1Phno:data.sub1Phno,
      sub2Name:data.sub2Name,
      sub2Phno:data.sub2Phno,
      category:data.category,
      subcategory:data.subcategory,
      spots:data.spots,
      regfee:data.amount,
      isTeam:data.isTeam==0?false:true,
      isActive:true,
      description:data.descr,
      rules:data.rules,
      bannerpath:"",
      venue:""
    })
    
  }

  return (
    <div className='upload'>
              <h1 className='title'>Upload Events</h1>

      <form className='admin-form' onSubmit={handleSubmit(post)}>
        <input type="text" placeholder='eventid'{...register('eventid')}/>
        {errors.eventid?<p className='err'>{errors.eventid.message}</p>:<></>}

        <input type="text" placeholder='name'{...register('name')}/>
        {errors.name?<p className='err'>{errors.name.message}</p>:<></>}

        <input type="text" placeholder='HeadName'{...register('headName')}/>
        {errors.headName?<p className='err'>{errors.headName.message}</p>:<></>}

        <input type="number" placeholder='HeadPhone number'{...register('headPhno')}/>
        {errors.headPhno?<p className='err'>{errors.headPhno.message}</p>:<></>}

        <input type="text" placeholder='Subhead 1 name'{...register('sub1Name')}/>
        {errors.sub1Name?<p className='err'>{errors.sub1Name.message}</p>:<></>}

        <input type="number" placeholder='Subhead 1 phone number'{...register('sub1Phno')}/>
        {errors.sub1Phno?<p className='err'>{errors.sub1Phno.message}</p>:<></>}

        <input type="text" placeholder='Subhead 2 name'{...register('sub2Name')}/>
        {errors.sub2Name?<p className='err'>{errors.sub2Name.message}</p>:<></>}

        <input type="number" placeholder='Subhead 2 phone number'{...register('sub2Phno')}/>
        {errors.sub2Phno?<p className='err'>{errors.sub2Phno.message}</p>:<></>}


        <input type="text" placeholder='Category :: Technical || Cultural'{...register('category')}/>
        {errors.category?<p className='err'>{errors.category.message}</p>:<></>}

        <input type="text" placeholder='Subcategory'{...register('subcategory')}/>
        {errors.subcategory?<p className='err'>{errors.subcategory.message}</p>:<></>}

        <input type="number" placeholder='Is it a team event (True/False)'{...register('isTeam')}/>
        {errors.isTeam?<p className='err'>{errors.isTeam.message}</p>:<></>}

        <input type="number" placeholder='Amount'{...register('amount')}/>
        {errors.amount?<p className='err'>{errors.amount.message}</p>:<></>}

        <input type="number" placeholder='Spots'{...register('spots')}/>
        {errors.spots?<p className='err'>{errors.spots.message}</p>:<></>}


        <textarea className='textarea' type="text" placeholder='Event description'{...register('descr')}/>
        {errors.descr?<p className='err'>{errors.descr.message}</p>:<></>}

        <textarea  className='textarea' type="text" placeholder='Rules and regulations'{...register('rules')}/>
        {errors.rules?<p className='err'>{errors.rules.message}</p>:<></>}

        <input type="submit" className='submit'/>
      </form>
    </div>
  )
}

export default UploadForm