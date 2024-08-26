const router = require("express")();
const HttpStatusCode = require("http-status-codes");
const { authSecretKey } = require("../utils/config");
const AuthFactory = require("../utils/auth/authFactory");
const authUtils = AuthFactory.create("jwtAuth", { authSecretKey });
const HasuraContext = require("../data/context/hasuraContext");
const AuthQuerys = require("../data/querys/authQuerys");
const { errorObject } = require("../utils/errorSender");
const md5 = require("md5");

router.post("/login", async (req, res) => {
  try {
    const hasuraContext = await HasuraContext.createAsync({
      hasuraQuerys: AuthQuerys,
    });
    req.body.input.password = md5(req.body.input.password);
    const user = (await hasuraContext.loginAsync(req.body.input)).users[0];
    if (!user)
      throw errorObject(
        HttpStatusCode.NOT_FOUND,
        "Make sure you enter your e-mail and password correctly !"
      );

    const token = await authUtils.tokenCreationAsync({
      id: user.id.toString(),
      "https://hasura.io/jwt/claims": {
     	"x-hasura-default-role": "admin",
        "x-hasura-allowed-roles": ["admin"],
        "x-hasura-user-id": user.id.toString()
      },
    });
    res.json({ ...user, token });
  } catch (err) {
    res
      .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const hasuraContext = await HasuraContext.createAsync({
      hasuraQuerys: AuthQuerys,
    });

    const responseAddUser = await hasuraContext.addUserAsync(req.body.input);

    if (!responseAddUser.insert_users_one.id)
      throw errorObject(
        HttpStatusCode.BAD_REQUEST,
        "Error creating user recording !"
      );

    res.json({ id: responseAddUser.insert_users_one.id });
  } catch (err) {
    
    if (err.response?.errors[0].extensions.code == "constraint-violation") {
        res
          .status(HttpStatusCode.CONFLICT)
          .send("E-mail address registered with the system !");
    } else
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const hasuraContext = await HasuraContext.createAsync({
      hasuraQuerys: AuthQuerys,
    });
    const user = await hasuraContext.changePasswordAsync({
      id: req.body.session_variables["x-hasura-user-id"],
      password: md5(req.body.input.password),
      newPassword: req.body.input.newPassword,
    });

    if (!user.update_users.affected_rows)
      throw errorObject(
        HttpStatusCode.BAD_REQUEST,
        "You entered your current password wrong !"
      );

    res.json({ message: "Your password has been changed." });
  } catch (err) {
    res
      .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
});

module.exports = router;
