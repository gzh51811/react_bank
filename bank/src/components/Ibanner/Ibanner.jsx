import React from 'react';
import { Carousel } from 'antd';
import ibnner from './ibanner.css';
let Ibanner = ()=>{
    return (
        <div>
            <Carousel autoplay>
              <div><img style={{width:'375px',height:'180px'}} src={require('../../assect/ibanner1.jpg')}/></div>
              <div><img style={{width:'375px',height:'180px'}} src={require('../../assect/ibanner2.jpg')}/></div>
              <div><img style={{width:'375px',height:'180px'}} src={require('../../assect/ibanner3.jpg')}/></div>
              <div><img style={{width:'375px',height:'180px'}} src={require('../../assect/ibanner4.jpg')}/></div>
            </Carousel>

        </div>
    

   
    )
}

export default Ibanner;