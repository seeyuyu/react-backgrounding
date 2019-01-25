import React from 'react'
import axios from '../../axios/index'
import Footer from '../../components/Footer'
import Utils from '../../utils/utils'
import './register.less';
import MD5 from 'js-md5';

import {Card,Form,Button,Input,Checkbox,Radio,Select,Switch,DatePicker,TimePicker,Upload,Icon,message, InputNumber} from 'antd'
import moment from 'moment';
import { fastest } from 'sw-toolbox';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

export default class Register extends React.Component {
    state = {};
    componentDidMount() {//每次进入登录页清除之前的登录信息
        
    }

    registerReq = (params) => {
        // window.location.href = '/#/';
        console.log(params)
        let a  = JSON.parse(params);
        // console.log(JSON.parse(params));
        console.log(JSON.parse(params));
        console.log(MD5(a.password));

        axios.ajax({
          url:'/employee/register',
          method:"post",
          data:{
            username:window.encodeURIComponent(a.username) ,
            password:MD5(a.password),
            email:a.email,
            code:a.verify
          }
        }).then(res=>{
          console.log(res);
        }).catch(err=>{
            console(`err is ${err}`)
        })
        
    };

    render() {
        return (
            <div className="login-page">
                <div className="login-header">
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt="慕课后台注册系统"/>
                        注册用户信息
                    </div>
                </div>
                <div className="login-content-wrap">
                    <div className="login-content">
                        <div className="word">共享出行 <br />引领城市新经济</div>
                        <div className="login-box">
                            <div className="error-msg-wrap">
                                <div
                                    className={this.state.errorMsg?"show":""}>
                                    {this.state.errorMsg}
                                </div>
                            </div>
                            <div className="title">注册新员工</div>
                            <RegisterForm ref="register" handleSubmit={this.registerReq}/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}


class RegisterForm extends React.Component{
    state={
      /* 默认是 禁止提交状态*/ 
      handleUpData:true
    }
    // 检测当同意按钮被按压，如果按压则为false,同意进行注册
    handleMakeSure = (e) => {
      console.log(e.target.value)
      if(e.target.value){
        this.setState({
          handleUpData:true
        })
      }else{
        this.setState({
          handleUpData:false
        })
      }
    } 
    handleSubmit = (e)=>{
        // alert(e);
        let userInfo = this.props.form.getFieldsValue();
        console.log(userInfo)
        let _this =this;
        console.log(`e is ${e}`)
        console.log(e)
        this.props.form.validateFieldsAndScroll( (err,values) => {
          console.log(err)
          console.log(`value is ${values}`);
          console.log(values)
          if(!err){
            message.success(`${userInfo.userName}恭喜你提交成功`);
            console.log(123123)
            _this.props.handleSubmit(JSON.stringify(values))
          }
        })
        // console.log(JSON.stringify(userInfo))
        // message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)
    }

    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }
    getVerify = () =>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(`eamil is ${userInfo.email}`)
        axios.ajax({
            url:'/employee/verify',
            method:"POST",
            data:{
                username:userInfo.username,
                email:userInfo.email
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">

                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('username', {
                                    initialValue: 'yyt',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label="邮箱" {...formItemLayout}>
                        {
                            getFieldDecorator('email', {
                                initialValue: 'lidongyan_cn@163.com',
                                rules: [
                                {
                                  required: true,
                                  message: '邮箱不能为空'
                                },{
                                pattern:  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                                message:'请正确填写'
                              }
                          ]
                        })(
                            <Input prefix={<Icon type="mail"/>} type="text" placeholder="请输入邮箱" />
                        )
                        }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            <Button type="primary"  onClick={this.getVerify}>获取验证码</Button>
                        </FormItem>
                        <FormItem label="验证码" {...formItemLayout}>
                        {
                            getFieldDecorator('verify',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:"请输入验证码"
                                    }
                                ]
                            })(
                                <Input type ='text' placeholder="请输入验证码"/>
                            )
                        }
                    </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '123',
                                    rules: [
                                      {
                                          required: true,
                                          message: '密码不能为空'
                                      },{
                                        max:12, min:3,
                                        message:'请在3位和12位之间'
                                      }
                                  ]
                                })(
                                    <Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem label="确认密码" {...formItemLayout}>
                            {
                                getFieldDecorator('Rpassword', {
                                    initialValue: '123',
                                    rules: [
                                      {
                                          required: true,
                                          message: '密码不能为空'
                                      },{
                                        max:12, min:3,
                                        message:'请在3位和12位之间'
                                      }
                                  ]
                                })(
                                    <Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                  

                        <FormItem {...offsetLayout}>
                            {
                            getFieldDecorator('userImg')(
                                   <Checkbox onChange={this.handleMakeSure}>我已阅读过<a href="#">慕课协议</a></Checkbox>
                                )
                            }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            <Button type="primary" disabled={this.state.handleUpData} onClick={this.handleSubmit}>注册</Button>
                        </FormItem>

                    </Form>
                </Card>
            </div>
        );
    }
}
RegisterForm = Form.create({})(RegisterForm);
