import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function ShareBrainPage() {
    const { shareLink } = useParams();
    const [notes, setNotes] = useState([]);
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchSharedNotes() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
                setNotes(response.data.content);
                setUsername(response.data.username);
            } catch (e) {
                setError("This brain is private or does not exists.")
                setNotes([]);
            }
        }

        fetchSharedNotes();
    }, [shareLink]);

    if (error) {
        return <div className="text-red-600 ml-24 mt-4">{error}</div>
    } else {
        return <div>
            <div>
                {username}'s Brain
            </div>
            <div className='flex gap-4 ml-24 mt-4 flex-wrap'>
                {notes.map((note) => <Card
                    key={note._id}
                    id={note._id}
                    type={note.type}
                    link={note.link}
                    title={note.title}
                    tag={note.tag}
                />)}
            </div>
        </div>
    }
}