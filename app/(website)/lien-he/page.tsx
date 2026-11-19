import Features from "@/components/common/Features";
import AccordionList from "@/components/common/AccordionList";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ContactForm from "@/components/contact/ContactForm";

function ContactPage() {
  return (
    <>
      <PageHeroBanner title="Liên hệ" breadcrumbs={[{ label: "Liên hệ" }]} />
      <section className="mx-auto max-w-350">
        <div className="flex flex-col md:flex-row gap-4 px-4 md:px-6 md:mx-8">
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
