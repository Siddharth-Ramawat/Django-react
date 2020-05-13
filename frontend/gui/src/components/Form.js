import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

class CustomForm extends React.Component {
    handleFormSubmit = async (event, requestType, articleID) => {
        event.preventDefault();
    
        const postObj = {
          title: event.target.elements.title.value,
          content: event.target.elements.content.value
        }
    
        // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.xsrfCookieName = "csrftoken";
        // axios.defaults.headers = {
        //   "Content-Type": "application/json",
        //   Authorization: `Token ${this.props.token}`,
        // };
        
        if (requestType === "post") {
          await axios.post("http://127.0.0.1:8000/api/create/", postObj)
            .then(res => {
              if (res.status === 201) {
                this.props.history.push(`/`);
              }
            })
        } else if (requestType === "put") {
          await axios.put(`http://127.0.0.1:8000/api/${articleID}/update/`, postObj)
            .then(res => {
              if (res.status === 200) {
                this.props.history.push(`/`);
              }
            })
        }
      };
  render() {
    return (
      <div>
        <Form
            onSubmit={event =>
                this.handleFormSubmit(
                event,
                this.props.requestType,
                this.props.articleID
                )
          }
        >
          <Form.Item label="Title">
            <Input name="title" placeholder="Put a title here" />
          </Form.Item>
          <Form.Item label="Content">
            <Input name="content" placeholder="Enter some content ..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CustomForm;