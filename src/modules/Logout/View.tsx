import Router from "next/router";
import Button from "@mui/material/Button";
import React from "react";
import ViewModel from "./ViewModel";

interface Props {
  viewModel: ViewModel;
}

const LogoutView = ({ viewModel }: Props) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={viewModel.handleLogoutButton}
    >
      {viewModel.buttonText}
    </Button>
  );
};

export default LogoutView;
