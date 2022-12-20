import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  Flex,
  Box,
  Text,
  Divider,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Button,
  Image,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { authActions } from "../store/authSlice";

import Logo from "../assets/images/logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = () => {
    const credentials = {
      email: userName,
      password: password,
    };

    axios
      .post(
        "http://labmanagementsystemapi-production.up.railway.app/api/auth/login",
        credentials
      )
      .then((res) => {
        const user = {
          id: res.data.user.id,
          name: res.data.user.name,
          userName: res.data.user.email,
          token: res.data.token,
        };

        dispatch(authActions.login(user));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div dir="rtl" className="bg-slate-200 h-screen w-screen">
        <Flex
          alignItems="center"
          justifyContent="center"
          h="100%"
          direction="column"
        >
          <Image boxSize="200" objectFit="contain" src={Logo} mb="10" />
          <Box
            w={300}
            pb="3"
            className="bg-white"
            borderTopWidth={5}
            borderTopColor="#60a5fa"
            borderRadius="lg"
          >
            <Text className="font-bold m-3">تسجيل الدخول</Text>
            <Divider />
            <Flex p={3} flexDirection="column" gap={3}>
              <Input
                value={userName}
                placeholder="المستخدم"
                onChange={(e) => setUserName(e.target.value)}
              />
              <InputGroup>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  type={show ? "text" : "password"}
                  pr="20"
                />
                <InputRightElement>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    onClick={() => setShow(!show)}
                    icon={
                      !show ? (
                        <FontAwesomeIcon color="#60a5fa" icon={faEye} />
                      ) : (
                        <FontAwesomeIcon color="#60a5fa" icon={faEyeSlash} />
                      )
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <Button colorScheme="blue" onClick={handelLogin}>
                تسجيل الدخول
              </Button>
            </Flex>
          </Box>
        </Flex>
      </div>
    </div>
  );
};

export default Login;
