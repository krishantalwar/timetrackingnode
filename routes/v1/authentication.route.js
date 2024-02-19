const express = require('express');
const {validate,validateAsync} = require('../../middleware/validate');
const authenticationValidation = require('../../validations/authentication.validation');
const authenticationController = require('../../controllers/authentication.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);
router.post('/login', validate(authenticationValidation.login), authenticationController.login);
router.post('/logout',
    //validate(authenticationValidation.logout),
    authenticationController.logout);
router.post('/refresh-tokens', validate(authenticationValidation.refreshTokens), authenticationController.refreshTokens);
router.post('/forgot-password', validate(authenticationValidation.forgotPassword), authenticationController.forgotPassword);
router.post('/reset-password', validate(authenticationValidation.resetPassword), authenticationController.resetPassword);


// router.post('/send-verification-email', authentication(), authenticationController.sendVerificationEmail);
router.post('/verify-email', validate(authenticationValidation.verifyEmail), authenticationController.verifyEmail);
// router.post('/change-password', authentication(), authenticationController.changePassword)

module.exports = router;

// /**
//  * @swagger
//  * tags:
//  *   name: Authentication
//  *   description: Authenticationentication
//  */

// /**
//  * @swagger
//  * /authentication/register:
//  *   post:
//  *     summary: Register as user
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - password
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 description: must be unique
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *             example:
//  *               name: fake name
//  *               email: fake@example.com
//  *               password: password1
//  *     responses:
//  *       "201":
//  *         description: Created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 user:
//  *                   $ref: '#/components/schemas/User'
//  *                 tokens:
//  *                   $ref: '#/components/schemas/AuthenticationTokens'
//  *       "400":
//  *         $ref: '#/components/responses/DuplicateEmail'
//  */

// /**
//  * @swagger
//  * /authentication/login:
//  *   post:
//  *     summary: Login
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *               password:
//  *                 type: string
//  *                 format: password
//  *             example:
//  *               email: fake@example.com
//  *               password: password1
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 user:
//  *                   $ref: '#/components/schemas/User'
//  *                 tokens:
//  *                   $ref: '#/components/schemas/AuthenticationTokens'
//  *       "401":
//  *         description: Invalid email or password
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Invalid email or password
//  */

// /**
//  * @swagger
//  * /authentication/logout:
//  *   post:
//  *     summary: Logout
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
// /**
//  * @swagger
//  * tags:
//  *   name: Authentication
//  *   description: Authenticationentication
//  */

// /**
//  * @swagger
//  * /authentication/register:
//  *   post:
//  *     summary: Register as user
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - password
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 description: must be unique
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *             example:
//  *               name: fake name
//  *               email: fake@example.com
//  *               password: password1
//  *     responses:
//  *       "201":
//  *         description: Created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 user:
//  *                   $ref: '#/components/schemas/User'
//  *                 tokens:
//  *                   $ref: '#/components/schemas/AuthenticationTokens'
//  *       "400":
//  *         $ref: '#/components/responses/DuplicateEmail'
//  */

// /**
//  * @swagger
//  * /authentication/login:
//  *   post:
//  *     summary: Login
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
// /**
//  * @swagger
//  * tags:
//  *   name: Authentication
//  *   description: Authenticationentication
//  */

// /**
//  * @swagger
//  * /authentication/register:
//  *   post:
//  *     summary: Register as user
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - password
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 description: must be unique
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *             example:
//  *               name: fake name
//  *               email: fake@example.com
//  *               password: password1
//  *     responses:
//  *       "201":
//  *         description: Created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 user:
//  *                   $ref: '#/components/schemas/User'
//  *                 tokens:
//  *                   $ref: '#/components/schemas/AuthenticationTokens'
//  *       "400":
//  *         $ref: '#/components/responses/DuplicateEmail'
//  */

// /**
//  * @swagger
//  * /authentication/login:
//  *   post:
//  *     summary: Login
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *               password:
//  *                 type: string
//  *                 format: password
//  *             example:
//  *               email: fake@example.com
//  *               password: password1
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 user:
//  *                   $ref: '#/components/schemas/User'
//  *                 tokens:
//  *                   $ref: '#/components/schemas/AuthenticationTokens'
//  *       "401":
//  *         description: Invalid email or password
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Invalid email or password
//  */

// /**
//  * @swagger
//  * /authentication/logout:
//  *   post:
//  *     summary: Logout
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - refreshToken
//  *             properties:
//  *               refreshToken:
//  *                 type: string
//  *             example:
//  *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  */

// /**
//  * @swagger
//  * /authentication/refresh-tokens:
//  *   post:
//  *     summary: Refresh authentication tokens
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - refreshToken
//  *             properties:
//  *               refreshToken:
//  *                 type: string
//  *             example:
//  *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/AuthenticationTokens'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthenticationorized'
//  */

// /**
//  * @swagger
//  * /authentication/forgot-password:
//  *   post:
//  *     summary: Forgot password
//  *     description: An email will be sent to reset password.
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *             example:
//  *               email: fake@example.com
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  */

// /**
//  * @swagger
//  * /authentication/reset-password:
//  *   post:
//  *     summary: Reset password
//  *     tags: [Authentication]
//  *     parameters:
//  *       - in: query
//  *         name: token
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The reset password token
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - password
//  *             properties:
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *             example:
//  *               password: password1
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: Password reset failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Password reset failed
//  */

// /**
//  * @swagger
//  * /authentication/send-verification-email:
//  *   post:
//  *     summary: Send verification email
//  *     description: An email will be sent to verify email.
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuthentication: []
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         $ref: '#/components/responses/Unauthenticationorized'
//  */

// /**
//  * @swagger
//  * /authentication/verify-email:
//  *   post:
//  *     summary: verify email
//  *     tags: [Authentication]
//  *     parameters:
//  *       - in: query
//  *         name: token
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The verify email token
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: verify email failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: verify email failed
//  */
//  *               password:
//  *                 type: string
//  *                 format: password
//  *             example:
//  *               email: fake@example.com
//  *               password: password1
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 user:
//  *                   $ref: '#/components/schemas/User'
//  *                 tokens:
//  *                   $ref: '#/components/schemas/AuthenticationTokens'
//  *       "401":
//  *         description: Invalid email or password
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Invalid email or password
//  */

// /**
//  * @swagger
//  * /authentication/logout:
//  *   post:
//  *     summary: Logout
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - refreshToken
//  *             properties:
//  *               refreshToken:
//  *                 type: string
//  *             example:
//  *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  */

// /**
//  * @swagger
//  * /authentication/refresh-tokens:
//  *   post:
//  *     summary: Refresh authentication tokens
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - refreshToken
//  *             properties:
//  *               refreshToken:
//  *                 type: string
//  *             example:
//  *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/AuthenticationTokens'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthenticationorized'
//  */

// /**
//  * @swagger
//  * /authentication/forgot-password:
//  *   post:
//  *     summary: Forgot password
//  *     description: An email will be sent to reset password.
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *             example:
//  *               email: fake@example.com
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  */

// /**
//  * @swagger
//  * /authentication/reset-password:
//  *   post:
//  *     summary: Reset password
//  *     tags: [Authentication]
//  *     parameters:
//  *       - in: query
//  *         name: token
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The reset password token
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - password
//  *             properties:
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *             example:
//  *               password: password1
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: Password reset failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Password reset failed
//  */

// /**
//  * @swagger
//  * /authentication/send-verification-email:
//  *   post:
//  *     summary: Send verification email
//  *     description: An email will be sent to verify email.
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuthentication: []
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         $ref: '#/components/responses/Unauthenticationorized'
//  */

// /**
//  * @swagger
//  * /authentication/verify-email:
//  *   post:
//  *     summary: verify email
//  *     tags: [Authentication]
//  *     parameters:
//  *       - in: query
//  *         name: token
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The verify email token
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: verify email failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: verify email failed
//  */
//  *             type: object
//  *             required:
//  *               - refreshToken
//  *             properties:
//  *               refreshToken:
//  *                 type: string
//  *             example:
//  *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  */

// /**
//  * @swagger
//  * /authentication/refresh-tokens:
//  *   post:
//  *     summary: Refresh authentication tokens
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - refreshToken
//  *             properties:
//  *               refreshToken:
//  *                 type: string
//  *             example:
//  *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/AuthenticationTokens'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthenticationorized'
//  */

// /**
//  * @swagger
//  * /authentication/forgot-password:
//  *   post:
//  *     summary: Forgot password
//  *     description: An email will be sent to reset password.
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *             example:
//  *               email: fake@example.com
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  */

// /**
//  * @swagger
//  * /authentication/reset-password:
//  *   post:
//  *     summary: Reset password
//  *     tags: [Authentication]
//  *     parameters:
//  *       - in: query
//  *         name: token
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The reset password token
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - password
//  *             properties:
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *             example:
//  *               password: password1
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: Password reset failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Password reset failed
//  */

// /**
//  * @swagger
//  * /authentication/send-verification-email:
//  *   post:
//  *     summary: Send verification email
//  *     description: An email will be sent to verify email.
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuthentication: []
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         $ref: '#/components/responses/Unauthenticationorized'
//  */

// /**
//  * @swagger
//  * /authentication/verify-email:
//  *   post:
//  *     summary: verify email
//  *     tags: [Authentication]
//  *     parameters:
//  *       - in: query
//  *         name: token
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The verify email token
//  *     responses:
//  *       "204":
//  *         description: No content
//  *       "401":
//  *         description: verify email failed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: verify email failed
//  */