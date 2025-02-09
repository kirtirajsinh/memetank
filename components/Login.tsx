"use client";
import { upsertUser } from "@/app/api/actions/createuser";
// import { upsertUser } from "@/app/api/actions/createuser";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import React from "react";

const Login = () => {
  const { login } = useLogin({
    onComplete: async ({
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
    }) => {
      console.log(user, isNewUser, wasAlreadyAuthenticated, loginMethod);
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted

      if (isNewUser) {
        console.log("New User");
        const response = await upsertUser(
          user.email?.address ?? "",
          user.id,
          user.wallet?.address ?? ""
        );
        console.log("User added to db", response);
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });
  const { user } = usePrivy();

  return (
    <div>
      {user ? (
        <h1>{user.email?.address}</h1>
      ) : (
        <button onClick={() => login()}>Login</button>
      )}

      {}
    </div>
  );
};

export default Login;
