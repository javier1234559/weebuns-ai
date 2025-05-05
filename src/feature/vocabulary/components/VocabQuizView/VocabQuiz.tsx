import { FlashcardArray } from "react-quizlet-flashcard";

type Flashcard = {
  id: number;
  frontHTML: JSX.Element;
  backHTML: JSX.Element;
};

interface VocabQuizProps {
  data: Flashcard[];
  onCardChange: (id: any, index: number) => void;
}

function VocabQuiz({ data, onCardChange }: VocabQuizProps) {
  return (
    <>
      <style>{`
        .FlashcardArrayWrapper {
          margin: auto;
        }

        .FlashcardArrayWrapper .FlashcardWrapper__item--front {
          background-color: hsl(var(--card));
        }

        .FlashcardArrayWrapper .FlashcardWrapper__item--back {
          background-color: hsl(var(--card));
        }

        .FlashcardArrayWrapper__controls {
          margin-top: 8rem;
        }

        .FlashcardArrayWrapper__controls svg path{
          fill: hsl(var(--foreground)) !important;
        }

      `}</style>
      <FlashcardArray cards={data} showCount onCardChange={onCardChange} />
    </>
  );
}

VocabQuiz.displayName = "VocabQuiz";
export default VocabQuiz;
