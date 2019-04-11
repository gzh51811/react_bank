import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
// import {connect} from 'react-redux';
import store from '../../store.jsx'
import withAxios from '../../hoc/withAxios';
import qs from 'qs';


class Mine extends Component{
    constructor(){
        super();
        this.state={
            username:[],
            dl:[]
        }

        this.gotoLogin = this.gotoLogin.bind(this);
        this.gotoCart = this.gotoCart.bind(this);

    }

    gotoLogin(){
        // console.log(this)
        this.props.history.push('/login')
    }
    gotoCart(){
       
        this.props.history.push('/cart')
    }
    async componentWillMount(){
        let token = await this.props.axios.post('/users/isLogin',qs.stringify({
            isToken:localStorage.getItem('token')
        }))
        if(token.data.status==true){
        this.setState({
            username : token.data.curuser,
            dl:true
        })
        }
    
        
    }

render(){
     console.log('a',this.state.dl)
    return (
        
        <div>
            <div style={{height:'50px'}}>
                <span style={{marginTop:'20px',display:'inline-block',marginLeft:'50%',fontSize:'20px',fontWeight:'bold'}}>我的</span>
                <img style={{marginTop:'20px',width:'40px',height:'30px',float:'right',marginRight:'20px'}} src={require("../../assect/mine1.jpg")} alt=""/>
            </div>
            <div style={{height:'200px',background:'#F07276',marginTop:'10px'}}>
                <img style={{marginTop:'50px',width:'85px',height:'80px',float:'left',marginLeft:'20px'}} src={require("../../assect/mine2.png")} alt=""/>
               { this.state.dl==true
               ?
               <span onClick={this.gotoLogin.bind(this)} className='btn-login' style={{marginTop:'74px',display:'inline-block',marginLeft:'10px',fontSize:'20px',fontWeight:'bold',color:'#fff'}}>欢迎你！{this.state.username}</span>
                :
                <span onClick={this.gotoLogin.bind(this)} className='btn-login' style={{marginTop:'74px',display:'inline-block',marginLeft:'10px',fontSize:'20px',fontWeight:'bold',color:'#fff'}}>立即登录</span>
               }
            </div>
            <div style={{borderBottom:'20px solid #F1F0F6',borderTop:'20px solid #F1F0F6',height:'150px',boxSizing:'border-box',textAlign:'center',color:'skyblue',fontWeight:'bold',fontSize:'16px'}}>
                <span style={{display:'inline-block',marginTop:'50px'}}>点击查看您的资产负债情况</span>
            </div>
            <ul onClick={this.gotoCart.bind(this)}>
                <li style={{height:'70px',borderBottom:'1px solid #ccc'}}>
                    <img style={{height:'37px',width:'37px',float:'left',marginTop:'20px',marginLeft:'15px'}} src={require('../../assect/mine3.png')} alt=""/>
                    <span style={{display:'inline-block',float:'left',marginTop:'26px',fontSize:'16px',fontWeight:'bold',marginLeft:'15px'}}>我的纪念币</span>
                    <span style={{display:'inline-block',float:'left',marginTop:'26px',fontSize:'16px',fontWeight:'bold',marginLeft:'190px'}}>></span>
                </li>
                <li style={{height:'70px',borderBottom:'1px solid #ccc'}}>
                    <img style={{height:'37px',width:'37px',float:'left',marginTop:'20px',marginLeft:'15px'}} src={require('../../assect/mine5.png')} alt=""/>
                    <span style={{display:'inline-block',float:'left',marginTop:'26px',fontSize:'16px',fontWeight:'bold',marginLeft:'15px'}}>我的基金</span>
                    <span style={{display:'inline-block',float:'left',marginTop:'26px',fontSize:'16px',fontWeight:'bold',marginLeft:'204px'}}>></span>
                </li>
                <li style={{height:'70px',borderBottom:'1px solid #ccc'}}>
                    <img style={{height:'37px',width:'37px',float:'left',marginTop:'20px',marginLeft:'15px'}} src={require('../../assect/mine4.png')} alt=""/>
                    <span style={{display:'inline-block',float:'left',marginTop:'26px',fontSize:'16px',fontWeight:'bold',marginLeft:'15px'}}>话费记录</span>
                    <span style={{display:'inline-block',float:'left',marginTop:'26px',fontSize:'16px',fontWeight:'bold',marginLeft:'204px'}}>></span>
                </li>
            </ul>
            
        </div>
    )
}
}
Mine = withRouter(Mine);
// Mine = connect()(Mine);
Mine =  withAxios(Mine);
export default Mine;