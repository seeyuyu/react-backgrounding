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
          methods:"post",
          data:{
            username:params.username,
            password:params.password,
            email:params.email,
            age:params.age,
            address:params.address
          }
        }).then(res=>{
          console.log(res);
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
                            <RegisterForm ref="register" registerSubmit={this.registerReq}/>
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
    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFieldsAndScroll( (err,value) => {
          console.log(err)
          console.log(`value is ${value}`);
          console.log(value)
          if(!err){
            message.success(`${userInfo.userName}恭喜你提交成功`);
            console.log(123123)
            this.props.registerSubmit(JSON.stringify(value))
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
                        <FormItem label="邮箱" {...formItemLayout}>
                        {
                            getFieldDecorator('eamil', {
                                initialValue: 'lidongyan_cn@163.com',
                                rules: [
                                  {
                                      required: true,
                                      message: '邮箱不能为空'
                                  },{
                                    pattern:  '/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/',
                                    message:'请正确填写'
                                  }
                              ]
                            })(
                                <Input prefix={<Icon type="mail"/>} type="text" placeholder="请输入密码" />
                            )
                        }
                    </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1'
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber  />
                                )
                            }
                        </FormItem>
                      
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue:'北京市海淀区奥林匹克公园'
                                })(
                                    <TextArea
                                        autosize={rowObject}
                                    />
                                )
                            }
                        </FormItem>

                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                    {this.state.userImg?<img src={this.state.userImg}/>:<Icon type="plus"/>}
                                    </Upload>
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
RegisterForm = Form.create()(RegisterForm);
