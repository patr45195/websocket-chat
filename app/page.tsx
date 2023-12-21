"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import Image from "next/image";

const usersImages = [
  "/users/user1.png",
  "/users/user2.png",
  "/users/user3.png",
  "/users/user4.png",
  "/users/user5.png",
];

export default function Home() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = React.useState("");

  return (
    <main className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-3xl font-bold mb-2 text-blue-500 tracking-wider">
        WebsocketChat
      </h1>
      <div className="flex">
        {usersImages.map((item) => (
          <div
            key={item}
            onClick={() => setSelectedAvatar(item)}
            className="relative"
          >
            <Image
              src={item}
              alt={item}
              className="rounded-full m-1 cursor-pointer"
              width={40}
              height={40}
            />
            {selectedAvatar === item && (
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-50"></div>
            )}
          </div>
        ))}
      </div>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={async (values) => {
          let { data } = await axios.get<boolean>(
            "http://localhost:5000/freeUserName",
            {
              params: { userName: values.name.trim() },
            }
          );

          const canCreateUser = data;

          if (canCreateUser) {
            localStorage.setItem("user", values.name.trim());
            localStorage.setItem("userAvatar", selectedAvatar);
            router.push("/chat");
          } else {
            values.name = "";
            alert("Nickname is busy, come up with another nickname.");
          }
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Required")
            .min(3, "Minimum length 3 characters")
            .max(15, "Maximum length 20 characters"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleSubmit,
          } = props;
          return (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <label htmlFor="name"></label>
              <input
                className="border p-2 rounded-md mt-1"
                id="name"
                placeholder="Enter your name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
              <Button
                sx={{ marginTop: "5px" }}
                type="submit"
                variant="outlined"
                disabled={isSubmitting}
              >
                Go
              </Button>
            </form>
          );
        }}
      </Formik>
    </main>
  );
}
