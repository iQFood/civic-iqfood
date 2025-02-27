import { useContext, useState } from 'react';
import { fetchHandler } from '../utils';
import CurrentUserContext from '../contexts/current-user-context';
import ProductContext from '../contexts/ProductContext';

export default function CreateGroceryForm() {
    const [ inputValue, setInputValue ] = useState("");
    const { currentUser } = useContext(CurrentUserContext);
    const { setAddButton } = useContext(ProductContext);

    const handleCreate = async(e) => {
        e.preventDefault();
        setAddButton(true);
        try{
            const res = await fetchHandler(`/api/grocerylist/${currentUser.id}`,{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    list_name:inputValue,
                    nova_rate:0,
                }),
            });
        }catch(err){
            console.log(err);
            return null;
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }
    console.log(inputValue)

  return <form id="dashboard-list-form" onSubmit={handleCreate}>
    <label id="dashboard-list-form-label" htmlFor="listName"> <h3>Name Your New Grocery List</h3></label>
    <input type = "text" id="listName" name="listName" value={inputValue} onChange={handleChange}/>

    <button id="dashboard-list-form-submit" className='ui button'>Create</button>
  </form>
}
