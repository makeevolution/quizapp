

// Custom reusable component for the translation input
export default function TranslationInput ({errors, questionreplace, questions, questionIndex, translationIndex, translation, register }) {
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
            {(errors.questions && 
                errors.questions[questionIndex] && 
                errors.questions[questionIndex].translations && 
                errors.questions[questionIndex].translations[translationIndex]) ? 
                <p>{errors.questions[questionIndex].translations[translationIndex].message}</p> : null}

        </div>
    );
};