import Features from "@/components/common/Features";
import AccordionList from "@/components/contact/AccordionList";
import HeroBanner from "@/components/contact/HeroBanner";
import React from "react";

function ContactPage() {
  return (
    <>
      <HeroBanner />
      <section className="mx-auto max-w-350">
        <div className="flex gap-4 px-4 md:px-6 mx-8">
          <div className="flex-1">
            <AccordionList />
          </div>
          <div className="flex-1">
            <h1>alo</h1>
          </div>
        </div>
        <Features />
      </section>
    </>
  );
}

export default ContactPage;
