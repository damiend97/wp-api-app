import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import parse from "html-react-parser";

function App() {
    let [posts, setPosts] = useState([]);
    let [postHTML, setPostHTML] = useState([]);

    useEffect(() => {
        console.log("Posts: ", posts);
        posts.forEach(post => {
            setPostHTML(oldPosts => [...oldPosts, (post.content.rendered + "<br>")]);
        });
    }, [posts])

    useEffect(() => {
        console.log("Post HTML:", postHTML);
    }, [postHTML])

    const fetchPosts = async () => {
        let data = await fetch("http://localhost/index.php?rest_route=/wp/v2/movies").then(res => res.json());
        setPosts(data);
    }

    return (
        <div className='App'>
            <button onClick={() => {fetchPosts()}}>click me</button>
            {
                postHTML.map((post, i) => {
                    return <div key={i}>{parse(post)}</div>
                })
            }
        </div>
    )
}

export default App;
