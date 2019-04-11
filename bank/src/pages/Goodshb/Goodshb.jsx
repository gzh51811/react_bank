import React,{Component} from 'react';
import url from 'url';
import withAxios from '../../hoc/withAxios';
import {withRouter} from 'react-router-dom'
import {Icon,Button} from 'antd'
import qs from 'qs';
import store from '../../store.jsx';

class Goodshb extends Component{
    constructor(){
        super();
        this.state={
            datalist:[]
        }
        this.addCart = this.addCart.bind(this);
    }
    async componentWillMount(){
        let {axios,location} = this.props;
        let {query} = url.parse(location.search,true);
        // console.log('query.id',query.id)
        // console.log(qs)
        let data = await axios.post('/item/getIdBalance',qs.stringify({                    
            id: query.id      
        })
        )
        // console.log(data);
        this.setState({
            datalist:data.data
        })
        // console.log(this.state.datalist)
    }    
      //登录验证token,并加入或更新购物车
      async addCart(){   
        let token = await this.props.axios.post('/users/isLogin',qs.stringify({
            isToken:localStorage.getItem('token')
        }))
        // console.log(token.data.status==true)
        if(token.data.status==true){      
         store.dispatch({type:'user',payload:{inputUser:token.data.curuser}})
        // console.log(store.getState().inputUser[0].inputUser)
        // console.log(this.state.datalist[0].namehb)
         let data = await this.props.axios.post('/users/buyBalance',qs.stringify({
            susername:store.getState().inputUser[0].inputUser,
            sgoodsname:this.state.datalist[0].namehb,
            sblhb:this.state.datalist[0].blhb,
            spricehb:this.state.datalist[0].pricehb,
            snum:this.state.datalist[0].qtyhb
         }))
         if(data.data=='successGx'){
            alert('更新购物车成功')
         }
         else if(data.data=='successAdd'){
            alert('加入购物车成功')
         }      
        }else{
            alert('您好！还未登录，请先登录！')
            this.props.history.push('/login')
        }    
    }
    render(){
        return(
            <div>
                <div>
                    <Icon style={{marginTop:'20px',display:'inline-block',marginLeft:'2%',fontSize:'20px',fontWeight:'bold'}} type='left'></Icon>
                    <span style={{fontSize:'18px',fontWeight:'bold'}}>返回</span>
                    <span style={{marginTop:'20px',display:'inline-block',marginLeft:'20%',fontSize:'20px',fontWeight:'bold'}}>金融理财</span>
                </div>
                <ul>
                    {
                        this.state.datalist.map(goods=>{
                            return(
                                <li key={goods.idhb} style={{boxSizing:'border-box',marginTop:'20px',marginLeft:'5%',border:'1px solid #ccc',height:'180px',width:'350px'}}>
                                    <p>
                                        <span style={{fontSize:'20px',fontWeight:'bold',marginLeft:'15px',display:'inline-block',marginTop:'20px'}}>{goods.namehb}</span>
                                        <span style={{display:'inline-block',marginLeft:'10px',background:'#6DB7FF',color:'#fff',padding:'0 6px'}}>今日推荐</span>
                                    </p>
                                    <p>
                                    <span style={{fontSize:'26px',fontWeight:'bold',marginLeft:'15px',display:'inline-block',marginTop:'0px',color:'#F93E45'}}>{goods.blhb}</span>
                                    </p>
                                    <p style={{marginTop:'-10px'}}>
                                        <span style={{fontSize:'20px',fontWeight:'bold',marginLeft:'15px',display:'inline-block',marginTop:'0px',color:'#F93E45'}}>￥{goods.pricehb}</span>                        
                                    </p>
                                    <p style={{marginTop:'-10px',marginLeft:'10px'}}>
                                        <span style={{color:'#E3AC4F',border:'1px solid #E3AC4F',borderRadius:'10px',padding:'0px 5px'}}>灵活存取</span>
                                        <span style={{color:'#E3AC4F',border:'1px solid #E3AC4F',borderRadius:'10px',padding:'0px 5px'}}>收益稳健</span>
                                        <span style={{color:'#E3AC4F',border:'1px solid #E3AC4F',borderRadius:'10px',padding:'0px 5px'}}>门槛极地</span>
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>                 
                    <span style={{display:'inline-block',textAlign:'center',width:'150px',padding:'0 0 20px 0',fontSize:'18px',fontWeight:'bold',marginLeft:'10%',color:'red',borderBottom:'1px solid red'}}>近七日年化</span>
                    <span style={{marginTop:'20px',display:'inline-block',marginLeft:'10%',fontSize:'20px',fontWeight:'bold'}}>万份收益</span>
                </div>
                <div>
                    <img style={{height:'200px',marginTop:'10px'}} src={require('../../assect/goodshb1.jpg')} alt=""/>
                </div>
                <div>
                    <p onClick={this.addCart.bind(this)} style={{marginTop:'10px',lineHeight:'40px',height:'40px',textAlign:'center',background:'#FE4445',color:'#fff'}}>加入购物车</p>
                </div>
            </div>
        )
    }
}
Goodshb = withAxios(Goodshb);
Goodshb = withRouter(Goodshb);
export default Goodshb;
