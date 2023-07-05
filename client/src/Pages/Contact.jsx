import React from "react";
import styled from "styled-components";
import SEO from "../Components/SEO";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #ff8c00, #ff4500);
`;

const Card = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ContactInfo = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

export default function Contact() {
  return (
    <>
      <SEO title="Ecommerce Contact" />
      <Container>
        <Description>
          Hello, I'm Swarup Bhise, a Full-stack Developer. With over 60+
          projects under my belt, I have extensive experience in building web
          applications. My skill set includes front-end and back-end
          development, and I'm proficient in languages like C++, C, and Python.
          I'm passionate about leveraging technology to create innovative
          solutions and provide value to clients and users.
        </Description>
        <Card>
          <Heading>Contact</Heading>
          <ContactInfo>
            <strong>Name:</strong> Swarup Bhise
            <br />
            <strong>Email:</strong> swarupbhise12345678912@gmail.com
          </ContactInfo>
        </Card>
      </Container>
    </>
  );
}
