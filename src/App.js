import React, { useState, useRef, useCallback } from 'react';
import NewPhotos from './newPhotos';

function App() {
  const[pageNumber, setpageNumber] = useState(1);

  const {
    pics,
    hasMore,
    loading,
    error
  } = NewPhotos(pageNumber)

  const observer = useRef()
  const lastPicElementRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setpageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handlepageNumber() {
    setpageNumber(1);
  }

  return (
    <div>
      <p onLoad={handlepageNumber}>Infinite Lorem Picsum Scroll</p>
      <p className="credits">created by: Martin Nelson</p>
      <p className="credits">using: <a href="https://picsum.photos/" target="_blank" rel="noreferrer">Lorem Picsum</a></p>
      {pics.map((pic, index) => {
        if(pics.length - 10 === index - 9){
          return <img ref={lastPicElementRef} src={pic} key={pic} alt={pic}></img>
        } else {
          return <img src={pic} key={pic} alt={pic}></img>
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
  );
}

export default App;
