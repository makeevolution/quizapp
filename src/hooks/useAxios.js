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

export default useAxios