import React from 'react'

const VideoDeck = props => {
    
    return (
        <div className='videoDeck'>
            <p >{props.category.categoryTitle}</p><button>Edit</button><button>Delete</button>
        </div>
    )
}

export default VideoDeck