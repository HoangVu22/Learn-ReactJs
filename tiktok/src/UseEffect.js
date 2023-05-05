import { useEffect, useState } from "react";

const tabs = ['posts', 'comments', 'albums']

const lessons = [
    {
        id: 1,
        name: 'ReactJs',
    },
    {
        id: 2,
        name: 'Javascript',
    },
    {
        id: 3,
        name: 'PHP',
    },
]

function UseEffect() {
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([]) 
    const [type, setType] = useState('posts')
    const [showGoToTop, setShowGoToTop] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [coutdown, setCountdown] = useState(180)
    const [avatar, setAvatar] = useState()
    const [lessonId, setLessonId] = useState(1)

    useEffect(() => {
        // document.title = title
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts)
            })
    }, [type])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowGoToTop(true)
            }else {
                setShowGoToTop(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        console.log('addEventListener')

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll)
            console.log('removeEventListener')
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    // countdown: đếm ngược
    useEffect(() => {
        const timerId= setInterval(() => {
            setCountdown(prevState => prevState - 1)
        }, 1000)

        return () => {
            clearInterval(timerId)
        }
    }, [])
    
    // avatar
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
    }

    useEffect(() => {
        return (() => {
            avatar && URL.revokeObjectURL(avatar.preview)
        })
    }, [avatar])

    useEffect(() => {
        const handleComment = ({ detail }) => {
            console.log(detail)
        }
        window.addEventListener(`lesson-${lessonId}`, handleComment)

        return () => {
            window.removeEventListener(`lesson-${lessonId}`, handleComment)
        }
    }, [lessonId])

    return (
        <div>
            <ul>
                {lessons.map(lesson => (
                    <li
                        key = {lesson.id}
                        style = {{
                            color: lessonId === lesson.id ? 'red' : '#333'     
                        }}
                        onClick = {() => setLessonId(lesson.id)}
                    >
                        {lesson.name}
                    </li>
                ))}
            </ul>

            <h4>Hello everyone!</h4>

            <div>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setType(tab)}
                        style={type === tab ? {
                            color: '#fff',
                            backgroundColor: '#333',
                        } : {}}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div>
                <input
                    value={title}
                    onChange = {e => setTitle(e.target.value)}
                />

                <ul>
                    {posts.map(post => (
                        <li key={post.id}>{post.title || post.name}</li>
                    ))}
                </ul>
            </div>

            {showGoToTop && (
                <button
                    style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20
                    }}
                >
                    Go To Top
                </button>
            )}

            {
                <h3>Set width: {width}</h3>
            }

            {
                <h3>Countdown: {coutdown}</h3>
            }

            <div>
                <input
                    type='file'
                    onChange={handlePreviewAvatar}
                />
                {avatar && (
                    <img src={avatar.preview} alt="" width="50%" />
                )}
            </div>
        </div>
    )
}

export default UseEffect