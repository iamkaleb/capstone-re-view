import React from 'react'

const VideoList = props => {

    return (
        <>
            <h1>Video List</h1>
            {props.categories.map(category =>
                <>
                    <p key={category.id}>{category.categoryTitle}</p><button>Edit</button><button>Delete</button>
                </>
            )}
        </>
    )
}

export default VideoList