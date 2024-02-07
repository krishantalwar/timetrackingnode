const express = require("express");
const config = require("../config/config");
const authenticationRoute = require("./v1/authentication.route");
const userRoute = require("./v1/user.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/authentication",
    route: authenticationRoute,
  },
  // {
  //   path: "/users",
  //   route: userRoute,
  // },
  // {
  //   path: "/profile",
  //   route: profileRoute,
  // },
  // {
  //   path: "/general-settings",
  //   route: generalSettingRoute,
  // },
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
