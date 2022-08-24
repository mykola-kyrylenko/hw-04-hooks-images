import {SearchBar, SearchForm, SearchFormButton, SearchFormInput} from '../imageGalleryApp.styled';
import {ImSearch} from "react-icons/im";
import {React, useState} from 'react';

function Searchbar({onSubmit}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event)=>{
    setInputValue(()=>setInputValue(event.target.value))
  }


  return (
    <SearchBar>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit" >
          <ImSearch></ImSearch>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name='query'
          value={inputValue}
          onChange={handleInputChange}
        />
      </SearchForm>
    </SearchBar>
  )
}

export default Searchbar;