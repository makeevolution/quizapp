

// Custom reusable component for the translation input
export default function TranslationInput ({questionreplace, questions, questionIndex, translationIndex, translation, register }) {
    const handleRemoveTranslation = (questionIndex, translationIndex) => {
        if (questions[questionIndex].translations.length <= 1) {
            return
        }
        questions[questionIndex].translations = questions[questionIndex].translations.filter((_, index) => index !== translationIndex)
        questionreplace(questions);
    }

    return (
        <div key={`${questionIndex}_${translationIndex}`}>
            <input
                {...register(`questions[${questionIndex}].translations[${translationIndex}]`)}
                defaultValue={translation}
            />
            <button type="button" onClick={() => handleRemoveTranslation(questionIndex, translationIndex)}>
                Remove
            </button>
        </div>
    );
};