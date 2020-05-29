import React,{Component} from "react"
import Update from '../src/update'

import SubCategoriesList from './subCategoriesList'
class App extends Component{

state={subCategoriesList:null,isUpdate:false,updatingItem:null,priceBeforUpdating:'',
isSavingOldPrice:true,isLoading:true,
hasRequestedForUpdate:false,indexProperty:{firstIndex:"",nextIndex:""},
isError:false
}

update=()=>{

  this.setState({...this.state,isUpdate:false,hasRequestedForUpdate:true})
    }
  
closeUpdate=()=>{
  let {subCategoriesList,priceBeforUpdating,indexProperty,hasRequestedForUpdate}=this.state

if(typeof indexProperty.firstIndex==="number" &&hasRequestedForUpdate===false){
  subCategoriesList.data[ indexProperty.firstIndex].services[indexProperty.nextIndex].price=priceBeforUpdating
  

}
    this.setState({...this,isUpdate:false,updatingItem:null,subCategoriesList})
  
  }


componentDidMount(){

  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("franchisee_id", "5ec39bec4683e5001742c394");

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("/v1.0/admin/franchisee/get_products_services?limit=10&skip=0", requestOptions)
  .then(response => response.json())
  .then(result => {

    this.setState({...this,subCategoriesList:result,isLoading:false})

  })
  .catch(error => {

    this.setState({...this,isError:true,isLoading:false})
  });



}

edit=(item)=>{

this.setState({...this,isUpdate:true,updatingItem:item})
}

changePrice=(e,item)=>{
let {isSavingOldPrice,subCategoriesList,priceBeforUpdating,indexProperty}=this.state

let isIndexDiscovered=false  
for(let i=0;i<subCategoriesList.data.length;i++){
  if(isIndexDiscovered===true){
  break
}
for(let j=0;j<subCategoriesList.data[i].services.length;j++){
  
  if(subCategoriesList.data[i].services[j]._id===item._id){
  indexProperty.firstIndex=i
  indexProperty.nextIndex=j
isIndexDiscovered=true
  break  
}
}
  
}

priceBeforUpdating=subCategoriesList.data[ indexProperty.firstIndex].services[indexProperty.nextIndex].price
 
subCategoriesList.data[ indexProperty.firstIndex].services[indexProperty.nextIndex].price=e.target.value
if(isSavingOldPrice===true){
 
isSavingOldPrice=false
  this.setState({...this,subCategoriesList,priceBeforUpdating,indexProperty,isSavingOldPrice,hasRequestedForUpdate:false})

}
this.setState({...this,subCategoriesList,indexProperty,hasRequestedForUpdate:false})

}

render(){


let {subCategoriesList,isUpdate,updatingItem,isLoading,isError}=this.state

const updateItems=<Update isUpdate={isUpdate} updatingItem={updatingItem}
closeUpdate={this.closeUpdate}
changePrice={this.changePrice}
update={this.update}
/>

const displayToUser=isLoading?(<div>Loading</div>):isError?"something went wrong":(<SubCategoriesList subCategoriesList={subCategoriesList} isUpdate={this.state.isUpdate}
edit={this.edit}

/>)
return(
<>
<div>

{displayToUser}
{updateItems}
</div>
  </>
)
  }}
export default App