import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import { Grid, GridItem } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";

import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [drawer, setDrawer] = useState(true);

  const showDrawer = () => {
    setDrawer(!drawer);
  };

  const handelLogout = () => {
    dispatch(authActions.logout);
    navigate("/login");
  };
  return (
    <div dir="rtl">
      <Grid h="100vh" templateColumns="repeat(12, 1fr)">
        <GridItem zIndex={10} colSpan={12}>
          <NavBar showDrawer={showDrawer} />
        </GridItem>
        {drawer && (
          <GridItem zIndex={9} rowSpan={2} colSpan={2}>
            <SideNav />
          </GridItem>
        )}
        <GridItem
          className="bg-slate-200"
          h="calc(100vh - 60px)"
          colSpan={drawer ? 10 : 12}
          p="20px"
        >
          <Outlet />
        </GridItem>
      </Grid>
    </div>
  );
};

export default Home;
