import { useEffect, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Article = "article",
    Music = "songs",
    Instagram = "instagram"
}

export function CreateContentModal({ open, onClose, fetchContent, noteToEdit }) {
    const [type, setType] = useState(ContentType.Youtube);
    const [error, setError] = useState('');
    const [title, setTitle]= useState('');
    const [link, setLink]= useState('');
    const [tag, setTag]= useState('');

    useEffect(()=>{
        if(noteToEdit){
            setTitle(noteToEdit.title);
            setLink(noteToEdit.link);
            setTag(noteToEdit.tag);
        }else{
            setTitle('');
            setLink('');
            setTag('');
        }
    },[noteToEdit]);


    async function addContent() {
        if (!title.trim()) {
            setError("Title cannot be empty!")
            return;
        }
        if (!link.trim()) {
            setError("Link cannot be empty!")
            return;
        }

        try {
            new URL(link)
        } catch (_) {
            setError("Enter Valid URL")
            return;
        }

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type,
            tag
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        fetchContent();
        onClose();
    }

    const handleClose = () => {
        setError("");
        onClose();
    }

    async function updateContent(){
        if (!title.trim()) {
            setError("Title cannot be empty!")
            return;
        }
        if (!link.trim()) {
            setError("Link cannot be empty!")
            return;
        }

        try  {
            new URL(link)
        } catch (_) {
            setError("Enter Valid URL")
            return;
        }

        await axios.put(`${BACKEND_URL}/api/v1/content/${noteToEdit._id}`, {
            link,
            title,
            type,
            tag
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        fetchContent();
        onClose();
    }
    

    return <div>
        {open && <div>
            <div className="w-screen h-screen top-0 left-0 fixed bg-slate-500 opacity-60 flex justify-center">
            </div>
            <div className="w-screen h-screen left-0 fixed flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded">
                        <div className="flex justify-end cursor-pointer" onClick={handleClose}>
                            <CrossIcon />
                        </div>
                        <div>
                            <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder={"Title"} />
                            <Input value={link} onChange={(e)=>setLink(e.target.value)} placeholder={"Link"} />
                            <Input value={tag} onChange={(e)=>setTag(e.target.value)} placeholder={"Tags"} />
                            {error && <p className="text-red-500 text-sm mt-1 ml-2">{error}</p>}
                        </div>
                        <div>
                            <center>
                                <h1>Type</h1>
                            </center>
                            <div className="flex gap-1 p-4">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Youtube)
                                }} />
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter)
                                }} />
                                <Button text="Article" variant={type === ContentType.Article ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Article)
                                }} />
                                <Button text="Music" variant={type === ContentType.Music ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Music)
                                }} />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={noteToEdit? updateContent : addContent} variant="primary" text={noteToEdit? "Save Changes" : "Create Post"} />
                        </div>
                    </span>
                </div>
            </div>
        </div>}
    </div>
}
