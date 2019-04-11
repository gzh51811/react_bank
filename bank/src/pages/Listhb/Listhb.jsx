import React,{Component} from 'react';
import {Icon,Button} from 'antd'
import withAxios from '../../hoc/withAxios'
class Listhb extends Component{
    constructor(){
        super();
        this.state={
            datalist:[]
        }
      
        this.gotoGoodshb = this.gotoGoodshb.bind(this);
      
    }
    async componentWillMount() {
        // console.log('aa',this)
        // 使用axios
        let data = await this.props.axios.get('/item/getBalance', {   
        });
        this.setState({
            ...this.state,
            datalist:data.data
        })

        // console.log(data);

       
        // console.log(this.state.datalist)


    }

    gotoGoodshb(id){
            this.props.history.push({
                pathname:'/goodshb/'+id,
                search:'?id='+id,
                state:{
                    id
                }
            })


    }

    
    render(){
        return(
            <div>
                <div>
                    <Icon style={{marginTop:'20px',display:'inline-block',marginLeft:'2%',fontSize:'20px',fontWeight:'bold'}} type='left'></Icon>
                    <span style={{fontSize:'18px',fontWeight:'bold'}}>返回</span>
                    <span style={{marginTop:'20px',display:'inline-block',marginLeft:'20%',fontSize:'20px',fontWeight:'bold'}}>金融理财</span>
                </div>
                <div>
                    <img style={{height:'100px',marginTop:'10px'}} src={require('../../assect/listhb1.jpg')} alt=""/>
                </div>
                <ul>
                    {
                        this.state.datalist.map(goods => {
                            return(
                                <li key={goods.idhb} style={{boxSizing:'border-box',marginTop:'20px',marginLeft:'5%',border:'1px solid #ccc',height:'180px',width:'350px'}}>
                                    <p>
                                        <span style={{fontSize:'20px',fontWeight:'bold',marginLeft:'15px',display:'inline-block',marginTop:'20px'}}>{goods.namehb}</span>
                                        <span style={{display:'inline-block',marginLeft:'10px',background:'#6DB7FF',color:'#fff',padding:'0 6px'}}>今日推荐</span>
                                    </p>
                                    <p>
                                    <span style={{fontSize:'26px',fontWeight:'bold',marginLeft:'15px',display:'inline-block',marginTop:'0px',color:'#F93E45'}}>{goods.blhb}</span>
                                    <Button onClick={this.gotoGoodshb.bind(this,goods.idhb)} style={{borderRadius:'20px',background:'#F95B4F',color:'#fff',marginLeft:'120px'}}>查看详情</Button>
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
            </div>
        )
    }
}

Listhb =withAxios(Listhb);
export default Listhb;

