import React,{Component} from 'react';
import imain from './imain.css';
import {withRouter } from 'react-router-dom';


class Imain extends Component{
    constructor(){
        super();
        this.state={
            nav:[
                {
                    imgurl:require('../../assect/Imain_nav1.png'),
                    name:'手机银行',
                    id:1
                },
                {
                    imgurl:require('../../assect/Imain_nav1.png'),
                    name:'客户下载',
                    id:2
                },
                {
                    imgurl:require('../../assect/Imain_nav2.png'),
                    name:'纪念币预约',
                    id:3
                },
                {
                    imgurl:require('../../assect/Imain_nav2.png'),
                    name:'纪念币预约',
                    id:4
                },
                {
                    imgurl:require('../../assect/Imain_nav2.png'),
                    name:'纪念币预约',
                    id:5
                },
                {
                    imgurl:require('../../assect/Imain_nav2.png'),
                    name:'纪念币预约',
                    id:6
                },
                {
                    imgurl:require('../../assect/Imain_nav2.png'),
                    name:'纪念币预约',
                    id:7
                },
                {
                    imgurl:require('../../assect/Imain_nav2.png'),
                    name:'纪念币预约',
                    id:8
                }
               
            ]
        }
        this.gotoListhb = this.gotoListhb.bind(this);

    }

  


    

    gotoListhb() {
        console.log(this)
        this.props.history.push({
            pathname: '/listhb'       
        })   
    }
    render(){
        return(
            <div>
                <div>
                    <p style={{marginTop:'10px',fontSize:'20px',fontWeight:'bold',marginLeft:'10px'}}>快捷服务</p>
                    <div style={{borderTop:'2px solid #ccc'}}>
                    {
                        this.state.nav.map(item=>{
                            return(
                                <li key={item.id} onClick={this.gotoListhb} className='nav' style={{width:'74px',height:'53px'}}>
                                    <img className='nav-img1' style={{width:'37px',height:'37px'}} src={item.imgurl}/>
                                    <p>{item.name}</p>
                                </li>                 
                            )
                        })
                    }
                    </div>
                    <p style={{marginTop:'20px',fontSize:'20px',fontWeight:'bold',marginLeft:'10px',float:'left',width:'300px'}}>金融信息</p>
                    <div style={{borderTop:'2px solid #ccc',height:'68px',widtn:'350px',float:'left'}}>
                        <img style={{width:'112px',height:'62px',display:'block',marginTop:'20px',float:'left',marginLeft:'10px'}}  src={require("../../assect/Imain_nav3.png")} alt=""/>
                        <img style={{width:'112px',height:'62px',display:'block',marginTop:'20px',float:'left',marginLeft:'10px'}}  src={require("../../assect/Imain_nav3.png")} alt=""/>
                        <img style={{width:'112px',height:'62px',display:'block',marginTop:'20px',float:'left',marginLeft:'10px'}}  src={require("../../assect/Imain_nav3.png")} alt=""/>
                    </div>
                    <p style={{marginTop:'40px',fontSize:'20px',fontWeight:'bold',marginLeft:'10px',float:'left',width:'300px'}}>投资理财</p>
                    <div style={{borderTop:'2px solid #ccc',height:'68px',widtn:'350px',float:'left'}}>
                        <img style={{width:'112px',height:'62px',display:'block',marginTop:'10px',float:'left'}}  src={require("../../assect/Imain_nav4.png")} alt=""/>
                        <img style={{width:'112px',height:'62px',display:'block',marginTop:'10px',float:'left',marginLeft:'15px'}}  src={require("../../assect/Imain_nav4.png")} alt=""/>
                        <img style={{width:'112px',height:'62px',display:'block',marginTop:'10px',float:'left',marginLeft:'15px'}}  src={require("../../assect/Imain_nav4.png")} alt=""/>
                    </div>
                    <div>
                        <img style={{borderTop:'2px solid skyblue',width:'163px',height:'168px',display:'block',marginTop:'10px',float:'left',marginLeft:'15px'}}  src={require("../../assect/Imain_nav5.png")} alt=""/>
                        <img style={{width:'163px',height:'168px',display:'block',marginTop:'10px',float:'left',marginLeft:'15px'}}  src={require("../../assect/Imain_nav5.png")} alt=""/>
                    </div>
                    <p style={{marginTop:'20px',fontSize:'20px',fontWeight:'bold',marginLeft:'10px',float:'left',width:'300px'}}>业务产品</p>
                    <div style={{borderTop:'2px solid #ccc',height:'68px',widtn:'350px',float:'left'}}>
                        <img style={{width:'112px',height:'62px',display:'block',marginTop:'10px',float:'left'}}  src={require("../../assect/Imain_nav7.png")} alt=""/>
                        <img style={{width:'112px',height:'62px',display:'block',marginTop:'10px',float:'left',marginLeft:'15px'}}  src={require("../../assect/Imain_nav7.png")} alt=""/>
                        <img style={{width:'112px',height:'62px',display:'block',marginTop:'10px',float:'left',marginLeft:'15px'}}  src={require("../../assect/Imain_nav7.png")} alt=""/>
                    </div>
                    <div style={{borderTop:'2px solid #ccc',height:'300px',float:'left'}}>
                        <img style={{width:'180px',height:'92px',display:'block',marginTop:'10px',float:'left'}}  src={require("../../assect/Imain_nav9.jpg")} alt=""/>
                        <img style={{width:'180px',height:'92px',display:'block',marginTop:'10px',float:'left',marginLeft:'15px'}}  src={require("../../assect/Imain_nav9.jpg")} alt=""/>
                        <img style={{width:'180px',height:'92px',display:'block',marginTop:'10px',float:'left'}}  src={require("../../assect/Imain_nav9.jpg")} alt=""/>
                        <img style={{width:'180px',height:'92px',display:'block',marginTop:'10px',float:'left'}}  src={require("../../assect/Imain_nav9.jpg")} alt=""/>
                        <img style={{width:'180px',height:'92px',display:'block',marginTop:'10px',float:'left'}}  src={require("../../assect/Imain_nav9.jpg")} alt=""/>
                        <img style={{width:'180px',height:'92px',display:'block',marginTop:'10px',float:'left',marginLeft:'15px'}}  src={require("../../assect/Imain_nav9.jpg")} alt=""/>
                    </div>
                    <div style={{marginTop:'10px',width:'375px',height:'50px',background:'#EBEFEF',float:'left'}}>
                        <img style={{width:'38px',height:'25px',display:'block',marginTop:'20px',float:'left',marginLeft:'40%'}}  src={require("../../assect/Imain_nav10.jpg")} alt=""/>
                        <span style={{display:'inline-block',marginTop:'20px'}}>电子银行微博</span>
                    </div>
                </div>
                
            </div>
        )

    }
}

Imain=withRouter(Imain)

export default Imain;