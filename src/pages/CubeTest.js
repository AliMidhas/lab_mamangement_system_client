import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Badge,
  IconButton,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  HStack,
  Button,
  Spacer,
  FormControl,
  Checkbox,
} from "@chakra-ui/react";
import {
  faPenToSquare,
  faTrash,
  faFile,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cubeActions } from "../store/cubeSlice";
import axios from "axios";
import * as XLSX from "xlsx";

import AddCube from "../components/AddCube";
import EditCube from "../components/EditCube";
import ShowCube from "../components/ShowCube";
import DeleteDialog from "../components/DeleteDialog";
import moment from "moment";

const CubeTest = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [cubes, setCubes] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [headers, setHeader] = useState([
    [
      "ت",
      "التسلسل",
      "رقم الكتاب",
      "تاريخ الكتاب",
      "رقم الوارد",
      "تاريخ الوارد",
      "السقف الزمني",
      "الجهة",
      "اسم المشروع",
      "الموضوع",
      "عدد المكعبات",
      "رقم المكعبات",
      "الرمز المختبري",
      "عمر التعديل",
      "اسم المهندس المشرف",
      "اسم الفاحص",
      "اسم المستلم ",
      "casting date",
      "age",
      "testing date",
      "compressive strength",
      "density",
    ],
  ]);

  useEffect(() => {
    showCubes();
  }, []);

  const showCubes = () => {
    axios
      .get(
        "https://labmanagementsystemapi-production.up.railway.app/api/cube/",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setCubes([...res.data.cubes]);
      })
      .catch((err) => console.log(err));
  };

  const handelExport = () => {
    let dataToExport = [];
    let tempData = {};
    let index = 1;
    for (let i = 0; i < cubes?.length; i++) {
      tempData.id = index;
      tempData.no = cubes[i]?.no;
      tempData.memo_num = cubes[i]?.memo_num;
      tempData.memo_date = cubes[i]?.memo_date;
      tempData.import_no = cubes[i]?.import_no;
      tempData.import_date = cubes[i]?.import_date;
      tempData.deadline_date = cubes[i]?.deadline_date;
      tempData.from = cubes[i]?.from;
      tempData.project_name = cubes[i]?.project_name;
      tempData.subject = cubes[i]?.subject;
      tempData.cube_num = cubes[i]?.cube_num;
      tempData.cube_no = cubes[i]?.cube_no;
      tempData.lab_num = cubes[i]?.lab_num;
      tempData.edit_age = cubes[i]?.edit_age;
      tempData.engineer_name = cubes[i]?.engineer_name;
      tempData.examiner_name = cubes[i]?.examiner_name;
      tempData.recipient_name = cubes[i]?.recipient_name;
      if (cubes[i]?.tests?.length > 0) {
        tempData.casting_date = cubes[i]?.tests[0]?.casting_date;
        tempData.age = cubes[i]?.tests[0]?.age;
        tempData.testing_date = moment(
          cubes[i]?.tests[0]?.casting_date,
          "yyyy-MM-DD"
        )
          .add(cubes[i]?.tests[0]?.age, "days")
          .format("yyyy-MM-DD");
        tempData.compressive_strength =
          cubes[i]?.tests[0]?.compressive_strength;
        tempData.density = cubes[i]?.tests[0]?.density;
      }
      dataToExport.push(tempData);
      tempData = {};
      index++;
      if (cubes[i]?.tests?.length > 1) {
        for (let j = 1; j < cubes[i]?.tests?.length; j++) {
          dataToExport.push({
            id: "",
            no: "",
            memo_num: "",
            memo_date: "",
            import_no: "",
            import_date: "",
            deadline_date: "",
            from: "",
            project_name: "",
            subject: "",
            cube_num: "",
            cube_no: "",
            lab_num: "",
            edit_age: "",
            engineer_name: "",
            examiner_name: "",
            recipient_name: "",
            casting_date: cubes[i]?.tests[j]?.casting_date,
            age: cubes[i]?.tests[j]?.age,
            testing_date: moment(cubes[i]?.tests[j]?.casting_date, "yyyy-MM-DD")
              .add(cubes[i]?.tests[j]?.age, "days")
              .format("yyyy-MM-DD"),
            compressive_strength: cubes[i]?.tests[j]?.compressive_strength,
            density: cubes[i]?.tests[j]?.density,
          });
        }
      }
    }

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(dataToExport, {
      origin: "A2",
      skipHeader: true,
    });
    XLSX.utils.sheet_add_aoa(ws, headers, { origin: "A1" });
    XLSX.utils.book_append_sheet(wb, ws, cubes[0]?.department?.college?.name);
    XLSX.writeFile(wb, "نظام ادارةالمختبر الانشائي .xlsx");
  };

  const statusHandle = (index, id, value) => {
    axios
      .post(
        `https://labmanagementsystemapi-production.up.railway.app/api/cube/${id}/status/`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        let newCube = { ...cubes[index] };
        newCube.status = value;
        let updatedCubes = [...cubes];
        updatedCubes[index] = newCube;
        setCubes([...updatedCubes]);
      })
      .catch((err) => console.log(err));
  };

  const openEditModalHandle = (id) => {
    axios
      .get(
        `https://labmanagementsystemapi-production.up.railway.app/api/cube/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        dispatch(cubeActions.setCubeTest(res.data.cube));
        setOpenEditModal(true);
      })
      .catch((err) => console.log(err));
  };

  const openShowModalHandle = (id) => {
    axios
      .get(
        `https://labmanagementsystemapi-production.up.railway.app/api/cube/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        dispatch(cubeActions.setCubeTest(res.data.cube));
        setOpenShowModal(true);
      })
      .catch((err) => console.log(err));
  };

  const openDeleteDialogHandle = (id) => {
    axios
      .get(
        `https://labmanagementsystemapi-production.up.railway.app/api/cube/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        dispatch(cubeActions.setCubeTest(res.data.cube));
        setOpenDeleteDialog(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      h="100%"
      p="5px"
      overflow="scroll"
      className="bg-white"
      borderTopWidth={5}
      borderTopColor="#60a5fa"
      borderRadius="lg"
    >
      <HStack pt="10px" pb="20px" px="20px">
        <Button colorScheme="blue" onClick={() => setOpenAddModal(true)}>
          اضافة فحص
        </Button>
        <Spacer />
        <Button colorScheme="blue">طباعة</Button>
        <Button colorScheme="blue" onClick={handelExport}>
          تصدير لاكسل
        </Button>
      </HStack>
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th textAlign="center">الحالة</Th>
              <Th textAlign="center">رقم وتاريخ الكتاب</Th>
              <Th textAlign="center">رقم وتاريخ الوارد</Th>
              <Th textAlign="center">اسم المشروع</Th>
              <Th textAlign="center">الجهة الفاحصة</Th>
              <Th textAlign="center">التحكم</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cubes.map((cube, index) => (
              <Tr key={cube.id}>
                <Td>
                  <FormControl>
                    <Checkbox
                      isChecked={cube.status}
                      onChange={(e) =>
                        statusHandle(index, cube.id, e.target.checked)
                      }
                    >
                      {cube.status == 0 ? (
                        <Badge colorScheme="red">غير منفذة</Badge>
                      ) : (
                        <Badge colorScheme="green">منفذة</Badge>
                      )}
                    </Checkbox>
                  </FormControl>
                </Td>
                <Td>{`${cube.memo_no} في ${cube.memo_date}`}</Td>
                <Td>{`${cube.import_no} في ${cube.import_date}`}</Td>
                <Td>{cube.project_name}</Td>
                <Td>{cube.from}</Td>
                <Td>
                  <IconButton
                    bg="transparent"
                    borderRadius="3xl"
                    aria-label="عرض الفحص"
                    onClick={() => openShowModalHandle(cube.id)}
                    icon={
                      <FontAwesomeIcon
                        className="text-blue-400"
                        icon={faFile}
                      />
                    }
                  />
                  <IconButton
                    bg="transparent"
                    borderRadius="3xl"
                    aria-label="تعديل الفحص"
                    onClick={() => openEditModalHandle(cube.id)}
                    icon={
                      <FontAwesomeIcon
                        className="text-blue-400"
                        icon={faPenToSquare}
                      />
                    }
                  />
                  <IconButton
                    bg="transparent"
                    borderRadius="3xl"
                    aria-label="حذف الفحص"
                    onClick={() => openDeleteDialogHandle(cube.id)}
                    icon={
                      <FontAwesomeIcon
                        className="text-blue-400"
                        icon={faTrash}
                      />
                    }
                  />
                  {/* <IconButton
                    bg="transparent"
                    borderRadius="3xl"
                    aria-label="طباعة الفحص"
                    icon={
                      <FontAwesomeIcon
                        className="text-blue-400"
                        icon={faPrint}
                      />
                    }
                  /> */}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ShowCube
        isOpen={openShowModal}
        onClose={() => setOpenShowModal(false)}
      />
      <AddCube
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        showCubes={showCubes}
      />
      <EditCube
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        showCubes={showCubes}
      />
      <DeleteDialog
        isOpen={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        showCubes={showCubes}
      />
    </Box>
  );
};

export default CubeTest;
