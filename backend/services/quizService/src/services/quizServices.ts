import Quiz from "../models/QuizModel"

export const fetchQuiz = async (quizId: string) => {
    let quiz = await Quiz.findById(quizId)
    return quiz
}