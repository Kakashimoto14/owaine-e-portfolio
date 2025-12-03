    $(function () {
      const $questions = $(".question");
      const totalQuestions = $questions.length;
      let answeredCount = 0;

      $questions.hide().first().show();
      $("#submitQuiz, #restartQuiz").hide();

      // Assign index to each option
      $questions.each(function () {
        $(this).find(".option").each(function (i) {
          $(this).attr("data-index", i);
        });
      });

      // Handle option click
      $(".option").on("click", function () {
        const $question = $(this).closest(".question");
        const correctIndex = parseInt($question.attr("data-answer"), 10);
        const clickedIndex = parseInt($(this).attr("data-index"), 10);

        if ($question.data("answered") !== true) {
          answeredCount++;
          $question.data("answered", true);
        }

        $question.data("correct", clickedIndex === correctIndex);

        $question.hide();
        const $next = $question.next(".question");
        if ($next.length) {
          $next.show();
        }

        if (answeredCount === totalQuestions) {
          $("#submitQuiz").show();
        }
      });

      // Submit button
      $("#submitQuiz").on("click", function () {
        let score = 0;
        $questions.each(function () {
          if ($(this).data("correct") === true) score++;
        });
        $("#result").text("Your score: " + score + " out of " + totalQuestions).show();
        $("#restartQuiz").show();
      });

      // Restart button
      $("#restartQuiz").on("click", function () {
        answeredCount = 0;
        $questions.data("answered", false).data("correct", false).hide();
        $questions.first().show();
        $("#result").hide();
        $("#submitQuiz, #restartQuiz").hide();
      });
    });