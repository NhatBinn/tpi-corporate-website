import Features from "@/components/common/Features";
import AccordionList from "@/components/common/AccordionList";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ContactForm from "@/components/contact/ContactForm";

function ContactPage() {
  return (
    <>
      <PageHeroBanner title="Liên hệ" breadcrumbs={[{ label: "Liên hệ" }]} />
      <section className="container-site grid grid-cols-1 gap-12 py-12 md:grid-cols-2 md:gap-0 md:py-20">
        <div className="md:pr-12">
          <AccordionList />
        </div>
        <div className="border-t border-[#e5e5e5] pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <ContactForm />
        </div>
      </section>
      <Features />
    </>
  );
}

export default ContactPage;
