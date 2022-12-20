import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const cubeSlice = createSlice({
  name: "auth",
  initialState: {
    cube: {
      id: "",
      no: 1,
      status: 1,
      printed: 1,
      memo_no: "",
      memo_date: moment().format("yyyy-MM-DD"),
      import_no: "",
      import_date: moment().format("yyyy-MM-DD"),
      deadline_date: moment().add(4, "days").format("yyyy-MM-DD"),
      from: "",
      project_name: "",
      subject: "",
      cube_num: 1,
      cube_no: "",
      lab_num: "",
      edit_age: 1,
      examiner_name: "",
      engineer_name: "",
      recipient_name: "",
    },
    cubeTest: [
      {
        casting_date: moment().format("yyyy-MM-DD"),
        age: 1,
        testing_date: moment().add(1, "days").format("yyyy-MM-DD"),
        compressive_strength: 0,
        density: 0,
        status: false,
      },
    ],
  },
  reducers: {
    setCubeTest(state, action) {
      state.cube.id = action.payload.id;
      state.cube.no = action.payload.on;
      state.cube.status = action.payload.status;
      state.cube.printed = action.payload.printed;
      state.cube.memo_no = action.payload.memo_no;
      state.cube.memo_date = action.payload.memo_date;
      state.cube.import_no = action.payload.import_no;
      state.cube.import_date = action.payload.import_date;
      state.cube.deadline_date = action.payload.deadline_date;
      state.cube.from = action.payload.from;
      state.cube.project_name = action.payload.project_name;
      state.cube.subject = action.payload.subject;
      state.cube.cube_num = action.payload.cube_num;
      state.cube.cube_no = action.payload.cube_no;
      state.cube.lab_num = action.payload.lab_num;
      state.cube.edit_age = action.payload.edit_age;
      state.cube.examiner_name = action.payload.examiner_name;
      state.cube.engineer_name = action.payload.engineer_name;
      state.cube.recipient_name = action.payload.recipient_name;
      action.payload.tests.map((cube) => {
        cube.testing_date = moment(cube.casting_date, "yyyy-MM-DD")
          .add(cube.age, "days")
          .format("yyyy-MM-DD");
      });
      state.cubeTest = [...action.payload.tests];
    },
    setCube(state, action) {
      state.cube.no = action.payload.on;
      state.cube.status = action.payload.status;
      state.cube.printed = action.payload.printed;
      state.cube.memo_no = action.payload.memo_no;
      state.cube.memo_date = action.payload.memo_date;
      state.cube.import_no = action.payload.import_no;
      state.cube.import_date = action.payload.import_date;
      state.cube.deadline_date = action.payload.deadline_date;
      state.cube.from = action.payload.from;
      state.cube.project_name = action.payload.project_name;
      state.cube.subject = action.payload.subject;
      state.cube.cube_num = action.payload.cube_num;
      state.cube.cube_no = action.payload.cube_no;
      state.cube.lab_num = action.payload.lab_num;
      state.cube.edit_age = action.payload.edit_age;
      state.cube.examiner_name = action.payload.examiner_name;
      state.cube.engineer_name = action.payload.engineer_name;
      state.cube.recipient_name = action.payload.recipient_name;
    },
    setCubeTests(state, action) {
      state.cubeTest = [...action.payload];
    },
  },
});

export const cubeActions = cubeSlice.actions;

export default cubeSlice;
