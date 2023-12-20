"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "./ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center h-screen">
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
            .min(3, "Minimum length 3 characters"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleSubmit,
          } = props;
          return (
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
              <Button type="submit" disabled={isSubmitting}>
                Go
              </Button>
            </form>
          );
        }}
      </Formik>
    </main>
  );
}
