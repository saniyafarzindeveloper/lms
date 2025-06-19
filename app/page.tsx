import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import React from "react";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        <CompanionCard 
        id="111"
        name= "Basic Math class 9th"
        topic="Geometry Chapter 01"
        subject= "Science"
        duration ={50}
        color="#825acc"
        />
        <CompanionCard 
        id="890"
        name= "Basic Math class 9th"
        topic="Geometry Chapter 01"
        subject= "Math"
        duration ={50}
        color="#fe9032"
        />
        <CompanionCard 
        id="222"
        name= "Basic Math class 9th"
        topic="Geometry Chapter 01"
        subject= "Physics"
        duration ={50}
        color="#faaae5"
        />
      </section>

      <section className="home-section">
        <CompanionList />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
