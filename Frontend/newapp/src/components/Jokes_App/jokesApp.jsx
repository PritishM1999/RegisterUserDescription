import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import './JokesApp.css';

const JokesApp = () => {
    const [joke, setJoke] = useState(null);
    const [rating, setRating] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetchJoke();
    }, []);

    const fetchJoke = async () => {
        try {
            const response = await fetch(
                'https://official-joke-api.appspot.com/random_joke'
            );
            const data = await response.json();
            setJoke(data);
            setRating(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRating = (value) => {
        setRating(value);
        if (localStorage.getItem(`joke_${joke.id}_rating`)) {
            localStorage.removeItem(`joke_${joke.id}_rating`);
        }
        localStorage.setItem(`joke_${joke.id}_rating`, value);
    };

    const handleBookmark = () => {
        const newBookmarks = [...bookmarks, joke];
        setBookmarks(newBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    };

    const removeBookmark = (id) => {
        const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
        setBookmarks(newBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div className="container">
            <header className="mb-4">
                <h1 className="text-center">Joke App</h1>
                <div className="d-flex justify-content-between align-items-center">
                    <Button color="primary" onClick={fetchJoke}>
                        Generate Joke
                    </Button>
                    <div>
                        <Button color="primary" onClick={toggleModal}>
                            <i className="bi bi-bookmark"></i>
                            <span className="d-none d-md-inline">Bookmarks</span>
                            {bookmarks.length > 0 && (
                                <span className="badge bg-primary">{bookmarks.length}</span>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            <main>
                {joke && (
                    <Card className="mb-4">
                        <CardHeader>{joke.type}</CardHeader>
                        <CardBody>
                            <p>{joke.setup}</p>
                            <p>{joke.punchline}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="rating">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <i
                                            key={value}
                                            className={`bi bi-star-fill${rating === value ? '' : '-gray'
                                                }`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleRating(value)}
                                        ></i>
                                    ))}
                                </div>
                                <div>
                                    <Button color="primary" onClick={handleBookmark}>
                                        <i className="bi bi-bookmark-plus"></i>
                                        <span className="d-none d-md-inline">Bookmark</span>
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <small>id: {joke.id}</small>
                        </CardFooter>
                    </Card>
                )}

                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Bookmarks</ModalHeader>
                    <ModalBody>
                        {bookmarks.length === 0 && (
                            <p>You have not bookmarked any jokes yet!</p>
                        )}
                        {bookmarks.map((bookmark) => (
                            <Card className="mb-3" key={bookmark.id}>
                                <CardHeader>{bookmark.type}</CardHeader>
                                <CardBody>
                                    <p>{bookmark.setup}</p>
                                    <p>{bookmark.punchline}</p>
                                </CardBody>
                                <CardFooter>
                                    <Button color="danger" onClick={() => removeBookmark(bookmark.id)}>
                                        Remove
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggleModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </main>

            <footer className="mt-4 text-center">
                <p>
                    Made by <a href="https://example.com">Your Name</a>
                </p>
                <p>
                    Source code available on{' '}
                    <a href="https://github.com/example/joke-app">GitHub</a>
                </p>
            </footer>
        </div>
    );
};

export default JokesApp;





// import React, { useState, useEffect } from 'react';
// import { Button, Card, CardHeader, CardBody, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// // import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from 'reactstrap';
// import './JokesApp.css';

// const JokesApp = () => {
//     const [joke, setJoke] = useState(null);
//     const [rating, setRating] = useState(null);
//     const [bookmarks, setBookmarks] = useState([]);
//     const [modal, setModal] = useState(false);

//     useEffect(() => {
//         fetchJoke();
//     }, []);

//     const fetchJoke = async () => {
//         const response = await fetch('https://official-joke-api.appspot.com/random_joke');
//         const data = await response.json();
//         setJoke(data);
//         setRating(null);
//     };

//     const handleRating = (value) => {
//         setRating(value);
//         localStorage.setItem(`joke_${joke.id}_rating`, value);
//     };

//     const handleBookmark = () => {
//         const newBookmarks = [...bookmarks, joke];
//         setBookmarks(newBookmarks);
//         localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
//     };

//     const removeBookmark = (id) => {
//         const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
//         setBookmarks(newBookmarks);
//         localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
//     };

//     const toggleModal = () => {
//         setModal(!modal);
//     };

//     return (
//         <div className="container">
//             <header className="mb-4">
//                 <h1 className="text-center">Joke App</h1>
//                 <div className="d-flex justify-content-between align-items-center">
//                     <Button color="primary" onClick={fetchJoke}>
//                         Generate Joke
//                     </Button>
//                     <div>
//                         <Button color="primary" onClick={toggleModal}>
//                             <i className="bi bi-bookmark"></i>
//                             <span className="d-none d-md-inline">Bookmarks</span>
//                             {bookmarks.length > 0 && (
//                                 <span className="badge bg-primary">{bookmarks.length}</span>
//                             )}
//                         </Button>
//                     </div>
//                 </div>
//             </header>

//             <main>
//                 {joke && (
//                     <Card className="mb-4">
//                         <CardHeader>{joke.type}</CardHeader>
//                         <CardBody>
//                             <p>{joke.setup}</p>
//                             <p>{joke.punchline}</p>
//                             <div className="d-flex justify-content-between align-items-center">
//                                 <div className="rating">
//                                     {[1, 2, 3, 4, 5].map((value) => (
//                                         <i
//                                             key={value}
//                                             className={`bi bi-star-fill${rating === value ? '' : '-gray'}`}
//                                             style={{ cursor: 'pointer' }}
//                                             onClick={() => handleRating(value)}
//                                         ></i>
//                                     ))}
//                                 </div>
//                                 <div>
//                                     <Button color="primary" onClick={handleBookmark}>
//                                         <i className="bi bi-bookmark-plus"></i>
//                                         <span className="d-none d-md-inline">Bookmark</span>
//                                     </Button>
//                                 </div>
//                             </div>
//                         </CardBody>
//                         <CardFooter>
//                             <small>id: {joke.id}</small>
//                         </CardFooter>
//                     </Card>
//                 )}
//             </main>

//             <footer className="mt-4 text-center">
//                 <p>
//                     Made by <a href="https://example.com">Your Name</a>
//                 </p>
//                 <p>
//                     Source code available on{' '}
//                     <a href="https://github.com/example/joke-app">GitHub</a>
//                 </p>

//             </footer>
//         </div>
//     );
// };

// export default JokesApp;

// import React, { useState, useEffect } from 'react';
// import { Button, Card, CardHeader, CardBody, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// const JokesApp = () => {
//     const [joke, setJoke] = useState(null);
//     const [rating, setRating] = useState(null);
//     const [bookmarks, setBookmarks] = useState([]);
//     const [modal, setModal] = useState(false);

//     useEffect(() => {
//         fetchJoke();
//     }, []);

//     const fetchJoke = async () => {
//         const response = await fetch('https://official-joke-api.appspot.com/random_joke');
//         const data = await response.json();
//         setJoke(data);
//         setRating(null);
//     };

//     const handleRating = (value) => {
//         setRating(value);
//         localStorage.setItem(`joke_${joke.id}_rating`, value);
//     };

//     const handleBookmark = () => {
//         const newBookmarks = [...bookmarks, joke];
//         setBookmarks(newBookmarks);
//         localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
//     };

//     const removeBookmark = (id) => {
//         const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
//         setBookmarks(newBookmarks);
//         localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
//     };

//     const toggleModal = () => {
//         setModal(!modal);
//     };

//     return (
//         <div className="container">
//             <header className="mb-4">
//                 <h1 className="text-center">Joke App</h1>
//                 <div className="d-flex justify-content-between align-items-center">
//                     <Button color="primary" onClick={fetchJoke}>
//                         Generate Joke
//                     </Button>
//                     <div>
//                         <Button color="primary" onClick={toggleModal}>
//                             <i className="bi bi-bookmark"></i>
//                         </Button>
//                     </div>
//                 </div>
//             </header>

//             <main>
//                 {joke && (
//                     <Card>
//                         <CardHeader>{joke.type}</CardHeader>
//                         <CardBody>
//                             <p>{joke.setup}</p>
//                             <p>{joke.punchline}</p>
//                             <div className="d-flex justify-content-between">
//                                 <div>
//                                     {[1, 2, 3, 4, 5].map((value) => (
//                                         <i
//                                             key={value}
//                                             className={`bi bi-star-fill${rating === value ? '' : '-gray'}`}
//                                             style={{ cursor: 'pointer' }}
//                                             onClick={() => handleRating(value)}
//                                         ></i>
//                                     ))}
//                                 </div>
//                                 <div>
//                                     <Button color="primary" onClick={handleBookmark}>
//                                         <i className="bi bi-bookmark-plus"></i>
//                                     </Button>
//                                 </div>
//                             </div>
//                         </CardBody>
//                         <CardFooter>
//                             <small>id: {joke.id}</small>
//                         </CardFooter>
//                     </Card>
//                 )}
//             </main>

//             <footer className="mt-4 text-center">
//                 <p>
//                     Made by <a href="https://example.com">Your Name</a>
//                 </p>
//                 <p>
//                     Source code available on{' '}
//                     <a href="https://github.com/example/joke-app">GitHub</a>
//                 </p>
//             </footer>

//             <Modal isOpen={modal} toggle
//                 ={() => toggleModal()}>
//                 <ModalHeader toggle={() => toggleModal()}>Bookmarks</ModalHeader>
//                 <ModalBody>
//                     {bookmarks.length > 0 ? (
//                         bookmarks.map((bookmark) => (
//                             <Card key={bookmark.id} className="mb-3">
//                                 <CardHeader>{bookmark.type}</CardHeader>
//                                 <CardBody>
//                                     <p>{bookmark.setup}</p>
//                                     <p>{bookmark.punchline}</p>
//                                 </CardBody>
//                                 <CardFooter>
//                                     <Button color="danger" onClick={() => removeBookmark(bookmark.id)}>
//                                         Remove
//                                     </Button>
//                                 </CardFooter>
//                             </Card>
//                         ))
//                     ) : (
//                         <p>No bookmarks yet.</p>
//                     )}
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={() => toggleModal()}>
//                         Close
//                     </Button>
//                 </ModalFooter>
//             </Modal>
//         </div>
//     );
// };

// export default JokesApp;