const express = require("express");
const userController=require("../controllers/user.controller")
const router = express.Router();



  router
  .route("/all")
   /**
   * @api {get} /get a all user
   * @apiDescription Get a all user description
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} single user.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */

  .get(userController.allUser)


  router
  .route("/random")
 /**
   * @api {get} /get a random user
   * @apiDescription Get a random user description
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} single user.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(userController.randomUser)

  router
  .route("/save")
  .post((userController.saveUser))

  router
  .route("/update")
  .patch((userController.updateUser))

  // router
  // .route("/bulk-update")
  // .patch((userController.bulkUpdateUser))

  router
  .route("/delete")
  .delete((userController.deleteUser))


  module.exports = router;