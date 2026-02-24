import { AccordionEnum } from "@/enums";
import type { AccordionItemInterface } from "@/interfaces";
import {
    Accordion as AccordionUI,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/ui";
import { generateClassNameHandler } from "@/utils";

export const Accordion = ({
    className,
    items,
    type = AccordionEnum.SINGLE,
}: {
    className?: string,
    items: AccordionItemInterface[],
    type?: AccordionEnum,
}) => (
    <AccordionUI
        className={generateClassNameHandler(className)}
        collapsible={type === AccordionEnum.SINGLE}
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
    </AccordionUI>
);
