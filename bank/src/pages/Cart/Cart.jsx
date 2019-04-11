import React,{Component} from 'react';
import {Icon,Button,InputNumber,Row,Col } from 'antd'
import withAxios from '../../hoc/withAxios';
import qs from 'qs';
import store from '../../store';
class Cart extends Component{
    constructor(){
        super();
        this.state={
            datalist:[],
            total:[],
            num:'',
            dataid:'',
            username:''
        }
        this.changenum = this.changenum.bind(this)
        this.removecart = this.removecart.bind(this)
        this.delallcart = this.delallcart.bind(this)


    }
    //获取购物车商品
    async componentWillMount(){
        let token = await this.props.axios.post('/users/isLogin',qs.stringify({
            isToken:localStorage.getItem('token')
        }))
        let susername = token.data.curuser;
        // console.log(susername)
        let data = await this.props.axios.post('/users/userBalance',qs.stringify({
            susername
        }))
        
        this.setState({
        
            datalist:data.data,
            username:susername,
            total:data.data.reduce((prev,current)=>prev+current.pricehb*current.num,0)
       
        })  
        // await store.dispatch({type:'user',payload:{inputUser:'bb'}}
    }
    //修改数量改变总价，未完善
    async changenum(value){      
       await this.setState({ 
            ...this.state,
            num:value
            // total:this.state.datalist.reduce((prev,current)=>prev+current.pricehb*current.num+current.pricehb*this.state.num,0)  
        })
        await this.setState({
            ...this.state,
            total:this.state.datalist.reduce((prev,current)=>prev+current.pricehb*current.num+(this.state.num),0)     
        })
    }
    //删除当行商品
   async removecart(e){
        if(e.target.className=='del'){
            this.setState({
                ...this.state,
                dataid:e.target.id
            })
            let data2 = await this.props.axios.post('/users/delBalance',qs.stringify({
                sgoodsname:e.target.id
            }))
            // console.log(this.state.dataid)
            let goods = this.state.datalist.filter(goods=>goods.goodsname!=this.state.dataid)
            this.setState({
                ...this.state,
                datalist:goods,
                total:goods.reduce((prev,current)=>prev+current.pricehb*current.num,0)
            })
        }
    }
    //清空当前用户的购物车
   async delallcart(){
    let data3 = await this.props.axios.post('/users/delallBalance',qs.stringify({
        susersname:this.state.username
    }))
    this.setState({
        ...this.state,
        datalist:[],
        total:0
      
    })
    
    }
    render(){
        // console.log('cc',this.state.username)
        // console.log(store.getState())
        return(
            <div>
                <div>
                    <Icon style={{marginTop:'20px',display:'inline-block',marginLeft:'2%',fontSize:'20px',fontWeight:'bold'}} type='left'></Icon>
                    <span style={{fontSize:'18px',fontWeight:'bold'}}>返回</span>
                    <span style={{marginTop:'20px',display:'inline-block',marginLeft:'20%',fontSize:'20px',fontWeight:'bold'}}>商品详情</span>
                </div>
                <ul>
                    {
                        this.state.datalist.map(goods=>{
                         return  (<li onClick={this.removecart.bind(this)}   key={goods.goodsname} style={{boxSizing:'border-box',marginTop:'20px',marginLeft:'5%',border:'1px solid #ccc',height:'180px',width:'350px'}}>
                                <p>
                                    <span style={{fontSize:'20px',fontWeight:'bold',marginLeft:'15px',display:'inline-block',marginTop:'20px'}}>{goods.goodsname}</span>
                                    <span style={{display:'inline-block',marginLeft:'10px',background:'#6DB7FF',color:'#fff',padding:'0 6px'}}>今日推荐</span>
                                    <span style={{display:'inline-block',marginLeft:'60px',fontSize:'20px'}}><span id={goods.goodsname} style={{display:'inline-block',fontSize:'30px'}} className='del' type='close-square'>x</span></span>
                                </p>
                                <p>
                                <span style={{fontSize:'26px',fontWeight:'bold',marginLeft:'15px',display:'inline-block',marginTop:'0px',color:'#F93E45'}}>{goods.blhb}</span>
                                </p>
                                <p style={{marginTop:'-10px'}}>
                                    <span style={{fontSize:'20px',fontWeight:'bold',marginLeft:'15px',display:'inline-block',marginTop:'0px',color:'#F93E45'}}>￥{goods.pricehb}</span>
                                    <InputNumber onChange={this.changenum.bind(this)} style={{marginLeft:'40%'}} min={1} max={10} defaultValue={goods.num} />
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
                <Row gutter={10}>
                <Col span={24}>
                    <Button onClick={this.delallcart.bind(this)} type='primary' style={{marginLeft:'5%',fontSize:'20px',fontWeight:'bold'}}>清空商品</Button>
                </Col>
   
            </Row>
                <Row gutter={10} style={{marginTop:'10px'}}>
                <Col span={12}>
                    <Button type='danger' style={{marginLeft:'10%',fontSize:'20px',fontWeight:'bold'}}>提交订单</Button>
                </Col>
                
                <Col span={12}>
                    <span style={{marginLeft:'30%',fontSize:'20px',fontWeight:'bold'}}>
                        总价：<span style={{color:'#f00'}}>￥
                      {
                         this.state.total 
                      }
                        </span>
                    </span>
                </Col>
            </Row>
            </div>
        )
        
        
    }
}
Cart = withAxios(Cart);
export default Cart;