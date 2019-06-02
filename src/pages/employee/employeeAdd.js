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
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000)
  };

  handleCancel = () => {
    // this.setState({ visible: false });
    this.props.visibleChange();
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

  checkPWD = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码!');
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
          title={this.state.isModify?"修改员工信息":"增加员工信息"}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >

          <Form className="login-form">
            {/** 这是用户名 */}
            <FormItem>
              {getFieldDecorator('employeeName', {
                // initialValue:'lidy',
                rules: [{ validator: this.checkUsername }]
              })(
                <Input placeholder="用户名" />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('employeePWD', {
                // initialValue:'admin',
                rules: [{ validator: this.checkPWD }]
              })(
                <Input type="password" placeholder="密码" wrappedcomponentref={(inst) => this.pwd = inst} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('employeeTel', {
                // initialValue:'admin',
                rules: [{ validator: this.checkTel }]
              })(
                <Input type="password" placeholder="电话"  />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('employeeEmail', {
                // initialValue:'admin',
                rules: [{ validator: this.checkEmail }]
              })(
                <Input type="password" placeholder="邮箱"  />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
EmployeeAdd = Form.create({})(EmployeeAdd);
export default EmployeeAdd;
// ReactDOM.render(<App />, mountNode);