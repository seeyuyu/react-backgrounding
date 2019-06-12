import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
const FormItem = Form.Item;

 class EmployeeAdd extends React.Component {
  constructor(props){
    super(props)
  }

  state = {
    loading: false,
    isModify:false, //默认是增加员工
  }

  init = (params) =>{
    console.log(params);
  }

  handleOk = () => {
    this.setState({ loading: true });
    this.props.sendSonDate(this.props.form.getFieldsValue(),this.props.isModify);
    // console.log('向父级发送数据',this.props.form.getFieldsValue(),this.props.isModify)
    
    // Axios.ajax({
    //   url:'',
    //   method:'POST',
    //   data:{
    //     username:'',
    //     password:'',
    //     email:'',
    //     tel:'',
    //   }
    // }).then((res) => {
    //   console.log(res)
    // }).catch(err =>{
    //   console.log(err);
    // })

    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      this.props.visibleChange();
    }, 3000)
  };
  // 表单中的重置按钮
  handleReset =() =>{
    console.log('重置按钮');
    // this.props.form
  };

  handleCancel = () => {
    // this.setState({ visible: false });
    this.props.visibleChange();
    console.log('关闭页')
    this.handleResetClick();
  };

  handleResetClick = ()=>{
    console.log('清空表单');
    this.props.form.resetFields();
  };

  checkUsername = (rule, value, callback) => {
    var reg = /^\w+$/;
    if (!value) {
      callback('请输入用户名!');
    } else if (!reg.test(value)) {
      callback('用户名只允许输入英文字母');
    } else {
      callback();
    }
  };
 
  checkTel = (rule, value, callback) => {
    var reg = /^\d+$/;
    if (!value) {
      callback('请输入联系电话!');
    } else if (!reg.test(value)) {
      callback('联系方式只允许输入数字');
    } else {
      callback();
    }
  };

  checkEmail = (rule, value, callback) => {
    if (!value) {
      callback('请输入邮箱!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <div>
        <Modal
          visible={this.props.visible}
          title={this.props.isModify?"修改员工信息":"增加员工信息"}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleReset}>
              重置
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >

          <Form 
            className="login-form"
            
          >
            {/** 这是用户名 */}
            <FormItem>
              {getFieldDecorator('employeeName', {
                // initialValue:'lidy',
                rules: [{ validator: this.checkUsername }]
              })(
                <Input readOnly={this.props.isReadOnly} placeholder="用户名" />
              )}
            </FormItem>

            {/* <FormItem>
              {getFieldDecorator('employeePWD', {
                // initialValue:'admin',
                rules: [{ validator: this.checkPWD }]
              })(
                <Input type="password" placeholder="密码" wrappedcomponentref={(inst) => this.pwd = inst} />
              )}
            </FormItem> */}

            <FormItem>
              {getFieldDecorator('employeeTel', {
                // initialValue:'admin',
                rules: [{ validator: this.checkTel }]
              })(
                <Input type="text" readOnly={this.props.isReadOnly} placeholder="电话"  />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('employeeEmail', {
                // initialValue:'admin',
                rules: [{ validator: this.checkEmail }]
              })(
                <Input  placeholder="邮箱"  readOnly={this.props.isReadOnly} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
EmployeeAdd = Form.create({
  mapPropsToFields:(props)=>{
    console.log('value is ',props)
    // 如果是修改，我们就执行赋值操作
    if(props.isModify){
      return {
        employeeEmail: Form.createFormField({value: props.fatherDate.email}),
        employeeTel: Form.createFormField({value: props.fatherDate.tel}) ,
        employeeName: Form.createFormField({value: props.fatherDate.name})
      }
    }else{
      return false
    }
    
  },
  onValuesChange: (props, changeValue,allValue) =>{
   console.log('changeValue is ',changeValue) 
  }
})(EmployeeAdd);
export default EmployeeAdd;
// ReactDOM.render(<App />, mountNode);