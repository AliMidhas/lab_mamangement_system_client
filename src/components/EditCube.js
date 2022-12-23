import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Text,
  IconButton,
  Checkbox,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { cubeActions } from "../store/cubeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from "axios";

const EditCube = ({ isOpen, onClose, showCubes }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const cube = useSelector((state) => state.cube.cube);
  const cubeTests = useSelector((state) => state.cube.cubeTest);

  const editCube = () => {
    const updatedCube = { ...cube, tests: cubeTests };
    console.log(cubeTests);
    axios
      .post(
        `https://labmanagementsystemapi-production.up.railway.app/api/cube/update/${cube.id}/`,
        updatedCube,
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

  const addTest = () => {
    const newTest = {
      casting_date: moment().format("yyyy-MM-DD"),
      age: 1,
      testing_date: moment().add(1, "days").format("yyyy-MM-DD"),
      compressive_strength: 0,
      density: 0,
      status: false,
    };
    const tests = [...cubeTests, newTest];
    dispatch(cubeActions.setCubeTests(tests));
    // setCubeTests([...tests, newTest]);
  };

  const removeTest = (index) => {
    let updatedTests = [...cubeTests];
    updatedTests.splice(index, 1);
    dispatch(cubeActions.setCubeTests(updatedTests));
    // setCubeTests([...updatedTests]);
  };

  const onChange = (label, value) => {
    let updatedCube = { ...cube };
    updatedCube[label] = value;
    updatedCube.deadline_date = moment(updatedCube.import_date, "yyyy-MM-DD")
      .add(4, "days")
      .format("yyyy-MM-DD");
    dispatch(cubeActions.setCube(updatedCube));
    // setCube({ ...updatedCube });
  };

  const onChangeTest = (index, label, value) => {
    let newTest = { ...cubeTests[index] };
    newTest[label] = value;
    newTest.testing_date = moment(newTest.casting_date, "yyyy-MM-DD")
      .add(newTest.age, "days")
      .format("yyyy-MM-DD");
    let updatedTests = [...cubeTests];
    updatedTests[index] = newTest;
    dispatch(cubeActions.setCubeTests(updatedTests));
    // setCubeTests([...updatedTests]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        dir="rtl"
        borderTopWidth={5}
        borderTopColor="#60a5fa"
        borderRadius="lg"
        minW="1000px"
        maxH="620px"
        overflow="scroll"
      >
        <ModalHeader>تعديل فحص المكعبات</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Grid templateColumns="repeat(12, 1fr)" gap="5px">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>رقم الكتاب</FormLabel>
                <Input
                  value={cube.memo_no}
                  onChange={(e) => onChange("memo_no", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel>تاريخ الكتاب</FormLabel>
                <Input
                  type="date"
                  value={cube.memo_date}
                  onChange={(e) => onChange("memo_date", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>رقم الوارد</FormLabel>
                <Input
                  value={cube.import_no}
                  onChange={(e) => onChange("import_no", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel>تاريخ الوارد</FormLabel>
                <Input
                  type="date"
                  value={cube.import_date}
                  onChange={(e) => onChange("import_date", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>السقف الزمني</FormLabel>
                <Input disabled value={cube.deadline_date} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel>الجهة</FormLabel>
                <Input
                  value={cube.from}
                  onChange={(e) => onChange("from", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel>اسم المشروع</FormLabel>
                <Input
                  value={cube.project_name}
                  onChange={(e) => onChange("project_name", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel>الموضوع</FormLabel>
                <Input
                  value={cube.subject}
                  onChange={(e) => onChange("subject", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel>عدد المكعبات</FormLabel>
                <NumberInput
                  min={1}
                  defaultValue={1}
                  value={cube.cube_num}
                  onChange={(value) => onChange("cube_num", value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel>رقم المكعبات</FormLabel>
                <Input
                  value={cube.cube_no}
                  onChange={(e) => onChange("cube_no", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel>الرقم المختبري</FormLabel>
                <Input
                  value={cube.lab_num}
                  onChange={(e) => onChange("lab_num", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel>عمر التعديل (يوم)</FormLabel>
                <NumberInput
                  min={1}
                  defaultValue={1}
                  value={cube.edit_age}
                  onChange={(value) => onChange("edit_age", value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel>اسم الفاحص</FormLabel>
                <Input
                  value={cube.examiner_name}
                  onChange={(e) => onChange("examiner_name", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel>اسم المهندس المشرف</FormLabel>
                <Input
                  value={cube.engineer_name}
                  onChange={(e) => onChange("engineer_name", e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel>اسم المستلم</FormLabel>
                <Input
                  value={cube.recipient_name}
                  onChange={(e) => onChange("recipient_name", e.target.value)}
                />
              </FormControl>
            </GridItem>
          </Grid>
          <HStack mt="10px">
            <Text fontSize="xl">تفاصيل المكعبات</Text>
            <IconButton
              onClick={addTest}
              bg="transparent"
              borderRadius="3xl"
              icon={<FontAwesomeIcon className="text-blue-400" icon={faPlus} />}
            />
          </HStack>
          <Grid templateColumns="repeat(12, 1fr)" gap="5px">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>تاريخ الاستلام</FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>عمر الفحص (يوم)</FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>تاريخ الاستلام</FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Compressive Strength (MPa)</FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Density (gr/cm3)</FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>حالة الفحص</FormLabel>
              </FormControl>
            </GridItem>
            {cubeTests?.map((test, index) => (
              <>
                <GridItem colSpan={2} key={index}>
                  <FormControl>
                    <Input
                      type="date"
                      value={test.casting_date}
                      onChange={(e) =>
                        onChangeTest(index, "casting_date", e.target.value)
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <NumberInput
                      min={1}
                      defaultValue={1}
                      value={test.age}
                      onChange={(value) => onChangeTest(index, "age", value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <Input disabled type="date" value={test.testing_date} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <NumberInput
                      min={1}
                      defaultValue={1}
                      value={test.compressive_strength}
                      onChange={(value) =>
                        onChangeTest(index, "compressive_strength", value)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <NumberInput
                      min={1}
                      defaultValue={1}
                      value={test.density}
                      onChange={(value) =>
                        onChangeTest(index, "density", value)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1} alignSelf="center">
                  <FormControl>
                    <Checkbox
                      isChecked={test.status}
                      onChange={(e) =>
                        onChangeTest(index, "status", e.target.checked)
                      }
                    >
                      ناجحة
                    </Checkbox>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1} alignSelf="center">
                  <IconButton
                    onClick={() => removeTest(index)}
                    bg="transparent"
                    borderRadius="3xl"
                    icon={
                      <FontAwesomeIcon
                        className="text-blue-400"
                        icon={faXmark}
                      />
                    }
                  />
                </GridItem>
              </>
            ))}
            <GridItem colSpan={12} alignSelf="center">
              <FormControl>
                <Checkbox
                  isChecked={cube.status}
                  onChange={(e) => onChange("status", e.target.checked)}
                >
                  جميع الفحصوات منفذة
                </Checkbox>
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            الغاء
          </Button>
          <Button colorScheme="blue" ml={3} onClick={editCube}>
            تعديل
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCube;
