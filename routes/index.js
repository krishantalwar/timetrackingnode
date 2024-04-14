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
const profileRoute = require("./v1/profile.route");
const signupRoute=require("./v1/user.route");
const stateRoute = require("./v1/state.route");
const countryRoute = require("./v1/country.route");
const jobRoute = require("./v1/job.route");
const taxRoute=require('./v1/tax.route');



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
  {
    path: "/profile",
    route: profileRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/screens",
    route: screenRoute,
  },
  {
    path: "/roles",
    route: rolesRoute,
  },
  {
    path: "/state",
    route: stateRoute,
  },
  {
    path: "/country",
    route: countryRoute,
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

  {
    path: "/job",
    route: jobRoute,
  },
  {
    path: "/tax",
    route: taxRoute,
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
