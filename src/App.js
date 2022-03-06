import React, {useEffect, useState, useRef} from 'react'
import "./App.css"

import Recipe from './components/Recipe';


const App  =() =>{

  const APP_ID = '41112bef';
  const APP_KEY ='0450a0a748bfff03733d1340eb0a8080'
  
  
  const [ recipes, setRecipes] = useState([]);
  const [search, setSearch ] = useState('')
  const [query, setQuery ]= useState('chicken')
  const inputRef = useRef()
  const exampleReq =`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  
  useEffect(()=>{
    getRecipes();
  }, [query]);

  const getRecipes = async () =>{
    const response = await fetch(exampleReq)
    const data = await response.json()
    setRecipes(data.hits) 
  }

  const updateSearch = e =>{
    setSearch(e.target.value)
  }

    const getSearch= e =>{
      e.preventDefault(); 
      setQuery(search)
      setSearch('')
      inputRef.current.focus()
    }

 return <div className='App'>
   <form className='search-form' onSubmit={getSearch}>
      <input ref={inputRef} id='input' className='search-bar' type="text"  value={search} onChange ={updateSearch}/>
      <button className='search-button' type='submit'>Search</button>
   </form>
   <div className='recipes'>
   {recipes.map((recipe, i)=>(
     <Recipe title ={recipe.recipe.label}
             key={i} 
             calories ={recipe.recipe.calories}
             image ={recipe.recipe.image}
             ingredients ={recipe.recipe.ingredients} />
   ))}
   </div>
 </div>
}
export default App;
