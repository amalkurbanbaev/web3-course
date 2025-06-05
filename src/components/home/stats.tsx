const titleClassName =
  "justify-start self-stretch text-center font-semibold text-3xl text-white"
const descrClassName =
  "justify-start self-stretch text-center font-normal text-sm text-white leading-normal"
const textWrapClassName =
  "inline-flex w-64 flex-col items-center justify-start gap-2"

const dictionary = [
  {
    title: "Over 200,000",
    description: "Clients from different countries",
  },
  {
    title: "Over 22,000",
    description: "Orders per week",
  },
  {
    title: "Over 200",
    description: "DeFi projects",
  },
] as const

export function Stats() {
  return (
    <div className="inline-flex items-start justify-center gap-24 self-stretch rounded-3xl bg-indigo-950 px-6 py-24">
      {dictionary.map((item) => (
        <div className={textWrapClassName} key={item.title}>
          <div className={titleClassName}>{item.title}</div>
          <div className={descrClassName}>{item.description}</div>
        </div>
      ))}
    </div>
  )
}
