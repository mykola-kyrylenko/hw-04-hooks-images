import {React, useState, useEffect, useRef} from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import {getImages} from './services/FetchAPI';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import {Container} from './imageGalleryApp.styled';


function ImageGalleryApp() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maximumPages, setMaximumPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState({})

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [isLoading]);
 
  const handleSubmit = async (event) =>{
    event.preventDefault();

    if(query !== query){
      setCurrentPage(()=>setCurrentPage(1));
    }

    try {
      setIsLoading(()=>setIsLoading(true));
      setQuery(()=>setQuery(event.target.query.value));
      setCurrentPage(()=>setCurrentPage(1));
  
      const result = await getImages(event.target.query.value, currentPage);
      const totalImageNumber = await result.total;
      const imageArray = await result.hits;
  
      setMaximumPages(() => setMaximumPages(maximumPages + (Math.ceil(totalImageNumber/imageArray.length))));
      setIsLoading(() => setIsLoading(false));
      setImages(() => setImages(imageArray));
  
    } catch (error) {
      console.log(error)
    }
  }

  const onHandleClickMore = async ()=>{
    try {
      setCurrentPage((prev)=> prev + 1);
      setIsLoading(()=>setIsLoading(true));

      const res = await getImages(
        query,
        currentPage + 1
      );
      const imagesArr = await res.hits;

      setImages((prev)=> setImages([...prev, ...imagesArr]));
      setIsLoading(()=> setIsLoading(false));

    } catch (error) {
      console.log(error)
    }

  };

  const  toggleModal = () => {
    setShowModal(()=> setShowModal(!showModal))
  };

  const handleClickImage = (currentImage) => {
    setCurrentImage(()=>setCurrentImage(currentImage))

    toggleModal();
  };


  return (
    <Container>
      <Searchbar onSubmit={handleSubmit}/>
      {isLoading ? <Loader/> : <ImageGallery images={images} onClickImage={handleClickImage}/>}
      {query !== '' && isLoading === false ? <Button onClick={onHandleClickMore}/> : null}
      <div ref={messagesEndRef} />
      {showModal && (<Modal img={currentImage} onClose={toggleModal}/>)}

    </Container >
  )
}

export default ImageGalleryApp;
