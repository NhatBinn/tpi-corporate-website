import { getSolutionsbyCategory } from "@/services/solution.service";
import SolutionCard from "./SolutionCard";
import { solutionUI } from "./solution-ui";
import { IMAGE_PLACEHOLDER } from "@/lib/constants";

async function SolutionForm() {
  const solutions = await getSolutionsbyCategory();
  if (!solutions.success) return <div>error to get value</div>;

  const cards = solutions.data.map((item) => ({
    href: `/giai-phap/${item.slug}`,
    image: item.imageUrl ?? IMAGE_PLACEHOLDER,
    label: item.category.name,
    title: item.name,
    desc: item.description ?? "",

    ...solutionUI[item.slug as keyof typeof solutionUI],
  }));

  const rows = [cards.slice(0, 3), cards.slice(3, 6)];
  return (
    <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-3">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col md:flex-row gap-2">
          {row.map((item) => (
            <SolutionCard key={item.href} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SolutionForm;
