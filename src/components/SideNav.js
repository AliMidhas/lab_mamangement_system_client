import React from "react";
import { Box, VStack, Button, Text, HStack } from "@chakra-ui/react";
import { faHouse, faMound, faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  return (
    <Box h="100%" className="bg-slate-600" boxShadow="dark-lg">
      <VStack spacing="5px">
        <Button
          justifyContent="flex-start"
          size="md"
          color="white"
          className="text-white"
          variant="ghost"
          iconSpacing="20px"
          h="50px"
          w="100%"
          mt="10px"
          _hover={{ bg: "#334155" }}
          _active={{ bg: "#334155" }}
          _focus={{ bg: "#334155" }}
          leftIcon={<FontAwesomeIcon icon={faHouse} />}
          onClick={() => navigate("/")}
        >
          الرئيسية
        </Button>
        <Text
          className="text-gray-200 text-lg text-right font-light"
          pt="10px"
          pl="20px"
          w="100%"
        >
          الفحوصات
        </Text>
        <Button
          justifyContent="flex-start"
          size="md"
          color="white"
          className="text-white"
          variant="ghost"
          iconSpacing="20px"
          h="50px"
          w="100%"
          _hover={{ bg: "#334155" }}
          _active={{ bg: "#334155" }}
          _focus={{ bg: "#334155" }}
          leftIcon={<FontAwesomeIcon icon={faMound} />}
          onClick={() => navigate("/roll")}
        >
          حدل
        </Button>
        <Button
          justifyContent="flex-start"
          size="md"
          color="white"
          className="text-white"
          variant="ghost"
          iconSpacing="20px"
          h="50px"
          w="100%"
          _hover={{ bg: "#334155" }}
          _active={{ bg: "#334155" }}
          _focus={{ bg: "#334155" }}
          leftIcon={<FontAwesomeIcon icon={faCubes} />}
          onClick={() => navigate("/cube")}
        >
          مكعبات
        </Button>
      </VStack>
    </Box>
  );
};

export default SideNav;
