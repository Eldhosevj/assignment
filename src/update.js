import React from "react"

const Update=({isUpdate,updatingItem,closeUpdate,changePrice,update})=>{


const updatTable=(<table className='content-table'>
<thead>
<tr><th className='edit'  colSpan={5}>Edit</th><th className="clossing" onClick={()=>{closeUpdate()}}>X</th></tr>
<tr className='special'>
      <th>name</th>
      <th>category</th>
      <th>sub category</th>
      {isUpdate===true && updatingItem.services.map((item,i)=>{
   
    return(<th style={{textAlign:"center"}} key={i}>{item.service_id[0].name}</th>)
    })}
    <th>action</th>
    </tr>

</thead>
<tbody>

       <tr>
        <td >{isUpdate===true && updatingItem._id.name}</td>
      <td >{isUpdate===true && updatingItem._id.category_id[0].name}</td>
      <td>{isUpdate===true && updatingItem._id.sub_category_id[0].name}</td>
      {isUpdate===true && updatingItem.services.map((subItem,j)=>{
       
       return (<td key={j} style={{textAlign:"center"}}>
           <input style={{width:"40px"}} type="number" onChange={(e)=>changePrice(e,subItem)} value={subItem.price}/></td>)
     
       }) }
 <td><button onClick={update}>update</button></td>
        
        </tr>
    </tbody>


</table>)

return(<div>{isUpdate&&updatTable}</div>)

}

export default Update