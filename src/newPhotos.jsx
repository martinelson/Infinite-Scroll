import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NewPhotos(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [pics, setPics] = useState([])
    const [hasMore, setHasMore] = useState(false)
    useEffect(() => {
        setLoading(true)
        setError(false)
        axios.get("https://picsum.photos/v2/list?page="+pageNumber.toString()+"&limit=100").then(res => {
            setPics(prevPics => {
                return [...new Set([...prevPics, ...res.data.map(p => p.download_url)])]
            })
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(e => {
            setError(true)
        })
    }, [pageNumber]);
    return { loading, error, pics, hasMore}
}
