import React from 'react'
import '../src/css/sub_categories_list.css'

const subCategoriesList=({subCategoriesList,isUpdate,edit})=>{

  const table=(<table className='content-table'>
    <thead>
<tr className='top-row'><th colSpan={6}>Sub Categories List</th></tr>
    <tr>
      <th>name</th>
      <th>category</th>
      <th>sub category</th>
      {subCategoriesList && subCategoriesList.success===true && subCategoriesList.data[0].services.map((item,i)=>{
   
    return(<th key={i}>{item.service_id[0].name}</th>)
    })}
    <th>action</th>
    </tr>
    </thead>
    <tbody>
    { subCategoriesList &&subCategoriesList.success===true&& subCategoriesList.data.map((item,i)=>{
   
      return (<tr key={i}>
        <td >{item._id.name}</td>
      <td >{item._id.category_id[0].name}</td>
      <td>{item._id.sub_category_id[0].name}</td>
        {item.services.map((subItem,j)=>{
       
      return (<td key={j} style={{textAlign:"center"}}>{subItem.price}</td>)
    
      }) }<td style={{textAlign:"center"}}><button onClick={()=>edit(item,i)}>Edit</button></td></tr>)
    } )}
    </tbody>
    </table>)
    

  return(<div className="container">{subCategoriesList&&subCategoriesList.success===true&& table}</div>)

}

export default subCategoriesList