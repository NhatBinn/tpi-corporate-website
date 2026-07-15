import { getSolutionsbyCategory } from "@/services/solution.service";
import SolutionCard from "./SolutionCard";
import { solutionUI } from "./solution-ui";

async function SolutionForm() {
  const solutions = await getSolutionsbyCategory();
  if (!solutions.success) return <div>error to get value</div>;

  const cards = solutions.data.map((item) => ({
    href: `/giai-phap/${item.slug}`,
    image: item.imageUrl ?? "/placeholder.jpg",
    label: item.category.name,
    title: item.name,
    desc: item.description ?? "",

    ...solutionUI[item.slug as keyof typeof solutionUI],
  }));

  const cardsRow1 = cards.slice(0, 3);
  const cardsRow2 = cards.slice(3, 6);
  return (
    <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {cardsRow1.map((item) => (
          <SolutionCard key={item.href} {...item} />
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {cardsRow2.map((item) => (
          <SolutionCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

export default SolutionForm;
