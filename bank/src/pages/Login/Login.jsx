import login from './login.css'

import React,{Component} from 'react';

import {withRouter} from 'react-router-dom';

import withAxios from '../../hoc/withAxios';

import qs from 'qs';

// import ReactDOM  from 'ReactDOM';

import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';
  
  class Login extends React.Component {

    constructor(){
      super();
      this.state={
        inputUser:'',
        inputPass:''
      }
      this.gotoRegister = this.gotoRegister.bind(this);
      this.changename = this.changename.bind(this);
      this.changepass = this.changepass.bind(this);
      this.login = this.login.bind(this);
    }
    //获取修改的用户名
    changename(e){
      this.setState({
        ...this.state,
        inputUser:e.target.value
      })
    }
     //获取修改的密码
     changepass(e){
      this.setState({
        ...this.state,
        inputPass:e.target.value
      })
    }
    //登录并创建token
    async login(){
      let data = await this.props.axios.post('/users/login',qs.stringify({
        inputUser:this.state.inputUser,
        inputPass:this.state.inputPass
      }))
      if(data.data.status=='success'){
        alert('登录成功！')
        localStorage.setItem("token", data.data.token);
        this.props.history.push('/home')
      }
      else if(data.data.status=='fail'){
        alert('用户名或密码错误！')
      }
      
    }

    gotoRegister(){
      this.props.history.push('/register')
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
    <div>
        <span style={{marginTop:'20px',display:'inline-block',marginLeft:'50%',fontSize:'20px',fontWeight:'bold'}}>登录</span>
        <div style={{padding:'30px'}}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('请输入手机号码', {
              rules: [{ required: true, message: '请输入手机号码!' }],
            })(
              <Input onChange={this.changename.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('请输入密码', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input onChange={this.changepass.bind(this)} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>七天免登录</Checkbox>
            )}
            
            <Button onClick={this.login.bind(this)} type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            还没注册？
              <span style={{color:'skyblue'}} onClick={this.gotoRegister.bind(this)}>
                立即去注册!
              </span> 
          </Form.Item>
        </Form>
        </div>
        </div>
      );
    }
  }


Login = withAxios(Login)
Login = withRouter(Login)
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
  

export default WrappedNormalLoginForm;