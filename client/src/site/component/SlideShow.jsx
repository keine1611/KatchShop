import React from 'react'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
}

const divStyle = {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px',
    zIndex: -100000000
}

const slideImages = [
    {
        url: '1.jpg',
        caption: 'Slide 1'
    },
    {
        url: '2.jpg',
        caption: 'Slide 1'
    },
    {
        url: '3.jpg',
        caption: 'Slide 1'
    },
    {
        url: '4.jpg',
        caption: 'Slide 1'
    },
    {
        url: '5.jpg',
        caption: 'Slide 1'
    },
    {
        url: '6.jpg',
        caption: 'Slide 1'
    },
    {
        url: '7.jpg',
        caption: 'Slide 1'
    },

];

export const SlideShow = () => {
    return (
        <div className="slide-container -z-10">
            <Fade>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${process.env.PUBLIC_URL+'/image/slide/'+slideImage.url})` }}>
                        </div>
                    </div>
                ))}
            </Fade>
        </div>
    )
}
