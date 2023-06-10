import axios from 'axios';
import { useEffect, useState } from 'react'

axios.defaults.baseURL = "https://opentdb.com/"

const useAxios = ({ url }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchData = () => {
            axios  // This is like the javascript fetch function
                .get(url)
                .then(res => setResponse(res.data))
                .catch(err => setError(error))
                .finally(() => setLoading(false))
        }
        fetchData();  // Actually call fetchData
    }, [url]);

    return { response, error, loading }
}

const trackerAPIinstance = axios.create({
    baseURL: `https://localhost:7225/`
})


const useTrackerAPIget = (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      trackerAPIinstance.get(url)
        .then(response => {
          setResponse(response.data); // Update the response state with the fetched data
          console.log(response.data)
          setLoading(false); // Set loading state to false since data fetching is complete
        })
        .catch(error => {
          setError(error.message); // Update the error state with the error message
          console.log(url)
          console.log(error.message)
          setLoading(false); // Set loading state to false in case of an error
        });
    }, [url]);
  
    return { response, error, loading };
  };

const useTrackeAPIpost = (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      trackerAPIinstance.get(url)
        .then(response => {
          setResponse(response.data); // Update the response state with the fetched data
          console.log(response.data)
          setLoading(false); // Set loading state to false since data fetching is complete
        })
        .catch(error => {
          setError(error.message); // Update the error state with the error message
          console.log(url)
          console.log(error.message)
          setLoading(false); // Set loading state to false in case of an error
        });
    }, [url]);
  
    return { response, error, loading };
  };

export { useTrackerAPIget }

export default useAxios