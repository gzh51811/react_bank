import React,{Component} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import qs from 'qs';
import withAxios from '../../hoc/withAxios';

  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
  

  
  class Register extends React.Component {
    constructor(){
      super();

      this.state = {
        confirmDirty: false,
        autoCompleteResult: [],
        inputUser:'',
        inputPass:'',
        tip:''
      };
      this.changename = this.changename.bind(this);
      this.checname = this.checname.bind(this);
      this.register = this.register.bind(this);
      this.changepass = this.changepass.bind(this);



    
    }
    
 
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码输入不同!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
    //获取修改的用户名
    changename(e){
      this.setState({
        ...this.state,
        inputUser:e.target.value
      })
    }
    //查询数据库用户名是否存在
     async checname(){
      let data = await this.props.axios.post('/users/checname',qs.stringify({                    
        inputUser: this.state.inputUser 
    }))
       if(this.state.inputUser==''){
        this.setState({
          ...this.state,
          tip:'请输入用户名！'

        })
      }
     else if(data.data.status=='fail'){
        this.setState({
          ...this.state,
          tip:'该用户名已被占用！'

        })
      }  
      else if(data.data.status=='success'){
        this.setState({
          ...this.state,
          tip:'可以注册啦！'

        })
      } 
    }
    //获取修改的密码值
    changepass(e){
      this.setState({
        ...this.state,
        inputPass:e.target.value
      })
    }

    //注册
    async register(){
      if(this.state.inputUser&&this.state.inputPass!=''){

      let data2 = await this.props.axios.post('/users/register',qs.stringify({
          inputUser:this.state.inputUser,
          inputPass:this.state.inputPass
      }))
       if(data2.data.status=='success'){
        alert('注册成功！');
        this.props.history.push('/login')

        
        
        

      }   
    }else{alert('用户名和密码不能为空！')}

         
    }
 
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      );
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  
      return (
    <div>
        <span style={{marginTop:'20px',display:'inline-block',marginLeft:'50%',fontSize:'20px',fontWeight:'bold'}}>注册</span>
        <div style={{padding:'20px'}}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
                label="请输入手机号码"
            >
                {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入手机号码!' }],
                })(
                <Input onBlur={this.checname.bind(this)} onChange={this.changename.bind(this)}   addonBefore={prefixSelector} style={{ width: '100%' }} />            
                )}
                <span style={{color:'red'}}>{this.state.tip}</span>
                
            </Form.Item>
          <Form.Item
            label="请输入密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input onChange={this.changepass.bind(this)} type="password" />
            )}
          </Form.Item>
          <Form.Item
            label="确认密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认您的密码!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>
          
          
       
          
          
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox style={{marginLeft:'26%'}}>我阅读并同意<a href="">协议</a></Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button onClick={this.register.bind(this)} type="primary" htmlType="submit"   style={{marginLeft:'40%'}}>注册</Button>
          </Form.Item>
        </Form>
        </div>
    </div>
        
      );
    }
  }
  Register = withAxios(Register);

  const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

  export default WrappedRegistrationForm;
