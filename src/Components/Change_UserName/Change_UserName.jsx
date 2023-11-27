import React, { useEffect, useState } from "react";
import lucky from "../../Assets/images/lucky-me-logo.png";

import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineGoogle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Connect_wallet_modal from "../Connect_wallet_modal/Connect_wallet_modal";
import { Button, Checkbox, Form, Input } from "antd";
import { Modal } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";



export default function Change_UserName() {
  let isuser = localStorage.getItem("UserAuth");
  const [modalShow, setModalShow] = React.useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinner, setspinner] = useState(false);
  let location = useLocation();

 let userEmail= localStorage.getItem("UserEmail")
//  console.log("userEmail",userEmail);
  
  const history = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    setspinner(true);
    // console.log("Success:", values);
    const Url= process.env.REACT_APP_API_URL
    let res = await axios.put(`https://winner.archiecoin.online/changePassword/${userEmail}`, {
      oldPassword: values.oldPassword,
      newPassword: values.password,
    });
    if (res.data.message == "Password changed successfully") {
      toast.success(res.data.message);
      history("/");
      localStorage.setItem("UserAuth", true);
      setisLogin(true);
      handleCancel();
    } else {
      setspinner(false);
      toast.error(res.data.message);
    }

    // console.log("Login_Res", res.data.success);
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };


  

  return (
    <div>
      <div className="mb-5">
        <div>
          <div className="header-top-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="header-top-area-inner">
                    <a href="" className="logo">
                      <img src={lucky} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main_form">
          <div className="form_ittem">
            <h1>Change Password</h1>
            <div className="inner_form_style">

            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
           

              <Form.Item
                label="Enter Old Password"
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Enter New Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Confirm password do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

              

              <Form.Item className="d-flex justify-content-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="custom-button2 navmainbt"
                >
                  {spinner == true ? (
                    <>
                      <p class="spinner-border" role="status">
                        <span class="visually-hidden"></span>
                      </p>
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </Form.Item>
            </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// create User Regitraction and Save user details to a database and and Perform validation on user details Api in express
// Create  LogIn user Api useing bcrypt in express