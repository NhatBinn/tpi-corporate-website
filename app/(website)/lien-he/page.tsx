import Features from "@/components/common/Features";
import AccordionList from "@/components/common/AccordionList";
import ContactForm from "@/components/contact/ContactForm";
import HeroBanner from "@/components/contact/HeroBanner";

function ContactPage() {
  return (
    <>
      <HeroBanner />
      <section className="mx-auto max-w-350">
        <div className="flex gap-4 px-4 md:px-6 mx-8">
          <div className="flex-1 mt-5">
            <AccordionList />
          </div>
          <div className="flex-1 mt-5">
            <ContactForm />
          </div>
        </div>
        <Features />
      </section>
    </>
  );
}

export default ContactPage;
