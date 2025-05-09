import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
type Content = {
    _id: string;
    title: string;
    type: string ;
    link: string;
    tag: string;
    // Add other properties here if your content has more (like `body`, `tags`, etc.)
  };

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);

    async function fetchContent() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        setContents(response.data.content)
    }

    async function deleteContent(id: string) {
        await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        setContents((prevContents) => prevContents.filter(content => content._id !== id))
    }
    useEffect(() => {
        fetchContent();
    }, [])

    return { contents, fetchContent, deleteContent };
}