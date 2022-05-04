import Router from "next/router";

class LogoutModel {
  readonly buttonText: string = "Logout";

  constructor() {}

  handleLogoutButton = (): void => {
    Router.push("/api/logout");
  };
}

export default LogoutModel;
