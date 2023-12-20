"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center h-screen flex-col" >
      <h1 className="text-3xl font-bold mb-4 text-blue-500 tracking-wider" >WebsocketChat</h1>
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
                className="border p-2 rounded-md"
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
