import { AccordionTypeEnum } from "@/enums";
import type { AccordionItemType } from "@/types";
import {
    Accordion as UiAccordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/ui";
import { cn } from "@/utils";

export const Accordion = ({
    className,
    items,
    type = AccordionTypeEnum.SINGLE,
}: {
    className?: string,
    items: AccordionItemType[],
    type?: AccordionTypeEnum,
}) => (
    <UiAccordion
        className={cn(className)}
        collapsible={type === AccordionTypeEnum.SINGLE}
        type={type}
    >
        {items.map(({
            content,
            title,
            value,
        }) => (
            <AccordionItem
                key={value}
                value={value}
            >
                <AccordionTrigger
                    className="
                        text-sm
                        font-medium
                        text-text-primary
                        hover:no-underline
                    "
                >
                    {title}
                </AccordionTrigger>
                <AccordionContent>{content}</AccordionContent>
            </AccordionItem>
        ))}
    </UiAccordion>
);
