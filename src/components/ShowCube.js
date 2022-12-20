import React from "react";
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
  Grid,
  GridItem,
  HStack,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import moment from "moment";

const ShowCube = ({ isOpen, onClose }) => {
  const cube = useSelector((state) => state.cube.cube);
  const cubeTests = useSelector((state) => state.cube.cubeTest);

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
        <ModalHeader>عرض فحص المكعبات</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Grid templateColumns="repeat(12, 1fr)" gap="5px">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color="blackAlpha.700">رقم الكتاب</FormLabel>
                <Text>{cube.memo_no}</Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel color="blackAlpha.700">تاريخ الكتاب</FormLabel>
                <Text>{cube.memo_date}</Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color="blackAlpha.700">رقم الوارد</FormLabel>
                <Text>{cube.import_no}</Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel color="blackAlpha.700">تاريخ الوارد</FormLabel>
                <Text>{cube.import_date} </Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel color="blackAlpha.700">الجهة</FormLabel>
                <Text>{cube.from} </Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel color="blackAlpha.700">اسم المشروع</FormLabel>
                <Text>{cube.project_name} </Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel color="blackAlpha.700">الموضوع</FormLabel>
                <Text>{cube.subject} </Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel color="blackAlpha.700">عدد المكعبات</FormLabel>
                <Text>{cube.cube_num}</Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel color="blackAlpha.700">رقم المكعبات</FormLabel>
                <Text>{cube.cube_no} </Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel color="blackAlpha.700">الرقم المختبري</FormLabel>
                <Text>{cube.lab_num} </Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl>
                <FormLabel color="blackAlpha.700">عمر التعديل (يوم)</FormLabel>
                <Text>{cube.edit_age}</Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel color="blackAlpha.700">اسم الفاحص</FormLabel>
                <Text>{cube.examiner_name} </Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel color="blackAlpha.700">اسم المهندس المشرف</FormLabel>
                <Text>{cube.engineer_name} </Text>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel color="blackAlpha.700">اسم المستلم</FormLabel>
                <Text>{cube.recipient_name} </Text>
              </FormControl>
            </GridItem>
          </Grid>
          <HStack mt="10px">
            <Text fontSize="xl">تفاصيل المكعبات</Text>
          </HStack>
          <Grid templateColumns="repeat(12, 1fr)" gap="5px">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color="blackAlpha.700">تاريخ الاستلام</FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color="blackAlpha.700">عمر الفحص (يوم)</FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color="blackAlpha.700">تاريخ الاستلام</FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color="blackAlpha.700">
                  Compressive Strength (MPa)
                </FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color="blackAlpha.700">Density (gr/cm3)</FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color="blackAlpha.700">حالة الفحص</FormLabel>
              </FormControl>
            </GridItem>
            {cubeTests?.map((test, index) => (
              <React.Fragment key={index}>
                <GridItem colSpan={2}>
                  <FormControl>
                    <Text>{test.casting_date} </Text>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <Text>{test.age}</Text>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <Text>
                      {moment(test.casting_date, "yyyy-MM-DD")
                        .add(test.age, "days")
                        .format("yyyy-MM-DD")}{" "}
                    </Text>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <Text>{test.compressive_strength}</Text>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <Text>{test.density}</Text>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} alignSelf="center">
                  <FormControl>
                    <Checkbox disabled isChecked={test.status}>
                      ناجحة
                    </Checkbox>
                  </FormControl>
                </GridItem>
              </React.Fragment>
            ))}
            <GridItem colSpan={12} alignSelf="center">
              <FormControl>
                <Checkbox disabled isChecked={cube.status}>
                  جميع الفحصوات منفذة
                </Checkbox>
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" ml={3} onClick={onClose}>
            موافق
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShowCube;
