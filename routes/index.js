const express = require("express");
const config = require("../config/config");
const authenticationRoute = require("./v1/authentication.route");
const userRoute = require("./v1/user.route");
const designationRoute = require("./v1/designation.route");
const shiftMasterRoute = require("./v1/shiftMaster.route");
const departmentRoute = require("./v1/department.route");
const rolesRoute = require("./v1/roles.route");
const userTypeRoute = require("./v1/userType.route");
const screenRoute = require("./v1/screen.route");
const permissionsRoute = require("./v1/permissions.route");


const router = express.Router();

const defaultRoutes = [
  {
    path: "/authentication",
    route: authenticationRoute,
  },
  {
    path: "/permissions",
    route: permissionsRoute,
  },
  // {
  //   path: "/users",
  //   route: userRoute,
  // },
  {
    path: "/screens",
    route: screenRoute,
  },
  {
    path: "/roles",
    route: rolesRoute,
  },
  // {
  //   path: "/roles",
  //   route: userTypeRoute,
  // },
  {
    path: "/usertype",
    route: userTypeRoute,
  },
  {
    path: "/designation",
    route: designationRoute,
  },
  {
    path: "/department",
    route: departmentRoute,
  },
  {
    path: "/shiftmaster",
    route: shiftMasterRoute,
  },
  // {
  //   path: "/email-templates",
  //   route: emailTemplateRoute,
  // },

];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: "/docs",
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// if (config.env === "development") {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
