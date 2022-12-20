import React from "react";
import { Box, HStack, Text, Image, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/images/logo.jpg";

const NavBar = ({ showDrawer }) => {
  return (
    <Box className="bg-white" boxShadow="lg" h="60px" position="relative">
      <IconButton
        onClick={showDrawer}
        position="absolute"
        tob="0"
        left="25px"
        mt="10px"
        bg="transparent"
        borderRadius="3xl"
        aria-label="حذف الفحص"
        icon={<FontAwesomeIcon fontSize="25px" icon={faBars} />}
      />
      <HStack h="60px" align="center" justify="center" spacing="50px">
        <Text fontSize="xl">الكلية التقنية الهندسية / كركوك</Text>
        <Image boxSize="50px" objectFit="contain" src={Logo} />
        <Text fontSize="xl">نظام ادارة المختبر الانشائي</Text>
      </HStack>
    </Box>
  );
};

export default NavBar;
