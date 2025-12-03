$(function () {
  // Add error message containers below each input/select
  $("input, select").each(function () {
    const $input = $(this);
    if (!$input.next(".error-message").length) {
      $input.after('<div class="error-message" style="color:red; font-size:0.9em;"></div>');
    }
  });

  // Real-time validation
  $("input, select").on("keyup blur change", function () {
    const $input = $(this);
    const value = $input.val().trim();

    if (value === "") {
      $input.removeClass("valid-input").addClass("error-input");
      $input.next(".error-message").text("This field is required");
    } else {
      $input.removeClass("error-input").addClass("valid-input");
      $input.next(".error-message").text("");
    }
  });

  // Student ID auto-format
  $("#studentID").attr("maxlength", 8).on("input", function () {
    let value = $(this).val().replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "-" + value.slice(2, 7);
    }
    $(this).val(value.slice(0, 8));
  });

  // Final validation on submit
  $("#studentForm").on("submit", function (e) {
    let valid = true;

    $("input, select").each(function () {
      const $input = $(this);
      const value = $input.val().trim();

      if (value === "") {
        $input.removeClass("valid-input").addClass("error-input");
        $input.next(".error-message").text("This field is required");
        valid = false;
      }
    });

    if (!valid) {
      e.preventDefault();
    } else {
      $(this).addClass("success");
      setTimeout(() => $(this).removeClass("success"), 900);
    }
  });
});