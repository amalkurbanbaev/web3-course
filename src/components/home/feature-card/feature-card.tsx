import { Button } from "@/components/ui/button.tsx"
import type { ReactNode } from "react"

type FeatureCardProps = {
  description: ReactNode
  title: string
  imageSrc: string

  // Необязательные значения
  buttonText?: string
  imagePosition?: "left" | "right"
  backgroundClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  imgClassName?: string

  // Необязательные функции
  onButtonClick?: () => void
}

export function FeatureCard({
  title,
  description,
  buttonText = "Go to app",
  imageSrc,
  imagePosition = "left",
  imgClassName,
  backgroundClassName = "bg-gradient-to-b from-[#212121] to-[#141414]",
  titleClassName = "text-white",
  descriptionClassName = "text-white",
  onButtonClick,
}: FeatureCardProps) {
  const flexDirection =
    imagePosition === "left" ? "flex-row-reverse" : "flex-row"

  return (
    <div
      className={`flex ${flexDirection} items-start justify-center rounded-3xl px-[24px] py-[48px] ${backgroundClassName}`}
    >
      <div className="flex w-[480px] flex-col items-start justify-start gap-[24px] px-12">
        <span
          className={`text-center font-montserrat font-semibold text-2xl leading-normal [font-feature-settings:'liga_off,clig_off'] ${titleClassName}`}
        >
          {title}
        </span>
        <span className={descriptionClassName}>{description}</span>
        {buttonText && (
          <Button variant="tertiary" size="lg" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
      <img
        className={`${imgClassName || ""} object-contain px-[48px]`}
        style={{ boxSizing: "border-box" }}
        src={imageSrc}
        alt={title}
      />
    </div>
  )
}
