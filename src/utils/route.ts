import React from "react";
import {
  HomeOutlined
} from "@ant-design/icons";
// import { Feature } from "../constants/feature";

export const Route = [
  {
    key: "dash",
    name: "Dashboard",
    path: "/",
    icon: HomeOutlined,
    features: [],
    exact: true,
    component: React.lazy(
      () =>
        import(
          /* webpackPreload: true,
                webpackChunkName: "home-chunk", */
          "../page/home/index"
        )
    ),
  }
];