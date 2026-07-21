import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

interface KeyPerson {
  name: string;
  role: string;
  note: string;
  image: string;
  facebookHref?: string;
  linkedinHref?: string;
}

const keyPeople: KeyPerson[] = [
  {
    name: "Duy Nguyễn",
    role: "CEO",
    note: "BK HCM 2006",
    image: "/Duy-Nguyen.webp",
    facebookHref: "https://facebook.com/duynguyen",
    linkedinHref: "https://linkedin.com/in/duynguyen",
  },
  {
    name: "Cường Nguyễn",
    role: "Sale Manager",
    note: "BK HCM 2007",
    image: "/CUONG-NGUYEN-02.webp",
    facebookHref: "https://facebook.com/cuongnguyen",
    linkedinHref: "https://linkedin.com/in/cuongnguyen",
  },
  {
    name: "Tú Nguyễn",
    role: "Business Depvelopment",
    note: "BK HCM 2005",
    image: "/Tu-Nguyen.webp",
    facebookHref: "https://facebook.com/tunguyen",
    linkedinHref: "https://linkedin.com/in/tunguyen",
  },
];

export default function KeyPeopleSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <h2 className="text-center text-[32px] font-bold uppercase text-black">
        Nhân Sự Chủ Chốt
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {keyPeople.map((person) => (
          <div key={person.name} className="flex flex-col items-center justify-center">
            <div className="relative h-[420px] w-full overflow-hidden">
              <Image
                src={person.image}
                alt={person.name}
                width={340}
                height={480}
                className="object-cover grayscale mx-auto"
              />
            </div>

            <h3 className="mt-6 text-[18px] font-bold uppercase text-black">
              {person.name}
            </h3>
            <p className="mt-1 text-[14px] uppercase text-[#9a9a9a]">
              {person.role}
            </p>
            <p className="mt-1 text-[13px] text-[#9a9a9a]">{person.note}</p>

            <div className="mt-3 flex items-center gap-3">
              {person.facebookHref && (
                <Link
                  href={person.facebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Facebook của ${person.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#4a4a4a] transition-colors hover:text-[#0a8a3f]"
                >
                  <FaFacebookF size={15} />
                </Link>
              )}
              {person.linkedinHref && (
                <Link
                  href={person.linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn của ${person.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#4a4a4a] transition-colors hover:text-[#0a8a3f]"
                >
                  <FaLinkedinIn size={15} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
