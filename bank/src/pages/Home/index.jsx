
import React,{Component} from 'react';


import { Button,Icon } from 'antd';
import Ibanner from '../../components/Ibanner/Ibanner.jsx';
import Imain from '../../components/Imain/Imain.jsx'
// import Ifooter from '../../components/Ifooter.jsx'

class Home extends Component{
 

render(){
    return (
        <div>
            <div style={{height:'48px',background:'#EBEFEF'}} className="home-top">
            <img style={{width:'210px',height:'28px',float:'left',marginTop:'10px'}} src={require("../../assect/index_top_logo.jpg")}/>
                <Icon type='search' style={{color:'#B71A21',fontWeight:'bold',fontSize:'30px',marginTop:'10px',marginLeft:'110px'}}/>
            </div>
            <Ibanner/>
            <Imain/>
            
            {/* <Ifooter/> */}
        </div>
    )
}
}


export default Home;