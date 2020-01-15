import { useEffect, useState } from 'react';

const PIXABAY_ROOT_URL = 'https://pixabay.com/api/';

export default function usePixabayApi(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(process.env);
    setLoading(true);
    fetch(
      `${PIXABAY_ROOT_URL}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&image_type=photo&q=${query}`
    ).then(response => {
      response.json().then(data => {
        setData(data.hits);
      });
      setLoading(false);
    });
  }, [query]);
  return { data, loading };
}
