import React, { useState, useEffect, createContext, useContext } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [pages, setPages] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPages = async () => {
            const response = await fetch('https://content.vita325.com/wp-json/wp/v2/pages');
            const data = await response.json();
            setPages(data);
        };
        
        const fetchPosts = async () => {
            const response = await fetch('https://content.vita325.com/wp-json/wp/v2/posts');
            const data = await response.json();
            setPosts(data);
        };

        fetchPages();
        fetchPosts();
    }, []);

    return (
        <DataContext.Provider value={{ pages, posts }}>
            {children}
        </DataContext.Provider>
    );
};

const useData = () => useContext(DataContext);

const PagesList = () => {
    const { pages } = useData();

    return (
        <div>
            <h1>Pages</h1>
            <ul>
                {pages.map(page => (
                    <li key={page.id}>
                        <h2>{page.title.rendered}</h2>
                        <p dangerouslySetInnerHTML={{ __html: page.content.rendered }}></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const PostsList = () => {
    const { posts } = useData();

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title.rendered}</h2>
                        <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const App = () => {
    return (
        <DataProvider>
            <div>
                <PagesList />
                <PostsList />
            </div>
        </DataProvider>
    );
};

export default App;
