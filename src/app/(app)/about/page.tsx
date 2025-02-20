import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DrawCircleText } from "@/components/custom/draw-circle-text";
import { Reveal } from "@/components/custom/reveal";

const features = [
  {
    title: "Writing Practice",
    highlight: "AI-powered",
    description:
      "Get instant feedback on your writing with advanced language analysis",
    icon: "✍️",
  },
  {
    title: "Smart Conversations",
    highlight: "Interactive",
    description: "Practice natural conversations with our adaptive AI system",
    icon: "💭",
  },
  {
    title: "Voice Analysis",
    highlight: "Real-time",
    description: "Perfect your pronunciation with instant feedback",
    icon: "🎙️",
  },
  {
    title: "Learning Path",
    highlight: "Personalized",
    description: "Follow a customized journey tailored to your goals",
    icon: "📚",
  },
];

const faqs = [
  {
    question: "How does AI enhance my learning experience?",
    answer:
      "Our AI technology provides personalized feedback, adapts to your learning pace, and identifies areas for improvement in real-time.",
  },
  {
    question: "What makes our platform unique?",
    answer:
      "We combine advanced AI capabilities with proven learning methodologies to create an engaging and effective learning experience.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Yes, our platform provides detailed analytics and progress tracking for all aspects of your learning journey.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <Reveal delay={0.2} width="100%">
          <div className="mb-20 text-center">
            <DrawCircleText
              text="Master English with Advanced AI Technology"
              circleText="Advanced"
              className="mx-auto mb-6 text-primary"
              circleTextClassName="text-primary"
            />
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Transform your English learning journey through innovative AI
              tools and personalized guidance
            </p>
          </div>
        </Reveal>

        {/* Features Section */}
        <div className="mb-20 space-y-16">
          {features.map((feature, index) => (
            <Reveal
              key={index}
              delay={0.1 * (index + 1)}
              direction="up"
              width="100%"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{feature.icon}</span>
                  <h1 className="text-2xl font-semibold text-foreground">
                    {feature.title}
                  </h1>
                </div>
                <p>
                  <span className="font-medium text-primary">
                    {feature.highlight}:{" "}
                  </span>
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ Section */}
        <Reveal delay={0.3} width="100%">
          <div className="mb-20">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
              Common Questions
            </h2>
            <div className="mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-muted"
                  >
                    <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
