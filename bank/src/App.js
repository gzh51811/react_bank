import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/index.jsx';
import Mine from './pages/Mine/Mine.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Listhb from './pages/Listhb/Listhb.jsx';
import Goodshb from './pages/Goodshb/Goodshb.jsx';
import Cart from './pages/Cart/Cart.jsx';
import { Menu, Icon,Badge } from 'antd';
import { Route, Redirect, Switch, NavLink,withRouter } from 'react-router-dom';
import withAxios from './hoc/withAxios'
import qs from 'qs';
// 引入connect高阶组件
// import {connect} from 'react-redux'
import store from './store.jsx'





class App extends Component {
    constructor() {
      super();
      this.state = {
         
          navs: [
              {
                  text: '首页',
                  name: 'Home',
                  path: '/home',
                  icon:'home'
              },
              {
                  text: '我的',
                  name: 'Mine',
                  path: '/mine',
                  icon:'user'
              },
          ],
          current:'Home'
      }

  }

  handleClick = (e)=>{
    // console.log(this,e)
    this.setState({
        current: e.key
    },()=>{
        //路由跳转：编程式导航
        // 利用withRouter()高阶组件实现history的传递

        this.props.history.push('/'+e.key.toLowerCase());
    });
}
    //登录验证token
    // async componentWillMount(){
    //     let token = await this.props.axios.post('/users/isLogin',qs.stringify({
    //         isToken:localStorage.getItem('token')
    //     }))
    //     console.log(token)

    //     if(token.data.status=='ture'){
    //      store.dispatch({type:'user',payload:{inputUser:token.data.curuser}})
            
    //     }

    // }


  render() {
      
    //   console.log(store.getState())
    return (
        <div className="container">
            <Menu style={{position:'fixed',bottom:'0px'}}
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                {
                    this.state.navs.map(item => <Menu.Item style={{width:'200px',textAlign:'center'}} key={item.name}>
                    {
                        item.name=='Cart' 
                        ? 
                        <Badge><Icon type={item.icon} />{item.text}</Badge>
                        :
                        <>
                        <Icon type={item.icon} />{item.text}
                        </>
                    }
                    
                    </Menu.Item>)
                    
                }
                
            </Menu>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/listhb" component={Listhb} />          
                <Route path="/mine" component={Mine} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/goodshb" component={Goodshb} />
                <Route path="/cart" component={Cart} />
                <Redirect from="/" to="/home" />
            </Switch>
        </div>
    )
  }
}


App = withRouter(App);
// App = connect()(App);
App = withAxios(App);
export default App;
