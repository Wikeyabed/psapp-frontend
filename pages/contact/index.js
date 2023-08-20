import React from "react";
import ContactForm from "../../components/public/forms/ContactForm";
import Head from "next/head";

function Contact() {
  return (
    <>
      <Head>
        <title>ایباکس - تماس با ما</title>
      </Head>
      <ContactForm />
    </>
  );
}

export default Contact;
