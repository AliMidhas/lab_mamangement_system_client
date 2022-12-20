import React from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const DeleteDialog = ({ isOpen, onClose, showCubes }) => {
  const user = useSelector((state) => state.auth);
  const cube = useSelector((state) => state.cube.cube);

  const deleteCube = () => {
    axios
      .get(
        `http://labmanagementsystemapi-production.up.railway.app/api/cube/delete/${cube.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        showCubes();
        onClose();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        dir="rtl"
        borderTopWidth={5}
        borderTopColor="#60a5fa"
        borderRadius="lg"
        minW="750px"
        maxH="620px"
      >
        <ModalHeader>حذف فحص المكعبات</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Text>هل انت متأكد من حذف الفحص العائد لـ{cube.from} ؟</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            الغاء
          </Button>
          <Button colorScheme="blue" ml={3} onClick={deleteCube}>
            حذف
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteDialog;
